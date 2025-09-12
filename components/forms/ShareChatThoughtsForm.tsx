'use client';

import { useState } from 'react';
import { ArrowLeft, Send, Upload, MessageSquare, Image as ImageIcon, Hash } from 'lucide-react';

export interface ShareChatThoughtsFormData {
  title: string;
  content: string;
  chatHistory?: string;
  imageFile?: File;
  imagePreview?: string;
  allowCopy: boolean;
  tags: string[];
  contentType: 'text' | 'image';
}

interface ShareChatThoughtsFormProps {
  onBack: () => void;
  onPublish: (data: ShareChatThoughtsFormData) => void;
}

export default function ShareChatThoughtsForm({ onBack, onPublish }: ShareChatThoughtsFormProps) {
  const [formData, setFormData] = useState<ShareChatThoughtsFormData>({
    title: '',
    content: '',
    chatHistory: '',
    allowCopy: true,
    tags: [],
    contentType: 'text'
  });
  const [tagInput, setTagInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [parsedSegments, setParsedSegments] = useState<Array<{id: string, role: 'user' | 'assistant', content: string, order: number}>>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  // 建议的标签
  const suggestedTags = [
    '#ChatGPT', '#Claude', '#AI对话', '#求助', '#分享', '#经验', 
    '#技巧', '#工作', '#学习', '#创作', '#编程', '#问题解决'
  ];

  // 处理表单数据更新
  const handleInputChange = (field: keyof ShareChatThoughtsFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 处理内容类型切换
  const handleContentTypeChange = (type: 'text' | 'image') => {
    setFormData(prev => ({
      ...prev,
      contentType: type,
      content: '',
      chatHistory: '',
      imageFile: undefined,
      imagePreview: undefined
    }));
  };

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 移除图片
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: undefined,
      imagePreview: undefined
    }));
  };

  // 添加标签
  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  // 移除标签
  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // 处理标签输入
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
      setTagInput('');
    }
  };

  // 解析聊天记录（识别用户和AI的对话）
  const parseChatHistory = async () => {
    if (!formData.chatHistory?.trim()) return;
    
    setIsGenerating(true);
    
    // 模拟AI处理延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 解析聊天记录，识别用户和AI的对话
    const rawChat = formData.chatHistory.trim();
    const lines = rawChat.split('\n').filter(line => line.trim());
    
    const segments: Array<{id: string, role: 'user' | 'assistant', content: string, order: number}> = [];
    let currentSpeaker = '';
    let currentMessage = '';
    let segmentId = 0;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // 处理同一行中包含多个发言者的情况
      // 例如: "User: 11111 GPT: hi loove you"
      const multiSpeakerPattern = /(User|我|用户|Me|You|Human|人|AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT):\s*([^]*?)(?=(?:User|我|用户|Me|You|Human|人|AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT):|$)/gi;
      const matches = Array.from(trimmedLine.matchAll(multiSpeakerPattern));
      
      if (matches.length > 0) {
        // 处理同一行中的多个发言者
        for (const match of matches) {
          const speaker = match[1];
          const content = match[2].trim();
          
          // 保存之前的消息
          if (currentSpeaker && currentMessage) {
            segments.push({
              id: `segment-${segmentId++}`,
              role: currentSpeaker === 'User' ? 'user' : 'assistant',
              content: currentMessage.trim(),
              order: segments.length
            });
          }
          
          // 确定发言者类型
          if (speaker.match(/^(User|我|用户|Me|You|Human|人)$/i)) {
            currentSpeaker = 'User';
          } else if (speaker.match(/^(AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT)$/i)) {
            currentSpeaker = 'AI';
          }
          
          currentMessage = content;
        }
      } else {
        // 处理单行单发言者的情况
        // 识别用户发言的模式（更精确的匹配）
        if (trimmedLine.match(/^(User|我|用户|Me|You|Human|人):\s*/i)) {
          // 保存之前的消息
          if (currentSpeaker && currentMessage) {
            segments.push({
              id: `segment-${segmentId++}`,
              role: currentSpeaker === 'User' ? 'user' : 'assistant',
              content: currentMessage.trim(),
              order: segments.length
            });
          }
          
          // 开始新的用户消息
          currentSpeaker = 'User';
          currentMessage = trimmedLine.replace(/^(User|我|用户|Me|You|Human|人):\s*/i, '');
        }
        // 识别AI发言的模式
        else if (trimmedLine.match(/^(AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT):\s*/i)) {
          // 保存之前的消息
          if (currentSpeaker && currentMessage) {
            segments.push({
              id: `segment-${segmentId++}`,
              role: currentSpeaker === 'User' ? 'user' : 'assistant',
              content: currentMessage.trim(),
              order: segments.length
            });
          }
          
          // 开始新的AI消息
          currentSpeaker = 'AI';
          currentMessage = trimmedLine.replace(/^(AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT):\s*/i, '');
        }
        // 识别时间戳格式的对话（如：2024-01-01 10:00:00 User: ...）
        else if (trimmedLine.match(/^\d{4}-\d{2}-\d{2}.*?(User|我|用户|Me|You|Human|人):\s*/i)) {
          if (currentSpeaker && currentMessage) {
            segments.push({
              id: `segment-${segmentId++}`,
              role: currentSpeaker === 'User' ? 'user' : 'assistant',
              content: currentMessage.trim(),
              order: segments.length
            });
          }
          currentSpeaker = 'User';
          currentMessage = trimmedLine.replace(/^\d{4}-\d{2}-\d{2}.*?(User|我|用户|Me|You|Human|人):\s*/i, '');
        }
        else if (trimmedLine.match(/^\d{4}-\d{2}-\d{2}.*?(AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT):\s*/i)) {
          if (currentSpeaker && currentMessage) {
            segments.push({
              id: `segment-${segmentId++}`,
              role: currentSpeaker === 'User' ? 'user' : 'assistant',
              content: currentMessage.trim(),
              order: segments.length
            });
          }
          currentSpeaker = 'AI';
          currentMessage = trimmedLine.replace(/^\d{4}-\d{2}-\d{2}.*?(AI|ChatGPT|Claude|Assistant|助手|机器人|Bot|GPT):\s*/i, '');
        }
        // 如果当前行不是新的发言者，则继续添加到当前消息
        else if (trimmedLine && currentSpeaker) {
          currentMessage += (currentMessage ? ' ' : '') + trimmedLine;
        }
        // 如果没有任何发言者，尝试根据内容判断
        else if (trimmedLine && !currentSpeaker) {
          // 如果包含问号或疑问词，可能是用户
          if (trimmedLine.match(/\?|请问|如何|怎么|什么|为什么|哪里|什么时候/)) {
            if (currentSpeaker && currentMessage) {
              segments.push({
                id: `segment-${segmentId++}`,
                role: currentSpeaker === 'User' ? 'user' : 'assistant',
                content: currentMessage.trim(),
                order: segments.length
              });
            }
            currentSpeaker = 'User';
            currentMessage = trimmedLine;
          }
          // 如果包含解释性词汇，可能是AI
          else if (trimmedLine.match(/根据|建议|可以|应该|需要|首先|然后|最后|总结/)) {
            if (currentSpeaker && currentMessage) {
              segments.push({
                id: `segment-${segmentId++}`,
                role: currentSpeaker === 'User' ? 'user' : 'assistant',
                content: currentMessage.trim(),
                order: segments.length
              });
            }
            currentSpeaker = 'AI';
            currentMessage = trimmedLine;
          }
          // 默认作为用户消息
          else {
            if (currentSpeaker && currentMessage) {
              segments.push({
                id: `segment-${segmentId++}`,
                role: currentSpeaker === 'User' ? 'user' : 'assistant',
                content: currentMessage.trim(),
                order: segments.length
              });
            }
            currentSpeaker = 'User';
            currentMessage = trimmedLine;
          }
        }
      }
    }
    
    // 保存最后一条消息
    if (currentSpeaker && currentMessage) {
      segments.push({
        id: `segment-${segmentId++}`,
        role: currentSpeaker === 'User' ? 'user' : 'assistant',
        content: currentMessage.trim(),
        order: segments.length
      });
    }
    
    // 更新状态
    setParsedSegments(segments);
    setSelectedSegments(segments.map(s => s.id));
    
    // 同时更新chatHistory为格式化文本
    const formattedChat = segments.map(seg => `${seg.role === 'user' ? 'User' : 'AI'}: ${seg.content}`).join('\n\n');
    setFormData(prev => ({
      ...prev,
      chatHistory: formattedChat
    }));
    
    setIsGenerating(false);
  };

  // 验证表单
  const isFormValid = () => {
    if (!formData.title.trim()) return false;
    if (!formData.content.trim()) return false;
    if (formData.contentType === 'text' && !formData.chatHistory?.trim()) return false;
    if (formData.tags.length === 0) return false;
    return true;
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onPublish(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* 标题和描述 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Chat & Thoughts</h2>
          <p className="text-gray-600">Share your AI conversations, thoughts, or upload images of your interactions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 帖子标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              placeholder="Give your share an attractive title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* 内容类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type *
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleContentTypeChange('text')}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  formData.contentType === 'text'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Paste Chat History
              </button>
              <button
                type="button"
                onClick={() => handleContentTypeChange('image')}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  formData.contentType === 'image'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Image
              </button>
            </div>
          </div>

          {/* 根据内容类型显示不同的输入区域 */}
          {formData.contentType === 'text' ? (
            <>
              {/* 问题描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question/Description *
                </label>
                <textarea
                  placeholder="Describe the problem you encountered, what you want to share, or the background of this conversation..."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* 聊天记录 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Chat History *
                  </label>
                  <button
                    type="button"
                    onClick={parseChatHistory}
                    disabled={!formData.chatHistory?.trim() || isGenerating}
                    className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Parsing...' : 'Parse & Format'}
                  </button>
                </div>
                <textarea
                  placeholder="Paste your chat history... The system will automatically identify User and AI messages. Examples:&#10;&#10;Me: Hello, I want to learn React&#10;ChatGPT: Hello! I'd be happy to help you learn React...&#10;&#10;User: How do I create a component?&#10;AI: To create a React component, you can...&#10;&#10;我: 你好，我想学习编程&#10;助手: 你好！我很乐意帮助你学习编程..."
                  value={formData.chatHistory}
                  onChange={(e) => handleInputChange('chatHistory', e.target.value)}
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* 解析后的对话预览 */}
              {parsedSegments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parsed Conversation Preview
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-4">
                      {parsedSegments.map((segment) => (
                        <div
                          key={segment.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedSegments.includes(segment.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            if (selectedSegments.includes(segment.id)) {
                              setSelectedSegments(selectedSegments.filter(id => id !== segment.id));
                            } else {
                              setSelectedSegments([...selectedSegments, segment.id]);
                            }
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              segment.role === 'user' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {segment.role === 'user' ? 'U' : 'A'}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                {segment.role === 'user' ? 'You' : 'Assistant'}
                              </div>
                              <div className="text-gray-700 whitespace-pre-wrap">
                                {segment.content}
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedSegments.includes(segment.id)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedSegments.includes(segment.id) && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Selected segments: {selectedSegments.length} / {parsedSegments.length}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* 图片上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>
                
                {/* 图片预览 */}
                {formData.imagePreview && (
                  <div className="mt-4">
                    <div className="relative inline-block">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="max-w-full h-48 object-contain rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 图片描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Description *
                </label>
                <textarea
                  placeholder="Describe what's in the image, what problem you encountered, or what you want to share..."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
            </>
          )}

          {/* 允许复制选项 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allowCopy"
              checked={formData.allowCopy}
              onChange={(e) => handleInputChange('allowCopy', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="allowCopy" className="text-sm text-gray-700">
              Allow others to copy my content
            </label>
          </div>

          {/* 标签输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags *
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="Enter tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  if (tagInput.trim()) {
                    addTag(tagInput.trim());
                    setTagInput('');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Hash className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            {/* 已选择的标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            {/* 建议标签 */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className="px-3 py-1 text-sm rounded-full border transition-colors bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
