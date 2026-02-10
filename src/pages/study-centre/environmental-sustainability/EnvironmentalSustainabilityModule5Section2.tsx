import {
  ArrowLeft,
  Search,
  CheckCircle,
  AlertTriangle,
  Calendar,
  TreePine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pea-methodology",
    question:
      "Which methodology is the standard approach for classifying habitat types during a Preliminary Ecological Appraisal (PEA)?",
    options: [
      "CIEEM Impact Assessment Guidelines",
      "JNCC Phase 1 Habitat Survey methodology",
      "Natural England Bat Survey Guidelines",
      "British Standard BS 42020",
    ],
    correctIndex: 1,
    explanation:
      "The JNCC (Joint Nature Conservation Committee) Phase 1 Habitat Survey methodology is the standard approach used during a PEA. It provides a standardised system for classifying and mapping habitat types across a site using colour-coded maps and target notes. This allows ecologists to identify areas of ecological value and determine whether further, more detailed species-specific surveys are needed.",
  },
  {
    id: "survey-season-bat",
    question:
      "A planning application requires bat emergence surveys. The project team discovers this requirement in November. What is the earliest they can begin valid emergence surveys?",
    options: [
      "Immediately, as bat surveys can be conducted year-round",
      "January, during the hibernation period",
      "May, at the start of the bat activity season",
      "March, when bats first begin to emerge",
    ],
    correctIndex: 2,
    explanation:
      "Bat emergence and re-entry surveys can only be conducted during the bat activity season, which runs from May to September (with the optimal window being May to August). Bats hibernate during the winter months and are not active at roost sites, so surveys conducted outside the activity season would produce unreliable results. Missing the survey window in one year can delay a project by up to 12 months.",
  },
  {
    id: "mitigation-hierarchy-first",
    question:
      "According to the mitigation hierarchy, what is the FIRST step that must be considered before any other mitigation measure?",
    options: [
      "Offsetting through biodiversity net gain",
      "Minimisation of impacts through careful design",
      "Avoidance of impacts entirely",
      "Rehabilitation and restoration of habitats",
    ],
    correctIndex: 2,
    explanation:
      "Avoidance is always the first and most important step in the mitigation hierarchy. The hierarchy follows a strict order: avoidance, minimisation, rehabilitation/restoration, and finally offsetting. A developer must demonstrate that they have genuinely attempted to avoid ecological impacts before moving down the hierarchy to less preferable options. Offsetting is always the last resort, not the first response.",
  },
];

