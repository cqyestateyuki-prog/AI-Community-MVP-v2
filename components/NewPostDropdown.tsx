'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Code, 
  Calendar, 
  ChevronDown,
  Plus
} from 'lucide-react';

const postTypeOptions = [
  {
    type: 'chat_sharing',
    title: 'Share Chat & Thoughts',
    description: 'Share conversations, thoughts & images',
    icon: MessageCircle,
    color: 'bg-blue-500',
    href: '/post/new?type=chat_sharing'
  },
  {
    type: 'prompt_sharing',
    title: 'Share Prompt',
    description: 'Submit prompts for community voting',
    icon: Code,
    color: 'bg-green-500',
    href: '/post/new?type=prompt_sharing'
  },
  {
    type: 'community_event',
    title: 'Community Post',
    description: 'Events, announcements & discussions',
    icon: Calendar,
    color: 'bg-purple-500',
    href: '/post/new?type=community_event'
  },
];

export default function NewPostDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOptionClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Plus className="w-4 h-4" />
        New Post
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              {postTypeOptions.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => handleOptionClick(option.href)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
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
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
