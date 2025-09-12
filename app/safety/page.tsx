'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  UserX, 
  FileText,
  CheckCircle,
  XCircle,
  Info,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';

export default function SafetyPage() {
  const privacyTips = [
    {
      icon: UserX,
      title: 'Remove Personal Information',
      description: 'Never share names, emails, phone numbers, addresses, or any personally identifiable information.',
      examples: ['John Smith', 'john@example.com', '+1-555-1234', '123 Main St'],
    },
    {
      icon: Lock,
      title: 'Protect API Keys & Passwords',
      description: 'Remove all API keys, passwords, tokens, and other authentication credentials.',
      examples: ['sk-1234567890abcdef', 'password123', 'Bearer token', 'API_KEY=abc123'],
    },
    {
      icon: FileText,
      title: 'Check Business Information',
      description: 'Remove company names, internal processes, financial data, and proprietary information.',
      examples: ['Acme Corp', 'Internal memo', 'Revenue: $1M', 'Confidential strategy'],
    },
    {
      icon: Eye,
      title: 'Review Before Sharing',
      description: 'Always read through your conversation before posting to catch any sensitive information.',
      examples: ['Read every message', 'Check for typos', 'Verify no PII', 'Test copy functionality'],
    },
  ];

  const redFlags = [
    {
      icon: XCircle,
      title: 'Personal Identifiers',
      description: 'Names, addresses, phone numbers, email addresses, social security numbers',
      color: 'text-red-500',
    },
    {
      icon: XCircle,
      title: 'Financial Information',
      description: 'Bank account numbers, credit card details, salary information, financial statements',
      color: 'text-red-500',
    },
    {
      icon: XCircle,
      title: 'Authentication Data',
      description: 'Passwords, API keys, tokens, private keys, access codes',
      color: 'text-red-500',
    },
    {
      icon: XCircle,
      title: 'Health Information',
      description: 'Medical records, health conditions, prescription details, insurance information',
      color: 'text-red-500',
    },
  ];

  const safeContent = [
    {
      icon: CheckCircle,
      title: 'Educational Content',
      description: 'Prompts, techniques, and conversations that teach something useful',
      color: 'text-green-500',
    },
    {
      icon: CheckCircle,
      title: 'Creative Work',
      description: 'Writing samples, code snippets, design ideas, and creative projects',
      color: 'text-green-500',
    },
    {
      icon: CheckCircle,
      title: 'General Knowledge',
      description: 'Facts, explanations, tutorials, and how-to guides',
      color: 'text-green-500',
    },
    {
      icon: CheckCircle,
      title: 'Public Information',
      description: 'News, public data, open-source information, and general topics',
      color: 'text-green-500',
    },
  ];

  const reportingSteps = [
    {
      step: 1,
      title: 'Identify the Issue',
      description: 'Look for personal information, inappropriate content, or policy violations.',
    },
    {
      step: 2,
      title: 'Click Report',
      description: 'Use the report button on the post or contact us directly.',
    },
    {
      step: 3,
      title: 'Provide Details',
      description: 'Explain what you found and why it violates our guidelines.',
    },
    {
      step: 4,
      title: 'We\'ll Review',
      description: 'Our team will review the report and take appropriate action.',
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
              <Shield className="w-16 h-16 mx-auto mb-6 text-black" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                Community Safety
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Learn how to protect your privacy and keep our community safe for everyone
              </p>
            </motion.div>
          </section>

          {/* Privacy Protection Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">Protecting Your Privacy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {privacyTips.map((tip, index) => (
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
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-black">{tip.title}</h3>
                      <p className="text-gray-600 mb-3">{tip.description}</p>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Examples to remove:</p>
                        <div className="flex flex-wrap gap-1">
                          {tip.examples.map((example, idx) => (
                            <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What NOT to Share */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">What NOT to Share</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {redFlags.map((flag, index) => (
                <motion.div
                  key={flag.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 border border-gray-300"
                >
                  <div className="flex items-start gap-4">
                    <flag.icon className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2 text-black">{flag.title}</h3>
                      <p className="text-gray-600">{flag.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What IS Safe to Share */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">What IS Safe to Share</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safeContent.map((content, index) => (
                <motion.div
                  key={content.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 border border-gray-300"
                >
                  <div className="flex items-start gap-4">
                    <content.icon className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2 text-black">{content.title}</h3>
                      <p className="text-gray-600">{content.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Reporting Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">Reporting Issues</h2>
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <div className="text-center mb-8">
                <AlertTriangle className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">See Something? Say Something</h3>
                <p className="text-gray-600">
                  Help us keep the community safe by reporting posts that contain personal information or violate our guidelines.
                </p>
              </div>
              
              <div className="space-y-6">
                {reportingSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-black">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 border border-gray-300 text-center"
              >
                <Info className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-black">Privacy Guide</h3>
                <p className="text-gray-600 mb-4">
                  Learn more about protecting your personal information online.
                </p>
                <a 
                  href="#" 
                  className="text-black hover:text-gray-600 flex items-center justify-center gap-1"
                >
                  Read More <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-300 text-center"
              >
                <FileText className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-black">Community Guidelines</h3>
                <p className="text-gray-600 mb-4">
                  Read our complete community guidelines and code of conduct.
                </p>
                <a 
                  href="#" 
                  className="text-black hover:text-gray-600 flex items-center justify-center gap-1"
                >
                  Read More <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-6 border border-gray-300 text-center"
              >
                <Shield className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-black">Contact Support</h3>
                <p className="text-gray-600 mb-4">
                  Have questions or need help? Contact our support team.
                </p>
                <a 
                  href="#" 
                  className="text-black hover:text-gray-600 flex items-center justify-center gap-1"
                >
                  Contact Us <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-black text-white rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Share Safely?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Now that you know how to protect your privacy, start sharing your AI conversations with confidence!
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Start Sharing
                  </button>
                </Link>
                <Link href="/guide">
                  <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                    Read the Guide
                  </button>
                </Link>
              </div>
            </div>
          </section>
      </div>
    </AppLayout>
  );
}
