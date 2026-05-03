/**
 * Module 7 · Section 2 · Subsection 3 — Life Safety Power
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Essential supplies, safety services, fire-rated cables, switchover systems, and testing requirements
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

const TITLE = 'Life Safety Power - HNC Module 7 Section 2.3';
const DESCRIPTION =
  'Master life safety power systems for building services: essential supplies, safety services per BS 7671 Chapter 56, fire-rated cables to BS 7846/BS 8519, switchover systems, automatic transfer switches, and testing requirements.';

const quickCheckQuestions = [
  {
    id: 'safety-services-definition',
    question: 'What are safety services as defined in BS 7671?',
    options: [
      'Any electrical service in a building',
      'Services essential for safety of persons in emergency conditions',
      'Services that protect electrical equipment',
      'Services installed in fire compartments',
    ],
    correctIndex: 1,
    explanation:
      'Safety services are electrical services essential for the safety of persons in the event of emergency conditions such as fire, requiring maintained power supply for evacuation, firefighting, and rescue operations.',
  },
  {
    id: 'fire-rating-standard',
    question: 'Which standard specifies fire-resistant cable requirements for UK installations?',
    options: [
      'BS 7671 only',
      'BS 7846 for fire performance classification',
      'BS 5839 for fire detection',
      'IEC 60364 for wiring systems',
    ],
    correctIndex: 1,
    explanation:
      'BS 7846 specifies fire performance categories for cables, classifying them according to their ability to maintain circuit integrity under fire conditions (e.g., PH30, PH60, PH120).',
  },
  {
    id: 'changeover-time',
    question:
      'What is the maximum changeover time for automatic transfer to safety supply for emergency lighting?',
    options: ['0.5 seconds', '5 seconds', '15 seconds', '60 seconds'],
    correctIndex: 1,
    explanation:
      'BS 7671 Regulation 560.6.12 requires safety services to be available within specified times - typically 5 seconds maximum for emergency lighting to ensure safe evacuation conditions.',
  },
  {
    id: 'cable-rating-duration',
    question: 'A cable rated PH60 will maintain circuit integrity for how long?',
    options: [
      '30 minutes under fire conditions',
      '60 minutes under fire conditions',
      '90 minutes under fire conditions',
      '120 minutes under fire conditions',
    ],
    correctIndex: 1,
    explanation:
      'The PH classification indicates the duration in minutes: PH60 means the cable will maintain circuit integrity for 60 minutes when exposed to fire conditions as tested to BS 8491.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BS 7671 Chapter 56, which of the following is classified as a safety service?',
    options: [
      'General lighting circuits',
      'Emergency escape lighting',
      'Socket outlet circuits',
      'Heating systems',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency escape lighting is a safety service as it is essential for the safety of persons during evacuation. Other safety services include fire detection/alarm systems, smoke control, firefighting lifts, and emergency voice communication.',
  },
  {
    id: 2,
    question: "What does the 'Enhanced' classification mean for fire-resistant cables to BS 8519?",
    options: [
      'Higher current carrying capacity',
      'Improved electromagnetic compatibility',
      'Circuit integrity maintained with water spray application',
      'Reduced smoke emission',
    ],
    correctAnswer: 2,
    explanation:
      'Enhanced fire-resistant cables to BS 8519 maintain circuit integrity when subjected to fire AND simultaneous water spray (simulating firefighting operations). Standard fire-resistant cables are tested under fire conditions only.',
  },
  {
    id: 3,
    question:
      'For a hospital critical care area, what minimum fire rating would typically be required for safety service cables?',
    options: ['PH30 (30 minutes)', 'PH60 (60 minutes)', 'PH90 (90 minutes)', 'PH120 (120 minutes)'],
    correctAnswer: 3,
    explanation:
      'Critical healthcare facilities typically require PH120 rated cables to maintain life safety systems for 2 hours, allowing extended evacuation times for vulnerable patients and continued operation of critical medical equipment.',
  },
  {
    id: 4,
    question: 'An Automatic Transfer Switch (ATS) must comply with which standard?',
    options: [
      'BS 7671 only',
      'BS EN 60947-6-1 for transfer switching equipment',
      'BS 7846 for cable systems',
      'BS 5839 for fire systems',
    ],
    correctAnswer: 1,
    explanation:
      'Automatic Transfer Switches must comply with BS EN 60947-6-1 which specifies requirements for transfer switching equipment including operating times, withstand capability, and coordination requirements.',
  },
  {
    id: 5,
    question: 'Which source classification provides power with zero break during changeover?',
    options: [
      'Non-automatic supply',
      'Automatic supply with short break',
      'Automatic supply with medium break',
      'Uninterruptible supply (no-break)',
    ],
    correctAnswer: 3,
    explanation:
      'An uninterruptible supply (no-break) uses UPS or rotating machinery to provide continuous power with zero interruption. This is required for critical loads that cannot tolerate any supply interruption.',
  },
  {
    id: 6,
    question: "What is the purpose of the 'two-hour rule' in BS 7671 for safety services?",
    options: [
      'Maximum testing duration',
      'Minimum battery capacity for UPS',
      'Evacuation time allowance for larger buildings',
      'Generator start-up time',
    ],
    correctAnswer: 2,
    explanation:
      'The two-hour rule recognises that larger, more complex buildings require extended evacuation times. Safety services must be capable of operating for the duration needed for full evacuation and firefighting operations.',
  },
  {
    id: 7,
    question: 'Which cable installation method provides the highest fire resistance?',
    options: [
      'Clipped direct to combustible surface',
      'Within steel conduit with mineral insulated cable',
      'In plastic trunking',
      'In suspended ceiling void',
    ],
    correctAnswer: 1,
    explanation:
      'Mineral insulated cables within steel conduit provide the highest fire resistance. MICC is inherently fire-resistant, and steel conduit adds mechanical protection and additional fire performance.',
  },
  {
    id: 8,
    question:
      'How often must automatic transfer switches be functionally tested according to best practice?',
    options: ['Daily', 'Weekly', 'Monthly', 'Annually'],
    correctAnswer: 2,
    explanation:
      'Monthly functional testing of ATS units is recommended to verify correct operation. This includes simulating mains failure, verifying transfer to generator, and retransfer on mains restoration.',
  },
  {
    id: 9,
    question:
      'What is the maximum voltage drop permitted for safety service circuits under normal conditions?',
    options: ['2%', '3%', '4%', '5%'],
    correctAnswer: 1,
    explanation:
      'BS 7671 recommends maximum 3% voltage drop for lighting circuits. For safety services, maintaining adequate voltage is critical to ensure equipment operates correctly during emergencies.',
  },
  {
    id: 10,
    question: 'Which safety system typically requires the fastest changeover time?',
    options: ['Emergency lighting', 'Sprinkler pump', 'Smoke extract fan', 'Fire alarm panel'],
    correctAnswer: 3,
    explanation:
      'Fire alarm panels typically require the fastest changeover (&lt;0.5s) as they must maintain continuous monitoring capability. Loss of power, even momentarily, could miss a detection event.',
  },
  {
    id: 11,
    question:
      'For fire-resistant cable installations, what is the maximum support spacing for horizontal runs?',
    options: ['150mm', '300mm', '450mm', '600mm'],
    correctAnswer: 1,
    explanation:
      'Fire-resistant cables should be supported at maximum 300mm centres horizontally (450mm vertically) to prevent cable sagging and potential circuit failure under fire conditions when insulation softens.',
  },
  {
    id: 12,
    question: 'What documentation must be maintained for safety service installations?',
    options: [
      'Installation certificate only',
      'Test certificates and maintenance records throughout operational life',
      'Manufacturer datasheets only',
      'Initial commissioning report only',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive documentation including installation certificates, commissioning records, test results, and ongoing maintenance records must be maintained throughout the operational life as evidence of continued compliance.',
  },
];

const faqs = [
  {
    question: "What is the difference between 'standard' and 'enhanced' fire-resistant cables?",
    answer:
      'Standard fire-resistant cables (to BS 8434-2) maintain circuit integrity under fire conditions only. Enhanced fire-resistant cables (to BS 8519) maintain circuit integrity under fire conditions PLUS simultaneous water spray application, simulating firefighting operations. Enhanced cables are required where cables may be exposed to sprinkler discharge or fire brigade hose streams during operation.',
  },
  {
    question: 'When is a generator required versus UPS for safety services?',
    answer:
      'UPS provides immediate power (no-break or very short break) and is essential for loads that cannot tolerate any interruption (IT systems, fire alarm panels). Generators provide longer duration backup but require 5-15 seconds to start and transfer. Most safety systems use both: UPS for immediate bridging during generator start-up, then generator for extended operation. The choice depends on maximum acceptable break time and required duration.',
  },
  {
    question: 'How do I determine the required fire rating for safety service cables?',
    answer:
      'Fire rating is determined by: (1) Building type and occupancy - hospitals/care homes typically need PH120, offices may need PH60; (2) Evacuation time requirements - multi-storey buildings need longer ratings; (3) Location - cables in fire-protected shafts may need lower ratings; (4) Risk assessment - fire engineering analysis may specify requirements; (5) Regulatory requirements - Building Regulations Approved Document B and specific sector guidance.',
  },
  {
    question: 'What testing is required for automatic transfer switches?',
    answer:
      'ATS testing includes: (1) Monthly functional tests - simulate mains failure, verify transfer, check transfer time; (2) Quarterly load tests - verify operation under load; (3) Annual comprehensive tests - check all settings, timing, coordination with generator; (4) Record all tests in maintenance log. Test procedures should simulate both mains failure and mains restoration to verify bi-directional transfer operation.',
  },
  {
    question: 'Can fire-resistant cables share containment with standard cables?',
    answer:
      'Generally, fire-resistant cables for safety services should be segregated from standard cables to maintain circuit integrity. BS 5839-1 requires fire alarm cables to be separated from other cables. If shared containment is unavoidable, fire-rated containment systems (fire-rated trunking/conduit) may be used, but the preferred approach is physical segregation to eliminate risk of damage from faults in other circuits.',
  },
  {
    question: 'What are the requirements for safety service distribution boards?',
    answer:
      'Safety service distribution boards should: (1) Be dedicated to safety services only - not shared with general loads; (2) Be located in fire-protected areas where possible; (3) Have appropriate fire rating for enclosure; (4) Be clearly labelled as safety services; (5) Have discrimination coordinated to maintain supply during downstream faults; (6) Be fed by appropriately rated fire-resistant cables from source.',
  },
];

const HNCModule7Section2_3 = () => {
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
            eyebrow="Module 7 · Section 2 · Subsection 3"
            title="Life Safety Power"
            description="Essential supplies, safety services, fire-rated cables, switchover systems, and testing requirements"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Define safety services and their classification per BS 7671 Chapter 56",
              "Specify fire-rated cables using BS 7846 and BS 8519 classifications",
              "Design changeover systems with appropriate transfer times",
              "Select and specify automatic transfer switches",
              "Implement testing and maintenance regimes for safety supplies",
              "Apply fire rating requirements to cable installation methods",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Safety Services and Essential Supplies">
            <p>Safety services are electrical installations essential for the safety of persons in emergency conditions. BS 7671 Chapter 56 provides comprehensive requirements for these critical systems, which must remain operational during fire, evacuation, and rescue operations.</p>
            <p><strong>Safety service classifications:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Emergency escape lighting:</strong> Illuminates escape routes during evacuation</li>
              <li><strong>Fire detection and alarm:</strong> Early warning and alert systems</li>
              <li><strong>Smoke control systems:</strong> Maintains tenable conditions in escape routes</li>
              <li><strong>Firefighting lifts:</strong> Enables firefighter access to all floors</li>
              <li><strong>Emergency voice communication:</strong> Public address for evacuation instructions</li>
              <li><strong>Fire suppression systems:</strong> Sprinkler pumps and gas suppression</li>
            </ul>
            <p><strong>Source Classifications (BS 7671 Regulation 560.6)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>No-break (UPS):</strong> 0 seconds — Fire alarm panels, critical IT</li>
              <li><strong>Very short break:</strong> &lt; 0.15 seconds — Emergency lighting (maintained)</li>
              <li><strong>Short break:</strong> &lt; 0.5 seconds — Smoke control systems</li>
              <li><strong>Medium break:</strong> &lt; 15 seconds — Firefighting lifts, sprinkler pumps</li>
              <li><strong>Long break:</strong> &gt; 15 seconds — Non-critical backup loads</li>
            </ul>
            <p><strong>Key principle:</strong> The changeover time must be selected based on the most critical load - all loads on that source must tolerate the transfer duration.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fire-Rated Cables and Standards">
            <p>Fire-rated cables maintain circuit integrity under fire conditions, ensuring safety systems continue operating during emergencies. BS 7846 provides the classification framework, while BS 8519 specifies enhanced performance requirements.</p>
            <p><strong>BS 7846 Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PH30:</strong> 30 minutes fire resistance</li>
              <li><strong>PH60:</strong> 60 minutes fire resistance</li>
              <li><strong>PH90:</strong> 90 minutes fire resistance</li>
              <li><strong>PH120:</strong> 120 minutes fire resistance</li>
            </ul>
            <p><strong>BS 8519 Enhanced</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire resistance PLUS water spray</li>
              <li>Simulates firefighting conditions</li>
              <li>Required where exposed to sprinklers</li>
              <li>Higher performance requirement</li>
            </ul>
            <p><strong>Cable Type Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MICC (Mineral Insulated):</strong> Inherently fire-resistant — Highest performance, harsh environments</li>
              <li><strong>FP200 Gold:</strong> PH120 to BS 8491 — Fire alarm, emergency lighting</li>
              <li><strong>SWA with fire barrier:</strong> Variable with system — Power to safety equipment</li>
              <li><strong>LSOH fire-resistant:</strong> PH30/60/90/120 — General safety services</li>
            </ul>
            <p><strong>Installation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Support spacing:</strong> 300mm max horizontal, 450mm max vertical</li>
              <li><strong>Fire-rated clips:</strong> Must match cable fire rating</li>
              <li><strong>Segregation:</strong> Separate from non-safety cables</li>
              <li><strong>Fire stopping:</strong> Maintain compartment integrity at penetrations</li>
            </ul>
            <p><strong>Selection principle:</strong> Fire rating must exceed the required operational time for evacuation plus firefighting access - typically 60-120 minutes for most commercial buildings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Changeover Systems and Automatic Transfer">
            <p>Automatic Transfer Switches (ATS) provide seamless changeover between normal and standby power sources. Proper design ensures safety services receive power within acceptable transfer times while preventing backfeed hazards.</p>
            <p><strong>ATS Operating Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1.</strong> Monitor mains supply voltage and frequency</li>
              <li><strong>2.</strong> Detect mains failure (voltage drops below threshold)</li>
              <li><strong>3.</strong> Send start signal to standby generator</li>
              <li><strong>4.</strong> Generator reaches rated speed and voltage</li>
              <li><strong>5.</strong> ATS transfers load to generator</li>
              <li><strong>6.</strong> Monitor mains for restoration</li>
              <li><strong>7.</strong> Retransfer to mains after stabilisation delay</li>
              <li><strong>8.</strong> Generator runs on cooldown, then stops</li>
            </ul>
            <p><strong>ATS Types and Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Open transition:</strong> 50-100ms break — Standard safety services</li>
              <li><strong>Closed transition:</strong> Make-before-break — Critical loads, paralleling</li>
              <li><strong>Soft load transfer:</strong> Ramped transition — Motor loads, gradual transfer</li>
              <li><strong>Static (solid-state):</strong> &lt; 4ms — Data centres, critical IT</li>
            </ul>
            <p><strong>Key Design Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage sensing:</strong> Typically 85-90% of nominal for under-voltage detection</li>
              <li><strong>Frequency sensing:</strong> Usually ± 3-5% of nominal frequency</li>
              <li><strong>Time delays:</strong> Prevent nuisance transfers on transients</li>
              <li><strong>Interlocking:</strong> Mechanical and electrical prevention of paralleling</li>
              <li><strong>Bypass facilities:</strong> Manual override for maintenance</li>
            </ul>
            <p><strong>Safety requirement:</strong> Open transition is preferred for most applications as it prevents any possibility of generator-mains paralleling, which requires complex protection coordination.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Testing Requirements and Maintenance">
            <p>Safety service installations require rigorous testing regimes to ensure reliability when needed. BS 7671 and equipment-specific standards define commissioning tests, while ongoing maintenance ensures continued operational readiness.</p>
            <p><strong>Commissioning Tests</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable continuity verification</li>
              <li>Insulation resistance tests</li>
              <li>ATS functional operation</li>
              <li>Transfer time measurement</li>
              <li>Generator load test</li>
            </ul>
            <p><strong>Monthly Tests</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simulated mains failure</li>
              <li>ATS transfer verification</li>
              <li>Generator start test</li>
              <li>Retransfer operation</li>
              <li>Alarm/indication check</li>
            </ul>
            <p><strong>Annual Tests</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full load test (4 hours)</li>
              <li>Protection coordination</li>
              <li>Cable IR re-test</li>
              <li>Battery capacity test</li>
              <li>Timing sequence check</li>
            </ul>
            <p><strong>Test Documentation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Commissioning certificate:</strong> Initial test results, system configuration — Life of installation</li>
              <li><strong>Monthly test log:</strong> Test date, results, operator signature — Minimum 3 years</li>
              <li><strong>Annual inspection report:</strong> Comprehensive assessment, remedials — Life of installation</li>
              <li><strong>Maintenance records:</strong> Repairs, replacements, modifications — Life of installation</li>
            </ul>
            <p><strong>Generator Load Bank Testing</strong></p>
            <p><strong>Purpose:</strong> Verify generator can sustain rated load for required duration</p>
            <p><strong>Frequency:</strong> Annual minimum, quarterly for critical facilities</p>
            <p><strong>Load:</strong> Minimum 30% of rated capacity, preferably 75-100%</p>
            <p><strong>Duration:</strong> 4 hours minimum for annual test</p>
            <p><strong>Records:</strong> Fuel consumption, temperature, oil pressure, voltage/frequency stability</p>
            <p><strong>Compliance note:</strong> Fire safety legislation requires safety systems to be maintained in proper working order. Test records provide evidence of compliance and may be requested by enforcing authorities.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Fire Rating Selection for Hospital</strong>
            </p>
            <p><strong>Scenario:</strong> Specify cable fire rating for a new hospital wing with 4 floors above ground.</p>
            <p>Analysis:</p>
            <p>Building type: Healthcare (vulnerable occupants)</p>
            <p>Evacuation complexity: High (patients, equipment)</p>
            <p>Vertical escape routes: 4 floors requiring protected stairs</p>
            <p>Regulatory requirements:</p>
            <p>- BS 5839-1 recommends PH120 for fire alarm cables in hospitals</p>
            <p>- HTM 06-01 guidance for healthcare facilities</p>
            <p>- Extended evacuation time &gt; 60 minutes likely</p>
            <p>Cable specification:</p>
            <p>Fire alarm: PH120 (BS 8434-2) minimum</p>
            <p>Emergency lighting: PH120 (BS 8434-2)</p>
            <p>Smoke control: PH120 enhanced (BS 8519)</p>
            <p>Support: Fire-rated clips at 300mm centres</p>
            <p>Result: PH120 enhanced cables throughout safety services</p>
            <p>
              <strong>Example 2: ATS Sizing and Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Select ATS for 500kVA generator serving safety loads in office building.</p>
            <p>Load analysis:</p>
            <p>Safety loads connected:</p>
            <p>- Emergency lighting: 15kW</p>
            <p>- Fire alarm system: 5kW</p>
            <p>- Smoke extract fans: 45kW</p>
            <p>- Firefighting lift: 30kW</p>
            <p>- Sprinkler pump: 55kW</p>
            <p>Total safety load: 150kW</p>
            <p>ATS sizing:</p>
            <p>Rated current = 500kVA / (√3 × 400V) = 722A</p>
            <p>Select 800A ATS to BS EN 60947-6-1</p>
            <p>ATS specification:</p>
            <p>- Type: Open transition (no paralleling)</p>
            <p>- Transfer time: &lt; 100ms</p>
            <p>- Mechanical and electrical interlock</p>
            <p>- Manual bypass for maintenance</p>
            <p>Result: 800A 4-pole ATS, open transition, Type 2 coordination</p>
            <p>
              <strong>Example 3: Monthly Test Procedure Development</strong>
            </p>
            <p><strong>Scenario:</strong> Develop monthly functional test procedure for office building safety power system.</p>
            <p>Test procedure:</p>
            <p>Pre-test checks:</p>
            <p>1. Notify building management and occupants</p>
            <p>2. Verify generator fuel level &gt; 50%</p>
            <p>3. Check generator oil and coolant levels</p>
            <p>4. Record mains voltage and frequency</p>
            <p>Functional test sequence:</p>
            <p>1. Simulate mains failure at ATS (test button)</p>
            <p>2. Start stopwatch - verify generator starts</p>
            <p>3. Record time to rated voltage: _____ seconds</p>
            <p>4. Verify ATS transfers to generator</p>
            <p>5. Record transfer time: _____ seconds</p>
            <p>6. Check all safety loads energised</p>
            <p>7. Run on generator for 15 minutes minimum</p>
            <p>8. Restore mains simulation</p>
            <p>9. Record retransfer time: _____ seconds</p>
            <p>10. Verify generator cooldown cycle</p>
            <p>Record all times, sign and date test log</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design Checklist for Safety Power Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all safety services requiring maintained supply</li>
              <li>Determine required changeover time for each load type</li>
              <li>Calculate total safety load for generator/UPS sizing</li>
              <li>Specify cable fire ratings based on building risk assessment</li>
              <li>Select ATS type appropriate for load characteristics</li>
              <li>Design segregated distribution for safety services</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Emergency lighting changeover: <strong>5 seconds maximum</strong></li>
              <li>Fire alarm changeover: <strong>&lt; 0.5 seconds</strong></li>
              <li>Cable support spacing: <strong>300mm horizontal, 450mm vertical</strong></li>
              <li>Generator test frequency: <strong>Monthly functional, annual load</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Under-rated fire cables</strong> - Always select rating for worst-case evacuation time</li>
                <li><strong>Inadequate support spacing</strong> - Cables sag and fail under fire conditions</li>
                <li><strong>Mixed loads on ATS</strong> - All loads must tolerate the transfer time</li>
                <li><strong>Neglected testing</strong> - Systems fail when needed if not regularly tested</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fire alarm systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Standby generator systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section2_3;
