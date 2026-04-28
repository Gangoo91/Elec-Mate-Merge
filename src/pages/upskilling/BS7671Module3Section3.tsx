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
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s3-classification-letters',
    question:
      'A two-letter code in the BS 7671 external-influence classification — for example AD4 or AG2 — encodes which two pieces of information?',
    options: [
      'The IP rating and the IK rating of the equipment',
      'The category of influence (first letter A/B/C) and the type within that category (second letter), with the digit indicating severity',
      'The Reference Method and the cable type',
      'The amendment number and the regulation number',
    ],
    correctIndex: 1,
    explanation:
      'Section 522 / Appendix 5 of BS 7671 uses a structured code. The first letter is the broad category — A is environment, B is utilisation, C is construction of buildings. The second letter is the specific influence within that category (D for water, G for impact, etc.). The numeric suffix is the severity / class. AD4 therefore means environment (A), water (D), severity 4 (splashes from any direction). The classification drives equipment selection — IP and IK ratings are the equipment response, not the input.',
  },
  {
    id: 'm3s3-ip-second-digit',
    question:
      'A specifier writes "IP65" on the schedule for an outdoor socket-outlet on an exposed wall. What does the second digit (5) actually guarantee?',
    options: [
      'Protection against temporary immersion',
      'Protection against dust ingress',
      'Protection against water projected by a nozzle (jets) from any direction',
      'Protection against direct sunlight (UV)',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 60529 second digit 5 = protection against water projected by a nozzle (6.3 mm) from any direction at 12.5 l/min for 3 minutes. It is NOT immersion (that is 7 or 8) and it is NOT high-pressure jets (that is 6, 9 or 9K). For a wall-mounted exposed outdoor socket the typical answer is IP55 or IP66 depending on whether jet washing is foreseeable. UV is not part of IP at all — that is influence AN and a separate material specification.',
  },
  {
    id: 'm3s3-ag-classes',
    question:
      'A surface-mounted luminaire is being installed in a school sports hall. Footballs, hockey balls and the occasional thrown shoe are foreseeable. Which AG (impact) class and which IK rating align with that risk?',
    options: [
      'AG1 / IK02 — low mechanical stress',
      'AG2 / IK07 — medium impact, equivalent ~2 J',
      'AG3 / IK08 or IK10 — high impact, 5 J to 20 J',
      'AG1 / IK00 — no impact protection required',
    ],
    correctIndex: 2,
    explanation:
      'A sports hall is a textbook AG3 (high mechanical stress / impact) location. The IK code under BS EN 50102 maps impact energy in joules: IK07 = 2 J, IK08 = 5 J, IK09 = 10 J, IK10 = 20 J. Sports halls, gymnasia, MUGAs and PE areas are typically specified IK08 minimum, with IK10 for ball-strike-likely positions (low-level wall packs, exposed bulkheads). Reg 522.6 requires equipment to be selected to withstand the mechanical stresses likely to occur — and AG3 + IK08 is the defensible specification.',
  },
  {
    id: 'm3s3-temperature-derating',
    question:
      'A cable installed in a boiler room runs along a hot ceiling void where the ambient temperature is sustained at 50 degC. The standard 70 degC PVC cable rating in App 4 is given at 30 degC ambient. What rating factor (Ca) must be applied?',
    options: [
      '1.00 — no correction is required because the cable insulation is rated for 70 degC',
      'Approximately 0.71 — App 4 Table 4B1 gives Ca = 0.71 for 70 degC PVC at 50 degC ambient',
      'Approximately 1.41 — the cable carries more current at higher temperature',
      'No correction — App 4 only applies below 30 degC',
    ],
    correctIndex: 1,
    explanation:
      'App 4, Table 4B1 of BS 7671 gives ambient-temperature rating factors. For 70 degC thermoplastic (PVC) insulated conductors at an ambient of 50 degC, Ca = 0.71. The cable insulation rating is the conductor temperature limit — it is NOT the ambient. As ambient rises, the temperature head available for I^2 R losses falls, so Iz must be reduced proportionally. Skip this and the cable runs hotter than its insulation can sustain, accelerating insulation breakdown and creating a fire risk. Ambient correction is the AA temperature classification translating into design.',
  },
  {
    id: 'm3s3-special-locations',
    question:
      'A bathroom contains a bath, shower over the bath, and a low-level downlight directly above the bath. Which Section 522 / Part 7 chain of reasoning gives you the correct IP rating for the downlight?',
    options: [
      'Section 522 alone — IP44 is sufficient for any bathroom luminaire',
      'Section 701 (Part 7 special location) classifies the position as zone 1, which mandates IPX4 minimum — and for shower-over-bath the splashing zone effectively forces IPX5 in practice; Section 522 / 522.3 (water) underpins the requirement',
      'Any IP rating is acceptable provided the circuit is RCD protected',
      'Section 522 only applies to outdoor installations; bathrooms are governed solely by Part 7',
    ],
    correctIndex: 1,
    explanation:
      'Part 7 special-location chapters do not replace Section 522 — they overlay specific external-influence requirements on top of it. Section 701 classifies bath / shower zones (0, 1, 2) and sets minimum IP requirements per zone (IPX7 in zone 0, IPX4 in zone 1, IPX4 in zone 2 — IPX5 where water jets are foreseeable, e.g. a body-jet shower or commercial wet area). A downlight directly above a bath is in zone 1; with a shower over the bath, jet exposure is foreseeable so IPX5 is the safer specification. The reasoning chain is always: Section 522 (general external influences) -> Part 7 (location-specific overlay) -> manufacturer instructions.',
  },
  {
    id: 'm3s3-corrosive-AF',
    question:
      'A car wash bay uses sodium-hydroxide-based traffic-film remover daily. A contractor specs standard galvanised-steel containment. Which AF class applies and why is the choice wrong?',
    options: [
      'AF1 — no special action; galvanised steel is fine',
      'AF2 / AF3 — chemicals present intermittently or continuously; galvanised zinc is attacked by alkali, so 316 stainless steel, GRP or specialist polymer is required',
      'AF4 only applies to acid environments, not alkali — so galvanised is acceptable',
      'AF classification does not apply to wash bays because water is the dominant influence',
    ],
    correctIndex: 1,
    explanation:
      'Reg 522.5 (corrosive or polluting substances, AF) requires equipment to be selected and erected so that no harmful effect arises from the substances in the environment. Sodium hydroxide attacks zinc readily — galvanised steel will corrode in months. AF2 (intermittent / accidental exposure) or AF3 (continuous) covers this; the response is 316 stainless steel containment, GRP enclosures, or chemical-resistant polymer conduit. Note also that two influences often co-exist: AF (corrosion) plus AD (water) plus AE (foreign bodies — dust, particulates) plus AG (impact from vehicles). The lowest IP / IK / material spec wins.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Section 522 of BS 7671:2018+A4:2026 is the general regulation covering external influences and selection of wiring systems. Which statement best captures its scope?',
    options: [
      'It applies only to outdoor installations',
      'It applies to all installations and requires equipment to be selected and erected appropriate to the external influences likely to be encountered, with Appendix 5 providing the classification system',
      'It is informative only and has no enforceable requirements',
      'It applies only where Part 7 special-location chapters do not override it',
    ],
    correctAnswer: 1,
    explanation:
      'Section 522 is a general "shall" requirement applying to every installation under BS 7671. Appendix 5 lists the classification codes (AA-AR for environment, BA-BE for utilisation, CA-CB for construction). Part 7 chapters add overlays for specific locations (bathrooms, swimming pools, agricultural, EV, marinas etc.) but do not displace Section 522 — they sit on top of it. The default assumption on every cert is that Section 522 has been considered for every cable run and every accessory.',
  },
  {
    id: 2,
    question:
      'A specifier writes "IP44" on a board specification. Under BS EN 60529, what does each digit guarantee?',
    options: [
      'First 4 = dust tight; second 4 = continuous immersion',
      'First 4 = protection against solid objects greater than or equal to 1 mm (tools, wires); second 4 = protection against splashing water from any direction',
      'First 4 = protection against fingers; second 4 = protection against vertical drips',
      'Both digits refer to mechanical impact in joules',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60529 IP code: first digit 4 = solid foreign object greater than or equal to 1.0 mm (tools, thicker wires); second digit 4 = water splashing against the enclosure from any direction with no harmful effect. IP44 is a common minimum for protected outdoor positions (under canopy, soffit-mounted) but is generally insufficient for unsheltered exposed outdoor (use IP55 / IP65) or for jet-wash environments (IP66, IP69K).',
  },
  {
    id: 3,
    question:
      'A cable installation is planned in a foundry where ambient is 45 degC sustained, cables are grouped (six circuits in close proximity), and the cable is 90 degC thermosetting (XLPE/SWA). Which set of correction factors must be combined?',
    options: [
      'Ca only — grouping factors do not apply to thermosetting cable',
      'Ca (ambient correction from App 4 Table 4B1) AND Cg (grouping correction from App 4 Table 4C1) AND Ci where thermal insulation is present — applied multiplicatively to Iz',
      'Cg only — ambient is irrelevant if the cable is rated 90 degC',
      'No correction is needed because XLPE is rated for 90 degC',
    ],
    correctAnswer: 1,
    explanation:
      'App 4 of BS 7671 makes the rating factors cumulative. Iz_corrected = It x Ca x Cg x Ci x Cs (where applicable). At 45 degC ambient with 90 degC XLPE, Ca is roughly 0.87 from Table 4B1; Cg for six grouped circuits, Reference Method C, is approximately 0.57 from Table 4C1. The combined effect is around 0.50 — a tabulated 30 A cable derates to about 15 A. Missing either factor leaves the cable thermally over-loaded under design current, accelerating insulation ageing and risking fault-current rupture below the OPD trip point.',
  },
  {
    id: 4,
    question:
      'A contractor installs a cable buried 0.45 m deep across a domestic garden with no warning tape and no mechanical protection. What does Section 522 require, and what is the EICR observation likely to be?',
    options: [
      'Nothing — depth alone is sufficient',
      'Reg 522.6 requires mechanical protection appropriate to the AG (impact) classification — typically armoured cable (SWA), conduit, or steel plate over the cable, plus warning tape buried 150-300 mm above the cable. The omission would typically be coded C2 (potentially dangerous) where future digging is foreseeable',
      'Only warning tape is required; SWA is optional',
      'BS 7671 has no requirement for buried cables — that is a Building Regulations matter',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.6 (mechanical stress) and Reg 522.8 cover buried cables. The standard defensible spec is SWA cable, buried 0.5 m or deeper across cultivated land, with marker tape buried 150-300 mm above. Where mechanical protection is omitted and the cable is in a location where digging or disturbance is foreseeable, the danger is direct contact with a live conductor by a future user (gardener, contractor). EICR coding under GN3 typically resolves to C2 — potentially dangerous — because the risk is real and not remote.',
  },
  {
    id: 5,
    question:
      'IK ratings and IP ratings answer different questions. Which statement correctly distinguishes them?',
    options: [
      'IP and IK are the same scale, just different unit systems',
      'IP (BS EN 60529) classifies ingress of solids and water; IK (BS EN 50102) classifies impact energy resistance in joules from IK00 (no protection) to IK10 (20 J)',
      'IK is a UK-only system; the rest of Europe uses IP',
      'IK applies only to luminaires; IP applies only to enclosures',
    ],
    correctAnswer: 1,
    explanation:
      'IP and IK are independent ratings that often appear together on a data sheet. IP under BS EN 60529 covers solids (first digit 0-6) and water (second digit 0-8/9K). IK under BS EN 50102 covers external mechanical impact: IK00 = unprotected, IK02 = 0.2 J, IK04 = 0.5 J, IK06 = 1 J, IK07 = 2 J, IK08 = 5 J, IK09 = 10 J, IK10 = 20 J. A car-park luminaire might be IP65 / IK10; a domestic indoor downlight typically IP20 / IK02.',
  },
  {
    id: 6,
    question:
      'Reg 522.10 covers corrosive or polluting substances. Which design response is wrong for a coastal seafront installation (heavy salt-laden air, AF2/AF3, AD3 wind-driven rain)?',
    options: [
      'Specify 316 stainless steel containment and fixings',
      'Specify zinc-plated steel screws and brackets to BS EN ISO 4042 standard finish',
      'Specify IP66 enclosures with stainless steel hinges and locks',
      'Specify cable glands with anti-corrosion compound and a marine-grade gland (BS EN 62444)',
    ],
    correctAnswer: 1,
    explanation:
      'Standard zinc plating is sacrificial and consumed rapidly in salt-spray (AF) environments. Within 6-18 months in coastal conditions, zinc-plated fixings show red rust and structural compromise. The right specification is 316 stainless (not 304 — 304 still pits in chloride), or proprietary marine-grade galvanic-protected systems. Reg 522.10 requires the designer to consider the substances likely to be encountered — salt aerosol is one of the most aggressive and predictable.',
  },
  {
    id: 7,
    question:
      'A cable is routed through wall thermal insulation in a domestic loft conversion (Reference Method 100/101/102/103, App 4). What does this affect, and which BS 7671 factor applies?',
    options: [
      'Nothing — thermal insulation does not affect cable rating',
      'It restricts heat dissipation from the cable, requiring the Ci correction factor (App 4) — for a cable surrounded by thermal insulation for greater than 0.5 m, Ci = 0.5 (i.e. cable must be derated to half its tabulated rating)',
      'It improves cable rating because the insulation prevents fire spread',
      'It applies only to cables in cold lofts, not warm-roof construction',
    ],
    correctAnswer: 1,
    explanation:
      'App 4 Reference Methods 100-103 cover cables in walls / ceilings with thermal insulation. The Ci factor depends on length-of-cable-in-insulation: short crossings (less than 0.5 m) have minor effect, but cables run within insulation for greater than 0.5 m attract Ci values down to 0.5. This is one of the most-missed rating factors on real installations — a 2.5 mm^2 cable rated 27 A in free air can be effectively limited to 13.5 A when buried in 200 mm of mineral wool. Combined with Cg and Ca, the practical Iz can be far below the tabulated value.',
  },
  {
    id: 8,
    question:
      'The Section 522 / Appendix 5 classification system uses three category letters at the front of every code. Which statement maps them correctly?',
    options: [
      'A = appliance, B = building, C = circuit',
      'A = environment (climatic / physical), B = utilisation (capability of persons, body resistance, evacuation, materials), C = construction of buildings (combustible materials, building structure)',
      'A = AC, B = battery, C = control',
      'A = amendment-protected, B = baseline, C = compliance',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix 5 uses three groups. Group A (environment): AA temperature, AB humidity, AC altitude, AD water, AE foreign bodies, AF corrosion, AG impact, AH vibration, AK flora, AL fauna, AM EMC, AN solar, AP seismic, AQ lightning, AR wind. Group B (utilisation): BA capability of persons, BB body resistance, BC contact with earth, BD evacuation, BE handled materials. Group C (construction): CA combustible building materials, CB building structure (fire propagation, flexible movement). Every cert-relevant external influence falls into one of these — and the design log should record which classes apply at which location.',
  },
];

const faqItems = [
  {
    question: 'Where exactly is the BS 7671 external-influence classification system documented?',
    answer:
      'Section 522 of BS 7671:2018+A4:2026 is the operative Section ("Selection and erection of wiring systems in relation to external influences") and Appendix 5 is the reference table of classifications (AA-AR, BA-BE, CA-CB) with description and severity classes. Together, Section 522 + Appendix 5 are how the regulations turn an environment into a buildable specification. Part 7 special-location chapters (701 bathrooms, 702 pools, 705 agricultural, 706 conducting locations, 708 caravan parks, 709 marinas, 710 medical, 711 exhibitions, 712 PV, 715 ELV lighting, 717 mobile units, 721 caravans, 722 EV charging, 729 operating gangways, 730 onshore power, 740 amusement, 753 floor / ceiling heating) override or supplement Section 522 for those specific locations.',
  },
  {
    question: 'Is IP rating a BS 7671 requirement or a separate standard?',
    answer:
      'IP ratings are defined in BS EN 60529, an independent international standard. BS 7671 references IP ratings as the response to certain external-influence classifications (e.g. AD3 light spray -> IPX4 minimum, AD4 splash -> IPX4, AD5 jets -> IPX5, AD6 powerful jets -> IPX6, AD7 immersion -> IPX7, AD8 submerged -> IPX8). The cert defensibility chain is: Section 522 classifies the environment -> Appendix 5 names the class -> manufacturer / standard maps the class to a minimum IP -> equipment data sheet evidences the IP -> EIC / EICR records compliance.',
  },
  {
    question: 'Why does the same room sometimes need different IP ratings in different positions?',
    answer:
      'Because external influences are positional, not room-wide. A bathroom is a clear example: zone 0 (inside the bath / shower) is IPX7; zone 1 (above bath / shower to 2.25 m) is IPX4 (or IPX5 where water jets are foreseeable); zone 2 (0.6 m around zone 1) is IPX4; outside the zones, IPX0 may be acceptable on a Section 522 basis. The same logic applies to kitchens, plant rooms, car parks, carwashes — the design log should record the IP requirement at each accessory position, not as a single room-wide number.',
  },
  {
    question: 'How do IK and IP relate to "shall withstand" in Reg 522.6?',
    answer:
      'Reg 522.6 (mechanical stress) is the general principle — equipment shall be selected and erected to withstand the mechanical stresses likely to occur. IK rating (BS EN 50102) is the quantified evidence: it states the impact energy in joules the enclosure has been tested to. IK04 = 0.5 J (a falling pencil), IK07 = 2 J (a spanner dropped from 400 mm), IK08 = 5 J (a 1.7 kg mass dropped from 300 mm), IK10 = 20 J (a 5 kg mass from 400 mm). Sports halls, school corridors, MUGAs, car parks, plant rooms with overhead cranes, and any AG3 location should drive an IK08 or IK10 specification — and the cert should record the IK rating alongside the IP.',
  },
  {
    question:
      'Do I need to apply ambient-temperature correction for cables in normal UK domestic premises?',
    answer:
      'App 4 ambient rating factors (Ca) are normalised to a 30 degC reference. Inside a typical UK domestic envelope at sustained 20-25 degC, Ca = 1.0 and no correction is needed. The places where Ca matters are: boiler rooms / plant rooms (often 40-50 degC sustained), commercial kitchens above appliances (35-50 degC), south-facing roof spaces in summer (50-60 degC), industrial process rooms, foundries, and certain inverter / battery enclosures. Wherever the sustained ambient exceeds 30 degC, App 4 Table 4B1 must be consulted and the rating factor applied.',
  },
  {
    question: 'When can I treat a special-location chapter as superseding Section 522?',
    answer:
      'Never wholesale. Part 7 chapters add additional or stricter requirements on top of Section 522 — they do not exempt the installation from the general external-influence assessment. If Section 701 sets a minimum IP for zone 1 of a bathroom, the actual IP requirement is the higher of the Section 701 minimum and the Section 522 / Appendix 5 outcome for the actual external influences present. In practice the Part 7 minimum is usually the binding number, but the Section 522 reasoning is what makes the cert defensible if the actual environment is more severe than the Part 7 default (e.g. a wet-room with body-jets exceeds standard zone 1 splash).',
  },
  {
    question: 'How does the BD (evacuation) classification interact with cable selection?',
    answer:
      'BD classifies the means of evacuation: BD1 normal density / easy evacuation, BD2 normal density / difficult evacuation (high-rise residential), BD3 high density / easy evacuation (cinemas, theatres), BD4 high density / difficult evacuation (hospitals, hotels, prisons). For BD2 / BD3 / BD4, cable selection is driven up: low-smoke zero-halogen (LSZH) sheaths to BS EN 50575 / CPR class B2ca-s1,d0,a1 or higher, fire-resistant cables for life-safety circuits (emergency lighting, fire alarm, smoke control fans). Section 422 (in conjunction with Section 522) and the relevant Part 7 / Part 8 chapters drive the actual cable / containment specification, but the BD class is the trigger.',
  },
  {
    question:
      'What is the practical difference between Section 522 (general) and the new A4:2026 wording in 522.6 for buried cables?',
    answer:
      'A4:2026 has tightened a number of 522.x sub-clauses around mechanical protection and clearly aligned the language with current installation methods. The general principle of Reg 522.6 — equipment shall withstand the mechanical stresses likely to occur during installation, use and maintenance — is unchanged. What is sharpened in A4 is the explicit treatment of cables routed through metal-faced building elements, the cable-stress requirements adjacent to penetrations, and the cross-references to Section 521 (wiring system selection) and Section 543 (CPC sizing). On every cert, treat A4 as the live edition: where in doubt, specify mechanical protection (SWA, conduit, capping, plate) and document it.',
  },
  {
    question:
      'How should the design log capture the external-influence assessment so the cert is defensible?',
    answer:
      'The defensible record is a per-location matrix: location -> applicable Appendix 5 classes (AA, AD, AE, AF, AG, AH, BA, BD, etc.) -> minimum IP -> minimum IK -> material constraints -> equipment specified -> manufacturer data sheet reference. This sits alongside the cable-calc design log (Ib, In, Iz with Ca/Cg/Ci, Zs, voltage drop). Together they evidence Reg 132.5 (selection of equipment) and Section 522. Without it, a future inspector cannot trace why a particular IP / IK / material was chosen — and that is the gap an insurer will probe after an incident.',
  },
];

const BS7671Module3Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'External Influences and Installation Conditions | BS 7671:2018+A4:2026 | Module 3.3',
    description:
      'Section 522 of BS 7671:2018+A4:2026 — the external-influence classification system, IP and IK ratings, water and impact classes, ambient temperature corrections (App 4), and how Part 7 special locations overlay Section 522.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3"
            title="External influences and installation conditions"
            description="Section 522 of BS 7671 — the classification system for environmental, utilisation and construction influences, and how those classes drive IP rating, IK rating, material selection and cable derating on every installation."
            actions={
              <>
                <RegBadge>522.1</RegBadge>
                <RegBadge>522.6</RegBadge>
                <RegBadge>522.8</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 522 is a general "shall" requirement: equipment shall be selected and erected appropriate to the external influences likely to be encountered. Appendix 5 of BS 7671 lists every class (AA-AR environment, BA-BE utilisation, CA-CB construction).',
              'IP ratings (BS EN 60529) and IK ratings (BS EN 50102) are the equipment-side response. IP covers ingress of solids and water; IK covers impact energy in joules. The two are independent and must both be specified where mechanical risk exists.',
              'Cable ratings in App 4 are tabulated at 30 degC ambient, single-circuit, no thermal insulation. Real installations apply Ca (ambient), Cg (grouping) and Ci (thermal insulation) cumulatively — missing any one leaves the cable thermally over-stressed.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Read and apply the Appendix 5 classification system: identify the category letter (A/B/C), the influence letter, and the severity digit for any installation location.',
              'Translate AD (water) and AG (impact) classes into the correct minimum IP and IK rating per BS EN 60529 and BS EN 50102.',
              'Apply App 4 rating factors (Ca, Cg, Ci) to tabulated cable current-carrying capacity and demonstrate the resulting Iz.',
              'Recognise where Part 7 special-location chapters overlay Section 522 (bathrooms, swimming pools, EV charging, agricultural, marina, medical) and pick the binding requirement.',
              'Specify materials (cable sheath, containment, fixings) appropriate to AF (corrosion) classification, including coastal, chemical and food-processing environments.',
              'Build a defensible per-location external-influence matrix on the design log so the cert (EIC / EICR) is defensible to an inspector or insurer.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The classification system — three category letters</ContentEyebrow>

          <ConceptBlock
            title="A, B and C — environment, utilisation and construction"
            plainEnglish="Every external influence in BS 7671 starts with one of three category letters. A is what the environment does to the equipment. B is who or what is using the equipment and how. C is how the building itself behaves."
            onSite="On a site survey, walk the location and tag each position against the three categories. A position can carry multiple classes simultaneously — outside socket on a coastal car park is AD3 (rain) + AF3 (salt) + AG3 (vehicle impact) + AN2 (UV) all at once. The most onerous spec wins."
          >
            <p>
              Group A (environment) covers AA temperature, AB humidity, AC altitude, AD water, AE
              foreign solid bodies, AF corrosive or polluting substances, AG impact, AH vibration,
              AK flora, AL fauna, AM electromagnetic / electrostatic / ionising influences, AN solar
              radiation, AP seismic, AQ lightning, AR wind. Group B (utilisation) covers BA
              capability of persons (ordinary, children, disabled, instructed, skilled), BB body
              resistance, BC contact with earth (none, low, frequent, continuous, immersed), BD
              evacuation conditions, BE handled materials (combustible, fire-propagating, explosive,
              contaminating). Group C (construction of buildings) covers CA combustible building
              materials and CB building structure (fire propagation, flexible structure). Every BS
              7671 cert decision that flows from environment, occupant or building fabric traces
              back to one or more of these classes.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The general regulation — Section 522 / Reg 522.1</ContentEyebrow>

          <ConceptBlock
            title="Reg 522.1 in plain English"
            plainEnglish="Equipment shall be selected and erected appropriate to the external influences to which it may be subjected and the conditions likely to be encountered. That is the whole regulation in one sentence — and it is the one regulation an inspector or insurer will reach for after a failure."
            onSite="The 'likely to be encountered' wording is doing real work. It is not about the worst case ever — it is about the foreseeable conditions over the installation lifetime: future cleaning regimes, future use changes (residential converted to wet-room, garage converted to gym), future maintenance access. A cert is defensible if the design log shows the foreseeable conditions were considered, not just the conditions on the day of install."
          >
            <p>
              Section 522 is a single general "shall" obligation that anchors all the more specific
              522.x sub-clauses (522.3 water, 522.4 dust, 522.5 corrosive substances, 522.6
              mechanical, 522.7 vibration, 522.8 mechanical stress during installation, 522.10
              corrosive or polluting substances, 522.11 flora, 522.12 fauna, 522.13 sunlight). The
              hierarchy is: Section 522 + Appendix 5 (general framework) -&gt; specific 522.x
              sub-clause (the named influence) -&gt; Part 7 chapter (special-location overlay if
              applicable) -&gt; manufacturer instructions (the binding equipment-side spec).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 522 — Selection and erection of wiring systems in relation to external influences"
            clause="A wiring system shall be selected and erected so as to be appropriate to the external influences to which it may be subjected, taking account of the conditions likely to be encountered. The external influences to be taken into account are those listed in Appendix 5."
            meaning="Two-part obligation. (1) Selection and erection — both design AND installation must address the external influences. Specifying the right cable and then cable-tying it through a sharp metal edge defeats both Reg 522.1 and Reg 522.8. (2) Likely to be encountered — foreseeable lifetime conditions, not just install-day conditions. The design log should record the foreseeable conditions considered."
            cite="BS 7671:2018+A4:2026, Section 522 (general principle) and Appendix 5 (classification table)"
          />

          <SectionRule />

          <ContentEyebrow>IP ratings — BS EN 60529, the ingress code</ContentEyebrow>

          <ConceptBlock
            title="IP XY — what each digit guarantees"
            plainEnglish="IP is a two-digit code defined in BS EN 60529. The first digit is solid-body protection (0-6). The second digit is water protection (0-8, with 9K added for high-pressure jet wash). The higher the number, the more onerous the test."
            onSite="Common IP values in UK practice: IP20 indoor dry (domestic CU on a clean wall); IP44 protected outdoor (under canopy, soffit-mounted accessory); IP55 exposed outdoor general; IP65 wash-down areas, food processing, exposed seafront; IP66 high-pressure cleaning (carwash); IP67 temporary immersion (puddle-prone yards, agricultural drinking-trough proximity); IP68 continuous immersion (submersible pumps, pond / fountain equipment); IP69K steam-jet wash (commercial kitchens, abattoirs)."
          >
            <p>
              First digit (solids): 0 unprotected, 1 objects greater than or equal to 50 mm (hand),
              2 greater than or equal to 12.5 mm (finger), 3 greater than or equal to 2.5 mm
              (tools), 4 greater than or equal to 1 mm (wires), 5 dust-protected (limited ingress
              permitted, no harmful effect), 6 dust-tight. Second digit (water): 0 unprotected, 1
              vertical drips, 2 drips at 15 deg tilt, 3 spray to 60 deg, 4 splash from any
              direction, 5 jets (6.3 mm nozzle, 12.5 l/min, 3 min), 6 powerful jets (12.5 mm nozzle,
              100 l/min), 7 temporary immersion (1 m, 30 min), 8 continuous immersion (per
              manufacturer spec, typically depth and time), 9K high-temperature high-pressure jet
              (80 degC, 80-100 bar, 14-16 l/min). The X placeholder ("IPX5") is used when only one
              digit is being asserted.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Water — AD classification (Reg 522.3)</ContentEyebrow>

          <ConceptBlock
            title="AD1 to AD8 — from negligible to submerged"
            plainEnglish="The AD class describes how much water the equipment can foreseeably encounter. AD1 negligible (indoor dry). AD2 falling drops. AD3 sprays / rain at angles up to 60 deg. AD4 splashes from any direction. AD5 jets. AD6 powerful jets. AD7 temporary immersion. AD8 permanent submersion."
            onSite="The mapping to IP second digit is direct: AD2 -> IPX1/IPX2, AD3 -> IPX3, AD4 -> IPX4, AD5 -> IPX5, AD6 -> IPX6, AD7 -> IPX7, AD8 -> IPX8. A standard outdoor garden socket on an exposed wall is AD3 / AD4 -> IPX4 minimum, but in practice IPX5 or IPX6 is usual because future jet-washing of patios / driveways is foreseeable."
          >
            <p>
              Reg 522.3 requires wiring systems to be selected and erected so that no damage arises
              from water condensation or ingress likely to occur. Water is the single most common
              cause of accessory failure in UK installations: rain on outdoor sockets, hose spray on
              garage outlets, condensation in cold-roof loft spaces, splash in kitchens, shower
              spray in bathrooms. The defence is per-position IP specification, not a room-wide
              minimum — and the cert design log should record both the AD class identified and the
              IP specified at each accessory.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Mechanical impact — AG classification and IK rating (Reg 522.6)
          </ContentEyebrow>

          <ConceptBlock
            title="AG1 to AG4 — and how IK answers the question"
            plainEnglish="AG class is the impact severity the equipment may foreseeably suffer. AG1 low (domestic indoor). AG2 medium (commercial circulation). AG3 high (sports halls, MUGAs, car parks, factory floors). AG4 very high (heavy industrial, mining, vehicle-impact zones). IK rating is the quantified equipment response in joules of impact energy withstood."
            onSite="IK02 = 0.2 J (a falling pencil — domestic indoor). IK07 = 2 J (a spanner dropped 400 mm — commercial corridor). IK08 = 5 J (1.7 kg from 300 mm — sports hall, school corridor). IK10 = 20 J (5 kg from 400 mm — MUGA wall pack, car-park luminaire, vehicle-impact-zone bollard). The IK rating goes alongside the IP rating on the data sheet — both must be specified where mechanical risk exists."
          >
            <p>
              Reg 522.6 (mechanical stress) requires equipment to be selected and erected so it
              withstands the mechanical stresses likely to occur during installation, use and
              maintenance. IK rating under BS EN 50102 is the standardised pendulum-impact test
              evidencing what the enclosure can take. For AG3 environments (sports halls, school
              circulation, MUGAs, public-realm bollards, retail back-of-house, factory production
              floors) the typical specification is IK08 minimum, with IK10 at ball-strike-likely
              positions and vehicle-impact zones. Reg 522.8 covers mechanical stress imposed during
              installation itself — pulling tension on cables, bend radii, edge protection at
              penetrations — and is enforceable as a separate clause.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Ambient temperature (AA) — App 4 cable rating factors</ContentEyebrow>

          <ConceptBlock
            title="Ca — the ambient correction factor"
            plainEnglish="Cable current ratings in App 4 are tabulated at a reference ambient temperature (30 degC for thermoplastic, 30 degC for thermosetting). Where the actual ambient is higher, the conductor has less temperature head available before reaching its insulation limit, so the cable must carry less current. Ca is the factor that scales tabulated It down to actual Iz."
            onSite="Where Ca matters: boiler / plant rooms (40-50 degC sustained), commercial kitchens above appliances (35-50 degC), south-facing roof voids in summer (50-60 degC), foundries and process rooms (often 50-70 degC), inverter and battery enclosures (manufacturer-specified). Where Ca = 1.0: typical UK domestic interior at 20-25 degC. The number to remember: 70 degC PVC at 50 degC ambient -> Ca approximately 0.71."
          >
            <p>
              App 4, Table 4B1 of BS 7671 lists the ambient correction factor Ca for ambient
              temperatures from 25 degC up to 90 degC, for both thermoplastic (PVC, 70 degC
              conductor temperature) and thermosetting (XLPE, EPR, 90 degC conductor temperature)
              cables. Below 30 degC, Ca is greater than 1 (the cable can carry slightly more than
              tabulated). At 30 degC, Ca = 1.0. Above 30 degC, Ca falls. The factors must be
              combined with Cg (grouping, Table 4C1), Ci (thermal insulation, Reference Methods
              100-103 / Table 52.2) and Cs (soil thermal resistivity for buried cables) — all
              applied multiplicatively to It to give Iz. Iz must then exceed Ib (design current) and
              meet Reg 433.1.1 with respect to In.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Corrosion (AF) — Reg 522.10 and material selection</ContentEyebrow>

          <ConceptBlock
            title="AF1-AF4 — the substances that eat your installation"
            plainEnglish="AF class is corrosive or polluting substances likely to be present. AF1 negligible. AF2 occasional / accidental exposure. AF3 continuous risk. AF4 permanent and high-concentration. The response is material specification — not just IP."
            onSite="Where AF bites: coastal seafront (AF2/AF3 salt aerosol — 316 stainless or marine-grade); food processing (AF2/AF3 cleaning chemicals — stainless or specialist polymer); car wash (AF3 traffic-film remover, alkali — 316 or GRP); swimming pools (AF3 chlorine — 316 or pure-polymer, NEVER zinc-plated); animal husbandry (AF2 ammonia / urea — stainless); chemical plants (AF3/AF4 process chemicals — bespoke materials per substance). Standard zinc-plated steel is sacrificial in any of these and will fail in months."
          >
            <p>
              Reg 522.10 (formerly Reg 522.5 in some printings) requires equipment to be selected
              and erected so no harmful effect arises from the corrosive or polluting substances
              likely to be present, including water. The defensible material chain is: identify the
              substances (chloride, alkali, acid, organic solvent, biological), identify the
              concentration and frequency, pick the material from a known-resistance reference (e.g.
              316 stainless for chloride, GRP for hydrofluoric acid environments, certain polymers
              for hydrocarbons), and specify the entire fixing system to match — screws, bolts,
              glands, tape and sealants are part of the same chain. A 316 enclosure with zinc-plated
              screws fails at the screws.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Special locations — Section 522 plus Part 7 overlay</ContentEyebrow>

          <ConceptBlock
            title="When Part 7 chapters overlay Section 522"
            plainEnglish="Part 7 of BS 7671 contains special-location chapters that ADD requirements on top of Section 522 — they do not replace it. The binding requirement at any position is the more onerous of (a) the Section 522 / Appendix 5 outcome for the actual external influences and (b) the Part 7 minimum for that location."
            onSite="The Part 7 chapters that interact most with Section 522: 701 bathrooms (zone-based IP); 702 swimming pools (zone-based IP plus chloride material spec); 703 sauna (high-temperature material spec); 705 agricultural (AF ammonia / urea, AG livestock, AD wash-down); 706 conducting locations of restricted movement (BC4 immersion, BB body resistance); 708 caravan parks (AD, AG, AF); 709 marinas (AF salt aerosol, AD permanent immersion); 710 medical (BA1/BA4, BD3/BD4); 712 PV (AN solar, AA temperature); 715 ELV lighting (AA temperature); 717 mobile units (AG4 vibration / impact); 721 caravans (AG4, AD); 722 EV charging (AG3/AG4 vehicle impact); 729 operating gangways; 740 amusement (BD4); 753 floor / ceiling heating (CA combustible)."
          >
            <p>
              The discipline on every cert is to walk the chain twice. First chain: Section 522 +
              Appendix 5 -&gt; classes present at this position -&gt; minimum IP / IK / material.
              Second chain: which Part 7 chapter applies -&gt; what does it set as minimum at this
              position? Then take the more onerous of the two. Most often the Part 7 minimum is the
              binding number. Occasionally the actual environment exceeds the Part 7 default — for
              example a wet-room with body-jets exceeds standard zone-1 splash-only assumptions, and
              the Section 522 reasoning brings the real specification up. The cert defensibility is
              in the design log showing both chains were walked.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Mechanical stress during installation — Reg 522.8</ContentEyebrow>

          <ConceptBlock
            title="The clause that catches sloppy installation"
            plainEnglish="Reg 522.8 covers the mechanical stresses imposed on a wiring system during installation — bend radius, pulling tension, edge protection at penetrations, support spacing, fixing method. Specifying the right cable and then violating its installation conditions defeats the protective measure as surely as picking the wrong cable in the first place."
            onSite="The recurring failure modes: cable pulled around a sharp metal edge at a penetration without grommet (insulation cut, latent fault); cable installed below its minimum bend radius at a 90 deg internal corner (conductor strain); cable strain greater than its tabulated tension during a long pull (inner conductors damaged but sheath intact, only shows under load); fixings spaced too widely so cable sags and self-loads at fixings; cable cable-tied so tightly that the sheath compresses and migrates. None of these show on a basic continuity / insulation test on day one — they show on the cert two years later as a fault."
          >
            <p>
              Reg 522.8 requires the wiring system to be selected and erected so that damage to the
              cable sheath or conductor during installation, use and maintenance is prevented. This
              is not a separate check from Reg 522.6 — it sits alongside it as the installation-time
              corollary. Practical evidence on the cert: bend-radius inspection at penetrations and
              changes of direction, support-spacing per Table 4A2 of the OSG, fixing method
              appropriate to the cable type (SWA gland torque, FP200 fixings at correct spacing,
              T&amp;E clipping intervals), and use of edge protection (grommets, bushes, sealing
              washers) at every metal penetration.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Specifying a single IP rating for an entire room"
            whatHappens="A bathroom is specified as 'IP44 throughout'. A downlight is fitted directly above the bath in zone 1, with shower over bath. IPX4 is the zone-1 minimum but jet exposure from the shower is foreseeable, so IPX5 was the right specification. Six months in, water ingress through the downlight bezel causes a circuit trip. The accessory is replaced and the failure mode repeats."
            doInstead="Specify IP per position, not per room. The design log should list each accessory position, the BS 7671 zone (Part 7 chapter where applicable), the AD class likely to be encountered, and the resulting IP rating — taking the more onerous of the two chains. For a shower-over-bath downlight, IPX5 (or IPX7 if the position could be wetted directly) is the defensible specification."
          />

          <CommonMistake
            title="Forgetting to apply Cg, Ca and Ci together"
            whatHappens="A 2.5 mm^2 thermoplastic T&amp;E ring final is designed using App 4 tabulated It of 27 A (Reference Method C). The cable is grouped with five other rings in a single capping and runs through 200 mm of mineral wool insulation in the loft for a 0.8 m crossing. Real Iz is approximately 27 x 0.57 (Cg) x 1.0 (Ca) x 0.5 (Ci) = 7.7 A. The 32 A MCB is now uncoordinated with the cable. Under sustained kitchen load the cable runs above its insulation rating and ages prematurely; under fault, the breaker may not trip before the cable insulation softens."
            doInstead="On every design, walk all four corrections explicitly: Ca (ambient), Cg (grouping), Ci (thermal insulation), Cs (soil thermal resistivity for buried). Apply them multiplicatively to It and check Iz greater than or equal to In greater than or equal to Ib per Reg 433.1.1. Where corrections push Iz below the standard breaker rating, redesign — larger cable, separate runs, or different reference method."
          />

          <CommonMistake
            title="Using zinc-plated fixings in an AF environment"
            whatHappens="A coastal car-park installation uses 316 stainless enclosures (correct) with standard zinc-plated bolts and washers (wrong). Within 12 months the bolts have red-rusted, the brackets are loose, and the enclosure is no longer mechanically secure. The installation fails Reg 522.10 not because of the enclosure — but because of the fixings."
            doInstead="Specify the entire fixing system to match the AF class. In coastal / chloride environments use 316 stainless throughout — bolts, washers, screws, glands, banding, cable ties, sealing tape backbones. In food / chemical / pool environments, match the substance: 316 for chloride, specific polymers for HF / strong acids, GRP for sustained chemical immersion. The chain is only as strong as its weakest fixing."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Outdoor garden socket on an exposed coastal property"
            situation="Customer wants two double 13 A sockets on the rear elevation of a seafront property — directly south-facing, 50 m from the shoreline, no canopy, exposed to wind-driven rain and salt aerosol. They will be used for power tools, a pressure washer, and seasonally a hot tub circulation pump."
            whatToDo="Walk the Section 522 chain. AD: pressure-washer use is foreseeable (AD5 jets) — IPX5 minimum, IPX6 defensible. AF: chloride aerosol at 50 m from shore is AF2/AF3 — 316 stainless steel back-box, gland and fixings; non-zinc-plated. AG: external position with foreseeable garden-tool impact is AG2 — IK07 minimum, IK08 defensible. AN: south-facing exposure — UV-stabilised cable sheath, UV-rated accessory body. Specification: IP66 / IK08 weatherproof socket in 316 stainless back-box, MCB protection in IP-rated enclosure inside, SWA cable from CU to enclosure, gland with anti-corrosion compound at the SWA termination, RCD additional protection (Reg 411.3.3) at the consumer unit."
            whyItMatters="A standard IP44 plastic outdoor socket on this position will fail within 18 months. The sheath embrittles under UV, the seal degrades under salt, and water tracks behind the bezel. By the time the customer notices, the cable termination inside has corroded and a fault is imminent. The Section 522 design log is what makes the cert defensible if there is ever a claim — both for the standard of installation AND for the foreseeability assessment."
          />

          <Scenario
            title="Domestic kitchen rewire — under-cabinet strip lighting and appliance circuits"
            situation="A new kitchen has under-cabinet LED strip lighting, a pull-out oven, an induction hob, dishwasher, washing machine and a wall-mounted boiler in a separate utility cupboard. The customer plans occasional steam-mopping of the floor. Ambient at hob splashback can reach 35-40 degC during cooking."
            whatToDo="Walk the chain per position. (a) Under-cabinet LED strip: AA1/AA2 (sustained 30-35 degC at cabinet underside) — confirm driver and strip rated; AD1 normally, but accessory positions near the splashback move to AD3/AD4 — IPX4 driver enclosure if mounted in-line; the new Reg 411.3.4 applies (luminaire RCD additional protection in domestic) so 30 mA RCBO upstream. (b) Sockets at worktop level near the sink and behind the hob: zone considerations from kitchen guidance (no formal Part 7 chapter, but designer responsibility under Reg 522) — minimum 300 mm from sink or splashback edge, IP44 or higher where splash is foreseeable. (c) Appliance circuits: standard cable selection but verify Ca = 1.0 (kitchen ambient is not normally elevated above 30 degC sustained) — derate locally if the cable runs above the hob in a void. (d) Boiler in utility cupboard: confined space, possible AA2 sustained ambient elevated — verify cable rating with Ca."
            whyItMatters="Domestic kitchen installations are the highest-volume cert work in UK practice. The Section 522 thinking is often skipped because 'it's only domestic' — but the foreseeable conditions (steam-mopping, splashback, cabinet-underside heat, appliance failure spilling water) are real. The defensible cert documents the per-position thinking even when the conclusion is 'standard accessory acceptable here' — because the inspector or insurer can see that the analysis was done."
          />

          <SectionRule />

          <ContentEyebrow>Cables in thermal insulation — Reference Methods 100-103</ContentEyebrow>

          <ConceptBlock
            title="The most under-applied derate in domestic practice"
            plainEnglish="Cables routed within the thickness of building thermal insulation cannot lose heat at the rate App 4 assumes for free-air or surface-clipped methods. Reference Methods 100-103 in App 4 give the corrected ratings; for cables completely surrounded by thermal insulation for more than 0.5 m, the correction is severe."
            onSite="In a modern UK loft conversion or roof-warm construction, mineral-wool insulation is often 200-300 mm thick and a cable that crosses the joists buried in the insulation is fully surrounded for more than 0.5 m. App 4 gives Ci approximately 0.5 in that case — a tabulated 27 A cable becomes effectively 13.5 A. Combined with grouping and any ambient correction the practical Iz can drop below the design current Ib, with no symptom on day-one testing."
          >
            <p>
              The four reference methods specifically for cables in insulation are: 100 (cable in
              direct contact with a thermally insulating wall, cable below or above the insulation
              with a ceiling forming one face); 101 (cable surrounded on one side by insulation,
              with the other side in free air); 102 (cable in a stud wall with insulation on both
              sides); 103 (cable enclosed in conduit / trunking within insulation). Each method has
              its own tabulated It in App 4. Where a cable crosses an insulated zone for greater
              than 0.5 m, Ci is applied; where it is a short crossing (less than 0.5 m), the local
              effect is treated as negligible. The defensible record on the cert is the reference
              method chosen for each cable run, evidenced in the cable-calc design log.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EMC, solar and lightning — AM, AN, AQ classifications</ContentEyebrow>

          <ConceptBlock
            title="The classes that drive shielding, UV-rated sheath and SPD selection"
            plainEnglish="AM (electromagnetic, electrostatic, ionising) drives cable shielding, segregation distances and the EMC of the wiring system. AN (solar radiation) drives UV-stabilised cable sheath and material selection on exposed positions. AQ (lightning) drives surge protective device (SPD) selection and bonding strategy."
            onSite="AM in domestic is usually low (AM1) — but PV inverters, EV chargers, VSDs and medical / data installations can drive it to AM2/AM3, requiring shielded cable, segregated routing, and EMC-rated equipment. AN is real in any south-facing exposed position — UV-stabilised sheath is the right call for any cable visible to direct sun. AQ drives the new BS 7671 SPD requirements: Reg 443 sets when SPDs are mandatory, Reg 534 sets the install requirements; the AQ class informs the impulse-current rating."
          >
            <p>
              AM (electromagnetic) is referenced in Section 444 (measures against electromagnetic
              disturbances) and influences cable selection (shielded cables, twisted-pair signal
              cables), routing (segregation distances between power and signal, parallel-run limits)
              and equipment EMC ratings to BS EN 61000 / 61326. AN (solar radiation) is addressed by
              UV-stabilised cable sheath and material specifications: standard PVC sheath embrittles
              in 2-3 years of direct UK summer sun; UV-rated cable or UV-protected containment is
              the response. AQ (lightning) is the trigger for the SPD requirements of Section 443 —
              Reg 443.4 sets when SPDs are required, Reg 534 sets the installation method. The AQ
              class (AQ1 negligible, AQ2 indirect exposure, AQ3 direct exposure) feeds into the Type
              1 / Type 2 / Type 3 SPD selection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522.6 — Mechanical stress"
            clause="A wiring system shall be selected and erected so as to withstand the mechanical stresses likely to occur during installation, use or maintenance, taking account of the relevant external influences classified in Appendix 5."
            meaning="Reg 522.6 catches both the install-day stresses (pulling tension, bend radius, fixings, edge protection at penetrations) and the lifetime stresses (vibration, impact, abrasion, foreseeable disturbance). On the cert, the response is the IK rating recorded for accessories AND the documented installation method — bend-radius compliance, support-spacing per OSG Table 4A2, gland torques recorded for SWA, edge protection at every metal penetration."
            cite="BS 7671:2018+A4:2026, Reg 522.6 (with Reg 522.8 covering installation-time stresses)"
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference — the per-position matrix</ContentEyebrow>

          <ConceptBlock
            title="The design-log table that makes the cert defensible"
            plainEnglish="For every accessory position on the install, fill a single row of the matrix: location -> Appendix 5 classes present -> minimum IP -> minimum IK -> material constraints -> Part 7 overlay if any -> resulting equipment specification -> manufacturer reference. This is the artefact an inspector or insurer will ask for."
            onSite="Keep the matrix simple — six to eight columns, one row per accessory or wiring-system run. The matrix sits alongside the cable-calc design log (Ib, In, Iz with Ca/Cg/Ci, Zs, voltage drop). On a domestic the matrix is short; on a commercial fitout it can run to several pages. The discipline is the same — one row per position, every position considered, every classification recorded."
          >
            <p>
              The defensible structure: column 1 location / accessory ID; column 2 environment
              classes (AA, AD, AE, AF, AG, AH, AN as applicable); column 3 utilisation classes (BA,
              BB, BC, BD as applicable); column 4 construction classes (CA, CB if applicable);
              column 5 minimum IP (with reasoning); column 6 minimum IK (with reasoning); column 7
              material constraint (if any); column 8 Part 7 overlay reference (if applicable);
              column 9 equipment selected (model and data-sheet reference). Together with the
              cable-calc design log this evidences Reg 132.5 (selection of equipment) and Section
              522 in a form the inspector can audit row-by-row.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Section 522 of BS 7671 is the general "shall" requirement — equipment shall be selected and erected appropriate to the external influences likely to be encountered. Appendix 5 is the classification table.',
              'The classification system uses three category letters: A environment (AA-AR), B utilisation (BA-BE), C construction of buildings (CA-CB). Every external-influence decision traces back to one or more of these classes.',
              'IP rating (BS EN 60529) covers ingress of solids and water; IK rating (BS EN 50102) covers impact energy in joules. They are independent — both must be specified where mechanical risk exists.',
              'AD class -> IP second digit is direct: AD3 -> IPX3, AD4 -> IPX4, AD5 -> IPX5, AD6 -> IPX6, AD7 -> IPX7, AD8 -> IPX8. AG class -> IK rating: AG2 -> IK07, AG3 -> IK08, AG3/AG4 -> IK10.',
              'App 4 cable rating factors (Ca ambient, Cg grouping, Ci thermal insulation, Cs soil) apply multiplicatively to tabulated It to give Iz. Missing any one leaves the cable thermally over-stressed.',
              'Part 7 chapters overlay Section 522 — they do not replace it. The binding requirement at any position is the more onerous of the Section 522 / Appendix 5 outcome and the Part 7 minimum.',
              'Reg 522.10 (corrosive substances) drives material selection — cable sheath, containment, fixings, glands, sealants must all match the AF class. The chain is only as strong as the weakest fixing.',
              'The defensible cert artefact is a per-position external-influence matrix in the design log: location -> classes present -> IP / IK / material -> Part 7 overlay -> equipment specified.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Voltage drop
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module3Section3;
