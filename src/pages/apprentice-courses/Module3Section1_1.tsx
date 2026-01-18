import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Cable, Wrench, Shield, AlertTriangle, CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Which wiring system requires the most planning but offers maximum protection?",
    options: ["Surface wiring", "PVC conduit", "Steel conduit", "Flexible cord"],
    correctAnswer: 2,
    explanation: "Steel conduit provides excellent mechanical and fire protection but requires careful planning for routing and earthing continuity."
  },
  {
    id: 2,
    question: "When is surface wiring most appropriate?",
    options: ["New builds", "Temporary installations", "Underground", "High-risk environments"],
    correctAnswer: 1,
    explanation: "Surface wiring is ideal for temporary installations, retrofits, and situations where concealed wiring isn't practical."
  },
  {
    id: 3,
    question: "What's the key advantage of trunking systems?",
    options: ["Lowest cost", "Easy cable changes", "Best protection", "Smallest size"],
    correctAnswer: 1,
    explanation: "Trunking allows easy access for cable changes, additions, and maintenance without major disruption."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which wiring system offers the best mechanical protection in industrial environments?",
    options: ["Surface wiring", "PVC conduit", "Steel conduit", "Trunking"],
    correctAnswer: 2,
    explanation: "Steel conduit provides superior mechanical protection and is preferred in industrial settings where cables may be subject to impact damage."
  },
  {
    id: 2,
    question: "For a domestic kitchen renovation where cables need to be hidden, what's the most practical approach?",
    options: ["Surface wiring with clips", "Concealed conduit in walls", "SWA cable", "Flexible cord only"],
    correctAnswer: 1,
    explanation: "Concealed PVC conduit allows cables to be hidden within walls while providing protection and allowing future cable changes."
  },
  {
    id: 3,
    question: "What's the maximum recommended length for flexible cord connections?",
    options: ["2 metres", "5 metres", "10 metres", "No limit"],
    correctAnswer: 0,
    explanation: "BS 7671 recommends flexible cords should generally not exceed 2 metres and should not be used as permanent wiring."
  },
  {
    id: 4,
    question: "Which system is most suitable for underground cable runs?",
    options: ["PVC conduit", "Steel conduit", "SWA cable", "Surface wiring"],
    correctAnswer: 2,
    explanation: "SWA (Steel Wire Armoured) cable is designed for underground use with integral protection and moisture resistance."
  },
  {
    id: 5,
    question: "In an office fit-out with frequent layout changes, which system offers the most flexibility?",
    options: ["Fixed conduit", "Surface clips", "Trunking", "Buried cables"],
    correctAnswer: 2,
    explanation: "Trunking systems allow easy access for cable changes and additions, making them ideal for environments with changing requirements."
  },
  {
    id: 6,
    question: "What earthing consideration is critical with steel conduit?",
    options: ["No earthing needed", "Earth at one end only", "Continuous earth path", "Plastic bushes required"],
    correctAnswer: 2,
    explanation: "Steel conduit must maintain continuous earthing throughout the system, with proper bonding at all joints and connections."
  },
  {
    id: 7,
    question: "Which factor is most important when selecting between PVC and steel conduit?",
    options: ["Cost only", "Environmental conditions", "Cable size", "Voltage level"],
    correctAnswer: 1,
    explanation: "Environmental conditions (temperature, mechanical stress, fire risk, corrosion) are the primary factors in material selection."
  },
  {
    id: 8,
    question: "For temporary building site installations, what's the most appropriate wiring method?",
    options: ["Permanent conduit", "SWA to weatherproof outlets", "Standard flexible cords", "Surface clipping only"],
    correctAnswer: 1,
    explanation: "SWA cable to proper weatherproof outlets provides the durability and protection needed for construction site conditions."
  }
];

