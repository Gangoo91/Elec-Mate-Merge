import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Construction,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowDown,
  HelpCircle,
  AlertTriangle,
  ClipboardCheck,
  Brain,
  Target,
  Users,
  Award,
  Layers,
  Ruler,
  Wind,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'PASMA Training Course Online | Mobile Tower Scaffolding | Elec-Mate';
const PAGE_DESCRIPTION =
  'Study PASMA (Prefabricated Access Suppliers and Manufacturers Association) training online. Tower assembly, safe working heights, inspection requirements. Mock exams included.';

const faqs = [
  {
    question: 'What is PASMA and why do electricians need it?',
    answer:
      'PASMA stands for the Prefabricated Access Suppliers and Manufacturers Association. It is the recognised UK trade association for the mobile access tower industry and the leading provider of tower scaffold training. PASMA training teaches operatives how to assemble, alter, inspect, and dismantle mobile aluminium towers safely and in accordance with the Work at Height Regulations 2005. Electricians need PASMA certification because mobile towers are one of the most common forms of access used in electrical installation and maintenance work. Whether installing lighting, running cable trays, fitting distribution boards at height, or carrying out periodic inspection and testing in commercial premises, electricians frequently need a safe, stable working platform that provides hands-free access. On most construction sites and many commercial premises, only personnel holding a valid PASMA certificate are permitted to erect or alter mobile towers.',
  },
  {
    question: 'What is the 3T method (Through the Trap) for tower assembly?',
    answer:
      'The 3T method — Through the Trap — is the PASMA-approved technique for safely ascending a mobile tower and adding platform levels during assembly. The method uses trapdoor platforms that allow the operative to climb through the platform from below, close the trapdoor behind them, and then stand on the platform to add the next level of frames and bracing. The key safety principle is that the operative is always working from within the protection of the guardrails — they never have to climb onto an unguarded platform or lean outside the tower structure to add components. The sequence is: climb the internal ladder to the trapdoor platform, open the trap, climb through, close the trap, stand on the platform, add guardrail frames at the next level, add bracing and toeboards, add the next trapdoor platform, and repeat. This method significantly reduces the risk of falling compared to older techniques where operatives climbed the outside of the tower.',
  },
  {
    question: 'What are the maximum safe working heights for mobile towers?',
    answer:
      'The maximum safe working height for a mobile tower depends on whether it is used indoors or outdoors, and on its base dimensions. For standard towers used indoors (where wind loading is not a factor), the maximum height is typically 12 metres to the platform level. For towers used outdoors, the maximum height is reduced because of wind loading — typically 8 metres to the platform level for a standard single-width tower (0.7m x 1.8m base) and up to 10 metres for a double-width tower (1.35m x 1.8m base). These figures are general guidelines — the actual maximum height is specified by the manufacturer for each specific tower system and must never be exceeded. The base-to-height ratio is the critical factor: for indoor use, the ratio should not exceed 3.5:1 (height to minimum base dimension), and for outdoor use it should not exceed 3:1. Outriggers or stabilisers can be used to increase the effective base dimension and therefore allow greater heights.',
  },
  {
    question: 'What inspection requirements apply to mobile towers?',
    answer:
      'Mobile towers must be inspected at several points: before first use after assembly; after any alteration that could affect stability or structural integrity; after any event likely to have affected stability (such as adverse weather, impact, or ground movement); and at regular intervals not exceeding 7 days if the tower remains erected. The inspection should check: all components are present and correctly assembled; frames, braces, and platforms are securely locked in position; the base is on firm, level ground with all castors locked; guardrails and toeboards are in place at the working platform level; outriggers or stabilisers are fitted where required; the tower is vertical and not leaning; no components are damaged, bent, or corroded; and the tower has not been overloaded beyond its rated capacity. Under the Work at Height Regulations 2005, inspection results must be recorded in writing and the records kept until the next inspection. A competent person (someone who has received appropriate training, such as PASMA) must carry out or supervise the inspection.',
  },
  {
    question: 'What wind speed limits apply to mobile towers?',
    answer:
      'Mobile towers are particularly susceptible to wind loading because of their height-to-base ratio and lightweight construction. PASMA guidance states that towers should not be used when wind speeds exceed 17 mph (7.7 m/s) as a general rule for occupied towers. If wind speed is likely to reach gale force (39 mph / 17.5 m/s), the tower should be tied to a rigid structure or dismantled. During erection and dismantling, wind speeds should be below the limits specified by the manufacturer. The operative should be aware that wind speed increases with height — a wind speed that feels moderate at ground level may be significantly stronger at the top of a 10-metre tower. Wind speed can be measured using a handheld anemometer, which many electricians now carry as part of their standard kit. If in doubt, the tower should not be used and alternative access methods should be considered.',
  },
  {
    question:
      'What is the difference between a PASMA Towers for Users and a PASMA Combined course?',
    answer:
      'PASMA offers several training courses at different levels. The most common are: PASMA Towers for Users — a one-day course that teaches operatives how to assemble, use, inspect, and dismantle standard configuration mobile towers using the 3T (Through the Trap) method. This is the most widely required qualification and is sufficient for most electricians who use mobile towers on site. PASMA Combined (Towers for Users plus Low Level Access) — a course that adds training on the safe use of low-level access equipment such as podium steps, pulpits, and step-stools alongside the standard tower training. This is increasingly popular because much electrical work takes place at heights below 2 metres where a full tower is unnecessary. PASMA Towers for Managers — designed for site managers and supervisors who need to understand tower safety requirements but may not assemble towers themselves. Each course results in a PASMA card valid for five years.',
  },
];

