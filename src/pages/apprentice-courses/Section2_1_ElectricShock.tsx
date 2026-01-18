import { ArrowLeft, ArrowRight, Zap, Flame, AlertTriangle, Shield, Heart, Eye, Activity, FileText, Users, Briefcase, ClipboardList, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electric Shock and Burns - Module 1.2.1 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding electric shock, arc flash, thermal burns, first aid procedures, and prevention strategies for electrical workers. EAWR and BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the first priority when someone is receiving an electric shock?",
    options: [
      "Pull them away immediately",
      "Isolate the supply if safe to do so - do not touch them until power is off",
      "Pour water on them to cool them down",
      "Call for help and wait"
    ],
    correctIndex: 1,
    explanation: "Never touch someone receiving an electric shock until the power is isolated. Make the situation safe first to avoid becoming a casualty yourself."
  },
  {
    id: 2,
    question: "What is arc flash primarily caused by?",
    options: [
      "High voltage only",
      "Electrical faults creating an electrical arc through the air",
      "Water contact with electricity",
      "Damaged insulation"
    ],
    correctIndex: 1,
    explanation: "Arc flash occurs when electrical current travels through the air between conductors or from conductor to ground, creating intense heat and pressure."
  },
  {
    id: 3,
    question: "How long should electrical burns be cooled with running water?",
    options: [
      "5 minutes",
      "10 minutes", 
      "At least 20 minutes",
      "Until ambulance arrives"
    ],
    correctIndex: 2,
    explanation: "HSE guidance recommends cooling burns with cool running water for at least 20 minutes to reduce tissue damage."
  },
  {
    id: 4,
    question: "Which body pathway for electric shock is most dangerous?",
    options: [
      "Hand to hand across the chest",
      "Foot to foot",
      "Hand to foot",
      "All are equally dangerous"
    ],
    correctIndex: 0,
    explanation: "Hand-to-hand current path across the chest is most dangerous as it passes through the heart and can cause cardiac arrest."
  }
];

