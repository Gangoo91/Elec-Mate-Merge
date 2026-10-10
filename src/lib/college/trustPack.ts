/* ==========================================================================
   trustPack — the College IT and procurement pack (ELE-1972, ELE-1915).

   Six documents a college's IT lead, DPO and procurement team ask for before
   they sign: security and data processing, a pre-filled DPIA, the
   accessibility statement, the sub-processor list, the data-flow diagram and
   how we handle under-18 learners.

   🔴 Facts only. Every statement here was checked against the code, the
   migrations or the live project config on 10 Oct 2026 (sources in the
   comments). Anything we could not verify from the code is a [placeholder]
   in square brackets for Elec-Mate or the college to complete. Never add a
   claim about another company's product.

   One model, two renderings: CollegeTrustPage draws the blocks in the app,
   and toStandaloneHtml() turns the same blocks into a self-contained,
   printable HTML file for download (print to PDF from any browser).
   ========================================================================== */

export type TrustBlock =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'note'; text: string }
  | { kind: 'diagram' };

export interface TrustDoc {
  id: TrustDocId;
  title: string;
  /** One line for the list. */
  summary: string;
  /** Who it is for. */
  audience: string;
  blocks: TrustBlock[];
}

export type TrustDocId =
  | 'security'
  | 'dpia'
  | 'accessibility'
  | 'subprocessors'
  | 'dataflow'
  | 'under18'
  | 'ai'
  | 'exit';

/** When the facts in this pack were last checked against the code. */
export const TRUST_PACK_CHECKED = '10 October 2026';
export const SUPPORT_EMAIL = 'founder@elec-mate.com';

export interface TrustContext {
  /** The reader's college, when known. Fills [College name]. */
  collegeName?: string | null;
}

/* ── Facts shared by several documents ─────────────────────────────── */

// Supabase project jtwygbeceundfgnkirof, `supabase projects list`, 10 Oct 2026.
const REGION = 'London, United Kingdom (AWS eu-west-2)';

/** Sub-processors as found in the code (supabase/functions, src). */
export const SUBPROCESSORS: {
  name: string;
  purpose: string;
  data: string;
  location: string;
  when: string;
}[] = [
  {
    // src/integrations/supabase/client.ts, every table, bucket and edge function.
    name: 'Supabase',
    purpose:
      'Database, sign-in (authentication), file storage and server functions. This is where the college record lives.',
    data: 'All College Hub and apprentice records: names, email addresses, cohorts, attendance, off-the-job hours, evidence files, assessment decisions, reviews, messages, safeguarding notes.',
    location: REGION,
    when: 'Always',
  },
  {
    // vercel.json; @vercel/analytics and @vercel/speed-insights in App.tsx.
    name: 'Vercel',
    purpose:
      'Hosts the web app files. Vercel Web Analytics and Speed Insights measure page views and loading speed.',
    data: 'Web requests (IP address, browser) and page addresses visited. No college records are stored at Vercel.',
    location: '[Vercel hosting region, confirm in the Vercel project settings]',
    when: 'Always, on the web app',
  },
  {
    // ai-* functions, review-portfolio-submission, analyze-diary-entry,
    // transcribe-evidence-media, _shared/learner-context.ts.
    name: 'OpenAI',
    purpose:
      'AI features: lesson plans and slides, suggested marks for written quiz answers, evidence review and quality checks, off-the-job hours suggestions, draft policies and self-assessment reports, inspection rehearsal, spelling and grammar checks, voice feedback, learning plan and next-step suggestions.',
    data: 'The part of the record the feature needs. This can include the learner name, course, evidence text, quiz answers, hours entries and recorded support needs.',
    location: '[OpenAI processing region, confirm against the OpenAI data processing addendum]',
    when: 'Only when someone uses an AI feature',
  },
  {
    // check-calculation-evidence, read-paper-test-schedule, transcribe-evidence-media.
    name: 'Google (Gemini API)',
    purpose:
      'Checking calculation evidence, reading uploaded paper test schedules and transcribing audio or video evidence.',
    data: 'The uploaded file or text being checked.',
    location: '[Google processing region, confirm against the Google Cloud terms]',
    when: 'Only when someone uses one of these features',
  },
  {
    // learner-document-pdf, portfolio-export-pack, _shared/learner-record-pdf.ts.
    name: 'PDFMonkey',
    purpose:
      'Turns records into PDF documents: learner documents, portfolio export packs and the compliance audit pack.',
    data: 'The contents of the document: names, evidence summaries, grades, dates.',
    location: '[PDFMonkey processing region]',
    when: 'Only when someone downloads one of these documents',
  },
  {
    // _shared/mailer.ts (all email goes through Brevo), send-cohort-message.
    name: 'Brevo',
    purpose:
      'Sends email: cohort messages, invitations and account emails such as password reset, data export and account deletion.',
    data: 'Name, email address and the message.',
    location: '[Brevo processing region]',
    when: 'When an email is sent',
  },
  {
    // send-push-notification: api.push.apple.com, fcm.googleapis.com, web push.
    name: 'Apple Push Notification service, Google Firebase Cloud Messaging and browser push services',
    purpose: 'Delivers push notifications to phones and browsers.',
    data: 'A device token and the notification title and short text.',
    location: 'Apple, Google or the browser maker',
    when: 'Only for people who allow notifications',
  },
  {
    // src/lib/sentry.ts (ingest.de.sentry.io), _shared/sentry.ts.
    name: 'Sentry',
    purpose: 'Error monitoring for the app and server functions, so faults are found and fixed.',
    data: 'Error details, the account id and email address of the signed-in user. Session replays are recorded with all screen text and inputs masked.',
    location: 'European Union (Germany)',
    when: 'When an error happens, and a sample of sessions',
  },
  {
    // src/components/analytics/PostHogProvider.tsx (eu.i.posthog.com, consent-gated).
    name: 'PostHog',
    purpose: 'Product analytics: which screens are used.',
    data: 'Usage events. Session recordings on the web mask all screen text and inputs.',
    location: 'European Union',
    when: 'Only after the person accepts analytics cookies',
  },
  {
    // MarketingPixelsProvider.tsx: Meta Pixel and Google Ads / GA4, web only.
    name: 'Meta and Google (advertising measurement)',
    purpose: 'Measures whether Elec-Mate adverts lead to sign-ups.',
    data: 'Page visits and sign-up events from the browser.',
    location: 'Meta, Google',
    when: 'Web only, and only after the person accepts marketing cookies',
  },
  {
    // stripe-* functions, RevenueCat in the native app.
    name: 'Stripe and RevenueCat',
    purpose:
      'Payments for personal subscriptions (Stripe on the web, RevenueCat for app store purchases).',
    data: 'Name, email address and payment status. Card details are handled by Stripe or the app store, never by Elec-Mate.',
    location: '[Stripe and RevenueCat processing regions]',
    when: 'Only when a person buys their own subscription',
  },
];

