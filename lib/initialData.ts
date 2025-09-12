import { Post } from './storage';

// 生成随机时间戳的辅助函数
const getRandomRecentTime = (daysAgo: number = 7) => {
  return new Date(Date.now() - Math.random() * daysAgo * 24 * 60 * 60 * 1000).toISOString();
};

// 15个丰富的初始帖子数据
export const initialPosts: Post[] = [
  // 5个 Prompt Sharing 帖子
  {
    id: 'prompt_1',
    title: 'Advanced Chain-of-Thought Prompting for Complex Problem Solving',
    intro: 'A comprehensive guide to using chain-of-thought prompting for complex problem-solving. Includes examples and best practices that have helped 1000+ users.',
    type: 'prompt_sharing',
    author: { 
      name: 'David Kim', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' 
    },
    segments: [],
    tags: ['#PromptEngineering', '#AI', '#Tutorial', '#BestPractices'],
    likes: 156,
    comments: [
      {
        id: 'com_1',
        author: 'Sarah Chen',
        content: 'This prompt structure is game-changing! Used it for my research project.',
        createdAt: getRandomRecentTime(1),
      },
      {
        id: 'com_2',
        author: 'Mike Johnson',
        content: 'The step-by-step breakdown is incredibly helpful. Bookmarked!',
        createdAt: getRandomRecentTime(1),
      },
    ],
    viewCount: 234,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // 最近7天内
    allowCopy: true,
    promptContent: 'You are an expert problem-solver. When presented with a complex problem:\n\n1. Break it down into smaller, manageable components\n2. Identify the key constraints and requirements\n3. Generate multiple potential approaches\n4. Evaluate each approach systematically\n5. Select the most promising solution\n6. Implement step-by-step with clear reasoning\n\nAlways show your thinking process and explain your reasoning at each step.',
    exampleOutput: 'Problem: Design a sustainable transportation system for a growing city\n\nStep 1: Break down components\n- Current infrastructure analysis\n- Population growth projections\n- Environmental impact assessment\n- Economic feasibility study\n\nStep 2: Key constraints\n- Budget limitations\n- Existing infrastructure\n- Environmental regulations\n- Timeline requirements\n\nStep 3: Potential approaches\n- Electric vehicle infrastructure\n- Public transit expansion\n- Bike-sharing programs\n- Mixed-modal solutions\n\n[Continues with detailed analysis...]',
    votingStats: {
      totalVotes: 127,
      effectiveness: 4.2,
      workedPerfectly: 45,
      workedWithTweaks: 52,
      partiallyHelpful: 25,
      didntWork: 5,
      successRate: 76
    },
    useCaseBreakdown: [
      { name: 'Problem Solving', rating: 4.5, percentage: 35 },
      { name: 'Research', rating: 4.1, percentage: 25 },
      { name: 'Planning', rating: 4.3, percentage: 20 },
      { name: 'Analysis', rating: 4.0, percentage: 20 }
    ]
  },
  {
    id: 'prompt_2',
    title: 'Creative Writing Prompt: Character Development Masterclass',
    intro: 'Unlock the secrets of creating compelling characters with this AI-powered writing prompt. Perfect for authors, screenwriters, and storytellers.',
    type: 'prompt_sharing',
    author: { 
      name: 'Emma Wilson', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' 
    },
    segments: [],
    tags: ['#CreativeWriting', '#CharacterDevelopment', '#Storytelling', '#Fiction'],
    likes: 89,
    comments: [
      {
        id: 'com_3',
        author: 'Alex Rivera',
        content: 'Used this for my novel and the character depth improved dramatically!',
        createdAt: getRandomRecentTime(2),
      },
    ],
    viewCount: 189,
    createdAt: getRandomRecentTime(4),
    allowCopy: true,
    promptContent: 'You are a master character development coach. Help me create a compelling character by:\n\n1. **Core Identity**: Define name, age, background, and fundamental personality traits\n2. **Internal Conflict**: Identify their deepest fears, desires, and internal struggles\n3. **External Goals**: What do they want to achieve in the story?\n4. **Character Arc**: How will they change throughout the narrative?\n5. **Unique Voice**: What makes their dialogue and thoughts distinctive?\n6. **Backstory**: Create 3-5 key life events that shaped them\n7. **Motivations**: What drives their actions and decisions?\n\nMake the character feel real, complex, and relatable.',
    exampleOutput: '**Character: Maya Chen, 28, Software Engineer**\n\n**Core Identity**: Brilliant but socially awkward coder who prefers algorithms to people. Grew up in a traditional family that valued stability over creativity.\n\n**Internal Conflict**: Desires to create something meaningful but fears failure and disappointing her family. Struggles with imposter syndrome despite her technical skills.\n\n**External Goals**: Wants to build an app that helps people with social anxiety, but needs to learn to work with others first.\n\n**Character Arc**: From isolated perfectionist to collaborative leader who learns that great products come from great teams.\n\n**Unique Voice**: Speaks in precise, technical terms but becomes more emotional when discussing her app idea. Uses coding metaphors to explain human relationships.\n\n**Key Backstory**:\n- Failed a group project in college due to communication issues\n- Built her first app alone in her dorm room\n- Recently rejected from a startup for "not being a team player"\n\n**Motivations**: Wants to prove she can create something that helps others while overcoming her social fears.',
    votingStats: {
      totalVotes: 89,
      effectiveness: 4.6,
      workedPerfectly: 52,
      workedWithTweaks: 28,
      partiallyHelpful: 8,
      didntWork: 1,
      successRate: 90
    },
    useCaseBreakdown: [
      { name: 'Fiction Writing', rating: 4.8, percentage: 40 },
      { name: 'Screenwriting', rating: 4.5, percentage: 30 },
      { name: 'Role-playing', rating: 4.3, percentage: 20 },
      { name: 'Character Analysis', rating: 4.2, percentage: 10 }
    ]
  },
  {
    id: 'prompt_3',
    title: 'Business Strategy Analysis: Market Research Prompt',
    intro: 'Transform your business research with this comprehensive market analysis prompt. Used by 500+ entrepreneurs and consultants.',
    type: 'prompt_sharing',
    author: { 
      name: 'Marcus Johnson', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' 
    },
    segments: [],
    tags: ['#BusinessStrategy', '#MarketResearch', '#Entrepreneurship', '#Analysis'],
    likes: 134,
    comments: [
      {
        id: 'com_4',
        author: 'Lisa Park',
        content: 'This saved me weeks of research time. The framework is incredibly thorough.',
        createdAt: getRandomRecentTime(3),
      },
    ],
    viewCount: 267,
    createdAt: getRandomRecentTime(5),
    allowCopy: true,
    promptContent: 'You are a senior business strategist. Conduct a comprehensive market analysis for [PRODUCT/SERVICE] by:\n\n1. **Market Size & Growth**: Analyze total addressable market, serviceable market, and growth trends\n2. **Competitive Landscape**: Identify direct/indirect competitors, their strengths/weaknesses, market share\n3. **Customer Segments**: Define target demographics, psychographics, and buying behaviors\n4. **Market Trends**: Identify emerging patterns, technology shifts, regulatory changes\n5. **SWOT Analysis**: Strengths, weaknesses, opportunities, threats\n6. **Market Entry Strategy**: Recommended approach, pricing, positioning, channels\n7. **Risk Assessment**: Key risks and mitigation strategies\n\nProvide data-driven insights with specific recommendations.',
    exampleOutput: '**Market Analysis: AI-Powered Personal Finance App**\n\n**Market Size & Growth**:\n- TAM: $12.3B (global fintech market)\n- SAM: $2.1B (personal finance apps)\n- Growth: 15.2% CAGR\n- Key drivers: Mobile adoption, AI advancement, financial literacy demand\n\n**Competitive Landscape**:\n- Direct: Mint (40M users), YNAB (4M users), Personal Capital (2.8M users)\n- Indirect: Bank apps, robo-advisors, budgeting tools\n- Key differentiator opportunity: AI-powered personalized advice\n\n**Customer Segments**:\n- Primary: Millennials (25-40) with $50K+ income\n- Secondary: Gen Z entering workforce\n- Pain points: Complex financial planning, lack of personalized guidance\n\n**Market Trends**:\n- AI integration in financial services (+45% YoY)\n- Subscription model adoption (+30% YoY)\n- Privacy concerns driving demand for local solutions\n\n**SWOT Analysis**:\n- Strengths: AI expertise, user-friendly design\n- Weaknesses: Limited brand recognition, regulatory compliance\n- Opportunities: Underserved segments, B2B expansion\n- Threats: Big tech competition, regulatory changes\n\n**Market Entry Strategy**:\n- Freemium model with premium AI features\n- Target tech-savvy early adopters\n- Partner with financial advisors\n- Focus on mobile-first experience\n\n**Risk Assessment**:\n- High: Regulatory compliance, data security\n- Medium: Competition from established players\n- Mitigation: Strong legal team, robust security measures',
    votingStats: {
      totalVotes: 134,
      effectiveness: 4.4,
      workedPerfectly: 67,
      workedWithTweaks: 45,
      partiallyHelpful: 18,
      didntWork: 4,
      successRate: 84
    },
    useCaseBreakdown: [
      { name: 'Startup Planning', rating: 4.6, percentage: 35 },
      { name: 'Market Research', rating: 4.3, percentage: 30 },
      { name: 'Business Analysis', rating: 4.2, percentage: 25 },
      { name: 'Investment Decisions', rating: 4.1, percentage: 10 }
    ]
  },
  {
    id: 'prompt_4',
    title: 'Code Review & Optimization: AI-Powered Debugging',
    intro: 'Streamline your code review process with this comprehensive debugging and optimization prompt. Trusted by developers worldwide.',
    type: 'prompt_sharing',
    author: { 
      name: 'Alex Chen', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' 
    },
    segments: [],
    tags: ['#Programming', '#CodeReview', '#Debugging', '#Optimization'],
    likes: 98,
    comments: [
      {
        id: 'com_5',
        author: 'Jordan Kim',
        content: 'This prompt caught bugs I missed in my own code. Incredibly thorough!',
        createdAt: getRandomRecentTime(4),
      },
    ],
    viewCount: 198,
    createdAt: getRandomRecentTime(6),
    allowCopy: true,
    promptContent: 'You are a senior software engineer conducting a code review. Analyze the provided code for:\n\n1. **Functionality**: Does it work as intended? Identify logical errors\n2. **Performance**: Are there efficiency issues? Suggest optimizations\n3. **Security**: Check for vulnerabilities, input validation, data handling\n4. **Maintainability**: Code readability, structure, documentation\n5. **Best Practices**: Follow language conventions, design patterns\n6. **Error Handling**: Proper exception management, edge cases\n7. **Testing**: Suggest test cases, identify untested scenarios\n\nProvide specific, actionable feedback with code examples.',
    exampleOutput: '**Code Review Analysis**\n\n**Functionality Issues**:\n- Line 23: Missing null check before accessing user.email\n- Line 45: Logic error in date comparison (should be >= not >)\n\n**Performance Optimizations**:\n- Line 12: Database query in loop - move outside and batch\n- Line 67: Unnecessary string concatenation in loop\n- Consider caching for frequently accessed data\n\n**Security Concerns**:\n- Line 34: SQL injection vulnerability - use parameterized queries\n- Line 78: Sensitive data logged in plain text\n- Missing input validation on user input\n\n**Maintainability**:\n- Add JSDoc comments for complex functions\n- Extract magic numbers to named constants\n- Consider breaking large function into smaller ones\n\n**Error Handling**:\n- Add try-catch blocks around database operations\n- Handle network timeout scenarios\n- Provide meaningful error messages to users\n\n**Suggested Test Cases**:\n- Test with null/undefined inputs\n- Test with malformed data\n- Test network failure scenarios\n- Test with large datasets\n\n**Code Example Fix**:\n```javascript\n// Before\nconst user = users.find(u => u.id === userId);\nconst email = user.email;\n\n// After\nconst user = users.find(u => u.id === userId);\nif (!user) {\n  throw new Error(\'User not found\');\n}\nconst email = user.email;\n```',
    votingStats: {
      totalVotes: 98,
      effectiveness: 4.5,
      workedPerfectly: 58,
      workedWithTweaks: 32,
      partiallyHelpful: 7,
      didntWork: 1,
      successRate: 92
    },
    useCaseBreakdown: [
      { name: 'Code Review', rating: 4.7, percentage: 40 },
      { name: 'Debugging', rating: 4.4, percentage: 30 },
      { name: 'Performance Optimization', rating: 4.3, percentage: 20 },
      { name: 'Security Audit', rating: 4.2, percentage: 10 }
    ]
  },
  {
    id: 'prompt_5',
    title: 'Content Marketing: Viral Social Media Post Generator',
    intro: 'Create engaging, shareable content with this proven social media prompt. Used by 1000+ content creators and marketers.',
    type: 'prompt_sharing',
    author: { 
      name: 'Sophia Martinez', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia' 
    },
    segments: [],
    tags: ['#ContentMarketing', '#SocialMedia', '#ViralContent', '#Engagement'],
    likes: 167,
    comments: [
      {
        id: 'com_6',
        author: 'Ryan O\'Connor',
        content: 'My engagement rates increased by 300% using this prompt!',
        createdAt: getRandomRecentTime(5),
      },
    ],
    viewCount: 312,
    createdAt: getRandomRecentTime(7),
    allowCopy: true,
    promptContent: 'You are a viral content strategist. Create engaging social media content by:\n\n1. **Hook Analysis**: Identify what makes content shareable in [PLATFORM]\n2. **Audience Psychology**: Understand what drives engagement for [TARGET_DEMOGRAPHIC]\n3. **Content Structure**: Use proven frameworks (AIDA, PAS, Before/After)\n4. **Visual Elements**: Suggest images, videos, or graphics that enhance the message\n5. **Call-to-Action**: Create compelling CTAs that drive specific actions\n6. **Timing Strategy**: Recommend optimal posting times and frequency\n7. **Hashtag Strategy**: Research trending and niche hashtags\n\nMake it authentic, valuable, and share-worthy.',
    exampleOutput: '**Viral Content Strategy: LinkedIn Post for Tech Professionals**\n\n**Hook**: "I used to think networking was about collecting business cards. Then I discovered this one conversation starter that changed everything..."\n\n**Content Structure (Before/After)**:\n- **Before**: Generic elevator pitch, awkward small talk\n- **After**: Specific conversation starter that leads to meaningful connections\n- **Transformation**: 3x more meaningful professional relationships\n\n**Visual Elements**:\n- Carousel post with 3 slides\n- Slide 1: Problem (networking anxiety)\n- Slide 2: Solution (conversation starter)\n- Slide 3: Results (success stories)\n\n**Call-to-Action**:\n"Try this conversation starter at your next networking event and let me know how it goes! What\'s your go-to networking tip?"\n\n**Timing Strategy**:\n- Best times: Tuesday-Thursday, 8-9 AM or 5-6 PM\n- Frequency: 2-3 posts per week\n- Avoid: Monday mornings, Friday afternoons\n\n**Hashtag Strategy**:\n- Trending: #NetworkingTips #ProfessionalGrowth\n- Niche: #TechNetworking #CareerAdvice\n- Brand: #ConversationStarter #NetworkingHacks\n\n**Full Post**:\n"I used to think networking was about collecting business cards. Then I discovered this one conversation starter that changed everything...\n\nInstead of \'What do you do?\' I now ask: \'What\'s the most interesting project you\'re working on right now?\'\n\nThis simple shift:\n✅ Shows genuine interest\n✅ Opens up deeper conversations\n✅ Makes you memorable\n✅ Leads to meaningful connections\n\nTry this at your next networking event and let me know how it goes! What\'s your go-to networking tip?\n\n#NetworkingTips #ProfessionalGrowth #TechNetworking #CareerAdvice"',
    votingStats: {
      totalVotes: 167,
      effectiveness: 4.3,
      workedPerfectly: 89,
      workedWithTweaks: 56,
      partiallyHelpful: 18,
      didntWork: 4,
      successRate: 87
    },
    useCaseBreakdown: [
      { name: 'Social Media Marketing', rating: 4.5, percentage: 35 },
      { name: 'Content Creation', rating: 4.3, percentage: 30 },
      { name: 'Engagement Strategy', rating: 4.2, percentage: 25 },
      { name: 'Brand Building', rating: 4.1, percentage: 10 }
    ]
  },
  // 5个普通Post (chat_sharing) 帖子
  {
    id: 'post_1',
    title: 'How I Built a Product Launch Script with ChatGPT',
    intro: 'Sharing my conversation about creating compelling product messaging that converts. This approach helped me achieve 3x better engagement.',
    type: 'chat_sharing',
    author: { 
      name: 'Alice Chen', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' 
    },
    segments: [
      {
        id: 'seg_1',
        role: 'user',
        content: 'I need a concise value proposition for a productivity app that helps designers iterate faster.',
        order: 0,
      },
      {
        id: 'seg_2', 
        role: 'assistant',
        content: 'Here are three options:\n\n1) "Design, iterate, decide—twice as fast."\n2) "Cut feedback loops in half."\n3) "From idea to iteration in minutes, not days."',
        order: 1,
      },
      {
        id: 'seg_3',
        role: 'user',
        content: 'Great. Turn #1 into a 15-sec launch script with a friendly, energetic tone.',
        order: 2,
      },
      {
        id: 'seg_4',
        role: 'assistant',
        content: 'Imagine your best idea—now doubled. With our app, you design, iterate, and decide—twice as fast. Shorten reviews, spark momentum, and ship with confidence. Try it today.',
        order: 3,
      },
    ],
    tags: ['#ProductLaunch', '#Marketing', '#ChatGPT', '#Design'],
    likes: 42,
    comments: [
      {
        id: 'com_7',
        author: 'Ben Miller',
        content: 'This is really helpful! The iterative approach is brilliant.',
        createdAt: getRandomRecentTime(1),
      },
      {
        id: 'com_8',
        author: 'Sarah Park',
        content: 'Love how concise the final script is. Definitely using this pattern.',
        createdAt: getRandomRecentTime(1),
      },
    ],
    viewCount: 156,
    createdAt: '2024-01-20T09:00:00Z',
    allowCopy: true,
  },
  {
    id: 'post_2',
    title: 'My AI-Powered Design System Workflow',
    intro: 'How I use AI to create consistent, scalable design systems. This workflow has saved me 60% of my design time.',
    type: 'chat_sharing',
    author: { 
      name: 'Emma Wilson', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' 
    },
    segments: [
      {
        id: 'seg_5',
        role: 'user',
        content: 'I want to create a reusable workflow for generating marketing content. Can you help me structure this?',
        order: 0,
      },
      {
        id: 'seg_6',
        role: 'assistant',
        content: 'Here\'s a structured approach:\n\n1. **Brand Voice Definition**: Establish tone, style, and personality\n2. **Content Templates**: Create reusable formats for different content types\n3. **AI Prompt Library**: Build a collection of tested prompts for each template\n4. **Quality Checklist**: Define criteria for consistency and brand alignment\n5. **Iteration Process**: Set up feedback loops for continuous improvement',
        order: 1,
      },
      {
        id: 'seg_7',
        role: 'user',
        content: 'Can you show me a specific prompt for the outline generation step?',
        order: 2,
      },
      {
        id: 'seg_8',
        role: 'assistant',
        content: 'Here\'s a template:\n\n"Create a comprehensive technical documentation outline for [PRODUCT/FEATURE]. Include:\n- Overview and objectives\n- Prerequisites and setup\n- Step-by-step procedures\n- Troubleshooting section\n- API references (if applicable)\n- Best practices and tips\n\nTarget audience: [TECHNICAL LEVEL]\nFormat: [DOCUMENTATION STYLE]"',
        order: 3,
      },
    ],
    tags: ['#DesignSystem', '#AI', '#Workflow', '#Productivity'],
    likes: 67,
    comments: [
      {
        id: 'com_9',
        author: 'Designer Pro',
        content: 'This workflow is exactly what I needed! The outline prompt is gold.',
        createdAt: getRandomRecentTime(2),
      },
    ],
    viewCount: 189,
    createdAt: getRandomRecentTime(2),
    allowCopy: true,
  },
  {
    id: 'post_3',
    title: 'AI Writing Workflow for Technical Documentation',
    intro: 'Sharing my personal workflow for using AI to create clear, comprehensive technical docs. This process has saved me hours every week.',
    type: 'chat_sharing',
    author: { 
      name: 'Tech Writer', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechWriter' 
    },
    segments: [
      {
        id: 'seg_9',
        role: 'user',
        content: 'I need help structuring a technical documentation workflow. How can I use AI to make this more efficient?',
        order: 0,
      },
      {
        id: 'seg_10',
        role: 'assistant',
        content: 'Here\'s a structured approach:\n\n1. **Outline Generation**: Use AI to create comprehensive outlines\n2. **Content Drafting**: Generate initial drafts for each section\n3. **Technical Review**: AI-assisted fact-checking and accuracy verification\n4. **Style Consistency**: Ensure tone and format consistency\n5. **User Testing**: AI-generated user scenarios for testing clarity',
        order: 1,
      },
      {
        id: 'seg_11',
        role: 'user',
        content: 'Can you show me a specific prompt for the outline generation step?',
        order: 2,
      },
      {
        id: 'seg_12',
        role: 'assistant',
        content: 'Here\'s a template:\n\n"Create a comprehensive technical documentation outline for [PRODUCT/FEATURE]. Include:\n- Overview and objectives\n- Prerequisites and setup\n- Step-by-step procedures\n- Troubleshooting section\n- API references (if applicable)\n- Best practices and tips\n\nTarget audience: [TECHNICAL LEVEL]\nFormat: [DOCUMENTATION STYLE]"',
        order: 3,
      },
    ],
    tags: ['#TechnicalWriting', '#AI', '#Documentation', '#Workflow'],
    likes: 28,
    comments: [
      {
        id: 'com_10',
        author: 'Dev Lead',
        content: 'This workflow is exactly what I needed! The outline prompt is gold.',
        createdAt: getRandomRecentTime(2),
      },
    ],
    viewCount: 156,
    createdAt: getRandomRecentTime(2),
    allowCopy: true,
  },
  {
    id: 'post_4',
    title: 'Building a Personal Brand with AI: My Journey',
    intro: 'How I used AI tools to build my personal brand from scratch. From content creation to social media strategy, here\'s what worked.',
    type: 'chat_sharing',
    author: { 
      name: 'Maria Rodriguez', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' 
    },
    segments: [
      {
        id: 'seg_13',
        role: 'user',
        content: 'I want to build a personal brand but don\'t know where to start. Can you help me create a strategy?',
        order: 0,
      },
      {
        id: 'seg_14',
        role: 'assistant',
        content: 'Here\'s a step-by-step approach:\n\n1. **Define Your Niche**: What unique value do you offer?\n2. **Content Pillars**: Choose 3-4 topics you\'re passionate about\n3. **Platform Strategy**: Focus on 2-3 platforms initially\n4. **Content Calendar**: Plan consistent posting schedule\n5. **Engagement Strategy**: How will you interact with your audience?\n6. **Growth Metrics**: Track followers, engagement, and conversions',
        order: 1,
      },
      {
        id: 'seg_15',
        role: 'user',
        content: 'What kind of content performs best for personal branding?',
        order: 2,
      },
      {
        id: 'seg_16',
        role: 'assistant',
        content: 'High-performing personal brand content includes:\n\n- **Behind-the-scenes**: Show your process and daily life\n- **Educational content**: Share your expertise and insights\n- **Personal stories**: Connect through authentic experiences\n- **Industry commentary**: Share your thoughts on trends\n- **Value-driven posts**: Help your audience solve problems\n\nRemember: Consistency and authenticity are key!',
        order: 3,
      },
    ],
    tags: ['#PersonalBranding', '#ContentStrategy', '#SocialMedia', '#Growth'],
    likes: 73,
    comments: [
      {
        id: 'com_11',
        author: 'Brand Builder',
        content: 'This is exactly what I needed to hear! Starting my brand journey today.',
        createdAt: getRandomRecentTime(3),
      },
    ],
    viewCount: 201,
    createdAt: getRandomRecentTime(3),
    allowCopy: true,
  },
  {
    id: 'post_5',
    title: 'AI-Powered Learning: How I Mastered New Skills 3x Faster',
    intro: 'My experiment with using AI as a learning companion. The results were surprising and completely changed how I approach skill development.',
    type: 'chat_sharing',
    author: { 
      name: 'James Liu', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' 
    },
    segments: [
      {
        id: 'seg_17',
        role: 'user',
        content: 'I want to learn Python programming but feel overwhelmed. Can you help me create a learning plan?',
        order: 0,
      },
      {
        id: 'seg_18',
        role: 'assistant',
        content: 'Here\'s a structured 30-day Python learning plan:\n\n**Week 1: Fundamentals**\n- Day 1-2: Variables, data types, basic operations\n- Day 3-4: Control structures (if/else, loops)\n- Day 5-7: Functions and modules\n\n**Week 2: Intermediate Concepts**\n- Day 8-10: Lists, dictionaries, and data structures\n- Day 11-13: File handling and error management\n- Day 14: Practice projects\n\n**Week 3: Advanced Topics**\n- Day 15-17: Object-oriented programming\n- Day 18-20: Libraries and frameworks\n- Day 21: Mini-project\n\n**Week 4: Real-world Application**\n- Day 22-28: Build a complete project\n- Day 29-30: Review and next steps',
        order: 1,
      },
      {
        id: 'seg_19',
        role: 'user',
        content: 'What resources should I use for each day?',
        order: 2,
      },
      {
        id: 'seg_20',
        role: 'assistant',
        content: 'Here\'s a daily resource breakdown:\n\n**Morning (30 mins)**:\n- Interactive tutorials: Codecademy or freeCodeCamp\n- Video lessons: YouTube channels like "Python Engineer"\n\n**Afternoon (45 mins)**:\n- Hands-on coding: LeetCode easy problems\n- Project work: Build small scripts\n\n**Evening (15 mins)**:\n- Documentation reading: Python.org official docs\n- Community: Reddit r/learnpython for questions\n\n**Weekly**:\n- Join Python Discord communities\n- Follow Python Twitter accounts for tips\n- Read "Automate the Boring Stuff" book',
        order: 3,
      },
    ],
    tags: ['#Learning', '#Python', '#AI', '#SkillDevelopment'],
    likes: 91,
    comments: [
      {
        id: 'com_12',
        author: 'Code Newbie',
        content: 'This learning plan is perfect! Starting my Python journey today.',
        createdAt: getRandomRecentTime(4),
      },
    ],
    viewCount: 178,
    createdAt: getRandomRecentTime(4),
    allowCopy: true,
  },
  // 5个 Community Event 帖子
  {
    id: 'event_1',
    title: 'AI Design Workshop: Building Better Interfaces',
    intro: 'Join us for a hands-on workshop where we\'ll explore how AI can enhance your design process. Free event with expert speakers.',
    type: 'community_event',
    author: { 
      name: 'Design Community', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Design' 
    },
    segments: [],
    tags: ['#Workshop', '#AI', '#Design', '#Free', '#Online'],
    likes: 89,
    comments: [
      {
        id: 'com_13',
        author: 'Lisa Wang',
        content: 'Looking forward to this! Will there be recordings available?',
        createdAt: getRandomRecentTime(3),
      },
    ],
    viewCount: 234,
    createdAt: getRandomRecentTime(4),
    allowCopy: false,
    eventDate: '2024-01-25T14:00:00Z',
    eventLocation: 'Online (YouTube Live)',
    interestedCount: 45,
  },
  {
    id: 'event_2',
    title: 'AI Hackathon 2024: Build the Future',
    intro: '48-hour hackathon focused on AI innovation. Prizes worth $50,000. Open to developers, designers, and entrepreneurs.',
    type: 'community_event',
    author: { 
      name: 'Tech Events Co', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechEvents' 
    },
    segments: [],
    tags: ['#Hackathon', '#AI', '#Innovation', '#Competition', '#Prize'],
    likes: 156,
    comments: [
      {
        id: 'com_14',
        author: 'Hacker Pro',
        content: 'Can\'t wait! This is going to be epic. Who\'s forming teams?',
        createdAt: getRandomRecentTime(5),
      },
    ],
    viewCount: 445,
    createdAt: getRandomRecentTime(6),
    allowCopy: false,
    eventDate: '2024-02-10T09:00:00Z',
    eventLocation: 'San Francisco Convention Center',
    interestedCount: 78,
  },
  {
    id: 'event_3',
    title: 'Prompt Engineering Masterclass',
    intro: 'Learn advanced prompt engineering techniques from industry experts. Limited to 50 participants. Includes hands-on exercises.',
    type: 'community_event',
    author: { 
      name: 'AI Academy', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AIAcademy' 
    },
    segments: [],
    tags: ['#Masterclass', '#PromptEngineering', '#Learning', '#Expert', '#Limited'],
    likes: 203,
    comments: [
      {
        id: 'com_15',
        author: 'Prompt Master',
        content: 'This is exactly what I need to level up my prompting skills!',
        createdAt: getRandomRecentTime(7),
      },
    ],
    viewCount: 567,
    createdAt: getRandomRecentTime(8),
    allowCopy: false,
    eventDate: '2024-01-30T18:00:00Z',
    eventLocation: 'Online (Zoom)',
    interestedCount: 32,
  },
  {
    id: 'event_4',
    title: 'AI Ethics Roundtable Discussion',
    intro: 'Join leading AI researchers and ethicists for a deep dive into responsible AI development. Open discussion format.',
    type: 'community_event',
    author: { 
      name: 'AI Ethics Institute', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AIEthics' 
    },
    segments: [],
    tags: ['#Ethics', '#AI', '#Discussion', '#Research', '#Responsible'],
    likes: 78,
    comments: [
      {
        id: 'com_16',
        author: 'Ethics Researcher',
        content: 'This is such an important topic. Looking forward to the discussion.',
        createdAt: getRandomRecentTime(9),
      },
    ],
    viewCount: 189,
    createdAt: getRandomRecentTime(10),
    allowCopy: false,
    eventDate: '2024-02-05T19:00:00Z',
    eventLocation: 'Stanford University',
    interestedCount: 56,
  },
  {
    id: 'event_5',
    title: 'AI Product Showcase: Demo Day',
    intro: 'See the latest AI products and innovations from our community. Network with founders, investors, and developers.',
    type: 'community_event',
    author: { 
      name: 'AI Product Hub', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AIProduct' 
    },
    segments: [],
    tags: ['#Showcase', '#Products', '#Networking', '#Innovation', '#Demo'],
    likes: 134,
    comments: [
      {
        id: 'com_17',
        author: 'Product Manager',
        content: 'Perfect timing! I\'m looking for AI tools for my team.',
        createdAt: getRandomRecentTime(11),
      },
    ],
    viewCount: 298,
    createdAt: getRandomRecentTime(12),
    allowCopy: false,
    eventDate: '2024-02-15T16:00:00Z',
    eventLocation: 'New York Tech Center',
    interestedCount: 92,
  },
];
