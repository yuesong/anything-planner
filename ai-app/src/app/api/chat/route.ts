import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = google('gemini-2.0-flash-001');

  const result = streamText({ model, messages, });

  return result.toDataStreamResponse();
}
