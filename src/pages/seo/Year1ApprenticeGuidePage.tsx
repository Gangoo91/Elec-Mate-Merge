import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Calendar,
  GraduationCap,
  BookOpen,
  Brain,
  ClipboardCheck,
  Award,
  Target,
  FolderOpen,
  Wrench,
  Heart,
  Shield,
  Zap,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Year 1 Apprentice Guide', href: '/guides/year-1-apprentice-guide' },
];

const tocItems = [
  { id: 'day-by-day', label: 'What Year 1 Looks Like Day by Day' },
  { id: 'what-you-learn', label: 'What You Learn in Year 1' },
  { id: 'employer-expectations', label: 'What Your Employer Expects' },
  { id: 'dealing-with-nerves', label: 'Dealing with First-Day Nerves' },
  { id: 'essential-tools', label: 'Essential Tools to Buy' },
  { id: 'building-relationships', label: 'Building Relationships on Site' },
  { id: 'common-mistakes', label: 'Common Year 1 Mistakes' },
  { id: 'study-tips', label: 'Study Tips for Year 1' },
  { id: 'elecmate-year-one', label: 'Elec-Mate — Your Day 1 Companion' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Year 1 typically involves four days per week with your employer on site and one day per week at college. You will spend a lot of time observing, assisting, and learning the basics before working independently.',
  'In year 1 you learn basic installation skills (cable preparation, termination, containment), health and safety fundamentals, hand tool use, common cable types and sizes, basic testing concepts, and an introduction to BS 7671 regulations.',
  'Your employer expects you to be punctual, willing to learn, ask questions, follow instructions, maintain a tidy workspace, and develop good safety habits from day one. They do not expect you to know everything — that is what the apprenticeship is for.',
  'Invest in a quality basic tool kit from the start: VDE screwdrivers, side cutters, long-nose pliers, cable strippers, a tape measure, a spirit level, and a sharp knife. Buy good tools that will last — cheap tools make the job harder and less safe.',
  'Elec-Mate is your companion from day 1. Level 2 courses cover exactly what you learn in year 1. Flashcards build core knowledge. The site diary records daily learning. The OJT tracker ensures compliance. The electrical symbols guide and mental health hub support you through the tough days.',
];

const faqs = [
  {
    question: 'What do I do on my first day as an electrical apprentice?',
    answer:
      'Your first day will typically involve an induction with your employer. This usually covers company health and safety procedures, an introduction to the team, a tour of the workshop or current job site, an explanation of working hours and expectations, and issue of any company uniform or PPE. You may be paired with an experienced electrician (your mentor or supervisor) who you will shadow for the first weeks or months. Do not expect to do any electrical work on day one — the first day is about orientation, paperwork, and getting to know people. Bring a notepad, wear appropriate workwear (steel-toe boots, work trousers, and a presentable top), arrive 10 minutes early, and ask questions when you do not understand something. First impressions matter, so be polite, enthusiastic, and ready to learn.',
  },
  {
    question: 'What tools do I need to buy as a first-year apprentice?',
    answer:
      'You need a basic hand tool kit to start. Essential tools include: a set of VDE insulated electrician screwdrivers (flat-blade and Phillips, minimum 1000V rated), side cutters (at least 160mm), long-nose pliers (for bending conductors and working in tight spaces), cable strippers (automatic strippers like Jokari or Knipex save time), a sharp knife (Stanley knife or a dedicated cable sheath stripper), a tape measure (5m minimum), a spirit level (small torpedo level), and a voltage indicator pen for basic live/dead indication — though this is not a substitute for a proper two-pole voltage tester which you will need later. A tool belt or tool pouch keeps everything accessible. Budget approximately 150 to 250 pounds for a quality basic kit. Avoid the cheapest tools — they break, they slip, and they make the job harder. JIB-registered employers provide an annual tool allowance that helps offset this cost. Ask your employer before buying — they may have a preferred supplier or provide some tools directly.',
  },
  {
    question: 'How much college work is there in year 1?',
    answer:
      "Year 1 college work covers the Level 2 Diploma in Electrical Installation (C&G 2365-02 or equivalent). This includes units on electrical science (basic principles of electricity, Ohm's law, power calculations), health and safety (legislation, risk assessment, safe working practices), installation technology (cable types, wiring systems, accessories, protective devices), and an introduction to BS 7671 wiring regulations. The college day typically involves a mix of classroom theory and practical workshop sessions. You will have homework and assignments to complete between college days — typically a few hours per week. The Level 2 exams are usually at the end of year 1 or start of year 2, depending on your training provider. Using Elec-Mate flashcards and practice questions alongside your college work accelerates your understanding and helps you retain information more effectively. The Level 2 course content on Elec-Mate covers exactly the same topics you learn at college.",
  },
  {
    question: 'Is it normal to feel overwhelmed in the first few months?',
    answer:
      'Completely normal. Starting an apprenticeship is a big transition — whether you are coming from school, from another job, or from a different career. You are learning a new trade, working in an unfamiliar environment, building relationships with new colleagues, managing the physical demands of site work, and studying alongside working. It would be unusual not to feel overwhelmed at times. The key is to recognise that everyone who has ever qualified as an electrician went through the same experience. The qualified electricians you work with were all first-year apprentices once, and most of them remember how it felt. Talk to your colleagues, your training provider, your friends, or your family if you are struggling. Elec-Mate includes a mental health hub with resources specifically for construction and electrical trade apprentices — because looking after your mental health is just as important as learning to wire a circuit.',
  },
  {
    question: 'What should I do if I make a mistake on site?',
    answer:
      'Tell someone immediately. This is the single most important rule in your first year (and every year after). If you make a mistake — whether it is wiring something incorrectly, damaging a cable, connecting a wrong terminal, or anything else — tell your supervisor or the electrician you are working with straight away. Do not try to hide it, do not try to fix it yourself without telling anyone, and do not hope nobody will notice. Mistakes are how you learn, and every qualified electrician has made mistakes during their training. What separates a good apprentice from a problematic one is not the absence of mistakes — it is the honesty to report them immediately so they can be corrected safely. An unreported wiring error could create a dangerous situation. An immediately reported mistake is simply a learning opportunity. Your supervisor will respect your honesty, correct the error, explain what went wrong, and help you avoid repeating it.',
  },
  {
    question: 'How do I get the most out of my year 1 apprenticeship?',
    answer:
      'Five habits will set you apart as a year 1 apprentice. First, ask questions constantly — every time you see something you do not understand, ask. Qualified electricians generally enjoy explaining their trade to keen apprentices. Second, watch and observe — even when you are not doing hands-on work, watch how experienced electricians approach tasks, plan their work, organise their tools, and solve problems. You learn enormous amounts through observation. Third, keep a site diary from day one — record what you did, what you learned, and what you want to understand better. This builds your portfolio evidence and cements your learning. Fourth, study outside of college hours — use Elec-Mate flashcards on the commute, do a practice quiz in the evening, review BS 7671 at the weekend. Small, consistent study sessions add up to significant knowledge over time. Fifth, look after yourself — eat well, sleep well, stay hydrated on site, and talk to someone if you are struggling. The apprenticeship is a marathon, not a sprint.',
  },
  {
    question: 'Will I be expected to work on live circuits in year 1?',
    answer:
      'No. As a first-year apprentice, you should not be working on or near live electrical circuits. All work should be carried out on isolated (dead) circuits, and you will learn the safe isolation procedure early in your training. BS 7671 Regulation 132.15 states that "live working is not permitted unless it is unreasonable in all circumstances for the conductor to be made dead." In practice, this means virtually all installation work is done on dead circuits. You will observe and learn the safe isolation procedure — the prove-test-prove method using a voltage indicator and proving unit — and this will become one of the most important skills you develop. Your employer has a legal duty to ensure your safety, and no responsible employer would ask a first-year apprentice to work on live circuits. If you are ever asked to do so, refuse and report it to your training provider.',
  },
];

const relatedPages = [
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: 'Pay rates, JIB grades, and how pay increases through your apprenticeship.',
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
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary for Apprentices',
    description: 'How to keep an effective daily log from your very first day.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to the full electrical apprenticeship from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'What the End Point Assessment involves — looking ahead to the finish line.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-do-safe-isolation',
    title: 'Safe Isolation Procedure',
    description: 'The prove-test-prove method you will learn in year 1 — step by step.',
    icon: Shield,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'day-by-day',
    heading: 'What Year 1 Looks Like Day by Day',
    content: (
      <>
        <p>
          A typical week in year 1 of an electrical apprenticeship follows a predictable pattern:
          four days with your employer on site and one day at college with your training provider.
          Some training providers use a day-release model (one day per week), while others use
          block-release (full weeks at college several times per year). Day release is more common
          for electrical apprenticeships.
        </p>
        <p>
          <strong>Employer days (4 days per week):</strong> You arrive on site (or at the workshop)
          at your normal start time — typically 7:30 or 8:00am. In the first weeks and months, you
          will be shadowing an experienced electrician. Your role is to observe, assist, and learn.
          You might hold cable runs in place while they are clipped, pass tools and materials, tidy
          up after work is completed, carry materials from the van, and gradually take on simple
          tasks under supervision — stripping cables, preparing containment, fitting back boxes, and
          making basic terminations.
        </p>
        <p>
          As you gain confidence and demonstrate competence, your responsibilities increase. By the
          second half of year 1, many apprentices are preparing cables, making terminations, fitting
          accessories, and starting to do simple installations with close supervision. The pace of
          this progression depends on your employer, the type of work they do, and how quickly you
          demonstrate safe, competent work.
        </p>
        <p>
          <strong>College day (1 day per week):</strong> Your college day covers the Level 2 Diploma
          in Electrical Installation. Sessions alternate between classroom theory (electrical
          science, health and safety, installation principles, introduction to BS 7671) and
          practical workshops (wiring exercises, basic testing, tool skills). You will have
          assignments to complete and exams to prepare for. College is where you build the
          theoretical foundation that underpins your practical skills on site.
        </p>
        <p>
          <strong>Evenings and weekends:</strong> Your time is your own, but apprentices who spend a
          few hours per week on additional study — flashcards on the commute, a practice quiz in the
          evening, reviewing notes at the weekend — progress noticeably faster than those who only
          study on college days. Elec-Mate makes this extra study efficient and manageable.
        </p>
      </>
    ),
  },
  {
    id: 'what-you-learn',
    heading: 'What You Learn in Year 1',
    content: (
      <>
        <p>
          Year 1 covers the foundations that everything else is built upon. The topics covered at
          college and on site include the following.
        </p>
        <p>
          <strong>Basic installation skills:</strong> Cable preparation (stripping outer sheath,
          stripping conductor insulation, preparing cable ends for termination). Cable termination
          (connecting conductors to terminals in accessories, consumer units, and junction boxes).
          Cable routing and clipping. Containment installation (trunking, conduit, cable tray).
          Fitting back boxes, socket outlets, light switches, and other accessories. These hands-on
          skills are the bread and butter of electrical installation — you will practise them
          hundreds of times over the apprenticeship.
        </p>
        <p>
          <strong>Health and safety:</strong> Site safety fundamentals. The Health and Safety at
          Work Act 1974 and your responsibilities under it. Risk assessment — identifying hazards
          and controlling risks. Personal protective equipment (PPE) — what to wear and when. Manual
          handling — lifting and carrying safely. Working at height — safe use of step ladders and
          platforms. COSHH (Control of Substances Hazardous to Health) — recognising and handling
          hazardous substances. Safe isolation — the prove-test-prove procedure for confirming
          circuits are dead before working on them.
        </p>
        <p>
          <strong>Hand tools:</strong> Correct use of electricians' screwdrivers, side cutters,
          long-nose pliers, cable strippers, saws, files, drills, and measuring tools. Tool
          maintenance and care. Tool safety — using VDE insulated tools when working near electrical
          equipment.
        </p>
        <p>
          <strong>Cable types and sizes:</strong> Twin-and-earth cable (flat profile cables for
          domestic wiring). Flexible cables. Armoured cables. Single-core cables. Cable sizing
          basics — why different circuits use different cable sizes. Cable identification —
          recognising cable types by their construction and markings.
        </p>
        <p>
          <strong>Basic testing concepts:</strong> Introduction to test instruments — what a
          multifunction tester does. Continuity testing — checking that conductors are connected end
          to end. Insulation resistance testing — checking that insulation between conductors is
          intact. Polarity — confirming that line and neutral are correctly connected. You will not
          be carrying out independent testing in year 1, but you will observe and assist with
          testing procedures.
        </p>
        <p>
          <strong>Introduction to BS 7671:</strong> The structure of the Wiring Regulations. Key
          concepts — protection against electric shock, overcurrent protection, earthing. You will
          not need to know BS 7671 in depth in year 1, but you begin building familiarity with the
          document that governs every aspect of electrical installation work.
        </p>
        <SEOAppBridge
          title="Level 2 Courses — Everything You Learn in Year 1"
          description="Elec-Mate's Level 2 courses cover exactly what you learn at college in year 1. Electrical science, health and safety, installation technology, and BS 7671 basics. Plus flashcards, practice questions, and an electrical symbols guide."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'employer-expectations',
    heading: 'What Your Employer Expects from a Year 1 Apprentice',
    content: (
      <>
        <p>
          Understanding what your employer expects helps you succeed from the start. Good employers
          do not expect you to know everything — that is why you are an apprentice. But they do
          expect certain things.
        </p>
        <p>
          <strong>Punctuality:</strong> Arrive on time, every day, without exception. On
          construction sites, work starts at a specific time and lateness disrupts the whole team.
          Set two alarms if you need to. If something genuinely prevents you from arriving on time
          (transport breakdown, illness), call your supervisor before your start time — not after.
        </p>
        <p>
          <strong>Willingness to learn:</strong> Show genuine interest in what is happening around
          you. Ask questions. Watch closely. Take notes. An apprentice who stands around waiting to
          be told what to do frustrates everyone. An apprentice who asks "Can I help?" or "Can you
          show me how that works?" is valued immediately.
        </p>
        <p>
          <strong>Following instructions:</strong> When an electrician tells you to do something a
          specific way, do it that way — even if you think there is a better way. You do not yet
          have the experience to judge. If you genuinely do not understand an instruction, ask for
          clarification rather than guessing.
        </p>
        <p>
          <strong>Tidiness:</strong> Keep your workspace clean and organised. Sweep up cable
          offcuts. Collect packaging. Return tools to the van. A tidy workspace is safer, more
          professional, and shows respect for the site and the people working on it.
        </p>
        <p>
          <strong>Safety awareness:</strong> Take health and safety seriously from day one. Wear
          your PPE. Report hazards. Do not take shortcuts. Your employer has a legal duty to keep
          you safe, but safety is everyone's responsibility. An apprentice who demonstrates strong
          safety awareness from the start earns trust quickly.
        </p>
        <p>
          <strong>Reliability:</strong> Turn up, do the work, do not complain excessively about the
          boring tasks (every apprentice has to carry heavy cables and sweep floors), and gradually
          prove yourself trustworthy. Trust is earned through consistent reliability over time — not
          through one impressive day followed by three unreliable ones.
        </p>
      </>
    ),
  },
  {
    id: 'dealing-with-nerves',
    heading: 'Dealing with First-Day Nerves',
    content: (
      <>
        <p>
          Almost every apprentice is nervous on their first day. This is completely normal and
          nothing to be embarrassed about. You are starting something new, surrounded by experienced
          people who know things you do not, in an environment you are unfamiliar with. Here is how
          to manage it.
        </p>
        <p>
          <strong>Prepare the night before:</strong> Lay out your workwear, pack your tool bag (if
          you have one), prepare your lunch, check your travel route, and set your alarm with plenty
          of margin. Removing practical unknowns reduces anxiety.
        </p>
        <p>
          <strong>Arrive early:</strong> Give yourself 15 minutes before your start time. This
          eliminates the stress of rushing, gives you time to find where you need to be, and shows
          your employer that you are keen.
        </p>
        <p>
          <strong>Ask questions:</strong> Asking questions is not a sign of weakness — it is a sign
          of intelligence. Nobody expects you to know anything on your first day. "Where should I
          put my things?" "What would you like me to do?" "Could you explain what you are doing
          there?" These are all perfectly appropriate first-day questions.
        </p>
        <p>
          <strong>Be yourself:</strong> You do not need to put on an act. Be polite, be honest, and
          be willing. The people you work with will form their opinion of you over weeks and months,
          not based on one day. If you are quiet by nature, that is fine. If you are chatty, that is
          fine too. Authenticity builds better relationships than pretending to be someone you are
          not.
        </p>
        <p>
          <strong>Remember that everyone started somewhere:</strong> The most experienced
          electrician on your team once stood exactly where you are standing now — nervous,
          uncertain, and wondering if they belonged. They got through it, and so will you. Four
          years from now, you will be the experienced one showing a new apprentice the ropes.
        </p>
        <p>
          <strong>If the nerves persist:</strong> If anxiety continues beyond the first few days and
          starts affecting your work or wellbeing, talk to someone — your supervisor, your training
          provider, a family member, or a friend. Elec-Mate's mental health hub includes resources
          specifically for apprentices in the construction and electrical trades, because looking
          after your mental health is not optional — it is essential.
        </p>
      </>
    ),
  },
  {
    id: 'essential-tools',
    heading: 'Essential Tools to Buy',
    content: (
      <>
        <p>
          You need a basic tool kit from the start of your apprenticeship. You do not need to buy
          everything at once — ask your employer what they expect you to provide and what they will
          supply. JIB-registered employers provide an annual tool allowance.
        </p>
        <p>
          <strong>Must-have tools for year 1:</strong>
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">VDE Insulated Screwdrivers</h3>
              <p className="text-white text-sm leading-relaxed">
                A set of flat-blade and Phillips head electricians' screwdrivers rated to 1000V.
                Wera, Wiha, or Knipex are trusted brands. These are your most-used tools — buy
                quality ones that feel comfortable in your hand and will last for years.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Side Cutters (160mm minimum)</h3>
              <p className="text-white text-sm leading-relaxed">
                For cutting cables cleanly. Knipex side cutters are industry standard. The 160mm
                size handles most cables you will encounter in domestic work. VDE insulated versions
                are recommended.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Long-Nose Pliers</h3>
              <p className="text-white text-sm leading-relaxed">
                For bending conductor ends, holding small components, and working in confined
                spaces. Knipex long-nose pliers with VDE insulation are the go-to choice for most
                electricians.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Cable Strippers</h3>
              <p className="text-white text-sm leading-relaxed">
                Automatic cable strippers (like the Jokari range or Knipex self-adjusting strippers)
                make stripping conductor insulation fast and clean without nicking the copper. A
                cable sheath stripper for removing the outer sheath of twin-and-earth cable is also
                useful.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Tape Measure and Spirit Level</h3>
              <p className="text-white text-sm leading-relaxed">
                A 5m tape measure and a small torpedo spirit level. Used for measuring cable runs,
                marking accessory positions, and ensuring accessories are fitted level. These are
                used daily.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <Wrench className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Knife and Tool Pouch</h3>
              <p className="text-white text-sm leading-relaxed">
                A sharp Stanley knife (or dedicated cable knife) for stripping cable sheath. A tool
                belt or pouch to keep your tools accessible while working — saves time and reduces
                the risk of losing tools on site.
              </p>
            </div>
          </div>
        </div>
        <p>
          <strong>Budget:</strong> Expect to spend approximately £150 to £250 on a quality basic
          kit. Avoid the cheapest options — they break easily, slip during use, and make the job
          harder and less safe. Quality tools from Knipex, Wera, Wiha, or CK are an investment in
          your career.
        </p>
        <p>
          <strong>What to add later:</strong> As you progress through the apprenticeship, you will
          add more tools: a multifunction tester (MFT), a voltage indicator and proving unit, a
          drill and accessories, a torque screwdriver, and specialist tools for specific types of
          work. Your employer or training provider will guide you on timing and recommendations.
        </p>
      </>
    ),
  },
  {
    id: 'building-relationships',
    heading: 'Building Relationships with Qualified Electricians',
    content: (
      <>
        <p>
          The electricians you work with in year 1 are your most valuable learning resource. They
          have years of practical experience that no textbook or course can replicate. Building
          strong working relationships with them accelerates your learning and makes your
          apprenticeship more enjoyable.
        </p>
        <p>
          <strong>Show respect for their experience:</strong> Listen when they explain things.
          Follow their instructions. Acknowledge when they correct you. Experienced electricians
          have seen every type of installation, every common mistake, and every regulatory nuance.
          Their knowledge is earned through years of practical work — respect it.
        </p>
        <p>
          <strong>Ask thoughtful questions:</strong> "Why did you use a 6mm cable for that circuit
          instead of 4mm?" is a better question than "What cable is that?" It shows you are
          thinking, not just going through the motions. Most electricians enjoy explaining the
          reasoning behind their decisions to a genuinely interested apprentice.
        </p>
        <p>
          <strong>Be helpful without being asked:</strong> Anticipate what is needed. If the
          electrician you are working with is about to run a cable, have the clips ready. If they
          are finishing a termination, start tidying the offcuts. This awareness develops over time
          but even attempting it from day one shows initiative.
        </p>
        <p>
          <strong>Accept feedback gracefully:</strong> When someone corrects your work, they are
          helping you learn. Do not take it personally, do not argue, and do not make excuses. Say
          "thank you" and try to understand why the correction was necessary. Apprentices who accept
          feedback well get more teaching — electricians invest time in apprentices who are
          receptive.
        </p>
        <p>
          <strong>Be part of the team:</strong> Make tea or coffee when it is your turn. Join in
          conversations at break time. Be friendly and approachable. The social aspect of site work
          matters — electricians who enjoy working with you will teach you more, give you more
          opportunities, and support your progression through the apprenticeship.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes Year 1 Apprentices Make',
    content: (
      <>
        <p>
          Every year 1 apprentice makes mistakes — it is an essential part of learning. But knowing
          the common mistakes in advance helps you avoid some of them and recover more quickly from
          others.
        </p>
        <p>
          <strong>Not asking questions:</strong> The single biggest mistake. Some apprentices stay
          quiet because they are afraid of looking stupid. In reality, not asking questions means
          you stay ignorant longer, make avoidable errors, and miss learning opportunities. The
          qualified electricians around you expect questions from first-year apprentices — that is
          literally what the apprenticeship is for.
        </p>
        <p>
          <strong>Rushing:</strong> Trying to work too fast to impress your employer. Speed comes
          from practice and experience, not from rushing. Rushing leads to poor terminations, wiring
          errors, and safety shortcuts. Work carefully and accurately — your employer would rather
          you take 20 minutes to make a perfect termination than 5 minutes to make a dangerous one.
        </p>
        <p>
          <strong>Not recording learning:</strong> Failing to keep a{' '}
          <SEOInternalLink href="/guides/site-diary-for-apprentices">site diary</SEOInternalLink> or
          track{' '}
          <SEOInternalLink href="/guides/off-the-job-training-hours">
            off-the-job training hours
          </SEOInternalLink>{' '}
          from day one. By the time you realise you need this evidence (usually around year 3 when
          the EPA approaches), years of experience are undocumented. Start recording from your first
          day.
        </p>
        <p>
          <strong>Only studying on college days:</strong> Relying solely on one day per week at
          college for your theoretical learning. The apprentices who progress fastest study a little
          every day — flashcards on the commute, a quick quiz before bed, a review of today's work
          in the evening. Small, consistent study beats cramming.
        </p>
        <p>
          <strong>Comparing yourself to others:</strong> Every apprentice develops at a different
          pace. Some pick up practical skills quickly; others grasp theory faster. Comparing
          yourself to other apprentices and feeling inadequate is counterproductive. Focus on your
          own progress and celebrate your own milestones.
        </p>
        <p>
          <strong>Neglecting self-care:</strong> An apprenticeship is physically and mentally
          demanding. Skipping meals, not sleeping enough, or ignoring signs of stress or anxiety
          affects your work, your learning, and your wellbeing. Take care of yourself — it is not a
          weakness, it is a professional requirement.
        </p>
      </>
    ),
  },
  {
    id: 'study-tips',
    heading: 'Study Tips for Year 1',
    content: (
      <>
        <p>
          Effective study habits in year 1 set the foundation for success throughout your
          apprenticeship. Here are practical tips that work for busy apprentices.
        </p>
        <p>
          <strong>Little and often beats occasional cramming:</strong> Fifteen minutes of flashcard
          review every day is more effective than three hours of cramming before an exam. Your brain
          retains information better when it is reviewed regularly in short sessions. Elec-Mate
          flashcards use spaced repetition — the scientifically optimal method for long-term
          retention.
        </p>
        <p>
          <strong>Link theory to practice:</strong> When you learn something at college, look for it
          on site. When you see something on site, look it up in your course notes or on Elec-Mate.
          "Today I learned about cable sizing calculations at college — tomorrow on site I am going
          to ask my supervisor why they chose 2.5mm for that ring circuit." This connection between
          theory and practice deepens understanding.
        </p>
        <p>
          <strong>Use the electrical symbols guide:</strong> Elec-Mate includes a comprehensive
          electrical symbols guide. Learn the common symbols early — you will see them on drawings,
          circuit diagrams, and test schedules throughout your apprenticeship. Being able to read a
          circuit diagram fluently is a skill that separates confident apprentices from confused
          ones.
        </p>
        <p>
          <strong>Practise with questions:</strong> Do not just read notes — test yourself.
          Elec-Mate has 2,000+ practice questions starting at Level 2. When you get an answer wrong,
          read the explanation carefully and understand why the correct answer is correct. This
          active testing is far more effective than passive reading.
        </p>
        <p>
          <strong>Review your site diary:</strong> At the end of each week, read back through your{' '}
          <SEOInternalLink href="/guides/site-diary-for-apprentices">site diary</SEOInternalLink>{' '}
          entries. Identify things you did not fully understand and make a note to ask about them or
          look them up. This weekly review reinforces your learning and identifies gaps in your
          understanding.
        </p>
        <SEOAppBridge
          title="Start Learning from Day 1 with Elec-Mate"
          description="Level 2 courses, flashcards with spaced repetition, 2,000+ practice questions, electrical symbols guide, site diary, and OJT tracker. Everything a year 1 apprentice needs from a single app. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'elecmate-year-one',
    heading: 'Elec-Mate — Your Companion from Day 1',
    content: (
      <>
        <p>
          Elec-Mate was built for apprentices at every stage of their journey, and the features most
          relevant to year 1 are designed to support you through the transition from complete
          beginner to confident first-year apprentice.
        </p>
        <p>
          <strong>Level 2 courses:</strong> The Level 2 course content covers exactly the same
          topics you learn at college — electrical science, health and safety, installation
          technology, and introduction to BS 7671. Use it to revise, to prepare for college
          sessions, or to fill gaps when you miss a topic at college.
        </p>
        <p>
          <strong>Flashcards with spaced repetition:</strong> Build core knowledge efficiently.
          Flashcards cover key concepts, definitions, regulation numbers, cable sizes, and technical
          facts. The spaced repetition algorithm ensures you review cards at the optimal interval —
          cards you know well appear less often, cards you struggle with appear more often.
          Achievements and streaks keep you motivated.
        </p>
        <p>
          <strong>Site diary:</strong> Record your daily learning with mood tracking, skills
          tracking across 8 categories, and AI coach insights. Start from day 1 and build a
          comprehensive record of your apprenticeship experience that feeds directly into your
          portfolio.
        </p>
        <p>
          <strong>OJT tracker:</strong> Automatically track your{' '}
          <SEOInternalLink href="/guides/off-the-job-training-hours">
            off-the-job training hours
          </SEOInternalLink>{' '}
          against the 400-hour target. On-platform study time is logged automatically. Add
          off-platform activities manually in seconds. Compliance percentage tracked in real time.
        </p>
        <p>
          <strong>Electrical symbols guide:</strong> Learn to read circuit diagrams and wiring
          diagrams with the comprehensive symbols guide. Essential knowledge for interpreting
          drawings on site and in college.
        </p>
        <p>
          <strong>Mental health hub:</strong> The apprenticeship can be tough — physically demanding
          work, study pressure, new environment, and the challenges of growing into a professional
          role. The mental health hub provides resources specifically for construction and
          electrical trade apprentices, including information on stress management, anxiety, and
          where to get support. Because your wellbeing matters as much as your wiring.
        </p>
        <p>
          <strong>Learning videos:</strong> Visual explanations of key concepts and procedures.
          Sometimes watching someone demonstrate a technique is more effective than reading about it
          — especially for hands-on skills like cable preparation and termination.
        </p>
        <SEOAppBridge
          title="Everything You Need for Year 1 — in One App"
          description="Level 2 courses, flashcards, site diary, OJT tracker, electrical symbols, mental health hub, and learning videos. Join 430+ UK apprentices learning with Elec-Mate. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

export default function Year1ApprenticeGuidePage() {
  return (
    <GuideTemplate
      title="Year 1 Electrical Apprentice | What to Expect"
      description="Complete guide for first-year electrical apprentices in the UK. What year 1 looks like day by day, what you learn, employer expectations, dealing with nerves, essential tools, building relationships, common mistakes, and study tips."
      datePublished="2025-11-15"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Calendar}
      heroTitle={
        <>
          Year 1 Electrical Apprentice — <span className="text-yellow-400">What to Expect</span>
        </>
      }
      heroSubtitle="Starting an electrical apprenticeship is one of the best career decisions you can make. But the first year can feel overwhelming — new environment, new skills, new expectations. This guide covers everything you need to know about year 1: what your days look like, what you learn, what your employer expects, and how to make the most of it."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Year 1 Apprenticeships"
      relatedPages={relatedPages}
      ctaHeading="Start your apprenticeship on the right foot"
      ctaSubheading="Join 430+ UK apprentices learning with Elec-Mate from day 1. Level 2 courses, flashcards, site diary, OJT tracker, and mental health support. 7-day free trial, cancel anytime."
    />
  );
}
