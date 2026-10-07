import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   In-app help for the Clients area, Smart Docs and Settings (ELE-1980).
   Every step is written from the screen it describes: button labels are the
   real ones. Tours point at data-help="<page>.<target>" on those controls.
   ========================================================================== */

export const CLIENTS_HELP: PageHelpContent = {
  id: 'employer-clients',
  title: 'Clients',
  what: 'Every customer in one place, with what they have paid, what they owe, open quotes, jobs and certificates. One record per customer for the whole firm.',
  steps: [
    {
      title: 'Add or find the client',
      body: 'Tap Add client, or search by name, company or email. Converting a lead also adds them here.',
    },
    {
      title: 'Open their record',
      body: 'Tap a client to see paid, outstanding and open quotes, plus their quotes, invoices, jobs and certificates.',
    },
    {
      title: 'Act from the record',
      body: 'Call, email, start a quote or job already filled in, share their portal, and keep follow-ups and notes.',
    },
  ],
  tasks: [
    {
      title: 'Add a client',
      steps: [
        'Tap Add client.',
        'Type the client name. Company, email, phone, address and notes are optional.',
        'Tap Add client at the bottom.',
      ],
      after: 'They show in the list straight away and in the client picker on quotes and jobs.',
      tour: [
        { target: 'clients.add', caption: 'Tap Add client.', opens: true },
        { target: 'clients.add-save', caption: 'Fill in the name, then tap Add client to save.' },
      ],
    },
    {
      title: 'See what a client owes',
      steps: [
        'Tap the client in the list. The amount due shows in amber on the right.',
        'The record opens with Lifetime paid, Outstanding and Open quotes at the top.',
        'Scroll to Invoices and tap one to open it.',
      ],
      tour: [
        { target: 'clients.list', caption: 'Tap a client to open their record.', opens: true },
        { target: 'clients.actions', caption: 'Paid, outstanding and open quotes sit above these buttons.' },
      ],
    },
    {
      title: 'Start a quote or job for them',
      steps: [
        'Open the client.',
        'Tap New quote or New job.',
        'Their name is filled in for you (and email, phone and address on a quote). Finish it as normal.',
      ],
      tour: [
        { target: 'clients.list', caption: 'Open the client first.', opens: true },
        { target: 'clients.new-quote', caption: 'Tap New quote or New job. Their details come with it.' },
      ],
    },
    {
      title: 'Share their portal',
      steps: [
        'Open the client.',
        'In the Client portal card, tap Create portal link the first time.',
        'Then Copy, Share, WhatsApp, Email or show the QR code.',
      ],
      after: 'WhatsApp needs a mobile number on the record, Email needs an email address.',
      tour: [
        { target: 'clients.list', caption: 'Open the client first.', opens: true },
        { target: 'clients.portal', caption: 'Create their link here, then copy or send it.' },
      ],
    },
    {
      title: 'Keep a follow-up or note',
      steps: [
        'Open the client and scroll to Follow-ups.',
        'Type it in Add a follow-up, pick a date if you want, then tap Add. Tick it when done.',
        'Under Activity, pick Note, Call, Email or Meeting, type what happened and tap Log.',
      ],
    },
    {
      title: 'Remove a client',
      steps: [
        'Open the client and scroll to the bottom.',
        'Tap the bin, then Delete.',
      ],
      after:
        'A client with any quote, invoice, job or certificate cannot be deleted. That keeps the history together for the whole firm.',
    },
  ],
  notes: [
    {
      title: 'Messages',
      body: 'A purple pill means the client has written to you from their portal. Open them to read and reply.',
    },
    {
      title: 'Who sees the totals',
      body: 'Office managers see how many clients owe money, not the firm-wide £ totals. Each client still shows their own balance so it can be chased.',
    },
  ],
};

