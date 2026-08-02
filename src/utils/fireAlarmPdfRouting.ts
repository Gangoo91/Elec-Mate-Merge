/**
 * Fire alarm PDF routing — ONE place that knows which formatter and which
 * PDFMonkey template belong to each of the five fire alarm certificates.
 *
 * Why this exists: the cert pages each import their own formatter and pass
 * their own templateId, but the two SHARED re-render paths did not.
 *
 *  - `bulkPdfExport` matched `startsWith('fire-alarm')`, so all five types were
 *    run through the G2 formatter against the G2 template.
 *  - `ReportPdfViewer` matched `=== 'fire-alarm'` exactly, so G1/G3/G6/G7 fell
 *    through with RAW camelCase form data sent to a snake_case Liquid template.
 *
 * Both also loaded `fireAlarmJsonFormatter`, a stale fork of
 * `fireAlarmG2JsonFormatter` missing ~40 payload keys and the device
 * auto-count block. Because `reportCloud` nulls `pdf_payload` on every
 * autosave, these paths run often: generate a PDF, edit one field, re-download
 * from the Reports list, and the result was a mostly-blank certificate.
 *
 * Keep this as the single source of truth. Adding a sixth fire alarm cert means
 * adding one entry here, not editing three call sites.
 */

/** PDFMonkey template per fire alarm report type. The base `fire-alarm` (G2)
 * template is the edge function's default, so it is intentionally undefined —
 * passing no templateId lets `generate-fire-alarm-pdf` use TEMPLATE_ID. */
export const FIRE_ALARM_TEMPLATE_IDS: Record<string, string | undefined> = {
  'fire-alarm': undefined,
  'fire-alarm-design': '7DE2F415-5A70-414A-9FB3-707FB92D0F14',
  'fire-alarm-commissioning': '2EC2B796-CC4A-4ECA-AB6D-DCCE8EE229FF',
  'fire-alarm-inspection': '24C2EA56-CDC8-4777-AD17-7B1764AC0C2D',
  'fire-alarm-modification': '5ECD2939-5CE2-4E98-8E47-32F25975C352',
};

/** True for any of the five fire alarm certificate types. */
export const isFireAlarmReportType = (reportType: string): boolean =>
  Object.prototype.hasOwnProperty.call(
    FIRE_ALARM_TEMPLATE_IDS,
    reportType.toLowerCase().replace(/\s+/g, '-')
  );

/** Template id for a fire alarm type, or undefined to use the edge fn default. */
export const fireAlarmTemplateId = (reportType: string): string | undefined =>
  FIRE_ALARM_TEMPLATE_IDS[reportType.toLowerCase().replace(/\s+/g, '-')];

/**
 * Format stored form data with the formatter that matches the report type.
 * Returns null when the type is not a fire alarm cert, so callers can fall
 * through to their existing branches.
 */
export const formatFireAlarmPayload = async (
  reportType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Record<string, any> | null> => {
  const type = reportType.toLowerCase().replace(/\s+/g, '-');
  switch (type) {
    case 'fire-alarm': {
      // G2 — the CURRENT formatter, not the stale fireAlarmJsonFormatter fork.
      const { formatFireAlarmJson } = await import('./fireAlarmG2JsonFormatter');
      return formatFireAlarmJson(data);
    }
    case 'fire-alarm-design': {
      const { formatFireAlarmG1Json } = await import('./fireAlarmG1JsonFormatter');
      return formatFireAlarmG1Json(data);
    }
    case 'fire-alarm-commissioning': {
      const { formatFireAlarmG3Json } = await import('./fireAlarmG3JsonFormatter');
      return formatFireAlarmG3Json(data);
    }
    case 'fire-alarm-inspection': {
      const { formatFireAlarmG6Json } = await import('./fireAlarmG6JsonFormatter');
      return formatFireAlarmG6Json(data);
    }
    case 'fire-alarm-modification': {
      const { formatFireAlarmG7Json } = await import('./fireAlarmG7JsonFormatter');
      return formatFireAlarmG7Json(data);
    }
    default:
      return null;
  }
};
