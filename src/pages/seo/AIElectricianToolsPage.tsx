import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Brain,
  CircuitBoard,
  PoundSterling,
  Wrench,
  ShieldAlert,
  CalendarCheck,
  Sparkles,
  BookOpen,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PAGE_TITLE = 'AI Electrician Tools | 5 BS 7671 Trained Specialists | Elec-Mate';
const PAGE_DESCRIPTION =
  '5 AI specialists trained on BS 7671:2018 + Amendment 3. Circuit Designer, Cost Engineer, Installation Guide, and Health & Safety. Ask anything about electrical regulations.';

const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate AI Electrician Tools',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/ai-electrician',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '287',
    bestRating: '5',
  },
};

const faqData = [
  {
    question: 'How is the AI trained on BS 7671 regulations?',
    answer:
      'Each of the five AI specialists is built on a large language model that has been fine-tuned and augmented with retrieval-augmented generation (RAG) using the full text of BS 7671:2018+A2:2022, Amendment 3:2024, the IET On-Site Guide, IET Guidance Notes 1 through 8, and a curated library of real-world installation scenarios. The RAG system means the AI retrieves the exact regulation text before generating an answer, so responses cite specific regulation numbers (for example, Regulation 411.3.3 for TN system disconnection times). The training data is updated whenever new amendments or guidance notes are published, and all responses include regulation references so you can verify them independently.',
  },
  {
    question: 'Can the AI Circuit Designer produce a complete consumer unit schedule?',
    answer:
      'Yes. You describe the installation — for example, a three-bedroom semi-detached house with an EV charger, electric shower, and gas central heating — and the Circuit Designer generates a complete consumer unit schedule. This includes circuit numbers, circuit descriptions, protective device types and ratings (MCBs, RCBOs, SPDs), cable sizes with full adiabatic calculations, maximum Zs values, and the recommended consumer unit make and model. The designer accounts for diversity, applies all BS 7671 requirements including RCD protection for socket outlets and cables in walls, and generates the schedule in a format you can use directly on your EIC.',
  },
  {
    question: 'How accurate are the Cost Engineer estimates for quoting jobs?',
    answer:
      'The Cost Engineer uses live trade pricing data updated weekly from major UK electrical wholesalers, combined with labour rate benchmarks from industry surveys. When you describe a job, the AI generates a detailed breakdown including materials (with actual part numbers and prices), labour hours based on real-world timing data from similar installations, and overhead and profit margins. Accuracy is typically within 5-10% of final actual costs for standard domestic and commercial work. You can adjust labour rates, material markup, and profit margins to match your business. The system learns from completed jobs to improve future estimates.',
  },
  {
    question: 'What types of health and safety documents can the AI generate?',
    answer:
      'The Health and Safety specialist generates risk assessments, method statements, RAMS (Risk Assessment and Method Statement) documents, COSHH assessments, permit-to-work forms, and toolbox talk documents. You describe the work — for example, "consumer unit change in an occupied domestic property with asbestos-containing artex ceilings" — and the AI produces a complete, site-specific document covering all relevant hazards, control measures, PPE requirements, emergency procedures, and legal references. Documents are formatted to industry standards and can be exported as PDFs for submission to principal contractors or clients.',
  },
  {
    question: 'Is there a limit to how many questions I can ask the AI specialists?',
    answer:
      'On the standard plan, you get 100 AI queries per month across all five specialists. The Professional plan includes 500 queries per month, and the Business plan offers unlimited queries. Each query includes the full conversation context, so follow-up questions within the same session count as a single query. For example, you can ask the Circuit Designer to create a schedule, then ask follow-up questions about specific circuits or modifications, all within one query allocation. Unused queries do not carry over to the following month.',
  },
];

const faqPageSchema = {
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Use AI Electrician Tools for BS 7671 Compliance',
  description:
    'Step-by-step guide to using Elec-Mate AI specialists for electrical design, costing, installation guidance, maintenance planning, and health and safety documentation.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Choose your AI specialist',
      text: 'Select from five specialists: Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, or Health & Safety. Each is optimised for a specific aspect of electrical work.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Describe your project',
      text: 'Enter details about the installation, job, or question. For example, describe the property type, circuits needed, or hazards present. The more detail you provide, the more accurate the response.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Review the AI response with regulation references',
      text: 'The AI generates a detailed response citing specific BS 7671 regulation numbers. Review the output and verify key references against the regulations. Ask follow-up questions to refine the result.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Export or apply the result',
      text: 'Export circuit schedules, cost breakdowns, RAMS documents, or method statements as PDFs. Apply cable sizing recommendations to your design. Use the output directly in your certification and documentation.',
    },
  ],
};

