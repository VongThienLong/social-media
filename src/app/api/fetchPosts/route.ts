// src/app/api/fetchPosts/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../libs/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const posts = await db.collection('post').find({}).toArray();
    const users = await db.collection('users').find({}).toArray();
    const userMap = users.reduce((acc: any, user: any) => {
      acc[user._id.toString()] = {
        displayName: user.displayName,
        avatar: user.avatar,
      };
      return acc;
    }, {} as { [key: string]: { displayName: string; avatar: string } });

    const formattedPosts = posts.map((post: any) => ({
      _id: post._id.toString(),
      content: post.content || '',
      createdDate: post.createdDate || new Date().toISOString(),
      likes: post.likes || [],
      comments: post.comments || [],
      url: post.url || '',
      location: post.location || '',
      tags: post.tags || [],
      visibility: post.visibility || 'public',
      displayName: userMap[post.userId]?.displayName || '',
      avatar: userMap[post.userId]?.avatar || '',
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([]);
  }
}
