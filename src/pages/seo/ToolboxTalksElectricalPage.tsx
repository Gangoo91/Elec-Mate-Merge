import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Megaphone,
  AlertTriangle,
  Shield,
  ShieldCheck,
  FileText,
  GraduationCap,
  ClipboardCheck,
  HardHat,
  Heart,
  Clock,
  Users,
  BookOpen,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-on-site' },
  { label: 'Toolbox Talks', href: '/guides/toolbox-talks-electrical' },
];

const tocItems = [
  { id: 'what-is-toolbox-talk', label: 'What Is a Toolbox Talk?' },
  { id: 'common-topics', label: 'Common Topics for Electricians' },
  { id: 'five-minute-format', label: 'The 5-Minute Format' },
  { id: 'record-keeping', label: 'Record Keeping' },
  { id: 'sample-talks', label: 'Sample Toolbox Talks' },
  { id: 'legal-context', label: 'Legal Context and CDM 2015' },
  { id: 'making-talks-effective', label: 'Making Talks Effective' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A toolbox talk is a short, focused safety briefing lasting 5 to 15 minutes, delivered on site before or during work to address specific hazards relevant to the day's tasks.",
  'CDM 2015 requires contractors to provide workers with information, instruction, and training — toolbox talks are one of the most practical ways to meet this obligation.',
  'Common toolbox talk topics for electricians include safe isolation, working at height, cable avoidance, electrical burns, manual handling, and PPE requirements.',
  'Every toolbox talk must be recorded with the date, topic, presenter, and a signed attendance register — these records demonstrate compliance during HSE inspections.',
  'Elec-Mate generates toolbox talk records and risk assessments using AI, helping you stay compliant without spending hours on paperwork.',
];

const faqs = [
  {
    question: 'How often should toolbox talks be given on site?',
    answer:
      'There is no fixed legal requirement for the frequency of toolbox talks, but best practice for construction sites is at least once a week and additionally whenever there is a change in work activity, a new hazard is introduced, an incident or near miss has occurred, or new workers join the site. Many principal contractors require daily toolbox talks — particularly on larger sites or during high-risk phases of work. The key is that toolbox talks should be relevant and timely. A toolbox talk on working at height given on the morning you are installing cable tray at 4 metres is far more effective than one given three weeks earlier. The HSE expects to see evidence that workers have been informed about the specific hazards they face, and toolbox talks are one of the primary ways to demonstrate this.',
  },
  {
    question: 'Who should deliver a toolbox talk?',
    answer:
      'Toolbox talks can be delivered by anyone with sufficient competence in the topic being discussed — this is typically the site supervisor, the foreman, or an experienced tradesperson. On many sites, the electrical supervisor or lead electrician delivers toolbox talks for the electrical team. The person delivering the talk does not need a formal training qualification, but they must understand the topic well enough to answer questions and relate it to the specific work being carried out. External speakers (such as safety officers, product suppliers, or visiting HSE inspectors) can also deliver toolbox talks on specialist topics. The most effective talks are delivered by someone the team respects and trusts — ideally someone who has hands-on experience of the work being discussed.',
  },
  {
    question: 'What should a toolbox talk record include?',
    answer:
      'A toolbox talk record should include: the date and time of the talk; the location (site name and area); the topic or title; the name of the person delivering the talk; a brief summary of the key points covered; any questions raised and the answers given; the names and signatures of all attendees; and any follow-up actions identified. The record serves two purposes: it demonstrates to the HSE, the client, and the principal contractor that you are providing information and instruction to your workers; and it provides a reference document that can be reviewed if an incident occurs. Keep all toolbox talk records as part of the site safety file. On most sites, these records are kept for at least 6 years (the statute of limitations for civil claims). Elec-Mate can generate and store toolbox talk records digitally.',
  },
  {
    question: 'Are toolbox talks a legal requirement?',
    answer:
      'Toolbox talks themselves are not specifically mandated by a single regulation, but the obligation they fulfil is. Under the Health and Safety at Work Act 1974, employers must provide information, instruction, training, and supervision to ensure the health and safety of their employees. Under CDM 2015 (Regulation 15), contractors must provide workers with suitable site induction, information, and instruction. Under the Management of Health and Safety at Work Regulations 1999 (Regulation 10), employers must provide employees with comprehensible and relevant information on risks to their health and safety. Toolbox talks are one of the most practical, proportionate, and effective ways to meet these obligations on a construction site. If the HSE investigates an incident and finds that workers were not informed about a foreseeable hazard, the absence of toolbox talk records on that topic would be significant evidence of failure to comply.',
  },
  {
    question: 'What is the ideal length for a toolbox talk?',
    answer:
      'The ideal toolbox talk is 5 to 10 minutes long. Anything shorter risks being too superficial to be useful. Anything longer risks losing the audience — construction workers standing in PPE on a cold morning will not absorb a 30-minute lecture. The most effective format is: 1 minute to introduce the topic and explain why it is relevant today; 3 to 5 minutes to cover the key points, using real examples and practical demonstrations where possible; 1 to 2 minutes for questions and discussion; and 1 minute to summarise the key messages and confirm understanding. Some topics (such as a new piece of legislation or a major incident debrief) may justify a longer session, but these should be the exception rather than the rule. Keep it focused, keep it relevant, and keep it practical.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/first-aid-electrical-shock',
    title: 'First Aid for Electrical Shock',
    description:
      'Emergency response procedures for electrical shock — a high-priority toolbox talk topic.',
    icon: Heart,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation — the most important toolbox talk topic for electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description: 'Risk assessments and toolbox talks work together to manage hazards on site.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/near-miss-reporting',
    title: 'Near Miss Reporting',
    description:
      'Near miss incidents are excellent material for toolbox talks — learning from what nearly happened.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-on-site',
    title: 'Electrical Safety on Site',
    description: 'Complete guide to managing electrical risks on construction sites.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description: 'PPE requirements for electrical work — a common toolbox talk topic.',
    icon: Shield,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-toolbox-talk',
    heading: 'What Is a Toolbox Talk?',
    content: (
      <>
        <p>
          A toolbox talk is a short, informal safety meeting held on site — typically lasting 5 to
          15 minutes — that focuses on a specific safety topic relevant to the work being carried
          out that day. The term comes from the idea of gathering around the toolbox before starting
          work, but in practice toolbox talks can be delivered anywhere on site — in the welfare
          cabin, at the work area, or at the distribution board.
        </p>
        <p>
          The purpose of a toolbox talk is to raise awareness of specific hazards, reinforce safe
          working practices, communicate lessons from incidents or{' '}
          <SEOInternalLink href="/guides/near-miss-reporting">near misses</SEOInternalLink>, and
          ensure that everyone on the team understands the risks they face and the precautions they
          must take. Unlike formal classroom training, toolbox talks are practical, conversational,
          and directly linked to the work at hand.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short and focused:</strong> 5 to 15 minutes, one topic, no waffle. Workers
                remember a focused 5-minute talk far better than a rambling 30-minute lecture.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relevant to today's work:</strong> The most effective toolbox talks address
                the specific hazards of the day's tasks. A talk on{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                before working on a live distribution board is far more impactful than a generic
                safety message.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interactive:</strong> Encourage questions and discussion. Ask workers about
                their experiences. A two-way conversation is more effective than a one-way
                monologue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recorded:</strong> Every toolbox talk must be documented with the date,
                topic, presenter, key points, and a signed attendance register.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-topics',
    heading: 'Common Toolbox Talk Topics for Electricians',
    content: (
      <>
        <p>
          The topics for toolbox talks should be driven by the hazards present on site and the work
          being carried out. For electricians, the following topics come up regularly:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">High Priority Topics</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Safe isolation procedure (GS38)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>First aid for electrical shock</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Working at height (ladders, scaffolding, MEWP)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Cable avoidance (CAT and Genny use)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Arc flash hazards and prevention</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Regular Topics</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>PPE requirements and condition checks</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Manual handling (cable drums, DBs)</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Tool and equipment inspections</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Asbestos awareness (pre-1999 buildings)</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Permit to work procedures</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The best toolbox talks respond to what is happening on site. If there was a{' '}
          <SEOInternalLink href="/guides/near-miss-reporting">near miss</SEOInternalLink> involving
          cable damage yesterday, that is tomorrow's toolbox talk topic. If the weather forecast is
          for heavy rain, talk about working in wet conditions and the increased risk of electrical
          shock. If a new apprentice has joined the team, revisit the basics of{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'five-minute-format',
    heading: 'The 5-Minute Toolbox Talk Format',
    content: (
      <>
        <p>
          The most effective toolbox talks follow a simple, consistent format. Here is a structure
          that works for any topic and keeps the talk under 10 minutes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Introduction (1 minute):</strong> State the topic and explain why it is
              relevant today. "This morning we are going to talk about safe isolation, because this
              afternoon we will be working on the sub-distribution board in the plant room."
            </li>
            <li>
              <strong>Key points (3 to 5 minutes):</strong> Cover 3 to 5 key messages. Use plain
              language. Use real examples — "Last week on another site, a sparky got a belt off a
              circuit he thought was dead because he did not prove his voltage indicator." Where
              possible, demonstrate physically — show the lock-off kit, show the GS38 probes, show
              the proving unit.
            </li>
            <li>
              <strong>Questions (1 to 2 minutes):</strong> Ask the team if they have any questions
              or if they have experienced similar situations. This turns the talk into a
              conversation and tests understanding. If someone raises a good point, acknowledge it —
              it encourages participation next time.
            </li>
            <li>
              <strong>Summary (30 seconds):</strong> Repeat the 3 key messages. "Remember: prove
              your tester, lock off, prove dead. If you cannot prove dead, do not touch it."
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Generate toolbox talk content with AI"
          description="Elec-Mate's AI Health and Safety agent can generate toolbox talk content on any topic relevant to electrical work — including key points, discussion questions, and a printable handout. Spend 2 minutes generating the talk and 5 minutes delivering it."
          icon={Megaphone}
        />
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Toolbox Talk Record Keeping',
    content: (
      <>
        <p>
          Recording toolbox talks is not optional. The records demonstrate that you are meeting your
          legal obligations to provide information, instruction, and training to your workers. If
          the HSE investigates an incident on your site, one of the first things they will ask for
          is evidence of toolbox talks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to record:</strong> Date, time, and location; topic or title of the
                talk; name of the person delivering the talk; brief summary of key points covered;
                any questions raised and answers given; names and signatures of all attendees; any
                follow-up actions identified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How long to keep records:</strong> There is no specific legal requirement
                for how long toolbox talk records must be kept, but best practice is to retain them
                for at least 6 years (the limitation period for civil claims). Many contractors keep
                them for the duration of the project plus 6 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Digital vs paper:</strong> Paper attendance sheets work but are easily lost.
                Digital records (photos, signed PDFs, app-based attendance tracking) are
                increasingly preferred because they are easier to search, share, and store.
                Elec-Mate lets you record toolbox talks digitally, capture attendee signatures on
                your phone, and store the records securely in the cloud.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When a principal contractor or client audits your safety records, well-maintained toolbox
          talk records are one of the strongest indicators of a contractor who takes safety
          seriously. They are also valuable evidence in any insurance claim or legal proceeding
          following an incident.
        </p>
      </>
    ),
  },
  {
    id: 'sample-talks',
    heading: 'Sample Toolbox Talks for Electricians',
    content: (
      <>
        <p>
          Here are three example toolbox talk outlines that can be adapted to your specific site
          conditions. Each follows the 5-minute format and covers a topic that is relevant to
          electricians on construction sites.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Talk 1: Safe Isolation — Getting It Right Every Time
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Why: Because failing to isolate properly is the number one cause of electrical
                  injury on site. Key points: (1) Always use a proving unit to check your voltage
                  indicator before and after testing. (2) Lock off with your own personal lock —
                  never rely on someone else's lock-off. (3) Prove dead at the point of work, not
                  just at the distribution board. Question to ask: "Has anyone ever found a circuit
                  that was still live after they thought it was isolated?"
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Talk 2: What to Do If Someone Gets a Shock
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Why: Because knowing the first 60 seconds response can save a life. Key points:
                  (1) Do not touch the casualty until the supply is isolated. (2) Call 999 — even if
                  the person says they are fine. (3) If they are not breathing, start CPR
                  immediately. (4) Know where the nearest AED is. Question to ask: "Does everyone
                  know the location of the site AED and the nearest isolation point?" See the full{' '}
                  <SEOInternalLink href="/guides/first-aid-electrical-shock">
                    first aid for electrical shock guide
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <HardHat className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Talk 3: Manual Handling — Cable Drums and DBs
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Why: Because manual handling injuries account for over a third of all workplace
                  injuries. Key points: (1) A 100m drum of 2.5mm twin and earth weighs about 12kg —
                  a drum of 6mm weighs over 30kg. Plan how you are going to move it before you pick
                  it up. (2) Consumer units and distribution boards are awkward, not just heavy —
                  use proper lifting technique and ask for help. (3) Use a trolley or drum stand
                  where available. Question to ask: "Has anyone had a back injury from lifting on
                  site?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'legal-context',
    heading: 'Legal Context: CDM 2015 and the Duty to Inform',
    content: (
      <>
        <p>
          Toolbox talks are not mentioned by name in any legislation, but the duty they fulfil is
          embedded in several regulations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974 (Section 2):</strong> Employers must
                provide information, instruction, training, and supervision to ensure the health and
                safety of employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CDM 2015 (Regulation 15):</strong> Contractors must provide workers with
                appropriate supervision, instructions, and information to carry out the work safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Management of Health and Safety at Work Regulations 1999 (Regulation 10):
                </strong>{' '}
                Employers must provide employees with comprehensible and relevant information on
                risks to their health and safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989 (Regulation 16):</strong> Persons
                working on electrical systems must be competent or under adequate supervision. A
                toolbox talk on{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                is direct evidence of providing instruction to support competence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In an HSE investigation following an incident, the inspector will look at what information
          and instruction was provided to the workers involved. If there is no record of toolbox
          talks addressing the hazard that caused the incident, the contractor is likely to face
          enforcement action for failure to comply with these duties.
        </p>
      </>
    ),
  },
  {
    id: 'making-talks-effective',
    heading: 'Making Toolbox Talks Effective: Practical Tips',
    content: (
      <>
        <p>
          A poorly delivered toolbox talk is worse than no toolbox talk — it gives a false sense of
          security and breeds cynicism among the team. Here are practical tips for making your talks
          count:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Make it relevant.</strong> Link the topic to the actual work being done
                today. "We are pulling cable through the ceiling void this morning — let us talk
                about asbestos awareness" is far more effective than a generic talk on asbestos
                delivered in the site cabin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use real examples.</strong> Anonymised incident reports, near miss stories
                from your own experience, and news reports of electrical incidents all make the
                topic concrete. "This happened to a sparky in Birmingham last month" is more
                powerful than abstract statistics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demonstrate physically.</strong> If you are talking about{' '}
                <SEOInternalLink href="/guides/ppe-for-electricians">PPE</SEOInternalLink>, hold up
                the PPE. If you are talking about lock-off, show the lock-off kit. If you are
                talking about cable damage, show a damaged cable. Physical props make the talk
                memorable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vary the presenter.</strong> Rotate who delivers the toolbox talk. Getting
                different team members to present builds ownership of safety across the whole team,
                not just the supervisor.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="AI-generated risk assessments and method statements"
          description="Elec-Mate's AI Health and Safety agent generates complete RAMS documents, risk assessments, and method statements for electrical work. Use them as the basis for your toolbox talks — the hazards are already identified, the controls are already specified."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ToolboxTalksElectricalPage() {
  return (
    <GuideTemplate
      title="Toolbox Talks for Electricians | Topics & Templates"
      description="Complete guide to toolbox talks for UK electricians. Common topics, 5-minute format, record keeping, sample talks, and legal requirements under CDM 2015. Free templates and AI-generated content."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Megaphone}
      heroTitle={
        <>
          Toolbox Talks for Electricians:{' '}
          <span className="text-yellow-400">Topics, Templates, and How to Deliver Them</span>
        </>
      }
      heroSubtitle="A good toolbox talk takes 5 minutes to deliver and can prevent a serious injury. This guide covers what a toolbox talk is, the most important topics for electricians, a proven delivery format, record keeping requirements, and sample talks you can use on site tomorrow."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Toolbox Talks"
      relatedPages={relatedPages}
      ctaHeading="Safety Documentation Made Simple"
      ctaSubheading="Generate toolbox talk content, risk assessments, RAMS, and method statements with AI. Access PASMA, IPAF, manual handling, and working at height training courses. 7-day free trial."
    />
  );
}
