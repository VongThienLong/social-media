import React from 'react';
import { ChevronDownIcon, ShareIcon, HeartIcon, ChatBubbleOvalLeftIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <header className="flex justify-center items-center mb-4 gap-4">
        <h1 className="text-md font-bold">Dành cho bạn</h1>
        <button className="flex items-center p-1 shadow-md border-solid border-black rounded-full">
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </header>

      <div className="w-full max-w-xl bg-white shadow-md rounded-lg">
        <div className="flex items-center px-6 py-4 gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
          <input
            type="text"
            placeholder="Có gì mới?"
            className="flex-grow border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm p-2"
          />
          <button className="ml-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Đăng
          </button>
        </div>
        
        <div className="border-t border-gray-300 my-2" />

        {/* Post Section */}
        <div className="w-full max-w-xl ">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              {/* Individual Post */}
              <div className="px-6 py-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-2 justify-between">
                  <div className='flex items-center gap-4'>
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    {/* Username and Time */}
                    <div>
                      <p className="text-sm font-semibold">longvong</p>
                      <p className="text-xs text-gray-500">1 phút</p>
                    </div>
                  </div>
                  {/* More Options */}
                  <button className="ml-auto text-gray-500">•••</button>
                </div>
                {/* Post Content */}
                <p className="text-sm text-gray-800 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                  penatibus et magnis dis parturient montes.
                </p>
                {/* Post Image */}
                <div className="bg-gray-200 rounded-md h-72 mb-4" />
                {/* Interaction Buttons */}
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <button className="flex items-center space-x-1">
                    <HeartIcon className="h-6 w-6" />
                    <span>1</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <ChatBubbleOvalLeftIcon className='h-6 w-6' />
                    <span>1</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <ArrowPathIcon className='h-6 w-6' />
                    <span>1</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <ShareIcon className='h-5 w-5' />
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-300 my-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition">
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
