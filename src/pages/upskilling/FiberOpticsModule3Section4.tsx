import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Package, Wrench, Shield, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Splice Enclosure Mounting | Fibre Optics Module 3";
const DESCRIPTION = "Master fibre optic splice enclosure selection, mounting, and installation. Learn dome, inline, and wall-mount closure types, sealing methods, and UK installation best practices.";

const quickCheckQuestions = [
  {
    id: "fo-m3s4-qc1",
    question: "What is the primary purpose of a fibre splice enclosure?",
    options: ["Signal amplification", "Protect splices from environment and provide organisation", "Convert singlemode to multimode", "Provide power to equipment"],
    correctIndex: 1,
    explanation: "Splice enclosures protect fusion splices and mechanical splices from environmental factors (moisture, dirt, physical damage) while organising fibres and maintaining bend radius."
  },
  {
    id: "fo-m3s4-qc2",
    question: "Dome-style splice closures are typically used for:",
    options: ["Indoor rack mounting", "Underground and aerial installations", "Desktop applications", "High-temperature environments only"],
    correctIndex: 1,
    explanation: "Dome closures (vertical entry) are designed for underground chambers and aerial mounting, providing 360° cable entry and excellent environmental sealing."
  },
  {
    id: "fo-m3s4-qc3",
    question: "The minimum splice tray coil radius for standard fibre is typically:",
    options: ["25mm", "40mm", "60mm", "100mm"],
    correctIndex: 2,
    explanation: "Standard splice trays maintain a minimum 60mm coil radius for stored fibre, ensuring bend radius compliance and preventing macrobend losses."
  }
];