/* ── 1. Security and data processing ───────────────────────────────── */

function securityDoc(c: TrustContext): TrustDoc {
  return {
    id: 'security',
    title: 'Security and data processing',
    summary: 'Where the data lives, who can see it, how it is protected, kept and deleted.',
    audience: 'Data protection officer, IT lead',
    blocks: [
      {
        kind: 'p',
        text: `This page answers the usual security questionnaire for the Elec-Mate College Hub and apprentice app, as used by ${c.collegeName || '[College name]'}. Facts were checked against the system on ${TRUST_PACK_CHECKED}. Items in square brackets are for Elec-Mate to complete.`,
      },
      { kind: 'h2', text: 'Roles' },
      {
        kind: 'ul',
        items: [
          'The college is the data controller for its learners’ and staff records in the College Hub.',
          'Elec-Mate is the data processor. [Company legal name], [Company registration number], [Registered office address]. ICO registration: [ICO registration number].',
          'An apprentice’s own Elec-Mate account belongs to them. When they leave the college, their personal account stays theirs; the college keeps its own records.',
        ],
      },
      { kind: 'h2', text: 'Where the data is stored' },
      {
        kind: 'ul',
        items: [
          `The database, files and sign-in service run on Supabase in ${REGION}.`,
          'The web app files are served by Vercel. No college records are stored at Vercel.',
          'Other services that receive some data are listed in the sub-processor list, with what they receive and when.',
        ],
      },
      { kind: 'h2', text: 'Encryption' },
      {
        kind: 'ul',
        items: [
          'In transit: every connection between the app and the servers uses HTTPS (TLS).',
          'At rest: the database and file storage are encrypted at rest by Supabase.',
          'Passwords are never stored by Elec-Mate; Supabase Auth stores a one-way hash.',
        ],
      },
      { kind: 'h2', text: 'Who can see what' },
      {
        kind: 'p',
        text: 'Access is enforced in the database itself (Postgres row level security), not only in the app, so a request that bypasses the app is checked the same way.',
      },
      {
        kind: 'ul',
        items: [
          'Every College Hub table has row level security switched on (103 of 103 college, portfolio, tutor and pastoral tables on 10 Oct 2026).',
          'Staff see records for their own college only. Staff roles are tutor, head of department, support, admin, assessor, IQA and EQA. EQA access is read-only.',
          'A learner sees their own records only.',
          'Safeguarding notes can be read only by the college’s designated safeguarding leads and the learner’s own tutor.',
          'Nobody can give themselves a role. Only a college admin, a head of department or Elec-Mate can grant staff roles, and nobody can change their own.',
          'People who are not signed in can reach nothing except pages opened by a one-off link (for example a shared portfolio link the learner created).',
          'An automated access test (over 200 checks across learner, tutor, assessor, IQA, admin, EQA, safeguarding lead, employer, another college’s tutor and signed-out visitors) runs against the live system.',
        ],
      },
      { kind: 'h2', text: 'Signing in' },
      {
        kind: 'ul',
        items: [
          'Email and password through Supabase Auth. The app asks for a password of at least 8 characters.',
          'Two-step sign-in for staff (a code from an authenticator app) is built into Settings, Security. A college admin can require it for every member of staff; it is on by default for safeguarding leads. When it is required, the learner roll, attendance, learning plan goals and pastoral and safeguarding notes refuse a staff session that has not completed the second step, and this is enforced in the database. [Elec-Mate: date authenticator codes are switched on for the service]',
          'Sign in with Microsoft (Entra ID) for staff and learners whose college has registered its email domains. Signing in this way never grants a role: the person must already be on the college’s staff list or learner roster. Apprentices can keep email and password for their personal account. [Elec-Mate: date the Microsoft provider is switched on for the service]',
        ],
      },
      { kind: 'h2', text: 'Elec-Mate staff access' },
      {
        kind: 'ul',
        items: [
          'Elec-Mate staff can work inside a college’s hub only by opening a named, time-limited session (8 hours) that is written to the college’s own activity log, with every change they make.',
          'Support view-as: only if the college has said yes (a switch the college admin controls, off until they turn it on), Elec-Mate support can see a College Hub screen as a named member of staff for up to one hour to sort out a support request. It needs a written reason, is recorded in the college’s activity log, and is read-only: the database refuses every change while it is open. Turning the switch off ends any open session.',
          'Elec-Mate monitors safeguarding only through content-free signals (for example a concern left unacknowledged for 48 hours, or a college with no safeguarding lead). It never reads safeguarding content.',
        ],
      },
      { kind: 'h2', text: 'Audit log' },
      {
        kind: 'ul',
        items: [
          'Staff actions are written to the college activity log, which the college’s admin and quality staff can read in Settings, Audit log.',
          'The log cannot be edited or deleted from the app.',
        ],
      },
      { kind: 'h2', text: 'Files' },
      {
        kind: 'ul',
        items: [
          'Most college files (college learner evidence, college resources, compliance documents, tutor assessment documents, exports) are in private storage and need a signed-in, permitted user.',
          'Some portfolio evidence files and message attachments are stored behind long, unguessable links: anyone who has the exact link can open the file. [Elec-Mate to confirm the plan for these]',
        ],
      },
      { kind: 'h2', text: 'Keeping and deleting data' },
      {
        kind: 'ul',
        items: [
          'A person can delete their own account in the app. It is held for 30 days in case of a mistake, then erased permanently by a daily job.',
          'For a learner on a college roll, deleting their personal account does not delete the college’s apprenticeship evidence (hours, portfolio decisions, signatures, gateway and review records), which the funding rules require the college to keep. Their personal profile details are blanked and the login is anonymised and closed instead.',
          'A person can download a copy of their data from the app (a data export).',
          'College records are kept for as long as the college uses the College Hub. [Retention period after the contract ends, and how the college asks for deletion]',
        ],
      },
      { kind: 'h2', text: 'Backups and continuity' },
      {
        kind: 'ul',
        items: [
          '[Backup frequency, retention and point-in-time recovery for the Supabase plan in use]',
        ],
      },
      { kind: 'h2', text: 'Monitoring and incidents' },
      {
        kind: 'ul',
        items: [
          'Errors in the app and server functions are reported to Sentry (EU region) so faults are seen quickly.',
          '[Breach notification: Elec-Mate will tell the college without undue delay, and within (number) hours of becoming aware of a personal data breach]',
        ],
      },
      { kind: 'h2', text: 'Insurance and certifications' },
      { kind: 'ul', items: ['[Insurance cover and any certifications held]'] },
      { kind: 'h2', text: 'Contact' },
      { kind: 'p', text: `Security and data protection questions: ${SUPPORT_EMAIL}.` },
    ],
  };
}

