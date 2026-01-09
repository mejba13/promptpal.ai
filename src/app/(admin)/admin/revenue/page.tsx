'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  Download,
  Calendar,
  RefreshCcw,
  Wallet,
  Receipt,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const revenueStats = {
  totalRevenue: 248352,
  monthlyRevenue: 48352,
  monthlyChange: 12.5,
  avgOrderValue: 24.99,
  totalTransactions: 9943,
  refunds: 234,
  refundRate: 2.4,
};

const monthlyData = [
  { month: 'Jul', revenue: 32000 },
  { month: 'Aug', revenue: 35000 },
  { month: 'Sep', revenue: 38000 },
  { month: 'Oct', revenue: 42000 },
  { month: 'Nov', revenue: 45000 },
  { month: 'Dec', revenue: 48352 },
];

const recentTransactions = [
  {
    id: 'txn_001',
    user: 'sarah@example.com',
    type: 'purchase',
    plan: 'Pro Plan',
    amount: 29.99,
    credits: 100,
    status: 'completed',
    date: '2 hours ago',
  },
  {
    id: 'txn_002',
    user: 'michael@example.com',
    type: 'purchase',
    plan: 'Starter Plan',
    amount: 9.99,
    credits: 20,
    status: 'completed',
    date: '5 hours ago',
  },
  {
    id: 'txn_003',
    user: 'emily@example.com',
    type: 'subscription',
    plan: 'Enterprise Monthly',
    amount: 199.99,
    credits: 500,
    status: 'completed',
    date: '1 day ago',
  },
  {
    id: 'txn_004',
    user: 'james@example.com',
    type: 'refund',
    plan: 'Pro Plan',
    amount: -29.99,
    credits: -100,
    status: 'refunded',
    date: '2 days ago',
  },
  {
    id: 'txn_005',
    user: 'lisa@example.com',
    type: 'purchase',
    plan: 'Growth Plan',
    amount: 49.99,
    credits: 200,
    status: 'completed',
    date: '2 days ago',
  },
  {
    id: 'txn_006',
    user: 'david@example.com',
    type: 'subscription',
    plan: 'Pro Monthly',
    amount: 29.99,
    credits: 100,
    status: 'completed',
    date: '3 days ago',
  },
  {
    id: 'txn_007',
    user: 'jennifer@example.com',
    type: 'purchase',
    plan: 'Credit Pack',
    amount: 14.99,
    credits: 50,
    status: 'pending',
    date: '3 days ago',
  },
  {
    id: 'txn_008',
    user: 'robert@example.com',
    type: 'purchase',
    plan: 'Starter Plan',
    amount: 9.99,
    credits: 20,
    status: 'failed',
    date: '4 days ago',
  },
];

const planBreakdown = [
  { plan: 'Enterprise', revenue: 15000, percentage: 31, color: 'bg-purple-500' },
  { plan: 'Pro', revenue: 18000, percentage: 37, color: 'bg-mint-500' },
  { plan: 'Growth', revenue: 10000, percentage: 21, color: 'bg-blue-500' },
  { plan: 'Starter', revenue: 5352, percentage: 11, color: 'bg-amber-500' },
];

export default function RevenuePage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground">
            Track revenue, transactions, and financial metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  ${revenueStats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-mint-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                All time
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  ${revenueStats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                +{revenueStats.monthlyChange}%
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold mt-1">
                  ${revenueStats.avgOrderValue}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="text-sm text-muted-foreground">
                {revenueStats.totalTransactions.toLocaleString()} transactions
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Refund Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {revenueStats.refundRate}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <RefreshCcw className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="text-sm text-muted-foreground">
                {revenueStats.refunds} refunds this month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={timeRange === '7d' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange('7d')}
                  >
                    7 Days
                  </Button>
                  <Button
                    variant={timeRange === '30d' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange('30d')}
                  >
                    30 Days
                  </Button>
                  <Button
                    variant={timeRange === '90d' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange('90d')}
                  >
                    90 Days
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end gap-4">
                {monthlyData.map((data, i) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.revenue / 50000) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-mint-500 to-mint-400 rounded-t-lg hover:from-mint-600 hover:to-mint-500 transition-colors cursor-pointer"
                    />
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-8 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-mint-600">
                    ${(monthlyData.reduce((acc, d) => acc + d.revenue, 0) / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-muted-foreground">Total Period</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    ${(monthlyData.reduce((acc, d) => acc + d.revenue, 0) / monthlyData.length / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-muted-foreground">Monthly Avg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Plan */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Revenue by Plan</CardTitle>
            <CardDescription>This month&apos;s breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {planBreakdown.map((plan) => (
              <div key={plan.plan} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{plan.plan}</span>
                  <span className="text-sm text-muted-foreground">
                    ${plan.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${plan.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${plan.color}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {plan.percentage}% of total
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b bg-muted/30">
                  <div className="col-span-3">Transaction</div>
                  <div className="col-span-3">User</div>
                  <div className="col-span-2">Plan</div>
                  <div className="col-span-2 text-right">Amount</div>
                  <div className="col-span-2">Status</div>
                </div>
                {recentTransactions.map((txn, index) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            txn.type === 'refund'
                              ? 'bg-red-100'
                              : txn.type === 'subscription'
                              ? 'bg-purple-100'
                              : 'bg-mint-100'
                          }`}
                        >
                          {txn.type === 'refund' ? (
                            <RefreshCcw className="w-4 h-4 text-red-600" />
                          ) : txn.type === 'subscription' ? (
                            <CreditCard className="w-4 h-4 text-purple-600" />
                          ) : (
                            <Receipt className="w-4 h-4 text-mint-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm capitalize">{txn.type}</p>
                          <p className="text-xs text-muted-foreground font-mono">{txn.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm">{txn.user}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm">{txn.plan}</p>
                      <p className="text-xs text-muted-foreground">{txn.credits} credits</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <p
                        className={`font-medium ${
                          txn.amount < 0 ? 'text-red-600' : ''
                        }`}
                      >
                        {txn.amount < 0 ? '-' : ''}${Math.abs(txn.amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className={
                          txn.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : txn.status === 'refunded'
                            ? 'bg-red-100 text-red-700'
                            : txn.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {txn.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="purchases">
              <p className="text-muted-foreground text-center py-8">
                Showing {recentTransactions.filter(t => t.type === 'purchase').length} purchases
              </p>
            </TabsContent>
            <TabsContent value="subscriptions">
              <p className="text-muted-foreground text-center py-8">
                Showing {recentTransactions.filter(t => t.type === 'subscription').length} subscriptions
              </p>
            </TabsContent>
            <TabsContent value="refunds">
              <p className="text-muted-foreground text-center py-8">
                Showing {recentTransactions.filter(t => t.type === 'refund').length} refunds
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
