'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Share2, 
  Shield, 
  Lightbulb, 
  Users, 
  Heart,
  MessageCircle,
  Copy,
  Search,
  Tag,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';

export default function GuidePage() {
  const features = [
    {
      icon: Share2,
      title: 'Share Conversations',
      description: 'Upload your AI chats and help others learn from your prompts and techniques.',
    },
    {
      icon: Search,
      title: 'Discover Content',
      description: 'Find valuable conversations, prompts, and tutorials shared by the community.',
    },
    {
      icon: Copy,
      title: 'Copy & Use',
      description: 'Easily copy prompts and techniques to use in your own AI conversations.',
    },
    {
      icon: Heart,
      title: 'Like & Comment',
      description: 'Engage with the community by liking helpful posts and leaving comments.',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Find Your Conversation',
      description: 'Copy your AI chat from ChatGPT, Claude, or any other AI tool.',
      tip: 'Make sure to remove any personal information before sharing!',
    },
    {
      number: 2,
      title: 'Create a New Post',
      description: 'Click "New Post" and paste your conversation. Our parser will automatically detect user and assistant messages.',
      tip: 'You can edit the content before publishing.',
    },
    {
      number: 3,
      title: 'Add Details',
      description: 'Give your post a clear title, add relevant tags, and write a brief introduction.',
      tip: 'Good titles and tags help others find your content.',
    },
    {
      number: 4,
      title: 'Publish & Share',
      description: 'Review your post and publish it to the community. Others can now learn from your conversation!',
      tip: 'You can always edit or delete your posts later.',
    },
  ];

  const tips = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Always remove personal information, API keys, passwords, and sensitive data before sharing.',
    },
    {
      icon: Tag,
      title: 'Use Good Tags',
      description: 'Add relevant tags like #Marketing, #Coding, #Writing to help others find your content.',
    },
    {
      icon: Lightbulb,
      title: 'Share Value',
      description: 'Focus on conversations that teach something useful or demonstrate interesting techniques.',
    },
    {
      icon: Users,
      title: 'Be Respectful',
      description: 'Engage positively with the community. Help others learn and grow together.',
    },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Hero Section */}
        <section className="bg-white border border-gray-300 rounded-lg p-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-black" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Beginner&apos;s Guide
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Learn how to share your AI conversations and discover valuable content from the community
            </p>
            <Link href="/">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Start Sharing Now
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">What You Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white border border-gray-300 rounded-lg p-6"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How to Share Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">How to Start Your First Post</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-6 items-start bg-white border border-gray-300 rounded-lg p-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-black">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Tip:</strong> {step.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 text-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-black">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Community Guidelines</h2>
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-black">Be Respectful</h3>
                  <p className="text-gray-600">Treat all community members with respect and kindness.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-black">Share Valuable Content</h3>
                  <p className="text-gray-600">Focus on conversations that teach, inspire, or help others learn.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-black">Protect Privacy</h3>
                  <p className="text-gray-600">Never share personal information, API keys, or sensitive data.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-black">Give Credit</h3>
                  <p className="text-gray-600">Acknowledge sources and give credit where it&apos;s due.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community and start sharing your AI conversations today!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Start Sharing
                </button>
              </Link>
              <Link href="/">
                <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Explore Posts
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}