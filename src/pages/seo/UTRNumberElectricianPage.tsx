import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  AlertTriangle,
  PoundSterling,
  Clock,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Finance Guides', href: '/guides/electrician-finance' },
  { label: 'UTR Number for Electricians', href: '/utr-number-electrician' },
];

const tocItems = [
  { id: 'what-is-utr', label: 'What Is a UTR Number?' },
  { id: 'who-needs-utr', label: 'Who Needs a UTR Number?' },
  { id: 'how-to-register', label: 'How to Register for Self-Assessment' },
  { id: 'timeline', label: 'Registration Timeline' },
  { id: 'cis-deductions', label: 'UTR Number and CIS Deductions' },
  { id: 'keeping-secure', label: 'Keeping Your UTR Secure' },
  { id: 'for-electricians', label: 'Managing Your Tax with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A UTR (Unique Taxpayer Reference) is a 10-digit number issued by HMRC to identify you for self-assessment tax. Every self-employed electrician in the UK needs one.',
  'You must register for self-assessment if your self-employed income exceeds £1,000 in a tax year. Register by 5 October following the end of the tax year in which you became self-employed.',
  'Allow at least 10 working days for your UTR to arrive by post after registering online. If you are working under CIS, your contractor needs your UTR before they can verify you and apply the correct deduction rate.',
  'Under CIS, electricians registered with HMRC receive a 20% deduction rate. Unregistered subcontractors are deducted at 30%. Registering and obtaining your UTR is therefore financially important.',
  'Keep your UTR number secure — treat it like a National Insurance number. Never share it publicly. You will need it every time you complete a self-assessment return or deal with HMRC.',
];

const faqs = [
  {
    question: 'What is a UTR number and why do I need one as an electrician?',
    answer:
      'A UTR (Unique Taxpayer Reference) is a 10-digit number issued by HMRC to identify you for tax purposes. As a self-employed electrician, you need a UTR to register for and complete self-assessment tax returns, to work under the Construction Industry Scheme (CIS) as a verified subcontractor, and to deal with HMRC regarding your tax affairs. Without a UTR you cannot file a self-assessment return, and contractors working under CIS cannot verify you — meaning they must deduct tax at the higher unregistered rate of 30% rather than 20%.',
  },
  {
    question: 'How do I get a UTR number as a self-employed electrician?',
    answer:
      'Register for self-assessment online via the HMRC website at gov.uk/register-for-self-assessment. You will need your National Insurance number, date of birth, address, and business details. HMRC will post your UTR to your registered address within 10 working days of your online registration. You can also register by phone on 0300 200 3310 or by completing form SA1 (for non-trading individuals) or CWF1 (for self-employed sole traders — the most common form for electricians).',
  },
  {
    question: 'When do I need to register for self-assessment?',
    answer:
      'You must register for self-assessment if your self-employed income (trading income) exceeds £1,000 in a tax year. This is the trading allowance threshold. The deadline to register is 5 October following the end of the tax year in which you became self-employed. For example, if you started trading in March 2026 (within the 2025/26 tax year), you must register by 5 October 2026. Failing to register by this deadline can result in a £100 late registration penalty from HMRC.',
  },
  {
    question: 'How long does it take to get a UTR number?',
    answer:
      'After registering online, HMRC will post your UTR number to your registered address. Allow at least 10 working days — in practice this often takes 2 to 4 weeks. If you need to start working under CIS urgently, contact HMRC on 0300 200 3310 and explain your situation. They can sometimes provide your UTR over the phone once your identity has been verified. Do not start new CIS contracts without a UTR if you can avoid it, as the 30% unregistered deduction rate can significantly affect your cash flow.',
  },
  {
    question: 'What is my UTR number used for under CIS?',
    answer:
      'Under the Construction Industry Scheme, your contractor must verify you with HMRC before making their first payment to you. HMRC uses your UTR number (along with your business name or National Insurance number) to look up your CIS registration status and determine whether to apply the 20% standard deduction or 30% unregistered deduction. You should provide your UTR to every contractor you work for. CIS deductions made by contractors are offset against your tax bill when you file your annual self-assessment return.',
  },
  {
    question: 'Can someone else find out my UTR number?',
    answer:
      'Your UTR is not publicly available but you should treat it carefully. You need to share it with contractors working under CIS (this is necessary and legitimate), your accountant, and HMRC. Do not share it unnecessarily — a UTR combined with other personal information could be used to impersonate you with HMRC. If you believe your UTR has been misused, contact HMRC immediately on 0300 200 3310.',
  },
  {
    question: 'Do I need a UTR if I am employed through a limited company?',
    answer:
      'If you operate your electrical business through a limited company, the company itself has a UTR (used for Corporation Tax). As a director, you may also personally need a UTR for self-assessment if you receive dividends, have income over £150,000, or have other untaxed income. Many electrician limited company directors file personal self-assessment returns as well as the company Corporation Tax return. Speak to an accountant if you are unsure about your obligations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/self-assessment-electrician',
    title: 'Self-Assessment for Electricians',
    description: 'Complete guide to filing your self-assessment tax return, allowable expenses, and deadlines.',
    icon: FileText,
    category: 'Finance Guide',
  },
  {
    href: '/cis-guide-electrician',
    title: 'CIS Guide for Electricians',
    description: 'How the Construction Industry Scheme works, deduction rates, and monthly returns.',
    icon: ClipboardCheck,
    category: 'Finance Guide',
  },
  {
    href: '/vat-for-electricians',
    title: 'VAT for Electricians',
    description: 'When to register for VAT, the flat rate scheme, and domestic reverse charge explained.',
    icon: PoundSterling,
    category: 'Finance Guide',
  },
  {
    href: '/electrician-mortgage',
    title: 'Electrician Mortgage Guide',
    description: 'How to get a mortgage as a self-employed electrician — lenders, SA302, and more.',
    icon: Building2,
    category: 'Finance Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes and invoices on your phone in minutes.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-utr',
    heading: 'What Is a UTR Number?',
    content: (
      <>
        <p>
          A UTR — Unique Taxpayer Reference — is a 10-digit number issued by HMRC to every
          individual or business registered for self-assessment in the UK. It is your permanent
          identifier with HMRC and never changes, even if you move house, change your name, or
          stop trading for a period.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Format</strong> — your UTR is always 10 digits long, for example
                1234567890. It appears on letters from HMRC, your online Personal Tax Account,
                self-assessment returns, and official correspondence. It is sometimes written
                with a K suffix (e.g. 1234567890K) in certain contexts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permanence</strong> — once issued, your UTR does not change. Even if you
                take a break from self-employment and return years later, HMRC will reactivate
                your existing UTR rather than issue a new one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not the same as your NI number</strong> — your National Insurance number
                (e.g. QQ 12 34 56 A) is different from your UTR. Both are required for different
                purposes. Your NI number is for National Insurance contributions and employment
                records; your UTR is specifically for HMRC self-assessment and CIS.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where to find it</strong> — your UTR appears on your SA100 tax return,
                letters from HMRC titled "Your Unique Taxpayer Reference", your online HMRC
                Personal Tax Account, and notices to file a return.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you have been self-employed for some time but are unsure whether you have a UTR,
          log in to your HMRC Personal Tax Account at gov.uk/personal-tax-account or call HMRC
          on 0300 200 3310 with your National Insurance number to hand.
        </p>
      </>
    ),
  },
  {
    id: 'who-needs-utr',
    heading: 'Who Needs a UTR Number as an Electrician?',
    content: (
      <>
        <p>
          You need a UTR number and must register for self-assessment if any of the following
          apply to your situation as an electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed sole trader income over £1,000</strong> — if your
                self-employment income (before expenses) exceeded £1,000 in a tax year, you must
                register. This threshold is the trading allowance; income below it can be
                covered by the allowance without a return in some circumstances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working under CIS as a subcontractor</strong> — any electrician working
                as a subcontractor on construction projects where the contractor deducts CIS tax
                needs a UTR. Your contractor will ask for it before the first payment, and HMRC
                requires it to verify your registration status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sole trader or partnership</strong> — if you operate as a self-employed
                sole trader or in a partnership, you need a personal UTR. Partnerships also
                have a separate UTR for the partnership itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited company director with dividends</strong> — if you run your
                electrical business through a limited company and pay yourself dividends, you
                will usually also need to file a personal self-assessment return and have a
                personal UTR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are employed by an electrical contractor and have no additional self-employed
          income, you generally do not need a UTR — your employer handles your tax through PAYE.
          However, if you do any self-employed work alongside PAYE employment and earn more than
          £1,000 from it, you must register.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-register',
    heading: 'How to Register for Self-Assessment with HMRC',
    content: (
      <>
        <p>
          Registering for self-assessment and obtaining your UTR number is a straightforward
          online process. Use form CWF1 if you are registering as a self-employed sole trader
          (the most common situation for electricians). Here is the process step by step:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Gather what you need</strong> — your National Insurance number,
                your date of birth, your address and contact details, the date you started
                self-employment, and your business name (if you trade under one).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Register online</strong> — go to gov.uk/register-for-self-assessment
                and select "I am self-employed or a sole trader". Complete the CWF1 online form.
                You will need a Government Gateway user ID and password; create one if you do not
                already have one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Receive your UTR by post</strong> — HMRC will post your UTR
                to your registered address within approximately 10 working days. Do not throw
                this letter away — keep it somewhere safe. If the letter does not arrive after
                three weeks, contact HMRC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Activate your online account</strong> — separately, HMRC will
                send you an activation code by post. Use this to activate your HMRC online
                services account. Once activated, you can manage your self-assessment returns
                online and view your UTR at any time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember: registering for self-assessment also registers you for Class 2 National
          Insurance contributions (currently £3.45 per week for 2025/26, paid through your
          self-assessment return) and obligates you to pay Class 4 NICs on profits above the
          Small Profits Threshold. Consult a qualified accountant if you are unsure how these
          affect your overall tax position.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <p className="text-white text-sm">
            <strong>Disclaimer:</strong> This guide provides general information about HMRC
            registration processes. Tax law is complex and your individual circumstances may
            differ. Always consult a qualified accountant or tax adviser for advice tailored to
            your situation.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'timeline',
    heading: 'UTR Registration Timeline: What to Expect',
    content: (
      <>
        <p>
          The registration and UTR receipt process involves several steps, each with its own
          timeline. Plan ahead, especially if you are starting work on a CIS contract.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 1 — Online registration</strong> — completing the CWF1 form online
                takes approximately 15 minutes if you have all your information ready.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to 10 working days — UTR letter arrives</strong> — HMRC aims to
                dispatch the UTR letter within 10 working days. In practice it often arrives
                within 5 to 7 working days but can take up to 4 weeks during busy periods
                (January and April/May).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to 10 working days — activation code arrives</strong> — a separate
                letter containing your activation code for HMRC online services arrives
                independently, also within approximately 10 working days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CIS urgency — call HMRC</strong> — if you need to start CIS work before
                your UTR arrives, call HMRC's Self-Assessment helpline on 0300 200 3310. Explain
                that you are starting CIS work and need your UTR urgently. They can sometimes
                provide it verbally after verifying your identity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cis-deductions',
    heading: 'Your UTR Number and CIS Deductions',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) is particularly relevant for electricians
          working on construction projects as subcontractors. Your UTR number is central to how
          CIS works in practice.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20% deduction — registered subcontractor</strong> — if you are
                registered with HMRC for CIS and your contractor can verify your UTR, they
                deduct 20% from your labour payments (not materials) and pay it to HMRC on
                your behalf. This is offset against your tax bill at year end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30% deduction — unregistered subcontractor</strong> — if HMRC cannot
                verify your UTR (because you have not registered or provided incorrect details),
                the contractor must deduct 30%. This higher rate is a powerful financial
                incentive to register and obtain your UTR before starting work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Claiming deductions back</strong> — CIS deductions count as advance
                payments of your tax. When you complete your self-assessment return, you declare
                your CIS deductions suffered and offset them against your tax liability. If your
                deductions exceed your tax bill, you receive a refund from HMRC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gross payment status</strong> — once your turnover exceeds certain
                thresholds and you have a clean compliance history, you can apply for gross
                payment status under CIS, meaning contractors pay you without any deduction.
                You then settle your full tax bill via self-assessment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a more detailed guide to how CIS works for electricians, including monthly return
          obligations if you engage your own subcontractors, see our{' '}
          <SEOInternalLink href="/cis-guide-electrician">CIS guide for electricians</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'keeping-secure',
    heading: 'Keeping Your UTR Number Secure',
    content: (
      <>
        <p>
          Your UTR number is sensitive information. While it is not as widely misused as
          financial account details, it can be combined with other personal data to impersonate
          you with HMRC or commit tax fraud. Follow these basic security practices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Share only when necessary</strong> — provide your UTR to your accountant,
                CIS contractors who need to verify you, and HMRC directly. Do not post it in
                online forums, include it in general email signatures, or share it with anyone
                who does not have a legitimate need.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secure the paper letter</strong> — the letter from HMRC containing your
                UTR should be filed securely (or scanned and stored in encrypted cloud storage)
                and not left accessible on a van dashboard or worksite.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protect your HMRC login</strong> — use a strong unique password for your
                HMRC Personal Tax Account and enable two-factor authentication. If your HMRC
                account is compromised, your UTR and tax affairs are exposed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Beware of phishing</strong> — HMRC will never ask for your UTR by
                email, text, or phone call out of the blue. If you receive an unsolicited
                contact claiming to be from HMRC and asking for your UTR, treat it as a
                phishing attempt and report it to HMRC's phishing team.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Managing Your Tax and Invoices with Elec-Mate',
    content: (
      <>
        <p>
          Once you have your UTR and are registered for self-assessment, keeping accurate records
          of your income and expenses throughout the year makes completing your annual return
          far simpler — and ensures you claim every allowable expense you are entitled to.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Invoices on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate's invoicing tool
                  </SEOInternalLink>{' '}
                  to create professional invoices in seconds, track payments, and keep a complete
                  record of all income — exactly what your accountant needs at self-assessment time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Track Income and Expenses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record every job as you complete it. Keeping organised records throughout the
                  year means no scrambling in January, and you are less likely to miss allowable
                  expenses that reduce your tax bill.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Keep your accounts in order with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate to manage quotes, invoices, and job records on their phone. Professional invoices, payment tracking, and a full income record for your accountant. 7-day free trial."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function UTRNumberElectricianPage() {
  return (
    <GuideTemplate
      title="UTR Number for Electricians UK | Self-Assessment Registration Guide"
      description="Everything UK electricians need to know about UTR numbers — what a Unique Taxpayer Reference is, how to register for self-assessment with HMRC, when you need one, the 10-working-day timeline, and how UTR numbers work under CIS."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          UTR Number for Electricians:{' '}
          <span className="text-yellow-400">Self-Assessment Registration Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about Unique Taxpayer Reference numbers — what a UTR is, when you need one, how to register with HMRC, the 10-working-day timeline, and how your UTR works under the Construction Industry Scheme."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About UTR Numbers for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Keep Your Electrical Business Finances Organised"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for professional invoicing, payment tracking, and job records. Everything your accountant needs at self-assessment time. 7-day free trial, cancel anytime."
    />
  );
}
