#!/usr/bin/env node

/**
 * Syncs LinkedIn posts into src/content/linkedin/ as MDX files.
 *
 * Uses LinkedIn's internal API with your li_at session cookie.
 *
 * Usage:
 *   LINKEDIN_COOKIE=your_li_at_value node scripts/sync-linkedin.mjs
 *
 * To get your li_at cookie:
 *   1. Log into linkedin.com in your browser
 *   2. Open DevTools → Application → Cookies → linkedin.com
 *   3. Copy the value of the "li_at" cookie
 *
 * Note: The cookie expires every few months. Update the secret when it does.
 */

import { writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'linkedin');
const PUBLIC_ID = 'pablopastranavega';
const LINKEDIN_COOKIE = process.env.LINKEDIN_COOKIE;

if (!LINKEDIN_COOKIE) {
  console.error('Error: LINKEDIN_COOKIE environment variable is required.');
  console.error('Set it to your li_at cookie value from linkedin.com.');
  process.exit(1);
}

const headers = {
  'cookie': `li_at=${LINKEDIN_COOKIE}`,
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'x-li-lang': 'en_US',
  'x-restli-protocol-version': '2.0.0',
  'csrf-token': 'ajax:0',
  'x-li-track': JSON.stringify({ clientVersion: '1.0.0' }),
};

async function getProfileUrn() {
  console.log(`Fetching profile URN for ${PUBLIC_ID}...`);
  const res = await fetch(
    `https://www.linkedin.com/voyager/api/identity/profiles/${PUBLIC_ID}`,
    { headers }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch profile (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const urn = data.entityUrn || data.profileId;
  if (!urn) throw new Error('Could not find profile URN');
  console.log(`Profile URN: ${urn}`);
  return urn;
}

async function fetchPosts(profileUrn) {
  // Extract the member ID from the URN (e.g., "urn:li:fs_profile:ABC123" → "ABC123")
  const memberId = profileUrn.split(':').pop();
  const profileUrnEncoded = encodeURIComponent(`urn:li:fsd_profile:${memberId}`);

  console.log('Fetching posts...');
  const res = await fetch(
    `https://www.linkedin.com/voyager/api/feed/dash/feedCards?q=memberShareFeed&moduleKey=member-shares:phone&count=10&profileUrn=${profileUrnEncoded}`,
    { headers }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch posts (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const elements = data.elements || [];
  console.log(`Found ${elements.length} feed cards`);
  return elements;
}

function extractPostData(card) {
  // Navigate the nested LinkedIn feed card structure to find the post content
  try {
    const content = card.content?.['com.linkedin.voyager.feed.render.UpdateV2']
      || card.content
      || card;

    const commentary = content?.commentary?.text?.text
      || content?.commentary?.text
      || content?.header?.text?.text
      || '';

    if (!commentary.trim()) return null;

    // Try to find the post URL
    const actorUrn = content?.updateMetadata?.urn || content?.urn || '';
    const activityId = actorUrn.split(':').pop() || '';
    const postUrl = activityId
      ? `https://www.linkedin.com/feed/update/${actorUrn}/`
      : `https://www.linkedin.com/in/${PUBLIC_ID}/recent-activity/`;

    // Try to extract the timestamp
    const timestamp = content?.actor?.subDescription?.text
      || content?.updateMetadata?.lastModifiedAt
      || null;

    let date;
    if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else {
      date = new Date();
    }

    return { text: commentary, date, postUrl };
  } catch {
    return null;
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function postToMdx(post) {
  const { text, date, postUrl } = post;
  const title = text.split('\n')[0].slice(0, 80).trim();
  const dateStr = date.toISOString().split('T')[0];
  const slug = `${dateStr}-${slugify(title)}`;
  const syncedAt = new Date().toISOString();

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `pubDate: ${dateStr}`,
    `lang: en`,
    `sourceUrl: "${postUrl}"`,
    `syncedAt: ${syncedAt}`,
    '---',
  ].join('\n');

  return { slug, content: `${frontmatter}\n\n${text.trim()}\n` };
}

async function main() {
  if (!existsSync(CONTENT_DIR)) {
    mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const existingFiles = new Set(
    readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  );

  const profileUrn = await getProfileUrn();
  const feedCards = await fetchPosts(profileUrn);

  let created = 0;
  for (const card of feedCards) {
    const post = extractPostData(card);
    if (!post) continue;

    const result = postToMdx(post);
    const filename = `${result.slug}.mdx`;

    if (existingFiles.has(filename)) {
      console.log(`Skipping (exists): ${filename}`);
      continue;
    }

    const filePath = join(CONTENT_DIR, filename);
    writeFileSync(filePath, result.content, 'utf-8');
    console.log(`Created: ${filename}`);
    created++;
  }

  console.log(`\nDone. Created ${created} new post(s).`);
  return created;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
