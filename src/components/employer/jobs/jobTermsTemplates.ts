/**
 * ELE-1982. Plain-English clauses a firm can add to one job's customer terms,
 * mostly for commercial work under a main contractor. They are starting points
 * the firm reads and edits: not a JCT contract, and not legal advice. Keep the
 * wording plain and free of legal claims.
 */
export interface JobTermsTemplate {
  key: string;
  title: string;
  text: string;
}

export const JOB_TERMS_TEMPLATES: JobTermsTemplate[] = [
  {
    key: 'variations',
    title: 'Variations',
    text: 'Variations: any change to the agreed work must be instructed in writing. We will price it before we carry it out.',
  },
  {
    key: 'stage_payments',
    title: 'Stage payments',
    text: 'Stage payments: we will invoice monthly for work done and materials delivered to site. Each invoice is due within the payment period shown on the quote.',
  },
  {
    key: 'retention',
    title: 'Retention',
    text: 'Retention: if retention is held, it will not be more than the percentage shown on the quote. Half is released at practical completion and the rest at the end of the defects period.',
  },
  {
    key: 'defects',
    title: 'Defects period',
    text: 'Defects period: we will put right any defects in our work that are reported to us within 12 months of completion, at no cost to you.',
  },
  {
    key: 'programme',
    title: 'Programme and delays',
    text: 'Programme: our dates depend on access to the work areas and on other trades finishing on time. If we are delayed by things outside our control, our dates move by the same amount.',
  },
  {
    key: 'site_welfare',
    title: 'Site access and welfare',
    text: 'Site access: the main contractor provides safe access, welfare facilities, secure storage and power for our tools.',
  },
  {
    key: 'design',
    title: 'Design responsibility',
    text: 'Design: we install to the drawings and specification provided. We are not responsible for the design unless the quote says so.',
  },
  {
    key: 'dayworks',
    title: 'Dayworks',
    text: 'Dayworks: extra work that cannot be priced in advance is charged at the labour rates and material costs on the quote, recorded on signed daywork sheets.',
  },
  {
    key: 'completion',
    title: 'Completion',
    text: 'Completion: the work is complete when it is installed, tested and certified. Small snagging items that do not stop use are put right afterwards.',
  },
  {
    key: 'late_payment',
    title: 'Late payment',
    text: 'Late payment: if a payment is not made by its due date, we may stop work until it is paid, after telling you in writing 7 days before.',
  },
];
