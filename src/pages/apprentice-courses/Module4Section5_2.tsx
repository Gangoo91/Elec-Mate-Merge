import { ArrowLeft, ArrowRight, Lightbulb, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Installing Lighting Points and Pendants - Module 4.5.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master the installation of lighting points and pendants with correct positioning, secure mounting, safe wiring, and compliance with BS 7671. Learn planning, fixing methods, and testing procedures.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a cord grip on a pendant fitting?",
    options: ["To improve appearance", "To prevent cable strain on terminals", "To reduce electrical resistance"],
    correctIndex: 1,
    explanation: "Cord grips prevent mechanical strain being transferred to electrical terminals, maintaining safe connections and preventing conductor pull-out."
  },
  {
    id: 2,
    question: "Why should pendant heights be at least 2m above floor level in walkways?",
    options: ["For better lighting", "To prevent head contact and ensure safety", "To save energy"],
    correctIndex: 1,
    explanation: "Minimum 2m clearance prevents people from hitting their heads on pendants in circulation areas, ensuring safe passage."
  },
  {
    id: 3,
    question: "In which BS 7671 section are bathroom lighting requirements detailed?",
    options: ["Section 411", "Section 522", "Section 701"],
    correctIndex: 2,
    explanation: "BS 7671 Section 701 covers special installations in locations containing a bath or shower, including lighting requirements and IP ratings."
  }
];

