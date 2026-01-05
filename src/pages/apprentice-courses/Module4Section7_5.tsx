import { ArrowLeft, ArrowRight, ClipboardList, Target, CheckCircle, AlertTriangle, Wrench, Shield, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Keeping the Work Area Safe and Organised - Module 4.7.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn effective workplace organisation and housekeeping practices. Master safe storage, waste management, and maintaining clear access routes for improved safety and productivity.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which regulation requires housekeeping to be maintained on construction sites?",
    options: ["CDM 2015", "PUWER 1998", "PPE Regulations 1992", "Manual Handling Operations Regulations"],
    correctIndex: 0,
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM) require housekeeping standards to be maintained throughout construction projects."
  },
  {
    id: 2,
    question: "Name one hazard caused by leaving waste in the work area.",
    options: ["Fire hazards from flammable materials", "Improved organisation", "Better visibility", "Reduced work time"],
    correctIndex: 0,
    explanation: "Waste materials, particularly flammable packaging and offcuts, can create fire hazards if left near heat sources or ignition points."
  },
  {
    id: 3,
    question: "Why should heavy items be stored at waist height where possible?",
    options: ["To reduce manual handling risks", "To save floor space", "To improve appearance", "To prevent theft"],
    correctIndex: 0,
    explanation: "Storing heavy items at waist height reduces the need for lifting from floor level or reaching overhead, significantly reducing manual handling injury risks."
  }
];

