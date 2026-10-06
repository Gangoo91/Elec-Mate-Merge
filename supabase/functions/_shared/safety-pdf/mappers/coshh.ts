import type { Mapper, Section, Signature, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, list, paras, refFrom, rows, signature, str, yesNo, type Row } from '../common.ts';
import { evenFacts, isPast, labelOf, mergePhotos } from './_helpers.ts';

const GHS: Record<string, string> = {
  flammable: 'Flammable',
  toxic: 'Toxic',
  harmful: 'Harmful or irritant',
  corrosive: 'Corrosive',
  'health-hazard': 'Serious health hazard',
  environmental: 'Hazardous to the environment',
  oxidiser: 'Oxidiser',
  'compressed-gas': 'Gas under pressure',
};
const ROUTE: Record<string, string> = {
  inhalation: 'Inhalation',
  'skin-contact': 'Skin contact',
  'eye-contact': 'Eye contact',
  ingestion: 'Ingestion',
};
const RISK: Record<string, { label: string; tone: Tone; verdict: string }> = {
  low: { label: 'Low risk', tone: 'ok', verdict: 'ok' },
  medium: { label: 'Medium risk', tone: 'warn', verdict: 'warn' },
  high: { label: 'High risk', tone: 'bad', verdict: 'bad' },
  'very-high': { label: 'Very high risk', tone: 'bad', verdict: 'bad' },
};
/** Hierarchy level prefixes the builder writes into control_measures ("[3. Engineering Controls] …"). */
const LEVELS: [RegExp, string][] = [
  [/^\[1\.[^\]]*\]\s*/, 'Elimination'],
  [/^\[2\.[^\]]*\]\s*/, 'Substitution'],
  [/^\[3\.[^\]]*\]\s*/, 'Engineering'],
  [/^\[4\.[^\]]*\]\s*/, 'Administrative'],
  [/^\[5\.[^\]]*\]\s*/, 'PPE'],
];
/**
 * The builder's common-substance presets (COSHHAssessmentBuilder COMMON_SUBSTANCES).
 * A row carrying one of these names started from typical figures, not this
 * product's own safety data sheet.
 */
const PRESET_NAMES = [
  'pvc cement (solvent weld)', 'cable pulling lubricant', 'flux (soldering)', 'contact cleaner spray',
  'fire retardant spray/coating', 'resin / compound (cable jointing)', 'expanding foam (pu fire stop)',
  'battery acid (sulphuric acid)', 'asbestos-containing dust', 'lead paint dust',
];

/**
 * COSHH assessment. Substance, hazards, routes, the controls in hierarchy
 * order, PPE, emergency arrangements and review date. Exposure limits print
 * only when the row holds them; nothing is looked up or filled in.
 */
