import {
  anomalyDeltaT,
  effectiveAnomalies,
  anomalyLoadPercent,
  deriveRoutineAssessment,
  ROUTINE_ASSESSMENT_LABEL,
  ROUTINE_INSPECTION_LIMITATIONS,
  thermalBandFor,
  THERMAL_PRIORITY_ACTION,
  THERMAL_SURVEY_LIMITATIONS,
  type RoutineInspectionFormData,
} from '@/types/routine-inspection';

/**
 * Builds the PDFMonkey payload for the Routine Inspection & Thermal Imaging
 * Report (ELE-1110).
 *
 * 🔴 The live template is the source of truth for this contract and there is no
 * repo copy — fetch it from PDFMonkey before changing anything here.
 *
 * 🔴 There are no verification test results in this payload and there must
 * never be. No Ze, no Zs, no insulation resistance, no RCD trip times. A
 * maintenance visit does not measure them, and the moment one appears the
 * document stops being a maintenance record and becomes a badly-made EICR.
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

/*
 * ⚠️ The form stores a slug. Sending it straight to the template printed
 * "Premises: industrial" — lower case, on a document issued to a client.
 * Anything a user picks from a fixed list needs a label on the way out.
 */
const PREMISES_LABEL: Record<string, string> = {
  domestic: 'Domestic',
  commercial: 'Commercial',
  industrial: 'Industrial',
  other: 'Other',
};

