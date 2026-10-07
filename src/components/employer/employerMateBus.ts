/**
 * openEmployerMate — open Employer Mate from anywhere in the Employer Hub with
 * the page it was asked from (7 Oct 2026). Lightweight on purpose: importing
 * this does not pull in the Mate sheet, so a page header or PageHelp's
 * "Ask Mate about this page" can call it cheaply.
 *
 *   openEmployerMate({ page: 'timesheets', tab: 'Pending', summary: '12 waiting, 9 clean' })
 *
 * The mounted <EmployerMate> listens for the event, opens, shows an
 * "On: Timesheets · Pending" chip and that page's suggested questions, and
 * sends the context with every question.
 */

export interface MatePageContext {
  /** The ?section= key (e.g. 'timesheets'); defaults to the current URL's. */
  page?: string;
  /** The tab on screen, as its label ("Pending") or key. */
  tab?: string;
  /** A one or two line summary of what is on screen ("12 waiting, 9 clean"). */
  summary?: string;
  /** Records open on screen, if not already in the URL ({ job: '<uuid>' }). */
  records?: Partial<Record<MateRecordKind, string>>;
}

export interface OpenEmployerMateDetail extends MatePageContext {
  /** Prefills the composer (the user still taps send). */
  prompt?: string;
}

export const MATE_RECORD_KINDS = [
  'job',
  'member',
  'client',
  'thread',
  'request',
  'quote',
  'invoice',
  'lead',
  'incident',
  'expense',
  'review',
  'entry',
] as const;
export type MateRecordKind = (typeof MATE_RECORD_KINDS)[number];

export const OPEN_EMPLOYER_MATE_EVENT = 'employer-mate:open';

export function openEmployerMate(detail: OpenEmployerMateDetail = {}) {
  window.dispatchEvent(new CustomEvent<OpenEmployerMateDetail>(OPEN_EMPLOYER_MATE_EVENT, { detail }));
}
