/**
 * generateJobChecklistPdf — the per-job record of the pre-start and completion
 * checks (ELE-1826), for the client file and the HSE: every item, who did it,
 * when and where, with the photos and signatures. Same house style as the Job
 * Safety Pack PDF (generateJobSafetyPackPdf): the firm's brand colour, accent
 * bar, repeated page header and the page-break guard.
 */
import jsPDF from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import { getBrandColour, addAccentBar, fitContain, type RGB } from '@/utils/pdfBrand';
import { resolveStorageUrls } from '@/utils/storageUrls';
import {
  answerSummary,
  findResponse,
  type ChecklistItem,
  type ChecklistResponse,
  type JobChecklistDetail,
} from '@/hooks/usePrestartChecklists';

const GREEN: RGB = [209, 250, 229];
const GREEN_TEXT: RGB = [6, 95, 70];
const AMBER: RGB = [254, 243, 199];
const AMBER_TEXT: RGB = [146, 64, 14];
const RED: RGB = [254, 226, 226];
const RED_TEXT: RGB = [153, 27, 27];
const BODY_TEXT: RGB = [40, 40, 40];

interface CompanyBrand {
  company_name: string | null;
  logo_url: string | null;
  logo_data_url: string | null;
  accent_color?: string | null;
  primary_color?: string | null;
}

const when = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const whereLine = (r: ChecklistResponse) =>
  r.location_status === 'captured' && r.lat != null && r.lng != null
    ? `${Number(r.lat).toFixed(5)}, ${Number(r.lng).toFixed(5)} (±${Math.round(Number(r.accuracy_m ?? 0))} m)`
    : r.location_status === 'denied'
      ? 'Location turned off on the phone'
      : 'No location fix';

async function toDataUrl(url: string): Promise<{ data: string; w: number; h: number } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    const data = await new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
    const dims = await new Promise<{ w: number; h: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth || 4, h: img.naturalHeight || 3 });
      img.onerror = () => resolve({ w: 4, h: 3 });
      img.src = data;
    });
    return { data, ...dims };
  } catch {
    return null;
  }
}

const imgFormat = (dataUrl: string) => (/^data:image\/png/i.test(dataUrl) ? 'PNG' : 'JPEG');

