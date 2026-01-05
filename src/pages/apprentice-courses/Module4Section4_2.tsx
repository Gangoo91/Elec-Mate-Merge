import { ArrowLeft, ArrowRight, Ruler, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Spacing Rules and Manufacturer Guidelines - Module 4.4.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master spacing requirements for conduit, trunking, and cable tray supports. Learn manufacturer guidelines, BS 7671 compliance, and environmental adjustments for secure installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the maximum recommended support spacing for PVC conduit horizontally?",
    options: ["2.5m", "1.2m", "3.0m"],
    correctIndex: 1,
    explanation: "PVC conduit requires closer spacing (1.2m max) due to its flexibility and thermal expansion properties compared to steel conduit."
  },
  {
    id: 2,
    question: "Why should supports be closer together in high-vibration areas?",
    options: ["To save materials", "To prevent loosening and fatigue damage", "To make installation faster"],
    correctIndex: 1,
    explanation: "Closer spacing with vibration-resistant fixings prevents loosening and reduces fatigue damage from constant movement and vibration."
  },
  {
    id: 3,
    question: "Where should extra supports always be placed?",
    options: ["Only at ends", "On both sides of bends and junctions", "Every 5 metres"],
    correctIndex: 1,
    explanation: "Extra supports on both sides of bends and junctions prevent stress concentration and maintain structural integrity at these critical points."
  }
];

