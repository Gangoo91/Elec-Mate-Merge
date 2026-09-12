/**
 * MOET · Module 1 · Section 1.5 · Subsection 1 — Waste Management and Recycling
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
 *   Knowledge  · "Recycling and waste management requirements."
 *   Skills     · "Segregate items for reuse, recycling, and waste."
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

const TITLE = 'Waste Management and Recycling - MOET Module 1 Section 5.1';
const DESCRIPTION =
  'Comprehensive guide to waste management and recycling for electrical maintenance technicians: duty of care, waste hierarchy, WEEE Regulations 2013, hazardous waste, waste transfer notes, and site segregation practices aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'waste-hierarchy',
    question: 'What is the correct order of the waste hierarchy from most to least preferred?',
    options: [
      'Recycle, reuse, dispose, recover, reduce',
      'Reduce, prevent, dispose, recycle, reuse, recover',
      'Dispose, recover, recycle, reuse, reduce, prevent',
      'Prevention, reduce, reuse, recycle, recover, dispose',
    ],
    correctIndex: 3,
    explanation:
      'The waste hierarchy, enshrined in the Waste (England and Wales) Regulations 2011, ranks waste management options from most to least preferred: prevention, reduction, reuse, recycling, other recovery (e.g., energy recovery), and disposal. Every decision you make on site should follow this order.',
  },
  {
    id: 'waste-transfer-note',
    question: 'How long must a waste transfer note be retained?',
    options: ['6 months', '1 year', '2 years', '3 years'],
    correctIndex: 2,
    explanation:
      'Under the Environmental Protection Act 1990 (Duty of Care Regulations), waste transfer notes must be retained for a minimum of 2 years. Hazardous waste consignment notes must be retained for a minimum of 3 years. These records provide an audit trail demonstrating lawful waste disposal.',
  },
  {
    id: 'weee-regs',
    question:
      'What do the WEEE Regulations 2013 specifically require producers and distributors to do?',
    options: [
      'Pay landfill tax on every item of electrical equipment they sell',
      'Finance the collection, treatment, recovery and environmentally sound disposal of WEEE',
      'Register every individual appliance with the Environment Agency before sale',
      'Recycle all packaging within 30 days of the product being sold',
    ],
    correctIndex: 1,
    explanation:
      'The Waste Electrical and Electronic Equipment (WEEE) Regulations 2013 place the responsibility on producers and distributors to finance and arrange the collection, treatment, recovery and environmentally sound disposal of waste electrical and electronic equipment. As maintenance technicians, you must ensure WEEE is separated and sent to approved treatment facilities.',
  },
  {
    id: 'hazardous-waste',
    question: 'Which of the following electrical waste items is classified as hazardous waste?',
    options: [
      'Clean copper cable offcuts',
      'Fluorescent tubes containing mercury',
      'PVC trunking and conduit',
      'Cardboard equipment packaging',
    ],
    correctIndex: 1,
    explanation:
      'Fluorescent tubes contain mercury, a toxic heavy metal, and are classified as hazardous waste under the Hazardous Waste (England and Wales) Regulations 2005. They must be stored separately in designated containers, handled carefully to avoid breakage, and disposed of through a licensed hazardous waste carrier with a consignment note.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Environmental Protection Act 1990, the 'duty of care' for waste applies to:",
    options: [
      'Only the final licensed disposal site that buries or incinerates the waste',
      'Anyone who produces, imports, carries, keeps, treats or disposes of controlled waste',
      'Only registered waste carriers who transport waste on the public highway',
      'Only the local authority responsible for the area where waste is created',
    ],
    correctAnswer: 1,
    explanation:
      'Section 34 of the Environmental Protection Act 1990 places a duty of care on anyone who produces, imports, carries, keeps, treats or disposes of controlled waste. This means that as a maintenance technician, you are legally responsible for any waste you generate from the moment it is created until it is properly disposed of.',
  },
  {
    id: 2,
    question:
      'Which level of the waste hierarchy should a maintenance technician consider first when dealing with old cable?',
    options: [
      'Send it to landfill as the quickest disposal route',
      'Recover energy by sending it to an incineration plant',
      'Consider whether the cable can be reused on another project',
      'Strip the copper and recycle it as scrap metal',
    ],
    correctAnswer: 2,
    explanation:
      'Following the waste hierarchy, reuse is preferred over recycling and disposal. If the old cable is in good condition and meets current standards, reusing it on another suitable project is the most environmentally preferred option. If reuse is not possible, recycling the copper and PVC content is the next best option.',
  },
  {
    id: 3,
    question: 'What document must accompany hazardous waste when it leaves a site?',
    options: [
      'A delivery note from the supplier',
      'A standard waste transfer note',
      'A risk assessment',
      'A hazardous waste consignment note',
    ],
    correctAnswer: 3,
    explanation:
      'Hazardous waste must be accompanied by a hazardous waste consignment note when it leaves a premises. This is a legal requirement under the Hazardous Waste (England and Wales) Regulations 2005. The consignment note contains detailed information about the waste type, quantity, hazard codes, and the transfer chain from producer to disposal facility.',
  },
  {
    id: 4,
    question:
      'PCB-containing equipment (such as old capacitors and transformers) requires special disposal because:',
    options: [
      'PCBs are persistent organic pollutants that are toxic and bioaccumulative',
      'PCBs are highly flammable and present a serious fire risk in skips',
      'PCBs corrode steel containers and leak within a few days of storage',
      'PCBs are radioactive and require shielded storage containers',
    ],
    correctAnswer: 0,
    explanation:
      'Polychlorinated biphenyls (PCBs) are persistent organic pollutants — they do not break down in the environment, they accumulate in the food chain, and they are toxic to humans and wildlife. The POPs Regulations ban the use of PCBs and require that PCB-containing equipment is identified, registered and disposed of through specialist high-temperature incineration.',
  },
  {
    id: 5,
    question: 'What is the minimum requirement for a person or company to legally transport waste?',
    options: [
      'A valid hazardous waste consignment note for every load',
      'Registration as a waste carrier with the Environment Agency',
      'An environmental permit issued by the local authority',
      'ISO 14001 environmental management certification',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Controlled Waste (Registration of Carriers and Seizure of Vehicles) Regulations 1991 (as amended), anyone who transports controlled waste must be registered as a waste carrier with the Environment Agency (or equivalent authority in Scotland, Wales, or Northern Ireland). Carrying waste without registration is a criminal offence.',
  },
  {
    id: 6,
    question:
      'Which of the following is the correct method for disposing of waste batteries from UPS systems?',
    options: [
      'Place them in the general waste skip once they are fully discharged',
      'Crush them on site to reduce volume before recycling',
      'Store them in a designated battery collection point and arrange collection by a specialist waste carrier',
      'Pour the acid down the foul drain and recycle the empty casing',
    ],
    correctAnswer: 2,
    explanation:
      'Waste batteries, particularly lead-acid batteries from UPS systems, are classified as hazardous waste due to their acid content and heavy metal components. They must be stored securely in a designated collection point (acid-resistant bund), kept upright to prevent leakage, and collected by a specialist licensed waste carrier. The Waste Batteries and Accumulators Regulations 2009 set out these requirements.',
  },
  {
    id: 7,
    question: 'Landfill tax is designed to:',
    options: [
      'Fund the registration of waste carriers with the Environment Agency',
      'Pay for specialist collection of hazardous batteries and lamps',
      'Cover the cost of cleaning up illegal fly-tipping sites',
      'Discourage the disposal of waste to landfill and encourage recycling and recovery',
    ],
    correctAnswer: 3,
    explanation:
      'Landfill tax was introduced in 1996 to make landfill disposal more expensive, thereby encouraging businesses and individuals to reduce, reuse and recycle waste. The standard rate for 2024 is £103.70 per tonne, making it a significant cost driver that incentivises proper waste management planning.',
  },
  {
    id: 8,
    question:
      'When segregating waste on an electrical maintenance site, which of the following should be kept in a separate, sealed container?',
    options: [
      'Fluorescent tubes and other mercury-containing lamps',
      'Clean copper cable offcuts destined for scrap',
      'Cardboard and plastic equipment packaging',
      'Steel conduit and trunking offcuts',
    ],
    correctAnswer: 0,
    explanation:
      "Fluorescent tubes contain mercury and are classified as hazardous waste. They must be stored separately in sealed, clearly labelled containers to prevent breakage and mercury release. Broken lamps release mercury vapour which is harmful to health and the environment. Specialist lamp recycling containers (often called 'coffins') should be used.",
  },
  {
    id: 9,
    question: 'A site waste management plan (SWMP) is used to:',
    options: [
      'Register the site as a hazardous waste producer with the Environment Agency',
      'Forecast, manage and record all waste produced on a construction or maintenance project',
      'Calculate the landfill tax payable on each skip of mixed waste',
      'Certify that a waste carrier is licensed to transport controlled waste',
    ],
    correctAnswer: 1,
    explanation:
      'A site waste management plan (SWMP) is a planning tool that forecasts the types and quantities of waste a project will produce, identifies how each waste stream will be managed (reuse, recycle, recover, dispose), and records what actually happens. Although the legal requirement for SWMPs was removed in England in 2013, they remain best practice and are required by many clients and main contractors.',
  },
  {
    id: 10,
    question:
      'Under the WEEE Regulations 2013, which category covers most electrical maintenance waste such as luminaires, switchgear, and distribution boards?',
    options: [
      'Category 1 — Large household appliances',
      'Category 4 — Consumer equipment',
      'Multiple categories depending on the specific item',
      'Category 5 — Lighting equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical maintenance waste falls across multiple WEEE categories: luminaires are Category 5 (lighting equipment), large switchgear may be Category 1 (large equipment), and monitoring/control instruments are Category 9. It is important to identify the correct WEEE category for each item to ensure it reaches the appropriate approved treatment facility.',
  },
  {
    id: 11,
    question:
      'What is the main environmental concern with SF6 gas used in some high-voltage switchgear?',
    options: [
      'It depletes the ozone layer in the same way as old CFC refrigerants',
      'It is highly toxic and causes immediate harm if inhaled in small amounts',
      'It is extremely flammable and presents an explosion risk if released',
      'It is the most potent greenhouse gas known, with a global warming potential 23,500 times that of CO2',
    ],
    correctAnswer: 3,
    explanation:
      'Sulphur hexafluoride (SF6) is the most potent greenhouse gas known to science, with a global warming potential 23,500 times greater than CO2 and an atmospheric lifetime of over 3,200 years. The F-Gas Regulations require that SF6 is recovered during maintenance and decommissioning of switchgear, and that certified technicians carry out the work.',
  },
  {
    id: 12,
    question:
      'Which regulation requires that waste oil from transformers is disposed of correctly?',
    options: [
      'The Waste (England and Wales) Regulations 2011 and the Hazardous Waste Regulations 2005',
      'The WEEE Regulations 2013 and the Packaging Waste Regulations 2007',
      'The Control of Pollution Act 1974 and the Clean Air Act 1993 only',
      'The Waste Batteries and Accumulators Regulations 2009 alone',
    ],
    correctAnswer: 0,
    explanation:
      'Waste transformer oil is classified as hazardous waste under the Hazardous Waste Regulations 2005 and must be managed in accordance with the Waste (England and Wales) Regulations 2011. It must be stored in sealed, bunded containers, collected by a licensed hazardous waste carrier, and accompanied by a consignment note. The Oil Storage Regulations also apply to the storage of oils on site.',
  },
];

const faqs = [
  {
    question: 'Can I put old cables in a general skip on site?',
    answer:
      'It depends on the cable type. Clean copper or aluminium cable offcuts are non-hazardous and can be placed in a designated metals recycling skip. However, cables containing lead sheathing, asbestos-containing cables (found in pre-1990 installations), or cables contaminated with oil or chemicals are hazardous waste and must be segregated and disposed of via a licensed hazardous waste carrier. Always check the cable type and condition before deciding on disposal.',
  },
  {
    question: 'Who is responsible if our waste is fly-tipped after we hand it to a carrier?',
    answer:
      'Under the duty of care provisions of the Environmental Protection Act 1990, you retain responsibility for your waste throughout its journey to final disposal. If you hand waste to an unregistered carrier who then fly-tips it, you can be prosecuted and fined. Always verify that your waste carrier is registered with the Environment Agency, obtain a waste transfer note, and use reputable, licensed disposal facilities.',
  },
  {
    question: 'Do I need to register as a hazardous waste producer?',
    answer:
      'If your premises produces more than 500 kg of hazardous waste per year, you must register with the Environment Agency as a hazardous waste producer. Many electrical maintenance companies exceed this threshold when you account for fluorescent tubes, batteries, waste oils, and contaminated materials. Registration is done online and must be renewed annually. Even if you produce less than 500 kg, you still need consignment notes.',
  },
  {
    question: 'What should I do if I accidentally break a fluorescent tube on site?',
    answer:
      'Ventilate the area immediately by opening windows and doors. Evacuate the immediate area for at least 15 minutes. Do not use a vacuum cleaner as this will spread mercury vapour. Use stiff card or sticky tape to collect the broken glass fragments, place them in a sealed bag, and dispose of them as hazardous waste. Wear gloves and avoid touching the white phosphor powder. Record the incident and inform your supervisor.',
  },
  {
    question: 'How does waste management relate to my ST1426 apprenticeship?',
    answer:
      'ST1426 requires maintenance technicians to demonstrate knowledge of environmental and sustainability practices, including waste management. You must understand the waste hierarchy, duty of care requirements, and how to handle hazardous materials commonly encountered in electrical maintenance. This knowledge is assessed through your end-point assessment and contributes to the environmental awareness behaviours expected of a competent technician.',
  },
];

const MOETModule1Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.5 · Subsection 1"
        title="Waste Management and Recycling"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Legal duties, waste classification and responsible disposal for electrical maintenance
            technicians.
          </p>

          <TLDR
            points={[
              'Duty of care: Legal responsibility for waste from creation to disposal.',
              'Waste hierarchy: Prevent, reduce, reuse, recycle, recover, dispose.',
              'Waste categories: Hazardous, non-hazardous and inert.',
              'Key legislation: EPA 1990, WEEE Regs 2013, Hazardous Waste Regs 2005.',
              'Common hazardous waste: Fluorescent tubes, batteries, transformer oil.',
              'WEEE: Luminaires, switchgear, distribution boards, controls.',
              'Segregation: Copper, plastics, hazardous items in separate streams.',
              'ST1426: Maps to environmental awareness and sustainability KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the duty of care for waste under the Environmental Protection Act 1990',
              'Apply the waste hierarchy to electrical maintenance waste decisions',
              'Classify waste types encountered in electrical maintenance as hazardous or non-hazardous',
              'Describe the requirements for waste transfer notes and hazardous waste consignment notes',
              'Explain the WEEE Regulations 2013 and their relevance to electrical maintenance',
              'Implement proper waste segregation and skip management on site',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Duty of Care and Legal Framework</ContentEyebrow>

          <ConceptBlock title="Duty of Care and Legal Framework">
            <p>
              Every person involved in the creation, storage, transport and disposal of waste has a
              legal duty of care. This is not optional guidance — it is a criminal law obligation
              established by Section 34 of the Environmental Protection Act 1990. As an electrical
              maintenance technician, you are a waste producer every time you strip out old wiring,
              replace a luminaire, change a battery, or remove a distribution board.
            </p>
            <p>
              Your duty of care means you must take all reasonable steps to ensure that waste is
              stored safely, described accurately, transferred only to authorised persons, and
              accompanied by the correct documentation. The duty follows the waste from the moment
              it is created on site until it reaches its final disposal point — and if anything goes
              wrong along the way, you can be held responsible.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key Legal Requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Environmental Protection Act 1990 (EPA):</strong> Establishes the duty of
                care for waste (Section 34) and the offence of unlawful deposit of waste (Section 33
                — fly-tipping)
              </li>
              <li>
                <strong>Waste (England and Wales) Regulations 2011:</strong> Transposes the EU Waste
                Framework Directive; establishes the waste hierarchy as a legal obligation
              </li>
              <li>
                <strong>Hazardous Waste (England and Wales) Regulations 2005:</strong> Controls the
                movement and disposal of hazardous waste; requires consignment notes and producer
                registration
              </li>
              <li>
                <strong>WEEE Regulations 2013:</strong> Requires producers and distributors to
                finance the collection and recycling of waste electrical and electronic equipment
              </li>
              <li>
                <strong>Waste Batteries and Accumulators Regulations 2009:</strong> Specific
                requirements for the collection, treatment and recycling of waste batteries
              </li>
              <li>
                <strong>Controlled Waste Regulations 2012:</strong> Defines which types of waste are
                controlled and subject to the duty of care
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Penalties for Non-Compliance">
            <p>
              Breaching the duty of care is a criminal offence. Penalties include unlimited fines
              for businesses, fines of up to £50,000 for individuals in the magistrates&apos; court,
              and imprisonment for up to 5 years for serious offences such as fly-tipping. The
              Environment Agency can also issue enforcement notices, suspension notices, and
              revocation of environmental permits. Fixed penalty notices of up to £400 can be issued
              for minor duty of care breaches.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Waste Carrier Licence">
            <p>
              Anyone who transports controlled waste must be registered as a waste carrier with the
              Environment Agency. There are two tiers of registration:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lower tier:</strong> Free registration for businesses that carry their own
                non-construction/demolition waste, or only carry waste that does not normally need a
                licence (e.g., animal by-products)
              </li>
              <li>
                <strong>Upper tier:</strong> Required for any business that carries other
                people&apos;s waste, or carries construction and demolition waste. Costs
                approximately £154 for 3 years
              </li>
            </ul>
            <p>
              Many electrical maintenance companies need upper tier registration because they carry
              construction/demolition waste (e.g., old distribution boards, cables, trunking) from
              client premises. Always check your company&apos;s registration status — carrying waste
              without registration is an offence.
            </p>
            <p>
              <strong>Key point:</strong> Ignorance is not a defence. You cannot claim you did not
              know the waste was hazardous or that your carrier was unlicensed. The duty of care
              requires you to take positive steps to check and verify.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>The Waste Hierarchy</ContentEyebrow>

          <ConceptBlock title="The Waste Hierarchy">
            <p>
              The waste hierarchy is the cornerstone of waste management law and practice.
              Established in the Waste (England and Wales) Regulations 2011, it ranks waste
              management options in order of environmental preference. You are legally required to
              apply the waste hierarchy when making decisions about waste — choosing the highest
              level that is technically and economically feasible.
            </p>
          </ConceptBlock>

          <ConceptBlock title="1. Prevention (Most Preferred)">
            <p>
              Avoid creating waste in the first place. In electrical maintenance, this means
              ordering the correct quantities of materials, using accurate measurements to minimise
              cable offcuts, specifying durable equipment that lasts longer, and maintaining
              equipment to extend its service life rather than replacing it prematurely. Prevention
              also includes designing installations that are easy to maintain and upgrade without
              generating waste.
            </p>
          </ConceptBlock>

          <ConceptBlock title="2. Reduction">
            <p>
              Reduce the amount and harmfulness of waste produced. Choose materials with less
              packaging, select products that use fewer hazardous substances (e.g., LED lamps
              instead of mercury-containing fluorescent tubes), and use modular components that can
              be partially replaced rather than discarding entire assemblies.
            </p>
          </ConceptBlock>

          <ConceptBlock title="3. Reuse">
            <p>
              Use items again for the same or a different purpose without reprocessing. Salvageable
              distribution boards, cable tray, trunking, conduit fittings and sometimes cables can
              be reused on other projects if they are in good condition and meet current standards.
              Always verify that reused electrical equipment is safe and compliant before
              installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="4. Recycling">
            <p>
              Reprocess waste materials into new products. Copper from cables, aluminium from
              busbars, steel from conduit and trunking, and even PVC from cable sheathing can be
              recycled. Proper segregation on site is essential to maximise recycling value — mixed
              waste is much harder and more expensive to recycle than source-separated materials.
            </p>
          </ConceptBlock>

          <ConceptBlock title="5. Recovery">
            <p>
              Extract value from waste through processes other than recycling, primarily energy
              recovery (incineration with energy capture). Some non-recyclable plastics and mixed
              waste can be sent to energy-from-waste plants rather than landfill. This is preferable
              to disposal but should only be used when recycling is not feasible.
            </p>
          </ConceptBlock>

          <ConceptBlock title="6. Disposal (Least Preferred)">
            <p>
              Landfill or incineration without energy recovery. This is the option of last resort
              and carries the highest environmental cost, including landfill tax. Every tonne of
              waste sent to landfill incurs a standard rate tax of £103.70 (2024 rate), making it
              the most expensive disposal route and providing a strong financial incentive to move
              waste up the hierarchy.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Applying the Hierarchy on Site">
            <p>
              Before disposing of any material, ask yourself: Can I prevent this waste? Can I reduce
              it? Can it be reused? Can it be recycled? Only when the answer to all of these is
              genuinely &quot;no&quot; should you consider recovery or disposal. Document your
              reasoning — demonstrating that you have applied the waste hierarchy is a legal
              requirement and may be checked during audits.
            </p>
            <p>
              <strong>Practical example:</strong> When replacing a lighting installation, instead of
              skipping all the old luminaires, check whether any can be reused (e.g., donated to
              community projects). Strip out the recyclable metals and plastics separately. The
              mercury-containing lamps must go to hazardous waste. Only truly unrecyclable mixed
              waste should go to general disposal.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Electrical Waste Types and Classification</ContentEyebrow>

          <ConceptBlock title="Electrical Waste Types and Classification">
            <p>
              Electrical maintenance generates a wide variety of waste types, each with different
              classification, handling and disposal requirements. Misclassifying waste is a criminal
              offence and can result in hazardous materials entering inappropriate waste streams,
              causing environmental contamination and exposing workers to health risks.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Waste Categories">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Electrical Examples
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Hazardous</td>
                    <td className="border border-white/10 px-3 py-2">
                      Waste that poses a risk to human health or the environment due to its chemical
                      or physical properties
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Fluorescent tubes (mercury), lead-acid batteries, PCB capacitors, transformer
                      oil, asbestos-containing cables, SF6 gas
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Non-hazardous</td>
                    <td className="border border-white/10 px-3 py-2">
                      Waste that does not have hazardous properties but still requires controlled
                      disposal
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Copper cable offcuts, PVC trunking, plastic switch plates, cardboard
                      packaging, general plastics
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Inert</td>
                    <td className="border border-white/10 px-3 py-2">
                      Waste that does not undergo significant physical, chemical or biological
                      change
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Concrete, brick, soil and stone from cable trench excavation, ceramic
                      insulators
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Hazardous Electrical Waste — Detailed Breakdown">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fluorescent tubes and discharge lamps:</strong> Contain mercury (typically
                3-5 mg per tube). Must be stored unbroken in sealed containers, labelled as
                hazardous waste, and collected by a specialist lamp recycler. European Waste
                Catalogue (EWC) code: 20 01 21*.
              </li>
              <li>
                <strong>Batteries (lead-acid):</strong> UPS batteries, emergency lighting batteries
                and standby power batteries contain lead and sulphuric acid. Store upright in
                acid-resistant bunds. EWC code: 16 06 01*.
              </li>
              <li>
                <strong>Batteries (NiCd):</strong> Some older emergency lighting units use
                nickel-cadmium batteries. Cadmium is extremely toxic. EWC code: 16 06 02*.
              </li>
              <li>
                <strong>PCB-containing equipment:</strong> Pre-1986 capacitors and some transformers
                may contain polychlorinated biphenyls. These are persistent organic pollutants
                requiring specialist high-temperature incineration. EWC code: 16 02 09*.
              </li>
              <li>
                <strong>Transformer oil:</strong> Mineral oil from power transformers is hazardous
                waste, especially if contaminated with PCBs. Must be stored in sealed, bunded
                containers and tested for PCB content before disposal. EWC code: 13 03 07*.
              </li>
              <li>
                <strong>SF6 gas:</strong> Used as an insulating medium in some HV switchgear. Must
                be recovered by certified technicians during maintenance or decommissioning — never
                vented to atmosphere. Classified under F-Gas Regulations.
              </li>
              <li>
                <strong>Asbestos-containing cables:</strong> Some pre-1990 cables used asbestos yarn
                as insulation or packing. If suspected, treat as asbestos waste — do not disturb
                without an asbestos survey. EWC code: 17 06 05*.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="WEEE Regulations 2013">
            <p>
              The Waste Electrical and Electronic Equipment (WEEE) Regulations 2013 require that
              waste electrical equipment is collected separately from general waste and sent to
              approved authorised treatment facilities (AATFs). As a maintenance technician
              replacing electrical equipment, you must ensure that:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Old equipment is identified and recorded as WEEE</li>
              <li>WEEE is stored separately from general waste in secure, covered areas</li>
              <li>
                Hazardous components (mercury lamps, batteries, capacitors) are removed before
                treatment where possible
              </li>
              <li>WEEE is transferred to an AATF or a distributor operating a take-back scheme</li>
              <li>
                Waste transfer notes identify the WEEE categories of the items being transferred
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> If you are unsure whether a waste item is hazardous, treat
              it as hazardous until you have confirmed otherwise. Misclassifying hazardous waste as
              non-hazardous is an offence with potentially serious environmental and health
              consequences.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>
            Documentation — Waste Transfer Notes and Consignment Notes
          </ContentEyebrow>

          <ConceptBlock title="Documentation — Waste Transfer Notes and Consignment Notes">
            <p>
              Proper documentation is the backbone of the waste duty of care system. Every transfer
              of waste must be documented, creating an auditable chain of custody from producer to
              final disposal. There are two main document types, and using the wrong one is an
              offence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Waste Transfer Note (WTN)">
            <p>Required for all non-hazardous controlled waste transfers.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Description of the waste (type, quantity, EWC code)</li>
              <li>How it is contained (skip, bags, drums, loose)</li>
              <li>Name and address of the transferor (you/your company)</li>
              <li>Name, address and carrier registration number of the transferee</li>
              <li>Place and date of transfer</li>
              <li>Both parties must sign the note</li>
              <li>
                <strong>Retention:</strong> Minimum 2 years
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Hazardous Waste Consignment Note">
            <p>Required for all hazardous waste movements.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Unique consignment note code (from the Environment Agency)</li>
              <li>Detailed description including hazard codes and EWC code</li>
              <li>Physical and chemical analysis where required</li>
              <li>Producer details and premises code</li>
              <li>Carrier details and registration number</li>
              <li>Consignee (destination facility) details and permit number</li>
              <li>
                <strong>Retention:</strong> Minimum 3 years
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Season Tickets">
            <p>
              If your company regularly transfers the same type of non-hazardous waste to the same
              carrier, you can use a &apos;season ticket&apos; — a single waste transfer note that
              covers multiple transfers over a period of up to 12 months. This reduces paperwork for
              routine waste streams (e.g., regular collection of copper cable offcuts by a scrap
              merchant) while maintaining legal compliance. Each individual collection must still be
              recorded with the date and quantity.
            </p>
          </ConceptBlock>

          <ConceptBlock title="European Waste Catalogue (EWC) Codes">
            <p>
              Every waste type has a six-digit EWC code that must be used on waste transfer and
              consignment notes. Codes marked with an asterisk (*) are hazardous waste. Common codes
              for electrical maintenance waste include:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">EWC Code</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">17 04 01</td>
                    <td className="border border-white/10 px-3 py-2">
                      Copper, bronze, brass (cable offcuts)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">17 04 11</td>
                    <td className="border border-white/10 px-3 py-2">Cables (non-hazardous)</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">20 01 21*</td>
                    <td className="border border-white/10 px-3 py-2">
                      Fluorescent tubes and mercury-containing waste
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">16 06 01*</td>
                    <td className="border border-white/10 px-3 py-2">Lead-acid batteries</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">16 02 09*</td>
                    <td className="border border-white/10 px-3 py-2">Equipment containing PCBs</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">13 03 07*</td>
                    <td className="border border-white/10 px-3 py-2">
                      Mineral-based insulating and heat transmission oils
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">20 01 35*</td>
                    <td className="border border-white/10 px-3 py-2">
                      Discarded electrical and electronic equipment containing hazardous components
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> Never sign a blank or incomplete waste transfer note.
              Every field must be completed accurately before you sign. An inaccurate WTN is as bad
              as no WTN — both are offences.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Site Segregation, Skip Management and Landfill Tax</ContentEyebrow>

          <ConceptBlock title="Site Segregation, Skip Management and Landfill Tax">
            <p>
              Effective waste segregation at the point of generation is the single most important
              practical step you can take to improve waste management. Mixed waste is expensive to
              process, difficult to recycle, and may be contaminated by hazardous items buried
              within it. Proper segregation saves money, reduces environmental impact, and
              demonstrates professional competence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Segregation Best Practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Metals:</strong> Separate copper from steel from aluminium — each has
                different recycling value and process
              </li>
              <li>
                <strong>Plastics:</strong> Separate PVC (cable sheathing, trunking) from other
                plastics where possible
              </li>
              <li>
                <strong>Hazardous:</strong> All hazardous items in dedicated, labelled containers —
                never mixed with general waste
              </li>
              <li>
                <strong>WEEE:</strong> Whole electrical items kept separate from stripped materials
              </li>
              <li>
                <strong>Packaging:</strong> Cardboard, polystyrene, plastic wrap in separate clean
                recycling stream
              </li>
              <li>
                <strong>General/residual:</strong> Only genuinely non-recyclable, non-hazardous
                mixed waste
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Skip Management">
            <p>
              On larger maintenance projects or refit works, skips are the primary waste containers.
              Proper skip management is essential for legal compliance and cost control:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Use colour-coded or clearly labelled skips for different waste streams</li>
              <li>
                Never mix hazardous and non-hazardous waste in the same skip — this contaminates the
                entire load
              </li>
              <li>
                Keep skips covered when not in use to prevent rainwater ingress (which adds weight
                and cost) and wind-blown litter
              </li>
              <li>
                Do not overfill — waste above the skip rim is a safety hazard during transport and
                may breach licence conditions
              </li>
              <li>
                Skips on the public highway need a licence from the local authority, with lights and
                reflectors for visibility
              </li>
              <li>
                Obtain a waste transfer note for every skip collection, specifying the waste type
                and EWC codes
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Landfill Tax">
            <p>
              Landfill tax is a powerful economic instrument designed to reduce the amount of waste
              sent to landfill. Understanding the rates helps you appreciate the financial impact of
              poor waste management:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard rate (2024):</strong> £103.70 per tonne — applies to most waste
                that is not inert
              </li>
              <li>
                <strong>Lower rate (2024):</strong> £3.25 per tonne — applies to qualifying inert
                waste (e.g., clean concrete, soil, stone)
              </li>
              <li>
                <strong>Rate escalation:</strong> The standard rate increases annually, making
                landfill disposal increasingly expensive
              </li>
              <li>
                <strong>Impact:</strong> A single full skip of mixed construction waste can incur
                over £200 in landfill tax alone — before disposal charges
              </li>
            </ul>
            <p>
              By segregating waste and diverting recyclable materials away from landfill, you
              directly reduce your company&apos;s waste disposal costs and the environmental burden.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Hazardous Waste Storage">
            <p>
              Hazardous waste must be stored in suitable, sealed containers in a secure, covered
              area. Containers must be clearly labelled with the waste type and hazard symbols.
              Liquids (oils, acids) must be stored in bunded areas capable of containing at least
              110% of the largest container. Storage time is limited — you must not accumulate more
              than 12 months&apos; worth of hazardous waste without an environmental permit.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Fluorescent Tube Storage">
            <p>
              Store tubes vertically in purpose-built &apos;coffin&apos; containers to prevent
              breakage. Never place loose tubes in a skip or bin bag — broken tubes release mercury
              vapour. Limit storage quantities and arrange regular collection by a specialist lamp
              recycler. Record quantities stored and disposed of for your hazardous waste records.
              Some manufacturers and distributors operate take-back schemes for waste lamps.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Site Waste Management Plans">
            <p>
              Although no longer a legal requirement in England (the Site Waste Management Plans
              Regulations 2008 were repealed in 2013), SWMPs remain industry best practice and are
              often required by clients and principal contractors. A good SWMP forecasts the types
              and quantities of waste, sets targets for recycling and diversion from landfill,
              identifies waste management responsibilities, and tracks actual performance against
              targets. For maintenance projects, a proportionate SWMP demonstrates professionalism
              and helps you plan waste logistics efficiently.
            </p>
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to work
              in an environmentally responsible manner. Demonstrating effective waste segregation,
              proper documentation, and knowledge of the waste hierarchy is evidence of the
              professional behaviours expected of a competent maintenance technician.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              '1. Prevention — avoid creating waste.',
              '2. Reduction — minimise amount and harmfulness.',
              '3. Reuse — use again without reprocessing.',
              '4. Recycling — reprocess into new materials.',
              '5. Recovery — extract energy value.',
              '6. Disposal — landfill (last resort).',
              'EPA 1990 — Duty of care (Section 34).',
              'Waste (England & Wales) Regs 2011 — Waste hierarchy.',
              'Hazardous Waste Regs 2005 — Consignment notes.',
              'WEEE Regs 2013 — Electrical equipment recycling.',
              'Landfill tax — £103.70/tonne standard rate.',
              'ST1426 — Environmental awareness KSBs.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Waste management knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Other Industry-Specific Guidance
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Hazardous Substances — COSHH Awareness
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section5_1;
