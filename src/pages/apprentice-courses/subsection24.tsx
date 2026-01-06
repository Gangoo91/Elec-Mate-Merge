import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Users, FileText, Building, TestTube, Shield, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "RIDDOR: What Must Be Reported - Level 2 Electrical Course";
const DESCRIPTION = "Understand legal reporting requirements (RIDDOR): what must be reported, who reports, and timeframes.";

const Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does RIDDOR stand for?",
      options: [
        "Reporting of Incidents, Deaths, Diseases and Occupational Regulations",
        "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", 
        "Registration of Industrial Deaths, Diseases and Occupational Requirements",
        "Regulations for Industrial Deaths, Diseases and Occupational Risks"
      ],
      correctAnswer: 1,
      explanation: "RIDDOR stands for Reporting of Injuries, Diseases and Dangerous Occurrences Regulations - the UK legal framework for workplace incident reporting."
    },
    {
      id: 2,
      question: "Which of the following must be reported under RIDDOR?",
      options: [
        "Minor cuts and bruises",
        "Deaths and major injuries like fractures",
        "Equipment maintenance and routine checks",
        "Training incidents and practice sessions"
      ],
      correctAnswer: 1,
      explanation: "RIDDOR requires reporting of serious incidents including deaths, major injuries (fractures, amputations, burns requiring hospital treatment), and dangerous occurrences."
    },
    {
      id: 3,
      question: "Who is responsible for reporting RIDDOR incidents?",
      options: [
        "The injured person only",
        "Any witness to the incident",
        "Employers or responsible persons (site managers, contractors)",
        "The HSE inspectors"
      ],
      correctAnswer: 2,
      explanation: "Employers, responsible persons (such as site managers or contractors), and self-employed persons are responsible for making RIDDOR reports."
    },
    {
      id: 4,
      question: "What is the time limit for reporting an over-7-day injury?",
      options: [
        "Immediately",
        "Within 15 days",
        "Within 24 hours",
        "Within 7 days"
      ],
      correctAnswer: 1,
      explanation: "Over-7-day injuries (where someone cannot perform normal work for 7+ consecutive days) must be reported within 15 days of the incident."
    },
    {
      id: 5,
      question: "True or False: Near misses never need to be reported.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Near misses that could have resulted in serious harm are classified as 'dangerous occurrences' and must be reported under RIDDOR."
    },
    {
      id: 6,
      question: "What should be the immediate actions after a serious incident?",
      options: [
        "Continue working to meet deadlines",
        "Secure scene, provide first aid, notify authorities, preserve evidence",
        "Clean up the area and resume normal operations",
        "Wait for management to arrive before taking action"
      ],
      correctAnswer: 1,
      explanation: "After a serious incident, immediately secure the scene, provide first aid if needed, notify relevant authorities, and preserve evidence for investigation."
    },
    {
      id: 7,
      question: "Which of these near-miss events would be reportable under RIDDOR?",
      options: [
        "A minor slip on a wet floor with no injury",
        "Equipment failure that could have caused serious injury",
        "Running out of materials during work",
        "A brief power outage"
      ],
      correctAnswer: 1,
      explanation: "Equipment failures or dangerous occurrences that could have resulted in serious harm must be reported under RIDDOR, even if no injury occurred."
    },
    {
      id: 8,
      question: "How long must RIDDOR records be kept?",
      options: [
        "1 year",
        "2 years", 
        "3 years",
        "5 years"
      ],
      correctAnswer: 2,
      explanation: "RIDDOR records must be kept for a minimum of 3 years to allow for HSE investigations and compliance monitoring."
    },
    {
      id: 9,
      question: "Who can make RIDDOR reports for self-employed persons?",
      options: [
        "Their clients or customers",
        "The local authority",
        "They must report their own incidents",
        "Any other contractor on site"
      ],
      correctAnswer: 2,
      explanation: "Self-employed persons are responsible for reporting their own incidents under RIDDOR - they cannot rely on others to do this for them."
    },
    {
      id: 10,
      question: "What happens if RIDDOR reporting requirements are not met?",
      options: [
        "A verbal warning is given",
        "Criminal prosecution and unlimited fines are possible",
        "A small administrative fee is charged",
        "Nothing, it's just a guideline"
      ],
      correctAnswer: 1,
      explanation: "Failure to comply with RIDDOR reporting requirements can result in criminal prosecution, unlimited fines, and other serious legal consequences."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Block */}
        <div className="flex items-start gap-6 mb-12">
          <AlertTriangle className="h-8 w-8 text-elec-yellow flex-shrink-0 mt-2" />
          <div className="flex-1">
            <div className="inline-flex items-center px-3 py-1 bg-elec-yellow text-black rounded-full text-sm font-semibold mb-4">
              Module 6.2
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              RIDDOR: What Must Be Reported
            </h1>
            <p className="text-xl text-gray-300">
              Legal requirements for reporting workplace incidents and injuries
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">In 30 seconds</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                RIDDOR legally requires reporting of serious workplace incidents to the HSE. 
                This includes deaths, major injuries, over-7-day injuries, occupational diseases, 
                dangerous occurrences, and gas incidents. Employers and responsible persons must report 
                using the HSE online portal within specific timeframes.
              </p>
            </div>
            <div className="p-4 bg-card border border-elec-yellow/30 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Spot it / Use it</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong>Spot:</strong> Unconsciousness from shock, fractures, burns needing hospital treatment, dangerous near-misses.
                <br />
                <strong>Use:</strong> Report immediately for fatal/major injuries, within 15 days for over-7-day injuries. Keep records for 3 years minimum.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Outcomes</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Understand what RIDDOR is and why it matters</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Know what must be reported (major injuries, over-7-day injuries, diseases, dangerous occurrences, gas incidents)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Identify who reports and timeframes</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Apply good reporting and evidence-preservation practice</span>
            </div>
          </div>
        </Card>

        {/* Section 1: RIDDOR Overview: What and Why */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">RIDDOR Overview: What and Why</h2>
          </div>
          <div className="ml-12">
            <p className="text-gray-300 mb-6">
              RIDDOR is a legal requirement under UK law to report certain workplace incidents to the HSE or local authority.
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">It covers:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Serious injuries</li>
                  <li>• Work-related diseases</li>
                  <li>• Dangerous occurrences (near misses)</li>
                  <li>• Fatalities</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">The aim is to:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Help monitor accident trends</li>
                  <li>• Improve workplace safety</li>
                  <li>• Allow enforcement action when necessary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck after Section 1 */}
        <InlineCheck
          id="riddor-check-1"
          question="Which of the following must be reported under RIDDOR?"
          options={[
            "Minor cut requiring plaster",
            "Fracture of wrist",
            "Feeling tired at work",
            "Misplaced tool"
          ]}
          correctIndex={1}
          explanation="A fracture of the wrist is classified as a major injury under RIDDOR and must be reported immediately, as it's a fracture other than to fingers, thumbs, or toes."
        />

        {/* Section 2: Reportable Injuries (Deaths/Major + Over-7-Day) */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Reportable Injuries (Deaths/Major + Over-7-Day)</h2>
          </div>
          <div className="ml-12">
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3 font-medium">Death or Major Injury - Must be reported immediately:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Deaths on site</li>
                <li>• Fractures (except fingers, thumbs, toes)</li>
                <li>• Amputations</li>
                <li>• Burns requiring hospital treatment</li>
                <li>• Eye injuries or loss of sight</li>
                <li>• Electric shock leading to unconsciousness</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-gray-300 mb-3 font-medium">Over-Seven-Day Injuries - Report within 15 days:</p>
              <p className="text-gray-300 text-sm">
                Injuries where someone is unable to perform their normal work for 7+ consecutive days must be reported within 15 days of the incident.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Occupational Diseases and Gas Incidents */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Occupational Diseases and Gas Incidents</h2>
          </div>
          <div className="ml-12">
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3 font-medium">Occupational Diseases - conditions reportable when diagnosed:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Hand-arm vibration syndrome</li>
                <li>• Occupational dermatitis</li>
                <li>• Carpal tunnel syndrome</li>
                <li>• Work-related asthma</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-gray-300 mb-3 font-medium">Gas Incidents - must be reported:</p>
              <p className="text-gray-300 text-sm">
                Gas leaks or faulty appliances that could cause injury or death must be reported.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Dangerous Occurrences and Practical Examples */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              4
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Dangerous Occurrences and Practical Examples</h2>
          </div>
          <div className="ml-12">
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3 font-medium">Dangerous Occurrences - Electrical work examples:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Electrical short circuit causing explosion or fire</li>
                <li>• Arc flash incident (even if no injury)</li>
                <li>• Overhead line contact with vehicle/equipment</li>
                <li>• Cable strike damaging underground electricity cables</li>
                <li>• Switchgear failure or unintended operation</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-gray-300 mb-3 font-medium">Must report:</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Broken wrist (fracture)</li>
                  <li>• Burns needing hospital treatment</li>
                  <li>• Unconsciousness from electric shock</li>
                  <li>• Eye injury from arc flash</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-gray-300 mb-3 font-medium">Not major injuries:</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Broken finger or toe</li>
                  <li>• Minor cuts or bruises</li>
                  <li>• Minor burns (no hospital)</li>
                  <li>• Sprains requiring time off</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Reporting Process, Timeframes, and Good Practice */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
              5
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Reporting Process, Timeframes, and Good Practice</h2>
          </div>
          <div className="ml-12">
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3 font-medium">Who Reports?</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Employers or the responsible person (e.g. site manager, contractor)</li>
                <li>• Self-employed persons must report their own incidents</li>
                <li>• Reports are made via the HSE's online portal</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3 font-medium">Timeframes:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Fatal or major injuries:</strong> reported immediately</li>
                <li>• <strong>Over-7-day injuries:</strong> reported within 15 days</li>
                <li>• <strong>Records:</strong> must be kept for at least 3 years</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-gray-300 mb-3 font-medium">Good Reporting Practice:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Preserve the scene and gather evidence</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Provide immediate first aid and ensure safety</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Notify relevant parties promptly</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Record facts only, avoid speculation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Maintain confidentiality and dignity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Scenario */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Real World Scenario</h2>
          <div className="bg-card border border-amber-400/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Scenario: Arc Flash Incident</h3>
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                <strong>The Situation:</strong> During routine maintenance at a commercial building, electrician Sarah opens a distribution panel to check connections. A loose terminal causes an arc flash, creating a bright flash and loud bang. Sarah instinctively steps back and isn't injured, but her safety glasses are cracked from debris, and the incident could have caused serious burns or eye damage.
              </p>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">What happened next:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Site supervisor immediately secured the area and ensured Sarah was unharmed</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Power was isolated to the affected panel</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Photos were taken of the damaged equipment and Sarah's cracked glasses</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <span>RIDDOR report was filed immediately as a "dangerous occurrence"</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-elec-yellow w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Investigation revealed the loose terminal and led to improved maintenance procedures</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Why this was reportable:</h4>
                <p>Even though Sarah wasn't injured, this was a "dangerous occurrence" under RIDDOR because the arc flash could have caused serious injury or death. The incident helped identify a maintenance issue that could affect other workers.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-2">Do I need to report minor injuries that require first aid?</h3>
              <p className="text-gray-300 text-sm">
                No, minor injuries requiring only basic first aid don't need RIDDOR reporting. However, if the injury prevents someone from working for 7+ consecutive days, it becomes reportable as an "over-7-day injury."
              </p>
            </div>

            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-2">What if I'm not sure whether something is reportable?</h3>
              <p className="text-gray-300 text-sm">
                When in doubt, consult the HSE guidance or speak to your safety officer. It's better to report something that turns out not to be required than to miss a reportable incident. The HSE provides detailed guidance and a helpline for clarification.
              </p>
            </div>

            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-2">Can I report incidents online outside normal working hours?</h3>
              <p className="text-gray-300 text-sm">
                Yes, the HSE online reporting system is available 24/7. For fatal or major injuries, you should report immediately regardless of the time. Phone reporting is also available for urgent cases outside office hours.
              </p>
            </div>

            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-2">What happens after I submit a RIDDOR report?</h3>
              <p className="text-gray-300 text-sm">
                You'll receive a confirmation with a reference number. Keep this for your records. The HSE may follow up with questions or decide to investigate. In some cases, they may visit the site to examine the circumstances and ensure proper safety measures are in place.
              </p>
            </div>

            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-2">Do subcontractors need to report their own incidents?</h3>
              <p className="text-gray-300 text-sm">
                Self-employed persons and subcontractors are responsible for reporting their own incidents. However, if you're the main contractor or responsible person, you should ensure they understand their obligations and assist with reporting if needed.
              </p>
            </div>

            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-2">What's the penalty for not reporting a RIDDOR incident?</h3>
              <p className="text-gray-300 text-sm">
                Failure to report can result in prosecution, unlimited fines, and enforcement action. The HSE takes non-compliance seriously as it prevents them from monitoring workplace safety trends and taking appropriate action to protect workers.
              </p>
            </div>

          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section6_2;