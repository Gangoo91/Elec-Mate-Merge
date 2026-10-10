import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for Worker Tools (ELE-1980): the "?" on each page, the first
   visit How it works strip, the step by step guide and the "Show me" tours.
   Every step is written from the page itself; data-help targets are named
   wt-<page>.<thing> and live on the real controls.
   ========================================================================== */

export const WT_HUB_HELP: PageHelpContent = {
  id: 'worker-hub',
  title: 'Worker Tools',
  what: 'Everything from your firm in one place: your hours, jobs, sign-offs, leave, pay and messages from the office.',
  steps: [
    {
      title: 'Start with To do now',
      body: 'Anything the office needs from you shows here first: a day sent back, a new job, a pack to sign, tasks due.',
    },
    {
      title: 'Clock in from the top',
      body: 'Clock in, Request leave and your status are the three buttons at the top. Clock in takes you to Timesheets.',
    },
    {
      title: 'Find any tool below',
      body: 'Tools lists every page: timesheets, jobs, my week, tasks, sign-offs, expenses, leave, pay and more.',
    },
  ],
  tasks: [
    {
      title: 'Deal with what the office needs',
      steps: ['Look at To do now.', 'Tap an item. It opens the right page, for example the day that was sent back.'],
      tour: [{ target: 'wt-hub.todo', caption: 'Anything the office needs from you lands here. Tap one to deal with it.' }],
    },
    {
      title: 'Clock in for the day',
      steps: ['Tap Clock in at the top.', 'On Timesheets, tap Clock in, pick the job and tap Start the clock.'],
      tour: [{ target: 'wt-hub.hero', text: 'Clock', caption: 'Tap Clock in. It takes you to your timesheet.' }],
    },
    {
      title: 'Find a tool',
      steps: ['Scroll to Tools.', 'Tap the one you need. A number on a tool means something is waiting there.'],
      tour: [{ target: 'wt-hub.tools', caption: 'Every Worker Tools page is here. A number means something is waiting.' }],
    },
  ],
};

export const WT_TIMESHEET_TASKS: NonNullable<PageHelpContent['tasks']> = [
  {
    title: 'Clock in when you get to site',
    steps: [
      'Tap Clock in.',
      'Under Which job?, pick the job you are on.',
      'Tap Start the clock.',
    ],
    after:
      'Your phone’s location is taken once, when you clock in. If location is off you can still clock in; the day just shows no location.',
    tour: [
      { target: 'wt-timesheets.clock-in', caption: 'Tap Clock in.', opens: true },
      { target: 'wt-timesheets.job', caption: 'Pick the job you are on.' },
      { target: 'wt-timesheets.start', caption: 'Tap Start the clock. Location is taken once, now.' },
    ],
  },
  {
    title: 'Clock out and log your break',
    steps: [
      'Tap Clock out.',
      'Pick your break minutes. Your firm’s usual break is filled in.',
      'Tap Clock out again to finish. The day goes to the office to approve.',
    ],
    tour: [
      { target: 'wt-timesheets.clock-out', caption: 'Tap Clock out. You only see it while you are on the clock.', opens: true, optional: true },
      { target: 'wt-timesheets.break', caption: 'Pick your break minutes.', optional: true },
      { target: 'wt-timesheets.finish', caption: 'Tap Clock out to finish the day.', optional: true },
    ],
  },
  {
    title: 'Add a day you missed',
    steps: [
      'Tap Add a past day.',
      'Pick the job, then the date, start, finish and break. Add a note for the office if it helps.',
      'Tap Send … hours for approval.',
    ],
    tour: [
      { target: 'wt-timesheets.add-day', caption: 'Tap Add a past day.', opens: true },
      { target: 'wt-timesheets.day-fields', caption: 'Set the date, start, finish and break.' },
      { target: 'wt-timesheets.send-day', caption: 'Tap Send hours for approval.' },
    ],
  },
  {
    title: 'Fix a day the office sent back',
    steps: [
      'Look under Sent back by the office. The office’s reason is in red.',
      'Tap Fix.',
      'Change the times, break or job, then tap Resubmit.',
    ],
    after: 'It goes back to the office marked Resubmitted.',
    tour: [
      { target: 'wt-timesheets.sent-back', caption: 'Days sent back show here with the reason. Tap Fix.', opens: true, optional: true },
      { target: 'wt-timesheets.fix-save', caption: 'Change the times, then tap Resubmit.', optional: true },
    ],
  },
  {
    title: 'Change or delete a day still waiting',
    steps: [
      'Under Logged days, find a day still marked Waiting.',
      'Tap Change.',
      'Edit it and tap Save, or tap Delete then Tap to delete.',
    ],
    after: 'Once the office approves a day you can’t change it here. Ask the office.',
    tour: [{ target: 'wt-timesheets.logged', caption: 'Waiting days have a Change button. Approved days are locked.' }],
  },
];

