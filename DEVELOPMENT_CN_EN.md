# AI Community MVP v2 - 开发指南 / Development Guide

## 🚀 快速开始 / Quick Start

### 环境要求 / Requirements
- Node.js 18.0 或更高版本 / Node.js 18.0 or higher
- npm 9.0 或更高版本 / npm 9.0 or higher
- Git

### 安装步骤 / Installation Steps
```bash
# 克隆项目 / Clone project
git clone <repository-url>
cd ai-community-mvp-v2

# 安装依赖 / Install dependencies
npm install

# 启动开发服务器 / Start development server
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。 / Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 项目结构详解 / Project Structure Details

### 目录结构 / Directory Structure
```
ai-community-mvp-v2/
├── app/                    # Next.js App Router 页面 / Next.js App Router pages
│   ├── globals.css         # 全局样式 / Global styles
│   ├── layout.tsx          # 根布局组件 / Root layout component
│   ├── page.tsx            # 首页 / Homepage
│   ├── bookmarks/          # 书签页面 / Bookmarks page
│   ├── guide/              # 新手指南 / Beginner guide
│   ├── my-posts/           # 我的发布 / My posts
│   ├── safety/             # 社区安全 / Community safety
│   ├── trending/           # 热门内容 / Trending content
│   └── post/               # 帖子相关页面 / Post related pages
│       ├── [id]/           # 动态路由 - 帖子详情 / Dynamic route - post details
│       └── new/            # 创建新帖子 / Create new post
├── components/             # React 组件 / React components
│   ├── AppLayout.tsx       # 应用主布局 / Main app layout
│   ├── Sidebar.tsx         # 侧边栏组件 / Sidebar component
│   ├── forms/              # 表单组件 / Form components
│   ├── ui/                 # 基础UI组件 / Basic UI components
│   └── ...                 # 其他组件 / Other components
├── lib/                    # 工具库和配置 / Utility library and configuration
│   ├── storage.ts          # 数据存储服务 / Data storage service
│   ├── initialData.ts      # 初始数据 / Initial data
│   └── utils.ts            # 工具函数 / Utility functions
├── public/                 # 静态资源 / Static assets
└── ...                     # 配置文件 / Configuration files
```

## 🛠 开发环境配置 / Development Environment Setup

### 推荐开发工具 / Recommended Development Tools
- **IDE**: VS Code
- **扩展**: / **Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Auto Rename Tag
  - Bracket Pair Colorizer

### 代码规范 / Code Standards
项目使用 ESLint 进行代码质量检查： / Project uses ESLint for code quality checking:

```bash
# 检查代码规范 / Check code standards
npm run lint

# 自动修复可修复的问题 / Auto-fix fixable issues
npm run lint -- --fix
```

### TypeScript 配置 / TypeScript Configuration
项目使用严格的 TypeScript 配置，确保类型安全： / Project uses strict TypeScript configuration to ensure type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 🧩 组件开发指南 / Component Development Guide

### 组件结构 / Component Structure
每个组件都应该遵循以下结构： / Each component should follow this structure:

```typescript
// 1. 导入依赖 / Import dependencies
import React from 'react'
import { SomeIcon } from 'lucide-react'

// 2. 定义接口 / Define interfaces
interface ComponentProps {
  title: string
  onAction?: () => void
  children?: React.ReactNode
}

