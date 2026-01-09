'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Globe,
  Zap,
  CreditCard,
  Bell,
  Shield,
  Key,
  Save,
  RefreshCw,
  Server,
  Database,
  Mail,
  Palette,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}

function ToggleSwitch({ enabled, onToggle, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-sm">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-mint-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // General Settings
  const [platformName, setPlatformName] = useState('PromptPal');
  const [platformDescription, setPlatformDescription] = useState('AI-Powered Content Creation Platform');
  const [supportEmail, setSupportEmail] = useState('support@promptpal.ai');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // AI Model Settings
  const [defaultModel, setDefaultModel] = useState('sdxl-1.0');
  const [maxConcurrentJobs, setMaxConcurrentJobs] = useState('10');
  const [enableNSFWFilter, setEnableNSFWFilter] = useState(true);
  const [enablePromptEnhancement, setEnablePromptEnhancement] = useState(true);

  // Credit Settings
  const [starterCredits, setStarterCredits] = useState('20');
  const [starterPrice, setStarterPrice] = useState('5');
  const [growthCredits, setGrowthCredits] = useState('50');
  const [growthPrice, setGrowthPrice] = useState('10');
  const [professionalCredits, setProfessionalCredits] = useState('100');
  const [professionalPrice, setProfessionalPrice] = useState('15');
  const [freeTrialCredits, setFreeTrialCredits] = useState('5');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackIntegration, setSlackIntegration] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');

  // Security Settings
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [ipWhitelist, setIpWhitelist] = useState('');
  const [rateLimitRequests, setRateLimitRequests] = useState('100');

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSaveDialog(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="general" className="gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="ai-models" className="gap-2">
            <Zap className="w-4 h-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="credits" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Credits
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-mint-600" />
                  Platform Information
                </CardTitle>
                <CardDescription>
                  Basic information about your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Name</label>
                    <Input
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Support Email</label>
                    <Input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform Description</label>
                  <Textarea
                    value={platformDescription}
                    onChange={(e) => setPlatformDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Server className="w-5 h-5 text-mint-600" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Control platform availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    {maintenanceMode ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">
                        {maintenanceMode
                          ? 'Platform is currently in maintenance mode'
                          : 'Platform is operational'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={maintenanceMode ? 'destructive' : 'outline'}
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                  >
                    {maintenanceMode ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-mint-600" />
                  Branding
                </CardTitle>
                <CardDescription>
                  Customize platform appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Color</label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-lg bg-mint-500 border" />
                      <Input defaultValue="#22c55e" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <Input placeholder="https://example.com/logo.png" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* AI Models Settings */}
        <TabsContent value="ai-models">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-mint-600" />
                  Model Configuration
                </CardTitle>
                <CardDescription>
                  Configure AI model settings and defaults
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Model</label>
                    <select
                      className="w-full h-10 rounded-md border bg-background px-3"
                      value={defaultModel}
                      onChange={(e) => setDefaultModel(e.target.value)}
                    >
                      <option value="sdxl-1.0">SDXL 1.0</option>
                      <option value="flux-1">Flux.1</option>
                      <option value="dall-e-3">DALL-E 3</option>
                      <option value="sd-3">Stable Diffusion 3</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Concurrent Jobs</label>
                    <Input
                      type="number"
                      value={maxConcurrentJobs}
                      onChange={(e) => setMaxConcurrentJobs(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <ToggleSwitch
                    enabled={enableNSFWFilter}
                    onToggle={() => setEnableNSFWFilter(!enableNSFWFilter)}
                    label="NSFW Content Filter"
                    description="Automatically filter inappropriate content"
                  />
                  <ToggleSwitch
                    enabled={enablePromptEnhancement}
                    onToggle={() => setEnablePromptEnhancement(!enablePromptEnhancement)}
                    label="Smart Prompt Enhancement"
                    description="AI-powered prompt improvement suggestions"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="w-5 h-5 text-mint-600" />
                  Available Models
                </CardTitle>
                <CardDescription>
                  Enable or disable AI models for users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'SDXL 1.0', credits: 2, status: 'active' },
                    { name: 'Flux.1', credits: 3, status: 'active' },
                    { name: 'DALL-E 3', credits: 4, status: 'active' },
                    { name: 'Stable Diffusion 3', credits: 4, status: 'active' },
                    { name: 'AnimateDiff (Video)', credits: 10, status: 'active' },
                    { name: 'Midjourney API', credits: 5, status: 'coming_soon' },
                  ].map((model) => (
                    <div
                      key={model.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-mint-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{model.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {model.credits} credits per generation
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={model.status === 'active' ? 'default' : 'secondary'}
                        className={
                          model.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : ''
                        }
                      >
                        {model.status === 'active' ? 'Active' : 'Coming Soon'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Credit Settings */}
        <TabsContent value="credits">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-mint-600" />
                  Pricing Tiers
                </CardTitle>
                <CardDescription>
                  Configure credit packages and pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Starter */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Starter Plan</h4>
                    <Badge variant="outline">Basic</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Credits</label>
                      <Input
                        type="number"
                        value={starterCredits}
                        onChange={(e) => setStarterCredits(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Price ($)</label>
                      <Input
                        type="number"
                        value={starterPrice}
                        onChange={(e) => setStarterPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Growth */}
                <div className="p-4 rounded-lg border border-mint-200 bg-mint-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Growth Plan</h4>
                    <Badge className="bg-mint-500">Popular</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Credits</label>
                      <Input
                        type="number"
                        value={growthCredits}
                        onChange={(e) => setGrowthCredits(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Price ($)</label>
                      <Input
                        type="number"
                        value={growthPrice}
                        onChange={(e) => setGrowthPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Professional */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Professional Plan</h4>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Credits</label>
                      <Input
                        type="number"
                        value={professionalCredits}
                        onChange={(e) => setProfessionalCredits(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Price ($)</label>
                      <Input
                        type="number"
                        value={professionalPrice}
                        onChange={(e) => setProfessionalPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-mint-600" />
                  Free Trial
                </CardTitle>
                <CardDescription>
                  Configure free credits for new users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Free Trial Credits</label>
                  <Input
                    type="number"
                    value={freeTrialCredits}
                    onChange={(e) => setFreeTrialCredits(e.target.value)}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of credits given to new users on signup
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-mint-600" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure email notification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ToggleSwitch
                  enabled={emailNotifications}
                  onToggle={() => setEmailNotifications(!emailNotifications)}
                  label="Enable Email Notifications"
                  description="Send system notifications via email"
                />
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP Host</label>
                    <Input placeholder="smtp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP Port</label>
                    <Input placeholder="587" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-mint-600" />
                  Integrations
                </CardTitle>
                <CardDescription>
                  Connect external notification services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleSwitch
                  enabled={slackIntegration}
                  onToggle={() => setSlackIntegration(!slackIntegration)}
                  label="Slack Integration"
                  description="Send alerts to Slack channels"
                />
                {slackIntegration && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input
                      placeholder="https://hooks.slack.com/services/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-mint-600" />
                  Authentication
                </CardTitle>
                <CardDescription>
                  Configure authentication security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleSwitch
                  enabled={twoFactorRequired}
                  onToggle={() => setTwoFactorRequired(!twoFactorRequired)}
                  label="Require Two-Factor Authentication"
                  description="Force all users to enable 2FA"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (minutes)</label>
                  <Input
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Server className="w-5 h-5 text-mint-600" />
                  Access Control
                </CardTitle>
                <CardDescription>
                  Configure rate limiting and IP restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate Limit (requests/minute)</label>
                  <Input
                    type="number"
                    value={rateLimitRequests}
                    onChange={(e) => setRateLimitRequests(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">IP Whitelist</label>
                  <Textarea
                    placeholder="Enter IP addresses, one per line"
                    value={ipWhitelist}
                    onChange={(e) => setIpWhitelist(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to allow all IPs
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="w-5 h-5 text-mint-600" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Manage platform API credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">Production API Key</p>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Reveal
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">Test API Key</p>
                    <Badge variant="outline">Test Mode</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Reveal
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-mint-600" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure webhook endpoints for events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Webhook URL</label>
                  <Input placeholder="https://your-server.com/webhook" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Events</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'generation.completed',
                      'generation.failed',
                      'user.created',
                      'payment.completed',
                      'credits.low',
                    ].map((event) => (
                      <Badge
                        key={event}
                        variant="outline"
                        className="cursor-pointer hover:bg-muted"
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Confirmation Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Settings Saved
            </DialogTitle>
            <DialogDescription>
              Your platform settings have been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSaveDialog(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
