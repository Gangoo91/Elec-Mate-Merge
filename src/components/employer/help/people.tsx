import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for the Employer Hub People pages (ELE-1980).
   Every step names the real buttons on screen; tours point at data-help
   targets in the section components.
   ========================================================================== */

export const PEOPLE_HUB_HELP: PageHelpContent = {
  id: 'employer-people-hub',
  title: 'People',
  what: 'Everything about your team in one place: who is on it, their cards and tickets, hours, leave, messages, and hiring.',
  steps: [
    {
      title: 'Start with the alerts',
      body: 'The alerts at the top are what needs you today: hours to approve, leave to decide, people who never joined, cards running out.',
    },
    {
      title: 'Open a card',
      body: 'Team, Credentials, Timesheets, Leave and Communications run the day. Talent Pool, Job Vacancies and Apprentice Progress grow the team.',
    },
    {
      title: 'Watch the ring',
      body: 'The Compliance ring is the share of your active team with an ECS card in date. Tap it to open Credentials.',
    },
  ],
  notes: [
    {
      title: 'What each card is for',
      body: 'Team: add people and chase invites. Credentials: Elec-IDs, ECS checks and renewals. Timesheets: approve hours. Leave: holiday and allowances. Communications: messages with read receipts. Talent Pool, Job Vacancies and Apprentice Progress: hiring and training.',
    },
  ],
};

export const TEAM_HELP: PageHelpContent = {
  id: 'employer-team',
  title: 'Team',
  what: 'Everyone on your books. Add people, get them signed in to the app, and keep their details right. Someone only works in the app for your firm once they have joined.',
  steps: [
    {
      title: 'Add someone',
      body: 'Tap Add team member. With an email address, they get an invite to join straight away.',
    },
    {
      title: 'Chase who has not joined',
      body: 'The Invited tab lists people who never signed in. Send a reminder, up to three, a day apart.',
    },
    {
      title: 'Keep details right',
      body: 'Tap a person to call, message or assign them. Edit Profile changes their role, pay and status.',
    },
  ],
  tasks: [
    {
      title: 'Add someone and send the invite',
      steps: [
        'Tap Add team member.',
        'Who: full name and email (the email is what sends the invite). Tap Next.',
        'Role and pay: job role, team role and pay. Tap Next.',
        'Check the review, then tap Add team member.',
      ],
      after:
        'They get an invite email. They set up their account from it, or sign in with that email and tap Join. They show under Invited until they do.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'team.add', caption: 'Tap Add team member.', opens: true },
        { target: 'team.add-next', caption: 'Fill in their name and email, then tap Next.' },
      ],
    },
    {
      title: 'Chase someone who has not joined',
      steps: [
        'Open the Invited tab.',
        'Tap Send reminder under their name. It sends a fresh invite email.',
        'If it says Chase in a few hours, the last one went less than a day ago. After three reminders it says Chased 3 times.',
        'Lost the email? Tap Team code and share the code in your WhatsApp group or by text.',
      ],
      after:
        'Fix email first means there is no email on file, or they said the invite was not for them. Check the address.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'team.tabs', text: 'Invited', caption: 'Open the Invited tab.', opens: true },
        { target: 'team.chase', caption: 'Tap Send reminder to send a fresh invite.' },
        {
          target: 'team.team-code',
          caption: 'Or share the team code for anyone who lost the email.',
          optional: true,
        },
      ],
    },
    {
      title: 'Change someone’s details',
      steps: [
        'Tap the person in the list.',
        'Scroll down and tap Edit Profile.',
        'Change their role, contact details, pay or status.',
        'Tap Save changes.',
      ],
      who: 'Owner, admins and office managers. Office managers never see pay.',
      tour: [
        { target: 'team.list', caption: 'Tap a person to open them.', opens: true },
        { target: 'team.edit-profile', caption: 'Tap Edit Profile.' },
      ],
    },
    {
      title: 'Remove someone from the team',
      steps: [
        'Tap the person, then Edit Profile.',
        'Tap the bin button at the bottom.',
        'Tap Remove to confirm.',
      ],
      after:
        'Their invite is cancelled and their seat goes back. Their records are kept, and they move to the Archived tab.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'team.list', caption: 'Tap the person.', opens: true },
        { target: 'team.edit-profile', caption: 'Tap Edit Profile.', opens: true },
        { target: 'team.remove', caption: 'Tap the bin, then Remove to confirm.' },
      ],
    },
    {
      title: 'Message or assign several people',
      steps: [
        'Tap the tick box button next to Add team member.',
        'Tick the people you want, or Select all.',
        'Tap Message to send them one message, or Assign to put them on a job.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [{ target: 'team.select', caption: 'Tap here to pick several people.' }],
    },
  ],
  notes: [
    {
      title: 'Seats',
      body: 'Each linked team member uses a seat on your plan. They pay nothing themselves.',
    },
  ],
};

