import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for Worker Tools (part 2): credentials, equipment, progress
   notes, expenses, reports, QS reviews, apprentice hours and your crew.
   Every step is written from the page code: button words are as on screen.
   ========================================================================== */

export const WT_EXPENSES_HELP: PageHelpContent = {
  id: 'wt-expenses',
  title: 'Expenses',
  what: 'Claim back mileage and money you spent on the job. The office approves it and pays you back, with your wages or when they pay expenses.',
  steps: [
    {
      title: 'Log mileage or a receipt',
      body: 'Tap Log mileage or Claim a receipt. Pick the job if it was for one.',
    },
    {
      title: 'Send it to the office',
      body: 'It shows as Waiting. You can change it or withdraw it until the office approves it.',
    },
    {
      title: 'Get paid back',
      body: 'You get a notification when the office decides. Approved money shows under Coming back to you.',
    },
  ],
  tasks: [
    {
      title: 'Claim mileage',
      steps: [
        'Tap Log mileage.',
        'Type where you set off From and where you went To. Picking a job with an address fills in To for you.',
        'Pick One way or There and back.',
        'Tap Work out miles, or type the miles yourself.',
        'Check the amount under You’ll claim, then tap Send.',
      ],
      after:
        'Paid at your firm’s rate a mile. If the firm has not set one, it uses the HMRC approved rate. Adding a receipt is optional.',
      tour: [
        { target: 'wt-expenses.mileage', caption: 'Tap Log mileage.', opens: true },
        { target: 'wt-expenses.from', caption: 'Type where you set off from and where you went.' },
        { target: 'wt-expenses.work-out', caption: 'Tap Work out miles, or type the miles yourself.' },
        { target: 'wt-expenses.send', caption: 'Check what you’ll claim, then tap Send.' },
      ],
    },
    {
      title: 'Claim a receipt',
      steps: [
        'Tap Claim a receipt.',
        'Type the amount, including VAT, as on the receipt.',
        'Pick What kind of spend, the date on the receipt and the job.',
        'Tap Take photo, or Photo or PDF to pick a file.',
        'Tap Send.',
      ],
      tour: [
        { target: 'wt-expenses.receipt', caption: 'Tap Claim a receipt.', opens: true },
        { target: 'wt-expenses.photo', caption: 'Take a photo of the receipt, or pick a photo or PDF.' },
        { target: 'wt-expenses.send', caption: 'Add the amount and kind of spend, then tap Send.' },
      ],
    },
    {
      title: 'Fix a claim that was rejected',
      steps: [
        'Tap the Rejected filter.',
        'Tap the claim. Where it is shows the office’s reason.',
        'A rejected claim cannot be changed. Make a new claim with the fix, using Log mileage or Claim a receipt.',
      ],
      after: 'No reason given? Ask the office.',
      tour: [
        { target: 'wt-expenses.filters', text: 'Rejected', caption: 'Tap Rejected.', opens: true },
        { target: 'wt-expenses.list', caption: 'Tap the claim to read why.', opens: true },
        { target: 'wt-expenses.where', caption: 'The reason is here. Make a new claim with the fix.' },
      ],
    },
    {
      title: 'Change or withdraw a waiting claim',
      steps: [
        'Tap the Waiting filter, then tap the claim.',
        'Tap Change it to edit it, or Withdraw then Withdraw claim to remove it.',
      ],
      after: 'Once the office approves a claim you can no longer change it. Withdrawing deletes any receipt you added.',
      tour: [
        { target: 'wt-expenses.filters', text: 'Waiting', caption: 'Tap Waiting.', opens: true },
        { target: 'wt-expenses.list', caption: 'Tap the claim you want to change.', opens: true },
        { target: 'wt-expenses.change', caption: 'Tap Change it, or Withdraw to remove it.' },
      ],
    },
  ],
  notes: [
    {
      title: 'Where your money is',
      body: 'Waiting is with the office. Coming back to you is approved. Paid back is done. Miles since 6 April show under Mileage rate.',
    },
  ],
};

