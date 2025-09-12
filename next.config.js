/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 部署配置 - 支持SSR和静态生成
  // Vercel deployment configuration - Supports SSR and static generation
  images: {
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
  
  // 性能优化
  // Performance optimization
  compress: true,
  swcMinify: true,
  
  // 实验性功能
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