export const ELECID_HELP: PageHelpContent = {
  id: 'employer-credentials',
  title: 'Credentials',
  what: 'Each person’s Elec-ID: their ECS card, tickets and training, how you checked them, and what is running out. The competence matrix is the grid you send to a principal contractor.',
  steps: [
    {
      title: 'Give everyone an Elec-ID',
      body: 'Add credential lists the people without one. Tap a person, or Create all.',
    },
    {
      title: 'Record your checks',
      body: 'Open a person and tap their ECS card to record that you saw it or checked it on the card checker.',
    },
    {
      title: 'Stay ahead of renewals',
      body: 'The Expiring and Expired tabs show who needs a renewal. Nudge to renew sends them a message.',
    },
  ],
  tasks: [
    {
      title: 'Give someone an Elec-ID',
      steps: [
        'Tap Add credential. It lists the people with no Elec-ID.',
        'Tap the person, or tap Create all to make empty ones for everyone.',
        'Add their ECS card type, card number and expiry, then tap Create Elec-ID.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [{ target: 'elecid.add', caption: 'Tap Add credential, then pick the person.' }],
    },
    {
      title: 'Record that you checked an ECS card',
      steps: [
        'Tap the person in the list.',
        'Under Verification, tap ECS card.',
        'Pick Document seen or Verified at source, and say how you checked it (for example on the JIB/ECS card checker).',
        'Tap Save. Your name and the date go on the record.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'elecid.list', caption: 'Tap a person to open their Elec-ID.', opens: true },
        { target: 'elecid.verify', caption: 'Tap ECS card to record how you checked it.' },
      ],
    },
    {
      title: 'Add a training record or ticket',
      steps: [
        'Open the person.',
        'Tap Add training.',
        'Fill in the course name, completion date and expiry if it has one.',
        'Tap Add Training Record.',
      ],
      after:
        'Add skill and Add work history only show on an Elec-ID your firm created. A person’s own Elec-ID is theirs to edit.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'elecid.list', caption: 'Tap a person.', opens: true },
        { target: 'elecid.add-training', caption: 'Tap Add training.' },
      ],
    },
    {
      title: 'Chase a renewal',
      steps: [
        'Open the Expiring or Expired tab.',
        'Tap the person.',
        'Under Urgent attention, tap Nudge to renew.',
      ],
      after:
        'They get a high priority message listing what to renew. Anything they have already renewed is left off.',
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'elecid.tabs',
          text: 'Expiring',
          caption: 'Open Expiring to see who needs a renewal.',
          opens: true,
        },
        { target: 'elecid.list', caption: 'Tap the person.', opens: true },
        { target: 'elecid.nudge', caption: 'Tap Nudge to renew to send them a message.' },
      ],
    },
    {
      title: 'Send the competence matrix to a principal contractor',
      steps: [
        'Tap Competence matrix.',
        'Set the site requirements if they asked for particular cards.',
        'Tap Export PDF, Share, or CSV.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'elecid.view',
          text: 'Competence matrix',
          caption: 'Tap Competence matrix.',
          opens: true,
        },
        { target: 'elecid.matrix-export', caption: 'Export PDF, Share it, or save a CSV.' },
      ],
    },
    {
      title: 'Check someone’s Elec-ID on site',
      steps: [
        'Tap Scan.',
        'Type their Elec-ID number (like EM-7K3P4N), or tap Scan QR code with camera.',
        'You see their card, training and whether anything has run out.',
      ],
      tour: [{ target: 'elecid.scan', caption: 'Tap Scan to check a worker’s Elec-ID.' }],
    },
  ],
  legend: [
    { swatch: 'bg-amber-400', label: 'Self-declared', body: 'Typed in. Nobody has checked it.' },
    {
      swatch: 'bg-blue-400',
      label: 'Document seen',
      body: 'Someone looked at the card or certificate.',
    },
    {
      swatch: 'bg-emerald-400',
      label: 'Verified at source',
      body: 'Checked with whoever issued it.',
    },
  ],
};

