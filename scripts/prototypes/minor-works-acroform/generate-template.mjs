/**
 * Generate a labelled AcroForm PDF template for Minor Works.
 *
 * Run once (or whenever field-map.mjs changes). The output is the template
 * that fill-minor-works.mjs writes data into. In a real migration this is
 * replaced by an IET model form opened in Acrobat with form fields dropped on,
 * but for the prototype we draw labels + boxes programmatically so every
 * field is visible and named.
 *
 *   node scripts/prototypes/minor-works-acroform/generate-template.mjs
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SECTIONS } from './field-map.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'minor-works-template.pdf');

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 36;
const MARGIN_TOP = 50;
const MARGIN_BOTTOM = 50;
const COL_GAP = 16;
const COL_W = (PAGE_W - MARGIN_X * 2 - COL_GAP) / 2;
const LABEL_W = 110;
const FIELD_X_OFFSET = LABEL_W + 4;
const FIELD_W = COL_W - LABEL_W - 6;
const ROW_H = 22;
const ROW_H_TEXTAREA = 50;
const ROW_H_CHECK = 18;
const SECTION_TITLE_H = 26;
const HEADER_H = 40;

function rowHeight(type) {
  if (type === 'textarea') return ROW_H_TEXTAREA;
  if (type === 'check') return ROW_H_CHECK;
  return ROW_H;
}

async function main() {
  const doc = await PDFDocument.create();
  doc.setTitle('Minor Works AcroForm Template');
  doc.setProducer('elec-mate prototype');
  doc.setCreator('pdf-lib');

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const form = doc.getForm();

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN_TOP;
  let col = 0;
  let colTopY = y;

  // Page header
  drawHeader(page, bold, font);
  y -= HEADER_H;
  colTopY = y;

  const newPage = () => {
    page = doc.addPage([PAGE_W, PAGE_H]);
    drawHeader(page, bold, font);
    y = PAGE_H - MARGIN_TOP - HEADER_H;
    colTopY = y;
    col = 0;
  };

  const nextColumnOrPage = (needed) => {
    if (y - needed < MARGIN_BOTTOM) {
      if (col === 0) {
        col = 1;
        y = colTopY;
      } else {
        newPage();
      }
    }
  };

  for (const section of SECTIONS) {
    // Force section title at top of a fresh column to keep sections tidy
    nextColumnOrPage(SECTION_TITLE_H + ROW_H);
    drawSectionTitle(page, bold, section.title, col, y);
    y -= SECTION_TITLE_H;

    for (const field of section.fields) {
      const h = rowHeight(field.type);
      nextColumnOrPage(h);

      const x = MARGIN_X + col * (COL_W + COL_GAP);

      // Label
      page.drawText(field.label, {
        x,
        y: y - 11,
        size: 8.5,
        font,
        color: rgb(0.2, 0.2, 0.2),
        maxWidth: LABEL_W,
      });

      // PDF field name in tiny grey under label
      page.drawText(field.pdf, {
        x,
        y: y - 19,
        size: 5.5,
        font,
        color: rgb(0.55, 0.55, 0.6),
      });

      if (field.type === 'check') {
        const cb = form.createCheckBox(field.pdf);
        cb.addToPage(page, {
          x: x + FIELD_X_OFFSET,
          y: y - 14,
          width: 12,
          height: 12,
          borderColor: rgb(0.4, 0.4, 0.45),
          borderWidth: 0.6,
        });
      } else {
        const tf = form.createTextField(field.pdf);
        if (field.type === 'textarea') tf.enableMultiline();
        const fh = field.type === 'textarea' ? ROW_H_TEXTAREA - 6 : ROW_H - 6;
        tf.addToPage(page, {
          x: x + FIELD_X_OFFSET,
          y: y - (field.type === 'textarea' ? ROW_H_TEXTAREA - 4 : ROW_H - 4),
          width: FIELD_W,
          height: fh,
          borderColor: rgb(0.7, 0.7, 0.75),
          borderWidth: 0.5,
          backgroundColor: rgb(0.98, 0.98, 1),
          font,
        });
      }

      y -= h;
    }

    y -= 6; // section spacing
  }

  const bytes = await doc.save();
  await writeFile(OUT, bytes);
  const totalFields = SECTIONS.reduce((n, s) => n + s.fields.length, 0);
  console.log(`Wrote ${OUT}`);
  console.log(`Fields: ${totalFields} across ${SECTIONS.length} sections`);
  console.log(`Pages: ${doc.getPageCount()}`);
}

function drawHeader(page, bold, font) {
  page.drawText('Minor Electrical Installation Works Certificate', {
    x: MARGIN_X,
    y: PAGE_H - MARGIN_TOP + 12,
    size: 13,
    font: bold,
    color: rgb(0.1, 0.1, 0.15),
  });
  page.drawText('AcroForm prototype — labelled template (replace with IET model form for production)', {
    x: MARGIN_X,
    y: PAGE_H - MARGIN_TOP - 1,
    size: 7.5,
    font,
    color: rgb(0.5, 0.5, 0.55),
  });
  page.drawLine({
    start: { x: MARGIN_X, y: PAGE_H - MARGIN_TOP - 8 },
    end: { x: PAGE_W - MARGIN_X, y: PAGE_H - MARGIN_TOP - 8 },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.75),
  });
}

function drawSectionTitle(page, bold, title, col, y) {
  const x = MARGIN_X + col * (COL_W + COL_GAP);
  page.drawRectangle({
    x,
    y: y - 18,
    width: COL_W,
    height: 18,
    color: rgb(0.92, 0.93, 0.97),
  });
  page.drawText(title, {
    x: x + 6,
    y: y - 13,
    size: 9.5,
    font: bold,
    color: rgb(0.15, 0.2, 0.45),
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
