import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldAlert,
  Brain,
  AlertTriangle,
  HardHat,
  Flame,
  FileCheck,
  ClipboardCheck,
  CheckCircle2,
  ChevronRight,
  ArrowDown,
  HelpCircle,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'AI Health & Safety Agent | RAMS Generator for Electricians | Elec-Mate';
const PAGE_DESCRIPTION =
  'Generate comprehensive RAMS and risk assessments with AI trained for UK electrical work. HSE 5-step methodology, 80+ hazard database, CDM 2015 compliant. Professional documents in minutes.';

const faqs = [
  {
    question: 'What is the HSE 5-step risk assessment methodology?',
    answer:
      'The HSE (Health and Safety Executive) 5-step approach is the standard framework for carrying out workplace risk assessments in the UK. Step 1: Identify the hazards — look at what could cause harm in the workplace, considering activities, substances, equipment, and environmental factors. Step 2: Decide who might be harmed and how — consider employees, other contractors, building occupants, visitors, and members of the public. Step 3: Evaluate the risks and decide on precautions — for each hazard, assess the likelihood of harm occurring and the potential severity, then determine what controls are needed to reduce the risk. Step 4: Record your significant findings — document the hazards, who is at risk, and the control measures in place. Step 5: Review and update — risk assessments must be kept current and reviewed whenever circumstances change, new hazards are identified, or an incident occurs. The Elec-Mate Health and Safety Agent follows this exact methodology when generating risk assessments, ensuring every document meets HSE expectations.',
  },
  {
    question: 'How many hazards does the AI identify per job?',
    answer:
      'The Health and Safety Agent typically identifies 12 or more hazards per job, drawing from a database of over 80 hazards specific to electrical installation work. The number varies depending on the complexity and scope of the work described. A simple socket outlet change might generate 8-10 hazards (electric shock, working with hand tools, manual handling, lone working, existing installation condition, building occupants), while a full commercial rewire on an occupied site could generate 20+ hazards covering electrical risks, working at height, mechanical handling, dust and noise, asbestos, confined spaces, fire risk, coordination with other trades, public safety, and environmental factors. The AI does not simply list every possible hazard regardless of relevance — it analyses your job description and identifies the hazards that are genuinely applicable to that specific piece of work, which is exactly what site safety teams and principal contractors expect to see.',
  },
  {
    question: 'What is the hierarchy of controls used in the risk assessments?',
    answer:
      'The hierarchy of controls is the internationally recognised framework for managing workplace risks, and the Health and Safety Agent applies it systematically to every identified hazard. The hierarchy, in order of effectiveness, is: ELIMINATE — remove the hazard entirely (for example, design out the need for working at height by routing cables at floor level). SUBSTITUTE — replace a hazardous process with a less hazardous one (for example, use battery-powered tools instead of mains-powered tools to eliminate trailing cables). ENGINEER — implement physical controls (for example, install barriers around open excavations, use local exhaust ventilation for dust). ADMINISTRATIVE — implement safe systems of work, training, supervision, permits to work, signage, and safe isolation procedures. PPE — use personal protective equipment as a last resort (for example, safety boots, gloves, eye protection, hearing protection). The AI applies this hierarchy to each hazard and specifies the most effective practical control measures, rather than defaulting to PPE for everything.',
  },
  {
    question: 'Does the Health and Safety Agent generate CDM 2015 compliant documents?',
    answer:
      'Yes. The Construction (Design and Management) Regulations 2015 apply to all construction work in Great Britain, which includes electrical installation work. CDM 2015 requires contractors to plan, manage, and monitor their work to ensure it is carried out safely. The Health and Safety Agent generates risk assessments and method statements that address the specific CDM 2015 duties of contractors under Regulation 15, including: planning the work to ensure it can be carried out safely, providing adequate supervision and resources, ensuring workers are competent and have received appropriate training, cooperating with other duty holders (principal designer, principal contractor, client), and reporting anything that is likely to endanger health or safety. The generated documents include sections covering competency requirements, coordination with other contractors, welfare facilities, and site-specific arrangements that demonstrate CDM 2015 compliance.',
  },
  {
    question: 'Can I edit the AI-generated RAMS before issuing them?',
    answer:
      'Yes, you retain full editorial control over every document. The AI generates a comprehensive first draft based on your job description, but you can edit any section before issuing the final document. This is important because only you have the site-specific knowledge that the AI cannot know from a text description — for example, the specific layout of the building, the condition of the existing installation, access restrictions imposed by the client, or working hour limitations. Many electricians use the AI to generate the structure and core content (which is the time-consuming part of writing RAMS from scratch) and then add their own site-specific notes and observations. The system saves your edits and can learn from them, so if you consistently add certain hazards or control measures for particular types of work, the AI will include them automatically in future documents.',
  },
  {
    question: 'What legislation does the Health and Safety Agent reference?',
    answer:
      'The Health and Safety Agent references all UK health and safety legislation relevant to electrical installation work. The primary references include: the Health and Safety at Work etc. Act 1974 (HSWA), the Management of Health and Safety at Work Regulations 1999 (MHSW), the Construction (Design and Management) Regulations 2015 (CDM 2015), the Electricity at Work Regulations 1989 (EWR), the Work at Height Regulations 2005, the Manual Handling Operations Regulations 1992, the Control of Substances Hazardous to Health Regulations 2002 (COSHH), the Personal Protective Equipment at Work Regulations 2022, the Provision and Use of Work Equipment Regulations 1998 (PUWER), the Control of Noise at Work Regulations 2005, and the Control of Asbestos Regulations 2012. For electrical-specific requirements, it also references BS 7671:2018+A3:2024, HSE Guidance Note GS38 (electrical test equipment for use by electricians), and the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment. All references include the specific regulation numbers, making the documents easy to verify.',
  },
  {
    question: 'Does it include emergency procedures and PPE requirements?',
    answer:
      'Yes. Every RAMS document generated by the Health and Safety Agent includes a dedicated emergency procedures section and detailed PPE requirements. The emergency procedures section covers: the actions to take in the event of electric shock (including isolation, CPR, and AED use), fire evacuation procedures, first aid arrangements (location of first aid kit, names of trained first aiders if applicable, nearest A&E department with address and phone number), spillage and contamination procedures, and incident reporting requirements under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013). The PPE section specifies the minimum PPE requirements for each phase of the work — not just a generic list, but PPE matched to the specific hazards identified. For example, the document might specify insulated gloves to BS EN 60903 for live working, RPE to EN 149 FFP3 standard for silica dust exposure during chasing, and hearing protection to BS EN 352 for use during extended drilling operations.',
  },
];

