# AI Community MVP v2

**Copyright (c) 2025 Designer: Qingyu Cao**  
**All rights reserved.**

一个现代化的AI社区平台，让用户分享AI对话、提示词和活动，促进知识交流与学习。

A modern AI community platform that enables users to share AI conversations, prompts, and events, fostering knowledge exchange and learning.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💼 Commercial Use

Commercial use is permitted under the MIT License. For commercial licensing inquiries, please contact: cqyestateyuki@gmail.com

一个现代化的AI社区平台，让用户分享AI对话、提示词和活动，促进知识交流与学习。

A modern AI community platform that enables users to share AI conversations, prompts, and events, fostering knowledge exchange and learning.

## 🚀 项目概述 / Project Overview

AI Community MVP v2 是一个基于 Next.js 14 构建的现代化社区平台，专注于AI对话分享、提示词工程和社区活动。用户可以通过直观的界面分享他们的AI对话、创建提示词库，并参与社区活动。

AI Community MVP v2 is a modern community platform built with Next.js 14, focusing on AI conversation sharing, prompt engineering, and community events. Users can share their AI conversations, create prompt libraries, and participate in community activities through an intuitive interface.

## ✨ 核心功能 / Core Features

### 📝 三种发帖类型 / Three Post Types
- **Share Chat & Thoughts** - 分享AI对话和思考 / Share AI conversations and thoughts
- **Share Prompt** - 分享提示词和工程技巧 / Share prompts and engineering techniques
- **Community Event** - 发布和参与社区活动 / Publish and participate in community events

### 🏠 智能首页 / Smart Homepage
- 实时帖子流，按热度排序 / Real-time post feed sorted by popularity
- 三个主要入口：Trending Prompts、Trending Posts、Events / Three main entries: Trending Prompts, Trending Posts, Events
- 智能搜索和标签过滤 / Smart search and tag filtering
- 响应式卡片布局 / Responsive card layout

### 📊 投票系统 / Voting System
- 针对提示词的详细评分系统 / Detailed rating system for prompts
- 5个评分等级：完美工作、需要调整、部分有用、不工作 / 5 rating levels: Perfect, Needs tweaks, Partially helpful, Didn't work
- 使用场景分类和成功率统计 / Use case categorization and success rate statistics
- 作者打赏功能（AI Coins）/ Author tipping feature (AI Coins)

### 🎯 个性化功能 / Personalization Features
- 个人书签收藏 / Personal bookmark collection
- 我的发布内容 / My published content
- AI Coins 积分系统 / AI Coins points system
- 用户数据持久化 / User data persistence

## 🛠 技术栈 / Tech Stack

### 前端框架 / Frontend Framework
- **Next.js 14** - React全栈框架，App Router / React full-stack framework with App Router
- **React 18** - 用户界面库 / User interface library
- **TypeScript** - 类型安全 / Type safety

### 样式和UI / Styling and UI
- **Tailwind CSS** - 实用优先的CSS框架 / Utility-first CSS framework
- **shadcn/ui** - 现代化UI组件库 / Modern UI component library
- **Framer Motion** - 动画库 / Animation library
- **Lucide React** - 图标库 / Icon library

### 状态管理和数据 / State Management and Data
- **localStorage** - 客户端数据持久化 / Client-side data persistence
- **React Hook Form** - 表单管理 / Form management
- **Zod** - 数据验证 / Data validation

### 开发工具 / Development Tools
- **ESLint** - 代码质量检查 / Code quality checking
- **PostCSS** - CSS处理 / CSS processing
- **date-fns** - 日期处理 / Date handling

## 📁 项目结构 / Project Structure

