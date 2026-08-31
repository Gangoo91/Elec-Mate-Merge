/**
 * Plug-in solar devices on the ENA Type Test Register — ELE-1660
 *
 * 🔴 THIS IS A DATED SNAPSHOT, NOT THE REGISTER.
 *
 * The register is live and moving fast: it went from three entries in mid-August
 * to thirty by the end of the month, and entries change status. This list exists
 * so the electrician does not have to key a twelve-character system reference off
 * a phone screen — it is a convenience, and the UI must always say so and always
 * link to the live register.
 *
 * Source, captured {@link REGISTER_SNAPSHOT_DATE}:
 * https://connect-direct.energynetworks.org/device-databases/search-gen?device_type_id=14
 *
 * ⚠️ Do not let this drive a compliance decision on its own. Spec §7 and the
 * Government Response (Annex B, "Registration of the Unit and the Connection")
 * are explicit that only a device *assessed and identified as compliant* on the
 * register demonstrates compliance — and that is a fact about today, not about
 * the day this file was written.
 *
 * 🔴 WHAT "NON-COMPLIANT" MEANS HERE — READ BEFORE CHANGING ANY COPY.
 *
 * `status` is the word the ENA register itself publishes against the entry on
 * the snapshot date. It is NOT our assessment of the product, and we do not know
 * what ENA's criteria are: the meaning of the status is not published on the
 * register, its FAQ, or the manufacturer guidance (checked 31 Aug 2026). It may
 * mean assessed-and-failed, or awaiting evidence, or superseded by a later
 * version — several manufacturers have both compliant and non-compliant entries.
 *
 * So this data may only ever be reported as *what the register says, on a stated
 * date, with a link to check it*. It must never be rendered as "unsafe",
 * "not approved", "banned", or any characterisation of the manufacturer. Saying
 * a named company's product is non-compliant in our own voice is precisely the
 * class of claim that has cost this business a cease and desist before.
 *
 * ⚠️ Secondary sources are unreliable here. Trade blogs at the time of capture
 * reported the first compliant device as an Anker Solarbank and named UKSOL as
 * the only compliant manufacturer; the register showed neither. It was captured
 * from the register itself for that reason.
 */

export const REGISTER_SNAPSHOT_DATE = '2026-08-31';
export const REGISTER_URL =
  'https://connect-direct.energynetworks.org/device-databases/search-gen?device_type_id=14';

export interface RegisteredPlugInSolarDevice {
  /** ENA system reference, e.g. "UKSOL/21014/V1/A4". */
  systemReference: string;
  manufacturer: string;
  model: string;
  /** Status as at REGISTER_SNAPSHOT_DATE. Re-check before relying on it. */
  status: 'compliant' | 'non-compliant';
  /** Declared AC capacity in kW, as published. */
  capacityKw: number;
  datePublished: string;
}

