# AI Community MVP v2 - 信息架构 / Information Architecture

## 🏗️ 整体架构概览 / Overall Architecture Overview

### 系统架构 / System Architecture

```
AI Community MVP v2
├── 前端层 (Frontend Layer)
│   ├── Next.js 14 App Router
│   ├── React 18 Components
│   ├── TypeScript Type System
│   └── Tailwind CSS Styling
│
├── 数据层 (Data Layer)
│   ├── localStorage Client Storage
│   ├── Initial Data Management
│   ├── User Data Persistence
│   └── Post Data Management
│
├── 业务逻辑层 (Business Logic Layer)
│   ├── Storage Service
│   ├── Post Management
│   ├── User Management
│   └── Voting System
│
└── 表示层 (Presentation Layer)
    ├── Page Components
    ├── Form Components
    ├── UI Components
    └── Layout Components
```

## 📁 内容组织结构 / Content Organization Structure

### 主要内容类型 / Main Content Types

```
内容类型层次 (Content Type Hierarchy)
├── 用户生成内容 (User Generated Content)
│   ├── 帖子 (Posts)
│   │   ├── Share Chat & Thoughts
│   │   ├── Share Prompt
│   │   └── Community Event
│   ├── 评论 (Comments)
│   ├── 投票 (Votes)
│   └── 书签 (Bookmarks)
│
├── 系统内容 (System Content)
│   ├── 用户信息 (User Information)
│   ├── 统计数据 (Statistics)
│   ├── 配置数据 (Configuration)
│   └── 缓存数据 (Cache Data)
│
└── 元数据 (Metadata)
    ├── 标签 (Tags)
    ├── 分类 (Categories)
    ├── 时间戳 (Timestamps)
    └── 状态信息 (Status Information)
```

### 数据模型关系 / Data Model Relationships

```
数据关系图 (Data Relationship Diagram)
Post (帖子)
├── 1:N → Comment (评论)
├── 1:N → Vote (投票)
├── 1:1 → Author (作者)
├── N:M → Tags (标签)
└── 1:1 → VotingStats (投票统计)

User (用户)
├── 1:N → Post (发布的帖子)
├── N:M → BookmarkedPosts (收藏的帖子)
├── 1:1 → AI Coins (积分)
└── 1:N → Vote (投票记录)

Tag (标签)
├── N:M → Post (帖子)
└── 1:N → Category (分类)

Vote (投票)
├── N:1 → Post (帖子)
├── N:1 → User (用户)
└── 1:1 → UseCase (使用场景)
```

## 🗂️ 文件组织结构 / File Organization Structure

### 页面路由结构 / Page Route Structure

```
app/ (页面路由)
├── page.tsx (首页)
├── layout.tsx (根布局)
├── globals.css (全局样式)
│
├── bookmarks/ (书签页面)
│   └── page.tsx
│
├── guide/ (新手指南)
│   └── page.tsx
│
├── my-posts/ (我的发布)
│   └── page.tsx
│
├── safety/ (社区安全)
│   └── page.tsx
│
├── trending/ (热门内容)
│   └── page.tsx
│
└── post/ (帖子相关)
    ├── [id]/ (动态路由 - 帖子详情)
    │   └── page.tsx
    └── new/ (创建新帖子)
        └── page.tsx
```

### 组件组织结构 / Component Organization Structure

```
components/ (组件库)
├── AppLayout.tsx (应用主布局)
├── Sidebar.tsx (侧边栏)
├── NewPostDropdown.tsx (新帖子下拉菜单)
├── PostTypeSelector.tsx (帖子类型选择器)
├── VoteModal.tsx (投票弹窗)
├── VotingDisplay.tsx (投票显示)
│
├── forms/ (表单组件)
│   ├── ShareChatThoughtsForm.tsx
│   ├── SharePromptForm.tsx
│   └── CommunityPostForm.tsx
│
└── ui/ (基础UI组件)
    ├── Button.tsx
    ├── Input.tsx
    ├── Modal.tsx
    └── Card.tsx
```

### 数据层组织结构 / Data Layer Organization Structure

```
lib/ (数据层)
├── storage.ts (数据存储服务)
│   ├── StorageService class
│   ├── Post management methods
│   ├── User management methods
│   ├── Bookmark management methods
│   └── Vote management methods
│
├── initialData.ts (初始数据)
│   ├── initialPosts array
│   ├── initialUsers array
│   ├── getRandomRecentTime function
│   └── Data generation helpers
│
└── utils.ts (工具函数)
    ├── Date formatting
    ├── String utilities
    ├── Validation helpers
    └── Common functions
```

