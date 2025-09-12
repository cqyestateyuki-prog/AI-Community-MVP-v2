'use client';

/**
 * AI Community MVP v2
 * Copyright (c) 2025 Designer: Qingyu Cao
 * All rights reserved.
 * 
 * Commercial use permitted under MIT License
 * For commercial licensing, contact: cqyestateyuki@gmail.com
 */

// 首页组件 - AI社区的主入口页面
// Homepage Component - Main entry page for AI Community

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Search, Plus, 
  Heart, MessageCircle, Eye, Flame, Compass, 
  Tv, User, Clock, ArrowRight, X, Code, Calendar, MessageSquare, ThumbsUp
} from 'lucide-react';
import storage, { type Post } from '@/lib/storage';
import { formatDistanceToNow } from 'date-fns';
import AppLayout from '../components/AppLayout';
import NewPostDropdown from '../components/NewPostDropdown';

export default function HomePage() {
  // 状态管理 - 管理页面数据和UI状态
  // State Management - Manage page data and UI state
  const [posts, setPosts] = useState<Post[]>([]); // 帖子列表
  const [loading, setLoading] = useState(true); // 加载状态
  const [mounted, setMounted] = useState(false); // 客户端挂载状态
  const [searchQuery, setSearchQuery] = useState(''); // 搜索查询
  const [searchOpen, setSearchOpen] = useState(false); // 搜索框展开状态
  const [sortMode, setSortMode] = useState<'relevance' | 'latest'>('relevance'); // 排序模式
  const [pickedTags, setPickedTags] = useState<string[]>([]); // 选中的标签
  const [tagDraft, setTagDraft] = useState(''); // 标签草稿

  // 模拟关注列表数据 - 用于侧边栏显示
  // Mock following list data - For sidebar display
  const followingList = [
    { id: 1, name: 'Alice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', lastActivity: 'posted a new Sharing · 3 mins ago' },
    { id: 2, name: 'Zero Lab', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZeroLab', lastActivity: 'published a Tutorial · 1 hr ago' },
    { id: 3, name: 'Creator 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Creator1', lastActivity: 'shared a Prompt · 2 hrs ago' },
  ];

  // 默认标签 - 用于搜索过滤
  // Default tags - For search filtering
  const defaultTags = ['#ChatGPT', '#Claude', '#PromptEngineering', '#Tutorial', '#Sharing'];

  // 数据加载效果 - 在客户端挂载后加载帖子数据
  // Data loading effect - Load post data after client-side mounting
  useEffect(() => {
    // 确保在客户端加载数据，避免服务端渲染不匹配
    // Ensure data loading on client-side to avoid SSR mismatch
    if (typeof window !== 'undefined') {
      console.log('Loading posts from storage...');
      const allPosts = storage.getLatest(20); // 获取最新20个帖子
      console.log('Loaded posts:', allPosts.length, 'posts'); // 调试日志
      console.log('First post:', allPosts[0]); // 调试日志
      console.log('All posts:', allPosts); // 调试日志
      setPosts(allPosts);
      setMounted(true); // 标记客户端已挂载
      setLoading(false); // 结束加载状态
    }
  }, []);

  // 过滤帖子
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.intro?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = pickedTags.length === 0 ||
      pickedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // 添加标签
  const addTag = (tag: string) => {
    if (tag && !pickedTags.includes(tag)) {
      setPickedTags([...pickedTags, tag]);
    }
  };

  // 移除标签
  const removeTag = (tag: string) => {
    setPickedTags(pickedTags.filter(t => t !== tag));
  };

  // 处理标签输入
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagDraft.trim()) {
      e.preventDefault();
      addTag(tagDraft.trim());
      setTagDraft('');
    }
  };

  return (
    <AppLayout>
      <div className="p-8">
          {/* 顶部标题卡片 */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">AI Companion Community</h1>
            <p className="text-gray-600 mb-6">Discuss · Learn · Share · Grow</p>
            
            {/* 操作按钮和搜索 */}
            <div className="flex items-center gap-4">
              {/* 主推功能：Share Prompt 按钮 */}
              <Link 
                href="/post/new?type=prompt_sharing"
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <Code className="w-4 h-4" />
                Share Prompt
              </Link>
              
              <NewPostDropdown />
              <div className="flex-1 max-w-md relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={pickedTags.length > 0 ? `Search posts, prompts or tutorials... (${pickedTags.length} tags)` : "Search posts, prompts or tutorials..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* 搜索过滤器弹窗 */}
                {searchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                    {/* 关闭按钮 */}
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => setSearchOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {/* 排序选项 */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Sort by</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSortMode('relevance')}
                            className={`px-3 py-1 rounded text-sm ${
                              sortMode === 'relevance' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Relevance
                          </button>
                          <button
                            onClick={() => setSortMode('latest')}
                            className={`px-3 py-1 rounded text-sm ${
                              sortMode === 'latest' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Latest
                          </button>
                        </div>
                      </div>

                      {/* 标签选择 */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
                        <div className="space-y-2">
                          {/* 已选择的标签 */}
                          <div className="flex flex-wrap gap-2">
                            {pickedTags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                                <button
                                  onClick={() => removeTag(tag)}
                                  className="hover:text-black"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          
                          {/* 默认标签 */}
                          <div className="flex flex-wrap gap-2">
                            {defaultTags.map(tag => (
                              <button
                                key={tag}
                                onClick={() => addTag(tag)}
                                disabled={pickedTags.includes(tag)}
                                className={`px-2 py-1 text-xs rounded-full border ${
                                  pickedTags.includes(tag)
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>

                          {/* 自定义标签输入 */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Add custom tag..."
                              value={tagDraft}
                              onChange={(e) => setTagDraft(e.target.value)}
                              onKeyPress={handleTagKeyPress}
                              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button
                              onClick={() => {
                                if (tagDraft.trim()) {
                                  addTag(tagDraft.trim());
                                  setTagDraft('');
                                }
                              }}
                              className="px-2 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setPickedTags([]);
                            setSearchQuery('');
                          }}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-black"
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => setSearchOpen(false)}
                          className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Community Updates 卡片区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Trending Prompts 卡片 */}
            <Link href="/trending?type=prompts">
              <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-black">Trending Prompts</h3>
                </div>
                <p className="text-sm text-gray-600">Best Prompt Design: Tips to Boost Writing Efficiency</p>
                <div className="mt-2 text-xs text-gray-500">Click to see all trending prompts →</div>
              </div>
            </Link>

            {/* Trending Posts 卡片 */}
            <Link href="/trending?type=posts">
              <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-black">Trending Posts</h3>
                </div>
                <p className="text-sm text-gray-600">Amazing AI conversations and community discussions</p>
                <div className="mt-2 text-xs text-gray-500">Click to see all trending posts →</div>
              </div>
            </Link>

            {/* Live Events 卡片 */}
            <Link href="/trending?type=events">
              <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Tv className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-black">Events</h3>
                </div>
                <p className="text-sm text-gray-600">Upcoming AI events sorted by date and popularity</p>
                <div className="mt-2 text-xs text-gray-500">Click to see all live events →</div>
              </div>
            </Link>
          </div>

          {/* 帖子网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!mounted || loading ? (
              // Skeleton Loader
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-300 rounded-lg p-6 animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/6" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : filteredPosts.length === 0 ? (
              // Empty State
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No posts found. Try adjusting your search.</p>
              </div>
            ) : (
              // Post Cards
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            )}
          </div>
      </div>
    </AppLayout>
  );
}

// Post Card Component
function PostCard({ post }: { post: Post }) {
  const getPostTypeInfo = (type: string) => {
    switch (type) {
      case 'chat_sharing':
        return {
          icon: MessageSquare,
          color: 'bg-blue-500',
          label: 'Post',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
      case 'prompt_sharing':
        return {
          icon: Code,
          color: 'bg-green-500',
          label: 'Prompt Sharing',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'community_event':
        return {
          icon: Calendar,
          color: 'bg-purple-500',
          label: 'Community Event',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        };
      default:
        return {
          icon: MessageSquare,
          color: 'bg-gray-500',
          label: 'Post',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700'
        };
    }
  };

  const typeInfo = getPostTypeInfo(post.type);

  return (
    <Link href={`/post/${post.id}`}>
      <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer h-96 flex flex-col">
        {/* Author */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm text-black">{post.author.name}</p>
              <span className={`px-2 py-1 ${typeInfo.bgColor} ${typeInfo.textColor} text-xs rounded-full flex items-center gap-1`}>
                <typeInfo.icon className="w-3 h-3" />
                {typeInfo.label}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 text-black line-clamp-2">
            {post.title.length > 60 ? `${post.title.substring(0, 60)}...` : post.title}
          </h3>
          {post.intro && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
              {post.intro.length > 120 ? `${post.intro.substring(0, 120)}...` : post.intro}
            </p>
          )}


          {post.type === 'community_event' && post.eventDate && (
            <div className="bg-purple-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Event</span>
              </div>
              <p className="text-xs text-purple-800">
                {new Date(post.eventDate).toLocaleDateString()} {post.eventLocation && `• ${post.eventLocation}`}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats and View Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {post.likes}
            </span>
            {post.type === 'prompt_sharing' && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {post.votes || 0}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.comments.length}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.viewCount}
            </span>
          </div>
          <button className="text-sm text-black hover:text-gray-600 font-medium flex items-center gap-1 flex-shrink-0">
            View
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Link>
  );
}