export const WT_STATUS_HELP: PageHelpContent = {
  id: 'worker-status',
  title: 'My status',
  what: 'Tell the office where you are: On Site, En Route, Office or Off Duty. They see it on their live board.',
  steps: [
    { title: 'Pick a status', body: 'Tap On Site, En Route, Office or Off Duty.' },
    { title: 'Pick the job', body: 'On Site and En Route need the job you are on or heading to.' },
    { title: 'Tap Set to …', body: 'On Site and En Route share your location once, when you save. Office and Off Duty never ask for it.' },
  ],
  tasks: [
    {
      title: 'Say you’re on site or on the way',
      steps: ['Tap On Site or En Route.', 'Under Which job?, choose the job.', 'Tap Set to On Site (or Set to En Route).'],
      after: 'Your location is shared once, when you save. If location is off the save stops and tells you why.',
      tour: [
        { target: 'wt-status.options', text: 'On Site', caption: 'Tap On Site, or En Route if you are travelling.', opens: true },
        { target: 'wt-status.job', caption: 'Choose the job.', optional: true },
        { target: 'wt-status.save', caption: 'Tap Set to On Site.' },
      ],
    },
    {
      title: 'Finish for the day',
      steps: ['Tap Off Duty.', 'Tap Set to Off Duty. No location is asked for.'],
      after: 'Clocking in or out on Timesheets changes your status too.',
      tour: [
        { target: 'wt-status.options', text: 'Off Duty', caption: 'Tap Off Duty.', opens: true },
        { target: 'wt-status.save', caption: 'Tap Set to Off Duty.' },
      ],
    },
  ],
  notes: [
    { title: 'Who else sets it', body: 'The office can set your status, and clocking in or out sets it. You get a message on screen when that happens.' },
  ],
};

export const WT_PAY_HELP: PageHelpContent = {
  id: 'worker-pay',
  title: 'My pay',
  what: 'What your approved hours and expenses add up to, and when payday is. It is an estimate before tax, not a payslip.',
  steps: [
    { title: 'Pick the pay period', body: 'This pay period or Last pay period. If your firm has no payday set, you see this week or this month instead.' },
    { title: 'Read the figure', body: 'Approved hours at the rate the office has for you, with overtime. Hours waiting for approval are not counted yet.' },
    { title: 'Check it went to payroll', body: 'Sent to payroll shows when the office sent your hours. Expenses to be repaid shows approved claims.' },
  ],
  tasks: [
    {
      title: 'See what you’ve earned this period',
      steps: ['Tap This pay period (or Last pay period).', 'Read the big figure and the payday under it.', 'Approved, Awaiting approval and Expenses to be repaid sit underneath.'],
      tour: [
        { target: 'wt-pay.period', caption: 'Pick this pay period or the last one.' },
        { target: 'wt-pay.stats', caption: 'Approved hours, hours still waiting, and expenses owed to you.' },
      ],
    },
    {
      title: 'Check your hours went to payroll',
      steps: ['Look at Sent to payroll.', 'It lists each batch of your hours the office sent, and the date.', 'Approved days not sent yet go in the next one.'],
      tour: [{ target: 'wt-pay.payroll', caption: 'This shows when the office sent your hours to payroll.' }],
    },
  ],
  notes: [
    { title: 'Your rate', body: 'The rate badge at the top is what the office has on your record. If it says Rate not set, you see hours only. Ask the office.' },
  ],
};

