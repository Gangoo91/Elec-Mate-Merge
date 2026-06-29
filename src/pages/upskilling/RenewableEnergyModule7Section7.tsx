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
} from '@/components/study-centre/learning';
import { Pcar2023Requirements } from '@/components/study-centre/diagrams/renewableGapKit';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s7-pcar-scope',
    question: 'PCAR 2023 — what does it cover?',
    options: [
      'Public charge points, via six pillars: payment, reliability, pricing transparency, roaming, a 24/7 helpline and open data',
      'Domestic home chargepoints at private residences, covering payment, reliability and accessibility duties',
      'Workplace chargepoints for employees and visitors, mandating contactless payment and open-data publication',
      'A BSI publicly available specification on accessibility that supplements, rather than enforces, the regulations',
    ],
    correctIndex: 0,
    explanation:
      'PCAR 2023 = UK Public Charge Point Regulations 2023 (UK statutory regulations enforced by the Office of Product Safety and Standards — OPSS). Applies to chargepoints AVAILABLE TO THE PUBLIC (motorway services, supermarket car parks, urban kerbside hubs, public car parks). Six pillars: (1) PAYMENT — contactless bank card mandatory at chargers ≥8 kW (no app-only restriction); (2) RELIABILITY — rapid chargers (50+ kW) must achieve ≥99% uptime over rolling 12 months; (3) PRICING TRANSPARENCY — price per kWh + any ancillary fees displayed at the charger before session start; (4) ROAMING — interoperability via OCPI hub (e.g. Hubject); (5) 24/7 HELPLINE — phone number on each charger for issues; (6) OPEN DATA — CPO publishes uptime + pricing + availability via standardised API. Cert evidence bundle for public install records all six pillars compliance.',
  },
  {
    id: 'm7s7-pas-1899',
    question: 'PAS 1899:2022 — what does it cover?',
    options: [
      'The wiring and earthing standard for domestic home EV charger installations under Section 722',
      'The specification for wireless inductive EV charging pads and their alignment tolerances',
      'Accessibility of public EV chargepoints for disabled users — mounting heights, connector reach, terminal access, bay layout and signage',
      'The interoperability standard for cross-network roaming and clearing-house settlement between CPOs',
    ],
    correctIndex: 2,
    explanation:
      'PAS 1899:2022 — "Public charge points for electric vehicles. Specification for accessibility for disabled people". UK publicly available specification published by BSI in 2022 to address growing accessibility concerns at public charging. Covers: mounting heights of payment terminal + displays + connector socket; connector reach (cable length, holster height); payment terminal accessibility (visible from wheelchair height, audio assistance, high contrast); bay layout (kerb cuts, level approach, designated accessible bays); signage. PCAR 2023 supports PAS 1899 via reference. UK Government policy: accessibility of public charging is a key equality / consumer-rights priority. Cert evidence bundle for public install records PAS 1899 compliance evidence + designated accessible bay ratios.',
  },
  {
    id: 'm7s7-ofgem-licensing',
    question: 'CPO (Charge Point Operator) licensing under Ofgem — what is the position?',
    options: [
      'CPOs must each hold a full Ofgem electricity supply licence before they can operate a public charger',
      'CPOs sit outside all UK regulation and answer only to their own voluntary code of conduct',
      'CPOs are licensed and inspected directly by Ofgem under the same regime as gas and electricity suppliers',
      'CPOs are non-supplier end users reselling electricity, not Ofgem-licensed suppliers, governed by PCAR 2023 with OPSS enforcement',
    ],
    correctIndex: 3,
    explanation:
      'CPOs (Charge Point Operators) — companies that operate public charge point networks — are NOT licensed by Ofgem as electricity suppliers. They’re classified as "non-supplier" end-customers reselling electricity to drivers. UK 2025-26 regulatory framework: PCAR 2023 (UK statutory regulations, OPSS enforcement) governs CPO operation. Ofgem oversight indirect via the supply licence of the underlying electricity supplier (the CPO buys wholesale + supplies retail). Consumer protection via Consumer Rights Act 2015 + Competition + Markets Authority (CMA) oversight (the CMA investigated motorway EV charging concentration in 2022-23). UK reality: separate regulatory regime from gas / electricity supply — emerging area. Cert evidence bundle for the CPO’s operational scope records PCAR + CMA + OPSS compliance evidence.',
  },
  {
    id: 'm7s7-installer-vs-operator',
    question: 'Installer vs CPO responsibilities — where does the boundary lie?',
    options: [
      'The installer also owns the ongoing 99% reliability target and 24/7 helpline after handover, with the CPO only billing drivers',
      'The installer handles Section 722, the DNO connection and commissioning up to handover; the CPO then owns ongoing PCAR/PAS 1899 operation',
      'The CPO carries out the Section 722 install and commissioning, leaving the installer to run the helpline and open-data feed',
      'The end customer (site landowner) is responsible for PCAR compliance, with the CPO only supplying the hardware',
    ],
    correctIndex: 1,
    explanation:
      'Installer vs CPO boundary: clean handover at commissioning. INSTALLER scope: Section 722 layered compliance per charger; BS EN IEC 61439-7 multi-charger assembly; DNO connection; commissioning per BS EN 61851 series; cert evidence bundle delivered at handover. CPO scope (ongoing): PCAR 2023 compliance (payment terminal operation + reliability target + pricing transparency + roaming + 24/7 helpline + open data publication); PAS 1899 accessibility maintained; customer service; billing; firmware updates via CPMS; maintenance + ongoing EICR / inspection. UK 2025-26 reality: installer + CPO often distinct organisations (electrical contractor + chargepoint operator); some integrated (e.g. BP Pulse, Gridserve handle both); cert evidence bundle includes ongoing operator obligations document signed by CPO.',
  },
];

