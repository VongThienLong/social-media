import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../libs/mongodb';

export async function POST(req: NextRequest) {
  const { chatboxId, newMessage } = await req.json(); // Read the incoming JSON body
  
  if (!chatboxId || !newMessage) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();

    // Cập nhật bảng `chatboxes` với tin nhắn mới
    const result = await db.collection('chatboxes').updateOne(
      { _id: chatboxId }, // Tìm kiếm chatbox theo ID
      { $push: { messages: newMessage } } // Thêm tin nhắn vào mảng messages
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to update chatbox' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
