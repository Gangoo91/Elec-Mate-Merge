import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  PoundSterling,
  Zap,
  Users,
  ClipboardCheck,
  Lightbulb,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'Career Progression Guide', href: '/apprentice-progression-guide' },
];

const tocItems = [
  { id: 'after-apprenticeship', label: 'After You Complete Your Apprenticeship' },
  { id: 'jib-ecs-gold-card', label: 'JIB ECS Gold Card' },
  { id: 'am2-assessment', label: 'AM2 Assessment' },
  { id: 'level-3-qualification', label: 'Your Level 3 Qualification' },
  { id: 'supervisor-foreman', label: 'Progressing to Supervisor or Foreman' },
  { id: 'electrical-design', label: 'Electrical Design' },
  { id: 'further-study', label: 'Further Study (HNC/HND)' },
  { id: 'self-employment', label: 'Becoming Self-Employed' },
  { id: 'salary-progression', label: 'Salary Progression' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'After completing your apprenticeship and EPA, your first step is applying for the JIB ECS Gold Card — the industry-standard card that identifies you as a qualified electrician on UK construction sites.',
  'The AM2 or AM2S practical assessment is a gateway requirement for the EPA but is also separately important for JIB Gold Card eligibility and employer recognition.',
  'Qualified electricians can progress to supervisor, foreman, electrical designer, project manager, or self-employment — the electrical trade offers exceptional career flexibility.',
  'An HNC (Higher National Certificate) or HND (Higher National Diploma) in Electrical/Electronic Engineering opens doors to electrical design, project management, and engineering roles.',
  'Self-employed electricians in the UK typically earn significantly more per hour than employed equivalents, but must be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to carry out notifiable work.',
];

const faqs = [
  {
    question: 'What do I do immediately after completing my electrical apprenticeship?',
    answer:
      "Immediately after completing your apprenticeship and receiving your EPA result, the key steps are: (1) Apply for your JIB ECS Gold Card — this is your industry identity card confirming you are a qualified electrician. You will need your Level 3 qualification certificate and EPA certificate. (2) Ensure you have passed the AM2 or AM2S practical assessment, which is required for the Gold Card. (3) If you want to work as a self-employed electrician, register with a competent person scheme such as NICEIC, NAPIT, or ELECSA so you can self-certify notifiable electrical work. (4) Update your CV and start discussing your post-apprenticeship position with your employer or exploring other opportunities.",
  },
  {
    question: 'What is the JIB ECS Gold Card and how do I get it?',
    answer:
      "The JIB (Joint Industry Board) ECS (Electrotechnical Certification Scheme) Gold Card is the industry-standard electrotechnical identity card for qualified electricians in the UK. It is carried on construction sites and used by principal contractors to verify that electricians are qualified and competent. To obtain a Gold Card, you need: a Level 3 Electrical Installation qualification (C&G 2365 or equivalent), the AM2 or AM2S practical assessment, an 18th Edition BS 7671 qualification (C&G 2382), and a valid Health and Safety test certificate (CITB or equivalent). Applications are made through the JIB website. The card is valid for five years and must be renewed.",
  },
  {
    question: 'What salary can I expect as a newly qualified electrician?',
    answer:
      "Salaries for newly qualified electricians (JIB Grade: Approved Electrician) vary significantly by region and sector. In 2026, typical salaries are: London: £38,000 to £45,000; South East England: £35,000 to £42,000; Midlands, North West, Yorkshire: £30,000 to £38,000; Scotland: £32,000 to £40,000. Electricians working in specialist sectors (data centres, offshore, rail, defence) command significantly higher rates. Self-employed electricians typically charge day rates of £250 to £450 depending on location and specialism. These are the employed salaries — actual take-home for self-employed contractors varies based on business expenses and how the business is structured.",
  },
  {
    question: 'How do I become a self-employed electrician?',
    answer:
      "To work as a self-employed electrician carrying out notifiable work (most domestic and commercial electrical installation work), you must register with a competent person scheme. The main schemes are NICEIC, NAPIT, and ELECSA. Registration requires: a current 18th Edition qualification (C&G 2382), an inspection and testing qualification (C&G 2391 or equivalent), proof of your Level 3 qualification and AM2, a technical assessment (an assessor will visit a job you are working on), and annual registration fees. Once registered, you can self-certify your work to Building Control, issue Electrical Installation Certificates (EICs), and carry out EICR inspections. You will also need to register as self-employed with HMRC and consider public liability and professional indemnity insurance.",
  },
  {
    question: 'What is an HNC in Electrical Engineering and is it worth doing?',
    answer:
      "An HNC (Higher National Certificate) in Electrical/Electronic Engineering is a Level 4 qualification that takes one to two years part-time (or one year full-time). It covers electrical principles, circuit analysis, power systems, programmable logic controllers, and project management. An HNC is the stepping stone to an HND (Level 5) and then a Bachelor of Engineering (BEng) degree. The HNC/HND route is worth pursuing if you want to move into electrical design, engineering, project management, or site management. Many electrical contractors offer sponsorship for HNC study. It also significantly increases your earning potential — electrical design engineers typically earn £45,000 to £65,000+.",
  },
  {
    question: 'How do I progress from electrician to supervisor or foreman?',
    answer:
      "Progression from electrician to supervisor or foreman typically requires two to five years of post-qualification experience, depending on the employer and sector. Key steps: demonstrate reliability, technical competence, and the ability to plan and organise work without being told; show leadership by helping junior electricians and apprentices; obtain your SMSTS (Site Management Safety Training Scheme) or SSSTS (Site Supervisor Safety Training Scheme) certificate; and discuss progression formally with your employer. Some employers offer a formal supervisor development programme. The JIB grading structure includes Approved Electrician, Senior Approved Electrician (SAE), Foreman Electrician, and Project Supervisor — each requiring additional qualifications and experience.",
  },
  {
    question: 'What specialist areas can electricians work in after qualifying?',
    answer:
      "Qualified electricians have a wide range of specialist areas to move into: data centres and critical infrastructure (high-paying, precision installation); fire alarm and security systems (requires specialist qualifications such as FIA Level 3 or BAFE); renewable energy (solar PV, EV charging, battery storage — all growing rapidly); industrial and manufacturing electrical maintenance; rail and transport infrastructure; offshore and oil and gas (highest rates but demanding conditions); building management systems (BMS) and smart building technology; and electrical design and draughting. Each specialism requires additional qualifications and experience but can significantly increase your earning potential and job satisfaction.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/apprentice-endpoint-assessment',
    title: 'End-Point Assessment (EPA) Guide',
    description: 'Knowledge test, practical observation, professional discussion — everything about the EPA.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/city-guilds-level3-guide',
    title: 'City & Guilds Level 3 Guide',
    description: 'The 2365 qualification — structure, units, assessment, and how to achieve distinction.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/apprentice-first-year-revision',
    title: 'Year 1 Revision Guide',
    description: "Ohm's Law, circuit theory, health and safety — complete first year revision.",
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description: 'AI tutor, flashcards, and study tools for electrical apprentices and qualified electricians.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote jobs professionally from your phone — essential for self-employed electricians.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'after-apprenticeship',
    heading: 'What Happens After You Complete Your Apprenticeship',
    content: (
      <>
        <p>
          Completing your electrical apprenticeship is a major achievement. You will have spent
          three to four years developing the skills, knowledge, and behaviours to work as a
          competent electrician. Now the real career begins. The options available to you are
          broad — from progressing within your current employer to setting up your own business,
          moving into specialist sectors, or pursuing further qualifications.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immediate next steps:</strong> Apply for your JIB ECS Gold Card, ensure
                you have an up-to-date 18th Edition (C&G 2382) certificate, consider obtaining
                your C&G 2391 Inspection and Testing qualification if you have not already, and
                begin working at{' '}
                <SEOInternalLink href="/apprentice-endpoint-assessment">
                  Approved Electrician grade
                </SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stay with your employer or move on:</strong> Many apprentices stay with
                their training employer initially — you know the company, the systems, and the
                clients. However, moving to a new employer after qualification is also completely
                normal and can lead to better pay, new skills, and broader experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan your next qualification:</strong> The C&G 2391 Inspection and Testing
                and the 18th Edition update (C&G 2382) are the two qualifications most employers
                expect soon after completion. These enable you to carry out EICRs and sign off
                Electrical Installation Certificates (EICs).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'jib-ecs-gold-card',
    heading: 'JIB ECS Gold Card',
    content: (
      <>
        <p>
          The JIB ECS Gold Card (Electrotechnical Certification Scheme Gold Card) is the
          industry-standard identity card for qualified electricians working in the UK. It is
          carried on construction sites and used by principal contractors to verify that
          electricians holding the card are properly qualified and competent. Most large
          contractors will not allow electricians on site without a valid ECS card.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gold Card requirements:</strong> Level 3 Electrical Installation
                qualification (C&G 2365 or equivalent), AM2 or AM2S practical assessment, 18th
                Edition BS 7671 qualification (C&G 2382), and a valid Health and Safety test
                certificate (CITB Health, Safety & Environment test or equivalent).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applying:</strong> Applications are submitted through the JIB website
                (jib.org.uk). You will need to upload your qualification certificates and pay the
                application fee. The card is issued as a physical card and added to the ECS online
                verification system, which contractors use to confirm your details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renewal:</strong> The Gold Card is valid for five years. Renewal requires
                a current 18th Edition certificate and a valid Health and Safety test. CPD (Continuing
                Professional Development) hours may also be required as the JIB develops its
                competency framework.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'am2-assessment',
    heading: 'The AM2 Assessment',
    content: (
      <>
        <p>
          The AM2 (Achievement Measurement 2) is a practical competency assessment set by JTL
          (Joint Training Limited) for England and Wales, and the AM2S for Scotland (operated by
          SELECT). It is a rigorous practical test carried out in a controlled, simulated
          installation environment, and is both a gateway requirement for the EPA and a requirement
          for the JIB ECS Gold Card.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it tests:</strong> The AM2 is a two-day assessment covering
                installation work (wiring circuits, connecting equipment, cable containment),
                inspection and testing (carrying out tests and completing documentation), and fault
                diagnosis (identifying and rectifying faults in a live installation). All work is
                carried out under supervision in a JTL assessment centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation:</strong> Your college or training provider will prepare you
                for the AM2 through practical training sessions. Practice inspection and testing
                procedures, faultfinding methodology, and reading wiring diagrams. The AM2 uses
                domestic-scale installation work — be confident with consumer unit wiring, ring
                final circuits, and standard test procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you need to re-sit:</strong> AM2 re-sits are available. If you do not
                pass, JTL will provide feedback on which elements require improvement. Most
                apprentices who prepare thoroughly pass first time — do not underestimate the
                assessment, but do not be intimidated by it either.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'level-3-qualification',
    heading: 'Your Level 3 Qualification',
    content: (
      <>
        <p>
          Your Level 3 Electrical Installation qualification — whether City & Guilds 2365, EAL,
          or an equivalent — is the academic backbone of your apprenticeship. Combined with the
          AM2 and EPA, it gives you a full professional qualification recognised across the UK
          electrotechnical industry.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it covers:</strong> The Level 3 includes units in installation
                technology, inspection and testing, fault diagnosis, electrical system design,
                and BS 7671. See the{' '}
                <SEOInternalLink href="/city-guilds-level3-guide">
                  City & Guilds 2365 Level 3 guide
                </SEOInternalLink>{' '}
                for the full unit breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification number:</strong> City & Guilds 2365 is the standard
                on-programme qualification for most electrical apprentices. The full qualification
                title is City & Guilds Level 3 Diploma in Electrical Installations (Buildings and
                Structures). EAL offers an equivalent at Level 3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keeping it current:</strong> BS 7671 is updated periodically. The 18th
                Edition Amendment 3 (2024) is the current version. You must maintain a current
                18th Edition qualification (C&G 2382) to keep your ECS Gold Card and competent
                person scheme registration. When a new amendment is published, a short update
                course is usually available.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supervisor-foreman',
    heading: 'Progressing to Supervisor or Foreman',
    content: (
      <>
        <p>
          Moving from electrician to supervisor or foreman is a natural career progression for
          many qualified electricians. The JIB grading structure provides a clear framework:
          Approved Electrician → Senior Approved Electrician (SAE) → Foreman Electrician →
          Project Supervisor. Each grade requires additional experience and qualifications.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior Approved Electrician (SAE):</strong> Typically requires three to
                five years of post-qualification experience and demonstrable technical leadership.
                The SAE grade recognises experienced electricians who mentor others and take
                responsibility for technical decisions on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Foreman Electrician:</strong> Manages a team of electricians on site.
                Requires strong organisational skills, the ability to read and interpret drawings,
                and people management capability. The SSSTS (Site Supervisor Safety Training
                Scheme) certificate is expected at this level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Project Supervisor / Contracts Manager:</strong> Oversees multiple
                contracts or a large single project. Typically requires an HNC or HND, the SMSTS
                (Site Management Safety Training Scheme), and five or more years of post-qualification
                experience. Often involves pricing, planning, and client management in addition to
                technical oversight.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-design',
    heading: 'Electrical Design as a Career Path',
    content: (
      <>
        <p>
          Electrical design is a highly rewarding career path for electricians who enjoy the
          technical and analytical side of the trade. Designers produce the calculations, drawings,
          and specifications that tell installation electricians how to build a system. They work
          in consultancy practices, large contractors, or as independent consultants.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What designers do:</strong> Produce electrical load calculations, select
                cables and protective devices, design distribution boards and switchgear, produce
                single-line diagrams and installation drawings (often using AutoCAD Electrical or
                Revit MEP), write specifications, and check designs comply with BS 7671, Building
                Regulations Part P, and the client's requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> An HNC or HND in Electrical/Electronic
                Engineering is the standard entry point into electrical design roles. Many
                designers go on to achieve membership of IET (MIET) and eventually Chartered
                Engineer (CEng) status. The City & Guilds 2396 (Design and Verification of
                Electrical Installations) is the design-specific qualification aligned with
                BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salary:</strong> Junior electrical designers typically earn £30,000 to
                £40,000. Experienced designers and principal engineers earn £50,000 to £70,000+.
                Independent consulting electrical engineers can earn significantly more.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'further-study',
    heading: 'Further Study: HNC and HND',
    content: (
      <>
        <p>
          An HNC (Higher National Certificate) or HND (Higher National Diploma) in Electrical or
          Electronic Engineering is the most common further study route for electricians wanting
          to move into design, management, or engineering roles. These are Level 4 (HNC) and
          Level 5 (HND) qualifications, awarded by Pearson (BTEC) and available at most further
          education colleges.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HNC in Electrical Engineering (Level 4):</strong> Typically one year
                full-time or two years part-time. Covers electrical principles, circuit analysis,
                power systems, programmable logic controllers (PLCs), project management, and
                engineering mathematics. Part-time study is popular with working electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HND in Electrical Engineering (Level 5):</strong> Extends the HNC by a
                further year. The HND is the standard entry requirement for the final year of a
                BEng (Bachelor of Engineering) degree, allowing progression into a degree with
                just one additional year of full-time study.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Degree Apprenticeship:</strong> Level 6 Electrical/Electronic Engineering
                degree apprenticeships are available with some larger employers and allow you to
                earn a full BEng while working. These are highly competitive but provide both the
                qualification and employer-funded study.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many employers will sponsor HNC/HND study — ask your employer or new employer about
          educational support. Some large contractors have formal development programmes that
          fund further qualifications for high-performing electricians.
        </p>
      </>
    ),
  },
  {
    id: 'self-employment',
    heading: 'Becoming Self-Employed',
    content: (
      <>
        <p>
          Self-employment is a popular route for qualified electricians and offers significant
          income potential, flexibility, and independence. However, it requires additional
          qualifications, registration, insurance, and business management skills that most
          apprentices are not taught during their training.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration:</strong> To self-certify notifiable
                electrical work (most domestic and commercial installation, additions, and
                alterations), you must be registered with NICEIC, NAPIT, ELECSA, or an equivalent
                scheme. Annual fees and a technical assessment apply. Without registration, every
                piece of notifiable work must be submitted to Building Control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance:</strong> Public liability insurance (minimum £2 million cover,
                most schemes require £5 million) and professional indemnity insurance are essential.
                Your tools and equipment should also be insured. Costs vary — budget £500 to £1,500
                per year for a sole trader.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMRC registration:</strong> Register as self-employed with HMRC within
                three months of starting. Keep financial records, make Self Assessment tax returns,
                and pay Class 2 and Class 4 National Insurance. Consider using an accountant,
                especially in the first year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business tools:</strong> Use the{' '}
                <SEOInternalLink href="/electrical-quoting-app">
                  Elec-Mate quoting app
                </SEOInternalLink>{' '}
                to produce professional quotes from your phone, and the EICR and certificate tools
                to complete paperwork on site. Professional presentation wins jobs and justifies
                your rates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'salary-progression',
    heading: 'Salary Progression for Qualified Electricians',
    content: (
      <>
        <p>
          The electrical trade offers strong salary progression relative to many other trades and
          technical careers. Starting as an Approved Electrician, you can progress through the JIB
          grading structure with salary increases at each grade, or move into specialist or
          management roles for significantly higher earnings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician (newly qualified):</strong> £28,000 to £38,000
                depending on region. JIB recommended rates are updated annually and serve as a
                minimum benchmark for directly employed electricians working under the JIB
                Working Rule Agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior Approved Electrician (3–5 years post-qualification):</strong>
                £35,000 to £45,000. Specialist sectors (data centres, defence, offshore) pay
                significantly more — day rates of £300 to £500 are common in these areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Foreman / Supervisor (5+ years):</strong> £42,000 to £55,000 employed.
                Self-employed contractors at this level with multiple operatives can earn
                considerably more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Designer / Engineer (HNC/HND):</strong> £40,000 to £70,000
                depending on sector, experience, and chartered status. Independent consulting
                electrical engineers can earn £80,000 to £120,000+.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build your electrical career with Elec-Mate"
          description="Professional certificates, quoting tools, job management, and AI-powered business support for self-employed electricians and growing electrical businesses. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeProgressionGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Apprentice Career Progression | After Your Apprenticeship"
      description="Complete guide to career progression after an electrical apprenticeship. JIB ECS Gold Card, AM2 assessment, Level 3 qualification, supervisor and foreman roles, electrical design, HNC/HND study, becoming self-employed, and UK salary progression."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Progression Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Electrical Apprentice Career Progression:{' '}
          <span className="text-yellow-400">After Your Apprenticeship</span>
        </>
      }
      heroSubtitle="Your complete guide to life after the apprenticeship — JIB ECS Gold Card, AM2 assessment, Level 3 qualification routes, progressing to supervisor or foreman, electrical design, HNC and HND study, becoming self-employed, and UK salary progression in 2026."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Career Progression After an Electrical Apprenticeship"
      relatedPages={relatedPages}
      ctaHeading="Grow Your Electrical Business with Elec-Mate"
      ctaSubheading="Professional certificates, job management, quoting, and AI support for self-employed electricians and electrical businesses at every stage. 7-day free trial."
    />
  );
}
