/**
 * Level 3 Module 6 Section 3.5 - Cable Sizing Calculations
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Sizing Calculations - Level 3 Module 6 Section 3.5";
const DESCRIPTION = "Complete cable sizing calculations using BS 7671 methods. Worked examples for domestic and commercial circuits including current capacity, voltage drop, and earth fault loop impedance verification.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the maximum permitted voltage drop for a lighting circuit?", options: ["1%", "3%", "5%", "10%"], correctIndex: 1, explanation: "BS 7671 Appendix 4 limits voltage drop to 3% of nominal voltage for lighting circuits (6.9V for 230V) and 5% for other circuits (11.5V)." },
  { id: "check-2", question: "A 32A ring circuit, 40m total length, 2.5mm2 cable. What is the approximate voltage drop at full load?", options: ["5.6V", "7.2V", "11.2V", "14.4V"], correctIndex: 0, explanation: "Ring circuit VD = (mV/A/m x I x L) / 4 = (18 x 32 x 40) / 4000 = 5.76V. The /4 accounts for ring topology." },
  { id: "check-3", question: "A shower circuit is 18m long. 10mm2 cable has R1+R2 of 0.54 ohms/m. What is the circuit R1+R2?", options: ["0.03 ohms", "9.72 ohms", "0.097 ohms", "0.0097 ohms"], correctIndex: 3, explanation: "R1+R2 = (R1+R2)/m x Length = 0.54/1000 x 18 = 0.0097 ohms. Note: published values often in milliohms/m." },
  { id: "check-4", question: "Why must Zs be checked after cable selection?", options: ["To verify cable cost", "To ensure protective device operates within required disconnection time", "To calculate voltage drop", "To determine cable colour"], correctIndex: 1, explanation: "Zs (earth fault loop impedance) must be low enough for fault current to operate the protective device within 0.4s (final circuits) or 5s (distribution circuits)." }
];

const quizQuestions = [
  { id: 1, question: "A radial circuit has Ib=25A, protected by 32A MCB. Ca=0.94, Cg=0.70, Ci=1.0. What minimum It is required?", options: ["32A", "38.6A", "48.6A", "52A"], correctAnswer: 2, explanation: "It >= In / (Ca x Cg x Ci) = 32 / (0.94 x 0.70 x 1.0) = 32 / 0.658 = 48.6A minimum." },
  { id: 2, question: "Table 4D5 shows 6mm2 has It=47A (Method C). With factors 0.87 x 0.80, what is actual Iz?", options: ["32.7A", "37.0A", "47.0A", "54.0A"], correctAnswer: 0, explanation: "Iz = It x Ca x Cg = 47 x 0.87 x 0.80 = 32.7A actual capacity under installed conditions." },
  { id: 3, question: "Voltage drop for 4mm2 cable is 11 mV/A/m. A 20A load over 25m gives what VD?", options: ["5.5V", "8.8V", "11V", "2.2V"], correctAnswer: 0, explanation: "VD = (mV/A/m x I x L) / 1000 = (11 x 20 x 25) / 1000 = 5.5V" },
  { id: 4, question: "A 230V lighting circuit can have maximum voltage drop of:", options: ["2.3V", "6.9V", "11.5V", "23V"], correctAnswer: 1, explanation: "3% of 230V = 0.03 x 230 = 6.9V maximum for lighting circuits." },
  { id: 5, question: "Complete cable sizing requires checking which three aspects?", options: ["Cost, colour, length", "Current capacity, voltage drop, earth fault loop impedance", "Weight, diameter, insulation", "Temperature, humidity, pressure"], correctAnswer: 1, explanation: "A complete cable sizing check covers: current-carrying capacity (thermal), voltage drop (operation), and Zs (safety/disconnection time)." },
  { id: 6, question: "A type B MCB has maximum Zs of 1.44 ohms for 0.4s disconnection. If Ze=0.35 ohms, what is maximum R1+R2?", options: ["1.09 ohms", "1.44 ohms", "1.79 ohms", "0.35 ohms"], correctAnswer: 0, explanation: "Zs = Ze + R1 + R2. Therefore R1+R2 = Zs - Ze = 1.44 - 0.35 = 1.09 ohms maximum." },
  { id: 7, question: "For a ring final circuit, the effective impedance is:", options: ["Full loop value", "Half the loop value", "Quarter the loop value", "Double the loop value"], correctAnswer: 2, explanation: "In a ring circuit, current splits at the origin, so effective impedance is (R1+R2)/4 for voltage drop and earth fault considerations." },
  { id: 8, question: "A 40A circuit, 30m long, needs 6mm2 cable (18mV/A/m). What is the voltage drop?", options: ["7.2V", "14.4V", "21.6V", "28.8V"], correctAnswer: 2, explanation: "VD = (18 x 40 x 30) / 1000 = 21.6V. This exceeds 5% limit (11.5V), so larger cable needed." },
  { id: 9, question: "If calculated Zs exceeds the maximum for the MCB, what can be done?", options: ["Increase MCB rating", "Use larger cable CSA", "Reduce circuit length", "Both B and C"], correctAnswer: 3, explanation: "To reduce Zs: use larger CSA cable (lower resistance), reduce circuit length, or change protective device type/rating. All reduce R1+R2 contribution." },
  { id: 10, question: "Why might a cable selected for current capacity need to be increased for voltage drop?", options: ["Manufacturing tolerances", "Long cable runs have excessive voltage drop", "Cable cost reduction", "Aesthetics"], correctAnswer: 1, explanation: "On long runs, voltage drop accumulates. A cable adequate for current capacity may have excessive VD over long distances, requiring the next size up." }
];

const faqs = [
  { question: "What order should I check current capacity, VD, and Zs?", answer: "Start with current capacity to select minimum cable size, then check voltage drop (may require larger cable), finally verify Zs meets disconnection time. Document all three checks." },
  { question: "Can I use voltage drop to help select cable size?", answer: "Yes. Calculate VD for the minimum current-capacity cable. If VD exceeds limits, increase cable size until both current capacity and VD requirements are met." },
  { question: "What if Zs is too high even with the largest practical cable?", answer: "Options include: using RCD protection (allows higher Zs), reducing circuit length by relocating DB, or installing supplementary bonding. Document the solution chosen." },
  { question: "Do I need to check voltage drop for ring circuits differently?", answer: "Yes. Ring circuits have effective VD of (mV/A/m x I x L)/4 due to the ring topology. Use full load current and total ring length, then divide by 4." }
];

const Level3Module6Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section3"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.3.5</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Cable Sizing Calculations</h1>
          <p className="text-white/80">Complete worked examples applying all cable selection criteria</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Check 1:</strong> Current capacity It &gt;= In/(Ca x Cg x Ci)</li>
              <li><strong>Check 2:</strong> Voltage drop &lt;= 3% (lighting) or 5% (other)</li>
              <li><strong>Check 3:</strong> Zs &lt;= maximum for disconnection time</li>
              <li><strong>VD formula:</strong> (mV/A/m x I x L) / 1000</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable schedules, design calculations, EICR reports</li>
              <li><strong>Use:</strong> Size cables for new circuits</li>
              <li><strong>Apply:</strong> Every circuit design from start to finish</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Perform complete cable sizing calculations", "Calculate voltage drop and verify limits", "Calculate and verify earth fault loop impedance", "Apply the cable sizing process to practical circuits", "Document cable sizing calculations correctly", "Troubleshoot when initial cable selection fails checks"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Voltage Drop Calculation</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Voltage drop occurs due to cable resistance. BS 7671 limits VD to 3% for lighting (6.9V) and 5% for other circuits (11.5V) at nominal 230V.</p>
            <div className="my-6 p-4 bg-elec-yellow/10 border-l-4 border-elec-yellow rounded">
              <p className="text-sm font-mono text-white">VD = (mV/A/m x Ib x L) / 1000</p>
              <p className="text-xs text-white/70 mt-2">Where: mV/A/m from Table 4D1B-4E4B, Ib = design current, L = cable length in metres</p>
            </div>
            <p className="text-sm text-white/90">For ring circuits: VD = (mV/A/m x Ib x L) / 4000 (divide by 4 for ring topology)</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Worked Example - Radial Circuit</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p><strong>Scenario:</strong> Workshop radial circuit, 25m long, 25A design current, 32A MCB protection, ambient 35C, 3 circuits grouped, Method C installation.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 1 - Correction Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ca = 0.94 (35C ambient, Table 4B1)</li>
                <li>Cg = 0.70 (3 circuits, Table 4C1)</li>
                <li>Ci = 1.0 (no thermal insulation)</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 2 - Minimum It Required:</p>
              <p className="text-sm text-white ml-4">It &gt;= 32 / (0.94 x 0.70 x 1.0) = 32 / 0.658 = 48.6A</p>
              <p className="text-sm text-white ml-4">Select 10mm2 cable (It = 64A from Table 4D5)</p>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 3 - Voltage Drop Check:</p>
              <p className="text-sm text-white ml-4">10mm2 has 4.4 mV/A/m (Table 4D1B)</p>
              <p className="text-sm text-white ml-4">VD = (4.4 x 25 x 25) / 1000 = 2.75V (well under 11.5V limit)</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Earth Fault Loop Impedance</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The earth fault loop impedance (Zs) must be low enough for the protective device to disconnect within required time (0.4s for final circuits up to 32A).</p>
            <div className="my-6 p-4 bg-elec-yellow/10 border-l-4 border-elec-yellow rounded">
              <p className="text-sm font-mono text-white">Zs = Ze + R1 + R2</p>
              <p className="text-xs text-white/70 mt-2">Where: Ze = external loop impedance, R1 = phase conductor, R2 = CPC resistance</p>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Zs Values (Type B MCB, 0.4s):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>6A: 7.67 ohms</li>
                <li>10A: 4.60 ohms</li>
                <li>16A: 2.87 ohms</li>
                <li>20A: 2.30 ohms</li>
                <li>32A: 1.44 ohms</li>
                <li>40A: 1.15 ohms</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Complete Worked Example</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p><strong>Shower circuit:</strong> 9.5kW shower, 18m from consumer unit, Ze = 0.35 ohms, 40A Type B MCB.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Current Capacity:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ib = 9500/230 = 41.3A</li>
                <li>Select 45A MCB (next standard rating above Ib)</li>
                <li>Ca=1.0, Cg=1.0, Ci=1.0 (single circuit, standard conditions)</li>
                <li>It &gt;= 45A, select 10mm2 (It = 64A)</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage Drop:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>VD = (4.4 x 41.3 x 18) / 1000 = 3.27V (OK, under 11.5V)</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earth Fault Loop:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Max Zs for 45A Type B = 1.02 ohms</li>
                <li>R1+R2/m for 10/4mm2 = 6.44 milliohms/m</li>
                <li>R1+R2 = 0.00644 x 18 = 0.116 ohms</li>
                <li>Zs = 0.35 + 0.116 = 0.466 ohms (OK, under 1.02)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Determine Ib from load assessment</li>
                <li>2. Select In (protective device &gt;= Ib)</li>
                <li>3. Apply correction factors, calculate minimum It</li>
                <li>4. Select cable from tables with It &gt;= calculated</li>
                <li>5. Check voltage drop &lt;= limit</li>
                <li>6. Verify Zs &lt;= maximum for device</li>
                <li>7. Document all calculations</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Cable Sizing</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Voltage Drop (mV/A/m)</p>
                <ul className="space-y-0.5">
                  <li>1.5mm2: 29 | 2.5mm2: 18</li>
                  <li>4mm2: 11 | 6mm2: 7.3</li>
                  <li>10mm2: 4.4 | 16mm2: 2.8</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">VD Limits</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 3% = 6.9V</li>
                  <li>Other: 5% = 11.5V</li>
                  <li>Ring VD: divide by 4</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section3-4"><ArrowLeft className="w-4 h-4 mr-2" />Back: Grouping</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section4">Next: Section 4<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section3_5;
