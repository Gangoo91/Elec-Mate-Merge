/**
 * Pure arithmetic for the business planning calculators.
 *
 * Extracted from CapacityPlanningTool.tsx and EquipmentROICalculator.tsx so
 * the formulas can be asserted directly (see scripts/check-business-planning.mjs).
 * Maths that only ever ran inside a component render is maths nothing can
 * check, which is how the defects these functions now guard against survived.
 */

// ─────────────────────────────────────────────────────────────────────────
// Capacity planning
// ─────────────────────────────────────────────────────────────────────────

/**
 * JIB National Working Rule 3.1 sets the standard working week at 37.5 hours,
 * not 40. Over 52 calendar weeks that is 1,950 paid hours a year GROSS, before
 * the 5.6 weeks of statutory holiday and any sickness or training comes out.
 * A tool that opens on 8 x 5 x 52 = 2,080 hours tells every user they have
 * 130 hours a year they do not have.
 */
export const JIB_WEEKLY_HOURS = 37.5;
export const CALENDAR_WEEKS_PER_YEAR = 52;
/** Working Time Regulations 1998: 5.6 weeks, capped at 28 days for a 5-day week. */
export const STATUTORY_HOLIDAY_WEEKS = 5.6;

export interface CapacityInputs {
  totalElectricians: number;
  workingHoursPerDay: number;
  workingDaysPerWeek: number;
  weeksPerYear: number;
  adminTimePercentage: number;
  travelTimePercentage: number;
  holidayDays: number;
  sickDays: number;
  trainingDays: number;
  averageJobHours: number;
  emergencyWorkPercentage: number;
  plannedMaintenancePercentage: number;
  growthTargetPercentage: number;
}

export interface CapacityMetrics {
  workingDaysPerHead: number;
  totalWorkingDays: number;
  totalAvailableHours: number;
  billableHours: number;
  nonBillableHours: number;
  jobsPerYear: number;
  jobsPerWeek: number;
  jobsPerDay: number;
  /**
   * Share of PAID hours that are chargeable. This is 100 - admin% - travel%:
   * a restatement of two inputs. It is NOT utilisation in the sense of "how
   * much of my capacity did I sell", and must not be presented as such.
   */
  billableRatio: number;
  mixOverAllocated: boolean;
  additionalStaffNeeded: number;
  emergencyCapacity: number;
  maintenanceCapacity: number;
  newWorkCapacity: number;
}

