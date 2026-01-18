import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    explanation: "Dome closures (vertical entry) are designed for underground chambers and aerial mounting, providing 360 degree cable entry and excellent environmental sealing."
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
    id: 1,
    question: "An inline splice closure is characterised by:",
    options: ["Vertical cable entry from top", "Horizontal cable entry from both ends", "Single cable entry only", "No cable entry - self-contained"],
    correctAnswer: 1,
    explanation: "Inline closures have horizontal cable entry from both ends, making them ideal for duct routes."
  },
  {
    id: 2,
    question: "Heat-shrink splice closures provide sealing through:",
    options: ["Mechanical gaskets only", "Applied heat shrinking outer sleeve and sealant", "Adhesive tape", "Pressure fit"],
    correctAnswer: 1,
    explanation: "Heat-shrink closures use an outer sleeve that shrinks when heated along with sealant for environmental protection."
  },
  {
    id: 3,
    question: "When re-entering a sealed splice closure, you should:",
    options: ["Cut through the seal and replace closure", "Use the designed re-entry method if available", "Never re-enter - always replace", "Drill through the side"],
    correctAnswer: 1,
    explanation: "Use the manufacturer's designed re-entry method when available to maintain the closure's integrity."
  },
  {
    id: 4,
    question: "Splice trays are used inside closures to:",
    options: ["Amplify signal", "Organise splices and maintain bend radius", "Convert connector types", "Provide power distribution"],
    correctAnswer: 1,
    explanation: "Splice trays organise individual splices and ensure fibres maintain proper bend radius."
  },
  {
    id: 5,
    question: "The IP rating 'IP68' on a closure indicates:",
    options: ["Indoor use only", "Protection against dust and continuous water immersion", "Fire resistance only", "EMI shielding"],
    correctAnswer: 1,
    explanation: "IP68 means dust-tight and protected against continuous water immersion."
  },
  {
    id: 6,
    question: "Cable sealing in closures is typically achieved with:",
    options: ["Standard PVC tape", "Gel seals, gaskets, or heat-shrink entries", "Cable ties only", "No sealing required for fibre"],
    correctAnswer: 1,
    explanation: "Professional closures use gel seals, compression gaskets, or heat-shrink boots for reliable sealing."
  },
  {
    id: 7,
    question: "A wall-mount splice enclosure is appropriate for:",
    options: ["Underground chambers", "Indoor termination points", "Aerial installations", "Submarine cables"],
    correctAnswer: 1,
    explanation: "Wall-mount closures are designed for indoor termination points and protected environments."
  },
  {
    id: 8,
    question: "Splice closure capacity is specified by:",
    options: ["Physical size only", "Maximum number of splice trays/fibres", "Cable diameter only", "Power consumption"],
    correctAnswer: 1,
    explanation: "Capacity is specified by the maximum number of splice trays and total fibre count the closure can accommodate."
  },
  {
    id: 9,
    question: "When installing an aerial closure, you must:",
    options: ["Ensure proper bonding to messenger wire and weatherproofing", "Use indoor-rated closures", "Avoid any mechanical support", "Install horizontally only"],
    correctAnswer: 0,
    explanation: "Aerial closures must be properly bonded to messenger wire and fully weatherproofed."
  },
  {
    id: 10,
    question: "Splice tray organisation should ensure:",
    options: ["Maximum fibre density", "Each splice is labelled, accessible, and bend radius maintained", "Fibres are coiled as tightly as possible", "Random placement for faster work"],
    correctAnswer: 1,
    explanation: "Proper organisation ensures splices are labelled, accessible for maintenance, and bend radius is maintained."
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
    answer: "Use the closure manufacturer's sealing system - typically gel seals that compress around the cable, mechanical gland compression, or heat-shrink entry boots. Ensure cable outer sheath is clean and undamaged at the entry point. Follow manufacturer torque specifications for mechanical seals. Test seal integrity before burial or final installation."
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Splice Enclosure Mounting
          </h1>
          <p className="text-white/80">
            Closure selection, installation, and environmental protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Protect splices from environment</li>
              <li><strong>Dome:</strong> Underground/aerial installations</li>
              <li><strong>Inline:</strong> Duct runs with straight-through routing</li>
              <li><strong>IP68:</strong> Required for buried applications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Dome, inline, or wall-mount design</li>
              <li><strong>Check:</strong> IP rating matches environment</li>
              <li><strong>Install:</strong> 60mm minimum fibre coil radius</li>
              <li><strong>Seal:</strong> All entries properly before closing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Closure types and applications",
              "Environmental protection ratings",
              "Splice tray organisation",
              "Sealing methods and techniques",
              "Mounting configurations",
              "Documentation requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Closure Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Closure Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Splice enclosures (closures) protect fibre splices from environmental damage while providing organised storage and bend radius management. Different closure designs suit different installation scenarios.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dome Closure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Vertical entry, dome-shaped housing</li>
                <li>Underground/manhole installation</li>
                <li>Aerial pole mounting</li>
                <li>Multiple cable entries from base</li>
                <li>High fibre capacity (up to 576+)</li>
                <li>Excellent environmental sealing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inline/Horizontal Closure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Horizontal entry from ends</li>
                <li>Duct installations</li>
                <li>Direct burial applications</li>
                <li>Linear cable routes</li>
                <li>Moderate capacity (24-288 fibres)</li>
                <li>Compact profile for duct</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wall-Mount Closure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Indoor/protected environments</li>
                <li>Building entry points</li>
                <li>Riser terminations</li>
                <li>Cabinet/rack mounting</li>
                <li>Lower IP rating acceptable</li>
                <li>Easy access for maintenance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Aerial Closure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Pole/strand mounted</li>
                <li>Overhead cable networks</li>
                <li>UV-resistant materials</li>
                <li>Wind/ice load rated</li>
                <li>Messenger attachment points</li>
                <li>IP65/IP68 rated</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Environmental Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Environmental Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Closures are rated using the IP (Ingress Protection) system to indicate protection against dust and water. Selecting the correct IP rating for the installation environment is critical for long-term reliability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IP Rating Guide for Closures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IP54:</strong> Indoor, protected environments</li>
                <li><strong>IP65:</strong> Outdoor, protected from direct water jets</li>
                <li><strong>IP67:</strong> Temporary immersion (up to 1m, 30 min)</li>
                <li><strong>IP68:</strong> Continuous immersion (depth/time varies)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selecting IP Rating by Application:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Indoor (dry):</strong> IP54 minimum</li>
                <li><strong>Indoor (damp/unheated):</strong> IP65 minimum</li>
                <li><strong>External above ground:</strong> IP67 minimum</li>
                <li><strong>Underground chamber:</strong> IP68 (subject to flooding)</li>
                <li><strong>Direct burial:</strong> IP68 with pressure rating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Considerations:</p>
              <p className="text-sm text-white">
                IP ratings do not cover temperature. Check closure material specifications for operating range. Standard closures: -20C to +60C. Extreme environments may need extended range (-40C to +80C). Consider thermal cycling effects on seals in locations with large temperature swings.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Splice Tray Organisation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Splice Tray Organisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Splice trays inside closures hold individual splices while managing fibre routing and bend radius. Proper tray organisation ensures reliable operation and enables future maintenance access.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Tray Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Splice holders:</strong> Protect individual fusion or mechanical splices</li>
                <li><strong>Fibre guides:</strong> Route fibres maintaining minimum radius</li>
                <li><strong>Coil radius:</strong> 60mm minimum for standard fibre</li>
                <li><strong>Heat shrink storage:</strong> Organised sleeve placement</li>
                <li><strong>Labelling area:</strong> Fibre identification markings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Organisation Best Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>One cable per tray where possible for clear identification</li>
                <li>Route fibres in consistent direction (clockwise or anticlockwise)</li>
                <li>Do not overfill trays - leave space for re-work</li>
                <li>Label each splice position with fibre identity</li>
                <li>Document splice loss values per position</li>
                <li>Stack trays logically (cable 1 at bottom, etc.)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fibre Slack Management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Initial splice:</strong> Approximately 1m each fibre minimum</li>
                <li><strong>Re-splice allowance:</strong> Additional 0.5m recommended</li>
                <li><strong>Coiled storage:</strong> Must maintain 60mm radius</li>
                <li><strong>Future access:</strong> Allow lifting tray without strain</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Sealing Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sealing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The sealing system is critical for environmental protection. Different closure designs use various sealing approaches, each with specific installation requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Heat-Shrink Sealing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Outer sleeve shrinks over closure body</li>
                <li>Mastic sealant provides inner seal</li>
                <li>Excellent long-term reliability</li>
                <li>May be single-use or re-enterable</li>
                <li>Requires heat gun for installation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mechanical Sealing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Gaskets compress with bolts/latches</li>
                <li>Fully re-enterable design</li>
                <li>No special tools required</li>
                <li>Gaskets may need replacement over time</li>
                <li>Quick installation and access</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Entry Sealing Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Gel Seals:</strong> Self-healing gel blocks that compress around cables, re-enterable</li>
                <li><strong>Mechanical Glands:</strong> Compression fittings that clamp around cable</li>
                <li><strong>Heat-Shrink Boots:</strong> Individual heat-shrink sleeves over each cable entry</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Sealing Tips:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clean cable sheath thoroughly before sealing</li>
                <li>Verify cable diameter matches seal port range</li>
                <li>Follow manufacturer torque specs for mechanical seals</li>
                <li>Apply heat evenly for heat-shrink (avoid scorching)</li>
                <li>Test seal integrity before final installation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Mounting Configurations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Mounting Configurations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper mounting ensures closure security, cable strain relief, and accessible maintenance. Mounting requirements vary by closure type and installation environment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Underground/Chamber Mounting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mount dome closures vertically on brackets</li>
                <li>Position above maximum flood level where possible</li>
                <li>Secure cables to chamber walls/racks</li>
                <li>Provide strain relief for incoming cables</li>
                <li>Allow working space around closure for access</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Aerial Mounting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Attach to messenger wire or strand using approved clamps</li>
                <li>Bond metallic closure elements to system ground</li>
                <li>Ensure UV-rated closure and mounting hardware</li>
                <li>Account for wind/ice loading in bracket selection</li>
                <li>Maintain cable bend radius at entry points</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wall/Indoor Mounting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use appropriate wall fixings for substrate</li>
                <li>Mount at accessible working height (1.2-1.8m)</li>
                <li>Allow swing clearance for door-opening types</li>
                <li>Route cables neatly to entry points</li>
                <li>Label closure externally with ID and contents</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Strength Member Anchoring:</p>
              <p className="text-sm text-white">
                Always anchor cable strength members (aramid yarn, steel armour) to the closure anchor points before sealing. This prevents cable tension from being transmitted to splice trays or individual fibres. Use proper clamps - do not rely on seal compression to hold cables.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Documentation and Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation enables future maintenance and troubleshooting. Test closure integrity before commissioning to ensure long-term environmental protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Location:</strong> GPS coordinates, address, and chamber ID</li>
                <li><strong>Closure ID:</strong> Serial number and type/manufacturer</li>
                <li><strong>Cable records:</strong> Each cable with fibre count and destination</li>
                <li><strong>Splice map:</strong> Tray/position assignments per fibre</li>
                <li><strong>Test results:</strong> Splice loss values, OTDR traces</li>
                <li><strong>Photos:</strong> Exterior and internal organisation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Sealing Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All splices completed and tested</li>
                <li>Fibres properly coiled with correct radius</li>
                <li>Splice trays secured and stacked correctly</li>
                <li>Strength members anchored</li>
                <li>No fibre pinches or sharp bends</li>
                <li>Documentation complete</li>
                <li>Cable entries clean and positioned</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Seal Integrity Testing:</p>
              <p className="text-sm text-white">
                For critical installations (direct burial, flood-prone chambers), consider pressure testing before final installation. Some closures include pressure test ports. Apply low air pressure and verify no leaks with soap solution. This confirms seal integrity before the closure becomes inaccessible.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Mount closure brackets/supports first</li>
                <li>2. Route cables and cut to length with slack</li>
                <li>3. Prepare cable ends (armour, strength member)</li>
                <li>4. Complete all splicing and testing</li>
                <li>5. Organise trays and document positions</li>
                <li>6. Seal closure and verify integrity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sealing before testing</strong> - Always test all splices before closing</li>
                <li><strong>Insufficient fibre slack</strong> - Leave adequate fibre for future re-work</li>
                <li><strong>Wrong IP rating</strong> - Match closure to environment requirements</li>
                <li><strong>Not anchoring strength members</strong> - Prevents cable tension on fibres</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Closure Types</p>
                <ul className="space-y-0.5">
                  <li>Dome: Underground, aerial</li>
                  <li>Inline: Duct, direct burial</li>
                  <li>Wall-mount: Indoor terminations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">IP Ratings</p>
                <ul className="space-y-0.5">
                  <li>IP65: External above ground</li>
                  <li>IP67: Temporary immersion</li>
                  <li>IP68: Buried/submerged</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-white mt-4">
              <strong>Key spec:</strong> Splice tray coil radius: 60mm minimum | Always anchor strength members before sealing
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Routing and Containment
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next: Firestop Rules
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule3Section4;
