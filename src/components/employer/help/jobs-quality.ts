import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for the Jobs pages that keep the work right: progress logs,
   issues, testing, snags, QS reviews, fleet, photos and the kit register
   (ELE-1980). Every step is written from the screen it describes; the
   data-help targets live on the real controls in each section.
   ========================================================================== */

export const PROGRESS_LOGS_HELP: PageHelpContent = {
  id: 'employer-progress-logs',
  title: 'Site diary',
  what: 'One diary per job. The office writes a daily log, the team adds notes and photos from site, and both land here in date order, with who clocked in each day.',
  steps: [
    { title: 'The team writes from site', body: 'Each note your team adds in Worker Tools, Progress notes, lands here with its photos. You get a bell when one comes in.' },
    { title: 'Add the office log', body: 'Tap Write a log for the day: work done, weather, materials and photos.' },
    { title: 'Find anything later', body: 'Search every word, filter by person or job, and pick Today, This week, This month or All.' },
  ],
  tasks: [
    {
      title: 'Write a daily log',
      steps: [
        'Tap Write a log.',
        'Pick the job and the date.',
        'Say what was done. Add finished items, materials and photos if you have them.',
        'Leave Share with the client off unless the client should see it.',
        'Tap Save to the diary.',
      ],
      tour: [
        { target: 'progresslogs.new', caption: 'Tap Write a log.', opens: true },
        { target: 'progresslogs.form-job', caption: 'Pick the job and the date first.' },
        { target: 'progresslogs.create', caption: 'Say what was done, then tap Save to the diary.' },
      ],
    },
    {
      title: "Read what the team sent",
      steps: [
        'Tap From the team to see only their notes.',
        'Tap a note to read it in full and see its photos.',
        'Tap a photo to open it full screen. Swipe for the next one.',
      ],
      after: 'Workers add these from Worker Tools, under Progress notes. Each day shows who clocked in on the job.',
      tour: [
        { target: 'progresslogs.who', text: 'From the team', caption: 'Tap From the team to see only their notes.', opens: true },
        { target: 'progresslogs.list', caption: 'Tap an entry to read it and see the photos.', optional: true },
      ],
    },
    {
      title: 'Share an entry with the client',
      steps: [
        'Tap the entry to open it.',
        'Turn on Share with the client. It can then show on the client portal.',
        'Turn it off again to keep it to your team.',
      ],
      tour: [
        { target: 'progresslogs.list', caption: 'Tap an entry to open it.', opens: true },
        { target: 'progresslogs.share', caption: 'Turn on Share with the client.' },
      ],
    },
    {
      title: 'Sign off a daily log',
      steps: ['Open a daily log that says Daily log.', 'Read it over, then tap Sign off log at the bottom.'],
      tour: [
        { target: 'progresslogs.tabs', text: 'All', caption: 'Pick All to see every entry.', opens: true },
        { target: 'progresslogs.list', caption: 'Tap a daily log to open it.', opens: true },
        { target: 'progresslogs.signoff', caption: 'Tap Sign off log.', optional: true },
      ],
    },
  ],
  notes: [
    { title: 'Every number matches the list', body: 'Entries, From the team, Photos and Shared count the same range as the list under them.' },
    { title: 'Settling a dispute', body: 'Search a word like socket or the client name. Every entry is dated, with who wrote it and the photos taken that day.' },
  ],
};