const Module4Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the role of a ceiling rose in domestic lighting installations?",
      options: [
        "To supply extra circuit protection",
        "To provide mechanical support and connection points",
        "To reduce voltage to the fitting",
        "To act as a junction for power tools"
      ],
      correctAnswer: 1,
      explanation: "Ceiling roses provide both mechanical support for light fittings and electrical connection points, distributing the load safely to the ceiling structure."
    },
    {
      id: 2,
      question: "True or False: The weight of a pendant fitting should be supported entirely by the electrical cable.",
      options: [
        "True", 
        "False",
        "Only for lightweight fittings",
        "Only if using SWA cable"
      ],
      correctAnswer: 1,
      explanation: "False – mechanical support must be provided separately from the electrical cable to prevent strain on connections and ensure safety."
    },
    {
      id: 3,
      question: "Name two environments where enclosed light fittings are typically required.",
      options: [
        "Bathrooms and dusty workshops",
        "Living rooms and bedrooms",
        "Offices and corridors",
        "Gardens and patios"
      ],
      correctAnswer: 0,
      explanation: "Bathrooms, dusty workshops, and damp industrial areas require enclosed fittings with appropriate IP ratings for protection."
    },
    {
      id: 4,
      question: "What colour is the live conductor in modern UK lighting circuits?",
      options: [
        "Blue",
        "Brown", 
        "Green/yellow",
        "Black"
      ],
      correctAnswer: 1,
      explanation: "Brown is the live conductor colour in modern UK wiring according to BS 7671 harmonised colours."
    },
    {
      id: 5,
      question: "Which BS 7671 section applies to bathroom lighting installations?",
      options: [
        "Section 411",
        "Section 522",
        "Section 701",
        "Section 415"
      ],
      correctAnswer: 2,
      explanation: "Section 701 covers special installations in locations containing a bath or shower, including specific lighting requirements."
    },
    {
      id: 6,
      question: "What device prevents the cable from pulling out of a pendant fitting?",
      options: [
        "Terminal block",
        "Cord grip or strain relief device",
        "Junction box",
        "Circuit breaker"
      ],
      correctAnswer: 1,
      explanation: "Cord grips or strain relief devices prevent mechanical stress from being transferred to electrical connections."
    },
    {
      id: 7,
      question: "Why should pendant lighting be installed at least 2m above floor level in walkways?",
      options: [
        "To improve light distribution",
        "To prevent head contact and ensure safe clearance",
        "To save energy",
        "To comply with fire regulations"
      ],
      correctAnswer: 1,
      explanation: "Minimum 2m clearance prevents people from hitting their heads on pendants, ensuring safe passage in circulation areas."
    },
    {
      id: 8,
      question: "Give one method for ensuring a pendant hangs centrally over a dining table.",
      options: [
        "Estimate by eye",
        "Use a plumb line or laser pointer to check alignment",
        "Measure from the walls only",
        "Install without checking"
      ],
      correctAnswer: 1,
      explanation: "Using a plumb line or laser pointer ensures accurate central positioning over furniture for both function and aesthetics."
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
              <Lightbulb className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.5.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Installing Lighting Points and Pendants
          </h1>
          <p className="text-muted-foreground">
            Master the installation of lighting points and pendants, combining functional wiring, safe support, and aesthetic placement according to BS 7671 and manufacturer requirements.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Position lighting points for even illumination and aesthetic appeal.</li>
                <li>Use appropriate fixings for ceiling construction and fitting weight.</li>
                <li>Provide mechanical support separate from electrical connections.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Ceiling structure, fitting weight, environmental requirements.</li>
                <li><strong>Use:</strong> Appropriate fixings, cord grips, proper support methods.</li>
                <li><strong>Check:</strong> Alignment, clearance heights, secure mounting, polarity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify the correct location and support requirements for lighting points in different environments.</li>
            <li>Select the appropriate type of lighting fitting for specific environmental conditions and applications.</li>
            <li>Wire lighting points safely and in accordance with circuit requirements and BS 7671 regulations.</li>
            <li>Securely mount pendants to prevent strain on electrical connections and ensure structural integrity.</li>
            <li>Test lighting installations for correct operation, safety, and compliance before commissioning.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Planning Location and Environmental Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Planning Location and Environmental Requirements</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Effective lighting design requires careful planning of position, coverage, and environmental suitability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Positioning for Optimal Illumination</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Room lighting principles:</strong> Centre points provide even distribution unless furniture layout dictates otherwise.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Task lighting considerations:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Kitchen islands: position directly over work surfaces for shadow-free lighting</li>
                      <li>Dining tables: centre pendant at appropriate height for ambient dining light</li>
                      <li>Stairwells: ensure adequate coverage at top, bottom, and intermediate landings</li>
                      <li>Living areas: avoid positioning over seating to prevent glare</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Safety clearances:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Minimum 2.0m above floor level in circulation areas</li>
                      <li>2.2m minimum in commercial and public spaces</li>
                      <li>Account for furniture height when determining pendant drops</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Design consideration:</strong> Use architectural drawings and furniture layouts for accurate positioning
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Ceiling Structure and Load Assessment</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Structural considerations:</strong> Identify ceiling construction type before specifying fixing method.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Ceiling construction types:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Solid concrete: Direct fixing with suitable anchors and plugs</li>
                      <li>Suspended plasterboard: Locate joists for structural fixings or use appropriate cavity fixings</li>
                      <li>Lath and plaster: Require careful assessment and often additional support plates</li>
                      <li>Metal grid ceilings: Use manufacturer-approved support brackets</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Weight limitations:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Standard plasterboard ceiling: maximum 5kg per fixing point</li>
                      <li>Heavy decorative fittings: require structural support independent of ceiling</li>
                      <li>Chandeliers and large pendants: ceiling hook or beam attachment essential</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety requirement:</strong> Never rely solely on plasterboard for heavy lighting fixtures
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Environmental and Special Location Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>IP rating requirements by location:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Bathroom zones: IP44 minimum (IP65 in shower areas)</li>
                      <li>Kitchen areas: IP44 recommended near sinks and cooking areas</li>
                      <li>External covered areas: IP54 minimum for weather protection</li>
                      <li>Industrial/workshop areas: IP65 for dust and moisture protection</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>BS 7671 Section 701 bathroom requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Zone 0: No electrical fittings permitted</li>
                      <li>Zone 1: IP65, low voltage only (SELV)</li>
                      <li>Zone 2: IP44 minimum, suitable for bathroom use</li>
                      <li>Outside zones: Standard fittings acceptable if suitable for humid conditions</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Compliance note:</strong> All bathroom lighting must comply with Section 701 zone restrictions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="planning-location-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Types of Lighting Points and Selection */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Types of Lighting Points and Selection</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Selecting appropriate lighting points and fittings ensures optimal performance, safety, and compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Ceiling Rose Systems</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Standard ceiling rose:</strong> Most common in domestic installations, providing connection points and strain relief.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Loop-in ceiling rose applications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Domestic lighting circuits with switch control</li>
                      <li>Simple pendant connections with cord grip facility</li>
                      <li>Two-way switching arrangements with loop-in connections</li>
                      <li>Traditional installations requiring accessible connection points</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Ceiling rose specifications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>5A terminal blocks for lighting circuits</li>
                      <li>Integral cord grip for pendant support</li>
                      <li>Heat-resistant construction suitable for lamp heat</li>
                      <li>Hook facility for temporary pendant support during installation</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Installation note:</strong> Ceiling roses must be securely fixed to ceiling structure, not just plasterboard
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Pendant Fitting Types and Applications</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Decorative pendants:</strong> Aesthetic focus with varied materials, weights, and drop lengths.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Pendant classifications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Lightweight: up to 2kg, suitable for standard ceiling rose mounting</li>
                      <li>Medium weight: 2-5kg, requires secure ceiling fixing and strain relief</li>
                      <li>Heavy duty: over 5kg, needs structural support independent of electrical connection</li>
                      <li>Adjustable height: mechanisms for varying drop length post-installation</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Functional pendant considerations:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Task lighting: focused downward illumination for work surfaces</li>
                      <li>Ambient lighting: diffused output for general room illumination</li>
                      <li>Multi-pendant systems: coordinated installations for large spaces</li>
                      <li>Dimmable compatibility: ensure fittings support dimming systems</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Selection criteria:</strong> Match pendant type to application, environment, and ceiling capacity
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Enclosed and Specialised Lighting Points</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Enclosed fittings:</strong> Essential for damp, dusty, or corrosive environments.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Environmental applications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Bathroom installations: IP44 minimum, often with integral transformers</li>
                      <li>Kitchen areas: sealed units resistant to steam and cooking vapours</li>
                      <li>Workshop environments: impact-resistant designs with high IP ratings</li>
                      <li>External covered areas: weather-resistant with UV protection</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Downlight connection systems:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Fire-rated downlights: maintain ceiling fire integrity</li>
                      <li>Insulation-compatible designs: IC-rated for contact with insulation</li>
                      <li>Adjustable and fixed types: directional control for accent lighting</li>
                      <li>LED-specific connectors: ensure compatibility with LED drivers</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> All recessed fittings must maintain building fire rating integrity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="lighting-types-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Wiring and Installation Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Wiring and Installation Procedures</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic wiring and installation procedures ensure safety, compliance, and reliable operation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Circuit Design and Connection Methods</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Loop-in ceiling rose wiring:</strong> Most common domestic lighting circuit configuration.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Connection arrangements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Permanent live: brown conductor from supply to rose and onward</li>
                      <li>Switched live: brown return from switch to light fitting</li>
                      <li>Neutral: blue conductor linking through all points</li>
                      <li>Circuit protective conductor: green/yellow earthing all metalwork</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Two-way switching systems:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Strappers: grey and black conductors between two-way switches</li>
                      <li>Intermediate switching: additional switching points in circuit</li>
                      <li>Common terminal identification: ensure correct switch connections</li>
                      <li>Permanent live marking: clearly identify unswitched supplies</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical check:</strong> Verify switching operates correct lighting point before commissioning
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Pendant Connection and Strain Relief</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Cord grip installation:</strong> Essential for preventing strain on electrical connections.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Pendant cable requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Flexible cord: 3-core 0.75mm² minimum for standard pendants</li>
                      <li>Heat-resistant cable: required for high-temperature lamp environments</li>
                      <li>Length calculation: allow for ceiling height plus required drop</li>
                      <li>Colour coding: brown (live), blue (neutral), green/yellow (earth)</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Mechanical support systems:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Ceiling hooks: independent support for heavy decorative fittings</li>
                      <li>Support chains or cables: for chandeliers and large pendants</li>
                      <li>Adjustable drop mechanisms: height variation post-installation</li>
                      <li>Anti-rotation devices: prevent twisting of pendant fittings</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety principle:</strong> Electrical connections must never carry mechanical loads
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Junction Box and Alternative Connection Methods</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Separate junction box systems:</strong> Modern alternative to loop-in ceiling roses.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Junction box applications:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Recessed downlight installations: accessible above false ceilings</li>
                      <li>Multiple light control: single switch controlling several points</li>
                      <li>Clean ceiling appearance: no visible connection points</li>
                      <li>Maintenance access: accessible connections separate from fittings</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Plug-in connection systems:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Quick-connect pendant systems: tool-free installation and removal</li>
                      <li>Track lighting connectors: flexible positioning and reconfiguration</li>
                      <li>Modular ceiling systems: integrated electrical connections</li>
                      <li>Emergency lighting: maintained and non-maintained systems</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Accessibility requirement:</strong> All electrical connections must remain accessible for inspection and maintenance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="wiring-procedures-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Testing and Safety Compliance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Testing and Safety Compliance</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Comprehensive testing ensures lighting installations meet safety standards and operate correctly:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Electrical Testing Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Pre-energising tests:</strong> Essential safety verification before commissioning.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Test sequence (BS 7671 Part 6):</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity of protective conductors: verify earth path integrity</li>
                      <li>Continuity of ring final circuits: if applicable to lighting circuits</li>
                      <li>Insulation resistance: minimum 1MΩ at 500V DC between conductors</li>
                      <li>Polarity verification: ensure correct conductor identification</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Switch operation verification:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Single-way switching: on/off operation of correct lighting points</li>
                      <li>Two-way switching: control from both switch positions</li>
                      <li>Intermediate switching: operation from all switching points</li>
                      <li>Dimmer compatibility: smooth operation across full range</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Documentation requirement:</strong> Record all test results on electrical installation certificate
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Functional and Operational Testing</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Light output verification:</strong> Ensure adequate illumination levels for intended use.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Functional test procedures:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Lamp compatibility: verify correct lamp type and wattage</li>
                      <li>Heat testing: check for excessive temperature rise in enclosed fittings</li>
                      <li>Pendant stability: ensure fittings hang plumb and don't rotate</li>
                      <li>Dimming operation: smooth control across full range without flicker</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Emergency lighting testing:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Duration testing: minimum 3-hour emergency operation</li>
                      <li>Illumination levels: adequate emergency lighting coverage</li>
                      <li>Automatic changeover: mains failure detection and switching</li>
                      <li>Monthly and annual testing procedures: ongoing maintenance requirements</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Performance standard:</strong> All lighting must meet design illumination requirements
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Safety Compliance and Final Inspection</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Visual inspection checklist:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Secure mounting: all fittings properly supported and stable</li>
                      <li>Clearance heights: adequate headroom in circulation areas</li>
                      <li>Cable protection: proper strain relief and protection from damage</li>
                      <li>Environmental suitability: correct IP ratings for location</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Bathroom compliance verification (Section 701):</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Zone requirements: correct fittings for each bathroom zone</li>
                      <li>IP rating verification: appropriate protection against water ingress</li>
                      <li>Accessible switching: safe operation of bathroom lighting controls</li>
                      <li>Supplementary bonding: where required for safety</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Final requirement:</strong> Issue electrical installation certificate confirming compliance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 bg-card border-elec-blue">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world example</h2>
          <p className="text-xs sm:text-sm text-foreground mb-4">
            In a restaurant installation, decorative pendants were fitted without additional ceiling supports. The cable alone carried the load, which over time caused the conductors to pull loose from terminals, leading to flickering lights and a safety risk. All fittings had to be reinstalled with proper mechanical support.
          </p>
          <p className="text-xs sm:text-sm text-foreground mb-4">
            The investigation revealed that the pendants weighed 3.5kg each, exceeding the ceiling rose support capacity. The constant movement from air conditioning caused gradual loosening of electrical connections, resulting in intermittent operation and potential fire risk from arcing contacts.
          </p>
          <div className="rounded-lg p-4 bg-card border border-green-400/30">
            <p className="font-medium text-green-600 dark:text-green-400 mb-2">Lesson learned</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              The restaurant had to close for three days while all pendants were reinstalled with independent ceiling hooks and proper strain relief. Always assess fitting weight against ceiling capacity and provide mechanical support separate from electrical connections. When in doubt, over-specify support rather than risk failure.
            </p>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-3">Planning and Installation</h3>
              <ul className="space-y-2 text-foreground">
                <li>• Always isolate the circuit and prove dead before starting work on lighting installations.</li>
                <li>• For heavy pendants or chandeliers, install a suitable ceiling hook or support plate rated for the load.</li>
                <li>• Use a laser pointer or plumb line to ensure pendants hang centrally over tables or islands.</li>
                <li>• Keep pendant drops above 2m in circulation areas to avoid head contact and ensure safety.</li>
                <li>• When adjusting cable length, ensure excess cable is neatly terminated and not under strain.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Quality and Finishing</h3>
              <ul className="space-y-2 text-foreground">
                <li>• For decorative fittings, wear clean gloves to avoid marking surfaces during installation.</li>
                <li>• Test all switching arrangements thoroughly before final commissioning and handover.</li>
                <li>• Verify pendant alignment using multiple viewing angles to ensure professional appearance.</li>
                <li>• Label all circuits clearly at the distribution board for future maintenance access.</li>
                <li>• Provide client with manufacturer's installation and maintenance instructions for all fittings.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick knowledge check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick knowledge check</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-foreground mb-2">What is the minimum pendant height above floor level in walkways?</p>
              <p className="text-sm text-muted-foreground">2.0m minimum clearance to prevent head contact and ensure safe passage in circulation areas.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-foreground mb-2">Which BS 7671 section covers bathroom lighting requirements?</p>
              <p className="text-sm text-muted-foreground">Section 701 details special installations in locations containing a bath or shower, including lighting zone restrictions.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-foreground mb-2">Why must pendant fittings have mechanical support separate from electrical connections?</p>
              <p className="text-sm text-muted-foreground">To prevent strain on electrical terminals, which could cause loose connections, arcing, and potential fire risk.</p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: Can I fit a pendant directly to plasterboard?</h3>
              <p className="text-sm text-muted-foreground">A: Only if suitable fixings (e.g., toggle bolts) are used and the fitting weight is within limits. Heavy fittings require structural support independent of the ceiling.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: Is a loop-in ceiling rose always required?</h3>
              <p className="text-sm text-muted-foreground">A: No, some modern lighting systems use separate junction boxes or plug-in connectors, but connections must remain accessible for maintenance.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: What's the best way to check pendant alignment?</h3>
              <p className="text-sm text-muted-foreground">A: Use a plumb line or laser level to ensure it hangs straight and centrally, checking from multiple viewing positions for accuracy.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-foreground">
            Installing lighting points and pendants requires both technical skill and an eye for presentation. Correct positioning for optimal illumination, secure fixing with appropriate mechanical support, safe wiring according to BS 7671, and compliance with environmental regulations ensure installations are safe, functional, and visually pleasing. Always provide mechanical support separate from electrical connections and verify all switching arrangements before commissioning.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test your knowledge of installing lighting points and pendants" />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Mounting Socket Outlets, Switches, and Spurs
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-3">
              Next: Terminating Twin & Earth, Singles, and Flex
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_2;