import { connectToDatabase } from '../libs/mongodb';

export default async function HomePage() {
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find({}).toArray();

  return (
    <div>
      {/* <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user._id}{user.name}</li>
        ))}
      </ul> */}
    </div>
  );
}