export const ISSUES_HELP: PageHelpContent = {
  id: 'employer-job-issues',
  title: 'Issues',
  what: 'Everything raised on a job in one list: snags, defects, variations, questions for the client and delays. Each job has a punch list the client signs off at handover.',
  steps: [
    { title: 'Raise it', body: 'Tap Report issue, or let the team raise snags from site with photos.' },
    { title: 'Work the punch list', body: 'Open a job\'s Punch list, tick each snag off as it is fixed, and add new ones as you walk round.' },
    { title: 'Get it signed', body: 'Tap Get the client to sign it off. Variations get a price and go to the client to approve.' },
  ],
  tasks: [
    {
      title: 'Report an issue',
      steps: [
        'Tap Report issue.',
        'Pick the job, then what it is: Snag, Defect, Variation, Question (RFI), Delay or Other.',
        'Give it a title, how serious it is and where on site.',
        'Add who is on it, a due date and photos if you have them.',
        'Tap Report issue at the bottom.',
      ],
      tour: [
        { target: 'issues.report', caption: 'Tap Report issue.', opens: true },
        { target: 'issues.form-job', caption: 'Pick the job, then what kind of issue it is.' },
        { target: 'issues.submit', caption: 'Fill in the title, then tap Report issue.' },
      ],
    },
    {
      title: 'Work through a punch list and get it signed off',
      steps: [
        'On the job\'s card, tap Punch list.',
        'Tap the circle next to a snag when it is fixed. Tap it again to reopen it.',
        'Type a new snag in the box at the bottom and tap Add.',
        'When it is done, tap Get the client to sign it off. Add their name and email, or make a link to send yourself.',
      ],
      after: 'Anything still open is listed on the sign-off as outstanding. The signed copy is kept on Signatures.',
      tour: [
        { target: 'issues.punch', caption: 'Tap Punch list on the job.', opens: true },
        { target: 'issues.punch-items', caption: 'Tap the circle when a snag is fixed.' },
        { target: 'issues.punch-sign', caption: 'Then tap Get the client to sign it off.' },
      ],
    },
    {
      title: 'Turn a variation into a variation order',
      steps: [
        'Open the Variations tab and tap the variation.',
        'Put in the price change and what the extra work is.',
        'Tap Raise variation order. It goes into Job financials as Pending.',
        'Tap Send to the client to approve. When they sign, tap Add to the job value.',
      ],
      after: 'Once the order is approved the issue closes itself with a note of who approved it.',
      tour: [
        { target: 'issues.tabs', text: 'Variations', caption: 'Open the Variations tab.', opens: true },
        { target: 'issues.list', caption: 'Tap the variation.', opens: true },
        { target: 'issues.variation', caption: 'Put a price on it and tap Raise variation order.', optional: true },
      ],
    },
    {
      title: 'Move an issue on and resolve it',
      steps: [
        'Tap the issue.',
        'Under Where it is up to, pick In progress when work starts.',
        'When it is fixed, tap Resolve issue, say how, then Mark as resolved.',
      ],
      after: 'If a worker raised it, they see the outcome on their phone.',
      tour: [
        { target: 'issues.list', caption: 'Tap an issue to open it.', opens: true },
        { target: 'issues.status', caption: 'Move it on here as work starts.', optional: true },
        { target: 'issues.resolve', caption: 'When it is fixed, tap Resolve issue.', optional: true },
      ],
    },
  ],
  notes: [
    { title: 'Where did Quality & Snags go?', body: 'It was the same list filtered to snags. Old links now open here on the Snags & defects tab.' },
    { title: 'Still open, Resolved, Everything', body: 'The chips under the tabs pick which issues show. Still open is the default.' },
  ],
};

