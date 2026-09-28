/**
 * Generate the credit note PDF template from the INVOICE template — ELE-1704.
 *
 * 🔴 Derived, never hand-maintained. The invoice template is live and moves
 * (ELE-1571's grant rows and the `heldUntilPaid` certificate branch both
 * landed after the repo's copy was taken, so the first credit note template
 * was built on a stale base). Re-run this against a fresh pull of the live
 * body and the credit note inherits every fix automatically.
 *
 *   node scripts/build-credit-note-template.mjs <invoice-template.html> [out]
 *
 * Every substitution asserts its anchor. If the invoice template changes
 * under one of them this fails loudly rather than silently emitting a
 * half-transformed document.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = process.argv[2] ?? 'docs/pdf-monkey-invoice-template.html';
const OUT = process.argv[3] ?? 'docs/pdf-monkey-credit-note-template.html';

let s = readFileSync(SRC, 'utf8');
const before = s.length;
let n = 0;

const rep = (a, b, why) => {
  if (!s.includes(a)) throw new Error(`ANCHOR MISSING (${why}):\n${a.slice(0, 160)}`);
  const count = s.split(a).length - 1;
  if (count !== 1) throw new Error(`ANCHOR NOT UNIQUE (${count}) for ${why}`);
  s = s.replace(a, b);
  n++;
};
const cut = (startMark, endMark, replacement, why) => {
  const i = s.indexOf(startMark);
  if (i < 0) throw new Error(`START MISSING (${why})`);
  const j = s.indexOf(endMark, i + startMark.length);
  if (j < 0) throw new Error(`END MISSING (${why})`);
  s = s.slice(0, i) + replacement + s.slice(j);
  n++;
};

/* ── Layout: the title row gained a wider third cell ─────────────────── */
rep(
  '.title-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; }',
  '.title-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin-bottom: 10px; }',
  'title row gap'
);
rep(
  '.meta-cells { display: flex; gap: 26px; text-align: right; }',
  // "Against invoice" is wider than the date it replaces, which pushed "Ref"
  // off the printable area. Wrap instead of overflowing.
  '.meta-cells { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px 18px; text-align: right; max-width: 62%; }',
  'meta cells wrap'
);

/* ── Dead CSS: the bank grid goes with the "How to pay" block ─────────── */
for (const dead of [
  '      .bank-grid { display: flex; gap: 18px; }\n',
  '      .bank-cell { flex: 1; }\n',
]) {
  rep(dead, '', `dead css ${dead.trim().slice(0, 18)}`);
}
s = s.replace(/^\s*\.bank-cell \.value.*\n/gm, '');

/* ── Vertical rhythm ──────────────────────────────────────────────────
 *
 * A credit note is a SHORT document — usually one line and a total — but it
 * inherits spacing tuned for a page of invoice items. The first real PDF came
 * back as TWO pages with nothing on the second but the footer.
 *
 * These are the invoice's own values reduced, not new ones invented: the
 * credit note has already dropped three whole blocks (key facts, how to pay,
 * terms), so the rhythm can close up without looking cramped. Verified by
 * regenerating an actual PDF and counting its pages.
 */
for (const [a, bb, why] of [
  ['.brand-bar { height: 6px; border-radius: 3px; margin-bottom: 16px;',
   '.brand-bar { height: 6px; border-radius: 3px; margin-bottom: 10px;', 'brand bar'],
  ['.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; padding-bottom: 14px;',
   '.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; padding-bottom: 10px;', 'header'],
  ['.two-col { display: flex; gap: 16px; margin-bottom: 16px; page-break-inside: avoid; }',
   '.two-col { display: flex; gap: 16px; margin-bottom: 11px; page-break-inside: avoid; }', 'two col'],
  ['.description-card { border: 1px solid #eceef1; border-radius: 12px; padding: 16px 20px; margin-bottom: 18px; }',
   '.description-card { border: 1px solid #eceef1; border-radius: 12px; padding: 13px 20px; margin-bottom: 11px; }', 'description card'],
  ['.totals-section { display: flex; justify-content: flex-end; margin-top: 6px; margin-bottom: 16px; page-break-inside: avoid; }',
   '.totals-section { display: flex; justify-content: flex-end; margin-top: 6px; margin-bottom: 11px; page-break-inside: avoid; }', 'totals'],
  ['.payment-block { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; page-break-inside: avoid; margin-bottom: 16px; }',
   '.payment-block { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; page-break-inside: avoid; margin-bottom: 8px; }', 'payment block'],
]) {
  if (!s.includes(a)) throw new Error(`TIGHTEN ANCHOR MISSING (${why})`);
  s = s.replace(a, bb);
  n++;
}

