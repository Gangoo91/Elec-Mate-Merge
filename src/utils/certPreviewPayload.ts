/**
 * Resolve the PDFMonkey payload for a certificate preview — ELE-1477.
 *
 * The preview originally rendered raw `formData`, which shows internal ids,
 * autosave flags and whatever key order the form happened to use. The payload
 * each cert's formatter produces is the curated version: only what goes on the
 * certificate, grouped into named sections, in the order the document uses.
 * Rendering that is what makes a preview read like the cert rather than a dump
 * of state.
 *
 * Every specialist formatter is synchronous and touches no network — branding
 * is passed in by the caller, and is deliberately omitted here since the
 * preview shows content, not styling. So this costs nothing to run.
 *
 * The imports are dynamic so none of the ~15 formatters is bundled into a cert
 * page until someone actually opens a preview.
 *
 * EICR and Minor Works are absent on purpose — `QsCertReviewBody` is shaped
 * around them and renders them correctly.
 *
 * EIC is NOT, despite that component naming it — ELE-1549. Its sections read
 * `overallAssessment`, `limitationsOfInspection` and `satisfactoryForContinuedUse`,
 * which are EICR concepts: an EIC certifies new work, so there is nothing to
 * assess for continued use and no inspection limitations to record. Across 180
 * completed EICs those keys are present on 8, 8 and 8 respectively, while the
 * fields an EIC actually carries — `extentOfInstallation` (174), `workType`
 * (178) — are not read at all. The result was a preview that looked blank on a
 * complete certificate, sitting immediately to the left of Generate, so the
 * natural order of use was to look at it first and conclude the work was lost.
 *
 * Previewing from the formatter fixes the class rather than the instance: the
 * preview now shows what the PDF shows, so the two cannot drift again.
 */

type Payload = Record<string, unknown>;
type Loader = (formData: Record<string, unknown>, reportId: string) => Promise<Payload>;

const LOADERS: Record<string, Loader> = {
  // Async, and needs the report id for observation photos and the QS
  // countersignature. Company branding is passed as null on purpose — the
  // preview shows content, not styling, and every read of it in the formatter
  // is optional-chained.
  eic: async (d, reportId) =>
    (await import('./eicJsonFormatter')).formatEicJson(d, null, reportId) as unknown as Payload,
  'ev-charging': async (d) =>
    (await import('./evChargingJsonFormatter')).formatEVChargingJson(d) as Payload,
  'solar-pv': async (d) =>
    (await import('./solarPVJsonFormatter')).formatSolarPVJson(d) as Payload,
  'pat-testing': async (d) =>
    (await import('./patTestingJsonFormatter')).formatPATTestingJson(d) as Payload,
  'emergency-lighting': async (d) =>
    (await import('./emergencyLightingJsonFormatter')).formatEmergencyLightingJson(d) as Payload,
  bess: async (d) => (await import('./bessJsonFormatter')).formatBESSJson(d) as Payload,
  'lightning-protection': async (d) =>
    (await import('./lightningProtectionJsonFormatter')).formatLightningProtectionJson(
      d as never
    ) as Payload,
  'smoke-co-alarm': async (d) =>
    (await import('./smokeCOJsonFormatter')).formatSmokeCOJson(d) as Payload,
  'g98-commissioning': async (d) =>
    (await import('./g98JsonFormatter')).formatG98Json(d) as Payload,
  'g99-commissioning': async (d) =>
    (await import('./g99JsonFormatter')).formatG99Json(d) as Payload,
  disconnection: async (d) =>
    (await import('./disconnection-certificate-formatter')).formatDisconnectionCertificatePayload(
      d as never
    ) as Payload,
  // Fire alarm — one formatter per BS 5839-1 form.
  'fire-alarm': async (d) =>
    (await import('./fireAlarmG2JsonFormatter')).formatFireAlarmJson(d) as Payload,
  'fire-alarm-design': async (d) =>
    (await import('./fireAlarmG1JsonFormatter')).formatFireAlarmG1Json(d) as Payload,
  'fire-alarm-commissioning': async (d) =>
    (await import('./fireAlarmG3JsonFormatter')).formatFireAlarmG3Json(d) as Payload,
  'fire-alarm-inspection': async (d) =>
    (await import('./fireAlarmG6JsonFormatter')).formatFireAlarmG6Json(d) as Payload,
  'fire-alarm-modification': async (d) =>
    (await import('./fireAlarmG7JsonFormatter')).formatFireAlarmG7Json(d) as Payload,
};

/** True when this cert type has a formatter we can preview from. */
export const hasPreviewPayload = (reportType: string): boolean => reportType in LOADERS;

/**
 * The certificate's PDF payload, or the raw form data when no formatter exists
 * (heat-pump has none yet). A formatter that throws on half-filled data falls
 * back the same way — a preview must never break the cert it is previewing.
 */
export const loadCertPreviewPayload = async (
  reportType: string,
  formData: Record<string, unknown>,
  reportId: string = ''
): Promise<Payload> => {
  const loader = LOADERS[reportType];
  if (!loader) return formData;
  try {
    const payload = await loader(formData, reportId);
    return payload && typeof payload === 'object' ? payload : formData;
  } catch (error) {
    console.warn(`[CertPreview] ${reportType} formatter failed, showing raw form data`, error);
    return formData;
  }
};
