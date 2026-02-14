import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Users,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  ShieldCheck,
  MessageSquare,
  Target,
  UserCheck,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Leadership on Site Course | Electrical Supervisors & Foremen';
const PAGE_DESCRIPTION =
  'Leadership and site supervision training for UK electricians. Team management, communication, quality control, mentoring apprentices, CDM duties, and project coordination. 8 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Leadership on Site', href: '/training/leadership-on-site' },
];

const tocItems = [
  { id: 'why-leadership', label: 'Why Leadership Skills Matter' },
  { id: 'site-supervision', label: 'Site Supervision Fundamentals' },
  { id: 'team-management', label: 'Managing Your Team' },
  { id: 'communication', label: 'Communication on Site' },
  { id: 'quality-control', label: 'Quality Control and Standards' },
  { id: 'mentoring-apprentices', label: 'Mentoring Apprentices' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The step from electrician to supervisor is the biggest career transition most electricians will make — it requires a completely different skill set focused on people, communication, and coordination rather than technical execution.',
  'Effective site supervision means planning the work, briefing the team, monitoring progress, maintaining quality, managing safety, and dealing with problems before they escalate — all while keeping the project on programme and budget.',
  'Communication is the single most important leadership skill on site. Clear daily briefings, written instructions, progress reports, and the ability to have difficult conversations about performance or safety are essential for every supervisor.',
  'Mentoring apprentices is both a legal requirement under the apprenticeship framework and a professional responsibility — a good supervisor creates the next generation of competent electricians through structured guidance and honest feedback.',
  'Elec-Mate includes employer and staff management tools that help supervisors track team performance, manage apprentice portfolios, schedule work, and maintain quality records from their phone.',
];

const faqs = [
  {
    question: 'What qualifications do I need to become an electrical supervisor?',
    answer:
      'There is no single mandatory qualification for electrical site supervision in the UK, but the typical requirements include: a Level 3 electrical qualification (NVQ Level 3, C&G 2357, or C&G 2365), the 18th Edition qualification (C&G 2382), the C&G 2391 inspection and testing qualification, and significant practical experience (typically 5 to 10 years). Many employers and principal contractors also require the SSSTS (Site Supervisors Safety Training Scheme) certificate, which is a 2-day course covering site safety responsibilities. For larger projects, the SMSTS (Site Management Safety Training Scheme) 5-day course may be required. Some employers prefer or require a management or leadership qualification such as an ILM Level 3 in Leadership and Management. Beyond formal qualifications, the key attributes are practical competence, communication skills, organisational ability, and the temperament to manage people effectively.',
  },
  {
    question: 'What is the difference between a foreman and a supervisor?',
    answer:
      'In the UK electrical contracting industry, the terms foreman and supervisor are often used interchangeably, though there can be subtle differences depending on the company. Generally, a foreman is the person on site who directly manages a team of electricians — assigning tasks, checking work quality, and coordinating with other trades. A supervisor typically has broader responsibilities that may include multiple teams, multiple areas of a site, or additional duties such as programme management, material procurement, and client liaison. On large projects, the hierarchy might be: project manager, contracts manager, site manager, supervisor, foreman, chargehand, electrician, apprentice. On smaller projects, one person might fulfil the foreman, supervisor, and site manager roles simultaneously. The Elec-Mate leadership course covers the full range of supervisory duties regardless of the specific job title.',
  },
  {
    question: 'How do I handle an underperforming team member?',
    answer:
      'Dealing with underperformance is one of the most challenging aspects of site supervision. The recommended approach is: (1) Identify the issue clearly — is it a skills gap, a motivation problem, a personal issue, or a misunderstanding of expectations? (2) Have a private, one-to-one conversation. Do not criticise in front of the team. Be specific about what needs to improve and by when. (3) Listen to their perspective — there may be factors you are not aware of. (4) Agree a plan — set clear, measurable targets with a realistic timeframe. Offer support or additional training if the issue is skills-related. (5) Follow up — check progress against the plan and provide feedback, both positive and corrective. (6) Document everything — notes of conversations, agreed targets, and outcomes. If the underperformance continues despite support, you will need documentation for any formal HR process. The key principle is to be fair, consistent, and professional. Address issues early before they affect the whole team.',
  },
  {
    question: 'What are my CDM duties as a site supervisor?',
    answer:
      'Under the Construction (Design and Management) Regulations 2015, a supervisor on a construction site has several important duties. You assist the principal contractor in planning, managing, and monitoring the construction phase to ensure work is carried out safely. Specific duties include: ensuring workers under your supervision have the right skills, knowledge, training, and experience for the tasks assigned; providing adequate supervision proportionate to the risk; ensuring risk assessments and method statements are communicated and followed; maintaining a safe working environment in your area of responsibility; cooperating with other contractors and supervisors on site; reporting hazards, near misses, and accidents; and ensuring welfare facilities are available. You are not personally liable for the principal contractor duties, but you are expected to carry out your supervisory role competently and to escalate any concerns you cannot resolve directly.',
  },
  {
    question: 'How can I improve my leadership skills while working full-time?',
    answer:
      'Most electrical supervisors develop their leadership skills through a combination of on-the-job experience and structured training. Practical steps include: (1) Seek feedback from your team and your manager — ask what you do well and what you could improve. (2) Observe effective leaders on site — what do they do differently? (3) Complete the SSSTS or SMSTS course to formalise your site safety management knowledge. (4) Study leadership modules on Elec-Mate during breaks or evenings — the app is designed for busy electricians who cannot attend classroom courses. (5) Read industry publications and attend trade events to broaden your knowledge. (6) Volunteer to mentor an apprentice — teaching others is one of the fastest ways to develop your own skills. (7) Practice communication — write clearer emails, give more structured briefings, and have those difficult conversations you have been avoiding. Leadership is a skill that improves with deliberate practice, not just time served.',
  },
  {
    question: 'What salary can I expect as an electrical supervisor?',
    answer:
      'Electrical supervisor salaries in the UK typically range from £38,000 to £55,000 per annum for employed positions, depending on the size of the company, the complexity of the projects, and the region. London and the South East command the highest salaries, with senior supervisors on major projects earning £50,000 to £65,000. Contract supervisors working through agencies can earn £200 to £350 per day. Some large contractors offer additional benefits including company vehicle, fuel card, pension, private healthcare, and performance bonuses. The step up from electrician to supervisor typically brings a 20% to 40% increase in total remuneration, though the exact figure depends on your current earnings and the employer. Beyond the financial reward, the supervisor role offers career progression into contracts management, project management, and operations management — roles that command £60,000 to £90,000 or more.',
  },
];

const modules = [
  {
    title: 'The Transition From Electrician to Supervisor',
    description:
      'What changes when you step into a leadership role. Shifting from technical execution to people management. Common pitfalls for new supervisors. Setting expectations with your team from day one.',
  },
  {
    title: 'Site Supervision Fundamentals',
    description:
      'Daily planning and task allocation. Site diaries and progress recording. Material management and logistics. Coordinating with other trades. Programme awareness and critical path management.',
  },
  {
    title: 'Team Management and Motivation',
    description:
      'Building an effective team. Understanding different working styles. Delegation and accountability. Managing underperformance. Recognising and rewarding good work. Handling conflict between team members.',
  },
  {
    title: 'Communication Skills for Site Leaders',
    description:
      'Running effective toolbox talks and daily briefings. Written communication — site diaries, emails, reports. Having difficult conversations. Communicating upwards to management and clients. Active listening techniques.',
  },
  {
    title: 'Quality Control and Standards Compliance',
    description:
      'Ensuring work meets BS 7671 and specification requirements. Quality inspection procedures. Snagging and defect management. Documentation and record keeping. Handover procedures and client sign-off.',
  },
  {
    title: 'Mentoring Apprentices and Developing Staff',
    description:
      'Your responsibilities as a mentor under the apprenticeship framework. Structured on-the-job training. Giving constructive feedback. Portfolio evidence and workplace assessment. Supporting apprentices through difficult periods.',
  },
  {
    title: 'Safety Leadership on Site',
    description:
      'CDM 2015 supervisor duties. Risk assessment and method statement implementation. Toolbox talks. Accident and near-miss reporting. Creating a positive safety culture. Leading by example.',
  },
  {
    title: 'Career Development: From Supervisor to Manager',
    description:
      'Career pathways beyond supervision — contracts management, project management, operations. Building your professional network. Continuous professional development. Starting your own electrical contracting business.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any leadership or management question in plain English. Get practical advice on team management, communication, conflict resolution, and career development.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Real-world scenario videos covering daily briefings, difficult conversations, apprentice mentoring, and quality inspection techniques — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your understanding with scenario-based questions. Handle performance issues, plan daily work allocation, respond to site incidents, and make supervisory decisions.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Complete leadership training around your full-time site work.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering CDM duties, communication frameworks, quality procedures, and apprenticeship requirements.',
  },
  {
    icon: FileCheck2,
    title: 'Staff Management Tools',
    description:
      'Elec-Mate includes employer tools for tracking team performance, managing apprentice portfolios, scheduling work, and maintaining quality records — all from your phone.',
  },
];

const sections = [
  {
    id: 'why-leadership',
    heading: 'Why Leadership Skills Matter for Electricians',
    content: (
      <>
        <p>
          The step from electrician to supervisor is the single biggest career transition most
          electricians will make. As an electrician, your success depends on your technical skill —
          your ability to wire, test, and fault-find. As a supervisor, your success depends on your
          ability to manage people, communicate clearly, plan work, and maintain standards.
        </p>
        <p>
          Many excellent electricians struggle as supervisors because no one teaches them how to
          lead. They are promoted based on their technical ability and then expected to manage a
          team, liaise with clients, coordinate with other trades, and deliver projects on programme
          and budget — all without formal training in any of these skills.
        </p>
        <p>
          The electrical contracting industry loses good people at this transition point.
          Electricians who fail as supervisors often leave the industry entirely, when what they
          actually needed was structured leadership training. This course fills that gap.
        </p>
        <p>
          For those who get it right, the rewards are significant. Supervisors earn more, have
          greater influence over project outcomes, and open the door to careers in{' '}
          <SEOInternalLink href="/training/project-management-electricians">
            project management
          </SEOInternalLink>
          , contracts management, and business ownership. The skills you learn as a supervisor —
          communication, planning, problem-solving, and people management — are transferable to
          every future role.
        </p>
      </>
    ),
  },
  {
    id: 'site-supervision',
    heading: 'Site Supervision: Planning, Monitoring, and Delivering',
    content: (
      <>
        <p>
          Effective site supervision is built on three pillars: planning the work, monitoring
          progress, and delivering quality results. These sound simple, but executing them
          consistently under the pressure of a live construction site is the real challenge.
        </p>
        <p>
          <strong>Planning</strong> means understanding the programme, breaking the work down into
          manageable tasks, allocating those tasks to the right people, and ensuring materials,
          tools, and access are in place before the work starts. A supervisor who plans effectively
          prevents downtime, reduces waste, and keeps the team productive.
        </p>
        <p>
          <strong>Monitoring</strong> means walking the site, checking progress against the plan,
          inspecting work quality, identifying issues early, and adjusting the plan when things
          change. A good supervisor does not sit in the cabin — they are visible, accessible, and
          constantly aware of what is happening across their area of responsibility.
        </p>
        <p>
          <strong>Delivering</strong> means handing over completed work that meets the
          specification, passes inspection, and satisfies the client. This requires attention to
          detail, robust snagging procedures, and a team culture where quality is everyone's
          responsibility — not just the supervisor's.
        </p>
        <SEOAppBridge
          title="Track team progress and manage tasks from your phone"
          description="Elec-Mate's employer platform lets you assign tasks, track completion, manage snagging lists, and maintain quality records — all from your phone on site. No more spreadsheets and paper lists."
          icon={Target}
        />
      </>
    ),
  },
  {
    id: 'team-management',
    heading: 'Managing Your Team: People, Not Just Circuits',
    content: (
      <>
        <p>
          The hardest part of supervision is not the technical work — it is managing people. Every
          team member has different skills, motivations, working styles, and personal circumstances.
          A good supervisor recognises these differences and adapts their approach accordingly.
        </p>
        <p>
          <strong>Delegation</strong> is a skill that many new supervisors find difficult. The
          temptation is to do everything yourself — after all, you know you can do it right. But a
          supervisor who does not delegate is a bottleneck. Delegation means assigning tasks clearly
          (what needs to be done, to what standard, by when), providing the resources and authority
          to do the task, and then trusting the person to deliver — while checking progress at
          appropriate intervals.
        </p>
        <p>
          <strong>Accountability</strong> goes hand in hand with delegation. When you delegate a
          task, the person doing the work is accountable for its execution, but you remain
          responsible for the outcome. This means you need to check work quality, provide feedback,
          and intervene when something is going wrong — not just assign tasks and walk away.
        </p>
        <p>
          <strong>Conflict management</strong> is inevitable when people work together under
          pressure. Disagreements between team members, friction with other trades, and frustration
          with programme changes are all normal. Your role is to address conflicts early, listen to
          all sides, find practical solutions, and maintain working relationships. Ignoring conflict
          does not make it go away — it makes it worse.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/employer-platform">Elec-Mate employer platform</SEOInternalLink>{' '}
          provides tools for tracking team performance, recording one-to-one conversations, and
          maintaining a structured approach to staff development — all designed for busy site
          supervisors.
        </p>
      </>
    ),
  },
  {
    id: 'communication',
    heading: 'Communication: The Most Important Leadership Skill',
    content: (
      <>
        <p>
          Ask any experienced site manager what makes a good supervisor, and the answer will almost
          always start with communication. The ability to communicate clearly — upwards to
          management, downwards to your team, and sideways to other trades and the client — is the
          foundation of effective leadership.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <MessageSquare className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Daily Briefings</h3>
              <p className="text-white text-sm leading-relaxed">
                Start every day with a 5-minute team briefing. Cover: what was achieved yesterday,
                what is planned for today, any safety issues or changes, and any coordination points
                with other trades. Keep it short, specific, and standing up.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <MessageSquare className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Written Records</h3>
              <p className="text-white text-sm leading-relaxed">
                Keep a daily site diary recording work completed, labour on site, materials
                received, visitors, weather conditions, and any issues or instructions. This is your
                defence if a dispute arises later. Write it at the end of each day while the details
                are fresh.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <MessageSquare className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Difficult Conversations</h3>
              <p className="text-white text-sm leading-relaxed">
                Whether it is addressing poor performance, raising a safety concern with the
                principal contractor, or telling a client that the programme has slipped — these
                conversations are part of the job. Prepare what you want to say, be direct and
                factual, listen to the response, and agree next steps.
              </p>
            </div>
          </div>
        </div>
        <p>
          Effective communication also means listening. Your team members are your eyes and ears on
          the job. If someone raises a concern — about safety, quality, or programme — take it
          seriously. A supervisor who listens builds trust; a supervisor who dismisses concerns
          builds resentment.
        </p>
      </>
    ),
  },
  {
    id: 'quality-control',
    heading: 'Quality Control: Getting It Right First Time',
    content: (
      <>
        <p>
          Quality control is not an afterthought — it is built into every stage of the work. A
          supervisor who only checks quality at the snagging stage will find problems that are
          expensive and time-consuming to fix. A supervisor who checks quality as the work
          progresses catches issues when they are small and cheap to correct.
        </p>
        <p>
          For electrical work, quality control means ensuring compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>, the
          project specification, the design drawings, and the employer's quality management system.
          Specific checks include: correct cable types and sizes, proper containment installation,
          adequate fixings, correct terminations, appropriate labelling, and compliance with{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            testing procedures
          </SEOInternalLink>
          .
        </p>
        <p>
          Build quality checkpoints into your daily routine. Walk the areas where your team has been
          working and inspect the work against the specification. Use a consistent checklist so
          nothing gets missed. Record your inspections — photographs are particularly useful for
          cable concealment and containment runs that will be hidden behind walls or ceilings.
        </p>
        <p>
          When you find a defect, address it immediately. Explain to the team member what is wrong,
          why it matters, and what the correct standard is. Use it as a teaching moment, not a
          punishment. A team that understands the quality standard will self-check their own work —
          which is the ultimate goal.
        </p>
        <SEOAppBridge
          title="Digital quality inspection with photo evidence"
          description="Use Elec-Mate to create quality inspection records with photos, notes, and sign-off — all from your phone. Build a professional quality trail that demonstrates your standards to clients and auditors."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'mentoring-apprentices',
    heading: 'Mentoring Apprentices: Building the Next Generation',
    content: (
      <>
        <p>
          As a supervisor, mentoring apprentices is both a professional responsibility and a legal
          requirement under the apprenticeship framework. The apprentices in your team are learning
          their trade from you — what you teach them, how you treat them, and the standards you set
          will shape the electricians they become.
        </p>
        <p>
          Effective mentoring is structured, not random. An apprentice needs: clear learning
          objectives linked to their qualification requirements, planned exposure to different types
          of work, regular feedback on their progress, support with their portfolio evidence, and a
          safe environment where they can ask questions without being ridiculed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan their development.</strong> At the start of each week, identify which
                tasks will give the apprentice exposure to new skills and which will consolidate
                existing ones. Vary the work so they build a broad skill set.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demonstrate, then observe.</strong> Show the apprentice how to do a task
                correctly. Watch them do it. Provide feedback. Let them practise until they are
                competent before moving on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Give honest feedback.</strong> Praise good work specifically — not just
                "well done" but "that cable dressing is neat and the terminations are clean."
                Correct mistakes promptly and constructively — explain what went wrong and how to do
                it right.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support their portfolio.</strong> Help the apprentice identify portfolio
                evidence from their daily work. Photographs of completed work, descriptions of
                tasks, and supervisor witness statements all contribute to their{' '}
                <SEOInternalLink href="/training/apprentice-portfolio-guide">
                  portfolio
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrical industry faces a skills shortage. Every apprentice you mentor well is a
          future colleague, subcontractor, or business partner. The time you invest in their
          development pays dividends for the entire industry.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/employer-platform',
    title: 'Employer Platform',
    description:
      'Staff management tools — task tracking, apprentice portfolios, performance records, and team scheduling.',
    icon: Briefcase,
    category: 'Tool' as const,
  },
  {
    href: '/training/staff-management',
    title: 'Staff Management Course',
    description:
      'HR fundamentals for electrical contractors — recruitment, employment law, performance management.',
    icon: Users,
    category: 'Training' as const,
  },
  {
    href: '/training/project-management-electricians',
    title: 'Project Management Course',
    description:
      'Programme planning, cost control, and contract management for electrical projects.',
    icon: Target,
    category: 'Training' as const,
  },
  {
    href: '/training/cdm-regulations-course',
    title: 'CDM Regulations Course',
    description:
      'CDM 2015 duties for supervisors, principal contractors, and duty holders on construction sites.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'How to build a strong NVQ portfolio — evidence types, witness statements, and assessment preparation.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Qualifications Pathway',
    description:
      'Career progression from apprentice to master electrician — every qualification mapped out.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Leadership on Site Course — Electrical Supervisors',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Advanced',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT10H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LeadershipOnSiteCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Leadership Training"
      badgeIcon={Users}
      heroTitle={
        <>
          Leadership on Site:{' '}
          <span className="text-yellow-400">Training for Electrical Supervisors</span>
        </>
      }
      heroSubtitle="Master site supervision, team management, communication, quality control, and apprentice mentoring. 8 modules with video content, interactive quizzes, and AI-powered study tools designed for busy electricians stepping into leadership roles."
      readingTime={15}
      courseDuration="10 hours"
      courseLevel="Advanced"
      coursePrerequisites="Qualified electrician (Level 3 or equivalent) with practical site experience — ideal for those moving into or already in supervisory roles"
      courseModules={8}
      courseCertification="CPD certificate on completion — evidence of leadership development for career progression"
      courseWhoIsItFor="Electricians promoted to supervisor or foreman, chargehands stepping up to site leadership, experienced electricians preparing for management roles, and electrical contractors managing growing teams"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to lead with confidence?"
      ctaSubheading="Join 430+ UK electricians building their careers with Elec-Mate. Leadership modules, team management tools, and an AI tutor for any supervisory question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/leadership-on-site"
    />
  );
}
