'use client';

// 新发帖页面 - 统一的发帖入口，支持三种发帖类型
// New Post Page - Unified posting entry supporting three post types

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import storage from '@/lib/storage';
import { type PostType } from '@/components/PostTypeSelector';
import ShareChatThoughtsForm, { type ShareChatThoughtsFormData } from '@/components/forms/ShareChatThoughtsForm';
import SharePromptForm, { type SharePromptFormData } from '@/components/forms/SharePromptForm';
import CommunityPostForm, { type CommunityPostFormData } from '@/components/forms/CommunityPostForm';

export default function NewPostPage() {
  // 路由和参数管理
  // Router and parameter management
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 状态管理 - 管理发帖流程的状态
  // State Management - Manage posting flow states
  const [selectedType, setSelectedType] = useState<PostType>('chat_sharing'); // 选中的发帖类型
  const [showBackConfirm, setShowBackConfirm] = useState(false); // 返回确认弹窗
  const [showPublishConfirm, setShowPublishConfirm] = useState(false); // 发布确认弹窗
  const [pendingFormData, setPendingFormData] = useState<ShareChatThoughtsFormData | SharePromptFormData | CommunityPostFormData | null>(null); // 待发布的表单数据

  // URL参数处理 - 根据URL参数确定发帖类型
  // URL Parameter Handling - Determine post type based on URL parameters
  useEffect(() => {
    const type = searchParams.get('type') as PostType;
    if (type && ['chat_sharing', 'prompt_sharing', 'community_event'].includes(type)) {
      setSelectedType(type); // 设置选中的发帖类型
    } else {
      // 如果没有type参数，默认跳转到chat_sharing
      // If no type parameter, default to chat_sharing
      router.replace('/post/new?type=chat_sharing');
    }
  }, [searchParams, router]);

  const handleBackToHome = () => {
    setShowBackConfirm(true);
  };

  const handleBackConfirm = () => {
    router.push('/');
  };

  const handlePublish = (formData: ShareChatThoughtsFormData | SharePromptFormData | CommunityPostFormData) => {
    setPendingFormData(formData);
    setShowPublishConfirm(true);
  };

  const handlePublishConfirm = () => {
    if (!pendingFormData) return;

    let postData: any = {
      title: 'title' in pendingFormData ? pendingFormData.title : pendingFormData.promptTitle || '',
      type: selectedType,
      author: storage.getCurrentUser(),
      tags: pendingFormData.tags,
      allowCopy: true,
    };

    // 根据类型处理不同的数据
    if (selectedType === 'chat_sharing') {
      const chatData = pendingFormData as ShareChatThoughtsFormData;
      
      // 解析聊天记录为segments格式
      const parseChatToSegments = (chatHistory: string) => {
        if (!chatHistory) return [];
        
        const segments: any[] = [];
        const lines = chatHistory.split('\n').filter(line => line.trim());
        let currentRole = '';
        let currentContent = '';
        let segmentId = 0;
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          
          // 识别用户发言
          if (trimmedLine.match(/^User:\s*/i)) {
            // 保存之前的消息
            if (currentRole && currentContent) {
              segments.push({
                id: `segment-${segmentId++}`,
                role: currentRole,
                content: currentContent.trim(),
                order: segments.length
              });
            }
            currentRole = 'user';
            currentContent = trimmedLine.replace(/^User:\s*/i, '');
          }
          // 识别AI发言
          else if (trimmedLine.match(/^AI:\s*/i)) {
            // 保存之前的消息
            if (currentRole && currentContent) {
              segments.push({
                id: `segment-${segmentId++}`,
                role: currentRole,
                content: currentContent.trim(),
                order: segments.length
              });
            }
            currentRole = 'assistant';
            currentContent = trimmedLine.replace(/^AI:\s*/i, '');
          } 
          // 继续当前消息
          else if (trimmedLine && currentRole) {
            currentContent += (currentContent ? ' ' : '') + trimmedLine;
          }
        }
        
        // 保存最后一条消息
        if (currentRole && currentContent) {
          segments.push({
            id: `segment-${segmentId++}`,
            role: currentRole,
            content: currentContent.trim(),
            order: segments.length
          });
        }
        
        return segments;
      };
      
      postData = {
        ...postData,
        userContent: chatData.content,
        chatHistory: chatData.chatHistory || '',
        allowCopy: chatData.allowCopy,
        segments: parseChatToSegments(chatData.chatHistory || ''),
        intro: chatData.content,
        contentType: chatData.contentType,
        imageFile: chatData.imageFile,
        imagePreview: chatData.imagePreview,
      };
    } else if (selectedType === 'prompt_sharing') {
      const promptData = pendingFormData as SharePromptFormData;
      postData = {
        ...postData,
        promptTitle: promptData.promptTitle,
        promptIntroduction: promptData.promptIntroduction,
        promptContent: promptData.promptContent,
        exampleOutput: promptData.exampleOutput,
        promptCombinations: promptData.promptCombinations,
        votes: 0,
        segments: [],
        intro: promptData.promptIntroduction,
      };
    } else if (selectedType === 'community_event') {
      const eventData = pendingFormData as CommunityPostFormData;
      postData = {
        ...postData,
        eventDetails: eventData.eventDetails,
        // 保持向后兼容
        eventLink: eventData.eventDetails.link,
        eventDate: eventData.eventDetails.date,
        eventLocation: eventData.eventDetails.location,
        segments: [],
        intro: eventData.content,
      };
    }

    const newPost = storage.createPost(postData);
    router.push('/');
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'chat_sharing':
        return (
          <ShareChatThoughtsForm
            onBack={handleBackToHome}
            onPublish={handlePublish}
          />
        );
      case 'prompt_sharing':
          return (
          <SharePromptForm
            onBack={handleBackToHome}
            onPublish={handlePublish}
          />
        );
      case 'community_event':
          return (
          <CommunityPostForm
            onBack={handleBackToHome}
            onPublish={handlePublish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </button>
        </div>

        {/* Form Content */}
        <div>
          {renderForm()}
        </div>

        {/* Back Confirmation Modal */}
        {showBackConfirm && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowBackConfirm(false)} />
            <div className="relative bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Discard Changes?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to discard your current edits and return to the homepage?</p>
              <div className="flex gap-3 justify-end">
            <button
                  onClick={() => setShowBackConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
                  Keep Editing
            </button>
                <button
                  onClick={handleBackConfirm}
                  className="px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                >
                  Discard
                </button>
          </div>
        </div>
          </div>
        )}

        {/* Publish Confirmation Modal */}
        {showPublishConfirm && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowPublishConfirm(false)} />
            <div className="relative bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Publish Post?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to publish this post? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowPublishConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishConfirm}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Publish
                </button>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}