import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Shield, Users, HardHat, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hswa-section2",
    question: "Under Section 2 of HSWA 1974, what is the employer's general duty?",
    options: [
      "To carry out all work personally",
      "To ensure, so far as is reasonably practicable, the health, safety, and welfare of employees",
      "To provide unlimited safety equipment regardless of cost",
      "To report all accidents to the police"
    ],
    correctIndex: 1,
    explanation: "Section 2(1) states that every employer has a duty to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This is the broadest general duty in UK health and safety law."
  },
  {
    id: "cdm-principal-contractor",
    question: "Under CDM 2015, who is responsible for managing and planning the construction phase?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "The HSE"
    ],
    correctIndex: 2,
    explanation: "The principal contractor is responsible for planning, managing, and co-ordinating the construction phase. This includes ensuring that work at height, including tower scaffold work, is properly managed and that all contractors comply with site rules."
  },
  {
    id: "cdm-notification",
    question: "When must a construction project be notified to the HSE under CDM 2015?",
    options: [
      "All projects must be notified regardless of duration",
      "Only projects involving work at height",
      "Projects lasting more than 30 working days with more than 20 workers, or exceeding 500 person days",
      "Only projects over 1 million pounds in value"
    ],
    correctIndex: 2,
    explanation: "CDM 2015 requires notification to the HSE where a project is expected to last more than 30 working days and have more than 20 workers at any one time, or exceed 500 person days of construction work."
  }
];

const faqs = [
  {
    question: "How does HSWA 1974 apply to mobile scaffold tower work?",
    answer: "HSWA 1974 applies to all work activities, including tower scaffold work. Employers must ensure safe systems of work (Section 2), protect non-employees who may be affected (Section 3), and employees must co-operate and not endanger themselves or others (Sections 7 and 8). Tower work on any site falls within these general duties."
  },
  {
    question: "Do I need a CDM appointment for a small tower scaffold job?",
    answer: "CDM 2015 applies to all construction projects regardless of size. For projects with only one contractor, that contractor assumes the principal contractor duties automatically. The client always has duties, even on the smallest job. However, formal notification to the HSE is only required for larger projects exceeding the thresholds."
  },
  {
    question: "What is pre-construction information under CDM 2015?",
    answer: "Pre-construction information is data the client must provide to designers and contractors before work begins. For tower work this could include information about overhead services, ground conditions, asbestos, existing structures, restricted areas, and any site-specific hazards that could affect safe erection and use of a tower."
  },
  {
    question: "Can an employee refuse to work on a tower if they feel unsafe?",
    answer: "Yes. Under Section 7 of HSWA 1974, employees have a duty to take reasonable care of themselves and others. If an employee genuinely believes the tower is unsafe or they have not received adequate training, they should report the concern and not use the tower until it has been inspected or the issue resolved. Employers must not penalise employees for raising genuine safety concerns."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which section of HSWA 1974 places a general duty on employers to ensure employee health and safety?",
    options: ["Section 1", "Section 2", "Section 7", "Section 8"],
    correctAnswer: 1,
    explanation: "Section 2 of HSWA 1974 places the general duty on every employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees."
  },
  {
    id: 2,
    question: "Under HSWA Section 3, who does the employer owe a duty to besides their employees?",
    options: [
      "Only sub-contractors",
      "Only visitors to the premises",
      "Persons not in their employment who may be affected by the work",
      "Only members of the public on adjacent properties"
    ],
    correctAnswer: 2,
    explanation: "Section 3 requires employers to conduct their undertaking so as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety."
  },
  {
    id: 3,
    question: "What is the employee's duty under Section 7 of HSWA 1974?",
    options: [
      "To provide their own safety equipment",
      "To carry out risk assessments",
      "To take reasonable care of their own and others' health and safety",
      "To inspect all equipment before use"
    ],
    correctAnswer: 2,
    explanation: "Section 7 requires employees to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions at work."
  },
  {
    id: 4,
    question: "Under CDM 2015, who must appoint the principal designer and principal contractor?",
    options: [
      "The HSE",
      "The main contractor",
      "The client",
      "The designer"
    ],
    correctAnswer: 2,
    explanation: "The client has the duty to appoint a principal designer and principal contractor on projects involving more than one contractor. The client must make these appointments as soon as practicable and before the construction phase begins."
  },
  {
    id: 5,
    question: "What does CDM 2015 require the principal designer to do?",
    options: [
      "Physically build the structure",
      "Plan, manage, and co-ordinate health and safety in the pre-construction phase",
      "Carry out all risk assessments on site",
      "Inspect scaffolding every 7 days"
    ],
    correctAnswer: 1,
    explanation: "The principal designer plans, manages, and co-ordinates health and safety during the pre-construction phase, including identifying and eliminating or reducing risks through design decisions."
  },
  {
    id: 6,
    question: "Section 8 of HSWA 1974 makes it an offence to do what?",
    options: [
      "Work without a qualification",
      "Refuse to work at height",
      "Intentionally or recklessly interfere with or misuse safety provisions",
      "Report a safety concern to the HSE"
    ],
    correctAnswer: 2,
    explanation: "Section 8 makes it a criminal offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare. This includes removing guardrails from towers or disabling safety features."
  },
  {
    id: 7,
    question: "On a CDM-notifiable project, where must the F10 notification be displayed?",
    options: [
      "In the client's head office",
      "At the HSE office",
      "In the site office, visible to all workers",
      "It does not need to be displayed"
    ],
    correctAnswer: 2,
    explanation: "The F10 notification must be displayed in the construction site office where it is accessible and visible to workers. This ensures everyone on site knows the project has been notified and who the key duty holders are."
  },
  {
    id: 8,
    question: "Under CDM 2015, what must the client ensure regarding welfare facilities?",
    options: [
      "Welfare facilities are a nice-to-have",
      "Only large projects need welfare facilities",
      "Reasonable welfare facilities are provided throughout the construction phase",
      "The HSE provides welfare facilities"
    ],
    correctAnswer: 2,
    explanation: "Clients must ensure that reasonable welfare facilities are available throughout the construction phase. This includes toilets, washing facilities, drinking water, changing rooms, and rest areas."
  }
];

