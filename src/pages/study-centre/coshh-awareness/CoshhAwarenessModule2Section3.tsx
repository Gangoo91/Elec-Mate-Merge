import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "sds-legal-requirement",
    question:
      "Under which regulation must suppliers provide a Safety Data Sheet for hazardous substances?",
    options: [
      "The REACH Regulation (EC 1907/2006)",
      "The Health and Safety at Work etc. Act 1974",
      "The Provision and Use of Work Equipment Regulations 1998",
      "The Electricity at Work Regulations 1989",
    ],
    correctIndex: 0,
    explanation:
      "Under Article 31 of the REACH Regulation (EC 1907/2006, retained in UK law as UK REACH), suppliers and manufacturers must provide a Safety Data Sheet when supplying a hazardous substance or mixture. This is a legal obligation — not optional. The SDS must be in the official language of the member state where the substance is placed on the market.",
  },
  {
    id: "ghs-signal-words",
    question:
      "What are the two signal words used on GHS-compliant labels and SDS documents, and which indicates the more severe hazard?",
    options: [
      "Danger (more severe) and Warning (less severe)",
      "Caution (more severe) and Notice (less severe)",
      "Toxic (more severe) and Harmful (less severe)",
      "Critical (more severe) and Advisory (less severe)",
    ],
    correctIndex: 0,
    explanation:
      "The two GHS signal words are 'Danger' and 'Warning'. 'Danger' is used for the more severe hazard categories (e.g. acute toxicity categories 1-3, flammable gases category 1), whilst 'Warning' is used for less severe categories. Only one signal word appears on a label — if multiple hazards apply, the most severe signal word takes precedence.",
  },
  {
    id: "sds-section-8-importance",
    question:
      "Which section of the SDS is most critical for determining what PPE to wear when handling a substance?",
    options: [
      "Section 4 — First-aid measures",
      "Section 7 — Handling and storage",
      "Section 8 — Exposure controls/personal protection",
      "Section 9 — Physical and chemical properties",
    ],
    correctIndex: 2,
    explanation:
      "Section 8 — Exposure controls/personal protection — is the most critical section for determining PPE requirements. It specifies occupational exposure limits (OELs), recommended engineering controls, and the exact type of PPE needed: respiratory protection, hand protection (glove material and breakthrough time), eye/face protection, and skin/body protection. Always check Section 8 before handling any hazardous substance.",
  },
];

