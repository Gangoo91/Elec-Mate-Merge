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
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s4-mcs-statutory',
    question:
      'Is MCS (Microgeneration Certification Scheme) registration legally required to install a domestic solar PV system in the UK?',
    options: [
      'Yes — MCS is statutory under the Energy Act 2023',
      'No — MCS is voluntary at statute, but commercially mandatory for SEG, BUS and ECO4 funding. The customer cannot claim the funding without an MCS-certified installer on the cert',
      'Only for installs above 11.04 kW',
      'Only in England — Scotland uses a different statutory scheme',
    ],
    correctIndex: 1,
    explanation:
      'MCS is voluntary at statute. The customer can lawfully pay cash for a non-MCS PV install (subject to BS 7671, Part P notification, DNO connection). What MCS gates is access to the funded market: SEG export payments (under the Electricity (Smart Export Guarantee) Regulations 2019), BUS grants, and most ECO4 / GBIS retrofit measures.',
  },
  {
    id: 'm1s4-mis-mapping',
    question:
      'Which MCS Installation Standard (MIS) corresponds to heat pump installations?',
    options: ['MIS 3002', 'MIS 3003', 'MIS 3005', 'MIS 3008'],
    correctIndex: 1,
    explanation:
      'MIS 3003 is the technology-specific standard for heat pumps (ASHP and GSHP). MIS 3002 covers solar PV; MIS 3005 covers solar thermal; MIS 3008 covers heat batteries.',
  },
  {
    id: 'm1s4-cps-vs-mcs',
    question:
      'NICEIC, NAPIT, ELECSA and Stroma are Competent Person Schemes (CPS). How do CPS schemes relate to MCS?',
    options: [
      'They are the same thing',
      'They are separate. CPS schemes are the Part P self-certification route for general electrical work. MCS is the LCT installer scheme for SEG / BUS / ECO funding. An installer can be CPS-registered without MCS, MCS-registered without CPS, or both',
      'CPS schemes have replaced MCS',
      'MCS membership requires NICEIC membership first',
    ],
    correctIndex: 1,
    explanation:
      'CPS schemes operate the Part P notifiable-work self-certification route in England and Wales. MCS is a separate scheme governing LCT installer competence for the funded market. A typical LCT business carries both: CPS for the Part P notification, MCS for the funding gate.',
  },
  {
    id: 'm1s4-mcs-exclusion-feature',
    question:
      'Which framing of MCS is most useful to the LCT installer business?',
    options: [
      'MCS is bureaucratic compliance overhead that reduces margin',
      'MCS is a market-segmentation mechanism — the exclusion of non-MCS competitors from the funded market (SEG, BUS, ECO) is the structural commercial feature',
      'MCS is interchangeable with TrustMark',
      'MCS is being phased out',
    ],
    correctIndex: 1,
    explanation:
      'The exclusionary effect of MCS gating on the funded market is the structural advantage. A homeowner pursuing SEG export payments, a BUS heat pump grant, or ECO4 retrofit funding cannot use a non-MCS installer. Reading MCS as compliance burden is a failure to read the commercial topology.',
  },
  {
    id: 'm1s4-product-vs-installation',
    question:
      'MCS certifies both installers and products. What does the product-side certification cover?',
    options: [
      'Only solar panels',
      'The product certification (MPS — MCS Product Standards) covers the equipment used in MCS installs — modules, heat pump units, heat batteries. Funding-eligible installs require both MCS-certified installer AND MCS-listed product',
      'Only inverters',
      'The product certification is informational only',
    ],
    correctIndex: 1,
    explanation:
      'MCS operates two parallel certification streams — installer (MIS) and product (MPS). For a funded install, both halves are required. Specifying a non-MCS-listed product, even from a reputable manufacturer, can void funding eligibility.',
  },
  {
    id: 'm1s4-mcs-audit',
    question:
      'What does an MCS audit actually check on a sampled installer job?',
    options: [
      'Only the cert',
      'A combination of design pack quality, install quality on site, commissioning evidence, customer documentation, and conformity to the relevant MIS — sampled across recent jobs',
      'Only the installer\'s training certificates',
      'The customer\'s satisfaction survey only',
    ],
    correctIndex: 1,
    explanation:
      'An MCS audit is a sampled review of recent jobs against the MIS for the relevant technology. The auditor examines the design pack, the install quality, the commissioning evidence, the customer handover documentation, and conformity to the relevant MIS.',
  },
  {
    id: 'm1s4-iet-cop-vs-mis',
    question:
      'The IET Code of Practice for Grid-Connected Solar PV Installations and MIS 3002 (PV) both apply to a domestic PV install. How do they relate?',
    options: [
      'They are interchangeable',
      'They sit alongside each other. The IET CoP is the BS 7671-aligned technical operational reference. MIS 3002 is the MCS installer competence standard. Both are needed for a funded install',
      'MIS 3002 has replaced the IET CoP',
      'The IET CoP is for inspectors only; MIS 3002 is for installers only',
    ],
    correctIndex: 1,
    explanation:
      'The IET CoP is the technical operational complement to BS 7671 Section 712 — design detail, installation practice, commissioning evidence. MIS 3002 is the MCS Installation Standard for the installer\'s scheme conformity. Both apply on a funded install.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A customer wants to claim the Boiler Upgrade Scheme grant on their ASHP install. What is the most accurate combination of competence the install must demonstrate?',
    options: [
      'An MCS-certified installer holding MIS 3003, with the heat pump unit on the MCS Product List, and the install evidenced against the MIS 3003 design and commissioning steps',
      'Any qualified electrician — BUS does not require MCS',
      'NICEIC membership only',
      'A Building Control notification only',
    ],
    correctAnswer: 0,
    explanation:
      'BUS funding is MCS-gated on both halves of the scheme — installer (MIS 3003) and product (MCS Product List). Missing any of the three (installer cert, product listing, MIS evidence) voids BUS eligibility.',
  },
  {
    id: 2,
    question:
      'An installer holds CPS registration with NICEIC. They are not currently MCS-registered. A customer asks them to install a 4 kWp PV array and apply for SEG payments. What is the lawful position?',
    options: [
      'The installer cannot lawfully install',
      'The installer can lawfully install the PV system — but the customer cannot claim SEG payments because the supplier requires an MCS-certified installer cert',
      'The installer must transfer the job to an MCS installer',
      'NICEIC membership is automatically converted to MCS registration',
    ],
    correctAnswer: 1,
    explanation:
      'CPS membership covers the Part P notification route. The PV install is lawful. What is missing for SEG eligibility is the MCS certification. Licensed electricity suppliers require an MCS installer on the cert as evidence of competent practice.',
  },
  {
    id: 3,
    question:
      'An MCS auditor visits a sampled job on a 6 kWp PV install. The cert is correctly completed, the install is BS 7671 compliant, the customer is satisfied. The auditor flags a major finding. Most likely cause:',
    options: [
      'The cert was signed in blue ink',
      'The MIS 3002 design pack is missing a required element (shading analysis methodology, sizing calculation back-up, customer documentation pack) — the BS 7671 work was correct but the MCS scheme-conformity evidence was incomplete',
      'The install was completed in fewer than three days',
      'The inverter is the wrong colour',
    ],
    correctAnswer: 1,
    explanation:
      'MCS audits look at the MIS conformity evidence bundle, not just the BS 7671 cert. Common major findings: missing shading analysis on PV, missing heat-loss calculations on heat pumps, missing customer documentation pack, product not on the MCS Product List.',
  },
  {
    id: 4,
    question:
      'A heat pump installer holds MIS 3003 and is about to take on heat battery work. What scheme certification do they need to add?',
    options: ['MIS 3002', 'MIS 3008 (added to the MCS scheme in 2023 to cover heat batteries)', 'MIS 3005', 'Heat batteries are not covered by MCS'],
    correctAnswer: 1,
    explanation:
      'MIS 3008 was added to the MCS scheme in 2023 to cover heat batteries — high-energy-density thermal storage units used to time-shift hot-water or space-heating load.',
  },
  {
    id: 5,
    question:
      'On a domestic install where the homeowner is paying cash with no funding stream, is MCS registration required?',
    options: [
      'Yes — MCS is mandatory for all LCT work',
      'No — MCS is voluntary at statute. The cash install is lawful subject to BS 7671, Part P notification, DNO notification. MCS is only commercially necessary where the customer is claiming funding',
      'Only for installs above 10 kW',
      'Only for installs in England',
    ],
    correctAnswer: 1,
    explanation:
      'The statutory floor is BS 7671, Part P, and DNO notification. MCS sits above that as the commercial layer that unlocks funding. For a cash-paid install with no SEG / BUS / ECO claim, MCS is not commercially necessary.',
  },
  {
    id: 6,
    question:
      'The MCS Service Company operates the scheme. Who actually administers the consumer-protection side of MCS work?',
    options: [
      'MCS Service Company itself',
      'TrustMark — the government-endorsed quality scheme that administers the MCS Consumer Code, providing dispute resolution and consumer-protection mechanisms',
      'The IET',
      'Trading Standards',
    ],
    correctAnswer: 1,
    explanation:
      'MCS sets the scheme rules and certifies installers and products. TrustMark administers the consumer-protection layer (the MCS Consumer Code), including dispute resolution between the customer and the installer.',
  },
  {
    id: 7,
    question:
      'The IET Code of Practice for Grid-Connected Solar PV Installations is currently in its 5th edition. MIS 3002 is also revised periodically. How do their revision cycles relate?',
    options: [
      'They revise together',
      'Independently — the IET CoP revises on the IET technology committee\'s cycle; MIS 3002 revises on the MCS Service Company\'s scheme governance cycle. Both should be tracked separately',
      'They never revise',
      'They revise on Building Regulations cycles',
    ],
    correctAnswer: 1,
    explanation:
      'The IET CoP and the MIS revise on independent cycles. The IET CoP for Grid-Connected Solar PV Installations is currently in its 5th edition. MIS 3002 is revised by the MCS Service Company on its scheme governance cycle.',
  },
  {
    id: 8,
    question:
      'A small electrical contractor is deciding whether to invest in MIS 3003 (heat pump) training. The training cost is £2,500 plus 5–10 days off the tools. What is the most useful framing of the decision?',
    options: [
      'It\'s compliance overhead — minimise spend',
      'It\'s an investment in admission to the funded heat-pump market, where the supply / demand gap translates into structural pricing power for qualified MCS-registered installers',
      'It\'s irrelevant unless the contractor is already in heat pumps',
      'The cost-benefit is negative until 2030',
    ],
    correctAnswer: 1,
    explanation:
      'The supply-constrained nature of the heat-pump market makes MIS 3003 a market-access investment, not a compliance overhead. The training cost is a small fraction of the margin available on funded jobs.',
  },
];

