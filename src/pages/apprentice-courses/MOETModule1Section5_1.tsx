import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Waste Management and Recycling - MOET Module 1 Section 5.1";
const DESCRIPTION = "Comprehensive guide to waste management and recycling for electrical maintenance technicians: duty of care, waste hierarchy, WEEE Regulations 2013, hazardous waste, waste transfer notes, and site segregation practices aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "waste-hierarchy",
    question: "What is the correct order of the waste hierarchy from most to least preferred?",
    options: [
      "Recycle, reuse, dispose, recover, reduce",
      "Prevention, reduce, reuse, recycle, recover, dispose",
      "Dispose, recover, recycle, reuse, reduce, prevent",
      "Reduce, prevent, dispose, recycle, reuse, recover"
    ],
    correctIndex: 1,
    explanation: "The waste hierarchy, enshrined in the Waste (England and Wales) Regulations 2011, ranks waste management options from most to least preferred: prevention, reduction, reuse, recycling, other recovery (e.g., energy recovery), and disposal. Every decision you make on site should follow this order."
  },
  {
    id: "waste-transfer-note",
    question: "How long must a waste transfer note be retained?",
    options: [
      "6 months",
      "1 year",
      "2 years",
      "3 years"
    ],
    correctIndex: 2,
    explanation: "Under the Environmental Protection Act 1990 (Duty of Care Regulations), waste transfer notes must be retained for a minimum of 2 years. Hazardous waste consignment notes must be retained for a minimum of 3 years. These records provide an audit trail demonstrating lawful waste disposal."
  },
  {
    id: "weee-regs",
    question: "What do the WEEE Regulations 2013 specifically require producers and distributors to do?",
    options: [
      "Dispose of all electrical waste in general skips",
      "Finance the collection, treatment, recovery and environmentally sound disposal of WEEE",
      "Export all electrical waste to developing countries",
      "Only recycle items that are less than 5 years old"
    ],
    correctIndex: 1,
    explanation: "The Waste Electrical and Electronic Equipment (WEEE) Regulations 2013 place the responsibility on producers and distributors to finance and arrange the collection, treatment, recovery and environmentally sound disposal of waste electrical and electronic equipment. As maintenance technicians, you must ensure WEEE is separated and sent to approved treatment facilities."
  },
  {
    id: "hazardous-waste",
    question: "Which of the following electrical waste items is classified as hazardous waste?",
    options: [
      "Copper cable offcuts",
      "Plastic cable trunking",
      "Fluorescent tubes containing mercury",
      "Steel conduit"
    ],
    correctIndex: 2,
    explanation: "Fluorescent tubes contain mercury, a toxic heavy metal, and are classified as hazardous waste under the Hazardous Waste (England and Wales) Regulations 2005. They must be stored separately in designated containers, handled carefully to avoid breakage, and disposed of through a licensed hazardous waste carrier with a consignment note."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under the Environmental Protection Act 1990, the 'duty of care' for waste applies to:",
    options: [
      "Only the person who originally creates the waste",
      "Anyone who produces, imports, carries, keeps, treats or disposes of controlled waste",
      "Only licensed waste carriers",
      "Only local authority waste departments"
    ],
    correctAnswer: 1,
    explanation: "Section 34 of the Environmental Protection Act 1990 places a duty of care on anyone who produces, imports, carries, keeps, treats or disposes of controlled waste. This means that as a maintenance technician, you are legally responsible for any waste you generate from the moment it is created until it is properly disposed of."
  },
  {
    id: 2,
    question: "Which level of the waste hierarchy should a maintenance technician consider first when dealing with old cable?",
    options: [
      "Dispose of it in a general skip",
      "Send it for energy recovery (incineration)",
      "Consider whether the cable can be reused on another project",
      "Recycle the copper content"
    ],
    correctAnswer: 2,
    explanation: "Following the waste hierarchy, reuse is preferred over recycling and disposal. If the old cable is in good condition and meets current standards, reusing it on another suitable project is the most environmentally preferred option. If reuse is not possible, recycling the copper and PVC content is the next best option."
  },
  {
    id: 3,
    question: "What document must accompany hazardous waste when it leaves a site?",
    options: [
      "A standard waste transfer note",
      "A hazardous waste consignment note",
      "A delivery note from the supplier",
      "A risk assessment"
    ],
    correctAnswer: 1,
    explanation: "Hazardous waste must be accompanied by a hazardous waste consignment note when it leaves a premises. This is a legal requirement under the Hazardous Waste (England and Wales) Regulations 2005. The consignment note contains detailed information about the waste type, quantity, hazard codes, and the transfer chain from producer to disposal facility."
  },
  {
    id: 4,
    question: "PCB-containing equipment (such as old capacitors and transformers) requires special disposal because:",
    options: [
      "PCBs are valuable and can be resold",
      "PCBs are persistent organic pollutants that are toxic and bioaccumulative",
      "PCBs are flammable and may cause fires in landfill",
      "PCBs dissolve in water and contaminate drainage"
    ],
    correctAnswer: 1,
    explanation: "Polychlorinated biphenyls (PCBs) are persistent organic pollutants — they do not break down in the environment, they accumulate in the food chain, and they are toxic to humans and wildlife. The POPs Regulations ban the use of PCBs and require that PCB-containing equipment is identified, registered and disposed of through specialist high-temperature incineration."
  },
  {
    id: 5,
    question: "What is the minimum requirement for a person or company to legally transport waste?",
    options: [
      "A full HGV driving licence",
      "Registration as a waste carrier with the Environment Agency",
      "Membership of a trade association",
      "A site waste management plan"
    ],
    correctAnswer: 1,
    explanation: "Under the Controlled Waste (Registration of Carriers and Seizure of Vehicles) Regulations 1991 (as amended), anyone who transports controlled waste must be registered as a waste carrier with the Environment Agency (or equivalent authority in Scotland, Wales, or Northern Ireland). Carrying waste without registration is a criminal offence."
  },
  {
    id: 6,
    question: "Which of the following is the correct method for disposing of waste batteries from UPS systems?",
    options: [
      "Place them in a general waste skip",
      "Pour out the acid and recycle the lead casing separately",
      "Store them in a designated battery collection point and arrange collection by a specialist waste carrier",
      "Return them to any electrical wholesaler"
    ],
    correctAnswer: 2,
    explanation: "Waste batteries, particularly lead-acid batteries from UPS systems, are classified as hazardous waste due to their acid content and heavy metal components. They must be stored securely in a designated collection point (acid-resistant bund), kept upright to prevent leakage, and collected by a specialist licensed waste carrier. The Waste Batteries and Accumulators Regulations 2009 set out these requirements."
  },
  {
    id: 7,
    question: "Landfill tax is designed to:",
    options: [
      "Fund local council waste collection services",
      "Discourage the disposal of waste to landfill and encourage recycling and recovery",
      "Pay for the construction of new landfill sites",
      "Subsidise waste carrier licence fees"
    ],
    correctAnswer: 1,
    explanation: "Landfill tax was introduced in 1996 to make landfill disposal more expensive, thereby encouraging businesses and individuals to reduce, reuse and recycle waste. The standard rate for 2024 is £103.70 per tonne, making it a significant cost driver that incentivises proper waste management planning."
  },
  {
    id: 8,
    question: "When segregating waste on an electrical maintenance site, which of the following should be kept in a separate, sealed container?",
    options: [
      "Cable offcuts and conduit",
      "Cardboard packaging",
      "Fluorescent tubes and other mercury-containing lamps",
      "Metal trunking and cable tray"
    ],
    correctAnswer: 2,
    explanation: "Fluorescent tubes contain mercury and are classified as hazardous waste. They must be stored separately in sealed, clearly labelled containers to prevent breakage and mercury release. Broken lamps release mercury vapour which is harmful to health and the environment. Specialist lamp recycling containers (often called 'coffins') should be used."
  },
  {
    id: 9,
    question: "A site waste management plan (SWMP) is used to:",
    options: [
      "Replace the need for waste transfer notes",
      "Forecast, manage and record all waste produced on a construction or maintenance project",
      "Determine landfill tax liabilities only",
      "Register the site with the Environment Agency"
    ],
    correctAnswer: 1,
    explanation: "A site waste management plan (SWMP) is a planning tool that forecasts the types and quantities of waste a project will produce, identifies how each waste stream will be managed (reuse, recycle, recover, dispose), and records what actually happens. Although the legal requirement for SWMPs was removed in England in 2013, they remain best practice and are required by many clients and main contractors."
  },
  {
    id: 10,
    question: "Under the WEEE Regulations 2013, which category covers most electrical maintenance waste such as luminaires, switchgear, and distribution boards?",
    options: [
      "Category 1 — Large household appliances",
      "Category 4 — Consumer equipment",
      "Category 5 — Lighting equipment",
      "Multiple categories depending on the specific item"
    ],
    correctAnswer: 3,
    explanation: "Electrical maintenance waste falls across multiple WEEE categories: luminaires are Category 5 (lighting equipment), large switchgear may be Category 1 (large equipment), and monitoring/control instruments are Category 9. It is important to identify the correct WEEE category for each item to ensure it reaches the appropriate approved treatment facility."
  },
  {
    id: 11,
    question: "What is the main environmental concern with SF6 gas used in some high-voltage switchgear?",
    options: [
      "It is toxic to humans at low concentrations",
      "It is the most potent greenhouse gas known, with a global warming potential 23,500 times that of CO2",
      "It is flammable and poses a fire risk",
      "It causes acid rain when released"
    ],
    correctAnswer: 1,
    explanation: "Sulphur hexafluoride (SF6) is the most potent greenhouse gas known to science, with a global warming potential 23,500 times greater than CO2 and an atmospheric lifetime of over 3,200 years. The F-Gas Regulations require that SF6 is recovered during maintenance and decommissioning of switchgear, and that certified technicians carry out the work."
  },
  {
    id: 12,
    question: "Which regulation requires that waste oil from transformers is disposed of correctly?",
    options: [
      "The Water Resources Act 1991 only",
      "The Waste (England and Wales) Regulations 2011 and the Hazardous Waste Regulations 2005",
      "The Electricity at Work Regulations 1989",
      "BS 7671 Wiring Regulations"
    ],
    correctAnswer: 1,
    explanation: "Waste transformer oil is classified as hazardous waste under the Hazardous Waste Regulations 2005 and must be managed in accordance with the Waste (England and Wales) Regulations 2011. It must be stored in sealed, bunded containers, collected by a licensed hazardous waste carrier, and accompanied by a consignment note. The Oil Storage Regulations also apply to the storage of oils on site."
  }
];

