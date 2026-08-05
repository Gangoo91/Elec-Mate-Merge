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
 * EICR and EIC are absent on purpose: their formatters are async, and both
 * render through QsCertReviewBody instead.
 */

type Payload = Record<string, unknown>;
type Loader = (formData: Record<string, unknown>) => Promise<Payload>;

const LOADERS: Record<string, Loader> = {
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
  formData: Record<string, unknown>
): Promise<Payload> => {
  const loader = LOADERS[reportType];
  if (!loader) return formData;
  try {
    const payload = await loader(formData);
    return payload && typeof payload === 'object' ? payload : formData;
  } catch (error) {
    console.warn(`[CertPreview] ${reportType} formatter failed, showing raw form data`, error);
    return formData;
  }
};
