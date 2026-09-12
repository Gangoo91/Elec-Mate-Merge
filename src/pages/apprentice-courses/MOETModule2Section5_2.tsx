/**
 * MOET · Module 2 · Section 5.2 · Subsection 2 — Selection and Use of Hand
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
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Selection and Use of Hand Tools - MOET Module 2 Section 5.2';
const DESCRIPTION =
  'Comprehensive guide to selecting and using hand tools for electrical maintenance work: insulated tools, cable preparation, crimping, tightening, measurement and safe working practices to BS 7671 and GS38.';

const quickCheckQuestions = [
  {
    id: 'insulated-tools',
    question:
      'What standard must insulated hand tools comply with for live working or working near live parts?',
    options: [
      'BS EN 60900 — rated to 1,000 V AC / 1,500 V DC and individually tested',
      'BS EN 61010 — rated to 600 V AC and batch tested',
      'BS 7671 — rated to 230 V AC for domestic work only',
      'BS EN 60898 — rated to 400 V AC and type tested',
    ],
    correctIndex: 0,
    explanation:
      'Insulated hand tools for electrical work must comply with BS EN 60900 (IEC 60900). Each tool is individually tested to withstand 10,000 V AC for a specified period and is rated for use at 1,000 V AC / 1,500 V DC. The tools are marked with the double-triangle 1000 V symbol. Ordinary rubber or plastic handles do NOT provide rated insulation protection — only purpose-made VDE-rated tools should be used when there is any risk of contact with live parts.',
  },
  {
    id: 'cable-stripping',
    question:
      'When stripping cable insulation, why should you use a proper cable stripping tool rather than a knife?',
    options: [
      'A stripping tool removes the insulation faster, saving time on large jobs',
      'It avoids nicking the conductor, which reduces its area and weakens the joint',
      'A knife cannot cut through modern double-insulated cable sheaths at all',
      'A stripping tool fits a bootlace ferrule automatically as it removes insulation',
    ],
    correctIndex: 1,
    explanation:
      'Cable stripping tools are designed to cut through the insulation to a precise depth without damaging the conductor beneath. A knife or blade can easily nick the conductor, reducing its effective cross-sectional area and creating a stress point. Even a small nick can significantly weaken a fine-stranded conductor, and on single-core cables a scored conductor may break during installation or in service. For armoured cables, a proper SWA stripping tool or rotary cutter should be used — never a knife.',
  },
  {
    id: 'torque-screwdriver',
    question:
      'Why are torque-controlled screwdrivers and torque wrenches important for electrical connections?',
    options: [
      'They allow terminals to be tightened much faster than a conventional screwdriver',
      "They remove the need to refer to the manufacturer's installation instructions",
      'They tighten terminals to the specified torque, avoiding loose or over-tight joints',
      'They provide insulation protection equivalent to a VDE-rated tool',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Regulation 526.1 requires that connections be mechanically sound and electrically reliable. Manufacturers specify torque values for their terminals, and both under-tightening and over-tightening cause problems. Under-tightening leads to high-resistance connections that overheat and may cause fires. Over-tightening can crack terminal housings, strip threads, damage conductors, or deform terminal components. Torque screwdrivers and wrenches ensure consistent, correct tightening to the specified value.',
  },
  {
    id: 'crimp-tool',
    question:
      'What is the consequence of using the wrong size crimp die or an unratcheted crimping tool?',
    options: [
      'The crimp will be over-compressed and the terminal insulation will melt',
      'The connection will be perfectly sound provided the conductor is the right size',
      'The crimp tool will jam on the terminal and be permanently damaged',
      'A high-resistance or mechanically weak joint that may overheat or pull apart',
    ],
    correctIndex: 3,
    explanation:
      'A proper crimp must compress the ferrule or lug sufficiently to form a gas-tight connection with the conductor strands. Using the wrong size die results in either an over-crimped connection (which may sever strands) or an under-crimped connection (which has high resistance and may pull apart). Ratcheted crimping tools ensure the crimp cycle is completed fully — an unratcheted tool allows the operator to release before the crimp is complete. For safety-critical connections, only manufacturer-approved tools and matching lugs should be used.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "The double-triangle symbol marked '1000V' on a hand tool indicates:",
    options: [
      'The tool has a guaranteed maximum cutting capacity of 1,000 mm² copper',
      'The tool meets BS EN 60900 and is rated for circuits up to 1,000 V AC / 1,500 V DC',
      'The tool may only be used after the circuit has been proven dead at the board',
      'The tool insulation has been tested just once at 1,000 V during manufacture',
    ],
    correctAnswer: 1,
    explanation:
      'The double-triangle 1000V symbol is the internationally recognised marking for insulated tools complying with BS EN 60900 (IEC 60900). These tools have been individually tested at 10,000 V AC and are rated for safe use at up to 1,000 V AC or 1,500 V DC. The insulation is integral to the tool — not simply a coating — and must be inspected before each use for damage, cracks or contamination.',
  },
  {
    id: 2,
    question:
      'HSE Guidance Note GS38 recommends that test probes used by electricians should have:',
    options: [
      'Bare metal tips at least 20 mm long so that good contact is always made',
      'Unfused leads so the meter reading is never affected by an inline fuse',
      'Finger guards, tips exposing no more than 2-4 mm of metal, and fused leads',
      'A minimum lead length of 3 metres to keep the operator clear of the board',
    ],
    correctAnswer: 2,
    explanation:
      'GS38 specifies that test probes should have finger guards to prevent accidental contact with live parts, and spring-loaded retractable tips with a maximum of 2-4 mm of exposed metal to minimise the risk of short-circuits across closely spaced terminals. Test leads should incorporate fuses (typically 500 mA) to limit energy in the event of a short-circuit. These recommendations apply to all voltage indicating devices and test instruments used on or near live electrical systems.',
  },
  {
    id: 3,
    question: 'A side-cutting plier is used in electrical work primarily for:',
    options: [
      'Tightening cable gland locknuts and conduit fittings to a set torque',
      'Drawing cables through conduit and trunking where they cannot be pushed',
      'Cutting hardened steel wire armour (SWA) cleanly on large armoured cables',
      'Cutting conductors cleanly and stripping small cables when no stripper is to hand',
    ],
    correctAnswer: 3,
    explanation:
      'Side-cutting pliers (side cutters or diagonal cutters) are one of the most frequently used hand tools in electrical work. They provide a clean, square cut through copper conductors up to approximately 4 mm² and are also used for trimming cable ties and cutting thin wire. VDE-rated side cutters should always be used for electrical work. They should not be used to cut hardened steel (such as SWA) as this will damage the cutting edges.',
  },
  {
    id: 4,
    question: 'When using a junior hacksaw to cut conduit, the blade teeth should point:',
    options: [
      'Away from the handle, so the blade cuts on the push stroke, conduit held in a vice',
      'Towards the handle, so the blade cuts on the pull stroke for better control',
      'Sideways at 45 degrees to the frame to reduce blade snagging on the conduit',
      'In either direction, as a junior hacksaw blade cuts equally on both strokes',
    ],
    correctAnswer: 0,
    explanation:
      'Hacksaw blades are designed to cut on the push (forward) stroke, so the teeth should point away from the handle. When cutting conduit, the tube should be held firmly in a pipe vice or conduit vice (never held by hand), and the cut should be made squarely using steady, even strokes. After cutting, the internal and external burrs must be removed with a file or deburring tool to prevent damage to cable insulation when cables are drawn through.',
  },
  {
    id: 5,
    question: 'A cable stripping tool set to the wrong depth may:',
    options: [
      'Increase the cross-sectional area of the conductor at the stripped point',
      'Nick the conductor, reducing its area and creating a hot spot or weak point',
      'Anneal the copper conductor, making it more flexible and easier to terminate',
      'Improve the gas-tight seal of the connection by work-hardening the strands',
    ],
    correctAnswer: 1,
    explanation:
      'If the stripping depth is set too deep, the blade will cut into the conductor itself. Even a shallow nick reduces the effective cross-sectional area of the conductor at that point, increasing resistance and creating a localised hot spot under load. On fine-stranded flexible cables, nicked strands may break during installation, reducing the conductor area further. Always adjust the stripping tool for the specific cable size and test on a scrap piece before stripping the live cable.',
  },
  {
    id: 6,
    question: 'A wiring inspection mirror is used for:',
    options: [
      'Reflecting a laser beam to measure long cable runs accurately',
      'Magnifying small terminal markings that are difficult to read by eye',
      'Inspecting connections in confined spaces where direct line of sight is obstructed',
      'Checking that an enclosure is mounted level and plumb on the wall',
    ],
    correctAnswer: 2,
    explanation:
      'An inspection mirror (typically a small mirror on an extendable telescopic handle) allows the electrician to view connections, wiring and components in areas that cannot be directly seen — behind boards, inside enclosures, above false ceilings, etc. During periodic inspection and testing, the mirror is essential for verifying the condition of connections, checking for signs of overheating (discolouration), verifying conductor identification, and confirming that all conductors are correctly terminated.',
  },
  {
    id: 7,
    question: 'The correct tool for cutting steel wire armour (SWA) on an armoured cable is:',
    options: [
      'A pair of VDE-rated side cutters used on each armour wire in turn',
      'A standard automatic cable stripper set to its deepest cutting setting',
      "A sharp electrician's cable knife drawn firmly around the armour",
      'An SWA stripping tool or rotary cutter that cuts the armour without nicking insulation',
    ],
    correctAnswer: 3,
    explanation:
      'SWA cable requires specialist stripping tools. An SWA stripping tool or rotary cable cutter is designed to cut through the steel armour wires cleanly without penetrating the inner bedding and insulation layers. The process typically involves scoring the outer sheath, cutting the armour wires, and then stripping the inner insulation. Using inappropriate tools (pliers, knives, hacksaws) risks damaging the inner insulation, injuring the operator (steel armour wires are sprung), or producing an uneven cut that is difficult to terminate correctly.',
  },
  {
    id: 8,
    question:
      'When choosing a screwdriver for electrical terminal work, the most important consideration is:',
    options: [
      'The correct tip size and type to match the screw, plus VDE rating near live parts',
      'The longest possible blade so that deeply recessed terminals can be reached',
      'A magnetic tip on every driver so that screws cannot be dropped into the board',
      'The brightest handle colour so that the tool is easy to find in the tool bag',
    ],
    correctAnswer: 0,
    explanation:
      'Using the correct tip size and type prevents cam-out (slipping), which damages both the screw head and the terminal housing. A damaged screw may not be tightened to the correct torque, and a damaged terminal housing may compromise the IP rating or mechanical integrity of the enclosure. For any work where contact with live parts is possible, VDE-rated insulated screwdrivers (BS EN 60900) must be used. The screwdriver tip must fit the screw precisely — a too-small tip will cam out, and a too-large tip may not seat properly.',
  },
  {
    id: 9,
    question: 'A fish tape (draw tape) is used for:',
    options: [
      'Measuring the exact length of a conduit run before cutting cable to size',
      'Drawing cables through conduit and trunking where they cannot be pushed by hand',
      'Sealing the ends of a conduit to keep dust out during construction',
      'Tightening cable ties to a consistent tension along a tray run',
    ],
    correctAnswer: 1,
    explanation:
      'A fish tape (also called draw tape or draw wire) is a flexible steel, fibreglass or nylon tape that is pushed or fed through a conduit, trunking or void. Cables are attached to the end and then drawn back through the route. Steel fish tapes should never be used near live circuits (risk of accidental contact). Fibreglass rods are preferred for installations where live circuits may be present. Cable lubricant should be used for long draws to reduce friction and prevent insulation damage.',
  },
  {
    id: 10,
    question: 'Before using any hand tool, a maintenance technician should:',
    options: [
      'Wipe the tool with a damp cloth so that the insulation remains conductive',
      'Confirm the tool was used in the last 24 hours so it is known to work',
      'Inspect it for cracked handles, worn insulation and damaged edges before use',
      'Test the tool insulation by briefly touching a live terminal to check for shock',
    ],
    correctAnswer: 2,
    explanation:
      'Pre-use inspection of hand tools is a fundamental safety practice. Damaged insulation on VDE-rated tools can expose the operator to electric shock. Cracked or loose handles can cause loss of control. Worn cutting edges require excessive force, increasing the risk of slippage and injury. A mushroomed chisel head can shatter on impact, sending metal fragments into the eyes. Tool inspection takes only moments and should be carried out before every use — not just occasionally.',
  },
  {
    id: 11,
    question: 'Bootlace ferrules are used when terminating fine-stranded flexible cables because:',
    options: [
      'They increase the current-carrying capacity of the conductor by adding copper',
      'They colour-code the conductor so that polarity can be identified at a glance',
      'They add insulation that lets the cable be used at a higher working voltage',
      'They compress all the strands into a solid end, preventing escape and screw damage',
    ],
    correctAnswer: 3,
    explanation:
      'Fine-stranded flexible cables can have individual strands escape from screw terminals, potentially bridging to adjacent terminals and causing short-circuits. Screw pressure can also sever individual strands, reducing the effective conductor area. A bootlace ferrule (crimped using the correct tool and die) compresses all strands into a solid, uniform cylindrical end that terminates reliably in screw, cage clamp and spring terminals. They are considered best practice for all fine-stranded terminations.',
  },
  {
    id: 12,
    question: 'A spirit level is used in electrical installation work for:',
    options: [
      'Ensuring boards, accessories and containment are installed level and plumb',
      'Checking the earth fault loop impedance of a final circuit at the socket',
      'Measuring the depth of insulation removed from a stripped conductor',
      'Confirming that a circuit is dead before terminations are made',
    ],
    correctAnswer: 0,
    explanation:
      'A spirit level ensures that enclosures, accessories and containment systems are installed level (horizontal) and plumb (vertical). This is not merely cosmetic — a consumer unit or distribution board that is not level may have doors that do not close correctly, breakers that are difficult to operate, and an unprofessional appearance. Trunking and conduit runs that are not level or plumb look poor and may cause issues with cable management. A torpedo level (short spirit level) fits into tight spaces.',
  },
];

const faqs = [
  {
    question: 'How often should VDE-insulated tools be replaced?',
    answer:
      'VDE-insulated tools do not have a fixed replacement date, but they must be visually inspected before every use and withdrawn from service immediately if the insulation shows any signs of damage — cracks, cuts, abrasion wear-through, contamination with oils or solvents, or exposure to heat. Many employers implement an annual formal inspection regime where tools are closely examined and any with compromised insulation are discarded. The insulation on VDE tools is not repairable — damaged tools must be replaced, not repaired.',
  },
  {
    question: 'Can I use standard household tools for electrical work?',
    answer:
      "Standard household tools should not be used for electrical maintenance work, even on isolated circuits. Electrician's tools are designed for the specific demands of electrical work — VDE-insulated handles, correct tip profiles for electrical terminals, appropriate cutting capacities for copper conductors, and ergonomic designs for repetitive use. Household tools may have inadequate insulation, incorrect tip sizes that damage terminals, and materials that are not suited to cutting copper. Using the right tool for the job is a fundamental safety and quality principle.",
  },
  {
    question: 'What is the difference between Phillips and Pozidriv screwdrivers?',
    answer:
      'Phillips (PH) and Pozidriv (PZ) are similar but not interchangeable. Phillips tips have a simple cross pattern, while Pozidriv tips have an additional set of smaller cross lines at 45 degrees to the main cross. Using a Phillips driver in a Pozidriv screw (or vice versa) will result in poor engagement, cam-out, and damage to the screw head. Most modern electrical accessories and consumer units in the UK use Pozidriv screws (PZ1 or PZ2). Always identify the screw type before selecting the driver.',
  },
  {
    question: 'Why do electricians need multiple sizes of the same tool type?',
    answer:
      "Different cable sizes, screw sizes and component types require matching tool sizes. Using a flat screwdriver that is too wide for a terminal screw risks short-circuiting adjacent terminals. Using one that is too narrow damages the screw slot and prevents proper torque transfer. Similarly, cable strippers, crimping tools and cutting tools must match the cable or component size. A professional electrician's tool kit typically includes multiple sizes of screwdrivers (PZ1, PZ2, flat 3 mm, 5.5 mm), strippers for different cable sizes, and a range of crimp dies.",
  },
  {
    question: 'How should I maintain my hand tools?',
    answer:
      'Hand tools should be kept clean, dry and stored in a suitable tool bag or case that protects cutting edges and insulated surfaces. After use, wipe tools clean of debris, moisture and any chemicals. Cutting tools should be kept sharp — dull cutters require excessive force and produce poor cuts. Plier joints should be lightly oiled periodically. VDE-insulated tools should never be stored loose where they can be damaged by other tools. Replace any tool that is damaged, worn or no longer fit for purpose — never attempt to repair VDE insulation.',
  },
];

const MOETModule2Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.5 · Subsection 2"
        title="Selection and Use of Hand Tools"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Essential hand tools, safe selection and proper techniques for electrical maintenance —
            the tools that get used every day, and the standards that decide which ones are safe to
            pick up near live parts.
          </p>

          <TLDR
            points={[
              'VDE tools: BS EN 60900 rated to 1,000 V AC — essential for electrical work',
              'Cable prep: strippers, SWA cutters, crimpers — right tool for each cable type',
              'Torque: correct terminal tightening prevents fires and failures',
              'Inspection: check every tool before every use',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the essential hand tools in an electrician's toolkit and their correct applications",
              'Understand BS EN 60900 requirements for VDE-insulated tools and when they must be used',
              'Select the correct cable stripping, cutting and preparation tools for different cable types',
              'Apply correct crimping techniques using ratcheted tools and appropriate dies',
              'Use torque-controlled screwdrivers and wrenches for reliable electrical connections',
              'Implement pre-use tool inspection as a fundamental safety practice',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>VDE-insulated tools and safety standards</ContentEyebrow>

          <ConceptBlock
            title="VDE-Insulated Tools and Safety Standards"
            onSite="Never assume a circuit is dead — always verify with a proven voltage indicator (GS38 compliant) before and after isolation. Even with verified isolation, using VDE-insulated tools provides a critical second layer of protection against unexpected re-energisation, induced voltages, or incorrect circuit identification. Defence in depth is the principle: isolation is the primary protection, insulated tools are the backup."
          >
            <p>
              The most fundamental requirement for any hand tool used in electrical work is
              appropriate insulation. When there is any possibility of contact with live conductors
              or terminals — even on circuits that have been isolated — VDE-rated insulated tools
              complying with BS EN 60900 (IEC 60900) must be used. This is not optional; it is a
              critical safety requirement that protects the electrician from electric shock.
            </p>
            <p>
              BS EN 60900 insulated tools are individually tested at 10,000 V AC during manufacture
              and are rated for working use at up to 1,000 V AC or 1,500 V DC. The insulation is not
              simply a coating or dip — it is a multi-layer system that is bonded to the tool and
              cannot be easily removed. Each tool bears the double-triangle symbol with "1000V" to
              indicate compliance.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Essential VDE tool kit
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Tool</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Typical sizes</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Primary use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Flat screwdrivers</td>
                    <td className="border border-white/10 px-3 py-2">3.0, 4.0, 5.5 mm</td>
                    <td className="border border-white/10 px-3 py-2">
                      Terminal screws, switchgear
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Pozidriv screwdrivers</td>
                    <td className="border border-white/10 px-3 py-2">PZ1, PZ2</td>
                    <td className="border border-white/10 px-3 py-2">
                      Accessory face plates, MCB screws
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Side cutters</td>
                    <td className="border border-white/10 px-3 py-2">160 mm, 180 mm</td>
                    <td className="border border-white/10 px-3 py-2">Cutting cables up to 4 mm²</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Long-nose pliers</td>
                    <td className="border border-white/10 px-3 py-2">160 mm, 200 mm</td>
                    <td className="border border-white/10 px-3 py-2">
                      Forming conductor loops, gripping
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Combination pliers</td>
                    <td className="border border-white/10 px-3 py-2">180 mm, 200 mm</td>
                    <td className="border border-white/10 px-3 py-2">
                      Gripping, twisting, light cutting
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cable knife</td>
                    <td className="border border-white/10 px-3 py-2">Hooked blade</td>
                    <td className="border border-white/10 px-3 py-2">
                      Stripping cable outer sheaths
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Cable preparation tools</ContentEyebrow>

          <ConceptBlock title="Cable Preparation Tools">
            <p>
              Preparing cables for termination is one of the most frequent tasks in electrical
              maintenance. The quality of the cable preparation directly affects the quality and
              reliability of the connection. Using the correct tool for each cable type ensures
              clean, damage-free preparation that results in sound terminations.
            </p>
            <p>
              <strong>Cable strippers.</strong> Automatic cable strippers grip the cable, cut
              through the insulation to a preset depth, and pull the insulation off in one action.
              They are adjustable for different cable sizes (typically 0.5 mm² to 6 mm²) and produce
              consistent, clean strips without conductor damage. For flat twin-and-earth cable, a
              jokari-style stripper removes the outer sheath without damaging the inner insulation.
              Always adjust the cutting depth on a scrap piece of cable before working on the actual
              installation.
            </p>
            <p>
              <strong>SWA stripping tools.</strong> Steel wire armoured cable requires a specialist
              approach. An SWA stripping tool typically consists of a rotary cutter that scores the
              outer PVC sheath without cutting the armour wires, allowing the sheath to be removed.
              The armour wires are then cut individually with SWA cutters or heavy-duty side
              cutters, bent back over the gland, and the inner bedding sheath is stripped to expose
              the insulated cores. This is a multi-step process that requires practice to master.
            </p>
            <p>
              <strong>Cable knives.</strong> A VDE-rated cable knife with a hooked blade is used for
              stripping the outer sheath of larger cables and for general cable preparation. The
              hooked blade prevents the knife from slipping off the cable and cutting the
              electrician. When using a cable knife, always cut away from the body, keep fingers
              clear of the blade path, and use a controlled, shallow cutting depth to avoid damaging
              inner insulation layers.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Bootlace ferrules for fine-stranded cable">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Best practice:</strong> For fine-stranded flexible cables, always fit a
              bootlace ferrule after stripping. This consolidates the strands, prevents them from
              splaying, and ensures all strands make proper contact in the terminal. Use the correct
              ferrule size and a proper ratcheted crimping tool.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Crimping and termination tools</ContentEyebrow>

          <ConceptBlock title="Crimping and Termination Tools">
            <p>
              Reliable electrical connections are the foundation of a safe installation. Crimped
              connections, when made correctly with the right tools, provide gas-tight,
              low-resistance joints that are mechanically strong and electrically sound. The
              crimping tool must match the crimp type (bootlace ferrule, ring terminal, pin
              terminal, butt connector) and the conductor size.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Crimping tool types
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Tool type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Key feature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Bootlace ferrule crimper</td>
                    <td className="border border-white/10 px-3 py-2">
                      Fine-stranded flexible cables
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Self-adjusting or sized dies
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Ratcheted crimp tool</td>
                    <td className="border border-white/10 px-3 py-2">
                      Insulated terminals (ring, fork, butt)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Ratchet ensures full crimp cycle
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Hydraulic crimper</td>
                    <td className="border border-white/10 px-3 py-2">Large cable lugs (25 mm²+)</td>
                    <td className="border border-white/10 px-3 py-2">
                      High force for large conductors
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Coaxial crimp tool</td>
                    <td className="border border-white/10 px-3 py-2">BNC, F-type connectors</td>
                    <td className="border border-white/10 px-3 py-2">
                      Specific dies for connector type
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The ratchet mechanism on a quality crimping tool is a critical safety feature. It
              prevents the handles from opening until the crimp cycle is fully complete, ensuring
              that every crimp receives the correct amount of compression. Without a ratchet, the
              operator may release the handles prematurely, resulting in an under-crimped connection
              that appears secure but has high resistance and low mechanical strength.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Common crimping errors"
            whatHappens={
              <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                <li>
                  Wrong die size — over-compression severs strands; under-compression gives poor
                  contact
                </li>
                <li>Conductor not fully inserted into the ferrule or terminal barrel</li>
                <li>Insulation trapped in the crimp barrel — prevents conductor contact</li>
                <li>Using pliers instead of a crimping tool — never acceptable</li>
                <li>Mixing manufacturers — crimp tool and terminals should be a matched system</li>
              </ul>
            }
            doInstead={
              <>
                Match the die to the conductor and terminal, insert the conductor fully, keep
                insulation clear of the barrel, use a proper crimping tool every time, and keep the
                crimp tool and terminals to one matched system.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Torque tools and connection integrity</ContentEyebrow>

          <ConceptBlock title="Torque Tools and Connection Integrity">
            <p>
              BS 7671 Regulation 526.1 requires that every connection shall be durable, provide
              adequate current-carrying capacity, and provide adequate mechanical strength.
              Achieving this consistently requires tightening terminals to the manufacturer's
              specified torque using calibrated torque-controlled tools.
            </p>
            <p>
              Loose connections are one of the most common causes of electrical fires. A connection
              that is even slightly loose develops increased resistance at the contact point. This
              resistance generates heat, which causes further loosening through thermal cycling
              (expansion and contraction), which increases resistance further — a positive feedback
              loop that eventually leads to arcing, melting, and fire.
            </p>
            <p>
              <strong>Torque screwdrivers.</strong> Available as preset (fixed torque) or adjustable
              types. The tool clicks or slips when the set torque is reached, preventing
              over-tightening. Common torque values for electrical terminals range from 0.4 Nm for
              small lighting terminals to 2.5 Nm for 32 A MCB terminals, up to 50 Nm or more for
              large busbar connections. Always refer to the manufacturer's data sheet for the
              specific torque value — it varies between manufacturers and product ranges.
            </p>
            <p>
              <strong>Torque wrenches.</strong> Used for larger connections — busbar bolts, cable
              gland locknuts, and large terminal connections. A click-type torque wrench gives an
              audible and tactile indication when the set torque is reached. Torque wrenches must be
              calibrated regularly (typically annually) and stored correctly (returned to minimum
              setting after use to relieve the spring).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Thermal imaging finds what a torque check misses later">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Maintenance context:</strong> During periodic inspection and testing, thermal
              imaging of distribution boards under load is an excellent way to identify connections
              that have loosened over time. Hot spots visible on thermal images typically indicate
              high-resistance connections that need to be re-torqued. Always record thermal images
              as part of the inspection report.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>General-purpose and specialist hand tools</ContentEyebrow>

          <ConceptBlock title="General-Purpose and Specialist Hand Tools">
            <p>
              Beyond the core electrical tools, a maintenance technician needs a range of
              general-purpose and specialist hand tools for the diverse tasks encountered in
              maintenance and installation work. Selecting the right tool for each task is not just
              about efficiency — it is about safety and quality.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Additional essential tools
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Tool</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Junior hacksaw</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cutting conduit, mini-trunking, small sections
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Half-round file</td>
                    <td className="border border-white/10 px-3 py-2">
                      Deburring conduit ends, enlarging knock-outs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Spirit level (torpedo)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Ensuring enclosures and containment are level
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Tape measure (5 m)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Measuring cable routes, accessory positions
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Inspection mirror</td>
                    <td className="border border-white/10 px-3 py-2">
                      Viewing concealed connections and wiring
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Fish tape / draw rods</td>
                    <td className="border border-white/10 px-3 py-2">
                      Drawing cables through conduit and voids
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Adjustable spanner</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cable glands, conduit fittings, locknuts
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Allen keys (hex keys)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Panel fixings, busbar connections, some terminals
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Pre-use tool inspection checklist
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>VDE insulation — no cracks, cuts, abrasion, contamination or heat damage</li>
                <li>Handles — secure, not cracked or split, comfortable grip</li>
                <li>Cutting edges — sharp, not chipped or rolled</li>
                <li>Plier joints — smooth operation, no excessive play</li>
                <li>Screwdriver tips — not worn, rounded or damaged</li>
                <li>Torque tools — within calibration date, mechanism functioning correctly</li>
                <li>Markings — VDE symbol and rating still legible</li>
              </ul>
            </div>
            <p>
              Tool storage is an important consideration. A well-organised tool bag or case protects
              tools from damage during transport, keeps them clean and dry, and ensures the right
              tool can be found quickly when needed. Many electricians use a tool roll or modular
              pouch system that keeps VDE tools separate from general tools and prevents cutting
              edges from being damaged by contact with other tools.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=TvFbyzcXJV8"

            title="Torque Screwdrivers — Why Electricians Use Them"

            channel="Toolbox Talk For Electricians"

            duration="2:14"

            topic="Why a terminal tightened by feel is a fire waiting to happen"

            caption="Two minutes, and it is the single hand-tool habit that prevents the loose-connection fires covered in 1.6.1."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'VDE-insulated tools must comply with BS EN 60900 — individually tested at 10,000 V AC, rated 1,000 V AC / 1,500 V DC, marked with the double-triangle "1000V" symbol.',
              'Match the tool to the cable: automatic strippers for general cable, SWA stripping tools or rotary cutters for armoured cable, VDE-rated hooked cable knives for outer sheaths.',
              'BS 7671 Regulation 526.1 requires every connection to be durable, provide adequate current-carrying capacity, and provide adequate mechanical strength — torque tools deliver that consistently.',
              'A ratcheted crimping tool with the correct die is not optional — an unratcheted tool or the wrong die produces a high-resistance or mechanically weak joint.',
              'Inspect every tool before every use: VDE insulation, handles, cutting edges, plier joints, screwdriver tips, torque calibration date, and markings.',
              'Key references: BS EN 60900 — insulated hand tools (1,000 V); GS38 — electrical test equipment safety; BS 7671 Regulation 526.1 — connections; PUWER 1998; BS 7671 Chapter 13.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section5-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Conductors and Insulation Materials
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section5-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Selection and Use of Power Tools
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section5_2;
