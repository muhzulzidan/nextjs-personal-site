"use client"

import Link from 'next/link';
import Image from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';

export interface ContentListItem {
  title: string;
  slug: string;
  description?: string;
  date: string;
  tags?: string[];
  type?: string;
  url?: string;
  image?: string;
}

interface ContentListProps {
  content: ContentListItem[];
  type?: boolean;
}

export function ContentList({ content, type = false }: ContentListProps) {
  return (
    <Tooltip.Provider>
      <div className="space-y-6">
        {content.map((item) => {
          const workType = item.type;
          const workLink = workType === 'project' && item.url ? item.url : `/blog/${item.slug}`;
          return (
            <Tooltip.Root key={item.slug}>
              <Tooltip.Trigger asChild>
                <div
                  className="transition duration-200 ease-in-out p-4 rounded-[5px] flex flex-wrap justify-between relative hover:bg-white/10 cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label={item.title}
                >
                  <div className="max-w-[70%] flex-1 md:max-w-full flex flex-col">
                    <Link
                      href={workLink}
                      target="_blank"
                      className="text-[1.15rem] font-medium text-white border-b-0 hover:underline "
                    >
                      {item.title}
                    </Link>
                    {item.description && (
                      <div className="text-gray-400 text-base font-normal border-b-0 block py-2">
                        {item.description}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                      {type && workType && (
                        <span
                          className="capitalize px-2 py-1 rounded text-xs font-semibold bg-white/80 text-black"
                        >
                          {workType}
                        </span>
                      )}
                      {item.tags?.sort().map((tag) => (
                        <Link
                          href={`/tags/${tag}`}
                          key={tag}
                          className="px-2 py-1 rounded text-xs bg-white/20 text-white hover:bg-white/40 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right mt-2 md:mt-0 md:w-40 text-gray-500 text-sm max-w-[30%] md:max-w-full pt-4 pb-2">
                    {item.date}
                  </div>
                </div>
              </Tooltip.Trigger>
              {item.image && (
                <Tooltip.Portal>
                  <Tooltip.Content className="z-50 rounded-lg bg-white/90 p-2 shadow-lg border border-gray-200" sideOffset={5} side="top" align="center" style={{ width: 320, maxWidth: '90vw' }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg w-full h-auto object-cover"
                      width={320}
                      height={180}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          );
        })}
      </div>
    </Tooltip.Provider>
  );
}