export const WT_CREDENTIALS_HELP: PageHelpContent = {
  id: 'wt-credentials',
  title: 'Credentials',
  what: 'Your qualifications, cards and training, kept on your Elec-ID with a photo of each. You control the list. Your employer’s competence matrix reads the same list, so you only keep it up to date once, and it moves with you if you change firms.',
  steps: [
    {
      title: 'Add what you hold',
      body: 'Tap Add, pick the ticket (ECS, 18th Edition, 2391, First Aid…) or type your own, then add the number, the dates and a photo.',
    },
    {
      title: 'See what your firm needs',
      body: 'If your firm has set what it needs on site, you see each one as Held, Expiring or Missing, with Add it to fill the gap.',
    },
    {
      title: 'Get reminded',
      body: 'We remind you 60 days and 14 days before anything expires, and on the day. Your firm is told 30 days before.',
    },
    {
      title: 'Your employer checks it',
      body: 'What you add shows to your firm as Added by them until someone records that they have seen it or checked it at source.',
    },
  ],
  tasks: [
    {
      title: 'Add a qualification or card with a photo',
      steps: [
        'Tap Add (on a phone, Add a qualification or card).',
        'Tap one of the usual tickets, or type the Name yourself.',
        'Add the certificate or card number, Achieved and Expires dates if you have them.',
        'Tap Take a photo (or Choose a file for a PDF).',
        'Tap Save. It is added to your Elec-ID as self-declared.',
      ],
      after: 'Only you and the managers at firms you work for can open the photo.',
      tour: [
        { target: 'wt-credentials.add', caption: 'Tap Add.', opens: true },
        { target: 'wt-credentials.quick', caption: 'Tap the ticket you hold, or type your own below.' },
        { target: 'wt-credentials.dates', caption: 'Add the dates. We remind you before it expires.' },
        { target: 'wt-credentials.photo', caption: 'Take a photo of the certificate or card.' },
        { target: 'wt-credentials.save', caption: 'Tap Save.' },
      ],
    },
    {
      title: 'Fill a gap your firm has flagged',
      steps: [
        'Find What your firm needs on this page.',
        'Tap Add it next to anything Missing, or Update next to anything expiring.',
        'Fill in the details and photo, then tap Save.',
      ],
      tour: [
        { target: 'wt-credentials.requirements', caption: 'Your firm’s list. Tap Add it or Update on a gap.' },
      ],
    },
    {
      title: 'Update a ticket that is expiring',
      steps: [
        'Tap the Needs attention filter.',
        'Tap the item.',
        'Change the Expires date (and the number if it changed), add a photo of the new one, then tap Save.',
      ],
      after: 'If your employer had checked it, changing the details clears that check until they check it again.',
      tour: [
        { target: 'wt-credentials.filters', text: 'Needs attention', caption: 'Tap Needs attention.', opens: true },
        { target: 'wt-credentials.list', caption: 'Tap the item to open it.', opens: true },
        { target: 'wt-credentials.dates', caption: 'Change the Expires date, then tap Save.' },
      ],
    },
    {
      title: 'Check your reminders',
      steps: [
        'Make sure each item has the right Expires date.',
        'We remind you at 60 days, 14 days and on the day. Your firm hears 30 days before.',
      ],
      tour: [{ target: 'wt-credentials.reminders', caption: 'Reminders are on for anything with an Expires date.' }],
    },
    {
      title: 'Remove something',
      steps: ['Tap the item.', 'Tap Remove from my Elec-ID, then tap again to confirm.'],
      after: 'Its photo is deleted too.',
      tour: [{ target: 'wt-credentials.list', caption: 'Tap the item, then Remove from my Elec-ID.' }],
    },
    {
      title: 'Change your ECS card',
      steps: ['Tap Open Elec-ID.', 'Update the card in your Elec-ID settings.'],
      tour: [{ target: 'wt-credentials.elec-id', caption: 'Your ECS card lives in Elec-ID. Tap Open Elec-ID.' }],
    },
  ],
};

