# AI Community MVP v2 - 设计规范 / Design System

**Copyright (c) 2025 Designer: Qingyu Cao**  
**All rights reserved.**

## 📋 目录 / Table of Contents

- [设计原则 / Design Principles](#设计原则--design-principles)
- [颜色系统 / Color System](#颜色系统--color-system)
- [字体系统 / Typography](#字体系统--typography)
- [间距系统 / Spacing System](#间距系统--spacing-system)
- [组件规范 / Component Specifications](#组件规范--component-specifications)
- [布局规范 / Layout Specifications](#布局规范--layout-specifications)
- [Figma设计指南 / Figma Design Guide](#figma设计指南--figma-design-guide)

---

## 🎨 设计原则 / Design Principles

### 核心原则 / Core Principles
1. **简洁明了** / **Clean & Clear** - 减少视觉噪音，突出内容
2. **一致性** / **Consistency** - 统一的视觉语言和交互模式
3. **可访问性** / **Accessibility** - 确保所有用户都能轻松使用
4. **响应式** / **Responsive** - 适配各种设备和屏幕尺寸
5. **现代感** / **Modern** - 使用当前流行的设计趋势

### 设计理念 / Design Philosophy
- **内容为王** / **Content First** - 设计服务于内容，不喧宾夺主
- **用户友好** / **User-Friendly** - 直观的交互和清晰的信息层次
- **品牌一致** / **Brand Consistent** - 统一的视觉识别和体验

---

## 🎨 颜色系统 / Color System

### 主色调 / Primary Colors
```css
/* 黑色系 - 主要品牌色 */
--black: #000000;           /* 纯黑 - 主要文字、按钮 */
--gray-900: #111827;        /* 深灰 - 标题文字 */
--gray-800: #1f2937;        /* 深灰 - 次要标题 */
--gray-700: #374151;        /* 中深灰 - 正文文字 */
--gray-600: #4b5563;        /* 中灰 - 辅助文字 */
--gray-500: #6b7280;        /* 中灰 - 占位符文字 */
--gray-400: #9ca3af;        /* 浅灰 - 禁用状态 */
--gray-300: #d1d5db;        /* 浅灰 - 边框 */
--gray-200: #e5e7eb;        /* 很浅灰 - 分割线 */
--gray-100: #f3f4f6;        /* 极浅灰 - 背景 */
--gray-50: #f9fafb;         /* 最浅灰 - 卡片背景 */
--white: #ffffff;           /* 纯白 - 主背景 */
```

### 功能色 / Functional Colors
```css
/* 蓝色系 - 链接和强调 */
--blue-600: #2563eb;        /* 主蓝色 - 链接、标签 */
--blue-500: #3b82f6;        /* 悬停蓝色 */
--blue-400: #60a5fa;        /* 浅蓝色 */

/* 绿色系 - 成功状态 */
--green-600: #16a34a;       /* 成功绿色 */
--green-500: #22c55e;       /* 成功浅绿 */

/* 红色系 - 错误和警告 */
--red-600: #dc2626;         /* 错误红色 */
--red-500: #ef4444;         /* 错误浅红 */

/* 黄色系 - 警告和强调 */
--yellow-500: #eab308;      /* 警告黄色 */
--yellow-400: #facc15;      /* 警告浅黄 */

/* 紫色系 - 特殊功能 */
--purple-600: #9333ea;      /* 紫色标签 */
--purple-500: #a855f7;      /* 紫色悬停 */
```

### 语义化颜色 / Semantic Colors
```css
/* 文字颜色 */
--text-primary: #000000;    /* 主要文字 */
--text-secondary: #6b7280;  /* 次要文字 */
--text-muted: #9ca3af;      /* 辅助文字 */
--text-disabled: #d1d5db;   /* 禁用文字 */

/* 背景颜色 */
--bg-primary: #ffffff;      /* 主背景 */
--bg-secondary: #f9fafb;    /* 次背景 */
--bg-tertiary: #f3f4f6;     /* 三级背景 */

/* 边框颜色 */
--border-primary: #e5e7eb;  /* 主边框 */
--border-secondary: #d1d5db; /* 次边框 */
--border-focus: #2563eb;    /* 焦点边框 */
```

---

## 📝 字体系统 / Typography

### 字体族 / Font Family
```css
/* 主要字体 - Inter (Google Fonts) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 等宽字体 - 代码和数字 */
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
```

### 字体大小 / Font Sizes
```css
/* 标题字体 */
--text-4xl: 2.25rem;        /* 36px - 页面主标题 */
--text-3xl: 1.875rem;       /* 30px - 区块标题 */
--text-2xl: 1.5rem;         /* 24px - 卡片标题 */
--text-xl: 1.25rem;         /* 20px - 小标题 */
--text-lg: 1.125rem;        /* 18px - 大正文 */

/* 正文字体 */
--text-base: 1rem;          /* 16px - 正文 */
--text-sm: 0.875rem;        /* 14px - 小正文 */
--text-xs: 0.75rem;         /* 12px - 辅助文字 */
```

### 字重 / Font Weights
```css
--font-thin: 100;           /* 极细 */
--font-light: 300;          /* 细体 */
--font-normal: 400;         /* 正常 */
--font-medium: 500;         /* 中等 */
--font-semibold: 600;       /* 半粗 */
--font-bold: 700;           /* 粗体 */
--font-extrabold: 800;      /* 极粗 */
```

### 行高 / Line Heights
```css
--leading-tight: 1.25;      /* 紧密行高 */
--leading-snug: 1.375;      /* 紧凑行高 */
--leading-normal: 1.5;      /* 正常行高 */
--leading-relaxed: 1.625;   /* 宽松行高 */
--leading-loose: 2;         /* 松散行高 */
```

---

## 📏 间距系统 / Spacing System

### 基础间距单位 / Base Spacing Unit
```css
/* 基于 4px 的间距系统 */
--space-0: 0;               /* 0px */
--space-1: 0.25rem;         /* 4px */
--space-2: 0.5rem;          /* 8px */
--space-3: 0.75rem;         /* 12px */
--space-4: 1rem;            /* 16px */
--space-5: 1.25rem;         /* 20px */
--space-6: 1.5rem;          /* 24px */
--space-8: 2rem;            /* 32px */
--space-10: 2.5rem;         /* 40px */
--space-12: 3rem;           /* 48px */
--space-16: 4rem;           /* 64px */
--space-20: 5rem;           /* 80px */
--space-24: 6rem;           /* 96px */
--space-32: 8rem;           /* 128px */
```

### 组件间距 / Component Spacing
```css
/* 卡片间距 */
--card-padding: 1.5rem;     /* 24px - 卡片内边距 */
--card-gap: 1rem;           /* 16px - 卡片间距 */
--card-margin: 0.75rem;     /* 12px - 卡片外边距 */

/* 按钮间距 */
--btn-padding-x: 1rem;      /* 16px - 按钮水平内边距 */
--btn-padding-y: 0.5rem;    /* 8px - 按钮垂直内边距 */
--btn-gap: 0.5rem;          /* 8px - 按钮内图标间距 */

/* 表单间距 */
--form-gap: 1rem;           /* 16px - 表单项间距 */
--form-padding: 1.5rem;     /* 24px - 表单内边距 */
--input-padding: 0.75rem;   /* 12px - 输入框内边距 */

/* 布局间距 */
--section-padding: 2rem;    /* 32px - 区块内边距 */
--container-padding: 1rem;  /* 16px - 容器内边距 */
--grid-gap: 1.5rem;         /* 24px - 网格间距 */
```

---

## 🧩 组件规范 / Component Specifications

### 按钮 / Buttons

#### 主要按钮 / Primary Button
```css
/* 样式 */
background: #000000;
color: #ffffff;
border: none;
border-radius: 0.5rem;      /* 8px */
padding: 0.5rem 1rem;       /* 8px 16px */
font-size: 0.875rem;        /* 14px */
font-weight: 500;
line-height: 1.25;

/* 悬停状态 */
hover: {
  background: #374151;      /* gray-700 */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 禁用状态 */
disabled: {
  background: #d1d5db;      /* gray-300 */
  color: #9ca3af;           /* gray-500 */
  cursor: not-allowed;
}
```

#### 次要按钮 / Secondary Button
```css
/* 样式 */
background: transparent;
color: #000000;
border: 1px solid #e5e7eb;  /* gray-200 */
border-radius: 0.5rem;      /* 8px */
padding: 0.5rem 1rem;       /* 8px 16px */
font-size: 0.875rem;        /* 14px */
font-weight: 500;

/* 悬停状态 */
hover: {
  background: #f9fafb;      /* gray-50 */
  border-color: #d1d5db;    /* gray-300 */
}
```

### 卡片 / Cards

#### 帖子卡片 / Post Card
```css
/* 容器 */
width: 100%;
max-width: 400px;
height: 384px;              /* 固定高度 h-96 */
background: #ffffff;
border: 1px solid #e5e7eb;  /* gray-200 */
border-radius: 0.75rem;     /* 12px */
overflow: hidden;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* 内边距 */
padding: 1.5rem;            /* 24px */

/* 悬停效果 */
hover: {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}
```

#### 卡片内容布局 / Card Content Layout
```css
/* 卡片容器 */
display: flex;
flex-direction: column;
height: 100%;

/* 内容区域 */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;             /* 12px */
}

/* 标题 */
.title {
  font-size: 1.125rem;      /* 18px */
  font-weight: 600;
  line-height: 1.25;
  color: #000000;
  margin-bottom: 0.5rem;    /* 8px */
}

/* 描述 */
.description {
  font-size: 0.875rem;      /* 14px */
  color: #6b7280;           /* gray-600 */
  line-height: 1.5;
  margin-bottom: 1rem;      /* 16px */
}

/* 标签区域 */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;              /* 8px */
  margin-bottom: 1rem;      /* 16px */
}

/* 统计区域 */
.stats {
  margin-top: auto;
  padding-top: 1rem;        /* 16px */
  border-top: 1px solid #f3f4f6; /* gray-100 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 输入框 / Input Fields

#### 文本输入框 / Text Input
```css
/* 基础样式 */
width: 100%;
padding: 0.75rem;           /* 12px */
border: 1px solid #d1d5db;  /* gray-300 */
border-radius: 0.5rem;      /* 8px */
font-size: 0.875rem;        /* 14px */
background: #ffffff;
color: #000000;

/* 焦点状态 */
focus: {
  outline: none;
  border-color: #2563eb;    /* blue-600 */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* 错误状态 */
error: {
  border-color: #dc2626;    /* red-600 */
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
```

### 标签 / Tags

#### 帖子标签 / Post Tags
```css
/* 基础标签 */
display: inline-flex;
align-items: center;
padding: 0.25rem 0.75rem;   /* 4px 12px */
background: #f3f4f6;        /* gray-100 */
color: #374151;             /* gray-700 */
border-radius: 9999px;      /* 完全圆角 */
font-size: 0.75rem;         /* 12px */
font-weight: 500;
text-decoration: none;

/* 悬停状态 */
hover: {
  background: #e5e7eb;      /* gray-200 */
  color: #111827;           /* gray-900 */
}

/* 蓝色标签 (Post类型) */
.tag-blue {
  background: #dbeafe;      /* blue-100 */
  color: #1d4ed8;          /* blue-700 */
}

/* 绿色标签 (Prompt类型) */
.tag-green {
  background: #dcfce7;      /* green-100 */
  color: #166534;          /* green-700 */
}

/* 紫色标签 (Event类型) */
.tag-purple {
  background: #f3e8ff;      /* purple-100 */
  color: #7c3aed;          /* purple-700 */
}
```

---

## 📐 布局规范 / Layout Specifications

### 网格系统 / Grid System
```css
/* 容器 */
.container {
  max-width: 1280px;        /* 最大宽度 */
  margin: 0 auto;
  padding: 0 1rem;          /* 16px 水平内边距 */
}

/* 网格布局 */
.grid {
  display: grid;
  gap: 1.5rem;              /* 24px 网格间距 */
}

/* 响应式网格 */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* 响应式断点 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 侧边栏布局 / Sidebar Layout
```css
/* 主容器 */
.main-container {
  display: flex;
  min-height: 100vh;
  background: #ffffff;
}

/* 侧边栏 */
.sidebar {
  width: 16rem;             /* 256px 固定宽度 */
  background: #ffffff;
  border-right: 1px solid #e5e7eb; /* gray-200 */
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 10;
}

/* 主内容区 */
.main-content {
  margin-left: 16rem;       /* 256px 为侧边栏让出空间 */
  flex: 1;
  overflow-y: auto;
  height: 100vh;
}
```

### 页面布局 / Page Layout
```css
/* 页面容器 */
.page-container {
  max-width: 7xl;           /* 1280px */
  margin: 0 auto;
  padding: 2rem;            /* 32px */
}

/* 页面标题 */
.page-title {
  font-size: 2.25rem;       /* 36px */
  font-weight: 700;
  color: #000000;
  margin-bottom: 2rem;      /* 32px */
}

/* 页面内容 */
.page-content {
  display: grid;
  gap: 1.5rem;              /* 24px */
}
```

---

## 🎨 Figma设计指南 / Figma Design Guide

### 创建Figma文件 / Creating Figma File

#### 1. 设置画板 / Canvas Setup
```
画板尺寸 / Artboard Size: 1440px × 1024px (桌面)
移动端画板 / Mobile Artboard: 375px × 812px
平板画板 / Tablet Artboard: 768px × 1024px
```

#### 2. 颜色样式 / Color Styles
在Figma中创建以下颜色样式：

**主色调 / Primary Colors**
- `Black`: #000000
- `Gray-900`: #111827
- `Gray-800`: #1f2937
- `Gray-700`: #374151
- `Gray-600`: #4b5563
- `Gray-500`: #6b7280
- `Gray-400`: #9ca3af
- `Gray-300`: #d1d5db
- `Gray-200`: #e5e7eb
- `Gray-100`: #f3f4f6
- `Gray-50`: #f9fafb
- `White`: #ffffff

**功能色 / Functional Colors**
- `Blue-600`: #2563eb
- `Blue-500`: #3b82f6
- `Green-600`: #16a34a
- `Red-600`: #dc2626
- `Yellow-500`: #eab308
- `Purple-600`: #9333ea

#### 3. 文字样式 / Text Styles

**标题样式 / Heading Styles**
- `Heading-1`: Inter Bold, 36px, Line Height 1.25
- `Heading-2`: Inter Semibold, 30px, Line Height 1.25
- `Heading-3`: Inter Semibold, 24px, Line Height 1.25
- `Heading-4`: Inter Semibold, 20px, Line Height 1.25

**正文样式 / Body Text Styles**
- `Body-Large`: Inter Regular, 18px, Line Height 1.5
- `Body-Regular`: Inter Regular, 16px, Line Height 1.5
- `Body-Small`: Inter Regular, 14px, Line Height 1.5
- `Caption`: Inter Regular, 12px, Line Height 1.5

#### 4. 组件库 / Component Library

**按钮组件 / Button Components**
```
Primary Button:
- 背景: Black (#000000)
- 文字: White (#ffffff)
- 圆角: 8px
- 内边距: 8px 16px
- 字体: Inter Medium 14px

Secondary Button:
- 背景: Transparent
- 边框: Gray-200 (#e5e7eb)
- 文字: Black (#000000)
- 圆角: 8px
- 内边距: 8px 16px
```

**卡片组件 / Card Components**
```
Post Card:
- 宽度: 400px
- 高度: 384px
- 背景: White (#ffffff)
- 边框: Gray-200 (#e5e7eb)
- 圆角: 12px
- 内边距: 24px
- 阴影: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### 5. 间距系统 / Spacing System
在Figma中使用以下间距值：
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

#### 6. 图标规范 / Icon Specifications
- 使用Lucide React图标库
- 标准尺寸: 16px, 20px, 24px
- 颜色: 继承父元素颜色或使用Gray-500
- 描边宽度: 1.5px

### 设计检查清单 / Design Checklist

#### 颜色使用 / Color Usage
- [ ] 主要文字使用Black (#000000)
- [ ] 次要文字使用Gray-600 (#4b5563)
- [ ] 辅助文字使用Gray-500 (#6b7280)
- [ ] 链接使用Blue-600 (#2563eb)
- [ ] 错误状态使用Red-600 (#dc2626)

#### 间距使用 / Spacing Usage
- [ ] 卡片内边距使用24px
- [ ] 卡片间距使用16px
- [ ] 表单项间距使用16px
- [ ] 页面内边距使用32px
- [ ] 网格间距使用24px

#### 字体使用 / Typography Usage
- [ ] 页面标题使用Heading-1 (36px Bold)
- [ ] 卡片标题使用Heading-3 (24px Semibold)
- [ ] 正文使用Body-Regular (16px Regular)
- [ ] 辅助文字使用Body-Small (14px Regular)
- [ ] 标签使用Caption (12px Regular)

#### 组件使用 / Component Usage
- [ ] 按钮使用统一的圆角和内边距
- [ ] 卡片使用固定的高度和阴影
- [ ] 输入框使用统一的边框和焦点状态
- [ ] 标签使用圆角胶囊形状

---

## 📱 响应式设计 / Responsive Design

### 断点设置 / Breakpoints
```css
/* 移动端 */
@media (max-width: 639px) {
  .container { padding: 1rem; }
  .grid { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .main-content { margin-left: 0; }
}

/* 平板端 */
@media (min-width: 640px) and (max-width: 1023px) {
  .container { padding: 1.5rem; }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .sidebar { width: 12rem; }
  .main-content { margin-left: 12rem; }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .container { padding: 2rem; }
  .grid { grid-template-columns: repeat(3, 1fr); }
  .sidebar { width: 16rem; }
  .main-content { margin-left: 16rem; }
}
```

### 移动端适配 / Mobile Adaptations
- 侧边栏改为底部导航
- 卡片改为单列布局
- 按钮高度增加到44px（触摸友好）
- 文字大小适当增大
- 间距适当增加

---

## 🎯 设计工具推荐 / Design Tools

### Figma插件 / Figma Plugins
1. **Auto Layout** - 自动布局
2. **Content Reel** - 内容填充
3. **Figma to Code** - 代码生成
4. **Color Palettes** - 颜色管理
5. **Iconify** - 图标库

### 设计资源 / Design Resources
1. **Lucide Icons** - [lucide.dev](https://lucide.dev)
2. **Inter Font** - [rsms.me/inter](https://rsms.me/inter)
3. **Tailwind Colors** - [tailwindcss.com/docs/customizing-colors](https://tailwindcss.com/docs/customizing-colors)
4. **Figma Community** - [figma.com/community](https://figma.com/community)

---

## 📋 设计交付清单 / Design Handoff Checklist

### 开发前准备 / Pre-Development
- [ ] 所有颜色样式已定义
- [ ] 所有文字样式已创建
- [ ] 组件库已建立
- [ ] 间距系统已规范
- [ ] 响应式断点已设置

### 设计审查 / Design Review
- [ ] 视觉一致性检查
- [ ] 交互状态完整
- [ ] 错误状态设计
- [ ] 加载状态设计
- [ ] 空状态设计

### 开发协作 / Development Collaboration
- [ ] 设计规范文档完整
- [ ] 切图资源准备
- [ ] 图标资源准备
- [ ] 字体文件准备
- [ ] 设计标注清晰

---

**这个设计规范文档将帮助你：**
- 🎨 在Figma中创建一致的设计
- 🔧 与开发团队高效协作
- 📱 确保响应式设计的一致性
- 🚀 快速迭代和扩展功能

**记住：设计规范是活的文档，随着项目发展需要持续更新和完善！** ✨
