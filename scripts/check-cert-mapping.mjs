#!/usr/bin/env node
/**
 * check-cert-mapping.mjs
 *
 * Walks the whole certificate pipeline and reports where a field falls out:
 *
 *     form component  ->  formatter  ->  payload schema  ->  Liquid template
 *
 * Why this exists
 * ---------------
 * Nothing guarded the last link. The Zod payload schemas look like they do, but
 * they cannot: every one ends `.passthrough()` (so an undeclared key is legal),
 * every field has `.default()` (so an absent key is legal), and the edge
 * functions send the RAW `formData` rather than `validation.data` (so parsing
 * never changes what PDFMonkey receives). They catch TYPE drift — a number
 * where a string was expected — not PRESENCE drift.
 *
 * The result: a formatter could emit `customer_signature` into a template that
 * never printed it, and every guard stayed green. Liquid renders an unknown
 * variable as nothing at all, so the PDF looked normal — a dropped field is
 * indistinguishable from one the electrician left blank. Solar PV was losing 113
 * fields this way, including the customer's signature; fire alarm G6 was losing
 * 37, including its log book link.
 *
 * Usage
 * -----
 *   npm run check:cert-mapping             report every certificate
 *   npm run check:cert-mapping -- solar-pv report one
 *   npm run check:cert-mapping -- --docs   (re)write docs/cert-field-maps/*.md
 *   npm run check:cert-mapping -- --ci     exit 1 if anything is worse than the baseline
 *
 * The baseline (scripts/cert-mapping-baseline.json) records today's known gaps
 * so --ci fails on REGRESSION rather than on the existing backlog. Lower the
 * numbers as gaps close; never raise them without a reason.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { probePayload, templatePaths, isRendered } from './lib/payload-probe.mjs';
import { FIXTURES } from './lib/cert-fixtures.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(ROOT, 'scripts', 'cert-mapping-baseline.json');
const DOCS_DIR = join(ROOT, 'docs', 'cert-field-maps');

/**
 * One entry per certificate. `components` is the directory the form tabs live
 * in — used only for the advisory "is this field actually on screen?" column,
 * because that check is a grep for the camelCase key and can produce false
 * negatives when a field is spread rather than named.
 */
