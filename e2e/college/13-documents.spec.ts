/**
 * Journey 13 — college documents are made on the server (ELE-2017).
 *
 * As the fixture tutor, asks learner-document-pdf for each college document
 * and checks a signed PDF link comes back and the file is a real PDF. Renders
 * are cached by fingerprint, so a re-run reuses the same files.
 */
import { writeFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { actor, haveCreds, SUPABASE_URL } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('college documents come back as real PDFs', async () => {
  test.setTimeout(6 * 60_000);
  const t = await actor('tutor');
  const { data: plan } = await t.db.from('college_lesson_plans').select('id').not('content', 'is', null).limit(1).maybeSingle();
  const requests: Record<string, unknown>[] = [
    { kind: 'college_value' },
    { kind: 'quality_report' },
    { kind: 'ofsted_lens' },
    { kind: 'audit_pack' },
  ];
  if (plan) requests.push({ kind: 'lesson_plan', lessonPlanId: (plan as { id: string }).id });
  for (const body of requests) {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/learner-document-pdf`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${t.session.access_token}` },
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as { url?: string; error?: string };
    expect(res.ok, `${body.kind}: ${json.error ?? res.status}`).toBe(true);
    expect(json.url, `${body.kind} returned no link`).toBeTruthy();
    const pdf = await fetch(json.url as string);
    const bytes = new Uint8Array(await pdf.arrayBuffer());
    // SAVE_PDF_DIR=<folder> keeps each file for reading by eye.
    if (process.env.SAVE_PDF_DIR) writeFileSync(`${process.env.SAVE_PDF_DIR}/${body.kind}.pdf`, bytes);
    const head = bytes.slice(0, 5);
    expect(String.fromCharCode(...head), `${body.kind} is not a PDF`).toBe('%PDF-');
  }
});