## 🏷️ 标签和分类系统 / Tag and Classification System

### 标签层次结构 / Tag Hierarchy Structure

```
标签体系 (Tag System)
├── 技术标签 (Technical Tags)
│   ├── AI工具 (AI Tools)
│   │   ├── ChatGPT
│   │   ├── Claude
│   │   ├── Midjourney
│   │   └── DALL-E
│   ├── 编程语言 (Programming Languages)
│   │   ├── Python
│   │   ├── JavaScript
│   │   ├── TypeScript
│   │   └── Go
│   ├── 框架技术 (Framework Technologies)
│   │   ├── React
│   │   ├── Next.js
│   │   ├── Vue.js
│   │   └── Angular
│   └── 开发工具 (Development Tools)
│       ├── VS Code
│       ├── Git
│       ├── Docker
│       └── Kubernetes
│
├── 领域标签 (Domain Tags)
│   ├── 商业 (Business)
│   │   ├── 营销 (Marketing)
│   │   ├── 销售 (Sales)
│   │   ├── 管理 (Management)
│   │   └── 创业 (Entrepreneurship)
│   ├── 教育 (Education)
│   │   ├── 学习 (Learning)
│   │   ├── 教学 (Teaching)
│   │   ├── 研究 (Research)
│   │   └── 培训 (Training)
│   ├── 创意 (Creative)
│   │   ├── 设计 (Design)
│   │   ├── 写作 (Writing)
│   │   ├── 艺术 (Art)
│   │   └── 音乐 (Music)
│   └── 科研 (Research)
│       ├── 学术 (Academic)
│       ├── 实验 (Experimental)
│       ├── 分析 (Analysis)
│       └── 发现 (Discovery)
│
├── 难度标签 (Difficulty Tags)
│   ├── 初学者 (Beginner)
│   ├── 中级 (Intermediate)
│   └── 高级 (Advanced)
│
└── 状态标签 (Status Tags)
    ├── 热门 (Trending)
    ├── 最新 (Latest)
    ├── 推荐 (Recommended)
    ├── 精华 (Featured)
    └── 已解决 (Solved)
```

### 分类规则 / Classification Rules

```
分类规则 (Classification Rules)
├── 自动分类 (Automatic Classification)
│   ├── 基于内容类型 (Based on Content Type)
│   ├── 基于关键词 (Based on Keywords)
│   ├── 基于用户行为 (Based on User Behavior)
│   └── 基于时间戳 (Based on Timestamps)
│
├── 手动分类 (Manual Classification)
│   ├── 用户选择标签 (User Selected Tags)
│   ├── 管理员审核 (Admin Review)
│   ├── 社区投票 (Community Voting)
│   └── 专家推荐 (Expert Recommendation)
│
└── 混合分类 (Hybrid Classification)
    ├── 机器学习辅助 (ML Assisted)
    ├── 用户反馈优化 (User Feedback Optimization)
    ├── 动态调整 (Dynamic Adjustment)
    └── 持续学习 (Continuous Learning)
```

## 🔍 搜索和发现系统 / Search and Discovery System

### 搜索层次结构 / Search Hierarchy Structure

```
搜索系统 (Search System)
├── 基础搜索 (Basic Search)
│   ├── 关键词搜索 (Keyword Search)
│   │   ├── 标题搜索 (Title Search)
│   │   ├── 内容搜索 (Content Search)
│   │   └── 标签搜索 (Tag Search)
│   ├── 类型过滤 (Type Filtering)
│   │   ├── Chat Sharing
│   │   ├── Prompt Sharing
│   │   └── Community Event
│   └── 时间过滤 (Time Filtering)
│       ├── 今天 (Today)
│       ├── 本周 (This Week)
│       ├── 本月 (This Month)
│       └── 自定义 (Custom)
│
├── 高级搜索 (Advanced Search)
│   ├── 多条件组合 (Multi-condition Combination)
│   ├── 布尔搜索 (Boolean Search)
│   ├── 模糊匹配 (Fuzzy Matching)
│   └── 语义搜索 (Semantic Search)
│
├── 智能推荐 (Intelligent Recommendation)
│   ├── 基于内容 (Content-based)
│   ├── 基于用户 (User-based)
│   ├── 基于协同过滤 (Collaborative Filtering)
│   └── 基于热度 (Popularity-based)
│
└── 个性化搜索 (Personalized Search)
    ├── 用户偏好 (User Preferences)
    ├── 浏览历史 (Browsing History)
    ├── 收藏记录 (Bookmark History)
    └── 互动记录 (Interaction History)
```

### 搜索结果组织 / Search Results Organization

