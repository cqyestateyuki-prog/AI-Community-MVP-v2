'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Flame, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  Hash,
  Users,
  Calendar,
  Trophy,
  Star,
  Code,
  MessageSquare,
  Tv
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';
import storage, { type Post } from '../../lib/storage';
import { formatDistanceToNow } from 'date-fns';

interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
  growth: number;
  color: string;
}

export default function TrendingPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'posts';
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  // 根据类型获取配置
  const getTypeConfig = () => {
    switch (type) {
      case 'prompts':
        return {
          title: 'Trending Prompts',
          icon: Code,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          description: 'Most popular and effective prompts shared by the community',
          filterType: 'prompt_sharing'
        };
      case 'posts':
        return {
          title: 'Trending Posts',
          icon: MessageSquare,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          description: 'Most engaging conversations and community discussions',
          filterType: 'chat_sharing'
        };
      case 'events':
        return {
          title: 'Events',
          icon: Tv,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-100',
          description: 'Upcoming AI events sorted by date and popularity',
          filterType: 'community_event'
        };
      default:
        return {
          title: 'Trending Posts',
          icon: MessageSquare,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          description: 'Most engaging conversations and community discussions',
          filterType: 'chat_sharing'
        };
    }
  };

  const typeConfig = getTypeConfig();

  // 模拟热门话题数据
  const mockTrendingTopics: TrendingTopic[] = [
    { id: '1', name: 'Prompt Engineering', posts: 156, growth: 23, color: 'bg-red-500' },
    { id: '2', name: 'ChatGPT Tips', posts: 134, growth: 18, color: 'bg-orange-500' },
    { id: '3', name: 'AI Writing', posts: 98, growth: 15, color: 'bg-yellow-500' },
    { id: '4', name: 'Claude Tricks', posts: 87, growth: 12, color: 'bg-green-500' },
    { id: '5', name: 'Privacy & Safety', posts: 76, growth: 8, color: 'bg-blue-500' },
    { id: '6', name: 'Tutorials', posts: 65, growth: 6, color: 'bg-purple-500' },
  ];

  useEffect(() => {
    // 确保在客户端加载数据
    if (typeof window !== 'undefined') {
      // 模拟加载延迟
      setTimeout(() => {
        const allPosts = storage.getLatest(50);
        
        // 根据类型过滤帖子
        let filteredPosts = allPosts;
        if (typeConfig.filterType) {
          filteredPosts = allPosts.filter(post => post.type === typeConfig.filterType);
        }
        
        // 按热度排序（点赞数 + 评论数 + 浏览量 + 投票统计）
        const sortedPosts = filteredPosts.sort((a, b) => {
        // 对于community_event类型，使用特殊的排序逻辑
        if (a.type === 'community_event' && b.type === 'community_event') {
          // 首先按活动时间排序（越近的越靠前）
          const now = new Date();
          const timeA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
          const timeB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
          
          // 如果活动时间相同或接近，按感兴趣人数排序
          const timeDiff = Math.abs(timeA - timeB);
          if (timeDiff < 24 * 60 * 60 * 1000) { // 24小时内
            const interestedA = a.interestedCount || 0;
            const interestedB = b.interestedCount || 0;
            return interestedB - interestedA;
          }
          
          // 否则按时间排序（越近的越靠前）
          return timeA - timeB;
        }
        
        // 基础分数
        let scoreA = a.likes * 3 + a.comments.length * 2 + a.viewCount;
        let scoreB = b.likes * 3 + b.comments.length * 2 + b.viewCount;
        
        // 对于prompt_sharing类型，考虑投票统计
        if (a.type === 'prompt_sharing' && a.votingStats) {
          scoreA += a.votingStats.totalVotes * 5 + a.votingStats.effectiveness * 10;
        } else {
          scoreA += (a.votes || 0) * 4;
        }
        
        if (b.type === 'prompt_sharing' && b.votingStats) {
          scoreB += b.votingStats.totalVotes * 5 + b.votingStats.effectiveness * 10;
        } else {
          scoreB += (b.votes || 0) * 4;
        }
        
        return scoreB - scoreA;
      });
      
        setPosts(sortedPosts);
        setTrendingTopics(mockTrendingTopics);
        setLoading(false);
      }, 500);
    }
  }, [type, typeConfig.filterType]);

  // 生成随机投票数据
  const getVoteData = (postId: string) => {
    const seed = postId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const totalVotes = Math.floor((Math.sin(seed) + 1) * 400) + 100; // 100-500 votes
    const avgRating = ((Math.cos(seed) + 1) * 2.5) + 2.5; // 2.5-5.0 rating
    return {
      totalVotes,
      avgRating: Math.round(avgRating * 10) / 10 // 保留一位小数
    };
  };

  // 生成随机收藏数
  const getBookmarkCount = (postId: string) => {
    const seed = postId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return Math.floor((Math.cos(seed) + 1) * 200) + 50; // 50-250 bookmarks
  };


  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${typeConfig.bgColor} rounded-lg flex items-center justify-center`}>
              <typeConfig.icon className={`w-4 h-4 ${typeConfig.iconColor}`} />
            </div>
            <h1 className="text-3xl font-bold text-black">{typeConfig.title}</h1>
          </div>
        </div>

        {/* Type Navigation */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Link href="/trending?type=prompts">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === 'prompts' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}>
                <Code className="w-4 h-4 inline mr-2" />
                Trending Prompts
              </button>
            </Link>
            <Link href="/trending?type=posts">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === 'posts' 
                  ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}>
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Trending Posts
              </button>
            </Link>
            <Link href="/trending?type=events">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === 'events' 
                  ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}>
                <Tv className="w-4 h-4 inline mr-2" />
                Live Events
              </button>
            </Link>
          </div>
          <p className="text-gray-600 text-sm mt-2">{typeConfig.description}</p>
        </div>

        {/* Trending Topics - Compact */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Hot Topics</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:shadow-sm transition-shadow"
              >
                <div className={`w-2 h-2 rounded-full ${topic.color}`} />
                <span className="text-sm font-medium text-black">#{topic.name}</span>
                <span className="text-xs text-gray-500">{topic.posts}</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+{topic.growth}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Posts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Top {typeConfig.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last 24 hours</span>
            </div>
          </div>

          {loading ? (
            // Skeleton Loader
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
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
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow"
                >
                  <Link href={`/post/${post.id}`}>
                    <div className="flex items-start gap-4">
                      {/* Ranking */}
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index < 3 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-500">{post.author.name}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {Math.floor(Math.random() * 24)} hours ago
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        {post.intro && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {post.intro}
                          </p>
                        )}

                        {/* Event details for community_event posts */}
                        {post.type === 'community_event' && post.eventDate && (
                          <div className="bg-purple-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span className="text-xs font-medium text-purple-700">Event Details</span>
                            </div>
                            <p className="text-xs text-purple-800">
                              {new Date(post.eventDate).toLocaleDateString()} {post.eventLocation && `• ${post.eventLocation}`}
                            </p>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats and Metrics */}
                        <div className="flex items-center justify-between">
                          {/* Left side - Engagement Stats */}
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            {/* Likes */}
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium text-gray-700">
                                {post.likes}
                              </span>
                            </div>
                            
                            {/* Bookmarks */}
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-700">
                                {getBookmarkCount(post.id)}
                              </span>
                            </div>
                            
                            {/* Comments */}
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">
                                {post.comments.length}
                              </span>
                            </div>
                            
                            {/* For community_event posts, show interested count */}
                            {post.type === 'community_event' && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium text-gray-700">
                                  {post.interestedCount || 0} interested
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Right side - Growth Rate for all post types */}
                          <div className="flex items-center gap-4">
                            {/* For prompt_sharing posts, show voting stats */}
                            {post.type === 'prompt_sharing' && post.votingStats ? (
                              <>
                                <div className="flex items-center gap-1">
                                  <Trophy className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm font-medium text-gray-700">
                                    {post.votingStats.totalVotes} votes
                                  </span>
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm font-medium text-gray-700">
                                    {post.votingStats.effectiveness}/5
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  <span className="text-green-600 font-medium">
                                    {post.votingStats.successRate}% success
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                {/* Growth Rate for other post types (chat_sharing, community_event) */}
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  <span className="text-green-600 font-medium">
                                    +{Math.floor(Math.random() * 50) + 10}% trending
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Community Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">1,234</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">5,678</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">12,345</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">2,345</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
