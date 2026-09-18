import {
  anomalyDeltaT,
  effectiveAnomalies,
  anomalyLoadPercent,
  deriveRoutineAssessment,
  ROUTINE_ASSESSMENT_LABEL,
  routineInspectionLimitations,
  eicrStatus,
  effectiveSpotChecks,
  spotCheckLabel,
  spotCheckUnit,
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

/**
 * Spelt out in full on the report.
 *
 * "HMO" on a document a landlord may hand to a tenant or a council officer is
 * jargon; the premises type is also what makes a mandatory AFDD requirement
 * apply (Reg 421.1.7), so it is worth a reader being able to see which category
 * was recorded without knowing the acronym.
 */
const DWELLING_LABEL: Record<string, string> = {
  house: 'House — single household',
  flat: 'Flat — single household',
  hmo: 'House in multiple occupation (HMO)',
  student: 'Purpose-built student accommodation',
  'care-home': 'Care home',
  hrrb: 'Higher-risk residential building',
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

  /**
   * 🔴 ORDERED BY URGENCY, NOT BY WHEN THEY WERE TYPED.
   *
   * The reader of a landlord report is usually not an electrician. Presented in
   * entry order, a C1 — danger present — can sit third behind an advisory about
   * socket provision, and the one finding that needed acting on today is the
   * one most likely to be skimmed past.
   *
   * Code meanings are the standard condition-report classifications, verified
   * against `bs7671_facets`: C1 danger present, C2 potentially dangerous,
   * C3 improvement recommended, FI further investigation required. The plain
   * sentence beside each is written for the landlord, and says what the code
   * means — it does not invent a remedy the inspector did not specify.
   *
   * ⚠️ Uncoded observations sort LAST rather than being dropped. An inspector
   * who wrote a finding but did not code it still wrote a finding.
   */
  /* P1 sits with C1: the NETA criteria call it 'repair immediately', which is
     the same instruction a C1 carries. */
  const CODE_RANK: Record<string, number> = { C1: 0, P1: 0, C2: 1, FI: 2, C3: 3, '': 4 };
  const CODE_MEANING: Record<string, string> = {
    C1: 'Danger present',
    C2: 'Potentially dangerous',
    C3: 'Improvement recommended',
    FI: 'Further investigation required',
  };
  const CODE_ACTION: Record<string, string> = {
    C1: 'Risk of injury. This needs putting right now.',
    C2: 'Not dangerous today, but it could become so. Put right urgently.',
    C3: 'Not a danger. Worth doing to raise the standard of safety.',
    FI: 'The cause could not be established on this visit. Investigate without delay.',
  };

  const observations = form.observations
    .filter((o) => s(o.description) || o.code)
    .slice()
    .sort((a, b) => (CODE_RANK[a.code || ''] ?? 4) - (CODE_RANK[b.code || ''] ?? 4))
    .map((o, idx) => ({
      number: String(idx + 1),
      location: s(o.location),
      description: s(o.description),
      code: o.code || '',
      code_meaning: CODE_MEANING[o.code || ''] ?? '',
      code_action: CODE_ACTION[o.code || ''] ?? '',
      has_code: !!o.code,
      /* Anything that is not merely advisory — what a landlord must act on. */
      is_actionable: o.code === 'C1' || o.code === 'C2' || o.code === 'FI',
      photos: (o.photos ?? []).map((src) => ({ src })),
      has_photos: (o.photos?.length ?? 0) > 0,
    }));

  const spotChecks = effectiveSpotChecks(form);

  const eicrState = eicrStatus(s(form.eicrNextDue));

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

  /*
   * 🔴 THE ACT-ON-IT LIST MUST MATCH THE VERDICT, OR THE REPORT CONTRADICTS
   * ITSELF ON ITS OWN FIRST PAGE.
   *
   * `deriveRoutineAssessment` returns UNSATISFACTORY for a C1, a C2 **or a
   * thermal Priority 1**. Built from observations alone, this list omitted the
   * thermal case entirely — so a survey whose only urgent finding was a P1
   * printed "Nothing requires action" directly beneath the word UNSATISFACTORY.
   *
   * So the list is exactly the verdict's own drivers, plus FI: C1, C2, thermal
   * P1, and further-investigation items, which by definition cannot wait.
   *
   * ⚠️ P2–P4 stay out, alongside C3, and for the same reason. NETA P2 is
   * "monitor until corrective measures can be accomplished" — real, but not a
   * thing to do today, and a "needs doing" list that includes everything stops
   * being read. All of them appear in full in the survey section below.
   */
  const thermalActions = anomalies
    .filter((a) => a.priority === '1')
    .map((a) => ({
      number: a.number,
      location: [a.location, a.equipment].filter(Boolean).join(' — '),
      description: a.description,
      code: 'P1',
      code_meaning: 'Thermal — major discrepancy',
      code_action:
        a.action ||
        'Major discrepancy against the temperature-rise criteria. Repair immediately.',
      has_code: true,
      is_actionable: true,
      photos: [],
      has_photos: false,
    }));

  const actionable = [...observations.filter((o) => o.is_actionable), ...thermalActions].sort(
    (a, b) => (CODE_RANK[a.code] ?? 4) - (CODE_RANK[b.code] ?? 4)
  );

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
      /*
       * 🔴 WHICH DUTY THIS REPORT EVIDENCES.
       *
       * Sent as finished prose rather than as a flag, so the template prints a
       * statement rather than choosing one. A landlord visit and a commercial
       * maintenance visit rest on different law, and printing the wrong one is
       * an overclaim on a document somebody signs:
       *
       *   landlord   — Landlord and Tenant Act 1985 s11(1)(b) (England and
       *                Wales) / Housing (Scotland) Act 2014 s13. A continuing
       *                repairing duty, which is why the visit is annual.
       *   commercial — Electricity at Work Regulations 1989, Reg 4(2).
       *
       * ⚠️ THE LIVE PDFMONKEY TEMPLATE DOES NOT READ THIS YET. It prints
       * "Supports EAWR 1989 Regulation 4(2) · Not an EICR" as a literal, so a
       * landlord report currently comes out citing the workplace duty. Patch
       * the live template to `{{ metadata.legal_basis }}` before any landlord
       * report is issued to a client. Unused keys are ignored by Liquid, so
       * sending it ahead of that is harmless.
       */
      visit_type: s(form.visitType) || 'landlord',
      is_landlord_visit: form.visitType === 'landlord',
      legal_basis:
        form.visitType === 'landlord'
          ? 'Supports the landlord’s duty to keep the installation in repair — Landlord and Tenant Act 1985 s.11(1)(b), or Housing (Scotland) Act 2014 s.13 · Not an EICR'
          : 'Supports EAWR 1989 Regulation 4(2) · Not an EICR',
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
      /* Gates the contact cell on its own. Without it the template printed the
         label "Contact" against an empty value whenever an occupier was named
         but no phone or email was. */
      has_contact: !!(s(form.clientPhone) || s(form.clientEmail)),
      letting_agent: s(form.lettingAgent),
      has_letting_agent: !!s(form.lettingAgent),
      property_reference: s(form.propertyReference),
      has_property_reference: !!s(form.propertyReference),
    },
    /*
     * The condition report on file — RECORDED, never assessed. This visit did
     * no testing, so it reports the dates it was shown and takes no view on
     * what the EICR found. `has_eicr_record` gates the whole block so a report
     * with nothing recorded prints nothing rather than an empty heading.
     */
    compliance: {
      eicr_date: ukDate(form.eicrDate),
      eicr_next_due: ukDate(form.eicrNextDue),
      has_eicr_record: !!(s(form.eicrDate) || s(form.eicrNextDue)),
      /* Same derivation the form shows on screen — one source, so the document
         and the screen cannot disagree about the same date. */
      eicr_status_note: eicrState?.message ?? '',
      eicr_is_overdue: eicrState?.tone === 'overdue',
      eicr_due_soon: eicrState?.tone === 'soon',
    },
    installation: {
      address: s(form.installationAddress),
      /*
       * The form hides "type of premises" on a landlord visit — a rented
       * dwelling is domestic by definition, and "type of dwelling" below is the
       * question that actually carries meaning. Filled in here rather than
       * written into state, so the report never stores a value the inspector
       * was not shown and did not choose.
       */
      premises_type:
        form.visitType === 'landlord'
          ? 'Domestic'
          : (PREMISES_LABEL[s(form.premisesType)] ?? s(form.premisesType)),
      dwelling_type: DWELLING_LABEL[s(form.dwellingType)] ?? '',
      has_dwelling_type: !!s(form.dwellingType),
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
      /* 🔴 `effectiveSpotChecks`, not `form.spotChecks` — switching the section off
         must take the readings out of the report AND put the categorical
         no-testing sentence back, together. */
      standard_limitations: routineInspectionLimitations(
        form.visitType ?? 'landlord',
        spotChecks.length > 0
      ),
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
    /*
     * 🔴 READINGS, NOT A SCHEDULE OF TEST RESULTS.
     *
     * No pass/fail is emitted and none may be added. Judging a Zs needs the
     * protective device, its rating and curve, the circuit, Cmin and the
     * ambient temperature — this report holds none of it. The value, where it
     * was taken and what took it; the inspector's view of it belongs in an
     * observation, where it carries a code and reaches the summary.
     */
    spot_checks: spotChecks.map((c, idx) => ({
      number: String(idx + 1),
      kind: spotCheckLabel(c),
      location: s(c.location),
      unit: spotCheckUnit(c),
      value: s(c.value),
      value_x5: s(c.valueX5),
      has_x5: !!s(c.valueX5),
      notes: s(c.notes),
    })),
    has_spot_checks: spotChecks.length > 0,
    instrument: {
      name: s(form.testInstrument),
      serial: s(form.testInstrumentSerial),
      calibration_date: ukDate(form.testInstrumentCalDate),
      /* Gates the whole line — "Instrument:" against nothing reads as an
         omission rather than as something not recorded. */
      has_any: !!(s(form.testInstrument) || s(form.testInstrumentSerial) || s(form.testInstrumentCalDate)),
    },

    observations,
    has_observations: observations.length > 0,
    /*
     * Photographs of the installation as a whole, printed as an appendix.
     *
     * ⚠️ A photo with no caption is dropped from the CAPTION, not from the
     * report — the picture still prints, it just prints without a label rather
     * than with an empty one hanging under it.
     */
    site_photos: (form.sitePhotos ?? [])
      .filter((p) => s(p.src))
      .map((p, idx) => ({
        number: String(idx + 1),
        src: p.src,
        caption: s(p.caption),
        has_caption: !!s(p.caption),
      })),
    has_site_photos: (form.sitePhotos ?? []).filter((p) => s(p.src)).length > 0,
    /*
     * The act-on-it subset, hoisted so the report can lead with it. A landlord
     * reading this wants one question answered before any other: is there
     * something I have to do? An empty list is as much of an answer as a full
     * one, so `has_actions` gates a "nothing needs doing" statement rather than
     * simply hiding the section.
     */
    actions: actionable,
    has_actions: actionable.length > 0,
    action_count: actionable.length,
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
      next_inspection_date: ukDate(form.nextInspectionDue),
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
