import type { PageHelpContent } from '@/components/hub/PageHelp';

/* In-app help for Employer Hub → Jobs (ELE-1980). Every step is written from
   the screens themselves: button names match what is on screen. */

export const JOBS_HELP: PageHelpContent = {
  id: 'employer-jobs',
  title: 'Jobs',
  what: 'Every job the firm is running, with who is on it and where it is up to. Open a job to book people, change its status or get directions.',
  steps: [
    {
      title: 'Add the job',
      body: 'Tap New job. Three short steps: the job, the site and dates, then the scope.',
    },
    {
      title: 'Put people on it',
      body: 'Open the job and tap Assign. Pick the people, set the dates, and they get a push.',
    },
    {
      title: 'Keep the status right',
      body: 'Tap Edit job to move it between Active, Pending, On hold, Completed or Cancelled.',
    },
  ],
  tasks: [
    {
      title: 'Add a new job',
      steps: [
        'Tap New job.',
        'Job: type the job title and the client, and pick a status.',
        'Site & dates: type the site address (used for directions and the live map), then the start and end dates.',
        'Scope: say what is being done. Add the job value and people needed if you know them.',
        'Tap Create job. It opens straight away so you can book people.',
      ],
      after: 'Close it half way and it offers to keep a draft. Resume it from the chip at the top of the list.',
      tour: [
        { target: 'jobs.new', caption: 'Tap New job to start.', opens: true },
        { target: 'jobs.new-steps', caption: 'Three steps: Job, Site & dates, Scope. Tap a step or use Next.' },
      ],
    },
    {
      title: 'Put people on a job',
      steps: [
        'Tap the job in the list to open it.',
        'Under Assigned workers, tap Assign.',
        'Tick the people. Anyone already booked elsewhere on those dates shows a clash warning.',
        'Tap Continue to assignment, check the dates and notes, then tap Assign.',
      ],
      after:
        'Each person gets a push. Leave Send email notification ticked to email them the job details and a calendar invite too.',
      tour: [
        { target: 'jobs.list', caption: 'Tap a job to open it.', opens: true },
        { target: 'jobs.assign', caption: 'Tap Assign to pick who is on it.' },
      ],
    },
    {
      title: 'Change a job’s status',
      steps: [
        'Open the job.',
        'Tap Edit job.',
        'Under Status & value, pick the new status.',
        'Tap Save changes. The change is written to the job’s activity.',
      ],
      tour: [
        { target: 'jobs.list', caption: 'Tap a job to open it.', opens: true },
        { target: 'jobs.edit', caption: 'Tap Edit job, pick the status, then Save changes.' },
      ],
    },
    {
      title: 'Find a job',
      steps: [
        'Use the tabs: All, Active, Pending, On hold, Completed.',
        'Search by title, client or location.',
        'The filter button narrows by status and job value.',
      ],
      tour: [{ target: 'jobs.tabs', caption: 'Pick a tab or search by title, client or location.' }],
    },
  ],
  notes: [
    {
      title: 'Who sees money',
      body: 'Job values only show for people allowed to see the firm’s money. Office managers see the jobs without the value.',
    },
    {
      title: 'Flags on a job',
      body: 'Red and amber pills on a row mean an incident, an overdue invoice, a certificate running out or money still due.',
    },
  ],
};

