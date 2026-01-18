import { ArrowLeft, Target, CheckCircle, Shield, FileCheck, Users, ClipboardList, Eye, Search, List, AlertTriangle, Scale, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "The Five Steps of Risk Assessment - Level 2 Module 1 Section 3.2";
const DESCRIPTION = "Learn the HSE's five-step risk assessment process for electrical work, including hazard identification, risk evaluation, and control measures.";

const Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "step1-check",
      question: "What is the first step in the HSE's five-step risk assessment process?",
      options: [
        "Evaluate the risks and decide on precautions",
        "Identify the hazards", 
        "Decide who might be harmed and how",
        "Record findings and implement them"
      ],
      correctIndex: 1,
      explanation: "Step 1 is to identify the hazards. You must first know what the hazards are before you can assess who might be harmed and how to control the risks."
    },
    {
      id: "matrix-check",
      question: "In a 5x5 risk matrix, what does a score of 25 represent?",
      options: [
        "Very Low Risk (Green)",
        "Medium Risk (Amber)",
        "High Risk (Red)", 
        "Very High Risk (Red)"
      ],
      correctIndex: 3,
      explanation: "A score of 25 (5 likelihood × 5 consequence) represents the highest possible risk level, indicating Very High Risk requiring immediate action."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the first step in the five-step risk assessment process?",
      options: [
        "Evaluate the risks",
        "Identify the hazards",
        "Decide who might be harmed",
        "Review the assessment"
      ],
      correctAnswer: 1,
      explanation: "Step 1 is to identify the hazards. You must first know what the hazards are before you can assess who might be harmed and how to control the risks."
    },
    {
      id: 2,
      question: "In a 5x5 risk matrix, what does a risk score of 25 represent?",
      options: [
        "Very Low Risk",
        "Low Risk", 
        "Medium Risk",
        "Very High Risk"
      ],
      correctAnswer: 3,
      explanation: "A score of 25 (5 x 5) represents the highest combination of likelihood and consequence, indicating Very High Risk requiring immediate action."
    },
    {
      id: 3,
      question: "Which step involves implementing control measures?",
      options: [
        "Step 2: Decide who might be harmed",
        "Step 3: Evaluate the risks and decide on precautions",
        "Step 4: Record findings and implement them",
        "Step 5: Review the assessment"
      ],
      correctAnswer: 2,
      explanation: "Step 4 involves recording your findings and implementing the control measures you decided upon in step 3."
    },
    {
      id: 4,
      question: "What should you consider when deciding who might be harmed?",
      options: [
        "Only the person doing the work",
        "Workers, visitors, contractors, and the public",
        "Only experienced workers",
        "Only people with electrical qualifications"
      ],
      correctAnswer: 1,
      explanation: "You must consider all people who could be affected, including workers, visitors, contractors, members of the public, and especially vulnerable groups."
    },
    {
      id: 5,
      question: "What is the hierarchy of control measures?",
      options: [
        "PPE, Training, Engineering, Elimination",
        "Elimination, Substitution, Engineering, Administrative, PPE",
        "Administrative, PPE, Engineering, Elimination",
        "Training, PPE, Substitution, Elimination"
      ],
      correctAnswer: 1,
      explanation: "The hierarchy of control measures from most to least effective is: Elimination, Substitution, Engineering controls, Administrative controls, and PPE as the last resort."
    },
    {
      id: 6,
      question: "When should risk assessments be reviewed?",
      options: [
        "Only when accidents occur",
        "Every 12 months automatically",
        "When there are significant changes or new hazards identified",
        "Never, once they are completed"
      ],
      correctAnswer: 2,
      explanation: "Risk assessments should be reviewed regularly and always when there are significant changes to work activities, new hazards are identified, or following incidents."
    },
    {
      id: 7,
      question: "What does 'suitable and sufficient' mean for risk assessments?",
      options: [
        "They must be perfect and cover every possible risk",
        "They should be proportionate to the risk and help you manage it",
        "They must be at least 10 pages long",
        "They only need to cover high-risk activities"
      ],
      correctAnswer: 1,
      explanation: "Suitable and sufficient means the assessment should be proportionate to the risk level, help you manage the risks effectively, and enable informed decisions about control measures."
    },
    {
      id: 8,
      question: "Who can be involved in conducting risk assessments?",
      options: [
        "Only qualified safety professionals",
        "Only the employer or manager",
        "Competent persons including experienced workers and safety professionals",
        "Any employee regardless of experience"
      ],
      correctAnswer: 2,
      explanation: "Risk assessments should involve competent persons, which can include experienced workers, safety professionals, and technical experts who understand the hazards and work processes."
    },
    {
      id: 9,
      question: "What is the purpose of the risk matrix in Step 3?",
      options: [
        "To make the assessment look more professional",
        "To systematically evaluate the likelihood and consequences of hazards",
        "To confuse workers about the real risks",
        "To avoid having to implement control measures"
      ],
      correctAnswer: 1,
      explanation: "The risk matrix provides a systematic way to evaluate both the likelihood of a hazard occurring and the potential consequences, helping prioritise which risks need immediate attention."
    },
    {
      id: 10,
      question: "True or False: Step 4 requires you to record findings if you employ 5 or more people.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Under the Management of Health and Safety at Work Regulations 1999, employers with 5 or more employees must record the significant findings of their risk assessments."
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 3.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                The Five Steps of Risk Assessment
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mt-2">
                HSE's systematic approach to identifying and controlling electrical hazards
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Step 1:</strong> Identify the hazards that could cause harm.</li>
                <li><strong>Step 2:</strong> Decide who might be harmed and how.</li>
                <li><strong>Step 3:</strong> Evaluate risks and decide on precautions.</li>
                <li><strong>Step 4:</strong> Record findings and implement them.</li>
                <li><strong>Step 5:</strong> Review and update your assessment.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> New work activities, equipment changes, incident follow-ups, regulatory updates.</li>
                <li><strong>Use:</strong> Before starting electrical work, during planning stages, method statement preparation.</li>
                <li><strong>Apply:</strong> Systematic approach, involve competent people, document decisions, communicate findings.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-white/80 mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply the HSE's five-step risk assessment process systematically</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use risk matrices to evaluate likelihood and consequences</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select appropriate control measures using the hierarchy of controls</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Document and communicate risk assessment findings effectively</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Step 1 - Identify the Hazards */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-elec-yellow/5/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Step 1: Identify the Hazards
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Look for anything that could cause harm to people. Focus on significant hazards that could result in serious injury or affect several people.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Systematic hazard identification methods:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Walk around the workplace and examine work activities systematically</li>
                    <li>Check manufacturer's instructions, safety data sheets, and equipment manuals</li>
                    <li>Consult with experienced workers who understand the practical hazards</li>
                    <li>Review accident records, near miss reports, and incident investigations</li>
                    <li>Consider non-routine activities, maintenance, and emergency situations</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Primary electrical hazards to identify:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Electric shock from direct contact with live conductors</li>
                    <li>Electric shock from indirect contact (earth faults, damaged equipment)</li>
                    <li>Electrical burns from arc flash, short circuits, or contact with hot surfaces</li>
                    <li>Fire and explosion from electrical faults, overloading, or ignition sources</li>
                    <li>Electromagnetic fields from high-current equipment and power lines</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Secondary and environmental hazards:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Falls from height during electrical work on roofs, towers, or platforms</li>
                    <li>Manual handling injuries from heavy electrical equipment and cable drums</li>
                    <li>Cuts and abrasions from sharp edges, cable armour, and metalwork</li>
                    <li>Struck by falling objects during overhead electrical work</li>
                    <li>Confined space risks in electrical substations and underground chambers</li>
                    <li>Weather conditions affecting outdoor electrical work safety</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Step 2 - Decide Who Might Be Harmed */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-elec-yellow/5/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Step 2: Decide Who Might Be Harmed and How
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Consider all groups of people who could be affected by electrical hazards, including those not directly involved in the work.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Direct workers and personnel:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Electricians and electrical engineers conducting the work</li>
                    <li>Apprentices and trainees working under supervision</li>
                    <li>Other trades working in the same area (plumbers, carpenters, painters)</li>
                    <li>Supervisors and site managers overseeing electrical work</li>
                    <li>Maintenance and cleaning staff who may encounter electrical installations</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Vulnerable groups requiring special consideration:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Young workers and new employees with limited experience</li>
                    <li>Pregnant workers who may be more susceptible to certain hazards</li>
                    <li>Workers with disabilities who may need additional protection measures</li>
                    <li>Temporary staff and contractors unfamiliar with site-specific hazards</li>
                    <li>Non-English speaking workers who may not understand safety instructions</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Members of the public and building users:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Building occupants including office workers, residents, and patients</li>
                    <li>Visitors, customers, and members of the public</li>
                    <li>Passers-by who might be affected by external electrical work</li>
                    <li>School children and students in educational environments</li>
                    <li>Emergency services personnel who may need to access electrical areas</li>
                    <li>Future maintenance workers and building users after project completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Step 3 - Evaluate the Risks */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-elec-yellow/5/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Step 3: Evaluate the Risks and Decide on Precautions
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Estimate the risk by considering both the likelihood of harm occurring and the potential severity of consequences.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Risk evaluation using 5x5 matrix:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Rate likelihood from 1 (Very Unlikely) to 5 (Very Likely)</li>
                    <li>Rate consequences from 1 (Negligible) to 5 (Catastrophic)</li>
                    <li>Multiply likelihood × consequence to get risk score (1-25)</li>
                    <li>Scores 1-4: Low risk (Green) - monitor and review</li>
                    <li>Scores 5-12: Medium risk (Amber) - reduce if reasonably practicable</li>
                    <li>Scores 15-25: High risk (Red) - immediate action required</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Hierarchy of control measures (most to least effective):</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Elimination:</strong> Remove the hazard completely (design out, avoid live working)</li>
                    <li><strong>Substitution:</strong> Replace with less hazardous alternative (lower voltage, safer equipment)</li>
                    <li><strong>Engineering controls:</strong> Physical measures (isolation, barriers, RCD protection)</li>
                    <li><strong>Administrative controls:</strong> Procedures, training, permits-to-work, supervision</li>
                    <li><strong>PPE:</strong> Personal protective equipment as last resort (insulated tools, arc flash suits)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Selecting appropriate control measures:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Consider effectiveness in reducing risk to acceptable levels</li>
                    <li>Ensure measures are proportionate to the risk level identified</li>
                    <li>Check feasibility and cost-effectiveness of implementation</li>
                    <li>Consider impact on work efficiency and other safety measures</li>
                    <li>Ensure compliance with relevant standards and regulations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* 5x5 Risk Assessment Matrix */}
        <div className="mb-8">
          <div className="border-l-4 border-orange-500 bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-elec-yellow" />
              5x5 Risk Assessment Matrix
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                The 5x5 risk matrix provides a systematic way to evaluate risks by combining likelihood and consequence ratings.
              </p>
              
              {/* Risk Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border/30 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-border/30 p-2 bg-muted text-center font-bold">Risk Matrix</th>
                      <th className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center font-bold">Very Unlikely (1)</th>
                      <th className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center font-bold">Unlikely (2)</th>
                      <th className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 text-center font-bold">Possible (3)</th>
                      <th className="border border-border/30 p-2 bg-orange-200 dark:bg-orange-800/50 text-center font-bold">Likely (4)</th>
                      <th className="border border-border/30 p-2 bg-red-200 dark:bg-red-800/50 text-center font-bold">Very Likely (5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border/30 p-2 bg-red-200 dark:bg-red-800/50 font-bold">Catastrophic (5)</td>
                      <td className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 text-center font-bold">5</td>
                      <td className="border border-border/30 p-2 bg-orange-200 dark:bg-orange-800/50 text-center font-bold">10</td>
                      <td className="border border-border/30 p-2 bg-red-200 dark:bg-red-800/50 text-center font-bold">15</td>
                      <td className="border border-border/30 p-2 bg-red-300 dark:bg-red-700/60 text-center font-bold">20</td>
                      <td className="border border-border/30 p-2 bg-red-600 text-white text-center font-bold">25</td>
                    </tr>
                    <tr>
                      <td className="border border-border/30 p-2 bg-orange-200 dark:bg-orange-800/50 font-bold">Major (4)</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">4</td>
                      <td className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 text-center font-bold">8</td>
                      <td className="border border-border/30 p-2 bg-orange-200 dark:bg-orange-800/50 text-center font-bold">12</td>
                      <td className="border border-border/30 p-2 bg-red-200 dark:bg-red-800/50 text-center font-bold">16</td>
                      <td className="border border-border/30 p-2 bg-red-300 dark:bg-red-700/60 text-center font-bold">20</td>
                    </tr>
                    <tr>
                      <td className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 font-bold">Moderate (3)</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">3</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">6</td>
                      <td className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 text-center font-bold">9</td>
                      <td className="border border-border/30 p-2 bg-orange-200 dark:bg-orange-800/50 text-center font-bold">12</td>
                      <td className="border border-border/30 p-2 bg-red-200 dark:bg-red-800/50 text-center font-bold">15</td>
                    </tr>
                    <tr>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 font-bold">Minor (2)</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">2</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">4</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">6</td>
                      <td className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 text-center font-bold">8</td>
                      <td className="border border-border/30 p-2 bg-orange-200 dark:bg-orange-800/50 text-center font-bold">10</td>
                    </tr>
                    <tr>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 font-bold">Negligible (1)</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">1</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">2</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">3</td>
                      <td className="border border-border/30 p-2 bg-green-200 dark:bg-green-800/50 text-center">4</td>
                      <td className="border border-border/30 p-2 bg-yellow-200 dark:bg-yellow-800/50 text-center">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Risk Level Definitions */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-bold mb-2">Likelihood Ratings:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Very Unlikely (1):</strong> Extremely rare, almost impossible</li>
                    <li><strong>Unlikely (2):</strong> Could happen but probably won't</li>
                    <li><strong>Possible (3):</strong> Might happen occasionally</li>
                    <li><strong>Likely (4):</strong> Will probably happen in most circumstances</li>
                    <li><strong>Very Likely (5):</strong> Expected to occur frequently</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">Consequence Ratings:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Negligible (1):</strong> Minor injuries, first aid treatment</li>
                    <li><strong>Minor (2):</strong> Minor injuries requiring medical treatment</li>
                    <li><strong>Moderate (3):</strong> Lost time injuries, hospitalisation</li>
                    <li><strong>Major (4):</strong> Serious injuries, permanent disability</li>
                    <li><strong>Catastrophic (5):</strong> Fatality or multiple serious injuries</li>
                  </ul>
                </div>
              </div>

              {/* Risk Action Levels */}
              <div className="mt-6">
                <p className="font-bold mb-2">Risk Action Levels:</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                  <div className="bg-green-200 dark:bg-green-800/50 p-3 rounded border">
                    <p className="font-bold text-green-800 dark:text-green-200">Low Risk (1-4)</p>
                    <p>Acceptable risk. Monitor and maintain controls.</p>
                  </div>
                  <div className="bg-yellow-200 dark:bg-yellow-800/50 p-3 rounded border">
                    <p className="font-bold text-yellow-800 dark:text-yellow-200">Medium Risk (5-9)</p>
                    <p>Tolerable risk. Additional controls may be required.</p>
                  </div>
                  <div className="bg-orange-200 dark:bg-orange-800/50 p-3 rounded border">
                    <p className="font-bold text-orange-800 dark:text-orange-200">High Risk (10-15)</p>
                    <p>Unacceptable risk. Immediate action required.</p>
                  </div>
                  <div className="bg-red-200 dark:bg-red-800/50 p-3 rounded border">
                    <p className="font-bold text-red-800 dark:text-red-200">Very High Risk (16-25)</p>
                    <p>Stop work. Urgent action required.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Step 4 - Record Findings and Implement */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-elec-yellow/5/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Step 4: Record Findings and Implement Them
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Document your risk assessment findings and put the control measures you've identified into practice.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Legal recording requirements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Employers with 5 or more employees must record significant findings</li>
                    <li>Include all hazards identified and groups of people at risk</li>
                    <li>Document existing control measures and their effectiveness</li>
                    <li>Record additional control measures needed and implementation plans</li>
                    <li>Set clear responsibilities and target dates for actions</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Documentation standards and content:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Use clear, simple language that all affected people can understand</li>
                    <li>Include specific details about location, equipment, and work activities</li>
                    <li>Reference relevant standards, regulations, and manufacturer guidance</li>
                    <li>Ensure assessments are dated, signed by competent persons, and version controlled</li>
                    <li>Keep records proportionate to risk - simple format for straightforward work</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Implementation and communication:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Share findings with all affected workers through briefings and toolbox talks</li>
                    <li>Provide specific training on identified control measures and procedures</li>
                    <li>Make risk assessments available at work locations and site offices</li>
                    <li>Include key points in method statements and safe systems of work</li>
                    <li>Ensure subcontractors and temporary workers understand site-specific risks</li>
                    <li>Monitor implementation to ensure control measures are being followed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Step 5 - Review and Update */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-elec-yellow/5/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Step 5: Review and Update Your Assessment
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Risk assessments should be living documents that are reviewed regularly and updated when circumstances change.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Regular review schedule:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Annual review as minimum for ongoing work activities</li>
                    <li>More frequent review for high-risk activities or changing environments</li>
                    <li>Project-based review at key milestones and phase completions</li>
                    <li>Immediate review following incidents, near misses, or accidents</li>
                    <li>Review when new regulations, standards, or guidance are published</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Triggers for assessment updates:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Significant changes to work processes, equipment, or electrical systems</li>
                    <li>Introduction of new hazards or discovery of previously unidentified risks</li>
                    <li>Changes in personnel, especially key technical or supervisory staff</li>
                    <li>Modifications to workplace layout, access routes, or environmental conditions</li>
                    <li>Feedback from workers indicating control measures are inadequate</li>
                    <li>Results from inspections, audits, or compliance monitoring</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Review process and continuous improvement:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Check effectiveness of existing control measures through monitoring and feedback</li>
                    <li>Identify opportunities for improvement using latest technology and best practice</li>
                    <li>Consider lessons learned from incidents in similar work environments</li>
                    <li>Update assessment based on new knowledge, experience, and regulatory changes</li>
                    <li>Document review dates, changes made, and reasons for modifications</li>
                    <li>Communicate updates to all affected personnel and update training programmes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Essential Process Points</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Follow the five steps systematically in order</li>
                <li>• Involve competent people with practical experience</li>
                <li>• Use risk matrices to prioritise control measures</li>
                <li>• Apply hierarchy of controls from elimination to PPE</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Best Practices</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Keep assessments proportionate to the risk</li>
                <li>• Document decisions and reasoning clearly</li>
                <li>• Communicate findings to all affected people</li>
                <li>• Review regularly and update when circumstances change</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs Section */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-elec-yellow" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 text-foreground">
              
              <div>
                <h3 className="font-bold text-foreground mb-2">Q: Do I need to complete a formal risk assessment for every electrical task?</h3>
                <p className="text-sm text-white/80">
                  A: Not necessarily. For routine, low-risk tasks with established procedures, a simple mental check may suffice. However, formal written assessments are required for complex work, high-risk activities, or when employing 5 or more people. The key is ensuring the assessment is 'suitable and sufficient' for the level of risk involved.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: Who is qualified to conduct electrical risk assessments?</h3>
                <p className="text-sm text-white/80">
                  A: Competent persons with sufficient knowledge, experience, and training to understand the electrical hazards and appropriate control measures. This could include qualified electricians, electrical engineers, safety professionals, or experienced supervisors. The level of competence should match the complexity and risk level of the work.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: How often should risk assessments be reviewed?</h3>
                <p className="text-sm text-white/80">
                  A: There's no fixed legal requirement, but best practice suggests annual reviews as a minimum. However, you must review immediately when there are significant changes to work processes, equipment, personnel, or following incidents. High-risk activities may require more frequent reviews.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: What's the difference between a risk assessment and a method statement?</h3>
                <p className="text-sm text-white/80">
                  A: A risk assessment identifies hazards and evaluates risks, while a method statement describes how work will be carried out safely. The risk assessment informs the method statement - you assess the risks first, then write procedures to control those risks. Both documents should work together as part of your safety management system.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: Can I use generic risk assessments for electrical work?</h3>
                <p className="text-sm text-white/80">
                  A: Generic assessments can provide a good starting point, but they must be adapted to your specific workplace, equipment, and circumstances. Simply copying generic assessments without considering site-specific factors is unlikely to meet the 'suitable and sufficient' test. Always customise assessments to reflect actual working conditions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: What should I do if I identify a high-risk scenario during the assessment?</h3>
                <p className="text-sm text-white/80">
                  A: Stop work immediately if there's imminent danger. For high-risk scenarios (scores 15-25 on the risk matrix), implement immediate temporary controls to reduce risk, then develop and implement permanent control measures. Document your actions and ensure all personnel are informed of the risks and controls.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: Do I need separate assessments for each voltage level?</h3>
                <p className="text-sm text-white/80">
                  A: Yes, different voltage levels present different risks and require different control measures. Low voltage (LV), high voltage (HV), and extra high voltage (EHV) systems all have distinct hazards and safety requirements. Your assessment should clearly identify voltage levels and appropriate safety procedures for each.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: How detailed should my risk assessment documentation be?</h3>
                <p className="text-sm text-white/80">
                  A: Documentation should be proportionate to the risk level and complexity of work. Simple, routine tasks may only need basic records, while complex or high-risk work requires detailed documentation. Include enough information so that someone else could understand the hazards, risks, and control measures without needing additional explanation.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: What role do workers play in the risk assessment process?</h3>
                <p className="text-sm text-white/80">
                  A: Workers should be actively involved as they have practical knowledge of hazards and work processes. Consult them during the assessment process, listen to their concerns, and involve them in developing practical control measures. Their input is valuable for identifying real-world risks that might not be obvious from technical specifications alone.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Q: Can environmental factors affect my electrical risk assessment?</h3>
                <p className="text-sm text-white/80">
                  A: Absolutely. Weather conditions (rain, wind, temperature), location factors (confined spaces, height, proximity to public areas), and time constraints can all significantly affect electrical risks. Your assessment must consider these environmental factors and how they might increase likelihood or consequences of electrical hazards.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <Quiz
          questions={quizQuestions}
          title="Five Steps of Risk Assessment Quiz"
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="../subsection10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Purpose of Risk Assessments
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="../subsection12">
              Next: What is a Method Statement?
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section3_2;