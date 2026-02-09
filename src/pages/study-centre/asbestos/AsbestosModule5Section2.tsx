import { ArrowLeft, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "rpe-removal-order",
    question:
      "When removing PPE after asbestos work, which item of protection should be removed LAST?",
    options: [
      "Respiratory protective equipment (RPE)",
      "Outer gloves",
      "Boot covers",
      "Disposable coverall",
    ],
    correctIndex: 0,
    explanation:
      "RPE is ALWAYS the last item of personal protective equipment to be removed. This is because asbestos fibres may have settled on the coverall, gloves, and boot covers during work. Removing these items first whilst still wearing RPE ensures you are not breathing in fibres dislodged during the decontamination process.",
  },
  {
    id: "double-bag-fill-level",
    question:
      "To what level should asbestos waste bags be filled before sealing?",
    options: [
      "No more than two-thirds full",
      "Completely full to avoid wasting bags",
      "Half full at most",
      "It does not matter as long as the bag can be sealed",
    ],
    correctIndex: 0,
    explanation:
      "Asbestos waste bags should be filled to no more than two-thirds of their capacity. This allows sufficient space at the top to create a secure goose-neck twist and tape seal, forming an airtight closure. Overfilling bags makes it impossible to seal them properly and increases the risk of bags splitting during handling and transport.",
  },
  {
    id: "waste-carrier-requirement",
    question:
      "Who is legally permitted to transport asbestos waste from a work site to a disposal facility?",
    options: [
      "Only a licensed waste carrier registered with the Environment Agency",
      "Any contractor with a van large enough to carry the waste",
      "The electrician who carried out the work, provided they use sealed bags",
      "The building owner or dutyholder",
    ],
    correctIndex: 0,
    explanation:
      "Asbestos waste can ONLY be transported by a waste carrier holding a valid licence issued by the Environment Agency (or SEPA in Scotland, NRW in Wales). The waste producer has a legal duty of care to verify that the carrier holds a current licence before handing over the waste. Transporting asbestos waste without a licence is a criminal offence.",
  },
];

