import { connectToDatabase } from '../../../libs/mongodb';

export async function POST(req: Request) {
  try {
    const { _id, userId, like } = await req.json();

    if (!_id || !userId || typeof like !== 'boolean') {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing or invalid required fields' }),
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const updateResult = await db.collection('posts').updateOne(
      { _id },
      like
        ? { $addToSet: { likes: userId } } // Add userId to likes array if not present
        : { $pull: { likes: userId } } // Remove userId from likes array if present
    );

    if (updateResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Post not found or no changes made' }),
        { status: 404 }
      );
    }

    const updatedPost = await db.collection('posts').findOne({ _id });

    return new Response(
      JSON.stringify({
        success: true,
        message: like ? 'Post liked successfully' : 'Post unliked successfully',
        likesCount: updatedPost?.likes?.length || 0,
      }),
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
