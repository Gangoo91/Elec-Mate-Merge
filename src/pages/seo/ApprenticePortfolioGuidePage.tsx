import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  GraduationCap,
  Brain,
  BookOpen,
  ChevronDown,
  Zap,
  ShieldCheck,
  FolderOpen,
  Camera,
  Clock,
  Award,
  Users,
  FileCheck2,
} from 'lucide-react';

const PAGE_TITLE = 'Electrical Apprentice Portfolio Guide | Evidence Tracking | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete guide to building your electrical apprentice portfolio. Digital evidence tracking, photo documentation, criteria mapping, employer review, and EPAO submission. From £4.99/mo.';

const faqs = [
  {
    question: 'What is an electrical apprentice portfolio and why do I need one?',
    answer:
      'An electrical apprentice portfolio is a structured collection of evidence that demonstrates your on-the-job competence across the knowledge, skills, and behaviours defined in the apprenticeship standard (ST0215 for Installation Electrician / Maintenance Electrician). You need it for two critical reasons. First, it is a gateway requirement for the End Point Assessment (EPA) — you cannot attempt the EPA without a comprehensive portfolio. Second, the portfolio forms the basis of the professional discussion component of the EPA, where an assessor will review your entries and ask questions about your experiences. A well-organised, thorough portfolio strengthens your performance in the professional discussion and demonstrates your progression from novice to competent professional over the course of the apprenticeship.',
  },
  {
    question: 'What types of evidence should I include in my portfolio?',
    answer:
      'Your portfolio should include a range of evidence types that together demonstrate breadth and depth of competence. Key evidence types include: photographs of completed work (consumer unit installations, wiring, containment, accessories), work logs describing the tasks you carried out and the skills you applied, witness testimonies from your employer or supervisor confirming your competence, completed test certificates (EICs, Minor Works) from real installations you contributed to, reflective accounts describing what you learned from specific experiences and how you would apply that learning in the future, records of off-the-job training activities, evidence of CPD (courses, reading, industry events), and evidence of professional behaviours such as communication, teamwork, and initiative. Each piece of evidence should be mapped to specific criteria in the apprenticeship standard.',
  },
  {
    question: 'How do I map portfolio evidence to the apprenticeship standard?',
    answer:
      'The apprenticeship standard (ST0215) defines specific knowledge, skills, and behaviour criteria that you must demonstrate. Each piece of portfolio evidence should be tagged against one or more of these criteria to show that you have covered the full standard. For example, a photograph of a domestic consumer unit installation with a description of the circuit protection you selected and why could map to the "installation" skills criterion, the "BS 7671" knowledge criterion, and the "safe working" behaviour criterion. Elec-Mate automates this mapping process — when you add a portfolio entry, the AI suggests which criteria it covers and flags any criteria where you are lacking evidence, so you can proactively fill gaps before your EPA gateway review.',
  },
  {
    question: 'What is the difference between a digital and paper portfolio?',
    answer:
      'A paper portfolio is a physical folder or binder containing printed photographs, handwritten work logs, and signed witness statements. It is harder to organise, easy to damage or lose, difficult to share with assessors or employers remotely, and time-consuming to maintain. A digital portfolio stores all evidence electronically — photographs, typed descriptions, digital signatures, and uploaded documents — making it searchable, secure, shareable, and easy to update. Most EPAOs now accept digital portfolios, and many prefer them because they can review the evidence before the assessment day. Elec-Mate provides a purpose-built digital portfolio tool that captures evidence directly from your phone, maps it to the apprenticeship standard automatically, and exports a formatted submission package for your EPAO.',
  },
  {
    question: 'How often should I update my portfolio?',
    answer:
      'You should update your portfolio regularly throughout your apprenticeship — ideally adding new evidence at least once a week. The biggest mistake apprentices make is leaving portfolio building until close to the EPA gateway, then scrambling to reconstruct months or years of experience from memory. This produces thin, generic entries that do not impress assessors. By capturing evidence in real time — photographing work as you complete it, writing reflections while the experience is fresh, and logging activities as they happen — you build a rich, detailed portfolio that genuinely reflects your development. Elec-Mate sends weekly reminders to add evidence and tracks your progress against the apprenticeship criteria, alerting you if any area is falling behind.',
  },
  {
    question: 'Can my employer and tutor review my portfolio in Elec-Mate?',
    answer:
      'Yes. Elec-Mate includes employer and tutor review functionality. You can invite your employer (or their nominated representative) and your training provider tutor to view your portfolio. They can see your evidence entries, add comments, sign off on witness testimonies digitally, and confirm that the evidence accurately represents your on-the-job competence. This is valuable for several reasons: your employer can verify the work you are claiming to have carried out, your tutor can check that your evidence maps correctly to the apprenticeship standard, and both can identify gaps or areas where additional evidence would strengthen your submission. At the gateway stage, your employer and training provider must confirm that you are ready for the EPA — having already reviewed your portfolio makes this decision straightforward.',
  },
];

