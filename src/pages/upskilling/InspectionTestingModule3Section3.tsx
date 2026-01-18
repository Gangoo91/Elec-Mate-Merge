import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Main Bonding Conductor Testing - Module 3 Section 3";
const DESCRIPTION = "Learn to test main protective bonding conductors connecting extraneous-conductive-parts to the main earthing terminal. Understand minimum sizes, connection points, and test methods.";

const quickCheckQuestions = [
  {
    id: "gas-bonding-location",
    question: "Where should main bonding to a metallic gas pipe be connected?",
    options: [
      "At the gas main in the street",
      "On the meter inlet connection",
      "Within 600mm of the meter on the consumer's side",
      "At the first gas appliance"
    ],
    correctIndex: 2,
    explanation: "Gas bonding must be within 600mm of the meter AND on the consumer's side (outlet/downstream). This ensures the bonding is under the customer's control and protects all gas pipework within the building."
  },
  {
    id: "bonding-size-tn",
    question: "What minimum main bonding conductor size is required for a TN-C-S installation with a 16mm² earthing conductor?",
    options: [
      "4mm²",
      "6mm²",
      "8mm²",
      "10mm²"
    ],
    correctIndex: 3,
    explanation: "Main bonding should be at least half the earthing conductor CSA. Half of 16mm² is 8mm², but standard cable sizes are 6mm² or 10mm², so 10mm² is used. This is also the commonly recommended minimum for TN supplies."
  },
  {
    id: "bonding-label",
    question: "What label must be fitted at main bonding connection points?",
    options: [
      "DANGER - HIGH VOLTAGE",
      "EARTH WIRE",
      "SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE",
      "BONDING POINT - TESTING REQUIRED"
    ],
    correctIndex: 2,
    explanation: "This BS 7671 required label warns anyone working on pipework (plumbers, gas fitters) that the connection is for electrical safety and must not be removed. Removing it could leave the installation dangerous."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of main protective bonding?",
    options: ["To provide a path for normal load current", "To reduce voltage differences between extraneous-conductive-parts and earth", "To increase the earth fault loop impedance", "To protect cables from mechanical damage"],
    correctAnswer: 1,
    explanation: "Main bonding limits touch voltages by ensuring extraneous-conductive-parts (incoming metal services) are at the same potential as the electrical installation's earth. This prevents dangerous voltage differences during a fault."
  },
  {
    id: 2,
    question: "Which of the following services typically requires main bonding?",
    options: ["Plastic water pipe", "Metallic gas pipe after the meter", "Telephone cable", "Fibre optic cable"],
    correctAnswer: 1,
    explanation: "Metallic gas pipes after the meter require main bonding because they're conductive and connected to the ground outside. Plastic pipes don't conduct. Telephone and fibre cables are either non-conductive or separately earthed at the exchange."
  },
  {
    id: 3,
    question: "Within what distance of the service entry point should main bonding be connected?",
    options: ["Within 1m", "Within 600mm", "Within 300mm", "Anywhere before the first fitting"],
    correctAnswer: 1,
    explanation: "Main bonding should be connected within 600mm of where the service enters the building (and for gas, within 600mm of the meter on the consumer's side). This ensures protection as close to the entry point as practical."
  },
  {
    id: 4,
    question: "What is the minimum main bonding conductor size for a TN-C-S supply where 16mm² is the earthing conductor?",
    options: ["4mm²", "6mm²", "8mm²", "10mm²"],
    correctAnswer: 2,
    explanation: "Main bonding must be at least half the CSA of the earthing conductor. Half of 16mm² = 8mm². However, the absolute minimum for TN supplies is 6mm², and the calculated 8mm² exceeds this, so 8mm² (or 10mm² standard) would be required."
  },
  {
    id: 5,
    question: "What label must be attached at each main bonding connection?",
    options: ["'DANGER - HIGH VOLTAGE'", "'EARTH WIRE'", "'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE'", "'BONDING POINT - TESTING REQUIRED'"],
    correctAnswer: 2,
    explanation: "BS 7671 requires the label 'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE' at main bonding connections. This warns people not to remove the connection during plumbing or other work, which could leave the installation unsafe."
  },
  {
    id: 6,
    question: "What type of clamp is standard for main bonding connections to pipes?",
    options: ["Any metal clamp", "Jubilee clip", "BS 951 bonding clamp", "Saddle clip"],
    correctAnswer: 2,
    explanation: "BS 951 bonding clamps are specifically designed for making reliable connections to metal pipes. They grip the pipe securely, provide good electrical contact, and accommodate pipe movement and temperature changes."
  },
  {
    id: 7,
    question: "What reading would you expect when testing main bonding continuity on a short conductor?",
    options: ["Zero exactly", "Less than 0.05Ω typically", "Between 1-2Ω", "Greater than 5Ω"],
    correctAnswer: 1,
    explanation: "Main bonding conductors are typically short and large CSA, so resistance should be very low - often less than 0.05Ω including contact resistance. Higher readings indicate poor connections or undersized conductors."
  },
  {
    id: 8,
    question: "For a TT earthing system, what is the minimum main bonding conductor size?",
    options: ["10mm² regardless", "2.5mm² if mechanically protected, 4mm² if not", "6mm² minimum regardless", "16mm² to match earthing conductor"],
    correctAnswer: 1,
    explanation: "For TT systems, minimum main bonding is 2.5mm² if mechanically protected, or 4mm² if not. This is smaller than TN systems because TT systems use RCD protection, and the primary protection is through disconnection, not bonding."
  },
  {
    id: 9,
    question: "If a metallic water pipe has 3m of plastic before entering a house, does it require main bonding?",
    options: ["Yes, always bond metallic services", "No, the plastic isolates it from earth", "Only if the pipe is accessible", "Only for bathrooms"],
    correctAnswer: 1,
    explanation: "If the plastic section completely isolates the internal metalwork from earth, bonding may not be required. However, best practice is often to bond anyway as future changes could reintroduce earth connection. Risk assessment should guide the decision."
  },
  {
    id: 10,
    question: "Where should main bonding to gas be connected?",
    options: ["At the gas main in the street", "On the meter inlet connection", "Within 600mm of the meter on the consumer's side", "At the first gas appliance"],
    correctAnswer: 2,
    explanation: "Gas main bonding must be within 600mm of the meter AND on the consumer's side (outlet/downstream). This ensures the bonding is under the customer's control and protects all gas pipework within the building."
  }
];

