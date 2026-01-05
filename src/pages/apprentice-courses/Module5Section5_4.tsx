import { ArrowLeft, ArrowRight, AlertTriangle, Target, CheckCircle, Shield, Users, BookOpen, Clipboard, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Avoiding Installation Conflicts - Module 5.5.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to prevent and resolve installation conflicts between trades. Essential for efficient electrical installation and avoiding costly rework on site.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is an installation conflict?",
    options: ["A disagreement between workers", "When two trades try to install equipment in the same space", "A faulty component", "A scheduling delay"],
    correctIndex: 1,
    explanation: "Installation conflicts occur when two trades try to install equipment in the same space, such as trunking where pipework is planned."
  },
  {
    id: 2,
    question: "Name two common areas where conflicts occur.",
    options: ["Basement and roof only", "Ceiling voids and service risers", "Car park and entrance", "Kitchen and bathroom only"],
    correctIndex: 1,
    explanation: "Ceiling voids and service risers are common conflict areas where multiple trades compete for limited space."
  },
  {
    id: 3,
    question: "What should you do if you spot a clash on site?",
    options: ["Continue working and ignore it", "Move another trade's work", "Report it to your supervisor immediately", "Complete your work first"],
    correctIndex: 2,
    explanation: "You should report potential clashes immediately to your supervisor - never ignore them or move another trade's installation."
  }
];

