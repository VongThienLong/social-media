import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShareIcon, HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";

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
  onPostUpdated: () => void; 
  onDelete: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({
  _id,
  content,
  url,
  createdDate,
  tags = [],
  likes,
  comments,
  avatar,
  displayName,
  onPostUpdated,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMoreButton = () => {
    setShowMenu((prev) => !prev);
  };

  const handleEdit = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deletePost`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success('Post deleted successfully!');
        onDelete(_id);
      } else {
        toast.error('Failed to delete post.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the post.');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/updatePost`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          content: updatedContent,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success('Post updated successfully!');
        onPostUpdated();
      } else {
        toast.error('Failed to update post.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the post.');
    } finally {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-3 md:px-6 md:py-4 border-t border-gray-300 relative">
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
            <p className="text-xs text-gray-500">
              {new Date(createdDate).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <EllipsisHorizontalIcon
            onClick={handleMoreButton}
            className="h-5 w-5 text-gray-700 cursor-pointer"
          />
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-28">
              <button
                onClick={handleEdit}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Sửa
              </button>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="text-sm text-gray-800 mb-3">{content}</p>

      {/* Post Image */}
      {url && (
        <div className="w-full mb-3">
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

      {/* Edit Post Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Post</h3>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows={5}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
