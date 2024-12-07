"use client";
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho `user` và `formData`
interface User {
  fullname: string;
  displayName: string;
  followers: number;
  following: number;
}

interface FormData {
  fullname: string;
  displayName: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    fullname: "Nguyễn Kim",
    displayName: "nbk473",
    followers: 0,
    following: 1,
  });

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    displayName: "",
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/userPost");
      const data = await response.json();
      setPosts(data.posts || []); // Gán danh sách bài viết từ API
    }
    fetchPosts();
  }, []);

  // Khởi tạo dữ liệu form khi user thay đổi
  useEffect(() => {
    setFormData({
      fullname: user.fullname,
      displayName: user.displayName,
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser({ ...user, ...formData }); // Cập nhật thông tin người dùng
    setIsEditing(false); // Đóng form chỉnh sửa
  };

  const handleCancel = () => {
    setFormData({
      fullname: user.fullname,
      displayName: user.displayName,
    });
    setIsEditing(false); // Đóng form chỉnh sửa
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <div className="flex-1 text-xl font-bold">{user.displayName}</div>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-black">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Information */}
        <div className="flex items-center space-x-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <img
              src="/default-avatar.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">{user.displayName}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm bg-gray-200 rounded"
              >
                Chỉnh sửa trang cá nhân
              </button>
            </div>

            {/* Thông tin số liệu */}
            <div className="mt-2 text-gray-500 text-sm">
              {posts.length} bài viết • {user.followers} người theo dõi • Đang
              theo dõi {user.following} người dùng
            </div>

            <div className="mt-2 text-gray-500 text-sm">
              {user.fullname} • @{user.displayName}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-6 p-4 bg-white border rounded shadow-sm">
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa thông tin</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-t mt-6 flex justify-around text-sm text-gray-500">
          <button className="py-2 border-b-2 border-black font-medium text-black">
            Bài viết
          </button>
          <button className="py-2">Đã lưu</button>
          <button className="py-2">Được gắn thẻ</button>
        </div>

        {/* Post Section */}
        <div className="mt-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-700 mt-2">{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-12">
              <p className="text-gray-500">Người dùng chưa đăng bài viết nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