export default function IpafModule1Section2() {
  useSEO({
    title: "HSWA 1974 & CDM 2015 | IPAF Module 1.2",
    description: "Employer and employee duties under the Health and Safety at Work Act 1974, CDM 2015 duty holders, notification requirements, and how they apply to mobile tower scaffold work.",
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
            <Link to="../ipaf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <BookOpen className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            HSWA 1974 & CDM 2015
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            General duties under the Health and Safety at Work Act and Construction (Design and Management) Regulations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>HSWA:</strong> Overarching safety law &mdash; Sections 2, 3, 7, 8</li>
              <li><strong>CDM:</strong> Construction-specific duties for clients, designers, contractors</li>
              <li><strong>Tower work:</strong> Both apply whenever you use a tower on site</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Know:</strong> Who is the principal contractor and principal designer?</li>
              <li><strong>Check:</strong> Is the F10 displayed? Are welfare facilities provided?</li>
              <li><strong>Always:</strong> Report hazards, co-operate with site safety rules</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the key employer duties under HSWA Sections 2 and 3",
              "Describe employee duties under Sections 7 and 8",
              "Identify the CDM 2015 duty holders and their responsibilities",
              "Understand when CDM notification to the HSE is required",
              "Explain how CDM applies to mobile scaffold tower work",
              "Understand pre-construction information requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: HSWA 1974 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Health and Safety at Work Act 1974
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety at Work etc. Act 1974 (HSWA) is the primary piece of legislation
                covering occupational health and safety in Great Britain. It is an enabling Act, meaning
                it provides the framework under which more specific regulations (such as the Work at Height
                Regulations 2005 and CDM 2015) are made.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Scope:</strong> HSWA 1974 applies to all work
                  activities, all employers, all employees, the self-employed, and anyone who controls
                  premises where work takes place. It covers every workplace in Great Britain and is
                  enforced by the Health and Safety Executive (HSE) and local authorities.
                </p>
              </div>

              <p>
                HSWA operates on the principle of goal-setting rather than prescriptive rules. It sets out
                broad duties and objectives, leaving the specific methods of compliance to be determined
                by duty holders based on their circumstances. This makes it flexible enough to cover
                every type of work activity, from office work to high-risk construction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Features of HSWA 1974</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Criminal law &mdash; breaches can lead to prosecution, fines, and imprisonment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Enforced by the HSE and local authority environmental health departments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Places duties on employers, employees, the self-employed, designers, manufacturers, and importers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Enables the creation of subordinate regulations (e.g. WAHR 2005, CDM 2015)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum penalties include unlimited fines and up to 2 years imprisonment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Key HSWA Sections */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Sections: 2, 3, 7 & 8
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Four sections of HSWA 1974 are particularly relevant to mobile scaffold tower work. Every
                person on site, from the site manager to the apprentice, must understand these duties.
              </p>

              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Section 2 &mdash; Employer's Duty to Employees</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Every employer shall ensure, so far as is reasonably practicable, the health, safety,
                    and welfare at work of all their employees.
                  </p>
                  <div className="text-sm text-white/80 space-y-1">
                    <p><strong className="text-white">Section 2(2) includes:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>(a) Provision and maintenance of safe plant and systems of work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>(b) Safe use, handling, storage, and transport of articles and substances</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>(c) Provision of information, instruction, training, and supervision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>(d) Maintenance of a safe place of work with safe access and egress</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>(e) Provision and maintenance of a safe working environment and adequate welfare</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-teal-400" />
                    <p className="text-sm font-medium text-teal-400">Section 3 &mdash; Duty to Non-Employees</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Every employer shall conduct their undertaking so as to ensure, so far as is reasonably
                    practicable, that persons not in their employment are not exposed to risks to health or safety.
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">For tower work this means:</strong> You must consider the
                    safety of other contractors on site, visitors, members of the public walking past, and
                    anyone else who could be affected by your tower scaffold activities.
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Section 7 &mdash; Employee's Duty</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Every employee shall take reasonable care for their own health and safety and that of
                    other persons who may be affected by their acts or omissions at work.
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Employees must also:</strong> Co-operate with their employer
                    so far as is necessary to enable the employer to comply with their legal duties. This means
                    following training, using equipment correctly, and reporting defects.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Section 8 &mdash; Interference and Misuse</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    No person shall intentionally or recklessly interfere with or misuse anything provided
                    in the interests of health, safety, or welfare.
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Examples relating to tower work:</strong> Removing guardrails,
                    climbing the outside of a tower, removing outriggers, placing tools on the toe boards to
                    create a tripping hazard, or disabling wheel locks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: CDM 2015 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Construction (Design and Management) Regulations 2015
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction (Design and Management) Regulations 2015, commonly known as CDM 2015,
                are the primary regulations for managing health, safety, and welfare on construction
                projects in Great Britain. They apply to all construction work, no matter how small, and
                place duties on clients, designers, and contractors.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Change from CDM 2007:</strong> CDM 2015 removed the
                  CDM co-ordinator role and replaced it with the principal designer. It also made domestic clients
                  subject to CDM duties for the first time, although in practice these duties pass to the
                  contractor or principal contractor.
                </p>
              </div>

              <p>
                CDM 2015 applies to all "construction work," which is broadly defined and includes the
                erection, alteration, maintenance, and dismantling of structures. Mobile scaffold tower
                work on a construction site is covered by CDM, and the tower itself constitutes a
                temporary structure under the Regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">CDM 2015 Applies When:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Any construction work is carried out, regardless of project size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Work involves erection, alteration, repair, or dismantling of structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Temporary works (including scaffolding and towers) are used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Installation, maintenance, or removal of mechanical or electrical services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Site clearance, demolition, or preparation work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: CDM Duty Holders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CDM 2015 Duty Holders
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 identifies five key duty holders, each with specific responsibilities. Understanding
                who these duty holders are and what they must do is essential for anyone working on a
                construction site, including those assembling and using mobile scaffold towers.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Client</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The person or organisation for whom the construction work is carried out.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Make suitable arrangements for managing the project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide pre-construction information to designers and contractors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Appoint principal designer and principal contractor (multi-contractor projects)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure welfare facilities are provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Allow sufficient time and resources for safe construction</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-2">Principal Designer</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Plan, manage, and co-ordinate the pre-construction phase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Identify and eliminate or reduce risks through design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure designers comply with CDM duties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Prepare the health and safety file</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Liaise with the principal contractor</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-2">Designer</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Eliminate hazards through design where possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Reduce risks that cannot be eliminated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Provide information about remaining risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Consider maintenance and cleaning access in design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Co-ordinate with other designers and the PD</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-2">Principal Contractor</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Plan, manage, and co-ordinate the construction phase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Prepare the construction phase plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Organise co-operation between contractors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure site induction is provided</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure compliance with site rules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Consult and engage with workers on H&S</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-teal-400 mb-2">Contractor</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Plan, manage, and monitor own work safely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure workers are competent and trained</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Comply with the construction phase plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Co-operate with the principal contractor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Report any safety concerns or incidents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Provide relevant information to the PC</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Workers:</strong> CDM 2015 also places duties on
                  individual workers. Every worker must be consulted on health and safety matters, report
                  unsafe conditions, and co-operate with others. Workers must not misuse anything provided
                  for their health and safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: CDM and Tower Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            How CDM Applies to Tower Scaffold Work
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile scaffold towers are classified as temporary works under CDM 2015. This means the
                erection, use, and dismantling of towers must be planned and managed as part of the
                overall construction phase plan. Several CDM requirements have direct implications for
                tower work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">CDM Requirements Specific to Tower Work</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-cyan-400">Construction Phase Plan:</strong> Must include details of how towers will be managed, including assembly/dismantling methods, inspection schedules, and competence requirements.</p>
                  <p><strong className="text-cyan-400">Co-ordination:</strong> The principal contractor must ensure that tower work does not conflict with other site activities. For example, crane operations must be co-ordinated with tower locations.</p>
                  <p><strong className="text-cyan-400">Information Flow:</strong> Designers must communicate any specific requirements for access equipment, and contractors must share details of tower positions and working heights with the PC.</p>
                  <p><strong className="text-cyan-400">Competence:</strong> CDM requires that everyone involved is competent. For tower work, this means PASMA-trained operatives for assembly and dismantling.</p>
                  <p><strong className="text-cyan-400">Welfare:</strong> Adequate welfare facilities must be accessible to tower workers, including at height where practicable.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Design Considerations for Towers</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can the design reduce the need for work at height?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Are there permanent access solutions that avoid towers?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Has the designer specified access requirements?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Are there structural constraints affecting tower placement?</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Construction Phase Plan Content</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower locations and working platform heights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assembly and dismantling sequence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Inspection schedule and competent inspector details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Risk assessments and method statements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Notification Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            CDM Notification Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all construction projects need to be notified to the HSE. Notification is required
                only for larger projects that meet specific thresholds. However, all CDM duties apply
                regardless of whether notification is required.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Notification Thresholds (F10)</p>
                <p className="text-sm text-white/80 mb-2">A project must be notified to the HSE if it meets either of these conditions:</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Threshold 1:</strong> The construction phase will last more than 30 working days <strong>AND</strong> have more than 20 workers working simultaneously at any point.</p>
                  <p><strong className="text-white">Threshold 2:</strong> The construction work will exceed 500 person days in total.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">F10 Notification Must Include:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Date of forwarding the notice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Address of the construction site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Name and address of the client</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Type of project and description of work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Name of the principal designer and principal contractor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Planned start date and expected duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Estimated maximum number of workers on site at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Number of contractors expected to work on the project</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important Note</p>
                </div>
                <p className="text-sm text-white/80">
                  Even if a project does not need to be notified, CDM 2015 still applies in full. The client
                  still has duties, contractors must still be competent, and work must still be properly planned
                  and managed. Notification is simply an additional administrative requirement for larger projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Pre-Construction Information */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Pre-Construction Information
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The client must provide pre-construction information (PCI) to every designer and contractor
                as soon as practicable before the construction phase begins. This information helps
                designers and contractors to plan their work safely, including the selection and use of
                access equipment such as mobile scaffold towers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">PCI Relevant to Tower Work Includes:</p>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-medium text-purple-400 mb-2">Site Information</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ground conditions and bearing capacity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Overhead services (power lines, pipes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Underground services locations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Existing structures and their condition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Access restrictions or limitations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400 mb-2">Hazard Information</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Asbestos survey results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Contaminated land information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Height restrictions (indoor clearances)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Environmental hazards (exposed locations)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Neighbouring activities and access issues</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Good pre-construction information allows the contractor to select the right type and
                configuration of tower for the task. For example, knowing that the ground is soft clay
                means planning for larger base plates or sole boards, whilst knowing there are overhead
                power lines means establishing exclusion zones and potentially selecting a lower tower
                configuration.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Practical On-Site Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Practical On-Site Guidance
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-teal-400 mb-2">Your HSWA Duties in Practice</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Always follow the safe system of work provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report any defects or hazards immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Never remove or modify safety equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Co-operate with your employer on safety matters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use equipment only as trained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>If in doubt, stop and ask</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">Your CDM Duties in Practice</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Attend the site induction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the construction phase plan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Co-ordinate your tower work with other trades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report changes that affect the plan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure your PASMA card is valid and on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maintain inspection records as required</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Consequences of Non-Compliance</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">HSWA Penalties</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Unlimited fines for organisations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Up to 2 years imprisonment for individuals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Improvement and prohibition notices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Personal liability for directors</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">CDM Penalties</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Unlimited fines for duty holders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Prohibition notices stopping all work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Criminal prosecution for serious breaches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Corporate manslaughter charges in worst cases</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
            <Link to="../ipaf-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Work at Height Regs
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-1-section-3">
              Next: BS EN 1004-1:2020
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
