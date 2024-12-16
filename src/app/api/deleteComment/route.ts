import { connectToDatabase } from "../../../libs/mongodb";

export async function DELETE(req: Request) {
    try {
      const { commentId } = await req.json();
  
      if (!commentId) {
        return new Response(
          JSON.stringify({ success: false, message: "Comment ID is required" }),
          { status: 400 }
        );
      }
  
      const { db } = await connectToDatabase();
  
      const result = await db
        .collection("posts")
        .updateOne(
          { "comments._id": commentId },
          { $pull: { comments: { _id: commentId } } }
        );
  
      if (result.modifiedCount === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "Comment not found" }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ success: true, message: "Comment deleted" }),
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
  