import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for Finance → Job financials and Reports (ELE-1980).
   Every step is written from the screen it describes: button text, tabs and
   role checks match JobFinancialsSection and ReportsSection.
   ========================================================================== */

export const JOB_FINANCIALS_HELP: PageHelpContent = {
  id: 'employer-job-financials',
  title: 'Job financials',
  what: 'Profit per job: what you invoiced against labour, materials, expenses and other costs. Budgets sit alongside so you can see a job going wrong early.',
  steps: [
    {
      title: 'Find the job',
      body: 'Use the tabs to see jobs losing money, over budget or over their quoted hours. Tap a job to open it.',
    },
    {
      title: 'Read where the money went',
      body: 'Value, costs and invoices on one sheet. Labour comes from approved timesheets, materials from purchase orders, expenses from approved claims.',
    },
    {
      title: 'Add what is missing',
      body: 'Record a cost the app cannot see, correct the labour with a reason, set a budget or add a variation.',
    },
  ],
  tasks: [
    {
      title: 'Find the jobs losing money',
      steps: [
        'Tap the Losing money tab. Over budget and Over quoted hours work the same way.',
        'Tap a job to open its profit sheet.',
        'Check Costs: labour, materials, expenses and other. Tap Labour to see the hours behind it.',
      ],
      who: 'Owner and admins.',
      tour: [
        { target: 'jobfin.tabs', text: 'Losing money', caption: 'Tap Losing money to see only the jobs costing more than they bring in.', opens: true },
        { target: 'jobfin.list', caption: 'Tap a job to open its profit sheet.', opens: true },
        { target: 'jobfin.labour', caption: 'Labour is approved hours at each person’s cost rate. Tap Labour to check it.' },
      ],
    },
    {
      title: 'Record a cost the app cannot see',
      steps: [
        'Tap the job, then Record cost.',
        'Pick Materials, Equipment, Overheads or Other.',
        'Enter the Amount (£), the Date of the cost and a note if you like.',
        'Tap Record cost. It shows in the job’s Cost log.',
      ],
      after:
        'Do not record labour from approved timesheets, purchase orders or approved expense claims here. Those are added to the job by themselves.',
      who: 'Owner and admins.',
      tour: [
        { target: 'jobfin.list', caption: 'Tap the job the cost belongs to.', opens: true },
        { target: 'jobfin.record-cost', caption: 'Tap Record cost, pick the type and enter the amount.' },
      ],
    },
    {
      title: 'Correct the labour on a job',
      steps: [
        'Tap the job, then Labour.',
        'Type the figure in Set labour cost to (£).',
        'Give a reason. It is required and kept in the job’s log.',
        'Tap Save labour. To undo it, tap Go back to timesheet labour.',
      ],
      who: 'Owner and admins.',
      tour: [
        { target: 'jobfin.list', caption: 'Tap the job.', opens: true },
        { target: 'jobfin.labour', caption: 'Tap Labour, set the figure and give a reason.' },
      ],
    },
    {
      title: 'Add and approve a variation',
      steps: [
        'Tap the job, then Add variation.',
        'Describe the extra work and enter the Value (£).',
        'Tap Add variation. It shows under Variation orders as Pending.',
        'Tap Approve on it when the client agrees. Only approved variations add to the contract value.',
      ],
      who: 'Owner and admins.',
      tour: [
        { target: 'jobfin.list', caption: 'Tap the job.', opens: true },
        { target: 'jobfin.add-variation', caption: 'Tap Add variation, describe it and give the value.' },
      ],
    },
    {
      title: 'Set a budget',
      steps: ['Tap the job, then Edit budget.', 'Enter the figures you plan to spend.', 'Tap Save Budget.'],
      after: 'The budget is your own plan. It flags Over budget but is never used to work out profit.',
      who: 'Owner and admins.',
      tour: [
        { target: 'jobfin.list', caption: 'Tap the job.', opens: true },
        { target: 'jobfin.edit-budget', caption: 'Tap Edit budget and enter what you plan to spend.' },
      ],
    },
    {
      title: 'Set what an hour of each person costs',
      steps: [
        'Tap Cost rates at the top.',
        'Type a rate for each person: pay plus NI, pension, van and tools. Leave it blank to use their pay rate.',
        'Tap Save on each row you change, then Done.',
      ],
      after: 'Job labour is approved hours times this rate, overtime included. The team never sees it.',
      who: 'Owner and admins.',
      tour: [{ target: 'jobfin.cost-rates', caption: 'Tap Cost rates to set what an hour of each person costs.', optional: true }],
    },
  ],
  notes: [
    {
      title: 'Who sees it',
      body: 'Job profit, labour cost and budgets are for the owner and admins. Office managers see a note instead.',
    },
    {
      title: 'Same figures everywhere',
      body: 'Gross profit is invoiced less costs, the same maths as Reports and Accounts. Draft invoices are not counted.',
    },
  ],
};

