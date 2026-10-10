/**
 * Fills NET's own AM2S v1 Candidate Checklist PDF (form 25.12) from the
 * answers and signatures in the app, and builds the NET booking pack: a
 * cover sheet (gateway evidence, signatures, what to attach) followed by the
 * complete, filled checklist. ELE-2050.
 *
 * NET's PDF is a fillable form. Its 106 tick-box groups (53 items × Knowledge
 * and Experience) are named Group1 … Group100 with a few lettered extras, so
 * they are matched to items by POSITION, not by name: page, then row (top to
 * bottom), then Knowledge (left block) or Experience (right block); within a
 * group the four boxes left to right are Limited, Adequate, Extensive,
 * Unsure. The export refuses to fill a PDF whose layout does not give
 * exactly 53 rows, so a changed form is never filled wrongly.
 *
 * The result is flattened: a signed checklist should not be editable.
 */
import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFRadioGroup,
  PDFTextField,
  PDFCheckBox,
  PDFButton,
  StandardFonts,
  rgb,
  type PDFPage,
  type PDFFont,
} from 'pdf-lib';
import {
  ALL_ITEMS,
  FORM_PDF_PATH,
  NET_AM2S_FORM,
  NET_SUBMITTING,
  RATINGS,
  type Rating,
} from '@/data/net/am2sV1Checklist';

export interface ChecklistRow {
  registered_version: '1.1' | '1.2' | null;
  ni_number: string | null;
  uln: string | null;
  ratings: Record<string, { k?: Rating; e?: Rating }>;
  action_plan: string | null;
  cert_delivery: 'employer' | 'apprentice' | null;
  cert_recipient_name: string | null;
  cert_organisation: string | null;
  cert_address: string | null;
  cert_postcode: string | null;
}

export interface SignatureInfo {
  signer_name: string | null;
  signer_company?: string | null;
  signed_at: string | null;
  signature_image: string | null;
  stale?: boolean;
}

export interface PackInput {
  learnerName: string;
  collegeName: string | null;
  employerName: string | null;
  checklist: ChecklistRow;
  signatures: Partial<Record<'candidate' | 'employer' | 'provider', SignatureInfo>>;
  applyBy: string | null;
  /** Gateway gate items from get_gateway_readiness, for the cover sheet. */
  gateway?: Array<{ label: string; state: string; sentence: string }>;
  qualification?: string | null;
}

const ukDate = (iso: string | null | undefined) => {
  if (!iso) return '';
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/London',
  });
};

const longDate = (iso: string | null | undefined) => {
  if (!iso) return '';
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/London',
  });
};

interface GroupPos {
  field: PDFRadioGroup;
  page: number;
  x: number;
  y: number;
}

/** Item key → [knowledge group, experience group], by position on NET's form. */
function mapGroups(doc: PDFDocument): Map<string, [PDFRadioGroup, PDFRadioGroup]> {
  const pages = doc.getPages();
  const groups: GroupPos[] = [];
  for (const f of doc.getForm().getFields()) {
    if (!(f instanceof PDFRadioGroup)) continue;
    const w = f.acroField.getWidgets()[0];
    if (!w) continue;
    const r = w.getRectangle();
    const pIdx = pages.findIndex((pg) => pg.ref === w.P());
    groups.push({ field: f, page: pIdx, x: r.x, y: r.y });
  }
  groups.sort((a, b) => a.page - b.page || b.y - a.y || a.x - b.x);
  // Rows: same page, y within 6pt.
  const rows: GroupPos[][] = [];
  for (const g of groups) {
    const last = rows[rows.length - 1];
    if (last && last[0].page === g.page && Math.abs(last[0].y - g.y) < 6) last.push(g);
    else rows.push([g]);
  }
  if (rows.length !== ALL_ITEMS.length || rows.some((r) => r.length !== 2)) {
    throw new Error(
      `NET's checklist PDF has changed (${rows.length} rows found, ${ALL_ITEMS.length} expected). Download the current form from NET and fill it by hand.`
    );
  }
  const out = new Map<string, [PDFRadioGroup, PDFRadioGroup]>();
  rows.forEach((r, i) => {
    const [k, e] = r.sort((a, b) => a.x - b.x);
    out.set(ALL_ITEMS[i].key, [k.field, e.field]);
  });
  return out;
}

/** Ticks box `index` (0 Limited … 3 Unsure, left to right) in a radio group, using the box's own on-state. */
function tick(group: PDFRadioGroup, rating: Rating | undefined) {
  if (!rating) return;
  const index = RATINGS.findIndex((r) => r.value === rating);
  const widgets = [...group.acroField.getWidgets()].sort(
    (a, b) => a.getRectangle().x - b.getRectangle().x
  );
  if (widgets.length !== 4) throw new Error('Unexpected tick box layout on NET’s form.');
  widgets.forEach((w, i) => {
    const ap = w.dict.lookup(PDFName.of('AP'));
    const n = ap instanceof PDFDict ? ap.lookup(PDFName.of('N')) : undefined;
    const on =
      n instanceof PDFDict
        ? n
            .keys()
            .map((k) => k.decodeText())
            .find((k) => k !== 'Off')
        : undefined;
    if (i === index && on) {
      w.dict.set(PDFName.of('AS'), PDFName.of(on));
      group.acroField.dict.set(PDFName.of('V'), PDFName.of(on));
    } else {
      w.dict.set(PDFName.of('AS'), PDFName.of('Off'));
    }
  });
}

