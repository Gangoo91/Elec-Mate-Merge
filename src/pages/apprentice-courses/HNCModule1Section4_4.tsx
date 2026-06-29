/**
 * Module 1 · Section 4 · Subsection 4 — Ethical Responsibilities
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Professional ethics, conflict of interest, whistleblowing, codes of conduct.
 *   Engineer-in-training perspective: how an HNC engineer navigates ethical tension
 *   between client, employer, profession and the public interest.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Ethical Responsibilities - HNC Module 1 Section 4.4';
const DESCRIPTION =
  'Understand professional ethics in building services engineering: whistleblowing protections, conflicts of interest, professional codes of conduct from IET and ECA, and maintaining integrity.';

const quickCheckQuestions = [
  {
    id: 'whistleblowing-law',
    question: 'What is the primary legislation protecting whistleblowers in the UK?',
    options: [
      'Bribery Act 2010',
      'Health and Safety at Work Act 1974',
      'Public Interest Disclosure Act 1998',
      'Employment Rights Act 1996 only',
    ],
    correctIndex: 2,
    explanation:
      "The Public Interest Disclosure Act 1998 (PIDA) is the primary legislation protecting whistleblowers. It amends the Employment Rights Act 1996 to protect workers who make 'qualifying disclosures' about wrongdoing from detriment or dismissal.",
  },
  {
    id: 'qualifying-disclosure',
    question: 'Which of the following would qualify as a protected disclosure under PIDA?',
    options: [
      'Reporting that a colleague was late to work',
      'Complaining about office temperature preferences',
      'Disclosing that safety equipment is being removed to save costs',
      'Reporting that canteen food is too expensive',
    ],
    correctIndex: 2,
    explanation:
      'A qualifying disclosure must relate to one of six categories including criminal offences, breach of legal obligations, danger to health and safety, environmental damage, miscarriage of justice, or concealment of any of these. Removing safety equipment would create danger to health and safety.',
  },
  {
    id: 'conflict-of-interest',
    question: 'What should a building services engineer do if they have a conflict of interest?',
    options: [
      'Declare it and, if necessary, withdraw from the decision or project',
      'Evacuate the area immediately, prevent ignition sources, and ventilate before re-entry',
      'Using stimulated Raman scattering for distributed amplification',
      'Occupants remain in their fire-resistant compartment unless directly threatened',
    ],
    correctIndex: 0,
    explanation:
      "Professional codes of conduct require declaration of conflicts of interest. If the conflict is significant, the professional should withdraw from the decision or project. Transparency and acting in the client's/employer's best interest are fundamental ethical obligations.",
  },
  {
    id: 'iet-membership',
    question: 'What is a key obligation of IET membership regarding competence?',
    options: [
      'To only undertake work within your competence and decline work outside it',
      'To avoid large variations between bright and dark areas that could impair visibility',
      'At least 20 minutes continuously, ensuring water flows away from the unaffected eye',
      'Submittal number, description, date submitted, and approval status',
    ],
    correctIndex: 0,
    explanation:
      'The IET Code of Conduct requires members to only undertake work or take on responsibilities that they are competent to perform. This applies to all membership grades and requires members to decline or refer work beyond their competence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is NOT one of the six categories for a qualifying disclosure under PIDA?',
    options: [
      'A criminal offence has been, is being, or is likely to be committed',
      'A personal grievance about pay or conditions',
      'The health and safety of any individual is endangered',
      'Information tending to show any of the above is being or is likely to be concealed',
    ],
    correctAnswer: 1,
    explanation:
      'PIDA protects disclosures about: criminal offences, breach of legal obligations, miscarriage of justice, health and safety dangers, environmental damage, and concealment of any of these. Personal grievances about employment terms are not protected as whistleblowing.',
  },
  {
    id: 2,
    question: 'To whom should a worker first make a protected disclosure?',
    options: [
      'A national newspaper or broadcast journalist',
      'Their local Member of Parliament',
      'Their employer or, for health and safety matters, the HSE',
      'A competitor company in the same industry',
    ],
    correctAnswer: 2,
    explanation:
      'The legislation encourages internal disclosure first - to the employer or, for relevant matters, to prescribed persons like the HSE. External disclosure (media, MPs) is protected in more limited circumstances, typically when internal disclosure would be futile or dangerous.',
  },
  {
    id: 3,
    question: "What does professional 'integrity' require in building services engineering?",
    options: [
      'Always prioritising the lowest possible project cost',
      'Following the client’s instructions without question',
      'Keeping all design decisions confidential from colleagues',
      'Acting honestly, fairly, and transparently in professional relationships',
    ],
    correctAnswer: 3,
    explanation:
      'Integrity means acting honestly, fairly, and transparently. It includes not misleading clients or the public, not taking bribes or inducements, declaring conflicts of interest, and being truthful in professional representations.',
  },
  {
    id: 4,
    question:
      'An electrician discovers their company is routinely bypassing safety interlocks to speed up commissioning. What is the ethical course of action?',
    options: [
      'Raise the concern through appropriate channels, internally first',
      'Say nothing, as commissioning is not their responsibility',
      'Bypass the interlocks too, to keep pace with colleagues',
      'Wait until an accident happens before reporting it',
    ],
    correctAnswer: 0,
    explanation:
      'The ethical response is to raise the concern. PIDA encourages internal disclosure first - to supervisors, safety representatives, or through internal whistleblowing procedures. If internal routes fail or are inappropriate, external disclosure to the HSE may be warranted.',
  },
  {
    id: 5,
    question:
      "Which professional body's code of conduct specifically applies to electrical engineers in the UK?",
    options: [
      'RIBA',
      'IET',
      'CIOB',
      'RICS',
    ],
    correctAnswer: 1,
    explanation:
      'The Institution of Engineering and Technology (IET) is the professional body for electrical, electronic, manufacturing, and IT engineers. Its Code of Conduct sets ethical standards for members working in the electrotechnical sector.',
  },
  {
    id: 6,
    question:
      'Under the IET Code of Conduct, members must exercise professional skill and judgement to:',
    options: [
      'Maximise their own financial benefit',
      'Support their employer regardless of ethical concerns',
      'Protect the health, safety and welfare of all',
      'Maintain confidentiality above all other considerations',
    ],
    correctAnswer: 2,
    explanation:
      "The IET Code requires members to 'exercise professional skill and judgment to the best of their ability and discharge their professional responsibilities with integrity' with particular emphasis on 'protecting health, safety and welfare'.",
  },
  {
    id: 7,
    question:
      'A consultant engineer is offered a commission by a supplier if they specify their products. What should they do?',
    options: [
      'Accept it quietly, as long as the products are adequate',
      'Accept it but increase the client’s fee to compensate',
      'Accept it and disclose it only if the client asks',
      'Decline, as it creates a conflict of interest that could compromise professional judgement',
    ],
    correctAnswer: 3,
    explanation:
      'Accepting commissions or inducements from suppliers creates a conflict of interest. Professional codes prohibit this as it compromises independent professional judgement. The engineer must specify products based on technical merit and client interest, not personal gain.',
  },
  {
    id: 8,
    question: 'What protection does PIDA provide to workers who make qualifying disclosures?',
    options: [
      'Protection from dismissal and detriment by their employer',
      'A guaranteed financial reward for every disclosure made',
      'Automatic promotion within their organisation',
      'Immunity from any future disciplinary action whatsoever',
    ],
    correctAnswer: 0,
    explanation:
      'PIDA protects workers from unfair dismissal and from being subjected to any detriment by their employer because of making a protected disclosure. Dismissal for making a protected disclosure is automatically unfair.',
  },
  {
    id: 9,
    question: "The ECA (Electrical Contractors' Association) requires member companies to:",
    options: [
      'Use only one named manufacturer’s products on every job',
      'Maintain high standards of workmanship and business ethics',
      'Charge the same fixed price as all other member firms',
      'Employ only directly contracted staff and never subcontract',
    ],
    correctAnswer: 1,
    explanation:
      'ECA membership requires commitment to high standards of workmanship, business ethics, and compliance with relevant legislation. Member companies must maintain technical competence, proper training, and ethical business practices.',
  },
  {
    id: 10,
    question: 'What is the relationship between professional ethics and legal requirements?',
    options: [
      'They are identical - ethics means following the law',
      'There is no relationship between them',
      'Professional ethics often exceed minimum legal requirements',
      'Legal requirements are always more demanding than ethics',
    ],
    correctAnswer: 2,
    explanation:
      'Professional ethics typically go beyond minimum legal compliance. While the law sets minimum standards, professional codes often require higher standards of conduct, transparency, and responsibility. A practice might be legal but still unethical.',
  },
];

const faqs = [
  {
    question: 'What if my employer retaliates against me for whistleblowing?',
    answer:
      'If you suffer detriment or dismissal for making a protected disclosure, you can bring a claim to an employment tribunal. Compensation for unfair dismissal as a result of whistleblowing is uncapped (unlike ordinary unfair dismissal). You may also be able to seek an interim injunction to prevent dismissal. Document everything and seek advice from ACAS, a trade union, or specialist solicitor.',
  },
  {
    question: 'Can I make an anonymous disclosure?',
    answer:
      'Yes, you can make anonymous disclosures to your employer or the HSE. However, anonymous disclosures may be harder to investigate and you may not receive legal protection if you cannot prove you made the disclosure. Consider confidential (not anonymous) disclosure where your identity is protected but known to the recipient.',
  },
  {
    question: "What counts as a 'conflict of interest'?",
    answer:
      'A conflict of interest exists when your personal interests, or those of someone close to you, could influence or appear to influence your professional judgement. Examples include: financial interests in suppliers, family relationships with contractors, outside business interests competing with your employer, or being offered gifts/hospitality that might affect decisions.',
  },
  {
    question: 'Is there a difference between ethics and compliance?',
    answer:
      "Yes. Compliance means following rules, regulations, and laws - it's about meeting minimum required standards. Ethics goes further - it's about doing what's right even when no rule requires it. A compliant professional follows procedures; an ethical professional considers whether those procedures are adequate and raises concerns if not.",
  },
  {
    question: 'What ethical obligations do I have to report unsafe work by others?',
    answer:
      'Professional codes require you to take action if you become aware of dangerous practices, whether by colleagues, subcontractors, or clients. This typically means raising concerns through appropriate channels - internally first, then externally if necessary. Staying silent when you know of dangers could make you complicit and may breach professional obligations.',
  },
  {
    question: 'How do professional body disciplinary procedures work?',
    answer:
      'If a member of a professional body (IET, etc.) breaches their code of conduct, complaints can be made to the body. Investigations follow, potentially leading to disciplinary panels. Sanctions range from advice and reprimands to suspension or expulsion from membership. Serious matters may also be referred to statutory regulators or police.',
  },
];

const HNCModule1Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1.4.4"
            title="Ethical Responsibilities"
            description="Professional ethics, whistleblowing, conflicts of interest and codes of conduct in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will operate against a recognised code of conduct (Engineering Council Statement of Ethical Principles, IET / CIBSE codes) and place public interest above commercial pressure.',
              'You can identify and disclose conflicts of interest — financial, personal or professional — and step back where required.',
              'You apply the Public Interest Disclosure Act 1998 (PIDA) and ERA 1996 s.43 protection when raising whistleblowing concerns.',
              'You hold competence within scope and refer to better-qualified colleagues when the task exceeds your knowledge.',
            ]}
          />

          <RegsCallout
            source="Public Interest Disclosure Act 1998 — inserted into ERA 1996 s.43B(1)"
            clause="In this Part a 'qualifying disclosure' means any disclosure of information which, in the reasonable belief of the worker making the disclosure, is made in the public interest and tends to show one or more of the following—(a) that a criminal offence has been committed, is being committed or is likely to be committed, (b) that a person has failed, is failing or is likely to fail to comply with any legal obligation to which he is subject, (c) that a miscarriage of justice has occurred, is occurring or is likely to occur, (d) that the health or safety of any individual has been, is being or is likely to be endangered, (e) that the environment has been, is being or is likely to be damaged, or (f) that information tending to show any matter falling within any one of the preceding paragraphs has been, is being or is likely to be deliberately concealed."
            meaning={
              <>
                The Act gives you statutory protection from dismissal or detriment if you raise
                a genuine safety concern in the public interest. Engineering professionalism
                rests on the same foundation as the law — speak up when it matters.
              </>
            }
            cite="Source: Employment Rights Act 1996, s.43B(1) (inserted by Public Interest Disclosure Act 1998) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Understand the role of professional ethics in building services engineering",
              "Explain whistleblowing protections under the Public Interest Disclosure Act",
              "Identify and manage conflicts of interest in professional practice",
              "Apply the IET and ECA codes of conduct to workplace situations",
              "Distinguish between legal compliance and ethical behaviour",
              "Understand consequences of breaching professional codes",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Professional Ethics in Building Services</ContentEyebrow>

          <ConceptBlock title="Professional Ethics in Building Services">
            <p>
            Professional ethics provides a framework for making decisions that go beyond mere
            legal compliance. While law sets minimum standards, ethics guides professionals to act
            with integrity, protect the public interest, and maintain the reputation of their
            profession.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Ethics vs Law vs Morality
            </p>
            
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-blue-400 mb-1">Law</p>
            <p className="text-xs text-white">
            Mandatory rules enforced by the state. Minimum standards.
            </p>
            </div>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-elec-yellow mb-1">Ethics</p>
            <p className="text-xs text-white">
            Professional standards of conduct. Often exceed law.
            </p>
            </div>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-purple-400 mb-1">Morality</p>
            <p className="text-xs text-white">Personal beliefs about right and wrong.</p>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Core Ethical Principles
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Integrity</strong> — Meaning: Honesty, fairness, transparency. Building Services Application: Accurate reporting of test results</li>
            <li><strong>Competence</strong> — Meaning: Only doing work within capability. Building Services Application: Declining work beyond qualifications</li>
            <li><strong>Responsibility</strong> — Meaning: Accountability for professional actions. Building Services Application: Taking responsibility for design decisions</li>
            <li><strong>Public interest</strong> — Meaning: Prioritising safety and welfare. Building Services Application: Refusing to certify unsafe installations</li>
            <li><strong>Objectivity</strong> — Meaning: Impartial professional judgement. Building Services Application: Specification based on merit, not inducements</li>
            </ul>
            
            

            <CommonMistake
            title="The Ethics of Safety"
            whatHappens={<><p className="text-sm text-white">
            In building services, ethical considerations frequently involve safety. When
            commercial pressures conflict with safety standards, professionals have an ethical
            duty to prioritise safety. This may mean refusing to sign off work, raising concerns
            with management, or - as a last resort - reporting to enforcement authorities.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> "Is it legal?" is not the same as "Is it right?"
            Professional ethics demands the latter question.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Whistleblowing and Protected Disclosures</ContentEyebrow>

          <ConceptBlock title="Whistleblowing and Protected Disclosures">
            <p>
            Whistleblowing is the disclosure of information about wrongdoing in an organisation.
            The Public Interest Disclosure Act 1998 (PIDA) protects workers who raise legitimate
            concerns about malpractice, including health and safety dangers.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Six Categories of Qualifying Disclosure
            </p>
            <p className="text-sm text-white mb-3">
            To be protected, a disclosure must relate to one of these categories:
            </p>
            
            <div className="p-2 rounded bg-white/5">
            <p className="text-sm text-white">
            <span className="text-elec-yellow">1.</span> A criminal offence
            </p>
            </div>
            <div className="p-2 rounded bg-white/5">
            <p className="text-sm text-white">
            <span className="text-elec-yellow">2.</span> Breach of legal obligation
            </p>
            </div>
            <div className="p-2 rounded bg-white/5">
            <p className="text-sm text-white">
            <span className="text-elec-yellow">3.</span> Miscarriage of justice
            </p>
            </div>
            <div className="p-2 rounded bg-red-500/10">
            <p className="text-sm text-white">
            <span className="text-red-400">4.</span> Health and safety danger
            </p>
            </div>
            <div className="p-2 rounded bg-white/5">
            <p className="text-sm text-white">
            <span className="text-elec-yellow">5.</span> Environmental damage
            </p>
            </div>
            <div className="p-2 rounded bg-white/5">
            <p className="text-sm text-white">
            <span className="text-elec-yellow">6.</span> Concealment of any above
            </p>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Hierarchy of Disclosure
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Internal</strong> — Disclosure To: Employer. Protection Requirements: Good faith, reasonable belief</li>
            <li><strong>2. Prescribed person</strong> — Disclosure To: HSE, regulator. Protection Requirements: Reasonable belief, relevant body</li>
            <li><strong>3. External</strong> — Disclosure To: Media, MPs, others. Protection Requirements: Additional conditions apply*</li>
            </ul>
            
            <p className="text-xs text-white mt-2">
            *External disclosure is protected if internal/prescribed disclosure would be futile,
            risk victimisation, or evidence would be concealed.
            </p>
            

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-400 mb-2">PIDA Protections</p>
            <p className="text-sm text-white mb-3">
            Workers who make qualifying disclosures are protected from:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Dismissal:</strong> Automatically unfair if for making a protected
            disclosure
            </li>
            <li>
            <strong>Detriment:</strong> Any detrimental treatment by the employer
            </li>
            <li>
            <strong>Selection for redundancy:</strong> If based on protected disclosure
            </li>
            </ul>
            <p className="text-xs text-white mt-2">
            Compensation for whistleblowing dismissal is uncapped.
            </p>
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Making an Effective Disclosure
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Document the concern with dates, facts, and evidence</li>
            <li>Use internal procedures first where they exist</li>
            <li>Put concerns in writing and keep copies</li>
            <li>Be factual, not emotional or accusatory</li>
            <li>Seek advice from union, ACAS, or Protect (charity)</li>
            <li>Be clear you are making a formal disclosure</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>For H&S matters:</strong> The HSE is a prescribed person - disclosures about
            health and safety dangers can be made directly to them with protection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Conflicts of Interest</ContentEyebrow>

          <ConceptBlock title="Conflicts of Interest">
            <p>
            A conflict of interest occurs when personal interests, or the interests of those close
            to you, could influence - or could appear to influence - your professional judgement.
            Managing conflicts is essential for maintaining professional integrity and client
            trust.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Common Conflicts in Building Services
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Financial interest</strong> — Example: Shares in a supplier company. Why It's a Problem: May favour that supplier's products</li>
            <li><strong>Personal relationships</strong> — Example: Family member owns contracting firm. Why It's a Problem: May award contracts without fair competition</li>
            <li><strong>Outside employment</strong> — Example: Consultancy competing with employer. Why It's a Problem: Divided loyalty, potential for misuse of info</li>
            <li><strong>Gifts and hospitality</strong> — Example: Supplier offers expensive gifts. Why It's a Problem: Creates sense of obligation, may influence decisions</li>
            <li><strong>Self-review</strong> — Example: Inspecting your own design work. Why It's a Problem: Unlikely to identify own errors objectively</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Managing Conflicts of Interest
            </p>
            
            <div>
            <p className="text-sm font-medium text-white mb-2">Steps to Take</p>
            <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
            <li>
            <strong>Identify:</strong> Recognise potential conflicts
            </li>
            <li>
            <strong>Declare:</strong> Disclose to employer/client
            </li>
            <li>
            <strong>Assess:</strong> Evaluate significance
            </li>
            <li>
            <strong>Manage:</strong> Put safeguards in place
            </li>
            <li>
            <strong>Withdraw:</strong> If conflict cannot be managed
            </li>
            </ol>
            </div>
            <div>
            <p className="text-sm font-medium text-white mb-2">Safeguards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Transparent decision-making processes</li>
            <li>Independent review/second opinion</li>
            <li>Removing yourself from decisions</li>
            <li>Clear policies on gifts/hospitality</li>
            <li>Register of interests</li>
            </ul>
            </div>
            
            

            <CommonMistake
            title="The 'Perception' Test"
            whatHappens={<><p className="text-sm text-white">
            Even if you believe you can be objective, consider: "Would a reasonable observer
            think there is a conflict?" If a third party could reasonably perceive a conflict
            exists, you should treat it as a conflict and manage it appropriately. Perception
            matters because it affects trust in professional judgement.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> It's not enough to act without bias - you must be seen to
            act without bias.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Professional Codes of Conduct</ContentEyebrow>

          <ConceptBlock title="Professional Codes of Conduct">
            <p>
            Professional bodies set codes of conduct that define the ethical standards expected of
            their members. In building services, the key bodies are the Institution of Engineering
            and Technology (IET) and trade associations like the Electrical Contractors'
            Association (ECA).
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm font-medium text-blue-400 mb-2">
            IET Code of Conduct - Key Principles
            </p>
            <p className="text-sm text-white mb-3">IET members shall at all times:</p>
            <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
            <li>
            <strong>Act with integrity</strong> - be honest and trustworthy, declare
            conflicts, reject bribery and corruption
            </li>
            <li>
            <strong>Exercise professional skill and judgement</strong> - to protect health,
            safety and welfare of all
            </li>
            <li>
            <strong>Undertake only work within competence</strong> - not misrepresent
            capabilities
            </li>
            <li>
            <strong>Show commitment to continuing professional development</strong> - maintain
            and develop competence
            </li>
            <li>
            <strong>Support and promote diversity</strong> - treat others fairly without
            discrimination
            </li>
            <li>
            <strong>Uphold the reputation of the profession</strong> - not bring it into
            disrepute
            </li>
            </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="text-sm font-medium text-purple-400 mb-2">ECA Membership Obligations</p>
            <p className="text-sm text-white mb-3">ECA member companies commit to:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Maintaining high standards of workmanship and business ethics
            </li>
            <li>Employing competent, properly trained staff</li>
            <li>Operating comprehensive health and safety systems</li>
            <li>Complying with all relevant legislation and regulations</li>
            <li>Dealing fairly with customers, suppliers, and employees</li>
            <li>Providing warranties and addressing customer complaints</li>
            </ul>
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Consequences of Breaching Professional Codes
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Advice</strong> — Description: Guidance on future conduct. Impact: No formal record, minor matters</li>
            <li><strong>Reprimand</strong> — Description: Formal warning recorded. Impact: On file, considered if repeat issues</li>
            <li><strong>Conditions</strong> — Description: Continued membership with conditions. Impact: May require training, supervision</li>
            <li><strong>Suspension</strong> — Description: Temporary removal from membership. Impact: Cannot use membership title</li>
            <li><strong>Expulsion</strong> — Description: Permanent removal from membership. Impact: Loss of professional status, reputation</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Why Professional Codes Matter
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Public protection:</strong> Ensures minimum standards of competence and
            conduct
            </li>
            <li>
            <strong>Client confidence:</strong> Clients can trust members will act
            professionally
            </li>
            <li>
            <strong>Professional reputation:</strong> Maintains the standing of the profession
            </li>
            <li>
            <strong>Self-regulation:</strong> Demonstrates profession can govern itself
            responsibly
            </li>
            <li>
            <strong>Career protection:</strong> Framework for handling disputes and misconduct
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Chartered status:</strong> Chartered Engineers (CEng) have additional
            obligations including maintaining CPD records and may face registration review.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Ethical Decision-Making Framework</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Is it legal?</strong> Does it comply with all relevant laws and
            regulations?
            </li>
            <li>
            <strong>Is it ethical?</strong> Does it comply with professional codes and
            principles?
            </li>
            <li>
            <strong>Is it fair?</strong> Would all affected parties consider it reasonable?
            </li>
            <li>
            <strong>Would it pass scrutiny?</strong> How would it look reported in the news?
            </li>
            <li>
            <strong>Can you justify it?</strong> Could you explain your decision to a
            disciplinary panel?
            </li>
            </ul>
            </div>

            <div>
            <p><strong>When to Seek Advice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>When you're uncertain whether something is ethical</li>
            <li>When asked to do something that feels wrong</li>
            <li>When you identify a potential conflict of interest</li>
            <li>When you observe others acting unethically</li>
            <li>Before making significant disclosures about wrongdoing</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Ethical Pitfalls</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>"Everyone does it":</strong> Widespread practice does not make it ethical
            </li>
            <li>
            <strong>"No one will know":</strong> Integrity means doing right even when
            unobserved
            </li>
            <li>
            <strong>"It's not illegal":</strong> Legal does not equal ethical
            </li>
            <li>
            <strong>"I was just following orders":</strong> You remain personally accountable
            </li>
            <li>
            <strong>"The client wanted it":</strong> Your professional duty may override
            client wishes
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Asked to certify an installation that does not comply with BS 7671"
            situation={
              <>
                Your firm completes a domestic rewire. The customer pressures the operations
                manager to issue an EIC despite a missing supplementary bond on a bathroom
                that should be tested per Section 701. The manager asks you to sign as the
                designer, installer and inspector to close the project out.
              </>
            }
            whatToDo={
              <>
                Refuse. EICs require an honest declaration; signing for absent or non-compliant
                work breaches BS 7671, EAWR Reg 14/16, the Engineering Council&rsquo;s ethical
                principles, the IET code of conduct and (potentially) the Fraud Act 2006. Offer
                the proper resolution — go back, install the bond, test, then issue. Document
                the refusal. If the manager insists, raise via the firm&rsquo;s whistleblowing
                channel and to the certification scheme (NICEIC, NAPIT, ELECSA) — both have
                anonymous routes.
              </>
            }
            whyItMatters={
              <>
                Falsified certificates kill — they obscure the residual hazard for whoever
                comes next. PIDA and ERA 1996 s.44 protect you for refusing and reporting.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Engineering Council Statement of Ethical Principles, IET Rules of Conduct and CIBSE code provide the professional framework.',
              'Four core ethical principles: honesty &amp; integrity, respect for life/law/public good, accuracy &amp; rigour, leadership &amp; communication.',
              'Conflicts of interest: financial, personal, professional — disclose early, recuse where required.',
              'PIDA / ERA 1996 s.43 protect whistleblowers raising public-interest concerns through prescribed channels.',
              'Refuse to certify, sign or report what you cannot honestly stand behind — Fraud Act 2006 s.2 (false representation) is in play for fraudulent certification.',
              'Stay within your scope of competence — refer up to a more qualified colleague when the task exceeds your training.',
              'Confidentiality has limits — public safety overrides commercial confidentiality.',
              'Professional registration (EngTech, IEng, CEng) carries continuing ethical obligations — breach can lead to removal.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 4
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Continuous Professional Development
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section4_4;
