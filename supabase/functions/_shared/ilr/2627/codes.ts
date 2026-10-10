/**
 * ILR 2026/27 code lists and return periods (ELE-2087).
 *
 * Code lists are copied from the field pages of the ILR specification 2026 to
 * 2027 (DfE, Submit learner data guidance, read 10 Oct 2026):
 *   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/entity/<Entity>/field/<Field>
 * Return periods and closing dates from the 2026 to 2027 data collection
 * timetable (last updated January 2026):
 *   https://guidance.submit-learner-data.service.gov.uk/26-27/data-collection-timetable
 */

export const TEACHING_YEAR_START = '2026-08-01';
export const TEACHING_YEAR_END = '2027-07-31';

export const ETHNICITY = [
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 98, 99,
] as const;
export const SEX = ['F', 'M'] as const;
export const LLDD_HEALTH_PROB = [1, 2, 9] as const;
/** LLDDCat. 15 (Asperger's syndrome) was valid to 31 Jul 2025 and is left out. */
export const LLDD_CAT = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 93, 94, 95, 96, 97, 98, 99,
] as const;
export const PRIOR_LEVEL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 97, 98, 99] as const;
export const AIM_TYPE = [1, 3, 4, 5] as const;
/** FundModel with the date a code stopped being valid for new starts. */
export const FUND_MODEL: Record<number, string | null> = {
  11: null,
  25: null,
  35: '2024-07-31',
  36: null,
  37: null,
  38: null,
  39: null,
  81: null,
  82: null,
  99: null,
};
export const PROG_TYPE = [25, 30, 31, 32, 33, 34] as const;
export const COMP_STATUS = [1, 2, 3, 6] as const;
export const OUTCOME = [1, 2, 3, 8] as const;
export const WITHDRAW_REASON = [2, 3, 7, 29, 40, 41, 42, 43, 44, 45, 46, 47, 48, 97, 98] as const;
export const EMP_STAT = [10, 11, 12, 98] as const;

/** The apprenticeship programme aim reference in the official 2026/27 sample file. */
export const PROGRAMME_AIM_REF = 'ZPROG001';

export interface ReturnPeriod {
  code: string;
  /** The month the period covers, or the year-end hindsight return. */
  label: string;
  /** Last day of data the period covers. */
  periodEnd: string;
  /** Collection closes at 6pm on this date. */
  closes: string;
}

export const RETURN_PERIODS: ReturnPeriod[] = [
  { code: 'R01', label: 'August 2026', periodEnd: '2026-08-31', closes: '2026-09-04' },
  { code: 'R02', label: 'September 2026', periodEnd: '2026-09-30', closes: '2026-10-06' },
  { code: 'R03', label: 'October 2026', periodEnd: '2026-10-31', closes: '2026-11-05' },
  { code: 'R04', label: 'November 2026', periodEnd: '2026-11-30', closes: '2026-12-04' },
  { code: 'R05', label: 'December 2026', periodEnd: '2026-12-31', closes: '2027-01-07' },
  { code: 'R06', label: 'January 2027', periodEnd: '2027-01-31', closes: '2027-02-04' },
  { code: 'R07', label: 'February 2027', periodEnd: '2027-02-28', closes: '2027-03-04' },
  { code: 'R08', label: 'March 2027', periodEnd: '2027-03-31', closes: '2027-04-06' },
  { code: 'R09', label: 'April 2027', periodEnd: '2027-04-30', closes: '2027-05-07' },
  { code: 'R10', label: 'May 2027', periodEnd: '2027-05-31', closes: '2027-06-04' },
  { code: 'R11', label: 'June 2027', periodEnd: '2027-06-30', closes: '2027-07-06' },
  { code: 'R12', label: 'July 2027', periodEnd: '2027-07-31', closes: '2027-08-05' },
  { code: 'R13', label: 'Year end (hindsight)', periodEnd: '2027-07-31', closes: '2027-09-14' },
  { code: 'R14', label: 'Final (hindsight)', periodEnd: '2027-07-31', closes: '2027-10-21' },
];

export function periodFor(code: string): ReturnPeriod | undefined {
  return RETURN_PERIODS.find((p) => p.code === code);
}