export const WT_EQUIPMENT_HELP: PageHelpContent = {
  id: 'wt-equipment',
  title: 'My equipment',
  what: 'The company kit on your name or on the van you drive, when each item is due its PAT test or calibration, and the stock on your van.',
  steps: [
    { title: 'Confirm what you are given', body: 'When the office issues you something, tap I have it so they know it reached you.' },
    { title: 'Tell the office', body: 'Report a fault or a loss with a photo, pass it to someone, or hand it back. The office is told straight away.' },
    { title: 'Log what you use', body: 'In Van stock, log the materials you used on a job. The van stock goes down and the office reorders when it runs low.' },
  ],
  tasks: [
    {
      title: 'Confirm you have something',
      steps: ['Open the notification, or find it under Confirm you have this.', 'Check you have it, then tap I have it.'],
      tour: [{ target: 'wt-equipment.confirm', caption: 'Tap I have it once it is in your hands.', optional: true }],
    },
    {
      title: 'Report a fault or a loss',
      steps: [
        'Tap the item.',
        'Tap Report a fault (or Report it lost).',
        'Say what is wrong and take a photo.',
        'Tap Send fault report.',
      ],
      after: 'The office gets it with your photo. The item shows as faulty until they mark it fixed. Do not use faulty kit.',
      tour: [
        { target: 'wt-equipment.list', caption: 'Tap the item.', opens: true },
        { target: 'wt-equipment.actions', caption: 'Tap Report a fault and add a photo.' },
      ],
    },
    {
      title: 'Pass kit to someone or hand it back',
      steps: ['Tap the item.', 'Tap Pass to someone and pick who, or Hand it back.', 'Add a note if it helps and send.'],
      after: 'It comes off your name. The person you pass it to is asked to confirm, and the office knows who has it.',
      tour: [
        { target: 'wt-equipment.list', caption: 'Tap the item.', opens: true },
        { target: 'wt-equipment.actions', caption: 'Tap Pass to someone or Hand it back.' },
      ],
    },
    {
      title: 'Check what needs a PAT test or calibration',
      steps: ['Tap the Due soon filter.', 'Tap an item to see its dates.'],
      after: 'You get a reminder 14 days before, on the day, and if it runs out. Do not use kit that has run out.',
      tour: [{ target: 'wt-equipment.filters', text: 'Due soon', caption: 'Tap Due soon.' }],
    },
    {
      title: 'Find kit by scanning it',
      steps: ['Tap Scan.', 'Point the camera at the barcode or serial label.'],
      tour: [{ target: 'wt-equipment.scan', caption: 'Tap Scan and point at the label.', optional: true }],
    },
    {
      title: 'Log materials used on a job',
      who: 'Whoever drives the van.',
      steps: [
        'Tap Van stock.',
        'Tap Log materials used on a job.',
        'Pick the job.',
        'Tap + on each thing you used, or tap Scan and scan the box.',
        'Tap Log.',
      ],
      after: 'The van stock goes down and the office sees it on the job. Got it wrong? Tap Undo within 24 hours.',
      tour: [
        { target: 'wt-equipment.tabs', text: 'Van stock', caption: 'Tap Van stock.', opens: true, optional: true },
        { target: 'wt-equipment.log', caption: 'Tap Log materials used on a job.', opens: true, optional: true },
        { target: 'wt-equipment.log-job', caption: 'Pick the job.', optional: true },
        { target: 'wt-equipment.log-items', caption: 'Tap + on what you used, then Log.', optional: true },
      ],
    },
    {
      title: 'Count the van',
      steps: ['Tap Van stock.', 'Tap the item.', 'Enter how many are really on the van and tap Save count.'],
      tour: [
        { target: 'wt-equipment.tabs', text: 'Van stock', caption: 'Tap Van stock.', opens: true, optional: true },
        { target: 'wt-equipment.stock', caption: 'Tap an item to count it.', optional: true },
      ],
    },
  ],
  notes: [
    {
      title: 'Something missing or wrong?',
      body: 'The office issues kit and sets up van stock in the Kit register. Ask them to add or change it.',
    },
    { title: 'Prices', body: 'You see names and quantities only. The office handles the costs.' },
  ],
};

export const WT_PROGRESS_NOTES_HELP: PageHelpContent = {
  id: 'wt-progress-notes',
  title: 'Progress notes',
  what: 'An end of day update on a job: what is done, what is next, anything in the way. It goes to the office and whoever is on the job next sees it.',
  steps: [
    { title: 'Pick the job', body: 'Only shows if you are on more than one job.' },
    { title: 'Say or type it', body: 'Type the note, or tap Speak and talk. Add photos if they help.' },
    {
      title: 'Send to the office',
      body: 'It is stamped with your name and time. You can change or delete it for 24 hours.',
    },
  ],
  tasks: [
    {
      title: 'Log today’s progress',
      steps: [
        'Pick the job, if you are on more than one.',
        'Type what is done, what is next and anything in the way, or tap Speak.',
        'Tap Add photos if you want to show it.',
        'Tap Send to the office.',
      ],
      after: 'The office gets a notification and it shows on the job.',
      tour: [
        { target: 'wt-notes.job', caption: 'Pick the job this is for.', optional: true },
        { target: 'wt-notes.text', caption: 'Type what is done, what is next, anything in the way.' },
        { target: 'wt-notes.extras', caption: 'Tap Speak to talk it, or add photos.' },
        { target: 'wt-notes.send', caption: 'Tap Send to the office.' },
      ],
    },
    {
      title: 'Change or delete a note',
      steps: [
        'Find your note under On this job.',
        'Tap Change to edit the words or photos, then save.',
        'Or tap Delete, then Tap again to delete.',
      ],
      after: 'You can only change your own notes, for 24 hours after you sent them.',
      tour: [{ target: 'wt-notes.timeline', caption: 'Your notes are here. Tap Change or Delete under one.' }],
    },
    {
      title: 'Use a note as OTJ evidence (apprentices)',
      steps: [
        'Find your note under On this job.',
        'Tap Use as OTJ evidence.',
        'Finish the entry and send it for sign-off.',
      ],
      tour: [{ target: 'wt-notes.timeline', caption: 'Tap Use as OTJ evidence under your note.' }],
    },
  ],
};

