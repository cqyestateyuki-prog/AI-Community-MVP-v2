'use client';

/**
 * AI Community MVP v2 - Post Card Component
 * Copyright (c) 2025 Designer: Qingyu Cao
 * All rights reserved.
 * 
 * Commercial use permitted under MIT License
 * For commercial licensing, contact: cqyestateyuki@gmail.com
 */

import Link from 'next/link';
import { 
  Heart, MessageCircle, Eye, User, Clock, ArrowRight, 
  Code, Calendar, MessageSquare, ThumbsUp
} from 'lucide-react';
import { type Post } from '@/lib/storage';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
      <div className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-sm transition-shadow cursor-pointer min-h-96 flex flex-col">
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
            <div className="bg-purple-50 rounded-lg p-3 mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Event</span>
              </div>
              <p className="text-xs text-purple-800 line-clamp-2">
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
          <div className="flex items-center gap-3 text-sm text-gray-500 overflow-hidden">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Heart className="w-4 h-4" />
              {post.likes}
            </span>
            {post.type === 'prompt_sharing' && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <ThumbsUp className="w-4 h-4" />
                {post.votes || 0}
              </span>
            )}
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MessageCircle className="w-4 h-4" />
              {post.comments.length}
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Eye className="w-4 h-4" />
              {post.viewCount}
            </span>
          </div>
          <button className="text-sm text-black hover:text-gray-600 font-medium flex items-center gap-1 flex-shrink-0 ml-2">
            View
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Link>
  );
}
