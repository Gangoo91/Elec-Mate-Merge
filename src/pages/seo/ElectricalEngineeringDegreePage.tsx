import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Briefcase,
  PoundSterling,
  BookOpen,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Careers', href: '/how-to-become-electrician' },
  { label: 'Electrical Engineering Degree', href: '/electrical-engineering-degree' },
];

const tocItems = [
  { id: 'engineer-vs-electrician', label: 'Electrical Engineer vs Electrician' },
  { id: 'degree-routes', label: 'BEng and MEng Degree Routes' },
  { id: 'hnc-hnd-top-up', label: 'HNC/HND to Degree Top-Up' },
  { id: 'chartered-engineer', label: 'Becoming a Chartered Engineer (CEng)' },
  { id: 'iet-membership', label: 'IET Membership' },
  { id: 'careers', label: 'Careers: Design, Project and Commissioning' },
  { id: 'salaries', label: 'Salaries (£35,000–£75,000+)' },
  { id: 'for-electricians', label: 'For Electricians Considering a Degree' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electrical engineer and an electrician are distinct professions with different entry routes, qualifications, and legal authorisations. An electrician installs, tests, and certifies wiring; an electrical engineer designs systems, specifies equipment, and manages projects at a higher technical level.',
  'A BEng (Bachelor of Engineering) takes three years full-time; a MEng (Master of Engineering) takes four to five years. Both are accredited by the Engineering Council through professional bodies such as the Institution of Engineering and Technology (IET).',
  'Electricians who hold an HNC or HND in Electrical and Electronic Engineering can often top up to a full BEng in one to two years through a university degree top-up programme, without repeating prior learning.',
  'Chartered Engineer (CEng) status requires an accredited MEng (or BEng plus further learning), at least four years of progressive professional experience, and membership of a licensed professional body such as the IET. It is the highest professional engineering grade in the UK.',
  'Salaries range from £35,000 for a graduate design engineer to over £75,000 for a senior chartered engineer or engineering manager. London and the South East typically attract a 10 to 20 per cent premium.',
];

const faqs = [
  {
    question: 'What is the difference between an electrical engineer and an electrician?',
    answer:
      'An electrician is a skilled tradesperson who installs, maintains, and tests electrical installations under BS 7671 and Part P of the Building Regulations. Qualification is typically through an apprenticeship, NVQ Level 3, and AM2 assessment. An electrical engineer designs and specifies electrical systems — from power distribution networks to building services — using engineering principles, calculation software, and technical standards. Engineers typically hold a BEng or MEng degree and often work in offices producing designs, specifications, and reports, whereas electricians primarily work on site. Both roles require deep technical knowledge, but their scope, legal authorisations, and day-to-day work are distinct.',
  },
  {
    question: 'Can a qualified electrician become an electrical engineer?',
    answer:
      'Yes. Many successful electrical engineers began as apprentice electricians. The most common route is to study for an HNC and then HND in Electrical and Electronic Engineering while working, then complete a degree top-up to BEng. With an accredited BEng and several years of engineering experience, you can apply for Incorporated Engineer (IEng) status. With further learning and experience — or an MEng — you can apply for Chartered Engineer (CEng). Trade experience is recognised as valuable professional development by the IET and Engineering Council.',
  },
  {
    question: 'How long does an electrical engineering degree take?',
    answer:
      'A full-time BEng typically takes three years; a MEng takes four to five years. Part-time study takes longer — often four to six years for a BEng. If you already hold an HNC or HND, a degree top-up to BEng can take one to two years full-time. Many universities offer sandwich placements (year in industry) which extend the programme by one year but significantly improve graduate employment prospects.',
  },
  {
    question: 'What is IET membership and why does it matter?',
    answer:
      "The Institution of Engineering and Technology (IET) is the UK's largest professional engineering body for electrical, electronic, and technology engineers. Membership grades include Student, Associate, Member (MIET), and Fellow (FIET). MIET alongside an accredited degree supports applications for IEng or CEng registration. IET membership provides access to technical resources, CPD tracking, networking events, and industry recognition. Employers in building services, power utilities, and defence frequently list IET membership as desirable.",
  },
  {
    question: 'What does a Chartered Electrical Engineer (CEng) earn?',
    answer:
      'Chartered Engineers (CEng) in electrical disciplines typically earn between £55,000 and £80,000+ depending on sector and experience. Engineering consultancies, power utilities, defence contractors, and major infrastructure projects pay the highest rates. Senior chartered engineers in specialised roles (e.g., HV systems design, rail electrification, offshore) regularly exceed £90,000. CEng status is a significant differentiator and typically adds £10,000 to £20,000 to base salary compared to non-chartered peers at the same seniority.',
  },
  {
    question: 'Do I need a degree to become a design engineer?',
    answer:
      'Not always, but it is strongly advantageous. Some candidates reach junior design engineer roles through HNC/HND and significant site experience, particularly in building services or small consultancies. However, most medium-to-large engineering consultancies, contractors, and utility companies require a BEng as a minimum for graduate design engineer positions. For senior roles, project management positions, or chartered status, a degree is effectively mandatory. If you are an experienced electrician without a degree, an HNC-to-BEng top-up is the most time-efficient route.',
  },
  {
    question: 'What is the difference between a BEng and MEng?',
    answer:
      "A BEng (Bachelor of Engineering) is a three-year undergraduate degree. A MEng (Master of Engineering) is an integrated four or five-year programme that includes master's level study in the final year and is fully accredited for Chartered Engineer (CEng) registration. A BEng alone satisfies the academic requirement for Incorporated Engineer (IEng) status and partially satisfies CEng — BEng graduates seeking CEng must complete a further learning programme (typically a taught master's or recognised CPD programme) to meet the full CEng academic standard.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Routes into the electrical trade: apprenticeships, adult entry, AM2, and getting your first job.',
    icon: GraduationCap,
    category: 'Career Guide',
  },
  {
    href: '/nvq-level3-electrical',
    title: 'NVQ Level 3 Electrical Installation',
    description: 'Portfolio-based NVQ for experienced electricians seeking formal qualifications.',
    icon: BookOpen,
    category: 'Qualification',
  },
  {
    href: '/guides/am2-assessment-preparation',
    title: 'AM2 Assessment Preparation',
    description: 'What to expect in the AM2 practical assessment and how to pass first time.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/electrician-salary-benchmarking',
    title: 'Electrician Salary Benchmarking 2026',
    description:
      'Regional salary data for electricians, foremen, and electrical engineers across the UK.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'engineer-vs-electrician',
    heading: 'Electrical Engineer vs Electrician: Key Differences',
    content: (
      <>
        <p>
          The terms &quot;electrical engineer&quot; and &quot;electrician&quot; are frequently
          confused by the public and, in some contexts, even within the industry. They are distinct
          professions with different qualifications, legal authorisations, and day-to-day roles.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician</strong> — a skilled tradesperson qualified to install, test,
                inspect, and certify electrical installations in buildings. Qualifications include
                apprenticeship, NVQ Level 3 Electrotechnical Installation, City and Guilds 2365, and
                AM2 assessment. Legally authorised (via competent person scheme registration) to
                self-certify notifiable work under Part P of the Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical engineer</strong> — a graduate-level professional who designs
                electrical systems, conducts load calculations, produces specifications and
                drawings, and manages engineering projects. Typically holds a BEng or MEng in
                Electrical Engineering and works in consultancies, utility companies, construction,
                or manufacturing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where they overlap</strong> — commissioning engineers often come from an
                installation background. Design engineers with site experience are highly valued.
                Many electricians progress into engineering roles through part-time HNC/HND study
                followed by a degree top-up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protected titles</strong> — &quot;Chartered Engineer&quot; and
                &quot;Incorporated Engineer&quot; are protected titles in the UK, awarded by the
                Engineering Council through licensed professional bodies (e.g., IET).
                &quot;Electrician&quot; is not a legally protected title, though registration with
                NICEIC or NAPIT is required for self-certification of notifiable work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding the distinction matters when advising clients, applying for jobs, or
          planning your career development. If you are a qualified electrician considering
          engineering, your site experience is a genuine advantage — most engineering graduates have
          never connected a consumer unit.
        </p>
      </>
    ),
  },
  {
    id: 'degree-routes',
    heading: 'BEng and MEng Electrical Engineering Degree Routes',
    content: (
      <>
        <p>
          UK universities offer two primary undergraduate routes in electrical engineering: the BEng
          (Bachelor of Engineering) and the MEng (Master of Engineering). Both are accredited by the
          Engineering Council through professional bodies including the IET.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BEng Electrical Engineering (3 years full-time)</strong> — covers circuit
                theory, power systems, control systems, electromagnetics, signal processing,
                electronics, and engineering mathematics. Satisfies the academic requirement for
                Incorporated Engineer (IEng) registration. Partially satisfies CEng — further
                learning is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MEng Electrical Engineering (4–5 years full-time)</strong> — includes all
                BEng content plus advanced master&apos;s level modules in the final year. Fully
                satisfies the academic requirement for Chartered Engineer (CEng) registration. The
                preferred route for those targeting senior engineering or leadership positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sandwich year (4 years for BEng)</strong> — many universities offer a
                placement year in industry between the second and final year. Sandwich graduates
                typically earn more in their first role and receive job offers before graduation.
                Highly recommended for career development.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Entry requirements</strong> — typical offers are BBB to AAB at A-level, with
                Mathematics required and Physics or Further Mathematics strongly preferred. UCAS
                tariff entry exists at some universities for mature students or those with
                alternative qualifications including HNC/HND.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Costs (2026)</strong> — full tuition fees are £9,535 per year for home
                students in England under current legislation. Student loans cover fees and
                maintenance. Apprenticeship-degree routes (where available) can eliminate personal
                tuition debt entirely.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Degree apprenticeships in electrical engineering are available with employers including
          National Grid, Balfour Beatty, and Amey. These combine full-time university study with
          employment and can lead to a BEng or MEng without student debt.
        </p>
      </>
    ),
  },
  {
    id: 'hnc-hnd-top-up',
    heading: "HNC/HND to Degree Top-Up: The Electrician's Fast Track",
    content: (
      <>
        <p>
          For experienced electricians who already hold an HNC (Higher National Certificate) or HND
          (Higher National Diploma) in Electrical and Electronic Engineering, a degree top-up
          programme offers the most time-efficient route to a full BEng.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HNC to BEng top-up</strong> — typically two years full-time or three to four
                years part-time. The HNC is recognised as the equivalent of the first year of a
                degree. You join in year two at most universities offering this route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HND to BEng top-up</strong> — typically one year full-time or two years
                part-time. The HND is recognised as the equivalent of the first two years of a
                degree at many institutions. Top-up entry is into the final year of the BEng.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part-time and distance learning</strong> — the University of Hertfordshire,
                Teesside University, and several others offer part-time BEng top-up programmes
                specifically designed for working engineers and tradespeople. Study around your
                existing job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prior learning recognition</strong> — most universities will consider your
                trade experience and any CPD qualifications when assessing your application. A
                portfolio demonstrating engineering competence can sometimes substitute for formal
                HNC/HND qualifications.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HNC/HND is offered by colleges across the UK and can be studied part-time over two to
          three years while working as an electrician. City and Guilds, Pearson BTEC, and other
          awarding bodies offer equivalent qualifications. Confirm that the HNC/HND is accredited by
          the Engineering Council before enrolling if degree top-up is your goal.
        </p>
        <SEOAppBridge
          title="Track your CPD and qualifications with Elec-Mate"
          description="Elec-Mate helps electricians and engineers manage certificates, CPD records, and professional development in one place. Join 1,000+ UK electrical professionals."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'chartered-engineer',
    heading: 'Becoming a Chartered Engineer (CEng)',
    content: (
      <>
        <p>
          Chartered Engineer (CEng) is the highest professional engineering grade in the UK,
          regulated by the Engineering Council. It signifies a high level of technical competence,
          professional commitment, and ethical practice.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Academic requirement</strong> — an accredited MEng, or a BEng plus a further
                learning programme (typically a part-time master&apos;s, a recognised CPD programme,
                or a technical report demonstrating master&apos;s level learning). The Engineering
                Council publishes the UK Standard for Professional Engineering Competence (UK-SPEC)
                which defines the requirements precisely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience requirement</strong> — at least four years of progressive
                professional engineering experience, with demonstrated competence in the five
                UK-SPEC competency categories: knowledge and understanding, design and innovation,
                technical and management leadership, professional commitment, and communication and
                interpersonal skills.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Membership of a licensed professional body</strong> — CEng must be applied
                for through a licensed professional body, most commonly the IET for electrical
                engineers. The body reviews your application and conducts a professional review
                interview.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorporated Engineer (IEng)</strong> — a step below CEng, achieved with an
                accredited BEng alone plus experience. IEng is the professional grade for engineers
                who apply and adapt established technology. Many senior electricians and project
                engineers work at IEng level without requiring CEng.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The full CEng journey from electrician to chartered engineer typically takes ten to
          fifteen years, including trade qualification, HNC/HND study, degree top-up, and
          professional experience. It is a significant commitment, but one that transforms career
          prospects and earnings.
        </p>
      </>
    ),
  },
  {
    id: 'iet-membership',
    heading: 'IET Membership: What It Is and Why It Matters',
    content: (
      <>
        <p>
          The Institution of Engineering and Technology (IET) is the UK&apos;s largest engineering
          professional body for electrical, electronic, and technology disciplines. It is one of
          only a small number of bodies licensed by the Engineering Council to award IEng and CEng
          registrations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Membership grades</strong> — Student (in full-time education), Associate
                Member (AMIET, for those developing their career), Member (MIET, for professionally
                active engineers), and Fellow (FIET, for those with exceptional experience and
                contributions to the profession).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Benefits</strong> — access to the IET online library (standards, journals,
                and technical guides), CPD tracking tools, career development resources, local and
                national networking events, mentoring programmes, and the IET Wiring Regulations (BS
                7671) at a significant member discount.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual subscription</strong> — MIET subscription is approximately £210 per
                year (2026). Student membership is free. Fellow membership is higher.
                Employer-sponsored membership is common in larger engineering organisations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CEng and IEng registration via IET</strong> — the IET conducts professional
                reviews for both CEng and IEng registration. The process involves submitting a
                career report, having it assessed by two reviewers, and attending a professional
                review interview.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'careers',
    heading: 'Careers: Design Engineer, Project Engineer, Commissioning Engineer',
    content: (
      <>
        <p>
          An electrical engineering degree opens doors to several distinct career paths. The three
          most common for those with an installation background are design engineering, project
          engineering, and commissioning engineering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design engineer</strong> — produces electrical drawings, specifications,
                cable schedules, load calculations, and technical submittals for construction
                projects. Works primarily in a consultancy or contractor design office. Salary
                range: £35,000 to £60,000+ depending on experience and sector. Software tools
                include AutoCAD Electrical, Revit MEP, Amtech Pro Design, and Hevacomp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Project engineer</strong> — manages the technical delivery of electrical
                installation projects, coordinating between design teams, site teams, and clients.
                Responsible for scope management, technical submittals, RFIs, and quality assurance.
                Salary range: £40,000 to £70,000. Strong site experience is a significant advantage
                in this role.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning engineer</strong> — responsible for the testing, energisation,
                and handover of electrical installations, including HV/LV switchgear, transformer
                commissioning, UPS systems, and building management systems. Salary range: £45,000
                to £75,000+. Significant travel is common. Site experience from an electrician
                background is highly valued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Other routes</strong> — power systems engineering (DNOs, National Grid),
                building services engineering (M&E consultancies), renewable energy engineering
                (solar PV, wind), rail electrification, defence and aerospace. Each sector has its
                own specialisms and salary ranges.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'salaries',
    heading: 'Electrical Engineer Salaries in the UK (2026)',
    content: (
      <>
        <p>
          Electrical engineering salaries vary significantly by role, sector, experience, and
          location. The following figures are indicative for 2026 and reflect permanent employed
          positions in mainstream sectors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Graduate / junior design engineer (0–3 years)</strong> — £30,000 to £40,000.
                London roles typically £35,000 to £45,000. Graduate schemes with major contractors
                and consultancies often include structured development and study support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-level design or project engineer (3–7 years)</strong> — £40,000 to
                £58,000. IEng registration and relevant sector experience push towards the upper
                end. Specialist sectors (HV, data centre, rail) pay a premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior engineer / principal engineer (7+ years)</strong> — £55,000 to
                £75,000. CEng holders and those with recognised specialisms can command £75,000 to
                £90,000, particularly in London-based consultancies and specialist contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Engineering manager / director</strong> — £70,000 to £100,000+. Management
                of technical teams, business development, and client relationships. CEng or
                equivalent expected at this level. Package often includes bonus and car allowance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day rate contracting</strong> — experienced electrical engineers working as
                contractors typically charge £350 to £650 per day depending on specialism and
                sector. HV commissioning, data centre design, and offshore work command the highest
                day rates.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working as sole traders in London and the South East regularly earn more than
          junior electrical engineers. The engineering career path offers long-term progression and
          access to senior leadership roles that are less accessible from the trade route.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Managing Qualifications and CPD',
    content: (
      <>
        <p>
          Whether you are a working electrician tracking your current qualifications or an engineer
          managing certificates and compliance documentation, having your records in one place makes
          professional development and client-facing work easier.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify Electrical Work on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Whether you are a qualified electrician or a commissioning engineer, completing
                  accurate certificates on the day of work protects you and your client. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue EICs and EICRs from your phone before you leave the job.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice Professionally</h4>
                <p className="text-white text-sm leading-relaxed">
                  As you move into engineering or grow your trade business, professional quoting and
                  invoicing becomes increasingly important. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce written quotes and invoices that reflect the quality of your work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Elec-Mate — the app built for UK electrical professionals"
          description="From apprentice to chartered engineer, Elec-Mate helps you certify, quote, invoice, and manage your electrical business. Join 1,000+ UK electrical professionals on a 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalEngineeringDegreePage() {
  return (
    <GuideTemplate
      title="Electrical Engineering Degree UK | BEng vs MEng, CEng Routes and Salaries"
      description="Complete guide to electrical engineering degrees in the UK. BEng vs MEng, HNC/HND to degree top-up, Chartered Engineer (CEng) routes, IET membership, design and commissioning engineer careers, and 2026 salary guide (£35,000–£75,000+)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Electrical Engineering Degree UK:{' '}
          <span className="text-yellow-400">Routes, CEng and Salary Guide 2026</span>
        </>
      }
      heroSubtitle="An electrical engineering degree opens the path from skilled tradesperson to chartered engineer. This guide explains the difference between an electrical engineer and an electrician, BEng and MEng routes, HNC/HND to degree top-up options, how to become a Chartered Engineer (CEng), IET membership, and what electrical engineers earn across the UK in 2026."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Engineering Degrees"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Electrical Career with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians and engineers using Elec-Mate to certify, quote, and manage their electrical business. 7-day free trial — no credit card required."
    />
  );
}
