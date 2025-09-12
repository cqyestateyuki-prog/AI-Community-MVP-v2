'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Code, 
  Calendar, 
  ChevronDown,
  Check
} from 'lucide-react';

export type PostType = 'chat_sharing' | 'prompt_sharing' | 'community_event';

interface PostTypeOption {
  type: PostType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const postTypeOptions: PostTypeOption[] = [
  {
    type: 'chat_sharing',
    title: 'Share Chat',
    description: 'Share conversations & get help',
    icon: MessageCircle,
    color: 'bg-blue-500',
  },
  {
    type: 'prompt_sharing',
    title: 'Share Prompt',
    description: 'Submit prompts for community voting',
    icon: Code,
    color: 'bg-green-500',
  },
  {
    type: 'community_event',
    title: 'Community Post',
    description: 'Events, announcements & discussions',
    icon: Calendar,
    color: 'bg-purple-500',
  },
];

interface PostTypeSelectorProps {
  selectedType: PostType;
  onTypeChange: (type: PostType) => void;
  disabled?: boolean;
}

export default function PostTypeSelector({ 
  selectedType, 
  onTypeChange, 
  disabled = false 
}: PostTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = postTypeOptions.find(option => option.type === selectedType);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-4 py-3 
          bg-white border border-gray-300 rounded-lg
          hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center space-x-3">
          {selectedOption && (
            <>
              <div className={`p-2 rounded-lg ${selectedOption.color}`}>
                <selectedOption.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  {selectedOption.title}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedOption.description}
                </div>
              </div>
            </>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            {postTypeOptions.map((option) => (
              <button
                key={option.type}
                type="button"
                onClick={() => {
                  onTypeChange(option.type);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-left
                  hover:bg-gray-50 transition-colors duration-150
                  ${selectedType === option.type ? 'bg-blue-50' : ''}
                `}
              >
                <div className={`p-2 rounded-lg ${option.color}`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {option.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.description}
                  </div>
                </div>
                {selectedType === option.type && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
