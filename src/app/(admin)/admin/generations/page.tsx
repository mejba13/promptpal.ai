'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles,
  Calendar,
  User,
  Cpu,
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
import { cn } from '@/lib/utils';

const generations = [
  {
    id: 'gen_001',
    type: 'image',
    prompt: 'A serene mountain landscape at sunset with golden light reflecting on a calm lake',
    model: 'SDXL 1.0',
    status: 'completed',
    credits: 2,
    user: 'sarah@example.com',
    userName: 'Sarah Wilson',
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
    userName: 'Michael Chen',
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
    userName: 'Emily Davis',
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
    userName: 'James Brown',
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
    userName: 'Lisa Anderson',
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
    userName: 'David Miller',
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
    userName: 'Jennifer Taylor',
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
    userName: 'Robert Garcia',
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

const tabs = [
  { id: 'all', label: 'All', count: generations.length },
  { id: 'images', label: 'Images', count: generations.filter(g => g.type === 'image').length },
  { id: 'videos', label: 'Videos', count: generations.filter(g => g.type === 'video').length },
  { id: 'processing', label: 'Processing', count: generations.filter(g => g.status === 'processing' || g.status === 'queued').length },
  { id: 'failed', label: 'Failed', count: generations.filter(g => g.status === 'failed').length },
];

export default function GenerationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<typeof generations[0] | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredGenerations = () => {
    let filtered = generations;

    // Filter by tab
    if (activeTab === 'images') {
      filtered = filtered.filter(g => g.type === 'image');
    } else if (activeTab === 'videos') {
      filtered = filtered.filter(g => g.type === 'video');
    } else if (activeTab === 'processing') {
      filtered = filtered.filter(g => g.status === 'processing' || g.status === 'queued');
    } else if (activeTab === 'failed') {
      filtered = filtered.filter(g => g.status === 'failed');
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (gen) =>
          gen.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gen.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gen.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gen.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredGenerations = getFilteredGenerations();

  const handleViewGeneration = (gen: typeof generations[0]) => {
    setSelectedGeneration(gen);
    setShowDetailDialog(true);
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
      completed: {
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
      },
      processing: {
        icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
      },
      queued: {
        icon: <Clock className="w-3.5 h-3.5" />,
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
      },
      failed: {
        icon: <XCircle className="w-3.5 h-3.5" />,
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
      },
    };
    return configs[status] || configs.completed;
  };

  const totalPages = Math.ceil(filteredGenerations.length / 10);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Generations</h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage all AI-generated content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-to-r from-mint-500 to-mint-600 text-white hover:from-mint-600 hover:to-mint-700 shadow-lg shadow-mint-500/25 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Generations */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint-500/10 to-mint-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/25">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {(stats.totalGenerations / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-gray-500">Total Generations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Generations */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.todayGenerations.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Today&apos;s Generations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stats.successRate}%</p>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg Processing Time */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stats.avgProcessingTime}</p>
                <p className="text-sm text-gray-500">Avg Processing Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generations List Card */}
      <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">All Generations</CardTitle>
                <p className="text-sm text-gray-500">Browse and manage generated content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by prompt, user, or ID..."
                  className="pl-10 w-full lg:w-80 h-10 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                )}
              >
                {tab.label}
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  activeTab === tab.id
                    ? 'bg-mint-100 text-mint-700'
                    : 'bg-gray-100 text-gray-500'
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Generations List */}
          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {filteredGenerations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No generations found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                </motion.div>
              ) : (
                filteredGenerations.map((gen, index) => (
                  <motion.div
                    key={gen.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.02 }}
                    className="p-4 hover:bg-gray-50/80 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shrink-0 border border-gray-200/80">
                        {gen.type === 'video' ? (
                          <Video className="w-8 h-8 text-gray-400" />
                        ) : (
                          <Image className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Status Badge */}
                            {(() => {
                              const config = getStatusConfig(gen.status);
                              return (
                                <span className={cn(
                                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border',
                                  config.bg, config.text, config.border
                                )}>
                                  {config.icon}
                                  <span className="capitalize">{gen.status}</span>
                                </span>
                              );
                            })()}
                            {/* Model Badge */}
                            <Badge variant="outline" className="text-xs rounded-lg border-gray-200 text-gray-600">
                              <Cpu className="w-3 h-3 mr-1" />
                              {gen.model}
                            </Badge>
                            {/* Type Badge */}
                            <Badge variant="outline" className="text-xs rounded-lg border-gray-200 text-gray-600">
                              {gen.type === 'video' ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <Image className="w-3 h-3 mr-1" />
                              )}
                              {gen.type}
                            </Badge>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-gray-100">
                                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-gray-200">
                              <DropdownMenuItem onClick={() => handleViewGeneration(gen)} className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="rounded-lg">
                                <Flag className="w-4 h-4 mr-2" />
                                Flag Content
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 rounded-lg focus:text-red-600 focus:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm font-medium text-gray-900 mt-2 line-clamp-2">
                          {gen.prompt}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {gen.userName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {gen.createdAt}
                          </span>
                          <span>{gen.resolution}</span>
                          {gen.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {gen.duration}
                            </span>
                          )}
                          <span className="text-mint-600 font-semibold">
                            {gen.credits} credits
                          </span>
                        </div>

                        {gen.error && (
                          <div className="mt-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100">
                            <p className="text-xs text-red-600">
                              <strong>Error:</strong> {gen.error}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredGenerations.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="rounded-lg border-gray-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                      currentPage === page
                        ? 'bg-mint-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="rounded-lg border-gray-200"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-lg rounded-2xl border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Generation Details</DialogTitle>
            <DialogDescription className="font-mono text-xs">
              {selectedGeneration?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedGeneration && (
            <div className="space-y-5">
              {/* Preview */}
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200">
                {selectedGeneration.type === 'video' ? (
                  <Video className="w-16 h-16 text-gray-300" />
                ) : (
                  <Image className="w-16 h-16 text-gray-300" />
                )}
              </div>

              {/* Prompt */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Prompt</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedGeneration.prompt}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Model</p>
                  <p className="font-medium text-gray-900">{selectedGeneration.model}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  {(() => {
                    const config = getStatusConfig(selectedGeneration.status);
                    return (
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium',
                        config.bg, config.text
                      )}>
                        {config.icon}
                        <span className="capitalize">{selectedGeneration.status}</span>
                      </span>
                    );
                  })()}
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Resolution</p>
                  <p className="font-medium text-gray-900">{selectedGeneration.resolution}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Credits Used</p>
                  <p className="font-medium text-mint-600">{selectedGeneration.credits} credits</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">User</p>
                  <p className="font-medium text-gray-900">{selectedGeneration.userName}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Duration</p>
                  <p className="font-medium text-gray-900">{selectedGeneration.duration || 'N/A'}</p>
                </div>
              </div>

              {selectedGeneration.error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-sm text-red-700">
                    <strong className="font-semibold">Error:</strong> {selectedGeneration.error}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDetailDialog(false)} className="rounded-xl">
              Close
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Flag className="w-4 h-4 mr-2" />
              Flag
            </Button>
            <Button className="bg-gradient-to-r from-mint-500 to-mint-600 text-white hover:from-mint-600 hover:to-mint-700 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