const faqs = [
  {
    question:
      "Can contaminated work clothes be taken home and washed in a domestic washing machine?",
    answer:
      "Absolutely not. Contaminated work clothes must NEVER be taken home. Doing so risks secondary contamination of your home, your vehicle, and your family. Contaminated clothing must be bagged on site and disposed of as asbestos waste, or sent to a specialist industrial laundry that is equipped and licensed to handle asbestos-contaminated textiles. Taking contaminated clothing home has historically been a significant cause of secondary asbestos exposure among the families of workers — particularly in the case of mesothelioma diagnosed in spouses who laundered contaminated overalls.",
  },
  {
    question:
      "What is the difference between a red asbestos waste bag and the clear outer bag?",
    answer:
      "The inner bag is a red polythene asbestos waste sack (minimum 250 gauge thickness) used to contain the asbestos waste directly. It is sealed with a goose-neck twist and tape. The outer bag is a clear polythene bag printed with a red asbestos warning stripe and the prescribed danger warning text. The clear outer bag allows the inner bag to be seen and provides a second layer of containment. Both bags together form the double-bagging system required by regulations. Each bag must be individually sealed and the outer bag must carry a consignment note reference.",
  },
  {
    question:
      "How long must consignment notes for asbestos waste be kept, and why?",
    answer:
      "Consignment notes must be retained for a minimum of 3 years. In practice, many organisations keep them indefinitely because they form part of the permanent audit trail demonstrating legal compliance with hazardous waste regulations. The consignment note records the waste producer, description, EWC code, quantity, waste carrier details, and the licensed disposal site. If a regulatory investigation takes place — for example, if asbestos waste is found to have been illegally dumped — consignment notes are the primary evidence that waste was handled and disposed of lawfully.",
  },
  {
    question:
      "What happens if asbestos waste is mixed with general construction waste?",
    answer:
      "Mixing asbestos waste with general waste is a criminal offence under the Hazardous Waste Regulations. If asbestos waste is mixed with general waste, the entire load becomes classified as hazardous waste and must be disposed of accordingly — at significantly greater cost. The person responsible may face prosecution, an unlimited fine, and potentially imprisonment. In addition, anyone who comes into contact with the mixed waste — skip drivers, waste sorting operatives, landfill workers — may be unknowingly exposed to asbestos fibres. All asbestos waste must be segregated, double-bagged, labelled, and transported separately by a licensed waste carrier to a licensed hazardous waste landfill.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "In the 7-step personal decontamination sequence, what is the correct order for removing protection?",
    options: [
      "Remove RPE first, then coverall, then gloves",
      "Damp-wipe suit, remove boot covers, remove outer gloves, peel off coverall inside-out, remove RPE, remove inner gloves, bag all waste",
      "Remove all items simultaneously and place them in a single waste bag",
      "Remove coverall first, then RPE, then gloves and boot covers",
    ],
    correctAnswer: 1,
    explanation:
      "The correct 7-step sequence is: (1) damp-wipe the suit, (2) remove boot covers, (3) remove outer gloves, (4) peel off coverall inside-out, (5) remove RPE, (6) remove inner gloves, (7) bag all waste as asbestos waste. RPE is always the last item of protection removed, ensuring the worker continues to breathe filtered air whilst potentially contaminated items are being removed.",
  },
  {
    id: 2,
    question:
      "What is the minimum thickness required for the inner red polythene asbestos waste sack?",
    options: [
      "100 gauge",
      "250 gauge (or 1000 gauge for sharp materials)",
      "500 gauge for all types of waste",
      "There is no minimum thickness requirement",
    ],
    correctAnswer: 1,
    explanation:
      "The inner red polythene waste sack must be a minimum of 250 gauge thickness for standard asbestos waste. For sharp or abrasive materials that could puncture the bag (such as broken asbestos cement sheets), a heavier gauge of 1000 gauge is required. Using bags below the minimum gauge increases the risk of puncture, tearing, and fibre release during handling and transport.",
  },
  {
    id: 3,
    question:
      "During the 4-stage clearance procedure for licensed asbestos removal work, what fibre concentration must be achieved in the clearance air test?",
    options: [
      "Less than 0.1 fibres per cm\u00B3",
      "Less than 0.05 fibres per cm\u00B3",
      "Less than 0.01 fibres per cm\u00B3",
      "Zero fibres per cm\u00B3",
    ],
    correctAnswer: 2,
    explanation:
      "The clearance air test (Stage 3 of the 4-stage clearance procedure) must demonstrate that the airborne fibre concentration is below 0.01 fibres per cm\u00B3. This is the clearance indicator level and is ten times lower than the workplace control limit of 0.1 fibres per cm\u00B3. The area cannot be reoccupied until this level is achieved and a site clearance certificate (Stage 4) is issued.",
  },
  {
    id: 4,
    question:
      "What European Waste Catalogue (EWC) code applies to construction materials containing asbestos, such as asbestos cement products?",
    options: [
      "17 06 01",
      "17 06 05",
      "20 01 01",
      "15 01 01",
    ],
    correctAnswer: 1,
    explanation:
      "EWC code 17 06 05 applies to construction materials containing asbestos, such as asbestos cement products (roof sheets, guttering, flue pipes, cladding). EWC code 17 06 01 applies to insulation materials containing asbestos (pipe lagging, sprayed coatings, AIB). The correct EWC code must be recorded on the hazardous waste consignment note for every load of asbestos waste.",
  },
  {
    id: 5,
    question: "How should asbestos waste bags be sealed?",
    options: [
      "Tied in a simple knot at the top",
      "Stapled shut with heavy-duty staples",
      "Sealed with a goose-neck twist and tape to create an airtight seal",
      "Left open at the top for inspection purposes",
    ],
    correctAnswer: 2,
    explanation:
      "Asbestos waste bags must be sealed using a goose-neck twist and tape. This involves twisting the neck of the bag tightly and folding it over, then wrapping it firmly with tape to create an airtight seal. This method prevents fibres from escaping during handling and transport. Both the inner red bag and the outer clear bag must each be individually sealed in this manner.",
  },
  {
    id: 6,
    question:
      "What is the waste producer's legal 'duty of care' in relation to asbestos waste?",
    options: [
      "To dispose of the waste themselves without involving third parties",
      "To check the waste carrier's licence and ensure waste goes to a licensed hazardous waste landfill",
      "To notify the local council before starting any asbestos work",
      "To keep the waste on site indefinitely until the Environment Agency collects it",
    ],
    correctAnswer: 1,
    explanation:
      "The waste producer has a legal duty of care to verify that the waste carrier holds a valid licence issued by the Environment Agency (or SEPA/NRW) and to ensure that the waste is taken to a licensed hazardous waste landfill site. The producer must also complete consignment notes, retain copies for at least 3 years, and ensure waste is properly packaged and labelled before handover.",
  },
  {
    id: 7,
    question:
      "Which of the following items must also be disposed of as asbestos waste after asbestos work?",
    options: [
      "Only the asbestos-containing material itself",
      "Contaminated PPE, cleaning cloths, and Type H vacuum bags",
      "Only items that are visibly covered in dust",
      "Tools that were used within 10 metres of the work area",
    ],
    correctAnswer: 1,
    explanation:
      "All contaminated PPE (coveralls, gloves, boot covers), disposable cleaning cloths, and Type H vacuum filters and bags must be disposed of as asbestos waste. These items may carry asbestos fibres even if contamination is not visible to the naked eye. Disposable tools used during asbestos work should also be bagged and disposed of as asbestos waste. Items that cannot be adequately decontaminated must likewise be treated as asbestos waste.",
  },
  {
    id: 8,
    question:
      "What is the maximum penalty for fly-tipping asbestos waste in the UK?",
    options: [
      "A fixed penalty notice of \u00A3400",
      "A fine of up to \u00A310,000",
      "An unlimited fine and up to 5 years imprisonment",
      "A community service order only",
    ],
    correctAnswer: 2,
    explanation:
      "Fly-tipping asbestos waste is a serious criminal offence carrying a maximum penalty of an unlimited fine and up to 5 years imprisonment. Asbestos is classified as hazardous waste, so illegal disposal carries the most severe penalties available. In addition to criminal sanctions, the offender may be liable for the full cost of clean-up, environmental remediation, and any health consequences arising from the illegal dumping.",
  },
];