export const WT_LEAVE_HELP: PageHelpContent = {
  id: 'worker-leave',
  title: 'Leave',
  what: 'Book time off, see how much holiday you have left, and follow each request.',
  steps: [
    { title: 'Tap Request', body: 'Pick the type: annual, sick, unpaid, compassionate or training.' },
    { title: 'Pick the dates', body: 'Or a half day. You see how many days it uses and if anyone else is off.' },
    { title: 'Submit it', body: 'The office approves or declines. If they decline, their reason shows on the request.' },
  ],
  tasks: [
    {
      title: 'Book time off',
      steps: [
        'Tap Request (Request Leave on a computer).',
        'Pick the leave type.',
        'Set the start and end dates, or turn on Half Day and pick morning or afternoon.',
        'Check the days it uses and whether others are off. Add a reason if you like.',
        'Tap Submit Request.',
      ],
      after: 'It shows as Pending until the office decides.',
      tour: [
        { target: 'wt-leave.request', caption: 'Tap Request.', opens: true },
        { target: 'wt-leave.types', caption: 'Pick the leave type.', opens: true },
        { target: 'wt-leave.dates', caption: 'Set your dates, or a half day.' },
        { target: 'wt-leave.submit', caption: 'Check the days, then tap Submit Request.' },
      ],
    },
    {
      title: 'Withdraw a request or cancel leave',
      steps: [
        'Find it under Your Requests.',
        'Tap Withdraw request (still pending) or Cancel leave (approved, not started yet).',
        'Tap Yes to confirm, or Keep it.',
      ],
      after: 'If you cancel approved leave, the office is told.',
      tour: [{ target: 'wt-leave.cancel', caption: 'Tap Withdraw request or Cancel leave, then confirm.', optional: true }],
    },
    {
      title: 'See why a request was declined',
      steps: ['Tap the Declined tab.', 'The office’s reason shows under the request.'],
      tour: [{ target: 'wt-leave.tabs', text: 'Declined', caption: 'Tap Declined to see the office’s reason.' }],
    },
  ],
};

export const WT_COMMS_HELP: PageHelpContent = {
  id: 'worker-comms',
  title: 'Team comms',
  what: 'Messages from the office. Read them, reply with a question, and acknowledge the ones that ask you to.',
  steps: [
    { title: 'Open a message', body: 'Unread ones are marked. To acknowledge shows the ones the office needs you to confirm.' },
    { title: 'Acknowledge if asked', body: 'Messages marked Please acknowledge have an Acknowledge button. The office sees when you did.' },
    { title: 'Reply if unsure', body: 'Type in Reply to the office. Your reply goes to the office only.' },
  ],
  tasks: [
    {
      title: 'Read and acknowledge a message',
      steps: ['Tap To acknowledge.', 'Tap the message to open it.', 'Read it, then tap Acknowledge.'],
      after: 'You see You acknowledged at … and the office can see it.',
      tour: [
        { target: 'wt-comms.filters', text: 'To acknowledge', caption: 'Tap To acknowledge.', opens: true },
        { target: 'wt-comms.list', caption: 'Tap a message to open it.' },
        { target: 'wt-comms.thread', text: 'Acknowledge', caption: 'Read it, then tap Acknowledge.', optional: true },
      ],
    },
    {
      title: 'Reply to the office',
      steps: ['Open the message.', 'Type in Reply to the office at the bottom. You can attach a photo or PDF.', 'Send it.'],
      tour: [
        { target: 'wt-comms.list', caption: 'Tap a message to open it.' },
        { target: 'wt-comms.thread', caption: 'Type your reply at the bottom and send it.', optional: true },
      ],
    },
    {
      title: 'Chat with the team',
      steps: ['Tap Team chat.', 'Pick a channel or a direct message.'],
      tour: [{ target: 'wt-comms.chat', caption: 'Team chat has your channels and direct messages.' }],
    },
  ],
};

