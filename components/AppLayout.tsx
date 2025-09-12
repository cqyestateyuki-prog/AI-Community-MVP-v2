'use client';

/**
 * AI Community MVP v2 - App Layout Component
 * Copyright (c) 2025 Designer: Qingyu Cao
 * All rights reserved.
 * 
 * Commercial use permitted under MIT License
 * For commercial licensing, contact: cqyestateyuki@gmail.com
 */

import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="ml-64 overflow-y-auto h-screen">
        {children}
      </div>
      
      {/* Copyright Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 Designer: Qingyu Cao. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              AI Community MVP v2 - Built with Next.js & Tailwind CSS
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Commercial use permitted under MIT License
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
