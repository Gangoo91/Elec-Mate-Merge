import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m5s5-class-headroom',
    question:
      'A 2026 office fit-out is expected to be occupied for 15-20 years. Which Class / Category gives appropriate headroom for the foreseeable services without being over-specified?',
    options: [
      'Cat 5e — cheap and "good enough for now", but below the §716 new-build default.',
      'Cat 6 — the historic mid-grade default, now mainly a transitional retrofit grade.',
      'Cat 6A / Class EA — 10GBASE-T to 100 m and Type 4 PoE++ with bundle management.',
      'Cat 8.2 — the highest grade currently available, taken as the safest future choice.',
    ],
    correctIndex: 2,
    explanation:
      'Cat 6A / Class EA is the right service-independence default for a 2026 commercial fit-out with a 15-20 year occupation horizon. It absorbs 10GBASE-T (the 2006 service), 25GBASE-T short-reach where used, Type 1-4 PoE under §716, IP voice, IP video, building automation, security, sensors. Cat 5e cannot deliver 10G at 100 m and is below the §716.521.101 list practical default. Cat 6 is a transitional grade — fine for retrofits but not the new-build default. Cat 7 / 7A are ISO-only, no TIA equivalent, and rarely warranted commercially. Cat 8.1 / 8.2 are 30 m short-reach data-centre top-of-rack only. Specifying the highest grade does not make the building more service-independent — it just costs more and leaves no real headroom that Cat 6A did not already provide for general office services.',
  },
  {
    id: 'datacabling-m5s5-outlet-density',
    question:
      'A new office floor of 600 m² is being designed. The architect proposes 1 outlet per 4 m² (150 outlets total) for laptops and IP phones. The cabling designer recommends doubling that. Why?',
    options: [
      'To let the contractor invoice for more outlets than the floor actually requires.',
      'Future PoE services — APs, lighting, cameras, sensors — multiply the outlet count.',
      'To keep the outlet pattern visually symmetrical across the whole floor plate.',
      'Because BS 7671 sets a minimum mandatory outlet density per square metre of floor.',
    ],
    correctIndex: 1,
    explanation:
      'Outlet density is one of the dominant service-independence levers, and it is the cheapest to set generously at first fit. A laptop-and-phone density of 1 outlet per 4 m² is fine for a 2010 office; a 2026 PoE-everything build needs outlets for ceiling APs (1 per 25-50 m² for high-density wireless), ceiling lighting fixtures (often direct-fed PoE with one cable per fixture), ceiling sensors, ceiling cameras, access-control devices at every door, plus the laptops and phones below. Doubling the first-fit count from 150 to 300 outlets is small money during the cable pull (the cable, the keystones, the patch panel ports — all cheap relative to the labour of pulling cable into an occupied office). Re-cabling three years later costs 5-10x as much because access, labour, and disruption are all worse.',
  },
  {
    id: 'datacabling-m5s5-pathway-capacity',
    question:
      'The same office plan: containment is sized for the original 150 outlets at typical Cat 6A bundle density. The cabling designer wants to upsize the containment to support a doubled cable count plus future fibre-to-the-edge. What is the rationale?',
    options: [
      'To make the containment runs look more substantial on the design drawings.',
      'Re-cabling cost is dominated by access, so sizing for 2x-3x headroom saves future pulls.',
      'To satisfy the LV-to-data segregation distances required under §444.6.2.',
      'To provide thermal-management headroom for LV power circuits sharing the route.',
    ],
    correctIndex: 1,
    explanation:
      'Pathway capacity — containment, conduit, trunking, ceiling void allocation — is the second cheap lever for service-independence. The cable cost is small; the labour to re-pull cable through inadequate containment in an occupied building is huge. Sizing pathways for 2x-3x current cable count adds a small fraction to the construction budget and unlocks every future service (fibre to the edge, doubled outlet count, denser PoE bundles per §716 thermal requirements) without re-cutting the building. BS EN 50174-2 and TIA-569-E both recommend specifying pathway fill below 40-50 % at first fit, leaving capacity for additions. Outlet density and pathway capacity are the two cheap service-independence levers; both are decided once at construction.',
  },
  {
    id: 'datacabling-m5s5-fibre-to-the-edge',
    question:
      'A high-density-wireless office with 50 ceiling APs is being designed. Each AP requires Type 4 PoE++ and 10GBASE-T uplink. The designer adds single-mode fibre to each AP location alongside Cat 6A. Why both?',
    options: [
      'To let the designer specify a higher-margin fibre product on the job package.',
      'Cat 6A serves the AP today; dormant fibre alongside is the cheap-now upgrade path.',
      'Purely to provide a redundant second physical link to each ceiling access point.',
      'Because Cat 6A is being phased out and fibre will soon be the only viable option.',
    ],
    correctIndex: 1,
    explanation:
      'Fibre-to-the-edge alongside Cat 6A is a forward-looking service-insurance pattern for high-density wireless and other bandwidth-emerging services. The Cat 6A delivers Type 4 PoE under §716 and 10GBASE-T (2006 service) — what the AP needs today. The single-mode fibre alongside (typically 2-strand or 4-strand OS2 LC duplex per outlet) is dormant today and ready for the 25/40/100 GBASE services of the 2030s. The marginal cost at first fit is small (the labour of pulling fibre alongside copper is small compared with copper-only labour); the cost of adding fibre later is huge (pull, splice, terminate, certify in an occupied building). For high-density APs in stadium / convention / large lecture / broadcast / data-centre adjacent areas, fibre-to-the-edge is the right service-independence pattern.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the central pitch of "service-independence" as a structured-cabling design principle?',
    options: [
      'Using one cable type and one outlet style for every conceivable service in the building.',
      'Keeping the cabling passive by deliberately avoiding all active equipment in the design.',
      'Specifying Class, outlet density and pathway headroom once so it lasts 15-20 years.',
      'Choosing the cheapest cable and lowest outlet count that meets today’s data demand.',
    ],
    correctAnswer: 2,
    explanation:
      'Service-independence is the central economic argument for structured cabling. The discipline that delivers it is specification: pick a Class (Cat 6A / Class EA is the 2026 default), pick an outlet density that absorbs PoE-everything growth, pick a pathway capacity that supports cable doubling and fibre-to-the-edge additions, document the design as service-independent. Done well, the cabling outlives 3-4 generations of switches, IP phones, cameras, lighting controllers, and PoE devices. Done badly, the building gets re-cabled at every refresh.',
  },
  {
    id: 2,
    question:
      'For a 2026 commercial office fit-out with a 15-20 year occupation horizon, what is the practical default Class / Category?',
    options: [
      'Cat 6A / Class EA — 10GBASE-T to 100 m, with Type 4 PoE++ bundle management.',
      'Cat 5e, which is treated as adequate for a long 15-20 year occupation horizon.',
      'Cat 8.2 run to every single outlet for the maximum possible future-proofing.',
      'Coaxial cable throughout the building for a single unified service medium.',
    ],
    correctAnswer: 0,
    explanation:
      'Cat 6A is the right answer for a typical 2026 commercial office. It is the lowest grade in the §716.521.101 list that delivers 10GBASE-T to 100 m without compromise; it supports Type 4 PoE++ thermally with proper bundle management; it has headroom for the emerging services of the 2030s; it is cheap relative to the labour of installation. Cat 7 / 7A are ISO-only with no TIA equivalent for Cat 7 — niche. Cat 8.1 / 8.2 are 30 m short-reach data-centre top-of-rack only — wrong tool for a general office. Cat 6 is a transitional retrofit grade. Cat 5e is below the practical §716 default for new builds.',
  },
  {
    id: 3,
    question:
      'Which two BS 7671 sections are entirely new in BS 7671:2018+A4:2026 and bring data cabling concerns formally inside the wiring regulations?',
    options: [
      '§411 (automatic disconnection) and §421 (protection against fire).',
      '§528 (proximity of services to one another) and §444 (EMC requirements).',
      '§543 (protective conductors) and §544 (protective bonding conductors).',
      '§716 (PoE / ELV DC over balanced cabling) and §545 (ICT functional earthing).',
    ],
    correctAnswer: 3,
    explanation:
      '§716 and §545 are the two entirely new sections in BS 7671:2018+A4:2026 that affect data cabling. §716 covers PoE and ELV DC distribution over balanced ICT cabling — the 750 mA per conductor cap, SELV/PELV mandate, special-location restrictions, cable category list, and bundle-thermal references. §545 covers ICT functional earthing — distinguishing functional earthing of ICT equipment (signal reference, EMC) from protective earthing under §543/544 (electrical safety), and introducing the MFET (main functional earthing terminal) concept. Existing §444 (EMC), §528 (proximity), §521.10.202 (cables in escape routes) are still relevant, but §716 and §545 are the brand-new additions.',
  },
  {
    id: 4,
    question:
      'Why is "outlet density" listed alongside "Class headroom" as a primary service-independence lever?',
    options: [
      'Because more outlets simply look tidier and more symmetrical on the floor plan.',
      'Because PoE services — APs, lighting, cameras, sensors — multiply the outlet count.',
      'Because BS 7671 sets a minimum mandatory outlet density per room in the building.',
      'Because outlet density directly determines the cable Category that can be used.',
    ],
    correctAnswer: 1,
    explanation:
      'Outlet density is one of the dominant service-independence levers and the cheapest to set generously at first fit. A typical 2026 PoE-everything build needs ceiling outlets for high-density APs (1 per 25-50 m²), ceiling lighting fixtures (often direct-fed PoE), ceiling sensors, ceiling cameras, access-control devices at every door — multiplying the outlet count well beyond just laptops + phones below. Doubling the first-fit count is small money during the cable pull, when access is easiest. Re-cabling three years later costs 5-10x as much.',
  },
  {
    id: 5,
    question: 'What is the role of "pathway capacity" in service-independence design?',
    options: [
      'It governs only the visual appearance of the installed containment runs.',
      'It exists purely to segregate the LV power cabling from the data cabling.',
      'Containment sized for 2x-3x headroom lets future pulls happen without re-cutting.',
      'It determines the maximum permitted channel length for each cabling run.',
    ],
    correctAnswer: 2,
    explanation:
      'Pathway capacity is the second cheap service-independence lever, alongside outlet density. The cable cost is small; the labour to re-pull cable through inadequate containment in an occupied building is huge. Sizing pathways for 2x-3x current cable count adds a small fraction to the construction budget and unlocks every future service without re-cutting the building. BS EN 50174-2 and TIA-569-E both recommend specifying pathway fill below 40-50 % at first fit — leaving capacity for additions. The combination of outlet density + pathway capacity is decided once at construction and lasts for the cabling life.',
  },
  {
    id: 6,
    question:
      'A specification adds single-mode fibre alongside Cat 6A to high-density AP outlet locations. What is the design rationale?',
    options: [
      'Service insurance — Cat 6A serves the AP today; dormant fibre is ready for later GBASE.',
      'It is required solely to provide a redundant link to each ceiling access point.',
      'It is mandated by BS 7671 for all access-point outlets in commercial builds.',
      'It replaces the need for any copper cabling at all to those AP outlet locations.',
    ],
    correctAnswer: 0,
    explanation:
      'Fibre-to-the-edge alongside Cat 6A is a forward-looking pattern for high-bandwidth-emerging service density — high-density wireless, broadcast, lecture-theatre AV, data-centre-adjacent zones. The Cat 6A handles today; the fibre handles tomorrow. The marginal first-fit cost of adding fibre alongside copper is small; the future-fit cost of adding fibre to an occupied building is huge. Specify it where service density justifies it — not blanket across every outlet, but at the high-density and broadcast / high-bandwidth zones.',
  },
  {
    id: 7,
    question:
      'How does BS 7671:2018+A4:2026 §716 change the design constraints for a new commercial PoE-everything build?',
    options: [
      'It makes no difference to a PoE-everything design, governed only by IEEE 802.3.',
      'It mandates a dedicated single-mode fibre run to every outlet across the building.',
      'It bans Cat 6A for PoE applications, requiring Cat 8 for any powered cable run.',
      'It adds the 750 mA cap, SELV/PELV rules, a category list and location restrictions.',
    ],
    correctAnswer: 3,
    explanation:
      '§716 does not invent new design rules out of nothing — it formally regulates what was already best practice in PoE installations and adds hard regulatory caps that bound the design. The 750 mA per conductor cap was always implicit in the IEEE 802.3 PoE current limits and TIA TSB-184-A bundle-thermal guidance; A4:2026 makes it explicitly regulatory in the UK. The SELV/PELV mandate, the cable category list, and the special-location restrictions formalise what competent contractors already did. The change for the contractor is that compliance is now BS 7671 evidence, not just industry best practice.',
  },
  {
    id: 8,
    question:
      'What new BS 7671:2018+A4:2026 section governs ICT functional earthing — and how does it differ from protective earthing?',
    options: [
      'No BS 7671 section governs ICT functional earthing; it falls outside the regulations.',
      '§545 (new in A4:2026) — ICT signal-reference earthing, distinct from §543/544 protective.',
      '§444 (EMC) covers ICT functional earthing in full, with no separate dedicated section.',
      '§528 (proximity of services) covers ICT functional earthing alongside segregation.',
    ],
    correctAnswer: 1,
    explanation:
      '§545 is entirely new in BS 7671:2018+A4:2026. It governs functional earthing — the earth reference used by ICT equipment for signal stability, EMC mitigation, and the bonding network for ICT installations. This is a different concept from protective earthing under §543/544, which is the fault-current path for electrical safety. §545.1.2 sets the minimum CSAs (2.5 mm² Cu with mechanical protection, 4 mm² Cu without — or as required by BS EN 50310). §545.2 introduces the MFET (main functional earthing terminal). The §545 framework couples directly to BS EN 50310 (telecommunications bonding networks) and to the cable-screen functional-earth references in §716.414.1.1 NOTE 2.',
  },
  {
    id: 9,
    question:
      'Why is a service-independent specification described as "decided at design stage" rather than "delivered at install stage"?',
    options: [
      'Because installers always work faster on site than designers do at the desk.',
      'Because BS 7671 requires the cabling design to be formally signed off first.',
      'Because the levers are all fixed before the first cable is pulled; install cannot rescue it.',
      'Because design-stage drawings are far easier to amend than installed cable.',
    ],
    correctAnswer: 2,
    explanation:
      'Service-independence is a SPECIFICATION discipline, not an install discipline. The Class, the outlet density, the pathway capacity, the fibre-to-the-edge pattern, the PoE thermal headroom — all are decided at design stage and committed at the first cable pull. The install stage executes the spec to certifiable Class. A service-independent spec executed badly delivers a six-month channel; a service-independent spec executed well delivers a 15-20 year channel. But a NON-service-independent spec executed perfectly still strands the building when the PoE rollout starts. The art is in the spec.',
  },
  {
    id: 10,
    question:
      'A client argues "we cannot afford service-independent cabling — just put in what we need today and we will upgrade later". What is the right response?',
    options: [
      'Show them the lifecycle TCO — first-fit premium is small, re-cabling later costs 5-10x.',
      'Agree with them, since structured cabling is genuinely over-engineering for most offices.',
      'Decline the job outright rather than install non-service-independent cabling at all.',
      'Tell them BS 7671 legally mandates fully service-independent cabling on new builds.',
    ],
    correctAnswer: 0,
    explanation:
      'Service-independence is a TCO conversation, not a compliance conversation. The first-fit cost differential between minimal Cat 5e + minimal outlets and Cat 6A + doubled outlets + generous pathways is genuinely small (labour dominates the cost; the cable / outlet / panel premium is a fraction of the project budget). The break-even on lifecycle cost crosses inside 4-5 years on most office fit-outs because re-cabling an occupied building costs 5-10x what first-fit cabling does. Backed by the service-independence story (one infrastructure, many services, 15-20 years), the case is technical and commercial, not legal. BS 7671 does not "mandate" service-independence; it regulates the LV/ELV power dimensions of the cabling (§444 EMC, §528 proximity, §716 PoE in A4:2026, §545 ICT functional earthing). The pitch is on TCO and the long-life value proposition.',
  },
];

