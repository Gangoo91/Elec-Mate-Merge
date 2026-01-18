import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building and Campus Standards | Data Cabling Module 6.3";
const DESCRIPTION = "Learn structured cabling standards for building and campus infrastructure including telecommunications rooms, pathways, and backbone design.";

const quickCheckQuestions = [
  {
    id: "datacabling-m6s3-check1",
    question: "What is the maximum distance for horizontal cabling from TR to work area outlet?",
    options: ["50 metres", "90 metres", "100 metres", "300 metres"],
    correctIndex: 1,
    explanation: "The maximum horizontal cabling distance is 90 metres from the telecommunications room to the work area outlet, allowing 10 metres for patch cords to reach the total 100m channel limit."
  },
  {
    id: "datacabling-m6s3-check2",
    question: "What minimum floor loading is required for telecommunications rooms?",
    options: ["2.4 kN/m² (50 lbs/ft²)", "4.8 kN/m² (100 lbs/ft²)", "7.2 kN/m² (150 lbs/ft²)", "12.0 kN/m² (250 lbs/ft²)"],
    correctIndex: 1,
    explanation: "Telecommunications rooms require a minimum floor loading of 4.8 kN/m² (100 lbs/ft²) to support equipment racks, cable management systems, and active equipment."
  },
  {
    id: "datacabling-m6s3-check3",
    question: "Which fire rating must pathway penetrations maintain through fire-rated assemblies?",
    options: ["30 minutes minimum", "60 minutes minimum", "90 minutes minimum", "Same as the wall/floor assembly"],
    correctIndex: 3,
    explanation: "Pathway penetrations must maintain the same fire rating as the wall or floor assembly they pass through, achieved using approved firestop materials and methods."
  }
];

const faqs = [
  {
    question: "How do I determine how many telecommunications rooms a floor needs?",
    answer: "Plan one TR per 1000m² of floor area. If horizontal cable runs would exceed 90m, add additional TRs. Consider work area density - high-density areas may need dedicated TRs even within smaller floor areas."
  },
  {
    question: "When should I use singlemode fibre for campus backbone?",
    answer: "Use singlemode fibre for any campus backbone distances exceeding 300m, when future bandwidth growth beyond 10Gbps is anticipated, or when you want maximum future-proofing. Singlemode supports distances up to 2000m+ with excellent performance."
  },
  {
    question: "What environmental controls are essential for telecommunications rooms?",
    answer: "Maintain temperature between 18-24°C and humidity at 45-55% RH with 24/7 HVAC operation. Ensure separate air handling from general building systems, temperature monitoring, and no water pipes above or through the room."
  },
  {
    question: "How do I design redundancy into campus backbone cabling?",
    answer: "Implement diverse routing from the main cross-connect to critical buildings, use ring topology for backbone connections, plan for multiple entry points to buildings, and install sufficient spare fibres for failover paths."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A university is adding a new 5-storey research building 400m from the data centre. Which backbone media should you specify?",
  options: [
    "Cat 6A UTP copper cabling",
    "62.5/125µm multimode fibre (OM1)",
    "50/125µm multimode fibre (OM3/OM4)",
    "9/125µm singlemode fibre"
  ],
  correctAnswer: 3,
  explanation: "Singlemode fibre is the correct choice. At 400m distance, it provides excellent performance with capacity for future bandwidth growth (40/100/400 Gbps). While OM3/OM4 could work, singlemode offers better future-proofing for a 20+ year infrastructure investment."
  }
];

