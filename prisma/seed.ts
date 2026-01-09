import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { hash } from 'bcryptjs';
import path from 'path';

// Create Prisma adapter with local SQLite file path
// The dev.db is in the root directory (created by Prisma migrate)
const adapter = new PrismaLibSql({
  url: `file:${path.join(process.cwd(), 'dev.db')}`,
});

// Initialize Prisma client with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.notification.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.flaggedContent.deleteMany();
  await prisma.generation.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.promptTemplate.deleteMany();
  await prisma.category.deleteMany();
  await prisma.aIModel.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platformSetting.deleteMany();
  await prisma.pricingTier.deleteMany();

  // ==========================================
  // CATEGORIES
  // ==========================================
  console.log('📁 Creating categories...');

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'E-commerce',
        slug: 'e-commerce',
        description: 'Product photography and e-commerce visuals',
        icon: 'ShoppingBag',
        color: '#22c55e',
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Marketing',
        slug: 'marketing',
        description: 'Social media and marketing content',
        icon: 'Megaphone',
        color: '#3b82f6',
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Portrait',
        slug: 'portrait',
        description: 'Portrait and headshot photography',
        icon: 'User',
        color: '#8b5cf6',
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Art & Creative',
        slug: 'art-creative',
        description: 'Digital art and creative visuals',
        icon: 'Palette',
        color: '#ec4899',
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Video',
        slug: 'video',
        description: 'Video generation and animation',
        icon: 'Video',
        color: '#f59e0b',
        order: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Design',
        slug: 'design',
        description: 'UI/UX and graphic design',
        icon: 'Layout',
        color: '#06b6d4',
        order: 6,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Landscape',
        slug: 'landscape',
        description: 'Nature and landscape photography',
        icon: 'Mountain',
        color: '#10b981',
        order: 7,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Architecture',
        slug: 'architecture',
        description: 'Architectural and interior design visuals',
        icon: 'Building',
        color: '#6366f1',
        order: 8,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Food & Beverage',
        slug: 'food-beverage',
        description: 'Food photography and culinary content',
        icon: 'UtensilsCrossed',
        color: '#ef4444',
        order: 9,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Fashion and apparel photography',
        icon: 'Shirt',
        color: '#f97316',
        order: 10,
      },
    }),
  ]);

  const categoryMap = Object.fromEntries(categories.map(c => [c.slug, c]));
  console.log(`   ✅ Created ${categories.length} categories`);

  // ==========================================
  // AI MODELS
  // ==========================================
  console.log('🤖 Creating AI models...');

  const aiModels = await Promise.all([
    prisma.aIModel.create({
      data: {
        name: 'SDXL 1.0',
        slug: 'sdxl-1-0',
        description: 'High-quality image generation with excellent prompt following',
        type: 'IMAGE',
        creditCost: 2,
        maxResolution: '1024x1024',
        features: JSON.stringify(['High quality', 'Fast generation', 'Good for portraits']),
        isDefault: true,
        order: 1,
      },
    }),
    prisma.aIModel.create({
      data: {
        name: 'Flux.1',
        slug: 'flux-1',
        description: 'Latest generation model with exceptional detail',
        type: 'IMAGE',
        creditCost: 3,
        maxResolution: '1024x1024',
        features: JSON.stringify(['Ultra-detailed', 'Photorealistic', 'Best for products']),
        order: 2,
      },
    }),
    prisma.aIModel.create({
      data: {
        name: 'Stable Diffusion 3',
        slug: 'sd3',
        description: 'Advanced multimodal diffusion transformer',
        type: 'IMAGE',
        creditCost: 4,
        maxResolution: '1536x1536',
        features: JSON.stringify(['Text rendering', 'Complex scenes', 'Artistic styles']),
        order: 3,
      },
    }),
    prisma.aIModel.create({
      data: {
        name: 'DALL-E 3',
        slug: 'dall-e-3',
        description: 'OpenAI\'s latest image generation model',
        type: 'IMAGE',
        creditCost: 5,
        maxResolution: '1024x1024',
        features: JSON.stringify(['Natural language', 'Safe content', 'High fidelity']),
        order: 4,
      },
    }),
    prisma.aIModel.create({
      data: {
        name: 'Midjourney v6',
        slug: 'midjourney-v6',
        description: 'Premium artistic image generation',
        type: 'IMAGE',
        creditCost: 6,
        maxResolution: '2048x2048',
        features: JSON.stringify(['Artistic', 'Stylized', 'High resolution']),
        order: 5,
      },
    }),
    prisma.aIModel.create({
      data: {
        name: 'AnimateDiff',
        slug: 'animatediff',
        description: 'AI-powered video animation from images',
        type: 'VIDEO',
        creditCost: 8,
        maxResolution: '1024x1024',
        features: JSON.stringify(['Animation', 'Motion', 'Short clips']),
        order: 6,
      },
    }),
    prisma.aIModel.create({
      data: {
        name: 'Runway Gen-3',
        slug: 'runway-gen3',
        description: 'Advanced video generation model',
        type: 'VIDEO',
        creditCost: 10,
        maxResolution: '1280x720',
        features: JSON.stringify(['Long videos', 'Camera motion', 'High quality']),
        order: 7,
      },
    }),
  ]);

  const modelMap = Object.fromEntries(aiModels.map(m => [m.slug, m]));
  console.log(`   ✅ Created ${aiModels.length} AI models`);

  // ==========================================
  // USERS
  // ==========================================
  console.log('👥 Creating users...');

  const hashedPassword = await hash('password123', 12);

  const users = await Promise.all([
    // Admin user
    prisma.user.create({
      data: {
        email: 'admin@promptpal.ai',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        plan: 'ENTERPRISE',
        credits: 9999,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    // Moderator user
    prisma.user.create({
      data: {
        email: 'moderator@promptpal.ai',
        name: 'Sarah Moderator',
        password: hashedPassword,
        role: 'MODERATOR',
        plan: 'PROFESSIONAL',
        credits: 500,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    // Pro users
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Designer',
        password: hashedPassword,
        role: 'USER',
        plan: 'PROFESSIONAL',
        credits: 245,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'emma@studio.com',
        name: 'Emma Creative',
        password: hashedPassword,
        role: 'USER',
        plan: 'GROWTH',
        credits: 120,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike@agency.io',
        name: 'Mike Marketing',
        password: hashedPassword,
        role: 'USER',
        plan: 'PROFESSIONAL',
        credits: 380,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    // Starter users
    prisma.user.create({
      data: {
        email: 'lisa@freelance.com',
        name: 'Lisa Artist',
        password: hashedPassword,
        role: 'USER',
        plan: 'STARTER',
        credits: 15,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'david@startup.co',
        name: 'David Founder',
        password: hashedPassword,
        role: 'USER',
        plan: 'GROWTH',
        credits: 85,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
    // Free trial user
    prisma.user.create({
      data: {
        email: 'newuser@gmail.com',
        name: 'New User',
        password: hashedPassword,
        role: 'USER',
        plan: 'FREE',
        credits: 5,
        status: 'ACTIVE',
      },
    }),
    // Suspended user
    prisma.user.create({
      data: {
        email: 'suspended@example.com',
        name: 'Suspended User',
        password: hashedPassword,
        role: 'USER',
        plan: 'STARTER',
        credits: 0,
        status: 'SUSPENDED',
      },
    }),
    // Pending user
    prisma.user.create({
      data: {
        email: 'pending@example.com',
        name: 'Pending User',
        password: hashedPassword,
        role: 'USER',
        plan: 'FREE',
        credits: 5,
        status: 'PENDING',
      },
    }),
    // Enterprise user
    prisma.user.create({
      data: {
        email: 'enterprise@bigcorp.com',
        name: 'Enterprise Client',
        password: hashedPassword,
        role: 'USER',
        plan: 'ENTERPRISE',
        credits: 5000,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    }),
  ]);

  const userMap = Object.fromEntries(users.map(u => [u.email, u]));
  console.log(`   ✅ Created ${users.length} users`);

  // ==========================================
  // PROMPT TEMPLATES
  // ==========================================
  console.log('📝 Creating prompt templates...');

  const templates = await Promise.all([
    // E-commerce templates
    prisma.promptTemplate.create({
      data: {
        title: 'Product Photography',
        content: 'Professional product photography of {product}, clean white background, studio lighting, commercial quality, 8k resolution, sharp focus on product details',
        description: 'Create professional product shots for e-commerce',
        type: 'IMAGE',
        variables: JSON.stringify(['product']),
        categoryId: categoryMap['e-commerce'].id,
        order: 1,
        usageCount: 1250,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Lifestyle Product Shot',
        content: 'Lifestyle photography featuring {product} in a {setting} environment, natural lighting, authentic styling, Instagram-worthy, high-end brand aesthetic',
        description: 'Product in real-life context for social media',
        type: 'IMAGE',
        variables: JSON.stringify(['product', 'setting']),
        categoryId: categoryMap['e-commerce'].id,
        order: 2,
        usageCount: 890,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Amazon Product Listing',
        content: 'Amazon product listing image of {product}, white background, multiple angles shown, infographic style with key features highlighted, professional e-commerce photography',
        description: 'Optimized for Amazon marketplace listings',
        type: 'IMAGE',
        variables: JSON.stringify(['product']),
        categoryId: categoryMap['e-commerce'].id,
        order: 3,
        usageCount: 720,
      },
    }),
    // Marketing templates
    prisma.promptTemplate.create({
      data: {
        title: 'Social Media Post',
        content: 'Eye-catching social media graphic for {brand} promoting {message}, modern design, vibrant colors, {platform} optimized dimensions, trendy aesthetic',
        description: 'Create engaging social media content',
        type: 'IMAGE',
        variables: JSON.stringify(['brand', 'message', 'platform']),
        categoryId: categoryMap['marketing'].id,
        order: 1,
        usageCount: 2100,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Email Banner',
        content: 'Professional email header banner for {campaign}, clean design, {brand_colors} color scheme, compelling visual that drives click-through, responsive-friendly',
        description: 'Email marketing header images',
        type: 'IMAGE',
        variables: JSON.stringify(['campaign', 'brand_colors']),
        categoryId: categoryMap['marketing'].id,
        order: 2,
        usageCount: 650,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Ad Creative',
        content: 'High-converting advertisement creative for {product}, {emotion} emotional appeal, clear value proposition, attention-grabbing, professional advertising photography',
        description: 'Paid advertising visuals',
        type: 'IMAGE',
        variables: JSON.stringify(['product', 'emotion']),
        categoryId: categoryMap['marketing'].id,
        order: 3,
        usageCount: 1450,
      },
    }),
    // Portrait templates
    prisma.promptTemplate.create({
      data: {
        title: 'Professional Headshot',
        content: 'Professional corporate headshot, {gender} professional, {background} background, business attire, confident expression, studio lighting, LinkedIn-ready',
        description: 'Corporate professional portraits',
        type: 'IMAGE',
        variables: JSON.stringify(['gender', 'background']),
        categoryId: categoryMap['portrait'].id,
        order: 1,
        usageCount: 980,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Creative Portrait',
        content: 'Artistic portrait photography, {style} style, dramatic lighting, {mood} atmosphere, editorial quality, fashion magazine aesthetic',
        description: 'Creative and artistic portraits',
        type: 'IMAGE',
        variables: JSON.stringify(['style', 'mood']),
        categoryId: categoryMap['portrait'].id,
        order: 2,
        usageCount: 750,
      },
    }),
    // Art templates
    prisma.promptTemplate.create({
      data: {
        title: 'Digital Art Concept',
        content: 'Digital concept art of {subject}, {art_style} art style, highly detailed, vibrant colors, cinematic composition, trending on ArtStation',
        description: 'Concept art and illustrations',
        type: 'IMAGE',
        variables: JSON.stringify(['subject', 'art_style']),
        categoryId: categoryMap['art-creative'].id,
        order: 1,
        usageCount: 1800,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Abstract Art',
        content: 'Abstract art piece featuring {elements}, {color_palette} color palette, contemporary style, museum-quality, expressive brushstrokes',
        description: 'Modern abstract artwork',
        type: 'IMAGE',
        variables: JSON.stringify(['elements', 'color_palette']),
        categoryId: categoryMap['art-creative'].id,
        order: 2,
        usageCount: 620,
      },
    }),
    // Video templates
    prisma.promptTemplate.create({
      data: {
        title: 'Product Animation',
        content: 'Smooth 360-degree rotation animation of {product}, seamless loop, professional lighting, black background, showcase product from all angles',
        description: 'Animated product showcase',
        type: 'VIDEO',
        variables: JSON.stringify(['product']),
        categoryId: categoryMap['video'].id,
        order: 1,
        usageCount: 450,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Logo Animation',
        content: 'Professional logo reveal animation for {brand}, {style} motion graphics style, smooth transitions, corporate quality, 5 second duration',
        description: 'Animated logo intros',
        type: 'VIDEO',
        variables: JSON.stringify(['brand', 'style']),
        categoryId: categoryMap['video'].id,
        order: 2,
        usageCount: 380,
      },
    }),
    // Design templates
    prisma.promptTemplate.create({
      data: {
        title: 'UI Dashboard',
        content: 'Modern dashboard UI design for {app_type} application, clean interface, {color_scheme} color scheme, data visualization, professional SaaS aesthetic',
        description: 'Dashboard interface mockups',
        type: 'IMAGE',
        variables: JSON.stringify(['app_type', 'color_scheme']),
        categoryId: categoryMap['design'].id,
        order: 1,
        usageCount: 520,
      },
    }),
    prisma.promptTemplate.create({
      data: {
        title: 'Mobile App Mockup',
        content: 'Mobile app UI design for {app_name}, {platform} style guidelines, modern interface, intuitive UX, app store ready screenshots',
        description: 'Mobile application designs',
        type: 'IMAGE',
        variables: JSON.stringify(['app_name', 'platform']),
        categoryId: categoryMap['design'].id,
        order: 2,
        usageCount: 680,
      },
    }),
    // Landscape templates
    prisma.promptTemplate.create({
      data: {
        title: 'Nature Landscape',
        content: 'Breathtaking landscape photography of {location}, golden hour lighting, dramatic sky, {season} atmosphere, National Geographic quality',
        description: 'Natural scenery images',
        type: 'IMAGE',
        variables: JSON.stringify(['location', 'season']),
        categoryId: categoryMap['landscape'].id,
        order: 1,
        usageCount: 890,
      },
    }),
    // Architecture templates
    prisma.promptTemplate.create({
      data: {
        title: 'Architectural Render',
        content: 'Photorealistic architectural visualization of {building_type}, {style} architecture, perfect lighting, professional rendering, real estate quality',
        description: 'Building and interior renders',
        type: 'IMAGE',
        variables: JSON.stringify(['building_type', 'style']),
        categoryId: categoryMap['architecture'].id,
        order: 1,
        usageCount: 430,
      },
    }),
    // Food templates
    prisma.promptTemplate.create({
      data: {
        title: 'Food Photography',
        content: 'Mouthwatering food photography of {dish}, {style} styling, professional food photography, appetizing presentation, restaurant menu quality',
        description: 'Delicious food shots',
        type: 'IMAGE',
        variables: JSON.stringify(['dish', 'style']),
        categoryId: categoryMap['food-beverage'].id,
        order: 1,
        usageCount: 760,
      },
    }),
    // Fashion templates
    prisma.promptTemplate.create({
      data: {
        title: 'Fashion Editorial',
        content: 'High fashion editorial photography, {clothing_item} featured, {aesthetic} aesthetic, Vogue magazine quality, professional model, studio lighting',
        description: 'Fashion and apparel photography',
        type: 'IMAGE',
        variables: JSON.stringify(['clothing_item', 'aesthetic']),
        categoryId: categoryMap['fashion'].id,
        order: 1,
        usageCount: 580,
      },
    }),
  ]);

  console.log(`   ✅ Created ${templates.length} prompt templates`);

  // ==========================================
  // USER PROMPTS (Saved prompts by users)
  // ==========================================
  console.log('💾 Creating user saved prompts...');

  const johnUser = userMap['john@example.com'];
  const emmaUser = userMap['emma@studio.com'];
  const mikeUser = userMap['mike@agency.io'];
  const lisaUser = userMap['lisa@freelance.com'];

  const prompts = await Promise.all([
    // John's prompts
    prisma.prompt.create({
      data: {
        title: 'My Product Shot Style',
        content: 'Professional product photography of luxury watch, clean marble surface, soft shadows, premium brand aesthetic, magazine quality, 8k resolution',
        description: 'Custom product photography style for luxury items',
        type: 'IMAGE',
        isPublic: true,
        isFeatured: true,
        usageCount: 145,
        rating: 4.8,
        ratingCount: 32,
        likes: 89,
        tags: JSON.stringify(['product', 'luxury', 'photography']),
        userId: johnUser.id,
        categoryId: categoryMap['e-commerce'].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Tech Product Hero',
        content: 'Hero shot of tech gadget, futuristic lighting, dark background with neon accents, reflection surface, Apple-style minimalism',
        description: 'For tech product launches',
        type: 'IMAGE',
        isPublic: true,
        usageCount: 78,
        rating: 4.5,
        ratingCount: 18,
        likes: 45,
        tags: JSON.stringify(['tech', 'product', 'modern']),
        userId: johnUser.id,
        categoryId: categoryMap['e-commerce'].id,
      },
    }),
    // Emma's prompts
    prisma.prompt.create({
      data: {
        title: 'Dreamy Portrait Style',
        content: 'Ethereal portrait photography, soft focus, pastel color grading, natural light, romantic atmosphere, fine art aesthetic',
        description: 'My signature portrait style',
        type: 'IMAGE',
        isPublic: true,
        isFeatured: true,
        usageCount: 234,
        rating: 4.9,
        ratingCount: 56,
        likes: 156,
        tags: JSON.stringify(['portrait', 'dreamy', 'artistic']),
        userId: emmaUser.id,
        categoryId: categoryMap['portrait'].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Digital Fantasy Art',
        content: 'Fantasy digital art, magical forest scene, bioluminescent creatures, mystical atmosphere, highly detailed, concept art quality',
        description: 'Fantasy world building prompts',
        type: 'IMAGE',
        isPublic: true,
        usageCount: 189,
        rating: 4.7,
        ratingCount: 42,
        likes: 123,
        tags: JSON.stringify(['fantasy', 'digital-art', 'magical']),
        userId: emmaUser.id,
        categoryId: categoryMap['art-creative'].id,
      },
    }),
    // Mike's prompts
    prisma.prompt.create({
      data: {
        title: 'Social Media Campaign',
        content: 'Bold social media graphic, attention-grabbing headline space, brand-safe composition, viral potential, Instagram-optimized',
        description: 'For client social campaigns',
        type: 'IMAGE',
        isPublic: false,
        usageCount: 67,
        rating: 4.3,
        ratingCount: 8,
        likes: 0,
        tags: JSON.stringify(['marketing', 'social-media', 'campaign']),
        userId: mikeUser.id,
        categoryId: categoryMap['marketing'].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Corporate Video Intro',
        content: 'Professional corporate video intro, logo animation, clean motion graphics, business blue color scheme, 5 second duration',
        description: 'Client video intros',
        type: 'VIDEO',
        isPublic: true,
        usageCount: 45,
        rating: 4.4,
        ratingCount: 12,
        likes: 28,
        tags: JSON.stringify(['video', 'corporate', 'intro']),
        userId: mikeUser.id,
        categoryId: categoryMap['video'].id,
      },
    }),
    // Lisa's prompts
    prisma.prompt.create({
      data: {
        title: 'Watercolor Style',
        content: 'Beautiful watercolor painting of flowers, soft edges, color bleeding effect, traditional art aesthetic, gallery quality',
        description: 'Watercolor art generation',
        type: 'IMAGE',
        isPublic: true,
        usageCount: 92,
        rating: 4.6,
        ratingCount: 24,
        likes: 67,
        tags: JSON.stringify(['watercolor', 'art', 'flowers']),
        userId: lisaUser.id,
        categoryId: categoryMap['art-creative'].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Cozy Interior',
        content: 'Cozy Scandinavian interior design, warm lighting, minimalist furniture, hygge atmosphere, architectural digest quality',
        description: 'Interior design inspiration',
        type: 'IMAGE',
        isPublic: true,
        usageCount: 156,
        rating: 4.8,
        ratingCount: 38,
        likes: 98,
        tags: JSON.stringify(['interior', 'scandinavian', 'cozy']),
        userId: lisaUser.id,
        categoryId: categoryMap['architecture'].id,
      },
    }),
    // Additional community prompts
    prisma.prompt.create({
      data: {
        title: 'Cinematic Food Shot',
        content: 'Cinematic food photography, steam rising, dramatic lighting, dark moody background, professional food styling, restaurant advertising quality',
        description: 'Dramatic food photography',
        type: 'IMAGE',
        isPublic: true,
        isFeatured: true,
        usageCount: 312,
        rating: 4.9,
        ratingCount: 78,
        likes: 234,
        tags: JSON.stringify(['food', 'cinematic', 'photography']),
        userId: johnUser.id,
        categoryId: categoryMap['food-beverage'].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Fashion Lookbook',
        content: 'High-end fashion lookbook photography, editorial style, neutral background, model in designer clothing, Zara catalog aesthetic',
        description: 'Fashion brand lookbooks',
        type: 'IMAGE',
        isPublic: true,
        usageCount: 178,
        rating: 4.6,
        ratingCount: 34,
        likes: 112,
        tags: JSON.stringify(['fashion', 'editorial', 'lookbook']),
        userId: emmaUser.id,
        categoryId: categoryMap['fashion'].id,
      },
    }),
  ]);

  console.log(`   ✅ Created ${prompts.length} user prompts`);

  // ==========================================
  // GENERATIONS
  // ==========================================
  console.log('🎨 Creating generation history...');

  const generations = await Promise.all([
    // John's generations
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Professional product photography of luxury watch, clean marble surface, soft shadows',
        enhancedPrompt: 'Professional product photography of luxury watch, clean marble surface, soft shadows, premium brand aesthetic, magazine quality, 8k resolution, studio lighting, commercial photography',
        status: 'COMPLETED',
        creditsUsed: 3,
        processingTime: 12500,
        width: 1024,
        height: 1024,
        aspectRatio: '1:1',
        quality: 'high',
        outputUrl: '/placeholder-watch.jpg',
        thumbnailUrl: '/placeholder-watch-thumb.jpg',
        userId: johnUser.id,
        modelId: modelMap['flux-1'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      },
    }),
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Tech product hero shot with futuristic lighting',
        status: 'COMPLETED',
        creditsUsed: 2,
        processingTime: 8200,
        width: 1024,
        height: 768,
        aspectRatio: '4:3',
        quality: 'standard',
        outputUrl: '/placeholder-tech.jpg',
        thumbnailUrl: '/placeholder-tech-thumb.jpg',
        userId: johnUser.id,
        modelId: modelMap['sdxl-1-0'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    }),
    // Emma's generations
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Ethereal portrait with soft pastel colors and natural light',
        enhancedPrompt: 'Ethereal portrait photography, soft focus, pastel color grading, natural window light, romantic atmosphere, fine art aesthetic, 85mm lens look',
        status: 'COMPLETED',
        creditsUsed: 4,
        processingTime: 15800,
        width: 768,
        height: 1024,
        aspectRatio: '3:4',
        quality: 'high',
        outputUrl: '/placeholder-portrait.jpg',
        thumbnailUrl: '/placeholder-portrait-thumb.jpg',
        userId: emmaUser.id,
        modelId: modelMap['sd3'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
      },
    }),
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Fantasy digital art magical forest',
        status: 'PROCESSING',
        creditsUsed: 5,
        width: 1024,
        height: 1024,
        aspectRatio: '1:1',
        quality: 'ultra',
        userId: emmaUser.id,
        modelId: modelMap['dall-e-3'].id,
      },
    }),
    // Mike's generations
    prisma.generation.create({
      data: {
        type: 'VIDEO',
        promptText: 'Corporate logo animation with smooth transitions',
        status: 'COMPLETED',
        creditsUsed: 8,
        processingTime: 45000,
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        quality: 'high',
        outputUrl: '/placeholder-video.mp4',
        thumbnailUrl: '/placeholder-video-thumb.jpg',
        userId: mikeUser.id,
        modelId: modelMap['animatediff'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      },
    }),
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Bold social media campaign graphic',
        status: 'FAILED',
        creditsUsed: 0,
        width: 1080,
        height: 1080,
        aspectRatio: '1:1',
        quality: 'standard',
        error: 'Content policy violation detected',
        userId: mikeUser.id,
        modelId: modelMap['sdxl-1-0'].id,
      },
    }),
    // Lisa's generations
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Watercolor painting of spring flowers',
        enhancedPrompt: 'Beautiful watercolor painting of spring flowers, soft edges, color bleeding effect, traditional art aesthetic, gallery quality, botanical illustration style',
        status: 'COMPLETED',
        creditsUsed: 2,
        processingTime: 9500,
        width: 1024,
        height: 1024,
        aspectRatio: '1:1',
        quality: 'standard',
        outputUrl: '/placeholder-watercolor.jpg',
        thumbnailUrl: '/placeholder-watercolor-thumb.jpg',
        userId: lisaUser.id,
        modelId: modelMap['sdxl-1-0'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
    }),
    // Additional variety
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Mouthwatering burger with steam rising',
        status: 'COMPLETED',
        creditsUsed: 3,
        processingTime: 11200,
        width: 1024,
        height: 768,
        aspectRatio: '4:3',
        quality: 'high',
        outputUrl: '/placeholder-food.jpg',
        thumbnailUrl: '/placeholder-food-thumb.jpg',
        userId: johnUser.id,
        modelId: modelMap['flux-1'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
    }),
    prisma.generation.create({
      data: {
        type: 'VIDEO',
        promptText: 'Product rotation animation 360 degrees',
        status: 'PENDING',
        creditsUsed: 0,
        width: 1024,
        height: 1024,
        aspectRatio: '1:1',
        quality: 'high',
        userId: emmaUser.id,
        modelId: modelMap['runway-gen3'].id,
      },
    }),
    prisma.generation.create({
      data: {
        type: 'IMAGE',
        promptText: 'Modern minimalist interior design living room',
        status: 'COMPLETED',
        creditsUsed: 4,
        processingTime: 14200,
        width: 1536,
        height: 1024,
        aspectRatio: '3:2',
        quality: 'high',
        outputUrl: '/placeholder-interior.jpg',
        thumbnailUrl: '/placeholder-interior-thumb.jpg',
        userId: lisaUser.id,
        modelId: modelMap['sd3'].id,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      },
    }),
  ]);

  console.log(`   ✅ Created ${generations.length} generations`);

  // ==========================================
  // FLAGGED CONTENT (For moderation panel)
  // ==========================================
  console.log('🚩 Creating flagged content...');

  const flaggedContent = await Promise.all([
    prisma.flaggedContent.create({
      data: {
        type: 'IMAGE',
        reason: 'Potential copyright infringement - resembles trademarked character',
        confidence: 0.85,
        status: 'PENDING',
        reportCount: 3,
        userId: userMap['newuser@gmail.com'].id,
        generationId: generations[0].id,
      },
    }),
    prisma.flaggedContent.create({
      data: {
        type: 'IMAGE',
        reason: 'NSFW content detected',
        confidence: 0.92,
        status: 'PENDING',
        reportCount: 5,
        userId: userMap['suspended@example.com'].id,
        generationId: generations[1].id,
      },
    }),
    prisma.flaggedContent.create({
      data: {
        type: 'IMAGE',
        reason: 'Misleading deepfake-style content',
        confidence: 0.78,
        status: 'PENDING',
        reportCount: 2,
        userId: userMap['david@startup.co'].id,
        generationId: generations[2].id,
      },
    }),
    prisma.flaggedContent.create({
      data: {
        type: 'VIDEO',
        reason: 'Violent or harmful content',
        confidence: 0.67,
        status: 'APPROVED',
        reportCount: 1,
        reviewedBy: 'moderator@promptpal.ai',
        reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        reviewNote: 'False positive - content is artistic representation',
        userId: mikeUser.id,
        generationId: generations[4].id,
      },
    }),
    prisma.flaggedContent.create({
      data: {
        type: 'IMAGE',
        reason: 'Spam or low-quality content',
        confidence: 0.55,
        status: 'REJECTED',
        reportCount: 1,
        reviewedBy: 'admin@promptpal.ai',
        reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        reviewNote: 'Content removed - clearly spam',
        userId: userMap['suspended@example.com'].id,
        generationId: generations[6].id,
      },
    }),
  ]);

  console.log(`   ✅ Created ${flaggedContent.length} flagged content entries`);

  // ==========================================
  // PRICING TIERS
  // ==========================================
  console.log('💰 Creating pricing tiers...');

  const pricingTiers = await Promise.all([
    prisma.pricingTier.create({
      data: {
        plan: 'FREE',
        name: 'Free Trial',
        description: 'Get started with PromptPal',
        credits: 5,
        price: 0,
        features: JSON.stringify(['5 free credits', 'Basic models', 'Standard quality', 'Community support']),
        order: 0,
      },
    }),
    prisma.pricingTier.create({
      data: {
        plan: 'STARTER',
        name: 'Starter',
        description: 'Perfect for individuals',
        credits: 20,
        price: 5,
        features: JSON.stringify(['20 credits/month', 'All image models', 'High quality', 'Email support', 'Prompt library access']),
        order: 1,
      },
    }),
    prisma.pricingTier.create({
      data: {
        plan: 'GROWTH',
        name: 'Growth',
        description: 'For growing creators',
        credits: 50,
        price: 10,
        features: JSON.stringify(['50 credits/month', 'All models', 'Ultra quality', 'Priority support', 'API access', 'Custom templates']),
        isPopular: true,
        order: 2,
      },
    }),
    prisma.pricingTier.create({
      data: {
        plan: 'PROFESSIONAL',
        name: 'Professional',
        description: 'For professionals and teams',
        credits: 100,
        price: 15,
        features: JSON.stringify(['100 credits/month', 'All models', 'Maximum quality', '24/7 support', 'API access', 'Team collaboration', 'Analytics dashboard']),
        order: 3,
      },
    }),
    prisma.pricingTier.create({
      data: {
        plan: 'ENTERPRISE',
        name: 'Enterprise',
        description: 'Custom solutions for organizations',
        credits: 1000,
        price: 99,
        features: JSON.stringify(['1000+ credits/month', 'All models', 'Maximum quality', 'Dedicated support', 'Custom API limits', 'SSO integration', 'SLA guarantee', 'Custom training']),
        order: 4,
      },
    }),
  ]);

  console.log(`   ✅ Created ${pricingTiers.length} pricing tiers`);

  // ==========================================
  // PLATFORM SETTINGS
  // ==========================================
  console.log('⚙️  Creating platform settings...');

  const settings = await Promise.all([
    // General settings
    prisma.platformSetting.create({
      data: { key: 'platform_name', value: 'PromptPal', type: 'string', group: 'general', label: 'Platform Name' },
    }),
    prisma.platformSetting.create({
      data: { key: 'platform_description', value: 'AI-powered content generation platform', type: 'string', group: 'general', label: 'Platform Description' },
    }),
    prisma.platformSetting.create({
      data: { key: 'support_email', value: 'support@promptpal.ai', type: 'string', group: 'general', label: 'Support Email' },
    }),
    prisma.platformSetting.create({
      data: { key: 'maintenance_mode', value: 'false', type: 'boolean', group: 'general', label: 'Maintenance Mode' },
    }),
    // AI settings
    prisma.platformSetting.create({
      data: { key: 'default_model', value: 'sdxl-1-0', type: 'string', group: 'ai', label: 'Default Model' },
    }),
    prisma.platformSetting.create({
      data: { key: 'max_concurrent_jobs', value: '5', type: 'number', group: 'ai', label: 'Max Concurrent Jobs' },
    }),
    prisma.platformSetting.create({
      data: { key: 'nsfw_filter', value: 'true', type: 'boolean', group: 'ai', label: 'NSFW Filter' },
    }),
    prisma.platformSetting.create({
      data: { key: 'prompt_enhancement', value: 'true', type: 'boolean', group: 'ai', label: 'Prompt Enhancement' },
    }),
    // Notification settings
    prisma.platformSetting.create({
      data: { key: 'email_notifications', value: 'true', type: 'boolean', group: 'notifications', label: 'Email Notifications' },
    }),
    prisma.platformSetting.create({
      data: { key: 'slack_integration', value: 'false', type: 'boolean', group: 'notifications', label: 'Slack Integration' },
    }),
    // Security settings
    prisma.platformSetting.create({
      data: { key: 'require_2fa', value: 'false', type: 'boolean', group: 'security', label: 'Require 2FA' },
    }),
    prisma.platformSetting.create({
      data: { key: 'session_timeout', value: '1440', type: 'number', group: 'security', label: 'Session Timeout (minutes)' },
    }),
    prisma.platformSetting.create({
      data: { key: 'rate_limit', value: '100', type: 'number', group: 'security', label: 'Rate Limit (requests/hour)' },
    }),
  ]);

  console.log(`   ✅ Created ${settings.length} platform settings`);

  // ==========================================
  // FAVORITES
  // ==========================================
  console.log('⭐ Creating favorites...');

  const favorites = await Promise.all([
    prisma.favorite.create({
      data: { userId: johnUser.id, promptId: prompts[2].id }, // John favorited Emma's dreamy portrait
    }),
    prisma.favorite.create({
      data: { userId: johnUser.id, promptId: prompts[8].id }, // John favorited cinematic food
    }),
    prisma.favorite.create({
      data: { userId: emmaUser.id, promptId: prompts[0].id }, // Emma favorited John's product shot
    }),
    prisma.favorite.create({
      data: { userId: mikeUser.id, promptId: prompts[3].id }, // Mike favorited fantasy art
    }),
    prisma.favorite.create({
      data: { userId: lisaUser.id, promptId: prompts[2].id }, // Lisa favorited dreamy portrait
    }),
  ]);

  console.log(`   ✅ Created ${favorites.length} favorites`);

  // ==========================================
  // CREDIT TRANSACTIONS
  // ==========================================
  console.log('💳 Creating credit transactions...');

  const transactions = await Promise.all([
    prisma.creditTransaction.create({
      data: {
        userId: johnUser.id,
        amount: 100,
        type: 'PURCHASE',
        description: 'Purchased Professional plan',
        balanceAfter: 345,
      },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: johnUser.id,
        amount: -3,
        type: 'USAGE',
        description: 'Image generation - Flux.1',
        balanceAfter: 342,
      },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: johnUser.id,
        amount: -2,
        type: 'USAGE',
        description: 'Image generation - SDXL 1.0',
        balanceAfter: 340,
      },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: emmaUser.id,
        amount: 50,
        type: 'PURCHASE',
        description: 'Purchased Growth plan',
        balanceAfter: 170,
      },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: emmaUser.id,
        amount: -4,
        type: 'USAGE',
        description: 'Image generation - SD3',
        balanceAfter: 166,
      },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: mikeUser.id,
        amount: 10,
        type: 'BONUS',
        description: 'Referral bonus - invited 2 users',
        balanceAfter: 390,
      },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: lisaUser.id,
        amount: 5,
        type: 'REFUND',
        description: 'Refund for failed generation',
        balanceAfter: 20,
      },
    }),
  ]);

  console.log(`   ✅ Created ${transactions.length} credit transactions`);

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  console.log('🔔 Creating notifications...');

  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        userId: johnUser.id,
        title: 'Generation Complete',
        message: 'Your luxury watch product shot is ready!',
        type: 'SUCCESS',
        link: '/history',
      },
    }),
    prisma.notification.create({
      data: {
        userId: emmaUser.id,
        title: 'New Follower',
        message: 'John Designer started following you',
        type: 'INFO',
      },
    }),
    prisma.notification.create({
      data: {
        userId: mikeUser.id,
        title: 'Generation Failed',
        message: 'Your social media campaign image could not be generated due to content policy',
        type: 'ERROR',
        link: '/history',
      },
    }),
    prisma.notification.create({
      data: {
        userId: lisaUser.id,
        title: 'Credits Low',
        message: 'You have only 15 credits remaining. Consider upgrading your plan.',
        type: 'WARNING',
        link: '/settings',
      },
    }),
    prisma.notification.create({
      data: {
        userId: userMap['admin@promptpal.ai'].id,
        title: 'System Alert',
        message: 'New content flagged for review in moderation queue',
        type: 'SYSTEM',
        link: '/admin/moderation',
      },
    }),
  ]);

  console.log(`   ✅ Created ${notifications.length} notifications`);

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('\n✨ Seeding completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   • ${categories.length} Categories`);
  console.log(`   • ${aiModels.length} AI Models`);
  console.log(`   • ${users.length} Users`);
  console.log(`   • ${templates.length} Prompt Templates`);
  console.log(`   • ${prompts.length} User Prompts`);
  console.log(`   • ${generations.length} Generations`);
  console.log(`   • ${flaggedContent.length} Flagged Content`);
  console.log(`   • ${pricingTiers.length} Pricing Tiers`);
  console.log(`   • ${settings.length} Platform Settings`);
  console.log(`   • ${favorites.length} Favorites`);
  console.log(`   • ${transactions.length} Credit Transactions`);
  console.log(`   • ${notifications.length} Notifications`);

  console.log('\n🔐 Test Accounts:');
  console.log('   Admin:     admin@promptpal.ai / password123');
  console.log('   Moderator: moderator@promptpal.ai / password123');
  console.log('   Pro User:  john@example.com / password123');
  console.log('   User:      emma@studio.com / password123');
  console.log('   Starter:   lisa@freelance.com / password123');
  console.log('   Free:      newuser@gmail.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
