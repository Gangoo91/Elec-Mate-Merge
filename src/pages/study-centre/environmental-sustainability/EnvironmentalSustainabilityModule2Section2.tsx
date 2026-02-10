import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "duty-of-care-scope",
    question:
      "Under Section 34 of the Environmental Protection Act 1990, the duty of care applies to which parties?",
    options: [
      "Anyone who produces, imports, keeps, stores, treats, or disposes of controlled waste",
      "Only licensed waste disposal companies",
      "Only businesses that produce more than 500 kg of waste per year",
      "Only local authority waste collection services",
    ],
    correctIndex: 0,
    explanation:
      "The duty of care under Section 34 of the Environmental Protection Act 1990 applies to anyone who produces, imports, keeps, stores, treats, or disposes of controlled waste. This includes businesses of all sizes, tradespeople, and anyone involved in the waste chain. It is a 'cradle to grave' responsibility that follows the waste from creation to final disposal.",
  },
  {
    id: "waste-transfer-retention",
    question:
      "For how long must a waste transfer note be retained by both the transferor and the transferee?",
    options: [
      "1 year from the date of transfer",
      "2 years from the date of transfer",
      "3 years from the date of transfer",
      "5 years from the date of transfer",
    ],
    correctIndex: 1,
    explanation:
      "Waste transfer notes must be retained for a minimum of 2 years from the date the waste is transferred. Both the person passing the waste on (transferor) and the person receiving it (transferee) must keep a copy. Consignment notes for hazardous waste must be retained for 3 years.",
  },
  {
    id: "fly-tipping-penalty",
    question:
      "What is the maximum custodial sentence for fly-tipping in England?",
    options: [
      "6 months' imprisonment",
      "12 months' imprisonment",
      "2 years' imprisonment",
      "5 years' imprisonment",
    ],
    correctIndex: 3,
    explanation:
      "Fly-tipping is a serious criminal offence under Section 33 of the Environmental Protection Act 1990. On conviction on indictment, the maximum penalties are an unlimited fine and up to 5 years' imprisonment. Fixed penalty notices of up to \u00a31,000 can be issued for smaller-scale offences, but the courts can impose far harsher sentences for large-scale or repeat offending.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a waste transfer note and a consignment note?",
    answer:
      "A waste transfer note (WTN) is used for non-hazardous controlled waste and must be completed whenever waste is transferred from one party to another. It must be retained for 2 years. A consignment note is used specifically for hazardous waste and is a more detailed 5-part form that requires pre-notification to the Environment Agency. Consignment notes must be retained for 3 years. Both documents form part of the duty of care paperwork, but the consignment note system is stricter because of the greater risks associated with hazardous waste.",
  },
  {
    question:
      "Can I use a season ticket instead of individual waste transfer notes?",
    answer:
      "Yes. If you regularly transfer waste of the same type to the same carrier, you can use a 'season ticket' \u2014 a single waste transfer note that covers multiple transfers over a period of up to 12 months. The season ticket must contain all the same information as a standard WTN and must describe the waste accurately. Both parties must sign it, and each transfer must still be logged (date, quantity, and any variations). Season tickets are a practical solution for businesses with regular waste collections.",
  },
  {
    question:
      "How do I check whether a waste carrier is properly registered?",
    answer:
      "You can check whether a waste carrier is registered with the Environment Agency by searching the public register online at GOV.UK. Enter the carrier\u2019s name, registration number, or company number. The register shows whether the registration is current, what type of waste the carrier is authorised to transport, and whether they hold an upper-tier or lower-tier registration. You should check this before engaging any carrier \u2014 using an unregistered carrier is an offence, and you could be held liable if the waste is subsequently fly-tipped.",
  },
  {
    question:
      "What are my responsibilities as a householder regarding waste disposal?",
    answer:
      "Since 2016, householders have a legal duty of care to take all reasonable steps to ensure their waste is passed only to an authorised person \u2014 such as the local council, a registered waste carrier, or a licensed waste site. If you give waste to an unlicensed person (for example, someone who offers cheap rubbish removal via social media) and that waste is subsequently fly-tipped, you can be issued a fixed penalty notice of up to \u00a3400 or prosecuted. Always ask to see the carrier\u2019s waste carrier licence and keep a record of the transfer.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "The duty of care under Section 34 of the Environmental Protection Act 1990 is often described as a 'cradle to grave' responsibility. What does this mean?",
    options: [
      "Waste producers are only responsible until the waste leaves their site",
      "The responsibility follows the waste from the moment it is produced until it reaches its final disposal point",
      "The Environment Agency takes over responsibility once a waste transfer note is completed",
      "Responsibility ends once the waste is handed to a registered carrier",
    ],
    correctAnswer: 1,
    explanation:
      "The 'cradle to grave' principle means that the original waste producer retains a legal responsibility for their waste from the moment it is created through every stage of its journey \u2014 collection, transport, treatment, and final disposal. If the waste is illegally dumped at any point in the chain, the original producer can be held liable if they failed to take reasonable steps to ensure it was handled properly.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT a mandatory requirement on a waste transfer note?",
    options: [
      "A description of the waste",
      "The SIC code of the waste producer",
      "The name of the individual driver transporting the waste",
      "The quantity of waste being transferred",
    ],
    correctAnswer: 2,
    explanation:
      "A waste transfer note must include: a description of the waste, the SIC code of the waste producer, the quantity of waste, the type of container, the carrier\u2019s name and registration details, the producer\u2019s details, the place and date of transfer, and signatures of both parties. The name of the individual driver is not a mandatory field on the WTN, although it is good practice to record it.",
  },
  {
    id: 3,
    question:
      "Consignment notes for hazardous waste must be retained for how long?",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "5 years",
    ],
    correctAnswer: 2,
    explanation:
      "Consignment notes for hazardous waste must be retained for a minimum of 3 years from the date the waste was transferred. This is one year longer than the 2-year retention period for standard waste transfer notes, reflecting the higher risk profile of hazardous waste.",
  },
  {
    id: 4,
    question:
      "Before hazardous waste can be moved off site, the waste producer must:",
    options: [
      "Notify the local council at least 7 days in advance",
      "Pre-notify the Environment Agency and obtain a unique consignment note code",
      "Obtain written permission from the HSE",
      "Submit a risk assessment to DEFRA",
    ],
    correctAnswer: 1,
    explanation:
      "Before hazardous waste is removed from site, the waste producer must pre-notify the Environment Agency and receive a unique consignment note code. This code must be recorded on the consignment note and used to track the waste through the system. The pre-notification allows the EA to monitor hazardous waste movements and ensure they reach authorised facilities.",
  },
  {
    id: 5,
    question:
      "A waste carrier must be registered with the Environment Agency. What are the consequences of using an unregistered carrier?",
    options: [
      "A verbal warning from the Environment Agency",
      "No consequences \u2014 it is the carrier\u2019s responsibility to register",
      "The waste producer can be prosecuted and may be liable for any subsequent fly-tipping",
      "A small administrative fee is charged by the Environment Agency",
    ],
    correctAnswer: 2,
    explanation:
      "Using an unregistered waste carrier is a criminal offence. The waste producer has a duty of care to check that anyone they hand waste to is properly authorised. If an unregistered carrier subsequently fly-tips the waste, the original producer can be prosecuted under Section 34 of the Environmental Protection Act 1990 for failing to fulfil their duty of care.",
  },
  {
    id: 6,
    question:
      "How many incidents of fly-tipping are estimated to occur each year in England?",
    options: [
      "Around 100,000",
      "Around 250,000",
      "Around 500,000",
      "Over 1 million",
    ],
    correctAnswer: 3,
    explanation:
      "There are over 1 million recorded incidents of fly-tipping each year in England. The true figure is likely higher, as many incidents go unreported. Fly-tipping costs local authorities hundreds of millions of pounds per year in clearance and enforcement. It is a persistent environmental crime that harms communities, wildlife, and the landscape.",
  },
  {
    id: 7,
    question:
      "What is the main purpose of the new DEFRA digital waste tracking system?",
    options: [
      "To replace the Environment Agency entirely",
      "To create a single digital record of waste movements, replacing paper-based documentation",
      "To automatically calculate waste disposal costs",
      "To allow householders to track their council bin collections",
    ],
    correctAnswer: 1,
    explanation:
      "The DEFRA digital waste tracking system is designed to create a single, digital record of waste movements across England. It replaces paper-based waste transfer notes and consignment notes with electronic records, making it easier to track waste from production to disposal, detect illegal activity, and reduce administrative burden on businesses. The system supports the 'cradle to grave' principle by providing end-to-end visibility of waste journeys.",
  },
  {
    id: 8,
    question:
      "A site waste management plan (SWMP) is used to:",
    options: [
      "Replace the duty of care obligation for construction sites",
      "Plan, record, and manage the waste produced on a construction site",
      "Exempt construction waste from waste transfer note requirements",
      "Allow builders to dispose of waste without using a registered carrier",
    ],
    correctAnswer: 1,
    explanation:
      "A site waste management plan is a practical tool for planning, recording, and managing waste produced on a construction site. Although SWMPs are no longer a legal requirement in England (the mandatory requirement was removed in 2013), they remain best practice and are often required by clients, principal contractors, and building certification schemes. A good SWMP helps minimise waste, maximise recycling, reduce costs, and demonstrate compliance with the duty of care.",
  },
];

