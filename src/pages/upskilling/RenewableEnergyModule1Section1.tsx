import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  Pullquote,
  AmendmentDiff,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s1-pricing-power',
    question:
      'The Heat Pump Investment Plan targets 600,000 installations per year by 2028. Actual run-rate is roughly 60,000. For a qualified electrician moving into heat pumps, what does that 10× gap most accurately represent?',
    options: [
      'A demand-side problem — customers have not yet been persuaded to buy',
      'A supply-side constraint that hands pricing power to MCS-certified installers',
      'Evidence that the policy target will quietly be dropped before 2028',
      'A signal that the grant funding behind the demand is about to be cut',
    ],
    correctIndex: 1,
    explanation:
      'Demand is policy-anchored (BUS, Future Homes Standard) and funding-stimulated (the £7,500 BUS grant covers a large fraction of typical install cost). The bottleneck is the installer base, supply uprating capacity at the DNO, and CU readiness in older housing stock. Where supply is the binding constraint, pricing power flows to the qualified entrant.',
  },
  {
    id: 'm1s1-pme-deletion-driver',
    question:
      'A4:2026 deleted the "reasonably practicable" exception in Reg 722.411.4.1 (PME supply to EV charging). What does that tell you about how BS 7671 is now being revised?',
    options: [
      'A4 is an editorial tidy-up with no change to the underlying requirement',
      'A4 closed a cost-defence exception, driven by open-PEN incident data at chargepoints',
      'A4 was harmonising the EV-charging rules with a European Norm',
      'The deletion was a drafting accident that is now being re-litigated',
    ],
    correctIndex: 1,
    explanation:
      'The "reasonably practicable" qualifier had drifted from a genuine practicability test into a cost-based defence. A series of open-PEN incidents on PME-supplied domestic and workplace EV installs through 2022–2024 changed the evidence base. A4 is increasingly responsive to incident data — meaning the next revisions can be anticipated by tracking HSE / IET incident reporting.',
  },
  {
    id: 'm1s1-70gw-domestic-share',
    question:
      'The British Energy Security Strategy targets 70 GW of solar capacity in the UK by 2035 (from ~15 GW in 2023). For the domestic rooftop PV installer, what does that headline number actually imply?',
    options: [
      '70 GW is all rooftop — domestic installers should expect a ~4.7× market',
      '70 GW is mostly utility-scale and commercial — domestic rooftop is a smaller share',
      '70 GW is concentrated in Scotland, where most of the connection headroom sits',
      '70 GW is the cumulative total installed since 1990, not new-build capacity',
    ],
    correctIndex: 1,
    explanation:
      'The 70 GW headline includes utility-scale ground-mount solar farms (largest single contributor in the strategy), large commercial rooftop, and domestic rooftop. Over-indexing on "70 GW = a domestic market that 4×s" produces overcapacity at the installer end. The domestic growth path is real but more aligned with funding-gate triggers (SEG, BUS) than with the utility-scale strategy.',
  },
  {
    id: 'm1s1-mcs-exclusion-feature',
    question:
      'MCS registration is voluntary at statute. SEG, BUS and ECO4 funding all require an MCS-certified installer on the cert. Which framing is most useful to the installer business?',
    options: [
      'MCS is compliance overhead that mainly limits the installer\'s margin',
      'MCS is a segmentation gate — excluding non-MCS rivals from the funded market is the feature',
      'MCS is interchangeable with TrustMark for funded LCT installations',
      'MCS is being phased out and will not gate funding for much longer',
    ],
    correctIndex: 1,
    explanation:
      'The exclusionary effect of MCS gating on the funded market is the structural advantage. A homeowner funding an LCT install through SEG, BUS or ECO4 literally cannot use a non-MCS installer. From the inside, MCS is the price of admission; from the outside, it is the wall keeping the market addressable.',
  },
  {
    id: 'm1s1-dno-queue',
    question:
      'A customer in a capacity-bound DNO region wants a heat pump install requiring a single-phase to three-phase conversion. What is most likely to be the binding constraint on the project timeline?',
    options: [
      'Sourcing the heat pump unit itself from the manufacturer',
      'Installer availability and scheduling a qualified MCS team',
      'The DNO G99 connection queue and supply-upgrade lead time, often 12+ months',
      'Building Control notification turnaround for the completed work',
    ],
    correctIndex: 2,
    explanation:
      'In capacity-bound parts of GB, DNO connection queues are now the dominant timeline driver. Twelve-month-plus lead times for three-phase upgrades or substantial generation connections are common. The site survey must include a DNO precheck (capacity, queue position, indicative timeline). Telling the customer "we can install in three weeks" when the supply upgrade is twelve months out is the source of the most common LCT commercial dispute.',
  },
  {
    id: 'm1s1-chapter-81-convergence',
    question:
      'A4:2026 introduced Appendix 17 (energy efficiency) into BS 7671 — explicitly framed as the precursor to a future Part 8. What is the strategic significance?',
    options: [
      'It is a relabelling exercise with no real impact on day-to-day design',
      'It is convergence — BS 7671 takes on Part L energy-efficiency design in the Part 6 cert',
      'It legally reclassifies BS 7671 as a statutory Building Regulation',
      'It deletes Building Regulations Part L for electrical installations',
    ],
    correctIndex: 1,
    explanation:
      'Energy efficiency design historically lived in Building Regulations Part L assessments. Appendix 17 brings the BS 7671 designer into that conversation and makes certain decisions recordable on Part 6 certs. The 19th Edition is expected to promote Appendix 17 into a full Part 8. The competent LCT designer in 2027 onwards needs Part L-aware design competence, not just BS 7671 competence.',
  },
  {
    id: 'm1s1-19th-edition',
    question:
      'A4:2026 is the fourth and final amendment to the 18th Edition of BS 7671. What is the next major revision step?',
    options: [
      'A5:2028 — a fifth amendment extending the 18th Edition cycle',
      'The 19th Edition — a new edition in IET / BSI committee, expected 2028–2030',
      'Withdrawal of BS 7671 in favour of the international BS EN 60364 series',
      'Transfer of the standard from the IET to the HSE for future revision',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 closes the 18th Edition amendment cycle. The next step is a new edition — the 19th Edition — currently in joint committee. The expected direction is consolidation of the scattered LCT chapters into a more coherent Part 7 framework. The recordkeeping changes A4 introduced foreshadow the 19th Edition\'s documentation philosophy.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Section 1.1 frames the LCT installer market as supply-constrained. Which single project decision is most defensible against the supply-constraint analysis?',
    options: [
      'Compete on price by undercutting established installers on every domestic quote',
      'Wait for the market to mature and prices to settle before entering at all',
      'Invest in MCS MIS training (3002 PV, 3003 heat pumps, 3008 heat batteries) to enter the funded market at higher margin',
      'Focus exclusively on non-MCS cash jobs to avoid the cost of scheme membership',
    ],
    correctAnswer: 2,
    explanation:
      'Supply constraint produces pricing power. Pricing power accrues to qualified entrants, not undercut entrants. MCS MIS training opens the funded market — the segment where the customer is grant-supported and the installer can hold margin. The cash-only segment competes on price; the funded segment competes on competence and capacity.',
  },
  {
    id: 2,
    question:
      'A4:2026\'s 551.7.1(c) requirement for a protective device where energy flow is bidirectional is best read as which kind of regulatory move?',
    options: [
      'The regulatory acknowledgement that the grid model is now bidirectional in operation — protection design must catch up',
      'A purely editorial tidy-up of practice that competent installers already followed',
      'A defensive change driven mainly by insurers seeking to limit their PV-related exposure',
      'A harmonisation exercise aligning BS 7671 with the United States National Electrical Code',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 historically assumed unidirectional flow (DNO supply down to consumer load). PV export, BESS charge / discharge, and V2G EV charging make that assumption wrong on millions of installations. 551.7.1(c) is the standard catching up to operational reality.',
  },
  {
    id: 3,
    question:
      'The "reasonably practicable" exception in Reg 722.411.4.1 was deleted in A4:2026. The most accurate diagnosis of why is:',
    options: [
      'The phrase was grammatically awkward and was reworded for clarity without changing the intent',
      'It was an editorial typo carried over from an earlier amendment and quietly corrected',
      'The qualifier had drifted into a cost-based defence; the open-PEN incident record made it indefensible',
      'It was removed solely to align the EV charging rules with the United States National Electrical Code',
    ],
    correctAnswer: 2,
    explanation:
      'A4\'s revisions are increasingly evidence-driven. The qualifier had become routinely cited as cost-justification rather than as a genuine impossibility argument, leaving open-PEN failure modes latent in PME-supplied EV installs. The corollary for the LCT installer: track HSE / IET incident reporting on PV DC arc, BESS thermal events and V2G — those incident streams predict the next set of revisions.',
  },
  {
    id: 4,
    question:
      'A homeowner in a capacity-bound DNO region wants three EV chargepoints (one home, two for tenants). The supply is single-phase, 100 A. The most honest first answer to the customer is:',
    options: [
      '"We can install next week — three 7.4 kW chargers on a single-phase supply is straightforward"',
      '"BS 7671 forbids more than one chargepoint per dwelling, so two of these are non-compliant"',
      '"The DNO conversation sets the timeline first — you may need a supply upgrade, and the queue here is 12+ months"',
      '"We will need MCS approval before we can quote, which usually adds several weeks to the start date"',
    ],
    correctAnswer: 2,
    explanation:
      'Three 7.4 kW chargepoints simultaneously on a single-phase 100 A supply is 96 A diversified load just on the EV side. Feasible only with load management, and even then constrained. The honest answer is the one that puts the binding constraint up front in the survey conversation — not after the deposit is taken.',
  },
  {
    id: 5,
    question:
      'Appendix 17 (energy efficiency) in A4:2026 lands certain design decisions on Part 6 certification. Which framing is most useful to the LCT designer?',
    options: [
      'It is informational only and has no bearing on the Part 6 certification of a design',
      'It overlaps Building Regulations Part L — efficiency choices become cert-recordable, slated to become a Part 8',
      'It applies only to fixed motor loads rated above 7.5 kW and not to general installation design',
      'It directly replaces Building Regulations Part L for all new electrical installations',
    ],
    correctAnswer: 1,
    explanation:
      'Cable sizing for loss minimisation, transformer efficiency class, variable-speed-drive choice are now BS 7671 design decisions with cert-level recordability. Appendix 17 collapses part of the boundary between BS 7671 and Part L. LCT design competence in 2027+ must include Part L-aware loss thinking.',
  },
  {
    id: 6,
    question:
      'A homeowner shows you a 2024 EICR coded C3 for "no PEN-fault protective device on existing PME-supplied EV chargepoint". Under A4:2026, the same observation on a 2026 installation would most likely be:',
    options: [
      'A C2 against the current standard, because the "reasonably practicable" exception is no longer available',
      'Still a C3 informational note, since the omission is acceptable on an existing PME supply',
      'A non-issue, as PEN-fault protection has never been required on domestic chargepoints',
      'A C1 immediate danger, because the absence of the device is dangerous in all conditions',
    ],
    correctAnswer: 0,
    explanation:
      'The 2024 EICR coded the observation as informational because the exception was available. A4 removes the exception. From 15 October 2026 a new install lacking a recognised PEN-fault protective measure on a PME-supplied chargepoint is non-compliance. C2 is the appropriate code where the omission would constitute a contravention with potential danger.',
  },
  {
    id: 7,
    question:
      'A4:2026 modified Reg 133.1.3 — certain usage of equipment must now be recorded on the appropriate Part 6 certificate. The strategic significance for LCT installs is:',
    options: [
      'A burdensome paperwork addition with no practical benefit to the installer or customer',
      'A change that affects only large commercial installations and not domestic LCT work',
      'Part of a traceability trajectory — design decisions become cert-recorded for future inspection, EAWR and PI audit',
      'A reversal of the changes introduced by the earlier A3:2024 amendment',
    ],
    correctAnswer: 2,
    explanation:
      'A4 is part of a trajectory. Reg 133.1.3 (equipment usage), Reg 551.7.1(c) (bidirectional device — a recordable design choice), Appendix 17 (energy-efficiency design — recordable on cert) all push the same way: the cert is the durable audit trail. The 19th Edition is expected to push further.',
  },
  {
    id: 8,
    question:
      'The next major revision of BS 7671 after A4:2026 will be:',
    options: [
      'A fifth amendment (A5) extending the 18th Edition amendment cycle further',
      'The wholesale adoption of BS EN 60364 in place of BS 7671 across the UK',
      'The 19th Edition — a new edition, currently in the IET / BSI joint committee',
      'A formal withdrawal of BS 7671 by the IET with no replacement standard',
    ],
    correctAnswer: 2,
    explanation:
      'A4 closes the 18th Edition amendment cycle. The 19th Edition is in the joint committee with an expected publication window of 2028–2030. Calling the next revision "A5" is a common error and an immediate giveaway of stale CPD.',
  },
];

const faqs = [
  {
    question:
      'Is the UK net-zero target genuinely binding on government, or is it political commitment that could be quietly reset?',
    answer:
      'Binding. Section 1 of the Climate Change Act 2008, as amended by the Climate Change Act 2008 (2050 Target Amendment) Order 2019, imposes a statutory duty on the Secretary of State to ensure the 2050 net carbon target is met. The five-year statutory carbon budgets constrain the trajectory. A future government would need primary legislation to repeal or weaken the duty. Judicial review of climate policy on the basis of the Act has been used successfully (the 2022 ClientEarth case on the Net Zero Strategy). The duty is durable enough to plan a business around.',
  },
  {
    question:
      'If the installer base is the binding constraint on heat pump rollout, why are training providers not flooding the market with new MIS 3003 installers?',
    answer:
      'Several frictions stack. MIS 3003 training is time-intensive (typically 5–10 days plus practical assessment) and requires sufficient install volume during the post-training period to retain competence. The training itself is paid (£1.5k–£3k typical), unlike apprentice-route electrical training. The economic case is rate-dependent — at current pricing, payback is good, but the rate needs to be sustained. Many electricians wait for confirmed pipeline before committing.',
  },
  {
    question:
      'How should I handle a DNO connection queue that exceeds the customer\'s expected timeline?',
    answer:
      'Put the DNO conversation first in the survey, not last. The site assessment for any LCT install where the supply may need uprating must include a DNO precheck — current connection, available headroom, queue position estimate. Provide the customer with the DNO timeline before the install quote, in writing, as a project gating item. The most damaging commercial mistake in LCT is taking a deposit on a deliverable timeline that the DNO will not honour.',
  },
  {
    question:
      'Does Appendix 17 (energy efficiency) actually change what an LCT designer needs to do on a day-to-day install?',
    answer:
      'Selectively, yes. Appendix 17 introduces loss-minimisation design considerations and makes certain decisions recordable on Part 6 certs. For routine domestic installs the recordable items are narrower than the cross-cutting design philosophy. The deeper change is cultural: BS 7671 designers are increasingly expected to think about energy efficiency as a design dimension, not just protection coordination. The 19th Edition is expected to push further, promoting Appendix 17 into a full Part 8.',
  },
  {
    question:
      'How do I tell whether a customer\'s LCT install actually needs a CU upgrade, three-phase conversion or DNO uprating?',
    answer:
      'Three checks. (1) Load: project the diversified post-install load against the existing main fuse rating. (2) CU: spare ways for dedicated circuits, RCBO availability, type compatibility (Type A vs Type B vs Type F for the LCT loads). (3) DNO: written precheck on existing supply capacity, local feeder headroom, and connection queue. The DNO precheck is the one most often skipped and most likely to invalidate a project timeline.',
  },
  {
    question:
      'Are PI insurers materially repricing LCT work, and how should I prepare for the next quote cycle?',
    answer:
      'Yes. PI underwriters are increasingly LCT-aware — pricing differentiates between general electrical contracting and LCT-heavy portfolios. The driver is loss experience: BESS thermal events, EV chargepoint open-PEN incidents, PV DC arc claims. Underwriters look for: MCS registration, MIS-specific competence evidence, incident-free track record, electronic cert workflow with photo / GPS / timestamp records, and a documented departure register. Have the bundle ready before the broker asks.',
  },
  {
    question:
      'Northern Ireland, Scotland, Wales — does the LCT regulatory landscape differ enough to matter?',
    answer:
      'BS 7671:2018+A4:2026 is GB-and-NI-wide; MCS is UK-wide. The Building Regulations differ: England uses Approved Document P and Approved Document S; Wales has its own version; Scotland uses the Building (Scotland) Regulations 2004 and the Technical Handbooks; Northern Ireland uses the Building Regulations (NI) 2012 with Technical Booklet E. The statutory hooks also differ — EAWR 1989 covers GB; the Electricity at Work Regulations (NI) 1991 covers NI. Funding schemes differ — Home Energy Scotland grants are the Scottish parallel to BUS.',
  },
  {
    question:
      'What is the realistic timeline for the 19th Edition of BS 7671?',
    answer:
      'The IET / BSI joint committee is working through proposed structural changes. Public consultation on the draft is expected during 2027–2028; publication during 2028–2029 is the working assumption; implementation transition through 2029–2030. The expected direction: consolidation of the LCT chapters into a clearer Part 7 framework, promotion of Appendix 17 into Part 8, deeper integration with BS EN 60364. The 18th Edition with A4 amendments remains in force across the transition.',
  },
  {
    question:
      'Is there a sensible order of operations for a qualified electrician moving into LCT — which technology first?',
    answer:
      'EV charging is the most accessible entry point: lowest training overhead, highest install volume, clear MCS pathway. Solar PV is the next logical step — more design depth (DC-side knowledge, BS EN 62446 commissioning), MIS 3002 competence, link to the funded market via SEG. BESS (MCS heat-battery pathway plus Chapter 57 competence) and heat pumps (MIS 3003, deeper hydraulic and heat-loss training) are the highest-margin, highest-friction options.',
  },
];

export default function RenewableEnergyModule1Section1() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Why renewables now — UK landscape & regulatory direction | Renewable Energy 1.1 | Elec-Mate',
    description:
      'The structural forces driving the LCT installer market, the A4:2026 regulatory direction of travel, and the strategic decisions that follow for the qualified electrician entering renewables.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · BS 7671:2018+A4:2026"
            title="Why renewables now — UK grid, policy & the installer market"
            description="The structural forces driving the LCT installer market, the regulatory direction of travel under A4:2026, and the strategic decisions that follow for the qualified electrician entering renewables."
            tone="yellow"
          />

          <TLDR
            points={[
              'Net zero by 2050 is a statutory duty under the Climate Change Act 2008 (as amended in 2019). The LCT installer is the delivery mechanism for that duty.',
              'The installer market is supply-constrained, not demand-constrained. The gap between current run-rate and policy targets is structural pricing power for MCS-certified entrants.',
              'A4:2026 closes the 18th Edition amendment cycle and signals a coherent direction: bidirectional grid model (Reg 551.7.1(c)), incident-driven tightening (Reg 722.411.4.1 PME deletion), cert-as-audit-trail (Reg 133.1.3), and the holistic prosumer-installation framework in new Chapter 82.',
              'The new Chapter 82 (Prosumer\'s Electrical Installations / PEIs) treats the hybrid LCT install as a coherent system, not as separate per-technology installations — the system-level chapter for PV + BESS + EV + heat pump combinations.',
              'The headline policy targets (70 GW solar, 600k heat pumps, 850k EV chargepoints) need disaggregating before they inform a business plan.',
              'The next major revision is the 19th Edition (not "A5"), currently in IET / BSI joint committee with expected publication 2028–2030.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Locate the UK net-zero duty in statute and read the policy stack above it as implementation routes, not the duty itself.',
              'Read the A4:2026 LCT-relevant changes (Reg 551.7.1(c), Reg 722.411.4.1, Reg 133.1.3, Appendix 17) as a coherent regulatory direction rather than as isolated amendments.',
              'Disaggregate the headline LCT market numbers before they inform commercial decisions — utility-scale vs domestic, funded vs unfunded.',
              'Position MCS not as compliance overhead but as a market-segmentation mechanism.',
              'Identify the upstream electrical infrastructure constraints that gate LCT project delivery as tightly as installer count does.',
              'Anticipate the 19th Edition direction of travel from A4:2026\'s recordkeeping and bidirectional-flow changes.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Net zero is a statutory duty, not a policy preference.</Pullquote>

          <ContentEyebrow>Where the LCT installer sits in UK policy</ContentEyebrow>

          <ConceptBlock
            title="Net zero is a statutory duty — the installer is the delivery mechanism"
            plainEnglish="The UK has a legal duty to hit net zero by 2050. That duty gets discharged on roofs, in plant rooms and on driveways."
            onSite="Read every LCT job as part of a regulated programme. The cert you sign is in service of a statutory obligation that runs from the Secretary of State down to the building you are working in."
          >
            <p>
              The Climate Change Act 2008, as amended in 2019, imposes a statutory duty on
              the Secretary of State to ensure that net UK carbon emissions in 2050 are at
              least 100% lower than the 1990 baseline.
            </p>
            <p>
              The five-year statutory carbon budgets (sections 4–10 of the Act) give the
              duty short-term bite. The duty cannot be quietly deferred into the 2040s — it
              has to be visibly on-track each five-year period.
            </p>
            <p>The implementation routes from statute into installer work are policy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Net Zero Strategy: Build Back Greener (October 2021)</li>
              <li>British Energy Security Strategy (April 2022)</li>
              <li>Powering Up Britain (March 2023)</li>
              <li>Future Homes Standard (effective 2025)</li>
              <li>Boiler Upgrade Scheme — heat pump grants</li>
              <li>Smart Export Guarantee — PV export tariffs</li>
              <li>ECO4 / GBIS — retrofit funding for eligible households</li>
            </ul>
            <p>
              These are policy, not statute. They set the funding gates and the Building
              Regulations changes that drive individual customers to pick up the phone.
            </p>
            <p>
              The duty is durable. Judicial review of climate policy on the basis of the Act
              has been used successfully — the 2022 ClientEarth case forced redrafting of
              the Net Zero Strategy on adequacy grounds. A future government would need
              primary legislation to weaken the duty: politically expensive, procedurally
              slow.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Supply constraint, not demand constraint — read the gap as pricing power"
            plainEnglish="There is no shortage of customers wanting heat pumps. There is a shortage of qualified installers and adequate supply infrastructure. Where supply is the bottleneck, price holds."
            onSite="The MIS training spend is investment, not overhead. The cash end of the market competes on price; the MCS-gated, funded end competes on competence and capacity. Sit on the right side of that line."
          >
            <p>
              The Heat Pump Investment Plan targets 600,000 heat pump installations per
              year by 2028. Actual run-rate in 2023–2024 sat at roughly 60,000 per year — a
              10× gap.
            </p>
            <p>That gap is not a demand problem. It is a supply problem:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>MCS MIS 3003 installer count</li>
              <li>DNO capacity for single-to-three-phase conversions</li>
              <li>CU readiness in older housing stock</li>
              <li>Hot-water cylinder and unvented-system retrofit competence</li>
            </ul>
            <p>
              Where demand is policy-anchored and supply is constrained, price holds. A
              qualified MCS MIS 3003 installer charging the going rate for a heat pump
              install in 2026 is not in a price war — they are in a queue.
            </p>
          </ConceptBlock>

          <Pullquote>The installer market is supply-constrained — that's the pricing power.</Pullquote>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 133.1.3 (Selection of equipment)"
            clause="Regulation 133.1.3 has been modified and now requires that certain usage of equipment shall be recorded on the appropriate electrical certification specified in Part 6."
            meaning="A4 starts to make the cert the durable audit trail for design-side decisions that previously lived only in the design office. For the LCT installer, this is the leading edge of a trajectory — A4 introduced the recording duty narrowly; the 19th Edition is expected to extend it."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The headline numbers, disaggregated</ContentEyebrow>

          <ConceptBlock
            title="70 GW solar by 2035 is not a 4.7× domestic rooftop market"
            plainEnglish="The big policy numbers sound dramatic. Before they inform any business decision, split them into what is actually addressable for the domestic installer."
            onSite="On a customer-facing quote, the relevant numbers are local — SEG export tariff offered by their supplier, BUS grant eligibility, current DNO queue position. The 70 GW headline is context; the local picture is the conversion."
          >
            <p>
              The British Energy Security Strategy targets 70 GW of total UK solar capacity
              by 2035, from a baseline of roughly 15 GW in 2023. The political framing is
              "five times more solar".
            </p>
            <p>The operational decomposition is more nuanced. The 70 GW splits across:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Utility-scale ground-mount</strong> — the
                largest single contributor in strategy modelling. Does NOT flow through the
                domestic MCS PV installer network.
              </li>
              <li>
                <strong className="text-white">Large commercial rooftop</strong> — the
                middle slice. Some MCS overlap; mostly commercial PV specialists.
              </li>
              <li>
                <strong className="text-white">Domestic rooftop</strong> — the third slice.
                The MCS PV installer\'s addressable market. Smaller than the headline
                implies, and growing more slowly than the strategy total.
              </li>
            </ul>
            <p>
              The other headline targets need similar disaggregation. Heat pumps: ASHP vs
              GSHP vs hybrid; like-for-like swaps vs whole-system retrofit. EV chargepoints:
              domestic vs workplace vs public DC fast.
            </p>
          </ConceptBlock>

          <Pullquote>Disaggregate the headline before it informs the business plan.</Pullquote>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The A4:2026 regulatory direction of travel</ContentEyebrow>

          <ConceptBlock
            title="A4 is the regulatory acknowledgement that the grid model has changed"
            plainEnglish="BS 7671 used to assume electricity flows one way — DNO down to the customer. A4 codifies that this is now wrong on millions of installations."
            onSite="On every grid-tied LCT install, the bidirectional-flow protective device decision is a recordable design choice. Document it on the cert. The next periodic inspector reading that cert in 2031 will look for the design intent, not just the test results."
          >
            <p>
              Reg 551.7.1 was redrafted in A4 and gained two new indents that change the
              design conversation on every grid-tied LCT install.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Indent (c)</strong> — a suitable protective
                device shall be provided where energy flow is bidirectional. Engages every
                grid-tied PV inverter, BESS, and V2G charger.
              </li>
              <li>
                <strong className="text-white">Indent (d)</strong> — prohibits connecting a
                source to the load side of an RCD under certain conditions.
              </li>
            </ul>
            <p>
              Together they are the regulatory acknowledgement that the design assumption
              of unidirectional flow no longer matches the operational reality.
            </p>
            <p>
              The cert is the audit trail. The cost of the change is design time on each
              install; the benefit is that the next inspector can read the design intent
              rather than infer it.
            </p>
          </ConceptBlock>

          <Pullquote>A4 is regulatory acknowledgement that the grid model has changed.</Pullquote>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.1 (Additional requirements for generating sets — A4 changes)"
            clause="Regulation 551.7.1 has been redrafted. An indent (c) has been added which requires a suitable protective device where energy flow is bidirectional. In addition, an indent (d) has been added which prohibits the connection of a source to the load side of an RCD under certain conditions."
            meaning="The unidirectional-flow assumption no longer matches the installed base. Grid-tied PV, BESS and V2G EV chargers all create bidirectional flow at the consumer\'s interface with the public supply. The protective device for that case is now an explicit design decision."
          />

          <ConceptBlock
            title="Reg 722.411.4.1 is incident-driven — and tells you how A4 is being revised"
            plainEnglish="The PME exception was not deleted because someone thought the wording was ugly. It was deleted because a wave of open-PEN faults at PME-supplied EV chargepoints made it indefensible."
            onSite="Track HSE and IET incident reporting — PV DC arc, BESS thermal events, V2G inverter faults, EV chargepoint PEN faults. The pattern in the incident stream is the leading indicator of the next regulatory tightening."
          >
            <p>
              The "reasonably practicable" qualifier in Reg 722.411.4.1 had drifted over
              the A2:2022 and A3:2024 period from a genuine practicability test into a
              routine cost-defence.
            </p>
            <p>
              Many domestic EV chargepoint installs on PME supplies omitted recognised
              PEN-fault protective measures and cited the exception. Through 2022–2024 the
              incident record built — open-PEN faults at the chargepoint location, exposed
              conductive-part voltage on the vehicle chassis, several fatality and serious-
              injury cases on commercial workplace installs.
            </p>
            <p>
              A4 closed the exception. The deeper point is the pattern of revision: BS 7671
              is increasingly responsive to incident data rather than academic engineering
              opinion. The committee is willing to make the tightening change when the
              evidence base supports it, on a four-year amendment cadence.
            </p>
            <p>
              For the installer tracking the regulatory direction: where you can see the
              incident stream forming, you can anticipate the revision. BESS thermal-runaway
              incidents are featuring in HSE and London Fire Brigade reporting through
              2024–2026 — the 19th Edition is widely expected to tighten BESS siting,
              ventilation and isolation requirements.
            </p>
          </ConceptBlock>

          <AmendmentDiff
            regNumber="BS 7671 · 722.411.4.1 (PME supply to EV charging)"
            was="Where the supply was from a PME source, an exception was permitted where it was not reasonably practicable to provide a recognised PEN-fault protective measure. In practice the exception was routinely cited on cost or convenience grounds, leaving open-PEN failure modes latent in many domestic and workplace installs."
            now="The 'reasonably practicable' exception has been deleted. A recognised PEN-fault protective measure (TT island with local earth electrode and 30 mA RCD; chargepoint with integral PEN-fault voltage-monitoring; or equivalent recognised measure) is now required for PME-supplied EV chargepoints, with no cost-based dodge."
            rationale="The 2022–2024 incident record on open-PEN faults at PME-supplied chargepoints — including several serious-injury cases on workplace installs — made the exception indefensible. A4 is increasingly evidence-driven; the deletion is the regulatory response to the incident stream."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Appendix 17 — BS 7671 colonising Part L territory</ContentEyebrow>

          <ConceptBlock
            title="Appendix 17 is regulatory convergence, not relabelling"
            plainEnglish="Energy efficiency used to live in Building Regulations Part L. A4:2026 starts to embed it in BS 7671. The boundary between the two regimes is moving."
            onSite="On any install where loss minimisation matters — long sub-mains, three-phase commercial work, motor circuits — Appendix 17 design considerations are now within scope."
          >
            <p>
              Appendix 17 is the new energy-efficiency appendix introduced in A4:2026, and
              is explicitly framed as the precursor to a new Part 8 of BS 7671 in a future
              amendment.
            </p>
            <p>The scope of Appendix 17 covers loss-minimising design choices:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Cable sizing for loss minimisation (not just protection coordination)</li>
              <li>Transformer efficiency class selection</li>
              <li>Motor efficiency class</li>
              <li>Variable-speed-drive specification</li>
              <li>Control strategy</li>
            </ul>
            <p>
              Some of those design decisions become recordable on the appropriate Part 6
              certification — extending the A4 traceability trajectory from Reg 133.1.3
              into the energy-efficiency domain.
            </p>
            <p>
              The 19th Edition is expected to promote Appendix 17 into a full Part 8.
              Energy-efficiency design becomes the same architectural tier as the existing
              Parts. The LCT designer of 2027 onwards needs Part L-aware loss thinking
              alongside protection coordination.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Chapter 82 — the prosumer installation framework (new in A4)</ContentEyebrow>

          <Pullquote>Chapter 82 is the system-level chapter for the prosumer installation.</Pullquote>

          <ConceptBlock
            title="Chapter 82 — the new chapter that treats hybrid installs as systems"
            plainEnglish="A4:2026 introduced Chapter 82 covering Prosumer\'s Electrical Installations (PEIs) — installations with local production and / or storage of energy. The system-level chapter for hybrid LCT installs."
            onSite="On any hybrid install (PV + BESS, PV + V2G EV, the full PV + BESS + EV + heat pump combination), Chapter 82 is the regulatory acknowledgement that the install is one coherent system. The per-technology chapters (712, 722, Chapter 57) still apply at their layer; Chapter 82 adds the system-level discipline on top."
          >
            <p>
              Chapter 82 is the new Prosumer\'s Electrical Installations chapter in A4:2026.
              The scope: low-voltage installations that include local production and / or
              storage of energy, designated as PEIs and required to comply with Chapter 82
              where applicable.
            </p>
            <p>The stated objective of Chapter 82:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                Compatibility with current and future ways to deliver electrical energy
                to current-using equipment
              </li>
              <li>
                Supply from the public network OR from local sources (or both in
                parallel)
              </li>
              <li>
                Coherent design, erection and verification of the install as a single
                system rather than separate per-technology installations
              </li>
            </ul>
            <p>
              For the hybrid LCT installer, Chapter 82 makes the system-level design
              discipline a regulatory requirement rather than a best-practice option. The
              chapter sits alongside the per-technology chapters and adds requirements for
              the interactions: load management, export coordination, multi-source fault
              current contribution, multi-source protection coordination.
            </p>
            <p>
              Section 722 itself was updated in A4 with an explicit reference to prosumer
              installations — making the EV-chargepoint design conversation cross-chapter
              on any property with local generation. Reg 826.1.4 (within the existing
              battery storage section) addresses transient overvoltages in PEIs and the
              consideration of surge protective devices.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 (new in A4) — Prosumer\'s Electrical Installations"
            clause="Chapter 82 is a new chapter providing requirements, measures and recommendations for design, erection and verification of all types of low-voltage electrical installations designated as Prosumer\'s Electrical Installations (PEIs). It applies where local production and/or storage of energy is present in a low-voltage installation. The objective is compatibility with current and future ways to deliver electrical energy from the public network or local sources."
            meaning="Chapter 82 is the regulatory acknowledgement that the hybrid LCT install is a coherent system. Per-technology chapters (712, 722, Chapter 57) still apply at their layer; Chapter 82 adds the system-level discipline. The 19th Edition is expected to deepen the PEI treatment."
          />

          <Pullquote>The next revision is the 19th Edition. There is no A5.</Pullquote>

          <CommonMistake
            title="Quoting an LCT install without a DNO precheck"
            whatHappens="A workplace EV rollout, a heat pump install requiring single-to-three-phase conversion, or a hybrid PV+BESS install requiring G99 sign-off is quoted on the assumption that the DNO will approve and connect on a normal timeline. The deposit is taken. The DNO precheck happens after the fact and reveals a 12+ month queue, an inadequate local feeder, or a refusal to permit further generation. The customer cancels; the deposit is refunded; the project carries cost and reputation damage."
            doInstead="Make the DNO precheck a standing item on every LCT survey. Get the supply capacity, the local feeder headroom, and the queue position in writing before the quote is finalised. Where the DNO timeline is the binding constraint, present it to the customer up front as a project gating item."
          />

          <CommonMistake
            title="Treating A4 as a wording change rather than a direction-of-travel signal"
            whatHappens="The contractor updates the design templates for A4 — adds the bidirectional protective device call-out, the PEN-fault measure decision — and stops there. The deeper signal is missed. The cert workflow does not adapt to Reg 133.1.3 equipment-usage recording. The PI insurer asks for the cert workflow evidence at renewal; the bundle is not there."
            doInstead="Read A4 as a coherent direction: bidirectional grid acknowledgement, incident-driven tightening, cert-as-audit-trail. Invest in the cert workflow that captures more, not less — photos at first-fix and second-fix, electronic sign-off, structured departure register, equipment-usage record per Reg 133.1.3."
          />

          <CommonMistake
            title="Reading the 70 GW solar headline as a domestic rooftop market multiplier"
            whatHappens="A small contractor invests in domestic PV capacity (vans, ladders, MCS PV registration, installer hires) on the assumption that the 70 GW by 2035 trajectory means a 4–5× domestic rooftop market. Marketing spend ramps; install pipeline does not match. The headline number was right; the domestic-rooftop share of it was much smaller than assumed."
            doInstead="Disaggregate the policy targets before they inform capacity decisions. The British Energy Security Strategy 70 GW number is utility-scale dominant. Match capacity decisions to the funded-market addressable share, not to the political headline."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Workplace EV rollout on a PME-supplied unit in a capacity-bound region"
            situation="A small commercial unit on a PME supply in central Manchester asks for six 22 kW three-phase chargepoints. The existing supply is 100 A three-phase. The DNO connection queue in this area runs at roughly 14 months. The customer wants the install in eight weeks. Another contractor has quoted on the basis of the 'reasonably practicable' PME exception."
            whatToDo="Walk the customer through A4\'s deletion of the exception in 722.411.4.1 — PEN-fault protection is now mandatory. Two practical routes: chargepoints with integral PEN-fault voltage monitoring, or a TT island arrangement with local earth electrode. The competing quote is selling a documented contravention. Six × 22 kW simultaneous on 100 A three-phase is impossible without OCPP-based load management. Even with load management the headroom is thin. Realistic project shape is fewer chargepoints, smaller chargepoints, or supply uprating — which means the 14-month DNO queue. The honest quote puts both constraints in front of the customer in writing, before the deposit."
            whyItMatters="The lost-cost contractor here is not the slowest quoter — it is the one whose quote turns into a refund, a missed timeline, and a litigation risk on the open-PEN exposure. The customer will move on a fast, dishonest quote and come back to the honest contractor when it falls apart — at higher cost, lower trust, and with reputation damage in between."
          />

          <Scenario
            title="Hybrid PV + BESS retrofit on an existing TN-C-S domestic property"
            situation="A homeowner with an existing 4 kWp grid-tied PV array wants to add a 10 kWh battery and the ability to time-shift import on a smart tariff. Existing supply TN-C-S (PME), single-phase, 80 A main fuse. Existing PV inverter is 2018-vintage with no battery interface. CU has two spare ways. Customer expects a one-day install and immediate SEG payment uplift."
            whatToDo="The technical job is straightforward — AC-coupled retrofit BESS, a Section 826 / Chapter 57 design conversation, a Section 551 conversation on the bidirectional protective device (new 551.7.1(c) requirement), an EIC update with the equipment-usage record per Reg 133.1.3. The commercial job needs honest framing: the customer\'s existing SEG arrangement may need re-registering once the BESS is fitted; the existing G98 notification may need amending if the inverter is replaced; the install timeline is one day for the BESS plus several weeks for the supplier-side paperwork. Layer the conversation accordingly: technical fast, commercial slow."
            whyItMatters="A4\'s recordkeeping changes make this retrofit more durable to future periodic inspection than the same retrofit done under A3:2024. The next inspector reading this cert in 2031 sees the BESS design intent, the bidirectional-flow protective device decision, and the equipment-usage record — rather than inferring all three."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>MCS — competence gate or market segmentation?</ContentEyebrow>

          <ConceptBlock
            title="MCS is a market-segmentation mechanism — the exclusion is the feature"
            plainEnglish="MCS is voluntary at statute. SEG, BUS and ECO funding all require it. The wall that keeps non-MCS competitors out of the funded market is the structural advantage of being inside it."
            onSite="The MIS training spend is the cost of admission to the funded market. The price of admission is also the protection against undercut competition. Both sides of that coin matter."
          >
            <p>
              MCS is voluntary under statute — there is no Act of Parliament that requires
              an MCS certificate. The customer can lawfully pay cash for a non-MCS PV or
              heat pump install.
            </p>
            <p>What MCS gates is access to the funded market:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Smart Export Guarantee (SEG)</strong> —
                under the Electricity (Smart Export Guarantee) Regulations 2019. Requires
                an MCS-certified installer cert.
              </li>
              <li>
                <strong className="text-white">Boiler Upgrade Scheme (BUS)</strong> —
                currently £7,500 per ASHP / GSHP. MCS-gated on installer (MIS 3003) and
                product (MCS Product List).
              </li>
              <li>
                <strong className="text-white">ECO4 / GBIS</strong> — retrofit funding for
                eligible households via obligated suppliers. Requires MCS on heat pump and
                PV measures.
              </li>
            </ul>
            <p>
              The structural effect is market segmentation. The funded market — where the
              customer is grant-supported or tariff-supported — is structurally less
              price-competitive than the cash market. The MCS installer is insulated from
              undercut competition from non-MCS entrants in the funded segment.
            </p>
            <p>
              That framing changes the cost-benefit on MIS training. The training overhead
              is not "competence we need to do the work safely" — it is "the price of
              admission to the segment where margin holds".
            </p>
          </ConceptBlock>

          <Pullquote>MCS is a market-segmentation mechanism. The exclusion is the feature.</Pullquote>

          <RegsCallout
            source="GN3 (BS 7671 Guidance Note 3) · cross-reference to the IET Codes of Practice"
            clause="GN3 identifies solar photovoltaic (PV) power supply systems as installations that require additional guidance, experience or training for inspection, testing and certification. Practitioners should consult the IET Codes of Practice — for Grid-Connected Solar Photovoltaic Installations (PV), Electrical Energy Storage Systems (BESS), and Electric Vehicle Charging Equipment Installation (EV)."
            meaning="GN3 names which IET Code applies to which technology. For the LCT installer the three Codes are non-optional reference material — not statutory, but the accepted reference for competent practice. PI insurers, MCS auditors, courts and EICR inspectors all treat consultation of the relevant Code as evidence of competent practice."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The upstream constraint nobody quotes for</ContentEyebrow>

          <ConceptBlock
            title="DNO capacity and CU readiness — the silent gating constraint"
            plainEnglish="LCT installs don\'t happen in isolation. They happen on existing supplies, behind existing consumer units, in regions with varying levels of distribution-network capacity."
            onSite="Every LCT survey now needs three new line items: DNO precheck (capacity, queue, timeline in writing), CU readiness (spare ways, RCBO availability, type compatibility), and load projection (post-install diversified load against the existing main fuse)."
          >
            <p>
              The narrative that the heat pump rollout is constrained by installer numbers
              is correct but incomplete. The rollout is also constrained by the upstream
              electrical infrastructure that the heat pump connects to.
            </p>
            <p>A typical heat pump install on an older property frequently requires:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>CU upgrade — insufficient spare ways, RCBO compatibility</li>
              <li>Supply uprating — from 60 A or 80 A to 100 A</li>
              <li>Single-phase to three-phase conversion (some properties)</li>
            </ul>
            <p>Each of those is a DNO conversation.</p>
            <p>
              The DNO queue in capacity-bound regions of GB now exceeds 12 months for
              substantial connection or upgrade work — central London, parts of Greater
              Manchester, parts of the South East. These are routine constraints on LCT
              projects in 2026 onwards, not edge cases.
            </p>
            <p>
              The strategic implication: the LCT contractor who treats the DNO precheck as
              a standing survey item quotes more honestly, wins more durable contracts, and
              avoids the most expensive failure mode in LCT contracting — the deposit
              refund after a DNO timeline emerges late in the project.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The 19th Edition — what A4 is foreshadowing</ContentEyebrow>

          <ConceptBlock
            title="A4 closes the 18th Edition cycle — the 19th Edition is next"
            plainEnglish="There is no 'A5'. A4:2026 is the fourth and final amendment to the 18th Edition. The next major step is the 19th Edition, currently in committee."
            onSite="The recordkeeping changes A4 introduced are the leading edge of the 19th Edition\'s documentation philosophy. Treat them as the trajectory, not the destination."
          >
            <p>
              The 18th Edition of BS 7671 was published in 2018. It received four
              amendments:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>A1 (2020) — minor consequential changes</li>
              <li>A2 (2022) — significant LCT and AFDD updates</li>
              <li>A3 (2024) — Section 730 inland navigation, model form changes</li>
              <li>
                A4 (2026) — Chapter 57 stationary batteries, Appendix 17 energy efficiency,
                the LCT tightening
              </li>
            </ul>
            <p>
              A4 closes the amendment cycle. The next major revision is a new edition. By
              convention it will be the 19th Edition.
            </p>
            <p>
              The 19th Edition is currently in the IET / BSI joint committee. Public
              consultation is expected during 2027–2028, with publication targeted for
              2028–2029 and implementation transition through 2029–2030. The 18th Edition
              with A4 amendments remains in force across the transition.
            </p>
            <p>The expected direction of the 19th Edition is consolidation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                The LCT chapters (Section 551, 712, 715, 722, 730, 753, Chapter 57,
                Appendix 17) pulled into a clearer Part 7 LCT framework
              </li>
              <li>Appendix 17 promoted into a new Part 8 on energy efficiency</li>
              <li>Deeper integration with the international BS EN 60364 series</li>
              <li>The A4 recordkeeping trajectory extended</li>
            </ul>
            <p>
              For the installer working today, the practical advice is to learn the current
              chapter map well — the consolidation preserves technical content rather than
              invents new requirements. The cert workflow built for A4 is the same workflow
              the 19th Edition will expect.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'Net zero by 2050 is statutory under the Climate Change Act 2008 (as amended in 2019). The LCT installer is the delivery mechanism.',
              'The LCT installer market is supply-constrained — pricing power available to MCS-certified entrants. The training spend is investment, not overhead.',
              'A4:2026 closes the 18th Edition amendment cycle. The next revision is the 19th Edition (not "A5"), expected 2028–2030.',
              'A4\'s LCT-relevant changes form a coherent direction: Reg 551.7.1(c) codifies the bidirectional grid model; Reg 722.411.4.1 PME deletion is incident-driven; Reg 133.1.3 and Appendix 17 build the cert-as-audit-trail trajectory; and new Chapter 82 (PEIs) makes the system-level design of hybrid installs a regulatory requirement.',
              'The new Chapter 82 — Prosumer\'s Electrical Installations — treats the hybrid LCT install as a coherent system, sitting alongside the per-technology chapters (712, 722, Chapter 57) and the generic generator chapter (551).',
              'Disaggregate headline policy targets before they inform business decisions. The 70 GW solar target is utility-scale dominant.',
              'MCS is a market-segmentation mechanism. The exclusion of non-MCS competitors from the funded market is the structural commercial feature.',
              'The DNO precheck is a standing item on every LCT survey. Connection queues in capacity-bound regions exceed 12 months.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 LCT chapter map in BS 7671
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