/* ── 2. DPIA template ──────────────────────────────────────────────── */

function dpiaDoc(c: TrustContext): TrustDoc {
  const college = c.collegeName || '[College name]';
  return {
    id: 'dpia',
    title: 'Data protection impact assessment (template)',
    summary:
      'Pre-filled with what Elec-Mate does. Your DPO completes the college parts and signs it off.',
    audience: 'Data protection officer',
    blocks: [
      {
        kind: 'note',
        text: 'This is a template, pre-filled by Elec-Mate with how the service works. It is the college’s assessment: your DPO reviews it, completes the parts in square brackets and decides whether the residual risk is acceptable.',
      },
      { kind: 'h2', text: '1. About the processing' },
      {
        kind: 'table',
        head: ['Question', 'Answer'],
        rows: [
          ['Controller', college],
          ['Processor', 'Elec-Mate: [Company legal name], [Company registration number]'],
          ['Service', 'Elec-Mate College Hub (staff) and the apprentice app (learners)'],
          ['DPO / assessor', '[Name, role]'],
          ['Date', '[Date]'],
          [
            'Purpose',
            'Running electrical apprenticeship and further education programmes: registers, off-the-job hours, evidence and portfolios, assessment and IQA, progress reviews, learning plans, messages, safeguarding referrals and end-point assessment readiness.',
          ],
          [
            'Lawful basis',
            '[For example public task, or legitimate interests; and Article 9 condition for special category data]',
          ],
        ],
      },
      { kind: 'h2', text: '2. People and data' },
      {
        kind: 'table',
        head: ['People', 'Data held'],
        rows: [
          [
            'Learners (many aged 16 to 18)',
            'Name, email, date of birth, ULN, cohort and course, employer, attendance, off-the-job hours, evidence files, quiz results, grades, reviews, learning plan goals, messages, recorded support needs (SEND, EHCP reference, first language).',
          ],
          [
            'Learners: special category',
            'Safeguarding and pastoral notes; support needs relating to health or disability.',
          ],
          [
            'College staff',
            'Name, email, role, qualifications and compliance records, actions in the audit log.',
          ],
          [
            'Employers and workplace mentors',
            'Name, email and comments where they take part in reviews or confirm hours.',
          ],
        ],
      },
      { kind: 'h2', text: '3. How the data flows' },
      {
        kind: 'p',
        text: 'Learners and staff use the app on their phone or a browser. Records are stored in the Elec-Mate database in London. Some features send part of a record to a sub-processor (AI, PDF documents, email, push notifications). See the data-flow diagram and the sub-processor list in this pack.',
      },
      { kind: 'h2', text: '4. Necessity and proportionality' },
      {
        kind: 'ul',
        items: [
          'Data collected is what the programme and funding rules need. [College to confirm against its own requirements]',
          'Access is limited by role and college in the database itself.',
          'AI features run only when a member of staff or a learner uses them, and send only the part of the record that feature needs.',
          'Analytics and advertising cookies are used only with the person’s consent.',
          'Learners can download their own data and delete their personal account.',
        ],
      },
      { kind: 'h2', text: '5. Risks and measures' },
      {
        kind: 'table',
        head: ['Risk', 'Measure in place', 'Residual risk'],
        rows: [
          [
            'A member of staff sees another college’s learners',
            'Row level security on every college table; automated access tests per role.',
            '[Low / Medium / High]',
          ],
          [
            'A learner sees another learner’s record',
            'Learners can read only their own rows, enforced in the database.',
            '[Low / Medium / High]',
          ],
          [
            'Safeguarding information is seen by the wrong person',
            'Readable only by the designated safeguarding leads and the learner’s own tutor. Elec-Mate does not read the content.',
            '[Low / Medium / High]',
          ],
          [
            'Staff account taken over',
            'Passwords hashed by Supabase Auth; all changes logged; two-step sign-in that the college can require for staff, enforced in the database on the most sensitive records. [Date switched on for the service]',
            '[Low / Medium / High]',
          ],
          [
            'Personal data sent to an AI service is kept or reused',
            'Only the part of the record the feature needs is sent, and only when a person uses the feature. [Elec-Mate to confirm the AI providers’ data retention terms]',
            '[Low / Medium / High]',
          ],
          [
            'A portfolio file link is passed on',
            'Links are long and unguessable. [Elec-Mate plan for moving these files to private storage]',
            '[Low / Medium / High]',
          ],
          [
            'Under-18 learners receive Elec-Mate product emails',
            '[Decision for Elec-Mate: stop product and offer emails to accounts the college has recorded as under 18]',
            '[Low / Medium / High]',
          ],
          [
            'Data lost or unavailable',
            '[Backup and recovery arrangements for the Supabase plan in use]',
            '[Low / Medium / High]',
          ],
        ],
      },
      { kind: 'h2', text: '6. Sign-off' },
      {
        kind: 'table',
        head: ['Item', 'Name and date'],
        rows: [
          ['Measures approved by', '[Name, date]'],
          ['Residual risks approved by', '[Name, date]'],
          ['DPO advice', '[Summary, and whether followed]'],
          ['Review date', '[Date]'],
        ],
      },
    ],
  };
}

