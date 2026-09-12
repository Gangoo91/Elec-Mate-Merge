/**
 * MOET · Module 3 · Section 3.1 · Subsection 2 — HV/LV Switchgear Types
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
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'HV/LV Switchgear Types - MOET Module 3 Section 1.2';
const DESCRIPTION =
  'Comprehensive guide to HV and LV switchgear types for electrical maintenance technicians: SF6 and vacuum circuit breakers, ring main units, HV voltage definitions, oil circuit breakers, HV safety rules, authorised persons and ST1426 compliance.';

const quickCheckQuestions = [
  {
    id: 'hv-definition',
    question: 'At what voltage does the definition of high voltage begin for AC systems in the UK?',
    options: ['400 V', 'Above 3300 V', '230 V', 'Above 1000 V'],
    correctIndex: 3,
    explanation:
      'In the UK, high voltage is defined as any voltage exceeding 1000 V AC between conductors, or 600 V AC between conductors and earth. This definition is established by the Electricity at Work Regulations 1989 and is fundamental to the safety framework around HV systems.',
  },
  {
    id: 'sf6-gwp',
    question: 'What is the approximate global warming potential of SF6 gas compared to CO2?',
    options: ['100 times', '23,500 times', '10,000 times', '1,000 times'],
    correctIndex: 1,
    explanation:
      'SF6 has a global warming potential approximately 23,500 times that of CO2, making it one of the most potent greenhouse gases known. This is why its use is strictly regulated under EU F-Gas regulations, and alternatives such as vacuum technology and clean-air insulation are increasingly preferred.',
  },
  {
    id: 'rmu-teeoff',
    question: 'In a typical ring main unit, what is the function of the tee-off panel?',
    options: [
      'Connects to the outgoing ring cable',
      'Feeds and protects the transformer',
      'Connects to the incoming ring cable',
      'Provides earthing only',
    ],
    correctIndex: 1,
    explanation:
      'The tee-off panel contains a circuit breaker or fuse-switch that feeds the HV/LV transformer. It provides fault protection for the transformer and can be opened to isolate the transformer for maintenance, whilst the ring cables remain energised.',
  },
  {
    id: 'hv-fifth-rule',
    question: 'What is the fifth safety rule that applies to HV isolation but not typically to LV?',
    options: [
      'Apply portable protective earths',
      'Issue a permit-to-work to the operative',
      'Display a danger-of-death warning sign',
      'Lock off the isolation point with a padlock',
    ],
    correctIndex: 0,
    explanation:
      'The fifth HV safety rule is to apply portable protective earths (PPEs) at the point of work. This step discharges any stored energy (e.g., from cable capacitance) and protects workers if the system is inadvertently re-energised. This additional step is beyond standard LV isolation procedures because of the much greater stored energy in HV systems.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'At what voltage does the UK definition of high voltage begin for AC systems?',
    options: ['Above 230 V', 'Above 1000 V', 'Above 400 V', 'Above 3300 V'],
    correctAnswer: 1,
    explanation:
      'High voltage in the UK is defined as exceeding 1000 V AC between conductors, as per the Electricity at Work Regulations 1989.',
  },
  {
    id: 2,
    question: 'What is the most common HV distribution voltage in the UK?',
    options: ['33 kV', '3.3 kV', '11 kV', '6.6 kV'],
    correctAnswer: 2,
    explanation:
      '11 kV is the most common primary distribution voltage in the UK, used to supply local substations from grid substations.',
  },
  {
    id: 3,
    question: 'What arc-quenching medium is used in SF6 circuit breakers?',
    options: ['Vacuum', 'Oil', 'Air', 'Sulphur hexafluoride gas'],
    correctAnswer: 3,
    explanation:
      'SF6 circuit breakers use sulphur hexafluoride gas, which has approximately 2.5 times the dielectric strength of air at atmospheric pressure.',
  },
  {
    id: 4,
    question: 'How many operations can a modern vacuum circuit breaker typically perform?',
    options: ['30,000', '1,000', '10,000', '100'],
    correctAnswer: 0,
    explanation:
      'Modern vacuum circuit breakers can typically perform up to 30,000 operations, giving them a very long electrical life with minimal maintenance.',
  },
  {
    id: 5,
    question: 'In a standard ring main unit, how many panels are there in a typical configuration?',
    options: ['Two', 'Three', 'Five', 'Four'],
    correctAnswer: 1,
    explanation:
      'A typical RMU has three panels: two ring switches (incoming and outgoing) and one tee-off panel (circuit breaker or fuse-switch) feeding the transformer.',
  },
  {
    id: 6,
    question: 'Who is authorised to carry out HV switching operations?',
    options: [
      'Any qualified electrician',
      'A Competent Person (HV)',
      'An Authorised Person (HV)',
      'The site manager',
    ],
    correctAnswer: 2,
    explanation:
      'Only a formally appointed Authorised Person (AP) may carry out HV switching operations and issue safety documents such as permits to work.',
  },
  {
    id: 7,
    question: 'What is the correct order of the five HV safety rules?',
    options: [
      'Isolate, Disconnect, Earth, Prove Dead, Secure',
      'Disconnect, Earth, Isolate, Secure, Prove Dead',
      'Prove Dead, Disconnect, Isolate, Secure, Earth',
      'Disconnect, Isolate, Secure, Prove Dead, Earth',
    ],
    correctAnswer: 3,
    explanation:
      'The correct order is: Disconnect, Isolate, Secure (lock off), Prove Dead, Earth. This sequence ensures safety at each stage before proceeding to the next.',
  },
  {
    id: 8,
    question: 'Why are portable protective earths applied during HV work?',
    options: [
      'To discharge stored energy and protect against inadvertent re-energisation',
      'To reduce the earth fault loop impedance of the LV final circuits',
      'To provide a low-resistance return path for normal load current',
      'To suppress harmonic currents generated by connected equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Portable protective earths discharge any stored energy (such as cable capacitance) and provide protection if the system is inadvertently re-energised during work.',
  },
  {
    id: 9,
    question: 'If the LV side of a transformer is isolated, what is the status of the HV side?',
    options: [
      'Automatically de-energised by the LV isolation interlock',
      'Still energised at 11 kV unless separately isolated',
      'Safe to work on once the LV side has been proved dead',
      'Reduced to a touch-safe voltage by the transformer turns ratio',
    ],
    correctAnswer: 1,
    explanation:
      'Isolating the LV side does NOT isolate the HV winding. The HV primary remains energised until an Authorised Person carries out separate HV isolation.',
  },
  {
    id: 10,
    question:
      'What type of HV circuit breaker uses no gas or oil and is most environmentally friendly?',
    options: ['SF6 breaker', 'Oil circuit breaker', 'Vacuum circuit breaker', 'Air-blast breaker'],
    correctAnswer: 2,
    explanation:
      'Vacuum circuit breakers use no gas or oil — the arc is extinguished in a sealed vacuum bottle. They are the most environmentally friendly option and are increasingly replacing SF6 types.',
  },
  {
    id: 11,
    question: 'What temperature can an HV arc flash exceed?',
    options: [
      '500 degrees Celsius',
      '2,000 degrees Celsius',
      '10,000 degrees Celsius',
      '20,000 degrees Celsius',
    ],
    correctAnswer: 3,
    explanation:
      'HV arc flash temperatures can exceed 20,000 degrees Celsius, causing severe burns, blast injuries and hearing damage even at a distance from the arc point.',
  },
  {
    id: 12,
    question: 'What advantage does a ring main configuration provide over a radial feeder?',
    options: [
      'Supply resilience if a cable section fails',
      'A lower installation cost than a single radial cable',
      'Elimination of the need for transformer protection',
      'A higher distribution voltage than a radial arrangement',
    ],
    correctAnswer: 0,
    explanation:
      'A ring main provides resilience because each substation can be fed from either direction. If one cable section is faulted, the ring can be split and supply maintained from the other side.',
  },
];

const faqs = [
  {
    question: 'Can I enter an HV switchroom as an LV maintenance technician?',
    answer:
      'Only if specifically authorised and escorted by an Authorised Person. You must never enter an HV switchroom alone or without proper authorisation, even if the door is unlocked. HV areas are controlled access zones with strict safety rules governing entry.',
  },
  {
    question: 'Why is SF6 being phased out?',
    answer:
      'SF6 is a potent greenhouse gas with a global warming potential of approximately 23,500 times CO2. EU F-Gas regulations are progressively restricting its use. Manufacturers are developing alternatives using vacuum technology and clean-air insulation. Many new switchgear installations now specify SF6-free equipment.',
  },
  {
    question: 'If the LV supply is isolated, is the transformer safe to work on?',
    answer:
      'No. Isolating the LV side does not isolate the HV winding. The transformer primary remains energised at 11 kV until separately isolated by an Authorised Person from the HV side. Never assume the HV side is dead because the LV side has been isolated.',
  },
  {
    question: 'What is the difference between a ring main and a radial feeder?',
    answer:
      'A ring main forms a continuous loop so that each substation can be fed from either direction, providing resilience if a cable section is faulted. A radial feeder is a single cable from the source — if it fails, supply is lost. Ring main configurations are standard for commercial and industrial HV distribution.',
  },
  {
    question: 'How long do sealed-for-life SF6 switchgear units typically last?',
    answer:
      'Modern sealed-for-life SF6 switchgear typically has an operational lifespan of 25 to 30 years. During this period, no gas maintenance is required. The units include gas pressure monitoring and will lockout if the gas pressure drops below the minimum required for safe operation. At end of life, the SF6 gas must be recovered by trained personnel using approved gas handling equipment.',
  },
];

const MOETModule3Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.1 · Subsection 2"
        title="HV/LV Switchgear Types"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            HV definitions, SF6 breakers, vacuum circuit breakers, ring main units and HV safety
            rules.
          </p>

          <TLDR
            points={[
              'HV: exceeds 1000 V AC; UK distribution typically 11 kV.',
              'SF6: gas-insulated breakers, 23,500x CO2 warming potential.',
              'Vacuum: environmentally friendly, up to 30,000 operations.',
              'RMU: 3-panel ring main unit at substation entry point.',
              'Awareness: LV technicians must recognise HV equipment.',
              'Safety rules: Disconnect, Isolate, Secure, Prove Dead, Earth.',
              'Authorisation: only APs may switch HV equipment.',
              'ST1426: maps to hazard awareness and safe working KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define high voltage as per UK regulations and standards',
              'Describe the operating principles of SF6 and vacuum circuit breakers',
              'Explain ring main unit configurations and their purpose in distribution networks',
              'Outline the HV safety rules and the role of Authorised Persons',
              'Identify the key dangers associated with HV equipment',
              'Recognise the boundaries of LV maintenance technician responsibilities around HV systems',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Defining high voltage</ContentEyebrow>

          <ConceptBlock
            title="Above 1000 V AC — and a boundary you are not expected to cross"
            onSite="Approaching too closely to energised HV equipment is potentially fatal. Always respect HV warning signs and restricted areas, and never enter an HV switchroom without proper authorisation and escort."
          >
            <p>
              In the United Kingdom, high voltage (HV) is defined as any voltage exceeding 1000 V AC
              or 1500 V DC between conductors, or 600 V AC or 900 V DC between conductors and earth.
              This definition comes from the Electricity at Work Regulations 1989 and is fundamental
              to understanding the safety framework around HV systems.
            </p>
            <p>
              The most common HV distribution voltage in the UK is 11 kV (11,000 V), used for
              primary distribution from grid substations to local substations. Some larger
              commercial and industrial sites have their own 11 kV intake, while others may operate
              at 33 kV or even 132 kV for very large power consumers. Understanding these voltage
              levels is essential for recognising the equipment you may encounter on site.
            </p>
            <p>
              As a maintenance technician working to the ST1426 standard, you are not expected to
              work on HV equipment. However, you must understand the hazards, recognise HV
              apparatus, and know the safety rules that govern access and work near HV systems. Many
              commercial and industrial premises have HV switchrooms adjacent to or within the same
              building as LV equipment you will be maintaining.
            </p>
          </ConceptBlock>

          <ConceptBlock title="HV voltage categories">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Category</th>
                    <th className="py-2 pr-4 font-medium text-white">Voltage range</th>
                    <th className="py-2 font-medium text-white">Typical UK usage</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Low Voltage (LV)</td>
                    <td className="py-2 pr-4">Up to 1000 V AC / 1500 V DC</td>
                    <td className="py-2">230/400 V distribution, final circuits</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">High Voltage (HV)</td>
                    <td className="py-2 pr-4">Exceeding 1000 V AC / 1500 V DC</td>
                    <td className="py-2">3.3 kV, 6.6 kV, 11 kV, 33 kV distribution</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Extra High Voltage (EHV)</td>
                    <td className="py-2 pr-4">Typically 66 kV and above</td>
                    <td className="py-2">Sub-transmission networks</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Super Grid</td>
                    <td className="py-2 pr-4">275 kV and 400 kV</td>
                    <td className="py-2">National transmission network</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Dangers of high voltage">
            <p>
              The primary hazard of HV systems is the potential for fatal electric shock and severe
              arc flash. At 11 kV, an electric arc can form across an air gap of approximately 30
              mm, but in practice, safety clearances are measured in hundreds of millimetres. Arc
              flash temperatures can exceed 20,000 degrees Celsius, causing severe burns, blast
              injuries and hearing damage even at a distance from the arc. Unlike LV systems where
              contact is typically required for shock, HV can cause flashover across air gaps — you
              do not need to physically touch an HV conductor to be electrocuted.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>HV circuit breaker types</ContentEyebrow>

          <ConceptBlock title="Three technologies, one job: interrupt a huge fault current">
            <p>
              HV circuit breakers must safely interrupt fault currents that can reach tens of
              thousands of amperes at voltages of 11 kV or more. The energy that must be dissipated
              during fault clearance is enormous, requiring specialised arc-quenching technologies.
              The three main types you may encounter are SF6, vacuum and oil (legacy).
            </p>
          </ConceptBlock>

          <ConceptBlock title="SF6 circuit breakers">
            <p>
              Sulphur hexafluoride (SF6) circuit breakers use SF6 gas as the arc-quenching medium.
              SF6 has exceptional dielectric properties — approximately 2.5 times the dielectric
              strength of air at atmospheric pressure. When the contacts separate, the arc is formed
              in the SF6 gas, which absorbs the energy and extinguishes the arc rapidly.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Compact, reliable and have long service intervals (25-30 years)</li>
              <li>Typically sealed-for-life units requiring no gas maintenance</li>
              <li>Include gas pressure monitoring and lockout on low pressure</li>
              <li>
                SF6 is a potent greenhouse gas (GWP ~23,500x CO2) — strict handling regulations
                apply
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Vacuum circuit breakers">
            <p>
              Vacuum circuit breakers (VCBs) use a vacuum interrupter to extinguish the arc. The
              contacts are enclosed in a sealed vacuum bottle. When the contacts separate, the arc
              forms in the residual metal vapour and is extinguished extremely quickly — typically
              within 10 milliseconds.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Environmentally friendly — no greenhouse gases or oil</li>
              <li>Minimal maintenance and very long electrical life (up to 30,000 operations)</li>
              <li>Compact design increasingly popular for 11 kV and 33 kV applications</li>
              <li>Many new installations now specify vacuum as the preferred technology</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="HV circuit breaker comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">SF6</th>
                    <th className="py-2 pr-4 font-medium text-white">Vacuum</th>
                    <th className="py-2 font-medium text-white">Oil (legacy)</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Arc medium</td>
                    <td className="py-2 pr-4">SF6 gas</td>
                    <td className="py-2 pr-4">Vacuum</td>
                    <td className="py-2">Mineral oil</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Environmental impact</td>
                    <td className="py-2 pr-4">High (greenhouse gas)</td>
                    <td className="py-2 pr-4">Low</td>
                    <td className="py-2">Moderate (fire risk)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Maintenance</td>
                    <td className="py-2 pr-4">Minimal (sealed for life)</td>
                    <td className="py-2 pr-4">Minimal</td>
                    <td className="py-2">Regular oil sampling</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Typical life</td>
                    <td className="py-2 pr-4">25-30 years</td>
                    <td className="py-2 pr-4">25-30 years</td>
                    <td className="py-2">Being phased out</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Oil circuit breakers (legacy)">
            <p>
              Although largely obsolete for new installations, oil circuit breakers (OCBs) may still
              be encountered in older substations. They use mineral oil both as an insulating medium
              and for arc quenching. OCBs require regular oil sampling and testing, present a fire
              risk, and are gradually being replaced by SF6 or vacuum types during refurbishment
              programmes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Ring main units</ContentEyebrow>

          <ConceptBlock title="The most common HV switchgear you will actually see">
            <p>
              A ring main unit (RMU) is a compact, sealed switchgear assembly used at the point
              where an 11 kV distribution cable enters a substation. RMUs are the most common type
              of HV switchgear you will encounter in commercial buildings and small industrial
              sites. Understanding their configuration is essential for recognising HV equipment on
              site.
            </p>
            <p>
              The typical RMU configuration is a three-panel arrangement providing both ring
              continuity and transformer protection. The ring configuration provides resilience — if
              one section of cable is damaged, the ring can be split and supply maintained from the
              other direction. This is why commercial and industrial HV distribution networks are
              almost always arranged as rings rather than radial feeders.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three-panel RMU configuration">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ring Switch 1 (incoming):</strong> a load-break switch connecting to the
                incoming ring cable from the upstream substation
              </li>
              <li>
                <strong>Circuit Breaker / Fuse Switch (tee-off):</strong> a circuit breaker or
                fuse-switch that feeds the transformer — this is the protective device for the
                transformer
              </li>
              <li>
                <strong>Ring Switch 2 (outgoing):</strong> a load-break switch connecting to the
                outgoing ring cable to the next substation in the ring
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Ring main advantages, and what to keep in mind"
            onSite="Always recognise that an RMU is energised at 11 kV — even if the transformer secondary (LV side) has been isolated. The ring cables passing through the RMU may be energised from either direction."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Supply resilience — dual feed path to each substation</li>
              <li>Faulted sections can be isolated without total loss of supply</li>
              <li>Maintenance can be planned without customer disconnection</li>
              <li>Standard configuration for commercial HV distribution</li>
            </ul>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Modern RMUs are gas-insulated, sealed for life</li>
              <li>Include integral earthing facilities</li>
              <li>An RMU is energised at 11 kV even if the LV side is isolated</li>
              <li>Clean-air alternatives increasingly replacing SF6 types</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>HV safety rules and authorisation</ContentEyebrow>

          <ConceptBlock title="Strict rules, and an authorisation hierarchy that governs even LV technicians">
            <p>
              Work on or near HV systems is governed by strict safety rules. In the UK, the
              principal framework is the Electricity at Work Regulations 1989, supplemented by the
              Distribution Safety Rules (for DNO networks) and site-specific HV safety rules for
              private HV installations. Understanding these rules and the authorisation hierarchy is
              essential, even for LV maintenance technicians.
            </p>
          </ConceptBlock>

          <ConceptBlock title="HV safety roles">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Role</th>
                    <th className="py-2 pr-4 font-medium text-white">Authority</th>
                    <th className="py-2 font-medium text-white">Competence required</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Authorised Person (AP)</td>
                    <td className="py-2 pr-4">
                      Carries out HV switching; issues and cancels safety documents
                    </td>
                    <td className="py-2">
                      Specific HV training; formal written appointment by the duty holder
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Competent Person (CP)</td>
                    <td className="py-2 pr-4">
                      Carries out work on HV equipment under a safety document
                    </td>
                    <td className="py-2">
                      Trained in the work to be done; understands safety documentation
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">LV Technician</td>
                    <td className="py-2 pr-4">
                      May work on LV systems near HV; must not access HV equipment
                    </td>
                    <td className="py-2">
                      Awareness of HV hazards; recognises HV areas and signage
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="The five HV safety rules"
            onSite="The fifth HV safety rule — applying portable protective earths — is additional to standard LV isolation procedures. This is because HV systems have much greater stored energy and a risk of induced voltages on de-energised HV cables running parallel to energised ones."
          >
            <p>
              When HV equipment is to be worked on, the following five safety rules must be applied
              in strict order:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Disconnect:</strong> the equipment must be disconnected from all sources
                of supply by opening the appropriate switching devices
              </li>
              <li>
                <strong>2. Isolate:</strong> the equipment must be isolated by creating a visible
                break in the circuit (isolation point)
              </li>
              <li>
                <strong>3. Secure:</strong> apply locks and safety notices to prevent
                re-energisation; keys retained by the person controlling the work
              </li>
              <li>
                <strong>4. Prove Dead:</strong> the equipment must be proved dead at the point of
                work using approved HV voltage detection equipment
              </li>
              <li>
                <strong>5. Earth:</strong> apply portable protective earths (PPEs) at the point of
                work to discharge stored energy and protect against inadvertent re-energisation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="LV technician awareness responsibilities">
            <p>
              As an LV maintenance technician, your responsibilities around HV equipment include:
              never entering an HV switchroom unless authorised and escorted; recognising HV warning
              signs and restricted areas; understanding that isolating the LV side does not isolate
              the HV side; reporting any defects or damage to HV equipment immediately; and knowing
              the emergency procedures for HV incidents. If your LV work requires isolation of a
              transformer, remember that the HV side remains energised unless separately isolated by
              an Authorised Person.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>HV equipment identification on site</ContentEyebrow>

          <ConceptBlock title="Recognise it, do not touch it">
            <p>
              As a maintenance technician, you should be able to recognise common HV equipment and
              understand the signage used to identify HV areas. This awareness is essential for your
              personal safety and for preventing inadvertent interference with HV systems during
              your LV maintenance activities.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Transformers">
            <p>
              The HV/LV transformer steps down the 11 kV supply to 400/230 V. Transformers may be
              oil-filled (with a conservator tank and cooling fins) or cast resin (dry type, often
              used indoors). The transformer will have HV cable terminations on one side and LV
              cable connections on the other. Always treat the transformer as HV equipment — even
              the LV terminals carry significant fault energy. Oil-filled transformers require
              regular oil sampling and testing as part of their maintenance regime.
            </p>
          </ConceptBlock>

          <ConceptBlock title="HV cables and cable routes">
            <p>
              HV cables are typically identified by their larger diameter, red or black colour,
              trefoil arrangement, and prominent cable markers or labels. They may be routed through
              dedicated ducts or on dedicated cable trays. HV cable routes should be clearly marked
              with warning tape (buried cables) or labels (surface-mounted cables). When working
              near cable routes, always verify the cable voltage before proceeding.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Warning signs and access restrictions">
            <p>
              HV switchrooms and substations must display standard safety signs including the yellow
              triangular &quot;Danger of Death&quot; sign, &quot;Authorised Personnel Only&quot;
              notices, and first aid and emergency procedure notices. Access to HV areas is
              typically controlled by locked doors with restricted key access. Never attempt to
              enter an HV area without proper authorisation — even if the door appears to be
              unlocked, entry without permission is a serious safety breach.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Substation layouts">
            <p>
              A typical indoor substation in a commercial building contains the RMU, one or two
              transformers, and the LV main switchboard. The HV and LV sections may be in the same
              room or separated by a firewall. The HV section requires restricted access, whilst the
              LV switchboard may be more accessible for routine maintenance. Always check the room
              layout and identify the HV section boundaries before commencing any work in a
              substation environment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The default: no unsupervised access to live HV conductors">
            <p>
              Under the Electricity at Work Regulations 1989, no person shall be engaged in any work
              activity on or near any live conductor other than one suitably insulated unless it is
              reasonable for them to be at work on or near it. For HV systems, this means strict
              access control and formal safety documentation at all times.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'The five HV safety rules, in strict order: Disconnect, Isolate, Secure, Prove Dead, Earth.',
              'HV exceeds 1000 V AC / 1500 V DC. UK primary distribution is typically 11 kV.',
              'SF6 (GWP ~23,500x CO2, sealed for life) and vacuum (no gas, up to 30,000 operations) are the two current HV breaker technologies; oil is legacy.',
              'A ring main unit is a 3-panel assembly: two ring switches plus a tee-off panel protecting the transformer, and it stays energised even when the LV side is isolated.',
              'Only a formally appointed Authorised Person may switch HV equipment or issue HV safety documents.',
              'EAWR 1989 — HV definitions, safe systems. Distribution Safety Rules govern DNO HV work. EU F-Gas Regulations govern SF6 handling. IEC 62271 covers HV switchgear standards.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Low Voltage Switchgear (MCBs, MCCBs)
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Circuit Breaker Operations
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section1_2;
