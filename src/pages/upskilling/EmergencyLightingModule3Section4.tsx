import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
    id: 'elm3-s4-aboveminima',
    question: 'When should designers exceed the BS 5266-1:2025 minimum illuminance values?',
    options: [
      'Never — minima are sufficient.',
      'Where the fire risk assessment identifies factors that the standard minima do not capture — sleeping risk, elderly or disabled occupants, places of assembly with crowd density, complex layouts, areas with low contrast or high glare in normal lighting, or any premises-specific factor that increases evacuation difficulty. Risk-based design ABOVE minima is good practice; staying at minima where higher is justified is a design defect.',
      'Only when the customer pays extra.',
      'Only on weekends.',
    ],
    correctIndex: 1,
    explanation:
      'Standard minima (1 lx route, 0.5 lx anti-panic) are calibrated for typical adult occupants in typical buildings. Sleeping risk, elderly / disabled / mobility-impaired occupants, places of assembly with crowd density and complex layouts all justify illuminances above minimum. The risk assessment drives the uplift; designers must implement it.',
  },
  {
    id: 'elm3-s4-refuge',
    question: 'A disabled refuge point is a...?',
    options: [
      'A location for storage.',
      'A protected area within a building (typically a stair lobby or protected lobby) where a mobility-impaired person can safely wait for assistance during an evacuation. Required by Equality Act 2010 and detailed in BS 9999. Each refuge needs a two-way communication call point AND emergency lighting that achieves at least the escape-route minimum AND vertical 5 lx on the call point face.',
      'A place to hide.',
      'An exterior shelter only.',
    ],
    correctIndex: 1,
    explanation:
      'Refuges are defined by BS 9999 and required under Equality Act 2010 for buildings where occupants may not be able to use the escape stairs unaided. Each refuge has a fire-rated lobby, a two-way communication call point, and dedicated emergency lighting. The 5 lx vertical on the call point allows the mobility-impaired user to operate it during mains failure.',
  },
  {
    id: 'elm3-s4-circuits',
    question: 'BS 5266-1:2025 NEW requirement for high-risk areas regarding circuit arrangement is...?',
    options: [
      'A single circuit can serve all luminaires.',
      'High-risk areas require AT LEAST 2 separate circuits AND each circuit serves a maximum of 20 luminaires — so the failure of any single circuit, MCB or driver loses no more than 20 luminaires AND no more than half the high-risk lighting capacity. Diversity through circuit arrangement protects the high-risk duty against single-point-of-failure events.',
      'Three circuits regardless of luminaire count.',
      'No circuit limit.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 revision introduces explicit circuit-diversity rules for high-risk areas. ≥2 circuits + max 20 luminaires per circuit. The reasoning: a single circuit fault (MCB trip, cable damage, driver failure cascading on one bus) cannot remove more than half the high-risk lighting. The redundancy is engineered into the wiring topology.',
  },
  {
    id: 'elm3-s4-glare',
    question: 'Glare control on emergency luminaires matters because...?',
    options: [
      'It is purely aesthetic.',
      'Direct view of a high-luminance source disrupts dark-adapted vision — pupils contract, peripheral vision and contrast sensitivity drop. An evacuating occupant looking at a bright luminaire then looks away into shadowed space and momentarily cannot see. BS EN 1838:2024 specifies UGR (Unified Glare Rating) limits and luminous-intensity caps for emergency luminaires viewed from typical occupant positions.',
      'It affects luminaire weight.',
      'It changes battery life.',
    ],
    correctIndex: 1,
    explanation:
      'Glare from emergency luminaires is a real evacuation hazard — high luminance against dark background drops dark-adapted vision. BS EN 1838:2024 limits luminous intensity in glare-critical viewing angles. Designers select luminaires with diffusers, low-glare optics, and appropriate cut-off; the standard sets the numerical caps.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'When does risk-based design require illuminances ABOVE the BS 5266-1:2025 minima?',
    options: [
      'Never.',
      'Whenever the fire risk assessment identifies factors that the minima do not capture — sleeping risk, elderly / disabled / mobility-impaired occupants, places of assembly with crowd density, complex layouts, areas with low contrast in normal lighting.',
      'Only in retail.',
      'Only when the customer asks.',
    ],
    correctAnswer: 1,
    explanation:
      'The minima are calibrated for typical adult occupants in typical buildings. Risk factors above the typical case justify higher illuminances; the risk assessment drives the uplift. Staying at minima where higher is justified is a design defect.',
  },
  {
    id: 2,
    question: 'A disabled refuge point requires...?',
    options: [
      '1 lx escape lighting only.',
      'Emergency lighting that achieves at least the escape-route minimum (1 lx) AND vertical 5 lx on the two-way communication call point face AND, where the refuge is in a stairwell lobby, lighting throughout the lobby for the user waiting for assistance.',
      'No emergency lighting.',
      '50 lx flood.',
    ],
    correctAnswer: 1,
    explanation:
      'Refuges combine the escape-route duty (the user has reached the refuge from somewhere lit), the safety-equipment vertical duty (5 lx on the call point), and dedicated lobby lighting if applicable. The user may wait minutes for assistance and must remain in adequately lit space.',
  },
  {
    id: 3,
    question: 'NEW BS 5266-1:2025 high-risk circuit requirement is...?',
    options: [
      'Single circuit.',
      'At least 2 separate circuits AND maximum 20 luminaires per circuit — so a single circuit fault loses no more than half the high-risk lighting and no more than 20 luminaires.',
      '5 circuits.',
      'No limit.',
    ],
    correctAnswer: 1,
    explanation:
      '≥2 circuits, ≤20 luminaires per circuit. Engineered redundancy against single-point-of-failure cascades on the high-risk system.',
  },
  {
    id: 4,
    question: 'Sleeping risk applies to...?',
    options: [
      'Only hotels.',
      'Premises where occupants normally sleep — hotels, hostels, halls of residence, hospitals (in-patient wards), care homes, residential accommodation. Evacuation is slower because occupants must be roused, may be infirm, may need staff assistance. BS 5266-1:2025 sets 2 h duration for sleeping risk and risk-based design typically uses higher illuminances on common-area routes.',
      'Daytime only.',
      'Care homes only.',
    ],
    correctAnswer: 1,
    explanation:
      'Sleeping risk = anywhere occupants normally sleep. The category drives 2 h duration AND typically higher route illuminances because evacuation involves rousing, assisting and orienting occupants who were unconscious moments before.',
  },
  {
    id: 5,
    question: 'Places of assembly with elderly or disabled patrons (e.g. day-care, sheltered housing common rooms, accessible theatre seating) typically require...?',
    options: [
      'Lower illuminance to save energy.',
      'Higher illuminance than minima — typically 2 to 3 lx escape route (against 1 lx minimum) and 1 lx anti-panic (against 0.5 lx minimum) — to support occupants with reduced visual acuity, slower mobility and greater dependency on visual cues for navigation.',
      'No emergency lighting.',
      'Only stair lighting.',
    ],
    correctAnswer: 1,
    explanation:
      'Elderly and disabled occupants benefit from higher illuminances. The standard minima are baseline; risk-based uplift typically multiplies route lux by 2 to 3 in spaces with vulnerable user groups. The fire risk assessment specifies the factor.',
  },
  {
    id: 6,
    question: 'BS 9999 (the fire safety design code) interacts with BS 5266-1:2025 by...?',
    options: [
      'They are unrelated.',
      'BS 9999 sets the building-wide fire safety strategy including refuges, evacuation routes, signage and the human-factors design; BS 5266-1:2025 sets the emergency-lighting performance to deliver that strategy. Designers cross-reference the two — the BS 9999 strategy identifies WHERE refuges and routes go; BS 5266 says HOW MUCH light those areas need.',
      'BS 9999 replaces BS 5266.',
      'BS 5266 only applies to non-BS 9999 buildings.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 9999 is the strategic code; BS 5266 is the lighting performance code. They are complementary — BS 9999 strategy + BS 5266 illumination. Designers use both together; using one without the other gives gaps.',
  },
  {
    id: 7,
    question: 'A high-risk area has 30 luminaires across 2 circuits — does this meet BS 5266-1:2025?',
    options: [
      'Yes always.',
      'No — the 20-luminaires-per-circuit limit means 30 luminaires need ≥2 circuits sized so neither carries more than 20. Two circuits can carry at most 40 luminaires total (20 + 20); 30 across 2 circuits is acceptable only if each circuit serves at most 20. Could be a 15-15 split or 20-10 split.',
      'Yes if installed in 2024.',
      'No because of luminaire count.',
    ],
    correctAnswer: 1,
    explanation:
      'The rule is BOTH ≥2 circuits AND ≤20 per circuit. A 30-luminaire installation can use 2 circuits if neither exceeds 20 (e.g. 15-15); cannot use 2 circuits if one would carry 22 and the other 8. Then 3 circuits required.',
  },
  {
    id: 8,
    question: 'Glare control on emergency luminaires is governed by...?',
    options: [
      'Aesthetic preference only.',
      'BS EN 1838:2024 §4.6 luminous-intensity limits in glare-critical viewing angles (typically 60 to 90 degrees from vertical). Designers select luminaires with diffusers, low-glare optics, prismatic refractors or louvres meeting the limits. High-luminance bare-LED sources without diffusion typically fail the glare requirement.',
      'Building height regulations.',
      'Marketing.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §4.6 caps luminous intensity at the glare-critical viewing angles. Bare-LED sources fail without diffusion. Specifying low-glare emergency luminaires is a design choice based on the standard limits and the manufacturer datasheet.',
  },
  {
    id: 9,
    question: 'A care home accessible bedroom escape route — what risk-based illuminance applies?',
    options: [
      '1 lx.',
      'Typically 2 to 3 lx route AND 1 lx anti-panic in the corridor as risk-based uplift over the minima, plus 5 lx vertical at refuge call points and safety equipment. Duration 2 h (sleeping risk). The fire risk assessment for the home specifies the actual values; the minima are the lower bound.',
      '0.5 lx anti-panic only.',
      '15 lx high-risk.',
    ],
    correctAnswer: 1,
    explanation:
      'Care homes combine sleeping risk (2 h duration) with vulnerable users (mobility, vision, cognition impairments). Risk-based design uplifts the lux above minima — typically 2 to 3 × route minimum. The home-specific fire risk assessment sets the figures; designers implement them.',
  },
  {
    id: 10,
    question: 'What is the design rationale for sleeping-risk uplift on illuminance?',
    options: [
      'Convenience.',
      'Sleeping occupants are roused to evacuate. They wake disoriented, may be unsteady, may need to retrieve mobility aids, and have reduced reaction times for the first minutes of evacuation. Higher illuminance compensates — better visibility of obstacles, signs and route layout from the moment of waking. The 2 h duration also covers slower evacuation times for staff-led horizontal/vertical movement.',
      'Energy efficiency.',
      'Marketing.',
    ],
    correctAnswer: 1,
    explanation:
      'Sleeping risk involves a transition from unconsciousness to evacuation. The first minutes are characterised by disorientation, unsteadiness and reduced visual / cognitive capacity. Higher illuminance supports the user through that transition; longer duration covers the slower evacuation that follows.',
  },
];

const EmergencyLightingModule3Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Risk-based design adjustments | EL Module 3.4 | Elec-Mate',
    description:
      'When BS 5266-1:2025 minima are not enough — sleeping risk, vulnerable users, places of assembly, refuges per Equality Act 2010 and BS 9999, NEW 2025 high-risk circuit redundancy rules, glare control per BS EN 1838:2024.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4"
            title="Risk-based design adjustments"
            description="The minima are the floor, not the ceiling. Where the fire risk assessment identifies sleeping occupants, vulnerable users, complex layouts, places of assembly or other factors that the standard cannot encode, the design must uplift above the minimum. The 2025 revision adds explicit circuit redundancy rules for high-risk areas and tightens guidance on disabled refuge points."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5266-1:2025 minima are calibrated for typical adult occupants in typical buildings — risk-based design uplifts where the building or users are atypical.',
              'Sleeping risk (hotels, hospitals, care homes, halls of residence) — 2 h duration AND typically 2 to 3 × route minimum lux to support disoriented occupants on rousing.',
              'Vulnerable users (elderly, disabled, mobility-impaired, vision-impaired, cognitive-impaired) — risk-based uplift to typically 2 to 3 lx route, 1 lx anti-panic.',
              'Places of assembly with crowd density — uplift to manage flow, reduce trip risk, support sign legibility at distance.',
              'Disabled refuges per Equality Act 2010 and BS 9999 — escape lighting in the refuge AND 5 lx vertical on the two-way communication call point.',
              'NEW BS 5266-1:2025 — high-risk areas require ≥2 circuits AND max 20 luminaires per circuit (single-fault tolerance).',
              'Glare control per BS EN 1838:2024 §4.6 — luminous intensity caps in critical viewing angles; low-glare optics required.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply risk-based design uplift where the fire risk assessment identifies factors not captured by the standard minima',
              'Apply sleeping-risk design rules: 2 h duration plus typically 2 to 3 × route minimum illuminance',
              'Identify vulnerable-user factors (elderly, disabled, mobility / vision / cognitive impairment) and apply appropriate uplift',
              'Design disabled refuge points to Equality Act 2010 and BS 9999 — escape lighting plus 5 lx vertical on the two-way call point',
              'Apply the NEW BS 5266-1:2025 high-risk circuit redundancy rules (≥2 circuits, ≤20 luminaires per circuit)',
              'Apply glare-control limits per BS EN 1838:2024 §4.6 in luminaire selection',
              'Cross-reference BS 9999 strategic fire-safety design with BS 5266-1 illumination performance',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The minima are the floor, not the ceiling</ContentEyebrow>

          <ConceptBlock
            title="Why standard values are not always enough"
            plainEnglish="The BS 5266-1:2025 minimum illuminances (1 lx escape route, 0.5 lx anti-panic, 15 lx high-risk, 5 lx vertical at safety equipment) are calibrated for a typical adult occupant in a typical building under typical evacuation conditions. They represent the lower bound of acceptable performance. Where the building or occupants are atypical — vulnerable users, sleeping risk, complex layouts, places of assembly with crowd density — risk-based design requires uplift above the minimum. The dutyholder's fire risk assessment identifies the factors; the designer implements the uplift."
            onSite="Treat 1 lx as a starting point. Read the fire risk assessment. Look for keywords: sleeping, disabled, elderly, dementia, low vision, places of assembly, crowd, complex. Each is a flag for risk-based uplift. The lift may be a multiplier on lux, an addition of layers (e.g. anti-panic in spaces under 60 m²), or a tightening of duration (e.g. 3 h where 2 h is the minimum)."
          >
            <p>The principle of risk-based design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Standard buildings, standard occupants → minima.</strong> Office, retail,
                education, industrial premises with general adult workforce. The 1 lx / 0.5 lx /
                3 h minima from BS 5266-1:2025 §5.4 deliver compliant evacuation lighting.
              </li>
              <li>
                <strong>Sleeping risk → 2 h + uplift.</strong> Premises where occupants normally
                sleep need 2 h duration (BS 5266-1:2025 §5.4) and typically risk-based uplift to
                route lux to support post-rousing disorientation.
              </li>
              <li>
                <strong>Vulnerable users → uplift.</strong> Care homes, sheltered housing,
                day-care centres, accessible theatre seating, sheltered employment workshops.
                Higher illuminance supports reduced visual / mobility / cognitive capacity.
              </li>
              <li>
                <strong>Places of assembly → uplift.</strong> Theatres, cinemas, concert venues,
                stadiums, conference halls, places of worship. Crowd density slows evacuation;
                higher illuminance supports flow management and sign legibility at distance.
              </li>
              <li>
                <strong>Complex layouts → uplift.</strong> Multi-storey atria, mall complexes,
                buildings with non-rectilinear circulation. Disorientation risk is higher; route
                lighting and signage need additional support.
              </li>
              <li>
                <strong>High-contrast or low-contrast environments → uplift.</strong> Display
                lighting in retail (high-contrast adaptation), windowless basements (no daylight
                fallback), spaces with mirrored or highly reflective finishes (visual confusion).
              </li>
            </ul>
            <p>
              The risk-assessment-driven approach replaces a one-size-fits-all rule with a
              context-sensitive design. The standard minima are the legal floor; risk-based
              uplift is professional duty of care. Designers who quote minima only on every
              project miss the risk-assessment translation step that makes the design fit for
              purpose.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §4.3 (Risk assessment and design)"
            clause={
              <>
                The emergency-lighting design shall be informed by a fire risk assessment of the
                premises. Where the risk assessment identifies factors that increase evacuation
                difficulty — including but not limited to sleeping risk, occupants with reduced
                mobility or sensory capacity, crowd density, complex layout, or premises-specific
                hazards — the design shall provide illumination above the minimum values stated
                in this standard, sufficient to manage the identified risk.
              </>
            }
            meaning="Minima are the LOWER bound. Risk-assessed factors require above-minimum design. The standard is explicit that staying at minima where higher is justified is non-compliant; the risk assessment is the working document."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sleeping risk and vulnerable users</ContentEyebrow>

          <ConceptBlock
            title="Designing for occupants who are not at peak readiness"
            plainEnglish="Sleeping occupants and occupants with reduced capacity (mobility, vision, cognition) are the two most common reasons for above-minima design. Both share a common factor: the occupant is at less than peak evacuation readiness when the alarm sounds. Sleeping occupants must be roused, oriented, possibly assisted by staff, and may need to retrieve mobility aids before moving. Vulnerable users may have reduced reaction time, slower walking pace, reduced visual acuity (colour, contrast, distance), or reduced cognitive processing of unfamiliar situations."
          >
            <p>Sleeping risk — the design implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>2 h duration (mandatory).</strong> Per BS 5266-1:2025 §5.4. Reflects
                slower evacuation in sleeping accommodation.
              </li>
              <li>
                <strong>Route lux uplift (typical 2 to 3 × minimum).</strong> Common designs use
                2 to 3 lx escape route in sleeping accommodation common areas (against the 1 lx
                minimum). Hotel corridors, care home corridors, hospital ward corridors typically
                designed at this level.
              </li>
              <li>
                <strong>Anti-panic uplift.</strong> Communal living areas in sheltered housing,
                hotel function rooms, hospital day rooms — anti-panic typically uplifted to
                1 lx (against 0.5 lx minimum).
              </li>
              <li>
                <strong>Bedroom emergency lighting.</strong> Individual bedrooms typically have
                self-contained emergency luminaires with PIR or door-actuated switching, giving
                immediate light in the room when the occupant attempts to leave bed. Not always
                mandatory under BS 5266 minima but typically specified by the fire risk
                assessment in care environments.
              </li>
            </ul>
            <p>Vulnerable users — additional considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual impairment.</strong> Higher illuminance supports residual vision;
                higher contrast in signage; tactile and audible cues alongside visual.
              </li>
              <li>
                <strong>Mobility impairment.</strong> Refuge points (see below); wider escape
                routes; level access throughout; lighting on every change of level.
              </li>
              <li>
                <strong>Cognitive impairment (dementia care, learning difficulty).</strong>
                Consistent route layout; clear directional cues; avoidance of confusing reflective
                surfaces; calm lighting transitions (no sudden bright-to-dark contrast).
              </li>
              <li>
                <strong>Combined impairments.</strong> Care environments often have multiple
                impairment categories simultaneously. Risk-based design accommodates the most
                vulnerable user group as the design driver.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Disabled refuge points</ContentEyebrow>

          <ConceptBlock
            title="Equality Act 2010 + BS 9999 + BS 5266 working together"
            plainEnglish="Disabled refuges are dedicated areas — typically protected stair lobbies — where mobility-impaired occupants can safely wait for assistance during evacuation. They exist because evacuation by stair is not safe for everyone (wheelchair users, severe mobility impairment, ambulant users with medical conditions making stair descent dangerous). Equality Act 2010 requires reasonable adjustment in building design; BS 9999 specifies the protected lobby construction, two-way communication, and signage; BS 5266-1 specifies the lighting in and to the refuge."
          >
            <p>What a refuge needs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Protected lobby.</strong> Fire-resisting construction (typically 60 minute
                fire resistance), self-closing fire doors, smoke-control. Sized to accommodate
                wheelchair user(s) plus floor area for staff or fire-service assistance.
              </li>
              <li>
                <strong>Two-way communication call point.</strong> Allows the user to call for
                assistance and confirm their location. Typically integrated with the fire alarm
                system. 5 lx VERTICAL on the call-point face is the BS 5266 duty.
              </li>
              <li>
                <strong>Emergency lighting throughout the refuge.</strong> The user may wait
                several minutes for assistance; the refuge must be lit during the wait. Typically
                designed to escape-route minimum (1 lx) or higher per the risk assessment.
              </li>
              <li>
                <strong>Lighting on the route TO the refuge.</strong> The user navigates from
                their normal occupancy point to the refuge; the route is part of the escape
                lighting design and meets the relevant route minimum.
              </li>
              <li>
                <strong>Lighting on the route FROM the refuge to the final exit.</strong> When
                assistance arrives, the assisted evacuation continues. The full route from refuge
                to final exit must be lit to escape-route minimum.
              </li>
              <li>
                <strong>Signage.</strong> Refuge identification signage at the refuge door
                (lit per BS 5266 sign duty) and directional signage from the floor to the
                refuge.
              </li>
            </ul>
            <p>
              Coordination is critical. The architect designs the protected lobby (BS 9999); the
              fire alarm designer specifies the two-way communication; the BS 5266 designer
              specifies the lighting. All three must align on the location, dimensions and
              dependencies of the refuge.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 9999:2017 + Equality Act 2010 → BS 5266-1:2025 (Refuge lighting)"
            clause={
              <>
                Refuges shall be provided with emergency lighting in accordance with BS 5266-1.
                The lighting shall achieve the escape-route illuminance minimum throughout the
                refuge area, with vertical 5 lx on the face of the two-way communication call
                point. The route from the refuge to the final exit shall be similarly lit to
                support assisted evacuation.
              </>
            }
            meaning="Three duties at every refuge: lighting throughout the refuge, vertical at the call point, lighting on the assisted-evacuation route. Refuges are not optional in buildings with an Equality Act 2010 reasonable-adjustment duty; emergency lighting is part of making the refuge work."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>NEW 2025 — circuit redundancy in high-risk areas</ContentEyebrow>

          <ConceptBlock
            title="Engineered redundancy against single-point-of-failure"
            plainEnglish="The 2025 revision adds explicit circuit-redundancy rules for high-risk task areas. The reasoning: high-risk areas demand 0.5 s switch-on and 10:1 uniformity; a single circuit fault (MCB trip, cable damage, driver bus failure) can take down the entire high-risk lighting in that area, leaving operators in darkness mid-process. The 2025 rule requires AT LEAST 2 separate circuits AND each circuit serves a maximum of 20 luminaires. The combined effect is that no single fault loses more than half the high-risk lighting and no more than 20 luminaires."
          >
            <p>Applying the rule:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>≥2 circuits.</strong> Two or more separate final circuits feeding the
                high-risk emergency luminaires. Originating typically from different MCBs, ideally
                different consumer units / distribution boards if the building has multiple.
              </li>
              <li>
                <strong>≤20 luminaires per circuit.</strong> Each circuit's load is capped. A
                30-luminaire high-risk area needs 2 circuits with at most 20 on either (e.g.
                15-15 split, or 20-10). A 50-luminaire installation needs 3 circuits.
              </li>
              <li>
                <strong>Geometric distribution.</strong> Best practice — alternate which luminaire
                is on which circuit through the layout. So if circuit A fails, circuit B
                luminaires are spread across the area and continue to deliver acceptable lux. A
                clustered allocation (all circuit-A luminaires on one side, all circuit-B on the
                other) loses half the area on a single fault, which is worse than alternating.
              </li>
              <li>
                <strong>Switching.</strong> Each circuit may have its own changeover gear; in a
                self-contained system, each luminaire has its own battery. Either approach
                achieves the redundancy provided the circuits and the luminaires meet the count
                rules.
              </li>
              <li>
                <strong>Monitoring.</strong> Each circuit is monitored independently per BS EN
                50172:2024. A circuit fault triggers a fault indication on the central monitor;
                the maintenance team responds before the residual circuits become single-point-
                of-failure too.
              </li>
            </ul>
            <p>
              The 20-luminaire cap is conservative. It means a high-risk installation cannot use
              a single 32 A radial circuit serving 30 luminaires regardless of cable / load
              calculations; the circuit topology is dictated by safety redundancy, not by load.
              Designers plan distribution accordingly at scheme stage.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §6.4 (Circuit arrangement for high-risk task areas)"
            clause={
              <>
                Emergency luminaires in high-risk task areas shall be supplied from at least two
                separate final circuits. No single circuit shall supply more than 20 emergency
                luminaires. The luminaires shall be allocated to circuits such that the failure
                of any single circuit, distribution board or supply does not reduce the
                illuminance below the minimum for the high-risk task area at any point.
              </>
            }
            meaning="Two rules + a uniformity test. ≥2 circuits, ≤20 per circuit, AND the residual lux on a single-circuit fault must still meet the 15 lx (or 10% of task) high-risk minimum at every point. Designers verify the residual-lux condition by photometric calculation with one circuit at a time switched off."
          />

          <SectionRule />

          <ContentEyebrow>Glare control</ContentEyebrow>

          <ConceptBlock
            title="High-luminance against dark background — the evacuation hazard"
            plainEnglish="An evacuating occupant in a partially dark building has dark-adapted vision — pupils dilated, contrast sensitivity high in low-light conditions. A direct view of a high-luminance source (a bare LED, an undiffused luminaire) causes the pupils to contract, the dark adaptation to break, and a momentary visual blackout when the user looks away into shadowed space. BS EN 1838:2024 §4.6 caps the luminous intensity of emergency luminaires in critical viewing angles to prevent this — typically 60 to 90 degrees from vertical, at the angles most likely to be in the occupant's line of sight."
          >
            <p>Glare-control mechanisms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Diffusers.</strong> Translucent material covering the LED source, spreading
                light and reducing peak luminance. Most modern emergency luminaires include a
                diffuser; the photometric data shows the effect.
              </li>
              <li>
                <strong>Prismatic refractors.</strong> Engineered transparent material with prism
                facets that redirect light away from glare-critical angles toward useful angles
                (downward, along route).
              </li>
              <li>
                <strong>Louvres / cut-off optics.</strong> Physical baffles preventing direct view
                of the LED source from glare-critical angles. Used in deep recessed luminaires.
              </li>
              <li>
                <strong>Indirect lighting.</strong> Luminaire facing upward to ceiling or wall; the
                user sees the lit surface, not the source. Effective for glare avoidance but
                requires more luminaires for the same floor lux (some light absorbed by the
                surface).
              </li>
              <li>
                <strong>Asymmetric optics with cut-off.</strong> Forward-throw photometric with a
                hard cut-off at horizontal — light goes forward and down, no upward component to
                glare into oncoming view.
              </li>
            </ul>
            <p>
              Designers verify glare control by reading the manufacturer's photometric data —
              specifically the luminous intensity at viewing angles 60 to 90 degrees from
              vertical. BS EN 1838:2024 §4.6 caps the intensity per the standard formula; values
              within the cap are compliant. Bare-LED indicator-style luminaires used in cheap
              emergency-light products typically fail the cap and should not be specified for
              positions where occupants view them in evacuation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.6 (Limitation of glare)"
            clause={
              <>
                The luminous intensity of emergency-lighting luminaires in viewing angles likely
                to be in the field of view of evacuating persons shall not exceed the values given
                in Table 2 of this standard. Manufacturers shall publish photometric data
                identifying intensity at the relevant viewing angles for verification by the
                designer.
              </>
            }
            meaning="Numerical caps on luminous intensity at glare-critical viewing angles. Manufacturers publish data; designers verify their selection meets the cap. Bare-LED luminaires without diffusion typically exceed the cap; specify diffused / prismatic / cut-off variants."
          />

          <SectionRule />

          {/* Diagram — risk-based decision flow */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Risk-based design decision flow — from minima to specification
            </h4>
            <svg
              viewBox="0 0 880 580"
              className="w-full h-auto"
              role="img"
              aria-label="Decision flow chart starting from BS 5266 minima, branching through risk factors (sleeping, vulnerable users, places of assembly, refuges, high-risk task), each leading to specific uplifts (duration, lux multiplier, circuit redundancy, vertical lux at call points)."
            >
              <rect x="0" y="0" width="880" height="46" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="440" y="29" textAnchor="middle" fill="#FBBF24" fontSize="14" fontWeight="bold">
                Risk-based emergency-lighting design — decision flow
              </text>

              {/* Start node */}
              <rect x="340" y="65" width="200" height="50" rx="10" fill="rgba(34,211,238,0.10)" stroke="#22D3EE" strokeWidth="1.6" />
              <text x="440" y="88" textAnchor="middle" fill="#22D3EE" fontSize="12" fontWeight="bold">BS 5266-1:2025 minima</text>
              <text x="440" y="104" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">1 lx route · 0.5 lx anti-panic · 3 h</text>

              {/* Decision diamond */}
              <polygon points="440,140 540,200 440,260 340,200" fill="rgba(168,85,247,0.10)" stroke="#A855F7" strokeWidth="1.6" />
              <text x="440" y="195" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Risk factors</text>
              <text x="440" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">in fire risk assessment?</text>

              <line x1="440" y1="115" x2="440" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

              {/* No path */}
              <rect x="600" y="180" width="160" height="40" rx="8" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="680" y="204" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Apply minima only</text>
              <line x1="540" y1="200" x2="600" y2="200" stroke="rgba(34,197,94,0.6)" strokeWidth="1.4" />
              <text x="570" y="194" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">no</text>

              <line x1="440" y1="260" x2="440" y2="285" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <text x="425" y="278" fill="#A855F7" fontSize="9" fontWeight="bold">yes</text>

              {/* Risk factor branches */}
              <rect x="40" y="290" width="160" height="60" rx="8" fill="rgba(239,68,68,0.08)" stroke="#EF4444" strokeWidth="1.2" />
              <text x="120" y="312" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Sleeping risk</text>
              <text x="120" y="328" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ 2 h duration</text>
              <text x="120" y="342" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ 2 to 3 lx route</text>

              <rect x="220" y="290" width="160" height="60" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.2" />
              <text x="300" y="312" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Vulnerable users</text>
              <text x="300" y="328" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ 2 to 3 × route lux</text>
              <text x="300" y="342" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ refuge planning</text>

              <rect x="400" y="290" width="160" height="60" rx="8" fill="rgba(168,85,247,0.08)" stroke="#A855F7" strokeWidth="1.2" />
              <text x="480" y="312" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Places of assembly</text>
              <text x="480" y="328" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ uplift route + sign</text>
              <text x="480" y="342" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ legibility @ distance</text>

              <rect x="580" y="290" width="160" height="60" rx="8" fill="rgba(34,197,94,0.08)" stroke="#22C55E" strokeWidth="1.2" />
              <text x="660" y="312" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Refuges</text>
              <text x="660" y="328" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ 1 lx in refuge</text>
              <text x="660" y="342" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">→ 5 lx vert at call pt</text>

              {/* High-risk branch */}
              <rect x="220" y="380" width="440" height="80" rx="8" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="440" y="404" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">High-risk task area (NEW 2025 circuit rules)</text>
              <text x="440" y="422" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">→ 15 lx OR 10% of task lux, 0.5 s switch-on, 10:1 uniformity</text>
              <text x="440" y="438" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">→ ≥2 separate circuits AND ≤20 luminaires per circuit</text>
              <text x="440" y="454" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">→ residual lux on single-circuit fault must still meet minimum</text>

              {/* Glare control */}
              <rect x="220" y="480" width="440" height="50" rx="8" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="440" y="500" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">Glare control — applies to ALL designs</text>
              <text x="440" y="518" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">BS EN 1838:2024 §4.6 luminous-intensity caps in glare-critical viewing angles</text>

              {/* Connecting lines */}
              <line x1="370" y1="285" x2="120" y2="290" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="400" y1="285" x2="300" y2="290" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="440" y1="285" x2="480" y2="290" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="500" y1="285" x2="660" y2="290" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

              {/* Footer */}
              <rect x="40" y="545" width="800" height="28" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="440" y="563" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                The fire risk assessment selects the branch(es); designer implements all applicable uplifts in combination
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Mistakes risk-based design exposes</ContentEyebrow>

          <CommonMistake
            title="Designing to minima in a care home"
            whatHappens="Designer treats a 60-bedroom care home as standard non-domestic, applies 1 lx escape route + 2 h duration. At fire safety inspection, the inspector notes that residents with mobility, vision and dementia diagnoses cannot navigate at 1 lx — half the residents have visual acuity below 6/24, half use mobility aids, several have dementia and become disoriented in low light. The fire risk assessment specifies 2.5 lx route lux. The 1 lx scheme is non-compliant against the risk assessment despite meeting the standard minima. Project must be redesigned."
            doInstead="Read the fire risk assessment FIRST. The minima are the lower bound; the risk assessment is the working spec. Care homes routinely require 2 to 3 × the minimum route lux because the user group is vulnerable. The designer who installs to minima without referring to the risk assessment is working from incomplete information."
          />

          <CommonMistake
            title="Single circuit feeding all luminaires in a high-risk machine shop"
            whatHappens="Pre-2025 design installs 24 high-risk task luminaires on a single 16 A circuit in a workshop. After BS 5266-1:2025 publication, an audit of the existing scheme finds it would be non-compliant under new design — the 20-luminaire-per-circuit rule is breached and there is no second circuit. The dutyholder asks whether retrofitting is required."
            doInstead="Existing installations under the previous standard are not retrospectively non-compliant; the 2025 rule applies to new designs and to renewals / major refurbishments. Document the existing condition; programme the high-risk circuit split as part of the next major refurbishment or at the next 5-year photometric verification (see Module 6). New installations under 2025 must meet ≥2 circuits / ≤20 per circuit from day one."
          />

          <CommonMistake
            title="Treating a refuge as just a 'lobby with a button'"
            whatHappens="Architect specifies a refuge in a stairwell lobby, fire alarm contractor installs the two-way communication call point. The BS 5266 designer treats the lobby as a standard escape-route corridor — 1 lx on the route through the lobby, no specific provision at the call point. At commissioning, vertical lux on the call-point face reads 0.5 lx; horizontal lux at the floor reads 1.2 lx. Non-compliant — refuge call point requires 5 lx vertical."
            doInstead="Refuges are dual-duty positions: route lighting in the lobby AND vertical lux on the call point. The call point is safety equipment under BS EN 1838:2024 §4.5 (5 lx vertical). The route is per BS 5266 minima or risk-assessment uplift. Designers add a side-mounted or wall-washer luminaire dedicated to the call-point face whenever a refuge is on the layout."
          />

          <SectionRule />

          <Scenario
            title="A 200-bed hotel — applying risk-based design"
            situation="200-bed hotel, 8 floors, conference and function rooms on ground floor and lower-ground level, restaurant, two bars, fitness centre and pool. Mixed user groups: business travellers, leisure guests, conference attendees, function attendees including weddings (with elderly relatives). Sleeping risk on the bedroom floors; places of assembly in function rooms and restaurant; pool area is high-risk for slip hazards in mains failure."
            whatToDo="Multi-layer risk-based design: sleeping risk on bedroom floors → 2 h duration AND 2 to 3 lx route in corridors AND emergency luminaire in each bedroom (rousing support); places of assembly on function floors → uplift to typically 2 lx route plus 1 lx anti-panic, larger sign sizes for crowd legibility, additional luminaires at exits to manage flow; pool area → high-risk-task design at 50 lx (10% of normal pool lux ≈ 500 lx) within 0.5 s, 10:1 uniformity, 2 separate circuits with max 20 luminaires each, anti-slip surface remains visible; refuges at each stair lobby with 5 lx vertical at the two-way call point. Coordination with BS 9999 fire strategy and Equality Act 2010 reasonable adjustments. Documentation specifies risk-assessment basis for each uplift."
            whyItMatters="Mixed-occupancy buildings are the most common scenario for risk-based design. Each occupancy type has its own factors; the designer composes the design from layered uplifts. A scheme designed to 1 lx everywhere passes BS 5266 minima but fails the fire risk assessment for the building. The standard's minima are a baseline, not a complete spec."
          />

          <Scenario
            title="A pharmaceutical clean-room — high-risk + circuit redundancy"
            situation="Pharmaceutical manufacturing clean room, 80 m², ISO 7 cleanroom classification. Operators perform sterile compounding under strict procedural controls. A mains failure must allow operators to safely complete the sterile step (typically 60 seconds) and exit the cleanroom without compromising the batch. Normal task illuminance 750 lx."
            whatToDo="High-risk task design — 75 lx (10% of 750 lx) within 0.5 s of mains failure, 10:1 uniformity. NEW BS 5266-1:2025 circuit rules — ≥2 separate circuits feeding the cleanroom emergency luminaires, ≤20 per circuit. Cleanroom typically takes 12 to 16 luminaires for the area, so 2 circuits with 8 luminaires each, alternating geographically through the layout. Each circuit has independent fault monitoring per BS EN 50172:2024. Specify cleanroom-rated luminaires (sealed IP65 minimum, surface-mountable on the cleanroom ceiling, low particulate generation). Photometric calculation at 0% reflectance verifies 75 lx on the work surface at every grid point with all circuits active and again with one circuit isolated (residual lux check). Maintenance regime adapts to cleanroom protocols (luminaires accessed during scheduled breaks, not during production)."
            whyItMatters="Pharmaceutical cleanrooms combine high-risk task lighting with the new 2025 circuit redundancy and cleanroom-specific luminaire constraints. The design is not a single duty but a stack of duties — high-risk lux + circuit topology + cleanroom hardware + maintenance regime. Each is verified independently; missing any one is a defect."
          />

          <SectionRule />

          <KeyTakeaways
            title="Risk-based design — the working principles"
            points={[
              'Minima are the floor; the fire risk assessment drives uplift above minima where building or users are atypical.',
              'Sleeping risk: 2 h duration + typically 2 to 3 × route minimum lux + bedroom emergency lighting in care environments.',
              'Vulnerable users (elderly, disabled, sensory / cognitive impairment): uplift route lux, plan refuges, support residual capacity with higher illuminance.',
              'Disabled refuges per Equality Act 2010 + BS 9999: protected lobby + two-way call point + 1 lx in refuge + 5 lx vertical at call point + lit assisted-evacuation route.',
              'NEW 2025: high-risk areas need ≥2 circuits AND ≤20 luminaires per circuit AND residual-lux check on single-circuit fault.',
              'Glare control per BS EN 1838:2024 §4.6: luminous-intensity caps; specify diffused / prismatic / cut-off luminaires; verify from manufacturer photometric data.',
              'Cross-reference BS 9999 strategy + BS 5266-1 illumination + Equality Act 2010 reasonable-adjustment.',
              'Document the risk-assessment basis for every uplift in the specification — auditable trail from risk to design.',
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <FAQ
            items={[
              {
                question: 'Who decides whether the design needs to exceed minima?',
                answer:
                  "The dutyholder's fire risk assessment, supported by the lighting designer's professional judgement. The risk assessment identifies the factors (sleeping risk, vulnerable users, places of assembly, etc.) and the designer translates them into illuminance, duration and circuit decisions. The designer can recommend uplift even if the risk assessment is silent, and should — refusing to design beyond minima where the building manifestly needs it is a duty-of-care issue.",
              },
              {
                question: 'A small B&B with 6 bedrooms — does sleeping risk apply?',
                answer:
                  'Yes. Sleeping risk is occupancy-based, not size-based. A 6-bedroom B&B is sleeping accommodation and gets the 2 h duration. The risk-based uplift may be smaller than for a 200-bed hotel (fewer factors compounding) but the principle applies. Most small B&Bs end up with 2 h duration and 1 to 1.5 lx route lux as a sensible specification.',
              },
              {
                question: 'Are refuges required in every multi-storey building?',
                answer:
                  'Required where Equality Act 2010 reasonable adjustment applies AND the building has stair-only escape from upper levels for some occupants. Most non-domestic multi-storey buildings need refuges; some small or single-occupancy upper levels may not. BS 9999 sets the strategic rule; the building-specific Equality Act assessment tells the design team which floors need refuges and how many per floor.',
              },
              {
                question: 'Can I use a single dual-circuit ballast to satisfy the 2-circuit rule?',
                answer:
                  'No. The rule is two SEPARATE final circuits. A dual-output ballast on a single supply does not provide redundancy because failure of the supply (or the single ballast) loses both outputs. Two independent MCBs feeding two independent driver / battery systems is the engineering. Self-contained luminaires on two independent circuits achieve the same redundancy at the luminaire level.',
              },
              {
                question: 'What if a high-risk area has only 4 luminaires — do I still need 2 circuits?',
                answer:
                  'Yes. The ≥2 circuits rule applies regardless of luminaire count. A 4-luminaire high-risk area uses 2 circuits with 2 luminaires each, or 2 with 3 + 1 — the geometric distribution should keep the residual luminaires usefully placed on a single-circuit fault. The redundancy principle does not relax for small areas; if anything, small areas benefit more because each luminaire is a larger fraction of total capacity.',
              },
              {
                question: 'Do refuge call points need their own emergency lighting circuit?',
                answer:
                  'The CALL POINT (the communication device) is part of the fire alarm system and has its own integral battery / emergency power per BS 5839 and BS EN 54. The LIGHTING that illuminates the call point is part of the BS 5266 emergency lighting system and is on the building emergency lighting circuits. The two are separate but coordinated — the call point works during mains failure, AND the lighting illuminates the call-point face at 5 lx vertical so the user can operate it.',
              },
              {
                question: 'How do I verify glare compliance from a luminaire datasheet?',
                answer:
                  "Look at the photometric polar diagram and the published luminous-intensity table. BS EN 1838:2024 §4.6 specifies the maximum intensity at given viewing angles (typically 60, 70, 80, 90 degrees from vertical). Compare the manufacturer's values with the standard caps. Many manufacturers state 'BS EN 1838 compliant' or 'low-glare' on the datasheet; verify by reading the actual values rather than relying on the marketing claim.",
              },
              {
                question: 'A school hall is used for assembly and as an exam venue — does risk-based design apply?',
                answer:
                  'Apply the most onerous of the use cases. As an assembly venue (parents evening, school play, sports day), risk-based uplift applies — places-of-assembly with crowds including children and elderly relatives. As an exam venue, standard education minima apply. The design is sized to the assembly use; the exam use is automatically covered by a higher-spec installation. Designers always design to the worst-case use of a multi-use space.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Risk-based design adjustments — Module 3.4" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
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
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Emergency lighting layout drawings
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule3Section4;
