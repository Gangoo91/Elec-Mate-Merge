import type { PageHelpContent } from '@/components/hub/PageHelp';

/** Employer Hub → Compliance (ELE-1985). */
export const COMPLIANCE_HELP: PageHelpContent = {
  id: 'employer-compliance',
  title: 'Compliance',
  what: 'One register for the documents that keep the firm trading: insurance, PAT, calibration, audits and permits, each with its renewal date. We remind you before anything lapses.',
  steps: [
    {
      title: 'Add each document',
      body: 'Tap Add document. Give it a name, a renewal date and attach the certificate if you have it.',
    },
    {
      title: 'We remind you',
      body: '30 days and 7 days before a renewal date, and again if it passes, a reminder lands in your bell and in the morning office email.',
    },
    {
      title: 'Renew it here',
      body: 'Open the document, tap Record renewal, set the new date and attach the new certificate.',
    },
    {
      title: 'Send the evidence',
      body: 'Evidence pack builds a PDF of your safety score and this register for SSIP and principal contractor questionnaires.',
    },
  ],
  tasks: [
    {
      title: 'Record a renewal',
      steps: [
        'Tap the document in the register.',
        'Tap Record renewal.',
        'Set the new renewal date, attach the new certificate and tap Save.',
      ],
      after: 'The reminders start again from the new date.',
    },
    {
      title: 'Answer a pre-qualification questionnaire',
      steps: [
        'Tap Evidence pack at the top of the page.',
        'Attach the PDF to the questionnaire, or send it to the main contractor.',
      ],
      after:
        'The score only uses records you hold. A part with no records says so; it never counts as a pass.',
    },
  ],
  notes: [
    {
      title: 'Who gets the reminders',
      body: 'The owner and every active admin. The morning email goes to the office email in Settings, on weekdays.',
    },
    {
      title: 'The safety score',
      body: 'Built in Site Safety from toolbox talks, near misses, countersigned records, COSHH reviews and RAMS. With too little on record it shows Not started, never 100.',
    },
  ],
};
