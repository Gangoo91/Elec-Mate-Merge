/**
 * Module 6 · Section 1 · Subsection 3 — Statutory context
 * Maps to C&G 2365-03 / Unit 305 / LO1 / AC 1.4, 1.5
 *
 * Layered depth: 2366-03 Unit 304 / AC 1.3; 5393-03 Unit 104 / AC 1.3
 *
 * Building Regulations Part P (notifiable work in dwellings),
 * Part L (energy efficiency) and the Building Safety Act 2022 footprint
 * on higher-risk residential buildings (HRRBs).
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

const TITLE = 'Statutory context — Part P, Part L, BSA 2022 (1.3) | Level 3 Module 6.1.3 | Elec-Mate';
const DESCRIPTION =
  'Building Regulations Part P (notifiable work in dwellings), Part L (energy efficiency, soon to drive AFDD recommendations harder), and the Building Safety Act 2022 footprint on higher-risk residential buildings.';

const checks = [
  {
    id: 'partp-notifiable',
    question:
      'A homeowner asks you to add a single new socket in an existing bedroom (not in a special location). Is the work notifiable under Part P in England?',
    options: [
      'To facilitate a structured conversation between the parties, helping them understand each other\\\\\\\\\\\\\\\'s perspectives and reach a mutually acceptable resolution',
      'Cutting containment (trunking, basket tray, conduit), making openings in plasterboard, cutting cable tray, and general cutting tasks where a hacksaw would be too slow',
      'No — adding accessories to an existing circuit (without a new circuit) outside special locations is non-notifiable. The work still must comply with BS 7671 and produce a Minor Works Certificate.',
      'A SINGLE AC test at 1×IΔn — measured trip time must be within published maximum (BS EN 61008/61009: 300ms general purpose). 5×IΔn was DELETED',
    ],
    correctIndex: 2,
    explanation:
      "Part P (England) was scaled back in 2013. Notifiable work is now: installation of a new circuit; replacement of a consumer unit; or any addition or alteration to existing circuits in a special location (bathroom zones, swimming pool, sauna). Adding accessories to an existing circuit outside a special location is non-notifiable, but a Minor Works Certificate (MWC) is still required to certify safety and compliance. Notification routes are: self-certify via a registered competent-person scheme (NICEIC, NAPIT, ELECSA), or formally notify Building Control before commencement.",
  },
  {
    id: 'partl-thermal',
    question:
      'Part L of the Building Regulations principally drives which design decision for the L3 electrician?',
    options: [
      'Genuine diagnostic work that cannot be done dead, by a competent person, with appropriate PPE/test kit and a justified plan — and even then, isolate as much as possible',
      'Loss of one phase (in TPN supply), tripped MCB/RCBO, loose connection at a feeder, line conductor break in a junction box or pendant, and accidental switching off',
      'Energy efficiency — primarily lighting (lux levels and luminaire efficacy), heating control (thermostats and zoning), and increasingly EV / PV / battery / heat pump readiness in new dwellings (Future Homes Standard).',
      'Annual leak check by F-Gas-certified personnel where charge ≥ 5 tonnes CO₂e, or every 2 years where charge < 5 tonnes; frequencies double if a leak detection system is installed and operational',
    ],
    correctIndex: 2,
    explanation:
      "Part L covers conservation of fuel and power. The electrical design touches it through: efficient lighting (luminaire efficacy floors, controls, occupancy sensing), heating zoning and controls (thermostats per zone, time programs), and increasingly low-carbon-ready provisions — EV charging point per new dwelling (Approved Document S, 2022), PV and battery enabling provisions, and the Future Homes Standard 2025 push for heat-pump-ready electrical infrastructure. AFDD specs sit under BS 7671 (Reg 421.1.7), not Part L directly.",
  },
  {
    id: 'bsa-hrrb',
    question:
      'A residential building is 22 m tall (8 storeys) with a single staircase. Under the Building Safety Act 2022, what does this mean for the electrical designer?',
    options: [
      'Because electronics with capacitive or low-impedance protection paths (SPDs, LED driver capacitors, EMC filters in inverters) will either short the test signal (giving a false low reading) or be destroyed by the 500 V DC stress they were never designed to withstand.',
      'A formal procedure resulting from systematic examination of a task to identify hazards, define safe methods to eliminate or minimise those hazards. Documented in the Method Statement portion of RAMS. Permits-to-work are a specific form of SSoW for high-hazard activity.',
      'The building is a higher-risk residential building (HRRB). Design competence floor is higher (typically HNC/HND or degree, demonstrable CPD, scheme membership), the design must form part of the golden thread of building safety information that survives the building lifetime, and AFDDs are likely to harden from recommended to required for final circuits.',
      'NICEIC scheme action — non-conformance notice, possible suspension, possible removal from the scheme. Removal from the CPS means: no more self-certification under Part P, customers\\\' insurance defences weakened, marketing claims (logo, badge) withdrawn, and frequently insurer-driven loss of public liability cover. The job stays civil, but the firm\\\'s ability to trade collapses.',
    ],
    correctIndex: 2,
    explanation:
      "The BSA 2022 defines HRRBs as residential buildings 18 m or more in height OR 7 or more storeys, with at least 2 residential units. The Act introduces the Building Safety Regulator, gateway approvals before construction can proceed, a duty-holder regime that makes designers and contractors specifically accountable, and the golden thread — a digital, structured record of design decisions and safety-critical information that must be maintained for the lifetime of the building. AFDD wording in BS 7671 is recommending today; on HRRBs the expectation is hardening rapidly.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Part P of the Building Regulations applies to which type of premises in England?',
    options: [
      'A structured model such as: What happened? → What did I think/feel? → What was good/bad about the experience? → What have I learned? → What will I do differently next time?',
      'Dwellings (including any common parts of a dwelling, gardens, sheds and outbuildings of a dwelling, but NOT commercial or industrial premises).',
      'Isolate the electrical supply if it can be done quickly and safely, or use a non-conducting object to separate them from the source',
      'Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work',
    ],
    correctAnswer: 1,
    explanation:
      "Part P specifically covers dwellings. Commercial and industrial premises are covered by other Approved Documents (Part B fire, Part L energy, Part M access) and by BS 7671, but Part P is a dwellings-only regulation in England. Wales has its own equivalent.",
  },
  {
    id: 2,
    question: 'Which work in a dwelling IS notifiable under Part P (England)?',
    options: [
      'Tubes contain mercury vapour and phosphor powder — both regulated as hazardous; ventilate, don’t sweep up dry, double-bag',
      'Recorded to the resolution displayed by the instrument and compared against design values (and BS 7671 maxima) BEFORE leaving site',
      'Replacing the consumer unit, installing a new circuit, or any addition or alteration in a special location (bathroom zones 0/1/2, swimming pool, sauna).',
      'Machine-produced, durable, securely fixed, clearly legible and resistant to the environmental conditions at the point of installation',
    ],
    correctAnswer: 2,
    explanation:
      "Three categories of notifiable work in dwellings (England): (1) new circuit, (2) consumer unit replacement, (3) any addition or alteration in a special location. Notification is via a competent-person scheme (self-certification) or formal Building Control notification before work starts.",
  },
  {
    id: 3,
    question: 'A Minor Works Certificate is required for:',
    options: [
      'Minimise disruption, keep the work area tidy, explain what you are doing if asked, and be courteous and professional at all times',
      'Detection throughout all areas of the building for the purpose of protecting life — the highest category of life protection system',
      'One month (extendable to three months for complex requests if the data subject is told of the extension within the first month)',
      'Any addition or alteration to an existing circuit that does not extend it to a new circuit — covers most non-notifiable work in dwellings AND the equivalent in commercial.',
    ],
    correctAnswer: 3,
    explanation:
      "MWC documents non-notifiable additions or alterations to existing circuits. It is the entry-level BS 7671 certificate and applies in dwellings and in commercial premises. Anything that creates a new circuit or replaces a CU triggers an EIC, not an MWC.",
  },
  {
    id: 4,
    question: 'The Future Homes Standard (England, 2025+) drives which electrical design changes in new dwellings?',
    options: [
      'Heat-pump-ready electrical infrastructure (typically a 16-32 A radial spare way), EV charging provision (Approved Document S), PV and battery enabling (capped cables, suitably sized supply), and zero gas connections from 2025 in many new builds.',
      'Because in a broken-PEN fault on PME, the entire installation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s neutral return current can flow back to ground via the bonding to extraneous-conductive-parts (gas, water, structural steel). Sizing against the PEN ensures the bonding conductor doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t melt before it is reset.',
      'Behave professionally, maintain confidentiality about internal matters, never criticise colleagues or competitors, only promise what the firm can deliver and refer complex issues to the right person rather than guess. You\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s public face on every call.',
      'It continuously monitors the insulation resistance between the live DC conductors and earth, throughout the life of the array. A drop in insulation (a damaged cable, water in a connector) triggers an alarm or shuts down the inverter — catching insulation faults before they become DC arcing fires.',
    ],
    correctAnswer: 0,
    explanation:
      "Future Homes Standard 2025 raises the energy-efficiency floor for new dwellings. Practically: gas heating is phased out in favour of heat pumps; new dwellings need EV charging provision per Approved Document S (typically a 7 kW charger or bonded provision); PV is widely expected; battery storage provisions are increasingly common. The designer must size the supply, the CU and the cable infrastructure for these end-state loads even when only some are installed at handover.",
  },
  {
    id: 5,
    question: 'The Building Safety Act 2022 defines a higher-risk residential building (HRRB) as:',
    options: [
      'PPE shouldn’t replace a higher control like isolation — gloves are the BACKSTOP, not the plan',
      'A residential building of at least 18 m in height OR at least 7 storeys, AND containing at least 2 residential units.',
      'Yes — Local Authority enforcement officers have similar powers of entry under HASAWA s.20 for premises they enforce',
      'All employers and workers — failure to follow it can affect tribunal awards in unfair dismissal and similar claims',
    ],
    correctAnswer: 1,
    explanation:
      "HRRB definition: 18 m / 7 storeys plus at least 2 residential units. The Act introduces the Building Safety Regulator (BSR) which oversees design and construction approval gateways for HRRBs, and creates a duty-holder regime making designers and contractors directly accountable.",
  },
  {
    id: 6,
    question: 'The "golden thread" of building safety information requires:',
    options: [
      'To provide all information needed to safely operate, maintain, and modify the installation, including as-built drawings, equipment data sheets, test certificates, and maintenance schedules',
      'Carry out the EICR based on what is on site. The EICR stands on its own — measurements and inspection findings against current BS 7671 standards. Note the absence of historical documentation as an observation in the report.',
      'A digital, structured record of design decisions, materials, products and safety-critical information that is created at design stage, maintained through construction, and handed over to the Accountable Person for the lifetime of the building.',
      'An ELCB detects voltage on the earthing conductor rather than current imbalance, so the test method and acceptance criteria are different from those for current-operated RCDs',
    ],
    correctAnswer: 2,
    explanation:
      "The golden thread is the BSA 2022 mechanism for ensuring design and construction information is not lost over decades. For HRRBs it must be digital, structured, searchable, and maintained by the Accountable Person. The L3 designer contributes the design pack (Reg 132.13 documentation in BS 7671 terms) into the golden thread at design gateway approval and at handover.",
  },
  {
    id: 7,
    question: 'You are designing a CU upgrade in a dwelling. Which of the following triggers Part P notification?',
    options: [
      'Ib = P / (sqrt(3) x VL x cos φ) — three-phase line current uses sqrt(3) (1.732), line-to-line voltage VL (typically 400 V in UK LV), and power factor.',
      'SAP/SBEM calculations, EPC, commissioning certificates, and operating instructions',
      'The vertical frame that connects across the width of the tower, incorporating the rungs for climbing',
      'Replacing the consumer unit. This is one of the three notifiable categories regardless of any other work being done.',
    ],
    correctAnswer: 3,
    explanation:
      "Consumer unit replacement is always notifiable in dwellings (England). Notify via competent-person scheme self-certification or Building Control before starting. The customer’s certificate (DESC or equivalent) is an additional output beyond the EIC.",
  },
  {
    id: 8,
    question: 'For an HRRB, the Building Safety Regulator gateway approvals are:',
    options: [
      'Three gateways: Gateway 1 at planning, Gateway 2 before construction begins (full design submitted), Gateway 3 before occupation. Each must demonstrate BSR sign-off.',
      'Trait EI models measure self-perceived emotional competencies through questionnaires, while ability EI models measure actual performance on emotion-related tasks',
      'Breaking the entire task down into individual sequential steps, each describing a specific activity, the hazards present during that step, and the controls to be applied',
      'Physical dependence can develop quickly, withdrawal can be dangerous, and combining them with alcohol or opioids can be fatal',
    ],
    correctAnswer: 0,
    explanation:
      "Three gateways under the BSA 2022: Gateway 1 (planning), Gateway 2 (construction approval — design must be sufficiently detailed for the BSR to approve before any work starts), Gateway 3 (occupation approval — completed building must match the approved design and meet safety case). The L3 electrical design is part of the Gateway 2 submission for HRRBs and is signed off by the BSR.",
  },
];

const faqs = [
  {
    question: 'Do I have to be in a competent-person scheme to do notifiable work in dwellings?',
    answer:
      "No, but it is the easier route. The two options for Part P notifiable work in dwellings are: (1) join a Government-approved competent-person scheme (NICEIC, NAPIT, ELECSA, BSI, Stroma, Certsure) and self-certify the work — the scheme issues the building regulations compliance certificate (DESC) directly to the homeowner and to the local authority, or (2) submit a Building Notice or Full Plans to your local authority Building Control before starting and pay them to inspect the work. Route (1) is faster and cheaper if you do regular notifiable work; route (2) suits one-off or specialist jobs. Either way the work must comply with BS 7671 and the BS 7671 certificate (EIC or MWC) is in addition to the building regulations DESC.",
  },
  {
    question: 'Is Part P different in Wales, Scotland and Northern Ireland?',
    answer:
      "Yes. Part P (England) and Part P (Wales) are both notification regimes, but the Welsh version was retained when the English version was scaled back in 2013, so Welsh notification thresholds are stricter. Scotland operates under the Building (Scotland) Regulations and Section 3 (heating, water, drainage and electrical safety) of the Domestic Technical Handbook — different framework, similar safety floor. Northern Ireland uses the Building Regulations (Northern Ireland) and Technical Booklet C — again different framework. If you design in more than one nation, check each jurisdiction’s current regime before assuming Part P (England) applies.",
  },
  {
    question: 'How does Part L touch the electrical design beyond lighting?',
    answer:
      "Heating control (thermostats per zone, time programmes, weather compensation interfaces), heat pump readiness (electrical capacity for COP-2 to 3.5 systems running 6-12 kW peak), EV provisions (Approved Document S 2022 mandates EV charging in new dwellings and major refurbishments), PV cabling and AC isolation provisions for retrofit ease, battery cable runs from inverter to battery location, and low-carbon controls (smart meters, smart thermostats, demand-side response interfaces). Part L also drives the move away from ring finals where they are not energy-efficient (no real evidence-based benefit for modern loads) — many new designs use radials with RCBOs as the default.",
  },
  {
    question: 'What is the practical difference between the Building Safety Regulator and Building Control for me?',
    answer:
      "Building Control (your local authority or an Approved Inspector) handles dwellings, commercial fit-outs, normal new builds — the everyday work. The Building Safety Regulator (BSR, sitting inside the HSE) handles HRRBs only — they do not have jurisdiction over your typical commercial fit-out or domestic CU swap. If your project is an HRRB, every design submission, change request and handover sits with the BSR rather than Building Control. The competence floor is higher, the documentation requirements are stricter, the timelines are longer, and the BSR can stop the project at any gateway. Most L3 designers will not work on HRRBs — but if you do, you will know within five minutes of the project being mentioned.",
  },
  {
    question: 'Does the BSA 2022 affect commercial buildings at all?',
    answer:
      "Indirectly. The BSA 2022 itself focuses on HRRBs. But the golden thread principle — digital, structured, lifetime-maintained safety information — is being adopted as a best practice across many commercial sectors (hospitals, schools, large mixed-use developments) by clients, insurers and Building Control bodies. Even on a non-HRRB project, you will increasingly find clients asking for BIM-level documentation, structured handover packs and the design pack in a digital format. The L3 designer who treats the golden thread as a HRRB-only discipline misses where the rest of the industry is going.",
  },
  {
    question: 'How does the Construction (Design and Management) Regulations 2015 (CDM) interact with the L3 designer role?',
    answer:
      "CDM 2015 makes designers (including electrical designers) a specific dutyholder. The duty is to eliminate, reduce or control foreseeable risks that may arise during construction, maintenance and use of the building. Practically: think about how someone will replace the cable in 30 years (access, isolation, routing); think about working at height for the eventual maintenance lamp change; think about the load on the structure of a heavy switchgear cabinet; flag asbestos surveys before chasing into walls; flag confined spaces (loft RCBO boards). The CDM duty starts at the design stage, not at construction. On any project with a Principal Designer, you co-ordinate with them and contribute your design risk register to the pre-construction information.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1 · Subsection 3"
            title="Statutory context — Part P, Part L and BSA 2022"
            description="Building Regulations Part P (notifiable work in dwellings), Part L (energy efficiency, increasingly driving low-carbon-ready electrical infrastructure), and the Building Safety Act 2022 footprint on higher-risk residential buildings."
            tone="amber"
          />

          <TLDR
            points={[
              "BS 7671 sits below statutory law. Part P (Building Regulations, England) governs notifiable electrical work in dwellings — new circuits, CU replacements, and any work in special locations. Part L drives lighting, heating, EV and low-carbon-ready electrical design. The Building Safety Act 2022 lays a much stricter regime over HRRBs (18 m / 7 storeys plus 2 residential units).",
              "Notifiable work in dwellings (England) is self-certified via a competent-person scheme (NICEIC, NAPIT, ELECSA) or formally notified to Building Control before starting. Either route, BS 7671 compliance plus the EIC or MWC is required.",
              "On HRRBs, the L3 designer contributes to the golden thread of digital, structured, lifetime-maintained safety information. Three Gateway approvals (planning, construction, occupation) gate the project, each needing BSR sign-off. The competence floor is HNC/HND minimum, often a degree.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the three categories of notifiable work in dwellings under Part P (England) and the two routes for compliance (competent-person scheme self-certification or Building Control notification).',
              'Explain the practical effect of Part L on lighting, heating control, EV and low-carbon-ready electrical design in new and refurbished dwellings.',
              'Recognise the scope of the Building Safety Act 2022 — the HRRB definition, the Building Safety Regulator role, and the three Gateway approval points.',
              'Describe the golden thread of building safety information and how the L3 designer’s design pack contributes to it.',
              'Apply the CDM 2015 designer duties — eliminate, reduce or control foreseeable risks at design stage rather than push them down the line.',
              'Distinguish Part P (England) from the equivalent regimes in Wales, Scotland and Northern Ireland.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Building Regulations — the statutory floor"
            plainEnglish="BS 7671 is what good electrical work looks like. The Building Regulations are what the law requires. The two are coordinated but not identical."
            onSite="When the customer asks why something has to be done, the answer is usually a mix of BS 7671 (technical safety) and Building Regulations (legal compliance). Both must be on your file."
          >
            <p>
              The Building Regulations 2010 (England) are statutory instruments enforced by Building Control. They divide construction into Approved Documents A through to S:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part A</strong> — Structure (loads on structure from your switchgear, cable trays, transformer pads).</li>
              <li><strong>Part B</strong> — Fire safety (escape routes, fire alarm interfaces, segregation of safety services, cable selection on escape routes).</li>
              <li><strong>Part L</strong> — Conservation of fuel and power (lighting efficacy, heating control, low-carbon-ready provisions).</li>
              <li><strong>Part M</strong> — Access to and use of buildings (socket and switch heights, accessibility provisions).</li>
              <li><strong>Part P</strong> — Electrical safety (dwellings only, England).</li>
              <li><strong>Part S</strong> — Infrastructure for charging electric vehicles (new dwellings and major refurbishment, since 2022).</li>
            </ul>
            <p>
              The L3 electrical designer touches Part B, Part L, Part M, Part P and Part S as routine. Part A and other parts come into play on larger projects. Each Approved Document is government guidance on how to comply with the statutory instrument; following the Approved Document is one accepted way of meeting the law, but not the only way (you can argue equivalence, with evidence).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 — Schedule 1, Part P (England)"
            clause="Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury."
            meaning={
              <>
                Part P is a single short statutory paragraph. The detail of what counts as "reasonable provision" is in Approved Document P, which references BS 7671 as the recognised technical means. Compliance with BS 7671 is therefore the recognised route to compliance with Part P. Notifiable work additionally requires the Building Regulations compliance certificate (DESC) to be issued to the homeowner and the local authority — this is separate from the EIC or MWC, which is the BS 7671 certificate.
              </>
            }
            cite="Source: Building Regulations 2010, Schedule 1, Part P. Approved Document P (April 2013, last amended 2024)."
          />

          <SectionRule />

          <ContentEyebrow>Part P — notifiable work in dwellings</ContentEyebrow>

          <ConceptBlock
            title="Three categories of notifiable work"
            plainEnglish="New circuit. Consumer unit replacement. Anything in a special location. Three categories — anything else is non-notifiable but still needs an MWC."
          >
            <p>
              Approved Document P (England, since the 2013 deregulation) names three categories of notifiable work in dwellings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Installation of a new circuit</strong> — including a new ring final, a new radial, a new EV-charge circuit, a new PV-export circuit, a new shower or cooker circuit.</li>
              <li><strong>Replacement of a consumer unit</strong> — full board change, regardless of whether circuits are added or moved.</li>
              <li><strong>Any addition or alteration to existing circuits in a special location</strong> — bathroom zones 0, 1, 2 (BS 7671 Section 701); swimming pools (Section 702); saunas (Section 703).</li>
            </ul>
            <p>
              All other work (replacing accessories, replacing a damaged section of cable, fault-finding) is non-notifiable. Non-notifiable work still requires BS 7671 compliance and a Minor Works Certificate; what it does not require is Building Regulations notification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Two routes to notification"
            plainEnglish="Self-certify through your scheme membership, or notify Building Control before starting. Pick one — never both, and never neither."
            onSite="Most professional electricians self-certify via NICEIC, NAPIT or ELECSA. The competent-person scheme route is faster, cheaper, and integrates with your existing certification workflow."
          >
            <p>
              <strong>Route 1 — Self-certification via competent-person scheme.</strong> You join a Government-approved scheme (NICEIC Domestic Installer, NAPIT, ELECSA, BSI, Stroma, Certsure). When you do notifiable work you upload the certificate within 30 days, the scheme issues the DESC (Domestic Electrical Installation Certificate or equivalent) to the homeowner and to the local authority on your behalf. Single-step, fully documented, defensible.
            </p>
            <p>
              <strong>Route 2 — Building Control notification.</strong> You submit a Building Notice or Full Plans application to the local authority before starting. They charge a fee (typically £200-500), inspect the work, and issue the building regulations completion certificate at handover. Slower, more expensive, but the only route if you are not in a scheme.
            </p>
            <p>
              On large projects, the Principal Contractor or the developer often holds the scheme membership and issues the certificate; you produce the BS 7671 EIC and supply it to them. On small jobs you usually hold both.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Part L — energy efficiency drives the design</ContentEyebrow>

          <ConceptBlock
            title="Part L — what the energy regulations actually ask of you"
            plainEnglish="Light efficiently. Control the heating well. Make the dwelling EV-ready, PV-ready and heat-pump-ready. Lower carbon, lower bills."
          >
            <p>
              Approved Document L (Conservation of fuel and power, 2021 edition with 2022 amendments) sets the energy efficiency floor for new and refurbished buildings. The L3 electrical designer contributions are:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting</strong> — minimum luminaire efficacy (lumens per circuit-watt floors), use of LED, controls (occupancy sensing in WCs and corridors, daylight dimming in classrooms and offices). Lux level targets per CIBSE LG07 and similar.</li>
              <li><strong>Heating control</strong> — thermostat per zone, programmable time controls, separate hot-water control. The electrical interface to wet underfloor heating, panel radiators, immersion heaters and heat pumps.</li>
              <li><strong>Electric vehicle charging</strong> — Approved Document S (separate from Part L but co-requisite) requires every new dwelling to have an EV charging point, every dwelling created from material change of use to have one, and dwellings undergoing major refurbishment to be assessed.</li>
              <li><strong>Low-carbon-ready provisions</strong> — capped cables to PV roof location, AC isolator position, battery cable from inverter to battery location, heat-pump-ready 16-32 A radial spare way, smart meter cabling and data allowance.</li>
              <li><strong>Future Homes Standard 2025</strong> — phases out new gas connections, requires heat pumps as default heating in new dwellings, raises efficiency targets further.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document S (Building Regulations) — Infrastructure for the charging of electric vehicles"
            clause="A new dwelling with associated parking shall be provided with an electric vehicle charging point. The charging point shall comply with the requirements set out in this Approved Document. Further provisions apply to non-residential buildings, mixed-use buildings and buildings undergoing material change of use or major refurbishment."
            meaning={
              <>
                Approved Document S (effective June 2022) makes EV provisions a statutory floor. For new dwellings with a parking space: one charging point. For non-residential buildings: charging points scaled to the number of parking spaces. For buildings under major refurbishment: assessment and provision where reasonable. The L3 designer must size the supply, the consumer unit and the cable infrastructure for at least one EV-ready outlet, and demonstrate compliance through the design pack.
              </>
            }
            cite="Source: Building Regulations 2010 — Approved Document S (June 2022, as amended). Read alongside BS 7671 Section 722 (EV) and Section 411 (PME considerations)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building Safety Act 2022 — the new HRRB regime</ContentEyebrow>

          <ConceptBlock
            title="The Building Safety Act 2022 — what changed and why"
            plainEnglish="After Grenfell, the Government created a stricter regime for tall residential buildings. Higher competence floor, three approval gateways, golden thread of safety information for the building lifetime, named accountable persons."
            onSite="If your project is 18 m or 7 storeys plus 2 residential units, BSA 2022 applies. Below that threshold the regime does not apply, but the principles (competence, golden thread, design accountability) are spreading across the industry as best practice."
          >
            <p>
              The Building Safety Act 2022 implements the Hackitt Review recommendations following the Grenfell Tower fire. The Act introduces:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>The Building Safety Regulator (BSR)</strong> — a new statutory body, sitting inside the Health and Safety Executive, with jurisdiction over HRRBs.</li>
              <li><strong>Three Gateway approvals</strong> for HRRB construction: Gateway 1 at planning permission stage; Gateway 2 before construction work begins (full design approval); Gateway 3 before occupation.</li>
              <li><strong>Dutyholder regime</strong> mirroring CDM 2015 — Client, Principal Designer, Principal Contractor and Designer (you) each have explicit duties for safety in design and construction.</li>
              <li><strong>The golden thread</strong> — a digital, structured record of design and safety-critical information that must be created, maintained and handed over for the lifetime of the building.</li>
              <li><strong>Competence requirements</strong> — designers and contractors must demonstrate competence appropriate to the work. For electrical design on HRRBs the floor is HNC/HND minimum, often a degree, plus structured CPD and scheme membership.</li>
              <li><strong>Accountable Person</strong> — once occupied, a named entity (usually the building owner or freeholder) is responsible for fire and structural safety of the building in occupation, and must register the building with the BSR.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 — Section 65 (Higher-risk building)"
            clause="In this Part 'higher-risk building' means a building in England that (a) is at least 18 metres in height or has at least 7 storeys, and (b) contains at least 2 residential units."
            meaning={
              <>
                The HRRB definition is bright-line: 18 m / 7 storeys plus 2 residential units. Below the threshold the Act does not apply. Above it the entire dutyholder, gateway and golden-thread regime applies. Care homes and hospitals were brought into the regime under separate sections of the Act for the in-occupation safety regime, even though the design gateways apply principally to residential. If you are designing on a building near the threshold, get the height and storey count confirmed in writing — the threshold is calculated from the lowest external ground level to the floor of the topmost storey.
              </>
            }
            cite="Source: Building Safety Act 2022, Section 65 and Schedule 5. See also the Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="The golden thread — and how the L3 designer contributes"
            plainEnglish="A digital file of every design decision, material spec, calculation and risk register, kept updated for the building lifetime. You feed your design pack into it; the Accountable Person maintains it after handover."
          >
            <p>
              The golden thread is the BSA 2022 mechanism for ensuring safety-critical information survives the decades after construction. For HRRBs the golden thread must be:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Digital</strong> — searchable, version-controlled, accessible to dutyholders and the BSR.</li>
              <li><strong>Structured</strong> — typically using BIM (Building Information Modelling) at LOD 350 or higher for HRRBs.</li>
              <li><strong>Comprehensive</strong> — every design decision, material spec, manufacturer information, calculation, change request, risk register entry.</li>
              <li><strong>Maintained</strong> — updated through construction, at every alteration and at every periodic safety case review.</li>
              <li><strong>Handed over</strong> — at Gateway 3 to the Accountable Person, who becomes responsible for keeping it current for the building lifetime.</li>
            </ul>
            <p>
              The L3 electrical designer’s contribution is the design pack (Reg 132.13 documentation in BS 7671 terms) plus structured risk register entries, BIM model exports of cable routes and DB locations, and detailed calculations of EFLI, voltage drop and discrimination. On a typical HRRB this is delivered as a structured digital package that integrates with the architect’s and structural engineer’s submissions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="CDM 2015 — the designer dutyholder regime"
            plainEnglish="The Construction (Design and Management) Regulations 2015 make the designer (you) a named dutyholder. Eliminate, reduce or control foreseeable risks at design stage rather than push them down the line."
            onSite="On any project with five or more workers on site at any one time, or where the work is notifiable to HSE, CDM applies in full. On smaller jobs the designer duty still applies — proportionate, but real."
          >
            <p>
              CDM 2015 sets out duties for clients, principal designers, principal contractors,
              designers and contractors. The designer’s duties (Reg 9) include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Eliminate foreseeable risks</strong> at design stage — for example, route
                cables to avoid future high-level luminaire changes; locate the consumer unit in a
                non-bathroom utility space rather than on a bathroom wall; specify accessories at
                accessible heights so the future maintainer is not working at height for routine
                replacement.
              </li>
              <li>
                <strong>Reduce remaining risks</strong> — where elimination is not possible, design
                in mitigation: dual isolation paths, surface routing for ease of replacement,
                spare-way capacity for future loads.
              </li>
              <li>
                <strong>Control residual risks</strong> — flag in the design pack and the Health
                and Safety File: confined-space access for loft RCBO boards, asbestos surveys
                before chasing into pre-2000 plaster, working-at-height schedules for plant rooms.
              </li>
              <li>
                <strong>Co-operate with the Principal Designer</strong> on multi-discipline projects
                — your design risk register feeds into the pre-construction information.
              </li>
              <li>
                <strong>Provide design information to the client and Principal Contractor</strong>
                in a form they can act on — drawings, schedules, calcs, and the residual risks the
                build team must manage.
              </li>
            </ul>
            <p>
              Practical CDM discipline at L3 design level: a one- or two-page design risk register
              on every job (hazard, design action, residual risk, who owns it), updated as the
              design evolves and handed over with the EIC. Most L3 designers under-document this —
              and find out the importance the first time something goes wrong on a job they
              designed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Devolved differences — Wales, Scotland and Northern Ireland"
            plainEnglish="Part P (England) is one route. Wales kept the stricter pre-2013 version. Scotland and Northern Ireland have separate regulatory frameworks. Designers who work across borders must know which applies."
            onSite="Always confirm which jurisdiction the property sits in — postcode alone is not enough at the Welsh and Scottish borders. The compliance certificate format differs in each."
          >
            <p>
              The four UK nations have separate building regulation frameworks, and the electrical
              compliance regimes differ:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>England</strong> — Building Regulations 2010, Part P (dwellings). Three
                notifiable categories (new circuit, CU replacement, special location). Two routes:
                competent-person scheme self-certification or Building Control. Compliance
                certificate = DESC (or scheme equivalent).
              </li>
              <li>
                <strong>Wales</strong> — Building Regulations 2010 (England and Wales) but Welsh
                Government retained the stricter pre-2013 Part P notification regime when England
                deregulated. More categories of work are notifiable. NICEIC, NAPIT, ELECSA all
                operate Welsh schemes.
              </li>
              <li>
                <strong>Scotland</strong> — Building (Scotland) Regulations 2004 (as amended).
                Section 3 of the Domestic Technical Handbook covers electrical safety. Different
                certification format (Building Standards completion certificate plus BS 7671
                certificate). SELECT is the Scottish equivalent of the competent-person scheme,
                with statutory recognition under the Building (Scotland) Act 2003.
              </li>
              <li>
                <strong>Northern Ireland</strong> — Building Regulations (Northern Ireland) 2012.
                Technical Booklet C covers electrical. Different framework again, with Building
                Control NI as the regulatory body.
              </li>
            </ul>
            <p>
              For designers who work across borders (cross-border Wales/England, or any work in
              Scotland or NI), check the current jurisdiction-specific guidance before assuming the
              English notification regime applies. The BS 7671 technical floor is consistent across
              all four nations — only the statutory wrapper differs.
            </p>
          </ConceptBlock>

          <Scenario
            title="Domestic CU upgrade — Part P notification in practice"
            situation={
              <>
                You have been engaged to replace a 60 A consumer unit in a typical 1990s three-bed semi with a 100 A 14-way RCBO board. The customer also wants two new circuits added: a 32 A radial for a planned EV charger and a 16 A radial for a planned heat pump. You hold NICEIC Domestic Installer scheme membership.
              </>
            }
            whatToDo={
              <>
                Three notifiable triggers fire: CU replacement, new EV circuit, new heat pump circuit. You self-certify all three under your NICEIC scheme membership. Your workflow: design and survey first, including the supply check (does the existing 100 A service have headroom for the new loads? — Reg 311 with diversity), order materials, install over 1-2 days, complete the EIC at handover, upload the EIC and the notification to NICEIC within 30 days, NICEIC issues the DESC to the homeowner and to the local authority. The customer receives: the EIC (BS 7671), the schedule of test results, the schedule of inspections, and the DESC (Building Regulations). Keep your master copy on file for the design life — Reg 132.13 plus the scheme rules.
              </>
            }
            whyItMatters={
              <>
                A non-notified CU change is technically a Building Regulations breach even if the work is technically perfect. The homeowner finds out at the next sale, when the conveyancing solicitor asks for the DESC and finds none on file. The local authority can demand the work be inspected after-the-fact (at the homeowner’s expense, often £600+), and if the inspector finds anything non-compliant the homeowner has a real complaint against you. Notification is paperwork, not technical work, and skipping it is a sign of a designer who has not taken statutory compliance seriously.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Doing notifiable work without notification"
            whatHappens={
              <>
                The electrician installs a new ring final or replaces a CU in a dwelling and never notifies. Years later the homeowner sells the property and the conveyancing solicitor asks for the DESC. There is none. The local authority is approached for a regularisation certificate (cost: typically £400-600), the work is inspected, and any non-compliance has to be remediated at the original installer’s expense. The homeowner has a real grievance, and the original electrician’s reputation takes a hit.
              </>
            }
            doInstead={
              <>
                Notify every notifiable job. Self-certify through your competent-person scheme — it is a 5-minute upload and the scheme handles the homeowner certificate and the local authority filing. If you are not in a scheme, submit a Building Notice to the local authority before starting. Keep a tracker of every notifiable job you have done so you can prove compliance years later if asked.
              </>
            }
          />

          <CommonMistake
            title="Treating BSA 2022 as a tall-buildings-only problem"
            whatHappens={
              <>
                A designer assumes the Building Safety Act 2022 is irrelevant to their typical commercial fit-out work. They never adopt the golden thread principles, never structure their design pack for digital handover, never update their CDM risk register beyond the bare minimum. Then a major client (a school district, a hospital trust, a developer) asks for a BIM-level design pack with structured risk register and digital handover, and the designer cannot produce one.
              </>
            }
            doInstead={
              <>
                Adopt the golden thread principles as a baseline for all your design work, even non-HRRB. Structure your design pack digitally; maintain a real risk register with version control; produce drawings in a format that integrates with BIM; keep records of every design change with the rationale. The industry is moving this way regardless of HRRB status, and the designers who get there first win the higher-margin work.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 is the technical standard; the Building Regulations are statutory law. Both apply to most dwellings work in England, with separate certificates: EIC or MWC (BS 7671) plus DESC (Building Regulations) for notifiable work.",
              "Three categories of notifiable work in dwellings (England, Part P): new circuit, CU replacement, and any addition or alteration in a special location (bathroom zones, pool, sauna).",
              "Two routes to notification: self-certify via a competent-person scheme (NICEIC, NAPIT, ELECSA — single-step, fast, integrated) or notify Building Control before starting (slower, more expensive).",
              "Part L drives lighting efficacy, heating control, EV provision (with Approved Document S), PV and battery readiness, and heat-pump-ready electrical infrastructure. Future Homes Standard 2025 raises the floor further.",
              "The Building Safety Act 2022 introduces a stricter regime over higher-risk residential buildings (18 m or 7 storeys plus 2 residential units) — Building Safety Regulator, three Gateway approvals, dutyholder regime, golden thread, named Accountable Person.",
              "Designers and contractors on HRRBs must demonstrate competence appropriate to the work — typically HNC/HND minimum for electrical design, often a degree, plus structured CPD and scheme membership.",
              "The golden thread is digital, structured, comprehensive, maintained and handed over to the Accountable Person at Gateway 3. The L3 designer contributes the design pack (Reg 132.13 documentation), BIM model exports, calculations and risk register.",
              "CDM 2015 makes designers a specific dutyholder. Eliminate, reduce or control foreseeable risks at design stage — for construction, maintenance and use of the building over its lifetime.",
            ]}
          />

          <Quiz title="Statutory context — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 BS 7671 Parts 1, 2 and 3
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Equality Act + accessibility
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
