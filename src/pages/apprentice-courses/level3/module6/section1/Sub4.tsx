/**
 * Module 6 · Section 1 · Subsection 4 — Equality Act + accessibility
 * Maps to C&G 2365-03 / Unit 305 / LO1 / AC 1.6
 *
 * Layered depth: 2366-03 Unit 304 / AC 1.4; 5393-03 Unit 104 / AC 1.4
 *
 * Equality Act 2010 + Approved Document M push design decisions on
 * socket heights, switch positions, lux levels, accessibility aids
 * and dwelling adaptation.
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

const TITLE = 'Equality Act + accessibility (1.4) | Level 3 Module 6.1.4 | Elec-Mate';
const DESCRIPTION =
  'How the Equality Act 2010 and Approved Document M push design decisions on socket heights, switch positions, lux levels, accessibility aids and dwelling adaptation. The accessibility floor every L3 designer must clear.';

const checks = [
  {
    id: 'switch-height-standard',
    question:
      'In a new dwelling under Approved Document M (Category 1 visitable dwelling), at what height range above floor finish should switches and socket-outlets generally be installed?',
    options: [
      '300 mm to 1300 mm.',
      '450 mm to 1200 mm — the accessible reach range that suits seated wheelchair users and standing users with limited reach.',
      '150 mm to 1500 mm.',
      'Whatever the customer wants.',
    ],
    correctIndex: 1,
    explanation:
      "Approved Document M Volume 1 (Dwellings) Category 1 (visitable) specifies switches, sockets, controls and similar accessories should be 450-1200 mm above finished floor level. This is the seated-wheelchair-and-limited-reach band that the Equality Act considers reasonable adjustment for visitors. Category 2 (accessible and adaptable) and Category 3 (wheelchair user) impose tighter bands and additional rules — for example, controls must be at least 350 mm from internal corners. For commercial premises read Approved Document M Volume 2 — slightly different ranges (typically 400-1000 mm for primary controls).",
  },
  {
    id: 'reasonable-adjustment',
    question:
      'A small business client asks you to install a wall switch for the main lighting at 1700 mm because their tallest staff member prefers it there. The client has no disabled staff currently. The right design action is:',
    options: [
      'Install at 1700 mm — the customer is paying.',
      'Install within the M Volume 2 range (typically 750-1200 mm), explain that the Equality Act 2010 requires reasonable provision for disabled users and visitors regardless of current staff, and document the decision in writing.',
      'Refuse the job.',
      'Install at 1700 mm and add a stool.',
    ],
    correctIndex: 1,
    explanation:
      "The Equality Act 2010 imposes an anticipatory duty — design must be inclusive even where there is no current disabled user, because the workplace and customer-facing premises are anticipated to admit disabled persons over time. Installing controls outside the accessibility range creates a service-provision discrimination risk for the client and a design-liability risk for you. Document the decision and the regulatory basis in writing; if the client overrides you, decline to certify.",
  },
  {
    id: 'lux-emergency',
    question:
      'A common escape route in a small office building requires emergency lighting. What is the typical horizontal lux floor on the centre-line of the route?',
    options: [
      '0.2 lux.',
      '1 lux on the centre-line of the escape route, with a uniformity ratio not exceeding 40:1, sustained for the duration of the escape (3 hours typical) — per BS 5266-1.',
      '50 lux.',
      'No floor — emergency lighting is optional.',
    ],
    correctIndex: 1,
    explanation:
      "BS 5266-1 (Emergency lighting code of practice) sets 1 lux minimum on the centre-line of an escape route, sustained for 3 hours after mains failure (or 1 hour with controlled re-entry). Uniformity ratio of max-to-min should not exceed 40:1 across the route. Anti-panic lighting in open spaces above 60 m² is 0.5 lux. High-risk task areas (machinery shutdown, plant rooms) need 15 lux or 10 percent of normal task lighting. The accessibility lens then asks: do colours, contrast and the position of luminaires support partially-sighted evacuees?",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Equality Act 2010 imposes which kind of design duty on the L3 electrical designer?',
    options: [
      'A reactive duty — adjust only when a disabled user requests it.',
      'An anticipatory duty — design inclusively for the foreseeable range of disabled users, including those not currently present, in any premises that will be used by the public or by employees.',
      'No duty — the Act covers employment only.',
      'A duty only on hospitals.',
    ],
    correctAnswer: 1,
    explanation:
      "The Equality Act 2010 anticipatory duty is the reason designers and service providers cannot wait until a disabled user complains. The design must already be reasonable adjustment-ready at the point the building is occupied. For the L3 electrical designer this drives socket and switch heights, lux levels, contrast, audible and visible alarm provisions, and accessibility aids.",
  },
  {
    id: 2,
    question: 'Approved Document M Volume 1 (Dwellings) is split into how many categories?',
    options: [
      'Two.',
      'Three: Category 1 (visitable dwellings — accessible to visitors), Category 2 (accessible and adaptable dwellings), Category 3 (wheelchair user dwellings, with sub-categories 3a and 3b for adaptable and accessible respectively).',
      'Four.',
      'One.',
    ],
    correctAnswer: 1,
    explanation:
      "Approved Document M Volume 1: Cat 1 visitable (the floor for all new dwellings), Cat 2 accessible and adaptable (planning condition), Cat 3 wheelchair user (3a wheelchair adaptable, 3b wheelchair accessible). The category is set by the local authority planning condition. The L3 electrical designer must know which category applies before sizing switch heights, fitting positions and accessibility aids.",
  },
  {
    id: 3,
    question: 'For Category 3 wheelchair user dwellings, switches and sockets should be installed:',
    options: [
      '450-1200 mm above FFL with no other rules.',
      '450-1200 mm above FFL, AND positioned at least 350 mm from internal corners to allow wheelchair access, AND with at least one switch operable from the bed position in each bedroom for two-way control.',
      '300-1500 mm.',
      'Above 1500 mm.',
    ],
    correctAnswer: 1,
    explanation:
      "Cat 3 imposes additional rules: 350 mm corner setback for wheelchair clearance, two-way switching from bed positions for primary lighting, controls operable with one hand and minimal force, audible and visible doorbell, and provision for assistive technology integration (smart home interfaces). The electrical design pack documents each.",
  },
  {
    id: 4,
    question: 'A commercial reception desk lighting design must consider:',
    options: [
      'Lux level only.',
      'Lux level (typically 300 lux task), uniformity (greater than 0.6 across the desk area), glare control (UGR less than 19), colour temperature (3500-4000K typical), colour rendering (Ra greater than 80), AND accessibility — high contrast trim around switches, audible feedback on counter call-buttons, induction loop interface for hearing-aid users.',
      'Just colour temperature.',
      'Whether it looks good.',
    ],
    correctAnswer: 1,
    explanation:
      "Reception lighting is one of the most accessibility-sensitive zones in any commercial building. The lux and uniformity targets come from CIBSE LG07 / SLL Code for Lighting. Glare control and colour rendering matter for visually impaired users. High-contrast trim around switches helps partially-sighted users. Induction loops at counters are an Equality Act expectation for any service-providing public counter.",
  },
  {
    id: 5,
    question: 'BS 5266-1 sets emergency lighting floors. The minimum horizontal illuminance on the centre-line of an escape route is:',
    options: [
      '0.5 lux.',
      '1 lux for at least 3 hours after supply failure, with uniformity max-to-min not exceeding 40:1.',
      '15 lux.',
      '50 lux.',
    ],
    correctAnswer: 1,
    explanation:
      "BS 5266-1 escape route: 1 lux minimum centre-line, 40:1 uniformity, 3 hours duration (or 1 hour with controlled re-entry). Anti-panic open areas above 60 m²: 0.5 lux. High-risk task areas: 15 lux or 10 percent of normal. Accessibility considerations layer on top: are exit signs visible to partially-sighted? Are contrast levels at door thresholds adequate? Are luminaires positioned to avoid glare into the line of sight of an evacuee?",
  },
  {
    id: 6,
    question: 'A doorbell in a Cat 3 dwelling must be:',
    options: [
      'Just audible.',
      'Audible AND visible — typically a beacon strobe in addition to the chime, positioned where it can be seen from the main living area and bedrooms. Provision for vibrating-pad accessory should be included for profoundly deaf users.',
      'Just visible.',
      'Optional.',
    ],
    correctAnswer: 1,
    explanation:
      "Cat 3 doorbells require dual-mode (audible and visible) signalling. Beacon strobes in the main living area and bedrooms cover most cases; vibrating-pad accessories under pillows cover profoundly deaf users at night. The same dual-mode principle extends to fire alarms in dwellings adapted for deaf or hard-of-hearing residents (BS 5839-6 categories LD1 and LD2 with additional sounder/strobe combinations).",
  },
  {
    id: 7,
    question: 'In a public WC for an office building, accessibility provisions include:',
    options: [
      'Just an accessible cubicle.',
      'Accessible WC cubicle with: door switch reachable from wheelchair, light switch within reach, mirror at appropriate height, occupancy indicator, emergency pull-cord (red, reaching the floor, with a visible-from-corridor strobe and audible alarm at reception), and slow-acting timer on lights to avoid trapping users in darkness.',
      'A bigger cubicle only.',
      'No special provisions needed.',
    ],
    correctAnswer: 1,
    explanation:
      "Accessible WC electrical design covers occupancy sensing with reasonable timeout (avoid dark surprise on long use), the emergency pull-cord system (red, reaching the floor, alarms outside the cubicle and at reception), reachable controls, and provision for wheelchair turning circles around any wall accessory. The pull-cord alarm is one of the most-missed accessibility items on small commercial fit-outs.",
  },
  {
    id: 8,
    question: 'The L3 designer’s pack should evidence accessibility decisions through:',
    options: [
      'Verbal explanation to the customer.',
      'Documented Approved Document M (or BS 8300 for non-residential) compliance per zone, lux calculations against CIBSE / SLL targets, accessibility-aid schedule (induction loops, pull-cords, visible alarm beacons, doorbell modes), and an Equality Act anticipatory-duty statement on the design cover sheet.',
      'A photo of the finished install.',
      'No documentation needed.',
    ],
    correctAnswer: 1,
    explanation:
      "Accessibility evidence is a discrete part of the design pack. The cover sheet declares the Equality Act anticipatory duty has been considered. The accessibility-aid schedule lists every assistive provision (where, what, why). The lighting calc shows lux and uniformity against CIBSE / SLL targets per zone. Approved Document M or BS 8300 compliance is recorded per zone on the layout drawings. This is what an inspector or claims investigator looks for years after handover if accessibility becomes contested.",
  },
];

const faqs = [
  {
    question: 'What is the difference between the Equality Act 2010 and Approved Document M?',
    answer:
      "The Equality Act 2010 is statutory law (Parliament). It says service providers, employers and landlords must make reasonable adjustments and not discriminate against disabled persons. It is enforced through the courts and the Equality and Human Rights Commission. Approved Document M is government guidance under the Building Regulations on how to comply with Part M (Access to and use of buildings). Following Approved Document M is one accepted way to demonstrate compliance with Part M (statutory) and contributes evidence toward Equality Act compliance, but it is not the only way. The Equality Act is the broader duty; Approved Document M is the construction-specific implementation.",
  },
  {
    question: 'Where does BS 8300 fit in?',
    answer:
      "BS 8300 (Design of an accessible and inclusive built environment) is the comprehensive technical standard for accessibility in non-residential buildings, with detailed dimensions, layouts and electrical/mechanical interface requirements that go beyond Approved Document M. It is the BSI counterpart to Approved Document M for commercial / institutional / public buildings. For schools, hospitals, care homes, sports facilities, retail and office fit-outs, BS 8300 is the technical floor; Approved Document M is the regulatory reference; Equality Act is the statutory duty. Read all three in combination.",
  },
  {
    question: 'A homeowner with a disability asks for non-standard switch heights. Do the Approved Document M numbers still apply?',
    answer:
      "Approved Document M sets the floor for new construction and major refurbishment. A homeowner adapting their own dwelling for their own use can install at any height that suits them, and you should design to the user — that is the whole point of dwelling adaptation. The Disabled Facilities Grant route specifically funds adaptation away from the generic Approved Document M dimensions. Document the user-led design decision in writing. The only caveat: if the homeowner sells the property, the next owner may have a complaint about non-standard heights, so it is worth flagging in the documentation.",
  },
  {
    question: 'How do hearing loops fit into the L3 design?',
    answer:
      "Induction loops (T-coil systems) provide direct audio coupling for hearing-aid users at counters, in meeting rooms, in cinemas and theatres, and at any service-providing position. The L3 electrical design provides: dedicated low-impedance loop cable laid in a controlled geometric pattern (rectangular perimeter loop, figure-of-eight for small areas, distributed array for large halls), the loop driver amplifier with input from the audio source (microphone, sound system, video conference), signage with the international hearing-loop symbol, periodic test points. BS 7594 covers the loop installation; the design pack should reference the standard and the test results.",
  },
  {
    question: 'What about audible-and-visible fire alarms in dwellings?',
    answer:
      "BS 5839-6 (fire alarm in dwellings) categorises systems by the level of protection. LD1 and LD2 systems can require sounder-strobe combinations in dwellings adapted for deaf or hard-of-hearing residents. The L3 designer specifies the alarm category, the device locations per category rules, the sounder loudness (75 dB at the bed-head minimum) and the visible alarm provision (xenon strobe, candela rating per the room dimensions, viewing angle). For HRRBs and care homes the requirements scale up under BS 5839-1 (commercial systems) — interfaced fire alarms with addressable devices, voice evacuation in some cases, vibrating-pad accessories.",
  },
  {
    question: 'Do EV chargers need accessibility consideration?',
    answer:
      "Yes — increasingly. BS 8300-1 has guidance on accessible parking spaces, and Approved Document S (EV infrastructure) cross-references accessibility. For commercial EV charging the design floor is: at least one charger per accessible parking space (typically wider, with bay markings), the charger position low enough to be reachable from a wheelchair (typically 0.8 to 1.2 m for the connector socket), cable management that does not trip-hazard wheelchair users, and contactless or app-based authentication that does not require manual dexterity. Domestic EV chargers in adapted dwellings follow the same principles but scaled to single-user. The L3 designer should reference BS 8300 and Approved Document S in the EV charger spec.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 6 · Section 1 · Subsection 4"
            title="Equality Act and accessibility in electrical design"
            description="The accessibility floor every L3 electrical designer must clear. How the Equality Act 2010 anticipatory duty, Approved Document M and BS 8300 push specific design decisions on socket heights, switch positions, lux levels, accessibility aids and dwelling adaptation."
            tone="amber"
          />

          <TLDR
            points={[
              "The Equality Act 2010 imposes an anticipatory duty — design must be inclusive for foreseeable disabled users, not just current ones. Approved Document M (dwellings Vol 1, non-residential Vol 2) is the construction-specific guidance; BS 8300 is the deeper technical standard for non-residential buildings.",
              "Switches and socket-outlets in new dwellings sit between 450 and 1200 mm above finished floor level (the accessible reach range). Cat 3 wheelchair user dwellings add a 350 mm corner setback rule, two-way switching from bed positions, dual-mode doorbells (audible plus visible) and accessible technology provisions.",
              "Emergency lighting (BS 5266-1) — 1 lux on the centre-line of escape routes for 3 hours, 0.5 lux anti-panic, 15 lux high-risk task. Accessibility lens layers on contrast, viewing angle, signage visibility for partially-sighted evacuees. Hearing loops (BS 7594), accessible WC pull-cord systems, audible-and-visible fire alarms (BS 5839-6) all sit on the L3 designer’s schedule.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the Equality Act 2010 anticipatory duty and how it applies to electrical design in dwellings, workplaces and public-facing premises.',
              'Apply Approved Document M Volume 1 (dwellings) Categories 1, 2 and 3 — including switch and socket heights, corner setbacks and accessibility-aid provisions for each category.',
              'Apply Approved Document M Volume 2 and BS 8300 to non-residential design — switch heights, lux levels, accessibility aids, induction loops, accessible WC systems.',
              'Specify emergency lighting per BS 5266-1 — 1 lux escape route, 0.5 lux anti-panic, 15 lux high-risk — and integrate accessibility considerations (contrast, viewing angle, signage).',
              'Specify induction loops to BS 7594, audible-and-visible fire alarms to BS 5839-6, and accessible WC pull-cord alarm systems on commercial fit-outs.',
              'Document accessibility decisions in the design pack with an Equality Act anticipatory-duty statement, an accessibility-aid schedule, and per-zone Approved Document M or BS 8300 compliance evidence.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The Equality Act 2010 — anticipatory duty in design"
            plainEnglish="You design for the disabled users who will be there over time, not just the people in the building today. That is the law."
            onSite="When a customer pushes back on accessibility provisions, the answer is not opinion — the answer is the Equality Act 2010 anticipatory duty plus Approved Document M plus BS 8300."
          >
            <p>
              The Equality Act 2010 consolidates UK anti-discrimination law. For the L3 electrical designer, the most important provisions are:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Section 20 — Duty to make reasonable adjustments.</strong> Service providers, employers and landlords must adjust premises and procedures to remove disadvantage to disabled persons.</li>
              <li><strong>The anticipatory duty.</strong> The duty is not reactive (wait for a disabled user to complain) but anticipatory — the design must already be reasonable-adjustment-ready when occupied.</li>
              <li><strong>Section 21 — Failure to comply.</strong> Failure to make reasonable adjustments is unlawful discrimination, enforceable through the courts.</li>
              <li><strong>Section 29 — Provision of services.</strong> Service providers (shops, restaurants, offices, healthcare, hospitality) must not discriminate. Inaccessible electrical fittings are part of this.</li>
            </ul>
            <p>
              Compliance with the Equality Act in the built environment usually means: follow Approved Document M for construction; follow BS 8300 for non-residential design detail; document the anticipatory-duty consideration on the design cover sheet; and where the user is known and has specific needs, design to the user (Disabled Facilities Grant adaptation route).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — Section 20 (Duty to make adjustments)"
            clause="Where a provision, criterion or practice of A's puts a disabled person at a substantial disadvantage in relation to a relevant matter in comparison with persons who are not disabled, A is required to take such steps as it is reasonable to have to take to avoid the disadvantage. Where a physical feature puts a disabled person at a substantial disadvantage in relation to a relevant matter in comparison with persons who are not disabled, A is required to take such steps as it is reasonable to have to take to avoid the disadvantage."
            meaning={
              <>
                Section 20 is the engine of accessibility law. The "physical feature" duty is what bites the L3 electrical designer — switch and socket heights, controls reach, lux levels, audible-and-visible alarms, induction loops, accessible WC pull-cord systems. The "reasonable" qualifier means proportionate to the size of the service provider and the nature of the building, but the Equality and Human Rights Commission Code of Practice and case law have set a high floor for what counts as reasonable in new design and major refurbishment.
              </>
            }
            cite="Source: Equality Act 2010, Section 20. Read with Schedule 2 (Services and public functions) and Schedule 4 (Premises). EHRC Code of Practice 2011 elaborates."
          />

          <SectionRule />

          <ContentEyebrow>Approved Document M — the construction floor</ContentEyebrow>

          <ConceptBlock
            title="Approved Document M Volume 1 — Dwellings"
            plainEnglish="Three categories. Cat 1 is the floor for all new homes — visitable. Cat 2 is accessible and adaptable. Cat 3 is full wheelchair user."
          >
            <p>
              Approved Document M Volume 1 covers dwellings and divides accessibility into three categories. The local authority planning condition sets which category applies to a given new dwelling:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category 1 — Visitable dwellings.</strong> The floor for all new dwellings. Step-free entrance, accessible WC at entrance level, adequate doorset widths, switches and sockets within the 450-1200 mm reach band.</li>
              <li><strong>Category 2 — Accessible and adaptable dwellings.</strong> Step-free throughout, level access shower rooms ready for adaptation, additional structural provisions for future grab-rail fitting, light reinforcement above bath. Electrical: same 450-1200 mm reach band with additional two-way switching at the main accessible bedroom.</li>
              <li><strong>Category 3 — Wheelchair user dwellings.</strong> Two sub-categories: 3a wheelchair adaptable and 3b wheelchair accessible. Full wheelchair turning circles, hoist provision in bedroom and bathroom, height-adjustable surfaces. Electrical: 450-1200 mm range, 350 mm corner setback for wheelchair clearance, two-way switching at every bedroom from bed position, dual-mode doorbells (audible and visible), assistive-technology cabling provision.</li>
            </ul>
            <p>
              The category drives the electrical schedule. On a Cat 3 dwelling the schedule must show every switch, socket and accessory at a compliant height with a compliant clearance from internal corners. On a Cat 1 dwelling the floor is lower but still applies to switches, sockets and primary controls.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="Approved Document M Volume 2 — Buildings other than dwellings"
            plainEnglish="Workplaces, shops, restaurants, hotels, healthcare, education, public buildings. Different reach band, more accessibility aids."
          >
            <p>
              Approved Document M Volume 2 covers non-residential buildings. The principal differences from Volume 1:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switches and sockets typically 750-1200 mm for primary controls, 400-1000 mm for secondary controls (slightly narrower than the dwelling band).</li>
              <li>Accessible WC provision per occupancy — pull-cord alarm system, audible-and-visible signal at the WC and at reception, lighting with a slow-acting timer to avoid trapping users in darkness.</li>
              <li>Reception and counter positions — induction loops at all service counters, accessible-height counter provision, audible feedback on call buttons.</li>
              <li>Lift provisions — accessible lift sizing and lift control accessibility (Braille buttons, audible floor announcement, contrasting button colours, control panel within reach band).</li>
              <li>Refuge points on escape routes for buildings above ground floor — communication systems (Type B per BS 9999) so disabled persons can summon help during evacuation.</li>
              <li>Lighting — uniform lux on circulation routes, glare control, contrast of door frames and accessory trim with surrounding wall.</li>
            </ul>
            <p>
              For deeper detail, BS 8300 (parts 1 and 2) is the comprehensive technical standard. Approved Document M references BS 8300 explicitly as a compliance route for the harder cases.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document M Volume 1 — Section 4.30.1 (Switches, socket-outlets and other controls)"
            clause="Switches, socket-outlets and other controls in the entrance storey of the dwelling should be located so as to be reasonably accessible to occupants and visitors. Switches, socket-outlets and other controls should be set at heights between 450 mm and 1200 mm above floor level."
            meaning={
              <>
                The 450-1200 mm reach band is the dwelling baseline. Below 450 mm forces wheelchair users to bend forward beyond their stable centre of gravity; above 1200 mm exceeds standing reach for some users and seated reach for most wheelchair users. The band is generous enough that you can group sockets at 450-500 mm (low), accessible switches at 900-1100 mm (mid), and pendant pull cords slightly higher within the band.
              </>
            }
            cite="Source: Approved Document M Volume 1 (Dwellings, 2015 edition with 2016 amendments), Section 4. Read with Building Regulations 2010 Part M."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lighting accessibility — lux, contrast and emergency</ContentEyebrow>

          <ConceptBlock
            title="Lighting design with accessibility in mind"
            plainEnglish="Hit the lux level. Hit the uniformity. Avoid the glare. Make accessory trims contrast with the wall. Make signage readable from low and from a wheelchair height."
            onSite="The hearing-aid loop and the pull-cord system get most attention because they are visible accessibility aids. The lux levels and contrast rules quietly do most of the heavy lifting for partially-sighted users."
          >
            <p>
              CIBSE LG07 / Society of Light and Lighting Code for Lighting sets task-area lux floors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office desks: 300-500 lux task, 100-200 lux ambient.</li>
              <li>Reception counters: 300 lux task.</li>
              <li>Corridors and circulation: 100 lux.</li>
              <li>Stairs: 150 lux on tread, with contrast nosings.</li>
              <li>Accessible WCs: 300 lux uniform, with accessible switch position and slow-acting timer.</li>
              <li>Schools / classrooms: 300 lux on desk, glare control to UGR less than 19, daylight dimming linkable.</li>
              <li>Healthcare bedside: 300 lux reading, 100 lux ambient, individual control.</li>
            </ul>
            <p>
              On top of the lux floor, accessibility considerations include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Uniformity</strong> — minimum/average lux ratio above 0.6 across the task area to avoid bright/dark patches that disorient partially-sighted users.</li>
              <li><strong>Glare</strong> — Unified Glare Rating (UGR) below 19 in offices, below 22 in retail.</li>
              <li><strong>Colour rendering</strong> — Ra above 80 minimum, above 90 for healthcare and care homes (so users can correctly identify medication colours, food appearance, contrast cues).</li>
              <li><strong>Colour temperature</strong> — 3500-4000K for general indoor; 2700-3000K for hospitality and care homes; 5000K+ only for high-contrast task areas.</li>
              <li><strong>Contrast</strong> — accessory trim, switch colour, door frame, handrail and step-nosing must contrast with surrounding finishes (luminance contrast above 30 percent typically).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2016+A1:2021 — Emergency lighting code of practice"
            clause="The minimum maintained illuminance on the centre-line of an escape route should not be less than 1 lux. The uniformity ratio (the ratio of maximum to minimum illuminance) along the centre-line should not exceed 40 to 1. The duration of emergency escape lighting should be sufficient to allow safe evacuation, typically not less than 1 hour where re-entry is controlled, and not less than 3 hours where re-occupation is required after the emergency."
            meaning={
              <>
                The 1 lux escape route floor sounds small but is enough for orientation and safe walking pace if the uniformity is good. The 3-hour duration covers buildings where re-occupation may be required without waiting for full mains restoration. Anti-panic lighting in open areas above 60 m² is 0.5 lux. High-risk task areas (machinery shutdown, plant rooms) need 15 lux or 10 percent of normal task lighting, whichever is higher. Accessibility considerations layer on: are exit signs visible from low (wheelchair) viewing positions, do contrast levels at doorways guide partially-sighted evacuees, are the luminaires positioned to avoid glare into the line of sight?
              </>
            }
            cite="Source: BS 5266-1:2016+A1:2021. Read with BS EN 1838 (lighting applications - emergency lighting), BS 5266-7 (luminaires - maintained), BS 5266-8 (luminaires - non-maintained)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Accessibility aids — what the L3 schedule must show</ContentEyebrow>

          <ConceptBlock
            title="Accessibility-aid schedule"
            plainEnglish="A short schedule listing every assistive provision: induction loops, pull-cords, beacon strobes, visible doorbells, accessible alarm interfaces, smart-home cabling. Each one with location, type, standard and test routine."
          >
            <p>
              Typical entries on a commercial fit-out accessibility-aid schedule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Induction loops</strong> at reception, meeting rooms, training rooms — BS 7594, signage with international hearing loop symbol, periodic test points, loop driver maintenance access.</li>
              <li><strong>Accessible WC pull-cord alarms</strong> — red cord reaching the floor, audible signal at WC and at reception, visible strobe at WC outside-door indicator, reset only from inside.</li>
              <li><strong>Visible alarms</strong> — xenon strobe beacons in addition to sounders for fire and intruder alarms in deaf-accessible dwellings or large open-plan spaces.</li>
              <li><strong>Doorbells with dual mode</strong> — audible chime plus visible beacon strobe in dwellings adapted for hard-of-hearing residents.</li>
              <li><strong>Refuge point communications</strong> — Type B emergency voice communication systems on stairwell refuge points (BS 9999) for buildings above ground floor.</li>
              <li><strong>Lift accessibility</strong> — Braille and tactile buttons, audible floor announcement, contrasting trim, control panel reach band.</li>
              <li><strong>Assistive-technology cabling</strong> — Cat 6 / 6A data cabling provision for smart home interfaces, voice control systems, environmental control units (ECUs) in adapted dwellings.</li>
            </ul>
            <p>
              Each entry on the schedule references the standard (BS 7594, BS 8300, BS 5839-6, BS 9999), the location, the device specification and the periodic test routine. The schedule lives in the design pack and accompanies the EIC into the customer’s file.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BS 8300 — the deeper non-residential standard"
            plainEnglish="Approved Document M is the regulatory minimum. BS 8300 is the comprehensive technical reference. For schools, hospitals, care homes, sports facilities and major fit-outs, BS 8300 is what the professional design pack cites."
            onSite="Where Approved Document M Volume 2 stops, BS 8300 keeps going — into door-frame contrast values, induction loop test field strengths, lift accessibility specifics, evacuation refuge equipment."
          >
            <p>
              BS 8300 (Design of an accessible and inclusive built environment) has two parts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 8300-1:2018</strong> — External environment. Approach routes, parking,
                accessible parking-bay layouts, signage contrast, external lighting on accessible
                routes (typically 50 lux average with uniformity above 0.4), illuminated signage.
              </li>
              <li>
                <strong>BS 8300-2:2018+A1:2020</strong> — Buildings. The detailed technical floor
                for non-residential buildings: door clearances, ironmongery contrast, accessible
                WC layout (with the pull-cord alarm system specified in detail), induction loop
                installation, lift accessibility (Braille, audible announcement, contrasting
                buttons, control panel reach), refuge point equipment.
              </li>
            </ul>
            <p>
              Specific L3 electrical clauses worth knowing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switch and socket contrast</strong> — luminance contrast above 30 percent
                between accessory plate and surrounding wall finish, helping partially-sighted
                users locate controls.
              </li>
              <li>
                <strong>Accessible WC pull-cord</strong> — red cord, two pendant rings (550 mm and
                100 mm above floor) so reachable from seated and from floor-fallen positions,
                audible at WC and at staffed reception, visible strobe outside the cubicle door,
                reset only from inside.
              </li>
              <li>
                <strong>Induction loop signal field</strong> — minimum 100 mA/m at the listening
                position, verified at commissioning with a calibrated field-strength meter to
                BS 7594.
              </li>
              <li>
                <strong>Lift control buttons</strong> — contrast against the panel, raised tactile
                or Braille, audible feedback, control panel within the 900-1200 mm reach band.
              </li>
              <li>
                <strong>Refuge point equipment</strong> — two-way emergency voice communication to
                a permanently-staffed location (BS 9999 Type B), red call point, instructions
                visible from wheelchair height.
              </li>
            </ul>
            <p>
              The L3 design pack on a major fit-out cites BS 8300-2 explicitly per zone alongside
              the Approved Document M reference. Professional clients (NHS Trusts, university
              estates, retail chains) will not accept a design pack that cites only Approved
              Document M.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Audible-and-visible fire alarm provisions — BS 5839 in the L3 schedule"
            plainEnglish="In dwellings adapted for deaf or hard-of-hearing residents, the fire alarm needs both sounder and strobe. In commercial buildings the same principle applies in any space where sound alone is unreliable — high ambient noise, hearing-loop induction-zone interference, isolated WCs and sleeping areas in care premises."
          >
            <p>
              BS 5839 splits into two principal parts for the L3 designer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 5839-6 — Fire detection and fire alarm systems for dwellings.</strong>
                Categorises systems from LD3 (smoke detector in escape route only) to LD1 (every
                room except small storage). For dwellings adapted for deaf or hard-of-hearing
                residents, additional sounder-strobe combinations and vibrating-pad accessories
                are specified.
              </li>
              <li>
                <strong>BS 5839-1 — Commercial fire detection and fire alarm systems.</strong>
                Categorises by life-safety (L1 to L5) and property-protection (P1 to P2). Part 1
                requires visual alarm devices (VADs) in any space where audible alarms cannot
                reasonably be heard or relied upon — typically WCs, plant rooms, areas with
                high ambient noise above 80 dB(A), and zones used by deaf or hard-of-hearing
                occupants.
              </li>
            </ul>
            <p>
              VAD specification follows BS EN 54-23 (visual alarm devices). The candela rating
              must produce at least 0.4 lux on every wall surface in the protected space, with
              viewing angle considered (wall-mounted, ceiling-mounted, corner-mounted devices have
              different effective ranges). Coverage volumes are specified by manufacturer per the
              EN 54-23 categories C-3-x (ceiling), W-x-y (wall) or O (open).
            </p>
            <p>
              Practical L3 design rule: in any non-residential WC, plant room or sleeping zone,
              specify a VAD in addition to the sounder unless a documented BS 5839-1 risk
              assessment justifies otherwise. In any dwelling adapted for deaf or hard-of-hearing
              residents, specify sounder-strobe combinations in living areas, bedrooms and
              kitchens, plus a vibrating-pad accessory under the pillow for night-time alerting.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="EV charger accessibility — Approved Document S meets BS 8300"
            plainEnglish="Charging points are increasingly mandated, and accessible parking spaces need accessible chargers. Reach band, cable management and authentication all matter."
            onSite="The 450-1200 mm reach band that applies to dwelling switches also applies to the EV charger socket and screen. Above 1200 mm or below 450 mm fails the accessibility floor."
          >
            <p>
              Approved Document S (Infrastructure for the charging of electric vehicles, June 2022)
              made EV provisions a Building Regulations floor for new dwellings, non-residential
              buildings and major refurbishments. BS 8300-1 covers accessible parking and
              cross-references. The L3 designer must integrate both:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reach band</strong> — connector socket, screen and authentication interface
                between 800 mm and 1200 mm above the parking-bay surface (the 800 mm floor is
                higher than the dwelling 450 mm because the user is approaching from a wheelchair
                across an accessible parking bay rather than reaching down from a seated position
                inside a dwelling).
              </li>
              <li>
                <strong>Cable management</strong> — retractable or wall-coiled cables that do not
                trip-hazard wheelchair users; cable diameter and force-to-deploy compatible with
                limited-grip users.
              </li>
              <li>
                <strong>Authentication</strong> — contactless card or app-based authentication
                rather than PIN-only, to suit users with limited dexterity. RFID at 800-1200 mm,
                screen at the same band.
              </li>
              <li>
                <strong>Parking-bay layout</strong> — accessible chargers placed at accessible
                parking bays (typically 3.6 m wide rather than the standard 2.4 m), with hatched
                transfer zone clear of the cable run.
              </li>
              <li>
                <strong>O-PEN protection</strong> on TN-C-S supplies (Reg 722.411.4.1) — a hardware
                requirement for the charger, but the L3 designer must specify the device and the
                installation arrangement (chargers with built-in O-PEN detection or external earth
                rod, depending on the EV charger model).
              </li>
              <li>
                <strong>Lighting</strong> — accessible parking bays should achieve at least 30 lux
                average illuminance during hours of darkness, with uniformity above 0.4 across the
                bay and immediate approach.
              </li>
            </ul>
            <p>
              For domestic EV chargers in adapted dwellings (Disabled Facilities Grant route), the
              designer designs to the user — typically lower mounting (700-1000 mm), retractable
              cable, contactless authentication, and integration with the dwelling smart-home
              system if present. Document the user-led decisions in the design pack.
            </p>
          </ConceptBlock>

          <Scenario
            title="Small commercial fit-out — accessibility design in practice"
            situation={
              <>
                You are designing the electrical fit-out of a single-floor 320 m² high-street travel agency replacing a dated retail unit. The design includes reception counters, four customer pods, a training room, an accessible WC, a small staff area and a stockroom. The client is a national chain with an Equality Act compliance team.
              </>
            }
            whatToDo={
              <>
                The accessibility-aid schedule shows: induction loops at reception (perimeter loop, 100 W driver) and at each customer pod (small-area loop, 30 W driver) — BS 7594; accessible WC pull-cord alarm with audible at WC, visible strobe at WC outside-door indicator and reception, reset inside; visible alarm beacons in the staff WC and stockroom (deaf-accessible) supplementing the BS 5839-1 Cat L3 system; lighting designed to CIBSE LG07 retail floor (300 lux task on counters, 200 lux ambient, UGR less than 22, Ra above 90 for fabric and travel literature display, 3500K colour temperature, 0.6 uniformity); emergency lighting to BS 5266-1 (1 lux escape route, 0.5 lux anti-panic across the open retail area, 3-hour duration); switch heights at 1000 mm (mid-range of 750-1200 mm for non-residential primary controls), socket heights at 600 mm low and 1000 mm at counter level. Cover sheet declaration: Equality Act 2010 anticipatory duty considered, BS 8300-2 referenced, accessibility-aid schedule attached.
              </>
            }
            whyItMatters={
              <>
                The chain’s Equality Act compliance team will audit the documentation rather than the install. They want to see the schedule, the standards cited, the Equality Act statement and the lux calc. A design that is technically perfect but undocumented fails their audit. A design that explicitly maps each accessibility decision to the standard and to the regulatory duty satisfies the audit and protects the chain from future complaint. This is the kind of design discipline that wins repeat work from professional clients.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Skipping the accessible WC pull-cord on a small commercial fit-out"
            whatHappens={
              <>
                The fit-out includes an accessible WC; the design shows the cubicle but not the pull-cord alarm system. The customer occupies the building; a disabled customer is trapped in the WC for 40 minutes after a fall before staff notice. The Equality Act complaint that follows asks why the standard accessibility provision was missing. The customer turns to the design pack and finds no mention.
              </>
            }
            doInstead={
              <>
                Accessible WC pull-cord alarm systems are standard expected provision. Specify on every accessible WC: red pull-cord reaching the floor, audible alarm inside the WC, visible strobe outside the cubicle door, slave indicator at reception, reset only from inside the WC. The system can be a stand-alone (locally-powered with battery backup) or integrated with the building alarm panel. Document on the accessibility-aid schedule with the BS standard reference (BS 8300-2 and the relevant alarm standard).
              </>
            }
          />

          <CommonMistake
            title="Designing dwelling lighting without the bedroom two-way switch"
            whatHappens={
              <>
                A Cat 3 wheelchair user dwelling design specifies lighting per the lux floor but installs single one-way switching to bedroom lights — wall switch by the door only. The user cannot operate the bedroom light from the bed without a smart-home interface. The reasonable adjustment claim follows.
              </>
            }
            doInstead={
              <>
                Cat 3 dwellings require two-way switching from the bed position for primary lighting in every bedroom. Specify a wall switch at the door AND a switch within reach of the bed (typically pendant pull or bed-head switch). For Cat 2 the same provision is required for the principal bedroom only; for Cat 1 it is good practice in any double bedroom. The cabling cost is trivial; the accessibility and adaptability benefit is significant.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "The Equality Act 2010 imposes an anticipatory duty on designers — design inclusively for foreseeable disabled users, not just current ones. Failure to make reasonable adjustment is unlawful discrimination.",
              "Approved Document M Volume 1 covers dwellings (Cat 1 visitable, Cat 2 accessible and adaptable, Cat 3 wheelchair user). The category is set by the local authority planning condition and drives the electrical schedule.",
              "Switches and socket-outlets in new dwellings sit between 450 and 1200 mm above finished floor level. Cat 3 adds a 350 mm corner setback, two-way switching from bed positions, dual-mode doorbells and assistive-technology cabling provision.",
              "Approved Document M Volume 2 and BS 8300 cover non-residential buildings. Switch heights typically 750-1200 mm primary, 400-1000 mm secondary; accessible WC pull-cord alarms; induction loops at counters; lift accessibility; refuge point communications above ground floor.",
              "BS 5266-1 emergency lighting: 1 lux centre-line on escape routes for 3 hours, 0.5 lux anti-panic above 60 m² open areas, 15 lux high-risk task areas. Accessibility considerations layer on contrast, viewing angle and signage visibility.",
              "Lighting design with accessibility: hit CIBSE LG07 / SLL lux floors, uniformity above 0.6, UGR below 19 in offices, Ra above 80 minimum (above 90 for healthcare), contrast above 30 percent on accessory trim and door frames.",
              "Accessibility-aid schedule lists every assistive provision with location, type, standard and periodic test routine — induction loops (BS 7594), accessible WC pull-cord systems, visible alarms (BS 5839-6 dwellings, BS 5839-1 commercial), refuge point comms (BS 9999), lift accessibility, assistive-technology cabling.",
              "Document accessibility decisions on the design cover sheet (Equality Act anticipatory-duty statement) and on the layout drawings (per-zone Approved Document M / BS 8300 compliance evidence). Professional clients audit the documentation; the right paperwork wins the work.",
            ]}
          />

          <Quiz title="Equality Act and accessibility — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 Statutory context
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Sources of information
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
