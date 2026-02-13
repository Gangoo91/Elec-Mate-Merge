/**
 * SafetyPDFBuilder — Professional A4 PDF generator for Elec-Mate safety documents.
 *
 * Uses pdf-lib (pure JS, works in Deno) to produce real .pdf files with:
 *  - Branded header (ELEC-MATE + document title + status badge)
 *  - Amber accent line
 *  - Sections, key-value grids, tables, checklists, badges, text boxes
 *  - Warning banners (safety-critical)
 *  - Signature blocks
 *  - Page numbers in footer
 *  - Automatic page breaks
 */

import {
  PDFDocument,
  PDFPage,
  PDFFont,
  rgb,
  RGB,
  StandardFonts,
  PageSizes,
} from "https://esm.sh/pdf-lib@1.17.1";

// ── Brand colours ──────────────────────────────────────────────────────────
export const C = {
  amber: rgb(0.96, 0.62, 0.04),
  amberDark: rgb(0.6, 0.4, 0),
  amberBg: rgb(1, 0.96, 0.89),
  dark: rgb(0.06, 0.09, 0.16),
  text: rgb(0.12, 0.16, 0.23),
  textSec: rgb(0.39, 0.45, 0.55),
  textLight: rgb(0.58, 0.64, 0.72),
  white: rgb(1, 1, 1),
  border: rgb(0.89, 0.91, 0.94),
  rowAlt: rgb(0.97, 0.98, 0.99),
  bgLight: rgb(0.97, 0.98, 0.99),
  success: rgb(0.13, 0.77, 0.37),
  successDark: rgb(0.08, 0.5, 0.24),
  successBg: rgb(0.93, 1, 0.95),
  warning: rgb(0.96, 0.62, 0.04),
  warningBg: rgb(1, 0.98, 0.92),
  danger: rgb(0.94, 0.27, 0.27),
  dangerDark: rgb(0.73, 0.11, 0.11),
  dangerBg: rgb(1, 0.95, 0.95),
  info: rgb(0.23, 0.51, 0.96),
  infoBg: rgb(0.94, 0.97, 1),
  grey: rgb(0.63, 0.68, 0.73),
} as const;

export type StatusColour = "success" | "warning" | "danger" | "info" | "grey";

const STATUS_RGB: Record<StatusColour, RGB> = {
  success: C.success,
  warning: C.warning,
  danger: C.danger,
  info: C.info,
  grey: C.grey,
};

// ── Layout constants (A4 in points, 72 dpi) ────────────────────────────────
const PW = 595.28;
const PH = 841.89;
const ML = 42;
const MR = 42;
const CW = PW - ML - MR; // ~511
const HEADER_H = 72;
const FOOTER_H = 40;
const CONTENT_TOP = PH - HEADER_H - 8;
const CONTENT_BOT = FOOTER_H + 18;

export class SafetyPDFBuilder {
  private doc!: PDFDocument;
  private page!: PDFPage;
  private font!: PDFFont;
  private bold!: PDFFont;
  private y: number = CONTENT_TOP;
  private pageNum = 0;
  private title: string;
  private refId: string;
  private status: string;
  private statusRgb: RGB;

  private constructor(
    title: string,
    refId: string,
    status: string,
    statusColour: StatusColour
  ) {
    this.title = title;
    this.refId = refId;
    this.status = status;
    this.statusRgb = STATUS_RGB[statusColour];
  }