const faqs = [
  {
    question:
      'I am a qualified electrician with strong 18th Edition competence. Do I need additional training to install MCS-funded PV / heat pump / battery work?',
    answer:
      'Strictly under BS 7671, no — the LCT chapters are part of the standard your 18th Edition covers. Commercially, yes — MCS registration requires the relevant MIS training. The training is typically 5–10 days plus practical assessment, costed at £1.5k–£3k. The qualification gets you legal; the MIS training gets you commercially viable in the funded market.',
  },
  {
    question:
      'How does MCS relate to TrustMark and the Consumer Code?',
    answer:
      'MCS certifies installer technical competence and product conformity. TrustMark — the UK government-endorsed quality scheme — administers the MCS Consumer Code on behalf of customers. TrustMark provides written contract framework, deposit protection, ADR, and workmanship guarantee. MCS-registered installers operating in the funded retrofit market are typically also TrustMark-registered.',
  },
  {
    question:
      'What\'s the difference between MIS standards and MPS standards in the MCS scheme?',
    answer:
      'MIS = MCS Installation Standard — installer-facing per technology (MIS 3002 PV, MIS 3003 heat pumps, etc.). Defines design, install, commissioning, handover steps the auditor checks. MPS = MCS Product Standard — product-facing per technology (MPS 010 PV modules, MPS 014 heat pump units, etc.). Defines testing and performance criteria a product must meet to appear on the MCS Product List.',
  },
  {
    question:
      'Can I be MCS-registered through multiple MIS standards at once?',
    answer:
      'Yes — and most established LCT contractors are. A typical mature LCT business carries MIS 3002 (PV) + MIS 3003 (heat pumps) + MIS 3008 (heat batteries) to cover the hybrid PV+heat-pump+thermal-store install pattern. The marginal cost of adding standards once the scheme infrastructure is in place is lower than the cost of the first MIS.',
  },
  {
    question:
      'What\'s the relationship between MCS and the IET Codes of Practice — do they overlap or compete?',
    answer:
      'They sit alongside each other, addressing different layers. The IET CoP is the BS 7671-aligned technical operational reference. The MIS is the MCS scheme conformity standard. The IET CoP answers "what does competent BS 7671-side technical practice look like?" The MIS answers "what does competent MCS-scheme conformity look like?" Both apply on a funded install.',
  },
  {
    question:
      'What does an MCS audit actually find on a typical installer?',
    answer:
      'Common major findings: missing or incomplete design-pack elements (shading analysis for PV, heat-loss calculation for heat pumps, sizing rationale for BESS), customer handover documentation not matching the MCS format, products specified that are not on the MCS Product List, design or commissioning signatures missing. Common minor findings: traceability gaps in the cert evidence bundle, outdated reference editions on the installer\'s shelf, calibration certificates not produced on request.',
  },
  {
    question:
      'How does the LCT installer scheme look in Scotland, Wales and Northern Ireland?',
    answer:
      'MCS is UK-wide — the same scheme operates across England, Scotland, Wales and Northern Ireland. The funding mechanisms differ. In England and Wales, BUS for heat pumps and SEG for PV export. In Scotland, Home Energy Scotland operates a parallel grant scheme alongside SEG. Northern Ireland has its own Energy Strategy and a separate set of grants.',
  },
  {
    question:
      'Does my CPS membership (NICEIC / NAPIT / ELECSA / Stroma) help with MCS audit findings?',
    answer:
      'Indirectly. CPS membership is evidence of general electrical competence and Part P compliance. But MCS audits look at MIS-specific evidence (LCT design pack, MCS-format customer handover, MCS Product List conformity) that CPS membership does not cover.',
  },
  {
    question:
      'What direction is MCS itself moving in?',
    answer:
      'MCS scheme governance moves on its own cycle. Recent direction: adding new MIS standards (MIS 3008 heat batteries 2023), tightening audit evidence requirements, deeper integration with TrustMark on consumer protection, closer alignment with the IET Codes of Practice. The 19th Edition publication will trigger MIS updates to match the consolidated BS 7671 chapter references.',
  },
];