/* ── 3. Accessibility statement ────────────────────────────────────── */

export interface AxeSummary {
  screens: number;
  date: string;
}

function accessibilityDoc(c: TrustContext): TrustDoc {
  return {
    id: 'accessibility',
    title: 'Accessibility statement',
    summary: 'WCAG 2.2 AA: how we test, what passes, and what we know is not yet right.',
    audience: 'Accessibility lead, procurement',
    blocks: [
      {
        kind: 'p',
        text: `This statement covers the Elec-Mate College Hub (for college staff) and the college screens of the Elec-Mate apprentice app, as used by ${c.collegeName || '[College name]'}. Elec-Mate wants as many people as possible to be able to use it. You should be able to change colours and text size with your device settings, zoom to 200% without losing content, use the hub with a keyboard, and use it with a screen reader.`,
      },
      { kind: 'h2', text: 'How accessible this service is' },
      {
        kind: 'p',
        text: 'We test the College Hub and the apprentice college screens against the Web Content Accessibility Guidelines (WCAG) version 2.2, level AA. The latest automated audit found no serious or critical failures on the screens tested. We know some parts are not yet fully accessible:',
      },
      {
        kind: 'ul',
        items: [
          'The labels under the icons in the apprentice app’s bottom bar are small (10 pixels). They meet contrast requirements but are harder to read without zooming.',
          'Automated tools cannot measure text contrast over gradient backgrounds. We use white text on dark backgrounds throughout, but these areas have not been measured by tool.',
          'PDF documents produced by the service (for example portfolio packs) have not yet been tested for accessibility.',
          'We have not yet completed a manual audit with screen readers on every screen. [Date of planned manual audit]',
        ],
      },
      { kind: 'h2', text: 'How we tested' },
      {
        kind: 'ul',
        items: [
          `Automated testing with axe-core (version 4.13) against WCAG 2.0, 2.1 and 2.2 A and AA rules, on desktop and phone sizes, as a college tutor and as a learner. Last run: ${TRUST_PACK_CHECKED}.`,
          'Screens tested: College Hub home, people, learners, a learner’s full record, cohorts, assessment, quality, settings, inbox, today, marking queue, hours to verify, IQA, work queue, portfolios, safeguarding queue, help and this security and procurement page; the apprentice college plan, today, plan, progress, end-point assessment and compliance screens.',
          'The test runs again with every change to college screens, and a serious or critical failure stops the change.',
          'Issues found and fixed in this audit: lists that screen readers could not read as lists (learners), tick boxes and buttons hidden inside clickable rows (inbox, marking and work queues), and a navigation bar whose see-through background could reduce contrast (apprentice app).',
        ],
      },
      { kind: 'h2', text: 'Reporting a problem' },
      {
        kind: 'p',
        text: `If you find a problem, or need information in a different format, email ${SUPPORT_EMAIL}. We reply within one working day.`,
      },
      { kind: 'h2', text: 'Enforcement procedure' },
      {
        kind: 'p',
        text: 'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018. If you are not happy with how we respond to your complaint, contact the Equality Advisory and Support Service (EASS).',
      },
      { kind: 'h2', text: 'Preparation of this statement' },
      {
        kind: 'p',
        text: `This statement was prepared on ${TRUST_PACK_CHECKED}. It was last reviewed on ${TRUST_PACK_CHECKED}. [Name of reviewer]`,
      },
    ],
  };
}

