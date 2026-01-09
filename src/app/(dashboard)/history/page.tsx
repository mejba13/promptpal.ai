'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Image,
  Video,
  Filter,
  Download,
  Copy,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Grid3X3,
  List,
  Zap,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const generations = [
  {
    id: 1,
    type: 'image',
    prompt: 'A serene Japanese garden with cherry blossoms in full bloom, traditional stone lantern, koi pond reflection, morning mist',
    enhancedPrompt: 'A serene Japanese garden with cherry blossoms in full bloom, traditional stone lantern, koi pond reflection, morning mist, cinematic lighting, 8K resolution, masterpiece quality',
    model: 'SDXL 1.0',
    status: 'completed',
    creditsUsed: 2,
    processingTime: '4.2s',
    createdAt: '2 hours ago',
    thumbnail: '/placeholder-1.jpg',
  },
  {
    id: 2,
    type: 'image',
    prompt: 'Cyberpunk city skyline at night with neon lights, flying cars, holographic advertisements',
    enhancedPrompt: 'Cyberpunk city skyline at night with neon lights, flying cars, holographic advertisements, rain-soaked streets, blade runner aesthetic, ultra detailed',
    model: 'Flux.1',
    status: 'completed',
    creditsUsed: 3,
    processingTime: '5.8s',
    createdAt: '5 hours ago',
    thumbnail: '/placeholder-2.jpg',
  },
  {
    id: 3,
    type: 'video',
    prompt: 'Ocean waves crashing on a tropical beach, golden sunset, palm trees swaying',
    enhancedPrompt: 'Ocean waves crashing on a tropical beach, golden sunset, palm trees swaying, 4K quality, smooth motion, seamless loop',
    model: 'AnimateDiff',
    status: 'completed',
    creditsUsed: 10,
    processingTime: '32.5s',
    createdAt: '1 day ago',
    thumbnail: '/placeholder-3.jpg',
  },
  {
    id: 4,
    type: 'image',
    prompt: 'Professional headshot portrait, soft studio lighting, neutral gray background',
    enhancedPrompt: null,
    model: 'DALL-E 3',
    status: 'failed',
    creditsUsed: 0,
    processingTime: null,
    createdAt: '1 day ago',
    error: 'Content policy violation detected',
    thumbnail: null,
  },
  {
    id: 5,
    type: 'image',
    prompt: 'Modern minimalist living room interior, large windows, natural light, Scandinavian design',
    enhancedPrompt: 'Modern minimalist living room interior, large windows flooding natural light, Scandinavian design furniture, indoor plants, architectural photography style',
    model: 'SDXL 1.0',
    status: 'processing',
    creditsUsed: 2,
    processingTime: null,
    createdAt: 'Just now',
    thumbnail: null,
  },
  {
    id: 6,
    type: 'image',
    prompt: 'Fantasy dragon flying over mountain peaks, dramatic clouds, epic scale',
    enhancedPrompt: 'Fantasy dragon flying over mountain peaks, dramatic clouds, epic scale, concept art style, detailed scales, magical atmosphere, cinematic composition',
    model: 'Stable Diffusion 3',
    status: 'completed',
    creditsUsed: 4,
    processingTime: '6.1s',
    createdAt: '2 days ago',
    thumbnail: '/placeholder-6.jpg',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    color: 'text-green-600 bg-green-100',
  },
  processing: {
    icon: Loader2,
    label: 'Processing',
    color: 'text-blue-600 bg-blue-100',
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    color: 'text-red-600 bg-red-100',
  },
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'failed'>('all');

  const filteredGenerations = generations.filter((gen) => {
    const matchesSearch = gen.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || gen.type === filterType;
    const matchesStatus = filterStatus === 'all' || gen.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalCreditsUsed = generations.reduce((sum, g) => sum + g.creditsUsed, 0);
  const completedCount = generations.filter((g) => g.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Generation History</h1>
          <p className="text-muted-foreground">
            View and manage all your AI-generated content
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                <Image className="w-5 h-5 text-mint-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{generations.length}</p>
                <p className="text-xs text-muted-foreground">Total Generations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCreditsUsed}</p>
                <p className="text-xs text-muted-foreground">Credits Used</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.8s</p>
                <p className="text-xs text-muted-foreground">Avg. Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
          <Tabs value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
          </Tabs>
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

      {/* Generation List */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {filteredGenerations.map((gen, index) => {
          const status = statusConfig[gen.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={gen.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border/50 hover:shadow-soft transition-shadow">
                <CardContent className={viewMode === 'list' ? 'p-4' : 'p-4'}>
                  <div className={viewMode === 'list' ? 'flex gap-4' : ''}>
                    {/* Thumbnail */}
                    <div
                      className={`${
                        viewMode === 'list' ? 'w-24 h-24' : 'w-full h-40 mb-4'
                      } rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden`}
                    >
                      {gen.status === 'processing' ? (
                        <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                      ) : gen.status === 'failed' ? (
                        <XCircle className="w-8 h-8 text-red-400" />
                      ) : gen.type === 'video' ? (
                        <Video className="w-8 h-8 text-muted-foreground" />
                      ) : (
                        <Image className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`${status.color} text-xs`}
                          >
                            <StatusIcon
                              className={`w-3 h-3 mr-1 ${
                                gen.status === 'processing' ? 'animate-spin' : ''
                              }`}
                            />
                            {status.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {gen.type}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {gen.status === 'completed' && (
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy prompt
                            </DropdownMenuItem>
                            {gen.status === 'failed' && (
                              <DropdownMenuItem>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Retry
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm line-clamp-2 mb-2">{gen.prompt}</p>

                      {gen.error && (
                        <p className="text-xs text-red-500 mb-2">{gen.error}</p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {gen.createdAt}
                        </span>
                        <span>{gen.model}</span>
                        {gen.processingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {gen.processingTime}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {gen.creditsUsed} credits
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredGenerations.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-1">No generations found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
