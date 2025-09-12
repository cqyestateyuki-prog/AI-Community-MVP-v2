#!/bin/bash

# AI Community MVP v2 - 快速部署脚本
# AI Community MVP v2 - Quick Deployment Script

echo "🚀 开始部署 AI Community MVP v2..."
echo "🚀 Starting deployment of AI Community MVP v2..."

# 检查Node.js版本
# Check Node.js version
echo "📋 检查环境..."
echo "📋 Checking environment..."
node --version
npm --version

# 安装依赖
# Install dependencies
echo "📦 安装依赖..."
echo "📦 Installing dependencies..."
npm install

# 运行代码检查
# Run code linting
echo "🔍 运行代码检查..."
echo "🔍 Running code linting..."
npm run lint

# 构建项目
# Build project
echo "🏗️ 构建项目..."
echo "🏗️ Building project..."
npm run build

# 检查构建结果
# Check build results
if [ -d "out" ]; then
    echo "✅ 构建成功！静态文件已生成在 'out' 目录"
    echo "✅ Build successful! Static files generated in 'out' directory"
    
    # 显示构建信息
    # Show build information
    echo "📊 构建统计："
    echo "📊 Build statistics:"
    du -sh out/
    find out -name "*.html" | wc -l | xargs echo "HTML files:"
    find out -name "*.js" | wc -l | xargs echo "JavaScript files:"
    find out -name "*.css" | wc -l | xargs echo "CSS files:"
    
    echo ""
    echo "🎉 部署准备完成！"
    echo "🎉 Deployment preparation complete!"
    echo ""
    echo "📋 下一步："
    echo "📋 Next steps:"
    echo "1. 将 'out' 目录上传到你的托管平台"
    echo "1. Upload 'out' directory to your hosting platform"
    echo "2. 配置域名和SSL证书"
    echo "2. Configure domain and SSL certificate"
    echo "3. 测试网站功能"
    echo "3. Test website functionality"
    echo ""
    echo "🌐 推荐托管平台："
    echo "🌐 Recommended hosting platforms:"
    echo "- Vercel: https://vercel.com"
    echo "- Netlify: https://netlify.com"
    echo "- GitHub Pages: https://pages.github.com"
    
else
    echo "❌ 构建失败！请检查错误信息"
    echo "❌ Build failed! Please check error messages"
    exit 1
fi
