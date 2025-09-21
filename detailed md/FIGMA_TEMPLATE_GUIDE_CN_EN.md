# AI Community MVP v2 - Figma设计模板指南 / Figma Template Guide

**Copyright (c) 2025 Designer: Qingyu Cao**  
**All rights reserved.**

## 🎨 Figma文件设置 / Figma File Setup

### 1. 创建新文件 / Create New File
1. 打开Figma
2. 点击 "New file"
3. 命名: "AI Community MVP v2 - Design System"

### 2. 画板设置 / Artboard Setup
创建以下画板：
- **Desktop**: 1440px × 1024px
- **Tablet**: 768px × 1024px  
- **Mobile**: 375px × 812px

---

## 🎨 颜色样式设置 / Color Styles Setup

### 在Figma中创建颜色样式：

#### 主色调 / Primary Colors
```
Black: #000000
Gray-900: #111827
Gray-800: #1f2937
Gray-700: #374151
Gray-600: #4b5563
Gray-500: #6b7280
Gray-400: #9ca3af
Gray-300: #d1d5db
Gray-200: #e5e7eb
Gray-100: #f3f4f6
Gray-50: #f9fafb
White: #ffffff
```

#### 功能色 / Functional Colors
```
Blue-600: #2563eb
Blue-500: #3b82f6
Blue-400: #60a5fa
Green-600: #16a34a
Green-500: #22c55e
Red-600: #dc2626
Red-500: #ef4444
Yellow-500: #eab308
Purple-600: #9333ea
Purple-500: #a855f7
```

---

## 📝 文字样式设置 / Text Styles Setup

### 在Figma中创建文字样式：

#### 标题样式 / Heading Styles
```
H1 - Page Title:
- Font: Inter Bold
- Size: 36px
- Line Height: 45px (1.25)
- Color: Black (#000000)

H2 - Section Title:
- Font: Inter Semibold
- Size: 30px
- Line Height: 37.5px (1.25)
- Color: Black (#000000)

H3 - Card Title:
- Font: Inter Semibold
- Size: 24px
- Line Height: 30px (1.25)
- Color: Black (#000000)

H4 - Subtitle:
- Font: Inter Semibold
- Size: 20px
- Line Height: 25px (1.25)
- Color: Black (#000000)
```

#### 正文样式 / Body Text Styles
```
Body Large:
- Font: Inter Regular
- Size: 18px
- Line Height: 27px (1.5)
- Color: Black (#000000)

Body Regular:
- Font: Inter Regular
- Size: 16px
- Line Height: 24px (1.5)
- Color: Black (#000000)

Body Small:
- Font: Inter Regular
- Size: 14px
- Line Height: 21px (1.5)
- Color: Gray-600 (#4b5563)

Caption:
- Font: Inter Regular
- Size: 12px
- Line Height: 18px (1.5)
- Color: Gray-500 (#6b7280)
```

---

## 🧩 组件设计规范 / Component Design Specifications

### 1. 按钮组件 / Button Components

#### 主要按钮 / Primary Button
```
尺寸 / Dimensions:
- 高度: 40px
- 最小宽度: 120px
- 内边距: 8px 16px

样式 / Style:
- 背景: Black (#000000)
- 文字: White (#ffffff)
- 圆角: 8px
- 字体: Inter Medium 14px
- 边框: None

悬停状态 / Hover State:
- 背景: Gray-700 (#374151)
- 变换: translateY(-1px)
- 阴影: 0 4px 12px rgba(0, 0, 0, 0.15)
```

#### 次要按钮 / Secondary Button
```
尺寸 / Dimensions:
- 高度: 40px
- 最小宽度: 120px
- 内边距: 8px 16px

样式 / Style:
- 背景: Transparent
- 文字: Black (#000000)
- 圆角: 8px
- 字体: Inter Medium 14px
- 边框: 1px solid Gray-200 (#e5e7eb)

悬停状态 / Hover State:
- 背景: Gray-50 (#f9fafb)
- 边框: 1px solid Gray-300 (#d1d5db)
```

### 2. 卡片组件 / Card Components

#### 帖子卡片 / Post Card
```
尺寸 / Dimensions:
- 宽度: 400px
- 高度: 384px (固定高度)
- 内边距: 24px

样式 / Style:
- 背景: White (#ffffff)
- 边框: 1px solid Gray-200 (#e5e7eb)
- 圆角: 12px
- 阴影: 0 1px 3px rgba(0, 0, 0, 0.1)

悬停状态 / Hover State:
- 变换: translateY(-2px)
- 阴影: 0 4px 12px rgba(0, 0, 0, 0.15)
- 过渡: all 0.2s ease
```

