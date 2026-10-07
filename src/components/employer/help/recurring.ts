import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for Recurring work (ELE-1821): repeat visits made from a job,
   and certificate renewals from the re-test date on each certificate.
   ========================================================================== */

export const RECURRING_HELP: PageHelpContent = {
  id: 'employer-recurring',
  title: 'Recurring work',
  what: 'Work that comes round again: maintenance visits, PAT rounds, emergency lighting tests, and the re-test date on every certificate. Elec-Mate books the next visit for you, so nothing lives on a spreadsheet.',
  steps: [
    { title: 'Make a job recurring', body: 'Open any job and tap Make this recurring. Pick how often and when the next visit is.' },
    { title: 'The next visit books itself', body: 'Before each visit is due, a new job is put in the diary for that date, with the same crew if you asked. You get a bell.' },
    { title: 'Renewals come from certificates', body: 'Every certificate with a re-test date (EICR, EIC, emergency lighting, fire alarm and more) that the firm issues, or signs off in QS review, shows here when it is due. Book it as a job in one tap.' },
  ],
  tasks: [
    {
      title: 'Make a job recurring',
      steps: [
        'Open the job (Jobs, then tap it).',
        'Tap Make this recurring.',
        'Pick how often: every 3 months, every year, and so on.',
        'Set the date of the next visit and how many days ahead to book it.',
        'Leave Same crew next time on to send the same people.',
        'Tap Make it recurring.',
      ],
      who: 'Owner, admins and office managers. Only the owner and admins set a price or draft invoices.',
      after: 'It appears under Repeat visits. The next visit is booked as a job before it is due and you get a bell.',
    },
    {
      title: 'Book a certificate renewal',
      steps: [
        'Open the Renewals tab.',
        'Find the certificate. Overdue ones are at the top.',
        'Tap Book as a job to put the re-test in the diary, or Book and repeat to keep it coming at the same interval.',
      ],
      after: 'The job opens in the diary two weeks before the re-test is due, unassigned until you add the crew.',
      tour: [{ target: 'recurring.tabs', caption: 'Switch between Repeat visits and Renewals here.' }],
    },
    {
      title: 'Pause or stop a repeat visit',
      steps: ['Open Repeat visits.', 'Tap the visit.', 'Tap Pause, Resume or End.'],
      after: 'A paused visit is not booked until you resume it. Resuming never books the visits you missed while it was paused.',
    },
  ],
  notes: [
    {
      title: 'What the crew sees',
      body: 'On each repeat visit, Worker Tools shows a Last visit card: who went, their notes, and the snags they found.',
    },
    {
      title: 'Which certificates count',
      body: 'Certificates issued on the firm account, and any a team member sent through your QS review and you approved.',
    },
  ],
};