```
搜索结果结构 (Search Results Structure)
├── 排序规则 (Sorting Rules)
│   ├── 相关性排序 (Relevance Sorting)
│   ├── 时间排序 (Time Sorting)
│   ├── 热度排序 (Popularity Sorting)
│   └── 用户评分排序 (User Rating Sorting)
│
├── 结果分组 (Result Grouping)
│   ├── 按类型分组 (Group by Type)
│   ├── 按标签分组 (Group by Tag)
│   ├── 按时间分组 (Group by Time)
│   └── 按作者分组 (Group by Author)
│
├── 结果过滤 (Result Filtering)
│   ├── 动态过滤 (Dynamic Filtering)
│   ├── 范围过滤 (Range Filtering)
│   ├── 多选过滤 (Multi-select Filtering)
│   └── 排除过滤 (Exclusion Filtering)
│
└── 结果展示 (Result Display)
    ├── 列表视图 (List View)
    ├── 网格视图 (Grid View)
    ├── 卡片视图 (Card View)
    └── 详细视图 (Detail View)
```

## 🎯 用户权限和访问控制 / User Permissions and Access Control

### 权限层次结构 / Permission Hierarchy Structure

```
权限体系 (Permission System)
├── 公开访问 (Public Access)
│   ├── 浏览内容 (Browse Content)
│   ├── 搜索功能 (Search Function)
│   ├── 查看详情 (View Details)
│   └── 基础统计 (Basic Statistics)
│
├── 注册用户权限 (Registered User Permissions)
│   ├── 所有公开权限 (All Public Permissions)
│   ├── 发布内容 (Publish Content)
│   ├── 互动功能 (Interaction Features)
│   │   ├── 点赞 (Like)
│   │   ├── 评论 (Comment)
│   │   ├── 收藏 (Bookmark)
│   │   └── 投票 (Vote)
│   ├── 个人中心 (Personal Center)
│   │   ├── 我的发布 (My Posts)
│   │   ├── 我的收藏 (My Bookmarks)
│   │   └── 我的设置 (My Settings)
│   └── 消息系统 (Message System)
│       ├── 接收通知 (Receive Notifications)
│       ├── 发送消息 (Send Messages)
│       └── 管理订阅 (Manage Subscriptions)
│
├── 高级用户权限 (Premium User Permissions)
│   ├── 所有注册用户权限 (All Registered User Permissions)
│   ├── 高级功能 (Advanced Features)
│   │   ├── 高级搜索 (Advanced Search)
│   │   ├── 数据分析 (Data Analytics)
│   │   ├── 批量操作 (Batch Operations)
│   │   └── 导出功能 (Export Functions)
│   ├── 专属内容 (Exclusive Content)
│   │   ├── 高级教程 (Advanced Tutorials)
│   │   ├── 专家内容 (Expert Content)
│   │   └── 内测功能 (Beta Features)
│   └── 优先服务 (Priority Service)
│       ├── 优先支持 (Priority Support)
│       ├── 快速响应 (Fast Response)
│       └── 专属客服 (Dedicated Support)
│
└── 管理员权限 (Admin Permissions)
    ├── 所有高级用户权限 (All Premium User Permissions)
    ├── 内容管理 (Content Management)
    │   ├── 审核内容 (Review Content)
    │   ├── 删除内容 (Delete Content)
    │   ├── 置顶内容 (Pin Content)
    │   └── 推荐内容 (Recommend Content)
    ├── 用户管理 (User Management)
    │   ├── 用户审核 (User Review)
    │   ├── 权限管理 (Permission Management)
    │   ├── 封禁用户 (Ban Users)
    │   └── 数据导出 (Data Export)
    └── 系统管理 (System Management)
        ├── 系统配置 (System Configuration)
        ├── 数据备份 (Data Backup)
        ├── 性能监控 (Performance Monitoring)
        └── 日志管理 (Log Management)
```

### 数据访问控制 / Data Access Control

```
数据访问控制 (Data Access Control)
├── 数据分类 (Data Classification)
│   ├── 公开数据 (Public Data)
│   │   ├── 帖子内容 (Post Content)
│   │   ├── 公开评论 (Public Comments)
│   │   └── 统计数据 (Statistics)
│   ├── 私有数据 (Private Data)
│   │   ├── 用户信息 (User Information)
│   │   ├── 个人设置 (Personal Settings)
│   │   └── 收藏记录 (Bookmark Records)
│   └── 敏感数据 (Sensitive Data)
│       ├── 密码信息 (Password Information)
│       ├── 支付信息 (Payment Information)
│       └── 隐私设置 (Privacy Settings)
│
├── 访问规则 (Access Rules)
│   ├── 基于角色 (Role-based)
│   ├── 基于属性 (Attribute-based)
│   ├── 基于时间 (Time-based)
│   └── 基于位置 (Location-based)
│
└── 安全措施 (Security Measures)
    ├── 数据加密 (Data Encryption)
    ├── 访问日志 (Access Logging)
    ├── 异常检测 (Anomaly Detection)
    └── 定期审计 (Regular Auditing)
```

