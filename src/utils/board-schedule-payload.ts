/**
 * Builds the PDFMonkey payload for the Board Schedule template
 * (`1a97d560-3200-4162-8ba4-cb8259325ae0`), consumed by the
 * `generate-board-schedule-pdf` edge function.
 *
 * Kept as a formatter alongside the cert ones (eicrJsonFormatter etc.) rather
 * than inlined in the page, so the payload shape has one home.
 *
 * 🔴 The template is the source of truth for this contract and there is no
 * repo copy of it — fetch it from PDFMonkey before changing anything here.
 */

import type { BoardCircuit, BoardScheduleData } from './generate-board-schedule-pdf';
import { hexToRgb, isLightColour, readableTextOn, type RGB } from './pdfBrand';

const toHex = ([r, g, b]: RGB): string =>
  '#' + [r, g, b].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('');

/**
 * 🔴 Brand colours are user-supplied and plenty of them are LIGHT.
 *
 * A real profile on the platform uses `#f6c32c` — a yellow. The first version
 * of this document painted the table header with the brand and set white text
 * on it, and printed the company name and way numbers in the brand colour on
 * white paper. Against that yellow all four were close to unreadable.
 *
 * So two derived colours travel with the payload:
 *   brand_ink  — what to write ON the brand fill (white or near-black)
 *   brand_text — a brand-derived colour safe for text ON WHITE, darkened when
 *                the brand itself is too light to read
 *
 * Both are computed here rather than in CSS because the stylesheet has no
 * contrast function, and in Liquid because it has no colour maths.
 */
function deriveBrandColours(primary?: string | null, accent?: string | null) {
  const brandRgb = hexToRgb(primary || '') ?? ([12, 27, 42] as RGB);
  const brand = toHex(brandRgb);

  const brandInk = toHex(readableTextOn(brandRgb));

  // Darken toward black until it reads on white, keeping the hue.
  let textRgb = brandRgb;
  let guard = 0;
  while (isLightColour(textRgb) && guard < 12) {
    textRgb = textRgb.map((n) => n * 0.75) as RGB;
    guard += 1;
  }

  return {
    brand,
    brand_ink: brandInk,
    brand_text: toHex(textRgb),
    accent: toHex(hexToRgb(accent || '') ?? brandRgb),
  };
}

interface CompanyProfileLike {
  company_name?: string | null;
  company_address?: string | null;
  company_postcode?: string | null;
  company_phone?: string | null;
  company_email?: string | null;
  company_website?: string | null;
  logo_url?: string | null;
  logo_data_url?: string | null;
  primary_color?: string | null;
  accent_color?: string | null;
  registration_scheme?: string | null;
  registration_number?: string | null;
  registration_scheme_logo?: string | null;
  scheme_logo_data_url?: string | null;
}

/** Blank-safe: the template treats absent fields as absent, not as empty text. */
const s = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export function buildBoardSchedulePayload(
  board: BoardScheduleData,
  company: CompanyProfileLike | null,
  opts: { threePhase: boolean }
) {
  /*
   * A data: URI is as valid as a URL to the template, so the stored
   * `*_data_url` columns are preferred — they render even if the storage
   * bucket is slow or the object is not publicly readable.
   */
  const logo = s(company?.logo_data_url) || s(company?.logo_url);
  const schemeLogo = s(company?.scheme_logo_data_url) || s(company?.registration_scheme_logo);

  /*
   * 🔴 "Spare" is a property of the WAY, not of the row.
   *
   * Both templates used to treat any row with a blank description as spare.
   * On a three-phase board that is wrong and actively misleading: a single
   * three-phase circuit is entered with the description on its L1 row and
   * blanks on L2 and L3, so a 32 A motor supply printed as two SPARE ways.
   * Someone reading that label at the board would believe two poles were free.
   *
   * A way is spare only when NO row belonging to it carries a description.
   * Computed here rather than in Liquid, which cannot look across rows.
   */
  const describedWays = new Set(
    board.circuits.filter((c) => s(c.description)).map((c) => s(c.circuitNumber))
  );

  const circuits = board.circuits.map((c: BoardCircuit) => ({
    way: s(c.circuitNumber),
    // Single-phase boards send no phase at all — every conductor is brown, so
    // the template drops the column rather than printing "L1" on every row.
    phase: opts.threePhase ? s(c.phase) : '',
    description: s(c.description),
    // True only when the whole way is unused — see describedWays above.
    spare: !describedWays.has(s(c.circuitNumber)),
    cable_size: s(c.cableSize),
    device_type: s(c.type),
    rating: s(c.rating),
    zs: s(c.zs),
    rcd_rating: s(c.rcdRating),
  }));

  /*
   * ⚠️ `has_extended` must reflect the DATA, not the schema. Turning it on
   * when nothing carries cable/Zs/RCD prints three columns of em-dashes across
   * the whole document.
   */
  const hasExtended = circuits.some((c) => c.cable_size || c.zs || c.rcd_rating);

  const colours = deriveBrandColours(company?.primary_color, company?.accent_color);

  return {
    company: {
      name: s(company?.company_name),
      logo_url: logo,
      address: s(company?.company_address),
      postcode: s(company?.company_postcode),
      phone: s(company?.company_phone),
      email: s(company?.company_email),
      website: s(company?.company_website),
      primary_color: colours.brand,
      accent_color: colours.accent,
      // Derived — see deriveBrandColours. The template must use these for text
      // rather than falling back to primary_color.
      brand_ink: colours.brand_ink,
      brand_text: colours.brand_text,
      registration_scheme: s(company?.registration_scheme),
      registration_number: s(company?.registration_number),
      scheme_logo_url: schemeLogo,
    },
    /*
     * Who the document was prepared for. Kept as its own block rather than
     * folded into `board` because it describes the JOB, not the board — a site
     * with three boards produces three schedules for one client.
     */
    client: {
      name: s(board.clientName),
      address: s(board.installationAddress),
    },
    board: {
      ref: s(board.boardRef),
      location: s(board.location),
      make: s(board.boardMake),
      total_ways: s(board.totalWays),
      spd: s(board.spd),
      fed_from: s(board.fedFrom),
      main_switch_rating: s(board.mainSwitchRating),
      rcd_details: s(board.rcdDetails),
      supply_type: opts.threePhase ? '400 V three-phase' : '230 V single-phase',
      notes: s(board.notes),
    },
    circuits,
    flags: {
      has_extended: hasExtended,
      three_phase: opts.threePhase,
    },
    meta: {
      // UK format — this prints on a document a client keeps.
      generated_date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    },
  };
}
