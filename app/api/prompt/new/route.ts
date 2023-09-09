import { connectToDB } from '@utils/database';
import { NextRequest, NextResponse } from 'next/server';
import Prompt, { IPrompt } from '@models/prompt';

export async function POST(
  req: NextRequest
): Promise<NextResponse<IPrompt> | string> {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new NextResponse(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse('Failed to create new prompt', { status: 500 });
  }
}
