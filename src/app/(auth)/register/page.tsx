'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Wand2,
  Clock,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// ANIMATED INPUT WRAPPER
// ═══════════════════════════════════════════════════════════

function AnimatedInput({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// SOCIAL AUTH BUTTON
// ═══════════════════════════════════════════════════════════

function SocialButton({
  provider,
  icon,
  delay = 0,
}: {
  provider: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 group shadow-sm"
      >
        {icon}
        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
          {provider}
        </span>
      </motion.button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// PASSWORD STRENGTH INDICATOR
// ═══════════════════════════════════════════════════════════

function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength();
  const strengthInfo = [
    { label: 'Weak', color: 'from-red-500 to-red-400', bgColor: 'bg-red-500' },
    { label: 'Fair', color: 'from-orange-500 to-amber-400', bgColor: 'bg-orange-500' },
    { label: 'Good', color: 'from-yellow-500 to-lime-400', bgColor: 'bg-yellow-500' },
    { label: 'Strong', color: 'from-emerald-500 to-cyan-400', bgColor: 'bg-emerald-500' },
  ];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 space-y-2"
    >
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="h-1.5 flex-1 rounded-full overflow-hidden bg-slate-100"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`h-full rounded-full ${index < strength ? strengthInfo[strength - 1]?.bgColor : ''}`}
              initial={{ width: 0 }}
              animate={{ width: index < strength ? '100%' : '0%' }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Password strength:{' '}
          <span className={`font-semibold ${strength > 0 ? 'text-' + (strength > 2 ? 'emerald' : strength > 1 ? 'yellow' : 'red') + '-600' : 'text-slate-400'}`}>
            {strength > 0 ? strengthInfo[strength - 1]?.label : 'Too weak'}
          </span>
        </p>
        <div className="flex gap-1">
          {['8+ chars', 'Uppercase', 'Number', 'Symbol'].map((hint, i) => {
            const checks = [
              password.length >= 8,
              /[A-Z]/.test(password),
              /[0-9]/.test(password),
              /[^A-Za-z0-9]/.test(password),
            ];
            return (
              <motion.span
                key={hint}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  checks[i] ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {hint}
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// BENEFITS BENTO
// ═══════════════════════════════════════════════════════════

function BenefitsBento() {
  const benefits = [
    { icon: Zap, text: '20 free credits', color: 'from-amber-500 to-orange-500' },
    { icon: ImageIcon, text: 'All AI models', color: 'from-blue-500 to-cyan-500' },
    { icon: Wand2, text: 'Smart prompts', color: 'from-violet-500 to-purple-500' },
    { icon: Clock, text: 'Unlimited history', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-cyan-50 border border-emerald-200/50 p-5 shadow-lg shadow-emerald-100/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </motion.div>
        <span className="text-sm font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
          What&apos;s included free
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.text}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-slate-100 shadow-sm"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-sm`}>
              <benefit.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-slate-700">{benefit.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN REGISTER PAGE
// ═══════════════════════════════════════════════════════════

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/dashboard');
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-semibold text-emerald-600 uppercase tracking-wider"
          >
            Get Started Free
          </motion.span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="text-slate-500 mt-2">
          Start with 20 free credits. No credit card required.
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <AnimatedInput delay={0.1}>
          <Label htmlFor="name" className="text-sm font-semibold text-slate-700 mb-2 block">
            Full name
          </Label>
          <div className="relative group">
            <motion.div
              animate={{
                scale: focusedField === 'name' ? 1.02 : 1,
              }}
              className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-100 transition-opacity duration-300"
            />
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="pl-12 h-12 rounded-xl border-2 border-slate-200 bg-white focus:border-emerald-500 focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>
          </div>
        </AnimatedInput>

        {/* Email */}
        <AnimatedInput delay={0.15}>
          <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">
            Email address
          </Label>
          <div className="relative group">
            <motion.div
              animate={{
                scale: focusedField === 'email' ? 1.02 : 1,
              }}
              className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-100 transition-opacity duration-300"
            />
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-12 h-12 rounded-xl border-2 border-slate-200 bg-white focus:border-emerald-500 focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>
          </div>
        </AnimatedInput>

        {/* Password */}
        <AnimatedInput delay={0.2}>
          <Label htmlFor="password" className="text-sm font-semibold text-slate-700 mb-2 block">
            Password
          </Label>
          <div className="relative group">
            <motion.div
              animate={{
                scale: focusedField === 'password' ? 1.02 : 1,
              }}
              className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-100 transition-opacity duration-300"
            />
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                className="pl-12 pr-12 h-12 rounded-xl border-2 border-slate-200 bg-white focus:border-emerald-500 focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
          <AnimatePresence>
            <PasswordStrength password={formData.password} />
          </AnimatePresence>
        </AnimatedInput>

        {/* Submit Button */}
        <AnimatedInput delay={0.25}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              type="submit"
              className="w-full h-13 rounded-xl text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-xl shadow-emerald-500/25 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  Create Account
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </>
              )}
            </Button>
          </motion.div>
        </AnimatedInput>
      </form>

      {/* Benefits */}
      <div className="mt-6">
        <BenefitsBento />
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative my-6"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-slate-100" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 text-slate-400 font-semibold tracking-wider">
            or continue with
          </span>
        </div>
      </motion.div>

      {/* Social Auth */}
      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          provider="Google"
          delay={0.55}
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          }
        />
        <SocialButton
          provider="GitHub"
          delay={0.6}
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          }
        />
      </div>

      {/* Sign In Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="mt-6 text-center text-sm text-slate-500"
      >
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Sign in
          <motion.span
            className="inline-block ml-1"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </Link>
      </motion.p>

      {/* Terms */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-center text-xs text-slate-400"
      >
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-slate-600 transition-colors">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-slate-600 transition-colors">
          Privacy Policy
        </Link>
      </motion.p>
    </div>
  );
}
