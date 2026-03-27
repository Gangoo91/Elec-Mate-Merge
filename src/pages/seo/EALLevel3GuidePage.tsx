import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Zap,
  Lightbulb,
  ShieldCheck,
  Users,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'EAL Level 3 Guide', href: '/eal-level-3-guide' },
];

const tocItems = [
  { id: 'what-is-eal', label: 'What is EAL?' },
  { id: 'eal-qualification', label: 'EAL Level 3 Electrical Qualification' },
  { id: 'qualification-structure', label: 'Qualification Structure' },
  { id: 'units-covered', label: 'Units Covered' },
  { id: 'eal-vs-cg', label: 'EAL vs City & Guilds: The Comparison' },
  { id: 'choosing', label: 'How to Choose' },
  { id: 'employer-acceptance', label: 'Employer and College Acceptance' },
  { id: 'assessment', label: 'Assessment Methods' },
  { id: 'after-eal', label: 'After Your EAL Level 3' },
  { id: 'study-tools', label: 'Study Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'EAL (Excellence, Achievement & Learning) is an approved awarding organisation for electrical installation qualifications and is a genuine alternative to City & Guilds at Level 3.',
  'The EAL Level 3 Diploma in Electrical Installation leads to the same apprenticeship outcomes as the City & Guilds 2365 — both are accepted for the JIB ECS Gold Card and competent person scheme registration.',
  'EAL qualifications are accepted by major employers in the electrotechnical sector and are recognised by JIB for ECS card purposes in exactly the same way as City & Guilds.',
  'The choice between EAL and City & Guilds is usually made by your training provider and employer — both are equally valid routes to becoming a qualified electrician.',
  'EAL tends to be used by training providers that also deliver engineering and manufacturing qualifications, making it a common choice in specialist technical sectors.',
];

const faqs = [
  {
    question: 'What is EAL and are their electrical qualifications recognised?',
    answer:
      "EAL stands for Excellence, Achievement & Learning — it is an Ofqual-regulated awarding organisation specialising in technical and engineering qualifications. EAL was created through a merger of Emta Awards (a manufacturing and engineering awarding body) and SQA's Awards division. EAL is fully recognised by the electrotechnical industry: JIB accepts EAL Level 3 Electrical Installation qualifications for ECS Gold Card applications, and NICEIC, NAPIT, and ELECSA accept EAL qualifications for competent person scheme registration. EAL is also an approved End-Point Assessment Organisation (EPAO) for the Level 3 Electrical Installation apprenticeship.",
  },
  {
    question: 'Is EAL Level 3 Electrical Installation equivalent to City & Guilds 2365?',
    answer:
      "Yes. The EAL Level 3 Diploma in Electrical Installation is equivalent to the City & Guilds 2365 Level 3 Diploma in terms of level, content, and industry recognition. Both qualifications cover the same knowledge and skills as required by the Level 3 Electrical Installation apprenticeship standard (ST0145). Both are regulated at Level 3 by Ofqual and appear on the Regulated Qualifications Framework (RQF). JIB treats both equivalently for ECS Gold Card applications. The qualification number is different (EAL has its own qualification number), but the outcome — a recognised Level 3 electrical installation qualification — is identical.",
  },
  {
    question: 'How do employers view EAL vs City & Guilds qualifications?',
    answer:
      "Most UK electrical employers are primarily interested in whether you hold a Level 3 qualification that is accepted for JIB ECS Gold Card purposes, and whether you are competent to do the work. Both EAL and City & Guilds meet these criteria. In practice, because City & Guilds is the more widely known brand in electrical installation, some employers may be more familiar with C&G certificates. However, EAL is well established and any employer or recruiter who knows the industry will accept an EAL Level 3 qualification without question. If you have an EAL qualification and encounter a recruiter who is unfamiliar with it, simply explain it is an Ofqual-regulated equivalent to the C&G 2365 — JIB accept both equally.",
  },
  {
    question: 'Can I switch from EAL to City & Guilds (or vice versa) mid-apprenticeship?',
    answer:
      "Switching awarding body mid-qualification is very unusual and is generally not straightforward. Awarding bodies assess and credit their own units, and credit achieved with one awarding body does not automatically transfer to another. If you have a genuine reason to switch — for example, your training provider has changed — your college or training provider and employer would need to agree, and you may need to re-take some units under the new awarding body. In most cases, you complete the qualification with the awarding body you started with. Discuss any concerns with your training provider before making any decisions.",
  },
  {
    question: 'Does EAL offer the 18th Edition (BS 7671) qualification?',
    answer:
      "Yes. EAL offers a qualification equivalent to the City & Guilds 2382 Requirements for Electrical Installations — BS 7671. The EAL qualification covering the 18th Edition (BS 7671:2018 and its amendments) is accepted by JIB for ECS Gold Card renewal and by NICEIC/NAPIT/ELECSA for competent person scheme registration, in exactly the same way as the C&G 2382. You do not need to hold a C&G 2382 specifically — any Ofqual-regulated 18th Edition qualification from an approved awarding body is acceptable.",
  },
  {
    question: 'Is EAL a good choice for apprentices in engineering and manufacturing sectors?',
    answer:
      "EAL has its roots in engineering and manufacturing — it was originally created to serve those sectors. As a result, EAL has strong relationships with engineering employers, aerospace and defence contractors, and technical training providers in industrial sectors. If you are completing an electrical apprenticeship with an employer who operates in manufacturing, process engineering, or heavy industry, your training provider may well use EAL qualifications as they also deliver EAL engineering qualifications. This is entirely appropriate — EAL's electrical qualifications are equally robust and recognised as City & Guilds equivalents.",
  },
  {
    question: 'What is the EAL Level 3 Diploma qualification number?',
    answer:
      "EAL qualifications are listed on the Ofqual Register of Regulated Qualifications (RQF register). The EAL Level 3 Diploma in Electrical Installation has its own qualification number — you should contact EAL directly or check their website (eal.org.uk) or the Ofqual register for the current qualification number, as awarding body qualification codes are periodically updated. Your training provider will have the current qualification number. For JIB ECS Gold Card applications, you need to submit your qualification certificate — JIB verifies the qualification against the Ofqual register directly.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/city-guilds-level-3-guide',
    title: 'City & Guilds Level 3 Guide',
    description: 'The C&G 2365 qualification — structure, units, assessment, and achieving distinction.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/apprentice-endpoint-assessment',
    title: 'End-Point Assessment (EPA) Guide',
    description: 'Knowledge test, practical observation, professional discussion — complete EPA guide.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/apprentice-progression-guide',
    title: 'Career Progression After Your Apprenticeship',
    description: 'JIB Gold Card, AM2, self-employment, HNC/HND, and salary progression explained.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/apprentice-first-year-revision',
    title: 'Year 1 Revision Guide',
    description: "Ohm's Law, circuit theory, electrical units — complete first year revision.",
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description: 'Flashcards, AI tutor, and revision tools for electrical apprentices on any qualification route.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eal',
    heading: 'What is EAL?',
    content: (
      <>
        <p>
          EAL (Excellence, Achievement & Learning) is an Ofqual-regulated awarding organisation
          that specialises in technical, engineering, and manufacturing qualifications. EAL was
          formed through the merger of Emta Awards — which served the engineering and
          manufacturing sectors — and has grown into a significant awarding body across a range
          of technical disciplines including electrical installation, engineering, motor vehicle,
          construction, and aviation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ofqual regulated:</strong> EAL qualifications appear on the Regulated
                Qualifications Framework (RQF) and are regulated by Ofqual (the Office of
                Qualifications and Examinations Regulation). This is the same regulatory framework
                as City & Guilds qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved EPAO:</strong> EAL is an approved End-Point Assessment
                Organisation for the Level 3 Electrical Installation apprenticeship (ST0145),
                meaning it can assess apprentices at the final stage of their apprenticeship,
                alongside City & Guilds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industry recognition:</strong> EAL is recognised by JIB for ECS card
                applications, by NICEIC, NAPIT, and ELECSA for competent person scheme
                registration, and by the electrotechnical industry generally as a valid
                alternative to City & Guilds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical focus:</strong> EAL's roots in engineering and manufacturing
                mean it tends to be used by training providers serving industrial and technical
                employers. If your employer is in manufacturing, process, or defence sectors,
                EAL qualifications are particularly common.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eal-qualification',
    heading: 'EAL Level 3 Electrical Installation Qualification',
    content: (
      <>
        <p>
          EAL's primary Level 3 electrical qualification for apprentices is the EAL Level 3
          Diploma in Electrical Installation (Buildings and Structures). This qualification is
          the EAL equivalent of the City & Guilds 2365 Level 3 Diploma — both cover the same
          knowledge and skills required by the apprenticeship standard.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification level:</strong> Level 3 on the Regulated Qualifications
                Framework (RQF). The same level as the C&G 2365 Level 3 Diploma.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Content coverage:</strong> The EAL Level 3 covers the same core content
                as C&G 2365 — electrical installation technology, inspection and testing,
                fault diagnosis, electrical system design, BS 7671 requirements, and specialist
                electrical systems. The unit titles and numbering may differ, but the knowledge
                areas are equivalent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB acceptance:</strong> EAL Level 3 Electrical Installation
                qualifications are accepted by JIB for ECS Gold Card applications. You can
                confirm current acceptance by checking the JIB website (jib.org.uk) or contacting
                JIB directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Also available from EAL:</strong> 18th Edition (BS 7671) qualification
                equivalent to C&G 2382; inspection and testing qualification equivalent to C&G
                2391; and engineering qualifications for progression to HNC level.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualification-structure',
    heading: 'EAL Level 3 Qualification Structure',
    content: (
      <>
        <p>
          Like the City & Guilds 2365, the EAL Level 3 Diploma in Electrical Installation is
          structured as a credit-based qualification delivered over the course of an apprenticeship.
          It is typically studied alongside on-the-job training, with college attendance one day
          per week or in block release patterns.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 2 stage (Year 1/2):</strong> Foundation electrical theory,
                installation methods, basic wiring, health and safety, working practices, and
                an introduction to testing. Broadly equivalent in content to the C&G 2365 Level
                2 Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 stage (Year 2/3):</strong> Advanced electrical theory,
                inspection and testing, fault diagnosis, electrical system design including
                cable selection and voltage drop calculations, three-phase systems, and specialist
                electrical systems. This stage concludes with the Level 3 Diploma.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guided learning hours:</strong> Comparable to the C&G 2365 — typically
                600 to 700 guided learning hours for the Level 3 Diploma stage. Actual study
                time required will exceed this, particularly for exam preparation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your training provider will provide a scheme of learning that maps each EAL unit to
          your college timetable. Use the{' '}
          <SEOInternalLink href="/study-centre">
            Elec-Mate Study Centre
          </SEOInternalLink>{' '}
          to supplement your college learning with flashcard revision and AI-powered explanations
          between sessions.
        </p>
      </>
    ),
  },
  {
    id: 'units-covered',
    heading: 'Units Covered in the EAL Level 3',
    content: (
      <>
        <p>
          While the unit titles and reference numbers differ between EAL and City & Guilds, the
          content coverage is broadly equivalent. The following are the core knowledge and skill
          areas covered in the EAL Level 3 Electrical Installation Diploma.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installation technology:</strong> Advanced electrical theory
                including three-phase systems, transformers, motors, power factor, and the
                requirements of BS 7671:2018+A3:2024. Includes calculations for three-phase
                power and current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection, testing and commissioning:</strong> Full range of initial
                verification and periodic inspection procedures — continuity testing, insulation
                resistance, earth fault loop impedance, RCD testing, and completion of
                documentation (EIC and EICR). See the{' '}
                <SEOInternalLink href="/city-guilds-level-3-guide">
                  C&G Level 3 guide
                </SEOInternalLink>{' '}
                for detailed test procedure descriptions applicable to both qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault diagnosis and rectification:</strong> Systematic fault-finding
                methodology (half-split, substitution, injection), fault categories, safe
                working procedures during fault diagnosis, and documentation of fault-finding
                and repair activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical system design:</strong> Load calculations, cable selection
                using correction factors (Ca, Cg, Ci, Cs), voltage drop calculations using
                BS 7671 Appendix 4 tables, protective device selection, and earth fault loop
                impedance verification. Heavily linked to the{' '}
                <SEOInternalLink href="/apprentice-maths-electrician">
                  electrical maths skills
                </SEOInternalLink>{' '}
                covered in the maths guide.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist electrical systems:</strong> Fire alarm systems (grades and
                categories), emergency lighting, solar PV systems, EV charging installations,
                and other specialist systems covered by BS 7671 and associated standards (BS 5839,
                BS 5266, MCS certification for solar PV).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eal-vs-cg',
    heading: 'EAL vs City & Guilds: The Full Comparison',
    content: (
      <>
        <p>
          The most common question from apprentices is: is EAL as good as City & Guilds? The
          honest answer is that for all practical purposes in the electrotechnical industry,
          both qualifications lead to the same outcome. Here is a detailed comparison to help
          you understand the differences and similarities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-6 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>JIB ECS Gold Card acceptance:</strong></p>
                <p className="mt-1">
                  Both EAL and City & Guilds Level 3 Electrical Installation qualifications
                  are accepted by JIB for ECS Gold Card applications. There is no difference
                  in JIB's treatment of the two awarding bodies at Level 3.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>Competent person scheme acceptance:</strong></p>
                <p className="mt-1">
                  NICEIC, NAPIT, and ELECSA all accept EAL Level 3 qualifications for
                  registration purposes. If you are unsure, contact the scheme directly before
                  applying — they can confirm which qualifications they accept.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>Brand recognition:</strong></p>
                <p className="mt-1">
                  City & Guilds has higher brand recognition among non-specialist employers and
                  the general public. In the electrotechnical industry specifically, both are
                  equally recognised. If you hold an EAL qualification and a recruiter is
                  unfamiliar with it, explain it is an Ofqual-regulated Level 3 equivalent —
                  this resolves any confusion instantly.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>Progression to further study:</strong></p>
                <p className="mt-1">
                  Both C&G and EAL Level 3 qualifications are accepted for entry onto HNC/HND
                  programmes in Electrical Engineering. If you plan to study for an HNC,
                  confirm entry requirements with your chosen college, but in practice both are
                  treated equivalently.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>EPA provider:</strong></p>
                <p className="mt-1">
                  Both C&G and EAL are approved EPAOs for the Level 3 Electrical Installation
                  apprenticeship. Your EPAO does not have to be the same as your on-programme
                  qualification awarding body — the choice of EPAO is made separately, usually
                  by your employer and training provider.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing',
    heading: 'How to Choose Between EAL and City & Guilds',
    content: (
      <>
        <p>
          For most apprentices, the choice between EAL and City & Guilds is not theirs to make
          directly — it is determined by which training provider your employer uses, and which
          awarding body that provider is approved to deliver. However, if you have a choice or
          are selecting a training provider, here is how to approach the decision.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer's training provider:</strong> Ask your employer which college
                or training centre they use, and which awarding body that provider delivers.
                This will determine your qualification route. The quality of the training
                provider and the support they offer is usually more important than the choice
                of awarding body.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sector considerations:</strong> If you are apprenticed to an employer
                in engineering, manufacturing, defence, or aerospace, EAL may be the more natural
                choice as these sectors have strong EAL relationships. If you are in general
                domestic or commercial electrical installation, City & Guilds is more common and
                may be marginally easier to explain to future employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quality of the provider:</strong> Whichever awarding body is used,
                the quality of your college or training provider matters most. Ask about Ofsted
                ratings, pass rates, and employer feedback. A good provider delivering EAL will
                produce better-prepared apprentices than a mediocre provider delivering C&G.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'employer-acceptance',
    heading: 'Employer and College Acceptance',
    content: (
      <>
        <p>
          One of the main concerns apprentices have about EAL is whether employers will accept
          their qualification. Here is the definitive answer: any employer that understands the
          electrotechnical qualifications landscape accepts EAL Level 3 qualifications without
          question.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB acceptance:</strong> JIB (Joint Industry Board), which sets the
                industry standards for the electrotechnical sector, accepts EAL Level 3
                qualifications for ECS Gold Card applications. JIB is the benchmark — if JIB
                accepts it, the industry accepts it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large contractors:</strong> National electrical contractors and building
                services engineering firms (Amey, Mitie, Wates, Kier, NG Bailey, etc.) employ
                electricians with both C&G and EAL qualifications. Their HR processes check JIB
                ECS card status, not the specific awarding body.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HNC/HND entry:</strong> Universities and further education colleges
                offering HNC/HND programmes accept both C&G and EAL Level 3 electrical
                qualifications as entry criteria. Confirm with individual institutions, but
                in practice both are treated equivalently.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'Assessment Methods',
    content: (
      <>
        <p>
          The EAL Level 3 Diploma is assessed through a combination of written examinations,
          practical assessments, and portfolio-based evidence. The overall assessment methodology
          is comparable to City & Guilds, though the specific formats and timings may differ.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written examinations:</strong> Closed-book exams covering theory
                knowledge for each unit. Multiple-choice and short-answer formats. Sat under
                controlled examination conditions at your college or test centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical assessments:</strong> Carried out in the college workshop.
                You are assessed on installation quality, correct use of test instruments,
                accurate documentation (EIC and EICR forms), and safe working practices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio evidence:</strong> Some EAL units require a portfolio of
                evidence from workplace activities — photographs, completed certificates,
                risk assessments, and records of on-site work you have carried out during
                your apprenticeship. Your assessor will advise on evidence requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grading:</strong> EAL units are graded at pass, merit, and distinction
                levels, similar to City & Guilds. Distinction-level performance requires
                demonstrating deeper understanding and application of knowledge beyond the
                minimum required to pass.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'after-eal',
    heading: 'After Your EAL Level 3',
    content: (
      <>
        <p>
          Completing your EAL Level 3 puts you in exactly the same position as a City & Guilds
          2365 completer — ready to progress to the EPA gateway, apply for your JIB ECS Gold
          Card, and begin your career as a qualified electrician.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">End-Point Assessment and JIB Gold Card</h4>
                <p className="text-white text-sm leading-relaxed">
                  After completing the EAL Level 3 and AM2, you progress to the{' '}
                  <SEOInternalLink href="/apprentice-endpoint-assessment">
                    End-Point Assessment
                  </SEOInternalLink>
                  . Once EPA is complete, apply for the JIB ECS Gold Card — EAL Level 3
                  is accepted exactly as City & Guilds is. See the{' '}
                  <SEOInternalLink href="/apprentice-progression-guide">
                    career progression guide
                  </SEOInternalLink>{' '}
                  for full post-apprenticeship steps.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">18th Edition and Inspection & Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Next qualifications to pursue: the EAL 18th Edition (BS 7671) qualification
                  equivalent to C&G 2382, and the EAL Inspection and Testing qualification
                  equivalent to C&G 2391. Both are available from EAL and are accepted for
                  JIB renewal and competent person scheme registration.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Revise for your EAL Level 3 with Elec-Mate"
          description="Flashcards, AI tutor, and mock exams for every unit of your EAL Level 3 Electrical Installation qualification. Study on your phone, pass your exams. 7-day free trial."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EALLevel3GuidePage() {
  return (
    <GuideTemplate
      title="EAL Level 3 Electrical Installation | EAL vs City & Guilds Guide"
      description="Complete guide to the EAL Level 3 Electrical Installation qualification. What EAL is, qualification structure, units covered, EAL vs City & Guilds comparison, employer and college acceptance, assessment methods, and next steps."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Qualification Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          EAL Level 3 Electrical Installation:{' '}
          <span className="text-yellow-400">EAL vs City & Guilds Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about the EAL Level 3 Electrical Installation qualification — what EAL is, how the qualification compares to City & Guilds 2365, employer acceptance, assessment methods, and what comes next after qualifying."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EAL Level 3 Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Pass Your EAL Level 3 with Elec-Mate"
      ctaSubheading="Flashcards, AI tutor, and revision tools for EAL Level 3 Electrical Installation. Study on your phone, pass your exams. 7-day free trial, cancel anytime."
    />
  );
}