const Section2_1_ElectricShock = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most dangerous current path through the human body?",
      options: [
        "Foot to foot",
        "Hand to hand across the chest", 
        "Hand to foot",
        "Head to toe"
      ],
      correctAnswer: 1,
      explanation: "Hand-to-hand current path across the chest is most dangerous as it directly affects the heart and can cause ventricular fibrillation."
    },
    {
      id: 2,
      question: "At what current level can 'let-go' become impossible for most people?",
      options: [
        "1-5 mA",
        "5-10 mA",
        "10-20 mA",
        "50-100 mA"
      ],
      correctAnswer: 2,
      explanation: "At 10-20 mA, muscular control is lost and 'let-go' becomes impossible for most people due to muscle contraction."
    },
    {
      id: 3,
      question: "What temperature can an arc flash reach?",
      options: [
        "1,000°C",
        "5,000°C",
        "10,000°C",
        "Up to 20,000°C (hotter than the sun's surface)"
      ],
      correctAnswer: 3,
      explanation: "Arc flash temperatures can reach up to 20,000°C, which is four times hotter than the sun's surface, causing severe burns instantly."
    },
    {
      id: 4,
      question: "Which type of current is generally more dangerous at the same voltage?",
      options: [
        "AC (alternating current)",
        "DC (direct current)",
        "They are equally dangerous",
        "Depends on frequency only"
      ],
      correctAnswer: 0,
      explanation: "AC is generally more dangerous as it causes stronger muscle contractions and interferes more with heart rhythm at power frequencies (50Hz)."
    },
    {
      id: 5,
      question: "What should you do immediately after isolating power from a shock victim?",
      options: [
        "Move them immediately",
        "Give them water",
        "Check for responsiveness and breathing, call 999 if needed",
        "Leave them to recover naturally"
      ],
      correctAnswer: 2,
      explanation: "After ensuring safety, check responsiveness and breathing. Call 999 for serious injuries, unconsciousness, or breathing problems."
    },
    {
      id: 6,
      question: "What is the minimum PPE arc rating for arc flash protection?",
      options: [
        "Depends on calculated incident energy at the working distance",
        "Always 8 cal/cm²",
        "No specific requirement",
        "4 cal/cm² minimum"
      ],
      correctAnswer: 0,
      explanation: "Arc flash PPE must be rated for the calculated incident energy at the working distance, determined by arc flash risk assessment."
    },
    {
      id: 7,
      question: "Under EAWR, when is live working permitted?",
      options: [
        "Never under any circumstances",
        "Only when it's unreasonable to work dead AND suitable precautions are taken",
        "Whenever proper PPE is worn",
        "Only on low voltage systems"
      ],
      correctAnswer: 1,
      explanation: "EAWR Regulations 13 and 14: work dead wherever possible; live work only when unreasonable to work dead with suitable precautions."
    },
    {
      id: 8,
      question: "What is the purpose of a safe isolation procedure?",
      options: [
        "To speed up the work",
        "To ensure circuits are completely de-energised and cannot be re-energised",
        "To test equipment",
        "To comply with insurance requirements"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation ensures circuits are completely dead and secured against re-energisation, preventing electric shock during work."
    }
  ];

  const faqs = [
    {
      question: "What factors affect the severity of electric shock?",
      answer: "Current magnitude, voltage level, current path through body, duration of contact, frequency (AC/DC), body resistance (affected by moisture, skin condition), and individual health factors all influence shock severity."
    },
    {
      question: "How does RCD protection help prevent electric shock?",
      answer: "RCDs detect imbalance between live and neutral currents (indicating current leakage to earth) and disconnect the supply within 30-40 milliseconds, before dangerous current levels can cause harm."
    },
    {
      question: "What should I do if I witness an electrical accident?",
      answer: "Don't touch the casualty while power is on. Isolate supply if safe to do so. Call 999 for serious injuries. If trained and safe, provide first aid including CPR if needed. Preserve the scene for investigation."
    },
    {
      question: "How can I identify arc flash hazards?",
      answer: "Look for electrical equipment with exposed live parts, switching operations, fault conditions, and work on energised equipment. Arc flash risk assessments should identify hazards and required PPE levels."
    },
    {
      question: "What's the difference between electrical burns and thermal burns?",
      answer: "Electrical burns occur when current passes through tissue, causing internal damage. Thermal burns result from arc flash heat. Both can occur simultaneously and require immediate cooling and medical attention."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card/50">
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
            <div className="p-2 rounded-lg bg-card/10">
              <Zap className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 2.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Electric Shock and Burns
          </h1>
          <p className="text-white/80">
            Understanding electrical injuries, physiological effects, emergency response procedures, and prevention strategies for electrical workers.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-4 bg-card/10 border border-border/20">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electric shock occurs when current passes through the body, potentially causing cardiac arrest.</li>
                <li>Arc flash creates extreme heat (up to 20,000°C) causing severe burns and pressure waves.</li>
                <li>Immediate isolation of power and proper first aid can save lives.</li>
                <li>Prevention through safe isolation procedures and appropriate PPE is essential.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Exposed live parts, damaged equipment, wet conditions, missing covers.</li>
                <li><strong>Use:</strong> Safe isolation procedures, GS38 voltage testers, appropriate PPE ratings.</li>
                <li><strong>Check:</strong> RCD operation, equipment condition, environmental hazards, emergency procedures.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand the physiological effects of electric shock and factors affecting severity.</li>
            <li>Recognise arc flash and thermal burn hazards and their prevention.</li>
            <li>Know correct emergency response procedures for electrical accidents.</li>
            <li>Apply safe isolation procedures to prevent electrical injuries.</li>
            <li>Select appropriate PPE for electrical work and arc flash protection.</li>
            <li>Understand legal requirements under EAWR for electrical safety.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Electric Shock Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Electric Shock - Physiological Effects</h3>
            <p className="text-base text-foreground mb-4">
              Electric shock occurs when electrical current passes through the human body, potentially causing serious injury or death:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Current Effects on the Human Body</p>
                    <p className="text-base text-foreground mb-2"><strong>Threshold levels:</strong> Different current levels cause different physiological effects.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>1-5 mA:</strong> Perception threshold - barely noticeable tingling</li>
                      <li><strong>5-10 mA:</strong> Maximum safe current - uncomfortable sensation</li>
                      <li><strong>10-20 mA:</strong> Muscular control lost - 'let-go' threshold exceeded</li>
                      <li><strong>50-100 mA:</strong> Ventricular fibrillation possible - potentially fatal</li>
                      <li><strong>100+ mA:</strong> Certain ventricular fibrillation and cardiac arrest</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Critical factors:</strong> Current path and duration determine severity.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Hand-to-hand (across chest): most dangerous pathway</li>
                      <li>Hand-to-foot: high risk due to full body current path</li>
                      <li>Foot-to-foot: generally less severe but still dangerous</li>
                      <li>Contact duration increases injury severity</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>AC vs DC effects:</strong> Different characteristics affect danger level.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>AC (50Hz): stronger muscle contractions, harder to 'let go'</li>
                      <li>DC: can cause single violent muscle contraction</li>
                      <li>High frequency AC: may cause burns rather than shock</li>
                      <li>Body resistance varies with skin moisture and voltage</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Current through the body, not voltage alone, determines injury severity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="shock-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* Arc Flash Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Arc Flash and Thermal Burns</h3>
            <p className="text-base text-foreground mb-4">
              Arc flash events create extreme hazards beyond electric shock, requiring specific protection measures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Arc Flash Characteristics and Hazards</p>
                    <p className="text-base text-foreground mb-2"><strong>Arc flash formation:</strong> Electrical arc creates multiple severe hazards.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Temperature: up to 20,000°C (four times hotter than sun's surface)</li>
                      <li>Pressure wave: can knock workers down and rupture eardrums</li>
                      <li>Intense light: can cause permanent eye damage and blindness</li>
                      <li>Toxic gases: burning materials create dangerous vapours</li>
                      <li>Molten metal: spatter can cause severe burns through clothing</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Common arc flash scenarios:</strong> Situations where arc flash is most likely.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Switching operations on high-energy circuits</li>
                      <li>Short circuits and ground faults</li>
                      <li>Equipment failure during energised work</li>
                      <li>Accidental contact with live parts</li>
                      <li>Insulation failure in confined spaces</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Protection strategies:</strong> Multi-layered approach to arc flash safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Arc flash risk assessment to determine incident energy</li>
                      <li>Appropriate arc-rated PPE based on energy calculations</li>
                      <li>Remote operation and switching where possible</li>
                      <li>Equipment design to minimise arc flash risk</li>
                      <li>Training and procedures for high-risk operations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Arc flash energy decreases with distance - maintain safe working distances
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="arc-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* Emergency Response Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Emergency Response and First Aid</h3>
            <p className="text-base text-foreground mb-4">
              Proper emergency response can mean the difference between life and death in electrical accidents:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Immediate Response Procedure</p>
                    <p className="text-base text-foreground mb-2"><strong>Step 1 - Make safe:</strong> Isolate the electrical supply immediately if safe to do so.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Do NOT touch the casualty while power is on</li>
                      <li>Switch off at main supply or circuit breaker if accessible</li>
                      <li>If unable to isolate, use insulated implement to separate casualty</li>
                      <li>Ensure your own safety - do not become a second casualty</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Step 2 - Assess casualty:</strong> Check responsiveness and breathing.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Call 999/112 immediately for serious injuries</li>
                      <li>Check for signs of life - responsiveness and normal breathing</li>
                      <li>If unconscious or not breathing normally, start CPR if trained</li>
                      <li>Position casualty safely, checking for spinal injuries</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Step 3 - Treat burns:</strong> Cool burns immediately and appropriately.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Cool with cool running water for at least 20 minutes</li>
                      <li>Remove rings, watches, belts before swelling occurs</li>
                      <li>Cover with clean, non-fluffy material (cling film ideal)</li>
                      <li>Do not use ice, creams, or break blisters</li>
                      <li>Monitor for shock - keep casualty warm</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Remember:</strong> Electrical burns may be more severe internally than they appear externally
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="firstaid-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <Separator className="my-6" />

          {/* Prevention Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Prevention Strategies and Safe Systems</h3>
            <p className="text-base text-foreground mb-4">
              Preventing electrical injuries through systematic safety measures and legal compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Safe Isolation and Work Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>EAWR compliance:</strong> Legal framework for electrical safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Regulation 13: Work on or near electrical equipment to be dead</li>
                      <li>Regulation 14: Live work only when unreasonable to work dead</li>
                      <li>Regulation 16: Persons to be competent for electrical work</li>
                      <li>Duty to prevent danger from electrical equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safe isolation procedure:</strong> Systematic approach to ensuring safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identify circuit to be isolated using accurate information</li>
                      <li>Isolate supply using appropriate switching device</li>
                      <li>Secure isolation with locks and warning labels</li>
                      <li>Prove dead using GS38-compliant voltage tester</li>
                      <li>Post warning notices and maintain control until work complete</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>PPE and protection systems:</strong> Last line of defence.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>RCD protection: 30mA for socket outlets, higher ratings for fixed equipment</li>
                      <li>Appropriate clothing: arc-rated garments for arc flash risk</li>
                      <li>Eye protection: appropriate rating for arc flash energy</li>
                      <li>Insulated tools and equipment for live work</li>
                      <li>Environmental controls: barriers, warning signs, access control</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Hierarchy:</strong> Eliminate hazard → Control hazard → PPE as last resort
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="prevention-check"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </Card>

        {/* Real-world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world scenario</h2>
          <div className="bg-card/10 p-4 rounded-lg border border-border/20 mb-4">
            <p className="font-medium text-foreground mb-2">Scenario: Electrical Accident Response</p>
            <p className="text-base text-foreground">
              An apprentice electrician contacts a live 230V cable while working in a distribution board. A colleague witnesses the incident.
            </p>
          </div>
          <div className="space-y-4 text-base text-foreground">
            <div>
              <p className="font-medium mb-2">Immediate actions taken:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>1. Make safe:</strong> Colleague immediately isolates main supply to distribution board</li>
                <li><strong>2. Assess casualty:</strong> Apprentice is conscious but shaken, complaining of arm pain</li>
                <li><strong>3. Emergency response:</strong> Call 999 as electrical contact injury requires hospital assessment</li>
                <li><strong>4. First aid:</strong> Check for burns, treat if present, monitor for delayed reactions</li>
                <li><strong>5. Site safety:</strong> Secure area, notify supervisor, preserve evidence for investigation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Follow-up requirements:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>RIDDOR report to HSE (accident involving electricity)</li>
                <li>Company incident investigation and risk assessment review</li>
                <li>Medical monitoring (electrical injuries can have delayed effects)</li>
                <li>Training review and procedure improvement</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <p className="font-medium text-foreground mb-2">{faq.question}</p>
                <p className="text-base text-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-3 text-base text-foreground">
            <p>Electric shock and burn injuries in electrical work are preventable through proper procedures and protective measures.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Current path and magnitude</strong> determine shock severity, with hand-to-hand across chest being most dangerous.</li>
              <li><strong>Arc flash creates extreme hazards</strong> including temperatures up to 20,000°C and dangerous pressure waves.</li>
              <li><strong>Emergency response priorities:</strong> isolate power, assess casualty, provide appropriate first aid, call for help.</li>
              <li><strong>Prevention through safe systems:</strong> EAWR compliance, safe isolation, appropriate PPE, and competent work.</li>
              <li><strong>Legal obligations</strong> require systematic approaches to electrical safety and incident reporting.</li>
            </ul>
          </div>
        </Card>

        {/* Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Do's and Don'ts for apprentices</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600 dark:text-green-400">✅ Do's</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li>• Always follow safe isolation procedures before work</li>
                <li>• Use GS38-compliant voltage testers to prove dead</li>
                <li>• Wear appropriate arc-rated PPE for the energy level</li>
                <li>• Know your emergency response procedures</li>
                <li>• Report unsafe conditions immediately</li>
                <li>• Maintain safe working distances from live parts</li>
                <li>• Keep first aid skills up to date</li>
                <li>• Understand your limits of competence</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-red-600 dark:text-elec-yellow">❌ Don'ts</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li>• Never touch someone receiving electric shock while power is on</li>
                <li>• Don't use non-contact voltage pens for proving dead</li>
                <li>• Never work live unless absolutely justified and authorised</li>
                <li>• Don't assume circuits are dead without proper testing</li>
                <li>• Never remove or bypass safety devices</li>
                <li>• Don't work alone on high-risk electrical tasks</li>
                <li>• Never ignore warning signs or safety procedures</li>
                <li>• Don't attempt work beyond your competence level</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket card */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-card/20 to-card/10 border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick reference pocket card</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Emergency Response:</p>
              <ol className="list-decimal pl-4 space-y-1 text-foreground">
                <li>Isolate power if safe to do so</li>
                <li>Do not touch casualty while live</li>
                <li>Call 999 for serious injuries</li>
                <li>Check responsiveness and breathing</li>
                <li>Cool burns for 20+ minutes</li>
                <li>Monitor and treat for shock</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Prevention Checklist:</p>
              <ul className="list-disc pl-4 space-y-1 text-foreground">
                <li>Safe isolation procedure</li>
                <li>Prove dead with GS38 tester</li>
                <li>Appropriate PPE for task</li>
                <li>RCD protection where required</li>
                <li>Environmental controls</li>
                <li>Competent person for task</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz title="Electric Shock and Burns Quiz" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="../subsection6">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section2_1_ElectricShock;