export const coshhMapper: Mapper = (r: Row, ctx) => {
  const risk = RISK[str(r.risk_rating).toLowerCase()];
  const ghs = list(r.ghs_hazards).map((g) => labelOf(GHS, g));
  const routes = list(r.exposure_routes).map((x) => labelOf(ROUTE, x));
  const controls = list(r.control_measures).map((c) => {
    const lvl = LEVELS.find(([re]) => re.test(c));
    return lvl ? [lvl[1], c.replace(lvl[0], '')] : ['Other', c];
  });
  const ppe = list(r.ppe_required);
  const preset =
    PRESET_NAMES.includes(str(r.substance_name).toLowerCase()) ||
    /^various$|^n\/a — legacy/i.test(str(r.manufacturer));
  const reviewOverdue = isPast(r.review_date);

  const exposure = rows([
    ['Workplace exposure limit', r.wel_oel_limit || r.oel_value],
    ['Measured exposure', r.measured_exposure],
    ['Exceeds the limit', r.measured_exposure ? yesNo(r.exposure_exceeds_limit) : ''],
    ['Monitoring required', yesNo(r.monitoring_required), r.monitoring_required ? r.monitoring_details : ''],
  ]);

  const sections: Section[] = [
    {
      heading: 'Substance and task',
      kind: 'kv',
      rows: rows([
        ['Substance', r.substance_name],
        ['Manufacturer or supplier', r.manufacturer],
        ['Product code', r.product_code],
        ['Barcode', r.product_barcode],
        ['Where it is used', r.location_of_use],
        ['Task', r.task_description],
        ['Quantity used', r.quantity_used],
        ['How often', humanise(r.frequency_of_use)],
        ['Safety data sheet', r.sds_url],
      ]),
    },
  ];
  if (ghs.length) sections.push({ heading: 'Hazard classes', kind: 'items', items: ghs });
  if (routes.length) sections.push({ heading: 'Routes of exposure', kind: 'items', items: routes });
  const health = paras(r.health_effects);
  if (health.length) sections.push({ heading: 'Health effects', kind: 'text', paragraphs: health });
  if (exposure.length) sections.push({ heading: 'Exposure', kind: 'kv', rows: exposure });
  if (controls.length)
    sections.push({
      heading: 'Control measures',
      intro: 'In hierarchy order, as set out in the assessment.',
      kind: 'table',
      columns: ['Level', 'Control'],
      rows: controls,
    });
  if (ppe.length) sections.push({ heading: 'PPE required', kind: 'items', items: ppe });
  const emerg = rows([
    ['First aid', r.first_aid],
    ['Spill or leak', r.spill_procedure],
    ['Storage', r.storage_requirements],
    ['Disposal', r.disposal_method],
  ]);
  if (emerg.length) sections.push({ heading: 'Emergency, storage and disposal', kind: 'kv', rows: emerg });

  const remote = ctx.remote['reviewer'];
  const signatures = [
    signature('Assessed by', r.assessed_by, r.assessor_signature, r.created_at),
    remote
      ? signature('Reviewed by', remote.name, remote.image, remote.signedAt, 'link')
      : r.reviewer_name || r.reviewer_signature
        ? signature('Reviewed by', r.reviewer_name, r.reviewer_signature, '')
        : null,
  ].filter(Boolean) as Signature[];

  const notes: string[] = [];
  // Up front, not in the closing notes: it is the most important caveat on
  // a preset-derived assessment.
  const presetAlert = preset
    ? {
        tone: 'warn' as const,
        title: 'Typical figures.',
        text: 'This assessment started from a common-substance preset in the app, not this product’s own safety data sheet. Confirm every hazard, limit and first-aid line against the supplier’s SDS.',
      }
    : undefined;

  return {
    meta: {
      kind: 'COSHH assessment',
      title: str(r.substance_name) || 'Substance',
      subtitle: 'How exposure to a hazardous substance is controlled on this work.',
      reference: refFrom('COSHH', r.id),
      issued: fmtDate(r.assessment_date || r.created_at),
    },
    status: risk ? { label: risk.label, tone: risk.tone } : { label: 'Assessed', tone: 'neutral' },
    job: { site: str(r.location_of_use) || ctx.job.site },
    prepared_by: str(r.assessed_by) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Review by', value: fmtDate(r.review_date) },
      { label: 'Manufacturer', value: str(r.manufacturer) },
      { label: 'Quantity used', value: str(r.quantity_used) },
      { label: 'How often', value: humanise(r.frequency_of_use) },
    ]),
    headline: [
      ...(risk ? [{ label: 'Risk rating', value: humanise(r.risk_rating), verdict: risk.verdict, verdict_label: 'As assessed' }] : []),
      { label: 'Hazard classes', value: String(ghs.length) },
      { label: 'Controls', value: String(controls.length) },
    ],
    alert: reviewOverdue
      ? { tone: 'warn', title: 'Review date passed.', text: `This assessment was due for review on ${fmtDate(r.review_date)}.` }
      : r.exposure_exceeds_limit === true
        ? { tone: 'bad', title: 'Exposure above the limit.', text: 'The measured exposure recorded is above the workplace exposure limit recorded.' }
        : undefined,
    sections,
    signatures,
    photos: mergePhotos(ctx.photoUrl, [r.photos]),
    audit: [
      { event: 'Assessment created', at: fmtDateTime(r.created_at) },
      ...(remote ? [{ event: 'Reviewer signed by link', at: fmtDateTime(remote.signedAt) }] : []),
    ],
    notes: notes.length ? notes : undefined,
    alerts: presetAlert ? [presetAlert] : undefined,
    disclaimer:
      'A COSHH assessment as entered by the assessor named. Hazard information should be checked against the supplier’s safety data sheet for the product in use.',
  };
};