const Module4Section7_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation requires safe housekeeping on construction projects?",
      options: [
        "PUWER 1998",
        "CDM 2015",
        "PPE Regulations 1992",
        "EAWR 1989"
      ],
      correctAnswer: 1,
      explanation: "The Construction (Design and Management) Regulations 2015 (CDM) specifically require safe housekeeping standards to be maintained throughout construction projects."
    },
    {
      id: 2,
      question: "True or False: It is acceptable to leave waste in voids as long as it's out of sight.",
      options: [
        "True",
        "False",
        "Only non-flammable waste",
        "Only for short periods"
      ],
      correctAnswer: 1,
      explanation: "False - leaving waste in voids poses fire risks, breaches regulations, and can interfere with building services or future maintenance access."
    },
    {
      id: 3,
      question: "Name two hazards of poor housekeeping.",
      options: [
        "Better organisation and efficiency",
        "Slips/trips and fire hazards",
        "Improved visibility and access",
        "Reduced material costs"
      ],
      correctAnswer: 1,
      explanation: "Poor housekeeping creates slip, trip and fall hazards from debris, and fire hazards from accumulation of flammable materials near ignition sources."
    },
    {
      id: 4,
      question: "Why should cable reels be stored off the floor?",
      options: [
        "To save space",
        "To prevent damage and trip hazards",
        "To make them look tidy",
        "To avoid colour fading"
      ],
      correctAnswer: 1,
      explanation: "Storing cable reels off the floor prevents damage from moisture, impact, and wheeled traffic, while also eliminating trip hazards for site personnel."
    },
    {
      id: 5,
      question: "What is the recommended safe storage level for heavy materials?",
      options: [
        "Floor level",
        "Waist height",
        "Shoulder height",
        "Above head height"
      ],
      correctAnswer: 1,
      explanation: "Waist height storage minimises manual handling risks by reducing the lifting distance and awkward postures required to access heavy materials."
    },
    {
      id: 6,
      question: "Which piece of equipment helps to manage trailing cables safely?",
      options: [
        "Cable ties",
        "Cable stands or hooks",
        "Plastic bags",
        "Tool boxes"
      ],
      correctAnswer: 1,
      explanation: "Cable stands or hooks keep trailing leads off the floor and organised, preventing trip hazards and cable damage from foot traffic."
    },
    {
      id: 7,
      question: "True or False: Only supervisors are responsible for site housekeeping.",
      options: [
        "True",
        "False",
        "Only for major clean-ups",
        "Only in designated areas"
      ],
      correctAnswer: 1,
      explanation: "False - everyone on site is responsible for housekeeping. Good organisation and cleanliness are shared responsibilities that contribute to overall safety."
    },
    {
      id: 8,
      question: "Give one reason why 'clear as you go' is better than tidying up at the end of the day only.",
      options: [
        "Uses less time overall",
        "Reduces hazards during work, not just at the end",
        "Requires fewer people",
        "Creates less waste"
      ],
      correctAnswer: 1,
      explanation: "'Clear as you go' maintains safety throughout the working day, preventing accidents during work activities rather than allowing hazards to accumulate."
    },
    {
      id: 9,
      question: "Name one legal duty under the Health and Safety at Work Act related to the work area.",
      options: [
        "Provide expensive equipment",
        "Duty to keep workplace safe and without risks to health",
        "Hire additional staff",
        "Work longer hours"
      ],
      correctAnswer: 1,
      explanation: "The Health and Safety at Work Act places a legal duty on employers and employees to keep the workplace safe and without risks to health."
    },
    {
      id: 10,
      question: "Why should all access and escape routes be kept clear?",
      options: [
        "To meet fire safety and emergency requirements",
        "To reduce waste collection times",
        "To improve airflow",
        "To prevent tool loss"
      ],
      correctAnswer: 0,
      explanation: "Clear access and escape routes are essential for fire safety and emergency evacuation, allowing rapid exit in case of incidents or emergencies."
    }
  ];

  const faqs = [
    {
      question: "Whose responsibility is it to keep the work area clean?",
      answer: "Everyone on site – not just labourers or cleaners. Good housekeeping is a shared responsibility that contributes to overall site safety and efficiency. Each trade and individual worker should maintain their work area and contribute to general site cleanliness."
    },
    {
      question: "Can waste be left in voids or risers if hidden?",
      answer: "No – this poses fire risks and breaches regulations. Waste in voids can interfere with building services, create fire hazards, and make future maintenance work dangerous. All waste must be properly disposed of in designated areas."
    },
    {
      question: "Do small tools need to be stored properly even if used frequently?",
      answer: "Yes – leaving them lying around increases trip hazards and risks of damage or theft. Frequently used tools should be kept in tool belts, pouches, or designated areas where they're secure but easily accessible."
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
              <ClipboardList className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.7.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Keeping the Work Area Safe and Organised
          </h1>
          <p className="text-muted-foreground">
            Master workplace organisation and housekeeping practices to maintain safety, efficiency, and legal compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A clean, organised work area prevents accidents and improves efficiency in electrical installation work.</li>
                <li>Legal duties under HASAWA 1974 and CDM 2015 require maintaining safe and organised workspaces.</li>
                <li>Proper tool storage, waste management, and 'clear as you go' practices are essential for site safety.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Trailing cables, scattered tools, waste accumulation, blocked access routes, poor material storage.</li>
                <li><strong>Use:</strong> Tool belts, cable stands, waste bins, designated storage areas, daily tidy-up routines.</li>
                <li><strong>Check:</strong> Clear access routes, secure tool storage, proper waste disposal, organised material storage.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise the risks of a disorganised workspace.</li>
            <li>Apply safe systems for storage and housekeeping.</li>
            <li>Manage waste materials responsibly on site.</li>
            <li>Maintain safe access and escape routes.</li>
            <li>Integrate organisation into daily working routines.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Hazards of a Poorly Managed Workspace */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Hazards of a Poorly Managed Workspace</h3>
            <p className="text-base text-foreground mb-4">
              Disorganised workspaces create multiple serious hazards that can lead to accidents, injuries, and project delays:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Safety and Productivity Hazards</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Slips, trips, and falls</strong> - from trailing cables, scattered tools, packaging materials, and debris</li>
                      <li><strong>Fire hazards</strong> - flammable waste materials left near heat sources, electrical equipment, or ignition points</li>
                      <li><strong>Projectile risks</strong> - loose materials and tools that can fall from heights or be displaced by movement</li>
                      <li><strong>Access obstruction</strong> - blocked pathways preventing emergency evacuation or routine movement</li>
                      <li><strong>Tool and material damage</strong> - equipment left exposed to damage from foot traffic, weather, or impact</li>
                      <li><strong>Security risks</strong> - valuable tools and materials left unattended and vulnerable to theft</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Productivity impacts:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Poor organisation directly affects work efficiency. Time lost searching for tools, delays from damaged materials, and work disruption from accident investigations all contribute to increased project costs and reduced competitiveness.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Psychological effects:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Cluttered, disorganised workspaces increase stress levels, reduce concentration, and contribute to fatigue. This can lead to poor decision-making and increased accident risk, creating a cycle of declining safety standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-5-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Legal Duties */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Legal Duties</h3>
            <p className="text-base text-foreground mb-4">
              Workplace organisation and housekeeping are legal requirements backed by comprehensive legislation and enforcement:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Legislative Requirements and Responsibilities</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Health and Safety at Work Act 1974</strong> - employers and employees have duty to keep workplaces safe and without risks to health</li>
                      <li><strong>CDM Regulations 2015</strong> - require housekeeping standards to be maintained throughout construction projects</li>
                      <li><strong>Workplace Regulations 1992</strong> - specify requirements for workplace cleanliness, lighting, and organisation</li>
                      <li><strong>Management Regulations 1999</strong> - require systematic approach to health and safety management including housekeeping</li>
                      <li><strong>Fire Safety Order 2005</strong> - mandate keeping escape routes clear and managing combustible materials</li>
                      <li><strong>Employer obligations</strong> - provide adequate facilities, training, and systems for maintaining workplace organisation</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Employee responsibilities:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Workers have legal duties to cooperate with housekeeping requirements, use provided facilities properly, report hazards, and take reasonable care for their own and others' safety through maintaining tidy work areas.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Enforcement and consequences:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        HSE inspectors regularly assess housekeeping standards during site visits. Poor organisation can result in improvement notices, prohibition notices, prosecution, and significant financial penalties for both companies and individuals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-5-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Good Housekeeping Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Good Housekeeping Practices</h3>
            <p className="text-base text-foreground mb-4">
              Effective housekeeping requires systematic approaches and consistent application of proven organisational principles:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Systematic Organisation Standards</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Designated storage areas</strong> - store tools and materials neatly in allocated locations with clear identification</li>
                      <li><strong>Progressive clearance</strong> - clear packaging and waste as work progresses, not at end of shift only</li>
                      <li><strong>Route maintenance</strong> - keep walkways, access points, and fire exits free from obstruction at all times</li>
                      <li><strong>Cable management</strong> - coil and secure trailing leads using appropriate stands, hooks, or storage systems</li>
                      <li><strong>Clean as you go</strong> - maintain cleanliness throughout work activities, not just during designated clean-up periods</li>
                      <li><strong>Daily inspection</strong> - conduct end-of-shift checks to identify and address potential hazards</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>5S methodology application:</strong></p>
                      <ul className="text-xs text-muted-foreground list-disc ml-4 space-y-1">
                        <li><strong>Sort:</strong> Remove unnecessary items from work area</li>
                        <li><strong>Set in order:</strong> Organise remaining items logically</li>
                        <li><strong>Shine:</strong> Clean and maintain the work area</li>
                        <li><strong>Standardise:</strong> Establish consistent procedures</li>
                        <li><strong>Sustain:</strong> Maintain standards through regular review</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Visual management techniques:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Use colour coding, labels, floor markings, and designated areas to make organisation standards visible and easy to maintain. Clear visual cues help all site personnel understand and maintain housekeeping requirements consistently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-5-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Tool and Material Organisation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Tool and Material Organisation</h3>
            <p className="text-base text-foreground mb-4">
              Proper tool and material organisation prevents damage, reduces handling risks, and improves work efficiency:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Systematic Tool and Material Management</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Personal tool organisation</strong> - use tool belts, pouches, or boxes to keep hand tools accessible and secure</li>
                      <li><strong>Cable reel management</strong> - label reels clearly and store off the floor using stands or designated areas</li>
                      <li><strong>Ergonomic storage</strong> - keep heavy items at waist level to reduce manual handling injury risk</li>
                      <li><strong>Environmental protection</strong> - protect materials from weather, contamination, and physical damage</li>
                      <li><strong>Inventory control</strong> - maintain accurate records of tool and material locations and condition</li>
                      <li><strong>Security measures</strong> - secure valuable items in lockable storage or supervised areas</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Tool storage hierarchy:</strong></p>
                      <ul className="text-xs text-muted-foreground list-disc ml-4 space-y-1">
                        <li><strong>Daily use tools:</strong> Tool belt, pouch, or personal toolbox</li>
                        <li><strong>Regular use tools:</strong> Secure vehicle storage or site toolbox</li>
                        <li><strong>Occasional use tools:</strong> Lockable site storage with check-out system</li>
                        <li><strong>Specialist equipment:</strong> Controlled storage with training records</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded border border-amber-200/30">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Material storage considerations:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Consider material characteristics when planning storage: cable sensitivity to crushing and moisture, conduit susceptibility to dents and corrosion, electrical accessories requiring protection from contamination, and hazardous materials needing special storage conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Waste Management */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Waste Management</h3>
            <p className="text-base text-foreground mb-4">
              Responsible waste management is essential for safety, environmental protection, and regulatory compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Comprehensive Waste Management Systems</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Waste segregation</strong> - separate materials by type (metal, plastic, general) where recycling facilities are provided</li>
                      <li><strong>Designated disposal</strong> - use provided skips and bins, avoid accumulating waste near work areas</li>
                      <li><strong>Hazardous waste management</strong> - follow special procedures for contaminated or dangerous materials</li>
                      <li><strong>Facility monitoring</strong> - report overflowing or inadequate waste facilities to supervisors immediately</li>
                      <li><strong>Documentation</strong> - maintain records for hazardous waste disposal and recycling activities</li>
                      <li><strong>Environmental responsibility</strong> - minimise waste generation and maximise recycling opportunities</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Common electrical waste categories:</strong></p>
                      <ul className="text-xs text-muted-foreground list-disc ml-4 space-y-1">
                        <li><strong>Metal waste:</strong> Cable offcuts, conduit, trunking, and metal accessories</li>
                        <li><strong>Plastic waste:</strong> Cable insulation, conduit, trunking, and plastic accessories</li>
                        <li><strong>Packaging:</strong> Cardboard, plastic wrapping, and protective materials</li>
                        <li><strong>Hazardous waste:</strong> Contaminated materials, batteries, and fluorescent tubes</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-background/50 rounded border">
                      <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Legal compliance requirements:</strong></p>
                      <p className="text-xs text-muted-foreground">
                        Waste management is regulated under Environmental Protection Act, Waste Regulations, and site-specific licenses. Improper disposal can result in prosecution, fines, and environmental damage claims. Always follow established procedures and seek guidance when uncertain.
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
              <h3 className="font-medium text-foreground mb-2">Continuous Housekeeping Practices</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-5">
                <li>Always "clear as you go" – never leave cuttings, insulation, or packaging to build up during work</li>
                <li>Keep a small brush and pan for quickly clearing debris from confined workspaces</li>
                <li>At the end of every shift, spend 5 minutes checking the area for potential hazards</li>
                <li>Report housekeeping issues immediately rather than allowing problems to accumulate</li>
              </ul>
            </div>
            
            <div className="p-4 bg-card rounded-lg border border-border/10">
              <h3 className="font-medium text-foreground mb-2">Tool and Material Management</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-5">
                <li>Use cable stands to prevent drums rolling loose around site and creating hazards</li>
                <li>Coil and hang extension leads when not in use to prevent trip hazards and cable damage</li>
                <li>Label personal tools clearly to prevent mix-ups and potential theft</li>
                <li>Store frequently used items in consistent locations to reduce search time</li>
              </ul>
            </div>
            
            <div className="p-4 bg-card rounded-lg border border-border/10">
              <h3 className="font-medium text-foreground mb-2">Safety and Compliance</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-5">
                <li>Keep fire exits and escape routes completely clear at all times</li>
                <li>Never store materials in building voids or service areas</li>
                <li>Use appropriate waste bins and recycling facilities as provided</li>
                <li>Maintain vehicle loading areas clear for emergency access</li>
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
                  <h3 className="font-medium text-red-800 dark:text-emerald-400 mb-2">Case Study 1: Trip Hazard Injury</h3>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    On a refurbishment project, an apprentice left offcuts of twin-and-earth cable and packaging across a corridor. A site supervisor tripped over the debris and injured his wrist, requiring hospital treatment and time off work.
                  </p>
                  <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                    <strong>Prevention:</strong> Following "clear as you go" principles would have prevented this accident. The incident led to stricter housekeeping enforcement and highlighted how poor organisation can cause serious injuries to any site personnel.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-red-200/50 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-emerald-400 mb-2">Case Study 2: Fire Hazard from Poor Waste Management</h3>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    Flammable packaging materials were left near a temporary electrical distribution board on a construction site. Overheating equipment ignited the materials, causing a significant fire that damaged work already completed and delayed the project by several weeks.
                  </p>
                  <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                    <strong>Prevention:</strong> Proper waste disposal and maintaining clear areas around electrical equipment would have prevented this fire. The incident resulted in substantial financial losses and HSE investigation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-green-200/50 bg-green-50/50 dark:bg-green-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Case Study 3: Effective Organisation System</h3>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    A large office installation project implemented systematic housekeeping procedures with designated storage areas, daily clean-up routines, and clear responsibility assignments. The project completed ahead of schedule with zero housekeeping-related incidents.
                  </p>
                  <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                    <strong>Good Practice:</strong> Systematic organisation improved efficiency, reduced material waste, and created a positive safety culture. The client praised the professional appearance and minimal disruption to their ongoing operations.
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
                <span className="font-medium text-foreground">Clear as you go – don't leave clutter</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Store tools and materials neatly</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Keep access routes and exits clear</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Manage waste responsibly</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">End every shift with a tidy-up check</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-foreground">Everyone is responsible for site housekeeping</span>
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
            <li>The hazards of cluttered and disorganised workspaces.</li>
            <li>Legal obligations under HASAWA and CDM for safe housekeeping.</li>
            <li>Best practice for tool and material organisation.</li>
            <li>How to manage waste responsibly.</li>
            <li>Practical steps to keep the site safer and more productive.</li>
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
            <Link to="module4-section7/subsection4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back: Working in Voids, Risers, and Ceilings
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="module4-section7/subsection6" className="flex items-center gap-2">
              Next: Environmental Considerations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section7_5;