export async function generateJobChecklistPdf(detail: JobChecklistDetail): Promise<jsPDF> {
  const { data: company } = await supabase
    .from('company_profiles')
    .select('company_name, logo_url, logo_data_url, accent_color, primary_color')
    .eq('user_id', detail.job.employer_id)
    .maybeSingle();
  const brandCo = (company as CompanyBrand | null) ?? null;

  // Every photo, signed in one call, fetched once.
  const allPaths = Array.from(new Set(detail.responses.flatMap((r) => r.photos)));
  const signed = allPaths.length ? await resolveStorageUrls('visual-uploads', allPaths) : new Map();
  const photos = new Map<string, { data: string; w: number; h: number }>();
  await Promise.all(
    allPaths.map(async (p) => {
      const url = signed.get(p);
      if (!url) return;
      const img = await toDataUrl(url);
      if (img) photos.set(p, img);
    })
  );

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const bottomLimit = pageH - 16;
  const brand = getBrandColour(brandCo);
  const contentW = pageW - marginX * 2;

  const drawFooter = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text('Produced with Elec-Mate', pageW - marginX, pageH - 8, { align: 'right' });
    doc.text(
      `Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      marginX,
      pageH - 8
    );
  };

  const drawPageHeader = (continued = false): number => {
    addAccentBar(doc, brand, 4);
    const y = 15;
    const logo = brandCo?.logo_url || brandCo?.logo_data_url || null;
    if (logo && logo.startsWith('data:image')) {
      try {
        doc.addImage(logo, imgFormat(logo), marginX, y - 4, 26, 12, undefined, 'FAST');
      } catch {
        /* ignore bad logo */
      }
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text('SITE CHECKS RECORD', pageW - marginX, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const sub = [brandCo?.company_name || '', detail.job.title, continued ? 'Continued' : '']
      .filter(Boolean)
      .join('  ·  ');
    doc.text(doc.splitTextToSize(sub, contentW - 40)[0] ?? '', pageW - marginX, y + 5.5, { align: 'right' });
    return y + 13;
  };

  const guard = (y: number, needed: number): number => {
    if (y + needed > bottomLimit) {
      drawFooter();
      doc.addPage();
      return drawPageHeader(true);
    }
    return y;
  };

  const sectionTitle = (title: string, y: number): number => {
    y = guard(y, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text(title.toUpperCase(), marginX, y + 4);
    doc.setDrawColor(brand[0], brand[1], brand[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 6.5, pageW - marginX, y + 6.5);
    doc.setFont('helvetica', 'normal');
    return y + 11;
  };

  const chip = (label: string, kind: 'good' | 'warn' | 'bad', x: number, y: number, w = 26) => {
    const [fill, text] = kind === 'good' ? [GREEN, GREEN_TEXT] : kind === 'warn' ? [AMBER, AMBER_TEXT] : [RED, RED_TEXT];
    doc.setFillColor(fill[0], fill[1], fill[2]);
    doc.roundedRect(x, y, w, 5.5, 1.2, 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(text[0], text[1], text[2]);
    doc.text(label, x + w / 2, y + 3.8, { align: 'center' });
    doc.setFont('helvetica', 'normal');
  };

  /** One item row: label + chip, then the stamp lines, photos, signature. */
  const itemBlock = (item: ChecklistItem, r: ChecklistResponse | undefined, y: number, ramsDone?: boolean, ramsLine?: string): number => {
    const labelW = contentW - 34;
    const labelLines = doc.splitTextToSize(item.label + (item.required ? '' : ' (optional)'), labelW) as string[];
    const done = item.type === 'rams' ? !!ramsDone : !!r?.satisfied;
    const answeredNo = item.type === 'yes_no' && r && !r.satisfied;
    const lines: string[] = [];
    if (item.type === 'rams') {
      if (ramsLine) lines.push(ramsLine);
    } else if (r) {
      const ans = answerSummary(item, r);
      lines.push(`${ans}${r.note ? `. Note: ${r.note}` : ''}`);
      lines.push(`${r.done_by_name ?? 'Crew'} · ${when(r.completed_at)} · ${whereLine(r)}`);
      if (r.countersigned_at) lines.push(`Countersigned by ${r.countersigned_by_name ?? 'supervisor'} · ${when(r.countersigned_at)}`);
      else if (r.needs_countersign) lines.push('Awaiting supervisor countersign');
    }
    const wrapped = lines.flatMap((l) => doc.splitTextToSize(l, contentW - 4) as string[]);
    y = guard(y, labelLines.length * 4.2 + wrapped.length * 3.8 + 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
    doc.text(labelLines, marginX, y + 4);
    chip(done ? 'DONE' : answeredNo ? 'ANSWERED NO' : 'NOT DONE', done ? 'good' : answeredNo ? 'warn' : 'bad', pageW - marginX - 30, y + 0.8, 30);
    y += labelLines.length * 4.2 + 1.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(95, 95, 95);
    if (wrapped.length) {
      doc.text(wrapped, marginX + 2, y + 3);
      y += wrapped.length * 3.8 + 1;
    }

    // Photos, three to a row
    const shots = (r?.photos ?? []).map((p) => photos.get(p)).filter(Boolean) as { data: string; w: number; h: number }[];
    if (shots.length) {
      const boxW = 56;
      const boxH = 42;
      for (let i = 0; i < shots.length; i += 3) {
        y = guard(y, boxH + 3);
        shots.slice(i, i + 3).forEach((s, j) => {
          const bx = marginX + 2 + j * (boxW + 4);
          doc.setDrawColor(225, 225, 225);
          doc.setLineWidth(0.2);
          doc.rect(bx, y, boxW, boxH);
          const fit = fitContain(s.w, s.h, bx + 0.5, y + 0.5, boxW - 1, boxH - 1);
          try {
            doc.addImage(s.data, imgFormat(s.data), fit.x, fit.y, fit.w, fit.h, undefined, 'FAST');
          } catch {
            /* skip an unreadable photo */
          }
        });
        y += boxH + 3;
      }
    }

    // Signature: a drawn image, or a typed name in italics
    if (r?.signature_data) {
      if (r.signature_data.startsWith('data:image')) {
        y = guard(y, 24);
        doc.setDrawColor(225, 225, 225);
        doc.rect(marginX + 2, y, 70, 22);
        try {
          doc.addImage(r.signature_data, imgFormat(r.signature_data), marginX + 3, y + 1, 68, 20, undefined, 'FAST');
        } catch {
          /* ignore */
        }
        y += 24;
      } else {
        y = guard(y, 8);
        doc.setFont('times', 'italic');
        doc.setFontSize(13);
        doc.setTextColor(30, 30, 30);
        doc.text(r.signature_data, marginX + 2, y + 5);
        doc.setFont('helvetica', 'normal');
        y += 8;
      }
    }

    doc.setDrawColor(232, 232, 232);
    doc.setLineWidth(0.15);
    doc.line(marginX, y + 1, pageW - marginX, y + 1);
    return y + 3;
  };

  // ── Page 1 header ──
  let y = drawPageHeader();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
  const titleLines = doc.splitTextToSize(detail.job.title, contentW) as string[];
  doc.text(titleLines, marginX, y + 6);
  y += 6 + titleLines.length * 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  const meta = [detail.job.client, detail.job.location, `Checklists: ${detail.checklists.map((c) => c.name).join(', ')}`]
    .filter(Boolean)
    .join('  ·  ');
  const metaLines = doc.splitTextToSize(meta, contentW) as string[];
  doc.text(metaLines, marginX, y);
  y += metaLines.length * 4.5 + 4;

  const crewGaps = detail.crew.reduce((n, c) => n + c.outstanding.length, 0);
  const gaps = crewGaps + detail.completion_outstanding.length;
  const [vFill, vText] = gaps === 0 ? [GREEN, GREEN_TEXT] : [AMBER, AMBER_TEXT];
  doc.setFillColor(vFill[0], vFill[1], vFill[2]);
  doc.roundedRect(marginX, y, contentW, 10, 1.6, 1.6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(vText[0], vText[1], vText[2]);
  doc.text(
    gaps === 0
      ? 'EVERY REQUIRED CHECK IS DONE'
      : `${gaps} REQUIRED CHECK${gaps === 1 ? '' : 'S'} STILL OPEN`,
    marginX + 5,
    y + 6.6
  );
  doc.setFont('helvetica', 'normal');
  y += 15;

  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  const how = doc.splitTextToSize(
    'Before-start checks are done by each person on the crew before they can clock in. On-completion checks are done once for the job. Each answer records who gave it, the time, and where their phone was at that moment.',
    contentW
  ) as string[];
  doc.text(how, marginX, y);
  y += how.length * 3.8 + 4;

  // ── Before start, per person ──
  for (const person of detail.crew) {
    y = sectionTitle(`Before start · ${person.name}${person.team_role ? ` (${person.team_role})` : ''}`, y);
    for (const c of detail.checklists) {
      for (const item of c.items.filter((i) => i.phase === 'before')) {
        if (item.type === 'rams') {
          const unsigned = person.unsigned_packs;
          const signedLine = person.signed_packs.length
            ? `Signed: ${person.signed_packs.map((p) => `${p.title} (${when(p.at)})`).join('; ')}`
            : 'No RAMS sent to this person for this job';
          y = itemBlock(item, undefined, y, unsigned.length === 0, unsigned.length ? `Not signed yet: ${unsigned.join(', ')}` : signedLine);
        } else {
          y = itemBlock(item, findResponse(detail, c.id, item, person.employee_id), y);
        }
      }
    }
    y += 2;
  }
  if (detail.crew.length === 0) {
    y = sectionTitle('Before start', y);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 140, 140);
    doc.text('Nobody is assigned to this job yet.', marginX, y + 3.5);
    y += 8;
  }

  // ── On completion, once for the job ──
  const afterItems = detail.checklists.flatMap((c) => c.items.filter((i) => i.phase === 'after').map((i) => ({ c, i })));
  if (afterItems.length) {
    y = sectionTitle('On completion', y);
    for (const { c, i } of afterItems) {
      y = itemBlock(i, findResponse(detail, c.id, i, null), y);
    }
  }

  drawFooter();
  return doc;
}
