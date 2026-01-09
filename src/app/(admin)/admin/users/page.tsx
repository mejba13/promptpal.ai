'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Ban,
  Shield,
  CreditCard,
  Eye,
  UserPlus,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UserCheck,
  UserX,
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

const users = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/avatars/1.jpg',
    plan: 'Pro',
    credits: 485,
    totalSpent: 149.99,
    generations: 234,
    status: 'active',
    role: 'user',
    joinedAt: '2024-01-15',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: '/avatars/2.jpg',
    plan: 'Starter',
    credits: 12,
    totalSpent: 29.99,
    generations: 45,
    status: 'active',
    role: 'user',
    joinedAt: '2024-02-20',
    lastActive: '5 hours ago',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: '/avatars/3.jpg',
    plan: 'Enterprise',
    credits: 2500,
    totalSpent: 999.99,
    generations: 1250,
    status: 'active',
    role: 'user',
    joinedAt: '2023-11-10',
    lastActive: '1 day ago',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: '/avatars/4.jpg',
    plan: 'Pro',
    credits: 0,
    totalSpent: 89.99,
    generations: 156,
    status: 'suspended',
    role: 'user',
    joinedAt: '2024-01-05',
    lastActive: '2 days ago',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    avatar: '/avatars/5.jpg',
    plan: 'Starter',
    credits: 20,
    totalSpent: 9.99,
    generations: 12,
    status: 'pending',
    role: 'user',
    joinedAt: '2024-03-01',
    lastActive: '3 days ago',
  },
  {
    id: 6,
    name: 'David Brown',
    email: 'david@example.com',
    avatar: '/avatars/6.jpg',
    plan: 'Pro',
    credits: 150,
    totalSpent: 199.99,
    generations: 389,
    status: 'active',
    role: 'moderator',
    joinedAt: '2023-09-15',
    lastActive: '30 min ago',
  },
  {
    id: 7,
    name: 'Jennifer Martinez',
    email: 'jennifer@example.com',
    avatar: '/avatars/7.jpg',
    plan: 'Enterprise',
    credits: 1800,
    totalSpent: 599.99,
    generations: 890,
    status: 'active',
    role: 'user',
    joinedAt: '2023-12-01',
    lastActive: '4 hours ago',
  },
  {
    id: 8,
    name: 'Robert Taylor',
    email: 'robert@example.com',
    avatar: '/avatars/8.jpg',
    plan: 'Free',
    credits: 3,
    totalSpent: 0,
    generations: 5,
    status: 'active',
    role: 'user',
    joinedAt: '2024-03-10',
    lastActive: '1 week ago',
  },
];

const stats = {
  totalUsers: 12847,
  activeUsers: 8543,
  newThisMonth: 1256,
  suspendedUsers: 23,
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewUser = (user: typeof users[0]) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="shadow-mint">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-mint-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
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
                <p className="text-2xl font-bold">+{stats.newThisMonth.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.suspendedUsers}</p>
                <p className="text-xs text-muted-foreground">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg">All Users</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-9 w-64"
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
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b bg-muted/30">
                  <div className="col-span-4">User</div>
                  <div className="col-span-2">Plan</div>
                  <div className="col-span-2 text-right">Credits</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-mint-100 text-mint-700 text-sm">
                          {user.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm flex items-center gap-2">
                          {user.name}
                          {user.role === 'moderator' && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Mod
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className={
                          user.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-700'
                            : user.plan === 'Pro'
                            ? 'bg-mint-100 text-mint-700'
                            : user.plan === 'Free'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {user.plan}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="font-medium">{user.credits}</p>
                      <p className="text-xs text-muted-foreground">${user.totalSpent}</p>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : user.status === 'suspended'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewUser(user)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Add Credits
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="w-4 h-4 mr-2" />
                            {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {stats.totalUsers.toLocaleString()} users
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

            <TabsContent value="active">
              <p className="text-muted-foreground text-center py-8">
                Showing {users.filter(u => u.status === 'active').length} active users
              </p>
            </TabsContent>
            <TabsContent value="pending">
              <p className="text-muted-foreground text-center py-8">
                Showing {users.filter(u => u.status === 'pending').length} pending users
              </p>
            </TabsContent>
            <TabsContent value="suspended">
              <p className="text-muted-foreground text-center py-8">
                Showing {users.filter(u => u.status === 'suspended').length} suspended users
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and manage user information
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="bg-mint-100 text-mint-700 text-lg">
                    {selectedUser.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className={
                        selectedUser.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : selectedUser.status === 'suspended'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }
                    >
                      {selectedUser.status}
                    </Badge>
                    <Badge variant="outline">{selectedUser.plan}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="text-xl font-bold">{selectedUser.credits}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold">${selectedUser.totalSpent}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Generations</p>
                  <p className="text-xl font-bold">{selectedUser.generations}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Last Active</p>
                  <p className="text-sm font-medium">{selectedUser.lastActive}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground">Joined</p>
                <p className="font-medium">{selectedUser.joinedAt}</p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Close
            </Button>
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Contact User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