export const TESTING_HELP: PageHelpContent = {
  id: 'employer-testing-workflow',
  title: 'Testing',
  what: 'The certificates raised on each job, read straight from the certificate. Every reading is checked against the certificate’s own BS 7671 limits, so anything out of limit shows here without anyone retyping it.',
  steps: [
    { title: 'Your electrician tests as normal', body: 'They fill in the schedule of tests on the EICR, EIC or Minor Works in the Electrical Hub.' },
    { title: 'Link it to the job', body: 'Tap Link a certificate, pick the job and the certificate. Best matches come first.' },
    { title: 'Check the results', body: 'Each card shows circuits tested, anything out of limit and where the QS sign-off is.' },
  ],
  tasks: [
    {
      title: 'Link a certificate to a job',
      steps: [
        'Tap Link a certificate. From a job sheet, tap Certificates first and the job is already chosen.',
        'Pick the job if it asks.',
        'Find the certificate. Ones whose address or client match the job show Best match.',
        'Tap Link. Its results show on the job straight away.',
      ],
      after: 'Linking does not change the certificate. Remove from this job undoes it.',
      tour: [
        { target: 'testing.link', caption: 'Tap Link a certificate.', opens: true },
        { target: 'testing.link-job', caption: 'Pick the job.', optional: true },
        { target: 'testing.link-list', caption: 'Tap Link on the right certificate.' },
      ],
    },
    {
      title: 'Find readings that are out of limit',
      steps: [
        'Tap Needs attention.',
        'Tap a certificate. Circuits to look at come first.',
        'Each circuit shows its readings, which check failed, and any test not recorded.',
      ],
      after: 'The limits come from the certificate’s own checks: the device’s maximum Zs, the Table 64 insulation minimum and the RCD trip time.',
      tour: [
        { target: 'testing.tabs', text: 'Needs attention', caption: 'Tap Needs attention.', opens: true },
        { target: 'testing.list', caption: 'Tap a certificate.', opens: true, optional: true },
        { target: 'testing.circuits', caption: 'Out of limit circuits come first, with the reason.', optional: true },
      ],
    },
    {
      title: 'Check the instrument',
      steps: [
        'Open a certificate.',
        'Look at Instrument. If the serial matches your kit register, it shows the calibration date and says if it is overdue.',
      ],
      tour: [{ target: 'testing.list', caption: 'Tap a certificate, then look at Instrument.', opens: true, optional: true }],
    },
  ],
  notes: [
    { title: 'Where the old test log went', body: 'The hand-typed test list has gone. Results now come from the certificate itself, so there is one record, not two.' },
    { title: 'What the colours mean', body: 'Red is a reading outside its limit. Amber is a circuit with a core test not recorded yet. Green is a circuit within limits.' },
  ],
};

/** Quality & Snags merged into Issues (ELE-1967). Kept so old imports still work. */
export const QUALITY_HELP: PageHelpContent = ISSUES_HELP;