const faqs = [
  {
    question: "Do I need to read the entire SDS before using a product?",
    answer:
      "You do not need to memorise all 16 sections, but you must read the sections relevant to safe use before handling the substance. As a minimum, check Section 2 (hazards identification) for the overall hazard picture, Section 4 (first-aid measures) so you know what to do in an emergency, Section 7 (handling and storage) for safe working practices, and Section 8 (exposure controls/personal protection) for the PPE you need. Your employer should provide training on how to read an SDS and should highlight the key information in the COSHH risk assessment.",
  },
  {
    question:
      "What is the difference between the product label and the Safety Data Sheet?",
    answer:
      "The product label provides a summary of the key hazard information — pictograms, signal word, hazard statements, precautionary statements, and supplier details. It is designed to give immediate, at-a-glance information at the point of use. The SDS is the comprehensive reference document containing all 16 sections of detailed safety information. Think of the label as the quick reference card and the SDS as the full technical manual. The label elements are drawn from the information in the SDS, but the SDS contains far more detail, including exposure limits, detailed PPE specifications, first-aid procedures, and ecological data.",
  },
  {
    question: "How often should Safety Data Sheets be updated?",
    answer:
      "Suppliers must update an SDS without delay when new information becomes available that may affect risk management measures, or when a substance has been granted or refused an authorisation, or when a restriction has been imposed. In practice, SDS documents should be reviewed and updated by the supplier whenever there is a significant change to the hazard classification, composition, or recommended control measures. As a user, you should ensure that the SDS you hold is the most current version — check the date in Section 16 (other information) and contact your supplier if it is more than a few years old.",
  },
  {
    question:
      "Can Safety Data Sheets be stored digitally, or do I need paper copies?",
    answer:
      "There is no legal requirement for SDS documents to be in paper format. They can be stored digitally — on a tablet, computer, shared drive, or cloud system — provided they are readily accessible to all workers who need them, at the point of use. The key requirement under COSHH is that employees who work with hazardous substances must be able to access the relevant SDS quickly. Many organisations now use digital SDS management systems, which make it easier to keep documents up to date and searchable. However, if digital access is unreliable on your site (e.g. poor signal in a basement), paper copies should also be available as a backup.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "How many mandatory sections does a Safety Data Sheet contain?",
    options: ["8 sections", "12 sections", "16 sections", "20 sections"],
    correctAnswer: 2,
    explanation:
      "A Safety Data Sheet must contain exactly 16 sections, in a fixed order prescribed by Annex II of the REACH Regulation. This standardised format ensures that safety information is always presented consistently, regardless of the supplier or the substance, making it easier for users to find the information they need.",
  },
  {
    id: 2,
    question:
      "Which GHS pictogram shows a skull and crossbones, and what does it indicate?",
    options: [
      "GHS06 — Acute toxicity (severe): fatal or toxic if swallowed, inhaled, or in contact with skin",
      "GHS05 — Corrosion: causes severe skin burns and serious eye damage",
      "GHS02 — Flammable: catches fire easily",
      "GHS09 — Environment: hazardous to the aquatic environment",
    ],
    correctAnswer: 0,
    explanation:
      "The skull and crossbones pictogram is GHS06, indicating acute toxicity in the more severe categories (categories 1-3). It means the substance can be fatal or toxic if swallowed, inhaled, or absorbed through the skin. Products carrying this pictogram require the signal word 'Danger' and demand rigorous control measures including appropriate PPE.",
  },
  {
    id: 3,
    question:
      "What type of hazard do H-statements beginning with H3xx indicate?",
    options: [
      "Physical hazards",
      "Health hazards",
      "Environmental hazards",
      "Transport hazards",
    ],
    correctAnswer: 1,
    explanation:
      "H-statements are grouped by hazard type: H2xx codes relate to physical hazards (e.g. H220 'Extremely flammable gas'), H3xx codes relate to health hazards (e.g. H301 'Toxic if swallowed', H350 'May cause cancer'), and H4xx codes relate to environmental hazards (e.g. H400 'Very toxic to aquatic life'). This numbering system helps you quickly identify the category of risk.",
  },
  {
    id: 4,
    question:
      "PVC solvent cement is commonly used by electricians. Which of the following hazards would you typically find on its SDS?",
    options: [
      "Radioactive material — handle with lead shielding",
      "Highly flammable, harmful by inhalation, causes serious eye irritation",
      "Oxidising solid — keep away from combustible materials",
      "Explosive — risk of mass explosion",
    ],
    correctAnswer: 1,
    explanation:
      "PVC solvent cement typically contains tetrahydrofuran (THF) and/or cyclohexanone, making it highly flammable (H225), harmful if inhaled (H332), and capable of causing serious eye irritation (H319). The SDS for PVC solvent cement will specify the need for adequate ventilation, no ignition sources, and appropriate eye protection. Always check the specific product's SDS as formulations vary between manufacturers.",
  },
  {
    id: 5,
    question: "What does the signal word 'Danger' on a product label indicate?",
    options: [
      "The product is banned and should not be used",
      "The product belongs to the more severe hazard categories",
      "The product requires a COSHH assessment but is safe with basic precautions",
      "The product is only dangerous if swallowed",
    ],
    correctAnswer: 1,
    explanation:
      "'Danger' is the signal word assigned to the more severe hazard categories under the GHS/CLP system. It indicates a higher level of risk compared to products labelled with 'Warning'. For example, a substance classified as acute toxicity category 1 (fatal) carries the signal word 'Danger', whilst a substance in category 4 (harmful) carries 'Warning'. The signal word provides an immediate indication of the severity of the hazard.",
  },
  {
    id: 6,
    question:
      "Which section of the SDS provides information on workplace exposure limits (WELs)?",
    options: [
      "Section 3 — Composition/information on ingredients",
      "Section 8 — Exposure controls/personal protection",
      "Section 11 — Toxicological information",
      "Section 15 — Regulatory information",
    ],
    correctAnswer: 1,
    explanation:
      "Section 8 — Exposure controls/personal protection — lists applicable workplace exposure limits (WELs), including both long-term (8-hour TWA) and short-term (15-minute STEL) limits. It also specifies recommended engineering controls and personal protective equipment. This is the go-to section for anyone carrying out a COSHH risk assessment.",
  },
  {
    id: 7,
    question:
      "What does the GHS pictogram showing an exclamation mark (GHS07) typically indicate?",
    options: [
      "Immediate danger to life",
      "Lower-level health hazards such as skin irritation, eye irritation, or harmful if swallowed",
      "The substance is flammable",
      "The substance is corrosive to metals",
    ],
    correctAnswer: 1,
    explanation:
      "GHS07 (exclamation mark) indicates lower-level health hazards — it is used for substances that are irritant (skin or eye), harmful (rather than toxic), cause skin sensitisation, or cause drowsiness or dizziness. It carries the signal word 'Warning' rather than 'Danger'. Many common products used by electricians, such as contact cleaners and sealants, carry this pictogram.",
  },
  {
    id: 8,
    question:
      "Where on the SDS would you find information about how to dispose of a hazardous substance and its contaminated packaging?",
    options: [
      "Section 6 — Accidental release measures",
      "Section 7 — Handling and storage",
      "Section 13 — Disposal considerations",
      "Section 14 — Transport information",
    ],
    correctAnswer: 2,
    explanation:
      "Section 13 — Disposal considerations — provides guidance on safe disposal methods for the substance, contaminated packaging, and any waste generated. It will reference relevant waste legislation and may specify whether the substance is classified as hazardous waste. Incorrect disposal of hazardous substances is an offence under the Environmental Protection Act 1990 and the Hazardous Waste Regulations.",
  },
];

