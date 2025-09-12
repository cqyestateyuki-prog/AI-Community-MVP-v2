'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (voteData: {
    effectiveness: number;
    useCase?: string;
    tags?: string[];
  }) => void;
  postTitle: string;
}

const voteOptions = [
  {
    id: 'perfect',
    emoji: '✅',
    label: 'Worked perfectly',
    description: 'Clear, immediate success',
    value: 5
  },
  {
    id: 'tweaks',
    emoji: '🔧',
    label: 'Worked with modifications',
    description: 'Needed some tweaking',
    value: 4
  },
  {
    id: 'partial',
    emoji: '⚠️',
    label: 'Partially helpful',
    description: 'Some useful elements',
    value: 2
  },
  {
    id: 'failed',
    emoji: '❌',
    label: "Didn't work for me",
    description: 'No useful results',
    value: 1
  }
];

export default function VoteModal({ isOpen, onClose, onSubmit, postTitle }: VoteModalProps) {
  const [selectedVote, setSelectedVote] = useState<typeof voteOptions[0] | null>(null);
  const [useCase, setUseCase] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    if (selectedVote) {
      onSubmit({
        effectiveness: selectedVote.value,
        useCase: useCase.trim() || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      // Reset form
      setSelectedVote(null);
      setUseCase('');
      setTags('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">🗳️ Rate This Prompt&apos;s Effectiveness</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">&ldquo;{postTitle}&rdquo;</p>
        
        <div className="space-y-3 mb-4">
          {voteOptions.map(option => (
            <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="effectiveness"
                value={option.id}
                onChange={() => setSelectedVote(option)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">📝 What did you use it for? (optional)</label>
          <input
            type="text"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="e.g., Product description for mobile app"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">🏷️ Tags (optional):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="creative, ecommerce, marketing"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedVote}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
}