/* Dead CSS for blocks this document no longer has. */
{
  const deadPrefixes = ['      .facts ', '      .fact ', '      .fact.', '      .terms-block ', '      .terms-list ', '      .terms-list li'];
  s = s
    .split('\n')
    .filter((line) => !deadPrefixes.some((d) => line.startsWith(d.trimEnd() + ' ') || line.startsWith(d)))
    .join('\n');
  n++;
}

/* ── Identity ─────────────────────────────────────────────────────────── */
rep('<div class="doc-title">INVOICE</div>', '<div class="doc-title">CREDIT NOTE</div>', 'doc title');
rep(
  '<div class="doc-number">{{ invoice.invoiceNumber }}{% if invoice.purchaseOrder != blank %} &nbsp;·&nbsp; PO {{ invoice.purchaseOrder }}{% endif %}</div>',
  `<div class="doc-number">{{ creditNote.number }}</div>
          <!-- HMRC expects a credit note to identify the invoice it corrects.
               Not decoration: it is what makes the pair reconcilable. -->
          <div class="doc-number" style="font-weight: 500; font-size: 11px; margin-top: 2px;">{{ creditNote.reference }}</div>`,
  'doc number + statutory reference'
);

rep(
  `          <div class="meta-cell">
            <div class="label">Issued</div>
            <div class="value num">{{ invoice.createdAt | date: "%d %b %Y" }}</div>
          </div>
          <div class="meta-cell">
            <div class="label">Due</div>
            <div class="value num">{{ invoice.dueDate | date: "%d %b %Y" }}</div>
          </div>`,
  `          <div class="meta-cell">
            <div class="label">Issued</div>
            <div class="value num">{{ creditNote.issuedAt | date: "%d %b %Y" }}</div>
          </div>
          <!-- No "Due" cell. Nothing is owed on a credit note, and a due date
               on one reads as a demand for the money being given back. -->
          <div class="meta-cell">
            <div class="label">Against invoice</div>
            <div class="value num">{{ invoice.invoiceNumber }}</div>
          </div>`,
  'meta cells'
);

/* ── The hero band ────────────────────────────────────────────────────── */
cut(
  '      <!-- ── Amount-due band: the hero ── -->',
  '      <!-- ── Bill to / Job ── -->',
  `      <!-- ── Credit band: the hero ──
           One figure, unconditional. The invoice's band switches between
           "Amount due", "Balance due" and a paid stamp; none of those states
           exist here — a credit note has exactly one number and it is not
           owed by anyone.

           The figure is the SAVED total from credit_notes.total, not a
           re-derivation: that is what the electrician approved and what every
           other surface reads. generate-pdf-monkey refuses to render if its
           own recompute disagrees, so the rows below cannot contradict it. -->
      <div class="amount-band">
        <div>
          <div class="label">Total credited</div>
          <div class="amount-figure num">{{ creditNote.totalFormatted }}</div>
          {% if creditNote.reason != blank %}
          <div style="font-size: 10.5px; color: #374151; margin-top: 3px;">
            {{ creditNote.reason }}
          </div>
          {% endif %}
        </div>
        <div class="amount-side">
          <span class="label" style="display: block; margin-bottom: 5px;">Credit note</span>
          <span class="num" style="display: inline-block; font-size: 13px; font-weight: 700; color: {{ branding.primaryColor | default: '#1e40af' }}; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 6px 14px;">{{ creditNote.number }}</span>
        </div>
      </div>

`,
  'hero band'
);

rep('<div class="card-header">Billed to</div>', '<div class="card-header">Credited to</div>', 'billed to');
rep('accompanies this invoice.', 'accompanies the invoice this credits.', 'certificate wording');

/* ── Totals ───────────────────────────────────────────────────────────── */
rep(
  `{% if invoice.totalPaidFormatted != blank and invoice.isPaid != true and calculations.cisAmount == 0 and calculations.grantAmount == 0 %}
          <div class="totals-row" style="font-weight: 600;">
            <span>Total</span>
            <span class="amount num">{% if calculations.totalFormatted != blank %}{{ calculations.totalFormatted }}{% else %}£{{ calculations.total | round: 2 }}{% endif %}</span>
          </div>
          {% endif %}
          {% if invoice.totalPaidFormatted != blank and invoice.isPaid != true %}
          <div class="totals-row settled">
            <span>Received to date</span>
            <span class="amount num">&minus;{{ invoice.totalPaidFormatted }}</span>
          </div>
          {% endif %}
`,
  `<!-- The invoice's "Received to date" rows are deliberately absent. What has
               been paid against the ORIGINAL invoice does not change what this
               document credits, and showing it here invites the credit and the
               payment to be netted off twice. -->
`,
  'paid-state totals rows'
);

