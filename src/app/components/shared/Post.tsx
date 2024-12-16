import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShareIcon, HeartIcon, ChatBubbleOvalLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Id, toast } from "react-toastify";

export interface Comment {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
  author: {
    avatar: string;
    displayName: string;
  };
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
  userId: string;
  avatar: string;
  displayName: string;
  onPostUpdated: () => void; 
  onDelete: (postId: string) => void;
  currentUser: { _id: string; displayName: string; avatar: string };
}

const Post: React.FC<PostProps> = ({
  _id,
  content,
  url,
  createdDate,
  tags = [],
  likes,
  comments,
  userId,
  avatar,
  displayName,
  onPostUpdated,
  onDelete,
  currentUser,
}) => {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const menuRef = useRef<HTMLDivElement>(null);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [hasLiked, setHasLiked] = useState(
    currentUser && likes.includes(currentUser._id)
  );
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);

  const handleMoreButton = () => {
    setShowPostMenu((prev) => !prev);
  };

  const handleEdit = () => {
    setShowPostMenu(false);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    setShowPostMenu(false);
    const confirmDeleteToast = (toastId: Id) => {
      const timeoutId = setTimeout(() => {
        toast.dismiss(toastId);
      }, 5000);
  
      toast.update(toastId, {
        render: (
          <div className="text-start p-2">
            <p className="text-gray-800 font-medium">Bạn có muốn xóa bài viết này?</p>
            <div className="mt-4 flex justify-start space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={async () => {
                  clearTimeout(timeoutId);
                  await confirmDelete();
                  toast.dismiss(toastId);
                }}
              >
                Xác nhận
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => {
                  clearTimeout(timeoutId);
                  toast.dismiss(toastId);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        ),
        autoClose: false,
        closeOnClick: false,
      });
    };

    const toastId = toast('Processing deletion...', {
      autoClose: false,
      closeOnClick: false,
    });
  
    confirmDeleteToast(toastId);
  };
  
  const confirmDelete = async () => {
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
        toast.success('Xóa bài viết thành công!');
        onDelete(_id);
      } else {
        toast.error('Xóa bài viết thất bại.');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xóa bài viết.');
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
        toast.success('Cập nhật bài viết thành công!');
        onPostUpdated();
      } else {
        toast.error('Cập nhật bài viết thất bại.');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi cập nhật bài viết.');
    } finally {
      setShowEditModal(false);
    }
  };

  const handleLike = async () => {
    try {
      const newLikeStatus = !hasLiked;
      setHasLiked(newLikeStatus);
      setLikesCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));
  
      const response = await fetch(`/api/likePost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, userId: currentUser._id, like: newLikeStatus }),
      });
  
      const data = await response.json();
  
      if (!data.success) {
        setHasLiked(!newLikeStatus);
        setLikesCount((prev) => (newLikeStatus ? prev - 1 : prev + 1));
      }
    } catch (error) {
      setHasLiked(!hasLiked);
      setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1));
    }
  };

  const handleAddComment = async () => {
    console.log(userId);
    console.log(currentUser);
    if (!newComment.trim()) return;

    try {
      const response = await fetch("/api/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: _id,
          userId: currentUser._id,
          content: newComment,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCommentsList((prev) => [...prev, data.comment]);
        setNewComment("");
        onPostUpdated();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch("/api/deleteComment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      const data = await response.json();
      if (data.success) {
        setCommentsList((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
        onPostUpdated();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPostMenu(false);
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
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
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

        {currentUser._id === userId && (
          <div className="relative" ref={menuRef}>
            <EllipsisHorizontalIcon
              onClick={handleMoreButton}
              className="h-5 w-5 text-gray-700 cursor-pointer"
            />
            {/* Dropdown Menu */}
            {showPostMenu && (
              <div className="absolute right-0 bg-white border border-gray-300 rounded shadow-lg w-28">
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
        )}
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
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${hasLiked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <HeartIcon className="h-6 w-6" />
          <span>{likesCount}</span>
        </button>
        <button className="flex items-center space-x-1">
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          <span>{comments.length}</span>
        </button>
        <button className="flex items-center space-x-1">
          <ShareIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <div className="space-y-2">
          {comments.map((comment) => (
            <div key={comment._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-bold">{comment.author.displayName}:</p>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
              {currentUser._id === comment.userId && (
                  <XMarkIcon
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-gray-300 hover:text-gray-700 transition w-4 h-4 cursor-pointer"
                  />
                )}
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="mt-3 flex items-center justify-center gap-4">
          <input
            placeholder="Nhập bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-full text-sm flex-grow"
          />
          {newComment.trim() && (
            <button
              onClick={handleAddComment}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              Đăng
            </button>
          )}
        </div>
      </div>

      {/* Edit Post Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 p-3 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Sửa bài viết</h3>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows={5}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Post;
