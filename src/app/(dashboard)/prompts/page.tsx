'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Star,
  Copy,
  Trash2,
  Image,
  Video,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Clock,
  TrendingUp,
  Sparkles,
  Heart,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const savedPrompts = [
  {
    id: 1,
    title: 'Product Photography',
    prompt: 'Professional product photo on clean white background, studio lighting, soft shadows, high detail, commercial quality, centered composition',
    category: 'E-commerce',
    type: 'image',
    isFavorite: true,
    usageCount: 47,
    lastUsed: '2 hours ago',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Social Media Banner',
    prompt: 'Modern social media banner, gradient background, bold typography, minimalist design, engaging visual hierarchy, brand-friendly',
    category: 'Marketing',
    type: 'image',
    isFavorite: true,
    usageCount: 32,
    lastUsed: '1 day ago',
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Portrait Enhancement',
    prompt: 'Professional portrait, soft natural lighting, shallow depth of field, warm tones, elegant background blur, magazine quality',
    category: 'Portrait',
    type: 'image',
    isFavorite: false,
    usageCount: 28,
    lastUsed: '3 days ago',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Animated Product Showcase',
    prompt: 'Smooth 360-degree product rotation, clean background, professional lighting, seamless loop, high quality render',
    category: 'Video',
    type: 'video',
    isFavorite: true,
    usageCount: 15,
    lastUsed: '1 week ago',
    rating: 4.9,
  },
  {
    id: 5,
    title: 'Landscape Wallpaper',
    prompt: 'Breathtaking landscape, golden hour lighting, dramatic clouds, vivid colors, ultra-wide composition, 4K resolution, serene atmosphere',
    category: 'Art',
    type: 'image',
    isFavorite: false,
    usageCount: 22,
    lastUsed: '2 days ago',
    rating: 4.6,
  },
  {
    id: 6,
    title: 'Tech UI Mockup',
    prompt: 'Modern app interface mockup, clean design, gradient accents, realistic device frame, professional presentation, dark theme',
    category: 'Design',
    type: 'image',
    isFavorite: false,
    usageCount: 19,
    lastUsed: '4 days ago',
    rating: 4.4,
  },
];

const templateCategories = [
  { name: 'All', count: 24 },
  { name: 'E-commerce', count: 6 },
  { name: 'Marketing', count: 5 },
  { name: 'Portrait', count: 4 },
  { name: 'Art', count: 5 },
  { name: 'Video', count: 4 },
];

const communityPrompts = [
  {
    id: 101,
    title: 'Cyberpunk City',
    prompt: 'Futuristic cyberpunk cityscape, neon lights, rain-soaked streets, holographic advertisements, blade runner aesthetic',
    author: 'CyberArtist',
    likes: 1247,
    uses: 3420,
  },
  {
    id: 102,
    title: 'Fantasy Character',
    prompt: 'Epic fantasy character portrait, detailed armor, magical aura, dramatic lighting, concept art style',
    author: 'FantasyMaster',
    likes: 892,
    uses: 2156,
  },
  {
    id: 103,
    title: 'Minimalist Logo',
    prompt: 'Clean minimalist logo design, geometric shapes, single color, scalable vector style, modern branding',
    author: 'DesignPro',
    likes: 756,
    uses: 1893,
  },
];

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPrompts = savedPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || prompt.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Prompts Library</h1>
          <p className="text-muted-foreground">
            Save, organize, and reuse your best prompts
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-mint">
          <Plus className="w-4 h-4 mr-2" />
          New Prompt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-mint-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{savedPrompts.length}</p>
                <p className="text-xs text-muted-foreground">Saved Prompts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {savedPrompts.filter((p) => p.isFavorite).length}
                </p>
                <p className="text-xs text-muted-foreground">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {savedPrompts.reduce((sum, p) => sum + p.usageCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Uses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2h</p>
                <p className="text-xs text-muted-foreground">Last Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-prompts" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="my-prompts">My Prompts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* My Prompts Tab */}
        <TabsContent value="my-prompts" className="space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {templateCategories.map((cat) => (
              <Button
                key={cat.name}
                variant={activeCategory === cat.name ? 'default' : 'outline'}
                size="sm"
                className={
                  activeCategory === cat.name
                    ? 'bg-mint-500 hover:bg-mint-600'
                    : ''
                }
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {cat.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Prompts Grid */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
            }
          >
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border/50 hover:shadow-soft transition-shadow group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            prompt.type === 'video'
                              ? 'bg-purple-100'
                              : 'bg-mint-100'
                          }`}
                        >
                          {prompt.type === 'video' ? (
                            <Video className="w-4 h-4 text-purple-600" />
                          ) : (
                            <Image className="w-4 h-4 text-mint-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{prompt.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {prompt.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${
                            prompt.isFavorite ? 'text-amber-500' : ''
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              prompt.isFavorite ? 'fill-amber-500' : ''
                            }`}
                          />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy prompt
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Use in generator
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {prompt.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Used {prompt.usageCount} times</span>
                      <span>{prompt.lastUsed}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <p className="text-muted-foreground">
            Browse our curated collection of prompt templates for common use cases.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedPrompts.slice(0, 6).map((template, index) => (
              <Card key={template.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{template.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {template.rating}
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {template.prompt}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-4">
          <p className="text-muted-foreground">
            Discover popular prompts shared by the community.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityPrompts.map((prompt) => (
              <Card key={prompt.id} className="border-border/50">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{prompt.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {prompt.prompt}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground">
                      by {prompt.author}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {prompt.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        {prompt.uses}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Save to Library
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
