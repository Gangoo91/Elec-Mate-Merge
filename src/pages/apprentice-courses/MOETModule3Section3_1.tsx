/**
 * MOET · Module 3 · Section 3.3 · Subsection 1 — Layout and Design of Control
 * Panels
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
 *
 * Note: this page deliberately teaches that IEC 61439 replaced IEC 60439 —
 * the historical 60439 references are intentional, not an error to "fix".
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Layout and Design of Control Panels - MOET Module 3.3.1';
const DESCRIPTION =
  'Comprehensive guide to control panel layout and design for electrical maintenance technicians: design principles, component arrangement, IEC 61439, thermal management, documentation and maintenance considerations under ST1426.';

const quickCheckQuestions = [
  {
    id: 'panel-standard',
    question:
      'Which standard governs the design and construction of low-voltage switchgear and controlgear assemblies?',
    options: ['BS 5839', 'IEC 61439 (BS EN 61439)', 'BS 7671', 'IEC 60947'],
    correctIndex: 1,
    explanation:
      'IEC 61439 (implemented in the UK as BS EN 61439) is the standard for low-voltage switchgear and controlgear assemblies (commonly known as control panels, MCCs and distribution boards). It replaced the previous IEC 60439 and requires either design verification by testing or by calculation/comparison. BS 7671 covers the installation wiring that connects to the panel, while IEC 60947 covers individual components within the panel.',
  },
  {
    id: 'segregation',
    question: 'What is the purpose of internal separation (segregation) within a control panel?',
    options: [
      'To reduce the overall physical size and weight of the panel enclosure',
      'To guard against contact with adjacent live parts and limit arcing faults',
      'To increase the continuous current rating of the main busbar system',
      'To eliminate the need for an IP-rated enclosure around the assembly',
    ],
    correctIndex: 1,
    explanation:
      'Internal separation (defined in IEC 61439 as Forms 1-4) provides protection against accidental contact with live parts in adjacent sections and limits the propagation of internal arc faults. Higher forms of separation (Form 3b, Form 4) provide greater protection but increase cost and panel size. The form of separation required depends on the application and the level of access required during operation and maintenance.',
  },
  {
    id: 'thermal',
    question:
      'What is the most common cause of premature component failure inside a control panel?',
    options: [
      'Excessive internal temperature due to inadequate thermal management',
      'Mechanical vibration from nearby rotating machinery',
      'Use of copper rather than aluminium busbars',
      'Specifying too high an IP rating for the enclosure',
    ],
    correctIndex: 0,
    explanation:
      'Excessive internal temperature is the most common cause of premature component failure, particularly for electronic components, capacitors and contactors. For every 10 degrees C above the rated temperature, component life approximately halves. Thermal management through ventilation, forced cooling, adequate spacing and appropriate IP rating is a critical design consideration. IEC 61439 requires temperature rise verification as part of the design process.',
  },
  {
    id: 'documentation',
    question: 'Which documents must be supplied with a control panel to comply with IEC 61439?',
    options: [
      'Only a single nameplate showing the rated voltage and current',
      'A wiring diagram and an IP rating certificate, with no other records required',
      'Single-line and layout drawings, circuit diagrams, schedules and test results',
      'A copy of the BS 7671 installation certificate for the supplying circuit',
    ],
    correctIndex: 2,
    explanation:
      'IEC 61439 requires comprehensive technical documentation: single-line diagram showing the electrical arrangement; layout drawings showing component positions; circuit diagrams (schematic and wiring diagrams); component schedules listing all items with ratings; temperature rise verification data; short-circuit withstand verification; and routine test certificates for each panel. This documentation is essential for maintenance and modification work.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'IEC 61439 replaced the previous standard:',
    options: ['IEC 60529', 'IEC 60439', 'IEC 60947', 'IEC 61000'],
    correctAnswer: 1,
    explanation:
      'IEC 61439 replaced IEC 60439. The key change was replacing type-testing with design verification, which can be achieved by testing, calculation or comparison with a reference design. This allows greater flexibility for panel manufacturers while maintaining the same safety standards.',
  },
  {
    id: 2,
    question: 'The IP rating of a control panel refers to:',
    options: [
      'Its rated short-circuit withstand current under fault conditions',
      'The maximum internal temperature rise permitted by IEC 61439',
      'Its degree of protection against ingress of solid objects and water',
      'The continuous current-carrying capacity of the main busbars',
    ],
    correctAnswer: 2,
    explanation:
      'The IP (Ingress Protection) rating, defined by IEC 60529, indicates the degree of protection the enclosure provides against ingress of solid objects (first digit, 0-6) and water (second digit, 0-9). For example, IP54 means protection against dust ingress (5) and splashing water from any direction (4). The required IP rating depends on the installation environment.',
  },
  {
    id: 3,
    question: 'Internal separation Form 3b provides:',
    options: [
      'No internal separation at all, with all live parts exposed when the door opens',
      'Separation of the busbars from the functional units only, with units left open',
      'Full compartmentalisation, separating every outgoing terminal from the busbars',
      'Busbars separated from units, units from each other, and their terminals too',
    ],
    correctAnswer: 3,
    explanation:
      "Form 3b provides separation of busbars from functional units, separation of functional units from each other, and separation of the terminals of functional units from each other (but not from the busbars). This allows individual units to be maintained without exposing adjacent units' live parts. Form 4 provides full compartmentalisation including terminal separation from busbars.",
  },
  {
    id: 4,
    question: 'When designing a control panel layout, DIN rail-mounted components should have:',
    options: [
      'Adequate spacing for heat dissipation and maintenance access, per the maker',
      'The smallest possible spacing so the maximum number of components fits per rail',
      'Their terminals facing the rear of the enclosure to keep the front uncluttered',
      'Identical spacing for every component regardless of the maker recommendations',
    ],
    correctAnswer: 0,
    explanation:
      'Component manufacturers specify minimum spacing (derating distances) around their products to allow adequate heat dissipation. Ignoring these spacing requirements causes overheating and premature failure. Additionally, sufficient space must be provided for cable connections, test probe access during maintenance, and component replacement without disturbing adjacent equipment.',
  },
  {
    id: 5,
    question: 'The purpose of a gland plate on a control panel is:',
    options: [
      'To act as the main earthing terminal for all incoming circuit protective conductors',
      'To provide a sealed entry point for cables entering the enclosure, maintaining the IP rating',
      'To dissipate heat generated by the busbars away from the internal components',
      'To carry the full load current between the incoming supply and the functional units',
    ],
    correctAnswer: 1,
    explanation:
      "The gland plate provides a dedicated area for cable glands, which seal around the incoming and outgoing cables to maintain the enclosure's IP rating. Glands must be correctly sized for the cable diameter and tightened to the correct torque. Unused gland holes must be blanked off to maintain the IP rating.",
  },
  {
    id: 6,
    question: 'A control panel thermal management calculation must consider:',
    options: [
      'Only the rated current of the main incoming breaker, ignoring component losses',
      'Solely the nominal supply voltage and the prospective fault current at the busbars',
      'Component losses, ambient temperature, surface area, ventilation and IP rating',
      'The number of functional units and the form of internal separation specified',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal management calculations must account for: total internal power dissipation (from contactors, overloads, VSDs, transformers, resistors); ambient temperature at the installation location; enclosure surface area and material; ventilation method (natural convection, forced ventilation, air conditioning); and the IP rating (higher IP restricts natural ventilation). IEC 61439 Annex L provides the calculation methodology.',
  },
  {
    id: 7,
    question: 'Anti-condensation heaters in a control panel are used to:',
    options: [
      'Pre-heat the busbars to their rated operating temperature before energising',
      'Provide supplementary heat output to warm the room the panel is installed in',
      'Keep electronic components warm so they respond faster when switched on',
      'Stop condensation forming on components when idle, avoiding insulation failures',
    ],
    correctAnswer: 3,
    explanation:
      'Anti-condensation heaters maintain the internal panel temperature slightly above the dew point when the panel is de-energised or lightly loaded (e.g., overnight, weekends). This prevents moisture condensation on insulation surfaces, terminals and electronic components, which can cause tracking, corrosion and insulation failure. They are essential in environments with high humidity or significant temperature variations.',
  },
  {
    id: 8,
    question: 'The door interlock on a control panel typically:',
    options: [
      'Stops the door opening while the main switch is ON, and switching ON while open',
      'Trips the main switch automatically if the internal temperature exceeds its limit',
      'Locks the door shut permanently once the panel has been commissioned and tested',
      'Sounds an alarm whenever the door is opened, but does not affect the main switch',
    ],
    correctAnswer: 0,
    explanation:
      'Door interlocks are a safety feature that prevents access to live parts while the panel is energised. The interlock typically has a defeat mechanism (requiring a tool or deliberate action) for authorised persons who need access for live testing or fault-finding. BS 7671 Regulation 729.1 requires switchgear to be accessible only to authorised persons and the interlock supports this requirement.',
  },
  {
    id: 9,
    question: 'The main busbar system in a control panel carries:',
    options: [
      'Only the control-circuit current for the contactor coils and indicator lamps',
      'The full load current, distributing power from the supply to each functional unit',
      'Only the earth fault current returning to the supply during a fault condition',
      'The current of a single functional unit at a time, switched in turn by the main switch',
    ],
    correctAnswer: 1,
    explanation:
      'The main busbars carry the full load current and distribute it to individual functional units (circuit breakers, contactors, VSDs) via tap-off connections. Busbars are sized for continuous current rating, short-circuit withstand and temperature rise. Copper busbars are most common; aluminium is used in larger installations. The busbar cross-sectional area, support spacing and joint design are all critical factors.',
  },
  {
    id: 10,
    question: 'When modifying an existing control panel, the maintenance technician must:',
    options: [
      'Replace the entire panel, as any modification to an IEC 61439 assembly is barred',
      'Only update the single-line diagram, since other documents are unaffected by changes',
      'Keep the original verification valid, update the docs, and recheck thermal and fault ratings',
      'Increase the IP rating of the enclosure to compensate for the added components',
    ],
    correctAnswer: 2,
    explanation:
      'Modifications to an IEC 61439-compliant panel must not compromise the original design verification. This means checking that: the additional heat load does not exceed the thermal management capacity; the short-circuit rating is not affected; the form of separation is maintained; all documentation (drawings, schedules, certificates) is updated; and the modification is carried out by a competent person. Significant modifications may require re-verification.',
  },
  {
    id: 11,
    question: 'EMC (Electromagnetic Compatibility) considerations in panel design include:',
    options: [
      'Routing all power and signal cables together in a single duct to save panel space',
      'Removing all earth connections to prevent circulating currents between components',
      'Increasing the switching frequency of VSDs to reduce conducted emissions',
      'Segregating power and control circuits and using screened cables, EMC glands and filters',
    ],
    correctAnswer: 3,
    explanation:
      'EMC is a critical design consideration, particularly in panels containing VSDs, PLCs and other electronic equipment. Measures include: physical segregation of power and control wiring; dedicated cable routes for signal cables; use of screened cables with 360-degree EMC gland termination; EMC filters on VSD inputs; proper earthing of cable screens; and maintaining short, direct earth connections. Poor EMC practice causes control system malfunctions and nuisance trips.',
  },
  {
    id: 12,
    question: 'The routine tests required by IEC 61439 for each completed panel include:',
    options: [
      'Inspection, dielectric or insulation test, protective continuity and function checks',
      'A full short-circuit withstand test on every panel before it leaves the factory',
      'A temperature rise test under full rated load run for at least eight hours per panel',
      'An arc fault containment test to IEC 61641 performed on each panel as standard',
    ],
    correctAnswer: 0,
    explanation:
      'IEC 61439 requires routine verification for every panel produced: inspection of the assembly (construction, wiring, documentation); dielectric withstand test or insulation resistance measurement; verification of protective measures (continuity of protective circuits); mechanical function test (operation of mechanical components, interlocks, locks); and verification of wiring, operational performance and function. These tests must be documented and records kept.',
  },
];

const faqs = [
  {
    question:
      "What is the difference between a 'type-tested assembly' and a 'partially type-tested assembly'?",
    answer:
      "Under the previous IEC 60439, assemblies were classified as type-tested (TTA) or partially type-tested (PTTA). This classification has been replaced in IEC 61439 by the concept of 'design verification', which can be achieved by testing, calculation or comparison with a tested reference design. All assemblies must now demonstrate compliance through one of these verification methods, making the old TTA/PTTA distinction obsolete.",
  },
  {
    question: 'How do I determine the correct IP rating for a control panel?',
    answer:
      'The IP rating depends on the installation environment. Indoor, clean, dry locations typically require IP31 or IP41. Indoor locations with dust or occasional moisture (factories, workshops) typically need IP54. Outdoor installations or wash-down areas may need IP55 or IP65. Hazardous areas may have specific requirements. BS 7671 Table 52.2 provides guidance on selecting enclosures based on external influences.',
  },
  {
    question: 'What is derating and when does it apply to panel components?',
    answer:
      'Derating means reducing the rated capacity of a component due to operating conditions that differ from the standard reference conditions. The most common derating factor is temperature — contactors, circuit breakers and MCBs all have reduced current ratings at higher ambient temperatures. Other derating factors include altitude (above 2,000 m), mounting orientation and grouping. Manufacturer data sheets provide derating curves and tables.',
  },
  {
    question: 'Can I install a VSD inside an existing MCC panel?',
    answer:
      "Potentially, but several factors must be assessed: the VSD generates significant heat (typically 3-5% of rated power) which may exceed the panel's thermal management capacity; the VSD produces harmonics and EMC emissions requiring physical segregation from control circuits; the short-circuit rating of the panel must accommodate the VSD connection; and adequate space for the VSD, its input/output filters and ventilation clearances must be available. A thermal management recalculation is essential.",
  },
  {
    question: 'What maintenance tasks should be performed on control panels?',
    answer:
      'Regular panel maintenance includes: visual inspection for signs of overheating (discoloration, melted insulation), dust and debris (clean with a vacuum or compressed air with the panel isolated), checking connection torques (thermal cycling loosens connections over time), verifying ventilation (clean filters, check fan operation), testing door interlocks and safety features, thermographic survey of all connections under load, and verifying that documentation is up to date and accessible. Annual maintenance is typical for most installations.',
  },
];

const MOETModule3Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.3 · Subsection 1"
        title="Layout and Design of Control Panels"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Control panel design principles, component arrangement and IEC 61439 compliance — what
            governs the assembly you open up on every maintenance visit, and why the form of
            separation inside it decides how that visit goes.
          </p>

          <TLDR
            points={[
              'Standard: IEC 61439 (BS EN 61439) governs panel design.',
              'Separation: Forms 1-4 define internal segregation levels.',
              'Thermal: manage heat dissipation to protect components.',
              'Documentation: SLDs, schematics, schedules and test records.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the requirements of IEC 61439 for control panel design and verification',
              'Describe the forms of internal separation and their maintenance implications',
              'Assess thermal management requirements for control panel installations',
              'Identify the documentation required with a compliant control panel assembly',
              'Apply safe working practices when maintaining and modifying control panels',
              'Evaluate EMC considerations in panel design and component layout',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>IEC 61439 and panel standards</ContentEyebrow>

          <ConceptBlock title="IEC 61439 and Panel Standards">
            <p>
              Control panels — whether motor control centres (MCCs), power distribution boards or
              process control panels — are at the heart of every industrial and commercial
              electrical installation. Their design, construction and verification are governed by
              IEC 61439, implemented in the UK as BS EN 61439. Understanding this standard is
              essential for maintenance technicians who work on, maintain and modify these
              assemblies.
            </p>
            <p>
              IEC 61439 replaced the previous IEC 60439 series and introduced the concept of design
              verification to replace the old type-test/partially type-tested classification. Design
              verification can be achieved by testing, calculation or comparison with a tested
              reference design. This applies to the original manufacturer, but maintenance
              technicians need to understand the implications when carrying out modifications.
            </p>
            <p>
              The standard is published in several parts, each covering a specific type of assembly.
              Part 1 sets out the general rules applicable to all assemblies, while subsequent parts
              cover specific assembly types including power switchgear assemblies, distribution
              boards, assemblies for construction sites, cable distribution cabinets and busbar
              trunking systems. A maintenance technician working across different installations will
              encounter assemblies covered by several parts of the standard.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                IEC 61439 series — key parts
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Part</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical application
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">61439-1</td>
                    <td className="border border-white/10 px-3 py-2">General rules</td>
                    <td className="border border-white/10 px-3 py-2">
                      Common requirements for all assemblies
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">61439-2</td>
                    <td className="border border-white/10 px-3 py-2">
                      Power switchgear assemblies (PSC)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Main distribution boards, MCCs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">61439-3</td>
                    <td className="border border-white/10 px-3 py-2">Distribution boards (DBO)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Final distribution boards, consumer units
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">61439-4</td>
                    <td className="border border-white/10 px-3 py-2">
                      Assemblies for construction sites
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Temporary site distribution boards
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">61439-5</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cable distribution cabinets
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      External utility distribution pillars
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">61439-6</td>
                    <td className="border border-white/10 px-3 py-2">Busbar trunking systems</td>
                    <td className="border border-white/10 px-3 py-2">
                      Factory busbar distribution systems
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Design verification methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Testing:</strong> Full laboratory testing of the assembly design under fault
                and load conditions — the most rigorous method.
              </li>
              <li>
                <strong>Calculation:</strong> Mathematical analysis of thermal, short-circuit and
                dielectric performance using proven engineering methods.
              </li>
              <li>
                <strong>Comparison:</strong> Comparing the assembly design with a reference design
                that has already been verified by testing — the most common method for bespoke
                panels.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="IP rating selection guide">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical IP rating
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Indoor, clean, dry</td>
                    <td className="border border-white/10 px-3 py-2">IP31 / IP41</td>
                    <td className="border border-white/10 px-3 py-2">
                      Electrical switch rooms, clean plant rooms
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Indoor, dusty or damp</td>
                    <td className="border border-white/10 px-3 py-2">IP54</td>
                    <td className="border border-white/10 px-3 py-2">
                      Factories, workshops, process areas
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Outdoor</td>
                    <td className="border border-white/10 px-3 py-2">IP55 / IP65</td>
                    <td className="border border-white/10 px-3 py-2">
                      Weatherproof enclosures, external substations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Wash-down areas</td>
                    <td className="border border-white/10 px-3 py-2">IP65 / IP66</td>
                    <td className="border border-white/10 px-3 py-2">
                      Food processing, pharmaceutical, dairy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              Any modification to an IEC 61439 assembly must maintain the original design
              verification. If a modification changes the thermal, short-circuit or protection
              characteristics, the panel may need re-verification. Always consult the panel
              documentation and the original manufacturer's guidelines before making changes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Internal separation and component layout</ContentEyebrow>

          <ConceptBlock title="Internal Separation and Component Layout">
            <p>
              The internal arrangement of a control panel determines both safety and
              maintainability. IEC 61439 defines forms of internal separation (Forms 1 through 4)
              that provide progressively greater protection against contact with live parts and
              containment of internal faults. The form of separation specified depends on the
              application, the level of access required during operation, and the competence of the
              persons who will maintain the panel.
            </p>
            <p>
              For maintenance technicians, the form of separation directly affects how work is
              carried out. A Form 1 panel (no internal separation) requires complete isolation
              before any work can be done — opening the door exposes all live parts simultaneously.
              A Form 4b panel (full compartmentalisation) allows individual functional units to be
              withdrawn and maintained while adjacent units remain energised and in service. The
              choice of separation form is therefore a balance between initial cost and ongoing
              operational flexibility.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Forms of internal separation
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Maintenance benefit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">1</td>
                    <td className="border border-white/10 px-3 py-2">No internal separation</td>
                    <td className="border border-white/10 px-3 py-2">
                      Full isolation required for any access
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">2a</td>
                    <td className="border border-white/10 px-3 py-2">
                      Busbars separated from functional units
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Busbars protected during unit maintenance
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">2b</td>
                    <td className="border border-white/10 px-3 py-2">
                      As 2a, plus terminals separated from busbars
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Terminal access without busbar exposure
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">3a</td>
                    <td className="border border-white/10 px-3 py-2">
                      Separation between functional units, but not their terminals
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Work on one unit without exposing adjacent units
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">3b</td>
                    <td className="border border-white/10 px-3 py-2">
                      As 3a, plus terminal separation between units
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Full unit and terminal isolation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">4a</td>
                    <td className="border border-white/10 px-3 py-2">
                      As 3b, plus separation of outgoing terminals from busbars
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Maximum protection during maintenance
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">4b</td>
                    <td className="border border-white/10 px-3 py-2">
                      Full compartmentalisation including terminal compartments
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Individual unit access while panel remains live
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Component layout principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat management:</strong> Heat-generating components (VSDs, braking
                resistors, large contactors) placed at the top of the panel to allow natural
                convection.
              </li>
              <li>
                <strong>Accessibility:</strong> Components requiring frequent adjustment or
                replacement placed at accessible heights (typically 400-1,800 mm from floor).
              </li>
              <li>
                <strong>Segregation:</strong> Power circuits physically separated from control and
                signal circuits to minimise EMC interference.
              </li>
              <li>
                <strong>Logical grouping:</strong> Related functional units grouped together (e.g.,
                all motor starters for a single process line).
              </li>
              <li>
                <strong>Clearances:</strong> Manufacturer-specified derating distances maintained
                around all components.
              </li>
              <li>
                <strong>Wiring routes:</strong> Dedicated cable ducts for power, control and signal
                wiring, with adequate bending radii at all turns.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Arc fault containment"
            whatHappens={
              <>
                Internal separation also plays a role in limiting the damage from internal arc
                faults. An arc fault within a Form 1 panel can propagate throughout the entire
                assembly, causing extensive damage and potentially injuring anyone nearby.
              </>
            }
            doInstead={
              <>
                Higher forms of separation contain the arc energy within the affected compartment,
                limiting damage and protecting adjacent circuits. Some critical installations
                specify arc-resistant panels tested to IEC 61641, which are designed to vent arc
                energy safely through designated relief paths.
              </>
            }
          />

          <ConceptBlock title="Busbar design and sizing">
            <p>
              The busbar system is the backbone of a control panel, distributing power from the
              incoming supply to all functional units. Busbars are typically manufactured from
              high-conductivity copper, though aluminium is used in larger installations where
              weight and cost are factors. The busbar design must account for continuous current
              rating, short-circuit withstand, temperature rise and mechanical forces during fault
              conditions.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cross-sectional area:</strong> Determined by the continuous current rating
                and permissible temperature rise.
              </li>
              <li>
                <strong>Support spacing:</strong> Busbars must be supported at intervals that
                withstand electromagnetic forces during short-circuit faults.
              </li>
              <li>
                <strong>Jointing:</strong> Bolted connections must be correctly torqued with
                Belleville (disc spring) washers to maintain contact pressure during thermal
                cycling.
              </li>
              <li>
                <strong>Insulation:</strong> Busbars may be bare, sleeved or fully insulated — the
                level of insulation affects the form of separation achievable.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              Higher forms of separation enable maintenance on individual functional units without
              isolating the entire panel. This significantly reduces downtime and is particularly
              important in continuous process industries where a full panel shutdown is extremely
              costly.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Thermal management</ContentEyebrow>

          <ConceptBlock title="Thermal Management">
            <p>
              Every component inside a control panel generates heat during operation. Contactors,
              circuit breakers, cable terminations, VSDs and transformers all contribute to the
              internal temperature rise. If the internal temperature exceeds the rated operating
              temperature of any component, its performance degrades and its life is significantly
              shortened. Effective thermal management is therefore a critical aspect of panel design
              and ongoing maintenance.
            </p>
            <p>
              The relationship between temperature and component life follows the Arrhenius equation
              — for many electronic components and insulation materials, every 10 degrees C increase
              above the rated temperature approximately halves the expected service life. A panel
              designed to operate at 40 degrees C internal temperature that actually runs at 60
              degrees C will see electronic component life reduced by approximately 75%. This makes
              thermal management not just a reliability issue but a significant cost factor over the
              panel's life.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">Cooling methods</p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                    <th className="border border-white/10 px-3 py-2 text-left">IP impact</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Best application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Natural convection</td>
                    <td className="border border-white/10 px-3 py-2">Maintained</td>
                    <td className="border border-white/10 px-3 py-2">
                      Low-power panels in controlled environments
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Forced ventilation (fans)</td>
                    <td className="border border-white/10 px-3 py-2">Reduced (typically IP43)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Medium-power panels in clean environments
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Air-to-air heat exchanger</td>
                    <td className="border border-white/10 px-3 py-2">Maintained</td>
                    <td className="border border-white/10 px-3 py-2">
                      Dusty or corrosive environments
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Panel air conditioning</td>
                    <td className="border border-white/10 px-3 py-2">Maintained</td>
                    <td className="border border-white/10 px-3 py-2">
                      High ambient temperatures, precision control
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Thermal management failures"
            whatHappens={
              <>
                Common thermal failures include: blocked ventilation grilles (equipment stored
                against panels); failed or disconnected fans; clogged air filters (the single most
                common cause); failed air conditioning units on outdoor panels; and excessive
                component density after modifications.
              </>
            }
            doInstead={
              <>
                During maintenance inspections, always check internal temperature (thermographic
                survey) and the condition of all cooling system components.
              </>
            }
          />

          <ConceptBlock title="IEC 61439 temperature rise limits">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Accessible external surfaces:</strong> Maximum 70 K above ambient (typically
                110 degrees C at 40 degrees C ambient).
              </li>
              <li>
                <strong>Terminals for external cables:</strong> Maximum 70 K rise.
              </li>
              <li>
                <strong>Busbars and conductors:</strong> Maximum temperature depends on insulation
                class and material.
              </li>
              <li>
                <strong>Operating handles and controls:</strong> Metal 15 K, non-metal 25 K rise
                above ambient.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Anti-condensation protection">
            <p>
              In environments with high humidity or significant temperature fluctuations,
              condensation can form on internal panel surfaces when the panel temperature drops
              below the dew point — typically overnight or during weekends when the panel is lightly
              loaded. Condensation on insulation surfaces causes tracking (surface leakage currents
              that carbonise insulation), corrosion of metallic components and degradation of
              electronic circuits. Anti-condensation heaters — thermostatically controlled
              low-wattage heaters — maintain the internal temperature above the dew point and are
              essential in outdoor panels, coastal locations and unheated plant rooms.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              IEC 61439 requires that the temperature rise inside the panel does not exceed
              specified limits when all circuits are carrying their rated current at the rated
              ambient temperature. This must be verified by testing, calculation or comparison as
              part of the design verification process.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Documentation and panel maintenance</ContentEyebrow>

          <ConceptBlock title="Documentation and Panel Maintenance">
            <p>
              Comprehensive documentation is not just a regulatory requirement — it is the essential
              foundation for safe and effective panel maintenance. Without accurate drawings,
              circuit diagrams and component schedules, maintenance work becomes dangerous
              guesswork. As a maintenance technician, you must both use and maintain this
              documentation throughout the panel's operational life.
            </p>
            <p>
              The documentation package for a control panel serves multiple purposes: it enables
              safe isolation by identifying all sources of supply; it supports fault diagnosis by
              providing circuit logic and component values; it facilitates modification work by
              showing the existing arrangement and design parameters; and it provides the basis for
              spare parts procurement by listing all components with their specifications. Losing or
              failing to update panel documentation is one of the most common — and most serious —
              maintenance failures.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-line diagram (SLD):</strong> Shows the overall electrical arrangement
                — switchgear, busbars, protection devices and their interconnections.
              </li>
              <li>
                <strong>General arrangement drawing:</strong> Physical layout showing component
                positions within the enclosure.
              </li>
              <li>
                <strong>Circuit diagrams (schematics):</strong> Detailed electrical circuits for
                each functional unit — power circuits, control circuits and interlocks.
              </li>
              <li>
                <strong>Wiring diagrams:</strong> Terminal-to-terminal connections showing cable
                numbers, terminal identifiers and wire colours.
              </li>
              <li>
                <strong>Component schedule:</strong> List of all components with manufacturer, model
                number, rating and location reference.
              </li>
              <li>
                <strong>Design verification records:</strong> Temperature rise data, short-circuit
                withstand verification, IP verification.
              </li>
              <li>
                <strong>Routine test certificates:</strong> Records of factory acceptance testing
                for each panel.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Panel maintenance best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Annual thermographic survey:</strong> Scan all connections, busbars and
                components under load to detect hot spots — the single most effective preventive
                maintenance technique for panels.
              </li>
              <li>
                <strong>Connection torque checks:</strong> Re-torque all main connections
                periodically — thermal cycling causes gradual loosening that increases resistance
                and generates heat.
              </li>
              <li>
                <strong>Cleaning:</strong> Vacuum dust and debris with the panel isolated; clean
                ventilation filters monthly in dusty environments.
              </li>
              <li>
                <strong>Interlock testing:</strong> Verify all door interlocks, key interlocks and
                safety devices operate correctly.
              </li>
              <li>
                <strong>Documentation update:</strong> After any modification, update all affected
                drawings and schedules immediately — do not leave this for later.
              </li>
              <li>
                <strong>Insulation resistance testing:</strong> Measure insulation resistance of
                busbars and main circuits during planned shutdowns.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Case study: the importance of documentation">
            <p>
              In a reported incident at a manufacturing plant, a maintenance technician needed to
              isolate a single motor starter within an MCC for contactor replacement. The panel
              documentation had not been updated following a modification three years earlier, and
              the circuit labelling no longer matched the drawings. The technician isolated what he
              believed was the correct circuit, but the motor remained energised — the modification
              had changed the busbar tap-off arrangement. Fortunately, the technician proved dead
              before touching any connections and discovered the error. The investigation found that
              four separate modifications had been made to the panel without any documentation
              updates, making safe working extremely difficult for all subsequent maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Note">
            <p className="italic">
              Under ST1426, maintenance technicians must be able to interpret technical drawings and
              schematics, carry out maintenance and fault-finding on control panels, and maintain
              accurate maintenance records. These are core competence requirements for the
              electrical maintenance pathway.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>EMC considerations and wiring practices</ContentEyebrow>

          <ConceptBlock title="EMC Considerations and Wiring Practices">
            <p>
              Electromagnetic compatibility (EMC) is an increasingly important aspect of control
              panel design and maintenance. Modern panels frequently contain variable speed drives,
              programmable logic controllers, electronic metering and communication interfaces
              alongside power circuits carrying hundreds of amperes. Without proper EMC measures,
              electromagnetic interference from power circuits can cause control system
              malfunctions, nuisance trips, inaccurate readings and communication failures.
            </p>
            <p>
              The EMC Directive (2014/30/EU, retained in UK law) requires that electrical equipment
              does not generate excessive electromagnetic emissions and is sufficiently immune to
              external interference. Panel manufacturers must demonstrate compliance, and
              maintenance technicians must ensure that EMC measures are maintained during
              modification and repair work. Replacing a screened cable with an unscreened one, or
              removing an EMC filter during a VSD replacement, can introduce EMC problems that are
              difficult to diagnose.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Physical segregation:</strong> Power and control/signal wiring routed in
                separate cable ducts, crossing at 90 degrees where unavoidable.
              </li>
              <li>
                <strong>Screened cables:</strong> All signal and communication cables use screened
                (shielded) types with the screen terminated at 360 degrees via EMC glands.
              </li>
              <li>
                <strong>EMC filters:</strong> Input and output filters on VSDs to contain harmonic
                currents and high-frequency switching noise.
              </li>
              <li>
                <strong>Earth references:</strong> Dedicated EMC earth bar connected to the panel
                earth with short, wide conductors — not long pigtail wires.
              </li>
              <li>
                <strong>Cable entry:</strong> Power cables and signal cables enter the panel through
                separate gland plates where possible.
              </li>
              <li>
                <strong>Ferrite cores:</strong> Applied to signal cables where additional
                high-frequency noise suppression is required.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common EMC problems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>PLC analogue inputs reading erratically due to VSD switching noise.</li>
              <li>
                Communication bus (Profibus, Modbus) dropouts from inadequate cable screening.
              </li>
              <li>Nuisance RCD tripping caused by VSD leakage currents.</li>
              <li>Temperature transmitter readings fluctuating when nearby motor starts.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintenance EMC checks">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Verify cable screen connections at all EMC glands.</li>
              <li>Check power/signal cable segregation is maintained.</li>
              <li>Confirm EMC filters are fitted and operational.</li>
              <li>Inspect earth connections for corrosion or loosening.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="VSD installation considerations"
            whatHappens={
              <>
                Variable speed drives are the single biggest source of EMC issues in control panels.
                Their high-frequency switching (typically 4-16 kHz) generates significant conducted
                and radiated emissions.
              </>
            }
            doInstead={
              <>
                Proper VSD installation requires: input EMC filter; screened motor cable with
                360-degree termination at both ends; maximum cable length compliance
                (manufacturer-specified); output choke or du/dt filter for long motor cable runs;
                and segregation of VSD power cables from all control and signal wiring. Failure to
                follow these practices can cause widespread interference throughout the panel and to
                external equipment.
              </>
            }
          />

          <ConceptBlock title="Note">
            <p className="italic">
              When replacing a VSD or modifying a panel containing VSDs, always reinstall EMC
              filters and maintain cable screening. If the original EMC measures are not documented,
              consult the VSD manufacturer's installation guide for the specific EMC requirements.
              Poor EMC practice is one of the most common causes of intermittent control system
              faults.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'IEC 61439 (BS EN 61439) governs low-voltage switchgear and controlgear assemblies, verified by testing, calculation or comparison.',
              'Forms of internal separation (1, 2a, 2b, 3a, 3b, 4a, 4b) trade off cost against how much of the panel can stay live during maintenance.',
              'Thermal management is a design and maintenance issue: every 10 degrees C above rated temperature roughly halves component life.',
              'Documentation — SLDs, layout and circuit diagrams, schedules, verification and test records — is the foundation of safe maintenance.',
              'EMC measures (segregation, screened cables, filters, earth references) must be maintained through every modification, not just at build.',
              'Key references: IEC 61439 (BS EN 61439), IEC 60947, IEC 60529, IEC 61641, BS 7671 Regulation 729.1 and Table 52.2, EMC Directive 2014/30/EU.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Panels, cables and containment
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section3-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Cable Types and Selection
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section3_1;
