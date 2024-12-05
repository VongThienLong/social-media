import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../libs/mongodb';
import { ObjectId } from 'bson';

export async function POST(request: Request) {
  const { db } = await connectToDatabase();
  
  try {
    const newPost = await request.json();
    newPost._id = new ObjectId().toString();

    const result = await db.collection('posts').insertOne(newPost);
    return NextResponse.json({
      success: true,
      newPost: { ...newPost, _id: result.insertedId.toString() },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, message: 'Error creating post' }, { status: 500 });
  }
}
