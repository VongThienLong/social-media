"use client";
import React, {useEffect, useState } from "react";


interface Contact {
  _id: string;
  name: string;
  fullname: string;
  time: string;
  active: boolean;
  last_message: string;
  userId: string;
  displayName: string;
  avatar: string;
  messages?: Message[];
}

interface Message {
  senderId: string;
  content: string;
  timestamp: string;
}


const Sidebar = ({
  contacts,
  onSelectContact,
  users,  
}: {
  contacts: Contact[];
  onSelectContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  users: Contact[]; 
}) => {
  const validContacts = Array.isArray(contacts) ? contacts : [];
  const validUsers = Array.isArray(users) ? users : []; 

  return (
    <div className="">
      {/* Header */}
      <div className="p-4 md:p-6">
        <h1 className="text-xl font-bold">LXHISME</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Horizontal Avatar List */}
      <div className="px-4 py-2 ">
      <div className="flex items-center gap-6 justify-start mb-2">
  {validUsers.slice(0, 4).map((user, index) => (
    <div
      key={index}
      className={`relative flex flex-col items-center ${
        index >= 3 && "hidden 2xl:flex"
      } ${index >= 6 && "hidden lg:flex"}`}
    >
      {/* Avatar */}
      <div
        className="w-16 h-16 bg-gray-300 rounded-full"
        style={{
          backgroundImage: `url(${user.avatar})`,
          backgroundSize: "cover",
        }}
      >
        {/* Active Dot */}
        {user.active && (
          <div className="absolute bottom-6 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border border-white"></div>
        )}
      </div>

      {/* Display Name */}
      <div className="mt-1 text-sm font-medium text-gray-800">
        {user.displayName}
      </div>
    </div>
  ))}
</div>

        {/* Tabs */}
        <div className="flex justify-between text-center pt-2">
          <span className=" text-sm font-bold">Tin nhắn</span>
          <span className="flex-2 text-sm text-gray-500 pb-1">Tin nhắn đang chờ</span>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {validContacts.map((contact, index) => (
          <div
            key={index}
            onClick={() => onSelectContact(contact)} 
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-12 h-12 bg-gray-300 rounded-full"
                  style={{
                    backgroundImage: `url(${contact.avatar})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                {contact.active && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
              {/* Name and Message */}
              <div>
                <p className="font-medium">{contact.displayName}</p>
                <p className="text-sm text-gray-500">{contact.last_message}</p>
              </div>
            </div>
            {/* Time */}
            <p className="text-sm text-gray-400">{contact.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatBox = ( { selectedContact, }: { selectedContact: Contact | null }) => {
  const [message, setMessage] = useState<string>(''); 
  const [isSending, setIsSending] = useState<boolean>(false); 
  if (!selectedContact) { return (<div className="  w-4/5  text-center items-center justify-center hidden md:flex ">
    <div className="flex items-center justify-center  ">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24  rounded-full flex items-center justify-center">
          <svg aria-label=""  fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title></title><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Tin nhắn của bạn</h2>
        <p className="text-gray-400 mb-6">
          Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Gửi tin nhắn
        </button>
      </div>
    </div></div>);}
    
    // Hàm gửi tin nhắn
    const createMessage = async () => {
      if (!message.trim()) return; // Kiểm tra xem tin nhắn có trống không
    
      setIsSending(true); // Đặt trạng thái gửi đang diễn ra
      const newMessage = {
        senderId: "647e915f3dbfbb6c487d9abd",
        content: message,
        timestamp: new Date().toLocaleTimeString().slice(0, 5), // Lấy giờ và phút
        read: false,
        message_id: Math.random().toString(36).substr(2, 9), // Tạo ID tin nhắn ngẫu nhiên
      };
    
      
      try {
        const response = await fetch('/api/createMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatboxId: selectedContact._id,
            newMessage,
          }),
        });
    
        if (response.ok) {
          
          const data = await response.json();
          selectedContact.messages = selectedContact.messages ?? []; 
          selectedContact.messages.push(newMessage); 
    
          setMessage(''); 
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    
      setIsSending(false); 
    };
    

  return (
    <div className=" w-full md:w-4/5  flex-col flex h-[87%] md:h-screen">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full" style={{
                backgroundImage: `url(${selectedContact.avatar})`,
                backgroundSize: "cover",
              }}>
          </div>
          <div>
            <h2 className="font-bold">{selectedContact.displayName}</h2>
            <p className="text-sm text-gray-500">Đang hoạt động</p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4">
          <button><svg aria-label="Gọi thoại"  fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Gọi thoại</title><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg></button>
          <button><svg aria-label="Gọi video"  fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Gọi video</title><rect fill="none" height="18" rx="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button>
          <button><svg aria-label="Thông tin về cuộc trò chuyện" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Thông tin về cuộc trò chuyện</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg></button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 ">
        {/* Ảnh đại diện */}
        <div className="w-24 h-24 bg-gray-300 rounded-full" style={{
                backgroundImage: `url(${selectedContact.avatar})`,
                backgroundSize: "cover",
              }}></div>
        
        {/* Tên và Username */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{selectedContact.fullname}</h2>
          <p className="text-gray-500">{selectedContact.displayName}</p>
        </div>
        
        {/* Nút Xem trang cá nhân */}
        <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300">
          Xem trang cá nhân
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 bg-gray-50  " >
        {selectedContact ? (
          <div>
            {selectedContact.messages?.map((message, index) => (
              <div key={index} className={`mb-4 ${message.senderId === selectedContact.userId ? 'text-left' : 'text-right'}`}>
                <div
                  className={`${
                    message.senderId === selectedContact.userId
                      ? 'bg-gray-200'
                      : 'bg-blue-500 text-white'
                  } p-2 rounded-3xl inline-block `}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">Chọn một cuộc trò chuyện!</p>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className=" bg-gray-50">
        <div className="mt-4 border-b mb-4 mr-4 border-t-rgb(var(--ig-elevated-separator)) border-b-rgb(var(--ig-elevated-separator)) border-t border-l border-r border-l-rgb(var(--ig-elevated-separator)) flex-col flex rounded-bl-3xl rounded-tr-3xl items-stretch rounded-tl-3xl rounded-br-3xl border-r-rgb(var(--ig-elevated-separator)) ml-4 ">
          <div className="min-h-[2.75rem] pl-3 pr-4 flex items-center">
            <div className=" content-stretch rounded-bl-none bg-transparent flex-col box-border flex rounded-br-none static items-stretch">
              <div className="pt-1 pl-1 pr-1 border-l-[0] justify-center bg-transparent border-r-[0] box-border flex items-center cursor-pointer ml-0 mr-0">
                <div className="justify-center flex-col flex items-center">
                <svg aria-label="Chọn biểu tượng cảm xúc" className="text-rgb(var(--ig-primary-text)) relative block " fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Chọn biểu tượng cảm xúc</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                </div>
              </div>
            </div>
            <div className=" min-w-0 min-h-0  mr-1 content-stretch rounded-bl-none bg-transparent flex-col box-border flex rounded-br-none static items-stretch self-auto justify-start flex-grow ml-2 rounded-tl-none rounded-tr-none">
        <div className="relative">
          <textarea 
             value={message}
             onChange={(e) => setMessage(e.target.value)}
              className="w-full border-none bg-transparent text-rgb(var(--ig-primary-text)) focus:outline-none resize-none" rows={1} placeholder="Nhắn tin..."
          ></textarea>
        </div>
      </div>
            <div className="items-center flex ">
              <div className="pb-2 mt-0 mb-0 border-t-[0] pt-2 border-b-[0] pl-2 border-l-[0] justify-center bg-transparent border-r-[0] box-border flex items-center cursor-pointer pr-2 ml-0 mr-0">
                <div className="justify-center flex-col flex items-center">
                <svg className="text-rgb(var(--ig-primary-text)) relative block text-rgb(var(--ig-primary-text)) " aria-label="Clip âm thanh" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Clip âm thanh</title><path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8.706" x2="15.104" y1="22" y2="22"></line><path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                </div>
              </div>
              <div className="pb-2 mt-0 mb-0 border-t-[0] pt-2 border-b-[0] pl-2 border-l-[0] justify-center bg-transparent border-r-[0] box-border flex items-center cursor-pointer pr-2 ml-0 mr-0">
                <div className="justify-center flex-col flex items-center">
                <svg className="text-rgb(var(--ig-primary-text)) relative block text-rgb(var(--ig-primary-text)) " aria-label="Thêm ảnh hoặc video"  fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Thêm ảnh hoặc video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fill-rule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>            </div>
              </div>
              <div className="pb-2 mt-0 mb-0 border-t-[0] pt-2 border-b-[0] pl-2 border-l-[0] justify-center bg-transparent border-r-[0] box-border flex items-center cursor-pointer pr-2 ml-0 mr-0">
                <div className="justify-center flex-col flex items-center">
                <svg className="text-rgb(var(--ig-primary-text)) relative block text-rgb(var(--ig-primary-text)) " aria-label="Thích"  fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Thích</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>            </div>
              </div>
              <div className="pb-2 mt-0 mb-0 border-t-[0] pt-2 border-b-[0] pl-2 border-l-[0] justify-center bg-transparent border-r-[0] box-border flex items-center cursor-pointer pr-2 ml-0 mr-0">
                <div className="justify-center flex-col flex items-center">
                <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      className="cursor-pointer"
      onClick={createMessage} 
    >
      <path d="M 2 3 L 2 21 L 22 12 L 2 3 z M 4 6.09375 L 17.126953 12 L 4 17.90625 L 4 13.226562 L 13 12 L 4 10.773438 L 4 6.09375 z"/>
    </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





export default function MessagePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<Contact[]>([]); 
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/fetchMessages');
        const data = await response.json();
        setUsers(data.users);  
        setContacts(data.formattedMessages);  
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex h-screen ">
      <div className="w-full sm:w-2/5 2xl:w-1/5 bg-gray-100 h-full hidden md:flex flex-col ">
        <Sidebar contacts={contacts} users={users} onSelectContact={setSelectedContact} />
      </div>
      <div className="flex-1">
        {/* Hiển thị Sidebar chỉ trên mobile/tablet và khi không có contact được chọn */}
        <div className="sm:hidden">
          {!selectedContact && (
            <Sidebar contacts={contacts} users={users} onSelectContact={setSelectedContact} />
          )}
        </div>
      </div>
      {/* Hiển thị ChatBox khi có contact được chọn, trên mọi màn hình */}
      <ChatBox selectedContact={selectedContact} />
    </div>
  );
}