export const WT_JOBS_HELP: PageHelpContent = {
  id: 'worker-jobs',
  title: 'My jobs',
  what: 'Every job the office has put you on, with the site contact, access notes, drawings, packs to sign and who else is on it.',
  steps: [
    { title: 'Open a job', body: 'New from the office is at the top. Tap a job for directions, the contact and the office’s notes.' },
    { title: 'Work the job', body: 'Clock in, see your tasks, add a progress note or report an issue from On this job.' },
    { title: 'Finish your part', body: 'Tap I’ve finished my part. The office gets told, and when everyone is done the job moves to Testing.' },
  ],
  tasks: [
    {
      title: 'Open a job and get there',
      steps: ['Tap the job.', 'Tap Directions for the map.', 'Read Getting in, From the office and About the job.'],
      tour: [
        { target: 'wt-jobs.filter', caption: 'On my list shows jobs you’re on now. Finished shows the rest.' },
        { target: 'wt-jobs.list', caption: 'Tap a job to open it.' },
      ],
    },
    {
      title: 'Tell the office you’ve finished your part',
      steps: [
        'Open the job.',
        'Tap I’ve finished my part.',
        'Say what’s done and anything left, and add photos if you like.',
        'Tap Tell the office.',
      ],
      after: 'The office gets a notification. If you’re the last one on it, the job moves to Testing. Changed your mind? Tap Not finished after all.',
      tour: [
        { target: 'wt-jobs.list', caption: 'Tap the job first.', optional: true },
        { target: 'wt-jobs.finish', caption: 'Tap I’ve finished my part.', opens: true, optional: true },
        { target: 'wt-jobs.finish-send', caption: 'Add a note and photos, then tap Tell the office.', optional: true },
      ],
    },
    {
      title: 'Clock in, tasks, notes or a problem on this job',
      steps: ['Open the job.', 'Under On this job tap Clock in, My tasks, Progress note or Report an issue.'],
      tour: [
        { target: 'wt-jobs.list', caption: 'Tap the job first.', optional: true },
        { target: 'wt-jobs.actions', caption: 'Everything for this job: clock in, tasks, notes and issues.' },
      ],
    },
    {
      title: 'See who else is on site today',
      steps: [
        'Open a job that is on today.',
        'Read Crew on site: who is on the job and who has clocked in.',
        'The small map shows the job and anyone clocked in on it.',
      ],
      after: 'You only see people on the same job, today, while they are clocked in on it. They see you the same way. Off the clock nobody’s position is shown.',
      tour: [
        { target: 'wt-jobs.list', caption: 'Tap the job first.', optional: true },
        { target: 'wt-jobs.crew', caption: 'Who is on this job today, and where while they are clocked in.', optional: true },
      ],
    },
  ],
};

export const WT_WEEK_HELP: PageHelpContent = {
  id: 'worker-week',
  title: 'My week',
  what: 'Where you are booked each day, straight from the office’s diary, with drive times and who moved what.',
  steps: [
    { title: 'Pick the week', body: 'Use the arrows. Back to this week brings you home.' },
    { title: 'Read each day', body: 'Job, client, time and the drive from the yard or the last job. Leave shows as a striped day.' },
    { title: 'Spot changes', body: 'Latest changes and the Moved by tag show who changed your bookings and when.' },
  ],
  tasks: [
    {
      title: 'See next week',
      steps: ['Tap the right arrow.', 'Tap Back to this week to come back.'],
      tour: [{ target: 'wt-week.nav', caption: 'Use the arrows to move a week at a time.' }],
    },
    {
      title: 'Open a job or get directions',
      steps: ['Tap a booking to open the job.', 'Tap Directions to … for the map.'],
      tour: [{ target: 'wt-week.days', caption: 'Tap a booking to open the job, or Directions for the map.' }],
    },
    {
      title: 'Check what the office changed',
      steps: ['Read Latest changes at the top.', 'A Moved by or Booked by tag on a job shows a change in the last week.'],
      tour: [{ target: 'wt-week.changes', caption: 'Who moved or booked what, and when.', optional: true }],
    },
  ],
};

