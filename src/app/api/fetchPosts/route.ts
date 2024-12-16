import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../libs/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const posts = await db.collection('posts').find({}).toArray();

    const formattedPosts = posts.map((post: any) => ({
      _id: post._id.toString(),
      content: post.content || '',
      createdDate: post.createdDate || new Date().toISOString(),
      likes: post.likes || [],
      comments: post.comments || [],
      url: post.url || '',
      tags: post.tags || [],
      visibility: post.visibility || 'public',
      userId: post.userId || '',
      displayName: post.userInfo?.displayName || '',
      avatar: post.userInfo?.avatar || '',
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([]);
  }
}