## 📊 数据流和状态管理 / Data Flow and State Management

### 数据流架构 / Data Flow Architecture

```
数据流 (Data Flow)
├── 用户输入 (User Input)
│   ├── 表单提交 (Form Submission)
│   ├── 搜索查询 (Search Query)
│   ├── 交互操作 (Interaction Actions)
│   └── 设置更改 (Setting Changes)
│
├── 数据处理 (Data Processing)
│   ├── 输入验证 (Input Validation)
│   ├── 数据转换 (Data Transformation)
│   ├── 业务逻辑 (Business Logic)
│   └── 权限检查 (Permission Check)
│
├── 数据存储 (Data Storage)
│   ├── 本地存储 (Local Storage)
│   ├── 内存缓存 (Memory Cache)
│   ├── 状态管理 (State Management)
│   └── 数据持久化 (Data Persistence)
│
└── 数据展示 (Data Display)
    ├── 组件渲染 (Component Rendering)
    ├── 状态更新 (State Updates)
    ├── 用户反馈 (User Feedback)
    └── 错误处理 (Error Handling)
```

### 状态管理层次 / State Management Hierarchy

```
状态管理 (State Management)
├── 全局状态 (Global State)
│   ├── 用户信息 (User Information)
│   ├── 应用配置 (App Configuration)
│   ├── 主题设置 (Theme Settings)
│   └── 语言设置 (Language Settings)
│
├── 页面状态 (Page State)
│   ├── 页面数据 (Page Data)
│   ├── 加载状态 (Loading State)
│   ├── 错误状态 (Error State)
│   └── 表单状态 (Form State)
│
├── 组件状态 (Component State)
│   ├── 显示状态 (Display State)
│   ├── 交互状态 (Interaction State)
│   ├── 动画状态 (Animation State)
│   └── 临时状态 (Temporary State)
│
└── 数据状态 (Data State)
    ├── 缓存状态 (Cache State)
    ├── 同步状态 (Sync State)
    ├── 版本状态 (Version State)
    └── 一致性状态 (Consistency State)
```

## 🔄 系统集成和API设计 / System Integration and API Design

### API设计原则 / API Design Principles

```
API设计 (API Design)
├── RESTful设计 (RESTful Design)
│   ├── 资源导向 (Resource-oriented)
│   ├── 无状态 (Stateless)
│   ├── 统一接口 (Uniform Interface)
│   └── 分层系统 (Layered System)
│
├── 数据格式 (Data Format)
│   ├── JSON格式 (JSON Format)
│   ├── 统一响应 (Unified Response)
│   ├── 错误处理 (Error Handling)
│   └── 版本控制 (Version Control)
│
├── 安全设计 (Security Design)
│   ├── 身份认证 (Authentication)
│   ├── 授权控制 (Authorization)
│   ├── 数据加密 (Data Encryption)
│   └── 请求限制 (Request Limiting)
│
└── 性能优化 (Performance Optimization)
    ├── 缓存策略 (Caching Strategy)
    ├── 分页处理 (Pagination)
    ├── 压缩传输 (Compression)
    └── 异步处理 (Asynchronous Processing)
```

### 外部集成 / External Integration

```
外部集成 (External Integration)
├── 第三方服务 (Third-party Services)
│   ├── 身份认证服务 (Authentication Service)
│   ├── 支付服务 (Payment Service)
│   ├── 通知服务 (Notification Service)
│   └── 分析服务 (Analytics Service)
│
├── 数据同步 (Data Synchronization)
│   ├── 实时同步 (Real-time Sync)
│   ├── 批量同步 (Batch Sync)
│   ├── 增量同步 (Incremental Sync)
│   └── 冲突解决 (Conflict Resolution)
│
└── 监控和日志 (Monitoring and Logging)
    ├── 性能监控 (Performance Monitoring)
    ├── 错误追踪 (Error Tracking)
    ├── 用户行为分析 (User Behavior Analytics)
    └── 系统日志 (System Logging)
```

---

**文档版本**: v1.0 / **Document Version**: v1.0
**最后更新**: 2024年1月 / **Last Updated**: January 2024
**状态**: 完成 / **Status**: Complete
