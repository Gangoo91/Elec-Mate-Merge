/**
 * Module 4 · Section 4 · Subsection 5 — External Lighting
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   EN 12464-2 outdoor workplace illuminance, ILP Environmental Zones E0-E4 with
 *   Guidance Note 01 obtrusive light limits (ULOR, light into windows, source
 *   intensity), Building Regs Part L (≥70 llm/W, photocell + time controls), BS 5489
 *   road lighting, IP65 minimum and facade / car park / security lighting design.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'External Lighting - HNC Module 4 Section 4.5';
const DESCRIPTION =
  'Master external lighting design for building services: security lighting, amenity lighting, car parks, facade lighting, Part L compliance requirements, and ILP guidance on light pollution control.';

const quickCheckQuestions = [
  {
    id: 'car-park-lux',
    question: 'What is the recommended illuminance for a multi-storey car park to EN 12464-2?',
    options: ['20 lux', '50 lux', '75 lux', '100 lux'],
    correctIndex: 2,
    explanation:
      'EN 12464-2 recommends 75 lux for parking areas in multi-storey car parks during hours of use. Open air car parks may be designed to lower levels (20-50 lux) depending on risk assessment.',
  },
  {
    id: 'light-pollution-zones',
    question:
      'In the ILP Environmental Zone classification, which zone has the strictest controls?',
    options: ['E0 - Protected', 'E1 - Natural', 'E3 - Suburban', 'E4 - Urban'],
    correctIndex: 0,
    explanation:
      'E0 (Protected) has the strictest controls - areas like UNESCO starlight reserves or areas specifically designated for astronomical observation. E1 (Natural) includes national parks and rural areas.',
  },
  {
    id: 'security-lighting-type',
    question: 'What type of lighting distribution is most effective for security applications?',
    options: [
      'Narrow spot lighting',
      'Wide uniform distribution',
      'Decorative uplighting',
      'Coloured accent lighting',
    ],
    correctIndex: 1,
    explanation:
      'Uniform distribution across the protected area is most effective for security. This eliminates shadows where intruders could hide and enables CCTV cameras to capture clear images across the full area.',
  },
  {
    id: 'part-l-external',
    question: 'What does Part L require for external lighting installations?',
    options: [
      'No requirements for external lighting',
      'Efficacy limits, controls and upward light restrictions',
      'Only emergency lighting requirements',
      'Aesthetic guidelines only',
    ],
    correctIndex: 1,
    explanation:
      'Part L requires external lighting to meet minimum efficacy (70 luminaire lumens/circuit-watt), include controls (daylight sensing, time scheduling), and limit upward light output ratio (ULOR) to control light pollution.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary standard for external workplace lighting design?',
    options: ['EN 12464-1', 'EN 12464-2', 'BS 5489', 'ILP PLG04'],
    correctAnswer: 1,
    explanation:
      'EN 12464-2 covers lighting for outdoor work places. BS 5489 covers road lighting, and ILP guidance covers light pollution. EN 12464-1 is for indoor workplaces.',
  },
  {
    id: 2,
    question: 'What does ULOR stand for in external lighting?',
    options: [
      'Universal Light Output Rating',
      'Upward Light Output Ratio',
      'Uniform Light Operating Range',
      'Upper Luminaire Operating Regulation',
    ],
    correctAnswer: 1,
    explanation:
      'Upward Light Output Ratio (ULOR) is the percentage of luminaire output directed above horizontal. Lower ULOR reduces light pollution. Part L limits ULOR for new installations.',
  },
  {
    id: 3,
    question: 'What illuminance is recommended for pedestrian areas near building entrances?',
    options: ['5 lux', '20 lux', '50 lux', '100 lux'],
    correctAnswer: 2,
    explanation:
      '50 lux is typically recommended for building entrances and surrounding pedestrian areas to EN 12464-2. This ensures safe movement and facial recognition for security purposes.',
  },
  {
    id: 4,
    question:
      'What ILP Environmental Zone would a new suburban housing estate typically fall into?',
    options: ['E1 - Natural', 'E2 - Rural', 'E3 - Suburban', 'E4 - Urban'],
    correctAnswer: 2,
    explanation:
      'E3 (Suburban) applies to suburban residential areas. This zone allows moderate lighting levels with controls on spill light and ULOR. E4 (Urban) applies to city centres and town centres.',
  },
  {
    id: 5,
    question: "What is 'spill light' in external lighting design?",
    options: [
      'Light that falls outside the intended area',
      'Emergency backup lighting',
      'Reflected light from surfaces',
      'Light from adjacent properties',
    ],
    correctAnswer: 0,
    explanation:
      'Spill light (or obtrusive light) is light that falls outside the target area, potentially causing nuisance to neighbours or contributing to light pollution. Good design minimises spill through careful aiming and shielding.',
  },
  {
    id: 6,
    question: 'What colour temperature is typically recommended for security lighting to aid CCTV?',
    options: [
      '2700K (warm white)',
      '3000K (warm white)',
      '4000K (neutral white)',
      '6000K (daylight)',
    ],
    correctAnswer: 2,
    explanation:
      '4000K neutral white is typically recommended for security applications. This provides good colour rendering for CCTV identification while avoiding the harsh appearance of very cool white sources.',
  },
  {
    id: 7,
    question: 'What is facade lighting primarily designed to achieve?',
    options: [
      'Security surveillance',
      'Architectural enhancement and identity',
      'Energy reduction',
      'Emergency evacuation',
    ],
    correctAnswer: 1,
    explanation:
      'Facade lighting is primarily for architectural enhancement, highlighting building features and creating visual identity at night. It contributes to placemaking and wayfinding but must be designed to minimise light pollution.',
  },
  {
    id: 8,
    question: 'What minimum IP rating is typically required for external luminaires in the UK?',
    options: ['IP20', 'IP44', 'IP54', 'IP65'],
    correctAnswer: 3,
    explanation:
      'IP65 is typically required for external luminaires, providing protection against dust ingress and water jets from any direction. Locations with additional hazards (floods, pressure washing) may need IP66 or IP67.',
  },
  {
    id: 9,
    question:
      'How can external lighting be controlled to reduce energy consumption and light pollution?',
    options: [
      'Use higher wattage luminaires',
      'Photocell, time scheduling, and dimming after hours',
      'Keep lights on 24 hours',
      'Use uplighting only',
    ],
    correctAnswer: 1,
    explanation:
      'Effective control combines: photocell (only operate when dark), time scheduling (match occupied hours), and dimming or switch-off during late night when activity is minimal. Part L requires such controls.',
  },
  {
    id: 10,
    question: 'What is the purpose of ILP Guidance Note 1 (GN01)?',
    options: [
      'Emergency lighting design',
      'The reduction of obtrusive light',
      'Sports lighting design',
      'Interior office lighting',
    ],
    correctAnswer: 1,
    explanation:
      "ILP Guidance Note 01 'The Reduction of Obtrusive Light' provides comprehensive guidance on minimising light pollution from external lighting installations. It is widely referenced in planning conditions.",
  },
];

const faqs = [
  {
    question: 'What is light pollution and why does it matter?',
    answer:
      'Light pollution is artificial light that serves no useful purpose - including sky glow (brightening of the night sky), glare (excessive brightness), light trespass (spill onto neighbouring properties), and clutter (excessive groupings of lights). It affects human health (sleep disruption), wildlife (navigation, breeding), astronomy, and wastes energy. Reducing light pollution is now a planning and Building Regulations requirement.',
  },
  {
    question: 'How do I determine the ILP Environmental Zone for a site?',
    answer:
      'Check with the local planning authority as they may have designated zones. Otherwise, assess based on area character: E1 for national parks/AONBs, E2 for rural villages, E3 for suburban residential, E4 for urban centres. Consider neighbouring uses - if residential, apply stricter zone criteria. The zone determines allowable ULOR, illuminance, and spill light limits.',
  },
  {
    question: 'What controls does Part L require for external lighting?',
    answer:
      'Part L requires: daylight sensing (photocell to switch off in daylight), time scheduling (to match building operation hours), and consideration of presence detection or dimming for energy efficiency. Additionally, ULOR must be limited and luminaire efficacy must meet minimum requirements (currently 70 llm/cW). These controls must be commissioned and instructions provided.',
  },
  {
    question: 'How do I design car park lighting for both security and energy efficiency?',
    answer:
      'Achieve uniform illuminance across driving lanes (50-75 lux multi-storey, 20-50 lux open air) with reduced lighting in less critical areas. Use luminaires with good optical control to minimise upward light and glare. Include controls: photocell, time scheduling, and adaptive dimming (reduced levels during quiet periods with occupancy-triggered boost).',
  },
  {
    question: 'What special considerations apply to facade lighting?',
    answer:
      'Facade lighting should primarily use downlighting and in-grade uplights carefully aimed at specific features to minimise light escaping into the sky. Consider curfew hours after which decorative lighting switches off. Use appropriate colour rendering for the facade material. Ensure any uplighting is tightly controlled with minimal overshoot beyond the building.',
  },
  {
    question: 'How does external lighting interact with CCTV systems?',
    answer:
      'Good lighting is essential for CCTV effectiveness. Uniform illuminance (avoiding bright spots and deep shadows) helps cameras auto-adjust exposure. Consistent colour temperature aids identification. Avoid positioning luminaires in camera fields of view (causes flare). Coordinate with security consultants on camera positions and lighting requirements. IR-sensitive cameras may operate with less visible light.',
  },
];

const HNCModule4Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 5"
            title="External Lighting"
            description="Designing external lighting for security, amenity and aesthetics while controlling light pollution."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Design security lighting for building perimeters and entrances',
              'Calculate car park lighting to appropriate standards',
              'Apply ILP Environmental Zone classifications',
              'Minimise light pollution and obtrusive light',
              'Select appropriate luminaires for external applications',
              'Demonstrate Part L compliance for external lighting',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'External lighting is designed to EN 12464-2 (outdoor workplaces) and the ILP Guidance Notes (GN01) for environmental zones — E1 (intrinsically dark) through E4 (high district brightness).',
              'Car parks: P-class lighting (BS EN 13201-2). Typical surface lot Em 10–20 lx with Uo ≥ 0.4. Multi-storey covered: 75 lx working, 30 lx ramps.',
              'Light pollution: control upward light ratio (ULR), spill onto windows, glare (G class). Curfew dimming after 23:00 is now a standard requirement in many local plans.',
              'Part L (NDB) requires external luminaires ≥ 60 lm/W with daylight + presence control, OR &lt; 100 W with auto-off after no-occupancy delay.',
              'Earthing of luminaire columns and the BS 7671 main earthing terminal — every column carries a "Safety Electrical Connection — Do Not Remove" label per Reg 514.13.1.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.13.1"
            clause="A warning notice clearly and durably marked with the words 'Safety Electrical Connection — Do Not Remove' shall be securely fixed in a visible position at or near: (a) the point of connection of every earthing conductor to an earth electrode; and (b) the point of connection of every bonding conductor to an extraneous-conductive-part; and (c) the main earthing terminal, where separate from main switchgear."
            meaning={
              <>
                External lighting columns are commonly earthed via local rod electrodes or a buried
                ring conductor — both fall under Reg 514.13.1. Your construction information needs
                to specify a BS 951 clamp with the warning label on every electrode connection,
                every bonding tail, and the MET. The grounds maintenance crew strimming round the
                column base must not pull a label off and walk away — the label is the audit trail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 514.13.1."
          />

          <SectionRule />

          <ConceptBlock title="Security Lighting Design">
            <p>
              Security lighting deters criminal activity and enables surveillance by providing
              adequate illumination for identification and CCTV operation. The design must
              balance security effectiveness with energy efficiency and light pollution control.
            </p>
            <p>
              <strong>Security lighting objectives:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deterrence:</strong> visible lighting discourages intruders
              </li>
              <li>
                <strong>Detection:</strong> uniform illumination reveals movement
              </li>
              <li>
                <strong>Identification:</strong> sufficient light for facial recognition
              </li>
              <li>
                <strong>CCTV support:</strong> even lighting without harsh shadows
              </li>
            </ul>
            <p>
              <strong>Security lighting illuminance levels (area / illuminance / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building perimeter — 10-30 lux — vertical illuminance on walls</li>
              <li>Entrances/exits — 50-100 lux — facial recognition capability</li>
              <li>Loading bays — 50-100 lux — safe vehicle manoeuvring</li>
              <li>Pedestrian routes — 20-50 lux — safe movement, wayfinding</li>
              <li>CCTV coverage — 50+ lux — uniformity ratio ≤4:1</li>
            </ul>
            <p>
              <strong>Design principles for security:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Avoid creating shadows where intruders can hide</li>
              <li>Position luminaires to minimise glare to legitimate users</li>
              <li>Use consistent colour temperature for CCTV colour matching</li>
              <li>Consider adaptive control — higher levels when triggered</li>
              <li>Coordinate with security consultants on camera positions</li>
            </ul>
            <p>
              <strong>Note:</strong> Very high lighting levels are counterproductive — they create
              glare that blinds observers and waste energy. Uniform moderate lighting is more
              effective than patchy bright lighting.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Car Park and Amenity Lighting">
            <p>
              Car park lighting must provide safe movement for pedestrians and vehicles while
              meeting security requirements and controlling energy consumption and light
              pollution. The type of car park determines the appropriate illuminance levels.
            </p>
            <p>
              <strong>Car park illuminance — EN 12464-2 (car park type / Em lux / uniformity Uo):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Multi-storey (during use) — 75 — 0.40</li>
              <li>Multi-storey (24hr operation) — 75 — 0.40</li>
              <li>Open air — main area — 50 — 0.25</li>
              <li>Open air — low activity — 20 — 0.25</li>
              <li>Pedestrian routes — 50 — 0.40</li>
              <li>Ramps and corners — 75 — 0.40</li>
            </ul>
            <p>
              <strong>Multi-storey car parks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consider LED linear or surface-mount luminaires</li>
              <li>Higher ceilings allow column-mount</li>
              <li>IP65 minimum for enclosed structures</li>
              <li>Daylight linking for perimeter zones</li>
              <li>Emergency lighting to BS 5266</li>
            </ul>
            <p>
              <strong>Surface car parks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Column-mounted luminaires typical</li>
              <li>6-10m mounting heights</li>
              <li>Control spill light to boundaries</li>
              <li>Part-night dimming for energy saving</li>
              <li>IP66 for exposed locations</li>
            </ul>
            <p>
              <strong>Park Mark:</strong> Car parks seeking Park Mark accreditation must meet
              minimum lighting standards for safety and security. Check current criteria with the
              British Parking Association.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Light Pollution and ILP Guidance">
            <p>
              Light pollution has significant impacts on human health, wildlife, and astronomy.
              The Institute of Lighting Professionals (ILP) provides guidance on Environmental
              Zones and acceptable limits for obtrusive light to balance lighting needs with
              environmental protection.
            </p>
            <p>
              <strong>ILP Environmental Zones (zone / description / examples):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>E0</strong> — protected — UNESCO starlight reserves, observatories
              </li>
              <li>
                <strong>E1</strong> — natural — national parks, AONBs, rural areas
              </li>
              <li>
                <strong>E2</strong> — rural — village or small town locations
              </li>
              <li>
                <strong>E3</strong> — suburban — suburban residential areas
              </li>
              <li>
                <strong>E4</strong> — urban — town/city centres, high-density urban
              </li>
            </ul>
            <p>
              <strong>Maximum limits by zone — ILP GN01 (parameter / E1 / E2 / E3 / E4):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ULOR (max %) — 0% — 2.5% — 5% — 15%</li>
              <li>Light into windows (pre-curfew) — 2 lux — 5 lux — 10 lux — 25 lux</li>
              <li>Light into windows (post-curfew) — 0 lux — 1 lux — 2 lux — 5 lux</li>
              <li>Source intensity (pre-curfew) — 2.5 kcd — 7.5 kcd — 10 kcd — 25 kcd</li>
            </ul>
            <p>
              <strong>Reducing obtrusive light:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use luminaires with 0% ULOR (full cut-off)</li>
              <li>Aim luminaires downward, never above horizontal</li>
              <li>Use shields/louvres to control spill light</li>
              <li>Position to avoid light trespass onto neighbours</li>
              <li>Implement curfew dimming or switch-off</li>
              <li>Use appropriate light output — avoid over-lighting</li>
            </ul>
            <p>
              <strong>Planning:</strong> Many local authorities impose lighting conditions based
              on ILP guidance. Check with the planning department early in design to avoid
              non-compliance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Part L Compliance and Facade Lighting">
            <p>
              Building Regulations Part L sets requirements for external lighting energy
              efficiency and controls. Facade and architectural lighting adds visual interest but
              must be designed responsibly to minimise environmental impact.
            </p>
            <p>
              <strong>Part L requirements for external lighting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Efficacy:</strong> minimum 70 luminaire lumens per circuit-watt
              </li>
              <li>
                <strong>Controls:</strong> daylight sensing to prevent daytime operation
              </li>
              <li>
                <strong>ULOR:</strong> maximum 5% (may be stricter by zone)
              </li>
              <li>
                <strong>Commissioning:</strong> controls must be commissioned and documented
              </li>
              <li>
                <strong>Information:</strong> operating and maintenance instructions provided
              </li>
            </ul>
            <p>
              <strong>Facade lighting techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Grazing:</strong> light close to surface for texture
              </li>
              <li>
                <strong>Washing:</strong> even illumination of surfaces
              </li>
              <li>
                <strong>Spotlighting:</strong> highlighting specific features
              </li>
              <li>
                <strong>Silhouette:</strong> backlighting for outline effect
              </li>
              <li>
                <strong>In-ground:</strong> uplighting from ground level
              </li>
            </ul>
            <p>
              <strong>Responsible facade lighting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Light top-down where possible</li>
              <li>Minimise overshoot beyond building</li>
              <li>Use narrow beam angles</li>
              <li>Implement curfew hours (typically 23:00)</li>
              <li>Match colour to building material</li>
            </ul>
            <p>
              <strong>External luminaire selection (criterion / requirement):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IP rating — IP65 minimum (IP66/67 for harsh environments)</li>
              <li>IK rating — IK08+ for accessible locations</li>
              <li>Optical control — sharp cut-off, minimal upward light</li>
              <li>Temperature range — −25°C to +40°C minimum</li>
              <li>Corrosion resistance — powder coat or marine grade for coastal</li>
            </ul>
            <p>
              <strong>Curfew:</strong> Many planning authorities require decorative lighting to
              switch off by 23:00. Design controls to facilitate this automatically.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — surface car park design:</strong> Design lighting for a 50-space
              surface car park (40m × 30m) in a suburban location (Zone E3).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Target illuminance (EN 12464-2): 50 lux</li>
              <li>Uniformity required: Uo ≥ 0.25</li>
              <li>ILP Zone E3 limits — ULOR ≤5%; light into windows ≤10 lux pre-curfew</li>
              <li>Luminaire selection: 8m column-mount LED floodlights</li>
              <li>0% ULOR (full cut-off optics)</li>
              <li>120W, 14,400 lumens, 120 lm/W</li>
              <li>Layout: 4 columns at 20m spacing</li>
              <li>
                Total: <strong>4 luminaires × 120W = 480W</strong>
              </li>
              <li>Controls: photocell + time clock (dim to 50% after 23:00)</li>
            </ul>
            <p>
              <strong>Example 2 — ULOR compliance check:</strong> A proposed luminaire has 3%
              ULOR. Is it compliant for Zone E2?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zone E2 (rural) ULOR limit: 2.5%</li>
              <li>Proposed luminaire: 3.0%</li>
              <li>Not compliant for Zone E2</li>
              <li>Option 1: select luminaire with lower ULOR (≤2.5%)</li>
              <li>Option 2: add accessory shield to reduce upward light</li>
              <li>
                Option 3: demonstrate by calculation that actual ULOR meets requirement
                (considering tilt angle)
              </li>
            </ul>
            <p>
              <strong>Example 3 — Part L efficacy check:</strong> Verify a proposed luminaire
              meets Part L efficacy requirements.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System power: 85W</li>
              <li>Lamp lumens: 10,200 lm</li>
              <li>LOR: 92%</li>
              <li>Luminaire lumens = lamp lumens × LOR = 10,200 × 0.92 = 9,384</li>
              <li>Efficacy = luminaire lumens / system watts</li>
              <li>
                = 9,384 / 85 = <strong>110 luminaire lm/W</strong>
              </li>
              <li>Part L minimum: 70 llm/W</li>
              <li>Compliant (110 &gt; 70)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine ILP Environmental Zone</li>
              <li>Check planning conditions for lighting</li>
              <li>Select luminaires with appropriate ULOR</li>
              <li>Calculate illuminance and uniformity</li>
              <li>Verify Part L efficacy compliance</li>
              <li>Specify controls (photocell, timer, dimming)</li>
            </ul>
            <p>
              <strong>Key standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EN 12464-2:</strong> outdoor workplace lighting
              </li>
              <li>
                <strong>ILP GN01:</strong> reduction of obtrusive light
              </li>
              <li>
                <strong>BS 5489:</strong> road lighting design
              </li>
              <li>
                <strong>Building Regs Part L:</strong> energy efficiency
              </li>
              <li>
                <strong>BS EN 13201:</strong> road lighting performance
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Over-lighting</strong> — excessive levels waste energy and worsen
                  pollution
                </li>
                <li>
                  <strong>Ignoring zones</strong> — check local environmental zone before design
                </li>
                <li>
                  <strong>Poor control</strong> — forgetting to specify curfew or dimming
                </li>
                <li>
                  <strong>Wrong IP rating</strong> — ensure adequate protection for location
                </li>
              </ul>
            }
            doInstead="Design to the EN 12464-2 task level (don't over-light), look up the ILP zone before sizing, specify a curfew or part-night dim profile in the controls schedule, and choose IP/IK ratings to suit the actual external environment."
          />

          <SectionRule />

          <Scenario
            title="60-bay surface car park — designing to the right ILP zone"
            situation={
              <>
                A retail park extension adds a 60-bay surface car park, 90 m × 35 m, edged by a
                hedge to a residential property and an open service road. The local plan classifies
                the area as ILP zone E2 (low district brightness). Client wants 6 m columns with
                LED area luminaires, 100 % switched on operating hours, dimmed at curfew.
              </>
            }
            whatToDo={
              <>
                Pick P3 lighting class from BS EN 13201-2 — Em 7.5 lx, Emin 1.5 lx, Uo ≥ 0.4 over
                the working area. Choose a flat-glass, full-cut-off LED luminaire (G* class, ULR
                = 0 %) so light goes down, not into the residential property. Size columns at 6 m
                with a 25 m spacing; verify with DIALux that perimeter spill drops to &lt; 5 lx at
                the residential boundary (E2 limit). Specify part-night dimming: 100 % until
                23:00, 50 % to 06:00, full off-curfew if the lot is closed. Each column has its
                own buried earth rod with a BS 951 clamp and a Reg 514.13.1 label. Part L
                compliance: luminaire efficacy ≥ 60 lm/W, daylight switching via photocell, BMS
                schedule on the contactor. Document the ILP zone, the EN 13201 class, the spill
                limit and the curfew profile in the controls schedule.
              </>
            }
            whyItMatters={
              <>
                If you treat the lot as zone E4 (urban centre) you’ll over-light it, the residents
                will complain to environmental health, and the planning team will pull the consent.
                Picking the right zone is design, not paperwork.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EN 12464-2 + ILP GN01 + BS EN 13201 are the three references for outdoor lighting design.',
              'Environmental zone (E1–E4) sets the spill, glare and curfew limits — get it from the local plan.',
              'P-class for car parks and amenity, M-class for traffic routes — different tables, different metrics.',
              'Full-cut-off optics and zero ULR are baseline expectations now; ornamental lanterns need careful justification.',
              'Curfew dimming (50 % at 23:00) and part-night switching are standard in most planning consents.',
              'Part L NDB: efficacy ≥ 60 lm/W, daylight + occupancy controls, or ≤ 100 W with auto-off delay.',
              'Column foundations, buried earth rod, BS 951 clamp, Reg 514.13.1 label — every column, every time.',
              'IP65 minimum for column-mounted optics; IK08 minimum for impact resistance in publicly accessible areas.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting controls
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy efficient lighting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section4_5;
