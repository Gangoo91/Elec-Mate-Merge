/**
 * Fill the Minor Works AcroForm template with a payload and save the output.
 *
 *   node scripts/prototypes/minor-works-acroform/fill-minor-works.mjs \
 *     [path/to/payload.json] [path/to/output.pdf]
 *
 * Defaults to sample-payload.json → minor-works-filled.pdf in this folder.
 *
 * The key reliability property: every field is referenced by name. If the
 * payload is missing a value, the form field is left blank — visibly empty,
 * never silently dropped. A console report lists exactly which fields had
 * data vs were blank, so "did we lose anything?" is answerable.
 */

import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { ALL_FIELDS, getByPath } from './field-map.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = join(HERE, 'minor-works-template.pdf');

const argPayload = process.argv[2];
const argOut = process.argv[3];
const PAYLOAD = argPayload ? resolve(argPayload) : join(HERE, 'sample-payload.json');
const OUT = argOut ? resolve(argOut) : join(HERE, 'minor-works-filled.pdf');

async function main() {
  const [templateBytes, payloadJson] = await Promise.all([
    readFile(TEMPLATE),
    readFile(PAYLOAD, 'utf8'),
  ]);
  const payload = JSON.parse(payloadJson);

  const doc = await PDFDocument.load(templateBytes);
  const form = doc.getForm();

  const filled = [];
  const blank = [];
  const missingOnTemplate = [];

  for (const field of ALL_FIELDS) {
    const value = getByPath(payload, field.path);
    const present = value !== undefined && value !== null && value !== '';

    try {
      if (field.type === 'check') {
        const cb = form.getCheckBox(field.pdf);
        if (value === true) cb.check();
        else cb.uncheck();
        (present ? filled : blank).push(field);
      } else {
        const tf = form.getTextField(field.pdf);
        const str = present ? String(value) : '';
        tf.setText(str);
        (present ? filled : blank).push(field);
      }
    } catch (err) {
      missingOnTemplate.push({ field, err: String(err.message || err) });
    }
  }

  // Optional: flatten to make the PDF non-editable. Comment out to keep editable.
  // form.flatten();

  const out = await doc.save();
  await writeFile(OUT, out);

  // Report
  console.log(`\nTemplate:  ${TEMPLATE}`);
  console.log(`Payload:   ${PAYLOAD}`);
  console.log(`Output:    ${OUT}\n`);
  console.log(`Filled:               ${filled.length}/${ALL_FIELDS.length}`);
  console.log(`Blank (no payload):   ${blank.length}`);
  console.log(`Missing on template:  ${missingOnTemplate.length}`);

  if (missingOnTemplate.length) {
    console.log('\n  Fields in field-map but not present on template:');
    for (const m of missingOnTemplate) {
      console.log(`    - ${m.field.pdf}  (${m.err})`);
    }
  }
  if (blank.length) {
    console.log('\n  Blank fields (verify these are intentional):');
    for (const f of blank.slice(0, 20)) {
      console.log(`    - ${f.pdf}  ←  payload.${f.path}`);
    }
    if (blank.length > 20) console.log(`    ... and ${blank.length - 20} more`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
