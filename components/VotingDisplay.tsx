'use client';

// 投票显示组件 - 展示提示词的投票统计和投票功能
// Voting Display Component - Shows prompt voting statistics and voting functionality

import { useState } from 'react';
import { Star, TrendingUp, Users, ThumbsUp, X } from 'lucide-react';
import storage, { type Post } from '../lib/storage';
import VoteModal from './VoteModal';

// 投票显示组件属性接口
// Voting Display Component Props Interface
interface VotingDisplayProps {
  post: Post; // 帖子数据
  onVoteSubmitted: () => void; // 投票提交后的回调
}

export default function VotingDisplay({ post, onVoteSubmitted }: VotingDisplayProps) {
  // 状态管理 - 管理投票相关的UI状态
  // State Management - Manage voting-related UI states
  const [voteSubmitted, setVoteSubmitted] = useState(false); // 投票是否已提交
  const [showVoteModal, setShowVoteModal] = useState(false); // 投票弹窗显示状态
  const [showTipModal, setShowTipModal] = useState(false); // 打赏弹窗显示状态
  const [tipSent, setTipSent] = useState(false); // 打赏是否已发送
  const [selectedTipAmount, setSelectedTipAmount] = useState<number>(0); // 选中的打赏金额
  const [customTipAmount, setCustomTipAmount] = useState<string>(''); // 自定义打赏金额
  
  // 检查用户是否已投票
  // Check if user has already voted
  const hasUserVoted = storage.hasUserVoted(post.id, storage.getCurrentUser().name);

  // 处理投票提交 - 调用存储服务提交投票数据
  // Handle vote submission - Call storage service to submit vote data
  const handleVote = async (voteData: {
    effectiveness: number; // 效果评分 (1-5)
    useCase?: string; // 使用场景
    tags?: string[]; // 标签
  }) => {
    try {
      // 调用storage的投票函数
      // Call storage voting function
      const updatedPost = storage.submitVote(post.id, voteData);
      if (updatedPost) {
        setVoteSubmitted(true); // 标记投票已提交
        setShowVoteModal(false); // 关闭投票弹窗
        onVoteSubmitted(); // 触发父组件更新
        
        // 3秒后重置投票提交状态
        // Reset vote submitted state after 3 seconds
        setTimeout(() => {
          setVoteSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  // 处理打赏提交 - 扣除AI Coins并显示成功消息
  // Handle tip submission - Deduct AI Coins and show success message
  const handleTipSubmit = () => {
    const tipAmount = selectedTipAmount || parseInt(customTipAmount) || 0;
    const currentUser = storage.getCurrentUser();
    
    if (tipAmount <= 0) {
      alert('Please select a valid tip amount');
      return;
    }
    
    if (currentUser.aiCoins < tipAmount) {
      alert('Insufficient AI Coins');
      return;
    }
    
    // 扣除AI Coins
    storage.updateAICoins(-tipAmount);
    
    // 显示成功消息
    setTipSent(true);
    setShowTipModal(false);
    setSelectedTipAmount(0);
    setCustomTipAmount('');
    
    // 3秒后隐藏成功消息
    setTimeout(() => {
      setTipSent(false);
    }, 3000);
  };

  if (!post.votingStats) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600 text-sm">No votes yet. Be the first to rate this prompt!</p>
        <button
          onClick={() => setShowVoteModal(true)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Rate the First Prompt
        </button>
      </div>
    );
  }

  const { votingStats, useCaseBreakdown } = post;
  const effectivenessStars = Math.round(votingStats.effectiveness);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      {voteSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Thank you for your feedback! Your vote helps the community discover better prompts.
        </div>
      )}

      <h4 className="font-medium text-gray-900 mb-3">📊 Community Validation</h4>
      
      {/* Overall Rating */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm font-medium">Overall Effectiveness:</span>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < effectivenessStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{votingStats.effectiveness}/5</span>
        <span className="text-sm text-gray-600">({votingStats.totalVotes} votes)</span>
      </div>

      {/* Vote Breakdown */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span>✅ Worked perfectly</span>
          <span className="font-medium">
            {Math.round((votingStats.workedPerfectly / votingStats.totalVotes) * 100)}% ({votingStats.workedPerfectly})
          </span>
        </div>
        <div className="flex justify-between">
          <span>🔧 Worked with tweaks</span>
          <span className="font-medium">
            {Math.round((votingStats.workedWithTweaks / votingStats.totalVotes) * 100)}% ({votingStats.workedWithTweaks})
          </span>
        </div>
        <div className="flex justify-between">
          <span>⚠️ Partially helpful</span>
          <span className="font-medium">
            {Math.round((votingStats.partiallyHelpful / votingStats.totalVotes) * 100)}% ({votingStats.partiallyHelpful})
          </span>
        </div>
        <div className="flex justify-between">
          <span>❌ Didn&apos;t work</span>
          <span className="font-medium">
            {Math.round((votingStats.didntWork / votingStats.totalVotes) * 100)}% ({votingStats.didntWork})
          </span>
        </div>
      </div>

      {/* Success Rate */}
      <div className="flex items-center space-x-2 mb-4 text-sm">
        <ThumbsUp className="w-4 h-4 text-green-600" />
        <span className="text-green-600 font-medium">Success Rate:</span>
        <span className="text-gray-600">{votingStats.successRate}% (worked perfectly or with tweaks)</span>
      </div>

      {/* Use Case Performance */}
      {useCaseBreakdown && useCaseBreakdown.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">🎯 Best for:</h5>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {useCaseBreakdown.slice(0, 4).map((useCase, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{useCase.name}:</span>
                <span className="font-medium">{useCase.rating}/5 ({useCase.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending */}
      <div className="flex items-center space-x-2 mb-4 text-sm">
        <TrendingUp className="w-4 h-4 text-green-600" />
        <span className="text-green-600 font-medium">Trending:</span>
        <span className="text-gray-600">+{votingStats.totalVotes} total votes</span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setShowVoteModal(true)}
          disabled={hasUserVoted}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            hasUserVoted 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{hasUserVoted ? 'Already Voted' : 'Vote'}</span>
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(post.promptContent || '');
            // 可以添加复制成功的提示
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <span>📋</span>
          <span>Copy Prompt</span>
        </button>
        <button
          onClick={() => setShowTipModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <span>💰</span>
          <span>Tip Author</span>
        </button>
      </div>

      <VoteModal
        isOpen={showVoteModal}
        onClose={() => setShowVoteModal(false)}
        onSubmit={handleVote}
        postTitle={post.title}
      />

      {/* Tip Modal */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">💰 Tip the Author</h3>
              <button
                onClick={() => setShowTipModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">Support {post.author.name} for creating this helpful prompt</p>
            
            <div className="space-y-3 mb-4">
              {[
                { amount: 5, label: '5 AI Coins', description: 'Nice prompt!' },
                { amount: 10, label: '10 AI Coins', description: 'Really helpful!' },
                { amount: 25, label: '25 AI Coins', description: 'Excellent work!' },
                { amount: 50, label: '50 AI Coins', description: 'Outstanding!' }
              ].map(tip => (
                <label key={tip.amount} className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="tipAmount"
                    value={tip.amount}
                    checked={selectedTipAmount === tip.amount}
                    onChange={() => {
                      setSelectedTipAmount(tip.amount);
                      setCustomTipAmount('');
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{tip.label}</span>
                      <span className="text-sm text-gray-600">{tip.description}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg">
                <input
                  type="radio"
                  name="tipAmount"
                  checked={selectedTipAmount === 0 && customTipAmount !== ''}
                  onChange={() => {
                    setSelectedTipAmount(0);
                    setCustomTipAmount('');
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="font-medium">Custom Amount:</span>
                  <input
                    type="number"
                    placeholder="Enter AI Coins"
                    value={customTipAmount}
                    onChange={(e) => {
                      setCustomTipAmount(e.target.value);
                      setSelectedTipAmount(0);
                    }}
                    className="ml-2 w-24 p-1 border border-gray-300 rounded text-sm"
                    min="1"
                  />
                </div>
              </label>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <span>💳 Your Balance:</span>
                <span className="font-medium">{storage.getCurrentUser().aiCoins} AI Coins</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowTipModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTipSubmit}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Send Tip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tip Success Message */}
      {tipSent && (
        <div className="fixed top-4 right-4 bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded z-50">
          💰 Tip sent successfully! Supporting quality content creators helps grow our community.
        </div>
      )}
    </div>
  );
}