  /** Factory — must be async because pdf-lib init is async */
  static async create(
    title: string,
    refId: string,
    status: string,
    statusColour: StatusColour = "info"
  ): Promise<SafetyPDFBuilder> {
    const b = new SafetyPDFBuilder(title, refId, status, statusColour);
    b.doc = await PDFDocument.create();
    b.doc.setTitle(`${title} — ${refId}`);
    b.doc.setProducer("Elec-Mate Safety Module");
    b.doc.setCreator("Elec-Mate");
    b.font = await b.doc.embedFont(StandardFonts.Helvetica);
    b.bold = await b.doc.embedFont(StandardFonts.HelveticaBold);
    b.newPage();
    return b;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  private newPage() {
    this.page = this.doc.addPage(PageSizes.A4);
    this.pageNum++;
    this.drawHeader();
    this.y = CONTENT_TOP;
  }

  private ensureSpace(needed: number) {
    if (this.y - needed < CONTENT_BOT) {
      this.drawFooter();
      this.newPage();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER & FOOTER
  // ═══════════════════════════════════════════════════════════════════════════

  private drawHeader() {
    const p = this.page;

    // Dark header band
    p.drawRectangle({
      x: 0,
      y: PH - HEADER_H,
      width: PW,
      height: HEADER_H,
      color: C.dark,
    });

    // Amber accent line (3pt)
    p.drawRectangle({
      x: 0,
      y: PH - HEADER_H,
      width: PW,
      height: 3,
      color: C.amber,
    });

    // Brand name
    p.drawText("ELEC-MATE", {
      x: ML,
      y: PH - 26,
      size: 15,
      font: this.bold,
      color: C.amber,
    });

    // Tagline
    p.drawText("Professional Electrical Safety", {
      x: ML,
      y: PH - 38,
      size: 7,
      font: this.font,
      color: C.textLight,
    });

    // Document title (right-aligned)
    const titleUpper = this.title.toUpperCase();
    const tw = this.bold.widthOfTextAtSize(titleUpper, 12);
    p.drawText(titleUpper, {
      x: PW - MR - tw,
      y: PH - 26,
      size: 12,
      font: this.bold,
      color: C.white,
    });

    // Info row: Ref | Status dot + text | Date
    const infoY = PH - HEADER_H + 14;

    // Ref
    p.drawText(`Ref: ${this.refId.substring(0, 16).toUpperCase()}`, {
      x: ML,
      y: infoY,
      size: 7.5,
      font: this.font,
      color: C.textLight,
    });

    // Status dot + text
    const statusText = this.status.toUpperCase().replace(/_/g, " ");
    const stw = this.bold.widthOfTextAtSize(statusText, 7.5);
    const sx = PW / 2 - stw / 2;
    p.drawCircle({ x: sx - 6, y: infoY + 2.5, size: 3, color: this.statusRgb });
    p.drawText(statusText, {
      x: sx,
      y: infoY,
      size: 7.5,
      font: this.bold,
      color: C.white,
    });

    // Date (right-aligned)
    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const dw = this.font.widthOfTextAtSize(dateStr, 7.5);
    p.drawText(dateStr, {
      x: PW - MR - dw,
      y: infoY,
      size: 7.5,
      font: this.font,
      color: C.textLight,
    });
  }

  private drawFooter() {
    const p = this.page;
    const fy = FOOTER_H;

    // Divider
    p.drawLine({
      start: { x: ML, y: fy },
      end: { x: PW - MR, y: fy },
      thickness: 0.5,
      color: C.border,
    });

    // Left
    p.drawText("Generated by Elec-Mate", {
      x: ML,
      y: fy - 14,
      size: 7,
      font: this.font,
      color: C.textLight,
    });

    // Centre — timestamp
    const now = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const nw = this.font.widthOfTextAtSize(now, 7);
    p.drawText(now, {
      x: PW / 2 - nw / 2,
      y: fy - 14,
      size: 7,
      font: this.font,
      color: C.textLight,
    });

    // Right — page number
    const pt = `Page ${this.pageNum}`;
    const pw2 = this.font.widthOfTextAtSize(pt, 7);
    p.drawText(pt, {
      x: PW - MR - pw2,
      y: fy - 14,
      size: 7,
      font: this.font,
      color: C.textLight,
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTENT METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Section title with amber accent bar */
  section(title: string) {
    this.ensureSpace(24);
    this.y -= 8;

    // Amber accent bar
    this.page.drawRectangle({
      x: ML,
      y: this.y - 11,
      width: 3,
      height: 13,
      color: C.amber,
    });

    // Title
    this.page.drawText(title.toUpperCase(), {
      x: ML + 8,
      y: this.y - 8,
      size: 10,
      font: this.bold,
      color: C.dark,
    });

    // Underline
    this.page.drawLine({
      start: { x: ML, y: this.y - 15 },
      end: { x: PW - MR, y: this.y - 15 },
      thickness: 0.5,
      color: C.border,
    });

    this.y -= 24;
  }

  /** Key-value grid (2 or 3 columns) */
  keyValueGrid(
    items: Array<{ label: string; value: string }>,
    cols: number = 2
  ) {
    const colW = CW / cols;
    const rowH = 26;
    let col = 0;

    for (const item of items) {
      if (col === 0) this.ensureSpace(rowH);
      const x = ML + col * colW;

      // Label
      this.page.drawText(item.label.toUpperCase(), {
        x,
        y: this.y,
        size: 7,
        font: this.font,
        color: C.textSec,
      });

      // Value (truncate if needed)
      const maxW = colW - 8;
      let val = item.value || "N/A";
      while (
        this.bold.widthOfTextAtSize(val, 9.5) > maxW &&
        val.length > 4
      ) {
        val = val.slice(0, -4) + "...";
      }

      this.page.drawText(val, {
        x,
        y: this.y - 12,
        size: 9.5,
        font: this.bold,
        color: C.text,
      });

      col++;
      if (col >= cols) {
        col = 0;
        this.y -= rowH;
      }
    }
    if (col > 0) this.y -= rowH;
    this.y -= 4;
  }

  /** Wrapped paragraph text */
  paragraph(
    text: string,
    opts?: { size?: number; color?: RGB; indent?: number; bold?: boolean }
  ) {
    const sz = opts?.size ?? 9.5;
    const color = opts?.color ?? C.text;
    const indent = opts?.indent ?? 0;
    const f = opts?.bold ? this.bold : this.font;
    const lineH = sz * 1.55;
    const maxW = CW - indent;

    const lines = this.wrapText(text, maxW, sz, f);
    for (const line of lines) {
      this.ensureSpace(lineH);
      this.page.drawText(line, {
        x: ML + indent,
        y: this.y,
        size: sz,
        font: f,
        color,
      });
      this.y -= lineH;
    }
    this.y -= 4;
  }

  /** Bordered text box with left accent */
  textBox(text: string, accentColour: RGB = C.border) {
    const sz = 9.5;
    const lineH = sz * 1.55;
    const pad = 10;
    const maxW = CW - pad * 2 - 6;

    const lines = this.wrapText(text, maxW, sz, this.font);
    const boxH = lines.length * lineH + pad * 2;

    this.ensureSpace(boxH + 6);

    // Background
    this.page.drawRectangle({
      x: ML,
      y: this.y - boxH,
      width: CW,
      height: boxH,
      color: C.bgLight,
      borderColor: C.border,
      borderWidth: 0.5,
    });

    // Left accent
    this.page.drawRectangle({
      x: ML,
      y: this.y - boxH,
      width: 3,
      height: boxH,
      color: accentColour,
    });

    // Text
    let ty = this.y - pad - sz * 0.25;
    for (const line of lines) {
      this.page.drawText(line, {
        x: ML + pad + 4,
        y: ty,
        size: sz,
        font: this.font,
        color: C.text,
      });
      ty -= lineH;
    }

    this.y -= boxH + 8;
  }

  /** Red warning banner — safety-critical */
  warningBanner(text: string) {
    this.ensureSpace(30);

    const h = 24;
    this.page.drawRectangle({
      x: ML,
      y: this.y - h,
      width: CW,
      height: h,
      color: C.dangerBg,
      borderColor: C.danger,
      borderWidth: 1.5,
    });

    const full = "WARNING: " + text;
    const fw = this.bold.widthOfTextAtSize(full, 8.5);
    this.page.drawText(full, {
      x: PW / 2 - fw / 2,
      y: this.y - h / 2 - 3,
      size: 8.5,
      font: this.bold,
      color: C.dangerDark,
    });

    this.y -= h + 8;
  }

  /** Data table with header row + data rows */
  table(
    headers: string[],
    rows: string[][],
    opts?: { colWidths?: number[] }
  ) {
    const rowH = 20;
    const headerH = 22;
    const sz = 8;
    const pad = 6;

    const colWidths = opts?.colWidths ?? this.autoColWidths(headers, rows);

    this.ensureSpace(headerH + rowH);

    // Header row
    this.page.drawRectangle({
      x: ML,
      y: this.y - headerH,
      width: CW,
      height: headerH,
      color: C.dark,
    });

    let hx = ML;
    for (let i = 0; i < headers.length; i++) {
      this.page.drawText(headers[i].toUpperCase(), {
        x: hx + pad,
        y: this.y - headerH / 2 - 3,
        size: sz,
        font: this.bold,
        color: C.white,
      });
      hx += colWidths[i];
    }
    this.y -= headerH;

    // Data rows
    for (let r = 0; r < rows.length; r++) {
      this.ensureSpace(rowH);

      // Alternating background
      if (r % 2 === 0) {
        this.page.drawRectangle({
          x: ML,
          y: this.y - rowH,
          width: CW,
          height: rowH,
          color: C.rowAlt,
        });
      }

      // Row border
      this.page.drawLine({
        start: { x: ML, y: this.y - rowH },
        end: { x: PW - MR, y: this.y - rowH },
        thickness: 0.3,
        color: C.border,
      });

      let rx = ML;
      for (let c = 0; c < rows[r].length && c < headers.length; c++) {
        const maxCellW = colWidths[c] - pad * 2;
        let cellText = rows[r][c] || "";
        while (
          this.font.widthOfTextAtSize(cellText, sz) > maxCellW &&
          cellText.length > 4
        ) {
          cellText = cellText.slice(0, -4) + "...";
        }

        this.page.drawText(cellText, {
          x: rx + pad,
          y: this.y - rowH / 2 - 3,
          size: sz,
          font: this.font,
          color: C.text,
        });
        rx += colWidths[c];
      }
      this.y -= rowH;
    }

    if (rows.length === 0) {
      this.ensureSpace(rowH);
      this.page.drawRectangle({
        x: ML,
        y: this.y - rowH,
        width: CW,
        height: rowH,
        color: C.rowAlt,
      });
      this.page.drawText("No records", {
        x: ML + pad,
        y: this.y - rowH / 2 - 3,
        size: sz,
        font: this.font,
        color: C.textSec,
      });
      this.y -= rowH;
    }

    // Bottom border
    this.page.drawLine({
      start: { x: ML, y: this.y },
      end: { x: PW - MR, y: this.y },
      thickness: 0.5,
      color: C.border,
    });

    this.y -= 8;
  }

  /** Checklist with pass/fail indicators */
  checklist(items: Array<{ label: string; passed: boolean; notes?: string }>) {
    const rowH = 20;

    for (const item of items) {
      this.ensureSpace(rowH + (item.notes ? 12 : 0));

      const circleCol = item.passed ? C.success : C.danger;
      const statusText = item.passed ? "PASS" : "FAIL";

      // Status circle
      this.page.drawCircle({
        x: ML + 6,
        y: this.y - rowH / 2 + 1,
        size: 4,
        color: circleCol,
      });

      // Tick/cross inside circle
      this.page.drawText(item.passed ? "P" : "F", {
        x: ML + 3.5,
        y: this.y - rowH / 2 - 2,
        size: 5,
        font: this.bold,
        color: C.white,
      });

      // Label
      this.page.drawText(item.label, {
        x: ML + 16,
        y: this.y - rowH / 2 - 2,
        size: 9,
        font: this.font,
        color: C.text,
      });

      // Status text (right)
      const sw = this.bold.widthOfTextAtSize(statusText, 8);
      this.page.drawText(statusText, {
        x: PW - MR - sw,
        y: this.y - rowH / 2 - 2,
        size: 8,
        font: this.bold,
        color: circleCol,
      });

      // Notes
      if (item.notes) {
        this.page.drawText(item.notes, {
          x: ML + 16,
          y: this.y - rowH / 2 - 13,
          size: 7,
          font: this.font,
          color: C.textSec,
        });
      }

      // Divider
      const totalH = rowH + (item.notes ? 12 : 0);
      this.page.drawLine({
        start: { x: ML, y: this.y - totalH },
        end: { x: PW - MR, y: this.y - totalH },
        thickness: 0.3,
        color: C.border,
      });

      this.y -= totalH;
    }
    this.y -= 4;
  }

  /** Inline badge chips (e.g. PPE items) */
  badges(items: string[]) {
    this.ensureSpace(22);

    let bx = ML;
    const badgeH = 16;
    const pad = 8;
    const sz = 7.5;

    for (const item of items) {
      const tw = this.bold.widthOfTextAtSize(item, sz);
      const badgeW = tw + pad * 2;

      if (bx + badgeW > PW - MR) {
        bx = ML;
        this.y -= badgeH + 4;
        this.ensureSpace(badgeH);
      }

      // Badge background
      this.page.drawRectangle({
        x: bx,
        y: this.y - badgeH,
        width: badgeW,
        height: badgeH,
        color: C.amberBg,
        borderColor: C.amber,
        borderWidth: 0.5,
      });

      // Badge text
      this.page.drawText(item, {
        x: bx + pad,
        y: this.y - badgeH / 2 - 2.5,
        size: sz,
        font: this.bold,
        color: C.amberDark,
      });

      bx += badgeW + 4;
    }

    this.y -= badgeH + 8;
  }

  /** Bullet list */
  bulletList(items: string[]) {
    const lineH = 14;

    for (const item of items) {
      const lines = this.wrapText(item, CW - 14, 9, this.font);

      for (let i = 0; i < lines.length; i++) {
        this.ensureSpace(lineH);

        // Bullet on first line only
        if (i === 0) {
          this.page.drawCircle({
            x: ML + 4,
            y: this.y - 3,
            size: 1.5,
            color: C.amber,
          });
        }

        this.page.drawText(lines[i], {
          x: ML + 12,
          y: this.y - 4,
          size: 9,
          font: this.font,
          color: C.text,
        });
        this.y -= lineH;
      }
    }
    this.y -= 4;
  }

  /** Signature block — 1 or 2 parties side by side */
  signatureBlock(
    parties: Array<{
      role: string;
      name?: string;
      date?: string;
    }>
  ) {
    const blockH = 72;
    this.ensureSpace(blockH + 12);
    this.y -= 4;

    const partyW =
      parties.length === 1 ? CW : (CW - 10) / 2;

    for (let i = 0; i < parties.length; i++) {
      const party = parties[i];
      const bx = ML + i * (partyW + 10);

      // Box
      this.page.drawRectangle({
        x: bx,
        y: this.y - blockH,
        width: partyW,
        height: blockH,
        borderColor: C.border,
        borderWidth: 1,
        color: C.white,
      });

      // Role label
      this.page.drawText(party.role.toUpperCase(), {
        x: bx + 8,
        y: this.y - 14,
        size: 7.5,
        font: this.bold,
        color: C.textSec,
      });

      // Name
      this.page.drawText(party.name || "________________________", {
        x: bx + 8,
        y: this.y - 30,
        size: 10,
        font: this.font,
        color: C.text,
      });

      // Signature label + line
      this.page.drawText("Signature:", {
        x: bx + 8,
        y: this.y - 46,
        size: 7,
        font: this.font,
        color: C.textSec,
      });
      this.page.drawLine({
        start: { x: bx + 52, y: this.y - 46 },
        end: { x: bx + partyW - 8, y: this.y - 46 },
        thickness: 0.5,
        color: C.border,
      });

      // Date
      this.page.drawText(
        `Date: ${party.date || "_______________"}`,
        {
          x: bx + 8,
          y: this.y - 62,
          size: 8,
          font: this.font,
          color: C.textSec,
        }
      );
    }

    this.y -= blockH + 10;
  }

  /** Single labelled value on its own line */
  labelledValue(label: string, value: string) {
    this.ensureSpace(18);

    this.page.drawText(label + ":", {
      x: ML,
      y: this.y,
      size: 8,
      font: this.bold,
      color: C.textSec,
    });

    const lw = this.bold.widthOfTextAtSize(label + ":", 8);
    this.page.drawText(value || "N/A", {
      x: ML + lw + 6,
      y: this.y,
      size: 9,
      font: this.font,
      color: C.text,
    });

    this.y -= 16;
  }

  /** Vertical spacer */
  spacer(h: number = 10) {
    this.y -= h;
  }

  /** Document verification footnote */
  footnote(text: string) {
    this.ensureSpace(30);

    this.page.drawLine({
      start: { x: ML, y: this.y },
      end: { x: PW - MR, y: this.y },
      thickness: 0.5,
      color: C.border,
    });

    this.y -= 14;

    this.page.drawText(text, {
      x: ML,
      y: this.y,
      size: 7,
      font: this.font,
      color: C.textLight,
    });

    this.y -= 16;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INTERNAL HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  private wrapText(
    text: string,
    maxWidth: number,
    fontSize: number,
    font: PDFFont
  ): string[] {
    if (!text) return [""];

    const paragraphs = text.split("\n");
    const allLines: string[] = [];

    for (const para of paragraphs) {
      if (!para.trim()) {
        allLines.push("");
        continue;
      }

      const words = para.split(/\s+/);
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const w = font.widthOfTextAtSize(testLine, fontSize);

        if (w > maxWidth && currentLine) {
          allLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) allLines.push(currentLine);
    }

    return allLines.length ? allLines : [""];
  }

  private autoColWidths(headers: string[], rows: string[][]): number[] {
    const n = headers.length;
    const widths: number[] = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      widths[i] = this.bold.widthOfTextAtSize(headers[i], 8) + 16;
    }

    for (const row of rows) {
      for (let i = 0; i < Math.min(row.length, n); i++) {
        const w = this.font.widthOfTextAtSize(row[i] || "", 8) + 16;
        widths[i] = Math.max(widths[i], Math.min(w, CW * 0.6));
      }
    }

    // Normalise to fill CW
    const total = widths.reduce((a, b) => a + b, 0);
    if (total > 0) {
      for (let i = 0; i < n; i++) {
        widths[i] = (widths[i] / total) * CW;
      }
    }

    return widths;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // OUTPUT
  // ═══════════════════════════════════════════════════════════════════════════

  /** Finalise and return PDF bytes */
  async toBuffer(): Promise<Uint8Array> {
    this.drawFooter();
    return await this.doc.save();
  }
}