function setText(doc: PDFDocument, name: string, value: string | null | undefined) {
  const f = doc.getForm().getFieldMaybe(name);
  if (f instanceof PDFTextField) f.setText(value ?? '');
}

function check(doc: PDFDocument, name: string, on: boolean) {
  const f = doc.getForm().getFieldMaybe(name);
  if (!(f instanceof PDFCheckBox)) return;
  if (on) f.check();
  else f.uncheck();
}

/** NET's signature boxes are push buttons with no appearance; pdf-lib cannot
 *  flatten or remove those the usual way, so the widget is taken off the
 *  page and the field out of the form by hand. */
function dropButton(doc: PDFDocument, f: PDFButton) {
  for (const w of f.acroField.getWidgets()) {
    const ref = doc.context.getObjectRef(w.dict);
    const page = doc.getPages().find((pg) => pg.ref === w.P());
    if (page && ref) page.node.removeAnnot(ref);
  }
  doc.getForm().acroForm.removeField(f.acroField);
}

async function drawSignature(
  doc: PDFDocument,
  fieldName: string,
  dataUrl: string | null | undefined
) {
  const f = doc.getForm().getFieldMaybe(fieldName);
  if (!(f instanceof PDFButton)) return;
  const w = f.acroField.getWidgets()[0];
  const page = doc.getPages().find((pg) => pg.ref === w.P());
  if (page && dataUrl) {
    const r = w.getRectangle();
    const img = await doc.embedPng(dataUrl);
    const scale = Math.min((r.width - 6) / img.width, (r.height - 4) / img.height);
    page.drawImage(img, {
      x: r.x + 3,
      y: r.y + (r.height - img.height * scale) / 2,
      width: img.width * scale,
      height: img.height * scale,
    });
  }
  dropButton(doc, f);
}

/** NET's checklist, filled. Unsigned parts stay blank. */
export async function fillNetChecklist(input: PackInput): Promise<Uint8Array> {
  const res = await fetch(FORM_PDF_PATH);
  if (!res.ok) throw new Error('Could not load NET’s checklist form.');
  const doc = await PDFDocument.load(await res.arrayBuffer());
  const c = input.checklist;
  const sig = input.signatures;
  const live = (s?: SignatureInfo) => (s && s.signed_at && !s.stale ? s : undefined);

  // Page 1
  check(doc, 'Tick 1 FC', c.registered_version === '1.1');
  check(doc, 'Tick 2 FC', c.registered_version === '1.2');
  setText(doc, 'Candidate Name', input.learnerName);
  setText(doc, 'NI Number', c.ni_number);
  setText(doc, 'Candidate ULN', c.uln);

  // Sections A1 to E
  const map = mapGroups(doc);
  for (const item of ALL_ITEMS) {
    const pair = map.get(item.key)!;
    tick(pair[0], c.ratings[item.key]?.k);
    tick(pair[1], c.ratings[item.key]?.e);
  }

  // Page 8: behaviours, signed by the employer
  const emp = live(sig.employer);
  setText(doc, 'Candidates Name 1', input.learnerName);
  setText(doc, 'Company Name 1A', emp?.signer_company ?? '');
  setText(doc, 'Print Name 1A', emp?.signer_name ?? '');
  setText(doc, 'Date 1A', ukDate(emp?.signed_at));

  // Pages 9–10: declarations
  const cand = live(sig.candidate);
  const prov = live(sig.provider);
  setText(doc, 'Print Name 2', cand?.signer_name ?? '');
  setText(doc, 'Date 2', ukDate(cand?.signed_at));
  setText(doc, 'Print Name 3', emp?.signer_name ?? '');
  setText(doc, 'Date 3', ukDate(emp?.signed_at));
  setText(doc, 'Print Name 4', prov?.signer_name ?? '');
  setText(doc, 'Date 4', ukDate(prov?.signed_at));

  // Completion certificate (training provider use, England)
  check(doc, 'Tick 13', c.cert_delivery === 'employer');
  check(doc, 'Tick 14', c.cert_delivery === 'apprentice');
  if (c.cert_delivery === 'employer') {
    setText(doc, 'Name of Recipient', c.cert_recipient_name);
    setText(doc, 'Organisation if applicable', c.cert_organisation);
    setText(doc, 'Recipient Address', c.cert_address);
    setText(doc, 'Recipient Postcode', c.cert_postcode);
  }

  await drawSignature(doc, 'Candidate Signature', cand?.signature_image);
  await drawSignature(doc, 'Employer Signature', emp?.signature_image);
  await drawSignature(doc, 'Training Provider Signature', prov?.signature_image);

  const form = doc.getForm();
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  form.updateFieldAppearances(helv);
  // Radio appearances were set by state above; regenerating them would use
  // the form's broken option list, so the flatten keeps them as they are.
  form.flatten({ updateFieldAppearances: false });
  return doc.save();
}