/* ── 4. Sub-processors ─────────────────────────────────────────────── */

function subprocessorsDoc(): TrustDoc {
  return {
    id: 'subprocessors',
    title: 'Sub-processor list',
    summary: 'Every outside service that receives data, what it gets, where and when.',
    audience: 'Data protection officer, procurement',
    blocks: [
      {
        kind: 'p',
        text: `These are the outside services the College Hub and apprentice app send data to, taken from the code on ${TRUST_PACK_CHECKED}. Elec-Mate will tell colleges before adding a new sub-processor. [Notice period]`,
      },
      {
        kind: 'table',
        head: ['Service', 'What it does', 'Data it receives', 'Where', 'When'],
        rows: SUBPROCESSORS.map((s) => [s.name, s.purpose, s.data, s.location, s.when]),
      },
    ],
  };
}

/* ── 5. Data-flow diagram ──────────────────────────────────────────── */

function dataflowDoc(): TrustDoc {
  return {
    id: 'dataflow',
    title: 'Data-flow diagram',
    summary: 'One page: who uses the service, where the record is kept, and what leaves it.',
    audience: 'IT lead, data protection officer',
    blocks: [
      { kind: 'diagram' },
      {
        kind: 'ul',
        items: [
          'Every arrow is an HTTPS connection.',
          `The record (database and files) stays in ${REGION}.`,
          'AI, PDF, email and push services receive only what a feature needs, at the moment it is used.',
          'Error reports go to Sentry in the EU. Analytics go to PostHog in the EU, and only with consent.',
        ],
      },
    ],
  };
}

