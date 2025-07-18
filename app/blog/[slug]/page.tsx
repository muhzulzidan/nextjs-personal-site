
import { getPostBySlug, getPostSlugs } from '@/lib/md';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import slugify from 'slugify';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';




export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const siteUrl =  'https://golden-panda-1e2e39.netlify.app';
  const imageUrl = `${siteUrl}${post?.image}`;
  console.log(imageUrl)
  return {
    title: post?.meta.title,
    description: post?.meta.description,
    openGraph: {
      URL, // og:url
      type: 'article', // og:type
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post?.meta.title || 'Blog post image',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <div className="max-w-4xl w-full mx-auto mt-24 mb-20 px-4 relative z-30">
      <article>
        <header>
          <h1 className="text-2xl font-medium mb-2">{post.meta.title}</h1>
          {post.meta.description && <p className="text-lg text-white/90 mb-2">{post.meta.description}</p>}
          <div className="flex flex-wrap gap-2 py-4">
            {post.meta.tags?.sort().map((tag: string) => (
              <Link
                key={tag}
                href={`/tags/${slugify(tag, { lower: true, strict: true })}`}
                className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90  font-semibold text-xs hover:bg-white hover:text-black transition-colors "
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="text-white/90 text-sm mb-4">{post.meta.date}</div>
          {post.image && (
            <div className="w-full h-auto mb-6">
              <Image src={post.image} alt={post.meta.title} width={800} height={400} className="rounded-lg object-cover w-full h-auto" />
            </div>
          )}
        </header>
        <div className="prose-invert prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="h-40" /> {/* Bottom spacing */}
      </article>
    </div>
  );
}