```
ai-community-mvp-v2/
├── app/                          # Next.js App Router 页面 / Next.js App Router pages
│   ├── page.tsx                  # 首页 / Homepage
│   ├── layout.tsx                # 根布局 / Root layout
│   ├── bookmarks/                # 书签页面 / Bookmarks page
│   ├── guide/                    # 新手指南 / Beginner guide
│   ├── my-posts/                 # 我的发布 / My posts
│   ├── safety/                   # 社区安全 / Community safety
│   ├── trending/                 # 热门内容 / Trending content
│   └── post/                     # 帖子相关 / Post related
│       ├── [id]/                 # 帖子详情 / Post details
│       └── new/                  # 创建帖子 / Create post
├── components/                   # React 组件 / React components
│   ├── AppLayout.tsx             # 应用布局 / App layout
│   ├── Sidebar.tsx               # 侧边栏 / Sidebar
│   ├── forms/                    # 表单组件 / Form components
│   │   ├── ShareChatThoughtsForm.tsx
│   │   ├── SharePromptForm.tsx
│   │   └── CommunityPostForm.tsx
│   ├── VoteModal.tsx             # 投票弹窗 / Vote modal
│   ├── VotingDisplay.tsx         # 投票显示 / Voting display
│   └── ui/                       # UI 组件库 / UI component library
├── lib/                          # 工具库 / Utility library
│   ├── storage.ts                # 数据存储服务 / Data storage service
│   ├── initialData.ts            # 初始数据 / Initial data
│   └── utils.ts                  # 工具函数 / Utility functions
└── public/                       # 静态资源 / Static assets
```

## 🎨 设计系统 / Design System

### 颜色方案 / Color Scheme
- **主色调**: 黑白配色，简洁现代 / **Primary**: Black and white color scheme, clean and modern
- **强调色**: / **Accent Colors**:
  - 绿色 - 提示词相关 / Green - Prompt related
  - 蓝色 - 普通帖子 / Blue - Regular posts
  - 紫色 - 活动相关 / Purple - Event related
  - 红色 - 点赞和重要操作 / Red - Likes and important actions

### 布局原则 / Layout Principles
- **响应式设计**: 移动端优先，适配所有设备 / **Responsive Design**: Mobile-first, adapts to all devices
- **卡片式布局**: 统一的内容展示方式 / **Card Layout**: Unified content display method
- **一致性**: 统一的间距、字体和交互模式 / **Consistency**: Unified spacing, fonts, and interaction patterns

## 🚀 快速开始 / Quick Start

### 环境要求 / Requirements
- Node.js 18+ 
- npm 或 yarn / npm or yarn

### 安装依赖 / Install Dependencies
```bash
npm install
```

