/**
 * Hugging Face AI Service
 * Handles image generation using Hugging Face Inference API
 */

export interface GenerationOptions {
  prompt: string;
  negativePrompt?: string;
  model?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
}

export interface GenerationResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  processingTime?: number;
}

// Hugging Face model mappings
const HF_MODELS: Record<string, string> = {
  'sdxl-1.0': 'stabilityai/stable-diffusion-xl-base-1.0',
  'flux-1': 'black-forest-labs/FLUX.1-dev',
  'sd-3': 'stabilityai/stable-diffusion-3-medium-diffusers',
  'dall-e-3': 'stabilityai/stable-diffusion-xl-base-1.0', // Fallback to SDXL
  'sd-2.1': 'stabilityai/stable-diffusion-2-1',
  'dreamshaper': 'Lykon/dreamshaper-8',
  'realistic-vision': 'SG161222/Realistic_Vision_V5.1_noVAE',
};

// Aspect ratio to dimensions
const ASPECT_RATIO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1344, height: 768 },
  '9:16': { width: 768, height: 1344 },
  '4:3': { width: 1152, height: 896 },
  '3:2': { width: 1216, height: 832 },
  '3:4': { width: 896, height: 1152 },
  '2:3': { width: 832, height: 1216 },
};

export class HuggingFaceService {
  private apiKey: string;
  private baseUrl = 'https://api-inference.huggingface.co/models';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate an image using Hugging Face Inference API
   */
  async generateImage(options: GenerationOptions): Promise<GenerationResult> {
    const startTime = Date.now();

    try {
      const modelId = options.model ? HF_MODELS[options.model] || options.model : HF_MODELS['sdxl-1.0'];

      // Build the prompt with negative prompt
      let fullPrompt = options.prompt;

      // Add quality enhancers if not already present
      if (!fullPrompt.toLowerCase().includes('high quality')) {
        fullPrompt += ', high quality, detailed, professional';
      }

      const payload: Record<string, unknown> = {
        inputs: fullPrompt,
        parameters: {
          negative_prompt: options.negativePrompt || 'blurry, low quality, distorted, deformed, ugly, bad anatomy',
          width: options.width || 1024,
          height: options.height || 1024,
          num_inference_steps: options.numInferenceSteps || 30,
          guidance_scale: options.guidanceScale || 7.5,
        },
      };

      // Add seed if provided for reproducibility
      if (options.seed !== undefined) {
        (payload.parameters as Record<string, unknown>).seed = options.seed;
      }

      const response = await fetch(`${this.baseUrl}/${modelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle model loading state
        if (response.status === 503) {
          const estimatedTime = (errorData as { estimated_time?: number }).estimated_time || 30;
          return {
            success: false,
            error: `Model is loading. Please wait ~${Math.ceil(estimatedTime)} seconds and try again.`,
            processingTime: Date.now() - startTime,
          };
        }

        return {
          success: false,
          error: (errorData as { error?: string }).error || `API error: ${response.status} ${response.statusText}`,
          processingTime: Date.now() - startTime,
        };
      }

      // Response is binary image data
      const imageBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      const imageDataUrl = `data:image/png;base64,${base64Image}`;

      return {
        success: true,
        imageBase64: base64Image,
        imageUrl: imageDataUrl,
        processingTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('Hugging Face generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        processingTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Get dimensions from aspect ratio
   */
  static getDimensions(aspectRatio: string): { width: number; height: number } {
    return ASPECT_RATIO_DIMENSIONS[aspectRatio] || ASPECT_RATIO_DIMENSIONS['1:1'];
  }

  /**
   * Validate API key by making a test request
   */
  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch('https://huggingface.co/api/whoami-v2', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get available models
   */
  static getAvailableModels() {
    return Object.entries(HF_MODELS).map(([id, hfId]) => ({
      id,
      huggingFaceId: hfId,
      name: id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    }));
  }
}

// Singleton instance
let huggingFaceService: HuggingFaceService | null = null;

export function getHuggingFaceService(apiKey?: string): HuggingFaceService {
  const key = apiKey || process.env.HUGGINGFACE_API_KEY;

  if (!key) {
    throw new Error('Hugging Face API key is required');
  }

  if (!huggingFaceService || apiKey) {
    huggingFaceService = new HuggingFaceService(key);
  }

  return huggingFaceService;
}
