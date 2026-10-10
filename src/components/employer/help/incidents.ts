import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for Incidents (ELE-1980, ELE-2031). Every step names the real
   control on the page; data-help targets live on those controls.
   ========================================================================== */

export const INCIDENTS_HELP: PageHelpContent = {
  id: 'employer-incidents',
  title: 'Incidents',
  what: 'Every near miss, incident and injury reported on your jobs, in one list. Your team reports from site in Worker Tools or the Site Safety tools; the office can log one here. You see each report, decide on RIDDOR, find the cause, set actions and close it.',
  steps: [
    {
      title: 'Reports arrive on their own',
      body: 'When someone on a job reports a near miss or an injury, you get a bell and it appears under New. Opening it tells them the office has seen it.',
    },
    {
      title: 'Decide on RIDDOR first',
      body: 'For an injury or a dangerous occurrence, record whether the HSE must be told. The page shows the deadline and builds the RIDDOR report for you.',
    },
    {
      title: 'Find the cause and fix it',
      body: 'Write the root cause, then add actions with an owner and a date. Owners on the app are told and can tick them off from site.',
    },
    {
      title: 'Close it with what was done',
      body: 'The person who reported it is sent your close-out summary.',
    },
  ],
  tasks: [
    {
      title: 'Log a report from the office',
      steps: [
        'Tap Report incident.',
        'Pick what kind it was. Choose Injury if anyone was hurt: it goes in the accident book.',
        'Say what happened, where and when, and add photos.',
        'Tap Log report.',
      ],
      tour: [
        { target: 'incidents.report', caption: 'Tap Report incident.', opens: true },
        { target: 'incidents.form-type', caption: 'Pick what kind it was first.' },
      ],
    },
    {
      title: 'Work through a report from the team',
      steps: [
        'Tap the report under New.',
        'Record the RIDDOR decision if it is an injury.',
        'Write the root cause and add actions with owners.',
        'Countersign it to show the firm has checked it.',
        'Write what was done and tap Close report.',
      ],
      who: 'A report your team made stays theirs. You add the follow-up and countersign it; you cannot change what they wrote.',
      tour: [
        { target: 'incidents.tabs', caption: 'New shows what nobody in the office has opened yet.' },
        { target: 'incidents.list', caption: 'Tap a report to open it.', optional: true },
      ],
    },
  ],
  notes: [
    {
      title: 'Where reports are kept',
      body: 'Incidents are Site Safety records: near misses in the near-miss register, injuries in the accident book. The same records open from Site Safety in this hub and in the Electrical Hub.',
    },
    {
      title: 'Who sees them',
      body: 'Only the firm’s owner and managers. Crew never see incident reports, because they name the injured person. A worker sees their own reports and what the office did.',
    },
  ],
  source:
    'RIDDOR 2013: deaths and specified injuries are reported without delay, over-seven-day injuries within 15 days.',
};
