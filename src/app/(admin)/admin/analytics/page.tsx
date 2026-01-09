'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  Timer,
  Users,
} from 'lucide-react';

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
  { source: 'Direct', visits: 45234, percentage: 38, color: 'bg-mint-500' },
  { source: 'Google', visits: 32156, percentage: 27, color: 'bg-blue-500' },
  { source: 'Social', visits: 18943, percentage: 16, color: 'bg-purple-500' },
  { source: 'Referral', visits: 12567, percentage: 11, color: 'bg-amber-500' },
  { source: 'Email', visits: 9532, percentage: 8, color: 'bg-rose-500' },
];

const topPages = [
  { page: '/dashboard', views: 45678, avgTime: '5m 12s' },
  { page: '/prompts', views: 34567, avgTime: '3m 45s' },
  { page: '/', views: 28934, avgTime: '1m 23s' },
  { page: '/history', views: 12456, avgTime: '4m 08s' },
  { page: '/settings', views: 8765, avgTime: '2m 34s' },
];

const deviceBreakdown = [
  { device: 'Desktop', percentage: 58, icon: Monitor },
  { device: 'Mobile', percentage: 35, icon: Smartphone },
  { device: 'Tablet', percentage: 7, icon: Monitor },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Platform performance and user insights
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

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold mt-1">
                  {(overviewStats.pageViews / 1000000).toFixed(2)}M
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-mint-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                +{overviewStats.pageViewsChange}%
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold mt-1">
                  {(overviewStats.uniqueVisitors / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                +{overviewStats.visitorsChange}%
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Session</p>
                <p className="text-2xl font-bold mt-1">
                  {overviewStats.avgSessionDuration}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Timer className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                +{overviewStats.sessionChange}%
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {overviewStats.bounceRate}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <ArrowDownRight className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                {overviewStats.bounceChange}%
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Activity Overview</CardTitle>
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
              <div className="h-48 flex items-end gap-2">
                {hourlyActivity.map((data, i) => (
                  <div key={data.hour} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${data.activity}%` }}
                      transition={{ duration: 0.5, delay: i * 0.03 }}
                      className="w-full bg-gradient-to-t from-mint-500 to-mint-400 rounded-t-sm hover:from-mint-600 hover:to-mint-500 transition-colors cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
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
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Device Breakdown</CardTitle>
            <CardDescription>User device distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {deviceBreakdown.map((device) => (
              <div key={device.device} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <device.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{device.device}</span>
                    <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-mint-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{source.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {source.visits.toLocaleString()} visits
                    </span>
                    <Badge variant="secondary">{source.percentage}%</Badge>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${source.color}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-mint-600" />
              Top Countries
            </CardTitle>
            <CardDescription>User geographic distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCountries.map((country, index) => (
                <motion.div
                  key={country.country}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <p className="font-medium text-sm">{country.country}</p>
                      <p className="text-xs text-muted-foreground">
                        {country.users.toLocaleString()} users
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mint-500"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {country.percentage}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Top Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-muted-foreground border-b bg-muted/30">
                <div className="col-span-6">Page</div>
                <div className="col-span-3 text-right">Views</div>
                <div className="col-span-3 text-right">Avg Time</div>
              </div>
              {topPages.map((page, index) => (
                <motion.div
                  key={page.page}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-12 gap-4 p-3 items-center border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="col-span-6">
                    <p className="font-mono text-sm">{page.page}</p>
                  </div>
                  <div className="col-span-3 text-right">
                    <p className="font-medium">{page.views.toLocaleString()}</p>
                  </div>
                  <div className="col-span-3 text-right">
                    <p className="text-muted-foreground">{page.avgTime}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top AI Models */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-mint-600" />
              Popular AI Models
            </CardTitle>
            <CardDescription>Most used generation models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topModels.map((model, index) => (
                <motion.div
                  key={model.model}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium text-sm">{model.model}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {model.generations.toLocaleString()} generations
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-mint-500 to-mint-400"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