const features = [
  {
    icon: Camera,
    title: 'Photo Evidence Capture',
    description:
      'Capture evidence directly from your phone on site. Photograph completed work, add descriptions, and tag against apprenticeship standard criteria in seconds.',
  },
  {
    icon: FolderOpen,
    title: 'Criteria Mapping',
    description:
      'AI-powered mapping of evidence to ST0215 apprenticeship standard criteria. See exactly which criteria are covered and which need more evidence at a glance.',
  },
  {
    icon: Clock,
    title: 'OJT Hours Integration',
    description:
      'Portfolio entries automatically link to your off-the-job training hours log. Study sessions, college attendance, and on-platform learning are tracked and documented.',
  },
  {
    icon: Brain,
    title: 'AI Reflection Coach',
    description:
      'The AI prompts you with questions to write better reflective statements: "What regulation did this comply with?", "What would you do differently?", "What did you learn?"',
  },
  {
    icon: Users,
    title: 'Employer & Tutor Review',
    description:
      'Invite your employer and training provider to review, comment on, and sign off your portfolio entries. Digital witness testimonies with verification.',
  },
  {
    icon: FileCheck2,
    title: 'EPAO Export',
    description:
      'Export your complete portfolio in a formatted submission package accepted by major EPAOs. Everything organised, mapped, and ready for assessment.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'Electrical Apprentice Portfolio Guide - Digital Evidence Tracking',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
  },
  educationalLevel: 'Beginner to Intermediate',
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
      name: 'Apprentice Portfolio Guide',
      item: 'https://elec-mate.com/training/apprentice-portfolio',
    },
  ],
};

