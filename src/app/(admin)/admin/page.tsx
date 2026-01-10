'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  DollarSign,
  Image,
  TrendingDown,
  ArrowRight,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Activity,
  Clock,
  CreditCard,
  FileText,
  AlertCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const stats = [
  {
    title: 'Total Users',
    value: '12,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/10 to-purple-600/10',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Revenue (MTD)',
    value: '$48,352',
    change: '+8.2%',
    changeType: 'positive',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-teal-600/10',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Generations',
    value: '1.2M',
    change: '+23.1%',
    changeType: 'positive',
    icon: Image,
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-500/10 to-cyan-600/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Active Subscriptions',
    value: '3,421',
    change: '-2.4%',
    changeType: 'negative',
    icon: CreditCard,
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-500/10 to-amber-600/10',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-600',
  },
];

const recentUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    plan: 'Pro',
    credits: 485,
    status: 'active',
    joinedAt: '2 hours ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    plan: 'Starter',
    credits: 12,
    status: 'active',
    joinedAt: '5 hours ago',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@example.com',
    plan: 'Enterprise',
    credits: 2500,
    status: 'active',
    joinedAt: '1 day ago',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james@example.com',
    plan: 'Pro',
    credits: 0,
    status: 'suspended',
    joinedAt: '2 days ago',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    plan: 'Starter',
    credits: 20,
    status: 'pending',
    joinedAt: '3 days ago',
  },
];

const recentActivity = [
  { id: 1, action: 'New user registration', user: 'sarah@example.com', time: '2 min ago', type: 'user' },
  { id: 2, action: 'Credit purchase', user: 'michael@example.com', time: '15 min ago', type: 'payment' },
  { id: 3, action: 'Plan upgrade to Pro', user: 'emily@example.com', time: '1 hour ago', type: 'upgrade' },
  { id: 4, action: 'Content flagged', user: 'james@example.com', time: '2 hours ago', type: 'alert' },
  { id: 5, action: 'Refund requested', user: 'lisa@example.com', time: '3 hours ago', type: 'refund' },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'user':
      return <Users className="w-4 h-4 text-blue-500" />;
    case 'payment':
      return <CreditCard className="w-4 h-4 text-emerald-500" />;
    case 'upgrade':
      return <Zap className="w-4 h-4 text-violet-500" />;
    case 'alert':
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    case 'refund':
      return <FileText className="w-4 h-4 text-red-500" />;
    default:
      return <Activity className="w-4 h-4 text-gray-500" />;
  }
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white shadow-lg shadow-mint-500/25 rounded-xl">
          <FileText className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 group">
              {/* Background gradient decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity`} />

              <CardContent className="pt-6 pb-5 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    stat.changeType === 'positive'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">vs last month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg shadow-gray-200/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Users</CardTitle>
                <p className="text-sm text-gray-500 mt-0.5">Latest registered users</p>
              </div>
              <Button variant="ghost" size="sm" className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 rounded-lg">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-1">
                {recentUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                        <AvatarImage src={`/avatars/${user.id}.jpg`} />
                        <AvatarFallback className="bg-gradient-to-br from-mint-400 to-mint-600 text-white text-sm font-medium">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className={`font-medium ${
                          user.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-700 border-purple-200'
                            : user.plan === 'Pro'
                            ? 'bg-mint-100 text-mint-700 border-mint-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        {user.plan}
                      </Badge>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">{user.credits}</p>
                        <p className="text-xs text-gray-500">credits</p>
                      </div>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="rounded-lg">
                            <Eye className="w-4 h-4 mr-2" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg text-destructive">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed & Quick Actions */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <Card className="border-0 shadow-lg shadow-gray-200/50">
            <CardHeader className="pb-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                <Badge variant="secondary" className="bg-mint-100 text-mint-700">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg shadow-gray-200/50">
            <CardHeader className="pb-2 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 h-11">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                  <Eye className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-medium">Review flagged content</span>
                <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-700">3</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 h-11">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Approve pending users</span>
                <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">12</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 h-11">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                  <Ban className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium">Manage suspensions</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-lg shadow-gray-200/50">
        <CardHeader className="pb-2 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue Overview</CardTitle>
              <p className="text-sm text-gray-500 mt-0.5">Monthly revenue performance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50">
                7 Days
              </Button>
              <Button size="sm" className="rounded-lg bg-gray-900 text-white hover:bg-gray-800">
                30 Days
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50">
                90 Days
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-64 flex items-end gap-1.5">
            {[35, 45, 30, 55, 40, 60, 45, 70, 50, 65, 55, 80, 60, 75, 65, 85, 70, 90, 75, 95, 80, 88, 85, 92, 78, 86, 82, 94, 88, 96].map(
              (height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.02, ease: 'easeOut' }}
                  className="flex-1 bg-gradient-to-t from-mint-500 to-mint-400 rounded-t-sm hover:from-mint-600 hover:to-mint-500 transition-colors cursor-pointer relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    ${(height * 10).toLocaleString()}
                  </div>
                </motion.div>
              )
            )}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium">
            <span>Dec 10</span>
            <span>Dec 17</span>
            <span>Dec 24</span>
            <span>Jan 1</span>
            <span>Jan 9</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