export const REPORTS_HELP: PageHelpContent = {
  id: 'employer-reports',
  title: 'Reports',
  what: 'Invoiced, costs and gross profit for a period, who owes you, and which jobs make money. The same figures as Accounts and Job financials.',
  steps: [
    { title: 'Pick a period', body: 'This month, last month, this quarter, this year, the last 12 months or all time.' },
    { title: 'Read the figures', body: 'Profit and loss, debtor aging and job profitability update for the period you pick.' },
    { title: 'Act on it', body: 'Tap a debtor row to chase overdue invoices, tap a job to open its profit, or export the profit and loss.' },
  ],
  tasks: [
    {
      title: 'Get a profit and loss for a period',
      steps: [
        'Tap the period along the top, for example This quarter.',
        'Read the Profit & loss card: invoiced, materials, expenses, labour and gross profit.',
        'Tap Export CSV to download it for your accountant.',
      ],
      who: 'Owner and admins. Office managers see invoice figures only, and Export CSV stays off.',
      tour: [
        { target: 'reports.periods', caption: 'Pick the period you want the figures for.' },
        { target: 'reports.pnl', caption: 'The profit and loss for that period.', optional: true },
        { target: 'reports.export', caption: 'Tap Export CSV to download it.' },
      ],
    },
    {
      title: 'Chase who owes you',
      steps: [
        'Scroll to Debtor aging. Unpaid invoices are split by how late they are.',
        'Tap a row with money in it to open your overdue invoices in Quotes & Invoices.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [{ target: 'reports.debtors', caption: 'Tap a row with money in it to open the overdue invoices.' }],
    },
    {
      title: 'See which jobs make money',
      steps: [
        'Scroll to Job profitability. It shows your top 10 jobs by gross profit.',
        'Tap a job to open it in Job financials.',
      ],
      who: 'Owner and admins.',
      tour: [{ target: 'reports.jobs', caption: 'Tap a job to see where its money went.', optional: true }],
    },
  ],
  notes: [
    {
      title: 'What counts',
      body: 'Invoiced means sent, overdue or paid. Drafts are left out. Expense claims are only a cost once approved.',
    },
  ],
};

/* Signatures (ELE-1993): links, chasing, signed copies and paper signatures. */
export const SIGNATURES_HELP: PageHelpContent = {
  id: 'employer-signatures',
  title: 'Signatures',
  what: (
    <>
      Every document your clients have been asked to sign, for the whole office: quotes,
      variations, handovers, certificates and contracts. The client reads the actual document on
      their phone and signs it with their finger. If they signed a printed copy instead, you record
      it here with a photo of the paper.
    </>
  ),
  steps: [
    {
      title: 'Send a document',
      body: 'Use Request signature here, or Get it signed on a quote, a variation, a job or a contract. You see exactly what the client will see before you send.',
    },
    {
      title: 'Watch it come back',
      body: 'Each request shows whether it has been sent, opened, signed or declined. Chase by email once a day, or copy the link and text it.',
    },
    {
      title: 'Keep the signed copy',
      body: 'Download the signed copy: the document plus a signature page with the name, time, IP address, device and a fingerprint of the version signed.',
    },
  ],
  notes: [
    {
      title: 'Variations',
      body: 'A signed variation does not change the job value on its own. Open it and tap Add to job value when you are ready.',
    },
    {
      title: 'Links',
      body: 'A link works once, runs out after the days you choose, and you can cancel it. If the document changes after you send it, the client cannot sign the old version.',
    },
    {
      title: 'Signed on paper',
      body: 'If the client signed a printed copy, record it with a photo or PDF of the paper. It always shows as Signed on paper, recorded by whoever added it, with the scan attached. It is never shown as a digital signature, and once recorded it cannot be changed or deleted.',
    },
  ],
  tasks: [
    {
      title: 'Send a variation to sign',
      steps: [
        'Tap Request signature.',
        'Under What they sign, tap Variation.',
        'Pick the job. Say what is changing, choose Extra or Saving and type the price change.',
        'Under Who signs, add the name and email. Leave the email blank to get a link to text yourself. Pick how long the link works: 7, 14 or 30 days.',
        'Check What they will see, then tap Send for signature (or Create signing link).',
      ],
      after: 'You get a notification when it is signed, and it shows in the Signed tab.',
      tour: [
        { target: 'signatures.request', caption: 'Tap Request signature.', opens: true },
        { target: 'signatures.type', text: 'Variation', caption: 'Tap Variation.', opens: true },
        {
          target: 'signatures.send',
          caption: 'Pick the job, the change and who signs, then tap Send for signature.',
        },
      ],
    },
    {
      title: 'Record a paper signature',
      steps: [
        'Open the request from the Waiting tab and tap Record a paper signature. (No request yet? Tap Request signature, then Signed on paper, and pick the document.)',
        'Check the name of the person who signed and the date they signed. The date cannot be in the future.',
        'Tap Take a photo to photograph the signed page, or Choose a file for a PDF scan.',
        'Tick I confirm this is the client\'s signature on this document, then tap Record paper signature.',
      ],
      after:
        'It moves to Signed and says Signed on paper, recorded by you. The signed copy has the document, a signature page and the scan. Cancelled or expired links cannot be recorded; record it from the document instead.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'signatures.request', caption: 'Tap Request signature.', opens: true },
        { target: 'signatures.mode', text: 'Signed on paper', caption: 'Tap Signed on paper.', opens: true },
        { target: 'signatures.type', caption: 'Pick what they signed, then choose the document.', optional: true },
        { target: 'signatures.paper-upload', caption: 'Take a photo of the signed page, or choose a PDF.' },
        { target: 'signatures.paper-declare', caption: 'Tick to confirm it is their signature.' },
        { target: 'signatures.paper-save', caption: 'Tap Record paper signature.' },
      ],
    },
    {
      title: 'Chase a signature',
      steps: [
        'Open the Waiting tab and tap the request.',
        'Tap Chase by email. You can chase once every 24 hours, up to 6 sends.',
        'Or tap Copy link or Share and send it by text or WhatsApp.',
      ],
      after: 'No email on the request? The button says No email to chase, so use Copy link.',
      tour: [
        { target: 'signatures.tabs', text: 'Waiting', caption: 'Open the Waiting tab.', opens: true },
        { target: 'signatures.list', caption: 'Tap the request.', opens: true },
        { target: 'signatures.chase', caption: 'Tap Chase by email, or copy the link and text it.' },
      ],
    },
    {
      title: 'Add a signed variation to the job value',
      steps: [
        'A green bar shows signed variations still to add. Tap it, or open the request from the Signed tab.',
        'Tap Add £… to job value.',
        'The job value goes up (or down for a saving) and the variation is approved in Job financials.',
      ],
      after: 'Nothing changes on the job until you tap it, so you decide when.',
      tour: [
        { target: 'signatures.tabs', text: 'Signed', caption: 'Signed requests are here.', opens: true },
        { target: 'signatures.list', caption: 'Tap a signed variation.', opens: true },
        { target: 'signatures.apply', caption: 'Tap Add to job value.' },
      ],
    },
    {
      title: 'Download the signed copy',
      steps: [
        'Open the request from the Signed tab.',
        'Tap Download signed copy. You get the document with a signature page: name, time, IP address, device and a fingerprint of the version signed.',
        'For a paper signature the page says Signed on paper, who recorded it and when, and the scan of the paper follows it.',
      ],
    },
    {
      title: 'Cancel a link',
      steps: ['Open the request.', 'Tap Cancel this link, then Cancel link. It stops working straight away.'],
    },
  ],
};