const Module5Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is an installation conflict?",
      options: [
        "A disagreement between workers",
        "When two trades try to install in the same space",
        "A faulty electrical component",
        "A delay in material delivery"
      ],
      correctAnswer: 1,
      explanation: "Installation conflicts occur when two trades try to install equipment in the same space, causing delays, damage, and unsafe conditions."
    },
    {
      id: 2,
      question: "Name two common areas where conflicts occur.",
      options: [
        "Offices and meeting rooms",
        "Ceiling voids and service risers",
        "Car parks and driveways",
        "Canteens and rest areas"
      ],
      correctAnswer: 1,
      explanation: "Ceiling voids and service risers are common conflict areas where ducts, trunking, lighting, sprinkler pipes and other services compete for space."
    },
    {
      id: 3,
      question: "True or False: You can move another trade's work if it blocks your run.",
      options: [
        "True - if it's in your way",
        "False",
        "True - but only with permission",
        "True - if it's not finished"
      ],
      correctAnswer: 1,
      explanation: "False - you must never cut or move another trade's installation. Report clashes to your supervisor instead."
    },
    {
      id: 4,
      question: "What is the best way to prevent conflicts before installation?",
      options: [
        "Work faster than other trades",
        "Check and follow coordinated site drawings",
        "Install during night shifts",
        "Use smaller equipment"
      ],
      correctAnswer: 1,
      explanation: "Checking and following coordinated site drawings before installation is the best way to prevent conflicts."
    },
    {
      id: 5,
      question: "Why is it important not to block access panels?",
      options: [
        "They look untidy",
        "Because maintenance and safety access must be preserved",
        "They are expensive to replace",
        "Only for aesthetic reasons"
      ],
      correctAnswer: 1,
      explanation: "Access panels must never be blocked because maintenance and safety access to systems must always be preserved."
    },
    {
      id: 6,
      question: "Who is responsible for deciding service routing on site?",
      options: [
        "The electrician",
        "The site manager or coordinator",
        "The first trade to arrive",
        "The client"
      ],
      correctAnswer: 1,
      explanation: "The site manager or coordinator decides service routing using coordination drawings and site rules."
    },
    {
      id: 7,
      question: "What should you do if you spot a clash on site?",
      options: [
        "Try to fix it yourself",
        "Report it to your supervisor immediately",
        "Ignore it and continue working",
        "Wait until the end of the day"
      ],
      correctAnswer: 1,
      explanation: "Report potential clashes immediately to your supervisor - early detection prevents costly rework."
    },
    {
      id: 8,
      question: "In risers and ceilings, how should you install services?",
      options: [
        "Wherever there's space",
        "Neatly in line with agreed grid systems",
        "As close to walls as possible",
        "In the centre only"
      ],
      correctAnswer: 1,
      explanation: "Services should be installed neatly in line with agreed grid systems to maintain organisation and accessibility."
    },
    {
      id: 9,
      question: "Give one example of a common conflict between electrical and plumbing.",
      options: [
        "Different working hours",
        "Trunking running where pipework is installed",
        "Using different suppliers",
        "Different safety equipment"
      ],
      correctAnswer: 1,
      explanation: "A common conflict is trunking being installed where pipework needs to go, or vice versa, requiring costly rework."
    },
    {
      id: 10,
      question: "True or False: Taking the easiest route is always acceptable.",
      options: [
        "True - efficiency is important",
        "False",
        "True - if time is short",
        "True - if approved by supervisor"
      ],
      correctAnswer: 1,
      explanation: "False - you should never take the easiest route without checking plans. This often leads to conflicts with other trades."
    }
  ];

  const faqs = [
    {
      question: "Can electricians fix trunking first in a ceiling void?",
      answer: "Only if agreed in the programme. Some trades may need priority access, and the installation sequence must be coordinated to prevent conflicts and ensure all trades can complete their work safely and efficiently."
    },
    {
      question: "Who decides where each trade routes their services?",
      answer: "The site manager or coordinator decides service routing using coordination drawings. These drawings show the agreed positions for all services and must be followed to prevent conflicts."
    },
    {
      question: "What should you do if your run blocks access to another trade's system?",
      answer: "Stop and re-route immediately. Access must always be maintained for safety, maintenance, and operational purposes. Never compromise accessibility for convenience."
    },
    {
      question: "What information should coordination drawings show?",
      answer: "Coordination drawings should show the positions of all services including electrical trunking, conduit, plumbing, HVAC ducts, structural elements, and access requirements for each system."
    },
    {
      question: "How can colour coding help prevent conflicts?",
      answer: "Colour coding helps identify different services quickly and shows which trade is responsible for each installation. This visual system helps prevent accidental interference and improves site organisation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <AlertTriangle className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.5.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Avoiding Installation Conflicts (e.g., trunking vs pipework)
          </h1>
          <p className="text-muted-foreground">
            Learning how to prevent and resolve conflicts between trades to save time, money, and frustration on site.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Installation conflicts occur when trades compete for the same space.</li>
                <li>Common areas include ceiling voids, service risers, and plant rooms.</li>
                <li>Prevention through coordination drawings saves costly rework.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Space constraints, multiple services, tight areas.</li>
                <li><strong>Use:</strong> Check drawings, mark routes, communicate with trades.</li>
                <li><strong>Check:</strong> Access maintained, sequencing followed, conflicts reported.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise common installation conflicts between trades.</li>
            <li>Read and interpret drawings to spot potential clashes early.</li>
            <li>Use best practices to route electrical systems efficiently.</li>
            <li>Communicate with other trades to resolve conflicts quickly.</li>
            <li>Work to agreed site rules for space allocation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* What Are Installation Conflicts */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">What Are Installation Conflicts?</h3>
            <p className="text-base text-foreground mb-4">
              Installation conflicts occur when multiple trades attempt to use the same space, leading to costly delays and safety hazards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Definition and Impact</p>
                    <p className="text-base text-foreground mb-2"><strong>Space conflicts:</strong> When two trades try to install equipment in the same space.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Trunking planned where pipework needs to be installed</li>
                      <li>Cable trays interfering with ductwork routes</li>
                      <li>Equipment blocking access to other services</li>
                      <li>Multiple trades working in confined areas simultaneously</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Consequences:</strong> Can cause costly delays, damage, and unsafe working conditions.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Expensive rework and material waste</li>
                      <li>Project delays affecting all trades</li>
                      <li>Increased safety risks from crowded work areas</li>
                      <li>Potential damage to completed installations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Prevention through planning is always cheaper than correction after installation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflicts-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Common Conflict Areas */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Common Conflict Areas</h3>
            <p className="text-base text-foreground mb-4">
              Understanding where conflicts typically occur helps in planning and prevention:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">High-Risk Conflict Zones</p>
                    <p className="text-base text-foreground mb-2"><strong>Ceiling voids:</strong> Limited height with multiple services competing for space.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Ducts, trunking, lighting, and sprinkler pipes all require routing</li>
                      <li>Restricted access makes coordination critical</li>
                      <li>Weight loading considerations for ceiling structures</li>
                      <li>Fire compartment integrity must be maintained</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Service risers:</strong> Vertical shafts with limited cross-sectional area.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Multiple services fighting for limited vertical space</li>
                      <li>Access requirements for maintenance and future modifications</li>
                      <li>Fire stopping and compartmentation requirements</li>
                      <li>Different floor levels requiring careful coordination</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Plant rooms:</strong> Concentrated equipment with complex service requirements.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Electrical, plumbing, and HVAC equipment in close proximity</li>
                      <li>Multiple connection points and control systems</li>
                      <li>Maintenance access essential for all equipment</li>
                      <li>Safety clearances required around electrical equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Surface runs:</strong> Wall-mounted services competing for available wall space.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Trunking and conduit competing with pipework on walls</li>
                      <li>Height restrictions and accessibility requirements</li>
                      <li>Architectural and aesthetic considerations</li>
                      <li>Structural fixings and wall loading limits</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Planning tip:</strong> Identify these high-risk areas early and ensure detailed coordination drawings are available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflict-areas-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Preventing Conflicts */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Preventing Conflicts</h3>
            <p className="text-base text-foreground mb-4">
              Proactive measures to prevent conflicts before they occur:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Prevention Strategies</p>
                    <p className="text-base text-foreground mb-2"><strong>Check coordinated drawings:</strong> Follow coordinated site drawings before installation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Review all trade drawings for potential clashes</li>
                      <li>Understand the installation sequence and priorities</li>
                      <li>Identify critical dimensions and clearances</li>
                      <li>Note any special requirements or restrictions</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Clear marking and labelling:</strong> Use colour coding and clear labelling on runs.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Mark proposed routes before drilling or fixing</li>
                      <li>Use temporary markers to show intended installation paths</li>
                      <li>Label existing services clearly to prevent accidental damage</li>
                      <li>Coordinate marking systems with other trades</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Space management:</strong> Leave space for expansion and maintenance.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Allow adequate clearances around all equipment</li>
                      <li>Consider future modifications and additions</li>
                      <li>Maintain access for routine maintenance</li>
                      <li>Respect safety zones around electrical equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Route planning:</strong> Avoid taking the easiest route without checking plans.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Follow designated routes shown on drawings</li>
                      <li>Consider the impact on other trades</li>
                      <li>Use proper bends and fittings rather than forcing straight runs</li>
                      <li>Maintain neat and organised installations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Best practice:</strong> Always plan your route and check for conflicts before starting any installation work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Resolving Issues */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Resolving Issues</h3>
            <p className="text-base text-foreground mb-4">
              When conflicts arise, prompt and proper resolution is essential:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Conflict Resolution Process</p>
                    <p className="text-base text-foreground mb-2"><strong>Immediate reporting:</strong> Report potential clashes immediately to your supervisor.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Stop work in the affected area immediately</li>
                      <li>Document the conflict with photos and measurements</li>
                      <li>Notify all affected trades through proper channels</li>
                      <li>Wait for official resolution before proceeding</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Respect other trades:</strong> Don't cut or move another trade's installation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Never modify or remove another trade's work</li>
                      <li>Avoid temporary relocation without permission</li>
                      <li>Respect the quality and safety of other installations</li>
                      <li>Maintain professional working relationships</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Sequencing discussions:</strong> Discuss sequencing with site management.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Determine which trade should install first</li>
                      <li>Agree on modified routes or methods</li>
                      <li>Update drawings and documentation as required</li>
                      <li>Communicate changes to all affected parties</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Remember:</strong> Professional conflict resolution protects relationships and project success
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflict-resolution-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Practical Guidance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Practical Guidance</h3>
            <p className="text-base text-foreground mb-4">
              Practical steps for avoiding conflicts and maintaining professional installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Installation Best Practices</p>
                    <p className="text-base text-foreground mb-2"><strong>Route marking:</strong> Always mark out proposed routes before drilling or fixing.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Use chalk lines or temporary markers for long runs</li>
                      <li>Check for hidden services with detection equipment</li>
                      <li>Verify positions against coordinated drawings</li>
                      <li>Consider the impact on other trades' work</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Smart routing:</strong> Use bends and risers to avoid obstacles.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Don't force straight lines through obstacles</li>
                      <li>Use proper fittings and supports for direction changes</li>
                      <li>Maintain minimum bend radii for cables</li>
                      <li>Plan routes that accommodate future modifications</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Grid compliance:</strong> Install neatly in line with agreed grid systems.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Follow ceiling grid lines and structural members</li>
                      <li>Maintain consistent heights and spacing</li>
                      <li>Coordinate with architectural and structural elements</li>
                      <li>Ensure neat and professional appearance</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Accessibility:</strong> Keep access panels, valves, and junction boxes clear.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Never block access to safety equipment</li>
                      <li>Maintain clearances around control panels</li>
                      <li>Consider maintenance requirements in route planning</li>
                      <li>Respect building services access requirements</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional standard:</strong> A well-planned installation prevents conflicts and demonstrates professional competence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-card border-emerald-500/30">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-emerald-400 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Real-World Example</h2>
              <div className="text-base text-foreground space-y-3">
                <p>
                  <strong>The Costly Riser Conflict:</strong> On a commercial project, electricians ran trunking across a service riser before the sprinkler fitters had installed their pipework. When the sprinkler team arrived, they found their route completely blocked.
                </p>
                <p>
                  <strong>Impact:</strong> The trunking had to be completely ripped out and reinstalled at a higher level. This cost the project:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Three days of additional labour costs</li>
                  <li>Wasted materials and disposal costs</li>
                  <li>Delay to the sprinkler installation</li>
                  <li>Knock-on delays to other trades</li>
                  <li>Damaged relationships between trades</li>
                </ul>
                <p>
                  <strong>Prevention:</strong> A simple check of the coordination drawings would have shown the sprinkler route and prevented this costly conflict entirely.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/20">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-card border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Clipboard className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Pocket Guide</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <p className="font-medium text-foreground text-base">Prevention Checklist:</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground">
                <li>Check and follow coordinated site drawings before installation</li>
                <li>Mark out proposed routes before drilling or fixing</li>
                <li>Never block access panels, valves, or safety equipment</li>
                <li>Report clashes immediately to supervisors</li>
                <li>Use colour coding and clear labelling on runs</li>
                <li>Leave space for expansion and maintenance access</li>
                <li>Coordinate with other trades on shared penetrations</li>
                <li>Document any variations with photos and measurements</li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-medium text-foreground text-base">Installation Standards:</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground">
                <li>Use cable tray/trunking bends and risers to avoid obstacles</li>
                <li>Respect agreed sequencing of trades and work programmes</li>
                <li>Install neatly in line with agreed grid systems</li>
                <li>Maintain proper separation from hot water pipes and heating</li>
                <li>Ensure accessibility for maintenance and future modifications</li>
                <li>Follow BS 7671 requirements for cable routing and separation</li>
                <li>Use appropriate fixings and support systems</li>
                <li>Keep installation records up to date</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-card rounded-lg border border-emerald-500/30">
            <p className="text-sm font-medium text-emerald-400 mb-1">Quick Reference:</p>
            <p className="text-xs text-foreground">Always check → Mark out → Coordinate → Install → Document</p>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-8 p-6 bg-card border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recap</h2>
          </div>
          <div className="space-y-4">
            <p className="text-base text-foreground">
              You've learned what installation conflicts are, where they occur, and how to avoid them. By checking drawings, 
              following site rules, and working with other trades, you can prevent costly rework and ensure a professional 
              installation that meets all requirements and maintains excellent working relationships.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Key Skills Developed:</p>
                <ul className="list-disc pl-5 space-y-1 text-foreground">
                  <li>Identifying potential conflict zones and high-risk areas</li>
                  <li>Reading and interpreting coordination drawings effectively</li>
                  <li>Implementing proper marking and communication systems</li>
                  <li>Understanding trade sequencing and coordination principles</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Professional Benefits:</p>
                <ul className="list-disc pl-5 space-y-1 text-foreground">
                  <li>Reduced project delays and rework costs</li>
                  <li>Improved relationships with other trades</li>
                  <li>Enhanced reputation for professional competence</li>
                  <li>Better site safety through organised coordination</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-card rounded-lg border border-emerald-400/20">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Remember: Effective coordination isn't just about avoiding problems – it's about creating a professional 
                working environment where all trades can deliver quality installations efficiently and safely.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Coordinating with Other Trades
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Back to Section 5
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section5_4;