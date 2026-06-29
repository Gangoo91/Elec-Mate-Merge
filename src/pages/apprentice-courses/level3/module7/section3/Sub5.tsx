/**
 * Module 7 · Section 3 · Subsection 5 — Professional conduct for electricians
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.x
 *   AC — "Identify professional standards expected of electricians".
 *
 * The IET Code of Conduct framework, ethical decision-making in trade
 * settings, representing your employer in client interactions, professional
 * confidentiality (personal data, security details, commercial sensitivity),
 * boundaries with other trades on site, and the consequences of breaching
 * professional standards — scheme suspension, regulatory action and personal
 * liability under HASAWA / EWR.
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

const TITLE = 'Professional conduct for electricians | Level 3 Module 7.3.5 | Elec-Mate';
const DESCRIPTION =
  'The professional standards expected of electricians — IET Code of Conduct, integrity and competence, representing your employer, confidentiality, professional boundaries and the consequences of breach.';

const checks = [
  {
    id: 'mod7-s3-sub5-iet-code',
    question:
      'Which organisation publishes a Code of Conduct that applies to electrical engineers and technicians?',
    options: [
      'The Institution of Engineering and Technology (IET) — Rules of Conduct setting standards for integrity, competence, public safety, professional judgement and supporting others. Members are expected to behave in line with the Rules and can be subject to disciplinary action for breach.',
      'The Health and Safety Executive (HSE) — its Code of Conduct is a statutory document that every electrician must sign before being allowed to work, with breaches enforced directly by HSE inspectors through improvement notices.',
      'The British Standards Institution (BSI) — BS 7671 itself contains the profession\'s Code of Conduct in Part 1, which sets the ethical duties of integrity and competence alongside the technical wiring requirements.',
      'Ofgem — the energy regulator publishes the Code of Conduct for electrical contractors as a condition of connecting installations to the network, and can revoke a contractor\'s right to work for serious breaches.',
    ],
    correctIndex: 0,
    explanation:
      "The IET publishes Rules of Conduct that bind members. They cover the five headline duties: act with integrity; maintain competence; protect public safety; exercise sound professional judgement; support others' professional development. CPS schemes (NICEIC, NAPIT) align their own scheme rules with the same broad principles. Breach can lead to scheme suspension, loss of professional registration and reputational harm.",
  },
  {
    id: 'mod7-s3-sub5-cash-vat',
    question: 'A client offers you cash to avoid VAT on a job. How should you respond?',
    options: [
      'Accept the cash but still record the job and pay the VAT yourself out of your own margin. The customer gets their discount, the tax is paid, and everyone is happy — there is no offence because the VAT reaches HMRC.',
      'Politely decline and explain you must work within the law. Tax evasion is a criminal offence under the Fraud Act 2006 and VAT legislation; accepting it puts your business, scheme registration and personal liability at serious risk. Decline firmly without lecturing the client.',
      'Agree, provided the job is under £1,000 — small cash jobs below the VAT threshold per transaction are exempt, so taking cash on a job of that size is within the rules.',
      'Accept the cash and issue the customer a receipt marked "goodwill discount" rather than an invoice. As long as no VAT invoice is produced, the transaction sits outside the VAT system and no offence is committed.',
    ],
    correctIndex: 1,
    explanation:
      "Tax evasion is illegal — not a grey area. Professional conduct means declining politely but unambiguously. Re-quote the work with VAT shown clearly; if the client refuses to pay legitimately, walk away. Many electricians lose more in HMRC investigation fees, scheme suspension and reputation damage than they ever 'saved' on cash jobs.",
  },
  {
    id: 'mod7-s3-sub5-confidentiality',
    question: 'What does professional confidentiality typically cover on a domestic job?',
    options: [
      "Only the customer's written contact details, because those are the sole category covered by the Data Protection Act 2018. Anything you simply see or overhear in the property — alarm codes, valuables, conversations — is not personal data and carries no duty of confidence.",
      "Only information the customer has explicitly asked you to keep secret. If they have not said 'please keep this confidential' about a particular thing, you are free to discuss or share it with other customers and trades.",
      "Protecting the client's personal information, security arrangements (alarm codes, key locations, access routines) and any commercially or personally sensitive matters you become aware of during the work. Casual chat about 'they've got a nice setup' can enable theft and breach the Data Protection Act 2018 if shared further.",
      "Only matters relating to the electrical installation itself — circuit details, test results and the condition of the wiring. Personal or security information about the household falls outside an electrician's professional confidentiality.",
    ],
    correctIndex: 2,
    explanation:
      "Confidentiality covers everything you see, hear or are told as a function of being on site. Personal data (names, addresses, contact details) is governed by UK GDPR and the Data Protection Act 2018. Security arrangements are common-sense confidential. Commercial information picked up on commercial sites is also protected — sharing or trading on it is misconduct and can be unlawful.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "You discover a colleague has been signing off work without completing proper tests. What's the professional response?",
    options: [
      'Say nothing — it is not your job to police a more senior colleague, and raising it could be seen as undermining them. As long as you complete your own tests properly, their certificates are their own responsibility.',
      'Raise it with your supervisor or QS in line with the firm whistleblowing process; document what you saw, when and where. Falsified certificates are dangerous to the public and a criminal matter under EWR 1989 and the Fraud Act 2006. You have a duty under EWR Reg 3 not to be complicit.',
      'Quietly re-test the affected circuits yourself and re-issue the certificates under your own name, without telling anyone. Fixing the paperwork discreetly resolves the safety risk without causing conflict on site.',
      'Report it straight to the HSE and the police before speaking to anyone at the firm. Going to the authorities first protects you and avoids the firm covering up the falsified certificates internally.',
    ],
    correctAnswer: 1,
    explanation:
      "Reporting through the proper channel protects the public and you. Falsifying test results is a serious matter — it endangers occupants and breaches both EWR 1989 and CPS scheme rules. The Public Interest Disclosure Act 1998 protects workers from retaliation for raising genuine concerns. Don't tackle it on the shop floor; escalate calmly.",
  },
  {
    id: 2,
    question: 'What is the primary purpose of professional codes of conduct in the electrical industry?',
    options: [
      "To set the prices electricians may charge, ensuring fair competition and preventing any one firm from undercutting the rest of the trade on labour rates.",
      "To replace statutory law for the electrical trade — once a firm signs up to a code of conduct it is exempt from HASAWA and EWR enforcement because the scheme regulates it instead.",
      "To protect the public, maintain industry standards and uphold the profession's reputation. The codes formalise the link between technical competence and ethical behaviour — both are needed to be a competent electrician within the meaning of EWR 1989.",
      "To provide a marketing badge for firms — the main purpose is to give registered businesses a logo to display, with the conduct rules being a secondary formality that is rarely enforced.",
    ],
    correctAnswer: 2,
    explanation:
      "Codes of conduct codify the behaviours that protect end-users from competent-but-corrupt or competent-but-careless practitioners. They sit alongside technical standards (BS 7671) and statutory duties (EWR 1989, HASAWA 1974) to define what 'competent' actually means in practice.",
  },
  {
    id: 3,
    question: 'How should you represent your employer when dealing with clients?',
    options: [
      "Tell the client whatever keeps them happy in the moment, even if you are not certain the firm can deliver it — managing expectations afterwards is the office's job, not yours on site.",
      "Keep conversation to an absolute minimum and avoid answering questions, referring everything to the office. Saying as little as possible is the safest way to avoid misrepresenting the firm.",
      "Be candid about any internal problems so the client trusts you — explaining that the office is disorganised or that a colleague made a mistake shows honesty and builds rapport.",
      "Behave professionally, maintain confidentiality about internal matters, never criticise colleagues or competitors, only promise what the firm can deliver and refer complex issues to the right person rather than guess. You're the firm's public face on every call.",
    ],
    correctAnswer: 3,
    explanation:
      "Every client interaction is reputation — yours and the firm's. Speak well of colleagues and competitors (or stay silent), maintain confidentiality, refer issues you can't handle to the QS or office, and never make commitments you can't honour. The Bribery Act 2010 also forbids 'commercial advantage' gifts and kickbacks in either direction.",
  },
  {
    id: 4,
    question:
      'A homeowner asks you to install a socket outlet directly above their bathroom basin. What is the professional response?',
    options: [
      "Explain the BS 7671 special-location zones (Section 701) for rooms containing a bath or shower — socket outlets are prohibited within 2.5 m horizontally of the zone 1 boundary, with very limited exceptions (BS EN 61558-2-5 shaver sockets) — and offer the compliant alternatives. Customer education is part of the job.",
      "Fit the socket as asked but protect it with a 30 mA RCD and an IP44-rated faceplate. The RCD and weatherproof cover make a socket compliant in any bathroom zone, so the customer's request can be met safely.",
      "Fit the socket as asked provided it is at least 600 mm above the basin. Height alone removes it from the special-location zones, so any standard socket is permitted once it clears that distance.",
      "Decline the work without further discussion — it is not your place to explain the regulations to a customer, and giving reasons only invites an argument. Simply state you cannot do it and move on.",
    ],
    correctAnswer: 0,
    explanation:
      'Professional conduct requires plain-English explanation of why the regs exist and offering compliant alternatives (shaver socket, socket outside the room near the door). Walking away with no explanation is unhelpful; doing the non-compliant work is dishonest and unsafe. The right answer is education plus alternatives.',
  },
  {
    id: 5,
    question: 'What should you do if you make a mistake during an installation?',
    options: [
      'Quietly correct it if you can do so without anyone noticing, and only mention it if you are directly asked. Drawing attention to a mistake you have already fixed just damages your standing on site.',
      'Own up to it, put it right properly at your own expense, document the corrective action, and treat it as CPD — what went wrong and how to stop it recurring.',
      'Leave it for the next inspection to pick up — the EICR process exists precisely to catch defects, so flagging your own error duplicates work the system already does.',
      'Carry on and let the firm bill the customer for the extra time to put it right, since the time spent correcting it is legitimate labour that has to be paid for somehow.',
    ],
    correctAnswer: 1,
    explanation:
      "Owning mistakes is core professional integrity. Hiding a defect creates personal liability under EWR 1989 ('person who caused or permitted'), exposes the firm to contractual claims, and damages trust if discovered later. The right loop is: stop, declare, fix, document, learn. Most insurance and scheme policies expect that exact behaviour.",
  },
  {
    id: 6,
    question:
      "You overhear confidential information about a commercial client's business plans while on site. What's the right action?",
    options: [
      'Mention it to your QS so the firm can use the information to win more work from the client, since intelligence gathered on site is a legitimate commercial advantage for your employer.',
      'It is only confidential if it was marked or stated as confidential. Information you merely overheard was not entrusted to you, so you are free to repeat it.',
      'Treat it as confidential, do not disclose or use it, and do not record it. This is part of your professional duty even though the information was incidental to your work.',
      'Pass it discreetly to a contact at a competing firm in exchange for a favour — as long as you gain nothing in cash, no Bribery Act issue arises.',
    ],
    correctAnswer: 2,
    explanation:
      "Confidentiality covers everything incidental to your work, not just what's formally marked confidential. Trading on overheard commercial information can amount to misuse of private information at civil law and may breach the Bribery Act 2010 if 'sold' to a competitor. Silence is the professional answer.",
  },
  {
    id: 7,
    question: 'How should you handle disagreements with other trades on a construction site?',
    options: [
      "Stand your ground firmly on site and refuse to continue until the other trade backs down — electrical work takes priority over other disciplines, so other trades should defer to you.",
      "Go straight to the client to settle the disagreement, since the client is paying for the whole job and is the right person to arbitrate between the trades.",
      "Resolve it informally with a quiet word and a handshake, keeping it off the record so nobody is embarrassed — written records of disputes between trades only create bad feeling.",
      "Discuss professionally with the trade contact first, escalate to the site manager / principal contractor if it affects your work, document any decisions that change scope, and never let it impact the customer's view of the project.",
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 names the principal contractor as the coordinator on construction sites. Most coordination disputes belong with them, not with the client. Document any changes in writing — verbal agreements between trades evaporate by the next site meeting. Stay polite even when the other party is not; the calm party wins the audit trail.',
  },
  {
    id: 8,
    question: 'What is the appropriate action if you are asked to work beyond your competence?',
    options: [
      'Politely decline and explain your limitation, suggesting a colleague or specialist who is qualified. Working outside competence breaches EWR 1989 Reg 16 and is also a scheme rule for CPS-registered firms.',
      'Have a go and learn on the job — practical experience is how competence is built, and refusing work makes you look unwilling. Any mistakes can be put right at the testing stage.',
      'Accept the work but ask the customer to sign a disclaimer accepting the risk. A signed waiver transfers liability to the customer and means you cannot be held responsible if anything goes wrong.',
      'Accept it as long as a more senior colleague is somewhere on site, even if they are not watching you. Their mere presence on the job satisfies the requirement for supervision regardless of what they are doing.',
    ],
    correctAnswer: 0,
    explanation:
      "EWR 1989 Reg 16 is the statutory underpinning: no person shall be engaged in work activity where technical knowledge or experience is necessary to prevent danger unless they possess such knowledge or experience (or are supervised). 'Have a go' is not a professional response — refer to a specialist or to your QS.",
  },
];

const faqs = [
  {
    question: 'What happens if I breach professional codes of conduct?',
    answer:
      "Consequences scale with severity. Minor lapses might draw informal guidance from a supervisor or scheme assessor. Serious breaches can lead to disciplinary action by the IET or CPS scheme (suspension, revocation), reputational damage, loss of work, and — where conduct overlaps with criminal acts (fraud, theft, false certification) — prosecution under HASAWA 1974, EWR 1989, the Fraud Act 2006 or other relevant statutes. Persistent issues will also bar you from ECS card upgrades.",
  },
  {
    question: "Do professional standards apply when I'm working for family or friends?",
    answer:
      'Yes — every time. Standards apply to all electrical work regardless of who the customer is. Friends and family deserve the same EIC, the same test results, the same compliant installation. Cutting corners for a mate is the fastest way to a damaged relationship when something fails later. Treat the freebies and favours like every other job.',
  },
  {
    question: 'How do I handle a situation where my employer asks me to cut corners?',
    answer:
      'Raise it calmly with the QS or supervisor in writing (email is fine) explaining the safety / compliance concern. If the firm insists, you may need to decline the specific instruction and escalate — to a senior director, the CPS scheme, or in the last resort the HSE. Remember that under HASAWA 1974 s.7 and EWR 1989 Reg 3 you can be personally prosecuted for unsafe work regardless of who told you to do it. PIDA 1998 protects you from retaliation for raising genuine concerns.',
  },
  {
    question: "Is it unprofessional to recommend competitors if I can't do a job?",
    answer:
      "No — it's professional. Recommending a trusted specialist for work outside your scope serves the client's interest and usually creates goodwill that comes back to you. Pick competitors you would genuinely trust with your own home; the recommendation is a tacit endorsement of their work.",
  },
  {
    question: 'How should I handle online reviews — good and bad?',
    answer:
      "Thank reviewers for positive feedback briefly and personally. For negative reviews, respond professionally, acknowledge the concern, offer to discuss privately to resolve, and never get into a public argument. Even unfair reviews are best handled with a calm, factual response — readers can usually tell the difference between a balanced reply and a defensive rant. Don't post pictures or details that could identify the customer (DPA 2018).",
  },
  {
    question: "What's the professional approach to pricing when a client has cheaper quotes?",
    answer:
      "Hold your price if it reflects fair value. Explain plainly what your quote includes — qualified labour, scheme certification, insured workmanship, named materials, post-completion support — rather than rubbishing competitors. If the gap is large the other quote is probably non-compliant; some customers will only learn that the hard way. Never compromise compliance to match a cheaper quote.",
  },
  {
    question: 'What about gifts from suppliers or manufacturers?',
    answer:
      'The Bribery Act 2010 makes giving or receiving anything intended to induce improper performance an offence. Small promotional items (a branded torch, a calendar, lunch at a CPD event) are fine and normal. Cash, high-value gifts, holidays, or anything tied to a purchase decision are not — both for the giver and receiver. Most firms have a gifts and hospitality register; declare anything over a small threshold (typical: £50).',
  },
  {
    question: 'Can I be held personally liable even if I work for someone else?',
    answer:
      "Yes. EWR 1989 and HASAWA 1974 impose duties on the individual carrying out work as well as on the employer. Personal prosecution is rare but real — typically where there is clear evidence the worker knowingly did something dangerous. The practical implication is that 'I was only following instructions' is not a defence. Push back in writing if asked to do unsafe work.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 5"
            title="Professional conduct for electricians"
            description="The IET Code of Conduct framework, ethical decision-making, representing your employer, confidentiality and professional boundaries — and the personal and business consequences of breach."
            tone="blue"
          />

          <TLDR
            points={[
              "Professional conduct sits alongside technical competence — both are required to meet the 'competent person' test in EWR 1989 Reg 16.",
              'The IET Rules of Conduct codify five duties: integrity, competence, public safety, professional judgement, supporting others.',
              "Representing your employer means professional appearance, confidentiality about internal matters, and never undermining colleagues or competitors in front of clients.",
              "Confidentiality covers personal data (UK GDPR / DPA 2018), security arrangements and commercial information picked up incidentally.",
              "Bribery Act 2010 forbids gifts intended to induce improper performance — small promotional items are fine; cash and high-value gifts are not.",
              "Breach consequences: scheme suspension, loss of professional registration, personal prosecution under HASAWA / EWR / Fraud Act, and reputational damage that follows you between firms.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Maps to C&G 2365-03 / Unit 308 / LO1 — identify the professional standards expected of electricians.',
              'State the five duties in the IET Rules of Conduct and how they apply to day-to-day site work.',
              'Apply an ethical decision-making framework to common dilemmas — cash-only jobs, falsified tests, asked to work outside competence.',
              'Explain professional confidentiality and how UK GDPR / DPA 2018 apply to information picked up on site.',
              "Describe what 'representing your employer' looks like in practice — appearance, language, and conflicts of interest.",
              'State the consequences of breaching professional conduct — scheme, regulatory and personal.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Core principles of professional conduct</ContentEyebrow>

          <ConceptBlock
            title="The five-duty framework — integrity, competence, public safety, judgement, supporting others"
            plainEnglish="Professional conduct is more than technical skill — it's how you behave around the technical skill. The IET Rules of Conduct express it as five duties: act with integrity (honest, trustworthy); maintain competence (only do what you're qualified for, keep skills current); promote public safety (put end-users before commercial pressure); exercise professional judgement (reasoned decisions based on evidence and the regs); support others (share knowledge, mentor apprentices, raise the standard of the trade). All five matter; you can't trade integrity for competence."
            onSite="The five-duty test is a quick gut-check before any difficult decision. If a proposed action fails one of the five, it's the wrong action — even if it pays well, even if the customer asked for it, even if a colleague tells you it's fine. Apprentices: copy the framework into your phone and pull it up when you're about to do something that doesn't feel right. It's not legally binding for non-IET members but every CPS scheme rules are aligned with the same broad principles."
          >
            <p>
              The IET Rules of Conduct (and the equivalent JIB and CPS scheme codes) cover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Integrity</strong> &mdash; honest, accurate certification, clear pricing,
                no false claims about qualifications.
              </li>
              <li>
                <strong>Competence</strong> &mdash; only do work you&apos;re qualified for; keep
                BS 7671 currency and specialist tickets up to date.
              </li>
              <li>
                <strong>Public safety</strong> &mdash; safety of end-users takes precedence over
                commercial pressure, schedules, or customer wishes.
              </li>
              <li>
                <strong>Professional judgement</strong> &mdash; reasoned decisions, documented, with
                a clear basis in the regs and best practice.
              </li>
              <li>
                <strong>Supporting others</strong> &mdash; mentoring, sharing knowledge with
                apprentices, contributing to the wider profession.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why codes of conduct exist — competence + ethics = 'competent person'"
            plainEnglish="Codes of conduct exist because being technically qualified isn't enough — a corrupt or careless qualified electrician still puts people at risk. The codes set the ethical baseline that, combined with technical qualifications, defines a 'competent person' for EWR 1989, Part P and the CPS schemes. They protect the public from competent-but-dishonest practitioners, protect honest electricians from being undercut by corner-cutters, and protect the trade's overall reputation. Without them, the cheapest non-compliant work would always win."
            onSite="When the customer pushes you to do something dodgy, the codes are your professional backbone — 'I can't do that; my CPS scheme rules prohibit it and so does my licence to operate.' That framing is stronger than a personal preference and tends to land better with customers."
          >
            <p>
              Codes of conduct serve three audiences:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The public</strong> &mdash; protection from incompetent or dishonest
                practitioners, predictable standard of service.
              </li>
              <li>
                <strong>The profession</strong> &mdash; reputation protection so that being an
                electrician means something specific and trusted.
              </li>
              <li>
                <strong>Individual electricians</strong> &mdash; a clear baseline that everyone is
                held to, protecting the honest from being undercut by corner-cutters.
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

          <ContentEyebrow>Ethical decision-making in practice</ContentEyebrow>

          <ConceptBlock
            title="Common ethical dilemmas — cash jobs, falsified tests, working outside competence"
            plainEnglish="The most common ethical dilemmas in the trade follow a few patterns. Cash to avoid VAT (tax evasion under the Fraud Act 2006 and VAT legislation). 'Just sign it off' for work you didn't witness (false certification — fraud, plus EWR breach if unsafe). 'Have a go' at HV or specialist work you're not trained for (EWR Reg 16 breach). 'Don't mention it on the cert' for non-compliant work (multiple offences). The pattern: short-term gain, long-term professional and personal liability."
            onSite="Have a prepared response. 'I can't take cash without VAT — happy to give you a proper invoice though.' 'I can't sign for work I didn't see tested, but I can come back and test it for you.' 'That's outside my ticket — I can recommend a specialist.' Practice the words. The first time you have to say them under pressure, having rehearsed them helps."
          >
            <p>
              The most common dilemma categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tax / VAT pressure</strong> &mdash; cash to avoid VAT, off-books work, false
                expense claims.
              </li>
              <li>
                <strong>Certification pressure</strong> &mdash; sign off work you didn&apos;t see;
                pass a test that failed; omit defects from a report.
              </li>
              <li>
                <strong>Competence pressure</strong> &mdash; do work outside your training (HV,
                hazardous areas, specialist equipment).
              </li>
              <li>
                <strong>Compliance pressure</strong> &mdash; install non-compliant kit because the
                customer prefers it; skip a step the regs require.
              </li>
              <li>
                <strong>Confidentiality pressure</strong> &mdash; reveal information about one
                customer to another; trade on commercial information overheard on site.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Owning mistakes — the professional loop"
            plainEnglish="Mistakes happen. The professional response is the same regardless of mistake size: stop, declare, fix, document, learn. Stop work at the point you realise; declare to the QS or customer (whichever is appropriate); fix at your own expense to current standard; document the corrective action; treat it as CPD — what went wrong and how to stop it recurring. Hiding a mistake usually makes it worse: an undetected fault may surface as a fire, a shock or an EICR finding by the next firm; an undetected defect that later causes harm puts you in personal liability territory under EWR 1989."
            onSite="The professional loop also applies to near-misses — things that nearly went wrong but didn't. A near-miss is free CPD; treat it the same way (declare, document, learn). Most CPS schemes appreciate honest near-miss reporting at audit and view it as evidence of a healthy safety culture."
          >
            <p>
              The professional mistake-handling loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop</strong> &mdash; the moment you realise something is wrong.
              </li>
              <li>
                <strong>Declare</strong> &mdash; to the right person (QS, customer, supervisor)
                without delay.
              </li>
              <li>
                <strong>Fix</strong> &mdash; at your own expense, to current standard, no shortcuts.
              </li>
              <li>
                <strong>Document</strong> &mdash; what happened, what you did, why.
              </li>
              <li>
                <strong>Learn</strong> &mdash; share with team if relevant; update checklists or
                processes if needed.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16 (competence)"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical knowledge or
                experience is necessary to prevent danger or, where appropriate, injury, unless he
                possesses such knowledge or experience, or is under such degree of supervision as
                may be appropriate having regard to the nature of the work.&quot;
              </>
            }
            meaning={
              <>
                EWR 1989 Reg 16 is the statutory anchor for professional conduct. &quot;Technical
                knowledge or experience&quot; isn&apos;t just about qualifications &mdash; it
                covers ongoing CPD and applies to every individual on the job, not just the QS.
                Working outside competence is a statutory breach regardless of who instructed it.
                Refusal to do work outside your competence is a professional duty, not optional.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), reg. 16."
          />

          <RegsCallout
            source="Health and Safety at Work etc. Act 1974 — Section 7 (employees' duties)"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work &mdash; (a) to take
                reasonable care for the health and safety of himself and of other persons who may
                be affected by his acts or omissions at work; and (b) as regards any duty or
                requirement imposed on his employer or any other person by or under any of the
                relevant statutory provisions, to co-operate with him so far as is necessary to
                enable that duty or requirement to be performed or complied with.&quot;
              </>
            }
            meaning={
              <>
                HASAWA 1974 s.7 means &quot;I was only following instructions&quot; is not a
                defence. Every employee has a personal duty of care, on top of any duty owed by
                the employer. Where instructed work would breach safety duties, the right answer is
                push back in writing, escalate, and decline if necessary &mdash; the law does not
                excuse unsafe work because someone else told you to do it.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.7."
          />

          <RegsCallout
            source="Bribery Act 2010 — Sections 1, 2 and 6 (offences)"
            clause={
              <>
                <p className="mb-2">
                  The Bribery Act 2010 creates four main offences:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Section 1 &mdash; offering or giving a bribe to induce improper performance.
                  </li>
                  <li>
                    Section 2 &mdash; requesting or receiving a bribe in return for improper
                    performance.
                  </li>
                  <li>
                    Section 6 &mdash; bribing a foreign public official.
                  </li>
                  <li>
                    Section 7 &mdash; failure of a commercial organisation to prevent bribery
                    (corporate offence).
                  </li>
                </ul>
                <p className="mt-2">
                  Penalties include unlimited fines and up to 10 years&apos; imprisonment.
                </p>
              </>
            }
            meaning={
              <>
                Small promotional items at trade events (branded torch, calendar, modest lunch) are
                fine. Cash, high-value gifts, holidays, or anything tied to a specific purchase
                decision are not. Most firms maintain a gifts and hospitality register; declare
                anything over a small threshold (typical: &pound;50). Receiving as well as giving
                is an offence &mdash; the apprentice on the receiving end is exposed too.
              </>
            }
            cite="Source: Bribery Act 2010, ss.1, 2, 6, 7."
          />

          <SectionRule />

          <ContentEyebrow>Representing your employer</ContentEyebrow>

          <ConceptBlock
            title="You are the firm's public face on every call"
            plainEnglish="Every client interaction is reputation — yours and the firm's. Customers don't separate 'the electrician' from 'the company they work for' — the experience they have on the day is the company. That means professional appearance (clean workwear, ID, branded van where applicable), confidentiality about internal matters (don't slag off the office or fellow tradespeople in front of clients), and never making commitments you can't deliver. Refer issues you can't handle to the right person rather than guess."
            onSite="Treat the customer's home or premises with respect — shoes off where asked, dust sheets, clean up at the end, take rubbish away. The trade reputation industry-wide depends on the basic behaviours every job. Apprentices: how you behave on the first job for a firm is how they'll view you for the next year. Get the basics right consistently."
          >
            <p>
              Professional representation includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clean workwear or uniform, visible ECS card on site.</li>
              <li>Punctuality &mdash; call ahead if delayed.</li>
              <li>Confidentiality about internal company matters.</li>
              <li>No criticism of colleagues, competitors or previous customers.</li>
              <li>Refer complex issues to the QS or office, don&apos;t freelance.</li>
              <li>Follow company procedures even if you disagree with them &mdash; raise disagreements separately.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Conflicts of interest — solicitation, moonlighting, personal use of resources"
            plainEnglish="The classic conflicts of interest in the trade: soliciting private work from your employer's clients (poaching); using company time, tools, materials or the company van for personal work; doing 'cash jobs on the side' that compete with the employer; accepting work from a supplier you also recommend to clients. None of these is automatically illegal but all are professional misconduct in most employment contracts, and most contracts include explicit clauses on solicitation and use of resources."
            onSite="If a customer wants you privately for a follow-up job, raise it with your employer first — many firms will let you do small private work outside hours if declared. The Bribery Act 2010 also captures kickbacks from suppliers in either direction. When in doubt: declare it, get permission in writing, or don't do it."
          >
            <p>
              Common conflicts to avoid:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer solicitation</strong> &mdash; doing private work for your
                employer&apos;s clients without disclosure or permission.
              </li>
              <li>
                <strong>Resource misuse</strong> &mdash; company van, tools, materials or time
                used for personal work.
              </li>
              <li>
                <strong>Cash side-jobs</strong> &mdash; off-books work that competes with the
                employer or undermines tax compliance.
              </li>
              <li>
                <strong>Supplier kickbacks</strong> &mdash; gifts or commissions for recommending
                specific suppliers; potentially Bribery Act offences.
              </li>
              <li>
                <strong>Undisclosed personal interests</strong> &mdash; family member running a
                competing or complementary business.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Confidentiality and professional boundaries</ContentEyebrow>

          <ConceptBlock
            title="What confidentiality actually covers on a domestic or commercial job"
            plainEnglish="Confidentiality covers three broad categories on most jobs: personal data (names, addresses, contact details, photos that identify the property — governed by UK GDPR and DPA 2018); security arrangements (alarm codes, key locations, access routines, vulnerable occupants); and commercial information (business plans, financials, client lists picked up on commercial sites). The duty is to protect — don't share, don't discuss with other customers, don't trade on it, don't post about it. Storage of any personal data you do hold needs reasonable security."
            onSite="The 'pub test' is useful: if you wouldn't tell a stranger in the pub, don't tell anyone outside the job either. Photos for marketing or portfolio need explicit customer permission; never photograph items, security set-ups or anything that identifies the property without it. Apprentices: social media is the most common breach point — no Instagram stories from the customer's living room, no TikToks from inside the consumer unit."
          >
            <p>
              Confidentiality covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Personal data</strong> &mdash; names, addresses, phone numbers, emails;
                governed by UK GDPR and the Data Protection Act 2018.
              </li>
              <li>
                <strong>Security arrangements</strong> &mdash; alarm codes, key locations, access
                routines, occupancy patterns.
              </li>
              <li>
                <strong>Commercial information</strong> &mdash; business plans, pricing,
                financials, client lists picked up incidentally.
              </li>
              <li>
                <strong>Vulnerability information</strong> &mdash; medical equipment dependencies,
                children&apos;s schedules, lone-occupier status.
              </li>
              <li>
                <strong>Photos and video</strong> &mdash; never without explicit permission; never
                in a form that identifies the property.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Professional boundaries — relationships, gifts, social media"
            plainEnglish="Professional boundaries protect you and the customer. Keep relationships professional — friendly but not personal. Don't accept gifts beyond modest hospitality (Bribery Act 2010). Don't share personal contact details with customers beyond what's needed for the job. Don't engage on personal social media accounts with customers. If a customer becomes a personal friend over time, that's fine — but flag it with the QS and consider whether you should personally do their work or pass it to a colleague."
            onSite="Boundaries also apply to the trade-customer dynamic specifically — never make a customer feel uncomfortable, never enter rooms you don't need access to, always ask before moving personal items. The MET Police's classic 'reasonable person' test applies: would a reasonable bystander think this behaviour was professional?"
          >
            <p>
              Boundaries to maintain:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Friendly but professional manner &mdash; not personal.</li>
              <li>Modest hospitality only &mdash; no gifts above small-token threshold.</li>
              <li>No personal social-media engagement with customers.</li>
              <li>No photos of customer property for personal use.</li>
              <li>Never enter rooms not needed for the work.</li>
              <li>Always ask before moving customer&apos;s belongings.</li>
              <li>Disclose any pre-existing personal relationship to the QS.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Doing a 'cash job for the weekend' — looks small, costs big"
            whatHappens={
              <>
                Apprentice picks up a small extra-hours job through a family contact, agrees cash,
                doesn&apos;t declare to employer, doesn&apos;t register self-employment, doesn&apos;t
                issue a certificate. Work has a small fault three years later; insurance investigation
                surfaces the lack of certification and the lack of tax declaration. Outcomes: HMRC
                investigation across all the apprentice&apos;s &quot;side jobs&quot;; employer
                disciplinary for breach of moonlighting clause; ECS card progression delayed; possible
                Fraud Act consideration for the larger pattern.
              </>
            }
            doInstead={
              <>
                Either decline private work entirely while employed, or get the employer&apos;s
                written agreement, register as self-employed for the side work, issue proper
                certificates, declare the income on Self Assessment, and carry appropriate insurance.
                The administrative cost of doing it properly is small &mdash; the cost of not is
                potentially career-ending. The phrase &quot;cash job&quot; should be the trigger to
                stop and think every time.
              </>
            }
          />

          <CommonMistake
            title="Signing off a colleague's work without seeing the tests"
            whatHappens={
              <>
                Two electricians on a job; one rushes off to the next call; the other is asked by
                the office to sign the certificate so the customer can get the invoice. They
                sign. Two months later the customer has a fire; investigation traces it to a missing
                continuity test on a circuit that should have failed. The signer is in personal
                liability territory under EWR 1989, plus fraud territory for signing for work not
                witnessed. The original installer may also be liable but the signer has the bigger
                problem.
              </>
            }
            doInstead={
              <>
                Only sign certificates for work you personally witnessed or tested. If the original
                tester isn&apos;t available, the right answer is delay the certificate, do the tests
                yourself, then sign &mdash; or have the original tester come back. Customer
                inconvenience over a couple of days is acceptable; falsified certification is not.
                CPS schemes audit this specifically.
              </>
            }
          />

          <Scenario
            title="The customer offers cash to avoid VAT on a £4,000 consumer unit upgrade — how do you handle it?"
            situation={
              <>
                You&apos;ve quoted a domestic consumer unit upgrade at &pound;4,000 plus VAT. The
                customer pulls you aside on the day of the job and says they&apos;d prefer to pay
                cash and skip the VAT, &quot;saving us both some paperwork.&quot; You&apos;re
                employed by a CPS-registered firm; the customer is a long-standing repeat client.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; politely refuse on the spot</strong>. &quot;That&apos;s
                not something I can do &mdash; the firm has to invoice properly and I have to follow
                that. Happy to do the work today on the existing quote.&quot;
                <br /><br />
                <strong>Step 2 &mdash; don&apos;t lecture or moralise</strong>. The customer probably
                isn&apos;t a serious tax fraudster &mdash; they&apos;re testing or hoping. A firm
                no is enough. Don&apos;t flag &quot;I&apos;ll report this&quot; or threaten;
                that&apos;s not your role.
                <br /><br />
                <strong>Step 3 &mdash; document the conversation</strong>. Short email to the
                office that evening: &quot;Customer at [job] asked about cash payment to avoid VAT;
                I declined and proceeded with the quoted scope.&quot; This protects you if the
                customer later complains about the price or invents a different version.
                <br /><br />
                <strong>Step 4 &mdash; continue normally</strong>. Don&apos;t make the rest of the
                job awkward; don&apos;t reference the conversation; just do excellent work and
                leave the customer with a clean invoice. The relationship usually survives a polite
                refusal.
                <br /><br />
                <strong>Step 5 &mdash; if the customer escalates or insists</strong>, refer to the
                office &mdash; this is a customer-management issue, not a site issue. The
                QS / director can decide whether to keep that customer at all.
              </>
            }
            whyItMatters={
              <>
                Tax evasion under the Fraud Act 2006 and VAT legislation is a criminal offence and
                exposes both the firm and the individual employee. Accepting cash also voids any
                manufacturer / scheme warranty trail (no invoice = no proof of work) and exposes you
                to disputes the firm can&apos;t defend. The polite refusal is faster and easier than
                most apprentices expect &mdash; rehearse the words.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Professional conduct + technical competence = the 'competent person' test in EWR 1989 Reg 16; neither alone is enough.",
              "IET Rules of Conduct: integrity, competence, public safety, professional judgement, supporting others. Same broad principles run through CPS scheme rules.",
              "Common dilemmas — cash jobs, falsified tests, work outside competence — have prepared professional responses; rehearse the words.",
              "HASAWA 1974 s.7 and EWR 1989 Reg 16 create personal duties — 'I was only following instructions' is not a defence.",
              "Bribery Act 2010 captures gifts in either direction; small promotional items are fine, cash and high-value gifts are not.",
              "Confidentiality covers personal data (UK GDPR / DPA 2018), security arrangements, commercial information, vulnerability details, and photos.",
              "Mistake-handling loop: stop, declare, fix at own expense, document, learn. Hiding mistakes makes liability worse.",
              "Breach consequences: scheme suspension, IET disciplinary, personal prosecution where conduct overlaps with criminal acts, reputational damage that follows you between firms.",
            ]}
          />

          <Quiz title="Professional conduct — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Customer-facing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — CPD and qualifications
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