export const LEADS_HELP: PageHelpContent = {
  id: 'employer-leads',
  title: 'Leads',
  what: 'Every enquiry from first contact to won, before it becomes a client. Requests from your quote page land here on their own.',
  steps: [
    {
      title: 'Get leads in',
      body: 'Share your quote page so requests arrive by themselves, or tap Add lead for a phone call or a referral.',
    },
    {
      title: 'Follow up',
      body: 'Open a lead and let Mate draft a text or email. Sending a follow-up moves a New lead to Contacted.',
    },
    {
      title: 'Win it',
      body: 'Move the stage as it goes. Convert to client marks it Won and adds them to Clients, ready to quote.',
    },
  ],
  tasks: [
    {
      title: 'Add a lead by hand',
      steps: [
        'Tap Add lead.',
        'Type the name or company. Contact, email, phone, source, estimated value and notes are optional.',
        'Tap Add lead at the bottom. It starts as New.',
      ],
      tour: [{ target: 'leads.add', caption: 'Tap Add lead to log an enquiry.' }],
    },
    {
      title: 'Follow up with Mate',
      steps: [
        'Tap the lead.',
        'Under Follow up with Mate, tap Text or Email. Mate writes a draft you can edit.',
        'Tap Send text or Send email. Your phone opens the message ready to send, or tap Copy.',
      ],
      after: 'Sending moves a New lead to Contacted for you.',
      tour: [
        { target: 'leads.list', caption: 'Tap a lead to open it.', opens: true },
        { target: 'leads.followup', caption: 'Tap Text or Email and Mate drafts the message.' },
      ],
    },
    {
      title: 'Move a lead along',
      steps: [
        'Open the lead.',
        'Under Move stage, pick New, Contacted, Quoted, Won or Lost.',
        'Use the tabs at the top to see each stage.',
      ],
      tour: [
        { target: 'leads.tabs', caption: 'Each tab is a stage. All shows everything.' },
        { target: 'leads.list', caption: 'Open a lead to change its stage.', opens: true },
        { target: 'leads.stage', caption: 'Pick the new stage here. It saves straight away.' },
      ],
    },
    {
      title: 'Turn a lead into a client and quote',
      steps: [
        'Open the lead and tap Convert to client.',
        'It is marked Won and added to Clients (no duplicate if you tap twice).',
        'Open it again and tap Write a quote. The quote opens with their name, email and phone.',
      ],
      tour: [
        { target: 'leads.list', caption: 'Open the lead you have won.', opens: true },
        { target: 'leads.convert', caption: 'Tap Convert to client, then Write a quote.' },
      ],
    },
  ],
  notes: [
    {
      title: 'Win rate',
      body: 'Won divided by everything decided (won plus lost). Open leads do not count against you.',
    },
  ],
};

export const CLIENTS_HUB_HELP: PageHelpContent = {
  id: 'employer-clients-hub',
  title: 'Clients',
  what: 'Where work comes in and customers are kept. The figures are the same ones Finance uses, so they always match.',
  steps: [
    {
      title: 'Get work',
      body: 'Quote page brings requests in. They land in Leads.',
    },
    {
      title: 'Keep the customer',
      body: 'Win a lead and it becomes a client, with their quotes, invoices, jobs and balance on one record.',
    },
    {
      title: 'Let them see it',
      body: 'Client portal gives each client one private page with their jobs, certificates and invoices with Pay now.',
    },
  ],
  tasks: [
    {
      title: 'Find your way round',
      steps: [
        'Quote page: your own page and QR code where customers ask for a quote.',
        'Leads: enquiries until they are won or lost.',
        'Clients: every customer and what they owe.',
        'Quotes & Invoices: raise, send and chase. Tenders: bids for bigger work. Client portal: links and messages.',
      ],
      tour: [
        { target: 'clientshub.quotepage', caption: 'Quote page: where new requests come from.' },
        { target: 'clientshub.leads', caption: 'Leads: every enquiry until it is won.' },
        { target: 'clientshub.clients', caption: 'Clients: every customer and their balance.' },
      ],
    },
  ],
  notes: [
    {
      title: 'The numbers',
      body: 'Outstanding is sent and overdue invoices not yet paid. Drafts never count. Tap a figure to open the page behind it.',
    },
  ],
};

export const SMART_DOCS_HELP: PageHelpContent = {
  id: 'employer-smart-docs',
  title: 'Smart Docs',
  what: 'AI drafts the paperwork from your job details and you check it before it goes anywhere. Your last five documents show at the top.',
  steps: [
    {
      title: 'Pick the document',
      body: 'AI Design for a circuit design spec, AI quote for a priced draft quote.',
    },
    {
      title: 'Give it the job',
      body: 'Fill in the steps or pick a job. The more detail, the better the draft.',
    },
    {
      title: 'Check it',
      body: 'Nothing is final until you have read it. Edit, then download or send.',
    },
  ],
  tasks: [
    {
      title: 'Draft a design spec',
      steps: [
        'Tap AI Design Spec.',
        'Work through Project, Supply, Circuits, Install, Validate and Review, tapping Next.',
        'Tap Generate Design, then Download PDF from the results.',
      ],
      tour: [{ target: 'smartdocs.design', caption: 'Tap AI Design Spec to start a design.' }],
    },
    {
      title: 'Draft a quote',
      steps: [
        'Tap AI quote.',
        'Tap Start a draft, pick a job or describe the work, then Draft my quote.',
        'Check the lines and tap Save draft and review. You send it from the quote builder.',
      ],
      tour: [{ target: 'smartdocs.quote', caption: 'Tap AI quote to draft a priced quote.' }],
    },
  ],
  notes: [
    {
      title: 'RAMS, method statements and briefing packs',
      body: 'These cards open the safety document tools. They have their own help on each page.',
    },
    {
      title: 'Who sees the counts',
      body: 'Counts and the recent list cover documents made by the owner and managers.',
    },
  ],
};

