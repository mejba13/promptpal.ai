'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  LayoutDashboard,
  MessageSquare,
  Image,
  Video,
  History,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Star,
  Zap,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Create',
    href: '/dashboard/create',
    icon: Sparkles,
  },
  {
    name: 'Prompts',
    href: '/prompts',
    icon: MessageSquare,
  },
  {
    name: 'Images',
    href: '/dashboard/images',
    icon: Image,
  },
  {
    name: 'Videos',
    href: '/dashboard/videos',
    icon: Video,
  },
  {
    name: 'History',
    href: '/history',
    icon: History,
  },
];

const bottomNavigation = [
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    name: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-40',
          collapsed ? 'w-20' : 'w-[280px]'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'h-16 flex items-center border-b border-sidebar-border px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-mint">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold tracking-tight"
              >
                Prompt<span className="text-primary">Pal</span>
              </motion.span>
            )}
          </Link>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Credit Balance */}
        <div className={cn(
          'p-4 border-b border-sidebar-border',
          collapsed && 'px-2'
        )}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-12 rounded-xl bg-mint-100 flex items-center justify-center cursor-pointer hover:bg-mint-200 transition-colors">
                  <Zap className="w-5 h-5 text-mint-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold">485 Credits</p>
                <p className="text-xs text-muted-foreground">Buy more</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="rounded-xl bg-mint-50 border border-mint-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-mint-700">Credits</span>
                <span className="text-xs text-mint-600 font-medium">Buy more</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-mint-800">485</span>
                <span className="text-xs text-mint-600">remaining</span>
              </div>
              <div className="mt-2 h-1.5 bg-mint-200 rounded-full overflow-hidden">
                <div className="h-full w-[48%] bg-mint-500 rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.name}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-center h-12 rounded-xl transition-colors',
                            isActive
                              ? 'bg-mint-100 text-mint-700'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.name}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                        isActive
                          ? 'bg-mint-100 text-mint-700 font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                      {item.name === 'Create' && (
                        <Star className="w-4 h-4 ml-auto text-amber-500 fill-amber-500" />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-2 border-t border-sidebar-border">
          <ul className="space-y-1">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-center h-10 rounded-xl transition-colors',
                            isActive
                              ? 'bg-muted text-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.name}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm',
                        isActive
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Expand Button (when collapsed) */}
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-10 mt-2"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* User & Logout (when expanded) */}
          {!collapsed && (
            <div className="mt-2 pt-2 border-t border-sidebar-border">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-mint-100 flex items-center justify-center text-sm font-medium text-mint-700">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
