'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-mint-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-mint-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Check your email</h1>
        <p className="text-muted-foreground mb-6">
          We've sent password reset instructions to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-primary hover:underline font-medium"
          >
            try again
          </button>
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sign in
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
        <p className="text-muted-foreground mt-2">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 shadow-mint"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4 mr-2" />
          )}
          Send reset link
        </Button>
      </form>
    </div>
  );
}