const faqs = [
  {
    question:
      "Can a developer carry out their own ecological surveys, or must they use a qualified ecologist?",
    answer:
      "Ecological surveys must be carried out by suitably qualified and experienced ecologists. For protected species surveys in particular, the ecologist must hold relevant survey licences (for example, a Natural England bat survey licence to handle or disturb bats). Local planning authorities will not accept survey reports from unqualified individuals, and any attempt to survey protected species without the appropriate licence is a criminal offence. The ecologist should be a member of the Chartered Institute of Ecology and Environmental Management (CIEEM) and should follow CIEEM's code of professional conduct.",
  },
  {
    question:
      "What happens if protected species are discovered during construction works that were not identified in the original surveys?",
    answer:
      "All works in the area must stop immediately. The site manager must contact the project ecologist without delay. If the species is legally protected (such as bats, great crested newts, or nesting birds), continuing work could constitute a criminal offence under the Wildlife and Countryside Act 1981 or the Conservation of Habitats and Species Regulations 2017. The ecologist will assess the situation and advise on whether a licence application to Natural England is required before works can recommence. In some cases, works may need to be postponed until the species has moved on naturally or until a licence is granted.",
  },
  {
    question:
      "How long does a Natural England protected species licence application typically take?",
    answer:
      "Natural England aims to process standard licence applications within 30 working days of receiving a complete application. However, complex applications or those requiring additional information can take significantly longer. During peak seasons (spring and summer), processing times may extend further due to high volumes of applications. It is essential to factor licence application timescales into the project programme well in advance. Submitting an incomplete application or one that fails the three tests will result in rejection and further delays.",
  },
  {
    question:
      "What is biodiversity net gain and how does it relate to ecological surveys?",
    answer:
      "Biodiversity net gain (BNG) is a requirement under the Environment Act 2021 for developments in England to deliver a minimum 10% increase in biodiversity value compared to the pre-development baseline. Ecological surveys are essential to establishing this baseline. A habitat survey using the statutory biodiversity metric calculates the biodiversity units present on site before development. The post-development landscape plan must then demonstrate that the scheme delivers at least 10% more units than the baseline. If this cannot be achieved on site, the developer must secure off-site habitat creation or purchase statutory biodiversity credits.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT a standard component of a Preliminary Ecological Appraisal (PEA)?",
    options: [
      "Desktop study of existing ecological records",
      "Phase 1 habitat survey using JNCC methodology",
      "Detailed bat emergence and re-entry survey counts",
      "Target notes identifying features of ecological interest",
    ],
    correctAnswer: 2,
    explanation:
      "A PEA consists of a desktop study and a Phase 1 habitat survey with target notes. Detailed bat emergence and re-entry surveys are species-specific surveys that may be recommended as a result of a PEA, but they are not part of the PEA itself. The PEA identifies the potential for protected species and recommends further surveys where appropriate.",
  },
  {
    id: 2,
    question:
      "During which months is the optimal window for conducting great crested newt eDNA surveys?",
    options: [
      "January to March",
      "April to June",
      "July to September",
      "October to December",
    ],
    correctAnswer: 1,
    explanation:
      "The optimal window for great crested newt (GCN) eDNA surveys is mid-April to the end of June. During this period, newts are active in breeding ponds and shed sufficient environmental DNA into the water for reliable detection. Samples collected outside this window may produce false negative results because newt activity in ponds is reduced.",
  },
  {
    id: 3,
    question:
      "What are the three tests that must be satisfied for Natural England to grant a protected species licence?",
    options: [
      "Cost-effectiveness, minimal delay, and species abundance",
      "Overriding public interest, no satisfactory alternative, and favourable conservation status maintained",
      "Planning permission, ecological survey, and mitigation plan",
      "Developer agreement, council approval, and public consultation",
    ],
    correctAnswer: 1,
    explanation:
      "The three derogation tests are: (1) the activity must be for a purpose of overriding public interest (e.g., imperative reasons of public health or safety, or beneficial consequences of primary importance for the environment); (2) there must be no satisfactory alternative that would avoid or reduce the impact on the protected species; and (3) the action must not be detrimental to the maintenance of the species population at a favourable conservation status in their natural range.",
  },
  {
    id: 4,
    question:
      "In the CIEEM ecological impact assessment framework, what does 'receptor importance' refer to?",
    options: [
      "The financial value of the habitat to the landowner",
      "The conservation significance of the ecological feature being affected",
      "The sensitivity of nearby human residents to construction noise",
      "The planning authority's priority ranking for the site",
    ],
    correctAnswer: 1,
    explanation:
      "Receptor importance refers to the conservation significance of the ecological feature (habitat, species, or ecosystem) that would be affected by the proposed development. Receptors are assessed on a geographic scale from international importance (e.g., Special Areas of Conservation) down through national, regional, county, and local importance. The significance of an impact is determined by combining the magnitude of the impact with the importance of the receptor.",
  },
  {
    id: 5,
    question:
      "A development site contains a confirmed bat roost. Which step of the mitigation hierarchy should be considered FIRST?",
    options: [
      "Create a new bat roost elsewhere on the site to offset the loss",
      "Redesign the scheme to avoid disturbing the roost entirely",
      "Apply for a licence to destroy the roost during the winter",
      "Install bat boxes on nearby trees as compensation",
    ],
    correctAnswer: 1,
    explanation:
      "Avoidance is always the first step in the mitigation hierarchy. If a bat roost is present, the first consideration must be whether the development can be redesigned to avoid disturbing the roost entirely. Only if avoidance is genuinely not possible should the developer move to minimisation, restoration, and finally offsetting. Natural England will expect to see evidence that avoidance was properly considered before granting a licence for roost disturbance or destruction.",
  },
  {
    id: 6,
    question:
      "What is the primary role of an Ecological Clerk of Works (ECoW) on a construction site?",
    options: [
      "To design the ecological mitigation strategy for the project",
      "To monitor compliance with ecological conditions, licences, and method statements during construction",
      "To carry out the initial ecological surveys before planning is submitted",
      "To issue protected species licences on behalf of Natural England",
    ],
    correctAnswer: 1,
    explanation:
      "The primary role of an ECoW is to be present on site during construction to monitor compliance with ecological planning conditions, protected species licence requirements, and approved method statements. This includes conducting watching briefs during sensitive works, delivering toolbox talks to site workers, responding to ecological incidents, and reporting on compliance to the local planning authority and Natural England.",
  },
  {
    id: 7,
    question:
      "Which type of survey involves placing corrugated metal or roofing felt sheets on the ground to detect reptile populations?",
    options: [
      "Bat emergence survey",
      "Great crested newt bottle trapping",
      "Reptile survey using artificial refugia",
      "Phase 1 habitat survey",
    ],
    correctAnswer: 2,
    explanation:
      "Reptile surveys use artificial refugia (also called artificial cover objects or ACOs), which are typically corrugated metal sheets, roofing felt, or similar materials placed on the ground. Reptiles shelter beneath these refugia for thermoregulation. Surveyors check the refugia at regular intervals during the survey season (typically April to September) to record the species, numbers, and locations of any reptiles found. A minimum of seven survey visits is required for a robust assessment.",
  },
  {
    id: 8,
    question:
      "Under the CIEEM guidelines, which of the following would be classified as an indirect ecological impact?",
    options: [
      "Demolishing a building that contains a bat roost",
      "Removing a hedgerow to widen a road",
      "Increased light spill from a new development affecting foraging behaviour of bats on adjacent land",
      "Clearing a pond to construct building foundations",
    ],
    correctAnswer: 2,
    explanation:
      "An indirect impact is one that is not a direct result of the development but occurs as a secondary consequence. Increased light spill from a new development affecting bat foraging behaviour on adjacent land is indirect because the development itself does not physically affect the bats' habitat, but its operation changes conditions in the surrounding area. The other options (demolishing a roost, removing a hedgerow, clearing a pond) are all direct impacts because they involve the physical destruction or removal of ecological features.",
  },
];

