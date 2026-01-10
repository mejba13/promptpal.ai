'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  ChevronRight,
  BarChart3,
  Sparkles,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    userName: 'Sarah Wilson',
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
    userName: 'Michael Chen',
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
    userName: 'Emily Davis',
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
    userName: 'James Brown',
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
    userName: 'Lisa Anderson',
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
    userName: 'David Miller',
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
    userName: 'Jennifer Taylor',
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
    userName: 'Robert Garcia',
    type: 'purchase',
    plan: 'Starter Plan',
    amount: 9.99,
    credits: 20,
    status: 'failed',
    date: '4 days ago',
  },
];

const planBreakdown = [
  { plan: 'Enterprise', revenue: 15000, percentage: 31, color: 'from-purple-500 to-purple-600' },
  { plan: 'Pro', revenue: 18000, percentage: 37, color: 'from-mint-500 to-mint-600' },
  { plan: 'Growth', revenue: 10000, percentage: 21, color: 'from-blue-500 to-blue-600' },
  { plan: 'Starter', revenue: 5352, percentage: 11, color: 'from-amber-500 to-amber-600' },
];

const tabs = [
  { id: 'all', label: 'All Transactions' },
  { id: 'purchases', label: 'Purchases' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'refunds', label: 'Refunds' },
];

export default function RevenuePage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredTransactions = () => {
    if (activeTab === 'purchases') {
      return recentTransactions.filter(t => t.type === 'purchase');
    } else if (activeTab === 'subscriptions') {
      return recentTransactions.filter(t => t.type === 'subscription');
    } else if (activeTab === 'refunds') {
      return recentTransactions.filter(t => t.type === 'refund');
    }
    return recentTransactions;
  };

  const filteredTransactions = getFilteredTransactions();

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
      completed: {
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
      },
      pending: {
        icon: <Clock className="w-3.5 h-3.5" />,
        bg: 'bg-amber-50',
        text: 'text-amber-700',
      },
      refunded: {
        icon: <RefreshCcw className="w-3.5 h-3.5" />,
        bg: 'bg-red-50',
        text: 'text-red-700',
      },
      failed: {
        icon: <XCircle className="w-3.5 h-3.5" />,
        bg: 'bg-gray-100',
        text: 'text-gray-700',
      },
    };
    return configs[status] || configs.completed;
  };

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Revenue Analytics</h1>
          <p className="text-gray-500 mt-1">
            Track revenue, transactions, and financial metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-gradient-to-r from-mint-500 to-mint-600 text-white hover:from-mint-600 hover:to-mint-700 shadow-lg shadow-mint-500/25 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint-500/10 to-mint-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/25">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  ${revenueStats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">All time earnings</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  ${revenueStats.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">+{revenueStats.monthlyChange}%</span>
              <span className="text-sm text-gray-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Avg Order Value */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">${revenueStats.avgOrderValue}</p>
                <p className="text-sm text-gray-500">Avg Order Value</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <Receipt className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{revenueStats.totalTransactions.toLocaleString()} transactions</span>
            </div>
          </CardContent>
        </Card>

        {/* Refund Rate */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <RefreshCcw className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{revenueStats.refundRate}%</p>
                <p className="text-sm text-gray-500">Refund Rate</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">{revenueStats.refunds} refunds this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/20">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Revenue Overview</CardTitle>
                    <p className="text-sm text-gray-500">Monthly revenue trends</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  {['7d', '30d', '90d'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                        timeRange === range
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      )}
                    >
                      {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Chart */}
              <div className="h-64 flex items-end gap-3">
                {monthlyData.map((data, i) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-full bg-gradient-to-t from-mint-500 to-mint-400 rounded-xl hover:from-mint-600 hover:to-mint-500 transition-colors cursor-pointer relative"
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                          ${data.revenue.toLocaleString()}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                        </div>
                      </motion.div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">{data.month}</span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="flex items-center justify-center gap-12 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-mint-600 to-mint-500 bg-clip-text text-transparent">
                    ${(monthlyData.reduce((acc, d) => acc + d.revenue, 0) / 1000).toFixed(0)}k
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Total Period</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    ${(monthlyData.reduce((acc, d) => acc + d.revenue, 0) / monthlyData.length / 1000).toFixed(1)}k
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Monthly Average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Plan */}
        <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Revenue by Plan</CardTitle>
                <CardDescription>This month&apos;s breakdown</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {planBreakdown.map((plan, index) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">{plan.plan}</span>
                  <span className="text-sm font-medium text-gray-600">
                    ${plan.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${plan.percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={cn('absolute inset-y-0 left-0 rounded-full bg-gradient-to-r', plan.color)}
                  />
                </div>
                <p className="text-xs text-gray-400 text-right">{plan.percentage}% of total revenue</p>
              </motion.div>
            ))}

            {/* Total */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Total This Month</span>
                <span className="text-lg font-bold text-mint-600">
                  ${planBreakdown.reduce((acc, p) => acc + p.revenue, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Transactions</CardTitle>
                <p className="text-sm text-gray-500">Latest payment activity</p>
              </div>
            </div>
            <Button variant="ghost" className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 rounded-xl">
              View all transactions
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
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
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/30">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((txn, index) => {
                  const statusConfig = getStatusConfig(txn.status);
                  return (
                    <motion.tr
                      key={txn.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center',
                              txn.type === 'refund'
                                ? 'bg-red-100'
                                : txn.type === 'subscription'
                                ? 'bg-purple-100'
                                : 'bg-mint-100'
                            )}
                          >
                            {txn.type === 'refund' ? (
                              <RefreshCcw className="w-5 h-5 text-red-600" />
                            ) : txn.type === 'subscription' ? (
                              <CreditCard className="w-5 h-5 text-purple-600" />
                            ) : (
                              <Receipt className="w-5 h-5 text-mint-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 capitalize">{txn.type}</p>
                            <p className="text-xs text-gray-400 font-mono">{txn.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{txn.userName}</p>
                        <p className="text-xs text-gray-400">{txn.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{txn.plan}</p>
                        <p className="text-xs text-gray-400">{txn.credits} credits</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className={cn(
                          'font-semibold',
                          txn.amount < 0 ? 'text-red-600' : 'text-gray-900'
                        )}>
                          {txn.amount < 0 ? '-' : ''}${Math.abs(txn.amount).toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                          statusConfig.bg, statusConfig.text
                        )}>
                          {statusConfig.icon}
                          <span className="capitalize">{txn.status}</span>
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No transactions found</p>
              <p className="text-sm text-gray-400 mt-1">Try selecting a different filter</p>
            </div>
          )}

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredTransactions.length}</span> transactions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg border-gray-200">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg border-gray-200">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
