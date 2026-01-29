import { ArrowLeft, ArrowRight, Shield, AlertTriangle, TrendingUp, RotateCcw, Flame, Users, AlertCircle, Thermometer, Volume2, Activity, Zap, Settings, FileText, ClipboardList, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fire Hazards and Explosive Environments - Module 1.2.3 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding electrical fire hazards, ATEX zones, and explosion prevention. BS 7671 fire safety requirements, DSEAR regulations, and prevention strategies for electrical workers.";

// Inline check questions for immediate feedback
const quickCheckQuestions = [
  {
    id: "fire-causes-check",
    question: "Which of these is the most common electrical cause of fire?",
    options: [
      "Properly sized cables",
      "Overheating due to overload or poor connections", 
      "Using RCD protection",
      "LED lighting installations"
    ],
    correctIndex: 1,
    explanation: "Overheating cables and connections due to overload, poor installation, or loose terminals are the leading electrical causes of fire."
  },
  {
    id: "atex-zones-check", 
    question: "ATEX zones are classified based on:",
    options: [
      "Voltage levels in the area",
      "The frequency and duration of explosive atmosphere presence",
      "The number of electrical installations", 
      "The type of building construction"
    ],
    correctIndex: 1,
    explanation: "ATEX zones classify areas by how often and for how long explosive atmospheres are likely to be present - from Zone 0 (continuous) to Zone 2 (occasional)."
  },
  {
    id: "prevention-check",
    question: "The most effective fire prevention measure is:",
    options: [
      "Installing smoke detectors only",
      "Proper design, installation, and maintenance",
      "Using only expensive equipment",
      "Working faster to reduce exposure time"
    ],
    correctIndex: 1,
    explanation: "Proper design, correct installation techniques, and regular maintenance are the most effective ways to prevent electrical fires."
  }
];

const Section2_3 = () => {
  // Set SEO metadata
  useSEO(TITLE, DESCRIPTION);

  // Enhanced quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What are the three elements needed for an electrical fire to occur?",
      options: [
        "Heat source, fuel, and oxygen (fire triangle)",
        "Voltage, current, and resistance",
        "Phase, neutral, and earth",
        "Overload, short circuit, and earth fault"
      ],
      correctAnswer: 0,
      explanation: "The fire triangle requires heat (electrical fault/overheating), fuel (cables, insulation, surrounding materials), and oxygen. Removing any element prevents or extinguishes fire."
    },
    {
      id: 2,
      question: "Which BS 7671 regulation specifically addresses fire safety in electrical installations?",
      options: [
        "Part 4 - Protection for safety",
        "Part 5 - Selection and erection of equipment", 
        "Part 7 - Special installations or locations",
        "Part 1 - Scope, object and fundamental principles"
      ],
      correctAnswer: 0,
      explanation: "BS 7671 Part 4 covers protection against thermal effects (Chapter 42) and protection against fire caused by electrical equipment (Chapter 42). Part 5 addresses cable selection for fire performance."
    },
    {
      id: 3,
      question: "In ATEX Zone 1 environments, electrical equipment must be:",
      options: [
        "Standard IP65 rated equipment",
        "Certified Ex e (increased safety) or equivalent",
        "Just dust-tight enclosures",
        "Normal industrial equipment"
      ],
      correctAnswer: 1,
      explanation: "Zone 1 requires certified explosion-protected equipment like Ex e (increased safety), Ex d (flameproof), or Ex ia (intrinsically safe) to prevent ignition of explosive atmospheres."
    },
    {
      id: 4,
      question: "Arc Fault Detection Devices (AFDDs) are primarily designed to detect:",
      options: [
        "Earth leakage currents only",
        "Overload conditions in circuits", 
        "Series and parallel arcing faults that may cause fires",
        "Voltage fluctuations in the supply"
      ],
      correctAnswer: 2,
      explanation: "AFDDs detect dangerous arcing that traditional MCBs and RCDs cannot identify. They're particularly important in circuits supplying socket outlets and final circuits in buildings."
    },
    {
      id: 5,
      question: "When working in areas with flammable atmospheres, the main ignition risks from electrical work include:",
      options: [
        "Only high voltage equipment",
        "Sparking from switches, loose connections, and hot surfaces",
        "LED lighting installations only",
        "Earthing systems"
      ],
      correctAnswer: 1,
      explanation: "Even low voltage electrical work can create sparks from switches, contactors, loose connections, and hot surfaces that can ignite explosive atmospheres. Special precautions and certified equipment are required."
    },
    {
      id: 6,
      question: "According to DSEAR regulations, who is responsible for ATEX zone classification?",
      options: [
        "The electrical contractor only",
        "The building occupier/employer",
        "The equipment manufacturer",
        "Local fire service"
      ],
      correctAnswer: 1,
      explanation: "Under DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002), the employer/building occupier must assess and classify ATEX zones, though they may use specialist consultants."
    },
    {
      id: 7,
      question: "Fire-resistant cables are required in escape routes primarily because they:",
      options: [
        "Are cheaper than standard cables",
        "Maintain circuit integrity during fire for safety systems",
        "Look better in commercial installations",
        "Have lower electrical resistance"
      ],
      correctAnswer: 1,
      explanation: "Fire-resistant cables (like FP200) maintain circuit integrity for specified periods during fire, ensuring emergency lighting, alarm systems, and smoke extraction continue operating for safe evacuation."
    },
    {
      id: 8,
      question: "The most dangerous type of electrical fire in terms of toxic gas production comes from:",
      options: [
        "Copper cable cores burning",
        "PVC cable insulation and sheathing",
        "Steel cable armour", 
        "Aluminium conductors"
      ],
      correctAnswer: 1,
      explanation: "PVC insulation produces toxic hydrogen chloride gas when burning. LSZH (Low Smoke Zero Halogen) cables are required in areas where people may be trapped, as they produce less toxic fumes."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I know if I'm working in an ATEX zone?",
      answer: "ATEX zones should be clearly marked with warning signs. The site should have DSEAR assessments available. If in doubt, ask the site supervisor or check the permit-to-work system before starting electrical work."
    },
    {
      question: "Can I use normal electrical tools in explosive atmospheres?",
      answer: "No. Tools must be certified for the specific ATEX zone (Ex-rated). Even simple tools like torches or multimeters need appropriate certification. Check equipment markings and certificates before use."
    },
    {
      question: "What should I do if I smell burning during electrical work?",
      answer: "Stop work immediately, switch off power if safe to do so, evacuate the area, and call the fire service. Don't investigate the source yourself - electrical fires can develop rapidly and produce toxic fumes."
    },
    {
      question: "How often should fire safety equipment be tested?",
      answer: "Fire alarms should be tested weekly, emergency lighting monthly, and fire extinguishers annually by competent persons. Portable equipment should be included in regular PAT testing schedules."
    },
    {
      question: "Are AFDDs mandatory in all new installations?",
      answer: "From September 2022, AFDDs are required in new domestic installations for socket outlet circuits and circuits supplying equipment outside the home. Check current BS 7671 requirements for specific applications."
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
              Section 2.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Fire Hazards and Explosive Environments
          </h1>
          <p className="text-white/80">
            Understanding electrical fire hazards, ATEX zones, and explosion prevention. BS 7671 fire safety requirements and DSEAR regulations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electrical fires and explosions cause devastating damage and loss of life each year.</li>
                <li>Fire triangle requires heat, fuel, and oxygen - electrical faults provide dangerous heat sources.</li>
                <li>ATEX zones classify explosive atmospheres requiring special equipment and procedures.</li>
                <li>BS 7671 and DSEAR regulations provide specific fire safety and explosion prevention requirements.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Burning smells, hot surfaces, sparking equipment, ATEX zone markings.</li>
                <li><strong>Use:</strong> Fire triangle principles, Ex-rated equipment, gas detection, emergency procedures.</li>
                <li><strong>Check:</strong> AFDD requirements, cable fire performance, ventilation systems, escape routes.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand the fire triangle and electrical ignition sources in installations.</li>
            <li>Identify fire risk indicators and early warning signs in electrical systems.</li>
            <li>Apply BS 7671 fire prevention measures and AFDD requirements.</li>
            <li>Recognise ATEX zones and explosive atmosphere hazards.</li>
            <li>Select appropriate Ex-rated equipment for hazardous areas.</li>
            <li>Implement explosion prevention strategies and emergency procedures.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Fire Triangle Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Understanding the Fire Triangle</h3>
            <p className="text-base text-foreground mb-4">
              For fire to occur, three elements must be present simultaneously - this is known as the fire triangle:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Fire Triangle Elements</p>
                    <p className="text-base text-foreground mb-2"><strong>Heat source:</strong> Electrical faults, overheating, arcing, sparking.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Overloaded cables:</strong> Carrying more current than design capacity</li>
                      <li><strong>Loose connections:</strong> Creating high resistance and heat generation</li>
                      <li><strong>Arcing faults:</strong> Electrical discharge between conductors or to earth</li>
                      <li><strong>Short circuits:</strong> Direct connection between phase and neutral/earth</li>
                      <li><strong>Equipment failure:</strong> Internal faults in electrical equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Fuel:</strong> Cable insulation, wood, paper, furnishings, flammable gases.</p>
                    <p className="text-base text-foreground mb-2"><strong>Oxygen:</strong> Air supply (approximately 21% oxygen) - removing any element prevents fire.</p>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> Protection against thermal effects and fire caused by electrical equipment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fire-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* ATEX Zones Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">ATEX Zones and Explosive Atmospheres</h3>
            <p className="text-base text-foreground mb-4">
              ATEX zones classify areas where explosive atmospheres may occur, requiring specific equipment and procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">ATEX Zone Classification</p>
                    <p className="text-base text-foreground mb-2"><strong>Zone classification:</strong> Based on frequency and duration of explosive atmosphere presence.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Zone 0:</strong> Explosive atmosphere present continuously or for long periods</li>
                      <li><strong>Zone 1:</strong> Explosive atmosphere likely during normal operation</li>
                      <li><strong>Zone 2:</strong> Explosive atmosphere unlikely, brief if it occurs</li>
                      <li><strong>Zone 20/21/22:</strong> Dust environments with similar frequency classifications</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Common ATEX environments:</strong> Petrol stations, paint booths, chemical plants, grain stores.</p>
                    <p className="text-base text-foreground mb-2"><strong>Equipment requirements:</strong> Ex-rated electrical equipment certified for the specific zone.</p>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>DSEAR requirement:</strong> Employer must assess and classify ATEX zones before electrical work begins
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="atex-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* Prevention Strategies Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Fire Prevention and Detection Strategies</h3>
            <p className="text-base text-foreground mb-4">
              Prevention through proper design, installation, and maintenance is the most effective fire safety strategy:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Fire Prevention Measures</p>
                    <p className="text-base text-foreground mb-2"><strong>Design stage:</strong> Correct cable sizing, protective device selection, AFDD installation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Cable calculations:</strong> Consider current-carrying capacity, voltage drop, thermal constraints</li>
                      <li><strong>Protective devices:</strong> Correct rating and breaking capacity for fault conditions</li>
                      <li><strong>Terminations:</strong> Proper techniques with correct torque settings</li>
                      <li><strong>AFDDs:</strong> Required in specific locations per BS 7671</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Installation:</strong> Quality workmanship, adequate ventilation, proper routing.</p>
                    <p className="text-base text-foreground mb-2"><strong>Maintenance:</strong> Regular inspections, thermal imaging, PAT testing, cleaning.</p>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Early warning signs:</strong> Burning smells, hot surfaces, sparking, discoloured equipment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="prevention-check"
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
            <h4 className="text-blue-700 dark:text-elec-yellow font-semibold mb-2">Industrial Facility Fire Investigation</h4>
            <p className="text-blue-700 dark:text-elec-yellow mb-4">
              A small fire occurred in a factory's electrical distribution room adjacent to a spray booth. Investigation revealed loose terminations caused overheating, highlighting the need for regular thermal imaging and proper maintenance near ATEX zones.
            </p>
            <p className="text-blue-700 dark:text-elec-yellow">
              <strong>Key lessons:</strong> Regular torque checking, thermal imaging surveys, understanding ATEX zone implications, and proper ventilation in electrical rooms prevent similar incidents.
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
              Key Takeaways - Fire Hazards and Explosive Environments:
            </p>
            <ul className="space-y-2">
              <li>• Fire requires heat, fuel, and oxygen - eliminate one element to prevent fire</li>
              <li>• Recognise early warning signs: burning smells, hot surfaces, unusual sounds</li>
              <li>• Prevention through proper design, installation, and maintenance is most effective</li>
              <li>• ATEX zones classify explosive atmosphere risks - use appropriate certified equipment</li>
              <li>• Regular inspection and thermal imaging can detect problems before they cause fires</li>
              <li>• Emergency procedures should be established and practised regularly</li>
            </ul>
            <p className="text-elec-yellow dark:text-elec-yellow font-semibold">
              Remember: Most electrical fires are preventable with proper attention to safety and quality installation practices.
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
                <li>• Report any burning smells or unusual heat immediately</li>
                <li>• Check terminations are tight and properly made</li>
                <li>• Keep electrical equipment clean and well-ventilated</li>
                <li>• Ask about ATEX zones before starting work</li>
                <li>• Use certified tools in hazardous areas</li>
                <li>• Follow fire safety procedures and evacuation routes</li>
              </ul>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="text-red-700 dark:text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                DON'T
              </h4>
              <ul className="space-y-2 text-red-700 dark:text-elec-yellow">
                <li>• Ignore warning signs of overheating or damage</li>
                <li>• Use standard tools in explosive atmosphere areas</li>
                <li>• Overload circuits or use inappropriate cable sizes</li>
                <li>• Leave loose connections or poor terminations</li>
                <li>• Work near flammable materials without precautions</li>
                <li>• Attempt to fight electrical fires with water</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Reference Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick reference pocket card</h2>
          <div className="bg-elec-yellow/5 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-700 font-semibold mb-3">Fire Safety Emergency Actions</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="text-foreground font-semibold mb-2">If You Discover a Fire:</h5>
                <ol className="text-white/80 space-y-1">
                  <li>1. Sound the alarm</li>
                  <li>2. Switch off power if safe to do so</li>
                  <li>3. Evacuate the area</li>
                  <li>4. Call fire service (999)</li>
                  <li>5. Fight fire only if safe and trained</li>
                </ol>
              </div>
              <div>
                <h5 className="text-foreground font-semibold mb-2">Fire Extinguisher Types:</h5>
                <ul className="text-white/80 space-y-1">
                  <li>• CO₂ - Electrical fires (black label)</li>
                  <li>• Dry powder - Multi-purpose (blue label)</li>
                  <li>• Never use water on live electrical equipment</li>
                  <li>• Follow PASS: Pull, Aim, Squeeze, Sweep</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button asChild variant="outline" className="flex-1">
            <Link to="2-2" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Overloads and Short Circuits
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to="2-4" className="flex items-center gap-2">
              Next: Working at Height and Confined Spaces
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge - Fire Hazards and Explosive Environments" 
          questions={quizQuestions} 
        />
      </main>
    </div>
  );
};

export default Section2_3;