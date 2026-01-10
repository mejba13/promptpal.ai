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
  Settings,
  Loader2,
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
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="pr-4">
        <p className="font-medium text-sm text-gray-900">{label}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
          enabled ? 'bg-mint-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
            enabled ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSaveDialog(true);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'ai-models', label: 'AI Models', icon: Zap },
    { id: 'credits', label: 'Credits', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API', icon: Key },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">
            Configure platform settings and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white shadow-lg shadow-mint-500/25 rounded-xl"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

      {/* Settings Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <Card className="border-0 shadow-lg shadow-gray-200/50 sticky top-24">
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-mint-500 to-mint-600 text-white shadow-lg shadow-mint-500/25'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="flex-1 space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-mint-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Platform Information</CardTitle>
                      <CardDescription>Basic information about your platform</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Platform Name</label>
                      <Input
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="rounded-xl border-gray-200 focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Support Email</label>
                      <Input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="rounded-xl border-gray-200 focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Platform Description</label>
                    <Textarea
                      value={platformDescription}
                      onChange={(e) => setPlatformDescription(e.target.value)}
                      rows={3}
                      className="rounded-xl border-gray-200 focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Server className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">System Status</CardTitle>
                      <CardDescription>Control platform availability</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className={`flex items-center justify-between p-4 rounded-xl ${maintenanceMode ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <div className="flex items-center gap-3">
                      {maintenanceMode ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">Maintenance Mode</p>
                        <p className="text-sm text-gray-600">
                          {maintenanceMode
                            ? 'Platform is currently in maintenance mode'
                            : 'Platform is operational and serving users'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={maintenanceMode ? 'destructive' : 'outline'}
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className="rounded-xl"
                    >
                      {maintenanceMode ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Branding</CardTitle>
                      <CardDescription>Customize platform appearance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Primary Color</label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-xl bg-mint-500 shadow-lg shadow-mint-500/25" />
                        <Input defaultValue="#22c55e" className="flex-1 rounded-xl border-gray-200" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Logo URL</label>
                      <Input placeholder="https://example.com/logo.png" className="rounded-xl border-gray-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* AI Models Settings */}
          {activeTab === 'ai-models' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Model Configuration</CardTitle>
                      <CardDescription>Configure AI model settings and defaults</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Default Model</label>
                      <select
                        className="w-full h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
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
                      <label className="text-sm font-medium text-gray-700">Max Concurrent Jobs</label>
                      <Input
                        type="number"
                        value={maxConcurrentJobs}
                        onChange={(e) => setMaxConcurrentJobs(e.target.value)}
                        className="rounded-xl border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
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

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Database className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Available Models</CardTitle>
                      <CardDescription>Enable or disable AI models for users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
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
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center">
                            <Zap className="w-4 h-4 text-mint-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{model.name}</p>
                            <p className="text-xs text-gray-500">
                              {model.credits} credits per generation
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            model.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
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
          )}

          {/* Credits Settings */}
          {activeTab === 'credits' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Pricing Tiers</CardTitle>
                      <CardDescription>Configure credit packages and pricing</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* Starter */}
                  <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">Starter Plan</h4>
                        <Badge variant="outline" className="text-gray-600">Basic</Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Credits</label>
                        <Input
                          type="number"
                          value={starterCredits}
                          onChange={(e) => setStarterCredits(e.target.value)}
                          className="rounded-xl border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Price ($)</label>
                        <Input
                          type="number"
                          value={starterPrice}
                          onChange={(e) => setStarterPrice(e.target.value)}
                          className="rounded-xl border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Growth */}
                  <div className="p-5 rounded-xl border-2 border-mint-200 bg-mint-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">Growth Plan</h4>
                        <Badge className="bg-mint-500 text-white">Popular</Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Credits</label>
                        <Input
                          type="number"
                          value={growthCredits}
                          onChange={(e) => setGrowthCredits(e.target.value)}
                          className="rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Price ($)</label>
                        <Input
                          type="number"
                          value={growthPrice}
                          onChange={(e) => setGrowthPrice(e.target.value)}
                          className="rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional */}
                  <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">Professional Plan</h4>
                        <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">Premium</Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Credits</label>
                        <Input
                          type="number"
                          value={professionalCredits}
                          onChange={(e) => setProfessionalCredits(e.target.value)}
                          className="rounded-xl border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Price ($)</label>
                        <Input
                          type="number"
                          value={professionalPrice}
                          onChange={(e) => setProfessionalPrice(e.target.value)}
                          className="rounded-xl border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Free Trial</CardTitle>
                      <CardDescription>Configure free credits for new users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Free Trial Credits</label>
                    <Input
                      type="number"
                      value={freeTrialCredits}
                      onChange={(e) => setFreeTrialCredits(e.target.value)}
                      className="max-w-xs rounded-xl border-gray-200"
                    />
                    <p className="text-sm text-gray-500">
                      Number of credits given to new users on signup
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Email Notifications</CardTitle>
                      <CardDescription>Configure email notification settings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ToggleSwitch
                    enabled={emailNotifications}
                    onToggle={() => setEmailNotifications(!emailNotifications)}
                    label="Enable Email Notifications"
                    description="Send system notifications via email"
                  />
                  <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">SMTP Host</label>
                      <Input placeholder="smtp.example.com" className="rounded-xl border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">SMTP Port</label>
                      <Input placeholder="587" className="rounded-xl border-gray-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Integrations</CardTitle>
                      <CardDescription>Connect external notification services</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ToggleSwitch
                    enabled={slackIntegration}
                    onToggle={() => setSlackIntegration(!slackIntegration)}
                    label="Slack Integration"
                    description="Send alerts to Slack channels"
                  />
                  {slackIntegration && (
                    <div className="space-y-2 pt-2">
                      <label className="text-sm font-medium text-gray-700">Webhook URL</label>
                      <Input
                        placeholder="https://hooks.slack.com/services/..."
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="rounded-xl border-gray-200"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Authentication</CardTitle>
                      <CardDescription>Configure authentication security settings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <ToggleSwitch
                    enabled={twoFactorRequired}
                    onToggle={() => setTwoFactorRequired(!twoFactorRequired)}
                    label="Require Two-Factor Authentication"
                    description="Force all users to enable 2FA"
                  />
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="max-w-xs rounded-xl border-gray-200"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Server className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Access Control</CardTitle>
                      <CardDescription>Configure rate limiting and IP restrictions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Rate Limit (requests/minute)</label>
                    <Input
                      type="number"
                      value={rateLimitRequests}
                      onChange={(e) => setRateLimitRequests(e.target.value)}
                      className="max-w-xs rounded-xl border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">IP Whitelist</label>
                    <Textarea
                      placeholder="Enter IP addresses, one per line"
                      value={ipWhitelist}
                      onChange={(e) => setIpWhitelist(e.target.value)}
                      rows={4}
                      className="rounded-xl border-gray-200 resize-none"
                    />
                    <p className="text-sm text-gray-500">
                      Leave empty to allow all IPs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* API Settings */}
          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                      <Key className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">API Keys</CardTitle>
                      <CardDescription>Manage platform API credentials</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-sm text-gray-900">Production API Key</p>
                      <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value="••••••••••••••••••••••••••••••••"
                        readOnly
                        className="flex-1 font-mono text-sm rounded-xl border-gray-200 bg-white"
                      />
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Reveal
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-sm text-gray-900">Test API Key</p>
                      <Badge variant="outline" className="text-gray-600">Test Mode</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value="••••••••••••••••••••••••••••••••"
                        readOnly
                        className="flex-1 font-mono text-sm rounded-xl border-gray-200 bg-white"
                      />
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Reveal
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-200/50">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Webhooks</CardTitle>
                      <CardDescription>Configure webhook endpoints for events</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Webhook URL</label>
                    <Input placeholder="https://your-server.com/webhook" className="rounded-xl border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Events</label>
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
                          className="cursor-pointer hover:bg-mint-50 hover:text-mint-700 hover:border-mint-200 transition-colors rounded-lg px-3 py-1"
                        >
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Save Confirmation Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              Settings Saved
            </DialogTitle>
            <DialogDescription>
              Your platform settings have been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSaveDialog(false)} className="rounded-xl bg-mint-500 hover:bg-mint-600">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
