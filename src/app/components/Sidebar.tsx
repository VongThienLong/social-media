  "use client";

  import placeholder from '../assets/images/profile_placeholder.png';
  import Image from 'next/image';
  import Link from 'next/link';
  import { ReactNode } from 'react';
  import {
    HomeIcon,
    UserGroupIcon,
    BellIcon,
    ChatBubbleOvalLeftIcon,
    UsersIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    BookmarkIcon,
    Cog8ToothIcon
  } from '@heroicons/react/24/outline';


  interface SidebarComponentProps {
    children: ReactNode;
  }

  function SidebarComponent({ children }: SidebarComponentProps) {
    return (
      <div className="flex w-full h-full">
        {/* Sidebar - Hidden on Mobile */}
        <div className='fixed top-0 left-0 h-full bg-gray-100 shadow-md md:block items-center transition-width duration-300 hidden'>
          <div className='flex flex-col h-full justify-between'>
            {/* Sidebar Logo */}
            <div className="flex items-center justify-center w-12 h-12 rounded-lg mx-auto my-2 bg-blue-500">
              <div className="text-white font-bold text-xl">SM</div>
            </div>

            {/* Sidebar Content */}
            <nav className='flex flex-col'>
              <div className='flex flex-col items-center space-y-4 p-4'>
                <Link href="/" className="p-2 rounded-lg hover:bg-gray-200">
                  <HomeIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <Link href="#" className="p-2 rounded-lg hover:bg-gray-200">
                  <UsersIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <Link href="#" className="p-2 rounded-lg hover:bg-gray-200">
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <Link href="/message" className="p-2 rounded-lg hover:bg-gray-200">
                  <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <Link href="#" className="p-2 rounded-lg hover:bg-gray-200">
                  <UserGroupIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <Link href="#" className="p-2 rounded-lg hover:bg-gray-200">
                  <BookmarkIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <Link href="#" className="p-2 rounded-lg hover:bg-gray-200">
                  <BellIcon className="h-6 w-6 text-gray-700" />
                </Link>
              </div>
            </nav>

            <div className='flex flex-col items-center space-y-3 p-4 mb-4'>
                <Link href="/profile" className="p-2 rounded-lg">
                  <Image src={placeholder} alt="Profile" className="h-8 w-8 rounded-full" />
                </Link>
                <Link href="#" className="p-2 rounded-lg hover:bg-gray-200">
                  <Cog8ToothIcon className="h-6 w-6 text-gray-700" />
                </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow mt-[4rem] md:ml-20 md:mt-0">
          <main className="w-full">{children}</main>
        </div>

        {/* Top Navigation - Visible on Mobile Only */}
        <header className="fixed top-0 z-50 flex items-center bg-white justify-between w-full shadow-sm min-h-[4rem] md:hidden px-4">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Logo</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <Link href="#" className="bg-white rounded-full"> 
              <PlusIcon className="h-9   w-9 text-black bg-gray-200 rounded-full p-1" />
            </Link>
            <Link href="#" className="">
              <MagnifyingGlassIcon className="h-7 w-7" />
            </Link>
            <Link href="#" className="">
              <BellIcon className="h-7 w-7" />
            </Link>
          </div>
        </header>

        {/* Bottom Navigation - Visible on Mobile Only */}
        <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white p-3 z-50 md:hidden">
          <Link href="/" className='text-gray-700 hover:text-black'>
            <HomeIcon className="h-7 w-7" />
          </Link>
          <Link href="#" className="text-gray-700 hover:text-black">
            <UsersIcon className="h-7 w-7" />
          </Link>
          <Link href="/" className='text-gray-700 hover:text-black'>
            <BookmarkIcon className="h-7 w-7" />
          </Link>
          <Link href="/message" className='text-gray-700 hover:text-black'>
            <ChatBubbleOvalLeftIcon className="h-7 w-7" />
          </Link>
          <Link href="/" className='text-gray-700 hover:text-black'>
            <UserGroupIcon className="h-7 w-7" />
          </Link>
          <Link href="/profile">
            <Image src={placeholder} alt="Profile" className="h-8 w-8 rounded-full" />
          </Link>
        </nav>
      </div>
    );
  }

  export default SidebarComponent;