/** The diagram, as SVG. Uses currentColor so it reads on the dark app and on paper. */
export const DATAFLOW_SVG = `<svg viewBox="0 0 960 620" role="img" aria-labelledby="dfTitle dfDesc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:inherit">
<title id="dfTitle">Elec-Mate College Hub data flow</title>
<desc id="dfDesc">Learners, college staff and employers use the Elec-Mate app over HTTPS. The app files are served by Vercel. The record is stored in Supabase in London: sign-in, database with row level security, file storage and server functions. Server functions send only what a feature needs to OpenAI and Google Gemini for AI features, PDFMonkey for documents, Brevo for email and Apple, Google and browser push services for notifications. The app sends error reports to Sentry in the EU and, with consent, analytics to PostHog in the EU.</desc>
<defs><marker id="dfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.5">
<rect x="20" y="70" width="190" height="64" rx="12"/>
<rect x="20" y="160" width="190" height="64" rx="12"/>
<rect x="20" y="250" width="190" height="64" rx="12"/>
<rect x="270" y="150" width="200" height="84" rx="12"/>
<rect x="270" y="300" width="200" height="64" rx="12" stroke-dasharray="5 4"/>
<rect x="530" y="40" width="190" height="380" rx="14" stroke-width="2.5"/>
<rect x="780" y="40" width="160" height="56" rx="10"/>
<rect x="780" y="110" width="160" height="56" rx="10"/>
<rect x="780" y="180" width="160" height="56" rx="10"/>
<rect x="780" y="250" width="160" height="56" rx="10"/>
<rect x="780" y="320" width="160" height="56" rx="10"/>
<rect x="270" y="420" width="200" height="56" rx="10" stroke-dasharray="5 4"/>
<rect x="270" y="490" width="200" height="56" rx="10" stroke-dasharray="5 4"/>
</g>
<g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#dfArrow)">
<path d="M210 102 C240 102 240 180 268 186"/>
<path d="M210 192 L268 192"/>
<path d="M210 282 C240 282 240 204 268 198"/>
<path d="M370 234 L370 298"/>
<path d="M470 192 L528 192"/>
<path d="M720 68 L778 68"/>
<path d="M720 138 L778 138"/>
<path d="M720 208 L778 208"/>
<path d="M720 278 L778 278"/>
<path d="M720 348 L778 348"/>
<path d="M280 234 L245 270 L245 448 L268 448"/>
<path d="M245 448 L245 518 L268 518"/>
</g>
<g fill="currentColor" font-size="16">
<text x="115" y="98" text-anchor="middle" font-weight="700">Learners</text><text x="115" y="118" text-anchor="middle" font-size="13.5">phone app or browser</text>
<text x="115" y="188" text-anchor="middle" font-weight="700">College staff</text><text x="115" y="208" text-anchor="middle" font-size="13.5">College Hub</text>
<text x="115" y="278" text-anchor="middle" font-weight="700">Employers</text><text x="115" y="298" text-anchor="middle" font-size="13.5">reviews, hours sign-off</text>
<text x="370" y="184" text-anchor="middle" font-weight="700">Elec-Mate app</text><text x="370" y="204" text-anchor="middle" font-size="13.5">runs on the device</text><text x="370" y="222" text-anchor="middle" font-size="13.5">HTTPS to everything</text>
<text x="370" y="328" text-anchor="middle" font-weight="700">Vercel</text><text x="370" y="348" text-anchor="middle" font-size="13.5">serves the app files</text>
<text x="625" y="72" text-anchor="middle" font-weight="700" font-size="18">Supabase</text><text x="625" y="92" text-anchor="middle" font-size="13.5">London (eu-west-2)</text>
<text x="625" y="140" text-anchor="middle">Sign-in</text>
<text x="625" y="180" text-anchor="middle">Database</text><text x="625" y="198" text-anchor="middle" font-size="13.5">row level security</text>
<text x="625" y="240" text-anchor="middle">File storage</text>
<text x="625" y="280" text-anchor="middle">Server functions</text>
<text x="625" y="330" text-anchor="middle" font-size="13.5">Audit log</text>
<text x="625" y="380" text-anchor="middle" font-size="13.5">The college record</text><text x="625" y="398" text-anchor="middle" font-size="13.5">stays here</text>
<text x="860" y="66" text-anchor="middle" font-weight="700" font-size="14.5">OpenAI, Gemini</text><text x="860" y="84" text-anchor="middle" font-size="13.5">AI features</text>
<text x="860" y="136" text-anchor="middle" font-weight="700" font-size="14.5">PDFMonkey</text><text x="860" y="154" text-anchor="middle" font-size="13.5">PDF documents</text>
<text x="860" y="206" text-anchor="middle" font-weight="700" font-size="14.5">Brevo</text><text x="860" y="224" text-anchor="middle" font-size="13.5">email</text>
<text x="860" y="276" text-anchor="middle" font-weight="700" font-size="14.5">Push services</text><text x="860" y="294" text-anchor="middle" font-size="13.5">Apple, Google, web</text>
<text x="860" y="346" text-anchor="middle" font-weight="700" font-size="14.5">Payments</text><text x="860" y="364" text-anchor="middle" font-size="13.5">own subscriptions only</text>
<text x="370" y="446" text-anchor="middle" font-weight="700" font-size="14.5">Sentry (EU)</text><text x="370" y="464" text-anchor="middle" font-size="13.5">error reports</text>
<text x="370" y="516" text-anchor="middle" font-weight="700" font-size="14.5">PostHog (EU)</text><text x="370" y="534" text-anchor="middle" font-size="13.5">analytics, with consent</text>
<text x="20" y="600" font-size="14.5">Solid boxes hold or receive college records. Dashed boxes receive no college records except error details.</text>
</g>
</svg>`;

/* ── 6. Under-18 learners ──────────────────────────────────────────── */

function under18Doc(): TrustDoc {
  return {
    id: 'under18',
    title: 'Learners under 18',
    summary:
      'How the service treats learners who are children in law, and what is still to decide.',
    audience: 'Safeguarding lead, data protection officer',
    blocks: [
      {
        kind: 'p',
        text: 'Many apprentices start at 16 or 17. A learner under 18 is a child in law, and the College Hub treats them as one.',
      },
      { kind: 'h2', text: 'What the service does' },
      {
        kind: 'ul',
        items: [
          'Age is worked out from the date of birth on the learner’s college record. Learners under 18 carry an “Under 18” marker on the register, in their full record and in the safeguarding queue, so staff follow the procedures for a minor.',
          'Where no date of birth is recorded, the safeguarding queue shows “Age unknown” rather than assuming an adult.',
          'Safeguarding concerns go to the college’s designated safeguarding leads. If nobody acknowledges a concern within 24 hours it is escalated to college leadership.',
          'Safeguarding notes are readable only by the designated safeguarding leads and the learner’s own tutor. Other staff, employers and the learner cannot read them.',
          'Elec-Mate never reads safeguarding content. It watches only content-free signals, such as a college with no safeguarding lead who can receive alerts, or a concern unacknowledged for 48 hours, and contacts the college if one appears.',
          'Employers see only what the college shares with them for reviews and hours, never pastoral or safeguarding notes.',
          'Analytics and advertising cookies load only with consent, for every user.',
        ],
      },
      { kind: 'h2', text: 'To be decided' },
      {
        kind: 'ul',
        items: [
          '[Elec-Mate: stop product and offer emails to accounts the college has recorded as under 18]',
          '[Elec-Mate: minimum age for opening a personal account]',
          '[College: whether parental or guardian contact details are held, and where]',
        ],
      },
    ],
  };
}

