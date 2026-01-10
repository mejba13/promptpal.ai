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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl border-gray-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white shadow-lg shadow-mint-500/25 rounded-xl">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity" />
          <CardContent className="pt-5 pb-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity" />
          <CardContent className="pt-5 pb-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity" />
          <CardContent className="pt-5 pb-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">+{stats.newThisMonth.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-rose-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity" />
          <CardContent className="pt-5 pb-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.suspendedUsers}</p>
                <p className="text-xs text-gray-500 font-medium">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card className="border-0 shadow-lg shadow-gray-200/50">
        <CardHeader className="pb-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-gray-900">All Users</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-9 w-64 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
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
        <CardContent className="pt-4">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-gray-100/80 p-1 rounded-xl">
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
              <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Active</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Pending</TabsTrigger>
              <TabsTrigger value="suspended" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Suspended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
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
                    className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-mint-400 to-mint-600 text-white text-sm font-medium">
                          {user.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900 flex items-center gap-2">
                          {user.name}
                          {user.role === 'moderator' && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-violet-50 text-violet-700 border-violet-200">
                              <Shield className="w-2.5 h-2.5 mr-0.5" />
                              Mod
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className={`font-medium ${
                          user.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-700'
                            : user.plan === 'Pro'
                            ? 'bg-mint-100 text-mint-700'
                            : user.plan === 'Free'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user.plan}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="font-semibold text-gray-900">{user.credits}</p>
                      <p className="text-xs text-gray-500">${user.totalSpent}</p>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className={`${
                          user.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : user.status === 'suspended'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.status === 'active'
                            ? 'bg-emerald-500'
                            : user.status === 'suspended'
                            ? 'bg-red-500'
                            : 'bg-amber-500'
                        }`} />
                        {user.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl">
                          <DropdownMenuItem onClick={() => handleViewUser(user)} className="rounded-lg">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Add Credits
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive rounded-lg">
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
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of <span className="font-medium text-gray-900">{stats.totalUsers.toLocaleString()}</span> users
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
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg bg-mint-100 text-mint-700">1</Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-gray-600 hover:bg-gray-100">2</Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-gray-600 hover:bg-gray-100">3</Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="rounded-lg border-gray-200"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <p className="text-gray-500 text-center py-8">
                Showing {users.filter(u => u.status === 'active').length} active users
              </p>
            </TabsContent>
            <TabsContent value="pending">
              <p className="text-gray-500 text-center py-8">
                Showing {users.filter(u => u.status === 'pending').length} pending users
              </p>
            </TabsContent>
            <TabsContent value="suspended">
              <p className="text-gray-500 text-center py-8">
                Showing {users.filter(u => u.status === 'suspended').length} suspended users
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">User Details</DialogTitle>
            <DialogDescription className="text-gray-500">
              View and manage user information
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-mint-400 to-mint-600 text-white text-lg font-semibold">
                    {selectedUser.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg text-gray-900">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={`${
                        selectedUser.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : selectedUser.status === 'suspended'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {selectedUser.status}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">{selectedUser.plan}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-xs text-gray-500 font-medium">Credits</p>
                  <p className="text-xl font-bold text-gray-900">{selectedUser.credits}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-xs text-gray-500 font-medium">Total Spent</p>
                  <p className="text-xl font-bold text-gray-900">${selectedUser.totalSpent}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-xs text-gray-500 font-medium">Generations</p>
                  <p className="text-xl font-bold text-gray-900">{selectedUser.generations}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-xs text-gray-500 font-medium">Last Active</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedUser.lastActive}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium">Member since</p>
                <p className="text-sm font-medium text-gray-900">{selectedUser.joinedAt}</p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setShowUserDialog(false)} className="rounded-xl">
              Close
            </Button>
            <Button className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white rounded-xl">
              <Mail className="w-4 h-4 mr-2" />
              Contact User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
