'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Shield, Star, Edit, User } from 'lucide-react';
import storage from '@/lib/storage';

interface SidebarProps {
  // 移除followingList相关props
}

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState({ name: 'Demo User', aiCoins: 247 });
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const currentUser = storage.getCurrentUser();
      const bookmarks = storage.getBookmarkedPosts();
      const posts = storage.getUserPublishedPosts();
      setUser(currentUser);
      setBookmarkCount(bookmarks.length);
      setPostCount(posts.length);
    }
  }, []);

  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/guide', label: 'Beginner Guide', icon: BookOpen },
    { href: '/safety', label: 'Community Safety', icon: Shield },
  ];

  const personalItems = [
    { href: '/bookmarks', label: 'My Bookmarks', icon: Star, count: bookmarkCount },
    { href: '/my-posts', label: 'My Posts', icon: Edit, count: postCount },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-300 h-screen flex flex-col fixed left-0 top-0 z-10">
      {/* 导航内容区域 - 可滚动 */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="p-6 space-y-8">
          {/* 导航菜单 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Navigation
            </h2>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 个人数据 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Personal
            </h2>
            <nav className="space-y-2">
              {personalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 底部用户信息 - 固定在底部 */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black truncate">{user.name}</p>
            <p className="text-xs text-gray-500">
              {mounted ? `${user.aiCoins} AI Coins` : '100 AI Coins'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}