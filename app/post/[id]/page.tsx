'use client';

// 帖子详情页面 - 显示单个帖子的完整内容和互动功能
// Post Detail Page - Display complete content and interaction features for a single post

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, MessageCircle, Copy, Check, Eye, 
  ThumbsUp, ExternalLink, Calendar, MapPin, Code, MessageSquare, Star
} from 'lucide-react';
import storage, { type Post } from '@/lib/storage';
import { formatDistanceToNow } from 'date-fns';
import VotingDisplay from '@/components/VotingDisplay';


export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [voted, setVoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const postData = storage.getPost(params.id as string);
    if (postData) {
      setPost(postData);
      storage.incrementViewCount(params.id as string);
      setLiked(storage.isPostLiked(postData.id));
      setVoted(storage.isPostVoted(postData.id));
      setBookmarked(storage.isBookmarked(postData.id));
    }
  }, [params.id]);

  const handleLike = () => {
    if (!post) return;
    const updated = storage.toggleLike(post.id);
    if (updated) {
      setPost(updated);
      setLiked(!liked);
    }
  };

  const handleBookmark = () => {
    if (!post) return;
    const isBookmarked = storage.toggleBookmark(post.id);
    setBookmarked(isBookmarked);
  };


  const handleComment = () => {
    if (!post || !commentText.trim()) return;
    const updated = storage.addComment(post.id, 'You', commentText);
    if (updated) {
      setPost(updated);
      setCommentText('');
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPostTypeInfo = (type: string) => {
    switch (type) {
      case 'chat_sharing':
        return {
          icon: MessageSquare,
          color: 'bg-blue-500',
          label: 'Post',
          description: 'Shared conversation'
        };
      case 'prompt_sharing':
        return {
          icon: Code,
          color: 'bg-green-500',
          label: 'Prompt Sharing',
          description: 'Community prompt'
        };
      case 'community_event':
        return {
          icon: Calendar,
          color: 'bg-purple-500',
          label: 'Community Event',
          description: 'Event announcement'
        };
      default:
        return {
          icon: MessageSquare,
          color: 'bg-gray-500',
          label: 'Post',
          description: 'Community post'
        };
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  const typeInfo = getPostTypeInfo(post.type);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Post Content */}
        <div className="bg-white rounded-xl p-8 mb-6">
          {/* Author & Title */}
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={post.author.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={post.author.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm ${typeInfo.color}`}>
                  <typeInfo.icon className="w-4 h-4" />
                  {typeInfo.label}
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                {post.author.name} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Introduction */}
          {post.intro && (
            <p className="text-gray-700 mb-6">{post.intro}</p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Content based on post type */}
          {post.type === 'chat_sharing' && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {post.segments.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${segment.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative max-w-[80%] rounded-2xl p-4 ${
                      segment.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="text-xs opacity-60 mb-2">
                      {segment.role === 'user' ? 'User' : 'AI Assistant'}
                    </div>
                    <div className="whitespace-pre-wrap">{segment.content}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {post.type === 'prompt_sharing' && (
            <div className="space-y-6">
              {/* Prompt Content */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Prompt
                </h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {post.promptContent}
                  </pre>
                  {post.allowCopy && (
                    <button
                      onClick={() => handleCopy(post.promptContent || '', 'prompt')}
                      className="mt-3 flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                    >
                      {copiedId === 'prompt' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy Prompt
                    </button>
                  )}
                </div>
              </div>

              {/* Example Output */}
              {post.exampleOutput && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Example Output
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">
                      {post.exampleOutput}
                    </pre>
                    {post.allowCopy && (
                      <button
                        onClick={() => handleCopy(post.exampleOutput || '', 'example')}
                        className="mt-3 flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        {copiedId === 'example' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        Copy Example
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {post.type === 'community_event' && (
            <div className="space-y-6">
              {/* Event Details */}
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Event Details
                </h3>
                
                <div className="space-y-4">
                  {post.eventDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Date & Time</p>
                        <p className="text-gray-600">
                          {new Date(post.eventDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {post.eventLocation && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{post.eventLocation}</p>
                      </div>
                    </div>
                  )}

                  {post.link && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Event Link</p>
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {post.link}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t">
            {post.type === 'prompt_sharing' ? (
              <>
                {/* Prompt sharing: 奖杯投票数 + 收藏 + 评论 */}
                <span className="flex items-center gap-2 text-gray-500">
                  <span className="text-lg">🏆</span>
                  {post.votingStats?.totalVotes || 0} votes
                </span>
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 ${bookmarked ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-500 transition-colors`}
                >
                  <Star className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  {storage.getBookmarkedPosts().length} bookmarks
                </button>
                <span className="flex items-center gap-2 text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  {post.comments.length}
                </span>
              </>
            ) : (
              <>
                {/* 普通post和community event: 爱心 + 收藏 */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  {post.likes}
                </button>
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 ${bookmarked ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-500 transition-colors`}
                >
                  <Star className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  {storage.getBookmarkedPosts().length} bookmarks
                </button>
              </>
            )}
          </div>
        </div>

        {/* Voting Section - 放在评论前面 */}
        {post.type === 'prompt_sharing' && (
          <div className="bg-white rounded-xl p-6">
            <VotingDisplay 
              post={post} 
              onVoteSubmitted={() => {
                // Refresh post data after voting
                const updatedPost = storage.getPost(post.id);
                if (updatedPost) {
                  setPost(updatedPost);
                }
              }} 
            />
          </div>
        )}

        {/* Comments */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="font-semibold mb-4">Comments</h3>
          
          {/* Add Comment */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleComment}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Post
            </button>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            {post.comments.map(comment => (
              <div key={comment.id} className="border-b pb-4 last:border-b-0">
                <p className="font-medium text-sm">{comment.author}</p>
                <p className="text-gray-700 mt-1">{comment.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}