import { NextRequest, NextResponse } from 'next/server';
import { HuggingFaceService } from '@/lib/services/huggingface';

// Hugging Face API key from environment variable (required)
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      prompt,
      negativePrompt,
      model = 'sdxl-1.0',
      aspectRatio = '1:1',
      quality = 'standard',
      seed,
    } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get dimensions from aspect ratio
    const dimensions = HuggingFaceService.getDimensions(aspectRatio);

    // Adjust inference steps based on quality
    const qualitySteps: Record<string, number> = {
      standard: 25,
      hd: 35,
      '4k': 50,
    };

    const numInferenceSteps = qualitySteps[quality] || 25;

    // Initialize Hugging Face service
    const hfService = new HuggingFaceService(HF_API_KEY);

    // Generate image
    const result = await hfService.generateImage({
      prompt: prompt.trim(),
      negativePrompt: negativePrompt?.trim(),
      model,
      width: dimensions.width,
      height: dimensions.height,
      numInferenceSteps,
      guidanceScale: 7.5,
      seed: seed ? parseInt(seed, 10) : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      processingTime: result.processingTime,
      model,
      aspectRatio,
      quality,
    });
  } catch (error) {
    console.error('Generation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check API status
export async function GET() {
  try {
    const hfService = new HuggingFaceService(HF_API_KEY);
    const isValid = await hfService.validateApiKey();

    return NextResponse.json({
      status: isValid ? 'operational' : 'invalid_key',
      models: HuggingFaceService.getAvailableModels(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