const CERTS = [
  { id: 'emergency-lighting', name: 'Emergency lighting', templateId: '4CB2EEBB-96D4-4138-A1C5-7F046901A69E',
    formatter: 'src/utils/emergencyLightingJsonFormatter.ts', schema: 'emergency-lighting', edge: 'generate-emergency-lighting-pdf',
    template: 'emergency-lighting-certificate-template.html', components: 'src/components/inspection/emergency-lighting' },
  { id: 'pat-testing', name: 'PAT testing', templateId: '9B374EDE-A879-4470-A507-4FBA2F7DA7A6',
    formatter: 'src/utils/patTestingJsonFormatter.ts', schema: 'pat-testing', edge: 'generate-pat-testing-pdf',
    template: 'pat-testing-certificate-template.html', components: 'src/components/inspection/pat-testing' },
  { id: 'solar-pv', name: 'Solar PV', templateId: '3AE10F9E-6BDA-4DF2-ABF1-20AFADEF5156',
    formatter: 'src/utils/solarPVJsonFormatter.ts', schema: 'solar-pv', edge: 'generate-solar-pv-pdf',
    template: 'solar-pv-certificate-template.html', components: 'src/components/inspection/solar-pv' },
  { id: 'bess', name: 'Battery storage (BESS)', templateId: '8686DCA2-4377-46F5-A931-BB1DC1137E35',
    formatter: 'src/utils/bessJsonFormatter.ts', defaults: 'src/types/bess.ts', schema: 'bess', edge: 'generate-bess-pdf',
    template: 'bess-certificate-template.html', components: 'src/components/inspection/bess' },
  { id: 'lightning-protection', name: 'Lightning protection', templateId: '0A5C3791-496D-45F9-BCA2-EAE36A55D99E',
    formatter: 'src/utils/lightningProtectionJsonFormatter.ts', defaults: 'src/types/lightning-protection.ts', schema: 'lightning-protection', edge: 'generate-lightning-protection-pdf',
    template: 'lightning-protection-certificate-template.html', components: 'src/components/inspection/lightning-protection' },
  { id: 'smoke-co-alarm', name: 'Smoke & CO alarm', templateId: '904D77D8-0781-41F7-816A-F8000C795CE1',
    formatter: 'src/utils/smokeCOJsonFormatter.ts', schema: 'smoke-co', edge: 'generate-smoke-co-alarm-pdf',
    template: 'smoke-co-alarm-certificate-template.html', components: 'src/components/inspection/smoke-co' },
  // Not a certificate but the same pipeline — an Annex H log book export that
  // drops a field is the same failure as a cert that does, and was invisible
  // to this guard while it rendered client-side (ELE-1483).
  { id: 'fire-alarm-log-book', name: 'Fire alarm log book', templateId: 'A89B34B4-018F-45AE-A6C0-3AFCA4A595A6',
    formatter: 'src/utils/fireAlarmLogBookJsonFormatter.ts', schema: 'fire-alarm-log-book', edge: 'generate-fire-alarm-log-book-pdf',
    template: 'fire-alarm-log-book-template.html', components: 'src/pages/inspection' },
  { id: 'g98-commissioning', name: 'G98 commissioning', templateId: '3C669DC3-FFCB-4A22-A8BA-A30989BFCC10',
    formatter: 'src/utils/g98JsonFormatter.ts', schema: 'g98', edge: 'generate-g98-commissioning-pdf',
    template: 'g98-commissioning-certificate-template.html', components: 'src/components/inspection/g98' },
  { id: 'g99-commissioning', name: 'G99 commissioning', templateId: '66F1AA91-1EC8-4180-8B7F-A9525D84C28C',
    formatter: 'src/utils/g99JsonFormatter.ts', defaults: 'src/types/g99-commissioning.ts', schema: 'g99', edge: 'generate-g99-commissioning-pdf',
    template: 'g99-commissioning-certificate-template.html', components: 'src/components/inspection/g99' },
  { id: 'disconnection', name: 'Disconnection', templateId: '9B570110-5F31-434E-A529-705B5FF792FB',
    formatter: 'src/utils/disconnection-certificate-formatter.ts', schema: null, edge: 'generate-disconnection-certificate-pdf',
    template: 'disconnection-certificate-template.html', components: 'src/components/inspection/disconnection' },
  { id: 'testing-only', name: 'Testing only', templateId: 'B8CA4903-F839-42D1-87D1-B40BFFF4593C',
    formatter: 'src/utils/testingOnlyJsonFormatter.ts', schema: 'testing-only', edge: 'generate-testing-only-pdf',
    template: 'testing-only-certificate-template.html', components: 'src/components/inspection/testing-only' },
  { id: 'ev-charging', name: 'EV charging', templateId: '5B6C5D0A-6612-4E26-80B5-BF77EFCA407E',
    formatter: 'src/utils/evChargingJsonFormatter.ts', schema: 'ev-charging', edge: 'generate-ev-charging-pdf',
    template: 'ev-charging-certificate-template.html', components: 'src/components/inspection/ev-charging' },
  // Fire alarm: five grades, ONE edge function and ONE shared schema. The
  // formatter for G2 is a superset serving every grade, so a key it emits that
  // the G2 template ignores may legitimately belong to G1/G3/G6/G7 — treat that
  // cert's numbers as advisory rather than a defect list.
  { id: 'fire-alarm-g1', name: 'Fire alarm G1 (design)', templateId: '7DE2F415-5A70-414A-9FB3-707FB92D0F14',
    formatter: 'src/utils/fireAlarmG1JsonFormatter.ts', tabs: /^FAG1/, schema: 'fire-alarm', edge: 'generate-fire-alarm-pdf',
    template: 'fire-alarm-g1-certificate-template.html', components: 'src/components/inspection/fire-alarm' },
  { id: 'fire-alarm-g2', name: 'Fire alarm G2 (installation)', templateId: '9ED166BD-FB05-4489-868F-673902FF2DBF',
    formatter: 'src/utils/fireAlarmG2JsonFormatter.ts', tabs: /^FA(?!G[1-7])/, schema: 'fire-alarm', edge: 'generate-fire-alarm-pdf',
    template: 'fire-alarm-g2-certificate-template.html', components: 'src/components/inspection/fire-alarm',
    sharedFormatter: true },
  { id: 'fire-alarm-g3', name: 'Fire alarm G3 (commissioning)', templateId: '2EC2B796-CC4A-4ECA-AB6D-DCCE8EE229FF',
    formatter: 'src/utils/fireAlarmG3JsonFormatter.ts', tabs: /^FAG3/, schema: 'fire-alarm', edge: 'generate-fire-alarm-pdf',
    template: 'fire-alarm-g3-certificate-template.html', components: 'src/components/inspection/fire-alarm' },
  { id: 'fire-alarm-g6', name: 'Fire alarm G6 (inspection)', templateId: '24C2EA56-CDC8-4777-AD17-7B1764AC0C2D',
    formatter: 'src/utils/fireAlarmG6JsonFormatter.ts', tabs: /^FAG6/, schema: 'fire-alarm', edge: 'generate-fire-alarm-pdf',
    template: 'fire-alarm-g6-certificate-template.html', components: 'src/components/inspection/fire-alarm' },
  // ── Core BS 7671 certs ──────────────────────────────────────────────────
  // These three were absent from this registry entirely, so the three most
  // heavily edited certificates in the app were the only ones with no
  // form -> formatter -> schema -> template check.
  { id: 'eicr', name: 'EICR', templateId: '178C3DA6-99D0-490C-A031-23AD55A1134C',
    formatter: 'src/utils/eicrJsonFormatter.ts', schema: 'eicr', edge: 'generate-eicr-pdf',
    template: 'eicr-certificate-template.html',
    // ⚠️ Previously marked "demonstrably not the live template — references
    // ZERO address variables". That evidence was wrong. The template carries
    // five address references, all nested: installation_details.address (x2),
    // client_details.client_address, and both declarations.*.address. A flat
    // search for `installation_address` returns 0 — which is the same
    // nested-path blind spot that inflates the NOT-PRINTED column itself, and
    // the reason that column reads far worse than reality for this cert.
    // Whether this file matches the live PDFMonkey template is still
    // unconfirmed; the stated reason for doubting it was simply untrue.
    //
    // The July rewrite stopped printing eight supply/intake fields the older
    // template carried (tails size/length, intake cable size/type, DNO name,
    // service entry, supplementary bonding size, supply phases). That was
    // deliberate — they are not wanted on the certificate, and seven of them
    // are no longer asked for either: they survive only as empty defaults in
    // EICRFormProvider. Do not "restore" them.
    // `phases` is the one exception — still a live field in
    // SupplyCharacteristicsSection, still not printed.
    templatePath: 'docs/templates/eicr-certificate-template.html', components: 'src/components/eicr' },
  { id: 'eic', name: 'EIC', templateId: 'B39538E9-8FF1-4882-BC13-70B1C0D30947',
    formatter: 'src/utils/eicJsonFormatter.ts', schema: 'eic', edge: 'generate-eic-pdf',
    template: 'eic-certificate-template.html',
    templatePath: 'docs/templates/eic-certificate-template.html', components: 'src/components/eic' },
  // Minor Works has NO *JsonFormatter.ts — alone among the certs it builds its
  // payload inline in the generator component (`buildFormattedPayload`), so the
  // formatter column reads that file. Its schema is `minor-works-schema.ts`,
  // which doesn't match the `<id>-payload-schema.ts` convention, hence null.
  { id: 'minor-works', name: 'Minor Works', templateId: 'E57A0DC9-5D3C-4BF4-9A96-18D27579A742',
    // The payload is assembled SERVER-SIDE by transformFormDataForTemplate()
    // inside the edge function, not by the frontend formatter — unlike every
    // other cert here. Probing the frontend measures the wrong layer (it is
    // close to a passthrough of formData), so this stays on static analysis
    // until the probe can run the edge transform. Its numbers are an upper
    // bound; see the ⚠️ banner in docs/cert-field-maps/minor-works.md.
    formatter: 'src/utils/minorWorksJsonFormatter.ts', schema: 'minor-works', edge: 'generate-minor-works-pdf',
    template: 'minor-works-pdfmonkey-template.html', components: 'src/components/minor-works' },
  { id: 'fire-alarm-g7', name: 'Fire alarm G7 (modification)', templateId: '5ECD2939-5CE2-4E98-8E47-32F25975C352',
    formatter: 'src/utils/fireAlarmG7JsonFormatter.ts', tabs: /^FAG7/, schema: 'fire-alarm', edge: 'generate-fire-alarm-pdf',
    template: 'fire-alarm-g7-certificate-template.html', components: 'src/components/inspection/fire-alarm' },
];

