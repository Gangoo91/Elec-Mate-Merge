/**
 * crisisResourcesPdf — printable mental health crisis documents.
 *
 * Two generators:
 *   - generateCrisisPlanPdf: a fill-in-by-hand personal crisis plan template
 *     (kept generic on purpose — no personal data leaves the device).
 *   - generateEmergencyContactsPdf: a wallet-fold card of verified UK
 *     helplines for the trade.
 *
 * Helpline numbers here must stay in step with
 * src/components/mental-health/crisis/CrisisResourcesData.ts — both were
 * verified against the charities' own sites in July 2026.
 */
import jsPDF from 'jspdf';
import { DEFAULT_BRAND, ensureSpace, addAccentBar, type RGB } from '@/utils/pdfBrand';

const INK: RGB = [17, 24, 39];
const MUTED: RGB = [107, 114, 128];
const RULE: RGB = [209, 213, 219];

const setText = (doc: jsPDF, size: number, colour: RGB, bold = false) => {
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(colour[0], colour[1], colour[2]);
};

const ruledLines = (doc: jsPDF, x: number, y: number, width: number, count: number): number => {
  doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
  doc.setLineWidth(0.2);
  for (let i = 0; i < count; i++) {
    y += 9;
    doc.line(x, y, x + width, y);
  }
  return y;
};

export function generateCrisisPlanPdf(): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const width = pageW - margin * 2;

  addAccentBar(doc, DEFAULT_BRAND, 5);

  let y = 22;
  setText(doc, 20, INK, true);
  doc.text('My crisis plan', margin, y);
  y += 7;
  setText(doc, 10, MUTED);
  doc.text(
    'Fill this in on a good day, keep it somewhere easy to reach on a bad one.',
    margin,
    y
  );
  y += 10;

  const sections: { title: string; hint: string; lines: number }[] = [
    {
      title: '1 · My warning signs',
      hint: 'Thoughts, feelings or behaviours that tell me things are slipping.',
      lines: 3,
    },
    {
      title: '2 · What helps me cope',
      hint: 'Things I can do on my own — breathing, a walk, music, the gym.',
      lines: 3,
    },
    {
      title: '3 · People who take my mind off it',
      hint: 'Name and number — mates, family, someone from the site.',
      lines: 3,
    },
    {
      title: '4 · People I can be honest with',
      hint: 'Who I can tell how bad it actually is.',
      lines: 3,
    },
    {
      title: '5 · Professional support',
      hint: 'GP, counsellor, or a helpline from the card below.',
      lines: 2,
    },
    {
      title: '6 · Making things safer',
      hint: 'Anything I should move out of reach, or places to avoid tonight.',
      lines: 2,
    },
    {
      title: '7 · What matters to me',
      hint: 'The people and reasons worth staying for.',
      lines: 3,
    },
  ];

  for (const s of sections) {
    y = ensureSpace(doc, y, 14 + s.lines * 9, { bottomMargin: 30, topAfterBreak: 20 });
    setText(doc, 12, INK, true);
    doc.text(s.title, margin, y);
    y += 5.5;
    setText(doc, 9, MUTED);
    doc.text(s.hint, margin, y);
    y = ruledLines(doc, margin, y, width, s.lines);
    y += 8;
  }

  y = ensureSpace(doc, y, 22, { bottomMargin: 20, topAfterBreak: 20 });
  doc.setFillColor(254, 226, 226);
  doc.roundedRect(margin, y - 4, width, 16, 2, 2, 'F');
  setText(doc, 10, [153, 27, 27], true);
  doc.text('In immediate danger: call 999.', margin + 5, y + 3);
  setText(doc, 9, [153, 27, 27]);
  doc.text('Samaritans 116 123 (24/7, free) · Text SHOUT to 85258 (24/7)', margin + 5, y + 8.5);

  doc.save('my-crisis-plan.pdf');
}

export function generateEmergencyContactsPdf(): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const width = pageW - margin * 2;

  addAccentBar(doc, DEFAULT_BRAND, 5);

  let y = 22;
  setText(doc, 20, INK, true);
  doc.text('Emergency contacts card', margin, y);
  y += 7;
  setText(doc, 10, MUTED);
  doc.text('Print it, cut along the line, keep it in your wallet or the van.', margin, y);
  y += 12;

  const contacts: { name: string; number: string; note: string }[] = [
    { name: 'Emergency services', number: '999', note: 'Immediate danger — 24/7' },
    { name: 'Samaritans', number: '116 123', note: 'Someone to listen — free, 24/7' },
    { name: 'SHOUT', number: 'Text SHOUT to 85258', note: 'Crisis text support — 24/7' },
    { name: 'NHS 111', number: '111 (option 2)', note: 'Urgent mental health — 24/7' },
    { name: 'CALM', number: '0800 58 58 58', note: '5pm–midnight, every day' },
    { name: 'Papyrus HOPELINE247', number: '0800 068 4141', note: 'Under-35s — 24/7' },
    {
      name: 'Electrical Industries Charity',
      number: '0800 652 1618',
      note: 'For the electrical trade — 9am–5pm Mon–Fri',
    },
    {
      name: 'Lighthouse Charity',
      number: '0345 605 1956',
      note: 'Construction helpline — 24/7',
    },
  ];

  // Wallet card — cut guide box around the contact block
  const cardTop = y;
  const rowH = 12;
  const cardH = 14 + contacts.length * rowH;
  doc.setDrawColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 2], 0);
  doc.roundedRect(margin, cardTop, width, cardH, 3, 3, 'S');
  doc.setLineDashPattern([], 0);

  y = cardTop + 10;
  setText(doc, 11, INK, true);
  doc.text('If today is heavy — one of these, now.', margin + 6, y);
  y += 4;

  for (const c of contacts) {
    y += rowH;
    setText(doc, 10.5, INK, true);
    doc.text(c.name, margin + 6, y - 4);
    setText(doc, 10.5, DEFAULT_BRAND, true);
    doc.text(c.number, margin + width / 2, y - 4);
    setText(doc, 8.5, MUTED);
    doc.text(c.note, margin + 6, y);
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.15);
    if (c !== contacts[contacts.length - 1]) {
      doc.line(margin + 6, y + 2.5, margin + width - 6, y + 2.5);
    }
  }

  y = cardTop + cardH + 12;
  setText(doc, 9, MUTED);
  doc.text(
    'All numbers checked July 2026. Calls to 0800 and 116 numbers are free from UK mobiles.',
    margin,
    y
  );

  doc.save('emergency-contacts-card.pdf');
}
