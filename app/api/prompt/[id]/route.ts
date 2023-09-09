import { connectToDB } from '@utils/database';
import { NextRequest, NextResponse } from 'next/server';
import Prompt, { PromptType } from '@models/prompt';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<PromptType | string>> {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new NextResponse('Prompt not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Failed to fetch prompt', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<PromptType | string>> {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new NextResponse('Prompt not found', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new NextResponse(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Failed to update prompt', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<string>> {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new NextResponse('Prompt deleted successfully', {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Failed to delete prompt', { status: 500 });
  }
}