### 启动开发服务器 / Start Development Server
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。 / Visit [http://localhost:3000](http://localhost:3000) to view the application.

### 构建生产版本 / Build Production Version
```bash
npm run build
npm start
```

## 📱 页面功能详解 / Page Features

### 首页 (`/`) / Homepage (`/`)
- **帖子流**: 显示最新和热门的帖子 / **Post Feed**: Display latest and trending posts
- **搜索功能**: 按标题、内容、标签搜索 / **Search**: Search by title, content, and tags
- **分类入口**: 快速访问不同类型的帖子 / **Category Entries**: Quick access to different post types
- **响应式布局**: 适配不同屏幕尺寸 / **Responsive Layout**: Adapts to different screen sizes

### 发帖页面 (`/post/new`) / Post Creation (`/post/new`)
- **类型选择**: 三种发帖类型的统一入口 / **Type Selection**: Unified entry for three post types
- **表单验证**: 实时验证用户输入 / **Form Validation**: Real-time user input validation
- **预览功能**: 发布前预览内容 / **Preview**: Preview content before publishing
- **确认机制**: 防止误操作 / **Confirmation**: Prevent accidental operations

### 帖子详情 (`/post/[id]`) / Post Details (`/post/[id]`)
- **完整内容**: 显示帖子的所有信息 / **Complete Content**: Display all post information
- **投票系统**: 针对提示词的评分功能 / **Voting System**: Rating functionality for prompts
- **评论系统**: 用户互动和讨论 / **Comment System**: User interaction and discussion
- **收藏功能**: 保存感兴趣的帖子 / **Bookmark**: Save interesting posts

### 热门页面 (`/trending`) / Trending Page (`/trending`)
- **智能排序**: 按热度和时间排序 / **Smart Sorting**: Sort by popularity and time
- **分类浏览**: 不同类型的专门页面 / **Category Browsing**: Dedicated pages for different types
- **活动排序**: 按时间和参与度排序活动 / **Event Sorting**: Sort events by time and participation

### 个人中心 / Personal Center
- **我的发布**: 管理自己发布的内容 / **My Posts**: Manage published content
- **书签收藏**: 查看收藏的帖子 / **Bookmarks**: View bookmarked posts
- **积分系统**: 查看AI Coins余额 / **Points System**: View AI Coins balance

## 🔧 核心功能实现 / Core Feature Implementation

### 数据存储 / Data Storage
使用 `localStorage` 实现客户端数据持久化： / Use `localStorage` for client-side data persistence:
- 帖子数据管理 / Post data management
- 用户信息存储 / User information storage
- 书签和收藏 / Bookmarks and favorites
- 投票数据 / Voting data

### 投票系统 / Voting System
针对提示词的详细评分系统： / Detailed rating system for prompts:
- 5个评分等级 / 5 rating levels
- 使用场景分类 / Use case categorization
- 成功率统计 / Success rate statistics
- 作者打赏功能 / Author tipping feature

### 搜索和过滤 / Search and Filter
- 实时搜索 / Real-time search
- 标签过滤 / Tag filtering
- 类型筛选 / Type filtering
- 排序选项 / Sorting options

## 🎯 用户体验设计 / User Experience Design

### 交互设计 / Interaction Design
- **直观导航**: 清晰的页面结构和导航 / **Intuitive Navigation**: Clear page structure and navigation
- **即时反馈**: 操作后的即时视觉反馈 / **Instant Feedback**: Immediate visual feedback after operations
- **确认机制**: 重要操作的二次确认 / **Confirmation**: Secondary confirmation for important operations
- **加载状态**: 优雅的加载和错误处理 / **Loading States**: Elegant loading and error handling

### 内容展示 / Content Display
- **统一卡片**: 一致的内容展示格式 / **Unified Cards**: Consistent content display format
- **智能截断**: 长内容的智能显示 / **Smart Truncation**: Intelligent display of long content
- **响应式布局**: 适配不同设备 / **Responsive Layout**: Adapts to different devices
- **视觉层次**: 清晰的信息层级 / **Visual Hierarchy**: Clear information hierarchy

## 🔒 隐私和安全 / Privacy and Security

### 数据保护 / Data Protection
- 客户端存储，数据不离开用户设备 / Client-side storage, data doesn't leave user device
- 隐私保护指南 / Privacy protection guidelines
- 敏感信息过滤提醒 / Sensitive information filtering reminders

### 社区安全 / Community Safety
- 内容审核机制 / Content moderation mechanism
- 举报功能 / Reporting functionality
- 社区准则 / Community guidelines

## 🚀 部署 / Deployment

### 静态部署 / Static Deployment
项目可以部署到任何支持静态文件的平台： / Project can be deployed to any platform supporting static files:
- Vercel (推荐) / Vercel (Recommended)
- Netlify
- GitHub Pages

### 环境变量 / Environment Variables
无需特殊环境变量配置，所有功能基于客户端实现。 / No special environment variable configuration needed, all features are client-side based.

## 🤝 贡献指南 / Contributing

### 开发流程 / Development Process
1. Fork 项目 / Fork the project
2. 创建功能分支 / Create feature branch
3. 提交更改 / Commit changes
4. 创建 Pull Request / Create Pull Request

### 代码规范 / Code Standards
- 使用 TypeScript / Use TypeScript
- 遵循 ESLint 规则 / Follow ESLint rules
- 组件化开发 / Component-based development
- 注释和文档 / Comments and documentation

## 📄 许可证 / License

MIT License - 详见 [LICENSE](LICENSE) 文件 / MIT License - See [LICENSE](LICENSE) file

## 📞 联系方式 / Contact
Creator: Qingyu Cao
如有问题或建议，请通过以下方式联系： / For questions or suggestions, please contact through:
cqyestateyuki@gmail.coms
- 创建 Issue / Create Issue
- 发送邮件 / Send email
- 社区讨论 / Community discussion

---

**AI Community MVP v2** - 让AI知识分享更简单、更有价值！ / **AI Community MVP v2** - Making AI knowledge sharing simpler and more valuable!# Deployment Update Sun Sep 21 18:56:35 EDT 2025
# Deployment Update Sun Sep 21 19:03:52 EDT 2025
# Deployment Update Sun Sep 21 19:07:04 EDT 2025
