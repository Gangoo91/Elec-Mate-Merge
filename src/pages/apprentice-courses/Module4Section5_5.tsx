import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dressing Cables Neatly Within Boxes and Enclosures - Module 4.5.5 | Level 2 Electrical Course";
const DESCRIPTION = "Master professional cable dressing techniques for boxes, enclosures, and distribution boards. Learn layout planning, securing methods, and BS 7671 compliance for safe, accessible installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Name one reason why neat cable dressing is important beyond appearance.",
    options: ["It looks professional", "Improves airflow and reduces heat build-up", "It saves money", "It reduces material costs"],
    correctIndex: 1,
    explanation: "Neat cable dressing improves airflow, reduces heat build-up, prevents strain on terminations, and makes maintenance easier - all critical safety and operational benefits."
  },
  {
    id: 2,
    question: "What must be avoided when using cable ties?",
    options: ["Using too many ties", "Over-tightening that crushes insulation", "Using different colours", "Cutting them too short"],
    correctIndex: 1,
    explanation: "Over-tightening cable ties can crush cable insulation, potentially causing short circuits and reducing the cable's current-carrying capacity."
  },
  {
    id: 3,
    question: "Why should ELV and mains cables be separated?",
    options: ["For colour coding", "To reduce electromagnetic interference and safety", "To save space", "For easier identification"],
    correctIndex: 1,
    explanation: "ELV and mains cables must be separated to prevent electromagnetic interference and ensure safety by avoiding voltage transfer between systems."
  }
];

