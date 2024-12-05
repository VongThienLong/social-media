import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../libs/mongodb'; 

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Lấy tất cả các chatboxes
    const chatboxes = await db.collection('chatboxes').find({}).toArray();
    
    // Lấy tất cả người dùng
    const users = await db.collection('users').find({}).toArray();
    
    const userMap = users.reduce((acc: any, user: any) => {
      acc[user._id.toString()] = {
        displayName: user.displayName,
        fullname: user.fullname,
        avatar: user.avatar,
      };
      return acc;
    }, {} as { [key: string]: { fullname: string; displayName: string; avatar: string } });

    // Duyệt qua các chatboxes để lấy tin nhắn cuối cùng
    const formattedMessages = chatboxes.map((chatbox: any) => {
      // Lấy tất cả tin nhắn của chatbox
      const formattedMessages = chatbox.messages.map((message: any) => {
        return {
          message_id: message.message_id,
          senderId: message.senderId,
          content: message.content,
          timestamp: message.timestamp,
          read: message.read,
          displayName: userMap[message.senderId]?.displayName || '',
          fullname: userMap[message.senderId]?.fullname || '',
          avatar: userMap[message.senderId]?.avatar || '',
        };
      });
      
      const lastMessage = chatbox.messages[chatbox.messages.length - 1] || {};

      return {
        _id: chatbox._id.toString(),
        time: lastMessage.timestamp || '',
        active: chatbox.active || false,
        last_message: lastMessage.content || '',
        userId: chatbox.participants[0] || '',
        displayName: userMap[chatbox.participants[0]]?.displayName || '',
        fullname: userMap[chatbox.participants[0]]?.fullname || '',
        avatar: userMap[chatbox.participants[0]]?.avatar || '',
        messages: formattedMessages, // Include all messages here
      };
    });

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json([]);
  }
}
