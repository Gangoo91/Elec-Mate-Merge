import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "survey-primary-method",
    question: "What is the primary method of identifying asbestos-containing materials in buildings?",
    options: [
      "An asbestos survey carried out by a competent person",
      "Visual inspection by the building owner",
      "Asking the original builder what materials were used",
      "Testing the air quality in each room"
    ],
    correctIndex: 0,
    explanation: "Asbestos surveys carried out by competent persons (ideally from UKAS-accredited organisations) are the primary and most reliable method of identifying ACMs in buildings. Visual inspection alone cannot confirm the presence of asbestos — laboratory analysis of samples is required."
  },
  {
    id: "management-survey-purpose",
    question: "What is the main purpose of a management survey?",
    options: [
      "To locate ACMs and assess their condition so they can be managed during normal occupation",
      "To remove all asbestos from the building before demolition",
      "To find every single ACM including those hidden behind walls and in voids",
      "To certify that a building is completely free of asbestos"
    ],
    correctIndex: 0,
    explanation: "A management survey (formerly Type 2) is designed to locate ACMs that could be disturbed during normal occupation, including routine maintenance. It assesses their condition and provides the information needed to manage them safely. It does NOT involve destructive inspection of hidden areas."
  },
  {
    id: "r-and-d-survey-timing",
    question: "When must a refurbishment and demolition survey be completed?",
    options: [
      "Before any work that will disturb the building fabric begins",
      "During the refurbishment work as each area is opened up",
      "After the refurbishment is finished, to check what was found",
      "Only if the management survey found asbestos in the building"
    ],
    correctIndex: 0,
    explanation: "A refurbishment and demolition survey MUST be completed before any work that will disturb the building fabric begins. It cannot be done progressively during the work. The survey is fully intrusive and may require the building or area to be vacated."
  }
];

