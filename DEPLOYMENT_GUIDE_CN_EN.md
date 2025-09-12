# AI Community MVP v2 - 部署指南 / Deployment Guide

## 🚀 部署选项概览 / Deployment Options Overview

### 推荐部署平台 / Recommended Deployment Platforms

1. **Vercel** (最推荐) - 专为Next.js优化
2. **Netlify** - 支持静态站点和JAMstack
3. **GitHub Pages** - 免费静态托管
4. **AWS S3 + CloudFront** - 企业级解决方案

## 📋 部署前准备 / Pre-deployment Preparation

### 1. 代码优化 / Code Optimization

#### 检查构建配置 / Check Build Configuration
```bash
# 确保项目可以正常构建
# Ensure project can build successfully
npm run build
```

#### 优化Next.js配置 / Optimize Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置（用于静态托管）
  // Static export configuration (for static hosting)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // 静态导出时需要
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/7.x/avataaars/svg**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 禁用服务端功能（因为使用localStorage）
  // Disable server-side features (since using localStorage)
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
```

### 2. 环境变量配置 / Environment Variables Configuration

创建 `.env.local` 文件：
```bash
# 应用配置
NEXT_PUBLIC_APP_NAME=AI Community MVP v2
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-domain.com

# 功能开关
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### 3. 构建优化 / Build Optimization

#### 更新package.json脚本 / Update package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "next build && next export",
    "start": "next start",
    "lint": "next lint",
    "preview": "next build && next start"
  }
}
```

## 🌐 部署方案 / Deployment Solutions

### 方案1: Vercel部署 (推荐) / Vercel Deployment (Recommended)

#### 步骤1: 准备代码仓库 / Step 1: Prepare Code Repository
```bash
# 初始化Git仓库
# Initialize Git repository
git init
git add .
git commit -m "Initial commit: AI Community MVP v2"

# 推送到GitHub
# Push to GitHub
git remote add origin https://github.com/yourusername/ai-community-mvp-v2.git
git push -u origin main
```

#### 步骤2: 连接Vercel / Step 2: Connect Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择你的GitHub仓库
5. 配置项目设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### 步骤3: 环境变量配置 / Step 3: Environment Variables
在Vercel Dashboard中设置：
```
NEXT_PUBLIC_APP_NAME=AI Community MVP v2
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

#### 步骤4: 部署 / Step 4: Deploy
```bash
# 自动部署（推送代码时）
# Automatic deployment (when pushing code)
git push origin main

# 或手动部署
# Or manual deployment
vercel --prod
```

### 方案2: Netlify部署 / Netlify Deployment

#### 步骤1: 构建静态文件 / Step 1: Build Static Files
```bash
# 更新next.config.js为静态导出
# Update next.config.js for static export
npm run build
```

#### 步骤2: 部署到Netlify / Step 2: Deploy to Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 选择 "New site from Git"
4. 连接GitHub仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18.x`

#### 步骤3: 环境变量 / Step 3: Environment Variables
在Netlify Dashboard > Site settings > Environment variables中添加：
```
NEXT_PUBLIC_APP_NAME=AI Community MVP v2
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

### 方案3: GitHub Pages部署 / GitHub Pages Deployment

#### 步骤1: 配置静态导出 / Step 1: Configure Static Export
```bash
# 安装gh-pages包
# Install gh-pages package
npm install --save-dev gh-pages

# 更新package.json
# Update package.json
{
  "scripts": {
    "build": "next build && next export",
    "deploy": "gh-pages -d out"
  }
}
```

#### 步骤2: 部署脚本 / Step 2: Deployment Script
```bash
# 构建和部署
# Build and deploy
npm run build
npm run deploy
```

#### 步骤3: 配置GitHub Pages / Step 3: Configure GitHub Pages
1. 进入GitHub仓库设置
2. 找到 "Pages" 部分
3. 选择 "Deploy from a branch"
4. 选择 `gh-pages` 分支
5. 保存设置

### 方案4: AWS S3 + CloudFront部署 / AWS S3 + CloudFront Deployment

#### 步骤1: 准备S3存储桶 / Step 1: Prepare S3 Bucket
```bash
# 安装AWS CLI
# Install AWS CLI
aws configure

# 创建S3存储桶
# Create S3 bucket
aws s3 mb s3://your-ai-community-bucket
```