export const WT_REPORTS_HELP: PageHelpContent = {
  id: 'wt-reports',
  title: 'Reports',
  what: 'Raise a snag, a near-miss or an incident on a job. Snags go to the snag log. Near-misses and incidents go straight to the office’s incident log.',
  steps: [
    { title: 'Pick what it is', body: 'Snag for a quality defect. Near-miss for a close call. Incident for a safety event.' },
    { title: 'Fill it in', body: 'Pick the job and severity, say what happened, where, and add photos if it is safe to.' },
    { title: 'Submit it', body: 'The office sees it straight away. Its history shows on the right.' },
  ],
  tasks: [
    {
      title: 'Raise a snag',
      steps: [
        'Tap Snag.',
        'Choose the job.',
        'Pick Minor, Moderate or Critical.',
        'Describe the issue and where it is on site.',
        'Tap Add photos if it helps, then tap Submit snag.',
      ],
      tour: [
        { target: 'wt-reports.type', text: 'Snag', caption: 'Tap Snag.', opens: true },
        { target: 'wt-reports.job', caption: 'Choose the job.' },
        { target: 'wt-reports.severity', caption: 'Pick how bad it is.' },
        { target: 'wt-reports.description', caption: 'Describe the issue so it can be put right.' },
        { target: 'wt-reports.submit', caption: 'Add photos if it helps, then tap Submit.' },
      ],
    },
    {
      title: 'Report a near-miss or an incident',
      steps: [
        'Tap Near-miss or Incident.',
        'Choose the job and the severity.',
        'Say what happened, factually: what you saw and what was affected.',
        'Add a photo of the hazard if it is safe to, then tap Submit.',
      ],
      after: 'Safety reports go straight to the office.',
      tour: [
        { target: 'wt-reports.type', text: 'Near-miss', caption: 'Tap Near-miss, or Incident.', opens: true },
        { target: 'wt-reports.description', caption: 'Say what happened and what was affected.' },
        { target: 'wt-reports.photos', caption: 'Add a photo of the hazard if it is safe to.' },
        { target: 'wt-reports.submit', caption: 'Tap Submit.' },
      ],
    },
    {
      title: 'Close a safety action the office gave you',
      steps: [
        'Safety actions for you shows at the top when the office has given you one.',
        'Do the action, then tap Done next to it.',
      ],
      after: 'The office is told it is done.',
      tour: [{ target: 'wt-reports.actions', caption: 'When it is done, tap Done next to it.' }],
    },
  ],
};

