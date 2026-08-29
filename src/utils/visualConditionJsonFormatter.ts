import {
  deriveVisualAssessment,
  VISUAL_CONDITION_LIMITATIONS,
  type VisualConditionFormData,
} from '@/types/visual-condition';

/**
 * Builds the PDFMonkey payload for the Visual Condition Report.
 *
 * 🔴 The template is the source of truth for this contract and there is no repo
 * copy — fetch it from PDFMonkey before changing anything here.
 *
 * 🔴 There are no test results in this payload and there must never be. The
 * moment a Ze, a Zs or an insulation reading appears on this document it stops
 * being a visual report and starts being a badly-made EICR.
 */

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

const s = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

/** Slug → label. Anything picked from a fixed list needs one on the way out. */
const PREMISES_LABEL: Record<string, string> = {
  domestic: 'Domestic',
  commercial: 'Commercial',
  industrial: 'Industrial',
  other: 'Other',
};

const OUTCOME_LABEL: Record<string, string> = {
  satisfactory: 'Satisfactory',
  unsatisfactory: 'Defect',
  'further-investigation': 'Further investigation',
  'not-applicable': 'N/A',
  'not-verified': 'Not seen',
  '': '—',
};

const ukDate = (iso: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function formatVisualConditionJson(
  form: VisualConditionFormData,
  company?: CompanyProfileLike | null
) {
  const logo = s(company?.logo_data_url) || s(company?.logo_url);
  const schemeLogo = s(company?.scheme_logo_data_url) || s(company?.registration_scheme_logo);

  /*
   * Items the inspector could not see are pulled out and printed WITH the
   * limitations, not buried in the schedule. On a visual report what was not
   * inspected is as much a part of the result as what was.
   */
  const notSeen = form.inspectionItems
    .filter((i) => i.outcome === 'not-verified')
    .map((i) => ({ item: i.itemNumber, description: i.description, reason: s(i.notes) }));

  const observations = form.observations
    .filter((o) => s(o.description) || o.code)
    .map((o, idx) => ({
      number: String(idx + 1),
      location: s(o.location),
      description: s(o.description),
      code: o.code || '',
      /*
       * The photographs print. A visual report has no test results behind it —
       * the picture IS the evidence, and a count alone tells the client nothing.
       * Already compressed to 1000px / JPEG 75 at capture, so a handful adds
       * roughly the same weight as a signature image.
       */
      photos: (o.photos ?? []).map((src) => ({ src })),
      has_photos: (o.photos?.length ?? 0) > 0,
      photo_count: o.photos?.length ?? 0,
    }));

  const assessment = deriveVisualAssessment(form.observations, form.inspectionItems);

  return {
    company: {
      name: s(company?.company_name),
      logo_url: logo,
      address: s(company?.company_address),
      postcode: s(company?.company_postcode),
      phone: s(company?.company_phone),
      email: s(company?.company_email),
      website: s(company?.company_website),
      primary_color: s(company?.primary_color) || '#0C1B2A',
      accent_color: s(company?.accent_color) || s(company?.primary_color) || '#0C1B2A',
      registration_scheme: s(company?.registration_scheme),
      registration_number: s(company?.registration_number),
      scheme_logo_url: schemeLogo,
    },
    metadata: {
      certificate_number: s(form.certificateNumber),
      inspection_date: ukDate(form.inspectionDate),
      generated_date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    },
    client: {
      name: s(form.clientName),
      address: s(form.clientAddress),
      phone: s(form.clientPhone),
      email: s(form.clientEmail),
      occupier: s(form.occupier),
    },
    installation: {
      address: s(form.installationAddress),
      /*
       * ⚠️ The form stores slugs. Sent raw, the PDF read "Premises: domestic"
       * in lower case on a document issued to a client.
       */
      premises_type: PREMISES_LABEL[s(form.premisesType)] ?? s(form.premisesType),
      /*
       * 🔴 An unanswered supply must print NOTHING, not a default.
       *
       * This was a two-way ternary, so anything that was not three-phase — and
       * that includes the empty string — printed "230 V single-phase". A report
       * where the supply step was skipped therefore stated a supply
       * characteristic nobody had recorded, as fact, on a document a landlord
       * or a buyer relies on. The step IS skippable; that is why the scope
       * guard exists.
       */
      supply_type:
        form.supplyType === 'three-phase'
          ? '400 V three-phase'
          : form.supplyType === 'single-phase'
            ? '230 V single-phase'
            : '',
      main_switch_rating: s(form.mainSwitchRating),
      earthing_arrangement: s(form.earthingArrangement),
      board_location: s(form.boardLocation),
      board_make: s(form.boardMake),
      number_of_ways: s(form.numberOfWays),
      rcd_protection: s(form.rcdProtection),
    },
    scope: {
      purpose: s(form.purpose),
      extent: s(form.extent),
      limitations: s(form.limitations),
      /* 🔴 Always sent, never user-editable. See VISUAL_CONDITION_LIMITATIONS. */
      standard_limitations: VISUAL_CONDITION_LIMITATIONS,
      not_seen: notSeen,
      has_not_seen: notSeen.length > 0,
    },
    inspection: form.inspectionItems.map((i) => ({
      group: i.group,
      item: i.itemNumber,
      description: i.description,
      outcome: OUTCOME_LABEL[i.outcome] ?? '—',
      outcome_key: i.outcome,
      notes: s(i.notes),
    })),
    observations,
    has_observations: observations.length > 0,
    outcome: {
      assessment: assessment === 'satisfactory' ? 'SATISFACTORY' : 'UNSATISFACTORY',
      is_satisfactory: assessment === 'satisfactory',
      general_condition: s(form.generalCondition),
      next_inspection_date: ukDate(form.nextInspectionDate),
      counts: {
        c1: form.observations.filter((o) => o.code === 'C1').length,
        c2: form.observations.filter((o) => o.code === 'C2').length,
        c3: form.observations.filter((o) => o.code === 'C3').length,
        /* Items count too — the badge must not contradict the schedule below it. */
        fi:
          form.observations.filter((o) => o.code === 'FI').length +
          form.inspectionItems.filter((i) => i.outcome === 'further-investigation').length,
      },
    },
    inspector: {
      name: s(form.inspectorName),
      position: s(form.inspectorPosition),
      signature: s(form.inspectorSignature),
      date: ukDate(form.inspectorDate),
      company: s(form.companyName) || s(company?.company_name),
    },
  };
}

export default formatVisualConditionJson;
