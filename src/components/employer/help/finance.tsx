import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for Finance (ELE-1980): Quotes & invoices, Accounts, Tenders
   and the Finance hub. Every step names the real buttons on screen; the
   tours point at data-help="<page>.<target>" attributes on those controls.
   ========================================================================== */

export const QUOTES_HELP: PageHelpContent = {
  id: 'employer-quotes',
  title: 'Quotes and invoices',
  what: 'Every quote and invoice for the firm in one list. Write a quote, send it for the customer to accept online, turn it into an invoice, then chase it until it is paid.',
  steps: [
    {
      title: 'Write the quote',
      body: 'Tap New quote. Fill in the client, labour and materials, then Send. The customer gets a PDF and a link to accept it.',
    },
    {
      title: 'They accept, you invoice',
      body: 'When the customer accepts you get a notification. Open the quote and tap Convert to invoice.',
    },
    {
      title: 'Get paid',
      body: 'Send the invoice, chase it from the Overdue tab, and tap Mark paid when the money lands.',
    },
  ],
  tasks: [
    {
      title: 'Create and send a quote',
      steps: [
        'Tap New quote.',
        'Client: add the client name (needed) and their email (needed to send it). Pick the deposit under Deposit on acceptance.',
        'Tap Next. Add labour on Labour, then materials on Materials (Pick from the price book or type a line).',
        'On Review, tap Send. Or Save draft to finish it later.',
      ],
      after:
        'Send emails the customer a PDF and a link to view, sign and accept it. With no email on the quote it is saved as a draft instead.',
      tour: [
        { target: 'quotes.new-quote', caption: 'Tap New quote.', opens: true },
        {
          target: 'quotes.deposit',
          caption: 'Fill in the client, then choose a deposit for when they accept online.',
        },
        {
          target: 'quotes.next',
          caption: 'Tap Next through Labour and Materials. On Review, tap Send.',
        },
      ],
    },
    {
      title: 'Take a deposit',
      steps: [
        'In the quote, under Deposit on acceptance, pick Percentage or Fixed amount and type it. Firm default uses the deposit set in Settings.',
        'Send the quote.',
        'When the customer accepts online they are asked to pay the deposit by card before the job is booked.',
        'Open the quote: it shows Waiting for the deposit, then Deposit paid by card.',
      ],
      after:
        'The card payment needs card payments switched on for the firm (Settings, Card payments). Only the account owner can switch them on.',
    },
    {
      title: 'Send a draft quote, or send it again',
      steps: [
        'Tap the quote in the list.',
        'On a draft, tap Send email. If there is no email on it, type one and send.',
        'On a sent quote, use Get the customer link to copy the accept link and text it yourself.',
      ],
      tour: [
        { target: 'quotes.tabs', text: 'Quotes', caption: 'Open the Quotes tab.', opens: true },
        { target: 'quotes.list', caption: 'Tap a quote to open it.', opens: true },
        { target: 'quotes.send-email', caption: 'On a draft, tap Send email.' },
      ],
    },
    {
      title: 'Turn an accepted quote into an invoice',
      steps: [
        'Open the quote. Accepted ones show Customer accepted.',
        'If they agreed by phone, open the sent quote and tap Approve.',
        'Tap Convert to invoice. The client, items, VAT and CIS come across.',
        'Check it, then tap Send, or Save Draft.',
      ],
      tour: [
        { target: 'quotes.tabs', text: 'Quotes', caption: 'Open the Quotes tab.', opens: true },
        { target: 'quotes.list', caption: 'Tap the accepted quote.', opens: true },
        { target: 'quotes.convert', caption: 'Tap Convert to invoice, check it, then send.' },
      ],
    },
    {
      title: 'Send an invoice and get paid by card',
      steps: [
        'Open the invoice from the Invoices tab.',
        'Tap Send email. If there is no email on it, type one.',
        'With card payments on, the email carries a Pay now button and the invoice marks itself paid when they pay.',
      ],
      after:
        'Card payments off? The invoice still goes, with your bank details only. The owner sees Turn on card payments on the invoice.',
      tour: [
        { target: 'quotes.tabs', text: 'Invoices', caption: 'Open the Invoices tab.', opens: true },
        { target: 'quotes.list', caption: 'Tap an invoice to open it.', opens: true },
        { target: 'invoices.send-email', caption: 'Tap Send email.', optional: true },
        { target: 'invoices.card', caption: 'This shows whether the customer can pay by card.', optional: true },
      ],
    },
    {
      title: 'Chase an overdue invoice and mark it paid',
      steps: [
        'Open the Overdue tab. It shows how much is 1 to 30, 31 to 60, 61 to 90 and 90+ days late.',
        'Tap Chase on the invoice. The client is emailed a reminder with a secure payment link. No email on file? You are asked for one.',
        'When the money lands, open the invoice and tap Mark paid.',
      ],
      tour: [
        { target: 'quotes.tabs', text: 'Overdue', caption: 'Open the Overdue tab.', opens: true },
        { target: 'quotes.chase', caption: 'Tap Chase to email a reminder with a payment link.' },
      ],
    },
  ],
  notes: [
    {
      title: 'Overdue',
      body: 'An invoice is overdue the day after its due date if it is not paid. Drafts are never overdue and never chased.',
    },
    {
      title: 'From a job',
      body: 'Opened from a job, this page shows that job’s quotes and invoices only, with a bar to go back to the job.',
    },
  ],
};

