'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Ban,
  Flag,
  Image,
  Video,
  Clock,
  User,
  MoreHorizontal,
  Shield,
  MessageSquare,
  Filter,
  ChevronRight,
  Search,
  Calendar,
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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const flaggedContent = [
  {
    id: 1,
    type: 'image',
    prompt: 'Violent scene with weapons and blood',
    user: 'user123@example.com',
    userName: 'John Doe',
    userId: 'usr_12345',
    reason: 'Violence/Gore',
    confidence: 0.92,
    status: 'pending',
    createdAt: '2 hours ago',
    reportCount: 3,
  },
  {
    id: 2,
    type: 'image',
    prompt: 'Celebrity deepfake portrait',
    user: 'creator456@example.com',
    userName: 'Jane Smith',
    userId: 'usr_67890',
    reason: 'Non-consensual imagery',
    confidence: 0.88,
    status: 'pending',
    createdAt: '5 hours ago',
    reportCount: 1,
  },
  {
    id: 3,
    type: 'video',
    prompt: 'Fake news video about political figure',
    user: 'media789@example.com',
    userName: 'Media Corp',
    userId: 'usr_11122',
    reason: 'Misinformation',
    confidence: 0.75,
    status: 'pending',
    createdAt: '1 day ago',
    reportCount: 5,
  },
  {
    id: 4,
    type: 'image',
    prompt: 'Graphic medical imagery',
    user: 'health101@example.com',
    userName: 'Dr. Health',
    userId: 'usr_33344',
    reason: 'Disturbing content',
    confidence: 0.68,
    status: 'reviewed',
    resolution: 'approved',
    createdAt: '2 days ago',
    reportCount: 0,
  },
  {
    id: 5,
    type: 'image',
    prompt: 'Copyrighted character reproduction',
    user: 'artist555@example.com',
    userName: 'Artist Pro',
    userId: 'usr_55566',
    reason: 'Copyright violation',
    confidence: 0.85,
    status: 'reviewed',
    resolution: 'removed',
    createdAt: '3 days ago',
    reportCount: 2,
  },
];

const stats = {
  pending: flaggedContent.filter((c) => c.status === 'pending').length,
  reviewed: flaggedContent.filter((c) => c.status === 'reviewed').length,
  approved: flaggedContent.filter((c) => c.resolution === 'approved').length,
  removed: flaggedContent.filter((c) => c.resolution === 'removed').length,
};

const tabs = [
  { id: 'pending', label: 'Pending Review', count: stats.pending },
  { id: 'reviewed', label: 'Reviewed', count: stats.reviewed },
  { id: 'all', label: 'All Items', count: flaggedContent.length },
];

