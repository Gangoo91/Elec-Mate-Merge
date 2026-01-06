import { ArrowLeft, ArrowRight, Zap, AlertTriangle, Shield, CheckCircle, HardHat, Target, Eye, TrendingUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working at Height Safely While Installing Systems - Module 4.4.7 | Level 2 Electrical Course";
const DESCRIPTION = "Learn safe working practices for height work during electrical installations. Covers equipment selection, fall protection, and Work at Height Regulations 2005 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the minimum height at which the Work at Height Regulations 2005 apply?",
    options: ["1 metre", "2 metres", "Any height where a person could fall and be injured"],
    correctIndex: 2,
    explanation: "The Work at Height Regulations apply at any height where a person could fall and be injured, not just specific heights."
  },
  {
    id: 2,
    question: "Which type of ladder provides the most stability for electrical work?",
    options: ["Step ladder", "Extension ladder", "Platform ladder with handrails"],
    correctIndex: 2,
    explanation: "Platform ladders with handrails provide the most stability and allow for hands-free working while maintaining three points of contact."
  },
  {
    id: 3,
    question: "What is the recommended angle for leaning ladders?",
    options: ["60 degrees", "75 degrees", "1:4 ratio (75 degrees)"],
    correctIndex: 2,
    explanation: "The safe angle for leaning ladders is 1:4 ratio, which equals approximately 75 degrees from horizontal."
  }
];

