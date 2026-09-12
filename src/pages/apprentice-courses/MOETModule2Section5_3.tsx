/**
 * MOET · Module 2 · Section 5.3 · Subsection 3 — Selection and Use of Power
 * Tools
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge · "Electrical. Electrical maintenance tools, measurement, and
 *                test equipment application, operation, care and
 *                calibration requirements."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Selection and Use of Power Tools - MOET Module 2 Section 5.3';
const DESCRIPTION =
  'Comprehensive guide to selecting and safely using power tools for electrical maintenance: drills, SDS rotary hammers, reciprocating saws, angle grinders, PAT requirements and PUWER compliance.';

const quickCheckQuestions = [
  {
    id: '110v-cte',
    question:
      'Why are 110 V CTE (centre-tapped earth) power tools specified for construction and maintenance sites?',
    options: [
      'They run cooler than 230 V tools, so the motor lasts longer in heavy use',
      'They draw less current, allowing thinner and lighter supply cables on site',
      'The centre tap limits voltage to earth to 55 V, cutting shock risk on a fault',
      'They do not require RCD protection because the voltage is already reduced',
    ],
    correctIndex: 2,
    explanation:
      'A 110 V centre-tapped earth (CTE) transformer produces 110 V between the two output conductors, but because the centre tap of the secondary winding is connected to earth, the maximum voltage between either conductor and earth is only 55 V. This is below the threshold generally considered lethal, significantly reducing the risk of fatal electric shock if a tool develops a fault or the cable is damaged. This is why construction sites and many maintenance environments mandate 110 V CTE tools — it is a requirement of BS 7671 and HSE guidance.',
  },
  {
    id: 'sds-drill',
    question:
      'What is the primary advantage of an SDS (Slotted Drive System) rotary hammer drill over a standard hammer drill?',
    options: [
      'SDS bits are tightened with a chuck key, giving a more secure grip than keyless',
      'SDS drills spin at a much higher rotational speed than standard hammer drills',
      'SDS drills run from a battery only, removing the need for any transformer on site',
      'A pneumatic hammer independent of rotation gives far greater impact into masonry',
    ],
    correctIndex: 3,
    explanation:
      'SDS rotary hammer drills use a dedicated pneumatic hammering mechanism that delivers powerful impact blows independently of the drill rotation. Standard hammer drills use a ratcheting cam mechanism that relies on the rotation speed for impact energy. The SDS system delivers significantly more impact energy per blow, making it far more effective for drilling into hard masonry, concrete and brick. SDS-Plus is the standard size for most electrical work (up to ~25 mm holes); SDS-Max is used for larger holes and demolition work.',
  },
  {
    id: 'angle-grinder',
    question: 'Before using an angle grinder, the most critical safety check is:',
    options: [
      'That the guard is fitted, the disc is undamaged and RPM-rated, and PPE is worn',
      'Confirming the grinder takes the right disc diameter, whatever its speed rating',
      'Checking the supply lead reaches without an extension and the plug is undamaged',
      'Running the grinder for a full minute at no load to warm the motor before cutting',
    ],
    correctIndex: 0,
    explanation:
      "Angle grinder safety is critical — the disc rotates at very high speed (up to 11,000 RPM on a 115 mm grinder) and a disc failure can propel fragments at lethal velocity. The guard must always be fitted and positioned to deflect debris away from the operator. The disc must be rated for at least the grinder's no-load RPM (never use a disc rated below the grinder speed). Damaged, cracked or worn discs must be replaced. PPE is essential: safety glasses/goggles, gloves, hearing protection, and where appropriate, a face shield.",
  },
  {
    id: 'pat-testing',
    question:
      'PAT (Portable Appliance Testing) of power tools on a construction or maintenance site involves:',
    options: [
      'A single annual electrical test carried out by an external contractor only',
      'A one-off insulation resistance test performed when the tool is first purchased',
      'A visual check by the operator that replaces the need for any electrical testing',
      'User checks, formal visual inspection, and 3-monthly combined inspection and testing',
    ],
    correctIndex: 3,
    explanation:
      'The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment specifies a tiered approach for construction/maintenance site tools. Users should check tools before each use (visual check for damage). Formal visual inspections should be conducted weekly or monthly. Combined inspection and testing (PAT) — including earth continuity (Class I tools), insulation resistance, and functional testing — should be conducted at least every 3 months for 110 V tools on construction sites (more frequently for 230 V tools). Records must be maintained.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'On a construction site, portable power tools should operate at:',
    options: [
      '230 V single-phase taken direct from the nearest socket outlet',
      '110 V from a centre-tapped earth transformer, giving 55 V to earth',
      '400 V three-phase to provide enough power for heavy-duty tools',
      '12 V SELV from a battery pack for all corded site equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Construction sites and many maintenance environments require portable power tools to operate at 110 V from a CTE transformer. The centre-tapped earth configuration ensures that the maximum voltage between either supply conductor and earth is only 55 V, significantly reducing the risk of fatal electric shock. This is a requirement of BS 7671 and is enforced on all reputable construction and maintenance sites.',
  },
  {
    id: 2,
    question: 'A Class II (double-insulated) power tool is identified by:',
    options: [
      'A green-and-yellow earth symbol printed on the rating plate',
      'A three-core supply cable terminating in an earthed 13 A plug',
      'The double-square symbol, denoting reinforced insulation and no earth',
      'A diamond-in-rectangle symbol denoting SELV battery operation',
    ],
    correctAnswer: 2,
    explanation:
      'Class II (double-insulated) power tools rely on reinforced or double layers of insulation for protection against electric shock, rather than an earth connection. They are identified by the double-square symbol (a small square inside a larger square) on the rating plate. The supply cable has only live and neutral conductors (no earth), and the plug has no earth pin connection. During PAT testing, an insulation resistance test is performed but no earth continuity test (as there is no earth path).',
  },
  {
    id: 3,
    question: 'An SDS-Plus drill bit differs from a standard drill chuck bit in that:',
    options: [
      'It has a smooth round shank that grips through chuck pressure alone',
      'It is made from tungsten carbide so it can only be used in softwood',
      'It must be tightened firmly with a chuck key before every use',
      'Its slotted shank lets the bit move axially for hammering while driven in rotation',
    ],
    correctAnswer: 3,
    explanation:
      'The SDS (Slotted Drive System) shank has two sets of grooves: open grooves that allow the bit to slide axially in the chuck (enabling the pneumatic hammer blows to be transmitted to the bit), and closed grooves that transmit the rotational torque. This design means the bit is positively locked for rotation but free to move back and forth for hammering. SDS bits simply click into the chuck — no tightening is needed. SDS-Plus is the most common size; SDS-Max is larger for heavy-duty applications.',
  },
  {
    id: 4,
    question: 'When drilling into a wall for cable containment fixings, you should first:',
    options: [
      'Scan for concealed services, check the wall type, and mark the fixings accurately',
      'Drill a small pilot hole quickly to see whether you strike anything live',
      'Switch the tool to hammer mode regardless of the wall material being drilled',
      'Fit the largest bit available to make a single pass through the wall',
    ],
    correctAnswer: 0,
    explanation:
      "Before drilling into any wall, floor or ceiling, it is essential to scan for concealed services — electrical cables, gas pipes, water pipes and telecommunications cables. A cable avoidance tool (CAT scanner) detects both live cables and buried metallic services. The wall construction must be identified (solid masonry, stud partition, concrete) to select the correct drill type and bit. Fixing positions should be accurately marked and checked against safe zones defined in BS 7671 Appendix 15 and the installation's as-built drawings.",
  },
  {
    id: 5,
    question: 'A reciprocating saw is used in electrical maintenance primarily for:',
    options: [
      'Precision drilling of accurately positioned fixing holes in masonry',
      'Cutting containment and plasterboard openings where a hacksaw is too slow',
      'Grinding down welds and deburring cut metal edges on enclosures',
      'Stripping insulation from large-diameter cables before termination',
    ],
    correctAnswer: 1,
    explanation:
      'The reciprocating saw (recip saw) is a versatile cutting tool that uses interchangeable blades for different materials. In electrical maintenance, it is commonly used for cutting cable tray and trunking (metal-cutting blade), making openings in plasterboard for back boxes (fine-tooth blade), cutting conduit, and general demolition/adaptation work. The blade reciprocates (moves back and forth) allowing plunge cuts and cutting in confined spaces. Always select the correct blade for the material being cut.',
  },
  {
    id: 6,
    question: 'The maximum disc speed (RPM) rating marked on an angle grinder cutting disc must:',
    options: [
      "Be lower than the grinder's no-load speed so the disc is never over-driven",
      "Be exactly half the grinder's no-load speed for safe steady cutting",
      "Be equal to or greater than the grinder's no-load speed, or it may shatter",
      'Match the diameter of the disc in millimetres rather than the grinder speed',
    ],
    correctAnswer: 2,
    explanation:
      "Every abrasive disc is rated for a maximum safe operating speed in RPM. This rating must be equal to or greater than the grinder's no-load RPM. For example, a 115 mm angle grinder may have a no-load speed of 11,000 RPM — only discs rated at 11,000 RPM or higher may be used. A disc rated at a lower speed will be over-stressed and may disintegrate, sending fragments at very high velocity. This is one of the most serious safety risks with angle grinders. Always check the RPM rating before fitting any disc.",
  },
  {
    id: 7,
    question:
      'Cordless (battery) power tools offer advantages for electrical maintenance work because:',
    options: [
      'They never require any inspection because they have no supply cable',
      'They always deliver more power than equivalent corded 110 V tools',
      'They can be safely submerged in water during use without any IP rating',
      'They remove trailing cables and transformers and run at a safe battery voltage',
    ],
    correctAnswer: 3,
    explanation:
      'Cordless tools have become increasingly popular in electrical maintenance. They eliminate trailing supply cables (reducing trip hazards and the need for RCD protection), do not require a 110 V CTE transformer (simplifying site setup), and operate at battery voltages (typically 18-36 V DC) that are inherently safe against electric shock. Modern lithium-ion battery technology provides power comparable to corded tools for most tasks. However, the batteries must be charged, maintained and stored correctly, and the tools still require regular inspection.',
  },
  {
    id: 8,
    question: 'PUWER (Provision and Use of Work Equipment Regulations) 1998 requires that:',
    options: [
      'Work equipment is suitable, maintained, inspected and used by competent persons',
      'Only electrical work equipment is covered, not mechanical hand tools',
      'Work equipment is inspected solely by the Health and Safety Executive',
      'Tools may be used without training provided they carry a current PAT label',
    ],
    correctAnswer: 0,
    explanation:
      "PUWER 1998 applies to all work equipment, including portable power tools. It requires employers to ensure equipment is suitable for its intended purpose, maintained in a safe condition, inspected at appropriate intervals, used only by persons who have received adequate training, and provided with appropriate guards and safety devices. PUWER also requires that equipment is used in accordance with the manufacturer's instructions and that records of maintenance and inspection are kept.",
  },
  {
    id: 9,
    question: 'When using a hole saw to cut a large hole in a metal distribution board enclosure:',
    options: [
      'Run the saw at maximum speed with no pilot bit to cut through quickly',
      'Use the pilot bit to guide it, lubricate, run at moderate speed and clamp the work',
      'Hold the enclosure loosely in one hand so it can move freely while cutting',
      'Use water as the cutting lubricant directly on the energised enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'Hole saws for metal require a centre pilot drill to locate and guide the cut. Cutting speed should be moderate — too fast generates excessive heat that ruins the saw teeth and can harden the workpiece. Cutting fluid or lubricant (not water on electrical enclosures) reduces friction and extends tool life. The workpiece must be firmly clamped or supported to prevent it spinning when the hole saw breaks through. Swarf (metal cuttings) must be removed from the enclosure after cutting to prevent short-circuits.',
  },
  {
    id: 10,
    question: 'A cable avoidance tool (CAT scanner) should be used before drilling because:',
    options: [
      'It confirms the drill bit is the correct diameter for the fixing',
      'It measures the depth of the wall so the drill stop can be set',
      'Striking a hidden live cable can be fatal and a gas pipe can explode',
      'It records the drilling location for the as-built drawings automatically',
    ],
    correctAnswer: 2,
    explanation:
      "HSE statistics show that striking buried or concealed cables is a significant cause of electrical injuries and fatalities. A CAT scanner uses electromagnetic detection to locate live cables, and a signal generator (genny) can be used to trace and identify specific cables and metallic pipes. The combination of CAT and genny provides the best detection capability. HSE Guidance Note HSG47 'Avoiding danger from underground services' and GS6 'Avoidance of danger from overhead electrical lines' provide detailed guidance.",
  },
  {
    id: 11,
    question:
      'The RCD protection requirement for 230 V portable equipment on construction sites is:',
    options: [
      'No RCD is needed provided the tool is double-insulated Class II',
      'A 100 mA RCD is sufficient for all portable site equipment',
      'A 300 mA time-delayed RCD at the origin covers every tool',
      'A 30 mA RCD is required, though 110 V CTE remains the preferred site supply',
    ],
    correctAnswer: 3,
    explanation:
      'Where 230 V portable equipment is used on construction sites (which should be the exception, not the rule), it must be protected by a 30 mA RCD. However, the standard and strongly preferred supply for construction site power tools is 110 V CTE, which provides inherently safer operation. The 30 mA RCD for 230 V equipment is an additional protection measure, not a substitute for the inherent safety of 110 V CTE. BS 7671 Section 704 covers construction and demolition site installations.',
  },
  {
    id: 12,
    question: 'Before returning a power tool to service after repair, you should:',
    options: [
      'Carry out a full PAT test, confirm the repair worked, and update the records',
      'Return it straight away, as the repair itself proves it is safe to use',
      'Only carry out a functional test, skipping the electrical safety tests',
      'Wait until the next scheduled 3-monthly test before recording anything',
    ],
    correctAnswer: 0,
    explanation:
      'After any repair, a power tool must be fully inspected and tested before being returned to service. This includes a thorough visual inspection of the repair, earth continuity test (Class I tools), insulation resistance test, and a functional test to verify the tool operates correctly and all safety features (guards, dead-man switches, speed controls) work as intended. The PAT test label should be updated with the new test date, and maintenance records should document the repair and subsequent test results.',
  },
];

const faqs = [
  {
    question: 'Can I use 230 V power tools on a construction or maintenance site?',
    answer:
      'The standard requirement on construction and maintenance sites is 110 V CTE (centre-tapped earth) power tools supplied from a portable transformer. 230 V portable tools should only be used where 110 V alternatives are genuinely not available, and then only with 30 mA RCD protection. Many sites prohibit 230 V portable tools entirely. The inherent safety of 110 V CTE (maximum 55 V to earth) provides significantly better protection against electric shock than relying on RCD protection alone.',
  },
  {
    question: 'How often should power tools be PAT tested on a maintenance site?',
    answer:
      'The IET Code of Practice recommends formal combined inspection and testing (PAT) at least every 3 months for 110 V construction site tools, and more frequently (1-3 months) for 230 V equipment. User checks should be performed before every use (visual check for damage to the tool, cable and plug). Formal visual inspections (without electrical testing) should be conducted weekly or monthly depending on the environment and frequency of use. Higher-risk environments or tools in heavy use may warrant more frequent testing.',
  },
  {
    question: 'What PPE should I wear when using power tools?',
    answer:
      "The minimum PPE for most power tool operations includes safety glasses or goggles (to protect against flying debris), hearing protection (most power tools exceed 80 dB), and appropriate gloves (to reduce vibration exposure and protect against sharp edges — but loose gloves must never be used near rotating parts). For angle grinders, a full face shield, leather gloves and a dust mask (when cutting masonry) are recommended. Dust extraction should be used with any tool that generates significant dust. Always follow the manufacturer's PPE recommendations.",
  },
  {
    question: 'What is HAV (Hand-Arm Vibration) and why does it matter?',
    answer:
      'Hand-arm vibration (HAV) is vibration transmitted into the hands and arms from vibrating power tools (hammer drills, angle grinders, reciprocating saws). Prolonged exposure causes Hand-Arm Vibration Syndrome (HAVS), which includes vascular damage (vibration white finger), nerve damage (numbness, tingling), and musculoskeletal damage. The Control of Vibration at Work Regulations 2005 set exposure action values (2.5 m/s²) and exposure limit values (5 m/s²). Employers must assess vibration exposure, provide low-vibration tools where possible, limit exposure time, and provide health surveillance.',
  },
  {
    question: 'Are cordless tools safe to use in wet conditions?',
    answer:
      "While cordless tools operate at low voltages (typically 18-36 V DC) that are generally considered safe, they should not be used in wet or submerged conditions unless specifically rated for such use (IP rating). Water can damage the tool's internal components, cause short-circuits in the battery, and create corrosion that leads to future failures. If working in damp conditions is unavoidable, use tools with appropriate IP ratings and dry them thoroughly after use. Battery contacts must be kept clean and dry.",
  },
];

const MOETModule2Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.5 · Subsection 3"
        title="Selection and Use of Power Tools"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Safe selection, operation and maintenance of power tools for electrical maintenance work
            — the supply that keeps a shock survivable, and the checks that stop a disc or a drill
            from becoming the incident.
          </p>

          <TLDR
            points={[
              '110 V CTE: standard for site tools — 55 V max to earth',
              'SDS drills: pneumatic hammer for masonry and concrete',
              'Guards/PPE: always fitted and worn — disc failure is lethal',
              'PAT: 3-monthly testing for construction site tools',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'PUWER',

                gist: 'Work equipment must be suitable, maintained, inspected and used only by people who have been trained.',

                where: '1.4.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why 110 V CTE is the standard supply for construction and maintenance site power tools',
              'Select the correct drill type and bit for different materials (masonry, metal, wood, plasterboard)',
              'Identify the safety requirements for angle grinders including disc speed ratings and guard positioning',
              'Understand PAT testing requirements and inspection frequencies for power tools',
              'Apply PUWER regulations and risk assessment principles to power tool use',
              'Manage hand-arm vibration exposure when using power tools regularly',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Power supply safety — 110 V CTE and classification</ContentEyebrow>

          <ConceptBlock title="Power Supply Safety — 110 V CTE and Classification">
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
              to earth. This means that the maximum voltage between either output conductor and
              earth is only 55 V — well below the level generally considered capable of causing
              fatal electric shock under most conditions. Even if a fault develops in the tool or
              the cable is cut, the maximum shock voltage is limited to 55 V.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">Power tool classes</p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Protection method
                    </th>
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
                    <td className="border border-white/10 px-3 py-2">
                      Double / reinforced insulation
                    </td>
                    <td className="border border-white/10 px-3 py-2">No — 2-core cable</td>
                    <td className="border border-white/10 px-3 py-2">Double square</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Class III</td>
                    <td className="border border-white/10 px-3 py-2">
                      SELV (Safety Extra-Low Voltage)
                    </td>
                    <td className="border border-white/10 px-3 py-2">No</td>
                    <td className="border border-white/10 px-3 py-2">Diamond in rectangle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="110 V CTE identification">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Identification:</strong> 110 V CTE tools and equipment are identified by
              yellow plugs, sockets and cables. The plug format (BS 4343 / IEC 60309) is different
              from the standard UK 13 A domestic plug — it has three pins in a different
              configuration that physically prevents connection to a 230 V socket. Never modify
              plugs or use adaptors to connect 110 V tools to 230 V supplies or vice versa.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Drilling — types, bits and techniques</ContentEyebrow>

          <ConceptBlock
            title="Drilling — Types, Bits and Techniques"
            onSite="Always scan for concealed services (cables, pipes) with a CAT scanner before drilling into any wall, floor or ceiling. Striking a live cable can be fatal. Check both sides of the wall where possible and refer to installation drawings."
          >
            <p>
              Drilling is the most frequent power tool operation in electrical maintenance —
              creating fixings for containment, accessories, enclosures and cable supports.
              Selecting the correct drill type and bit for the material is essential for efficiency,
              quality and safety.
            </p>
            <p>
              <strong>Standard drill / driver.</strong> A combination drill/driver with keyless
              chuck handles general-purpose drilling in wood, metal and light masonry, plus
              screw-driving. Variable speed control and torque settings allow the tool to be matched
              to the task. Cordless 18 V versions are the most common choice for electrical
              maintenance, offering adequate power without trailing cables. For metal drilling, use
              HSS (high-speed steel) bits at moderate speed with cutting fluid. For wood, use
              lip-and-spur bits or flat (spade) bits.
            </p>
            <p>
              <strong>SDS rotary hammer drill.</strong> The SDS (Slotted Drive System) rotary hammer
              drill is the standard tool for drilling into concrete, brick, block and stone. The
              dedicated pneumatic hammering mechanism delivers powerful blows independently of the
              rotation, making it far more effective than a standard hammer drill on hard materials.
              Most SDS drills have three modes: drill only (for non-masonry), hammer drill (for
              masonry), and hammer only (for light chiselling with flat or pointed chisels).
              SDS-Plus handles bits up to approximately 25 mm diameter.
            </p>
            <p>
              <strong>Core drill.</strong> For large-diameter holes through masonry walls (cable
              entry, conduit passage), a diamond core drill is used. These produce clean, accurate
              holes from 25 mm upwards. The diamond-tipped core bit rotates at relatively low speed
              and requires water cooling (or dry-cut cores for smaller sizes). The drill must be
              mounted on a stand for stability and the operator needs training in the safe setup and
              use of the equipment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Cutting tools — grinders, saws and nibblers</ContentEyebrow>

          <ConceptBlock title="Cutting Tools — Grinders, Saws and Nibblers">
            <p>
              Cutting metal containment (cable tray, trunking, conduit), making openings in
              enclosures, and adapting structures are common tasks requiring power cutting tools.
              Each tool has specific safety requirements that must be followed without exception.
            </p>
            <p>
              <strong>Angle grinder.</strong> Available in 115 mm and 230 mm disc sizes. Used for
              cutting metal (thin cutting discs), grinding welds and burrs (grinding discs), and
              cutting masonry (diamond cutting discs). The angle grinder is one of the most
              dangerous power tools — the disc rotates at very high speed and a failure can be
              catastrophic. The guard must always be fitted and positioned correctly. The disc RPM
              rating must equal or exceed the grinder's no-load speed. Never use a cutting disc for
              grinding or vice versa. Dead-man (paddle) switches are preferred — the tool stops when
              released.
            </p>
            <p>
              <strong>Reciprocating saw.</strong> A versatile cutting tool for cable tray, trunking,
              conduit, plasterboard and general demolition. Interchangeable blades suit different
              materials — fine-tooth for metal, coarse-tooth for wood and plasterboard. The orbital
              action setting should be reduced for metal cutting (less aggressive) and increased for
              wood (faster cutting). The shoe (base plate) should be held firmly against the
              workpiece to reduce vibration.
            </p>
            <p>
              <strong>Nibbler / jigsaw.</strong> For cutting openings in thin sheet metal (enclosure
              panels, trunking lids), a nibbler removes a narrow strip of material producing clean,
              burr-free edges. A jigsaw with a fine metal-cutting blade is an alternative for curved
              and straight cuts in sheet material. Both tools produce less noise and vibration than
              an angle grinder and are generally safer for enclosed work.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Angle grinder safety rules"
            whatHappens={
              <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                <li>
                  Guard removed or not positioned to deflect sparks/debris away from the operator
                </li>
                <li>Disc RPM rating lower than the grinder's no-load speed</li>
                <li>Disc fitted without inspection — cracks, chips or damage go unnoticed</li>
                <li>A cutting disc used for grinding, or a grinding disc used for cutting</li>
                <li>
                  No PPE — safety goggles/face shield, leather gloves, hearing protection, dust mask
                </li>
                <li>Workpiece unsecured — cutting while holding the item in the other hand</li>
                <li>Cutting started before the disc reaches full speed</li>
              </ul>
            }
            doInstead={
              <>
                Guard always fitted; disc RPM rating equal to or greater than the grinder's no-load
                speed; inspect every disc before fitting; use the correct disc type for the job;
                full PPE every time; secure the workpiece; let the disc reach full speed before
                starting the cut.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>PAT testing, PUWER and maintenance</ContentEyebrow>

          <ConceptBlock title="PAT Testing, PUWER and Maintenance">
            <p>
              Power tools are subject to multiple regulatory requirements designed to ensure they
              remain safe throughout their working life. The two key frameworks are PAT (Portable
              Appliance Testing) under the Electricity at Work Regulations 1989 and PUWER (Provision
              and Use of Work Equipment Regulations) 1998.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                PAT testing schedule for power tools
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Check type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">User check</td>
                    <td className="border border-white/10 px-3 py-2">Before every use</td>
                    <td className="border border-white/10 px-3 py-2">
                      Visual check for damage to tool, cable, plug
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Formal visual inspection</td>
                    <td className="border border-white/10 px-3 py-2">Weekly / monthly</td>
                    <td className="border border-white/10 px-3 py-2">
                      Detailed visual inspection, recorded
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Combined inspection and test
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      3-monthly (110 V site tools)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Visual + earth continuity + insulation resistance + functional
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">After repair</td>
                    <td className="border border-white/10 px-3 py-2">Every time</td>
                    <td className="border border-white/10 px-3 py-2">
                      Full combined inspection and test
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              PUWER requires that all work equipment is suitable for its intended use, maintained in
              a safe condition, inspected at suitable intervals, and used only by persons who have
              received adequate training. For power tools, this means employers must ensure tools
              are appropriate for the task, regularly inspected and maintained, fitted with
              appropriate guards and safety devices, and that operators have been trained in their
              safe use.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Hand-arm vibration management
              </p>
              <p className="mb-2 text-sm text-white">
                The Control of Vibration at Work Regulations 2005 set daily exposure limits:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Exposure action value:</strong> 2.5 m/s² A(8) — employer must take action
                  to reduce exposure
                </li>
                <li>
                  <strong>Exposure limit value:</strong> 5 m/s² A(8) — must not be exceeded
                </li>
                <li>
                  <strong>Mitigation:</strong> Use low-vibration tools, limit exposure time, rotate
                  tasks, provide anti-vibration gloves, and implement health surveillance for
                  regularly exposed workers
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Record keeping proves compliance">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Record keeping:</strong> Maintain a register of all power tools including
              make, model, serial number, date of purchase, PAT test dates and results, repair
              history, and date of disposal. This provides evidence of compliance with PUWER and the
              Electricity at Work Regulations and is essential for defending any enforcement action.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Cordless tools and battery safety</ContentEyebrow>

          <ConceptBlock title="Cordless Tools and Battery Safety">
            <p>
              Cordless lithium-ion power tools have transformed electrical maintenance work. Modern
              18 V and 36 V platforms offer performance comparable to corded tools for most tasks,
              while eliminating the hazards of trailing cables, the need for 110 V transformers, and
              the restriction of working within cable reach of a power source.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Battery safety essentials
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Charging:</strong> Use only the manufacturer's charger designed for the
                  specific battery type. Never charge damaged, swollen or overheated batteries.
                  Charge in a ventilated area away from flammable materials.
                </li>
                <li>
                  <strong>Storage:</strong> Store batteries at room temperature (10-25°C), away from
                  direct sunlight and heat sources. Remove batteries from tools during long-term
                  storage. Store at 40-60% charge for long periods.
                </li>
                <li>
                  <strong>Damage:</strong> Withdraw any battery that has been dropped, crushed, or
                  shows physical damage (cracks, swelling, leaking). Damaged lithium-ion batteries
                  pose a fire risk (thermal runaway).
                </li>
                <li>
                  <strong>Transport:</strong> Protect battery terminals from short-circuit during
                  transport. Use the manufacturer's protective caps or carry batteries in a
                  dedicated case.
                </li>
                <li>
                  <strong>Disposal:</strong> Lithium-ion batteries must be recycled through an
                  approved scheme — never dispose of in general waste or by incineration.
                </li>
              </ul>
            </div>
            <p>
              The main limitation of cordless tools is battery capacity — heavy-use applications
              (continuous SDS drilling, angle grinding) drain batteries quickly. Having spare
              batteries and a charger on site is essential for productivity. Higher-capacity
              batteries (5.0 Ah, 8.0 Ah) provide longer run times but are heavier. For sustained
              heavy-duty use (core drilling, continuous grinding), corded 110 V tools remain the
              better choice.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              '110 V CTE (centre-tapped earth) is the standard site supply for portable power tools — the centre tap limits voltage to earth to 55 V, well below a generally lethal level.',
              'Power tool classes: Class I — basic insulation + earth (3-core); Class II — double/reinforced insulation, no earth (2-core); Class III — SELV, no earth.',
              'SDS rotary hammer drills use a pneumatic hammer independent of rotation — far more effective in masonry than a standard hammer drill. SDS-Plus handles bits up to ~25 mm.',
              "An angle grinder disc's RPM rating must equal or exceed the grinder's no-load speed, the guard must always be fitted, and full PPE is required — disc failure can be lethal.",
              'PAT schedule: user check before every use, formal visual inspection weekly/monthly, combined inspection and test every 3 months for 110 V site tools, full test after any repair.',
              'Hand-arm vibration: exposure action value 2.5 m/s² A(8), exposure limit value 5 m/s² A(8) (Control of Vibration at Work Regulations 2005).',
              'Key references: PUWER 1998; EAW 1989; Vibration Regs 2005; BS 7671 Section 704 — construction sites; IET CoP — PAT testing; HSG47 — underground services avoidance.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section5-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Selection and Use of Hand Tools
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section5-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Test Equipment
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section5_3;
