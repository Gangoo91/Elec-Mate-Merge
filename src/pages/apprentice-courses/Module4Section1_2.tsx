import { ArrowLeft, ArrowRight, Eye, CheckCircle, AlertTriangle, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 1.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Identifying Cable Routes and Fixing Points
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Plan safe, compliant cable routes and fixing points to protect cables and ensure BS 7671 compliance.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Safe zones: within 150mm of corners, tops, or from accessories.</li>
                  <li>Fix cables every 300mm (T&E vertical) to 400mm (T&E horizontal).</li>
                  <li>Avoid heat sources, check for hidden services before drilling.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Safe zone boundaries, hazards (pipes, heat), fixing positions.</li>
                  <li><strong>Use:</strong> Chalk lines for marking, cable detectors, appropriate fixings.</li>
                  <li><strong>Check:</strong> Spacing, wall type, hidden services, BS 7671 compliance.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/90">
              <li>Identify safe and compliant cable routes in various installation environments.</li>
              <li>Determine appropriate fixing points for different cable types and containment.</li>
              <li>Apply relevant BS 7671 requirements for cable support and routing.</li>
              <li>Recognise potential hazards and avoid unsafe routing practices.</li>
              <li>Select fixing methods appropriate to the cable and environment.</li>
            </ul>
          </section>

          {/* Factors Affecting Cable Routing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Factors Affecting Cable Routing
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Multiple factors must be considered when planning cable routes to ensure safety, compliance, and efficiency:
            </p>

            <div className="space-y-4">
              {routingFactors.map((factor, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow mb-1">{factor.factor}</p>
                      <p className="text-sm text-white/80 mb-2">{factor.description}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Why it matters:</strong> {factor.importance} - Essential for professional installation standards.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Planning Checklist</p>
              <p className="text-xs text-white/70">
                Before starting any cable installation, review all factors: check drawings for safe zones,
                identify potential hazards, confirm fixing requirements, and ensure route accessibility for future maintenance.
              </p>
            </div>
          </section>

          {/* Safe Zones and Routing Rules */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              <Shield className="w-5 h-5" /> Safe Zones and Routing Rules (BS 7671)
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg p-4 border-l-2 border-green-500/50 bg-green-500/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-400 mb-1">Vertical and Horizontal Safe Zones</p>
                    <p className="text-sm text-white/80 mb-2">Cables can run vertically or horizontally from electrical accessories.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Application:</strong> From any socket, switch, or outlet, cables can run directly up/down or left/right.
                      This creates predictable routes that avoid accidental damage during future work.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-green-500/50 bg-green-500/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-400 mb-1">150mm from Wall Top</p>
                    <p className="text-sm text-white/80 mb-2">Cables within 150mm of the ceiling or wall top are in a safe zone.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Practical use:</strong> Ceiling roses, downlights, and horizontal distribution runs.
                      Commonly used for lighting circuits and main cable runs between rooms.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-green-500/50 bg-green-500/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-400 mb-1">150mm from Wall Corners</p>
                    <p className="text-sm text-white/80 mb-2">Within 150mm of any wall corner (internal or external).</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Installation tip:</strong> Useful for vertical drops in corners or routing between adjacent walls.
                      Provides flexibility in room layouts and multiple route options.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-red-500/50 bg-red-500/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-400 mb-1">Outside Safe Zones</p>
                    <p className="text-sm text-white/80 mb-2">Cables outside safe zones need mechanical protection or earthed metallic covering.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Protection methods:</strong> Steel conduit, armoured cable, or mechanical protection at 50mm depth minimum.
                      Non-compliance creates serious safety risks and regulation breaches.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[0]} />
          </div>

          {/* Fixing Points */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              <MapPin className="w-5 h-5" /> Fixing Points and Spacing Requirements
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Proper cable support prevents sagging, damage, and ensures long-term reliability:
            </p>

            <div className="space-y-4">
              {fixingSpacing.map((cable, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-purple-500/50 bg-purple-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-400 mb-1">{cable.cableType}</p>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <p className="text-xs text-white/60">Vertical Spacing</p>
                          <p className="text-sm font-medium text-white">{cable.vertical}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/60">Horizontal Spacing</p>
                          <p className="text-sm font-medium text-white">{cable.horizontal}</p>
                        </div>
                      </div>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Installation notes:</strong> {cable.notes}. Consider cable weight, environmental conditions, and future access requirements.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Wall Type Considerations</p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-white/80">
                  <div>
                    <p className="font-medium text-white">Masonry Walls</p>
                    <p>Use wall plugs, masonry anchors, or expanding bolts for secure fixing.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Cavity Walls</p>
                    <p>Spring toggles, cavity anchors, or plasterboard fixings for hollow sections.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Timber Frame</p>
                    <p>Screw directly into studs or use appropriate hollow wall fixings.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">Critical Requirement</p>
                <p className="text-xs text-white/80">
                  All fixings must be suitable for the cable weight and wall construction. Inadequate support
                  leads to cable damage, safety hazards, and potential regulatory non-compliance.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[1]} />
          </div>

          {/* Hazard Avoidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              <AlertTriangle className="w-5 h-5" /> Hazard Identification and Avoidance
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Identifying and avoiding hazards protects cables and ensures safe, long-lasting installations:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                <AlertTriangle className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white text-center mb-2">Heat Sources</p>
                <div className="text-xs text-white/70 space-y-1">
                  <p><strong>Avoid:</strong> Hot water pipes, radiators, boilers, heating ducts</p>
                  <p><strong>Risk:</strong> Insulation degradation, reduced current capacity</p>
                  <p><strong>Minimum distance:</strong> 50mm from heat sources where possible</p>
                </div>
              </div>
              <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                <Shield className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white text-center mb-2">Corrosive Environment</p>
                <div className="text-xs text-white/70 space-y-1">
                  <p><strong>Areas:</strong> Bathrooms, kitchens, outdoor locations</p>
                  <p><strong>Solution:</strong> Use appropriate IP-rated cables and containment</p>
                  <p><strong>Examples:</strong> LSF cables, galvanised steel containment</p>
                </div>
              </div>
              <div className="rounded-lg p-4 bg-elec-yellow/10 border border-elec-yellow/30">
                <Eye className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white text-center mb-2">Service Separation</p>
                <div className="text-xs text-white/70 space-y-1">
                  <p><strong>Maintain distance from:</strong> Gas pipes, water services</p>
                  <p><strong>Reason:</strong> Avoid interference and accidental damage</p>
                  <p><strong>Best practice:</strong> Cross at 90° where routes must intersect</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg p-4 border-l-2 border-red-500/50 bg-red-500/5">
                <p className="font-semibold text-red-400 mb-2">Mechanical Hazards</p>
                <div className="text-sm text-white/80 space-y-1">
                  <p>• <strong>Sharp edges:</strong> Building steelwork, metal corners, rough surfaces</p>
                  <p>• <strong>Moving parts:</strong> Door hinges, sliding mechanisms, lifting equipment</p>
                  <p>• <strong>Impact zones:</strong> High-traffic areas, loading bays, machinery locations</p>
                  <p>• <strong>Protection:</strong> Use armoured cables, protective conduit, or physical barriers</p>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <p className="font-semibold text-elec-yellow mb-2">Environmental Factors</p>
                <div className="text-sm text-white/80 space-y-1">
                  <p>• <strong>Temperature extremes:</strong> Attics, plant rooms, external locations</p>
                  <p>• <strong>UV exposure:</strong> Use UV-resistant cables for outdoor installations</p>
                  <p>• <strong>Rodent damage:</strong> Consider armoured cables in vulnerable areas</p>
                  <p>• <strong>Chemical exposure:</strong> Industrial environments, swimming pools</p>
                </div>
              </div>
            </div>
          </section>

          {/* Marking and Preparing Routes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Marking and Preparing Routes
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Accurate marking and thorough preparation prevent errors and ensure professional results:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Route Planning and Marking</p>
                    <p className="text-sm text-white/80 mb-2">Use professional tools for accurate, straight cable routes.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Tools available:</strong> Chalk lines for long runs, laser levels for precise horizontal/vertical alignment,
                      string lines for temporary marking. Always mark before installing any fixings.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Fixing Position Identification</p>
                    <p className="text-sm text-white/80 mb-2">Mark all fixing points before drilling to ensure correct spacing.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Method:</strong> Measure and mark fixing centres along the route using the correct spacing for cable type.
                      Use a measuring tape and pencil for temporary marks, check against specifications.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Measurement Verification</p>
                    <p className="text-sm text-white/80 mb-2">Double-check all measurements against drawings and specifications.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Process:</strong> Compare marked route with installation drawings, verify dimensions,
                      check safe zone compliance, confirm no conflicts with other services or structural elements.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Pre-Installation Safety Checks</p>
                    <p className="text-sm text-white/80 mb-2">Essential safety checks before any drilling or fixing work begins.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Critical steps:</strong> Use cable/pipe detector to locate hidden services, check wall construction type,
                      confirm suitable fixing method, verify no conflicts with other trades' planned work.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Professional Practice</p>
              <p className="text-xs text-white/80">
                Thorough route planning and preparation is the mark of professional installation work.
                Time spent on accurate marking prevents errors, reduces material waste, and ensures compliance with regulations.
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[2]} />
          </div>

          {/* Real‑World Example */}
          <section className="mb-10">
            <div className="rounded-lg p-4 bg-white/5 border border-white/10">
              <p className="font-semibold text-white mb-2">Real‑World Example</p>
              <p className="text-sm text-white/80">
                A contractor routed cables across a ceiling space without considering fixing points. Over time,
                the unsupported cables sagged and were damaged by foot traffic during maintenance, leading to
                costly repairs and downtime for the client.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Do all cables need to be installed in safe zones?</p>
                <p className="text-sm text-white/70">Only those concealed in walls at less than 50mm depth — otherwise, protection is required.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Can cable ties alone be used for supporting heavy SWA cables?</p>
                <p className="text-sm text-white/70">No — heavy cables require mechanical fixings that can bear their weight over time.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Is it acceptable to run cables diagonally?</p>
                <p className="text-sm text-white/70">Only if fully visible or within appropriate containment — never concealed diagonally in walls.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-elec-yellow" /> Summary
              </h2>
              <p className="text-white/80 text-sm">
                Correctly identifying cable routes and fixing points ensures cables are protected, accessible, and compliant.
                Good planning reduces risks, improves longevity, and avoids costly remedial work.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Test your knowledge</h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Drawings
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-3">
                Next: Materials & PPE
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section1_2;