export const DIARY_HELP: PageHelpContent = {
  id: 'employer-diary',
  title: 'The diary',
  what: 'Who is where this week. Book people onto jobs, move bookings, and the team gets one push with their changes.',
  steps: [
    {
      title: 'See the week',
      body: 'On a computer, days run across and people down. On a phone, tap a day in the strip to see it.',
    },
    {
      title: 'Book or move',
      body: 'Tap a job, a person or a booking. Pick who, when and how long, then tap Book or Save.',
    },
    {
      title: 'The team is told',
      body: 'Each person gets one push about a minute after your last change, or tap Send now.',
    },
  ],
  tasks: [
    {
      title: 'Book someone on a job',
      steps: [
        'Phone: tap the day in the strip, then tap Book next to the person, or tap a job under Nobody booked.',
        'Computer: hover the person’s day and click the plus, or click a job in the Nobody booked row.',
        'Pick the job if it asks. Who: pick the person. When: pick the start day. Time on site: Full day, 2h, 4h or 6h.',
        'Tap Book.',
      ],
      after:
        'They get a push. Tick Email them the job details too if you want an email as well. If they are not on the app yet, tell them yourself. A clash shows in red before you book.',
      tour: [
        { target: 'diary.days', caption: 'Tap the day you want.', optional: true },
        { target: 'diary.book-person', caption: 'Tap Book next to the person.', opens: true, optional: true },
        { target: 'diary.cell-book', caption: 'Hover the person’s day and click the plus.', opens: true, optional: true },
        { target: 'diary.job-pick', caption: 'Tap the job they are going to.', optional: true },
        { target: 'diary.who', caption: 'Check who is going. A clash shows in red.' },
        { target: 'diary.when', caption: 'Pick the day. Use Week after to go further on.' },
        { target: 'diary.save', caption: 'Tap Book when it looks right.' },
      ],
    },
    {
      title: 'Drag a job onto someone (computer)',
      steps: [
        'Find the job in the Nobody booked row, or under To schedule.',
        'Drag it onto the person and the day.',
        'If it clashes with another job or their leave, you get a warning with an Undo.',
      ],
      tour: [
        { target: 'diary.nobody', caption: 'Jobs with nobody on them sit here. Drag one onto a person.', optional: true },
        { target: 'diary.grid', caption: 'Drop it on the person and the day. Red means double-booked or on leave.', optional: true },
      ],
    },
    {
      title: 'Move a booking',
      steps: [
        'Phone: tap the day, then tap the booking under the person.',
        'Computer: drag the booking to another day or person, or click it.',
        'Change Who to give it to someone else, or pick a new day under When, then tap Save.',
        'To take them off the job, tap Take off, then Yes, take off.',
      ],
      after: 'They are told in the next push, about a minute after your last change.',
      tour: [
        { target: 'diary.days', caption: 'Tap the day the booking is on.', optional: true },
        { target: 'diary.booking', caption: 'Tap the booking to open it.', opens: true },
        { target: 'diary.when', caption: 'Pick the new day, or change Who above.' },
        { target: 'diary.save', caption: 'Tap Save. They are told in the next push.' },
      ],
    },
    {
      title: 'Copy last week',
      steps: [
        'Go to the week you are planning.',
        'Tap Copy last week.',
        'Check the list: anyone still on a job at the end of last week stays on it to Friday. Finished, cancelled and on-hold jobs are left alone.',
        'Tap Copy … bookings.',
      ],
      after: 'Everyone affected gets one push in about a minute.',
      tour: [{ target: 'diary.copy', caption: 'Tap Copy last week to see what would carry over.', opens: true }],
    },
    {
      title: 'Send the changes now',
      steps: [
        'After a change, a bar shows how many changes are not sent yet.',
        'Tap Send now to push them straight away instead of waiting a minute.',
      ],
      tour: [{ target: 'diary.send', caption: 'Tap Send now to tell the team straight away.' }],
    },
  ],
  notes: [
    {
      title: 'Red means a clash',
      body: 'A person shows red when they are double-booked, booked over a working day, or booked on leave.',
    },
    {
      title: 'Same dates everywhere',
      body: 'The Timeline and the Job board read the same bookings, so a move here shows there too.',
    },
  ],
};

export const JOB_BOARD_HELP: PageHelpContent = {
  id: 'employer-jobboard',
  title: 'The job board',
  what: 'Every job from enquiry to complete, as cards in columns. Move a card when the job moves on.',
  steps: [
    {
      title: 'Read the columns',
      body: 'Enquiry, Quoted, Confirmed, Scheduled, In progress, Testing, Complete and On hold.',
    },
    {
      title: 'Move a card',
      body: 'On a computer, drag it. On a phone, press and hold it, then tap the new stage.',
    },
    {
      title: 'Open a job',
      body: 'Tap a card to open the job, book people and change the details.',
    },
  ],
  tasks: [
    {
      title: 'Move a job to the next stage',
      steps: [
        'Computer: drag the card into the new column, or right-click it and pick Move to….',
        'Phone: swipe to the column, press and hold the card, then tap the stage.',
      ],
      after: 'The status and progress update to match, and the timeline and diary follow.',
      tour: [{ target: 'jobboard.board', caption: 'Drag a card, or press and hold it on a phone, to move it.' }],
    },
    {
      title: 'Add a job straight onto the board',
      steps: [
        'Tap Add job at the bottom of the column.',
        'Computer: type the job title and client, then tap Add job.',
        'Phone: type the title and tap Add. The client and site show TBC until you fill them in.',
      ],
      tour: [{ target: 'jobboard.add', caption: 'Tap Add job under a column.' }],
    },
    {
      title: 'Start from a template',
      steps: [
        'Tap Templates.',
        'Pick one and tap Use.',
        'To make one, right-click a card on a computer and pick Save as template.',
      ],
      tour: [{ target: 'jobboard.templates', caption: 'Tap Templates to start a job from one.', opens: true }],
    },
    {
      title: 'Archive a finished job',
      steps: [
        'Computer: right-click the card and pick Archive.',
        'Phone: press and hold the card and tap Archive Job.',
        'Tap Archived at the top to find it again.',
      ],
      tour: [{ target: 'jobboard.archived', caption: 'Archived jobs live here.' }],
    },
  ],
  notes: [
    {
      title: 'Filters',
      body: 'Use Filters to hide completed jobs, and the two view buttons to switch between the board and a list.',
    },
  ],
};

