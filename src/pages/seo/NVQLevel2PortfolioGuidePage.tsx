import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Camera,
  ClipboardCheck,
  FileCheck2,
  AlertTriangle,
  FolderOpen,
  Users,
  Wrench,
  CheckCircle2,
  Target,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'NVQ Portfolio', href: '/guides/nvq-level-2-electrical-portfolio' },
];

const tocItems = [
  { id: 'overview', label: 'Portfolio Overview' },
  { id: 'structure', label: 'Portfolio Structure' },
  { id: 'evidence-types', label: 'Types of Evidence' },
  { id: 'mandatory-units', label: 'Mandatory Units' },
  { id: 'photographing-work', label: 'Photographing Work' },
  { id: 'digital-vs-paper', label: 'Digital vs Paper Portfolio' },
  { id: 'common-rejections', label: 'Common Rejection Reasons' },
  { id: 'assessor-expectations', label: 'What Assessors Look For' },
  { id: 'tips', label: 'Portfolio Tips' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Your NVQ Level 2 portfolio is the documented proof that you can do the practical work required by the qualification — it is not an exam, it is a collection of evidence from real jobs.',
  'Evidence types include photographic evidence, witness testimonies, work logs, professional discussion records, and copies of test results or certificates you contributed to.',
  'Photograph your work at every stage (before, during, after) with clear descriptions. Poor photos or missing context are the most common reasons for evidence being rejected.',
  'Mandatory units cover health and safety, installation methods, terminations, and understanding electrical science. Every unit must have sufficient evidence mapped to it.',
  'Digital portfolios are easier to organise, search, and share with assessors — and they cannot be lost or damaged like paper folders.',
];

const faqs = [
  {
    question: 'What is the NVQ Level 2 in Electrical Installations?',
    answer:
      'The NVQ (National Vocational Qualification) Level 2 in Electrical Installations is a competence-based qualification that proves you can carry out basic electrical installation work to an acceptable standard. It is assessed through a portfolio of evidence gathered from your workplace, not through an exam. Your assessor reviews your portfolio, conducts workplace observations, and holds professional discussions to confirm you meet the qualification criteria. The NVQ Level 2 is part of the Level 3 Electrotechnical Apprenticeship and is typically completed during years 1 and 2 of your apprenticeship, alongside the technical certificate (diploma) and functional skills.',
  },
  {
    question: 'How many pieces of evidence do I need for each unit?',
    answer:
      'There is no fixed number — it depends on the quality and scope of each piece of evidence. A single job might provide evidence for multiple units if it covers different aspects of the qualification criteria. As a general guide, each mandatory unit should have at least 3 to 5 strong pieces of evidence that clearly demonstrate competence. Your assessor will tell you if you need more. Quality matters more than quantity — one detailed piece of evidence with clear photos, a witness testimony, and a written description is worth more than ten blurry photos with no context. Map each piece of evidence to the specific learning outcomes and assessment criteria it covers.',
  },
  {
    question: 'What makes a good witness testimony?',
    answer:
      'A good witness testimony is signed by a qualified electrician (ideally your supervisor) who directly observed you doing the work. It should state: what work you did (be specific — "terminated a ring final circuit at the consumer unit" not just "did some wiring"), when and where the work took place, what level of supervision you needed, and the quality of your work. The witness should comment on your safety awareness, technical competence, and working practices. Generic testimonies ("John worked well on site") are weak evidence — assessors want specific detail about what you did and how well you did it. Get testimonies regularly, not all at the end.',
  },
  {
    question: 'Can I use college practical work as portfolio evidence?',
    answer:
      'Yes, but it carries less weight than workplace evidence. The NVQ is primarily about demonstrating competence in real working environments. College practical sessions can supplement your workplace evidence, particularly for tasks that are hard to evidence on site (such as specific test procedures or containment types you have not encountered at work). Your assessor will confirm what balance of workplace and college evidence is acceptable. Ideally, at least 80% of your evidence should come from real workplace activity.',
  },
  {
    question: 'How should I organise my portfolio?',
    answer:
      'Organise by unit, with a clear index or contents page at the front. For each unit, include a summary of the evidence you are submitting and a mapping grid showing which assessment criteria each piece of evidence covers. Within each unit section, put your strongest evidence first. Label every photo clearly: what the photo shows, the date, the location, and which assessment criteria it maps to. If using a digital portfolio, use consistent file naming (for example, Unit301-EvidenceA-CU-Install-Jan2026.jpg) and organise into folders by unit. A clear, well-organised portfolio makes the assessor job easier — and assessors who can find evidence quickly are assessors who pass you faster.',
  },
  {
    question: 'What happens if my portfolio is rejected?',
    answer:
      'If your assessor identifies gaps in your portfolio, they will tell you what is missing and give you the opportunity to provide additional evidence. This is normal — very few portfolios are accepted on the first submission without any feedback. Common feedback includes: "need more photographic evidence for this unit", "witness testimony not detailed enough", or "evidence does not clearly map to the assessment criteria". Your assessor is there to help you pass, not to fail you. Respond to feedback promptly, provide the additional evidence, and resubmit. If you are finding it difficult to gather specific evidence (for example, you have not done three-phase work and it is required), discuss alternatives with your assessor — they may accept a professional discussion or a workplace observation instead.',
  },
  {
    question: 'How long do I have to complete my NVQ Level 2 portfolio?',
    answer:
      'The NVQ Level 2 is typically completed within the first 2 years of a Level 3 apprenticeship, but the exact timeline depends on your training provider and the pace at which you gather evidence. There is no hard deadline — it is completed when you have sufficient evidence for all units. However, your apprenticeship programme will have milestones, and falling behind on portfolio evidence is one of the most common reasons apprentices struggle later in their programme. Build your portfolio as you go — do not leave it all until the end. Set a routine: every Friday, spend 30 minutes organising photos, writing descriptions, and filing evidence from that week.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/year-3-electrical-apprentice',
    title: 'Year 3 Apprentice Guide',
    description:
      'What to expect in year 3 — Level 3 diploma, AM2 preparation, and building on your NVQ evidence.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Apprenticeship Guide',
    description:
      'Complete overview of the electrical apprenticeship pathway from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/testing-procedures-for-apprentices',
    title: 'Testing Procedures for Apprentices',
    description:
      'Learn the testing procedures you need to understand and evidence in your portfolio.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/ojt-evidence-guide',
    title: 'On-the-Job Training Evidence',
    description:
      'How to document and evidence your on-the-job training hours for your apprenticeship.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'General portfolio advice for all levels of the electrical apprenticeship.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-science-revision',
    title: 'Electrical Science Revision',
    description:
      'Revise the science fundamentals that underpin your NVQ knowledge requirements.',
    icon: Lightbulb,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'NVQ Level 2 Portfolio: What It Is and Why It Matters',
    content: (
      <>
        <p>
          The NVQ Level 2 in Electrical Installations is a competence-based qualification. Unlike a
          written exam where you demonstrate knowledge, the NVQ requires you to prove that you can
          actually do the work — and the proof is your portfolio.
        </p>
        <p>
          Your portfolio is a structured collection of evidence from your workplace and college that
          shows your assessor you meet the qualification criteria. It includes photographs of your
          work, witness testimonies from supervisors, work logs, professional discussion records,
          and supporting documents like test results and risk assessments.
        </p>
        <p>
          Think of the portfolio as your professional diary. Every piece of electrical work you do
          is a potential piece of evidence. The challenge is not doing the work — as an apprentice,
          you do that every day — it is documenting it in a way that your assessor can verify and
          map to the NVQ standards.
        </p>
        <p>
          This guide covers the portfolio structure, evidence types, mandatory units, how to
          photograph work properly, common rejection reasons, and what assessors actually look for.
        </p>
      </>
    ),
  },
  {
    id: 'structure',
    heading: 'Portfolio Structure',
    content: (
      <>
        <p>
          A well-structured portfolio is easier for you to build and easier for your assessor to
          review. The standard structure follows the NVQ unit format:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Front section</strong> — personal details, employer details, assessor contact
                information, contents page, and evidence mapping grid (a table showing which evidence
                covers which assessment criteria).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit sections</strong> — one section per NVQ unit, each containing the
                evidence mapped to that unit. Include a unit summary page listing all evidence for
                that unit and which learning outcomes and assessment criteria each piece covers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supporting documents</strong> — certificates (first aid, asbestos awareness,
                etc.), college records, professional discussion records, assessor visit notes, and
                action plans from previous assessor feedback.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Evidence log</strong> — a running list of all evidence with dates, brief
                descriptions, and the units each piece maps to. This helps you track gaps and plan
                what evidence to collect next.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your training provider may give you a specific portfolio template or an online platform
          (such as OneFile, Smart Assessor, or similar). Use whatever system they provide — it is
          designed to meet the qualification requirements and makes the assessor process smoother.
        </p>
      </>
    ),
  },
  {
    id: 'evidence-types',
    heading: 'Types of Evidence',
    content: (
      <>
        <p>
          Your portfolio should include a mix of evidence types. Assessors value variety because it
          demonstrates competence from multiple angles:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographic evidence</strong> — the backbone of most portfolios. Photos of
                your work at different stages: containment runs, cable installations, terminations,
                consumer unit wiring, completed accessories, labelling. Each photo needs a
                description explaining what it shows and which assessment criteria it maps to.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Witness testimonies</strong> — signed statements from a qualified
                electrician who observed you working. These confirm what work you did, the standard
                you achieved, and your level of independence. Get these regularly from different
                supervisors if possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work logs</strong> — a diary of your daily work activities. Brief entries
                describing what you did, what skills you used, and what you learned. This shows
                consistency and breadth of experience over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional discussion records</strong> — your assessor conducts recorded
                discussions where they ask you questions about your work, your knowledge, and your
                decision-making. These are typed up and included as evidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supporting documents</strong> — copies of test results, risk assessments,
                method statements, permits to work, and certificates that you contributed to or
                worked from. These demonstrate your exposure to real working practices.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The strongest evidence combines multiple types — for example, photos of a consumer unit
          installation backed up by a witness testimony confirming you did the work and a copy of
          the test results. This triangulation makes it easy for the assessor to confirm competence.
        </p>
      </>
    ),
  },
  {
    id: 'mandatory-units',
    heading: 'Mandatory Units',
    content: (
      <>
        <p>
          The exact units depend on your qualification provider, but the NVQ Level 2 in Electrical
          Installations typically includes these mandatory areas:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety</strong> — understanding workplace hazards, safe working
                practices, safe isolation procedures, PPE, risk assessments, and emergency procedures.
                Evidence: safe isolation records, photos of you wearing correct PPE, risk assessment
                contributions, toolbox talk attendance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation methods</strong> — installing wiring systems using different
                methods (clipped direct, in conduit, in trunking, on tray). Evidence: photos showing
                different installation methods, descriptions of cable types used, containment
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminations and connections</strong> — terminating cables at accessories,
                distribution boards, and junction boxes. Evidence: close-up photos of terminations,
                witness testimonies confirming quality, descriptions of connection types used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical science principles</strong> — understanding basic electrical
                theory (Ohm's law, power, resistance, series and parallel circuits). Evidence:
                college assessments, professional discussion records, reflective accounts showing
                you understand why things work the way they do.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communication and working relationships</strong> — working effectively with
                others, communicating with customers, following instructions, and reporting problems.
                Evidence: witness testimonies commenting on your communication and teamwork.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Check your specific qualification specification for the exact unit titles and assessment
          criteria. Your assessor will give you a mapping document showing what evidence is needed
          for each unit.
        </p>
      </>
    ),
  },
  {
    id: 'photographing-work',
    heading: 'How to Photograph Work Properly',
    content: (
      <>
        <p>
          Good photographic evidence is the difference between a smooth portfolio assessment and
          weeks of rework. Here is how to take photos that assessors will accept:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Before, During, and After</h4>
                <p className="text-white text-sm leading-relaxed">
                  Take a "before" photo showing the existing installation or the starting point.
                  Take "during" photos at key stages: containment fitted, cables pulled, first fix
                  complete. Take "after" photos showing the completed work, labelling, and final
                  state. This sequence tells the story of the job and shows your contribution at each
                  stage.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Clear and Well-Lit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use your phone torch or a site light if the area is dark. Make sure the photo is
                  in focus — blurry photos are rejected. Get close enough to show detail (for
                  example, the quality of a termination) but also include wider shots that show the
                  overall installation. If photographing inside a consumer unit, make sure individual
                  connections are visible.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Context and Labelling</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every photo needs context. Write a description: "Ring final circuit termination at
                  consumer unit — kitchen circuit, January 2026, domestic rewire at [location]."
                  Include a handwritten label or date card in the photo if your assessor requires
                  proof of when the photo was taken. Some apprentices use a small whiteboard or
                  sticky note with the date and job reference visible in the frame.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Get into the habit of photographing every job. It takes 5 minutes and saves you hours of
          chasing evidence later. Most apprentices who struggle with their portfolio say the same
          thing: "I wish I had taken more photos."
        </p>
        <SEOAppBridge
          title="Capture portfolio evidence with Elec-Mate"
          description="Elec-Mate helps you photograph work with structured templates, add descriptions, and map evidence to NVQ units. Your portfolio builds automatically as you document your work."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'digital-vs-paper',
    heading: 'Digital vs Paper Portfolio',
    content: (
      <>
        <p>
          Most training providers now accept or prefer digital portfolios, but some still use paper
          folders. Here is how they compare:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Digital Portfolio</h3>
            <p className="text-white text-sm leading-relaxed">
              Easier to organise, search, and reorganise when you need to add or move evidence.
              Photos can be uploaded directly from your phone with descriptions and unit mappings.
              Cannot be physically lost or damaged. Assessors can review remotely without needing a
              site visit. Platforms like OneFile and Smart Assessor are designed specifically for NVQ
              portfolios. Backups are automatic. You can share specific sections with your assessor
              without handing over the whole thing.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Paper Portfolio</h3>
            <p className="text-white text-sm leading-relaxed">
              Some apprentices find it easier to work with physical documents — printing photos,
              writing descriptions by hand, and filing in ring binders. Paper portfolios feel more
              tangible and some people find the physical process helps with organisation. However,
              they are vulnerable to loss, damage (water, dirt, van mishaps), and they are harder to
              reorganise. Printing photos and documents also costs money. If your training provider
              gives you a choice, digital is almost always the better option.
            </p>
          </div>
        </div>
        <p>
          Whichever format you use, keep backups. If digital, ensure your files are backed up to
          cloud storage (Google Drive, iCloud, OneDrive). If paper, take photos of every page as a
          backup. Losing a portfolio to a van break-in or a coffee spill is devastating — and it
          happens more often than you would think.
        </p>
      </>
    ),
  },
  {
    id: 'common-rejections',
    heading: 'Common Rejection Reasons',
    content: (
      <>
        <p>
          Understanding why evidence gets rejected helps you get it right the first time. Here are
          the most common reasons assessors send evidence back:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photos with no context</strong> — a photo of a consumer unit with no
                description, date, or explanation of your contribution. The assessor cannot verify
                what it shows or that you did the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Blurry or dark photos</strong> — if the assessor cannot see the detail of
                your work, the photo has no evidential value. Take clear, well-lit photos and check
                them before you leave site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generic witness testimonies</strong> — "The apprentice worked well on site
                this week" tells the assessor nothing. Testimonies must state specifically what work
                you did and to what standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Evidence not mapped to criteria</strong> — submitting evidence without
                explaining which assessment criteria it covers. The assessor should not have to guess
                why you included a particular piece of evidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient range</strong> — all evidence from the same type of job (for
                example, only domestic socket installations). The NVQ requires evidence across
                different work types, environments, and installation methods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No evidence of understanding</strong> — photos show you did the work, but
                there is nothing demonstrating you understand why. Reflective accounts and
                professional discussions fill this gap.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most of these issues are avoidable with a consistent routine: photograph every job, write
          a description immediately, get a witness testimony, and map the evidence to your units
          while it is fresh in your mind.
        </p>
      </>
    ),
  },
  {
    id: 'assessor-expectations',
    heading: 'What Assessors Actually Look For',
    content: (
      <>
        <p>
          Your NVQ assessor is not trying to catch you out. They want to pass you — but they need
          sufficient, valid, and reliable evidence to justify the qualification. Here is what they
          are looking for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sufficiency</strong> — is there enough evidence to cover all the assessment
                criteria for each unit? Gaps mean the unit cannot be signed off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Validity</strong> — does the evidence actually demonstrate the competence
                claimed? A photo of a finished installation does not prove you did it unless
                supported by a witness testimony or work log.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Authenticity</strong> — is the evidence genuinely your work? Witness
                testimonies, dated photos, and professional discussions all help confirm
                authenticity. Never include someone else's work as your own.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Currency</strong> — is the evidence recent and relevant? Evidence from 3
                years ago may not reflect your current competence. Focus on recent work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Range</strong> — does the evidence cover different types of work,
                environments, and installation methods? Assessors want to see breadth, not just
                depth in one area.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Build a good relationship with your assessor. Ask them early what they expect, how they
          want evidence presented, and what their common feedback points are. A five-minute
          conversation at the start can save you hours of rework later.
        </p>
      </>
    ),
  },
  {
    id: 'tips',
    heading: 'Portfolio Tips That Save You Time',
    content: (
      <>
        <p>
          Building a portfolio is a marathon, not a sprint. These practical tips from experienced
          apprentices and assessors will help you stay on track:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build as You Go</h4>
                <p className="text-white text-sm leading-relaxed">
                  Do not save portfolio work for the end. Every Friday, spend 30 minutes organising
                  photos, writing descriptions, and filing evidence from that week. This turns a
                  massive task into a manageable routine. By the time you reach your final assessment,
                  your portfolio will be almost complete.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Map Evidence to Multiple Units</h4>
                <p className="text-white text-sm leading-relaxed">
                  One piece of evidence can cover assessment criteria in several units. A consumer
                  unit installation, for example, provides evidence for terminations, health and
                  safety, installation methods, and testing. Cross-reference your evidence to
                  maximise coverage and reduce the total amount you need to collect.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Write Reflective Accounts</h4>
                <p className="text-white text-sm leading-relaxed">
                  After completing a significant job, write a short reflective account (200 to 300
                  words): what was the job, what did you do, what went well, what would you do
                  differently, and what did you learn? Assessors value reflective accounts because
                  they demonstrate understanding, not just ability to follow instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Your portfolio is not just a qualification requirement — it is the beginning of your
          professional documentation habit. Qualified electricians who document their work well
          build better businesses, win more customers, and avoid disputes. Start the habit now.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NVQLevel2PortfolioGuidePage() {
  return (
    <GuideTemplate
      title="NVQ Level 2 Electrical Portfolio Guide | What You Need"
      description="Complete guide to building your NVQ Level 2 Electrical Installations portfolio. Evidence types, mandatory units, photographing work, common rejections, assessor expectations, and digital vs paper portfolios."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          NVQ Level 2 Electrical Portfolio:{' '}
          <span className="text-yellow-400">What You Need to Know</span>
        </>
      }
      heroSubtitle="Your NVQ portfolio is the proof that you can do the job. This guide covers how to structure it, what evidence to collect, how to photograph work properly, and what assessors actually look for."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About NVQ Electrical Portfolios"
      relatedPages={relatedPages}
      ctaHeading="Build Your NVQ Portfolio with Elec-Mate"
      ctaSubheading="Digital portfolio tools, structured photo templates, and NVQ unit tracking for electrical apprentices. Never miss a piece of evidence again. 7-day free trial."
    />
  );
}
