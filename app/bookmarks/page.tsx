'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Heart, MessageCircle, Code, MessageSquare, Calendar } from 'lucide-react';
import storage, { type Post } from '@/lib/storage';
import { formatDistanceToNow } from 'date-fns';
import AppLayout from '../../components/AppLayout';

export default function BookmarksPage() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const posts = storage.getBookmarkedPosts();
    setBookmarkedPosts(posts);
    setLoading(false);
  }, []);

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
          label: 'Event',
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

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-black">My Bookmarks</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">{bookmarkedPosts.length}</div>
              <div className="text-sm text-gray-600">Bookmarked Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {mounted ? storage.getCurrentUser().aiCoins : 100}
              </div>
              <div className="text-sm text-gray-600">AI Coins</div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
        ) : bookmarkedPosts.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No bookmarks yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven&apos;t bookmarked any posts yet. Start exploring and save posts you find interesting!
            </p>
            <div className="space-y-3">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Star className="w-4 h-4" />
                Explore Community Posts
              </Link>
              <div className="text-sm text-gray-500">
                Click the <Star className="w-4 h-4 inline mx-1" /> icon on any post to bookmark it
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedPosts.map(post => {
              const typeInfo = getPostTypeInfo(post.type);
              return (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-4">
                      {/* Author Avatar */}
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-500">{post.author.name}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </span>
                          <span className={`px-2 py-1 ${typeInfo.bgColor} ${typeInfo.textColor} rounded text-xs`}>
                            {typeInfo.label}
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

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-gray-500" />
                            <span>{post.comments.length}</span>
                          </div>
                          {post.type === 'prompt_sharing' && post.votingStats && (
                            <div className="flex items-center gap-1">
                              <span className="text-lg">🏆</span>
                              <span>{post.votingStats.totalVotes} votes</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </AppLayout>
  );
}
