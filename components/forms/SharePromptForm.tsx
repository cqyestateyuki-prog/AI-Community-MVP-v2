'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Hash, 
  Send, 
  ArrowLeft,
  Plus,
  X
} from 'lucide-react';
// PromptCombination interface
interface PromptCombination {
  id: string;
  prompt: string;
  exampleOutput: string;
  useCase: string;
}

interface SharePromptFormProps {
  onBack: () => void;
  onPublish: (data: SharePromptFormData) => void;
}

export interface SharePromptFormData {
  promptTitle: string;
  promptCategory: string;
  targetAudience: string;
  useCaseDescription: string;
  promptIntroduction: string;
  promptContent: string;
  exampleOutput: string;
  promptCombinations: PromptCombination[];
  tags: string[];
}

const CATEGORIES = [
  'Marketing', 'Writing', 'Programming', 'Design', 'Data Analysis', 'Education', 'Business', 'Creative', 'Technology', 'Other'
];

const SUGGESTED_TAGS = [
  'Prompt Engineering', 'AI Tools', 'Productivity', 'Creative Writing', 'Code Generation', 'Marketing Copy', 'Data Analysis', 'Learning Assistant', 'Workflow', 'Automation'
];

export default function SharePromptForm({ onBack, onPublish }: SharePromptFormProps) {
  const [formData, setFormData] = useState<SharePromptFormData>({
    promptTitle: '',
    promptCategory: '',
    targetAudience: '',
    useCaseDescription: '',
    promptIntroduction: '',
    promptContent: '',
    exampleOutput: '',
    promptCombinations: [],
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

  const addPromptCombination = () => {
    const newCombination: PromptCombination = {
      id: `combo_${Date.now()}`,
      prompt: '',
      exampleOutput: '',
      useCase: '',
    };
    setFormData({
      ...formData,
      promptCombinations: [...formData.promptCombinations, newCombination]
    });
  };

  const updatePromptCombination = (id: string, field: 'prompt' | 'exampleOutput', value: string) => {
    setFormData({
      ...formData,
      promptCombinations: formData.promptCombinations.map(combo =>
        combo.id === id ? { ...combo, [field]: value } : combo
      )
    });
  };

  const removePromptCombination = (id: string) => {
    setFormData({
      ...formData,
      promptCombinations: formData.promptCombinations.filter(combo => combo.id !== id)
    });
  };

  const canPublish = () => {
    return formData.promptTitle.trim() && 
           formData.promptCategory && 
           formData.targetAudience.trim() &&
           formData.useCaseDescription.trim() &&
           formData.promptIntroduction.trim() &&
           formData.promptContent.trim() && 
           formData.exampleOutput.trim() && 
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
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Share Your Prompt
          </h2>
          <p className="text-gray-600">
            Submit high-quality prompts for community voting
          </p>
        </div>

        {/* 表单内容 */}
        <div className="space-y-8">
          {/* 基础信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt Title *
              </label>
              <input
                type="text"
                value={formData.promptTitle}
                onChange={(e) => setFormData({ ...formData, promptTitle: e.target.value })}
                placeholder="Give your prompt a clear and descriptive title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.promptCategory}
                onChange={(e) => setFormData({ ...formData, promptCategory: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience *
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Who is this prompt for? (e.g., Product Managers, Designers, Developers...)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* 使用场景描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Use Case Description *
            </label>
            <textarea
              value={formData.useCaseDescription}
              onChange={(e) => setFormData({ ...formData, useCaseDescription: e.target.value })}
              placeholder="Describe when and how to use this prompt, what problems it solves..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt Introduction *
            </label>
            <textarea
              value={formData.promptIntroduction}
              onChange={(e) => setFormData({ ...formData, promptIntroduction: e.target.value })}
              placeholder="Introduce the features and advantages of this prompt, or what you want to say to the community..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Prompt内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complete Prompt Content *
            </label>
            <div className="mb-2 text-sm text-gray-500">
              Tip: Use [BRACKETS] to mark variables that users need to replace
            </div>
            <textarea
              value={formData.promptContent}
              onChange={(e) => setFormData({ ...formData, promptContent: e.target.value })}
              placeholder="Enter your complete prompt...&#10;&#10;Example:&#10;You are a professional [ROLE], please help me [TASK]. Requirements: [REQUIREMENTS]"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Example Output * (Required, shows the effect)
            </label>
            <textarea
              value={formData.exampleOutput}
              onChange={(e) => setFormData({ ...formData, exampleOutput: e.target.value })}
              placeholder="Show what kind of content the AI will output after using this prompt..."
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 后续Prompt组合 */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Follow-up Prompt Combinations</h3>
              <button
                type="button"
                onClick={addPromptCombination}
                className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Combination
              </button>
            </div>

            {formData.promptCombinations.map((combo, index) => (
              <div key={combo.id} className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Combination {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removePromptCombination(combo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prompt Content
                    </label>
                    <textarea
                      value={combo.prompt}
                      onChange={(e) => updatePromptCombination(combo.id, 'prompt', e.target.value)}
                      placeholder="Enter the follow-up prompt..."
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Example Output
                    </label>
                    <textarea
                      value={combo.exampleOutput}
                      onChange={(e) => updatePromptCombination(combo.id, 'exampleOutput', e.target.value)}
                      placeholder="Enter the corresponding example output..."
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 标签系统 */}
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Hash className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            {/* 已添加的标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* 推荐标签 */}
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
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
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
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </button>
        </div>
      </motion.div>
    </div>
  );
}