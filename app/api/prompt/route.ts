import { connectToDB } from '@utils/database';
import { NextRequest, NextResponse } from 'next/server';
import Prompt, { PromptType } from '@models/prompt';

export async function GET(
  req: NextRequest
): Promise<NextResponse<PromptType[] | string>> {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');

    return new NextResponse(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Failed to fetch all prompts', { status: 500 });
  }
}