export const TIMELINE_HELP: PageHelpContent = {
  id: 'employer-timeline',
  title: 'The timeline',
  what: 'Every booked job as a bar across the week, month or quarter. Change a job’s dates here and everyone on it moves too.',
  steps: [
    { title: 'Pick a range', body: 'Week, Month or Quarter. Use Prev, Today and Next to step through.' },
    {
      title: 'Change the dates',
      body: 'On a computer, drag a bar or its right edge. On a phone, tap the job.',
    },
    {
      title: 'The crew moves too',
      body: 'Everyone booked slides with the job and gets one push about it.',
    },
  ],
  tasks: [
    {
      title: 'Move a job or change its dates',
      steps: [
        'Phone: tap the job in the list. Use −1 wk, −1 day, +1 day or +1 wk, or set Starts and Ends, then tap Save dates.',
        'Computer: drag the bar left or right to move it, or drag its right edge to make it run longer or shorter.',
        'Computer, by keyboard: select the bar, press Enter and set the dates in the sheet.',
      ],
      after: 'Everyone booked on it slides with it and gets one push. The Diary shows the same dates.',
      tour: [
        { target: 'timeline.phone-list', caption: 'Tap the job you want to move.', opens: true, optional: true },
        { target: 'timeline.gantt', caption: 'Drag a bar to move it, or its right edge to stretch it.', optional: true },
        { target: 'timeline.shift', caption: 'Nudge it by a day or a week, or set the dates below.', optional: true },
        { target: 'timeline.save', caption: 'Tap Save dates.', optional: true },
      ],
    },
    {
      title: 'Spot jobs running late',
      steps: [
        'Running late in the stats counts jobs past their end date that are not complete or on hold.',
        'On a phone those jobs say Running late in orange.',
      ],
      tour: [{ target: 'timeline.range', caption: 'Pick Week, Month or Quarter, then step with Prev and Next.' }],
    },
  ],
  notes: [
    {
      title: 'Team availability',
      body: 'The list under the chart shows who is on leave, so you can see who is free before you move a job.',
    },
  ],
};

export const TRACKING_HELP: PageHelpContent = {
  id: 'employer-tracking',
  title: 'Worker tracking',
  what: 'Where the team is right now: on site, travelling, in the office or off. It comes from the status each worker sets on their phone.',
  steps: [
    {
      title: 'Workers set a status',
      body: 'In Worker Tools, Status. On site and En route need their location on.',
    },
    {
      title: 'See it here',
      body: 'The map and the list update as they change. A status older than 12 hours drops to Off duty.',
    },
    {
      title: 'Act on it',
      body: 'Call, message, or check someone out who forgot to.',
    },
  ],
  tasks: [
    {
      title: 'Check someone in to a job',
      steps: [
        'Tap the check in button (the person with a plus).',
        'Pick the worker and the job site.',
        'Tap Check in to site.',
      ],
      after:
        'It records them at the job’s address, never at your own location. If the job has no address, add one first or ask them to set their status on their phone.',
      tour: [
        { target: 'tracking.checkin', caption: 'Tap here to check a worker in to a site.', opens: true },
        { target: 'tracking.checkin-go', caption: 'Pick the worker and job, then tap Check in to site.' },
      ],
    },
    {
      title: 'Message or call a worker',
      steps: [
        'Find them in the Workers list.',
        'Tap the phone to call, or the message button to write to them.',
        'A message lands in their Worker Tools comms with a push.',
      ],
      tour: [{ target: 'tracking.list', caption: 'Each row has call and message buttons.' }],
    },
    {
      title: 'Check out someone who forgot',
      steps: ['Find them in the list.', 'Tap Check out. Their shift ends.'],
      tour: [{ target: 'tracking.list', caption: 'Tap Check out on a row that is still showing as on shift.' }],
    },
  ],
  notes: [
    {
      title: 'Phone view',
      body: 'On a phone, use the list and map buttons at the top to switch views.',
    },
  ],
};

