/**
 * Send Snag Report — generates a branded PDF of selected snags (with photos
 * + BS 7671 citations from photo_analyses.analysis_result) and emails it
 * via Resend with the PDF attached.
 *
 * Input:
 *   { snag_ids: string[], recipient_email: string,
 *     customSubject?: string, customMessage?: string }
 *
 * Mirrors send-quote-resend / send-invoice-resend patterns:
 *   - User JWT required
 *   - Loads user's company_profile for branding
 *   - Uses _shared/mailer.ts clientFacingSender (DMARC-aligned from address)
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface SnagReportRequest {
  snag_ids: string[];
  recipient_email: string;
  customSubject?: string;
  customMessage?: string;
}

interface PhotoRow {
  id: string;
  image_url: string;
  analysis_result: Record<string, unknown> | null;
  linked_task_id: string;
}

interface SnagRow {
  id: string;
  title: string;
  details: string | null;
  status: string;
  priority: string;
  location: string | null;
  project_id: string | null;
  tags: string[] | null;
  created_at: string;
}

const PRIORITY_LABELS: Record<string, string> = {
  urgent: 'URGENT',
  high: 'HIGH',
  normal: 'NORMAL',
  low: 'LOW',
};

const PRIORITY_RGB: Record<string, [number, number, number]> = {
  urgent: [220, 38, 38], // red-600
  high: [234, 88, 12], // orange-600
  normal: [37, 99, 235], // blue-600
  low: [148, 163, 184], // slate-400
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function fetchAsBase64(url: string): Promise<{ base64: string; mime: string } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const mime = res.headers.get('content-type') || 'image/jpeg';
    const arr = new Uint8Array(await res.arrayBuffer());
    // Convert in chunks to avoid call-stack issues with btoa on big arrays
    let binary = '';
    const chunk = 32768;
    for (let i = 0; i < arr.length; i += chunk) {
      binary += String.fromCharCode(...arr.subarray(i, i + chunk));
    }
    return { base64: btoa(binary), mime };
  } catch {
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!resendApiKey || !supabaseUrl || !supabaseAnonKey) {
      throw new Error('Email or database service not configured.');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Please log in to send snag reports.');

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const jwt = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(jwt);
    if (userError || !user) {
      throw new Error('Session expired. Please log in again.');
    }
    const userEmail = user.email;

    // ─── Parse request ─────────────────────────────────────────────
    const body = (await req.json()) as SnagReportRequest;
    const snagIds = Array.isArray(body.snag_ids) ? body.snag_ids.filter((x) => !!x) : [];
    const recipient = (body.recipient_email || '').trim();
    const customSubject = body.customSubject?.trim();
    const customMessage = body.customMessage?.trim();

    if (snagIds.length === 0) throw new Error('At least one snag is required.');
    if (!isValidEmail(recipient)) throw new Error('Invalid recipient email.');

    // ─── Load snags ────────────────────────────────────────────────
    const { data: snagsRaw, error: snagsErr } = await supabase
      .from('spark_tasks')
      .select('id, title, details, status, priority, location, project_id, tags, created_at')
      .eq('user_id', user.id)
      .in('id', snagIds);
    if (snagsErr) throw new Error('Could not load snags.');
    const snags: SnagRow[] = (snagsRaw || []) as SnagRow[];
    if (snags.length === 0) throw new Error('No matching snags found.');

    // ─── Load photos ───────────────────────────────────────────────
    const { data: photosRaw } = await supabase
      .from('photo_analyses')
      .select('id, image_url, analysis_result, linked_task_id')
      .eq('user_id', user.id)
      .in('linked_task_id', snagIds);
    const photos: PhotoRow[] = (photosRaw || []) as PhotoRow[];

    // ─── Load project titles ───────────────────────────────────────
    const projectIds = Array.from(
      new Set(snags.map((s) => s.project_id).filter((x): x is string => !!x))
    );
    let projectTitleMap: Record<string, string> = {};
    if (projectIds.length > 0) {
      const { data: projectsRaw } = await supabase
        .from('spark_projects')
        .select('id, title')
        .in('id', projectIds);
      for (const p of (projectsRaw || []) as Array<{ id: string; title: string }>) {
        projectTitleMap[p.id] = p.title;
      }
    }

    // ─── Load company profile for branding ─────────────────────────
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    const companyName: string = companyProfile?.company_name || 'Elec-Mate';
    const primaryHex: string = companyProfile?.primary_color || '#0f172a';

    // ─── Build PDF (jsPDF) ─────────────────────────────────────────
    const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 44;

    // Brand colour from company profile (hex → rgb), fallback to slate-900.
    const hexToRgb = (hex: string): [number, number, number] => {
      const clean = (hex || '').replace('#', '').trim();
      if (clean.length !== 6) return [15, 23, 42];
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      return [
        Number.isFinite(r) ? r : 15,
        Number.isFinite(g) ? g : 23,
        Number.isFinite(b) ? b : 42,
      ];
    };
    const brand = hexToRgb(primaryHex);

    // ─── HEADER (page 1) ───────────────────────────────────────────
    // Brand accent strip at the very top
    doc.setFillColor(brand[0], brand[1], brand[2]);
    doc.rect(0, 0, pageW, 6, 'F');

    let y = margin + 8;

    // Try to embed company logo if we have a URL
    const logoUrl: string | undefined =
      companyProfile?.logo_url || companyProfile?.logo_data_url || undefined;
    let logoEmbedded = false;
    if (logoUrl) {
      const logo = await fetchAsBase64(logoUrl);
      if (logo) {
        const format = logo.mime.includes('png')
          ? 'PNG'
          : logo.mime.includes('webp')
            ? 'WEBP'
            : 'JPEG';
        try {
          const props = doc.getImageProperties(`data:${logo.mime};base64,${logo.base64}`);
          const maxLogoW = 110;
          const maxLogoH = 44;
          const ratio = props.width / Math.max(1, props.height);
          let lw = maxLogoW;
          let lh = lw / ratio;
          if (lh > maxLogoH) {
            lh = maxLogoH;
            lw = lh * ratio;
          }
          doc.addImage(
            `data:${logo.mime};base64,${logo.base64}`,
            format,
            margin,
            y,
            lw,
            lh,
            undefined,
            'FAST'
          );
          logoEmbedded = true;
        } catch {
          /* skip on error */
        }
      }
    }

    // Right-aligned report meta block
    const reportDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('SNAGGING REPORT', pageW - margin, y + 6, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(reportDate, pageW - margin, y + 20, { align: 'right' });

    // If no logo, render the company name top-left in heavy text
    if (!logoEmbedded) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(15, 23, 42);
      doc.text(companyName, margin, y + 18);
    }

    y += logoEmbedded ? 60 : 50;

    // Hero summary card — accent left rail + counts
    const openCount = snags.filter((s) => s.status !== 'done').length;
    const criticalCount = snags.filter(
      (s) => s.status !== 'done' && (s.priority === 'urgent' || s.priority === 'high')
    ).length;
    const resolvedCount = snags.length - openCount;

    const heroH = 76;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, pageW - margin * 2, heroH, 8, 8, 'F');
    // brand rail
    doc.setFillColor(brand[0], brand[1], brand[2]);
    doc.rect(margin, y, 4, heroH, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(
      `${snags.length} snag${snags.length === 1 ? '' : 's'} on this report`,
      margin + 18,
      y + 22
    );

    // Stats row
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const statsY = y + 44;
    const statW = (pageW - margin * 2 - 36) / 3;
    const drawStat = (label: string, value: string, valueColor: [number, number, number], col: number) => {
      const x = margin + 18 + col * statW;
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.text(label.toUpperCase(), x, statsY);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(valueColor[0], valueColor[1], valueColor[2]);
      doc.text(value, x, statsY + 16);
      doc.setFont('helvetica', 'normal');
    };
    drawStat('Open', String(openCount), PRIORITY_RGB.normal, 0);
    drawStat('Critical', String(criticalCount), criticalCount > 0 ? PRIORITY_RGB.urgent : [148, 163, 184], 1);
    drawStat('Resolved', String(resolvedCount), [16, 185, 129], 2);

    y += heroH + 18;

    // Optional personal message — quoted block
    if (customMessage) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      const lines = doc.splitTextToSize(customMessage, pageW - margin * 2);
      for (const line of lines) {
        if (y > pageH - margin - 40) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 15;
      }
      y += 10;
    }

    // Subtle section heading before items
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text('ITEMS', margin, y);
    y += 6;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageW - margin, y);
    y += 18;

    // ─── PER-SNAG BLOCKS ───────────────────────────────────────────
    for (let i = 0; i < snags.length; i++) {
      const snag = snags[i];
      const snagPhotos = photos.filter((p) => p.linked_task_id === snag.id);
      const firstPhotoAnalysis = (snagPhotos.find((p) => p.analysis_result)?.analysis_result ||
        null) as Record<string, unknown> | null;
      const citations = Array.isArray(firstPhotoAnalysis?.citations)
        ? (firstPhotoAnalysis!.citations as Array<{ ref: string; topic?: string }>)
        : [];
      const isResolved = snag.status === 'done';
      const priorityRgb = PRIORITY_RGB[snag.priority] || PRIORITY_RGB.normal;

      // Estimated minimum block height for page-break logic
      const minBlockH = 80 + (snagPhotos.length > 0 ? 150 : 0);
      if (y + minBlockH > pageH - margin - 30) {
        doc.addPage();
        y = margin;
      }

      const blockStartY = y;
      const contentX = margin + 24;
      const contentW = pageW - contentX - margin;

      // Priority colour stripe — vertical 3pt rail down the left of the block
      // (drawn AFTER content so we know how tall the block is — placeholder here)
      const stripeX = margin + 4;

      // Index pill (small rounded rect with number)
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin + 12, y + 2, 22, 16, 4, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(String(i + 1).padStart(2, '0'), margin + 23, y + 13, { align: 'center' });

      // Priority badge — top-right
      const badgeW = 64;
      const badgeH = 16;
      const badgeX = pageW - margin - badgeW;
      doc.setFillColor(priorityRgb[0], priorityRgb[1], priorityRgb[2]);
      doc.roundedRect(badgeX, y + 2, badgeW, badgeH, 8, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(PRIORITY_LABELS[snag.priority] || 'NORMAL', badgeX + badgeW / 2, y + 13, {
        align: 'center',
      });

      // Resolved indicator (replaces title decoration)
      if (isResolved) {
        doc.setFillColor(220, 252, 231);
        doc.roundedRect(badgeX - 78, y + 2, 70, badgeH, 8, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(22, 101, 52);
        doc.text('RESOLVED', badgeX - 78 + 35, y + 13, { align: 'center' });
      }

      // Title
      const titleY = y + 14;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(isResolved ? 100 : 15, isResolved ? 116 : 23, isResolved ? 139 : 42);
      const titleW = badgeX - contentX - 8 - (isResolved ? 78 : 0);
      const titleLines = doc.splitTextToSize(snag.title, titleW);
      doc.text(titleLines[0] || '', contentX, titleY);

      y += 26;

      // Meta line
      const metaParts: string[] = [];
      if (snag.location) metaParts.push(snag.location);
      metaParts.push(
        new Date(snag.created_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
      if (snag.project_id && projectTitleMap[snag.project_id]) {
        metaParts.push(projectTitleMap[snag.project_id]);
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(metaParts.join('   ·   '), contentX, y);
      y += 14;

      // Details
      const detailsText =
        snag.details ||
        (typeof firstPhotoAnalysis?.details === 'string'
          ? (firstPhotoAnalysis!.details as string)
          : '');
      if (detailsText) {
        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(30, 41, 59);
        const dLines = doc.splitTextToSize(detailsText, contentW);
        for (const line of dLines) {
          if (y > pageH - margin - 30) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, contentX, y);
          y += 14;
        }
      }

      // Citations — pill row
      if (citations.length > 0) {
        y += 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(brand[0], brand[1], brand[2]);
        doc.text('BS 7671', contentX, y + 8);
        let pillX = contentX + 48;
        for (const c of citations.slice(0, 6)) {
          const refText = c.ref.replace(/^Reg\s+/i, '');
          const w = doc.getTextWidth(refText) + 14;
          doc.setFillColor(241, 245, 249);
          doc.roundedRect(pillX, y, w, 14, 7, 7, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105);
          doc.text(refText, pillX + 7, y + 9.5);
          pillX += w + 5;
          if (pillX > pageW - margin - 30) break;
        }
        y += 18;
      }

      // Photos — aspect-preserved, 2-up max inline
      const inlinePhotos = snagPhotos.slice(0, 2);
      if (inlinePhotos.length > 0) {
        y += 8;
        const gap = 8;
        const boxW = (contentW - gap * (inlinePhotos.length - 1)) / inlinePhotos.length;
        const boxH = Math.min(160, boxW * 0.75);
        if (y + boxH > pageH - margin - 30) {
          doc.addPage();
          y = margin;
        }
        for (let idx = 0; idx < inlinePhotos.length; idx++) {
          const photo = inlinePhotos[idx];
          const fetched = await fetchAsBase64(photo.image_url);
          if (!fetched) continue;
          const format = fetched.mime.includes('png')
            ? 'PNG'
            : fetched.mime.includes('webp')
              ? 'WEBP'
              : 'JPEG';
          const dataUrl = `data:${fetched.mime};base64,${fetched.base64}`;

          const boxX = contentX + idx * (boxW + gap);
          // Background box (acts as letterbox)
          doc.setFillColor(241, 245, 249);
          doc.roundedRect(boxX, y, boxW, boxH, 6, 6, 'F');

          try {
            const props = doc.getImageProperties(dataUrl);
            const ratio = props.width / Math.max(1, props.height);
            let w = boxW - 8;
            let h = w / ratio;
            if (h > boxH - 8) {
              h = boxH - 8;
              w = h * ratio;
            }
            const xOff = boxX + (boxW - w) / 2;
            const yOff = y + (boxH - h) / 2;
            doc.addImage(dataUrl, format, xOff, yOff, w, h, undefined, 'FAST');
          } catch {
            /* skip */
          }
        }
        y += boxH;
        if (snagPhotos.length > inlinePhotos.length) {
          y += 12;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);
          doc.text(
            `+ ${snagPhotos.length - inlinePhotos.length} more photo${
              snagPhotos.length - inlinePhotos.length === 1 ? '' : 's'
            } on file`,
            contentX,
            y
          );
        }
      }

      // Vertical priority stripe down the left of the whole block
      const blockEndY = y;
      doc.setFillColor(priorityRgb[0], priorityRgb[1], priorityRgb[2]);
      doc.rect(stripeX, blockStartY + 2, 2, blockEndY - blockStartY - 2, 'F');

      // Spacer between items
      y += 22;
      if (i < snags.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.5);
        doc.line(margin, y - 12, pageW - margin, y - 12);
      }
    }

    // ─── FOOTER (every page) ──────────────────────────────────────
    const contactParts: string[] = [];
    if (companyProfile?.company_phone) contactParts.push(String(companyProfile.company_phone));
    if (companyProfile?.company_email) contactParts.push(String(companyProfile.company_email));
    if (companyProfile?.company_website) contactParts.push(String(companyProfile.company_website));
    const contactLine = contactParts.join('  ·  ');

    const pageCount = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      // Footer divider
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.5);
      doc.line(margin, pageH - 36, pageW - margin, pageH - 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      // Left: company contact (if available) else company name
      doc.text(contactLine || companyName, margin, pageH - 22);
      // Right: page numbers
      doc.text(`Page ${p} of ${pageCount}`, pageW - margin, pageH - 22, { align: 'right' });
    }

    // jsPDF → base64 attachment
    const pdfArrayBuffer = doc.output('arraybuffer');
    const pdfBytes = new Uint8Array(pdfArrayBuffer);
    let pdfBinary = '';
    for (let i = 0; i < pdfBytes.length; i += 32768) {
      pdfBinary += String.fromCharCode(...pdfBytes.subarray(i, i + 32768));
    }
    const pdfBase64 = btoa(pdfBinary);

    // ─── Compose email ─────────────────────────────────────────────
    const subject =
      customSubject ||
      `Snagging report — ${snags.length} item${snags.length === 1 ? '' : 's'} · ${companyName}`;

    const recipientFirstName =
      (recipient.split('@')[0] || 'there').split(/[._-]/)[0].replace(/^./, (c) => c.toUpperCase());

    const messageHtml = customMessage
      ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;line-height:1.6;">${escapeHtml(
          customMessage
        ).replace(/\n/g, '<br>')}</p>`
      : `<p style="margin:0 0 12px;font-size:14px;color:#334155;line-height:1.6;">
           Hi ${escapeHtml(recipientFirstName)},<br><br>
           Please find attached the snagging report covering ${snags.length} item${
             snags.length === 1 ? '' : 's'
           }. The full breakdown — including photos and any relevant BS 7671 references — is in the PDF.
         </p>`;

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:28px 32px 12px;border-bottom:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:${escapeHtml(
        primaryHex
      )};">Snagging report</p>
      <h1 style="margin:6px 0 0;font-size:22px;color:#0f172a;font-weight:700;">${escapeHtml(
        companyName
      )}</h1>
    </td></tr>
    <tr><td style="padding:24px 32px;">
      ${messageHtml}
      <p style="margin:16px 0 0;font-size:13px;color:#475569;line-height:1.6;">
        <strong style="color:#0f172a;">${snags.length} item${snags.length === 1 ? '' : 's'}</strong> · attached as PDF.
      </p>
    </td></tr>
    <tr><td style="padding:0 32px 28px;">
      <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Any questions? Just reply to this email.
      </p>
    </td></tr>
  </table>
</body></html>`;

    const sender = clientFacingSender({
      companyName,
      companyEmail: companyProfile?.company_email,
      userEmail,
    });

    const resend = new Resend(resendApiKey);
    const filename = `Snagging_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    const { data: emailData, error: emailError } = await resend.emails.send({
      ...sender,
      to: [recipient],
      subject,
      html,
      text: htmlToPlainText(html),
      attachments: [{ filename, content: pdfBase64 }],
    });

    if (emailError) {
      throw new Error(`Failed to send: ${emailError.message || 'unknown'}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailId: emailData?.id || null,
        snag_count: snags.length,
        pdf_bytes: pdfBytes.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[send-snag-report] error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
