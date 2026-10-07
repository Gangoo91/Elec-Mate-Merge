/**
 * Job types for the Employer Hub (ELE-1824). Stored as text on
 * employer_jobs.job_type; drives margin by job type on Reports and the
 * "your last five of these took …" hours history when quoting.
 * Keep the wording stable — history groups on the exact text.
 */
export const JOB_TYPES = [
  'EICR / testing',
  'Consumer unit',
  'Rewire',
  'New installation',
  'Alteration / extension',
  'Fault finding',
  'EV charger',
  'Solar PV / battery',
  'Fire alarm / emergency lighting',
  'Maintenance / PPM',
  'Commercial fit-out',
  'Other',
] as const;

export const JOB_TYPE_OPTIONS = [
  { value: '', label: 'Not set' },
  ...JOB_TYPES.map((t) => ({ value: t, label: t })),
];
