import { getAllPosts, getAllProjects } from '@/lib/md';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';

// Helper to collect and count tags from posts and projects
function getTagsWithCount() {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const tagMap: Record<string, number> = {};

  for (const item of [...posts, ...projects]) {
    if (item.meta.tags && Array.isArray(item.meta.tags)) {
      for (const tag of item.meta.tags) {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      }
    }
  }

  // Convert to array and sort by count descending
  return Object.entries(tagMap)
    .map(([fieldValue, totalCount]) => ({ fieldValue, totalCount }))
    .sort((a, b) => b.totalCount - a.totalCount);
}

export default function TagsPage() {
  const tags = getTagsWithCount();

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 mb-[15rem] mt-24">
      <header className="mb-8 px-4 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">All tags</h1>
        <p className="text-gray-400 font-light text-lg">Tags from the works</p>
      </header>
      <article>
        <ul className="flex flex-wrap gap-3 px-4">
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link
                href={`/tags/${slugify(tag.fieldValue, { lower: true, strict: true })}`}
                className="inline-block px-3 py-1 rounded-md bg-white/20 text-stone-900 dark:text-stone-100 font-medium text-sm hover:bg-white/30  transition-colors"
              >
                {tag.fieldValue} <span className="text-xs text-stone-500">({tag.totalCount})</span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