export const TALENT_POOL_HELP: PageHelpContent = {
  id: 'employer-talent-pool',
  title: 'Talent pool',
  what: 'Electricians who have switched on “Let firms find me” in their Elec-ID. You see first name, area and credentials. Phone and email stay private, so you contact them through messages.',
  steps: [
    {
      title: 'Narrow it down',
      body: 'Use the chips (Verified+, EV Charging, Solar PV, Senior 8+ yrs), the search, or Filters.',
    },
    {
      title: 'Shortlist',
      body: 'Tap the bookmark to save someone. Everyone managing the firm sees the shortlist.',
    },
    {
      title: 'Get in touch',
      body: 'Message them, or Invite them to apply for one of your live vacancies.',
    },
  ],
  tasks: [
    {
      title: 'Find the right person',
      steps: [
        'Tap a chip at the top, or type a name, skill or area in the search.',
        'Tap Filters for tier, specialisms, experience and day rate, then tap Done.',
        'Tap someone’s photo to see their full profile.',
      ],
      tour: [
        { target: 'talentpool.tabs', caption: 'Use the chips and the search to narrow it down.' },
        {
          target: 'talentpool.tabs',
          text: 'Filters',
          caption: 'Filters has tier, specialisms, experience and rate.',
          optional: true,
        },
      ],
    },
    {
      title: 'Message someone',
      steps: ['Tap Message under their name.', 'Write your message.', 'Tap Send Message.'],
      after: 'The conversation carries on under Job Vacancies, Messages.',
      tour: [
        { target: 'talentpool.list', text: 'Message', caption: 'Tap Message to write to them.' },
      ],
    },
    {
      title: 'Invite someone to apply',
      steps: [
        'Tap Invite under their name.',
        'Pick one of your live vacancies.',
        'Add a personal message if you like, then tap Send Invitation.',
      ],
      after: 'You need a live vacancy first. Post one under Job Vacancies.',
      tour: [
        {
          target: 'talentpool.list',
          text: 'Invite',
          caption: 'Tap Invite, then pick the vacancy.',
        },
      ],
    },
    {
      title: 'Shortlist someone',
      steps: ['Tap the bookmark on the right of their card.', 'Tap it again to take them off.'],
      tour: [
        {
          target: 'talentpool.list',
          text: 'Save candidate',
          caption: 'Tap the bookmark to shortlist them.',
          optional: true,
        },
      ],
    },
  ],
};

