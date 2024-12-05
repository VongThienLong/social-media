'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import PostComponent, { PostProps } from './components/shared/Post';
import Image from 'next/image';

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch posts data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/fetchPosts');
        const data = await response.json();
    
        const sortedPosts = data.sort((a: PostProps, b: PostProps) => {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        });
    
        console.log('Sorted Posts:', sortedPosts);
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();    
  }, []);

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/fetchUserId?id=647e915f3dbfbb6c487d9abc');
        const currentUser = await response.json();
        setCurrentUser(currentUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Handle file change (Image upload)
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'social-media');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dbwhalglx/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setImageURL(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Handle post submission
  const handlePostSubmit = async () => {
    if (!postContent.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newPost: any = {
      userId: currentUser._id,
      content: postContent,
      createdDate: new Date().toISOString(),
      tags: [],
      likes: [],
      visibility: 'public',
      comments: [],
      userInfo: {
        avatar: currentUser.avatar,
        displayName: currentUser.displayName,
      },
    };

    if (imageURL) {
      newPost.url = imageURL;
    }

    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      const result = await response.json();
      if (result.success) {
        // Fetch posts again after successfully creating a new post
        await fetchPosts(); // Ensure the new post is added to the list

        // Reset modal and form state
        setShowPostModal(false);
        setSelectedImage(null);
        setImageURL(null);
        setPostContent('');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post.');
    } finally {
      setIsSubmitting(false);
    }
  };

// Function to fetch posts from the server
const fetchPosts = async () => {
  try {
    const response = await fetch('/api/fetchPosts');
    const data = await response.json();
    console.log('Posts:', data);
    setPosts(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('postModal');
      if (modal && !modal.contains(event.target as Node)) {
        setShowPostModal(false);
      }
    };

    if (showPostModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPostModal]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen px-2 md:px-4">
      {/* Header */}
      <header className="flex justify-center items-center my-3 gap-4">
        <h1 className="text-md font-bold">Dành cho bạn</h1>
        <button className="flex items-center p-1 shadow-md border-solid border-black rounded-full">
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </header>

      {/* Post Input Section */}
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg">
        <div className="flex items-center p-3 md:px-6 md:py-4 gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-300">
            <Image
              src={currentUser?.avatar || ''}
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full bg-gray-300 mr-4"
            />
          </div>
          <div
            className="flex-grow border-b border-gray-300 focus-within:border-gray-400 text-sm p-2 cursor-pointer"
            onClick={() => setShowPostModal(true)}
          >
            Có gì mới?
          </div>
          <button
            className="ml-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={handlePostSubmit}
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Đang đăng...' : 'Đăng'} {/* Button text changes based on submission state */}
          </button>
        </div>

        {/* Posts Section */}
        <div className='mb-10 md:mb-0'>
          {posts.length > 0 ? (
            posts.map((post: PostProps) => (
              <PostComponent key={post._id} {...post} />
            ))
          ) : (
            <p className="text-gray-500 text-center m-4">Không có bài đăng nào để hiển thị.</p>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div id="postModal" className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 md:p-6 m-2">
            <div className="flex items-center mb-4">
              <Image
                src={currentUser?.avatar || ''}
                alt="User Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full bg-gray-300 mr-4"
              />
              <span>{currentUser.displayName}</span>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-400 mb-4"
              rows={4}
              placeholder="Hãy chia sẻ những suy nghĩ của bạn..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="w-full flex justify-between items-center">
              <input className='w-full' type="file" accept="image/*" onChange={handleFileChange} />
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={handlePostSubmit}
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? 'Đang đăng...' : 'Đăng'} {/* Button text changes based on submission state */}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition hidden md:block">
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
