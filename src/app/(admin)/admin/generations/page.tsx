'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Image,
  Video,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Flag,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Zap,
  TrendingUp,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const generations = [
  {
    id: 'gen_001',
    type: 'image',
    prompt: 'A serene mountain landscape at sunset with golden light reflecting on a calm lake',
    model: 'SDXL 1.0',
    status: 'completed',
    credits: 2,
    user: 'sarah@example.com',
    createdAt: '2 hours ago',
    duration: '12s',
    resolution: '1024x1024',
  },
  {
    id: 'gen_002',
    type: 'image',
    prompt: 'Cyberpunk city street at night with neon lights and flying cars',
    model: 'Flux.1',
    status: 'completed',
    credits: 3,
    user: 'michael@example.com',
    createdAt: '3 hours ago',
    duration: '18s',
    resolution: '1344x768',
  },
  {
    id: 'gen_003',
    type: 'video',
    prompt: 'Abstract fluid animation with vibrant colors morphing shapes',
    model: 'AnimateDiff',
    status: 'processing',
    credits: 10,
    user: 'emily@example.com',
    createdAt: '5 min ago',
    duration: null,
    resolution: '512x512',
  },
  {
    id: 'gen_004',
    type: 'image',
    prompt: 'Portrait of a fantasy elf warrior in detailed armor',
    model: 'SDXL 1.0',
    status: 'failed',
    credits: 0,
    user: 'james@example.com',
    createdAt: '4 hours ago',
    duration: null,
    resolution: '1024x1024',
    error: 'NSFW content detected',
  },
  {
    id: 'gen_005',
    type: 'image',
    prompt: 'Minimalist logo design for a tech startup with geometric shapes',
    model: 'DALL-E 3',
    status: 'completed',
    credits: 4,
    user: 'lisa@example.com',
    createdAt: '6 hours ago',
    duration: '8s',
    resolution: '1024x1024',
  },
  {
    id: 'gen_006',
    type: 'image',
    prompt: 'Photorealistic food photography of gourmet pasta dish',
    model: 'Stable Diffusion 3',
    status: 'completed',
    credits: 4,
    user: 'david@example.com',
    createdAt: '8 hours ago',
    duration: '15s',
    resolution: '1152x896',
  },
  {
    id: 'gen_007',
    type: 'video',
    prompt: 'Ocean waves crashing on rocky shore in slow motion',
    model: 'AnimateDiff',
    status: 'queued',
    credits: 10,
    user: 'jennifer@example.com',
    createdAt: '1 min ago',
    duration: null,
    resolution: '768x768',
  },
  {
    id: 'gen_008',
    type: 'image',
    prompt: 'Vintage retro poster design for music festival',
    model: 'SDXL 1.0',
    status: 'completed',
    credits: 2,
    user: 'robert@example.com',
    createdAt: '1 day ago',
    duration: '10s',
    resolution: '832x1216',
  },
];

const stats = {
  totalGenerations: 1234567,
  todayGenerations: 4521,
  successRate: 98.5,
  avgProcessingTime: '14s',
};

export default function GenerationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<typeof generations[0] | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGenerations = generations.filter(
    (gen) =>
      gen.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gen.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gen.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewGeneration = (gen: typeof generations[0]) => {
    setSelectedGeneration(gen);
    setShowDetailDialog(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'queued':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      queued: 'bg-amber-100 text-amber-700',
      failed: 'bg-red-100 text-red-700',
    };
    return (
      <Badge variant="secondary" className={styles[status] || ''}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Generations</h1>
          <p className="text-muted-foreground">
            Monitor and manage all AI generations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
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
                <p className="text-2xl font-bold">{(stats.totalGenerations / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Total Generations</p>
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
                <p className="text-2xl font-bold">{stats.todayGenerations.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
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
                <p className="text-2xl font-bold">{stats.avgProcessingTime}</p>
                <p className="text-xs text-muted-foreground">Avg Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generations List */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg">All Generations</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by prompt, user, or ID..."
                  className="pl-9 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-3">
                {filteredGenerations.map((gen, index) => (
                  <motion.div
                    key={gen.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card className="border-border/50 hover:border-mint-200 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Thumbnail placeholder */}
                          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            {gen.type === 'video' ? (
                              <Video className="w-8 h-8 text-muted-foreground" />
                            ) : (
                              <Image className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                {getStatusBadge(gen.status)}
                                <Badge variant="outline" className="text-xs">
                                  {gen.model}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {gen.id}
                                </span>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewGeneration(gen)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Flag className="w-4 h-4 mr-2" />
                                    Flag Content
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <p className="text-sm font-medium mb-2 line-clamp-2">
                              {gen.prompt}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{gen.user}</span>
                              <span>{gen.resolution}</span>
                              <span>{gen.createdAt}</span>
                              {gen.duration && <span>Duration: {gen.duration}</span>}
                              <span className="text-mint-600 font-medium">{gen.credits} credits</span>
                            </div>

                            {gen.error && (
                              <p className="text-xs text-red-500 mt-2">
                                Error: {gen.error}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredGenerations.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-sm px-3">Page {currentPage}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images">
              <p className="text-muted-foreground text-center py-8">
                Showing {generations.filter(g => g.type === 'image').length} image generations
              </p>
            </TabsContent>
            <TabsContent value="videos">
              <p className="text-muted-foreground text-center py-8">
                Showing {generations.filter(g => g.type === 'video').length} video generations
              </p>
            </TabsContent>
            <TabsContent value="failed">
              <p className="text-muted-foreground text-center py-8">
                Showing {generations.filter(g => g.status === 'failed').length} failed generations
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Generation Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Generation Details</DialogTitle>
            <DialogDescription>
              {selectedGeneration?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedGeneration && (
            <div className="space-y-4">
              <div className="w-full h-48 rounded-lg bg-muted flex items-center justify-center">
                {selectedGeneration.type === 'video' ? (
                  <Video className="w-12 h-12 text-muted-foreground" />
                ) : (
                  <Image className="w-12 h-12 text-muted-foreground" />
                )}
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-1">Prompt</p>
                <p className="text-sm text-muted-foreground">
                  {selectedGeneration.prompt}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Model</p>
                  <p className="font-medium">{selectedGeneration.model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedGeneration.status)}</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Resolution</p>
                  <p className="font-medium">{selectedGeneration.resolution}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Credits Used</p>
                  <p className="font-medium">{selectedGeneration.credits}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">User</p>
                  <p className="font-medium">{selectedGeneration.user}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedGeneration.duration || 'N/A'}</p>
                </div>
              </div>

              {selectedGeneration.error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">
                    <strong>Error:</strong> {selectedGeneration.error}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Flag className="w-4 h-4 mr-2" />
              Flag
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
