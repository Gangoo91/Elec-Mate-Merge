import { ArrowLeft, ArrowRight, Building, Target, CheckCircle, AlertTriangle, ClipboardList, Wrench, Shield, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working in Voids, Risers, and Ceilings - Module 4.7.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn safe working practices for voids, risers, and ceiling spaces. Master hazard identification, safe access procedures, and legal requirements for confined and elevated work areas.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What regulation governs working at height?",
    options: ["Work at Height Regulations 2005", "Health and Safety at Work Act", "PUWER 1998", "Manual Handling Operations Regulations"],
    correctIndex: 0,
    explanation: "The Work at Height Regulations 2005 specifically govern all work carried out above floor level, including ceiling and riser access."
  },
  {
    id: 2,
    question: "Why is a dust mask important in ceiling voids?",
    options: ["To prevent respiratory irritation from insulation fibres and dust", "To improve visibility", "To reduce noise", "To prevent electric shock"],
    correctIndex: 0,
    explanation: "Ceiling voids often contain insulation materials and accumulated dust that can cause respiratory irritation and health problems if inhaled."
  },
  {
    id: 3,
    question: "What should always be checked before entering a riser or void?",
    options: ["Hidden services and safe access routes", "Lighting levels", "Temperature", "Noise levels"],
    correctIndex: 0,
    explanation: "Hidden services (cables, pipes, gas lines) and safe access/egress routes must be checked to prevent accidental contact and ensure emergency evacuation capability."
  }
];