export const QS_REVIEWS_HELP: PageHelpContent = {
  id: 'employer-qs-reviews',
  title: 'QS reviews',
  what: 'Certificates your team sends for Qualifying Supervisor sign-off. Countersign each one, or send it back with reasons. The reasons are counted so you can see which mistakes keep coming back.',
  steps: [
    { title: 'Open what is waiting', body: 'Waiting lists the EICRs, EICs and Minor Works sent for sign-off, oldest first. Tap one to open it.' },
    { title: 'Check it', body: 'Read the summary, observations and test schedule, or tap View PDF. Add a comment against anything wrong.' },
    { title: 'Decide', body: 'Approve & countersign, or Return with reasons. The electrician is told why straight away.' },
  ],
  tasks: [
    {
      title: 'Approve and countersign a certificate',
      steps: [
        'On Waiting, tap the certificate.',
        'Check the details. Tap View PDF to see the certificate itself.',
        'Tap Approve & countersign.',
        'Check your name, sign in the box and add a comment if you like.',
        'Tap Confirm approval. Your countersignature goes on the PDF.',
      ],
      who: 'The owner, an admin manager or a team member with the QS role. Office managers can look but not sign.',
      tour: [
        { target: 'qsreviews.scope', text: 'Waiting', caption: 'Waiting shows what needs signing.', opens: true },
        { target: 'qsreviews.list', caption: 'Tap a certificate to open it.', opens: true, optional: true },
        { target: 'qsreviews.approve', caption: 'When it is right, tap Approve & countersign, then sign.', optional: true },
      ],
    },
    {
      title: 'Send a certificate back with reasons',
      steps: [
        'Open the certificate.',
        'Tap + Comment next to a circuit or observation to point at the exact problem.',
        'Tap Return with reasons and tick what is wrong, for example Missing test readings or Zs over the limit.',
        'Add a note if it helps, then tap Return certificate.',
      ],
      after: 'The electrician sees the reasons and your comments on their QS page, fixes the certificate and resubmits it.',
      tour: [
        { target: 'qsreviews.list', caption: 'Tap the certificate to open it.', opens: true, optional: true },
        { target: 'qsreviews.return', caption: 'Tap Return with reasons.', opens: true, optional: true },
        { target: 'qsreviews.reasons', caption: 'Tick what is wrong. These are counted in Common returns.', optional: true },
      ],
    },
    {
      title: 'See the mistakes that keep coming back',
      steps: [
        'Look at Common returns, under the numbers.',
        'It counts the reasons ticked over the last 20 decisions, for example Missing test readings 4 of the last 20.',
        'Use it to coach the team on the one thing that keeps going wrong.',
      ],
      tour: [{ target: 'qsreviews.common', caption: 'The reasons certificates come back for, most common first.', optional: true }],
    },
    {
      title: 'Fix it yourself',
      steps: ['Open the certificate.', 'Tap Edit cert. It opens in the normal certificate form, ready to change.'],
      tour: [
        { target: 'qsreviews.list', caption: 'Tap the certificate to open it.', opens: true, optional: true },
        { target: 'qsreviews.edit', caption: 'Tap Edit cert to open it in the certificate form.', optional: true },
      ],
    },
    {
      title: 'Print the review register',
      steps: ['Tap Export register at the top. It opens a printable record of every sign-off for an assessor.'],
      tour: [{ target: 'qsreviews.export', caption: 'Tap Export register for a printable record.', optional: true }],
    },
  ],
  notes: [
    {
      title: 'A QS who is not the owner',
      body: 'A team member with the QS role signs from Worker Tools, QS reviews, To review. The bell tells them when something is sent.',
    },
    {
      title: 'Team certificates',
      body: 'The owner and the principal QS also get a Team certificates tab: every certificate the team has made, to open and edit.',
    },
    {
      title: 'Nothing coming in?',
      body: 'Give someone the QS role in Team. Certificates only arrive here once the team sends them for sign-off.',
    },
  ],
};