const features = [
  {
    icon: Construction,
    title: '3T Assembly Method Training',
    description:
      'Step-by-step study material covering the Through the Trap (3T) assembly technique, including frame locking, brace positioning, guardrail fitting, and safe platform installation.',
  },
  {
    icon: Ruler,
    title: 'Height and Stability Calculations',
    description:
      'Understand base-to-height ratios, outrigger requirements, and maximum heights for indoor and outdoor use. Interactive examples for common tower configurations.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspection and Compliance',
    description:
      'Learn the 7-day inspection cycle, what to check, how to record results, and your legal obligations under the Work at Height Regulations 2005.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Mock Exams',
    description:
      'Practise with hundreds of PASMA theory questions. Elec-AI provides instant feedback, explains correct answers, and identifies areas where you need further study.',
  },
  {
    icon: Wind,
    title: 'Weather and Environmental Hazards',
    description:
      'Understand wind speed limits, ground condition assessment, proximity to overhead power lines, and the environmental factors that affect tower safety.',
  },
  {
    icon: Award,
    title: 'Part of 36+ Training Courses',
    description:
      "PASMA training sits within Elec-Mate's library of 36+ courses, including IPAF, asbestos awareness, working at height, and BS 7671:2018+A3:2024.",
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'PASMA Training Course Online — Mobile Tower Scaffolding for Electricians',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
  },
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'GBP',
    description: 'From £4.99/month — access all 36+ training courses',
  },
  courseMode: 'online',
  educationalLevel: 'Professional',
  inLanguage: 'en-GB',
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