/**
 * Keys that are never Liquid variables, so their absence from a template proves
 * nothing. Mostly the keys of lookup/label maps declared inside a formatter
 * (`const MOUNTING = { ceiling: 'Ceiling' }`), plus internal routing flags.
 */
const NOISE = new Set([
  'default', 'status', 'type', 'category', 'notes', 'data', 'id', 'both', 'other', 'general',
  'ceiling', 'wall', 'combination', 'addition', 'installed', 'chemistry', 'phases', 'scope',
  'result', 'reason', 'criteria', 'findings', 'extent', 'basis', 'organisation', 'acknowledgement',
  'certificate_type', 'ignore', 'min_required', 'zone_id', 'photo_url', 'uploaded_at',
  // local variables and helper names picked up by the key regex, never payload
  'formData', 'defaults', 'payload', 'branding', 'merged', 'value', 'key', 'get', 'set',
]);

/**
 * Several formatters emit a field twice: nested for the template
 * (`tester: { name }`) and flat for backward compatibility (`tester_name`).
 * If the nested twin is rendered, the flat copy is redundant payload — not a
 * dropped field — so it must not be counted as a gap.
 */
const hasRenderedTwin = (key, tSrc) => {
  const parts = key.split('_');
  for (let i = 1; i < parts.length; i++) {
    if (tSrc.includes(`${parts.slice(0, i).join('_')}.${parts.slice(i).join('_')}`)) return true;
  }
  return false;
};

