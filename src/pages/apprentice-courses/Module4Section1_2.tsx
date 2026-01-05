import { ArrowLeft, ArrowRight, Route, Eye, CheckCircle, AlertTriangle, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module4Section1_2 = () => {
  useSEO(
    "Identifying Cable Routes and Fixing Points | Level 2 Electrical",
    "Plan safe, compliant cable routes and fixing points to BS 7671 requirements for professional electrical installations."
  );

  // Quiz (end of page)
  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum horizontal safe zone distance from a wall corner according to BS 7671?",
      options: ["100 mm", "150 mm", "200 mm", "250 mm"],
      correctAnswer: 1,
      explanation:
        "BS 7671 specifies 150mm as the maximum horizontal safe zone distance from a wall corner.",
    },
    {
      id: 2,
      question: "True or False: Safe zones apply to all cable runs, even if they are surface mounted.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False – safe zones only apply to concealed cables in walls at less than 50mm depth.",
    },
    {
      id: 3,
      question: "Name one factor that affects cable route selection.",
      options: [
        "Weather conditions only",
        "Safety, accessibility, aesthetics, or compliance",
        "Cable colour only",
        "Installation speed only",
      ],
      correctAnswer: 1,
      explanation:
        "Multiple factors affect route selection including safety, accessibility, aesthetics, and regulatory compliance.",
    },
    {
      id: 4,
      question: "How often should twin and earth cables be fixed vertically?",
      options: ["Every 200mm", "Every 300mm", "Every 500mm", "Every 600mm"],
      correctAnswer: 1,
      explanation: "Twin and earth cables should typically be fixed every 300mm when run vertically.",
    },
    {
      id: 5,
      question: "Give one example of a hazard that could damage a cable.",
      options: ["Correct installation", "Heat, sharp edges, or mechanical impact", "Proper support", "Safe zones"],
      correctAnswer: 1,
      explanation:
        "Heat sources, sharp edges, and mechanical impact are common hazards that can damage cables.",
    },
    {
      id: 6,
      question: "What should be done before drilling fixing points?",
      options: [
        "Start drilling immediately",
        "Check for hidden services with a detector",
        "Use the largest drill bit",
        "Drill without marking",
      ],
      correctAnswer: 1,
      explanation: "Always check for hidden services using a cable/pipe detector before drilling.",
    },
    {
      id: 7,
      question: "Which type of fixing is best for masonry walls?",
      options: ["Cable ties only", "Masonry anchors or wall plugs", "Adhesive tape", "Wire hooks"],
      correctAnswer: 1,
      explanation: "Masonry anchors or wall plugs provide secure fixing points in masonry walls.",
    },
    {
      id: 8,
      question: "Why is route efficiency important in electrical installation?",
      options: [
        "It doesn't matter",
        "Reduces material use, voltage drop, and installation time",
        "Makes cables look better",
        "Increases cable length",
      ],
      correctAnswer: 1,
      explanation:
        "Efficient routes reduce material costs, minimise voltage drop, and reduce installation time.",
    },
  ];

  // Inline knowledge checks
  const quickChecks = [
    {
      id: "safe-zone-check",
      question: "What is the maximum distance from a wall corner that is considered a safe zone?",
      options: ["100mm", "150mm", "200mm", "250mm"],
      correctIndex: 1,
      explanation:
        "BS 7671 specifies that cables can be run within 150mm of a wall corner as part of safe zones.",
    },
    {
      id: "hazard-check",
      question: "Why should you avoid routing cables near heating pipes?",
      options: [
        "It looks untidy",
        "Heat can damage cable insulation and reduce lifespan",
        "It's harder to install",
        "Cables will be too cold",
      ],
      correctIndex: 1,
      explanation:
        "Heat from pipes can damage cable insulation, reduce current carrying capacity, and shorten cable life.",
    },
    {
      id: "marking-check",
      question: "Give one method for marking a cable route accurately.",
      options: [
        "Guessing the route",
        "Using chalk lines, laser levels, or string lines",
        "Drawing with permanent marker",
        "No marking needed",
      ],
      correctIndex: 1,
      explanation:
        "Chalk lines, laser levels, and string lines provide accurate, straight reference lines for cable routes.",
    },
  ];

  const routingFactors = [
    {
      factor: "Regulatory Compliance",
      description: "Adhering to BS 7671 rules for safe zones, cable segregation, and protection.",
      importance: "Legal requirement",
    },
    {
      factor: "Safety",
      description: "Avoid routes near heat sources, sharp edges, or moving machinery.",
      importance: "Prevents cable damage",
    },
    {
      factor: "Accessibility",
      description: "Allow for future inspection, testing, and maintenance.",
      importance: "Future maintenance",
    },
    {
      factor: "Aesthetics",
      description: "Concealed routes where possible in finished environments.",
      importance: "Professional appearance",
    },
    {
      factor: "Efficiency",
      description: "Short, direct runs reduce voltage drop and material use.",
      importance: "Cost and performance",
    },
  ];

  const fixingSpacing = [
    {
      cableType: "Twin and Earth",
      vertical: "300mm",
      horizontal: "400mm",
      notes: "Standard domestic installation cable",
    },
    {
      cableType: "Steel Wire Armoured (SWA)",
      vertical: "250-400mm",
      horizontal: "250-400mm",
      notes: "Spacing depends on cable weight and size",
    },
    {
      cableType: "Trunking/Conduit",
      vertical: "Per manufacturer",
      horizontal: "Per manufacturer",
      notes: "Follow manufacturer's installation guidance",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header (matches Module 3.4.3 style) */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Route className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.1.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Identifying Cable Routes and Fixing Points
          </h1>
          <p className="text-muted-foreground">
            Plan safe, compliant cable routes and fixing points to protect cables and ensure BS 7671 compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Safe zones: within 150mm of corners, tops, or from accessories.</li>
                <li>Fix cables every 300mm (T&E vertical) to 400mm (T&E horizontal).</li>
                <li>Avoid heat sources, check for hidden services before drilling.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Safe zone boundaries, hazards (pipes, heat), fixing positions.</li>
                <li><strong>Use:</strong> Chalk lines for marking, cable detectors, appropriate fixings.</li>
                <li><strong>Check:</strong> Spacing, wall type, hidden services, BS 7671 compliance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify safe and compliant cable routes in various installation environments.</li>
            <li>Determine appropriate fixing points for different cable types and containment.</li>
            <li>Apply relevant BS 7671 requirements for cable support and routing.</li>
            <li>Recognise potential hazards and avoid unsafe routing practices.</li>
            <li>Select fixing methods appropriate to the cable and environment.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Factors Affecting Cable Routing */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Factors Affecting Cable Routing</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Multiple factors must be considered when planning cable routes to ensure safety, compliance, and efficiency:
            </p>
            
            <div className="space-y-4">
              {routingFactors.map((factor, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">{factor.factor}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">{factor.description}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Why it matters:</strong> {factor.importance} - Essential for professional installation standards.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-card border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-1">Planning Checklist</p>
              <p className="text-xs text-foreground">
                Before starting any cable installation, review all factors: check drawings for safe zones, 
                identify potential hazards, confirm fixing requirements, and ensure route accessibility for future maintenance.
              </p>
            </div>
          </section>

          {/* Safe Zones and Routing Rules */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Safe Zones and Routing Rules (BS 7671)
            </h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Vertical and Horizontal Safe Zones</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Cables can run vertically or horizontally from electrical accessories.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Application:</strong> From any socket, switch, or outlet, cables can run directly up/down or left/right. 
                      This creates predictable routes that avoid accidental damage during future work.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">150mm from Wall Top</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Cables within 150mm of the ceiling or wall top are in a safe zone.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Practical use:</strong> Ceiling roses, downlights, and horizontal distribution runs. 
                      Commonly used for lighting circuits and main cable runs between rooms.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">150mm from Wall Corners</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Within 150mm of any wall corner (internal or external).</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Installation tip:</strong> Useful for vertical drops in corners or routing between adjacent walls. 
                      Provides flexibility in room layouts and multiple route options.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Outside Safe Zones</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Cables outside safe zones need mechanical protection or earthed metallic covering.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Protection methods:</strong> Steel conduit, armoured cable, or mechanical protection at 50mm depth minimum. 
                      Non-compliance creates serious safety risks and regulation breaches.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickChecks[0]} />
          <Separator className="my-6" />

          {/* Fixing Points */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Fixing Points and Spacing Requirements
            </h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper cable support prevents sagging, damage, and ensures long-term reliability:
            </p>
            
            <div className="space-y-4">
              {fixingSpacing.map((cable, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">{cable.cableType}</p>
                      <div className="grid md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <p className="text-xs text-foreground/70">Vertical Spacing</p>
                          <p className="text-sm font-medium text-foreground">{cable.vertical}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70">Horizontal Spacing</p>
                          <p className="text-sm font-medium text-foreground">{cable.horizontal}</p>
                        </div>
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Installation notes:</strong> {cable.notes}. Consider cable weight, environmental conditions, and future access requirements.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-background/50 rounded border">
                <p className="text-sm font-medium text-foreground mb-2">Wall Type Considerations</p>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs text-foreground">
                  <div>
                    <p className="font-medium">Masonry Walls</p>
                    <p>Use wall plugs, masonry anchors, or expanding bolts for secure fixing.</p>
                  </div>
                  <div>
                    <p className="font-medium">Cavity Walls</p>
                    <p>Spring toggles, cavity anchors, or plasterboard fixings for hollow sections.</p>
                  </div>
                  <div>
                    <p className="font-medium">Timber Frame</p>
                    <p>Screw directly into studs or use appropriate hollow wall fixings.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Critical Requirement</p>
                <p className="text-xs text-foreground">
                  All fixings must be suitable for the cable weight and wall construction. Inadequate support 
                  leads to cable damage, safety hazards, and potential regulatory non-compliance.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck {...quickChecks[1]} />
          <Separator className="my-6" />

          {/* Hazard Avoidance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Hazard Identification and Avoidance
            </h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Identifying and avoiding hazards protects cables and ensures safe, long-lasting installations:
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <AlertTriangle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-center mb-2">Heat Sources</p>
                <div className="text-xs sm:text-sm text-foreground space-y-1">
                  <p><strong>Avoid:</strong> Hot water pipes, radiators, boilers, heating ducts</p>
                  <p><strong>Risk:</strong> Insulation degradation, reduced current capacity</p>
                  <p><strong>Minimum distance:</strong> 50mm from heat sources where possible</p>
                </div>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-center mb-2">Corrosive Environment</p>
                <div className="text-xs sm:text-sm text-foreground space-y-1">
                  <p><strong>Areas:</strong> Bathrooms, kitchens, outdoor locations</p>
                  <p><strong>Solution:</strong> Use appropriate IP-rated cables and containment</p>
                  <p><strong>Examples:</strong> LSF cables, galvanised steel containment</p>
                </div>
              </div>
              <div className="rounded-lg p-4 bg-emerald-500/10 border border-emerald-500/30">
                <Eye className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-center mb-2">Service Separation</p>
                <div className="text-xs sm:text-sm text-foreground space-y-1">
                  <p><strong>Maintain distance from:</strong> Gas pipes, water services</p>
                  <p><strong>Reason:</strong> Avoid interference and accidental damage</p>
                  <p><strong>Best practice:</strong> Cross at 90° where routes must intersect</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg p-4 border-l-4 border-l-red-500 bg-card">
                <p className="font-semibold text-red-600 dark:text-emerald-400 mb-2">Mechanical Hazards</p>
                <div className="text-xs sm:text-sm text-foreground space-y-1">
                  <p>• <strong>Sharp edges:</strong> Building steelwork, metal corners, rough surfaces</p>
                  <p>• <strong>Moving parts:</strong> Door hinges, sliding mechanisms, lifting equipment</p>
                  <p>• <strong>Impact zones:</strong> High-traffic areas, loading bays, machinery locations</p>
                  <p>• <strong>Protection:</strong> Use armoured cables, protective conduit, or physical barriers</p>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-emerald-500 bg-card">
                <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-2">Environmental Factors</p>
                <div className="text-xs sm:text-sm text-foreground space-y-1">
                  <p>• <strong>Temperature extremes:</strong> Attics, plant rooms, external locations</p>
                  <p>• <strong>UV exposure:</strong> Use UV-resistant cables for outdoor installations</p>
                  <p>• <strong>Rodent damage:</strong> Consider armoured cables in vulnerable areas</p>
                  <p>• <strong>Chemical exposure:</strong> Industrial environments, swimming pools</p>
                </div>
              </div>
            </div>
          </section>

          {/* Marking and Preparing Routes */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Marking and Preparing Routes</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Accurate marking and thorough preparation prevent errors and ensure professional results:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Route Planning and Marking</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Use professional tools for accurate, straight cable routes.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Tools available:</strong> Chalk lines for long runs, laser levels for precise horizontal/vertical alignment, 
                      string lines for temporary marking. Always mark before installing any fixings.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Fixing Position Identification</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Mark all fixing points before drilling to ensure correct spacing.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Method:</strong> Measure and mark fixing centres along the route using the correct spacing for cable type. 
                      Use a measuring tape and pencil for temporary marks, check against specifications.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Measurement Verification</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Double-check all measurements against drawings and specifications.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Process:</strong> Compare marked route with installation drawings, verify dimensions, 
                      check safe zone compliance, confirm no conflicts with other services or structural elements.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Pre-Installation Safety Checks</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Essential safety checks before any drilling or fixing work begins.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical steps:</strong> Use cable/pipe detector to locate hidden services, check wall construction type, 
                      confirm suitable fixing method, verify no conflicts with other trades' planned work.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-blue-5/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Wall Construction Assessment</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Identify wall type to select appropriate fixing methods and tools.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Assessment methods:</strong> Visual inspection, test drilling, checking building drawings. 
                      Different walls require different fixings - solid masonry, cavity walls, timber frame each need specific approaches.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Coordination with Other Trades</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Confirm route doesn't conflict with other contractors' work.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Coordination areas:</strong> Plumbing routes, HVAC ducting, structural modifications, 
                      decorative finishes. Early coordination prevents conflicts and costly rework.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-card border border-green-400/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-1">Professional Practice</p>
              <p className="text-xs text-foreground">
                Thorough route planning and preparation is the mark of professional installation work. 
                Time spent on accurate marking prevents errors, reduces material waste, and ensures compliance with regulations.
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[2]} />
          <Separator className="my-6" />

          {/* Real‑World Example */}
          <section className="mb-2">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-semibold mb-1">Real‑World Example</p>
              <p className="text-xs sm:text-sm text-foreground">
                A contractor routed cables across a ceiling space without considering fixing points. Over time, 
                the unsupported cables sagged and were damaged by foot traffic during maintenance, leading to 
                costly repairs and downtime for the client.
              </p>
            </div>
          </section>
        </Card>

        {/* FAQs */}
        <div className="space-y-4 mb-8">
          <div className="rounded-lg bg-card border border-border/20 p-4">
            <p className="font-medium mb-1">Do all cables need to be installed in safe zones?</p>
            <p className="text-sm">Only those concealed in walls at less than 50mm depth — otherwise, protection is required.</p>
          </div>
          <div className="rounded-lg bg-card border border-border/20 p-4">
            <p className="font-medium mb-1">Can cable ties alone be used for supporting heavy SWA cables?</p>
            <p className="text-sm">No — heavy cables require mechanical fixings that can bear their weight over time.</p>
          </div>
          <div className="rounded-lg bg-card border border-border/20 p-4">
            <p className="font-medium mb-1">Is it acceptable to run cables diagonally?</p>
            <p className="text-sm">Only if fully visible or within appropriate containment — never concealed diagonally in walls.</p>
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border border-emerald-500/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Summary
          </h2>
          <p className="text-foreground/90 text-sm">
            Correctly identifying cable routes and fixing points ensures cables are protected, accessible, and compliant. 
            Good planning reduces risks, improves longevity, and avoids costly remedial work.
          </p>
        </Card>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Test your knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-3">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section1_2;