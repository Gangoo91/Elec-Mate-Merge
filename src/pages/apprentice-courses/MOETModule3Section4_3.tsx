/**
 * MOET · Module 3 · Section 3.4 · Subsection 3 — Socket Outlet and Small Power Circuits
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Functions and applications of electrical circuits."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
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

const TITLE = 'Socket Outlet and Small Power Circuits - MOET Module 3.4.3';
const DESCRIPTION =
  'Comprehensive guide to socket outlet and small power circuits for maintenance technicians: ring final circuits, radial circuits, spur rules, socket types, RCD protection, BS 1363, ring continuity testing, FCUs and dedicated circuits under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'ring-final',
    question: 'What distinguishes a ring final circuit from a radial circuit?',
    options: [
      'A ring circuit must always be protected by a 20 A device, a radial by a 32 A device',
      'A ring circuit can only supply socket outlets, whereas a radial can supply lighting too',
      'A ring circuit has cable that starts and finishes at the same terminals in the consumer unit',
      'A ring circuit requires three conductors per cable, a radial requires only two',
    ],
    correctIndex: 2,
    explanation:
      'A ring final circuit has both ends of the line, neutral and earth conductors connected to the same terminals at the origin (consumer unit or distribution board), forming a continuous ring. This means current can flow in both directions around the ring, effectively sharing the load between two parallel paths and allowing the use of smaller cable (2.5 mm²) for higher loads.',
  },
  {
    id: 'spur-rule',
    question: 'Under BS 7671, how many non-fused spurs may be connected to a ring final circuit?',
    options: [
      'One non-fused spur per socket outlet or junction box on the ring',
      'An unlimited number, provided the total load does not exceed 32 A',
      'No more than two per socket outlet on the ring',
      'No non-fused spurs are permitted',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 permits one non-fused spur from each socket outlet or junction box on the ring. Each non-fused spur can supply one single or one twin socket outlet (or one fused connection unit). Non-fused spurs must be wired in cable of the same size as the ring cable (2.5 mm²). The total number of non-fused spurs should not exceed the number of socket outlets and fixed appliances connected directly on the ring.',
  },
  {
    id: 'rcd-protection',
    question:
      'Under BS 7671:2018+A4:2026, what additional protection is required for socket outlets rated up to 32 A in all locations?',
    options: [
      'An RCD with a rated residual operating current not exceeding 100 mA',
      'An RCBO or RCD with a rated residual operating current not exceeding 30 mA',
      'A time-delayed (Type S) RCD to provide discrimination with the main switch',
      'A surge protection device installed at the origin of the installation',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 411.3.3 of BS 7671:2018+A4:2026 requires that socket outlets with a rated current not exceeding 32 A are provided with additional protection by an RCD with a rated residual operating current (IΔn) not exceeding 30 mA. This applies to all locations, not just domestic premises. The RCD provides additional protection against electric shock in the event of a direct contact fault.',
  },
  {
    id: 'ring-test',
    question: 'What is the purpose of the R1+R2 ring continuity test on a ring final circuit?',
    options: [
      'To confirm the insulation resistance between live conductors meets the minimum value',
      'To verify that the RCD disconnects within the required time at its rated current',
      'To measure the prospective short-circuit current at the consumer unit',
      'To confirm the ring is continuous and to measure the earth fault loop impedance at each socket',
    ],
    correctIndex: 3,
    explanation:
      'The R1+R2 ring continuity test confirms that the ring is continuous (no breaks in the line, neutral or earth conductors) and provides the R1+R2 value at each socket outlet on the ring. This value, when added to the external earth fault loop impedance (Ze), gives the total earth fault loop impedance (Zs) at each point, which must not exceed the maximum value for the protective device to disconnect within the required time.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A ring final circuit protected by a 32 A MCB is typically wired in which cable size?',
    options: [
      '1.5 mm² twin and earth',
      '2.5 mm² twin and earth',
      '4.0 mm² twin and earth',
      '6.0 mm² twin and earth',
    ],
    correctAnswer: 1,
    explanation:
      'A standard ring final circuit protected by a 32 A MCB is wired in 2.5 mm² twin and earth cable. The ring configuration allows current to flow in both directions, effectively providing two parallel 2.5 mm² paths. This gives the ring a current-carrying capacity well in excess of 32 A under normal balanced load conditions.',
  },
  {
    id: 2,
    question:
      'What is the maximum floor area that a single ring final circuit should serve in a domestic installation?',
    options: ['There is no specific limit in BS 7671', '50 m²', '100 m²', '75 m²'],
    correctAnswer: 2,
    explanation:
      'The IET On-Site Guide recommends that a single ring final circuit should serve a floor area not exceeding 100 m² in domestic premises. For floor areas exceeding 100 m², additional ring circuits or radial circuits should be installed. This guideline helps ensure that the circuit is not overloaded and that fault loop impedance values remain within acceptable limits.',
  },
  {
    id: 3,
    question:
      'A radial circuit serving socket outlets up to 20 A should be wired in a minimum cable size of:',
    options: ['4.0 mm²', '1.5 mm²', '1.0 mm²', '2.5 mm²'],
    correctAnswer: 3,
    explanation:
      'A radial circuit protected by a 20 A device should be wired in a minimum of 2.5 mm² cable (for the reference installation method). The actual cable size depends on the installation method, grouping factors, ambient temperature and volt drop. For a 32 A radial circuit, a minimum of 4.0 mm² cable is typically required.',
  },
  {
    id: 4,
    question: 'A fused spur from a ring final circuit is connected via a:',
    options: [
      'Fused connection unit (FCU) fitted with a 3 A or 13 A fuse',
      'Junction box with a 30 mA RCD built into the terminal block',
      'Double-pole isolating switch rated at 45 A',
      'Standard 13 A socket outlet wired in 1.0 mm² cable',
    ],
    correctAnswer: 0,
    explanation:
      'A fused spur is connected via a fused connection unit (FCU) which contains a BS 1362 cartridge fuse (typically 3 A or 13 A). The fuse in the FCU protects the spur cable and the connected load. Any number of fused spurs may be connected to a ring circuit (unlike non-fused spurs, which are limited to one per point on the ring). The cable on the load side of the FCU can be reduced to 1.0 mm² or 1.5 mm² if protected by a 3 A fuse.',
  },
  {
    id: 5,
    question: 'BS 1363 specifies the requirements for:',
    options: [
      'Circuit breakers and fuses',
      '13 A plugs, socket outlets and adaptors',
      'Earth fault loop impedance testing',
      'Emergency lighting systems',
    ],
    correctAnswer: 1,
    explanation:
      'BS 1363 specifies the requirements for 13 A plugs, socket outlets, connection units and adaptors used in the UK. It defines the physical dimensions, pin configuration, fuse requirements (BS 1362), shuttered socket outlets, and safety requirements. All 13 A socket outlets must be shuttered to prevent children inserting objects into the live and neutral apertures.',
  },
  {
    id: 6,
    question:
      'Which of the following socket outlet types would be used for a three-phase industrial supply?',
    options: [
      'BS 1363 (13 A rectangular-pin) socket',
      'BS 546 (round-pin) socket',
      'BS EN 60309-2 (commando/CEE) socket',
      'BS 1363-2 (combined socket and USB) outlet',
    ],
    correctAnswer: 2,
    explanation:
      "BS EN 60309-2 (commonly known as 'commando' or CEE sockets) are industrial socket outlets designed for single-phase and three-phase supplies at various current ratings (16 A, 32 A, 63 A, 125 A). They use a colour-coded system: blue for 230 V single-phase, red for 400 V three-phase, yellow for 110 V reduced voltage. The pin configuration prevents incorrect connection between different voltage supplies.",
  },
  {
    id: 7,
    question: 'During the ring continuity test, the cross-connection is made between:',
    options: [
      'The line conductor and the earth conductor of the same end of the ring',
      'Both ends of the line conductor, joined together at the consumer unit',
      'The neutral conductor and the earth conductor of the same end of the ring',
      'The line conductor of one end of the ring and the neutral conductor of the other end (and vice versa)',
    ],
    correctAnswer: 3,
    explanation:
      'The ring continuity test involves cross-connecting the line conductor of one end of the ring with the neutral of the other end, and vice versa. This creates a figure-of-eight configuration. When resistance is measured at each socket outlet, the reading should be substantially the same at each point (within approximately 0.05 ohms). A significantly higher reading indicates a fault or break in the ring.',
  },
  {
    id: 8,
    question: 'A dedicated circuit is required for which of the following appliances?',
    options: [
      'An electric cooker rated at 10 kW',
      'A table lamp rated at 60 W',
      'A wall-mounted clock on a 2 A round-pin supply',
      'A single twin socket outlet for general use',
    ],
    correctAnswer: 0,
    explanation:
      'Appliances with high power ratings, such as electric cookers (typically 6-12 kW), electric showers (7-10.8 kW), immersion heaters, and storage heaters, require dedicated circuits with appropriately rated cable, protection and, where applicable, a cooker control unit or double-pole switch. These loads are too large to be served from a ring final or general radial circuit.',
  },
  {
    id: 9,
    question: 'What is the purpose of shutters on a BS 1363 socket outlet?',
    options: [
      'To improve the electrical contact between the plug pins and the socket terminals',
      'To prevent the insertion of objects other than a correctly shaped plug pin',
      'To provide a degree of weatherproofing for outdoor socket outlets',
      'To indicate when the socket outlet is switched on by exposing a coloured marker',
    ],
    correctAnswer: 1,
    explanation:
      'Shutters on BS 1363 socket outlets prevent the insertion of foreign objects (such as fingers, screwdrivers or other conductive items) into the live and neutral apertures. The shutters are mechanically interlocked and only open when the longer earth pin of a BS 1363 plug is inserted first, which simultaneously opens the live and neutral shutters. This is a critical child safety feature.',
  },
  {
    id: 10,
    question: 'USB socket outlets installed in a ring final circuit must:',
    options: [
      'Be supplied from a separate dedicated radial circuit, never the ring',
      'Be fitted with their own individual 5 A fuse on the load side',
      'Be connected through an RCD and comply with the relevant product standard',
      'Be limited to a maximum of two USB outlets per ring final circuit',
    ],
    correctAnswer: 2,
    explanation:
      'USB socket outlets installed on a ring final circuit must comply with the relevant product standard (e.g., BS 1363-2 for combined 13 A socket/USB units) and be protected by the same 30 mA RCD required for all socket outlets up to 32 A. The USB power supply is integrated into the socket outlet and converts the 230 V mains to the low-voltage DC required by USB devices.',
  },
  {
    id: 11,
    question:
      'When testing a ring final circuit, what does a significantly higher R1+R2 reading at one socket indicate?',
    options: [
      'The insulation resistance at that socket is below the minimum value',
      'That socket is carrying more load than the others on the ring',
      'The RCD protecting the circuit is faulty and needs replacing',
      'The ring is broken at or near that point',
    ],
    correctAnswer: 3,
    explanation:
      'During the cross-connected ring continuity test, each socket should give a substantially similar R1+R2 reading. A significantly higher reading at one socket indicates that the ring is broken at or near that point, meaning the current has to travel via a longer single path rather than the shorter parallel paths of a complete ring. The break must be located and repaired.',
  },
  {
    id: 12,
    question: 'A 32 A radial circuit for socket outlets requires a minimum cable size of:',
    options: ['4.0 mm²', '10.0 mm²', '2.5 mm²', '6.0 mm²'],
    correctAnswer: 0,
    explanation:
      'A 32 A radial circuit requires a minimum cable size of 4.0 mm² twin and earth (for the reference installation method). Unlike a ring circuit where the current divides between two paths, a radial circuit carries the full load current on a single cable run. The 4.0 mm² cable has a current-carrying capacity that comfortably exceeds 32 A for most installation methods.',
  },
];

const faqs = [
  {
    question: 'How do I identify if a socket is on a ring or a spur?',
    answer:
      'At the socket outlet, you can visually check: if there are two sets of cables (four line, four neutral, and earth conductors — two in and two out), the socket is on the ring. If there is only one set of cables (one in), it is likely a spur. However, you cannot be certain from visual inspection alone — one cable could be a non-fused spur from another point on the ring. A ring continuity test (R1+R2 cross-connection test) is the definitive method to confirm the ring circuit integrity.',
  },
  {
    question: 'Can I add a spur to a spur on a ring final circuit?',
    answer:
      "No. BS 7671 does not permit a spur from a spur (sometimes called a 'double spur'). A non-fused spur must be connected directly to the ring at a socket outlet or junction box on the ring. If you need to extend from a spur, you must install a fused connection unit (FCU) at the junction to create a fused spur. This ensures the spur cable is properly protected.",
  },
  {
    question: 'Why are 110 V socket outlets used on construction sites?',
    answer:
      '110 V (centre-tapped earth) supplies are used on construction sites to reduce the risk of fatal electric shock. The centre-tap earthing arrangement means the maximum voltage to earth is only 55 V (half of 110 V), which is below the 50 V threshold considered dangerous under normal body resistance conditions. This arrangement is specified by BS 7671 and the HSE for temporary supplies on construction sites. The 110 V supply is typically provided by a portable step-down transformer.',
  },
  {
    question: 'What is the difference between a switched and an unswitched FCU?',
    answer:
      'A switched FCU has a built-in double-pole switch that allows the connected appliance to be isolated without removing the fuse or switching off the circuit at the consumer unit. This is required where the FCU is used as the local means of isolation for a fixed appliance (e.g., a boiler, extractor fan or water heater). An unswitched FCU has no switch — isolation requires removing the fuse or switching off the circuit. Unswitched FCUs are used where a separate local isolator is already provided.',
  },
  {
    question: 'Do I need RCD protection for all socket outlets, including in commercial premises?',
    answer:
      'As a rule, yes. BS 7671:2018+A4:2026 Regulation 411.3.3 requires additional protection by a 30 mA RCD for socket outlets with a rated current not exceeding 32 A, across domestic, commercial and industrial installations. A4:2026 revised the regulation and it now carries one express exception: other than for a dwelling, RCD protection may be omitted where a documented risk assessment determines it is not necessary. That exception is not available in dwellings, and the risk assessment must be recorded — an undocumented judgement on site does not satisfy it. Socket outlets rated above 32 A fall outside the scope of 411.3.3 and must be considered separately.',
  },
];

const MOETModule3Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.4 · Subsection 3"
        title="Socket Outlet and Small Power Circuits"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Ring finals, radial circuits, spur rules, socket types and testing.
          </p>

          <TLDR
            points={[
              'Ring final: 2.5 mm² cable, 32 A MCB, cable returns to origin.',
              'Radial: 2.5 mm² (20 A) or 4.0 mm² (32 A), terminates at last point.',
              'Spurs: One non-fused spur per point on the ring; unlimited fused spurs.',
              'RCD protection: 30 mA RCD required for all sockets up to 32 A.',
              'BS 7671:2018+A4:2026: Reg 411.3.3 — RCD protection for sockets.',
              'BS 1363: 13 A plugs, socket outlets and connection units.',
              'BS EN 60309-2: Industrial plugs and sockets (commando).',
              'ST1426: Install, test and maintain power circuits.',
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
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the operation and advantages of ring final and radial circuits',
              'State the rules for non-fused and fused spurs under BS 7671',
              'Identify socket outlet types for domestic, commercial and industrial applications',
              'Describe the RCD protection requirements for socket outlets',
              'Carry out the R1+R2 ring continuity test and interpret results',
              'Explain the purpose and application of FCUs and dedicated circuits',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Ring final and radial circuits</ContentEyebrow>

          <ConceptBlock
            title="Two parallel paths, or one"
            onSite="Always carry out the ring continuity test during periodic inspection to verify the ring is intact. Breaks are commonly found at socket outlets where connections have loosened or where previous alterations have been made incorrectly."
          >
            <p>
              The ring final circuit is a uniquely British arrangement that was introduced after the
              Second World War to reduce the amount of copper cable required in domestic wiring. By
              connecting both ends of the line, neutral and earth conductors to the same terminals
              at the consumer unit, current can flow in both directions around the ring, effectively
              providing two parallel paths and allowing smaller cable (2.5 mm²) to be used with a
              higher-rated protective device (32 A).
            </p>
            <p>
              Radial circuits, by contrast, run from the consumer unit to each outlet in sequence,
              terminating at the last point. They are simpler to design and install but require
              larger cable for the same protective device rating because the full load current flows
              through a single cable path.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Ring final circuit">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Cable: 2.5 mm² twin and earth</li>
              <li>Protection: 32 A Type B MCB</li>
              <li>Max floor area: 100 m² (domestic)</li>
              <li>Both ends terminate at the same MCB</li>
              <li>Current divides between two paths</li>
              <li>Requires ring continuity testing</li>
              <li>Non-fused spurs permitted (rules apply)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Radial circuit">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Cable: 2.5 mm² (20 A) or 4.0 mm² (32 A)</li>
              <li>Protection: 20 A or 32 A MCB</li>
              <li>Max floor area: 50 m² (20 A) or 75 m² (32 A)</li>
              <li>Terminates at last socket outlet</li>
              <li>Full load on single cable path</li>
              <li>Simpler to install and test</li>
              <li>Used where ring is impractical</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="A broken ring goes unnoticed"
            whatHappens={
              <>
                A ring final circuit with a break (disconnection) in one conductor effectively
                becomes a radial circuit, but with cable rated for ring circuit use (2.5 mm²) and a
                32 A protective device. This is a potentially dangerous condition because the full
                32 A could flow through the 2.5 mm² cable in a single path, which may exceed its
                current-carrying capacity depending on the installation method.
              </>
            }
            doInstead={
              <>
                This is why ring continuity testing is essential during periodic inspection and
                testing.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Spur rules and fused connection units</ContentEyebrow>

          <ConceptBlock title="Branch cables from a ring final circuit">
            <p>
              Spurs are branch cables taken from a ring final circuit to supply additional socket
              outlets or fixed appliances. BS 7671 defines strict rules for spurs to ensure that
              cables are adequately protected and that the ring circuit is not compromised.
              Understanding the difference between fused and non-fused spurs is essential for
              maintenance and alteration work.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Non-fused spurs"
            onSite="When adding a socket outlet to an existing ring circuit, always check whether the point you are connecting from is already a spur. Connecting a spur from a spur creates an unprotected extension and is a non-compliance with BS 7671."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Connected from a socket outlet or junction box on the ring (not from another spur)
              </li>
              <li>Cable must be the same size as the ring cable (2.5 mm²)</li>
              <li>May supply one single or one twin socket outlet, or one fused connection unit</li>
              <li>One non-fused spur per point on the ring</li>
              <li>Total non-fused spurs must not exceed the number of points on the ring</li>
              <li>No spur from a spur is permitted</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fused spurs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Connected via a fused connection unit (FCU) containing a BS 1362 fuse</li>
              <li>Any number of fused spurs may be connected to the ring</li>
              <li>Cable on the load side can be reduced (e.g., 1.0 mm² for a 3 A fuse)</li>
              <li>
                May supply any number of outlets or appliances, provided the total load does not
                exceed the fuse rating
              </li>
              <li>FCU can be switched or unswitched, with or without a neon indicator</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fused connection unit (FCU) applications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Boilers and heating controls:</strong> Switched FCU with 3 A fuse — provides
                local isolation
              </li>
              <li>
                <strong>Extractor fans:</strong> Switched FCU, often combined with an isolating
                switch in the bathroom
              </li>
              <li>
                <strong>Towel rails and heaters:</strong> Switched FCU with 13 A fuse for
                higher-rated fixed appliances
              </li>
              <li>
                <strong>Under-counter lights:</strong> Unswitched FCU with 3 A fuse — controlled by
                a separate switch
              </li>
              <li>
                <strong>Waste disposal units:</strong> Switched FCU with 3 A or 5 A fuse
              </li>
              <li>
                <strong>Security systems:</strong> Unswitched FCU to prevent accidental
                disconnection
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Socket outlet types and RCD protection</ContentEyebrow>

          <ConceptBlock title="Matching the socket to the voltage, current and environment">
            <p>
              Socket outlets are the most common point of connection between the fixed wiring
              installation and portable equipment. The type of socket outlet must be appropriate for
              the voltage, current rating and environment. BS 7671:2018+A4:2026 requires additional
              protection by a 30 mA RCD for all socket outlets rated up to 32 A — a requirement that
              applies across all premises types.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Socket outlet types">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Type</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Standard</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Rating</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">13 A rectangular pin</td>
                    <td className="border border-white/10 px-3 py-2">BS 1363</td>
                    <td className="border border-white/10 px-3 py-2">13 A, 230 V</td>
                    <td className="border border-white/10 px-3 py-2">
                      Domestic, commercial, general use
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Round pin (2 A/5 A/15 A)</td>
                    <td className="border border-white/10 px-3 py-2">BS 546</td>
                    <td className="border border-white/10 px-3 py-2">2/5/15 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Lighting, clock circuits, older installations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Industrial (commando)</td>
                    <td className="border border-white/10 px-3 py-2">BS EN 60309-2</td>
                    <td className="border border-white/10 px-3 py-2">16/32/63/125 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Industrial, construction, outdoor events
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">110 V (CTE)</td>
                    <td className="border border-white/10 px-3 py-2">BS EN 60309-2</td>
                    <td className="border border-white/10 px-3 py-2">16/32 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Construction sites (yellow)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">USB integrated</td>
                    <td className="border border-white/10 px-3 py-2">BS 1363-2</td>
                    <td className="border border-white/10 px-3 py-2">13 A + USB</td>
                    <td className="border border-white/10 px-3 py-2">
                      Offices, hotels, residential
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="BS EN 60309-2 colour coding">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Yellow:</strong> 110 V (centre-tapped earth) — construction site use
              </li>
              <li>
                <strong>Blue:</strong> 230 V single-phase — general industrial use
              </li>
              <li>
                <strong>Red:</strong> 400 V three-phase — heavy industrial equipment
              </li>
              <li>
                <strong>Green:</strong> Greater than 50 V, special frequency ranges
              </li>
              <li>
                <strong>The keying (position of earth pin):</strong> Prevents interconnection
                between different voltage ratings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="RCD protection requirements (BS 7671:2018+A4:2026)"
            onSite="RCBOs (combined MCB and RCD in a single device) are increasingly preferred over split-load consumer units because they provide individual circuit RCD protection without the risk of nuisance tripping affecting other circuits."
          >
            <p>
              Regulation 411.3.3 requires additional protection by an RCD with IΔn not exceeding 30
              mA for:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All socket outlets with rated current not exceeding 32 A (all locations)</li>
              <li>Mobile equipment with rated current not exceeding 32 A for outdoor use</li>
              <li>All circuits in zones 0, 1 and 2 of bathrooms/shower rooms</li>
              <li>All circuits in swimming pool and fountain areas</li>
              <li>All circuits supplying caravans, camping parks and marinas</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Ring continuity testing and dedicated circuits</ContentEyebrow>

          <ConceptBlock
            title="Confirming ring integrity and fault loop impedance"
            onSite="The maintenance technician standard requires competence in testing ring final circuits, interpreting results, and identifying defects. You must be able to carry out the full ring continuity test procedure and explain the results."
          >
            <p>
              Testing ring final circuits is a fundamental skill for maintenance technicians
              carrying out periodic inspection and testing. The ring continuity test confirms the
              integrity of the ring and provides the R1+R2 values needed to calculate earth fault
              loop impedance at each socket outlet. Dedicated circuits are required for high-power
              appliances that exceed the capacity of general-purpose circuits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="R1+R2 ring continuity test procedure">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Isolate the circuit and confirm dead. Disconnect both ends
                of the ring from the consumer unit.
              </li>
              <li>
                <strong>Step 2:</strong> Measure the resistance of the line conductor loop
                (end-to-end) = r1.
              </li>
              <li>
                <strong>Step 3:</strong> Measure the resistance of the neutral conductor loop
                (end-to-end) = rn.
              </li>
              <li>
                <strong>Step 4:</strong> Measure the resistance of the earth conductor loop
                (end-to-end) = r2.
              </li>
              <li>
                <strong>Step 5:</strong> Cross-connect: line of one end to neutral of the other end,
                and vice versa.
              </li>
              <li>
                <strong>Step 6:</strong> Measure resistance at each socket outlet — this gives R1+Rn
                (should be approximately r1+rn / 4).
              </li>
              <li>
                <strong>Step 7:</strong> Repeat cross-connection with line and earth conductors to
                obtain R1+R2 at each socket.
              </li>
              <li>
                <strong>Step 8:</strong> All readings should be substantially the same; a high
                reading indicates a break.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Dedicated circuits">
            <p>
              Certain high-power appliances require their own dedicated circuit from the consumer
              unit, with cable and protection sized specifically for the load. Common dedicated
              circuits include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electric cooker:</strong> 32 A or 45 A circuit, 6.0 mm² or 10.0 mm² cable,
                cooker control unit
              </li>
              <li>
                <strong>Electric shower:</strong> 32 A or 40 A circuit, 6.0 mm² or 10.0 mm² cable,
                double-pole isolating switch
              </li>
              <li>
                <strong>Immersion heater:</strong> 16 A circuit, 2.5 mm² cable, double-pole switch
                with neon indicator
              </li>
              <li>
                <strong>Storage heaters:</strong> Individual or grouped circuits, often on an
                off-peak (Economy 7) tariff meter
              </li>
              <li>
                <strong>EV charge point:</strong> Dedicated circuit per BS 7671 Section 722, with
                appropriate load management
              </li>
              <li>
                <strong>Air conditioning units:</strong> Dedicated circuit sized for the specific
                unit&apos;s load
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common testing faults found"
            whatHappens={
              <>
                During periodic inspection and testing of ring circuits, common faults include:
                broken rings (a conductor disconnected at one point, turning the ring into a
                radial); interconnected rings (two ring circuits cross-connected, often at a socket
                that has been replaced incorrectly); spurs from spurs (a non-fused spur taken from
                another spur rather than from the ring); and incorrectly identified rings (two
                radial circuits connected at the consumer unit to appear as a ring).
              </>
            }
            doInstead={<>All of these are potentially dangerous and must be rectified.</>}
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Ring final: 2.5 mm² cable, 32 A MCB, both ends return to the same terminals, max 100 m² floor area (domestic).',
              'Radial: 2.5 mm² (20 A, max 50 m²) or 4.0 mm² (32 A, max 75 m²), terminates at the last point.',
              'One non-fused spur per point on the ring, wired in 2.5 mm² cable; unlimited fused spurs via an FCU, never a spur from a spur.',
              'BS 7671:2018+A4:2026 Regulation 411.3.3: 30 mA RCD required for all socket outlets up to 32 A, in all locations.',
              'Socket standards: BS 1363 (13 A), BS 546 (round pin), BS EN 60309-2 (industrial/commando, colour-coded by voltage).',
              'R1+R2 ring continuity test confirms the ring is unbroken and gives the loop impedance value at each socket.',
              'High-power appliances (cookers, showers, immersion heaters, EV charge points) need a dedicated circuit, not a ring or general radial.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Emergency Lighting Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Energy-Efficient Lighting Technologies
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section4_3;
