import { connectToDatabase } from "@/libs/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection("users").find({}).toArray();

    return new Response(JSON.stringify({ users }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching users" }), {
      status: 500,
    });
  }
}