const quizQuestions = [
  {
    question: 'A public DC fast hub install — which PCAR 2023 pillars trigger at the install stage?',
    options: [
      'Only the payment terminal and pricing display, since reliability and open data are purely operational and added later',
      'Only the helpline signage and contactless terminal, with roaming and open data configured by the energy supplier',
      'All six pillars: payment terminals, reliability/redundancy, pricing displays, OCPP/OCPI roaming, helpline signage and open data',
      'Only reliability and roaming, as pricing and open data are set by the energy supplier after handover',
    ],
    correctAnswer: 2,
    explanation:
      'Public install design at install stage must integrate all six PCAR pillars: (1) PAYMENT — contactless bank card terminal at each charger ≥8 kW; PCAR-compliant payment processor (Visa / Mastercard accepted); (2) RELIABILITY — design for high availability — redundancy, robust enclosures, reliable kit selection; (3) PRICING TRANSPARENCY — display screens at each charger showing price per kWh + ancillary fees BEFORE session start (e.g. "65p/kWh + £1 connection fee"); (4) ROAMING — OCPP 1.6 / 2.0.1 charger + OCPI integration with the CPMS for cross-network roaming; (5) 24/7 HELPLINE — phone number signage on each charger pillar (typically printed sticker or LCD display); (6) OPEN DATA — CPMS configured to publish uptime + pricing + availability data via standardised API to UK government open-data feed. Installer’s job at commissioning: verify each pillar is configured. Cert evidence bundle records each pillar’s compliance evidence.',
  },
  {
    question: 'PAS 1899:2022 — bay layout requirements for accessible charging?',
    options: [
      'Standard-width bays at the normal 2.4 m, since the cable and terminal heights already suit any user',
      'Wider designated bays with kerb cut and level approach, accessible terminal heights, reachable connectors, audio assistance and high-contrast signage',
      'A single accessible bay per site marked with the wheelchair symbol, with no change to width or approach',
      'Wider bays only, with terminal and connector heights left at the standard non-accessible mounting',
    ],
    correctAnswer: 1,
    explanation:
      'PAS 1899:2022 bay layout requirements: designated accessible bays (typical ratio 1-in-6, varies by local authority planning); bay dimensions wider than standard (typically 3.6 m wide vs standard 2.4 m) allowing wheelchair access alongside vehicle door; kerb cut + level approach to bay (no high kerb that obstructs wheelchair access); clear of obstructions (lighting, planters, bollards positioned to avoid blocking access path); mounting height of payment terminal accessible from wheelchair seated position (typically 0.9-1.1 m above ground); connector cable + holster reachable from wheelchair (~1.0 m mounting); audio assistance for vision-impaired users (talking payment terminal, audio confirmation of charging start); high contrast displays + signage; tactile signage where appropriate. UK 2025-26 reality: PAS 1899 is voluntary but increasingly enforced via PCAR 2023 reference + UK Government planning conditions + local authority requirements. Cert evidence bundle records accessibility evidence per bay.',
  },
  {
    question: 'PCAR 2023 reliability requirement — 99% uptime over rolling 12 months. Calculation?',
    options: [
      '1% downtime ≈ 88 hours per year, but it applies only to chargers below 50 kW and is self-certified with no enforcement',
      'The 99% target is measured per calendar month rather than rolling 12 months, allowing ~7 hours of downtime in any single month',
      'The 99% figure is an availability average across the whole CPO network, so an individual rapid charger has no uptime obligation',
      '1% downtime ≈ 88 hours per year; the CPO monitors and reports it, and breaches trigger OPSS enforcement',
    ],
    correctAnswer: 3,
    explanation:
      'PCAR 2023 reliability requirement: rapid chargers (50+ kW) must achieve ≥99% uptime over rolling 12 months. Calculation: 99% uptime allows 1% downtime; 1% × 8,760 hours/year = ~88 hours allowed downtime per year (or ~7 hours per month average). CPO monitors uptime via CPMS (charger online + functional + able to deliver session); reports to UK Government open-data feed. Below threshold triggers OPSS (Office of Product Safety and Standards) enforcement: warning notice, financial penalty up to £10,000 per non-compliant chargepoint per breach. UK 2025-26 reality: most major CPOs (Gridserve, InstaVolt, IONITY, Tesla Supercharger, Octopus Electroverse, BP Pulse, MFG EV Power) actively manage uptime + publish data. Reliability target drives operator investment in monitoring + maintenance + reliable kit selection. Cert evidence bundle for CPO records ongoing uptime monitoring + reporting + breach response procedure.',
  },
  {
    question: 'Workplace install — does PCAR 2023 apply?',
    options: [
      'Yes — any commercial chargepoint at a business premises is in PCAR scope regardless of who can use it',
      'Yes — any three-phase or rapid chargepoint triggers PCAR, even an employee-only workplace unit',
      'Generally no — PCAR covers public-access chargepoints, so employee-only workplace units fall under Section 722 and the SCP Regs instead',
      'Yes — once a workplace charger is grant-funded under the Workplace Charging Scheme, PCAR applies in full',
    ],
    correctAnswer: 2,
    explanation:
      'PCAR 2023 scope is PUBLIC chargepoints — "available for use by the public". Workplace chargers used only by employees / contractors / visitors are NOT public; PCAR doesn’t apply. Workplace regulatory stack: BS 7671 Section 722 + SCP Regulations 2021 (workplace included) + OZEV Workplace Charging Scheme (if grant) + BS EN IEC 61439-7 (if multi-charger assembly). The classification depends on actual access, not nominal intent. UK 2025-26 edge cases: workplace chargers opened to the public after-hours (some retail / supermarket pattern); workplace with public visitor access during business hours (some leisure / hospitality). In those cases, PCAR may apply selectively. Cert evidence bundle records the site classification + the operator’s public-access policy.',
  },
  {
    question: 'OPSS enforcement of PCAR 2023 — what triggers an investigation?',
    options: [
      'Only a formal referral from Ofgem can open an investigation, since OPSS has no power to act on driver complaints',
      'Driver complaints, CMA monitoring, open data showing breaches and media coverage; OPSS issues notices, penalties up to £10k per chargepoint, or licence revocation',
      'Only the published open-data feed triggers action; driver complaints and CMA findings are outside OPSS remit',
      'Only a court order can compel OPSS to investigate, and its only sanction is to publish the breach',
    ],
    correctAnswer: 1,
    explanation:
      'OPSS (Office of Product Safety and Standards) is the UK enforcement authority for PCAR 2023. Investigation triggers: (1) driver complaints via official channel (gov.uk complaint form); (2) CMA monitoring + competition concerns (the CMA investigated motorway EV charging concentration in 2022-23 — set precedent for enforcement); (3) published open-data feeds showing repeated reliability breaches (the open-data requirement is itself an enforcement mechanism); (4) press / media coverage; (5) UK Government policy reviews. OPSS actions: warning notice; financial penalty (up to £10k per non-compliant chargepoint per breach); improvement orders. Persistent non-compliance: licence revocation for the CPO. UK 2025-26 reality: OPSS active enforcement; CPOs invest in compliance to avoid penalties. Cert evidence bundle for the install handed to CPO at commissioning includes the CPO’s ongoing compliance obligations documented.',
  },
  {
    question: 'Charge Point Roaming — what enables it?',
    options: [
      'The OCPP protocol alone, since the charger-to-CPMS link is all that is needed for cross-network billing',
      'A feature built into the vehicle that authorises any charger directly, with no clearing house between networks',
      'A single shared national payment app that every CPO is required to adopt instead of their own',
      'The OCPI protocol for CPMS-to-CPMS communication, letting a driver from one network pay on another via a hub such as Hubject',
    ],
    correctAnswer: 3,
    explanation:
      'OCPI = Open Charge Point Interface. Protocol for CPMS ↔ CPMS communication enabling cross-network roaming. Driver pays via home network app (e.g. Octopus Electroverse); behind the scenes, OCPI clearing house (Hubject is dominant European hub) settles between the home network (driver’s service provider) and the host network (CPO operating the chargepoint). UK 2025-26 reality: PCAR 2023 mandates roaming interoperability; CPOs integrate with Hubject (or similar) + offer roaming. Customer benefit: one app, many networks. CPO benefit: more sessions (drivers from other networks can use their chargepoints). Cert evidence bundle for the CPO records OCPI integration + roaming hub configuration.',
  },
];