const faqs = [
  {
    question: "Can a management survey and a refurbishment and demolition survey be combined?",
    answer: "Yes, in some cases. If a management survey is being carried out for the first time and refurbishment work is also planned, the surveyor can combine elements of both surveys. However, the refurbishment and demolition survey component must still be fully intrusive in the areas where work is planned, and the report must clearly distinguish between the two types of assessment. In practice, the two surveys often serve different purposes at different times — the management survey is an ongoing requirement, whilst the refurbishment and demolition survey is a one-off exercise before specific work."
  },
  {
    question: "What happens if areas of the building could not be accessed during the survey?",
    answer: "The survey report must clearly state all areas that were not accessed, sampled, or inspected, along with the reasons why. Under Regulation 4 of the Control of Asbestos Regulations 2012, if materials have not been sampled and analysed, they must be presumed to contain asbestos until proven otherwise. The dutyholder must ensure that these areas are surveyed before any work disturbs them, or manage them on the assumption that asbestos is present."
  },
  {
    question: "How often should a management survey be updated or re-inspected?",
    answer: "There is no fixed legal interval, but HSE guidance recommends that the condition of identified ACMs should be re-assessed at regular intervals — typically annually. The survey should also be updated whenever changes are made to the building, when ACMs are removed or encapsulated, or when new areas are accessed that were not included in the original survey. The asbestos register must be kept as a living document that reflects the current state of the building."
  },
  {
    question: "Who is responsible for commissioning an asbestos survey?",
    answer: "The dutyholder — the person or organisation with the duty to manage asbestos under Regulation 4 of CAR 2012. This is typically the building owner, landlord, managing agent, or the person responsible for maintenance and repair of the premises. For refurbishment and demolition surveys, the client under the Construction (Design and Management) Regulations 2015 (CDM 2015) has a duty to provide pre-construction information, which includes the results of asbestos surveys. The dutyholder must ensure they use competent surveyors, ideally from UKAS-accredited organisations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the authoritative HSE guidance document on asbestos surveys?",
    options: [
      "HSG248 — Asbestos: The analysts' guide",
      "HSG264 — Asbestos: The survey guide",
      "L143 — Managing and working with asbestos",
      "INDG223 — A short guide to managing asbestos"
    ],
    correctAnswer: 1,
    explanation: "HSG264 'Asbestos: The survey guide' is the authoritative HSE guidance on how asbestos surveys should be carried out. It replaced the earlier MDHS100 guidance and provides detailed requirements for both management surveys and refurbishment and demolition surveys."
  },
  {
    id: 2,
    question: "What was a management survey previously known as?",
    options: [
      "Type 1 survey",
      "Type 2 survey",
      "Type 3 survey",
      "Preliminary survey"
    ],
    correctAnswer: 1,
    explanation: "A management survey was previously known as a Type 2 survey. The terminology was updated by HSG264 to make the purpose of each survey type clearer. A Type 2 survey is now called a management survey, and a Type 3 survey is now called a refurbishment and demolition survey."
  },
  {
    id: 3,
    question: "Which of the following is a key limitation of a management survey?",
    options: [
      "It does not cover hidden or inaccessible areas unless specifically instructed",
      "It can only be carried out in domestic properties",
      "It does not involve any sampling of materials",
      "It is only valid for six months after completion"
    ],
    correctAnswer: 0,
    explanation: "A management survey does NOT look behind walls, above ceilings without access, or in hidden voids unless specifically instructed. It covers accessible areas and surface materials. This is a key limitation — any areas not surveyed must be presumed to contain asbestos until proven otherwise."
  },
  {
    id: 4,
    question: "What accreditation standard does the HSE recommend for asbestos surveying organisations?",
    options: [
      "ISO 9001 for quality management",
      "ISO 14001 for environmental management",
      "UKAS accreditation to ISO 17020 or ISO 17025",
      "CHAS accreditation for health and safety"
    ],
    correctAnswer: 2,
    explanation: "The HSE recommends using surveyors from UKAS-accredited organisations. UKAS accreditation to ISO 17020 applies to inspection bodies (surveyors), whilst ISO 17025 applies to testing laboratories (analysts). This accreditation provides assurance that the organisation operates to recognised standards of competence."
  },
  {
    id: 5,
    question: "A refurbishment and demolition survey is fully intrusive. What does this mean in practice?",
    options: [
      "The surveyor asks detailed questions about the building's history",
      "The surveyor may need to open up walls, lift floors, and access voids to find ALL ACMs",
      "The surveyor uses thermal imaging cameras to detect hidden materials",
      "The surveyor inspects only the areas that are easily accessible"
    ],
    correctAnswer: 1,
    explanation: "A fully intrusive survey means the surveyor may need to carry out destructive inspection — opening up walls, lifting floors, removing ceiling panels, and accessing voids — to locate ALL asbestos-containing materials in the work area. This is why the building or area may need to be vacated during the survey."
  },
  {
    id: 6,
    question: "Can a refurbishment and demolition survey be carried out progressively as work proceeds?",
    options: [
      "Yes — it is common practice to survey each area as it is opened up",
      "Yes — but only if a management survey has already been completed",
      "No — it must be completed before any work that will disturb the building fabric begins",
      "No — but the contractor can presume asbestos is present and work accordingly"
    ],
    correctAnswer: 2,
    explanation: "A refurbishment and demolition survey MUST be completed before any work that will disturb the building fabric begins. It cannot be done progressively during the work. This is a fundamental requirement — all ACMs must be identified and, where necessary, removed before refurbishment or demolition commences."
  },
  {
    id: 7,
    question: "What qualification does the HSE recommend asbestos surveyors hold?",
    options: [
      "NEBOSH National General Certificate",
      "BOHS P402 — Building Surveys and Bulk Sampling for Asbestos",
      "CITB Site Safety Plus",
      "IOSH Managing Safely"
    ],
    correctAnswer: 1,
    explanation: "The HSE recommends that asbestos surveyors hold the BOHS P402 qualification — Building Surveys and Bulk Sampling for Asbestos. This is a specialist qualification that covers survey methodology, sampling techniques, risk assessment, and report writing specific to asbestos surveys."
  },
  {
    id: 8,
    question: "What must the dutyholder do if a survey report states that certain areas were not accessed?",
    options: [
      "Nothing — the survey is still valid for the areas that were covered",
      "Presume that those areas contain asbestos until they are surveyed or sampled",
      "Arrange for the areas to be demolished so they can be inspected",
      "Ask the building's original architect for the construction details"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 4 of CAR 2012, if materials have not been sampled and analysed, the dutyholder must presume they contain asbestos until proven otherwise. Any areas not accessed during the survey must be managed on this presumption, and the dutyholder should arrange for them to be surveyed before any work disturbs them."
  }
];

export default function AsbestosModule2Section3() {
  useSEO({
    title: "Asbestos Surveys | Asbestos Awareness Module 2.3",
    description: "Management surveys and refurbishment & demolition surveys — when each is required, what they cover, surveyor qualifications, limitations, and what happens after the survey.",
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
            <Link to="../asbestos-awareness-module-2">
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
            <ClipboardCheck className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Asbestos Surveys
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How asbestos-containing materials are found, assessed, and recorded &mdash; the two survey types every tradesperson must understand
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> Systematic inspections to find asbestos-containing materials</li>
              <li><strong>Two types:</strong> Management survey &amp; refurbishment/demolition survey</li>
              <li><strong>Who:</strong> Competent surveyors from UKAS-accredited organisations</li>
              <li><strong>Guidance:</strong> HSG264 &mdash; Asbestos: The survey guide</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before routine work:</strong> A management survey must be in place</li>
              <li><strong>Before refurb/demolition:</strong> A R&amp;D survey is mandatory</li>
              <li><strong>No survey?</strong> Presume materials contain asbestos</li>
              <li><strong>Always check:</strong> The asbestos register before starting any work</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why asbestos surveys are needed and when they are required",
              "Describe the purpose, scope, and method of a management survey",
              "Describe the purpose, scope, and method of a refurbishment and demolition survey",
              "Identify the key differences between the two survey types",
              "Understand surveyor qualifications, competence, and UKAS accreditation",
              "Explain what happens after a survey and how results feed into the asbestos register"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Surveys Are Needed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            Why Surveys Are Needed
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos surveys are the <strong>primary method of identifying asbestos-containing
                materials (ACMs)</strong> in buildings. Without a survey, the dutyholder and anyone
                working in or on the building has no reliable way of knowing what materials contain
                asbestos and where those materials are located. This lack of information creates a
                serious risk to health every time maintenance, refurbishment, or demolition work is
                carried out.
              </p>

              <p>
                The legal requirement for surveys arises from two main pieces of legislation:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regulation 4 of the Control of Asbestos Regulations 2012 (CAR 2012)</strong> &mdash;
                      the &ldquo;Duty to Manage&rdquo; requires the dutyholder to take reasonable steps to find
                      out whether a building contains ACMs. Commissioning an asbestos survey is the primary way
                      of fulfilling this duty. If a survey has not been carried out, the dutyholder must
                      <strong> presume that materials contain asbestos</strong> until proven otherwise.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">The Construction (Design and Management) Regulations 2015 (CDM 2015)</strong> &mdash;
                      before any refurbishment or demolition work, the client must provide pre-construction
                      information that includes details of any ACMs present. A refurbishment and demolition
                      survey is the standard method of obtaining this information.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Surveys should be carried out by <strong>competent persons</strong>. The HSE strongly
                recommends using surveyors from <strong>UKAS-accredited surveying organisations</strong>,
                as this provides assurance that the surveyor has the necessary training, experience,
                equipment, and quality management systems in place.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Guidance:</strong> The authoritative HSE
                  guidance on asbestos surveys is <strong>HSG264 &ldquo;Asbestos: The survey
                  guide&rdquo;</strong>. This document sets out the standards for both management
                  surveys and refurbishment and demolition surveys. It replaced the earlier MDHS100
                  guidance and should be followed by all surveyors and dutyholders.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Without a survey, the dutyholder must <strong>presume that materials contain
                  asbestos</strong>. This presumption applies to all suspect materials in all areas
                  of the building. In practice, this means that no maintenance, refurbishment, or
                  demolition work should be carried out on any material that has not been surveyed
                  or sampled, unless it is treated as if it contains asbestos with all the
                  associated precautions and controls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Management Survey (formerly Type 2) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            Management Survey (Formerly Type 2)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The management survey is the <strong>standard survey</strong> for all non-domestic
                premises. Its purpose is to <strong>locate asbestos-containing materials that could be
                disturbed or damaged during normal occupation</strong>, including routine maintenance
                work, and to assess their condition so they can be managed safely over time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Management Survey &mdash; Key Features</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Purpose:</strong> Locate ACMs and assess their condition so they can be managed during normal occupation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Scope:</strong> Covers the entire building or specific areas as agreed with the dutyholder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Method:</strong> Visual inspection combined with sampling of suspected ACMs for laboratory analysis. Where sampling is not possible or practical, materials may be <strong>presumed</strong> to contain asbestos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">When required:</strong> For all non-domestic premises where the dutyholder has a duty to manage asbestos. Should be in place before any routine maintenance work is carried out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">What it covers:</strong> Accessible areas, surface materials, and materials that can be reached without destructive investigation &mdash; such as lifting ceiling tiles, opening inspection hatches, and entering service risers</span>
                  </li>
                </ul>
              </div>

              <p>
                The management survey is designed to be <strong>non-destructive</strong>. The surveyor
                will inspect all accessible areas and take representative samples of materials that
                are suspected of containing asbestos. These samples are sent to an accredited
                laboratory for analysis. The survey report will list all ACMs found (or presumed),
                their location, condition, and a risk rating based on a material assessment.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important Limitation</p>
                </div>
                <p className="text-sm text-white/80">
                  A management survey does <strong>NOT</strong> look behind walls, above ceilings
                  without access, or in hidden voids unless specifically instructed to do so. It is
                  not designed to find every single ACM in the building &mdash; only those that are
                  accessible and could be disturbed during normal occupation and maintenance. Any
                  areas not accessed must be clearly recorded in the survey report, and the materials
                  in those areas must be presumed to contain asbestos.
                </p>
              </div>

              <p>
                The condition of identified ACMs should be <strong>re-assessed at regular
                intervals</strong> &mdash; typically annually &mdash; to ensure that any deterioration
                or damage is identified promptly and appropriate action is taken. The management
                survey is not a one-off exercise; it forms the basis of an ongoing management process.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Refurbishment & Demolition Survey (formerly Type 3) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Refurbishment &amp; Demolition Survey (Formerly Type 3)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The refurbishment and demolition (R&amp;D) survey is a <strong>fully intrusive
                survey</strong> designed to locate <strong>ALL asbestos-containing materials</strong> in
                the area where work will take place. Unlike the management survey, which only covers
                accessible areas, the R&amp;D survey involves opening up the building structure to find
                hidden ACMs that would be disturbed by the planned work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Refurbishment &amp; Demolition Survey &mdash; Key Features</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Purpose:</strong> Locate ALL ACMs in the area where refurbishment or demolition work will take place, including hidden materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Scope:</strong> The specific area where refurbishment or demolition is planned &mdash; not necessarily the entire building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Method:</strong> Fully intrusive &mdash; may involve destructive inspection such as opening up walls, lifting floors, removing ceiling panels, and accessing voids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">When required:</strong> BEFORE any work that will disturb the building fabric &mdash; refurbishment, demolition, or major maintenance work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">What it covers:</strong> All materials in the work area, including hidden and difficult-to-access materials in walls, floors, ceilings, voids, and service risers</span>
                  </li>
                </ul>
              </div>

              <p>
                Because the survey is fully intrusive and may involve significant disruption, the
                <strong> building or the specific area being surveyed may need to be vacated</strong> during
                the survey. This is to protect the health of building occupants and to allow the
                surveyor to carry out destructive inspection safely.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  A refurbishment and demolition survey <strong>MUST be completed before work
                  begins</strong>. It <strong>cannot</strong> be done progressively during the work.
                  All ACMs in the work area must be identified before the refurbishment or demolition
                  contractor starts work, so that appropriate arrangements can be made for removal or
                  management of the asbestos before the main work commences.
                </p>
              </div>

              <p>
                The outcome of the R&amp;D survey is a <strong>comprehensive list of ALL ACMs</strong> in
                the work area, with their exact locations, types, and quantities. This information is
                used to plan the asbestos removal work that must take place before the refurbishment
                or demolition can proceed. The survey provides critical information for the
                refurbishment/demolition contractor, the asbestos removal contractor, and the
                project manager.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Survey Type Comparison Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">&mdash;</span>
            Survey Type Comparison
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Management Survey Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500/30 to-orange-400/20 border-b border-orange-500/30 px-4 py-3">
                <p className="text-orange-400 font-semibold text-base">Management Survey</p>
                <p className="text-white/60 text-xs">Formerly Type 2</p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Purpose</p>
                  <p className="text-white/80">Manage ACMs during normal occupation</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Scope</p>
                  <p className="text-white/80">Whole building or specified areas</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Method</p>
                  <p className="text-white/80">Visual + sampling (non-destructive)</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">When</p>
                  <p className="text-white/80">Before occupation / routine maintenance</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Invasiveness</p>
                  <p className="text-white/80">Minimal &mdash; no destructive inspection</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Building Status</p>
                  <p className="text-white/80">Occupied during survey</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Outcome</p>
                  <p className="text-white/80">Register of ACMs with condition ratings</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Re-inspection</p>
                  <p className="text-white/80">Typically annual</p>
                </div>
              </div>
            </div>

            {/* Refurbishment & Demolition Survey Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500/30 to-red-500/20 border-b border-orange-500/30 px-4 py-3">
                <p className="text-orange-400 font-semibold text-base">Refurbishment &amp; Demolition Survey</p>
                <p className="text-white/60 text-xs">Formerly Type 3</p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Purpose</p>
                  <p className="text-white/80">Find ALL ACMs before work starts</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Scope</p>
                  <p className="text-white/80">Specific area of planned work</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Method</p>
                  <p className="text-white/80">Fully intrusive / destructive</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">When</p>
                  <p className="text-white/80">Before refurbishment or demolition</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Invasiveness</p>
                  <p className="text-white/80">High &mdash; opens up structure</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Building Status</p>
                  <p className="text-white/80">May need vacating</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Outcome</p>
                  <p className="text-white/80">Complete ACM inventory for work area</p>
                </div>
                <div>
                  <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Re-inspection</p>
                  <p className="text-white/80">Not applicable (one-off)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint for mobile */}
          <p className="text-center text-white/40 text-xs mt-3 md:hidden">
            Scroll down to compare both survey types
          </p>
        </section>

        {/* Section 04: Surveyor Qualifications and Competence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            Surveyor Qualifications &amp; Competence
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The reliability of an asbestos survey depends entirely on the competence of the person
                carrying it out. A survey performed by someone who lacks the necessary training,
                knowledge, or experience could miss ACMs, leading to workers being unknowingly exposed
                to asbestos fibres. For this reason, the law requires that surveys are carried out by
                <strong> competent persons</strong>.
              </p>

              <p>
                Competence in this context means having the right combination of <strong>training,
                knowledge, experience, and practical ability</strong> to carry out the specific type
                of survey being undertaken. A surveyor must understand asbestos materials, their
                appearance, their typical locations in different types of buildings, and the correct
                sampling and assessment techniques.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">What to Look for in a Competent Surveyor</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">UKAS accreditation</strong> &mdash; the HSE strongly
                      recommends using surveyors from UKAS-accredited organisations. UKAS accreditation
                      to <strong>ISO 17020</strong> applies to inspection bodies (surveyors), whilst
                      <strong> ISO 17025</strong> applies to testing laboratories (analysts who examine the
                      samples taken during the survey).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Relevant qualifications</strong> &mdash; the
                      surveyor should hold the <strong>BOHS P402</strong> qualification (Building Surveys
                      and Bulk Sampling for Asbestos), which is the recognised industry standard for
                      asbestos surveyors. Additional qualifications may include BOHS P401 (Identification
                      of Asbestos in Bulk Samples) and BOHS P403 (Asbestos in Soils).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Appropriate insurance</strong> &mdash; surveyors
                      must carry professional indemnity insurance and public liability insurance. This
                      protects the client in the event that the survey is negligently carried out and
                      ACMs are missed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Experience and track record</strong> &mdash; the
                      surveyor should have demonstrable experience in surveying the type of building
                      being assessed. Experience with a range of building types and ages is particularly
                      valuable.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Duty to Check:</strong> The dutyholder has a
                  responsibility to verify the credentials of the surveyor they appoint. This means
                  checking UKAS accreditation status, asking for evidence of qualifications, and
                  confirming that appropriate insurance is in place. Simply instructing the cheapest
                  available surveyor without checking their competence does not discharge the
                  dutyholder&rsquo;s legal obligations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Survey Limitations and Caveats */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Survey Limitations &amp; Caveats
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is essential to understand that <strong>no survey can guarantee 100% identification
                of all asbestos-containing materials</strong> in a building. Even the most thorough
                and competent survey has inherent limitations, and these must be understood by the
                dutyholder and anyone relying on the survey findings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Key Limitations to Understand</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Management surveys do not cover hidden areas</strong> &mdash;
                      they are limited to accessible locations and materials that can be reached without
                      destructive investigation. ACMs in walls, behind fixed panels, under floors, and in
                      sealed voids will not be identified unless a refurbishment and demolition survey is
                      carried out.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Survey reports should clearly state limitations</strong> &mdash;
                      any areas not accessed, materials not sampled, and reasons for exclusions must be
                      documented in the report. The dutyholder must read and understand these caveats.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Presumed materials</strong> &mdash; where areas were
                      not surveyed or materials were not sampled, they must be <strong>presumed to contain
                      asbestos</strong> until they are properly analysed. This presumption has practical
                      consequences for anyone working on or near those materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Post-survey changes</strong> &mdash; any changes to
                      the building after the survey may introduce new ACMs (for example, from
                      reclaimed materials) or disturb existing ones. The survey reflects the condition
                      of the building at the time it was carried out and must be kept up to date.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Ongoing Responsibility</p>
                </div>
                <p className="text-sm text-white/80">
                  The dutyholder must keep the survey <strong>up to date</strong> and commission new
                  surveys when needed. A survey is not a one-off document that can be filed away and
                  forgotten. The asbestos register must be maintained as a <strong>living
                  document</strong> that reflects the current state of the building. If new areas are
                  opened up, if ACMs are removed or encapsulated, or if the building undergoes
                  significant changes, the survey must be updated accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: What Happens After the Survey */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            What Happens After the Survey
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Completing the survey is only the beginning of the asbestos management process. The
                survey produces the raw information needed to manage ACMs, but that information must
                be acted upon through a series of structured steps.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">After the Survey &mdash; Step by Step</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Survey Report Issued</p>
                      <p>The surveyor provides a detailed report listing all ACMs found (or presumed), their location, type, condition, and extent. The report will include floor plans showing ACM locations and photographs where appropriate.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Results Feed Into the Asbestos Register</p>
                      <p>The survey findings form the basis of the asbestos register &mdash; the central record of all known and presumed ACMs in the building. The register is covered in detail in the next section.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Material and Priority Assessment</p>
                      <p>Each ACM is assessed for both its current condition (material assessment) and the likelihood that it will be disturbed (priority assessment). Together, these determine what management action is needed &mdash; from simple monitoring through to urgent removal.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Management Plan Developed</p>
                      <p>Based on the survey findings and risk assessments, a written management plan is produced. This sets out how each ACM will be managed &mdash; whether it will be left in situ and monitored, encapsulated, sealed, labelled, or removed.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Information Communicated</p>
                      <p>The location and condition of ACMs must be communicated to all relevant parties &mdash; building managers, maintenance staff, contractors, and anyone else who may work in or on the building. This is typically done by making the asbestos register available and providing information at the point of work.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-white font-medium">Re-inspection Schedule Established</p>
                      <p>A schedule for periodic re-inspection of ACMs is set up &mdash; typically annually. The purpose is to monitor the condition of ACMs over time and identify any deterioration or damage that requires action.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">7</span>
                    <div>
                      <p className="text-white font-medium">Urgent Action Where Required</p>
                      <p>If the survey identifies any ACMs in poor condition that pose an immediate risk &mdash; such as damaged sprayed coatings or deteriorating pipe lagging in occupied areas &mdash; urgent action must be taken. This may include restricting access, emergency encapsulation, or immediate removal by a licensed asbestos removal contractor.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Takeaway:</strong> The survey is the
                  foundation of the entire asbestos management process. Without an accurate and
                  up-to-date survey, the dutyholder cannot fulfil their legal obligations under
                  Regulation 4, and anyone working in the building is at risk of unknowing exposure
                  to asbestos fibres. The survey is not a box-ticking exercise &mdash; it is a
                  critical safety document that protects lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
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
            <Link to="../asbestos-awareness-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Duty to Manage
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-4">
              Next: The Asbestos Register
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