export default function CoshhAwarenessModule2Section3() {
  useSEO({
    title: "Safety Data Sheets | COSHH Awareness Module 2.3",
    description:
      "The 16 mandatory SDS sections, GHS pictograms, hazard and precautionary statements, signal words, and how to read and interpret a Safety Data Sheet on site.",
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
            <Link to="../coshh-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <FileText className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Data Sheets
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The 16-section reference document that tells you everything you need
            to know about a hazardous substance &mdash; how to read it, what
            matters most on site, and why every electrician should know where to
            find one
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>What:</strong> A 16-section document providing
                comprehensive safety information about a hazardous substance
              </li>
              <li>
                <strong>Legal basis:</strong> REACH Regulation (UK REACH) &amp;
                CLP Regulation
              </li>
              <li>
                <strong>Who provides it:</strong> The manufacturer or supplier
                &mdash; it is their legal duty
              </li>
              <li>
                <strong>Key sections for site:</strong> 2 (hazards), 4
                (first-aid), 7 (handling), 8 (PPE)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before first use:</strong> Read the SDS &mdash;
                especially Sections 2, 7, and 8
              </li>
              <li>
                <strong>PPE decisions:</strong> Always based on Section 8, not
                guesswork
              </li>
              <li>
                <strong>Spill or exposure?</strong> Section 4 (first-aid) and
                Section 6 (spills)
              </li>
              <li>
                <strong>Accessibility:</strong> SDS must be available at the
                point of use
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
              "Explain what a Safety Data Sheet is and the legal requirement to provide one",
              "Describe the 16 mandatory sections and what information each contains",
              "Identify and interpret the 9 GHS hazard pictograms used on labels and SDS documents",
              "Understand hazard statements (H-codes), precautionary statements (P-codes), and signal words",
              "Read and interpret an SDS to determine safe handling, PPE requirements, and emergency procedures",
              "Explain the relationship between product labels and the full SDS",
              "Identify common SDS entries for substances used by electricians",
              "Understand the requirements for storing and accessing SDS documents on site",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Safety Data Sheet? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">01</span>
            What Is a Safety Data Sheet?
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>Safety Data Sheet (SDS)</strong> is a standardised
                document that provides comprehensive information about a
                hazardous substance or mixture. It is the primary source of
                detailed safety, health, and environmental information for any
                chemical product used in the workplace. Every SDS follows the
                same 16-section format, making it possible to quickly locate
                specific information regardless of which manufacturer or
                supplier produced the document.
              </p>

              <p>
                The legal requirement to provide an SDS comes from{" "}
                <strong>Article 31 of the REACH Regulation</strong> (Registration,
                Evaluation, Authorisation and Restriction of Chemicals). In the
                UK, this is retained as{" "}
                <strong>UK REACH (EC 1907/2006 as amended)</strong> following
                the UK&rsquo;s departure from the EU. The format and content
                requirements for Safety Data Sheets are specified in{" "}
                <strong>Annex II of REACH</strong>, which was updated to align
                with the{" "}
                <strong>
                  Globally Harmonised System of Classification and Labelling of
                  Chemicals (GHS)
                </strong>{" "}
                through the <strong>CLP Regulation</strong> (Classification,
                Labelling and Packaging &mdash; EC 1272/2008, retained in UK law
                as UK CLP).
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Key Point:</strong> The
                  SDS is not an optional document. It is a{" "}
                  <strong>legal requirement</strong> under UK REACH. If you are
                  supplied with a hazardous substance and do not receive an SDS,
                  you have the right &mdash; and the duty &mdash; to request one
                  from your supplier. Without an SDS, you cannot carry out an
                  adequate COSHH risk assessment.
                </p>
              </div>

              <p>
                Safety Data Sheets replaced the older &ldquo;Material Safety
                Data Sheets&rdquo; (MSDS). Whilst you may still hear the term
                MSDS on some sites, the correct and current term is{" "}
                <strong>Safety Data Sheet (SDS)</strong>. The key difference is
                that modern SDS documents follow the GHS format with
                standardised hazard pictograms, signal words, and hazard/precautionary
                statements, making them internationally consistent.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Who Provides Them and When */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">02</span>
            Who Provides Them &amp; When
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The responsibility for providing an SDS lies with the{" "}
                <strong>manufacturer, importer, or downstream supplier</strong>{" "}
                of the substance or mixture. This is not a discretionary
                decision &mdash; it is a legal obligation under Article 31 of
                UK REACH. The SDS must be provided{" "}
                <strong>free of charge</strong>, either in paper or electronic
                format, at or before the time of first supply.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  An SDS Must Be Provided When:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      The substance or mixture is{" "}
                      <strong className="text-white">
                        classified as hazardous
                      </strong>{" "}
                      under the CLP Regulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      The substance is{" "}
                      <strong className="text-white">
                        persistent, bioaccumulative and toxic (PBT)
                      </strong>{" "}
                      or very persistent and very bioaccumulative (vPvB)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      The substance is on the{" "}
                      <strong className="text-white">
                        Candidate List for Authorisation
                      </strong>{" "}
                      (substances of very high concern &mdash; SVHCs)
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For <strong>mixtures not classified as hazardous</strong> but
                containing certain hazardous ingredients above specified
                concentration thresholds, the supplier must provide an SDS on
                request. The supplier must also update and re-issue the SDS
                without delay when new information becomes available that may
                affect the risk management measures or hazard classification.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Employer&rsquo;s Duty
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Under the COSHH Regulations 2002, the{" "}
                  <strong>employer</strong> has a duty to obtain Safety Data
                  Sheets for all hazardous substances used in the workplace and
                  to make them accessible to employees. If you are using a
                  hazardous substance at work and cannot find the SDS, raise it
                  with your supervisor immediately. An adequate COSHH risk
                  assessment cannot be completed without the information
                  contained in the SDS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The 16 Mandatory Sections */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">03</span>
            The 16 Mandatory Sections of an SDS
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every Safety Data Sheet must contain{" "}
                <strong>exactly 16 sections</strong>, presented in a fixed order
                prescribed by Annex II of the REACH Regulation. This
                standardised format means that once you know how to read one
                SDS, you can read any SDS from any supplier for any substance.
                The sections are:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-4">
                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 1 &mdash; Identification of the Substance/Mixture
                    and of the Company/Undertaking
                  </p>
                  <p className="text-sm text-white/80">
                    Product identifier (trade name and chemical name), relevant
                    identified uses, details of the supplier (name, address,
                    telephone number), and the emergency telephone number. This
                    is where you confirm you have the right SDS for the product
                    you are using.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 2 &mdash; Hazards Identification
                  </p>
                  <p className="text-sm text-white/80">
                    The GHS classification of the substance or mixture, label
                    elements (pictograms, signal word, hazard and precautionary
                    statements), and any other hazards not covered by the
                    classification system. This is one of the{" "}
                    <strong className="text-white">
                      first sections to read
                    </strong>{" "}
                    &mdash; it gives you the overall hazard picture at a glance.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 3 &mdash; Composition/Information on Ingredients
                  </p>
                  <p className="text-sm text-white/80">
                    Chemical identity and concentration of hazardous ingredients,
                    including CAS numbers, EC numbers, and REACH registration
                    numbers. For mixtures, this section lists each hazardous
                    component and its concentration range.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 4 &mdash; First-Aid Measures
                  </p>
                  <p className="text-sm text-white/80">
                    What to do if someone is exposed &mdash; specific first-aid
                    instructions for inhalation, skin contact, eye contact, and
                    ingestion. Also describes the most important symptoms and
                    effects (both acute and delayed) and any immediate medical
                    attention required. This is a{" "}
                    <strong className="text-white">critical section</strong> to
                    read before handling any substance.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 5 &mdash; Firefighting Measures
                  </p>
                  <p className="text-sm text-white/80">
                    Suitable (and unsuitable) extinguishing media, special
                    hazards arising from the substance during a fire (e.g. toxic
                    fumes, explosive vapours), and advice for firefighters
                    including recommended protective equipment and precautions.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 6 &mdash; Accidental Release Measures
                  </p>
                  <p className="text-sm text-white/80">
                    What to do in the event of a spill, leak, or accidental
                    release &mdash; personal precautions, protective equipment,
                    environmental precautions (e.g. preventing entry to drains),
                    and methods for containment and clean-up.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 7 &mdash; Handling and Storage
                  </p>
                  <p className="text-sm text-white/80">
                    Precautions for safe handling (e.g. avoid ignition sources,
                    use only in well-ventilated areas), conditions for safe
                    storage (temperature, incompatible materials, container
                    requirements), and specific end uses. This tells you{" "}
                    <strong className="text-white">
                      how to use and store the product safely day-to-day
                    </strong>
                    .
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 8 &mdash; Exposure Controls/Personal Protection
                  </p>
                  <p className="text-sm text-white/80">
                    Occupational exposure limits (WELs in the UK), recommended
                    engineering controls (e.g. local exhaust ventilation), and
                    detailed PPE requirements &mdash; respiratory protection,
                    hand protection (specific glove material and breakthrough
                    time), eye/face protection, and skin/body protection. This
                    is the{" "}
                    <strong className="text-white">
                      single most important section for determining what
                      protection you need
                    </strong>
                    .
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 9 &mdash; Physical and Chemical Properties
                  </p>
                  <p className="text-sm text-white/80">
                    Appearance, odour, pH, melting/boiling point, flash point,
                    flammability, vapour pressure, density, solubility, and
                    other physical characteristics. The flash point is
                    particularly relevant for electricians working near ignition
                    sources.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 10 &mdash; Stability and Reactivity
                  </p>
                  <p className="text-sm text-white/80">
                    Chemical stability, conditions to avoid (e.g. heat, sparks),
                    incompatible materials that could cause dangerous reactions,
                    and hazardous decomposition products. Essential for
                    understanding what NOT to mix or expose the substance to.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 11 &mdash; Toxicological Information
                  </p>
                  <p className="text-sm text-white/80">
                    Detailed information on the health effects of exposure &mdash;
                    routes of exposure, acute toxicity data (LD50/LC50 values),
                    skin corrosion/irritation, serious eye damage/irritation,
                    sensitisation, carcinogenicity, reproductive toxicity, and
                    organ-specific toxicity.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 12 &mdash; Ecological Information
                  </p>
                  <p className="text-sm text-white/80">
                    Environmental impact data &mdash; aquatic toxicity,
                    persistence and degradability, bioaccumulative potential,
                    mobility in soil, and any other adverse environmental
                    effects. Relevant for preventing contamination of
                    watercourses and soil during spills.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 13 &mdash; Disposal Considerations
                  </p>
                  <p className="text-sm text-white/80">
                    How to safely dispose of the substance, contaminated
                    packaging, and any waste generated. References relevant
                    waste legislation and whether the substance is classified as
                    hazardous waste. Never pour hazardous substances down drains
                    or into general waste.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 14 &mdash; Transport Information
                  </p>
                  <p className="text-sm text-white/80">
                    UN number, proper shipping name, transport hazard class,
                    packing group, and any special precautions for transport.
                    Relevant if you need to transport hazardous substances to or
                    between sites.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 15 &mdash; Regulatory Information
                  </p>
                  <p className="text-sm text-white/80">
                    Safety, health, and environmental regulations specific to
                    the substance, including whether it is subject to
                    authorisation or restriction under REACH, and any national
                    regulations that apply.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Section 16 &mdash; Other Information
                  </p>
                  <p className="text-sm text-white/80">
                    Date of preparation or last revision, version number, key
                    abbreviations, references to training requirements, and any
                    other information the supplier considers relevant. Check the
                    date here to ensure your SDS is current.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 1: SDS 16 Sections Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">
              &mdash;
            </span>
            SDS 16 Sections Overview
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500/30 to-violet-400/20 border-b border-violet-500/30 px-4 py-3">
              <p className="text-violet-400 font-semibold text-base">
                The 16 Sections at a Glance
              </p>
              <p className="text-white/60 text-xs">
                Grouped by purpose &mdash; know where to look
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs font-medium text-violet-400/80 uppercase tracking-wide mb-2">
                  Identity &amp; Hazards (Sections 1&ndash;3)
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { num: "1", label: "Identification" },
                    { num: "2", label: "Hazards" },
                    { num: "3", label: "Composition" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="bg-violet-500/10 border border-violet-500/20 rounded-lg px-3 py-2 text-center"
                    >
                      <p className="text-violet-400 text-lg font-bold">
                        {s.num}
                      </p>
                      <p className="text-white/70 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-red-400/80 uppercase tracking-wide mb-2">
                  Emergency Response (Sections 4&ndash;6)
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { num: "4", label: "First-Aid" },
                    { num: "5", label: "Firefighting" },
                    { num: "6", label: "Spill Response" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center"
                    >
                      <p className="text-red-400 text-lg font-bold">
                        {s.num}
                      </p>
                      <p className="text-white/70 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-green-400/80 uppercase tracking-wide mb-2">
                  Safe Use (Sections 7&ndash;8)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { num: "7", label: "Handling & Storage" },
                    { num: "8", label: "PPE & Exposure" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center"
                    >
                      <p className="text-green-400 text-lg font-bold">
                        {s.num}
                      </p>
                      <p className="text-white/70 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-blue-400/80 uppercase tracking-wide mb-2">
                  Technical Data (Sections 9&ndash;12)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { num: "9", label: "Physical Props" },
                    { num: "10", label: "Stability" },
                    { num: "11", label: "Toxicology" },
                    { num: "12", label: "Ecology" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-center"
                    >
                      <p className="text-blue-400 text-lg font-bold">
                        {s.num}
                      </p>
                      <p className="text-white/70 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wide mb-2">
                  Disposal, Transport &amp; Regulatory (Sections 13&ndash;16)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { num: "13", label: "Disposal" },
                    { num: "14", label: "Transport" },
                    { num: "15", label: "Regulatory" },
                    { num: "16", label: "Other Info" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-center"
                    >
                      <p className="text-amber-400 text-lg font-bold">
                        {s.num}
                      </p>
                      <p className="text-white/70 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-white/40 text-xs mt-3 sm:hidden">
            Sections grouped by purpose for quick reference
          </p>
        </section>

        {/* Section 04: How to Read and Interpret an SDS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">04</span>
            How to Read &amp; Interpret an SDS
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A full SDS can be 20&ndash;40 pages long, which is why many
                workers never read one. But you do not need to read every page
                from cover to cover. As an on-site worker, you need to know{" "}
                <strong>
                  which sections to check and what to look for in each
                </strong>
                . Here is a practical approach:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  The &ldquo;Must-Read&rdquo; Sections for On-Site Workers
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1st
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Section 2 &mdash; Hazards Identification
                      </p>
                      <p>
                        Start here. It gives you the overall hazard picture:
                        pictograms, signal word, and the key hazard statements.
                        This tells you <em>what</em> the substance can do to
                        you.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2nd
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Section 8 &mdash; Exposure Controls/Personal Protection
                      </p>
                      <p>
                        This tells you <em>how to protect yourself</em>:
                        exposure limits, ventilation requirements, and exact PPE
                        specifications. Never select PPE based on guesswork
                        &mdash; always check Section 8.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3rd
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Section 7 &mdash; Handling and Storage
                      </p>
                      <p>
                        Tells you <em>how to use and store it safely</em>:
                        ventilation requirements, ignition source precautions,
                        temperature limits, and incompatible materials to keep
                        it away from.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4th
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Section 4 &mdash; First-Aid Measures
                      </p>
                      <p>
                        Tells you <em>what to do if something goes wrong</em>:
                        specific first-aid actions for each route of exposure
                        (eyes, skin, inhalation, ingestion). Know this{" "}
                        <em>before</em> you start working, not after an
                        incident.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      5th
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Section 6 &mdash; Accidental Release Measures
                      </p>
                      <p>
                        Tells you <em>what to do if you spill it</em>: personal
                        precautions, containment methods, clean-up procedures,
                        and how to prevent environmental contamination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Practical Tip:</strong>{" "}
                  When you receive a new product on site, take five minutes to
                  scan Sections 2, 7, and 8 of the SDS. Write a quick summary
                  on a toolbox talk card or the COSHH assessment form:
                  &ldquo;Main hazards &rarr; PPE needed &rarr; Key
                  precautions.&rdquo; This takes far less time than dealing with
                  an exposure incident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: GHS Hazard Pictograms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">05</span>
            The 9 GHS Hazard Pictograms
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>
                  Globally Harmonised System (GHS)
                </strong>{" "}
                uses <strong>nine standardised hazard pictograms</strong> &mdash;
                red-bordered diamond shapes with black symbols on a white
                background. These pictograms appear on both the product label
                and in Section 2 of the SDS. They provide an immediate visual
                indication of the type of hazard posed by the substance.
              </p>

              {/* Diagram 2: GHS Pictograms Grid */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500/30 to-violet-400/20 border-b border-violet-500/30 px-4 py-3">
                  <p className="text-violet-400 font-semibold text-base">
                    GHS Pictograms Grid
                  </p>
                  <p className="text-white/60 text-xs">
                    9 standardised symbols &mdash; red diamond border, black
                    symbol, white background
                  </p>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      code: "GHS01",
                      symbol: "Exploding Bomb",
                      name: "Explosive",
                      desc: "Unstable explosives, self-reactive substances, organic peroxides. Can explode if heated, struck, or subjected to friction.",
                      example:
                        "Some specialised resin systems and certain aerosol products under extreme conditions",
                      signal: "Danger",
                    },
                    {
                      code: "GHS02",
                      symbol: "Flame",
                      name: "Flammable",
                      desc: "Flammable gases, liquids, solids, aerosols, and self-heating substances. Catches fire easily when exposed to heat, sparks, or open flames.",
                      example:
                        "PVC solvent cement, contact cleaner sprays, isopropyl alcohol",
                      signal: "Danger / Warning",
                    },
                    {
                      code: "GHS03",
                      symbol: "Flame Over Circle",
                      name: "Oxidiser",
                      desc: "Oxidising gases, liquids, and solids. May cause or intensify fire by providing oxygen. Can make other materials burn more fiercely.",
                      example:
                        "Certain cleaning agents containing sodium hypochlorite",
                      signal: "Danger / Warning",
                    },
                    {
                      code: "GHS04",
                      symbol: "Gas Cylinder",
                      name: "Gas Under Pressure",
                      desc: "Compressed, liquefied, refrigerated, or dissolved gases. Container may explode if heated. Refrigerated gases may cause cryogenic burns.",
                      example:
                        "Compressed air canisters, refrigerant gases in HVAC systems",
                      signal: "Warning",
                    },
                    {
                      code: "GHS05",
                      symbol: "Corrosion",
                      name: "Corrosive",
                      desc: "Causes severe skin burns, serious eye damage, or is corrosive to metals. Can destroy living tissue on contact.",
                      example:
                        "Battery acid, certain drain cleaners, strong flux solutions",
                      signal: "Danger",
                    },
                    {
                      code: "GHS06",
                      symbol: "Skull & Crossbones",
                      name: "Acute Toxicity (Severe)",
                      desc: "Fatal or toxic if swallowed, inhaled, or in contact with skin. Even small quantities can cause death or serious harm.",
                      example:
                        "Methanol-based products, certain pesticides encountered on agricultural sites",
                      signal: "Danger",
                    },
                    {
                      code: "GHS07",
                      symbol: "Exclamation Mark",
                      name: "Irritant / Harmful",
                      desc: "Causes skin irritation, eye irritation, skin sensitisation, drowsiness/dizziness, or is harmful (not toxic) if swallowed, inhaled, or in contact with skin.",
                      example:
                        "Silicone sealants, many solvent-based cleaners, cable pulling lubricants",
                      signal: "Warning",
                    },
                    {
                      code: "GHS08",
                      symbol: "Health Hazard",
                      name: "Serious Health Hazard",
                      desc: "Carcinogenic, mutagenic, toxic to reproduction, respiratory sensitiser, target organ toxicity, or aspiration hazard. May cause long-term or irreversible health damage.",
                      example:
                        "Some epoxy hardeners (respiratory sensitisers), certain wood dust exposures",
                      signal: "Danger / Warning",
                    },
                    {
                      code: "GHS09",
                      symbol: "Dead Fish & Tree",
                      name: "Environmental Hazard",
                      desc: "Hazardous to the aquatic environment — acute or chronic. Toxic to aquatic organisms with long-lasting effects.",
                      example:
                        "Many solvent-based products, oils, and degreasers if released into watercourses",
                      signal: "Warning",
                    },
                  ].map((p) => (
                    <div
                      key={p.code}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
                          {p.code.replace("GHS0", "")}
                        </span>
                        <div>
                          <p className="text-white font-medium text-sm">
                            {p.name}
                          </p>
                          <p className="text-white/50 text-xs">{p.code}</p>
                        </div>
                      </div>
                      <p className="text-white/60 text-xs italic">
                        Symbol: {p.symbol}
                      </p>
                      <p className="text-white/80 text-xs leading-relaxed">
                        {p.desc}
                      </p>
                      <p className="text-violet-400/80 text-xs">
                        <strong>Example:</strong> {p.example}
                      </p>
                      <p className="text-white/50 text-xs">
                        Signal word: {p.signal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Important Distinction
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>GHS06 (skull and crossbones)</strong> and{" "}
                  <strong>GHS07 (exclamation mark)</strong> both relate to acute
                  toxicity, but they indicate{" "}
                  <strong>different severity levels</strong>. GHS06 is for the
                  most severe categories (fatal/toxic) and always carries the
                  signal word &ldquo;Danger&rdquo;. GHS07 covers the less
                  severe category (harmful) and carries &ldquo;Warning&rdquo;.
                  If a substance qualifies for GHS06, the GHS07 pictogram is{" "}
                  <strong>not</strong> used alongside it for the same hazard.
                </p>
              </div>

              <p>
                A single product may display <strong>multiple pictograms</strong>{" "}
                if it has more than one type of hazard. For example, PVC solvent
                cement commonly displays both the <em>flame</em> (GHS02 &mdash;
                flammable) and the <em>exclamation mark</em> (GHS07 &mdash;
                irritant/harmful) pictograms. Always check all pictograms on the
                label and in Section 2 of the SDS.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Hazard & Precautionary Statements, Signal Words */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">06</span>
            Hazard Statements, Precautionary Statements &amp; Signal Words
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Alongside pictograms, the GHS/CLP system uses{" "}
                <strong>standardised coded statements</strong> to describe
                hazards and recommended precautions. These appear on the product
                label and in Section 2 of the SDS.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Hazard Statements (H-codes)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Hazard statements describe the <strong>nature and severity</strong>{" "}
                  of the hazard. Each is identified by a unique H-code. The
                  numbering tells you the type of hazard at a glance:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H2xx &mdash; Physical hazards.</strong>{" "}
                      Examples: H220 &ldquo;Extremely flammable gas&rdquo;, H225
                      &ldquo;Highly flammable liquid and vapour&rdquo;, H228
                      &ldquo;Flammable solid&rdquo;, H270 &ldquo;May cause or
                      intensify fire; oxidiser&rdquo;, H280 &ldquo;Contains gas
                      under pressure; may explode if heated&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H3xx &mdash; Health hazards.</strong>{" "}
                      Examples: H301 &ldquo;Toxic if swallowed&rdquo;, H315
                      &ldquo;Causes skin irritation&rdquo;, H319 &ldquo;Causes
                      serious eye irritation&rdquo;, H332 &ldquo;Harmful if
                      inhaled&rdquo;, H334 &ldquo;May cause allergy or asthma
                      symptoms or breathing difficulties if inhaled&rdquo;, H350
                      &ldquo;May cause cancer&rdquo;, H361 &ldquo;Suspected of
                      damaging fertility or the unborn child&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H4xx &mdash; Environmental hazards.</strong>{" "}
                      Examples: H400 &ldquo;Very toxic to aquatic life&rdquo;,
                      H410 &ldquo;Very toxic to aquatic life with long lasting
                      effects&rdquo;, H411 &ldquo;Toxic to aquatic life with
                      long lasting effects&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Precautionary Statements (P-codes)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Precautionary statements describe the{" "}
                  <strong>recommended measures</strong> to minimise or prevent
                  adverse effects. They are grouped into four categories:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">P1xx &mdash; Prevention.</strong>{" "}
                      Actions to take to prevent exposure or accidents. Examples:
                      P210 &ldquo;Keep away from heat, hot surfaces, sparks,
                      open flames and other ignition sources. No
                      smoking&rdquo;, P260 &ldquo;Do not breathe
                      dust/fume/gas/mist/vapours/spray&rdquo;, P280 &ldquo;Wear
                      protective gloves/protective clothing/eye protection/face
                      protection&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">P3xx &mdash; Response.</strong>{" "}
                      What to do if exposure or an incident occurs. Examples:
                      P301+P310 &ldquo;IF SWALLOWED: Immediately call a POISON
                      CENTRE/doctor&rdquo;, P305+P351+P338 &ldquo;IF IN EYES:
                      Rinse cautiously with water for several minutes. Remove
                      contact lenses, if present and easy to do. Continue
                      rinsing&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">P4xx &mdash; Storage.</strong>{" "}
                      How to store the substance safely. Examples: P403
                      &ldquo;Store in a well-ventilated place&rdquo;,
                      P403+P235 &ldquo;Store in a well-ventilated place. Keep
                      cool&rdquo;, P405 &ldquo;Store locked up&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">P5xx &mdash; Disposal.</strong>{" "}
                      How to dispose of the substance and its container safely.
                      Example: P501 &ldquo;Dispose of contents/container in
                      accordance with local/regional/national/international
                      regulations&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Signal Words
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The GHS uses exactly two signal words, displayed prominently
                  on the label:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 font-bold text-lg mb-1">
                      DANGER
                    </p>
                    <p className="text-sm text-white/80">
                      Used for the <strong>more severe</strong> hazard
                      categories. Indicates a greater level of risk. Examples:
                      acute toxicity categories 1&ndash;3, flammable liquids
                      category 1, carcinogenicity category 1A/1B.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-amber-400 font-bold text-lg mb-1">
                      WARNING
                    </p>
                    <p className="text-sm text-white/80">
                      Used for <strong>less severe</strong> hazard categories
                      (but still significant). Examples: acute toxicity category
                      4, flammable liquids category 4, skin irritation category
                      2.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-3">
                  Only one signal word appears on a label. If a product has
                  multiple hazards with different signal words, the most severe
                  (&ldquo;Danger&rdquo;) takes precedence. No substance carries
                  both signal words simultaneously.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Product Labels, Common SDS for Electricians, Storage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">07</span>
            Labels, Common SDS for Electricians &amp; Storage Requirements
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <h3 className="text-lg font-medium text-white">
                Product Labels vs Safety Data Sheets
              </h3>
              <p>
                Every hazardous substance must carry a{" "}
                <strong>CLP-compliant label</strong> on its container. The label
                is the first line of communication &mdash; it provides the key
                hazard information at a glance. The label elements are drawn
                directly from the information in the SDS and must include:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Required Label Elements (under CLP)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Product identifier</strong>{" "}
                      &mdash; the trade name and/or chemical name
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        GHS hazard pictograms
                      </strong>{" "}
                      &mdash; the red diamond symbols applicable to the product
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Signal word</strong>{" "}
                      &mdash; &ldquo;Danger&rdquo; or &ldquo;Warning&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Hazard statements (H-codes)
                      </strong>{" "}
                      &mdash; describing the nature and degree of the hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Precautionary statements (P-codes)
                      </strong>{" "}
                      &mdash; recommended measures to minimise adverse effects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Supplier identification
                      </strong>{" "}
                      &mdash; name, address, and telephone number
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nominal quantity</strong>{" "}
                      &mdash; the amount of substance in the container
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Think of the label as the{" "}
                <strong>quick reference card</strong> and the SDS as the{" "}
                <strong>full technical manual</strong>. The label gives you
                enough information to handle the substance with basic
                precautions; the SDS gives you the complete picture needed for
                risk assessment, emergency response, and long-term health
                management.
              </p>

              <h3 className="text-lg font-medium text-white pt-4">
                Common SDS for Electricians
              </h3>
              <p>
                Electricians regularly work with substances that require an SDS.
                Here are four of the most common:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-4">
                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    PVC Solvent Cement
                  </p>
                  <p className="text-sm text-white/80">
                    Used to join PVC conduit and trunking. Contains
                    tetrahydrofuran (THF) and/or cyclohexanone. Typically
                    classified as <strong>highly flammable</strong> (H225),{" "}
                    <strong>harmful if inhaled</strong> (H332), and causing{" "}
                    <strong>serious eye irritation</strong> (H319). Pictograms:
                    flame (GHS02) and exclamation mark (GHS07). Requires
                    adequate ventilation, no ignition sources, and eye
                    protection.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Cable Pulling Lubricant
                  </p>
                  <p className="text-sm text-white/80">
                    Used to reduce friction when pulling cables through conduit
                    or trunking. Water-based formulations are generally low
                    hazard, but some may cause{" "}
                    <strong>skin irritation</strong> (H315) or{" "}
                    <strong>eye irritation</strong> (H319). Some silicone-based
                    lubricants may contain solvents with additional flammability
                    hazards. Always check the specific product&rsquo;s SDS.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Electrical Contact Cleaner
                  </p>
                  <p className="text-sm text-white/80">
                    Used to clean contacts, PCBs, and connectors. Typically
                    aerosol-based, containing solvents such as isopropyl alcohol
                    or heptane. Usually classified as{" "}
                    <strong>extremely flammable</strong> (H222/H229),{" "}
                    <strong>may cause drowsiness or dizziness</strong> (H336),
                    and <strong>harmful if inhaled</strong>. Pictograms: flame
                    (GHS02) and exclamation mark (GHS07). Use in ventilated
                    areas, away from ignition sources. Never spray onto live
                    circuits.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-violet-400 mb-1">
                    Silicone Sealant
                  </p>
                  <p className="text-sm text-white/80">
                    Used to seal cable entries, junction boxes, and penetrations.
                    Acetoxy-cure silicone sealants release acetic acid (vinegar
                    smell) during curing, which can cause{" "}
                    <strong>eye irritation</strong> (H319) and{" "}
                    <strong>respiratory irritation</strong> (H335). Neutral-cure
                    variants are generally less irritating. Pictogram:
                    exclamation mark (GHS07). Ensure ventilation during and after
                    application.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-medium text-white pt-4">
                Storage of SDS &mdash; Accessibility Requirements
              </h3>
              <p>
                Under the COSHH Regulations, Safety Data Sheets must be{" "}
                <strong>
                  readily accessible to all workers who use or may be exposed to
                  hazardous substances
                </strong>
                . This means they must be available at the point of use &mdash;
                not locked in an office that workers cannot access during their
                shift.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Digital vs Paper Storage
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Digital storage</strong>{" "}
                      &mdash; SDS documents can be stored on tablets, computers,
                      shared drives, or cloud-based SDS management systems. This
                      makes it easier to keep documents current and searchable.
                      Many suppliers provide SDS downloads from their websites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Paper storage</strong>{" "}
                      &mdash; physical folders or binders kept in a known,
                      accessible location (e.g. the site office, welfare unit,
                      or COSHH cupboard). Paper copies provide a reliable
                      backup when digital access is unavailable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Best practice</strong>{" "}
                      &mdash; use a digital system as the primary repository
                      (easy to update, search, and distribute) with paper copies
                      available as a backup for locations with poor connectivity.
                      All workers should know where to find the SDS collection
                      and how to access it.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Version Control:</strong>{" "}
                  Always check the date and version number in Section 16 of the
                  SDS. Suppliers must update the SDS when new information
                  becomes available. If your copy is more than a few years old,
                  contact the supplier for the latest version. Using an
                  out-of-date SDS for a COSHH risk assessment could mean that
                  your control measures are based on incorrect or incomplete
                  information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Putting It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">08</span>
            Putting It All Together
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safety Data Sheets are not just paperwork &mdash; they are the{" "}
                <strong>
                  foundation of chemical safety management in the workplace
                </strong>
                . Every time you use a hazardous substance, the SDS provides the
                information you need to protect yourself, your colleagues, and
                the environment. Here is how the key elements connect in
                practice:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  From SDS to Safe Working
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Obtain the SDS Before Use
                      </p>
                      <p>
                        Before any hazardous substance is brought onto site or
                        used for the first time, the SDS must be obtained from
                        the supplier. This is the employer&rsquo;s
                        responsibility, but every worker should check that the
                        SDS is available.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Read the Key Sections
                      </p>
                      <p>
                        Check Sections 2, 4, 7, and 8 to understand the hazards,
                        first-aid measures, safe handling practices, and PPE
                        requirements. This should take no more than five minutes
                        for a familiar product type.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Feed Into the COSHH Assessment
                      </p>
                      <p>
                        The SDS provides the raw hazard data needed for the
                        COSHH risk assessment. Section 8 gives you the exposure
                        limits and PPE specifications; Section 2 gives you the
                        hazard classification; Section 7 gives you the handling
                        and storage requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Implement the Controls
                      </p>
                      <p>
                        Based on the SDS and the COSHH assessment, put the
                        required controls in place: engineering controls
                        (ventilation), administrative controls (safe working
                        procedures), and PPE. Ensure all workers using the
                        substance are briefed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Know the Emergency Procedures
                      </p>
                      <p>
                        Sections 4 (first-aid) and 6 (spill response) provide
                        the emergency information. Everyone using the substance
                        should know what to do in the event of skin contact, eye
                        contact, inhalation, or a spill &mdash; before an
                        incident occurs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Dispose Correctly
                      </p>
                      <p>
                        Section 13 tells you how to dispose of the substance and
                        its container. Never pour chemicals down drains or put
                        them in general waste. Follow the disposal instructions
                        and local regulations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Keep SDS Documents Up to Date
                      </p>
                      <p>
                        Check the revision date in Section 16 periodically.
                        Request updated copies from your supplier when new
                        versions are issued. An out-of-date SDS may contain
                        incorrect hazard classifications or outdated PPE
                        recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    The Bottom Line:
                  </strong>{" "}
                  A Safety Data Sheet is only useful if it is read, understood,
                  and acted upon. The most comprehensive SDS in the world
                  provides zero protection if it stays in a filing cabinet. Make
                  SDS review a routine part of every COSHH assessment, every
                  toolbox talk about chemical hazards, and every induction for
                  new workers. If you do not have the SDS for a substance you
                  are using &mdash; stop, find it, and read it before
                  continuing.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Remember
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  You have the <strong>legal right</strong> to see the Safety
                  Data Sheet for any hazardous substance you are asked to use at
                  work. Under the COSHH Regulations, your employer must provide
                  information, instruction, and training about the substances
                  you work with &mdash; and the SDS is the starting point for
                  all of that. If you are asked to use a substance and no SDS
                  is available, you are within your rights to refuse until one
                  is provided.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: COSHH Risk Assessment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-2-section-4">
              Next: Workplace Exposure Limits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
