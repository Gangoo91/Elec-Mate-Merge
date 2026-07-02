import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import EicrCodeChecker from '@/components/seo/EicrCodeChecker';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  ClipboardCheck,
  Search,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Camera,
  Scale,
  Wrench,
  ListChecks,
  BadgeCheck,
} from 'lucide-react';

export default function EicrCodeCheckerPage() {
  return (
    <ToolTemplate
      title="EICR Codes Explained: C1, C2, C3 + FI Checker (Free Tool)"
      description="Free EICR code checker — search 76 real observations and see how most inspectors code them: C1, C2, C3 or FI, with reasoning and landlord rules."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      toolPath="/tools/eicr-code-checker"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'EICR Code Checker', href: '/tools/eicr-code-checker' },
      ]}
      tocItems={[
        { id: 'what-codes-mean', label: 'What the Codes Mean' },
        { id: 'c1-examples', label: 'C1 Examples' },
        { id: 'c2-examples', label: 'C2 Examples' },
        { id: 'c3-examples', label: 'C3 Examples' },
        { id: 'fi-explained', label: 'FI Explained' },
        { id: 'satisfactory-unsatisfactory', label: 'Satisfactory vs Unsatisfactory' },
        { id: 'landlord-implications', label: 'Landlord Implications' },
        { id: 'how-inspectors-decide', label: 'How Inspectors Decide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Free EICR Tool"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          <span className="text-yellow-400">EICR Codes Explained</span> — C1, C2, C3 and FI Checker
        </>
      }
      heroSubtitle="Type an observation — a broken socket, missing bonding, a plastic consumer unit — and see the classification code most inspectors would apply, with practical reasoning and whether it makes the report unsatisfactory. 76 real-world observations, free to search, no signup."
      heroFeaturePills={[
        { icon: Search, label: '76 Real Observations' },
        { icon: AlertTriangle, label: 'C1 / C2 / C3 / FI' },
        { icon: ShieldCheck, label: 'Unsatisfactory Logic' },
        { icon: Scale, label: 'Landlord Rules' },
      ]}
      readingTime={12}
      calculator={<EicrCodeChecker />}
      keyTakeaways={[
        'C1 means danger is present with a risk of injury — immediate remedial action is required, and the inspector should make the danger safe or isolate it before leaving site.',
        'C2 means potentially dangerous — not causing harm right now, but likely to become dangerous under fault conditions or foreseeable use. Urgent remedial action is required.',
        'C3 means improvement recommended — the installation does not meet current standards but is not dangerous as found. C3 is the only code that still allows a satisfactory report.',
        'FI means further investigation is required without delay — the inspector could not confirm whether a danger exists, and the report cannot be satisfactory until it is resolved.',
        'Any C1, C2 or FI makes the overall EICR unsatisfactory. For rented homes in England, that triggers a legal duty to complete remedial work within 28 days, or sooner if the report specifies.',
      ]}
      sections={[
        {
          id: 'what-codes-mean',
          heading: 'What the EICR Codes Mean',
          content: (
            <>
              <p>
                An Electrical Installation Condition Report (EICR) records the condition of an
                existing electrical installation. Every defect or departure from the current
                edition of BS 7671 that the inspector observes is given a classification code
                that tells the person ordering the report how serious it is and what needs to
                happen next.
              </p>
              <p>There are four codes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-red-400">C1 — Danger present.</strong> Risk of injury
                  exists at the time of the inspection. Immediate remedial action is required.
                  The inspector should tell the duty holder straight away and, wherever
                  practicable, make the danger safe before leaving site.
                </li>
                <li>
                  <strong className="text-orange-400">C2 — Potentially dangerous.</strong> The
                  defect is not causing harm during normal use right now, but a fault or a
                  foreseeable event could make it dangerous. Urgent remedial action is required.
                </li>
                <li>
                  <strong className="text-yellow-400">C3 — Improvement recommended.</strong> The
                  installation does not meet current standards, but there is no danger as found.
                  Improvement would enhance safety; it is not compulsory.
                </li>
                <li>
                  <strong className="text-blue-400">FI — Further investigation required.</strong>{' '}
                  Something was found that suggests a safety issue, but the inspection could not
                  confirm it. Investigation is required without delay.
                </li>
              </ul>
              <p>
                A crucial point that catches out landlords and homeowners: the codes describe{' '}
                <em>risk</em>, not <em>cost</em>. A C2 can be a five-minute fix, and a C3 can be a
                full rewire recommendation. The code tells you how urgent the work is — not how
                big the bill will be.
              </p>
            </>
          ),
        },
        {
          id: 'c1-examples',
          heading: 'C1 Examples — Danger Present',
          content: (
            <>
              <p>
                C1 is reserved for defects where someone could be injured by the installation as
                it stands — usually because live parts are accessible to touch without tools.
                Typical observations most inspectors would code C1 include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  A socket outlet with a cracked faceplate exposing live terminals that a finger
                  can reach.
                </li>
                <li>Exposed live conductors in a junction box with no cover.</li>
                <li>
                  A missing blank in the consumer unit leaving the live busbar accessible.
                </li>
                <li>
                  A damaged shower pull-cord switch with live parts accessible through the broken
                  casing — worse still because bathroom users are wet.
                </li>
                <li>
                  A cracked service cut-out with live terminals visible, which also needs
                  reporting to the distribution network operator.
                </li>
              </ul>
              <p>
                When a C1 is found, the inspector should inform the duty holder immediately — not
                just record it in the report — and make the danger safe or isolate the affected
                part before leaving, where possible. A dangerous condition notification is often
                issued on the spot.
              </p>
            </>
          ),
          appBridge: {
            title: 'Photograph the defect, code it, done',
            description:
              'Elec-Mate EICRs let you attach photos to each observation, pick the code, and the report outcome updates automatically.',
            icon: Camera,
          },
        },
        {
          id: 'c2-examples',
          heading: 'C2 Examples — Potentially Dangerous',
          content: (
            <>
              <p>
                C2 is the most common serious code on domestic EICRs. The installation works
                normally today, but under fault conditions — an appliance fault, a damaged cable,
                a broken supply neutral — the defect would allow danger to arise. Observations
                most inspectors code C2 include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>No main protective bonding to incoming gas or water pipework.</li>
                <li>
                  An RCD that fails to trip within the required time when tested at its rated
                  residual current.
                </li>
                <li>
                  An undersized main earthing conductor that may not carry fault current safely.
                </li>
                <li>Reversed polarity at a socket outlet.</li>
                <li>
                  Socket outlets without 30mA RCD protection on an installation recent enough
                  that the protection should have been designed in.
                </li>
                <li>An electric shower circuit without RCD protection.</li>
                <li>
                  Ordinary twin-and-earth cable buried in a garden without mechanical protection.
                </li>
              </ul>
              <p>
                The common thread: nothing is touchable or arcing right now, but one foreseeable
                event separates the current state from a shock or fire. That is why C2 requires{' '}
                <em>urgent</em> remedial action and makes the report unsatisfactory.
              </p>
            </>
          ),
        },
        {
          id: 'c3-examples',
          heading: 'C3 Examples — Improvement Recommended',
          content: (
            <>
              <p>
                C3 covers departures from the current standard that do not present danger as
                found. Installations are inspected against today&apos;s edition of BS 7671, but
                an installation built correctly to an earlier edition is not automatically
                dangerous. Typical C3 observations include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  A plastic consumer unit in good condition (current standards call for a
                  non-combustible enclosure in domestic premises).
                </li>
                <li>
                  No RCD protection for socket outlets on an installation that predates the
                  requirement, otherwise in good condition.
                </li>
                <li>Rewireable fuses in good condition.</li>
                <li>Unsleeved earth conductors in switch and socket back boxes.</li>
                <li>Missing circuit labels, warning notices or the RCD test notice.</li>
                <li>
                  Cables in a loft unsupported, resting on the ceiling but undamaged.
                </li>
              </ul>
              <p>
                C3 items are recommendations, not requirements. A report containing only C3
                observations is still satisfactory — though a long list of C3s on an ageing
                installation is often the honest signal that a rewire is approaching.
              </p>
            </>
          ),
        },
        {
          id: 'fi-explained',
          heading: 'FI — Further Investigation Explained',
          content: (
            <>
              <p>
                FI is not a defect code — it is an honesty code. It means the inspector found
                something that suggests a safety issue but could not confirm it within the agreed
                extent and limitations of the inspection. Common examples:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Scorch marks around an accessory where the cause — appliance, loose
                  termination, or overload — cannot be identified without opening up.
                </li>
                <li>
                  Ring final circuit continuity that cannot be confirmed, suggesting a possible
                  broken ring.
                </li>
                <li>A borrowed neutral between lighting circuits whose extent is unknown.</li>
                <li>
                  A circuit that could not be tested because it supplies critical equipment that
                  could not be isolated.
                </li>
                <li>
                  Unusual test results that need specialist analysis before the circuit can be
                  declared safe or unsafe.
                </li>
              </ul>
              <p>
                The key word in the definition is <em>without delay</em>. An FI is not a
                &quot;look at it someday&quot; note — until the investigation is complete, nobody
                knows whether a danger exists, which is exactly why an FI makes the overall
                report unsatisfactory.
              </p>
            </>
          ),
        },
        {
          id: 'satisfactory-unsatisfactory',
          heading: 'Satisfactory vs Unsatisfactory — the Logic',
          content: (
            <>
              <p>The overall assessment on an EICR follows a simple rule:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Any C1, C2 or FI</strong> → the report is{' '}
                  <strong className="text-orange-300">unsatisfactory</strong>.
                </li>
                <li>
                  <strong>Only C3 observations (or none)</strong> → the report is{' '}
                  <strong className="text-green-400">satisfactory</strong>.
                </li>
              </ul>
              <p>
                An unsatisfactory report does not mean the property cannot be used — it means
                remedial action is needed before the installation can be considered safe for
                continued service. Once the C1, C2 and FI items are remedied or investigated, the
                remedial work is certificated (typically with a{' '}
                <SEOInternalLink href="/eicr-remediation">
                  minor works certificate or a new EICR
                </SEOInternalLink>
                , depending on scope) and the installation can be shown to be satisfactory.
              </p>
              <p>
                This is also why code selection matters commercially: the difference between a C2
                and a C3 on the same defect is the difference between an unsatisfactory and a
                satisfactory report. Inspectors must code on risk, never on what the customer
                would prefer the outcome to be.
              </p>
            </>
          ),
        },
        {
          id: 'landlord-implications',
          heading: 'Landlord Implications — Rented Homes in England',
          content: (
            <>
              <p>
                For privately rented homes in England, the Electrical Safety Standards in the
                Private Rented Sector (England) Regulations 2020 turn EICR codes into legal
                duties. In outline, a landlord must:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Have the electrical installation inspected and tested at least every 5 years by
                  a qualified and competent person.
                </li>
                <li>
                  Give a copy of the report to existing tenants within 28 days, to new tenants
                  before they occupy, and to the local authority within 7 days of a request.
                </li>
                <li>
                  Where the report requires remedial work or further investigation (in practice,
                  any C1, C2 or FI), complete that work{' '}
                  <strong>within 28 days — or within any shorter period the report specifies</strong>
                  , then obtain written confirmation from the electrician that it is done and
                  supply it to the tenant and local authority within 28 days of completion.
                </li>
              </ul>
              <p>
                Local authorities can serve remedial notices, arrange the work themselves and
                recover the cost, and impose financial penalties of up to £30,000 for breaches.
                Scotland and Wales have their own rental electrical safety regimes with similar
                intent — the 2020 Regulations described here apply to England.
              </p>
              <p>
                Note the interaction with C3: because C3 items do not make the report
                unsatisfactory, they do not trigger the 28-day remedial duty. This is one more
                reason the C2/C3 boundary carries real weight.
              </p>
            </>
          ),
          appBridge: {
            title: 'Unsatisfactory logic handled for you',
            description:
              'Elec-Mate EICRs set the overall assessment automatically from your coded observations — no missed C2s, no contradictory reports.',
            icon: FileCheck2,
          },
        },
        {
          id: 'how-inspectors-decide',
          heading: 'How Inspectors Decide Between Codes',
          content: (
            <>
              <p>
                Classification is the inspector&apos;s professional judgement — no lookup table
                replaces it, including this one. The codings in the checker above are how most
                inspectors would classify each observation in typical conditions, but the same
                defect can justify a different code depending on context. Experienced inspectors
                work through questions like:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Is danger present now?</strong> Can live parts be touched without
                  tools? Is something arcing, overheating, or exposed? If yes — C1.
                </li>
                <li>
                  <strong>What has to happen before someone is harmed?</strong> If a single
                  foreseeable event (an earth fault, a damaged lead, wet hands) bridges the gap —
                  C2.
                </li>
                <li>
                  <strong>Who uses the installation?</strong> A damaged accessory at floor level
                  in a nursery reads differently from the same accessory in a locked plant room.
                </li>
                <li>
                  <strong>Was it compliant when installed?</strong> A departure from today&apos;s
                  standard on a well-maintained older installation, with no added danger, points
                  to C3.
                </li>
                <li>
                  <strong>Can I actually confirm the condition?</strong> If not, the honest
                  answer is FI — never a guessed C3.
                </li>
              </ul>
              <p>
                Industry best-practice guidance on coding exists precisely because two competent
                inspectors can disagree at the margins. What is never acceptable is changing a
                code under commercial pressure — the classification records risk, and the
                inspector who signs the report owns it.
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: Search,
          title: 'Searchable observation bank',
          description:
            '76 real-world EICR observations across consumer units, bonding, bathrooms, wiring, RCDs and more — searchable in plain English.',
        },
        {
          icon: ListChecks,
          title: 'Typical coding with reasoning',
          description:
            'Every observation shows the code most inspectors would apply and the practical reasoning — what the danger is and who it affects.',
        },
        {
          icon: AlertTriangle,
          title: 'Unsatisfactory flag on every card',
          description:
            'See instantly whether an observation makes the overall report unsatisfactory, so there are no surprises at sign-off.',
        },
        {
          icon: FileCheck2,
          title: 'Professional EICRs in the app',
          description:
            'Elec-Mate produces full EICRs with coded observations, photo evidence and automatic overall assessment logic.',
        },
        {
          icon: Camera,
          title: 'Photo evidence per observation',
          description:
            'Attach photos to each observation as you find defects — the evidence lands in the finished PDF next to the code.',
        },
        {
          icon: BadgeCheck,
          title: 'Built for UK electricians',
          description:
            'Certificates, calculators, quoting and training in one app, aligned with BS 7671 and used by over 1,000 UK electricians.',
        },
      ]}
      featuresHeading="What This Tool (and Elec-Mate) Gives You"
      howToSteps={[
        {
          name: 'Describe the defect',
          text: 'Type what you found in plain English — for example "no RCD on sockets", "cracked socket" or "plastic consumer unit".',
        },
        {
          name: 'Filter by code or category',
          text: 'Tap a code card (C1, C2, C3, FI) or a category chip such as Bathrooms or Earthing & bonding to narrow the results.',
        },
        {
          name: 'Read the typical coding and reasoning',
          text: 'Each card shows the classification most inspectors would apply, why, and whether it makes the report unsatisfactory.',
        },
        {
          name: 'Apply your own judgement on site',
          text: 'Use the typical coding as a sense-check, then classify based on the actual condition, location and users of the installation you are inspecting.',
        },
      ]}
      howToHeading="How to Use the EICR Code Checker"
      howToDescription="Look up the typical classification for an EICR observation in four steps."
      faqs={[
        {
          question: 'What is the difference between C1 and C2 on an EICR?',
          answer:
            'C1 means danger is present at the time of inspection — typically live parts accessible to touch — and requires immediate action. C2 means the defect is not causing harm during normal use but would become dangerous under fault conditions or foreseeable use, such as missing main bonding or a failed RCD. Both make the report unsatisfactory; the difference is whether the danger exists now (C1) or needs one foreseeable event to arise (C2).',
        },
        {
          question: 'Does a C3 mean my EICR fails?',
          answer:
            'No. C3 means improvement is recommended — the installation does not meet current standards but is not dangerous as found. A report containing only C3 observations is still satisfactory, and C3 items carry no legal obligation to remedy in rented homes in England, although acting on them improves safety.',
        },
        {
          question: 'Is a plastic consumer unit a C2 or a C3?',
          answer:
            'A plastic consumer unit in good condition, with sound terminations and no signs of overheating, is commonly coded C3 — current standards call for a non-combustible enclosure in domestic premises, but an undamaged plastic unit is not dangerous as found. Evidence of thermal damage, loose connections or missing blanks changes the picture and can justify C2 or C1. As always, the inspector on site makes the call.',
        },
        {
          question: 'What does FI mean on an EICR and does it fail the report?',
          answer:
            'FI means further investigation is required without delay — the inspector found something suggesting a safety issue but could not confirm it within the scope of the inspection. Yes, an FI makes the overall report unsatisfactory, because until the investigation is complete nobody knows whether a danger exists. In rented homes in England the investigation must be completed within 28 days, or sooner if the report specifies.',
        },
        {
          question: 'How long does a landlord have to fix C1 and C2 defects in England?',
          answer:
            'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, where a report requires remedial work or further investigation, the landlord must complete it within 28 days — or within any shorter period specified in the report. C1 defects are dangerous now, so a competent inspector will typically specify a much shorter period, and the immediate danger should be made safe on the day. Written confirmation of the completed work must then go to the tenant and local authority within 28 days.',
        },
        {
          question: 'Can I dispute an EICR code I think is wrong?',
          answer:
            'Yes — classification is professional judgement, and industry guidance acknowledges that competent inspectors can differ at the margins. If you believe a code is wrong, ask the inspector to explain their reasoning, and consider a second opinion from another registered inspector. What no one should do is pressure an inspector to downgrade a code for commercial reasons — the code records risk, and the person who signs the report is accountable for it.',
        },
        {
          question: 'Who can carry out an EICR?',
          answer:
            'A qualified and competent person — in practice an electrician experienced in inspection and testing, typically holding a recognised inspection and testing qualification and often registered with a competent person scheme such as NICEIC or NAPIT. For rented homes in England, the 2020 Regulations require the inspector to be qualified and competent, and scheme registration or equivalent evidence is the usual way landlords demonstrate that.',
        },
      ]}
      relatedPages={[
        {
          href: '/bs7671-observation-codes',
          title: 'BS 7671 Observation Codes Guide',
          description:
            'The full guide to classification codes on condition reports — definitions, coding principles and worked examples.',
          icon: ListChecks,
          category: 'Guide',
        },
        {
          href: '/eicr-remediation',
          title: 'EICR Remedial Work',
          description:
            'What happens after an unsatisfactory EICR — quoting, completing and certificating the remedial work.',
          icon: Wrench,
          category: 'Guide',
        },
        {
          href: '/guides/best-eicr-software-uk',
          title: 'Best EICR Software UK',
          description:
            'Compare EICR apps and software for UK electricians — features, pricing and what actually matters on site.',
          icon: FileCheck2,
          category: 'Guide',
        },
      ]}
      ctaHeading="Produce professional EICRs with Elec-Mate"
      ctaSubheading="Coded observations, photo evidence, automatic satisfactory/unsatisfactory logic and a polished PDF your clients can act on — plus quoting the remedial work from the same app."
      extraSchemas={[
        {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'EICR Classification Codes',
          hasDefinedTerm: [
            {
              '@type': 'DefinedTerm',
              termCode: 'C1',
              name: 'Danger present',
              description:
                'Risk of injury. Immediate remedial action required.',
            },
            {
              '@type': 'DefinedTerm',
              termCode: 'C2',
              name: 'Potentially dangerous',
              description: 'Urgent remedial action required.',
            },
            {
              '@type': 'DefinedTerm',
              termCode: 'C3',
              name: 'Improvement recommended',
              description:
                'Does not meet current standards but no danger as found.',
            },
            {
              '@type': 'DefinedTerm',
              termCode: 'FI',
              name: 'Further investigation required',
              description: 'Further investigation required without delay.',
            },
          ],
        },
      ]}
    />
  );
}