/** Thirty entries as published; twenty compliant, ten not. */
export const PLUG_IN_SOLAR_REGISTER: RegisteredPlugInSolarDevice[] = [
  { systemReference: 'CITYP/21096/V1/A4', manufacturer: 'City Plumbing Supplies Holdings Ltd', model: 'CPS 2x DM465G12RT-G48HBB + Hoymiles HF-800-WB Plug-In Solar Kit — DME-465W-2 V1.0', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-28' },
  { systemReference: 'INSTA/21105/V1/A1', manufacturer: 'InstaGroup', model: 'INS-PPG-435', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-28' },
  { systemReference: 'PERLI/21202/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug FLEX+ 930 — PLM-PPF-M-930', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21201/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug FLEX+ 465 — PLM-PPF-M-465', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21200/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug FLEX+ 500 — PLM-PPF-M-500', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21199/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug FLEX+ 1000 — PLM-PPF-M-1000', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21198/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug MAX 1000 — PLM-PPM-M-1000', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21197/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug MAX 500 — PLM-PPM-M-500', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21196/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug MAX 930 — PLM-PPM-M-930', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'PERLI/21158/V1', manufacturer: 'Perlight Solar Co., Ltd.', model: 'Perlight PowerPlug MAX 465 — PLM-PPM-M-465', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'THUNE/21204/V1', manufacturer: 'Thunder Energy', model: 'Thunder Bolt 920W', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'THUNE/21203/V1', manufacturer: 'Thunder Energy', model: 'Thunder Bolt 460W', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'INSTA/20951/V1/A9', manufacturer: 'InstaGroup', model: 'INS-PPG-800', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'UKSOL/21014/V1/A4', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Advanced 920W Two Panel Hybrid Mount Kit — UKS-PRO-A-2-920-MZ1/-HYM', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-19' },
  { systemReference: 'UKSOL/21013/V1/A2', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Max 1260W Two Panel Hybrid Mount Kit — UKS-PRO-M-2-1260-MZ1/-HYM', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-18' },
  { systemReference: 'UKSOL/21012/V1/A3', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Plus 1030W Two Panel Hybrid Mount Kit — UKS-PRO-P-2-1030-MZ1/-HYM', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-18' },
  { systemReference: 'UKSOL/21008/V1/A4', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Compact 515W Single Panel Hybrid Mount Kit — UKS-PRO-C-1-515-MZ1/-HYM', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-18' },
  { systemReference: 'UKSOL/21007/V1/A3', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Duo 890W Two Panel Hybrid Mount Kit — UKS-PRO-D-2-890-MZ1/-HYM', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-18' },
  { systemReference: 'UKSOL/21003/V1/A2', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Duo 890W Two Panel Ground Mount Kit — UKS-PRO-D-2-890-MZ1-UKG', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-18' },
  { systemReference: 'UKSOL/21002/V1/A2', manufacturer: 'UKSOL Ltd', model: 'UKSOL Plug-In Solar Pro Compact 460W Single Panel Ground Mount Kit — UKS-PRO-C-1-460-MZ1-UKG', status: 'compliant', capacityKw: 0.8, datePublished: '2026-08-18' },

  // Entries the register showed as "Non-compliant" on the snapshot date. Kept on
  // purpose: an electrician standing in a hallway needs to be able to look the
  // thing up and see that its register entry is not showing compliant — which is
  // a prompt to check the live register, not a verdict on the product.
  { systemReference: 'INSTA/21195/V1/A1', manufacturer: 'InstaGroup', model: 'INS-PPG2-800', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-27' },
  { systemReference: 'MODUL/21169/V1', manufacturer: 'Modular Solar Technologies Limited', model: '475W Solar Unit', status: 'non-compliant', capacityKw: 0.475, datePublished: '2026-08-27' },
  { systemReference: 'MODUL/21168/V1', manufacturer: 'Modular Solar Technologies Limited', model: '340W Solar Unit', status: 'non-compliant', capacityKw: 0.34, datePublished: '2026-08-27' },
  { systemReference: 'MODUL/20957/V1', manufacturer: 'Modular Solar Technologies Limited', model: '340W Solar Unit', status: 'non-compliant', capacityKw: 0.34, datePublished: '2026-08-20' },
  { systemReference: 'ECOFL/21128/V1', manufacturer: 'EcoFlow Inc.', model: 'EcoFlow Plug-In Solar device / EF-PS-800', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-26' },
  { systemReference: 'OCTOQ/21124/V1', manufacturer: 'Octopus Energy', model: 'M1-800-E', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-25' },
  { systemReference: 'FOXES/21121/V1', manufacturer: 'FOXESS Co., Ltd.', model: 'M1-800-E', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-25' },
  { systemReference: 'TSUNE/21104/V1/A1', manufacturer: 'TSUNESS Co., Ltd', model: 'TSOL-MX800Lite', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-21' },
  { systemReference: 'TSUNE/21103/V1/A1', manufacturer: 'TSUNESS Co., Ltd', model: 'TSOL-ESK800-U', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-21' },
  { systemReference: 'SEGEN/21070/V1', manufacturer: 'Segen', model: 'PIS-GW-BR-66H-470', status: 'non-compliant', capacityKw: 0.8, datePublished: '2026-08-19' },
];

/** Picker options — compliant first, each labelled with its status. */
export const registerPickerOptions = () =>
  PLUG_IN_SOLAR_REGISTER.map((d) => ({
    value: d.systemReference,
    label: `${d.manufacturer} — ${d.model}`,
    // Attributed and dated, always. We report the register's word, not a verdict.
    description:
      d.status === 'compliant'
        ? `ENA register: Compliant (${REGISTER_SNAPSHOT_DATE}) · ${d.systemReference}`
        : `ENA register: Non-compliant (${REGISTER_SNAPSHOT_DATE}) · ${d.systemReference}`,
  }));

export const findRegisteredDevice = (
  systemReference: string,
): RegisteredPlugInSolarDevice | undefined =>
  PLUG_IN_SOLAR_REGISTER.find((d) => d.systemReference === systemReference);