const faqs = [
  {
    question: "Can I put old cables in a general skip on site?",
    answer: "It depends on the cable type. Clean copper or aluminium cable offcuts are non-hazardous and can be placed in a designated metals recycling skip. However, cables containing lead sheathing, asbestos-containing cables (found in pre-1990 installations), or cables contaminated with oil or chemicals are hazardous waste and must be segregated and disposed of via a licensed hazardous waste carrier. Always check the cable type and condition before deciding on disposal."
  },
  {
    question: "Who is responsible if our waste is fly-tipped after we hand it to a carrier?",
    answer: "Under the duty of care provisions of the Environmental Protection Act 1990, you retain responsibility for your waste throughout its journey to final disposal. If you hand waste to an unregistered carrier who then fly-tips it, you can be prosecuted and fined. Always verify that your waste carrier is registered with the Environment Agency, obtain a waste transfer note, and use reputable, licensed disposal facilities."
  },
  {
    question: "Do I need to register as a hazardous waste producer?",
    answer: "If your premises produces more than 500 kg of hazardous waste per year, you must register with the Environment Agency as a hazardous waste producer. Many electrical maintenance companies exceed this threshold when you account for fluorescent tubes, batteries, waste oils, and contaminated materials. Registration is done online and must be renewed annually. Even if you produce less than 500 kg, you still need consignment notes."
  },
  {
    question: "What should I do if I accidentally break a fluorescent tube on site?",
    answer: "Ventilate the area immediately by opening windows and doors. Evacuate the immediate area for at least 15 minutes. Do not use a vacuum cleaner as this will spread mercury vapour. Use stiff card or sticky tape to collect the broken glass fragments, place them in a sealed bag, and dispose of them as hazardous waste. Wear gloves and avoid touching the white phosphor powder. Record the incident and inform your supervisor."
  },
  {
    question: "How does waste management relate to my ST1426 apprenticeship?",
    answer: "ST1426 requires maintenance technicians to demonstrate knowledge of environmental and sustainability practices, including waste management. You must understand the waste hierarchy, duty of care requirements, and how to handle hazardous materials commonly encountered in electrical maintenance. This knowledge is assessed through your end-point assessment and contributes to the environmental awareness behaviours expected of a competent technician."
  }
];

