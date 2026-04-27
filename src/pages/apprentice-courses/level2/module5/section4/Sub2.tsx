/**
 * Module 5 · Section 4 · Subsection 2 — Company policies and working relationships
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.4
 *   AC 2.4 — "State the importance of company policies and procedures that affect
 *             working relationships"
 *
 * Frame: company policies are the rules of the road. They define how the firm
 * works, how the firm protects its people, and how the firm protects the
 * customer. Knowing where they sit (and which one applies to a given situation)
 * is the difference between someone the firm trusts to run a job and someone
 * the firm trusts to wire a socket.
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
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Company policies and working relationships (2.4) | Level 2 Module 5.4.2 | Elec-Mate';
const DESCRIPTION =
  'Safety, quality, HR, commercial and confidentiality policies — and how they shape your working relationships with customers, co-workers and sub-contractors.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s4-sub2-tip',
    question:
      "You finish a CU change for a regular customer. As you're packing the van they hand you £50 in cash and say 'a little extra for the good work'. The company policy explicitly says no tips. What do you do?",
    options: [
      "Take it — they'll be offended if you don't, and the firm doesn't need to know.",
      "Politely decline. Explain that the firm has a no-tips policy because it keeps the relationship clean — the firm has already been paid for the work via the invoice, and accepting an extra payment from a customer can look like an inducement to give favourable certificates or quotes in future. Offer instead that they could leave a Google review or recommend the firm.",
      "Take it but split it with the apprentice for the day.",
      "Take it and donate it to charity later so it isn't really a tip.",
    ],
    correctIndex: 1,
    explanation:
      "No-tips policies exist because tipping a tradesperson can compromise the integrity of certifications and quotes — the customer might (consciously or not) expect a friendlier interpretation next time. Most contractor schemes (NICEIC, NAPIT) and many firms' anti-bribery policies (under the Bribery Act 2010 framework) treat unsolicited payments from customers as a risk area. Declining politely and offering an alternative (review, referral) is the textbook handle.",
  },
  {
    id: 'mod5-s4-sub2-social-media',
    question:
      "On a tricky CU swap-out you find an existing dangerous installation — burnt MCBs, lashed-up tails, no main earth. You take a photo to show the supervisor and post it to your personal Instagram with caption 'look at this nightmare from a previous owner'. Two days later the customer's solicitor sends a letter. What did you breach, and what should you have done?",
    options: [
      "Nothing — it's your personal Instagram, no work name on it.",
      "Multiple breaches — confidentiality (customer's property identifiable from the room), GDPR (the photo is personal data of the property owner), the firm's social-media policy (likely prohibits posting customer property without consent) and reputationally, the customer's trust in the firm. The right call: photograph for the supervisor only, store in the firm's case management system, never post to personal social media. If you want a teaching photo for trade content, get explicit written consent and crop out anything identifying.",
      "Only the social-media policy — confidentiality and GDPR don't apply to photos.",
      "Nothing — the customer should be grateful you exposed the previous owner's bad work.",
    ],
    correctIndex: 1,
    explanation:
      "A photo of a customer's property is personal data under UK GDPR (it relates to an identifiable person — the property owner — through the address context). Posting it to social media without consent breaches GDPR, the firm's confidentiality policy and the social-media policy. The customer doesn't have to accept 'I didn't name them' as a defence — the photo identifies them by context. Personal social media doesn't insulate you because the duty travels with the data, not with the platform. Always assume the customer will see the post.",
  },
  {
    id: 'mod5-s4-sub2-grievance',
    question:
      "You and another apprentice keep clashing — the other apprentice has been making belittling comments in the van and at the depot. You've tried raising it informally and it's continued. What does the firm's grievance procedure typically expect you to do next, and what protects you from being penalised for raising it?",
    options: [
      "Just put up with it — apprenticeships are tough.",
      "Raise it formally in writing under the firm's grievance procedure (usually addressed to your line manager or HR). The ACAS Code of Practice on Discipline and Grievance sets the framework most UK firms follow — informal first, then written, then a meeting, then a written outcome with a right of appeal. The Equality Act 2010 protects you from harassment and the Employment Rights Act 1996 protects you from being penalised for raising the grievance.",
      "Sort it out yourself in the van — it's a personal matter.",
      "Quit and find a new firm.",
    ],
    correctIndex: 1,
    explanation:
      "The ACAS Code on Discipline and Grievance is the recognised UK framework — most firms' policies mirror it. Informal first, then written grievance, then a meeting where you can be accompanied, then a written outcome, then an appeal. The Equality Act 2010 s.26 covers harassment (unwanted conduct related to a protected characteristic). Employment Rights Act 1996 s.47B (whistleblowing) and the general protection against victimisation under the Equality Act protect you from being treated less favourably for raising the issue. Quitting closes off your remedies — raising the grievance opens them.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What is a company SAFETY POLICY and why is the employer legally required to have one?",
    options: [
      "An optional document that some firms choose to have.",
      "A written statement of the employer's general policy on health and safety, the organisation in place to deliver it, and the arrangements for putting it into effect. HASAWA s.2(3) requires every employer with five or more employees to prepare one and bring it to the attention of all staff.",
      "A document only required for construction sites.",
      "A document only required for firms with over 50 employees.",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.2(3) is the statutory hook for the company safety policy. Three elements: the general statement of intent (signed by the most senior person), the organisation (who's responsible for what), and the arrangements (how the safety system actually works in practice). Five-or-more-employees is the threshold for the written-policy requirement; below that the duty to have a policy still exists but doesn't have to be in writing.",
  },
  {
    id: 2,
    question:
      "Which set of HR policies typically governs the formal handling of disputes between employees and the firm?",
    options: [
      "Equality Act 2010.",
      "The grievance and disciplinary policies, normally aligned to the ACAS Code of Practice on Discipline and Grievance. Grievance covers complaints raised BY the employee against the firm or another employee. Disciplinary covers action taken BY the firm against the employee for misconduct, capability or other concerns.",
      "Working Time Regulations 1998.",
      "Equality and Diversity policy only.",
    ],
    correctAnswer: 1,
    explanation:
      "The ACAS Code is the recognised framework. Tribunals can adjust awards by up to 25% if the Code wasn't followed. Grievance and disciplinary are different procedures with different starting points — knowing which one applies tells you whose story is being told and what the next steps are.",
  },
  {
    id: 3,
    question:
      "You're working on a customer's site and the customer offers you and your colleague cans of beer at the end of the day. What's the typical company policy on this and why?",
    options: [
      "Accept — refusing is rude.",
      "Decline. Most firms have a drug-and-alcohol policy that prohibits consumption during working hours, including any time you're still in uniform, on customer premises or driving the van. Even if the working day is officially over, you're still representing the firm and you may have to drive. The policy protects the customer (no impaired work), the firm (no insurance issues, no reputational damage) and you (no DR10 driving conviction).",
      "Accept but only have one.",
      "Accept and put it on the job sheet as 'customer goodwill'.",
    ],
    correctAnswer: 1,
    explanation:
      "Drug-and-alcohol policies are universal in the trades because the work is safety-critical and most operatives drive company vehicles. Accepting alcohol on a customer's premises, even after work, is typically a sackable offence on the second occasion and a written warning on the first. The customer offering it is rarely a real test — declining politely is what the customer expects and respects. 'Just one' isn't a defence at a roadside breathalyser.",
  },
  {
    id: 4,
    question:
      "What does a CONFIDENTIALITY POLICY typically cover for a small electrical contractor?",
    options: [
      "Only commercial pricing information.",
      "Customer personal data (names, addresses, phone numbers, photos of their property), commercially sensitive information (the firm's pricing strategy, supplier discounts, employee salaries), and anything covered by a customer's NDA on commercial sites. The policy applies whether you're at work, in the pub, or on social media — the duty is on the data, not the location.",
      "Only employee salaries.",
      "Only NDA-covered commercial sites.",
    ],
    correctAnswer: 1,
    explanation:
      "Confidentiality policies are broader than people think. They typically include: customer personal data (overlap with GDPR), customer property details (addresses, layouts, security systems), commercially sensitive firm info (pricing, suppliers), employee personal info (salaries, performance), and anything explicitly covered by a customer NDA. Breach is usually a disciplinary matter and can be a criminal matter under data protection law. Sub 3 covers GDPR specifically.",
  },
  {
    id: 5,
    question:
      "How does the Equality Act 2010 define 'harassment' in a workplace context?",
    options: [
      "Only physical assault.",
      "Unwanted conduct related to a relevant protected characteristic (age, race, sex, gender reassignment, religion or belief, sexual orientation, disability, marriage and civil partnership, pregnancy and maternity) that has the purpose or effect of violating the person's dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment for them. Section 26 of the Act.",
      "Only verbal abuse.",
      "Only behaviour by the employer, not by colleagues.",
    ],
    correctAnswer: 1,
    explanation:
      "Equality Act 2010 s.26 sets the legal definition of harassment. The 'purpose OR effect' wording is important — even unintentional behaviour can be harassment if a reasonable person would consider it to have that effect. The protected characteristics list is exhaustive — those nine categories, no others. The Act applies to colleague-on-colleague behaviour as well as employer-on-employee, and the firm has vicarious liability for the acts of its employees in the course of their work.",
  },
  {
    id: 6,
    question:
      "What does a SOCIAL MEDIA POLICY typically prohibit and why?",
    options: [
      "Posting anything online ever.",
      "Posting customer property, customer information, project details or photos taken on site without explicit written consent; making derogatory comments about customers, colleagues, suppliers or competitors; representing personal opinions as the firm's opinions; sharing anything that could damage the firm's reputation. The policy applies to personal accounts because the duty travels with the content, not the platform.",
      "Only LinkedIn posts about colleagues.",
      "Only public posts — private messages are exempt.",
    ],
    correctAnswer: 1,
    explanation:
      "Social media policies have become a standard part of the HR pack because they're a major source of disciplinary action and tribunal cases. The key principle is that the duty to confidentiality, GDPR and reputation travels with the content — it doesn't matter if the post is on your personal account, in a private group, or on a 'work' page. The customer who sees the photo of their kitchen on your Instagram won't accept 'it's my personal account' as a defence.",
  },
  {
    id: 7,
    question:
      "Why do company policies typically specify standards for working relationships with sub-contractors as well as employees?",
    options: [
      "They don't — sub-contractors are someone else's responsibility.",
      "Because the principal contractor (or main installer) carries practical and often legal responsibility for what happens on their site, including the conduct, safety and quality of sub-contractor work. CDM 2015 places duties on the PC for site coordination. The firm's policies typically require sub-contractors to be vetted, briefed, given clear scope, paid promptly and held to the same conduct standards as employees.",
      "Only to make sub-contractors feel included.",
      "Only on commercial sites.",
    ],
    correctAnswer: 1,
    explanation:
      "Sub-contractor management is one of the highest-risk areas for a small firm — the firm carries the reputation risk of work it didn't directly do, and on construction sites the legal duties under CDM 2015 transfer in part to the principal contractor for coordination and welfare. Standard policy: vet sub-contractors (insurance, scheme membership, references), agree clear scope in writing, brief them on site rules, pay promptly to maintain the relationship, and escalate disputes to the PC promptly rather than letting them fester on site.",
  },
  {
    id: 8,
    question:
      "Why does a COMMERCIAL POLICY typically cover things like vehicle use, fuel cards and expenses?",
    options: [
      "To make life difficult for employees.",
      "To set clear rules so that company assets (vans, fuel cards, tools, materials) are used for business and not personal purposes — protecting the firm financially, ensuring tax compliance (HMRC treats personal use of a company vehicle as a benefit-in-kind), and giving employees a defensible record if they're ever audited or accused of misuse.",
      "Only to track fuel consumption.",
      "Only because insurance requires it.",
    ],
    correctAnswer: 1,
    explanation:
      "Commercial policies on vehicles, fuel cards and expenses serve three purposes: (1) prevent loss/misuse of company assets, (2) ensure HMRC tax compliance (personal use of a company van is a benefit-in-kind that has to be declared and taxed unless de minimis), (3) give a clear audit trail so employees can defend their use if challenged. Insurance is a fourth driver — most fleet insurance only covers business use unless extended to social/domestic.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question:
      "Where do I find my firm's policies — is there a standard place they all sit?",
    answer:
      "They should be in the staff handbook (paper or PDF), normally signed off as part of your induction on day one. Many firms also put them on a shared drive, an intranet page or a HR portal (Bright HR, Citation, Peninsula, Avensure). If you can't find them, ask your line manager — every firm with five or more employees has to have a written safety policy under HASAWA s.2(3) and most also document HR policies as standard.",
  },
  {
    question:
      "Do I have to read the policies, or only follow them when something comes up?",
    answer:
      "Read the headline ones at induction (safety, quality, HR/grievance, drugs and alcohol, social media, IT acceptable use, confidentiality). For the rest, knowing they exist and where to find them is enough. The reason employers want a signed acknowledgement at induction is to be able to demonstrate you were aware of the policy if you later breach it. 'I didn't know' isn't usually a defence once you've signed the handbook.",
  },
  {
    question:
      "What if my supervisor tells me to do something that breaches a policy — drink-drive home in the van, accept a tip, post a photo to socials?",
    answer:
      "Refuse, politely, and raise it up the chain. Most policies state explicitly that they apply regardless of who issued the instruction, and that 'following orders' isn't a defence. The Health and Safety at Work Act 1974 s.7 places a personal duty on every worker to take reasonable care, and that's separate from any chain-of-command. The Equality Act and Employment Rights Act protect you from being penalised for raising legitimate concerns. Document the request (text, email) so there's a record of what was asked.",
  },
  {
    question:
      "How do company policies relate to my own legal duties as an apprentice?",
    answer:
      "The policies are usually the firm's interpretation of how to discharge legal duties under HASAWA, the Equality Act, GDPR, the Working Time Regulations, etc. Following the policy is normally how you discharge your own duty AND protect the firm. The legal duty sits on you personally under HASAWA s.7 — the policy is the firm's tool for helping you meet it. Where they conflict (rare) the legal duty wins, but it's worth checking with your supervisor or HR if you think there's a conflict.",
  },
  {
    question:
      "What's the difference between a 'policy' and a 'procedure'?",
    answer:
      "Policy = WHAT the firm believes and what the rules are ('we will not tolerate harassment'; 'we will issue an EIC for every install'). Procedure = HOW you actually do it ('the steps to raise a grievance: 1. informal chat, 2. written grievance, 3. meeting, 4. outcome, 5. appeal'). Policies are typically short and high-level; procedures are detailed, step-by-step. You'll see both in the handbook — the policy gives the principle, the procedure tells you what to do on a Tuesday.",
  },
  {
    question:
      "What's the role of a contractor scheme (NICEIC, NAPIT) in setting policies?",
    answer:
      "Contractor schemes (NICEIC, NAPIT, ELECSA, STROMA) impose their own quality and competence requirements on top of the firm's internal policies. To stay registered, the firm has to: maintain a quality management system (often ISO 9001-aligned), retain certs for the required period, have qualified supervision in place, pass annual audit, and run any sub-contracted electrical work through the scheme too. Many of the firm's quality and record-keeping policies will be there to satisfy scheme audit, not just internal preference.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 2"
            title="Company policies and working relationships"
            description="The internal rules that govern how your firm works — and how they shape every working relationship you'll have with customers, co-workers and sub-contractors."
            tone="emerald"
          />

          <TLDR
            points={[
              "Company policies fall into five practical categories — safety, quality, HR, commercial, confidentiality. Each has a legal anchor (HASAWA, contractor scheme rules, ACAS Code, HMRC, GDPR) that the firm is obliged to interpret and apply.",
              "Working relationships on site are defined as much by how you behave (respectful, professional, no swearing, no smoking on customer premises) as by what you do. The policy is the rule; the relationship is the application.",
              "Breaches of policy are normally disciplinary matters first and legal matters second. The firm's procedure (ACAS-aligned grievance and disciplinary) is what gives both sides a fair hearing — bypassing it usually makes things worse.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the importance of company policies and procedures that affect working relationships (Unit 210 AC 2.4, verbatim).",
              "Identify the five practical categories of company policy — safety, quality, HR, commercial, confidentiality — and the typical content of each.",
              "State the duty under HASAWA s.2(3) for employers with five or more employees to prepare a written health and safety policy and bring it to staff attention.",
              "Recognise the role of the ACAS Code of Practice on Discipline and Grievance as the framework most UK firms align their HR procedures to.",
              "Identify how the Equality Act 2010 (s.26 harassment) shapes expected conduct in working relationships with colleagues, customers and sub-contractors.",
              "Apply policy thinking to common situations — tip declined, grievance raised, social-media post avoided, sub-contractor briefed.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why company policies exist at all</ContentEyebrow>

          <ConceptBlock
            title="Policies are the firm's interpretation of legal duties — and a defence when something goes wrong"
            plainEnglish="Most company policies aren't invented from scratch — they're the firm's working interpretation of legal duties (HASAWA, Equality Act, GDPR, Working Time Regulations, contractor scheme rules, HMRC tax rules). The policy is how the firm tells its people what good looks like in practice. Following the policy is normally how you discharge BOTH the firm's legal duty AND your own."
            onSite="Apprentices sometimes see policies as bureaucracy. In practice they're the firm's playbook for how to do the job in a way that protects everyone — the customer, the firm, and you personally. When something does go wrong, 'I followed the policy' is the strongest defence available."
          >
            <p>
              Three things every policy does:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sets the rule</strong> — what the firm expects, in plain English.
              </li>
              <li>
                <strong>Protects the parties</strong> — by setting clear expectations, the
                policy reduces the chance of misunderstanding and gives both sides a defensible
                position if there's a dispute.
              </li>
              <li>
                <strong>Translates law into practice</strong> — abstract legal duties (e.g.
                'protect customer personal data') become concrete actions ('don't post photos
                of customer property to social media without consent').
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The five categories of company policy</ContentEyebrow>

          <ConceptBlock
            title="Safety policy — the general statement under HASAWA s.2(3)"
            plainEnglish="The safety policy is the firm's overall statement of how it manages health and safety. HASAWA s.2(3) requires it for any employer with five or more employees. It has three parts — a general statement of intent (signed by the most senior person), the organisation (who's responsible for what), and the arrangements (how the system actually works in practice)."
            onSite="The safety policy is normally a foundation document the firm refers back to when writing more detailed procedures (PPE, working at height, manual handling, RAMS, accident reporting). On day one of an apprenticeship you'll typically be given a copy as part of your induction and asked to sign that you've read it."
          >
            <p>
              A typical safety policy includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The general statement — usually a single page signed by the MD or the most
                senior person, committing the firm to safe practices.
              </li>
              <li>
                The organisation chart for safety responsibilities — who is the appointed
                competent person, who reports to whom, what each role is responsible for.
              </li>
              <li>
                Arrangements — risk assessment process, PPE provision, training, accident
                reporting, first aid, fire procedures, contractor management.
              </li>
              <li>
                References to detailed procedures — RAMS templates, permit-to-work systems,
                emergency procedures, near-miss reporting.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Quality policy — commitment to BS 7671 and scheme requirements"
            plainEnglish="The quality policy is the firm's commitment to delivering work to a defined standard — BS 7671, manufacturer instructions, and the requirements of the contractor scheme it's registered with (NICEIC, NAPIT, ELECSA, STROMA). It typically references the firm's quality management system (often ISO 9001 aligned), record retention rules and the qualifications of supervisory staff."
            onSite="On a contractor-scheme audit the auditor will ask to see: the quality policy, recent EICs and EICRs (sampled), the calibration records for test instruments, the qualifications of the qualified supervisor, the complaints log, and the firm's evidence of CPD for technical staff. Most of these are anchored in the quality policy."
          >
            <p>
              A typical quality policy commits the firm to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Compliance with BS 7671 and other applicable standards (BS 5839 fire alarms,
                BS 5266 emergency lighting, BS 7430 earthing).
              </li>
              <li>
                Use of qualified, scheme-registered staff for all electrical work.
              </li>
              <li>
                Calibration of test instruments to manufacturer schedules and traceable
                records.
              </li>
              <li>
                Retention of certs and records for 6+ years.
              </li>
              <li>
                A complaints process and a continual-improvement loop.
              </li>
              <li>
                CPD for staff to keep up with regs amendments and new technology.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HR policies — grievance, disciplinary, equality, drugs and alcohol, social media"
            plainEnglish="HR policies set out how the firm manages its relationship with its people — handling complaints, taking action against misconduct, respecting equality and diversity, managing absence, controlling drugs/alcohol, governing social media use. They're typically aligned to the ACAS Code of Practice on Discipline and Grievance and to legislation including the Equality Act 2010 and the Employment Rights Act 1996."
            onSite="The HR policies you'll meet most often as an apprentice: grievance (you raise an issue), disciplinary (firm raises an issue with you), equality (how everyone is treated), social media (what you can/can't post), drugs and alcohol (what's prohibited and when, including driving), and the smoking policy (where you can/can't smoke including on customer premises)."
          >
            <p>
              Standard HR policy set:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Grievance</strong> — how you raise a concern (informal first, then
                written, meeting, outcome, appeal).
              </li>
              <li>
                <strong>Disciplinary</strong> — how the firm investigates and acts on
                misconduct, with stages (verbal, written, final written, dismissal) and a
                right of appeal.
              </li>
              <li>
                <strong>Equality and diversity</strong> — commitment to non-discrimination
                under the Equality Act 2010 across all nine protected characteristics.
              </li>
              <li>
                <strong>Drugs and alcohol</strong> — typically zero-tolerance for working
                hours / driving, with random or for-cause testing in some firms.
              </li>
              <li>
                <strong>Smoking</strong> — typically prohibited on customer premises, in
                vehicles and in any uniform.
              </li>
              <li>
                <strong>Social media</strong> — restricts posting customer property,
                colleague info or anything that could damage the firm's reputation.
              </li>
              <li>
                <strong>Absence and sickness</strong> — how to report, when self-cert
                applies, when GP fit-note required.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ConceptBlock
            title="Commercial policies — vehicles, fuel cards, expenses, customer-facing conduct"
            plainEnglish="Commercial policies cover the day-to-day use of company assets and the way you represent the firm in front of customers. Vehicle use (business vs personal, who can drive, MOT/insurance/maintenance), fuel cards (what they're for and how to log), expenses (what's claimable, what isn't, receipt requirements), uniform and PPE, and customer-facing conduct (turning up clean, no swearing, not smoking on premises)."
            onSite="The commercial policies are the ones that quietly get apprentices into the most trouble — using the van for a personal trip without authorisation, expensing a Costa coffee that wasn't on the customer's job, swearing in front of a customer's child. None of these are major sins, but they accumulate quickly into a 'reliability concern' if they keep happening."
          >
            <p>
              What a typical commercial policy covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Company vehicles — business use only (with social/domestic exception if
                granted), no smoking, daily walk-around check, accident reporting.
              </li>
              <li>
                Fuel cards — for business mileage in the company van only, receipts retained,
                personal mileage logged and reimbursed.
              </li>
              <li>
                Expenses — what's claimable (out-of-area meals, parking, tools), what isn't
                (alcohol, personal items), the receipt rule and the monthly cut-off.
              </li>
              <li>
                Uniform and PPE — turn up in the firm's uniform, full PPE on site, no
                personalisation that misrepresents you.
              </li>
              <li>
                Customer-facing conduct — turn up on time, dressed cleanly, polite, no
                swearing, no smoking on customer premises, no eating customer food without
                offer.
              </li>
              <li>
                Tipping and gifts — typically a no-tips policy, with a process for what to
                do if a customer insists.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Confidentiality policy — customer data, commercial info, NDAs"
            plainEnglish="The confidentiality policy is the firm's blanket rule about what you can and can't share — customer personal data (covered also by GDPR), commercially sensitive info (the firm's pricing, supplier discounts, employee salaries), and anything covered by a customer's NDA. The policy applies whether you're at work, in the pub, or on social media — the duty is on the data, not the location."
            onSite="The most common breaches happen on personal social media, at home with the family, or in the pub with mates from another firm. None of these feel like 'work' — but the duty travels with the information. A casual mention of which celebrity you wired a kitchen for, even months later, is a confidentiality breach. Same goes for the firm's pricing for a particular customer or the salary your foreman is on."
          >
            <p>
              What confidentiality typically covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer personal data</strong> — name, address, phone, email,
                photos of property, security system layouts, anything identifying the
                customer or their property. (GDPR covered separately in Sub 3.)
              </li>
              <li>
                <strong>Commercially sensitive firm info</strong> — pricing strategy,
                supplier discounts, profit margins, win rates on quotes, employee salaries.
              </li>
              <li>
                <strong>Customer-imposed confidentiality</strong> — NDAs on commercial
                projects (offices, hospitals, retail, secure premises) where the customer
                requires non-disclosure as a condition of the contract.
              </li>
              <li>
                <strong>Intellectual property</strong> — the firm's templates, designs,
                processes, training materials.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(3)"
            clause={
              <>
                &quot;Except in such cases as may be prescribed, it shall be the duty of every
                employer to prepare and as often as may be appropriate revise a written
                statement of his general policy with respect to the health and safety at work
                of his employees and the organisation and arrangements for the time being in
                force for carrying out that policy, and to bring the statement and any revision
                of it to the notice of all of his employees.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.2(3) is the statutory hook for the company written safety policy.
                Three components in the wording &mdash; the &quot;general policy&quot; statement,
                the &quot;organisation&quot; (who is responsible for what), and the
                &quot;arrangements&quot; (how the policy is delivered in practice). The employer
                also has to bring the policy to staff attention &mdash; usually via induction,
                staff handbook, intranet or noticeboard. The five-or-more-employees threshold
                is in regulations made under the Act; below that the duty to manage safety
                still exists but the written-policy requirement may not.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2(3) — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="ACAS Code of Practice on Discipline and Grievance Procedures (paraphrased)"
            clause={
              <>
                Paraphrased: The Code sets minimum standards for handling discipline and
                grievance issues at work. Employers and employees should raise and deal with
                issues promptly, act consistently, carry out necessary investigations to
                establish the facts, inform employees of the basis of the problem and give them
                an opportunity to put their case in response before any decisions are made,
                allow employees to be accompanied at any formal meeting, and allow an employee
                to appeal against any formal decision made. Tribunals can adjust an award by up
                to 25% if either side has unreasonably failed to comply.
              </>
            }
            meaning={
              <>
                The ACAS Code is statutory guidance, not legislation, but tribunals MUST take
                account of it under the Trade Union and Labour Relations (Consolidation) Act
                1992 s.207. Most firm grievance and disciplinary policies mirror the Code &mdash;
                informal first, written, meeting (with right to be accompanied), outcome,
                appeal. As an apprentice the practical takeaway: if you have a grievance,
                follow the firm&apos;s procedure; if a grievance is raised against you, expect
                to be informed and given a chance to respond before any decision.
              </>
            }
            cite="Source: ACAS Code of Practice on Discipline and Grievance Procedures (current edition) — paraphrased; refer to ACAS for full text."
          />

          <RegsCallout
            source="Equality Act 2010 — s.26 (harassment)"
            clause={
              <>
                &quot;A person (A) harasses another (B) if &mdash; (a) A engages in unwanted
                conduct related to a relevant protected characteristic, and (b) the conduct has
                the purpose or effect of &mdash; (i) violating B&apos;s dignity, or (ii) creating
                an intimidating, hostile, degrading, humiliating or offensive environment for B.&quot;
              </>
            }
            meaning={
              <>
                Equality Act 2010 s.26 sets the legal definition of harassment. The
                &quot;purpose OR effect&quot; wording is critical &mdash; behaviour can be
                harassment even if the perpetrator didn&apos;t intend it that way, provided a
                reasonable person would have considered it to have that effect. The protected
                characteristics are: age, disability, gender reassignment, marriage and civil
                partnership, pregnancy and maternity, race, religion or belief, sex, and sexual
                orientation. Vicarious liability under s.109 means the firm is liable for the
                acts of its employees in the course of their work &mdash; which is why most
                firms build harassment training and a clear complaints route into their HR
                policy stack.
              </>
            }
            cite="Source: Equality Act 2010 (c.15), s.26 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Working relationships</ContentEyebrow>

          <ConceptBlock
            title="With customers — respectful, professional, predictable"
            plainEnglish="Customer relationships are the easiest to get right and the easiest to lose. Turning up on time, dressed in the firm's uniform, polite, calm under pressure, no swearing, no smoking on premises — these aren't optional extras, they're the baseline that distinguishes a firm a customer will recommend from one they'll quietly never call again."
            onSite="The customer is paying for the work, but they're also paying for the experience of having you in their home or business. Walking through their property in clean overshoes, asking before using the toilet, cleaning up after yourself, explaining what you're doing in plain English — these are the small things that come back as five-star reviews and word-of-mouth referrals."
          >
            <p>
              Practical baseline for customer-facing conduct:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Turn up on time. If you're going to be late, ring ahead with a realistic ETA.
              </li>
              <li>
                Wear the firm's uniform, full PPE on site, clean overshoes in domestic.
              </li>
              <li>
                Introduce yourself, show ID if relevant (customer's expecting you under your
                name).
              </li>
              <li>
                Explain what you're going to do in plain English before you do it. Get the
                customer's agreement to anything that affects their day (power off, noise,
                dust).
              </li>
              <li>
                Don't smoke or vape on customer premises. Don't accept alcohol. Decline
                tips politely.
              </li>
              <li>
                Clean up as you go and at the end. Take the rubbish with you. Hoover up any
                dust.
              </li>
              <li>
                At the end, walk the customer through what you've done, hand over the
                paperwork, take the questions calmly.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="With co-workers — collaborative, conflict-resolving, no bullying"
            plainEnglish="Co-worker relationships are governed by the firm's HR policies (grievance, disciplinary, equality, dignity at work) and by the same Equality Act duties that apply to customer interactions. The expectation is that you work collaboratively, raise issues through the right channels rather than letting them fester, and never engage in bullying, harassment or victimisation."
            onSite="Trade culture has historically tolerated rough humour and abrasive interactions in a way that's increasingly out of step with modern HR policy. The bar is now: would the comment, joke or behaviour be acceptable to a reasonable person of the relevant protected characteristic? If you'd hesitate to say it in front of HR, don't say it in the van either."
          >
            <p>
              Specific co-worker behaviours that company policy normally addresses:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bullying and harassment</strong> — never acceptable; covered by
                Equality Act 2010 s.26 plus the firm's dignity-at-work policy.
              </li>
              <li>
                <strong>Conflict resolution</strong> — informal first (talk it through),
                escalate to supervisor if it doesn't resolve, formal grievance if needed.
              </li>
              <li>
                <strong>Confidentiality between colleagues</strong> — don't share other
                people's salary, performance reviews, sickness reasons, personal issues.
              </li>
              <li>
                <strong>Helping apprentices</strong> — qualified staff have a mentoring
                duty that's often baked into the apprenticeship agreement.
              </li>
              <li>
                <strong>Raising safety concerns</strong> — open culture, no victimisation
                under Employment Rights Act 1996 s.44.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="With sub-contractors — clear scope, prompt payment, escalation to PC"
            plainEnglish="Sub-contractor relationships are slightly different — they're not employees of your firm, but on a job they're representing it. The firm's policies typically require sub-contractors to be vetted (insurance, scheme membership, references), briefed on the firm's site rules, given clear written scope, paid promptly, and held to the same conduct standards as employees. Disputes get escalated to the principal contractor early rather than letting them sit on site."
            onSite="As an apprentice you might find yourself working alongside a sub-contractor your firm has brought in (e.g. a fire alarm specialist on a CU change in a HMO). The relationship is collaborative — you're both on site, both representing the lead firm. Your job is to keep the working relationship clean, raise any quality concerns to your supervisor (not the sub-contractor directly), and hand off cleanly when their work begins or ends."
          >
            <p>
              Standard sub-contractor relationship rules:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Vet the sub-contractor before engaging — insurance certs, scheme membership,
                references, sample work, RAMS for their portion.
              </li>
              <li>
                Agree scope, price and payment terms in writing BEFORE work starts.
              </li>
              <li>
                Brief them on site rules during induction (CDM 2015 Reg 13 on notifiable
                projects).
              </li>
              <li>
                Pay promptly within agreed terms — late payment is the most common cause of
                relationship breakdown.
              </li>
              <li>
                Hold them to the same conduct standards (no swearing on customer premises,
                no smoking, follow PPE rules).
              </li>
              <li>
                Escalate quality or behaviour concerns to your supervisor / the PC promptly,
                not via on-site arguments.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming 'what happens on site stays on site' for social media"
            whatHappens={
              <>
                Apprentice finishes a particularly grim CU swap-out &mdash; old VIR, no main
                earth, melted plastic. Snaps a few photos. Posts to Instagram with caption
                &quot;massive nightmare today, customer had ZERO earth, lucky to be alive&quot;.
                Doesn&apos;t name the customer, doesn&apos;t tag the firm. Two days later the
                customer&apos;s daughter sees the post (the unique kitchen tile gives it away),
                shows her dad, who recognises his own house. Customer rings the firm threatening
                a complaint to the ICO and a defamation claim. The firm has to apologise, take
                the post down, and discipline the apprentice.
              </>
            }
            doInstead={
              <>
                Photos of customer property are personal data under UK GDPR &mdash; the duty
                travels with the data, not with whether you named anyone. The firm&apos;s
                social-media policy almost certainly prohibits posting customer property
                without explicit written consent. The fix: take the photo for the supervisor
                and the firm&apos;s case management system only, never post to personal
                social media. If you want trade content for Instagram or LinkedIn, get
                explicit written consent from the customer in advance, crop out anything
                identifying (postcode, view, distinctive fittings), and run it past your
                supervisor before posting.
              </>
            }
          />

          <CommonMistake
            title="Letting a co-worker dispute fester instead of using the grievance procedure"
            whatHappens={
              <>
                Two apprentices on the same crew &mdash; one keeps making belittling
                comments about the other&apos;s work in front of customers. The targeted
                apprentice tries to ignore it, hoping it&apos;ll stop. It escalates over
                three weeks &mdash; comments become personal, then turn on the apprentice&apos;s
                background and accent. Eventually the targeted apprentice quits in
                frustration. The firm loses an apprentice, the perpetrator faces a tribunal
                claim under the Equality Act, and HR has to investigate something that could
                have been a five-minute supervisor conversation in week one.
              </>
            }
            doInstead={
              <>
                Raise it informally first &mdash; tell the other apprentice the comments are
                unwanted, and that you want them to stop. If they continue, escalate to your
                supervisor. If still unresolved, raise a formal grievance in writing under
                the firm&apos;s grievance policy (ACAS-aligned). The Equality Act 2010 s.26
                covers harassment based on protected characteristics, and the Employment
                Rights Act 1996 protects you from being penalised for raising the grievance.
                Quitting closes off most of your remedies; raising the grievance opens them.
              </>
            }
          />

          <Scenario
            title="Customer offers you a tip — your firm's policy says no tips"
            situation={
              <>
                You finish a CU change for a long-standing customer. As you&apos;re packing
                the van the customer comes out with £50 in cash and says &quot;you&apos;ve
                been brilliant, I want to give you a little extra&quot;. Your firm&apos;s
                staff handbook explicitly says no tips &mdash; the firm&apos;s anti-bribery
                policy frames any unsolicited customer payment as a risk because it could
                later look like an inducement to issue a favourable cert or a discounted
                quote. The customer is being genuine and might be offended if you decline.
              </>
            }
            whatToDo={
              <>
                Decline politely but warmly. &quot;Thank you, that&apos;s really kind, but
                the firm has a no-tips policy &mdash; we&apos;re paid via the invoice and
                that&apos;s how it stays clean. What would mean a lot is if you could leave
                a Google review for us, or recommend us to your neighbours.&quot; That
                preserves the relationship, redirects the goodwill into something the firm
                actually benefits from (reviews, referrals), and keeps you on the right side
                of the policy. Mention the offer to your supervisor when you get back so
                there&apos;s a record &mdash; not because you&apos;ve done anything wrong,
                but because the firm tracks these moments and may want to write a thank-you
                card to the customer.
              </>
            }
            whyItMatters={
              <>
                The no-tips policy isn&apos;t about being precious &mdash; it&apos;s about
                keeping the firm&apos;s certs and quotes auditable and untainted. If a
                customer pays you cash and you later issue them a favourable EICR, the
                contractor-scheme audit could question whether the cert was independent.
                Refusing keeps the relationship clean. It&apos;s also a good moment to
                redirect the customer&apos;s goodwill into something measurable &mdash; a
                review or a referral &mdash; which is worth a lot more to the firm than
                fifty quid in your pocket.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Company policies fall into five practical buckets — safety, quality, HR, commercial, confidentiality. Each has a legal anchor that the firm is interpreting and applying.",
              "HASAWA s.2(3) requires a written safety policy for any employer with five or more employees — general statement, organisation, arrangements. Day-one induction reading.",
              "HR policies are normally aligned to the ACAS Code of Practice on Discipline and Grievance — informal first, written, meeting, outcome, appeal. Tribunals can adjust awards by up to 25% if the Code wasn't followed.",
              "The Equality Act 2010 s.26 defines harassment as 'unwanted conduct related to a protected characteristic' with the 'purpose OR effect' of violating dignity or creating an offensive environment. Even unintentional behaviour can qualify.",
              "Customer-facing conduct (turn up on time, dressed cleanly, polite, no swearing, no smoking on premises) is the baseline that distinguishes a recommended firm from one that's quietly never called again.",
              "Co-worker relationships are governed by HR policies AND the Equality Act — bullying and harassment are never acceptable. Use the grievance procedure rather than letting it fester.",
              "Sub-contractor management requires vetting, written scope, prompt payment and same conduct standards. Escalate disputes to the principal contractor rather than arguing on site.",
              "Confidentiality applies whether you're at work, in the pub or on social media — the duty travels with the information. Personal social media doesn't insulate you.",
            ]}
          />

          <Quiz title="Company policies and working relationships — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 Purpose of customer information
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 GDPR and DPA — customer data
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