export default function AsbestosModule5Section2() {
  useSEO({
    title:
      "Decontamination & Waste Disposal | Asbestos Awareness Module 5.2",
    description:
      "Personal decontamination procedures, area clearance, asbestos waste classification, double-bagging, consignment notes, licensed waste carriers, and tool decontamination.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-500/30 mb-4">
            <Trash2 className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Decontamination &amp; Waste Disposal
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Personal decontamination, area clearance, waste classification,
            double-bagging, consignment notes, and the legal requirements for
            safe disposal
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RPE last:</strong> Always the final item removed
                during decontamination
              </li>
              <li>
                <strong>Double-bag:</strong> Red inner bag + clear outer bag
                with warning stripe
              </li>
              <li>
                <strong>Hazardous waste:</strong> Consignment notes, licensed
                carriers, licensed landfill
              </li>
              <li>
                <strong>Fly-tipping:</strong> Unlimited fine + up to 5 years
                imprisonment
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Decontaminate:</strong> Worker first, then tools,
                then area
              </li>
              <li>
                <strong>Bag waste:</strong> No more than 2/3 full, goose-neck
                seal
              </li>
              <li>
                <strong>Never mix:</strong> Asbestos waste with general waste
                &mdash; it&rsquo;s an offence
              </li>
              <li>
                <strong>Keep records:</strong> Consignment notes for at least
                3 years
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the 7-step personal decontamination sequence and explain why RPE is removed last",
              "Explain the 4-stage clearance procedure for licensed asbestos removal work",
              "Classify asbestos waste using European Waste Catalogue (EWC) codes",
              "Demonstrate the correct double-bagging and sealing procedure for asbestos waste",
              "Complete hazardous waste consignment notes and explain the record-keeping requirements",
              "Identify the legal requirements for licensed waste carriers and hazardous waste disposal",
              "Describe how to decontaminate tools and equipment after asbestos work",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Personal Decontamination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            Personal Decontamination
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Decontamination of the worker is <strong>critical</strong> to
                prevent continued exposure and secondary contamination. Every
                person who has been working in an area where asbestos fibres may
                have been released must follow a strict decontamination
                procedure before leaving the work area.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  7-Step Personal Decontamination Sequence
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Damp-Wipe the Suit
                      </p>
                      <p>
                        Using damp disposable cloths, wipe down the entire
                        surface of the coverall to remove loose fibres and dust
                        before removal begins.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Remove Boot Covers
                      </p>
                      <p>
                        Peel off boot covers carefully, rolling them inwards to
                        contain any contamination on the outer surface.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Remove Outer Gloves
                      </p>
                      <p>
                        Peel off the outer pair of gloves, turning them
                        inside-out as they are removed to trap contamination.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Peel Off Coverall Inside-Out
                      </p>
                      <p>
                        Unzip the coverall and peel it off by rolling it
                        downwards and inside-out, so the contaminated outer
                        surface is folded inwards. Do not pull it over your
                        head.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-red-400 font-medium">Remove RPE</p>
                      <p>
                        <strong className="text-white">
                          RPE is ALWAYS the last item of protection to be
                          removed.
                        </strong>{" "}
                        This ensures you continue breathing filtered air whilst
                        all other contaminated items are being taken off.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Remove Inner Gloves
                      </p>
                      <p>
                        Finally, remove the inner pair of gloves, turning them
                        inside-out.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Bag All Waste
                      </p>
                      <p>
                        Place all removed PPE into a red asbestos waste bag
                        immediately. Do not leave contaminated items lying
                        around.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Reminders
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Never take contaminated work clothes home
                      </strong>{" "}
                      &mdash; they must be bagged and disposed of as asbestos
                      waste, or laundered by a specialist laundry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Do not eat, drink, or smoke in contaminated areas
                      </strong>{" "}
                      &mdash; ingestion of asbestos fibres is a route of
                      exposure
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">After PPE Removal:</strong>{" "}
                  Wash hands, arms, and face thoroughly with soap and water.
                  Shower as soon as practicable &mdash; for licensed work, an
                  on-site shower facility must be provided as part of the
                  decontamination unit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Area Decontamination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            Area Decontamination
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                All surfaces in the work area must be{" "}
                <strong>decontaminated</strong> after asbestos work is complete.
                The goal is to remove all traces of asbestos debris and dust so
                that the area is safe for reoccupation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Area Decontamination Steps
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Damp-wipe</strong> all
                      accessible surfaces with disposable cloths &mdash; floors,
                      walls, ledges, window sills, and all equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        HEPA vacuum (Type H)
                      </strong>{" "}
                      all surfaces thoroughly &mdash; a standard domestic or
                      commercial vacuum must NEVER be used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visual inspection:</strong>{" "}
                      no visible debris, dust, or residue should remain on any
                      surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      The area must{" "}
                      <strong className="text-white">
                        not be reoccupied
                      </strong>{" "}
                      until clearance is given
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  4-Stage Clearance Procedure (Licensed Work)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  For <strong className="text-white">licensed asbestos removal work</strong>,
                  a formal 4-stage clearance procedure must be completed before
                  the area can be reoccupied:
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p>
                      <strong className="text-white">
                        Preliminary check by the supervisor
                      </strong>{" "}
                      &mdash; visual inspection to confirm all visible ACMs have
                      been removed and the area has been cleaned
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p>
                      <strong className="text-white">
                        Thorough visual inspection by an independent analyst
                      </strong>{" "}
                      &mdash; a qualified analyst checks the area is free of all
                      visible debris, dust, and contamination
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p>
                      <strong className="text-white">
                        Air monitoring (clearance air test)
                      </strong>{" "}
                      &mdash; must achieve less than{" "}
                      <strong className="text-orange-400">
                        0.01 fibres/cm&sup3;
                      </strong>{" "}
                      (ten times lower than the workplace control limit)
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p>
                      <strong className="text-white">
                        Site clearance certificate issued
                      </strong>{" "}
                      &mdash; the certificate of reoccupation confirms the area
                      is safe and work enclosures can be dismantled
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Area Not Clear Until Certified
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The work area must{" "}
                  <strong className="text-white">
                    not be reoccupied until clearance is formally given
                  </strong>
                  . For licensed work, this means the 4-stage clearance
                  procedure must be completed and a site clearance certificate
                  issued. For non-licensed work, a thorough visual inspection
                  and clean must be completed and documented before anyone
                  re-enters the area.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Styled-Div Diagram: Waste Packaging */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">
              &mdash;
            </span>
            Waste Packaging &mdash; Layers of Containment
          </h2>
          <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[300px] max-w-lg mx-auto space-y-3">
              {/* Outer Layer: Rigid Container */}
              <div className="border-2 border-white/40 rounded-lg bg-[#2a2a2a] p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs sm:text-sm font-medium text-white/80">
                    Layer 3: Rigid Container
                  </p>
                  <span className="text-[9px] sm:text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded">
                    Labelled skip or lockable container
                  </span>
                </div>

                {/* Label for rigid container */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Waste carrier licence number
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Destination site
                  </span>
                </div>

                {/* Middle Layer: Clear Outer Bag */}
                <div
                  className="border-2 border-dashed rounded-lg p-3 sm:p-4"
                  style={{
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    background:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239, 68, 68, 0.05) 10px, rgba(239, 68, 68, 0.05) 20px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs sm:text-sm font-medium text-white/80">
                      Layer 2: Outer Bag
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded">
                      Clear polythene + red warning stripe
                    </span>
                  </div>

                  {/* Label for outer bag */}
                  <div className="mb-3">
                    <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      Consignment note number
                    </span>
                  </div>

                  {/* Inner Layer: Red Bag */}
                  <div className="border-2 border-red-500/60 rounded-lg bg-red-500/15 p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm font-medium text-red-400">
                        Layer 1: Inner Bag
                      </p>
                      <span className="text-[9px] sm:text-[10px] text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded">
                        Red polythene (min. 250 gauge)
                      </span>
                    </div>

                    {/* Label for red bag */}
                    <div className="bg-red-500/20 border border-red-500/40 rounded p-2 mb-3">
                      <p className="text-[9px] sm:text-[10px] text-red-300 font-medium text-centre leading-relaxed">
                        DANGER &mdash; Contains asbestos. Breathing asbestos
                        dust is dangerous to health. Follow safety instructions.
                      </p>
                    </div>

                    {/* Centre: Asbestos Waste */}
                    <div className="border border-white/20 rounded bg-white/5 p-3 text-centre">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Trash2 className="h-4 w-4 text-white/40" />
                        <p className="text-sm font-medium text-white/60">
                          Asbestos Waste
                        </p>
                      </div>
                      <p className="text-[10px] text-white/40">
                        ACMs, contaminated PPE, cleaning cloths, vacuum bags
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hazardous Waste Note */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-centre">
                <p className="text-xs sm:text-sm font-medium text-red-400">
                  All asbestos waste is classified as{" "}
                  <strong>HAZARDOUS WASTE</strong> &mdash; special disposal
                  requirements apply
                </p>
              </div>

              {/* Sealing Method Note */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-white/80">
                  <strong className="text-orange-400">Sealing method:</strong>{" "}
                  Both inner and outer bags sealed with a{" "}
                  <strong className="text-white">
                    goose-neck twist and tape
                  </strong>{" "}
                  &mdash; creating an airtight seal. Bags filled to no more than
                  2/3 capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Waste Classification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Waste Classification
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                All asbestos waste is classified as{" "}
                <strong>hazardous waste</strong> (previously referred to as
                &ldquo;special waste&rdquo;). This classification carries
                specific legal requirements for packaging, documentation,
                transport, and disposal that go beyond those for ordinary
                construction waste.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  European Waste Catalogue (EWC) Codes
                </p>
                <div className="space-y-3">
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-400 font-mono font-bold text-sm mt-0.5 flex-shrink-0">
                        17 06 01
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Insulation Materials Containing Asbestos
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Pipe lagging, sprayed coatings, loose-fill insulation,
                          AIB panels
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-400 font-mono font-bold text-sm mt-0.5 flex-shrink-0">
                        17 06 05
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Construction Materials Containing Asbestos
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Asbestos cement products &mdash; roof sheets,
                          guttering, flue pipes, cladding
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Hazardous Waste Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Consignment notes</strong>{" "}
                      must accompany every load of asbestos waste
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-notification</strong>{" "}
                      to the Environment Agency before the first consignment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Use of{" "}
                      <strong className="text-white">
                        registered waste carriers
                      </strong>{" "}
                      only
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Disposal at{" "}
                      <strong className="text-white">
                        licensed hazardous waste landfill sites
                      </strong>{" "}
                      only
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Mixing Is a Criminal Offence
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Mixing asbestos waste with general waste is a criminal
                    offence.
                  </strong>{" "}
                  If asbestos waste is mixed with general construction waste, the
                  entire load becomes classified as hazardous waste. The person
                  responsible faces prosecution, an unlimited fine, and
                  potentially imprisonment. Always segregate asbestos waste
                  completely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Double-Bagging Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            Double-Bagging Procedure
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                All asbestos waste must be <strong>double-bagged</strong> using
                the correct materials and sealing method. The double-bag system
                provides two independent layers of containment to prevent fibre
                release during handling, storage, and transport.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Inner Bag Specification
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Red polythene asbestos waste sack
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Minimum{" "}
                      <strong className="text-white">250 gauge</strong>{" "}
                      thickness (standard waste)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Minimum{" "}
                      <strong className="text-white">1000 gauge</strong> for
                      sharp or abrasive materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Filled to{" "}
                      <strong className="text-white">
                        no more than 2/3 full
                      </strong>{" "}
                      to allow secure sealing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Sealed with a{" "}
                      <strong className="text-white">
                        goose-neck twist and tape
                      </strong>{" "}
                      (creating an airtight seal)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Outer Bag Specification
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clear polythene with red asbestos warning stripe
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Printed with the prescribed{" "}
                      <strong className="text-white">
                        danger warning text
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Sealed in the{" "}
                      <strong className="text-white">same manner</strong>{" "}
                      (goose-neck twist and tape)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-2">
                  Rigid Materials
                </p>
                <p className="text-sm text-white/80">
                  Rigid materials such as asbestos cement sheets and boards
                  cannot always fit inside standard waste bags. These must be{" "}
                  <strong className="text-white">
                    wrapped in polythene and sealed
                  </strong>
                  , or placed in{" "}
                  <strong className="text-white">rigid containers</strong>{" "}
                  designed for the purpose. All wrapping must carry the standard
                  asbestos warning labels.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Items That Must Be Bagged as Asbestos Waste
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Asbestos-containing materials removed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Contaminated PPE (coveralls, gloves, boots)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Disposable cleaning cloths</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Type H vacuum bags and filters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Polythene sheeting from enclosures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Disposable tools used during the work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Consignment Notes and Documentation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Consignment Notes &amp; Documentation
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>hazardous waste consignment note</strong> must
                accompany every load of asbestos waste from the point of
                collection to the point of disposal. This legal document creates
                a complete audit trail showing where the waste came from, who
                transported it, and where it ended up.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  What the Consignment Note Records
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Waste producer</strong>{" "}
                      &mdash; name, address, and premises code
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Waste description</strong>{" "}
                      &mdash; type of asbestos waste
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">EWC code</strong> &mdash;
                      17 06 01 or 17 06 05
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Quantity</strong> &mdash;
                      weight or volume of waste
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Waste carrier details
                      </strong>{" "}
                      &mdash; name, licence number
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Destination</strong>{" "}
                      &mdash; licensed hazardous waste landfill
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-2">
                  Pre-Notification
                </p>
                <p className="text-sm text-white/80">
                  The waste producer must{" "}
                  <strong className="text-white">
                    notify the Environment Agency
                  </strong>{" "}
                  before the first consignment of hazardous waste is removed
                  from the premises. Sites producing less than 500&nbsp;kg of
                  hazardous waste per year may register as{" "}
                  <strong className="text-white">
                    exempt from pre-notification
                  </strong>
                  , but must still use consignment notes for every load.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Record Keeping
                </p>
                <p className="text-sm text-white/80">
                  Copies of consignment notes must be kept for{" "}
                  <strong className="text-orange-400">
                    at least 3 years
                  </strong>
                  . These records demonstrate legal compliance and provide an
                  audit trail in the event of a regulatory investigation. Many
                  organisations retain them indefinitely as part of their
                  permanent compliance records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Licensed Waste Carriers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            Licensed Waste Carriers
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos waste can{" "}
                <strong>
                  ONLY be transported by a licensed waste carrier
                </strong>
                . The waste carrier licence is issued by the Environment Agency
                in England (SEPA in Scotland, NRW in Wales). It is a legal
                requirement &mdash; not a recommendation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Duty of Care Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      The waste producer has a{" "}
                      <strong className="text-white">
                        legal duty of care
                      </strong>{" "}
                      to check the carrier&rsquo;s licence before handing over
                      any waste
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Waste can only be taken to a{" "}
                      <strong className="text-white">
                        licensed hazardous waste landfill site
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      The carrier must hold a{" "}
                      <strong className="text-white">
                        current, valid licence
                      </strong>{" "}
                      &mdash; check registration numbers online via the
                      Environment Agency public register
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Documents to Obtain and Keep
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      Copy of the waste carrier&rsquo;s{" "}
                      <strong className="text-white">licence</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      Completed{" "}
                      <strong className="text-white">consignment notes</strong>{" "}
                      for every load
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Waste transfer notes
                      </strong>{" "}
                      confirming receipt at the disposal site
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Fly-Tipping &mdash; Severe Criminal Penalties
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Fly-tipping asbestos waste is a serious criminal offence.
                  </strong>{" "}
                  Penalties include an{" "}
                  <strong className="text-white">unlimited fine</strong> and{" "}
                  <strong className="text-white">
                    up to 5 years imprisonment
                  </strong>
                  . In addition to criminal sanctions, the offender is liable
                  for the full cost of clean-up, environmental remediation, and
                  any health consequences. Always use a licensed carrier and a
                  licensed disposal site &mdash; there are no shortcuts with
                  asbestos waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Decontaminating Tools and Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">07</span>
            Decontaminating Tools &amp; Equipment
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                All tools and equipment used during asbestos work must be{" "}
                <strong>thoroughly decontaminated</strong> before leaving the
                work area. Contaminated tools can carry asbestos fibres to other
                locations and expose other workers who handle them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Tool Decontamination Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Damp-wipe or HEPA-vacuum
                      </strong>{" "}
                      all tool surfaces before removing them from the work area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Disposable tools</strong>{" "}
                      should be bagged and disposed of as asbestos waste
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Type H vacuums:</strong>{" "}
                      external surfaces damp-wiped; filters changed (old filters
                      disposed of as asbestos waste)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reusable RPE:</strong>{" "}
                      cleaned according to the manufacturer&rsquo;s
                      instructions; filters replaced and old filters disposed of
                      as asbestos waste
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Items that{" "}
                      <strong className="text-white">
                        cannot be adequately decontaminated
                      </strong>{" "}
                      must be disposed of as asbestos waste
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Principle:</strong> If
                  you cannot be certain that a tool or piece of equipment is
                  completely free of asbestos contamination, it must either be
                  re-cleaned until it is demonstrably clean, or disposed of as
                  asbestos waste. The default position is always to err on the
                  side of caution.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Summary: The Decontamination Sequence
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p>
                      <strong className="text-white">
                        Decontaminate the worker
                      </strong>{" "}
                      &mdash; 7-step sequence, RPE last
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p>
                      <strong className="text-white">
                        Decontaminate tools and equipment
                      </strong>{" "}
                      &mdash; damp-wipe, HEPA vacuum, or dispose
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p>
                      <strong className="text-white">
                        Decontaminate the work area
                      </strong>{" "}
                      &mdash; damp-wipe, HEPA vacuum, visual inspection
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p>
                      <strong className="text-white">
                        Bag and dispose of all waste
                      </strong>{" "}
                      &mdash; double-bagged, consignment notes, licensed carrier
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Accidental Disturbance Procedures
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5-section-3">
              Next: Health Surveillance &amp; Medical Monitoring
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