const Module4Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the typical maximum horizontal spacing for steel conduit?",
      options: [
        "1.2 m",
        "2.5 m",
        "3.0 m"
      ],
      correctAnswer: 1,
      explanation: "Steel conduit typically requires supports every 2.5m maximum horizontally, as it's stronger than PVC but still needs adequate support."
    },
    {
      id: 2,
      question: "Which material generally requires closer support spacing, PVC or steel?",
      options: [
        "PVC",
        "Steel",
        "Both the same"
      ],
      correctAnswer: 0,
      explanation: "PVC requires closer spacing (max 1.2m horizontal) because it's more flexible and prone to sagging than steel conduit."
    },
    {
      id: 3,
      question: "True or False: You can increase spacing if the tray looks strong enough without cables.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Spacing must account for the full cable load, and containment must be adequately supported even before cables are installed."
    },
    {
      id: 4,
      question: "Name two conditions that might require reducing support spacing.",
      options: [
        "High cable load and outdoor exposure",
        "Light cables and indoor use",
        "Single cable runs"
      ],
      correctAnswer: 0,
      explanation: "High cable loads, outdoor exposure, high-vibration environments, and thermal expansion all require closer support spacing."
    },
    {
      id: 5,
      question: "What does deflection in cable trays indicate?",
      options: [
        "Normal operation",
        "The tray is bending under load",
        "Cables are too light"
      ],
      correctAnswer: 1,
      explanation: "Deflection indicates the tray is bending under load and may fail over time, requiring additional supports."
    },
    {
      id: 6,
      question: "Where should supports always be placed in relation to bends?",
      options: [
        "Only after bends",
        "Only before bends",
        "On both sides of the bend"
      ],
      correctAnswer: 2,
      explanation: "Supports should always be placed on both sides of bends to prevent stress concentration and maintain structural integrity."
    },
    {
      id: 7,
      question: "Why might manufacturer guidelines be stricter than BS 7671?",
      options: [
        "To ensure warranty compliance",
        "To account for specific product characteristics",
        "Both A and B"
      ],
      correctAnswer: 2,
      explanation: "Manufacturers may specify stricter requirements for warranty validity and to account for specific product characteristics."
    },
    {
      id: 8,
      question: "What is the main risk of exceeding recommended spacing?",
      options: [
        "Higher costs",
        "Sagging and structural failure",
        "Easier installation"
      ],
      correctAnswer: 1,
      explanation: "Exceeding recommended spacing can lead to sagging, damage to cables, and potential structural failure of the containment system."
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
              Back to Section 4
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
              <Ruler className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.4.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Spacing Rules and Manufacturer Guidelines
          </h1>
          <p className="text-muted-foreground">
            Master correct spacing requirements for containment supports, manufacturer specifications, and environmental adjustments for safe installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Correct spacing prevents sagging, vibration damage, and structural failure.</li>
                <li>Manufacturer guidelines may override general BS 7671 requirements.</li>
                <li>Environmental factors require spacing adjustments for safety.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cable load, material type, environmental conditions.</li>
                <li><strong>Use:</strong> Manufacturer datasheets, load charts, spacing calculators.</li>
                <li><strong>Check:</strong> No deflection, correct intervals, extra supports at bends.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Interpret spacing requirements from manufacturer datasheets and load charts.</li>
            <li>Apply BS 7671 and industry best practice guidelines for containment spacing.</li>
            <li>Adjust spacing for different materials (PVC vs steel) and environmental conditions.</li>
            <li>Factor in cable load capacity and type when determining support intervals.</li>
            <li>Avoid common spacing mistakes that compromise safety and professional appearance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Why Spacing Matters and Basic Guidelines */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Why Spacing Matters and Basic Guidelines</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper spacing of containment supports is fundamental to electrical installation safety and compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Critical Safety Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Prevents mechanical strain:</strong> Maintains cable integrity and prevents insulation damage.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Structural integrity:</strong> Avoids long-term deformation and system failure.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Professional appearance:</strong> Maintains straight, aligned runs meeting inspection standards.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> All containment must be adequately supported to prevent damage
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Standard Spacing Guidelines (BS 7671)</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Steel conduit spacing:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal runs: 2.5m maximum (2.0m preferred for appearance)</li>
                      <li>Vertical runs: 3.0m maximum with intermediate floor fixings</li>
                      <li>Heavy cable installations: reduce to 2.0m horizontal</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>PVC conduit spacing (closer due to flexibility):</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal: 1.2m maximum (1.0m in temperatures &gt;25°C)</li>
                      <li>Vertical: 1.5m maximum with expansion allowances</li>
                      <li>Temperature factor: reduce 20% per 10°C above standard conditions</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key difference:</strong> PVC requires 50% closer spacing than steel due to thermal expansion
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Cable Tray and Trunking Specifications</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Cable tray support intervals:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Light duty (up to 15kg/m): 2.0m maximum spacing</li>
                      <li>Medium duty (15-30kg/m): 1.5m spacing recommended</li>
                      <li>Heavy duty (30kg/m+): 1.2m spacing with reinforced brackets</li>
                      <li>Perforated tray: 10% closer spacing than solid tray</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Trunking support requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Standard trunking: 1.5-2.0m depending on load and material</li>
                      <li>Mini-trunking: 1.0m maximum for desktop/skirting applications</li>
                      <li>Junction boxes: additional support within 150mm</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Load calculation:</strong> Include 25% safety margin for future cable additions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="spacing-basics-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Manufacturer Guidelines and Load Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Manufacturer Guidelines and Load Considerations</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Manufacturer specifications often override general guidelines and must be followed for warranty and safety compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Manufacturer Datasheet Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Load capacity charts:</strong> Specify exact spacing based on expected cable weight per metre.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Environmental ratings:</strong> Adjusted spacing for temperature, humidity, and vibration.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Material-specific requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Aluminium tray: thermal expansion joints every 10m</li>
                      <li>Galvanised steel: closer spacing in corrosive environments</li>
                      <li>Stainless steel: standard spacing but check grade suitability</li>
                      <li>Plastic trunking: significant thermal expansion considerations</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Warranty compliance:</strong> Non-compliance with spacing may void product warranty
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Load Calculation and Distribution</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Cable weight factors (typical values):</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>2.5mm² T&E: 0.15kg/m, 4.0mm² T&E: 0.25kg/m</li>
                      <li>10mm² SWA: 1.2kg/m, 25mm² SWA: 2.8kg/m</li>
                      <li>50mm² SWA: 5.5kg/m, 95mm² SWA: 9.8kg/m</li>
                      <li>Data cables: 0.05-0.08kg/m per cable</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Dynamic load considerations:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Wind loading on external installations</li>
                      <li>Ice accumulation (additional 2-5kg/m in exposed areas)</li>
                      <li>Seismic considerations in appropriate regions</li>
                      <li>Thermal cycling stress from temperature changes</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety margin:</strong> Apply 1.5× safety factor for calculated loads minimum
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Deflection Limits and Testing</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Maximum allowable deflection:</strong> L/200 (span length divided by 200) under full load.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Testing requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Load test at 1.5× design load for 24 hours</li>
                      <li>Visual inspection for sag or deformation</li>
                      <li>Measurement of deflection at span centres</li>
                      <li>Check fixing integrity under load</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Field check:</strong> 2m span should not deflect more than 10mm under design load
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="manufacturer-guidelines-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Environmental Adjustments and Special Conditions */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Environmental Adjustments and Special Conditions</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Environmental factors require spacing adjustments to maintain safety and performance standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Temperature and Thermal Effects</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>PVC thermal expansion:</strong> 0.6mm per metre per 10°C temperature rise.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Temperature adjustment factors:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Below 0°C: increase spacing by 10% (materials become brittle)</li>
                      <li>0-20°C: standard spacing applies</li>
                      <li>20-40°C: reduce spacing by 15% for PVC systems</li>
                      <li>Above 40°C: reduce spacing by 25% and add expansion joints</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Expansion joint requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>PVC conduit: every 6m in high-temperature environments</li>
                      <li>Aluminium tray: every 10m with appropriate expansion brackets</li>
                      <li>Steel systems: expansion joints at building movement joints</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical calculation:</strong> 30m PVC run at 40°C = 72mm expansion requiring 12 supports
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Vibration and Dynamic Loading</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>High-vibration environments:</strong> Plant rooms, near machinery, transport links.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Vibration mitigation measures:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Reduce spacing by 30-50% from standard recommendations</li>
                      <li>Use vibration-damping brackets and rubber isolators</li>
                      <li>Lock nuts and thread-locking compounds on all fixings</li>
                      <li>Regular inspection schedule every 6 months minimum</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Dynamic load factors:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Light vibration: apply 1.2× static load factor</li>
                      <li>Moderate vibration: apply 1.5× static load factor</li>
                      <li>Heavy vibration: apply 2.0× static load factor</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Resonance check:</strong> Avoid support spacing that creates resonant frequencies
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">External and Corrosive Environments</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Outdoor installation factors:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Wind loading: reduce spacing by 20% in exposed locations</li>
                      <li>Snow/ice loading: additional 2-5kg/m load consideration</li>
                      <li>UV degradation: check material ratings for outdoor use</li>
                      <li>Temperature cycling: -20°C to +60°C stress considerations</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Corrosive environment adjustments:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Chemical plants: closer spacing due to material degradation</li>
                      <li>Marine environments: salt spray effects on fixings</li>
                      <li>Underground: ground movement and moisture effects</li>
                      <li>Swimming pools: chlorine atmosphere considerations</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Material selection:</strong> 316L stainless steel minimum for marine environments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="environmental-adjustments-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Faults and Quality Control */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Common Faults and Quality Control</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Identifying and preventing common spacing errors ensures professional installations and long-term reliability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Planning and Measurement Errors</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Common mistakes:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Guessing spacing instead of measuring accurately</li>
                      <li>Mixing different spacing standards within same run</li>
                      <li>Not accounting for building structure irregularities</li>
                      <li>Ignoring manufacturer-specific requirements</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Prevention measures:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Use laser measures or steel tape for accuracy</li>
                      <li>Mark all support positions before installation</li>
                      <li>Create spacing templates for repetitive work</li>
                      <li>Check manufacturer datasheets for every product</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Best practice:</strong> Mark support centres with chalk line for straight alignment
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Load and Structural Failures</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Critical failure points:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Inadequate spacing for heavy cables (SWA, large multicore)</li>
                      <li>No additional supports at bends, junctions, and accessories</li>
                      <li>Forgetting vertical transitions and level changes</li>
                      <li>Insufficient support for future cable additions</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Quality control checks:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Visual inspection for sag before cable installation</li>
                      <li>Load testing with temporary weights if uncertain</li>
                      <li>Deflection measurement at span centres</li>
                      <li>Fixing torque verification using calibrated tools</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Failure cost:</strong> Rework typically costs 3-5× original installation time
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Documentation and Compliance Issues</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Documentation requirements:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Record actual spacing used vs. design specifications</li>
                      <li>Note any deviations and justifications</li>
                      <li>Photograph critical support points for records</li>
                      <li>Include load calculations in installation certificates</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Compliance verification:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 regulation 522.8.5 compliance check</li>
                      <li>Manufacturer warranty requirement verification</li>
                      <li>Building regulations structural approval</li>
                      <li>Insurance requirement documentation</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Installation certificates must include support adequacy confirmation
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
            A commercial installation used steel cable tray spaced at 2.5m intervals following general BS 7671 guidelines. However, once loaded with heavy SWA cables totalling 35kg/m, the tray exhibited significant sagging between supports. The electrical inspector noted deflection exceeding L/200 limits and failed the installation.
          </p>
          <p className="text-xs sm:text-sm text-foreground mb-4">
            Investigation revealed that the manufacturer's datasheet specified 1.5m maximum spacing for loads exceeding 25kg/m. The contractor had followed BS 7671 general guidelines but missed the specific manufacturer requirements for heavy-duty applications.
          </p>
          <div className="rounded-lg p-4 bg-card border border-green-400/30">
            <p className="font-medium text-green-600 dark:text-green-400 mb-2">Lesson learned</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              The installation required additional supports to be installed at 1.5m centres, requiring partial cable removal and doubling the labour cost. Always check manufacturer load charts and apply appropriate safety margins for cable weight calculations. When in doubt, use closer spacing rather than risk failure.
            </p>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-3">Planning and Layout</h3>
              <ul className="space-y-2 text-foreground">
                <li>• Plan all support positions before installation using chalk lines or laser levels.</li>
                <li>• Use measuring templates for repetitive spacing to maintain consistency.</li>
                <li>• Mark fixing points accounting for cable tray joints and expansion requirements.</li>
                <li>• Consider future cable additions when determining load requirements.</li>
                <li>• Check building drawings for structural limitations and coordination with other services.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Installation Best Practice</h3>
              <ul className="space-y-2 text-foreground">
                <li>• Install supports before lifting containment into position for safety.</li>
                <li>• Use adjustable brackets where ceiling or wall irregularities exist.</li>
                <li>• Apply thread-locking compound in vibration-prone environments.</li>
                <li>• Leave adequate clearance around supports for cable pulling and maintenance.</li>
                <li>• Test load capacity with temporary weights if design loads are uncertain.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick knowledge check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick knowledge check</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-foreground mb-2">What is the maximum recommended support spacing for PVC conduit horizontally?</p>
              <p className="text-sm text-muted-foreground">PVC conduit requires supports every 1.2m maximum due to its flexibility and thermal expansion properties.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-foreground mb-2">Why should supports be closer together in high-vibration areas?</p>
              <p className="text-sm text-muted-foreground">Vibration causes fatigue in fixings and containment, so closer spacing with locking nuts prevents loosening and failure.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-foreground mb-2">Where should extra supports always be placed?</p>
              <p className="text-sm text-muted-foreground">On both sides of bends, junctions, and heavy accessories to prevent stress concentration and maintain structural integrity.</p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: Can I follow only BS 7671 without checking manufacturer data?</h3>
              <p className="text-sm text-muted-foreground">A: No — manufacturer instructions may override general guidelines, especially for warranty and safety reasons. Always check specific product datasheets.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: How do I deal with uneven walls or ceilings when spacing supports?</h3>
              <p className="text-sm text-muted-foreground">A: Use adjustable brackets or shims to maintain consistent spacing between supports while accommodating structural irregularities.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: Do spacing rules apply before cables are installed?</h3>
              <p className="text-sm text-muted-foreground">A: Yes — containment must be adequately supported even before cables are pulled to prevent damage during installation and ensure structural integrity.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-foreground">
            Following correct spacing rules ensures mechanical integrity, compliance, and professional appearance. Always follow manufacturer specifications in combination with BS 7671, and adjust for load, environment, and material type. Proper planning, accurate measurement, and quality control prevent costly rework and ensure long-term installation reliability.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test your knowledge of spacing rules and manufacturer guidelines" />
      </main>
    </div>
  );
};

export default Module4Section4_2;