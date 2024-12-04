import React from 'react';
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
  location?: string;
  tags?: string[];
  likes: string[];
  visibility: string;
  comments: Comment[];
  displayName: string;
  avatar: string;
}

const Post: React.FC<PostProps> = ({
  content,
  url,
  createdDate,
  location,
  tags = [],
  likes,
  comments,
  displayName,
  avatar,
}) => {
  return (
    <div className="px-6 py-4 border-t border-gray-300">
      {/* User Info */}
      <div className="flex items-center space-x-2 mb-4 justify-between">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div
            className="w-10 h-10 rounded-full"
            style={{ backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
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
        <div
          className="bg-gray-200 rounded-md h-72 mb-3"
          style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
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