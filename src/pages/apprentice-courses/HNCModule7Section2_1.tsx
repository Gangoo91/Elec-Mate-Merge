/**
 * Module 7 · Section 2 · Subsection 1 — Emergency Lighting Design
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   BS 5266 requirements, lux levels, duration, escape routes, open areas, and high-risk task areas
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Emergency Lighting Design - HNC Module 7 Section 2.1';
const DESCRIPTION =
  'Master emergency lighting design to BS 5266: lux level requirements, escape routes, open areas, high-risk task areas, maintained and non-maintained systems, duration requirements, and luminaire spacing.';

const quickCheckQuestions = [
  {
    id: 'bs5266-purpose',
    question: 'What is the primary purpose of BS 5266-1?',
    options: [
      'To specify general lighting levels',
      'To define fire alarm installation requirements',
      'To provide recommendations for emergency escape lighting',
      'To regulate standby power systems',
    ],
    correctIndex: 2,
    explanation:
      'BS 5266-1 is the British Standard that provides recommendations for the emergency escape lighting of premises. It covers design, installation, wiring, and servicing of emergency lighting systems to ensure safe evacuation during power failure.',
  },
  {
    id: 'escape-route-lux',
    question:
      'What is the minimum illuminance required on the centre line of an escape route up to 2m wide?',
    options: [
      '0.5 lux',
      '5 lux',
      '1 lux',
      '10 lux',
    ],
    correctIndex: 2,
    explanation:
      'BS 5266-1 requires a minimum of 1 lux at floor level on the centre line of a defined escape route up to 2m wide. The central band must be at least half the route width, with a minimum of 0.5 lux at the edges.',
  },
  {
    id: 'maintained-definition',
    question: 'What defines a maintained emergency luminaire?',
    options: [
      'It ensures consistent, accurate data that can be used in calculations and comparisons',
      'Its lamp operates continuously during normal and emergency conditions',
      'Consulting, training, inspection, or reduced-hours roles',
      'The current level up to which discrimination is guaranteed',
    ],
    correctIndex: 1,
    explanation:
      'A maintained emergency luminaire has its lamp(s) illuminated at all times when the premises are occupied. This contrasts with non-maintained luminaires which only illuminate during mains failure.',
  },
  {
    id: 'high-risk-task',
    question:
      'What percentage of normal task illuminance is required for high-risk task areas during emergency lighting operation?',
    options: [
      '1%',
      '5%',
      '50%',
      '10%',
    ],
    correctIndex: 3,
    explanation:
      'High-risk task areas require emergency lighting to provide at least 10% of the normal task illuminance, with a minimum of 15 lux. This ensures potentially dangerous activities can be safely terminated.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BS 5266-1, what is the minimum duration for emergency lighting in most premises?',
    options: [
      '30 minutes',
      '2 hours',
      '1 hour',
      '3 hours',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1 specifies a minimum 1-hour duration for most premises. However, 3 hours is required for sleeping accommodation, premises not evacuated immediately, or where recharge may take longer than normal working hours.',
  },
  {
    id: 2,
    question: 'What illuminance is required in open areas greater than 60m2?',
    options: [
      '1 lux',
      '0.2 lux',
      '0.5 lux',
      '5 lux',
    ],
    correctAnswer: 2,
    explanation:
      'Open areas (anti-panic areas) greater than 60m2 require a minimum of 0.5 lux at floor level across the core area, excluding a 0.5m border around the perimeter.',
  },
  {
    id: 3,
    question: 'At what height should escape route signs be illuminated to a minimum luminance?',
    options: [
      '2.5m above floor level',
      '1.8m above floor level',
      'At the ceiling',
      '2.0m above floor level',
    ],
    correctAnswer: 3,
    explanation:
      'Exit signs should be positioned at least 2.0m above floor level. BS 5266-1 requires signs to have a minimum luminance of 2 cd/m2 for internally illuminated signs.',
  },
  {
    id: 4,
    question:
      'What is the maximum spacing between emergency luminaires on an escape route, as a general rule?',
    options: [
      'Four times the mounting height',
      '2.0m above floor level',
      'Open area (anti-panic) lighting',
      'Central battery system',
    ],
    correctAnswer: 0,
    explanation:
      'As a general rule, luminaire spacing should not exceed four times the mounting height above floor level on escape routes. This ensures adequate uniformity of illumination along the route.',
  },
  {
    id: 5,
    question:
      'Which type of emergency lighting system uses a central battery with distribution wiring?',
    options: [
      'Self-contained system',
      'Central battery system',
      'Slave luminaire system',
      'Maintained system',
    ],
    correctAnswer: 1,
    explanation:
      'A central battery system uses a single battery installation that supplies all emergency luminaires via distribution wiring. This contrasts with self-contained systems where each luminaire has its own battery.',
  },
  {
    id: 6,
    question: 'What is the uniformity ratio requirement for open area (anti-panic) lighting?',
    options: [
      '10:1 maximum',
      '20:1 maximum',
      '40:1 maximum',
      'No requirement',
    ],
    correctAnswer: 2,
    explanation:
      'The ratio of maximum to minimum illuminance in open areas must not exceed 40:1. This prevents dark spots that could cause panic or falls during evacuation.',
  },
  {
    id: 7,
    question:
      'Emergency lighting must reach what percentage of required illuminance within how many seconds?',
    options: [
      '100% within 60 seconds',
      '50% within 10 seconds',
      '100% within 5 seconds',
      '50% within 5 seconds',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency lighting must reach 50% of required illuminance within 5 seconds and full required illuminance within 60 seconds. This ensures immediate basic visibility during the critical initial evacuation phase.',
  },
  {
    id: 8,
    question: 'Where must emergency lighting be provided according to BS 5266-1?',
    options: [
      'At all safety signs, changes of level, and intersection points',
      'Plan cable routes to avoid conflicts and coordinate power supplies for equipment',
      'Both employers and employees with duties under the regulations',
      'To verify the installation remains safe for continued use',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting must illuminate all escape routes, exit doors, safety signs, stairs, changes of direction, intersection points, final exits, first aid points, fire-fighting equipment, and call points.',
  },
  {
    id: 9,
    question: 'What category of emergency lighting is required in a cinema or theatre?',
    options: [
      'Escape route lighting only',
      'Open area (anti-panic) lighting',
      'High-risk task area lighting',
      'Standby lighting only',
    ],
    correctAnswer: 1,
    explanation:
      'Cinemas and theatres require open area (anti-panic) lighting because they contain large spaces where people gather and may not be familiar with the escape routes.',
  },
  {
    id: 10,
    question: 'A combined emergency luminaire provides:',
    options: [
      'Heat, moisture, and mechanical stress',
      'Training, written procedures, drills, signs, induction',
      'Normal and emergency lighting from separate lamps',
      'The maximum current a conductor can carry safely',
    ],
    correctAnswer: 2,
    explanation:
      'A combined emergency luminaire contains separate lamps for normal lighting and emergency lighting. The emergency lamp may be maintained or non-maintained, while the normal lighting lamp operates from mains supply.',
  },
  {
    id: 11,
    question:
      'What is the minimum recharge period before a subsequent emergency must not result in a duration below specification?',
    options: [
      '4 hours',
      '12 hours',
      '48 hours',
      '24 hours',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1 requires that after a full rated discharge, the system must be capable of providing rated duration again after a maximum 24-hour recharge period.',
  },
  {
    id: 12,
    question:
      'For a high-risk task area with normal illumination of 500 lux, what minimum emergency illuminance is required?',
    options: [
      '50 lux',
      '100 lux',
      '5 lux',
      '15 lux',
    ],
    correctAnswer: 0,
    explanation:
      'High-risk task areas require 10% of normal task illuminance, which would be 50 lux (10% of 500 lux). Since this exceeds the minimum requirement of 15 lux, the 50 lux figure applies.',
  },
];

const faqs = [
  {
    question: 'When should maintained emergency lighting be used instead of non-maintained?',
    answer:
      'Maintained emergency lighting is required in premises where the normal lighting may be dimmed, such as cinemas, theatres, and entertainment venues. It is also recommended where emergency lighting must be clearly distinguishable at all times, in sleeping accommodation, and where maintaining constant awareness of escape route locations is important. BS 5266-1 provides specific guidance on which premises require maintained operation.',
  },
  {
    question: 'How do I calculate the number of emergency luminaires required for an escape route?',
    answer:
      "First, measure the escape route dimensions. For routes up to 2m wide, apply the 4x mounting height spacing rule as a starting point. Then verify using photometric data that 1 lux minimum is achieved on the centre line and 0.5 lux minimum at the edges. Consider luminaire light output, beam angle, and uniformity requirements. Always use manufacturer's spacing tables based on specific luminaire photometrics.",
  },
  {
    question: 'What testing regime is required for emergency lighting systems?',
    answer:
      'BS 5266-1 requires daily visual checks of central systems, monthly functional tests (brief operation on battery), 6-monthly brief tests with lamp/battery checks, and annual full-duration discharge tests. All tests must be recorded in a log book. Self-testing luminaires with automatic test functionality can reduce manual testing requirements.',
  },
  {
    question: 'Can LED emergency luminaires meet BS 5266-1 requirements?',
    answer:
      'Yes, LED emergency luminaires can fully comply with BS 5266-1 when properly designed. They offer advantages including longer lamp life, lower energy consumption, instant full output, and often self-testing capabilities. Ensure LED luminaires are specifically designed for emergency lighting applications and meet the photometric and duration requirements.',
  },
  {
    question: 'What is the difference between escape route lighting and standby lighting?',
    answer:
      'Escape route lighting is part of emergency escape lighting, providing illumination to enable safe evacuation during mains failure. Standby lighting enables normal activities to continue during power failure - it provides a higher illuminance level but is not specifically for evacuation. A building may have both systems, but standby lighting cannot substitute for emergency escape lighting.',
  },
  {
    question:
      'How do I determine if an area qualifies as high-risk for emergency lighting purposes?',
    answer:
      'High-risk task areas are locations where activities being undertaken could become dangerous if lighting fails suddenly. Examples include operating machinery, working at height, working with hazardous materials, and medical procedures. The risk assessment should consider what happens if lighting fails during the activity - if immediate danger results, it qualifies as high-risk.',
  },
];

const HNCModule7Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 1"
            title="Emergency Lighting Design"
            description="BS 5266 requirements, lux levels, duration, escape routes, open areas, and high-risk task areas"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply BS 5266-1 requirements to emergency lighting design",
              "Calculate illuminance levels for escape routes and open areas",
              "Distinguish between maintained and non-maintained systems",
              "Design high-risk task area emergency lighting",
              "Determine appropriate emergency lighting duration",
              "Apply luminaire spacing rules for adequate coverage",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="BS 5266-1 Fundamentals">
            <p>BS 5266-1 is the British Standard that provides recommendations for the emergency escape lighting of premises. It forms the basis for designing, installing, and maintaining emergency lighting systems that enable safe evacuation during mains power failure.</p>
            <p><strong>Emergency lighting categories:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Emergency escape lighting:</strong> Enables safe evacuation from premises during power failure</li>
              <li><strong>Escape route lighting:</strong> Identifies and illuminates escape routes to final exits</li>
              <li><strong>Open area lighting:</strong> Provides illumination in large areas to prevent panic</li>
              <li><strong>High-risk task area lighting:</strong> Enables safe shutdown of dangerous activities</li>
              <li><strong>Standby lighting:</strong> Enables normal activities to continue (not part of emergency escape lighting)</li>
            </ul>
            <p><strong>Luminaire Classification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Non-maintained:</strong> Lamp off, battery charging — Lamp illuminated from battery</li>
              <li><strong>Maintained:</strong> Lamp on from mains — Lamp remains on from battery</li>
              <li><strong>Combined:</strong> Normal lamp on, emergency lamp off/on — Emergency lamp from battery</li>
              <li><strong>Self-contained:</strong> Battery within luminaire — Individual battery powers lamp</li>
              <li><strong>Central battery:</strong> Remote battery system — Central battery powers all luminaires</li>
            </ul>
            <p><strong>Key principle:</strong> Emergency lighting must provide sufficient illumination for occupants to identify escape routes and evacuate safely, even if they are unfamiliar with the building layout.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Illuminance Requirements">
            <p>BS 5266-1 specifies minimum illuminance levels for different areas based on the risk and nature of evacuation. These levels must be achieved at floor level and maintained throughout the rated duration.</p>
            <p><strong>Escape Routes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 lux minimum</strong> centre line</li>
              <li>0.5 lux at edges</li>
              <li>Routes up to 2m wide</li>
              <li>Central band &gt; half width</li>
            </ul>
            <p><strong>Open Areas (&gt;60m2)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0.5 lux minimum</strong> floor level</li>
              <li>Anti-panic lighting</li>
              <li>Exclude 0.5m border</li>
              <li>40:1 max uniformity</li>
            </ul>
            <p><strong>High-Risk Task Areas</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>10% task illuminance</strong></li>
              <li>Minimum 15 lux</li>
              <li>Enable safe shutdown</li>
              <li>Risk assessment required</li>
            </ul>
            <p><strong>Illuminance Values Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Escape route centre:</strong> 1 lux — 40:1 max — Measured at floor level</li>
              <li><strong>Escape route edges:</strong> 0.5 lux — - — Within central band</li>
              <li><strong>Open areas:</strong> 0.5 lux — 40:1 max — Core area, 0.5m border excluded</li>
              <li><strong>High-risk task:</strong> 10% or 15 lux — - — Whichever is greater</li>
              <li><strong>Safety signs:</strong> 2 cd/m2 — - — Luminance, not illuminance</li>
            </ul>
            <p><strong>Critical timing:</strong> Emergency lighting must reach 50% of required illuminance within 5 seconds and full illuminance within 60 seconds of mains failure.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Duration and Response Requirements">
            <p>Emergency lighting must operate for a specified duration to ensure occupants have adequate time to evacuate safely. The required duration depends on the building type, occupancy, and evacuation characteristics.</p>
            <p><strong>Duration Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 hour minimum:</strong> Most premises where evacuation is immediate and recharge occurs during normal working hours</li>
              <li><strong>3 hours required:</strong> Sleeping accommodation, premises not evacuated immediately, areas where recharge period exceeds normal working hours</li>
            </ul>
            <p><strong>Response Time Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Within 0.5 seconds:</strong> Emergency lighting circuit must activate</li>
              <li><strong>Within 5 seconds:</strong> 50% of required illuminance must be achieved</li>
              <li><strong>Within 60 seconds:</strong> Full required illuminance must be achieved</li>
              <li><strong>Throughout duration:</strong> Minimum illuminance must be maintained</li>
            </ul>
            <p><strong>Duration Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Offices (day use):</strong> 1 hour — Immediate evacuation, daytime recharge</li>
              <li><strong>Hotels:</strong> 3 hours — Sleeping accommodation</li>
              <li><strong>Hospitals:</strong> 3 hours — Sleeping risk, slow evacuation</li>
              <li><strong>Entertainment venues:</strong> 3 hours — Often not evacuated immediately</li>
              <li><strong>Industrial (24-hour):</strong> 3 hours — Recharge may exceed shift patterns</li>
            </ul>
            <p><strong>Recharge requirement:</strong> Following a full rated discharge, the system must be capable of providing rated duration again after a maximum 24-hour recharge period.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Luminaire Spacing and Positioning">
            <p>Correct positioning of emergency luminaires is essential to achieve required illuminance levels with adequate uniformity. BS 5266-1 provides general guidance, but specific spacing must be verified using manufacturer photometric data.</p>
            <p><strong>Mandatory Luminaire Locations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Near each exit door and at final exit doors</li>
              <li>On or near stairs so each tread receives direct light</li>
              <li>At each change of direction along escape routes</li>
              <li>At each intersection of corridors</li>
              <li>At each change of floor level</li>
              <li>Outside and near each final exit</li>
              <li>At each first aid post</li>
              <li>At each piece of fire-fighting equipment and call point</li>
              <li>At all fire safety signs</li>
              <li>Near disabled refuges and call points</li>
            </ul>
            <p><strong>Escape Route Spacing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum 4x mounting height</li>
              <li>Verify with photometric data</li>
              <li>Consider beam angle</li>
              <li>Account for obstructions</li>
            </ul>
            <p><strong>Open Area Spacing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Based on photometric layout</li>
              <li>Achieve 0.5 lux minimum</li>
              <li>40:1 uniformity ratio</li>
              <li>Exclude 0.5m perimeter</li>
            </ul>
            <p><strong>Spacing Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2.5m:</strong> 10m maximum — 6-8m (luminaire dependent)</li>
              <li><strong>3.0m:</strong> 12m maximum — 8-10m (luminaire dependent)</li>
              <li><strong>4.0m:</strong> 16m maximum — 10-14m (luminaire dependent)</li>
            </ul>
            <p><strong>Sign Visibility Requirements</strong></p>
            <p><strong>Viewing distance:</strong> Maximum viewing distance = 200 x sign height (for externally illuminated signs)</p>
            <p><strong>Internally illuminated:</strong> Maximum viewing distance = sign height x distance factor (typically 100-200)</p>
            <p><strong>Minimum luminance:</strong> 2 cd/m2 for internally illuminated signs</p>
            <p><strong>Sign illumination:</strong> Externally illuminated signs require at least 5 lux on the sign face</p>
            <p><strong>Design verification:</strong> Always verify spacing using manufacturer photometric data and lighting design software. The 4x mounting height rule is a starting point, not a guaranteed solution.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Escape Route Design</strong>
            </p>
            <p><strong>Scenario:</strong> Design emergency lighting for a 1.5m wide corridor, 30m long, with 2.8m ceiling height.</p>
            <p>Step 1: Determine requirements</p>
            <p>Route width: 1.5m (&lt;2m, so standard escape route requirements)</p>
            <p>Minimum illuminance: 1 lux centre line, 0.5 lux edges</p>
            <p>Step 2: Calculate maximum spacing</p>
            <p>Mounting height: 2.8m</p>
            <p>Maximum spacing = 4 x 2.8m = 11.2m</p>
            <p>Step 3: Apply to corridor length</p>
            <p>Corridor length: 30m</p>
            <p>Luminaires required: 30m / 11.2m = 2.68, round up to 3</p>
            <p>Plus luminaires at each end = 5 minimum positions</p>
            <p>Step 4: Verify with photometric data</p>
            <p>Check actual luminaire output achieves 1 lux at calculated spacing</p>
            <p>
              <strong>Example 2: High-Risk Task Area</strong>
            </p>
            <p><strong>Scenario:</strong> Determine emergency lighting for a machine workshop with 400 lux task lighting.</p>
            <p>Step 1: Calculate 10% requirement</p>
            <p>Normal task illuminance: 400 lux</p>
            <p>10% = 40 lux</p>
            <p>Step 2: Check against minimum</p>
            <p>Minimum for high-risk: 15 lux</p>
            <p>40 lux &gt; 15 lux, so 40 lux applies</p>
            <p>Result: Emergency lighting must provide 40 lux at task level</p>
            <p>Design luminaires to achieve this at the machinery positions</p>
            <p>
              <strong>Example 3: Open Area Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Design anti-panic lighting for a 15m x 12m open plan office (180m2).</p>
            <p>Step 1: Verify open area classification</p>
            <p>Area: 180m2 (&gt;60m2, qualifies as open area)</p>
            <p>Minimum illuminance: 0.5 lux</p>
            <p>Step 2: Define core area (exclude 0.5m border)</p>
            <p>Core area: (15-1) x (12-1) = 14m x 11m = 154m2</p>
            <p>Step 3: Uniformity requirement</p>
            <p>Maximum:minimum ratio must not exceed 40:1</p>
            <p>Step 4: Lighting layout</p>
            <p>Use photometric software to design grid achieving 0.5 lux minimum</p>
            <p>with adequate uniformity across the 154m2 core area</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all escape routes, exits, and high-risk areas</li>
              <li>Determine maintained or non-maintained requirement</li>
              <li>Calculate required illuminance levels for each area type</li>
              <li>Select appropriate duration (1 hour or 3 hours)</li>
              <li>Position luminaires at mandatory locations first</li>
              <li>Calculate spacing using 4x rule as starting point</li>
              <li>Verify design with photometric calculations</li>
              <li>Ensure sign visibility distances are adequate</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Escape route centre line: <strong>1 lux minimum</strong></li>
              <li>Open areas: <strong>0.5 lux minimum</strong></li>
              <li>High-risk task: <strong>10% of task illuminance, minimum 15 lux</strong></li>
              <li>Response time: <strong>50% within 5 seconds, 100% within 60 seconds</strong></li>
              <li>Uniformity: <strong>40:1 maximum ratio</strong></li>
              <li>Sign luminance: <strong>2 cd/m2 minimum</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using 4x rule without verification</strong> - Always check with photometric data</li>
                <li><strong>Forgetting mandatory locations</strong> - Changes of direction, fire equipment, signs</li>
                <li><strong>Wrong duration selection</strong> - Check sleeping risk and evacuation time</li>
                <li><strong>Ignoring uniformity</strong> - Dark spots cause panic and accidents</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Emergency systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fire alarm systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section2_1;