export const JOB_PACKS_HELP: PageHelpContent = {
  id: 'employer-jobpacks',
  title: 'Job packs',
  what: 'One pack per job with the scope, documents, certificates and briefing. Send it to the crew and see who has signed.',
  steps: [
    { title: 'Make a pack', body: 'Tap New pack, or tap a job under Jobs awaiting pack.' },
    {
      title: 'Get the documents ready',
      body: 'The RAMS, method statement and briefing pack are made in the pack’s Docs tab.',
    },
    {
      title: 'Send it and chase',
      body: 'Send tab, Send to workers. Each person signs on their phone. The pack turns Complete by itself when the last person signs.',
    },
  ],
  tasks: [
    {
      title: 'Make a pack for a job',
      steps: [
        'Tap New pack, or tap the job under Jobs awaiting pack so it is already picked.',
        'Work through Start, Details, Hazards, Team and Review.',
        'Tap Create pack.',
      ],
      after: 'A half-finished pack is kept as a draft you can resume from the top of the page.',
      tour: [{ target: 'jobpacks.new', caption: 'Tap New pack to start.', opens: true }],
    },
    {
      title: 'Send a pack to the crew',
      steps: [
        'Tap the pack to open it.',
        'Make sure Docs shows all three documents made and at least one worker is assigned.',
        'Open the Send tab and tap Send to workers.',
      ],
      after: 'Each assigned worker is asked to sign it off on their phone. On a computer the list also has a Send button once the pack is ready.',
      tour: [
        { target: 'jobpacks.list', caption: 'Tap a pack to open it.', opens: true },
        { target: 'jobpacks.tabs', text: 'Send', caption: 'Tap Send to see who it goes to.' },
      ],
    },
    {
      title: 'See who has signed and chase',
      steps: [
        'Open the pack and tap Send.',
        'Each person shows when they signed, or a Chase button.',
        'Tap Chase for one person, or Chase everyone still to sign. On the list, Chase does the same in one tap.',
      ],
      after: 'Each person gets one reminder a day at most. We also remind them ourselves a day and three days after the pack goes out.',
      tour: [
        { target: 'jobpacks.list', caption: 'Tap a sent pack to open it.', opens: true },
        { target: 'jobpacks.tabs', text: 'Send', caption: 'Tap Send, then Chase anyone who has not signed.' },
      ],
    },
  ],
  notes: [
    {
      title: 'The documents themselves',
      body: 'Making and checking the RAMS, method statement and briefing is covered in the Safety help.',
    },
    {
      title: 'The tabs',
      body: 'Draft has not gone out. Sent is with the crew and shows how many have signed. Complete means everyone has signed it off; nobody sets it by hand.',
    },
    {
      title: 'Certificates',
      body: 'The certificates a pack needs are checked against each person’s Elec-ID on the start date. A red line on the list names who is missing what.',
    },
    {
      title: 'Site safety PDF',
      body: 'Site safety PDF, at the top or inside a pack, builds the one-page summary a principal contractor asks for from the job’s crew, RAMS, sign-offs and compliance documents.',
    },
  ],
};

export const JOBS_HUB_HELP: PageHelpContent = {
  id: 'employer-jobshub',
  title: 'The jobs hub',
  what: 'Everything about running jobs, one tap away. The numbers at the top open the page behind them.',
  steps: [
    { title: 'Plan', body: 'Jobs, Job board, Diary and Timeline: what is on and who is on it.' },
    { title: 'On site', body: 'Worker tracking, Progress logs, Issues, Testing and Quality.' },
    { title: 'Kit and money', body: 'Fleet, Kit register, Photos, Purchase orders and Job financials.' },
  ],
};
