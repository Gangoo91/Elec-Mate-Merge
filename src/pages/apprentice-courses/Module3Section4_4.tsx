import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Wrench,
  Cable,
  Shield,
  AlertTriangle,
  HelpCircle
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module3Section4_4 = () => {
  useSEO(
    "Jointing and Glanding Techniques – Module 3 (3.4.4)",
    "Cable jointing and glanding: safe, compliant techniques with BS 7671 guidance."
  );

  // Main quiz
  const quizQuestions = [
    {
      id: 1,
      question: "Which type of gland is designed for outdoor SWA cable use?",
      options: ["BW gland", "CW gland", "E1W gland", "Plastic gland"],
      correctAnswer: 1,
      explanation:
        "CW glands are designed for outdoor use with SWA cable, providing weatherproof sealing and protection.",
    },
    {
      id: 2,
      question: "What is the main purpose of glanding SWA cable?",
      options: [
        "Improve aesthetics",
        "Provide mechanical retention and earth continuity",
        "Reduce cable weight",
        "Increase voltage capacity",
      ],
      correctAnswer: 1,
      explanation:
        "Glanding secures the cable mechanically and, for SWA, ensures the armour is bonded for earth continuity.",
    },
    {
      id: 3,
      question: "True or False: Resin-filled joints can be reopened for maintenance.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "False — once cured, resin-filled joints are permanent and must be cut out to be replaced.",
    },
    {
      id: 4,
      question: "Name one tool required for installing a cable gland.",
      options: ["Adjustable spanner", "Hammer", "Drill", "Screwdriver only"],
      correctAnswer: 0,
      explanation:
        "Use appropriate spanners or a torque wrench to tighten gland components to manufacturer specifications.",
    },
    {
      id: 5,
      question: "Why is it important to fan out armour strands before fitting a gland?",
      options: [
        "To make the cable look neat",
        "To ensure even clamping and earth connection",
        "To reduce cable diameter",
        "To prevent moisture ingress",
      ],
      correctAnswer: 1,
      explanation:
        "Evenly fanned armour allows uniform clamping and reliable earth bonding through the gland.",
    },
    {
      id: 6,
      question: "Which jointing method is commonly used in external environments?",
      options: ["Resin-filled joint", "Screw terminal", "Ferrule", "Solder"],
      correctAnswer: 0,
      explanation:
        "Resin-filled joints provide environmental sealing and are widely used outdoors/underground.",
    },
    {
      id: 7,
      question: "What must be tested after installing an SWA gland?",
      options: ["Voltage rating", "Earth continuity", "Cable colour", "Installation time"],
      correctAnswer: 1,
      explanation:
        "Verify continuity between the SWA armour and the earthing system to confirm effective bonding.",
    },
    {
      id: 8,
      question: "Give one example of a common mistake when fitting a cable gland.",
      options: [
        "Over-tightening gland nuts",
        "Using correct torque settings",
        "Following manufacturer instructions",
        "Testing earth continuity",
      ],
      correctAnswer: 0,
      explanation:
        "Over-tightening can damage the armour or sheath, compromising mechanical security and sealing.",
    },
  ];

  // FAQs (kept concise; content mirrors existing section intent)
  const faqs = [
    {
      q: "When should I choose a CW vs BW gland?",
      a: "BW for indoor SWA terminations, CW for outdoor/harsh environments where weatherproof sealing is required.",
    },
    {
      q: "Do I always need an earth tag with SWA glands?",
      a: "Yes, armour must be effectively bonded; use the manufacturer-recommended earthing method or tag/banjo as specified.",
    },
    {
      q: "Can resin joints be inspected later?",
      a: "No — they are permanent. Record details on drawings and provide access points either side for future maintenance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <Wrench className="w-4 h-4 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 3</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70 text-sm">Section 3.4.4</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Jointing and Glanding Techniques
          </h1>
          <p className="text-white/80">
            How to joint and gland cables correctly for safe, durable installations aligned to BS 7671.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Joints must maintain electrical performance and mechanical strength.</li>
                <li>Glands secure, seal and (for SWA) provide earth continuity via the armour.</li>
                <li>Use the right method: crimp, mechanical, resin — based on environment and rating.</li>
                <li>Follow manufacturer instructions and torque settings; test earth continuity.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> BW (indoor), CW (outdoor), E1W (hazardous); shrouds and earth tags.</li>
                <li><strong>Use:</strong> Fan armour evenly; clamp correctly; seal to IP rating; torque to spec.</li>
                <li><strong>Check:</strong> Continuity of armour to earth; no exposed strands; correct sheath grip.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Explain the purpose of cable jointing and glanding.</li>
            <li>Identify jointing types and when to use them.</li>
            <li>Select, assemble and test SWA cable glands correctly.</li>
            <li>Apply safe, compliant practices in line with BS 7671.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Cable Jointing */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Cable className="w-5 h-5" /> 1) Cable Jointing
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Common Methods</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Mechanical</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Screw terminals/connector blocks (enclosed)</li>
                        <li>WAGO/lever type connectors (rated enclosure)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Crimped</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Butt crimps for inline joints</li>
                        <li>Correct die size and ratchet tool mandatory</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Resin/Heat-shrink Kits</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Outdoor/underground environmental sealing</li>
                        <li>Permanent once cured (record location)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Best Practice</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Preparation</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Strip insulation without nicking conductors</li>
                        <li>Match conductor sizes and ferrule where required</li>
                        <li>Maintain polarity and identification</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Protection</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Insulate with heat-shrink; use rated enclosures</li>
                        <li>Support to prevent strain on the joint</li>
                        <li>Keep moisture and dust out (IP as required)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="joint-purpose"
            question="What is the main purpose of cable jointing?"
            options={[
              "To reduce cable cost",
              "To maintain electrical and mechanical integrity",
              "To change cable colour",
              "To increase voltage rating",
            ]}
            correctIndex={1}
            explanation="Cable jointing maintains continuous electrical and mechanical integrity when extending or repairing cables."
          />

          <div className="my-6 border-t border-white/10" />

          {/* Cable Glanding */}
          <div className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 2) Cable Glanding
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
                  <p className="font-medium mb-2">Types</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>BW</strong> – indoor SWA</li>
                    <li><strong>CW</strong> – outdoor SWA, weatherproof</li>
                    <li><strong>E1W</strong> – hazardous areas</li>
                    <li>PVC shrouds and earth tags as specified</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                  <p className="font-medium mb-2">Fitting Process</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Prepare sheath to correct length; trim and fan armour</li>
                    <li>Assemble parts in order; clamp armour evenly</li>
                    <li>Torque to manufacturer specification</li>
                    <li>Seal to required IP; fit shroud if required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="gland-outdoor"
            question="Which gland type is specifically designed for outdoor SWA cable applications?"
            options={["BW gland", "CW gland", "E1W gland", "Plastic gland"]}
            correctIndex={1}
            explanation="CW glands are designed for outdoor use with SWA cable, providing weatherproof sealing."
          />
        </section>

        {/* Safety considerations */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Considerations
          </h2>
          <div className="grid gap-3 text-sm">
            {["Ensure joints and glands are mechanically sound and electrically continuous",
              "For SWA cables, test earth continuity after fitting glands",
              "Use weatherproof glands/enclosures outdoors or in damp locations",
              "Follow manufacturer instructions — incorrect assembly is a common cause of failure",
            ].map((point, i) => (
              <div key={i} className="flex items-start p-3 bg-card/10 rounded-lg border border-white/10">
                <Shield className="w-5 h-5 text-elec-yellow mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white">{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <InlineCheck
              id="swa-testing"
              question="What must be tested after fitting SWA cable glands?"
              options={["Voltage rating", "Earth continuity", "Cable temperature", "Installation time"]}
              correctIndex={1}
              explanation="Earth continuity must be tested after fitting SWA glands to ensure proper earthing through the armour."
            />
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Mistakes to Avoid
          </h2>
          <div className="grid gap-3 text-sm">
            {["Leaving exposed copper strands outside the joint",
              "Over-tightening gland nuts, damaging armour or sheath",
              "Using indoor-rated glands in outdoor environments",
              "Skipping earth bonding for armoured cables",
            ].map((mistake, i) => (
              <div key={i} className="flex items-start p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white">{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            FAQs
          </h2>
          <div className="space-y-4 text-sm">
            {faqs.map((f, idx) => (
              <div key={idx}>
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-elec-yellow mt-0.5" />
                  <p className="font-medium">{f.q}</p>
                </div>
                <p className="ml-8 text-white/90">{f.a}</p>
                <div className="my-4 border-t border-white/10" />
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Key Benefits</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Reliable, safe terminations under mechanical stress</li>
                <li>Maintained IP rating and environmental protection</li>
                <li>Good practice supports compliance and longevity</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-sky-500/10 border border-sky-400/30">
              <p className="font-medium mb-2">Essential Points</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Choose the correct gland/joint for cable and location</li>
                <li>Follow manufacturer instructions and torque settings</li>
                <li>Inspect and test — especially earth continuity for SWA</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Do</p>
              <ul className="space-y-1">
                <li>• Use correct glands and accessories for the environment</li>
                <li>• Fan armour evenly and clamp securely</li>
                <li>• Seal and support to prevent strain and ingress</li>
                <li>• Test continuity and record results</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-destructive/10 border border-destructive/20">
              <p className="font-medium mb-2">Don't</p>
              <ul className="space-y-1">
                <li>✗ Overtighten glands or crush conductors</li>
                <li>✗ Leave exposed strands or compromised insulation</li>
                <li>✗ Mix dissimilar metals without considering corrosion</li>
                <li>✗ Forget shrouds, earth tags, or weatherproofing where required</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pocket Card Quick Reference */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Pocket Card Quick Reference
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Gland fitting essentials</p>
                <ul className="space-y-1">
                  <li>• Identify BW/CW/E1W</li>
                  <li>• Prepare sheath and fan armour</li>
                  <li>• Assemble in order and torque to spec</li>
                  <li>• Seal to IP; add shroud/earth tag if required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Jointing essentials</p>
                <ul className="space-y-1">
                  <li>• Correct method (crimp/mech/resin)</li>
                  <li>• Insulate and enclose appropriately</li>
                  <li>• Maintain polarity and identification</li>
                  <li>• Support to prevent strain and vibration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key References */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Key References
          </h2>
          <div className="text-xs sm:text-sm text-white space-y-2">
            <p><strong>BS 7671:</strong> 526 (Electrical connections), 522 (Selection and erection), 543 (Earthing arrangements), Part 6 (Inspection & testing)</p>
            <p><strong>Manufacturer data:</strong> Gland and joint kit instructions incl. torque settings</p>
            <p><strong>HSE/GS38:</strong> Safe working practices, test equipment guidance</p>
          </div>
        </section>

        {/* Practical Examples */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Practical Examples
          </h2>

          {/* Example 1: SWA CW Gland Step-by-Step */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> 1) SWA CW Gland Installation with Torque Checklist
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Step-by-Step Process</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Strip outer sheath 50mm, inner sheath 25mm from cable end</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Cut armour wires to 35mm length, fan out evenly around cable</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Thread cable through gland body (backnut first)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span>Position armour clamp cone over fanned armour wires</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                    <span>Insert compression seal, ensuring correct orientation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                    <span>Tighten backnut to specified torque (typically 25-30 Nm)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-elec-yellow text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">7</span>
                    <span>Test earth continuity between armour and earth terminal</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-3">Torque & Safety Checklist</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Cable sized correctly for gland thread</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Armour wires fanned evenly (no bunching)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Compression seal orientated correctly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Backnut torque: 25-30 Nm (check manufacturer spec)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Earth continuity test passed (&lt; 0.1Ω)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>IP rating maintained (no gaps in sealing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>PVC shroud fitted if required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Installation documented with cable schedule</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="gland-torque"
            question="What is the typical torque setting for an SWA CW gland backnut?"
            options={["15-20 Nm", "25-30 Nm", "35-40 Nm", "45-50 Nm"]}
            correctIndex={1}
            explanation="Most SWA CW glands require 25-30 Nm torque, but always check the manufacturer's specification sheet."
          />

          <div className="my-6 border-t border-white/10" />

          {/* Example 2: Resin Joint Step-by-Step */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Cable className="w-5 h-5" /> 2) Resin Joint Installation
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-3">Preparation & Assembly</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Cable Preparation</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Strip conductors to exact joint kit specifications</li>
                      <li>Clean conductors with wire brush or abrasive</li>
                      <li>Apply petroleum jelly to prevent moisture ingress</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Joint Assembly</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Insert conductors into crimp connectors</li>
                      <li>Crimp with correct die size and ratchet tool</li>
                      <li>Wrap with insulation tape (half-lap overlap)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Mould Installation</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Position mould halves around joint</li>
                      <li>Seal mould completely (no resin leakage)</li>
                      <li>Mix resin according to manufacturer ratios</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Critical Points</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">⚠️ Temperature</p>
                    <p>Ambient temp 5-35°C. Below 5°C: joint may not cure. Above 35°C: rapid cure time.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">⚠️ Mixing Ratios</p>
                    <p>Exact resin:hardener ratio critical. Use graduated mixing cups, not guesswork.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">⚠️ Working Time</p>
                    <p>Typically 10-15 minutes after mixing. Plan sequence beforehand.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">⚠️ Curing Time</p>
                    <p>24 hours minimum before burial. 7 days full cure in cold weather.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="resin-temp"
            question="What is the minimum ambient temperature for resin joint installation?"
            options={["0°C", "5°C", "10°C", "15°C"]}
            correctIndex={1}
            explanation="5°C is the minimum ambient temperature. Below this, the resin may not cure properly."
          />

          <div className="my-6 border-t border-white/10" />

          {/* Example 3: Heat-shrink Crimp Joint */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 3) Heat-shrink Crimp Joint with Inspection
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Installation Process</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">1. Conductor Prep</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Strip to crimp connector length + 2mm</li>
                      <li>No nicks or cuts in conductor strands</li>
                      <li>Clean with wire brush if oxidised</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">2. Crimping</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Select correct die size for conductor CSA</li>
                      <li>Full ratchet cycle (no partial crimps)</li>
                      <li>Crimp connector centred on conductor</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">3. Heat-shrink Application</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Slide tubing over joint before heating</li>
                      <li>Heat evenly from centre outwards</li>
                      <li>Check full shrinkage and adhesive flow</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Quality Inspection</p>
                <div className="space-y-2 text-sm">
                  <div className="border-b border-orange-400/20 pb-2 mb-2">
                    <p className="font-medium">Visual Checks</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>No conductor strands outside crimp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Crimp marks uniform and complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Heat-shrink fully contracted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Adhesive visible at tubing ends</span>
                  </div>

                  <div className="border-b border-orange-400/20 pb-2 mb-2 mt-4">
                    <p className="font-medium">Pull Test</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Gentle pull: no conductor movement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Resistance test: &lt; 2x conductor resistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="crimp-pull"
            question="During a pull test on a crimped joint, what indicates a good connection?"
            options={["Slight conductor movement", "No conductor movement", "Crimp connector slides", "Heat-shrink stretches"]}
            correctIndex={1}
            explanation="No conductor movement during a gentle pull test indicates the crimp has properly gripped the conductor."
          />

          <div className="my-6 border-t border-white/10" />

          {/* Example 4: Fault-finding Ingress Case */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 4) Fault-finding: Water Ingress Case Study
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Scenario: External SWA Joint Failure</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Symptoms</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>RCD tripping under load</li>
                      <li>Insulation resistance: 0.8 MΩ (should be &gt;1 MΩ)</li>
                      <li>Corrosion visible around underground joint box</li>
                      <li>Earth fault detected during testing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Investigation</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Joint box opened: water present in bottom</li>
                      <li>Joint wrapped in PVC tape only (not suitable)</li>
                      <li>No IP-rated enclosure used</li>
                      <li>Cores showing green corrosion</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-3">Diagnostic Tests & Repair</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Tests Performed</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>IR Test:</strong> 0.8 MΩ (L-E), 2.1 MΩ (N-E), 5.2 MΩ (L-N)</li>
                      <li><strong>Continuity:</strong> L & N good, CPC 0.15Ω increase</li>
                      <li><strong>Earth fault loop:</strong> 0.45Ω (within limits)</li>
                      <li><strong>RCD:</strong> 28ms @ 1x, 12ms @ 5x</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Repair Solution</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Cut out corroded section (300mm either side)</li>
                      <li>Install resin-filled joint kit (IP68 rated)</li>
                      <li>Position joint 150mm above finished ground level</li>
                      <li>Install warning tape 300mm above joint</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Final Verification</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>IR Test:</strong> &gt;999 MΩ all combinations</li>
                      <li><strong>RCD Test:</strong> Normal operation restored</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="ingress-repair"
            question="What is the minimum IP rating required for underground cable joints?"
            options={["IP44", "IP54", "IP65", "IP68"]}
            correctIndex={3}
            explanation="IP68 rating is required for underground joints to prevent water ingress under pressure."
          />

          <div className="my-6 border-t border-white/10" />

          {/* Example 5: Gland Selection Guide */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> 5) Quick Gland Selection by Cable OD & IP Rating
            </h3>

            <div className="grid gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
                <p className="font-medium mb-3">Common SWA Cable Sizes & Glands</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-400/30">
                        <th className="text-left p-2">Cable Size</th>
                        <th className="text-left p-2">Overall Diameter</th>
                        <th className="text-left p-2">BW Gland (Indoor)</th>
                        <th className="text-left p-2">CW Gland (Outdoor)</th>
                        <th className="text-left p-2">IP Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400/20">
                      <tr>
                        <td className="p-2">2.5mm² 3C+E</td>
                        <td className="p-2">11.5mm</td>
                        <td className="p-2">BW16s</td>
                        <td className="p-2">CW16s</td>
                        <td className="p-2">IP54 / IP68</td>
                      </tr>
                      <tr>
                        <td className="p-2">4mm² 3C+E</td>
                        <td className="p-2">13.1mm</td>
                        <td className="p-2">BW20s</td>
                        <td className="p-2">CW20s</td>
                        <td className="p-2">IP54 / IP68</td>
                      </tr>
                      <tr>
                        <td className="p-2">6mm² 3C+E</td>
                        <td className="p-2">14.8mm</td>
                        <td className="p-2">BW20s</td>
                        <td className="p-2">CW20s</td>
                        <td className="p-2">IP54 / IP68</td>
                      </tr>
                      <tr>
                        <td className="p-2">10mm² 3C+E</td>
                        <td className="p-2">17.3mm</td>
                        <td className="p-2">BW25s</td>
                        <td className="p-2">CW25s</td>
                        <td className="p-2">IP54 / IP68</td>
                      </tr>
                      <tr>
                        <td className="p-2">16mm² 3C+E</td>
                        <td className="p-2">19.6mm</td>
                        <td className="p-2">BW25s</td>
                        <td className="p-2">CW25s</td>
                        <td className="p-2">IP54 / IP68</td>
                      </tr>
                      <tr>
                        <td className="p-2">25mm² 3C+E</td>
                        <td className="p-2">22.9mm</td>
                        <td className="p-2">BW32s</td>
                        <td className="p-2">CW32s</td>
                        <td className="p-2">IP54 / IP68</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Selection Tips</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Measure cable OD with callipers</li>
                    <li>Check manufacturer cable schedule</li>
                    <li>Allow for cable tolerances (+/- 5%)</li>
                    <li>Consider environmental conditions</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Environmental Guide</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li><strong>Indoor dry:</strong> BW glands, IP54</li>
                    <li><strong>Outdoor:</strong> CW glands, IP68</li>
                    <li><strong>Underground:</strong> CW glands, IP68</li>
                    <li><strong>Hazardous areas:</strong> E1W glands</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                  <p className="font-medium mb-2">Common Mistakes</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Gland too small: cable won't fit</li>
                    <li>Gland too large: poor sealing</li>
                    <li>Wrong IP rating for location</li>
                    <li>Mixing gland sizes in same panel</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="gland-selection"
            question="What size CW gland is typically used for 10mm² 3C+E SWA cable?"
            options={["CW20s", "CW25s", "CW32s", "CW16s"]}
            correctIndex={1}
            explanation="CW25s glands are typically used for 10mm² 3C+E SWA cable which has an overall diameter of approximately 17.3mm."
          />
        </section>

        {/* Technical Specifications & Standards */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Technical Specifications & Standards
          </h2>

          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Cable Gland Technical Data
            </h3>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Material Specifications</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Brass Glands (Standard)</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>CW617N brass (60% copper, 40% zinc)</li>
                      <li>Nickel plated finish for corrosion resistance</li>
                      <li>Operating temperature: -20°C to +100°C</li>
                      <li>Suitable for non-aggressive environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Stainless Steel (Marine/Chemical)</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>316L stainless steel construction</li>
                      <li>Superior corrosion resistance</li>
                      <li>Operating temperature: -60°C to +200°C</li>
                      <li>Suitable for aggressive environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Polyamide (Plastic)</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>PA6 or PA66 nylon construction</li>
                      <li>UV stabilised, halogen-free</li>
                      <li>Operating temperature: -40°C to +100°C</li>
                      <li>Lightweight, chemical resistant</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-3">Performance Ratings</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">IP Protection Classes</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>IP54:</strong> Dust protected, splash resistant</li>
                      <li><strong>IP66:</strong> Dust tight, powerful water jets</li>
                      <li><strong>IP67:</strong> Dust tight, temporary immersion</li>
                      <li><strong>IP68:</strong> Dust tight, continuous immersion</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Mechanical Properties</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Tensile strength: 250-400 N/mm²</li>
                      <li>Impact resistance: IK08 (5 Joules)</li>
                      <li>Thread engagement: minimum 5 full threads</li>
                      <li>Strain relief: up to 200N pull force</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Electrical Properties</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Earth continuity: &lt;0.1Ω resistance</li>
                      <li>Insulation resistance: &gt;100MΩ</li>
                      <li>Dielectric strength: 2.5kV AC</li>
                      <li>Current carrying: via cable rating</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="material-temp"
            question="What is the maximum operating temperature for standard brass cable glands?"
            options={["80°C", "100°C", "120°C", "150°C"]}
            correctIndex={1}
            explanation="Standard brass cable glands have a maximum operating temperature of 100°C, suitable for most electrical applications."
          />
        </section>

        {/* Advanced Troubleshooting Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">13</span>
            Advanced Troubleshooting Guide
          </h2>

          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Common Fault Scenarios
            </h3>

            <div className="grid gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Fault 1: High Earth Loop Impedance</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Symptoms</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Zs reading above maximum permitted (1.44Ω for B32 MCB)</li>
                      <li>RCD may still operate correctly</li>
                      <li>ADS disconnection times exceeded</li>
                      <li>Potential shock risk in fault conditions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Investigation Steps</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Check R1+R2 values for circuit</li>
                      <li>Measure Ze at origin (should be &lt;0.8Ω typical)</li>
                      <li>Inspect all joints and connections</li>
                      <li>Test continuity of armour bonding</li>
                      <li>Check gland earth tag connections</li>
                      <li>Verify main earthing conductor integrity</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-red-400/20 rounded">
                  <p className="font-medium text-white mb-1">Common Causes</p>
                  <p className="text-sm">Poor gland earth connections, corroded armour, loose earth tags, inadequate bonding at joints, high source impedance.</p>
                </div>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">Fault 2: Intermittent RCD Tripping</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Symptoms</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Random RCD trips, often under load</li>
                      <li>Insulation resistance borderline (1-10MΩ)</li>
                      <li>May be weather-related (rain/damp)</li>
                      <li>Circuit appears normal when tested</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Diagnostic Process</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>IR test at 500V DC (minimum values)</li>
                      <li>Check readings L-E, N-E, L-N separately</li>
                      <li>Test with circuit loaded and unloaded</li>
                      <li>Examine all joint boxes for moisture</li>
                      <li>Check cable route for damage/stress</li>
                      <li>Monitor leakage current with clamp meter</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-orange-400/20 rounded">
                  <p className="font-medium text-white mb-1">Investigation Tools</p>
                  <p className="text-sm">IR tester, clamp-on leakage meter, thermal imaging camera, moisture meter, cable fault locator.</p>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="font-medium mb-3">Fault 3: Cable Joint Overheating</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-yellow-200 mb-2">Warning Signs</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Discoloured joint box or gland</li>
                      <li>Burning smell or visible heat damage</li>
                      <li>Voltage drop measurements show increased resistance</li>
                      <li>Thermal imaging shows hot spots</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-200 mb-2">Resistance Testing</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Milliohm readings across joint</li>
                      <li>Compare with cable conductor resistance</li>
                      <li>Test under load conditions if safe</li>
                      <li>Document resistance values for trending</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-elec-yellow/20 rounded">
                  <p className="font-medium text-yellow-200 mb-1">Action Required</p>
                  <p className="text-sm">Immediate disconnection if safe to do so, full joint replacement, thermal imaging post-repair, load testing.</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="fault-impedance"
            question="What is the maximum earth fault loop impedance for a 32A Type B MCB circuit?"
            options={["0.87Ω", "1.44Ω", "2.19Ω", "3.68Ω"]}
            correctIndex={1}
            explanation="The maximum Zs for a 32A Type B MCB is 1.44Ω to ensure disconnection within 0.4 seconds under fault conditions."
          />
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">14</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} title="Knowledge Check" />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.4
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section4_4;
