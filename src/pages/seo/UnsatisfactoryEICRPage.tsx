import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  Search,
  ClipboardCheck,
  AlertTriangle,
  Calculator,
  Receipt,
  ShieldAlert,
  Scale,
  Building2,
  Brain,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Unsatisfactory EICR', href: '/guides/unsatisfactory-eicr-what-next' },
];

const tocItems = [
  { id: 'what-makes-unsatisfactory', label: 'What Makes an EICR Unsatisfactory?' },
  { id: 'landlord-obligations', label: 'Landlord Obligations' },
  { id: 'electrician-duty', label: 'Electrician Duty of Care' },
  { id: 'handling-the-client', label: 'Handling the Client Conversation' },
  { id: 'remedial-work', label: 'Remedial Work and Re-Inspection' },
  { id: 'insurance-implications', label: 'Insurance Implications' },
  { id: 'elecmate-auto-assessment', label: 'Auto Assessment in Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR is classified as Unsatisfactory if any C1 (Danger Present) or C2 (Potentially Dangerous) observation is recorded — even a single one.',
  'Landlords in England must complete remedial work within 28 days of an unsatisfactory EICR. Penalties for non-compliance can reach 30,000 pounds per breach.',
  'The electrician has a duty to inform the responsible person immediately when a C1 observation is found — danger must be removed or made safe before leaving site if possible.',
  'After remedial work is completed, written confirmation from a qualified person is required. A full re-inspection EICR may also be needed depending on the scope of the remedial work.',
  'Elec-Mate auto-calculates the overall assessment — the moment a C1 or C2 is added, it flips to Unsatisfactory. The remedial estimator prices the fix on site.',
];

const faqs = [
  {
    question: 'Does a single C2 observation make the entire EICR unsatisfactory?',
    answer:
      'Yes. The rule is binary — if any observation on the EICR is classified as C1 (Danger Present) or C2 (Potentially Dangerous), the overall assessment of the installation must be recorded as Unsatisfactory. There is no weighting, no averaging, and no exceptions. Even if the rest of the installation is in excellent condition with no other defects, a single C2 observation means the report is Unsatisfactory and remedial action is required. An EICR with only C3 (Improvement Recommended) observations, or with no observations at all, is classified as Satisfactory.',
  },
  {
    question: 'What is the 28-day remedial deadline for landlords?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, if an EICR identifies any C1 or C2 observations, the landlord must ensure that further investigative or remedial work is carried out within 28 days of the inspection date. If the inspector specifies a shorter period on the report (which is common for C1 Danger Present observations, where immediate action may be needed), the landlord must comply with that shorter period. After the remedial work is completed, the landlord must obtain written confirmation from a qualified person that the work has been done satisfactorily, and supply that confirmation to the local housing authority if requested, within 28 days of the remedial work being completed.',
  },
  {
    question: 'Can the landlord be fined even if they did not know the EICR was unsatisfactory?',
    answer:
      'Yes. The obligation under the Electrical Safety Standards regulations is strict — it does not matter whether the landlord was aware of the specific defects. The regulations require the landlord to ensure that the electrical installation is inspected and tested by a qualified person, and to take action on any unsatisfactory findings. Ignorance of the EICR results or failure to read the report does not excuse non-compliance. The local authority can issue civil penalties of up to 30,000 pounds per breach regardless of the landlord intent or awareness. This is why it is important for the electrician to explain the results clearly and in writing to the landlord at the time of the inspection.',
  },
  {
    question: 'Do I need to do a full re-inspection after remedial work on an unsatisfactory EICR?',
    answer:
      'It depends on the scope of the remedial work. If the remedial work is minor — for example, replacing a single defective RCD or reconnecting a bonding conductor — written confirmation that the specific defects have been rectified is usually sufficient. This confirmation should reference the original EICR and the specific observations that have been addressed. However, if the remedial work is extensive — for example, a consumer unit replacement, rewiring of multiple circuits, or wholesale changes to the earthing arrangements — a new EICR may be appropriate to re-assess the overall condition of the installation following the significant changes. Your competent person scheme provider may have specific guidance on when a full re-inspection is required versus written confirmation of remedial work.',
  },
  {
    question: 'Can a landlord refuse to do the remedial work on an unsatisfactory EICR?',
    answer:
      'Legally, no — not without consequences. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, the landlord has a legal duty to complete remedial work within 28 days (or a shorter period if specified). If the landlord refuses, the local authority can take enforcement action including: issuing civil penalties of up to 30,000 pounds per breach, issuing a remedial action notice requiring specific work to be carried out by a specified date, and in extreme cases, arranging for the work to be done themselves and recovering the costs from the landlord. The electrician should make clear to the landlord in writing that the report is Unsatisfactory, what the remedial actions are, and what the legal consequences of non-compliance are.',
  },
  {
    question: 'What should the electrician do if they find a C1 (Danger Present) on site?',
    answer:
      'When a C1 observation is identified, the electrician must take immediate steps. First, advise the person responsible for the installation (the client, landlord, or their agent) verbally and in writing that a danger has been identified. Second, if at all possible, remove the danger or make it safe before leaving the premises — for example, by isolating the affected circuit or making a temporary repair. Third, record the C1 observation on the EICR with a clear description of the danger, its location, and the remedial action taken (if any). If the danger cannot be fully eliminated on the day, the electrician should make it as safe as possible and specify on the report that immediate remedial action is required. Under no circumstances should the electrician leave a known danger in place without informing the responsible person.',
  },
  {
    question: 'Does an unsatisfactory EICR affect insurance?',
    answer:
      'Yes, it can. Many building and landlord insurance policies include conditions requiring the insured to maintain the property in a safe condition and comply with applicable regulations. An unsatisfactory EICR identifies electrical defects that present a risk, and failure to address those defects could be seen as a breach of the policy conditions. If an electrical incident (fire, shock, or injury) occurs and the insurer discovers that an unsatisfactory EICR was not acted upon, they may refuse to pay the claim on the grounds that the policyholder failed to maintain the property. Some insurers now require evidence of a satisfactory EICR as a condition of providing or renewing cover. As an electrician, it is worth mentioning this to the client — it often motivates prompt action on remedial work.',
  },
];

const relatedPages = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create digital EICRs with auto overall assessment and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'Complete guide to C1, C2, C3, and FI classification codes.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Legal requirements, intervals, penalties, and compliance for landlord EICRs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-commercial-premises',
    title: 'EICR for Commercial Premises',
    description: 'Commercial EICR requirements, H&S law, and employer duties.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK',
    description: 'How much does an EICR cost? Pricing guide for electricians and property owners.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-makes-unsatisfactory',
    heading: 'What Makes an EICR Unsatisfactory?',
    content: (
      <>
        <p>
          The overall assessment on an EICR is a binary judgement: <strong>Satisfactory</strong> or{' '}
          <strong>Unsatisfactory</strong>. The rule is straightforward and absolute.
        </p>
        <p>
          If <strong>any</strong> observation on the EICR is classified as{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            C1 (Danger Present) or C2 (Potentially Dangerous)
          </SEOInternalLink>
          , the overall condition of the installation must be recorded as{' '}
          <strong>Unsatisfactory</strong>. There is no discretion here — a single C1 or C2 is
          enough. Even if the rest of the installation is in perfect condition, one C2 observation
          makes the entire report Unsatisfactory.
        </p>
        <p>
          If the EICR contains only C3 (Improvement Recommended) observations or no observations at
          all, the overall assessment is <strong>Satisfactory</strong>. C3 items are advisory — they
          indicate that the installation does not fully comply with the current edition of BS 7671
          but is not dangerous. The installation is safe for continued use.
        </p>
        <p>
          FI (Further Investigation) observations do not automatically make the report
          Unsatisfactory, but they indicate that certain parts of the installation could not be
          fully assessed. If the inspector has reason to believe that the area requiring further
          investigation may reveal a dangerous condition, they should note this clearly and advise
          the responsible person accordingly.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white mb-1">
                Common mistake: marking Satisfactory with a C2 present
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Some electricians mark a report Satisfactory despite a C2 being present — sometimes
                due to client pressure, sometimes because the issue seems minor. This is always
                wrong. Any C1 or C2 makes the report Unsatisfactory, full stop. Incorrectly marking
                a report Satisfactory can result in disciplinary action from your scheme provider
                and personal liability if an incident occurs.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Auto Overall Assessment — No Human Error"
          description="Elec-Mate watches your observation codes in real time. The moment you add a C1 or C2, the overall assessment flips to Unsatisfactory automatically. You cannot accidentally mark it Satisfactory when a dangerous defect is present."
          icon={ShieldAlert}
        />
      </>
    ),
  },
  {
    id: 'landlord-obligations',
    heading: 'Landlord Obligations After an Unsatisfactory EICR',
    content: (
      <>
        <p>
          Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations
          2020, landlords have specific legal obligations when an EICR returns an Unsatisfactory
          result. These obligations have real teeth — the penalties are significant and local
          authorities are increasingly willing to enforce them.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-yellow-400 text-lg mb-2">28-Day Remedial Deadline</h3>
            <p className="text-white text-sm leading-relaxed">
              The landlord must ensure that all remedial work identified by C1 or C2 observations is
              completed within 28 days of the date of the inspection. If the inspector specifies a
              shorter period on the report (common for C1 observations where immediate danger is
              present), the landlord must comply with that shorter deadline.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-yellow-400 text-lg mb-2">
              Written Confirmation Required
            </h3>
            <p className="text-white text-sm leading-relaxed">
              After the remedial work is completed, the landlord must obtain written confirmation
              from a qualified person that the work has been done to a satisfactory standard. This
              confirmation should reference the original EICR and the specific observations that
              have been addressed.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-yellow-400 text-lg mb-2">
              Notification to Tenants and Local Authority
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The landlord must supply a copy of the EICR to existing tenants within 28 days of the
              inspection, to new tenants before they move in, and to the local authority within 7
              days if requested. The confirmation of remedial work must also be provided to the
              local authority within 28 days of the work being completed if requested.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-red-400 text-lg mb-2">Penalties for Non-Compliance</h3>
            <p className="text-white text-sm leading-relaxed">
              Local authorities can impose civil penalties of up to{' '}
              <strong>30,000 pounds per breach</strong>. They can also issue remedial action notices
              requiring specific work to be carried out by a specified date. In extreme cases, the
              local authority can arrange for the work to be done themselves and recover the costs
              from the landlord. These are per-breach penalties — meaning multiple breaches across
              multiple properties can result in cumulative fines.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'electrician-duty',
    heading: "The Electrician's Duty of Care",
    content: (
      <>
        <p>
          As the inspector, you have responsibilities that go beyond simply filling in the EICR
          form. Your duty of care includes ensuring that the person responsible for the installation
          is made aware of any dangerous conditions and understands the urgency of remedial action.
        </p>
        <p>
          When a <strong>C1 (Danger Present)</strong> observation is identified:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Immediately advise the responsible person (verbally and in writing) that a danger exists
          </li>
          <li>
            If possible, remove the danger or make it safe before leaving the premises — for
            example, by isolating the affected circuit
          </li>
          <li>
            Record on the report that the responsible person has been informed and what immediate
            action was taken
          </li>
          <li>
            If the danger cannot be fully eliminated, specify on the report that immediate remedial
            action is required
          </li>
        </ul>
        <p>
          When a <strong>C2 (Potentially Dangerous)</strong> observation is identified:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Advise the responsible person that urgent remedial action is required</li>
          <li>Explain the nature of the risk in terms the client can understand</li>
          <li>Provide a written summary of the defects and the recommended remedial actions</li>
          <li>
            Where possible, provide a quote for the remedial work so the client can act promptly
          </li>
        </ul>
        <p>
          Documenting your communication with the client is essential. If an incident occurs and you
          are asked to demonstrate that you acted responsibly, your records of what you told the
          client, when you told them, and what immediate actions you took will be critical evidence.
        </p>
      </>
    ),
  },
  {
    id: 'handling-the-client',
    heading: 'Handling the Client Conversation',
    content: (
      <>
        <p>
          Delivering an Unsatisfactory result is one of the more difficult parts of the job. Many
          landlords and property owners do not expect it, and some will push back — questioning your
          findings, asking you to change the codes, or simply refusing to act. Here is how to handle
          these conversations professionally.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Be factual, not apologetic</h3>
                <p className="text-white text-sm leading-relaxed">
                  Present the findings as objective facts. "The RCD protecting the socket circuits
                  did not operate within the required time. Under BS 7671, this is classified as a
                  C2 because it means the device may not provide adequate protection in the event of
                  an earth fault." You are not making a personal judgement — you are reporting what
                  the tests revealed.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Explain the legal position</h3>
                <p className="text-white text-sm leading-relaxed">
                  For landlords, explain the 28-day deadline and the potential penalties clearly.
                  Many landlords are not aware of the Electrical Safety Standards regulations or the
                  scale of the fines. A factual explanation — "The regulations give you 28 days to
                  have the remedial work completed, and fines for non-compliance can reach 30,000
                  pounds" — usually motivates action.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Offer the solution at the same time</h3>
                <p className="text-white text-sm leading-relaxed">
                  The most effective approach is to present the EICR results and a remedial works
                  quote in the same conversation. "Here are the defects I have found. Here is what
                  it will cost to fix them. I can schedule the work for next week." This turns a
                  negative conversation into a positive one — you are not just identifying problems,
                  you are solving them.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Defects to Quote in One Tap"
          description="Every C1, C2, and FI observation feeds straight into the Elec-Mate remedial works estimator. It prices the fix — materials, labour, margin — and generates a quote on the spot. Hand the client the EICR and a quote for the remedial work before you leave."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'remedial-work',
    heading: 'Remedial Work and Re-Inspection',
    content: (
      <>
        <p>
          Once the remedial work has been identified on the unsatisfactory EICR, the next steps
          depend on the scope and nature of the work required.
        </p>
        <p>
          <strong>For minor remedial work</strong> (replacing an RCD, reconnecting a bonding
          conductor, securing a loose connection), written confirmation from a qualified person is
          usually sufficient. This takes the form of a letter or document referencing the original
          EICR, listing the specific observations that have been addressed, confirming the work
          done, and recording any relevant test results to verify the repair. In Elec-Mate, you can
          generate this remedial confirmation document directly from the original EICR.
        </p>
        <p>
          <strong>For significant remedial work</strong> (consumer unit replacement, rewiring of
          circuits, major changes to the earthing arrangements), additional certification is needed:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            If new circuits are installed as part of the remedial work, an{' '}
            <SEOInternalLink href="/guides/eicr-vs-eic-difference">EIC</SEOInternalLink> is required
            for the new circuits
          </li>
          <li>
            If alterations are made to existing circuits without new circuits, a{' '}
            <SEOInternalLink href="/tools/minor-works-certificate">
              Minor Works certificate
            </SEOInternalLink>{' '}
            covers each alteration
          </li>
          <li>
            A full re-inspection EICR may be appropriate if the remedial work was extensive enough
            to warrant re-assessing the overall condition of the installation
          </li>
        </ul>
        <p>
          The remedial work must be completed by a competent person — not necessarily the same
          person who carried out the original inspection, although in practice it often is. The
          person completing the remedial work provides the written confirmation that the landlord
          needs to satisfy the regulations.
        </p>
      </>
    ),
  },
  {
    id: 'insurance-implications',
    heading: 'Insurance Implications of an Unsatisfactory EICR',
    content: (
      <>
        <p>
          An unsatisfactory EICR has real consequences for insurance, and this is often the argument
          that motivates reluctant clients to act on the remedial work.
        </p>
        <p>
          Most building and landlord insurance policies include conditions requiring the insured to
          maintain the property in a safe condition and to comply with all applicable regulations.
          An unsatisfactory EICR is documentary evidence that the electrical installation has
          identified defects. If those defects are not addressed and an electrical incident
          subsequently occurs — a fire, a shock injury, or worse — the insurer may refuse to pay the
          claim.
        </p>
        <p>
          The logic is straightforward: the insurer provided cover on the basis that the property
          would be maintained safely. The unsatisfactory EICR proves the policyholder knew about the
          defects. Failure to act on those defects can be treated as a breach of the policy
          conditions, voiding the cover entirely — not just for the electrical incident, but
          potentially for the entire policy.
        </p>
        <p>
          Some insurers now require evidence of a satisfactory EICR before providing or renewing
          cover. This is becoming increasingly common for landlord insurance, commercial property
          insurance, and HMO insurance. As an electrician, mentioning the insurance implications to
          the client can be an effective way to motivate prompt remedial action.
        </p>
        <p>
          For the electrician, professional indemnity insurance is also relevant. If you issue an
          EICR and the client subsequently claims that the report was inaccurate, your PI insurance
          should cover the claim. However, accurate and thorough documentation is essential — a
          well-completed EICR with clear observations, correct classification codes, and evidence of
          client notification is your best defence.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-auto-assessment',
    heading: 'How Elec-Mate Handles Unsatisfactory EICRs',
    content: (
      <>
        <p>
          Elec-Mate is designed to handle the entire unsatisfactory EICR workflow — from identifying
          the defects to pricing the remedial work and generating the quote.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Auto Overall Assessment</h3>
                <p className="text-white text-sm leading-relaxed">
                  The app watches your observation codes in real time. The moment a C1 or C2 is
                  added, the overall assessment flips to Unsatisfactory automatically. You cannot
                  accidentally issue a Satisfactory report with a dangerous defect present.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Defect Code AI</h3>
                <p className="text-white text-sm leading-relaxed">
                  Not sure if it is C2 or C3? Describe the defect in plain English and the AI
                  returns the correct classification code with the matching BS 7671 regulation
                  number. Consistent, accurate coding on every report.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Remedial Works Estimator</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds directly into the remedial works estimator.
                  It prices the fix — materials, labour, margin — and generates a quote that you can
                  hand to the client alongside the EICR. The client gets the bad news and the
                  solution in one visit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete Unsatisfactory EICR Workflow"
          description="From AI-powered defect coding to automatic overall assessment to on-site remedial quotes — Elec-Mate handles the entire unsatisfactory EICR workflow. The client gets the report and the quote before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

export default function UnsatisfactoryEICRPage() {
  return (
    <GuideTemplate
      title="Unsatisfactory EICR | What Happens Next? | Elec-Mate"
      description="What makes an EICR unsatisfactory, landlord obligations (28-day deadline, £30,000 penalties), electrician duty of care, remedial work requirements, and insurance implications. For UK electricians."
      datePublished="2025-04-22"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Unsatisfactory EICR — <span className="text-yellow-400">What Happens Next?</span>
        </>
      }
      heroSubtitle="A single C1 or C2 observation makes the entire EICR Unsatisfactory. That triggers a legal chain for landlords — 28-day remedial deadline, potential fines of up to 30,000 pounds, and insurance complications. This guide covers what the electrician needs to do, how to handle the client conversation, and how to turn the remedial work into revenue."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Unsatisfactory EICRs"
      relatedPages={relatedPages}
      ctaHeading="Turn defects into quotes on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICR certificates with auto assessment, defect code AI, and remedial estimator. 7-day free trial."
    />
  );
}
