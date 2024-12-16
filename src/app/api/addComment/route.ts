import { connectToDatabase } from "../../../libs/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { postId, userId, content } = await req.json();
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }
    const comment = {
      _id: new ObjectId().toString(),
      userId,
      content,
      createdAt: new Date(),
      author: {
        displayName: user.displayName,
        avatar: user.avatar,
      },
    };
    if (!postId || !userId || !content) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }
    const result = await db
      .collection("posts")
      .updateOne(
        { _id: postId },
        { $push: { comments: comment } }
      );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Failed to add comment" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Comment added successfully", comment }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
