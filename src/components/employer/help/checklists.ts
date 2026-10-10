import type { PageHelpContent } from '@/components/hub/PageHelp';

/* In-app help for Employer Hub → Safety → Checklists (ELE-1826). Button names
   match the screen. */

export const CHECKLISTS_HELP: PageHelpContent = {
  id: 'employer-checklists',
  title: 'Checklists',
  what: 'Set what the crew must tick, photograph and sign before they start a job and when they finish. Nobody can clock themselves in to a job until their required before-start checks are done, including signing the RAMS.',
  steps: [
    {
      title: 'Pick or build a checklist',
      body: 'Start from the Library (safe isolation, DB change, EICR visit, EV charger, PAT round) or tap New checklist.',
    },
    {
      title: 'Put it on jobs',
      body: 'Tap Attach to a job, or set the checklist to go on every new job or on jobs with a label.',
    },
    {
      title: 'Watch it fill in',
      body: 'The Jobs tab shows what is missing on each live job. Open one for the photos, signatures and a PDF for the client or the HSE.',
    },
  ],
  tasks: [
    {
      title: 'Use a ready-made checklist',
      steps: [
        'Open the Library tab.',
        'Tap Add to my checklists on the one you want.',
        'It appears under Checklists, ready to edit or attach.',
      ],
      tour: [{ target: 'checklists.tabs', text: 'Library', caption: 'Tap Library for the five ready-made checklists.' }],
    },
    {
      title: 'Build your own',
      steps: [
        'Tap New checklist.',
        'Give it a name and say what kind of job it is for.',
        'Add items under Before start and On completion. Pick the type: tick, photo, signature, number, yes/no or RAMS signed.',
        'Leave Required on for anything that must be done. Turn on Supervisor countersigns for apprentices where you need it.',
        'Choose when it goes on jobs automatically, then tap Save checklist.',
      ],
      tour: [{ target: 'checklists.new', caption: 'Tap New checklist to start.', opens: true }],
    },
    {
      title: 'Put a checklist on a job',
      steps: [
        'Tap Attach to a job.',
        'Pick the job and the checklist, then tap Attach.',
      ],
      after: 'The crew already on the job get a notification. The checks are the first thing on their job page.',
    },
    {
      title: 'Prove the checks were done',
      steps: [
        'In the Jobs tab, tap the job.',
        'Each person’s before-start checks and the job’s completion checks show who did them, when and where, with the photos and signatures.',
        'Tap Download PDF for the client file or an HSE visit.',
      ],
    },
  ],
  notes: [
    {
      title: 'Before start and On completion',
      body: 'Before-start checks are done by each person on the crew. On-completion checks are done once for the whole job, usually ending with the customer’s signature.',
    },
    {
      title: 'Changing a checklist',
      body: 'A job keeps the version it was given. Editing a checklist changes it for jobs it goes on from now, not ones already under way.',
    },
    {
      title: 'RAMS signed',
      body: 'This item reads the job pack sign-offs. If a pack was sent to the person for this job and they have not signed it, they cannot clock in.',
    },
    {
      title: 'The office clocking someone in',
      body: 'Only a worker clocking themselves in is held back. The office can still clock a person in from Timesheets.',
    },
  ],
};
