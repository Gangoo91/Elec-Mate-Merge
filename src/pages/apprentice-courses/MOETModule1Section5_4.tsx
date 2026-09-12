/**
 * MOET · Module 1 · Section 1.5 · Subsection 4 — Environmental Legislation and Local Policies
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
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge · "Environmental regulations and standards – impact on role:
 *                Environmental Management Systems standard, Environmental
 *                Protection Act, and Hazardous Waste Regulations."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Statutory references in this page (Environmental Protection Act 1990,
 * Environment Act 2021, Climate Change Act 2008, F-Gas Regulations, Oil
 * Storage Regulations, Control of Noise at Work Regulations 2005) are
 * paraphrases of the legislation, not verbatim quotes — none are wrapped in
 * <RegsCallout>, per the conversion rule that RegsCallout is reserved for an
 * original that already contains a verbatim quote.
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

const TITLE = 'Environmental Legislation and Local Policies - MOET Module 1 Section 5.4';
const DESCRIPTION =
  'Comprehensive guide to environmental legislation for electrical maintenance technicians: Environmental Protection Act 1990, Environment Act 2021, Climate Change Act 2008, Building Regulations Part L, F-Gas Regulations, oil storage, noise regulations, pollution prevention and spill response aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'epa-1990',
    question: 'What is the primary purpose of the Environmental Protection Act 1990?',
    options: [
      'To set the minimum energy efficiency standards for new and existing buildings',
      'To provide the framework for waste management, contaminated land control and statutory nuisance, protecting the environment from pollution',
      'To regulate the handling and recovery of fluorinated greenhouse gases such as SF6',
      'To establish the net zero greenhouse gas emissions target for the UK',
    ],
    correctIndex: 1,
    explanation:
      'The Environmental Protection Act 1990 is the cornerstone of UK environmental legislation. It establishes the framework for integrated pollution control, waste management (including the duty of care for waste), contaminated land remediation, and statutory nuisance. For maintenance technicians, Parts II (waste management) and III (statutory nuisance) are most directly relevant.',
  },
  {
    id: 'fgas-sf6',
    question:
      'Under the F-Gas Regulations, what is required when maintaining switchgear containing SF6?',
    options: [
      'SF6 may be vented to atmosphere provided the area is well ventilated',
      'SF6 must be replaced with nitrogen at every scheduled maintenance visit',
      'SF6 must be recovered by certified personnel, leaks detected and repaired, and records maintained',
      'SF6 equipment can be worked on by any competent electrician without certification',
    ],
    correctIndex: 2,
    explanation:
      'The Fluorinated Greenhouse Gases Regulations (F-Gas Regulations) require that SF6 is recovered from switchgear during maintenance and decommissioning by certified personnel. Regular leak checks are mandatory for equipment containing SF6 above specified thresholds. Records of quantities installed, added, recovered and recycled must be maintained. Deliberate release of SF6 to atmosphere is a criminal offence.',
  },
  {
    id: 'oil-storage',
    question:
      'What is the minimum secondary containment requirement for oil storage under the Oil Storage Regulations?',
    options: [
      'A bund capable of containing 50% of the volume of the largest container',
      'A drip tray capable of holding 10% of the total volume of oil stored',
      'A bund capable of containing 100% of the total volume of all containers',
      'A bund holding 110% of the largest container, or 25% of the total volume',
    ],
    correctIndex: 3,
    explanation:
      'The Oil Storage Regulations (Control of Pollution (Oil Storage) (England) Regulations 2001) require secondary containment (bunding) capable of holding 110% of the largest container within the bund, or 25% of the total volume of all containers, whichever is greater. The bund must be impermeable and able to resist the stored oil. This applies to transformer oil, hydraulic oil and any other oil stored on site above the threshold quantity.',
  },
  {
    id: 'pollution-incident',
    question:
      'If transformer oil spills into a surface water drain during maintenance, what should you do FIRST?',
    options: [
      'Dilute the oil with water and flush it through the drain to disperse it',
      'Apply detergent to break up the oil so it washes away more easily',
      'Contain the spill, keep oil out of the drain and notify the Environment Agency',
      'Leave the spill to evaporate and record it in the site diary after the shift',
    ],
    correctIndex: 2,
    explanation:
      'A spill of transformer oil into a watercourse or drain is a pollution incident that could cause serious environmental damage. Your immediate actions should be: (1) Stop the source of the spill; (2) Contain the spill using absorbent materials, drain mats or booms to prevent further spread; (3) Prevent oil entering drains using drain covers or absorbent socks; (4) Notify the Environment Agency incident hotline (0800 80 70 60) immediately. Never dilute oil with water or wash it into a drain.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The Environment Act 2021 introduced several new environmental provisions. Which of the following is a key feature?',
    options: [
      'It abolished the Environmental Protection Act 1990 and replaced it entirely',
      'It set up the Office for Environmental Protection as an independent watchdog',
      'It transferred all environmental enforcement powers to local authorities',
      'It removed the requirement for environmental permits on industrial sites',
    ],
    correctAnswer: 1,
    explanation:
      'The Environment Act 2021 established the Office for Environmental Protection (OEP) as an independent body to hold government and public authorities to account on environmental law. It also introduced legally binding environmental targets, enhanced biodiversity requirements (biodiversity net gain for development), extended producer responsibility, and deposit return schemes. It builds upon rather than replaces the Environmental Protection Act 1990.',
  },
  {
    id: 2,
    question: 'The Climate Change Act 2008 (as amended) commits the UK to:',
    options: [
      'Eliminating all use of fossil fuels by 2030',
      'Reducing greenhouse gas emissions by 50% by 2050',
      'Achieving net zero greenhouse gas emissions by 2050',
      'Reducing electricity consumption by 80% by 2040',
    ],
    correctAnswer: 2,
    explanation:
      'The Climate Change Act 2008, amended in 2019, commits the UK to achieving net zero greenhouse gas emissions by 2050. This legally binding target drives policy across all sectors, including the built environment and industry. For maintenance technicians, this means increasing demand for energy efficiency improvements, electrification of heating, and management of fluorinated greenhouse gases like SF6.',
  },
  {
    id: 3,
    question: 'Building Regulations Part L relates to:',
    options: [
      'Fire safety — means of escape and fire-resisting construction',
      'Ventilation — air supply rates and condensation control in buildings',
      'Electrical safety — design and installation of fixed wiring',
      'Conservation of fuel and power — energy efficiency requirements for buildings',
    ],
    correctAnswer: 3,
    explanation:
      'Building Regulations Approved Document L covers the conservation of fuel and power — it sets minimum energy efficiency standards for both new and existing buildings. Part L applies to electrical work including lighting (minimum efficacy requirements), controls (time and occupancy controls), and power (energy metering). When upgrading electrical systems as part of maintenance or refurbishment, Part L compliance may be required.',
  },
  {
    id: 4,
    question: 'SF6 has a global warming potential (GWP) of approximately:',
    options: ['23,500 times CO2', '1,000 times CO2', '100 times CO2', '100,000 times CO2'],
    correctAnswer: 0,
    explanation:
      'SF6 has a global warming potential of approximately 23,500 — meaning one kilogram of SF6 released to the atmosphere has the same warming effect as 23,500 kilograms of CO2. Its atmospheric lifetime is over 3,200 years. This extreme potency is why the F-Gas Regulations strictly control its use, require leak detection and repair, mandate recovery during maintenance, and encourage the development of SF6-free switchgear alternatives.',
  },
  {
    id: 5,
    question:
      'Under the Control of Pollution (Oil Storage) Regulations, which of the following applies to transformer oil storage?',
    options: [
      'Oil may be stored in any container provided it is kept under cover from rain',
      'Oil must sit in impermeable bunds, with secure fittings, clear of drains',
      'Oil must be removed from the site at the end of every working day',
      'Oil storage is exempt from regulation if the total volume is below 1,000 litres',
    ],
    correctAnswer: 1,
    explanation:
      'The Oil Storage Regulations apply to the storage of any oil (including transformer oil) in containers above 200 litres. Oil must be stored in suitable containers within an impermeable bund. The bund must not have any drainage valve. Containers must have secure, tamper-proof fittings. The storage area must be positioned away from drains, watercourses and sensitive areas. Sight gauges must be properly maintained to prevent leaks.',
  },
  {
    id: 6,
    question:
      'The Environmental Permitting (England and Wales) Regulations 2016 require an environmental permit for:',
    options: [
      'Any electrical work carried out on a commercial or industrial premises',
      'The storage of any quantity of oil or fuel on a construction site',
      'Activities that may pollute: waste, emissions, discharge and flood risk',
      'The installation of renewable energy systems above a certain capacity',
    ],
    correctAnswer: 2,
    explanation:
      'The Environmental Permitting Regulations consolidate several pollution control regimes into a single permitting system. Activities that may require a permit include waste operations (storage, treatment, disposal), industrial installations with significant emissions, discharges to surface water or groundwater, and activities that could affect flood risk. Some lower-risk activities may be covered by exemptions rather than full permits.',
  },
  {
    id: 7,
    question: 'Noise from electrical maintenance activities is regulated under:',
    options: [
      'The Control of Noise at Work Regulations 2005 only, covering worker exposure',
      'The Environmental Protection Act 1990 Part III only, covering statutory nuisance',
      'The Health and Safety at Work etc. Act 1974, Section 2, exclusively',
      'Both the Noise at Work Regulations 2005 and EPA 1990 Part III together',
    ],
    correctAnswer: 3,
    explanation:
      'Noise from maintenance is regulated under two separate frameworks: The Control of Noise at Work Regulations 2005 protect workers from hearing damage (lower exposure action value 80 dB(A), upper 85 dB(A)). The Environmental Protection Act 1990 Part III deals with statutory nuisance — noise from sites that unreasonably disturbs neighbours. Maintenance technicians must comply with both: protecting their own hearing and avoiding nuisance to others.',
  },
  {
    id: 8,
    question:
      'A site environmental management plan (SEMP) for a maintenance project should include:',
    options: [
      'Environmental risks, prevention measures, waste, emergency and monitoring plans',
      'A schedule of all the electrical test results recorded during the works',
      'The commercial pricing and payment terms agreed with the client',
      'The competence and training records of every operative on the site',
    ],
    correctAnswer: 0,
    explanation:
      'A SEMP is a practical document that identifies the environmental risks associated with the work (pollution, waste, noise, dust, contamination), sets out the prevention and control measures, defines waste management procedures, describes emergency response plans for spills and pollution incidents, and establishes monitoring and reporting arrangements. It is a comprehensive environmental control document for the project.',
  },
  {
    id: 9,
    question:
      'If you discover asbestos-containing material while carrying out electrical maintenance in an older building, you should:',
    options: [
      'Carefully remove the material yourself and bag it as hazardous waste',
      'Stop, do not disturb it, secure the area and report to the duty holder',
      'Dampen the material with water to suppress dust and continue working around it',
      'Continue the work but wear a dust mask and wash your hands afterwards',
    ],
    correctAnswer: 1,
    explanation:
      'If you encounter suspected asbestos during maintenance (common in older buildings — cable routes, switchrooms, boiler rooms), you must stop work immediately. Do not disturb the material. Seal off the area to prevent access. Report to your supervisor and the duty holder (who should have an asbestos management plan and register). Only licensed asbestos removal contractors can remove asbestos-containing materials. The Control of Asbestos Regulations 2012 apply.',
  },
  {
    id: 10,
    question: 'Corporate environmental responsibility for a maintenance company includes:',
    options: [
      'Meeting only the minimum legal requirements and nothing further',
      'Delegating all environmental duties to a single appointed officer',
      'Compliance plus a management system, targets, training and supply-chain action',
      'Focusing solely on carbon reduction while ignoring waste and pollution',
    ],
    correctAnswer: 2,
    explanation:
      'Corporate environmental responsibility goes beyond minimum legal compliance. It includes implementing an environmental management system (e.g., ISO 14001), setting measurable improvement targets (waste reduction, carbon reduction, energy efficiency), providing environmental training for all staff, transparently reporting environmental performance, and working with suppliers and subcontractors to improve environmental standards throughout the supply chain.',
  },
  {
    id: 11,
    question:
      'The Environment Agency incident hotline number for reporting pollution incidents in England is:',
    options: ['999', '101', '111', '0800 80 70 60'],
    correctAnswer: 3,
    explanation:
      'The Environment Agency incident hotline is 0800 80 70 60. This should be used to report pollution incidents (oil spills, chemical releases, fish kills, illegal waste disposal, water contamination) in England. In Scotland, contact SEPA on 0800 80 70 60 (same number). In Wales, contact Natural Resources Wales on 0300 065 3000. The hotline operates 24 hours a day, 7 days a week.',
  },
  {
    id: 12,
    question:
      'Under the F-Gas Regulations, leak checks on switchgear containing SF6 must be carried out:',
    options: [
      'At intervals set by gas quantity, by certified staff, records kept 5 years',
      'Only once, when the equipment is first installed and commissioned',
      'Every five years regardless of the quantity of gas in the equipment',
      'Only when a fault or low-pressure alarm is indicated by the equipment',
    ],
    correctAnswer: 0,
    explanation:
      'The F-Gas Regulations require leak checks on SF6-containing equipment at intervals determined by the quantity of gas: equipment containing 5 tonnes CO2 equivalent or more (approximately 0.21 kg SF6) must be checked at least annually, with more frequent checks for larger quantities. Checks must be carried out by certified personnel, and records must be maintained for at least 5 years. Automatic leak detection systems may extend the intervals between manual checks.',
  },
];

const faqs = [
  {
    question: "What environmental legislation applies when I am working on a client's site?",
    answer:
      "All relevant environmental legislation applies regardless of whose site you are working on. As a contractor, you must comply with the Environmental Protection Act 1990 (duty of care for waste), COSHH Regulations (hazardous substances), the Oil Storage Regulations (if handling oils), F-Gas Regulations (if working with SF6 or refrigerants), and noise regulations. Additionally, you must comply with the client's site environmental rules and any conditions in their environmental permit. Ignorance of the client's requirements is not a defence.",
  },
  {
    question: 'Do I need to worry about F-Gas Regulations as an electrical maintenance technician?',
    answer:
      'Yes, if you work with HV or MV switchgear containing SF6, or if you maintain air conditioning or heat pump systems containing fluorinated refrigerants. The F-Gas Regulations require that SF6 is recovered by certified personnel during maintenance and decommissioning. If you work on refrigeration/air conditioning systems, you need an F-Gas handling certificate. Even if you do not handle these gases directly, you should understand the regulations to ensure specialists are engaged when needed.',
  },
  {
    question: "What should be in my van's spill kit for environmental protection?",
    answer:
      'A basic maintenance van spill kit should include: oil-absorbent granules or pads (for transformer oil and hydraulic oil spills), a drain cover or mat (to prevent spills reaching surface water drains), nitrile gloves and safety glasses, waste bags for contaminated absorbent material, and the Environment Agency incident hotline number (0800 80 70 60). If you regularly work with batteries, include acid-neutralising absorbent. The kit should be easily accessible and regularly checked.',
  },
  {
    question: 'What is the difference between a statutory nuisance and a planning condition?',
    answer:
      'A statutory nuisance (under the Environmental Protection Act 1990 Part III) is a condition that is prejudicial to health or a nuisance — such as excessive noise, dust, fumes or artificial light from a premises. It can be enforced by the local authority through abatement notices. Planning conditions are requirements attached to a planning permission — they may include restrictions on operating hours, noise levels, lighting design, and waste management. Both may affect when and how you carry out maintenance work on a site.',
  },
  {
    question: 'How does environmental legislation connect to my ST1426 apprenticeship?',
    answer:
      'ST1426 requires maintenance technicians to understand and comply with environmental legislation and organisational policies. You must demonstrate knowledge of waste management regulations, pollution prevention, energy efficiency requirements, and sustainable working practices. This is assessed in your end-point assessment through knowledge tests and professional discussion. Showing that you understand the legal framework — not just the practical actions — demonstrates the depth of knowledge expected at technician level.',
  },
];

const MOETModule1Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.5 · Subsection 4"
        title="Environmental Legislation and Local Policies"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding the legal framework for environmental protection in electrical
            maintenance.
          </p>

          <TLDR
            points={[
              'EPA 1990: Waste duty of care, pollution control, statutory nuisance.',
              'Environment Act 2021: OEP, biodiversity net gain, producer responsibility.',
              'Climate Change Act: Net zero by 2050 — legally binding target.',
              'F-Gas Regs: SF6 recovery, leak detection, certified personnel.',
              'Oil storage: Transformer oil requires bunding and spill prevention.',
              'SF6 switchgear: F-Gas certified technicians only.',
              'Part L: Applies to lighting and controls upgrades.',
              'ST1426: Maps to environmental and regulatory compliance KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the key provisions of the Environmental Protection Act 1990 and Environment Act 2021',
              "Describe the UK's net zero commitment under the Climate Change Act 2008",
              'Apply Building Regulations Part L requirements to electrical maintenance and upgrade work',
              'Understand F-Gas Regulations as they apply to SF6 in switchgear',
              'Implement oil storage and pollution prevention measures on maintenance sites',
              'Develop appropriate spill response plans for electrical oils and hazardous substances',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Core Environmental Legislation</ContentEyebrow>

          <ConceptBlock title="Core Environmental Legislation">
            <p>
              UK environmental legislation has developed over decades into a comprehensive framework
              that protects air, water, land and communities from pollution. As a maintenance
              technician, you must understand the key legislation that affects your work — not just
              to avoid prosecution, but because environmental responsibility is a professional
              obligation and a core part of the ST1426 standard.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Environmental Protection Act 1990 (EPA)">
            <p>
              The EPA is the foundation of UK environmental law. Its key parts relevant to
              electrical maintenance are:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part I — Integrated Pollution Control:</strong> Controls emissions to air,
                water and land from industrial processes. Applies to large industrial installations
                where you may carry out maintenance
              </li>
              <li>
                <strong>Part II — Waste Management:</strong> Establishes the duty of care for waste
                (Section 34), the offence of unlawful deposit (Section 33), and the licensing system
                for waste management. This part is directly relevant every time you create waste on
                site
              </li>
              <li>
                <strong>Part III — Statutory Nuisance:</strong> Covers noise, dust, fumes,
                artificial light and other nuisances from premises. Your maintenance activities must
                not create a statutory nuisance for neighbouring occupants
              </li>
              <li>
                <strong>Part IIA — Contaminated Land:</strong> Establishes the regime for
                identifying and remediating contaminated land. Relevant when working on brownfield
                sites or near historically contaminated areas
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Environment Act 2021">
            <p>
              The Environment Act 2021 is the most significant piece of environmental legislation
              since the EPA. It was enacted partly to replace EU environmental governance following
              Brexit and introduces several new provisions:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Office for Environmental Protection (OEP):</strong> Independent body to
                scrutinise government environmental policy and enforce environmental law
              </li>
              <li>
                <strong>Legally binding environmental targets:</strong> For air quality, water,
                biodiversity and resource efficiency
              </li>
              <li>
                <strong>Biodiversity net gain:</strong> New developments must deliver a minimum 10%
                biodiversity net gain — affects construction and major refurbishment projects
              </li>
              <li>
                <strong>Extended producer responsibility:</strong> Manufacturers bear greater
                responsibility for the end-of-life costs of their products — relevant to WEEE
              </li>
              <li>
                <strong>Deposit return schemes:</strong> For drinks containers — may affect waste
                management on sites
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Climate Change Act 2008 (as amended 2019)">
            <p>
              The Climate Change Act set the world&apos;s first legally binding national greenhouse
              gas reduction target. As amended in 2019, it commits the UK to net zero emissions by
              2050.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Net zero target:</strong> All sectors must reduce emissions to achieve net
                zero by 2050
              </li>
              <li>
                <strong>Carbon budgets:</strong> Five-yearly caps on total UK emissions, enforced by
                the Climate Change Committee
              </li>
              <li>
                <strong>Adaptation:</strong> Organisations must assess and plan for climate change
                impacts
              </li>
              <li>
                <strong>Maintenance impact:</strong> Drives demand for energy efficiency,
                electrification of heating, SF6 phase-down, and low-carbon technologies
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Enforcement Powers">
            <p>
              Environmental legislation is enforced by the Environment Agency in England, Natural
              Resources Wales, SEPA in Scotland, and NIEA in Northern Ireland. These regulators have
              extensive powers including prosecution (unlimited fines and imprisonment), civil
              sanctions (variable monetary penalties), enforcement notices, and stop notices. Local
              authorities enforce statutory nuisance provisions. Environmental offences carry a
              criminal record and can result in directors&apos; personal liability.
            </p>
            <p>
              <strong>Key point:</strong> Environmental legislation applies to everyone — not just
              large industrial companies. A sole trader electrician who fly-tips waste, allows oil
              to pollute a watercourse, or releases SF6 to atmosphere faces the same criminal
              penalties as a multinational corporation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>
            Building Regulations Part L and Energy-Related Legislation
          </ContentEyebrow>

          <ConceptBlock title="Building Regulations Part L and Energy-Related Legislation">
            <p>
              Building Regulations Approved Document L (Conservation of fuel and power) sets minimum
              energy efficiency standards for buildings. While Part L primarily applies to new
              buildings and major renovations, it also has implications for maintenance work that
              involves replacing or upgrading controlled services — including lighting, heating
              controls, and mechanical ventilation systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Part L Requirements for Electrical Work">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting efficacy:</strong> When replacing lighting systems, new luminaires
                must meet minimum efficacy requirements (lumens per circuit watt). This effectively
                mandates LED or other high-efficiency sources in most applications
              </li>
              <li>
                <strong>Lighting controls:</strong> Replaced lighting systems must include
                appropriate controls — time switches, occupancy sensors, daylight dimming —
                depending on the building type and space
              </li>
              <li>
                <strong>Metering:</strong> Part L requires energy metering provisions for new and
                refurbished buildings to enable monitoring of energy consumption
              </li>
              <li>
                <strong>Consequential improvements:</strong> When extending or renovating a building
                above certain thresholds, energy efficiency improvements to the existing building
                may be required
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Energy Performance Certificates (EPCs)">
            <p>
              EPCs rate buildings from A (most efficient) to G (least efficient). The Minimum Energy
              Efficiency Standards (MEES) set minimum EPC ratings for rented buildings:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current requirement:</strong> Commercial and residential rented properties
                must achieve a minimum EPC rating of E
              </li>
              <li>
                <strong>Future trajectory:</strong> The government has indicated that minimum
                standards will rise to EPC C for commercial properties, driving significant demand
                for energy efficiency upgrades
              </li>
              <li>
                <strong>Maintenance relevance:</strong> Energy efficiency improvements carried out
                during maintenance (LED lighting, controls upgrades, power factor correction)
                directly improve EPC ratings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Energy Efficiency Related Legislation">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Legislation</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Relevance to Maintenance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Building Regulations Part L
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Minimum standards for lighting, controls and metering in new and refurbished
                      buildings
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">ESOS Regulations</td>
                    <td className="border border-white/10 px-3 py-2">
                      Large organisations must carry out energy audits — maintenance data feeds into
                      these assessments
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">SECR Regulations</td>
                    <td className="border border-white/10 px-3 py-2">
                      Companies must report energy consumption and carbon emissions — maintenance
                      affects these figures
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      EU Ecodesign (retained UK law)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Minimum efficiency classes for motors (IE3/IE4), fans, pumps, lighting —
                      affects replacement specifications
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">MEES Regulations</td>
                    <td className="border border-white/10 px-3 py-2">
                      Minimum EPC rating for rented properties — drives demand for efficiency
                      upgrades
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Practical note:</strong> When specifying replacement motors during
              maintenance, you must now comply with Ecodesign requirements. Since 1 July 2023,
              single-speed three-phase motors from 0.75 kW to 200 kW must be IE3 efficiency class
              (IE4 for 75-200 kW). Do not replace a failed motor with a lower efficiency unit — it
              may be illegal and it will increase energy costs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>F-Gas Regulations and SF6 in Switchgear</ContentEyebrow>

          <ConceptBlock title="F-Gas Regulations and SF6 in Switchgear">
            <p>
              The Fluorinated Greenhouse Gases Regulations (commonly called the F-Gas Regulations)
              control the use, handling and disposal of fluorinated greenhouse gases, including SF6
              (sulphur hexafluoride) used in medium and high-voltage switchgear. SF6 is the most
              potent greenhouse gas known — with a global warming potential 23,500 times that of CO2
              and an atmospheric lifetime exceeding 3,200 years. Even small releases have a
              disproportionate climate impact.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SF6 in Electrical Switchgear">
            <p>
              SF6 is used as an insulating and arc-quenching medium in gas-insulated switchgear
              (GIS) and ring main units (RMUs) at voltages from 6.6 kV to 400 kV and above. Its
              excellent dielectric properties allow compact switchgear designs, but its
              environmental impact is driving a transition to alternative technologies.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Applications:</strong> GIS, RMUs, circuit breakers, current transformers,
                bushings
              </li>
              <li>
                <strong>Quantity:</strong> A typical 11 kV RMU may contain 1-5 kg of SF6; large 400
                kV GIS substations may contain hundreds of kilograms
              </li>
              <li>
                <strong>Alternatives:</strong> Manufacturers are developing SF6-free switchgear
                using clean air, fluoronitrile (C4F7N) and fluoroketone (C5F10O) mixtures
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="F-Gas Regulation Requirements for SF6">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Leak detection:</strong> Equipment containing SF6 above 5 tonnes CO2e
                (approx. 0.21 kg SF6) must have regular leak checks at intervals depending on
                quantity
              </li>
              <li>
                <strong>Leak repair:</strong> Detected leaks must be repaired without undue delay,
                with a follow-up check within 1 month
              </li>
              <li>
                <strong>Recovery:</strong> SF6 must be recovered during maintenance and
                decommissioning — never vented to atmosphere
              </li>
              <li>
                <strong>Certification:</strong> Personnel handling SF6 must hold appropriate
                certification
              </li>
              <li>
                <strong>Record keeping:</strong> Operators must maintain records of SF6 quantities
                installed, added, recovered, recycled, reclaimed and destroyed — records kept for 5
                years minimum
              </li>
              <li>
                <strong>Labelling:</strong> Equipment containing SF6 must be labelled with the type
                and quantity of gas
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Venting SF6 to atmosphere during maintenance"
            whatHappens={
              <>
                The deliberate release of SF6 to the atmosphere is a criminal offence under the
                F-Gas Regulations. This includes venting gas during maintenance rather than using
                recovery equipment. Penalties include unlimited fines. Even accidental releases
                through poor maintenance must be reported and recorded.
              </>
            }
            doInstead={
              <>
                If you discover that SF6 equipment has a leak, report it immediately and arrange
                certified repair.
              </>
            }
          />

          <ConceptBlock title="SF6 Phase-Down">
            <p>
              The UK (and EU) are progressively restricting the use of SF6 in new equipment. The
              trend is towards SF6-free switchgear using alternative insulating media. As a
              maintenance technician, you should expect to encounter both legacy SF6 equipment
              (requiring certified maintenance and eventual decommissioning) and new SF6-free
              technologies. Understanding both is important for your career development and for
              supporting your employer&apos;s environmental objectives.
            </p>
            <p>
              <strong>Key point:</strong> If you are asked to work on SF6-containing switchgear and
              you do not hold the appropriate F-Gas certification, you must refuse and explain why.
              Working on SF6 equipment without certification is not only illegal — it is potentially
              dangerous due to the toxic decomposition products of SF6 after arcing.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Oil Storage, Pollution Prevention and Spill Response</ContentEyebrow>

          <ConceptBlock title="Oil Storage, Pollution Prevention and Spill Response">
            <p>
              Oil is one of the most common pollutants in the UK environment. Transformer oil,
              hydraulic oil, lubricating oil and diesel fuel are all present on many maintenance
              sites. A single litre of oil can contaminate one million litres of drinking water. The
              legal and environmental consequences of an oil spill are severe, and as a maintenance
              technician handling or working near oil-filled equipment, you must understand your
              obligations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Oil Storage Regulations">
            <p>
              The Control of Pollution (Oil Storage) (England) Regulations 2001 set out requirements
              for the storage of oil in containers above 200 litres:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Containers:</strong> Must be of sufficient strength and structural integrity
                to prevent leakage in normal use
              </li>
              <li>
                <strong>Bunding:</strong> Secondary containment (bund) must hold 110% of the largest
                container or 25% of total volume, whichever is greater
              </li>
              <li>
                <strong>Bund construction:</strong> Impermeable to water and oil, with no drainage
                valve
              </li>
              <li>
                <strong>Fittings:</strong> Taps, valves, sight gauges and fill pipes must be within
                the bund and protected from damage
              </li>
              <li>
                <strong>Location:</strong> Away from drains, watercourses, sensitive areas; on
                stable, impermeable ground
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pollution Prevention for Electrical Maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transformer maintenance:</strong> Use drip trays under any connection being
                broken; have absorbent material ready; check bund condition before oil-fill or
                oil-drain operations
              </li>
              <li>
                <strong>Cable installation:</strong> When pulling cables near watercourses, use
                containment measures for cable-pulling lubricant
              </li>
              <li>
                <strong>Generator maintenance:</strong> Diesel generators have fuel tanks and
                lubricating oil — check bunding, inspect for leaks, and have spill kits available
              </li>
              <li>
                <strong>Hydraulic equipment:</strong> Hydraulic access platforms and lifting
                equipment contain oil that can leak — inspect hoses and connections before use
              </li>
              <li>
                <strong>Vehicle drips:</strong> Your maintenance van or work vehicle can drip oil
                and fuel — be aware of parking location relative to drains
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Spill Response Procedure">
            <p>If an oil or chemical spill occurs during maintenance, follow the STOP procedure:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>S — Stop the source:</strong> Close valves, stem the flow, prevent further
                release
              </li>
              <li>
                <strong>T — Tell someone:</strong> Report to your supervisor. If the spill reaches
                or threatens a watercourse or drain, call the Environment Agency on 0800 80 70 60
              </li>
              <li>
                <strong>O — Obstruct the flow:</strong> Deploy drain covers, absorbent booms, earth
                bunds to contain the spill and prevent it reaching drains or water
              </li>
              <li>
                <strong>P — Prevent recurrence:</strong> Investigate the cause. Implement corrective
                actions to prevent a similar incident
              </li>
            </ul>
            <p>
              <strong>Never</strong> wash oil into a drain with water. Never use detergent to
              disperse an oil spill — this makes it harder to recover and increases environmental
              damage. Always contain, absorb and recover.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Noise Regulations">
            <p>
              Noise from maintenance activities is controlled by two separate regulatory frameworks:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Occupational noise:</strong> The Control of Noise at Work Regulations 2005
                protect workers. Lower exposure action value: 80 dB(A) daily average (provide
                hearing protection). Upper action value: 85 dB(A) (hearing protection mandatory,
                exposure reduction required). Exposure limit: 87 dB(A) (must not be exceeded)
              </li>
              <li>
                <strong>Environmental noise:</strong> The EPA 1990 Part III covers statutory
                nuisance from noise. Local planning conditions may also restrict hours and noise
                levels. Best practice: Section 61 of the Control of Pollution Act 1974 allows you to
                agree a &apos;prior consent&apos; with the local authority for noisy works
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Environmental incidents must be reported and recorded.
              Even if a spill is contained and cleaned up quickly, record it as a near miss.
              Analysis of near misses prevents future incidents that could result in prosecution,
              environmental damage and reputational harm.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>
            Site Environmental Management and Corporate Responsibility
          </ContentEyebrow>

          <ConceptBlock title="Site Environmental Management and Corporate Responsibility">
            <p>
              Beyond individual legal obligations, organisations are increasingly expected to
              demonstrate broader environmental responsibility. Clients, regulators and the public
              expect maintenance companies to have robust environmental management systems, set
              improvement targets, and report on their environmental performance. Understanding this
              context helps you appreciate why environmental compliance matters and how your actions
              contribute to the bigger picture.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Site Environmental Management Plans (SEMPs)">
            <p>
              For maintenance projects — particularly those on sensitive sites or involving
              hazardous substances — a site environmental management plan (SEMP) sets out how
              environmental risks will be managed:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk identification:</strong> What environmental risks does the work create?
                (Oil spill, chemical release, dust, noise, waste)
              </li>
              <li>
                <strong>Prevention measures:</strong> How will each risk be prevented? (Bunding,
                containment, dust suppression, noise barriers)
              </li>
              <li>
                <strong>Waste management:</strong> How will waste be segregated, stored, documented
                and disposed of?
              </li>
              <li>
                <strong>Emergency response:</strong> What are the procedures for spills, releases
                and pollution incidents?
              </li>
              <li>
                <strong>Monitoring:</strong> How will environmental performance be checked during
                the works?
              </li>
              <li>
                <strong>Responsibilities:</strong> Who is responsible for each element of the SEMP?
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ISO 14001 Environmental Management">
            <p>
              ISO 14001 is the international standard for environmental management systems (EMS).
              Many maintenance companies and their clients are certified to ISO 14001, which
              requires the organisation to identify its environmental impacts, set objectives and
              targets for improvement, implement operational controls, monitor performance, and
              carry out regular management reviews. As a technician working for an ISO 14001
              certified company, you must follow the EMS procedures and contribute to the
              environmental objectives.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Environmental Permits">
            <p>
              Some sites where you carry out maintenance will operate under environmental permits
              issued by the Environment Agency. These permits set conditions for emissions, waste
              management, noise and other environmental aspects. When working on a permitted site,
              you must understand and comply with any permit conditions that affect your work — for
              example, restrictions on hours of operation, requirements for pollution prevention
              measures, or specific waste handling procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Corporate Environmental Responsibility">
            <p>
              Modern businesses are expected to go beyond minimum legal compliance. Corporate
              environmental responsibility includes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Carbon reporting:</strong> Measuring and reporting the company&apos;s carbon
                footprint under SECR or voluntary schemes
              </li>
              <li>
                <strong>Net zero commitments:</strong> Setting science-based targets for reducing
                greenhouse gas emissions
              </li>
              <li>
                <strong>Supply chain engagement:</strong> Working with suppliers and subcontractors
                to improve environmental performance
              </li>
              <li>
                <strong>Staff training:</strong> Ensuring all employees understand their
                environmental responsibilities
              </li>
              <li>
                <strong>Continuous improvement:</strong> Setting and reviewing annual environmental
                performance targets
              </li>
              <li>
                <strong>Transparency:</strong> Publishing environmental performance data in annual
                reports and on company websites
              </li>
            </ul>
            <p>
              <strong>Note:</strong> Many major clients now require contractors to demonstrate
              environmental competence as a condition of tendering for maintenance contracts. PAS
              2080 (carbon management in infrastructure), ISO 14001, and sector-specific
              environmental qualifications are increasingly required. Building your environmental
              knowledge is not just about compliance — it is about employability.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'EPA 1990 — Waste, pollution, statutory nuisance.',
              'Environment Act 2021 — OEP, biodiversity, targets.',
              'Climate Change Act 2008 — Net zero by 2050.',
              'Building Regulations Part L — Energy efficiency.',
              'F-Gas Regulations — SF6 recovery, leak checks.',
              'Oil Storage Regulations — Bunding, containment.',
              'Environment Agency — 0800 80 70 60.',
              'SEPA (Scotland) — 0800 80 70 60.',
              'NRW (Wales) — 0300 065 3000.',
              'HSE — 0345 300 9923.',
              'Emergency services — 999.',
              'Spill procedure — STOP (Stop, Tell, Obstruct, Prevent).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Environmental legislation knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Energy Efficiency in Maintenance
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Sustainable Work Practices
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section5_4;