const faqs = [
  {
    question: 'What is the right Class / Category for a 15-20 year horizon?',
    answer: (
      <>
        <strong>Cat 6A / Class EA</strong> is the 2026 commercial default. Delivers 10GBASE-T to 100
        m, supports Type 4 PoE++ thermally with proper bundle management per BS 7671 §716, has
        headroom for the emerging services of the 2030s. Cat 7 / 7A are ISO-only and niche. Cat 8.1
        / 8.2 are 30 m short-reach data-centre top-of-rack only — wrong tool for a general office.
        Cat 6 is a retrofit grade. Cat 5e is below the §716.521.101 practical default for new
        builds.
      </>
    ),
  },
  {
    question: 'How much outlet density does a PoE-everything build actually need?',
    answer: (
      <>
        Far more than just laptops + phones. A 2026 PoE-everything build typically needs ceiling
        outlets for: high-density APs (1 per 25-50 m² for office, denser for stadium / convention),
        ceiling lighting fixtures (often direct-fed PoE-LED, one cable per fixture), ceiling
        sensors, ceiling cameras, access-control devices at every door, plus the wall outlets for
        laptops and phones. Specifying 1 outlet per 4 m² (laptop density) is fine for desks;
        doubling that — including ceiling outlets at the appropriate densities for AP / lighting /
        sensor / camera / access — is the right service-independence default for the building life.
      </>
    ),
  },
  {
    question: 'Should I add fibre-to-the-edge alongside Cat 6A?',
    answer: (
      <>
        For high-density-wireless areas, broadcast / lecture / AV-heavy spaces, data-centre-adjacent
        zones, and high-bandwidth-emerging service density, yes — single-mode fibre alongside Cat 6A
        at first fit is small money and is the upgrade path for 25/40/100 GBASE services of the
        2030s. For general office and back-of-house, Cat 6A alone is the right default.
        Fibre-to-the-edge is a targeted pattern, not a blanket pattern; specify it where service
        density justifies it.
      </>
    ),
  },
  {
    question: 'What new BS 7671 sections in A4:2026 should I cite for service-independence design?',
    answer: (
      <>
        <strong>§716</strong> (PoE / ELV DC over balanced cabling — entirely new) and{' '}
        <strong>§545</strong> (ICT functional earthing — entirely new) are the two new sections that
        change the design constraints. From 15 April 2026, every PoE installation in the UK is
        regulated by §716 — including the 750 mA per conductor cap, SELV/PELV mandate,
        special-location restrictions, cable category list, and bundle-thermal references. §545
        governs the ICT functional earthing network. Existing §444 (EMC), §528 (proximity /
        segregation), §521.10.202 (cables in escape routes) remain relevant.
      </>
    ),
  },
  {
    question: 'Why is service-independence "decided at design stage" rather than at install stage?',
    answer: (
      <>
        Because the levers that determine 15-year service-independence — Class / Category, outlet
        density, pathway capacity, fibre-to-the-edge presence, PoE bundle thermal headroom — are all
        SPECIFIED before the first cable is pulled. The install stage delivers the spec to
        certifiable Class; it cannot rescue a spec that was set against today{"'"}s laptops and
        phones from absorbing tomorrow{"'"}s PoE-everything load. A service-independent spec
        executed badly delivers a six-month channel; a NON-service-independent spec executed
        perfectly still strands the building when the PoE rollout starts.
      </>
    ),
  },
  {
    question: 'What is the lifecycle TCO argument for service-independent cabling?',
    answer: (
      <>
        First-fit cost differential between minimal Cat 5e + minimal outlets and Cat 6A + doubled
        outlets + generous pathways is small (labour dominates, cable / outlet / panel premium is a
        fraction). Re-cabling cost in years two through seven is large — access labour in an
        occupied building, business disruption, lost productivity. The lifecycle cost crosses
        break-even on most office fit-outs inside 4-5 years; beyond that, service-independent
        cabling is purely cheaper. The pitch is TCO + service-independence, not BS 7671 compliance —
        BS 7671 regulates the electrical-safety dimensions, not the service-independence design.
      </>
    ),
  },
];

