import { GoogleGenerativeAI } from '@google/generative-ai';
import { StreamingTextResponse, GoogleGenerativeAIStream, type Message } from 'ai'; // Used GoogleGenerativeAIStream

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Extract the last user message for the prompt
    const userMessageContent = messages[messages.length - 1].content;

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_GENERATIVE_AI_API_KEY is not set.');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // For older patterns, ensure the prompt structure is what Gemini expects.
    // `generateContentStream` takes `GenerateContentRequest` which has `contents`.
    const stream = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: userMessageContent }] }],
        // Consider adding generationConfig and safetySettings if needed
    });

    // Adapt the stream from Gemini SDK to Vercel AI SDK stream
    const aiStream = GoogleGenerativeAIStream(stream); // Used GoogleGenerativeAIStream

    // Respond with the stream
    return new StreamingTextResponse(aiStream);

  } catch (error: unknown) {
    console.error('Error in chat API:', error);
    let errorDetails = 'Internal server error';
    if (error instanceof Error) {
      errorDetails = error.message;
    }
    return new Response(JSON.stringify({ error: errorDetails }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
