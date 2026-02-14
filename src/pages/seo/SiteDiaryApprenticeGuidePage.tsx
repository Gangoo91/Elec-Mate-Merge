import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  GraduationCap,
  Brain,
  ClipboardCheck,
  Award,
  Calendar,
  FolderOpen,
  Target,
  Heart,
  Sparkles,
  PenLine,
  BarChart3,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Site Diary for Apprentices', href: '/guides/site-diary-for-apprentices' },
];

const tocItems = [
  { id: 'why-keep-diary', label: 'Why Keep a Site Diary?' },
  { id: 'what-to-record', label: 'What to Record Each Day' },
  { id: 'effective-entries', label: 'Tips for Effective Diary Entries' },
  { id: 'linking-to-criteria', label: 'Linking Entries to Assessment Criteria' },
  { id: 'diary-and-epa', label: 'How Your Diary Helps at EPA' },
  { id: 'common-mistakes', label: 'Common Diary-Keeping Mistakes' },
  { id: 'elecmate-site-diary', label: 'Elec-Mate Site Diary Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A site diary is one of the most valuable habits an apprentice can develop. It provides evidence for your portfolio, supports your EPA professional discussion, tracks your learning and professional development, and creates a searchable record of your entire apprenticeship experience.',
  'Record seven key things each day: date and location, tasks completed, skills practised, tools and materials used, regulations applied, health and safety observations, and what you learned. Detailed entries written on the same day are far more valuable than vague entries written from memory days or weeks later.',
  'Linking diary entries to apprenticeship standard (ST0215) assessment criteria turns your daily log into structured portfolio evidence. Each entry can demonstrate knowledge, skills, or behaviours defined in the standard.',
  'Your site diary is directly relevant to the EPA professional discussion. Assessors ask about specific experiences from your apprenticeship — a well-maintained diary means you can recall details accurately and speak confidently about your work.',
  'Elec-Mate site diary includes mood tracking, skills tracking across 8 categories, AI coach insights, auto-suggest AC mapping from entries, study streak tracking, and weekly summaries. Digital, searchable, and linked directly to your portfolio.',
];

const faqs = [
  {
    question: 'How detailed should my site diary entries be?',
    answer:
      'Your diary entries should be detailed enough that you could read them months or years later and clearly understand what you did, how you did it, and what you learned. A vague entry like "Wired sockets" tells you almost nothing. A detailed entry like "Installed 6 double socket outlets on a ring final circuit in a domestic kitchen extension. Used 2.5mm twin-and-earth cable clipped to joists at 300mm centres. Connected spurs for the fridge freezer and dishwasher using fused connection units per BS 7671 Regulation 433.1. Supervisor checked my terminations and commented that my cable stripping was clean but I could improve my cable dressing at the consumer unit — will practise this tomorrow" provides rich evidence of your developing competence. Aim for 3 to 5 sentences per entry as a minimum. If something notable happened — a new skill learned, a challenging situation navigated, or a safety concern identified — write more.',
  },
  {
    question: 'Should I write my diary every day or can I do it weekly?',
    answer:
      'Write your diary every day, ideally at the end of each working day or during a quiet moment on site. Writing daily ensures accuracy — you capture details while they are fresh in your mind. If you leave it until the weekend or the end of the week, you will forget important details, merge days together in your memory, and produce generic entries that lack the specificity needed for good portfolio evidence. The difference between a daily diary and a weekly diary is the difference between a rich, detailed record and a vague summary. Elec-Mate site diary makes daily entries quick — you can add an entry in under two minutes from your phone, selecting skills categories, mood, and typing a brief description. The AI coach then prompts you with follow-up questions to deepen your reflection if you have time.',
  },
  {
    question: 'Can my site diary be used as portfolio evidence?',
    answer:
      "Yes, and this is one of the primary reasons to keep a site diary. Each diary entry can serve as portfolio evidence when it is linked to the apprenticeship standard (ST0215) assessment criteria. A well-written diary entry that describes the work you carried out, the skills you applied, the regulations you followed, and the reflection on what you learned can map to multiple knowledge, skills, and behaviour criteria. Elec-Mate's auto-suggest AC mapping analyses your diary entries and suggests which assessment criteria each entry covers, making it easy to build your portfolio progressively as part of your daily routine. Instead of scrambling to create portfolio evidence before the EPA gateway, you build it naturally through consistent diary keeping. Your assessor during the professional discussion can also reference diary entries as evidence of your professional development over time.",
  },
  {
    question: 'What is mood tracking in a site diary and why does it matter?',
    answer:
      'Mood tracking is a feature in Elec-Mate site diary that lets you record how you are feeling each day — confident, stressed, motivated, frustrated, tired, or any combination. This might seem unrelated to an electrical apprenticeship, but it serves several important purposes. First, it helps you identify patterns: if you consistently feel stressed on certain types of jobs or frustrated after specific interactions, you can address those situations proactively. Second, it supports your mental health awareness — an apprenticeship can be demanding, and tracking your mood over time helps you recognise when you might need support. Third, it provides data for the AI coach: Elec-Mate AI insights can identify correlations between your mood, your learning activities, and your performance, offering personalised suggestions. The Elec-Mate mental health hub is available if mood tracking reveals persistent low mood or anxiety — connecting you with resources specifically tailored for construction and electrical trade apprentices.',
  },
  {
    question: 'How does the AI coach work with my site diary?',
    answer:
      'The AI coach in Elec-Mate analyses your diary entries and provides personalised insights and suggestions. After you submit a diary entry, the AI may prompt you with reflection questions: "You mentioned wiring a two-way switching circuit — can you describe which regulation covers the identification of switch wires?" or "You noted a health and safety concern today — what action did you take and what would you do differently?" These prompts encourage deeper reflection, which produces richer portfolio evidence and better prepares you for EPA professional discussion questions. The AI also tracks your skills development across 8 categories over time, identifying areas where you have strong evidence and areas where more experience or documentation is needed. Weekly summaries highlight your progression, study streaks, and any emerging patterns in your mood or learning.',
  },
  {
    question: 'Is a digital site diary better than a paper one?',
    answer:
      'A digital site diary offers significant advantages over paper. Searchability: you can find any entry by date, keyword, skill category, or mood in seconds, rather than flipping through a notebook. Security: paper diaries can be lost, damaged, or destroyed — a digital diary is backed up to the cloud. Integration: a digital diary can link directly to your portfolio, OTJ hour tracker, and assessment criteria mapping. Accessibility: add entries from your phone on site, review them at home, and share them with your training provider or employer digitally. Analysis: a digital diary can track patterns over time — skills development, mood trends, learning progression — which a paper diary cannot. Speed: selecting pre-defined skill categories and mood indicators is faster than writing them out by hand each day. The only advantage of a paper diary is that it requires no battery or signal — but given that most apprentices have their phone on site anyway, this is rarely a practical concern.',
  },
  {
    question: 'How long should I keep my site diary for?',
    answer:
      'Keep your site diary for the duration of your apprenticeship at a minimum. The entries serve as evidence for your portfolio and EPA, so you need them until you have completed the End Point Assessment and received your result. Beyond the apprenticeship, your site diary is a valuable professional record. It documents the installations you have worked on, the skills you have developed, the challenges you have navigated, and the progression from novice to competent professional. Many qualified electricians continue keeping some form of work diary throughout their career — it supports CPD records, provides evidence of experience for future job applications, and helps with reflection on professional development. In Elec-Mate, your diary entries are stored securely in the cloud and accessible as long as you maintain your account. Entries can be exported at any time for personal records.',
  },
];

const relatedPages = [
  {
    href: '/guides/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description: 'Digital evidence tracking, AI criteria mapping, and EPAO-ready export.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'End Point Assessment explained — components, grading, and preparation.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/off-the-job-training-hours',
    title: 'Off-the-Job Training Hours',
    description: 'Understanding and tracking the 20% off-the-job training requirement.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/year-1-apprentice-guide',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year as an electrical apprentice.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'Timed mock exercises and preparation tips for the AM2 practical assessment.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: 'Pay rates, JIB grades, and financial expectations during your apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'why-keep-diary',
    heading: 'Why Keeping a Site Diary Matters',
    content: (
      <>
        <p>
          A site diary is one of the most powerful yet underused tools available to electrical
          apprentices. Most apprentices do not keep one — or keep one so sporadically that it offers
          little value. The apprentices who keep a consistent, detailed site diary stand out at
          every stage of their apprenticeship, from progress reviews to the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
        </p>
        <p>
          <strong>Evidence for your portfolio:</strong> Your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            apprentice portfolio
          </SEOInternalLink>{' '}
          must demonstrate your competence across the full range of the apprenticeship standard.
          Building that evidence retrospectively — trying to remember what you did six months ago —
          produces thin, generic entries. A daily diary captures the details while they are fresh,
          creating rich, specific evidence that you can draw on when building your portfolio.
        </p>
        <p>
          <strong>EPA preparation:</strong> The professional discussion component of the EPA
          requires you to talk in detail about your on-the-job experiences. The assessor will ask
          questions like "Tell me about a challenging installation you completed" or "Describe a
          time you identified a safety concern." A well-maintained diary means you can recall
          specific examples with accurate details — dates, locations, regulations applied, decisions
          made — rather than offering vague generalisations.
        </p>
        <p>
          <strong>Professional development:</strong> Writing about your day forces you to reflect on
          what you learned, what you found difficult, and what you would do differently. This
          reflection accelerates your learning because you are actively processing your experiences
          rather than passively accumulating them.
        </p>
        <p>
          <strong>A searchable record:</strong> Over three to four years, you will work on hundreds
          of different tasks across many different sites. A searchable digital diary lets you find
          any experience instantly — "When did I first wire a two-way switching circuit?" or "What
          was the fault on that commercial job in March?" This is invaluable for portfolio building,
          EPA preparation, and your own professional reference.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-record',
    heading: 'What to Record Each Day',
    content: (
      <>
        <p>
          A good diary entry captures seven key pieces of information. The more consistently you
          record these, the more valuable your diary becomes as portfolio evidence and EPA
          preparation.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Date and Location</h3>
                <p className="text-white text-sm leading-relaxed">
                  Record the date and the site or location where you worked. This creates a
                  chronological record and helps you recall the context of each experience. If you
                  work on multiple sites, note which site each entry relates to.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Tasks Completed</h3>
                <p className="text-white text-sm leading-relaxed">
                  Describe the work you carried out. Be specific: "Installed 4 twin 13A socket
                  outlets in a domestic first-floor bedroom, fed from the existing ring final
                  circuit" is far more useful than "Fitted sockets."
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Skills Practised</h3>
                <p className="text-white text-sm leading-relaxed">
                  Note which skills you used or developed. Cable preparation, termination, testing,
                  containment installation, cable routing, safe isolation, fault finding, circuit
                  design interpretation, or communication with clients. This maps directly to the
                  skills criteria in the apprenticeship standard.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Tools and Materials Used</h3>
                <p className="text-white text-sm leading-relaxed">
                  Record the tools and materials you worked with. "Used 2.5mm twin-and-earth cable,
                  plastic trunking for surface runs, and a Megger MFT1741 for insulation resistance
                  testing." This demonstrates your familiarity with professional equipment and
                  materials.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                5
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Regulations Applied</h3>
                <p className="text-white text-sm leading-relaxed">
                  Note any BS 7671 regulations, building regulations, or health and safety
                  requirements you applied. "Ensured all socket outlets in the bathroom were outside
                  Zone 2 per BS 7671 Section 701" or "Carried out safe isolation per HSE GS38
                  guidance." This demonstrates regulatory awareness.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                6
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Health and Safety Observations
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Record any health and safety actions, observations, or concerns. "Identified
                  trailing cables across a walkway and re-routed them before continuing work" or
                  "Used RPE while drilling through plaster containing potential asbestos." This maps
                  to the behaviour criteria in the standard.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                7
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">What You Learned</h3>
                <p className="text-white text-sm leading-relaxed">
                  This is the most important part. Reflect on what you learned today. "Learned that
                  the common terminal on a two-way switch is not always in the same position — need
                  to check the back of each switch" or "Realised I need to practise my cable
                  dressing at consumer units." This reflection drives your professional development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'effective-entries',
    heading: 'Tips for Effective Diary Entries',
    content: (
      <>
        <p>
          The difference between a useful diary and a useless one comes down to consistency, detail,
          and reflection. Here are practical tips for making your diary entries as valuable as
          possible.
        </p>
        <p>
          <strong>Write on the same day:</strong> The single most important habit. Write your entry
          on the day the work happened, while the details are fresh. Even a two-minute entry written
          on the same day is more valuable than a paragraph written from memory a week later.
        </p>
        <p>
          <strong>Be specific, not vague:</strong> Replace general statements with specific details.
          Instead of "Did some wiring," write "Wired a 20A radial circuit for a kitchen cooker point
          using 4mm twin-and-earth cable, terminated at a 45A cooker switch with neon indicator."
          Specific entries demonstrate competence; vague entries demonstrate nothing.
        </p>
        <p>
          <strong>Include the "why":</strong> Do not just describe what you did — explain why you
          did it that way. "Used a 32A Type B MCB because the load is resistive and the cable is
          rated for 32A per BS 7671 Table 4D5A Column 6 (Reference Method C)" shows understanding,
          not just execution.
        </p>
        <p>
          <strong>Note mistakes and corrections:</strong> Recording mistakes is not a weakness — it
          is a strength. "Initially connected the neutral to the wrong terminal on the RCD — spotted
          the error during visual inspection before energising and corrected it" demonstrates
          self-checking behaviour, which is exactly what assessors look for.
        </p>
        <p>
          <strong>Capture "firsts":</strong> The first time you do something new is always worth a
          detailed entry. First consumer unit installation, first two-way switching circuit, first
          use of an MFT, first fault found independently — these entries mark your progression and
          provide specific examples for your EPA professional discussion.
        </p>
        <p>
          <strong>Use photographs:</strong> A photograph of your completed work, annotated with a
          brief description, is powerful portfolio evidence. Photograph the consumer unit you built,
          the containment run you installed, the test setup you configured. Elec-Mate site diary
          supports photo attachments on every entry.
        </p>
      </>
    ),
  },
  {
    id: 'linking-to-criteria',
    heading: 'Linking Diary Entries to Assessment Criteria',
    content: (
      <>
        <p>
          The real power of a site diary becomes apparent when you link your entries to the
          apprenticeship standard assessment criteria (ST0215). This transforms your daily log from
          a personal record into structured portfolio evidence that demonstrates coverage of the
          standard.
        </p>
        <p>
          The ST0215 standard defines knowledge criteria (what you need to know), skills criteria
          (what you need to be able to do), and behaviour criteria (how you need to conduct
          yourself). Each diary entry can potentially map to multiple criteria across all three
          categories.
        </p>
        <p>
          <strong>Example mapping:</strong> A diary entry about installing a consumer unit might map
          to: the "installation" skills criterion, the "BS 7671 application" knowledge criterion,
          the "selection and erection of equipment" knowledge criterion, and the "safe working
          practices" behaviour criterion. A single detailed entry can demonstrate competence across
          four or more criteria simultaneously.
        </p>
        <p>
          <strong>Manual mapping is tedious:</strong> Manually reviewing the ST0215 criteria
          document and tagging each diary entry would be time-consuming and require detailed
          knowledge of the standard structure. Most apprentices do not do it — which means their
          diary entries remain personal notes rather than portfolio evidence.
        </p>
        <p>
          <strong>Elec-Mate auto-suggest mapping:</strong> Elec-Mate's AI analyses your diary entry
          text and automatically suggests which assessment criteria each entry covers. You can
          accept, modify, or reject the suggestions with a single tap. Over time, the AI builds a
          visual map of your criteria coverage — showing which criteria have strong evidence, which
          have partial coverage, and which need more diary entries or portfolio evidence. This gap
          analysis helps you proactively seek experiences in areas where your coverage is weak.
        </p>
        <SEOAppBridge
          title="Auto-Map Diary Entries to Assessment Criteria"
          description="Elec-Mate AI analyses your site diary entries and suggests which ST0215 assessment criteria they cover. Build your portfolio naturally as part of your daily routine. See your criteria coverage at a glance."
          icon={Sparkles}
        />
      </>
    ),
  },
  {
    id: 'diary-and-epa',
    heading: 'How Your Site Diary Helps at EPA',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">
            professional discussion
          </SEOInternalLink>{' '}
          component of the EPA is where your site diary pays its biggest dividend. The assessor asks
          open-ended questions about your on-the-job experiences, and your ability to answer with
          specific, detailed, reflective responses is the difference between a Pass and a
          Distinction.
        </p>
        <p>
          <strong>Recall specific examples:</strong> When the assessor asks "Tell me about a
          challenging installation you completed," an apprentice without a diary struggles to recall
          a specific example and gives a generic answer. An apprentice with a diary can say: "In
          September last year, I was working on a kitchen renovation in a 1960s property where the
          existing wiring was all two-core with no CPC. I had to install a new consumer unit and
          rewire the kitchen circuits with a PME earthing arrangement. The challenge was..." This
          specificity impresses assessors.
        </p>
        <p>
          <strong>Demonstrate progression:</strong> Your diary shows your development over time —
          from struggling with basic terminations in year 1 to independently wiring complex circuits
          in year 3. The assessor can see (and ask about) this progression, which demonstrates the
          growth in competence that the EPA is designed to confirm.
        </p>
        <p>
          <strong>Provide evidence of professional behaviours:</strong> Diary entries that mention
          identifying safety concerns, communicating with clients, working as part of a team, taking
          initiative, or reflecting on mistakes demonstrate the professional behaviours that the EPA
          assesses. These are often the hardest criteria to evidence — but a consistent diary
          captures them naturally.
        </p>
        <p>
          <strong>Practise articulating experiences:</strong> The act of writing about your work
          every day practises the skill of articulating your competence — the exact skill you need
          in the professional discussion. Apprentices who write regularly find the professional
          discussion format far less daunting because they are already comfortable describing and
          reflecting on their experiences.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Diary-Keeping Mistakes to Avoid',
    content: (
      <>
        <p>
          Understanding common mistakes helps you avoid them from the start, ensuring your diary is
          consistently valuable.
        </p>
        <p>
          <strong>Starting too late:</strong> Many apprentices do not start keeping a diary until
          year 3 or 4, when the EPA is approaching and they suddenly need portfolio evidence. By
          then, two or three years of experiences are lost. Start on day one of your apprenticeship.
          Your year 1 entries will be simpler, but they document the beginning of your journey —
          which is exactly what assessors want to see.
        </p>
        <p>
          <strong>Inconsistency:</strong> Writing three detailed entries one week, then nothing for
          a month, then a few entries, then nothing for two months. This pattern produces gaps in
          your record and makes it difficult to demonstrate consistent development. Set a daily
          reminder — Elec-Mate sends notifications to help you maintain your streak.
        </p>
        <p>
          <strong>Being too vague:</strong> "Did wiring today" or "Worked on site" are not useful
          diary entries. They provide no evidence of competence, no detail for portfolio building,
          and no specific examples for the EPA discussion. If an entry would make sense about any
          job on any day, it is too vague.
        </p>
        <p>
          <strong>Only recording positive experiences:</strong> Some apprentices only record things
          that went well. Mistakes, challenges, and difficulties are equally valuable — arguably
          more valuable — because they demonstrate reflective learning and problem-solving.
          Recording "I wired the two-way switch incorrectly and had to rewire it after the
          continuity test showed an open circuit" demonstrates more learning than "Wired two-way
          switch successfully."
        </p>
        <p>
          <strong>Not reflecting on learning:</strong> Recording what you did without reflecting on
          what you learned misses half the value. Every entry should include at least one sentence
          about what you learned, what you would do differently, or what you want to practise
          further. This reflection is what turns a task log into professional development evidence.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-site-diary',
    heading: 'Elec-Mate Site Diary Features',
    content: (
      <>
        <p>
          Elec-Mate's site diary was designed specifically for electrical apprentices, incorporating
          features that make diary keeping quick, valuable, and directly connected to your
          apprenticeship progression.
        </p>
        <p>
          <strong>Mood tracking:</strong> Select your mood each day from a range of options —
          confident, motivated, stressed, tired, frustrated, neutral. Over time, mood data reveals
          patterns that the AI coach can help you address. If you are consistently stressed on
          certain types of jobs, the AI might suggest specific revision or skills practice to build
          confidence in that area. The{' '}
          <SEOInternalLink href="/guides/year-1-apprentice-guide">
            mental health hub
          </SEOInternalLink>{' '}
          is available if persistent low mood is identified.
        </p>
        <p>
          <strong>Skills tracking (8 categories):</strong> Each diary entry lets you tag which
          skills you practised from 8 predefined categories: installation, testing, fault finding,
          safe isolation, design and planning, health and safety, communication, and professional
          development. Over time, this builds a visual profile of your skills development, showing
          which areas you work in regularly and which need more experience.
        </p>
        <p>
          <strong>AI coach insights:</strong> After you submit a diary entry, the AI coach analyses
          the content and offers personalised prompts. It might ask a reflection question, suggest a
          regulation to review, recommend a flashcard topic based on today's work, or highlight a
          gap in your skills tracking that you could address in the coming week.
        </p>
        <p>
          <strong>Auto-suggest AC mapping:</strong> The AI suggests which apprenticeship standard
          assessment criteria each diary entry covers. Accept or modify the suggestions, and your
          criteria coverage is tracked automatically. A visual dashboard shows your coverage across
          the full ST0215 standard.
        </p>
        <p>
          <strong>Study streak tracking:</strong> Maintain a daily diary streak to build the habit.
          Streaks are tracked alongside your flashcard streaks and study activity, contributing to
          achievements and milestones that keep you motivated throughout the apprenticeship.
        </p>
        <p>
          <strong>Weekly summaries:</strong> At the end of each week, Elec-Mate generates a summary
          of your diary entries — skills practised, mood trends, criteria covered, and hours logged.
          These summaries are useful for progress reviews with your training provider and for your
          own reflection on your week.
        </p>
        <p>
          <strong>Portfolio integration:</strong> Diary entries link directly to your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            apprentice portfolio
          </SEOInternalLink>
          . Any entry can be promoted to a full portfolio entry with additional detail, photographs,
          and witness testimony. Your OTJ hours from diary-related activities are also tracked in
          the{' '}
          <SEOInternalLink href="/guides/off-the-job-training-hours">OJT Tracker</SEOInternalLink>.
        </p>
        <SEOAppBridge
          title="Start Your Digital Site Diary Today"
          description="Mood tracking, skills tracking, AI coach insights, auto AC mapping, study streaks, and weekly summaries — all from your phone on site. Join 430+ UK apprentices building their evidence daily. 7-day free trial."
          icon={PenLine}
        />
      </>
    ),
  },
];

export default function SiteDiaryApprenticeGuidePage() {
  return (
    <GuideTemplate
      title="Site Diary for Apprentices | How to Keep a Daily Log"
      description="Complete guide to keeping an effective site diary as an electrical apprentice. What to record, tips for detailed entries, linking to assessment criteria, EPA preparation benefits, and Elec-Mate's digital site diary with mood tracking and AI coaching."
      datePublished="2025-11-01"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Site Diary for Apprentices —{' '}
          <span className="text-yellow-400">How to Keep a Daily Log</span>
        </>
      }
      heroSubtitle="A well-kept site diary is one of the most powerful tools in an apprentice's toolkit. It provides evidence for your portfolio, prepares you for the EPA professional discussion, tracks your professional development, and creates a searchable record of your entire apprenticeship. This guide shows you how to do it effectively."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Site Diaries"
      relatedPages={relatedPages}
      ctaHeading="Build your evidence from day one"
      ctaSubheading="Join 430+ UK apprentices keeping daily site diaries with Elec-Mate. Mood tracking, AI coaching, auto AC mapping, and portfolio integration. 7-day free trial, cancel anytime."
    />
  );
}
