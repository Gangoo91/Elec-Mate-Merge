import { ArrowLeft, ChevronLeft, ChevronRight, Home } from 'lucide-react';
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam7-s4-grade',
    question:
      'Under BS 5839-6:2019+A1:2020, which grade of domestic alarm system uses mains-powered detectors with NON-REMOVABLE rechargeable battery backup?',
    options: [
      'Grade A.',
      'Grade D1. Grade D was split in the 2020 amendment into D1 (non-removable rechargeable battery backup) and D2 (user-replaceable battery backup). D1 is the new-build standard for most modern dwellings — the rechargeable cell is sealed within the alarm housing for the life of the device, eliminating the user error of "removing the battery to silence false alarms". D2 retains the user-replaceable battery option, suited to lower-risk new-build situations. Grade A is panel-based (full BS 5839-1 architecture in a dwelling). Grade C uses central control + mains detectors with integral standby (revised in 2020).',
      'Grade F1.',
      'Grade C.',
    ],
    correctIndex: 1,
    explanation:
      'D1 = mains + non-removable rechargeable backup. D2 = mains + user-replaceable backup. The 2020 split prevented the historic problem of removed batteries. Grade B and Grade E (legacy split) were REMOVED in the 2020 revision.',
  },
  {
    id: 'fam7-s4-category',
    question:
      'A standard new-build 2-storey dwelling in England requires which BS 5839-6 category as a minimum?',
    options: [
      'LD1.',
      'LD2 — escape routes plus high-risk rooms (must include kitchen + principal habitable room). LD2 detects on the escape route (hall, landing) AND in the room of fire origin most likely to cause loss of life if undetected (kitchen — heat detector; principal habitable room — smoke detector). Combined with Grade D1 (mains + non-removable rechargeable backup), LD2 is the standard for new-build dwellings in England under Approved Document B Vol 1. LD1 (full coverage) is used in HMOs and high-risk dwellings; LD3 (escape routes only) is the lowest level — typically retrofit minimum.',
      'LD3.',
      'No category.',
    ],
    correctIndex: 1,
    explanation:
      'LD2 = escape routes + high-risk rooms (kitchen heat + principal habitable smoke). New-build standard in England (ADB Vol 1). LD1 = full coverage (HMOs, complex). LD3 = escape routes only (retrofit minimum).',
  },
  {
    id: 'fam7-s4-scotland',
    question:
      'Scotland has tighter domestic fire alarm requirements than England post-Cameron House (2017 fire). What did Scotland mandate?',
    options: [
      'Heat alarms only.',
      "Interlinked alarms in EVERY room (with limited exceptions for low-risk areas like bathrooms and toilets) plus heat alarms in kitchens, plus carbon monoxide alarms in rooms with fixed combustion appliances. The Housing (Scotland) Act 1987 amendments and the Tolerable Standard regulations brought this into force from February 2022 for ALL homes in Scotland — owner-occupied as well as rented. The Cameron House tragedy (December 2017, 2 deaths in a hotel) and earlier Scottish fire fatalities drove the policy. Scotland's requirements exceed Approved Document B Vol 1 (England) materially. Wales has its own variant (Renting Homes Wales Act 2016 + 2022 regulations).",
      'Smoke alarms only on the escape route.',
      'Same as England.',
    ],
    correctIndex: 1,
    explanation:
      'Scotland: interlinked alarms in every room, heat in kitchens, CO where fixed combustion appliances. From Feb 2022, applies to all homes in Scotland (rented + owner-occupied). Wales has its own framework. England has the lower ADB Vol 1 standard.',
  },
  {
    id: 'fam7-s4-hmo',
    question:
      'A 6-bed HMO (House in Multiple Occupation) — single-storey conversion of a former office, 6 sleeping rooms each with its own en-suite, shared kitchen and lounge. What BS 5839-6 grade and category combination is appropriate?',
    options: [
      'Grade D1 LD3.',
      'Likely Grade A LD1 — Grade A is the panel-based architecture (full BS 5839-1 system in a dwelling), used in HMOs and other higher-risk dwellings. LD1 is full coverage (every circulation route + every room except low-risk like bathrooms). The combination provides the protection level appropriate to multiple unrelated occupants who do not share a single fire safety culture, sleeping at different times, with corridors and shared facilities. The local authority HMO licence may specifically require Grade A LD1. The system would typically include heat in kitchens, smoke in circulation and habitable rooms, MCPs at exits, ARC connection (now an unacceptable variation to omit per BS 5839-1:2025 in supported housing — analogous policy expectation for HMOs).',
      'Grade F1 LD3.',
      'No system required.',
    ],
    correctIndex: 1,
    explanation:
      'HMOs typically Grade A LD1. Higher protection than family dwelling because: multiple unrelated occupants, sleeping risk, varying fire safety culture, often inadequate compartmentation. The local authority HMO licence sets the formal requirement; BS 5839-6 / -1 are the engineering route.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 5839-6:2019+A1:2020 covers which premises?',
    options: [
      'All buildings.',
      'Dwellings — single-family houses, bungalows, the inside of flats and apartments, HMOs (Houses in Multiple Occupation), supported housing (sheltered, extra-care), self-contained granny annexes, and loft conversions. Common parts of multi-occupied residential buildings (stairs, lobbies, corridors of blocks of flats) are NOT covered by BS 5839-6 — those are non-domestic and follow BS 5839-1. The boundary between BS 5839-6 and BS 5839-1 is the flat entrance door. The Fire Safety Act 2021 confirmed that flat entrance doors are within RRO scope, so they are a regulatory boundary as well as a standards boundary.',
      'Hotels only.',
      'Industrial premises.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-6 = inside dwellings. BS 5839-1 = non-domestic + common parts of residential. Boundary = flat entrance door. The two parts coordinate at the door — typically BS 5839-1 alarm in common parts does not auto-trigger BS 5839-6 alarm in flat (and vice versa) to control nuisance.',
  },
  {
    id: 2,
    question: 'Under BS 5839-6:2019+A1:2020, which grades were REMOVED in the 2020 revision?',
    options: [
      'Grades A and C.',
      'Grades B and E. Grade B (system using non-addressable detectors with central control) was removed because the architecture had largely fallen out of use; Grade A and Grade C cover the modern panel-based and central-control architectures respectively. Grade E (a legacy split that pre-dated D1/D2) was removed because the 2020 revision replaced it with the cleaner D1 (non-removable rechargeable backup) / D2 (user-replaceable battery backup) split. The current grade family is therefore A, C, D1, D2, F1, F2 — six grades, replacing the seven-grade family of the 2013 revision.',
      'Grades D and F.',
      'No grades were removed.',
    ],
    correctAnswer: 1,
    explanation:
      'Grades B and E removed in 2020. Current grades: A, C, D1, D2, F1, F2. The split of D into D1/D2 and F into F1/F2 introduced clearer distinctions on battery backup type.',
  },
  {
    id: 3,
    question: 'BS 5839-6 Grade F1 vs F2 — what is the difference?',
    options: [
      'F1 has more sensors.',
      'F1 = battery-only detector with NON-REMOVABLE battery (typically a 10-year sealed lithium cell). F2 = battery-only detector with USER-REPLACEABLE battery. F1 is preferred because the user cannot defeat the alarm by removing the battery — a major historical cause of domestic fire deaths is alarms that have been silenced by battery removal. F2 retains the user-replaceable option for limited use cases. Both are battery-only — no mains supply — and are used for replacement of existing battery-only alarms or in situations where mains-power running is impractical. New build typically requires Grade D (mains + backup), not Grade F.',
      'F1 has mains supply.',
      'F1 is used in commercial premises.',
    ],
    correctAnswer: 1,
    explanation:
      'F1 = sealed 10-year battery (non-removable). F2 = user-replaceable battery. The 10-year sealed approach prevents the historic "removed battery" failure mode that killed thousands of users over decades. Grade F is for replacement / limited use; new build is Grade D minimum.',
  },
  {
    id: 4,
    question: 'BS 5839-6 LD1 vs LD2 vs LD3 — what is the coverage difference?',
    options: [
      'Identical.',
      'LD1 = full coverage. Detection in every circulation route AND every room of the dwelling, except specified low-risk locations (bathrooms, toilets, shower rooms — typically). The most comprehensive. Used in HMOs and high-risk dwellings. LD2 = escape routes plus high-risk rooms. Detection on the circulation routes (hall, landing) AND in higher-risk rooms — must include kitchen (heat) and principal habitable room (smoke). The new-build standard for typical dwellings in England. LD3 = escape routes only. Detection on circulation routes only — hall and landing. The lowest level. Typically the retrofit minimum where existing alarms are upgraded.',
      'LD1 less than LD2.',
      'LD3 covers all rooms.',
    ],
    correctAnswer: 1,
    explanation:
      'LD1 (everything except low-risk) > LD2 (escape + kitchen + principal habitable) > LD3 (escape only). LD1 = HMO. LD2 = new-build. LD3 = retrofit minimum.',
  },
  {
    id: 5,
    question:
      'For a new-build standard 2-storey dwelling in England under Approved Document B Vol 1, what is the typical Grade × Category combination required?',
    options: [
      'Grade F1 LD3.',
      'Grade D1 LD2 — mains-powered alarms with non-removable rechargeable backup, covering escape routes plus kitchen plus principal habitable room. The grade reflects the resilience requirement (mains + backup so alarms work in power cut and continue to work for the life of the device without user intervention); the category reflects the coverage (escape routes + high-risk rooms). The detail: heat alarm in kitchen, smoke alarms on each storey including the new converted storey if applicable, smoke alarm in the principal habitable room. ADB Vol 1 references BS 5839-6 explicitly. Interlinked — hard-wired or wireless RF — so an alarm anywhere alerts everyone.',
      'Grade A LD1.',
      'Grade C LD3.',
    ],
    correctAnswer: 1,
    explanation:
      'D1 LD2 is the England new-build benchmark. Mains + non-removable backup (D1) + escape routes + kitchen heat + principal habitable smoke (LD2). Interlinked — alarms communicate so any one triggers all. Hard-wired or RF.',
  },
  {
    id: 6,
    question:
      'England, Scotland and Wales have different domestic fire alarm requirements. Which jurisdiction has the tightest requirements following the Cameron House fire?',
    options: [
      'England.',
      'Scotland — interlinked alarms in every room (limited low-risk exceptions for bathrooms / toilets / shower rooms) plus heat alarm in kitchens plus CO alarms where fixed combustion appliances. Mandated for ALL Scottish homes (rented + owner-occupied) from February 2022. The standard exceeds Approved Document B Vol 1 (England, LD2 typical) and the Welsh Renting Homes regime. Driven by the Cameron House Hotel fire (December 2017, 2 fatalities) and earlier Scottish residential fire fatalities. Northern Ireland has its own framework via the Houses in Multiple Occupation (HMOs) Regulations (NI) and the Building Regulations (NI). The contractor working across UK must check jurisdiction.',
      'Wales.',
      'Northern Ireland.',
    ],
    correctAnswer: 1,
    explanation:
      'Scotland tightest post-Cameron House (Feb 2022 implementation). Interlinked in every room + heat in kitchen + CO. Applies to all homes regardless of tenure. Wales / NI / England have lower thresholds. Jurisdiction matters.',
  },
  {
    id: 7,
    question:
      'Interlinking of domestic alarms is required by BS 5839-6 for almost all new installations. What are the two principal interlinking technologies?',
    options: [
      'Bluetooth and infrared.',
      'Hard-wired interlink (an additional core in the supply cable carrying a low-voltage signal between alarms — when one detects, it signals the others to sound) and radio-frequency (RF) interlink (each alarm has an RF transceiver paired with the others; wireless mesh communicates the alarm state). Hard-wired is the original architecture, used in new build where wiring is accessible. RF is widely used in retrofit and where running additional cabling is impractical. Both are recognised by BS 5839-6. RF must use frequency bands and protocols that meet relevant European standards; the BS 5839-6 commentary discusses range, battery life, signal verification, and pairing.',
      'Wi-Fi only.',
      'There is no interlinking requirement.',
    ],
    correctAnswer: 1,
    explanation:
      'Hard-wired (extra interlink core) and RF (wireless transceiver per alarm). Both BS 5839-6 recognised. RF preferred in retrofit. Both must use compliant equipment / protocols.',
  },
  {
    id: 8,
    question: 'How does Grade C differ from Grade D1 in BS 5839-6?',
    options: [
      'They are identical.',
      'Grade C uses a central control unit (a small panel) with mains-powered detectors and integral standby supplies (battery in the control panel). It is a panel-based architecture but smaller / simpler than Grade A. Grade D1 has no central control unit — each detector is individually mains-powered with its own non-removable rechargeable battery; alarms are interlinked. Grade C is used where a panel-based architecture is appropriate but full Grade A is not justified — some sheltered housing, some larger dwellings. The 2020 revision updated Grade C to clarify the panel-based architecture and integral-standby requirement. Grade D1 is the most common new-build solution; Grade C is less common.',
      'Grade C has no batteries.',
      'Grade D1 has a panel.',
    ],
    correctAnswer: 1,
    explanation:
      'Grade C = small panel with mains + battery standby; mains-powered detectors. Grade D1 = no panel; each detector mains + non-removable rechargeable backup; interlinked. Architecture differs; both are mains-powered with backup.',
  },
  {
    id: 9,
    question: 'Carbon monoxide alarms in dwellings — which standard governs?',
    options: [
      'BS 5839-1 only.',
      'BS EN 50291 (parts 1 and 2) is the product standard for CO alarms in dwellings (covers detection performance, audibility, marking). BS 5839-6 Annex (supplementary information) provides guidance on installation in dwellings. The English requirement: CO alarm in any room with a fixed combustion appliance other than a gas cooker (Smoke and Carbon Monoxide Alarm (England) Regulations 2015, amended 2022 to include fixed combustion appliances of any kind in social rented homes, then extended in 2022 amendments). Scotland: CO alarms in every room with fixed combustion appliance (Tolerable Standard). Wales: similar provision under Renting Homes Wales Act framework. The CO alarm is technically a separate device class to the fire alarm; combined smoke + CO units exist (typically interlinked into the fire alarm RF mesh).',
      'BS 7671 only.',
      'No standard.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50291 product standard. BS 5839-6 Annex gives installation guidance. England post-2022: CO in rooms with fixed combustion appliances (not gas cookers). Scotland / Wales tighter. Combined smoke+CO devices often interlinked into fire alarm mesh.',
  },
  {
    id: 10,
    question:
      'A residential block has 18 flats over 6 storeys. The flats themselves use Grade D1 LD2. The common parts use what?',
    options: [
      'Grade F1 alarms.',
      'BS 5839-1 (non-domestic) applies in the common parts — typically a Cat L5 system (custom life protection coverage scoped to the FRA / fire strategy) or Cat M (manual only with MCPs) depending on the building height, occupancy and fire strategy. The flats themselves are dwellings under BS 5839-6 (Grade D1 LD2 typical for new build). The two systems do not normally interlink in nuisance-prevention terms — a Grade D1 alarm in one flat does NOT trigger the BS 5839-1 system in common parts (would cause mass evacuation for a localised flat alarm); a BS 5839-1 alarm in common parts does NOT necessarily trigger flat alarms (depends on the fire strategy — stay-put vs simultaneous evacuation strategy). The flat entrance door is the boundary, both technically and operationally.',
      'BS 5839-6 throughout.',
      'No system.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1 in common parts (typically Cat L5 / M depending on FRA / fire strategy). BS 5839-6 inside flats (Grade D1 LD2). The two do not auto-interlink in normal stay-put strategies. The cause-and-effect in the BS 5839-1 design must be coordinated with the fire strategy — stay-put vs simultaneous changes the alarm relationships fundamentally.',
  },
];

const FireAlarmModule7Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'BS 5839-6 requirements | Fire Alarm Module 7.4 | Elec-Mate',
    description:
      'BS 5839-6:2019+A1:2020 — domestic fire detection and alarm code of practice. Grades A / C / D1 / D2 / F1 / F2 (post-2020 revision). Categories LD1 / LD2 / LD3. England / Scotland / Wales differences. HMOs. Carbon monoxide. Interlinked alarms.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4"
            title="BS 5839-6 requirements"
            description="BS 5839-6:2019+A1:2020 is the domestic counterpart to BS 5839-1. It covers fire detection and alarm in dwellings: single-family homes, HMOs, supported housing, the inside of flats. Six grades (A, C, D1, D2, F1, F2 — post-2020 split). Three categories (LD1, LD2, LD3). England has the lowest threshold under Approved Document B Vol 1; Scotland has the tightest (post-Cameron House); Wales has its own framework."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5839-6:2019+A1:2020 — domestic code of practice. Covers dwellings: single-family, HMOs, supported housing, inside of flats. Boundary with BS 5839-1 = flat entrance door.',
              'Six grades after the 2020 revision: A (panel-based), C (central control + mains detectors + integral standby), D1 (mains + non-removable rechargeable backup), D2 (mains + user-replaceable backup), F1 (battery-only, sealed 10-yr), F2 (battery-only, user-replaceable). Grades B and E REMOVED in 2020.',
              'Three categories: LD1 (full coverage; HMOs), LD2 (escape routes + high-risk rooms incl. kitchen + principal habitable; new-build standard), LD3 (escape routes only; retrofit minimum).',
              'England (ADB Vol 1) — typical new build: Grade D1 LD2. Smoke alarms on every storey + heat in kitchen.',
              'Scotland post-Cameron House (Feb 2022) — interlinked alarms in EVERY room + kitchen heat + CO where fixed combustion. ALL homes (rented + owner-occupied).',
              'Wales — own framework via Renting Homes Wales Act 2016 / 2022 regulations. Tighter than England.',
              'Northern Ireland — own framework via NI Building Regs and HMO Regulations.',
              'Interlinking — hard-wired (extra interlink core) or RF (wireless mesh). Both BS 5839-6 recognised.',
              'Carbon monoxide — BS EN 50291 product standard. BS 5839-6 Annex installation guidance. Required where fixed combustion appliances are present.',
              'HMOs — typically Grade A LD1. Local authority HMO licence sets formal requirement.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify BS 5839-6:2019+A1:2020 as the domestic code of practice and locate its application boundary at the flat entrance door',
              'List the six grades after the 2020 revision (A, C, D1, D2, F1, F2) and explain the architectural / battery distinction',
              'Identify which grades were REMOVED in the 2020 revision (B and E) and the rationale',
              'List the three coverage categories (LD1, LD2, LD3) and apply them to dwelling types (HMO, new-build, retrofit)',
              'Apply the England Approved Document B Vol 1 standard (Grade D1 LD2 typical for new build)',
              'Apply the Scotland post-Cameron House requirements (interlinked alarms in every room, kitchen heat, CO where applicable, all homes)',
              'Identify the Wales and Northern Ireland frameworks as separate from England',
              'Apply hard-wired and RF interlinking technologies',
              'Apply BS EN 50291 to carbon monoxide alarm provision in dwellings',
              'Apply Grade A LD1 to HMOs and explain the local authority licensing route',
              'Coordinate BS 5839-6 (inside flats) with BS 5839-1 (common parts) at the flat entrance door',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The standard — scope, grades, categories</ContentEyebrow>

          <ConceptBlock
            title="What BS 5839-6 covers"
            plainEnglish="BS 5839-6 is the domestic part of the BS 5839 family — fire detection and fire alarm systems for the inside of dwellings. It covers single-family houses, bungalows, individual flats and apartments (the inside of), HMOs (Houses in Multiple Occupation), supported housing (sheltered, extra-care), self-contained granny annexes, and loft conversions in dwellings. It does NOT cover the common parts of multi-occupied residential buildings (stairs, lobbies, corridors of blocks of flats) — those are non-domestic and follow BS 5839-1. The boundary is the flat entrance door."
            onSite="When you walk into a residential block, the moment you cross from common stair into the flat, you've moved from BS 5839-1 territory to BS 5839-6 territory. Different standard, different grade and category language, different design philosophy. The contractor needs both — because almost every residential block engages both."
          >
            <p>The scope, in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Single-family dwellings.</strong> Houses (terraced, semi-detached,
                detached), bungalows. The most common BS 5839-6 application.
              </li>
              <li>
                <strong>Inside individual flats and apartments.</strong> Whether the flat is in a
                purpose-built block or in a converted older building, the inside of the flat is BS
                5839-6.
              </li>
              <li>
                <strong>HMOs.</strong> Houses in Multiple Occupation — shared houses, bedsits,
                lodgings, where unrelated occupants share facilities. Higher risk than family
                dwelling because of the multiple-unrelated-occupant factor; typically Grade A LD1.
              </li>
              <li>
                <strong>Supported housing.</strong> Sheltered, extra-care, supported housing for
                vulnerable occupants. May require Grade A LD1 with ARC connection (BS 5839-1:2025
                lists ARC absence in Grade A supported housing as an unacceptable variation — see
                §7.3).
              </li>
              <li>
                <strong>Granny annexes.</strong> Self-contained dwelling extensions. Treated as
                separate dwellings.
              </li>
              <li>
                <strong>Loft conversions.</strong> A new storey added to an existing dwelling
                triggers ADB Vol 1 §2 + BS 5839-6 — interlinked alarms on every storey including the
                new one.
              </li>
            </ul>
            <p>What BS 5839-6 does NOT cover:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Common parts of residential blocks (BS 5839-1 territory).</li>
              <li>Hotels (BS 5839-1; commercial occupancy with sleeping risk).</li>
              <li>
                Hostels, dormitories with high-density transient occupation (BS 5839-1; some
                supported housing patterns sit on the boundary and are case-by-case).
              </li>
              <li>
                Residential care homes (BS 5839-1; residential care is a regulated commercial
                activity, treated as non-domestic).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-6:2019+A1:2020 · Foreword (Status and use)"
            clause={
              <>
                This British Standard is intended to provide a code of practice for the fire
                detection and fire alarm systems for use in dwellings. It is intended to assist
                designers, installers, suppliers, users and enforcing authorities in achieving
                consistent levels of protection of life and property within dwellings. Like all
                British Standards, it is a code of practice and provides recommendations rather than
                mandatory requirements.
              </>
            }
            meaning="Code of practice. Recommendations. Not law. But — referenced by Approved Document B Volume 1, by the Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (and amendments), by the Scottish Tolerable Standard, by the Welsh Renting Homes regime — the de facto specification for domestic fire alarms in the UK."
          />

          <ConceptBlock
            title="The six grades after the 2020 revision"
            plainEnglish="The 2019 revision plus the 2020 amendment (A1:2020) reorganised the grade structure. Grade B (system using non-addressable detectors with central control) was removed because the architecture had largely fallen out of use. Grade E (a legacy split that pre-dated D1/D2) was removed because the cleaner D1 / D2 split replaced it. Grade D was split into D1 (non-removable rechargeable backup) and D2 (user-replaceable backup). Grade F was split into F1 (sealed 10-year non-removable battery) and F2 (user-replaceable battery). Result: six grades — A, C, D1, D2, F1, F2."
          >
            <p>The six grades, in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Grade A.</strong> A panel-based system with the architecture and
                installation requirements of a BS 5839-1 system, but located in a dwelling. Used in
                HMOs, supported housing, complex / large dwellings. The most comprehensive grade.
                Requires a fire alarm panel, BS 5839-1-style detection / sounders / cabling, proper
                commissioning and maintenance regime. Commonly combined with LD1 coverage.
              </li>
              <li>
                <strong>Grade C.</strong> A system with central control (a small panel), mains-
                powered detectors, and integral standby supplies (battery within the panel /
                detectors). REVISED in 2020 to clarify the architecture. Smaller / simpler than
                Grade A. Used where a panel-based architecture is appropriate but full Grade A is
                over-specification. Some larger dwellings, some smaller HMOs, some sheltered
                housing.
              </li>
              <li>
                <strong>Grade D1.</strong> Mains-powered detector with NON-REMOVABLE rechargeable
                backup. No central panel — alarms are interconnected (interlinked) so any one
                triggers all. The standard new-build solution for typical dwellings. The
                non-removable battery is the key feature: prevents the historic "removed battery to
                silence false alarms" failure mode that killed users for decades. The battery is
                sealed within the alarm housing for the life of the device.
              </li>
              <li>
                <strong>Grade D2.</strong> Mains-powered detector with USER-REPLACEABLE battery
                backup. Same architecture as D1, different battery. Used in lower-risk new-build
                situations where user-replaceable battery is acceptable. Less common since D1 became
                the default.
              </li>
              <li>
                <strong>Grade F1.</strong> Battery-only detector (no mains supply) with
                NON-REMOVABLE battery (typically a 10-year sealed lithium cell). The 10-year sealed
                cell is one of the most significant fire safety improvements of the past decade — it
                eliminates the user-replacement failure mode. Used for replacement of existing
                battery-only alarms or where mains-power running is impractical (e.g. some listed
                buildings).
              </li>
              <li>
                <strong>Grade F2.</strong> Battery-only with USER-REPLACEABLE battery. Limited use.
                The historical "battery alarm" architecture; gradually being phased out in favour of
                F1.
              </li>
            </ul>
            <p>
              Architecturally: A and C are panel-based. D1, D2 are mains-with-backup detectors. F1,
              F2 are battery-only detectors. Resilience: A &gt; C &gt; D1 ≈ D2 &gt; F1 ≈ F2. The
              choice is a function of the FRA / risk assessment and the dwelling type.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <ConceptBlock
            title="The three coverage categories"
            plainEnglish="BS 5839-6 categories describe the EXTENT of coverage. They are LD-prefixed (Life protection, Domestic) to distinguish from BS 5839-1's L categories. Three options: LD1 full coverage, LD2 escape routes plus high-risk rooms, LD3 escape routes only."
          >
            <p>The three categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>LD1 — full coverage.</strong> Detection in every circulation route AND every
                room of the dwelling, except specified low-risk locations (typically bathrooms,
                toilets, shower rooms — places with no significant fire risk and where steam /
                humidity false-alarms detection). The most comprehensive coverage. Used in HMOs,
                supported housing, complex dwellings, and any dwelling where the FRA concludes
                full-coverage is appropriate.
              </li>
              <li>
                <strong>LD2 — escape routes + high-risk rooms.</strong> Detection on the escape
                route (hall, landing) AND in high-risk rooms — must include kitchen (heat detector)
                and principal habitable room (smoke detector), and may include other rooms
                identified by the FRA as elevated risk (utility rooms, bedrooms with high-power
                appliances, etc.). The standard new-build coverage in England under ADB Vol 1.
              </li>
              <li>
                <strong>LD3 — escape routes only.</strong> Detection on the circulation routes only
                — hall and landing. No detection in habitable rooms, kitchen or principal habitable.
                The lowest level. Used as the retrofit minimum where the dwelling is being brought
                up to a baseline standard but full LD2 / LD1 is not justified.
              </li>
            </ul>
            <p>Application matrix in working order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>HMO (multi-occupant).</strong> Grade A + LD1.
              </li>
              <li>
                <strong>Supported housing.</strong> Grade A + LD1, often with ARC (BS 5839-1:2025
                makes ARC absence an unacceptable variation in supported housing requiring Grade A).
              </li>
              <li>
                <strong>Standard new-build dwelling (England).</strong> Grade D1 + LD2.
              </li>
              <li>
                <strong>Lower-risk new-build (England).</strong> Grade D1 + LD3 (only where
                specifically permitted — increasingly rare).
              </li>
              <li>
                <strong>Retrofit upgrade — minimum.</strong> Grade D1 + LD3 typical, or Grade F1 +
                LD3 if mains running is impractical.
              </li>
              <li>
                <strong>Scotland — all homes (post-Feb 2022).</strong> Effectively LD1 in substance
                (interlinked alarms in every room) — though the Scottish framework uses its own
                language rather than direct BS 5839-6 categorisation.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document B (Fire Safety) Volume 1 · §1 (Fire detection and fire alarm system in dwellings)"
            clause={
              <>
                A fire detection and fire alarm system in accordance with the relevant
                recommendations of BS 5839-6 should be provided in all dwellinghouses. The system
                should be at least Grade D Category LD3 standard (i.e. mains powered alarms with a
                battery backup, located in circulation areas), and where appropriate should be
                Category LD2 (i.e. with the addition of detectors in the kitchen and the principal
                habitable room).
              </>
            }
            meaning='ADB Vol 1 references BS 5839-6 explicitly. Minimum: Grade D LD3 (mains + backup, escape routes). Where appropriate: LD2 (add kitchen + principal habitable room). Most modern new-build is Grade D1 LD2 by default. The "Grade D" reference in ADB pre-dates the 2020 D1/D2 split; current practice is Grade D1.'
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Diagram — Grade × Category matrix</ContentEyebrow>

          {/* Grade × Category matrix diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5839-6 Grade × Category — application matrix with example dwellings
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Matrix mapping the six grades (A, C, D1, D2, F1, F2) against the three categories (LD1, LD2, LD3) with example dwellings in each cell. Grade A LD1 = HMO, supported housing. Grade D1 LD2 = standard England new-build. Grade D1 LD3 = lower-risk new-build / retrofit. Grade F1 LD3 = retrofit minimum where mains impractical."
            >
              {/* Title */}
              <text x="440" y="26" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                BS 5839-6 application matrix — Grade × Category
              </text>

              {/* Column headers */}
              <text
                x="280"
                y="64"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LD1 — full coverage
              </text>
              <text x="280" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                every circulation + every room
              </text>

              <text
                x="490"
                y="64"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LD2 — escape + high-risk
              </text>
              <text x="490" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                escape routes + kitchen + principal hab
              </text>

              <text
                x="700"
                y="64"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LD3 — escape only
              </text>
              <text x="700" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                circulation routes only
              </text>

              {/* Row labels and cells */}
              {/* Grade A row */}
              <g>
                <text x="60" y="125" fill="#22D3EE" fontSize="11" fontWeight="bold">
                  GRADE A
                </text>
                <text x="60" y="140" fill="rgba(255,255,255,0.6)" fontSize="9">
                  panel-based
                </text>
                <text x="60" y="153" fill="rgba(255,255,255,0.6)" fontSize="9">
                  BS 5839-1 architecture
                </text>

                <rect
                  x="180"
                  y="100"
                  width="200"
                  height="70"
                  rx="6"
                  fill="rgba(16,185,129,0.18)"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <text
                  x="280"
                  y="124"
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="10"
                  fontWeight="bold"
                >
                  HMOs
                </text>
                <text x="280" y="140" textAnchor="middle" fill="white" fontSize="10">
                  Supported housing
                </text>
                <text x="280" y="155" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  ARC + Grade A LD1
                </text>

                <rect
                  x="390"
                  y="100"
                  width="200"
                  height="70"
                  rx="6"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x="490"
                  y="138"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9.5"
                >
                  rare —
                </text>
                <text
                  x="490"
                  y="153"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9.5"
                >
                  Grade A overspec for LD2
                </text>

                <rect
                  x="600"
                  y="100"
                  width="200"
                  height="70"
                  rx="6"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x="700"
                  y="138"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9.5"
                >
                  rare —
                </text>
                <text
                  x="700"
                  y="153"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9.5"
                >
                  unusual combination
                </text>
              </g>

              {/* Grade C row */}
              <g>
                <text x="60" y="200" fill="#22D3EE" fontSize="11" fontWeight="bold">
                  GRADE C
                </text>
                <text x="60" y="215" fill="rgba(255,255,255,0.6)" fontSize="9">
                  central control
                </text>
                <text x="60" y="228" fill="rgba(255,255,255,0.6)" fontSize="9">
                  + integral standby
                </text>

                <rect
                  x="180"
                  y="180"
                  width="200"
                  height="60"
                  rx="6"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                />
                <text
                  x="280"
                  y="206"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Some sheltered housing
                </text>
                <text x="280" y="222" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Larger dwellings
                </text>

                <rect
                  x="390"
                  y="180"
                  width="200"
                  height="60"
                  rx="6"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                />
                <text
                  x="490"
                  y="206"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Some HMOs (lower risk)
                </text>
                <text x="490" y="222" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Larger family dwellings
                </text>

                <rect
                  x="600"
                  y="180"
                  width="200"
                  height="60"
                  rx="6"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x="700"
                  y="216"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9.5"
                >
                  uncommon
                </text>
              </g>

              {/* Grade D1 row */}
              <g>
                <text x="60" y="280" fill="#FBBF24" fontSize="11" fontWeight="bold">
                  GRADE D1
                </text>
                <text x="60" y="295" fill="rgba(255,255,255,0.6)" fontSize="9">
                  mains + non-removable
                </text>
                <text x="60" y="308" fill="rgba(255,255,255,0.6)" fontSize="9">
                  rechargeable backup
                </text>

                <rect
                  x="180"
                  y="260"
                  width="200"
                  height="60"
                  rx="6"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="280"
                  y="286"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Higher-risk dwelling
                </text>
                <text x="280" y="302" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  FRA-driven full coverage
                </text>

                <rect
                  x="390"
                  y="260"
                  width="200"
                  height="60"
                  rx="6"
                  fill="rgba(251,191,36,0.20)"
                  stroke="#FBBF24"
                  strokeWidth="2.5"
                />
                <text
                  x="490"
                  y="286"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ★ England new-build
                </text>
                <text x="490" y="302" textAnchor="middle" fill="white" fontSize="10">
                  ADB Vol 1 standard
                </text>

                <rect
                  x="600"
                  y="260"
                  width="200"
                  height="60"
                  rx="6"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="700"
                  y="286"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Retrofit minimum
                </text>
                <text x="700" y="302" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  ADB old-build minimum
                </text>
              </g>

              {/* Grade D2 row */}
              <g>
                <text x="60" y="350" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="bold">
                  GRADE D2
                </text>
                <text x="60" y="365" fill="rgba(255,255,255,0.5)" fontSize="9">
                  mains + user-replaceable
                </text>

                <rect
                  x="180"
                  y="335"
                  width="620"
                  height="50"
                  rx="6"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                <text
                  x="490"
                  y="358"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="9.5"
                >
                  Lower-risk new-build (LD2 / LD3) where user-replaceable battery acceptable —
                </text>
                <text
                  x="490"
                  y="372"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="9.5"
                >
                  less common since D1 became default
                </text>
              </g>

              {/* Grade F1 row */}
              <g>
                <text x="60" y="415" fill="#A855F7" fontSize="11" fontWeight="bold">
                  GRADE F1
                </text>
                <text x="60" y="430" fill="rgba(255,255,255,0.6)" fontSize="9">
                  battery-only,
                </text>
                <text x="60" y="443" fill="rgba(255,255,255,0.6)" fontSize="9">
                  10-yr sealed
                </text>

                <rect
                  x="180"
                  y="395"
                  width="620"
                  height="50"
                  rx="6"
                  fill="rgba(168,85,247,0.08)"
                  stroke="#A855F7"
                  strokeWidth="1"
                />
                <text
                  x="490"
                  y="418"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Retrofit / replacement where mains running impractical
                </text>
                <text
                  x="490"
                  y="432"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  listed buildings · existing battery alarm replacement · short-term solutions
                </text>
              </g>

              {/* Grade F2 row */}
              <g>
                <text x="60" y="475" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="bold">
                  GRADE F2
                </text>
                <text x="60" y="490" fill="rgba(255,255,255,0.4)" fontSize="9">
                  battery-only,
                </text>
                <text x="60" y="503" fill="rgba(255,255,255,0.4)" fontSize="9">
                  user-replaceable
                </text>

                <rect
                  x="180"
                  y="455"
                  width="620"
                  height="50"
                  rx="6"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x="490"
                  y="478"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9.5"
                >
                  Limited use — gradually phased out in favour of F1 (sealed 10-year cell)
                </text>
                <text x="490" y="492" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                  user-replaceable battery has historic "removed battery" failure mode
                </text>
              </g>

              {/* Caption strip */}
              <g>
                <rect
                  x="20"
                  y="515"
                  width="840"
                  height="20"
                  rx="4"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                <text x="440" y="529" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Grades B and E REMOVED in 2020 revision · ★ = England standard new-build per ADB
                  Vol 1
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Devolved nations — Scotland, Wales, NI</ContentEyebrow>

          <ConceptBlock
            title="Scotland post-Cameron House — the tightest UK regime"
            plainEnglish="The Cameron House Hotel fire (December 2017, 2 fatalities) and earlier Scottish residential fire fatalities drove a comprehensive policy response. The Housing (Scotland) Act 1987 amendments and the Tolerable Standard regulations brought into force, from February 2022, a requirement that ALL Scottish homes — whether rented or owner-occupied — meet a higher fire alarm standard than England. The standard is interlinked alarms in every room (with limited low-risk exceptions for bathrooms and toilets), heat alarms in kitchens, and CO alarms in any room with a fixed combustion appliance other than a gas cooker. The interlink can be hard-wired or RF. The policy applied retroactively to existing homes — owner-occupiers had to upgrade by February 2022 (the deadline was extended once due to COVID supply issues)."
          >
            <p>The Scottish standard, in working terms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Smoke alarm.</strong> One in every room frequently used during the day
                (typically living room) and in every circulation space on each storey (hall,
                landing). Effectively LD1 coverage but expressed in different language.
              </li>
              <li>
                <strong>Heat alarm.</strong> One in every kitchen.
              </li>
              <li>
                <strong>Carbon monoxide alarm.</strong> One in any room with a fixed combustion
                appliance other than a gas cooker (boiler, fixed gas fire, solid-fuel stove, etc.).
              </li>
              <li>
                <strong>Interlinking.</strong> All alarms must be interlinked — when one detects,
                all sound. Hard-wired (mains + interlink core) or RF (wireless mesh). The
                requirement for interlinking is unconditional.
              </li>
              <li>
                <strong>Power.</strong> Either mains-powered with backup OR sealed 10-year battery
                (Grade F1 equivalent). The Scottish rules do not require mains-powered as a default
                — sealed 10-year battery is an explicitly accepted alternative.
              </li>
              <li>
                <strong>Application.</strong> All homes — owner-occupied as well as rented. This is
                the major divergence from England (where the Smoke and Carbon Monoxide Alarm
                Regulations apply only to private rented and social rented sectors).
              </li>
            </ul>
            <p>
              The Scottish framework demonstrates how a fire-safety policy intervention can travel
              ahead of the rest of the UK. Cameron House, supplemented by other Scottish residential
              fire fatalities, drove a domestic standard now materially higher than ADB Vol 1
              England. Whether England follows is a political question; the engineering case for
              interlinked alarms in every room is strong.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Wales and Northern Ireland — separate frameworks"
            plainEnglish="Wales has its own framework via the Renting Homes (Wales) Act 2016 plus the Renting Homes (Fitness for Human Habitation) (Wales) Regulations 2022 (which came into force December 2022). The Welsh standard for rented housing requires interlinked smoke alarms on every storey plus a CO alarm in any room with a fixed combustion appliance. It is tighter than the English requirement for rented housing but does not match Scotland's every-room standard. The Welsh requirement applies to private rented and social rented; owner-occupied is not directly captured. Northern Ireland has its own framework via the Building Regulations (NI) and the Houses in Multiple Occupation (HMOs) Regulations (NI) — somewhat different in structure but generally conservative."
          >
            <p>The Welsh framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Coverage.</strong> Smoke alarms on every storey (interlinked) + CO where
                fixed combustion appliances. Tighter than England's Smoke and CO Alarm Regs but
                lighter than Scotland's every-room standard.
              </li>
              <li>
                <strong>Interlinking.</strong> Required.
              </li>
              <li>
                <strong>Power.</strong> Mains-powered with backup OR sealed 10-year battery.
              </li>
              <li>
                <strong>Tenure.</strong> Private rented + social rented. Owner-occupied not directly
                captured.
              </li>
            </ul>
            <p>The Northern Irish framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>New build.</strong> Building Regulations (NI) 2012 Part E (fire safety) —
                similar to ADB Vol 1 in structure; references BS 5839-6.
              </li>
              <li>
                <strong>HMOs.</strong> Houses in Multiple Occupation (HMOs) Act (NI) 2016 —
                licensing regime with fire safety conditions; typically Grade A LD1.
              </li>
              <li>
                <strong>Existing homes.</strong> No retroactive standard equivalent to Scotland's.
              </li>
            </ul>
            <p>
              For the contractor working across the UK, the implication is straightforward: confirm
              jurisdiction first, then design to the relevant national framework. A "BS 5839-6 Grade
              D1 LD2" designed for England may not satisfy Scotland.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Housing (Scotland) Act 1987 · Tolerable Standard (as amended) · Fire alarm provision"
            clause={
              <>
                A house meets the tolerable standard if it has satisfactory provision for detecting
                fires and for giving warnings in the event of a fire or suspected fire. Such
                provision must include — (a) a smoke alarm in the room which is frequently used by
                the occupants of the house for general daytime living purposes; (b) a smoke alarm in
                every circulation space on each storey, such as hallways and landings; (c) a heat
                alarm in every kitchen; and (d) all such alarms being interlinked.
              </>
            }
            meaning='Scotland: smoke alarms in living room + every circulation space on every storey + heat in every kitchen + all interlinked. Plus CO under separate regulations where fixed combustion appliances. Applies to all homes regardless of tenure. The "Tolerable Standard" language is the legal hook — a home that does not meet the standard is below tolerable.'
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Interlinking, CO, HMOs — operational detail</ContentEyebrow>

          <ConceptBlock
            title="Interlinking — hard-wired vs RF"
            plainEnglish="Interlinking is the requirement that, when any alarm detects fire, all alarms in the system sound. This is essential in dwellings because fire in one part of the house must alert occupants throughout. BS 5839-6 recognises two principal interlinking technologies: hard-wired (an additional core in the mains supply cable carrying a low-voltage signal between alarms) and radio-frequency (each alarm has an RF transceiver paired wirelessly with the others). The 2019+A1:2020 standard supports both."
          >
            <p>Hard-wired interlinking:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Architecture.</strong> Three-core supply cable plus interlink core (or a
                separate two-core interlink alongside the supply). When one alarm detects, it
                applies a signal voltage to the interlink that the others recognise as "alarm".
              </li>
              <li>
                <strong>Use case.</strong> New build where wiring is being installed anyway. Routing
                accessibility.
              </li>
              <li>
                <strong>Reliability.</strong> Very high — wired connection is robust against radio
                interference. No battery for interlink communication.
              </li>
              <li>
                <strong>Limitations.</strong> Cannot easily be retrofitted; needs cable run between
                alarm positions.
              </li>
            </ul>
            <p>RF interlinking:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Architecture.</strong> Each alarm has an RF transceiver (typically operating
                in the 868 MHz Short Range Devices band in the UK / Europe). At commissioning,
                alarms are paired into a mesh. When one detects, it broadcasts to the mesh.
              </li>
              <li>
                <strong>Use case.</strong> Retrofit (no wiring needed). Listed buildings (no visible
                cabling). Existing homes being upgraded.
              </li>
              <li>
                <strong>Reliability.</strong> High in well-designed systems with good link margins.
                Vulnerable to interference / range limitations in some buildings.
              </li>
              <li>
                <strong>Limitations.</strong> RF performance varies with building structure; signal
                verification at commissioning is essential. Battery in the RF transceiver must be
                considered (often combined with main detector battery).
              </li>
              <li>
                <strong>BS 5839-6 commentary.</strong> Discusses range, battery life, signal
                verification, pairing protocols. Grade D1 alarms with built-in RF interlink are
                widely available.
              </li>
            </ul>
            <p>
              For the contractor, the practical decision is access. New build with cabling
              accessible: hard-wired interlink. Retrofit / listed / impractical-cabling: RF. Both
              meet BS 5839-6 when correctly applied. The commissioning verification differs —
              hard-wired needs continuity check; RF needs link-margin / signal-strength verification
              at every alarm position.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Carbon monoxide alarms"
            plainEnglish="Carbon monoxide is a colourless, odourless, tasteless gas produced by incomplete combustion of carbon-containing fuels. It is highly toxic — kills tens of UK residents annually, mostly through faulty boilers, fires and stoves. CO alarms are technically a separate device class to fire / smoke alarms (different sensor, different alarm threshold, different signal pattern), but in domestic premises they are typically integrated into the fire alarm mesh — shared interlinked, shared maintenance, shared battery / mains supply for combined units. BS EN 50291 (parts 1 and 2) is the product standard for domestic CO alarms; BS 5839-6 Annex provides installation guidance."
          >
            <p>The detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Product standard.</strong> BS EN 50291-1 (apparatus for detection and
                measurement of CO concentration in dwellings) — the alarm itself. BS EN 50291-2 — CO
                alarms in vehicles, boats etc. (less commonly relevant).
              </li>
              <li>
                <strong>Where required (England).</strong> Smoke and Carbon Monoxide Alarm (England)
                Regulations 2015 (amended 2022): CO alarm in any room with a fixed combustion
                appliance other than a gas cooker. Applies to private rented and social rented. The
                2022 amendment extended to social rented and to all fixed combustion appliances (was
                just solid-fuel pre-2022).
              </li>
              <li>
                <strong>Where required (Scotland).</strong> Tolerable Standard — CO alarm in any
                room with a fixed combustion appliance other than a gas cooker. All homes regardless
                of tenure.
              </li>
              <li>
                <strong>Where required (Wales / NI).</strong> Various — check jurisdiction.
              </li>
              <li>
                <strong>Mounting.</strong> CO alarms are typically wall-mounted at a height of 1-3
                m, in the same room as the fixed combustion appliance, but not directly above or in
                close proximity to the appliance (CO is buoyant when warm but disperses generally;
                mounting too close can produce false alarms from start-up). BS 5839-6 Annex gives
                detailed guidance.
              </li>
              <li>
                <strong>Combined smoke + CO devices.</strong> Available; integrate with fire alarm
                mesh. Useful where one device location can serve both functions (e.g. a hallway near
                a boiler cupboard).
              </li>
              <li>
                <strong>Lifespan.</strong> CO sensors degrade chemically over time. Most units have
                a 7-10 year sensor life, marked on the device. Must be replaced (not just
                battery-changed) at end of life.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HMOs — licensing and the fire alarm condition"
            plainEnglish="A House in Multiple Occupation (HMO) is a property occupied by 3+ persons forming more than one household, sharing facilities (kitchen, bathroom). HMOs above certain thresholds (5+ persons in some areas; specific local authority thresholds) require a licence from the local authority. The licence will set fire safety conditions including the BS 5839-6 grade and category for the fire alarm system, typically Grade A LD1. Failure to license is an offence; failure to meet the licence conditions is an offence."
          >
            <p>The HMO architecture, in working terms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Definition.</strong> Housing Act 2004 Part 2 — 3+ persons forming more than
                one household, sharing one or more basic amenities (kitchen, bathroom, toilet).
                Variations by local authority.
              </li>
              <li>
                <strong>Licensing thresholds.</strong> Mandatory licensing applies to HMOs occupied
                by 5+ persons forming 2+ households (from October 2018; previously was 3 storeys + 5
                persons). Many local authorities have additional licensing schemes capturing smaller
                HMOs.
              </li>
              <li>
                <strong>Fire safety conditions.</strong> The licence will impose conditions
                including: BS 5839-6 Grade A LD1 fire alarm system (typical); fire-resisting doors
                to bedrooms / kitchen; protected escape route; emergency lighting; periodic FRA. The
                conditions are operationally specific.
              </li>
              <li>
                <strong>Fire risk assessment.</strong> Required regardless of HMO licence — the RRO
                applies to common parts of HMOs (and where the local authority is the responsible
                person, to all parts of mandatory-licensed HMOs).
              </li>
              <li>
                <strong>Fire alarm category — typically Grade A LD1.</strong> Reflects the
                higher-risk nature: multiple unrelated occupants, sleeping at different times,
                varying fire safety culture, often inadequate compartmentation. Grade A allows full
                BS 5839-1 architecture (panel + addressable detection + cable monitoring + logbook)
                within the dwelling.
              </li>
              <li>
                <strong>ARC.</strong> Increasingly common in HMOs as a licence condition, though not
                universal. BS 5839-1:2025 lists ARC absence in supported housing where Grade A is
                necessary as an unacceptable variation — the policy direction is towards ARC
                connection in vulnerable / multi-occupant sleeping environments.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Designing a Scottish dwelling to England's ADB Vol 1 standard"
            whatHappens="A national contractor takes on a job in Glasgow and applies their standard England specification: Grade D1 LD2 (escape routes + kitchen + principal habitable room). The Scottish Tolerable Standard requires interlinked alarms in every room. The system, although BS 5839-6 compliant in design language, does not meet the Scottish standard; the home is below tolerable. The local authority picks it up on a routine inspection."
            doInstead="Confirm jurisdiction at quotation. Scotland needs every-room interlinked + heat in kitchen + CO. Wales has its own framework. Northern Ireland has its own. England is the lowest-coverage case. Design to the most stringent standard applicable to the actual jurisdiction — never assume England-default for UK-wide work."
          />

          <CommonMistake
            title="Using Grade F2 (user-replaceable battery) in new build"
            whatHappens="A contractor installs Grade F2 battery-only alarms in a small new-build retrofit because mains-running was considered impractical. The user removes batteries within months ('the alarm keeps beeping'). Six years later, a smouldering electrical fault produces fatal smoke; the alarms do not sound."
            doInstead="In new build, default to Grade D1 (mains + non-removable rechargeable backup). Where mains running really is impractical (some listed buildings, some short-term retrofits), Grade F1 (sealed 10-year battery) — never F2. The 10-year sealed cell is the engineering response to the 'removed battery' failure mode. Specifying F2 in a normal job in 2026 is poor practice; the standard contemplates F2 for very limited use."
          />

          <CommonMistake
            title="Treating common parts of a residential block as BS 5839-6"
            whatHappens="A contractor takes on a refurbishment of a 12-flat residential block. Inside the flats, BS 5839-6 Grade D1 LD2. The contractor extends the same approach to the common parts (stair, lobby, corridor) — Grade D1 alarms wherever convenient, no panel, no zoning, no MCPs. The fire risk assessment picks it up: common parts are non-domestic and require BS 5839-1, typically Cat L5 or M with proper panel architecture, zoning, MCPs at exits, ARC connection. The Grade D1 alarms in common parts are a serious non-compliance."
            doInstead="The boundary is the flat entrance door. BS 5839-6 inside the flat. BS 5839-1 outside. Different standards, different architectures, different design language. A residential block project always engages both — the contractor must design for both, with the cause-and-effect at the flat entrance door explicitly considered (typically: alarm in flat does not propagate to common parts; alarm in common parts does not necessarily propagate into flats — depends on the fire strategy)."
          />

          <Scenario
            title="The 6-bed HMO conversion in a Victorian terrace"
            situation="A 3-storey Victorian terraced house is being converted to a 6-bed HMO. Each bedroom will have its own en-suite. Shared kitchen and lounge on ground floor. The local authority requires a licence. The fire alarm specification is part of the licence application. The original property has 1980s-era Grade F2 battery-only alarms — non-compliant for HMO."
            whatToDo="Specify Grade A LD1: a fire alarm panel (BS EN 54 series compliant), addressable detection in every room (smoke in bedrooms, lounge, hall, landing; heat in kitchen), MCPs at the final exit and on each storey landing, sounders / VADs distributed for full audibility / visibility, standby battery in the panel sized for 24 hours quiescent + 30 minutes alarm. Cable: red preferred per BS 5839-1:2025 cable colour guidance (the HMO common parts engage BS 5839-1 — see §7.3). Cause-and-effect documented at handover (BS 5839-1:2025 §38.1 — mandatory). ARC connection — 2025 unacceptable-variation policy strongly suggests this for supported / HMO occupation. Logbook — Annex H (BS 5839-1:2025) plus weekly tests, monthly checks, 5-7 month service intervals. Coordinate with the local authority HMO licence team; the fire alarm specification will be a licence condition."
            whyItMatters="HMO licensing is unforgiving. A defective fire alarm specification stops the licence; an under-spec system after licence triggers enforcement and prosecution. The 6-bed Victorian conversion is a textbook Grade A LD1 case, and the contractor who turns up with Grade D1 LD2 (a family-dwelling specification) is at the wrong specification level. Read the licence conditions; design to them; document the design decisions in a written design statement that the local authority can review."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-6:2019+A1:2020 — domestic code of practice. Inside dwellings only. Boundary with BS 5839-1 = flat entrance door.',
              'Six grades after 2020: A (panel), C (central control + integral standby), D1 (mains + non-removable rechargeable), D2 (mains + user-replaceable), F1 (battery, sealed 10-yr), F2 (battery, user-replaceable). Grades B and E REMOVED.',
              'Three categories: LD1 (full coverage), LD2 (escape + high-risk; new-build standard), LD3 (escape only; retrofit minimum).',
              'England (ADB Vol 1) — typical new build: Grade D1 LD2. Smoke on every storey + heat in kitchen + smoke in principal habitable.',
              'Scotland (post-Cameron House, Feb 2022) — interlinked alarms in EVERY room + heat in kitchen + CO where fixed combustion. ALL homes (rented + owner-occupied).',
              'Wales — Renting Homes Wales Act framework; tighter than England, lighter than Scotland.',
              'Northern Ireland — own Building Regs and HMO regulations.',
              'Interlinking — hard-wired (extra core) or RF (wireless mesh). Both BS 5839-6 recognised. RF preferred in retrofit; hard-wired in new build.',
              'Carbon monoxide — BS EN 50291 product standard. CO alarm in any room with fixed combustion appliance other than gas cooker (per jurisdiction).',
              'HMOs — typically Grade A LD1. Local authority HMO licence sets formal requirement.',
              'Coordinate BS 5839-6 (inside flats) with BS 5839-1 (common parts) at flat entrance door. Cause-and-effect explicitly addresses the boundary.',
              'A4:2026 BS 7671 cross-reference: §560 special locations (safety services) governs the electrical install of fire alarm circuits in dwellings. AFDD considerations per the 2026 update may apply to general circuits in dwellings — does not affect dedicated fire alarm circuits but affects shared-supply scenarios.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Does Grade D1 LD2 satisfy the Scottish Tolerable Standard?',
                answer:
                  'No. Grade D1 LD2 covers escape routes plus high-risk rooms (kitchen + principal habitable). The Scottish standard requires interlinked alarms in every room (with bathroom / toilet exceptions). LD2 is significantly less coverage than the Scottish requirement. For a Scottish dwelling, the equivalent would be approximately Grade D1 LD1 (with all habitable rooms covered) or Grade F1 with similar coverage — not LD2.',
              },
              {
                question: 'Are old-style ionisation smoke alarms still compliant?',
                answer:
                  'BS 5839-6 does not exclude ionisation alarms; both ionisation and optical (photoelectric) smoke alarms are recognised. However, modern practice strongly favours optical (photoelectric) for general smoke detection in dwellings — better response to smouldering fires (the predominant residential fire mode in furnished rooms), less prone to nuisance alarms from cooking. Ionisation alarms remain in use but most retrofits replace with optical or multi-sensor. For new build, optical or multi-sensor is the practical default.',
              },
              {
                question:
                  'Can I retrofit a Scottish-compliant system to a 1960s house with no useful supply runs?',
                answer:
                  'Yes — RF interlink with Grade F1 (sealed 10-year battery) alarms is the practical solution. Each alarm is battery-only with a 10-year sealed cell; alarms are paired wirelessly into a mesh; the system meets the Scottish requirement (interlinked + every room + heat in kitchen + CO where applicable) without needing mains running. The cost is higher than mains-powered new-build but considerably lower than retrofitting cabling. The 10-year sealed cell removes the user-replacement failure mode.',
              },
              {
                question:
                  'What is the boundary between BS 5839-6 and BS 5839-1 in a residential block?',
                answer:
                  "The flat entrance door. Inside the flat = BS 5839-6 (typically Grade D1 LD2 for new build). Outside the flat (corridor, stair, lobby) = BS 5839-1 (typically Cat L5 or Cat M depending on building height, occupancy and fire strategy). The door itself is part of compartmentation — the Fire Safety Act 2021 confirmed flat entrance doors are within RRO scope. The cause-and-effect at this boundary needs explicit consideration: in a 'stay-put' fire strategy, the flat alarm does not necessarily trigger the common parts alarm and vice versa.",
              },
              {
                question: 'What does "interlinked" mean in practice?',
                answer:
                  'When any alarm in the system detects fire, ALL alarms in the system sound. Achieved by hard-wired interlink (extra core in supply cable carrying signal voltage between alarms) or RF interlink (wireless mesh). The requirement exists because, in a multi-room dwelling, an alarm only at the point of fire origin may not wake or alert occupants in remote bedrooms — particularly in larger or multi-storey homes. Interlinking ensures whole-dwelling audibility.',
              },
              {
                question:
                  'Carbon monoxide alarms in dwellings — is the requirement just for boilers?',
                answer:
                  "No — broader. The English Smoke and Carbon Monoxide Alarm (England) Regulations 2015 as amended 2022 require a CO alarm in any room with a fixed combustion appliance other than a gas cooker. This includes boilers (gas, oil), fixed gas fires, solid fuel stoves, biomass boilers, oil heaters. Excluded: gas cookers (technical reasoning is that cookers produce CO during cooking but the user is normally present). Scotland's Tolerable Standard has the same scope. Wales similar. The CO alarm is in the room with the appliance, not centrally located.",
              },
              {
                question: 'Why were Grades B and E removed from BS 5839-6 in 2020?',
                answer:
                  'Grade B (system using non-addressable detectors with central control) had largely fallen out of use — the architecture was an awkward middle ground between Grade A (full panel) and Grade D (per-detector mains+backup); modern equipment naturally falls into one of those categories or Grade C (central control + mains detectors + integral standby). Grade E was a legacy split that pre-dated the D1/D2 distinction; the 2020 revision replaced it with the cleaner D1/D2 architecture. Result: simpler, six-grade family that better reflects current product types.',
              },
              {
                question: 'For a loft conversion, what fire alarm requirement applies?',
                answer:
                  'Approved Document B Vol 1 §2 covers loft conversions in single-family dwellings. The principal fire alarm requirement: interlinked smoke alarms on EVERY storey including the new converted storey. Typically Grade D1 with category appropriate to the dwelling type (LD2 standard, LD3 minimum). The conversion triggers ADB compliance for the new work; the existing dwelling alarms must be brought into the new interlinked system. Competent person scheme route (BAFE SP203-1) applies — the registered fire alarm installer can self-certify the new alarm work.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="BS 5839-6 requirements — Module 7.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Course end <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Course landing
              </div>
            </button>
          </div>

          <div className="hidden">
            <Home />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule7Section4;