export const WT_TASKS_HELP: PageHelpContent = {
  id: 'worker-tasks',
  title: 'My tasks',
  what: 'Jobs within the job: what the office has given you, grouped by job. The office sees each change straight away.',
  steps: [
    { title: 'Start one', body: 'Tap Start when you pick a task up.' },
    { title: 'Mark it done', body: 'Tap Done when it is finished. Blocked? Open it and tap Blocked.' },
    { title: 'Add updates', body: 'Open a task to add a photo or write an update for the office.' },
  ],
  tasks: [
    {
      title: 'Start and finish a task',
      steps: ['On To do, tap Start on the task.', 'When it’s finished, tap Done.'],
      tour: [
        { target: 'wt-tasks.filter', caption: 'To do shows what’s left. Done shows what you’ve finished.' },
        { target: 'wt-tasks.list', caption: 'Tap Start when you pick one up, then Done when it’s finished.' },
      ],
    },
    {
      title: 'Say a task is blocked',
      steps: ['Tap the task to open it.', 'Under Update status, tap Blocked.', 'Write why in the update box and send it.'],
      tour: [
        { target: 'wt-tasks.list', caption: 'Tap a task to open it.', optional: true },
        { target: 'wt-tasks.status', caption: 'Tap Blocked, then write why below.', optional: true },
      ],
    },
    {
      title: 'Add a photo or an update',
      steps: ['Open the task.', 'Tap Add photo, or type in the update box and tap send.'],
      tour: [
        { target: 'wt-tasks.list', caption: 'Tap a task to open it.', optional: true },
        { target: 'wt-tasks.status', caption: 'Photos and updates are below the status buttons.', optional: true },
      ],
    },
    {
      title: 'Pick up a spare task',
      steps: ['Look at Up for grabs on your jobs.', 'Tap I’ll take it.'],
      tour: [{ target: 'wt-tasks.grabs', caption: 'Tap I’ll take it to make a spare task yours.', optional: true }],
    },
  ],
};

export const WT_SIGNOFFS_HELP: PageHelpContent = {
  id: 'worker-signoffs',
  title: 'Sign-offs',
  what: 'Job packs (RAMS, method statements, briefings) the office needs you to read and sign before you start.',
  steps: [
    { title: 'Open a pack', body: 'Waiting for your signature is at the top.' },
    { title: 'Read it', body: 'Scope of works, required credentials, the briefing and documents.' },
    { title: 'Sign it', body: 'Draw your signature and tap Sign and confirm. The office is notified.' },
  ],
  tasks: [
    {
      title: 'Read and sign a pack',
      steps: [
        'Tap To sign.',
        'Tap the pack.',
        'Read the scope, credentials, briefing and documents.',
        'Draw your signature in Your signature.',
        'Tap Sign and confirm.',
      ],
      after: 'By signing you confirm you have read and understood it. The office is notified.',
      tour: [
        { target: 'wt-signoffs.tabs', text: 'To sign', caption: 'Tap To sign.', opens: true },
        { target: 'wt-signoffs.list', caption: 'Tap the pack to read it.', opens: true },
        { target: 'wt-signoffs.signature', caption: 'Draw your signature here.', optional: true },
        { target: 'wt-signoffs.sign', caption: 'Tap Sign and confirm.', optional: true },
      ],
    },
    {
      title: 'Check what you signed',
      steps: ['Tap Signed.', 'Tap a pack. The signature record shows who signed and when.'],
      tour: [{ target: 'wt-signoffs.tabs', text: 'Signed', caption: 'Tap Signed to see your signed packs.', opens: true }],
    },
  ],
};
