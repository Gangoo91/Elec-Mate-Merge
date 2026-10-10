import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for the firm's safety documents (ELE-1940, ELE-1941). Button
   labels are the real ones. Tours point at data-help="<page>.<target>".
   ========================================================================== */

export const SAFETY_DOCS_HELP: PageHelpContent = {
  id: 'employer-safety-docs',
  title: 'Safety documents',
  what: 'One run gives a job its RAMS and its method statement, filled in with your company, the supervisor and a first-aider from your team. Every run is saved to the job.',
  steps: [
    {
      title: 'Pick the job',
      body: 'The site, client and dates come from the job. Contractor, supervisor, first-aider and site contact come from your team and their certificates.',
    },
    {
      title: 'Generate',
      body: 'Tap Generate, check the details and the description, then generate. If the same brief was run for this job before, you are offered that one instead of running it again.',
    },
    {
      title: 'Check and issue',
      body: 'Open the run, check every hazard and step, then issue the PDF. It goes into the job pack for the crew to sign.',
    },
  ],
  tasks: [
    {
      title: 'Make the safety documents for a job',
      steps: [
        'Pick the job under The job.',
        'Check Filled in for you. Fix anything missing in Team or Settings, or change it on the next screen.',
        'Tap Generate.',
        'When it is ready, check it and download the full RAMS to issue it.',
      ],
      tour: [
        { target: 'safetydocs.job', caption: 'Pick the job first.' },
        { target: 'safetydocs.people', caption: 'These names go on the documents.' },
        { target: 'safetydocs.start', caption: 'Then tap Generate.' },
      ],
    },
  ],
  notes: [
    {
      title: 'Where a first-aider comes from',
      body: 'Someone on the job’s crew with an in-date first aid certificate on their record. With nobody, the field is left for you to fill in.',
    },
    {
      title: 'Writing one yourself',
      body: 'Write by hand opens the method statement builder. A RAMS typed in RAMS is on the same register.',
    },
  ],
};

export const RAMS_REGISTER_HELP: PageHelpContent = {
  id: 'employer-rams-register',
  title: 'RAMS register',
  what: 'Every RAMS the firm has, in one list: written by hand, generated with AI, or attached to a job pack. Each with its job, status and a PDF.',
  steps: [
    {
      title: 'Find one',
      body: 'Filter by job or status, or search by name, site or assessor.',
    },
    {
      title: 'Open it',
      body: 'Read the hazards, change the status, countersign a worker’s RAMS, or download the PDF.',
    },
    {
      title: 'Bring older ones in',
      body: 'RAMS you wrote before the firm had a register are still your own. Move to firm files them here. Move back undoes it.',
    },
  ],
  notes: [
    {
      title: 'What is never moved',
      body: 'Only RAMS you made yourself can be moved, and only when you ask. A worker’s own RAMS stay theirs; one they file against a firm job shows here to read and countersign.',
    },
    {
      title: 'Not issued',
      body: 'An AI run that has not been issued yet. Open it to check and issue the PDF.',
    },
  ],
};