#### 卡片内容布局 / Card Content Layout
```
标题区域 / Title Area:
- 高度: 54px (3行文字)
- 字体: H3 (24px Semibold)
- 颜色: Black (#000000)
- 行高: 1.25
- 截断: 显示2行，超出显示...

描述区域 / Description Area:
- 高度: 63px (3行文字)
- 字体: Body Small (14px Regular)
- 颜色: Gray-600 (#4b5563)
- 行高: 1.5
- 截断: 显示3行，超出显示...

标签区域 / Tags Area:
- 高度: 32px
- 间距: 8px
- 标签样式: 见标签组件

统计区域 / Stats Area:
- 高度: 48px
- 上边框: 1px solid Gray-100 (#f3f4f6)
- 内边距: 16px 0 0 0
- 布局: 左右分布
```

### 3. 标签组件 / Tag Components

#### 基础标签 / Base Tag
```
尺寸 / Dimensions:
- 高度: 24px
- 内边距: 4px 12px
- 圆角: 12px (完全圆角)

样式 / Style:
- 背景: Gray-100 (#f3f4f6)
- 文字: Gray-700 (#374151)
- 字体: Inter Medium 12px
- 边框: None

悬停状态 / Hover State:
- 背景: Gray-200 (#e5e7eb)
- 文字: Gray-900 (#111827)
```

#### 特殊标签 / Special Tags
```
蓝色标签 (Post类型):
- 背景: Blue-100 (#dbeafe)
- 文字: Blue-700 (#1d4ed8)

绿色标签 (Prompt类型):
- 背景: Green-100 (#dcfce7)
- 文字: Green-700 (#166534)

紫色标签 (Event类型):
- 背景: Purple-100 (#f3e8ff)
- 文字: Purple-700 (#7c3aed)
```

### 4. 输入框组件 / Input Components

#### 文本输入框 / Text Input
```
尺寸 / Dimensions:
- 高度: 40px
- 内边距: 12px
- 圆角: 8px

样式 / Style:
- 背景: White (#ffffff)
- 文字: Black (#000000)
- 字体: Inter Regular 14px
- 边框: 1px solid Gray-300 (#d1d5db)

焦点状态 / Focus State:
- 边框: 1px solid Blue-600 (#2563eb)
- 阴影: 0 0 0 3px rgba(37, 99, 235, 0.1)
- 轮廓: None

错误状态 / Error State:
- 边框: 1px solid Red-600 (#dc2626)
- 阴影: 0 0 0 3px rgba(220, 38, 38, 0.1)
```

### 5. 侧边栏组件 / Sidebar Component

#### 侧边栏布局 / Sidebar Layout
```
尺寸 / Dimensions:
- 宽度: 256px (桌面) / 200px (平板)
- 高度: 100vh
- 背景: White (#ffffff)

样式 / Style:
- 边框: 1px solid Gray-200 (#e5e7eb) (右侧)
- 阴影: 2px 0 4px rgba(0, 0, 0, 0.05)
- 内边距: 24px 16px

导航项 / Navigation Items:
- 高度: 48px
- 内边距: 12px 16px
- 圆角: 8px
- 字体: Inter Medium 14px
- 间距: 4px

悬停状态 / Hover State:
- 背景: Gray-50 (#f9fafb)
- 颜色: Black (#000000)
```

---

## 📐 布局网格系统 / Layout Grid System

### 桌面端网格 / Desktop Grid
```
容器宽度: 1280px
列数: 12列
列宽: 80px
间距: 24px
边距: 32px
```

### 平板端网格 / Tablet Grid
```
容器宽度: 768px
列数: 8列
列宽: 72px
间距: 16px
边距: 24px
```

### 移动端网格 / Mobile Grid
```
容器宽度: 375px
列数: 4列
列宽: 72px
间距: 12px
边距: 16px
```

---

## 🎯 页面设计模板 / Page Design Templates

### 1. 首页设计 / Homepage Design

#### 桌面端布局 / Desktop Layout
```
顶部区域 / Top Section:
- 高度: 120px
- 背景: White (#ffffff)
- 内边距: 32px
- 内容: Logo + 搜索框 + 用户头像

主要内容区 / Main Content:
- 内边距: 32px
- 网格: 3列布局
- 卡片间距: 24px

侧边栏 / Sidebar:
- 宽度: 256px
- 位置: 左侧固定
```

