/**
 * Module 5 · Section 6 · Subsection 4 — EAWR, Building Regs reportable work, LABC vs CPS routes
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.4, 6.6
 *   AC 6.4 — "state the requirements for notification of work to building control"
 *   AC 6.6 — "state the legal requirements relating to the inspection, testing and certification of an electrical installation"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 6.4; 2366-03 Unit 302 / AC 6.4
 *
 * The legal scaffold sitting underneath the EIC. EAWR 1989 = the workplace
 * electrical safety duty (criminal liability, no upper fine ceiling).
 * Building Regulations Part P + Part L + Part B + Part J = the dwellings
 * notification regime. CPS self-certification = the contractor route that
 * bypasses individual LABC applications. Get the routes right and the
 * certification stands; get them wrong and the work is unlawful even if
 * technically compliant with BS 7671.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'EAWR, Building Regs reportable work, LABC vs CPS | Level 3 Module 5.6.4 | Elec-Mate';
const DESCRIPTION =
  'The legal framework underneath the EIC — EAWR 1989 workplace electrical safety duty, Building Regulations Part P notifiable work scope (England), and the choice between CPS self-certification (NICEIC, NAPIT, ELECSA) and direct Local Authority Building Control (LABC) notification.';

const checks = [
  {
    id: 'm5-s6-sub4-eawr-purpose',
    question:
      'The Electricity at Work Regulations 1989 sit alongside BS 7671 in what relationship?',
    options: [
      'EAWR replaces BS 7671.',
      'EAWR is statutory criminal law (Health and Safety at Work etc. Act 1974 framework) imposing duties on employers, employees and the self-employed for workplace electrical safety. BS 7671 is a non-statutory standard that, when followed, is generally accepted as discharging the technical aspects of those EAWR duties — but EAWR compliance is the legal test, not BS 7671 compliance per se.',
      'EAWR only applies to power stations.',
      'They are the same thing.',
    ],
    correctIndex: 1,
    explanation:
      'EAWR 1989 is statutory criminal law made under the HSWA 1974. It applies to all workplaces and to all electrical work in workplaces — irrespective of voltage. Duty-holders are employers, employees and the self-employed. Breaches can lead to unlimited fines on conviction in the Crown Court and (rarely) imprisonment. BS 7671 is the technical standard the industry uses to deliver compliant work; courts accept BS 7671 compliance as evidence of having taken reasonable measures, but the underlying legal duty is EAWR, not BS 7671 itself.',
  },
  {
    id: 'm5-s6-sub4-notifiable-list',
    question:
      'Under the post-2013 Approved Document P regime in England, which of the following is NOT Part P notifiable?',
    options: [
      'Installing a new circuit.',
      'Replacing a damaged double socket-outlet like-for-like in a kitchen — this is repair / replacement work outside the special locations list, so it is NOT notifiable. (It still needs an MEIWC under BS 7671 to record the test of the altered portion, but the CPS upload / LABC route does not apply.)',
      'Replacing a consumer unit.',
      'Adding a new shower circuit in a bathroom.',
    ],
    correctIndex: 1,
    explanation:
      'The 2013 reforms narrowed Part P notifiable scope significantly. Notifiable: new circuit; consumer unit replacement; most non-trivial work in special locations (Section 701 bathrooms, swimming pools, saunas, etc.). NOT notifiable: like-for-like accessory replacement, repair work, additions to an existing circuit OUTSIDE special locations. A kitchen socket swap is replacement work outside the special locations list — non-notifiable. The MEIWC is still required under BS 7671 (separate regime) but no Building Control notification.',
  },
  {
    id: 'm5-s6-sub4-cps-vs-labc',
    question:
      'A contractor without CPS membership wants to do a Part P notifiable job. The notification route is:',
    options: [
      'No notification needed.',
      'Direct application to Local Authority Building Control (LABC) BEFORE the work starts via a Building Notice or Full Plans application; LABC inspects and issues their own completion certificate. Significantly more expensive (per-job fees often hundreds of pounds) and slower than the CPS route — most contractors register with NICEIC / NAPIT / ELECSA to use the post-completion 30-day upload instead.',
      'Telephone the local council afterwards.',
      'Notification is optional for non-CPS contractors.',
    ],
    correctIndex: 1,
    explanation:
      "Two notification routes exist for Part P notifiable work in England — CPS self-certification (registered contractor uploads to scheme within 30 days post-completion; scheme notifies Building Control on the contractor's behalf) or direct LABC application (non-registered contractor applies to LABC before work starts; LABC inspects and certifies). The CPS route is faster and cheaper per job; the LABC route is heavier but available to anyone. The customer cannot legally engage a contractor for Part P notifiable work that goes via NEITHER route — that would be unlawful unnotified work.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'EAWR 1989 Reg 4(1) imposes what duty?',
    options: [
      'A duty to use only NICEIC contractors.',
      "A duty that all systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger. The duty applies to design, installation, modification, maintenance and use — and the scope of \"system\" extends to all electrical equipment, conductors and apparatus in workplaces.",
      'A duty to test every circuit annually.',
      'A duty to notify HSE of every electrical job.',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 4(1) is the foundational technical duty — systems shall be of such construction as to prevent danger so far as is reasonably practicable. Reg 4(2) extends to maintenance — systems shall be maintained so as to prevent danger. Reg 4(3) covers work activities — work activities shall be carried out in such a manner as not to give rise to danger. These three sub-regulations cascade through every stage of an installation\'s life and are the legal underpinning that BS 7671 helps discharge.',
  },
  {
    id: 2,
    question: 'On a workplace electrical installation, the duty-holders under EAWR are:',
    options: [
      'Only the contractor.',
      "Employers, employees and the self-employed — all three categories carry duties under EAWR. Employers have the heaviest set of duties (Reg 4 systems, Reg 13 isolation, Reg 16 competence, etc.). Employees have a duty to cooperate (Reg 3(2)(b)). Self-employed contractors have employer-equivalent duties when working on their own account.",
      'Only the building owner.',
      'Only the HSE inspector.',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 3 sets out the persons on whom duties are imposed. Employers and self-employed have the broad operational duties (systems safe, work competent, isolation in place, etc.). Employees have cooperation duties — work in a safe manner, follow procedures, not interfere with safety devices. On a typical electrical contracting job the contractor is the duty-holder for the work itself; the customer (where they are an employer or self-employed person) carries duties for the installation in use afterwards.',
  },
  {
    id: 3,
    question: 'Approved Document P was introduced under what primary legislation?',
    options: [
      'BS 7671.',
      "The Building Regulations 2010 (England) — Part P specifically deals with electrical safety in dwellings. Part P sits alongside Part A (structural), Part B (fire safety), Part J (combustion appliances), Part L (energy efficiency), Part M (accessibility) and others. The Approved Documents (e.g. AD-P) provide guidance on how to comply with the corresponding Part of the Building Regulations.",
      'The Electricity at Work Regulations 1989.',
      'The Health and Safety at Work etc. Act 1974.',
    ],
    correctAnswer: 1,
    explanation:
      'Building Regulations 2010 are the primary legislation; the Approved Documents are the official guidance on how to comply with each Part. AD-P (electrical safety in dwellings) was introduced in 2005 and significantly revised in 2013 to narrow the notifiable scope. AD-P is the basis for the CPS / LABC notification regime. Part P applies to dwellings — workplaces fall under EAWR rather than Part P.',
  },
  {
    id: 4,
    question: 'A contractor finishes a notifiable job (CU swap) on a Friday and forgets to upload to NICEIC. They remember the following Friday — 7 days later. What happens?',
    options: [
      'The notification is invalid.',
      'They upload immediately. Within the 30-day window the upload is normal and routine. The Building Control Compliance Certificate is issued to the customer in due course. Letting it slide further is what creates risk — once the 30-day window expires the upload becomes a late notification with a fee and an audit flag.',
      'The job has to be redone.',
      'The customer must notify Building Control themselves.',
    ],
    correctAnswer: 1,
    explanation:
      "Seven days into the 30-day window is well within the normal upload period. Just upload it. The CPS treats anything within 30 days as a routine notification with no flags. After 30 days, the upload becomes a late notification — the schemes still accept it (they prefer late notification to no notification) but it generates a late fee and an audit flag against the contractor's scheme account. Persistent late notifications can trigger remedial action from the scheme.",
  },
  {
    id: 5,
    question: 'A customer wants you (a CPS-registered contractor) to do a kitchen rewire that includes new ring final, new lighting circuit and new shower circuit. The notification route is:',
    options: [
      'No notification needed.',
      'Notify via your CPS within 30 days of completion. The work includes new circuits (notifiable in any room), so it is Part P notifiable irrespective of the kitchen-vs-special-location distinction. Upload the EIC details to NICEIC / NAPIT / ELECSA online portal; the scheme issues the BCCC to the customer.',
      'Apply to LABC before the work starts.',
      'Notify HSE.',
    ],
    correctAnswer: 1,
    explanation:
      'New circuits = notifiable wherever they are installed (the special-locations list adds extra categories of work but does not remove the new-circuit requirement). As a CPS-registered contractor your route is the standard 30-day post-completion upload to your scheme portal. The scheme handles the Building Control notification on your behalf and issues the BCCC to the customer. No pre-work LABC application required.',
  },
  {
    id: 6,
    question: "Building Regulations Part L (energy efficiency) potentially affects electrical work how?",
    options: [
      'It does not apply to electrical work.',
      "Some electrical work in dwellings (e.g. installation of fixed lighting in new builds, installation of certain controls and metering) falls within Part L scope as well as Part P. The contractor needs to confirm both Part P (electrical safety notifiable) AND Part L (energy efficiency requirements — minimum lamp efficacy, controls, etc.) compliance where applicable.",
      'Only solar PV is affected.',
      'Only electric vehicle charging is affected.',
    ],
    correctAnswer: 1,
    explanation:
      "Part L sets minimum energy efficiency standards for buildings. Some electrical work intersects — fixed lighting in new dwellings has minimum lamp efficacy requirements; new build dwellings have minimum lighting and metering controls; EV charging in new dwellings has installation requirements; solar PV and battery storage have AD-L energy compliance touch-points. The contractor's Part P notification handles the electrical safety side; Part L compliance is typically handled by the principal building contractor and the energy performance certificate process, but the electrical contractor needs to know what to fit to support Part L.",
  },
  {
    id: 7,
    question: "Under EAWR, the consequence of a serious breach (e.g. a fatality from defective electrical work) can include:",
    options: [
      'A small fine.',
      "Unlimited fine on conviction in the Crown Court (no upper ceiling under HSWA framework); imprisonment in the most serious cases; disqualification from acting as a company director; significant civil claim from the bereaved family alongside the criminal proceedings; reputational impact ending the contractor's business.",
      'No legal consequence.',
      'Only a written warning.',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR is statutory criminal law. The Health and Safety at Work etc. Act 1974 framework provides for unlimited fines on conviction in the Crown Court for serious breaches. Imprisonment is available for the most serious cases. Director disqualification is an additional consequence under the Company Directors Disqualification Act 1986. Civil claims from injured parties or bereaved families run in parallel. The reputational impact alone often ends a contractor\'s business. EAWR compliance is not optional and the certification regime under BS 7671 is the practical mechanism for evidencing it.',
  },
  {
    id: 8,
    question: 'On a small commercial electrical job (workplace, not a dwelling), the notification position is:',
    options: [
      'Same as dwellings — Part P notifiable via CPS or LABC.',
      'Part P does NOT apply (Part P is dwellings-only). EAWR applies to the workplace electrical safety. The work needs an EIC or MEIWC for BS 7671 compliance and the contractor discharges EAWR duties through competent design and installation. No CPS upload required because Part P does not apply, but the contractor may still notify Building Control if other Building Regulations Parts are triggered (e.g. Part B fire safety, Part L energy efficiency).',
      'No regulations apply.',
      'Only HSE notification.',
    ],
    correctAnswer: 1,
    explanation:
      'Part P applies to dwellings, not workplaces. On a commercial / industrial / retail / hospitality electrical job the EIC + Schedule of Inspections + Schedule of Test Results trio still applies under BS 7671, the EAWR duty applies for workplace safety, but Part P notification (and therefore CPS upload) does not. Other Building Regulations Parts may trigger — Part B fire safety on emergency lighting, Part L energy on lighting controls, Part M accessibility on switch heights — but those are separate regulatory regimes with their own notification routes (typically via the principal contractor / Building Control on the wider building project).',
  },
];

const faqs = [
  {
    question: "I am self-employed and just doing my own house up — does Part P apply?",
    answer:
      "Yes. Part P applies to electrical work in dwellings irrespective of whether the person doing the work is a registered contractor, an unregistered contractor, the homeowner themselves, or anyone else. If the work is on the notifiable list (new circuit, CU swap, special locations) it must be notified. The homeowner doing their own work cannot self-certify via a CPS (only registered contractors can do that). Their route is direct LABC notification before the work starts. This is why most homeowners use a registered contractor for notifiable work — the contractor's CPS upload handles the notification automatically.",
  },
  {
    question: "What happens if I do a Part P notifiable job and never notify it?",
    answer:
      "The work is unlawful. When the property is sold the buyer's solicitor will request the Building Control Compliance Certificate; absence triggers a query that exposes the unnotified work. Local authority can issue an enforcement notice requiring the work to be brought to the standard required by the Building Regulations (typically requiring an EICR or upgrade work) and may prosecute. Insurance claims after any electrical incident can be refused if the work was unnotified. Many lenders will not advance funds on a property with unnotified work. The customer may have civil claim against the contractor for the cost of putting it right plus any consequential loss. Always notify.",
  },
  {
    question: "Does EAWR apply in someone's home?",
    answer:
      "EAWR applies to workplaces. A home where someone runs a business (a child-minder, a hairdresser working from home, a self-employed tradesperson with a home office) is a workplace for the part used for work — so EAWR applies to that part. A purely domestic home (no work activity) falls outside EAWR but inside Part P (Building Regulations) and the wider Consumer Protection from Unfair Trading Regulations and product safety regimes. As a contractor your duties to make the installation safe are very similar in both cases — the legal label changes (EAWR vs Part P / Consumer Rights Act) but the technical standard (BS 7671) is the same.",
  },
  {
    question: "If I am a CPS member but my customer wants to engage me on a job in a brand-new build, do I still notify via the CPS?",
    answer:
      "Usually not. New-build dwellings typically run under a Full Plans Building Control submission for the whole project — the principal contractor or developer notifies all the building work including the electrical via the LABC submission. Your CPS upload would duplicate (or conflict with) that route. Confirm with the principal contractor or the developer's compliance manager before starting. On extensions and alterations to existing dwellings the CPS upload is the standard route; on completely new builds the project-wide LABC submission usually covers it.",
  },
  {
    question: "What is the difference between a Building Notice and a Full Plans application?",
    answer:
      'Both are routes to LABC for non-CPS work. Building Notice is a simpler application giving notice of works; LABC inspects during construction and issues a completion certificate. Full Plans is a more detailed application with drawings and specifications submitted for approval before work starts; LABC checks plans, inspects construction, issues completion certificate. Full Plans is more rigorous (and slower) and gives the contractor more certainty that the design is acceptable; Building Notice is faster but carries the risk of LABC raising issues during construction. For straightforward electrical work most non-CPS contractors use Building Notice; complex or contested designs may justify Full Plans.',
  },
  {
    question: "I notify via NICEIC. Does NICEIC ever audit my notifications?",
    answer:
      "Yes. All Competent Person Schemes operate audit programmes — typically a per-year sample of notifications selected for review. The auditor (an experienced electrician or assessor employed or contracted by the scheme) visits site, reviews the EIC and supporting documentation, checks the as-installed work matches the certificate, and reports back to the scheme. Pass = no action. Issues = remedial actions, possible additional training, possible suspension. Audit-readiness is part of being a CPS member — keep your documentation chain complete on every notifiable job, not just the ones you think might be audited.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 4"
            title="EAWR, Building Regs reportable work, LABC vs CPS"
            description="The legal scaffold underneath the EIC — EAWR 1989 workplace electrical safety duty, Building Regulations Part P notifiable work scope (England), and the choice between CPS self-certification (NICEIC / NAPIT / ELECSA) and direct LABC notification."
            tone="emerald"
          />

          <TLDR
            points={[
              "EAWR 1989 = statutory criminal law for workplace electrical safety. Duty-holders are employers, employees and the self-employed. Reg 4(1) systems shall prevent danger so far as is reasonably practicable; Reg 4(2) maintenance; Reg 4(3) work activities. BS 7671 compliance is the industry route to discharging the technical aspects of EAWR.",
              "Building Regulations 2010 Part P = electrical safety in dwellings (England). Approved Document P (2013 revision) defines notifiable work scope: new circuits, CU replacement, work in special locations. Like-for-like swap, repair, additions outside special locations are NOT notifiable.",
              "Two notification routes for Part P notifiable work: CPS self-certification (registered contractor uploads to NICEIC / NAPIT / ELECSA within 30 days post-completion) OR direct LABC application (Building Notice or Full Plans before work starts).",
              "CPS = faster and cheaper per job, requires annual scheme membership and assessment. LABC = available to anyone, per-job application fees significantly higher, slower lead times, risk of design challenges raised during inspection.",
              "Workplaces fall under EAWR (not Part P — Part P is dwellings-only). EIC + Schedules still apply for BS 7671 compliance. Other Building Regs Parts (B fire, L energy, M accessibility) may trigger separately on commercial work via the principal contractor route.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain the relationship between EAWR 1989 (statutory criminal law) and BS 7671 (non-statutory technical standard).",
              "State EAWR Reg 4(1)/(2)/(3) duties and identify the duty-holders (employers, employees, self-employed).",
              "Define Building Regulations Part P notifiable work scope under the post-2013 Approved Document P.",
              "Choose the correct notification route for a Part P notifiable job — CPS self-certification or direct LABC application.",
              "Apply the 30-day CPS upload window and recognise the consequences of late notification.",
              "Distinguish dwellings (Part P applies) from workplaces (EAWR applies, Part P does not).",
              "Identify other Building Regulations Parts that may interact with electrical work — Part B (fire), Part L (energy), Part M (accessibility).",
              "Describe the legal consequences of a serious EAWR breach (unlimited Crown Court fine, imprisonment, director disqualification, civil claims, reputation).",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>EAWR 1989 — the statutory backbone</ContentEyebrow>

          <ConceptBlock
            title="The Electricity at Work Regulations 1989 — what they require and who they bind"
            plainEnglish="EAWR is criminal law. It requires electrical systems in workplaces to be safe at all times, requires people working on them to be competent, and requires safe working practices. Breaches can lead to unlimited fines and imprisonment. BS 7671 compliance is how the industry typically demonstrates the technical side of EAWR compliance."
            onSite="On every workplace job — commercial, industrial, retail, hospitality, healthcare, education, public buildings — EAWR is the legal framework. BS 7671 compliance is your evidence base. Get the BS 7671 work right, document it on the EIC trio, and you have the practical defence to any EAWR challenge."
          >
            <p>The principal duties of EAWR 1989:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 3 — persons on whom duties are imposed.</strong> Employers, employees
                and the self-employed all carry duties. Employers have the broad operational
                duties; employees have cooperation duties; self-employed have
                employer-equivalent duties when working on their own account.
              </li>
              <li>
                <strong>Reg 4(1) — systems, work activities and protective equipment.</strong>
                All systems shall at all times be of such construction as to prevent, so far
                as is reasonably practicable, danger. Construction here covers design,
                specification, installation and modification.
              </li>
              <li>
                <strong>Reg 4(2) — maintenance.</strong> All systems shall be maintained so
                as to prevent, so far as is reasonably practicable, danger. Periodic
                inspection (EICR) is the practical mechanism.
              </li>
              <li>
                <strong>Reg 4(3) — work activities.</strong> Every work activity, including
                operation, use and maintenance of a system, shall be carried out in such a
                manner as not to give rise, so far as is reasonably practicable, to danger.
                Safe-isolation procedures, working dead by default, lock-off, signage all sit
                here.
              </li>
              <li>
                <strong>Reg 13 — precautions for work on equipment made dead.</strong> Adequate
                precautions to prevent equipment becoming live while work is in progress —
                this is the regulatory home of the lock-off and warning notice routine.
              </li>
              <li>
                <strong>Reg 14 — work on or near live conductors.</strong> No person shall be
                engaged in work on or near any live conductor unless three conditions are
                met — unreasonable for it to be dead in the circumstances, reasonable for the
                person to be at work in those circumstances, and suitable precautions taken.
                Live work is the exception, not the rule.
              </li>
              <li>
                <strong>Reg 16 — competence.</strong> No person shall be engaged in any work
                where technical knowledge or experience is necessary unless they have such
                knowledge or experience or are under appropriate supervision. The competent
                person test that BS 2391 / 2391-52 / 2365-03 / 2365-02 qualifications
                support.
              </li>
            </ul>
            <p>
              Each of these is a criminal duty. Breach is prosecuted by HSE (workplaces) or by
              the local authority HSE-equivalent for some sectors. Convictions sit on a
              corporate record indefinitely. The certification regime under BS 7671 is the
              industry mechanism for evidencing that the technical duties have been
              discharged.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 4 (Systems, work activities and protective equipment) — verbatim summary"
            clause="(1) All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger. (2) As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger. (3) Every work activity, including operation, use and maintenance of a system and work near a system, shall be carried out in such a manner as not to give rise, so far as is reasonably practicable, to danger."
            meaning={
              <>
                Reg 4 is the technical core of EAWR. Construction covers design and
                installation. Maintenance covers ongoing safe operation (EICR is the practical
                mechanism). Work activities cover the way you work (safe isolation, lock-off,
                competent persons). The phrase \"so far as is reasonably practicable\" is a
                defined legal test that requires duty-holders to weigh the cost / time /
                difficulty of a precaution against the risk it controls — not a blanket
                exemption but a structured judgement.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, SI 1989/635, Regulation 4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building Regulations Part P — notifiable work in dwellings</ContentEyebrow>

          <ConceptBlock
            title="What is notifiable under Approved Document P (2013 revision)"
            plainEnglish="Part P applies to electrical work in dwellings in England. Approved Document P sets out which work must be notified to Building Control. The 2013 revision narrowed the notifiable scope significantly. Notifiable work triggers the CPS upload (registered contractor) or direct LABC application (non-registered contractor)."
            onSite="The notifiable list in your head: NEW circuits anywhere; CU replacements; most non-trivial work in special locations (Section 701 bathrooms, swimming pools, saunas). Like-for-like accessory replacement, repair work, additions to an existing circuit OUTSIDE special locations = not notifiable. The MEIWC may still be required under BS 7671 but the Part P notification route does not apply."
          >
            <p>Part P notifiable work scope (England, post-2013):</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Notifiable</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">NOT notifiable</div>

                <div>Installation of a NEW circuit (anywhere in the dwelling)</div>
                <div>Like-for-like accessory replacement (e.g. damaged socket swapped for matching socket)</div>

                <div>Replacement of a consumer unit</div>
                <div>Repair work on existing circuits (e.g. re-terminating a loose connection, replacing a damaged cable section like-for-like)</div>

                <div>Addition or alteration of an existing circuit IN a special location (Section 701 bathroom, swimming pool, sauna, etc.)</div>
                <div>Addition to an existing circuit OUTSIDE a special location (e.g. adding a socket to a kitchen ring; adding a light to a hall lighting circuit)</div>

                <div>Most non-trivial work in special locations — installation of accessories, alteration of zoning</div>
                <div>Maintenance work that does not alter the circuit (cleaning, lamp replacement, fuse replacement)</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                {
                  yes: 'Installation of a NEW circuit (anywhere in the dwelling)',
                  no: 'Like-for-like accessory replacement (matching socket for matching socket)',
                },
                {
                  yes: 'Replacement of a consumer unit',
                  no: 'Repair work on existing circuits (re-terminating, replacing damaged cable section like-for-like)',
                },
                {
                  yes: 'Addition or alteration of an existing circuit IN a special location',
                  no: 'Addition to an existing circuit OUTSIDE a special location (extra socket on a kitchen ring)',
                },
                {
                  yes: 'Most non-trivial work in special locations — accessories, zoning alterations',
                  no: 'Maintenance not altering the circuit (cleaning, lamps, fuses)',
                },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Notifiable</div>
                  <div className="text-white/90 mt-0.5">{row.yes}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">NOT notifiable</div>
                  <div className="text-white/80 mt-0.5">{row.no}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 (England) — Part P, Approved Document P 2013 revision (paraphrased)"
            clause="Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury. Notifiable work in dwellings includes installation of new circuits, replacement of consumer units, and most work in special locations. Other electrical work in dwellings including like-for-like accessory replacement, repair, and additions/alterations to existing circuits outside special locations is not notifiable to Building Control."
            meaning={
              <>
                Part P is the regulatory home of the dwellings electrical safety regime. The
                Approved Document defines the notifiable scope and the routes to comply (CPS
                self-certification or direct LABC). Non-notifiable work is still subject to BS
                7671 (separate regime) and to the underlying duty in Part P that reasonable
                provision shall be made — non-notifiable does not mean unregulated, just that
                Building Control do not need to be told about it.
              </>
            }
            cite="Source: Building Regulations 2010 (England), Schedule 1 Part P; Approved Document P 2013 edition."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Notification routes — CPS vs LABC</ContentEyebrow>

          <ConceptBlock
            title="CPS self-certification vs direct LABC application — two routes, same destination"
            plainEnglish="Both routes deliver the Building Control notification for Part P notifiable work. CPS = registered contractor uploads post-completion. LABC = anyone applies pre-work. CPS is faster and cheaper per job; LABC is heavier but available to non-registered contractors and homeowners doing their own work."
            onSite="Most contractors register with a CPS for the per-job efficiency. Annual scheme fee + assessment vs per-job LABC application fees + pre-work delays. The maths almost always favours CPS membership for any contractor doing more than a handful of notifiable jobs per year."
          >
            <p>The two notification routes compared:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Aspect</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">CPS self-certification</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Direct LABC application</div>

                <div>Who can use it</div>
                <div>CPS-registered contractors only (NICEIC, NAPIT, ELECSA, Stroma, Certsure, ECA, BSI etc.)</div>
                <div>Anyone — non-registered contractors, homeowners doing their own work</div>

                <div>When notification happens</div>
                <div>POST-completion — within 30 days of job completion via the scheme online portal</div>
                <div>PRE-work — Building Notice or Full Plans application before work starts</div>

                <div>Per-job cost</div>
                <div>Modest scheme upload fee (single-digit pounds typically) plus annual scheme membership fee</div>
                <div>Substantial per-job application fee (often 100s of pounds), inspection fee, possible plans-checking fee</div>

                <div>Lead time before work can start</div>
                <div>None — start work, complete it, then upload</div>
                <div>Days to weeks depending on LABC workload — Building Notice gives a defined notice period before work can start</div>

                <div>Customer document delivery</div>
                <div>BCCC posted to customer 2-6 weeks after CPS upload</div>
                <div>LABC completion certificate issued after their inspection</div>

                <div>Audit / quality control</div>
                <div>CPS audits a sample of contractor notifications per year; assessment at scheme renewal</div>
                <div>LABC inspector reviews and checks during construction; design challenges possible at any inspection point</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                {
                  aspect: 'Who can use it',
                  cps: 'CPS-registered contractors only',
                  labc: 'Anyone — non-registered contractors, homeowners',
                },
                {
                  aspect: 'When notification happens',
                  cps: 'POST-completion — within 30 days via scheme portal',
                  labc: 'PRE-work — Building Notice or Full Plans before starts',
                },
                {
                  aspect: 'Per-job cost',
                  cps: 'Modest upload fee + annual membership',
                  labc: 'Substantial per-job application + inspection fees',
                },
                {
                  aspect: 'Lead time',
                  cps: 'None — work immediately, upload after',
                  labc: 'Days to weeks before work can start',
                },
                {
                  aspect: 'Customer document',
                  cps: 'BCCC posted 2-6 weeks after upload',
                  labc: 'LABC completion certificate after inspection',
                },
                {
                  aspect: 'Audit / quality control',
                  cps: 'CPS audits sample annually; scheme renewal assessment',
                  labc: 'LABC inspector reviews during construction',
                },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Aspect</div>
                  <div className="text-white/90 mt-0.5 font-semibold">{row.aspect}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">CPS</div>
                  <div className="text-white/80 mt-0.5">{row.cps}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">LABC</div>
                  <div className="text-white/80 mt-0.5">{row.labc}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Other Building Regulations Parts that touch electrical work</ContentEyebrow>

          <ConceptBlock
            title="Part B (fire), Part L (energy), Part M (accessibility), Part J (combustion)"
            plainEnglish="Part P is the dedicated electrical safety Part, but several other Parts of the Building Regulations interact with electrical work. Knowing which Parts touch your job avoids missing a compliance route."
            onSite="On commercial work the principal contractor typically holds the wider Building Control submission and the electrical contractor feeds into it. On domestic work most other Parts are handled at the build stage rather than at the electrical alteration stage, but emergency lighting, smart controls and EV charging in new builds are common touch-points."
          >
            <p>Parts of the Building Regulations that interact with electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part B — Fire safety.</strong> Emergency lighting, fire alarms,
                resistance to fire of cables passing through compartmentation, sleeving and
                penetrations. Often the dominant non-Part-P electrical Part on commercial
                work.
              </li>
              <li>
                <strong>Part L — Conservation of fuel and power.</strong> Minimum lamp
                efficacy, lighting controls, metering, EV charging in new builds, solar PV
                and battery storage requirements. Part L compliance often runs through the
                Energy Performance Certificate process for the building as a whole.
              </li>
              <li>
                <strong>Part M — Access to and use of buildings.</strong> Switch and socket
                heights, accessible isolators, controls reachable from wheelchair height,
                visual / audible signalling for the hearing or sight impaired in public
                buildings.
              </li>
              <li>
                <strong>Part J — Combustion appliances and fuel storage systems.</strong>
                Electrical work near gas appliances (interlocks, flue gas analysers, smart
                gas meters); CO alarms; ventilation interlocks. The electrical contractor
                typically interfaces with the gas safe engineer\'s scope.
              </li>
              <li>
                <strong>Part F — Ventilation.</strong> Mechanical ventilation systems
                (extract fans, MVHR, MEV) — typically the electrical contractor wires the
                fan / control / sensors per the ventilation designer\'s spec.
              </li>
              <li>
                <strong>Part S — Infrastructure for charging electric vehicles.</strong> New
                build dwellings and commercial properties have minimum EV charging
                infrastructure requirements. Part S touches both the electrical
                installation and the building infrastructure.
              </li>
            </ul>
            <p>
              The wider Building Control submission for a project typically aggregates all
              applicable Parts. Your electrical EIC + CPS notification covers Part P; the
              principal contractor\'s submission covers the other Parts. On a one-trade
              alteration job (CU swap, new circuit) only Part P is normally in scope from
              your side; on a project where you are part of a wider build, confirm with the
              principal contractor which Parts your work feeds into.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Doing a Part P notifiable job without notifying"
            whatHappens={
              <>
                You install a new EV charger circuit on an existing dwelling for a customer
                who pays cash and asks you to keep things informal. You issue an EIC but skip
                the NICEIC upload to save the per-notification fee. Three years later the
                customer sells the property; the buyer\'s solicitor requests the Building
                Control Compliance Certificate; you cannot produce one because there was no
                notification. The local authority becomes aware and issues an enforcement
                notice. The customer turns on you for the cost of regularising the
                installation (typically requires an EICR and possibly remedial work to bring
                it to current standards). Your CPS audit catches the missing notification on
                their next sample review and asks why.
              </>
            }
            doInstead={
              <>
                Notify every Part P notifiable job. Same-day upload is best; within the
                30-day window is required. If you really cannot use the CPS route for a
                particular job, the customer has to apply to LABC directly before the work
                starts. There is no third option of \"just don\'t notify\". Unnotified
                notifiable work is unlawful; it surfaces at sale, at insurance claim, at
                EICR; it costs both you and the customer significantly more to regularise
                later than to notify properly at the time.
              </>
            }
          />

          <CommonMistake
            title="Treating BS 7671 compliance as the legal test under EAWR"
            whatHappens={
              <>
                After an electrical fire on a workplace circuit you wired three years ago, the
                HSE inspector asks for evidence that you discharged your EAWR Reg 4(1) duty.
                Your defence is \"the work complied with BS 7671 — here is the EIC\". The HSE
                inspector accepts that as part of the evidence but reminds you that EAWR
                compliance is the legal test, not BS 7671 compliance per se. They look at the
                wider question: was the design appropriate for the workload, the location
                conditions, the foreseeable misuse? Was the inspection thorough enough? Was
                the EIC properly defensible? BS 7671 compliance is necessary but not
                always sufficient on its own.
              </>
            }
            doInstead={
              <>
                Treat BS 7671 compliance as the floor, not the ceiling. On workplace jobs
                think about the foreseeable use of the installation, the working conditions,
                the maintenance regime the duty-holder will run, the wider risk picture. The
                EAWR \"reasonably practicable\" test asks whether you took precautions
                proportionate to the risk — sometimes that is more than BS 7671 strict
                compliance, occasionally it is less (with documented reasoning). Document
                the reasoning. Keep the EIC clean. EAWR compliance is the legal target;
                BS 7671 is your standard route to it.
              </>
            }
          />

          <Scenario
            title="Domestic CU swap-out for a customer about to remortgage — the legal layer"
            situation={
              <>
                You have completed a domestic CU swap-out for a customer who tells you they
                need the certificate today because their remortgage closes tomorrow. Job is
                8 circuits, single-phase TN-C-S, all RCBOs (Type A 30 mA), measured Ze =
                0.30 Ω. You are NICEIC registered. The customer asks why you have to upload
                the EIC to NICEIC and wonders whether the EIC alone is enough for the
                lender.
              </>
            }
            whatToDo={
              <>
                <strong>Explain both regimes briefly.</strong> The EIC is the BS 7671
                certification that the installation is technically safe and compliant. The
                Building Control Compliance Certificate is the Part P / Building Regulations
                evidence that the work has been notified to Building Control via your CPS
                (NICEIC). Two separate documents, two separate regimes, both required for a
                CU swap-out which is Part P notifiable.
                <br />
                <br />
                <strong>Confirm what the lender needs.</strong> Most lenders accept the EIC
                as evidence of \"current electrical certification\" — it is the document
                that confirms the electrical work is compliant. Some lenders also ask for
                the BCCC; if so, the customer can present the EIC plus the NICEIC
                notification reference number as evidence the BCCC is in process (it
                typically arrives by post 2-6 weeks after upload).
                <br />
                <br />
                <strong>Upload to NICEIC same day.</strong> Property address, customer name,
                type of work (\"Consumer unit replacement, owner-occupied dwelling\"),
                completion date today, scope description. Save the NICEIC notification
                reference to the job file. The 30-day window is generous but same-day
                upload removes any risk of the customer chasing the BCCC weeks later.
                <br />
                <br />
                <strong>Address the legal layer for the customer.</strong> Explain that this
                is the standard process — every CU swap goes through NICEIC notification.
                The certificate is dated today (no back-dating) and represents current
                certification per BS 7671 and current notification per Part P. The customer
                presents this to the lender; if the lender asks for the BCCC specifically,
                the NICEIC reference provides the bridge while the BCCC is in process.
                <br />
                <br />
                <strong>File contractor copy.</strong> Cloud storage with: design notes,
                EIC pack PDF, NICEIC notification reference, photos of the install, customer
                walk-through summary. Indefinite retention covers Limitation Act (6+
                years), PI insurer requirements, and any future CPS audit sample.
              </>
            }
            whyItMatters={
              <>
                The legal layer underneath the EIC is what makes the work lawful, not just
                technically compliant. EAWR-equivalent diligence (here, Part P notification
                because this is a dwelling not a workplace) discharges the regulatory duty.
                BS 7671 compliance discharges the technical duty. The two together — EIC
                trio + BCCC via CPS upload — give the customer a complete defensible
                position for the remortgage today, the property sale in 5 years, the EICR
                in 10 years and any insurance interaction in between.
              </>
            }
          />

          <ConceptBlock
            title="Customer-facing handover — what the duty cascade transfers"
            plainEnglish="At commissioning the regulatory duty for the installation transfers from designer / installer / certifier into the customer&apos;s ongoing duty as duty holder. They become responsible for keeping the system safe under the Electricity at Work Regulations 1989 (or equivalent for domestic). A clean handover gives them the documents, the operating knowledge and the maintenance plan they need to discharge that duty without surprise."
            onSite="Walk the customer through every isolator, every label, every notice, every smartphone app. Hand them the file in person — physical pack plus a digital copy. Tell them about the next periodic inspection date and put a reminder in their calendar there and then. The customer who knows what to do never feels stranded; the customer who doesn&apos;t becomes a problem in six months."
          >
            <p>The handover deliverable list:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EIC plus schedule of test results and schedule of inspections.</li>
              <li>Manufacturer commissioning records and warranty documents.</li>
              <li>MCS Installation Certificate (where MCS-certified install).</li>
              <li>DNO paperwork (G98 acceptance / G99 connection agreement).</li>
              <li>Operation and maintenance pack — isolation procedure, fault-finding flowchart, emergency contacts.</li>
              <li>Recommended next periodic inspection date with reminder in customer&apos;s calendar.</li>
              <li>Photographs of every isolator and label, shared digitally.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HSE prosecution case studies — what real EAWR enforcement looks like"
            plainEnglish="The Health and Safety Executive prosecutes electrical safety failures regularly, and the case reports are public on the HSE website. Common patterns: untrained workers carrying out live work without safe-isolation, contractors failing to notify Building Control on Part P notifiable jobs, employers failing to maintain the fixed installation, designers signing off installations without competent verification. Fines have grown sharply since the 2016 sentencing guidelines — six-figure fines on small firms are now routine, multi-million on larger ones."
            onSite="The L3 apprentice rarely faces personal prosecution but the firm's senior staff and directors do. Reading two or three HSE case reports a year (electrical safety prosecutions on the HSE website) is sobering, instructive and a useful CPD entry. Common takeaway — the firms that get prosecuted are often not the obvious cowboys; they are normal-looking firms whose paperwork chain broke down on one job. Tightening the documentary discipline on every visit is the L3 apprentice's contribution to the firm's overall risk."
          >
            <p>
              Common HSE prosecution patterns and lessons:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live work without justification</strong> — EAWR
                Reg 14 requires dead-working unless live work is
                specifically justified; failing this is the leading
                prosecution route.
              </li>
              <li>
                <strong>Failure to notify under Part P</strong> — new
                circuits in dwellings notified late or not at all; the
                Building Control authority discovers and prosecutes.
              </li>
              <li>
                <strong>Inadequate isolation procedure</strong> — workers
                injured by an unexpectedly-live circuit they thought was
                isolated; investigation reveals no lock-off, no proving,
                no signed permit.
              </li>
              <li>
                <strong>Untrained worker</strong> — apprentice or general
                operative carrying out work outside their competence;
                EAWR Reg 16 prosecution against the supervising employer.
              </li>
              <li>
                <strong>Failed maintenance</strong> — fixed installation
                deteriorates, fault arises, injury follows; investigation
                finds no recent EICR and no maintenance plan.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EAWR vs domestic — the duty-of-care landscape outside the workplace"
            plainEnglish="EAWR 1989 applies to workplaces — places where employees work. Pure-domestic dwellings (where the occupier is not also the employer) fall outside EAWR; the duties there come from the Consumer Protection Act 1987, the Defective Premises Act 1972, and tort law generally. Landlords face an additional layer through the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 and equivalent regimes in Scotland, Wales and Northern Ireland."
            onSite="The L3 apprentice's discipline is the same regardless — work safely, document properly, leave a defensible record. The difference is the legal label on the duty. On a workplace job (commercial fit-out, school, hospital) EAWR applies and the customer's duty cascade is explicit. On a domestic job the duty is implicit through tort law and consumer protection; the customer is still entitled to safe work and proper documentation. Mixed-use sites (a domestic dwelling above a commercial unit, a small B&B, a home office) carry both layers — apply the strictest interpretation."
          >
            <p>
              Duty layers by site type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pure-domestic owner-occupied</strong> — Consumer
                Protection Act, Defective Premises Act, tort. No EAWR.
              </li>
              <li>
                <strong>Private-rented domestic</strong> — above plus the
                Private Rented Sector Regulations 2020 (England) /
                equivalent; mandatory five-year EICR.
              </li>
              <li>
                <strong>Mixed-use</strong> — both layers; apply the
                strictest interpretation.
              </li>
              <li>
                <strong>Workplace</strong> — EAWR 1989, Health and Safety
                at Work etc Act 1974, Management of HSAW Regs 1999,
                CDM 2015 if construction.
              </li>
              <li>
                <strong>Public buildings</strong> — workplace plus public
                liability and licensing regimes; sometimes shorter EICR
                cycles per local authority licence.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Insurance interaction — when work fails to comply and a claim arises"
            plainEnglish="Buildings insurance, public liability and professional indemnity all interact with electrical compliance. A house fire traced to a non-compliant electrical installation can void the buildings insurance claim. A worker injured on site through poor safe-isolation can claim against the firm's employer's liability. A customer suing for design defect can claim against the firm's professional indemnity. Maintaining BS 7671 compliance and proper documentation protects all three insurance lines."
            onSite="The L3 apprentice's discipline is the long tail of the firm's insurance position. Every certificate signed, every photo captured, every customer-record entry made is a piece of evidence the firm's insurers may need years later. Skipping documentation does not just risk an immediate prosecution — it risks the firm being unable to defend a future claim because the evidence trail does not exist. Treat every job as if it might end up in a claim five years later; some of them will."
          >
            <p>
              Insurance interaction summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Buildings insurance</strong> — non-compliant
                installation can void a fire claim; customer's policy
                often requires evidence of recent EICR.
              </li>
              <li>
                <strong>Employer's liability</strong> — covers the firm
                against employee injury claims; safe-isolation evidence
                is the defence.
              </li>
              <li>
                <strong>Public liability</strong> — covers the firm
                against third-party injury or damage; clean documentation
                and visible signage is the defence.
              </li>
              <li>
                <strong>Professional indemnity</strong> — covers design
                or specification negligence; the design pack and
                departure log are the defence.
              </li>
              <li>
                <strong>Customer's home insurance</strong> — increasingly
                requires EICR currency; out-of-date or missing
                certificates can complicate a claim.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514 (Identification and notices) revision"
            clause={
              <>
                Section 514 (Identification and notices) of BS 7671:2018+A4:2026 has been
                updated with a number of significant changes. These changes affect requirements
                for identification and notices within the Wiring Regulations. Illustrations of
                notices that previously appeared in Section 514 have been removed; designers
                and installers shall use Appendix 11 for examples of notices.
              </>
            }
            meaning={
              <>
                The customer&apos;s notices — periodic inspection notice, RCD test notice,
                emergency-isolation procedure — sit under Section 514 with example wording in
                Appendix 11. The wording requirements are unchanged in substance; only the
                location of the example layouts has moved. Pre-A4 reference packs that point at
                Section 514 illustrations should now point at Appendix 11.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 514 — verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EAWR 1989 = statutory criminal law for workplace electrical safety. Reg 4(1) systems shall prevent danger; Reg 4(2) maintenance; Reg 4(3) work activities; Reg 13 dead working; Reg 14 live working exception; Reg 16 competence.",
              "BS 7671 is a non-statutory technical standard. Compliance with BS 7671 is generally accepted as evidence of discharging the technical aspects of EAWR — but EAWR compliance is the legal test, not BS 7671 compliance per se.",
              "Building Regulations 2010 Part P = electrical safety in dwellings (England). Approved Document P 2013 revision narrowed the notifiable work scope: new circuits, CU replacement, work in special locations.",
              "NOT notifiable: like-for-like accessory replacement, repair, additions to existing circuits OUTSIDE special locations. The MEIWC may still apply under BS 7671 but no Building Control notification.",
              "Two notification routes: CPS self-certification (registered contractor uploads to NICEIC / NAPIT / ELECSA within 30 days post-completion) OR direct LABC application (Building Notice or Full Plans before work starts).",
              "CPS = faster and cheaper per job; annual scheme membership and assessment required. LABC = available to anyone; per-job application fees, slower lead times, design challenge risk during inspection.",
              "Workplaces fall under EAWR (not Part P, which is dwellings-only). EIC + Schedules still apply for BS 7671 compliance. Other Building Regs Parts (B fire, L energy, M accessibility, J combustion, F ventilation, S EV charging) may interact via the wider building project.",
              "Serious EAWR breach = unlimited Crown Court fine, possible imprisonment, director disqualification, parallel civil claims, reputational impact. Always notify, always document, always keep the chain complete.",
            ]}
          />

          <Quiz title="EAWR, Building Regs and notification routes — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 Commissioning paperwork chain
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Back to module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 — Inspection, testing and certification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