const Module3Section1_1: React.FC = () => {
  useSEO(
    "Common Wiring Systems – Module 3 (3.1.1)",
    "Compare surface wiring, conduit, trunking, SWA and flexible systems. BS 7671 compliant selection guide for UK electrical installations."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Common Wiring Systems – Module 3 (3.1.1)",
    description:
      "Compare surface wiring, conduit, trunking, SWA and flexible systems. BS 7671 compliant selection guide for UK electrical installations.",
    articleSection: "Electrical Installation",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "Can I mix different wiring systems in one installation?", a: "Yes, but ensure proper transitions, maintain earthing continuity, and follow BS 7671 requirements for each system type." },
    { q: "What determines cable derating in trunking?", a: "Number of cables, grouping, ambient temperature, and ventilation. Use derating factors from BS 7671 Appendix 4." },
    { q: "When is surface wiring not permitted?", a: "Generally not suitable for bathrooms, areas at risk of mechanical damage, or where concealment is required by building regulations." },
    { q: "How do I ensure earth continuity in steel conduit?", a: "Use proper couplers, bond all joints, maintain metallic contact, and test continuity. Consider separate CPC if in doubt." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Cable className="h-4 w-4" />
              <span>Module 3.1.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Common Wiring Systems Overview
            </h1>
            <p className="text-white/80">
              Understanding surface wiring, conduit, trunking, SWA and flexible systems for practical UK installations
            </p>
          </header>

          {/* Quick Summary Boxes */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
              <ul className="text-sm text-white space-y-1">
                <li>Choose wiring systems based on protection needed, environment, and accessibility requirements</li>
                <li>Surface = quick/temporary; Conduit = protection; Trunking = access; SWA = outdoor/underground</li>
                <li>All systems must comply with BS 7671 and maintain earth continuity</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Spot:</strong> Look for environmental conditions, mechanical risk, and access needs</li>
                <li><strong>Use:</strong> Match system to application: industrial = steel conduit, office = trunking</li>
                <li><strong>Check:</strong> Earth continuity, appropriate glands, and cable support spacing</li>
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Compare and select appropriate wiring systems for different applications",
                "Understand installation requirements for each system type",
                "Apply BS 7671 requirements for cable support and protection",
                "Assess cost, installation time and maintenance implications",
                "Identify common mistakes and compliance issues",
                "Plan system transitions and proper termination techniques"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="border-white/5 mb-12" />

          {/* Section 1: Surface Wiring */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Surface Wiring Systems
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Description:</strong> Cables run on the surface of walls, ceilings or structures, secured with clips or cleats.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Advantages</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Quick installation and low cost</li>
                    <li>Easy inspection and maintenance</li>
                    <li>Suitable for temporary installations</li>
                    <li>No special tools required</li>
                    <li>Easy cable identification</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10">
                  <p className="text-sm font-medium text-white mb-2">Limitations</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Poor aesthetic appearance</li>
                    <li>Vulnerable to mechanical damage</li>
                    <li>Limited to certain environments</li>
                    <li>May not meet building regulations</li>
                    <li>Dust accumulation issues</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2">BS 7671 Requirements:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Cable clips maximum 300mm apart horizontally, 400mm vertically</li>
                  <li>Appropriate cable type for environmental conditions</li>
                  <li>Protection against mechanical damage where necessary</li>
                  <li>Separate routes for different circuits where practical</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-2">Typical Applications:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Temporary installations and building sites</li>
                  <li>Industrial areas with easy access requirements</li>
                  <li>Retrofit installations in existing buildings</li>
                  <li>Areas where concealment isn't required</li>
                  <li>Service rooms and plant areas</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-surface-wiring"
            question="What's the maximum spacing for cable clips on horizontal surface runs?"
            options={["200mm", "300mm", "400mm", "500mm"]}
            correctIndex={1}
            explanation="BS 7671 requires cable clips at maximum 300mm spacing for horizontal runs and 400mm for vertical runs."
          />

          {/* Section 2: PVC Conduit */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              PVC Conduit Systems
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Description:</strong> Plastic conduit providing mechanical protection and allowing cable changes. Available in heavy and light gauge versions.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Construction Features</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Corrosion resistant PVC material</li>
                    <li>Self-extinguishing properties</li>
                    <li>Smooth internal bore for cable pulling</li>
                    <li>Various sizes: 16mm to 50mm diameter</li>
                    <li>Light and heavy gauge options</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10">
                  <p className="text-sm font-medium text-white mb-2">Installation Benefits</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Easy to cut and join</li>
                    <li>Wide range of accessories</li>
                    <li>Can be bent with spring or former</li>
                    <li>Suitable for concealed installation</li>
                    <li>Good chemical resistance</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10">
                <p className="text-sm font-medium text-white mb-2">Environmental Considerations:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li><strong>Temperature:</strong> Standard PVC: -5°C to +60°C</li>
                  <li><strong>UV exposure:</strong> Requires UV-stabilised grade for outdoor use</li>
                  <li><strong>Mechanical stress:</strong> Heavy gauge for areas at risk</li>
                  <li><strong>Fire performance:</strong> Meets flame retardant standards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Steel Conduit */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Steel Conduit Systems
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Description:</strong> Metal conduit providing maximum mechanical and fire protection. Requires careful earthing and corrosion protection.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Superior Protection</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Excellent mechanical protection</li>
                    <li>Fire resistant construction</li>
                    <li>EMC screening properties</li>
                    <li>Vandal resistant installation</li>
                    <li>Long service life when properly installed</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Installation Requirements</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Continuous earth path essential</li>
                    <li>Proper coupling and bonding</li>
                    <li>Corrosion protection needed</li>
                    <li>Skilled installation required</li>
                    <li>Special tools for threading/bending</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Critical Earthing Requirements:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>All joints must maintain electrical continuity</li>
                  <li>Use proper steel conduit couplers and fittings</li>
                  <li>Test earth loop impedance through conduit</li>
                  <li>Consider separate CPC if continuity uncertain</li>
                  <li>Bond to main earthing terminal</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-steel-conduit"
            question="What is the most critical requirement when installing steel conduit?"
            options={["Correct cable sizing", "Continuous earth path", "Regular support spacing", "Proper labelling"]}
            correctIndex={1}
            explanation="Maintaining continuous earthing throughout the steel conduit system is critical for both safety and BS 7671 compliance."
          />

          {/* Section 4: Trunking Systems */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Trunking Systems
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Description:</strong> Large rectangular cable containment allowing easy access for cable management, changes and additions.
              </p>

              <div className="p-4 rounded-lg bg-white/5 mb-4">
                <p className="text-sm font-medium text-white mb-2">Cable Management Advantages</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Easy cable additions and changes</li>
                  <li>Large cable capacity</li>
                  <li>Good ventilation for heat dissipation</li>
                  <li>Cable segregation possibilities</li>
                  <li>Professional appearance</li>
                  <li>Accessible for maintenance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 mb-4">
                <p className="text-sm font-medium text-white mb-2">Derating Considerations</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Apply grouping factors for multiple cables</li>
                  <li>Consider thermal effects of enclosed installation</li>
                  <li>Use BS 7671 Appendix 4 derating tables</li>
                  <li>Ensure adequate ventilation where possible</li>
                  <li>Monitor cable loading and temperature</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-sm font-medium text-white mb-2">Typical Commercial Applications:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Office buildings with changing layouts</li>
                  <li>Industrial installations requiring access</li>
                  <li>Data centres and IT environments</li>
                  <li>Retail and commercial premises</li>
                  <li>Educational and healthcare facilities</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: SWA Cable */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              SWA (Steel Wire Armoured) Cable
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Description:</strong> Armoured cable with integral protection suitable for direct burial, outdoor installation and high-risk environments.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-cyan-500/10">
                  <p className="text-sm font-medium text-white mb-2">Construction</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Copper or aluminium conductors</li>
                    <li>XLPE or PVC insulation</li>
                    <li>Steel wire armour protection</li>
                    <li>PVC outer sheath</li>
                    <li>Various core configurations</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-teal-500/10">
                  <p className="text-sm font-medium text-white mb-2">Applications</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>Underground cable runs</li>
                    <li>External building connections</li>
                    <li>Industrial harsh environments</li>
                    <li>Outdoor lighting circuits</li>
                    <li>Between buildings distribution</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10">
                <p className="text-sm font-medium text-white mb-2">Installation Requirements:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Appropriate glands for indoor/outdoor termination</li>
                  <li>Armour earthing at both ends (or one end with earth link)</li>
                  <li>Burial depth minimum 450mm (or protection)</li>
                  <li>Sand bed and warning tape for buried cables</li>
                  <li>Route marking and cable detection</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Flexible Cord */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Flexible Cord and Cable
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Description:</strong> Flexible cables for temporary connections and movable equipment. Not suitable for permanent fixed wiring.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 mb-4">
                <p className="text-sm font-medium text-white mb-2">Limitations and Restrictions:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Maximum length typically 2 metres</li>
                  <li>Not for permanent installation</li>
                  <li>Requires mechanical protection where at risk</li>
                  <li>Regular inspection needed</li>
                  <li>Must not be used as substitute for fixed wiring</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-sm font-medium text-white mb-2">Appropriate Uses:</p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Portable appliance connections</li>
                  <li>Temporary lighting and power</li>
                  <li>Extension leads and adaptors</li>
                  <li>Movable equipment connection</li>
                  <li>Test equipment and tools</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Divider */}
          <hr className="border-white/5 my-12" />

          {/* System Comparison Matrix */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">System Comparison Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-white border-b border-white/10">
                  <tr>
                    <th className="py-3 pr-4">System</th>
                    <th className="py-3 pr-4">Protection</th>
                    <th className="py-3 pr-4">Cost</th>
                    <th className="py-3 pr-4">Installation</th>
                    <th className="py-3 pr-4">Access</th>
                    <th className="py-3 pr-4">Best Use</th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  <tr className="border-t border-white/10">
                    <td className="py-3 pr-4 font-medium">Surface</td>
                    <td className="py-3 pr-4">Low</td>
                    <td className="py-3 pr-4">Low</td>
                    <td className="py-3 pr-4">Quick</td>
                    <td className="py-3 pr-4">Excellent</td>
                    <td className="py-3 pr-4">Temporary/Industrial</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-3 pr-4 font-medium">PVC Conduit</td>
                    <td className="py-3 pr-4">Good</td>
                    <td className="py-3 pr-4">Medium</td>
                    <td className="py-3 pr-4">Moderate</td>
                    <td className="py-3 pr-4">Limited</td>
                    <td className="py-3 pr-4">Domestic/Light Commercial</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-3 pr-4 font-medium">Steel Conduit</td>
                    <td className="py-3 pr-4">Excellent</td>
                    <td className="py-3 pr-4">High</td>
                    <td className="py-3 pr-4">Skilled</td>
                    <td className="py-3 pr-4">Limited</td>
                    <td className="py-3 pr-4">Industrial/High Risk</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-3 pr-4 font-medium">Trunking</td>
                    <td className="py-3 pr-4">Good</td>
                    <td className="py-3 pr-4">Medium-High</td>
                    <td className="py-3 pr-4">Moderate</td>
                    <td className="py-3 pr-4">Excellent</td>
                    <td className="py-3 pr-4">Commercial/Office</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-3 pr-4 font-medium">SWA</td>
                    <td className="py-3 pr-4">Excellent</td>
                    <td className="py-3 pr-4">High</td>
                    <td className="py-3 pr-4">Specialised</td>
                    <td className="py-3 pr-4">Poor</td>
                    <td className="py-3 pr-4">Underground/Outdoor</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-3 pr-4 font-medium">Flexible</td>
                    <td className="py-3 pr-4">Variable</td>
                    <td className="py-3 pr-4">Low</td>
                    <td className="py-3 pr-4">Simple</td>
                    <td className="py-3 pr-4">Full</td>
                    <td className="py-3 pr-4">Portable/Temporary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Real-world Scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Real-world Scenario: Commercial Kitchen Renovation</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white mb-2">The Challenge</p>
                    <p className="text-sm text-white/90">A restaurant kitchen needs complete electrical renovation. The space includes:</p>
                    <ul className="text-sm text-white/90 list-disc pl-6 mt-2 space-y-1">
                      <li>High-power cooking equipment (three-phase)</li>
                      <li>Wash areas with water exposure risk</li>
                      <li>Food preparation areas requiring easy cleaning</li>
                      <li>Extraction systems and refrigeration</li>
                      <li>Future flexibility for equipment changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10">
                  <p className="text-sm font-medium text-white mb-2">Main Distribution</p>
                  <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                    <li><strong>SWA cable</strong> for supply from external meter</li>
                    <li>Steel conduit for main panel feeds</li>
                    <li>Mechanical protection in high-traffic areas</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Equipment Circuits</p>
                  <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                    <li><strong>Steel conduit</strong> for fixed cooking equipment</li>
                    <li>IP65-rated outlets for cleaning resilience</li>
                    <li>Separate circuits for each major appliance</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Lighting & Sockets</p>
                  <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                    <li><strong>Trunking system</strong> above service areas</li>
                    <li>Easy access for future changes</li>
                    <li>Segregated power and data routes</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10">
                  <p className="text-sm font-medium text-white mb-2">Temporary/Flexible</p>
                  <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                    <li><strong>Armoured flexibles</strong> to mobile equipment</li>
                    <li>Specialist food-grade cable types</li>
                    <li>Regular inspection schedule</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-2">Key Success Factors:</p>
                <ul className="text-sm text-white/90 list-disc pl-6 space-y-1">
                  <li>Match system to specific environmental demands</li>
                  <li>Plan for future equipment changes and maintenance</li>
                  <li>Ensure compliance with food safety regulations</li>
                  <li>Consider cleaning procedures and chemical resistance</li>
                  <li>Provide appropriate IP ratings for each area</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Common Mistakes and How to Avoid Them</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  System Selection Errors
                </p>
                <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                  <li><strong>Wrong:</strong> Using surface wiring in areas requiring concealment</li>
                  <li><strong>Right:</strong> Check building regulations and aesthetic requirements first</li>
                  <li><strong>Wrong:</strong> PVC conduit in high-temperature environments</li>
                  <li><strong>Right:</strong> Use appropriate temperature ratings for all components</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Installation Mistakes
                </p>
                <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                  <li><strong>Wrong:</strong> Poor earthing continuity in steel conduit systems</li>
                  <li><strong>Right:</strong> Test continuity and use proper bonding techniques</li>
                  <li><strong>Wrong:</strong> Inadequate cable support spacing</li>
                  <li><strong>Right:</strong> Follow BS 7671 maximum spacing requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Best Practice Tips
                </p>
                <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                  <li>Always consider future access and maintenance requirements</li>
                  <li>Plan cable routes to minimise mechanical damage risk</li>
                  <li>Use appropriate IP ratings for environmental conditions</li>
                  <li>Document wiring systems for future reference</li>
                  <li>Consider cable capacity and derating factors early</li>
                </ul>
              </div>
            </div>
          </section>

          {/* BS 7671 Context */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">BS 7671 Context and Compliance</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Selection and Erection (Part 5)</p>
                <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                  <li>Wiring systems must suit environmental conditions</li>
                  <li>Consider external influences (AD, AE, AF codes)</li>
                  <li>Maintain appropriate IP ratings</li>
                  <li>Ensure adequate mechanical protection</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-sm font-medium text-white mb-2">Current-carrying Capacity (Appendix 4)</p>
                <ul className="text-sm text-white/90 list-disc pl-4 space-y-1">
                  <li>Apply grouping factors for multiple cables</li>
                  <li>Consider thermal insulation effects</li>
                  <li>Account for ambient temperature variations</li>
                  <li>Use appropriate installation methods</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50" role="alert">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white">Isolate, lock-off and prove dead before work. Follow manufacturer instructions and BS 7671 requirements for all wiring systems.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                  <h3 className="text-sm font-medium text-white mb-1">{faq.q}</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="border-white/5 my-12" />

          {/* Quick Knowledge Check */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Knowledge Check</h2>
            <div className="space-y-6">
              {quickCheckQuestions.map((q) => (
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
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions as any} title="Wiring Systems Knowledge Check" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 3.1
              </Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
              <Link to="../1-2">
                Next: Twin and Earth Cable
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </article>
    </div>
  );
};

export default Module3Section1_1;