const EnvironmentalSustainabilityModule2Section2 = () => {
  useSEO({
    title:
      "Duty of Care & Waste Transfer Notes | Environmental & Sustainability Module 2.2",
    description:
      "Learn about the duty of care under the Environmental Protection Act 1990, waste transfer notes, consignment notes for hazardous waste, waste carrier registration, fly-tipping penalties, and digital waste tracking.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-emerald-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Duty of Care & Waste Transfer Notes
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding your legal obligations when handling, transferring,
            and disposing of waste &mdash; from duty of care documentation to
            fly-tipping enforcement
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="font-semibold text-emerald-400 mb-2">
              In 30 Seconds
            </p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Duty of care:</strong>{" "}
                  &ldquo;cradle to grave&rdquo; responsibility for all
                  controlled waste
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Waste transfer notes:</strong>{" "}
                  legally required for every waste transfer, retained 2 years
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Consignment notes:</strong>{" "}
                  5-part form for hazardous waste, retained 3 years
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Fly-tipping:</strong>{" "}
                  unlimited fine, up to 5 years&rsquo; imprisonment
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="font-semibold text-emerald-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Before transferring:</strong>{" "}
                  complete a waste transfer note for every load
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check carriers:</strong>{" "}
                  verify registration on the EA public register
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Keep records:</strong> store
                  all duty of care paperwork for the required period
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Never:</strong> hand waste to
                  anyone who cannot prove they are authorised
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Explain the duty of care under Section 34 of the Environmental Protection Act 1990 and the 'cradle to grave' principle",
              "List the mandatory contents of a waste transfer note and state the retention period",
              "Describe the consignment note system for hazardous waste including pre-notification requirements",
              "Explain how to check waste carrier registration and the penalties for using unregistered carriers",
              "Distinguish between waste carriers, brokers, and dealers and their respective obligations",
              "Describe the new DEFRA digital waste tracking system and its benefits",
              "State the penalties for fly-tipping and the householder duty of care",
              "Outline practical compliance measures including waste audits, training, and site waste management plans",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Duty of Care */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">
                01
              </span>
              The Duty of Care
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Section 34</strong> of the
                Environmental Protection Act 1990 establishes the{" "}
                <strong className="text-white">duty of care</strong> for waste.
                This is one of the most important principles in waste management
                law and applies to{" "}
                <strong className="text-white">
                  anyone who produces, imports, keeps, stores, treats, or
                  disposes of controlled waste
                </strong>
                . It is not limited to large businesses &mdash; it applies
                equally to sole traders, small firms, and major corporations.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Key Definition: Cradle to Grave
                </h3>
                <p className="text-white/80 text-sm">
                  The duty of care is often described as a{" "}
                  <strong className="text-white">
                    &ldquo;cradle to grave&rdquo;
                  </strong>{" "}
                  responsibility. This means that the original waste producer
                  retains a legal responsibility for their waste from the moment
                  it is created through every stage of its journey &mdash;
                  collection, transport, treatment, and final disposal. Even
                  after waste has been handed to a registered carrier, the
                  producer is not absolved of responsibility if they failed to
                  take reasonable steps to ensure proper handling.
                </p>
              </div>

              <p>The duty of care requires you to:</p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  Core Obligations Under the Duty of Care
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Prevent unauthorised or harmful disposal:
                      </strong>{" "}
                      ensure waste is not deposited, treated, or disposed of in
                      a way that pollutes the environment or harms human health
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Prevent escape of waste:
                      </strong>{" "}
                      keep waste contained securely so it cannot blow away,
                      leak, or otherwise escape from your control
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Transfer only to authorised persons:
                      </strong>{" "}
                      only pass waste to someone who is legally authorised to
                      accept it &mdash; a registered carrier, a licensed waste
                      site, or the local authority
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Provide an accurate description:
                      </strong>{" "}
                      give a written description of the waste so that anyone who
                      subsequently handles it can do so safely and lawfully
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Complete a waste transfer note:
                      </strong>{" "}
                      for every transfer of non-hazardous waste, or a
                      consignment note for hazardous waste
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Applies to Electrical Contractors
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  As an electrical contractor, you produce waste on every job
                  &mdash; cable offcuts, packaging, old components, fluorescent
                  tubes (hazardous), batteries, and WEEE. The duty of care
                  applies to all of this waste. You must ensure it is properly
                  described, contained, transferred only to authorised persons,
                  and accompanied by the correct documentation. Ignorance is no
                  defence: if your waste ends up fly-tipped because you handed
                  it to an unregistered carrier, you can be prosecuted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Waste Transfer Notes */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">02</span>
              Waste Transfer Notes
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A{" "}
                <strong className="text-white">waste transfer note (WTN)</strong>{" "}
                is a legal document that must accompany{" "}
                <strong className="text-white">every transfer</strong> of
                non-hazardous controlled waste from one party to another. It
                provides a paper trail that demonstrates compliance with the
                duty of care and allows regulators to trace waste from its
                source to its final destination.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Mandatory Contents of a Waste Transfer Note
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Description of Waste
                      </p>
                      <p className="text-white/60">
                        A written description of the waste that is detailed
                        enough for anyone handling it to do so safely. Include
                        the type, composition, and any hazardous properties.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">SIC Code</p>
                      <p className="text-white/60">
                        The Standard Industrial Classification code of the
                        business that produced the waste. This identifies the
                        industry sector (e.g. 43210 for electrical installation).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Quantity of Waste
                      </p>
                      <p className="text-white/60">
                        The weight (in kilograms or tonnes) or volume of waste
                        being transferred. An estimate is acceptable if an exact
                        measurement is not practicable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Container Type</p>
                      <p className="text-white/60">
                        How the waste is contained &mdash; skip, drum, bag,
                        loose in a vehicle, etc. This helps the receiving party
                        prepare for safe handling.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        5
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Carrier Details</p>
                      <p className="text-white/60">
                        The name, address, and waste carrier registration number
                        of the person or company transporting the waste.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        6
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Producer Details
                      </p>
                      <p className="text-white/60">
                        The name, address, and contact details of the person or
                        business that produced the waste. If using a broker, the
                        broker&rsquo;s details must also be included.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        7
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Place, Date & Signatures
                      </p>
                      <p className="text-white/60">
                        The place and date of the transfer, plus the signatures
                        of both the transferor (person handing over the waste)
                        and the transferee (person receiving it).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Retention Period: 2 Years
                </h3>
                <p className="text-white/80 text-sm">
                  Both the transferor and the transferee must keep a copy of the
                  waste transfer note for a minimum of{" "}
                  <strong className="text-white">2 years</strong> from the date
                  the waste was transferred. The Environment Agency can request
                  to see your waste transfer notes at any time during this
                  period. Failure to produce a valid WTN when asked is an
                  offence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Consignment Notes */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">03</span>
              Consignment Notes
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                When waste is classified as{" "}
                <strong className="text-white">hazardous</strong>, a standard
                waste transfer note is not sufficient. Instead, a{" "}
                <strong className="text-white">consignment note</strong> must be
                used. This is a more detailed document that provides a full
                audit trail for dangerous materials.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  The 5-Part Consignment Note
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">
                        A
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Part A &mdash; Notification
                      </p>
                      <p className="text-white/60">
                        The consignment note code (obtained from the Environment
                        Agency via pre-notification), producer details, and
                        waste description including EWC codes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">
                        B
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Part B &mdash; Description of Waste
                      </p>
                      <p className="text-white/60">
                        Detailed description of the hazardous waste including
                        physical form, chemical composition, hazardous
                        properties, quantity, and packaging/container type.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">
                        C
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Part C &mdash; Carrier Certificate
                      </p>
                      <p className="text-white/60">
                        The carrier&rsquo;s registration details, vehicle
                        registration, collection date, and the carrier&rsquo;s
                        signature confirming receipt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">
                        D
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Part D &mdash; Consignee Certificate
                      </p>
                      <p className="text-white/60">
                        Completed by the receiving facility to confirm the waste
                        has been received. Includes the permit/licence number of
                        the receiving site.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">
                        E
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Part E &mdash; Consignee Rejection
                      </p>
                      <p className="text-white/60">
                        Used if the receiving facility rejects the waste (e.g.
                        because it does not match the description or the
                        facility is not authorised to accept it).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Pre-Notification to the Environment Agency
                </h3>
                <p className="text-white/80 text-sm">
                  Before hazardous waste can be moved off site, the waste
                  producer must{" "}
                  <strong className="text-white">pre-notify</strong> the
                  Environment Agency. This is done online and generates a{" "}
                  <strong className="text-white">
                    unique consignment note code
                  </strong>{" "}
                  that must be recorded on the consignment note. The code allows
                  the EA to track the waste movement and ensure it reaches an
                  authorised facility. Pre-notification must be completed{" "}
                  <strong className="text-white">before</strong> the waste
                  leaves the site.
                </p>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Retention Period: 3 Years
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Consignment notes for hazardous waste must be retained for a
                  minimum of{" "}
                  <strong className="text-white">3 years</strong> from the date
                  of transfer. This is one year longer than the 2-year
                  requirement for standard waste transfer notes, reflecting the
                  higher risk associated with hazardous waste. Both the producer
                  and the consignee must retain copies.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  Common Hazardous Waste from Electrical Work
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Fluorescent tubes and lamps:
                      </strong>{" "}
                      contain mercury &mdash; classified as hazardous waste
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Batteries:</strong> lead-acid
                      and lithium batteries are hazardous
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Capacitors containing PCBs:
                      </strong>{" "}
                      found in older electrical equipment, highly toxic
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Cable with lead sheathing:
                      </strong>{" "}
                      older cables may contain lead which is a hazardous
                      substance
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Waste Carriers */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">04</span>
              Waste Carriers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Anyone who transports controlled waste must be{" "}
                <strong className="text-white">
                  registered as a waste carrier
                </strong>{" "}
                with the Environment Agency. This includes businesses that carry
                their own waste as well as dedicated waste collection companies.
                There are two tiers of registration:
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Carrier Registration Tiers
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Lower tier:</strong> free
                      registration for businesses that carry only their own
                      non-hazardous waste (e.g. an electrical contractor taking
                      cable offcuts to the tip). Registration does not expire
                      but must be renewed if details change.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Upper tier:</strong> paid
                      registration for businesses that carry other people&rsquo;s
                      waste or their own construction/demolition waste. Must be
                      renewed every 3 years.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Checking Carrier Registration
                </h3>
                <p className="text-white/80 text-sm">
                  Before handing waste to any carrier, you{" "}
                  <strong className="text-white">must</strong> verify their
                  registration. The Environment Agency maintains a{" "}
                  <strong className="text-white">public register</strong>{" "}
                  available online at GOV.UK where you can search by company
                  name, registration number, or company number. The register
                  confirms whether the registration is current, the tier, and
                  what types of waste the carrier is authorised to handle. Keep a
                  record of your check &mdash; a screenshot or printout of the
                  register entry is good evidence of due diligence.
                </p>
              </div>

              <div className="bg-white/5 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Penalties for Using Unregistered Carriers
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Using an unregistered waste carrier is a criminal offence
                  under the duty of care. Penalties include:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Prosecution of the waste producer:
                      </strong>{" "}
                      for failing to fulfil the duty of care
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Liability for fly-tipping:
                      </strong>{" "}
                      if the unregistered carrier dumps the waste illegally, the
                      original producer can be held jointly liable
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Unlimited fines:</strong>{" "}
                      on conviction, courts can impose unlimited fines
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Seizure of vehicles:
                      </strong>{" "}
                      the Environment Agency has the power to seize vehicles
                      used for illegal waste carriage
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Waste Brokers & Dealers */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">
                05
              </span>
              Waste Brokers & Dealers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                In addition to waste carriers, the law recognises{" "}
                <strong className="text-white">waste brokers</strong> and{" "}
                <strong className="text-white">waste dealers</strong> &mdash;
                intermediaries who arrange or facilitate waste transfers without
                necessarily transporting the waste themselves.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Key Differences
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Waste broker:</strong>{" "}
                      arranges the disposal or recovery of waste on behalf of
                      others. They do not take physical possession of the waste.
                      A broker acts as an intermediary between the waste
                      producer and the carrier or disposal facility.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Waste dealer:</strong>{" "}
                      buys, sells, or otherwise arranges waste transactions.
                      Unlike a broker, a dealer typically takes ownership of the
                      waste at some point &mdash; they buy it from the producer
                      and sell it on for treatment or recovery.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Waste carrier:</strong>{" "}
                      physically transports waste from one location to another.
                      The carrier may or may not also be the broker or dealer.
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Both brokers and dealers must be{" "}
                <strong className="text-white">
                  registered with the Environment Agency
                </strong>
                . They have a{" "}
                <strong className="text-white">
                  due diligence obligation
                </strong>{" "}
                to ensure that waste is handled lawfully at every stage. If you
                use a broker to arrange waste removal, you should verify their
                registration in the same way you would check a carrier &mdash;
                through the EA&rsquo;s public register. The broker must also
                ensure that any carriers and facilities they use are properly
                authorised.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">
                  Your Responsibility Remains
                </h3>
                <p className="text-white/80 text-sm">
                  Using a broker or dealer does{" "}
                  <strong className="text-white">not</strong> remove your duty
                  of care as the waste producer. You remain legally responsible
                  for ensuring your waste reaches a lawful destination. If a
                  broker arranges for an unregistered carrier to collect your
                  waste and it is fly-tipped, you can still be prosecuted. Always
                  carry out your own checks and keep records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Electronic Waste Tracking */}
        <section className="mb-10">
          <div className="border-l-2 border-sky-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-sky-400/80 text-sm font-normal">06</span>
              Electronic Waste Tracking
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The UK government, through{" "}
                <strong className="text-white">DEFRA</strong> (Department for
                Environment, Food & Rural Affairs), is introducing a{" "}
                <strong className="text-white">
                  digital waste tracking system
                </strong>{" "}
                that will fundamentally change how waste is recorded and
                monitored. The system replaces paper-based waste transfer notes
                and consignment notes with electronic records.
              </p>

              <div className="bg-white/5 border border-sky-400/30 p-4 rounded-lg">
                <h3 className="text-sky-300 font-medium mb-3">
                  Digital Duty of Care Waste Information
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Single digital record:
                      </strong>{" "}
                      all waste movements will be recorded in a single national
                      system, creating an end-to-end audit trail from
                      production to disposal
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Real-time tracking:
                      </strong>{" "}
                      regulators will be able to monitor waste movements as they
                      happen, making it far easier to detect illegal activity
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Reduced paperwork:
                      </strong>{" "}
                      businesses will no longer need to retain physical copies of
                      waste transfer notes &mdash; the digital system will hold
                      all records centrally
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Improved data quality:
                      </strong>{" "}
                      standardised digital forms will reduce errors,
                      inconsistencies, and incomplete records that plague the
                      current paper-based system
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Benefits of Digitalisation
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The move to digital waste tracking offers significant benefits
                  for businesses, regulators, and the environment:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Easier compliance:
                      </strong>{" "}
                      guided digital forms help ensure all mandatory fields are
                      completed correctly
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Better enforcement:
                      </strong>{" "}
                      the EA can identify gaps in the waste chain &mdash; where
                      waste disappears between producer and disposal &mdash;
                      which often indicates illegal dumping
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Waste crime reduction:
                      </strong>{" "}
                      transparency and traceability make it much harder for
                      criminals to operate undetected
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Resource efficiency:
                      </strong>{" "}
                      better data on waste types and volumes supports improved
                      recycling and resource recovery planning
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Fly-Tipping */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              Fly-Tipping
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Fly-tipping</strong> is the
                illegal deposit of waste on land that does not have a licence to
                accept it. It is a criminal offence under{" "}
                <strong className="text-white">Section 33</strong> of the
                Environmental Protection Act 1990 and is one of the most
                significant environmental crimes in England.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Scale of the Problem
                  </h3>
                </div>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Over 1 million incidents
                      </strong>{" "}
                      of fly-tipping are recorded each year in England alone
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Clearance costs local authorities{" "}
                      <strong className="text-white">
                        hundreds of millions of pounds
                      </strong>{" "}
                      per year
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      The most commonly fly-tipped waste types include
                      household waste, construction and demolition waste, white
                      goods, and tyres
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Fly-tipping causes pollution, harms wildlife, reduces
                      property values, and blights communities
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">
                  Penalties for Fly-Tipping
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Summary conviction:
                      </strong>{" "}
                      unlimited fine and/or up to 12 months&rsquo; imprisonment
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Conviction on indictment:
                      </strong>{" "}
                      unlimited fine and/or up to{" "}
                      <strong className="text-white">
                        5 years&rsquo; imprisonment
                      </strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Fixed penalty notices:
                      </strong>{" "}
                      local authorities can issue FPNs of up to &pound;1,000 for
                      smaller-scale fly-tipping &mdash; these are an alternative
                      to prosecution for less serious offences
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Vehicle seizure:
                      </strong>{" "}
                      vehicles used for fly-tipping can be seized and crushed
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Householder Duty of Care
                </h3>
                <p className="text-white/80 text-sm">
                  Since 2016, householders in England have a specific{" "}
                  <strong className="text-white">duty of care</strong> to take
                  all reasonable steps to ensure their waste is given only to an
                  authorised person. If a householder hands waste to an
                  unlicensed individual &mdash; for example, someone offering
                  cheap rubbish removal on social media &mdash; and that waste is
                  subsequently fly-tipped, the householder can be issued a
                  fixed penalty notice of up to{" "}
                  <strong className="text-white">&pound;400</strong> or
                  prosecuted. The message is clear: always check that whoever
                  takes your waste is authorised to do so.
                </p>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    Fly-Tipping and the Electrical Trade
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Construction and demolition waste is one of the most commonly
                  fly-tipped categories. As an electrical contractor, you must
                  never leave waste on site unless you have the landowner&rsquo;s
                  permission and the waste is properly managed. You must never
                  dump waste in skips that belong to other contractors without
                  permission, and you must never ask an unregistered person to
                  &ldquo;get rid&rdquo; of waste for you. These are all
                  potential offences that could result in prosecution,
                  unlimited fines, and reputational damage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Practical Compliance */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">
                08
              </span>
              Practical Compliance
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Compliance with the duty of care is not just a legal
                obligation &mdash; it is good business practice. Businesses that
                manage their waste well save money, avoid prosecution, and
                protect their reputation. Here are the practical steps you
                should take:
              </p>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Record Keeping
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Keep copies of all waste transfer notes and consignment
                      notes for the required retention periods (2 years and 3
                      years respectively)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Maintain a log of all waste carrier registrations you have
                      checked, including dates and screenshots
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Store records in a central, accessible location &mdash;
                      digitally if possible &mdash; so they can be produced
                      quickly if the Environment Agency requests them
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Waste Audits
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Conduct regular waste audits to understand what waste your
                      business produces, in what quantities, and how it is
                      currently disposed of
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Identify opportunities to reduce waste, reuse materials,
                      and increase recycling rates
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Use audit findings to negotiate better waste collection
                      contracts and reduce disposal costs
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Training Staff
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Ensure all employees understand the duty of care and their
                      personal responsibilities
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Train staff to separate waste correctly on site &mdash;
                      general waste, recyclables, hazardous waste
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Make sure staff know how to complete waste transfer notes
                      and who to contact if they are unsure about waste
                      classification
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Checking Waste Destinations
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Verify that the final destination for your waste holds the
                      correct environmental permit or exemption
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Consider visiting the disposal or recovery site to satisfy
                      yourself that it is a legitimate, well-managed operation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Be suspicious of waste collection services that offer
                      prices significantly lower than competitors &mdash; this
                      may indicate illegal disposal
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Site Waste Management Plans
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Although no longer a mandatory legal requirement in England
                  (the requirement was removed in 2013), a{" "}
                  <strong className="text-white">
                    site waste management plan (SWMP)
                  </strong>{" "}
                  remains best practice for construction projects. A good SWMP
                  should include:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      An estimate of the types and quantities of waste the
                      project will produce
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Plans for waste minimisation, reuse, and recycling
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Details of the carriers and disposal/recovery facilities
                      to be used
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Actual waste volumes and disposal routes recorded as the
                      project progresses
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 1: Waste Transfer Documentation Flowchart */}
        <section className="mb-10">
          <h3 className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wide">
            Waste Transfer Documentation Flowchart
          </h3>

          {/* Start box */}
          <div className="flex justify-center mb-3">
            <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-white font-semibold text-sm">
                Waste Produced on Site
              </p>
              <p className="text-white/60 text-xs mt-1">
                Cable offcuts, packaging, old components, fluorescent tubes,
                batteries, etc.
              </p>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-emerald-400/40"></div>
          </div>

          {/* Decision: hazardous? */}
          <div className="flex justify-center mb-3">
            <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-amber-300 font-semibold text-sm">
                Is the waste hazardous?
              </p>
            </div>
          </div>

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-3">
            {/* Non-hazardous branch */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/5 border border-emerald-400/30 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-emerald-300 font-medium text-xs">
                  No &mdash; Non-Hazardous
                </p>
              </div>
              <div className="w-0.5 h-4 bg-emerald-400/30"></div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Complete a Waste Transfer Note (WTN)
                </p>
              </div>
              <div className="w-0.5 h-4 bg-emerald-400/30"></div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">Retain WTN for 2 years</p>
              </div>
            </div>

            {/* Hazardous branch */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/5 border border-amber-400/30 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-amber-300 font-medium text-xs">
                  Yes &mdash; Hazardous
                </p>
              </div>
              <div className="w-0.5 h-4 bg-amber-400/30"></div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Pre-notify EA &amp; obtain consignment note code
                </p>
              </div>
              <div className="w-0.5 h-4 bg-amber-400/30"></div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Complete 5-part Consignment Note &mdash; retain for 3 years
                </p>
              </div>
            </div>
          </div>

          {/* Arrow down to common step */}
          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-emerald-400/40"></div>
          </div>

          {/* Common steps */}
          <div className="flex justify-center mb-3">
            <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-emerald-400 font-semibold text-sm mb-1">
                Both Routes
              </p>
              <p className="text-white/70 text-xs">
                Check carrier registration on EA public register before
                transfer
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-emerald-400/40"></div>
          </div>

          <div className="flex justify-center">
            <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-white font-semibold text-sm">
                Waste Reaches Authorised Facility
              </p>
              <p className="text-white/60 text-xs mt-1">
                Licensed treatment, recovery, or disposal site
              </p>
            </div>
          </div>
        </section>

        {/* Diagram 2: Duty of Care Chain */}
        <section className="mb-10">
          <h3 className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wide">
            Duty of Care Chain
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            {/* Producer */}
            <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl px-4 py-3 text-center w-full sm:w-auto sm:min-w-[160px]">
              <p className="text-emerald-400 font-semibold text-sm">
                Producer
              </p>
              <p className="text-white/60 text-xs mt-1">
                Creates the waste &amp; has cradle-to-grave responsibility
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden sm:block w-8 h-0.5 bg-emerald-400/40"></div>
            <div className="sm:hidden w-0.5 h-6 bg-emerald-400/40"></div>

            {/* Carrier */}
            <div className="bg-teal-500/15 border-2 border-teal-500/40 rounded-xl px-4 py-3 text-center w-full sm:w-auto sm:min-w-[160px]">
              <p className="text-teal-400 font-semibold text-sm">Carrier</p>
              <p className="text-white/60 text-xs mt-1">
                Registered with EA &amp; transports waste safely
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden sm:block w-8 h-0.5 bg-teal-400/40"></div>
            <div className="sm:hidden w-0.5 h-6 bg-teal-400/40"></div>

            {/* Disposal / Recovery */}
            <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl px-4 py-3 text-center w-full sm:w-auto sm:min-w-[160px]">
              <p className="text-cyan-400 font-semibold text-sm">
                Disposal / Recovery
              </p>
              <p className="text-white/60 text-xs mt-1">
                Licensed facility for treatment or final disposal
              </p>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-white/60 text-xs text-center">
              The duty of care applies at{" "}
              <strong className="text-white">every link</strong> in this chain.
              Each party must ensure the waste is described accurately, contained
              securely, and transferred only to authorised persons. A waste
              transfer note (or consignment note for hazardous waste)
              accompanies each transfer.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Classification & Types of Waste
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2-section-3">
              Next: Waste Hierarchy & Circular Economy
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnvironmentalSustainabilityModule2Section2;
