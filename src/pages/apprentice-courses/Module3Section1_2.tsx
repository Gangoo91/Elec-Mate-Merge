import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Cable, Zap, Shield, AlertTriangle, CheckCircle2, Home, Factory, Wrench, Scissors, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What colour is the neutral conductor in modern T&E cable?",
    options: ["Black", "Blue", "Brown", "Green/Yellow"],
    correctAnswer: 1,
    explanation: "The neutral conductor in modern T&E cable is blue (changed from black in 2004 harmonisation)."
  },
  {
    id: 2,
    question: "Name one limitation of T&E cable in outdoor installations.",
    options: ["Too expensive", "Cannot carry enough current", "Not suitable for direct burial", "Wrong colour coding"],
    correctAnswer: 2,
    explanation: "T&E cable is not suitable for direct burial outdoors without additional protection due to limited mechanical protection."
  },
  {
    id: 3,
    question: "What is the purpose of sleeving the bare earth conductor?",
    options: ["To increase current capacity", "For identification and safety", "To reduce voltage drop", "To improve flexibility"],
    correctAnswer: 1,
    explanation: "The bare CPC must be sleeved green/yellow at terminations for proper identification and to prevent accidental contact."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What colour is the live conductor in modern T&E cable?",
    options: ["Brown", "Red", "Blue", "Black"],
    correctAnswer: 0,
    explanation: "The live conductor in modern T&E cable is brown (changed from red in 2004 harmonisation)."
  },
  {
    id: 2,
    question: "Which size of T&E is most commonly used for a domestic socket ring circuit?",
    options: ["1.0 mm²", "1.5 mm²", "2.5 mm²", "4.0 mm²"],
    correctAnswer: 2,
    explanation: "2.5 mm² T&E is the standard size for domestic socket ring circuits, providing adequate current capacity for typical loads."
  },
  {
    id: 3,
    question: "True or False: T&E cable is suitable for direct burial outdoors without protection.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. T&E cable requires additional protection such as conduit or ducting for outdoor burial due to limited mechanical protection."
  },
  {
    id: 4,
    question: "What must be done to the CPC before connecting it to a terminal?",
    options: ["Trim it shorter than other conductors", "Sleeve it green/yellow", "Twist it with neutral conductor", "Leave it bare"],
    correctAnswer: 1,
    explanation: "The bare CPC must be sleeved with green/yellow identification sleeve at all terminations."
  },
  {
    id: 5,
    question: "Which part of the T&E cable provides basic mechanical protection?",
    options: ["CPC", "Outer PVC sheath", "Neutral conductor", "Insulation tape"],
    correctAnswer: 1,
    explanation: "The outer PVC sheath provides basic mechanical protection for the internal conductors."
  },
  {
    id: 6,
    question: "Why must sharp bends be avoided when installing T&E?",
    options: ["To prevent voltage drop", "To avoid damaging the insulation", "To improve aesthetics only", "To make clipping easier"],
    correctAnswer: 1,
    explanation: "Sharp bends can damage the conductor insulation, potentially causing short circuits or earth faults."
  },
  {
    id: 7,
    question: "What is the maximum clip spacing for T&E cable on horizontal runs?",
    options: ["200mm", "300mm", "400mm", "500mm"],
    correctAnswer: 1,
    explanation: "BS 7671 requires cable clips at maximum 300mm spacing for horizontal runs of T&E cable."
  },
  {
    id: 8,
    question: "Where must T&E cable be installed inside conduit or trunking?",
    options: ["All domestic installations", "Only in bathrooms", "Where risk of mechanical damage exists", "Only for high current circuits"],
    correctAnswer: 2,
    explanation: "T&E must be protected with conduit or trunking where there is risk of mechanical damage, such as exposed runs in workshops."
  },
  {
    id: 9,
    question: "What size clips should be used for 2.5 mm² T&E cable?",
    options: ["6mm clips", "8mm clips", "10mm clips", "12mm clips"],
    correctAnswer: 1,
    explanation: "2.5 mm² T&E cable requires 8mm clips with 4.0mm screws for proper support and installation."
  },
  {
    id: 10,
    question: "When stripping T&E cable, what is the typical conductor strip length required?",
    options: ["5-8mm", "10-12mm", "15-20mm", "25-30mm"],
    correctAnswer: 1,
    explanation: "Individual conductor insulation should typically be stripped 10-12mm for most terminations."
  },
  {
    id: 11,
    question: "How close to terminations and accessories must T&E cable be clipped?",
    options: ["Within 100mm", "Within 150mm", "Within 200mm", "Within 300mm"],
    correctAnswer: 1,
    explanation: "T&E cable must be clipped within 150mm of terminations and accessories to provide adequate support."
  },
  {
    id: 12,
    question: "What is the first step when terminating T&E cable at a socket outlet?",
    options: ["Connect the live conductor", "Strip cable sheath 25-30mm", "Test the circuit", "Install the faceplate"],
    correctAnswer: 1,
    explanation: "The first step is to strip the cable sheath 25-30mm and individual conductors 12mm to prepare for termination."
  }
];

