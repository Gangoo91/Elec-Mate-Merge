import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertTriangle,
  Shield,
  ClipboardCheck,
  Building2,
  Home,
  Gavel,
  FileText,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "cdm-client-reg4-arrangements",
    question:
      "Under Regulation 4 of the CDM Regulations 2015, what is the commercial client's overarching duty regarding project management?",
    options: [
      "To make suitable arrangements for managing the project, including the allocation of sufficient time and other resources",
      "To personally supervise all construction work on site every day",
      "To appoint a health and safety consultant for every project regardless of size",
      "To ensure all workers hold a CSCS card before starting work",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 4(1) requires the client to make suitable arrangements for managing a project, including the allocation of sufficient time and other resources. These arrangements must be maintained and reviewed throughout the project. This is the client's overarching duty — it sets the framework within which the principal designer, principal contractor, and all other duty holders operate. The arrangements must be proportionate to the risks and complexity of the project.",
  },
  {
    id: "cdm-client-pci-duty",
    question:
      "Under Regulation 4(4) of the CDM Regulations 2015, what must the client provide before the construction phase begins?",
    options: [
      "Pre-construction information relevant to the project",
      "A complete health and safety file for the finished structure",
      "An approved building control certificate",
      "Insurance cover for every contractor on site",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 4(4) requires the client to provide pre-construction information as soon as is practicable to every designer and contractor appointed, or being considered for appointment, to the project. This information must be relevant to the work and include everything the client knows (or could reasonably find out) that is needed to plan, manage, and coordinate the work safely. This includes existing health and safety information, surveys, the asbestos register, and any previous health and safety file.",
  },
  {
    id: "cdm-domestic-client-transfer",
    question:
      "Under the CDM Regulations 2015, what happens to a domestic client's duties when only a single contractor is appointed?",
    options: [
      "The duties transfer automatically to the contractor",
      "The domestic client retains all duties in full",
      "The duties transfer to the local authority",
      "A principal designer must be appointed to take them on",
    ],
    correctIndex: 0,
    explanation:
      "Under Regulation 7(1), where a domestic client has not appointed a principal designer, and only one contractor is working on the project, the client duties under Regulations 4(1)–(7) and Regulations 6 transfer automatically to the contractor. This means the contractor takes on the client's responsibilities for managing the project, providing pre-construction information, and ensuring welfare facilities. If more than one contractor is involved, the duties transfer to the principal contractor instead. Alternatively, a domestic client may appoint a designer or principal designer in writing to take on their duties.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Can the client delegate their CDM duties to a project manager or consultant?",
    answer:
      "No. The CDM Regulations 2015 place the duties directly on the client, and they cannot be delegated. The client can appoint competent people to help them fulfil their duties — for example, a project manager, CDM adviser, or health and safety consultant — but the legal responsibility remains with the client at all times. If the HSE investigates a failure, it is the client who will be held accountable for not making suitable arrangements, not the adviser they appointed. This is a fundamental change from the CDM 2007 Regulations, where a CDM coordinator could appear to absorb some of the client's risk. Under CDM 2015, the client must be actively engaged.",
  },
  {
    question:
      "What happens if the client fails to appoint a principal designer or principal contractor?",
    answer:
      "If the client fails to appoint a principal designer or principal contractor before the construction phase begins on a project involving more than one contractor, they are in breach of Regulation 5. In practice, this means the client retains all the duties of the missing duty holder — they become the default PD or PC. This is a serious position to be in, because the client is unlikely to have the skills, knowledge, experience, or organisational capability to carry out these roles. The HSE views failure to make appointments as a clear indicator that the client has not made suitable arrangements for managing the project.",
  },
  {
    question:
      "Does a developer who sells properties before construction is complete still count as a client?",
    answer:
      "Yes. Anyone for whom a construction project is carried out is a client under the CDM Regulations. A developer who commissions the construction of houses or flats is the client from the moment they commission the work, regardless of whether they intend to sell the properties before completion. If the developer sells the properties and the construction work continues under a new owner, the new owner may become the client from the date of transfer. However, the original developer remains responsible for any period during which they were the client. Developers cannot avoid CDM client duties by structuring their business through intermediary companies — the HSE will look at who is actually commissioning the work.",
  },
  {
    question:
      "How do CDM client duties apply when a managing agent commissions work on behalf of a building owner?",
    answer:
      "The client is the person for whom a construction project is carried out — in most cases, this is the building owner, not the managing agent. However, if the managing agent is given full authority and autonomy to commission and manage the project on their own behalf (rather than simply acting as an agent), they may be considered the client. In practice, the HSE will examine the contractual arrangements and the reality of the relationship to determine who is actually directing and controlling the project. Building owners cannot avoid client duties simply by appointing a managing agent unless that agent genuinely takes on full project responsibility. Best practice is for the building owner to acknowledge their client duties in writing and ensure the managing agent understands and supports them.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the CDM Regulations 2015, who is defined as 'the client'?",
    options: [
      "Only registered construction companies",
      "Any person for whom a construction project is carried out",
      "Only public bodies and local authorities",
      "The principal contractor on the project",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 2(1) defines the client as any person for whom a construction project is carried out. This is a broad definition that includes individuals, companies, partnerships, public bodies, developers, housing associations, and any other legal entity. The key question is: who is commissioning the construction work? That person (or organisation) is the client, regardless of whether they have any construction experience or expertise.",
  },
  {
    id: 2,
    question:
      "Under Regulation 4, which of the following is a specific duty of the commercial client?",
    options: [
      "Carrying out all risk assessments for the project",
      "Directly supervising all construction workers on site",
      "Making suitable arrangements for managing the project, including allocating sufficient time and resources",
      "Designing the temporary works for the construction phase",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 4(1) requires the client to make suitable arrangements for managing a project, including the allocation of sufficient time and other resources. The client does not need to carry out risk assessments themselves (that is for designers and contractors), supervise workers directly (that is the principal contractor's role), or design temporary works (that is for designers and specialists). The client's role is strategic — ensuring the right people, time, and resources are in place for safe project delivery.",
  },
  {
    id: 3,
    question:
      "What must pre-construction information (PCI) provided by the client include?",
    options: [
      "Only the project budget and timeline",
      "Relevant health and safety information including existing surveys, the asbestos register, and any previous health and safety file",
      "Only the names of proposed contractors",
      "A complete construction phase plan",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4(4) requires the client to provide pre-construction information that is relevant to the project. This must include all information the client holds (or could reasonably obtain) about the existing site or structure, including structural surveys, asbestos surveys and the asbestos register, contamination reports, underground services records, previous health and safety files, information about existing structures and hazards, and anything else relevant to planning the work safely. The construction phase plan is the principal contractor's responsibility, not the client's.",
  },
  {
    id: 4,
    question:
      "Under Regulation 5, when must the client appoint a principal designer and principal contractor?",
    options: [
      "Within 7 days of construction starting",
      "Before the construction phase begins, in writing",
      "Only after an HSE inspection request",
      "Only if the project exceeds 500 construction days",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 5(1) requires the client to appoint a principal designer and a principal contractor in writing as soon as is practicable, and in any event before the construction phase begins. This must happen on any project where more than one contractor will be working. The appointments must be made in writing and the client must be satisfied that the appointees have the skills, knowledge, experience, and organisational capability to carry out their roles. There is no project size threshold — the duty applies to all multi-contractor projects.",
  },
  {
    id: 5,
    question:
      "What must the client ensure before construction work begins on site?",
    options: [
      "That all workers have completed a university degree in construction",
      "That welfare facilities including toilets, washing facilities, and rest areas are provided",
      "That the project has been approved by the local MP",
      "That a CDM coordinator has been appointed",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4(8) requires the client to ensure that welfare facilities are provided before any construction work begins. Schedule 2 of the regulations sets out the minimum standards, including toilets, washing facilities (with hot and cold running water), changing facilities, rest areas with seating and the means to heat food and boil water, and drinking water. These must be in place from day one — it is not acceptable to start construction and then arrange welfare facilities later. The role of CDM coordinator was abolished under CDM 2015 and replaced by the principal designer.",
  },
  {
    id: 6,
    question:
      "What skills must the client be satisfied that a principal designer or principal contractor possesses before appointing them?",
    options: [
      "Only formal academic qualifications in construction management",
      "Skills, knowledge, experience, and organisational capability for the role",
      "Only a minimum of 20 years' industry experience",
      "A licence issued by the HSE specifically for CDM appointments",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 8(1) requires anyone appointing a designer or contractor to be satisfied that the appointee has the skills, knowledge, experience, and (where relevant) the organisational capability necessary to fulfil their role. The CDM 2015 Regulations moved away from the old competence assessment approach (which often relied on accreditation schemes) and instead require a practical assessment of whether the appointee can actually do the job. This includes their track record, the resources they can deploy, their health and safety management systems, and their understanding of the specific risks on the project.",
  },
  {
    id: 7,
    question:
      "Under the CDM Regulations 2015, how do a domestic client's duties transfer when more than one contractor is involved?",
    options: [
      "The duties remain with the domestic client at all times",
      "The duties transfer automatically to the principal contractor",
      "The duties transfer to the local building control officer",
      "The duties are cancelled — domestic projects are exempt from CDM",
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 7(1), where a domestic client has not made their own appointment of a principal designer, and the project involves more than one contractor, the client duties transfer automatically to the principal contractor. If only one contractor is involved, the duties transfer to that contractor. Domestic projects are not exempt from CDM 2015 — the regulations apply in full, but the mechanism for domestic clients ensures that a competent construction professional always holds the client duties, rather than leaving them with a homeowner who may have no construction knowledge.",
  },
  {
    id: 8,
    question:
      "What can happen to a client who fails to comply with their CDM duties?",
    options: [
      "Nothing — client duties are purely advisory",
      "They may receive a verbal warning but no formal action",
      "The HSE can serve enforcement notices, prosecute, and seek unlimited fines; directors may face personal liability",
      "Only the principal contractor can be held liable, never the client",
    ],
    correctAnswer: 2,
    explanation:
      "Client duties under the CDM Regulations are legally enforceable. The HSE can serve improvement notices and prohibition notices, and can prosecute clients who fail to comply. Penalties on conviction include unlimited fines for organisations and up to 2 years' imprisonment for individuals. Under the Sentencing Council guidelines for health and safety offences, fines are linked to turnover and culpability, meaning large clients can face very substantial penalties. Individual directors, partners, and officers can be personally prosecuted where a breach is attributable to their consent, connivance, or neglect. The HSE has successfully prosecuted clients in high-profile cases, making clear that ignorance of CDM duties is not a defence.",
  },
];

/* ──────────────────── Client duties checklist data ────────────────────── */

const clientDutiesChecklist = [
  {
    duty: "Make suitable arrangements",
    regulation: "Reg 4(1)",
    detail: "Manage the project with suitable arrangements proportionate to the risks, including allocating sufficient time and resources",
    icon: "clipboard",
  },
  {
    duty: "Maintain and review arrangements",
    regulation: "Reg 4(2)",
    detail: "Keep arrangements under review throughout the project and revise them where necessary",
    icon: "refresh",
  },
  {
    duty: "Provide pre-construction information",
    regulation: "Reg 4(4)",
    detail: "Provide all relevant health and safety information to designers and contractors as soon as practicable",
    icon: "file",
  },
  {
    duty: "Ensure welfare facilities",
    regulation: "Reg 4(8)",
    detail: "Ensure welfare facilities (toilets, washing, rest, changing) are provided before construction begins",
    icon: "building",
  },
  {
    duty: "Appoint PD and PC",
    regulation: "Reg 5",
    detail: "Appoint a principal designer and principal contractor in writing before the construction phase begins",
    icon: "users",
  },
  {
    duty: "Ensure appointee capability",
    regulation: "Reg 8",
    detail: "Be satisfied that appointees have the skills, knowledge, experience, and organisational capability to carry out their roles",
    icon: "shield",
  },
  {
    duty: "Ensure construction phase plan",
    regulation: "Reg 12(1)",
    detail: "Ensure the principal contractor draws up a construction phase plan before the construction phase begins",
    icon: "plan",
  },
  {
    duty: "Ensure H&S file is prepared",
    regulation: "Reg 12(5)",
    detail: "Ensure the principal designer prepares, reviews, updates, and revises the health and safety file and that it is handed over at the end of the project",
    icon: "folder",
  },
];

/* ──────── Commercial vs Domestic client comparison data ─────────────── */

const clientComparison = [
  {
    aspect: "Definition",
    commercial: "Any client that is not a domestic client — includes businesses, public bodies, developers, housing associations, charities",
    domestic: "A person for whom construction work is done on their own home (or a family member's home), not in connection with any business",
  },
  {
    aspect: "CDM duties apply?",
    commercial: "Yes — full client duties under Regulations 4, 5, 6, and 8 apply directly",
    domestic: "Yes — but duties transfer automatically to the contractor (single) or principal contractor (multiple), unless the client elects in writing to appoint a PD to take them on",
  },
  {
    aspect: "Appointments required?",
    commercial: "Must appoint PD and PC in writing before construction phase begins (multi-contractor projects)",
    domestic: "No obligation to appoint PD or PC themselves — duties transfer automatically. May appoint PD in writing if they choose",
  },
  {
    aspect: "Pre-construction information",
    commercial: "Must proactively provide PCI to all designers and contractors",
    domestic: "Duty transfers to the contractor/PC, but the homeowner should provide what they know (surveys, asbestos information) when asked",
  },
  {
    aspect: "Welfare facilities",
    commercial: "Must ensure welfare facilities are in place before construction begins",
    domestic: "Duty transfers to the contractor/PC — they must arrange welfare (often existing household facilities or temporary provision)",
  },
  {
    aspect: "HSE enforcement",
    commercial: "Directly enforceable against the commercial client — improvement notices, prohibition notices, prosecution",
    domestic: "Duties sit with the contractor/PC, so enforcement action would be directed at them, not the homeowner (unless the homeowner has elected to retain duties)",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CdmRegulationsModule2Section1() {
  useSEO({
    title:
      "The Client | CDM Regulations Module 2 Section 1",
    description:
      "Understand the role and duties of the client under the CDM Regulations 2015, including Regulation 4 duties, pre-construction information, appointing duty holders, welfare facilities, domestic client provisions, and client accountability.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Users className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Client
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            The client&rsquo;s role and duties under the CDM Regulations 2015 &mdash; who qualifies as a client,
            commercial and domestic duties, appointing duty holders, providing pre-construction information,
            and accountability for health and safety
          </p>
        </div>

        {/* ─── 01 Who Is the Client? ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            Who Is the Client?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
              <p className="font-semibold text-base text-blue-400 mb-2">Regulation 2 Definition</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    The <strong>client</strong> is defined as any person for whom a <strong>construction project
                    is carried out</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    This is a <strong>broad definition</strong> &mdash; it includes anyone who commissions
                    construction work, regardless of their construction knowledge or experience.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    There is <strong>no minimum project size or value</strong> &mdash; even a small refurbishment
                    has a client.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    The CDM Regulations distinguish between <strong>commercial clients</strong> and{" "}
                    <strong>domestic clients</strong> (homeowners).
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
              <p className="font-semibold text-base text-blue-400 mb-2">Who Can Be a Client?</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Individual:</strong> A private homeowner commissioning an extension, a landlord
                    commissioning repairs, a sole trader fitting out premises
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Company:</strong> A business commissioning office refurbishment, a retail chain
                    fitting out new stores, a factory owner building an extension
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Public body:</strong> A local authority, NHS trust, government department, school,
                    or university commissioning building work
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Developer:</strong> A property developer commissioning the construction of new
                    housing, commercial, or mixed-use developments
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 Commercial Client Duties ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">02</span>
              Commercial Client Duties
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Regulation 4 sets out the core duties of the commercial client. These duties apply to every
                client that is not a domestic client &mdash; meaning any business, public body, developer,
                charity, housing association, or other organisation that commissions construction work.
                The client&rsquo;s duties are strategic and overarching: they set the conditions within which
                the entire project team operates.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <h3 className="text-blue-400 font-medium">Regulation 4 &mdash; Core Client Duties</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Make suitable arrangements (Reg 4(1)):</strong> The client must make suitable
                      arrangements for managing the project, including the allocation of sufficient time and
                      other resources. &ldquo;Suitable arrangements&rdquo; means arrangements that are
                      proportionate to the risks and complexity of the project &mdash; a major new-build
                      hospital requires far more elaborate arrangements than a small office refurbishment.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Maintain and review (Reg 4(2)):</strong> The arrangements must be maintained
                      and reviewed throughout the life of the project. A plan made at the outset but never
                      revisited is not compliant. As the project evolves &mdash; scope changes, new risks
                      emerge, contractors change &mdash; the arrangements must be updated accordingly.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Ensure welfare facilities (Reg 4(8)):</strong> The client must ensure that
                      welfare facilities are provided before any construction work begins. This means toilets,
                      washing facilities, rest areas, changing facilities, and drinking water must be in place
                      on or accessible from the site from the very first day of construction. Schedule 2 of
                      the regulations sets out the minimum standards.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">What &ldquo;Suitable Arrangements&rdquo; Looks Like</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  The HSE&rsquo;s guidance (L153) makes clear that &ldquo;suitable arrangements&rdquo; includes:
                  appointing the right people at the right time, ensuring adequate communication between duty holders,
                  allowing realistic timescales that do not compress health and safety planning, providing a
                  proportionate budget for health and safety measures, establishing clear lines of responsibility,
                  and ensuring cooperation between all parties. A client who simply appoints the cheapest contractor
                  and leaves everything to them has <strong className="text-white">not</strong> made suitable
                  arrangements.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Pre-Construction Information ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">03</span>
              Client Must Provide Pre-Construction Information
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Regulation 4(4) requires the client to provide pre-construction information (PCI) as soon
                as is practicable to every designer and contractor appointed, or being considered for
                appointment, to the project. The PCI is one of the most important documents in the CDM
                framework &mdash; it allows designers and contractors to understand the risks before they
                start work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <h3 className="text-blue-400 font-medium">What PCI Must Include</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Existing health and safety information:</strong> Any information the client
                      holds about the existing site or structure that is relevant to health and safety.
                      This includes the structural condition of buildings, known contamination, underground
                      services, and any other hazards.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Surveys and reports:</strong> Structural surveys, geotechnical surveys,
                      contamination surveys, condition surveys, ecological surveys, and any other
                      investigations that have been carried out on the site or structure.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Asbestos register and management plan:</strong> Under the Control of Asbestos
                      Regulations 2012, the duty holder for non-domestic premises must maintain an asbestos
                      register and management plan. This information is critical PCI &mdash; contractors
                      must know where asbestos-containing materials are located before they start work.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Previous health and safety file:</strong> If the building or structure already
                      has a health and safety file from previous CDM projects, this must be made available.
                      The file contains information about how the building was constructed, what materials
                      were used, and any residual risks for future maintenance or alteration.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Information about existing services:</strong> Details of electrical, gas,
                      water, drainage, telecommunications, and other services on and adjacent to the site,
                      including underground services drawings and records.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">The &ldquo;Could Reasonably Obtain&rdquo; Test</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  The client&rsquo;s duty is not limited to information they already possess. Regulation 4(4)
                  requires the client to provide information that is &ldquo;relevant to the work&rdquo; and
                  that they know about or <strong className="text-white">could reasonably find out</strong>.
                  This means the client cannot simply claim ignorance. If a reasonable client in their position
                  would have commissioned a survey or obtained certain records, then the failure to do so is
                  itself a breach. For example, a client refurbishing a 1970s office block cannot claim they
                  did not know about asbestos &mdash; a reasonable client would have commissioned an asbestos
                  survey before any work began.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Appointing Duty Holders ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Appointing Duty Holders
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                One of the client&rsquo;s most important duties under the CDM Regulations is appointing the
                right people to manage design and construction. Regulation 5 requires the client to appoint
                a <strong>principal designer (PD)</strong> and a <strong>principal contractor (PC)</strong>{" "}
                for any project involving more than one contractor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <h3 className="text-blue-400 font-semibold">Principal Designer (PD)</h3>
                  </div>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Must be a designer (an organisation or individual) with <strong>control over the
                        pre-construction phase</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Coordinates health and safety matters during the <strong>design phase</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Prepares, reviews, and updates the <strong>health and safety file</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Must be appointed <strong>in writing</strong> before the construction phase begins
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <h3 className="text-blue-400 font-semibold">Principal Contractor (PC)</h3>
                  </div>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Must be a contractor with <strong>control over the construction phase</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Plans, manages, monitors, and coordinates the <strong>construction phase</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Prepares the <strong>construction phase plan</strong> before work begins
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Must be appointed <strong>in writing</strong> before the construction phase begins
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Ensuring Skills, Knowledge &amp; Experience</h3>
                <div className="space-y-3 text-sm">
                  <p className="leading-relaxed">
                    Regulation 8(1) requires the client (and anyone else making an appointment) to take
                    reasonable steps to satisfy themselves that the appointee has the necessary:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Skills:</strong> The technical abilities needed to carry out the specific role
                      on the specific project &mdash; not just generic construction skills.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Knowledge:</strong> Understanding of the relevant legislation, standards,
                      and industry guidance, as well as the specific risks and challenges of the project.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Experience:</strong> A track record of successfully carrying out similar roles
                      on projects of comparable size, complexity, and risk.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Organisational capability:</strong> The resources, management systems, and
                      organisational structure to deliver the role effectively &mdash; not just the right
                      individuals, but the right infrastructure to support them.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Written Appointments Are Mandatory</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Appointments must be made <strong className="text-white">in writing</strong>. A verbal
                  agreement or an assumption that someone is acting as PD or PC is not sufficient. The
                  written appointment should clearly identify the project, the role being appointed to,
                  the scope of the appointment, and the date from which it takes effect. In the event of
                  an incident, the HSE will ask to see the written appointment &mdash; if it does not exist,
                  the client has breached Regulation 5.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Ensuring Sufficient Time & Resources ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Ensuring Sufficient Time &amp; Resources
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The client&rsquo;s duty to allocate sufficient time and resources is one of the most
                important but frequently overlooked aspects of CDM 2015. The HSE has consistently identified
                unrealistic timescales and inadequate budgets as root causes of construction health and
                safety failures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <h3 className="text-blue-400 font-medium">Time &amp; Resources &mdash; What the Client Must Do</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Allow adequate time for design:</strong> The design phase must not be
                      compressed to the point where designers cannot properly consider health and safety
                      risks. Rushing the design inevitably leads to incomplete risk management, inadequate
                      buildability reviews, and hazards being designed into the project.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Allow adequate time for planning:</strong> The principal contractor needs
                      sufficient time to develop the construction phase plan, coordinate with subcontractors,
                      carry out site-specific risk assessments, and brief the workforce before construction
                      begins.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Not squeeze timelines:</strong> Imposing unrealistic deadlines or accelerating
                      the programme in a way that compromises health and safety planning is a breach of
                      Regulation 4(1). The client cannot demand that contractors &ldquo;make it work&rdquo;
                      within a timeframe that does not allow for safe working.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Provide adequate budget:</strong> The client must allocate sufficient financial
                      resources for health and safety measures. This includes welfare facilities, temporary
                      works, protective equipment, traffic management, dust suppression, noise control, and
                      any other health and safety measures identified in the risk assessments.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Recognise cost pressures:</strong> The HSE understands that construction
                      operates in a competitive market, but this does not excuse cutting health and safety
                      budgets. A client who selects the cheapest tender knowing that it does not include
                      adequate provision for health and safety has not made suitable arrangements.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Real-World Impact</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Many serious construction accidents can be traced back to the client imposing unrealistic
                  timescales. When workers are under pressure to meet a deadline, they take shortcuts &mdash;
                  skipping scaffolding, working in poor weather, removing safety barriers, working excessive
                  hours, and failing to follow method statements. The client who created that pressure bears
                  a significant share of the responsibility. The HSE has prosecuted clients specifically for
                  failing to allow sufficient time for safe project delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Ensuring Welfare Facilities ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">06</span>
              Ensuring Welfare Facilities
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Regulation 4(8) places a specific duty on the client to ensure that welfare facilities are
                provided before any construction work begins. This is a non-delegable duty &mdash; while
                the principal contractor will typically arrange the physical provision of welfare facilities,
                the <strong>client</strong> must ensure they are actually in place before work starts.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Schedule 2 Minimum Standards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold text-xs uppercase tracking-wider mb-2">
                      Sanitary Facilities
                    </p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Sufficient number of suitable toilets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Washing facilities with hot and cold (or warm) running water</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Soap and means of drying hands</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Adequate ventilation and lighting</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold text-xs uppercase tracking-wider mb-2">
                      Rest &amp; Changing
                    </p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Rest areas with seating and tables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Means to heat food and boil water</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Changing facilities and lockers for personal clothing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Supply of wholesome drinking water</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Day One Requirement</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  This is a <strong className="text-white">&ldquo;before construction begins&rdquo;</strong>{" "}
                  requirement &mdash; not &ldquo;as soon as practicable after starting&rdquo;. Workers must
                  have access to toilets, washing, rest, and changing facilities from the very first day of
                  construction activity. It is not acceptable to start demolition or groundworks and arrange
                  welfare a few days later. The HSE has issued prohibition notices where construction has
                  started without welfare facilities in place. On smaller projects, the client and contractor
                  should agree before work starts how welfare will be provided &mdash; whether through
                  temporary cabins, nearby premises, or existing facilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── Client Duties Checklist Diagram ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
              Client Duties Checklist
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed text-sm text-white/80">
                A visual summary of the client&rsquo;s key duties under the CDM Regulations 2015.
                Each duty includes the relevant regulation reference.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardCheck className="h-5 w-5 text-blue-400" />
                  <h3 className="text-blue-300 font-semibold">CDM 2015 &mdash; Client Duties at a Glance</h3>
                </div>
                <div className="space-y-0 relative">
                  {/* Vertical connector line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-blue-500/30" />

                  {clientDutiesChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 py-3 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center flex-shrink-0 z-10 bg-[#1a1a1a]">
                        <span className="text-blue-400 text-xs font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                          <p className="text-blue-300 font-semibold text-sm">{item.duty}</p>
                          <span className="text-white/40 text-xs">{item.regulation}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Domestic Client Duties ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">07</span>
              Domestic Client Duties
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                A domestic client is a person for whom construction work is done on their own home (or the
                home of a family member), where the work is <strong>not done in connection with any
                business</strong>. The CDM Regulations 2015 apply in full to domestic projects, but a
                special mechanism ensures that a competent construction professional always holds the
                client duties &mdash; rather than leaving them with a homeowner who may have no
                construction knowledge.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <h3 className="text-blue-400 font-medium">How Domestic Client Duties Transfer</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Single contractor:</strong> Where only one contractor is carrying out the
                      work, the client duties under Regulations 4(1)&ndash;(7) and Regulation 6 transfer
                      automatically to that contractor. The contractor becomes responsible for managing
                      the project, providing pre-construction information, and ensuring welfare.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Multiple contractors:</strong> Where more than one contractor is involved,
                      the client duties transfer automatically to the <strong>principal contractor</strong>.
                      The PC takes on the full burden of the client&rsquo;s duties in addition to their
                      own PC duties.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Optional written appointment:</strong> Alternatively, a domestic client may
                      appoint a <strong>designer or principal designer in writing</strong> to take on their
                      client duties. This is entirely voluntary &mdash; the domestic client is not required
                      to do this, but it gives them the option of placing the duties with a design
                      professional they trust.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">What This Means for Electricians</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      If you are the <strong>sole contractor</strong> on a domestic project (e.g. a full
                      rewire of a house), the homeowner&rsquo;s client duties transfer to you automatically.
                      You become responsible for managing the project safely, ensuring welfare, and
                      providing relevant health and safety information.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      If you are <strong>one of several contractors</strong> on a domestic project (e.g.
                      working alongside a builder and a plumber), the client duties transfer to whoever
                      has been appointed as principal contractor. If no one has been formally appointed,
                      the contractor in control of the construction phase is likely to be treated as the
                      de facto PC.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      Even though the homeowner&rsquo;s duties transfer, you should still ask them for
                      any relevant information they hold &mdash; asbestos surveys, electrical installation
                      certificates, building plans, and information about any known hazards.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Landlord vs Homeowner</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  A <strong className="text-white">landlord</strong> who commissions construction work on
                  a rental property is <strong className="text-white">not</strong> a domestic client &mdash;
                  they are a commercial client, because the work is done in connection with their business
                  of letting property. This means the full commercial client duties apply. The domestic
                  client provisions only apply where the homeowner commissions work on their own home (or a
                  family member&rsquo;s home) and the work is not connected to any business activity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Commercial vs Domestic Client Comparison Diagram ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
              Commercial vs Domestic Client Comparison
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed text-sm text-white/80">
                The following comparison highlights the key differences between commercial and domestic
                client duties under the CDM Regulations 2015.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-blue-500/20 px-3 py-2">
                  <span className="text-blue-300 font-semibold text-xs uppercase tracking-wider">Aspect</span>
                  <span className="text-blue-300 font-semibold text-xs uppercase tracking-wider">Commercial Client</span>
                  <span className="text-blue-300 font-semibold text-xs uppercase tracking-wider">Domestic Client</span>
                </div>
                {clientComparison.map((row, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 px-3 py-3 text-sm ${
                      idx % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    } ${idx < clientComparison.length - 1 ? "border-b border-white/5" : ""}`}
                  >
                    <span className="text-blue-300 font-medium text-xs pr-2">{row.aspect}</span>
                    <span className="text-white/80 text-xs pr-2">{row.commercial}</span>
                    <span className="text-white/80 text-xs">{row.domestic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Client Accountability ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              Client Accountability
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The CDM Regulations 2015 made a deliberate shift towards greater client accountability.
                The HSE expects clients to be actively engaged in health and safety management, not passive
                bystanders who leave everything to the contractor. Clients who fail to fulfil their duties
                face serious consequences.
              </p>

              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <h3 className="text-amber-400 font-semibold">HSE Expectations</h3>
                  </div>
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span>Clients must take an <strong className="text-white">active role</strong> in ensuring health and safety &mdash; not simply sign documents and leave everything to others</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span>The HSE will ask: <strong className="text-white">&ldquo;What did the client do to satisfy themselves that the arrangements were suitable?&rdquo;</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span>Ignorance is not a defence &mdash; clients are expected to <strong className="text-white">understand their duties</strong> and seek competent advice where needed</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span>The HSE publishes sector-specific guidance on client duties and expects clients to be familiar with it</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <h3 className="text-red-400 font-semibold">Prosecution Examples</h3>
                  </div>
                  <div className="space-y-3 text-sm text-white/80">
                    <p className="leading-relaxed">
                      The HSE has successfully prosecuted clients in high-profile cases:
                    </p>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Failure to appoint:</strong> Clients prosecuted for
                        failing to appoint a PD or PC before the construction phase began, leaving no one
                        in overall control of health and safety on multi-contractor projects.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Failure to provide PCI:</strong> Clients prosecuted
                        for not providing information about asbestos, underground services, or structural
                        conditions, leading to workers being exposed to serious risks they were unaware of.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Unrealistic timescales:</strong> Clients prosecuted
                        where their insistence on compressed programmes directly contributed to unsafe
                        working practices and serious injuries.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-white">No welfare facilities:</strong> Clients prosecuted
                        for allowing construction work to start without adequate welfare provision &mdash;
                        one of the most straightforward CDM breaches to identify and enforce.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-lg">
                  <h3 className="text-red-300 font-semibold mb-2">Director Responsibilities &amp; Personal Liability</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Where the client is a company, the duties are placed on the company as a legal entity.
                    However, <strong className="text-white">individual directors, partners, and officers</strong>{" "}
                    can be personally prosecuted under Section 37 of the Health and Safety at Work etc. Act
                    1974 where a breach is attributable to their consent, connivance, or neglect.
                  </p>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Unlimited fines</strong> for organisations under the Sentencing Council
                        guidelines, linked to turnover and culpability.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Up to 2 years&rsquo; imprisonment</strong> for individuals convicted of
                        health and safety offences.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Corporate manslaughter</strong> charges under the Corporate Manslaughter
                        and Corporate Homicide Act 2007 where a gross management failure causes death.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong>CDM awareness training</strong> for client organisations is strongly
                        recommended by the HSE to ensure that those commissioning construction work
                        understand their duties and the consequences of non-compliance.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">The CDM Awareness Message</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  The overarching message of CDM 2015 is that construction health and safety starts with the
                  client. If the client sets the right conditions &mdash; appointing the right people,
                  allowing adequate time, providing full information, ensuring welfare, and maintaining
                  active oversight &mdash; the project is far more likely to be delivered safely. If the
                  client is disengaged, uninformed, or cost-cutting, the risks cascade down through the
                  supply chain. <strong className="text-white">Every construction professional</strong>,
                  including electricians, should understand client duties so they can recognise when a
                  client is (or is not) fulfilling their obligations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">09</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>client</strong> is any person for whom a construction project is carried
                      out &mdash; individuals, companies, public bodies, and developers all qualify.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Regulation 4</strong> requires the client to make suitable arrangements for
                      managing the project, maintain and review them, and ensure welfare facilities before
                      construction begins.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The client must provide <strong>pre-construction information</strong> (Reg 4(4))
                      including existing H&amp;S information, surveys, asbestos register, and previous
                      H&amp;S file.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The client must <strong>appoint a PD and PC in writing</strong> before the
                      construction phase begins (Reg 5) and ensure they have the skills, knowledge,
                      experience, and organisational capability to carry out their roles.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Clients must allow <strong>adequate time and resources</strong> &mdash; compressing
                      programmes or cutting budgets that compromise safety is a breach of Regulation 4.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Welfare facilities</strong> (toilets, washing, rest, changing) must be in
                      place before construction work begins (Reg 4(8), Schedule 2).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Domestic client</strong> duties transfer automatically to the contractor
                      (single) or PC (multiple), or the client can appoint a PD in writing to take them on.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Clients face <strong>serious accountability</strong> &mdash; HSE enforcement,
                      unlimited fines, director personal liability, and prosecution for non-compliance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">10</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="The Client — CDM Regulations Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-2-section-2">
              Next: The Principal Designer
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