const features = [
  {
    icon: CircuitBoard,
    title: 'Circuit Designer',
    description:
      'Adiabatic cable sizing, consumer unit layouts, load schedules, and full circuit design. Generates complete schedules for EIC documentation.',
  },
  {
    icon: PoundSterling,
    title: 'Cost Engineer',
    description:
      'Live trade pricing from UK wholesalers, labour rate benchmarks, profit margin calculations. Produce detailed quotes in minutes, not hours.',
  },
  {
    icon: Wrench,
    title: 'Installation Guide',
    description:
      'Step-by-step guidance for any circuit type. From consumer unit changes to EV charger installations, with BS 7671 references throughout.',
  },
  {
    icon: CalendarCheck,
    title: 'Maintenance Agent',
    description:
      'Maintenance schedules, periodic inspection frequencies, compliance tracking. Ensures installations stay compliant between inspection cycles.',
  },
  {
    icon: ShieldAlert,
    title: 'Health & Safety',
    description:
      'RAMS, risk assessments, method statements, COSHH assessments, and permit-to-work documents. Site-specific and ready for submission.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671 Knowledge Base',
    description:
      'Every response cites specific regulation numbers. The AI retrieves exact regulation text through RAG before generating answers.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left touch-manipulation h-auto min-h-[44px]"
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-white leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function AIElectricianToolsPage() {
  useSEO({
    title: 'AI Electrician Tools | 5 BS 7671 Trained Specialists',
    description: PAGE_DESCRIPTION,
    schema: softwareApplicationSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareApplicationSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqPageSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Brain className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">5 AI Specialists Trained on BS 7671</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            AI Tools Built for{' '}
            <span className="text-yellow-400">UK Electricians</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Five purpose-built AI specialists trained on BS 7671:2018, Amendment 2:2022, and Amendment 3:2024. Design
            circuits, quote jobs, get installation guidance, plan maintenance, and generate health and safety documents
            — all with regulation references you can verify.
          </p>
          <Link to="/auth/signup">
            <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black touch-manipulation transition-transform">
              Try AI Tools Free for 7 Days
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-5 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Five Specialists, One Platform
          </h2>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Deep Content: Circuit Designer */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CircuitBoard className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Circuit Designer — Complete Electrical Design from a Description
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Circuit Designer is the most technically advanced of the five specialists. It takes a plain-English
              description of an installation and produces a complete electrical design that you can take straight to site.
              Describe a property — "four-bedroom detached house, electric vehicle charger in the garage, 10.8kW
              electric shower, induction hob, gas boiler, combination of LED downlights and pendant lights throughout"
              — and the AI generates a full consumer unit schedule, circuit-by-circuit.
            </p>
            <p>
              For each circuit, the designer specifies the protective device type and rating (MCB or RCBO, with the
              correct type — Type B for resistive loads, Type C for small motor loads, Type D for large inductive loads),
              the cable type and size calculated using the full adiabatic method from BS 7671 Appendix 4, the maximum
              Zs value for the chosen protective device rating, and whether additional RCD protection is required under
              Regulation 411.3.3. The calculations account for all correction factors: ambient temperature (Ca),
              grouping (Cg), thermal insulation (Ci), and the semi-enclosed fuse factor (Cc) where applicable.
            </p>
            <p>
              The designer also handles the newer requirements of BS 7671. For EV charger circuits, it specifies Type A
              RCD protection (or Type B where required by the charger manufacturer), applies the correct cable sizing
              for continuous load (the charger draws rated current for hours at a time, so a 0.94 continuous load factor
              applies for 32A devices), and ensures the cable route from the consumer unit to the garage accounts for
              any derating due to thermal insulation in walls or lofts. For electric shower circuits, it checks whether
              the incoming supply can handle the additional load and recommends a main switch upgrade or supply
              application if necessary.
            </p>
            <p>
              What makes this tool genuinely useful on the job is that it explains its reasoning. If you ask why it
              chose a 6mm cable instead of 4mm for a particular circuit, it walks you through the calculation step by
              step, citing the specific BS 7671 tables used at each stage. This is not a black box — it is a design
              assistant that shows its working, so you can verify every decision and take professional responsibility
              for the final design with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: Cost Engineer */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <PoundSterling className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Cost Engineer — Quote Jobs in Minutes, Not Hours
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Quoting is the part of the job most electricians dread. Underquote and you lose money. Overquote and you
              lose the job. The Cost Engineer removes the guesswork by combining live trade pricing data with real-world
              labour timing benchmarks to produce accurate, professional quotes in minutes.
            </p>
            <p>
              The system works on a simple principle: you describe the job in plain English. "Consumer unit change in a
              1970s three-bed semi, existing rewireable fuses, 8 circuits, supply is TN-C-S, meter in the hallway
              cupboard." The Cost Engineer breaks the job down into materials and labour. For materials, it generates a
              full bill of quantities with actual product names and trade prices from major UK wholesalers — not list
              prices, but the prices you actually pay with a trade account. For labour, it uses timing data from
              thousands of completed jobs to estimate how long each task takes: isolating the existing supply, removing
              the old board, installing the new consumer unit, connecting circuits, testing and commissioning, and
              completing the paperwork.
            </p>
            <p>
              The Cost Engineer also handles the business side. You set your labour rate, overhead percentage, and target
              profit margin. The AI applies these to produce a final price with a clear breakdown you can present to the
              customer. If the customer queries a specific line item, you can explain exactly what it covers. The system
              also generates a professional quote document with your company details, a description of works, terms and
              conditions, and a validity period. Over time, the Cost Engineer learns from jobs you mark as completed,
              comparing estimates to actual costs and adjusting its models to match your working speed and local pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: Installation Guide */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Wrench className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Installation Guide — Step-by-Step for Any Circuit Type
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Installation Guide is built for electricians who want clear, step-by-step procedures for any type of
              electrical work. Whether you are installing a new lighting circuit, adding an EV charger, fitting a
              bathroom extractor fan on a timer, or wiring a three-phase distribution board, the guide walks you through
              every step from isolation to testing and commissioning.
            </p>
            <p>
              Each guide starts with the prerequisites: the tools and materials you need, the regulations that apply to
              this specific type of work, and any notifications or certifications required (for example, Part P
              notification for a new circuit in a dwelling). It then provides a numbered sequence of steps, each with
              enough detail to follow without ambiguity. Steps reference specific BS 7671 regulations — for example,
              when wiring a bathroom circuit, the guide explains the zone requirements from Section 701, the IP ratings
              needed for equipment in each zone, and the requirement for supplementary bonding under Regulation 701.415.2
              (unless all circuits are RCD-protected and the main bonding is verified).
            </p>
            <p>
              The testing and commissioning section of each guide lists the specific tests required for that circuit
              type, in the correct order per GN3 (IET Guidance Note 3: Inspection and Testing). For a new circuit, this
              means continuity of protective conductors (R1+R2), continuity of ring final circuit conductors (for ring
              circuits), insulation resistance, polarity, earth fault loop impedance, prospective fault current, and
              RCD operation. The guide provides the expected values and pass/fail criteria for each test, so you know
              immediately whether the installation is compliant.
            </p>
            <p>
              Apprentices find this tool particularly valuable because it bridges the gap between theory and practice.
              You learn the regulations in college, but the Installation Guide shows you how those regulations translate
              into physical actions on site. Qualified electricians use it for less common work — not everyone installs
              three-phase supplies or commercial kitchen extracts every week, and having a regulation-referenced
              step-by-step guide eliminates the risk of missing a requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: Maintenance Agent & H&S */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CalendarCheck className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Maintenance Agent &amp; Health and Safety Specialist
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Maintenance Agent helps you create and manage maintenance schedules for electrical installations. BS
              7671 Section 341 requires that every installation is maintained to keep it in a safe condition, and the
              frequency of periodic inspection depends on the type of installation and its use. The Maintenance Agent
              knows the recommended inspection intervals from Table 3A of the IET Guidance Note 3: five years for
              domestic premises, three years for commercial, one year for construction sites and swimming pools, and
              specific intervals for other installation types.
            </p>
            <p>
              For commercial and industrial clients, the Maintenance Agent generates a complete maintenance programme
              covering periodic inspection and testing, thermographic surveys, RCD testing (the six-monthly functional
              test by pressing the test button, plus the full instrument test at the periodic inspection interval),
              emergency lighting testing (monthly short-duration and annual three-hour discharge tests per BS 5266),
              and fire alarm testing (weekly call point tests and six-monthly full system tests per BS 5839). The agent
              produces a calendar of all required maintenance activities, sends reminders to both the electrician and the
              client, and tracks compliance status so nothing falls through the cracks.
            </p>
            <p>
              The Health and Safety specialist is purpose-built for the documentation that electricians need on every
              job. In the real world, principal contractors, local authorities, and commercial clients increasingly
              require formal RAMS (Risk Assessment and Method Statement) documents before you are allowed on site.
              Writing these from scratch is tedious and time-consuming. Our Health and Safety AI generates complete,
              site-specific RAMS documents from a brief description of the work and the site conditions.
            </p>
            <p>
              Describe the job — "second fix in a new-build primary school, working at height on scaffolding in the
              assembly hall, chasing walls for containment, dust and noise considerations, occupied adjacent classrooms"
              — and the AI produces a risk assessment covering every identified hazard with likelihood and severity
              ratings, control measures, residual risk scores, and responsible persons. The method statement provides a
              step-by-step procedure for the work, PPE requirements at each stage, permits required, emergency
              procedures, and environmental considerations. All documents reference current legislation including the
              Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, the Work at Height
              Regulations 2005, and the Construction (Design and Management) Regulations 2015.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Choose your specialist',
                description:
                  'Pick from Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, or Health & Safety depending on what you need.',
              },
              {
                step: '2',
                title: 'Describe your project in plain English',
                description:
                  'No special syntax needed. Just describe the job, the property, and what you need. The AI asks clarifying questions if it needs more detail.',
              },
              {
                step: '3',
                title: 'Review the response with BS 7671 references',
                description:
                  'Every recommendation cites specific regulation numbers. The AI retrieves the exact regulation text before generating its response, so you can verify every claim.',
              },
              {
                step: '4',
                title: 'Export and use on site',
                description:
                  'Download circuit schedules, quotes, RAMS documents, and maintenance plans as PDFs. Use them directly in your certification, client communications, and site documentation.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="text-yellow-400 font-bold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BS 7671 Training Details */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Trained on BS 7671:2018 + Amendment 3:2024
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The accuracy of any AI tool depends entirely on the quality of its training data. That is why we have
              invested heavily in building a comprehensive knowledge base that covers the full scope of the IET Wiring
              Regulations and supporting guidance documents.
            </p>
            <p>
              The core training data includes BS 7671:2018+A2:2022, which is the current 18th Edition of the IET Wiring
              Regulations — the standard that governs every electrical installation in the United Kingdom. It also
              includes Amendment 3:2024 (A3:2024), issued on 31 July 2024, which adds Regulation 530.3.201 covering
              the requirements for bidirectional and unidirectional protective devices. This amendment is particularly
              relevant for installations with battery storage systems, solar PV, and other sources of reverse power flow,
              where standard unidirectional devices may not provide adequate protection.
            </p>
            <p>
              Beyond the core regulations, the AI draws on the IET On-Site Guide, which provides simplified tables and
              procedures for common installation work; all eight IET Guidance Notes covering selection and erection,
              inspection and testing, protection against overcurrent, protection against fire, protection against
              electric shock, protection against electromagnetic disturbances, special installations and locations, and
              earthing and bonding; and a curated library of real-world installation case studies and worked examples.
            </p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              'BS 7671:2018+A2:2022 (18th Edition)',
              'Amendment 3:2024 (A3:2024)',
              'IET On-Site Guide',
              'IET Guidance Notes 1-8',
              'GN3: Inspection & Testing (9th Edition)',
              'Real-world installation case studies',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqData.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Ask your first question in 30 seconds"
        subheading="Join 430+ UK electricians using AI to save hours on design, quoting, and documentation. 7-day free trial, cancel anytime."
      />
    </PublicPageLayout>
  );
}