const faqs = [
  {
    question: 'PCAR 2023 — when did it come into force?',
    answer:
      'PCAR 2023 = Public Charge Point Regulations 2023 (Statutory Instrument 2023). Effective date phased: payment + pricing transparency from November 2023; reliability target from November 2024; open data from November 2024. UK 2025-26 reality: all phases now in force; CPOs operating under full PCAR compliance. Verify current OPSS guidance at install / handover.',
  },
  {
    question: 'Domestic + workplace + public — clear PCAR boundary?',
    answer:
      'Domestic: PCAR doesn’t apply (domestic install). SCP Regulations 2021 apply. Workplace (employees only): PCAR doesn’t apply. SCP Regulations 2021 apply. Workplace opened to public: PCAR may apply selectively (depends on actual access). Public (motorway, supermarket, kerbside, public car park, hub): PCAR 2023 applies fully + PAS 1899 + OPSS enforcement. Cert evidence bundle records site classification.',
  },
  {
    question: 'OZEV vs PCAR — same regulator?',
    answer:
      'Different. OZEV (Office for Zero Emission Vehicles) = UK Government policy + grant-funding body (Workplace Charging Scheme, EV Chargepoint Grant, Local EV Infrastructure scheme). OPSS (Office of Product Safety + Standards) = PCAR 2023 enforcement authority. Different remits: OZEV funds + policy; OPSS enforces public-charging consumer-protection regulations. CPO interacts with both.',
  },
  {
    question: 'CMA + EV charging — what was the 2022-23 investigation?',
    answer:
      'CMA (Competition + Markets Authority) investigated UK EV charging market 2022-23 — concerns about motorway service area concentration (one operator per site historically); reliability + pricing transparency; roaming friction. CMA report (July 2023) led to UK Government commitments + PCAR 2023 elements (reliability, transparency, roaming). UK 2025-26 reality: CMA continues monitoring; charge point operators investing in compliance + competition to avoid renewed enforcement.',
  },
  {
    question: 'PAS 1899 — voluntary or mandatory?',
    answer:
      'Voluntary specification (PAS = Publicly Available Specification, not a regulation). BUT PCAR 2023 references PAS 1899; local authority planning conditions increasingly require it; UK Government Disability Strategy supports + funds compliance. UK 2025-26 reality: public charging hubs designed to PAS 1899 by default (industry expectation). New installs without PAS 1899 compliance face planning challenges + driver-community criticism + future regulation risk.',
  },
];