export const PHOTO_GALLERY_HELP: PageHelpContent = {
  id: 'employer-photo-gallery',
  title: 'Photo gallery',
  what: 'Every photo from every job in one place: what the office uploads, and what the team takes on snags, progress notes and tasks.',
  steps: [
    { title: 'They arrive by themselves', body: 'A photo on a snag, a progress note or a task lands here with who took it and when.' },
    { title: 'Find the one you want', body: 'See photos by job or by day, and pick where they came from: Uploaded, Snags, Issues, Site diary or Tasks.' },
    { title: 'Use it', body: 'Open a photo to mark it up, share it with the client, download it or jump to the snag it belongs to.' },
  ],
  tasks: [
    {
      title: 'Upload a photo',
      steps: [
        'Tap Upload.',
        'Tap to select a photo, then pick Before, During, After, Completion or Issue.',
        'Pick the job. Tap Add current location to put it on the map.',
        'Tap Upload photo.',
      ],
      tour: [
        { target: 'photogallery.upload', caption: 'Tap Upload.', opens: true },
        { target: 'photogallery.upload-pick', caption: 'Tap here to pick the photo, then choose its stage.' },
        { target: 'photogallery.upload-save', caption: 'Tap Upload photo when it is ready.' },
      ],
    },
    {
      title: 'See only the team\'s snag photos',
      steps: ['Tap Snags in the row under the search.', 'Tap a photo, then Open the snag to see the issue it belongs to.'],
      tour: [
        { target: 'photogallery.filter', text: 'Snags', caption: 'Tap Snags.', opens: true },
        { target: 'photogallery.grid', caption: 'Tap a photo to open it.', optional: true },
      ],
    },
    {
      title: 'Mark up a photo',
      steps: [
        'Open the photo.',
        'Tap Mark up. Draw with the pen, or use an arrow, box or ring, in red, yellow, white or blue.',
        'Tap Save as a new photo. The original stays as it was; the copy is filed on the same job.',
      ],
      after: 'Share the marked-up copy with the client, or pick it when you add photos to a certificate.',
      tour: [
        { target: 'photogallery.grid', caption: 'Tap a photo to open it.', opens: true },
        { target: 'photogallery.markup', caption: 'Tap Mark up.', optional: true },
      ],
    },
    {
      title: 'Approve a photo and share it with the client',
      steps: [
        'Open a photo you uploaded (Uploaded in the row of sources).',
        'Tap Approve. A green tick shows on it.',
        'Tap Share with client. A blue eye shows on it.',
      ],
      tour: [
        { target: 'photogallery.filter', text: 'Uploaded', caption: 'Tap Uploaded.', opens: true },
        { target: 'photogallery.grid', caption: 'Tap a photo to open it.', opens: true },
        { target: 'photogallery.approve', caption: 'Tap Approve, then Share with client.', optional: true },
      ],
    },
    {
      title: 'Compare before and after',
      steps: ['Upload a Before and an After or Completion photo on the same job.', 'Tap Before & after, then tap the pair.'],
      tour: [{ target: 'photogallery.views', text: 'Before', caption: 'Tap Before & after.' }],
    },
  ],
  notes: [
    { title: 'Photo unavailable', body: 'Shown only when the file really is missing. Ask whoever took it to add it again.' },
    { title: 'Approve and share', body: 'Only photos uploaded here can be approved or shared one by one. Diary photos are shared with their diary entry.' },
  ],
};

