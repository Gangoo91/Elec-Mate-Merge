import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  GraduationCap,
  Timer,
  Brain,
  Target,
  BookOpen,
  ChevronDown,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';

const PAGE_TITLE =
  'AM2 Exam Preparation Online | Practice Tests & Mock Exams | Elec-Mate';
const PAGE_DESCRIPTION =
  "Prepare for the AM2 practical assessment online. Timed mock exercises, consumer unit build, ring final, lighting circuit, and fault finding practice. From £4.99/mo.";

const faqs = [
  {
    question: 'How long does the AM2 assessment take?',
    answer:
      'The AM2 assessment typically takes a full day, approximately 6 hours of practical work plus briefings and breaks. The time is split across the four main tasks: consumer unit installation, ring final circuit, one-way and two-way lighting circuit, and fault finding on a pre-built faulty circuit. Each task has its own time allocation, and you must complete all tasks within the allowed time. Time management is one of the most critical skills — many candidates fail not because of poor workmanship but because they run out of time. Elec-Mate AM2 mock exercises include realistic time limits so you can practise working under pressure.',
  },
  {
    question: 'What is the AM2 pass rate?',
    answer:
      'The AM2 pass rate varies between assessment centres but is generally estimated at around 60-70% on first attempt. The most common reasons for failure are poor terminations (loose connections, incorrect torque, exposed copper), running over time on one or more tasks, incorrect wiring of the two-way lighting circuit, failure to follow safe isolation procedures during fault finding, and incomplete or inaccurate test results. Preparing thoroughly with timed practice exercises significantly improves your chances of passing first time.',
  },
  {
    question: 'What happens if I fail the AM2?',
    answer:
      'If you fail the AM2, you will receive a report detailing which areas you did not meet the required standard. You can rebook and retake the assessment, though you will need to pay the full assessment fee again (typically between 500 and 700 pounds). There is no mandatory waiting period between attempts, but most candidates benefit from taking time to address the specific areas of weakness identified in their feedback before rebooking. JIB/NET recommend booking your retake promptly while the feedback is fresh.',
  },
  {
    question: 'Do I need to bring my own tools to the AM2?',
    answer:
      'Yes, you must bring your own complete set of hand tools to the AM2 assessment. This includes side cutters, long-nose pliers, cable strippers, a selection of screwdrivers (including electrician VDE insulated screwdrivers), a junior hacksaw, a sharp knife or cable sheath stripper, a tape measure, and a spirit level. You will also need your own test instruments: a multifunction tester (calibrated and with valid calibration certificate), a proving unit (such as a Martindale VI-13700), and a voltage indicator (such as a Martindale VI-15000 or Fluke T150). The assessment centre provides materials, cables, accessories, and the pre-built circuits for fault finding.',
  },
  {
    question: 'What JIB card do I get after passing the AM2?',
    answer:
      'After passing the AM2, you can apply for a JIB ECS (Electrotechnical Certification Scheme) card. The specific card depends on your qualifications. If you hold a Level 3 NVQ/SVQ in Electrical Installation plus the AM2 and a current 18th Edition qualification, you are eligible for the JIB Installation Electrician (Gold Card). If you have a Level 3 NVQ/SVQ without the AM2, or if you have older qualifications, you may be eligible for a different grade. The Gold Card is the industry-standard card that demonstrates you are a fully qualified electrician and is recognised by employers and clients across the UK.',
  },
];

const howToSteps = [
  {
    name: 'Assess your readiness',
    text: 'Before booking the AM2, honestly evaluate your practical skills. Can you wire a consumer unit neatly and accurately? Can you complete a ring final circuit with correct connections? Can you wire one-way and two-way lighting circuits from memory? Can you perform safe isolation and systematic fault finding? If any of these feel uncertain, start with the Elec-Mate AM2 preparation exercises.',
  },
  {
    name: 'Start with consumer unit practice',
    text: 'Open the AM2 Preparation module in Elec-Mate and begin with the consumer unit installation exercise. The app presents a realistic scenario with a circuit schedule, and you work through the wiring sequence step by step. Timed mode simulates the real assessment pressure. The AI provides feedback on your approach and flags common mistakes.',
  },
  {
    name: 'Work through ring final and lighting circuits',
    text: 'Move on to the ring final circuit and lighting circuit exercises. Each exercise follows the AM2 format with specific cable types, accessory positions, and wiring requirements. The app covers single-gang, double-gang, one-way, and two-way switching arrangements. Focus on getting the connections right before worrying about speed.',
  },
  {
    name: 'Practise fault finding systematically',
    text: 'The fault finding exercise presents pre-built circuits with realistic faults. You perform safe isolation (following the GS 38 procedure), then systematically test to identify the fault. The app teaches you a logical fault-finding sequence rather than random testing, which is the approach assessors expect to see.',
  },
  {
    name: 'Complete full timed mock assessments',
    text: 'Once you are confident with each individual task, run a full timed AM2 mock assessment. This covers all four tasks with realistic time limits. The app tracks your time per task, scores your approach, and provides a detailed breakdown of areas to improve. Aim to complete at least three full mock assessments before your real AM2 date.',
  },
];