const Module3Section1_2: React.FC = () => {
  useSEO(
    "Twin and Earth Cable (T&E) – Module 3 (3.1.2)",
    "Complete guide to Twin and Earth cable construction, applications, installation and BS 7671 compliance for UK electrical installations."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Twin and Earth Cable (T&E) – Module 3 (3.1.2)",
    description:
      "Complete guide to Twin and Earth cable construction, applications, installation and BS 7671 compliance for UK electrical installations.",
    articleSection: "Electrical Installation",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "Can I run T&E cable under floorboards without conduit?", a: "Yes, if there's no risk of damage and the cable is fixed securely, but mechanical protection is advised in areas where it may be disturbed." },
    { q: "Can T&E be used for outdoor lighting?", a: "Only if enclosed in suitable conduit or SWA for mechanical protection and weatherproofing." },
    { q: "Why is the earth wire in T&E not insulated?", a: "The bare CPC saves manufacturing cost and space but must be sleeved at terminations for identification." },
    { q: "What's the difference between 6242Y and 6243Y cable?", a: "6242Y is standard T&E, while 6243Y includes an additional conductor (often used for two-way switching circuits)." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Cable className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">Section 3.1.2</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Twin and Earth Cable (T&E)</h1>
          <p className="text-white">Understanding flat PVC sheathed cable construction, applications and installation requirements for UK electrical work.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>T&E cable contains live (brown), neutral (blue), and bare earth conductors in flat PVC sheath.</li>
                <li>Most common cable for UK domestic installations - cost-effective and easy to install.</li>
                <li>Common sizes: 1.0mm² (lighting), 1.5mm² (lighting), 2.5mm² (sockets), 4-6mm² (high loads).</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Flat grey cable with three conductors visible at cut ends.</li>
                <li><strong>Use:</strong> Domestic circuits, light commercial where mechanical protection isn't critical.</li>
                <li><strong>Check:</strong> CPC sleeved green/yellow, proper clip spacing, protected where at risk.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the construction and components of Twin and Earth cable.</li>
            <li>Explain the common sizes and their typical applications in UK installations.</li>
            <li>Recognise the benefits and limitations of T&E compared to other wiring types.</li>
            <li>Select appropriate uses for T&E in line with BS 7671 regulations.</li>
            <li>Describe installation considerations for protecting and terminating T&E cable.</li>
            <li>Apply proper termination techniques including CPC sleeving requirements.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Construction */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2"><Wrench className="w-5 h-5" /> Construction of T&E Cable</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <p><strong>Description:</strong> Twin and Earth cable consists of two insulated conductors plus a bare earth wire, all contained within a flat PVC sheath.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Conductor Components</p>
                  <ul className="space-y-2">
                    <li><strong>Live conductor:</strong> Brown PVC insulated (was red pre-2004)</li>
                    <li><strong>Neutral conductor:</strong> Blue PVC insulated (was black pre-2004)</li>
                    <li><strong>CPC (earth):</strong> Bare copper wire, requires green/yellow sleeving at terminations</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Protection & Design</p>
                  <ul className="space-y-2">
                    <li><strong>Sheath:</strong> Flat grey PVC for mechanical protection</li>
                    <li><strong>Profile:</strong> Flat design for easy surface mounting and under-floor installation</li>
                    <li><strong>Standards:</strong> Manufactured to BS 6004 specifications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <p className="font-medium mb-2">Important Design Features:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Flat profile allows neat installation against surfaces and through floor joists</li>
                  <li>Bare earth conductor reduces cable size and cost while maintaining functionality</li>
                  <li>PVC sheath provides basic mechanical protection and moisture resistance</li>
                  <li>Colour coding complies with current BS 7671 requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-te-construction"
            question="What colour is the live conductor in modern T&E cable?"
            options={["Red", "Brown", "Blue", "Black"]}
            correctIndex={1}
            explanation="The live conductor in modern T&E cable is brown, changed from red during the 2004 harmonisation."
          />
          <Separator className="my-6" />

          {/* Common Sizes and Applications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Common Sizes and Applications</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <p><strong>Description:</strong> T&E cable is available in various conductor sizes to suit different circuit requirements and current ratings.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-white border-b border-white/10">
                    <tr>
                      <th className="py-3 pr-4">Size</th>
                      <th className="py-3 pr-4">Typical Current Rating</th>
                      <th className="py-3 pr-4">Common Applications</th>
                      <th className="py-3 pr-4">Typical Protection</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium">1.0 mm²</td>
                      <td className="py-3 pr-4">11A (clipped direct)</td>
                      <td className="py-3 pr-4">Lighting circuits, low-power loads</td>
                      <td className="py-3 pr-4">6A MCB/RCBO</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium">1.5 mm²</td>
                      <td className="py-3 pr-4">15A (clipped direct)</td>
                      <td className="py-3 pr-4">Lighting, immersion heater</td>
                      <td className="py-3 pr-4">10A MCB/RCBO</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium">2.5 mm²</td>
                      <td className="py-3 pr-4">20A (clipped direct)</td>
                      <td className="py-3 pr-4">Socket ring/radial circuits</td>
                      <td className="py-3 pr-4">32A (ring), 20A (radial)</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium">4.0 mm²</td>
                      <td className="py-3 pr-4">26A (clipped direct)</td>
                      <td className="py-3 pr-4">Cooker circuits, larger radials</td>
                      <td className="py-3 pr-4">32A MCB/RCBO</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium">6.0 mm²</td>
                      <td className="py-3 pr-4">32A (clipped direct)</td>
                      <td className="py-3 pr-4">Showers, large cookers</td>
                      <td className="py-3 pr-4">32A MCB/RCBO</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium">10.0 mm²</td>
                      <td className="py-3 pr-4">43A (clipped direct)</td>
                      <td className="py-3 pr-4">Electric showers, sub-mains</td>
                      <td className="py-3 pr-4">40A MCB/RCBO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-card border border-border/30 rounded-lg p-4">
                <p className="font-medium mb-2">Important Selection Notes:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Current ratings are for reference installation (Method C) at 30°C ambient</li>
                  <li>Apply derating factors for different installation methods and grouping</li>
                  <li>Check voltage drop calculations, especially for longer cable runs</li>
                  <li>Consider earth fault loop impedance requirements for protective device operation</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-te-sizing"
            question="Which size T&E cable is typically used for a domestic socket ring circuit?"
            options={["1.5 mm²", "2.5 mm²", "4.0 mm²", "6.0 mm²"]}
            correctIndex={1}
            explanation="2.5 mm² T&E is the standard size for domestic socket ring circuits, providing adequate current capacity when protected by a 32A device."
          />
          <Separator className="my-6" />

          {/* Advantages */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3">Advantages of T&E Cable</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Installation Benefits</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Easy to handle and route due to flat profile</li>
                    <li>Simple termination with standard accessories</li>
                    <li>No need for separate containment in many applications</li>
                    <li>Fits neatly under floorboards and against surfaces</li>
                    <li>Wide range of accessories available</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Economic Advantages</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Cost-effective compared to other cable types</li>
                    <li>Readily available from electrical wholesalers</li>
                    <li>Reduced labour time for installation</li>
                    <li>Lower material costs for containment</li>
                    <li>Standard sizes cover most domestic applications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
                <p className="font-medium mb-2">Technical Advantages:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Suitable for most domestic and light commercial applications</li>
                  <li>Good current-carrying capacity for its size</li>
                  <li>Complies with BS 7671 when properly installed</li>
                  <li>Proven reliability in UK electrical installations</li>
                  <li>Easy cable identification and fault-finding</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3">Limitations and Restrictions</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Environmental Limitations</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Not suitable for outdoor direct burial without protection</li>
                  <li>Limited resistance to mechanical damage</li>
                  <li>PVC sheath degrades under UV exposure</li>
                  <li>Not suitable for high-temperature environments (&gt;70°C)</li>
                  <li>Poor chemical resistance in corrosive environments</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Installation Restrictions</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Requires additional containment in areas at risk of damage</li>
                  <li>Cannot be used for flexible connections to equipment</li>
                  <li>Limited bending radius to avoid insulation damage</li>
                  <li>Not suitable for installations requiring frequent cable changes</li>
                  <li>Bare earth conductor requires sleeving at all terminations</li>
                </ul>
              </div>

              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <p className="font-medium mb-2">Where Additional Protection is Required:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Workshops and industrial areas with machinery</li>
                  <li>Areas accessible to the public where damage could occur</li>
                  <li>Outdoor installations (must use conduit or SWA)</li>
                  <li>Kitchens and food preparation areas at risk of impact</li>
                  <li>Any location where cables may be subject to mechanical stress</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-te-limitations"
            question="What must be done when T&E cable is at risk of mechanical damage?"
            options={["Use larger cable size", "Install in conduit or trunking", "Increase circuit protection", "Use different colours"]}
            correctIndex={1}
            explanation="T&E cable must be protected with conduit or trunking when there's risk of mechanical damage, as the PVC sheath offers limited protection."
          />
          <Separator className="my-6" />

          {/* Installation Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3">Installation Considerations and Best Practice</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Fixing and Support</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Use flat T&E cable clips at maximum 300mm horizontal spacing</li>
                    <li>Maximum 400mm vertical spacing for vertical runs</li>
                    <li>Clip within 150mm of terminations and accessories</li>
                    <li>Support cable to prevent sagging between fixings</li>
                    <li>Use appropriate clip size for cable dimensions</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Routing and Protection</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Avoid sharp bends that could damage insulation</li>
                    <li>Maintain minimum bending radius (typically 4x cable width)</li>
                    <li>Route away from heat sources and sharp edges</li>
                    <li>Provide mechanical protection where cables cross joists</li>
                    <li>Use grommets through metal enclosures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-green-400/30 rounded-lg p-4">
                <p className="font-medium mb-2">Termination Requirements:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Strip outer sheath carefully to avoid nicking conductor insulation</li>
                  <li>Sleeve bare CPC with green/yellow sleeving before termination</li>
                  <li>Ensure adequate conductor length for secure connections</li>
                  <li>Use appropriate terminal blocks or connector types</li>
                  <li>Secure outer sheath within enclosures where possible</li>
                  <li>Test insulation resistance and continuity after installation</li>
                </ul>
              </div>

              <div className="bg-card border border-cyan-400/30 rounded-lg p-4">
                <p className="font-medium mb-2">Special Installation Considerations:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Under floors:</strong> Run through joist centres or use protection plates</li>
                  <li><strong>In walls:</strong> Use safe zones as defined in BS 7671</li>
                  <li><strong>Bathroom zones:</strong> Follow IP rating requirements and RCD protection</li>
                  <li><strong>Concealed work:</strong> Ensure adequate protection against nail penetration</li>
                  <li><strong>Joint boxes:</strong> Use only where accessible for inspection</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Practical Installation Guide */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2"><Settings className="w-5 h-5" /> Practical Installation Guide</h3>
            <div className="space-y-6 text-xs sm:text-sm text-white">
              
              {/* Cable Clips and Fixings */}
              <div className="space-y-4">
                <h4 className="font-medium text-white">Cable Clips and Fixings</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Clip Types and Sizes</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Flat T&E clips:</strong> White or grey plastic, sized for cable width</li>
                      <li><strong>1.0-1.5mm²:</strong> 6mm clips with 3.5-4.0mm screws</li>
                      <li><strong>2.5mm²:</strong> 8mm clips with 4.0mm screws</li>
                      <li><strong>4.0-6.0mm²:</strong> 10mm clips with 4.5-5.0mm screws</li>
                      <li><strong>Heavy-duty clips:</strong> Metal clips for industrial applications</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                    <p className="font-medium mb-2">Installation Technique</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Mark clip positions with pencil before drilling</li>
                      <li>Use appropriate wall plugs for masonry/plasterboard</li>
                      <li>Don&apos;t over-tighten - cable should slide in clips</li>
                      <li>Ensure cables lie flat against surface</li>
                      <li>Group multiple cables neatly where possible</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                  <p className="font-medium mb-2">Clip Spacing Guidelines:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Horizontal runs:</strong> 300mm maximum, 250mm preferred</li>
                    <li><strong>Vertical runs:</strong> 400mm maximum, 350mm preferred</li>
                    <li><strong>Near terminations:</strong> Within 150mm of accessories</li>
                    <li><strong>Change of direction:</strong> Clip both sides of bends</li>
                    <li><strong>Through floors:</strong> Support at joist entry/exit points</li>
                  </ul>
                </div>
              </div>

              {/* Cable Stripping and Preparation */}
              <div className="space-y-4">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4" />
                  Cable Stripping and Preparation
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Tools Required</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Cable knife:</strong> Sharp, retractable blade</li>
                      <li><strong>Wire strippers:</strong> Adjustable for conductor sizes</li>
                      <li><strong>Side cutters:</strong> For trimming and cutting</li>
                      <li><strong>Cable sheath stripper:</strong> Dedicated T&E tool</li>
                      <li><strong>Green/yellow sleeving:</strong> Various sizes</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Stripping Technique</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Measure required strip length (typically 15-20mm)</li>
                      <li>Score outer sheath lightly - don&apos;t cut through</li>
                      <li>Bend cable at score line to open sheath</li>
                      <li>Cut excess sheath with side cutters</li>
                      <li>Strip individual conductor insulation (10-12mm)</li>
                      <li>Sleeve CPC with green/yellow identification</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-card border border-border/30 rounded-lg p-4">
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Critical Safety Points:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Never nick conductor insulation when stripping outer sheath</li>
                    <li>Check for damaged strands that could cause poor connections</li>
                    <li>Ensure adequate conductor length but avoid excess that could cause shorts</li>
                    <li>Always work with cable de-energised and isolated</li>
                  </ul>
                </div>
              </div>

              {/* Sleeving Requirements */}
              <div className="space-y-4">
                <h4 className="font-medium text-white">Sleeving Requirements and Techniques</h4>
                <div className="space-y-3">
                  <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                    <p className="font-medium mb-2">When Sleeving is Required</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>All CPC terminations:</strong> Must be sleeved green/yellow</li>
                      <li><strong>Consumer units:</strong> CPC sleeving throughout</li>
                      <li><strong>Junction boxes:</strong> CPC identification required</li>
                      <li><strong>Switch plates:</strong> Earth terminals need sleeving</li>
                      <li><strong>Socket outlets:</strong> Earth connection sleeving</li>
                    </ul>
                  </div>

                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Sleeving Selection and Application</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Size selection:</strong> Snug fit over conductor, not too tight</li>
                      <li><strong>Length:</strong> Cover all exposed copper plus 5-10mm extra</li>
                      <li><strong>Quality:</strong> Use proper electrical sleeving, not heat shrink</li>
                      <li><strong>Application:</strong> Push on firmly, ensure no copper visible</li>
                      <li><strong>Multiple cores:</strong> Sleeve each CPC individually</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Termination Techniques */}
              <div className="space-y-4">
                <h4 className="font-medium text-white">Termination Techniques</h4>
                <div className="space-y-3">
                  <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                    <p className="font-medium mb-2">Socket Outlet Termination</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Strip cable sheath 25-30mm, individual conductors 12mm</li>
                      <li>Sleeve CPC with green/yellow sleeving</li>
                      <li>Form conductors into neat loops for terminals</li>
                      <li>Connect: Live (L) = brown, Neutral (N) = blue, Earth (E) = sleeved CPC</li>
                      <li>Tighten terminal screws securely (but don&apos;t overtighten)</li>
                      <li>Perform tug test on each conductor</li>
                    </ol>
                  </div>

                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Consumer Unit Termination</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Strip cable for entry into enclosure (typically 40-50mm)</li>
                      <li>Route live to MCB/RCBO, neutral to neutral bar</li>
                      <li>Sleeve CPC and connect to earth bar</li>
                      <li>Secure cable sheath within enclosure using gland or clamp</li>
                      <li>Label circuits clearly with appropriate identification</li>
                      <li>Test all connections before energising</li>
                    </ol>
                  </div>

                  <div className="rounded-lg p-4 bg-elec-yellow/10 border border-elec-yellow/30">
                    <p className="font-medium mb-2">Junction Box Connections</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Use maintenance-free connectors (Wago, choc blocks with covers)</li>
                      <li>Ensure all connections are accessible for inspection</li>
                      <li>Maintain correct colour coding throughout</li>
                      <li>Secure cables to prevent strain on terminals</li>
                      <li>Use appropriate IP rating for environment</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Tools and Equipment */}
              <div className="space-y-4">
                <h4 className="font-medium text-white">Essential Tools and Equipment</h4>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Cutting Tools</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Cable knife/stripping tool</li>
                      <li>Wire strippers (adjustable)</li>
                      <li>Side cutters</li>
                      <li>Electrical scissors</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                    <p className="font-medium mb-2">Installation Tools</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Cordless drill/driver</li>
                      <li>Various drill bits</li>
                      <li>Wall plugs and screws</li>
                      <li>Spirit level</li>
                      <li>Tape measure</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                    <p className="font-medium mb-2">Testing Equipment</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Multifunction tester</li>
                      <li>Voltage indicator</li>
                      <li>Insulation resistance tester</li>
                      <li>Loop impedance tester</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world scenario: Kitchen Rewire</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="flex items-start gap-3 border-l-4 border-emerald-400 p-4 rounded">
              <Home className="w-5 h-5 text-elec-yellow mt-0.5" />
              <div>
                <p className="font-medium mb-2">The Project</p>
                <p>A domestic property kitchen rewire required complete electrical installation to serve:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Socket ring circuit for general appliances</li>
                  <li>LED downlight circuit for task lighting</li>
                  <li>Dedicated cooker circuit for electric range</li>
                  <li>Under-cabinet lighting circuit</li>
                  <li>Extractor fan connection</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-medium">T&E Cable Selection and Installation Strategy:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Cable Selection</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>2.5mm² T&E:</strong> Socket ring circuit (32A protection)</li>
                    <li><strong>1.5mm² T&E:</strong> LED lighting circuits (10A protection)</li>
                    <li><strong>6.0mm² T&E:</strong> Electric cooker circuit (32A protection)</li>
                    <li><strong>1.0mm² T&E:</strong> Extractor fan (6A protection)</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Protection Strategy</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Behind units:</strong> Mini-trunking for mechanical protection</li>
                    <li><strong>Under floors:</strong> Through joist centres with protection plates</li>
                    <li><strong>In walls:</strong> Safe zones with RCD protection</li>
                    <li><strong>At terminations:</strong> All CPCs sleeved green/yellow</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded">
              <p className="font-medium mb-2">Key Success Factors:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper cable sizing calculations including voltage drop for longer runs</li>
                <li>Mechanical protection where cables could be damaged by fitted units</li>
                <li>Compliance with kitchen IP rating requirements near water sources</li>
                <li>All installation within BS 7671 safe zones for concealed cables</li>
                <li>Comprehensive testing including insulation resistance and earth loop impedance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Common mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Common Mistakes and How to Avoid Them</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Termination Errors</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Wrong:</strong> Leaving CPC bare at terminations</li>
                <li><strong>Right:</strong> Always sleeve CPC with green/yellow identification</li>
                <li><strong>Wrong:</strong> Nicking conductor insulation when stripping outer sheath</li>
                <li><strong>Right:</strong> Use proper cable stripping tools and techniques</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Installation Mistakes</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Wrong:</strong> Excessive clip spacing causing cable sag</li>
                <li><strong>Right:</strong> Follow BS 7671 maximum spacing requirements (300mm horizontal)</li>
                <li><strong>Wrong:</strong> Sharp bends damaging cable insulation</li>
                <li><strong>Right:</strong> Maintain minimum bending radius throughout installation</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="font-medium mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Best Practice Tips</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Always calculate voltage drop for longer cable runs</li>
                <li>Provide mechanical protection where cables may be disturbed</li>
                <li>Use appropriate glands and grommets for enclosure entries</li>
                <li>Test installations thoroughly before energising</li>
                <li>Document cable routes for future maintenance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Context and Compliance</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">Cable Selection (Chapter 52)</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>T&E cables must be suitable for environmental conditions</li>
                <li>Consider external influences when selecting cable type</li>
                <li>Ensure adequate current-carrying capacity with derating factors</li>
                <li>Check voltage drop limits (typically 3% for lighting, 5% for power)</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Installation Methods (Chapter 52)</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Follow prescribed installation methods for current ratings</li>
                <li>Maintain safe zones for concealed cables in walls</li>
                <li>Provide RCD protection for cables in walls at less than 50mm depth</li>
                <li>Use mechanical protection where cables may be damaged</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">Earth Arrangements (Chapter 54)</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>CPC must be identified with green/yellow sleeving</li>
                <li>Ensure adequate CPC size for fault protection</li>
                <li>Maintain earth continuity throughout installation</li>
                <li>Test earth loop impedance for protective device operation</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
              <p className="text-white">Isolate, lock-off and prove dead before work. Follow manufacturer instructions and BS 7671 requirements for all T&E installations.</p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-white">
            {faqs.map((f, i) => (
              <li key={i} className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium mb-1">{f.q}</p>
                <p className="text-white">{f.a}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quick Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Knowledge Check</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((q, index) => (
              <InlineCheck
                key={q.id}
                id={`quick-check-${q.id}`}
                question={q.question}
                options={q.options}
                correctIndex={q.correctAnswer}
                explanation={q.explanation}
              />
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-16 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Section Quiz</h2>
          <Quiz questions={quizQuestions as any} title="Twin and Earth Cable Knowledge Check" />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Wiring Systems Overview
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-3">
              Next: Single Core Cables
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module3Section1_2;