const DataCablingModule5Section5 = () => {
  const navigate = useNavigate();

  useSEO(
    'Future-Proofing Network Infrastructure | Data Cabling Module 5.5 | Elec-Mate',
    'Specifying for 15-20 years — Class headroom (Cat 6A / Class EA as the 2026 commercial default), outlet density for PoE-everything growth, pathway capacity for service additions, fibre-to-the-edge for emerging high-bandwidth services, and the new BS 7671:2018+A4:2026 deltas (§716 PoE, §545 ICT functional earthing) that change the design constraints from 15 April 2026.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5"
            title="Future-Proofing Network Infrastructure"
            description="Specifying cabling for 15-20 years — Class headroom (Cat 6A / Class EA as the 2026 default), outlet density for PoE-everything growth, pathway capacity for service additions, fibre-to-the-edge for high-bandwidth-emerging zones, and the new BS 7671:2018+A4:2026 deltas (§716 PoE, §545 ICT functional earthing) that change the design constraints from 15 April 2026."
            tone="yellow"
          />

          <TLDR
            points={[
              'Service-independence is decided at design stage. Pick a Class with headroom (Cat 6A / Class EA is the 2026 default), an outlet density that absorbs PoE-everything growth, and a pathway capacity that supports cable doubling and fibre-to-the-edge — all committed before the first cable is pulled.',
              'Outlet density and pathway capacity are the cheap service-independence levers. PoE-everything builds need ceiling outlets for APs, lighting fixtures, sensors, cameras, access-control — multiplying the count well beyond just laptops + phones. Containment sized for 2x-3x current count at first fit is small money during construction and saves the entire labour cost of access for any future cable pull.',
              'Fibre-to-the-edge is a targeted, not blanket, pattern. Add single-mode fibre alongside Cat 6A at high-density-wireless / broadcast / lecture / data-centre-adjacent zones. Cat 6A handles today (Type 4 PoE under §716, 10GBASE-T); fibre handles tomorrow (25/40/100 GBASE services of the 2030s).',
              'BS 7671:2018+A4:2026 changes the design constraints from 15 April 2026. §716 (PoE / ELV DC over balanced cabling) and §545 (ICT functional earthing) are entirely new sections. §716 sets the 750 mA per conductor cap, SELV/PELV mandate, cable category list, special-location restrictions. §545 sets the functional earthing network — distinct from protective earthing under §543/544.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define service-independence as a specification discipline and explain why it is "decided at design stage" rather than at install stage',
              'Pick Cat 6A / Class EA as the 2026 commercial default and justify the choice against the §716.521.101 cable category list and the foreseeable services across a 15-20 year occupation',
              'Specify outlet density that absorbs PoE-everything growth — ceiling APs, PoE-LED lighting, sensors, cameras, access-control — beyond just the laptop + phone count',
              'Specify pathway capacity (containment / conduit / trunking) at first fit that supports 2x-3x cable count and future fibre-to-the-edge additions, per BS EN 50174-2 / TIA-569-E recommendations',
              'Identify the high-density / high-bandwidth zones where fibre-to-the-edge alongside Cat 6A is the right targeted pattern',
              'Apply BS 7671:2018+A4:2026 §716 (PoE / ELV DC) and §545 (ICT functional earthing) as new design constraints from 15 April 2026',
              'Articulate the lifecycle TCO argument for service-independent cabling and answer the "we cannot afford it" objection on commercial grounds',
              'Document the specification as service-independent in the BS EN 50174-1 / TIA-606-D administration record so the next contractor on site inherits the design intent',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four service-independence levers</ContentEyebrow>

          <ConceptBlock
            title="What is decided once at design and lasts for the cabling life"
            plainEnglish="Service-independence is a specification discipline. Four levers are committed at design stage and govern whether the cabling absorbs the foreseeable services across a 15-20 year occupation: (1) Class / Category headroom — pick a performance grade with margin over today's services; (2) outlet density — number and locations of outlets, sized against PoE-everything growth not just today's laptops and phones; (3) pathway capacity — containment, conduit, trunking, ceiling void allocation, sized at first fit for 2x-3x current cable count; (4) fibre-to-the-edge presence — single-mode fibre alongside Cat 6A in high-density / high-bandwidth zones."
            onSite="On site, the contractor's job is not to invent service-independence — it is to execute a service-independent specification to certifiable Class. The art lives in the design phase: picking Cat 6A over Cat 5e (small premium), doubling the first-fit outlet count (small premium), upsizing containment by 50-100 % (small premium), adding a single-mode fibre pair to high-density-wireless zones (small premium). Each is small money individually; collectively they are the difference between a 15-year channel and a six-month channel."
          >
            <p>The four levers in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>1. Class / Category headroom.</strong> Pick a performance grade with margin
                over today{"'"}s services so emerging services slot in without re-cabling. Cat 6A /
                Class EA is the 2026 default — delivers 10GBASE-T to 100 m, supports Type 4 PoE
                under §716 with proper bundle management, headroom for emerging services. Cat 5e
                cannot deliver 10G at 100 m and is below the §716.521.101 practical default. Cat 7 /
                7A and Cat 8 are niche. Cat 6A is the right answer for general office,
                back-of-house, retail, education, healthcare general areas.
              </li>
              <li>
                <strong>2. Outlet density.</strong> Number and locations of outlets, sized against
                PoE-everything growth. A 2010-pattern density of 1 outlet per 4 m² for laptops +
                phones is half of what a 2026 PoE-everything build needs. Add ceiling outlets for
                high-density APs (1 per 25-50 m²), PoE-LED lighting fixtures (often direct-fed, one
                cable per fixture), ceiling sensors, ceiling cameras, access-control devices at
                every door. Doubling first-fit count is small money during the cable pull.
              </li>
              <li>
                <strong>3. Pathway capacity.</strong> Containment, conduit, trunking, ceiling void
                allocation. Sized at first fit for 2x-3x current cable count so future cable pulls
                can be made without breaking trunking or re-cutting the building. BS EN 50174-2 /
                TIA-569-E recommend pathway fill below 40-50 % at first fit. The cable cost is
                small; the labour cost of re-pulling in inadequate containment is huge. Pathway
                capacity is the second cheap service-independence lever.
              </li>
              <li>
                <strong>4. Fibre-to-the-edge presence.</strong> Single-mode fibre alongside Cat 6A
                in high-density-wireless / broadcast / lecture / data-centre-adjacent zones. Cat 6A
                handles today (Type 4 PoE, 10GBASE-T uplink); fibre handles tomorrow (25/40/100
                GBASE services of the 2030s). Marginal first-fit cost is small; future-fit cost in
                an occupied building is large. Targeted pattern, not blanket.
              </li>
            </ul>
            <p>
              Each lever is decided at SPEC time. The install delivers the spec to certifiable
              Class. The cabling carries the foreseeable services for 15-20 years.
            </p>
          </ConceptBlock>

          {/* Service-independence levers diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The four service-independence levers — decided at design stage
            </h4>
            <svg
              viewBox="0 0 880 660"
              className="w-full h-auto"
              role="img"
              aria-label="Horizontal bar chart comparing five copper cabling categories across two axes: bandwidth reach to 100 metres, and PoE Type capability under BS 7671 §716. Cat 5e reaches 100 MHz and supports up to Type 2 PoE at 25.5 W. Cat 6 reaches 250 MHz and supports up to Type 2. Cat 6A reaches 500 MHz and supports up to Type 4 PoE at 90 W — the 2026 default. Cat 8.1 reaches 2000 MHz at 30 metres and supports Type 4. Each bar is labelled with the category name above and the supported Ethernet speeds plus PoE Type tags below. Legend at bottom maps the bar colours to PoE Type levels."
            >
              {/* ===== Chart-axis row (above bars) — frequency scale ===== */}
              <text x="220" y="32" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                100 MHz
              </text>
              <text x="370" y="32" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                250 MHz
              </text>
              <text x="520" y="32" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                500 MHz
              </text>
              <text x="670" y="32" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                1000 MHz
              </text>
              <text x="800" y="32" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                2000 MHz
              </text>

              {/* Frequency-axis baseline + ticks */}
              <line
                x1="200"
                y1="42"
                x2="840"
                y2="42"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              {[200, 350, 500, 650, 800].map((x, i) => (
                <line
                  key={'tk-' + i}
                  x1={x}
                  y1="38"
                  x2={x}
                  y2="46"
                  stroke="rgba(255,255,255,0.30)"
                  strokeWidth="1"
                />
              ))}

              {/* ============================================== */}
              {/* BARS — one row per Category                    */}
              {/* ============================================== */}

              {/* Each row: y_label (above bar), bar, y_tags (below bar) */}
              {/* Row 1 — Cat 5e */}
              <text
                x="40"
                y="78"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 5e · Class D
              </text>
              <rect
                x="200"
                y="86"
                width="150"
                height="24"
                rx="4"
                fill="rgba(156,163,175,0.30)"
                stroke="#9CA3AF"
                strokeWidth="1.4"
              />
              <text x="60" y="132" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                1GBASE-T · 100 m
              </text>
              <text
                x="200"
                y="132"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PoE Type 1-2
              </text>
              <text x="320" y="132" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                25.5 W max
              </text>

              {/* Row 2 — Cat 6 */}
              <text
                x="40"
                y="170"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 6 · Class E
              </text>
              <rect
                x="200"
                y="178"
                width="225"
                height="24"
                rx="4"
                fill="rgba(34,211,238,0.22)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="60" y="224" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                1GBASE-T · 100 m · 10G to 55 m
              </text>
              <text
                x="260"
                y="224"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PoE Type 1-2
              </text>
              <text x="380" y="224" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                25.5 W max
              </text>

              {/* Row 3 — Cat 6A · the 2026 default */}
              <text
                x="40"
                y="262"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 6A · Class EA
              </text>
              <text
                x="160"
                y="262"
                fill="#FACC15"
                fontSize="9"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ★ 2026
              </text>
              <rect
                x="200"
                y="270"
                width="300"
                height="24"
                rx="4"
                fill="rgba(234,179,8,0.30)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text x="60" y="316" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                10GBASE-T · 100 m
              </text>
              <text
                x="220"
                y="316"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PoE Type 1-4
              </text>
              <text x="340" y="316" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                90 W max (PD ≤ 71.3 W)
              </text>

              {/* Row 4 — Cat 7A */}
              <text
                x="40"
                y="354"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 7A · Class FA
              </text>
              <rect
                x="200"
                y="362"
                width="450"
                height="24"
                rx="4"
                fill="rgba(168,85,247,0.22)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="60" y="408" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                10GBASE-T · 100 m · niche only
              </text>
              <text
                x="280"
                y="408"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PoE Type 1-4
              </text>
              <text x="400" y="408" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                No GG45 ecosystem
              </text>

              {/* Row 5 — Cat 8.1 */}
              <text
                x="40"
                y="446"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 8.1 · Class I
              </text>
              <rect
                x="200"
                y="454"
                width="600"
                height="24"
                rx="4"
                fill="rgba(34,197,94,0.22)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="60" y="500" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                25/40GBASE-T · 30 m only
              </text>
              <text
                x="240"
                y="500"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PoE Type 1-4
              </text>
              <text x="360" y="500" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                Data centre only
              </text>

              {/* ============================================== */}
              {/* LEGEND                                         */}
              {/* ============================================== */}
              <rect
                x="40"
                y="528"
                width="800"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="552"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND — bar length proportional to bandwidth (MHz)
              </text>

              {/* Column 1 */}
              <rect
                x="60"
                y="566"
                width="14"
                height="14"
                rx="3"
                fill="rgba(156,163,175,0.30)"
                stroke="#9CA3AF"
                strokeWidth="1.4"
              />
              <text x="84" y="578" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Cat 5e — legacy (do not specify new)
              </text>

              <rect
                x="60"
                y="588"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.22)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="84" y="600" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Cat 6 — bridging spec, no headroom
              </text>

              <rect
                x="60"
                y="610"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.30)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text x="84" y="622" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                <tspan fontWeight="700">Cat 6A — the 2026 commercial default</tspan>
              </text>

              {/* Column 2 */}
              <rect
                x="460"
                y="566"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.22)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="484" y="578" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Cat 7A — niche, GG45 connector limits
              </text>

              <rect
                x="460"
                y="588"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.22)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="484" y="600" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Cat 8.1 — data-centre top-of-rack only (30 m)
              </text>

              <text
                x="460"
                y="622"
                fill="#FACC15"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ★ 2026 default
              </text>
              <text x="540" y="622" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                — small premium, 15-year service life headroom
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The new BS 7671 deltas — A4:2026 changes the design</ContentEyebrow>

          <ConceptBlock
            title="What §716 and §545 add to the design constraints from 15 April 2026"
            plainEnglish="Two entirely new BS 7671 sections in A4:2026 reshape the design constraints for new commercial cabling work. §716 (PoE / ELV DC over balanced cabling) brings the cabling itself inside the wiring regulations — the cabling is now recognised as a TWO-FUNCTION asset (data medium + ELV DC distribution) and is regulated for the electrical-safety dimensions of the same job. §545 (ICT functional earthing) introduces the functional earthing framework — distinct from protective earthing under §543/544 — and the MFET (main functional earthing terminal) concept. Both are new from 15 April 2026."
            onSite="On site, the contractor's standards stack from 15 April 2026 is materially wider. BS EN 50173-1 (cabling performance) and BS EN 50174 (install practice) are unchanged in scope. BS 7671:2018+A4:2026 §716 is now the regulatory anchor for PoE thermal management, SELV/PELV mandate, cable category list, special-location restrictions, and the 750 mA per conductor / per contact caps. §545 is the regulatory anchor for ICT functional earthing — coupling to BS EN 50310. The contractor's evidence record at handover now includes BS 7671 compliance alongside cabling certification."
          >
            <p>What the two new sections add — quoted verbatim from BS 7671:2018+A4:2026:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§716 — Power over Ethernet and ELV DC distribution.</strong>{' '}
                <AmendmentBadge regs={['716']} edition="A4:2026" /> Entirely new in A4:2026.
                Recognises that balanced ICT cabling carries DC power (PoE Type 1 through Type 4 per
                IEEE 802.3bt) and is therefore also a power-distribution circuit. Hard regulatory
                caps: 750 mA per conductor (§716.523.2.101) and 750 mA per contact at the connector
                (§716.526.101). SELV/PELV mandatory (§716.410.3.3). Cable category list
                (§716.521.101): Cat 5, 6, 6A, 7, 7A, 8.1, 8.2. Special-location restrictions
                (§716.414.3.201) for §701, §702, §703, §706, §710. Bundle thermal management via
                §716.523.1.101 NOTE 2 references (PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC
                TS 29125).
              </li>
              <li>
                <strong>§545 — ICT functional earthing.</strong>{' '}
                <AmendmentBadge regs={['545']} edition="A4:2026" /> Entirely new in A4:2026.
                Distinguishes functional earthing of ICT equipment (signal reference, EMC
                mitigation, BS EN 50310 bonding network) from protective earthing under §543/544
                (electrical safety, fault-current path). Introduces the MFET (main functional
                earthing terminal) and minimum 2.5 / 4 mm² Cu CSAs for functional earthing
                conductors. Couples directly to the cable-screen functional-earth references in
                §716.414.1.1 NOTE 2.
              </li>
              <li>
                <strong>§444 — Measures against electromagnetic disturbances.</strong> Carried
                forward from earlier editions — not new in A4:2026, but directly relevant. §444.410
                cites BS EN 50174-1, BS EN 50174-2 and BS EN 50310 as the applicable standards.
                §444.6.2 sets the 130 mm minimum separation between ICT cables and HID lamps. Annex
                A444 Tables A444.1 / A444.2 give the segregation distances against containment type
                and supply current.
              </li>
              <li>
                <strong>§528 — Proximity to other circuits.</strong> Also carried forward. §528.2
                confirms that circuits of the same voltage band might still need segregation. The
                combination of §444 + §528 is the practical framework for Band I (data / ELV) vs
                Band II (LV power) separation inside containment.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §545.1.1 (ICT functional earthing — verbatim)"
            clause={
              <>
                Where the functional equipotential bonding system is not locally connected to the
                protective equipotential bonding system in accordance with Section 444, the
                functional bonding conductors shall be:
                <br />
                (a) insulated for the highest voltage expected between the functional bonding system
                and Earth and/or between the functional bonding system and simultaneously accessible
                exposed-conductive-parts;
                <br />
                (b) installed separately from the protective conductor;
                <br />
                (c) connected to the main earthing terminal (MET) only once.
                <br />
                If there are multiple functional bonding conductors present in the electrical
                installation, a separate <strong>
                  main functional earthing terminal (MFET)
                </strong>{' '}
                shall be installed for ease of connection for these conductors. The MFET shall be
                connected to the MET only once.
                <br />
                The cross-sectional area of every functional bonding conductor or functional
                earthing conductor shall be capable of withstanding all mechanical and thermal
                stresses caused by the expected operational current. This current shall be
                determined in accordance with the manufacturer{"'"}s instructions or by measurement
                taking into account the ICT equipment or system.
                <br />
                A functional equipotential bonding system may comprise:
                <br />
                (d) functional earthing conductor(s);
                <br />
                (e) functional bonding conductor(s); and
                <br />
                (f) an MFET.
              </>
            }
            meaning="§545 introduces the formal regulatory framework for ICT functional earthing — distinct from protective earthing under §543/544. The MFET (main functional earthing terminal) is the new concept: a separate terminal for the functional bonding network, connected to the MET only once, sized to handle the operational currents the ICT system produces. Couples directly to BS EN 50310 (telecommunications bonding networks) and to the cable-screen functional-earth references in §716.414.1.1 NOTE 2. Apply when the functional bonding network is NOT locally bonded to the protective bonding network."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Specifying for the next 15-20 years — practical patterns</ContentEyebrow>

          <ConceptBlock
            title="What a service-independent 2026 specification actually contains"
            plainEnglish="A service-independent specification is a few pages of decisions, each binding, each justified against the foreseeable services across the cabling life. The headline choices are: Class / Category, outlet density and locations, pathway capacity, fibre-to-the-edge presence, PoE thermal headroom (per §716), bonding network design (per BS EN 50310 and §545), and an administration scheme (per BS EN 50174-1 / TIA-606-D). Each is small money individually; collectively they are the difference between a cabling system that delivers 15-20 years of service-independence and one that strands the building at the first PoE rollout."
            onSite="A 2026 service-independent spec for a typical commercial fit-out reads roughly: Cat 6A LP-rated horizontal cable terminated to manufacturer-rated keystones; T568B throughout; permanent-link certification to TIA-1152-A Level V or BS EN 50346 with comfortable 3-5 dB+ NEXT margins archived per link; outlet density doubled over basic laptop-and-phone count to absorb ceiling APs / PoE-LED / sensors / cameras / access; containment sized to BS EN 50174-2 / TIA-569-E recommendations with fill below 40-50 %; single-mode fibre-to-the-edge in high-density-wireless / broadcast zones; PoE thermal management per BS 7671 §716 with bundle-size limits per BS EN 50174-2 / TIA TSB-184-A; functional earthing per §545 + BS EN 50310 with MFET; administration per BS EN 50174-1 + TIA-606-D with every link uniquely labelled."
          >
            <p>A specification template for a 2026 commercial Cat 6A office fit-out:</p>
          </ConceptBlock>

          <AppendixTable
            caption="Service-independent specification template — 2026 commercial Cat 6A office"
            source="Pattern aligned with BS EN 50173-1 / 50174 / 50310 / 50346 + ANSI/TIA-568 series + BS 7671:2018+A4:2026 §716 / §545"
            headers={['Specification element', 'Recommendation', 'Rationale']}
            rows={[
              [
                'Class / Category',
                'Cat 6A / Class EA, LP-rated',
                'Per §716.521.101 list; 10GBASE-T to 100 m; Type 4 PoE thermally supported with bundle management',
              ],
              [
                'Termination scheme',
                'T568B throughout; consistent end-to-end pinout',
                'Site discipline; no auto-MDI/MDI-X dependency',
              ],
              [
                'Channel certification',
                'TIA-1152-A Level V (or BS EN 50346) permanent-link, every link, archived',
                '15-year warranty alignment; objective record at handover',
              ],
              [
                'Margin discipline',
                'No marginal passes — re-terminate sub-3 dB NEXT / RL margins before handover',
                'Survival under thermal cycling + PoE load',
              ],
              [
                'Outlet density',
                'Double laptop-and-phone count; ceiling APs 1 per 25-50 m²; PoE-LED 1 per fixture',
                'PoE-everything growth absorbed without re-cabling',
              ],
              [
                'Pathway capacity',
                'Containment fill ≤ 40-50 % at first fit; 2-3x cable-count headroom',
                'Per BS EN 50174-2 / TIA-569-E; future cable pulls without re-cutting',
              ],
              [
                'Fibre-to-the-edge',
                'OS2 single-mode alongside Cat 6A in high-density / broadcast zones',
                '25/40/100 GBASE upgrade path for the 2030s',
              ],
              [
                'PoE bundle management',
                'Bundle ≤ 18 cables for Type 3, ≤ 12-15 for Type 4 in enclosed containment',
                'Per BS EN 50174-2 / TIA TSB-184-A / §716.523.1.101 NOTE 2',
              ],
              [
                'Functional earthing',
                'BS EN 50310 + §545 with MFET; minimum 2.5 / 4 mm² Cu',
                'Distinct from §543/544 protective earthing; EMC reference for ICT',
              ],
              [
                'Administration',
                'BS EN 50174-1 + TIA-606-D — every link uniquely labelled, archived',
                'Fault-find baseline; tenant churn survival; warranty registration',
              ],
            ]}
            notes="Each line is a SMALL premium individually over a minimal-grade specification; collectively they convert a six-month channel into a 15-20 year service-independent infrastructure. The cost crossover on most office fit-outs is inside 4-5 years; beyond that, service-independent cabling is purely cheaper than the alternative."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The lifecycle TCO argument</ContentEyebrow>

          <ConceptBlock
            title="Why service-independent cabling is purely cheaper after 4-5 years"
            plainEnglish="Service-independence is a TCO conversation, not a compliance conversation. The first-fit cost differential between minimal Cat 5e + minimal outlets + minimal containment and Cat 6A + doubled outlets + generous pathways is small (labour dominates the cost; the cable / outlet / panel premium is a fraction). The cost of re-cabling in years two through seven is large — access labour in an occupied building, business disruption, lost productivity. The lifecycle cost crosses break-even on most office fit-outs inside 4-5 years; beyond that, service-independent cabling is purely cheaper. The pitch to a cost-conscious client is TCO + service-independence, not BS 7671 compliance."
            onSite="On site, the contractor delivering this case to a client is making a quantitative argument backed by service-independence narrative. The first-fit premium is roughly 15-25 % over a minimal-grade specification (varies with project and supplier). The labour difference at first fit is roughly zero (pulling Cat 6A is the same as Cat 5e; doubling the outlet count adds a few hours per floor). The retrofit cost — re-cabling in years 3-7 — is typically 5-10x the first-fit cost differential, because access labour in an occupied building is enormous. Crossover is inside 4-5 years on every project the contractor has data on."
          >
            <p>The TCO breakdown by year:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Year 0 (first fit).</strong> Service-independent spec costs roughly 15-25 %
                more than minimal-grade. Cable, outlets, panels are a fraction of the project cost;
                labour dominates and is similar across grades. The premium is small in absolute
                terms.
              </li>
              <li>
                <strong>Years 1-3.</strong> Both specifications work for laptops + phones + light
                PoE. No re-cabling cost on either. Service-independent has headroom; minimal-grade
                does not.
              </li>
              <li>
                <strong>Years 3-7.</strong> PoE-everything rollout starts (LED lighting,
                high-density APs, sensors, cameras, access). Service-independent cabling absorbs it
                without re-cabling. Minimal-grade cabling needs partial or full re-pull — at 5-10x
                the first-fit cost differential because access labour in an occupied building is
                enormous. Crossover happens here.
              </li>
              <li>
                <strong>Years 7-15.</strong> Refresh of switches, IP phones, cameras, lighting
                controllers. Service-independent cabling continues to absorb each refresh.
                Minimal-grade cabling, if not re-pulled at year 5, is now hard to refresh without
                re-cabling.
              </li>
              <li>
                <strong>Years 15-20.</strong> Cabling end-of-life. Service-independent
                infrastructure has delivered 15-20 years of service-independence and is now up for
                refresh against new emerging services. Total lifetime cost: first-fit premium +
                minimal moves / adds / changes. Minimal-grade has been re-cabled once or twice along
                the way.
              </li>
            </ul>
            <p>
              The pitch to the client is the lifecycle curve, backed by the service-independence
              story. The discipline is sticking to the spec when the QS pushes back at the first-fit
              premium. The evidence is twenty years of commercial experience that re-cabling costs
              5-10x what first-fit cabling does.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Specifying for today\'s services and assuming PoE growth will pay for itself later"
            whatHappens={
              <>
                Contractor wins a 2026 commercial fit-out on minimal-grade specification: Cat 5e or
                Cat 6 horizontal, laptop-and-phone-only outlet density, containment at typical fill,
                no fibre-to-the-edge, no PoE thermal headroom margin. Building works for laptops and
                IP phones for two years. In year three, the tenant rolls out PoE-LED ceiling
                lighting, high-density APs, IP cameras — the cabling cannot deliver: no ceiling
                outlets, no PoE-rated bundle thermal headroom, Cat 5e cannot do 10G to the AP.
                Re-cabling cost: 5-10x the original first-fit premium that would have prevented it.
                Tenant is angry; contractor is not on the bid list for the next phase.
              </>
            }
            doInstead={
              <>
                Pitch the lifecycle TCO at design stage. First-fit premium of 15-25 % over
                minimal-grade is small money; lifecycle savings on re-cabling are large. Specify Cat
                6A / Class EA, double the outlet count, upsize containment, add fibre-to-the-edge to
                high-density zones, plan PoE bundle thermal management per BS 7671 §716. Document
                the spec as service-independent in the BS EN 50174-1 / TIA-606-D administration
                record. Quote the lifecycle curve to the QS. Stick to the spec when the QS pushes
                back. The re-cabling cost the contractor avoids is 5-10x the first-fit premium
                argued over.
              </>
            }
          />

          <Scenario
            title="A legacy office is being refurbished — Cat 5e horizontal from 2008, full PoE-everything rollout proposed. Re-cable or live with it?"
            situation={
              <>
                A 1990s-vintage commercial office, last refurbished in 2008 with Cat 5e horizontal
                cable to laptop-and-phone density. The tenant wants to roll out full PoE-everything
                in 2026: Type 4 PoE-LED lighting, high-density APs, IP cameras, sensors, access
                control. The QS is asking whether a re-cable is necessary or whether the existing
                Cat 5e can be patched up.
              </>
            }
            whatToDo={
              <>
                Three checks. (1) Class / Category: Cat 5e cannot deliver 10GBASE-T at 100 m (it
                tops out at 1 GBASE-T) — high-density APs need 10G uplink. The cable is undersized
                for the service. (2) Outlet density and pathway capacity: a 2008 laptop-and-phone
                density does not include ceiling outlets for APs / lighting / sensors; a re-cable is
                forced anyway to reach the new outlet locations. (3) BS 7671 §716 from 15 April
                2026: PoE on Cat 5e is permitted by the §716.521.101 cable category list (Cat 5 is
                in the list), but the bundle thermal management requirements and conductor design
                current cap of 750 mA are tighter on the older cable, and Cat 5e is below the 2026
                commercial practical default. The combination of (1) + (2) + (3) makes the case for
                a re-cable to Cat 6A LP-rated, doubled outlet density, upsized containment,
                fibre-to-the-edge to the high-density-AP zones. The first-fit cost is real; the
                alternative — living with a constrained service set on cabling that cannot absorb
                the rollout — has zero service-independence over the next 15 years.
              </>
            }
            whyItMatters={
              <>
                Re-cable decisions on legacy buildings are exactly where the service-independence
                pitch lands hardest. The 2008 spec did its job for 15 years; it cannot stretch to
                2026 services. The right answer is rarely "patch and live with it" because the
                patches do not absorb the next 15 years of services either. The right answer is a
                service-independent re-cable that does. Quote Cat 6A, doubled outlets, upsized
                pathways, fibre to high-density zones, BS 7671 §716 compliant PoE thermal
                management, channel-certified to TIA-1152-A Level V with comfortable margins, BS EN
                50174-1 / TIA-606-D administration. The client buys 15 years; the contractor
                delivers a job that does not need to be re-done in three.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Service-independence is a SPECIFICATION discipline. Four levers — Class headroom, outlet density, pathway capacity, fibre-to-the-edge — committed at design stage and lasting for the cabling life.',
              'Cat 6A / Class EA is the 2026 commercial default. Delivers 10GBASE-T to 100 m, supports Type 4 PoE under §716 with bundle management, headroom for emerging services.',
              'Outlet density and pathway capacity are the cheap levers. Double laptop-and-phone count to absorb PoE-everything growth; size containment for 2-3x cable count to support future pulls. Both are decided once at construction.',
              "BS 7671:2018+A4:2026 §716 (PoE / ELV DC) and §545 (ICT functional earthing) are entirely new from 15 April 2026. They sit alongside BS EN 50173 / 50174 / 50310 — they don't replace them.",
              'TCO crossover on most office fit-outs is inside 4-5 years. Service-independent cabling is purely cheaper beyond that. The pitch to the client is lifecycle cost + service-independence narrative, not BS 7671 compliance — that is a separate (and now stronger) layer from 15 April 2026.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: PoE applications
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next module: Standards
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule5Section5;
