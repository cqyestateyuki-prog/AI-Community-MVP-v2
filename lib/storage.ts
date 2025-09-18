// lib/storage.ts
// 数据存储服务 - 使用localStorage实现数据持久化
// Data Storage Service - Implements data persistence using localStorage

import { initialPosts } from './initialData';

// 聊天片段接口 - 用于解析和存储用户与AI的对话记录
// Chat Segment Interface - For parsing and storing user-AI conversation records
export interface ChatSegment {
  id: string;
  role: 'user' | 'assistant'; // 角色：用户或AI助手
  content: string; // 对话内容
  order: number; // 对话顺序
}

// 评论接口 - 用于存储用户对帖子的评论
// Comment Interface - For storing user comments on posts
export interface Comment {
  id: string;
  author: string; // 评论作者
  content: string; // 评论内容
  createdAt: string; // 创建时间
}

// 帖子接口 - 社区的核心数据结构，支持三种发帖类型
// Post Interface - Core data structure for community, supports three post types
export interface Post {
  id: string; // 唯一标识符
  title: string; // 帖子标题
  intro?: string; // 帖子简介
  type: 'chat_sharing' | 'prompt_sharing' | 'community_event'; // 帖子类型
  author: {
    name: string; // 作者姓名
    avatar?: string; // 作者头像
  };
  segments: ChatSegment[]; // 聊天片段（用于chat_sharing类型）
  tags: string[]; // 标签数组
  likes: number; // 点赞数
  comments: Comment[]; // 评论数组
  viewCount: number; // 浏览次数
  createdAt: string; // 创建时间
  allowCopy: boolean; // 是否允许复制
  
  // Share Chat & Thoughts Form 字段
  userContent?: string; // 用户写的content/question/description
  chatHistory?: string; // 用户和GPT的聊天记录文本
  contentType?: 'text' | 'image'; // 内容类型：文字或图片
  imageFile?: File; // 上传的图片文件
  imagePreview?: string; // 图片预览URL
  
  // Share Prompt Form 字段
  promptContent?: string; // 提示词内容
  exampleOutput?: string; // 示例输出
  useCase?: string; // 使用场景
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // 难度级别
  
  // Community Event Form 字段
  eventDate?: string; // 活动日期
  eventLocation?: string; // 活动地点
  price?: string; // 价格
  link?: string; // 相关链接
  interestedCount?: number; // 感兴趣的人数
  
  // 兼容性字段
  votes?: number; // prompt_sharing类型的投票数 (old field, kept for compatibility)

  // Voting System 字段
  votingStats?: {
    totalVotes: number;
    effectiveness: number; // 1-5 scale
    workedPerfectly: number;
    workedWithTweaks: number;
    partiallyHelpful: number;
    didntWork: number;
    successRate: number; // percentage
  };
  useCaseBreakdown?: Array<{
    name: string;
    rating: number;
    percentage: number;
  }>;
}

export interface Vote {
  id: string;
  userId: string;
  postId: string;
  effectiveness: number; // 1-5 scale
  useCase?: string;
  tags?: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  aiCoins: number;
  bookmarkedPosts: string[]; // 收藏的帖子ID数组
  publishedPosts: string[]; // 发布的帖子ID数组
  createdAt: string;
}

// 存储服务类 - 管理所有数据的CRUD操作
// Storage Service Class - Manages all data CRUD operations
class StorageService {
  // localStorage键名常量
  // localStorage key constants
  private readonly POSTS_KEY = 'ai_community_posts';
  private readonly USER_KEY = 'ai_community_user';
  private readonly INIT_KEY = 'ai_community_initialized';
  private readonly VOTES_KEY = 'ai_community_votes';

  constructor() {
    this.initializeData();
  }