rep(
  `            <span>{% if invoice.isPaid %}Total &mdash; paid{% elsif invoice.totalPaidFormatted != blank %}Balance due{% else %}Amount due{% endif %}</span>
            <span class="amount num">
              {% if invoice.totalPaidFormatted != blank and invoice.isPaid != true %}{{ calculations.balanceDueFormatted }}{% elsif calculations.cisAmount > 0 or calculations.grantAmount > 0 %}{% if calculations.netPayableFormatted != blank %}{{ calculations.netPayableFormatted }}{% else %}£{{ calculations.netPayable | round: 2 }}{% endif %}{% else %}{% if calculations.totalFormatted != blank %}{{ calculations.totalFormatted }}{% else %}£{{ calculations.total | round: 2 }}{% endif %}{% endif %}
            </span>`,
  `            <span>{% if calculations.cisAmount > 0 %}Total credited after CIS{% else %}Total credited{% endif %}</span>
            <span class="amount num">{% if calculations.cisAmount > 0 %}{{ creditNote.netAfterCisFormatted }}{% else %}{{ creditNote.totalFormatted }}{% endif %}</span>`,
  'final totals row'
);

rep(
  '<span>Less CIS ({{ calculations.cisRate }}% on labour)</span>',
  '<span>CIS reversed ({{ calculations.cisRate }}% on credited labour)</span>',
  'CIS row label'
);

/* ── Reverse charge ───────────────────────────────────────────────────── */
rep(
  `        <strong>VAT reverse charge applies.</strong>
        Customer to account to HMRC for the VAT of
        <strong>{% if calculations.notionalVatFormatted != blank %}{{ calculations.notionalVatFormatted }}{% else %}£{{ calculations.notionalVat | round: 2 }}{% endif %}</strong> ({{ calculations.vatRate }}%).
        This invoice shows £0 VAT &mdash; do not pay the VAT to the supplier. VAT Act 1994, s.55A.`,
  `        <strong>VAT reverse charge applies.</strong>
        This credits a supply on which the customer accounted to HMRC for the VAT of
        <strong>{% if calculations.notionalVatFormatted != blank %}{{ calculations.notionalVatFormatted }}{% else %}£{{ calculations.notionalVat | round: 2 }}{% endif %}</strong> ({{ calculations.vatRate }}%).
        Adjust that VAT on your return. This credit note shows £0 VAT. VAT Act 1994, s.55A.`,
  'reverse charge statement'
);

/* ── Facts + "How to pay" + bank details, and the terms block ─────────── */
cut(
  '      <!-- ── Key facts ── -->',
  '      <!-- ── Terms ── -->',
  `      <!-- ── What happens next ──
           Replaces the invoice's key facts, "How to pay" and bank details
           WHOLESALE. Printing an account number on a document that gives
           money back is an invitation to pay it again, and payment terms and
           late-payment interest are meaningless on a credit. -->
      <div class="payment-block">
        <div class="payment-header">What this credit note does</div>
        <div class="payment-body">
          <p style="font-size: 10.5px; color: #111827;">
            This credit note reduces what is owed on invoice
            <strong>{{ invoice.invoiceNumber }}</strong> by
            <strong class="num">{{ creditNote.totalFormatted }}</strong>.
          </p>
          <p style="font-size: 9.5px; color: #374151; margin-top: 8px;">
            {% if creditNote.alreadyPaid %}
            As that invoice has already been paid, this amount is refundable to you.
            {% else %}
            Please settle the invoice net of this credit.
            {% endif %}
            Quote <strong>{{ creditNote.number }}</strong> alongside invoice
            <strong>{{ invoice.invoiceNumber }}</strong> in any correspondence.
          </p>
        </div>
      </div>

`,
  'facts + payment block'
);

{
  // The terms block carries the invoice's payment terms ("Payment due within
  // 14 days of the date of this document"), which on a credit note reads as a
  // demand for the money being given back.
  const i = s.indexOf('      <!-- ── Terms ── -->');
  if (i < 0) throw new Error('START MISSING (terms block)');
  const j = s.indexOf('<!--', i + 10);
  if (j < 0) throw new Error('END MISSING (terms block)');
  if (!s.slice(i, j).includes('terms-block')) throw new Error('terms block not where expected');
  s =
    s.slice(0, i) +
    `      <!-- The invoice's terms block is deliberately absent: it carries the
           payment terms, which on a credit note read as a demand. -->

` +
    s.slice(j);
  n++;
}

writeFileSync(OUT, s);
console.log(`${SRC} (${before}b) -> ${OUT} (${s.length}b), ${n} anchored transforms`);