export default function RenewableEnergyModule1Section4() {
  const navigate = useNavigate();

  useSEO({
    title:
      'MCS, MIS standards & the competent-person umbrella | Renewable Energy 1.4 | Elec-Mate',
    description:
      'How the MCS scheme, the MIS technology-specific installer standards, the IET Codes of Practice and the Competent Person Schemes interlock — and the commercial reality of being an MCS-registered LCT installer.',
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
            eyebrow="Module 1 · Section 4 · BS 7671:2018+A4:2026"
            title="MCS, MIS standards & the competent-person umbrella"
            description="How the MCS scheme, the MIS technology-specific installer standards, the IET Codes of Practice and the Competent Person Schemes (NICEIC, NAPIT, ELECSA, Stroma) interlock — and the commercial reality of being an MCS-registered LCT installer."
            tone="yellow"
          />

          <TLDR
            points={[
              'MCS is voluntary at statute but commercially mandatory for SEG, BUS and ECO4 funding. The funded LCT market is MCS-gated.',
              'The MIS standards are the technology-specific installer competence standards within MCS — 3002 (PV), 3003 (heat pumps), 3004 (biomass), 3005 (solar thermal), 3006 (micro wind), 3007 (micro hydro), 3008 (heat batteries).',
              'MCS Product Standards (MPS) cover the product side — funded installs require both an MCS-certified installer AND an MCS-listed product. The product gate is as non-negotiable as the installer gate.',
              'The Competent Person Schemes (NICEIC, NAPIT, ELECSA, Stroma) are separate from MCS — they operate the Part P notifiable-work self-certification route. Most LCT businesses carry both.',
              'MCS audits sample design pack quality, install quality, commissioning evidence, customer documentation, and conformity to the MIS. The BS 7671-side cert being correct is necessary but not sufficient.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish MCS from the Competent Person Schemes — and explain why most LCT businesses carry both.',
              'Map each LCT technology to its corresponding MIS standard and identify the product-side certification (MPS) required.',
              'Read MCS as a market-segmentation mechanism rather than a compliance overhead.',
              'Identify the funding gates that MCS membership unlocks: SEG, BUS, ECO4.',
              'Anticipate the contents of an MCS audit on a sampled job.',
              'Position MCS, the MIS standards, the MCS Product Standards, the IET Codes of Practice and the Competent Person Schemes as a coherent stack.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>MCS is voluntary at statute, mandatory at funding.</Pullquote>

          <ContentEyebrow>The MCS architecture — what it is and what it isn\'t</ContentEyebrow>

          <ConceptBlock
            title="MCS — voluntary at statute, mandatory at funding"
            plainEnglish="MCS is the LCT installer scheme. It is voluntary under the law. But the funding the customer is chasing — SEG, BUS, ECO4 — requires it."
            onSite="On every LCT job, the first commercial question: is the customer paying cash, or pursuing funding? Cash customers are accessible to any competent installer. Funding customers are accessible only to MCS-registered installers with the right MIS."
          >
            <p>
              MCS was established in 2007 as the industry response to the Feed-in Tariff
              scheme. Operated by the MCS Service Company since 2018.
            </p>
            <p>
              MCS is non-statutory. Lawful LCT installation in the UK requires BS 7671
              compliance, Part P notification, and DNO notification — but not MCS.
            </p>
            <p>What MCS becomes is the gate to the funded market:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SEG (2020)</strong> — under the Electricity
                (Smart Export Guarantee) Regulations 2019, requires MCS certificate as the
                supplier\'s evidence for the export payment
              </li>
              <li>
                <strong className="text-white">BUS</strong> — £7,500 per ASHP / GSHP grant,
                MCS-gated on both installer (MIS 3003) and product (MCS Product List)
              </li>
              <li>
                <strong className="text-white">ECO4 / GBIS</strong> — retrofit measures
                involving heat pumps or PV require MCS at both layers
              </li>
            </ul>
            <p>
              The strategic implication is that MCS is best understood as a market-
              segmentation mechanism. The funded market is structurally less price-
              competitive than the cash market. The MIS training spend and audit overhead
              are the price of admission to the less competitive segment.
            </p>
          </ConceptBlock>

          <Pullquote>The exclusion is the feature, not the bug.</Pullquote>

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The MIS standards — installer competence per technology</ContentEyebrow>

          <ConceptBlock
            title="MIS 3002–3008 — the technology-specific installer scheme standards"
            plainEnglish="MCS is one scheme with technology-specific competence standards inside it. Each MIS is a separate registration with its own training, audit and renewal."
            onSite="A typical mature LCT business carries multiple MIS certifications — MIS 3002 + MIS 3003 + MIS 3008 covers the hybrid PV+heat-pump+thermal-store install pattern."
          >
            <p>The current MIS set:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">MIS 3002</strong> — Solar Photovoltaic</li>
              <li><strong className="text-white">MIS 3003</strong> — Heat Pumps (ASHP, GSHP, WSHP)</li>
              <li><strong className="text-white">MIS 3004</strong> — Solid Biomass Heating</li>
              <li><strong className="text-white">MIS 3005</strong> — Solar Thermal</li>
              <li><strong className="text-white">MIS 3006</strong> — Small Wind Turbines</li>
              <li><strong className="text-white">MIS 3007</strong> — Micro-Hydro</li>
              <li><strong className="text-white">MIS 3008</strong> — Heat Batteries (added 2023)</li>
            </ul>
            <p>
              Each MIS contains the design, install, commissioning and handover steps the
              auditor will check on a sampled job.
            </p>
            <p>
              Each MIS is a separate certification, requiring technology-specific training,
              practical assessment, and ongoing audit. Training is typically 5–10 days
              plus practical assessment, costed at £1.5k–£3k per MIS.
            </p>
            <p>
              The first MIS is the most expensive — it requires building the scheme
              infrastructure (audit trail, customer documentation templates, design-pack
              format, MCS Service Company registration). Subsequent MIS additions are
              marginally cheaper.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="MCS scheme architecture — installer side (MIS 3002–3008, one per LCT technology) and product side (MCS Product Standards / MCS Product List), feeding into the funded-market gates (SEG, BUS, ECO4). TrustMark administers the Consumer Code layer."
            filename="renewable/m1s4-mcs-architecture.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The product side — MCS Product Standards</ContentEyebrow>

          <ConceptBlock
            title="MPS standards and the MCS Product List — the product-side gate"
            plainEnglish="MCS certifies both installers and products. Funded installs require both halves. The product must be on the MCS Product List."
            onSite="Check the MCS Product List on the MCS Service Company website at quotation stage, not commissioning stage. Specifying a non-listed product at quote becomes an awkward re-spec or a customer dispute later."
          >
            <p>The MPS standards by technology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">MPS 010</strong> — PV modules</li>
              <li><strong className="text-white">MPS 011</strong> — Wind turbines</li>
              <li><strong className="text-white">MPS 012</strong> — Hydro</li>
              <li><strong className="text-white">MPS 013</strong> — Solar thermal collectors</li>
              <li><strong className="text-white">MPS 014</strong> — Heat pump units</li>
              <li><strong className="text-white">MPS 015</strong> — Biomass appliances</li>
              <li><strong className="text-white">MPS 016</strong> — Heat batteries</li>
            </ul>
            <p>
              For a funded install, both halves of MCS certification are required: the
              installer holds the relevant MIS, AND the product specified is on the MCS
              Product List.
            </p>
            <p>
              Specifying a non-listed product — even from a reputable manufacturer, even
              where technically equivalent — voids funding eligibility. The customer
              cannot claim BUS, SEG, or ECO with a non-listed product on the cert.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>MCS vs the Competent Person Schemes</ContentEyebrow>

          <Pullquote>CPS for Part P. MCS for the funding gate. Different schemes, parallel memberships.</Pullquote>

          <ConceptBlock
            title="Two separate schemes — different purposes, parallel memberships"
            plainEnglish="NICEIC, NAPIT, ELECSA, Stroma are Competent Person Schemes for general electrical work — the Part P notification route in dwellings. MCS is the LCT installer scheme for funded-market eligibility."
            onSite="On a domestic LCT install: the CPS membership handles Part P notification; the MCS membership handles the funding gate. Both notifications occur on the same job. Not interchangeable."
          >
            <p>The two scheme types address different competence layers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CPS</strong> — general electrical safety in
                dwellings, Part P self-certification route as alternative to Building
                Control notification on every notifiable job
              </li>
              <li>
                <strong className="text-white">MCS</strong> — LCT technology-specific
                competence in the funded market (SEG, BUS, ECO4 eligibility)
              </li>
            </ul>
            <p>An installer can be:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>CPS-registered without MCS — general domestic electrical work</li>
              <li>MCS-registered without CPS — LCT where Part P notification is via Building Control</li>
              <li>Both — the typical mature LCT business operating in dwellings</li>
            </ul>
            <p>
              On a domestic LCT install in England or Wales, both scheme memberships are
              operationally in play: the CPS membership for the Part P notification, the
              MCS membership for the funding-gate evidence. Both notifications occur on the
              same install.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The MCS audit — what is actually checked</ContentEyebrow>

          <ConceptBlock
            title="The MCS audit on a sampled job — what the auditor looks for"
            plainEnglish="MCS audits are sampled reviews of recent jobs against the relevant MIS. The auditor looks at design pack, install quality, commissioning evidence, customer handover, and conformity to the MIS section by section."
            onSite="Build the MIS evidence bundle as you go, not after the audit notice. The integrated approach takes no more total time than the after-the-fact approach but produces higher-quality evidence."
          >
            <p>An MCS audit visit examines:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Design pack</strong> — heat-loss
                calculations and hydraulic schematics on heat pumps; shading analysis and
                string sizing on PV; depth-of-discharge calculations and chemistry-aware
                siting on BESS
              </li>
              <li>
                <strong className="text-white">On-site install</strong> — workmanship,
                labelling, isolation arrangements, signage
              </li>
              <li>
                <strong className="text-white">Commissioning evidence</strong> — aligned
                with manufacturer protocols and the relevant BS EN standard (BS EN 62446
                for PV)
              </li>
              <li>
                <strong className="text-white">Customer handover documentation</strong> —
                MCS-specified format with warranty info, user manual, maintenance schedule
              </li>
            </ul>
            <p>Most common major findings:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Missing or incomplete design pack elements</li>
              <li>Customer handover documentation not matching the MCS format</li>
              <li>Products specified that are not on the MCS Product List (substituted on availability grounds)</li>
              <li>Design or commissioning signatures missing from required roles</li>
            </ul>
            <p>
              Findings are issued formally. Minor findings typically have a rectification
              period (30–60 days); major findings may result in suspended registration
              pending rectification. Repeated or serious findings can result in expulsion.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · the &lsquo;competent person&rsquo; framework"
            clause="BS 7671 references &lsquo;competent persons&rsquo; throughout — for the requirements for visual inspections (frequency, persons competent to carry them out, actions required on finding defects), for verification work, and for the recording of design choices on Part 6 certification. The standard does not itself certify competence."
            meaning="Competence is evidenced through scheme membership, qualifications and audit traceability. The cert evidence bundle on an LCT install carries multiple sources of competence evidence: BS 7671 compliance, CPS notification, MCS / MIS registration, IET CoP consultation."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The MCS evidence stack — IET CoPs alongside MIS</ContentEyebrow>

          <ConceptBlock
            title="MIS, IET Codes of Practice, MCS Product List — how the evidence stack interlocks"
            plainEnglish="On a funded LCT install, three documents form the operational evidence bundle alongside BS 7671 and OSG / GN3."
            onSite="On the workbench for an MCS-funded PV install: BS 7671 + OSG + GN3 + IET CoP for Grid-Connected Solar PV + MIS 3002 + MCS Product List entries + manufacturer instructions."
          >
            <p>The three layers of MCS evidence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">IET Code of Practice</strong> — the BS 7671-
                aligned technical operational reference, cross-referenced from GN3
              </li>
              <li>
                <strong className="text-white">MIS for the technology</strong> — the MCS
                scheme conformity standard (design pack format, customer handover,
                scheme-specific procedural steps)
              </li>
              <li>
                <strong className="text-white">MCS Product List entry</strong> — the
                product-side evidence layer for the equipment installed
              </li>
            </ul>
            <p>
              PI insurers, MCS auditors and EICR inspectors all expect to see the full
              evidence stack. PI underwriters increasingly differentiate cover terms based
              on the installer\'s evidence-bundle quality.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A hybrid PV + heat pump + heat battery install on an MCS-funded retrofit"
            situation="A homeowner pursuing BUS for the heat pump, SEG for the PV export, and ECO4 for the heat battery retrofit asks for the full bundle on a 1990s detached property. The supply is TN-C-S, single-phase 80 A."
            whatToDo="Map the MCS / MIS / MPS bundle. Installer side: MIS 3002 (PV), MIS 3003 (heat pump), MIS 3008 (heat battery) — all three certifications must be current. Product side: PV modules and inverter on MCS Product List, heat pump unit on MCS Product List, heat battery on MCS Product List — all four product listings checked at quotation stage. Technical side: IET CoPs for PV, EESS and EV (where applicable). Regulatory side: BS 7671:2018+A4:2026 (LCT chapter map per Section 1.2), GN3 for inspection-and-test methodology, OSG for PV warning notices. Notification side: G98 or G99 DNO notification, Part P via the CPS membership, BUS application, SEG registration, ECO4 application."
            whyItMatters="The funded-market discipline is to map the full bundle before the install starts, not after. A missing MCS Product List entry, a lapsed MIS certification, or a missing CPS notification reference is enough to delay or void the funding."
          />

          <CommonMistake
            title="Specifying a non-MCS-listed product to save cost or solve an availability gap"
            whatHappens="The installer substitutes a non-listed inverter of equivalent technical specification on availability grounds. The install completes, the cert issues, the customer applies for SEG — and the supplier rejects the application because the inverter is not on the MCS Product List."
            doInstead="Run the MCS Product List check at quotation stage for every MCS-relevant product. The MCS Product List is searchable on the MCS Service Company website. Specifying a non-listed product is acceptable only on cash installs with no funding stream."
          />

          <CommonMistake
            title="Treating MCS audit preparation as a separate exercise from the cert workflow"
            whatHappens="An installer builds cert evidence bundles in the BS 7671 style and treats the MIS evidence as audit-preparation overhead. Six months\' worth of jobs accumulate without the MIS evidence layer being built. The audit notice arrives; the installer spends two weeks retrofitting MIS evidence; gaps are unavoidable; major findings issued."
            doInstead="Build the MIS evidence as part of the install workflow. Design pack created at design stage, customer handover documentation created at handover, MCS Product List checks recorded at quotation stage. The integrated approach takes no more total time but produces higher-quality evidence and survives audit cleanly."
          />

          <CommonMistake
            title="Letting an MIS certification lapse and continuing to take MCS-funded work"
            whatHappens="An installer\'s MIS 3002 registration lapses because the renewal paperwork was not processed in time. The installer continues to accept new MCS-funded PV jobs. A customer\'s SEG application is rejected because the installer cert reference does not match a currently-registered MCS installer."
            doInstead="Treat MIS renewals as a non-negotiable diary entry — 60 days before the renewal anniversary, the renewal workflow starts. Most lapses are administrative rather than substantive. The cost of preventing a lapse is small; the cost of operating during a lapse is the funding-dispute risk on every job."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The funding gates — what MCS membership unlocks</ContentEyebrow>

          <ConceptBlock
            title="SEG, BUS, ECO4 — the three funding streams the MCS gate opens"
            plainEnglish="MCS doesn\'t give you customers. It gives you access to the segment of the market that has funding behind it."
            onSite="In the customer conversation: &lsquo;Are you pursuing BUS / SEG / ECO?&rsquo; If yes, MCS is mandatory; if no, MCS is irrelevant."
          >
            <p>The three funding streams:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Smart Export Guarantee (SEG, 2020)</strong>
                {' '}— statutory successor to FIT. Licensed electricity suppliers with
                {' '}&gt; 150,000 domestic customers must offer at least one export tariff
                to small-scale generators (≤ 5 MW). MCS certificate is the supplier\'s
                evidence for the export payment.
              </li>
              <li>
                <strong className="text-white">Boiler Upgrade Scheme (BUS)</strong> — up-
                front grants for low-carbon heating, currently £7,500 per ASHP or GSHP.
                MCS-gated on both halves (MIS 3003 installer, MCS Product List unit).
              </li>
              <li>
                <strong className="text-white">ECO4 / GBIS (2022–2026)</strong> — retrofit
                funding for eligible households via obligated suppliers. Heat pump or PV
                measures require MCS at both installer and product layers.
              </li>
            </ul>
            <p>
              Scotland operates Home Energy Scotland grants and loans as the parallel route
              to BUS.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'MCS is voluntary at statute but commercially mandatory for SEG, BUS and ECO4 funding.',
              'The MIS standards are the technology-specific installer competence standards (3002 PV, 3003 heat pumps, 3004 biomass, 3005 solar thermal, 3006 micro wind, 3007 micro hydro, 3008 heat batteries).',
              'MCS Product Standards (MPS) cover the product side — funded installs require both an MCS-certified installer AND an MCS-listed product.',
              'The Competent Person Schemes are separate from MCS — they operate Part P self-certification in England and Wales.',
              'MCS audits sample design pack quality, install quality, commissioning evidence, customer handover documentation, and conformity to the relevant MIS.',
              'TrustMark administers the MCS Consumer Code — the consumer-protection layer of the scheme.',
              'On a funded LCT install the evidence stack is: BS 7671 + OSG + GN3 + IET CoP + MIS + MCS Product List + Part P notification + DNO G98/G99 reference.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                OSG &amp; GN3 for LCT
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 G98, G99 &amp; EREC G100
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