const Module4Section7_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation covers work carried out above floor level?",
      options: [
        "PUWER 1998",
        "Work at Height Regulations 2005",
        "EAWR 1989",
        "CDM 2015"
      ],
      correctAnswer: 1,
      explanation: "The Work at Height Regulations 2005 specifically cover all work carried out above floor level, including access to ceiling voids and elevated areas."
    },
    {
      id: 2,
      question: "True or False: You can step directly onto plasterboard when working in a ceiling void.",
      options: [
        "True",
        "False",
        "Only if it's thick plasterboard",
        "Only for short periods"
      ],
      correctAnswer: 1,
      explanation: "False - plasterboard cannot support human weight and will give way, causing falls and injury. Always use crawl boards to distribute weight safely."
    },
    {
      id: 3,
      question: "Name two hazards that may be present in risers.",
      options: [
        "Good ventilation and lighting",
        "Hidden services and restricted access",
        "Wide access and clear visibility",
        "Low noise and clean environment"
      ],
      correctAnswer: 1,
      explanation: "Risers commonly contain hidden electrical cables, gas pipes, water services, and have restricted access that can create emergency egress problems."
    },
    {
      id: 4,
      question: "What PPE item is essential for visibility in ceiling voids?",
      options: [
        "High-vis vest",
        "Head torch",
        "Safety harness",
        "Safety glasses"
      ],
      correctAnswer: 1,
      explanation: "A head torch provides hands-free illumination essential for safe navigation and work in poorly lit ceiling voids and confined spaces."
    },
    {
      id: 5,
      question: "Why is it important to use a cable/pipe detector before drilling?",
      options: [
        "To reduce drilling speed",
        "To prevent accidental contact with hidden services",
        "To improve drill bit life",
        "To reduce noise levels"
      ],
      correctAnswer: 1,
      explanation: "Cable and pipe detectors identify hidden electrical cables, water pipes, and gas lines that could cause serious injury, service disruption, or damage if accidentally contacted."
    },
    {
      id: 6,
      question: "What is the main risk of not replacing fire-stopping after working in risers?",
      options: [
        "Loss of lighting",
        "Increased fire spread risk",
        "Trip hazard",
        "Poor ventilation"
      ],
      correctAnswer: 1,
      explanation: "Fire-stopping materials prevent fire and smoke spread between floors and compartments. Failure to replace them properly compromises building fire safety systems."
    },
    {
      id: 7,
      question: "True or False: Permits to work are sometimes required for riser access.",
      options: [
        "True",
        "False",
        "Only in hospitals",
        "Only for electrical work"
      ],
      correctAnswer: 0,
      explanation: "True - permits to work are commonly required for riser access due to the risks involved, including confined space hazards and critical building services."
    },
    {
      id: 8,
      question: "What type of board should be used in ceiling spaces to distribute weight?",
      options: [
        "Plywood sheets",
        "Crawl boards",
        "Scaffold boards",
        "Plasterboard"
      ],
      correctAnswer: 1,
      explanation: "Crawl boards are specifically designed to distribute weight safely across ceiling joists and prevent damage to ceiling materials or falls through voids."
    },
    {
      id: 9,
      question: "Give one practical reason to secure tools when working in risers.",
      options: [
        "To improve tool organisation",
        "To prevent tools falling and creating hazards below",
        "To reduce tool wear",
        "To comply with manufacturer instructions"
      ],
      correctAnswer: 1,
      explanation: "Securing tools with lanyards prevents them from falling through openings and potentially injuring people below or creating hazards in lower areas."
    },
    {
      id: 10,
      question: "What should always be maintained when entering voids or risers?",
      options: [
        "An escape route and communication",
        "A backup power supply",
        "A secondary PPE kit",
        "A site induction card"
      ],
      correctAnswer: 0,
      explanation: "Maintaining a clear escape route and communication with team members outside ensures emergency evacuation capability and assistance if problems occur."
    }
  ];

  const faqs = [
    {
      question: "Do I need a permit to work in a riser?",
      answer: "Yes, in most cases permits are required due to the risks involved, including confined space hazards, critical building services, and emergency access requirements. Always check with site management and follow established procedures."
    },
    {
      question: "Can standard site lighting be used in voids?",
      answer: "Often, no. Portable, low-voltage, or battery-powered lighting is safer due to the confined nature of these spaces and potential contact with water or damaged cables. Use appropriate IP-rated equipment for the environment."
    },
    {
      question: "Is it safe to drill into a ceiling void without checking?",
      answer: "No – always use a cable and pipe detector to locate hidden services before drilling. Ceiling voids commonly contain electrical cables, water pipes, gas lines, and other services that could cause serious injury or damage if contacted."
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
              Back to Section 7
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
              <Building className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.7.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Working in Voids, Risers, and Ceilings
          </h1>
          <p className="text-muted-foreground">
            Master safe working practices for confined and elevated spaces, including hazard identification and legal compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Voids, risers, and ceiling spaces present unique risks including restricted access, hidden services, and fall hazards.</li>
                <li>Work at Height Regulations 2005 and confined space procedures apply to these working environments.</li>
                <li>Safe access equipment, appropriate PPE, and permit-to-work systems are essential for preventing accidents.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unmarked ceiling panels, unguarded openings, poor lighting, missing crawl boards.</li>
                <li><strong>Use:</strong> Cable detectors, head torches, crawl boards, secure ladders, communication systems.</li>
                <li><strong>Check:</strong> Permit requirements, hidden services, safe access routes, emergency procedures.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify hazards associated with working in voids, risers, and ceilings.</li>
            <li>Apply safe access and egress procedures.</li>
            <li>Select and use appropriate PPE and tools for confined or elevated spaces.</li>
            <li>Recognise the importance of permits to work in restricted areas.</li>
            <li>Work to industry best practice for safety and compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Hazards in Voids, Risers, and Ceilings */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Hazards in Voids, Risers, and Ceilings</h3>
            <p className="text-base text-foreground mb-4">
              These confined and elevated working environments present multiple serious hazards that require careful risk assessment and control measures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Physical and Environmental Hazards</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Restricted access and egress</strong> - limited entry/exit routes increase risk of entrapment and emergency evacuation difficulties</li>
                      <li><strong>Hidden services</strong> - accidental contact with live electrical cables, gas pipes, or water services</li>
                      <li><strong>Fall hazards</strong> - weak ceiling panels, unguarded openings, and unstable surfaces</li>
                      <li><strong>Poor lighting conditions</strong> - inadequate visibility makes hazard identification difficult</li>
                      <li><strong>Dust and insulation exposure</strong> - respiratory irritation and reduced visibility from airborne particles</li>
                      <li><strong>Fire safety compromise</strong> - damage to fire-stopping materials can increase fire spread risk</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Structural considerations:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Ceiling voids often contain lightweight construction materials not designed to support human weight. Plasterboard, suspended ceiling tiles, and thin metal supports can fail catastrophically under load, causing serious falls and structural damage.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Service integration risks:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Modern buildings integrate multiple services through ceiling voids and risers. Electrical cables, data networks, water pipes, gas lines, HVAC systems, and fire suppression equipment create complex hazard profiles requiring careful identification and protection measures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-4-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Legal and Site Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Legal and Site Requirements</h3>
            <p className="text-base text-foreground mb-4">
              Working in voids, risers, and ceilings is governed by multiple regulations that establish specific safety requirements and procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Regulatory Framework and Compliance</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Work at Height Regulations 2005</strong> - apply to all work above floor level including ceiling access</li>
                      <li><strong>Confined Space Regulations 1997</strong> - may apply in risers and enclosed voids with restricted access</li>
                      <li><strong>Permit-to-work systems</strong> - required for many riser and ceiling void access situations</li>
                      <li><strong>Risk assessment requirements</strong> - detailed evaluation of specific hazards and control measures</li>
                      <li><strong>Emergency procedures</strong> - rescue and evacuation plans for confined or elevated spaces</li>
                      <li><strong>Training and competence</strong> - specific instruction for working in restricted environments</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Permit-to-work criteria:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Permits are typically required when work involves: critical building services, confined space entry, hot work near combustible materials, work near high-voltage equipment, or access to areas with specific environmental hazards. Always check site procedures before commencing work.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Competence requirements:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Workers must be trained and competent in confined space procedures, work at height techniques, hazard recognition, emergency procedures, and use of specialist equipment. Regular refresher training ensures continued competence and awareness of evolving best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-4-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Safe Access and Egress */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Safe Access and Egress</h3>
            <p className="text-base text-foreground mb-4">
              Proper access and egress procedures are fundamental to preventing falls and ensuring emergency evacuation capability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Access Equipment and Procedures</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Secure ladder systems</strong> - use appropriate ladders, steps, or podiums for ceiling access with proper securing</li>
                      <li><strong>Three-point contact</strong> - maintain three points of contact when climbing (two hands, one foot or vice versa)</li>
                      <li><strong>Clear access routes</strong> - ensure voids and risers are free from obstructions before entry</li>
                      <li><strong>Emergency egress planning</strong> - identify and maintain clear escape routes at all times</li>
                      <li><strong>Weight distribution systems</strong> - use crawl boards and proper support systems in ceiling voids</li>
                      <li><strong>Communication protocols</strong> - establish contact procedures with team members outside confined spaces</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Access equipment selection:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Choose equipment appropriate for the specific access requirements: step ladders for simple ceiling access, extension ladders for higher access points, mobile elevated work platforms for extensive ceiling work, and crawl boards for movement within ceiling voids.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Pre-entry inspection:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Before entering any void or riser, conduct visual inspection for structural integrity, identify potential hazards, confirm adequate lighting, check for signs of gas or water leaks, verify access equipment stability, and ensure emergency procedures are understood by all team members.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-4-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* PPE and Tools Required */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. PPE and Tools Required</h3>
            <p className="text-base text-foreground mb-4">
              Specialised PPE and tools are essential for safe and effective work in confined and elevated spaces:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Essential PPE and Equipment</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Helmet with chin strap</strong> - protection from impact in confined overhead spaces</li>
                      <li><strong>Respiratory protection</strong> - dust masks or respirators for insulation fibres and airborne particles</li>
                      <li><strong>Head torch and portable lighting</strong> - hands-free illumination for adequate visibility</li>
                      <li><strong>Cut-resistant gloves</strong> - protection from sharp metal edges and rough surfaces</li>
                      <li><strong>Protective clothing</strong> - coveralls to reduce cuts and contamination from building materials</li>
                      <li><strong>Safety footwear</strong> - appropriate grip and protection for varied surfaces and debris</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Specialised tools and equipment:</strong></p>
                      <ul className="text-xs text-muted-foreground list-disc ml-4 space-y-1">
                        <li><strong>Cable and pipe detectors:</strong> Essential for locating hidden services before drilling or cutting</li>
                        <li><strong>Tool lanyards:</strong> Prevent tools falling through openings and creating hazards below</li>
                        <li><strong>Crawl boards:</strong> Distribute weight safely across ceiling joists and prevent damage</li>
                        <li><strong>Low-voltage lighting:</strong> Safer electrical equipment for potentially damp environments</li>
                        <li><strong>Communication devices:</strong> Two-way radios or mobile phones for emergency contact</li>
                        <li><strong>Atmosphere testing equipment:</strong> Where confined space hazards may exist</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded border border-amber-200/30">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Equipment maintenance and inspection:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        All equipment must be regularly inspected and maintained. Head torches need charged batteries and backup lighting, PPE requires daily condition checks, detection equipment needs calibration verification, and access equipment requires formal inspection records according to manufacturer schedules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Best Practices</h3>
            <p className="text-base text-foreground mb-4">
              Industry best practices help ensure consistent safety standards and legal compliance in all void, riser, and ceiling work:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Professional Safety Standards</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Atmosphere testing</strong> - test air quality in risers or confined spaces where required</li>
                      <li><strong>Communication protocols</strong> - maintain contact with team members outside void/riser areas</li>
                      <li><strong>Load distribution</strong> - never overload ceiling grids, use crawl boards for weight distribution</li>
                      <li><strong>Fire-stopping integrity</strong> - replace ceiling tiles, panels, and fire-stopping materials after work completion</li>
                      <li><strong>Service identification</strong> - mark and record locations of hidden services for future reference</li>
                      <li><strong>Emergency preparedness</strong> - ensure rescue equipment and procedures are readily available</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Documentation and records:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Maintain records of permit-to-work procedures, risk assessments, equipment inspections, and any services encountered or modifications made. This documentation supports legal compliance and provides valuable information for future maintenance work.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Continuous improvement:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Regular review of procedures, near-miss reporting, and incorporation of lessons learned help improve safety standards. Participate in safety meetings, share experiences with colleagues, and stay updated on industry best practices and regulatory changes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Practical Guidance (On-Site Tips)
          </h2>
          <div className="grid gap-4">
            <div className="p-4 bg-card rounded-lg border border-border/10">
              <h3 className="font-medium text-foreground mb-2">Pre-Work Safety Checks</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-5">
                <li>Always assume hidden services may be present – use a cable/pipe detector before drilling or cutting</li>
                <li>Carry a battery-powered inspection light when working in ceiling voids</li>
                <li>Test atmosphere in risers and confined spaces where gas accumulation is possible</li>
                <li>Verify structural integrity of access surfaces before placing weight</li>
              </ul>
            </div>
            
            <div className="p-4 bg-card rounded-lg border border-border/10">
              <h3 className="font-medium text-foreground mb-2">Safe Working Practices</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-5">
                <li>Use crawl boards in ceiling spaces to avoid damaging plasterboard and distribute weight</li>
                <li>When working in risers, secure tools with lanyards to prevent falling hazards</li>
                <li>Never exceed the working load limit of access equipment or ceiling structures</li>
                <li>Keep work areas tidy and remove debris promptly to prevent accumulation</li>
              </ul>
            </div>
            
            <div className="p-4 bg-card rounded-lg border border-border/10">
              <h3 className="font-medium text-foreground mb-2">Communication and Emergency Procedures</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-5">
                <li>Keep communication open – always let someone know when you enter a void or riser</li>
                <li>Establish regular check-in times for extended work in confined spaces</li>
                <li>Ensure emergency contact procedures are understood by all team members</li>
                <li>Maintain clear escape routes and emergency lighting throughout work period</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Real-World Examples
          </h2>
          
          <div className="space-y-6">
            <div className="p-5 border border-red-200/50 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-emerald-400 mb-2">Case Study 1: Ceiling Void Fall</h3>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    During maintenance work in an office ceiling void, an apprentice stepped directly onto plasterboard rather than using a crawl board. The plasterboard gave way, causing a fall into the room below and minor injuries.
                  </p>
                  <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                    <strong>Prevention:</strong> Proper use of crawl boards would have distributed weight safely. The incident highlighted the importance of training in ceiling void access procedures and the structural limitations of building materials.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-red-200/50 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-emerald-400 mb-2">Case Study 2: Hidden Service Contact</h3>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    An electrician drilling cable entry holes in a riser contacted a hidden gas pipe, causing a significant gas leak that required building evacuation and emergency service response.
                  </p>
                  <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                    <strong>Prevention:</strong> Use of cable and pipe detection equipment would have identified the hidden gas line. The incident emphasized the critical importance of service detection before any invasive work in building voids.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-green-200/50 bg-green-50/50 dark:bg-green-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Case Study 3: Effective Permit-to-Work System</h3>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    A complex ceiling void installation was completed safely using comprehensive permit-to-work procedures, pre-work risk assessment, and continuous monitoring of work conditions.
                  </p>
                  <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                    <strong>Good Practice:</strong> Proper planning, hazard identification, control measure implementation, and team communication ensured zero incidents. The permit system facilitated coordination with other trades and building management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Pocket Guide (Key Takeaways)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Risks: restricted access, hidden services, poor lighting, dust</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Always use safe access equipment (ladders, crawl boards)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">PPE: helmet, dust mask, head torch, gloves</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Permits may be required in risers and confined voids</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Communicate and keep a safe exit route clear at all times</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Use cable/pipe detectors before drilling or cutting</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Book className="w-5 h-5" />
            Recap
          </h2>
          <p className="text-base text-foreground mb-4">In this subsection, you learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>The hazards of working in voids, risers, and ceilings.</li>
            <li>Legal requirements such as Work at Height and confined space regulations.</li>
            <li>Safe access/egress methods and PPE selection.</li>
            <li>Best practices for working safely in restricted spaces.</li>
            <li>Real-world lessons from incidents caused by poor safety awareness.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Knowledge Check Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="module4-section7/subsection3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back: PPE for Cutting, Bending, and Fixing
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="module4-section7/subsection5" className="flex items-center gap-2">
              Next: Lifting and Moving Equipment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section7_4;