const read = (p) => { try { return readFileSync(join(ROOT, p), 'utf8'); } catch { return null; } };

/**
 * Keys a formatter puts into its payload, at any nesting depth.
 * Both conventions are in use and a template must match its own formatter:
 * snake_case (PAT, EV, emergency lighting, solar PV, fire alarm) and camelCase
 * (BESS, G98, G99, lightning, testing only, smoke/CO, disconnection).
 */
const formatterKeys = (src) =>
  new Set(
    [...src.matchAll(/^\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:/gm)]
      .map((m) => m[1])
      // Payload keys are always snake_case or lowerCamelCase. A PascalCase key
      // is a lookup-map entry — `{ Hospital: 'Hospital', RedCare: 'RedCare' }` —
      // and has no business being looked for in a template.
      .filter((k) => !/^[A-Z]/.test(k))
  );

/** Fields a Zod payload schema declares. */
const schemaKeys = (src) =>
  new Set([...src.matchAll(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*z\./gm)].map((m) => m[1]));

/**
 * Every name a Liquid template references. Dotted paths contribute both the
 * full path and each segment, so `{{ tester.name }}` marks `name` as rendered —
 * that is what makes a nested payload readable to this check.
 */
const templateNames = (src) => {
  const out = new Set();
  const add = (n) => { out.add(n); n.split('.').forEach((p) => out.add(p)); };
  for (const m of src.matchAll(/\{\{-?\s*([a-zA-Z_][\w.]*)/g)) add(m[1]);
  for (const m of src.matchAll(/\{%-?\s*(?:if|unless|elsif|for\s+\w+\s+in)\s+([a-zA-Z_][\w.]*)/g)) add(m[1]);
  return out;
};

/** Liquid tag balance — one unclosed `if` breaks the entire render. */
const liquidBalance = (src) => {
  const opens = new Set(['if', 'unless', 'for', 'case', 'capture', 'tablerow', 'raw', 'comment']);
  const stack = [];
  for (const [, tag] of src.matchAll(/\{%-?\s*(\w+)/g)) {
    if (opens.has(tag)) stack.push(tag);
    else if (tag.startsWith('end')) {
      if (stack.pop() !== tag.slice(3)) return `unbalanced: unexpected ${tag}`;
    }
  }
  return stack.length ? `unbalanced: unclosed ${stack.join(', ')}` : 'balanced';
};

/** snake_case -> camelCase, so a payload key can be looked for in the form. A
 *  key that is already camelCase is returned unchanged. */
const camel = (s) => (s.includes('_')
  ? s.split('_').map((w, i) => (i ? w.charAt(0).toUpperCase() + w.slice(1) : w)).join('')
  : s);

/**
 * Fields the form writes, read straight off the `onUpdate('x', …)` /
 * `updateArray(i, 'x', …)` calls in the tab components.
 *
 * This is the FIRST link in the chain and the checker used to start at the
 * formatter, which made it blind here: a field the electrician fills in that
 * the formatter never reads simply never appears anywhere, so it looked fine.
 * Nested group updates (arrays, inverters, acTests) use their own setters and
 * are not captured, so this under-reports rather than over-reports.
 */
const formWrittenKeys = (blob) =>
  new Set([
    ...[...blob.matchAll(/onUpdate\(\s*'([a-zA-Z_][\w]*)'/g)].map((m) => m[1]),
    ...[...blob.matchAll(/updateArray\(\s*\w+\s*,\s*'([a-zA-Z_][\w]*)'/g)].map((m) => m[1]),
  ]);

/** Advisory: does any form component mention this field's camelCase name? */
const buildComponentIndex = (dir, only) => {
  const blob = [];
  const walk = (d) => {
    let entries;
    try { entries = readdirSync(join(ROOT, d), { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.isDirectory()) walk(join(d, e.name));
      else if (/\.tsx?$/.test(e.name) && (!only || only.test(e.name)))
        blob.push(read(join(d, e.name)) || '');
    }
  };
  walk(dir);
  return blob.join('\n');
};

function analyse(cert) {
  let fSrc = read(cert.formatter);
  // `templatePath` points outside docs/templates for certs whose live template
  // has not been pulled into the source-of-truth directory yet. Those are
  // REFERENCE SNAPSHOTS ONLY — never paste one into PDFMonkey.
  const tSrc = read(cert.templatePath ?? join('docs/templates', cert.template));
  if (!fSrc || !tSrc) return { ...cert, error: !fSrc ? `formatter missing: ${cert.formatter}` : `template missing: ${cert.template}` };

  // Pass-through formatters build their payload as `{...getDefaultX(), ...formData}`,
  // so most key names live in the types file rather than the formatter. Without
  // this the checker reports every one of them as an unsourced template variable.
  if (cert.defaults) fSrc += '\n' + (read(cert.defaults) || '');

  /*
   * Two naming conventions exist. Nearly every cert is
   * `<id>-payload-schema.ts`, but Minor Works is `minor-works-schema.ts` — and
   * because the resolver only knew the first, its config was set to
   * `schema: null` and the report said Minor Works had no payload guard at all.
   * It has a 146-field Zod schema that the edge function `safeParse`s on every
   * render. Try both names rather than let a filename decide the answer.
   */
  const schemaFile = cert.schema
    ? ['-payload-schema.ts', '-schema.ts']
        .map((suffix) => `supabase/functions/_shared/${cert.schema}${suffix}`)
        .find((f) => read(f))
    : null;
  const sSrc = schemaFile ? read(schemaFile) : null;
  const eSrc = read(`supabase/functions/${cert.edge}/index.ts`) || '';

  const emitted = formatterKeys(fSrc);
  const declared = sSrc ? schemaKeys(sSrc) : null;
  const rendered = templateNames(tSrc);
  const components = cert.components ? buildComponentIndex(cert.components, cert.tabs) : '';

  const real = (k) => !NOISE.has(k) && !rendered.has(k);
  // A key is only "not printed" if the template never mentions it in ANY form —
  // including as a loop field (`{{ d.zone }}`) or a flat/nested twin.
  let notPrinted = [...emitted]
    .filter((k) => real(k) && !tSrc.includes(k) && !hasRenderedTwin(k, tSrc))
    .sort();

  /*
   * Where a fixture exists, replace the guess with the truth.
   *
   * Everything above infers the payload by regexing the formatter's source.
   * That counts intermediate objects as payload keys and cannot follow a field
   * into a nested path, which on the EICR produced 117 "dropped" fields against
   * a real figure of zero — while the check sat in CI looking green. Running the
   * formatter leaves nothing to infer. See scripts/lib/payload-probe.mjs.
   */
  let probedLeaves = null;
  let hollowArrays = [];
  if (PROBED[cert.id]) {
    const refs = templatePaths(tSrc);
    notPrinted = PROBED[cert.id].paths.filter((path) => !isRendered(path, refs)).sort();
    probedLeaves = PROBED[cert.id].paths.length;
    /*
     * An array the fixture never seeded contributes `foo[]` and nothing inside
     * it, so every field within is invisible to this analysis and NOT PRINTED
     * is quietly understated. That is how the EICR probed "fully" while its
     * entire schedule of tests — 34 columns — was missing, and how testing-only
     * reported on a board with no circuits in it.
     *
     * Photo arrays are excluded: a certificate with no photos is a normal
     * certificate, and seeding them would only add noise.
     */
    hollowArrays = PROBED[cert.id].paths
      .filter((path) => path.endsWith('[empty]') && !/photo|image/i.test(path))
      .sort();
  }

  // A variable the template prints that nothing supplies renders as empty. This
  // is the mirror-image bug and is just as silent.
  // Names bound by Liquid itself are not payload fields: the loop variable and
  // the collection in `{% for dwg in drawings %}`, and the `forloop` properties
  // (`forloop.index` splits to `index`). Without this every loop reads as a
  // blank variable.
  const liquidScoped = new Set(['forloop', 'blank', 'empty', 'nil', 'true', 'false',
    'index', 'index0', 'rindex', 'rindex0', 'first', 'last', 'length', 'size']);
  for (const m of tSrc.matchAll(/\{%-?\s*for\s+(\w+)\s+in\s+([\w.]+)/g)) {
    liquidScoped.add(m[1]);
    liquidScoped.add(m[2].split('.').pop());
  }
  // `{% assign x = ... %}` and `{% capture x %}` define a variable in the
  // template itself — lightning protection builds four of them to decide
  // whether a photo strip should render.
  for (const m of tSrc.matchAll(/\{%-?\s*(?:assign|capture)\s+(\w+)/g)) liquidScoped.add(m[1]);

  const unsourced = [...rendered]
    .filter((n) => !n.includes('.') && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(n))
    .filter((n) => !emitted.has(n) && !fSrc.includes(n) && !liquidScoped.has(n))
    .sort();

  const notInSchema = declared ? [...emitted].filter((k) => !NOISE.has(k) && !declared.has(k)).sort() : [];
  const schemaOnly = declared ? [...declared].filter((k) => !emitted.has(k)).sort() : [];

  // Advisory only. For the fire alarm grades this is actively misleading: all
  // five share ONE components directory and G2's formatter is a superset
  // serving every grade, so a "field on a form" may be on another grade's tab
  // entirely. G2 first read as 67 dropped fields; scoped to its own five tabs
  // the real number was 2. Anything flagged here needs checking against the
  // certificate's own tabs before it is treated as a defect.
  // Layer 1: fields the form writes that the formatter never reads. These never
  // reach the payload at all, so nothing downstream can show them.
  const snake = (k) => k.replace(/(?<!^)([A-Z])/g, '_$1').toLowerCase();
  const neverRead = [...formWrittenKeys(components)]
    .filter((k) => !fSrc.includes(k) && !fSrc.includes(snake(k)))
    .sort();

  // A probed entry is a dotted path (`installation_details.occupier`), so ask the
  // component index about its leaf — `camel('installation_details.occupier')`
  // matches nothing and would report every probed field as off-form.
  const leafOf = (k) => k.replace(/\[\]/g, '').split('.').pop();
  const onScreen = notPrinted.filter((k) => components.includes(camel(leafOf(k))));

  return {
    ...cert,
    liquid: liquidBalance(tSrc),
    schemaWired: cert.schema ? eSrc.includes(`${cert.schema}-payload-schema`) || eSrc.includes(`${cert.schema}-schema`) : null,
    driftReported: eSrc.includes('schema_drift'),
    neverRead,
    counts: {
      neverRead: neverRead.length,
      emitted: emitted.size,
      declared: declared ? declared.size : null,
      notPrinted: notPrinted.length,
      probedLeaves,
      hollowArrays: hollowArrays.length,
      onScreen: onScreen.length,
      unsourced: unsourced.length,
      notInSchema: notInSchema.length,
      schemaOnly: schemaOnly.length,
    },
    notPrinted, onScreen, unsourced, notInSchema, schemaOnly, probedLeaves, hollowArrays,
  };
}

// ── Field map documents ─────────────────────────────────────────────────────

function writeFieldMap(r) {
  const lines = [
    `# ${r.name} — field map`,
    '',
    'Generated by `npm run check:cert-mapping -- --docs`. Do not hand-edit: rerun it.',
    '',
    `**Formatter:** \`${r.formatter}\`  `,
    `**Schema guard:** ${r.schema ? `\`supabase/functions/_shared/${r.schema}-payload-schema.ts\`` : '_none_'}  `,
    `**Edge function:** \`supabase/functions/${r.edge}\`  `,
    `**PDF template:** \`${r.templateId}\`  `,
    `**Authoritative HTML:** \`docs/templates/${r.template}\` — paste this into PDFMonkey after any edit.`,
    '',
    '| Check | Result |',
    '|---|---|',
    `| Liquid tags | ${r.liquid} |`,
    `| Payload keys emitted | ${r.counts.emitted} |`,
    `| Schema fields declared | ${r.counts.declared ?? '—'} |`,
    `| Schema wired into edge fn | ${r.schemaWired === null ? '— (no schema)' : r.schemaWired ? 'yes' : '**NO — drift undetected**'} |`,
    `| Sentry drift reporting | ${r.driftReported ? 'yes' : '**no**'} |`,
    '',
  ];

  if (r.notPrinted.length) {
    lines.push(
      r.counts.probedLeaves == null
        ? '> ⚠️ **Static analysis.** This certificate has no fixture in ' +
          '`scripts/lib/cert-fixtures.mjs`, so the payload below was inferred by ' +
          'reading the formatter\'s source rather than running it. Intermediate ' +
          'objects are counted as payload keys and a field that moved into a ' +
          'nested path reads as dropped when it is not. Treat this list as an ' +
          'upper bound, not a defect list — add a fixture to get a real answer.'
        : `> ✅ **Probed.** The formatter was run against a fixture and returned ` +
          `${r.counts.probedLeaves} leaf paths. The list below is what the template ` +
          `genuinely never renders.`,
      ''
    );
    lines.push(`## Collected but never printed (${r.notPrinted.length})`, '',
      'The formatter puts these in the payload and the template renders none of them.',
      r.onScreen.length ? `**${r.onScreen.length} appear in a form component** (marked ✎) — likely dropped data.` : '',
      r.id.startsWith('fire-alarm')
        ? '\n⚠️ All five fire alarm grades share one components directory, and the G2 formatter is a superset serving every grade. A ✎ here may belong to another grade’s tabs — check against this certificate’s own tabs before treating it as a defect.'
        : '',
      '', '| Payload key | On a form? |', '|---|---|',
      ...r.notPrinted.map((k) => `| \`${k}\` | ${r.onScreen.includes(k) ? '✎ yes' : '—' } |`), '');
  } else {
    lines.push('## Collected but never printed', '', 'None — every payload key reaches the template.', '');
  }

  if (r.neverRead.length) {
    lines.push(`## Collected by the form but never read by the formatter (${r.neverRead.length})`, '',
      'These never enter the payload, so no template can show them.',
      '', ...r.neverRead.map((k) => `- \`${k}\``), '');
  }

  if (r.unsourced.length) {
    lines.push(`## Printed but never supplied (${r.unsourced.length})`, '',
      'The template references these and the formatter emits nothing for them, so they render blank.',
      '', ...r.unsourced.map((k) => `- \`${k}\``), '');
  }

  if (r.notInSchema.length) {
    lines.push(`## Not declared in the schema (${r.notInSchema.length})`, '',
      'Harmless today — every schema is `.passthrough()` — but the schema stops being a description of the payload.',
      '', ...r.notInSchema.slice(0, 60).map((k) => `- \`${k}\``),
      r.notInSchema.length > 60 ? `- …and ${r.notInSchema.length - 60} more` : '', '');
  }

  if (r.schemaOnly.length) {
    lines.push(`## Declared in the schema but never emitted (${r.schemaOnly.length})`, '',
      'Dead schema fields — the formatter stopped emitting them, or never did.',
      '', ...r.schemaOnly.slice(0, 40).map((k) => `- \`${k}\``),
      r.schemaOnly.length > 40 ? `- …and ${r.schemaOnly.length - 40} more` : '', '');
  }

  mkdirSync(DOCS_DIR, { recursive: true });
  writeFileSync(join(DOCS_DIR, `${r.id}.md`), lines.filter((l) => l !== '').join('\n') + '\n');
}

// ── Run ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const wantDocs = args.includes('--docs');
const ci = args.includes('--ci');
const only = args.filter((a) => !a.startsWith('--'));

/*
 * Probe every certificate that has a fixture, before analysing any of them.
 *
 * A cert without a fixture is not silently trusted: its row is marked `static`
 * in the SOURCE column, because inferring a payload from source code is a guess
 * and the report should say which numbers are guesses.
 */
const selected = CERTS.filter((c) => !only.length || only.includes(c.id));
const PROBED = {};
for (const cert of selected) {
  const fixture = FIXTURES[cert.id];
  if (!fixture) continue;
  try {
    PROBED[cert.id] = await probePayload({
      formatter: cert.formatter,
      exportName: fixture.exportName,
      fixture: fixture.data,
      reportId: fixture.reportId,
    });
  } catch (err) {
    // A fixture that no longer runs is worse than none — it looks verified and
    // is not. Say so loudly rather than falling back without comment.
    console.error(`\n  ⚠️  ${cert.id}: fixture failed to run — ${err.message}`);
    console.error('      Falling back to static analysis for this certificate.\n');
  }
}

const results = selected.map(analyse);

const pad = (s, n) => String(s).padEnd(n);
console.log('\nCertificate pipeline:  form -> formatter -> schema -> template\n');
console.log(`${pad('CERT', 28)}${pad('EMITS', 7)}${pad('UNREAD', 8)}${pad('NOT PRINTED', 13)}${pad('(ON FORM)', 11)}${pad('BLANK', 7)}${pad('SCHEMA', 8)}${pad('LIQUID', 8)}SOURCE`);
console.log('-'.repeat(96));
for (const r of results) {
  if (r.error) { console.log(`${pad(r.id, 30)}ERROR  ${r.error}`); continue; }
  const schemaFlag = r.schemaWired === null ? 'none' : r.schemaWired ? 'ok' : 'UNWIRED';
  console.log(
    pad(r.id, 28) + pad(r.counts.emitted, 7) + pad(r.counts.neverRead, 8) +
    pad(r.counts.notPrinted, 13) + pad(r.counts.onScreen, 11) +
    pad(r.counts.unsourced, 7) + pad(schemaFlag, 8) +
    pad(r.liquid === 'balanced' ? 'ok' : r.liquid, 8) +
    // Which numbers on this row can be trusted. `probed` means the formatter was
    // actually run and NOT PRINTED is a finding; `static` means the payload was
    // inferred from source, so that column is an upper bound and nothing more.
    (r.counts.probedLeaves == null ? 'static' : `probed(${r.counts.probedLeaves})`)
  );
}

const hollow = results.filter((r) => r.hollowArrays?.length);
if (hollow.length) {
  console.log(
    '\nFixtures with arrays the formatter reads but the fixture never seeds —\n' +
    'everything inside them is invisible to this check:\n'
  );
  for (const r of hollow)
    console.log(`  ${r.id}: ${r.hollowArrays.join(', ')}`);
  console.log('\n  Seed them in scripts/lib/cert-fixtures.mjs. Discover the names with:');
  console.log("    grep -oE '(formData|data)\\.\\w+ *(\\|\\||\\?\\?) *\\[\\]' src/utils/<formatter>.ts\n");
}

const totalOnScreen = results.reduce((n, r) => n + (r.counts?.onScreen || 0), 0);
console.log('-'.repeat(96));
console.log(`\n${totalOnScreen} fields are typed by a user on a form and never reach any PDF.\n`);
console.log('Detail per certificate: docs/cert-field-maps/<cert>.md  (regenerate with --docs)\n');

if (wantDocs) {
  results.filter((r) => !r.error).forEach(writeFieldMap);
  console.log(`Wrote ${results.filter((r) => !r.error).length} field maps to docs/cert-field-maps/\n`);
}

if (ci) {
  const base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {};
  const regressions = [];
  for (const r of results) {
    if (r.error) { regressions.push(`${r.id}: ${r.error}`); continue; }
    if (r.liquid !== 'balanced') regressions.push(`${r.id}: template Liquid ${r.liquid}`);
    const was = base[r.id];
    if (!was) { regressions.push(`${r.id}: no baseline entry — run --write-baseline`); continue; }
    if (r.counts.notPrinted > was.notPrinted)
      regressions.push(`${r.id}: unprinted fields ${was.notPrinted} -> ${r.counts.notPrinted}`);
    if (was.neverRead !== undefined && r.counts.neverRead > was.neverRead)
      regressions.push(`${r.id}: form fields the formatter ignores ${was.neverRead} -> ${r.counts.neverRead}`);
    if (r.counts.unsourced > was.unsourced)
      regressions.push(`${r.id}: blank template variables ${was.unsourced} -> ${r.counts.unsourced}`);
    /*
     * A certificate that was probed and is now static has silently lost its
     * only real check — the fixture stopped running and everything fell back to
     * inferring the payload from source. That reads as a green build with a
     * quieter number, which is exactly how a broken guard survives. Treat the
     * downgrade itself as the regression; the warning printed above says why.
     */
    if (was.probed && r.counts.probedLeaves == null)
      regressions.push(
        `${r.id}: fixture no longer runs — fell back to static analysis (its numbers are now guesses)`
      );
  }
  if (regressions.length) {
    console.error('REGRESSIONS:\n' + regressions.map((s) => `  - ${s}`).join('\n') + '\n');
    process.exit(1);
  }
  console.log('No regressions against the baseline.\n');
}

if (args.includes('--write-baseline')) {
  const out = {};
  for (const r of results) if (!r.error) out[r.id] = { notPrinted: r.counts.notPrinted,
      probed: r.counts.probedLeaves != null, unsourced: r.counts.unsourced, neverRead: r.counts.neverRead };
  writeFileSync(BASELINE, JSON.stringify(out, null, 2) + '\n');
  console.log(`Baseline written to ${BASELINE}\n`);
}
