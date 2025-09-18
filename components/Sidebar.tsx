'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Shield, Star, Edit, User, X } from 'lucide-react';
import storage from '@/lib/storage';
import PostCard from './PostCard';

interface SidebarProps {
  // 移除followingList相关props
}

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState({ name: 'Demo User', aiCoins: 247 });
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([]);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const currentUser = storage.getCurrentUser();
      const bookmarks = storage.getBookmarkedPosts();
      const posts = storage.getUserPublishedPosts();
      setUser(currentUser);
      setBookmarkCount(bookmarks.length);
      setPostCount(posts.length);
      setBookmarkedPosts(bookmarks);
      setUserPosts(posts);
    }
  }, []);

  const handleBookmarksClick = () => {
    setShowBookmarks(true);
    setShowMyPosts(false);
  };

  const handleMyPostsClick = () => {
    setShowMyPosts(true);
    setShowBookmarks(false);
  };

  const closeModals = () => {
    setShowBookmarks(false);
    setShowMyPosts(false);
  };

  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/guide', label: 'Beginner Guide', icon: BookOpen },
    { href: '/safety', label: 'Community Safety', icon: Shield },
  ];

  const personalItems = [
    { label: 'My Bookmarks', icon: Star, count: bookmarkCount, onClick: handleBookmarksClick },
    { label: 'My Posts', icon: Edit, count: postCount, onClick: handleMyPostsClick },
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
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors w-full text-left text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </button>
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
            <p className="text-xs text-gray-500">{user.aiCoins} AI Coins</p>
          </div>
        </div>
      </div>

      {/* 收藏夹模态框 */}
      {showBookmarks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                My Bookmarks
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {bookmarkedPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                  <p className="text-gray-500 mb-6">Start exploring and bookmark posts you find interesting!</p>
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={closeModals}
                  >
                    <Home className="w-4 h-4" />
                    Explore Posts
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {bookmarkedPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 我的帖子模态框 */}
      {showMyPosts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-500" />
                My Posts
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {userPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Edit className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-6">Share your first post and start contributing to the community!</p>
                  <Link 
                    href="/post/new"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={closeModals}
                  >
                    <Edit className="w-4 h-4" />
                    Create Post
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}