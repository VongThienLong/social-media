import React from 'react';
import Image from 'next/image';
import { ShareIcon, HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

export interface Comment {
  userId: string;
  comment: string;
  createdAt: string;
}

export interface PostProps {
  _id: string;
  content: string;
  url?: string;
  createdDate: string;
  tags?: string[];
  likes: string[];
  visibility: string;
  comments: Comment[];
  avatar: string;
  displayName: string;
}

const Post: React.FC<PostProps> = ({
  content,
  url,
  createdDate,
  tags = [],
  likes,
  comments,
  avatar, 
  displayName
}) => {
  return (
    <div className="p-3 md:px-6 md:py-4 border-t border-gray-300">
      {/* User Info */}
      <div className="flex items-center space-x-2 mb-4 justify-between">
        <div className="flex items-center space-x-3 cursor-pointer">
        <div className="flex w-10 h-10 rounded-full overflow-hidden">
          <Image
              src={avatar}
              alt="User Avatar"
              width={40} 
              height={40} 
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="text-xs text-gray-500">{new Date(createdDate).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-sm text-gray-800 mb-3">{content}</p>

      {/* Post Image */}
      {url && (
        <div className='w-full mb-3'>
          <Image
            src={url}
            alt="Post Image"
            width={200}
            height={200}
            objectFit="cover"
            className="object-cover w-full rounded-lg"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex space-x-2 text-sm text-blue-500">
        {tags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
        <button className="flex items-center space-x-1">
          <HeartIcon className="h-6 w-6" />
          <span>{likes.length}</span>
        </button>
        <button className="flex items-center space-x-1">
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          <span>{comments.length}</span>
        </button>
        <button className="flex items-center space-x-1">
          <ShareIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Post;