const DataCablingModule6Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building and Campus Standards
          </h1>
          <p className="text-white/80">
            Installation standards for building and campus infrastructure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Horizontal:</strong> 90m max, star topology from TR</li>
              <li><strong>Backbone:</strong> 300-2000m depending on media</li>
              <li><strong>TR sizing:</strong> 3m × 3m minimum per 1000m²</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cross-connects (MC, IC, HC) in the hierarchy</li>
              <li><strong>Use:</strong> TIA-569 for pathway sizing, TIA-568 for performance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structured cabling hierarchy and topology",
              "Telecommunications room design requirements",
              "Pathway and space standards",
              "Campus backbone cabling specifications",
              "Fire safety and building code compliance",
              "Apply standards to real-world scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Structured Cabling Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building and campus cabling follows a hierarchical star topology. This ensures
              predictable performance, simplified management, and scalable infrastructure that
              can support current and future communication needs.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Horizontal Cabling</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Function:</strong> Work area to TR</li>
                  <li><strong>Distance:</strong> 90m maximum</li>
                  <li><strong>Topology:</strong> Star configuration</li>
                  <li><strong>Media:</strong> UTP, STP, or fibre</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Backbone</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Function:</strong> TR to ER/MC</li>
                  <li><strong>Distance:</strong> Varies by media</li>
                  <li><strong>Topology:</strong> Star or ring</li>
                  <li><strong>Media:</strong> Multimode/singlemode</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Campus Backbone</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Function:</strong> Building-to-building</li>
                  <li><strong>Distance:</strong> Up to 2000m</li>
                  <li><strong>Topology:</strong> Star from MC</li>
                  <li><strong>Media:</strong> Singlemode fibre</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cross-Connect Hierarchy:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Main Cross-Connect (MC):</strong> Central campus point, service provider interface</li>
                <li><strong>Intermediate Cross-Connect (IC):</strong> Floor/zone distribution, backbone to horizontal</li>
                <li><strong>Horizontal Cross-Connect (HC):</strong> Telecommunications room, work area terminations</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Telecommunications Room Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Telecommunications rooms (TRs) house the horizontal cross-connect and active
              network equipment. Proper sizing and environmental control are essential for
              reliable operation and future expansion.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minimum Size by Floor Area</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>≤500m²:</strong> 3m × 2.2m (min), 3m × 3m (recommended)</li>
                  <li><strong>500-800m²:</strong> 3m × 2.8m (min), 3m × 3.5m (recommended)</li>
                  <li><strong>800-1000m²:</strong> 3m × 3.4m (min), 4m × 4m (recommended)</li>
                  <li><strong>&gt;1000m²:</strong> Multiple TRs required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structural Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Floor loading:</strong> 4.8 kN/m² (100 lbs/ft²)</li>
                  <li><strong>Ceiling height:</strong> 2.6m (8.5 ft) minimum</li>
                  <li><strong>Door:</strong> 900mm wide, outward opening</li>
                  <li><strong>No water:</strong> No pipes or drains above/through</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Controls:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> 18-24°C (64-75°F) with 24/7 operation</li>
                <li><strong>Humidity:</strong> 45-55% relative humidity</li>
                <li><strong>HVAC:</strong> Separate air handling from general building systems</li>
                <li><strong>Monitoring:</strong> Temperature and environmental alarms</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power:</strong> Dedicated 20A circuit minimum, non-switched outlets</li>
                <li><strong>Grounding:</strong> Telecommunications grounding busbar (TGB)</li>
                <li><strong>Bonding:</strong> 6 AWG minimum bonding conductor to building ground</li>
                <li><strong>Outlets:</strong> Two outlets per wall minimum</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pathway and Space Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pathways provide the routes for cables throughout buildings and campuses.
              Proper sizing ensures adequate capacity for current installations while
              allowing for future growth and cable additions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conduit Fill Ratios</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cat 5e/6 UTP:</strong> 40% conduit, 50% tray</li>
                  <li><strong>Cat 6A UTP:</strong> 35% conduit, 40% tray</li>
                  <li><strong>Cat 7 STP:</strong> 30% conduit, 35% tray</li>
                  <li><strong>Fibre optic:</strong> 50% conduit, 60% tray</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Overhead Pathways</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cable trays:</strong> Ladder, solid bottom, wire mesh</li>
                  <li><strong>J-hooks:</strong> Support spacing per load</li>
                  <li><strong>Ceiling spaces:</strong> Plenum rating requirements</li>
                  <li><strong>Support:</strong> 1.2-1.5m spacing typical</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vertical Backbone Pathways:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum slot:</strong> 100mm × 300mm between floors</li>
                <li><strong>Per floor allowance:</strong> 75mm × 100mm additional</li>
                <li><strong>Fire rating:</strong> Fire-rated construction required</li>
                <li><strong>Support:</strong> Cable support every 1.5m maximum</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Campus Pathways (Underground):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Burial depth:</strong> 600mm minimum</li>
                <li><strong>Warning tape:</strong> 300mm above cable/duct</li>
                <li><strong>Manholes:</strong> Every 150m for pulling access</li>
                <li><strong>Duct types:</strong> HDPE, PVC, corrugated innerduct</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Campus Distribution and Backbone Media
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Campus backbone connects buildings to the main cross-connect. Media selection
              balances distance requirements, bandwidth needs, and future-proofing considerations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Media Distance Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cat 6 UTP:</strong> 90m (not recommended for campus)</li>
                  <li><strong>62.5/125 OM1:</strong> 300m (legacy, being phased out)</li>
                  <li><strong>50/125 OM3/OM4:</strong> 300-550m (current standard)</li>
                  <li><strong>9/125 singlemode:</strong> 2000m+ (future-proof)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Principles</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Topology:</strong> Star from campus MC</li>
                  <li><strong>Redundancy:</strong> Diverse routes for critical buildings</li>
                  <li><strong>No daisy-chain:</strong> Direct connection per building</li>
                  <li><strong>Spare capacity:</strong> 50% minimum for future</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Entrance Facility:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Demarcation:</strong> Service provider interface point</li>
                <li><strong>Weather protection:</strong> Sealed cable entries</li>
                <li><strong>Electrical protection:</strong> Primary surge protection, grounding</li>
                <li><strong>Transition:</strong> Outdoor-rated to indoor cable types</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Size pathways for 50% spare capacity for future growth</li>
                <li>Plan TR locations to keep horizontal runs under 90m</li>
                <li>Use singlemode fibre for any backbone over 300m</li>
                <li>Design redundant backbone paths for critical buildings</li>
                <li>Coordinate TR locations with building architects early</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersized TRs:</strong> — Plan for growth from the start</li>
                <li><strong>Ignoring fire ratings:</strong> — All penetrations must match assembly rating</li>
                <li><strong>No HVAC planning:</strong> — Equipment heat loads often underestimated</li>
                <li><strong>Single backbone path:</strong> — Critical buildings need redundancy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">TR Requirements</p>
              <ul className="space-y-0.5">
                <li>Floor loading: 4.8 kN/m²</li>
                <li>Temperature: 18-24°C</li>
                <li>Humidity: 45-55% RH</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Distance Limits</p>
              <ul className="space-y-0.5">
                <li>Horizontal: 90m maximum</li>
                <li>OM3/OM4: 300-550m</li>
                <li>Singlemode: 2000m+</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule6Section3;