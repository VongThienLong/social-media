import { connectToDatabase } from '../../../libs/mongodb';

export async function PATCH(req: Request) {
  try {
    const { _id, content } = await req.json();
    if (!_id || !content) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();
    const updatedPost = await db.collection('posts').updateOne(
      { _id: _id },
      { $set: { content } }
    );
    if (updatedPost.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Post not found or no changes made' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Post updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
