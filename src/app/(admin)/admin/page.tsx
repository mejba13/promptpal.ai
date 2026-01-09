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
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle2,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '12,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    color: 'mint',
  },
  {
    title: 'Revenue (MTD)',
    value: '$48,352',
    change: '+8.2%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Generations',
    value: '1.2M',
    change: '+23.1%',
    changeType: 'positive',
    icon: Image,
    color: 'purple',
  },
  {
    title: 'Active Subscriptions',
    value: '3,421',
    change: '-2.4%',
    changeType: 'negative',
    icon: TrendingUp,
    color: 'blue',
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
  { id: 1, action: 'New user registration', user: 'sarah@example.com', time: '2 min ago' },
  { id: 2, action: 'Credit purchase', user: 'michael@example.com', time: '15 min ago' },
  { id: 3, action: 'Plan upgrade', user: 'emily@example.com', time: '1 hour ago' },
  { id: 4, action: 'Content flagged', user: 'james@example.com', time: '2 hours ago' },
  { id: 5, action: 'Refund requested', user: 'lisa@example.com', time: '3 hours ago' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your platform performance
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-mint">
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Recent Users</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatars/${user.id}.jpg`} />
                        <AvatarFallback className="bg-mint-100 text-mint-700 text-sm">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className={
                          user.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-700'
                            : user.plan === 'Pro'
                            ? 'bg-mint-100 text-mint-700'
                            : 'bg-muted'
                        }
                      >
                        {user.plan}
                      </Badge>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{user.credits} credits</p>
                        <p className="text-xs text-muted-foreground">{user.joinedAt}</p>
                      </div>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-mint-500 mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Review flagged content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve pending users
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive">
                <Ban className="w-4 h-4 mr-2" />
                Manage suspensions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Revenue Overview</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                7 Days
              </Button>
              <Button variant="secondary" size="sm">
                30 Days
              </Button>
              <Button variant="outline" size="sm">
                90 Days
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-2">
            {[35, 45, 30, 55, 40, 60, 45, 70, 50, 65, 55, 80, 60, 75, 65, 85, 70, 90, 75, 95, 80, 88, 85, 92, 78, 86, 82, 94, 88, 96].map(
              (height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                  className="flex-1 bg-gradient-to-t from-mint-500 to-mint-400 rounded-t-sm hover:from-mint-600 hover:to-mint-500 transition-colors cursor-pointer"
                />
              )
            )}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
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
