import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Camera,
  FileText,
  Users,
  ClipboardCheck,
  CheckCircle,
  GraduationCap,
  ShieldCheck,
  Star,
  Briefcase,
  Brain,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/study-centre/apprentice' },
  { label: 'OJT Evidence', href: '/guides/ojt-evidence-guide' },
];

const tocItems = [
  { id: 'what-is-ojt', label: 'What Is OJT Evidence?' },
  { id: 'types-of-evidence', label: 'Types of Evidence' },
  { id: 'photographs', label: 'Photographic Evidence' },
  { id: 'witness-testimonies', label: 'Witness Testimonies' },
  { id: 'skills-sign-off', label: 'Skills Sign-Off' },
  { id: 'building-portfolio', label: 'Building Your Portfolio' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'employer-role', label: 'The Employer Role' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'On-the-job training (OJT) evidence is a mandatory requirement for electrical apprenticeships — it demonstrates that you have applied your theoretical knowledge in real-world work situations under proper supervision.',
  'The five main types of OJT evidence are: photographic evidence of work carried out, witness testimonies from your supervisor, work logs and reflective accounts, skills sign-off records, and professional discussion records.',
  'Quality matters more than quantity — one detailed photograph with a clear description of what you did, why you did it, and how it relates to your qualification criteria is worth more than ten poorly documented photos.',
  'Your employer and supervisor play a critical role — they must provide witness testimonies, sign off your skills, and confirm that you have carried out work to a competent standard under their supervision.',
  'Elec-Mate includes OJT evidence tracking tools that let apprentices photograph work, record descriptions, link evidence to qualification criteria, and build their portfolio directly on their phone.',
];

const faqs = [
  {
    question: 'What is OJT evidence and why do I need it?',
    answer:
      'On-the-job training (OJT) evidence is documented proof that you have carried out practical electrical work in a real workplace under supervision. It is a mandatory component of electrical apprenticeships (Level 2 and Level 3) and is assessed as part of your end-point assessment (EPA). The purpose is to demonstrate that you can apply the theoretical knowledge learned at college or through your training provider in actual work situations. Without sufficient OJT evidence, you cannot progress to your EPA gateway, which means you cannot complete your apprenticeship. Your training provider will specify the exact OJT evidence requirements for your qualification, including the types of evidence required, the number of items, and the qualification criteria each piece of evidence must map to.',
  },
  {
    question: 'How many pieces of OJT evidence do I need?',
    answer:
      'The exact number depends on your training provider and the specific apprenticeship standard you are following. For the Level 3 Installation Electrician apprenticeship, most training providers require evidence covering all the knowledge, skills, and behaviours (KSBs) defined in the apprenticeship standard. In practice, this typically means 30 to 60 individual pieces of evidence across the full duration of the apprenticeship, covering areas such as installation work, inspection and testing, fault finding, health and safety, communication with clients, and working as part of a team. Quality is always more important than quantity — a smaller number of well-documented, detailed pieces of evidence that clearly demonstrate competence is far better than a large collection of poorly documented items. Aim for at least 2-3 strong pieces of evidence for each KSB area.',
  },
  {
    question: 'Can I use photos taken on my phone as OJT evidence?',
    answer:
      'Yes, photographs taken on your phone are one of the most common and effective forms of OJT evidence. However, a photo alone is not sufficient — you must accompany each photograph with a written description explaining what the photo shows, what work you carried out, what tools and materials you used, why you did it that way (referencing BS 7671 or other relevant standards where appropriate), and which qualification criteria or KSB the evidence demonstrates. Take photos at multiple stages of the work — before you start (the existing condition), during the work (showing your methods and techniques), and after completion (the finished installation). Ensure photos are clear, well-lit, and show enough context to understand what is being pictured. Avoid photos that could identify clients or their property without consent — focus on the electrical work itself.',
  },
  {
    question: 'Who can provide a witness testimony?',
    answer:
      'A witness testimony must be provided by someone who directly observed you carrying out the work and is competent to assess the quality of your work. In most cases, this is your workplace supervisor or the qualified electrician you work alongside. The witness must hold relevant qualifications (typically the full Level 3 Installation Electrician qualification or equivalent, plus current 18th Edition) and be employed by the same company or directly supervising your work on site. Your college tutor or training provider assessor can also provide witness testimonies for work observed during practical assessments at college. A witness testimony should describe what they observed you doing, the standard of your work, any areas where you demonstrated particular competence, and any areas for improvement. It should be signed and dated by the witness.',
  },
  {
    question: 'What is a reflective account and how do I write one?',
    answer:
      'A reflective account is a written description of a piece of work you carried out, combined with your reflection on what went well, what you learned, and how you would approach the same task differently in future. It is a first-person account written in your own words. A good reflective account covers: what the task was and why it was needed, what you did step by step, what tools, materials, and methods you used, any challenges you encountered and how you overcame them, what relevant regulations or standards applied (e.g., BS 7671 requirements), what you learned from the experience, and what you would do differently next time. Reflective accounts are particularly valuable because they demonstrate not just competence but also the ability to learn and improve — which is a key part of professional development. Aim for 200 to 500 words per reflective account, with enough technical detail to demonstrate understanding.',
  },
  {
    question: 'How do I organise my OJT portfolio?',
    answer:
      'Organisation is critical — a disorganised portfolio makes it difficult for your assessor to find evidence and can result in evidence being missed during assessment. The most effective approach is to organise your portfolio by the Knowledge, Skills, and Behaviours (KSBs) defined in the apprenticeship standard. Create a section for each KSB and place the relevant evidence within it. Each piece of evidence should be clearly labelled with the date, the type of work, the location (without identifying the client), the KSB it maps to, and a cross-reference to any related evidence. Many apprentices use a spreadsheet or tracking matrix to map their evidence against the KSBs, highlighting any gaps that need to be filled. Elec-Mate includes portfolio building tools that let you organise evidence digitally, link it to KSBs, and track your coverage across the full apprenticeship standard — all on your phone.',
  },
  {
    question: 'What happens if I do not have enough OJT evidence for EPA gateway?',
    answer:
      'If you do not have sufficient OJT evidence, you cannot pass through the EPA gateway and cannot proceed to your end-point assessment. Your training provider and employer will review your evidence portfolio before the gateway decision. If gaps are identified, you will be given additional time to gather the required evidence. This may mean your apprenticeship completion is delayed. To avoid this, start gathering evidence from day one of your apprenticeship, take photographs and write descriptions regularly (weekly is ideal), and review your evidence coverage against the KSB framework at least quarterly. Your training provider should also conduct regular progress reviews (typically every 12 weeks) where your evidence portfolio is reviewed and any gaps are identified. If your employer is not providing you with opportunities to gather evidence in certain areas, raise this with your training provider — they can work with your employer to ensure you get the necessary work experience.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/epa-simulator-guide',
    title: 'EPA Simulator Guide',
    description:
      'Prepare for your end-point assessment with practice synoptic projects and professional discussion preparation.',
    icon: GraduationCap,
    category: 'Apprentice',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'Complete guide to building your apprentice evidence portfolio. Organisation, formatting, and what assessors look for.',
    icon: BookOpen,
    category: 'Apprentice',
  },
  {
    href: '/study-centre/apprentice',
    title: 'Apprentice Study Centre',
    description:
      'Structured training courses for Level 2 and Level 3 electrical apprentices. Theory, practical, and exam preparation.',
    icon: Brain,
    category: 'Training',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Complete guide to becoming an electrician through the apprenticeship route. Qualifications, timelines, and career paths.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-contractor-guide',
    title: 'Electrical Contractor Guide',
    description:
      'For employers: how to take on apprentices, funding, supervision requirements, and building your team.',
    icon: Briefcase,
    category: 'Business',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training courses on the Elec-Mate platform.',
    icon: ClipboardCheck,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-ojt',
    heading: 'What Is OJT Evidence?',
    content: (
      <>
        <p>
          On-the-job training (OJT) evidence is the documented proof that you — as an electrical
          apprentice — have carried out real electrical work in a real workplace under the
          supervision of a qualified electrician. It is a mandatory component of every electrical
          apprenticeship in England, and without it, you cannot progress to your end-point
          assessment (EPA).
        </p>
        <p>
          The purpose of OJT evidence is straightforward: your college or training provider teaches
          you the theory and gives you practical experience in a workshop environment — see our{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship guide
          </SEOInternalLink>{' '}
          for an overview of the full qualification pathway. OJT evidence proves that you can apply
          that knowledge and those skills in the real world — on actual installations, with real
          clients, under genuine working conditions.
        </p>
        <p>
          The apprenticeship standard for the Level 3 Installation Electrician (ST0152) defines a
          set of Knowledge, Skills, and Behaviours (KSBs) that you must demonstrate competence in.
          Your OJT evidence must cover all of these KSBs. The evidence is reviewed at your EPA
          gateway — the point at which your employer and training provider confirm you are ready to
          sit your end-point assessment — and forms the basis of your{' '}
          <SEOInternalLink href="/guides/epa-simulator-guide">
            professional discussion
          </SEOInternalLink>{' '}
          during the EPA itself.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-evidence',
    heading: 'Types of OJT Evidence',
    content: (
      <>
        <p>
          There are several types of evidence that you can use to build your OJT portfolio. A strong
          portfolio uses a mix of evidence types to demonstrate competence from multiple angles.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Photographic Evidence</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photos of work you have carried out — before, during, and after. Each photo must
                  be accompanied by a written description explaining what you did and why. The most
                  common and most effective form of evidence.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Witness Testimonies</h4>
                <p className="text-white text-sm leading-relaxed">
                  Written statements from your supervisor or qualified electrician confirming that
                  they observed you carrying out work to a competent standard. Signed and dated by
                  the witness.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Work Logs and Reflective Accounts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Written descriptions of work you carried out, including your reflection on what
                  went well, what you learned, and what you would do differently. Demonstrates
                  professional development and self-awareness.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Skills Sign-Off Records</h4>
                <p className="text-white text-sm leading-relaxed">
                  Formal sign-off by your supervisor confirming that you can perform specific tasks
                  competently and safely. Usually structured around the KSB framework with a
                  competent/not yet competent assessment for each skill.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates and Test Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  Copies of certificates you contributed to (EICR, EIC, Minor Works), test results
                  you recorded, and any documentation you helped produce. Shows your involvement in
                  the full certification workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'photographs',
    heading: 'Photographic Evidence: How to Do It Properly',
    content: (
      <>
        <p>
          Photographic evidence is the backbone of most OJT portfolios. Done well, a single
          photograph with a clear description can demonstrate multiple KSBs. Done poorly, a hundred
          blurry, undescribed photos are worthless.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take before, during, and after photos</strong> — the "before" shows the
                existing condition or the starting point. The "during" shows your work in progress —
                this is the most valuable because it proves you actually did the work. The "after"
                shows the completed installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Include context</strong> — a close-up of a termination is useful, but also
                take a wider shot showing where it is in the installation. Context helps your
                assessor understand the scope and complexity of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Write a detailed description</strong> — for each photo, write 100 to 200
                words explaining: what the photo shows, what work you carried out, what tools and
                materials you used, why you chose that method, any regulations or standards that
                applied (cite BS 7671 regulation numbers where relevant), and which KSB the evidence
                demonstrates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respect client privacy</strong> — do not include photos that identify the
                client's property address, personal belongings, or family members. Focus on the
                electrical work itself. If your employer has a policy about photographs on client
                premises, follow it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Take photos on every job, every day. It only takes 30 seconds to photograph your work, but
          trying to reconstruct evidence months later when you realise you have a gap in your
          portfolio is nearly impossible. For more on building a complete portfolio, see our{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio-guide">
            apprentice portfolio guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'witness-testimonies',
    heading: 'Witness Testimonies',
    content: (
      <>
        <p>
          Witness testimonies are written statements from your supervisor or the qualified
          electrician you work alongside, confirming that they observed you carrying out work to a
          competent standard. They carry significant weight with assessors because they provide
          independent confirmation of your abilities.
        </p>
        <p>A good witness testimony should include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What was observed</strong> — a specific description of the work the
                apprentice carried out. "Installed a new consumer unit" is too vague. "Installed a
                Hager 12-way consumer unit with dual RCD configuration, terminated 10 circuits
                including a 32A cooker circuit and 16A immersion heater circuit, tested all circuits
                to BS 7671 requirements, and completed the EIC with my supervision" is much better.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level of competence demonstrated</strong> — did the apprentice work
                independently with minimal guidance, or did they require significant direction? Both
                are acceptable depending on the stage of the apprenticeship, but the testimony
                should be honest about the level of support provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety awareness</strong> — did the apprentice follow safe
                working practices? Did they carry out a safe isolation procedure? Did they use
                appropriate PPE? Did they identify and manage any risks?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signature, date, and witness details</strong> — the witness must sign the
                testimony, date it, and provide their name, qualifications, and relationship to the
                apprentice (e.g., "Supervising Electrician, ABC Electrical Ltd").
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ask your supervisor for witness testimonies regularly — at least monthly. Do not wait
          until the end of your apprenticeship and ask them to write 20 testimonies from memory. The
          best testimonies are written shortly after the work was observed, when the details are
          fresh.
        </p>
      </>
    ),
  },
  {
    id: 'skills-sign-off',
    heading: 'Skills Sign-Off',
    content: (
      <>
        <p>
          Skills sign-off is a formal process where your supervisor confirms that you have
          demonstrated competence in specific practical skills. Your training provider will usually
          provide a skills sign-off document or matrix that lists all the practical skills you need
          to demonstrate during your apprenticeship.
        </p>
        <p>Common skills areas for the Level 3 Installation Electrician include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation</strong> — proving and locking off supplies, using a voltage
                indicator proved before and after isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable installation</strong> — clipping, trunking, conduit bending, and
                containment systems. Surface and concealed installation methods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminations</strong> — stripping, terminating, and connecting cables at
                consumer units, distribution boards, accessories, and equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> —{' '}
                <SEOInternalLink href="/guides/testing-sequence-guide">
                  continuity of protective conductors, insulation resistance, polarity
                </SEOInternalLink>
                , earth fault loop impedance, prospective fault current, and RCD operation. Using
                calibrated instruments correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection</strong> — visual inspection of installations, identifying
                defects, and applying{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  observation codes
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding</strong> — systematic approach to diagnosing and rectifying
                faults using test instruments and logical reasoning.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each skill is typically assessed as "competent" or "not yet competent." Your supervisor
          must observe you performing the skill on a real job (not just in a workshop) and confirm
          competence by signing and dating the sign-off document. Some skills may need to be
          demonstrated multiple times before sign-off is given.
        </p>
      </>
    ),
  },
  {
    id: 'building-portfolio',
    heading: 'Building Your Portfolio: A Practical Approach',
    content: (
      <>
        <p>
          The key to a strong OJT portfolio is consistency. Start gathering evidence from day one of
          your apprenticeship. Take photos every day. Write descriptions at least weekly. Request
          witness testimonies monthly. Review your coverage against the KSB framework quarterly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily habit</strong> — photograph your work at the end of every job or at
                the end of each day. It takes 30 seconds. If you do not do it now, you will never
                have that evidence again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly review</strong> — spend 15-20 minutes at the end of each week writing
                descriptions for your photos, drafting a reflective account of the most interesting
                job you worked on, and updating your evidence log.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly testimony</strong> — ask your supervisor for a witness testimony
                covering the key work you carried out that month. Provide them with a list of jobs
                and activities to make it easy for them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly gap analysis</strong> — map your existing evidence against the KSB
                framework and identify any gaps. Discuss these gaps with your supervisor and
                training provider so they can ensure you get the necessary work experience.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build your OJT portfolio on your phone"
          description="Elec-Mate's apprentice tools let you photograph work, write descriptions, link evidence to KSBs, track your coverage, and build your portfolio digitally — all on your phone. No separate folder of printed photos."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes to Avoid',
    content: (
      <>
        <p>
          These are the most common mistakes apprentices make with OJT evidence. Avoid them and you
          will have a portfolio that makes your assessor's job easy and your EPA gateway smooth.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leaving it all to the end</strong> — the single biggest mistake. You cannot
                reconstruct 3-4 years of evidence in the last few months. Start from day one and
                build consistently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photos without descriptions</strong> — a photo of a consumer unit with no
                explanation of what you did, why, and how is almost worthless as evidence. Every
                photo needs a written context.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not mapping to KSBs</strong> — evidence that does not link to specific
                Knowledge, Skills, or Behaviours from the apprenticeship standard is difficult for
                assessors to use. Always state which KSB each piece of evidence demonstrates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Only showing installation work</strong> — your portfolio should cover the
                full range of the apprenticeship standard, including inspection and testing, fault
                finding, health and safety, communication with clients, and working as part of a
                team. Do not neglect the non-technical KSBs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generic witness testimonies</strong> — "John is a good apprentice and works
                hard" is not a useful testimony. It should describe specific work observed and the
                level of competence demonstrated. Help your supervisor write useful testimonies by
                telling them what you worked on and which KSBs it covers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'employer-role',
    heading: 'The Employer Role in OJT Evidence',
    content: (
      <>
        <p>
          If you employ apprentices, your role in the OJT evidence process is critical. The
          apprentice cannot build their portfolio without your active support.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide varied work experience</strong> — ensure your apprentice gets
                exposure to all areas of the apprenticeship standard: installation, testing,
                inspection, fault finding, different installation types (domestic, commercial), and
                different working environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Write regular witness testimonies</strong> — commit to writing at least one
                testimony per month. Be specific about what you observed and the level of competence
                demonstrated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sign off skills</strong> — when the apprentice demonstrates competence in a
                skill area, sign it off promptly. Do not wait for end-of-year reviews.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Allow time for evidence recording</strong> — give the apprentice 15-20
                minutes at the end of each week to update their portfolio. This is not wasted time —
                it is a requirement of the apprenticeship programme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate provides tools for both apprentices and employers. Your apprentice builds their
          portfolio on the app, and you can review their evidence, provide feedback, and sign off
          skills digitally. For more on employing apprentices, see our{' '}
          <SEOInternalLink href="/guides/electrical-contractor-guide">
            Electrical Contractor Guide
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Support your apprentice with Elec-Mate"
          description="Structured training courses, OJT evidence tracking, EPA preparation, and BS 7671 study resources — all included in your subscription. Give your apprentices the tools they need to succeed."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OJTEvidenceGuidePage() {
  return (
    <GuideTemplate
      title="OJT Evidence Guide | Apprentice On-the-Job Training"
      description="Complete guide to on-the-job training (OJT) evidence for electrical apprentices. Types of evidence, photographic documentation, witness testimonies, skills sign-off, building your portfolio, and common mistakes to avoid."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          OJT Evidence Guide:{' '}
          <span className="text-yellow-400">Building Your Apprentice Portfolio</span>
        </>
      }
      heroSubtitle="On-the-job training evidence is a mandatory requirement for every electrical apprenticeship. This guide covers exactly what evidence you need, how to document it properly, and how to build a portfolio that gets you through the EPA gateway — with practical tips from day one to end-point assessment."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About OJT Evidence"
      relatedPages={relatedPages}
      ctaHeading="Build Your OJT Portfolio with Elec-Mate"
      ctaSubheading="Photograph work, write descriptions, link evidence to KSBs, and track your portfolio coverage — all on your phone. Plus structured training courses for Level 2 and Level 3. 7-day free trial."
    />
  );
}