const faqs = [
  {
    question: "What is the difference between main bonding and supplementary bonding?",
    answer: "Main bonding connects extraneous-conductive-parts (metal services entering the building) to the main earthing terminal. It's a 'whole building' protection measure. Supplementary bonding connects exposed-conductive-parts and extraneous-conductive-parts within a specific area (like a bathroom) where simultaneous contact is possible. Main bonding has larger minimum sizes (typically 10mm²) while supplementary bonding is typically smaller (4mm² minimum)."
  },
  {
    question: "What services require main bonding?",
    answer: "Services that require main bonding include: metallic water pipes entering the building, metallic gas pipes (after the meter), metallic oil supply pipes, structural metalwork connected to the ground (steel frames, etc.), metallic ducting (HVAC) if in contact with earth, and other metallic services. Plastic pipes do NOT require bonding as they're non-conductive. Each metal service entering from outside needs separate bonding."
  },
  {
    question: "Where should main bonding connections be made?",
    answer: "Main bonding should be connected within 600mm of the point where the service enters the building. For gas, it must be within 600mm of the meter AND on the consumer's side of the meter. For water, it should be as close to the entry point as practical, before any branch connections. The connection must be accessible for inspection and testing."
  },
  {
    question: "What minimum CSA is required for main bonding conductors?",
    answer: "The minimum CSA depends on the supply type: For TN-S and TN-C-S supplies: minimum 6mm² copper (or 10mm² if mechanically protected). For TT supplies: minimum 2.5mm² if mechanically protected and 4mm² if not. However, the bonding conductor must be at least half the CSA of the earthing conductor, with a maximum of 25mm² required regardless of earthing conductor size."
  },
  {
    question: "Can plastic pipe sections interrupt main bonding requirements?",
    answer: "If a metallic service has plastic sections before entering the building, the metal parts may not need bonding if they're completely isolated from earth by the plastic. However, if there's ANY chance of the metal being or becoming connected to earth (direct or through other metal), bonding should still be provided. When in doubt, bond it - it does no harm and provides protection against future changes."
  },
  {
    question: "What resistance reading is acceptable for main bonding?",
    answer: "Main bonding should show very low resistance - typically less than 0.05Ω for short runs. The reading should be consistent with the conductor size and length. There's no specific maximum in BS 7671, but any high reading indicates poor connection. For longer runs, calculate expected resistance from CSA and length, but values should still be well under 1Ω."
  },
  {
    question: "What type of clamp should be used for main bonding connections?",
    answer: "BS 951 clamps are the standard for main bonding connections. They must be accessible, provide reliable connection to the pipe, be labelled 'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE', and be appropriate for the pipe material and size. The clamp must maintain contact even with pipe movement or temperature changes."
  },
  {
    question: "How do I test main bonding if I can't access the earthing terminal?",
    answer: "If direct access to the main earthing terminal isn't possible, you can test from the earth bar in the consumer unit (which should be connected to MET) to the service. The reading will be slightly higher due to the additional conductor length, but should still be very low. Alternatively, test from a known good earth point near the MET. Document which test point you used."
  }
];