export const APPRENTICES_HELP: PageHelpContent = {
  id: 'employer-apprentices',
  title: 'Apprentices',
  what: 'Live college progress for the apprentices on your team: off-the-job hours, end-point assessment and progress reviews. Hours they log at work wait here for you to attest.',
  steps: [
    {
      title: 'Attest their hours',
      body: 'Awaiting your attestation lists training hours they logged at work. Open one and attest it, or send it back.',
    },
    {
      title: 'Check progress',
      body: 'Tap an apprentice for their off-the-job hours, EPA dates and reviews.',
    },
    {
      title: 'Keep reviews on time',
      body: 'Add your view before a review and sign the summary after. Chase an overdue one in one tap.',
    },
    {
      title: 'Bring in the ones not on your team',
      body: 'Not on your team yet lists apprentices whose college names your firm but who are not on your team. Ask them to arrange a review, or add them to your team.',
    },
  ],
  tasks: [
    {
      title: 'Attest training hours',
      steps: [
        'Under Awaiting your attestation, tap the entry.',
        'Read what they logged and open any evidence.',
        'Tap Attest (it shows the hours).',
      ],
      after: 'The hours count as workplace-attested. The college still checks them separately.',
      who: 'The office here. Supervisors, project managers and apprentice co-ordinators can also confirm hours from Worker Tools.',
      tour: [
        { target: 'apprentices.attest-list', caption: 'Tap an entry to read it.', opens: true },
        {
          target: 'apprentices.attest',
          caption: 'Attest only if it happened under your supervision.',
        },
      ],
    },
    {
      title: 'Send hours back',
      steps: [
        'Open the entry.',
        'Tap Send back.',
        'Write what needs changing. The apprentice sees it.',
        'Tap Confirm send back.',
      ],
      after: 'They can fix the entry and send it again.',
      tour: [
        { target: 'apprentices.attest-list', caption: 'Tap the entry.', opens: true },
        { target: 'apprentices.send-back', caption: 'Tap Send back and say what needs changing.' },
      ],
    },
    {
      title: 'Check an apprentice’s progress',
      steps: [
        'Under Your apprentices, tap the person.',
        'See off-the-job hours against what is needed, EPA dates and progress reviews.',
      ],
      tour: [{ target: 'apprentices.list', caption: 'Tap an apprentice to see their progress.' }],
    },
    {
      title: 'Chase an overdue review',
      steps: [
        'Open the apprentice. Overdue reviews show a red Review due.',
        'Tap Ask to arrange review.',
      ],
      after:
        'They get a message asking them to arrange it. For someone not on your team yet, use the Not on your team yet card instead.',
    },
    {
      title: 'Apprentices not on your team yet',
      steps: [
        'Open the Not on your team yet card. It lists apprentices whose college names your firm as their employer.',
        'Tap a person.',
        'Tap Ask to arrange review. It works without them being on your team, once every 3 days.',
        'Or tap Add them to your team. They get an invite by email and link their own account when they accept it.',
      ],
      after:
        'Nobody is linked to your team without accepting the invite themselves. Once they join, their hours and progress show under Your apprentices.',
      who: 'The owner, admins and office managers.',
      tour: [
        { target: 'apprentices.unrostered', caption: 'Tap a person to open them.', opens: true },
        {
          target: 'apprentices.unrostered-nudge',
          caption: 'Ask them to arrange their review. This works before they join your team.',
        },
        {
          target: 'apprentices.unrostered-add',
          caption: 'Or add them to your team. They link themselves by accepting the invite.',
        },
      ],
    },
    {
      title: 'Take part in a progress review',
      steps: [
        'Open the apprentice.',
        'Tap Add your view before the review, or Read and sign the review summary after it.',
      ],
      after:
        'The college books the review. Your view and signature are recorded for the funding rules.',
    },
  ],
  notes: [
    {
      title: 'When you are told',
      body: 'The moment an apprentice logs hours, the owner, admins and their named supervisor get a bell and a push that opens the entry. Each person is told once. If hours wait 3 days or more, you get a reminder on Monday.',
    },
  ],
};

export const SUBCONTRACTORS_HELP: PageHelpContent = {
  id: 'employer-subcontractors',
  title: 'Subcontractors',
  what: 'Labour-only sparkies and regular subbies on your books. They get the same jobs, packs, briefings and timesheets as your team, with no holiday or PAYE payroll. You pay them by a self-bill statement from the days you approved, with CIS worked out for you.',
  steps: [
    {
      title: 'Pick the tax month',
      body: 'CIS runs from the 6th to the 5th. The page opens on this tax month; use the arrows for the one before.',
    },
    {
      title: 'Check days and cover',
      body: 'Each subbie shows the days you approved, days still waiting, and whether their insurance and ECS card are in date.',
    },
    {
      title: 'Issue the statement',
      body: 'The owner or an admin issues a self-bill statement. CIS comes off labour only; materials are never taxed.',
    },
  ],
  tasks: [
    {
      title: 'Set up a subbie',
      steps: [
        'Add them from Team with the Subcontractor type, or change an existing person to Subcontractor.',
        'Here, tap the subbie, then Edit.',
        'Fill in trade and public liability insurance (provider, policy, cover, expiry).',
        'Owner or admin: set the day or hourly rate, CIS status, UTR and HMRC verification number.',
        'Tap Save.',
      ],
      after: 'You get a bell when their insurance or ECS card is close to running out.',
      who: 'Office managers can set trade and insurance. Only the owner and admins see or set rates, CIS and UTR.',
      tour: [
        { target: 'subcontractors.list', caption: 'Tap a subbie to open them.', opens: true },
        { target: 'subcontractors.edit', caption: 'Tap Edit to set trade, insurance and pay.' },
      ],
    },
    {
      title: 'Issue a self-bill statement',
      steps: [
        'Check the tax month at the top.',
        'Tap the subbie. Approved days, other costs and materials are listed.',
        'Tap Issue statement and check the sums: days times rate is labour, CIS comes off labour and other costs, materials are paid in full.',
        'Tap Issue. They get the statement in their app.',
      ],
      after:
        'The days are marked as billed so they can never be paid twice. Made a mistake? Void it within 48 hours and issue it again.',
      who: 'The owner and admins.',
      tour: [
        { target: 'subcontractors.period', caption: 'This is the CIS tax month, 6th to 5th.' },
        { target: 'subcontractors.list', caption: 'Tap the subbie.', opens: true },
        { target: 'subcontractors.issue', caption: 'Tap Issue statement and check the sums.' },
      ],
    },
    {
      title: 'Export statements for your accountant',
      steps: [
        'Pick the tax month.',
        'Tap Export statements. You get a CSV of every statement in the month.',
      ],
      after:
        'This is separate from the PAYE payroll file. Use it for your CIS300 monthly return.',
      who: 'The owner and admins.',
      tour: [{ target: 'subcontractors.export', caption: 'Tap Export statements for a CSV.' }],
    },
  ],
  notes: [
    {
      title: 'How CIS is worked out',
      body: 'Labour (days times day rate, or hours times hourly rate) plus other costs such as travel are liable to deduction. Materials are not. Gross 0%, verified 20%, higher rate or not verified 30%. Pennies are rounded down, in the subbie’s favour.',
    },
    {
      title: 'Who sees what',
      body: 'Office managers see days, trade and insurance, never rates, CIS, UTR or amounts. Subbies see their own statements in Worker Tools, My pay.',
    },
    {
      title: 'No holiday, no PAYE',
      body: 'Subbies have no holiday allowance and are left out of the payroll run. They pay their own tax through Self Assessment.',
    },
  ],
};

