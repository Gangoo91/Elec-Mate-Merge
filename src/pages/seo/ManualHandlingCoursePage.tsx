import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  GraduationCap,
  ChevronDown,
  ShieldCheck,
  Dumbbell,
  Users,
  AlertTriangle,
  ClipboardCheck,
  ArrowDown,
  BookOpen,
  Wrench,
  HeartPulse,
  Target,
} from 'lucide-react';
import { useState } from 'react';

const PAGE_TITLE = 'Manual Handling Course for Electricians | Online Training | Elec-Mate';
const PAGE_DESCRIPTION =
  'Manual handling training for electricians. Safe lifting techniques, TILE risk assessment, load handling. Compliant with Manual Handling Operations Regulations 1992. Mock exams included.';

const faqs = [
  {
    question: 'Is manual handling training a legal requirement for electricians?',
    answer:
      'Yes. Under the Manual Handling Operations Regulations 1992 (as amended 2002), employers must provide training for any employee who carries out manual handling tasks that present a risk of injury. Electricians regularly lift and carry cable drums, consumer units, distribution boards, power tools, and heavy accessories, all of which fall within the scope of the regulations. Self-employed electricians also have a duty under the Health and Safety at Work etc. Act 1974 to ensure their own safety, which includes understanding safe manual handling techniques.',
  },
  {
    question: 'What does TILE stand for in manual handling?',
    answer:
      'TILE is a structured risk assessment framework used to evaluate manual handling tasks. T stands for Task (what does the activity involve — lifting, carrying, pushing, pulling, twisting?). I stands for Individual (does the person have the physical capability, any health conditions, or adequate training?). L stands for Load (how heavy, bulky, unstable, or difficult to grip is the object?). E stands for Environment (is the floor uneven, wet, or cluttered? Is there adequate lighting and space?). Every manual handling operation should be assessed using TILE before work begins.',
  },
  {
    question: 'What is the maximum weight an electrician should lift alone?',
    answer:
      'There is no single legal maximum weight. The HSE guidance suggests that for a standing male lifting close to the body at waist height, around 25 kg is a reasonable guideline for low-risk handling. However, this drops significantly depending on posture, distance from the body, height of lift, frequency, and individual capability. A cable drum weighing 20 kg might present a higher risk than a compact 25 kg load if it is awkward to grip or must be lifted overhead. The key principle is always to assess the risk using TILE rather than relying on a single number.',
  },
  {
    question: 'How long does the Elec-Mate manual handling course take?',
    answer:
      'The online manual handling course typically takes 2 to 3 hours to complete, covering all core modules including legislation, TILE risk assessment, safe lifting technique, electrical-specific scenarios, mechanical aids, and team lifting. The course is self-paced, so you can study in shorter sessions around your working day. The final assessment includes multiple-choice questions and scenario-based exercises specific to electrical installation work.',
  },
  {
    question: 'What are the most common manual handling injuries for electricians?',
    answer:
      'The most common injuries are lower back strain (from lifting cable drums, heavy tools, or distribution boards), shoulder injuries (from overhead work such as pulling cables through ceiling voids or fitting accessories above head height), hand and finger injuries (from gripping awkward loads without gloves), and knee injuries (from carrying loads on uneven surfaces or up and down ladders). The HSE reports that manual handling accounts for over a third of all workplace injuries in construction, making it the single largest cause of occupational injury in the sector.',
  },
  {
    question: 'Does this course count towards CPD for electricians?',
    answer:
      'Yes. Manual handling training counts towards your Continuing Professional Development (CPD) requirements. Competent person schemes such as NICEIC, NAPIT, and ELECSA recognise health and safety training as valid CPD activity. The course includes a downloadable completion certificate that you can include in your CPD portfolio. Elec-Mate automatically tracks your CPD hours within the platform.',
  },
];

const features = [
  {
    icon: Dumbbell,
    title: 'Safe Lifting Technique',
    description:
      'Step-by-step instruction on correct lifting posture: planning the lift, positioning feet, bending knees, keeping a straight back, and maintaining a smooth controlled movement throughout.',
  },
  {
    icon: Target,
    title: 'TILE Risk Assessment',
    description:
      'Learn to assess every manual handling task using the TILE framework — Task, Individual, Load, Environment — before you start lifting. Practical examples from real electrical jobs.',
  },
  {
    icon: Wrench,
    title: 'Electrical-Specific Scenarios',
    description:
      'Training designed for electricians covering cable drum handling, consumer unit installation at height, distribution board lifting, and working with heavy equipment in confined plant rooms.',
  },
  {
    icon: Users,
    title: 'Team Lifting Procedures',
    description:
      'How to coordinate two-person and multi-person lifts safely. Communication protocols, synchronised movement, and when to insist on mechanical aids instead of manual effort.',
  },
  {
    icon: HeartPulse,
    title: 'Injury Prevention',
    description:
      'Understanding musculoskeletal disorders, recognising early warning signs, warm-up exercises for physical work, and long-term strategies for protecting your back throughout your career.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Exams & Certificate',
    description:
      'Multiple-choice assessments and scenario-based questions specific to electrical work. Downloadable CPD certificate on completion. Track your progress in the Elec-Mate dashboard.',
  },
];

