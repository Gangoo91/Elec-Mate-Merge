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
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'IPAF Training Course Online | MEWP Safety | Elec-Mate';
const PAGE_DESCRIPTION =
  'Study IPAF (International Powered Access Federation) training online. MEWP categories, pre-use checks, safe operation, emergency procedures. Practice with mock exams and AI-powered study tools.';

const faqs = [
  {
    question: 'What is IPAF and why do electricians need it?',
    answer:
      'IPAF stands for the International Powered Access Federation. It is the global organisation that promotes the safe and effective use of powered access equipment, including mobile elevating work platforms (MEWPs) such as cherry pickers, scissor lifts, and boom lifts. Electricians frequently need IPAF certification because a significant proportion of electrical work takes place at height — installing lighting in warehouses, running cable trays at ceiling level, maintaining distribution boards in plant rooms with elevated access, and carrying out external works on commercial buildings. Many principal contractors and site managers now require all operatives using MEWPs to hold a valid IPAF PAL (Powered Access Licence) card before they are permitted to operate the equipment on site. Without IPAF training, electricians may be refused access to powered platforms, limiting the range of work they can undertake.',
  },
  {
    question: 'What MEWP categories are covered in IPAF training?',
    answer:
      'IPAF categorises MEWPs by type and drive capability. The most common categories for electricians are: Category 3a — Mobile Vertical (scissor lifts that move vertically only, commonly used indoors for ceiling work); Category 3b — Mobile Boom (cherry pickers and boom lifts with articulating or telescopic arms, used for reaching over obstacles or accessing external elevations); and Category 1b — Static Boom (vehicle-mounted or trailer-mounted platforms that do not travel while elevated). Each category requires separate training and certification because the operating characteristics, hazards, and rescue procedures differ significantly between machine types. Many electricians choose to train on both 3a and 3b as this covers the majority of powered access situations encountered on commercial and industrial sites.',
  },
  {
    question: 'What does IPAF pre-use inspection involve?',
    answer:
      'Before operating any MEWP, the operator must carry out a thorough pre-use inspection to verify the machine is safe to use. This includes checking the structural integrity of the platform, guardrails, and access gates; inspecting hydraulic hoses and connections for leaks or damage; testing all controls (ground-level and platform-level) to ensure they respond correctly; checking the emergency lowering system operates; verifying tyre condition and pressure (for mobile machines); checking outrigger pads and stabilisers where fitted; confirming the safety harness and lanyard attachment points are in good condition; inspecting the operator manual is present and the machine is within its service interval; and ensuring the rated capacity plate is readable and understood. Any defects found must be reported immediately and the machine must not be used until faults are rectified. This daily pre-use check is a legal requirement under the Provision and Use of Work Equipment Regulations 1998 (PUWER) and the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER).',
  },
  {
    question: 'What emergency procedures are covered in IPAF training?',
    answer:
      'IPAF training covers several emergency scenarios that operators must be prepared for. Emergency lowering procedures — every MEWP has a ground-level emergency lowering system that allows the platform to be brought down if the operator becomes incapacitated or the normal controls fail. Operators must know the location and operation of this system on every machine they use. Rescue planning — before any work at height begins, a rescue plan must be in place. This must account for how a casualty will be recovered from the platform if they are injured or become unconscious. Entrapment awareness — boom-type machines carry a risk of the operator being trapped between the platform and an overhead structure. Operators must maintain awareness of their surroundings and use secondary guarding devices where fitted. Machine failure — procedures for dealing with hydraulic failure, electrical failure, and tilt alarm activation. Wind and weather — procedures for ceasing work when wind speed exceeds the manufacturer rated limit (typically 12.5 m/s or 28 mph for most MEWPs).',
  },
  {
    question: 'How long is an IPAF PAL card valid for?',
    answer:
      'The IPAF PAL (Powered Access Licence) card is valid for five years from the date of issue. Before the card expires, the operator must complete a renewal course and pass the assessment to obtain a new card. The renewal course is typically shorter than the initial training because it assumes existing knowledge and focuses on refreshing key safety procedures, updating knowledge of any changes to regulations or best practice, and re-validating practical competence. It is the operator responsibility to ensure their card remains in date — most principal contractors will check PAL card validity before allowing access to MEWPs on site. Operating a MEWP with an expired PAL card may invalidate insurance cover and could result in prohibition notices from the HSE.',
  },
  {
    question: 'Do I need to wear a harness in a scissor lift?',
    answer:
      'The requirement for harness use depends on the type of MEWP and the manufacturer instructions. In scissor lifts (Category 3a), a full body harness is generally not required because the platform is enclosed by guardrails and the risk of ejection is low — the platform moves vertically only, without the lateral movement that creates ejection forces. However, some site-specific rules and some manufacturers do require harness use even in scissor lifts, so the operator must always check the machine manual and the site safety rules. In boom-type machines (Category 3b), a full body harness with a short restraint lanyard is always required. The lanyard must be attached to the designated anchor point inside the platform basket — never to the structure being worked on. The purpose is fall restraint (preventing the operator from being thrown out of the basket), not fall arrest. The lanyard must be short enough that the operator cannot climb over or be ejected past the guardrails.',
  },
];

