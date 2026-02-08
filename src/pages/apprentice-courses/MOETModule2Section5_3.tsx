import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Selection and Use of Power Tools - MOET Module 2 Section 5.3";
const DESCRIPTION = "Comprehensive guide to selecting and safely using power tools for electrical maintenance: drills, SDS rotary hammers, reciprocating saws, angle grinders, PAT requirements and PUWER compliance.";

const quickCheckQuestions = [
  {
    id: "110v-cte",
    question: "Why are 110 V CTE (centre-tapped earth) power tools specified for construction and maintenance sites?",
    options: [
      "They are cheaper than 230 V tools",
      "With a CTE transformer, the maximum voltage to earth is only 55 V — significantly reducing the risk of fatal electric shock if a fault occurs",
      "They run faster than 230 V tools",
      "110 V tools do not need PAT testing"
    ],
    correctIndex: 1,
    explanation: "A 110 V centre-tapped earth (CTE) transformer produces 110 V between the two output conductors, but because the centre tap of the secondary winding is connected to earth, the maximum voltage between either conductor and earth is only 55 V. This is below the threshold generally considered lethal, significantly reducing the risk of fatal electric shock if a tool develops a fault or the cable is damaged. This is why construction sites and many maintenance environments mandate 110 V CTE tools — it is a requirement of BS 7671 and HSE guidance."
  },
  {
    id: "sds-drill",
    question: "What is the primary advantage of an SDS (Slotted Drive System) rotary hammer drill over a standard hammer drill?",
    options: [
      "SDS drills are lighter",
      "SDS delivers a dedicated pneumatic hammering mechanism independent of the rotation, providing much greater impact energy for drilling into masonry, concrete and brick",
      "SDS drills are always cordless",
      "SDS is only for drilling into wood"
    ],
    correctIndex: 1,
    explanation: "SDS rotary hammer drills use a dedicated pneumatic hammering mechanism that delivers powerful impact blows independently of the drill rotation. Standard hammer drills use a ratcheting cam mechanism that relies on the rotation speed for impact energy. The SDS system delivers significantly more impact energy per blow, making it far more effective for drilling into hard masonry, concrete and brick. SDS-Plus is the standard size for most electrical work (up to ~25 mm holes); SDS-Max is used for larger holes and demolition work."
  },
  {
    id: "angle-grinder",
    question: "Before using an angle grinder, the most critical safety check is:",
    options: [
      "Checking the colour of the disc",
      "Ensuring the guard is fitted and correctly positioned, the disc is rated for the grinder's speed (RPM), the disc is not damaged or cracked, and the operator has appropriate PPE (eye protection, gloves, hearing protection)",
      "Checking that the grinder has a VDE rating",
      "Ensuring the grinder is cordless"
    ],
    correctIndex: 1,
    explanation: "Angle grinder safety is critical — the disc rotates at very high speed (up to 11,000 RPM on a 115 mm grinder) and a disc failure can propel fragments at lethal velocity. The guard must always be fitted and positioned to deflect debris away from the operator. The disc must be rated for at least the grinder's no-load RPM (never use a disc rated below the grinder speed). Damaged, cracked or worn discs must be replaced. PPE is essential: safety glasses/goggles, gloves, hearing protection, and where appropriate, a face shield."
  },
  {
    id: "pat-testing",
    question: "PAT (Portable Appliance Testing) of power tools on a construction or maintenance site involves:",
    options: [
      "Only a visual inspection",
      "A combination of user checks (before each use), formal visual inspection (weekly/monthly), and combined inspection and testing (3-monthly for construction site tools) including earth continuity, insulation resistance and functional tests",
      "Testing only when the tool is new",
      "PAT testing is not required for power tools"
    ],
    correctIndex: 1,
    explanation: "The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment specifies a tiered approach for construction/maintenance site tools. Users should check tools before each use (visual check for damage). Formal visual inspections should be conducted weekly or monthly. Combined inspection and testing (PAT) — including earth continuity (Class I tools), insulation resistance, and functional testing — should be conducted at least every 3 months for 110 V tools on construction sites (more frequently for 230 V tools). Records must be maintained."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "On a construction site, portable power tools should operate at:",
    options: [
      "230 V from a standard socket outlet",
      "110 V from a centre-tapped earth (CTE) transformer, giving a maximum of 55 V to earth",
      "12 V from a battery",
      "415 V three-phase"
    ],
    correctAnswer: 1,
    explanation: "Construction sites and many maintenance environments require portable power tools to operate at 110 V from a CTE transformer. The centre-tapped earth configuration ensures that the maximum voltage between either supply conductor and earth is only 55 V, significantly reducing the risk of fatal electric shock. This is a requirement of BS 7671 and is enforced on all reputable construction and maintenance sites."
  },
  {
    id: 2,
    question: "A Class II (double-insulated) power tool is identified by:",
    options: [
      "A green earth wire in the supply cable",
      "The double-square symbol on the rating plate, indicating reinforced insulation throughout — the tool has no earth connection",
      "A metal body with an earth terminal",
      "A three-pin plug with earth"
    ],
    correctAnswer: 1,
    explanation: "Class II (double-insulated) power tools rely on reinforced or double layers of insulation for protection against electric shock, rather than an earth connection. They are identified by the double-square symbol (a small square inside a larger square) on the rating plate. The supply cable has only live and neutral conductors (no earth), and the plug has no earth pin connection. During PAT testing, an insulation resistance test is performed but no earth continuity test (as there is no earth path)."
  },
  {
    id: 3,
    question: "An SDS-Plus drill bit differs from a standard drill chuck bit in that:",
    options: [
      "SDS bits are the same — they just have a different name",
      "SDS-Plus bits have specially shaped slots in the shank that allow the bit to move forward and back (for hammering) while being positively driven in rotation — they cannot slip in the chuck",
      "SDS bits can only be used in wood",
      "SDS bits are always shorter than standard bits"
    ],
    correctAnswer: 1,
    explanation: "The SDS (Slotted Drive System) shank has two sets of grooves: open grooves that allow the bit to slide axially in the chuck (enabling the pneumatic hammer blows to be transmitted to the bit), and closed grooves that transmit the rotational torque. This design means the bit is positively locked for rotation but free to move back and forth for hammering. SDS bits simply click into the chuck — no tightening is needed. SDS-Plus is the most common size; SDS-Max is larger for heavy-duty applications."
  },
  {
    id: 4,
    question: "When drilling into a wall for cable containment fixings, you should first:",
    options: [
      "Start drilling immediately — speed is important",
      "Check for concealed services using a cable/pipe detector (CAT scanner), verify the wall construction, select the correct drill bit and size, and mark the fixing positions accurately",
      "Only check for water pipes",
      "Drill a test hole first"
    ],
    correctAnswer: 1,
    explanation: "Before drilling into any wall, floor or ceiling, it is essential to scan for concealed services — electrical cables, gas pipes, water pipes and telecommunications cables. A cable avoidance tool (CAT scanner) detects both live cables and buried metallic services. The wall construction must be identified (solid masonry, stud partition, concrete) to select the correct drill type and bit. Fixing positions should be accurately marked and checked against safe zones defined in BS 7671 Appendix 15 and the installation's as-built drawings."
  },
  {
    id: 5,
    question: "A reciprocating saw is used in electrical maintenance primarily for:",
    options: [
      "Drilling holes in concrete",
      "Cutting containment (trunking, basket tray, conduit), making openings in plasterboard, cutting cable tray, and general cutting tasks where a hacksaw would be too slow",
      "Tightening screws",
      "Measuring cable lengths"
    ],
    correctAnswer: 1,
    explanation: "The reciprocating saw (recip saw) is a versatile cutting tool that uses interchangeable blades for different materials. In electrical maintenance, it is commonly used for cutting cable tray and trunking (metal-cutting blade), making openings in plasterboard for back boxes (fine-tooth blade), cutting conduit, and general demolition/adaptation work. The blade reciprocates (moves back and forth) allowing plunge cuts and cutting in confined spaces. Always select the correct blade for the material being cut."
  },
  {
    id: 6,
    question: "The maximum disc speed (RPM) rating marked on an angle grinder cutting disc must:",
    options: [
      "Be lower than the grinder's maximum speed",
      "Be equal to or greater than the grinder's no-load speed — a disc rated below the grinder speed may disintegrate at operating speed",
      "Match the grinder's voltage rating",
      "Not be considered — all discs fit all grinders"
    ],
    correctAnswer: 1,
    explanation: "Every abrasive disc is rated for a maximum safe operating speed in RPM. This rating must be equal to or greater than the grinder's no-load RPM. For example, a 115 mm angle grinder may have a no-load speed of 11,000 RPM — only discs rated at 11,000 RPM or higher may be used. A disc rated at a lower speed will be over-stressed and may disintegrate, sending fragments at very high velocity. This is one of the most serious safety risks with angle grinders. Always check the RPM rating before fitting any disc."
  },
  {
    id: 7,
    question: "Cordless (battery) power tools offer advantages for electrical maintenance work because:",
    options: [
      "They are always more powerful than corded tools",
      "They eliminate trailing cables (trip hazard), do not require a 110 V transformer, can be used where no power supply is available, and the battery voltage is inherently safer",
      "They never need maintenance",
      "They are lighter than all corded tools"
    ],
    correctAnswer: 1,
    explanation: "Cordless tools have become increasingly popular in electrical maintenance. They eliminate trailing supply cables (reducing trip hazards and the need for RCD protection), do not require a 110 V CTE transformer (simplifying site setup), and operate at battery voltages (typically 18-36 V DC) that are inherently safe against electric shock. Modern lithium-ion battery technology provides power comparable to corded tools for most tasks. However, the batteries must be charged, maintained and stored correctly, and the tools still require regular inspection."
  },
  {
    id: 8,
    question: "PUWER (Provision and Use of Work Equipment Regulations) 1998 requires that:",
    options: [
      "Only new power tools may be used",
      "All work equipment (including power tools) is suitable for its intended use, maintained in a safe condition, inspected at suitable intervals, and used only by trained and competent persons",
      "Power tools must be replaced every 12 months",
      "PUWER only applies to factory machinery"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 applies to all work equipment, including portable power tools. It requires employers to ensure equipment is suitable for its intended purpose, maintained in a safe condition, inspected at appropriate intervals, used only by persons who have received adequate training, and provided with appropriate guards and safety devices. PUWER also requires that equipment is used in accordance with the manufacturer's instructions and that records of maintenance and inspection are kept."
  },
  {
    id: 9,
    question: "When using a hole saw to cut a large hole in a metal distribution board enclosure:",
    options: [
      "Maximum speed and pressure should be used",
      "A pilot drill bit guides the hole saw, cutting fluid/lubricant should be used, speed should be moderate (high speed generates excessive heat), and the workpiece should be clamped or supported",
      "No pilot drill is needed",
      "Hole saws cannot be used on metal"
    ],
    correctAnswer: 1,
    explanation: "Hole saws for metal require a centre pilot drill to locate and guide the cut. Cutting speed should be moderate — too fast generates excessive heat that ruins the saw teeth and can harden the workpiece. Cutting fluid or lubricant (not water on electrical enclosures) reduces friction and extends tool life. The workpiece must be firmly clamped or supported to prevent it spinning when the hole saw breaks through. Swarf (metal cuttings) must be removed from the enclosure after cutting to prevent short-circuits."
  },
  {
    id: 10,
    question: "A cable avoidance tool (CAT scanner) should be used before drilling because:",
    options: [
      "It is only required by company policy, not by law",
      "Striking a concealed live cable can cause fatal electric shock, and striking a gas pipe can cause an explosion — detection before drilling prevents these potentially fatal incidents",
      "It makes the holes neater",
      "It is only needed in new buildings"
    ],
    correctAnswer: 1,
    explanation: "HSE statistics show that striking buried or concealed cables is a significant cause of electrical injuries and fatalities. A CAT scanner uses electromagnetic detection to locate live cables, and a signal generator (genny) can be used to trace and identify specific cables and metallic pipes. The combination of CAT and genny provides the best detection capability. HSE Guidance Note HSG47 'Avoiding danger from underground services' and GS6 'Avoidance of danger from overhead electrical lines' provide detailed guidance."
  },
  {
    id: 11,
    question: "The RCD protection requirement for 230 V portable equipment on construction sites is:",
    options: [
      "RCD protection is not required if the tool is double-insulated",
      "All 230 V portable equipment must be protected by a 30 mA RCD — but 110 V CTE is the preferred and standard supply for construction site power tools",
      "RCDs are only required for extension leads",
      "A 300 mA RCD is sufficient"
    ],
    correctAnswer: 1,
    explanation: "Where 230 V portable equipment is used on construction sites (which should be the exception, not the rule), it must be protected by a 30 mA RCD. However, the standard and strongly preferred supply for construction site power tools is 110 V CTE, which provides inherently safer operation. The 30 mA RCD for 230 V equipment is an additional protection measure, not a substitute for the inherent safety of 110 V CTE. BS 7671 Section 704 covers construction and demolition site installations."
  },
  {
    id: 12,
    question: "Before returning a power tool to service after repair, you should:",
    options: [
      "Simply plug it in and check it works",
      "Carry out a full PAT test (visual inspection, earth continuity for Class I, insulation resistance, and functional test), verify the repair was effective, and update the maintenance/PAT records",
      "Only check the plug wiring",
      "No testing is needed after repair by a competent person"
    ],
    correctAnswer: 1,
    explanation: "After any repair, a power tool must be fully inspected and tested before being returned to service. This includes a thorough visual inspection of the repair, earth continuity test (Class I tools), insulation resistance test, and a functional test to verify the tool operates correctly and all safety features (guards, dead-man switches, speed controls) work as intended. The PAT test label should be updated with the new test date, and maintenance records should document the repair and subsequent test results."
  }
];

const faqs = [
  {
    question: "Can I use 230 V power tools on a construction or maintenance site?",
    answer: "The standard requirement on construction and maintenance sites is 110 V CTE (centre-tapped earth) power tools supplied from a portable transformer. 230 V portable tools should only be used where 110 V alternatives are genuinely not available, and then only with 30 mA RCD protection. Many sites prohibit 230 V portable tools entirely. The inherent safety of 110 V CTE (maximum 55 V to earth) provides significantly better protection against electric shock than relying on RCD protection alone."
  },
  {
    question: "How often should power tools be PAT tested on a maintenance site?",
    answer: "The IET Code of Practice recommends formal combined inspection and testing (PAT) at least every 3 months for 110 V construction site tools, and more frequently (1-3 months) for 230 V equipment. User checks should be performed before every use (visual check for damage to the tool, cable and plug). Formal visual inspections (without electrical testing) should be conducted weekly or monthly depending on the environment and frequency of use. Higher-risk environments or tools in heavy use may warrant more frequent testing."
  },
  {
    question: "What PPE should I wear when using power tools?",
    answer: "The minimum PPE for most power tool operations includes safety glasses or goggles (to protect against flying debris), hearing protection (most power tools exceed 80 dB), and appropriate gloves (to reduce vibration exposure and protect against sharp edges — but loose gloves must never be used near rotating parts). For angle grinders, a full face shield, leather gloves and a dust mask (when cutting masonry) are recommended. Dust extraction should be used with any tool that generates significant dust. Always follow the manufacturer's PPE recommendations."
  },
  {
    question: "What is HAV (Hand-Arm Vibration) and why does it matter?",
    answer: "Hand-arm vibration (HAV) is vibration transmitted into the hands and arms from vibrating power tools (hammer drills, angle grinders, reciprocating saws). Prolonged exposure causes Hand-Arm Vibration Syndrome (HAVS), which includes vascular damage (vibration white finger), nerve damage (numbness, tingling), and musculoskeletal damage. The Control of Vibration at Work Regulations 2005 set exposure action values (2.5 m/s²) and exposure limit values (5 m/s²). Employers must assess vibration exposure, provide low-vibration tools where possible, limit exposure time, and provide health surveillance."
  },
  {
    question: "Are cordless tools safe to use in wet conditions?",
    answer: "While cordless tools operate at low voltages (typically 18-36 V DC) that are generally considered safe, they should not be used in wet or submerged conditions unless specifically rated for such use (IP rating). Water can damage the tool's internal components, cause short-circuits in the battery, and create corrosion that leads to future failures. If working in damp conditions is unavoidable, use tools with appropriate IP ratings and dry them thoroughly after use. Battery contacts must be kept clean and dry."
  }
];

const MOETModule2Section5_3 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 2.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Selection and Use of Power Tools
          </h1>
          <p className="text-white/80">
            Safe selection, operation and maintenance of power tools for electrical maintenance work
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>110 V CTE:</strong> Standard for site tools — 55 V max to earth</li>
              <li className="pl-1"><strong>SDS drills:</strong> Pneumatic hammer for masonry and concrete</li>
              <li className="pl-1"><strong>Guards/PPE:</strong> Always fitted and worn — disc failure is lethal</li>
              <li className="pl-1"><strong>PAT:</strong> 3-monthly testing for construction site tools</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Daily use:</strong> Drills, grinders and saws are core maintenance tools</li>
              <li className="pl-1"><strong>Safety:</strong> PUWER compliance and risk assessment required</li>
              <li className="pl-1"><strong>Selection:</strong> Match the tool to the task and environment</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to safe working practices and tool use KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why 110 V CTE is the standard supply for construction and maintenance site power tools",
              "Select the correct drill type and bit for different materials (masonry, metal, wood, plasterboard)",
              "Identify the safety requirements for angle grinders including disc speed ratings and guard positioning",
              "Understand PAT testing requirements and inspection frequencies for power tools",
              "Apply PUWER regulations and risk assessment principles to power tool use",
              "Manage hand-arm vibration exposure when using power tools regularly"
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
            Power Supply Safety — 110 V CTE and Classification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electrical supply to portable power tools is the first and most important safety
              consideration. On construction and maintenance sites, the risk of cable damage, wet
              conditions and harsh environments makes the standard 230 V mains supply unacceptably
              dangerous for portable tool use. The solution mandated by BS 7671 and HSE guidance is
              the 110 V centre-tapped earth (CTE) system.
            </p>
            <p>
              A CTE transformer takes the 230 V mains supply and steps it down to 110 V on the
              secondary winding. Critically, the centre point of the secondary winding is connected
              to earth. This means that the maximum voltage between either output conductor and earth
              is only 55 V — well below the level generally considered capable of causing fatal
              electric shock under most conditions. Even if a fault develops in the tool or the
              cable is cut, the maximum shock voltage is limited to 55 V.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Tool Classes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Protection Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Earth</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class I</td>
                      <td className="border border-white/10 px-3 py-2">Basic insulation + earth</td>
                      <td className="border border-white/10 px-3 py-2">Yes — 3-core cable</td>
                      <td className="border border-white/10 px-3 py-2">Earth symbol</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class II</td>
                      <td className="border border-white/10 px-3 py-2">Double / reinforced insulation</td>
                      <td className="border border-white/10 px-3 py-2">No — 2-core cable</td>
                      <td className="border border-white/10 px-3 py-2">Double square</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class III</td>
                      <td className="border border-white/10 px-3 py-2">SELV (Safety Extra-Low Voltage)</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Diamond in rectangle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">110 V Identification</p>
              <p className="text-sm text-white">
                110 V CTE tools and equipment are identified by yellow plugs, sockets and cables.
                The plug format (BS 4343 / IEC 60309) is different from the standard UK 13 A
                domestic plug — it has three pins in a different configuration that physically
                prevents connection to a 230 V socket. Never modify plugs or use adaptors to
                connect 110 V tools to 230 V supplies or vice versa.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Drilling — Types, Bits and Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Drilling is the most frequent power tool operation in electrical maintenance — creating
              fixings for containment, accessories, enclosures and cable supports. Selecting the correct
              drill type and bit for the material is essential for efficiency, quality and safety.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Drill / Driver</h3>
                <p className="text-sm text-white">
                  A combination drill/driver with keyless chuck handles general-purpose drilling in wood,
                  metal and light masonry, plus screw-driving. Variable speed control and torque settings
                  allow the tool to be matched to the task. Cordless 18 V versions are the most common
                  choice for electrical maintenance, offering adequate power without trailing cables.
                  For metal drilling, use HSS (high-speed steel) bits at moderate speed with cutting
                  fluid. For wood, use lip-and-spur bits or flat (spade) bits.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SDS Rotary Hammer Drill</h3>
                <p className="text-sm text-white">
                  The SDS (Slotted Drive System) rotary hammer drill is the standard tool for drilling
                  into concrete, brick, block and stone. The dedicated pneumatic hammering mechanism
                  delivers powerful blows independently of the rotation, making it far more effective
                  than a standard hammer drill on hard materials. Most SDS drills have three modes:
                  drill only (for non-masonry), hammer drill (for masonry), and hammer only (for light
                  chiselling with flat or pointed chisels). SDS-Plus handles bits up to approximately
                  25 mm diameter.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Core Drill</h3>
                <p className="text-sm text-white">
                  For large-diameter holes through masonry walls (cable entry, conduit passage), a
                  diamond core drill is used. These produce clean, accurate holes from 25 mm upwards.
                  The diamond-tipped core bit rotates at relatively low speed and requires water cooling
                  (or dry-cut cores for smaller sizes). The drill must be mounted on a stand for
                  stability and the operator needs training in the safe setup and use of the equipment.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical safety point:</strong> Always scan for concealed services (cables, pipes)
              with a CAT scanner before drilling into any wall, floor or ceiling. Striking a live cable
              can be fatal. Check both sides of the wall where possible and refer to installation
              drawings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cutting Tools — Grinders, Saws and Nibblers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cutting metal containment (cable tray, trunking, conduit), making openings in enclosures,
              and adapting structures are common tasks requiring power cutting tools. Each tool has
              specific safety requirements that must be followed without exception.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Angle Grinder</h3>
                <p className="text-sm text-white">
                  Available in 115 mm and 230 mm disc sizes. Used for cutting metal (thin cutting
                  discs), grinding welds and burrs (grinding discs), and cutting masonry (diamond
                  cutting discs). The angle grinder is one of the most dangerous power tools — the
                  disc rotates at very high speed and a failure can be catastrophic. The guard must
                  always be fitted and positioned correctly. The disc RPM rating must equal or exceed
                  the grinder's no-load speed. Never use a cutting disc for grinding or vice versa.
                  Dead-man (paddle) switches are preferred — the tool stops when released.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Reciprocating Saw</h3>
                <p className="text-sm text-white">
                  A versatile cutting tool for cable tray, trunking, conduit, plasterboard and general
                  demolition. Interchangeable blades suit different materials — fine-tooth for metal,
                  coarse-tooth for wood and plasterboard. The orbital action setting should be reduced
                  for metal cutting (less aggressive) and increased for wood (faster cutting). The shoe
                  (base plate) should be held firmly against the workpiece to reduce vibration.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Nibbler / Jigsaw</h3>
                <p className="text-sm text-white">
                  For cutting openings in thin sheet metal (enclosure panels, trunking lids), a nibbler
                  removes a narrow strip of material producing clean, burr-free edges. A jigsaw with
                  a fine metal-cutting blade is an alternative for curved and straight cuts in sheet
                  material. Both tools produce less noise and vibration than an angle grinder and are
                  generally safer for enclosed work.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Angle Grinder Safety Rules</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Guard always fitted — positioned to deflect sparks/debris away from the operator</li>
                <li className="pl-1">Disc RPM rating must equal or exceed grinder no-load speed</li>
                <li className="pl-1">Inspect disc before fitting — reject any with cracks, chips or damage</li>
                <li className="pl-1">Use correct disc type — cutting discs for cutting, grinding discs for grinding</li>
                <li className="pl-1">PPE: safety goggles/face shield, leather gloves, hearing protection, dust mask</li>
                <li className="pl-1">Secure the workpiece — never cut while holding the item in your other hand</li>
                <li className="pl-1">Allow the disc to reach full speed before starting the cut</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            PAT Testing, PUWER and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power tools are subject to multiple regulatory requirements designed to ensure they remain
              safe throughout their working life. The two key frameworks are PAT (Portable Appliance
              Testing) under the Electricity at Work Regulations 1989 and PUWER (Provision and Use of
              Work Equipment Regulations) 1998.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PAT Testing Schedule for Power Tools</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Check Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">User check</td>
                      <td className="border border-white/10 px-3 py-2">Before every use</td>
                      <td className="border border-white/10 px-3 py-2">Visual check for damage to tool, cable, plug</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Formal visual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Weekly / monthly</td>
                      <td className="border border-white/10 px-3 py-2">Detailed visual inspection, recorded</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combined inspection and test</td>
                      <td className="border border-white/10 px-3 py-2">3-monthly (110 V site tools)</td>
                      <td className="border border-white/10 px-3 py-2">Visual + earth continuity + insulation resistance + functional</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">After repair</td>
                      <td className="border border-white/10 px-3 py-2">Every time</td>
                      <td className="border border-white/10 px-3 py-2">Full combined inspection and test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              PUWER requires that all work equipment is suitable for its intended use, maintained in a
              safe condition, inspected at suitable intervals, and used only by persons who have received
              adequate training. For power tools, this means employers must ensure tools are appropriate
              for the task, regularly inspected and maintained, fitted with appropriate guards and safety
              devices, and that operators have been trained in their safe use.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hand-Arm Vibration Management</p>
              <p className="text-sm text-white mb-2">
                The Control of Vibration at Work Regulations 2005 set daily exposure limits:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Exposure action value:</strong> 2.5 m/s² A(8) — employer must take action to reduce exposure</li>
                <li className="pl-1"><strong>Exposure limit value:</strong> 5 m/s² A(8) — must not be exceeded</li>
                <li className="pl-1"><strong>Mitigation:</strong> Use low-vibration tools, limit exposure time, rotate tasks, provide anti-vibration gloves, and implement health surveillance for regularly exposed workers</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record keeping:</strong> Maintain a register of all power tools including make, model,
              serial number, date of purchase, PAT test dates and results, repair history, and date of
              disposal. This provides evidence of compliance with PUWER and the Electricity at Work
              Regulations and is essential for defending any enforcement action.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cordless Tools and Battery Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cordless lithium-ion power tools have transformed electrical maintenance work. Modern
              18 V and 36 V platforms offer performance comparable to corded tools for most tasks,
              while eliminating the hazards of trailing cables, the need for 110 V transformers, and
              the restriction of working within cable reach of a power source.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Safety Essentials</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Charging:</strong> Use only the manufacturer's charger designed for the specific battery type. Never charge damaged, swollen or overheated batteries. Charge in a ventilated area away from flammable materials.</li>
                <li className="pl-1"><strong>Storage:</strong> Store batteries at room temperature (10-25°C), away from direct sunlight and heat sources. Remove batteries from tools during long-term storage. Store at 40-60% charge for long periods.</li>
                <li className="pl-1"><strong>Damage:</strong> Withdraw any battery that has been dropped, crushed, or shows physical damage (cracks, swelling, leaking). Damaged lithium-ion batteries pose a fire risk (thermal runaway).</li>
                <li className="pl-1"><strong>Transport:</strong> Protect battery terminals from short-circuit during transport. Use the manufacturer's protective caps or carry batteries in a dedicated case.</li>
                <li className="pl-1"><strong>Disposal:</strong> Lithium-ion batteries must be recycled through an approved scheme — never dispose of in general waste or by incineration.</li>
              </ul>
            </div>

            <p>
              The main limitation of cordless tools is battery capacity — heavy-use applications
              (continuous SDS drilling, angle grinding) drain batteries quickly. Having spare batteries
              and a charger on site is essential for productivity. Higher-capacity batteries (5.0 Ah,
              8.0 Ah) provide longer run times but are heavier. For sustained heavy-duty use (core
              drilling, continuous grinding), corded 110 V tools remain the better choice.
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
                <p className="font-medium text-white mb-1">Common Power Tools</p>
                <ul className="space-y-0.5">
                  <li>Drill/Driver — wood, metal, screwdriving</li>
                  <li>SDS Hammer Drill — masonry, concrete</li>
                  <li>Angle Grinder — cutting/grinding metal</li>
                  <li>Reciprocating Saw — containment, openings</li>
                  <li>Jigsaw/Nibbler — sheet metal, curves</li>
                  <li>Core Drill — large wall penetrations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>PUWER 1998 — Work equipment suitability</li>
                  <li>EAW 1989 — Electrical equipment safety</li>
                  <li>Vibration Regs 2005 — HAV exposure limits</li>
                  <li>BS 7671 Section 704 — Construction sites</li>
                  <li>IET CoP — PAT testing guidance</li>
                  <li>HSG47 — Underground services avoidance</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hand Tools
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5-4">
              Next: Test Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule2Section5_3;