const quizQuestions = [
  {
    question: "An inline splice closure is characterised by:",
    options: ["Vertical cable entry from top", "Horizontal cable entry from both ends", "Single cable entry only", "No cable entry - self-contained"],
    correctAnswer: 1
  },
  {
    question: "Heat-shrink splice closures provide sealing through:",
    options: ["Mechanical gaskets only", "Applied heat shrinking outer sleeve and sealant", "Adhesive tape", "Pressure fit"],
    correctAnswer: 1
  },
  {
    question: "When re-entering a sealed splice closure, you should:",
    options: ["Cut through the seal and replace closure", "Use the designed re-entry method if available", "Never re-enter - always replace", "Drill through the side"],
    correctAnswer: 1
  },
  {
    question: "Splice trays are used inside closures to:",
    options: ["Amplify signal", "Organise splices and maintain bend radius", "Convert connector types", "Provide power distribution"],
    correctAnswer: 1
  },
  {
    question: "The IP rating 'IP68' on a closure indicates:",
    options: ["Indoor use only", "Protection against dust and continuous water immersion", "Fire resistance only", "EMI shielding"],
    correctAnswer: 1
  },
  {
    question: "Cable sealing in closures is typically achieved with:",
    options: ["Standard PVC tape", "Gel seals, gaskets, or heat-shrink entries", "Cable ties only", "No sealing required for fibre"],
    correctAnswer: 1
  },
  {
    question: "A wall-mount splice enclosure is appropriate for:",
    options: ["Underground chambers", "Indoor termination points", "Aerial installations", "Submarine cables"],
    correctAnswer: 1
  },
  {
    question: "Splice closure capacity is specified by:",
    options: ["Physical size only", "Maximum number of splice trays/fibres", "Cable diameter only", "Power consumption"],
    correctAnswer: 1
  },
  {
    question: "When installing an aerial closure, you must:",
    options: ["Ensure proper bonding to messenger wire and weatherproofing", "Use indoor-rated closures", "Avoid any mechanical support", "Install horizontally only"],
    correctAnswer: 0
  },
  {
    question: "Splice tray organisation should ensure:",
    options: ["Maximum fibre density", "Each splice is labelled, accessible, and bend radius maintained", "Fibres are coiled as tightly as possible", "Random placement for faster work"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I re-enter a heat-shrink splice closure?",
    answer: "Some heat-shrink closures are designed for re-entry using a special tool to cut the shrink sleeve without damaging cables. Others are single-entry only. Check manufacturer specifications. For re-enterable installations, consider mechanical closures or gel-sealed types that are specifically designed for multiple access."
  },
  {
    question: "How do I choose between dome and inline closures?",
    answer: "Dome closures suit underground and aerial applications where cables enter from multiple directions or vertically. Inline closures suit duct routes where cables pass straight through with minimal branching. Consider: cable entry directions, mounting position, space available, and re-entry requirements."
  },
  {
    question: "What's inside a typical splice closure?",
    answer: "A splice closure contains: splice trays (holding fusion or mechanical splices), fibre management guides (maintaining bend radius), cable entry ports with seals, strength member anchor points, ground bonding points (if metallic cables), and often a protective inner housing. Larger closures may have multiple stacked splice trays."
  },
  {
    question: "How do I seal cable entries properly?",
    answer: "Use the closure manufacturer's sealing system—typically gel seals that compress around the cable, mechanical gland compression, or heat-shrink entry boots. Ensure cable outer sheath is clean and undamaged at the entry point. Follow manufacturer torque specifications for mechanical seals. Test seal integrity before burial or final installation."
  },
  {
    question: "What IP rating do I need for underground installation?",
    answer: "IP68 is standard for buried or submerged closures, indicating protection against continuous water immersion (typically tested at 1.5m depth for 30 minutes or more). For surface-mounted outdoor use, IP67 may be adequate. Check specific immersion depth and duration ratings as IP68 ratings vary by manufacturer."
  },
  {
    question: "How should I document splice closure contents?",
    answer: "Document: closure location (GPS/address), cable identities entering/exiting, fibre assignments by tube/position, splice loss values, date of installation/modification, technician name. Use closure ID labels externally. Store records in asset management system. Include photos of internal organisation for future reference."
  }
];

const FiberOpticsModule3Section4 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 3</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Package className="h-4 w-4" />
            Module 3 • Section 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Splice Enclosure Mounting
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Closure selection, installation, and environmental protection
          </p>
        </section>

        {/* Quick Summary Cards */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">In 30 Seconds</h3>
                <p className="text-sm text-white/80">
                  Closures protect splices from environment. Dome = underground/aerial. Inline = duct runs. IP68 for buried. Maintain 60mm fibre coil radius. Seal all entries properly.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Install It / Seal It</h3>
                <p className="text-sm text-white/80">
                  Match closure to environment (IP rating). Clean cables before sealing. Organise trays logically. Document fibre positions. Test seal before final installation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Closure types and applications",
              "Environmental protection ratings",
              "Splice tray organisation",
              "Sealing methods and techniques",
              "Mounting configurations",
              "Documentation requirements"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Closure Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Closure Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Splice enclosures</strong> (closures) protect fibre splices from environmental damage while providing organised storage and bend radius management. Different closure designs suit different installation scenarios.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Dome Closure</h4>
                <p className="text-sm text-white/70 mb-2">Vertical entry, dome-shaped housing</p>
                <ul className="text-sm space-y-1">
                  <li>• Underground/manhole installation</li>
                  <li>• Aerial pole mounting</li>
                  <li>• Multiple cable entries from base</li>
                  <li>• High fibre capacity (up to 576+)</li>
                  <li>• Excellent environmental sealing</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Inline/Horizontal Closure</h4>
                <p className="text-sm text-white/70 mb-2">Horizontal entry from ends</p>
                <ul className="text-sm space-y-1">
                  <li>• Duct installations</li>
                  <li>• Direct burial applications</li>
                  <li>• Linear cable routes</li>
                  <li>• Moderate capacity (24-288 fibres)</li>
                  <li>• Compact profile for duct</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Wall-Mount Closure</h4>
                <p className="text-sm text-white/70 mb-2">Indoor/protected environments</p>
                <ul className="text-sm space-y-1">
                  <li>• Building entry points</li>
                  <li>• Riser terminations</li>
                  <li>• Cabinet/rack mounting</li>
                  <li>• Lower IP rating acceptable</li>
                  <li>• Easy access for maintenance</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Aerial Closure</h4>
                <p className="text-sm text-white/70 mb-2">Pole/strand mounted</p>
                <ul className="text-sm space-y-1">
                  <li>• Overhead cable networks</li>
                  <li>• UV-resistant materials</li>
                  <li>• Wind/ice load rated</li>
                  <li>• Messenger attachment points</li>
                  <li>• IP65/IP68 rated</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Environmental Protection */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">Environmental Protection</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Closures are rated using the <strong>IP (Ingress Protection)</strong> system to indicate protection against dust and water. Selecting the correct IP rating for the installation environment is critical for long-term reliability.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">IP Rating Guide for Closures</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span><strong>IP54</strong></span>
                  <span>Indoor, protected environments</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span><strong>IP65</strong></span>
                  <span>Outdoor, protected from direct water jets</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span><strong>IP67</strong></span>
                  <span>Temporary immersion (up to 1m, 30 min)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>IP68</strong></span>
                  <span>Continuous immersion (depth/time varies)</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Selecting IP Rating by Application
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Indoor (dry):</strong> IP54 minimum</li>
                <li>• <strong>Indoor (damp/unheated):</strong> IP65 minimum</li>
                <li>• <strong>External above ground:</strong> IP67 minimum</li>
                <li>• <strong>Underground chamber:</strong> IP68 (subject to flooding)</li>
                <li>• <strong>Direct burial:</strong> IP68 with pressure rating</li>
              </ul>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Temperature Considerations
              </h4>
              <p className="text-sm">
                IP ratings don't cover temperature. Check closure material specifications for operating range. Standard closures: -20°C to +60°C. Extreme environments may need extended range (-40°C to +80°C). Consider thermal cycling effects on seals in locations with large temperature swings.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: Splice Tray Organisation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">Splice Tray Organisation</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Splice trays</strong> inside closures hold individual splices while managing fibre routing and bend radius. Proper tray organisation ensures reliable operation and enables future maintenance access.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Tray Components</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Splice holders:</strong> Protect individual fusion or mechanical splices</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Fibre guides:</strong> Route fibres maintaining minimum radius</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Coil radius:</strong> 60mm minimum for standard fibre</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Heat shrink storage:</strong> Organised sleeve placement</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Labelling area:</strong> Fibre identification markings</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Organisation Best Practices
              </h4>
              <ul className="text-sm space-y-1">
                <li>• One cable per tray where possible for clear identification</li>
                <li>• Route fibres in consistent direction (clockwise or anticlockwise)</li>
                <li>• Don't overfill trays—leave space for re-work</li>
                <li>• Label each splice position with fibre identity</li>
                <li>• Document splice loss values per position</li>
                <li>• Stack trays logically (cable 1 at bottom, etc.)</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Fibre Slack Management</h4>
              <p className="text-sm text-white/70 mb-2">
                Each splice requires adequate fibre slack for:
              </p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Initial splice:</strong> ~1m each fibre minimum</li>
                <li>• <strong>Re-splice allowance:</strong> Additional 0.5m recommended</li>
                <li>• <strong>Coiled storage:</strong> Must maintain 60mm radius</li>
                <li>• <strong>Future access:</strong> Allow lifting tray without strain</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 4: Sealing Methods */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">Sealing Methods</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The <strong>sealing system</strong> is critical for environmental protection. Different closure designs use various sealing approaches, each with specific installation requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Heat-Shrink Sealing</h4>
                <ul className="text-sm space-y-1">
                  <li>• Outer sleeve shrinks over closure body</li>
                  <li>• Mastic sealant provides inner seal</li>
                  <li>• Excellent long-term reliability</li>
                  <li>• May be single-use or re-enterable</li>
                  <li>• Requires heat gun for installation</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Mechanical Sealing</h4>
                <ul className="text-sm space-y-1">
                  <li>• Gaskets compress with bolts/latches</li>
                  <li>• Fully re-enterable design</li>
                  <li>• No special tools required</li>
                  <li>• Gaskets may need replacement over time</li>
                  <li>• Quick installation and access</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Cable Entry Sealing</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium text-white">Gel Seals</h5>
                  <p className="text-white/70">Self-healing gel blocks that compress around cables. Re-enterable, maintains seal when cable is removed and re-inserted. Common in modern closures.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Mechanical Glands</h5>
                  <p className="text-white/70">Compression fittings that clamp around cable. Adjustable for different cable diameters. Require correct size selection.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Heat-Shrink Boots</h5>
                  <p className="text-white/70">Individual heat-shrink sleeves over each cable entry. Excellent seal but typically single-use. Common with heat-shrink closures.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Sealing Tips
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Clean cable sheath thoroughly before sealing</li>
                <li>• Verify cable diameter matches seal port range</li>
                <li>• Follow manufacturer torque specs for mechanical seals</li>
                <li>• Apply heat evenly for heat-shrink (avoid scorching)</li>
                <li>• Test seal integrity before final installation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Mounting Configurations */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">Mounting Configurations</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper mounting ensures closure security, cable strain relief, and accessible maintenance. Mounting requirements vary by closure type and installation environment.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Underground/Chamber Mounting
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Mount dome closures vertically on brackets</li>
                <li>• Position above maximum flood level where possible</li>
                <li>• Secure cables to chamber walls/racks</li>
                <li>• Provide strain relief for incoming cables</li>
                <li>• Allow working space around closure for access</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Aerial Mounting</h4>
              <ul className="text-sm space-y-1">
                <li>• Attach to messenger wire or strand using approved clamps</li>
                <li>• Bond metallic closure elements to system ground</li>
                <li>• Ensure UV-rated closure and mounting hardware</li>
                <li>• Account for wind/ice loading in bracket selection</li>
                <li>• Maintain cable bend radius at entry points</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Wall/Indoor Mounting</h4>
              <ul className="text-sm space-y-1">
                <li>• Use appropriate wall fixings for substrate</li>
                <li>• Mount at accessible working height (1.2-1.8m)</li>
                <li>• Allow swing clearance for door-opening types</li>
                <li>• Route cables neatly to entry points</li>
                <li>• Label closure externally with ID and contents</li>
              </ul>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Strength Member Anchoring
              </h4>
              <p className="text-sm">
                Always anchor cable strength members (aramid yarn, steel armour) to the closure anchor points before sealing. This prevents cable tension from being transmitted to splice trays or individual fibres. Use proper clamps—don't rely on seal compression to hold cables.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Documentation and Testing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Documentation and Testing</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Comprehensive documentation enables future maintenance and troubleshooting. Test closure integrity before commissioning to ensure long-term environmental protection.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Documentation Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Location:</strong> GPS coordinates, address, and chamber ID</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Closure ID:</strong> Serial number and type/manufacturer</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Cable records:</strong> Each cable with fibre count and destination</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Splice map:</strong> Tray/position assignments per fibre</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Test results:</strong> Splice loss values, OTDR traces</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Photos:</strong> Exterior and internal organisation</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Pre-Sealing Checklist
              </h4>
              <ul className="text-sm space-y-1">
                <li>• All splices completed and tested</li>
                <li>• Fibres properly coiled with correct radius</li>
                <li>• Splice trays secured and stacked correctly</li>
                <li>• Strength members anchored</li>
                <li>• No fibre pinches or sharp bends</li>
                <li>• Documentation complete</li>
                <li>• Cable entries clean and positioned</li>
              </ul>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">Seal Integrity Testing</h4>
              <p className="text-sm">
                For critical installations (direct burial, flood-prone chambers), consider pressure testing before final installation. Some closures include pressure test ports. Apply low air pressure and verify no leaks with soap solution. This confirms seal integrity before the closure becomes inaccessible.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Installation Sequence</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>1. Mount closure brackets/supports first</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>2. Route cables and cut to length with slack</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>3. Prepare cable ends (armour, strength member)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>4. Complete all splicing and testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>5. Organise trays and document positions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>6. Seal closure and verify integrity</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Sealing before testing all splices</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Insufficient fibre slack in trays</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Wrong IP rating for environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Not anchoring strength members</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors touch-manipulation min-h-[44px]"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-white/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Closures
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Closure Types</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>Dome:</strong> Underground, aerial</p>
                <p><strong>Inline:</strong> Duct, direct burial</p>
                <p><strong>Wall-mount:</strong> Indoor terminations</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">IP Ratings</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>IP65:</strong> External above ground</p>
                <p><strong>IP67:</strong> Temporary immersion</p>
                <p><strong>IP68:</strong> Buried/submerged</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-elec-yellow/30 text-sm text-white/80">
            <p><strong>Key spec:</strong> Splice tray coil radius: 60mm minimum | Always anchor strength members before sealing</p>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Splice Enclosure Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3/section-3"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Routing & Containment</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3/section-5"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Firestop Rules</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule3Section4;