/* ── 7. AI use ─────────────────────────────────────────────────────── */

function aiUseDoc(): TrustDoc {
  return {
    id: 'ai',
    title: 'How the College Hub uses AI',
    summary: 'Where AI drafts or suggests, who confirms it, and what it never decides.',
    audience: 'Quality lead, data protection officer, awarding body queries',
    blocks: [
      {
        kind: 'p',
        text: 'AI in the College Hub drafts and suggests. A person decides. Nothing an AI writes becomes an assessment decision, a claim against a criterion or feedback to a learner until a named member of staff or the learner confirms it.',
      },
      { kind: 'h2', text: 'Where it is used' },
      {
        kind: 'table',
        head: ['Feature', 'What the AI does', 'Who confirms'],
        rows: [
          ['Lesson plans and slides', 'Drafts a plan and slides for the chosen criteria, grounded in BS 7671 regulation text retrieved from Elec-Mate’s regulations library', 'The tutor edits and saves'],
          ['Quizzes', 'Drafts questions for chosen criteria', 'Stays a draft until the tutor publishes it'],
          ['Assessor feedback', 'Drafts feedback on submitted evidence', 'Stored as a draft and labelled as drafted with AI until the assessor confirms it'],
          ['Capture assistant (learner)', 'Suggests criteria, drafts a reflective account in the learner’s words, flags a missing test sheet', 'Suggestions claim nothing until the learner taps them; drafts are used only when the learner chooses'],
          ['Learner weekly brief and next steps', 'Summarises what to do next from the learner’s own record', 'Advice only; no record changes'],
          ['Learning plan goals', 'Suggests goals from the learner’s record', 'The tutor edits and confirms'],
          ['Calculations and photos (electrical tools)', 'Checks a calculation against regulation data or reads a test sheet photo', 'The learner decides whether to attach it as evidence'],
        ],
      },
      { kind: 'h2', text: 'What it never does' },
      {
        kind: 'ul',
        items: [
          'Pass or refer a criterion. Only an assessor records a decision.',
          'Count as the learner’s own claim. AI suggestions are stored as suggestions and shown apart from claims.',
          'Read safeguarding or pastoral notes.',
          'Decide funding, eligibility or progress-review outcomes.',
        ],
      },
      { kind: 'h2', text: 'Marking and transparency' },
      {
        kind: 'ul',
        items: [
          'Features that use AI carry a visible “uses AI” marker, and AI-drafted text is labelled until a person confirms it.',
          'Assessor feedback records whether it was drafted with AI and when it was confirmed.',
          'Each piece of evidence records whether AI helped write it: which parts, what the AI was given and what it wrote. The learner cannot clear that record and staff cannot change it. When a learner submits AI-assisted evidence, their signed declaration must say how they used AI, and the assessor sees the record. This follows Ofqual’s advice (27 April 2026) and JCQ guidance on AI in assessment.',
        ],
      },
      { kind: 'h2', text: 'Providers and data' },
      {
        kind: 'ul',
        items: [
          'AI features call OpenAI and, for some electrical tools, Google Gemini, from Elec-Mate’s servers. Only the text or image a feature needs is sent. See the sub-processor list.',
          '[Elec-Mate: confirm each provider’s API data retention and that API data is not used to train their models, from the providers’ data processing terms]',
        ],
      },
    ],
  };
}

/* ── 8. Data exit and retention ─────────────────────────────────────── */

