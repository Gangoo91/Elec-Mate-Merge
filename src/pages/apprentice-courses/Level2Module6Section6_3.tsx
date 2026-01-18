import { ArrowLeft, Eye, CheckCircle, AlertTriangle, XCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Level2Module6Section6_3 = () => {
  useSEO(
    "Identifying Common Installation Defects - Level 2 Module 6 Section 6.3",
    "Learn to identify common electrical installation defects discovered during testing, understand their safety implications, and recognise signs of faulty workmanship."
  );

  const spotItQuestions = [
    {
      question: "What risk does a loose connection create when the circuit is under load?",
      options: [
        "Overheating and potential fire risk",
        "Causes lights to flicker only",
        "No risk if readings are acceptable",
        "Reduces power consumption"
      ],
      correctAnswer: 0,
      explanation: "Loose connections create high resistance, which causes heating under load. This can lead to overheating, insulation damage, and fire risk."
    },
    {
      question: "What test result would typically indicate damaged or deteriorated insulation?",
      options: [
        "High earth fault loop impedance",
        "Low insulation resistance reading",
        "Perfect continuity readings",
        "Zero voltage readings"
      ],
      correctAnswer: 1,
      explanation: "Low insulation resistance (typically below 1 MΩ) indicates damaged or deteriorated insulation that could allow leakage currents or create shock risks."
    },
    {
      question: "Why is reversed polarity considered such a serious defect?",
      options: [
        "It increases the electricity bill",
        "Equipment remains live when switched 'off'",
        "It causes electrical noise",
        "It's only a cosmetic issue"
      ],
      correctAnswer: 1,
      explanation: "Reversed polarity means switching is in the neutral conductor, leaving equipment live even when switched off, creating a serious shock risk."
    },
    {
      question: "What might a very high Zs reading suggest about the earthing arrangement?",
      options: [
        "Extra sockets have been added",
        "Missing or undersized protective conductor",
        "Good insulation resistance",
        "Low load on the circuit"
      ],
      correctAnswer: 1,
      explanation: "High Zs readings often indicate missing, disconnected, or undersized protective conductors, preventing safe disconnection during faults."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What type of test often reveals loose connections?",
      options: [
        "Continuity and earth fault loop impedance tests",
        "Visual inspection only",
        "Voltage measurements",
        "Power consumption tests"
      ],
      correctAnswer: 0,
      explanation: "Loose connections show up as abnormally high resistance values in continuity and Zs testing."
    },
    {
      id: 2,
      question: "What danger can loose connections cause under load?",
      options: [
        "Reduced efficiency only",
        "Overheating and fire risk",
        "Circuit breaker nuisance tripping",
        "Voltage fluctuations"
      ],
      correctAnswer: 1,
      explanation: "High resistance from loose connections causes heating under load, potentially leading to fire."
    },
    {
      id: 3,
      question: "What test result suggests damaged or deteriorated insulation?",
      options: [
        "High continuity readings",
        "Low insulation resistance values",
        "Perfect polarity results",
        "High voltage readings"
      ],
      correctAnswer: 1,
      explanation: "Damaged insulation shows as low insulation resistance, typically below the 1 MΩ minimum."
    },
    {
      id: 4,
      question: "Why does insulation deteriorate over time?",
      options: [
        "Heat, moisture, and mechanical stress",
        "Normal electrical current flow",
        "Switching operations only",
        "Reduced voltage levels"
      ],
      correctAnswer: 0,
      explanation: "Environmental factors like heat, moisture, and physical damage cause insulation to deteriorate."
    },
    {
      id: 5,
      question: "What is the main risk of incorrect polarity?",
      options: [
        "Increased power consumption",
        "Equipment remains live when switched off",
        "Reduced equipment lifespan",
        "Electrical noise interference"
      ],
      correctAnswer: 1,
      explanation: "Incorrect polarity means switching occurs in the neutral, leaving equipment live when apparently switched off."
    },
    {
      id: 6,
      question: "True or False: A switch connected in the neutral is acceptable practice.",
      options: [
        "True - neutral switching is standard",
        "False - switching must be in the line conductor",
        "True - if properly labeled",
        "False - only for three-phase circuits"
      ],
      correctAnswer: 1,
      explanation: "Switches must always be in the line conductor to ensure equipment is properly isolated when switched off."
    },
    {
      id: 7,
      question: "What might high Zs readings indicate about the earthing system?",
      options: [
        "Excellent earth connection",
        "Missing or inadequate protective conductors",
        "Normal system operation",
        "Low earth resistance"
      ],
      correctAnswer: 1,
      explanation: "High Zs readings suggest problems with protective conductor continuity or earth connection quality."
    },
    {
      id: 8,
      question: "Why must all CPCs be correctly connected?",
      options: [
        "To reduce installation costs",
        "For protective device operation during faults",
        "To improve power factor",
        "For aesthetic appearance"
      ],
      correctAnswer: 1,
      explanation: "Protective conductors must be correctly connected to ensure protective devices can safely disconnect during earth faults."
    },
    {
      id: 9,
      question: "What should an electrician do if they find a common defect during testing?",
      options: [
        "Ignore minor defects",
        "Record clearly and investigate thoroughly",
        "Continue with energising",
        "Leave for next inspection"
      ],
      correctAnswer: 1,
      explanation: "All defects must be recorded clearly and investigated, as even minor issues can escalate to serious hazards."
    },
    {
      id: 10,
      question: "In the real-world example, what defect was discovered in the socket circuits?",
      options: [
        "Loose connections",
        "Missing CPC connections",
        "Incorrect cable size",
        "Wrong socket type"
      ],
      correctAnswer: 1,
      explanation: "The example showed missing protective conductor connections in socket outlets, which would prevent safe disconnection during faults."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.3
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Identifying Common Electrical Installation Defects
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Recognition and analysis of common faults found during electrical testing
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Check for abnormal readings (high R1+R2, low IR, high Zs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Look for loose terminations and nicked insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Investigate polarity and CPC faults</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Record defects before energising</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Unusual test readings or poor workmanship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Visual inspection plus targeted retests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> All readings against BS 7671 limits</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Testing is not just about ticking boxes; it is about uncovering real faults in an installation that could cause danger or failure in service. By learning to recognise common installation defects, apprentices can develop the awareness needed to spot issues before they become serious hazards. This subsection introduces the typical problems that test results reveal and explains how they affect safety, performance, and compliance.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify common electrical installation defects discovered during testing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain how each defect affects safety and operation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the signs of faulty workmanship or deteriorated materials</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand why accurate testing is essential to detect hidden problems</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Understanding Common Installation Defects */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">Understanding Common Installation Defects</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Electrical installation defects fall into several categories, each with distinct characteristics and safety implications. Poor workmanship defects include loose connections, inadequate cable support, incorrect terminations, and failure to follow manufacturer's instructions. These defects often result from rushed work, insufficient training, or lack of proper supervision during installation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Material deterioration defects develop over time due to environmental conditions, overloading, or normal aging. Common examples include insulation breakdown due to moisture ingress, conductor corrosion in damp conditions, and mechanical damage from inadequate protection. These defects highlight the importance of proper installation techniques and environmental protection.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Design and specification errors can create systemic problems throughout an installation. Examples include undersized protective conductors, inappropriate cable selection for environmental conditions, inadequate fault protection coordination, and missing or incorrectly rated protective devices. These defects often require extensive remedial work to achieve compliance.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Compliance defects involve installations that may function adequately but fail to meet current regulatory standards. This is particularly common in older installations or where work has been carried out without proper certification. Examples include missing RCD protection, inadequate earthing arrangements, and non-compliant wiring methods in special locations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="defect-understanding-check"
            question="Which type of defect is most likely to develop gradually over time due to environmental conditions?"
            options={["Poor workmanship", "Material deterioration", "Design errors", "Compliance issues"]}
            correctIndex={1}
            explanation="Material deterioration defects develop over time due to environmental factors like moisture, temperature changes, and normal aging processes affecting insulation and conductors."
          />
          {/* 2. Insulation Resistance Test Failures */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Insulation Resistance Test Failures</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Low insulation resistance readings are among the most common test failures, typically indicating moisture ingress, contamination, or physical damage to cable insulation. Moisture can enter through damaged outer sheaths, poorly sealed gland entries, or condensation in cold conditions. Even small amounts of moisture can dramatically reduce insulation resistance, creating potential shock and fire hazards.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Contamination of cable insulation can occur during installation through contact with cement, plaster, oils, or other substances that compromise insulation properties. Poor storage conditions before installation can also lead to contamination that only becomes apparent during testing. This emphasizes the importance of proper cable handling and protection throughout the installation process.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Physical damage to cable insulation often results from poor installation practices, including excessive bending, crushing, or nicking during cable pulling. Sharp edges on cable trays, trunking, or conduit entries can damage insulation even after installation is complete. Rodent damage in roof spaces and basements is another common cause of insulation failures.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Age-related insulation deterioration affects older installations, particularly those with rubber or early PVC insulation that becomes brittle over time. Thermal cycling from load variations can accelerate this process, causing insulation to crack and lose its protective properties. Regular testing helps identify these issues before they create dangerous conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="insulation-failure-check"
            question="What is the most common cause of low insulation resistance readings in newly installed circuits?"
            options={["Age-related deterioration", "Moisture ingress or contamination", "Overloading", "Poor earthing"]}
            correctIndex={1}
            explanation="In new installations, moisture ingress through damaged sheaths or contamination during installation are the most common causes of low insulation resistance readings."
          />

          {/* 3. Continuity and Earth Loop Impedance Problems */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3 text-base">Continuity and Earth Loop Impedance Problems</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        High continuity readings in protective conductors indicate poor connections, corrosion, or missing links in the earthing system. Loose connections at earth terminals are particularly common, often resulting from inadequate tightening torque or failure to clean contact surfaces before connection. These faults can prevent protective devices from operating correctly during earth faults.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Missing or inadequately sized protective conductors create serious safety hazards and will show as open circuits during continuity testing. This defect is sometimes found in older installations where earthing requirements have changed, or in DIY work where the importance of protective conductors is not understood. The consequences can be fatal if metalwork becomes live during a fault.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        High earth loop impedance readings often result from poor supply earth connections, inadequate main earthing conductor sizing, or high resistance in the supply system. These issues prevent protective devices from operating within required disconnection times, leaving circuits and equipment unprotected during earth faults. The problem may affect multiple circuits or the entire installation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Neutral-earth faults can cause both continuity and RCD test failures. These faults typically occur where neutral and earth conductors have been incorrectly connected together downstream of the main earth terminal. This creates parallel earth paths that can cause RCDs to fail to operate correctly and may result in dangerous neutral potential rise during faults.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-problem-check"
            question="What is the most serious safety consequence of high protective conductor resistance?"
            options={["Increased energy consumption", "Equipment damage", "Failure of protective devices to operate correctly", "Reduced cable lifespan"]}
            correctIndex={2}
            explanation="High protective conductor resistance can prevent protective devices from operating within required time limits during earth faults, leaving people and property unprotected."
          />

          {/* 4. Polarity and RCD Defects */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3 text-base">Polarity and RCD Defects</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Polarity errors create immediate and serious shock hazards by leaving equipment permanently live even when switched off. The most dangerous polarity error is switching the neutral conductor instead of the line conductor, which means that equipment remains energized at line potential even when the switch is in the "off" position. This is particularly hazardous for maintenance work or lamp changing.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Reversed polarity at socket outlets can affect the safety of connected equipment, particularly items with exposed metalwork. Some appliances rely on correct polarity for their internal protection arrangements to function properly. Additionally, reversed polarity can affect the operation of some electronic equipment and may create problems with certain types of protective devices.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        RCD operation failures often result from neutral-earth faults that create alternative current paths bypassing the RCD's detection mechanism. These faults can occur anywhere in the protected circuit and prevent the RCD from detecting genuine earth leakage currents. The result is that the RCD provides no protection despite appearing to be correctly installed and functioning.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Incorrect RCD wiring, including reversed line and neutral connections or missing neutral connections, will prevent proper operation. Some RCDs are sensitive to the direction of current flow and must be wired correctly to function. Additionally, connecting the neutral conductor to earth downstream of the RCD will cause nuisance tripping or prevent operation entirely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="polarity-rcd-check"
            question="Why is switching the neutral conductor instead of the line conductor considered the most dangerous polarity error?"
            options={["It wastes electricity", "Equipment remains live when switched off", "It damages equipment", "It prevents RCD operation"]}
            correctIndex={1}
            explanation="Switching the neutral leaves equipment permanently live at line potential even when the switch is 'off', creating serious shock hazards during maintenance or normal use."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Practical Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Always investigate unusual or borderline readings — they often point to real defects</span>
              </li>
              <li className="flex items-start gap-2">
                <Eye className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Be alert to signs of poor workmanship, such as loose screws, nicked insulation, or untidy wiring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Record defects clearly in the test documentation, noting their nature and location</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Never ignore a fault just because it is "small"; even minor defects can escalate into serious hazards</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Real World Example</h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Situation</h4>
              <p className="text-white/80">
                During periodic inspection of a 10-year-old office building, an electrician found several lighting circuits with insulation resistance readings of 0.8 MΩ, well below the 1 MΩ minimum requirement. Additionally, three socket circuits showed high earth loop impedance readings exceeding BS 7671 limits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Investigation</h4>
              <p className="text-white/80">
                Visual inspection revealed water stains around ceiling light fittings where roof leaks had occurred during winter storms. The building's flat roof had developed several leaks that allowed water to penetrate into the ceiling void. Further testing showed loose earth connections in several distribution boards.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Root Cause</h4>
              <p className="text-white/80">
                Water had entered junction boxes and cable entries, contaminating the cable insulation. Several cables had been damaged during roof repair work, with insulation nicked by roofing tools. Additionally, vibration from HVAC equipment had loosened earth terminal connections over time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Immediate Defects Found</h4>
              <p className="text-white/80">
                Testing revealed multiple installation defects: moisture-damaged insulation (0.8 MΩ readings), loose protective conductor connections (high Zs values), and one circuit with reversed polarity that had gone unnoticed for years, leaving light switches permanently live.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Consequences</h4>
              <p className="text-white/80">
                Three circuits had to be isolated immediately due to safety concerns. Emergency lighting failed to operate correctly due to earth leakage, and several light switches showed signs of overheating from leakage currents. The polarity error created a serious shock hazard for maintenance staff.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Resolution</h4>
              <p className="text-white/80">
                Complete rewiring of affected circuits was required, along with roof repairs and improved waterproofing. All earth connections were checked and retightened. The polarity error was corrected. Total remedial costs exceeded £15,000, far more than preventive measures would have cost.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-card rounded-lg border border-green-500/20">
              <p className="text-green-700 dark:text-green-300 font-medium">
                ✅ Lesson: Multiple installation defects often occur together and can compound safety risks. Regular testing identifies developing problems before they become dangerous, and systematic investigation reveals the full extent of defects rather than treating symptoms in isolation.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Q: What is the most common installation defect found during testing?</h4>
              <p className="text-white/80">A: Loose or poor connections.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: Can insulation resistance testing identify all insulation faults?</h4>
              <p className="text-white/80">A: No. It identifies most issues, but some may only appear under load or over time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: Why must polarity always be tested even on new installations?</h4>
              <p className="text-white/80">A: Because wiring errors can happen at any stage, and polarity faults are dangerous if left undetected.</p>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-elec-yellow/10 border border-primary/20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Key Learning Points</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Common Defects</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Insulation failures, continuity problems, polarity errors and RCD defects</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Systematic Testing</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Reveals defects that visual inspection alone cannot detect</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Pattern Recognition</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Understanding defect patterns helps target testing and corrective action</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Safety Priority</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Defects must be identified and rectified to ensure electrical safety</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-center text-sm sm:text-base font-medium text-foreground">
              💡 Remember: Systematic testing reveals installation defects that visual inspection alone cannot detect!
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz 
            questions={quizQuestions}
            title="Section 6.3 Quiz: Identifying Common Installation Defects"
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="module6-section6/2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Section 6.2
            </Link>
          </Button>
          <Button asChild>
            <Link to="module6-section6/4" className="flex items-center gap-2">
              Next: Section 6.4
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level2Module6Section6_3;