export const KIT_REGISTER_HELP: PageHelpContent = {
  id: 'employer-kit-register',
  title: 'The kit register',
  what: 'Every company tool and tester, who has it (a person or a van), when its PAT test or calibration is due, and what each van carries.',
  steps: [
    { title: 'Add the kit', body: 'Testers, drills, ladders, anything the firm owns. Add the serial number and barcode for testers.' },
    { title: 'Issue it', body: 'Give each item to a person or put it on a van. They confirm they have it in Worker Tools, so you always know who has the Megger.' },
    { title: 'Log each test', body: 'Record each PAT test or calibration. The next due date updates itself and the holder is reminded before it runs out.' },
    { title: 'Stock the vans', body: 'In Van stock, put the materials each van carries. The driver logs what they use on a job, and a draft order is made when it runs low.' },
  ],
  tasks: [
    {
      title: 'Add kit to the register',
      steps: [
        'Tap Add kit.',
        'Type the equipment name and pick the category. Both are required.',
        'Add the status, serial number, barcode and purchase details.',
        'Add the last PAT and calibration dates and when they are next due.',
        'Tap Add equipment.',
      ],
      tour: [{ target: 'kit.add', caption: 'Tap Add kit to put an item on the register.' }],
    },
    {
      title: 'Issue kit to a person or a van',
      steps: [
        'Tap the item.',
        'Under Who has it, tap Issue (or Move to someone else).',
        'Pick A person or A van, then tap who.',
        'Add a note if it helps, then tap Issue.',
      ],
      who: 'Owner, admins and office managers.',
      after:
        'They get a notification and confirm in Worker Tools, My equipment. Until then the item shows Waiting for them to confirm. Kit on a van is held by whoever drives it.',
      tour: [
        { target: 'kit.list', caption: 'Tap the item.', opens: true },
        { target: 'kit.holder', caption: 'Who has it shows the holder and whether they have confirmed.' },
        { target: 'kit.issue', caption: 'Tap Issue, pick a person or a van, then tap Issue.', opens: true },
        { target: 'kit.issue-mode', caption: 'Choose a person or a van.', optional: true },
      ],
    },
    {
      title: 'Take kit back into the office',
      steps: ['Tap the item.', 'Under Who has it, tap Back in the office.'],
      after: 'It comes off their name and they are told. The history keeps who had it.',
      tour: [
        { target: 'kit.list', caption: 'Tap the item.', opens: true },
        { target: 'kit.holder', caption: 'Tap Back in the office.' },
      ],
    },
    {
      title: 'Deal with a fault or lost report',
      steps: [
        'Open the notification, or tap Faulty or lost above the list.',
        'Tap the item. The report, who sent it and the photo are at the top.',
        'Once it is fixed or found, tap Fixed, back in use (or Found it).',
      ],
      after: 'The holder is told it is back in use. A failed test also marks it Under repair.',
      tour: [
        { target: 'kit.filters', text: 'Faulty', caption: 'Tap Faulty or lost.', opens: true },
        { target: 'kit.list', caption: 'Tap the item to see the report and photo.' },
      ],
    },
    {
      title: 'Log a PAT test or calibration',
      steps: [
        'Tap the item.',
        'Under Log a test, pick PAT test or Calibration, then Passed or Failed.',
        'Set the date tested and when it is next due (12 months on by default).',
        'For a calibration, add the certificate number.',
        'Tap Log PAT test or Log calibration.',
      ],
      after: 'A pass sets the next due date. A fail marks it Under repair until it is fixed and tested again.',
      tour: [
        { target: 'kit.list', caption: 'Tap the item.', opens: true },
        { target: 'kit.log-test', caption: 'Pick the test and the result, set the dates, then tap Log.' },
      ],
    },
    {
      title: 'Find kit by scanning it',
      steps: ['Tap the barcode button in the search box.', 'Point the camera at the barcode or serial label.', 'The item opens if it is on the register.'],
      tour: [{ target: 'kit.filters', caption: 'Use the barcode button in the search box above to scan an item.' }],
    },
    {
      title: 'Stock a van',
      steps: [
        'Tap Van stock at the top, then the van.',
        'Tap Add item and search your price book.',
        'Enter how many are on the van, the level to reorder at and the level to fill back up to.',
        'Pick the usual supplier if the price book does not say, and scan the barcode on the box.',
        'Tap Add to van.',
      ],
      after:
        'When the driver logs what they used and it drops to the reorder level, a draft order is made in Purchase orders for you to check and send. Nothing goes to the supplier on its own. Booking the delivery in tops the van back up.',
      tour: [
        { target: 'kit.tabs', text: 'Van stock', caption: 'Tap Van stock.', opens: true },
        { target: 'stock.vans', caption: 'Tap the van.', opens: true, optional: true },
        { target: 'stock.add', caption: 'Tap Add item and pick from your price book.', optional: true },
      ],
    },
    {
      title: 'See what came off a van onto a job',
      steps: ['Tap Van stock, then the van.', 'Recent activity lists what was used, on which job and by whom.'],
      after: 'Materials used from a van count towards that job\'s material cost at your buy price. Office managers see the quantities, not the cost.',
      tour: [
        { target: 'kit.tabs', text: 'Van stock', caption: 'Tap Van stock.', opens: true },
        { target: 'stock.vans', caption: 'Tap the van.', opens: true, optional: true },
        { target: 'stock.activity', caption: 'Recent activity shows what was used on each job.', optional: true },
      ],
    },
  ],
  notes: [
    { title: 'Why calibration matters', body: 'A tester out of calibration undermines every certificate it was used on. Keep the certificate number with each calibration.' },
    { title: 'Reminders', body: 'You get a reminder 30 days before a PAT test or calibration is due. Whoever holds the item gets one 14 days before, on the day, and if it runs out.' },
    { title: 'Money', body: 'Workers and office managers never see buy prices or what the kit cost. Van stock shows quantities only.' },
  ],
};