export const WT_QS_HELP: PageHelpContent = {
  id: 'wt-qs-reviews',
  title: 'QS reviews',
  what: 'Certificates sent to a Qualifying Supervisor (QS) for sign-off. You see why any of yours came back. If you have the QS role, you also countersign or return your team’s, right here, without the Employer Hub.',
  steps: [
    { title: 'Open a certificate', body: 'Tap one. Returned ones show first and need you to act.' },
    { title: 'See why it came back', body: 'The reasons your QS ticked and their comments sit at the top, then notes against each circuit or observation.' },
    { title: 'Fix and resubmit', body: 'Tap Edit certificate, make the changes, then Resubmit to QS.' },
  ],
  tasks: [
    {
      title: 'Act on your QS’s feedback',
      steps: [
        'Tap Returned.',
        'Tap the certificate. Why it came back is at the top.',
        'Read the comments. Reply with Add comment if you need to.',
        'Tap Edit certificate and make the changes.',
        'Come back and tap Resubmit to QS.',
      ],
      after: 'Your QS reviews it again and the bell tells you the outcome.',
      tour: [
        { target: 'wt-qs.tabs', text: 'Returned', caption: 'Tap Returned.', opens: true },
        { target: 'wt-qs.list', caption: 'Tap the certificate.', opens: true, optional: true },
        { target: 'wt-qs.why', caption: 'Why it came back: the reasons and your QS’s note.', optional: true },
        { target: 'wt-qs.edit', caption: 'Tap Edit certificate to make the changes.', optional: true },
        { target: 'wt-qs.resubmit', caption: 'Then tap Resubmit to QS.', optional: true },
      ],
    },
    {
      title: 'Countersign a certificate (QS only)',
      steps: [
        'Tap To review, then Waiting. The oldest is first.',
        'Tap the certificate and check the detail. Use View PDF to see it as printed.',
        'Tap Approve & countersign.',
        'Check your name, sign, add a comment if you want, then tap Confirm approval.',
      ],
      who: 'Only people with the QS role see To review.',
      tour: [
        { target: 'wt-qs.side', text: 'To review', caption: 'Tap To review.', opens: true },
        { target: 'wt-qs.tabs', text: 'Waiting', caption: 'Tap Waiting.', opens: true },
        { target: 'wt-qs.list', caption: 'Tap the certificate.', opens: true, optional: true },
        { target: 'wt-qs.approve', caption: 'Tap Approve & countersign, then sign and confirm.', optional: true },
      ],
    },
    {
      title: 'Send a certificate back with reasons (QS only)',
      steps: [
        'Open the certificate from Waiting.',
        'Tap + Comment against a circuit or observation to point at the exact problem.',
        'Tap Return with reasons, tick what is wrong and add a note if it helps.',
        'Tap Return certificate. The electrician is told why straight away.',
      ],
      who: 'Only people with the QS role.',
      tour: [
        { target: 'wt-qs.side', text: 'To review', caption: 'Tap To review.', opens: true },
        { target: 'wt-qs.list', caption: 'Tap the certificate.', opens: true, optional: true },
        { target: 'wt-qs.return', caption: 'Tap Return with reasons and tick what is wrong.', optional: true },
      ],
    },
  ],
  notes: [
    { title: 'Common returns', body: 'On To review, Common returns counts the reasons ticked over the last 20 decisions, so the team can see what keeps coming back.' },
  ],
};

export const WT_APPRENTICE_HOURS_HELP: PageHelpContent = {
  id: 'wt-apprentice-hours',
  title: 'Confirm apprentice hours',
  what: 'Off-the-job training logged by apprentices you supervise. Confirm what you saw happen, or send it back with what needs changing. Their college checks it separately.',
  steps: [
    { title: 'You get a notification', body: 'When an apprentice you supervise logs hours, they show here.' },
    { title: 'Read the entry', body: 'The day, the hours, the type of training and what they did.' },
    { title: 'Confirm or send back', body: 'Confirm marks the hours as workplace-confirmed. Send back asks them to change it.' },
  ],
  tasks: [
    {
      title: 'Confirm an entry',
      steps: ['Read the entry.', 'Tap Confirm.'],
      after: 'The hours now count as workplace-confirmed.',
      tour: [{ target: 'wt-otj.confirm', caption: 'Read the entry, then tap Confirm.' }],
    },
    {
      title: 'Send an entry back',
      steps: ['Tap Send back.', 'Say what they need to change (at least 5 letters).', 'Tap Send back again.'],
      after: 'They see your note and can fix it.',
      tour: [{ target: 'wt-otj.send-back', caption: 'Tap Send back, then say what needs changing.' }],
    },
  ],
  notes: [
    {
      title: 'Who can confirm',
      body: 'The apprentice’s named workplace supervisor, and the team’s supervisors, project managers and apprentice co-ordinators. You only see entries you can act on.',
    },
  ],
};

export const WT_CREW_HELP: PageHelpContent = {
  id: 'wt-crew',
  title: 'Your crew',
  what: 'Timesheets, expenses and leave from the people who name you as their supervisor. Approve them or send them back. The office sees everything you decide.',
  steps: [
    { title: 'Requests come in', body: 'Grouped as Timesheets, Expenses and Leave.' },
    { title: 'Check each one', body: 'Who it is from, the day or amount, and any note.' },
    { title: 'Approve or send back', body: 'Send back needs a reason, which the person sees.' },
  ],
  tasks: [
    {
      title: 'Approve a request',
      steps: ['Check the details.', 'Tap Approve.'],
      tour: [{ target: 'wt-crew.approve', caption: 'Check the details, then tap Approve.' }],
    },
    {
      title: 'Send a request back',
      steps: ['Tap Send back.', 'Say what they need to change.', 'Tap Send back again.'],
      tour: [{ target: 'wt-crew.send-back', caption: 'Tap Send back, then say what needs changing.' }],
    },
  ],
  notes: [
    {
      title: 'Who is in your crew',
      body: 'The office sets who you supervise on each person in Team. Until then, approvals stay with the office.',
    },
  ],
};