const InspectionTestingModule3Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/inspection-testing-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Main Bonding Conductor Testing
          </h1>
          <p className="text-white/80">
            Verify the critical connections that ensure metal services are at the same potential as earth
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Equalise potential of metal services with earth</li>
              <li><strong>Location:</strong> Within 600mm of service entry point</li>
              <li><strong>Services:</strong> Gas, water, oil, structural steel</li>
              <li><strong>Size:</strong> Minimum 10mm² copper for TN supplies</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Missing bonding, corroded clamps, wrong sizes</li>
              <li><strong>Use:</strong> Low-resistance ohmmeter testing</li>
              <li><strong>Apply:</strong> Every incoming metallic service</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify services requiring main protective bonding",
              "Perform continuity tests on main bonding conductors",
              "Verify correct bonding conductor sizes for the installation",
              "Identify correct connection points for bonding conductors",
              "Record main bonding test results on certificates",
              "Recognise defective or missing main bonding"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is Main Bonding? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Main Bonding?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main protective bonding connects extraneous-conductive-parts (metal services entering the building from outside) to the main earthing terminal (MET). This ensures all metal parts that could become energised are at the same electrical potential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why It's Critical:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Prevents Touch Voltage:</strong> If a fault energises metalwork, bonding ensures all metal rises together - no potential difference to touch</li>
                <li><strong>Equalises Potential:</strong> Creates equipotential zone - all bonded parts at same voltage relative to earth</li>
                <li><strong>Assists Fault Clearance:</strong> Provides additional path for fault current, helping protective devices operate</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Extraneous-Conductive-Parts</p>
              <p className="text-sm text-white">
                These are conductive parts NOT part of the electrical installation but which could introduce a potential (usually earth potential) into the building. Examples: metal water pipes, gas pipes, structural steel, ducting connected to earth.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Services Requiring Bonding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Services Requiring Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Any metallic service that enters the building and could introduce earth potential requires main bonding. The key is whether the metal is or could be connected to the general mass of earth.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Services Requiring Main Bonding:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Metallic Water Pipes:</strong> Bond within 600mm of entry, before any branch connections</li>
                <li><strong>Metallic Gas Pipes:</strong> Bond within 600mm of meter, on consumer's side (outlet)</li>
                <li><strong>Metallic Oil Pipes:</strong> Bond near entry point, similar to water</li>
                <li><strong>Structural Metalwork:</strong> Steel frames, beams in contact with earth</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10">
              <p className="text-sm font-medium text-green-400 mb-2">Services NOT Requiring Bonding</p>
              <ul className="text-sm text-white space-y-1">
                <li>Plastic water/gas pipes (non-conductive)</li>
                <li>Fibre optic cables (non-conductive)</li>
                <li>Metalwork completely isolated from earth by plastic sections</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 italic">
              <strong>When in Doubt - Bond It:</strong> If you're uncertain whether a service needs bonding, it's safer to bond it. Bonding a service that doesn't strictly need it does no harm. Not bonding one that does need it is dangerous.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Bonding Conductor Sizes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bonding Conductor Sizes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main bonding conductor size depends on the earthing system type and the size of the earthing conductor. There are minimum sizes that apply regardless of calculation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TN Systems (TN-S and TN-C-S):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/60 py-2 px-1">Earthing Conductor</th>
                      <th className="text-center text-elec-yellow py-2 px-1">Min. Main Bonding</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">Up to 10mm²</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">6mm²</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">16mm²</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">10mm²</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">25mm²</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">10mm²</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">35mm²</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">16mm²</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-1">50mm² and above</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">25mm²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/50 text-xs mt-2">Based on half the earthing conductor size, min 6mm², max 25mm²</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TT Systems:</p>
              <div className="grid grid-cols-2 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-green-500/10">
                  <p className="font-medium text-green-400 mb-1">With Protection</p>
                  <p className="text-white text-xl font-bold">2.5mm²</p>
                  <p className="text-white/50 text-xs">If mechanically protected</p>
                </div>
                <div className="p-3 rounded bg-elec-yellow/10">
                  <p className="font-medium text-elec-yellow mb-1">Without Protection</p>
                  <p className="text-white text-xl font-bold">4mm²</p>
                  <p className="text-white/50 text-xs">If not protected</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Standard Practice</p>
              <p className="text-sm text-white">
                Most domestic installations use 10mm² main bonding conductors as standard, regardless of the calculated minimum. This allows for future increases in supply size without needing to upgrade bonding.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Testing Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main bonding continuity is tested with a low resistance ohmmeter from the main earthing terminal to each bonded service.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Steps:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Isolate Supply (if testing at MET):</strong> Or test from earth bar in CU if more accessible</li>
                <li><strong>2. Null Test Leads:</strong> Zero the instrument with leads shorted</li>
                <li><strong>3. Connect to MET/Earth Bar:</strong> One test lead to main earthing terminal or earth bar</li>
                <li><strong>4. Test to Each Bonded Service:</strong> Other lead to bonding clamp on each pipe/service</li>
                <li><strong>5. Record Results:</strong> Should be very low (typically less than 0.05Ω)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Expected Readings:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                  <span className="text-white/80 text-sm">Short bonding conductor (1-2m)</span>
                  <span className="text-green-400 font-medium">{"<"}0.05Ω</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                  <span className="text-white/80 text-sm">Longer runs (up to 10m)</span>
                  <span className="text-green-400 font-medium">{"<"}0.2Ω</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
                  <span className="text-white/80 text-sm">Any reading above 0.5Ω</span>
                  <span className="text-amber-400 font-medium">Investigate!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Connection Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main bonding connections must be made using approved methods and labelled correctly. Poor connections can result in high resistance or complete failure of the bonding.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 951 Bonding Clamps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Made of copper or brass (not steel which can corrode)</li>
                <li>Correct size for the pipe diameter</li>
                <li>Clean pipe surface before fitting (remove paint, corrosion)</li>
                <li>Tight enough to maintain contact without crushing pipe</li>
                <li>Accessible for inspection and testing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 text-center">
              <p className="font-bold text-sm text-[#1a1a1a]">SAFETY ELECTRICAL CONNECTION</p>
              <p className="font-bold text-sm text-[#1a1a1a]">DO NOT REMOVE</p>
              <p className="text-white/60 text-xs mt-2">This label must be fitted at each main bonding connection point</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10">
              <p className="text-sm font-medium text-red-400 mb-2">Not Acceptable</p>
              <ul className="text-sm text-white space-y-1">
                <li>Jubilee clips (can loosen, poor contact)</li>
                <li>Soldered connections (may melt in fire)</li>
                <li>Connections under paint or insulation</li>
                <li>Connections in inaccessible locations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Recording and Certification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording and Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main bonding test results are recorded on the Electrical Installation Certificate or Periodic Inspection Report, confirming the continuity of each bonding conductor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Information to Record:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Service bonded:</strong> Water, Gas, Oil, etc.</li>
                <li><strong>Conductor size:</strong> CSA of bonding conductor</li>
                <li><strong>Continuity reading:</strong> Measured resistance in ohms</li>
                <li><strong>Location:</strong> Where bonding connection is made</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Certificate Entry:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-1 text-white/60">Service</th>
                      <th className="text-center py-1 text-white/60">CSA</th>
                      <th className="text-center py-1 text-white/60">Continuity</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-1">Water</td>
                      <td className="text-center py-1">10mm²</td>
                      <td className="text-center py-1 text-green-400">0.03Ω</td>
                    </tr>
                    <tr>
                      <td className="py-1">Gas</td>
                      <td className="text-center py-1">10mm²</td>
                      <td className="text-center py-1 text-green-400">0.04Ω</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Missing or Defective Bonding</p>
              <p className="text-sm text-white">
                If main bonding is missing or inadequate, this is a C1 (danger present) observation on a periodic report. The installation is unsafe until bonding is installed or corrected.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Top Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check under insulation - pipes may be bonded but connection hidden</li>
                <li>Use a long wandering lead if MET is distant from services</li>
                <li>Clean pipe surface before testing for accurate reading</li>
                <li>Take photos of bonding connections for records</li>
                <li>Check plastic sections don't interrupt bonding requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Faults Found</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing bonding to gas</strong> - very common on older installations</li>
                <li><strong>Bonding disconnected</strong> - after plumbing work</li>
                <li><strong>Undersized bonding conductor</strong> - especially on upgraded supplies</li>
                <li><strong>Corroded connections</strong> - giving high resistance</li>
                <li><strong>Wrong side of gas meter</strong> - bonded on utility side</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671:</strong> Regulation 411.3.1.2 - Main bonding</li>
                <li><strong>Table 54.8:</strong> Minimum bonding conductor sizes</li>
                <li><strong>BS 951:</strong> Specification for bonding clamps</li>
                <li><strong>Regulation 514.13:</strong> Safety label requirements</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Main Bonding Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>Bond within 600mm of entry</li>
                  <li>Gas: consumer's side of meter</li>
                  <li>TN min: 6mm², typically 10mm²</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Testing</p>
                <ul className="space-y-0.5">
                  <li>Low-resistance ohmmeter</li>
                  <li>MET to bonding clamp</li>
                  <li>Expect {"<"}0.05Ω typically</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
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

export default InspectionTestingModule3Section3;
