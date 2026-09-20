// Phase 8: Streaming Response Utilities
// Enables real-time token streaming for better UX

export interface StreamChunk {
  type: 'token' | 'citation' | 'tool_call' | 'done' | 'error';
  content?: string;
  data?: any;
}

export class StreamingResponseBuilder {
  private encoder = new TextEncoder();
  private controller: ReadableStreamDefaultController;

  constructor(controller: ReadableStreamDefaultController) {
    this.controller = controller;
  }

  sendToken(token: string) {
    this.sendChunk({ type: 'token', content: token });
  }

  sendCitation(citation: any) {
    this.sendChunk({ type: 'citation', data: citation });
  }

  sendToolCall(toolCall: any) {
    this.sendChunk({ type: 'tool_call', data: toolCall });
  }

  sendError(error: string) {
    this.sendChunk({ type: 'error', content: error });
  }

  sendDone() {
    this.sendChunk({ type: 'done' });
  }

  private sendChunk(chunk: StreamChunk) {
    const message = `data: ${JSON.stringify(chunk)}\n\n`;
    this.controller.enqueue(this.encoder.encode(message));
  }

  close() {
    this.controller.close();
  }
}

export async function streamOpenAIResponse(
  openAIResponse: Response,
  builder: StreamingResponseBuilder
): Promise<string> {
  const reader = openAIResponse.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullResponse = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            fullResponse += content;
            builder.sendToken(content);
          }

          // Handle tool calls
          const toolCalls = parsed.choices?.[0]?.delta?.tool_calls;
          if (toolCalls) {
            for (const toolCall of toolCalls) {
              builder.sendToolCall(toolCall);
            }
          }
        } catch (e) {
          // Ignore parse errors for incomplete JSON
        }
      }
    }
  }

  return fullResponse;
}

export function createStreamingResponse(
  callback: (builder: StreamingResponseBuilder) => Promise<void>,
  corsHeaders: Record<string, string>
): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const builder = new StreamingResponseBuilder(controller);
      try {
        await callback(builder);
        builder.sendDone();
      } catch (error) {
        builder.sendError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        builder.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}
