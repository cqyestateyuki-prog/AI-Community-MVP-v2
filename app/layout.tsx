import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Companion Community',
  description: 'Share conversations, learn from others, grow together',
  keywords: ['AI', 'ChatGPT', 'Claude', 'Community', 'Conversations', 'Prompts'],
  authors: [{ name: 'AI Community Team' }],
  openGraph: {
    title: 'AI Companion Community',
    description: 'Share conversations, learn from others, grow together',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