function exitDoc(c: TrustContext): TrustDoc {
  return {
    id: 'exit',
    title: 'Getting your data out, and what happens when you leave',
    summary: 'Exports at any time, learners taking their record with them, and retention.',
    audience: 'Data protection officer, MIS and data team, procurement',
    blocks: [
      {
        kind: 'p',
        text: `${c.collegeName?.trim() || '[College name]'} can take its data out at any time, in open formats, without asking Elec-Mate.`,
      },
      { kind: 'h2', text: 'Exports at any time' },
      {
        kind: 'ul',
        items: [
          'Settings → Data and API: learners, off-the-job hours, assessment decisions, attendance, progress reviews and ILR fields, as CSV or JSON, or all together in one ZIP with a manifest. Every export is logged.',
          'A read-only API with keys your admin creates, limits to chosen datasets and can revoke at any time.',
          'Each learner’s full evidence pack: an indexed ZIP of their evidence linked to criteria, decisions with assessor and date, witness statements, hours log and signatures.',
        ],
      },
      { kind: 'h2', text: 'Learners own their record' },
      {
        kind: 'ul',
        items: [
          'An apprentice’s portfolio lives in their own account. If they move provider, the record moves with them, with its audit trail. The previous college loses access and keeps its own statutory copy of what it assessed.',
          'If a learner deletes their account, their personal account data is removed and their sign-in is closed, but the college’s statutory records (hours, reviews, decisions, signatures and evidence files) are kept, as the apprenticeship funding rules require (2026/27 paragraphs 345 to 348).',
        ],
      },
      { kind: 'h2', text: 'When the agreement ends' },
      {
        kind: 'ul',
        items: [
          'Before the end date the college exports what it needs using the tools above.',
          '[Elec-Mate: how long the college’s data is held after the agreement ends, and how it is deleted or returned]',
          '[Elec-Mate: backup retention and how long data persists in backups]',
          'Audit events are append-only and cannot be edited, so the history of decisions stays provable for audits.',
        ],
      },
      { kind: 'h2', text: 'If something goes wrong' },
      {
        kind: 'ul',
        items: [
          '[Elec-Mate: breach notification window to the college, in hours, and the contact route]',
          `Contact: ${SUPPORT_EMAIL}`,
        ],
      },
    ],
  };
}

/* ── The pack ──────────────────────────────────────────────────────── */

export function buildTrustPack(c: TrustContext = {}): TrustDoc[] {
  return [
    securityDoc(c),
    dpiaDoc(c),
    subprocessorsDoc(),
    dataflowDoc(),
    under18Doc(),
    aiUseDoc(),
    exitDoc(c),
    accessibilityDoc(c),
  ];
}

/** Splits text into plain runs and [placeholder] runs. */
export function splitPlaceholders(text: string): { text: string; placeholder: boolean }[] {
  const out: { text: string; placeholder: boolean }[] = [];
  const re = /\[[^\]]+\]/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i), placeholder: false });
    out.push({ text: m[0], placeholder: true });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), placeholder: false });
  return out;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inline = (s: string) =>
  splitPlaceholders(s)
    .map((r) => (r.placeholder ? `<mark>${esc(r.text)}</mark>` : esc(r.text)))
    .join('');

function blockHtml(b: TrustBlock): string {
  switch (b.kind) {
    case 'h2':
      return `<h2>${inline(b.text)}</h2>`;
    case 'h3':
      return `<h3>${inline(b.text)}</h3>`;
    case 'p':
      return `<p>${inline(b.text)}</p>`;
    case 'note':
      return `<p class="note">${inline(b.text)}</p>`;
    case 'ul':
      return `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`;
    case 'table':
      return `<table><thead><tr>${b.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows
        .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table>`;
    case 'diagram':
      return `<figure class="diagram">${DATAFLOW_SVG}</figure>`;
  }
}

/** A self-contained, printable HTML document for one or more documents. */
export function toStandaloneHtml(docs: TrustDoc[], c: TrustContext = {}): string {
  const title =
    docs.length === 1
      ? `Elec-Mate: ${docs[0].title}`
      : 'Elec-Mate College Hub: security and procurement pack';
  const body = docs
    .map(
      (d) =>
        `<section class="doc"><p class="eyebrow">Elec-Mate College Hub${c.collegeName ? ` · ${esc(c.collegeName)}` : ''}</p><h1>${esc(
          d.title
        )}</h1><p class="meta">For: ${esc(d.audience)} · Facts checked ${TRUST_PACK_CHECKED}</p>${d.blocks
          .map(blockHtml)
          .join('')}</section>`
    )
    .join('');
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#111;background:#fff;margin:0;line-height:1.5;font-size:14px}
  .doc{max-width:900px;margin:0 auto;padding:32px 28px;page-break-after:always}
  .doc:last-child{page-break-after:auto}
  .eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin:0 0 6px}
  h1{font-size:24px;margin:0 0 4px} h2{font-size:17px;margin:24px 0 8px;padding-top:12px;border-top:1px solid #ddd} h3{font-size:15px;margin:16px 0 6px}
  .meta{font-size:12px;margin:0 0 16px}
  .note{border:1px solid #999;border-radius:8px;padding:10px 12px}
  ul{padding-left:20px} li{margin:4px 0}
  table{border-collapse:collapse;width:100%;font-size:12.5px;margin:8px 0} th,td{border:1px solid #bbb;padding:6px 8px;text-align:left;vertical-align:top} th{background:#f2f2f2}
  mark{background:#fff3b0;color:#111;padding:0 2px;border-radius:3px}
  figure.diagram{margin:12px 0;color:#111}
  @page{size:A4;margin:14mm}
  @media print{.doc{padding:0}}
</style></head><body>${body}</body></html>`;
}

export function trustFilename(docs: TrustDoc[]): string {
  return docs.length === 1
    ? `Elec-Mate - ${docs[0].title}.html`
    : 'Elec-Mate - College security and procurement pack.html';
}
