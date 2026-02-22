import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'gs-4-2-check1',
    question:
      'In David Kolb&rsquo;s Experiential Learning Cycle, what comes immediately after &ldquo;Reflective Observation&rdquo; (thinking about what happened)?',
    options: [
      'Concrete Experience &mdash; doing the task again immediately',
      'Active Experimentation &mdash; trying a new approach on site',
      'Abstract Conceptualisation &mdash; forming theories and identifying principles from the reflection',
      'Evaluation &mdash; scoring your own performance out of ten',
    ],
    correctIndex: 2,
    explanation:
      'Kolb&rsquo;s Experiential Learning Cycle follows a specific four-stage sequence: Concrete Experience (doing), Reflective Observation (thinking about what happened), Abstract Conceptualisation (forming theories, identifying principles, connecting to existing knowledge), and Active Experimentation (trying a new approach based on those theories). After reflecting on an experience, the learner moves into the conceptualisation stage where they ask &ldquo;Why did this happen?&rdquo; and &ldquo;What is the underlying principle?&rdquo; For example, after reflecting on why an RCD tripped during testing, the electrician would then conceptualise the issue &mdash; perhaps identifying that the earth fault loop impedance was too high because of a deteriorated earth rod, linking this to BS 7671 requirements for maximum Zs values. This conceptualisation then informs the next stage: actively experimenting with a different approach on the next similar job.',
  },
  {
    id: 'gs-4-2-check2',
    question:
      'Donald Sch&ouml;n distinguished between two types of reflective practice. &ldquo;Reflection-in-action&rdquo; refers to:',
    options: [
      'Writing a detailed report after completing a job',
      'Thinking on your feet and adjusting your approach while you are actively doing the work',
      'Reflecting during your annual performance review with your employer',
      'Discussing what went wrong at the end of the working week',
    ],
    correctIndex: 1,
    explanation:
      'Donald Sch&ouml;n&rsquo;s concept of reflection-in-action refers to the ability to think, analyse, and adjust your approach in real time &mdash; while you are in the middle of doing the work. This is distinct from reflection-on-action, which happens after the event. For electricians, reflection-in-action is happening constantly on site: you notice a cable run doesn&rsquo;t look right and pause to reconsider the route; you get an unexpected test reading and immediately start thinking about what might be causing it; you realise your planned method won&rsquo;t work in the space available and adapt on the spot. Experienced electricians do this almost unconsciously &mdash; it becomes an instinctive professional competence. But recognising it as a skill (rather than just &ldquo;common sense&rdquo;) allows you to develop it more deliberately and apply it more consistently.',
  },
  {
    id: 'gs-4-2-check3',
    question: 'In Gibbs&rsquo; Reflective Cycle, the &ldquo;Analysis&rdquo; stage asks:',
    options: [
      '&ldquo;What happened?&rdquo; &mdash; a factual description of the event',
      '&ldquo;How did I feel?&rdquo; &mdash; an exploration of emotions during the experience',
      '&ldquo;What sense can I make of the situation?&rdquo; &mdash; connecting the experience to theory, regulations, or best practice to understand why things happened as they did',
      '&ldquo;What will I do next time?&rdquo; &mdash; creating a specific action plan',
    ],
    correctIndex: 2,
    explanation:
      'Gibbs&rsquo; Reflective Cycle (1988) has six stages: Description (what happened), Feelings (how you felt), Evaluation (what was good and bad), Analysis (making sense of the situation by connecting to theory, knowledge, or best practice), Conclusion (what you have learned), and Action Plan (what you will do differently). The Analysis stage is where deeper learning occurs &mdash; it is the stage where you move beyond &ldquo;what happened&rdquo; and &ldquo;how I felt about it&rdquo; and start asking &ldquo;why did it happen?&rdquo; and &ldquo;what does this connect to?&rdquo; For an electrician, this might mean reviewing GN3 to understand why test readings were unexpected, consulting BS 7671 to confirm whether a particular installation method complies, or discussing the situation with a more experienced colleague to gain their perspective.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I don&rsquo;t have time to keep a reflective journal &mdash; is there a simpler approach?',
    answer:
      'Absolutely. Reflective practice does not require lengthy journal entries or academic essays. The simplest approach is the &ldquo;five-question daily debrief&rdquo; covered in this section &mdash; it takes less than five minutes and can be done mentally during your drive home. Some electricians use the voice notes app on their phone to record a quick 60-second reflection at the end of each day. Others jot three bullet points in a notes app: one thing that went well, one thing that didn&rsquo;t, and one thing they learned. The format doesn&rsquo;t matter &mdash; what matters is the habit of pausing to think about your work rather than simply moving from one job to the next. Even two minutes of intentional reflection per day, sustained over months and years, will compound into significantly greater professional development than zero reflection. Start with whatever format feels manageable and build from there.',
  },
  {
    question:
      'Isn&rsquo;t reflective practice just for academics and teachers? How does it apply to electricians?',
    answer:
      'This is a common misconception. Reflective practice originated in professional education &mdash; particularly medicine, nursing, teaching, and social work &mdash; but the principles apply to any profession where practitioners must make decisions under uncertainty, adapt to novel situations, and continuously develop their expertise. Electricians face all of these conditions daily. Every installation is slightly different. Every fault presents a unique puzzle. Regulations change, technology evolves, and client requirements vary. The electricians who develop most effectively are those who actively think about their work &mdash; not just those who accumulate years of experience. Donald Sch&ouml;n&rsquo;s research specifically studied professionals in technical and practical fields, and he found that the best practitioners were those who reflected on their practice rather than relying purely on routine. In the UK electrical industry, the IET&rsquo;s continuing professional development (CPD) framework explicitly encourages reflective practice as part of professional growth.',
  },
  {
    question: 'How do I learn from mistakes without losing confidence or dwelling on them?',
    answer:
      'The key is to separate your identity from your performance. A mistake is something that happened, not something you are. When you make an error &mdash; misreading a schematic, forgetting to isolate a circuit, miscalculating a cable size &mdash; the growth-oriented response is to treat it as data: what specifically went wrong, why did it happen, and what will you do differently next time? This is the &ldquo;analyse and extract the lesson&rdquo; approach. Dwelling happens when you personalise the mistake (&ldquo;I&rsquo;m useless&rdquo;, &ldquo;I always get this wrong&rdquo;) rather than examining it objectively (&ldquo;I skipped a step in the testing sequence because I was rushing &mdash; I need to slow down and follow the checklist&rdquo;). The Gibbs Reflective Cycle is helpful here because it guides you through the reflection systematically, ending with a specific action plan rather than a vague feeling of failure. Once you have extracted the lesson and made your action plan, deliberately close the reflection. You have learned what you need to learn &mdash; continuing to replay the mistake serves no purpose.',
  },
  {
    question:
      'What is the difference between &ldquo;deliberate practice&rdquo; and just doing the same work every day?',
    answer:
      'Anders Ericsson&rsquo;s research on expertise makes a crucial distinction between &ldquo;na&iuml;ve practice&rdquo; (mindless repetition) and &ldquo;deliberate practice&rdquo; (focused, intentional effort to improve specific aspects of performance). An electrician who installs consumer units every day for ten years is not automatically better than one who has done it for three years &mdash; if the ten-year electrician is simply repeating the same routine without ever pushing beyond their current ability. Deliberate practice has four key components: (1) it targets a specific area of weakness or a skill just beyond your current level; (2) it involves full concentration and effort, not autopilot repetition; (3) it includes immediate, accurate feedback (either from a mentor, from test results, or from self-assessment); and (4) it requires reflection and adjustment based on that feedback. For electricians, deliberate practice might mean intentionally taking on a type of work you find challenging (such as three-phase boards if you usually do single-phase), asking an experienced colleague to observe and critique your technique, or studying a specific regulation in depth rather than just looking up what you need for the current job.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'David Kolb&rsquo;s Experiential Learning Cycle consists of four stages. Which of the following correctly lists all four stages in the correct order?',
    options: [
      'Planning, Doing, Reviewing, Concluding',
      'Concrete Experience, Reflective Observation, Abstract Conceptualisation, Active Experimentation',
      'Experience, Analysis, Theory, Application',
      'Observation, Hypothesis, Experiment, Conclusion',
    ],
    correctAnswer: 1,
    explanation:
      'Kolb&rsquo;s Experiential Learning Cycle (1984) consists of four specific stages: Concrete Experience (having a direct, hands-on experience), Reflective Observation (thinking about and observing what happened during the experience), Abstract Conceptualisation (forming theories, identifying principles, and connecting the experience to existing knowledge and frameworks), and Active Experimentation (testing the new understanding by trying a different approach in a real situation). The cycle is continuous &mdash; the Active Experimentation stage creates a new Concrete Experience, which begins the cycle again. Kolb argued that effective learning requires engagement with all four stages. Many electricians are strong in the Concrete Experience and Active Experimentation stages (doing and trying) but weaker in Reflective Observation and Abstract Conceptualisation (thinking about why and connecting to theory). Developing all four stages leads to deeper, more transferable learning.',
  },
  {
    id: 2,
    question:
      'An electrician finishes a complex fault-finding job and drives home thinking &ldquo;I spent too long on that fault because I started by checking the wrong things &mdash; next time I should test the supply first before investigating downstream.&rdquo; According to Donald Sch&ouml;n, this is an example of:',
    options: [
      'Reflection-in-action &mdash; thinking on your feet during the work',
      'Reflection-on-action &mdash; reviewing and learning after the event',
      'Abstract Conceptualisation &mdash; forming a theory about fault finding',
      'Metacognition &mdash; thinking about thinking in general',
    ],
    correctAnswer: 1,
    explanation:
      'This is a clear example of reflection-on-action as defined by Donald Sch&ouml;n. The electrician has completed the work (the action is over) and is now reviewing what happened, evaluating their approach, identifying what went wrong (starting with downstream checks rather than verifying the supply first), and forming a plan for improvement (test the supply first next time). Reflection-on-action happens after the event and involves deliberate, conscious review. By contrast, reflection-in-action would have been the electrician pausing mid-job and thinking &ldquo;Wait, I should check the supply first before going further downstream&rdquo; &mdash; adjusting their approach in real time. Both types of reflection are valuable. Reflection-on-action builds long-term professional knowledge; reflection-in-action allows you to respond adaptively in the moment.',
  },
  {
    id: 3,
    question:
      'Gibbs&rsquo; Reflective Cycle (1988) has six stages. Which stage specifically asks you to consider your emotional response to the experience?',
    options: ['Description', 'Feelings', 'Evaluation', 'Analysis'],
    correctAnswer: 1,
    explanation:
      'The &ldquo;Feelings&rdquo; stage of Gibbs&rsquo; Reflective Cycle specifically focuses on the emotional and affective dimension of the experience. It asks: How did you feel before, during, and after the event? What were you thinking at the time? What emotions did you experience? While this might seem unusual in a trade context, feelings significantly influence professional behaviour. An electrician who felt anxious during a complex EICR may have rushed certain tests or avoided thorough inspection of difficult-to-access areas. An apprentice who felt embarrassed after being corrected by a supervisor might avoid asking questions in future, hindering their learning. Acknowledging feelings is not about indulging them &mdash; it is about understanding how emotional responses affect professional performance and decision-making. The Feelings stage ensures that emotional factors are examined rather than ignored, leading to more complete and honest reflection.',
  },
  {
    id: 4,
    question:
      'The &ldquo;daily debrief&rdquo; habit involves asking yourself five questions at the end of every working day. Which of the following is NOT one of the recommended five questions?',
    options: [
      'What went well today?',
      'What didn&rsquo;t go as planned?',
      'Who is to blame for the problems today?',
      'What&rsquo;s my priority tomorrow?',
    ],
    correctAnswer: 2,
    explanation:
      'The five daily debrief questions are: (1) What went well today? (2) What didn&rsquo;t go as planned? (3) What did I learn? (4) What would I do differently? (5) What&rsquo;s my priority tomorrow? The question &ldquo;Who is to blame for the problems today?&rdquo; is deliberately not included because blame-focused thinking is counterproductive to reflective practice. Reflective practice focuses on learning and improvement, not on assigning fault. When things go wrong, the growth-oriented question is &ldquo;What can I learn from this?&rdquo; and &ldquo;What would I do differently?&rdquo; rather than &ldquo;Whose fault was it?&rdquo; Blame creates defensiveness and discourages honest self-examination. The daily debrief is a brief, non-judgmental review that helps you extract lessons from every working day &mdash; both the successes and the setbacks &mdash; and carry them forward into improved future performance.',
  },
  {
    id: 5,
    question:
      'Anders Ericsson&rsquo;s research on deliberate practice found that the key difference between experts and non-experts is NOT:',
    options: [
      'The total number of hours spent practising',
      'Innate natural talent that cannot be developed',
      'The quality, focus, and intentionality of their practice',
      'Whether they receive feedback and adjust their approach',
    ],
    correctAnswer: 1,
    explanation:
      'Ericsson&rsquo;s research challenged the assumption that expertise is primarily the result of innate talent. His studies across multiple domains (music, chess, sport, medicine) found that what distinguishes experts from competent practitioners is not natural ability but the nature of their practice. Experts engage in &ldquo;deliberate practice&rdquo; &mdash; focused, intentional effort on specific aspects of performance that are just beyond their current ability, combined with immediate feedback and continuous adjustment. Non-experts tend to reach a &ldquo;good enough&rdquo; level and then plateau, repeating comfortable routines without pushing themselves. While total hours of practice matter (Ericsson&rsquo;s work was the basis for Malcolm Gladwell&rsquo;s popular &ldquo;10,000 hours&rdquo; claim), hours alone are insufficient &mdash; it is the quality and intentionality of those hours that determines whether true expertise develops. For electricians, this means that 20 years of routine domestic installations does not automatically create expertise; but 5 years of varied, challenging work with deliberate reflection and skill development can create outstanding competence.',
  },
  {
    id: 6,
    question:
      'An apprentice notices that their cable terminations keep failing pull tests. A deliberate practice approach would involve:',
    options: [
      'Repeating the same technique more times until it works through sheer repetition',
      'Asking a colleague to do the terminations instead, since the apprentice is clearly not suited to the task',
      'Identifying the specific fault in their technique (with feedback from a supervisor), practising the corrected technique with full concentration, and checking each termination to verify improvement',
      'Moving on to a different task and coming back to terminations when they feel more confident',
    ],
    correctAnswer: 2,
    explanation:
      'Option C describes the deliberate practice approach: (1) identifying the specific weakness (what exactly is wrong with the termination technique?), (2) getting expert feedback (a supervisor or experienced electrician observes and identifies the fault), (3) practising the corrected technique with full concentration (not on autopilot, but with deliberate focus on the specific correction), and (4) checking each result to verify that the corrected technique is producing better outcomes. This is fundamentally different from Option A (na&iuml;ve practice &mdash; mindless repetition of the same incorrect technique), Option B (fixed mindset avoidance), and Option D (postponement without improvement). Deliberate practice requires that you confront weaknesses directly, seek accurate feedback, and practise with intentional focus on improvement. It is not comfortable &mdash; it requires sustained effort at the edge of your ability &mdash; but it is the most effective path to genuine skill development.',
  },
  {
    id: 7,
    question:
      'A qualified electrician keeps a professional development journal where they record key learnings from each week. According to the principles of reflective practice, the PRIMARY benefit of this habit is:',
    options: [
      'It satisfies CPD requirements for professional registration',
      'It provides evidence in case of legal disputes about workmanship',
      'It transforms experience into conscious, transferable learning by forcing you to articulate what you know and what you need to develop',
      'It impresses clients and employers during job interviews',
    ],
    correctAnswer: 2,
    explanation:
      'The primary benefit of a reflective journal is that it converts raw experience into structured learning. Without reflection, experience is just &ldquo;stuff that happened&rdquo; &mdash; you may learn from it unconsciously, but much of the potential learning is lost. The act of writing (or recording, or even just deliberately thinking about) what you learned forces you to articulate your knowledge, identify gaps, connect new learning to existing understanding, and create explicit goals for future development. This is the essence of the Abstract Conceptualisation stage in Kolb&rsquo;s cycle &mdash; moving from &ldquo;I did a thing&rdquo; to &ldquo;I understand why it worked or didn&rsquo;t, and I know what to do differently next time.&rdquo; While a journal can also support CPD records and provide useful documentation, these are secondary benefits. The core purpose is to make learning intentional rather than accidental.',
  },
  {
    id: 8,
    question:
      'An experienced electrician mentors a second-year apprentice. When the apprentice makes a wiring error on a lighting circuit, the most effective reflective learning approach for the mentor to use is:',
    options: [
      'Fix the error themselves and move on to save time',
      'Point out the error, explain the correct method, and then ask the apprentice to describe what went wrong and what they will do differently &mdash; encouraging reflection-on-action',
      'Shout at the apprentice to ensure they remember not to make the same mistake',
      'Ignore the error and let the apprentice discover it during testing',
    ],
    correctAnswer: 1,
    explanation:
      'Option B demonstrates the reflective mentoring approach. The mentor first ensures the apprentice understands the error and the correct method (direct instruction), but then goes further by asking the apprentice to reflect on what happened and articulate what they will do differently in future (guided reflection-on-action). This approach has several advantages over the alternatives: it gives the apprentice ownership of the learning rather than making them a passive recipient of correction; it develops their reflective capacity so they can learn independently in future; it creates a specific, memorable learning experience that is more likely to be retained than a simple instruction. Option A (fix it and move on) misses the learning opportunity entirely. Option C (shouting) creates fear and defensiveness, which inhibit learning. Option D (let them discover it during testing) risks safety issues and also misses the chance for guided reflection while the experience is fresh.',
  },
];

