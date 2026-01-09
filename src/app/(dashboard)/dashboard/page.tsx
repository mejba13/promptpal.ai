'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  Image,
  Video,
  Send,
  Wand2,
  Clock,
  TrendingUp,
  Zap,
  ArrowRight,
  Star,
  Copy,
  Download,
  Settings2,
  ChevronDown,
  Sliders,
  Layers,
  Palette,
  X,
  ImagePlus,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// Types
interface Generation {
  id: string;
  type: 'image' | 'video';
  prompt: string;
  imageUrl?: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  processingTime?: number;
}

interface GenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  processingTime?: number;
}

const promptTemplates = [
  {
    title: 'Product Photography',
    prompt: 'Professional product photo of a luxury watch on a clean white background, studio lighting, high detail, commercial photography',
    category: 'E-commerce',
  },
  {
    title: 'Social Media Post',
    prompt: 'Eye-catching social media graphic with bold typography, vibrant gradient colors, modern minimalist design, Instagram ready',
    category: 'Marketing',
  },
  {
    title: 'Portrait Style',
    prompt: 'Professional headshot portrait, soft natural lighting, neutral background, corporate style, sharp focus, 85mm lens look',
    category: 'Business',
  },
  {
    title: 'Landscape Art',
    prompt: 'Stunning mountain landscape photograph, golden hour lighting, dramatic clouds, snow-capped peaks, high resolution, National Geographic style',
    category: 'Art',
  },
];

const aiModels = [
  { id: 'sdxl-1.0', name: 'SDXL 1.0', credits: 2, description: 'High quality, versatile' },
  { id: 'flux-1', name: 'Flux.1', credits: 3, description: 'Photorealistic, fast' },
  { id: 'sd-3', name: 'Stable Diffusion 3', credits: 4, description: 'Latest architecture' },
  { id: 'dreamshaper', name: 'DreamShaper', credits: 2, description: 'Artistic, creative' },
];

const aspectRatios = [
  { id: '1:1', label: '1:1', description: 'Square' },
  { id: '16:9', label: '16:9', description: 'Landscape' },
  { id: '9:16', label: '9:16', description: 'Portrait' },
  { id: '4:3', label: '4:3', description: 'Standard' },
  { id: '3:2', label: '3:2', description: 'Photo' },
];

const qualityPresets = [
  { id: 'standard', label: 'Standard', multiplier: 1 },
  { id: 'hd', label: 'HD', multiplier: 1.5 },
  { id: '4k', label: '4K', multiplier: 2 },
];

