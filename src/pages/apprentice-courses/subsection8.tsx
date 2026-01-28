import { ArrowLeft, ArrowRight, Shield, AlertTriangle, TrendingUp, RotateCcw, Navigation, Users, AlertCircle, Activity, Zap, Settings, FileText, ClipboardList, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working at Height and Confined Spaces - Module 1.2.4 | Level 2 Electrical Course";
const DESCRIPTION = "Essential safety training for electrical work at height and in confined spaces. Work at Height Regulations 2005, Confined Spaces Regulations 1997, and safe working procedures.";

// Inline check questions for immediate feedback
const quickCheckQuestions = [
  {
    id: "height-definition-check",
    question: "Working at height is defined as:",
    options: [
      "Only work above 2 metres high",
      "Any place where a person could fall and be injured",
      "Work on roofs only",
      "Work above 3 metres only"
    ],
    correctIndex: 1,
    explanation: "The Work at Height Regulations 2005 define working at height as any place where a person could fall and be injured, regardless of the actual height."
  },
  {
    id: "confined-space-check",
    question: "A confined space must have:",
    options: [
      "High voltage equipment present",
      "Limited access/egress and potential atmospheric hazards",
      "No lighting available",
      "Temperature above 30°C"
    ],
    correctIndex: 1,
    explanation: "Confined spaces are defined by limited entry/exit points and the potential for atmospheric hazards like toxic gases or oxygen deficiency."
  },
  {
    id: "ladder-safety-check",
    question: "The correct angle for setting up a ladder is:",
    options: [
      "1 unit out for every 3 units up",
      "1 unit out for every 4 units up (75° angle)",
      "1 unit out for every 5 units up",
      "Completely vertical"
    ],
    correctIndex: 1,
    explanation: "The 1:4 rule provides the safest ladder angle - 1 unit out from the wall for every 4 units of height, creating approximately a 75° angle."
  }
];

const Section2_4 = () => {
  // Set SEO metadata
  useSEO(TITLE, DESCRIPTION);

  // Enhanced quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "According to the Work at Height Regulations 2005, the hierarchy of control for height work is:",
      options: [
        "Avoid, prevent, protect",
        "Plan, provide, train",
        "Assess, control, monitor",
        "Design, install, maintain"
      ],
      correctAnswer: 0,
      explanation: "The hierarchy is: avoid work at height if possible, prevent falls using collective protection (guardrails), then provide personal fall protection as last resort."
    },
    {
      id: 2,
      question: "For electrical work, which equipment is generally safest for extended work at moderate heights?",
      options: [
        "Step ladders",
        "Extension ladders",
        "Podium steps or scaffold towers", 
        "Trestles and boards"
      ],
      correctAnswer: 2,
      explanation: "Podium steps and scaffold towers provide stable work platforms with guardrails, allowing both hands free for work while providing fall protection."
    },
    {
      id: 3,
      question: "Before entering any confined space, the most critical first step is:",
      options: [
        "Testing the atmosphere for gases and oxygen levels",
        "Getting the right tools ready",
        "Checking the lighting",
        "Putting on protective equipment"
      ],
      correctAnswer: 0,
      explanation: "Atmospheric testing is critical before entry. Normal air contains ~21% oxygen; below 19.5% is dangerous. Toxic gases or explosive vapours may also be present."
    },
    {
      id: 4,
      question: "The Confined Spaces Regulations 1997 require that confined space entry must have:",
      options: [
        "At least two people working inside",
        "A competent standby person remaining outside",
        "Work completed within 2 hours",
        "Only electrically qualified personnel"
      ],
      correctAnswer: 1,
      explanation: "A trained standby person must remain outside to monitor the entrant, maintain communication, and coordinate rescue if needed. They must never enter to attempt rescue."
    },
    {
      id: 5,
      question: "For electrical work in confined spaces, additional risks include:",
      options: [
        "Higher risk of electric shock due to cramped conditions and potential moisture",
        "Equipment working better in enclosed spaces",
        "Reduced electrical resistance",
        "Improved cable performance"
      ],
      correctAnswer: 0,
      explanation: "Confined spaces often have higher humidity, limited movement affecting safety practices, metallic surfaces that can conduct electricity, and difficulty using safety equipment properly."
    },
    {
      id: 6,
      question: "Gas detection equipment in confined spaces should test for:",
      options: [
        "Only carbon monoxide",
        "Oxygen levels, toxic gases, and explosive atmospheres",
        "Just hydrogen sulphide",
        "Temperature only"
      ],
      correctAnswer: 1,
      explanation: "Multi-gas detectors should test for oxygen deficiency/enrichment, toxic gases (CO, H2S, etc.), and explosive gases. Calibration and bump testing are essential before use."
    },
    {
      id: 7,
      question: "When working on ladders for electrical installations, tools should be:",
      options: [
        "Carried in your hands while climbing",
        "Secured with tool lanyards or carried in proper tool bags",
        "Left on the ground until needed",
        "Thrown up to the work area"
      ],
      correctAnswer: 1,
      explanation: "Tools must be secured to prevent dropping and injury to people below. Tool lanyards, belts, or bags allow safe transport while maintaining three points of contact."
    },
    {
      id: 8,
      question: "Emergency rescue from confined spaces should:",
      options: [
        "Be attempted immediately by co-workers",
        "Only be carried out by trained rescue teams with proper equipment",
        "Wait for the emergency services",
        "Be done by the standby person entering the space"
      ],
      correctAnswer: 1,
      explanation: "Confined space rescue requires specialised training and equipment. Untrained rescuers often become additional casualties. Have emergency services contact details and site access arrangements ready."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "Do I need special training to work in confined spaces?",
      answer: "Yes. The Confined Spaces Regulations require adequate training for all personnel involved. This covers hazard recognition, safe entry procedures, emergency arrangements, and equipment use."
    },
    {
      question: "How often should I check gas detection equipment?",
      answer: "Daily bump tests and regular calibration according to manufacturer instructions. Equipment should be tested with known gas concentrations before each use and calibrated monthly or as specified."
    },
    {
      question: "Can I work alone at height for quick electrical jobs?",
      answer: "No. Even for short duration work, inform someone of your location, expected duration, and have check-in procedures. Consider if the work could be done from ground level instead."
    },
    {
      question: "What personal protective equipment do I need for height work?",
      answer: "Depends on the work and height. May include safety harness, hard hat, non-slip footwear, and appropriate clothing. Equipment must be suitable for electrical work (insulated where necessary)."
    },
    {
      question: "Who can authorize confined space entry?",
      answer: "A competent person who understands the hazards and control measures. They issue permits-to-work, ensure safe entry conditions, and coordinate emergency arrangements."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
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
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 2.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Working at Height and Confined Spaces
          </h1>
          <p className="text-white/80">
            Essential safety requirements and procedures for electrical work at height and in confined spaces. Work at Height Regulations 2005 and Confined Spaces Regulations 1997.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Falls and atmospheric hazards are leading causes of construction fatalities.</li>
                <li>Work at Height Regulations 2005: avoid, prevent, protect hierarchy.</li>
                <li>Confined Spaces Regulations 1997 require atmospheric testing and standby personnel.</li>
                <li>Electrical work creates additional risks requiring specialised procedures and equipment.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Fall hazards, ladder defects, atmospheric risks, confined space entry points.</li>
                <li><strong>Use:</strong> Height hierarchy, 3-point contact, gas detection, permit-to-work systems.</li>
                <li><strong>Check:</strong> Equipment inspections, rescue procedures, communication systems, emergency contacts.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Define working at height under Work at Height Regulations 2005 and apply the hierarchy of controls.</li>
            <li>Select appropriate access equipment and implement safe ladder and scaffold procedures.</li>
            <li>Identify confined spaces under Confined Spaces Regulations 1997 and understand atmospheric hazards.</li>
            <li>Conduct atmospheric testing, implement permit-to-work systems, and establish standby procedures.</li>
            <li>Understand emergency rescue procedures and communication requirements.</li>
            <li>Apply electrical safety considerations specific to height work and confined space environments.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Height Work Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Working at Height Regulations and Hierarchy</h3>
            <p className="text-base text-foreground mb-4">
              The Work at Height Regulations 2005 define working at height as work in any place where a person could fall and be injured:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Height Work Hierarchy</p>
                    <p className="text-base text-foreground mb-2"><strong>1. Avoid:</strong> Can the work be done from ground level? Use extension poles or design changes.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>2. Prevent:</strong> Use collective protection - platforms with guardrails, scaffolding, MEWPs</li>
                      <li><strong>3. Protect:</strong> Personal fall protection - harnesses, nets as last resort</li>
                      <li><strong>Common electrical height work:</strong> Ceiling lighting, cable runs, external installations</li>
                      <li><strong>Access equipment:</strong> Podium steps, scaffold towers, mobile platforms</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Ladder safety:</strong> 1:4 angle rule, 3 points of contact, pre-use inspection.</p>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Regulation requirement:</strong> Avoid work at height where possible, prevent falls with collective protection
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="height-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* Confined Spaces Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Confined Spaces - Definition and Hazards</h3>
            <p className="text-base text-foreground mb-4">
              Under the Confined Spaces Regulations 1997, a confined space has serious risk of injury from hazardous substances or conditions:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Confined Space Characteristics</p>
                    <p className="text-base text-foreground mb-2"><strong>Limited access:</strong> Restricted entry/exit making escape difficult in emergency.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Atmospheric hazards:</strong> Oxygen deficiency (&lt;19.5%), toxic gases, explosive atmospheres</li>
                      <li><strong>Common spaces:</strong> Cable trenches, floor voids, plant rooms, manholes, service tunnels</li>
                      <li><strong>Physical hazards:</strong> Engulfment, entrapment, drowning risks</li>
                      <li><strong>Electrical risks:</strong> Higher humidity, cramped conditions, metallic surfaces</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Critical gases:</strong> CO, H₂S, methane, oxygen enrichment (&gt;23%).</p>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Regulation requirement:</strong> Atmospheric testing, permit-to-work, standby person, emergency procedures
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="confined-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* Safety Procedures Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Safety Procedures and Equipment</h3>
            <p className="text-base text-foreground mb-4">
              Safe working requires systematic procedures, proper equipment, and trained personnel for both environments:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Essential Safety Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>Pre-work assessment:</strong> Risk assessment, permit-to-work, atmospheric testing.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Height work:</strong> Equipment inspection, area protection, weather conditions, PPE</li>
                      <li><strong>Confined spaces:</strong> Gas detection, ventilation, standby person, communication</li>
                      <li><strong>Emergency procedures:</strong> Rescue plans, emergency contacts, equipment ready</li>
                      <li><strong>Electrical considerations:</strong> IP ratings, tool selection, additional earthing</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Never work alone:</strong> Communication essential, inform others of location and duration.</p>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Proper planning, equipment, and procedures prevent most incidents
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

        </Card>

        {/* Real World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real world scenario</h2>
          <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border-l-4 border-elec-yellow rounded-lg p-4">
            <h4 className="text-blue-700 dark:text-elec-yellow font-semibold mb-2">Shopping Centre Installation</h4>
            <p className="text-blue-700 dark:text-elec-yellow mb-4">
              Installing new lighting and power systems in a shopping centre involved both height work (4-metre atrium) and confined space entry (floor voids). Multiple safety challenges required coordinated solutions including scaffold towers, atmospheric testing, and standby personnel.
            </p>
            <p className="text-blue-700 dark:text-elec-yellow">
              <strong>Key lessons:</strong> Planning prevents incidents, proper equipment selection improves safety and efficiency, night work requires enhanced measures, multi-trade coordination essential.
            </p>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                <h4 className="text-foreground font-semibold mb-2">{faq.question}</h4>
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-4 text-foreground">
            <p className="text-lg font-semibold">
              Key Takeaways - Working at Height and Confined Spaces:
            </p>
            <ul className="space-y-2">
              <li>• Work at Height Regulations apply to any place where injury from falling could occur</li>
              <li>• Use hierarchy: avoid, prevent (collective protection), protect (personal protection)</li>
              <li>• Ladders should only be used for short-duration work with proper safety measures</li>
              <li>• Confined spaces require atmospheric testing, permits-to-work, and standby personnel</li>
              <li>• Gas detection equipment must be calibrated and properly maintained</li>
              <li>• Emergency rescue procedures must be established before entry</li>
              <li>• Never work alone in either environment - communication is essential</li>
            </ul>
            <p className="text-elec-yellow dark:text-elec-yellow font-semibold">
              Remember: Both environments require careful planning, proper equipment, and trained personnel. No job is worth rushing into without proper safety measures.
            </p>
          </div>
        </Card>

        {/* Do's and Don'ts for Apprentices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Do's and don'ts for apprentices</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="text-green-700 dark:text-green-300 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                DO
              </h4>
              <ul className="space-y-2 text-green-700 dark:text-green-300">
                <li>• Always use proper access equipment - never improvise</li>
                <li>• Check equipment before use and report any defects</li>
                <li>• Maintain three points of contact on ladders</li>
                <li>• Test atmospheres before entering confined spaces</li>
                <li>• Ensure standby person is present for confined space work</li>
                <li>• Use proper PPE and follow permit-to-work procedures</li>
                <li>• Report unsafe conditions immediately</li>
              </ul>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="text-red-700 dark:text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                DON'T
              </h4>
              <ul className="space-y-2 text-red-700 dark:text-elec-yellow">
                <li>• Use chairs, boxes, or makeshift platforms</li>
                <li>• Overreach or lean excessively from ladders</li>
                <li>• Enter confined spaces without proper assessment</li>
                <li>• Work alone at height or in confined spaces</li>
                <li>• Ignore gas detection alarms or warning signs</li>
                <li>• Rush jobs that require proper safety procedures</li>
                <li>• Enter spaces to attempt rescue without proper equipment</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Reference Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick reference pocket card</h2>
          <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="text-blue-700 dark:text-elec-yellow font-semibold mb-3">Height Work & Confined Space Checklist</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="text-foreground font-semibold mb-2">Height Work Checklist:</h5>
                <ul className="text-white/80 space-y-1">
                  <li>□ Risk assessment completed</li>
                  <li>□ Appropriate access equipment selected</li>
                  <li>□ Equipment inspected and safe</li>
                  <li>□ Area below protected/cordoned off</li>
                  <li>□ Weather conditions suitable</li>
                  <li>□ Emergency procedures in place</li>
                </ul>
              </div>
              <div>
                <h5 className="text-foreground font-semibold mb-2">Confined Space Checklist:</h5>
                <ul className="text-white/80 space-y-1">
                  <li>□ Permit-to-work obtained</li>
                  <li>□ Atmosphere tested (O₂, toxic, explosive)</li>
                  <li>□ Ventilation provided where possible</li>
                  <li>□ Trained standby person assigned</li>
                  <li>□ Communication method established</li>
                  <li>□ Emergency rescue procedures ready</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button asChild variant="outline" className="flex-1">
            <Link to="../subsection7" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Fire Hazards and Explosive Environments
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to=".." className="flex items-center gap-2">
              Back to Section 2 Overview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge - Working at Height and Confined Spaces" 
          questions={quizQuestions} 
        />
      </main>
    </div>
  );
};

export default Section2_4;