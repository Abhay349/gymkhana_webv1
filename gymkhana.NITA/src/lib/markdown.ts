import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export type Post = {
    slug: string;
    title: string;
    date: string;
    author: string;
    authorRole?: string;
    image?: string;
    content: string;
    readingTime: string;
    [key: string]: any;
};

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${realSlug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const words = content.split(/\s+/g).length;
    const minutes = Math.ceil(words / 200);
    const readingTime = `${minutes} min read`;

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        author: data.author,
        authorRole: data.authorRole,
        image: data.image,
        content,
        readingTime,
        ...data,
    };
}

export function getAllPosts(): Post[] {
    const slugs = fs.readdirSync(postsDirectory);
    const posts = slugs
        .filter((slug) => slug.endsWith('.md'))
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
