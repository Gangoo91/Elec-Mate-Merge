/**
 * ELE-2071 accuracy run: reads the ten sample receipts in e2e/fixtures/receipts
 * with EXACTLY the read-receipt prompt and clean-up (extract.ts) and scores
 * supplier, date, gross, VAT and VAT number against expected.json.
 *
 *   OPENAI_API_KEY=… deno run --allow-read --allow-env --allow-net scripts/receipts/run-receipt-samples.ts [--limit 10]
 *
 * One OpenAI call per sample (gpt-5.4-mini-2026-03-17, max_completion_tokens,
 * no temperature). Without a key it only checks the files and the clean-up.
 */
import { RECEIPT_MODEL, buildMessages, normaliseExtraction } from '../../supabase/functions/read-receipt/extract.ts';

const DIR = new URL('../../e2e/fixtures/receipts/', import.meta.url);
type Expected = {
  file: string;
  supplier: string;
  date: string;
  gross: number;
  vat: number;
  vat_number?: string;
  invoice_number?: string;
  kind: 'receipt' | 'bill';
};
const expected: Expected[] = JSON.parse(await Deno.readTextFile(new URL('expected.json', DIR)));
const limitArg = Deno.args.indexOf('--limit');
const limit = limitArg >= 0 ? Number(Deno.args[limitArg + 1]) : expected.length;
const key = Deno.env.get('OPENAI_API_KEY');

function b64(bytes: Uint8Array) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

// The clean-up on a typical model answer, so the run is useful without a key.
const sanity = normaliseExtraction({
  supplier: 'Northgate', date: '09/10/2026', gross: '£104.80', vat: 17.47,
  supplier_vat_number: 'GB 284 1937 52', lines: [{ description: 'T&E', net: 62.5 }],
});
console.log('clean-up check', sanity.date === '2026-10-09' && sanity.gross === 104.8 && sanity.net === 87.33 &&
  sanity.supplier_vat_number === 'GB284193752' && sanity.totals_agree === true ? 'OK' : `FAILED ${JSON.stringify(sanity)}`);

if (!key) {
  for (const e of expected) await Deno.stat(new URL(e.file, DIR));
  console.log(`${expected.length} sample files present. Set OPENAI_API_KEY to run the AI read.`);
  Deno.exit(0);
}

let hits = 0;
let fields = 0;
const rows: string[] = [];
for (const e of expected.slice(0, limit)) {
  const bytes = await Deno.readFile(new URL(e.file, DIR));
  const mime = e.file.endsWith('.pdf') ? 'application/pdf' : 'image/png';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: RECEIPT_MODEL,
      messages: buildMessages(mime, b64(bytes), e.file),
      max_completion_tokens: 1800,
      response_format: { type: 'json_object' },
    }),
  });
  const body = await res.json();
  const x = normaliseExtraction(JSON.parse(body?.choices?.[0]?.message?.content ?? '{}'));
  const checks: [string, boolean][] = [
    ['supplier', !!x.supplier && x.supplier.toLowerCase().includes(e.supplier.toLowerCase())],
    ['date', x.date === e.date],
    ['gross', x.gross === e.gross],
    ['vat', (x.vat ?? 0) === e.vat],
    ...(e.vat_number ? [['vat_number', x.supplier_vat_number === e.vat_number] as [string, boolean]] : []),
    ...(e.invoice_number ? [['invoice_number', x.invoice_number === e.invoice_number] as [string, boolean]] : []),
    ['kind', x.kind === e.kind],
  ];
  hits += checks.filter((c) => c[1]).length;
  fields += checks.length;
  rows.push(`${e.file.padEnd(32)} ${checks.map(([k, ok]) => `${ok ? '✓' : '✗'}${k}`).join(' ')}  gross ${x.gross} vat ${x.vat}`);
}
console.log(rows.join('\n'));
console.log(`Fields right: ${hits}/${fields} (${Math.round((hits / fields) * 100)}%)`);
