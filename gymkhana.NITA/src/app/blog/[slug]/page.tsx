import { notFound } from 'next/navigation';
import { getPostBySlug } from '~/lib/markdown';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import ShareButton from '~/components/ShareButton';

export async function generateStaticParams() {
    return [{ slug: 'articulate-masterclass' }];
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    let post;
    try {
        post = getPostBySlug(params.slug);
    } catch (e) {
        notFound();
    }

    if (!post) notFound();

    // Format date safely
    let formattedDate = post.date;
    try {
        const dateObj = new Date(post.date);
        if (!isNaN(dateObj.getTime())) {
            formattedDate = format(dateObj, 'MMMM d, yyyy');
        }
    } catch (e) { }

    return (
        <article className="min-h-screen bg-white text-[#333] font-sans selection:bg-blue-100 pb-20">
            <div className="max-w-[700px] mx-auto px-6 py-16">
                <header className="mb-14 text-center">
                    <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
                        {formattedDate}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900 leading-tight">
                        {post.title}
                    </h1>



                    <div className="flex items-center justify-center gap-3 mt-8">
                        <div className="relative w-12 h-12 overflow-hidden rounded-full bg-gray-200 ring-2 ring-white shadow-sm">
                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                                {post.author ? post.author.charAt(0).toUpperCase() : '?'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-sm text-blue-600">{post.author}</div>
                            <div className="text-xs text-gray-400 font-medium">
                                {post.authorRole || 'Author'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-none prose-blockquote:p-0 prose-blockquote:my-10 text-center">
                    <Markdown
                        components={{
                            blockquote: ({ node, ...props }) => (
                                <blockquote className="text-center" {...props}>
                                    <p className="text-3xl font-serif text-blue-600 italic leading-snug">
                                        {props.children}
                                    </p>
                                </blockquote>
                            ),
                            h1: ({ node, ...props }) => <h1 className="text-4xl text-center font-bold mt-12 mb-6" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-2xl text-center font-bold mt-12 mb-4" {...props} />,
                            h3: ({ node, ...props }) => <h3 className=" font-bold text-center text-xl mt-12 mb-4" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-6 text-center leading-relaxed" {...props} />,
                            img: ({ node, ...props }) => (
                                <div className="flex justify-center">
                                    <img
                                        className="rounded-x  rounded-lg shadow-lg max-w-full w-[600px] h-auto"
                                        {...props}
                                        alt={props.alt || 'Blog post image'}
                                    />
                                </div>
                            ),

                        }}
                    >
                        {post.content}
                    </Markdown>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-10 border-t border-gray-100 flex justify-center">
                    <ShareButton />
                </div>
            </div>
        </article>
    );
}