export const VACANCIES_HELP: PageHelpContent = {
  id: 'employer-vacancies',
  title: 'Job vacancies',
  what: 'Post jobs, take applications and move people from new applicant to hired. Hiring someone puts them straight on your team.',
  steps: [
    {
      title: 'Post a vacancy',
      body: 'Post vacancy walks you through the basics, pay, requirements and a review.',
    },
    {
      title: 'Work the candidates',
      body: 'The Candidates tab moves each person along: Shortlist, Interview, Make offer, Hire & onboard.',
    },
    {
      title: 'Talk to them',
      body: 'Messages holds your conversations with applicants and people from the talent pool.',
    },
  ],
  tasks: [
    {
      title: 'Post a vacancy',
      steps: [
        'Tap Post vacancy.',
        'Fill in Job Basics, Compensation and Requirements, tapping Continue each time.',
        'Check the Review and tap Publish Job Listing.',
        'Not ready? Tap Save Draft. It waits in the Draft tab.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [{ target: 'vacancies.post', caption: 'Tap Post vacancy to start.' }],
    },
    {
      title: 'Publish, pause or reopen a vacancy',
      steps: [
        'On the Vacancies tab pick Live, Draft or Closed.',
        'Tap the vacancy.',
        'Tap Publish for a draft, Pause for a live one, or Reopen.',
      ],
      tour: [
        { target: 'vacancies.status-tabs', caption: 'Pick Live, Draft or Closed.' },
        {
          target: 'vacancies.list',
          caption: 'Tap a vacancy to publish, pause or edit it.',
          opens: true,
        },
        {
          target: 'vacancies.vacancy-actions',
          caption: 'Publish, Pause, Reopen or Edit from here.',
        },
      ],
    },
    {
      title: 'Move a candidate to hired',
      steps: [
        'Open the Candidates tab.',
        'Tap Shortlist on a new applicant.',
        'Tap Interview… and book the time. They are told the interview is booked.',
        'After the interview tap Make offer, then Hire & onboard.',
      ],
      after: 'Hire & onboard adds them to your team. They show in People.',
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'vacancies.tabs',
          text: 'Candidates',
          caption: 'Open the Candidates tab.',
          opens: true,
        },
        {
          target: 'vacancies.candidates',
          caption: 'Each card has the next step: Shortlist, Interview, Make offer, Hire.',
        },
      ],
    },
    {
      title: 'Turn a candidate down',
      steps: [
        'Tap the candidate.',
        'Tap Reject and give a reason. It is kept in your private notes.',
        'Changed your mind? Open them and tap Reinstate to New.',
      ],
    },
    {
      title: 'Message applicants',
      steps: ['Open the Messages tab.', 'Tap a conversation to reply.'],
      tour: [
        {
          target: 'vacancies.tabs',
          text: 'Messages',
          caption: 'Messages has every conversation with applicants.',
        },
      ],
    },
  ],
};