const features = [
  {
    icon: AlertTriangle,
    title: 'HSE 5-Step Methodology',
    description:
      'Every risk assessment follows the HSE 5-step approach: identify hazards, decide who is at risk, evaluate risks, record findings, and review. Meets HSE expectations for all workplaces.',
  },
  {
    icon: Layers,
    title: 'Hierarchy of Controls',
    description:
      'Control measures follow ELIMINATE, SUBSTITUTE, ENGINEER, ADMIN, PPE hierarchy. The AI specifies the most effective practical controls, not just PPE for everything.',
  },
  {
    icon: ShieldCheck,
    title: 'CDM 2015 Compliant',
    description:
      'Documents address CDM 2015 contractor duties: planning, supervision, competence, cooperation, and reporting. Ready for submission to principal contractors.',
  },
  {
    icon: HardHat,
    title: '80+ Electrical Hazards',
    description:
      'Database of 80+ hazards specific to electrical installation work. Electric shock, arc flash, working at height, asbestos, confined spaces, lone working, and more.',
  },
  {
    icon: Flame,
    title: 'COSHH Integration',
    description:
      'Automatic COSHH assessments for hazardous substances in electrical work: PVC fumes, silica dust, solvents, adhesives, and insulating compounds. Integrated into every RAMS.',
  },
  {
    icon: FileCheck,
    title: 'Professional PDF Export',
    description:
      'Export branded, professional RAMS documents as PDF. Company details, logo, risk matrices, method statements, and emergency procedures — ready for site submission.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate AI Health & Safety Agent',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/ai-health-safety',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '430',
    bestRating: '5',
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

export default function AIHealthSafetyAgentPage() {
  useSEO({
    title: 'AI Health & Safety Agent | RAMS Generator for Electricians',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
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
            <Brain className="w-4 h-4" />1 of 8 Elec-AI Specialist Agents
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            AI Health &amp; Safety Agent
            <span className="block text-yellow-400 mt-1">RAMS Generator for Electricians</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Generate comprehensive, site-specific Risk Assessments and Method Statements with AI
            trained for UK electrical work. HSE 5-step methodology, 80+ hazard database, CDM 2015
            compliant. Professional documents in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Generate RAMS Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#what-is-health-safety"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              How It Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              CDM 2015 compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              12+ hazards per job
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              Part of 8 Elec-AI agents
            </span>
          </div>
        </div>
      </section>

      {/* What Is the Health & Safety Agent */}
      <section id="what-is-health-safety" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldAlert className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is the AI Health &amp; Safety Agent?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The AI Health and Safety Agent is one of eight specialist Elec-AI agents, trained
              specifically for UK electrical work and the health and safety legislation that governs
              it. It generates complete Risk Assessment and Method Statement (RAMS) documents from a
              plain-English job description, following the HSE 5-step risk assessment methodology
              and producing documents that comply with CDM 2015, the Management of Health and Safety
              at Work Regulations 1999 (MHSW), and all other relevant legislation.
            </p>
            <p>
              In the real world, RAMS are required for virtually every electrical job beyond the
              simplest domestic tasks. Principal contractors, main contractors, building managers,
              and commercial clients all require written RAMS before allowing you on site. Writing
              these from scratch is tedious — a typical RAMS document for a moderately complex job
              takes 30 to 60 minutes to produce manually, and using generic templates often results
              in vague, non-site-specific content that site safety teams will reject or query.
            </p>
            <p>
              The Health and Safety Agent solves this by generating genuinely site-specific
              documents. You describe the work and the site conditions — "consumer unit upgrade in a
              three-storey occupied office building, working in a basement plant room with limited
              ventilation, existing asbestos survey confirms no asbestos in the work area,
              coordination required with the building management company" — and the AI identifies
              every relevant hazard, scores each using a likelihood-times-severity risk matrix,
              recommends control measures following the ELIMINATE to SUBSTITUTE to ENGINEER to ADMIN
              to PPE hierarchy, and produces a detailed method statement covering the safe sequence
              of work from mobilisation to completion.
            </p>
            <p>
              The agent draws from a database of over 80 hazards specific to electrical installation
              work, including electric shock, arc flash, working at height, manual handling,
              confined spaces, asbestos exposure, silica dust, noise, lone working, fire risk, and
              coordination hazards when working alongside other trades. Each hazard is assessed with
              control measures that are practical, proportionate, and specific to the work
              described, not generic boilerplate text.
            </p>
          </div>
        </div>
      </section>

      {/* How RAMS Generation Works */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How RAMS Generation Works</h2>
          </div>
          <div className="space-y-4 my-6">
            {[
              {
                step: '1',
                title: 'Describe the Job and Site Conditions',
                text: 'Enter the job description in plain English, including the type of work, location, existing installation, site access, occupancy status, and any known hazards. For example: "Full rewire of a 1950s mid-terrace house, customer living in during the work, existing lead-sheathed cables, suspected artex ceilings."',
              },
              {
                step: '2',
                title: 'AI Identifies Hazards Using 80+ Database',
                text: 'The agent analyses your description and identifies all relevant hazards from its database of 80+ electrical work hazards. For the example above, it would identify: lead cable handling, potential asbestos in artex, dust exposure from chasing, electric shock from existing installation, working at height in stairwell, manual handling of cable drums, lone working, occupant safety, and more.',
              },
              {
                step: '3',
                title: 'Risk Assessment with Likelihood x Severity Matrix',
                text: 'Each hazard is scored using a 5x5 likelihood-times-severity matrix to produce an initial risk rating. The agent then specifies control measures following the hierarchy of controls and recalculates the residual risk rating with controls in place. This demonstrates that your controls reduce the risk to an acceptable level.',
              },
              {
                step: '4',
                title: 'Method Statement with Safe Sequence of Work',
                text: 'A detailed method statement is generated covering the complete safe sequence of work: site set-up, safe isolation, cable installation, termination, testing and commissioning, and completion. Each step includes the specific safety precautions, PPE requirements, and emergency procedures relevant to that stage of the work.',
              },
              {
                step: '5',
                title: 'Review, Edit, and Export as PDF',
                text: 'Review the complete RAMS document, add any site-specific details that only you know, and export as a professional branded PDF ready for submission to principal contractors, clients, or site safety teams. Your company details and logo are included automatically.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{item.step}</span>
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

      {/* Electrical Hazard Categories */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Electrical Hazard Categories Covered
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            {[
              {
                title: 'Electrical Hazards',
                text: 'Electric shock from live conductors, arc flash from switching operations and short circuits, burns from overheated components. Controls include safe isolation (GS38 compliant equipment), lock-off procedures, insulated tools, permits to work for live working under EWR 1989 Regulation 14.',
              },
              {
                title: 'Working at Height',
                text: 'Accessing distribution boards, cable routing through ceiling voids, lighting installation. Controls include appropriate access equipment selection (step platforms, podium steps, tower scaffolds), pre-use inspection, edge protection, and competence verification under the Work at Height Regulations 2005.',
              },
              {
                title: 'Hazardous Substances',
                text: 'PVC fumes during heat-shrinking, silica dust from wall chasing, flux and solder fumes, cleaning solvents, insulating foam compounds. COSHH assessments identify exposure routes, specify RPE standards (FFP2/FFP3), and document maximum exposure limits and first aid procedures.',
              },
              {
                title: 'Manual Handling & Ergonomics',
                text: 'Cable drums (40 kg+), consumer units, distribution boards, transformers, and containment materials. Controls include mechanical aids (drum stands, trolleys), team lifting, weight limits, and assessment under the Manual Handling Operations Regulations 1992.',
              },
            ].map((category) => (
              <div
                key={category.title}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <h3 className="font-bold text-white text-lg mb-2">{category.title}</h3>
                <p className="text-white text-sm leading-relaxed">{category.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Electricians Choose */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for Health &amp; Safety
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Trained specifically for UK electrical work. Generate professional, site-specific RAMS
            in minutes instead of hours. Part of 70 calculators, 8 AI agents, and 36+ training
            courses.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
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
        heading="Generate professional RAMS in minutes"
        subheading="Join 430+ UK electricians using AI for CDM 2015 compliant health and safety documentation. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