export default function Module4Section4_7() {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation covers working at height in the UK?",
      options: [
        "BS 7671",
        "Work at Height Regulations 2005",
        "PUWER",
        "CDM Regulations"
      ],
      correctAnswer: 1,
      explanation: "The Work at Height Regulations 2005 specifically govern all work at height activities in the UK construction industry."
    },
    {
      id: 2,
      question: "True or False: Extension ladders are suitable for prolonged installation work.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Extension ladders are only for access, not prolonged work. They don't provide a stable working platform for extended tasks."
    },
    {
      id: 3,
      question: "What is the correct ladder positioning ratio?",
      options: [
        "3:1 ratio",
        "4:1 ratio",
        "5:1 ratio",
        "2:1 ratio"
      ],
      correctAnswer: 1,
      explanation: "The 4:1 ratio means for every 4 metres of height, the base should be 1 metre away from the wall."
    },
    {
      id: 4,
      question: "Name two common hazards when working at height.",
      options: [
        "Falls and dropped tools",
        "Noise and vibration",
        "Heat and cold",
        "Dust and fumes"
      ],
      correctAnswer: 0,
      explanation: "Falls from height and dropped tools striking people below are the most common and serious hazards when working at height."
    },
    {
      id: 5,
      question: "What is one key safety feature of scaffolding platforms?",
      options: [
        "Mobility",
        "Guard rails and toe boards",
        "Lightweight construction",
        "Quick assembly"
      ],
      correctAnswer: 1,
      explanation: "Guard rails and toe boards are essential safety features that prevent falls and dropped materials from scaffolding platforms."
    },
    {
      id: 6,
      question: "When should fall arrest equipment be used?",
      options: [
        "Always when working at height",
        "Only on ladders",
        "When there's a risk of falling and no physical barrier",
        "Never required"
      ],
      correctAnswer: 2,
      explanation: "Fall arrest equipment is required when there's a risk of falling and no physical barriers (like guard rails) are in place."
    },
    {
      id: 7,
      question: "Why should you avoid overreaching on a ladder?",
      options: [
        "It's uncomfortable",
        "It can cause loss of balance and falls",
        "It's inefficient",
        "It damages the ladder"
      ],
      correctAnswer: 1,
      explanation: "Overreaching shifts your centre of gravity outside the ladder's base, causing loss of balance and potential falls."
    },
    {
      id: 8,
      question: "What is the benefit of using tool lanyards?",
      options: [
        "Easier tool access",
        "Prevents tools from dropping and injuring people below",
        "Reduces tool weight",
        "Improves tool performance"
      ],
      correctAnswer: 1,
      explanation: "Tool lanyards prevent dropped tools from falling and potentially injuring people working below."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.4.7
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Working at Height Safely While Installing Systems
          </h1>
          <p className="text-white">
            Learn safe working practices for height work during electrical installations. Covers equipment selection, fall protection, and Work at Height Regulations 2005 compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-black" />
                  In 30 seconds
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Working at height is high-risk but necessary for electrical installations</li>
                  <li>• Work at Height Regulations 2005 provide legal framework</li>
                  <li>• Correct equipment selection prevents most accidents</li>
                  <li>• Falls remain leading cause of construction injuries</li>
                </ul>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  Spot it / Use it
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Risk assess before starting work</li>
                  <li>• Inspect all equipment before use</li>
                  <li>• Three points of contact on ladders</li>
                  <li>• Use tool lanyards and secure materials</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow" />
              Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-elec-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify hazards associated with working at height</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-elec-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>Select the correct access equipment for different installation tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-elec-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply safe working practices on ladders, scaffolding, and MEWPs</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-elec-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use fall protection systems effectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-elec-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>Follow legal requirements and site safety rules for working at height</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="border-l-4 border-l-elec-yellow p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-elec-yellow text-white rounded-full font-bold text-sm">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Legal and Safety Requirements</h3>
            </div>
            <div className="space-y-4">
              <p>Work at height is regulated under the <strong>Work at Height Regulations 2005</strong>, which place specific duties on employers and workers.</p>
              
              <div className="bg-[#121212]/50 p-4 rounded border">
                <h4 className="font-semibold mb-2">Key Legal Requirements:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Avoid</strong> working at height where reasonably practicable</li>
                  <li>• If unavoidable, ensure work is carried out <strong>safely</strong></li>
                  <li>• Use appropriate <strong>work equipment</strong> that is suitable</li>
                  <li>• Ensure workers are <strong>competent and trained</strong></li>
                  <li>• Plan work to ensure it can be carried out <strong>safely</strong></li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <strong>Critical Requirement</strong>
                </div>
                <p>Height work must be planned, supervised, and carried out by competent persons. Training records must be maintained and refreshed regularly.</p>
              </div>
            </div>
          </div>

          <InlineCheck 
            id="check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2 */}
          <div className="border-l-4 border-l-red-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full font-bold text-sm">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Common Hazards</h3>
            </div>
            <div className="space-y-4">
              <p>Understanding hazards is the first step in preventing accidents during electrical installation work at height.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Primary Hazards:</h4>
                  <ul className="space-y-1">
                    <li>• Falls from ladders, scaffolds, or platforms</li>
                    <li>• Dropped tools or materials striking people below</li>
                    <li>• Overreaching or leaning too far from working platform</li>
                    <li>• Slippery or unstable working surfaces</li>
                  </ul>
                </div>
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Environmental Hazards:</h4>
                  <ul className="space-y-1">
                    <li>• Contact with overhead power lines</li>
                    <li>• Poor weather conditions (wind, rain, ice)</li>
                    <li>• Inadequate lighting for height work</li>
                    <li>• Unstable ground conditions for equipment</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <strong>Statistics Alert</strong>
                </div>
                <p>Falls from height account for approximately 40% of workplace fatalities in construction. Most are preventable through proper planning and equipment use.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-l-green-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full font-bold text-sm">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Access Equipment</h3>
            </div>
            <div className="space-y-4">
              <p>Selecting the right access equipment for the task is crucial for both safety and efficiency.</p>
              
              <div className="grid gap-4">
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Step Ladders</h4>
                  <p><strong>Use for:</strong> Short-duration, light tasks up to 2.5m working height</p>
                  <p><strong>Requirements:</strong> Must be stable, positioned correctly, and not overloaded</p>
                  <p><strong>Limitations:</strong> Not suitable for prolonged work or heavy tool use</p>
                </div>
                
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Extension Ladders</h4>
                  <p><strong>Use for:</strong> Access only, not prolonged work</p>
                  <p><strong>Requirements:</strong> Secure at top and bottom, 4:1 angle ratio</p>
                  <p><strong>Limitations:</strong> No working platform, limited tool carrying capacity</p>
                </div>

                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Towers/Scaffolds</h4>
                  <p><strong>Use for:</strong> Prolonged work requiring large, stable platform</p>
                  <p><strong>Requirements:</strong> Must be erected by competent persons, guard rails fitted</p>
                  <p><strong>Benefits:</strong> Large working area, tool storage, multiple workers</p>
                </div>

                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">MEWPs (Mobile Elevating Work Platforms)</h4>
                  <p><strong>Types:</strong> Scissor lifts, boom lifts, cherry pickers</p>
                  <p><strong>Requirements:</strong> IPAF-trained operators, ground condition checks</p>
                  <p><strong>Benefits:</strong> Quick positioning, precise height control, mobility</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck 
            id="check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator />

          {/* Section 4 */}
          <div className="border-l-4 border-l-purple-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full font-bold text-sm">
                4
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Safe Working Practices</h3>
            </div>
            <div className="space-y-4">
              <p>Following established safe working practices reduces risk and ensures legal compliance.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Pre-Work Checks:</h4>
                  <ul className="space-y-1">
                    <li>• Inspect all access equipment before use</li>
                    <li>• Check weather conditions and visibility</li>
                    <li>• Verify ground conditions for stability</li>
                    <li>• Ensure competency of all personnel</li>
                    <li>• Confirm rescue arrangements in place</li>
                  </ul>
                </div>
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">During Work:</h4>
                  <ul className="space-y-1">
                    <li>• Maintain three points of contact on ladders</li>
                    <li>• Never overreach — reposition equipment instead</li>
                    <li>• Use tool lanyards to prevent dropping equipment</li>
                    <li>• Keep work areas tidy to prevent trip hazards</li>
                    <li>• Monitor weather conditions continuously</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <strong>Professional Tip</strong>
                </div>
                <p>The "belt buckle rule" helps prevent overreaching: keep your belt buckle between the ladder rails at all times. If you need to reach beyond this, reposition the ladder.</p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="border-l-4 border-l-orange-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-bold text-sm">
                5
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Fall Protection</h3>
            </div>
            <div className="space-y-4">
              <p>When edge protection cannot be provided, personal fall protection systems become essential.</p>
              
              <div className="bg-[#121212]/50 p-4 rounded border">
                <h4 className="font-semibold mb-2">Fall Protection Systems:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Work Restraint:</strong> Prevents reaching the fall edge (preferred method)</li>
                  <li>• <strong>Fall Arrest:</strong> Stops a fall after it occurs (requires rescue plan)</li>
                  <li>• <strong>Work Positioning:</strong> Supports worker in position (e.g., rope access)</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Equipment Requirements:</h4>
                  <ul className="space-y-1">
                    <li>• Full body harness (not belt)</li>
                    <li>• Energy-absorbing lanyard</li>
                    <li>• Certified anchor point (15kN minimum)</li>
                    <li>• Regular inspection and maintenance</li>
                  </ul>
                </div>
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Critical Factors:</h4>
                  <ul className="space-y-1">
                    <li>• Fall clearance calculations</li>
                    <li>• Rescue plan and equipment</li>
                    <li>• Training in system use</li>
                    <li>• Regular competency assessment</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <strong>Critical Requirement</strong>
                </div>
                <p>Fall arrest systems require sufficient clearance below the worker to prevent ground impact during arrest. Calculate fall distance including lanyard extension and harness stretch.</p>
              </div>
            </div>
          </div>

          <InlineCheck 
            id="check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 6 */}
          <div className="border-l-4 border-l-red-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full font-bold text-sm">
                6
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Common Mistakes</h3>
            </div>
            <div className="space-y-4">
              <p>Learning from common mistakes helps prevent accidents and ensures professional standards.</p>
              
              <div className="grid gap-3">
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold text-red-600 mb-2">❌ Using ladders for tasks that require a platform</h4>
                  <p>Prolonged work, heavy tools, or two-handed tasks need a stable platform, not ladder access.</p>
                </div>
                
                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold text-red-600 mb-2">❌ Standing on the top step or rung of a ladder</h4>
                  <p>This eliminates handholds and creates an unstable working position with high fall risk.</p>
                </div>

                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold text-red-600 mb-2">❌ Failing to secure tools and materials at height</h4>
                  <p>Dropped tools can cause serious injuries and expensive damage to equipment below.</p>
                </div>

                <div className="bg-[#121212]/50 p-4 rounded border">
                  <h4 className="font-semibold text-red-600 mb-2">❌ Ignoring weather conditions for outdoor height work</h4>
                  <p>Wind, rain, or poor visibility significantly increase risks and should halt height work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Practical Guidance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold mb-3">Planning and Preparation:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Always carry out a risk assessment before starting work at height</li>
                  <li>• Select the shortest and most stable access method possible for the task</li>
                  <li>• Position ladders at a 4:1 ratio (for every 4 m up, base is 1 m out)</li>
                  <li>• On scaffolding, ensure toe boards, guard rails, and safe access points are in place</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">During Installation:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• For MEWPs, check ground conditions before positioning the platform</li>
                  <li>• Use chutes or hoists to raise materials — avoid carrying heavy items up ladders</li>
                  <li>• Schedule height work for good weather and daylight where possible</li>
                  <li>• Always have a second person present when working at height for safety monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Real-World Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-card p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Warehouse Lighting Installation Incident</h4>
              <p className="mb-3">
                During a warehouse lighting installation, a worker used a ladder for a task that required both hands and heavy tools. Overreaching caused the ladder to slip, resulting in a fall and injury.
              </p>
              <p className="font-medium text-amber-800">
                <strong>Solution:</strong> A mobile scaffold tower would have been safer, providing both stability and a platform for tools. Cost: £150/day vs. £15,000 injury claim + project delays.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Q: Do I always need a harness when working at height?</h4>
              <p className="text-white">A: Not always — harnesses are required where there's a risk of falling and no physical barriers are in place.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: Can I use a ladder on uneven ground?</h4>
              <p className="text-white">A: Only with suitable stabilisers or levelling devices to ensure stability.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: What training is required for MEWP use?</h4>
              <p className="text-white">A: IPAF (International Powered Access Federation) or equivalent certification is required.</p>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Working at height safely requires planning, the correct equipment, and adherence to regulations. The right access method, combined with good practices like securing tools and avoiding overreaching, prevents accidents and ensures productivity. Remember: most height-related accidents are preventable through proper planning and equipment selection.
            </p>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link to="..">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Section 4
            </Button>
          </Link>
          <div className="text-sm text-white">
            End of Module 4.4 - Cable Installation Methods
          </div>
        </div>
      </main>
    </div>
  );
}