export default function EnvironmentalSustainabilityModule5Section2() {
  useSEO({
    title:
      "Ecological Surveys & Assessments | Environmental & Sustainability Module 5.2",
    description:
      "Preliminary ecological appraisals, species-specific surveys, survey seasons, ecological impact assessment, mitigation hierarchy, protected species licensing, and the Ecological Clerk of Works role.",
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
            <Link to="../environmental-sustainability-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Search className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ecological Surveys &amp; Assessments
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding when ecological surveys are needed, which survey types
            apply, seasonal constraints, impact assessment methods, the
            mitigation hierarchy, species licensing, and the role of the
            Ecological Clerk of Works
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>PEA first:</strong> Desktop study + Phase 1 habitat
                survey before any further work
              </li>
              <li>
                <strong>Seasonal:</strong> Most surveys can only be done at
                specific times of year
              </li>
              <li>
                <strong>Mitigation hierarchy:</strong> Avoid &rarr; minimise
                &rarr; restore &rarr; offset
              </li>
              <li>
                <strong>Three tests:</strong> Public interest, no alternative,
                conservation status
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>ECoW:</strong> Ecological Clerk of Works monitors
                compliance during construction
              </li>
              <li>
                <strong>Toolbox talks:</strong> Site workers briefed on
                ecological constraints
              </li>
              <li>
                <strong>Licence conditions:</strong> Strict adherence to method
                statements required
              </li>
              <li>
                <strong>Stop work:</strong> If protected species found
                unexpectedly, all works halt
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
              "Explain why ecological surveys are required for planning, legal compliance, and informed decision-making",
              "Describe the components of a Preliminary Ecological Appraisal (PEA) including desktop study and Phase 1 habitat survey",
              "Identify the main species-specific surveys (bats, great crested newts, birds, reptiles) and their methodologies",
              "Determine the correct survey seasons for each species group and explain the consequences of missing survey windows",
              "Apply the CIEEM ecological impact assessment framework to characterise and assess significance of impacts",
              "Explain the mitigation hierarchy from avoidance through to offsetting",
              "Describe the Natural England protected species licensing process and the three derogation tests",
              "Define the role and responsibilities of an Ecological Clerk of Works during construction",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Ecological Surveys Are Needed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Why Ecological Surveys Are Needed
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ecological surveys are a{" "}
                <strong>fundamental requirement</strong> of the planning process
                in the United Kingdom. They provide the evidence base upon which
                planning decisions are made, and they are the mechanism by which
                developers demonstrate compliance with environmental
                legislation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Key Reasons for Ecological Surveys
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Planning Requirements
                      </p>
                      <p>
                        The National Planning Policy Framework (NPPF) requires
                        local planning authorities to consider the ecological
                        impact of proposed developments. Applications that do
                        not include adequate ecological information will be
                        refused or deferred until surveys are completed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">Due Diligence</p>
                      <p>
                        Site purchasers and developers have a duty of care to
                        understand the ecological constraints on a site before
                        committing to a development. Failing to identify
                        protected species early can result in costly delays,
                        redesigns, or prosecution.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Legal Compliance
                      </p>
                      <p>
                        The Wildlife and Countryside Act 1981 and the
                        Conservation of Habitats and Species Regulations 2017
                        make it a criminal offence to disturb, injure, or kill
                        protected species or to damage or destroy their habitats
                        without an appropriate licence. Ecological surveys
                        identify where these legal protections apply.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Species Licensing
                      </p>
                      <p>
                        If protected species are found on site, a licence from
                        Natural England (or the relevant devolved body) is
                        required before works that would affect them can
                        proceed. The licence application must be supported by
                        survey data demonstrating the species&rsquo; presence,
                        population size, and usage of the site.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Informed Decision-Making
                      </p>
                      <p>
                        Surveys enable the design team to make informed
                        decisions about site layout, phasing, and mitigation
                        measures. Understanding ecological constraints early
                        allows them to be designed around rather than
                        encountered unexpectedly during construction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key Principle:</strong>{" "}
                  Ecological surveys are not optional extras &mdash; they are a
                  legal and planning requirement. The cost of surveys is
                  negligible compared to the cost of prosecution, project
                  delays, or redesigning a scheme after construction has begun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Preliminary Ecological Appraisal (PEA) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Preliminary Ecological Appraisal (PEA)
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Preliminary Ecological Appraisal is the{" "}
                <strong>first stage</strong> of the ecological assessment
                process. It provides an initial overview of the ecological value
                of a site and identifies where further, more detailed surveys
                may be required. Every development project should begin with a
                PEA.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Component 1: Desktop Study
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The desktop study gathers existing ecological data about the
                  site and its surroundings from available sources:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Local biological records centre
                      </strong>{" "}
                      &mdash; existing records of protected and notable species
                      within a defined search radius (typically 1&ndash;2 km)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Statutory designations
                      </strong>{" "}
                      &mdash; Sites of Special Scientific Interest (SSSIs),
                      Special Areas of Conservation (SACs), Special Protection
                      Areas (SPAs), Ramsar sites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Non-statutory designations
                      </strong>{" "}
                      &mdash; Local Wildlife Sites, Sites of Importance for
                      Nature Conservation (SINCs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Aerial photography and mapping
                      </strong>{" "}
                      &mdash; identifying habitat features, connectivity
                      corridors, waterbodies, and woodland
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Previous survey reports
                      </strong>{" "}
                      &mdash; any existing ecological data for the site from
                      prior applications or assessments
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Component 2: Phase 1 Habitat Survey (JNCC Methodology)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The Phase 1 habitat survey is a{" "}
                  <strong className="text-white">field survey</strong> conducted
                  by a qualified ecologist who walks the entire site and
                  classifies all habitats present:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Uses the{" "}
                      <strong className="text-white">
                        JNCC (Joint Nature Conservation Committee)
                      </strong>{" "}
                      standardised habitat classification system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Habitat types</strong> are
                      mapped using colour-coded categories &mdash; woodland,
                      grassland, scrub, wetland, built environment, etc.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Target notes</strong>{" "}
                      record specific features of ecological interest &mdash;
                      potential bat roost features, badger setts, ponds suitable
                      for great crested newts, veteran trees, invasive species
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      The survey assesses the{" "}
                      <strong className="text-white">
                        potential for protected species
                      </strong>{" "}
                      based on the habitats present and their quality
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  PEA Reporting
                </p>
                <p className="text-sm text-white/80">
                  The PEA report includes a{" "}
                  <strong className="text-white">habitat map</strong>, a
                  description of each habitat type, target notes for features of
                  ecological interest, an assessment of the{" "}
                  <strong className="text-white">
                    potential for protected species
                  </strong>
                  , and{" "}
                  <strong className="text-white">recommendations</strong> for
                  further surveys where needed. It also provides an initial
                  assessment of the likely ecological constraints and
                  opportunities for the proposed development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Species-Specific Surveys */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Species-Specific Surveys
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Where the PEA identifies the potential for protected species,{" "}
                <strong>species-specific surveys</strong> are required to
                determine whether those species are actually present, their
                population size, and how they use the site. Each species group
                has its own survey methodology and seasonal requirements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Bat Surveys
                </p>
                <p className="text-sm text-white/80 mb-3">
                  All UK bat species are{" "}
                  <strong className="text-white">
                    European Protected Species
                  </strong>
                  . Bat surveys follow a staged approach:
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Preliminary Roost Assessment (PRA)
                      </p>
                      <p>
                        A daytime inspection of buildings or trees to assess
                        their potential to support roosting bats. The ecologist
                        looks for features such as gaps in roof tiles, lifted
                        lead flashing, crevices in timber, and signs of bat
                        presence (droppings, urine staining, feeding remains).
                        Structures are graded from negligible to high potential.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Emergence and Re-Entry Surveys
                      </p>
                      <p>
                        Conducted at dusk and dawn respectively. Surveyors
                        position themselves around the building or tree and use
                        bat detectors to record bats emerging from or returning
                        to potential roost locations. The number of surveys
                        required depends on the roost potential grading &mdash;
                        typically 2&ndash;3 surveys for moderate potential,
                        3&ndash;4 for high potential.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Activity Surveys
                      </p>
                      <p>
                        Transect walks or static bat detector deployments that
                        record bat activity across the wider site. These
                        identify commuting routes, foraging areas, and the
                        species present. Static detectors are left in position
                        for consecutive nights to gather data on activity levels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Great Crested Newt (GCN) Surveys
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Great crested newts are{" "}
                  <strong className="text-white">
                    European Protected Species
                  </strong>
                  . Three main survey methods are used:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        eDNA (environmental DNA)
                      </strong>{" "}
                      &mdash; water samples taken from ponds are analysed in a
                      laboratory for the presence of GCN DNA. This confirms
                      presence or likely absence but does not provide population
                      estimates. Valid from mid-April to end of June.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bottle trapping</strong>{" "}
                      &mdash; funnel traps are set in ponds overnight and
                      checked the following morning. This provides data on
                      species presence and population size class (small, medium,
                      or large).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Torch surveys</strong>{" "}
                      &mdash; surveyors walk the perimeter of ponds at night
                      using powerful torches to count newts visible in the
                      water. Combined with other methods for a full population
                      assessment.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Bird Surveys
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Breeding bird surveys
                      </strong>{" "}
                      &mdash; typically conducted between March and June using
                      territory mapping (Common Bird Census) methodology. A
                      minimum of three visits is required to map breeding
                      territories. All nesting birds are protected under the
                      Wildlife and Countryside Act 1981.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Wintering bird surveys
                      </strong>{" "}
                      &mdash; conducted between November and March. Particularly
                      important near wetland sites, estuaries, and farmland that
                      may support overwintering populations of Schedule 1 or
                      Annex I species.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Reptile Surveys
                </p>
                <p className="text-sm text-white/80">
                  Reptile surveys use{" "}
                  <strong className="text-white">artificial refugia</strong>{" "}
                  (corrugated metal sheets, roofing felt, or similar cover
                  objects) placed on the ground in suitable habitat. Reptiles
                  shelter beneath these for thermoregulation. The refugia must
                  be left in place for at least two weeks to &ldquo;bed
                  in&rdquo; before survey visits begin. A minimum of{" "}
                  <strong className="text-white">seven survey visits</strong>{" "}
                  conducted during suitable weather conditions (typically April
                  to September, ideally in warm but not hot conditions) is
                  required for a robust assessment. All four common UK reptile
                  species (slow worm, common lizard, grass snake, adder) are
                  protected from intentional killing and injury.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Survey Seasons */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Survey Seasons
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most ecological surveys are{" "}
                <strong>seasonally constrained</strong> because species are only
                active, visible, or detectable at certain times of year.
                Understanding these seasonal windows is critical to project
                programming. Missing a survey window in one year can delay a
                project by up to <strong>12 months</strong>.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Multi-Season Requirements:
                  </strong>{" "}
                  Some surveys require visits across multiple seasons to provide
                  a complete picture. Bat activity surveys, for example, may
                  require visits from May to September. If a project starts too
                  late in the season to complete all required visits, the
                  remaining surveys must be deferred to the following year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Survey Season Calendar */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            Survey Season Calendar
          </h2>
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Month Headers */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-2">
                <div className="text-xs text-white/40 font-medium pr-2">
                  Species / Survey
                </div>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month) => (
                  <div
                    key={month}
                    className="text-[10px] sm:text-xs text-white/50 text-center font-medium"
                  >
                    {month}
                  </div>
                ))}
              </div>

              {/* PEA / Phase 1 */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <Calendar className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  PEA / Phase 1
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 2 && i <= 9
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : "bg-emerald-500/20 border border-emerald-500/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Bat PRA */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  Bat PRA
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 0 && i <= 11
                          ? "bg-emerald-500/40 border border-emerald-400/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Bat Emergence */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  Bat Emergence
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 4 && i <= 7
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : i === 8
                            ? "bg-emerald-500/30 border border-emerald-400/20"
                            : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Bat Activity */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  Bat Activity
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 4 && i <= 8
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : i === 3 || i === 9
                            ? "bg-emerald-500/30 border border-emerald-400/20"
                            : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* GCN eDNA */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  GCN eDNA
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 3 && i <= 5
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* GCN Trapping/Torch */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  GCN Trapping
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 2 && i <= 5
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Breeding Birds */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  Breeding Birds
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 2 && i <= 5
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : i === 6
                            ? "bg-emerald-500/30 border border-emerald-400/20"
                            : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Wintering Birds */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  Wintering Birds
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i <= 2 || i >= 10
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Reptiles */}
              <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-0 mb-1.5">
                <div className="text-xs text-white/80 pr-2 flex items-center">
                  <TreePine className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                  Reptiles
                </div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="px-0.5">
                    <div
                      className={`h-5 rounded-sm ${
                        i >= 3 && i <= 8
                          ? "bg-emerald-500/60 border border-emerald-400/40"
                          : i === 2 || i === 9
                            ? "bg-emerald-500/30 border border-emerald-400/20"
                            : "bg-white/5 border border-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded-sm bg-emerald-500/60 border border-emerald-400/40" />
                  <span className="text-[10px] text-white/60">
                    Optimal window
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded-sm bg-emerald-500/30 border border-emerald-400/20" />
                  <span className="text-[10px] text-white/60">
                    Sub-optimal / extended
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded-sm bg-white/5 border border-white/10" />
                  <span className="text-[10px] text-white/60">
                    Not suitable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Ecological Impact Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Ecological Impact Assessment
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ecological Impact Assessment (EcIA) is the process of{" "}
                <strong>identifying, quantifying, and evaluating</strong> the
                potential effects of a proposed development on ecological
                features. In the UK, the standard framework is provided by the{" "}
                <strong>
                  Chartered Institute of Ecology and Environmental Management
                  (CIEEM)
                </strong>{" "}
                guidelines.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Characterising Impacts
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Impacts on ecological receptors are characterised according to
                  several parameters:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">
                      Direct Impacts
                    </p>
                    <p>
                      Physical destruction or removal of habitats or species
                      directly caused by the development (e.g., demolishing a
                      building containing a bat roost, clearing woodland).
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">
                      Indirect Impacts
                    </p>
                    <p>
                      Secondary effects not directly caused by the development
                      but occurring as a consequence (e.g., increased light
                      spill affecting bat foraging, changes to hydrology
                      affecting wetland habitats).
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">
                      Cumulative Impacts
                    </p>
                    <p>
                      Combined effects of the proposed development together
                      with other existing or planned developments in the area
                      (e.g., multiple housing schemes collectively reducing
                      habitat connectivity).
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-white font-medium mb-1">
                      Additional Parameters
                    </p>
                    <p>
                      Magnitude, extent, duration (temporary or permanent),
                      reversibility, timing, and frequency of the impact are
                      all assessed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Significance Assessment
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Under the CIEEM framework, the significance of an ecological
                  impact is determined by combining:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Receptor importance
                      </strong>{" "}
                      &mdash; the conservation value of the ecological feature,
                      assessed on a geographic scale (international, national,
                      regional, county, local, site-level)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Magnitude of impact
                      </strong>{" "}
                      &mdash; the scale, extent, and severity of the predicted
                      change to the ecological feature
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-3">
                  An impact is considered{" "}
                  <strong className="text-white">significant</strong> if it
                  affects the integrity or conservation status of the ecological
                  receptor. Only significant impacts require mitigation. The
                  assessment must consider impacts both with and without
                  mitigation measures in place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Mitigation Hierarchy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Mitigation Hierarchy
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The mitigation hierarchy is the{" "}
                <strong>internationally recognised framework</strong> for
                managing ecological impacts. It must be applied in strict order
                &mdash; each step is only considered when the preceding step has
                been exhausted or is demonstrably not achievable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  The Four Steps
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-emerald-300 font-medium">Avoidance</p>
                      <p>
                        Redesign the development to avoid ecological impacts
                        entirely. This is always the preferred option. Examples:
                        relocating the footprint away from a bat roost, phasing
                        works to avoid nesting bird season, retaining existing
                        habitats within the site layout.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-emerald-300 font-medium">
                        Minimisation
                      </p>
                      <p>
                        Where avoidance is not fully possible, reduce the
                        severity or extent of the impact. Examples: directional
                        lighting to reduce light spill on bat commuting routes,
                        noise barriers during piling, timing of vegetation
                        clearance outside nesting season.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-emerald-300 font-medium">
                        Rehabilitation / Restoration
                      </p>
                      <p>
                        Repair or restore ecological features that have been
                        damaged or degraded. Examples: reinstating a hedgerow
                        after trenching, restoring grassland after temporary
                        construction access, like-for-like habitat replacement.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-emerald-300 font-medium">Offsetting</p>
                      <p>
                        Compensate for residual impacts that cannot be avoided,
                        minimised, or restored. This is the{" "}
                        <strong className="text-white">last resort</strong>.
                        Examples: creating new habitat elsewhere to replace
                        what was lost, purchasing biodiversity credits,
                        contributing to off-site habitat management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Hierarchy Is Not Optional
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    A developer cannot jump straight to offsetting without first
                    demonstrating that avoidance, minimisation, and restoration
                    have been genuinely considered and exhausted.
                  </strong>{" "}
                  Planning authorities and Natural England will reject
                  applications that propose compensation without evidence that
                  the earlier steps of the hierarchy have been properly applied.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Mitigation Hierarchy Pyramid */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            Mitigation Hierarchy Pyramid
          </h2>
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[300px] max-w-lg mx-auto">
              {/* Most preferred (top, narrowest) */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="text-[10px] text-white/40 mb-1">
                  MOST PREFERRED
                </div>

                {/* Level 1: Avoidance */}
                <div className="w-[45%] bg-emerald-500/40 border border-emerald-400/50 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-emerald-300">
                    AVOIDANCE
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    Prevent impacts entirely through design
                  </p>
                </div>

                {/* Arrow */}
                <div className="text-white/20 text-xs">&darr;</div>

                {/* Level 2: Minimisation */}
                <div className="w-[60%] bg-emerald-500/30 border border-emerald-400/40 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-emerald-300">
                    MINIMISATION
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    Reduce severity and extent of impacts
                  </p>
                </div>

                {/* Arrow */}
                <div className="text-white/20 text-xs">&darr;</div>

                {/* Level 3: Rehabilitation / Restoration */}
                <div className="w-[75%] bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-emerald-300">
                    REHABILITATION / RESTORATION
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    Repair and restore damaged features
                  </p>
                </div>

                {/* Arrow */}
                <div className="text-white/20 text-xs">&darr;</div>

                {/* Level 4: Offsetting */}
                <div className="w-[90%] bg-emerald-500/10 border border-emerald-400/20 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-emerald-300">
                    OFFSETTING
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    Compensate for residual impacts &mdash; last resort
                  </p>
                </div>

                <div className="text-[10px] text-white/40 mt-1">
                  LEAST PREFERRED
                </div>
              </div>

              {/* Note */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mt-4 text-center">
                <p className="text-xs sm:text-sm text-white/80">
                  Each step must be{" "}
                  <strong className="text-emerald-400">
                    exhausted before moving to the next
                  </strong>
                  . Evidence of genuine consideration of each level is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Protected Species Licensing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            Protected Species Licensing
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a development will unavoidably affect{" "}
                <strong>European Protected Species</strong> (such as bats or
                great crested newts) or their habitats, a{" "}
                <strong>mitigation licence</strong> must be obtained from
                Natural England before any works that could disturb, injure, or
                kill the species or damage or destroy their breeding sites or
                resting places can proceed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  When Is a Licence Needed?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Works will <strong className="text-white">disturb</strong>{" "}
                      a protected species at a breeding site or resting place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Works will{" "}
                      <strong className="text-white">damage or destroy</strong>{" "}
                      a breeding site or resting place (e.g., demolishing a
                      building with a bat roost)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Works may result in the{" "}
                      <strong className="text-white">
                        killing or injury
                      </strong>{" "}
                      of a protected species (even unintentionally)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  The Three Derogation Tests
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Natural England can only grant a licence if all three tests
                  are satisfied:
                </p>
                <div className="space-y-3">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Overriding Public Interest
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          The proposed activity must be for a purpose of
                          overriding public interest, including those of a
                          social or economic nature, or for imperative reasons
                          of public health and safety, or for beneficial
                          consequences of primary importance for the
                          environment.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          No Satisfactory Alternative
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          There must be no satisfactory alternative to the
                          proposed action that would avoid or reduce the impact
                          on the protected species. The applicant must
                          demonstrate that alternatives have been properly
                          considered.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Favourable Conservation Status
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          The action must not be detrimental to the maintenance
                          of the population of the species at a favourable
                          conservation status in their natural range. This is
                          demonstrated through the proposed mitigation
                          measures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Licence Application Components
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Method statement</strong>{" "}
                      &mdash; detailed description of the proposed works,
                      timing, and the specific mitigation measures to protect
                      the species
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reasoned statement
                      </strong>{" "}
                      &mdash; the applicant&rsquo;s justification for how each
                      of the three derogation tests is satisfied
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Supporting survey data
                      </strong>{" "}
                      &mdash; up-to-date ecological survey reports (typically no
                      more than 2 years old)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Planning permission
                      </strong>{" "}
                      &mdash; a valid planning consent must be in place before
                      a licence can be granted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Named ecologist</strong>{" "}
                      &mdash; the licence is issued to a named, suitably
                      qualified ecologist who is responsible for supervising
                      compliance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Working Without a Licence Is a Criminal Offence
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Proceeding with works that affect European Protected Species
                    without a valid licence is a criminal offence.
                  </strong>{" "}
                  Penalties include an unlimited fine and up to six months
                  imprisonment (or both). Ignorance of the species&rsquo;
                  presence is not a defence if reasonable steps to identify
                  protected species (i.e., adequate ecological surveys) were not
                  taken.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Ecological Clerk of Works */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Ecological Clerk of Works
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An Ecological Clerk of Works (ECoW) is a{" "}
                <strong>qualified ecologist</strong> appointed to be present on
                site during construction to ensure that ecological planning
                conditions, licence requirements, and approved method statements
                are complied with. The ECoW acts as the ecological
                representative on site, bridging the gap between the project
                ecologist and the construction team.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Role and Responsibilities
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">Watching Briefs</p>
                      <p>
                        The ECoW is present during ecologically sensitive works
                        to watch for protected species and ensure the method
                        statement is being followed. This may include
                        supervising vegetation clearance, building demolition,
                        or excavation near known habitats. If a protected
                        species is encountered, the ECoW has the authority to
                        stop works immediately.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">Toolbox Talks</p>
                      <p>
                        Delivering ecological awareness briefings to site
                        workers before works begin. Toolbox talks cover what
                        protected species may be present, what they look like,
                        what to do if one is found, and the legal consequences
                        of non-compliance. Records of attendance must be kept.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Incident Response
                      </p>
                      <p>
                        If a protected species is discovered unexpectedly, or if
                        a breach of ecological conditions occurs, the ECoW
                        manages the response. This may include stopping works,
                        securing the area, contacting Natural England, and
                        advising the site manager on the appropriate course of
                        action. Incidents must be formally recorded and
                        reported.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Monitoring Compliance
                      </p>
                      <p>
                        The ECoW monitors ongoing compliance with ecological
                        planning conditions, licence conditions, and the
                        Construction Environmental Management Plan (CEMP). This
                        includes checking that exclusion zones are maintained,
                        that timing restrictions are observed, that pollution
                        prevention measures are in place, and that mitigation
                        features (such as bat boxes or newt fencing) are
                        installed correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Reporting and Records
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Site visit reports
                      </strong>{" "}
                      documenting activities observed, species encountered, and
                      compliance status
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toolbox talk records
                      </strong>{" "}
                      with dates, topics covered, and attendance signatures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Incident logs</strong>{" "}
                      recording any ecological incidents, the response taken,
                      and outcome
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Licence return data
                      </strong>{" "}
                      &mdash; species counts and mitigation outcomes required by
                      Natural England as a condition of the licence
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key Point:</strong> The
                  ECoW is not just an advisory role &mdash; they have the{" "}
                  <strong>authority to stop works</strong> if ecological
                  conditions are being breached. Site managers and contractors
                  must respect this authority. Failure to comply with the
                  ECoW&rsquo;s directions can result in criminal prosecution and
                  the revocation of planning permission or protected species
                  licences.
                </p>
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
            <Link to="../environmental-sustainability-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Protected Species &amp; Habitats
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5-section-3">
              Next: BREEAM &amp; Green Building Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
