import { ArrowLeft, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';
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
    id: 'elm6-s2-rro14',
    question: 'RRO 2005 Article 14 — what does it require of escape routes?',
    options: [
      'They must be adequately illuminated — Article 14(2)(h) requires emergency lighting of adequate intensity where the route requires illumination if the normal lighting fails.',
      'They must be marked with photoluminescent way-finding signage along the full length of the route, which Article 14 treats as the primary safeguard so that emergency lighting becomes optional where signage is provided.',
      'They must be a minimum of 1 metre clear width throughout, with the dimension fixed by Article 14 itself rather than being a function of the occupancy capacity calculated in the fire risk assessment.',
      'They must be provided with directional exit signs only, since Article 14 requires the routes to be identified and kept clear but leaves the question of illuminating them entirely to BS 5266-1.',
    ],
    correctIndex: 0,
    explanation:
      'RRO 2005 Article 14(2)(h) is the headline emergency lighting obligation. It does not specify lux levels — those come from BS 5266-1 / BS EN 1838 — but it imposes the duty. Failure to meet "adequate" exposes the responsible person to enforcement and prosecution under Articles 32 and 33.',
  },
  {
    id: 'elm6-s2-rro17',
    question: 'RRO 2005 Article 17 imposes which on-going obligation?',
    options: [
      'A single annual inspection of the installation, after which the emergency lighting is taken to be compliant for the following year with no duty to test or check it in the intervening months.',
      'Wholesale replacement of every emergency luminaire on a fixed five-year cycle, on the basis that the battery life assumed in the design is the trigger for the continuing obligation under the Order.',
      'Maintenance in efficient working order — equipment including emergency lighting must be kept under a suitable system of maintenance and in good repair.',
      'Maintaining adequate insurance cover for the premises, so that the continuing obligation is satisfied by transferring the financial risk of a fire rather than by physically keeping the equipment working.',
    ],
    correctIndex: 2,
    explanation:
      'RRO 2005 Article 17 turns the design obligation (Article 14) into an ongoing operational obligation: facilities, equipment and devices (including emergency lighting) must be subject to a suitable system of maintenance and maintained in an efficient state and good repair. The maintenance regime under BS 5266-1 / BS EN 50172 — monthly functional, annual duration, 5-year photometric — implements Article 17 in technical terms.',
  },
  {
    id: 'elm6-s2-fsa2021',
    question: 'The Fire Safety Act 2021 clarified the RRO scope. What did it add?',
    options: [
      'A new set of maintained illuminance levels for escape routes, raising the BS EN 1838 minima and writing them into primary legislation for the first time so they apply directly to residential common parts.',
      'A complete replacement of the RRO 2005 with a single consolidated fire safety statute, repealing the Order and re-enacting its duties for both workplaces and multi-occupied residential buildings.',
      'A new stand-alone criminal offence of failing to provide emergency lighting in the common parts of a block of flats, separate from the existing Article 32 offences under the Order.',
      'Explicit confirmation that the RRO 2005 applies to the external walls, balconies, flat entrance doors and structure of multi-occupied residential buildings.',
    ],
    correctIndex: 3,
    explanation:
      'The Fire Safety Act 2021 was a clarifying amendment, not a replacement. It removed doubt about RRO scope in residential buildings — the external walls and flat entrance doors are now expressly within the RP\'s fire safety duty. Emergency lighting in stairs, lobbies and corridors of blocks of flats is firmly within the regime.',
  },
  {
    id: 'elm6-s2-bsa2022',
    question: 'The Building Safety Act 2022 introduced a new regulatory regime for "higher-risk buildings". What is the threshold?',
    options: [
      'Residential buildings of at least 18 m or at least 7 storeys, with at least 2 residential units.',
      'Any building open to the public, regardless of height or use, on the basis that the higher-risk regime was designed to capture every premises where large numbers of people might be present.',
      'Only buildings over 100 m in height, so that the safety case and Accountable Person duties are reserved for genuine super-tall towers rather than ordinary high-rise residential blocks.',
      'Only industrial and commercial buildings of significant size, with residential blocks left to the RRO 2005 alone and outside the new Building Safety Regulator regime entirely.',
    ],
    correctIndex: 0,
    explanation:
      'The BSA 2022 HRB regime is the post-Grenfell statutory framework for the highest-risk residential buildings. Emergency lighting in HRBs sits within the safety case — its design, commissioning, maintenance and verification must be documented as part of the building\'s safety evidence and accessible to the BSR on demand.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which Article of the RRO 2005 is the headline emergency lighting obligation?',
    options: [
      'Article 8 — the general duty to take general fire precautions. Because this is the broadest safety duty placed on the responsible person, it is read as carrying the specific obligation to provide emergency lighting for escape routes and exits.',
      'Article 14 — Emergency routes and exits, specifically Article 14(2)(h), requiring emergency lighting of adequate intensity where a route needs illumination if the normal supply fails.',
      'Article 9 — the fire risk assessment duty. Since the FRA is what decides whether emergency lighting is needed and to what extent, this is treated as the operative emergency lighting clause from which the design flows.',
      'Article 13 — fire-fighting and fire detection. As this Article requires appropriate equipment and detectors for the premises, the provision of emergency lighting to support evacuation is read in as part of the same duty.',
    ],
    correctAnswer: 1,
    explanation:
      'RRO 2005 Article 14(2)(h) is the operative clause. It establishes the duty, leaves the technical definition of "adequate" to the relevant code of practice, and exposes the responsible person to enforcement under Articles 32-33 for failure.',
  },
  {
    id: 2,
    question:
      'RRO 2005 Article 17 imposes a continuing obligation. What is it, and how does it interact with BS 5266-1?',
    options: [
      'A single annual inspection by the responsible person, after which the emergency lighting is deemed compliant for the following twelve months with no interim obligation between yearly checks.',
      'Provision of public liability and buildings insurance covering the premises, on the basis that adequate cover for fire loss discharges the responsible person\'s continuing duty for the installed safety systems.',
      'Periodic recertification of the original installation by a registered electrician, repeated each time the premises change hands so the certificate always reflects the current responsible person.',
      'Maintenance in efficient working order — facilities and equipment including emergency lighting must be kept under a suitable system of maintenance and in good repair.',
    ],
    correctAnswer: 3,
    explanation:
      'Article 17 turns design compliance into operational compliance. Emergency lighting must work, not just have been installed. The maintenance regime — monthly functional, annual duration, 5-year photometric — is how the duty is practically discharged.',
  },
  {
    id: 3,
    question: 'Penalties under RRO 2005 — what is the maximum on conviction on indictment?',
    options: [
      'An unlimited fine only — the Order allows the Crown Court to impose a financial penalty of any size, but it has no power to imprison an individual duty holder for a fire safety failure under the Order.',
      'A fixed statutory maximum fine of £20,000 per offence with no custodial option, mirroring the cap that applied to many health-and-safety summary offences before the limits were lifted.',
      'An unlimited fine and/or imprisonment for up to 2 years under Article 32, where the failure puts relevant persons at risk of death or serious injury.',
      'Imprisonment of up to 6 months and/or a level 5 fine — the same penalty that applies to a summary conviction, on the basis that the Order sets one penalty for both routes of trial.',
    ],
    correctAnswer: 2,
    explanation:
      'RRO 2005 Article 32 sets out the offences and penalties. Conviction on indictment carries unlimited fine and/or 2 years imprisonment where life-safety risk is present. Emergency lighting failure leading to a fatal evacuation difficulty has put duty holders before the Crown Court.',
  },
  {
    id: 4,
    question:
      'What did the Fire Safety Act 2021 add to the RRO 2005?',
    options: [
      'Express confirmation that the RRO 2005 applies to the structure, external walls, balconies, flat entrance doors and common parts of buildings with two or more domestic premises.',
      'A new minimum maintained illuminance of 1 lux on every escape route, raising the figure previously recommended in BS 5266-1 and writing it into primary legislation for the first time for residential blocks.',
      'A full replacement of the RRO 2005 with a consolidated single fire safety statute, repealing the Order and re-enacting its duties in updated form for both workplaces and residential buildings.',
      'A mandatory two-yearly emergency lighting duration test in the common parts of all blocks of flats, replacing the previous annual test interval set out in the supporting British Standards.',
    ],
    correctAnswer: 0,
    explanation:
      'The Fire Safety Act 2021 is short — it is essentially a clarifying amendment to the RRO. Its effect on emergency lighting is indirect but important: there is now no legal argument that emergency lighting in stairs, lobbies and corridors of blocks of flats is outside the RP\'s duty. It is in.',
  },
  {
    id: 5,
    question: 'The Building Safety Act 2022 introduced higher-risk buildings (HRBs). What is the threshold?',
    options: [
      'Any residential building containing two or more flats, regardless of its height or number of storeys, on the basis that the post-Grenfell regime was intended to capture the whole multi-occupied residential stock.',
      'Residential buildings of at least 30 m in height AND at least 10 storeys, with the two conditions required together so that only genuine tall towers fall within the Accountable Person and safety case regime.',
      'Residential buildings of at least 11 m in height or at least 4 storeys, aligning the higher-risk threshold with the height at which sprinklers and second staircases become a design consideration.',
      'Residential buildings at least 18 m in height or at least 7 storeys, containing at least 2 residential units.',
    ],
    correctAnswer: 3,
    explanation:
      'The BSA 2022 HRB threshold is ≥ 18 m OR ≥ 7 storeys, with ≥ 2 residential units — the height-or-storey test is OR, not AND. The regime imposes the Accountable Person duty holder, the safety case, the golden thread of digital information and Building Safety Regulator oversight. Emergency lighting in HRBs forms part of the safety case the Accountable Person must build and maintain.',
  },
  {
    id: 6,
    question: 'Approved Document B (Volume 2) — where is emergency lighting addressed?',
    options: [
      'Section 1 — Means of warning. Because escape lighting supports the warning and alerting of occupants, the emergency lighting requirements are dealt with alongside the fire detection and alarm provisions rather than under means of escape.',
      'Section 5 — Means of escape. ADB Volume 2 §5 sets out where emergency lighting is required by the Building Regulations, cross-referencing BS 5266-1 for the technical detail.',
      'An informative annex only. Approved Document B treats emergency lighting as supplementary guidance, so it appears in an appendix that points to BS 5266-1 rather than forming part of the main escape provisions.',
      'It is not addressed in Approved Document B at all. Emergency lighting is left entirely to the RRO 2005 and BS 5266-1, with the Building Regulations silent on when escape lighting must be provided.',
    ],
    correctAnswer: 1,
    explanation:
      'Approved Document B Volume 2 §5 (Means of escape) specifies where emergency lighting is required by the Building Regulations. It cross-references BS 5266-1 for the technical detail. The Building Regulations regime catches new buildings and material alterations; the RRO regime catches occupied buildings throughout their life.',
  },
  {
    id: 7,
    question: 'BS 9999:2017 — what role does it play in emergency lighting design?',
    options: [
      'It is the primary emergency lighting standard — BS 9999 sets the maintained illuminance levels, duration and luminaire spacing for escape routes, and BS 5266-1 simply repeats those figures for installers.',
      'It is the product standard for emergency luminaires, defining the construction, battery, charger and self-test requirements that an individual fitting must meet before it can be installed on an escape route.',
      'BS 9999 is the Code of Practice for fire safety in building design, management and use — a strategic document that may set requirements exceeding the BS 5266-1 / EN 1838 minima.',
      'It applies to dwellings only — BS 9999 covers fire safety in individual houses and flats, while BS 5266-1 covers the commercial and assembly buildings where emergency lighting is normally required.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 9999:2017 is the strategic fire safety code; BS 5266-1 / EN 1838 is the emergency lighting code. BS 9999 informs the brief; BS 5266-1 implements the lighting brief. Where BS 9999 calls for a higher standard than the minima — for example, longer duration or faster switch-on — the higher standard applies.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 (fire alarm) cross-references emergency lighting in what context?',
    options: [
      'Cause-and-effect — emergency lighting actions can appear in the fire alarm cause-and-effect, with the two systems remaining separate but their interactions documented.',
      'Shared battery only — the only recognised link is that BS 5839-1 permits both systems to draw from a single common standby battery sized for both loads.',
      'Combined system — BS 5839-1:2025 now treats fire detection and emergency lighting as one integrated life-safety system under a single standard.',
      'No cross-reference — BS 5839-1 deals only with fire detection and makes no reference to emergency lighting at all.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1 and BS 5839-1 describe two separate safety services that often share infrastructure and respond together. Some installations include emergency lighting actions (early activation, refuge-call lighting, high-risk task lighting activation) in the fire alarm cause-and-effect, and common power-supply infrastructure (UPS, central battery) and monitoring may be shared. The cause-and-effect document records the interactions; it matters at design and is verified at commissioning.',
  },
  {
    id: 9,
    question: 'Which UK enforcement body audits emergency lighting against the RRO 2005?',
    options: [
      'The Health and Safety Executive (HSE), as the lead enforcing authority for the RRO, using its inspectors to audit emergency lighting in the same way it enforces workplace health and safety law.',
      'The Fire and Rescue Service for the area, typically through the Fire Safety inspecting officer, with powers under Article 27 to inspect and serve enforcement and prohibition notices.',
      'Local Authority Building Control (LABC), which signs off the installation at construction and then returns periodically in occupation to audit the emergency lighting against the RRO during the building\'s life.',
      'The certification scheme operator (such as NICEIC or NAPIT) under which the installing contractor is registered, auditing the emergency lighting as part of its routine assessment of the contractor\'s work.',
    ],
    correctAnswer: 1,
    explanation:
      'The FRS is the primary RRO enforcement body. The BSR (within the HSE structure) oversees HRBs under the Building Safety Act 2022. Local Authority Building Control oversees Building Regulations compliance at construction. Multiple bodies have overlapping interest in the same installation.',
  },
  {
    id: 10,
    question: 'A commercial building has had its fire risk assessment, but the emergency lighting was designed before the FRA was commissioned. Is this compliant?',
    options: [
      'Compliant — the order in which the design and the fire risk assessment were produced does not matter, provided both documents exist and are held on file for the premises when the FRS inspects.',
      'Compliant, provided the installed luminaires achieve at least 1 lux on the centre line of every escape route, since meeting the BS EN 1838 illuminance minimum is what determines compliance.',
      'Compliant, provided the design was carried out to BS 5266-1, because following the emergency lighting code of practice is itself sufficient evidence that the installation meets the legal duty.',
      'Non-compliant — the emergency lighting design must be derived from the FRA, so a design that pre-dates it must be revisited against the FRA outputs.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1:2025 §5 makes the FRA-to-design relationship explicit. The FRA identifies escape routes, high-risk areas, sleeping risk, refuges and the place of ultimate safety, and the emergency lighting provides for each. A design that pre-dates or ignores the FRA fails the §5 requirement and the underlying RRO Article 9 (risk assessment) duty. The design must be revisited against the FRA outputs and adjusted.',
  },
];

const EmergencyLightingModule6Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'EL integration with fire safety regs | Emergency Lighting Module 6.2 | Elec-Mate',
    description:
      'RRO 2005 Articles 14, 17, 23, 32 + Fire Safety Act 2021 + Building Safety Act 2022 + Approved Document B + BS 9999 + BS 5839-1:2025. The legislative chain that makes emergency lighting a legal obligation, and the enforcement bodies that audit it.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() =>
              navigate('/electrician/upskilling/emergency-lighting-module-6')
            }
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2"
            title="Integration with fire safety regulations"
            description="Emergency lighting is not a stand-alone obligation. It sits inside a chain of fire safety legislation — the Health and Safety at Work etc. Act 1974, the Regulatory Reform (Fire Safety) Order 2005, the Fire Safety Act 2021, the Building Safety Act 2022, the Building Regulations and the supporting British Standards. This section walks the chain and shows how the duties interlock."
            tone="yellow"
          />

          <TLDR
            points={[
              'HSAW 1974 — the parent statute. General duty to ensure health and safety of employees and others affected. Emergency lighting in workplaces is an HSAW duty.',
              'RRO 2005 — the operative fire safety regulation. Article 14(2)(h): emergency lighting of adequate intensity. Article 17: maintenance in efficient working order. Article 9: fire risk assessment. Article 32: penalties (unlimited fine + 2 years on indictment).',
              'Fire Safety Act 2021 — clarified RRO scope post-Grenfell. Confirms RRO covers external walls, balconies, flat entrance doors and common parts of buildings with ≥ 2 sets of domestic premises.',
              'Building Safety Act 2022 — created the higher-risk building regime (≥ 18 m OR ≥ 7 storeys + ≥ 2 residential units). Accountable Person, safety case, golden thread, Building Safety Regulator (BSR).',
              'Building Regulations Approved Document B Volume 2 §5 — where emergency lighting is required by the Building Regulations at new build or material alteration. Cross-references BS 5266-1.',
              'BS 9999:2017 — the strategic fire safety code (design, management, use). Emergency lighting is one element of the integrated fire-engineered solution.',
              'BS 5839-1:2025 (fire alarm) cross-link — cause-and-effect, refuge lighting, common power infrastructure. Documented at design and verified at commissioning.',
              'Enforcement — Fire and Rescue Service (RRO), BSR (HRBs), HSE (workplace overlap), Local Authority Building Control (Building Regulations). Notices: alterations, enforcement, prohibition.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the legal chain that makes emergency lighting a statutory obligation: HSAW 1974 → RRO 2005 → Fire Safety Act 2021 → Building Safety Act 2022 → Building Regulations',
              'Apply RRO 2005 Article 14(2)(h) to identify the duty to provide emergency lighting of adequate intensity',
              'Apply RRO 2005 Article 17 to identify the maintenance duty and link it to the BS 5266-1 / BS EN 50172 maintenance regime',
              'Identify the RRO 2005 Article 32 penalty regime — unlimited fine and / or 2 years imprisonment on indictment — and the circumstances triggering it',
              'Apply the Fire Safety Act 2021 to multi-occupied residential buildings and identify the RP duty for emergency lighting in common parts',
              'Apply the Building Safety Act 2022 HRB threshold (≥ 18 m OR ≥ 7 storeys + ≥ 2 residential units) and identify the Accountable Person duty for emergency lighting evidence within the safety case',
              'Cross-reference Approved Document B Volume 2 §5 (Building Regulations) with BS 5266-1 (occupancy regime)',
              'Apply BS 9999:2017 to identify where the building strategy may require an emergency lighting standard exceeding the BS 5266-1 / EN 1838 minima',
              'Identify the enforcement bodies (FRS, BSR, HSE, LABC) and the notices each can serve',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The legal chain — top to bottom</ContentEyebrow>

          <ConceptBlock
            title="From HSAW to BS 5266-1"
            plainEnglish="UK fire safety law is a chain. At the top is primary legislation — Acts of Parliament. Beneath that are statutory instruments (Orders, Regulations) made under the Acts. Beneath those are Approved Documents (the practical guidance to the Building Regulations) and supporting British Standards (the codes of practice and product standards). Each layer adds detail; each derives its authority from the layer above. Emergency lighting sits across all four layers: an HSAW general duty, an RRO specific duty, a Building Regulations design specification, and a BS 5266-1 code of practice."
            onSite="Lawyers and inspectors talk in terms of the legal chain. Engineers talk in terms of BS 5266-1 numbers. Both are correct — they are different layers of the same regulatory stack. A design that satisfies BS 5266-1 satisfies the chain; a design that fails BS 5266-1 fails the chain unless an evidenced equivalent is shown."
          >
            <p>The four layers, top to bottom:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Primary legislation (Acts of Parliament).</strong> HSAW 1974, Fire Safety
                Act 2021, Building Safety Act 2022. Each is an Act of Parliament passed at
                Westminster. They impose general duties and create offences.
              </li>
              <li>
                <strong>Secondary legislation (Statutory Instruments).</strong> RRO 2005 (made under
                HSAW), the Building Regulations 2010 (made under the Building Act 1984), the
                Building Safety Regulations under BSA 2022. Each is a Statutory Instrument with
                detailed binding provisions.
              </li>
              <li>
                <strong>Approved Documents.</strong> Approved Document B Volume 2 (means of escape
                in non-dwellings), other Approved Documents under the Building Regulations.
                Approved Documents are not statute but are the recognised practical guidance — they
                tell you how to comply with the binding Regulations.
              </li>
              <li>
                <strong>British Standards / Codes of Practice.</strong> BS 5266-1:2025, BS EN
                1838:2024, BS EN 50172:2024, BS 9999:2017, BS 5839-1:2025. Codes of practice and
                product standards. Not statute, but the technical means by which the higher-layer
                duties are typically met.
              </li>
            </ul>
            <p>
              The chain is hierarchical. A British Standard cannot reduce a statutory obligation;
              it can only describe how to meet or exceed it. A design departing from BS 5266-1
              must still meet the underlying RRO Article 14 duty, demonstrated by evidence-based
              risk assessment.
            </p>
          </ConceptBlock>

          {/* Legislation chain diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              UK fire safety legislation chain — emergency lighting obligations
            </h4>
            <svg
              viewBox="0 0 820 660"
              className="w-full h-auto"
              role="img"
              aria-label="UK fire safety legislation chain. HSAW 1974 at the top, leading to RRO 2005, then the Fire Safety Act 2021 and Building Safety Act 2022 amendments, the Building Regulations / Approved Document B, and the supporting British Standards (BS 5266-1, BS EN 1838, BS EN 50172, BS 9999, BS 5839-1). Emergency lighting provisions flagged at each level."
            >
              {/* Top layer — primary legislation */}
              <rect
                x="60"
                y="30"
                width="700"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2.4"
              />
              <text x="410" y="56" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                PRIMARY LEGISLATION
              </text>
              <text x="200" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                HSAW 1974
              </text>
              <text x="200" y="96" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                General duty of care
              </text>
              <text x="410" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Fire Safety Act 2021
              </text>
              <text x="410" y="96" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                RRO scope clarified
              </text>
              <text x="620" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Building Safety Act 2022
              </text>
              <text x="620" y="96" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                HRB regime + BSR
              </text>

              {/* Arrow down */}
              <line x1="410" y1="110" x2="410" y2="140" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <polygon points="410,140 405,132 415,132" fill="rgba(255,255,255,0.35)" />

              {/* Layer 2 — secondary legislation */}
              <rect
                x="60"
                y="150"
                width="700"
                height="100"
                rx="10"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              <text x="410" y="176" textAnchor="middle" fill="#22D3EE" fontSize="13" fontWeight="bold">
                SECONDARY LEGISLATION (Statutory Instruments)
              </text>
              <text x="200" y="200" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                RRO 2005
              </text>
              <text x="200" y="216" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Art. 14 — adequate EL
              </text>
              <text x="200" y="230" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Art. 17 — maintenance
              </text>
              <text x="200" y="244" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Art. 32 — penalties
              </text>
              <text x="410" y="200" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Building Regulations 2010
              </text>
              <text x="410" y="216" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                B1 — means of warning
              </text>
              <text x="410" y="230" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                + means of escape
              </text>
              <text x="620" y="200" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Building Safety Regs
              </text>
              <text x="620" y="216" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Safety case
              </text>
              <text x="620" y="230" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Golden thread
              </text>

              <line x1="410" y1="250" x2="410" y2="280" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <polygon points="410,280 405,272 415,272" fill="rgba(255,255,255,0.35)" />

              {/* Layer 3 — Approved Documents */}
              <rect
                x="60"
                y="290"
                width="700"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="2"
              />
              <text x="410" y="316" textAnchor="middle" fill="#A855F7" fontSize="13" fontWeight="bold">
                APPROVED DOCUMENTS — practical guidance
              </text>
              <text x="200" y="340" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Approved Doc B Vol 2
              </text>
              <text x="200" y="356" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                §5 Means of escape
              </text>
              <text x="410" y="340" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Approved Doc B Vol 1
              </text>
              <text x="410" y="356" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Dwellinghouses
              </text>
              <text x="620" y="340" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Approved Doc M
              </text>
              <text x="620" y="356" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Access — refuges
              </text>

              <line x1="410" y1="370" x2="410" y2="400" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <polygon points="410,400 405,392 415,392" fill="rgba(255,255,255,0.35)" />

              {/* Layer 4 — British Standards */}
              <rect
                x="60"
                y="410"
                width="700"
                height="120"
                rx="10"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <text x="410" y="436" textAnchor="middle" fill="#22C55E" fontSize="13" fontWeight="bold">
                BRITISH STANDARDS / CODES OF PRACTICE
              </text>
              <text x="160" y="460" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                BS 5266-1:2025
              </text>
              <text x="160" y="476" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                EL Code of Practice
              </text>
              <text x="320" y="460" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                BS EN 1838:2024
              </text>
              <text x="320" y="476" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Illuminance levels
              </text>
              <text x="490" y="460" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                BS EN 50172:2024
              </text>
              <text x="490" y="476" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                System requirements
              </text>
              <text x="660" y="460" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                BS 9999:2017
              </text>
              <text x="660" y="476" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Fire safety strategy
              </text>
              <text x="240" y="504" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                BS 5839-1:2025 — fire alarm cause-and-effect
              </text>
              <text x="580" y="504" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                BS 7671:2018 +A4:2026 §560
              </text>
              <text x="240" y="520" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                EL switch-on integration
              </text>
              <text x="580" y="520" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Wiring of safety services
              </text>

              {/* Enforcement bodies */}
              <rect
                x="60"
                y="554"
                width="700"
                height="86"
                rx="10"
                fill="rgba(239,68,68,0.08)"
                stroke="rgba(239,68,68,0.45)"
                strokeWidth="1.6"
              />
              <text x="410" y="578" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
                ⚠ ENFORCEMENT BODIES
              </text>
              <text x="160" y="600" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Fire and Rescue Service
              </text>
              <text x="160" y="616" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                RRO Art. 27
              </text>
              <text x="160" y="630" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Notices, prosecution
              </text>
              <text x="320" y="600" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                BSR (HSE)
              </text>
              <text x="320" y="616" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BSA 2022 — HRBs
              </text>
              <text x="320" y="630" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Safety case
              </text>
              <text x="490" y="600" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                HSE
              </text>
              <text x="490" y="616" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                HSAW 1974
              </text>
              <text x="490" y="630" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Workplace overlap
              </text>
              <text x="660" y="600" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                LABC
              </text>
              <text x="660" y="616" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Building Regs
              </text>
              <text x="660" y="630" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                At construction
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>RRO 2005 — the operative regulation</ContentEyebrow>

          <ConceptBlock
            title="Article 14 — the duty to provide emergency lighting"
            plainEnglish="Article 14 of the RRO is the headline emergency lighting clause. It sits within the broader 'fire safety duty' Articles (8 to 22) that define what the Responsible Person (RP) must do. Article 14(2)(h) states that emergency routes and exits requiring illumination must be provided with emergency lighting of adequate intensity in case the lighting fails. The duty is on the RP — typically the employer in workplace premises, or the person with control of the premises in non-workplace contexts. Adequate is defined in practice by BS 5266-1 / BS EN 1838:2024."
          >
            <p>How Article 14 operates:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 14(1) — general principle.</strong> The RP must ensure that routes
                to emergency exits, and the exits themselves, are kept clear at all times.
              </li>
              <li>
                <strong>Article 14(2) — specific requirements.</strong> A list of operational
                requirements — number, location, dimensions, signage, and at (h), emergency
                lighting of adequate intensity for routes / exits requiring illumination.
              </li>
              <li>
                <strong>"Adequate" defined by code of practice.</strong> The RRO does not specify
                lux levels; it relies on BS 5266-1 / BS EN 1838 to define adequate. A duty holder
                claiming compliance with Article 14(2)(h) is implicitly claiming compliance with
                the relevant British Standards unless an evidenced equivalent is provided.
              </li>
              <li>
                <strong>"Routes / exits requiring illumination" — risk assessment.</strong> Which
                routes require illumination is determined by the fire risk assessment (Article 9).
                Most non-domestic premises require emergency lighting on all escape routes; some
                small low-risk premises may not require any. The FRA decides; the design
                implements.
              </li>
              <li>
                <strong>Failure to comply.</strong> Article 32 sets out the offences — failing to
                comply with Article 14 (or any other safety provision) where it places a relevant
                person at risk of death or serious injury. Penalties: unlimited fine and / or 2
                years on indictment; level 5 fine and / or 6 months summarily.
              </li>
            </ul>
            <p>
              Article 14 is therefore the legal hook on which the entire BS 5266-1 regime hangs.
              Get the lighting wrong, and the regulator does not need to prove a BS 5266-1 breach
              — only that the lighting was inadequate, and that the inadequacy placed a person at
              risk.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RRO 2005 · Article 14(2)(h) (Emergency routes and exits)"
            clause={
              <>
                The responsible person must ensure that, where necessary in order to safeguard the
                safety of relevant persons, emergency routes and exits requiring illumination are
                provided with emergency lighting of adequate intensity in the case of failure of
                their normal lighting.
              </>
            }
            meaning="Three phrases earn close reading. 'Where necessary' — the FRA decides whether emergency lighting is needed. 'Of adequate intensity' — the British Standards define adequate (1 lx escape route, etc.). 'In the case of failure of their normal lighting' — the trigger is mains failure, but BS 5839-1:2025 cause-and-effect can also activate the lighting on fire alarm. The duty is the RP's, not the contractor's."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <ConceptBlock
            title="Article 17 — the duty to maintain"
            plainEnglish="Article 17 turns the design duty into an operational duty. Once installed, emergency lighting must be maintained — not just inspected at handover and forgotten. Article 17 requires the RP to ensure that any facilities, equipment and devices provided for fire safety are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order, and in good repair. The maintenance regime under BS 5266-1 / BS EN 50172 — monthly functional, annual duration, 5-year photometric — is the practical expression of Article 17."
          >
            <p>What Article 17 maintenance looks like in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Monthly functional test.</strong> Each luminaire energised by simulating
                supply failure; recorded as pass / fail. Catches battery failure, lamp failure,
                charger failure between annual tests.
              </li>
              <li>
                <strong>Annual full-duration test.</strong> Each luminaire tested over its rated
                duration (typically 3 h). Catches batteries that pass the monthly check but cannot
                sustain the duration.
              </li>
              <li>
                <strong>5-year photometric verification (NEW 2025).</strong> In-service measurement
                of illuminance against design. Catches LED depreciation, surface changes,
                luminaire substitution. Not a replacement for annual tests; an addition.
              </li>
              <li>
                <strong>Asset register and logbook.</strong> Each luminaire identified, tested,
                recorded. The logbook is the documentary evidence of Article 17 compliance.
              </li>
              <li>
                <strong>Remedial actions tracked to closure.</strong> A failed test is not a
                non-compliance if it is followed by prompt remediation and re-test. A failed test
                left unremediated is non-compliance with Article 17.
              </li>
              <li>
                <strong>Competent person.</strong> Maintenance must be by a competent person.
                Self-certification is permissible if the RP themselves is competent; otherwise the
                maintenance contractor's competence is the RP's protection.
              </li>
            </ul>
            <p>
              Section 4 of this module deals with the documentation regime in depth. For the
              integration question, Article 17 is the legal backbone — the documentation exists to
              prove that Article 17 is being satisfied.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RRO 2005 · Article 17 (Maintenance)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons, the
                responsible person must ensure that the premises and any facilities, equipment and
                devices provided in respect of the premises under this Order or under any other
                enactment, including any enactment repealed or revoked by this Order, are subject
                to a suitable system of maintenance and are maintained in an efficient state, in
                efficient working order and in good repair.
              </>
            }
            meaning="Three phrases earn close reading. 'Suitable system of maintenance' — there must be a regime, not ad-hoc activity. 'Efficient state, in efficient working order, in good repair' — three tests, all of which must be met. 'Including any enactment repealed' — the duty is wide; old fire-precautions-era equipment is still in scope. The regulator does not have to prove negligence — just that the equipment is not in efficient working order."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <ConceptBlock
            title="Articles 23, 27, 32 — record, audit, penalties"
            plainEnglish="Three further Articles complete the RRO emergency lighting picture. Article 23 deals with general fire precautions for employees — including information and training. Article 27 gives the FRS its powers of entry and inspection. Article 32 sets out the offences and penalties. Together they define how the RRO regime is enforced and what the consequences of non-compliance are."
          >
            <p>The three supporting Articles:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 23 — Provisions for employees.</strong> Where dangerous substances
                are present, or where the workplace presents particular risks, additional measures
                including information and training are required. Emergency lighting interacts where
                training covers the location and operation of emergency lighting controls and the
                response to its failure.
              </li>
              <li>
                <strong>Article 27 — Powers of inspectors.</strong> The FRS Fire Safety officer
                may, at any reasonable time: enter premises; carry out inspections; require the
                production of records (logbook, certificates, FRA); take samples; require persons
                to provide information. Refusal or obstruction is itself an offence under Article
                32.
              </li>
              <li>
                <strong>Article 32 — Offences and penalties.</strong> The offence: failing to
                comply with Articles 8 to 22 (the safety duties) where the failure places a
                relevant person at risk of death or serious injury. Other offences: failing to
                comply with notices (alterations, enforcement, prohibition); making false
                statements; obstructing inspectors. Penalties: summary — level 5 fine (unlimited in
                magistrates' court since 2015) and / or 6 months imprisonment; on indictment —
                unlimited fine and / or 2 years imprisonment.
              </li>
              <li>
                <strong>Notices the FRS may serve.</strong> Alterations notice (Article 29) — used
                where alterations to the building may significantly increase risk; the RP must
                notify the FRS before making the alteration. Enforcement notice (Article 30) —
                where the FRS finds non-compliance and requires specific actions within a stated
                time. Prohibition notice (Article 31) — where the FRS finds imminent risk of harm
                and prohibits further use until remedied.
              </li>
            </ul>
            <p>
              Article 32 is the consequence-of-failure clause. It is referenced when prosecuting
              after a fire that causes harm, and it carries unlimited fines that have, in some
              recent cases, exceeded £1 million. Emergency lighting failures contribute to
              prosecutions where they delay or prevent evacuation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire Safety Act 2021 — post-Grenfell clarification</ContentEyebrow>

          <ConceptBlock
            title="What the Act did"
            plainEnglish="The Fire Safety Act 2021 is a short Act of Parliament with one main effect — to clarify that the RRO 2005 applies to the structure, external walls, balconies, flat entrance doors and any common parts of buildings containing 2 or more sets of domestic premises. Before 2021, there was legal argument about whether the RRO covered the building fabric of blocks of flats; the Grenfell Tower Inquiry made clear that it should and the Act removed the doubt. For emergency lighting, the practical effect is that emergency lighting in stairs, lobbies and corridors of blocks of flats is firmly within the RP's duty under Articles 14 and 17."
          >
            <p>The practical impact for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Common parts emergency lighting in scope.</strong> Stairs, lobbies,
                corridors, communal entrance halls, plant rooms, refuse rooms — all in scope. The
                FRA must cover them; the design must comply with BS 5266-1; the maintenance must
                comply with Article 17.
              </li>
              <li>
                <strong>Flat entrance doors covered.</strong> Doors between common parts and
                individual flats are now within the RRO scope at the door itself (fire performance,
                self-closing). Emergency lighting interacts at refuge call-points and at door-side
                signage that may require illumination.
              </li>
              <li>
                <strong>External walls in scope.</strong> Where external walls form part of an
                escape route (external stairs, balcony evacuation routes), emergency lighting must
                provide for them. The Act did not change BS 5266-1, but the scope clarification
                means installations that may have been incomplete (no external escape lighting on
                balcony routes, for example) need remediation.
              </li>
              <li>
                <strong>Existing buildings caught.</strong> The Act applies to existing buildings
                from its commencement, not just new builds. RPs of blocks of flats had to revisit
                their FRAs and emergency lighting provision once the Act came into force.
              </li>
              <li>
                <strong>Interaction with BSA 2022 HRBs.</strong> Where a building also meets the
                BSA 2022 HRB threshold, both regimes apply — the RRO via the Fire Safety Act and
                the BSA HRB regime. The Accountable Person must satisfy both.
              </li>
            </ul>
            <p>
              The Act did not create new technical standards. It clarified what the RRO already
              applied to. For the duty holder, the question changed from 'is this in scope?' to
              'does this comply?' — and the BS 5266-1 / BS EN 1838 answer is the same as before.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Fire Safety Act 2021 · Section 1 (Premises to which the Order applies)"
            clause={
              <>
                The Regulatory Reform (Fire Safety) Order 2005 applies to the building or buildings
                containing two or more sets of domestic premises in respect of: the building's
                structure and external walls (including doors or windows in those walls) and any
                common parts; and any of the building's flat entrance doors. References to the
                premises under the Order include those parts.
              </>
            }
            meaning="The clarification is short but consequential. 'Two or more sets of domestic premises' — any block of flats, however small. 'Common parts' — stairs, lobbies, corridors, plant rooms; emergency lighting in all of these is in scope. 'Flat entrance doors' — interaction with refuge call-point lighting and door-side signage. The Act removed the legal argument; the duty was always there, the courts now accept it without dispute."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building Safety Act 2022 — the HRB regime</ContentEyebrow>

          <ConceptBlock
            title="Higher-risk buildings — the threshold"
            plainEnglish="The Building Safety Act 2022 created a new statutory regime for the highest-risk residential buildings in England — those at least 18 m in height OR at least 7 storeys, with at least 2 residential units. The regime is run by the Building Safety Regulator (BSR), which sits within the HSE. It imposes new duty holders (the Accountable Person and Principal Accountable Person), a safety case obligation, a 'golden thread' of digital information, and a residents' engagement strategy. Emergency lighting is part of the safety case — its design, commissioning, maintenance and verification must be evidenced and accessible to the BSR."
          >
            <p>The HRB regime in summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Threshold.</strong> ≥ 18 m OR ≥ 7 storeys, with ≥ 2 residential units. The
                threshold is OR — a 7-storey building under 18 m still qualifies; an 18 m building
                of 5 storeys still qualifies.
              </li>
              <li>
                <strong>Accountable Person (AP).</strong> The duty holder for a part of the HRB.
                Typically the building owner or freeholder for the structure and common parts; may
                be a managing agent or RMC for managed parts.
              </li>
              <li>
                <strong>Principal Accountable Person (PAP).</strong> Where there are multiple APs,
                the PAP is the one with control over the structure and external walls. The PAP
                co-ordinates the safety case across all APs.
              </li>
              <li>
                <strong>Safety case.</strong> A documented case showing how building safety risks
                are identified, mitigated and managed throughout the building's life. Emergency
                lighting evidence — design rationale, photometric calculations, commissioning
                certificates, maintenance records, 5-year verification certificates — sits within
                the safety case.
              </li>
              <li>
                <strong>Golden thread.</strong> A digital record of the building, kept up to date
                throughout its life. Emergency lighting drawings, calculations, asset register,
                logbook entries are all golden-thread items. Paper-only records are insufficient
                for HRBs.
              </li>
              <li>
                <strong>Resident engagement strategy.</strong> APs must engage with residents on
                building safety matters. Emergency lighting failures, modifications and tests
                affecting residents are within the engagement scope.
              </li>
              <li>
                <strong>Building Safety Regulator (BSR).</strong> Regulates HRBs. Powers include
                inspection, demand for information, enforcement notices, prosecution. Sits within
                the HSE structure.
              </li>
            </ul>
            <p>
              For emergency lighting, HRB designation does not change the technical standards —
              BS 5266-1 / BS EN 1838 / BS EN 50172 still apply. What it changes is the
              documentation and evidence regime. Records must be digital, accessible, current, and
              demonstrably linked to the building's safety case.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 · Section 65 (Higher-risk buildings)"
            clause={
              <>
                A "higher-risk building" means a building in England that contains at least two
                residential units, and is at least 18 metres in height or has at least 7 storeys.
                The Secretary of State may, by regulations, amend the meaning of higher-risk
                building. Provisions of the Act relating to higher-risk buildings, including the
                Accountable Person duties and the safety case regime, apply to a higher-risk
                building from the date of its registration with the regulator.
              </>
            }
            meaning="Two phrases earn close reading. 'At least 18 metres OR has at least 7 storeys' — the threshold is OR, not AND. 'At least two residential units' — single-occupancy buildings (e.g. a single house however tall) are out. The threshold catches the bulk of post-war high-rise residential and many newer mid-rise developments. Emergency lighting evidence in HRBs sits within the safety case, accessible to the BSR."
          />

          <Scenario
            title="The 22-storey block — HRB safety case audit"
            situation="A 22-storey block of flats (built 2008, 18 residential floors over 4 commercial / amenity floors) is registered as an HRB. The BSR requests evidence of emergency lighting compliance as part of a safety case audit. The block has its commissioning certificate from 2008, a maintenance contractor doing monthly tests, and an asset register on paper. The duty holder asks what is needed."
            whatToDo="Build the digital safety case package. Required: original design photometric calculations (or current re-run if the original is missing); commissioning acceptance certificate (1838 / 5266-1 compliance at handover); annual full-duration test records since commissioning; monthly functional test records (last 6 years minimum); 5-year photometric verification certificate (the most recent — required since BS 5266-1:2025); current FRA covering common parts; asset register with luminaire location, model, install date, last test, last battery replacement; maintenance contract terms; competent person register. Convert paper records to digital and migrate into the building's safety case management system. The BSR can request any of this on demand."
            whyItMatters="HRB safety case audits test documentation completeness as evidence of competent management. Missing or incomplete records are themselves a safety case failure — the BSR cannot satisfy itself that the building is safely managed without evidence. The emergency lighting evidence is one component, but a substantial one. Investing in digital documentation up-front avoids the cost of a remedial investigation later."
          />

          <CommonMistake
            title="Treating Fire Safety Act 2021 scope clarification as a paperwork-only change"
            whatHappens="The RP of a 1990s 6-storey block of flats updates the FRA after the Fire Safety Act 2021 came into force, identifying that common parts emergency lighting is in scope. They tick the box on the FRA and move on — but never look at the actual installation. The 1990s installation has emergency lighting in the entrance lobby and main stairs, but no emergency lighting on the second escape (a single corridor leading to an external stair on the gable wall). At the next FRS audit, the inspector identifies the second escape as inadequately lit. Enforcement notice. Remedial cost: £18,000 plus disruption."
            doInstead="Scope clarification means actual scope re-assessment, not paperwork acknowledgment. After the Fire Safety Act 2021 came into force, RPs of blocks of flats should have walked their buildings against the updated scope — every common part, every escape route, every external escape — and verified that emergency lighting was provided to BS 5266-1 standards. Where it was not, remediation should have been programmed. The 5-year photometric verification under BS 5266-1:2025 is the formal mechanism, but the duty existed from 2021."
          />

          <CommonMistake
            title="Confusing HRB safety case with annual FRA"
            whatHappens="An AP of a 24-storey HRB submits its annual FRA review to the BSR as the safety case for the building. The BSR rejects it as insufficient. The AP is left producing a substantive safety case under time pressure to comply with a BSR enforcement notice."
            doInstead="An FRA is one input to the safety case, not the safety case itself. The safety case is a documented case showing how all building safety risks are identified, mitigated and managed throughout the life of the building. It includes: hazard identification (FRA, structural assessment, services failure modes); mitigation (design, maintenance, monitoring); management (Accountable Person responsibilities, training, resident engagement); evidence (testing records, certifications, golden thread). Emergency lighting is one of many systems within the safety case; its evidence is part, but the FRA alone is not the case."
          />

          <SectionRule />

          <ContentEyebrow>Building Regulations + BS 9999 + BS 5839-1:2025</ContentEyebrow>

          <ConceptBlock
            title="Approved Document B Volume 2 §5 — when EL is required by Building Regs"
            plainEnglish="The Building Regulations 2010 set the requirements that buildings must meet at construction or material alteration. Approved Document B Volume 2 (buildings other than dwellinghouses) is the practical guidance to comply. §5 covers means of escape, including the circumstances in which emergency lighting is required by the Building Regulations. The technical specification cross-references BS 5266-1, but the trigger — when EL is required at all — comes from the Building Regulations, not from the BS."
          >
            <p>The Building Regulations regime for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>B1 — Means of warning and escape.</strong> The relevant Schedule 1
                requirement: 'The building shall be designed and constructed so that there are
                appropriate provisions for the early warning of fire, and appropriate means of
                escape in case of fire from the building to a place of safety outside the building
                capable of being safely and effectively used at all material times.'
              </li>
              <li>
                <strong>Approved Document B Volume 2 §5 — means of escape.</strong> Practical
                guidance on how to meet B1. §5.36 onwards (numbering varies by edition) addresses
                escape lighting — when required, where required, performance standards.
              </li>
              <li>
                <strong>Cross-reference to BS 5266-1.</strong> ADB Volume 2 §5 typically says
                'escape lighting should comply with BS 5266-1' — meaning the Building Regulations
                duty is met by following BS 5266-1. This is a one-way reference: BS 5266-1 is the
                deemed-to-satisfy means of compliance, not a separate legal requirement.
              </li>
              <li>
                <strong>Trigger — when EL is required.</strong> Triggers vary by building type,
                size, occupancy, escape distance. Larger buildings, sleeping risk buildings, places
                of assembly, and any building with significant escape distance need EL. Small,
                low-occupancy, single-storey buildings may not.
              </li>
              <li>
                <strong>Building Control sign-off at completion.</strong> The Building Control
                Body (Local Authority Building Control or Approved Inspector) checks B1 compliance
                at completion. Emergency lighting is part of this check; non-compliance prevents
                completion certification.
              </li>
              <li>
                <strong>Material alterations.</strong> A material alteration to an existing building
                — e.g. a change of use, a major refurbishment, an extension — re-engages B1.
                Emergency lighting that was compliant under the previous regime may need upgrading.
              </li>
            </ul>
            <p>
              The Building Regulations regime catches the building at construction; the RRO regime
              catches the building in occupation. Both apply throughout the life of the building,
              but Building Regulations is the active obligation only at construction or material
              alteration; the RRO is the active obligation continuously.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BS 9999:2017 — strategic fire safety"
            plainEnglish="BS 9999:2017 is the Code of Practice for fire safety in the design, management and use of buildings. It is broader than BS 5266-1 — covering evacuation strategy, fire engineering, management, and the integration of all safety services. Emergency lighting is one element. BS 9999 may set design illuminance, switch-on or duration requirements that exceed the BS 5266-1 / EN 1838 minima where the building risk profile justifies it. Designers working to BS 9999 must check that their emergency lighting brief is consistent with the strategic case set out in the BS 9999 design."
          >
            <p>Where BS 9999 affects emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Evacuation strategy.</strong> BS 9999 may specify simultaneous, phased,
                progressive horizontal, or stay-put evacuation. The strategy affects where
                emergency lighting must operate (and for how long). Phased evacuation in a
                tall building requires emergency lighting able to operate continuously over the
                phased duration, not just 3 h.
              </li>
              <li>
                <strong>Fire engineering.</strong> BS 9999 supports performance-based fire
                engineering as an alternative to prescriptive ADB compliance. Where fire
                engineering trades off one element against another (e.g. wider stairs against
                shorter travel distance), emergency lighting may need to be enhanced to support
                the engineered case.
              </li>
              <li>
                <strong>Disabled occupant provision.</strong> BS 9999 sets out the integrated
                provision for disabled occupants — refuges, evacuation lifts, communication. The
                emergency lighting in refuges, refuge call-points and evacuation lift lobbies must
                support the integrated case.
              </li>
              <li>
                <strong>Management plan.</strong> BS 9999 expects a written fire safety management
                plan. The emergency lighting maintenance regime, test cycles, and remediation
                processes are part of this plan.
              </li>
              <li>
                <strong>Higher-than-minimum.</strong> Where BS 9999 calls for a higher standard of
                emergency lighting than the BS 5266-1 / EN 1838 minimum (longer duration, higher
                illuminance, faster switch-on), the higher standard applies. The minimum is just
                that — a floor.
              </li>
            </ul>
            <p>
              In simpler buildings, BS 9999 is informational; the design proceeds to ADB and
              BS 5266-1. In complex or fire-engineered buildings, BS 9999 is the strategic
              backbone; emergency lighting is one workstream within it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BS 5839-1:2025 cross-link"
            plainEnglish="The fire alarm code of practice BS 5839-1:2025 is a parallel code to BS 5266-1. The two systems — fire alarm and emergency lighting — are independent for fault tolerance reasons but interact at the cause-and-effect level. The 2025 edition of BS 5839-1 reaffirms the cause-and-effect document as the integration point. For larger or higher-risk buildings, the cause-and-effect document records: which fire alarm zones / detectors trigger which actions; whether those actions include emergency lighting events (early activation, refuge lighting, high-risk task lighting); how the systems share infrastructure (UPS, central battery); and how testing is co-ordinated."
          >
            <p>Where BS 5266-1 and BS 5839-1:2025 interlock:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Early activation on fire alarm.</strong> Some installations switch
                emergency lighting from normal-mode to emergency-mode on fire alarm activation,
                ahead of any mains failure. Ensures full output at the moment of evacuation.
                Documented in cause-and-effect.
              </li>
              <li>
                <strong>Refuge call-point lighting.</strong> Refuges typically have a fire alarm
                call-point or equivalent communication. The emergency lighting must illuminate the
                call-point area — vertical illuminance of 5 lx per BS EN 1838 §4.5.
              </li>
              <li>
                <strong>High-risk task lighting on alarm.</strong> Where the fire alarm triggers
                process shutdown, the high-risk emergency lighting must be active during shutdown.
                Cause-and-effect documents the relationship.
              </li>
              <li>
                <strong>Common power infrastructure.</strong> Some installations share UPS or
                central battery between fire alarm and emergency lighting. Battery sizing,
                duration and maintenance must satisfy both standards independently.
              </li>
              <li>
                <strong>Test co-ordination.</strong> Annual full-duration emergency lighting tests
                may be co-ordinated with fire alarm full system tests. The combined test schedule
                is part of the maintenance plan.
              </li>
              <li>
                <strong>Evidence trail.</strong> Cause-and-effect document, fire alarm test
                records and emergency lighting test records together evidence the integrated
                system. Missing any one element breaks the chain.
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

          <SectionRule />

          <ContentEyebrow>Enforcement — who audits, what they can do</ContentEyebrow>

          <ConceptBlock
            title="The enforcement bodies and their powers"
            plainEnglish="Multiple bodies have enforcement powers over emergency lighting. Each acts within its own statutory remit, but their interests overlap in any building large enough or risky enough to engage more than one regime. The Fire and Rescue Service is the primary RRO 2005 enforcement body; the Building Safety Regulator oversees HRBs; the HSE has overlap on workplace health and safety; Local Authority Building Control oversees Building Regulations at construction. Insurers add a parallel commercial-pressure layer. A duty holder must know which bodies have an interest in their building."
          >
            <p>The enforcement bodies and their tools:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire and Rescue Service (FRS) — RRO 2005.</strong> Powers under Article
                27: entry, inspection, document demand, sample-taking, information demand. Notices
                under Articles 29 (alterations), 30 (enforcement), 31 (prohibition). Prosecution
                under Article 32. The primary emergency-lighting enforcement body in occupied
                premises.
              </li>
              <li>
                <strong>Building Safety Regulator (BSR) — BSA 2022.</strong> Regulates HRBs.
                Powers: registration, safety case approval, audit, enforcement notices,
                prohibition, prosecution. Sits within the HSE. Emergency lighting evidence in HRBs
                falls within BSR scope as part of the safety case.
              </li>
              <li>
                <strong>Health and Safety Executive (HSE) — HSAW 1974.</strong> General health and
                safety enforcement. Powers under HSAW: improvement notices, prohibition notices,
                prosecution. Overlap with FRS where emergency lighting failure relates to a
                workplace health and safety question (e.g. operator harm during process shutdown).
              </li>
              <li>
                <strong>Local Authority Building Control (LABC) — Building Regulations.</strong>
                Approves construction work, audits compliance, refuses completion certification
                where non-compliant. Approved Inspectors have similar powers in private practice.
                Engaged at new build and material alteration; not continuously.
              </li>
              <li>
                <strong>Insurers — commercial pressure.</strong> Not a statutory enforcement body,
                but commercial insurance is conditional on standards compliance. Non-compliance can
                void cover or load premiums. Insurer audits often align with FRS and BSR
                requirements but may go further (e.g. insisting on automated test systems for
                large installations).
              </li>
              <li>
                <strong>HMRC and other agencies.</strong> Where premises are used for licensed
                activities (alcohol, gambling, public assembly), licensing authorities may also
                require evidence of fire safety compliance including emergency lighting.
              </li>
            </ul>
            <p>
              For a typical commercial building, the primary enforcement interaction is with the
              FRS. For an HRB, both FRS and BSR are engaged. For a workplace where employees
              operate dangerous machinery, HSE may also be relevant. The duty holder should map
              the bodies for their building and maintain documentary evidence accessible to all of
              them.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RRO 2005 · Article 32 (Offences and penalties)"
            clause={
              <>
                It is an offence for any responsible person or any other person mentioned in
                Article 5(3) to: fail to comply with the requirements of Articles 8 to 22 or
                Article 38 where that failure places one or more relevant persons at risk of death
                or serious injury in case of fire. A person guilty of an offence under this Article
                is liable on summary conviction to a fine not exceeding the statutory maximum
                and / or imprisonment for a term not exceeding 6 months; on conviction on
                indictment, to a fine and / or imprisonment for a term not exceeding 2 years.
              </>
            }
            meaning="Three phrases earn close reading. 'Risk of death or serious injury' — the regulator does not need to prove harm, only risk. 'Articles 8 to 22' — includes Article 14 (emergency routes) and Article 17 (maintenance). 'Statutory maximum' — since 2015, this is unlimited in the magistrates' court. The magistrates' route is therefore not a cap; the only difference is the imprisonment maximum (6 months summary, 2 years on indictment)."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'The legal chain — HSAW 1974 (parent) → RRO 2005 (operative) → Fire Safety Act 2021 (post-Grenfell clarification) → Building Safety Act 2022 (HRBs) → Building Regulations / ADB → BS 5266-1 / EN 1838 / EN 50172 / BS 9999 / BS 5839-1.',
              'RRO 2005 Article 14(2)(h) — emergency lighting of adequate intensity. The headline duty.',
              'RRO 2005 Article 17 — maintenance in efficient state and working order. The on-going duty.',
              'RRO 2005 Article 32 — penalties: unlimited fine and / or 2 years on indictment, where failure places persons at risk of death or serious injury.',
              'Fire Safety Act 2021 — RRO clarified to cover external walls, balconies, flat entrance doors, common parts of buildings with ≥ 2 sets of domestic premises.',
              'Building Safety Act 2022 HRB threshold — ≥ 18 m OR ≥ 7 storeys, ≥ 2 residential units. Accountable Person, safety case, golden thread, BSR.',
              'Approved Document B Volume 2 §5 — when emergency lighting is required by the Building Regulations. Cross-references BS 5266-1.',
              'BS 9999:2017 — strategic fire safety. May set higher EL standards than BS 5266-1 minima where the building strategy justifies.',
              'BS 5839-1:2025 cross-link — cause-and-effect, refuge lighting, common power infrastructure. Documented and verified.',
              'Enforcement bodies — FRS (RRO), BSR (HRBs), HSE (workplace overlap), LABC (Building Regs at construction), insurers (commercial).',
              'The court asks: did the duty holder act as a reasonable competent person would? BS 5266-1 defines what reasonable means.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Who is the "responsible person" under the RRO 2005?',
                answer:
                  'In a workplace, the employer (if they have control). In other premises, the person with control of the premises in connection with the carrying on of a trade, business or other undertaking (whether for profit or not), or the owner where there is no such person. The RP duty cannot be delegated — a managing agent or contractor may be commissioned to discharge it operationally, but legal responsibility remains with the RP.',
              },
              {
                question: 'What is the practical difference between the RRO regime and the Building Regulations regime for emergency lighting?',
                answer:
                  'Building Regulations apply at construction or material alteration. Building Control checks compliance at completion. Once the building is in occupation, Building Control disengages — and the RRO takes over. The RRO is the continuous operational regime; Building Regulations is the construction-stage regime. Many buildings have both regulations satisfied at handover and only RRO compliance kept up to date thereafter — which means Building Regulations gaps may persist undetected.',
              },
              {
                question: 'Has anyone actually been prosecuted under RRO 2005 Article 32?',
                answer:
                  'Yes, frequently. The FRS pursues prosecutions where serious failures place persons at risk. Sentences include unlimited fines (some over £1 million for corporate offenders), suspended sentences, and immediate custody for individuals. Emergency lighting failures rarely stand alone in prosecutions but commonly form part of the evidence — alongside fire door failures, blocked escape routes, missing FRAs, etc. Each contributes to the picture of inadequate fire safety management.',
              },
              {
                question: 'How does the Fire Safety Act 2021 interact with leasehold flats?',
                answer:
                  'In leasehold blocks, the freeholder (or RMC, RTM company, or managing agent acting for them) is typically the RP for common parts. The Act confirms that emergency lighting in stairs, lobbies and corridors of these blocks is within the RP\'s RRO duty. Leaseholders can hold the freeholder to account through the lease and through statutory mechanisms (s.20 consultation for major works, FTT applications). The Act does not impose direct duties on leaseholders for common parts.',
              },
              {
                question: 'What is the "golden thread" under the Building Safety Act 2022?',
                answer:
                  'A digital record of the building, kept up to date throughout its life, accessible to the duty holders and the BSR. For emergency lighting, this includes design drawings, photometric calculations, commissioning certificates, asset register, maintenance records, test results and photometric verification certificates. Paper-only records are insufficient for HRBs — the data must be digital and structured. The golden thread is the evidence base for the safety case.',
              },
              {
                question: 'Does BS 9999 replace BS 5266-1 for fire-engineered buildings?',
                answer:
                  'No. BS 9999 is the strategic code; BS 5266-1 / BS EN 1838 is the technical code for emergency lighting. BS 9999 may set the brief — duration, illuminance enhancements, integration with evacuation strategy — and BS 5266-1 then implements the brief. The two are complementary, not alternative.',
              },
              {
                question: 'How does HSE involvement come into emergency lighting questions?',
                answer:
                  'HSE engages where the emergency lighting failure relates to a workplace health and safety question — typically operator harm during process shutdown, rather than evacuation in fire. A high-risk task area where emergency lighting fails such that an operator cannot safely shut down a press is an HSAW 1974 question as well as an RRO Article 14 question. HSE and FRS may co-investigate where the cause of harm is a fire that could have been evacuated had emergency lighting worked.',
              },
              {
                question: 'What happens if the FRS finds emergency lighting non-compliance during an audit?',
                answer:
                  'The escalation typically starts informal — verbal advice, then written informal notice — and progresses to formal notices under Articles 29-31 (alterations, enforcement, prohibition). Prohibition notices stop the use of part or all of the premises until remedied. Severe or persistent non-compliance, or non-compliance after a fire causing harm, may proceed to prosecution under Article 32. The FRS\'s graduated approach gives most duty holders the opportunity to remediate before prosecution; failure to remediate aggravates the consequences.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Integration with fire safety regs — Module 6.2"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate(
                  '/electrician/upskilling/emergency-lighting-module-6-section-3'
                )
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 EL in risk assessments
              </div>
            </button>
          </div>

          <div className="hidden">
            <ShieldAlert />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section2;
