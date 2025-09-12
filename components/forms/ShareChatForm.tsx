'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Hash, 
  Send, 
  ArrowLeft,
  X
} from 'lucide-react';

interface ShareChatFormProps {
  onBack: () => void;
  onPublish: (data: ShareChatFormData) => void;
}

export interface ShareChatFormData {
  title: string;
  userContent: string;
  chatHistory: string;
  allowCopy: boolean;
  tags: string[];
}

const SUGGESTED_TAGS = [
  'ChatGPT', 'AI对话', '求助', '分享', '经验', '技巧', '工作', '学习', '创作', '编程'
];

export default function ShareChatForm({ onBack, onPublish }: ShareChatFormProps) {
  const [formData, setFormData] = useState<ShareChatFormData>({
    title: '',
    userContent: '',
    chatHistory: '',
    allowCopy: true,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addSuggestedTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };

  const canPublish = () => {
    return formData.title.trim() && 
           formData.userContent.trim() && 
           formData.chatHistory.trim() && 
           formData.tags.length > 0;
  };

  const handlePublish = () => {
    if (canPublish()) {
      onPublish(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        {/* 头部 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Share My Journey with My Best Partner - ChatGPT
          </h2>
          <p className="text-gray-600">
            Share your AI conversations and let the community learn and grow together
          </p>
        </div>

        {/* 表单内容 */}
        <div className="space-y-8">
          {/* Post Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your share an attractive title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* User Content Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Question/Description *
            </label>
            <textarea
              value={formData.userContent}
              onChange={(e) => setFormData({ ...formData, userContent: e.target.value })}
              placeholder="Describe the problem you encountered, what you want to share, or the background of this conversation..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Chat History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chat History *
            </label>
            <textarea
              value={formData.chatHistory}
              onChange={(e) => setFormData({ ...formData, chatHistory: e.target.value })}
              placeholder="Paste your chat history...&#10;&#10;Example format:&#10;Me: Hello, I want to learn React&#10;ChatGPT: Hello! I'd be happy to help you learn React..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Copy Permission Setting */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allowCopy"
              checked={formData.allowCopy}
              onChange={(e) => setFormData({ ...formData, allowCopy: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="allowCopy" className="text-sm text-gray-700">
              Allow others to copy my chat history
            </label>
          </div>

          {/* Tag System */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags *
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Enter tag..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Hash className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            {/* Added Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Suggested Tags */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addSuggestedTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={!canPublish()}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </button>
        </div>
      </motion.div>
    </div>
  );
}