  // 初始化数据 - 在客户端首次加载时设置初始数据
  // Initialize data - Set initial data on first client-side load
  private initializeData() {
    if (typeof window === 'undefined') return; // 服务端渲染时跳过
    
    // 检查是否已经初始化过，避免覆盖用户数据
    // Check if already initialized to avoid overwriting user data
    const isInitialized = localStorage.getItem(this.INIT_KEY);
    if (isInitialized) {
      console.log('Data already initialized, preserving user data');
      return;
    }
    
    // 首次初始化数据
    // Initialize data for the first time
    console.log('Initializing data with', initialPosts.length, 'posts');
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(initialPosts));
    localStorage.setItem(this.INIT_KEY, 'true');
  }

  // 获取所有帖子 - 从localStorage读取帖子数据
  // Get all posts - Read post data from localStorage
  getPosts(): Post[] {
    if (typeof window === 'undefined') return []; // 服务端渲染时返回空数组
    
    try {
      const data = localStorage.getItem(this.POSTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting posts:', error);
      return [];
    }
  }

  // 获取单个帖子 - 根据ID查找特定帖子
  // Get single post - Find specific post by ID
  getPost(id: string): Post | null {
    const posts = this.getPosts();
    return posts.find(post => post.id === id) || null;
  }

  // 创建新帖子 - 添加新帖子到存储中
  // Create new post - Add new post to storage
  createPost(postData: Omit<Post, 'id' | 'createdAt' | 'viewCount' | 'likes' | 'comments'>): Post {
    const posts = this.getPosts();
    const newPost: Post = {
      ...postData,
      id: `post_${Date.now()}`, // 使用时间戳生成唯一ID
      createdAt: new Date().toISOString(), // 设置创建时间
      viewCount: 0,
      likes: 0,
      comments: [],
    };
    
    posts.unshift(newPost);
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
    
    // 将新帖子添加到用户的发布列表中
    this.addUserPublishedPost(newPost.id);
    
    return newPost;
  }

  // 更新帖子
  updatePost(id: string, updates: Partial<Post>): Post | null {
    if (typeof window === 'undefined') return null;
    
    const posts = this.getPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return null;
    
    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
    return posts[index];
  }

  // 删除帖子
  deletePost(id: string): boolean {
    if (typeof window === 'undefined') return false;
    
    const posts = this.getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) return false;
    
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(filteredPosts));
    return true;
  }

  // 增加浏览量
  incrementViewCount(id: string): void {
    const post = this.getPost(id);
    if (post) {
      this.updatePost(id, { viewCount: post.viewCount + 1 });
    }
  }

  // 点赞/取消点赞
  toggleLike(id: string): Post | null {
    const post = this.getPost(id);
    if (!post) return null;
    
    const updatedPost = this.updatePost(id, { 
      likes: post.likes + 1 
    });
    return updatedPost;
  }

  // 检查是否已点赞
  isPostLiked(id: string): boolean {
    // 简化实现，实际应该基于用户状态
    return false;
  }

  // 检查是否已投票
  isPostVoted(id: string): boolean {
    // 简化实现，实际应该基于用户状态
    return false;
  }

  // 添加评论
  addComment(postId: string, author: string, content: string): Post | null {
    const post = this.getPost(postId);
    if (!post) return null;
    
    const newComment: Comment = {
      id: `com_${Date.now()}`,
      author,
      content,
      createdAt: new Date().toISOString(),
    };
    
    const updatedPost = this.updatePost(postId, {
      comments: [...post.comments, newComment]
    });
    
    return updatedPost;
  }

  // 获取最新帖子
  getLatest(limit: number = 10): Post[] {
    const posts = this.getPosts();
    return posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  // 获取用户信息
  getCurrentUser(): User {
    if (typeof window === 'undefined') {
      return {
        id: 'demo_user',
        name: 'Demo User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
        aiCoins: 247,
        bookmarkedPosts: [],
        publishedPosts: [],
        createdAt: new Date().toISOString(),
      };
    }
    
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : {
      id: 'demo_user',
      name: 'Demo User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
      aiCoins: 247,
      bookmarkedPosts: [],
      publishedPosts: [],
      createdAt: new Date().toISOString(),
    };
  }

  // 设置用户信息
  setCurrentUser(user: Partial<User>) {
    if (typeof window === 'undefined') return;
    
    const currentUser = this.getCurrentUser();
    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
  }

  // 收藏/取消收藏帖子
  toggleBookmark(postId: string): boolean {
    if (typeof window === 'undefined') return false;
    
    const user = this.getCurrentUser();
    const isBookmarked = user.bookmarkedPosts.includes(postId);
    
    if (isBookmarked) {
      user.bookmarkedPosts = user.bookmarkedPosts.filter(id => id !== postId);
    } else {
      user.bookmarkedPosts.push(postId);
    }
    
    this.setCurrentUser(user);
    return !isBookmarked;
  }

  // 检查是否已收藏
  isBookmarked(postId: string): boolean {
    const user = this.getCurrentUser();
    return user.bookmarkedPosts.includes(postId);
  }

  // 获取收藏的帖子
  getBookmarkedPosts(): Post[] {
    const user = this.getCurrentUser();
    const allPosts = this.getPosts();
    return allPosts.filter(post => user.bookmarkedPosts.includes(post.id));
  }

  // 获取用户发布的帖子
  getUserPublishedPosts(): Post[] {
    const user = this.getCurrentUser();
    const allPosts = this.getPosts();
    return allPosts.filter(post => user.publishedPosts.includes(post.id));
  }

  // 添加用户发布的帖子
  addUserPublishedPost(postId: string) {
    const user = this.getCurrentUser();
    if (!user.publishedPosts.includes(postId)) {
      user.publishedPosts.push(postId);
      this.setCurrentUser(user);
    }
  }

  // 更新AI Coins
  updateAICoins(amount: number) {
    const user = this.getCurrentUser();
    user.aiCoins = Math.max(0, user.aiCoins + amount);
    this.setCurrentUser(user);
  }

  // 投票功能（用于prompt_sharing类型）
  votePrompt(postId: string): Post | null {
    const post = this.getPost(postId);
    if (!post || post.type !== 'prompt_sharing') return null;
    
    const updatedPost = this.updatePost(postId, {
      votes: (post.votes || 0) + 1
    });

    return updatedPost;
  }

  // 提交投票
  submitVote(postId: string, voteData: Omit<Vote, 'id' | 'userId' | 'postId' | 'createdAt'>): Post | null {
    if (typeof window === 'undefined') return null;
    
    const post = this.getPost(postId);
    if (!post || post.type !== 'prompt_sharing') return null;
    
    const userId = this.getCurrentUser().name;
    const newVote: Vote = {
      id: `vote_${Date.now()}`,
      userId,
      postId,
      ...voteData,
      createdAt: new Date().toISOString(),
    };
    
    // 保存投票
    const votes = this.getVotes();
    votes.push(newVote);
    localStorage.setItem(this.VOTES_KEY, JSON.stringify(votes));
    
    // 更新帖子投票统计
    return this.updatePostVotingStats(postId);
  }

  // 获取所有投票
  getVotes(): Vote[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.VOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting votes:', error);
      return [];
    }
  }

  // 获取帖子的投票
  getPostVotes(postId: string): Vote[] {
    return this.getVotes().filter(vote => vote.postId === postId);
  }

  // 检查用户是否已投票
  hasUserVoted(postId: string, userId: string): boolean {
    return this.getVotes().some(vote => vote.postId === postId && vote.userId === userId);
  }

  // 更新帖子的投票统计
  updatePostVotingStats(postId: string): Post | null {
    const post = this.getPost(postId);
    if (!post || post.type !== 'prompt_sharing') return null;
    
    const votes = this.getPostVotes(postId);
    
    // 如果没有新投票，保持原有统计
    if (votes.length === 0) {
      return post;
    }
    
    // 获取原有投票统计作为基础
    const existingStats = post.votingStats || {
      totalVotes: 0,
      effectiveness: 0,
      workedPerfectly: 0,
      workedWithTweaks: 0,
      partiallyHelpful: 0,
      didntWork: 0,
      successRate: 0
    };
    
    // 计算新投票的统计
    const newVotes = votes;
    const newTotalVotes = newVotes.length;
    const newEffectiveness = newVotes.reduce((sum, vote) => sum + vote.effectiveness, 0) / newTotalVotes;
    
    const newWorkedPerfectly = newVotes.filter(v => v.effectiveness === 5).length;
    const newWorkedWithTweaks = newVotes.filter(v => v.effectiveness === 4).length;
    const newPartiallyHelpful = newVotes.filter(v => v.effectiveness === 3).length;
    const newDidntWork = newVotes.filter(v => v.effectiveness <= 2).length;
    
    // 合并原有统计和新投票统计
    const totalVotes = existingStats.totalVotes + newTotalVotes;
    const effectiveness = ((existingStats.effectiveness * existingStats.totalVotes) + (newEffectiveness * newTotalVotes)) / totalVotes;
    
    const workedPerfectly = existingStats.workedPerfectly + newWorkedPerfectly;
    const workedWithTweaks = existingStats.workedWithTweaks + newWorkedWithTweaks;
    const partiallyHelpful = existingStats.partiallyHelpful + newPartiallyHelpful;
    const didntWork = existingStats.didntWork + newDidntWork;
    
    const successRate = ((workedPerfectly + workedWithTweaks) / totalVotes) * 100;
    
    const votingStats = {
      totalVotes,
      effectiveness: Math.round(effectiveness * 10) / 10,
      workedPerfectly,
      workedWithTweaks,
      partiallyHelpful,
      didntWork,
      successRate: Math.round(successRate)
    };
    
    const useCaseBreakdown = this.calculateUseCaseBreakdown(votes);
    
    return this.updatePost(postId, {
      votingStats,
      useCaseBreakdown
    });
  }

  // 计算使用场景分析
  private calculateUseCaseBreakdown(votes: Vote[]): Array<{name: string, rating: number, percentage: number}> {
    const useCases: {[key: string]: {total: number, count: number}} = {};
    
    votes.forEach(vote => {
      if (vote.useCase) {
        if (!useCases[vote.useCase]) {
          useCases[vote.useCase] = { total: 0, count: 0 };
        }
        useCases[vote.useCase].total += vote.effectiveness;
        useCases[vote.useCase].count += 1;
      }
    });
    
    return Object.entries(useCases).map(([name, data]) => ({
      name,
      rating: Math.round((data.total / data.count) * 10) / 10,
      percentage: Math.round((data.count / votes.length) * 100)
    }));
  }
}

// 创建单例实例
const storage = new StorageService();
export default storage;
