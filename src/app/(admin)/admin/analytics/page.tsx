'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Smartphone,
  Monitor,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  Timer,
  Users,
  BarChart3,
  TrendingUp,
  MapPin,
  Activity,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const overviewStats = {
  pageViews: 1248567,
  pageViewsChange: 18.5,
  uniqueVisitors: 89432,
  visitorsChange: 12.3,
  avgSessionDuration: '4m 32s',
  sessionChange: 5.2,
  bounceRate: 32.4,
  bounceChange: -2.1,
};

const trafficSources = [
  { source: 'Direct', visits: 45234, percentage: 38, color: 'from-mint-500 to-mint-600' },
  { source: 'Google', visits: 32156, percentage: 27, color: 'from-blue-500 to-blue-600' },
  { source: 'Social', visits: 18943, percentage: 16, color: 'from-purple-500 to-purple-600' },
  { source: 'Referral', visits: 12567, percentage: 11, color: 'from-amber-500 to-amber-600' },
  { source: 'Email', visits: 9532, percentage: 8, color: 'from-rose-500 to-rose-600' },
];

const topPages = [
  { page: '/dashboard', views: 45678, avgTime: '5m 12s', trend: 12 },
  { page: '/prompts', views: 34567, avgTime: '3m 45s', trend: 8 },
  { page: '/', views: 28934, avgTime: '1m 23s', trend: -3 },
  { page: '/history', views: 12456, avgTime: '4m 08s', trend: 15 },
  { page: '/settings', views: 8765, avgTime: '2m 34s', trend: 2 },
];

const deviceBreakdown = [
  { device: 'Desktop', percentage: 58, icon: Monitor, color: 'from-blue-500 to-blue-600' },
  { device: 'Mobile', percentage: 35, icon: Smartphone, color: 'from-mint-500 to-mint-600' },
  { device: 'Tablet', percentage: 7, icon: Monitor, color: 'from-purple-500 to-purple-600' },
];

const topModels = [
  { model: 'SDXL 1.0', generations: 456789, percentage: 42 },
  { model: 'Flux.1', generations: 234567, percentage: 22 },
  { model: 'DALL-E 3', generations: 189234, percentage: 17 },
  { model: 'Stable Diffusion 3', generations: 145678, percentage: 13 },
  { model: 'AnimateDiff', generations: 65432, percentage: 6 },
];

const hourlyActivity = [
  { hour: '00:00', activity: 20 },
  { hour: '02:00', activity: 15 },
  { hour: '04:00', activity: 10 },
  { hour: '06:00', activity: 25 },
  { hour: '08:00', activity: 45 },
  { hour: '10:00', activity: 75 },
  { hour: '12:00', activity: 85 },
  { hour: '14:00', activity: 90 },
  { hour: '16:00', activity: 95 },
  { hour: '18:00', activity: 80 },
  { hour: '20:00', activity: 70 },
  { hour: '22:00', activity: 45 },
];

const topCountries = [
  { country: 'United States', flag: '🇺🇸', users: 34567, percentage: 38 },
  { country: 'United Kingdom', flag: '🇬🇧', users: 12345, percentage: 14 },
  { country: 'Germany', flag: '🇩🇪', users: 9876, percentage: 11 },
  { country: 'Canada', flag: '🇨🇦', users: 7654, percentage: 8 },
  { country: 'France', flag: '🇫🇷', users: 6543, percentage: 7 },
  { country: 'Australia', flag: '🇦🇺', users: 5432, percentage: 6 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">
            Platform performance and user insights
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

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Page Views */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint-500/10 to-mint-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/25">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {(overviewStats.pageViews / 1000000).toFixed(2)}M
                </p>
                <p className="text-sm text-gray-500">Page Views</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">+{overviewStats.pageViewsChange}%</span>
              <span className="text-sm text-gray-400">vs last period</span>
            </div>
          </CardContent>
        </Card>

        {/* Unique Visitors */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {(overviewStats.uniqueVisitors / 1000).toFixed(1)}K
                </p>
                <p className="text-sm text-gray-500">Unique Visitors</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">+{overviewStats.visitorsChange}%</span>
              <span className="text-sm text-gray-400">vs last period</span>
            </div>
          </CardContent>
        </Card>

        {/* Avg Session */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{overviewStats.avgSessionDuration}</p>
                <p className="text-sm text-gray-500">Avg Session</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">+{overviewStats.sessionChange}%</span>
              <span className="text-sm text-gray-400">vs last period</span>
            </div>
          </CardContent>
        </Card>

        {/* Bounce Rate */}
        <Card className="relative overflow-hidden border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{overviewStats.bounceRate}%</p>
                <p className="text-sm text-gray-500">Bounce Rate</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <ArrowDownRight className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">{overviewStats.bounceChange}%</span>
              <span className="text-sm text-gray-400">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Devices */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/20">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Activity Overview</CardTitle>
                    <p className="text-sm text-gray-500">Hourly user activity</p>
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
              <div className="h-48 flex items-end gap-2">
                {hourlyActivity.map((data, i) => (
                  <div key={data.hour} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="relative w-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${data.activity * 1.8}px` }}
                        transition={{ duration: 0.5, delay: i * 0.03 }}
                        className="w-full bg-gradient-to-t from-mint-500 to-mint-400 rounded-lg hover:from-mint-600 hover:to-mint-500 transition-colors cursor-pointer"
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.activity}%
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-medium text-gray-400">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>12 AM</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Breakdown */}
        <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Device Breakdown</CardTitle>
                <CardDescription>User device distribution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {deviceBreakdown.map((device, index) => (
              <motion.div
                key={device.device}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg',
                  device.color,
                  device.color.includes('blue') ? 'shadow-blue-500/20' :
                  device.color.includes('mint') ? 'shadow-mint-500/20' : 'shadow-purple-500/20'
                )}>
                  <device.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{device.device}</span>
                    <span className="text-sm font-medium text-gray-600">{device.percentage}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={cn('h-full rounded-full bg-gradient-to-r', device.color)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Traffic & Countries */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {trafficSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {source.visits.toLocaleString()} visits
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={cn('h-full rounded-full bg-gradient-to-r', source.color)}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Top Countries</CardTitle>
                <CardDescription>User geographic distribution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              {topCountries.map((country, index) => (
                <motion.div
                  key={country.country}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{country.country}</p>
                      <p className="text-xs text-gray-400">
                        {country.users.toLocaleString()} users
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${country.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="h-full bg-gradient-to-r from-mint-500 to-mint-600 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-10 text-right">
                      {country.percentage}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages & Models */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Time</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topPages.map((page, index) => (
                    <motion.tr
                      key={page.page}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-mono text-sm font-medium text-gray-900">{page.page}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-semibold text-gray-900">{page.views.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-gray-500">{page.avgTime}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg',
                          page.trend >= 0
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-red-700 bg-red-50'
                        )}>
                          {page.trend >= 0 ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {Math.abs(page.trend)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top AI Models */}
        <Card className="border-gray-200/80 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Popular AI Models</CardTitle>
                <CardDescription>Most used generation models</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {topModels.map((model, index) => (
              <motion.div
                key={model.model}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-gray-900">{model.model}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {model.generations.toLocaleString()} generations
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${model.percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-mint-500 to-mint-400 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 text-right">{model.percentage}% of total</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