const features = [
  {
    icon: Timer,
    title: 'Timed Mock Exercises',
    description:
      'Every AM2 exercise includes realistic time limits that match the actual assessment. Practise working under pressure so time management becomes second nature on the day.',
  },
  {
    icon: Wrench,
    title: 'Consumer Unit Build',
    description:
      'Step-by-step consumer unit installation practice. Work through circuit schedules, busbar configurations, RCBO selection, and cable termination sequences used in the real AM2.',
  },
  {
    icon: Zap,
    title: 'Ring Final Circuit Practice',
    description:
      'Complete ring final circuit wiring exercises with correct cable identification, socket outlet connections, and spur configurations. Learn the wiring sequence that saves time.',
  },
  {
    icon: Target,
    title: 'Fault Finding Scenarios',
    description:
      'Practise systematic fault finding on realistic pre-built circuits. Learn the logical testing sequence assessors expect, including safe isolation and GS 38 procedures.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Feedback',
    description:
      'Receive instant AI feedback on your approach to each exercise. The system identifies common mistakes, suggests improvements, and tracks your progress over time.',
  },
  {
    icon: ClipboardCheck,
    title: 'Testing & Inspection Practice',
    description:
      'Practise completing test result schedules accurately. Continuity, insulation resistance, polarity, Zs, PSCC, and RCD tests — the same sequence used in the AM2.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'AM2 Exam Preparation',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
  },
  educationalLevel: 'Professional',
  inLanguage: 'en-GB',
  courseMode: 'online',
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    description: 'From £4.99/month with 7-day free trial',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://elec-mate.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Training',
      item: 'https://elec-mate.com/training',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'AM2 Exam Preparation',
      item: 'https://elec-mate.com/training/am2-exam-preparation',
    },
  ],
};

