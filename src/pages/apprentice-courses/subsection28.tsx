import { ArrowLeft, CheckCircle, Crown, Shield, FileCheck, Lightbulb, Users, Zap, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Final Summary and Key Safety Principles - Level 2 Electrical Course";
const DESCRIPTION = "Reinforcing core safety concepts and building lifelong safe working habits for electrical professionals.";

const Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 1,
      question: "What is the most important principle for electrical safety?",
      options: [
        "Using the most expensive PPE",
        "Working quickly to finish jobs faster",
        "Taking personal responsibility for safety",
        "Following only company rules, not regulations"
      ],
      correctIndex: 2,
      explanation: "Personal responsibility is the foundation of electrical safety - you are responsible for your safety and the safety of others affected by your work."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the purpose of safe isolation?",
      options: [
        "To save electricity",
        "To prevent electrical shock and ensure safe working",
        "To reduce costs",
        "To comply with building regulations only"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation ensures that electrical circuits are completely de-energised before work begins, preventing electrical shock, arc flash, and ensuring worker safety."
    },
    {
      id: 2,
      question: "Name two regulations that apply to electrical safety.",
      options: [
        "RIDDOR and Building Regulations",
        "HASAWA and CDM Regulations",
        "EAWR and HASAWA",
        "BS7671 and Fire Safety Order"
      ],
      correctAnswer: 2,
      explanation: "The Electricity at Work Regulations 1989 (EAWR) and Health and Safety at Work Act 1974 (HASAWA) are key regulations governing electrical safety in the workplace."
    },
    {
      id: 3,
      question: "What should you do if your PPE is damaged?",
      options: [
        "Continue using it if the damage is minor",
        "Repair it yourself with tape",
        "Stop work and replace it immediately",
        "Use it until the end of the shift"
      ],
      correctAnswer: 2,
      explanation: "Damaged PPE cannot provide adequate protection and must be replaced immediately. Never use damaged PPE as it may fail when you need it most."
    },
    {
      id: 4,
      question: "Why is housekeeping important on electrical sites?",
      options: [
        "It looks professional to clients",
        "It prevents trips, falls, and electrical hazards",
        "It's required by company policy",
        "It makes cleaning easier"
      ],
      correctAnswer: 1,
      explanation: "Good housekeeping prevents accidents by eliminating trip hazards, reducing fire risks, preventing water contact with electricity, and maintaining clear escape routes."
    },
    {
      id: 5,
      question: "True or False: Being competent means following safety rules every time.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Competence in electrical work means consistently following safety procedures and regulations every time, regardless of time pressure or familiarity with the task."
    },
    {
      id: 6,
      question: "What does RIDDOR stand for?",
      options: [
        "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
        "Risk Investigation and Damage Reporting Regulations",
        "Rapid Incident Detection and Response Regulations",
        "Regional Industrial Damage and Risk Regulations"
      ],
      correctAnswer: 0,
      explanation: "RIDDOR stands for Reporting of Injuries, Diseases and Dangerous Occurrences Regulations - the legal requirement to report serious workplace incidents."
    },
    {
      id: 7,
      question: "When should you never work on electrical circuits?",
      options: [
        "When it's raining outside",
        "When you're feeling tired",
        "When circuits are live (unless absolutely necessary with proper controls)",
        "When you don't have a helper"
      ],
      correctAnswer: 2,
      explanation: "Never work on live circuits unless absolutely necessary, and only with proper training, equipment, and safety controls in place."
    },
    {
      id: 8,
      question: "What is the purpose of emergency procedures?",
      options: [
        "To satisfy legal requirements only",
        "To protect life, minimise harm, and ensure swift help",
        "To avoid insurance claims",
        "To impress clients with organisation"
      ],
      correctAnswer: 1,
      explanation: "Emergency procedures exist to protect life, minimise harm, ensure swift help arrives, and maintain accountability during incidents."
    },
    {
      id: 9,
      question: "What should you do if you're not competent for a particular electrical task?",
      options: [
        "Try your best and learn as you go",
        "Ask a colleague to help you fake it",
        "Refuse the work and seek proper training",
        "Use YouTube to learn quickly"
      ],
      correctAnswer: 2,
      explanation: "If you're not competent for a task, you must refuse the work and seek proper training. Working beyond your competence level is dangerous and potentially illegal."
    },
    {
      id: 10,
      question: "What is the key message about electrical safety for your career?",
      options: [
        "Safety rules slow down productivity",
        "Experience matters more than following procedures",
        "Safety systems exist to protect you, not slow you down",
        "Only major incidents need to be taken seriously"
      ],
      correctAnswer: 2,
      explanation: "Safety systems, procedures, and PPE exist to protect you and others, not to slow you down. They are based on lessons learned from previous incidents and deaths."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title block */}
        <div className="flex items-start gap-4 mb-8">
          <Crown className="h-8 w-8 text-elec-yellow mt-2" />
          <div className="flex-1">
            <div className="inline-flex px-3 py-1 bg-elec-yellow text-black rounded-full text-sm font-semibold mb-4">
              Module 6.6
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Final Summary and Key Safety Principles
            </h1>
            <p className="text-xl text-gray-300">
              Reinforcing core safety concepts and building lifelong safe working habits
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">In 30 seconds</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                You've completed Module 1 on Health and Safety. These aren't just rules for assessments — they're the foundation for working safely and professionally on any job. Master these principles and they'll serve you throughout your electrical career.
              </p>
            </div>
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-2 text-sm">Spot it / Use it</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p><span className="text-elec-yellow">Spot:</span> Personal responsibility, live working risks, safe isolation needs, PPE requirements, housekeeping issues</p>
                <p><span className="text-elec-yellow">Use:</span> Apply safety principles consistently, take responsibility, follow procedures, report incidents, stay competent</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Reinforce the core safety concepts covered in Module 1</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Summarise the responsibilities of electricians regarding safety</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Prepare learners for real-world site behaviour</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Encourage the development of lifelong safe working habits</span>
            </div>
          </div>
        </Card>

        {/* Section 1: Core Safety Principles */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-4">Essential Safety Principles</h2>
              <p className="text-gray-300 mb-6">
                These five principles form the foundation of electrical safety. Master them and apply them consistently.
              </p>

              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-white mb-3">The Five Fundamentals</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-white font-medium">Personal Responsibility</p>
                      <p className="text-gray-300 text-sm">You are responsible for your safety — and for the safety of others affected by your work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-white font-medium">Live Working</p>
                      <p className="text-gray-300 text-sm">Never work on live circuits unless absolutely necessary — and only with the right training and controls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-white font-medium">Safe Isolation</p>
                      <p className="text-gray-300 text-sm">Always use safe isolation procedures — isolate, lock off, and prove dead</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="text-white font-medium">PPE Usage</p>
                      <p className="text-gray-300 text-sm">Wear and maintain PPE — it's your last line of defence, not your first</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                    <div>
                      <p className="text-white font-medium">Tool Safety</p>
                      <p className="text-gray-300 text-sm">Use the correct tools for the job — and inspect them regularly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Critical Point</h3>
                <p className="text-gray-300 text-sm">
                  These aren't suggestions — they're requirements for safe electrical work. Your life and others depend on following them consistently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Professional Responsibilities */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-4">Additional Professional Principles</h2>
              <p className="text-gray-300 mb-6">
                Beyond the core five, these principles complete your professional safety foundation.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Workplace Habits</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Keep your work area clean and organised</li>
                    <li>• Communicate clearly with your team</li>
                    <li>• Report all incidents and near misses</li>
                    <li>• Follow proper lifting and manual handling</li>
                    <li>• Think before you act — never rush or guess</li>
                  </ul>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Legal & Professional</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Understand RIDDOR, EAWR, HASAWA, PUWER and COSHH</li>
                    <li>• Work to BS7671 requirements</li>
                    <li>• Only work within your skill level</li>
                    <li>• Keep learning and stay updated</li>
                    <li>• Never compromise on safety</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Professional Standard</h3>
                <p className="text-gray-300 text-sm">
                  Being qualified means more than passing exams — it means working safely, consistently, and professionally every day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck after Section 2 */}
        <div className="mb-8">
          <InlineCheck
            id="safetyCheck"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Building Safety Mindset */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-4">Developing Professional Mindset</h2>
              <p className="text-gray-300 mb-6">
                Electricians are trusted to work with systems that could kill. The best ones respect that responsibility every day.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Professional Habits</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Always follow procedures, even under pressure</li>
                    <li>• Question anything that seems unsafe</li>
                    <li>• Learn from mistakes and near misses</li>
                    <li>• Share knowledge with colleagues</li>
                    <li>• Take pride in safe, quality work</li>
                  </ul>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Career Development</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Seek out additional training opportunities</li>
                    <li>• Stay current with regulations and standards</li>
                    <li>• Develop leadership skills in safety</li>
                    <li>• Mentor new apprentices and colleagues</li>
                    <li>• Build a reputation for safe, reliable work</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Key Message</h3>
                <p className="text-gray-300 text-sm">
                  On your first day on site — and your thousandth — these rules still apply. Safety is not something you grow out of.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Real World Application */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-4">The Complete Electrical Professional</h2>
              <p className="text-gray-300 mb-6">
                Success in the electrical industry requires three skill sets working together: technical, safety, and professional.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Technical Skills</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Circuit design and installation</li>
                    <li>• Testing and inspection</li>
                    <li>• Fault finding and repair</li>
                    <li>• Use of test equipment</li>
                    <li>• Understanding of regulations</li>
                  </ul>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Safety Skills</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Risk assessment</li>
                    <li>• Safe isolation procedures</li>
                    <li>• PPE selection and use</li>
                    <li>• Emergency response</li>
                    <li>• Hazard identification</li>
                  </ul>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Professional Skills</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Communication</li>
                    <li>• Time management</li>
                    <li>• Customer service</li>
                    <li>• Teamwork</li>
                    <li>• Continuous learning</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Integration</h3>
                <p className="text-gray-300 text-sm">
                  All three skill areas must work together. Technical skill without safety awareness is dangerous. Safety knowledge without professional skills limits career growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Final Message */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              5
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-4">Your Safety Legacy</h2>
              <p className="text-gray-300 mb-6">
                The choices you make about safety don't just affect you — they impact your family, colleagues, and the entire electrical industry.
              </p>

              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-white mb-3">Remember Always</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• No job is so urgent that safety can be compromised</li>
                  <li>• Your family wants you home safe every day</li>
                  <li>• Good electricians earn respect through consistent safe practice</li>
                  <li>• Safety systems exist to protect you, not slow you down</li>
                  <li>• The life you save might not be your own</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Final Thought</h3>
                <p className="text-gray-300 text-sm">
                  Electricity won't give you a second chance. Procedures, PPE, and risk assessments aren't red tape — they're there because someone before you was injured or killed. Be the person who breaks the cycle, not the next example.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Scenario */}
        <Card className="p-6 bg-elec-yellow/5 border border-elec-yellow/20 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Real World Scenario
          </h2>
          <div className="bg-card border border-elec-yellow/30 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-elec-yellow mb-2">The Scenario</h3>
            <p className="text-elec-yellow text-sm">
              Two electricians with identical qualifications start their careers. One follows safety procedures religiously; the other takes shortcuts to work faster. After five years, the first has built a reputation for reliable, safe work and commands higher rates. The second has had three near misses and one reportable injury.
            </p>
          </div>
          <div className="bg-card border border-elec-yellow/30 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-elec-yellow mb-2">What Happened Next</h3>
            <p className="text-elec-yellow text-sm">
              The safety-conscious electrician becomes a team leader, mentors apprentices, and builds a successful career. The other struggles to find work as word spreads about their unsafe practices.
            </p>
          </div>
          <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-elec-yellow mb-2">Why It Mattered</h3>
            <ul className="space-y-1 text-elec-yellow text-sm">
              <li>• Safety builds reputation and career opportunities</li>
              <li>• Employers value reliable, safe workers</li>
              <li>• Safe practices become second nature with consistency</li>
              <li>• Good habits compound over time</li>
            </ul>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">Will following safety procedures make me slower than other electricians?</h3>
              <p className="text-gray-300 text-sm">Initially perhaps, but safe workers avoid rework, injuries, and accidents that cost far more time. Speed comes with practice, safety must be consistent.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-white mb-1">What if experienced workers tell me safety rules don't matter?</h3>
              <p className="text-gray-300 text-sm">Some experienced workers have developed bad habits. Follow regulations and procedures regardless. Your career and life are worth more than fitting in.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-white mb-1">How do I stay motivated to follow safety procedures every day?</h3>
              <p className="text-gray-300 text-sm">Remember that consistency builds habits. Think about your family, colleagues, and career. One mistake can change everything permanently.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-white mb-1">What's the most important safety habit to develop first?</h3>
              <p className="text-gray-300 text-sm">Taking personal responsibility. When you truly accept that safety is your responsibility, all other good habits follow naturally.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-white mb-1">How do I keep learning about safety throughout my career?</h3>
              <p className="text-gray-300 text-sm">Attend refresher training, read incident reports, learn from near misses, stay updated with regulations, and always ask questions when unsure.</p>
            </div>
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">What advice would you give to someone starting their electrical career?</h3>
              <p className="text-gray-300 text-sm">Build safety habits from day one. They're easier to develop than to change later. Your future self will thank you for the foundation you build now.</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section6_6;