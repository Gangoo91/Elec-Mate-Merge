/**
 * MOET · Module 4 · Section 4 · Subsection 3 — Cable Jointing and
 * Termination
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical plant, equipment, and systems
 *                 maintenance requirements: removing and replacing parts,
 *                 inspecting, testing, setting up, adjusting, cleaning, and
 *                 functional testing."
 *              · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *              · "Electrical. Inspect and test electrical aspects of plant.
 *                 For example, visual checks, insulation and continuity
 *                 checks, thermographic surveys, and voltage levels."
 *   Skills     · "Electrical. Conduct functional testing."
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
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cable Jointing and Termination - MOET Module 4.4.3';
const DESCRIPTION =
  'Comprehensive guide to cable jointing and termination techniques for maintenance technicians: straight joints, branch joints, heat shrink, cold shrink, resin joints, SWA glands, multicore termination, crimping, torque requirements and post-jointing testing under BS 7671.';

const quickCheckQuestions = [
  {
    id: 'straight-joint',
    question: 'What is the primary purpose of a straight-through cable joint?',
    options: [
      'To allow a quick disconnection point so the cable can be unplugged for routine maintenance',
      'To increase the current-carrying capacity of the cable at the point of jointing',
      'To repair a damaged section of cable or extend a cable run while maintaining electrical continuity, insulation integrity and mechanical protection',
      'To provide a fused tap-off point for protecting the downstream cable run',
    ],
    correctIndex: 2,
    explanation:
      "A straight-through joint connects two cable ends to maintain electrical continuity, restore insulation integrity and provide mechanical protection equivalent to the original cable. The joint must maintain the cable's current-carrying capacity, insulation resistance, and where applicable, the earth continuity of the armour or screen.",
  },
  {
    id: 'swa-gland',
    question:
      'When terminating a steel wire armoured (SWA) cable, the gland serves which dual function?',
    options: [
      'It mechanically clamps the cable armour to provide both mechanical retention and an earth continuity connection through the armour',
      'It insulates the armour from the enclosure while providing weatherproof sealing of the cable entry',
      'It connects the armour to the neutral conductor and seals the cable against moisture ingress',
      'It separates the cores from the armour and limits the bending radius of the cable at the entry',
    ],
    correctIndex: 0,
    explanation:
      'An SWA cable gland (e.g., CW or BW type) serves two critical functions: it mechanically clamps the wire armour to provide strain relief and cable retention, and it provides a low-resistance earth continuity connection between the cable armour and the earthing system of the enclosure. Both functions are essential for safety — failure of either can result in cable pull-out or loss of earth continuity.',
  },
  {
    id: 'crimp-tool',
    question:
      'Why must crimped connections be made using the correct die size in a calibrated crimp tool?',
    options: [
      'To make the crimping action faster so that more terminations can be completed in a given time',
      'To achieve the correct compression that ensures a gas-tight connection with the specified mechanical strength and current-carrying capacity',
      'To allow the same tool to be used on any size of conductor without changing settings',
      'To leave a small air gap that helps the connection dissipate heat under load',
    ],
    correctIndex: 1,
    explanation:
      'Correct crimp die size produces the precise compression needed for a gas-tight metal-to-metal contact between the conductor and the crimp terminal. Under-crimping results in a loose connection with high resistance, leading to overheating. Over-crimping damages the conductor strands, reducing the cross-sectional area and weakening the joint. Only calibrated tools with matching dies produce reliable crimps.',
  },
  {
    id: 'ir-after-joint',
    question:
      'What minimum insulation resistance value would you expect to achieve after completing a cable joint on a 400 V circuit?',
    options: [
      '0.25 MΩ or greater, tested at 250 V DC',
      '0.5 MΩ or greater, tested at 500 V DC',
      '1.0 MΩ or greater, tested at 500 V DC',
      '2.0 MΩ or greater, tested at 1000 V DC',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 specifies a minimum insulation resistance of 1.0 MΩ for circuits up to and including 500 V (excluding SELV/PELV), tested at 500 V DC. A properly made joint should achieve significantly higher values — typically tens or hundreds of megohms. A reading at or near the minimum indicates a potential issue with the joint quality that warrants investigation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which type of cable joint uses pre-formed rubber sleeves that contract under tension when a support core is removed?',
    options: [
      'Heat shrink joint',
      'Cold shrink joint',
      'Resin-filled joint',
      'Mechanical compression joint',
    ],
    correctAnswer: 1,
    explanation:
      'Cold shrink joints use EPDM rubber sleeves that are factory-expanded and held on a support core. When the core is removed at installation, the sleeve contracts under its own elasticity to grip the cable tightly. Cold shrink technology requires no heat source, making it safer for use in confined spaces, hazardous areas and where open flames are prohibited.',
  },
  {
    id: 2,
    question: 'When making a heat shrink joint, the heat gun temperature should be:',
    options: [
      'Set to the temperature recommended by the joint kit manufacturer and applied evenly, working from the centre outward to expel air and moisture',
      'Set to the maximum the gun can reach so the sleeve shrinks as quickly as possible',
      'Set just high enough to soften the sleeve, applied from one end only to draw the material along',
      'Set the same for every joint regardless of sleeve type, as all heat shrink shrinks at one fixed temperature',
    ],
    correctAnswer: 0,
    explanation:
      "The heat gun must be set to the manufacturer's recommended temperature (typically 100-130°C for standard heat shrink). Heat must be applied evenly, working from the centre of the joint outward towards each end to expel trapped air and moisture. Overheating damages the cable insulation and can cause the heat shrink material to burn or become brittle. Uneven heating results in incomplete shrinkage and potential voids.",
  },
  {
    id: 3,
    question: 'Resin-filled cable joints are particularly suitable for:',
    options: [
      'High-temperature joints close to boilers and furnaces where the resin cures faster',
      'Joints that must be opened and re-made regularly for routine maintenance access',
      'Overhead joints on suspended catenary cables where weight must be kept to a minimum',
      'Situations where the joint may be submerged in water or buried directly in the ground, as the resin provides a watertight and mechanically robust seal',
    ],
    correctAnswer: 3,
    explanation:
      'Resin joints provide excellent protection against moisture ingress and mechanical damage, making them the preferred choice for underground cable joints and joints in damp or submerged locations. The two-part resin is mixed and poured into a mould around the joint, where it sets to form a solid, waterproof and electrically insulating barrier. Once set, resin joints are permanent and cannot be disassembled.',
  },
  {
    id: 4,
    question: 'When stripping SWA cable for gland termination, the critical dimensions are:',
    options: [
      "The armour strip length (determined by the gland size), the outer sheath strip length, the inner sheath strip length, and the conductor tail length — all specified in the gland manufacturer's installation guide",
      'Only the outer sheath strip length, since the gland clamps the cable on its sheath rather than the armour',
      'Only the conductor tail length, as the gland self-adjusts to suit any armour and sheath dimensions',
      'The bending radius and the depth of the enclosure knockout, which together fix all strip lengths',
    ],
    correctAnswer: 0,
    explanation:
      'Each dimension is critical for a correct gland installation: the outer sheath strip length must allow the gland compression ring to seat correctly, the armour strip length must provide enough armour for the gland to clamp securely, the inner sheath strip provides insulation between the armour and conductors, and the conductor tails must be long enough for termination but not so long as to create excess conductor in the enclosure.',
  },
  {
    id: 5,
    question: 'The correct method for fitting a bootlace ferrule on a stranded conductor is:',
    options: [
      'Solder the strands together first, then push the soldered tip into the ferrule and crimp',
      'Insert the strands fully into the ferrule without pre-twisting, then crimp with the correct tool and matching die so no strand sits outside the ferrule',
      'Tin the ferrule with solder, insert the conductor, and rely on the solder rather than the crimp for the connection',
      'Crimp the empty ferrule first to shape it, then push the conductor into the closed barrel',
    ],
    correctAnswer: 1,
    explanation:
      'Stranded conductors must be fully inserted into the bootlace ferrule without pre-twisting (which can prevent full insertion). The ferrule is then crimped using the correct tool with the matching die size. The crimp should produce a clean, symmetrical compression with all strands contained within the ferrule. Soldering before crimping is incorrect as solder creep under terminal pressure can cause a loose connection over time.',
  },
  {
    id: 6,
    question:
      'What type of SWA gland is suitable for indoor use with a cable entering a steel enclosure?',
    options: [
      'A BW-type gland, designed specifically to clamp the steel wire armour of SWA cable',
      'A stuffing (compression) gland intended for unarmoured cables passing through steel plate',
      'A CW-type indoor gland, which clamps the wire armour and provides earth continuity into the enclosure',
      'An A-type gland, used where only a weatherproof seal and no armour clamping is required',
    ],
    correctAnswer: 2,
    explanation:
      "For SWA cables entering steel enclosures indoors, a CW-type gland is typically used as it provides a complete armour clamp, seal and earth continuity. BW-type glands are designed for braid-armoured or pliable wire armoured cables, not standard SWA. The CW gland's compression ring and cone grip the wire armour, and an earth tag provides the earth continuity path. For outdoor or weatherproof applications, glands with additional sealing may be required.",
  },
  {
    id: 7,
    question: 'Why should cable cores be individually identified (marked) before jointing?',
    options: [
      'To allow the cores to be tinned more evenly before the connectors are applied',
      'To reduce the insulation resistance between adjacent cores at the joint',
      'To make the joint enclosure smaller by grouping cores of the same colour together',
      'To ensure correct phase identification is maintained across the joint — incorrect phasing can cause motor reversal, equipment damage, or dangerous cross-connections',
    ],
    correctAnswer: 3,
    explanation:
      'Core identification ensures that each conductor is reconnected to its correct counterpart across the joint. In three-phase circuits, incorrect phasing causes motor reversal and equipment damage. In control circuits, cross-connections can cause dangerous maloperation. BS 7671 requires cable identification throughout, and joints must maintain this identification using colour-coded heat shrink sleeves, ferrule markers or other permanent marking methods.',
  },
  {
    id: 8,
    question:
      'After completing a cable joint, which tests should be carried out BEFORE the cable is re-energised?',
    options: [
      'Insulation resistance between all conductors and earth and between conductors, continuity of all conductors through the joint, and visual inspection of the completed joint',
      'A loop impedance test only, since this confirms both insulation and continuity in a single measurement',
      'An earth electrode resistance test, to confirm the joint will operate correctly under fault conditions',
      'A polarity check only, as this is the single test required before re-energising any repaired cable',
    ],
    correctAnswer: 0,
    explanation:
      "After jointing, a minimum of three tests must be carried out: insulation resistance (to confirm the joint's insulation integrity — minimum 1.0 MΩ for LV per BS 7671), continuity (to confirm each conductor is correctly connected through the joint with acceptable resistance), and a thorough visual inspection (to check for exposed conductors, correct sealing, and mechanical integrity). These tests verify both the electrical and physical quality of the joint.",
  },
  {
    id: 9,
    question: 'What is the purpose of stress control in medium voltage (MV) cable terminations?',
    options: [
      'To mechanically support the cable weight where it leaves the termination and prevent strain on the conductor',
      'To control the electrical stress concentration at the point where the cable insulation screen is cut back, preventing partial discharge and eventual insulation breakdown',
      'To increase the current-carrying capacity of the termination by improving heat dissipation',
      'To seal the termination against moisture so that the cable can be used in damp locations',
    ],
    correctAnswer: 1,
    explanation:
      'At the screen cut-back point of an MV cable, the electric field concentration increases dramatically. Without stress control, this concentrated field causes partial discharge (corona) which progressively degrades the insulation, eventually leading to flashover and cable failure. Stress control tubes, cones or grading materials redistribute the electric field to manageable levels, preventing partial discharge and ensuring long-term reliability.',
  },
  {
    id: 10,
    question: 'Torque values for electrical terminal connections are important because:',
    options: [
      'A higher torque always gives a better connection, so terminals should be tightened as hard as possible',
      'Torque only matters on aluminium conductors and can be ignored for copper terminations',
      'Correct torque ensures a reliable low-resistance connection — too loose causes overheating, too tight damages the terminal or conductor',
      'Torque settings are purely a manufacturer warranty requirement and have no effect on safety',
    ],
    correctAnswer: 2,
    explanation:
      "Torque-controlled connections are essential for reliable electrical joints. Under-torqued connections result in high contact resistance and localised heating — a leading cause of electrical fires. Over-torqued connections damage terminal threads, crush conductor strands, and crack terminal blocks, all of which create unreliable connections. BS 7671 Regulation 526.2 requires connections to be mechanically and electrically reliable, and manufacturer's torque specifications provide the benchmark.",
  },
  {
    id: 11,
    question:
      'When jointing XLPE-insulated cables, which precaution is particularly important compared to PVC cables?',
    options: [
      'XLPE must be pre-heated with a torch before jointing to soften the insulation for the connectors',
      'XLPE cores must be soldered rather than crimped because the insulation cannot withstand compression',
      'XLPE cables require no insulation testing after jointing because the material is self-healing',
      'XLPE insulation must be handled with extreme cleanliness — contamination (fingerprints, moisture, dust) on the insulation surface can cause partial discharge sites and eventual failure',
    ],
    correctAnswer: 3,
    explanation:
      'XLPE (cross-linked polyethylene) insulation is highly sensitive to contamination. Even fingerprints or microscopic dust particles can create weak points in the insulation where partial discharge can initiate under voltage stress. Jointing XLPE cables requires scrupulous cleanliness: clean hands or gloves, lint-free cleaning materials, and protection from rain, dust and condensation. This is especially critical for MV and HV cable joints where the voltage stress is high.',
  },
  {
    id: 12,
    question: 'A branch joint (tee joint) in a cable differs from a straight joint in that:',
    options: [
      'It allows a new cable to be connected into an existing cable run without breaking the through circuit, creating a T-shaped junction',
      'It can only be used on single-core cables, whereas a straight joint is used on multicore cables',
      'It does not require the armour to be reconnected, unlike a straight joint',
      'It joins two cable ends end-to-end, whereas a straight joint connects three or more cables',
    ],
    correctAnswer: 0,
    explanation:
      'A branch (tee) joint allows a tap-off connection from an existing cable without interrupting the through circuit. The joint must maintain the current-carrying capacity of both the through cable and the branch, provide adequate insulation for all conductors, and where applicable, maintain the earth continuity of the cable armour for all three cable sections. Branch joints are more complex than straight joints and require careful planning of conductor connections and insulation build-up.',
  },
];

const faqs = [
  {
    question: 'Can I use a straight connector block (choc block) as a permanent cable joint?',
    answer:
      'Connector blocks (strip connectors) can be used for permanent connections only when installed in a suitable enclosure that provides mechanical protection and maintains the IP rating required for the installation location. They should not be used as buried or concealed joints, nor where they may be subject to vibration or mechanical stress. For underground joints, buried joints, or high-current connections, purpose-designed joint kits (heat shrink, cold shrink, or resin) should always be used.',
  },
  {
    question: 'What is the difference between a CW and a BW cable gland?',
    answer:
      'CW (Cable Wire) glands are designed for SWA (steel wire armoured) cables and provide armour clamping, cable retention and earth continuity. They consist of an outer gland body, compression ring, cone and locknut. BW (Brass Weather) glands are designed for non-armoured cables and provide cable retention and sealing only — they do not clamp armour. Using a BW gland on an SWA cable would fail to clamp the armour and would not provide earth continuity through the armour.',
  },
  {
    question: 'Is soldering acceptable for making permanent electrical connections?',
    answer:
      'BS 7671 Regulation 526.1 permits soldered connections but requires them to be made in accordance with the relevant standards and to provide adequate mechanical strength independent of the solder. In practice, soldered connections are being increasingly replaced by crimped connections which provide more consistent and reliable results. Soldered connections are susceptible to dry joints, flux corrosion, and solder creep under terminal clamp pressure. Where soldering is used, the conductor must be mechanically secured before soldering.',
  },
  {
    question: 'How do I determine the correct gland size for a cable?',
    answer:
      "The gland size is determined by the cable's overall diameter (including outer sheath). Each gland size has a specified range of cable diameters it can accommodate. Refer to the gland manufacturer's selection chart, which cross-references cable type and size to the correct gland. For example, a 4-core 10 mm² SWA cable typically requires a 25 mm (25S) CW gland. Using an incorrect gland size will result in either an inadequate seal and clamp (too large) or inability to fit (too small).",
  },
  {
    question:
      'Why should I never twist stranded conductors before inserting them into bootlace ferrules?',
    answer:
      'Pre-twisting stranded conductors before inserting them into a bootlace ferrule can prevent the individual strands from spreading evenly within the ferrule barrel, potentially leaving some strands outside or creating voids inside. The strands should be naturally aligned and pushed straight into the ferrule, ensuring all strands are captured. The crimping action then compresses all strands uniformly within the ferrule, creating a gas-tight connection. Soldering before ferrule insertion is also incorrect, as solder creep under clamp pressure can cause connections to loosen over time.',
  },
];

const MOETModule4Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.4 · Subsection 3"
        title="Cable Jointing and Termination"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Straight joints, branch joints, heat shrink, cold shrink, resin joints, SWA glands,
            crimping and torque requirements
          </p>

          <TLDR
            points={[
              'Straight/branch joints: restore continuity, insulation and mechanical protection.',
              'Heat/cold shrink: two main jointing technologies for LV and MV cables.',
              'SWA glands: mechanical retention plus earth continuity through armour.',
              'Test after jointing: IR, continuity and visual inspection are mandatory.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe straight joint and branch joint construction techniques for LV cables',
              'Compare heat shrink, cold shrink and resin joint technologies and their applications',
              'Correctly terminate SWA cables using CW-type glands with earth continuity',
              'Apply crimping techniques using calibrated tools and correct die sizes',
              'Specify and apply correct torque values for electrical terminal connections',
              'Carry out post-jointing testing including insulation resistance and continuity',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Standards and guidance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 Reg 526:</strong> electrical connections — reliability and
                accessibility.
              </li>
              <li>
                <strong>BS 7671 Reg 522.8:</strong> joints and connections — protection and
                enclosure.
              </li>
              <li>
                <strong>BS 6346/BS 5467:</strong> PVC and XLPE cable construction standards.
              </li>
              <li>
                <strong>ST1426:</strong> cable installation and termination competences.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Straight joints and branch joints</ContentEyebrow>

          <ConceptBlock title="Straight joints and branch joints">
            <p>
              Cable joints are required when a cable must be repaired, extended, or when a new
              circuit must be tapped from an existing cable run. The quality of the joint directly
              affects the reliability, safety and longevity of the installation. A poorly made joint
              can result in high-resistance connections (causing overheating and fire), insulation
              failure (causing earth faults or short circuits), or mechanical failure (allowing
              moisture ingress and eventual cable failure).
            </p>
            <p>
              BS 7671 Regulation 526.3 requires that every connection shall be accessible for
              inspection, testing and maintenance unless it is a joint designed to be buried in the
              ground, a joint in a compound-filled enclosure, or a connection between a cold tail
              and the heating element of a ceiling or floor heating system. This means most cable
              joints must be in accessible positions — typically in junction boxes, distribution
              boards or purpose-made joint enclosures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Straight joint construction — key steps">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prepare cable ends:</strong> strip the outer sheath, armour (if SWA),
                bedding and core insulation to the dimensions specified in the joint kit
                instructions.
              </li>
              <li>
                <strong>Clean and identify cores:</strong> clean all surfaces with the supplied
                solvent wipes. Apply colour identification sleeves to maintain phase identification.
              </li>
              <li>
                <strong>Connect conductors:</strong> use the supplied connector barrels, compression
                connectors or mechanical connectors. Ensure full conductor insertion and correct
                crimp/torque.
              </li>
              <li>
                <strong>Insulate individual cores:</strong> apply core insulation using heat shrink
                sleeves, cold shrink tubes, or self-amalgamating tape built up to the required
                thickness.
              </li>
              <li>
                <strong>Reconstruct armour continuity:</strong> for SWA cables, connect the armour
                wires across the joint using earth straps or the joint body.
              </li>
              <li>
                <strong>Apply outer protection:</strong> heat shrink, cold shrink or resin
                encapsulation to provide the overall mechanical and moisture protection.
              </li>
              <li>
                <strong>Test:</strong> insulation resistance, continuity, and visual inspection
                before burial or concealment.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Branch (tee) joint considerations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Through circuit integrity:</strong> the through cable must not be cut —
                individual cores are exposed for the branch connection.
              </li>
              <li>
                <strong>Branch connection:</strong> tap connectors or compression connectors join
                the branch conductors to the through conductors.
              </li>
              <li>
                <strong>Current rating:</strong> the branch connection and branch cable must be
                rated for the branch circuit current.
              </li>
              <li>
                <strong>Protection:</strong> the branch circuit must have appropriate overcurrent
                protection at or near the point of connection.
              </li>
              <li>
                <strong>Armour continuity:</strong> all three cable armours must be bonded together
                at the joint.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Heat shrink, cold shrink and resin technologies</ContentEyebrow>

          <ConceptBlock title="Heat shrink, cold shrink and resin joint technologies">
            <p>
              Three main technologies are used for cable jointing and termination in maintenance
              work: heat shrink, cold shrink and resin-filled joints. Each has specific advantages
              and applications, and the maintenance technician must understand when to use each
              technology and the correct installation procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Joint technology comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">Heat shrink</th>
                    <th className="py-2 pr-4 font-medium text-white">Cold shrink</th>
                    <th className="py-2 font-medium text-white">Resin</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Heat source needed</td>
                    <td className="py-2 pr-4">Yes — gas torch or heat gun</td>
                    <td className="py-2 pr-4">No</td>
                    <td className="py-2">No</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Suitable for hazardous areas</td>
                    <td className="py-2 pr-4">Restricted — open flame risk</td>
                    <td className="py-2 pr-4">Yes</td>
                    <td className="py-2">Yes (once cured)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Moisture resistance</td>
                    <td className="py-2 pr-4">Good</td>
                    <td className="py-2 pr-4">Excellent</td>
                    <td className="py-2">Excellent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Reusable/repairable</td>
                    <td className="py-2 pr-4">No</td>
                    <td className="py-2 pr-4">No (but removable)</td>
                    <td className="py-2">No (permanent)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Best application</td>
                    <td className="py-2 pr-4">General LV/MV joints</td>
                    <td className="py-2 pr-4">MV terminations, confined spaces</td>
                    <td className="py-2">Underground, submerged joints</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              When applying heat shrink materials, always work from the centre outward to expel air
              and moisture. Use a rotating motion to apply heat evenly around the circumference.
              Avoid overheating — the material should shrink smoothly without bubbling, burning or
              becoming brittle. Look for adhesive &apos;squeeze-out&apos; at the ends of
              adhesive-lined heat shrink, which confirms a complete seal. Allow adequate cooling
              before handling or applying mechanical stress to the joint.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>SWA gland and multicore cable termination</ContentEyebrow>

          <ConceptBlock title="SWA gland termination and multicore cable termination">
            <p>
              Steel wire armoured (SWA) cables are the most commonly used power cables in UK
              commercial and industrial installations. Correct gland termination is essential for
              mechanical retention of the cable, maintenance of the IP rating of the enclosure, and
              continuity of the earth path through the cable armour to the earthing system.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SWA gland installation procedure (CW type)">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measure and mark:</strong> refer to the gland installation dimensions for
                the cable size. Mark the outer sheath strip, armour strip and inner sheath strip
                positions.
              </li>
              <li>
                <strong>Strip outer sheath:</strong> score carefully around the cable, taking care
                not to cut into the armour wires. Remove the sheath cleanly.
              </li>
              <li>
                <strong>Fit back nut:</strong> thread the gland back nut over the cable before
                cutting the armour.
              </li>
              <li>
                <strong>Cut armour wires:</strong> cut each wire individually with armour wire
                cutters. Fan the wires outward evenly around the circumference.
              </li>
              <li>
                <strong>Remove bedding:</strong> strip the bedding (inner sheath) to expose the
                cores.
              </li>
              <li>
                <strong>Fit gland body:</strong> slide the gland body over the fanned armour wires
                into the enclosure knockout. Secure with the gland locknut inside the enclosure.
              </li>
              <li>
                <strong>Cone and compression:</strong> fit the cone over the armour wires, then
                tighten the back nut to compress the armour wires between the cone and the gland
                body.
              </li>
              <li>
                <strong>Earth tag:</strong> if an external earth is required, fit the earth tag
                between the locknut and the enclosure.
              </li>
              <li>
                <strong>Verify:</strong> check the armour is firmly clamped (cable cannot be pulled
                out), earth continuity is confirmed, and the seal is complete.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Multicore cable core identification (BS 7671)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single phase:</strong> brown (line), blue (neutral), green/yellow (earth) —
                or grey (line), black (neutral) for older installations.
              </li>
              <li>
                <strong>Three phase:</strong> brown (L1), black (L2), grey (L3), blue (N),
                green/yellow (earth).
              </li>
              <li>
                <strong>SWA with reduced cores:</strong> if the cable has fewer colours, heat shrink
                sleeves of the correct colour must be applied at each termination point.
              </li>
              <li>
                <strong>Control cables:</strong> core numbering is used — reference cable schedule
                for identification.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Crimping, torque and post-jointing testing</ContentEyebrow>

          <ConceptBlock title="Crimping techniques, torque requirements and post-jointing testing">
            <p>
              The quality of electrical connections is determined by the method of making the
              connection and the force applied. Crimping and torquing are the two primary methods of
              creating reliable, low-resistance connections. Both require the correct tools and
              technique — improvisation with incorrect tools is a leading cause of connection
              failures, overheating and fires.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Crimping best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tool selection:</strong> use a calibrated crimp tool with interchangeable
                dies matched to the terminal type and conductor size.
              </li>
              <li>
                <strong>Conductor preparation:</strong> strip insulation to the correct length — no
                more, no less. Clean the conductor if corroded.
              </li>
              <li>
                <strong>Terminal selection:</strong> match the terminal&apos;s barrel size to the
                conductor cross-sectional area. Colour-coded terminals: red (0.5-1.5 mm²), blue
                (1.5-2.5 mm²), yellow (4-6 mm²).
              </li>
              <li>
                <strong>Full insertion:</strong> the conductor must be fully inserted into the crimp
                barrel — verify by checking through the inspection window.
              </li>
              <li>
                <strong>Crimp position:</strong> crimp in the barrel zone only, not on the
                insulation grip or the transition zone.
              </li>
              <li>
                <strong>Verification:</strong> the completed crimp should be symmetrical, with no
                cracks, and should not rotate or pull off the conductor under moderate manual force.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Torque requirements for common terminals">
            <p>
              Torque values vary by manufacturer and terminal type. Always refer to the specific
              manufacturer&apos;s data. The following are typical ranges for guidance:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>M3.5 terminals (MCBs, RCDs):</strong> 1.2-2.0 Nm typically.
              </li>
              <li>
                <strong>M4 terminals (small contactors, relays):</strong> 1.5-2.5 Nm typically.
              </li>
              <li>
                <strong>M5 terminals (distribution equipment):</strong> 2.5-4.0 Nm typically.
              </li>
              <li>
                <strong>M6 terminals (switchgear, busbars):</strong> 4.0-8.0 Nm typically.
              </li>
              <li>
                <strong>M8-M10 terminals (HV equipment):</strong> 10-25 Nm typically.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Post-jointing test requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation resistance:</strong> test between all conductors and earth, and
                between conductors. Minimum 1.0 MΩ at 500 V DC for LV circuits (BS 7671 Table 64).
              </li>
              <li>
                <strong>Continuity:</strong> measure and record the resistance of each conductor
                through the joint. Compare with calculated values to confirm correct connection.
              </li>
              <li>
                <strong>Earth continuity:</strong> for SWA cables, verify the armour continuity
                through the joint and confirm the gland earth connection.
              </li>
              <li>
                <strong>Visual inspection:</strong> check for exposed conductors, correct sealing,
                mechanical integrity, correct phase identification, and overall workmanship.
              </li>
              <li>
                <strong>High-voltage test (MV joints):</strong> for medium voltage joints, a DC
                withstand test or VLF test may be required per the joint manufacturer&apos;s
                commissioning procedure.
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> cable jointing and termination is a core practical
              competence for maintenance technicians. The ability to produce reliable, safe and
              correctly tested cable joints is essential for maintaining the integrity of electrical
              installations and preventing faults, fires and injuries.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Cable Jointing and Termination"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Component Removal and Replacement
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Use of Approved Spare Parts
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section4_3;