export const ACCOUNTS_HELP: PageHelpContent = {
  id: 'employer-accounts',
  title: 'Accounts',
  what: 'Profit and loss and a ledger of money in and out for any period. The same figures as Reports and Job financials.',
  steps: [
    { title: 'Pick a period', body: 'This month, last month, this quarter, this year, the last 12 months or all time.' },
    {
      title: 'Read the P&L',
      body: 'Invoiced, less materials, expenses, labour and other job costs, gives gross profit and margin.',
    },
    { title: 'Export it', body: 'P&L CSV, Ledger CSV or PDF, for your accountant or for Xero, Sage or QuickBooks.' },
  ],
  tasks: [
    {
      title: 'Check this month’s profit',
      steps: [
        'Tap This month in the period row.',
        'Stay on Profit & loss. Read Invoiced, Total costs and Gross profit.',
        'The Cash card shows what was paid in, what is still owed and what is overdue.',
      ],
      tour: [
        { target: 'accounts.periods', text: 'This month', caption: 'Pick the period.', opens: true },
        { target: 'accounts.views', text: 'Profit', caption: 'Profit & loss shows invoiced, costs and gross profit.' },
      ],
      who: 'Owner and admins. Office managers see a note instead.',
    },
    {
      title: 'See every payment in and out',
      steps: [
        'Pick the period.',
        'Tap Ledger. Paid invoices, purchase orders, expense claims, approved timesheets and job costs are listed as they happened.',
      ],
      tour: [{ target: 'accounts.views', text: 'Ledger', caption: 'Tap Ledger to see each payment.', opens: true }],
      who: 'Owner and admins.',
    },
    {
      title: 'Send the figures to your accountant',
      steps: [
        'Pick the period.',
        'Tap P&L CSV, Ledger CSV or PDF. The file downloads.',
      ],
      tour: [{ target: 'accounts.export', caption: 'Pick P&L CSV, Ledger CSV or PDF.' }],
      who: 'Owner and admins.',
    },
  ],
  notes: [
    {
      title: 'What counts',
      body: 'Invoiced counts sent, overdue and paid invoices, never drafts. Labour is gross pay from approved timesheets, before PAYE, NI and pension.',
    },
    {
      title: 'Not a payroll package',
      body: 'Elec-Mate is not an accounting or payroll package. Use the exports, or Accounting to send invoices to your books.',
    },
  ],
};

