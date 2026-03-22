/**
 * minor-works.test.ts
 *
 * Exhaustive schema-coverage test for the Minor Works HTML template.
 * Ensures every field in MinorWorksPayload actually appears in the rendered HTML.
 *
 * Run: deno test --allow-none supabase/functions/_shared/certificate-templates/minor-works.test.ts
 *
 * WHY THIS EXISTS:
 * Schema drift was causing production bugs — fields added to the Zod schema
 * or transform function but never rendered in the template.  Zod silently
 * fills defaults, so the PDF generates without error but with missing data.
 * This test catches that by giving every field a unique sentinel value and
 * asserting it appears in the output HTML.
 */

import {
  assertEquals,
  assertStringIncludes,
} from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { minorWorksTemplate } from './minor-works.ts';
import type { MinorWorksPayload } from '../minor-works-schema.ts';

/**
 * Build a payload where every string field has a unique, searchable sentinel
 * value like "SENTINEL_certificate_number".  Boolean fields are set to true
 * so their checkboxes render as checked (verifiable via the ✓ character).
 */
function buildSentinelPayload(): {
  payload: MinorWorksPayload;
  sentinels: Record<string, string>;
} {
  const sentinels: Record<string, string> = {};

  function sentinel(path: string, value?: string): string {
    const v = value ?? `SENTINEL_${path}`;
    sentinels[path] = v;
    return v;
  }

  const payload: MinorWorksPayload = {
    certificate_number: sentinel('certificate_number'),
    generated_at: sentinel('generated_at'),
    bs7671_amendment_date: sentinel('bs7671_amendment_date'),
    work_date: sentinel('work_date'),
    date_of_completion: sentinel('date_of_completion'),
    next_inspection_due: sentinel('next_inspection_due'),

    contractor: {
      name: sentinel('contractor.name'),
      address: sentinel('contractor.address'),
    },

    supply: {
      voltage: sentinel('supply.voltage'),
      frequency: sentinel('supply.frequency'),
      phases: sentinel('supply.phases'),
    },

    company: {
      name: sentinel('company.name'),
      logo_url: sentinel('company.logo_url', 'https://example.com/SENTINEL_logo.png'),
      phone: sentinel('company.phone'),
      email: sentinel('company.email'),
      address: sentinel('company.address'),
      registration_no: sentinel('company.registration_no'),
      tagline: sentinel('company.tagline'),
      accent_color: '#f59e0b', // Not a rendered value — it's CSS
      website: sentinel('company.website'),
      scheme_logo: sentinel('company.scheme_logo', 'https://example.com/SENTINEL_scheme.png'),
    },

    client: {
      name: sentinel('client.name'),
      phone: sentinel('client.phone'),
      email: sentinel('client.email'),
    },

    person_ordering_work: sentinel('person_ordering_work'),

    installation: {
      address: sentinel('installation.address'),
      postcode: sentinel('installation.postcode'),
    },

    work_type: sentinel('work_type'),
    work_location: sentinel('work_location'),
    work_description: sentinel('work_description'),
    departures: sentinel('departures'),
    permitted_exceptions: sentinel('permitted_exceptions'),
    risk_assessment_attached: true,
    existing_installation_comments: sentinel('existing_installation_comments'),

    earthing: {
      type: 'TN-C-S', // Rendered as checkbox, not raw text
      zdb: sentinel('earthing.zdb'),
      conductor_present: true,
      conductor_size: sentinel('earthing.conductor_size'),
      conductor_material: sentinel('earthing.conductor_material'),
    },

    bonding: {
      size: sentinel('bonding.size'),
      water: true,
      water_size: sentinel('bonding.water_size'),
      gas: true,
      gas_size: sentinel('bonding.gas_size'),
      oil: true,
      oil_size: sentinel('bonding.oil_size'),
      structural: true,
      structural_size: sentinel('bonding.structural_size'),
      other: true,
      other_specify: sentinel('bonding.other_specify'),
    },

    circuit: {
      db_ref: sentinel('circuit.db_ref'),
      db_location_type: sentinel('circuit.db_location_type'),
      number: sentinel('circuit.number'),
      description: sentinel('circuit.description'),
      type: sentinel('circuit.type'),
      reference_method: sentinel('circuit.reference_method'),
      number_of_conductors: sentinel('circuit.number_of_conductors'),
      live_size: sentinel('circuit.live_size'),
      cpc_size: sentinel('circuit.cpc_size'),
      cable_type: sentinel('circuit.cable_type'),
      installation_method: sentinel('circuit.installation_method'),
      ocpd: {
        bs_en: sentinel('circuit.ocpd.bs_en'),
        type: sentinel('circuit.ocpd.type'),
        rating: sentinel('circuit.ocpd.rating'),
        breaking_capacity: sentinel('circuit.ocpd.breaking_capacity'),
      },
      protection: {
        rcd: true,
        rcbo: true,
        afdd: true,
        spd: true,
      },
      rcd: {
        bs_en: sentinel('circuit.rcd.bs_en'),
        type: sentinel('circuit.rcd.type'),
        rating: sentinel('circuit.rcd.rating'),
        idn: sentinel('circuit.rcd.idn'),
      },
      afdd: {
        bs_en: sentinel('circuit.afdd.bs_en'),
        rating: sentinel('circuit.afdd.rating'),
      },
      spd: {
        bs_en: sentinel('circuit.spd.bs_en'),
        type: sentinel('circuit.spd.type'),
      },
    },

    tests: {
      r1_r2: sentinel('tests.r1_r2'),
      r2: sentinel('tests.r2'),
      // Ring circuit values — non-empty to trigger conditional rendering
      ring_ll: sentinel('tests.ring_ll'),
      ring_nn: sentinel('tests.ring_nn'),
      ring_cpc: sentinel('tests.ring_cpc'),
      ring_r1_end: sentinel('tests.ring_r1_end'),
      ring_rn_end: sentinel('tests.ring_rn_end'),
      ring_r2_end: sentinel('tests.ring_r2_end'),
      ring_r1_cross: sentinel('tests.ring_r1_cross'),
      ring_rn_cross: sentinel('tests.ring_rn_cross'),
      ring_r2_cross: sentinel('tests.ring_r2_cross'),
      ring_final: sentinel('tests.ring_final'),
      insulation_voltage: sentinel('tests.insulation_voltage'),
      ir_live_live: sentinel('tests.ir_live_live'),
      ir_live_neutral: sentinel('tests.ir_live_neutral'),
      ir_live_earth: sentinel('tests.ir_live_earth'),
      ir_neutral_earth: sentinel('tests.ir_neutral_earth'),
      polarity: sentinel('tests.polarity', 'Pass'),
      zs: sentinel('tests.zs'),
      max_zs: sentinel('tests.max_zs'),
      pfc: sentinel('tests.pfc'),
      rcd_time: sentinel('tests.rcd_time'),
      rcd_5x_time: sentinel('tests.rcd_5x_time'),
      rcd_half_x: sentinel('tests.rcd_half_x', 'No Trip'),
      rcd_test_button: sentinel('tests.rcd_test_button', 'Pass'),
      rcd_rating: sentinel('tests.rcd_rating'),
      functional_test: sentinel('tests.functional_test', 'Satisfactory'),
      afdd_test_button: sentinel('tests.afdd_test_button', 'Pass'),
      afdd_trip_time: sentinel('tests.afdd_trip_time'),
      rcbo_trip_time: sentinel('tests.rcbo_trip_time'),
      earth_electrode: sentinel('tests.earth_electrode'),
      phase_rotation: sentinel('tests.phase_rotation'),
      spd_visual: sentinel('tests.spd_visual', 'Pass'),
      spd_indicator: sentinel('tests.spd_indicator'),
      spd_test_button: 'Pass', // special union type — tested separately
      temperature: sentinel('tests.temperature'),
    },

    test_equipment: {
      model: sentinel('test_equipment.model'),
      serial: sentinel('test_equipment.serial'),
      calibration_date: sentinel('test_equipment.calibration_date'),
      custom: sentinel('test_equipment.custom'),
    },

    declaration: {
      name: sentinel('declaration.name'),
      company: sentinel('declaration.company'),
      address: sentinel('declaration.address'),
      phone: sentinel('declaration.phone'),
      email: sentinel('declaration.email'),
      position: sentinel('declaration.position'),
      date: sentinel('declaration.date'),
      qualification: sentinel('declaration.qualification'),
      scheme_provider: sentinel('declaration.scheme_provider'),
      registration_number: sentinel('declaration.registration_number'),
      signature: sentinel('declaration.signature', 'https://example.com/SENTINEL_sig.png'),
      iet_declaration: true,
      bs7671_compliance: true,
      test_results_accurate: true,
      work_safety: true,
      part_p_notification: true,
      copy_provided: true,
      additional_notes: sentinel('declaration.additional_notes'),
    },
  };

  return { payload, sentinels };
}

