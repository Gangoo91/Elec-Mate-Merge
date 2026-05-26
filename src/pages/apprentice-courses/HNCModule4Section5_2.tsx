/**
 * Module 4 · Section 5 · Subsection 2 — Distribution Board Design
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Ways calculation, diversity factor application (BS 7671 Appendix 1), Regulation
 *   514.9 labelling, three-phase load balancing, mounting heights and IP ratings for
 *   final distribution boards.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Distribution Board Design - HNC Module 4 Section 5.2';
const DESCRIPTION =
  'Master distribution board design for building services: ways calculation, diversity application, labelling requirements (Reg 514), access requirements and IP ratings.';

const quickCheckQuestions = [
  {
    id: 'ways-calc',
    question:
      'A commercial building has 45 lighting circuits and 60 power circuits. With 20% spare, how many ways minimum?',
    options: [
      '105 ways',
      '126 ways',
      '130 ways',
      '115 ways',
    ],
    correctIndex: 1,
    explanation:
      'Total circuits = 45 + 60 = 105. With 20% spare: 105 × 1.2 = 126 ways. Always round up to accommodate future expansion.',
  },
  {
    id: 'diversity',
    question: 'What diversity factor is typically applied to general socket outlets in offices?',
    options: [
      '40%',
      '50%',
      '80%',
      '100%',
    ],
    correctIndex: 0,
    explanation:
      'Office socket outlets typically use 40% diversity (0.4) as not all sockets are used simultaneously. First 10A at 100%, remainder at 40% per BS 7671 guidance.',
  },
  {
    id: 'labelling',
    question: 'Which BS 7671 Regulation requires circuit identification at distribution boards?',
    options: [
      'Regulation 411',
      'Regulation 514.9',
      'Regulation 537',
      'Regulation 611',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 514.9 requires durable labels identifying each circuit. Labels must be legible, suitably positioned and durable for the expected life of the installation.',
  },
  {
    id: 'access',
    question: 'What is the minimum mounting height for distribution boards in general areas?',
    options: [
      '300mm',
      '1400mm',
      '1000mm',
      '450mm',
    ],
    correctIndex: 3,
    explanation:
      'DBs should be mounted with operating handles between 450mm and 1200mm from floor level for accessibility. The 450mm minimum prevents difficult low-level operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary function of a distribution board?',
    options: [
      'Potentially dangerous - urgent remedial action required',
      'To distribute power to final circuits with individual protection',
      'To reduce touch voltage between simultaneously accessible conductive parts',
      'Industrial distribution boards, motor circuits and commercial switchgear',
    ],
    correctAnswer: 1,
    explanation:
      'Distribution boards (DBs) receive power from sub-mains and distribute it to final circuits (lighting, sockets, fixed equipment), with each circuit protected by its own device (MCB/RCBO).',
  },
  {
    id: 2,
    question:
      'When calculating ways for a three-phase board, how are single-phase circuits counted?',
    options: [
      'To minimise neutral current and prevent overloading',
      'When dead testing is not practicable',
      'Each counts as 1 way on its allocated phase',
      'Drawings showing what was actually installed',
    ],
    correctAnswer: 2,
    explanation:
      'Single-phase circuits occupy 1 way on their allocated phase. A three-phase board with 12 ways per phase provides 36 single-pole ways total, which must be balanced across phases.',
  },
  {
    id: 3,
    question: 'What should be labelled according to Regulation 514.9.1?',
    options: [
      'A goal focused on the type of person you want to become',
      'Checking common failure points before rare ones',
      'Prosecute employees who refuse to lift',
      'Type of circuit, circuit reference and RCD info',
    ],
    correctAnswer: 3,
    explanation:
      'Labels must identify the circuit reference (number/name), type of wiring, nominal current rating, and which RCD protects each circuit. This enables safe isolation and maintenance.',
  },
  {
    id: 4,
    question: 'Why is phase balancing important in three-phase distribution boards?',
    options: [
      'To minimise neutral current and prevent overloading',
      'Keep communications cables separate from mains power cables',
      'Legal requirement and proof of compliance',
      'Non-combustible material or metal enclosure',
    ],
    correctAnswer: 0,
    explanation:
      'Unbalanced phases cause neutral current flow, potentially overloading the neutral conductor. Good balance keeps neutral current low and ensures equal loading of supply phases.',
  },
  {
    id: 5,
    question: 'What diversity factor applies to cooking appliances in commercial kitchens?',
    options: [
      'First 10A at 100%, 30% remainder',
      '75% of connected load',
      '50% of all appliances',
      '100% of all appliances',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial cooking diversity varies by application, but typically 75-80% of connected load is used as kitchen equipment operates simultaneously during service periods.',
  },
  {
    id: 6,
    question: 'What is the purpose of cable entry arrangements in distribution boards?',
    options: [
      'Environmental conditions and temperature',
      '"Safety Electrical Connection — Do Not Remove"',
      'To maintain IP rating and prevent vermin ingress',
      'Show sizes, support spacing, and load capacity information',
    ],
    correctAnswer: 2,
    explanation:
      'Proper cable entry (glands, grommets, blanking plates) maintains the enclosure IP rating, prevents rodent/insect ingress, and ensures mechanical protection of cables at entry points.',
  },
  {
    id: 7,
    question: 'When must RCD protection be provided at distribution boards?',
    options: [
      'Average performance over a heating season',
      'Specific training in fire alarm systems to BS 5839',
      'Access restrictions and conservation requirements',
      'For all socket outlets up to 32A in most locations',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires 30mA RCD protection for socket outlets up to 32A intended for general use, mobile equipment outdoors, and cables installed in walls without earthed protection.',
  },
  {
    id: 8,
    question: 'What spacing is typically required between adjacent distribution boards?',
    options: [
      '300mm minimum for ventilation',
      '50% of rated residual current',
      'Torque decreases as flux weakens',
      'Safety for emergency responders',
    ],
    correctAnswer: 0,
    explanation:
      '300mm spacing between boards aids heat dissipation and provides working space for cable installation. Manufacturers specify minimum spacings for thermal management.',
  },
  {
    id: 9,
    question:
      'Which IP rating is typically required for distribution boards in a bathroom outside zones?',
    options: [
      'IP65',
      'IP44',
      'IP2X',
      'IP4X',
    ],
    correctIndex: 1,
    explanation:
      'Outside bathroom zones 0, 1 and 2, equipment should be at least IPX1 for splash protection. IP44 is commonly specified for bathrooms to protect against splashing water.',
  },
  {
    id: 10,
    question: 'What information must be displayed at the origin of an installation?',
    options: [
      'To prevent overcrowding, damage, and theft',
      'The British Standards Institution (BSI)',
      'Maximum demand, earthing type, and nominal voltage',
      'At least 1.6 times the downstream fuse rating',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 514.9.1 requires display of nominal voltage, earthing system type (TN-S, TN-C-S, TT), maximum demand, and protective device characteristics at the origin.',
  },
];

const faqs = [
  {
    question: 'How do I calculate the number of ways needed for a distribution board?',
    answer:
      'Count all circuits required (lighting, power, fixed equipment, spares). Add 20-30% spare ways for future expansion. For three-phase boards, ensure balanced phase allocation and count three-phase circuits as 3 ways. Round up to the nearest standard board size (typically 12, 18, 24, or 36 way for single-phase).',
  },
  {
    question: 'What is the difference between TPN and TP+N distribution boards?',
    answer:
      'TPN (Triple Pole and Neutral) boards have outgoing devices that switch all three phases plus neutral. TP+N (Triple Pole plus Neutral) boards switch three phases only - neutral is continuous through busbar. TPN provides additional safety for maintenance but costs more.',
  },
  {
    question: 'How should circuits be allocated across phases in a three-phase board?',
    answer:
      'Balance loads as evenly as possible across phases. Group similar circuit types on the same phase where practical (e.g., all floor 1 lighting on L1). Keep critical circuits on different phases for resilience. Document phase allocation on the distribution board schedule.',
  },
  {
    question: 'What are the mounting height requirements for accessibility?',
    answer:
      'Operating handles should be between 450mm and 1200mm from finished floor level for general accessibility. The 1200mm maximum complies with disability access requirements. In areas with restricted access (plant rooms), higher mounting may be acceptable with appropriate risk assessment.',
  },
];

const HNCModule4Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 2"
            title="Distribution Board Design"
            description="Designing distribution systems for reliable final circuit protection and power delivery."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Calculate number of ways required including future expansion',
              'Apply diversity factors to reduce maximum demand',
              'Specify labelling to comply with Regulation 514',
              'Design for accessibility and safe operation',
              'Select appropriate IP ratings for different environments',
              'Balance phase loads in three-phase distribution',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Way count = current circuits + 20–30 % spare. Three-phase boards add complexity around phase balance — keep single-phase totals within 10 % of each other.',
              'Diversity from On-Site Guide Appendix A is the engineer’s tool to right-size sub-mains. Diversity is not optional — it’s how you avoid grossly oversized cables.',
              'Phase balance: aim for ≤ 10 % imbalance between L1, L2, L3. Worst case the neutral carries the difference (and on third-harmonic-rich loads, a lot more).',
              'Labelling per Section 514: every way unambiguously labelled at the device, plus a printed/laminated circuit chart inside the cover and the periodic-inspection notice (Reg 514.12.1) outside.',
              'Pick the IP rating from the actual location (cleaner store IP4X / IP41 minimum, plant room IP54), and the IK rating from the impact risk.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.12.1"
            clause="An instruction notice of such durable material as to be likely to remain easily legible throughout the life of the installation shall be fixed in a prominent position at or near the relevant distribution board or boards upon completion of the work carried out in accordance with Chapter 64 or 65 as applicable. The notice shall be clearly and durably marked and shall read as follows: Important — This installation should be periodically inspected and tested and a report on its condition obtained, as prescribed in BS 7671 Requirements for Electrical Installations. Date of last inspection ............ Recommended date of next inspection ............"
            meaning={
              <>
                Reg 514.12.1 is a design deliverable, not an electrician’s afterthought. Your DB
                schedule has to call for a durable periodic-inspection notice on every board — fix
                method, location, wording. It’s how the next dutyholder knows when their EICR is
                due. The exception for domestic premises applies, but commercial/industrial DBs
                always carry the notice.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 514.12.1."
          />

          <SectionRule />

          <ConceptBlock title="Ways Calculation">
            <p>
              Correctly sizing distribution boards ensures adequate capacity for current
              requirements and future expansion. Under-sizing leads to expensive modifications;
              over-sizing wastes resources and space.
            </p>
            <p>
              <strong>Steps for calculating ways:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Count all lighting circuits (typically 1 per 100m² in offices)</li>
              <li>Count all power circuits (socket outlets, fixed equipment)</li>
              <li>Add dedicated circuits (air conditioning, water heaters, etc.)</li>
              <li>Include essential/emergency circuits if applicable</li>
              <li>Add 20-30% spare capacity for future expansion</li>
            </ul>
            <p>
              <strong>Standard distribution board sizes (type / common sizes / typical application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-phase consumer unit — 12, 16, 18, 21 way — domestic, small commercial</li>
              <li>Single-phase distribution board — 12, 18, 24, 36 way — commercial floor DBs</li>
              <li>Three-phase TPN board — 12, 18, 24 way per phase — commercial, industrial</li>
              <li>Panelboard — up to 72 way — large commercial, data centres</li>
            </ul>
            <p>
              <strong>Design tip:</strong> Always round up to the next standard size. The cost
              difference is minimal compared to future modification costs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Diversity Application">
            <p>
              Diversity factors account for the fact that not all connected loads operate
              simultaneously at full capacity. Applying diversity correctly reduces cable sizes,
              switchgear ratings, and ultimately project costs.
            </p>
            <p>
              <strong>Diversity factors per BS 7671 Appendix 1 (circuit type / diversity factor / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting — 66% (0.66) — office/commercial areas</li>
              <li>Socket outlets (first 10A) — 100% — minimum demand</li>
              <li>Socket outlets (remainder) — 40% (0.4) — offices, general areas</li>
              <li>Cooking appliances — first 10A + 30% remainder — domestic cooking</li>
              <li>Water heating — 100% — continuous loads</li>
              <li>Air conditioning — 80-100% — depends on building use</li>
            </ul>
            <p>
              <strong>Diversity calculation example — office floor 200m²:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Lighting: 2.4kW connected × 0.66 = <strong>1.58kW</strong>
              </li>
              <li>Sockets: First 10A = 2.3kW, remainder 8kW × 0.4 = 3.2kW</li>
              <li>
                Total sockets: <strong>5.5kW</strong>
              </li>
              <li>
                Air conditioning: 4kW × 0.8 = <strong>3.2kW</strong>
              </li>
              <li>
                Maximum demand: <strong>10.28kW (45A at 230V)</strong>
              </li>
            </ul>
            <p>
              <strong>Caution:</strong> Do not apply diversity to single-circuit loads or where
              loads are known to operate continuously.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Labelling Requirements (Regulation 514)">
            <p>
              Clear, durable labelling is essential for safe operation and maintenance. BS 7671
              Regulation 514.9 specifies requirements for circuit identification that enable safe
              isolation and fault finding.
            </p>
            <p>
              <strong>Regulation 514.9 requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Every circuit must be identified at the distribution board</li>
              <li>Labels must be legible and suitably positioned</li>
              <li>Labels must be durable for the expected life of installation</li>
              <li>Circuit charts should be fixed within or adjacent to the DB</li>
              <li>RCD coverage must be clearly indicated</li>
            </ul>
            <p>
              <strong>Distribution board schedule content (column / information required):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit number:</strong> Sequential reference (1, 2, 3...)
              </li>
              <li>
                <strong>Circuit description:</strong> Location and type (e.g., "Floor 1 Lighting")
              </li>
              <li>
                <strong>Protective device:</strong> Type and rating (e.g., MCB 16A Type B)
              </li>
              <li>
                <strong>Cable size:</strong> CSA and type (e.g., 2.5mm² T+E)
              </li>
              <li>
                <strong>Load:</strong> Design current (Amps)
              </li>
              <li>
                <strong>RCD:</strong> Which RCD protects the circuit
              </li>
              <li>
                <strong>Phase:</strong> L1, L2, L3 for three-phase boards
              </li>
            </ul>
            <p>
              <strong>Warning labels required:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"Safety Electrical Connection - Do Not Remove"</li>
              <li>RCD test notice (test quarterly)</li>
              <li>Dual supply warning where applicable</li>
              <li>Periodic inspection due date</li>
            </ul>
            <p>
              <strong>Label durability:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Engraved or printed plastic labels</li>
              <li>UV-resistant for external locations</li>
              <li>Fixed with screws or permanent adhesive</li>
              <li>Handwritten labels not acceptable</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Use laminated circuit charts in clear pockets attached
              inside DB doors. Update whenever circuits change.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Access Requirements and IP Ratings">
            <p>
              Distribution boards must be accessible for safe operation and maintenance while being
              protected from environmental hazards. Correct positioning and IP rating selection
              ensures long-term reliability.
            </p>
            <p>
              <strong>Mounting height guidelines (aspect / requirement / reason):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum height — 450mm to lowest device — avoid low-level operation</li>
              <li>Maximum height — 1200mm to highest device — accessibility compliance</li>
              <li>Ideal operating height — 900-1000mm to main switch — comfortable operation</li>
              <li>Front clearance — 700mm minimum — safe working space</li>
            </ul>
            <p>
              <strong>IP ratings for different locations (location / minimum IP / considerations):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office electrical cupboard — IP2X — basic finger protection</li>
              <li>Corridor/circulation — IP3X — protection from tools</li>
              <li>Plant room — IP4X to IP54 — dust and possible splash</li>
              <li>Kitchen — IP55 — wash-down cleaning</li>
              <li>External (covered) — IP55 — rain and dust</li>
              <li>External (exposed) — IP65 — full weather exposure</li>
            </ul>
            <p>
              <strong>Accessibility note:</strong> Consider users with disabilities — ensure clear
              approach route, adequate lighting, and handles operable with one hand.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — DB sizing for office floor:</strong> Design a distribution board
              for a 400m² office floor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 400m² ÷ 100m² per circuit = 4 circuits</li>
              <li>Power: 400m² ÷ 50m² per circuit = 8 circuits</li>
              <li>Dedicated: 2 (server room, kitchen)</li>
              <li>Total circuits: 14</li>
              <li>With 25% spare: 14 × 1.25 = 17.5</li>
              <li>
                Specification: <strong>18-way single-phase DB</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — three-phase load balancing:</strong> Allocate circuits to achieve
              balanced phases.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Available: lighting 3 × 6A circuits (18A total)</li>
              <li>Available: sockets 6 × 20A circuits (120A total)</li>
              <li>Available: HVAC 2 × 16A three-phase loads</li>
              <li>L1: 1 lighting (6A) + 2 sockets (40A) = 46A</li>
              <li>L2: 1 lighting (6A) + 2 sockets (40A) = 46A</li>
              <li>L3: 1 lighting (6A) + 2 sockets (40A) = 46A</li>
              <li>
                <strong>Balanced within 5% — acceptable</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3 — maximum demand with diversity:</strong> Calculate maximum demand
              for incoming cable sizing.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 6kW × 0.66 = 3.96kW</li>
              <li>Sockets: First 10A (2.3kW) + (30A × 0.4 × 0.23) = 5.06kW</li>
              <li>Server room: 4kW × 1.0 = 4.00kW</li>
              <li>HVAC: 8kW × 0.8 = 6.40kW</li>
              <li>
                Maximum demand: <strong>19.42kW</strong>
              </li>
              <li>
                Current at 230V: 19420 ÷ 230 = <strong>84.4A</strong> — specify 100A incoming device
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>RCD configuration:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Split circuits between multiple RCDs to avoid total loss</li>
              <li>Keep lighting and power on separate RCDs</li>
              <li>Consider RCBOs for critical circuits</li>
              <li>Type A RCDs for general use, Type B for VFDs</li>
            </ul>
            <p>
              <strong>Design checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify fault rating matches prospective fault current</li>
              <li>Confirm IP rating suits the environment</li>
              <li>Check mounting height for accessibility</li>
              <li>Ensure 700mm working clearance</li>
              <li>Include spare ways for future expansion</li>
              <li>Specify circuit chart and labelling requirements</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Minimum mounting height: <strong>450mm</strong>
              </li>
              <li>
                Maximum mounting height: <strong>1200mm</strong>
              </li>
              <li>
                Ideal operating height: <strong>900-1000mm</strong>
              </li>
              <li>
                Front clearance: <strong>700mm minimum</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common design errors"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>No spare ways</strong> — always include 20-30% spare
                </li>
                <li>
                  <strong>Unbalanced phases</strong> — check phase allocation
                </li>
                <li>
                  <strong>Single RCD</strong> — split loads to prevent total blackout
                </li>
                <li>
                  <strong>Poor labelling</strong> — specify durable, clear labels
                </li>
              </ul>
            }
            doInstead="Build in 20-30% spare ways, balance the phase allocation on the schedule, split loads across multiple RCDs (or use RCBOs for critical circuits), and specify engraved or printed labels with a laminated circuit chart that can be kept up to date."
          />

          <SectionRule />

          <Scenario
            title="36-way TP+N DB — sizing, balancing and labelling"
            situation={
              <>
                You’re designing a 36-way TP+N distribution board for a medium-sized office floor.
                Lighting, small power, mechanical services, IT comms cabinet, hand dryers, AC
                FCUs. Spare capacity for a future tea-point. 400 V incomer, 250 A. Loads schedule
                is in Excel. The contractor wants a single-line diagram and labelling spec by end
                of week.
              </>
            }
            whatToDo={
              <>
                Sum the active circuits: 27 used + 9 spare (25 % headroom) = 36 ways. Apply OSG
                Appendix A diversity to the lighting (90 %) and small power (40 % beyond the
                first), AC FCUs full load. Phase balance: walk down the schedule and rotate
                circuits across L1/L2/L3 so each phase carries 80–90 A on the maximum-demand
                calc. Specify Type B RCBOs (30 mA) on every circuit — granular protection beats a
                board-level RCD that nuisance-trips half the office. Spec engraved Traffolyte way
                labels, plus a printed and laminated circuit chart inside the door, plus the Reg
                514.12.1 periodic-inspection notice on the door front. Add Reg 514.15.1 warning
                notice if there’s a backup source. Single-line diagram references the BS EN 61439
                board reference and the form-of-separation drawing.
              </>
            }
            whyItMatters={
              <>
                A 36-way board with no spare ways becomes a £4 k modification when the client adds
                a coffee point. A board with 30 % imbalance trips the protective device on the
                heaviest phase first. A board without a 514.12.1 notice fails the next EICR.
                Design choices, not site choices.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Way count = current circuits + 20–30 % spare. Build in headroom or pay for it later.',
              'Diversity per OSG Appendix A — the right-sizing tool for sub-mains and the incomer.',
              'Phase balance ≤ 10 % imbalance — neutral current and equipment heating both depend on it.',
              'RCBOs over board-level RCDs in commercial — granular tripping, faster fault-finding.',
              'IP rating from environment, IK from impact risk — surface-mounted in a corridor needs IK08+.',
              'Section 514 labelling: way labels (514.1.1), circuit chart (514.9), periodic-inspection notice (514.12.1).',
              'Single-line diagram on the inside of the door + laminated circuit chart — keeps the FM team honest.',
              'For boards with alternative supplies (PV, generator, battery), add Reg 514.15.1 warning notices at every isolation point.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                LV switchgear selection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Busbar systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section5_2;