/* ── Cover sheet ─────────────────────────────────────────────────────── */

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > width && line) {
        out.push(line);
        line = word;
      } else line = next;
    }
    out.push(line);
  }
  return out;
}

/** WinAnsi-safe text for the standard fonts. */
const safe = (s: string) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/•/g, '-')
    .replace(/[^\x20-\x7E£·\n]/g, '');

async function coverSheet(input: PackInput): Promise<PDFDocument> {
  const doc = await PDFDocument.create();
  const reg = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const W = 595.28;
  const H = 841.89;
  const M = 48;
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;
  const ink = rgb(0.06, 0.09, 0.16);

  const text = (t: string, size = 10.5, font = reg, gap = 4) => {
    for (const line of wrap(safe(t), font, size, W - M * 2)) {
      if (y < M + 20) {
        page = doc.addPage([W, H]);
        y = H - M;
      }
      page.drawText(line, { x: M, y: y - size, size, font, color: ink });
      y -= size + gap;
    }
  };
  const rule = () => {
    y -= 6;
    page.drawLine({
      start: { x: M, y },
      end: { x: W - M, y },
      thickness: 0.5,
      color: rgb(0.8, 0.82, 0.86),
    });
    y -= 12;
  };

  page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: rgb(0.98, 0.8, 0.08) });
  text('NET booking pack: AM2S v1', 20, bold, 8);
  text(`${input.learnerName}${input.collegeName ? ` · ${input.collegeName}` : ''}`, 12, reg, 4);
  text(`Prepared ${longDate(new Date().toISOString())} in Elec-Mate.`, 10, reg, 2);
  rule();

  text('Apprentice', 12, bold, 6);
  const c = input.checklist;
  text(`Name: ${input.learnerName}`);
  text(`ULN: ${c.uln || 'not recorded'}    NI number: ${c.ni_number || 'not recorded'}`);
  text(
    `Registered version with the Apprenticeship Service: ${c.registered_version ?? 'not ticked'}`
  );
  if (input.employerName) text(`Employer: ${input.employerName}`);
  if (input.qualification) text(`Qualification: ${input.qualification}`);
  rule();

  text('AM2S v1 Candidate Checklist', 12, bold, 6);
  text(
    `NET form ${NET_AM2S_FORM.version} (${NET_AM2S_FORM.published}), filled on NET's own PDF: the pages after this one.`
  );
  const sigLine = (label: string, s?: SignatureInfo) =>
    text(
      `${label}: ${
        !s?.signed_at
          ? 'not signed'
          : s.stale
            ? `signed ${longDate(s.signed_at)} on earlier answers. Must sign again.`
            : `signed by ${s.signer_name}${s.signer_company ? ` (${s.signer_company})` : ''} on ${longDate(s.signed_at)}`
      }`
    );
  sigLine('Apprentice declaration', input.signatures.candidate);
  sigLine('Employer behaviours statement and declaration', input.signatures.employer);
  sigLine('Training provider declaration', input.signatures.provider);
  if (input.applyBy)
    text(
      `NET will only accept dated signatures within 6 months of the gateway application: apply by ${longDate(input.applyBy)}.`,
      10.5,
      bold
    );
  if (c.action_plan) {
    y -= 4;
    text('Action plan agreed for any gaps', 10.5, bold);
    text(c.action_plan);
  }
  rule();

  if (input.gateway?.length) {
    text('Gateway checks in Elec-Mate', 12, bold, 6);
    for (const g of input.gateway) {
      const mark = g.state === 'green' ? 'Done' : g.state === 'amber' ? 'Check' : 'Missing';
      text(`${mark}: ${g.label}. ${g.sentence}`);
    }
    rule();
  }

  text('Attach before you submit (NET mandatory evidence)', 12, bold, 6);
  text(
    '- The technical qualification certificate: City & Guilds 601/6299-5 (5357-23 or 5357-94) or EAL 601/7345/2 (v1.1).'
  );
  text(
    '- Maths and English Level 2 certificates (if the learner was 19 or under at the start of their apprenticeship).'
  );
  text(`Source: ${NET_AM2S_FORM.pageUrl}`, 9.5);
  rule();

  text('Submitting this checklist (NET)', 12, bold, 6);
  text(NET_SUBMITTING);
  return doc;
}

/** Cover sheet followed by NET's complete, filled checklist. */
export async function buildBookingPack(input: PackInput): Promise<Uint8Array> {
  const cover = await coverSheet(input);
  const filled = await PDFDocument.load(await fillNetChecklist(input));
  const pages = await cover.copyPages(filled, filled.getPageIndices());
  pages.forEach((p) => cover.addPage(p));
  return cover.save();
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
