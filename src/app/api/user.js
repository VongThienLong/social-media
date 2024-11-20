import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users').find({}).toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
}