export default function ModerationPage() {
  const [selectedContent, setSelectedContent] = useState<typeof flaggedContent[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [moderationNote, setModerationNote] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const handleReview = (content: typeof flaggedContent[0]) => {
    setSelectedContent(content);
    setShowDialog(true);
  };

  const handleApprove = () => {
    setShowDialog(false);
    setModerationNote('');
  };

  const handleReject = () => {
    setShowDialog(false);
    setModerationNote('');
  };

  const getFilteredContent = () => {
    let filtered = flaggedContent;

    if (activeTab === 'pending') {
      filtered = filtered.filter(c => c.status === 'pending');
    } else if (activeTab === 'reviewed') {
      filtered = filtered.filter(c => c.status === 'reviewed');
    }

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredContent = getFilteredContent();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-red-600 bg-red-50';
    if (confidence >= 0.7) return 'text-amber-600 bg-amber-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Content Moderation</h1>
          <p className="text-gray-500 mt-1">
            Review flagged content and enforce community guidelines
          </p>
        </div>
        <div className="flex items-center gap-3">
          {stats.pending > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700">{stats.pending} Pending Review</span>
            </div>
          )}
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-sm text-gray-500">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviewed */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stats.reviewed}</p>
                <p className="text-sm text-gray-500">Reviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approved */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Removed */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stats.removed}</p>
                <p className="text-sm text-gray-500">Removed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content List Card */}
      <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Flagged Content</CardTitle>
                <p className="text-sm text-gray-500">Review and moderate flagged items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  className="pl-10 w-full lg:w-64 h-10 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
                <Filter className="w-4 h-4" />
              </Button>
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
                    ? tab.id === 'pending' ? 'bg-red-100 text-red-700' : 'bg-mint-100 text-mint-700'
                    : 'bg-gray-100 text-gray-500'
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Content List */}
          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {filteredContent.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-gray-700 font-medium">All caught up!</p>
                  <p className="text-sm text-gray-400 mt-1">No content pending review</p>
                </motion.div>
              ) : (
                filteredContent.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.02 }}
                    className="p-4 hover:bg-gray-50/80 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shrink-0 border border-gray-200/80">
                        {content.type === 'video' ? (
                          <Video className="w-10 h-10 text-gray-400" />
                        ) : (
                          <Image className="w-10 h-10 text-gray-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Reason Badge */}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              <Flag className="w-3 h-3" />
                              {content.reason}
                            </span>
                            {/* Type Badge */}
                            <Badge variant="outline" className="text-xs rounded-lg border-gray-200 text-gray-600 capitalize">
                              {content.type === 'video' ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <Image className="w-3 h-3 mr-1" />
                              )}
                              {content.type}
                            </Badge>
                            {/* Confidence */}
                            <span className={cn(
                              'text-xs font-medium px-2 py-0.5 rounded-lg',
                              getConfidenceColor(content.confidence)
                            )}>
                              {(content.confidence * 100).toFixed(0)}% confidence
                            </span>
                            {/* Status for reviewed items */}
                            {content.status === 'reviewed' && content.resolution && (
                              <span className={cn(
                                'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-lg',
                                content.resolution === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-red-50 text-red-700'
                              )}>
                                {content.resolution === 'approved' ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                  <XCircle className="w-3 h-3" />
                                )}
                                {content.resolution}
                              </span>
                            )}
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-gray-100">
                                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-gray-200">
                              <DropdownMenuItem onClick={() => handleReview(content)} className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                Review Content
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg">
                                <User className="w-4 h-4 mr-2" />
                                View User Profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 rounded-lg focus:text-red-600 focus:bg-red-50">
                                <Ban className="w-4 h-4 mr-2" />
                                Ban User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm font-medium text-gray-900 mt-2">
                          Prompt: &ldquo;{content.prompt}&rdquo;
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {content.userName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {content.createdAt}
                          </span>
                          {content.reportCount > 0 && (
                            <span className="flex items-center gap-1 text-amber-600 font-medium">
                              <MessageSquare className="w-3.5 h-3.5" />
                              {content.reportCount} reports
                            </span>
                          )}
                        </div>

                        {/* Actions for pending items */}
                        {content.status === 'pending' && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg shadow-emerald-500/20"
                              onClick={() => handleReview(content)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-1.5" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="rounded-lg shadow-lg shadow-red-500/20"
                              onClick={() => handleReview(content)}
                            >
                              <XCircle className="w-4 h-4 mr-1.5" />
                              Remove
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg border-gray-200">
                              <Eye className="w-4 h-4 mr-1.5" />
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {filteredContent.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredContent.length}</span> items
              </p>
              <Button variant="ghost" className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 rounded-xl">
                View all flagged content
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg rounded-2xl border-gray-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              Review Content
            </DialogTitle>
            <DialogDescription>
              Review this flagged content and take appropriate action.
            </DialogDescription>
          </DialogHeader>

          {selectedContent && (
            <div className="space-y-5">
              {/* Preview */}
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200">
                {selectedContent.type === 'video' ? (
                  <Video className="w-16 h-16 text-gray-300" />
                ) : (
                  <Image className="w-16 h-16 text-gray-300" />
                )}
              </div>

              {/* Prompt */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Flagged Prompt</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  &ldquo;{selectedContent.prompt}&rdquo;
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Reason</p>
                  <p className="font-medium text-gray-900">{selectedContent.reason}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Confidence</p>
                  <p className={cn(
                    'font-medium',
                    selectedContent.confidence >= 0.9 ? 'text-red-600' :
                    selectedContent.confidence >= 0.7 ? 'text-amber-600' : 'text-blue-600'
                  )}>
                    {(selectedContent.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">User</p>
                  <p className="font-medium text-gray-900">{selectedContent.userName}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Reports</p>
                  <p className="font-medium text-gray-900">{selectedContent.reportCount}</p>
                </div>
              </div>

              {/* Moderation Note */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Moderation Note</p>
                <Textarea
                  placeholder="Add a note about your decision..."
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
              onClick={handleApprove}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button variant="destructive" onClick={handleReject} className="rounded-xl">
              <XCircle className="w-4 h-4 mr-2" />
              Remove & Warn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