const OUTCOME_LABEL: Record<string, string> = {
  satisfactory: 'Satisfactory',
  defect: 'Defect',
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

export function formatRoutineInspectionJson(
  form: RoutineInspectionFormData,
  company?: CompanyProfileLike | null
) {
  const logo = s(company?.logo_data_url) || s(company?.logo_url);
  const schemeLogo = s(company?.scheme_logo_data_url) || s(company?.registration_scheme_logo);

  /*
   * Items that could not be checked print WITH the limitations, not buried in
   * the schedule. On a maintenance report what was not reached is as much part
   * of the result as what was.
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
      photos: (o.photos ?? []).map((src) => ({ src })),
      has_photos: (o.photos?.length ?? 0) > 0,
    }));

  const surveyDone = form.thermalSurveyCarriedOut;
  /* 🔴 Never `form.anomalies` — see effectiveAnomalies(). */
  const findings = effectiveAnomalies(form);
  const quantitative = form.surveyMode === 'quantitative';

  /* `findings` is already empty when no survey was carried out. */
  const anomalies = findings.map((a, idx) => {
        const deltaT = anomalyDeltaT(a);
        const band = thermalBandFor(deltaT, a.reference);
        const loadPct = anomalyLoadPercent(a);
        return {
          number: String(idx + 1),
          location: s(a.location),
          equipment: s(a.equipment),
          description: s(a.description),
          action: s(a.action),

          /*
           * ΔT is printed with what it was measured AGAINST, always. A bare
           * "+18 °C" is unreadable — 18 over ambient is a Priority 3 and 18
           * over a similar component is a Priority 1. The reference is the
           * difference between "repair as time permits" and "repair now".
           */
          delta_t: deltaT === null ? '' : `${deltaT > 0 ? '+' : ''}${deltaT}`,
          has_delta_t: deltaT !== null,
          reference_label:
            a.reference === 'ambient'
              ? 'over ambient air'
              : a.reference === 'similar-component'
                ? 'over a similar component under similar load'
                : '',
          measured_temp: s(a.measuredTemp),
          reference_temp: s(a.referenceTemp),

          /* §9.3.3 — the values that make the reading checkable by anyone else. */
          emissivity: s(a.emissivity),
          reflected_temp: s(a.reflectedTemp),
          measured_load: s(a.measuredLoad),
          rated_load: s(a.ratedLoad),
          load_percent: loadPct === null ? '' : String(loadPct),
          has_optics: !!(s(a.emissivity) || s(a.reflectedTemp)),

          priority: a.priority || '',
          has_priority: !!a.priority,
          priority_action: a.priority ? THERMAL_PRIORITY_ACTION[a.priority as '1'] : '',
          priority_range: band ? band.range : '',
          /*
           * §10.1.1 — the priorities "are provided for reference purposes".
           * Flagging an override is how the report stays honest about which
           * ratings came from the criteria and which are the inspector's own.
           */
          priority_overridden: !!a.priorityOverridden,

          thermal_photos: (a.thermalPhotos ?? []).map((src) => ({ src })),
          visible_photos: (a.visiblePhotos ?? []).map((src) => ({ src })),
          has_thermal_photos: (a.thermalPhotos?.length ?? 0) > 0,
          has_visible_photos: (a.visiblePhotos?.length ?? 0) > 0,
      };
  });

  const assessment = deriveRoutineAssessment(
    form.inspectionItems,
    form.observations,
    findings
  );

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
      premises_type: PREMISES_LABEL[s(form.premisesType)] ?? s(form.premisesType),
      supply_type:
        form.supplyType === 'three-phase'
          ? '400 V three-phase'
          : form.supplyType === 'single-phase'
            ? '230 V single-phase'
            : '',
      boards_covered: s(form.boardsCovered),
    },
    scope: {
      purpose: s(form.purpose),
      extent: s(form.extent),
      limitations: s(form.limitations),
      /* 🔴 Always sent, never user-editable. */
      standard_limitations: ROUTINE_INSPECTION_LIMITATIONS,
      /* Only when a survey happened — otherwise it disclaims something absent. */
      thermal_limitations: surveyDone ? THERMAL_SURVEY_LIMITATIONS : '',
      has_thermal_limitations: surveyDone,
      not_seen: notSeen,
      has_not_seen: notSeen.length > 0,
    },
    torque: {
      checked: form.torqueChecked,
      instrument: s(form.torqueInstrument),
      settings: s(form.torqueSettings),
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
    thermal: {
      carried_out: surveyDone,
      /*
       * §8.5 — a qualitative survey produces no calibrated temperatures. The
       * template uses this to suppress the ΔT and optics columns entirely
       * rather than print a row of blanks that reads like missing data.
       */
      mode: surveyDone ? s(form.surveyMode) : '',
      is_quantitative: surveyDone && quantitative,
      camera: s(form.thermalCamera),
      /* §8.1 — without the load, "no anomalies found" means nothing. */
      load_at_survey: s(form.loadAtSurvey),
      ambient_temp: s(form.ambientTemp),
      environmental_conditions: s(form.environmentalConditions),
      thermographer_qualification: s(form.thermographerQualification),
      anomalies,
      has_anomalies: anomalies.length > 0,
      /* A survey that found nothing is a result, and must be stated as one. */
      nothing_found: surveyDone && anomalies.length === 0,
    },
    outcome: {
      assessment: ROUTINE_ASSESSMENT_LABEL[assessment],
      assessment_key: assessment,
      is_satisfactory: assessment === 'satisfactory',
      requires_attention: assessment === 'requires-attention',
      is_unsatisfactory: assessment === 'unsatisfactory',
      general_condition: s(form.generalCondition),
      recommendations: s(form.recommendations),
      next_inspection_date: ukDate(form.nextInspectionDate),
      next_inspection_reasoning: s(form.nextInspectionReasoning),
      counts: {
        c1: form.observations.filter((o) => o.code === 'C1').length,
        c2: form.observations.filter((o) => o.code === 'C2').length,
        c3: form.observations.filter((o) => o.code === 'C3').length,
        fi: form.observations.filter((o) => o.code === 'FI').length,
        defects: form.inspectionItems.filter((i) => i.outcome === 'defect').length,
        /* Thermal counts are separate — a P1 is not a C1 and must not be merged. */
        p1: findings.filter((a) => a.priority === '1').length,
        p2: findings.filter((a) => a.priority === '2').length,
        p3: findings.filter((a) => a.priority === '3').length,
        p4: findings.filter((a) => a.priority === '4').length,
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

export default formatRoutineInspectionJson;
