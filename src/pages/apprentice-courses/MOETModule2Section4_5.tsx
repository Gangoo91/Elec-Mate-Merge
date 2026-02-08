import { ArrowLeft, Link2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bonding Requirements - MOET Module 2 Section 4.5";
const DESCRIPTION = "Comprehensive guide to equipotential bonding for electrical maintenance technicians: main bonding, supplementary bonding, conductor sizing, BS 7671 Section 544 requirements and practical applications.";

const quickCheckQuestions = [
  {
    id: "bonding-purpose",
    question: "What is the primary purpose of equipotential bonding?",
    options: [
      "To provide a path for normal load current to return to the source",
      "To ensure all simultaneously accessible metalwork is at the same potential, reducing touch voltage during a fault",
      "To increase the earth fault current for faster device operation",
      "To reduce electricity consumption"
    ],
    correctIndex: 1,
    explanation: "Equipotential bonding connects all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts to the same potential. During a fault, if all metalwork in an area is at the same voltage, the potential difference that a person could experience between any two touchable surfaces is minimised — reducing the risk of electric shock."
  },
  {
    id: "main-bonding-size",
    question: "For a TN-C-S (PME) supply with a 25 mm² incoming line conductor, what is the minimum main bonding conductor size?",
    options: [
      "6 mm² copper",
      "10 mm² copper",
      "16 mm² copper",
      "25 mm² copper"
    ],
    correctIndex: 1,
    explanation: "For TN-C-S (PME) supplies, BS 7671 Table 54.8 requires main bonding conductors to be not less than 10 mm² copper where the incoming line conductor is up to 35 mm². This is more onerous than the general requirement because of the additional risk associated with PME — the broken PEN conductor scenario requires robust bonding to limit dangerous voltage differences."
  },
  {
    id: "supplementary-bonding",
    question: "Supplementary bonding is required:",
    options: [
      "In every room of every installation without exception",
      "In locations where the conditions increase the risk of shock, such as bathrooms, or where the automatic disconnection time may not be met",
      "Only in industrial installations",
      "Only when the installation has no RCD protection"
    ],
    correctIndex: 1,
    explanation: "Supplementary bonding provides additional equipotential bonding within a specific area where the shock risk is increased — for example, bathrooms (BS 7671 Section 701) where the body resistance is reduced by wet conditions. It is also required where Zs values cannot meet the disconnection time requirements and an alternative solution is needed."
  },
  {
    id: "extraneous-conductive-part",
    question: "Which of the following is an extraneous-conductive-part that requires main bonding?",
    options: [
      "The metal enclosure of a consumer unit",
      "A metallic gas installation pipe entering the building",
      "A metal light switch faceplate",
      "A copper cable conductor within the installation"
    ],
    correctIndex: 1,
    explanation: "An extraneous-conductive-part is a conductive part that is not part of the electrical installation but which may introduce a potential — typically earth potential. Metallic gas pipes, water pipes, structural steelwork, and central heating pipes entering a building are extraneous-conductive-parts that must be main bonded. The consumer unit enclosure is an exposed-conductive-part (part of the electrical installation), not an extraneous-conductive-part."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Main equipotential bonding connects the main earthing terminal to:",
    options: [
      "Every socket outlet in the installation",
      "Extraneous-conductive-parts such as metallic gas, water and structural steel entering the building",
      "The supply company's meter",
      "The lighting circuits only"
    ],
    correctAnswer: 1,
    explanation: "Main equipotential bonding (Regulation 411.3.1.2) connects the main earthing terminal to each extraneous-conductive-part entering the building — metallic water service pipes, gas installation pipes, oil installation pipes, structural steelwork, central heating systems, and air conditioning ducting. This ensures they are at the same potential as the installation earth."
  },
  {
    id: 2,
    question: "The main bonding connection to gas pipework must be made:",
    options: [
      "On the street side of the gas meter",
      "Within 600 mm of the meter outlet (consumer side), before any branch pipework",
      "At the boiler",
      "At any convenient point on the gas pipework"
    ],
    correctAnswer: 1,
    explanation: "The main bonding connection to gas pipework must be made within 600 mm of the meter outlet on the consumer's side (downstream of the meter), before any branch pipework. This ensures the bonding is as close as possible to the point where the pipe enters the installation, capturing all downstream metalwork. It must be on the consumer's side of the meter to avoid interfering with the meter installation."
  },
  {
    id: 3,
    question: "Under BS 7671, the minimum cross-sectional area for a main bonding conductor in a TN-S system with a 16 mm² incoming line conductor is:",
    options: [
      "2.5 mm² copper",
      "4 mm² copper",
      "6 mm² copper",
      "10 mm² copper"
    ],
    correctAnswer: 3,
    explanation: "For TN-S and TN-C-S systems, BS 7671 Table 54.8 specifies minimum main bonding conductor sizes. For a supply with a line conductor of 16 mm², the minimum main bonding conductor is 10 mm² copper. The standard specifies minimum sizes of 6 mm², 10 mm², or 25 mm² depending on the supply conductor size, but with an absolute minimum of 6 mm² for any installation."
  },
  {
    id: 4,
    question: "Supplementary bonding conductors between two exposed-conductive-parts must have a minimum cross-sectional area of:",
    options: [
      "1 mm² copper",
      "The smaller of the two CPCs connected to those exposed-conductive-parts",
      "Half the size of the larger CPC",
      "10 mm² copper"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 544.2.3 requires that a supplementary bonding conductor connecting two exposed-conductive-parts must have a conductance not less than that of the smaller CPC connected to those parts. In practice, this means using a conductor at least the same size as the smaller CPC. Where the bond connects an exposed-conductive-part to an extraneous-conductive-part, it must be at least half the CPC size, with a minimum of 2.5 mm² (mechanically protected) or 4 mm² (unprotected)."
  },
  {
    id: 5,
    question: "A bonding conductor must be identified by:",
    options: [
      "Red PVC sleeving or tape",
      "Green-and-yellow striped insulation or sleeving",
      "Blue PVC insulation",
      "No identification is required"
    ],
    correctAnswer: 1,
    explanation: "All protective conductors, including bonding conductors, must be identified by green-and-yellow bi-colour marking (BS 7671 Regulation 514.3.2). This applies throughout their length. Where the conductor is bare (e.g., bare copper tape), green-and-yellow sleeving or tape must be applied at terminations and at intervals along the run where visible."
  },
  {
    id: 6,
    question: "In a bathroom (special location — Section 701), supplementary bonding is required when:",
    options: [
      "Always, regardless of other conditions",
      "Only if the automatic disconnection conditions of Regulation 411.3.2 cannot be met",
      "Only in commercial premises",
      "Only if the bathroom has a metal bath"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 701.415.2 (as amended) states that supplementary bonding in bathrooms may be omitted where all circuits comply with the automatic disconnection requirements of Regulation 411.3.2 and all circuits are protected by 30 mA RCDs. If these conditions are met, supplementary bonding is not required. Where they cannot be met, supplementary bonding must be provided."
  },
  {
    id: 7,
    question: "The bonding clamp used on a gas or water pipe must be:",
    options: [
      "Any convenient cable tie or jubilee clip",
      "A purpose-made clamp to BS 951, permanently labelled 'Safety Electrical Connection — Do Not Remove'",
      "A standard pipe clip from a plumbing supplier",
      "A solder connection to the pipe"
    ],
    correctAnswer: 1,
    explanation: "Bonding clamps must be purpose-made to BS 951 and must be permanently labelled 'Safety Electrical Connection — Do Not Remove' (BS 7671 Regulation 514.13.1). This label ensures that anyone working on the pipework understands the electrical safety significance of the connection and does not inadvertently remove it — which could leave metalwork unbonded and dangerous."
  },
  {
    id: 8,
    question: "If a plastic section is inserted into an otherwise metallic water pipe system (e.g., during repairs), what is the bonding implication?",
    options: [
      "No action needed — the plastic section has no effect",
      "The section downstream of the plastic insert is no longer bonded and may need separate bonding or re-assessment",
      "The entire bonding system must be removed",
      "An additional RCD must be installed"
    ],
    correctAnswer: 1,
    explanation: "A plastic (non-conductive) section inserted into a metallic pipe breaks the bonding continuity. The metalwork downstream of the plastic section is no longer connected to the main bonding and could be at a different potential. The situation must be assessed — if the downstream metalwork is simultaneously accessible with other earthed metalwork, supplementary bonding or an alternative solution may be required."
  },
  {
    id: 9,
    question: "Main bonding conductors must be connected to:",
    options: [
      "The neutral bar of the consumer unit",
      "The main earthing terminal of the installation",
      "The electricity meter",
      "Each individual circuit's CPC"
    ],
    correctAnswer: 1,
    explanation: "Main bonding conductors run from each extraneous-conductive-part to the main earthing terminal (MET) of the installation (Regulation 544.1.1). The MET is the central point where all protective conductors converge — the earthing conductor from the means of earthing, the main bonding conductors, and the circuit protective conductors all connect here."
  },
  {
    id: 10,
    question: "Which of the following does NOT typically require main bonding?",
    options: [
      "Metallic water service pipe",
      "Metallic gas installation pipe",
      "Structural steelwork accessible within the building",
      "A plastic cold water pipe from a private borehole"
    ],
    correctAnswer: 3,
    explanation: "A plastic pipe is not a conductive part and therefore cannot introduce a potential or provide a path for fault current. It does not require bonding. Only metallic (conductive) pipes, ducts and structural elements that may introduce earth potential into the building are classified as extraneous-conductive-parts requiring main bonding."
  },
  {
    id: 11,
    question: "When inspecting main bonding during periodic inspection, you should verify:",
    options: [
      "Only that the bonding conductor exists",
      "That the conductor is correctly sized, securely connected with a BS 951 clamp, correctly labelled, and has continuity to the MET",
      "Only that the label is present",
      "Only the colour of the conductor"
    ],
    correctAnswer: 1,
    explanation: "A thorough inspection of main bonding includes: verifying the conductor size meets BS 7671 requirements for the supply type and size; checking the connection is secure using a proper BS 951 clamp; confirming the 'Safety Electrical Connection — Do Not Remove' label is present and legible; and testing continuity from the bonding clamp back to the main earthing terminal using a low-resistance ohmmeter."
  },
  {
    id: 12,
    question: "For PME (TN-C-S) supplies, main bonding requirements are more onerous because:",
    options: [
      "PME supplies have higher voltage",
      "A broken PEN conductor could cause dangerous voltages on earthed metalwork, so robust bonding is essential to maintain equipotentiality",
      "PME systems use aluminium conductors",
      "PME installations are always larger"
    ],
    correctAnswer: 1,
    explanation: "PME supplies carry the specific risk that loss of the PEN conductor allows earth-referenced metalwork to rise to dangerous voltage. Robust main bonding ensures that even if this occurs, all metalwork in the installation remains at the same potential — minimising the voltage a person could experience between simultaneously accessible metalwork. This is why BS 7671 specifies larger minimum bonding conductor sizes for PME supplies."
  }
];

const faqs = [
  {
    question: "Is main bonding to water pipes still required now that many houses have plastic water mains?",
    answer: "Where the incoming water service pipe is entirely plastic, it is not an extraneous-conductive-part and does not require main bonding. However, if there is any metallic pipework within the building connected to the plastic mains (e.g., copper internal pipework), the internal metalwork may still need assessment. If it could introduce a potential (e.g., by contact with the ground or other conductive surfaces), supplementary bonding may be required. Always assess the specific installation."
  },
  {
    question: "Can I use the gas or water pipe as an earthing conductor?",
    answer: "No. BS 7671 Regulation 542.2.4 prohibits the use of gas pipes as earthing conductors. Water pipes should also not be relied upon as the sole means of earthing due to the risk of plastic sections being introduced. Bonding connects these services to the earthing system for safety, but the earthing conductor itself must be a dedicated conductor connected to the means of earthing provided by the supply or the earth electrode."
  },
  {
    question: "Do I need to bond the central heating system separately from the water pipes?",
    answer: "If the central heating system is metallically continuous with the bonded water pipework (i.e., connected by metal pipes throughout), then the bonding of the water pipes extends to the heating system. However, if there are plastic sections, isolating valves with plastic components, or if the heating system is not metallically continuous with the bonded water pipe, separate bonding of the heating system may be required. Always verify continuity."
  },
  {
    question: "What is the difference between an exposed-conductive-part and an extraneous-conductive-part?",
    answer: "An exposed-conductive-part (ECP) is a conductive part of electrical equipment that can be touched and is not normally live but can become live under fault conditions — for example, a metal light fitting or a metal distribution board enclosure. An extraneous-conductive-part (ExCP) is a conductive part that is not part of the electrical installation but may introduce a potential — for example, metallic water pipes, gas pipes, or structural steelwork. ECPs are earthed via circuit protective conductors; ExCPs are connected to the installation earth via bonding conductors."
  },
  {
    question: "How do I test bonding continuity during periodic inspection?",
    answer: "Use a low-resistance ohmmeter (typically part of your multifunction tester) to measure the resistance between the bonding clamp on the pipe and the main earthing terminal. The reading should be very low — typically less than 0.05 ohms for a direct bonding connection. Higher readings suggest a poor connection, corrosion at the clamp, or a damaged conductor. Also visually inspect the clamp, label, and conductor for damage, corrosion or unauthorised removal."
  }
];

const MOETModule2Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Link2 className="h-4 w-4" />
            <span>Module 2.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Bonding Requirements
          </h1>
          <p className="text-white/80">
            Equipotential bonding principles, conductor sizing and practical implementation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Main bonding:</strong> ExCPs to MET — gas, water, steel, heating</li>
              <li className="pl-1"><strong>Supplementary:</strong> Local bonding in high-risk areas (bathrooms)</li>
              <li className="pl-1"><strong>Sizing:</strong> Table 54.8 — depends on supply type and conductor size</li>
              <li className="pl-1"><strong>Label:</strong> BS 951 clamp, 'Do Not Remove' label mandatory</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Inspection:</strong> Verify size, clamp, label, continuity</li>
              <li className="pl-1"><strong>Plastic pipes:</strong> Assess impact on bonding continuity</li>
              <li className="pl-1"><strong>PME risk:</strong> More robust bonding required for TN-C-S</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to earthing and protection KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of equipotential bonding and the concept of touch voltage reduction",
              "Distinguish between main bonding and supplementary bonding and their respective applications",
              "Select correct bonding conductor sizes using BS 7671 Table 54.8",
              "Identify extraneous-conductive-parts requiring main bonding in typical installations",
              "Apply supplementary bonding requirements in bathrooms and other special locations",
              "Inspect and test bonding installations during periodic inspection and testing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Principle of Equipotential Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipotential bonding is one of the two fundamental measures for protection against electric
              shock by automatic disconnection of supply (the other being the protective earthing of
              exposed-conductive-parts). Its purpose is to ensure that all simultaneously accessible metalwork
              — whether part of the electrical installation or not — is at the same electrical potential. If
              all touchable metalwork is at the same voltage, a person touching two surfaces simultaneously
              cannot experience a dangerous potential difference across their body.
            </p>
            <p>
              Consider a fault scenario: a line conductor in a washing machine contacts the metal casing. The
              casing rises to a dangerous voltage (relative to earth). If the person touching the casing is
              also standing on a metal floor or touching a bonded water pipe, the potential difference between
              the casing and the pipe determines the severity of the shock. Effective bonding ensures that
              both the casing (via the CPC) and the pipe (via the bonding conductor) are connected to the
              same earthing terminal, keeping them at the same potential.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two Levels of Bonding</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main equipotential bonding (Reg 411.3.1.2):</strong> Connects extraneous-conductive-parts entering the building to the main earthing terminal (MET). This creates a zone of equipotentiality throughout the building.</li>
                <li className="pl-1"><strong>Supplementary equipotential bonding (Reg 415.2):</strong> Provides additional bonding within a specific area (e.g., bathroom) where the shock risk is increased, connecting local exposed-conductive-parts and extraneous-conductive-parts together.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Safety Point</p>
              <p className="text-sm text-white">
                Bonding must never be removed or disconnected without ensuring an equivalent safety measure is
                in place. Removing a bonding conductor — even temporarily during plumbing work — can create an
                immediate shock hazard. This is why the 'Safety Electrical Connection — Do Not Remove' label
                is a mandatory requirement. As a maintenance technician, if you find bonding has been removed
                (a common occurrence after plumbing or gas work), it must be reinstated immediately and
                recorded as a deficiency.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Main Equipotential Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main equipotential bonding is required by BS 7671 Regulation 411.3.1.2. It connects every
              extraneous-conductive-part entering the building to the main earthing terminal (MET) of the
              installation. The bonding conductor runs from the MET to a purpose-made clamp on each service.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Services Requiring Main Bonding</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Metallic water service pipe:</strong> Bond within 600 mm of the internal stopcock</li>
                <li className="pl-1"><strong>Metallic gas installation pipe:</strong> Bond within 600 mm of the meter outlet (consumer side)</li>
                <li className="pl-1"><strong>Other metallic service pipes:</strong> Oil, compressed air, fire sprinkler mains</li>
                <li className="pl-1"><strong>Structural steelwork:</strong> Where accessible and likely to introduce earth potential</li>
                <li className="pl-1"><strong>Central heating and air conditioning:</strong> Metallic systems where not metallically continuous with bonded water pipes</li>
                <li className="pl-1"><strong>Lightning protection:</strong> The lightning protection earth must be bonded to the MET</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Bonding Conductor Sizes (BS 7671 Table 54.8)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Supply Conductor CSA</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TN-S Minimum</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TN-C-S (PME) Minimum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 35 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">10 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">10 mm² Cu</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 35 mm² up to 50 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">16 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">16 mm² Cu</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 50 mm² up to 95 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">16 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">25 mm² Cu</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 95 mm² up to 150 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">25 mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">25 mm² Cu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For PME installations, the bonding conductor size requirements are
              generally the same or larger than for TN-S because of the additional risk. The absolute minimum
              for any main bonding conductor is 6 mm² copper, but in practice 10 mm² is the most common
              minimum for domestic installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Supplementary Equipotential Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Supplementary bonding provides an additional safety measure within specific areas where the risk
              of electric shock is increased. The most common application is in bathrooms (Section 701 of
              BS 7671), where the body's resistance to current flow is significantly reduced by water and wet
              skin. Supplementary bonding connects simultaneously accessible exposed-conductive-parts and
              extraneous-conductive-parts within the local area.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Supplementary Bonding Is Required</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bathrooms (Section 701):</strong> Required unless all circuits comply with automatic disconnection requirements AND all circuits are RCD protected at 30 mA</li>
                <li className="pl-1"><strong>Swimming pools (Section 702):</strong> Always required — connects all exposed- and extraneous-conductive-parts within the zone</li>
                <li className="pl-1"><strong>Agricultural premises (Section 705):</strong> Required in livestock areas</li>
                <li className="pl-1"><strong>Any location:</strong> Where the disconnection time requirements of Reg 411.3.2 cannot be met by other means</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Supplementary Bonding Conductor Sizing</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Between two exposed-conductive-parts:</strong> Not less than the smaller of the two CPCs</li>
                <li className="pl-1"><strong>Between an exposed-conductive-part and an extraneous-conductive-part:</strong> Not less than half the size of the CPC</li>
                <li className="pl-1"><strong>Between two extraneous-conductive-parts:</strong> Not less than 2.5 mm² Cu (mechanically protected) or 4 mm² Cu (unprotected)</li>
                <li className="pl-1"><strong>Absolute minimum:</strong> 2.5 mm² Cu if mechanically protected; 4 mm² Cu if not</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Bathroom Bonding — Practical Application</p>
              <p className="text-sm text-white">
                In a bathroom where supplementary bonding is required, you must bond together: the metal bath
                or shower tray (if metallic), metallic waste pipes, copper hot and cold water pipes, central
                heating pipes and radiators, metallic door frames, and any exposed-conductive-parts of
                electrical equipment (e.g., Class I towel rails, extractors). Connections should be made using
                purpose-made clamps or lugs, and the bonding network should connect back to the earth terminal
                of the bathroom circuit.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Inspection, Testing and Common Deficiencies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bonding deficiencies are among the most common findings during periodic inspection and testing.
              Missing bonding, undersized conductors, removed clamps, and disconnected conductors are
              frequently discovered — often as a result of plumbing, gas or building work carried out after
              the original electrical installation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Presence:</strong> Confirm bonding conductors exist to all extraneous-conductive-parts</li>
                <li className="pl-1"><strong>Sizing:</strong> Verify conductor CSA against BS 7671 Table 54.8 for the supply type</li>
                <li className="pl-1"><strong>Connections:</strong> Check clamps are secure, clean and making good contact (not corroded)</li>
                <li className="pl-1"><strong>Labels:</strong> Verify 'Safety Electrical Connection — Do Not Remove' labels are present and legible</li>
                <li className="pl-1"><strong>Continuity:</strong> Test continuity from bonding clamp to MET using low-resistance ohmmeter</li>
                <li className="pl-1"><strong>Route:</strong> Check conductor route is protected from mechanical damage and accessible for inspection</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Deficiencies</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Bonding removed during plumbing/gas work</li>
                  <li className="pl-1">Plastic sections in pipework breaking continuity</li>
                  <li className="pl-1">Undersized conductors (e.g., 4 mm² where 10 mm² required)</li>
                  <li className="pl-1">Missing or illegible labels</li>
                  <li className="pl-1">Corroded clamps giving high-resistance connections</li>
                  <li className="pl-1">Bonding connected on wrong side of gas meter</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EICR Classification</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>C1 (Danger present):</strong> Missing main bonding on a PME supply</li>
                  <li className="pl-1"><strong>C2 (Potentially dangerous):</strong> Undersized main bonding conductor</li>
                  <li className="pl-1"><strong>C3 (Improvement recommended):</strong> Missing label on otherwise correct bonding</li>
                  <li className="pl-1"><strong>FI (Further investigation):</strong> Bonding continuity questionable — needs test</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Understanding bonding requirements and being able to inspect, test
              and rectify bonding deficiencies is a core skill for the electrical maintenance technician
              pathway. You will encounter bonding issues regularly during routine maintenance and periodic
              inspection work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Main Bonding</p>
                <ul className="space-y-0.5">
                  <li>Gas — within 600 mm of meter outlet</li>
                  <li>Water — within 600 mm of stopcock</li>
                  <li>Structural steel, heating, other services</li>
                  <li>BS 951 clamp + 'Do Not Remove' label</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Reg 411.3.1.2 — Main bonding requirement</li>
                  <li>Reg 415.2 — Supplementary bonding</li>
                  <li>Table 54.8 — Bonding conductor sizes</li>
                  <li>Reg 544.2.3 — Supplementary conductor sizing</li>
                  <li>Section 701 — Bathrooms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earthing Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-6">
              Next: Surge Protection Devices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section4_5;