export default function RenewableEnergyModule7Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'CPO regulations & PCAR 2023 | Renewable Energy 7.7 | Elec-Mate',
    description:
      'Public Charge Point Regulations 2023 (PCAR) — payment + reliability + pricing transparency + roaming + 24/7 helpline + open data. PAS 1899:2022 accessibility. CPO licensing framework. OPSS enforcement. Installer vs CPO boundary.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 7 · Public Charge Point Regulations 2023 + PAS 1899:2022"
            title="CPO regulations & PCAR 2023"
            description="The UK statutory regulatory framework for public EV charging — Public Charge Point Regulations 2023 (PCAR), PAS 1899:2022 accessibility, OPSS enforcement, CPO operational obligations, installer vs CPO boundary."
            tone="yellow"
          />

          <TLDR
            points={[
              'PCAR 2023 = Public Charge Point Regulations 2023 (UK statutory regulations). Applies to chargepoints AVAILABLE TO THE PUBLIC. Workplace + domestic excluded.',
              'Six pillars: (1) payment (contactless card mandatory ≥8 kW); (2) reliability (≥99% uptime for 50+ kW rapid); (3) pricing transparency (display before session start); (4) roaming (OCPI interoperability); (5) 24/7 helpline (phone on each charger); (6) open data (CPMS publishes uptime + pricing).',
              'OPSS (Office of Product Safety + Standards) is the enforcement authority. Powers: warning notices, financial penalties up to £10k per chargepoint per breach, improvement orders, licence revocation for persistent non-compliance.',
              'PAS 1899:2022 — accessibility specification for public charge points. Mounting heights, connector reach, payment terminal accessibility, bay layout (kerb cuts, level approach, designated accessible bays at typical 1-in-6 ratio).',
              'CPOs (Charge Point Operators) operate the public networks. NOT licensed as electricity suppliers under standard Ofgem regime; classified as "non-supplier" end-customers reselling electricity to drivers.',
              'CMA (Competition + Markets Authority) oversight: 2022-23 investigation into UK EV charging market led to PCAR 2023 elements; CMA continues monitoring for competition + reliability concerns.',
              'OCPI = Open Charge Point Interface protocol enables roaming between networks. Hubject is dominant European OCPI hub. PCAR 2023 mandates interoperability.',
              'Installer vs CPO boundary: installer handles BS 7671 + BS EN IEC 61439-7 + DNO + commissioning + cert evidence bundle handover. CPO handles ongoing operation — PCAR 2023 compliance + PAS 1899 accessibility + customer service + billing + maintenance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply PCAR 2023 six pillars to public charging install design — payment, reliability, pricing transparency, roaming, helpline, open data.',
              'Apply PAS 1899:2022 accessibility — mounting heights, connector reach, payment terminal accessibility, bay layout (kerb cuts, designated bays).',
              'Distinguish public chargepoints (PCAR scope) from workplace (SCP-Regs scope) from domestic (Section 722 + SCP-Regs).',
              'Understand OPSS enforcement powers — warning notices, financial penalties, improvement orders, licence revocation.',
              'Apply OCPI for cross-network roaming via Hubject or similar hub; PCAR 2023 interoperability mandate.',
              'Distinguish installer scope (BS 7671 + commissioning + cert evidence bundle) from CPO scope (ongoing PCAR compliance + customer service).',
              'Apply the CMA / competition framework: 2022-23 investigation led to PCAR 2023; ongoing monitoring.',
              'Document handover from installer to CPO: cert evidence bundle + PCAR / PAS 1899 compliance + ongoing operator obligations agreement.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            PCAR 2023 isn’t a BS 7671 wiring regulation. It’s a UK statutory consumer-protection regime. Different regulator, different scope, different teeth.
          </Pullquote>

          <ContentEyebrow>PCAR 2023 — six pillars of public-charging compliance</ContentEyebrow>

          <ConceptBlock
            title="What PCAR 2023 is + what it covers"
            plainEnglish="PCAR 2023 = Public Charge Point Regulations 2023 (UK Statutory Instrument). Enforced by OPSS (Office of Product Safety + Standards). Applies to chargepoints AVAILABLE TO THE PUBLIC. Six operational pillars + ongoing reporting obligations. Designed to address UK 2020-22 public-charging concerns (low reliability, opaque pricing, payment friction, accessibility gaps)."
            onSite="Installer’s role: design + commission the install with PCAR pillars integrated. CPO’s role: ongoing operation + compliance + reporting. Cert evidence bundle records the install-side pillar configurations + handover to CPO ongoing obligations."
          >
            <p>PCAR 2023 six pillars:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. PAYMENT</strong> — contactless bank
                card mandatory at chargers ≥8 kW. No app-only restriction.
                PCAR-compliant payment processor (Visa / Mastercard accepted)
              </li>
              <li>
                <strong className="text-white">2. RELIABILITY</strong> — rapid chargers
                (50+ kW) must achieve ≥99% uptime over rolling 12 months. Below threshold
                = OPSS enforcement
              </li>
              <li>
                <strong className="text-white">3. PRICING TRANSPARENCY</strong> — price
                per kWh + any ancillary fees displayed at the charger BEFORE session
                start. Format: kWh-based or per-session
              </li>
              <li>
                <strong className="text-white">4. ROAMING</strong> — interoperability
                via OCPI hub (e.g. Hubject). CPO must provide roaming via at least one hub
              </li>
              <li>
                <strong className="text-white">5. 24/7 HELPLINE</strong> — phone number
                on each charger (signage or LCD display). Customer service responding 24h
              </li>
              <li>
                <strong className="text-white">6. OPEN DATA</strong> — CPO’s CPMS
                publishes uptime + pricing + availability via standardised API to UK
                Government open-data feed
              </li>
            </ul>
          </ConceptBlock>

          <Pcar2023Requirements caption="The Public Charge Point Regulations 2023 consumer duties for public chargepoints." />

          <RegsCallout
            source="UK Statutory Instrument 2023 · Public Charge Point Regulations 2023"
            clause="PCAR 2023 imposes operational obligations on operators of public EV charging points: payment accessibility (contactless cards mandatory ≥8 kW); reliability (99% uptime for 50+ kW); pricing transparency (display before session start); roaming (interoperability via OCPI); 24/7 helpline (phone number on each charger); open data publication. Enforced by OPSS (Office of Product Safety + Standards) with powers of warning notice, financial penalty (up to £10k per non-compliant chargepoint per breach), improvement order, licence revocation."
            meaning="PCAR 2023 is UK statutory law — not a BS 7671 wiring regulation. Applies to chargepoints available to the public; workplace + domestic excluded. OPSS is the enforcement authority. UK 2025-26 reality: all six pillars in force; CPOs (Gridserve, InstaVolt, IONITY, Tesla Supercharger, Octopus Electroverse, BP Pulse, MFG EV Power) operate under full PCAR compliance. Cert evidence bundle for installer-handover to CPO includes installer-side pillar configurations (payment terminal commissioning, pricing display, helpline signage, OCPP / OCPI integration) + handover document detailing ongoing CPO obligations."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>PAS 1899:2022 — accessibility for disabled users</ContentEyebrow>

          <Pullquote>
            Accessibility is the silent failing of UK 2020-22 public charging. PAS 1899:2022 puts it in writing. PCAR 2023 references it. Local authority planning conditions enforce it.
          </Pullquote>

          <ConceptBlock
            title="PAS 1899:2022 — what it requires"
            plainEnglish="PAS 1899:2022 (Publicly Available Specification by BSI) — Specification for accessibility for disabled people at public EV charge points. Voluntary spec but increasingly enforced via PCAR 2023 reference + planning conditions. Covers physical accessibility of public charging."
            onSite="UK 2025-26 reality: new public charging hubs designed to PAS 1899 by default. Older sites (pre-2022) being retrofitted under operator-led accessibility programmes. Cert evidence bundle for public install records PAS 1899 compliance evidence + designated accessible bay ratios."
          >
            <p>PAS 1899:2022 key requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Designated accessible
                  bays</strong> — typical ratio 1-in-6 of total bays; varies by local
                authority planning. Wider bay dimensions (typically 3.6 m vs standard 2.4
                m); allows wheelchair alongside vehicle door
              </li>
              <li>
                <strong className="text-white">Approach + kerb
                  cut</strong> — level approach to bay; kerb cut where needed; no high
                kerb that obstructs wheelchair access
              </li>
              <li>
                <strong className="text-white">Clear of obstructions</strong>
                — lighting columns, planters, bollards positioned to avoid blocking
                access path
              </li>
              <li>
                <strong className="text-white">Mounting height</strong> — payment
                terminal + display accessible from wheelchair seated position (typically
                0.9-1.1 m above ground). Cable + connector holster reachable (typically ~1
                m mounting)
              </li>
              <li>
                <strong className="text-white">Audio + tactile</strong> — audio
                assistance (talking payment terminal, audio confirmation of charging
                start); high contrast displays; tactile signage where appropriate
              </li>
              <li>
                <strong className="text-white">Signage</strong> — clear directional
                signs to accessible bays; international accessibility symbol; tactile +
                Braille where appropriate
              </li>
              <li>
                <strong className="text-white">Cable
                  weight</strong> — accessible-bay cables may be lighter / smaller diameter
                where feasible; some operators provide a "buddy" call-out service for
                customers unable to handle the cable
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — PAS 1899
                compliance evidence per bay + photographs + accessibility audit report
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="PAS 1899:2022 — Public charge points for electric vehicles. Specification for accessibility for disabled people"
            clause="PAS 1899:2022 is a UK Publicly Available Specification published by BSI (British Standards Institution) in 2022. Sets out specification for accessibility of public EV charge points for disabled people — mounting heights, connector reach, payment terminal accessibility, bay layout (kerb cuts, level approach, designated accessible bays), signage, audio + tactile assistance. Voluntary specification; referenced by PCAR 2023; local authority planning conditions increasingly enforce."
            meaning="PAS 1899 is the design standard for accessibility at public EV charging. Voluntary spec at the BSI level — not statutory law — but enforced in practice via PCAR 2023 cross-reference, local authority planning conditions, UK Government Disability Strategy, and industry expectation. UK 2025-26 reality: new public charging hubs design to PAS 1899 by default; retrofit programmes underway at older sites. Cert evidence bundle for public install records accessibility evidence per bay + photographs."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>CPO licensing, CMA + OPSS enforcement</ContentEyebrow>

          <ConceptBlock
            title="CPO licensing framework"
            plainEnglish={`CPOs (Charge Point Operators) operate public EV charging networks. UK regulatory classification: NOT licensed as electricity suppliers under standard Ofgem regime. They’re "non-supplier" end-customers reselling electricity to drivers. Regulated via PCAR 2023 (OPSS) + Consumer Rights Act 2015 + CMA oversight + indirect Ofgem oversight via underlying supply licence.`}
            onSite="UK 2025-26 major CPOs: Gridserve, InstaVolt, IONITY, Tesla Supercharger, Octopus Electroverse, BP Pulse, MFG EV Power, Osprey, Pod Point, Source London, Connected Kerb, Trojan Energy, ESB Energy. Each operates a network of public chargers under PCAR + CMA + OPSS framework. Cert evidence bundle for installer handover to CPO records the CPO’s ongoing compliance obligations."
          >
            <p>CPO regulatory framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">NOT Ofgem
                  supplier-licensed</strong> — CPOs are not licensed as electricity
                suppliers. They buy wholesale (or via a contracted supplier) + retail to
                drivers at the chargepoint
              </li>
              <li>
                <strong className="text-white">PCAR 2023 (OPSS
                  enforcement)</strong> — direct regulatory regime for operational
                obligations
              </li>
              <li>
                <strong className="text-white">Consumer Rights Act
                  2015</strong> — general consumer protection framework — services must
                be of reasonable quality, fit for purpose, fair pricing
              </li>
              <li>
                <strong className="text-white">CMA oversight</strong> — competition
                regulator monitoring market structure, pricing, reliability. CMA 2022-23
                investigation led to PCAR 2023 elements
              </li>
              <li>
                <strong className="text-white">Indirect Ofgem
                  oversight</strong> — via the underlying electricity supplier’s
                licence (the CPO buys from the supplier; supplier is Ofgem-licensed)
              </li>
              <li>
                <strong className="text-white">DCC / smart meter
                  framework</strong> — Data Communications Company’s smart-meter
                infrastructure increasingly relevant for V2G + flexible-charging
                interactions with grid
              </li>
              <li>
                <strong className="text-white">UK 2025-26
                  evolution</strong> — emerging area; regulatory framework still maturing.
                More direct CPO licensing under discussion at Ofgem / UK Government
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CMA + OPSS enforcement in practice"
            plainEnglish="OPSS (Office of Product Safety + Standards) is the PCAR 2023 enforcement authority. Powers: warning notices, financial penalties up to £10k per chargepoint per breach, improvement orders, licence revocation. CMA (Competition + Markets Authority) maintains broader market oversight + can investigate competition concerns."
            onSite="UK 2025-26 OPSS active enforcement: driver complaint channels open; reliability monitoring via published open-data feeds; periodic compliance audits. CPOs invest in compliance to avoid penalties. CMA continues market monitoring post-2023 investigation."
          >
            <p>Enforcement triggers + actions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Driver
                  complaints</strong> — official channel via gov.uk; OPSS investigates
              </li>
              <li>
                <strong className="text-white">Open-data
                  monitoring</strong> — published uptime + pricing data via UK Government
                feed; OPSS monitors for repeated breaches
              </li>
              <li>
                <strong className="text-white">CMA market
                  oversight</strong> — competition concerns (e.g. motorway service area
                concentration as investigated 2022-23); CMA can refer to OPSS or initiate
                its own investigation
              </li>
              <li>
                <strong className="text-white">Press / media</strong>
                — high-profile reliability or pricing concerns generate regulatory
                attention
              </li>
              <li>
                <strong className="text-white">OPSS warning
                  notice</strong> — initial enforcement; gives CPO time to remedy
              </li>
              <li>
                <strong className="text-white">Financial
                  penalty</strong> — up to £10k per non-compliant chargepoint per
                breach. Persistent / large-scale breach = significant penalty
              </li>
              <li>
                <strong className="text-white">Improvement
                  order</strong> — formal order requiring specific remedial actions
                within a timeframe
              </li>
              <li>
                <strong className="text-white">Licence
                  revocation</strong> — for persistent non-compliance; not yet exercised
                at UK 2025-26 but theoretical sanction
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <Pullquote>
            OCPP carries the messages. OCPI carries the money. Hubject is where they meet.
          </Pullquote>

          <ConceptBlock
            title="Hubject roaming in detail"
            plainEnglish="Hubject is the dominant pan-European OCPI roaming hub. Connects CPOs (operating chargepoints) with eMSPs (operating customer apps + billing). Driver pays via home app; Hubject clears the transaction between CPO and eMSP; CPO receives settlement for the energy delivered. UK 2025-26 reality: most major UK CPOs integrate with Hubject."
            onSite="Hubject connection is a CPMS-level integration — above installer scope. But operationally relevant: installer’s charger commissioning + CPMS integration enables Hubject roaming. Cert evidence bundle handed to CPO records: CPMS account holder + Hubject integration status + roaming hubs connected (Hubject, Gireve, e-clearing.net are the European hubs). PCAR 2023 mandates roaming interoperability — Hubject (or equivalent) is the typical fulfilment."
          >
            <p>Hubject roaming mechanics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CPO ↔ Hubject</strong> — CPO’s CPMS
                connects to Hubject via OCPI. Exposes chargepoint availability + pricing
              </li>
              <li>
                <strong className="text-white">eMSP ↔ Hubject</strong> — eMSP (driver’s
                app provider) connects to Hubject via OCPI. Authorises driver sessions
                against driver’s account
              </li>
              <li>
                <strong className="text-white">Driver
                  experience</strong> — opens home app (e.g. Octopus Electroverse, BP
                Pulse, Shell Recharge), finds CPO chargepoint, taps "start"; Hubject
                routes authorisation; charger starts session
              </li>
              <li>
                <strong className="text-white">Settlement</strong> — Hubject clears
                transactions between CPO and eMSP; CPO receives settlement for energy
                delivered at agreed wholesale roaming tariff
              </li>
              <li>
                <strong className="text-white">PCAR 2023
                  fulfilment</strong> — Hubject (or equivalent OCPI hub) provides the
                interoperability mandated by PCAR pillar 4. CPOs typically integrate with
                multiple hubs for broad coverage
              </li>
              <li>
                <strong className="text-white">Wholesale
                  roaming pricing</strong> — typically discounted from retail; CPO
                accepts lower margin in exchange for additional sessions from roaming
                customers
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — CPMS account holder + OCPI hub connections + roaming
                tariff configuration documented for CPO ongoing scope
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="OPSS enforcement — examples from UK 2025-26 market"
            plainEnglish="OPSS is the PCAR 2023 enforcement authority and is actively monitoring + enforcing. Triggers include reliability data published via the open-data feed, driver complaints, and CMA cross-references. Penalties scale with breach severity + CPO size + persistence."
            onSite="UK 2025-26 OPSS enforcement is still developing — early warning notices issued; financial penalties applied at smaller scale; pattern of behaviour established. CPOs invest in monitoring + maintenance + payment terminal commissioning specifically to avoid OPSS triggers. Installer’s commissioning of PCAR pillars at handover is the foundation that CPO ongoing compliance depends on."
          >
            <p>OPSS enforcement examples + patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reliability
                  breach</strong> — CPO reports 96% uptime on a 50+ kW chargepoint (below
                99% threshold); OPSS warning notice; CPO has remediation window; persistent
                breach → financial penalty
              </li>
              <li>
                <strong className="text-white">Payment terminal
                  non-compliance</strong> — chargepoint ≥8 kW without contactless card
                payment (PCAR pillar 1 breach); driver complaint; OPSS investigates; CPO
                must retrofit + pay penalty
              </li>
              <li>
                <strong className="text-white">Pricing
                  transparency failure</strong> — pricing not displayed before session
                start (PCAR pillar 3); driver complaint; OPSS investigates; CPO must
                update display + pay penalty
              </li>
              <li>
                <strong className="text-white">Open-data
                  publication gap</strong> — CPO not publishing uptime + pricing to UK
                Government open-data feed (PCAR pillar 6); OPSS investigates; CPO must
                configure publication + pay penalty
              </li>
              <li>
                <strong className="text-white">Helpline failure</strong>
                — phone number on chargepoint dead or unanswered (PCAR pillar 5); driver
                complaint; OPSS investigates; CPO must remedy + pay penalty
              </li>
              <li>
                <strong className="text-white">Persistent
                  non-compliance</strong> — multiple breaches across pillars over time;
                escalating penalties; potential licence revocation
              </li>
              <li>
                <strong className="text-white">CMA + OPSS
                  cooperation</strong> — competition concerns flagged by CMA can result in
                joint enforcement action; recent precedent on motorway concentration
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Installer vs CPO boundary at handover</ContentEyebrow>

          <ConceptBlock
            title="Installer scope ends at commissioning + handover"
            plainEnglish="Installer’s job: Section 722 + BS EN IEC 61439-7 + DNO connection + commissioning per BS EN 61851 series + cert evidence bundle delivery. CPO’s job (ongoing): PCAR 2023 compliance + PAS 1899 accessibility + customer service + billing + firmware updates + maintenance + EICR ownership."
            onSite="Clean handover document at commissioning. CPO signs acceptance of ongoing operator obligations. Cert evidence bundle includes installer-side compliance evidence + CPO operating manual + ongoing obligations document. Some operators integrate installer + CPO roles (BP Pulse, Gridserve); most have separate organisations."
          >
            <p>Handover scope split:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Installer
                  delivers</strong> — BS 7671 EIC per charger; BS EN IEC 61439-7 assembly
                conformity; DNO connection agreement; BS EN 61851 commissioning evidence;
                PCAR pillar configuration (payment terminal commissioned, pricing display
                operational, helpline signage in place, OCPP / OCPI integration tested,
                open-data publication configured); PAS 1899 bay layout evidence
              </li>
              <li>
                <strong className="text-white">CPO accepts</strong> — ongoing
                operation; reliability target monitoring; payment processing; pricing
                management; helpline operation; open-data publication; OCPI roaming;
                accessibility maintenance
              </li>
              <li>
                <strong className="text-white">Handover document</strong>
                — formal acceptance + sign-off; cert evidence bundle structure + access
                + CPO contact details + installer support contact
              </li>
              <li>
                <strong className="text-white">First-year
                  warranty</strong> — typically the installer carries first-year warranty
                on the install; CPO covers operational issues; manufacturer covers
                hardware warranty (typically 2-5 years)
              </li>
              <li>
                <strong className="text-white">Ongoing
                  maintenance</strong> — CPO contracts maintenance (either with original
                installer or alternative service provider). Routine + reactive
                maintenance covered
              </li>
              <li>
                <strong className="text-white">EICR
                  ownership</strong> — CPO owns ongoing EICR cycle; typically 5-year
                interval for commercial; some operators on shorter cycles
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle
                  handover</strong> — structured digital folder (likely SharePoint /
                Confluence / similar) — installer hands over with read-write access
                transferred to CPO
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Public DC fast hub — installer + CPO handover"
            situation="Public DC fast hub install complete: 6 × 150 kW + 2 × 350 kW chargers + dedicated HV connection + transformer + LV switchgear + multi-charger LV assembly. CPO (e.g. Gridserve) operates the site under their brand. Installer (e.g. specialist EV electrical contractor) delivered the install. Commissioning complete. Handover to CPO."
            whatToDo="Handover scope. Installer delivers: 8 × EIC per charger (Section 722 layered compliance per charger); BS EN IEC 61439-7 multi-charger LV assembly DoC; DNO HV connection agreement + reference; transformer + LV switchgear specifications + commissioning reports; BS EN 61851-23 + BS EN IEC 62196-3 manufacturer DoCs; PCAR pillar configuration: payment terminals at each charger commissioned + tested (Visa / Mastercard contactless); pricing display screens operational + tested (e.g. 65p/kWh + £0.50 connection fee); 24/7 helpline signage installed on each pillar (Gridserve helpline 0800-xxx-xxxx); OCPP 2.0.1 + OCPI integration tested + roaming with Hubject confirmed; open-data publication configured via Gridserve’s CPMS to UK Government feed; PAS 1899 evidence per bay (accessibility audit complete; 2 of 8 designated accessible). CPO accepts: ongoing reliability monitoring (≥99% target); payment processing operation; pricing management; helpline 24/7 operation; open-data ongoing publication; OCPI roaming maintenance; accessibility maintenance + PAS 1899 ongoing compliance. Handover document signed by both installer + CPO. First-year warranty: installer carries (subject to CPO not modifying); manufacturer 2-5 year hardware warranty. Ongoing EICR: CPO owns 5-year cycle. Cert evidence bundle: structured digital folder transferred to CPO with full installer-side compliance evidence."
            whyItMatters="Public DC fast hub installs are major regulatory projects with multiple compliance frameworks. Clean handover is essential — installer cannot remain on the hook for ongoing operational obligations they don’t control. CPO needs full installer-side evidence to operate the site under PCAR 2023 + PAS 1899. UK 2025-26 mature industry practice: structured handover document + cert evidence bundle access transfer + named contacts for warranty / support / regulatory enquiries."
          />

          <Scenario
            title="Council kerbside charging — PAS 1899 compliance"
            situation="Local authority installing 20 kerbside 7 kW Mode 3 chargers across a residential area for terraced-house residents without driveways. Public access (PCAR 2023 + PAS 1899). Tight pavement space + existing kerbs."
            whatToDo="PAS 1899 considerations dominate. Designated accessible bays: 4 of 20 (typical 1-in-5 for kerbside). Wider bay layouts where space permits. Kerb cuts at accessible bays for wheelchair access. Mounting height of payment terminal ~1 m above pavement; cable holster ~0.9 m. Audio assistance available via app + payment terminal audio confirmation. High contrast displays + signage. Tactile signage at accessible bays. PCAR 2023 compliance per charger: payment terminal (contactless mandatory at ≥8 kW; 7 kW chargers borderline — most operators implement contactless anyway for consistency); pricing transparency on screen; 24/7 helpline signage; OCPP + OCPI roaming via Hubject; open-data publication. Section 722 per charger: PME-on-EV via OPDD-equipped wallboxes; Type A + RDC-PD architecture; dedicated final circuit per charger. Multi-charger LV assembly per BS EN IEC 61439-7. DNO EREC G99 for the multi-charger cluster. Local authority planning permission + pavement consent + kerb cuts. Cert evidence bundle: 20 × EIC + 61439-7 + DNO G99 + PCAR pillar configuration + PAS 1899 evidence per bay + planning + pavement consent documentation."
            whyItMatters="Kerbside charging is the UK 2025-26 growth area for residents without off-street parking (estimated 30-40% of UK households). Council-led installs face the full PCAR + PAS 1899 + planning + accessibility stack. The accessibility considerations are particularly acute on tight pavement spaces. Cert evidence bundle integrates all layers + supports council’s public-accountability obligations."
          />

          <CommonMistake
            title="Treating PCAR 2023 as an installer obligation rather than CPO operational obligation"
            whatHappens="Installer takes on commitments around reliability + customer service + open-data publication that they can’t deliver — they finish the install + walk away. CPO discovers PCAR obligations they thought were the installer’s. Operational gaps + OPSS exposure."
            doInstead="Clean boundary at install handover. Installer: PCAR pillar CONFIGURATION at commissioning (payment terminal commissioned, pricing display operational, helpline signage installed, OCPP + OCPI integration tested + open-data publication configured). CPO: PCAR pillar ONGOING OPERATION (reliability monitoring, customer service, ongoing publication, ongoing roaming maintenance). Handover document explicitly lists installer-completed vs CPO-ongoing scope. Cert evidence bundle is the handover artefact."
          />

          <CommonMistake
            title={`Skipping PAS 1899 because it’s "voluntary"`}
            whatHappens="Installer / CPO designs public hub without PAS 1899 compliance. Local authority planning rejects (planning conditions increasingly enforce PAS 1899). Project delays + redesign + re-application costs."
            doInstead="Design to PAS 1899 by default for any public install. Cost differential vs non-accessible design is modest (5-10% typical); avoids planning rejection + driver-community criticism + future regulation risk. UK 2025-26 reality: PAS 1899 is the de-facto standard even though voluntary. Cert evidence bundle records PAS 1899 evidence per bay."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PCAR 2023 = UK Public Charge Point Regulations 2023. Applies to public chargepoints. Workplace + domestic excluded.',
              'Six pillars: payment (contactless ≥8 kW), reliability (≥99% uptime for 50+ kW), pricing transparency (display before session), roaming (OCPI), 24/7 helpline (phone on each), open data (CPMS publishes).',
              'OPSS (Office of Product Safety + Standards) enforces PCAR 2023. Powers: warning notices, financial penalties up to £10k per chargepoint per breach, improvement orders, licence revocation.',
              'PAS 1899:2022 = accessibility specification for public EV charge points. Voluntary spec, enforced in practice via PCAR + planning + UK Government Disability Strategy.',
              'CPOs (Charge Point Operators) are NOT Ofgem-supplier-licensed. Classified as "non-supplier" end-customers reselling electricity. Regulated via PCAR + CRA + CMA.',
              'CMA market oversight: 2022-23 EV charging investigation led to PCAR 2023 elements. Continuing post-investigation monitoring.',
              'OCPI = Open Charge Point Interface. CPMS ↔ CPMS roaming protocol. Hubject dominant European hub. PCAR mandates interoperability.',
              'Installer scope: Section 722 + BS EN IEC 61439-7 + DNO + commissioning + cert evidence bundle delivery + PCAR pillar configuration.',
              'CPO scope (ongoing): PCAR 2023 ongoing compliance + PAS 1899 accessibility maintenance + customer service + billing + maintenance + EICR ownership.',
              'Handover document: formal scope split + first-year warranty + ongoing obligations + named contacts.',
              'Cert evidence bundle integrates: BS 7671 + BS EN IEC 61439-7 + DNO + PCAR + PAS 1899 + ongoing CPO obligations. Structured digital folder transferred from installer to CPO.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fleet charging — depot, scheduling, telematics
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.8 Commercial commissioning, EICR & handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