// ─── Tests ────────────────────────────────────────────────────────────

Deno.test('minorWorksTemplate renders without throwing', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);
  assertEquals(typeof html, 'string');
  assertStringIncludes(html, '<!DOCTYPE html>');
  assertStringIncludes(html, '</html>');
});

Deno.test('every schema string field appears in rendered HTML', () => {
  const { payload, sentinels } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);

  // Fields that intentionally do NOT appear in the rendered PDF.
  // Each exclusion MUST have a documented reason — do NOT add fields here
  // just to make tests pass.  If a field should be rendered, fix the template.
  const INTENTIONAL_EXCLUSIONS = new Set([
    // Metadata-only — used by the pipeline, not rendered on the certificate
    'generated_at',
    'bs7671_amendment_date', // template hardcodes "A3:2024" in declaration text

    // contractor.* — the PDF Monkey template never had a "contractor" section.
    // Contractor info is rendered via declaration.company/address/phone/email
    // and company.name in the header.  These fields exist in the schema for
    // the transform function to populate declaration fields.
    'contractor.name',
    'contractor.address',

    // company.address and company.registration_no appear in the declaration's
    // "Contractor Details" signature box (via declaration.address), not in the
    // header.  The header only shows company.name, phone, email, website.
    'company.address',
    'company.registration_no',
  ]);

  const missing: string[] = [];

  for (const [path, value] of Object.entries(sentinels)) {
    if (INTENTIONAL_EXCLUSIONS.has(path)) continue;

    // For URL sentinels, check the escaped version too
    const escaped = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    if (!html.includes(value) && !html.includes(escaped)) {
      missing.push(`${path} = "${value}"`);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Schema drift detected! ${missing.length} field(s) not rendered in template:\n` +
        missing.map((m) => `  - ${m}`).join('\n') +
        '\n\nFix: add these fields to the template in minor-works.ts, ' +
        'or if intentionally excluded, add to INTENTIONAL_EXCLUSIONS with a reason.'
    );
  }
});

Deno.test('boolean checkboxes render as checked when true', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);

  // All boolean fields are set to true in sentinel payload.
  // Count checked checkboxes — should have at least these:
  // risk_assessment (yes), earthing conductor present,
  // bonding: water/gas/oil/structural/other,
  // protection: rcd/rcbo/afdd/spd,
  // declaration: bs7671/test_results/work_safety/part_p/copy_provided
  const checkedCount = (html.match(/checkbox-box checked/g) || []).length;

  // risk_assessment_attached=true → Yes checked, No unchecked = 1 checked
  // earthing.conductor_present = 1
  // earthing.type TN-C-S = 1 checked out of 4
  // bonding: water/gas/oil/structural/other = 5
  // protection: rcd/rcbo/afdd/spd = 4
  // declaration: 5 checkboxes = 5
  // Total minimum = 1 + 1 + 1 + 5 + 4 + 5 = 17
  if (checkedCount < 17) {
    throw new Error(
      `Expected at least 17 checked checkboxes, got ${checkedCount}. ` +
        'A boolean field may not be rendering its checkbox correctly.'
    );
  }
});

Deno.test('boolean checkboxes render as unchecked when false', () => {
  const { payload } = buildSentinelPayload();
  // Override some booleans to false
  payload.risk_assessment_attached = false;
  payload.bonding.water = false;
  payload.circuit.protection.rcd = false;
  payload.declaration.bs7671_compliance = false;

  const html = minorWorksTemplate(payload);

  // Risk assessment: No should be checked, Yes unchecked
  // We can't easily assert individual checkboxes by position,
  // but we can verify the total checked count dropped
  const checkedCount = (html.match(/checkbox-box checked/g) || []).length;
  // Removed: risk_assessment yes (-1, but no gains +1), water (-1), rcd (-1), bs7671 (-1) = net -3
  if (checkedCount > 14) {
    throw new Error(
      `Expected fewer checked checkboxes after setting booleans to false, got ${checkedCount}`
    );
  }
});

Deno.test('ring circuit section hidden when values are N/A', () => {
  const { payload } = buildSentinelPayload();
  // Set ring values to N/A — should hide the ring section
  payload.tests.ring_ll = 'N/A';
  payload.tests.ring_nn = 'N/A';
  payload.tests.ring_cpc = 'N/A';

  const html = minorWorksTemplate(payload);
  assertEquals(html.includes('Ring Final Circuit Continuity'), false);
});

Deno.test('ring circuit section shown when values are populated', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'Ring Final Circuit Continuity');
});

Deno.test('conditional sections render correctly', () => {
  const { payload } = buildSentinelPayload();

  // With data: additional notes should appear
  let html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'Additional Notes');
  assertStringIncludes(html, 'SENTINEL_declaration.additional_notes');

  // Without data: additional notes should not appear
  payload.declaration.additional_notes = '';
  html = minorWorksTemplate(payload);
  assertEquals(html.includes('SENTINEL_declaration.additional_notes'), false);
});

Deno.test('test equipment custom field conditional', () => {
  const { payload } = buildSentinelPayload();

  // With custom equipment
  let html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'SENTINEL_test_equipment.custom');

  // Without custom equipment
  payload.test_equipment.custom = '';
  html = minorWorksTemplate(payload);
  assertEquals(html.includes('SENTINEL_test_equipment.custom'), false);
});

Deno.test('pass/fail colour coding works', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);

  // polarity = 'Pass' should get .pass class
  assertStringIncludes(html, '<span class="pass">Pass</span>');

  // Test with Fail value
  payload.tests.polarity = 'Fail';
  const html2 = minorWorksTemplate(payload);
  assertStringIncludes(html2, '<span class="fail">Fail</span>');
});

Deno.test('SPD test button special logic', () => {
  const { payload } = buildSentinelPayload();

  // 'Pass' → green OK
  payload.tests.spd_test_button = 'Pass';
  let html = minorWorksTemplate(payload);
  assertStringIncludes(html, '<span class="pass">OK</span>');

  // false → N/A
  payload.tests.spd_test_button = false;
  html = minorWorksTemplate(payload);
  assertStringIncludes(html, '<span class="na-text">N/A</span>');

  // '' → N/A
  payload.tests.spd_test_button = '';
  html = minorWorksTemplate(payload);
  assertStringIncludes(html, '<span class="na-text">N/A</span>');
});

Deno.test('HTML escaping prevents XSS', () => {
  const { payload } = buildSentinelPayload();
  payload.client.name = '<script>alert("xss")</script>';
  payload.work_description = 'Test & "quoted" <value>';

  const html = minorWorksTemplate(payload);

  // Raw HTML must NOT appear
  assertEquals(html.includes('<script>'), false);
  assertEquals(html.includes('alert("xss")'), false);

  // Escaped versions MUST appear
  assertStringIncludes(html, '&lt;script&gt;');
  assertStringIncludes(html, 'Test &amp; &quot;quoted&quot; &lt;value&gt;');
});

Deno.test('page break exists before Part 4', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'page-break-before');
  // The section with Part 4 should have the page-break class
  assertStringIncludes(html, 'section page-break-before');
});

Deno.test('earthing type checkbox matches exactly one option', () => {
  const types = ['TN-C', 'TN-S', 'TN-C-S', 'TT'] as const;

  for (const earthType of types) {
    const { payload } = buildSentinelPayload();
    payload.earthing.type = earthType;
    const html = minorWorksTemplate(payload);

    // Extract the earthing arrangement checkbox section
    const earthingStart = html.indexOf('Earthing Arrangement:');
    const earthingEnd = html.indexOf('Z<sub>db</sub>');
    const section = html.slice(earthingStart, earthingEnd);

    // Count checked boxes in just this section
    const checked = (section.match(/checkbox-box checked/g) || []).length;
    assertEquals(
      checked,
      1,
      `Earthing type "${earthType}" should have exactly 1 checked box, got ${checked}`
    );
  }
});

Deno.test('company logo conditional', () => {
  const { payload } = buildSentinelPayload();

  // With logo — the <div class="company-logo"> wrapper + <img> should exist
  let html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'SENTINEL_logo.png');
  assertStringIncludes(html, '<div class="company-logo">');

  // Without logo — the wrapper div should NOT appear in the body
  // (note: the CSS class definition still exists in <style>, that's fine)
  payload.company.logo_url = '';
  html = minorWorksTemplate(payload);
  assertEquals(html.includes('<div class="company-logo">'), false);
  assertEquals(html.includes('SENTINEL_logo.png'), false);
});

Deno.test('scheme logo conditional', () => {
  const { payload } = buildSentinelPayload();

  // With scheme logo
  let html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'SENTINEL_scheme.png');
  assertStringIncludes(html, '<div class="scheme-logo">');

  // Without scheme logo
  payload.company.scheme_logo = '';
  html = minorWorksTemplate(payload);
  assertEquals(html.includes('<div class="scheme-logo">'), false);
  assertEquals(html.includes('SENTINEL_scheme.png'), false);
});

Deno.test('signature image conditional', () => {
  const { payload } = buildSentinelPayload();

  // With signature
  let html = minorWorksTemplate(payload);
  assertStringIncludes(html, 'SENTINEL_sig.png');

  // Without signature
  payload.declaration.signature = '';
  html = minorWorksTemplate(payload);
  assertEquals(html.includes('SENTINEL_sig.png'), false);
});

Deno.test('guidance section has all 9 paragraphs', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);

  for (let i = 1; i <= 9; i++) {
    assertStringIncludes(
      html,
      `<strong>${i}.</strong>`,
      `Guidance paragraph ${i} missing`
    );
  }
});

Deno.test('all 5 parts are present', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);

  assertStringIncludes(html, 'Part 1');
  assertStringIncludes(html, 'Part 2');
  assertStringIncludes(html, 'Part 3');
  assertStringIncludes(html, 'Part 4');
  assertStringIncludes(html, 'Part 5');
});

Deno.test('footer contains BS 7671 reference and Elec-Mate watermark', () => {
  const { payload } = buildSentinelPayload();
  const html = minorWorksTemplate(payload);

  assertStringIncludes(html, 'BS 7671:2018+A3:2024');
  assertStringIncludes(html, 'Generated by Elec-Mate');
});
