import { ArrowLeft, AlertTriangle, CheckCircle, Zap, Activity, Car, Users, Shield, AlertCircle, TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Types of Workplace Accidents - Level 2 Electrical Course";
const DESCRIPTION = "Understand common accident types in electrical work and how to prevent them.";

const Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most effective way to prevent electric shock accidents?",
      options: [
        "Wearing rubber gloves only",
        "Working quickly to reduce exposure time",
        "Proper isolation, testing, and lockout procedures",
        "Using wooden ladders instead of metal ones"
      ],
      correctAnswer: 2,
      explanation: "Proper isolation, testing, and lockout procedures are the most effective way to prevent electric shock. This ensures circuits are dead before work begins."
    },
    {
      id: 2,
      question: "What is a common cause of trips on electrical sites?",
      options: [
        "Poor lighting conditions",
        "Trailing cables and poor housekeeping",
        "Inadequate signage",
        "Wrong type of footwear"
      ],
      correctAnswer: 1,
      explanation: "Trailing cables and poor housekeeping are the most common causes of trips on electrical sites, along with wet floors and debris."
    },
    {
      id: 3,
      question: "Which type of fire extinguisher should NEVER be used on electrical fires?",
      options: [
        "CO2 extinguisher",
        "Dry powder extinguisher",
        "Water-based extinguisher",
        "Foam extinguisher"
      ],
      correctAnswer: 2,
      explanation: "Water-based extinguishers should never be used on electrical fires as water conducts electricity and increases the risk of electric shock."
    },
    {
      id: 4,
      question: "What should be your first action when discovering someone has received an electric shock?",
      options: [
        "Touch them to check if they're conscious",
        "Pour water on them to cool them down",
        "Switch off the power source if safe to do so",
        "Start CPR immediately"
      ],
      correctAnswer: 2,
      explanation: "The first action should be to switch off the power source if safe to do so. Never touch someone who may still be in contact with electricity."
    },
    {
      id: 5,
      question: "How can ladder accidents be prevented?",
      options: [
        "Using lighter materials",
        "Proper access planning and avoiding overreaching",
        "Working faster",
        "Using only wooden ladders"
      ],
      correctAnswer: 1,
      explanation: "Ladder accidents can be prevented through proper access planning, using appropriate equipment, maintaining three points of contact, and avoiding overreaching."
    },
    {
      id: 6,
      question: "What percentage of electrical injuries are caused by burns?",
      options: [
        "15%",
        "25%",
        "35%",
        "45%"
      ],
      correctAnswer: 1,
      explanation: "Burns represent approximately 25% of electrical injuries, often from arc flash or contact with live parts."
    },
    {
      id: 7,
      question: "What is the average cost of a major workplace injury?",
      options: [
        "£8,000",
        "£12,000",
        "£18,000",
        "£25,000"
      ],
      correctAnswer: 2,
      explanation: "The average cost per major injury is £18,000, including medical costs, lost time, investigation, and legal expenses."
    },
    {
      id: 8,
      question: "Which human factor is most commonly associated with workplace accidents?",
      options: [
        "Lack of experience",
        "Poor eyesight",
        "Rushing or time pressure",
        "Physical fitness"
      ],
      correctAnswer: 2,
      explanation: "Rushing or time pressure is one of the most common human factors in workplace accidents, leading to skipped safety checks and poor decisions."
    },
    {
      id: 9,
      question: "For every major injury reported, approximately how many near misses occur?",
      options: [
        "50",
        "100",
        "200",
        "300"
      ],
      correctAnswer: 3,
      explanation: "For every major injury reported, there are typically 10 minor injuries and 300 near misses that go unreported."
    },
    {
      id: 10,
      question: "What should be included in immediate accident response (first 2 hours)?",
      options: [
        "Complete investigation report",
        "Secure scene, first aid, notify management, preserve evidence",
        "Determine blame and responsibility",
        "Resume normal operations quickly"
      ],
      correctAnswer: 1,
      explanation: "Immediate response should focus on securing the scene, providing first aid, notifying management and emergency services, and preserving evidence for investigation."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" asChild>
            <Link to=".." className="inline-flex items-center gap-2 text-elec-yellow hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Block */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 6.1
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Types of Workplace Accidents
              </h1>
              <p className="text-lg text-white mt-2">
                Understanding common accident types in electrical work environments
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-card border border-border/20 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">In 30 seconds</h3>
              <p className="text-white text-sm leading-relaxed">
                Electrical work presents multiple accident risks - from electric shock and burns to slips, falls, and manual handling injuries. Understanding these common accident types, their causes, and prevention methods is essential for maintaining a safe working environment and protecting yourself and colleagues.
              </p>
            </div>
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Spot it / Use it</h3>
              <p className="text-white text-sm leading-relaxed">
                <strong>Spot:</strong> Trailing cables, poor lighting, damaged tools, rushed work practices.<br/>
                <strong>Use:</strong> Proper isolation procedures, good housekeeping, correct access equipment, and emergency response knowledge.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Identify common accident types (shock, burns, slips/trips/falls, manual handling, cuts/impact, vehicle incidents)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Understand causes and risk factors</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Know prevention and control measures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Understand reporting and response basics</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Electric Shock */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Electric Shock</h2>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">❌ Dangers</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Burns at entry and exit points</li>
                      <li>• Muscle injury and contractions</li>
                      <li>• Cardiac arrest or arrhythmia</li>
                      <li>• Secondary injuries from falls</li>
                      <li>• Potential fatality</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-3">✅ Prevention</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Proper isolation procedures</li>
                      <li>• Test before touch principle</li>
                      <li>• Use of appropriate PPE</li>
                      <li>• Lockout/tagout systems</li>
                      <li>• Regular tool inspection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck after Section 1 */}
        <InlineCheck 
          id="accident-types-check-1"
          question="Which sequence is safest for preventing electric shock?"
          options={[
            "Test tester → isolate → test circuit → work",
            "Isolate → test all conductors → lock off → re-test tester",
            "Work quickly → test afterwards → report if shocked",
            "Wear gloves → work on live circuits → be careful"
          ]}
          correctIndex={1}
          explanation="The correct sequence is: isolate the supply, test all conductors to ensure they're dead, lock off the isolation point, then re-test your tester to ensure it's still working properly."
        />

        {/* Section 2: Burns */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Burns</h2>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Arc Flash Burns</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Temperatures up to 20,000°C</li>
                      <li>• Third-degree burns in milliseconds</li>
                      <li>• Caused by short circuits or faults</li>
                      <li>• Can occur through PPE</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-3">Contact Burns</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Direct contact with live parts</li>
                      <li>• Often deep and not immediately visible</li>
                      <li>• Entry and exit wound burns</li>
                      <li>• Require specialist medical treatment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Slips and Trips */}
        <div className="mb-8 border-l-4 border-amber-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Slips and Trips</h2>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-medium text-white mb-3">Common Causes</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Trailing cables and extension leads</li>
                  <li>• Poor housekeeping and debris</li>
                  <li>• Wet or contaminated floors</li>
                  <li>• Inadequate lighting</li>
                  <li>• Uneven surfaces and edges</li>
                </ul>
              </div>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Prevention Measures</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Route cables overhead where possible</li>
                  <li>• Use cable covers and ramps</li>
                  <li>• Maintain good housekeeping</li>
                  <li>• Provide adequate lighting</li>
                  <li>• Use appropriate footwear</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Falls from Height */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Falls from Height</h2>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-medium text-white mb-3">Access Planning</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Use proper access equipment (towers, platforms)</li>
                  <li>• Maintain 3 points of contact on ladders</li>
                  <li>• Never overreach - move the equipment</li>
                  <li>• Check equipment before use</li>
                  <li>• Consider weather conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Manual Handling */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              5
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Manual Handling</h2>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Common Injuries</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Back strain and disc problems</li>
                      <li>• Muscle tears and sprains</li>
                      <li>• Hernia development</li>
                      <li>• Long-term musculoskeletal disorders</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-3">Safe Techniques</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Bend knees, keep back straight</li>
                      <li>• Get a good grip with both hands</li>
                      <li>• Lift smoothly without jerking</li>
                      <li>• Use team lifting for heavy items</li>
                      <li>• Use mechanical aids where possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Cuts and Impact */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              6
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Cuts and Impact Injuries</h2>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-medium text-white mb-3">Common Scenarios</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Handling sharp-edged conduit and trunking</li>
                  <li>• Using cutting tools and hand tools</li>
                  <li>• Working with metal cable trays</li>
                  <li>• Drilling and core cutting operations</li>
                  <li>• Handling broken glass or materials</li>
                </ul>
              </div>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Prevention</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Use appropriate cut-resistant gloves</li>
                  <li>• Keep tools sharp and well-maintained</li>
                  <li>• Handle materials carefully</li>
                  <li>• Use proper cutting techniques</li>
                  <li>• Ensure good lighting and visibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Vehicle-Related Incidents */}
        <div className="mb-8 border-l-4 border-violet-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-violet-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              7
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Vehicle-Related Incidents</h2>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-medium text-white mb-3">Risk Areas</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Delivery areas and loading bays</li>
                  <li>• Shared pedestrian/vehicle routes</li>
                  <li>• Reversing and manoeuvring areas</li>
                  <li>• Material handling with forklifts</li>
                  <li>• Site traffic management</li>
                </ul>
              </div>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Control Measures</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>• Segregate pedestrians and vehicles</li>
                  <li>• Use banksman for reversing</li>
                  <li>• Implement speed limits</li>
                  <li>• Provide hi-vis clothing</li>
                  <li>• Clear sight lines and mirrors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Why Accidents Happen */}
        <div className="mb-8 border-l-4 border-rose-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              8
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Why Accidents Happen</h2>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Human Factors</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Rushing or time pressure</li>
                      <li>• Fatigue and stress</li>
                      <li>• Overconfidence and complacency</li>
                      <li>• Inadequate training</li>
                      <li>• Poor communication</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-3">System Factors</h3>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <ul className="space-y-2 text-white text-sm">
                      <li>• Inadequate procedures</li>
                      <li>• Poor supervision</li>
                      <li>• Unsafe tools or conditions</li>
                      <li>• Lack of risk assessment</li>
                      <li>• Insufficient resources</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Industry Statistics */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              9
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Industry Statistics and Impact</h2>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-medium text-white mb-3">UK Electrical Industry Facts</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• ~1,000 electrical accidents reported annually</li>
                    <li>• 4-6 workplace deaths per year from electric shock</li>
                    <li>• Burns: 25% of electrical injuries</li>
                    <li>• Falls during electrical work: 15% of incidents</li>
                    <li>• Manual handling: 30% of all workplace accidents</li>
                  </ul>
                </div>
                
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-medium text-white mb-3">Cost of Accidents</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Average major injury cost: £18,000</li>
                    <li>• Lost time: 28 days average</li>
                    <li>• Legal costs and fines: up to £500,000</li>
                    <li>• Insurance premium increases: 20-40%</li>
                    <li>• Reputation damage: immeasurable</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border border-border/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Key Insight:</h3>
                <p className="text-white text-sm">
                  For every major injury reported, there are typically 10 minor injuries and 300 near misses that go unreported. Prevention at all levels is crucial.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 10: Prevention Checklist */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              10
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary and Prevention Checklist</h2>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-medium text-white mb-3">Daily Prevention Checklist</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Complete proper isolation and testing before work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Maintain good housekeeping and cable management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Use appropriate access equipment for height work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Wear correct PPE and use proper manual handling techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Report accidents, near misses, and unsafe conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section6_1;