export default function GSModule4Section2() {
  useSEO({
    title: 'Reflective Practice & Learning from Experience | Goal Setting & Growth Module 4.2',
    description:
      'Kolb&rsquo;s Experiential Learning Cycle, Sch&ouml;n&rsquo;s reflection-in-action and reflection-on-action, Gibbs&rsquo; Reflective Cycle, daily debrief habits, and deliberate practice for electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reflective Practice &amp; Learning from Experience
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Kolb&rsquo;s Experiential Learning Cycle, Sch&ouml;n&rsquo;s reflection-in-action,
            Gibbs&rsquo; Reflective Cycle, the daily debrief habit, and Anders Ericsson&rsquo;s
            deliberate practice &mdash; applied to the electrical trades
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Experiential learning:</strong> You learn most effectively by doing,
                reflecting, theorising, and then trying again
              </li>
              <li>
                <strong>Reflection-in-action:</strong> Thinking on your feet while working &mdash;
                adjusting in real time
              </li>
              <li>
                <strong>Reflection-on-action:</strong> Reviewing after the job &mdash; what would
                you do differently?
              </li>
              <li>
                <strong>Deliberate practice:</strong> Focused, intentional effort to push beyond
                your current ability &mdash; not mindless repetition
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Experience alone is not enough:</strong> 20 years of unexamined experience
                is just one year repeated 20 times
              </li>
              <li>
                <strong>Learning from mistakes:</strong> Reflective practice turns errors into
                growth opportunities
              </li>
              <li>
                <strong>Faster skill development:</strong> Deliberate reflection accelerates the
                journey from competent to expert
              </li>
              <li>
                <strong>Professional credibility:</strong> Electricians who reflect on their
                practice deliver better, safer work
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe all four stages of Kolb&rsquo;s Experiential Learning Cycle and explain how they apply to electrical work',
              'Distinguish between Sch&ouml;n&rsquo;s reflection-in-action and reflection-on-action with trade-specific examples',
              'Apply Gibbs&rsquo; Reflective Cycle to a realistic electrical scenario',
              'Implement the daily debrief habit using five structured reflection questions',
              'Explain the difference between na&iuml;ve practice and deliberate practice according to Anders Ericsson&rsquo;s research',
              'Identify strategies for learning from mistakes, mentors, and professional development journals',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Kolb's Experiential Learning Cycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            David Kolb&rsquo;s Experiential Learning Cycle
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                David Kolb, an American educational theorist, published his Experiential Learning
                Theory in 1984, building on the earlier work of John Dewey, Kurt Lewin, and Jean
                Piaget. His central argument was that learning is not simply the absorption of
                information &mdash; it is a process grounded in experience. Kolb proposed that
                effective learning follows a four-stage cycle, and that genuine understanding
                requires engagement with all four stages. The cycle is continuous: each complete
                rotation deepens knowledge and skill, and each new experience feeds back into the
                cycle.
              </p>

              <p>
                For electricians and tradespeople, Kolb&rsquo;s model is particularly relevant
                because the trades are fundamentally experiential. You learn by doing. But
                Kolb&rsquo;s insight is that doing alone is not sufficient &mdash; you must also
                reflect on the experience, extract principles from it, and deliberately apply those
                principles in future work. An electrician who installs consumer units for ten years
                without ever reflecting on their process, questioning their methods, or deliberately
                trying to improve is not truly learning from experience. They are simply repeating.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Stage 1: Concrete Experience &mdash; Doing the Job
              </h3>

              <p>
                The first stage of the cycle is having a direct, hands-on experience. For
                electricians, this is the most natural stage &mdash; it is the work itself.
                Installing a distribution board. Running a cable. Testing an installation.
                Fault-finding on a control panel. Conducting an EICR on a 1970s domestic property.
                Wiring a commercial lighting system. Commissioning an EV charger. Every day on site
                provides concrete experiences that form the raw material for learning.
              </p>

              <p>
                The key characteristic of the Concrete Experience stage is that it is direct and
                personal. You are not reading about how to do something or watching someone else do
                it &mdash; you are doing it yourself, with all the sensory, physical, and cognitive
                engagement that entails. You feel the resistance of a cable being pulled through
                conduit. You hear the click of a circuit breaker engaging. You see the multimeter
                reading that doesn&rsquo;t match your expectation. These direct sensory experiences
                create vivid, memorable learning moments that abstract instruction alone cannot
                replicate.
              </p>

              <p>
                However &mdash; and this is Kolb&rsquo;s critical insight &mdash; having the
                experience is only the starting point. Without the subsequent stages of reflection,
                conceptualisation, and experimentation, the experience may be forgotten,
                misunderstood, or never fully processed into usable knowledge. Many electricians
                have had the experience of repeating the same mistake because they never paused to
                reflect on why it happened the first time.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Stage 2: Reflective Observation &mdash; Thinking About What Happened
              </h3>

              <p>
                The second stage is stepping back from the experience and thinking about what
                happened. This is where you move from &ldquo;doing&rdquo; to
                &ldquo;reviewing&rdquo;. What went well? What didn&rsquo;t go as planned? What
                surprised you? What confused you? What readings were unexpected? Where did you
                struggle? Where did you feel confident? What would an experienced observer have
                noticed about your approach?
              </p>

              <p>
                Reflective Observation requires honest self-assessment. It is tempting to skip this
                stage or to perform it superficially (&ldquo;Yeah, it went fine&rdquo;). But genuine
                reflection means examining the experience with curiosity rather than judgement. It
                is not about criticising yourself &mdash; it is about understanding what actually
                happened. An electrician reflecting on a fault-finding job might think: &ldquo;I
                found the fault eventually, but it took me two hours. I started by checking the
                obvious things, which was right, but then I wasted time testing components
                downstream when the issue was at the supply end. I should have worked more
                systematically from the source.&rdquo;
              </p>

              <p>
                This stage is where many tradespeople are weakest. The pressure of the working day
                &mdash; deadlines, multiple jobs, client expectations &mdash; often means that once
                a job is finished, you move straight on to the next one. There is no pause for
                reflection. The experience happens, but the learning opportunity is lost.
                Kolb&rsquo;s model suggests that even a few minutes of deliberate reflection after a
                significant experience can dramatically increase the learning value of that
                experience.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Stage 3: Abstract Conceptualisation &mdash; Forming Theories and Principles
              </h3>

              <p>
                The third stage moves from &ldquo;what happened&rdquo; to &ldquo;why did it
                happen?&rdquo; and &ldquo;what is the underlying principle?&rdquo; This is where you
                connect your reflection to theory, regulations, best practice, or general
                principles. You are not just noting what happened &mdash; you are trying to
                understand the cause, the mechanism, and the transferable lesson.
              </p>

              <p>
                For electricians, Abstract Conceptualisation might look like: &ldquo;The Zs reading
                on circuit 7 was higher than expected. Reflecting on why, I think the issue is the
                length of the circuit &mdash; it is a long run to the garage. Looking at Table 41.6
                in BS 7671, the maximum Zs for a B32 MCB is 1.37&ohm;. My reading was 1.28&ohm;,
                which is within limits but close. The principle here is that long cable runs
                increase earth fault loop impedance, and I need to check Zs readings carefully on
                any circuit with a long run, even if the cable size seems adequate for
                current-carrying capacity.&rdquo;
              </p>

              <p>
                This stage is where shallow experience becomes deep understanding. An electrician
                who simply notes &ldquo;the Zs was high&rdquo; has observed a fact. An electrician
                who understands why the Zs was high, connects it to the regulation, and identifies
                the general principle (long runs increase impedance) has created transferable
                knowledge that they can apply to every future job. The conceptualisation stage
                transforms individual experiences into professional expertise.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Stage 4: Active Experimentation &mdash; Trying a New Approach
              </h3>

              <p>
                The fourth and final stage of the cycle is putting your new understanding into
                practice. Based on your reflection and conceptualisation, you deliberately try a
                different approach next time. This is not passive &mdash; it is active, intentional
                experimentation. You are testing your theory in the real world.
              </p>

              <p>
                Continuing the example above, Active Experimentation might look like: &ldquo;On my
                next job with a long cable run, I will calculate the expected Zs before testing,
                using the R1+R2 values from the On-Site Guide tables. I will also consider whether a
                larger cable CSA is needed to reduce impedance, even if the current-carrying
                capacity of the smaller cable would have been sufficient. And I will flag long runs
                to the designer at the design stage, before the cable is installed.&rdquo;
              </p>

              <p>
                The Active Experimentation stage creates a new Concrete Experience, which begins the
                cycle again. Perhaps the new approach works perfectly, confirming the theory.
                Perhaps it reveals a new issue that requires further reflection. Either way, the
                cycle continues, and each rotation deepens competence. This is how experiential
                learning compounds over time &mdash; each experience builds on the last, and each
                reflection adds to a growing body of professional knowledge.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why Electricians Are Natural Experiential Learners
                </p>
                <p className="text-base text-white leading-relaxed">
                  The electrical trades are built on learning by doing. From the first day of an
                  apprenticeship, you are on site, using tools, handling materials, and making
                  things work. You cannot learn to wire a consumer unit from a textbook alone
                  &mdash; you need the concrete experience of stripping cables, terminating
                  connections, and testing the result. But Kolb&rsquo;s model reveals why some
                  electricians develop much faster than others despite having similar amounts of
                  site experience: the fast developers are the ones who naturally engage in all four
                  stages of the cycle. They don&rsquo;t just do the work &mdash; they think about
                  it, question it, connect it to theory, and deliberately experiment with
                  improvements. The great news is that this is a learnable skill, not a personality
                  trait. Any electrician can develop their reflective and conceptual capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Schön's Reflective Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Donald Sch&ouml;n&rsquo;s Two Types of Reflection
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Donald Sch&ouml;n (1930&ndash;1997) was an American philosopher and professor at MIT
                who studied how professionals think and learn in practice. His 1983 book{' '}
                <em>The Reflective Practitioner: How Professionals Think in Action</em> introduced a
                distinction that is fundamental to understanding professional development: the
                difference between <strong>reflection-in-action</strong> and{' '}
                <strong>reflection-on-action</strong>.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Reflection-in-Action: Thinking on Your Feet
              </h3>

              <p>
                Reflection-in-action is the ability to think, analyse, and adjust your approach
                while you are in the middle of doing the work. It is real-time, in-the-moment
                professional thinking. Sch&ouml;n described it as a conversation with the situation
                &mdash; you act, the situation responds, and you adjust.
              </p>

              <p>
                Electricians engage in reflection-in-action constantly, often without realising they
                are doing it. You are running a cable through a ceiling void and you notice the
                route is obstructed by a joist &mdash; you pause, reassess, and find an alternative
                path. You are testing a circuit and the reading is not what you expected &mdash; you
                stop, think about what could cause that reading, and decide to check the connections
                at the nearest accessory. You are installing a socket and you notice the plaster is
                crumbling around the back box &mdash; you adapt your approach, perhaps deciding to
                use a different fixing method. All of these are examples of reflection-in-action:
                you are thinking critically about the work while you are doing it.
              </p>

              <p>
                What makes reflection-in-action particularly powerful is that it allows you to
                respond to the unexpected. Real-world electrical work is full of surprises:
                unexpected cable routes, deteriorated insulation, non-standard previous
                installations, asbestos discoveries, readings that don&rsquo;t match the expected
                values. An electrician who can only follow a predetermined plan will struggle when
                the plan meets reality. An electrician who can reflect-in-action &mdash; who can
                think on their feet, diagnose problems in real time, and adapt their approach
                &mdash; is a far more effective and safer practitioner.
              </p>

              <p>
                Reflection-in-action develops with experience. An apprentice in their first year
                will often follow instructions step by step, with limited capacity to deviate when
                things don&rsquo;t go as expected. By their third or fourth year, they will have
                developed a repertoire of strategies and a growing ability to &ldquo;read&rdquo; the
                situation and adjust. Experienced electricians with decades of practice often
                reflect-in-action almost unconsciously &mdash; they have internalised so many
                patterns and principles that their real-time adjustments feel instinctive. But
                Sch&ouml;n&rsquo;s insight is that this &ldquo;instinct&rdquo; is actually
                sophisticated professional thinking happening at speed.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Reflection-on-Action: Reviewing After the Job
              </h3>

              <p>
                Reflection-on-action, by contrast, happens after the event. It is deliberate,
                conscious review of a completed experience. What happened? What went well? What went
                poorly? What surprised me? What would I do differently next time? What have I
                learned that I can apply to future work?
              </p>

              <p>
                Reflection-on-action is typically more structured and thorough than
                reflection-in-action. During the work, you are under time pressure and cognitive
                load &mdash; there is a limit to how deeply you can reflect while simultaneously
                performing the task. After the work, you can take time to think more carefully,
                consult references, discuss with colleagues, and form a more complete understanding
                of what happened.
              </p>

              <p>
                An electrician who has just completed a complex EICR on a large commercial property
                might engage in reflection-on-action by thinking: &ldquo;That took longer than I
                estimated. I underestimated the number of circuits and the complexity of the
                distribution. I also struggled with the Zs readings on the final radial circuit
                &mdash; I need to review the maximum values in the On-Site Guide. Next time I take
                on a commercial EICR of this size, I will request the schematic drawings in advance
                and allocate an extra half-day for testing.&rdquo;
              </p>

              <p>
                The challenge with reflection-on-action is finding the time and motivation to do it.
                After a long day on site, the natural tendency is to pack up your tools and go home.
                But even five minutes of deliberate reflection &mdash; on the drive home, over a cup
                of tea, or while writing up your notes &mdash; can capture learning that would
                otherwise be lost. The daily debrief habit (covered later in this section) is a
                practical tool for making reflection-on-action a consistent part of your working
                routine.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Reflection-in-Action vs Reflection-on-Action: Trade Examples
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>In-action:</strong> Mid-installation, you notice a cable route clashes
                      with a water pipe. You pause, reconsider the route, and reroute the cable to
                      maintain the required separation distances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>On-action:</strong> After finishing the job, you think: &ldquo;I
                      should have checked the pipe routes before starting the first fix. Next time
                      I&rsquo;ll do a full survey of existing services before committing to cable
                      routes.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>In-action:</strong> During testing, an RCD does not trip at the
                      expected current. You immediately suspect a wiring fault and begin checking
                      the connections at the consumer unit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>On-action:</strong> Later, you reflect: &ldquo;That RCD issue was
                      caused by a borrowed neutral. I&rsquo;ve seen this before on rewires of older
                      properties. I need to be more vigilant about neutral identification on these
                      jobs.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Gibbs' Reflective Cycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Gibbs&rsquo; Reflective Cycle &mdash; A Structured Framework
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Graham Gibbs published his Reflective Cycle in 1988 as a practical framework for
                structured reflection. Unlike Kolb&rsquo;s broader model of experiential learning,
                Gibbs provides a specific, step-by-step process that guides you through a complete
                reflection on a single experience. The cycle has six stages, each with a guiding
                question, and it is designed to ensure that reflection is thorough, honest, and
                action-oriented.
              </p>

              <p>
                Gibbs&rsquo; Reflective Cycle is widely used in healthcare, education, and
                professional development because it is simple to understand, easy to apply, and
                effective at turning experience into learning. For electricians, it provides a
                structured way to process significant work experiences &mdash; particularly those
                that involved difficulty, uncertainty, error, or notable success.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                The Six Stages Applied to an Electrical Scenario
              </h3>

              <p>
                To demonstrate how Gibbs&rsquo; Reflective Cycle works in practice, let us walk
                through a realistic electrical scenario using all six stages.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Stage 1: Description &mdash; &ldquo;What happened?&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  &ldquo;I was conducting an EICR on a 1970s domestic property. The property had a
                  mixture of original and more recent wiring. When I tested the earth fault loop
                  impedance on the upstairs lighting circuit, the Zs reading was 3.42&ohm;. I
                  wasn&rsquo;t immediately sure whether this was within acceptable limits for the
                  protective device (a B6 MCB). I completed the rest of the testing and noted the
                  reading on the schedule, but I felt uncertain about whether to code the circuit as
                  C2 (potentially dangerous) or C3 (improvement recommended). I coded it C3 and
                  moved on, but I wasn&rsquo;t confident in my decision.&rdquo;
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-amber-400 mb-2">
                  Stage 2: Feelings &mdash; &ldquo;How did I feel?&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  &ldquo;I felt uncertain and a bit anxious. I know that Zs values need to be within
                  the limits specified in BS 7671, but I couldn&rsquo;t remember the exact maximum
                  value for a B6 MCB off the top of my head. I felt embarrassed that I had to pause
                  and look it up &mdash; I thought I should know this by now. I also felt pressure
                  to complete the EICR within the time I had quoted to the client, which made me
                  want to move on quickly rather than spending time researching the issue
                  thoroughly. After I left the property, I felt a nagging doubt about whether I had
                  made the right coding decision.&rdquo;
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-green-400 mb-2">
                  Stage 3: Evaluation &mdash; &ldquo;What was good and bad?&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  &ldquo;On the positive side, I noticed that the reading was higher than expected
                  and didn&rsquo;t simply ignore it. I recorded it accurately on the schedule. I
                  also completed the rest of the EICR to a good standard. On the negative side, I
                  wasn&rsquo;t confident enough in my knowledge of maximum Zs values to make a
                  quick, informed decision. I felt time pressure influencing my professional
                  judgement, which is not acceptable &mdash; coding decisions should be based on
                  technical assessment, not on how much time I have left. I also didn&rsquo;t take
                  the time to fully investigate the cause of the high reading.&rdquo;
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-blue-400 mb-2">
                  Stage 4: Analysis &mdash; &ldquo;What sense can I make of this?&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  &ldquo;Looking at GN3 (Guidance Note 3: Inspection &amp; Testing) and Table 41.3
                  of BS 7671, the maximum Zs for a B6 MCB at 0.4s disconnection time is 7.28&ohm;.
                  So my reading of 3.42&ohm; was well within limits &mdash; my anxiety was
                  unfounded. However, the reading was still higher than I would expect for a
                  domestic lighting circuit, which suggests there may be a long cable run,
                  deteriorating connections, or a high external earth fault loop impedance (Ze) on
                  the supply. The underlying issue was my lack of instant recall of the Zs limits
                  &mdash; I should have these values either memorised or immediately accessible (on
                  my phone or in a quick-reference card in my test bag). The time pressure issue is
                  also significant: I have been underquoting EICRs and then feeling rushed, which
                  affects the quality of my professional judgement.&rdquo;
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  Stage 5: Conclusion &mdash; &ldquo;What have I learned?&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  &ldquo;I need to improve my working knowledge of maximum Zs values for common
                  protective devices. I shouldn&rsquo;t have to pause and look these up during an
                  EICR &mdash; they should be second nature, or at least instantly accessible in a
                  reference card. I also need to address my EICR quoting &mdash; I am consistently
                  underestimating the time needed for older properties with mixed wiring, which
                  creates artificial time pressure. Finally, I need to be more willing to
                  investigate unexpected readings rather than simply recording them and moving on.
                  The high Zs reading might have been within limits, but investigating the cause
                  could have revealed a deteriorating connection that was worth reporting.&rdquo;
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Stage 6: Action Plan &mdash; &ldquo;What will I do differently?&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  &ldquo;I will create a laminated quick-reference card with maximum Zs values for
                  all common MCB types and ratings (B, C, and D types from 6A to 63A) and keep it in
                  my test bag. I will revise my EICR pricing for pre-1980s properties, adding an
                  extra hour for investigation of aged wiring. I will book onto the 2391 refresher
                  course next quarter to rebuild my confidence with coding decisions. And I will
                  make it a rule to investigate any Zs reading that is more than 50% of the maximum
                  value, even if it is technically within limits, to check for deteriorating
                  connections or other developing faults.&rdquo;
                </p>
              </div>

              <p>
                This worked example shows how Gibbs&rsquo; Reflective Cycle transforms what might
                have been a quickly forgotten experience into a structured learning event with
                specific, actionable outcomes. Without the cycle, the electrician might have simply
                thought &ldquo;that was a bit tricky&rdquo; and moved on. With the cycle, they have
                identified knowledge gaps, recognised a pattern of problematic behaviour
                (underquoting), and created concrete steps for improvement.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Daily Debrief Habit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Daily Debrief Habit
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While Gibbs&rsquo; Reflective Cycle is ideal for processing significant experiences,
                it is too detailed for daily use. Most working days don&rsquo;t involve dramatic
                events worthy of a six-stage reflective analysis. But learning happens in the
                accumulation of small insights, not just in major revelations. What you need is a
                simple, lightweight daily practice that captures learning from ordinary working days
                without requiring significant time or effort.
              </p>

              <p>
                The daily debrief is a habit of asking yourself five questions at the end of every
                working day. It takes less than five minutes. You can do it in your head during the
                drive home, speak it into a voice notes app, or jot it down in a notebook or notes
                app. The format does not matter &mdash; the consistency does.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Five Daily Debrief Questions
                </p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">1.</span>
                    <span>
                      <strong>What went well today?</strong> Start with the positive. Recognise what
                      you did competently, efficiently, or skilfully. This builds confidence and
                      reinforces good practice. Did you complete a task faster than expected? Did a
                      test go smoothly? Did you solve a problem that initially seemed difficult?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">2.</span>
                    <span>
                      <strong>What didn&rsquo;t go as planned?</strong> Honest acknowledgement of
                      setbacks, mistakes, or surprises. Not blame, not criticism &mdash; just
                      factual recognition. The cable route didn&rsquo;t work as expected. The job
                      took longer than quoted. A test reading was unexpected. You forgot a piece of
                      equipment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">3.</span>
                    <span>
                      <strong>What did I learn?</strong> Even on routine days, you learn something.
                      Perhaps you discovered a more efficient way to route cables. Perhaps you
                      learned something about a particular product or fitting. Perhaps you realised
                      you need to revise a regulation you had forgotten. The act of asking
                      &ldquo;what did I learn?&rdquo; forces you to notice learning that you might
                      otherwise overlook.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">4.</span>
                    <span>
                      <strong>What would I do differently?</strong> This is the growth question. It
                      transforms observations into future improvements. If you had the day again,
                      what would you change? Perhaps you would survey the site more thoroughly
                      before starting. Perhaps you would bring a different tool. Perhaps you would
                      ask the client a clarifying question before committing to a cable route.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">5.</span>
                    <span>
                      <strong>What&rsquo;s my priority tomorrow?</strong> This connects
                      today&rsquo;s learning to tomorrow&rsquo;s action. It creates continuity
                      between your reflections and your practice. Perhaps your priority is to finish
                      a tricky installation. Perhaps it is to look up a regulation you were unsure
                      about. Perhaps it is to practise a technique you struggled with today.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The power of the daily debrief is in its consistency, not its depth. Five minutes
                per day for a year is over 30 hours of reflection &mdash; more reflective practice
                than most electricians do in a decade. And because it is so brief, it is
                sustainable. You do not need special equipment, extra time, or academic knowledge.
                You just need the habit of pausing for five minutes before your working day is fully
                over and asking yourself five simple questions.
              </p>

              <p>
                Over weeks and months, patterns emerge from the daily debrief. You start to notice
                recurring themes: particular types of work that consistently cause difficulty,
                common mistakes that keep resurfacing, areas of knowledge that you keep needing to
                look up. These patterns are invaluable because they reveal your genuine development
                needs &mdash; not the generic CPD topics suggested by a training provider, but the
                specific areas where your practice actually needs improvement.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Making the Habit Stick</p>
                <p className="text-base text-white leading-relaxed">
                  The biggest challenge with the daily debrief is not the technique &mdash; it is
                  building the habit. Research on habit formation (from James Clear&rsquo;s{' '}
                  <em>Atomic Habits</em> and BJ Fogg&rsquo;s work at Stanford) suggests three
                  strategies: (1) Attach the debrief to an existing routine &mdash; do it during
                  your drive home, while packing your van, or while making your first cup of tea at
                  home. (2) Start absurdly small &mdash; even one question per day is better than
                  none. (3) Track the streak &mdash; use a simple habit tracker or just a tally on a
                  calendar. Once you have maintained the habit for three to four weeks, it will
                  begin to feel automatic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Learning from Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Learning from Mistakes Without Dwelling on Them
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mistakes are inevitable in any profession, and the electrical trades are no
                exception. Every electrician &mdash; from a first-year apprentice to a 30-year
                veteran &mdash; makes errors. Cables get cut to the wrong length. Circuits are wired
                incorrectly. Isolation procedures are occasionally forgotten. Test readings are
                misinterpreted. Regulations are misapplied. These mistakes range from minor
                inefficiencies to potentially serious safety issues.
              </p>

              <p>
                The question is not whether you will make mistakes &mdash; you will. The question is
                how you respond to them. There are three common responses, and only one of them
                leads to growth:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong>Denial or blame:</strong> &ldquo;It wasn&rsquo;t my fault&rdquo;,
                    &ldquo;The drawings were wrong&rdquo;, &ldquo;Nobody told me&rdquo;. This
                    protects the ego but prevents learning. If you never accept responsibility for
                    errors, you never examine what you could have done differently.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong>Dwelling and self-criticism:</strong> &ldquo;I&rsquo;m useless&rdquo;,
                    &ldquo;I always get things wrong&rdquo;, &ldquo;I should never have become an
                    electrician&rdquo;. This is the opposite extreme &mdash; excessive self-blame
                    that damages confidence and leads to anxiety, avoidance, and sometimes leaving
                    the profession entirely.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Analyse and extract the lesson:</strong> &ldquo;That was an error. What
                    specifically went wrong? Why did it happen? What will I do differently next
                    time?&rdquo; This is the growth mindset response. It accepts responsibility,
                    examines the cause, extracts the transferable lesson, creates an action plan,
                    and then moves on.
                  </span>
                </li>
              </ul>

              <p>
                The &ldquo;analyse and extract the lesson&rdquo; approach is a skill that can be
                developed. It requires separating your identity from your performance. A mistake is
                something that happened &mdash; it is not who you are. &ldquo;I made a wiring error
                on that lighting circuit&rdquo; is a statement about an event. &ldquo;I&rsquo;m a
                terrible electrician&rdquo; is a statement about identity. The first is useful data;
                the second is destructive self-labelling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Five-Step Mistake Recovery Process
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">1.</span>
                    <span>
                      <strong>Acknowledge:</strong> &ldquo;I made an error. The ring final circuit
                      was wired incorrectly at junction box 3.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">2.</span>
                    <span>
                      <strong>Analyse:</strong> &ldquo;I was rushing to finish before the plasterer
                      arrived. I didn&rsquo;t double-check my connections before closing the
                      JB.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">3.</span>
                    <span>
                      <strong>Lesson:</strong> &ldquo;Time pressure caused me to skip verification.
                      Checking connections takes 30 seconds and saves hours of fault-finding
                      later.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">4.</span>
                    <span>
                      <strong>Action:</strong> &ldquo;I will make it a non-negotiable rule to verify
                      every connection before closing any junction box, regardless of time
                      pressure.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold min-w-[24px]">5.</span>
                    <span>
                      <strong>Close:</strong> &ldquo;I&rsquo;ve learned the lesson. I will apply it
                      going forward. The mistake does not define my competence.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Keeping a Professional Development Journal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Keeping a Professional Development Journal
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A professional development journal is a record of your learning, reflections, and
                professional growth over time. It does not need to be a leather-bound diary or a
                formal academic document &mdash; a notes app on your phone, a simple notebook in
                your toolbag, or a voice recorder app all work perfectly well. The format is
                irrelevant; the habit of recording and reviewing is what creates value.
              </p>

              <p>
                The purpose of a journal is to make your learning visible and trackable. Without a
                record, learning is ephemeral &mdash; you have a moment of insight, but within days
                or weeks it fades. With a journal, you can look back and see what you have learned,
                how your understanding has developed, what areas you have improved in, and what
                areas still need work. Over months and years, the journal becomes a map of your
                professional development &mdash; a tangible record of growth that you can review,
                learn from, and take pride in.
              </p>

              <p>A professional development journal for an electrician might include:</p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Key learning moments from each week:</strong> A new technique you
                    learned, a problem you solved, a regulation you looked up and now understand
                    better
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Mistakes and what you learned from them:</strong> Specific errors, their
                    causes, and the corrective actions you have taken
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Technical notes:</strong> Wiring configurations that you want to
                    remember, product specifications, test procedures, cable calculation methods
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Questions and knowledge gaps:</strong> Things you weren&rsquo;t sure
                    about and need to research, areas where you want to develop your expertise
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>CPD activities:</strong> Courses attended, articles read, videos
                    watched, training sessions completed &mdash; with brief notes on what you gained
                    from each
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Goals and progress:</strong> What you are working towards and how you
                    are progressing &mdash; linking back to the goal-setting principles from earlier
                    in this module
                  </span>
                </li>
              </ul>

              <p>
                The journal does not need to be long or detailed. A few bullet points per week is
                sufficient. The act of writing (or recording) forces you to process your experiences
                consciously and articulate what you have learned. This articulation is itself a form
                of Abstract Conceptualisation in Kolb&rsquo;s model &mdash; you are converting raw
                experience into structured knowledge.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Quick Journal Format for Electricians
                </p>
                <p className="text-base text-white leading-relaxed">
                  If you do nothing else, keep a weekly three-line entry: (1) One thing I learned
                  this week. (2) One thing I struggled with. (3) One thing I will focus on next
                  week. This takes less than two minutes and, sustained over a year, creates 52
                  documented learning points, 52 identified challenges, and 52 improvement goals.
                  That is more structured professional development than most electricians do in
                  their entire career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Learning from Others */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Learning from Others &mdash; Observation, Questions, and Mentoring
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reflective practice is not only a solitary activity. Some of the most powerful
                learning comes from observing other electricians, asking questions, and building
                mentoring relationships. The electrical trades have a long tradition of learning
                through apprenticeship &mdash; working alongside experienced practitioners and
                absorbing their knowledge, techniques, and professional judgement. But this
                tradition is only effective if the learning is active and intentional, not passive
                and accidental.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Observing Experienced Electricians
              </h3>

              <p>
                Watching a skilled electrician work is one of the richest learning opportunities
                available. But observation is only effective if you are observing with intention
                &mdash; actively noticing what they do, how they do it, and why they make particular
                choices. Passive observation (&ldquo;I was there while they did it&rdquo;) produces
                minimal learning. Active observation (&ldquo;I watched how they organised their
                cable routes, noticed they always tested before closing up, and saw how they dealt
                with the unexpected joist in the way&rdquo;) produces rich, transferable learning.
              </p>

              <p>
                When observing experienced electricians, pay attention to: how they plan and
                organise their work before starting; what tools they select and why; how they handle
                unexpected problems; how they communicate with clients; how they sequence their
                testing; how they document their work; and how they make decisions when the
                regulations are ambiguous or the situation is unusual. These are the professional
                competences that are rarely taught in college but are essential for effective
                practice.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Asking Questions</h3>

              <p>
                Many apprentices and less experienced electricians are reluctant to ask questions.
                There is a persistent culture in the trades that values &ldquo;figuring it out
                yourself&rdquo; and sees asking questions as a sign of weakness or incompetence.
                This attitude is not only wrong &mdash; it is actively dangerous in a profession
                where errors can cause fires, electric shock, or death.
              </p>

              <p>
                Asking questions is one of the most efficient learning strategies available. A
                single well-timed question to an experienced electrician can give you understanding
                in seconds that might take hours to acquire through trial and error or self-study.
                The key is to ask specific, thoughtful questions rather than vague ones. &ldquo;Why
                did you choose a 10mm cable for that circuit instead of 6mm?&rdquo; will get a more
                useful answer than &ldquo;How do you know what cable to use?&rdquo; Specific
                questions show that you are thinking and observing, and they invite specific,
                actionable answers.
              </p>

              <p>
                Good questions to ask experienced electricians include: &ldquo;What is the most
                common mistake you see on this type of work?&rdquo; &ldquo;If you were doing this
                job again from scratch, what would you do differently?&rdquo; &ldquo;How do you
                approach fault-finding when you have no idea where the fault is?&rdquo; &ldquo;What
                was the hardest lesson you learned in your career?&rdquo; These questions tap into
                decades of accumulated experience and professional wisdom.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Mentoring Relationships</h3>

              <p>
                A mentoring relationship is a structured, ongoing learning partnership between a
                more experienced and a less experienced professional. It goes beyond the day-to-day
                supervision of an apprenticeship and provides a dedicated space for discussion,
                guidance, and professional development. A good mentor does not just tell you what to
                do &mdash; they help you think about your work, challenge your assumptions, share
                their own experiences (including their mistakes), and support your development
                towards your goals.
              </p>

              <p>
                Finding a mentor in the electrical industry is often informal. It might be a more
                experienced colleague on your team, a former supervisor who took an interest in your
                development, a training centre instructor who stays in touch, or a contact from your
                professional network. The relationship does not need to be formal or labelled as
                &ldquo;mentoring&rdquo; &mdash; what matters is that you have someone whose
                experience and judgement you trust, who is willing to share their knowledge, and who
                can provide honest feedback on your development.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What Makes a Good Mentoring Relationship
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Trust:</strong> You can be honest about what you don&rsquo;t know
                      without fear of judgement or ridicule
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Challenge:</strong> Your mentor pushes you beyond your comfort zone
                      and challenges your assumptions, rather than just telling you what you want to
                      hear
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Honesty:</strong> Feedback is specific, constructive, and truthful
                      &mdash; not just praise or criticism
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Experience sharing:</strong> Your mentor shares their own learning
                      journey, including the mistakes and setbacks that shaped their expertise
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Two-way:</strong> Even the mentee brings value &mdash; fresh
                      perspectives, new knowledge of current regulations, and enthusiasm that can
                      re-energise an experienced electrician
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Deliberate Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Anders Ericsson&rsquo;s Deliberate Practice
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Anders Ericsson (1947&ndash;2020) was a Swedish psychologist at Florida State
                University whose research on expertise and expert performance transformed our
                understanding of how people develop mastery. His central finding, based on decades
                of studying experts across domains including music, chess, medicine, and sport, was
                that expertise is not primarily the product of innate talent. It is the product of a
                specific type of practice that he called <strong>deliberate practice</strong>.
              </p>

              <p>
                Ericsson&rsquo;s work is often reduced to the &ldquo;10,000-hour rule&rdquo;
                popularised by Malcolm Gladwell in his book <em>Outliers</em> (2008). But this is a
                significant oversimplification, and Ericsson himself was critical of it. The
                10,000-hour figure was an average, not a magic threshold. More importantly, it was
                10,000 hours of <strong>deliberate practice</strong> &mdash; not just any practice.
                Ericsson&rsquo;s actual finding was far more nuanced and far more useful: it is not
                how long you practise that determines mastery, but how you practise.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Na&iuml;ve Practice vs Deliberate Practice
              </h3>

              <p>
                Ericsson distinguished between two types of practice.{' '}
                <strong>Na&iuml;ve practice</strong> (sometimes called &ldquo;mindless
                repetition&rdquo;) is doing the same thing over and over without intentional focus
                on improvement. It is the default mode for most people in most activities. You reach
                a &ldquo;good enough&rdquo; level of competence, and then you plateau. You keep
                doing the task, but you are not getting better &mdash; you are just repeating your
                current level of skill. Na&iuml;ve practice feels comfortable because you are
                operating within your existing abilities.
              </p>

              <p>
                <strong>Deliberate practice</strong>, by contrast, has four defining
                characteristics:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold min-w-[24px]">1.</span>
                  <span>
                    <strong>It targets specific weaknesses:</strong> Rather than practising what you
                    are already good at, deliberate practice focuses on the aspects of performance
                    that are weakest or most in need of development. It is targeted, not general. An
                    apprentice who is weak at cable calculations would deliberately spend time
                    working through calculation exercises, not just doing more installation work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold min-w-[24px]">2.</span>
                  <span>
                    <strong>It operates at the edge of your ability:</strong> Deliberate practice
                    pushes you just beyond your current competence. If the task is too easy, you are
                    in the comfort zone and not learning. If the task is impossibly difficult, you
                    are overwhelmed and not learning. The &ldquo;sweet spot&rdquo; is the zone where
                    the task is challenging but achievable with concentrated effort &mdash; what
                    psychologists call the &ldquo;zone of proximal development&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold min-w-[24px]">3.</span>
                  <span>
                    <strong>It requires full concentration:</strong> Deliberate practice is not
                    something you can do on autopilot. It demands your full attention and cognitive
                    effort. This is why deliberate practice is mentally exhausting &mdash;
                    Ericsson&rsquo;s research found that even top performers could only sustain
                    deliberate practice for three to four hours per day before fatigue degraded the
                    quality of their effort.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold min-w-[24px]">4.</span>
                  <span>
                    <strong>It involves feedback and adjustment:</strong> Without feedback, you
                    cannot know whether your practice is effective. Feedback can come from a mentor,
                    a supervisor, test results, client responses, or your own critical
                    self-assessment. But it must be specific, accurate, and timely. And crucially,
                    you must act on the feedback &mdash; adjusting your approach based on what it
                    tells you.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">
                Deliberate Practice for Electricians
              </h3>

              <p>
                In the electrical trades, the difference between na&iuml;ve practice and deliberate
                practice is stark. Consider two electricians, both with five years of experience
                installing domestic consumer units. Electrician A has installed hundreds of consumer
                units using the same method every time. They are competent and efficient, but their
                technique has not changed in three years. They are in na&iuml;ve practice &mdash;
                repeating a comfortable routine. Electrician B has also installed hundreds of
                consumer units, but they have deliberately varied their approach: trying different
                cable management methods, experimenting with more efficient ways to organise bus bar
                connections, seeking feedback from inspectors on their labelling and documentation,
                and studying the latest products and installation techniques. Electrician B has been
                in deliberate practice &mdash; they are not just repeating, they are improving.
              </p>

              <p>Practical ways to apply deliberate practice in the electrical trades include:</p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Intentionally taking on unfamiliar work:</strong> Volunteering for types
                    of work that challenge you &mdash; three-phase installations if you usually do
                    single-phase, commercial work if you usually do domestic, inspection work if you
                    usually just install
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Seeking expert feedback:</strong> Asking a more experienced electrician
                    or inspector to review your work and provide specific, honest critique
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Studying specific regulations in depth:</strong> Rather than just
                    looking up what you need for the current job, taking time to understand the
                    reasoning behind the regulation and its application to different scenarios
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Practising weak areas outside of paid work:</strong> If you struggle
                    with cable calculations, working through practice problems in the evening. If
                    you find conduit bending difficult, practising at the training centre or
                    workshop
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Setting specific improvement goals:</strong> Not just &ldquo;get better
                    at testing&rdquo; but &ldquo;complete an EICR on a 10-circuit domestic board
                    within 2.5 hours while maintaining full accuracy on all readings&rdquo;
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Uncomfortable Truth About Deliberate Practice
                </p>
                <p className="text-base text-white leading-relaxed">
                  Deliberate practice is not enjoyable in the same way that comfortable, routine
                  work is enjoyable. It involves struggle, frustration, and the discomfort of
                  operating at the edge of your ability. This is precisely why most people avoid it
                  and plateau at a &ldquo;good enough&rdquo; level. But Ericsson&rsquo;s research
                  shows that this discomfort is the signal that genuine learning is occurring. If
                  the practice feels easy, you are probably in the na&iuml;ve practice zone and not
                  developing. The electricians who reach the highest levels of expertise &mdash;
                  those who can diagnose obscure faults, design complex installations from first
                  principles, and mentor the next generation &mdash; are the ones who consistently
                  push through the discomfort of deliberate practice rather than retreating to the
                  comfort of routine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has explored the theory and practice of reflective learning, from
                academic frameworks to practical daily habits. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Kolb&rsquo;s Experiential Learning Cycle</strong> shows that effective
                    learning requires four stages: doing, reflecting, theorising, and experimenting.
                    Experience alone is not enough &mdash; you must also reflect on and
                    conceptualise it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Sch&ouml;n&rsquo;s reflection-in-action</strong> is real-time
                    professional thinking &mdash; adjusting your approach while working.
                    Reflection-on-action is deliberate review after the event.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Gibbs&rsquo; Reflective Cycle</strong> provides a six-stage framework
                    (Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan) for
                    structured reflection on significant experiences.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The daily debrief habit</strong> uses five questions to capture learning
                    from every working day in less than five minutes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Learning from mistakes</strong> requires separating identity from
                    performance and following a five-step process: acknowledge, analyse, extract the
                    lesson, create an action, and close.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Professional development journals</strong> make learning visible and
                    trackable, even with just a few bullet points per week.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Learning from others</strong> through active observation, asking
                    specific questions, and mentoring relationships accelerates professional
                    development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Deliberate practice</strong> (Ericsson) is fundamentally different from
                    na&iuml;ve repetition. It targets weaknesses, operates at the edge of ability,
                    demands full concentration, and requires feedback.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will explore
                  Continuous Professional Development (CPD) &mdash; the formal and informal
                  activities that maintain and expand your professional competence throughout your
                  career. We will examine CPD requirements for electricians, how to build a CPD
                  plan, and why CPD is essential for career progression in an industry where
                  regulations, technology, and best practice are constantly evolving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4-section-3">
              Next: CPD &amp; Continuous Professional Development
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
