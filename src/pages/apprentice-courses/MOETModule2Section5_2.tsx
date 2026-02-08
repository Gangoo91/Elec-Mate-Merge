import { ArrowLeft, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Selection and Use of Hand Tools - MOET Module 2 Section 5.2";
const DESCRIPTION = "Comprehensive guide to selecting and using hand tools for electrical maintenance work: insulated tools, cable preparation, crimping, tightening, measurement and safe working practices to BS 7671 and GS38.";

const quickCheckQuestions = [
  {
    id: "insulated-tools",
    question: "What standard must insulated hand tools comply with for live working or working near live parts?",
    options: [
      "BS 7671 only",
      "BS EN 60900 — rated to 1,000 V AC / 1,500 V DC and individually tested",
      "Any tool with a rubber handle is acceptable",
      "There is no specific standard for insulated tools"
    ],
    correctIndex: 1,
    explanation: "Insulated hand tools for electrical work must comply with BS EN 60900 (IEC 60900). Each tool is individually tested to withstand 10,000 V AC for a specified period and is rated for use at 1,000 V AC / 1,500 V DC. The tools are marked with the double-triangle 1000 V symbol. Ordinary rubber or plastic handles do NOT provide rated insulation protection — only purpose-made VDE-rated tools should be used when there is any risk of contact with live parts."
  },
  {
    id: "cable-stripping",
    question: "When stripping cable insulation, why should you use a proper cable stripping tool rather than a knife?",
    options: [
      "A knife is faster but equally safe",
      "A stripping tool prevents nicking or scoring the conductor, which would reduce its cross-sectional area and create a weak point prone to overheating or breakage",
      "There is no difference — both methods are equally acceptable",
      "A knife should always be used for stripping armoured cable"
    ],
    correctIndex: 1,
    explanation: "Cable stripping tools are designed to cut through the insulation to a precise depth without damaging the conductor beneath. A knife or blade can easily nick the conductor, reducing its effective cross-sectional area and creating a stress point. Even a small nick can significantly weaken a fine-stranded conductor, and on single-core cables a scored conductor may break during installation or in service. For armoured cables, a proper SWA stripping tool or rotary cutter should be used — never a knife."
  },
  {
    id: "torque-screwdriver",
    question: "Why are torque-controlled screwdrivers and torque wrenches important for electrical connections?",
    options: [
      "They make the work faster",
      "They ensure terminals are tightened to the manufacturer's specified torque, preventing both loose connections (high resistance, overheating) and over-tightened connections (damaged threads, cracked terminals)",
      "They are only required for aluminium conductors",
      "They are a recommendation but not required by BS 7671"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 526.1 requires that connections be mechanically sound and electrically reliable. Manufacturers specify torque values for their terminals, and both under-tightening and over-tightening cause problems. Under-tightening leads to high-resistance connections that overheat and may cause fires. Over-tightening can crack terminal housings, strip threads, damage conductors, or deform terminal components. Torque screwdrivers and wrenches ensure consistent, correct tightening to the specified value."
  },
  {
    id: "crimp-tool",
    question: "What is the consequence of using the wrong size crimp die or an unratcheted crimping tool?",
    options: [
      "The crimp will be slightly looser but still functional",
      "An incorrect or incomplete crimp creates a high-resistance joint that may overheat, or a mechanically weak joint that may pull apart under load or vibration",
      "There is no consequence as long as the crimp looks secure",
      "The tool will break if the wrong die is used"
    ],
    correctIndex: 1,
    explanation: "A proper crimp must compress the ferrule or lug sufficiently to form a gas-tight connection with the conductor strands. Using the wrong size die results in either an over-crimped connection (which may sever strands) or an under-crimped connection (which has high resistance and may pull apart). Ratcheted crimping tools ensure the crimp cycle is completed fully — an unratcheted tool allows the operator to release before the crimp is complete. For safety-critical connections, only manufacturer-approved tools and matching lugs should be used."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The double-triangle symbol marked '1000V' on a hand tool indicates:",
    options: [
      "The tool was manufactured in the year 1000",
      "The tool complies with BS EN 60900 and is rated for use on circuits up to 1,000 V AC / 1,500 V DC",
      "The tool can withstand an impact of 1,000 newtons",
      "The tool has been painted with insulating paint"
    ],
    correctAnswer: 1,
    explanation: "The double-triangle 1000V symbol is the internationally recognised marking for insulated tools complying with BS EN 60900 (IEC 60900). These tools have been individually tested at 10,000 V AC and are rated for safe use at up to 1,000 V AC or 1,500 V DC. The insulation is integral to the tool — not simply a coating — and must be inspected before each use for damage, cracks or contamination."
  },
  {
    id: 2,
    question: "HSE Guidance Note GS38 recommends that test probes used by electricians should have:",
    options: [
      "Long exposed metal tips for deep access into terminals",
      "Finger barriers (guards), spring-loaded retractable tips exposing no more than 2-4 mm of metal, and fused test leads",
      "No specific requirements — any multimeter probes are acceptable",
      "Probes made entirely of plastic with no metal contact"
    ],
    correctAnswer: 1,
    explanation: "GS38 specifies that test probes should have finger guards to prevent accidental contact with live parts, and spring-loaded retractable tips with a maximum of 2-4 mm of exposed metal to minimise the risk of short-circuits across closely spaced terminals. Test leads should incorporate fuses (typically 500 mA) to limit energy in the event of a short-circuit. These recommendations apply to all voltage indicating devices and test instruments used on or near live electrical systems."
  },
  {
    id: 3,
    question: "A side-cutting plier is used in electrical work primarily for:",
    options: [
      "Tightening terminal screws",
      "Cutting cables and conductors cleanly, and stripping insulation from small cables when cable strippers are not available",
      "Measuring cable diameter",
      "Bending conduit"
    ],
    correctAnswer: 1,
    explanation: "Side-cutting pliers (side cutters or diagonal cutters) are one of the most frequently used hand tools in electrical work. They provide a clean, square cut through copper conductors up to approximately 4 mm² and are also used for trimming cable ties and cutting thin wire. VDE-rated side cutters should always be used for electrical work. They should not be used to cut hardened steel (such as SWA) as this will damage the cutting edges."
  },
  {
    id: 4,
    question: "When using a junior hacksaw to cut conduit, the blade teeth should point:",
    options: [
      "Towards the handle (cutting on the pull stroke)",
      "Away from the handle (cutting on the push stroke), with the conduit held firmly in a vice and the cut made squarely",
      "In either direction — it makes no difference",
      "Upwards"
    ],
    correctAnswer: 1,
    explanation: "Hacksaw blades are designed to cut on the push (forward) stroke, so the teeth should point away from the handle. When cutting conduit, the tube should be held firmly in a pipe vice or conduit vice (never held by hand), and the cut should be made squarely using steady, even strokes. After cutting, the internal and external burrs must be removed with a file or deburring tool to prevent damage to cable insulation when cables are drawn through."
  },
  {
    id: 5,
    question: "A cable stripping tool set to the wrong depth may:",
    options: [
      "Only affect the appearance of the installation",
      "Nick or score the conductor, reducing its effective cross-sectional area and creating a potential hot spot or point of mechanical failure",
      "Cause the insulation to change colour",
      "Have no effect on the cable"
    ],
    correctAnswer: 1,
    explanation: "If the stripping depth is set too deep, the blade will cut into the conductor itself. Even a shallow nick reduces the effective cross-sectional area of the conductor at that point, increasing resistance and creating a localised hot spot under load. On fine-stranded flexible cables, nicked strands may break during installation, reducing the conductor area further. Always adjust the stripping tool for the specific cable size and test on a scrap piece before stripping the live cable."
  },
  {
    id: 6,
    question: "A wiring inspection mirror is used for:",
    options: [
      "Checking your appearance before client meetings",
      "Inspecting connections and wiring in confined spaces, behind consumer units, inside distribution boards and other areas where direct line of sight is obstructed",
      "Reflecting light to illuminate dark areas",
      "Checking for voltage presence"
    ],
    correctAnswer: 1,
    explanation: "An inspection mirror (typically a small mirror on an extendable telescopic handle) allows the electrician to view connections, wiring and components in areas that cannot be directly seen — behind boards, inside enclosures, above false ceilings, etc. During periodic inspection and testing, the mirror is essential for verifying the condition of connections, checking for signs of overheating (discolouration), verifying conductor identification, and confirming that all conductors are correctly terminated."
  },
  {
    id: 7,
    question: "The correct tool for cutting steel wire armour (SWA) on an armoured cable is:",
    options: [
      "Standard side-cutting pliers",
      "An SWA stripping tool or rotary cable cutter designed for armoured cable, which cuts through the armour wires without damaging the inner insulation",
      "A wood chisel and hammer",
      "Tin snips"
    ],
    correctAnswer: 1,
    explanation: "SWA cable requires specialist stripping tools. An SWA stripping tool or rotary cable cutter is designed to cut through the steel armour wires cleanly without penetrating the inner bedding and insulation layers. The process typically involves scoring the outer sheath, cutting the armour wires, and then stripping the inner insulation. Using inappropriate tools (pliers, knives, hacksaws) risks damaging the inner insulation, injuring the operator (steel armour wires are sprung), or producing an uneven cut that is difficult to terminate correctly."
  },
  {
    id: 8,
    question: "When choosing a screwdriver for electrical terminal work, the most important consideration is:",
    options: [
      "The colour of the handle",
      "The correct tip size and type (flat, Pozi, Phillips) to match the terminal screw precisely, plus VDE rating if there is any risk of contact with live parts",
      "The length of the shaft — longer is always better",
      "The screwdriver must be magnetic"
    ],
    correctAnswer: 1,
    explanation: "Using the correct tip size and type prevents cam-out (slipping), which damages both the screw head and the terminal housing. A damaged screw may not be tightened to the correct torque, and a damaged terminal housing may compromise the IP rating or mechanical integrity of the enclosure. For any work where contact with live parts is possible, VDE-rated insulated screwdrivers (BS EN 60900) must be used. The screwdriver tip must fit the screw precisely — a too-small tip will cam out, and a too-large tip may not seat properly."
  },
  {
    id: 9,
    question: "A fish tape (draw tape) is used for:",
    options: [
      "Measuring cable lengths",
      "Drawing cables through conduit, trunking and other enclosed cable routes where the cable cannot simply be pushed through",
      "Testing cable insulation",
      "Cutting cable to length"
    ],
    correctAnswer: 1,
    explanation: "A fish tape (also called draw tape or draw wire) is a flexible steel, fibreglass or nylon tape that is pushed or fed through a conduit, trunking or void. Cables are attached to the end and then drawn back through the route. Steel fish tapes should never be used near live circuits (risk of accidental contact). Fibreglass rods are preferred for installations where live circuits may be present. Cable lubricant should be used for long draws to reduce friction and prevent insulation damage."
  },
  {
    id: 10,
    question: "Before using any hand tool, a maintenance technician should:",
    options: [
      "Check only that the tool is the correct type",
      "Visually inspect the tool for damage (cracked handles, worn insulation, damaged cutting edges, loose heads), check that VDE-rated tools show no insulation breaches, and confirm the tool is suitable for the task",
      "No inspection is necessary if the tool was used yesterday",
      "Only check the tool if it is brand new"
    ],
    correctAnswer: 1,
    explanation: "Pre-use inspection of hand tools is a fundamental safety practice. Damaged insulation on VDE-rated tools can expose the operator to electric shock. Cracked or loose handles can cause loss of control. Worn cutting edges require excessive force, increasing the risk of slippage and injury. A mushroomed chisel head can shatter on impact, sending metal fragments into the eyes. Tool inspection takes only moments and should be carried out before every use — not just occasionally."
  },
  {
    id: 11,
    question: "Bootlace ferrules are used when terminating fine-stranded flexible cables because:",
    options: [
      "They improve the appearance of the connection",
      "They consolidate the individual strands into a solid cylindrical end, preventing strand escape, ensuring all strands make contact in the terminal, and preventing strand damage from screw pressure",
      "They are required by law for all cable terminations",
      "They increase the current-carrying capacity of the cable"
    ],
    correctAnswer: 1,
    explanation: "Fine-stranded flexible cables can have individual strands escape from screw terminals, potentially bridging to adjacent terminals and causing short-circuits. Screw pressure can also sever individual strands, reducing the effective conductor area. A bootlace ferrule (crimped using the correct tool and die) compresses all strands into a solid, uniform cylindrical end that terminates reliably in screw, cage clamp and spring terminals. They are considered best practice for all fine-stranded terminations."
  },
  {
    id: 12,
    question: "A spirit level is used in electrical installation work for:",
    options: [
      "Checking voltage levels",
      "Ensuring that consumer units, distribution boards, socket outlets, switches, trunking runs and conduit are installed level and plumb for a professional finish and correct operation",
      "Measuring cable lengths",
      "Testing earth continuity"
    ],
    correctAnswer: 1,
    explanation: "A spirit level ensures that enclosures, accessories and containment systems are installed level (horizontal) and plumb (vertical). This is not merely cosmetic — a consumer unit or distribution board that is not level may have doors that do not close correctly, breakers that are difficult to operate, and an unprofessional appearance. Trunking and conduit runs that are not level or plumb look poor and may cause issues with cable management. A torpedo level (short spirit level) fits into tight spaces."
  }
];

const faqs = [
  {
    question: "How often should VDE-insulated tools be replaced?",
    answer: "VDE-insulated tools do not have a fixed replacement date, but they must be visually inspected before every use and withdrawn from service immediately if the insulation shows any signs of damage — cracks, cuts, abrasion wear-through, contamination with oils or solvents, or exposure to heat. Many employers implement an annual formal inspection regime where tools are closely examined and any with compromised insulation are discarded. The insulation on VDE tools is not repairable — damaged tools must be replaced, not repaired."
  },
  {
    question: "Can I use standard household tools for electrical work?",
    answer: "Standard household tools should not be used for electrical maintenance work, even on isolated circuits. Electrician's tools are designed for the specific demands of electrical work — VDE-insulated handles, correct tip profiles for electrical terminals, appropriate cutting capacities for copper conductors, and ergonomic designs for repetitive use. Household tools may have inadequate insulation, incorrect tip sizes that damage terminals, and materials that are not suited to cutting copper. Using the right tool for the job is a fundamental safety and quality principle."
  },
  {
    question: "What is the difference between Phillips and Pozidriv screwdrivers?",
    answer: "Phillips (PH) and Pozidriv (PZ) are similar but not interchangeable. Phillips tips have a simple cross pattern, while Pozidriv tips have an additional set of smaller cross lines at 45 degrees to the main cross. Using a Phillips driver in a Pozidriv screw (or vice versa) will result in poor engagement, cam-out, and damage to the screw head. Most modern electrical accessories and consumer units in the UK use Pozidriv screws (PZ1 or PZ2). Always identify the screw type before selecting the driver."
  },
  {
    question: "Why do electricians need multiple sizes of the same tool type?",
    answer: "Different cable sizes, screw sizes and component types require matching tool sizes. Using a flat screwdriver that is too wide for a terminal screw risks short-circuiting adjacent terminals. Using one that is too narrow damages the screw slot and prevents proper torque transfer. Similarly, cable strippers, crimping tools and cutting tools must match the cable or component size. A professional electrician's tool kit typically includes multiple sizes of screwdrivers (PZ1, PZ2, flat 3 mm, 5.5 mm), strippers for different cable sizes, and a range of crimp dies."
  },
  {
    question: "How should I maintain my hand tools?",
    answer: "Hand tools should be kept clean, dry and stored in a suitable tool bag or case that protects cutting edges and insulated surfaces. After use, wipe tools clean of debris, moisture and any chemicals. Cutting tools should be kept sharp — dull cutters require excessive force and produce poor cuts. Plier joints should be lightly oiled periodically. VDE-insulated tools should never be stored loose where they can be damaged by other tools. Replace any tool that is damaged, worn or no longer fit for purpose — never attempt to repair VDE insulation."
  }
];

const MOETModule2Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Wrench className="h-4 w-4" />
            <span>Module 2.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Selection and Use of Hand Tools
          </h1>
          <p className="text-white/80">
            Essential hand tools, safe selection and proper techniques for electrical maintenance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>VDE tools:</strong> BS EN 60900 rated to 1,000 V AC — essential for electrical work</li>
              <li className="pl-1"><strong>Cable prep:</strong> Strippers, SWA cutters, crimpers — right tool for each cable type</li>
              <li className="pl-1"><strong>Torque:</strong> Correct terminal tightening prevents fires and failures</li>
              <li className="pl-1"><strong>Inspection:</strong> Check every tool before every use</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safety:</strong> Correct tools prevent electric shock and injury</li>
              <li className="pl-1"><strong>Quality:</strong> Proper tools produce reliable, lasting connections</li>
              <li className="pl-1"><strong>Efficiency:</strong> Right tool = faster, better work</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to safe working practices and engineering skills KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the essential hand tools in an electrician's toolkit and their correct applications",
              "Understand BS EN 60900 requirements for VDE-insulated tools and when they must be used",
              "Select the correct cable stripping, cutting and preparation tools for different cable types",
              "Apply correct crimping techniques using ratcheted tools and appropriate dies",
              "Use torque-controlled screwdrivers and wrenches for reliable electrical connections",
              "Implement pre-use tool inspection as a fundamental safety practice"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            VDE-Insulated Tools and Safety Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most fundamental requirement for any hand tool used in electrical work is appropriate
              insulation. When there is any possibility of contact with live conductors or terminals —
              even on circuits that have been isolated — VDE-rated insulated tools complying with
              BS EN 60900 (IEC 60900) must be used. This is not optional; it is a critical safety
              requirement that protects the electrician from electric shock.
            </p>
            <p>
              BS EN 60900 insulated tools are individually tested at 10,000 V AC during manufacture
              and are rated for working use at up to 1,000 V AC or 1,500 V DC. The insulation is
              not simply a coating or dip — it is a multi-layer system that is bonded to the tool
              and cannot be easily removed. Each tool bears the double-triangle symbol with "1000V"
              to indicate compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential VDE Tool Kit</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Tool</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Sizes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat screwdrivers</td>
                      <td className="border border-white/10 px-3 py-2">3.0, 4.0, 5.5 mm</td>
                      <td className="border border-white/10 px-3 py-2">Terminal screws, switchgear</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pozidriv screwdrivers</td>
                      <td className="border border-white/10 px-3 py-2">PZ1, PZ2</td>
                      <td className="border border-white/10 px-3 py-2">Accessory face plates, MCB screws</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Side cutters</td>
                      <td className="border border-white/10 px-3 py-2">160 mm, 180 mm</td>
                      <td className="border border-white/10 px-3 py-2">Cutting cables up to 4 mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Long-nose pliers</td>
                      <td className="border border-white/10 px-3 py-2">160 mm, 200 mm</td>
                      <td className="border border-white/10 px-3 py-2">Forming conductor loops, gripping</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combination pliers</td>
                      <td className="border border-white/10 px-3 py-2">180 mm, 200 mm</td>
                      <td className="border border-white/10 px-3 py-2">Gripping, twisting, light cutting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable knife</td>
                      <td className="border border-white/10 px-3 py-2">Hooked blade</td>
                      <td className="border border-white/10 px-3 py-2">Stripping cable outer sheaths</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Critical Safety Point</p>
              <p className="text-sm text-white">
                Never assume a circuit is dead — always verify with a proven voltage indicator (GS38
                compliant) before and after isolation. Even with verified isolation, using VDE-insulated
                tools provides a critical second layer of protection against unexpected re-energisation,
                induced voltages, or incorrect circuit identification. Defence in depth is the principle:
                isolation is the primary protection, insulated tools are the backup.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Preparation Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Preparing cables for termination is one of the most frequent tasks in electrical maintenance.
              The quality of the cable preparation directly affects the quality and reliability of the
              connection. Using the correct tool for each cable type ensures clean, damage-free preparation
              that results in sound terminations.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Strippers</h3>
                <p className="text-sm text-white">
                  Automatic cable strippers grip the cable, cut through the insulation to a preset depth,
                  and pull the insulation off in one action. They are adjustable for different cable sizes
                  (typically 0.5 mm² to 6 mm²) and produce consistent, clean strips without conductor
                  damage. For flat twin-and-earth cable, a jokari-style stripper removes the outer sheath
                  without damaging the inner insulation. Always adjust the cutting depth on a scrap piece
                  of cable before working on the actual installation.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Stripping Tools</h3>
                <p className="text-sm text-white">
                  Steel wire armoured cable requires a specialist approach. An SWA stripping tool typically
                  consists of a rotary cutter that scores the outer PVC sheath without cutting the armour
                  wires, allowing the sheath to be removed. The armour wires are then cut individually
                  with SWA cutters or heavy-duty side cutters, bent back over the gland, and the inner
                  bedding sheath is stripped to expose the insulated cores. This is a multi-step process
                  that requires practice to master.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Knives</h3>
                <p className="text-sm text-white">
                  A VDE-rated cable knife with a hooked blade is used for stripping the outer sheath of
                  larger cables and for general cable preparation. The hooked blade prevents the knife from
                  slipping off the cable and cutting the electrician. When using a cable knife, always cut
                  away from the body, keep fingers clear of the blade path, and use a controlled, shallow
                  cutting depth to avoid damaging inner insulation layers.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> For fine-stranded flexible cables, always fit a bootlace
              ferrule after stripping. This consolidates the strands, prevents them from splaying, and
              ensures all strands make proper contact in the terminal. Use the correct ferrule size and
              a proper ratcheted crimping tool.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Crimping and Termination Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reliable electrical connections are the foundation of a safe installation. Crimped
              connections, when made correctly with the right tools, provide gas-tight, low-resistance
              joints that are mechanically strong and electrically sound. The crimping tool must match
              the crimp type (bootlace ferrule, ring terminal, pin terminal, butt connector) and the
              conductor size.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crimping Tool Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Tool Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Feature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bootlace ferrule crimper</td>
                      <td className="border border-white/10 px-3 py-2">Fine-stranded flexible cables</td>
                      <td className="border border-white/10 px-3 py-2">Self-adjusting or sized dies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ratcheted crimp tool</td>
                      <td className="border border-white/10 px-3 py-2">Insulated terminals (ring, fork, butt)</td>
                      <td className="border border-white/10 px-3 py-2">Ratchet ensures full crimp cycle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hydraulic crimper</td>
                      <td className="border border-white/10 px-3 py-2">Large cable lugs (25 mm²+)</td>
                      <td className="border border-white/10 px-3 py-2">High force for large conductors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Coaxial crimp tool</td>
                      <td className="border border-white/10 px-3 py-2">BNC, F-type connectors</td>
                      <td className="border border-white/10 px-3 py-2">Specific dies for connector type</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              The ratchet mechanism on a quality crimping tool is a critical safety feature. It prevents
              the handles from opening until the crimp cycle is fully complete, ensuring that every crimp
              receives the correct amount of compression. Without a ratchet, the operator may release
              the handles prematurely, resulting in an under-crimped connection that appears secure but
              has high resistance and low mechanical strength.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Crimping Errors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Wrong die size — over-compression severs strands; under-compression gives poor contact</li>
                <li className="pl-1">Conductor not fully inserted into the ferrule or terminal barrel</li>
                <li className="pl-1">Insulation trapped in the crimp barrel — prevents conductor contact</li>
                <li className="pl-1">Using pliers instead of a crimping tool — never acceptable</li>
                <li className="pl-1">Mixing manufacturers — crimp tool and terminals should be a matched system</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Torque Tools and Connection Integrity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 526.1 requires that every connection shall be durable, provide adequate
              current-carrying capacity, and provide adequate mechanical strength. Achieving this
              consistently requires tightening terminals to the manufacturer's specified torque using
              calibrated torque-controlled tools.
            </p>
            <p>
              Loose connections are one of the most common causes of electrical fires. A connection
              that is even slightly loose develops increased resistance at the contact point. This
              resistance generates heat, which causes further loosening through thermal cycling (expansion
              and contraction), which increases resistance further — a positive feedback loop that
              eventually leads to arcing, melting, and fire.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Torque Screwdrivers</h3>
                <p className="text-sm text-white">
                  Available as preset (fixed torque) or adjustable types. The tool clicks or slips when the
                  set torque is reached, preventing over-tightening. Common torque values for electrical
                  terminals range from 0.4 Nm for small lighting terminals to 2.5 Nm for 32 A MCB
                  terminals, up to 50 Nm or more for large busbar connections. Always refer to the
                  manufacturer's data sheet for the specific torque value — it varies between manufacturers
                  and product ranges.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Torque Wrenches</h3>
                <p className="text-sm text-white">
                  Used for larger connections — busbar bolts, cable gland locknuts, and large terminal
                  connections. A click-type torque wrench gives an audible and tactile indication when the
                  set torque is reached. Torque wrenches must be calibrated regularly (typically annually)
                  and stored correctly (returned to minimum setting after use to relieve the spring).
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance context:</strong> During periodic inspection and testing, thermal imaging
              of distribution boards under load is an excellent way to identify connections that have
              loosened over time. Hot spots visible on thermal images typically indicate high-resistance
              connections that need to be re-torqued. Always record thermal images as part of the
              inspection report.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            General-Purpose and Specialist Hand Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond the core electrical tools, a maintenance technician needs a range of general-purpose
              and specialist hand tools for the diverse tasks encountered in maintenance and installation
              work. Selecting the right tool for each task is not just about efficiency — it is about
              safety and quality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Essential Tools</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Tool</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Junior hacksaw</td>
                      <td className="border border-white/10 px-3 py-2">Cutting conduit, mini-trunking, small sections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Half-round file</td>
                      <td className="border border-white/10 px-3 py-2">Deburring conduit ends, enlarging knock-outs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spirit level (torpedo)</td>
                      <td className="border border-white/10 px-3 py-2">Ensuring enclosures and containment are level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tape measure (5 m)</td>
                      <td className="border border-white/10 px-3 py-2">Measuring cable routes, accessory positions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inspection mirror</td>
                      <td className="border border-white/10 px-3 py-2">Viewing concealed connections and wiring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fish tape / draw rods</td>
                      <td className="border border-white/10 px-3 py-2">Drawing cables through conduit and voids</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adjustable spanner</td>
                      <td className="border border-white/10 px-3 py-2">Cable glands, conduit fittings, locknuts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Allen keys (hex keys)</td>
                      <td className="border border-white/10 px-3 py-2">Panel fixings, busbar connections, some terminals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Use Tool Inspection Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">VDE insulation — no cracks, cuts, abrasion, contamination or heat damage</li>
                <li className="pl-1">Handles — secure, not cracked or split, comfortable grip</li>
                <li className="pl-1">Cutting edges — sharp, not chipped or rolled</li>
                <li className="pl-1">Plier joints — smooth operation, no excessive play</li>
                <li className="pl-1">Screwdriver tips — not worn, rounded or damaged</li>
                <li className="pl-1">Torque tools — within calibration date, mechanism functioning correctly</li>
                <li className="pl-1">Markings — VDE symbol and rating still legible</li>
              </ul>
            </div>

            <p>
              Tool storage is an important consideration. A well-organised tool bag or case protects
              tools from damage during transport, keeps them clean and dry, and ensures the right tool
              can be found quickly when needed. Many electricians use a tool roll or modular pouch system
              that keeps VDE tools separate from general tools and prevents cutting edges from being
              damaged by contact with other tools.
            </p>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">Core VDE Tool Kit</p>
                <ul className="space-y-0.5">
                  <li>Flat screwdrivers — 3.0, 4.0, 5.5 mm</li>
                  <li>Pozidriv — PZ1, PZ2</li>
                  <li>Side cutters — 160/180 mm</li>
                  <li>Long-nose pliers — 160/200 mm</li>
                  <li>Combination pliers — 180/200 mm</li>
                  <li>Cable knife — hooked blade</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 60900 — Insulated hand tools (1,000 V)</li>
                  <li>GS38 — Electrical test equipment safety</li>
                  <li>BS 7671 Reg 526.1 — Connection requirements</li>
                  <li>PUWER 1998 — Work equipment regulations</li>
                  <li>BS 7671 Chapter 13 — Fundamental principles</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Conductors and Insulation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5-3">
              Next: Selection and Use of Power Tools
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule2Section5_2;
