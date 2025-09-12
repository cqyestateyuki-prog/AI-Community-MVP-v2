# AI Community MVP v2 - Vercel部署指南 / Vercel Deployment Guide

## 🚀 Vercel部署步骤 / Vercel Deployment Steps

### 方法1: 通过Vercel网站部署 (推荐) / Method 1: Deploy via Vercel Website (Recommended)

#### 步骤1: 准备代码仓库 / Step 1: Prepare Code Repository

```bash
# 1. 初始化Git仓库 (如果还没有)
# 1. Initialize Git repository (if not already done)
git init

# 2. 添加所有文件
# 2. Add all files
git add .

# 3. 提交代码
# 3. Commit code
git commit -m "Initial commit: AI Community MVP v2"

# 4. 在GitHub创建新仓库
# 4. Create new repository on GitHub
# 访问 https://github.com/new
# Visit https://github.com/new
# 仓库名: ai-community-mvp-v2
# Repository name: ai-community-mvp-v2
# 设为公开仓库
# Set as public repository

# 5. 连接本地仓库到GitHub
# 5. Connect local repository to GitHub
git remote add origin https://github.com/你的用户名/ai-community-mvp-v2.git
git branch -M main
git push -u origin main
```

#### 步骤2: 连接Vercel / Step 2: Connect Vercel

1. **访问Vercel网站**
   - 打开 [vercel.com](https://vercel.com)
   - 点击 "Sign up" 或 "Log in"
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的GitHub仓库 `ai-community-mvp-v2`
   - 点击 "Import"

3. **配置项目设置**
   ```
   Project Name: ai-community-mvp-v2
   Framework Preset: Next.js (自动检测)
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **环境变量设置** (可选)
   ```
   NEXT_PUBLIC_APP_NAME=AI Community MVP v2
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NEXT_PUBLIC_APP_URL=https://ai-community-mvp-v2.vercel.app
   ```

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成 (通常2-3分钟)
   - 获得部署URL: `https://ai-community-mvp-v2.vercel.app`

### 方法2: 通过Vercel CLI部署 / Method 2: Deploy via Vercel CLI

#### 安装Vercel CLI / Install Vercel CLI

```bash
# 全局安装Vercel CLI
# Install Vercel CLI globally
npm install -g vercel

# 或者使用npx (推荐)
# Or use npx (recommended)
npx vercel
```

#### 部署命令 / Deployment Commands

```bash
# 1. 登录Vercel
# 1. Login to Vercel
vercel login

# 2. 在项目目录中部署
# 2. Deploy from project directory
vercel

# 3. 生产环境部署
# 3. Deploy to production
vercel --prod
```

## 🔧 部署后配置 / Post-deployment Configuration

### 1. 自定义域名 / Custom Domain

1. **在Vercel Dashboard中**
   - 进入项目设置
   - 点击 "Domains" 标签
   - 添加你的自定义域名

2. **DNS配置**
   ```
   类型: CNAME
   名称: www (或 @)
   值: cname.vercel-dns.com
   ```

### 2. 环境变量管理 / Environment Variables

在Vercel Dashboard > Project Settings > Environment Variables中添加：

```bash
# 生产环境变量
NEXT_PUBLIC_APP_NAME=AI Community MVP v2
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-domain.com

# 开发环境变量
NEXT_PUBLIC_APP_NAME=AI Community MVP v2 (Dev)
NEXT_PUBLIC_APP_VERSION=1.0.0-dev
NEXT_PUBLIC_APP_URL=https://ai-community-mvp-v2-git-main-yourusername.vercel.app
```

### 3. 自动部署设置 / Automatic Deployment Settings

Vercel会自动：
- 监听GitHub仓库的push事件
- 自动触发新的部署
- 为每个分支创建预览环境
- 为每个Pull Request创建预览URL

## 📊 监控和分析 / Monitoring and Analytics

### 1. Vercel Analytics / Vercel Analytics

```bash
# 安装Vercel Analytics
# Install Vercel Analytics
npm install @vercel/analytics
```

```javascript
// 在 app/layout.tsx 中添加
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. 性能监控 / Performance Monitoring

Vercel提供内置的：
- **Web Vitals** 监控
- **Core Web Vitals** 报告
- **Real User Monitoring (RUM)**
- **Serverless Function** 监控

## 🚨 常见问题和解决方案 / Common Issues and Solutions

### 1. 构建错误 / Build Errors

#### 问题: 模块未找到 / Issue: Module not found
```bash
# 解决方案: 检查依赖安装
# Solution: Check dependency installation
npm install
npm run build
```

#### 问题: 内存不足 / Issue: Out of memory
```bash
# 解决方案: 增加Node.js内存限制
# Solution: Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### 2. 运行时错误 / Runtime Errors

#### 问题: localStorage未定义 / Issue: localStorage undefined
```javascript
// 解决方案: 添加客户端检查
// Solution: Add client-side check
if (typeof window !== 'undefined') {
  // localStorage code here
}
```

#### 问题: 图片加载失败 / Issue: Image loading failed
```javascript
// 解决方案: 检查图片域名配置
// Solution: Check image domain configuration
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.dicebear.com',
    },
  ],
}
```

### 3. 性能优化 / Performance Optimization

#### 问题: 首屏加载慢 / Issue: Slow first load
```javascript
// 解决方案: 使用动态导入
// Solution: Use dynamic imports
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## 🔄 持续部署流程 / Continuous Deployment Process

### 1. 开发流程 / Development Process

```bash
# 1. 创建功能分支
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. 开发和测试
# 2. Develop and test
npm run dev

# 3. 提交代码
# 3. Commit code
git add .
git commit -m "Add new feature"

# 4. 推送到GitHub
# 4. Push to GitHub
git push origin feature/new-feature

# 5. 创建Pull Request
# 5. Create Pull Request
# Vercel会自动创建预览环境
# Vercel will automatically create preview environment
```

### 2. 生产部署 / Production Deployment

```bash
# 1. 合并到主分支
# 1. Merge to main branch
git checkout main
git merge feature/new-feature

# 2. 推送到GitHub
# 2. Push to GitHub
git push origin main

# 3. Vercel自动部署到生产环境
# 3. Vercel automatically deploys to production
```

## 📈 部署检查清单 / Deployment Checklist

### 部署前检查 / Pre-deployment Checklist
- [ ] 代码构建成功 (`npm run build`)
- [ ] 所有功能测试通过
- [ ] 环境变量配置正确
- [ ] 图片和静态资源正常
- [ ] 移动端适配正确
- [ ] 性能指标达标

### 部署后检查 / Post-deployment Checklist
- [ ] 网站可以正常访问
- [ ] 所有页面加载正常
- [ ] 交互功能正常工作
- [ ] 数据持久化正常 (localStorage)
- [ ] 移动端体验良好
- [ ] 性能监控正常

## 🎉 部署完成！/ Deployment Complete!

**你的AI社区现在已经在线了！** / **Your AI Community is now online!**

**访问地址**: `https://ai-community-mvp-v2.vercel.app` / **Access URL**: `https://ai-community-mvp-v2.vercel.app`

**管理面板**: [Vercel Dashboard](https://vercel.com/dashboard) / **Management Panel**: [Vercel Dashboard](https://vercel.com/dashboard)

---

## 📞 技术支持 / Technical Support

如果遇到问题，可以：
- 查看Vercel文档: [vercel.com/docs](https://vercel.com/docs)
- 检查构建日志: Vercel Dashboard > Deployments
- 联系技术支持: Vercel Support

If you encounter issues, you can:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Check build logs: Vercel Dashboard > Deployments
- Contact technical support: Vercel Support