const features = [
  {
    icon: Construction,
    title: 'All MEWP Categories Covered',
    description:
      'Study material covering Category 3a (scissor lifts), 3b (boom lifts), and 1b (static boom) with detailed operating procedures for each machine type.',
  },
  {
    icon: ShieldCheck,
    title: 'Pre-Use Inspection Checklists',
    description:
      'Interactive checklists covering every item in the IPAF pre-use inspection sequence. Practise identifying defects and understanding when to remove a machine from service.',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Procedures Training',
    description:
      'Detailed walkthroughs of emergency lowering, rescue planning, entrapment avoidance, and weather-related shutdown procedures for every MEWP category.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Mock Exams',
    description:
      'Hundreds of practice questions covering IPAF theory. Elec-AI provides instant feedback and explains the reasoning behind every correct answer.',
  },
  {
    icon: ClipboardCheck,
    title: 'LOLER & PUWER Compliance',
    description:
      'Understand your legal obligations under LOLER 1998 and PUWER 1998 when operating powered access equipment. Know what records must be kept and by whom.',
  },
  {
    icon: Award,
    title: 'Part of 36+ Training Courses',
    description:
      'IPAF training sits within a library of 36+ courses in Elec-Mate, covering everything from BS 7671:2018+A3:2024 to PASMA, asbestos awareness, and first aid.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'IPAF Training Course Online — MEWP Safety for Electricians',
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

export default function IPAFTrainingPage() {
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
            IPAF Training Course Online
            <span className="block text-yellow-400 mt-1">MEWP Safety for Electricians</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Study IPAF powered access theory at your own pace. MEWP categories, pre-use inspections,
            safe operation, emergency lowering procedures, and harness requirements — with
            AI-powered mock exams and instant feedback.
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

      {/* What is IPAF */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is IPAF Certification?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The International Powered Access Federation (IPAF) is the globally recognised body
              that sets standards for the safe use of powered access equipment. IPAF training leads
              to the PAL (Powered Access Licence) card, which is the industry-standard proof of
              competence for operating mobile elevating work platforms (MEWPs) — commonly known as
              cherry pickers, scissor lifts, boom lifts, and vehicle-mounted platforms.
            </p>
            <p>
              For electricians, IPAF certification is increasingly essential. A large proportion of
              commercial and industrial electrical work takes place at height — installing lighting
              systems in warehouses, fitting cable trays and containment at ceiling level,
              maintaining distribution boards in elevated plant rooms, running cables across factory
              roofs, and carrying out external works on building facades. On many construction sites
              and commercial premises, principal contractors now require all operatives who use
              MEWPs to hold a valid IPAF PAL card. Without it, electricians may be refused
              permission to operate the equipment, forcing them to rely on others to position the
              platform — slowing down work and reducing their value on site.
            </p>
            <p>
              IPAF training covers the theory and practical knowledge needed to operate MEWPs
              safely. This includes understanding the different categories of machine, carrying out
              pre-use inspections, operating the controls safely, understanding stability and load
              limits, working near hazards such as overhead power lines and traffic, using personal
              protective equipment correctly, and knowing the emergency procedures for every
              scenario — from hydraulic failure to operator incapacitation.
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
                title: 'MEWP Categories and Selection',
                text: 'Understand the differences between Category 3a (mobile vertical / scissor lifts), Category 3b (mobile boom / cherry pickers), and Category 1b (static boom / vehicle-mounted). Learn when each type is appropriate and how to select the right machine for the task.',
              },
              {
                title: 'Pre-Use Inspection Procedures',
                text: 'Master the daily pre-use inspection sequence required before any MEWP is operated. Covers structural checks, hydraulic system inspection, control testing, emergency lowering verification, tyre and outrigger assessment, and documentation requirements under PUWER and LOLER.',
              },
              {
                title: 'Safe Operation and Controls',
                text: 'Learn ground-level and platform-level control operation for each MEWP category. Understand rated capacity, working envelope, wind speed limits, slope restrictions, and the importance of maintaining three points of contact when accessing the platform.',
              },
              {
                title: 'Exclusion Zones and Hazard Awareness',
                text: 'Identify and manage hazards including overhead power lines, underground services, pedestrian traffic, uneven ground, and overhead obstructions. Understand the requirements for exclusion zones and the use of banksmen when operating near traffic or pedestrians.',
              },
              {
                title: 'Harness and Fall Protection',
                text: 'Understand when a full body harness is required (boom-type machines) and when guardrails alone provide sufficient protection (scissor lifts). Learn correct harness fitting, lanyard selection (restraint vs arrest), and anchor point identification.',
              },
              {
                title: 'Emergency Procedures and Rescue Planning',
                text: 'Master emergency lowering from ground level, rescue plan development, entrapment avoidance on boom machines, and procedures for hydraulic failure, electrical failure, and adverse weather. Understand why a rescue plan must be in place before any work at height begins.',
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
              'Electricians working on commercial or industrial sites where MEWPs are used for cable installation, lighting, and distribution board access',
              'Electrical apprentices preparing for site work where IPAF certification is a contractor requirement',
              'Self-employed electricians looking to expand the range of work they can accept by adding powered access competence',
              'Maintenance electricians who regularly use scissor lifts or boom lifts for lamp replacement, testing, and inspection work',
              'Electricians renewing their IPAF PAL card who want to refresh their theory knowledge before the renewal course',
              'Electrical contractors preparing their teams for IPAF practical assessments by building a strong foundation of theory knowledge',
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
              The Elec-Mate IPAF study course is structured into six comprehensive modules that
              mirror the IPAF training syllabus. Each module contains detailed reading material,
              interactive diagrams, and practice questions with instant AI-powered feedback. The
              course is designed to be completed at your own pace — whether you are preparing for
              your first IPAF practical course or refreshing your knowledge ahead of a PAL card
              renewal.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  module: 'Module 1',
                  title: 'Introduction to Powered Access',
                  desc: 'MEWP types, categories, legislation (WAHR 2005, LOLER 1998, PUWER 1998), and IPAF organisation overview.',
                },
                {
                  module: 'Module 2',
                  title: 'Pre-Use Inspections',
                  desc: 'Daily check procedures, structural integrity, hydraulic systems, control function testing, and defect reporting.',
                },
                {
                  module: 'Module 3',
                  title: 'Safe Operation',
                  desc: 'Controls operation, rated capacity, working envelope, ground conditions, slope limits, and pedestrian management.',
                },
                {
                  module: 'Module 4',
                  title: 'Hazard Awareness',
                  desc: 'Overhead power lines, underground services, exclusion zones, wind speed limits, and environmental hazards.',
                },
                {
                  module: 'Module 5',
                  title: 'Personal Protective Equipment',
                  desc: 'Harness types, lanyard selection, anchor points, restraint vs arrest systems, and helmet requirements.',
                },
                {
                  module: 'Module 6',
                  title: 'Emergency Procedures',
                  desc: 'Emergency lowering, rescue planning, entrapment avoidance, machine failure response, and adverse weather protocols.',
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
            Why Study IPAF with Elec-Mate?
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
        heading="Start Your IPAF Study Today"
        subheading="Join 430+ UK electricians using Elec-Mate for training and professional development. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