export default function PASMATrainingPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...courseSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Construction className="w-4 h-4" />
            Part of 36+ Training Courses
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            PASMA Training Course Online
            <span className="block text-yellow-400 mt-1">Mobile Tower Scaffolding Safety</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Study PASMA tower scaffold theory at your own pace. Assembly sequences, the 3T method,
            safe working heights, inspection requirements, and wind speed limits — with AI-powered
            mock exams and instant feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#what-youll-learn"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See Course Content
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              430+ electricians learning
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />8 Elec-AI agents
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              70 calculators included
            </span>
          </div>
        </div>
      </section>

      {/* What is PASMA */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is PASMA Certification?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              PASMA (Prefabricated Access Suppliers and Manufacturers Association) is the recognised
              trade association for the mobile access tower industry in the UK. PASMA training
              provides operatives with the knowledge and practical skills to assemble, use, inspect,
              alter, and dismantle mobile aluminium scaffold towers safely. The PASMA card, valid
              for five years, is the industry-standard proof of competence that most construction
              sites and commercial clients require before allowing personnel to erect or work from
              mobile towers.
            </p>
            <p>
              Electricians are among the most frequent users of mobile towers. The nature of
              electrical installation work means that access to ceilings, cable routes, lighting
              positions, and elevated distribution equipment is a daily requirement. Mobile towers
              provide a stable, level working platform that allows electricians to work with both
              hands free — essential when routing cables, terminating connections, or testing
              circuits at height. Unlike ladders, towers offer guardrail protection, a generous
              working area for tools and materials, and the ability to move along a workface without
              repeatedly descending and repositioning.
            </p>
            <p>
              The legal framework underpinning PASMA training includes the Work at Height
              Regulations 2005, which require that work at height is properly planned, that those
              involved are competent, that equipment is properly inspected and maintained, and that
              the hierarchy of controls is followed — avoid working at height where possible,
              prevent falls where it cannot be avoided, and mitigate the consequences of a fall
              where prevention is not possible. Mobile towers, when correctly assembled and used,
              provide an effective means of fall prevention through their integral guardrail system.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="what-youll-learn" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Target className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What You Will Learn</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Tower Types and Components',
                text: 'Understand the differences between aluminium and fibreglass towers, single-width and double-width configurations, and the components that make up a complete tower system — base plates, castors, frames, braces, platforms, toeboards, and guardrails.',
              },
              {
                title: 'The 3T (Through the Trap) Assembly Method',
                text: 'Master the PASMA-approved assembly sequence. Learn how to build a tower from base level to full height using trapdoor platforms, ensuring you are always working within the protection of guardrails at every stage of the build.',
              },
              {
                title: 'Height Calculations and Stability',
                text: 'Calculate maximum safe working heights for indoor and outdoor use. Understand base-to-height ratios (3.5:1 indoor, 3:1 outdoor), outrigger placement, stabiliser requirements, and how to assess ground conditions before erecting a tower.',
              },
              {
                title: 'Inspection and Maintenance Requirements',
                text: 'Learn the 7-day inspection cycle, pre-use checks, and how to identify damaged or defective components. Understand your record-keeping obligations under the Work at Height Regulations 2005 and who qualifies as a competent person for inspections.',
              },
              {
                title: 'Moving and Repositioning Towers',
                text: 'Understand the safe procedures for moving an assembled tower — reducing height where necessary, locking castors, checking the route for overhead obstructions and uneven surfaces, and ensuring no personnel or materials remain on the platform during movement.',
              },
              {
                title: 'Environmental Hazards and Wind Limits',
                text: 'Learn to assess wind speed using handheld anemometers, understand the 17 mph occupied limit, and know when to tie the tower to a structure or dismantle it. Assess proximity to overhead power lines and other site-specific hazards.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white leading-relaxed text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This Course For */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Users className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Who Is This Course For?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Electricians who assemble and work from mobile towers on commercial and industrial sites for cable installation, lighting, and containment work',
              'Electrical apprentices preparing for site work where PASMA certification is a contractor requirement for tower erection',
              'Self-employed electricians who need to erect their own towers on domestic and small commercial jobs without relying on scaffolding contractors',
              'Maintenance electricians who use mobile towers regularly for lamp replacement, inspection and testing, and distribution board access',
              'Electricians renewing their PASMA card who want to refresh their knowledge of assembly sequences, height calculations, and inspection requirements',
              'Site supervisors and contracts managers who need to understand tower safety requirements to properly manage and audit work at height on their projects',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Layers className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Course Structure</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Elec-Mate PASMA study course is structured into six modules covering the full
              PASMA Towers for Users syllabus. Each module includes detailed study material,
              diagrams, and AI-powered practice questions to test your understanding before moving
              on.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  module: 'Module 1',
                  title: 'Introduction and Legislation',
                  desc: 'PASMA overview, Work at Height Regulations 2005, hierarchy of controls, tower types, and industry statistics on falls from height.',
                },
                {
                  module: 'Module 2',
                  title: 'Tower Components and Setup',
                  desc: 'Base plates, adjustable legs, castors, frames, braces, platforms, guardrails, toeboards, outriggers, and stabilisers.',
                },
                {
                  module: 'Module 3',
                  title: 'Assembly Using the 3T Method',
                  desc: 'Step-by-step assembly sequence, trapdoor platform operation, advance guardrail fitting, and safe working practices during erection.',
                },
                {
                  module: 'Module 4',
                  title: 'Safe Use and Working Practices',
                  desc: 'Loading limits, ladder access, platform working area, tool and material management, and protection of the public.',
                },
                {
                  module: 'Module 5',
                  title: 'Inspection and Record Keeping',
                  desc: '7-day inspection cycle, pre-use checks, defect identification, reporting procedures, and documentation requirements.',
                },
                {
                  module: 'Module 6',
                  title: 'Dismantling and Environmental Hazards',
                  desc: 'Safe dismantling sequence, moving assembled towers, wind speed limits, overhead obstructions, and ground condition assessment.',
                },
              ].map((mod, index) => (
                <div key={index} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-yellow-400 font-bold text-sm mb-1">{mod.module}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{mod.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Study PASMA with Elec-Mate?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            AI-powered study tools, mock exams with instant feedback, and a complete library of 36+
            courses — all from your mobile device.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Start Your PASMA Study Today"
        subheading="Join 430+ UK electricians using Elec-Mate for training and professional development. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