#### 移动端布局 / Mobile Layout
```
顶部区域 / Top Section:
- 高度: 80px
- 背景: White (#ffffff)
- 内边距: 16px
- 内容: Logo + 菜单按钮

主要内容区 / Main Content:
- 内边距: 16px
- 网格: 1列布局
- 卡片间距: 16px

底部导航 / Bottom Navigation:
- 高度: 80px
- 背景: White (#ffffff)
- 边框: 1px solid Gray-200 (顶部)
```

### 2. 帖子详情页设计 / Post Detail Design

#### 页面布局 / Page Layout
```
头部 / Header:
- 高度: 80px
- 背景: White (#ffffff)
- 内容: 返回按钮 + 标题 + 操作按钮

内容区 / Content:
- 最大宽度: 800px
- 内边距: 32px
- 背景: White (#ffffff)
- 圆角: 12px
- 阴影: 0 1px 3px rgba(0, 0, 0, 0.1)

侧边栏 / Sidebar:
- 宽度: 300px
- 内容: 相关帖子 + 作者信息
```

---

## 🔧 Figma使用技巧 / Figma Tips

### 1. 组件创建 / Component Creation
1. 创建基础组件
2. 设置变体 (Variants)
3. 添加自动布局 (Auto Layout)
4. 设置约束 (Constraints)

### 2. 样式管理 / Style Management
1. 创建颜色样式
2. 创建文字样式
3. 创建效果样式 (Effects)
4. 组织样式库

### 3. 自动布局 / Auto Layout
```
设置自动布局:
- 方向: Vertical/Horizontal
- 间距: 8px, 16px, 24px
- 内边距: 12px, 16px, 24px
- 对齐: 左对齐/居中对齐
```

### 4. 约束设置 / Constraints
```
约束规则:
- 顶部/左侧: 固定位置
- 右侧/底部: 拉伸填充
- 中心: 居中对齐
- 缩放: 按比例缩放
```

---

## 📱 响应式设计检查 / Responsive Design Checklist

### 桌面端 (1440px+) / Desktop (1440px+)
- [ ] 3列网格布局
- [ ] 侧边栏宽度256px
- [ ] 卡片宽度400px
- [ ] 内边距32px

### 平板端 (768px-1439px) / Tablet (768px-1439px)
- [ ] 2列网格布局
- [ ] 侧边栏宽度200px
- [ ] 卡片宽度350px
- [ ] 内边距24px

### 移动端 (375px-767px) / Mobile (375px-767px)
- [ ] 1列网格布局
- [ ] 隐藏侧边栏
- [ ] 卡片宽度100%
- [ ] 内边距16px

---

## 🎨 设计资源下载 / Design Resources

### 图标资源 / Icon Resources
- **Lucide Icons**: [lucide.dev](https://lucide.dev)
- **Heroicons**: [heroicons.com](https://heroicons.com)
- **Feather Icons**: [feathericons.com](https://feathericons.com)

### 字体资源 / Font Resources
- **Inter Font**: [rsms.me/inter](https://rsms.me/inter)
- **Google Fonts**: [fonts.google.com](https://fonts.google.com)

### 图片资源 / Image Resources
- **Unsplash**: [unsplash.com](https://unsplash.com)
- **Pexels**: [pexels.com](https://pexels.com)
- **Dicebear Avatars**: [dicebear.com](https://dicebear.com)

---

## 📋 设计交付清单 / Design Handoff Checklist

### 设计文件准备 / Design File Preparation
- [ ] 所有页面设计完成
- [ ] 组件库建立完整
- [ ] 颜色样式定义
- [ ] 文字样式定义
- [ ] 响应式断点设置

### 开发标注 / Development Annotations
- [ ] 尺寸标注清晰
- [ ] 间距标注准确
- [ ] 颜色值标注
- [ ] 字体信息标注
- [ ] 交互状态说明

### 资源导出 / Asset Export
- [ ] 图标SVG导出
- [ ] 图片资源导出
- [ ] 字体文件准备
- [ ] 切图资源准备

---

**使用这个指南，你可以在Figma中完美复现AI社区的设计！** 🎨✨

**记住：保持设计的一致性，让每个像素都有意义！** 💎
