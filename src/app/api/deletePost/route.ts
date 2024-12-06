import { connectToDatabase } from '../../../libs/mongodb';

export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();

    if (!_id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required field: _id' }),
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const deletedPost = await db.collection('posts').deleteOne({ _id: _id });
    if (deletedPost.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Post not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Post deleted successfully' }),
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