// 3. 组件实现 / Component implementation
export default function Component({ title, onAction, children }: ComponentProps) {
  // 状态管理 / State management
  const [state, setState] = useState(false)
  
  // 事件处理 / Event handling
  const handleClick = () => {
    onAction?.()
  }
  
  // 渲染 / Render
  return (
    <div className="component-container">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### 样式指南 / Styling Guide
使用 Tailwind CSS 进行样式设计： / Use Tailwind CSS for styling:

```typescript
// 基础样式 / Basic styles
<div className="bg-white border border-gray-300 rounded-lg p-6">

// 响应式设计 / Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 状态样式 / State styles
<button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">

// 条件样式 / Conditional styles
<div className={`px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
```

### 表单组件开发 / Form Component Development
表单组件应该使用 React Hook Form： / Form components should use React Hook Form:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 定义验证模式 / Define validation schema
const formSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(10, '内容至少10个字符'),
})

type FormData = z.infer<typeof formSchema>

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title')}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </form>
  )
}
```

## 📊 数据管理 / Data Management

### 存储服务使用 / Storage Service Usage
使用 `lib/storage.ts` 中的 StorageService 进行数据管理： / Use StorageService from `lib/storage.ts` for data management:

```typescript
import storage from '@/lib/storage'

// 获取数据 / Get data
const posts = storage.getPosts()
const user = storage.getCurrentUser()

// 添加数据 / Add data
const newPost = storage.addPost({
  title: 'New Post',
  type: 'chat_sharing',
  // ... 其他字段 / other fields
})

// 更新数据 / Update data
storage.updatePost(postId, { likes: newLikes })

// 删除数据 / Delete data
storage.deletePost(postId)
```

### 状态管理 / State Management
使用 React Hooks 进行状态管理： / Use React Hooks for state management:

```typescript
// 页面级状态 / Page-level state
const [posts, setPosts] = useState<Post[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

// 数据加载 / Data loading
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true)
      const data = storage.getPosts()
      setPosts(data)
    } catch (err) {
      setError('加载数据失败')
    } finally {
      setLoading(false)
    }
  }
  
  loadData()
}, [])
```

## 🎨 UI/UX 开发 / UI/UX Development

### 设计系统 / Design System
遵循统一的设计系统： / Follow unified design system:

```typescript
// 颜色系统 / Color system
const colors = {
  primary: 'black',
  secondary: 'gray-600',
  accent: 'blue-500',
  success: 'green-500',
  warning: 'yellow-500',
  error: 'red-500',
}

// 间距系统 / Spacing system
const spacing = {
  xs: '1',
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',
}

// 字体系统 / Typography system
const typography = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  body: 'text-base',
  caption: 'text-sm text-gray-600',
}
```

### 响应式设计 / Responsive Design
确保所有组件都是响应式的： / Ensure all components are responsive:

```typescript
// 移动端优先 / Mobile-first
<div className="w-full md:w-1/2 lg:w-1/3">

// 响应式网格 / Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// 响应式文本 / Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// 响应式间距 / Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
```

### 动画和交互 / Animations and Interactions
使用 Framer Motion 添加动画： / Use Framer Motion to add animations:

```typescript
import { motion } from 'framer-motion'

// 基础动画 / Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// 悬停动画 / Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

## 🧪 测试指南 / Testing Guide

### 单元测试 / Unit Testing
为组件编写单元测试： / Write unit tests for components:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<MyComponent title="Test" onAction={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### 集成测试 / Integration Testing
测试页面级别的功能： / Test page-level functionality:

```typescript
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('loads and displays posts', async () => {
    render(<HomePage />)
    
    // 等待数据加载 / Wait for data loading
    await waitFor(() => {
      expect(screen.getByText('Loading...')).not.toBeInTheDocument()
    })
    
    // 验证帖子显示 / Verify post display
    expect(screen.getAllByRole('article')).toHaveLength(5)
  })
})
```

## 🚀 部署指南 / Deployment Guide

### 构建生产版本 / Build Production Version
```bash
# 构建项目 / Build project
npm run build

# 启动生产服务器 / Start production server
npm start
```

### 静态导出 / Static Export
如果需要静态导出： / If static export is needed:

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 部署到 Vercel / Deploy to Vercel
1. 连接 GitHub 仓库 / Connect GitHub repository
2. 配置构建设置 / Configure build settings
3. 部署 / Deploy

### 部署到其他平台 / Deploy to Other Platforms
- **Netlify**: 支持 Next.js 静态导出 / Supports Next.js static export
- **GitHub Pages**: 使用静态导出 / Use static export
- **AWS S3**: 上传静态文件 / Upload static files

## 🔧 调试指南 / Debugging Guide

### 开发工具 / Development Tools
- **React Developer Tools**: 组件调试 / Component debugging
- **Redux DevTools**: 状态调试 / State debugging
- **Network Tab**: 网络请求调试 / Network request debugging
- **Console**: 日志输出 / Log output

### 常见问题 / Common Issues
1. **Hydration 错误**: 确保服务端和客户端渲染一致 / **Hydration Error**: Ensure server and client rendering consistency
2. **TypeScript 错误**: 检查类型定义和导入 / **TypeScript Error**: Check type definitions and imports
3. **样式问题**: 检查 Tailwind CSS 类名 / **Styling Issues**: Check Tailwind CSS class names
4. **数据加载问题**: 检查 localStorage 和 useEffect / **Data Loading Issues**: Check localStorage and useEffect

### 调试技巧 / Debugging Tips
```typescript
// 添加调试日志 / Add debug logs
console.log('Debug info:', { posts, user, loading })

// 使用 React DevTools / Use React DevTools
const [debug, setDebug] = useState(false)

// 条件渲染调试信息 / Conditionally render debug info
{debug && (
  <div className="debug-panel">
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
)}
```

## 📚 学习资源 / Learning Resources

### 官方文档 / Official Documentation
- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 推荐资源 / Recommended Resources
- [React Hook Form 文档](https://react-hook-form.com)
- [Framer Motion 文档](https://www.framer.com/motion)
- [Zod 文档](https://zod.dev)

## 🤝 贡献指南 / Contributing Guide

### 开发流程 / Development Process
1. Fork 项目 / Fork project
2. 创建功能分支: `git checkout -b feature/amazing-feature` / Create feature branch: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'` / Commit changes: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature` / Push branch: `git push origin feature/amazing-feature`
5. 创建 Pull Request / Create Pull Request

### 代码规范 / Code Standards
- 使用 TypeScript / Use TypeScript
- 遵循 ESLint 规则 / Follow ESLint rules
- 编写清晰的注释 / Write clear comments
- 保持组件简洁 / Keep components simple
- 测试新功能 / Test new features

### 提交信息规范 / Commit Message Standards
```
feat: 新功能 / New feature
fix: 修复bug / Bug fix
docs: 文档更新 / Documentation update
style: 代码格式调整 / Code style adjustment
refactor: 代码重构 / Code refactoring
test: 测试相关 / Test related
chore: 构建过程或辅助工具的变动 / Build process or auxiliary tool changes
```

---

这个开发指南提供了完整的开发环境设置、代码规范和最佳实践，帮助开发者快速上手项目开发。

This development guide provides complete development environment setup, code standards, and best practices to help developers quickly get started with project development.
