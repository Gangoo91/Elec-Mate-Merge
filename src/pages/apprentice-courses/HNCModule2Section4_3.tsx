/**
 * Module 2 · Section 4 · Subsection 3 — Lamp Types and Efficacy
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   LED, fluorescent and discharge lamp technologies, efficacy (lm/W), L70/L80
 *   life ratings and control gear — the lamp-selection toolkit underpinning
 *   capital cost, energy and Part L compliance.
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

const TITLE = 'Lamp Types and Efficacy - HNC Module 2 Section 4.3';
const DESCRIPTION =
  'Understanding LED, fluorescent, and discharge lamp technologies, efficacy ratings (lm/W), lamp life, and building services applications.';

const quickCheckQuestions = [
  {
    id: 'efficacy-definition',
    question: 'What does lamp efficacy measure?',
    options: [
      'Total light output in lumens',
      'Lumens produced per watt of electrical power (lm/W)',
      'Lamp life in hours',
      'Colour temperature in Kelvin',
    ],
    correctIndex: 1,
    explanation:
      'Efficacy (lm/W) measures how efficiently a lamp converts electrical power into light. Higher efficacy means more light for less energy - a key factor in building services energy efficiency.',
  },
  {
    id: 'led-efficacy',
    question: 'What is the typical efficacy range for modern LED luminaires?',
    options: ['40-60 lm/W', '80-100 lm/W', '100-150 lm/W', '200-250 lm/W'],
    correctIndex: 2,
    explanation:
      'Modern LED luminaires typically achieve 100-150 lm/W efficacy, with premium products exceeding 160 lm/W. This is significantly higher than fluorescent (80-100 lm/W) or discharge lamps.',
  },
  {
    id: 'l70-life',
    question: 'What does L70 rated life mean for an LED product?',
    options: [
      '70% of lamps will have failed',
      'Light output has fallen to 70% of initial',
      'The lamp operates at 70% power',
      '70,000 hours of operation',
    ],
    correctIndex: 1,
    explanation:
      'L70 life is when lumen output has depreciated to 70% of initial output. This is the standard measure for LED useful life, typically 50,000-100,000 hours for quality products.',
  },
  {
    id: 'fluorescent-operation',
    question: 'How does a fluorescent lamp produce light?',
    options: [
      'A heated filament glows white hot',
      'UV radiation from mercury discharge excites phosphor coating',
      'Direct LED semiconductor emission',
      'Heating of a metal halide mixture',
    ],
    correctIndex: 1,
    explanation:
      'Fluorescent lamps use electrical discharge through mercury vapour to produce UV radiation, which excites phosphor coatings on the tube wall to emit visible light.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which lamp type currently offers the highest efficacy for general lighting?',
    options: ['T5 fluorescent', 'Metal halide', 'LED', 'Compact fluorescent'],
    correctAnswer: 2,
    explanation:
      'LED technology now offers the highest efficacy for general lighting applications, typically 100-150+ lm/W compared to fluorescent (80-100 lm/W) and metal halide (80-100 lm/W).',
  },
  {
    id: 2,
    question: 'A 45W LED luminaire produces 5400 lumens. What is its efficacy?',
    options: ['90 lm/W', '120 lm/W', '135 lm/W', '180 lm/W'],
    correctAnswer: 1,
    explanation:
      'Efficacy = Lumens / Watts = 5400 / 45 = 120 lm/W. This is typical of good quality modern LED luminaires.',
  },
  {
    id: 3,
    question: 'What is the main advantage of T5 over T8 fluorescent tubes?',
    options: [
      'Lower initial cost',
      'Higher efficacy and smaller diameter',
      'Longer lamp life',
      'Better colour rendering',
    ],
    correctAnswer: 1,
    explanation:
      'T5 tubes (16mm diameter) offer higher efficacy (~100 lm/W vs ~90 lm/W) than T8 (26mm) and allow more compact luminaire designs. However, both are being superseded by LED.',
  },
  {
    id: 4,
    question: 'Why do discharge lamps like metal halide require control gear?',
    options: [
      'To change the colour temperature',
      'To limit current and provide starting voltage',
      'To improve colour rendering',
      'To reduce lamp life',
    ],
    correctAnswer: 1,
    explanation:
      'Discharge lamps have negative resistance characteristics - without current limiting ballast, they would draw increasing current until destruction. Control gear also provides high starting voltage.',
  },
  {
    id: 5,
    question: 'What is the typical rated life of quality LED luminaires (L70)?',
    options: [
      '10,000-20,000 hours',
      '25,000-35,000 hours',
      '50,000-100,000 hours',
      '150,000+ hours',
    ],
    correctAnswer: 2,
    explanation:
      'Quality LED luminaires typically have L70 rated life of 50,000-100,000 hours. Premium products may exceed this. This far exceeds fluorescent (15,000-25,000h) and HID (10,000-20,000h).',
  },
  {
    id: 6,
    question:
      'Which lamp type would traditionally be used for high-bay industrial lighting at 10m+ mounting height?',
    options: [
      'T8 fluorescent',
      'High-pressure sodium or metal halide',
      'Compact fluorescent',
      'Incandescent',
    ],
    correctAnswer: 1,
    explanation:
      'High-bay applications traditionally used HID lamps (HPS or MH) for their high lumen output and ability to project light over long distances. LED high-bay is now the preferred choice for new installations.',
  },
  {
    id: 7,
    question: 'What causes the delay in metal halide lamps reaching full light output?',
    options: [
      'Ballast warm-up time',
      'Time for metal halides to vaporise and reach operating temperature',
      'Phosphor activation',
      'LED driver stabilisation',
    ],
    correctAnswer: 1,
    explanation:
      'Metal halide lamps require several minutes (3-5 min typically) for the metal halide compounds to vaporise and the arc tube to reach operating temperature and pressure.',
  },
  {
    id: 8,
    question: 'What is the efficacy of a typical 100W incandescent lamp?',
    options: ['10-15 lm/W', '40-50 lm/W', '80-90 lm/W', '100+ lm/W'],
    correctAnswer: 0,
    explanation:
      'Incandescent lamps have very low efficacy (10-15 lm/W) as most energy is converted to heat rather than light. This is why they have been phased out for general lighting under energy regulations.',
  },
  {
    id: 9,
    question: 'Which lamp type is most suitable for dimming in a commercial building?',
    options: [
      'High-pressure sodium',
      'Metal halide',
      'LED (with compatible driver)',
      'Compact fluorescent',
    ],
    correctAnswer: 2,
    explanation:
      'LED (with DALI or 1-10V dimmable drivers) offers the best dimming performance - smooth dimming to low levels, instant response, and maintained efficacy. HID lamps cannot be dimmed effectively.',
  },
  {
    id: 10,
    question: 'What is the primary environmental concern with fluorescent lamp disposal?',
    options: [
      'High energy consumption',
      'Mercury content requiring specialist disposal',
      'UV radiation hazard',
      'Heat generation',
    ],
    correctAnswer: 1,
    explanation:
      'Fluorescent lamps contain mercury (2-5mg typically) which is hazardous waste. WEEE regulations require proper disposal through licensed waste handlers. This is a consideration in whole-life assessments.',
  },
  {
    id: 11,
    question:
      'What LED specification indicates how much light output falls within a certain time period?',
    options: ['CRI', 'CCT', 'Lumen maintenance (Lx)', 'Power factor'],
    correctAnswer: 2,
    explanation:
      'Lumen maintenance ratings (L70, L80, L90) indicate the percentage of initial lumens remaining at rated life hours. L70 at 50,000h means 70% output remains at 50,000 hours.',
  },
  {
    id: 12,
    question: 'Which control protocol is most commonly specified for commercial LED dimming?',
    options: ['PWM', '0-10V only', 'DALI (Digital Addressable Lighting Interface)', 'DMX'],
    correctAnswer: 2,
    explanation:
      "DALI is the standard protocol for commercial building lighting control, offering individual luminaire addressing, status feedback, and integration with BMS systems. It's specified in most commercial projects.",
  },
];

const faqs = [
  {
    question: 'Should I always specify the highest efficacy LED available?',
    answer:
      'Not necessarily. While efficacy matters for energy costs, other factors include: initial cost, CRI/colour quality, glare control, dimming performance, warranty, and manufacturer reliability. A 110 lm/W LED from a reputable manufacturer with good optics may be better than a 140 lm/W product with poor glare control or short warranty. Consider whole-life cost and performance, not just efficacy.',
  },
  {
    question: 'Why are fluorescent tubes still used when LEDs are more efficient?',
    answer:
      'While new installations should generally use LED, fluorescent tubes remain in many existing buildings where: luminaires are still functional, replacing would require significant investment, or maintenance contracts include lamp replacement. LED retrofit tubes (LED tubes that fit fluorescent fittings) offer a middle ground but require careful selection and may void luminaire warranties.',
  },
  {
    question: 'What is the restrike time for HID lamps and why does it matter?',
    answer:
      'Hot restrike time is how long an HID lamp takes to restart after being turned off while hot - typically 5-15 minutes for metal halide. During this time the lamp cannot restart as internal pressure is too high. This affects emergency lighting provisions and means HID installations often need instant-on backup lighting (LED or fluorescent).',
  },
  {
    question: 'How do I verify LED product quality and lifetime claims?',
    answer:
      'Look for: LM-79 test data (luminaire photometrics), LM-80 data (LED chip lumen maintenance), TM-21 projections (lifetime calculation), ENEC/CE marks, reputable manufacturers, and realistic warranties (5 years minimum, ideally 7+). Be wary of unusually high efficacy claims without supporting test data. CIBSE TM65 provides guidance on evaluating LED products.',
  },
  {
    question: 'What is the difference between LED chips, modules, and luminaires?',
    answer:
      'LED chips (dies) are the semiconductor components. LED modules combine chips with drivers and thermal management. LED luminaires are complete fittings including optics, housing, and controls. Efficacy is quoted at different levels - chip efficacy (200+ lm/W possible) is always higher than luminaire efficacy (100-150 lm/W) due to optical, thermal, and driver losses. Always compare luminaire efficacy for design purposes.',
  },
  {
    question: 'When might I still specify discharge lamps instead of LED?',
    answer:
      'Specific applications where discharge may still be considered include: some sports floodlighting (though LED now dominates), very high output requirements, extremely harsh environments, or where replacement must match existing aesthetics. However, LED now covers most applications with better performance. Check current product availability as HID manufacturing is declining rapidly.',
  },
];

const HNCModule2Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 3"
            title="Lamp Types and Efficacy"
            description="LED, fluorescent, and discharge lamp technologies for building services applications."
            tone="purple"
          />

          <TLDR
            points={[
              'You compute efficacy in lm/W for any lamp and benchmark LED (130–200 lm/W) against legacy T5 fluorescent (~95 lm/W) and metal halide (~85 lm/W).',
              'You read L70 (luminaire) and B10/B50 (driver) life ratings to project relamp/replacement intervals over the building&rsquo;s 25-year life.',
              'You match lamp/driver pairs to dimming, control and emergency duty — and verify TM-66 circular-economy credentials when the brief calls for it.',
              'You eliminate fluorescent and HID for new schemes (RoHS phase-out, Part L lm/W minima) and justify any retained legacy lamp on a compliance basis.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (Conservation of fuel and power)"
            clause="Reasonable provision shall be made for the conservation of fuel and power in or in connection with buildings by limiting the use of fuel and power in their fixed building services through, among other things, the efficacy of internal and external lighting installations."
            meaning={
              <>
                Approved Document L sets a minimum lamp efficacy and a maximum installed
                lighting power density (W/m²·100 lux) for new and refurbished schemes.
                As HNC engineer you evidence compliance on the lighting calculation summary
                and in the Part L SBEM/SAP submission.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L — gov.uk; CIBSE TM-66 Creating a Circular Economy in the Lighting Industry."
          />

          <LearningOutcomes
            outcomes={[
              'Define efficacy and calculate lm/W for different lamp types',
              'Compare LED, fluorescent, and discharge lamp characteristics',
              'Understand lamp life ratings including L70/L80 for LEDs',
              'Select appropriate lamp types for building services applications',
              'Explain control gear requirements for different lamp types',
              'Consider environmental and disposal requirements',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Lamp Efficacy and Energy Efficiency"
            plainEnglish="Lumens per watt is the only number that really matters for running cost. The higher the efficacy, the more light per pound."
          >
            <p>
              Efficacy measures how efficiently a light source converts electrical power into
              visible light, expressed in lumens per watt (lm/W). Higher efficacy directly
              translates to lower energy costs and reduced carbon emissions — a critical factor in
              modern building services design.
            </p>
            <p>
              <strong>Efficacy Formula:</strong> Efficacy (lm/W) = Luminous Flux (lm) / Power (W).
              Higher efficacy = more light for less power = lower running costs.
            </p>
            <p>
              <strong>Efficacy Comparison by Lamp Type:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Incandescent:</strong> 10-15 lm/W (phased out)
              </li>
              <li>
                <strong>Halogen:</strong> 15-25 lm/W (phased out)
              </li>
              <li>
                <strong>Compact fluorescent (CFL):</strong> 50-70 lm/W (legacy)
              </li>
              <li>
                <strong>T8 fluorescent:</strong> 80-95 lm/W (legacy)
              </li>
              <li>
                <strong>T5 fluorescent:</strong> 90-105 lm/W (legacy)
              </li>
              <li>
                <strong>Metal halide:</strong> 80-100 lm/W (legacy)
              </li>
              <li>
                <strong>High-pressure sodium:</strong> 100-150 lm/W (legacy)
              </li>
              <li>
                <strong>LED luminaire:</strong> 100-150+ lm/W (standard)
              </li>
            </ul>
            <p>
              <strong>Note:</strong> System efficacy (luminaire) is lower than lamp efficacy due to
              optical, thermal, and driver losses. Always use luminaire data for design.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="LED Technology"
            plainEnglish="LED has won. High efficacy, long life, instant on, dims well, no mercury. The questions are now about driver quality, thermal management and warranty — not whether to use it."
          >
            <p>
              Light Emitting Diodes (LEDs) are now the standard technology for building services
              lighting. They offer superior efficacy, long life, instant switching, excellent
              dimming capability, and continuously improving performance.
            </p>
            <p>
              <strong>LED Advantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High efficacy: 100-150+ lm/W</li>
              <li>Long life: 50,000-100,000h (L70)</li>
              <li>Instant on/off — no warm-up</li>
              <li>Excellent dimming (DALI, 1-10V)</li>
              <li>No mercury content</li>
              <li>Wide CCT and CRI options</li>
              <li>Compact form factors</li>
            </ul>
            <p>
              <strong>LED Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher initial cost (reducing)</li>
              <li>Thermal management critical</li>
              <li>Driver quality affects life</li>
              <li>Glare control important</li>
              <li>Some flicker concerns (poor drivers)</li>
              <li>Product quality varies widely</li>
            </ul>
            <p>
              <strong>LED Life Ratings Explained:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L70:</strong> 70% lumen maintenance, used for general interior
              </li>
              <li>
                <strong>L80:</strong> 80% lumen maintenance, used for quality commercial
              </li>
              <li>
                <strong>L90:</strong> 90% lumen maintenance, used for premium applications
              </li>
              <li>
                <strong>B10:</strong> 10% failure rate, combined as L70B10
              </li>
            </ul>
            <p>
              Example: L70B10 at 60,000h means at 60,000 hours, 90% of units maintain at least 70%
              output.
            </p>
            <p>
              <strong>Specification tip:</strong> Always request LM-80 test data and TM-21 lifetime
              projections for LED products. Verify claims with independent test data.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Fluorescent Lamps"
            plainEnglish="The default for offices for decades. Mercury arc → UV → phosphor → visible light. Still in many buildings, but being phased out. Knowing them matters for refurb work."
          >
            <p>
              While LED is now the standard for new installations, fluorescent lamps remain in many
              existing buildings. Understanding their characteristics is important for maintenance,
              refurbishment, and retrofit decisions.
            </p>
            <p>
              <strong>How Fluorescent Lamps Work:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electrical discharge passes through mercury vapour</li>
              <li>Mercury atoms emit ultraviolet (UV) radiation</li>
              <li>UV excites phosphor coating on tube wall</li>
              <li>Phosphor fluoresces, emitting visible light</li>
              <li>Phosphor composition determines colour/CCT</li>
            </ul>
            <p>
              <strong>Fluorescent Tube Types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>T12:</strong> 38mm diameter, 60-70 lm/W (obsolete)
              </li>
              <li>
                <strong>T8:</strong> 26mm diameter, 80-95 lm/W (most common legacy)
              </li>
              <li>
                <strong>T5:</strong> 16mm diameter, 90-105 lm/W (high efficiency type)
              </li>
              <li>
                <strong>CFL:</strong> Various diameters, 50-70 lm/W (compact form)
              </li>
            </ul>
            <p>
              <strong>Control Gear Types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switch-start:</strong> Magnetic, starter, older
              </li>
              <li>
                <strong>HF electronic:</strong> Higher efficacy, no flicker
              </li>
              <li>
                <strong>Dimmable HF:</strong> 1-10V or DALI control
              </li>
            </ul>
            <p>
              <strong>Environmental Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contains mercury (2-5mg typically)</li>
              <li>WEEE disposal requirements</li>
              <li>Specialist recycling needed</li>
            </ul>
            <p>
              <strong>EU regulations:</strong> T8 and T5 fluorescent tubes are being phased out
              under EU RoHS and Ecodesign regulations. Plan for LED replacement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Discharge Lamps (HID)"
            plainEnglish="The high-bay/floodlight lamps from before LED took over. Big light output, but slow to start, no dimming, and ugly cold restrike. LED beats them on every count now."
          >
            <p>
              High Intensity Discharge (HID) lamps were traditionally used for high-output
              applications — industrial high-bays, sports lighting, street lighting. While largely
              superseded by LED, understanding HID characteristics remains relevant for maintenance
              of existing installations.
            </p>
            <p>
              <strong>HID Lamp Types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High-pressure sodium (HPS):</strong> 100-150 lm/W, CRI 20-25, traditional
                use street lighting and industrial
              </li>
              <li>
                <strong>Metal halide (MH):</strong> 80-100 lm/W, CRI 70-90, traditional use retail,
                sports, industrial
              </li>
              <li>
                <strong>Ceramic metal halide (CMH):</strong> 90-110 lm/W, CRI 80-95, traditional use
                retail and display
              </li>
              <li>
                <strong>Low-pressure sodium (LPS):</strong> 150-200 lm/W, CRI 0, obsolete
                (monochromatic)
              </li>
            </ul>
            <p>
              <strong>HID Characteristics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High lumen output per lamp</li>
              <li>Warm-up time: 3-10 minutes</li>
              <li>Hot restrike: 5-15 minutes</li>
              <li>Cannot be dimmed (generally)</li>
              <li>Requires ballast and ignitor</li>
            </ul>
            <p>
              <strong>Why LED Has Replaced HID:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Instant on — no warm-up</li>
              <li>No restrike delay</li>
              <li>Full dimming capability</li>
              <li>Better colour rendering</li>
              <li>Longer life, less maintenance</li>
            </ul>
            <p>
              <strong>Control Gear for Discharge Lamps:</strong> HID lamps require:{' '}
              <strong>Ballast</strong> (current limiting), <strong>Ignitor</strong> (high voltage
              starting pulse), and often a <strong>capacitor</strong> (power factor correction).
              Electronic ballasts offer better performance than magnetic types. The control gear
              typically adds 10-15% to lamp wattage (system watts &gt; lamp watts).
            </p>
            <p>
              <strong>Replacement planning:</strong> HID lamp and ballast availability is declining
              as manufacturers focus on LED. Plan proactive LED replacement rather than waiting for
              failure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Calculate efficacy, work out an annual saving, and weigh up lamp replacement costs over a long lifetime."
          >
            <p>
              <strong>Example 1: Efficacy Calculation.</strong> A LED panel consumes 32W and
              produces 3840 lumens. What is its efficacy? Compare to a 36W T8 fluorescent producing
              3350 lumens.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                LED efficacy = 3840 lm / 32 W = <strong>120 lm/W</strong>
              </li>
              <li>
                T8 efficacy = 3350 lm / 36 W = <strong>93 lm/W</strong>
              </li>
              <li>
                Efficiency improvement = (120 - 93) / 93 × 100 = <strong>29% more efficient</strong>
              </li>
              <li>The LED also has longer life and better dimming capability.</li>
            </ul>
            <p>
              <strong>Example 2: Energy Savings.</strong> An office has 100 × 2-lamp T8 fittings
              (72W each including ballast), operating 3000 hours/year. Calculate annual savings if
              replaced with 40W LED panels.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current consumption = 100 × 72W × 3000h = 21,600 kWh/year</li>
              <li>LED consumption = 100 × 40W × 3000h = 12,000 kWh/year</li>
              <li>
                Saving = 21,600 - 12,000 = <strong>9,600 kWh/year</strong>
              </li>
              <li>
                At £0.15/kWh = <strong>£1,440/year energy saving</strong>
              </li>
              <li>Plus reduced lamp replacement and maintenance costs.</li>
            </ul>
            <p>
              <strong>Example 3: Life Cycle Analysis.</strong> Compare lamp replacement requirements
              over 50,000 operating hours for T5 fluorescent (20,000h life) versus LED (L70 at
              50,000h).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                T5 replacements = 50,000 / 20,000 = <strong>2.5 lamp changes</strong> (minimum 2)
              </li>
              <li>
                LED replacements = <strong>0 lamp changes</strong> (still at 70% output)
              </li>
              <li>For 100 luminaires: T5 means 200+ lamps and multiple maintenance visits; LED
              means zero lamp changes, only potential driver replacement.</li>
              <li>Significant labour and disruption savings with LED.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Selection criteria, an LED spec checklist, and the documents that prove the manufacturer's claims."
          >
            <p>
              <strong>Lamp Selection Criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Efficacy:</strong> Higher = lower running costs
              </li>
              <li>
                <strong>Life (hours):</strong> Affects maintenance costs
              </li>
              <li>
                <strong>CRI:</strong> Colour quality requirement
              </li>
              <li>
                <strong>CCT:</strong> Colour appearance specification
              </li>
              <li>
                <strong>Dimming:</strong> Control requirements
              </li>
              <li>
                <strong>Warranty:</strong> Manufacturer backing
              </li>
            </ul>
            <p>
              <strong>LED Specification Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Luminaire efficacy (not chip efficacy)</li>
              <li>L70 or L80 life rating with hours</li>
              <li>LM-79 photometric test report</li>
              <li>LM-80/TM-21 life data</li>
              <li>DALI compatibility if required</li>
              <li>5+ year warranty minimum</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Chip vs luminaire efficacy:</strong> Always use luminaire data
                </li>
                <li>
                  <strong>Ignoring thermal management:</strong> LED life depends on temperature
                </li>
                <li>
                  <strong>Poor driver quality:</strong> Causes flicker and early failure
                </li>
                <li>
                  <strong>No dimming spec:</strong> Must match driver to control system
                </li>
              </ul>
            }
            doInstead="Always design from luminaire (not chip) efficacy, check the thermal design and ambient temperature suit the LED's rating, demand named-brand drivers from a reputable supplier, and write the dimming protocol (DALI, 1-10V, etc) into the spec from day one."
          />

          <SectionRule />

          <Scenario
            title="LED retrofit study for a 1990s warehouse with metal-halide highbays"
            situation={
              <>
                A 6,000 m² distribution warehouse runs 80 × 400 W metal-halide highbays
                (≈85 lm/W including ballast losses) over 4,000 hours/year. The client
                wants a payback case for an LED retrofit with daylight and PIR controls,
                targeting CIBSE LG7 warehouse Em = 200 lux.
              </>
            }
            whatToDo={
              <>
                Specify a 200 lm/W LED highbay at 150 W with L80 = 100,000 hours and
                IP65 housing. Recompute layout: fewer fittings can deliver Em = 200 lux
                with U₀ ≥ 0.4. Add zoned PIR + daylight dimming (typically 30–45%
                additional saving). Build the payback model: capex × kit + install,
                opex saving = (Old kW − New kW) × hours × £/kWh. Quote payback,
                Part L compliance evidence, and the BREEAM Ene-03 / Hea-01 contribution.
              </>
            }
            whyItMatters={
              <>
                Highbays are a top-three energy line in any logistics building. An evidenced
                LED retrofit case unlocks ESOS / SECR reporting credit, drops the building&rsquo;s
                EPC band, and pays back inside three years. Without the lm/W and L80 numbers,
                the FD signs nothing.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Efficacy = luminous flux (lm) ÷ electrical input power (W); always quote system efficacy, not bare lamp.',
              'LED 130–200 lm/W; T5 fluorescent ~95 lm/W; metal halide ~85 lm/W; tungsten ~12 lm/W (now banned for general lighting).',
              'L70 = time at which LED output drops to 70% of initial — typical 50,000–100,000 hours.',
              'Driver life is usually shorter than LED life — specify the same B10 life for both.',
              'Fluorescent T5/T8 are being phased out under EU/UK RoHS; new schemes default to LED.',
              'TM-66 sets circular-economy criteria — increasingly written into commercial lighting briefs.',
              'Part L of the Building Regulations sets minimum lamp efficacy and W/m²·100 lux limits.',
              'Always pair efficacy with CRI, CCT and life when comparing lamp options — a single metric never tells the full story.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Illumination Calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Sound Fundamentals
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_3;
