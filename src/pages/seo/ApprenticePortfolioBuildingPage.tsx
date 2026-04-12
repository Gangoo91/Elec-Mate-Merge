import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Camera,
  ClipboardCheck,
  Award,
  ShieldCheck,
  Users,
  Zap,
  FileCheck2,
  FolderOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'Apprentice Guides', href: '/guides/city-guilds-2365-electrical' },
  { label: 'Portfolio Building Tips', href: '/apprentice-portfolio-guide-building-tips' },
];

const tocItems = [
  { id: 'overview', label: 'Why Your Portfolio Matters' },
  { id: 'evidence-types', label: 'NVQ Evidence Types: Observation, Product, Knowledge' },
  { id: 'documenting-jobs', label: 'How to Document Jobs Professionally' },
  { id: 'photographs', label: 'Professional Photographs for Portfolio Evidence' },
  { id: 'witness-testimonies', label: 'Witness Testimonies and Employer Sign-Off' },
  { id: 'organisation', label: 'Organising Your Portfolio' },
  { id: 'common-mistakes', label: 'Common Portfolio Mistakes to Avoid' },
  { id: 'for-apprentices', label: 'Elec-Mate Portfolio Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The NVQ portfolio is a collection of evidence that demonstrates on-the-job competence against the knowledge, skills, and behaviours (KSBs) defined in the apprenticeship standard. Without a complete portfolio, the apprentice cannot attempt the AM2 End Point Assessment.',
  'NVQ evidence falls into three categories: observation (assessor watches you perform a task), product evidence (certificates, test results, photographs of completed work), and knowledge evidence (written accounts, professional discussions, witness testimonies).',
  'Every portfolio entry must be clearly mapped to a specific unit and criterion in the qualification standard. Vague or unmapped evidence wastes time for both the apprentice and the assessor.',
  'Professional photographs are one of the most versatile forms of product evidence. They must be clear, well-lit, and clearly show the relevant element being evidenced (termination quality, cable routing, board layout).',
  'Organisation is as important as content. A disorganised portfolio that contains adequate evidence may still be held up at verification because the assessor cannot efficiently locate evidence against each criterion.',
];

const faqs = [
  {
    question: 'What is the difference between the NVQ portfolio and the apprenticeship standard portfolio?',
    answer:
      'There are two overlapping evidence requirements for electrical apprentices. The NVQ Diploma (Level 3 Diploma in Electrotechnical Technology) is a separately certificated qualification with its own evidence and assessment requirements — managed by City & Guilds or EAL as the awarding body and assessed by your college or training provider assessor. The apprenticeship standard portfolio demonstrates competence against the Knowledge, Skills, and Behaviours (KSBs) defined in the ST0215 Installation Electrician/Maintenance Electrician standard — this is reviewed at the gateway stage before the AM2 End Point Assessment. In practice, evidence gathered for the NVQ units often satisfies the apprenticeship standard KSBs simultaneously, and most training providers structure their portfolio system to evidence both requirements from a single set of records. Your training provider will guide you on their specific portfolio management system.',
  },
  {
    question: 'How much evidence do I need for each NVQ unit?',
    answer:
      'The quantity of evidence required varies by unit and by the judgement of your assessor and internal verifier. There is no fixed number of evidence pieces per criterion — the requirement is that evidence is sufficient to demonstrate consistent competence, not just a single instance. As a general principle, assessors expect to see evidence from at least two or three different job situations for each criterion. Observation of performance by the assessor is the most valid form of evidence and may be sufficient on its own if it clearly covers the criterion. Product and knowledge evidence supplement observation where direct observation is not possible (for example, the assessor cannot be present on every job). Quality of evidence matters more than quantity — a single clear, well-documented observation record is better than five vague, unclearly mapped written accounts.',
  },
  {
    question: 'What makes a good observation record?',
    answer:
      'A good observation record is written by the assessor (or a suitably experienced witness) who was present during the task. It describes specifically what the apprentice did — not just "the apprentice wired a board" but what circuits were wired, what cable sizes were used, how the terminations were made, whether correct tools were used, whether safe isolation was carried out before work began. It references the specific unit criteria being evidenced. It is signed and dated by the observer, with their name, relationship to the apprentice (assessor, employer, supervisor), and their relevant qualification or role. It is specific, factual, and descriptive — not general praise. The criterion column in the observation record should clearly show which NVQ unit and criterion each observed behaviour satisfies.',
  },
  {
    question: 'Can I use photographs as evidence?',
    answer:
      'Yes — photographs are valuable product evidence, particularly for work that is covered up (cables in walls, floor boxes under flooring, buried containment) once the job is complete. A photograph taken during installation captures evidence that would otherwise be impossible to provide after completion. Photographs should be: clear and in focus (use your phone camera in good light); taken from an appropriate distance to show context and from close up to show detail; accompanied by a written account explaining what the photograph shows, when it was taken, on what job, and which criteria it evidences. Photographs alone are rarely sufficient to evidence a criterion without an accompanying written account — the assessor needs context. Do not include photographs of live equipment with exposed terminals — this suggests unsafe practice.',
  },
  {
    question: 'What is a personal statement (written account)?',
    answer:
      'A personal statement (also called a written account or reflective account) is a piece of evidence written by the apprentice in their own words describing a specific task they carried out. It should describe: the job context (type of building, scope of work); the specific task performed (what was done, how, with what tools, materials, and cable sizes); the decisions made (why a specific installation method was chosen, how problems were solved); any safety considerations (what risks were present, how they were managed); the outcome; and which specific NVQ criteria the account evidences. A personal statement should be specific and detailed enough that someone reading it can visualise what was done. Avoid vague language: "I wired a socket" is insufficient. "I installed a 2.5mm² T&E radial final circuit to a double socket outlet, running in 20mm white oval conduit across the ceiling void and down the wall in a zone compliant with BS 7671 regulation 522.6.6" is the correct level of detail.',
  },
  {
    question: 'How do witness testimonies work?',
    answer:
      'A witness testimony is a written statement from someone who has observed the apprentice performing a task — typically the employer, site supervisor, or another qualified electrician. The witness does not need to be the assigned NVQ assessor. The witness testimony describes what they observed the apprentice doing, affirms the quality and safety of the work, and identifies the NVQ criteria it evidences. The witness must sign and date the statement and provide their contact details so the assessor can verify the testimony if needed. Witness testimonies from qualified electricians (with JIB card number or equivalent) carry more evidential weight than testimonies from non-qualified supervisors. Employer witnesses should be briefed on what a useful testimony includes — a generic "Joe is a great worker" provides no useful evidence. The testimony must describe specific observed behaviours against specific criteria.',
  },
  {
    question: 'How do I handle evidence from jobs where photos are not allowed?',
    answer:
      'Some sites — hospitals, secure facilities, private homes where the client does not consent to photography — prohibit or restrict photographs. In these cases, alternative evidence strategies include: a detailed written account by the apprentice; a witness testimony by the supervisor who was present; annotated sketches or drawings showing the installation layout; copies of test results, isolation permits, or completion documentation that identify the apprentice as the person who carried out the work; and an assessor observation if the assessor can attend a similar job on a site that permits observation. Always ask the client for permission to photograph before assuming it is acceptable. A brief email or note confirming photo permission is good practice.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/am2-assessment-preparation',
    title: 'AM2 Assessment Preparation',
    description: 'What the AM2 covers, how to book, and a 2–4 week preparation plan.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/supervising-electrical-apprentices',
    title: 'Supervising Electrical Apprentices',
    description: 'Employer obligations, supervision ratios, and AM2 support guidance.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-unit-201',
    title: 'C&G 2365 Unit 201 — Health and Safety',
    description: 'HASAWA, COSHH, RIDDOR, and risk assessment revision for the portfolio.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-unit-202',
    title: 'C&G 2365 Unit 202 — Electrical Principles',
    description: 'Ohm\'s law, power calculations, and electrical theory for knowledge evidence.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/apprentice-training',
    title: 'Apprentice Training Hub',
    description: 'Full Level 2 and Level 3 training modules with AI study support.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Generate professional EIC certificates for portfolio product evidence.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Your NVQ Portfolio Matters',
    content: (
      <>
        <p>
          The NVQ portfolio is the documentary proof that an apprentice has developed on-the-job
          competence across the full range of electrical installation activities required by the
          qualification standard. Without a completed and verified portfolio, the apprentice cannot
          progress to the AM2 End Point Assessment — and therefore cannot qualify as an electrician.
        </p>
        <p>
          A well-constructed portfolio does more than tick a box. It creates a professional record
          of the apprentice's development that can be referred to throughout their career. It
          demonstrates to employers and clients the breadth and depth of experience gained during
          the apprenticeship. And it prepares the apprentice for the professional discussion
          component of the End Point Assessment — where an EMTA assessor reviews the portfolio and
          asks questions about the work evidenced.
        </p>
        <p>
          The practical reality is that portfolio building competes with the demands of daily
          installation work. Apprentices who build portfolio entries consistently — documenting each
          job as they go — end up with a comprehensive portfolio without excessive effort. Those who
          leave portfolio building to the final year face an overwhelming backlog that is difficult
          to complete in time. The habits described in this guide help build a strong portfolio
          systematically throughout the apprenticeship.
        </p>
      </>
    ),
  },
  {
    id: 'evidence-types',
    heading: 'NVQ Evidence Types: Observation, Product, and Knowledge',
    content: (
      <>
        <p>
          NVQ evidence falls into three broad categories, each with different strengths and
          appropriate uses:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-5">
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-yellow-400" />
              Observation Evidence
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The assessor (or a qualified witness) directly observes the apprentice performing a
              task on the job. This is the most valid and highest-weighted form of evidence. An
              observation record describes what was observed, by whom, when, and maps the observed
              behaviours to specific NVQ criteria. Assessor observations are planned — arrange them
              in advance for jobs that will provide evidence of multiple criteria in a single visit.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              Product Evidence
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Physical outputs of the apprentice's work: photographs of completed installations,
              copies of EIC or EICR certificates signed by the apprentice, test results schedules,
              completed risk assessments, wiring diagrams, material specifications, and job sheets.
              Product evidence is particularly valuable for work that will be covered up (cables in
              walls, buried containment) and for certification work that demonstrates competence
              in documentation as well as installation.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-green-400" />
              Knowledge Evidence
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Written accounts, personal statements, professional discussions, and reflective
              accounts that demonstrate the apprentice's understanding of why tasks are performed
              in a specific way, the regulations and standards that apply, and the decisions made
              during the work. Knowledge evidence supplements observation and product evidence,
              particularly for criteria where direct observation is not practical. Professional
              discussions are recorded conversations between the apprentice and assessor exploring
              the apprentice's knowledge and understanding.
            </p>
          </div>
        </div>
        <p>
          A balanced portfolio uses all three evidence types. Over-reliance on written accounts
          alone (without observation or product evidence) is a common weakness that internal
          verifiers flag during portfolio review.
        </p>
      </>
    ),
  },
  {
    id: 'documenting-jobs',
    heading: 'How to Document Jobs Professionally',
    content: (
      <>
        <p>
          The habit of documenting each job at the end of the working day (while details are fresh)
          is the most effective approach to portfolio building. Here is a practical job documentation
          framework:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <div>
                <strong>Record the job context:</strong> Client type (domestic/commercial/industrial), building type, scope of work, and the circuits or systems you worked on. Note the date, location (town or city), and approximate duration.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <div>
                <strong>Describe what you did specifically:</strong> Cable type and size, installation method, containment used, number and type of circuits, consumer unit brand and type, protective devices fitted. Include specific details — a qualified reader should be able to visualise the installation from your account.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <div>
                <strong>Note safety and compliance considerations:</strong> What risks were present? How were they managed? Which regulations applied (BS 7671, Part P, BS 5839 for fire alarm work)? Was safe isolation carried out? What PPE was worn?
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">4</div>
              <div>
                <strong>Attach supporting evidence:</strong> Photographs taken on the day, copies of test results, EIC or minor works certificate (with client details removed if required), job sheet or work order reference.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">5</div>
              <div>
                <strong>Map to NVQ criteria:</strong> Identify which unit and criteria the evidence satisfies. Your training provider's portfolio management system should have a criteria mapping tool. Do this immediately — do not leave it until later when the job details are forgotten.
              </div>
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Document jobs and generate certificates for portfolio evidence"
          description="Elec-Mate generates EIC and EICR certificates that become immediate portfolio product evidence. Use the AI to draft written accounts from your job notes. Build portfolio evidence as you work."
          icon={FolderOpen}
        />
      </>
    ),
  },
  {
    id: 'photographs',
    heading: 'Professional Photographs for Portfolio Evidence',
    content: (
      <>
        <p>
          Photographs are the most underused and most valuable source of product evidence in
          electrical apprentice portfolios. A well-taken photograph proves the work was done, shows
          the quality of installation, and can evidence multiple criteria simultaneously.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to photograph:</strong> Completed consumer unit wiring (before the cover is fitted), cable routes in the ceiling void or wall chase (before plastering or boarding), containment installation, earth bonding connections, completed external installations (EV chargers, solar PV connections, external sockets), and any unusual or interesting installation method that demonstrates problem-solving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photo quality:</strong> Use the camera on your smartphone — modern phone cameras are entirely adequate for portfolio photographs. Ensure the image is sharp, well-lit (use a torch or work light if the area is dark), and clearly shows the relevant detail. For board photographs, take both an overall shot (showing the full board) and close-up shots (showing individual terminations and cable identification).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What NOT to photograph:</strong> Exposed live terminals with power on; anything that identifies the client without their permission; other trades' work; or situations that suggest unsafe practice (no PPE worn, unsafe access). The assessor will draw negative conclusions from photographs that suggest unsafe working conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Caption every photograph:</strong> A photograph without context has limited evidential value. Every photograph in your portfolio must have a caption: the date, what the photograph shows, which job it is from, and which NVQ criteria it evidences. Assessors reviewing large portfolios should not have to guess what they are looking at.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'witness-testimonies',
    heading: 'Witness Testimonies and Employer Sign-Off',
    content: (
      <>
        <p>
          A witness testimony from a qualified supervisor or employer provides strong corroborating
          evidence for criteria where the NVQ assessor was not present. To be effective:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The witness should describe specifically what they observed — not generic praise. "John correctly carried out safe isolation on the lighting circuit before commencing work, tested with a non-contact voltage indicator and approved multimeter, and wired the new 1.0mm² lighting circuit cleanly in the ceiling void" is useful evidence.</span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The witness must be identified — name, job title, contact details, and their relevant qualification or JIB card number. An anonymous testimony carries no evidential weight.</span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Brief your employer on what a useful testimony looks like. Provide them with a template or prompt list. Most employers want to support their apprentice but do not know instinctively what an NVQ witness testimony requires.</span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Cross-reference the testimony with other evidence. A witness testimony supported by a photograph of the completed work and a copy of the EIC signed by the apprentice provides very strong multi-source evidence for the criteria.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'organisation',
    heading: 'Organising Your Portfolio',
    content: (
      <>
        <p>
          A well-organised portfolio allows the assessor and internal verifier to efficiently
          locate evidence against each criterion. Poor organisation can cause delays in
          verification even when the evidence itself is adequate:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Use your training provider's portfolio management system</strong> — most providers use an e-portfolio platform (OneFile, SmartAssessor, or similar). Use it consistently — do not maintain a parallel paper portfolio and then try to transfer everything to the system at the end.</span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>File evidence against criteria immediately</strong> — when you upload a photograph or complete a written account, map it to the criteria immediately. Do not leave a pile of unmapped evidence to sort later.</span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cross-reference where evidence satisfies multiple criteria</strong> — a single observation record from a consumer unit changeout may evidence criteria across installation, testing, safe isolation, and risk assessment units simultaneously. Note the cross-reference in each relevant location.</span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Review progress monthly</strong> — use the portfolio mapping tool to identify which criteria have adequate evidence and which have gaps. Address gaps proactively — arrange an assessor observation on a job type that would provide the missing evidence.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Portfolio Mistakes to Avoid',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Leaving portfolio building until the final year:</strong> The single most common and damaging mistake. Evidence must reflect genuine on-the-job experience across the full range of the qualification. Retrospectively writing accounts of work done two years ago is unreliable and assessors can identify it.</span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Vague written accounts:</strong> "I helped wire a board" provides no useful evidence. Specific details of what was done, how, and why are required.</span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Evidence that is not mapped to criteria:</strong> A portfolio full of photographs and written accounts that are not mapped to specific NVQ criteria is essentially unusable. Map every piece of evidence as you add it.</span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Relying entirely on written accounts:</strong> Written accounts alone cannot demonstrate practical competence. Observation evidence, product evidence (certificates, test results), and photographs must also be present.</span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Photographs of unsafe situations:</strong> Photographs showing exposed live terminals, missing PPE, or unsafe working practices will be flagged by the assessor. Always ensure your photographs show safe working practice.</span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build portfolio evidence as you work with Elec-Mate"
          description="Generate EIC and EICR certificates, record test results, and use AI to draft written accounts from your job notes. Every certificate and test record is immediately usable as portfolio product evidence."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticePortfolioBuildingPage() {
  return (
    <GuideTemplate
      title="Electrical Apprentice Portfolio Building Tips UK | NVQ Evidence Guide"
      description="Complete guide to building a strong electrical apprentice NVQ portfolio. Evidence types, how to document jobs professionally, photography tips, witness testimonies, organisation, and common mistakes to avoid. For City & Guilds 2365 apprentices."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Apprentice Portfolio Building Tips:{' '}
          <span className="text-yellow-400">How to Build Strong NVQ Evidence Throughout Your Apprenticeship</span>
        </>
      }
      heroSubtitle="Your NVQ portfolio is the gateway to the AM2 End Point Assessment. This guide covers the three evidence types, how to document jobs professionally, photography tips, witness testimonies, portfolio organisation, and the mistakes that cause unnecessary delays."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Portfolio Building"
      relatedPages={relatedPages}
      ctaHeading="Generate Portfolio Evidence as You Work with Elec-Mate"
      ctaSubheading="EIC certificates, EICR reports, and test results generated on site become immediate NVQ portfolio evidence. Join thousands of UK apprentices using Elec-Mate to build their portfolio alongside their work. 7-day free trial."
    />
  );
}
