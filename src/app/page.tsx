import React from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import PostComponent, { PostProps } from './components/shared/Post';
import { connectToDatabase } from '../libs/mongodb';

async function fetchPosts(): Promise<PostProps[]> {
  try {
    const { db } = await connectToDatabase();
    const posts = await db.collection('post').find({}).toArray();

    const users = await db.collection('users').find({}).toArray();
    const userMap = users.reduce((acc:any, user:any) => {
      acc[user._id.toString()] = {
        displayName: user.displayName,
        avatar: user.avatar
      };
      return acc;
    }, {} as { [key: string]: { displayName: string; avatar: string } });

    return posts.map((post: any) => ({
      _id: post._id.toString(),
      content: post.content || '',
      createdDate: post.createdDate || new Date().toISOString(),
      likes: post.likes || [],
      comments: post.comments || [],
      url: post.url || '',
      location: post.location || '',
      tags: post.tags || [],
      visibility: post.visibility || 'public',
      displayName: userMap[post.userId]?.displayName || '',
      avatar: userMap[post.userId]?.avatar || ''
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <header className="flex justify-center items-center mb-4 gap-4">
        <h1 className="text-md font-bold">Dành cho bạn</h1>
        <button className="flex items-center p-1 shadow-md border-solid border-black rounded-full">
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </header>

      {/* Post Input Section */}
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg">
        <div className="flex items-center px-6 py-4 gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <input
            type="text"
            placeholder="Có gì mới?"
            className="flex-grow border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm p-2"
          />
          <button className="ml-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Đăng
          </button>
        </div>  

        {/* Posts Section */}
        <div>
          {posts.length > 0 ? (
            posts.map((post: PostProps) => (
              <PostComponent
                key={post._id}
                _id={post._id}
                content={post.content}
                url={post.url}
                createdDate={post.createdDate}
                location={post.location}
                tags={post.tags}
                likes={post.likes}
                comments={post.comments}
                visibility={post.visibility}
                displayName={post.displayName}
                avatar={post.avatar}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">Không có bài đăng nào để hiển thị.</p>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition">
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}