export const AI_DESIGN_HELP: PageHelpContent = {
  id: 'employer-ai-design',
  title: 'AI Design',
  what: 'Design a whole installation. Each circuit is sized, protected and checked, and you get a branded design schedule as a PDF.',
  steps: [
    {
      title: 'Describe the job',
      body: 'Six steps: Project, Supply, Circuits, Install, Validate and Review. Tap Next to move on.',
    },
    {
      title: 'Generate',
      body: 'On Review, tap Generate Design. It works through every circuit and shows progress as it goes.',
    },
    {
      title: 'Check and download',
      body: 'Read each circuit and its workings, then tap Download PDF. New design starts again.',
    },
  ],
  tasks: [
    {
      title: 'Design an installation',
      steps: [
        'Project: the basic details of the job.',
        'Supply: the electrical supply characteristics.',
        'Circuits: add each circuit. Install: how each one is run.',
        'Validate runs a pre-flight check. Fix anything it flags, then Review.',
        'Tap Generate Design.',
      ],
      tour: [{ target: 'aidesign.wizard', text: 'Next', caption: 'Fill in each step, then tap Next.' }],
    },
    {
      title: 'Get the PDF',
      steps: [
        'When the results show, check each circuit.',
        'Tap Download PDF. On a phone it opens so you can save or share it.',
        'Tap New design to start another.',
      ],
    },
  ],
  notes: [
    {
      title: 'You sign it off',
      body: 'The design is a draft to check against BS 7671 and site conditions. It does not replace your own judgement.',
    },
  ],
};

export const SETTINGS_HELP: PageHelpContent = {
  id: 'employer-settings',
  title: 'Settings',
  what: 'Your firm details, managers, seats, branding, the office email, card payments, QS sign-off and the bank details printed on invoices.',
  steps: [
    {
      title: 'Fill in the company',
      body: 'Name, number, VAT, phone, email, website and address go on quotes, invoices and emails.',
    },
    {
      title: 'Brand it',
      body: 'Upload your logo and pick two colours. Save branding to apply them.',
    },
    {
      title: 'Get paid',
      body: 'Add bank details for invoices, and connect Stripe so every invoice has a Pay now link.',
    },
  ],
  tasks: [
    {
      title: 'Update company details',
      steps: [
        'Change any field under General.',
        'A bar appears at the bottom. Tap Save all, or Discard to undo.',
      ],
      who: 'The account owner. Managers can see settings but not change company details, branding or payments.',
      tour: [{ target: 'settings.general', caption: 'Change the details here. Save all appears at the bottom.' }],
    },
    {
      title: 'Add your logo and colours',
      steps: [
        'Under Branding, tap Upload and pick your logo (PNG, JPG or SVG).',
        'Set the primary colour (buttons and accents) and secondary colour (headers).',
        'Check the live preview, then tap Save branding.',
      ],
      who: 'The account owner.',
      tour: [{ target: 'settings.branding', caption: 'Upload your logo, pick colours, then Save branding.' }],
    },
    {
      title: 'Add a manager',
      steps: [
        'In Managers, tap Add manager.',
        'Type the email they sign in with, and their name and job title if you like.',
        'Pick Office or Admin, then tap Add manager.',
      ],
      after:
        'Next time they open Elec-Mate with that email they are asked to accept. Office runs jobs, team, quotes, invoices and approvals without seeing job profit or pay rates. Admin can do everything you can. Neither needs a paid seat. Make Office or Make Admin changes it later.',
      who: 'The account owner only.',
      tour: [{ target: 'settings.managers', caption: 'Owners: tap Add manager here, then pick Office or Admin.' }],
    },
    {
      title: 'Set up card payments',
      steps: [
        'In Card payments, tap Connect Stripe.',
        'Stripe asks for business details, ID and the bank account to pay into.',
        'If it says Setup not finished, tap Finish setup in Stripe.',
      ],
      after:
        'Once connected, every invoice you send carries a Pay now link and marks itself paid. 1% platform fee plus Stripe fees on each card payment.',
      who: 'The account owner only.',
      tour: [{ target: 'settings.payments', caption: 'Connect Stripe here so invoices carry Pay now.' }],
    },
    {
      title: 'Add your bank details to invoices',
      steps: [
        'Scroll to Billing & payments.',
        'Fill in account name, sort code and account number.',
        'Tap Save.',
      ],
      who: 'The account owner.',
      tour: [{ target: 'settings.bank', caption: 'Bank details printed on every invoice. Tap Save.' }],
    },
    {
      title: 'Turn on QS sign-off',
      steps: [
        'Scroll to QS sign-off.',
        'Switch on Require QS approval before issue. Team EICR, EIC and Minor Works then need a QS countersignature before the PDF can be issued.',
        'If you are the QS yourself, also switch on I am my own Qualifying Supervisor.',
      ],
      who: 'The account owner.',
      tour: [{ target: 'settings.qs', caption: 'Switch these on to require QS countersigning.' }],
    },
    {
      title: 'Get office emails',
      steps: [
        'Under Notifications, type the office email.',
        'Tap Save next to it.',
      ],
      who: 'The account owner.',
      after:
        'It gets incidents and near misses, client payments, and a weekday morning summary of timesheets, leave and expenses waiting, plus renewals. Leave it empty to stop them. In-app alerts carry on either way.',
      tour: [{ target: 'settings.notifications', caption: 'Put the office email here and save it.' }],
    },
  ],
};