#### 步骤2: 构建和上传 / Step 2: Build and Upload
```bash
# 构建静态文件
# Build static files
npm run build

# 上传到S3
# Upload to S3
aws s3 sync out/ s3://your-ai-community-bucket --delete
```

#### 步骤3: 配置CloudFront / Step 3: Configure CloudFront
1. 创建CloudFront分发
2. 设置源为S3存储桶
3. 配置缓存策略
4. 设置自定义域名（可选）

## 🔧 部署后配置 / Post-deployment Configuration

### 1. 域名配置 / Domain Configuration

#### 自定义域名 / Custom Domain
```bash
# 在DNS提供商处添加CNAME记录
# Add CNAME record at DNS provider
# Vercel: cname.vercel-dns.com
# Netlify: your-site.netlify.app
```

#### SSL证书 / SSL Certificate
- Vercel: 自动提供Let's Encrypt证书
- Netlify: 自动提供Let's Encrypt证书
- AWS: 通过ACM申请证书

### 2. 性能优化 / Performance Optimization

#### 启用CDN / Enable CDN
```javascript
// next.config.js
const nextConfig = {
  // 启用压缩
  // Enable compression
  compress: true,
  
  // 优化图片
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // 启用SWC编译器
  // Enable SWC compiler
  swcMinify: true,
}
```

#### 缓存策略 / Caching Strategy
```javascript
// 设置缓存头
// Set cache headers
const headers = [
  {
    source: '/static/(.*)',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
]
```

### 3. 监控和分析 / Monitoring and Analytics

#### 添加Google Analytics / Add Google Analytics
```javascript
// lib/analytics.js
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
```

#### 错误监控 / Error Monitoring
```javascript
// 添加Sentry错误监控
// Add Sentry error monitoring
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
})
```

## 🚨 常见问题和解决方案 / Common Issues and Solutions

### 1. 构建错误 / Build Errors

#### 问题: 静态导出失败 / Issue: Static Export Fails
```bash
# 解决方案: 检查是否有服务端代码
# Solution: Check for server-side code
# 确保所有数据获取都在客户端进行
# Ensure all data fetching is client-side
```

#### 问题: 图片优化错误 / Issue: Image Optimization Error
```javascript
// 解决方案: 禁用图片优化
// Solution: Disable image optimization
// next.config.js
images: {
  unoptimized: true,
}
```

### 2. 运行时错误 / Runtime Errors

#### 问题: localStorage未定义 / Issue: localStorage is undefined
```javascript
// 解决方案: 添加客户端检查
// Solution: Add client-side check
if (typeof window !== 'undefined') {
  // localStorage code here
}
```

#### 问题: 水合错误 / Issue: Hydration Errors
```javascript
// 解决方案: 使用useEffect延迟渲染
// Solution: Use useEffect for delayed rendering
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null
```

### 3. 性能问题 / Performance Issues

#### 问题: 首屏加载慢 / Issue: Slow First Load
```javascript
// 解决方案: 代码分割和懒加载
// Solution: Code splitting and lazy loading
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

## 📊 部署检查清单 / Deployment Checklist

### 部署前检查 / Pre-deployment Checklist
- [ ] 代码构建成功 (`npm run build`)
- [ ] 所有功能测试通过
- [ ] 环境变量配置正确
- [ ] 静态资源路径正确
- [ ] 错误处理完善
- [ ] 性能优化完成

### 部署后检查 / Post-deployment Checklist
- [ ] 网站可以正常访问
- [ ] 所有页面加载正常
- [ ] 交互功能正常工作
- [ ] 移动端适配正确
- [ ] 性能指标达标
- [ ] 错误监控正常

## 🔄 持续部署 / Continuous Deployment

### GitHub Actions配置 / GitHub Actions Configuration
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

## 📈 监控和维护 / Monitoring and Maintenance

### 性能监控 / Performance Monitoring
- 使用Vercel Analytics或Google Analytics
- 监控Core Web Vitals指标
- 设置性能警报

### 错误监控 / Error Monitoring
- 集成Sentry或类似服务
- 设置错误通知
- 定期检查错误日志

### 内容更新 / Content Updates
- 定期更新初始数据
- 监控用户反馈
- 持续优化用户体验

---

**部署完成后，你的AI社区将可以在线访问！** / **After deployment, your AI Community will be accessible online!**

**推荐部署平台**: Vercel (最简单) / **Recommended Platform**: Vercel (Easiest)
**预计部署时间**: 5-10分钟 / **Estimated Deployment Time**: 5-10 minutes