export const TENDERS_HELP: PageHelpContent = {
  id: 'employer-tenders',
  title: 'Tenders',
  what: 'Find public sector and commercial work to bid on, and keep every bid you are working on in one pipeline: open, bidding, then won or lost.',
  steps: [
    { title: 'Say what you bid for', body: 'Tap What we bid for once: where you work, the kind of work and the contract size. Tenders that fit show under Matches for you, on Overview, and in a Monday round-up.' },
    { title: 'Start a bid', body: 'Tap Start bid on a match, or use Discover to search the public tender sources by postcode. Track tender adds one you heard about. Open a tender to copy its pre-qualification answers, filled from your firm records.' },
    { title: 'Price it', body: 'Open the tender and tap AI estimate. Add the drawings and specs and it drafts labour, materials and hazards.' },
    { title: 'Bid and record the result', body: 'Tap Mark submitted when you send it, then Won or Lost. A won tender converts to a job.' },
  ],
  tasks: [
    {
      title: 'Get tenders that fit sent to you',
      steps: [
        'Tap What we bid for.',
        'Add your base postcode and how far you travel, or tick regions.',
        'Pick the work and contract size, tick the accreditations you hold, then tap Save.',
        'Matches show at the top of this page and on Overview. New ones arrive in a Monday notification.',
      ],
      tour: [{ target: 'tenders.matches', caption: 'Tenders that fit what you bid for land here.' }],
    },
    {
      title: 'Find tenders near you',
      steps: [
        'Tap Discover.',
        'Type a postcode and tap the search button. Pick 10, 25, 50 or 100 miles.',
        'Tap a result to read it, then Start tender to track it.',
        'Check the details and tap Track tender.',
      ],
      tour: [{ target: 'tenders.discover', caption: 'Tap Discover to search by postcode.', opens: true }],
    },
    {
      title: 'Track a tender you already have',
      steps: [
        'Tap Track tender.',
        'Fill in the tender title and the client (both needed), then the value and submission deadline if you have them.',
        'Tap Track tender to save it to the Open tab.',
      ],
      tour: [{ target: 'tenders.track', caption: 'Tap Track tender to add one by hand.' }],
    },
    {
      title: 'Get an AI estimate',
      steps: [
        'Open a tender from the Open tab.',
        'Tap AI estimate.',
        'Add the tender documents, then tap Generate estimate.',
        'The estimate appears under AI estimates, in the right-hand column on a computer and under Your bids on a phone.',
      ],
      tour: [
        { target: 'tenders.tabs', text: 'Open', caption: 'Open tenders live here.', opens: true },
        { target: 'tenders.list', caption: 'Tap a tender, then AI estimate.', opens: true },
      ],
    },
    {
      title: 'Record a bid and the result',
      steps: [
        'Open the tender and tap Mark submitted. It moves to Bidding.',
        'When you hear back, open it and tap Won or Lost.',
        'On a won tender, tap Convert to job.',
      ],
      tour: [
        { target: 'tenders.tabs', text: 'Bidding', caption: 'Bids you have sent sit in Bidding.', opens: true },
        { target: 'tenders.list', caption: 'Tap one, then Won or Lost.', opens: true },
      ],
    },
  ],
};

export const FINANCE_HUB_HELP: PageHelpContent = {
  id: 'employer-finance-hub',
  title: 'Finance',
  what: 'Where the money pages live: quotes and invoices, costs, reports and the link to your accounting package. Every figure here matches the page it opens.',
  steps: [
    { title: 'Read the top line', body: 'Owed to you, overdue, paid in this month and open quotes. Tap one to open the list behind it.' },
    { title: 'Open a page', body: 'Quote, invoice and chase in Quotes & Invoices. Costs in Expenses and Purchase orders.' },
    { title: 'Check the result', body: 'Accounts and Reports show profit for a period. Job financials shows it per job.' },
  ],
  notes: [
    {
      title: 'Outstanding',
      body: 'The unpaid balance on sent and overdue invoices. Drafts and paid invoices are never counted.',
    },
  ],
};
