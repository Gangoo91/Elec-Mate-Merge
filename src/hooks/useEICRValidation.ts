import { useMemo } from 'react';

/** The parts of an observation this gate reads. */
interface CodedObservation {
  id?: string;
  item?: string;
  defectCode?: string;
  description?: string;
  recommendation?: string;
  inspectionItemId?: string;
}

export type EICRTabId = 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';

export interface EICRValidationRule {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  regulation?: string;
  tab: EICRTabId;
}

export interface EICRValidationResult {
  isValid: boolean;
  errors: EICRValidationRule[];
  warnings: EICRValidationRule[];
  completionPercentage: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEICRValidation = (formData: any): EICRValidationResult => {
  return useMemo(() => {
    const errors: EICRValidationRule[] = [];
    const warnings: EICRValidationRule[] = [];

    // ── Details tab ────────────────────────────────────────────
    if (!formData.clientName) {
      errors.push({ field: 'clientName', message: 'Client name', severity: 'error', tab: 'details' });
    }
    if (!formData.installationAddress) {
      errors.push({ field: 'installationAddress', message: 'Installation address', severity: 'error', tab: 'details' });
    }
    if (!formData.inspectionDate) {
      errors.push({ field: 'inspectionDate', message: 'Inspection date', severity: 'error', tab: 'details' });
    }
    if (!formData.supplyVoltage) {
      errors.push({ field: 'supplyVoltage', message: 'Supply voltage', severity: 'error', tab: 'details' });
    }
    if (!formData.phases) {
      errors.push({ field: 'phases', message: 'Number of phases', severity: 'error', tab: 'details' });
    }
    if (!formData.earthingArrangement) {
      errors.push({ field: 'earthingArrangement', message: 'Earthing arrangement', severity: 'error', tab: 'details' });
    }
    // A recorded limitation (LIM chip) is a legitimate answer — the meter
    // cupboard may be sealed. The chip clears the device field and stamps
    // mainProtectiveDeviceLimit instead, so accept either as "filled".
    if (!formData.mainProtectiveDevice && formData.mainProtectiveDeviceLimit !== 'LIM') {
      errors.push({ field: 'mainProtectiveDevice', message: 'Main protective device', severity: 'error', tab: 'details' });
    }
    // Bonding compliance — warn if missing, not block
    if (!formData.bondingCompliance) {
      warnings.push({
        field: 'bondingCompliance',
        message: 'Bonding compliance not recorded',
        severity: 'warning',
        tab: 'details',
      });
    }

    // ── Inspection tab ─────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inspectionItems: any[] = formData.inspectionItems || [];
    const inspectedItems = inspectionItems.filter(
      (i) => i.outcome && i.outcome !== '' && i.outcome !== 'not-applicable'
    );
    if (inspectedItems.length === 0) {
      errors.push({
        field: 'inspectionItems',
        message: 'No inspection items completed',
        severity: 'error',
        tab: 'inspection',
      });
    } else if (inspectedItems.length < inspectionItems.length) {
      const remaining = inspectionItems.length - inspectedItems.length;
      warnings.push({
        field: 'inspectionItems',
        message: `${remaining} inspection item${remaining === 1 ? '' : 's'} not yet recorded`,
        severity: 'warning',
        tab: 'inspection',
      });
    }

    // ── Testing tab ────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scheduleOfTests: any[] = formData.scheduleOfTests || [];

    /*
     * Every column the schedule of tests can hold a reading in.
     *
     * The old check looked at five fields — `zs`, `polarity`,
     * `insulationResistance`, `insulationLiveEarth`, `r1r2` — and one of those
     * five can never be true: `insulationResistance` is the legacy consolidated
     * field on `TestResult`, and the grid does not write it. `InsulationCells`
     * writes `insulationTestVoltage` / `insulationLiveNeutral` /
     * `insulationLiveEarth`.
     *
     * So a properly tested ring final — r₁, rₙ, r₂, insulation L-L and the RCD
     * disconnection time all recorded — counted as untested purely because Zs,
     * polarity, L-E and R1+R2 happened to be blank.
     */
    const READING_FIELDS = [
      // Continuity
      'ringR1', 'ringRn', 'ringR2', 'r1r2', 'r2',
      'ringContinuityLive', 'ringContinuityNeutral',
      // Insulation resistance
      'insulationTestVoltage', 'insulationLiveNeutral', 'insulationLiveEarth',
      'insulationNeutralEarth', 'insulationResistance',
      // Polarity / earth fault loop impedance
      'polarity', 'zs',
      // RCD + AFDD
      'rcdOneX', 'rcdTestButton', 'afddTest', 'rcdHalfX', 'rcdFiveX',
      // Other
      'pfc', 'functionalTesting',
    ] as const;

    const hasReading = (t: Record<string, unknown>): boolean =>
      READING_FIELDS.some((f) => String(t[f] ?? '').trim() !== '');

    /*
     * A spare way has no circuit in it and an RCD/SPD/main-switch row protects
     * other ways rather than occupying one — neither has anything to test, so
     * counting them as "untested" only inflates the advisory.
     */
    const testableCircuits = scheduleOfTests.filter((t) => !t.isSpare && !t.isDeviceRow);
    const untested = testableCircuits.filter((t) => !hasReading(t));

    if (scheduleOfTests.length === 0) {
      errors.push({
        field: 'scheduleOfTests',
        message: 'No circuits in schedule of tests',
        severity: 'error',
        tab: 'testing',
      });
    } else if (untested.length > 0) {
      /*
       * Advisory, never blocking (Andrew, 24 Aug 2026).
       *
       * Missing readings must not stop a certificate being issued. Not every
       * circuit gets tested — an EICR is routinely carried out with agreed
       * limitations, and a blank column is a legitimate outcome rather than
       * unfinished work. The certificate stays coherent either way because
       * `eicrJsonFormatter` prints every empty cell as N/A, so what reaches the
       * PDF says "not applicable / not recorded" rather than sitting blank.
       *
       * It is still surfaced — the pre-issue sheet lists warnings under "Worth
       * checking — these do not stop you issuing" — so an electrician who
       * simply forgot a column is told before signing. Told, not stopped.
       */
      warnings.push({
        field: 'scheduleOfTests',
        message:
          untested.length === testableCircuits.length
            ? 'No test readings recorded'
            : `${untested.length} circuit${untested.length === 1 ? '' : 's'} without test readings`,
        severity: 'warning',
        tab: 'testing',
      });
    }

    // ── Inspector tab ──────────────────────────────────────────
    if (!formData.inspectorName) {
      errors.push({ field: 'inspectorName', message: 'Inspector name', severity: 'error', tab: 'inspector' });
    }
    if (!formData.inspectorQualifications) {
      errors.push({
        field: 'inspectorQualifications',
        message: 'Inspector qualifications',
        severity: 'error',
        tab: 'inspector',
      });
    }
    if (!formData.inspectorSignature) {
      errors.push({ field: 'inspectorSignature', message: 'Inspector signature', severity: 'error', tab: 'inspector' });
    }

    /*
     * Credentials that had already lapsed on the day of the inspection.
     *
     * The inspector form warns as you type, but a warning you can scroll past is
     * not a control: these dates are pulled from the profile automatically, so
     * nobody types them and nobody re-reads them. A registration or insurance
     * date that expired before the inspection took place then prints on a signed
     * certificate as though it were current.
     *
     * Judged against the inspection date, not today. Writing a certificate up a
     * fortnight after the visit is normal, and the question that matters is
     * whether the cover was in force when the work was done.
     */
    const lapsedOnInspection = (value?: string): boolean => {
      if (!value || !formData.inspectionDate) return false;
      const expiry = new Date(`${value}T23:59:59`);
      const inspected = new Date(`${formData.inspectionDate}T00:00:00`);
      if (Number.isNaN(expiry.getTime()) || Number.isNaN(inspected.getTime())) return false;
      return expiry.getTime() < inspected.getTime();
    };

    if (lapsedOnInspection(formData.registrationExpiry as string | undefined)) {
      errors.push({
        field: 'registrationExpiry',
        message: 'Scheme registration had expired on the date of inspection',
        severity: 'error',
        tab: 'inspector',
      });
    }
    if (lapsedOnInspection(formData.insuranceExpiry as string | undefined)) {
      errors.push({
        field: 'insuranceExpiry',
        message: 'Insurance had expired on the date of inspection',
        severity: 'error',
        tab: 'inspector',
      });
    }

    /*
     * An address the certificate cannot reach.
     *
     * A warning, not a block — a certificate is perfectly valid handed over on
     * paper, and an empty email field is normal. What is not normal is typing an
     * address, issuing, and believing it was delivered. Same test as the client
     * form so the two surfaces cannot disagree.
     */
    const clientEmail = String(formData.clientEmail || '').trim();
    if (clientEmail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clientEmail)) {
      warnings.push({
        field: 'clientEmail',
        message: 'Client email will not receive the certificate — check for a typo',
        severity: 'warning',
        tab: 'details',
      });
    }

    // ── Certificate tab ────────────────────────────────────────
    if (!formData.overallAssessment) {
      errors.push({
        field: 'overallAssessment',
        message: 'Overall assessment (satisfactory / unsatisfactory)',
        severity: 'error',
        tab: 'certificate',
      });
    }
    if (!formData.nextInspectionDate) {
      warnings.push({
        field: 'nextInspectionDate',
        message: 'Next inspection date not set',
        severity: 'warning',
        tab: 'certificate',
      });
    }

    // ── Cross-cutting checks ───────────────────────────────────
    // C1 outcomes are immediately dangerous — every C1 must have an observation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const observations: any[] = formData.defectObservations || [];
    const c1Items = inspectionItems.filter((i) => i.outcome === 'C1');
    const c2Items = inspectionItems.filter((i) => i.outcome === 'C2');

    c1Items.forEach((item) => {
      const linked = observations.find((o) => o.inspectionItemId === item.id);
      if (!linked) {
        errors.push({
          field: `c1-${item.id}`,
          message: `C1 item missing observation: ${item.item?.slice(0, 40)}…`,
          severity: 'error',
          tab: 'inspection',
          regulation: 'C1 = danger present, requires action',
        });
      } else if (!linked.description?.trim() || !linked.recommendation?.trim()) {
        errors.push({
          field: `c1-detail-${item.id}`,
          message: `C1 observation needs description + recommendation`,
          severity: 'error',
          tab: 'inspection',
        });
      }
    });

    // C1 OR C2 anywhere (checklist outcomes or manually-added observations)
    // forces an "unsatisfactory" overall assessment — mandatory per BS 7671
    // Appendix 6 (FI and C3 are advisory and do not affect the assessment).
    const observationC1C2 = observations.filter(
      (o) => o.defectCode === 'C1' || o.defectCode === 'C2'
    );
    // A linked observation is normally the same finding as its checklist item,
    // so counting both would double-report it. It stops being a duplicate the
    // moment the item no longer carries C1/C2 — a bulk action that overwrites
    // the outcome leaves the observation behind, and the formatter still prints
    // it. Filtering purely on `!inspectionItemId` made that orphan invisible
    // here while it stayed visible on the certificate, which is how an EICR can
    // read Satisfactory on the front page and list a C2 in the observations
    // table. Dedupe against the outcomes that actually exist, not against the
    // presence of a link.
    const codedItemIds = new Set([...c1Items, ...c2Items].map((i) => i.id));
    const blockingCount =
      c1Items.length +
      c2Items.length +
      observationC1C2.filter(
        (o) => !o.inspectionItemId || !codedItemIds.has(o.inspectionItemId)
      ).length;
    if (blockingCount > 0 && formData.overallAssessment === 'satisfactory') {
      errors.push({
        field: 'overallAssessment',
        message: `${blockingCount} C1/C2 item${blockingCount === 1 ? '' : 's'} recorded — overall assessment must be Unsatisfactory`,
        severity: 'error',
        tab: 'certificate',
        regulation: 'BS 7671 Appendix 6 — C1 or C2 requires an unsatisfactory report',
      });
    }

    // C2 items should also be observed (less strict than C1 — warn, don't block)
    c2Items.forEach((item) => {
      const linked = observations.find((o) => o.inspectionItemId === item.id);
      if (!linked) {
        warnings.push({
          field: `c2-${item.id}`,
          message: `C2 item missing observation: ${item.item?.slice(0, 40)}…`,
          severity: 'warning',
          tab: 'inspection',
        });
      }
    });

    /**
     * Every coded observation needs wording, not just C1.
     *
     * These fields used to be pre-filled with "Item requires attention -
     * inspection outcome not satisfactory" and "Investigate and rectify as
     * required to comply with BS 7671". That is a coded defect describing no
     * defect, and because both strings are non-empty they satisfied the C1
     * check above vacuously — the gate could never fire. The defaults are now
     * blank, so this catches what the boilerplate was hiding.
     *
     * Warning rather than error, matching the treatment of C2 above: C1 is the
     * only classification that blocks. C3 and FI are advisory and must not stop
     * a certificate being issued, but an empty observation on any of them is
     * still worth surfacing before it prints.
     */
    /*
     * Walk the observations, not the checklist items.
     *
     * This used to iterate `inspectionItems` and look up a linked observation,
     * so it only ever saw observations born from the checklist. Two routes
     * bypassed it completely: "Add observation" in the Inspect tab creates a
     * blank row with no `inspectionItemId`, and every observation raised from
     * the Validate sheet is unlinked by construction. An electrician could add
     * one, set it to C1, leave every field empty and issue — the C1/C2 rule
     * would correctly force "unsatisfactory", so the certificate went out
     * declaring the installation unsafe with a blank row saying why.
     *
     * C1 blocks. Confirmed as a deliberate product decision (Andrew, 7 Aug
     * 2026) — do not soften it to a warning. Note what is and is not blocked: a
     * fully-worded C1 on an unsatisfactory certificate issues normally, because
     * that is precisely what an EICR is for. The only thing stopped is an empty
     * row coded C1 — a certificate declaring the installation unsafe while
     * saying nothing about why, which neither the client nor the next
     * electrician can act on. Everything else warns.
     */
    observations
      .filter((o: CodedObservation) =>
        ['C1', 'C2', 'C3', 'FI'].includes(String(o.defectCode))
      )
      .forEach((obs: CodedObservation, i: number) => {
        const missing: string[] = [];
        if (!obs.item?.trim()) missing.push('an item');
        if (!obs.description?.trim()) missing.push('a description');
        if (!obs.recommendation?.trim()) missing.push('a recommendation');
        if (!missing.length) return;

        const label = obs.item?.trim()
          ? `: ${obs.item.trim().slice(0, 34)}…`
          : ` (observation ${i + 1})`;
        const entry = {
          field: `obs-detail-${obs.id ?? i}`,
          message: `${obs.defectCode} observation needs ${missing.join(' and ')}${label}`,
          tab: 'inspection' as const,
        };
        if (obs.defectCode === 'C1') {
          errors.push({ ...entry, severity: 'error' as const });
        } else {
          warnings.push({ ...entry, severity: 'warning' as const });
        }
      });

    // Completion percentage
    const REQUIRED = [
      'clientName', 'installationAddress', 'inspectionDate', 'supplyVoltage', 'phases',
      'earthingArrangement', 'mainProtectiveDevice',
      'inspectorName', 'inspectorQualifications', 'inspectorSignature',
      'overallAssessment',
    ];
    let filled = REQUIRED.filter((f) => {
      // LIM chip clears the device but records the limitation marker — counts as filled.
      if (f === 'mainProtectiveDevice' && formData.mainProtectiveDeviceLimit === 'LIM') return true;
      const v = formData[f];
      return v !== undefined && v !== '' && v !== false && v !== null;
    }).length;
    // bonus completion for having inspection + tests
    if (inspectedItems.length > 0) filled++;
    if (testableCircuits.length > untested.length) filled++;
    const total = REQUIRED.length + 2;
    const completionPercentage = Math.round((filled / total) * 100);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      completionPercentage,
    };
  }, [formData]);
};
