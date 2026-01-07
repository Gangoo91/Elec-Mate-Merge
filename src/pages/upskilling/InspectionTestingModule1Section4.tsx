import { ArrowLeft, Shield, Clock, CheckCircle, AlertTriangle, Wrench, HelpCircle, ChevronRight, ChevronLeft, Zap, Lock, Eye, Heart, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { UnitsPocketCard } from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "Safety During Testing - Inspection & Testing";
const DESCRIPTION = "Essential safety procedures for electrical inspection and testing, including hazard identification, safe isolation, PPE requirements, and emergency response.";

const quickCheckQuestions = [
  {
    question: "What is the let-go threshold current for most adults at 50Hz AC?",
    options: ["1mA", "5mA", "10mA", "30mA"],
    correctAnswer: 2,
    explanation: "Around 10mA at 50Hz is the typical let-go threshold - above this level, muscle contraction prevents the person from releasing the conductor."
  },
  {
    question: "When is live working permitted under EAW Regulations?",
    options: ["Never - it's always prohibited", "When it's more convenient", "When it's unreasonable to work dead AND suitable precautions are taken", "Whenever the client requests it"],
    correctAnswer: 2,
    explanation: "Regulation 14 permits live working only when it's unreasonable to work dead AND suitable precautions are taken to prevent injury."
  },
  {
    question: "What should you do first if someone receives an electric shock?",
    options: ["Start CPR immediately", "Call an ambulance", "Safely isolate the supply or remove them from contact", "Check their pulse"],
    correctAnswer: 2,
    explanation: "The priority is to safely break the circuit - isolate the supply or remove the person from contact using non-conductive material. Never touch them while they're in contact with the source."
  }
];

const quizQuestions = [
  {
    question: "Which voltage level is considered 'low voltage' in the UK?",
    options: ["Up to 50V", "Up to 230V", "Up to 1000V AC or 1500V DC", "Up to 11kV"],
    correctAnswer: 2,
    explanation: "Low voltage is defined as up to 1000V AC or 1500V DC. Standard 230V/400V supplies are 'low voltage' despite being potentially lethal."
  },
  {
    question: "The minimum touch voltage considered safe in normal dry conditions is:",
    options: ["12V AC", "25V AC", "50V AC", "120V AC"],
    correctAnswer: 2,
    explanation: "50V AC is generally considered the safe touch voltage threshold in normal dry conditions. Lower limits apply in wet or high-risk environments."
  },
  {
    question: "Arc flash is most likely to occur when:",
    options: ["Using low-powered equipment", "Working on isolated circuits", "Working on or near energised high-current equipment", "Testing with a voltage indicator"],
    correctAnswer: 2,
    explanation: "Arc flash occurs when high fault currents ionize air between conductors. It's most dangerous at distribution boards and high-current equipment."
  },
  {
    question: "GS38 compliant test probes have finger guards and a maximum exposed tip of:",
    options: ["2mm", "4mm", "10mm", "No limit specified"],
    correctAnswer: 1,
    explanation: "GS38 specifies maximum 4mm exposed probe tip with finger guards to prevent accidental contact with live parts."
  },
  {
    question: "What class of insulating gloves is required for 230V/400V testing?",
    options: ["Class 00", "Class 0", "Class 1", "Class 2"],
    correctAnswer: 1,
    explanation: "Class 0 gloves are rated to 1000V AC and suitable for low voltage work. They must be tested/inspected before each use."
  },
  {
    question: "A permit to work system is typically required for:",
    options: ["All electrical work", "Domestic installations only", "High-risk activities like live working or work on HV systems", "Only construction sites"],
    correctAnswer: 2,
    explanation: "Permits to work provide formal control for high-risk activities, documenting hazards, precautions, and authorisation."
  },
  {
    question: "How should you remove someone who is in contact with a live conductor?",
    options: ["Grab their clothing and pull", "Use a non-conductive item to break contact", "Push them away with your hands", "Wait until power is automatically cut off"],
    correctAnswer: 1,
    explanation: "Use a non-conductive item (wooden broom, plastic chair, dry rope) to break contact. Never touch them directly while they're in contact with the live source."
  },
  {
    question: "RIDDOR requires reporting of electrical accidents that result in:",
    options: ["Any injury at all", "Over 7 days incapacity, specified injuries, or death", "Only death", "Only hospital treatment"],
    correctAnswer: 1,
    explanation: "RIDDOR requires reporting of deaths, specified injuries, and injuries causing over 7 days' incapacity. Some near-miss dangerous occurrences must also be reported."
  },
  {
    question: "When testing RCDs, the risk of electric shock to the tester is:",
    options: ["Eliminated completely", "Present until the RCD trips", "Only present if the RCD fails to trip", "Not a concern at 30mA"],
    correctAnswer: 1,
    explanation: "During RCD testing, the test instrument draws current through the earth path. The tester is at risk until the RCD operates. This is why we test with escalating currents."
  },
  {
    question: "The two-person rule for live working requires:",
    options: ["Two people to share the workload", "A second competent person present who can isolate supply and provide first aid", "Two sets of test equipment", "Two separate isolation points"],
    correctAnswer: 1,
    explanation: "The second person must be competent to isolate the supply in an emergency and provide first aid if required. They should not be distracted by other tasks."
  }
];

const faqs = [
  {
    question: "When is it acceptable to work live?",
    answer: "Live working is only permitted under Regulation 14 of EAW when it's unreasonable to work dead AND all suitable precautions are taken. Examples include fault-finding that requires the circuit to be energised, or testing that can only be done live. A risk assessment must justify the decision."
  },
  {
    question: "What PPE do I need for electrical testing?",
    answer: "For standard low voltage testing: safety boots, appropriate clothing (avoid loose items), safety glasses, and GS38 compliant test equipment. For work near exposed live parts: Class 0 insulating gloves, face shield, and flame-resistant clothing may be needed based on risk assessment."
  },
  {
    question: "Do I need to isolate every circuit before testing?",
    answer: "Dead tests (continuity, insulation resistance) require isolation. Live tests (loop impedance, RCD) obviously require the supply connected. The sequence in BS 7671 ensures dead tests are completed first, confirming the circuit is safe before live testing."
  },
  {
    question: "What should I do if I discover a dangerous situation?",
    answer: "Make it safe if you can do so without risk to yourself - isolate the supply, apply warning labels. If you can't make it safe, warn others and prevent access to the danger. Report to the duty holder/client. Never leave a known dangerous situation unaddressed."
  },
  {
    question: "How do I perform a risk assessment for electrical testing?",
    answer: "Identify hazards (shock, arc flash, burns, falls), assess who might be harmed, evaluate the risks and existing controls, implement additional controls if needed, record significant findings, and review regularly. Consider the specific nature of the installation and environment."
  },
  {
    question: "What training is required for electrical testing?",
    answer: "Formal qualifications like 2391 demonstrate competence in testing. You also need training in safe isolation procedures, first aid awareness (ideally specific to electrical injuries), and understanding of relevant regulations. Competence includes experience as well as qualifications."
  }
];

const referenceItems = [
  { label: "Safe voltage", value: "50V AC (dry conditions)" },
  { label: "Let-go threshold", value: "~10mA at 50Hz" },
  { label: "Fibrillation", value: ">30mA through heart" },
  { label: "EAW Reg 14", value: "Live working restrictions" },
  { label: "GS38", value: "Test equipment guidance" },
  { label: "Class 0 gloves", value: "1000V AC rated" },
  { label: "CAT III 300V", value: "Minimum for LV testing" },
  { label: "RIDDOR", value: "Incident reporting" },
  { label: "Two-person rule", value: "Required for live work" },
];

const InspectionTestingModule1Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
            <Shield className="h-7 w-7 text-red-400" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 1 • Section 4
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Safety During Testing
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed">
          Understanding electrical hazards and implementing safe systems of work to prevent injury during inspection and testing.
        </p>
      </section>

      {/* In 30 Seconds */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Electricity kills - even low voltage can cause fatal injuries through shock, burns, or arc flash</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Safe isolation with prove-test-prove is essential before any work on electrical equipment</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Live working is only permitted when absolutely necessary with appropriate precautions in place</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Identify hazards during electrical testing",
            "Apply safe isolation procedures correctly",
            "Select appropriate PPE for testing activities",
            "Understand live working restrictions",
            "Implement safe systems of work",
            "Respond correctly to electrical emergencies"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-[15px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">01</span>
          <h2 className="text-[22px] font-semibold text-white">Hazards During Testing</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Electrical testing exposes workers to several serious hazards. Understanding these risks is the first step in preventing injuries.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Primary Electrical Hazards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <Zap className="h-6 w-6 text-red-400 mb-2" />
                <p className="text-white font-semibold">Electric Shock</p>
                <p className="text-[13px] text-white/60 mt-1">Current passing through the body causing injury or death. Severity depends on current magnitude, path, and duration.</p>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <AlertTriangle className="h-6 w-6 text-orange-400 mb-2" />
                <p className="text-white font-semibold">Arc Flash</p>
                <p className="text-[13px] text-white/60 mt-1">Explosive release of energy when current arcs through air. Causes severe burns, blast injuries, and can ignite clothing.</p>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mb-2" />
                <p className="text-white font-semibold">Electrical Burns</p>
                <p className="text-[13px] text-white/60 mt-1">Burns from current passing through tissue or from arc flash heat. Internal burns may not be immediately visible.</p>
              </div>
              <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                <AlertTriangle className="h-6 w-6 text-purple-400 mb-2" />
                <p className="text-white font-semibold">Secondary Injuries</p>
                <p className="text-[13px] text-white/60 mt-1">Falls from height after shock, injuries from sudden muscle contraction, panic-related accidents.</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Effects of Electric Current on the Body</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white">Current (mA)</th>
                    <th className="text-left py-2 text-white/80">Effect at 50Hz AC</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-elec-yellow">1</td>
                    <td>Perception threshold - tingling sensation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-elec-yellow">5</td>
                    <td>Painful shock</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-orange-400">10</td>
                    <td>Let-go threshold - muscles contract, cannot release</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-red-400">30</td>
                    <td>Respiratory paralysis possible</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-red-400">100+</td>
                    <td>Ventricular fibrillation likely - cardiac arrest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">02</span>
          <h2 className="text-[22px] font-semibold text-white">Safe Isolation Overview</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Safe isolation</strong> is the process of disconnecting electrical equipment from all sources of supply and taking steps to ensure it cannot become live during work.
            </p>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <p className="text-white font-semibold">GS38 Golden Rule</p>
              <p className="text-white/80 mt-2 italic">
                "Always assume circuits are live until proven dead, and proven to remain dead."
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Safe Isolation Procedure</h3>
            <ol className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">1</span>
                <span><strong className="text-white">Identify</strong> - Identify all sources of supply to the equipment/circuit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">2</span>
                <span><strong className="text-white">Isolate</strong> - Disconnect from all sources using a suitable device</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">3</span>
                <span><strong className="text-white">Secure</strong> - Apply lock-off devices and warning labels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">4</span>
                <span><strong className="text-white">Prove</strong> - PROVE voltage indicator on known live source</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">5</span>
                <span><strong className="text-white">Test</strong> - TEST the circuit is dead at the point of work</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">6</span>
                <span><strong className="text-white">Re-prove</strong> - RE-PROVE voltage indicator still works on known live source</span>
              </li>
            </ol>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  <strong className="text-white">Never rely on</strong> neon indicators, circuit breaker positions, or statements from others that a circuit is dead. Always prove dead yourself using approved test equipment.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 1 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[0]} />
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">03</span>
          <h2 className="text-[22px] font-semibold text-white">Personal Protective Equipment</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              PPE is the last line of defence - it doesn't eliminate the hazard but protects you if other controls fail. PPE must be appropriate for the specific hazards present.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Standard PPE for Electrical Testing</h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Safety Glasses/Goggles</p>
                    <p className="text-[14px] text-white/70">Protection from arc flash, flying debris, and particles when working in enclosures</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Class 0 Insulating Gloves</p>
                    <p className="text-[14px] text-white/70">1000V AC rated for low voltage work. Must be tested before each use and free from damage.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Safety Footwear</p>
                    <p className="text-[14px] text-white/70">Insulated safety boots with non-conductive soles. Protect against crush hazards and provide stability.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Additional PPE for High-Risk Work</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong className="text-white">Arc flash suit:</strong> For high fault current environments</li>
              <li>• <strong className="text-white">Face shield:</strong> When exposed live parts are accessible</li>
              <li>• <strong className="text-white">Flame-resistant clothing:</strong> For arc flash protection</li>
              <li>• <strong className="text-white">Insulating matting:</strong> Additional protection on conductive floors</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Glove Testing</h3>
            <p>
              Before each use, insulating gloves must be inspected:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Visual check for cuts, punctures, tears, or embedded objects</li>
              <li>• Air test - roll from cuff, trap air, check for leaks</li>
              <li>• Check within retest date (6 months for Class 0)</li>
              <li>• Store flat, away from sunlight and ozone sources</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">04</span>
          <h2 className="text-[22px] font-semibold text-white">Live Testing Restrictions</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Regulation 14</strong> of the Electricity at Work Regulations covers work on or near live conductors. The default position is that live working is prohibited unless specific conditions are met.
            </p>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <p className="text-white italic">
                <strong>Regulation 14:</strong> "No person shall be engaged in any work activity on or so near any live conductor... that danger may arise unless:
              </p>
              <ul className="mt-2 ml-4 text-white/80">
                <li>(a) it is unreasonable in all the circumstances for it to be dead; and</li>
                <li>(b) it is reasonable in all the circumstances for work to be done on or near it while live; and</li>
                <li>(c) suitable precautions are taken to prevent injury."</li>
              </ul>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">When Live Work May Be Justified</h3>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Fault-finding that requires the circuit to be energised</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Live testing (loop impedance, RCD tests, PFC)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Where isolation would create greater danger</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Essential continuous processes where shutdown is unreasonable</span>
              </li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Required Precautions for Live Work</h3>
            <ul className="space-y-2 ml-4">
              <li>• Formal risk assessment and method statement</li>
              <li>• <strong className="text-white">Two-person rule</strong> - second competent person to isolate and give first aid</li>
              <li>• GS38 compliant test equipment</li>
              <li>• Appropriate PPE for the hazards present</li>
              <li>• Barriers and warning notices</li>
              <li>• Escape route maintained clear</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 2 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[1]} />
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">05</span>
          <h2 className="text-[22px] font-semibold text-white">Safe Systems of Work</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              A <strong className="text-white">safe system of work</strong> is a formal procedure resulting from systematic examination of work activities to identify hazards and implement controls.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Elements of a Safe System</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Lock className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Lock-Off Procedures</p>
                <p className="text-[13px] text-white/60">Physical locks preventing re-energisation. Personal padlocks - one person, one lock.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <AlertTriangle className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Warning Signs</p>
                <p className="text-[13px] text-white/60">Labels identifying isolated equipment and prohibition of switching on.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Users className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Permits to Work</p>
                <p className="text-[13px] text-white/60">Formal written authorisation for high-risk activities.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Eye className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Supervision</p>
                <p className="text-[13px] text-white/60">Appropriate level of supervision based on risk and competence.</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Permit to Work Systems</h3>
            <p>
              Permits are formal documents that specify:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• The work to be done and its location</li>
              <li>• Hazards identified and controls implemented</li>
              <li>• Isolation points and their status</li>
              <li>• PPE and precautions required</li>
              <li>• Time limitations</li>
              <li>• Signatures of issuing and receiving persons</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">06</span>
          <h2 className="text-[22px] font-semibold text-white">Emergency Response</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Knowing how to respond to electrical emergencies can save lives. Preparation and quick action are essential.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">If Someone Receives an Electric Shock</h3>
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-[13px] font-bold flex-shrink-0">1</span>
                  <span><strong className="text-white">DON'T TOUCH THEM</strong> until you've broken the contact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-[13px] font-bold flex-shrink-0">2</span>
                  <span><strong className="text-white">Isolate the supply</strong> if you can do so safely and quickly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-[13px] font-bold flex-shrink-0">3</span>
                  <span><strong className="text-white">If you can't isolate</strong>, use non-conductive material to move them from the source</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-[13px] font-bold flex-shrink-0">4</span>
                  <span><strong className="text-white">Call 999</strong> and state it's an electrical injury</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-[13px] font-bold flex-shrink-0">5</span>
                  <span><strong className="text-white">Begin CPR</strong> if they're not breathing normally</span>
                </li>
              </ol>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">RIDDOR Reporting</h3>
            <p>
              Under <strong className="text-white">RIDDOR</strong> (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), you must report:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Deaths</li>
              <li>• Specified injuries (fractures, amputations, loss of sight, etc.)</li>
              <li>• Over-7-day incapacitation</li>
              <li>• Dangerous occurrences (near misses with potential for serious harm)</li>
              <li>• Occupational diseases</li>
            </ul>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-elec-yellow" />
                <div>
                  <p className="text-white font-semibold">Report online or by phone</p>
                  <p className="text-[14px] text-white/70">www.hse.gov.uk/riddor or call the Incident Contact Centre</p>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">First Aid Considerations</h3>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Cardiac arrest can occur even after apparent recovery - always seek medical attention</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>Internal burns may not be visible - entry and exit wounds may appear minor</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Don't cool electrical burns with water until sure victim is clear of electrical contact</span>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 3 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[2]} />
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Before Starting Work</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Assess the risks and plan the work</li>
                <li>• Confirm isolation arrangements with the duty holder</li>
                <li>• Check your test equipment is in good condition</li>
                <li>• Know where the nearest first aider is located</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Common Safety Mistakes</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Assuming a circuit is dead because a switch is off</li>
                <li>• Not proving the voltage indicator works</li>
                <li>• Working alone on high-risk activities</li>
                <li>• Rushing and taking shortcuts</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Best Practice</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Always assume circuits are live until proven dead</li>
                <li>• Use the prove-test-prove method every time</li>
                <li>• Don't work beyond your competence</li>
                <li>• If in doubt, ask or stop work</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} variant="ios" className="p-4">
              <h3 className="text-[17px] font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reference Card */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <UnitsPocketCard
          title="Safety Reference"
          items={referenceItems}
        />
      </section>

      {/* Quiz */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Quiz
          questions={quizQuestions}
          title="Section 4 Quiz"
          description="Test your knowledge of safety during testing"
        />
      </section>

      {/* Navigation */}
      <footer className="px-4 pb-safe pt-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="flex gap-3">
          <Button variant="ios-secondary" size="ios-default" className="flex-1" asChild>
            <Link to="../section3">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Link>
          </Button>
          <Button variant="ios-primary" size="ios-default" className="flex-1" asChild>
            <Link to="../section5">
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InspectionTestingModule1Section4;
