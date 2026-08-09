/**
 * UK energy-market assumptions used as DEFAULTS by the renewable calculators.
 *
 * Why this file exists
 * --------------------
 * These figures were previously hard-coded, separately, in every calculator that
 * needed them — and they had drifted badly apart:
 *
 *   import rate   solar-pv £0.25   micro-hydro £0.15
 *   export rate   solar-pv £0.10   grid-tie £0.05   wind-power options 0.03–0.12
 *
 * Two calculators sizing the same array could therefore disagree on payback by
 * a factor of two, with nothing on screen explaining why. They now share one
 * source with a stated provenance and review date.
 *
 * These are STARTING POINTS, not truths. Every calculator that uses them keeps
 * the field editable — a real quote uses the customer's actual tariff.
 *
 * ⚠️ Rates move every quarter. Re-check against the sources below and update
 * LAST_REVIEWED. Do not adjust a number here without a source.
 */

/** When these figures were last checked against the sources named below. */
export const RATES_LAST_REVIEWED = '2026-08-09';

/**
 * Domestic electricity unit rate, £/kWh, including VAT at 5%.
 *
 * Source: Ofgem energy price cap, 1 July – 30 September 2026 — 26.11 p/kWh for a
 * standard variable tariff paying by Direct Debit, averaged across England,
 * Scotland and Wales. (Apr–Jun 2026 was 24.67 p/kWh; the cap for Oct–Dec 2026 is
 * due to be published by 26 August 2026.)
 * https://www.ofgem.gov.uk/information-consumers/energy-advice-households/energy-price-cap-unit-rates-and-standing-charges
 */
export const DOMESTIC_IMPORT_RATE = 0.2611;

/**
 * Domestic standing charge, £/day, including VAT.
 * Source: same Ofgem cap period — 57.19 p/day.
 */
export const DOMESTIC_STANDING_CHARGE = 0.5719;

/**
 * A typical FIXED Smart Export Guarantee rate, £/kWh.
 *
 * Fixed SEG tariffs sat in the 3–8 p/kWh band in mid-2026, so 6 p is a
 * mid-band figure rather than a best case. Headline deals well above this
 * exist but are conditional — the highest flat rates require the same supplier
 * to have installed the system, and the very high variable rates require a
 * supplier-controlled battery and apply only in a narrow evening window.
 * Defaulting to one of those would overstate income for most installs.
 */
export const SEG_TYPICAL_RATE = 0.06;

/** The band typical fixed SEG tariffs fall in, for hints and option lists. */
export const SEG_RANGE = { low: 0.03, high: 0.08 } as const;

/**
 * VAT on domestic INSTALLATION of energy-saving materials — solar PV, battery
 * storage, heat pumps.
 *
 * Zero-rated in both Great Britain and Northern Ireland until 31 March 2027,
 * reverting to the reduced rate of 5% from 1 April 2027.
 * Source: HMRC VAT Notice 708/6, Energy-saving materials and heating equipment.
 * https://www.gov.uk/guidance/vat-on-energy-saving-materials-and-heating-equipment-notice-7086
 *
 * ⚠️ The zero rate covers INSTALLATION in residential accommodation (or a
 * building used solely for a relevant charitable purpose). Supplying the
 * materials WITHOUT installing them is standard-rated — a supply-only quote
 * priced at 0% would be wrong.
 */
export const DOMESTIC_RENEWABLES_VAT_PCT = 0;
export const DOMESTIC_RENEWABLES_VAT_REVERTS = '2027-03-31';

/**
 * A typical OFF-PEAK overnight rate, £/kWh, for battery/EV arbitrage sums.
 *
 * Octopus cut its Go / Intelligent Go off-peak rates by up to 39% on 1 April
 * 2026; the resulting rates vary by region, roughly 4–8 p/kWh (5.49 p quoted for
 * Hampshire, ~8 p quoted as a national figure). 6 p is mid-band.
 * https://octopus.energy/smart/intelligent-octopus-go/
 *
 * Regional variation is wide enough that this must stay editable — it is a
 * starting point for a payback sum, not a quotable price.
 */
export const OFF_PEAK_RATE = 0.06;
export const OFF_PEAK_RANGE = { low: 0.04, high: 0.08 } as const;

/**
 * Ofgem Typical Domestic Consumption Values, kWh/year, implemented 1 July 2026.
 *
 * Taken from Table 1 of Ofgem's own decision document, not a secondary summary:
 * "Review of typical domestic consumption values: decision", May 2026.
 * https://www.ofgem.gov.uk/sites/default/files/2026-05/Review%20of%20typical%20domestic%20consumption%20values%20decision.pdf
 *
 *   Profile Class 1 (standard single-rate)   low 1,600   medium 2,500   high 3,800
 *   Profile Class 2 (multi-rate / Eco 7)     low 1,900   medium 3,400   high 6,100
 *
 * Every figure fell in the 2026 review (medium single-rate was 2,700), so any
 * consumption band written before mid-2026 now overstates a typical household.
 */
export const TDCV_ELECTRICITY = {
  singleRate: { low: 1600, medium: 2500, high: 3800 },
  multiRate: { low: 1900, medium: 3400, high: 6100 },
} as const;

/** Household consumption options, straight from the TDCV table above. */
export const CONSUMPTION_OPTIONS = [
  { value: '1600', label: '1,600 kWh — low use (Ofgem TDCV)' },
  { value: '2500', label: '2,500 kWh — medium use (Ofgem TDCV)' },
  { value: '3800', label: '3,800 kWh — high use (Ofgem TDCV)' },
  { value: '3400', label: '3,400 kWh — medium, Economy 7' },
  { value: '6100', label: '6,100 kWh — high, Economy 7' },
];

/** Shared option list so every calculator offers the same SEG choices. */
export const SEG_RATE_OPTIONS = [
  { value: '0.03', label: '£0.03/kWh — low fixed' },
  { value: '0.06', label: '£0.06/kWh — typical fixed' },
  { value: '0.08', label: '£0.08/kWh — high fixed' },
  { value: '0.12', label: '£0.12/kWh — variable/peak' },
];

/** One-line provenance note for display under a rate field. */
export const RATES_SOURCE_NOTE =
  'Default from the Ofgem price cap; edit to match the customer’s actual tariff.';
