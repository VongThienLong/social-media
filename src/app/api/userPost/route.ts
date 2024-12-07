import { connectToDatabase } from "@/libs/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const posts = await db.collection("posts").find({}).toArray();

    return new Response(JSON.stringify({ posts }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching posts" }), {
      status: 500,
    });
  }
}