export default function ApprenticePortfolioGuidePage() {
  useSEO({
    title: 'Electrical Apprentice Portfolio Guide | Evidence Tracking',
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
            <span className="text-sm font-medium text-yellow-400">Apprentice Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Apprentice Portfolio
            <br />
            <span className="text-yellow-400">Evidence Guide</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            Build a comprehensive portfolio of evidence from day one. Digital capture, AI-powered
            criteria mapping, employer review, and EPAO-ready export. Never scramble for evidence
            again.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#why-portfolio"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Why You Need a Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Why You Need a Portfolio */}
      <section id="why-portfolio" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Every Apprentice Needs a Portfolio
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Your portfolio of evidence is one of the most important components of your electrical
              apprenticeship, yet it is often the most neglected. Many apprentices treat it as an
              afterthought — a box to tick before the End Point Assessment — and end up scrambling
              to produce evidence at the last minute. This approach results in thin, generic
              portfolios that do not reflect the genuine depth of experience gained over three to
              four years of training.
            </p>
            <p>
              A well-built portfolio serves multiple purposes. It is a gateway requirement for the
              EPA — without it, you cannot be put forward for your final assessment. It forms the
              basis of the professional discussion, where an EPAO assessor will review your entries
              and ask detailed questions about your experiences. It provides your employer and
              training provider with evidence that you are meeting the apprenticeship standard
              criteria throughout your programme, not just at the end. And it becomes a valuable
              professional record that you can reference throughout your career — evidence of the
              installations you have worked on, the skills you have developed, and the progression
              from novice to competent professional.
            </p>
            <p>
              The key insight is that portfolio building should start on day one of your
              apprenticeship and continue throughout. Every installation you work on, every new
              skill you develop, every challenging situation you navigate, and every training
              activity you complete is potential portfolio evidence. The difference between a strong
              portfolio and a weak one is not the amount of work you have done — it is how well you
              have documented it.
            </p>
          </div>
        </div>
      </section>

      {/* What Evidence to Collect */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Evidence to Collect
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              The apprenticeship standard (ST0215) defines three categories of requirements:
              knowledge, skills, and behaviours. Your portfolio must include evidence across all
              three. Here are the key evidence types and how they map to the standard.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Photographs of Completed Work',
                description:
                  'Photograph every significant piece of work you complete: consumer unit installations, cable routes, containment runs, accessory installations, distribution boards, and test setups. Include "before and after" shots where possible. Each photograph should have a description explaining what the work involved, what regulations applied, and what decisions you made. This maps to the "installation" skills criteria.',
              },
              {
                step: '2',
                title: 'Work Logs and Activity Records',
                description:
                  'Maintain a regular log of the activities you carry out on site. Record what you did, what tools and materials you used, who supervised you, what safety precautions you took, and what you learned. Work logs demonstrate consistency of experience over time and map to multiple skills and behaviour criteria including safe working practices and communication.',
              },
              {
                step: '3',
                title: 'Witness Testimonies',
                description:
                  'Ask your employer, supervisor, or experienced colleagues to provide witness testimonies confirming your competence in specific areas. A witness testimony is a signed statement from someone who observed your work, confirming that you carried out a task competently and safely. Digital witness testimonies through Elec-Mate include verification signatures and can be reviewed by your training provider.',
              },
              {
                step: '4',
                title: 'Test Certificates and Documentation',
                description:
                  'Include copies of test certificates you have contributed to — EICs, Minor Works certificates, and EICRs. Even if you did not sign as the responsible person (you cannot until you hold the 2391-52), evidence that you participated in the testing process and helped complete the documentation demonstrates your developing competence in inspection and testing.',
              },
              {
                step: '5',
                title: 'Reflective Accounts',
                description:
                  'Reflective accounts are written descriptions of specific experiences where you analyse what happened, what you learned, and how you would apply that learning in the future. Strong reflective accounts demonstrate critical thinking and self-awareness — both key behaviour criteria. The AI reflection coach in Elec-Mate prompts you with targeted questions to draw out deeper insights from your experiences.',
              },
              {
                step: '6',
                title: 'Training and CPD Records',
                description:
                  'Document all training activities: college attendance, online study sessions, toolbox talks, manufacturer training, trade show attendance, and self-directed learning. Link these to your off-the-job training hours log and map them to the knowledge criteria they cover. This demonstrates your commitment to continuing professional development, which assessors value highly.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapping to Criteria */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Mapping Evidence to Apprenticeship Criteria
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Every piece of portfolio evidence should be mapped to one or more criteria in the
              apprenticeship standard. This mapping serves two purposes: it ensures you have
              comprehensive coverage of the standard (no gaps), and it makes it easy for the EPAO
              assessor to find evidence relevant to each criterion during the professional
              discussion.
            </p>
            <p>
              The ST0215 standard for Installation Electrician / Maintenance Electrician defines
              knowledge criteria covering areas such as electrical science, BS 7671:2018+A3:2024
              wiring regulations, health and safety legislation, installation design, inspection and
              testing, and fault diagnosis. Skills criteria cover practical installation, safe
              isolation, testing, fault finding, certification, and communication. Behaviour
              criteria cover professionalism, teamwork, taking responsibility, and commitment to
              CPD.
            </p>
            <p>
              Without a mapping system, you risk having strong evidence in some areas and no
              evidence in others. For example, you might have dozens of photographs of installation
              work (covering the installation skills criterion well) but no evidence of fault
              diagnosis experience, no reflective accounts demonstrating professional behaviours,
              and no documentation of your health and safety knowledge.
            </p>
            <p>
              Elec-Mate's AI-powered criteria mapping solves this problem. When you add a portfolio
              entry, the AI analyses the description and suggests which criteria it covers. A visual
              dashboard shows your coverage across all criteria, using a traffic-light system: green
              indicates strong coverage, amber indicates partial coverage, and red indicates
              criteria with no evidence. Weekly reminders prompt you to add evidence in areas where
              coverage is weak, ensuring that by the time you reach the EPA gateway, your portfolio
              comprehensively covers the entire standard.
            </p>
          </div>
        </div>
      </section>

      {/* Digital vs Paper */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Digital vs Paper Portfolios
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Traditionally, apprentice portfolios were maintained as physical folders — ring
              binders filled with printed photographs, handwritten work logs, and signed paper
              forms. While this approach still exists, digital portfolios have become the standard
              for several compelling reasons.
            </p>
            <p>
              <strong>Convenience:</strong> A digital portfolio lives on your phone. You can add
              evidence on site in seconds — snap a photograph, type a quick description, and the
              entry is saved. No need to print photographs, write out logs by hand, or carry a heavy
              binder to and from site. This convenience means you are far more likely to capture
              evidence regularly rather than leaving it until "later" (which often means "never").
            </p>
            <p>
              <strong>Security:</strong> Paper portfolios can be damaged, lost, or destroyed. A
              coffee spill, a van break-in, or a house move can wipe out years of carefully
              collected evidence. Digital portfolios are backed up to the cloud automatically, so
              your evidence is safe regardless of what happens to your phone or physical belongings.
            </p>
            <p>
              <strong>Organisation:</strong> Finding a specific piece of evidence in a paper
              portfolio means flipping through pages and hoping it is filed in the right section. A
              digital portfolio is searchable — find any entry by date, type, criteria mapping, or
              keyword in seconds. During the professional discussion, when an assessor asks about a
              specific type of work, you can locate the evidence instantly rather than fumbling
              through a binder.
            </p>
            <p>
              <strong>Shareability:</strong> Digital portfolios can be shared with your employer,
              training provider, and EPAO without photocopying or posting physical documents. Your
              employer can review and add witness testimonies remotely. Your EPAO can review your
              portfolio before the assessment day, making the professional discussion more focused
              and efficient.
            </p>
            <p>
              <strong>EPAO acceptance:</strong> All major EPAOs now accept digital portfolios, and
              many actively prefer them. Elec-Mate exports your portfolio in a formatted submission
              package that meets the requirements of all the major assessment organisations active
              in the electrical sector.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Automates It */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Automates Portfolio Building
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Building a portfolio manually — even a digital one — still requires discipline and
              effort. Elec-Mate goes further by automating much of the process, reducing the effort
              required and ensuring nothing falls through the cracks.
            </p>
            <p>
              <strong>Automatic OJT logging:</strong> Every minute you spend studying on Elec-Mate
              is automatically logged as off-the-job training hours. These hours are linked to the
              relevant apprenticeship criteria and appear in your portfolio as training evidence. No
              need to manually track study time or fill in a separate hours log.
            </p>
            <p>
              <strong>Study activity as evidence:</strong> Quiz completions, course module progress,
              mock exam results, and AI study assistant interactions are all recorded as evidence of
              your knowledge development. When you complete the Level 3 circuit design module and
              score 85% on the practice assessment, that result automatically appears in your
              portfolio mapped to the "installation design" knowledge criterion.
            </p>
            <p>
              <strong>AI criteria suggestions:</strong> When you add a manual portfolio entry (a
              work photograph, a reflective account, a witness testimony), the AI analyses the
              content and suggests which apprenticeship criteria it covers. You can accept, modify,
              or reject the suggestions. This ensures consistent and accurate mapping without
              requiring you to memorise the full standard.
            </p>
            <p>
              <strong>Gap analysis:</strong> The portfolio dashboard shows a visual map of your
              evidence coverage across all ST0215 criteria. Red areas need evidence, amber areas
              have some coverage, and green areas are well-documented. Weekly reports highlight
              which criteria need attention, so you can proactively seek opportunities to generate
              evidence in those areas — for example, asking your supervisor to let you observe or
              assist with fault diagnosis if that criterion is underrepresented.
            </p>
            <p>
              <strong>Employer and tutor integration:</strong> Your employer and training provider
              can access your portfolio through their own Elec-Mate accounts. They can review
              entries, leave comments, add digital signatures to witness testimonies, and track your
              overall progress. This transparency means no surprises at the gateway review —
              everyone knows exactly where you stand throughout the apprenticeship.
            </p>
          </div>
        </div>
      </section>

      {/* EPAO Submission */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Submitting Your Portfolio to the EPAO
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              When you reach the EPA gateway and your employer and training provider confirm you are
              ready, your portfolio must be submitted to the End Point Assessment Organisation. The
              format and method of submission varies between EPAOs, but most now accept electronic
              submissions.
            </p>
            <p>
              Elec-Mate's portfolio export feature generates a formatted submission package that
              includes: a summary page listing all entries with dates and criteria mappings, the
              full evidence entries with photographs and descriptions, signed witness testimonies,
              an evidence coverage matrix showing which criteria are demonstrated by which entries,
              your off-the-job training hours summary, and your study activity records. The package
              is generated as a PDF document and a structured digital file that can be uploaded to
              most EPAO portals or emailed directly.
            </p>
            <p>
              The EPAO assessor will review your portfolio before the professional discussion. A
              well-organised, comprehensive portfolio creates a strong first impression and gives
              the assessor confidence in your competence before the discussion even begins.
              Conversely, a disorganised or thin portfolio raises concerns and can lead to more
              challenging questions during the discussion as the assessor tries to establish whether
              the apprentice genuinely has the required breadth of experience.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            Complete Portfolio Management
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            Every tool you need to build, manage, review, and submit a professional apprentice
            portfolio.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <FolderOpen className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">Digital</p>
              <p className="text-sm text-white">Portfolio Management</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">ST0215</p>
              <p className="text-sm text-white">Criteria Mapped</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">8 AI Agents</p>
              <p className="text-sm text-white">Plus 12 AI Tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Apprentice Portfolios
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Start building your portfolio today"
        subheading="Join 430+ UK electricians and apprentices managing their careers with Elec-Mate. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
