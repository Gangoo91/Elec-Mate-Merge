/**
 * safety-pdf-renderer.ts
 * Converts HTML to PDF via Browserless.io REST API.
 * Professional A4 output with running footer (page numbers + Powered by Elec-Mate).
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
          margin: { top: '0mm', right: '0mm', bottom: '14mm', left: '0mm' },
          displayHeaderFooter: true,
          headerTemplate: '<span></span>',
          footerTemplate: `
            <div style="width: 100%; font-family: 'Inter', Arial, sans-serif; font-size: 7px; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; padding: 0 32px;">
              <span>Powered by <strong style="color: #f59e0b; font-weight: 700;">Elec-Mate</strong></span>
              <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
            </div>
          `,
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
