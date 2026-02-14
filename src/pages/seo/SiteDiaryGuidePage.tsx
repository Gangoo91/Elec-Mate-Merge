import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  ClipboardCheck,
  CheckCircle,
  Shield,
  FolderOpen,
  Award,
  Target,
  PenLine,
  Camera,
  Wrench,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Site Diary', href: '/guides/site-diary-apprentice' },
];

const tocItems = [
  { id: 'what-is-site-diary', label: 'What Is a Site Diary?' },
  { id: 'why-it-matters', label: 'Why It Matters for Apprentices' },
  { id: 'what-to-record', label: 'What to Record Daily' },
  { id: 'skills-practised', label: 'Recording Skills Practised' },
  { id: 'health-safety', label: 'Health and Safety Observations' },
  { id: 'evidence-for-portfolio', label: 'Evidence for Your Portfolio' },
  { id: 'good-vs-bad-entries', label: 'Good vs Bad Entries' },
  { id: 'elecmate-site-diary', label: 'Site Diary on Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A site diary is a daily record of what you did, what you learned, and what you observed on site. For apprentices, it is one of the most valuable habits you can build — it provides evidence for your portfolio, supports off-the-job training records, and helps you reflect on your progress.',
  'Record the date, site location, tasks performed, skills practised for the first time, tools and equipment used, health and safety observations, and anything new you learned. Be specific — "fitted 3 twin sockets in kitchen, first time chasing into block" is far better than "wiring."',
  'Health and safety observations are particularly valuable. Recording PPE use, risk assessments, safe isolation procedures, and hazards spotted demonstrates the professional behaviours expected by the apprenticeship standard and EPA assessors.',
  'Site diary entries link directly to your apprentice portfolio. Each entry can provide evidence against specific apprenticeship standard criteria, reducing the last-minute scramble to gather evidence before the gateway.',
  'Elec-Mate site diary captures daily entries with structured prompts, photo attachments, and automatic links to OJT hours and portfolio criteria. Build the habit from day one and your portfolio builds itself.',
];

const faqs = [
  {
    question: 'How long should a site diary entry take?',
    answer:
      'A good daily entry should take 5 to 10 minutes at the end of each working day. You are not writing an essay — a few concise sentences covering what you did, what you learned, any health and safety observations, and which skills you practised is sufficient. The key is consistency. A brief daily entry is far more valuable than a long entry written once a week from memory. If you use Elec-Mate site diary, the structured prompts guide you through each section quickly, and you can attach a photograph of the work in a few taps.',
  },
  {
    question: 'Is a site diary required for the apprenticeship?',
    answer:
      'A site diary is not a formal requirement of the apprenticeship standard itself, but it is strongly recommended by most training providers and EPA organisations. The apprenticeship standard requires you to demonstrate professional behaviours, reflective practice, and a range of practical competencies. A well-kept site diary provides the raw evidence for all of these. Many training providers ask apprentices to keep a log of daily activities as part of their ongoing assessment. Even if yours does not, the evidence a site diary generates for your portfolio and off-the-job training records makes it one of the most productive habits you can develop.',
  },
  {
    question: 'What should I write about health and safety in my diary?',
    answer:
      'Record any health and safety activity or observation from the day. This includes: PPE worn and why (hard hat, safety boots, gloves, goggles), risk assessments completed or reviewed, safe isolation procedures carried out, permits to work signed, toolbox talks attended, hazards identified and reported, near-miss incidents, working at height precautions, manual handling considerations, asbestos awareness checks, and any health and safety discussions with your supervisor. These entries demonstrate the health and safety awareness that the apprenticeship standard and EPA assessors are looking for.',
  },
  {
    question: 'Can my site diary count as off-the-job training evidence?',
    answer:
      'The act of writing a site diary entry is generally considered reflective practice, which can count as off-the-job training if it involves reflecting on new knowledge, skills, or behaviours you have acquired. More importantly, the activities you record in your diary — shadowing experienced electricians, learning new techniques, practising skills for the first time — are themselves off-the-job training activities. Your site diary provides a convenient record that feeds into your OJT tracker. On Elec-Mate, site diary entries can be linked directly to your OJT hours log, creating a seamless evidence chain.',
  },
  {
    question: 'Should I include photographs in my site diary?',
    answer:
      'Yes, photographs are extremely valuable. A photo of a consumer unit you helped install, a containment system you fitted, or a testing setup you configured adds visual evidence that supports your written description. Photos are particularly useful for your portfolio — they show assessors exactly what you did, not just what you wrote about. When taking photos on site, always check with your supervisor first and never photograph anything that could compromise site security. Elec-Mate site diary lets you attach photos directly to each daily entry.',
  },
  {
    question: 'How far back should I go if I have not been keeping a diary?',
    answer:
      'Start from today. Do not try to reconstruct weeks or months of entries from memory — the results will be inaccurate and unconvincing. The best time to start a site diary was your first day on site. The second best time is now. Going forward, commit to a brief entry every working day. Within a few months, you will have a substantial body of evidence that covers a meaningful period of your apprenticeship. Consistency from now on matters more than trying to fill in gaps.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/off-job-training-hours',
    title: 'Off-the-Job Training Hours',
    description: 'The 20% requirement explained — what counts, evidence, and automatic tracking.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description: 'Digital evidence tracking and AI-powered criteria mapping for your portfolio.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'End Point Assessment components, grading, and how to prepare effectively.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/year-1-electrical-apprentice',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year on site as an electrical apprentice.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/what-to-expect-electrical-apprentice',
    title: 'What to Expect as an Apprentice',
    description: 'The honest reality of life as an electrical apprentice — the good and the hard.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Complete guide to starting and completing an electrical apprenticeship in the UK.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-site-diary',
    heading: 'What Is a Site Diary?',
    content: (
      <>
        <p>
          A site diary is a daily written record of your activities, observations, and learning on
          site. For electrical apprentices, it serves as a personal log of your professional
          development — a running account of what you did each day, what skills you practised, what
          you learned, and any health and safety observations you made.
        </p>
        <p>
          Think of it as a professional habit that working electricians use throughout their
          careers. On large commercial or industrial projects, site diaries are contractual
          documents that record progress, delays, instructions, and safety incidents. As an
          apprentice, your site diary is simpler — but no less valuable. It is the foundation of
          your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            apprentice portfolio
          </SEOInternalLink>{' '}
          and a powerful tool for tracking your growth over the four years of your apprenticeship.
        </p>
        <p>
          The best apprentices treat the site diary as a non-negotiable daily habit — 5 to 10
          minutes at the end of each working day to capture what happened while it is fresh in your
          mind. Over four years, these entries build an extraordinary record of your journey from
          day one to qualified electrician.
        </p>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why a Site Diary Matters for Apprentices',
    content: (
      <>
        <p>
          A site diary is not just a record — it is a tool that actively supports your
          apprenticeship in several ways:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio evidence:</strong> Each diary entry can provide evidence against
                specific apprenticeship standard criteria. When you describe fitting your first
                consumer unit or carrying out a safe isolation procedure, that is portfolio evidence
                being generated naturally through your daily work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OJT evidence:</strong> Activities recorded in your diary — learning new
                skills, shadowing experienced electricians, practising techniques for the first time
                — link directly to your{' '}
                <SEOInternalLink href="/guides/off-job-training-hours">
                  off-the-job training hours
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reflective practice:</strong> Writing about what you learned forces you to
                think about it. This reflective practice deepens understanding and helps you
                identify knowledge gaps — a professional behaviour valued by EPA assessors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional habit:</strong> Keeping a site diary is standard practice on
                large projects. Building the habit now prepares you for professional life as a
                qualified electrician, particularly if you progress into supervisory or project
                management roles.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-record',
    heading: 'What to Record in Your Daily Entry',
    content: (
      <>
        <p>
          A good daily site diary entry covers the following areas. You do not need to write a lot
          under each heading — a sentence or two is usually enough.
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Calendar className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Date, Site, and Weather</h3>
              <p className="text-white text-sm leading-relaxed">
                The basics: today's date, which site you were on, and the weather conditions (this
                matters for outdoor work, cable pulling, and roof access decisions).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Tasks Performed</h3>
              <p className="text-white text-sm leading-relaxed">
                What did you actually do today? Be specific: "Ran 2.5mm twin and earth from CU to
                kitchen ring circuit, clipped to joists at 300mm centres" is far better than
                "wiring." Include quantities, locations, and methods.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <GraduationCap className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">New Skills and Learning</h3>
              <p className="text-white text-sm leading-relaxed">
                Did you learn something new today? Practise a skill for the first time? Get shown a
                technique you had not used before? Record it — this is your most valuable evidence
                for both OJT hours and your portfolio.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Health and Safety</h3>
              <p className="text-white text-sm leading-relaxed">
                PPE worn, risk assessments reviewed, safe isolation performed, toolbox talks
                attended, hazards spotted and reported, working at height precautions. Even a brief
                note demonstrates your H&S awareness.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <PenLine className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Reflections and Questions</h3>
              <p className="text-white text-sm leading-relaxed">
                What went well? What would you do differently? What questions do you need to ask
                tomorrow? Reflective notes show professional maturity and help you identify areas to
                focus on in your studies.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'skills-practised',
    heading: 'Recording Skills You Have Practised',
    content: (
      <>
        <p>
          One of the most important things to capture in your site diary is when you practise a
          skill for the first time or develop a skill further. These entries directly support your
          apprenticeship portfolio by providing evidence of practical competence.
        </p>
        <p>When recording skills, include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What the skill was:</strong> Be specific — "terminated a 6-way Hager
                consumer unit" not just "board work"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Whether it was your first time:</strong> First-time activities are
                particularly valuable evidence. Note if you were supervised, guided, or working
                independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools and equipment used:</strong> Listing the tools demonstrates knowledge
                of trade equipment — "used Megger MFT1741 for insulation resistance testing at 500V
                DC"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulations referenced:</strong> If you followed a specific regulation or
                guidance — "installed socket in Zone 2 of bathroom per{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
                Section 701" — record it
              </span>
            </li>
          </ul>
        </div>
        <p>
          Over four years, these skill entries form a comprehensive record of your practical
          development. When you reach the gateway stage before the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">EPA</SEOInternalLink>, having detailed
          records of every skill you have practised makes portfolio compilation straightforward
          rather than stressful.
        </p>
      </>
    ),
  },
  {
    id: 'health-safety',
    heading: 'Health and Safety Observations',
    content: (
      <>
        <p>
          Recording health and safety observations in your site diary is one of the most effective
          ways to demonstrate the professional behaviours required by the apprenticeship standard.
          EPA assessors specifically look for evidence that apprentices understand and apply health
          and safety practices.
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">PPE and Site Safety</h3>
              <p className="text-white text-sm leading-relaxed">
                Record the PPE you wore and why: "Safety boots, hard hat, hi-vis vest, and safety
                glasses for drilling into masonry." Note any site inductions, permit-to-work
                systems, and access control procedures.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Hazards and Near Misses</h3>
              <p className="text-white text-sm leading-relaxed">
                Document any hazards you identified and how they were managed: "Noticed exposed
                cable damage on extension lead in communal area — reported to site supervisor and
                lead was removed from service." Near-miss reports show exactly the kind of awareness
                assessors want to see.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <ClipboardCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Safe Isolation</h3>
              <p className="text-white text-sm leading-relaxed">
                Every time you carry out or observe a{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedure
                </SEOInternalLink>
                , record it: "Performed safe isolation on ring circuit 3 using Martindale VI-13800
                proving unit — proved dead, locked off with personal padlock, caution notice
                posted."
              </p>
            </div>
          </div>
        </div>
        <p>
          These entries are gold dust for your portfolio. They demonstrate that you take health and
          safety seriously, can identify hazards, and follow correct procedures — all of which are
          assessed during the EPA.
        </p>
      </>
    ),
  },
  {
    id: 'evidence-for-portfolio',
    heading: 'How Site Diary Entries Become Portfolio Evidence',
    content: (
      <>
        <p>
          Your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            apprentice portfolio
          </SEOInternalLink>{' '}
          needs evidence mapped against the apprenticeship standard criteria. Many apprentices
          struggle with this because they try to compile everything in the months before the
          gateway. A daily site diary solves this problem by generating portfolio evidence naturally
          as you work.
        </p>
        <p>
          <strong>How it works:</strong> Each site diary entry describes tasks, skills, and
          learning. These descriptions map directly to apprenticeship standard criteria. For
          example:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                "Installed containment system using galvanised trunking and tee pieces in commercial
                kitchen" maps to <strong>Installation</strong> competency criteria
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                "Carried out safe isolation, insulation resistance testing, and earth fault loop
                impedance testing on bathroom circuit" maps to <strong>Testing</strong> competency
                criteria
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                "Identified damaged cable insulation, reported to supervisor, cable replaced" maps
                to <strong>Health and Safety</strong> and <strong>Professional Behaviours</strong>
              </span>
            </li>
          </ul>
        </div>
        <p>
          On Elec-Mate, site diary entries can be tagged to specific portfolio criteria. The
          portfolio builder then pulls in relevant diary entries automatically, so your portfolio
          grows as you work rather than being a separate, stressful exercise.
        </p>
        <SEOAppBridge
          title="Your site diary builds your portfolio"
          description="Elec-Mate site diary entries link directly to your portfolio criteria. Tag each entry, attach photos, and watch your portfolio evidence grow automatically. No last-minute scramble before the gateway."
          icon={FolderOpen}
        />
      </>
    ),
  },
  {
    id: 'good-vs-bad-entries',
    heading: 'Good vs Bad Site Diary Entries',
    content: (
      <>
        <p>
          The difference between a useful site diary entry and a useless one comes down to
          specificity. Compare these examples:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Bad Entry</h3>
            <p className="text-white text-sm leading-relaxed italic">
              "Did wiring all day. Fitted some sockets. Wore PPE."
            </p>
            <p className="text-white text-sm leading-relaxed mt-3">
              This tells you nothing useful. What wiring? What type of sockets? Where? Was it new
              learning or routine work? What PPE? This entry cannot support your portfolio or OJT
              records.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Good Entry</h3>
            <p className="text-white text-sm leading-relaxed italic">
              "First fix in Plot 12 kitchen. Ran 2.5mm T+E from CU to 6 double socket positions,
              clipped to joists at 300mm centres. First time using SWA gland kit for outdoor socket
              feed — supervised by Dave. Wore safety boots, hard hat, safety glasses for drilling.
              Site toolbox talk on ladder safety at 8am."
            </p>
            <p className="text-white text-sm leading-relaxed mt-3">
              Specific tasks, a first-time skill, supervision noted, PPE detailed, and H&S activity
              recorded. This entry supports multiple portfolio criteria.
            </p>
          </div>
        </div>
        <p>
          You do not need to write a novel. Three or four specific sentences beat three paragraphs
          of vague waffle. The structured prompts in Elec-Mate's site diary guide you through each
          section so you naturally write better, more useful entries.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-site-diary',
    heading: 'Site Diary on Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate's site diary feature was designed specifically for electrical apprentices. It
          makes daily recording quick, structured, and directly connected to your portfolio and OJT
          tracker.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PenLine className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Structured Daily Prompts</h4>
                <p className="text-white text-sm leading-relaxed">
                  The diary prompts you through each section: tasks performed, skills practised,
                  tools used, health and safety observations, and reflections. No staring at a blank
                  page wondering what to write.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Photo Attachments</h4>
                <p className="text-white text-sm leading-relaxed">
                  Snap a photo of the work you did today and attach it to your entry. Visual
                  evidence strengthens your portfolio and makes your diary entries far more
                  compelling.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Portfolio Linking</h4>
                <p className="text-white text-sm leading-relaxed">
                  Tag each entry to apprenticeship standard criteria. Your{' '}
                  <SEOInternalLink href="/guides/apprentice-portfolio">
                    portfolio builder
                  </SEOInternalLink>{' '}
                  automatically pulls in relevant diary entries, so evidence accumulates naturally
                  over your four years.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">OJT Integration</h4>
                <p className="text-white text-sm leading-relaxed">
                  When your diary entry includes new learning or first-time skills, it can be linked
                  to your{' '}
                  <SEOInternalLink href="/guides/off-job-training-hours">
                    OJT tracker
                  </SEOInternalLink>{' '}
                  as evidence of off-the-job training activities.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start Your Site Diary Today"
          description="Elec-Mate site diary gives you structured daily prompts, photo attachments, portfolio linking, and OJT integration. Build the habit from day one and your evidence takes care of itself. 7-day free trial."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SiteDiaryGuidePage() {
  return (
    <GuideTemplate
      title="Site Diary for Apprentices | What to Record Daily"
      description="Complete guide to keeping a site diary as an electrical apprentice. What to record daily, skills logging, health and safety observations, portfolio evidence, and how Elec-Mate site diary automates the process."
      datePublished="2025-11-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Site Diary for Apprentices:{' '}
          <span className="text-yellow-400">What to Record Every Day</span>
        </>
      }
      heroSubtitle="A daily site diary is one of the most productive habits an electrical apprentice can build. It generates portfolio evidence, supports off-the-job training records, and helps you reflect on your progress. This guide explains exactly what to write and how Elec-Mate makes it effortless."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Site Diaries"
      relatedPages={relatedPages}
      ctaHeading="Build Your Site Diary Habit with Elec-Mate"
      ctaSubheading="Join 430+ UK apprentices using Elec-Mate's site diary with structured prompts, photo attachments, portfolio linking, and OJT integration. 7-day free trial, cancel anytime."
    />
  );
}