const Module4Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which is NOT a benefit of neat cable dressing?",
      options: [
        "Reduced heat build-up",
        "Improved fault finding", 
        "Increased voltage drop",
        "Enhanced accessibility"
      ],
      correctAnswer: 2,
      explanation: "Neat cable dressing reduces voltage drop by avoiding sharp bends and overcrowding, rather than increasing it."
    },
    {
      id: 2,
      question: "True or False: Over-tightening cable ties is acceptable if it holds cables securely.",
      options: [
        "True",
        "False",
        "Only for small cables",
        "Only in dry locations"
      ],
      correctAnswer: 1,
      explanation: "False - Over-tightening cable ties can crush insulation, damage conductors, and create safety hazards."
    },
    {
      id: 3,
      question: "Name one tool or accessory used to secure cables inside enclosures.",
      options: [
        "Cable ties",
        "Cable clamps",
        "Adhesive clips",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Cable ties, clamps, and adhesive clips are all suitable for securing cables inside enclosures when properly rated."
    },
    {
      id: 4,
      question: "Why should cables be grouped by function?",
      options: [
        "For logical routing and easier maintenance",
        "To save money",
        "To reduce cable length",
        "For colour coordination"
      ],
      correctAnswer: 0,
      explanation: "Grouping by function enables logical routing, easier fault finding, and simplified maintenance procedures."
    },
    {
      id: 5,
      question: "What should be avoided to prevent blocking access to other terminals?",
      options: [
        "Using cable ties",
        "Crossing over terminals",
        "Colour coding cables",
        "Securing cables"
      ],
      correctAnswer: 1,
      explanation: "Crossing over terminals blocks access to other connections, making maintenance and testing difficult or impossible."
    },
    {
      id: 6,
      question: "Which regulation covers the requirement for avoiding undue stress on terminations?",
      options: [
        "BS 5839",
        "BS 7671",
        "BS EN 50172", 
        "BS 6701"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires that wiring in enclosures is arranged to avoid undue stress on terminations and conductors."
    },
    {
      id: 7,
      question: "Why is a final visual inspection before closing the enclosure important?",
      options: [
        "To ensure neatness, compliance, and accessibility",
        "To count the cables",
        "To check cable colours",
        "To measure cable length"
      ],
      correctAnswer: 0,
      explanation: "Final inspection ensures neatness, BS 7671 compliance, accessibility for future work, and professional standards."
    },
    {
      id: 8,
      question: "Give one method for identifying cables inside an enclosure.",
      options: [
        "Numbered cable markers",
        "Colour-coded sleeving",
        "Cable labelling",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Numbered markers, colour coding, and labelling are all effective methods for cable identification in enclosures."
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
              <Wrench className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.5.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Dressing Cables Neatly Within Boxes and Enclosures
          </h1>
          <p className="text-muted-foreground">
            Master professional cable dressing techniques for safe, accessible, and compliant installations in all types of electrical enclosures.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cable dressing arranges conductors neatly and logically inside enclosures.</li>
                <li>Good dressing improves safety, accessibility, and compliance with BS 7671.</li>
                <li>Poor dressing leads to overcrowding, heat build-up, and unsafe connections.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cable entry points, circuit groupings, space constraints.</li>
                <li><strong>Use:</strong> Logical routing, proper securing, adequate support systems.</li>
                <li><strong>Check:</strong> No stress on terminations, clear access, professional appearance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain why neat cable dressing is essential for safety, efficiency, and professional standards.</li>
            <li>Arrange conductors in a logical and accessible manner inside boxes and enclosures of all types.</li>
            <li>Use appropriate fixing and securing methods for different cable types and installation environments.</li>
            <li>Avoid common cable dressing mistakes that compromise safety, accessibility, or compliance.</li>
            <li>Apply BS 7671 and manufacturer recommendations for cable management inside enclosures.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Purpose of Neat Cable Dressing */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Purpose and Benefits of Professional Cable Dressing</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Professional cable dressing provides multiple safety, operational, and maintenance benefits:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Safety and Operational Benefits</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Heat management:</strong> Improves airflow and reduces heat build-up in enclosures.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Prevents hotspots that can cause insulation degradation</li>
                      <li>Maintains current-carrying capacity by avoiding thermal de-rating</li>
                      <li>Reduces risk of fire from overheated connections</li>
                      <li>Allows proper operation of thermal protection devices</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Mechanical protection:</strong> Prevents strain on terminations and conductor damage.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Eliminates stress on terminal connections from cable weight</li>
                      <li>Prevents conductor fatigue from vibration and movement</li>
                      <li>Protects against physical damage during maintenance</li>
                      <li>Maintains integrity of protective earthing connections</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Maintenance efficiency:</strong> Enables quick identification and safe working.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Rapid fault location and circuit tracing</li>
                      <li>Safe access to all termination points</li>
                      <li>Clear visibility for visual inspections</li>
                      <li>Reduced time for testing and certification</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional standard:</strong> Well-dressed installations demonstrate competence and attention to safety
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Planning Cable Layout */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Planning and Layout Strategy</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic planning ensures efficient use of space and logical cable arrangements:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Strategic Layout Planning</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Pre-installation planning:</strong> Review all documentation before cable installation begins.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Study wiring diagrams and circuit allocation schedules</li>
                      <li>Identify cable entry points and optimal routing paths</li>
                      <li>Plan for future additions and modifications</li>
                      <li>Consider maintenance access requirements from day one</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Functional grouping principles:</strong> Organise circuits by type and purpose.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Group lighting circuits together for easy identification</li>
                      <li>Separate power circuits by load type (socket, dedicated equipment)</li>
                      <li>Keep control and instrumentation cables in designated areas</li>
                      <li>Maintain logical sequence matching circuit numbering</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Space allocation strategy:</strong> Plan for adequate working room and future expansion.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Allow 25% spare capacity for future circuits</li>
                      <li>Reserve space for testing equipment access</li>
                      <li>Plan cable slack for re-termination during maintenance</li>
                      <li>Ensure compliance with manufacturer space requirements</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Planning tip:</strong> Sketch the layout before installation to identify potential issues early
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-ties-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Securing and Separation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Securing Methods and Cable Separation</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper securing and separation ensure safety, compliance, and optimal performance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Professional Securing Techniques</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Cable tie selection and application:</strong> Choose appropriate ties for the environment and load.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Nylon ties: Standard indoor applications up to 85°C</li>
                      <li>Stainless steel ties: High temperature and corrosive environments</li>
                      <li>Releasable ties: Where frequent access is required</li>
                      <li>Correct tension: Firm but not crushing - should slide with resistance</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Alternative securing methods:</strong> Select based on installation requirements.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Cable clamps: For heavy cables requiring robust support</li>
                      <li>Adhesive clips: Clean appearance in visible installations</li>
                      <li>Cable trunking: Where multiple cables need organised routing</li>
                      <li>Conduit systems: For maximum mechanical protection</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical rule:</strong> Support cables independently - never rely on terminations for mechanical support
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Voltage Separation Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>ELV and mains separation:</strong> Prevent interference and ensure safety compliance.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Maintain minimum 50mm separation or use barriers</li>
                      <li>Use separate cable routes where possible</li>
                      <li>Apply segregated trunking for mixed installations</li>
                      <li>Consider electromagnetic compatibility requirements</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Data cable considerations:</strong> Minimise electromagnetic interference.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Route power and data cables at 90° when crossing</li>
                      <li>Maintain separation distance based on cable category</li>
                      <li>Use screened cables where separation cannot be maintained</li>
                      <li>Ground cable screens properly to prevent interference</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> Different voltage systems must be segregated unless specially designed for mixed use
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="separation-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Problems and Compliance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Avoiding Common Problems and Ensuring Compliance</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Understanding common mistakes prevents installation failures and ensures regulatory compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Common Dressing Problems to Avoid</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Overcrowding enclosures making access difficult or impossible</li>
                      <li>Excessive slack creating untidy loops that waste space</li>
                      <li>Sharp bends exceeding cable minimum bend radius specifications</li>
                      <li>Crossing over terminals blocking access to other connections</li>
                      <li>Inadequate support allowing cables to hang on terminations</li>
                      <li>Mixed voltage levels without proper separation or barriers</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Inspection focus:</strong> These issues are frequently identified during electrical inspections and testing
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">BS 7671 and Manufacturer Compliance</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>BS 7671 requirements:</strong> Fundamental regulations for cable arrangement.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Wiring must be arranged to avoid undue stress on terminations</li>
                      <li>Conductors must be protected against mechanical damage</li>
                      <li>Different voltage systems require appropriate separation</li>
                      <li>Access for inspection, testing, and maintenance must be maintained</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Manufacturer specifications:</strong> Follow equipment-specific requirements.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Consumer unit cable entry points and routing paths</li>
                      <li>Distribution board internal clearances and spacing</li>
                      <li>Control panel wiring zones and segregation requirements</li>
                      <li>Equipment-specific torque values and connection methods</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Documentation:</strong> Maintain records of compliance with all applicable standards and manufacturer instructions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          {/* Enclosure-Specific Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Enclosure-Specific Dressing Techniques</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Consumer Units and Distribution Boards</p>
                <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                  <li>Use manufacturer-specified cable routes and entry points</li>
                  <li>Group circuits by type: lighting, sockets, dedicated loads</li>
                  <li>Route neutral conductors directly to neutral bar without crossing</li>
                  <li>Keep CPC conductors together in neat bundles with green/yellow sleeving</li>
                  <li>Allow working space for MCB operation and meter connections</li>
                  <li>Label all circuits clearly at both ends for easy identification</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium text-foreground mb-2">Back Boxes and Accessory Enclosures</p>
                <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                  <li>Keep cables at sides of box, leaving centre clear for accessory</li>
                  <li>Form gentle loops to accommodate accessory fitting</li>
                  <li>Ensure adequate conductor length for termination (150mm minimum)</li>
                  <li>Protect cables from sharp edges using grommets or protective sleeves</li>
                  <li>Check no cables are trapped when fitting accessory faceplate</li>
                  <li>Maintain bend radius limits especially in shallow boxes</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Control Panels and Industrial Enclosures</p>
                <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                  <li>Use designated cable trunking and routing channels</li>
                  <li>Segregate power, control, and instrumentation cables</li>
                  <li>Apply systematic numbering matching circuit documentation</li>
                  <li>Use cable glands rated for environmental conditions</li>
                  <li>Maintain access corridors for maintenance and modifications</li>
                  <li>Install cable supports at regular intervals per manufacturer specifications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Installation Process */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Step-by-Step Installation Process</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium text-foreground mb-2">Phase 1: Pre-Installation Planning</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Review circuit diagrams and identify all cable entry points</li>
                  <li>Plan routing paths to minimise crossovers and maximise accessibility</li>
                  <li>Select appropriate cable securing materials for environment</li>
                  <li>Identify segregation requirements for different voltage levels</li>
                  <li>Plan cable length requirements including termination allowances</li>
                  <li>Prepare cable identification labels and markers</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-card border border-cyan-400/30">
                <p className="font-medium text-foreground mb-2">Phase 2: Cable Installation and Routing</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Install main cables first, working from largest to smallest</li>
                  <li>Route cables in planned groups maintaining required separations</li>
                  <li>Apply temporary securing to hold position during installation</li>
                  <li>Check bend radius compliance at all points</li>
                  <li>Install cable identification at appropriate intervals</li>
                  <li>Verify no mechanical stress on any connections</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-foreground mb-2">Phase 3: Final Dressing and Securing</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Apply permanent cable securing using appropriate methods</li>
                  <li>Trim cable ties and remove excess securing materials</li>
                  <li>Verify all terminations are accessible for testing</li>
                  <li>Check compliance with manufacturer clearance requirements</li>
                  <li>Perform final visual inspection before closing enclosure</li>
                  <li>Document any deviations from standard requirements</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Quality Assurance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Quality Assurance and Inspection Checklist</h3>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="text-xs sm:text-sm text-foreground mb-3"><strong>Pre-closure inspection checklist:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-foreground">
                <div>
                  <p className="font-medium mb-2">Safety Compliance:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>□ No stress on any termination points</li>
                    <li>□ All cables properly supported</li>
                    <li>□ Voltage separation maintained</li>
                    <li>□ No damaged insulation visible</li>
                    <li>□ CPC conductors properly sleeved</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Professional Standards:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>□ Neat and logical arrangement</li>
                    <li>□ Clear access to all terminations</li>
                    <li>□ Proper cable identification</li>
                    <li>□ Compliance with manufacturer specs</li>
                    <li>□ Ready for testing and inspection</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-2 bg-background/50 rounded border">
                <p className="text-xs text-foreground"><strong>Documentation:</strong> Photograph completed installations for quality records and future reference.</p>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-card border border-amber-400/30">
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Case Study 1: Industrial Control Panel Failure</strong>
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                During a periodic inspection, an industrial control panel failed due to cables being left loose and unsupported. The movement caused terminations to loosen over time, leading to overheating, arcing, and eventual system failure. Investigation revealed high resistance connections up to 10Ω where they should have been less than 0.1Ω. After re-dressing and securing all cables with appropriate supports, the system passed inspection and has operated reliably for over 5 years without further issues.
              </p>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Case Study 2: Consumer Unit Upgrade Success</strong>
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                A domestic consumer unit replacement required careful planning due to space constraints and the need to maintain power to critical circuits. By pre-planning the cable layout and using systematic dressing techniques, all 16 circuits were successfully transferred with minimal disruption. The neat installation impressed the homeowner and passed inspection first time, with the inspector specifically commenting on the professional standard of workmanship.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Case Study 3: Data Centre Installation Excellence</strong>
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                A critical data centre installation required power and data cables in the same enclosures while maintaining electromagnetic compatibility. Using segregated trunking and systematic cable dressing, over 200 cables were installed meeting all EMC requirements. The installation achieved 99.99% uptime over 3 years with no interference-related issues, demonstrating the importance of proper cable management in sensitive environments.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: Is it acceptable to leave long loops of spare cable inside an enclosure?</h4>
              <p className="text-sm text-muted-foreground">A: Only if necessary for maintenance access, but loops should be neatly secured and positioned to avoid obstructing other components or blocking ventilation.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: Can cable ties be replaced with adhesive cable clips inside enclosures?</h4>
              <p className="text-sm text-muted-foreground">A: Yes, as long as they are rated for the temperature and environmental conditions of the enclosure and provide adequate support for the cable type.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: What if I can't maintain separation between ELV and mains cables?</h4>
              <p className="text-sm text-muted-foreground">A: Use segregated trunking or suitable cable types with insulation rated for the higher voltage, ensuring compliance with BS 7671 requirements.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: How tight should cable ties be when securing cables?</h4>
              <p className="text-sm text-muted-foreground">A: Firm enough to provide support but loose enough that the cable can slide with some resistance. Over-tightening can crush insulation and damage conductors.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-foreground">
            Neat cable dressing is about safety, compliance, and professional efficiency. Logical routing, proper securing, and adherence to BS 7671 standards make installations easier to inspect, maintain, and troubleshoot — while leaving a lasting impression of quality workmanship. Professional cable dressing reflects technical competence and commitment to electrical safety standards.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz (8 Questions)</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Test your understanding of cable dressing techniques and requirements
          </p>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to="../5-4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Using Ferrules, Sleeving, Glands, and Crimps
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-6" className="flex items-center gap-2">
              Next: Testing for Polarity and Continuity During Install
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_5;