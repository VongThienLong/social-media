import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../libs/mongodb';

export async function GET(req: Request) {
  try {
    const id = req.url.split('?')[1]?.split('=')[1]; // Extracting the ID from query string (e.g., ?id=123456)
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id.toString(),
      displayName: user.displayName,
      avatar: user.avatar,
      email: user.email,
      bio: user.bio,
      birthDate: user.birthDate,
      hobby: Array.isArray(user.hobby) ? user.hobby : [],
      friends: Array.isArray(user.friends) ? user.friends : [],
      notifications: Array.isArray(user.notifications) ? user.notifications : [],
      fullname: user.fullname,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
