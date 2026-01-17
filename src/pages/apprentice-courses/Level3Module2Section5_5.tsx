/**
 * Level 3 Module 2 Section 5.5
 * Inspection, Testing & Certification of Integrated Systems
 *
 * Design follows: Level3ContentTemplate.tsx
 * Mobile optimised with touch targets and dark theme
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Inspection, Testing & Certification of Integrated Systems - Level 3 Module 2 Section 5.5";
const DESCRIPTION = "Comprehensive guide to testing procedures and certification requirements for integrated renewable energy systems including PV, battery storage, and heat pumps.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What additional testing is required for a PV system beyond standard AC circuit tests?",
    options: [
      "No additional testing is needed",
      "DC string testing including open circuit voltage, short circuit current, and insulation resistance",
      "Only visual inspection of the panels",
      "Grid frequency testing only"
    ],
    correctIndex: 1,
    explanation: "PV systems require DC-side testing not covered by standard AC tests. This includes Voc and Isc measurements to verify string configuration, and DC insulation resistance testing to identify any faults in the array wiring."
  },
  {
    id: "check-2",
    question: "Which certificate is required for a new PV installation connecting to an existing consumer unit?",
    options: [
      "Minor Electrical Installation Works Certificate only",
      "Electrical Installation Certificate (EIC) with Schedule of Test Results",
      "No certificate is required for PV",
      "Visual inspection report only"
    ],
    correctIndex: 1,
    explanation: "A new PV installation is notifiable work requiring an Electrical Installation Certificate with full Schedule of Test Results. This documents the AC and DC sides, proving compliance with BS 7671 and forms part of the MCS certification package."
  },
  {
    id: "check-3",
    question: "Why is functional testing of the inverter's anti-islanding protection important?",
    options: [
      "It's optional and rarely done",
      "To verify the inverter shuts down when grid supply is lost, protecting network workers",
      "To increase the system's energy output",
      "Only for commercial installations"
    ],
    correctIndex: 1,
    explanation: "Anti-islanding protection is a safety-critical function. Testing verifies the inverter disconnects within the required time when grid supply is lost, preventing the system from energising what should be a dead network."
  },
  {
    id: "check-4",
    question: "What certification scheme is typically required for domestic renewable installations to qualify for SEG payments?",
    options: [
      "ISO 9001",
      "MCS (Microgeneration Certification Scheme)",
      "BREEAM",
      "No certification is required"
    ],
    correctIndex: 1,
    explanation: "MCS certification confirms the installation was completed by an accredited installer to appropriate standards. It's a requirement for Smart Export Guarantee eligibility and provides assurance of quality and compliance to the customer."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the correct sequence for testing a newly installed PV system?",
    options: [
      "Connect to grid first, then test DC side",
      "Test DC strings first while isolated, then commission inverter and test AC side",
      "Only test the AC side - DC testing is not required",
      "Visual inspection only, no electrical testing needed"
    ],
    correctAnswer: 1,
    explanation: "Always test DC strings before connecting to the inverter. This identifies any faults in the array safely. Once DC testing is complete and satisfactory, commission the inverter and test the AC side, including earth fault loop impedance and RCD operation."
  },
  {
    id: 2,
    question: "What minimum insulation resistance is typically acceptable for DC PV string testing?",
    options: [
      "0.5 megohms",
      "1 megohm minimum, many systems require higher",
      "100 ohms",
      "Insulation resistance testing is not applicable to PV"
    ],
    correctAnswer: 1,
    explanation: "DC insulation resistance should be at least 1 megohm, with many inverter manufacturers requiring higher values for warranty purposes. Low readings indicate insulation damage or moisture ingress that could cause faults or fires."
  },
  {
    id: 3,
    question: "When testing an EV charger installation, what type of RCD operation should be verified?",
    options: [
      "Only 30mA trip time",
      "Trip time at rated current and also verify correct RCD type for DC fault detection",
      "RCDs are not required for EV chargers",
      "Only the charger's internal RCD needs testing"
    ],
    correctAnswer: 1,
    explanation: "Test both trip time (typically 300ms maximum at rated current) and verify the RCD type is appropriate. EV chargers can produce DC fault components, so Type A (minimum) or Type B RCDs may be required depending on the charger's built-in protection."
  },
  {
    id: 4,
    question: "What documentation forms part of the MCS certification package for a PV installation?",
    options: [
      "Only the inverter manual",
      "EIC, MCS certificate, handover documents, performance estimate, and warranty information",
      "Building regulations approval only",
      "Verbal handover is sufficient"
    ],
    correctAnswer: 1,
    explanation: "MCS certification requires comprehensive documentation including the Electrical Installation Certificate, MCS installation certificate, handover documentation, predicted annual generation estimate, and warranty details. This package protects both customer and installer."
  },
  {
    id: 5,
    question: "How should open circuit voltage (Voc) be measured for a PV string?",
    options: [
      "With the inverter running",
      "With the DC isolator closed",
      "Safely, with string isolated and meter rated for expected voltage",
      "Voc cannot be measured on site"
    ],
    correctAnswer: 2,
    explanation: "Measure Voc with the string isolated from the inverter, using a meter rated for the expected voltage (which can exceed 600V DC on some systems). Compare readings to calculated expected values based on module specifications and temperature."
  },
  {
    id: 6,
    question: "What is the purpose of testing polarity on DC PV circuits?",
    options: [
      "Polarity doesn't matter for DC",
      "Incorrect polarity can damage the inverter and create safety hazards",
      "It only affects the meter reading direction",
      "Polarity is only checked on AC circuits"
    ],
    correctAnswer: 1,
    explanation: "Reversed polarity can damage inverters and create unsafe conditions. DC cables look identical regardless of polarity, so testing confirms positive and negative are correctly connected before energising the inverter."
  },
  {
    id: 7,
    question: "For a battery storage system, what additional testing considerations apply?",
    options: [
      "Batteries don't require testing",
      "Verify isolation of all DC sources, battery protection settings, and safe shutdown procedures",
      "Only test when the battery is fully discharged",
      "Battery systems are tested by the manufacturer only"
    ],
    correctAnswer: 1,
    explanation: "Battery systems require verification of isolation arrangements (batteries can't be 'switched off' like PV), protection settings match the installation, and emergency shutdown procedures work correctly. Documentation should include battery management system configuration."
  },
  {
    id: 8,
    question: "What visual inspection items are specific to PV installations?",
    options: [
      "Standard AC visual inspection only",
      "Array condition, cable management, mounting security, DC isolator accessibility, and labelling",
      "No visual inspection is required for PV",
      "Only inspect the inverter"
    ],
    correctAnswer: 1,
    explanation: "PV visual inspection includes array condition (no damage, clean), cable routing and protection (especially roof penetrations), mounting security, accessibility of all isolators, and correct warning labels at all required locations."
  },
  {
    id: 9,
    question: "How is earth fault loop impedance affected by the presence of local generation?",
    options: [
      "It always increases",
      "It's unaffected",
      "Local generation can affect measured values; testing should note generation status",
      "Loop impedance testing is not required with generation present"
    ],
    correctAnswer: 2,
    explanation: "Generation can affect loop impedance measurements by contributing to fault current. Test results should note whether generation was active. Some testers may give unreliable readings with generation operating - follow manufacturer guidance."
  },
  {
    id: 10,
    question: "What ongoing inspection and testing is recommended for renewable installations?",
    options: [
      "None - only initial commissioning testing required",
      "Annual visual inspection and periodic testing as per BS 7671 recommendations",
      "Testing only if faults occur",
      "Weekly electrical testing"
    ],
    correctAnswer: 1,
    explanation: "Regular inspection and testing maintains safety and performance. Annual visual inspection catches developing problems, while periodic testing intervals follow BS 7671 guidance. Many MCS schemes require documented maintenance for warranty validity."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I use my standard multifunction tester for PV testing?",
    answer: "Standard multifunction testers work for AC-side testing. DC-side testing requires a meter rated for the expected voltages (often 600V+ DC) and specific DC insulation resistance testing capability. Some testers have PV-specific functions. Always verify your equipment is rated for the voltages you'll encounter."
  },
  {
    question: "What happens if my test results are outside expected parameters?",
    answer: "Investigate before energising. Low insulation resistance could indicate damage or moisture. Voltage readings significantly different from calculations might indicate wiring errors or faulty modules. Never commission a system with unexplained test results - the fault must be found and rectified first."
  },
  {
    question: "Is the electrical certificate different for PV compared to standard work?",
    answer: "The same EIC format is used, but PV installations require additional entries. The Schedule of Test Results should include DC-side test results, and observations should note any PV-specific items. Some installers use supplementary sheets specifically designed for PV testing records."
  },
  {
    question: "Who can sign off an MCS installation?",
    answer: "Only installers who are MCS certified (or working for an MCS certified company) can issue MCS certificates. The individual must be competent and authorised by the MCS certified business. Self-certification by non-MCS installers isn't valid for SEG eligibility."
  },
  {
    question: "How do I test anti-islanding protection?",
    answer: "The safest method is to disconnect the AC supply while the inverter is generating and verify it shuts down within the required time (typically 500ms). The inverter should display or log this event. Some advanced testers can simulate grid failure. Always follow manufacturer guidance for the specific inverter."
  },
  {
    question: "What records should be kept for renewable installations?",
    answer: "Retain copies of all certificates, test results, commissioning records, DNO notifications, product warranties, and handover documentation. For MCS work, records must be kept for the warranty period. These records are essential if problems arise or the system is modified later."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Inspection, Testing & Certification
          </h1>
          <p className="text-white/80">
            Testing procedures and certification for integrated renewable systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>DC testing:</strong> Voc, Isc, insulation resistance before commissioning</li>
              <li><strong>AC testing:</strong> Standard tests plus anti-islanding verification</li>
              <li><strong>Documentation:</strong> EIC required, MCS for SEG eligibility</li>
              <li><strong>Handover:</strong> Complete documentation package to customer</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> MCS certificates, warning labels, accessible isolators</li>
              <li><strong>Use:</strong> DC-rated test equipment for string testing</li>
              <li><strong>Apply:</strong> Test DC side before connecting to inverter</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "DC string testing procedures for PV systems",
              "AC-side testing requirements for renewable installations",
              "Anti-islanding protection verification",
              "Certification requirements including MCS",
              "Documentation and handover procedures",
              "Ongoing inspection and maintenance requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DC Side Testing for PV Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC testing must be completed before connecting strings to the inverter. This isn't just good practice - it's the only safe way to verify the array is correctly wired. Once connected to an inverter, finding faults becomes more difficult, and incorrect wiring can damage expensive equipment.
            </p>

            <p>
              Open circuit voltage (Voc) testing verifies the string configuration matches the design. Each string should produce a voltage close to the sum of individual module Voc values, adjusted for temperature. Significant variations indicate missing modules, bypass diode failures, or wiring errors. Compare readings between strings - they should be similar.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential DC Tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Open circuit voltage (Voc):</strong> Verify string voltage matches design calculation</li>
                <li><strong>Short circuit current (Isc):</strong> Verify current capability of each string</li>
                <li><strong>Insulation resistance:</strong> Test between positive-earth and negative-earth</li>
                <li><strong>Polarity:</strong> Confirm correct positive and negative identification</li>
                <li><strong>Continuity:</strong> Verify protective bonding connections</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> PV arrays produce voltage whenever light falls on them - they cannot be 'switched off'. Always treat the DC side as live during testing and use appropriate PPE and DC-rated equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            AC Side Testing and Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              AC-side testing follows standard BS 7671 requirements with additional considerations for generation systems. The inverter circuit requires the same tests as any final circuit: continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard AC Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuity of protective conductors</li>
                  <li>Insulation resistance (inverter isolated)</li>
                  <li>Polarity verification</li>
                  <li>Earth fault loop impedance (Zs)</li>
                  <li>RCD operation (trip time and current)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generation-Specific Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Anti-islanding protection verification</li>
                  <li>Export limiter operation (if fitted)</li>
                  <li>Generation monitoring function</li>
                  <li>Grid voltage and frequency tolerance</li>
                  <li>Reconnection delay timing</li>
                </ul>
              </div>
            </div>

            <p>
              When testing earth fault loop impedance, be aware that local generation can affect readings. Test with the inverter off for consistent results that can be compared to design calculations. If testing with generation operating, note this on the certificate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Functional Testing and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond electrical testing, functional commissioning verifies that all system components operate correctly together. For PV systems, this includes verifying the inverter starts correctly, generates power as expected, and responds appropriately to various conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Commissioning Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Inverter starts and connects to grid without errors</li>
                <li>Power output is reasonable for conditions (compare to design estimate)</li>
                <li>Monitoring system shows correct data</li>
                <li>Anti-islanding operates correctly when AC is disconnected</li>
                <li>Export limiter prevents export (if configured for zero export)</li>
                <li>All displays and indicators function correctly</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Commissioning a 4kW PV system on a sunny afternoon. Expected output at 800W/m² irradiance would be approximately 3.2kW. If the inverter shows only 1.5kW, there's a problem - perhaps a string isn't connected, or shading is affecting output. Investigate before completing handover.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Certification and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation protects everyone - the installer has evidence of correct installation, the customer has proof for warranty and SEG purposes, and future electricians have information about the system. The minimum requirements depend on the installation type and whether MCS certification applies.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Electrical Certificate</p>
                <p className="text-white/90 text-xs">EIC with full Schedule of Test Results for both AC and DC</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">MCS Certificate</p>
                <p className="text-white/90 text-xs">Required for SEG eligibility, issued by MCS installer</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Handover Pack</p>
                <p className="text-white/90 text-xs">Manuals, warranties, maintenance guidance, performance estimate</p>
              </div>
            </div>

            <p>
              MCS certification involves more than just the certificate - it's a complete package including predicted annual generation (for customer expectations and financial planning), maintenance requirements, warranty information, and instructions for safe operation. The installer must provide all documentation at handover.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Keep copies of all documentation. Records may be needed years later for warranty claims, modifications, or when the property is sold. Electronic records should be backed up.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use DC-rated test equipment for string testing</li>
                <li>Compare Voc readings to temperature-corrected calculations</li>
                <li>Test insulation resistance with at least system Voc voltage</li>
                <li>Document all readings, even if they're satisfactory</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify output matches expectations for conditions</li>
                <li>Test all safety functions including anti-islanding</li>
                <li>Configure monitoring and verify data accuracy</li>
                <li>Walk customer through system operation and safety</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping DC testing</strong> - Problems found later are harder to diagnose</li>
                <li><strong>Using AC-rated equipment for DC tests</strong> - Dangerous and inaccurate</li>
                <li><strong>Incomplete documentation</strong> - Causes problems for customer and future work</li>
                <li><strong>Rushing handover</strong> - Customer needs to understand their system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">DC Test Minimums</p>
                <ul className="space-y-0.5">
                  <li>Insulation resistance: 1 megohm minimum</li>
                  <li>Voc: within 5% of calculated value</li>
                  <li>Strings: readings should match</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Documentation Required</p>
                <ul className="space-y-0.5">
                  <li>EIC with Schedule of Test Results</li>
                  <li>MCS certificate (if applicable)</li>
                  <li>DNO notification confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Load Balancing
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6">
              Next: Section 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section5_5;
