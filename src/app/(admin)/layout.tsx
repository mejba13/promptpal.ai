'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  LayoutDashboard,
  Users,
  CreditCard,
  Image,
  Settings,
  BarChart3,
  Shield,
  Bell,
  LogOut,
  ChevronDown,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Command,
} from 'lucide-react';

// Navigation sections with grouping
const navigationSections = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Users', href: '/admin/users', icon: Users },
      { name: 'Generations', href: '/admin/generations', icon: Image },
      { name: 'Moderation', href: '/admin/moderation', icon: Shield },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { name: 'Revenue', href: '/admin/revenue', icon: CreditCard },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

// Flatten navigation for easy lookup
const allNavItems = navigationSections.flatMap(section => section.items);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Get current page title
  const currentPage = allNavItems.find(item => item.href === pathname)?.name || 'Admin';

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-slate-100/50">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200/80 shadow-xl shadow-gray-200/20 transition-all duration-300 ease-in-out',
            sidebarCollapsed ? 'w-[72px]' : 'w-64',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          {/* Sidebar Header */}
          <div className={cn(
            'h-16 border-b border-gray-100 flex items-center px-4',
            sidebarCollapsed ? 'justify-center' : 'justify-between'
          )}>
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col"
                >
                  <span className="text-base font-bold tracking-tight">
                    Prompt<span className="text-mint-600">Pal</span>
                  </span>
                  <span className="text-[10px] font-medium text-mint-600 -mt-0.5">
                    Admin Panel
                  </span>
                </motion.div>
              )}
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-6">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  {!sidebarCollapsed && (
                    <h4 className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      {section.title}
                    </h4>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const NavLink = (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-gradient-to-r from-mint-500 to-mint-600 text-white shadow-lg shadow-mint-500/25'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                            sidebarCollapsed && 'justify-center px-2'
                          )}
                        >
                          <item.icon className={cn(
                            'w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110',
                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-mint-600'
                          )} />
                          {!sidebarCollapsed && (
                            <span>{item.name}</span>
                          )}
                          {isActive && !sidebarCollapsed && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                            />
                          )}
                        </Link>
                      );

                      if (sidebarCollapsed) {
                        return (
                          <Tooltip key={item.name}>
                            <TooltipTrigger asChild>
                              {NavLink}
                            </TooltipTrigger>
                            <TooltipContent side="right" className="font-medium">
                              {item.name}
                            </TooltipContent>
                          </Tooltip>
                        );
                      }

                      return NavLink;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-100 p-3">
            {/* Collapse Button - Desktop Only */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                'hidden lg:flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors',
                sidebarCollapsed && 'justify-center'
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Collapse</span>
                </>
              )}
            </button>

            {/* Help Link */}
            {!sidebarCollapsed && (
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Site</span>
              </Link>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className={cn(
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        )}>
          {/* Top Bar */}
          <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
              {/* Left: Mobile Menu + Breadcrumb */}
              <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Breadcrumb / Page Title */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-gray-400">Admin</span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  <span className="font-semibold text-gray-900">{currentPage}</span>
                </div>
              </div>

              {/* Center: Search */}
              <div className={cn(
                'flex-1 max-w-md mx-4 hidden md:block transition-all duration-200',
                searchFocused && 'max-w-lg'
              )}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className={cn(
                      'pl-10 pr-12 h-10 bg-gray-50/80 border-gray-200/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-all',
                      searchFocused && 'shadow-lg shadow-gray-200/50'
                    )}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
                    <Command className="w-3 h-3" />K
                  </kbd>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Help */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl">
                      <HelpCircle className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Help & Support</TooltipContent>
                </Tooltip>

                {/* Notifications */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200 mx-1" />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-gray-100 rounded-xl">
                      <Avatar className="h-8 w-8 ring-2 ring-mint-500/20">
                        <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
                        <AvatarFallback className="bg-gradient-to-br from-mint-500 to-mint-600 text-white text-xs font-semibold">
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-900">Admin</span>
                        <span className="text-xs text-gray-500">Super Admin</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl shadow-gray-200/50 border-gray-200/80">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold">Administrator</p>
                        <p className="text-xs text-muted-foreground">admin@promptpal.ai</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Site
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/admin/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive rounded-lg cursor-pointer focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
