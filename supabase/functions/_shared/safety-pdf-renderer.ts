/**
 * safety-pdf-renderer.ts
 * Converts HTML to PDF via Browserless.io REST API.
 */

export async function htmlToPdf(html: string): Promise<Uint8Array> {
  const token = Deno.env.get('BROWSERLESS_TOKEN');
  if (!token) throw new Error('BROWSERLESS_TOKEN not configured');

  const res = await fetch(
    `https://production-sfo.browserless.io/pdf?token=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        html,
        options: {
          format: 'A4',
          printBackground: true,
          margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Browserless PDF failed (${res.status}): ${errText}`);
  }

  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}