export default function AM2ExamPreparationPage() {
  useSEO({
    title: 'AM2 Exam Preparation Online | Practice Tests & Mock Exams',
    description: PAGE_DESCRIPTION,
    schema: courseSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...courseSchema,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...breadcrumbSchema,
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <GraduationCap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              JIB/NET AM2 Assessment Practice
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Prepare for the{' '}
            <span className="text-yellow-400">AM2 Assessment</span> Online
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            Timed mock exercises for every AM2 task. Consumer unit build, ring
            final circuit, lighting circuit, and fault finding practice with
            AI-powered feedback. Pass first time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What is the AM2 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the AM2 Assessment?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The AM2 is the Assessment of Competence in Electrical Installation,
              commonly known as the AM2 or AM2S (the Scottish equivalent). It is
              a practical assessment that demonstrates you can safely and
              competently carry out electrical installation work to the standard
              required of a qualified electrician. Passing the AM2 is the final
              step in becoming a fully qualified Installation Electrician and is
              required to obtain the JIB ECS Gold Card.
            </p>
            <p>
              The AM2 is not a classroom exam — it is a hands-on practical
              assessment carried out in a real workshop environment. You are given
              a set of tasks that replicate everyday electrical installation work,
              and you must complete them within strict time limits to the required
              standard of workmanship, safety, and accuracy. The assessment
              covers the core skills every electrician needs: installing consumer
              units, wiring power and lighting circuits, testing and inspecting
              completed work, and finding faults on existing circuits.
            </p>
            <p>
              The AM2 was developed by the Joint Industry Board (JIB) and is
              administered by National Electrotechnical Training (NET). It is
              carried out at approved assessment centres across the UK. The
              assessment is typically booked several weeks in advance, and
              candidates must bring their own hand tools and calibrated test
              instruments.
            </p>
          </div>
        </div>
      </section>

      {/* AM2 Structure */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The AM2 Assessment Structure
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              The AM2 assessment consists of four main practical tasks, plus
              testing and inspection of your completed work. The total assessment
              time is approximately 6 hours. Each task tests different skills,
              and you must demonstrate competence in all of them to pass.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">
                    Consumer Unit Installation
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    You are provided with a consumer unit (or split-load board)
                    and a circuit schedule. You must install the appropriate
                    protective devices (MCBs, RCBOs, or RCDs), connect the
                    busbars correctly, and terminate the circuit cables neatly
                    and securely. Assessors check for correct device selection,
                    proper torque on terminals, neat cable dressing, and correct
                    labelling of circuits. This task tests your ability to work
                    methodically and produce a professional finish.
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
                  <h3 className="font-bold text-white text-lg mb-2">
                    Ring Final Circuit
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    You must wire a ring final circuit serving multiple socket
                    outlets, including at least one spur. The circuit is wired
                    using the cables and accessories provided, following the
                    drawing and specification given. Assessors check that the
                    ring is continuous, connections are correct at every socket,
                    the spur is taken from the correct point, and all earth
                    connections are properly made. Sleeving of earth conductors
                    with green-and-yellow sleeving is required.
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
                  <h3 className="font-bold text-white text-lg mb-2">
                    Lighting Circuit (One-Way and Two-Way)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    You wire a lighting circuit that includes both one-way and
                    two-way switching. This is often where candidates make
                    mistakes, particularly with the strappers (travellers)
                    between the two-way switches and the common terminal
                    connections. The circuit must be wired using the plate wiring
                    method and loop-in method as specified. Assessors check for
                    correct switch wire identification, proper use of brown
                    sleeving on switch wires, and neat cable management at the
                    ceiling rose or light fitting.
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
                  <h3 className="font-bold text-white text-lg mb-2">
                    Fault Finding
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    You are presented with a pre-built circuit that has one or
                    more faults. You must perform safe isolation following the
                    correct procedure (GS 38 approved voltage indicator, prove
                    dead, lock off), then systematically test the circuit to
                    identify the fault. Common faults include open circuits,
                    reversed polarity, incorrect connections, and earth faults.
                    Assessors watch your safe isolation procedure closely — any
                    shortcut or missed step will result in a fail.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              After completing the wiring tasks, you must also carry out
              inspection and testing of your own work. This includes continuity
              of protective conductors (R1+R2), insulation resistance, polarity
              verification, and functional testing. You record your results on a
              test result schedule and sign off the work. Inaccurate test results
              or failure to identify your own wiring errors during testing will
              count against you.
            </p>
          </div>
        </div>
      </section>

      {/* Common Failures */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Common AM2 Failures and How to Avoid Them
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Understanding why candidates fail the AM2 is just as important as
              knowing what the assessment covers. The most common reasons for
              failure are preventable with the right preparation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-white">Time Management</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                The single biggest cause of failure. Candidates spend too long on
                one task and run out of time on others. Practise with timed
                exercises until you can comfortably finish each task with time to
                spare.
              </p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-white">Loose Terminations</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Connections that are not properly tightened to the correct torque.
                Exposed copper at terminals, insufficient conductor inserted into
                the terminal, or over-stripped insulation. Use a torque
                screwdriver and check every connection.
              </p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-white">
                  Two-Way Switching Errors
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Wiring the strappers to the wrong terminals, confusing the
                common terminal with L1 or L2, or failing to identify switch
                wires with brown sleeving. Draw the circuit diagram from memory
                before you start wiring.
              </p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-white">Safe Isolation Errors</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Skipping steps in the safe isolation procedure. You must prove
                the voltage indicator works (on a known live source or proving
                unit), test for dead, and prove the indicator again. Any shortcut
                is an automatic fail.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              Other common issues include forgetting to sleeve earth conductors,
              poor cable management (cables not dressed neatly at the consumer
              unit or accessory plates), and inaccurate test results. The AM2
              rewards methodical, careful work. Rushing leads to mistakes, and
              mistakes lead to fails.
            </p>
          </div>
        </div>
      </section>

      {/* After Passing */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Happens After Passing the AM2
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Passing the AM2 is a significant milestone in your career as an
              electrician. It confirms that you have the practical competence to
              carry out electrical installation work safely and to the required
              standard. But passing is not the end of the process — there are
              important next steps.
            </p>
            <p>
              The most immediate step is applying for your JIB ECS
              (Electrotechnical Certification Scheme) card. If you hold a Level 3
              NVQ/SVQ in Electrical Installation, a current 18th Edition
              qualification (C&G 2382), and have now passed the AM2, you are
              eligible for the Installation Electrician card — commonly known as
              the Gold Card. This is the standard industry card that demonstrates
              you are a fully qualified electrician. Employers, contractors, and
              site managers across the UK recognise the Gold Card as proof of
              competence.
            </p>
            <p>
              The Gold Card is different from the Grade Card (also called the
              Approved Electrician card), which requires additional experience
              and qualifications, including an inspection and testing
              qualification such as C&G 2391. Many electricians work towards the
              Grade Card after gaining a few years of post-AM2 experience.
            </p>
            <p>
              Beyond the JIB card, passing the AM2 also opens the door to
              joining a competent person scheme such as NICEIC, NAPIT, or ELECSA.
              These schemes allow you to self-certify notifiable electrical work
              under Part P of the Building Regulations, which is essential if you
              want to work as a self-employed domestic electrician. Most schemes
              require the AM2 (or equivalent) as part of their membership
              criteria.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Helps */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Helps You Prepare for the AM2
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Elec-Mate was built by electricians who have been through the AM2
              process. We know the pressure, the time constraints, and the common
              traps that catch candidates out. The AM2 preparation module is
              designed to replicate the real assessment as closely as possible in
              a digital format, so you arrive on the day with confidence and
              muscle memory.
            </p>
            <p>
              Each exercise in the app mirrors a real AM2 task. The consumer unit
              build presents you with a circuit schedule and walks you through
              the installation sequence, timing your progress. The ring final
              circuit exercise covers correct wiring, spur connections, and
              testing procedures. The lighting circuit exercise drills one-way
              and two-way switching until the terminal connections are automatic.
              The fault finding exercise teaches systematic testing rather than
              guesswork.
            </p>
            <p>
              The AI feedback system analyses your approach to each exercise and
              identifies areas for improvement. It tracks your speed, accuracy,
              and consistency across multiple attempts, showing you exactly where
              you need more practice. Many users report that working through
              the exercises three to four times before their AM2 date made a
              significant difference to their confidence and performance.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Tips from Working Electricians */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Tips from Working Electricians Who Have Passed the AM2
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              We asked qualified electricians in the Elec-Mate community for
              their top tips for AM2 candidates. Here is what they said.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <p className="text-white text-sm leading-relaxed">
                  <strong>"Practise your safe isolation until it is automatic."</strong>{' '}
                  The assessor watches your safe isolation procedure like a hawk.
                  Prove your voltage indicator, test for dead on all conductors,
                  prove the indicator again. Every single time, no shortcuts. If
                  you have to think about the steps, you have not practised
                  enough.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <p className="text-white text-sm leading-relaxed">
                  <strong>"Read the brief twice, then read it again."</strong>{' '}
                  Candidates fail because they assume what the task requires
                  rather than reading the actual specification. The brief tells
                  you exactly what to do. If it says to use a specific wiring
                  method or cable type, use it. Do not do what you normally do on
                  site — do what the brief asks.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <p className="text-white text-sm leading-relaxed">
                  <strong>"Do not try to be fast — try to be right."</strong>{' '}
                  Speed comes from practice, not from rushing. If you rush, you
                  make mistakes. If you make mistakes, you either fail or waste
                  time going back to fix them. Work methodically, check each
                  connection before moving to the next, and the speed will come
                  naturally with repetition.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <p className="text-white text-sm leading-relaxed">
                  <strong>"Check your test instruments before the day."</strong>{' '}
                  Make sure your multifunction tester is calibrated and you have
                  a valid calibration certificate. Check that all your leads are
                  in good condition. Bring spare batteries. Bring a proving unit.
                  There is nothing worse than arriving and discovering your
                  tester is not working.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Prepare for the AM2 Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to build your confidence and practical skills
            before the real AM2 assessment day.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">
                    {step.name}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About the AM2 Assessment
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Pass the AM2 first time"
        subheading="Join 430+ UK electricians preparing for assessments and qualifications. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
