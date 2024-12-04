'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import PostComponent, { PostProps } from './components/shared/Post';

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('/api/fetchPosts');
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    };

    getPosts();
  }, []);

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
          <div
            className="flex-grow border-b border-gray-300 focus-within:border-gray-400 text-sm p-2 cursor-pointer"
            onClick={() => setShowPostModal(true)}
          >
            Có gì mới?
          </div>
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

      {showPostModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-4" />
              <span>Long Vũng</span>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-400 mb-4"
              rows={4}
              placeholder="Hãy chia sẻ những suy nghĩ của bạn..."
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button className="text-blue-500 hover:text-blue-600 transition">
                  <i className="fas fa-image"></i>
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition">
                  <i className="fas fa-smile"></i>
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition">
                  <i className="fas fa-location-arrow"></i>
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  onClick={() => setShowPostModal(false)}
                >
                  Đăng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition">
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