const courseModules = [
  {
    number: 1,
    title: 'Introduction to Manual Handling Legislation',
    description:
      'The Manual Handling Operations Regulations 1992, the Health and Safety at Work etc. Act 1974, employer and employee duties, and how these apply specifically to electrical installation work.',
  },
  {
    number: 2,
    title: 'The TILE Risk Assessment Framework',
    description:
      'How to carry out a TILE assessment before every manual handling task. Worked examples for common electrical scenarios including cable drum delivery, board installation, and tool carrying.',
  },
  {
    number: 3,
    title: 'Safe Lifting Technique',
    description:
      'The correct biomechanics of lifting: planning, foot position, grip, bend at the knees, straight back, controlled ascent, and smooth movement. Common mistakes that cause injury.',
  },
  {
    number: 4,
    title: 'Electrical-Specific Manual Handling',
    description:
      'Cable drums (rolling vs lifting), consumer units and distribution boards, conduit and trunking bundles, heavy power tools, working on ladders and scaffolding with loads.',
  },
  {
    number: 5,
    title: 'Mechanical Aids and Team Lifting',
    description:
      'Cable drum stands, drum rollers, sack trucks, trolleys, pulleys, and hoists. When to use mechanical aids. Team lifting coordination, communication, and synchronisation.',
  },
  {
    number: 6,
    title: 'Assessment and Certification',
    description:
      'Multiple-choice knowledge test and scenario-based assessment. Pass mark, certificate download, and CPD recording. Review of key principles and further resources.',
  },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Manual Handling Course for Electricians',
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
    description: '7-day free trial, then from £4.99/month',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
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

export default function ManualHandlingCoursePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    schema: courseSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elec-mate.com' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Training',
                item: 'https://elec-mate.com/training',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Manual Handling Course',
                item: 'https://elec-mate.com/training/manual-handling',
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              Manual Handling Operations Regulations 1992
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Manual Handling Course for <span className="text-yellow-400">Electricians</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Learn safe lifting techniques, TILE risk assessment, and load handling procedures
            designed specifically for electrical installation work. Online training with mock exams
            and CPD certificate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/signup"
              className="h-14 px-10 inline-flex items-center justify-center text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-transform"
            >
              Start 7-Day Free Trial
            </a>
            <span className="text-white text-sm">From £4.99/mo after trial — cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Why Electricians Need Manual Handling Training */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Electricians Need Manual Handling Training
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Electrical installation work is physically demanding. On any given day, an electrician
              may carry 50-metre cable drums weighing 25 kg or more, lift consumer units and
              distribution boards into position at height, transport heavy power tools up ladders,
              and manoeuvre lengths of conduit and trunking through corridors and ceiling voids.
              Each of these tasks presents a genuine risk of musculoskeletal injury if performed
              incorrectly.
            </p>
            <p>
              The Health and Safety Executive (HSE) reports that manual handling injuries account
              for over a third of all workplace injuries in the construction sector. Back injuries
              are the most common, but shoulder strains, hernias, and repetitive strain injuries are
              also widespread. These injuries can be career-ending for electricians who depend on
              physical capability to earn a living. A single back injury from incorrectly lifting a
              cable drum can lead to months off work, chronic pain, and long-term reduced earning
              capacity.
            </p>
            <p>
              Under the Manual Handling Operations Regulations 1992 (as amended in 2002), employers
              have a legal duty to avoid the need for hazardous manual handling where reasonably
              practicable, assess the risk of injury from any manual handling that cannot be
              avoided, and reduce the risk of injury as far as reasonably practicable. Employees
              have a duty to follow safe systems of work and use any equipment provided. This
              applies equally to self-employed electricians under the Health and Safety at Work etc.
              Act 1974.
            </p>
          </div>
        </div>
      </section>

      {/* TILE Assessment */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The TILE Risk Assessment Framework
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              TILE is the standard framework for assessing manual handling risks. It provides a
              systematic approach that ensures nothing is overlooked before a lifting operation
              begins. Every electrician should carry out a mental TILE assessment before handling
              any load, no matter how routine the task may seem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 mb-3">
                T
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Task</h3>
              <p className="text-white text-sm leading-relaxed">
                What does the task involve? Lifting, lowering, carrying, pushing, pulling, or
                holding? How far must the load be moved? Does the task involve twisting, stooping,
                or reaching above shoulder height? Is the task repetitive? For electricians,
                consider whether you are lifting a cable drum from ground level, carrying a
                distribution board up stairs, or pulling cables overhead for extended periods.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 mb-3">
                I
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Individual</h3>
              <p className="text-white text-sm leading-relaxed">
                Does the person have the physical capability for the task? Are there any
                pre-existing health conditions such as back problems, joint issues, or heart
                conditions? Has the person received manual handling training? Are they fatigued from
                previous tasks? Pregnant workers and young workers require special consideration
                under the regulations.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 mb-3">
                L
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Load</h3>
              <p className="text-white text-sm leading-relaxed">
                How heavy is the load? Is it bulky, unwieldy, or difficult to grip? Can the contents
                shift during movement (such as loose cable on a drum)? Is the load hot, sharp-edged,
                or otherwise hazardous? Cable drums, for example, are both heavy and awkward to
                grip. A consumer unit may not be extremely heavy but can be difficult to hold steady
                while positioning at height.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 mb-3">
                E
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Environment</h3>
              <p className="text-white text-sm leading-relaxed">
                Is the floor surface uneven, wet, slippery, or cluttered? Is there adequate space to
                adopt a good posture? Is the lighting sufficient? Are there stairs, ramps, or
                changes in level? Construction sites are often cluttered, poorly lit, and have
                uneven surfaces — all of which significantly increase the risk of manual handling
                injuries for electricians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Lifting Technique */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Safe Lifting Technique: Step by Step
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Correct lifting technique protects your spine by keeping it in a neutral position and
              using your leg muscles — which are far stronger than your back muscles — to power the
              lift. The following sequence should become automatic for every electrician.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: 'Plan the lift',
                detail:
                  'Before touching the load, plan the entire operation. Where is the load going? Is the route clear? Do you need help or a mechanical aid? Can you break the load into smaller parts? Remove any obstacles from the path before you start.',
              },
              {
                step: 'Position your feet',
                detail:
                  'Stand with your feet hip-width apart, one foot slightly ahead of the other for balance. Position yourself as close to the load as possible. Your feet should be stable and firmly planted on the ground.',
              },
              {
                step: 'Bend at the knees',
                detail:
                  'Bend your knees, not your back. Keep your back straight and your head up. Lower yourself to the load by bending at the hips and knees, maintaining the natural curve of your spine throughout.',
              },
              {
                step: 'Get a secure grip',
                detail:
                  'Grip the load firmly with both hands. Use the full palm, not just fingertips. If the load has handles, use them. If it is a cable drum, grip the flanges firmly. Wear gloves if the surface is rough, sharp, or slippery.',
              },
              {
                step: 'Lift smoothly',
                detail:
                  'Straighten your legs to lift, keeping the load close to your body. Your arms should remain straight — let your legs do the work. Avoid any sudden or jerky movements. Keep the load at waist height if carrying it any distance.',
              },
              {
                step: 'Move and set down',
                detail:
                  'Turn by moving your feet, never by twisting your spine. Walk steadily to the destination. To set the load down, reverse the procedure — bend at the knees, keep your back straight, and lower the load in a controlled manner.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.step}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electrical-Specific Scenarios */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Manual Handling in Electrical Installation Work
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Electrical installation work presents unique manual handling challenges that generic
              training courses do not address. The Elec-Mate course covers these specific scenarios
              in detail, ensuring you can apply safe handling techniques to the actual tasks you
              perform every day.
            </p>
            <p>
              <strong>Cable drums</strong> are one of the heaviest items electricians handle
              regularly. A 100-metre drum of 2.5 mm twin and earth can weigh over 20 kg, while
              larger SWA cable drums can exceed 50 kg. Where possible, cable drums should be rolled
              rather than lifted, using a cable drum stand or roller for dispensing. When lifting is
              unavoidable, always use two people for drums over 20 kg and position the drum as close
              to your body as possible.
            </p>
            <p>
              <strong>Consumer units and distribution boards</strong> must often be lifted to chest
              or head height for wall mounting. A fully populated three-row consumer unit can weigh
              8 to 12 kg, which may not sound heavy but becomes a significant strain when held above
              shoulder height while securing fixings. Use a temporary support shelf or ask a
              colleague to help position the unit while you fix it to the wall.
            </p>
            <p>
              <strong>Working in confined spaces</strong> with heavy equipment presents compound
              risks. Plant rooms, risers, and ceiling voids often restrict your ability to adopt a
              good lifting posture. You may be unable to bend your knees fully, position your feet
              correctly, or keep the load close to your body. In these situations, always explore
              alternatives — can the equipment be positioned before entering the confined space? Can
              a mechanical aid such as a pulley or hoist be used?
            </p>
            <p>
              <strong>Carrying tools up ladders</strong> is a daily reality for most electricians.
              Never carry a heavy toolbox up a ladder — use a tool belt to distribute weight across
              your body and make multiple trips if necessary. A tool hoist or bucket-and-rope system
              is safer for heavier items. Your hands should be free to maintain three points of
              contact on the ladder at all times.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            What the Course Covers
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            Practical manual handling training designed specifically for the tasks electricians
            perform on site every day.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Course Modules</h2>
          <div className="space-y-4">
            {courseModules.map((mod) => (
              <div
                key={mod.number}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {mod.number}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{mod.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{mod.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left touch-manipulation h-auto min-h-[44px]"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-yellow-400 shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-white leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Protect your back, protect your career"
        subheading="Join 430+ UK electricians training smarter with Elec-Mate. 7-day free trial, cancel anytime."
      />

      <div className="h-20 sm:hidden" />
    </PublicPageLayout>
  );
}