const MOETModule1Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Waste Management and Recycling
          </h1>
          <p className="text-white/80">
            Legal duties, waste classification and responsible disposal for electrical maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Duty of care:</strong> Legal responsibility for waste from creation to disposal</li>
              <li className="pl-1"><strong>Waste hierarchy:</strong> Prevent, reduce, reuse, recycle, recover, dispose</li>
              <li className="pl-1"><strong>Waste categories:</strong> Hazardous, non-hazardous and inert</li>
              <li className="pl-1"><strong>Key legislation:</strong> EPA 1990, WEEE Regs 2013, Hazardous Waste Regs 2005</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Common hazardous waste:</strong> Fluorescent tubes, batteries, transformer oil</li>
              <li className="pl-1"><strong>WEEE:</strong> Luminaires, switchgear, distribution boards, controls</li>
              <li className="pl-1"><strong>Segregation:</strong> Copper, plastics, hazardous items in separate streams</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to environmental awareness and sustainability KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the duty of care for waste under the Environmental Protection Act 1990",
              "Apply the waste hierarchy to electrical maintenance waste decisions",
              "Classify waste types encountered in electrical maintenance as hazardous or non-hazardous",
              "Describe the requirements for waste transfer notes and hazardous waste consignment notes",
              "Explain the WEEE Regulations 2013 and their relevance to electrical maintenance",
              "Implement proper waste segregation and skip management on site"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Duty of Care and Legal Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Duty of Care and Legal Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every person involved in the creation, storage, transport and disposal of waste has a legal
              duty of care. This is not optional guidance — it is a criminal law obligation established
              by Section 34 of the Environmental Protection Act 1990. As an electrical maintenance
              technician, you are a waste producer every time you strip out old wiring, replace a
              luminaire, change a battery, or remove a distribution board.
            </p>
            <p>
              Your duty of care means you must take all reasonable steps to ensure that waste is stored
              safely, described accurately, transferred only to authorised persons, and accompanied by
              the correct documentation. The duty follows the waste from the moment it is created on
              site until it reaches its final disposal point — and if anything goes wrong along the way,
              you can be held responsible.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Legal Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Environmental Protection Act 1990 (EPA):</strong> Establishes the duty of care for waste (Section 34) and the offence of unlawful deposit of waste (Section 33 — fly-tipping)</li>
                <li className="pl-1"><strong>Waste (England and Wales) Regulations 2011:</strong> Transposes the EU Waste Framework Directive; establishes the waste hierarchy as a legal obligation</li>
                <li className="pl-1"><strong>Hazardous Waste (England and Wales) Regulations 2005:</strong> Controls the movement and disposal of hazardous waste; requires consignment notes and producer registration</li>
                <li className="pl-1"><strong>WEEE Regulations 2013:</strong> Requires producers and distributors to finance the collection and recycling of waste electrical and electronic equipment</li>
                <li className="pl-1"><strong>Waste Batteries and Accumulators Regulations 2009:</strong> Specific requirements for the collection, treatment and recycling of waste batteries</li>
                <li className="pl-1"><strong>Controlled Waste Regulations 2012:</strong> Defines which types of waste are controlled and subject to the duty of care</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Penalties for Non-Compliance</p>
              <p className="text-sm text-white">
                Breaching the duty of care is a criminal offence. Penalties include unlimited fines for
                businesses, fines of up to £50,000 for individuals in the magistrates' court, and
                imprisonment for up to 5 years for serious offences such as fly-tipping. The Environment
                Agency can also issue enforcement notices, suspension notices, and revocation of
                environmental permits. Fixed penalty notices of up to £400 can be issued for minor
                duty of care breaches.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Waste Carrier Licence</p>
              <p className="text-sm text-white mb-2">
                Anyone who transports controlled waste must be registered as a waste carrier with the
                Environment Agency. There are two tiers of registration:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lower tier:</strong> Free registration for businesses that carry their own non-construction/demolition waste, or only carry waste that does not normally need a licence (e.g., animal by-products)</li>
                <li className="pl-1"><strong>Upper tier:</strong> Required for any business that carries other people's waste, or carries construction and demolition waste. Costs approximately £154 for 3 years</li>
              </ul>
              <p className="text-sm text-white mt-2">
                Many electrical maintenance companies need upper tier registration because they carry
                construction/demolition waste (e.g., old distribution boards, cables, trunking) from client
                premises. Always check your company's registration status — carrying waste without registration
                is an offence.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Ignorance is not a defence. You cannot claim you did not know the waste
              was hazardous or that your carrier was unlicensed. The duty of care requires you to take positive
              steps to check and verify.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 02: The Waste Hierarchy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Waste Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The waste hierarchy is the cornerstone of waste management law and practice. Established
              in the Waste (England and Wales) Regulations 2011, it ranks waste management options in
              order of environmental preference. You are legally required to apply the waste hierarchy
              when making decisions about waste — choosing the highest level that is technically and
              economically feasible.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <h3 className="text-sm font-medium text-green-400 mb-1">1. Prevention (Most Preferred)</h3>
                <p className="text-sm text-white">
                  Avoid creating waste in the first place. In electrical maintenance, this means ordering
                  the correct quantities of materials, using accurate measurements to minimise cable offcuts,
                  specifying durable equipment that lasts longer, and maintaining equipment to extend its
                  service life rather than replacing it prematurely. Prevention also includes designing
                  installations that are easy to maintain and upgrade without generating waste.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <h3 className="text-sm font-medium text-green-300 mb-1">2. Reduction</h3>
                <p className="text-sm text-white">
                  Reduce the amount and harmfulness of waste produced. Choose materials with less packaging,
                  select products that use fewer hazardous substances (e.g., LED lamps instead of mercury-containing
                  fluorescent tubes), and use modular components that can be partially replaced rather than
                  discarding entire assemblies.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                <h3 className="text-sm font-medium text-elec-yellow mb-1">3. Reuse</h3>
                <p className="text-sm text-white">
                  Use items again for the same or a different purpose without reprocessing. Salvageable
                  distribution boards, cable tray, trunking, conduit fittings and sometimes cables can be
                  reused on other projects if they are in good condition and meet current standards. Always
                  verify that reused electrical equipment is safe and compliant before installation.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <h3 className="text-sm font-medium text-blue-400 mb-1">4. Recycling</h3>
                <p className="text-sm text-white">
                  Reprocess waste materials into new products. Copper from cables, aluminium from busbars,
                  steel from conduit and trunking, and even PVC from cable sheathing can be recycled. Proper
                  segregation on site is essential to maximise recycling value — mixed waste is much harder and
                  more expensive to recycle than source-separated materials.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <h3 className="text-sm font-medium text-orange-400 mb-1">5. Recovery</h3>
                <p className="text-sm text-white">
                  Extract value from waste through processes other than recycling, primarily energy recovery
                  (incineration with energy capture). Some non-recyclable plastics and mixed waste can be sent
                  to energy-from-waste plants rather than landfill. This is preferable to disposal but should
                  only be used when recycling is not feasible.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <h3 className="text-sm font-medium text-red-400 mb-1">6. Disposal (Least Preferred)</h3>
                <p className="text-sm text-white">
                  Landfill or incineration without energy recovery. This is the option of last resort and
                  carries the highest environmental cost, including landfill tax. Every tonne of waste sent
                  to landfill incurs a standard rate tax of £103.70 (2024 rate), making it the most expensive
                  disposal route and providing a strong financial incentive to move waste up the hierarchy.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applying the Hierarchy on Site</p>
              <p className="text-sm text-white">
                Before disposing of any material, ask yourself: Can I prevent this waste? Can I reduce it?
                Can it be reused? Can it be recycled? Only when the answer to all of these is genuinely "no"
                should you consider recovery or disposal. Document your reasoning — demonstrating that you
                have applied the waste hierarchy is a legal requirement and may be checked during audits.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical example:</strong> When replacing a lighting installation, instead of skipping all
              the old luminaires, check whether any can be reused (e.g., donated to community projects). Strip
              out the recyclable metals and plastics separately. The mercury-containing lamps must go to hazardous
              waste. Only truly unrecyclable mixed waste should go to general disposal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Electrical Waste Types and Classification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical Waste Types and Classification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance generates a wide variety of waste types, each with different
              classification, handling and disposal requirements. Misclassifying waste is a criminal
              offence and can result in hazardous materials entering inappropriate waste streams,
              causing environmental contamination and exposing workers to health risks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Waste Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hazardous</td>
                      <td className="border border-white/10 px-3 py-2">Waste that poses a risk to human health or the environment due to its chemical or physical properties</td>
                      <td className="border border-white/10 px-3 py-2">Fluorescent tubes (mercury), lead-acid batteries, PCB capacitors, transformer oil, asbestos-containing cables, SF6 gas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Non-hazardous</td>
                      <td className="border border-white/10 px-3 py-2">Waste that does not have hazardous properties but still requires controlled disposal</td>
                      <td className="border border-white/10 px-3 py-2">Copper cable offcuts, PVC trunking, plastic switch plates, cardboard packaging, general plastics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Inert</td>
                      <td className="border border-white/10 px-3 py-2">Waste that does not undergo significant physical, chemical or biological change</td>
                      <td className="border border-white/10 px-3 py-2">Concrete, brick, soil and stone from cable trench excavation, ceramic insulators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hazardous Electrical Waste — Detailed Breakdown</p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Fluorescent tubes and discharge lamps:</strong> Contain mercury (typically 3-5 mg per tube).
                  Must be stored unbroken in sealed containers, labelled as hazardous waste, and collected by a
                  specialist lamp recycler. European Waste Catalogue (EWC) code: 20 01 21*.
                </li>
                <li className="pl-1">
                  <strong>Batteries (lead-acid):</strong> UPS batteries, emergency lighting batteries and standby
                  power batteries contain lead and sulphuric acid. Store upright in acid-resistant bunds. EWC code: 16 06 01*.
                </li>
                <li className="pl-1">
                  <strong>Batteries (NiCd):</strong> Some older emergency lighting units use nickel-cadmium batteries.
                  Cadmium is extremely toxic. EWC code: 16 06 02*.
                </li>
                <li className="pl-1">
                  <strong>PCB-containing equipment:</strong> Pre-1986 capacitors and some transformers may contain
                  polychlorinated biphenyls. These are persistent organic pollutants requiring specialist
                  high-temperature incineration. EWC code: 16 02 09*.
                </li>
                <li className="pl-1">
                  <strong>Transformer oil:</strong> Mineral oil from power transformers is hazardous waste, especially
                  if contaminated with PCBs. Must be stored in sealed, bunded containers and tested for PCB content
                  before disposal. EWC code: 13 03 07*.
                </li>
                <li className="pl-1">
                  <strong>SF6 gas:</strong> Used as an insulating medium in some HV switchgear. Must be recovered
                  by certified technicians during maintenance or decommissioning — never vented to atmosphere.
                  Classified under F-Gas Regulations.
                </li>
                <li className="pl-1">
                  <strong>Asbestos-containing cables:</strong> Some pre-1990 cables used asbestos yarn as insulation
                  or packing. If suspected, treat as asbestos waste — do not disturb without an asbestos survey.
                  EWC code: 17 06 05*.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">WEEE Regulations 2013</p>
              <p className="text-sm text-white mb-2">
                The Waste Electrical and Electronic Equipment (WEEE) Regulations 2013 require that waste
                electrical equipment is collected separately from general waste and sent to approved
                authorised treatment facilities (AATFs). As a maintenance technician replacing electrical
                equipment, you must ensure that:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Old equipment is identified and recorded as WEEE</li>
                <li className="pl-1">WEEE is stored separately from general waste in secure, covered areas</li>
                <li className="pl-1">Hazardous components (mercury lamps, batteries, capacitors) are removed before treatment where possible</li>
                <li className="pl-1">WEEE is transferred to an AATF or a distributor operating a take-back scheme</li>
                <li className="pl-1">Waste transfer notes identify the WEEE categories of the items being transferred</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you are unsure whether a waste item is hazardous, treat it as hazardous
              until you have confirmed otherwise. Misclassifying hazardous waste as non-hazardous is an offence
              with potentially serious environmental and health consequences.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Documentation — Waste Transfer Notes and Consignment Notes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation — Waste Transfer Notes and Consignment Notes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation is the backbone of the waste duty of care system. Every transfer of
              waste must be documented, creating an auditable chain of custody from producer to final
              disposal. There are two main document types, and using the wrong one is an offence.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Waste Transfer Note (WTN)</h3>
                <p className="text-sm text-white mb-2">Required for all non-hazardous controlled waste transfers.</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Description of the waste (type, quantity, EWC code)</li>
                  <li className="pl-1">How it is contained (skip, bags, drums, loose)</li>
                  <li className="pl-1">Name and address of the transferor (you/your company)</li>
                  <li className="pl-1">Name, address and carrier registration number of the transferee</li>
                  <li className="pl-1">Place and date of transfer</li>
                  <li className="pl-1">Both parties must sign the note</li>
                  <li className="pl-1"><strong>Retention:</strong> Minimum 2 years</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hazardous Waste Consignment Note</h3>
                <p className="text-sm text-white mb-2">Required for all hazardous waste movements.</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Unique consignment note code (from the Environment Agency)</li>
                  <li className="pl-1">Detailed description including hazard codes and EWC code</li>
                  <li className="pl-1">Physical and chemical analysis where required</li>
                  <li className="pl-1">Producer details and premises code</li>
                  <li className="pl-1">Carrier details and registration number</li>
                  <li className="pl-1">Consignee (destination facility) details and permit number</li>
                  <li className="pl-1"><strong>Retention:</strong> Minimum 3 years</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Season Tickets</p>
              <p className="text-sm text-white">
                If your company regularly transfers the same type of non-hazardous waste to the same carrier,
                you can use a 'season ticket' — a single waste transfer note that covers multiple transfers
                over a period of up to 12 months. This reduces paperwork for routine waste streams (e.g.,
                regular collection of copper cable offcuts by a scrap merchant) while maintaining legal
                compliance. Each individual collection must still be recorded with the date and quantity.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">European Waste Catalogue (EWC) Codes</h3>
              <p className="text-sm text-white mb-3">
                Every waste type has a six-digit EWC code that must be used on waste transfer and
                consignment notes. Codes marked with an asterisk (*) are hazardous waste. Common
                codes for electrical maintenance waste include:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">EWC Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17 04 01</td>
                      <td className="border border-white/10 px-3 py-2">Copper, bronze, brass (cable offcuts)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17 04 11</td>
                      <td className="border border-white/10 px-3 py-2">Cables (non-hazardous)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20 01 21*</td>
                      <td className="border border-white/10 px-3 py-2">Fluorescent tubes and mercury-containing waste</td>
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
                      <td className="border border-white/10 px-3 py-2">Mineral-based insulating and heat transmission oils</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20 01 35*</td>
                      <td className="border border-white/10 px-3 py-2">Discarded electrical and electronic equipment containing hazardous components</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never sign a blank or incomplete waste transfer note. Every field must
              be completed accurately before you sign. An inaccurate WTN is as bad as no WTN — both are offences.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Site Segregation and Skip Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Site Segregation, Skip Management and Landfill Tax
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective waste segregation at the point of generation is the single most important
              practical step you can take to improve waste management. Mixed waste is expensive to
              process, difficult to recycle, and may be contaminated by hazardous items buried within
              it. Proper segregation saves money, reduces environmental impact, and demonstrates
              professional competence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Segregation Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Metals:</strong> Separate copper from steel from aluminium — each has different recycling value and process</li>
                <li className="pl-1"><strong>Plastics:</strong> Separate PVC (cable sheathing, trunking) from other plastics where possible</li>
                <li className="pl-1"><strong>Hazardous:</strong> All hazardous items in dedicated, labelled containers — never mixed with general waste</li>
                <li className="pl-1"><strong>WEEE:</strong> Whole electrical items kept separate from stripped materials</li>
                <li className="pl-1"><strong>Packaging:</strong> Cardboard, polystyrene, plastic wrap in separate clean recycling stream</li>
                <li className="pl-1"><strong>General/residual:</strong> Only genuinely non-recyclable, non-hazardous mixed waste</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Skip Management</h3>
              <p className="text-sm text-white mb-3">
                On larger maintenance projects or refit works, skips are the primary waste containers.
                Proper skip management is essential for legal compliance and cost control:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use colour-coded or clearly labelled skips for different waste streams</li>
                <li className="pl-1">Never mix hazardous and non-hazardous waste in the same skip — this contaminates the entire load</li>
                <li className="pl-1">Keep skips covered when not in use to prevent rainwater ingress (which adds weight and cost) and wind-blown litter</li>
                <li className="pl-1">Do not overfill — waste above the skip rim is a safety hazard during transport and may breach licence conditions</li>
                <li className="pl-1">Skips on the public highway need a licence from the local authority, with lights and reflectors for visibility</li>
                <li className="pl-1">Obtain a waste transfer note for every skip collection, specifying the waste type and EWC codes</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Landfill Tax</p>
              <p className="text-sm text-white mb-2">
                Landfill tax is a powerful economic instrument designed to reduce the amount of waste sent
                to landfill. Understanding the rates helps you appreciate the financial impact of poor
                waste management:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard rate (2024):</strong> £103.70 per tonne — applies to most waste that is not inert</li>
                <li className="pl-1"><strong>Lower rate (2024):</strong> £3.25 per tonne — applies to qualifying inert waste (e.g., clean concrete, soil, stone)</li>
                <li className="pl-1"><strong>Rate escalation:</strong> The standard rate increases annually, making landfill disposal increasingly expensive</li>
                <li className="pl-1"><strong>Impact:</strong> A single full skip of mixed construction waste can incur over £200 in landfill tax alone — before disposal charges</li>
              </ul>
              <p className="text-sm text-white mt-2">
                By segregating waste and diverting recyclable materials away from landfill, you directly
                reduce your company's waste disposal costs and the environmental burden.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hazardous Waste Storage</h3>
                <p className="text-sm text-white">
                  Hazardous waste must be stored in suitable, sealed containers in a secure, covered area.
                  Containers must be clearly labelled with the waste type and hazard symbols. Liquids (oils,
                  acids) must be stored in bunded areas capable of containing at least 110% of the largest
                  container. Storage time is limited — you must not accumulate more than 12 months' worth
                  of hazardous waste without an environmental permit.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fluorescent Tube Storage</h3>
                <p className="text-sm text-white">
                  Store tubes vertically in purpose-built 'coffin' containers to prevent breakage. Never
                  place loose tubes in a skip or bin bag — broken tubes release mercury vapour. Limit
                  storage quantities and arrange regular collection by a specialist lamp recycler. Record
                  quantities stored and disposed of for your hazardous waste records. Some manufacturers
                  and distributors operate take-back schemes for waste lamps.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Site Waste Management Plans</h3>
              <p className="text-sm text-white">
                Although no longer a legal requirement in England (the Site Waste Management Plans Regulations
                2008 were repealed in 2013), SWMPs remain industry best practice and are often required by
                clients and principal contractors. A good SWMP forecasts the types and quantities of waste,
                sets targets for recycling and diversion from landfill, identifies waste management responsibilities,
                and tracks actual performance against targets. For maintenance projects, a proportionate SWMP
                demonstrates professionalism and helps you plan waste logistics efficiently.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to work in an
              environmentally responsible manner. Demonstrating effective waste segregation, proper documentation,
              and knowledge of the waste hierarchy is evidence of the professional behaviours expected of a
              competent maintenance technician.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Waste Hierarchy (Preferred Order)</p>
                <ul className="space-y-0.5">
                  <li>1. Prevention — avoid creating waste</li>
                  <li>2. Reduction — minimise amount and harmfulness</li>
                  <li>3. Reuse — use again without reprocessing</li>
                  <li>4. Recycling — reprocess into new materials</li>
                  <li>5. Recovery — extract energy value</li>
                  <li>6. Disposal — landfill (last resort)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>EPA 1990 — Duty of care (Section 34)</li>
                  <li>Waste (England & Wales) Regs 2011 — Waste hierarchy</li>
                  <li>Hazardous Waste Regs 2005 — Consignment notes</li>
                  <li>WEEE Regs 2013 — Electrical equipment recycling</li>
                  <li>Landfill tax — £103.70/tonne standard rate</li>
                  <li>ST1426 — Environmental awareness KSBs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5-2">
              Next: COSHH Awareness
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section5_1;
