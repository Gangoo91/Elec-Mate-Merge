import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Building,
  HardHat,
  Users,
  ClipboardCheck,
  CheckCircle2,
  BookOpen,
  Award,
  DollarSign,
  GraduationCap,
  FileCheck2,
  Briefcase,
  Brain,
  Scale,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Site Manager | Role & Responsibilities';
const PAGE_DESCRIPTION =
  'Complete guide to becoming an electrical site manager. Role responsibilities, qualifications needed, managing subcontractors, CDM 2015 duties, health and safety management, career path from electrician to site manager, and the skills you need to succeed.';

const breadcrumbs = [
  { label: 'Career', href: '/guides' },
  { label: 'Site Manager', href: '/guides/electrical-site-manager' },
];

const tocItems = [
  { id: 'what-is-site-manager', label: 'What Is an Electrical Site Manager?' },
  { id: 'key-responsibilities', label: 'Key Responsibilities' },
  { id: 'qualifications-needed', label: 'Qualifications Needed' },
  { id: 'managing-subcontractors', label: 'Managing Subcontractors' },
  { id: 'cdm-duties', label: 'CDM 2015 Duties' },
  { id: 'health-and-safety', label: 'Health and Safety Management' },
  { id: 'career-path', label: 'Career Path' },
  { id: 'skills-for-success', label: 'Skills for Success' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electrical site manager oversees all electrical installation work on a construction project, managing the electrical workforce, coordinating with other trades, and ensuring work is completed safely, on time, and to the required standard.',
  'Key qualifications include Level 3 NVQ in Electrical Installation, SMSTS (Site Management Safety Training Scheme), 18th Edition BS 7671, and ideally 2391 inspection and testing — supplemented by significant on-site experience.',
  'CDM 2015 places specific legal duties on contractors and their site managers, including planning and managing work to ensure safety, providing welfare facilities, and ensuring all workers are competent and adequately supervised.',
  'Managing subcontractors requires clear communication, defined scopes of work, regular progress reviews, quality inspections, and documented sign-off procedures to maintain standards across the project.',
  'Elec-Mate supports site managers with AI-powered RAMS generation, digital certificate management for subcontractor compliance checking, and professional documentation tools that streamline site administration.',
];

const faqs = [
  {
    question: 'What qualifications do you need to be an electrical site manager?',
    answer:
      'There is no single mandatory qualification titled "electrical site manager," but the role requires a combination of electrical and management qualifications. As a minimum, you need Level 3 NVQ in Electrical Installation (or equivalent), current BS 7671 18th Edition certification, and the SMSTS (Site Management Safety Training Scheme) certificate — which is the standard construction management safety qualification recognised by Build UK and most principal contractors. A 2391 or equivalent inspection and testing qualification is highly desirable because you need to understand testing and certification procedures even if you are not personally carrying out the tests. Beyond technical qualifications, project management qualifications such as PRINCE2, APM, or a construction management NVQ Level 6 are increasingly expected for larger projects. First aid at work certification, asbestos awareness, and CSCS black card (manager level) are typically required for site access on major projects. The most important qualification, however, is experience — most electrical site managers have spent 8-15 years working on site before moving into management.',
  },
  {
    question: 'What does an electrical site manager earn in the UK?',
    answer:
      'Electrical site manager salaries in the UK vary significantly depending on the size and type of projects, the employer, the region, and your level of experience. As a general guide, entry-level electrical site managers (managing small-to-medium projects) earn GBP 45,000-55,000. Experienced site managers on medium-to-large commercial projects earn GBP 55,000-70,000. Senior site managers on major infrastructure, data centre, or high-rise projects earn GBP 70,000-90,000 or more. In London and the South East, salaries tend to be 10-20% higher than the national average. Many site managers also receive a company vehicle or car allowance, fuel card, pension contributions, private healthcare, and annual bonuses linked to project performance. Self-employed or contract site managers can earn GBP 350-500+ per day depending on the project, though they bear their own insurance, pension, and holiday costs.',
  },
  {
    question: 'What is the difference between a site manager and a project manager?',
    answer:
      'An electrical site manager is responsible for the day-to-day management of electrical work on a specific construction site. They are physically present on site, managing the workforce, coordinating with other trades, resolving problems in real time, and ensuring work progresses safely and on programme. A project manager operates at a higher level, potentially overseeing multiple sites or projects simultaneously. The project manager is responsible for the commercial aspects (budget, variations, valuations), contractual matters, client relationships, design coordination, and strategic programme management. On smaller projects, one person may fulfil both roles. On larger projects, the site manager reports to the project manager, with the site manager handling the site-based operations and the project manager handling the office-based commercial and contractual matters. The career progression is typically: foreman, site manager, project manager, contracts manager, operations director.',
  },
  {
    question: 'Do I need SMSTS to be an electrical site manager?',
    answer:
      'SMSTS (Site Management Safety Training Scheme) is not a legal requirement, but it is an industry standard that is effectively mandatory for anyone managing construction work on sites governed by CDM 2015. Most principal contractors require all managers and supervisors to hold a current SMSTS certificate as a condition of site access. The course covers CDM 2015 responsibilities, risk assessment, method statements, accident investigation, environmental management, and behavioural safety. It is a 5-day course (can be done as a block or over several weeks) followed by a written assessment. The certificate is valid for 5 years and must be renewed with a 2-day refresher course (SMSTS-R). Without SMSTS, you will not be issued a CSCS black card, and without a CSCS card, you will not get on to most major construction sites. For electrical site managers, SMSTS is non-negotiable.',
  },
  {
    question: 'What are the CDM duties of an electrical site manager?',
    answer:
      'Under CDM 2015, the electrical contractor is a "contractor" and the electrical site manager acts as the contractor\'s representative on site. The contractor\'s duties under CDM Regulation 15 include: planning, managing, and monitoring construction work under their control to ensure it is carried out safely; ensuring all workers have the necessary skills, knowledge, training, and experience; providing appropriate supervision; not beginning work unless reasonable steps have been taken to prevent unauthorised access; and providing welfare facilities. The site manager implements these duties on a daily basis. This means ensuring all electricians have valid CSCS cards and relevant qualifications, that risk assessments and method statements are in place before work starts, that permit-to-work systems are followed, that the work area is safe and tidy, and that any accidents or near-misses are reported and investigated. The site manager must also cooperate with the principal contractor and coordinate with other contractors on site.',
  },
  {
    question: 'How does Elec-Mate help electrical site managers?',
    answer:
      'Elec-Mate provides several features that directly support the work of electrical site managers. The AI RAMS Generator creates site-specific risk assessments and method statements from a plain-English job description, saving hours of documentation work. The digital certificate management system allows you to store and verify the qualifications of your entire team and subcontractors, ensuring CDM compliance. The testing and certification tools ensure consistent, professional documentation of all inspection and testing work. The AI Health and Safety agent generates CDM-compliant safety documentation. The study centre provides training resources for team development, including 18th Edition and 2391 preparation materials. For site managers responsible for multiple projects, having all documentation digitally accessible from any device is a significant efficiency improvement over paper-based systems.',
  },
];

const sections = [
  {
    id: 'what-is-site-manager',
    heading: 'What Is an Electrical Site Manager?',
    content: (
      <>
        <p>
          An electrical site manager is the person responsible for managing all electrical
          installation work on a construction project. They are the link between the project
          management team in the office and the electricians on the tools on site. The role combines
          technical electrical knowledge with construction management skills, health and safety
          responsibility, and people management.
        </p>
        <p>
          On a typical commercial or industrial construction project, the electrical site manager
          reports to the electrical project manager (or contracts manager) and is responsible for
          the day-to-day delivery of the electrical package. This includes managing the directly
          employed workforce and subcontractors, coordinating with other trades (mechanical,
          structural, architectural), maintaining the programme, managing quality, and ensuring full
          compliance with health and safety legislation including{' '}
          <SEOInternalLink href="/guides/permit-to-work-electrician">CDM 2015</SEOInternalLink> and
          the Electricity at Work Regulations 1989.
        </p>
        <p>
          The role varies in scope depending on the size of the project. On a small commercial
          fit-out, the site manager might manage 5-10 electricians and handle everything from
          ordering materials to testing circuits. On a large data centre, hospital, or
          infrastructure project, the site manager might oversee 50-100+ electricians across
          multiple areas, supported by foremen, supervisors, and a dedicated quality and testing
          team.
        </p>
      </>
    ),
  },
  {
    id: 'key-responsibilities',
    heading: 'Key Responsibilities',
    content: (
      <>
        <p>
          The electrical site manager's responsibilities span technical, managerial, and
          administrative domains. The best site managers are those who can move seamlessly between
          reviewing a cable calculation, motivating a team, resolving a coordination clash, and
          completing a safety audit — all in the same morning.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Programme and Progress Management</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Managing the electrical installation programme, ensuring work progresses in line with
              the main construction programme. This involves weekly progress reviews, lookahead
              planning, identifying and resolving delays, and coordinating access with other trades.
              The site manager must understand critical path activities and prioritise resources
              accordingly. Progress is typically reported through weekly reports and programme
              updates to the project manager and principal contractor.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Workforce Management</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Managing the team — allocating work, setting targets, monitoring performance,
              conducting toolbox talks, and dealing with disciplinary issues. The site manager must
              balance the needs of the project with the welfare of the team. On larger projects,
              this includes managing foremen and supervisors who in turn manage the electricians.
              Labour forecasting — predicting how many electricians will be needed in future weeks —
              is a critical skill that directly affects programme delivery and project cost.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Quality and Testing</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Ensuring all work meets the specification, BS 7671 requirements, and the client's
              quality standards. The site manager oversees the{' '}
              <SEOInternalLink href="/guides/how-to-fill-in-eicr">
                inspection and testing process
              </SEOInternalLink>
              , reviews test results, and manages the snagging and rectification process. On
              projects with a dedicated testing team, the site manager coordinates their access and
              reviews their output. Quality documentation — including inspection and test plans
              (ITPs), test certificates, and as-built records — must be maintained throughout the
              project.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Health and Safety</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The site manager is directly responsible for the safety of every electrician on site.
              This includes ensuring{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation procedures
              </SEOInternalLink>{' '}
              are followed, permits to work are obtained when required, risk assessments and method
              statements are in place for every activity, PPE is worn correctly, and the work
              environment is clean and safe. Safety tours, audits, and near-miss reporting are part
              of the daily routine.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="AI generates your site documentation"
          description="Elec-Mate's RAMS Generator creates site-specific risk assessments and method statements in under 60 seconds. Describe the job, and the AI produces CDM-compliant documentation ready for the principal contractor."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'qualifications-needed',
    heading: 'Qualifications Needed',
    content: (
      <>
        <p>
          Becoming an electrical site manager requires a combination of trade qualifications,
          management certifications, and significant on-site experience. No single qualification
          makes you a site manager — it is the combination of technical knowledge, management
          skills, and practical experience that equips you for the role.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Essential Qualifications</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Level 3 NVQ in Electrical Installation</strong>{' '}
                — The foundation qualification that demonstrates you are a qualified electrician.
                You cannot credibly manage electricians without being one yourself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">BS 7671 18th Edition</strong> — Current edition
                certification is essential. As site manager, you need to understand the regulations
                that govern the work your team carries out. See our{' '}
                <SEOInternalLink href="/guides/bs7671-18th-edition-guide">
                  BS 7671 guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">SMSTS</strong> — Site Management Safety Training
                Scheme. The 5-day course covering CDM 2015, risk management, and construction
                safety. Required for CSCS black card and access to major sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">CSCS Black Card</strong> — The Construction
                Skills Certification Scheme manager-level card. Required for site access on
                virtually all major construction projects. Requires SMSTS and a relevant NVQ.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">First Aid at Work</strong> — 3-day HSE-approved
                course. Most employers require site managers to hold a current first aid
                certificate. Valid for 3 years.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Desirable Qualifications</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">2391 Inspection and Testing</strong> —
                Understanding the testing and certification process is important even if you are not
                personally carrying out the testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">NVQ Level 6 Construction Management</strong> —
                Demonstrates management competence at a senior level. Increasingly expected for
                larger projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">NEBOSH Construction Certificate</strong> — A
                recognised health and safety qualification that demonstrates competence in
                construction safety management beyond the SMSTS level.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'managing-subcontractors',
    heading: 'Managing Subcontractors',
    content: (
      <>
        <p>
          On most commercial and industrial projects, the electrical contractor uses a mix of
          directly employed electricians and subcontracted labour or specialist subcontractors. The
          site manager is responsible for managing both, and the challenge of managing
          subcontractors is one of the most demanding aspects of the role.
        </p>
        <p>
          Subcontractor management starts before they arrive on site. The scope of work must be
          clearly defined in writing, with detailed drawings, specifications, and programmes. The
          subcontractor's competence must be verified — qualifications, insurance, health and safety
          documentation, and references. The terms of engagement (price, programme, quality
          requirements, safety standards) must be agreed and documented.
        </p>
        <p>
          Once on site, the site manager must ensure subcontractors attend site induction, receive
          area-specific briefings, work to the agreed method statements and risk assessments, and
          comply with the principal contractor's site rules. Regular quality inspections and
          progress reviews keep standards high and the programme on track.
        </p>
        <p>
          The most common challenge with subcontractors is maintaining quality consistency. When
          different teams are installing containment, wiring, and connecting across a large
          building, variations in workmanship can cause significant snagging issues. Clear
          standards, regular inspections, and a zero-tolerance approach to substandard work are
          essential. The cost of rework far exceeds the cost of getting it right first time.
        </p>
        <SEOAppBridge
          title="Digital compliance management for your team"
          description="Elec-Mate's certificate management system stores and tracks qualifications for your entire team. Verify subcontractor competence, track ECS card expiry dates, and maintain CDM compliance records digitally."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'cdm-duties',
    heading: 'CDM 2015 Duties for Electrical Site Managers',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 place specific legal duties on
          contractors, and the electrical site manager implements these duties on the ground. CDM
          compliance is not optional — failure to comply is a criminal offence that can result in
          prosecution, fines, and imprisonment.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Contractor Duties under CDM 2015</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Regulation 15(1)</strong> — Plan, manage, and
                monitor construction work under your control so that it is carried out without risks
                to health or safety, so far as is reasonably practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Regulation 15(2)</strong> — Ensure that anyone
                working under your control has the necessary skills, knowledge, training, and
                experience, or is under the supervision of a person with those attributes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Regulation 15(5)</strong> — Provide appropriate
                supervision, instructions, and information to every worker under your control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Regulation 15(7)</strong> — Not begin work
                unless reasonable steps have been taken to prevent access by unauthorised persons to
                the construction site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Regulation 15(8)</strong> — Provide suitable
                welfare facilities, or ensure the principal contractor provides them, for the
                duration of the project.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practical terms, this means the electrical site manager must verify every electrician's
          competence before they start work (CSCS card, ECS card, relevant qualifications), ensure
          RAMS are in place for every activity, maintain toolbox talk records, conduct regular
          safety inspections, report and investigate incidents, and cooperate with the principal
          contractor's safety management system.
        </p>
      </>
    ),
  },
  {
    id: 'health-and-safety',
    heading: 'Health and Safety Management on Site',
    content: (
      <>
        <p>
          Health and safety is not a separate task for the electrical site manager — it is
          integrated into everything they do. Every decision about programming, resourcing,
          materials, and methods must consider the safety implications. The best site managers
          create a culture where safety is second nature rather than an imposed burden.
        </p>
        <p>
          Daily safety management includes conducting morning briefings, reviewing the day's work
          activities against risk assessments and method statements, checking that{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedures
          </SEOInternalLink>{' '}
          are being followed, verifying that permits to work are in place for high-risk activities,
          monitoring PPE compliance, and maintaining housekeeping standards. Weekly tasks include
          safety audits, toolbox talks, near-miss reviews, and welfare facility inspections.
        </p>
        <p>
          The site manager must also manage the health aspects of the role, including monitoring
          exposure to noise, dust, manual handling, and the mental health and wellbeing of the team.
          Long hours, time away from home, and the pressure of programme deadlines can affect mental
          health, and a good site manager recognises the signs and provides appropriate support.
        </p>
        <p>
          Record-keeping is critical. Toolbox talk attendance, safety audit findings, incident
          reports, near-miss records, and training records must all be maintained and available for
          inspection by the principal contractor, the client, and the HSE. These records demonstrate
          compliance and provide evidence of a positive safety culture.
        </p>
      </>
    ),
  },
  {
    id: 'career-path',
    heading: 'Career Path to Electrical Site Manager',
    content: (
      <>
        <p>
          The path to becoming an electrical site manager typically follows a progression from
          apprentice through to qualified electrician, then foreman or supervisor, and finally site
          manager. This progression usually takes 8-15 years, depending on the opportunities
          available and the individual's drive and ability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Typical Career Progression</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <span className="text-white font-medium">Apprentice Electrician</span>
              <span className="text-yellow-400 font-bold">Years 1-4</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Qualified Electrician</span>
              <span className="text-yellow-400 font-bold">Years 4-8</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Approved Electrician / Chargehand</span>
              <span className="text-yellow-400 font-bold">Years 6-10</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Foreman / Supervisor</span>
              <span className="text-yellow-400 font-bold">Years 8-12</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <span className="text-white font-medium">Electrical Site Manager</span>
              <span className="text-yellow-400 font-bold">Years 10-15+</span>
            </div>
          </div>
        </div>
        <p>
          The transition from foreman to site manager is the most significant step. As a foreman,
          your focus is on the day-to-day work of a specific area or team. As a site manager, your
          focus shifts to the whole project — programme, commercial awareness, client relationships,
          multi-trade coordination, and strategic problem-solving. This requires a different mindset
          and a broader skill set.
        </p>
        <p>
          Continuous professional development is essential at every stage. Completing your{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD requirements</SEOInternalLink>{' '}
          and pursuing additional qualifications shows employers you are serious about progression.
          Elec-Mate's study centre and CPD tracker support your development throughout this journey.
        </p>
      </>
    ),
  },
  {
    id: 'skills-for-success',
    heading: 'Skills for Success as a Site Manager',
    content: (
      <>
        <p>
          Technical knowledge alone does not make a good site manager. The role demands a broad
          range of soft skills and management capabilities that distinguish effective site managers
          from those who struggle. These skills can be developed through experience, training, and
          conscious effort.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Communication</h3>
            <p className="text-white text-sm leading-relaxed">
              The ability to communicate clearly with your team, other trades, the principal
              contractor, and the client. This includes verbal briefings, written reports, email
              correspondence, and the ability to chair meetings and present information confidently.
              Poor communication is the root cause of most site problems.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Problem-Solving</h3>
            <p className="text-white text-sm leading-relaxed">
              Construction sites generate problems daily — coordination clashes, material delays,
              design errors, programme slippage, and personnel issues. The site manager must
              identify problems early, develop practical solutions, and implement them quickly. The
              ability to stay calm under pressure and make good decisions with incomplete
              information is essential.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Leadership</h3>
            <p className="text-white text-sm leading-relaxed">
              Leading a team of electricians requires respect, which is earned through competence,
              fairness, and consistency. The best site managers lead by example — they would never
              ask their team to do something they would not do themselves. They set clear
              expectations, provide support, and hold people accountable. Good leadership creates a
              motivated, productive team.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Awareness</h3>
            <p className="text-white text-sm leading-relaxed">
              Understanding how the project makes or loses money is increasingly important for site
              managers. This includes understanding the contract, identifying variations, managing
              waste, controlling labour costs, and working within budget constraints. Site managers
              who combine technical ability with commercial awareness are the most valuable to their
              employers and progress furthest in their careers.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'Complete map of qualifications from Level 2 to management level.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description: 'Salary data including management-level pay rates.',
    icon: DollarSign,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrician',
    title: 'Permit to Work for Electricians',
    description: 'Complete guide to PTW systems — essential knowledge for site managers.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'GS 38 prove-test-prove procedure that site managers must enforce.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description: 'Continuing professional development for career progression.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description: 'Generate risk assessments and method statements with AI.',
    icon: Brain,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSiteManagerGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          Electrical Site Manager:{' '}
          <span className="text-yellow-400">Role, Responsibilities & Career Path</span>
        </>
      }
      heroSubtitle="The complete guide to becoming and succeeding as an electrical site manager. Qualifications, CDM duties, subcontractor management, health and safety, career progression, and the skills that separate good site managers from great ones."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Professional tools for electrical site managers"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered RAMS generation, digital certificate management, and professional documentation. Manage your site more efficiently. 7-day free trial, cancel anytime."
    />
  );
}
