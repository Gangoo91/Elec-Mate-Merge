/**
 * html-to-pdf.ts
 * Proxy endpoint that converts HTML to PDF via Gotenberg (localhost:3200).
 * Requires X-API-Key auth (reuses existing MCP API key).
 */

import type { Request, Response } from 'express';
import { config } from '../config.js';

const GOTENBERG_URL = process.env.GOTENBERG_URL || 'http://127.0.0.1:3200';
const MAX_HTML_SIZE = 5 * 1024 * 1024; // 5MB

export async function handleHtmlToPdf(req: Request, res: Response): Promise<void> {
  // Auth: require VPS API key
  const apiKey = req.headers['x-api-key'] as string | undefined;
  if (!apiKey || apiKey !== config.vpsApiKey) {
    res.status(401).json({ error: 'Invalid API key' });
    return;
  }

  const { html } = req.body as { html?: string };

  if (!html || typeof html !== 'string') {
    res.status(400).json({ error: 'Missing required field: html (string)' });
    return;
  }

  if (html.length > MAX_HTML_SIZE) {
    res.status(413).json({ error: `HTML payload too large (${html.length} bytes, max ${MAX_HTML_SIZE})` });
    return;
  }

  // Build multipart form for Gotenberg's Chromium HTML conversion
  const boundary = '----GotenbergBoundary' + Date.now();
  const formParts: string[] = [];

  // HTML file part
  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="files"; filename="index.html"\r\n');
  formParts.push('Content-Type: text/html\r\n\r\n');
  formParts.push(html);
  formParts.push('\r\n');

  // Page format
  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="paperWidth"\r\n\r\n');
  formParts.push('8.27');
  formParts.push('\r\n');

  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="paperHeight"\r\n\r\n');
  formParts.push('11.7');
  formParts.push('\r\n');

  // Margins (0 — template handles its own margins via CSS @page)
  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="marginTop"\r\n\r\n');
  formParts.push('0');
  formParts.push('\r\n');

  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="marginBottom"\r\n\r\n');
  formParts.push('0');
  formParts.push('\r\n');

  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="marginLeft"\r\n\r\n');
  formParts.push('0');
  formParts.push('\r\n');

  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="marginRight"\r\n\r\n');
  formParts.push('0');
  formParts.push('\r\n');

  // Print background
  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="printBackground"\r\n\r\n');
  formParts.push('true');
  formParts.push('\r\n');

  // Prefer CSS page size (respect @page rules in template)
  formParts.push(`--${boundary}\r\n`);
  formParts.push('Content-Disposition: form-data; name="preferCssPageSize"\r\n\r\n');
  formParts.push('true');
  formParts.push('\r\n');

  formParts.push(`--${boundary}--\r\n`);

  const formBody = formParts.join('');

  const gotenbergEndpoint = `${GOTENBERG_URL}/forms/chromium/convert/html`;
  let attempt = 0;
  const maxAttempts = 2;

  while (attempt < maxAttempts) {
    attempt++;
    try {
      const pdfResponse = await fetch(gotenbergEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: formBody,
      });

      // Retry once on 503 (queue full)
      if (pdfResponse.status === 503 && attempt < maxAttempts) {
        console.warn('[html-to-pdf] Gotenberg queue full, retrying in 2s...');
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }

      if (!pdfResponse.ok) {
        const errText = await pdfResponse.text();
        console.error(`[html-to-pdf] Gotenberg error (${pdfResponse.status}):`, errText);
        res.status(502).json({
          error: 'PDF generation failed',
          status: pdfResponse.status,
          details: errText,
        });
        return;
      }

      const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', pdfBuffer.length.toString());
      res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
      res.send(pdfBuffer);
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[html-to-pdf] Fetch error (attempt ${attempt}):`, msg);

      if (attempt >= maxAttempts) {
        res.status(502).json({
          error: 'Failed to connect to PDF rendering service',
          details: msg,
        });
        return;
      }

      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}
