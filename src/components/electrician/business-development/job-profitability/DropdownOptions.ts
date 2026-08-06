export const labourHoursOptions = [
  { value: '0.5', label: '30 minutes' },
  { value: '1', label: '1 hour' },
  { value: '1.5', label: '1.5 hours' },
  { value: '2', label: '2 hours' },
  { value: '2.5', label: '2.5 hours' },
  { value: '3', label: '3 hours' },
  { value: '4', label: '4 hours' },
  { value: '5', label: '5 hours' },
  { value: '6', label: '6 hours' },
  { value: '7', label: '7 hours' },
  { value: '8', label: '8 hours (1 day)' },
  { value: '10', label: '10 hours' },
  { value: '12', label: '12 hours' },
  { value: '16', label: '16 hours (2 days)' },
  { value: '20', label: '20 hours' },
  { value: '24', label: '24 hours (3 days)' },
  { value: '32', label: '32 hours (4 days)' },
  { value: '40', label: '40 hours (1 week)' },
  { value: 'custom', label: 'Custom amount' },
];

/**
 * Labour COST per hour — the pay rate, before employer NI, holiday and pension,
 * which the calculator adds separately as an on-cost percentage.
 *
 * This list used to read "£45/hour - Domestic Standard", "£70/hour - Emergency
 * Rate", "£80/hour - Expert/Consultant". Those are CHARGE-OUT rates: what you
 * bill the customer. JobProfitabilityCalculator feeds this value straight into
 * its cost total, so picking a selling rate here booked your own margin as a
 * cost and made every profitable job look like it was barely breaking even.
 *
 * Figures are the JIB National Standard rates effective 5 January 2026,
 * Transport Provided column (JIB Handbook 2026, Section 2 — National Working
 * Rules). London Zone rates are higher; enter those as a custom rate.
 */
export const hourlyRateOptions = [
  { value: '14.60', label: '£14.60/hour - Trainee Stage 1 / Labourer' },
  { value: '16.54', label: '£16.54/hour - Trainee Stage 2' },
  { value: '17.51', label: '£17.51/hour - Trainee Stage 3' },
  { value: '18.38', label: '£18.38/hour - Electrician (inc Domestic)' },
  { value: '20.08', label: '£20.08/hour - Approved Electrician' },
  { value: '22.70', label: '£22.70/hour - Site/Installation Technician' },
  { value: 'custom', label: 'Custom rate' },
];

export const overheadPercentageOptions = [
  { value: '10', label: '10% - Minimal overheads' },
  { value: '12', label: '12% - Small operation' },
  { value: '15', label: '15% - Standard overheads' },
  { value: '18', label: '18% - Medium business' },
  { value: '20', label: '20% - Typical overheads' },
  { value: '22', label: '22% - Higher overheads' },
  { value: '25', label: '25% - Full service business' },
  { value: '28', label: '28% - Premium service' },
  { value: '30', label: '30% - High overhead business' },
  { value: 'custom', label: 'Custom percentage' },
];

/**
 * MARGIN, not markup — a share of the selling price. 25% here means
 * price = cost / 0.75, i.e. cost × 1.333. Reading these as markups
 * (cost × 1.25) would under-price every job by a third of the intended profit.
 */
export const profitMarginOptions = [
  { value: '10', label: '10% - Competitive pricing' },
  { value: '15', label: '15% - Standard margin' },
  { value: '18', label: '18% - Industrial standard' },
  { value: '20', label: '20% - Good margin' },
  { value: '22', label: '22% - Commercial standard' },
  { value: '25', label: '25% - Healthy margin' },
  { value: '28', label: '28% - Premium margin' },
  { value: '30', label: '30% - High margin' },
  { value: '35', label: '35% - Specialist work' },
  { value: '40', label: '40% - Emergency/urgent' },
  { value: 'custom', label: 'Custom margin' },
];
