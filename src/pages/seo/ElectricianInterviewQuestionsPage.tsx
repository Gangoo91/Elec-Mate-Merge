import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  PoundSterling,
  FileText,
  Zap,
  MessageSquare,
  HelpCircle,
  Building,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'Interview Questions', href: '/guides/electrician-interview-questions' },
];

const tocItems = [
  { id: 'preparing-for-interview', label: 'Preparing for the Interview' },
  { id: 'technical-questions', label: 'Technical Questions' },
  { id: 'bs7671-questions', label: 'BS 7671 Questions' },
  { id: 'safe-isolation-questions', label: 'Safe Isolation Questions' },
  { id: 'testing-questions', label: 'Testing and Zs Values' },
  { id: 'behavioural-questions', label: 'Behavioural Questions' },
  { id: 'questions-to-ask', label: 'Questions to Ask the Employer' },
  { id: 'after-interview', label: 'After the Interview' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Technical questions about BS 7671, safe isolation, and Zs values are the backbone of any electrician interview — prepare specific answers with regulation references.',
  'Behavioural questions ("Tell me about a time when...") test how you handle pressure, mistakes, and difficult clients — prepare real examples from your work.',
  'Always have 3 to 5 questions ready to ask the employer — it shows genuine interest and helps you assess whether the role is right for you.',
  'Bring your qualification certificates, ECS card, and any digital profile (such as ElecID) to the interview to verify your credentials on the spot.',
  'Practice explaining technical concepts in plain English — an interviewer who is a contracts manager may not be a qualified electrician themselves.',
];

const faqs = [
  {
    question: 'What should I wear to an electrician interview?',
    answer:
      'It depends on the type of role. For a site-based installer or maintenance role, smart casual is appropriate — clean trousers, a collared shirt or polo, and clean shoes. You do not need a suit unless you are applying for a management, estimating, or office-based design role. If in doubt, dress one level above what you would wear on a normal working day. Whatever you wear, make sure it is clean and presentable. First impressions matter, and turning up in muddy work boots and a ripped polo suggests you do not take the opportunity seriously.',
  },
  {
    question: 'Should I bring my qualification certificates to the interview?',
    answer:
      "Yes, always bring your original qualification certificates (or high-quality copies) to the interview. This includes your C&G 2382 (18th Edition), C&G 2391 (Inspection and Testing), AM2 certificate, NVQ Level 3, and your ECS/JIB card. Some employers will want to see them on the day; others will ask for copies at a later stage. Either way, having them ready demonstrates organisation and professionalism. If you use Elec-Mate's ElecID, you can also share your verified digital profile directly with the interviewer — all your qualifications in one verifiable link.",
  },
  {
    question: 'How do I answer a technical question I do not know?',
    answer:
      'Honesty is always the best approach. Say "I\'m not 100% sure of the exact regulation reference, but my understanding is..." and give your best answer based on your knowledge. If you genuinely do not know, say so: "That\'s not an area I\'ve worked in directly, but I would look it up in BS 7671 / GN3 before carrying out the work." Interviewers are testing your approach as much as your knowledge. An electrician who admits uncertainty and knows where to find the answer is far more trustworthy than one who bluffs. Never guess at a safety-critical answer.',
  },
  {
    question: 'What if I am asked about a type of work I have not done?',
    answer:
      "Be honest about your experience, but frame it positively. For example: \"I haven't done commercial three-phase distribution work directly, but I completed three-phase modules during my training and I'm keen to develop that experience. I've worked on single-phase commercial installations and I understand the principles — I would be confident picking it up with guidance.\" Employers value honesty and willingness to learn over false claims of experience. If you are actively upskilling — perhaps studying for your 2391 or taking a fire alarm course — mention it to show you are investing in your development.",
  },
  {
    question: 'How long does an electrician interview usually last?',
    answer:
      'A typical electrician interview lasts 30 to 60 minutes. A simple site-based installer role with a small domestic contractor might be a 20-minute chat. A position with a large commercial or industrial contractor may involve a formal interview of 45 to 60 minutes, possibly with a practical assessment or written test on BS 7671 knowledge. Some employers also run a two-stage process: an initial telephone or video interview followed by a face-to-face meeting. If the interview involves a practical element (such as wiring a consumer unit or demonstrating safe isolation), allow extra time.',
  },
  {
    question: 'Should I follow up after the interview?',
    answer:
      'Yes, a brief follow-up email or message within 24 hours is good practice. Thank the interviewer for their time, reaffirm your interest in the role, and mention one or two specific things you discussed that reinforced your enthusiasm. Keep it short — 3 to 4 sentences. This is not common in the trades, which is exactly why it makes an impact. It shows professionalism and genuine interest. If you have not heard back within the timeframe they gave you, a polite follow-up phone call is appropriate. Do not chase multiple times — once is enough.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-cv-guide',
    title: 'Electrician CV Guide',
    description:
      'How to write an electrician CV that gets you to the interview stage — structure, qualifications, and common mistakes.',
    icon: FileText,
    category: 'Career',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Average electrician salaries by region, specialisation, and experience level across the UK.',
    icon: PoundSterling,
    category: 'Career',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete pathway from school leaver to qualified electrician — apprenticeships, courses, and qualifications.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation procedure — the most commonly tested topic in electrician interviews.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to the IET Wiring Regulations — the technical foundation for every interview question.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/domestic-vs-commercial-electrician',
    title: 'Domestic vs Commercial',
    description:
      'Compare work types, qualifications, and career paths — useful context for interview preparation.',
    icon: Building,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'preparing-for-interview',
    heading: 'Preparing for an Electrician Interview',
    content: (
      <>
        <p>
          Whether you are a newly qualified electrician attending your first interview or an
          experienced installer looking to move to a better company, preparation is the difference
          between landing the job and going home disappointed. Electrician interviews typically
          combine technical questions (to test your knowledge of regulations and procedures) with
          behavioural questions (to assess how you work, communicate, and handle problems).
        </p>
        <p>
          Before the interview, do your research. Understand what the company does — domestic,
          commercial, industrial, maintenance, or a mix. Look at their website and recent projects.
          Check whether they are registered with{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">NICEIC, NAPIT, or ELECSA</SEOInternalLink>
          . Know what the role involves so you can tailor your answers. An interview for a domestic
          rewire specialist is very different from one for a commercial maintenance electrician.
        </p>
        <p>
          Gather your documents: qualification certificates, ECS/JIB card, driving licence, and your{' '}
          <SEOInternalLink href="/guides/electrician-cv-guide">CV</SEOInternalLink>. If you use
          Elec-Mate, your ElecID profile has all your qualifications in one verified, shareable link
          — ideal for interviews.
        </p>
      </>
    ),
  },
  {
    id: 'technical-questions',
    heading: 'Technical Questions: What to Expect',
    content: (
      <>
        <p>
          Technical questions form the core of most electrician interviews. They test whether you
          understand the regulations, can carry out work safely, and know the procedures that matter
          on site. Here are the most common technical questions with guidance on how to answer them:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">1. What is the purpose of an EICR?</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "An EICR — Electrical Installation Condition Report — is
              a periodic inspection of the fixed electrical installation to assess its condition
              against the current edition of BS 7671. It identifies any defects, classifies them
              using observation codes (C1, C2, C3, FI), and gives an overall assessment of
              Satisfactory or Unsatisfactory. It is required every 5 years for rented properties
              under the 2020 Regulations and recommended every 5 to 10 years for domestic
              properties."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              2. What is the difference between an EIC and an MEIWC?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "An Electrical Installation Certificate covers new
              installation work — a full rewire, a new circuit, or a consumer unit change. It
              confirms the work complies with BS 7671 and includes a schedule of test results. A
              Minor Electrical Installation Works Certificate is for small jobs that do not involve
              a new circuit — like adding a socket to an existing circuit or replacing a light
              fitting. The key distinction is whether a new circuit has been created."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              3. What are the five tests carried out during initial verification?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "The sequence is: continuity of protective conductors,
              continuity of ring final circuit conductors, insulation resistance, polarity, and
              earth fault loop impedance. These are followed by prospective fault current
              measurement and RCD testing. The dead tests (continuity, insulation resistance,
              polarity) are done first with the supply isolated, then the live tests (loop
              impedance, PFC, RCD) are done with the supply restored."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              4. What is the minimum insulation resistance value?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "For circuits rated up to 500V, the minimum acceptable
              insulation resistance is 1 megohm, tested at 500V DC. In practice, a healthy
              installation should read well above this — typically 2 megohms or higher. A reading
              close to 1 megohm suggests degradation and warrants investigation. For SELV and PELV
              circuits, the test voltage is 250V DC with a minimum of 0.5 megohms."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              5. What is the difference between Class I and Class II equipment?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "Class I equipment relies on an earth connection for
              protection against electric shock — the metallic enclosure is connected to earth via
              the CPC. If a fault occurs, the earth path allows the protective device to operate.
              Class II equipment has double or reinforced insulation and does not require an earth
              connection. It is marked with the double square symbol. Examples: a metal kettle is
              Class I; a plastic power tool with a two-pin plug is Class II."
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-questions',
    heading: 'BS 7671 Regulation Questions',
    content: (
      <>
        <p>
          Interviewers often ask about specific{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 regulations
          </SEOInternalLink>{' '}
          to test your knowledge of the Wiring Regulations. You do not need to memorise every
          regulation number, but you should know the key ones:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">6. What does Regulation 411.3.3 require?</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "Regulation 411.3.3 requires additional protection by
              RCD with a rated residual operating current not exceeding 30mA for socket outlets
              rated at 32A or less, for mobile equipment rated at 32A or less for use outdoors, and
              for circuits supplying luminaires in domestic premises (as of Amendment 2). It is one
              of the most commonly referenced regulations in both inspections and interviews."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              7. What is the maximum disconnection time for a 230V final circuit?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "For a TN system, the maximum disconnection time for a
              final circuit not exceeding 32A is 0.4 seconds (Regulation 411.3.2.2). For a
              distribution circuit, it is 5 seconds. For a TT system, a 30mA RCD typically provides
              disconnection well within 0.2 seconds. The disconnection time is verified by
              confirming the earth fault loop impedance (Zs) is low enough for the protective device
              to operate within the required time."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              8. What earthing arrangements do you know?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "The three main earthing arrangements are TN-S (separate
              neutral and earth from the supply — the earth is provided via the cable sheath),
              TN-C-S (combined neutral and earth in the supply cable, separated at the origin — also
              called PME), and TT (no earth from the supply — the consumer provides their own earth
              via an earth electrode). TN-C-S is the most common in modern UK installations. TT
              systems require RCD protection on all circuits because the earth fault loop impedance
              is typically too high for overcurrent devices to disconnect within the required time."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              9. What is the purpose of main bonding and supplementary bonding?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "Main protective bonding connects
              extraneous-conductive-parts (metallic services entering the building — gas, water, oil
              pipes) to the main earthing terminal. Its purpose is to bring these services to the
              same potential as the electrical earth, reducing the risk of electric shock if a fault
              occurs. The minimum conductor size is 10mm squared for TN-C-S (PME) supplies or 6mm
              squared for TN-S. Supplementary bonding provides additional connection between
              simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts in
              locations of increased risk, such as bathrooms — though Amendment 2 relaxed the
              supplementary bonding requirements for bathrooms where other conditions are met."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              10. What does Part P of the Building Regulations cover?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "Part P covers electrical safety in dwellings. It
              requires that certain types of electrical work in domestic premises are either carried
              out by a registered competent person (NICEIC, NAPIT, ELECSA) who can self-certify, or
              notified to Building Control before work begins. Notifiable work includes new
              circuits, consumer unit replacements, work in special locations (bathrooms, kitchens
              within a defined zone), and any work in a garden or outbuilding. Non-notifiable work
              includes replacing accessories, adding a socket to an existing circuit (outside
              special locations), and like-for-like replacements."
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Study for your interview with Elec-Mate"
          description="Access 50+ structured training courses covering BS 7671, inspection and testing, and practical electrical knowledge. Revise the regulations and procedures that come up in every interview."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'safe-isolation-questions',
    heading: 'Safe Isolation Questions',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/safe-isolation-procedure">Safe isolation</SEOInternalLink>{' '}
          is the single most commonly asked topic in electrician interviews. Every employer needs to
          know that you understand and follow this procedure every time. Expect at least one
          question on it.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              11. Talk me through the safe isolation procedure.
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "First, identify the circuit or equipment to be isolated
              using drawings, labels, or circuit identification. Second, switch off the circuit at
              the consumer unit or isolator. Third, secure the isolation with a lock-off device and
              warning notice. Fourth, prove the voltage tester is working on a known live source (a
              proving unit). Fifth, test for dead at the point of work — test between line and
              neutral, line and earth, and neutral and earth. Sixth, prove the tester again on the
              known live source to confirm it is still working correctly. Only then is the circuit
              confirmed dead and safe to work on. The process follows GN3 (Guidance Note 3:
              Inspection and Testing)."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              12. What would you do if your voltage tester failed the second proving test?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "If the voltage tester fails the second proving test, I
              cannot confirm that the circuit is dead — the first 'dead' reading may have been a
              false reading due to a faulty tester. I would treat the circuit as potentially live,
              obtain a new or different voltage tester, and repeat the entire prove-test-prove
              sequence from the beginning. I would never proceed with work on a circuit where the
              tester has failed the second prove."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              13. What type of voltage tester should you use for safe isolation?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "You should use a two-pole voltage tester (also called a
              voltage indicator) that complies with GS 38 (HSE Guidance on electrical test
              equipment). Two-pole testers are preferred over one-pole testers (neon screwdrivers)
              because they test between conductors, giving a more reliable result. The tester should
              have fused probes, finger guards, and a CAT rating appropriate for the installation.
              Neon screwdrivers and non-contact voltage detectors should not be relied upon for safe
              isolation — they can give false readings."
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'testing-questions',
    heading: 'Testing and Zs Value Questions',
    content: (
      <>
        <p>
          If you are applying for a role that involves inspection and testing — or if you hold a{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">C&G 2391 qualification</SEOInternalLink>{' '}
          — expect questions about test procedures and acceptable values:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">14. What is Zs and why does it matter?</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "Zs is the earth fault loop impedance — the total
              impedance of the fault path from the point of the fault, through the protective
              conductor, back to the transformer. It determines how quickly the protective device
              will disconnect in the event of an earth fault. If Zs is too high, the fault current
              will be too low to trip the protective device within the required disconnection time.
              Maximum Zs values are published in tables in BS 7671 (Table 41.2 for fuses, Table 41.3
              for MCBs). The measured Zs on site must not exceed 80% of the tabulated maximum to
              allow for temperature variation."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">15. How do you test a ring final circuit?</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "A ring final circuit continuity test involves three
              steps. First, measure the end-to-end resistance of the line conductors (r1), neutral
              conductors (rn), and CPCs (r2) — they should be approximately equal (within 0.05
              ohms). Second, cross-connect the line and neutral conductors and measure at each
              socket — each reading should be approximately the same (roughly a quarter of the
              end-to-end value). Third, cross-connect the line and CPC and measure at each socket —
              the highest reading gives the R1+R2 for the circuit. This test confirms the ring is
              continuous, there are no interconnections, and identifies the CPC resistance at the
              furthest point."
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">
              16. What is prospective fault current and why do you measure it?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>Good answer:</strong> "Prospective fault current (PFC or PSCC — prospective
              short circuit current) is the maximum current that would flow in the event of a short
              circuit or earth fault at the origin of the installation. It is measured to confirm
              that the protective devices (MCBs, fuses, RCBOs) have an adequate breaking capacity —
              they must be able to safely interrupt the fault current without damage. BS 7671
              Regulation 434.5.1 requires the breaking capacity of each protective device to be not
              less than the prospective fault current at the point where it is installed. A typical
              domestic PFC is 1kA to 6kA; commercial and industrial installations can be
              significantly higher."
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'behavioural-questions',
    heading: 'Behavioural Questions and Model Answers',
    content: (
      <>
        <p>
          Behavioural questions test your soft skills, problem-solving ability, and how you handle
          real-world situations. The best way to answer them is with the STAR method: Situation,
          Task, Action, Result. Here are the most common behavioural questions in electrician
          interviews:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              17. Tell me about a time you found a fault that was difficult to diagnose.
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Describe a specific scenario — e.g., an intermittent RCD trip, a high-resistance
              connection, or a neutral-earth fault. Explain your diagnostic process step by step:
              what tests you ran, what you ruled out, and how you eventually identified and fixed
              the fault. Emphasise your systematic approach and patience.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              18. Describe a time when you made a mistake on a job. What happened?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Everyone makes mistakes. The interviewer wants to see that you own it, fix it, and
              learn from it. Choose a genuine but not catastrophic example — perhaps you missed a
              circuit on a schedule, ordered the wrong materials, or underestimated a job. Explain
              what happened, how you corrected it, and what you do differently now to prevent it
              recurring.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              19. How do you handle a difficult client or customer complaint?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Focus on listening, staying calm, and resolving the issue. A good answer: "I listen to
              the client's concern without interrupting, acknowledge their frustration, explain what
              has happened and why, and then propose a solution. If the issue is my fault, I fix it
              at no extra charge. If it is a misunderstanding, I explain clearly and offer to walk
              them through the work. Good communication prevents most complaints."
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              20. How do you keep up to date with changes to regulations?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Mention specific resources: the IET Wiring Regulations (BS 7671 amendments), your
              competent person scheme newsletters, CPD courses, industry publications (Electrical
              Times, Voltimum), and training platforms like{' '}
              <SEOInternalLink href="/guides/cpd-for-electricians">
                Elec-Mate's CPD courses
              </SEOInternalLink>
              . If you have completed the Amendment 2 update or any recent CPD, mention it with the
              date.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              21. What would you do if you saw a colleague working unsafely?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              This tests your commitment to safety. A good answer: "I would stop the work
              immediately if there was an imminent danger to them or anyone else. I would speak to
              the person directly and explain what I had observed and why it was unsafe. If
              necessary, I would escalate it to the site supervisor or site manager. Everyone on
              site has a duty to intervene if they see unsafe practices — it is not about getting
              someone in trouble, it is about preventing injury."
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'questions-to-ask',
    heading: 'Questions You Should Ask the Employer',
    content: (
      <>
        <p>
          At the end of every interview, you will be asked "Do you have any questions for us?" This
          is not a formality — it is your opportunity to assess whether the company is right for you
          and to demonstrate genuine interest. Here are strong questions to ask:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"What type of work will I be doing day to day?"</strong> — This clarifies
                whether the role is domestic, commercial, maintenance, installation, or a mix. It
                also reveals whether the company is honest about what the job actually involves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  "Do you provide a van and tools, or am I expected to supply my own?"
                </strong>{' '}
                — Essential for understanding the true value of the package. A salary of £38,000
                with a fully equipped van is worth more than £42,000 where you provide your own.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"What training and CPD opportunities do you offer?"</strong> — Good
                employers invest in their electricians' development. Ask about paid training days,
                qualification sponsorship, and CPD allowances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"What progression opportunities are there?"</strong> — Shows ambition and
                forward thinking. Ask about supervisor roles, project management, or design
                engineering pathways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"Which competent person scheme are you registered with?"</strong> — This
                tells you about the company's approach to compliance and quality.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'after-interview',
    heading: 'After the Interview: Next Steps',
    content: (
      <>
        <p>
          The interview does not end when you walk out of the door. What you do in the 24 hours
          after the interview can make a real difference:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Send a follow-up message.</strong> A brief email or text thanking the
                interviewer, confirming your interest, and referencing something specific from the
                conversation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review your answers.</strong> Note any questions you struggled with and
                research the correct answers. This prepares you for future interviews, even if this
                one does not work out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep your options open.</strong> Do not stop looking until you have a
                written offer. Verbal offers can fall through, and keeping momentum in your search
                means you are never left waiting.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Stand out with a verified ElecID profile"
          description="Share your Elec-Mate ElecID with employers — a verified digital profile showing your qualifications, CPD, and certification history. One link that proves your competence."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianInterviewQuestionsPage() {
  return (
    <GuideTemplate
      title="Electrician Interview Questions | Top 25 & Answers"
      description="Top 25 electrician interview questions with model answers. Technical questions on BS 7671, safe isolation, and Zs values. Behavioural questions, plus what to ask the employer. UK-focused guide for 2026."
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Electrician Interview Questions:{' '}
          <span className="text-yellow-400">Top 25 Questions and How to Answer Them</span>
        </>
      }
      heroSubtitle="From safe isolation procedures to BS 7671 regulation references, from behavioural scenarios to questions you should ask the employer — this guide covers every question you are likely to face in an electrician interview, with model answers that show you know your stuff."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Interviews"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Your Electrician Interview"
      ctaSubheading="Study BS 7671, testing procedures, and practical electrical knowledge with 50+ structured training courses on Elec-Mate. Build your ElecID profile to share verified qualifications with employers. 7-day free trial."
    />
  );
}
