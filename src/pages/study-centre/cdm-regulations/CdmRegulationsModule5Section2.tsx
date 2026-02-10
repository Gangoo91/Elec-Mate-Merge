import { ArrowLeft, GraduationCap, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "cdm5s2-skte-meaning",
    question:
      "CDM 2015 moved away from the single word 'competence'. What four elements replaced it?",
    options: [
      "Safety, knowledge, technique, and education",
      "Skills, knowledge, training, and experience",
      "Strength, knowledge, testing, and evaluation",
      "Skills, know-how, trade cards, and examinations",
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 replaced the single concept of 'competence' with the requirement that anyone carrying out construction work must have the necessary skills, knowledge, training, and experience (SKTE). This change was recommended by the Löfstedt Review to provide a clearer, more practical framework for assessing whether a person is capable of carrying out work safely. Regulation 15 of CDM 2015 sets out this requirement explicitly.",
  },
  {
    id: "cdm5s2-cscs-legal-status",
    question:
      "Is holding a CSCS card a legal requirement under CDM 2015?",
    options: [
      "Yes — CDM 2015 specifically requires all workers to hold a valid CSCS card",
      "No — CSCS is an industry standard that supports compliance with CDM 2015, but holding a card is not itself a legal requirement",
      "Only for electricians and plumbers working on notifiable projects",
      "Yes — but only for workers on projects lasting more than 30 working days",
    ],
    correctIndex: 1,
    explanation:
      "Holding a CSCS card is not a legal requirement under CDM 2015 or any other UK legislation. However, CSCS is the industry-recognised standard for evidencing that a worker has passed a health and safety test and holds an appropriate qualification. Major clients and principal contractors require CSCS cards as a practical means of demonstrating compliance with CDM 2015 Regulation 15 (skills, knowledge, training, and experience). The Build UK commitment means that virtually all major contractor sites require valid CSCS cards for entry.",
  },
  {
    id: "cdm5s2-toolbox-talk-purpose",
    question:
      "What is the primary purpose of toolbox talks on a construction site?",
    options: [
      "To replace the site induction for returning workers",
      "To reinforce safety messages, address specific risks relevant to current site activities, and share lessons learned from incidents and near misses",
      "To satisfy the requirement for annual safety training refreshers",
      "To provide formal qualifications to operatives on site",
    ],
    correctIndex: 1,
    explanation:
      "Toolbox talks are short, focused safety briefings designed to reinforce key safety messages, address specific risks relevant to current activities on site, and share lessons learned from incidents, near misses, and inspection findings. They are typically delivered by site supervisors or managers, last 10–15 minutes, and should be directly linked to the construction phase plan and the work taking place at the time. Toolbox talks do not replace formal inductions or training — they supplement them as part of an ongoing programme of safety communication.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Can a worker who does not hold a CSCS card still work on a construction site?",
    answer:
      "Legally, yes. CDM 2015 does not specifically require CSCS cards — it requires that workers have the necessary skills, knowledge, training, and experience (SKTE) for the work they are carrying out. However, in practice, the vast majority of principal contractors and major clients require valid CSCS cards as a condition of site access. The Build UK commitment (formerly the Major Contractors Group requirement) means that on most significant construction projects, a valid CSCS card is a de facto requirement for entry. Some sites operate a 'no card, no start' policy. A worker without a CSCS card may be able to demonstrate their SKTE through other means (qualifications, training records, employer references), but gaining access to most modern construction sites without a card would be extremely difficult.",
  },
  {
    question:
      "What should a site induction cover, and how long should it last?",
    answer:
      "There is no prescribed minimum duration for a site induction under CDM 2015. The content and length should be proportionate to the size, complexity, and risk profile of the project. However, an effective site induction should cover, as a minimum: a project overview, site layout and access/egress routes, emergency procedures (fire evacuation, assembly points, first aid), welfare facilities (toilets, washing, rest areas, drinking water), site rules (PPE requirements, speed limits, prohibited areas, smoking policy), the management structure and who to report to, specific hazards on site (asbestos, overhead power lines, underground services, contaminated ground), reporting procedures for accidents, incidents, and near misses, and arrangements for consultation with workers. On a typical notifiable project, a thorough induction might last between 30 minutes and 2 hours depending on the project. The induction must be recorded, and the worker must confirm they have understood the information provided.",
  },
  {
    question:
      "What is the difference between SSSTS and SMSTS, and who should hold these qualifications?",
    answer:
      "SSSTS (Site Supervisor Safety Training Scheme) and SMSTS (Site Management Safety Training Scheme) are training programmes delivered by CITB (the Construction Industry Training Board). SSSTS is a two-day course designed for first-line site supervisors, charge-hands, and gang leaders. It covers the key health and safety responsibilities of a supervisor, including managing risk assessments, toolbox talks, monitoring work activities, and recognising hazards. SMSTS is a five-day course designed for site managers, project managers, and other senior site personnel. It covers a broader and deeper range of topics including CDM 2015 duties, construction phase planning, managing subcontractors, accident investigation, and health and safety law. Both qualifications are valid for five years and must be renewed through a refresher course. While not a legal requirement, holding SSSTS or SMSTS is widely regarded as an essential minimum standard for demonstrating supervisory or managerial competence on construction sites, and most principal contractors require their supervisors and managers to hold the appropriate qualification.",
  },
  {
    question:
      "How should an organisation assess the competence of a subcontractor before appointing them?",
    answer:
      "The assessment of subcontractor competence should be proportionate to the nature and risk of the work. For lower-risk work, a straightforward check of insurance, relevant qualifications, CSCS cards, and a brief review of health and safety arrangements may suffice. For higher-risk or more complex work, a more thorough assessment is appropriate. This might include: reviewing the organisation's health and safety policy and management system; checking their accident and enforcement history (prohibition and improvement notices); verifying relevant accreditations (CHAS, SafeContractor, Constructionline, or equivalent); reviewing example risk assessments and method statements for similar work; checking training records and qualifications of key personnel; requesting references from previous clients or principal contractors; and using a PAS 91-compliant pre-qualification questionnaire. CDM 2015 emphasises that the assessment should focus on whether the organisation has the skills, knowledge, training, and experience for the specific work being procured — not merely whether they hold generic accreditations. The assessment should also consider organisational capability (sufficient resources, supervision, management systems) as well as individual competence.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under Regulation 15 of CDM 2015, what must a person possess before carrying out construction work?",
    options: [
      "A university degree in a construction-related discipline",
      "The necessary skills, knowledge, training, and experience — or be under the supervision of a person who does",
      "A minimum of five years' site experience",
      "A CSCS manager-level card",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 15 of CDM 2015 states that no person shall carry out work in relation to a project unless they have the necessary skills, knowledge, training, and experience (SKTE) to do so in a manner that secures the health and safety of any person working on or affected by the project, or they are under the supervision of a person who has such SKTE. This replaced the previous single concept of 'competence' used in CDM 2007.",
  },
  {
    id: 2,
    question:
      "Which of the following should NOT typically be included in a site-specific induction?",
    options: [
      "Emergency procedures, fire assembly points, and first aid arrangements",
      "Site layout, welfare facilities, and specific hazards present on the project",
      "The detailed financial budget for the construction project",
      "PPE requirements, reporting procedures, and site rules",
    ],
    correctAnswer: 2,
    explanation:
      "A site-specific induction should cover all matters directly relevant to health, safety, and welfare on the project: emergency procedures, site layout, welfare facilities, PPE requirements, site rules, specific hazards, reporting procedures, and the management structure. The detailed financial budget is a commercial matter and has no place in a health and safety induction. Including irrelevant commercial information would dilute the safety message and waste the time of workers who need to absorb critical safety information.",
  },
  {
    id: 3,
    question:
      "What does the CSCS Health, Safety and Environment (HS&E) test assess?",
    options: [
      "A worker's practical ability to carry out their trade",
      "A worker's knowledge of health, safety, and environmental matters relevant to the construction industry",
      "A worker's fitness to work on a construction site",
      "A worker's ability to complete paperwork and administration tasks",
    ],
    correctAnswer: 1,
    explanation:
      "The CSCS HS&E test is a computer-based, multiple-choice test that assesses a worker's knowledge of health, safety, and environmental matters relevant to the construction industry. The test covers topics including working at height, manual handling, hazardous substances, fire prevention, first aid, electrical safety, noise and vibration, PPE, and environmental awareness. Different test versions exist for different card levels (operatives, specialists, managers, professionals). Passing the relevant HS&E test is a prerequisite for obtaining a CSCS card. The test assesses knowledge, not practical trade skills — those are evidenced through separate qualifications (NVQs/SVQs).",
  },
  {
    id: 4,
    question:
      "Under CDM 2015, when is enhanced supervision of workers required?",
    options: [
      "Only when workers are carrying out electrical installation work",
      "When workers are young, inexperienced, new to the site, or carrying out high-risk activities",
      "Only during the first week of a new project",
      "Only when an HSE inspector is present on site",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 requires that supervision is proportionate to the level of risk and the competence of the workers involved. Enhanced supervision is required when workers are young (under 18), inexperienced (newly qualified or early in their career), new to the site (unfamiliar with site-specific hazards and procedures), or carrying out high-risk activities (working at height, confined space entry, work near live services, demolition). The level of supervision should be determined by a risk assessment and should be sufficient to ensure that workers can carry out their tasks safely.",
  },
  {
    id: 5,
    question:
      "Which of the following is a statutory training requirement (rather than an industry best-practice standard)?",
    options: [
      "CSCS card for all site operatives",
      "Asbestos awareness training for workers who may disturb asbestos-containing materials (ACMs)",
      "SMSTS qualification for all site managers",
      "IPAF licence for all workers on a construction site",
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos awareness training is a statutory requirement under Regulation 10 of the Control of Asbestos Regulations 2012. Every employer whose employees may be exposed to asbestos during their work must ensure that those employees receive adequate information, instruction, and training. This includes workers who may inadvertently disturb ACMs during maintenance, refurbishment, or demolition work. CSCS cards, SMSTS qualifications, and IPAF licences, while widely required by industry, are not themselves statutory requirements — they are industry standards that help demonstrate compliance with the legal duty to ensure workers have the necessary SKTE.",
  },
  {
    id: 6,
    question:
      "What is the purpose of PAS 91 in the context of assessing organisational competence?",
    options: [
      "It is a mandatory legal standard that all subcontractors must comply with",
      "It provides a standardised pre-qualification questionnaire framework for assessing the health, safety, and environmental capability of construction organisations",
      "It replaces the need for CSCS cards on construction sites",
      "It is a training course for health and safety managers",
    ],
    correctAnswer: 1,
    explanation:
      "PAS 91 (Publicly Available Specification 91) is a standardised pre-qualification questionnaire framework published by BSI. It provides a consistent set of questions that clients, principal contractors, and others can use to assess the health, safety, and environmental capability of construction organisations during the procurement process. PAS 91 helps to avoid the proliferation of different, inconsistent questionnaires and ensures that the assessment focuses on relevant matters. It is not a legal requirement in itself, but it supports compliance with CDM 2015 by providing a structured approach to assessing whether organisations have the necessary skills, knowledge, and experience.",
  },
  {
    id: 7,
    question:
      "A 17-year-old apprentice electrician starts work on a construction site. Which of the following is the principal contractor's duty regarding this young worker?",
    options: [
      "No special duties apply — the apprentice is treated the same as all other workers",
      "The PC must ensure the young worker has enhanced supervision, a specific risk assessment addressing age-related vulnerabilities, and is not exposed to work beyond their competence without direct supervision",
      "The PC must refuse to allow anyone under 18 on site",
      "The PC must only allow the young worker to carry out cleaning duties",
    ],
    correctAnswer: 1,
    explanation:
      "Under the Management of Health and Safety at Work Regulations 1999 (Regulation 19), employers must carry out a specific risk assessment for young workers (those under 18) that takes account of their inexperience, lack of awareness of existing or potential risks, and physical and psychological immaturity. The principal contractor must ensure that the young worker receives enhanced supervision proportionate to the risks, is not exposed to hazards beyond their competence, and is given clear instructions and training before undertaking any task. There is no blanket prohibition on young workers on construction sites, provided appropriate measures are in place.",
  },
  {
    id: 8,
    question:
      "Which of the following best describes a common competence failure that has contributed to construction site incidents?",
    options: [
      "A worker holding too many qualifications for the task at hand",
      "Workers being briefed too frequently through toolbox talks",
      "Agency workers arriving on site without site-specific induction, without verified CSCS cards, and being allocated tasks beyond their experience without adequate supervision",
      "A principal contractor requiring too many pre-qualification checks before appointing subcontractors",
    ],
    correctAnswer: 2,
    explanation:
      "One of the most commonly cited competence failures in HSE investigation reports is the use of agency or temporary workers who arrive on site without receiving a proper site-specific induction, without their qualifications being verified, and who are then allocated tasks that are beyond their skills and experience without adequate supervision. Language barriers, unfamiliarity with UK safety standards, and pressure to start work immediately compound the problem. The HSE has repeatedly highlighted this pattern in enforcement notices and prosecution cases. Thorough induction, verification of SKTE, and appropriate supervision of all workers — particularly those who are new, temporary, or inexperienced — are fundamental to preventing competence-related incidents.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CdmRegulationsModule5Section2() {
  useSEO({
    title:
      "Site Inductions & Competence | CDM Regulations Module 5.2",
    description:
      "Understand site-specific induction requirements, competence assessment under CDM 2015, the CSCS card scheme, training requirements, supervision, toolbox talks, organisational competence, and lessons from competence failures.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <GraduationCap className="h-10 w-10 text-blue-400 mx-auto mb-4" />
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Site Inductions &amp; Competence
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How CDM 2015 ensures that every person on a construction site has the skills,
            knowledge, training, and experience to carry out their work safely &mdash; from
            inductions and CSCS cards through to supervision, toolbox talks, and organisational
            competence assessment
          </p>
        </div>

        {/* ─── Summary Boxes ─── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-blue-500/10 border border-blue-500/30">
            <p className="text-blue-400 font-semibold text-sm mb-1">Key Regulation</p>
            <p className="text-white text-sm">
              CDM 2015 Regulation 15 &mdash; no person shall carry out work unless they possess the
              necessary skills, knowledge, training, and experience (SKTE) or are under appropriate
              supervision
            </p>
          </div>
          <div className="rounded-lg p-4 bg-blue-500/10 border border-blue-500/30">
            <p className="text-blue-400 font-semibold text-sm mb-1">Industry Standard</p>
            <p className="text-white text-sm">
              CSCS cards &mdash; not a legal requirement, but the industry-recognised method of
              evidencing health and safety awareness and qualifications on site
            </p>
          </div>
          <div className="rounded-lg p-4 bg-blue-500/10 border border-blue-500/30">
            <p className="text-blue-400 font-semibold text-sm mb-1">Supervision Schemes</p>
            <p className="text-white text-sm">
              CITB&rsquo;s SSSTS (2-day for supervisors) and SMSTS (5-day for managers) &mdash;
              widely regarded as the minimum standard for demonstrating supervisory competence
            </p>
          </div>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Learning Outcomes
            </h2>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Explain the legal basis for competence under CDM 2015 Regulation 15 and the shift from &ldquo;competence&rdquo; to SKTE</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Describe the content and purpose of an effective site-specific induction</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Understand the CSCS card scheme, its role in supporting CDM compliance, and alternative card schemes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Distinguish between statutory training requirements and industry best-practice standards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Identify when enhanced supervision is required and the role of SSSTS and SMSTS</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Explain how to assess the competence of both individuals and organisations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Recognise common competence failures and their consequences in enforcement and incident investigation</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Quick-Check ─── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 01 The Legal Basis for Competence ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            The Legal Basis for Competence
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
              <p className="font-semibold text-base text-blue-400 mb-2">CDM 2015 Regulation 15</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Regulation 15(1)</strong> states that no person shall carry out work in
                    relation to a project unless they possess the necessary <strong>skills, knowledge,
                    training, and experience</strong> (SKTE) to carry out that work in a manner that
                    secures the health and safety of any person working on or affected by the project.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Alternatively, a person may carry out work if they are <strong>under the
                    supervision</strong> of a person who has the necessary SKTE. This provision
                    allows apprentices, trainees, and less experienced workers to work on site
                    provided they are appropriately supervised.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Regulation 15(2)</strong> places a duty on any person who appoints a
                    designer or contractor to take reasonable steps to satisfy themselves that the
                    appointee has the necessary SKTE. This duty applies at every level of the
                    supply chain &mdash; clients, principal contractors, contractors, and anyone
                    else who appoints others to carry out construction work.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
              <p className="font-semibold text-base text-blue-400 mb-2">The Shift from Competence to SKTE</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Under the previous <strong>CDM 2007</strong>, the regulations used the single
                    word &ldquo;competence&rdquo;. This led to an industry where competence assessment
                    became excessively bureaucratic, paper-driven, and focused on collecting
                    accreditations rather than assessing actual ability.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    The <strong>L&ouml;fstedt Review</strong> (2011) recommended simplifying the
                    competence assessment process. CDM 2015 responded by replacing the single concept
                    of &ldquo;competence&rdquo; with the four elements of SKTE, and by abolishing the
                    Approved Code of Practice on competence assessment (previously Appendix 4 of L144).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Regulation 8(6)</strong> of the Management of Health and Safety at Work
                    Regulations 1999 also requires that competent persons be appointed to assist
                    employers in meeting their health and safety duties. When read alongside CDM 2015
                    Regulation 15, this creates a comprehensive framework for ensuring that everyone
                    involved in a construction project has the capability to carry out their role safely.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    The HSE&rsquo;s guidance document <strong>L153</strong> (Managing Health and Safety
                    in Construction) emphasises that competence assessment should be <strong>proportionate</strong> to
                    the risks involved &mdash; a simple check for low-risk work, a more thorough
                    assessment for high-risk or complex activities.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 Site-Specific Inductions ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">02</span>
              Site-Specific Inductions
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Under CDM 2015, the principal contractor must ensure that every worker receives a
                site-specific induction before they begin work on site. The induction is a critical
                first step in ensuring that all persons on the project understand the specific
                hazards, procedures, and rules that apply. A generic company induction is not
                sufficient &mdash; the induction must be tailored to the specific project and
                site conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Content of an Effective Induction</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Project overview:</strong> A brief description of the project, the client,
                      the principal contractor, and the current phase of work. This gives workers context
                      for the activities taking place around them and helps them understand how their
                      work fits into the wider project.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Site layout and access:</strong> How to enter and leave the site safely,
                      pedestrian routes, vehicle routes, restricted areas, laydown areas, and the
                      location of the site office. Workers should be shown the site layout plan and,
                      where practicable, given a physical tour of the key areas.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Emergency procedures:</strong> The fire evacuation plan, the location of
                      fire assembly points, the alarm signal (siren, horn, or other), the location of
                      fire extinguishers and first aid stations, and the names and locations of first
                      aiders and fire wardens. Workers must know what to do in an emergency from the
                      moment they step onto the site.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Welfare facilities:</strong> The location of toilets, washing facilities,
                      rest areas, drinking water, changing rooms, and drying rooms. Schedule 2 of
                      CDM 2015 sets out the minimum welfare requirements that must be in place.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Site rules and PPE:</strong> The site&rsquo;s mandatory PPE requirements
                      (hard hat, hi-vis, safety boots, eye protection, gloves), prohibited activities
                      (smoking areas, mobile phone use, drug and alcohol policy), speed limits, and
                      any other site-specific rules that all workers must follow.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Specific hazards:</strong> Any hazards specific to the site that workers
                      need to be aware of, such as asbestos-containing materials, overhead power lines,
                      underground services, contaminated ground, adjacent occupied buildings, nearby
                      railways, or any other hazard identified in the pre-construction information or
                      the construction phase plan.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Reporting procedures:</strong> How to report accidents, incidents, near
                      misses, unsafe conditions, and concerns. Workers must understand the reporting
                      process and feel confident that reports will be taken seriously. The induction
                      should emphasise that reporting near misses and concerns is encouraged and will
                      not result in negative consequences.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Who Must Be Inducted &amp; Recording</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Who must be inducted:</strong> Every person who enters the construction
                      site must receive an appropriate induction. This includes all workers,
                      supervisors, managers, visitors, delivery drivers entering the site compound,
                      and client representatives. The depth and detail of the induction may vary
                      depending on the person&rsquo;s role &mdash; a brief visitor induction covering
                      emergency procedures, escort requirements, and PPE may be sufficient for a
                      short-term visitor, but a full induction is required for anyone who will be
                      carrying out work on the project.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Duration and format:</strong> There is no prescribed minimum duration.
                      A thorough induction on a typical notifiable project might last between 30
                      minutes and 2 hours depending on the complexity and risk profile of the site.
                      Inductions may be delivered through a combination of presentation, video, site
                      tour, and question-and-answer session. The key requirement is that the inductee
                      understands the information provided &mdash; simply signing an attendance sheet
                      is not sufficient.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Recording:</strong> The principal contractor must keep a record of every
                      induction, including the inductee&rsquo;s name, employer, CSCS card number,
                      date of induction, the name of the person who delivered the induction, and
                      confirmation that the inductee understood the content. These records are
                      essential evidence of compliance with CDM 2015 and are routinely requested
                      during HSE inspections.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Language Barriers</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Where the workforce includes workers whose first language is not English, the
                  principal contractor must take <strong className="text-white">reasonable steps</strong> to
                  ensure that the induction is understood. This may include providing induction materials
                  in multiple languages, using interpreters, employing bilingual supervisors, or using
                  visual/pictorial safety briefings. Simply delivering an induction in English to a
                  worker who does not understand English does not constitute an effective induction and
                  would not satisfy CDM 2015 requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 03 The CSCS Card Scheme ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">03</span>
              The CSCS Card Scheme
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Construction Skills Certification Scheme (CSCS) was established in 1995 to
                provide a means of registering and certifying the skills, knowledge, and
                qualifications of construction workers. Today, CSCS is the largest construction
                skills certification scheme in the UK, with millions of card holders across the
                industry. While not a legal requirement, CSCS has become the de facto standard
                for demonstrating competence on construction sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Card Types</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Green card (Labourer):</strong> For workers who have passed the CSCS
                      HS&amp;E test and hold an appropriate qualification at NVQ/SVQ Level 1 or are
                      enrolled on an approved training programme. Valid for 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Blue card (Skilled Worker):</strong> For workers who hold an NVQ/SVQ
                      Level 2 or equivalent in their trade and have passed the relevant HS&amp;E test.
                      This is the most commonly held CSCS card and covers a wide range of trades
                      including bricklaying, carpentry, plastering, plumbing, and electrical
                      installation. Valid for 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Gold card (Advanced Craft / Supervisor):</strong> For workers holding an
                      NVQ/SVQ Level 3 or equivalent, and for those in supervisory roles who hold
                      appropriate supervisory qualifications. The gold card distinguishes more
                      experienced and qualified workers from those at the skilled-worker level.
                      Valid for 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Black card (Manager):</strong> For those in site management roles who hold
                      an NVQ/SVQ Level 4 or above, together with SMSTS or an equivalent management-level
                      health and safety qualification. Valid for 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>White card (Professional/Technical):</strong> For construction professionals
                      such as architects, engineers, surveyors, and other technical specialists who hold
                      membership of a recognised professional body and have passed the managers and
                      professionals HS&amp;E test. Valid for 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Red card (Trainee/Provisional):</strong> A temporary card for those who
                      are registered for or working towards a qualification. Typically valid for 1&ndash;3
                      years, and the holder must be working under supervision. The red card confirms
                      that the individual has passed the HS&amp;E test and is on a pathway to a full
                      qualification.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">The HS&amp;E Test, Build UK &amp; Alternatives</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>The HS&amp;E test:</strong> To obtain a CSCS card, the applicant must pass
                      the Health, Safety and Environment (HS&amp;E) test. This is a computer-based,
                      multiple-choice test covering core health and safety topics relevant to the
                      construction industry. Different test versions exist for different card levels
                      (operatives, specialists, managers, professionals). The test is delivered at
                      Pearson Vue centres across the UK and must be retaken when the card is renewed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>The Build UK commitment:</strong> Build UK (formerly the UK Contractors
                      Group / Major Contractors Group) requires all member organisations to implement
                      a &ldquo;no card, no start&rdquo; policy on their sites. Since Build UK members
                      include the vast majority of tier-one contractors in the UK, this effectively
                      means that a valid CSCS card is required for site access on most significant
                      construction projects. This industry commitment has been instrumental in driving
                      up training and qualification levels across the construction workforce.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Alternative card schemes:</strong> CSCS is not the only card scheme
                      recognised by the construction industry. Other schemes that are aligned with the
                      Construction Skills Card Standard include: <strong>CPCS</strong> (Construction
                      Plant Competence Scheme &mdash; for plant operators), <strong>NPORS</strong>
                      (National Plant Operators Registration Scheme), <strong>IPAF</strong>
                      (International Powered Access Federation &mdash; for MEWP operators),
                      and <strong>PASMA</strong> (Prefabricated Access Suppliers&rsquo; and
                      Manufacturers&rsquo; Association &mdash; for mobile tower scaffold users).
                      Cards from these schemes are generally accepted alongside CSCS cards on
                      construction sites.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Key Point</h3>
                </div>
                <p className="text-white/80 text-sm">
                  A CSCS card is <strong className="text-white">evidence of competence, not proof
                  of competence</strong>. Holding a valid card confirms that the holder has passed
                  the relevant HS&amp;E test and holds a recognised qualification, but it does not
                  guarantee that the individual will work safely in practice. The principal
                  contractor must still verify that workers are competent for the specific tasks
                  they will carry out, through induction, RAMS review, supervision, and ongoing
                  monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Training Requirements ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Training Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Training on construction sites falls into three broad categories: statutory training
                required by specific regulations, industry-specific training linked to particular
                equipment or activities, and task-specific training for specialist operations. The
                principal contractor must ensure that appropriate training is in place for all
                activities carried out on the project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Statutory Training</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Asbestos awareness:</strong> Under Regulation 10 of the Control of
                      Asbestos Regulations 2012, every employer whose employees may be exposed to
                      asbestos during their work must ensure that those employees receive adequate
                      information, instruction, and training. On construction sites, this means that
                      anyone who may disturb asbestos-containing materials (ACMs) &mdash; including
                      electricians, plumbers, carpenters, and general operatives involved in
                      refurbishment or demolition &mdash; must receive asbestos awareness training.
                      This training must be refreshed at regular intervals.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Manual handling:</strong> Under the Manual Handling Operations
                      Regulations 1992, employers must provide information and training to employees
                      who carry out manual handling operations. On construction sites, this includes
                      training in safe lifting techniques, the use of mechanical aids, and how to
                      assess and reduce manual handling risks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Noise and vibration:</strong> Under the Control of Noise at Work
                      Regulations 2005 and the Control of Vibration at Work Regulations 2005,
                      employers must provide information, instruction, and training to employees
                      exposed to noise or vibration above the exposure action values. This includes
                      training on the risks of noise-induced hearing loss and hand-arm vibration
                      syndrome (HAVS), and how to use control measures and PPE correctly.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Industry-Specific &amp; Task-Specific Training</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>IPAF (mobile elevating work platforms):</strong> Workers who operate
                      MEWPs (cherry pickers, scissor lifts, boom lifts) should hold a current IPAF
                      licence for the category of machine they operate. IPAF training covers machine
                      familiarisation, pre-use checks, safe operation, emergency procedures, and
                      rescue. Licences are valid for 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>PASMA (mobile tower scaffolds):</strong> Workers who erect, alter,
                      dismantle, or inspect mobile tower scaffolds should hold a PASMA Towers for
                      Users certificate. PASMA training covers tower assembly, stability, safe
                      use, inspection, and the requirements of the Work at Height Regulations 2005.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Confined spaces:</strong> Workers who enter or work in confined spaces
                      must receive training in accordance with the Confined Spaces Regulations 1997.
                      This includes hazard recognition, atmospheric monitoring, use of RPE, emergency
                      procedures, and rescue techniques.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Harness and fall arrest:</strong> Workers who use harnesses and personal
                      fall protection systems must be trained in the correct fitting, use, inspection,
                      and limitations of the equipment. Training should cover pre-use inspection,
                      anchor point selection, fall clearance calculations, and rescue planning.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Scaffold inspection:</strong> Under the Work at Height Regulations 2005,
                      scaffolds must be inspected by a competent person before first use, at intervals
                      not exceeding 7 days, and after any event likely to affect stability. Scaffold
                      inspectors must hold an appropriate qualification (such as CISRS Scaffold
                      Inspection Training Scheme) and have sufficient experience to identify defects
                      and assess structural integrity.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Record Keeping</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Training records must be maintained</strong> for all workers on the
                      project. These should include: the worker&rsquo;s name and employer; their CSCS
                      card number, type, and expiry date; copies of relevant certificates and
                      qualifications; induction records; toolbox talk attendance; and any refresher
                      or update training received during the project. Training records are routinely
                      requested during HSE inspections and are essential evidence that the principal
                      contractor has fulfilled their duty under Regulation 15 to ensure that workers
                      have the necessary SKTE.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 05 Supervision of Workers ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Supervision of Workers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Supervision is the practical mechanism through which competence requirements are
                enforced on site. CDM 2015 requires that the level of supervision provided is
                proportionate to the risks involved and the competence of the workers being
                supervised. Effective supervision is not merely about watching workers &mdash; it
                involves planning, instructing, monitoring, and intervening when necessary to
                ensure that work is carried out safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">When Enhanced Supervision Is Required</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Young workers (under 18):</strong> Under Regulation 19 of the Management
                      of Health and Safety at Work Regulations 1999, employers must carry out a
                      specific risk assessment for young workers that accounts for their inexperience,
                      lack of awareness of risks, and physical and psychological immaturity. Young
                      workers must receive close, direct supervision until their competence has been
                      assessed and confirmed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Inexperienced workers:</strong> Workers who are newly qualified, early
                      in their career, or working in an unfamiliar trade area require enhanced
                      supervision until they have demonstrated that they can apply their knowledge
                      and training safely in practice. Holding a qualification does not automatically
                      mean a worker can perform safely without guidance &mdash; practical experience
                      under supervision is essential.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Workers new to the site:</strong> Even experienced workers need enhanced
                      supervision during their initial period on a new site. They are unfamiliar with
                      the site layout, specific hazards, procedures, and the work of other trades
                      around them. The first few days on a new site represent a period of elevated
                      risk.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>High-risk activities:</strong> Activities such as working at height,
                      confined space entry, work near live services, demolition, steel erection, and
                      crane operations require enhanced supervision regardless of the experience of
                      the workers involved. The consequences of error in these activities are severe
                      and often irreversible.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">SSSTS and SMSTS</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Site Supervisor Safety Training Scheme (SSSTS):</strong> A two-day
                      CITB course designed for first-line supervisors, charge-hands, and gang leaders.
                      SSSTS covers the supervisor&rsquo;s legal responsibilities, risk assessment,
                      method statements, toolbox talks, monitoring work activities, accident reporting,
                      and dealing with unsafe behaviour. The qualification is valid for 5 years and
                      must be renewed through a one-day refresher course. Most principal contractors
                      require site supervisors to hold a current SSSTS certificate.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Site Management Safety Training Scheme (SMSTS):</strong> A five-day
                      CITB course designed for site managers, project managers, and senior site
                      personnel. SMSTS covers a broader range of topics including CDM 2015 duties
                      in detail, construction phase planning, managing subcontractors, accident
                      investigation, health and safety legislation, risk management, and leadership.
                      The qualification is valid for 5 years and must be renewed through a two-day
                      refresher course. SMSTS is widely regarded as the minimum management-level
                      health and safety qualification for construction site managers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Supervisor competence:</strong> A supervisor who does not understand
                      the risks cannot effectively supervise others to manage those risks. The
                      supervisor must have sufficient knowledge of the work being supervised to
                      identify unsafe practices, give clear instructions, and make decisions about
                      when to stop work. Holding SSSTS or SMSTS is an important element of supervisor
                      competence, but it must be combined with relevant trade knowledge and practical
                      site experience.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Supervision Is Not Optional</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The HSE has prosecuted numerous organisations for failing to provide adequate
                  supervision on construction sites. In many fatal accident investigations, inadequate
                  supervision has been identified as a <strong className="text-white">primary
                  contributing factor</strong>. A common pattern is that an experienced worker is
                  asked to supervise others in addition to carrying out their own work, with the result
                  that neither task is done effectively. Dedicated supervision &mdash; where the
                  supervisor&rsquo;s primary role is to oversee the work of others, not to carry out
                  productive work themselves &mdash; is essential for high-risk activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Toolbox Talks and Ongoing Training ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">06</span>
              Toolbox Talks and Ongoing Training
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Toolbox talks are short, focused safety briefings delivered to workers on site.
                They are a vital part of the ongoing safety communication programme and serve to
                reinforce key safety messages, address specific risks relevant to current site
                activities, and share lessons learned from incidents, near misses, and inspection
                findings. Toolbox talks bridge the gap between formal training (which may have been
                received months or years earlier) and the day-to-day realities of the work being
                carried out.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Purpose, Content &amp; Delivery</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Purpose:</strong> Toolbox talks serve several important functions:
                      reinforcing safety messages from the induction; raising awareness of specific
                      hazards relevant to the current phase of work; communicating changes to the
                      construction phase plan or site rules; sharing lessons learned from incidents,
                      near misses, or enforcement actions (both on the current project and from
                      other projects); and providing a forum for workers to raise concerns and ask
                      questions about health and safety matters.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Content:</strong> The most effective toolbox talks are directly linked
                      to the work being carried out at the time. For example, if roof work is about
                      to begin, a toolbox talk on working at height, edge protection, fragile surfaces,
                      and weather-related risks would be appropriate. If a near miss involving an
                      excavation collapse occurred the previous week, a toolbox talk on excavation
                      safety would reinforce the lessons learned. Generic, repetitive toolbox talks
                      that bear no relation to current site activities quickly lose their impact.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Frequency:</strong> There is no legal requirement for a specific
                      frequency of toolbox talks. However, good practice on most construction sites
                      is to deliver toolbox talks at least weekly, and more frequently during
                      high-risk phases of work or when specific safety concerns arise. Some sites
                      deliver daily briefings (often called &ldquo;morning briefings&rdquo; or
                      &ldquo;start-of-shift briefings&rdquo;) that include a short safety element.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Delivery:</strong> Toolbox talks are typically delivered by the site
                      supervisor or foreman at the point of work, lasting 10&ndash;15 minutes. They
                      should be interactive &mdash; encouraging questions and discussion rather than
                      simply reading from a script. Visual aids (photographs, diagrams, examples of
                      damaged equipment) can increase engagement and understanding, particularly
                      where workers have varying levels of literacy or English language ability.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Recording &amp; Linking to the CPP</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Recording attendance:</strong> Attendance at toolbox talks must be
                      recorded. A typical record includes the date, time, topic, name of the person
                      delivering the talk, and the names and signatures of all attendees. These
                      records demonstrate that ongoing safety communication is taking place and
                      are valuable evidence during HSE inspections and incident investigations.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Linking to the construction phase plan:</strong> Toolbox talks should
                      be planned as part of the overall safety communication strategy set out in the
                      construction phase plan. The CPP should identify the key topics that need to
                      be covered through toolbox talks at different stages of the project, and the
                      programme should be reviewed and updated as the project progresses. This
                      ensures that toolbox talks are proactive and planned, not merely reactive.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="cdm5s2-inline-3"
          question="Why should toolbox talks be directly linked to the current phase of work on site, rather than covering generic safety topics?"
          correctAnswer="Toolbox talks that are directly relevant to the work currently taking place have far greater impact because workers can immediately relate the safety message to their own tasks and environment. Generic talks that have no connection to current site activities lose their impact quickly and become a 'tick-box exercise'. By linking toolbox talks to the construction phase plan and current risks, supervisors reinforce the specific precautions that workers need to apply that day, address hazards that are present right now, and share lessons learned from relevant recent incidents. This approach keeps safety communication fresh, targeted, and meaningful."
          explanation="The HSE's guidance emphasises that effective safety communication must be relevant, timely, and specific. Toolbox talks are most effective when they address risks that workers will encounter during their current shift, not abstract topics that may not apply to their work."
        />

        {/* ─── 07 Assessing Competence of Organisations ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">07</span>
              Assessing Competence of Organisations
            </h2>
            <div className="space-y-4 text-white">
              <p>
                CDM 2015 requires that anyone who appoints a designer or contractor must take
                reasonable steps to satisfy themselves that the appointee has the necessary skills,
                knowledge, training, and experience. This applies not only to individual workers
                but also to organisations as a whole. Assessing organisational competence is
                fundamentally different from assessing individual competence &mdash; it requires
                consideration of the organisation&rsquo;s management systems, resources, track
                record, and culture, not merely the qualifications of individual employees.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Assessment Methods</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>PAS 91 pre-qualification questionnaires:</strong> PAS 91 (Publicly
                      Available Specification 91) provides a standardised framework of pre-qualification
                      questions covering health, safety, and environmental capability. Using PAS 91
                      ensures a consistent, proportionate assessment and avoids the proliferation of
                      different questionnaires from different clients. PAS 91 is structured in modules,
                      allowing the assessment to be tailored to the type and risk level of the work
                      being procured.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Reviewing RAMS:</strong> Reviewing the organisation&rsquo;s risk
                      assessments and method statements for similar previous work provides insight
                      into their ability to identify hazards, assess risks, and develop appropriate
                      control measures. RAMS that are generic, poorly written, or not specific to
                      the actual work conditions are a warning sign of inadequate competence.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Safety records and enforcement history:</strong> Checking the
                      organisation&rsquo;s accident and incident rates, any HSE enforcement notices
                      (improvement notices, prohibition notices, prosecutions), and their safety
                      performance on previous projects. The HSE publishes details of enforcement
                      notices and convictions, which are publicly searchable.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Training records:</strong> Evidence that the organisation invests in
                      training its workforce, maintains up-to-date training records, and ensures that
                      workers hold the appropriate qualifications and certifications for the work they
                      carry out. An organisation that cannot produce training records when asked is
                      unlikely to be managing competence effectively.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Accreditations:</strong> Relevant third-party accreditations such as
                      CHAS (Contractors Health and Safety Assessment Scheme), SafeContractor,
                      Constructionline, or equivalent schemes can provide additional assurance.
                      However, accreditations should supplement, not replace, a direct assessment
                      of the organisation&rsquo;s capability for the specific work being procured.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Individual vs Organisational Competence</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Individual competence:</strong> The skills, knowledge, training, and
                      experience of specific persons who will carry out or manage the work. Assessed
                      through qualifications, CSCS cards, training records, and practical demonstration
                      of ability.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Organisational competence:</strong> The organisation&rsquo;s ability
                      to plan, manage, and carry out the work safely as a whole. This includes
                      having adequate management systems, sufficient resources (people, equipment,
                      time), appropriate supervision arrangements, a positive safety culture, and
                      the capacity to learn from incidents and continuously improve. An organisation
                      with competent individuals but poor management systems may still fail to
                      deliver safe outcomes.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Proportionality:</strong> The depth and rigour of the assessment must
                      be proportionate to the nature and risk of the work. A straightforward assessment
                      may be sufficient for low-risk work by a well-known contractor. A more thorough
                      assessment &mdash; including site visits, interviews, and detailed document review
                      &mdash; is appropriate for high-risk, complex, or novel work, or where the
                      contractor is unknown to the appointing party.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Common Competence Failures and Lessons ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              Common Competence Failures and Lessons
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Competence failures are a recurring theme in HSE investigation reports and
                prosecution cases. Understanding the common patterns of failure is essential for
                preventing incidents and ensuring that competence management is effective in
                practice, not merely on paper.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Common Failure Patterns</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Young and new workers:</strong> Statistically, workers in their first
                      six months on a new site or in a new role are at significantly elevated risk
                      of injury. HSE investigation reports frequently identify that young or new
                      workers were allocated tasks beyond their experience, received inadequate
                      induction, or were supervised by persons who were themselves too busy with
                      their own work to provide effective oversight. The tragic deaths of apprentices
                      on UK construction sites have led to renewed focus on the protection of young
                      workers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Language barriers:</strong> Workers who do not fully understand English
                      may not comprehend safety instructions, warning signs, RAMS, toolbox talks, or
                      verbal instructions from supervisors. HSE investigations have identified cases
                      where workers were exposed to serious risks because they did not understand the
                      safety briefing they received. The duty to ensure understanding rests with the
                      employer and the principal contractor, not with the worker.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Agency and temporary workers:</strong> Agency workers are particularly
                      vulnerable because they may arrive on site without site-specific knowledge,
                      may not have had their qualifications verified, and may be under pressure to
                      start work immediately without a proper induction. They may be unfamiliar with
                      the site, the management team, and the specific risks. HSE enforcement action
                      has frequently targeted failures in the management of agency workers on
                      construction sites.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Fraudulent cards and qualifications:</strong> Instances of fraudulent
                      CSCS cards and forged qualifications have been detected across the industry.
                      The principal contractor should use the CSCS smart card verification system
                      (or the online card checker) to verify card validity at induction. Any
                      suspicion of fraud should be reported to CSCS and the individual should not
                      be permitted to work on site.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">HSE Enforcement and What Inspectors Look For</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>During site inspections, HSE inspectors routinely check:</strong>{" "}
                      whether workers hold valid CSCS cards appropriate to their trade; whether
                      induction records are complete and up to date; whether training records
                      demonstrate that workers have received the necessary training for the tasks
                      they are carrying out; whether supervision arrangements are adequate and
                      documented; and whether the principal contractor can demonstrate a systematic
                      approach to managing competence across the site.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Common enforcement triggers:</strong> Workers found operating plant
                      or machinery without appropriate training or certification; workers at height
                      without evidence of working-at-height training; operatives in roles requiring
                      specific statutory training (e.g. asbestos, confined spaces) without evidence
                      of that training; and supervisors who cannot demonstrate that they have
                      received appropriate supervisory training.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Consequences:</strong> Failures in competence management can result in
                      improvement notices, prohibition notices (stopping work immediately), prosecution,
                      and unlimited fines under the sentencing guidelines introduced in 2016. In cases
                      involving fatalities, individuals can be prosecuted for gross negligence
                      manslaughter. The reputational damage to organisations found to have failed in
                      their competence management duties can be severe and long-lasting.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">Case Study: The Cost of Competence Failure</h3>
                </div>
                <p className="text-white/80 text-sm">
                  In a widely reported HSE prosecution, a principal contractor was fined over
                  &pound;500,000 after an untrained agency worker fell through a fragile roof
                  panel and suffered life-changing injuries. The investigation found that the
                  worker had not received a site-specific induction, his CSCS card had expired,
                  he had received no working-at-height training, and there was no competent
                  supervisor overseeing the work. The court heard that the principal contractor
                  had a written induction procedure but had <strong className="text-white">failed
                  to implement it in practice</strong>. The judge emphasised that paper systems
                  are worthless if they are not followed &mdash; what matters is what actually
                  happens on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Competence Assurance Model Diagram ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
              Competence Assurance Model
            </h2>
            <div className="space-y-4 text-white">
              <p className="text-sm text-white/70">
                The four elements of competence under CDM 2015 &mdash; skills, knowledge, training,
                and experience &mdash; form a pyramid. Each layer supports those above it, and all
                four must be present for a worker to be truly competent.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-lg">
                {/* Top of pyramid — Experience */}
                <div className="flex justify-center mb-2">
                  <div className="w-full max-w-[200px] bg-blue-500/25 border border-blue-500/50 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-blue-300 font-bold text-sm uppercase tracking-wide">Experience</p>
                    <p className="text-white/70 text-xs mt-1">
                      Practical application, time served, supervision history, exposure to real-world scenarios
                    </p>
                  </div>
                </div>
                {/* Connector */}
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-blue-400/40" />
                </div>
                {/* Middle row — Knowledge & Training */}
                <div className="flex justify-center gap-3 mb-2">
                  <div className="flex-1 max-w-[220px] bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-blue-300 font-bold text-sm uppercase tracking-wide">Knowledge</p>
                    <p className="text-white/70 text-xs mt-1">
                      Understanding of risks, legislation, procedures, safe systems of work
                    </p>
                  </div>
                  <div className="flex-1 max-w-[220px] bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-blue-300 font-bold text-sm uppercase tracking-wide">Training</p>
                    <p className="text-white/70 text-xs mt-1">
                      Formal courses, refreshers, CPD, toolbox talks, recorded evidence
                    </p>
                  </div>
                </div>
                {/* Connector */}
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-blue-400/40" />
                </div>
                {/* Base of pyramid — Skills */}
                <div className="flex justify-center">
                  <div className="w-full max-w-[480px] bg-blue-500/15 border border-blue-500/35 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-blue-300 font-bold text-sm uppercase tracking-wide">Skills</p>
                    <p className="text-white/70 text-xs mt-1">
                      Technical ability, qualifications (NVQ/SVQ), practical craft competence, tool proficiency
                    </p>
                  </div>
                </div>
                {/* Label */}
                <div className="flex justify-center mt-4">
                  <p className="text-xs text-white/50 italic text-center">
                    All four elements must be present &mdash; a qualified worker without experience, or
                    an experienced worker without current training, is not fully competent under CDM 2015
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CDM 2015 Regulation 15</strong> requires that no person carries out
                      construction work unless they have the necessary skills, knowledge, training,
                      and experience (SKTE) or are under appropriate supervision.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Site-specific inductions</strong> must cover project overview, site
                      layout, emergency procedures, welfare, site rules, PPE, specific hazards, and
                      reporting procedures. Every person entering the site must be inducted.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CSCS cards</strong> are the industry standard for evidencing competence
                      but are not a legal requirement. The Build UK &ldquo;no card, no start&rdquo;
                      policy makes them a de facto requirement on most major projects.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Training</strong> falls into three categories: statutory (asbestos,
                      manual handling, noise/vibration), industry-specific (IPAF, PASMA, confined
                      spaces), and task-specific (scaffold inspection, crane operation). Records
                      must be maintained.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Enhanced supervision</strong> is required for young workers, inexperienced
                      workers, workers new to the site, and high-risk activities. SSSTS and SMSTS are
                      the industry-standard supervisory qualifications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Toolbox talks</strong> must be relevant, frequent, linked to the
                      construction phase plan, and their attendance must be recorded.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Organisational competence</strong> is assessed through PAS 91
                      questionnaires, RAMS review, safety records, training records, and
                      accreditations &mdash; individual and organisational competence are different.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Common competence failures</strong> involve young/new workers, language
                      barriers, agency workers, and fraudulent cards. The HSE actively enforces
                      competence requirements during inspections and investigations.
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
            <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
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
            title="Site Inductions & Competence Quiz"
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
            <Link to="../cdm-regulations-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5-section-3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
