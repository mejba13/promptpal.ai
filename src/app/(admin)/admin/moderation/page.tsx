'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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

const flaggedContent = [
  {
    id: 1,
    type: 'image',
    prompt: 'Violent scene with weapons and blood',
    user: 'user123@example.com',
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

export default function ModerationPage() {
  const [selectedContent, setSelectedContent] = useState<typeof flaggedContent[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [moderationNote, setModerationNote] = useState('');

  const handleReview = (content: typeof flaggedContent[0]) => {
    setSelectedContent(content);
    setShowDialog(true);
  };

  const handleApprove = () => {
    // Handle approval logic
    setShowDialog(false);
    setModerationNote('');
  };

  const handleReject = () => {
    // Handle rejection logic
    setShowDialog(false);
    setModerationNote('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Moderation</h1>
          <p className="text-muted-foreground">
            Review flagged content and enforce community guidelines
          </p>
        </div>
        <Badge variant="destructive" className="px-3 py-1">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {stats.pending} Pending Review
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.reviewed}</p>
                <p className="text-xs text-muted-foreground">Reviewed</p>
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
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.removed}</p>
                <p className="text-xs text-muted-foreground">Removed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content List */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2">{stats.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {flaggedContent
            .filter((c) => c.status === 'pending')
            .map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Thumbnail placeholder */}
                      <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {content.type === 'video' ? (
                          <Video className="w-8 h-8 text-muted-foreground" />
                        ) : (
                          <Image className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="destructive" className="text-xs">
                              <Flag className="w-3 h-3 mr-1" />
                              {content.reason}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {content.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Confidence: {(content.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleReview(content)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Review
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2" />
                                View user
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Ban className="w-4 h-4 mr-2" />
                                Ban user
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm font-medium mb-1 line-clamp-1">
                          Prompt: "{content.prompt}"
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {content.user}
                          </span>
                          <span>{content.createdAt}</span>
                          {content.reportCount > 0 && (
                            <span className="flex items-center gap-1 text-amber-600">
                              <MessageSquare className="w-3 h-3" />
                              {content.reportCount} reports
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleReview(content)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReview(content)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {flaggedContent
            .filter((c) => c.status === 'reviewed')
            .map((content) => (
              <Card key={content.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        {content.type === 'video' ? (
                          <Video className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          <Image className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">
                          {content.prompt}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {content.user} · {content.createdAt}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        content.resolution === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }
                    >
                      {content.resolution === 'approved' ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {content.resolution}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <p className="text-muted-foreground">
            Showing all {flaggedContent.length} flagged items.
          </p>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Review Content
            </DialogTitle>
            <DialogDescription>
              Review this flagged content and take appropriate action.
            </DialogDescription>
          </DialogHeader>

          {selectedContent && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium mb-2">Prompt:</p>
                <p className="text-sm text-muted-foreground">
                  "{selectedContent.prompt}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Reason</p>
                  <p className="font-medium">{selectedContent.reason}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="font-medium">
                    {(selectedContent.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">User</p>
                  <p className="font-medium">{selectedContent.user}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reports</p>
                  <p className="font-medium">{selectedContent.reportCount}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Moderation Note</p>
                <Textarea
                  placeholder="Add a note about your decision..."
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="w-4 h-4 mr-1" />
              Remove & Warn User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