export function calculateCapacityMetrics(inputs: CapacityInputs): CapacityMetrics {
  // Weeks per year is CALENDAR weeks. Time off is deducted separately below,
  // so entering 46 here (leave already netted off) would double-count it.
  const weeks = Math.min(CALENDAR_WEEKS_PER_YEAR, Math.max(0, inputs.weeksPerYear));
  const daysPerWeek = Math.max(0, inputs.workingDaysPerWeek);

  // Days off can exceed the diary if the user is careless — clamp so the model
  // can never report negative capacity.
  const grossWorkingDays = weeks * daysPerWeek;
  const daysOff = Math.max(0, inputs.holidayDays + inputs.sickDays + inputs.trainingDays);
  const workingDaysPerHead = Math.max(0, grossWorkingDays - daysOff);

  const totalWorkingDays = Math.max(0, inputs.totalElectricians) * workingDaysPerHead;
  const totalAvailableHours = totalWorkingDays * Math.max(0, inputs.workingHoursPerDay);

  // Admin + travel is clamped to 100% so billable hours can never go negative.
  const overheadPercent = Math.min(
    100,
    Math.max(0, inputs.adminTimePercentage) + Math.max(0, inputs.travelTimePercentage)
  );
  const nonBillableHours = totalAvailableHours * (overheadPercent / 100);
  const billableHours = totalAvailableHours - nonBillableHours;

  // Per-day and per-week come from ACTUAL working days, not calendar weeks.
  // Dividing annual jobs by 52 and then by days-per-week understated the daily
  // rate by spreading it across holiday weeks, and divided by zero outright
  // whenever days-per-week was blank.
  const jobsPerYear = inputs.averageJobHours > 0 ? billableHours / inputs.averageJobHours : 0;
  const jobsPerDay = totalWorkingDays > 0 ? jobsPerYear / totalWorkingDays : 0;
  const jobsPerWeek = jobsPerDay * daysPerWeek;

  const billableRatio = totalAvailableHours > 0 ? (billableHours / totalAvailableHours) * 100 : 0;

  // Emergency + maintenance can be typed to more than 100%, which used to
  // produce negative "new project" hours.
  const emergencyPercent = Math.max(0, inputs.emergencyWorkPercentage);
  const maintenancePercent = Math.max(0, inputs.plannedMaintenancePercentage);
  const mixOverAllocated = emergencyPercent + maintenancePercent > 100;
  const emergencyCapacity = billableHours * (Math.min(100, emergencyPercent) / 100);
  const maintenanceCapacity = billableHours * (Math.min(100, maintenancePercent) / 100);
  const newWorkCapacity = Math.max(0, billableHours - emergencyCapacity - maintenanceCapacity);

  // Extra heads needed = the shortfall divided by the billable hours one
  // electrician delivers. Guarded against a zero denominator, which previously
  // yielded Math.ceil(Infinity) and rendered "+Infinity".
  const targetHours = billableHours * (1 + inputs.growthTargetPercentage / 100);
  const capacityGap = targetHours - billableHours;
  const billableHoursPerHead =
    inputs.totalElectricians > 0 ? billableHours / inputs.totalElectricians : 0;
  const additionalStaffNeeded =
    capacityGap > 0 && billableHoursPerHead > 0 ? Math.ceil(capacityGap / billableHoursPerHead) : 0;

  return {
    workingDaysPerHead,
    totalWorkingDays,
    totalAvailableHours,
    billableHours,
    nonBillableHours,
    jobsPerYear: Math.round(jobsPerYear),
    jobsPerWeek: Math.round(jobsPerWeek * 10) / 10,
    jobsPerDay: Math.round(jobsPerDay * 10) / 10,
    billableRatio,
    mixOverAllocated,
    additionalStaffNeeded,
    emergencyCapacity,
    maintenanceCapacity,
    newWorkCapacity,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Equipment investment appraisal
// ─────────────────────────────────────────────────────────────────────────

/**
 * Annual Investment Allowance, verified against
 * gov.uk/capital-allowances/annual-investment-allowance on 2026-08-06:
 * £1,000,000 a year, in place since 1 January 2019. Plant and machinery
 * qualifies; cars do not.
 */
export const AIA_ANNUAL_LIMIT = 1_000_000;

export interface EquipmentRoiInputs {
  equipmentCost: number;
  installationCost: number;
  maintenancePerYear: number;
  lifespanYears: number;
  residualValue: number;
  annualSavings: number;
  utilisationRate: number;
  discountRate: number;
}

export interface EquipmentRoiResults {
  capex: number;
  annualNetBenefit: number;
  /** Fractional years to break even, or null if it never does. */
  simplePaybackYears: number | null;
  npv: number;
  /** NPV five percentage points BELOW the chosen rate — the optimistic case. */
  npvBest: number;
  /** NPV five percentage points ABOVE the chosen rate — the pessimistic case. */
  npvWorst: number;
  /** Undiscounted lifetime return on capital employed. */
  roiPercent: number;
  /** Null where no IRR exists, rather than a fabricated bisection endpoint. */
  irrPercent: number | null;
  cashflowSeries: { year: number; cumulative: number }[];
}

export function calculateEquipmentRoi(inputs: EquipmentRoiInputs): EquipmentRoiResults {
  const capex = inputs.equipmentCost + inputs.installationCost;
  const lifespanYears = Math.max(1, Math.round(inputs.lifespanYears));
  const annualNetBenefit =
    inputs.annualSavings * (inputs.utilisationRate / 100) - inputs.maintenancePerYear;

  // Payback is interpolated within the year rather than rounded up to the next
  // whole year — the old version reported "3 yrs" for an investment that
  // actually broke even after 2 years and 5 months.
  let cumulative = -capex;
  const cashflowSeries: { year: number; cumulative: number }[] = [{ year: 0, cumulative }];
  let simplePaybackYears: number | null = null;
  for (let y = 1; y <= lifespanYears; y++) {
    const opening = cumulative;
    cumulative += annualNetBenefit;
    cashflowSeries.push({ year: y, cumulative });
    if (simplePaybackYears === null && cumulative >= 0 && annualNetBenefit > 0) {
      simplePaybackYears = y - 1 + -opening / annualNetBenefit;
    }
  }

  const calcNPV = (rate: number) => {
    let val = -capex;
    for (let y = 1; y <= lifespanYears; y++) val += annualNetBenefit / Math.pow(1 + rate, y);
    val += inputs.residualValue / Math.pow(1 + rate, lifespanYears);
    return val;
  };

  const r = inputs.discountRate / 100;
  const npv = calcNPV(r);

  // Sensitivity is +/- 5 PERCENTAGE POINTS. A LOWER discount rate gives a
  // HIGHER NPV, so the optimistic case is computed at the lower rate. The old
  // code labelled these the wrong way round: "NPV Low" showed the larger
  // figure and "NPV High" the smaller.
  const npvBest = calcNPV(Math.max(r - 0.05, 0.001));
  const npvWorst = calcNPV(r + 0.05);

  const totalReturn = annualNetBenefit * lifespanYears + inputs.residualValue;
  const roiPercent = capex > 0 ? ((totalReturn - capex) / capex) * 100 : 0;

  const cashflows: number[] = [
    -capex,
    ...Array.from({ length: lifespanYears }, () => annualNetBenefit),
  ];
  cashflows[cashflows.length - 1] += inputs.residualValue;

  const irrPercent = (() => {
    const npvAt = (rate: number) =>
      cashflows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + rate, i), 0);

    // An IRR only exists where the cash flows change sign. With no capex, or
    // with nothing ever coming back, there is no rate that sets NPV to zero —
    // the old loop still ran and reported a fabricated ~-90%, because
    // bisection always returns something whether or not a root is bracketed.
    const inflows = cashflows.slice(1).reduce((a, b) => a + b, 0);
    if (capex <= 0 || inflows <= 0) return null;

    let low = -0.9;
    let high = 1.0;
    // Widen upwards if the return is better than 100% a year.
    while (npvAt(high) > 0 && high < 1e6) high *= 2;
    if (npvAt(low) < 0 || npvAt(high) > 0) return null;

    let mid = 0;
    for (let i = 0; i < 200; i++) {
      mid = (low + high) / 2;
      const v = npvAt(mid);
      if (Math.abs(v) < 0.01) break;
      if (v > 0) low = mid;
      else high = mid;
    }
    return Number.isFinite(mid) ? mid * 100 : null;
  })();

  return {
    capex,
    annualNetBenefit,
    simplePaybackYears,
    npv,
    npvBest,
    npvWorst,
    roiPercent,
    irrPercent,
    cashflowSeries,
  };
}