export default function DashboardPage() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState('sdxl-1.0');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [selectedQuality, setSelectedQuality] = useState('standard');
  const [contentType, setContentType] = useState<'image' | 'video'>('image');
  const [showSettings, setShowSettings] = useState(true);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Generation state
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // User stats (would come from API in production)
  const [userCredits, setUserCredits] = useState(485);
  const [todayGenerations, setTodayGenerations] = useState(24);

  const currentModel = aiModels.find(m => m.id === selectedModel) || aiModels[0];
  const currentQuality = qualityPresets.find(q => q.id === selectedQuality) || qualityPresets[0];
  const creditsRequired = Math.ceil(currentModel.credits * currentQuality.multiplier);

  // Load generations from localStorage on mount
  useEffect(() => {
    const savedGenerations = localStorage.getItem('promptpal_generations');
    if (savedGenerations) {
      try {
        setGenerations(JSON.parse(savedGenerations));
      } catch {
        console.error('Failed to parse saved generations');
      }
    }
  }, []);

  // Save generations to localStorage when updated
  useEffect(() => {
    if (generations.length > 0) {
      localStorage.setItem('promptpal_generations', JSON.stringify(generations.slice(0, 20)));
    }
  }, [generations]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeReferenceImage = () => {
    setReferenceImage(null);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // Check credits
    if (userCredits < creditsRequired) {
      setGenerationError('Insufficient credits. Please purchase more credits to continue.');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    // Create a pending generation
    const pendingGeneration: Generation = {
      id: `gen_${Date.now()}`,
      type: contentType,
      prompt: prompt.trim(),
      createdAt: 'Just now',
      status: 'processing',
    };

    setCurrentGeneration(pendingGeneration);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          negativePrompt: negativePrompt.trim() || undefined,
          model: selectedModel,
          aspectRatio: selectedAspectRatio,
          quality: selectedQuality,
        }),
      });

      const data: GenerationResponse = await response.json();

      if (data.success && data.imageUrl) {
        // Update generation as completed
        const completedGeneration: Generation = {
          ...pendingGeneration,
          status: 'completed',
          imageUrl: data.imageUrl,
          processingTime: data.processingTime,
          createdAt: formatTimeAgo(new Date()),
        };

        setCurrentGeneration(completedGeneration);
        setGenerations(prev => [completedGeneration, ...prev]);

        // Deduct credits
        setUserCredits(prev => prev - creditsRequired);
        setTodayGenerations(prev => prev + 1);
      } else {
        // Mark as failed
        const failedGeneration: Generation = {
          ...pendingGeneration,
          status: 'failed',
        };

        setCurrentGeneration(failedGeneration);
        setGenerationError(data.error || 'Generation failed. Please try again.');
      }
    } catch (error) {
      console.error('Generation error:', error);
      setGenerationError('Network error. Please check your connection and try again.');

      const failedGeneration: Generation = {
        ...pendingGeneration,
        status: 'failed',
      };

      setCurrentGeneration(failedGeneration);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhancePrompt = () => {
    setPrompt(prev => {
      if (prev.toLowerCase().includes('high quality')) return prev;
      return prev + ', cinematic lighting, high detail, 8k resolution, professional quality, masterpiece';
    });
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
  };

  const handleDownloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename || 'promptpal-generation.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Create stunning AI content with smart prompts</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-mint-100 text-mint-700 px-3 py-1">
            <Zap className="w-3 h-3 mr-1" />
            {userCredits} credits
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Generations Today</p>
                <p className="text-2xl font-bold">{todayGenerations}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                <Image className="w-5 h-5 text-mint-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-mint-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credits Used</p>
                <p className="text-2xl font-bold">{500 - userCredits}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <span>{userCredits} credits remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saved Prompts</p>
                <p className="text-2xl font-bold">{generations.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
              <span>Local storage</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Gen Time</p>
                <p className="text-2xl font-bold">~8s</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
              <span>Hugging Face API</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Generation Interface */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Prompt Input */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Create New Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Type Selection */}
              <div className="flex gap-2">
                <Button
                  variant={contentType === 'image' ? 'secondary' : 'outline'}
                  className={contentType === 'image' ? 'bg-mint-100 text-mint-700 hover:bg-mint-200' : ''}
                  onClick={() => setContentType('image')}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Image
                </Button>
                <Button
                  variant={contentType === 'video' ? 'secondary' : 'outline'}
                  className={contentType === 'video' ? 'bg-mint-100 text-mint-700 hover:bg-mint-200' : ''}
                  onClick={() => setContentType('video')}
                  disabled
                >
                  <Video className="w-4 h-4 mr-2" />
                  Video (Soon)
                </Button>
              </div>

              {/* Prompt Textarea */}
              <div className="relative">
                <Textarea
                  placeholder="Describe what you want to create... Be specific about style, colors, mood, and composition."
                  className="min-h-[150px] resize-none pr-24"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleEnhancePrompt}
                  >
                    <Wand2 className="w-3 h-3 mr-1" />
                    Enhance
                  </Button>
                </div>
              </div>

              {/* Negative Prompt */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Negative Prompt (optional)
                </label>
                <Input
                  placeholder="What to avoid: blurry, distorted, low quality..."
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                />
              </div>

              {/* Reference Image Upload */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Style Reference (optional)
                </label>
                {referenceImage ? (
                  <div className="relative inline-block">
                    <img
                      src={referenceImage}
                      alt="Reference"
                      className="h-24 w-24 object-cover rounded-lg border"
                    />
                    <button
                      onClick={removeReferenceImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                      isDragging
                        ? 'border-mint-500 bg-mint-50'
                        : 'border-border hover:border-mint-300 hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="reference-upload"
                    />
                    <label htmlFor="reference-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <ImagePlus className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Drop an image here or <span className="text-mint-600">browse</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Use as style reference for generation
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {generationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{generationError}</span>
                    <button
                      onClick={() => setGenerationError(null)}
                      className="ml-auto p-1 hover:bg-red-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{creditsRequired} credits per {contentType}</span>
                  <span>•</span>
                  <span>~8-15s generation time</span>
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90 shadow-mint"
                  disabled={!prompt.trim() || isGenerating || userCredits < creditsRequired}
                  onClick={handleGenerate}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Generation Preview */}
          <AnimatePresence>
            {currentGeneration && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-border/50 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {currentGeneration.status === 'processing' && (
                          <Loader2 className="w-5 h-5 text-mint-600 animate-spin" />
                        )}
                        {currentGeneration.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-mint-600" />
                        )}
                        {currentGeneration.status === 'failed' && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        {currentGeneration.status === 'processing'
                          ? 'Generating...'
                          : currentGeneration.status === 'completed'
                          ? 'Generation Complete'
                          : 'Generation Failed'}
                      </span>
                      {currentGeneration.processingTime && (
                        <Badge variant="secondary" className="text-xs">
                          {(currentGeneration.processingTime / 1000).toFixed(1)}s
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentGeneration.status === 'processing' ? (
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 text-mint-600 animate-spin mx-auto mb-4" />
                          <p className="text-muted-foreground">Creating your image...</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            This usually takes 8-15 seconds
                          </p>
                        </div>
                      </div>
                    ) : currentGeneration.imageUrl ? (
                      <div className="space-y-3">
                        <div className="relative group">
                          <img
                            src={currentGeneration.imageUrl}
                            alt={currentGeneration.prompt}
                            className="w-full rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleCopyPrompt(currentGeneration.prompt)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy Prompt
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                handleDownloadImage(
                                  currentGeneration.imageUrl!,
                                  `promptpal-${currentGeneration.id}.png`
                                )
                              }
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {currentGeneration.prompt}
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt Templates */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Quick Templates</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {promptTemplates.map((template) => (
                  <motion.button
                    key={template.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPrompt(template.prompt)}
                    className="text-left p-4 rounded-xl border border-border hover:border-mint-300 hover:bg-mint-50/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{template.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {template.prompt}
                    </p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generation Settings Panel */}
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary" />
                  Settings
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSettings ? '' : '-rotate-90'}`} />
                </Button>
              </div>
            </CardHeader>
            {showSettings && (
              <CardContent className="space-y-5">
                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    AI Model
                  </label>
                  <div className="space-y-2">
                    {aiModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          selectedModel === model.id
                            ? 'border-mint-500 bg-mint-50'
                            : 'border-border hover:border-mint-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{model.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {model.credits} credits
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {model.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-muted-foreground" />
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.id}
                        onClick={() => setSelectedAspectRatio(ratio.id)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          selectedAspectRatio === ratio.id
                            ? 'border-mint-500 bg-mint-50'
                            : 'border-border hover:border-mint-300'
                        }`}
                      >
                        <span className="text-xs font-medium">{ratio.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Palette className="w-4 h-4 text-muted-foreground" />
                    Quality
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {qualityPresets.map((quality) => (
                      <button
                        key={quality.id}
                        onClick={() => setSelectedQuality(quality.id)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          selectedQuality === quality.id
                            ? 'border-mint-500 bg-mint-50'
                            : 'border-border hover:border-mint-300'
                        }`}
                      >
                        <span className="text-xs font-medium">{quality.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Credit Summary */}
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Credits per generation</span>
                    <span className="font-bold text-mint-600">{creditsRequired}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>Model: {currentModel.name}</span>
                    <span>Quality: {currentQuality.label}</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Recent Generations */}
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Generations</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {generations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No generations yet</p>
                  <p className="text-xs mt-1">Create your first image above!</p>
                </div>
              ) : (
                generations.slice(0, 5).map((gen) => (
                  <motion.div
                    key={gen.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                        {gen.imageUrl ? (
                          <img
                            src={gen.imageUrl}
                            alt={gen.prompt}
                            className="w-full h-full object-cover"
                          />
                        ) : gen.type === 'image' ? (
                          <Image className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          <Video className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{gen.prompt}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={`text-xs capitalize ${
                              gen.status === 'completed'
                                ? 'bg-mint-100 text-mint-700'
                                : gen.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : ''
                            }`}
                          >
                            {gen.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{gen.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    {gen.imageUrl && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyPrompt(gen.prompt)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDownloadImage(gen.imageUrl!, `promptpal-${gen.id}.png`)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-mint-200 bg-mint-50/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center shrink-0">
                  <Wand2 className="w-5 h-5 text-mint-600" />
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Pro Tip</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Use the "Enhance" button to automatically add professional
                    modifiers to your prompt for better results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Status */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
                <div>
                  <p className="text-sm font-medium">Hugging Face API</p>
                  <p className="text-xs text-muted-foreground">Connected & Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
