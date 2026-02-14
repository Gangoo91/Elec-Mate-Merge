import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldCheck,
  Zap,
  FileText,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Smartphone,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Brain,
  HardHat,
  Flame,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'RAMS Generator for Electricians | AI Risk Assessments | Elec-Mate';
const PAGE_DESCRIPTION =
  'Generate professional RAMS (Risk Assessments & Method Statements) for electrical work using AI. CDM 2015 compliant, COSHH integration, site-specific hazards. Built for UK electricians.';

const faqs = [
  {
    question: 'What are RAMS and why do electricians need them?',
    answer:
      'RAMS stands for Risk Assessment and Method Statement. They are two separate but related documents that together describe the hazards associated with a piece of work, the control measures to manage those hazards, and the step-by-step method for carrying out the work safely. Under the Health and Safety at Work etc. Act 1974 and the Management of Health and Safety at Work Regulations 1999, every employer has a legal duty to carry out suitable and sufficient risk assessments for all work activities. If you employ five or more people, those assessments must be recorded in writing. Even if you are a sole trader, most commercial clients, principal contractors, and main contractors will require written RAMS before you are permitted to start work on their site. In practice, RAMS are now a universal requirement for any electrical work beyond the simplest domestic jobs.',
  },
  {
    question: 'Does Elec-Mate generate RAMS that comply with CDM 2015?',
    answer:
      'Yes. The Elec-Mate AI RAMS generator produces documents that align with the Construction (Design and Management) Regulations 2015. CDM 2015 places duties on all parties involved in construction work, including contractors. As a contractor, you must plan, manage, and monitor your own work to ensure it is carried out safely. This includes producing risk assessments and method statements that are specific to the work you are undertaking on that particular site. Elec-Mate generates site-specific RAMS based on the job description, location, and scope of work you provide, rather than producing generic template documents. The output includes hazard identification, risk ratings using a likelihood-times-severity matrix, control measures, emergency procedures, and a detailed method statement — all of which are expected under CDM 2015.',
  },
  {
    question: 'Can the AI generate COSHH assessments for electrical work?',
    answer:
      'Yes. The Elec-Mate RAMS generator includes COSHH (Control of Substances Hazardous to Health) assessment sections where relevant. For electrical work, common hazardous substances include PVC cable fumes during soldering or heat-shrinking, flux residues, cleaning solvents, insulating foams and compounds, fire-retardant sprays, and dust from chasing walls or drilling concrete (which may contain silica). The AI identifies substances relevant to your specific job description and generates appropriate COSHH data including the substance name, hazard classification, exposure routes, maximum exposure limits where applicable, required PPE, storage requirements, and emergency first-aid procedures. This is integrated directly into the RAMS document so you have a single comprehensive safety pack for the job.',
  },
  {
    question: 'How long does it take to generate a complete RAMS document?',
    answer:
      'The AI typically generates a complete, site-specific RAMS document in under 60 seconds. You provide the job description (for example, "Consumer unit upgrade in a two-storey domestic property, replacing a plastic CU with a metal AMD3 board, existing TN-C-S supply"), and the AI produces a full risk assessment with hazard identification, risk ratings, and control measures, plus a detailed method statement with step-by-step procedures. You can then review, edit, and customise the output before exporting it as a professional PDF. Compared to writing RAMS manually from scratch — which typically takes 30 to 60 minutes per document — or adapting a generic template — which still takes 15 to 30 minutes and often produces vague, non-site-specific content — the AI approach saves significant time while producing better, more specific documents.',
  },
  {
    question: 'Are AI-generated RAMS accepted by principal contractors?',
    answer:
      'Yes, provided the content is site-specific and covers the required elements. Principal contractors and client safety teams review RAMS for substance, not for how they were produced. They want to see that you have identified the specific hazards for that particular job on that particular site, that your control measures are practical and appropriate, and that your method statement describes a safe sequence of work. Generic template RAMS that list every possible hazard regardless of relevance are actually more likely to be rejected than AI-generated documents that are tailored to the specific scope of work. Elec-Mate produces RAMS that are specific to the job you describe, which is exactly what site safety teams expect to see.',
  },
  {
    question: 'What electrical-specific hazards does the RAMS generator cover?',
    answer:
      'The RAMS generator is purpose-built for electrical work and covers all common electrical hazards including: electric shock and burns from contact with live conductors, arc flash from short circuits or switching operations, working at height when accessing distribution boards in elevated positions or running cables through ceiling voids, manual handling of heavy items such as consumer units and cable drums, working in confined spaces such as risers and plant rooms, asbestos exposure risk in older buildings when chasing walls or lifting floor tiles, fire risk during hot works such as soldering or heat-shrinking near combustible materials, lone working on domestic jobs, noise exposure from drilling and chasing, dust exposure from cutting chases in masonry, and the specific risks associated with live working where permitted under the Electricity at Work Regulations 1989.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Generation',
    description:
      'Describe your job in plain English and the AI generates a complete, site-specific RAMS document in under 60 seconds. No more copying generic templates.',
  },
  {
    icon: ShieldCheck,
    title: 'CDM 2015 Compliant',
    description:
      'Every generated document aligns with the Construction (Design and Management) Regulations 2015. Hazard identification, risk matrices, and control measures all included.',
  },
  {
    icon: Flame,
    title: 'COSHH Integration',
    description:
      'Automatic COSHH assessments for hazardous substances relevant to your electrical work. PVC fumes, solvents, silica dust, and more — all identified and documented.',
  },
  {
    icon: HardHat,
    title: 'Electrical-Specific Hazards',
    description:
      'Purpose-built for electricians. Covers electric shock, arc flash, working at height, live working, asbestos risk, and all common site hazards for electrical contractors.',
  },
  {
    icon: FileText,
    title: 'Professional PDF Export',
    description:
      'Export your RAMS as a branded, professional PDF ready to submit to principal contractors, clients, and site safety teams. Your company details and logo included.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Generate and edit RAMS even without signal. Perfect for basement plant rooms, new-build sites with no Wi-Fi, and rural locations. Syncs when connectivity returns.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate RAMS Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'AI-powered RAMS generator for UK electricians. Produces CDM 2015 compliant risk assessments and method statements from job descriptions. Part of 70+ electrical tools and calculators.',
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

export default function RAMSGeneratorPage() {
  useSEO({
    title: 'RAMS Generator for Electricians | AI Risk Assessments',
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
            <Brain className="w-4 h-4" />8 AI Agents + 12 AI Tools Included
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            AI RAMS Generator
            <span className="block text-yellow-400 mt-1">for Electricians</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Generate professional, site-specific Risk Assessments and Method Statements in under 60
            seconds. CDM 2015 compliant. Purpose-built for UK electrical contractors.
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
              href="#what-are-rams"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Learn About RAMS
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What Are RAMS */}
      <section id="what-are-rams" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Are RAMS?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              RAMS is the industry abbreviation for Risk Assessment and Method Statement. Despite
              being referred to as a single document, RAMS actually comprises two distinct but
              complementary parts that together form a comprehensive safety package for any piece of
              work.
            </p>
            <p>
              The <strong className="text-yellow-400">Risk Assessment</strong> identifies the
              hazards associated with the work, evaluates the likelihood and severity of harm from
              each hazard, and specifies the control measures that will be implemented to reduce the
              risk to an acceptable level. A proper risk assessment follows the hierarchy of
              controls: eliminate the hazard, substitute with something less hazardous, implement
              engineering controls, use administrative controls (safe systems of work, permits,
              training), and finally use personal protective equipment (PPE) as a last resort. Each
              hazard is typically rated using a risk matrix that multiplies likelihood (1-5) by
              severity (1-5) to produce a risk score before and after controls are applied.
            </p>
            <p>
              The <strong className="text-yellow-400">Method Statement</strong> is a step-by-step
              description of how the work will be carried out safely. It follows the chronological
              sequence of the job from arrival on site through to completion and describes at each
              stage what work is being done, who is doing it, what equipment and materials are being
              used, and what safety precautions are in place. A good method statement is specific
              enough that someone unfamiliar with the job could read it and understand the safe
              sequence of work.
            </p>
            <p>
              Together, these two documents demonstrate that you have thought about the hazards
              before starting work and have a planned, systematic approach to managing them. This is
              not just good practice — it is a legal requirement under the Management of Health and
              Safety at Work Regulations 1999, and for construction work, under the Construction
              (Design and Management) Regulations 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Requirements */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Legal Requirements for RAMS in Electrical Work
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The legal framework for workplace risk assessment in the UK is established by several
              overlapping pieces of legislation. Understanding which regulations apply to your
              electrical work — and what they require — is essential for producing RAMS that are
              legally compliant and genuinely useful on site.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">Key Legislation Requiring RAMS</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Health and Safety at Work etc. Act 1974
                    </strong>{' '}
                    — Section 2 places a general duty on every employer to ensure, so far as is
                    reasonably practicable, the health, safety, and welfare of all their employees.
                    Section 3 extends this duty to anyone else affected by the undertaking,
                    including clients, other contractors on site, and members of the public. Risk
                    assessments are the primary mechanism for demonstrating compliance with these
                    duties.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Management of Health and Safety at Work Regulations 1999
                    </strong>{' '}
                    — Regulation 3 requires every employer to make a suitable and sufficient
                    assessment of the risks to which employees and others are exposed. Regulation 4
                    requires the employer to implement the preventive and protective measures
                    identified by the assessment. If you have five or more employees, the
                    significant findings of the assessment must be recorded in writing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Construction (Design and Management) Regulations 2015
                    </strong>{' '}
                    — CDM 2015 applies to all construction work in Great Britain, which includes
                    electrical installation work. Regulation 15 requires contractors to plan,
                    manage, and monitor construction work carried out by them so that it is carried
                    out without risk to health or safety. This means producing task-specific and
                    site-specific risk assessments and method statements for your electrical work.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Electricity at Work Regulations 1989
                    </strong>{' '}
                    — Regulation 3 requires that all systems are maintained to prevent danger.
                    Regulation 4 requires that all work activities on or near electrical systems are
                    carried out in a manner that prevents danger. These duties apply to electricians
                    specifically and must be reflected in RAMS for electrical work, particularly
                    around live working, isolation procedures, and safe systems of work.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">COSHH Regulations 2002</strong> — The
                    Control of Substances Hazardous to Health Regulations require a specific
                    assessment of exposure to hazardous substances. For electricians, this covers
                    substances such as PVC fumes from cable stripping, silica dust from chasing
                    masonry, solvents used for cleaning, and adhesives used in cable management.
                    COSHH assessments are typically included within the RAMS document.
                  </span>
                </li>
              </ul>
            </div>
            <p>
              In practice, even sole traders who are not legally required to record risk assessments
              in writing will find that written RAMS are required by clients, principal contractors,
              and building managers before being permitted to start work on site. The commercial
              expectation now exceeds the legal minimum, and any electrician who cannot produce
              professional RAMS will struggle to win work on commercial and managed residential
              sites.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Assessment Structure */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Goes in an Electrical Risk Assessment?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A risk assessment for electrical work must identify all foreseeable hazards, evaluate
              the risk from each, and specify appropriate control measures. The HSE five-step
              approach provides a structured framework: identify the hazards, decide who might be
              harmed and how, evaluate the risks and decide on precautions, record your significant
              findings, and review and update your assessment.
            </p>
            <p>
              For electrical installation work, the hazards fall into several categories that must
              be addressed systematically.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Electrical Hazards</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Electric shock from contact with live conductors during installation, testing, or
                fault-finding. Arc flash from short circuits, particularly when working in or near
                consumer units and distribution boards. Burns from overheated conductors or
                components. These hazards require controls including safe isolation procedures (GS38
                compliant test equipment, lock-off devices, proving dead), permits to work for live
                working where justified under Regulation 14 of the Electricity at Work Regulations,
                and appropriate insulated tools and PPE.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Working at Height</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Accessing distribution boards mounted at height, running cables through ceiling
                voids using access platforms, working from ladders to install lighting and
                accessories. The Work at Height Regulations 2005 require that work at height is
                properly planned, supervised, and carried out by competent persons. Risk assessments
                must specify the type of access equipment to be used (step platforms, podium steps,
                tower scaffolds, or mobile elevating work platforms), and confirm that operatives
                are trained in its use.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Fire and Hot Works</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Soldering, brazing, and heat-shrinking near combustible materials. Using angle
                grinders or SDS drills near flammable substances. For hot works on managed sites, a
                hot works permit may be required from the principal contractor or building
                management. The risk assessment must identify the fire risk, specify fire
                precautions (fire extinguisher, fire blanket, fire watch period), and confirm that
                the operative holds the appropriate hot works permit where required.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Manual Handling</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Lifting and carrying heavy items such as consumer units, cable drums (which can
                exceed 40 kg for larger sizes), distribution boards, and transformers. The Manual
                Handling Operations Regulations 1992 require that manual handling is avoided where
                reasonably practicable, and where it cannot be avoided, a suitable assessment is
                made. The risk assessment should specify maximum weights, team lifting requirements,
                and the use of mechanical aids such as drum stands, cable trolleys, and sack trucks.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Additional hazards that must be considered include: asbestos exposure (particularly in
              buildings constructed before 2000, where asbestos may be present in flash guards,
              cable routes, or behind consumer units), noise exposure from drilling and chasing
              (which may require hearing protection if the daily exposure exceeds the lower exposure
              action value of 80 dB(A)), dust exposure from cutting chases in masonry (silica dust
              is a serious health hazard requiring RPE and extraction), lone working (particularly
              on domestic jobs where the operative may be working alone in an unoccupied property),
              and the presence of other site workers, members of the public, or building occupants
              who may be affected by the work.
            </p>
          </div>
        </div>
      </section>

      {/* Method Statement Structure */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Method Statement Structure for Electrical Work
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A method statement describes the safe sequence of work from start to finish. For
              electrical installation work, it should follow the natural progression of the job
              while identifying the safety considerations at each stage. A well-structured method
              statement for a typical electrical installation project includes the following
              sections.
            </p>
          </div>
          <div className="space-y-4 my-6">
            {[
              {
                step: '1',
                title: 'Mobilisation and Site Set-Up',
                text: 'Arrival on site, site induction (where required), review of site safety rules, identification of welfare facilities, set-up of work area including barriers and signage, location and verification of existing isolation points, review of asbestos register and any other site-specific safety information.',
              },
              {
                step: '2',
                title: 'Safe Isolation',
                text: 'Identification of the circuit or circuits to be worked on, isolation using an approved method (switching off at the consumer unit or distribution board, locking off with a personal padlock, attaching a warning notice), proving dead using a GS38-compliant voltage indicator that has been proved before and after use on a known live source.',
              },
              {
                step: '3',
                title: 'Cable Installation',
                text: 'Route planning to avoid safe zones where possible, identification of buried services using a cable avoidance tool (CAT) and signal generator (Genny) before drilling or chasing, chasing or drilling with appropriate dust extraction and RPE, cable containment installation (trunking, conduit, tray), cable drawing and dressing, fire stopping at all penetrations through fire compartment boundaries.',
              },
              {
                step: '4',
                title: 'Termination and Connection',
                text: 'Stripping and terminating cables at accessories, ensuring correct torque settings on screw terminals, connecting to the distribution board or consumer unit, labelling all circuits clearly, ensuring all connections are mechanically and electrically sound, confirming the correct polarity of all connections.',
              },
              {
                step: '5',
                title: 'Testing and Commissioning',
                text: 'Carrying out initial verification tests in the correct sequence as specified in BS 7671 and IET Guidance Note 3: continuity of protective conductors, continuity of ring final circuit conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operation. Recording all results on the appropriate certificate or report.',
              },
              {
                step: '6',
                title: 'Completion and Handover',
                text: 'Removing all waste materials and packaging, cleaning the work area, de-rigging any access equipment, removing barriers and signage, completing all certification and documentation, handing over to the client with operating instructions where appropriate, notifying building control where the work is notifiable under Part P.',
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
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The level of detail in the method statement should be proportionate to the complexity
              and risk of the work. A simple like-for-like socket outlet change requires less detail
              than a full rewire of a three-storey commercial building. The Elec-Mate AI adjusts the
              depth and specificity of the generated method statement based on the job description
              you provide, producing appropriately detailed documents for both simple and complex
              projects.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Generates RAMS */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Brain className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How Elec-Mate AI Generates Your RAMS
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Elec-Mate RAMS generator uses a specialist AI agent trained specifically on UK
              health and safety legislation, electrical installation standards, and real-world site
              safety practices. Unlike generic AI tools that produce vague, template-style content,
              the Elec-Mate AI understands the specific hazards and control measures relevant to
              electrical work and produces genuinely site-specific documents.
            </p>
            <p>
              The process is straightforward. You provide a job description in plain English — for
              example, "Full rewire of a 1930s three-bedroom semi-detached house, existing
              lead-sheathed wiring on a TN-S supply, customer will be living in the property during
              the work." The AI analyses this description and identifies the specific hazards:
              working with potentially asbestos-containing materials in a 1930s property, lead cable
              sheath handling and disposal, working at height to access upstairs ceiling voids, dust
              and disruption management with occupants present, safe isolation of an ageing TN-S
              supply, and so on.
            </p>
            <p>
              The AI then generates a complete risk assessment with a risk matrix showing the
              initial risk score for each hazard, the specific control measures to be implemented,
              and the residual risk score after controls are in place. It produces a method
              statement that follows the logical sequence of work for the specific job described,
              not a generic one-size-fits-all template. COSHH assessments are included where
              hazardous substances are identified. The entire document is formatted professionally
              and can be exported as a PDF with your company branding.
            </p>
            <p>
              You retain full editorial control. After the AI generates the initial draft, you can
              edit any section, add site-specific details that only you know (such as the specific
              layout of the property, access restrictions, or client-imposed working hours), and
              approve the final version before it is issued. The AI provides the structure and
              content; you provide the site knowledge and professional oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Live Working */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              RAMS for Live Working and Restricted Situations
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Electricity at Work Regulations 1989, Regulation 14, states that no person shall
              be engaged in any work activity on or near any live conductor unless it is
              unreasonable in all the circumstances for it to be dead, it is reasonable in all the
              circumstances for the person to be at work on or near it while it is live, and
              suitable precautions (including where necessary the provision of suitable protective
              equipment) are taken to prevent injury.
            </p>
            <p>
              When live working is justified — for example, when fault-finding on a live circuit to
              diagnose an intermittent fault, or when commissioning equipment that must be energised
              to test — the RAMS must specifically address the live working element. This includes:
              the justification for why the circuit cannot be made dead, the specific precautions in
              place (insulated tools to BS EN 60900, insulating mats, barriers and screens,
              competent accompaniment, emergency first aid provisions), the competence of the person
              carrying out the work (appropriate qualifications, training, and experience), and the
              emergency procedures in the event of an incident.
            </p>
            <p>
              The Elec-Mate RAMS generator recognises when a job description implies live working
              and automatically includes the appropriate risk assessment elements, control measures,
              and method statement sections. It also flags the requirement for a written
              justification as required by Regulation 14, prompting you to provide the specific
              reason why the work cannot be carried out dead.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for RAMS
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Generate professional, site-specific RAMS in seconds
            instead of hours. Part of 70 calculators, 8 AI agents, and 12 AI tools.
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
        heading="Generate Professional RAMS in Seconds"
        subheading="Join 430+ UK electricians using Elec-Mate for AI-powered risk assessments. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
