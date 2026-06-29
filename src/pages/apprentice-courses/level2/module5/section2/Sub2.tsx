/**
 * Module 5 · Section 2 · Subsection 2 — HASAWA + EAWR: your duties as an apprentice
 * Supplementary content — extends Unit 210 LO2 but is not directly mapped to a
 * 210 AC. Builds the personal-duty layer on top of AC 2.1 (Sub 1).
 *
 * Frame: the legislation doesn't only bind 'the firm'. HASAWA s.7 and EAWR
 * Reg 3 put a personal duty on every operative — including the apprentice
 * — and the apprentice can be personally prosecuted, fined and (in serious
 * cases) imprisoned. This Sub takes the high-level legal map from Sub 1 and
 * lands it as 'what does this mean for ME on Monday morning?'.
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
  'HASAWA & EAWR — your duties (2.2) | Level 2 Module 5.2.2 | Elec-Mate';
const DESCRIPTION =
  'The personal-duty layer — how HASAWA s.7, s.8 and s.37 and EAWR Reg 3, Reg 14 and Reg 16 land on the individual apprentice. Penalties, the live-work prohibition and what ' +
  'co-operating with the safety arrangements actually looks like.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s2-sub2-personal-duty',
    question:
      "Which of the following is the closest correct statement of an apprentice's personal duty under HASAWA s.7?",
    options: [
      "An apprentice has no personal duty under HASAWA at all — the duty falls entirely on the employer under s.2. As a trainee being supervised, the apprentice is legally a passenger: anything that goes wrong is the firm's responsibility, and the HSE cannot prosecute someone who is still learning the trade. The personal duties only switch on once the apprentice qualifies.",
      "Every employee, including an apprentice, has two personal duties under HASAWA s.7. (a) take reasonable care for their own H&S and that of anyone affected by their acts or omissions, AND (b) co-operate with the employer's arrangements (RAMS, toolbox talks, permits, PPE rules). Breach is a criminal offence personally — the apprentice can be prosecuted, not just the firm.",
      "The apprentice's only s.7 duty is to wear the PPE they are given — nothing more. As long as the hard hat, boots and glasses are on, the apprentice has discharged the entire personal duty, regardless of whether they follow the method statement, the isolation procedure or any instruction from the supervisor. PPE compliance is the whole of s.7.",
      "Under s.7 the apprentice's duty is purely financial — to take out their own public liability insurance before starting work so that any harm they cause can be compensated. The section is about ensuring the individual can pay for damage, not about how the work is carried out, and once insured the apprentice has met the requirement.",
    ],
    correctIndex: 1,
    explanation:
      "HASAWA s.7 puts an explicit personal duty on every employee. It has two limbs — (a) take reasonable care, (b) co-operate. The duty is enforceable against the individual: HSE prosecutions of individual operatives (including apprentices) under s.7 do happen, especially where the operative ignored an instruction, defeated a control, or carried out unsafe work knowing it was unsafe. 'I was just following orders' isn't a defence — and 'I'm just an apprentice' isn't either.",
  },
  {
    id: 'mod5-s2-sub2-live-work',
    question:
      "Under EAWR Reg 14, what three conditions must ALL be met before any live electrical work can lawfully be carried out?",
    options: [
      "(a) the customer has agreed in writing to the work being done live, AND (b) the work will take less than 30 minutes, AND (c) a colleague is standing by to call the emergency services. Provided all three are documented, live work is permitted and the firm has met its duty under EAWR.",
      "(a) the conductor is below 230 V, AND (b) the operative holds a current 18th Edition certificate, AND (c) rubber gloves are worn. Once these three conditions are satisfied the work is classed as low-risk live work and no permit is required.",
      "(a) it's unreasonable in all the circumstances to make it dead, AND (b) it's reasonable in all the circumstances to do the work live, AND (c) suitable precautions (including PPE and equipment) are taken to prevent injury. All three. Failing any one of them = unlawful live work, criminal offence under EAWR.",
      "(a) the supervisor has given a verbal instruction, AND (b) the area has been cordoned off, AND (c) the work is recorded in the site diary afterwards. These three steps make any live work lawful, because the responsibility then sits with the supervisor who gave the instruction rather than the operative.",
    ],
    correctIndex: 2,
    explanation:
      "EAWR Reg 14 is one of the most-tested regulations in apprenticeship assessments and one of the most-prosecuted in real life. The three conditions are conjunctive — all three required. The 'reasonably practicable to make dead' test is the killer: in the vast majority of installation work it IS reasonably practicable to isolate, so the live-work justification fails at step one. As an apprentice you would not normally be authorised to do live work alone — you'd be working under a permit issued to a senior, who carries the legal responsibility for the Reg 14 justification.",
  },
  {
    id: 'mod5-s2-sub2-prosecution-route',
    question:
      "If an apprentice's unsafe work causes an injury, what's the realistic prosecution route under HASAWA?",
    options: [
      "Only the firm can be prosecuted — never the individual. UK H&S law works on the principle that the employer carries all criminal liability for its workers, so the HSE has no power to charge an apprentice, an electrician or even a director personally. The most that can happen to the operative is internal disciplinary action by the employer.",
      "The matter is handled entirely as a civil claim — the injured person sues the apprentice for damages in the County Court, and there is no criminal dimension at all. HASAWA breaches are not crimes; they are private disputes between the injured party and whoever caused the harm, settled with compensation rather than fines or imprisonment.",
      "Liability passes automatically to the supervisor who was responsible for the apprentice that day. Because an apprentice works under supervision, the law treats the supervisor as having committed any offence in the apprentice's place, and neither the apprentice nor the firm faces charges once a named supervisor is identified.",
      "HSE investigates. Charges can be laid against the firm (HASAWA s.2 / s.3, EAWR Reg 4 / 14), against directors personally if they consented or connived (HASAWA s.37), AND against the individual operative personally (HASAWA s.7, EAWR Reg 3). Magistrates' Court — up to £20,000 fine and / or 6 months prison per offence. Crown Court — unlimited fine and / or 2 years prison. The company and the apprentice can both be prosecuted in the same case.",
    ],
    correctIndex: 3,
    explanation:
      "The HSE prosecution toolkit is wide. The firm faces s.2 / s.3 / EAWR charges. The directors face s.37 if they consented or were complicit. The individual operative — whatever their grade — faces s.7 and (for electrical work) EAWR Reg 3 charges. In a serious case all three layers can be prosecuted in the same proceedings. The Sentencing Council Definitive Guideline for H&S Offences sets the tariff: offences are categorised by culpability and harm, and even mid-range categories carry six-figure fines for medium-sized firms and prison terms for individuals.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does HASAWA s.7 require of every employee personally?",
    options: [
      "A single duty — to obey every reasonable instruction given by the employer or a supervisor. Provided the employee follows orders, they have met their s.7 obligation in full, and any harm that results is the responsibility of whoever gave the instruction rather than the person who carried it out.",
      "Two limbs. Limb (a) — take reasonable care for the H&S of yourself and of anyone affected by your acts or omissions at work. Limb (b) — co-operate with the employer (and any other person on whom a duty falls) so far as is necessary to enable that duty to be performed. Both are personal criminal duties. Breach can lead to a personal prosecution, fine and / or prison.",
      "A duty to provide and pay for their own personal protective equipment. Under s.7 the cost of PPE shifts onto the employee, so each worker must buy their own boots, gloves, glasses and hard hat, and failing to turn up properly equipped is the breach the section is concerned with.",
      "A duty to carry out the formal risk assessment for each task before starting work. s.7 makes the individual employee the risk assessor, so the worker must complete and sign a written assessment for every job, and the employer's role is only to file the paperwork the employee produces.",
    ],
    correctAnswer: 1,
    explanation:
      "s.7 is the personal hook for everyone at work. The 'reasonable care' duty covers active care (don't do unsafe things) and passive care (don't ignore unsafe situations you could have addressed). The 'co-operate' duty covers attending toolbox talks, following RAMS, wearing PPE, signing in, working within permits. Together they make the apprentice an active participant in the H&S system — not a passive instruction-follower.",
  },
  {
    id: 2,
    question:
      "What does HASAWA s.8 prohibit?",
    options: [
      "Working any longer than the maximum shift length set out in the Working Time Regulations. s.8 caps the hours an employee may spend on a hazardous task, and exceeding the cap — for example staying on site past the permitted limit to finish a job — is the breach the section creates.",
      "Carrying out electrical work without holding the correct qualification card. s.8 is the section that makes it an offence to work outside your certification, so an apprentice operating equipment they are not yet carded for is breaching it regardless of whether a supervisor is present.",
      "No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of H&S. Examples — removing a machine guard, defeating an interlock, taking down a barrier, reaching round a lock-off, stuffing the door of an interlocked enclosure, switching off a smoke detector you find inconvenient. s.8 is a personal criminal offence and applies to everyone on site, employee or not.",
      "Bringing personal tools or equipment onto site without the employer's prior written approval. s.8 prohibits the use of any item not supplied by the firm, so using your own drill or meter rather than the company-issued one is an offence under the section, because the employer cannot vouch for its safety.",
    ],
    correctAnswer: 2,
    explanation:
      "s.8 is the 'don't tamper with the controls' Section. It catches the most common form of avoidable accident — someone defeating a safety control because the control was inconvenient. Removing a guard, defeating a permit, breaking a lock-off, blocking a fire exit — all s.8 offences. For an apprentice the message is simple: if a control is in your way, you don't remove it; you escalate to the supervisor and have it formally addressed.",
  },
  {
    id: 3,
    question:
      "Under EAWR Reg 3, who exactly owes the duty to comply with the Regulations?",
    options: [
      "Reg 3 places the duty on the employer alone. As the party that designs the system and controls the workplace, only the employer can breach EAWR, and an employee — qualified or apprentice — cannot be prosecuted under the Regulations because the duty never reaches the individual operative.",
      "Reg 3 puts the duty only on the 'duty holder' — the named person in charge of the electrical system, usually the firm's QS or technical director. Everyone else on site, including the electricians actually doing the work, is outside the scope of EAWR and answers only to the duty holder, not to the HSE.",
      "Reg 3 applies the duty exclusively to self-employed electricians. Because they have no employer to carry liability for them, the Regulations reach the individual only when they are working for themselves; employed staff and apprentices are covered through their employer's duty and bear none of their own.",
      "Reg 3 puts the duty on EVERY employer, every self-employed person, and every employee — including apprentices — engaged in any work activity covered by the Regulations. The employee duty is to co-operate with the employer in complying with EAWR, AND to comply themselves with EAWR insofar as the matters relate to things within the employee's control. So an apprentice has a personal EAWR duty, not just an employer-mediated one.",
    ],
    correctAnswer: 3,
    explanation:
      "EAWR Reg 3 is the equivalent of HASAWA s.7 for electrical work — it explicitly places the duty on the employee. So an apprentice doing electrical work owes their own EAWR Reg 14 duty (don't work live without justification), Reg 16 duty (work within their competence) and Reg 4 duty (don't construct or maintain in a way that creates danger). The HSE has prosecuted operatives personally under EAWR Reg 3 + Reg 14 for unauthorised live work.",
  },
  {
    id: 4,
    question:
      "An apprentice is told by a senior operative to do something they think is unsafe. What does the law require them to do?",
    options: [
      "Refuse the unsafe instruction and raise the concern with the supervisor or higher. HASAWA s.7 puts the personal duty on the apprentice — a direct order from a senior is not a defence to a s.7 prosecution. The Employment Rights Act 1996 s.44 also gives the apprentice statutory protection from victimisation for raising H&S concerns. Document the refusal and the reason in writing (text, email, app note) at the time.",
      "Carry out the instruction but ask the senior operative to confirm it in writing first. Once the order is in writing the responsibility transfers to the person who gave it, so the apprentice is protected and can proceed with the task knowing any prosecution would fall on the senior rather than on them.",
      "Carry out the task as instructed — a senior's direct order is a complete defence under HASAWA, because the law recognises that an apprentice must follow the chain of command. Refusing would itself be a breach of the s.7 duty to co-operate with the employer's arrangements, so compliance is the safer course.",
      "Carry on but work more slowly and carefully than usual to reduce the risk. Provided the apprentice takes extra care, the instruction can be followed safely, and slowing down is the reasonable-care response the law expects rather than an outright refusal, which could be seen as failing to co-operate.",
    ],
    correctAnswer: 0,
    explanation:
      "The 'I was just following orders' defence does not exist in UK H&S law. Every individual is responsible for their own acts and omissions under HASAWA s.7. The Employment Rights Act 1996 s.44 (right not to suffer detriment for raising H&S concerns) and s.100 (automatic unfair dismissal for the same reason) backstop the apprentice's right to refuse unsafe work. A contemporaneous written note of the refusal is the best evidence of having discharged the personal duty.",
  },
  {
    id: 5,
    question:
      "What's the penalty range for a serious EAWR breach prosecuted in the Crown Court?",
    options: [
      "A fixed penalty notice of £5,000, the same as the Magistrates' Court can impose, with no power to send anyone to prison. The Crown Court only deals with the size of the fine, which is capped at the statutory maximum, and custodial sentences are not available for H&S offences however serious the harm caused.",
      "Unlimited fine, and / or up to 2 years' imprisonment. The Sentencing Council Definitive Guideline for Health and Safety Offences sets the tariff using a culpability-and-harm matrix — even medium-culpability mid-harm cases against an individual can attract a custodial sentence, particularly where someone has been seriously injured or killed. Companies face fines that scale with turnover; individuals face fines + prison.",
      "A maximum fine of £20,000 and a mandatory ban from the trade for five years. The Crown Court cannot imprison for an EAWR breach but must impose the trade ban automatically on conviction, removing the individual's ECS card and scheme membership for the fixed period regardless of the circumstances.",
      "Costs and compensation only — the Crown Court orders the convicted party to pay the injured person's losses and the HSE's investigation costs, but imposes no fine or prison term of its own. The criminal penalty is left to a separate sentencing hearing in the Magistrates' Court at a later date.",
    ],
    correctAnswer: 1,
    explanation:
      "The Sentencing Council Definitive Guideline (2016, updated since) makes H&S sentencing predictable and severe. The court categorises culpability (very high / high / medium / low) and harm (level A / B / C / D), reads off a starting-point fine, then adjusts for aggravating and mitigating factors. For an individual, a high-culpability category-A-harm case carries a starting point of 18 months' custody. For a company with turnover over £50m, the same case starts at £4m. Knowing the scale focuses the mind.",
  },
  {
    id: 6,
    question:
      "EAWR Reg 16 covers competence. What does it actually require?",
    options: [
      "That every person carrying out electrical work must hold a current NVQ Level 3 and the 18th Edition certificate. Reg 16 sets a fixed paper qualification as the legal definition of competence, so anyone without both certificates is barred from the work regardless of their actual experience or whether they are being supervised.",
      "That every electrical worker must be re-assessed for competence annually by an HSE inspector, who issues a certificate of competence valid for twelve months. Reg 16 creates this yearly external check, and working with an expired certificate is the breach the regulation is concerned with.",
      "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger, unless they possess such knowledge or experience or are under appropriate supervision having regard to the nature of the work. So either you're competent yourself OR you're being supervised by someone who is. Working outside your competence without supervision is a Reg 16 breach.",
      "That competence is judged solely by length of service — an operative becomes legally competent once they have completed four years in the trade, after which Reg 16 permits them to carry out any electrical work unsupervised. Time served, rather than knowledge or supervision, is the test the regulation applies.",
    ],
    correctAnswer: 2,
    explanation:
      "EAWR Reg 16 is the legal hook for the apprenticeship model. An apprentice doesn't yet have full competence — they're acquiring it — so they work under appropriate supervision until they do. The supervisor is competent and is taking responsibility. A senior who lets an apprentice loose on work the apprentice isn't ready for is breaching Reg 16. An apprentice who takes on work outside their competence without supervision is also breaching Reg 16. Both can be prosecuted.",
  },
  {
    id: 7,
    question:
      "What's HASAWA s.37 and when does it become relevant to an electrician's career?",
    options: [
      "The section that allows a company director to take out insurance against H&S fines, capping their personal financial exposure. s.37 becomes relevant the moment you start your own firm, because it lets you buy cover that pays any penalty the company incurs, protecting your personal assets from a prosecution.",
      "The section that requires a firm to appoint a named 'responsible person' for health and safety once it employs five or more staff. s.37 matters when your business grows past that threshold, because you must then nominate a competent person and record them in the company's safety policy.",
      "The section that obliges a director to report the company's accident statistics to Companies House each year. s.37 becomes relevant when you become a director, because failing to file the annual safety return alongside the company accounts is the personal offence the section creates.",
      "Where an offence under HASAWA is committed by a body corporate (a limited company) and is proved to have been committed with the consent or connivance of, or attributable to neglect on the part of, a director, manager, secretary or similar officer, that individual ALSO commits the offence and is liable to personal prosecution. Relevant once you become Approved Electrician, then a senior, then potentially a director — your personal liability scales with your role.",
    ],
    correctAnswer: 3,
    explanation:
      "s.37 is the 'directors can be personally prosecuted' Section. As you progress from apprentice to Approved Electrician to supervisor to senior to director, your personal exposure under s.37 grows. The most serious electrical-trade prosecutions in the last decade have used s.37 to name the company director alongside the company itself — and where the director was found to have consented to, connived in, or neglected the underlying breach, they've faced personal fines and (in the worst cases) custodial sentences. Knowing s.37 exists is what makes a director sign off the H&S system seriously rather than rubber-stamp it.",
  },
  {
    id: 8,
    question:
      "An apprentice has been told to work on a live distribution board because 'we can't take the building off and the customer is impatient'. What does the law actually require?",
    options: [
      "Stop. EAWR Reg 14 makes live work the exception, requiring three conditions to be met simultaneously — unreasonable to make dead, reasonable to do live, suitable precautions in place. Customer impatience is not a Reg 14 condition. The supervisor needs to (a) re-examine whether isolation is truly impossible, (b) if it genuinely is, document a Reg 14 justification with permit-to-work, and (c) ensure the work is done by a competent person, not an apprentice working alone. The apprentice should refuse the instruction in writing and escalate. HASAWA s.7 + ERA 1996 s.44 protect the refusal.",
      "Proceed, because the customer's operational need overrides EAWR in commercial premises. Reg 14 contains an exception for business continuity — where taking the supply off would disrupt a trading customer, live work is automatically permitted, and the apprentice is expected to carry it out to keep the client's business running.",
      "Proceed, provided the apprentice wears insulating gloves and stands on a rubber mat. Once basic live-working PPE is in place, the three Reg 14 conditions are treated as satisfied, and the work becomes lawful regardless of whether isolation was actually possible — the PPE is what legalises the task.",
      "Proceed under the supervisor's authority, because the instruction shifts all responsibility onto the supervisor. When a senior tells an apprentice to work live, the supervisor becomes the duty holder for that task, so the apprentice carries no personal liability and can carry out the work without needing a permit.",
    ],
    correctAnswer: 0,
    explanation:
      "Customer pressure is the most common driver for unjustified live work. The EAWR Reg 14 test is objective — does it pass all three conditions? — and customer impatience does not factor in. The fact the apprentice is being told to do it personally is also a Reg 16 problem (competence + supervision). The apprentice's correct response is refuse + escalate + document. After an incident the documented refusal is the apprentice's evidence of having discharged HASAWA s.7. The supervisor and the firm carry the prosecution exposure for issuing the instruction.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Can I really be prosecuted personally as an apprentice, or is that just to scare us?",
    answer:
      "It's real. HSE prosecutions of individual operatives — including trainees and apprentices — happen every year. The most common pattern is an apprentice or junior who carried out work outside their competence without supervision, defeated a safety control, or carried out unsafe work after being told the risk. The fines tend to be lower than for the company, but custodial sentences for individuals do occur in the most serious cases (especially after a fatality). The Sentencing Council Definitive Guideline for H&S Offences explicitly contemplates individual offenders. 'I'm just an apprentice' is not a defence in court.",
  },
  {
    question: "What if my supervisor tells me to do something I think is unsafe?",
    answer:
      "Refuse and escalate. HASAWA s.7 puts the personal duty on you — a direct order from a senior is not a defence. The Employment Rights Act 1996 s.44 protects you from being penalised (suspended, demoted, sacked) for raising a genuine H&S concern. The practical move: refuse politely, explain why (cite the regulation if you can), and put the refusal in writing — even a short text or email at the time. That contemporaneous note is your evidence later. If the supervisor overrules you, escalate to the H&S manager / a more senior person / the firm's H&S contact. If after all that the firm is still telling you to do it, contact your apprenticeship provider or the HSE directly. Whistleblowing protection (Public Interest Disclosure Act 1998) covers reports of H&S risk.",
  },
  {
    question: "What does 'so far as is reasonably practicable' (SFAIRP) actually mean?",
    answer:
      "SFAIRP is the test used in HASAWA s.2, s.3 and many other H&S duties. It means the cost (in time, money, effort) of further precautions has to be weighed against the risk those precautions would prevent. The duty-holder doesn't have to eliminate every theoretical risk regardless of cost — but the burden of proving that a further precaution wasn't reasonably practicable sits ON THE DUTY-HOLDER, not on the prosecution. So 'we couldn't afford to do it' isn't enough — you have to show you considered the precaution, weighed it against the risk, and made a defensible decision. In court, the absence of any documented consideration is treated as evidence the duty wasn't met.",
  },
  {
    question: "If the firm gets prosecuted, am I automatically off the hook?",
    answer:
      "No. The HSE can charge the firm, the directors (under s.37) and the individual operative (under s.7 / EAWR Reg 3) all in the same case. Charges aren't either / or — they're cumulative. The firm faces s.2 / s.3 / specific Regulation charges; the directors face s.37 if they consented or were complicit; the operative faces s.7 / EAWR Reg 3. In practice the HSE focuses prosecution resources on the most culpable party, but where the operative's behaviour was the proximate cause (defeated a control, ignored an instruction, did unsafe work) the operative faces personal exposure regardless of what the firm did or didn't do.",
  },
  {
    question: "What's the difference between an Improvement Notice and a Prohibition Notice?",
    answer:
      "Both are statutory notices under HASAWA, both issued by an HSE inspector or a local-authority enforcement officer. An Improvement Notice (HASAWA s.21) tells the duty-holder they have breached a Regulation and gives them a period (minimum 21 days) to put it right. A Prohibition Notice (HASAWA s.22) goes further — it tells the duty-holder to stop a specific activity immediately because it carries a risk of serious personal injury. Failure to comply with either is itself a separate criminal offence. Both notices appear on the public HSE Notices database — and on tender questionnaires for years afterwards.",
  },
  {
    question: "Do all of these laws apply on a domestic job, or only on commercial sites?",
    answer:
      "Most of them apply on both. HASAWA, EAWR, MHSWR, RIDDOR, COSHH, Manual Handling, PPE at Work, WAHR — all apply wherever electrical work is being carried out for an employer (or by a self-employed person), including in a customer's home. CDM 2015 also applies to domestic work, with the client's CDM duties typically passed to the contractor. The Building Regulations Approved Document P applies specifically to dwellings in England (Wales has equivalents; Scotland has its own system). The 'it's only a domestic' mindset is a leading cause of cutting corners — and a leading cause of HSE prosecutions of small electrical firms.",
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 2"
            title="HASAWA & EAWR — your duties"
            description="The personal-duty layer. HASAWA s.7, s.8 and s.37, and EAWR Reg 3, Reg 14 and Reg 16 — what they actually require of you on Monday morning, and what happens if you breach them."
            tone="emerald"
          />

          <TLDR
            points={[
              "Supplementary content — extends LO2 of Unit 210 but is not directly mapped to a 210 AC. Builds the personal-duty layer on top of AC 2.1 (Sub 1).",
              "HASAWA s.7 puts a personal criminal duty on every employee, including the apprentice — take reasonable care, AND co-operate with the employer's arrangements. EAWR Reg 3 does the same for electrical work specifically.",
              "EAWR Reg 14 prohibits live work unless three conditions are ALL met. Reg 16 requires competence (or appropriate supervision). 'Following orders' is not a defence to either.",
              "Penalty range: Magistrates' Court up to £20K and / or 6 months prison per offence; Crown Court unlimited fine and / or 2 years prison. The Sentencing Council Definitive Guideline 2016 is the tariff document.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain the personal duty on an employee under HASAWA s.7 — both the 'reasonable care' limb and the 'co-operate with the employer' limb — and why the apprentice is personally bound.",
              "Recognise the prohibition under HASAWA s.8 against intentionally or recklessly interfering with or misusing anything provided in the interests of H&S.",
              "Identify HASAWA s.37 and how it makes directors personally liable when company offences are committed with their consent, connivance or neglect.",
              "State the EAWR Reg 3 personal duty on every employee engaged in electrical work to comply with the Regulations.",
              "Explain the three EAWR Reg 14 conditions for lawful live work — unreasonable to make dead, reasonable to do live, suitable precautions taken — and why all three must be met.",
              "Recognise the EAWR Reg 16 competence requirement and how 'appropriate supervision' fits the apprenticeship model.",
              "State the realistic penalty range for HASAWA / EAWR breaches in the Magistrates' Court and the Crown Court, and the role of the Sentencing Council Definitive Guideline.",
              "Apply the right-to-refuse-unsafe-work principle (HASAWA s.7 + Employment Rights Act 1996 s.44) when given an unsafe instruction by a supervisor.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why the personal-duty layer matters</ContentEyebrow>

          <ConceptBlock
            title="The legislation doesn't only bind 'the firm' — it binds you, individually"
            plainEnglish="A common misunderstanding at Level 2 is that H&S law applies to the company, and the apprentice is just an employee following instructions. That's not how the law works. HASAWA s.7 and EAWR Reg 3 explicitly place a personal criminal duty on every employee, including apprentices and trainees. The HSE can and does prosecute individual operatives — and 'I was told to' is not a defence."
            onSite="The practical effect is that you, personally, have to make safety decisions. If you're told to do something unsafe, the duty to refuse sits on you. If you carry out work outside your competence without supervision, the duty to escalate sits on you. If you defeat a control because it's inconvenient, the criminal liability for that sits on you. The firm has its own (much larger) duties, but yours don't disappear just because the firm has theirs."
          >
            <p>
              The five legal hooks that land directly on the individual:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HASAWA s.7(a)</strong> — take reasonable care for the H&amp;S of yourself
                and of anyone affected by your acts or omissions at work.
              </li>
              <li>
                <strong>HASAWA s.7(b)</strong> — co-operate with the employer (and other duty-
                holders) so far as is necessary to enable their duties to be performed.
              </li>
              <li>
                <strong>HASAWA s.8</strong> — don&apos;t intentionally or recklessly interfere
                with or misuse anything provided in the interests of H&amp;S (guards,
                interlocks, barriers, lock-offs, RCDs, smoke detectors, signs).
              </li>
              <li>
                <strong>EAWR Reg 3</strong> — every employee engaged in electrical work has a
                personal duty to comply with EAWR insofar as it relates to matters within their
                control.
              </li>
              <li>
                <strong>EAWR Reg 16</strong> — no person shall be engaged in work where technical
                knowledge or experience is needed to prevent danger, unless they have it OR they
                are under appropriate supervision.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.7"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work — (a) to take
                reasonable care for the health and safety of himself and of other persons who may
                be affected by his acts or omissions at work; and (b) as regards any duty or
                requirement imposed on his employer or any other person by or under any of the
                relevant statutory provisions, to co-operate with him so far as is necessary to
                enable that duty or requirement to be performed or complied with.&quot;
              </>
            }
            meaning={
              <>
                s.7 is the personal hook for every worker, including apprentices and trainees.
                Limb (a) covers active care (don&apos;t do unsafe things) and passive care
                (don&apos;t ignore unsafe things you could address). Limb (b) covers
                co-operation — attending toolbox talks, following RAMS, wearing PPE, signing in,
                working within permits. Both limbs are personal criminal duties. The HSE has
                successfully prosecuted individual operatives under s.7 for ignoring safety
                instructions, defeating controls and carrying out work they knew was unsafe.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>The HASAWA personal sections — s.7, s.8, s.37</ContentEyebrow>

          <ConceptBlock
            title="HASAWA s.7 — take reasonable care AND co-operate"
            plainEnglish="s.7 has two limbs. Limb (a) is the active duty to take reasonable care for yourself and others. Limb (b) is the co-operate duty — to work with the employer's safety arrangements. Both limbs are personal criminal offences."
            onSite="The 'reasonable care' duty is judged objectively against what a reasonably competent person in your role and at your stage of training would have done. So an apprentice in year one isn't held to the same standard as an Approved Electrician — but they ARE held to the standard of a reasonable apprentice in year one, which includes asking for supervision when uncertain and refusing instructions that are obviously unsafe."
          >
            <p>
              What &apos;reasonable care&apos; looks like in practice for an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Working within your trained competence — don&apos;t take on tasks you haven&apos;t
                been shown how to do safely.
              </li>
              <li>
                Asking for supervision when uncertain — Reg 16 makes &apos;under appropriate
                supervision&apos; the alternative to personal competence.
              </li>
              <li>
                Following the safe-isolation procedure every time, on every job, regardless of
                size — no shortcuts because &quot;it&apos;s just a quick one&quot;.
              </li>
              <li>
                Wearing and maintaining the PPE provided — including the boring stuff (safety
                glasses for chasing, FFP3 for masonry dust, gloves for sharp materials).
              </li>
              <li>
                Reporting defects — broken lock-offs, damaged leads, missing signs, expired
                first-aid kit. Reporting is part of co-operating; ignoring is part of breaching.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HASAWA s.8 — don't tamper with the safety controls"
            plainEnglish="s.8 prohibits anyone (employee or not) from intentionally or recklessly interfering with or misusing anything provided in the interests of H&S. It's a one-line section with a wide reach."
            onSite="The classic s.8 breaches are removing a guard from a portable tool, defeating an interlock to keep working, taping over an RCD that keeps tripping, blocking a fire exit because a delivery is in the way, or pulling out a lock-off because someone left it on by mistake. All of those are personal criminal offences. The fact that 'I was going to put it back' is not a defence."
          >
            <p>
              Examples of s.8 breaches an apprentice should never commit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Removing a guard from a circular saw, grinder or chasing machine because it gets
                in the way.
              </li>
              <li>
                Cutting or taping over an RCD that keeps tripping instead of finding the fault.
              </li>
              <li>
                Pulling someone else&apos;s lock-off without permission because you &quot;need to
                get the supply back on quickly&quot;.
              </li>
              <li>
                Defeating a permit-to-work — extending the work beyond what the permit
                authorises, or ignoring the time window.
              </li>
              <li>
                Disabling a smoke detector because the glue you&apos;re using sets it off — the
                correct response is ventilate, not disable.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HASAWA s.37 — directors personally on the hook"
            plainEnglish="s.37 says that where a HASAWA offence is committed by a company AND it's proved to have been committed with the consent or connivance of, or attributable to neglect on the part of, a director / manager / secretary of the company, that individual ALSO commits the offence. It's the legal mechanism that makes directors personally liable on top of the company itself."
            onSite="s.37 doesn't apply to a Level 2 apprentice today — but it will apply to you in the future. As you progress to Approved Electrician, then potentially to supervisor, then maybe to director or business owner, your personal exposure under s.37 grows. The serious electrical-trade prosecutions in the last decade have routinely named the director alongside the company. Knowing s.37 exists is what makes a director sign off the H&S system seriously rather than rubber-stamp it."
          >
            <p>
              When s.37 bites:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Consent</strong> — the director knew about the breach and agreed to it.
              </li>
              <li>
                <strong>Connivance</strong> — the director knew about the breach and turned a
                blind eye.
              </li>
              <li>
                <strong>Neglect</strong> — the director failed to take steps a reasonable
                director should have taken (e.g. failure to oversee H&amp;S, failure to act on
                a reported risk, failure to provide training).
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

          <ContentEyebrow>The EAWR personal duties — Reg 3, Reg 14, Reg 16</ContentEyebrow>

          <ConceptBlock
            title="EAWR Reg 3 — the duty extends to every employee"
            plainEnglish="EAWR Reg 3 puts the duty to comply with the Regulations on every employer, every self-employed person, AND every employee — including apprentices — engaged in any work activity covered by the Regulations. The employee duty is to co-operate with the employer in complying with EAWR, AND to comply themselves with EAWR insofar as the matters are within the employee's control."
            onSite="Reg 3 is the legal hook for personal prosecution under EAWR. So if an apprentice carries out unsafe live work, they can be prosecuted personally under EAWR Reg 3 + Reg 14, in addition to (not instead of) any HASAWA s.7 charge. The two don't cancel each other out — they stack."
          >
            <p>
              Practical Reg 3 implications for an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                You have a personal duty under EAWR — not just a duty mediated through your
                employer.
              </li>
              <li>
                You have to actively co-operate with the employer&apos;s compliance arrangements
                (e.g. the safe-isolation procedure, the lock-off / tag-out system, the
                permit-to-work scheme).
              </li>
              <li>
                You have to comply with EAWR yourself for matters within your control —
                isolating before working, testing dead, not working live without justification,
                working within your competence.
              </li>
              <li>
                The HSE can prosecute you personally for an EAWR breach — alongside the firm,
                not instead of it.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EAWR Reg 14 — the live-work prohibition"
            plainEnglish="Reg 14 says no person shall work on or near a live conductor unless three conditions are all met. (a) it is unreasonable in all the circumstances for the conductor to be dead. AND (b) it is reasonable in all the circumstances for the person to be at work on or near it while it is live. AND (c) suitable precautions (including, where appropriate, the provision of suitable protective equipment) are taken to prevent injury."
            onSite="The Reg 14 test is conjunctive — all three required. The 'unreasonable to make dead' limb is the killer in installation work: in almost every case it IS reasonably practicable to isolate, so the live-work justification fails at step one. Genuinely unavoidable live work (e.g. fault diagnosis on a system that can't be safely de-energised, voltage indication on a presumed-dead conductor) is the exception."
          >
            <p>
              The standard mechanism for proving the three conditions are met is a permit-to-work,
              issued by a competent senior person before the work starts and signed off at
              completion. As an apprentice you would not be authorised to do live work alone —
              you&apos;d be working under a permit issued to a senior, who carries the legal
              responsibility for the Reg 14 justification.
            </p>
            <p>
              Things that are NOT live work under Reg 14:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Voltage indication on a presumed-dead conductor with a GS38-compliant voltage
                indicator (this is the test that proves dead — you have to do it for it to be
                safe).
              </li>
              <li>
                Approaching a known live system to operate a switch or isolator from outside the
                live envelope (the operating handle is typically outside the danger zone).
              </li>
              <li>
                Reading meters and indicators on the front of an enclosure that hasn&apos;t been
                opened.
              </li>
            </ul>
            <p>
              Things that ARE live work and need a Reg 14 justification:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Any work inside the live envelope of energised equipment.
              </li>
              <li>
                Fault-finding on a powered-up board with the cover off.
              </li>
              <li>
                Live testing for current, voltage or earth fault loop impedance with the
                installation energised (the live elements of an EICR / commissioning sequence).
              </li>
              <li>
                Anything that brings exposed conductive parts to within unsafe reach of an
                operative or their tools.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 (SI 1989/635) — Reg 14"
            clause={
              <>
                &quot;No person shall be engaged in any work activity on or so near any live
                conductor (other than one suitably covered with insulating material so as to
                prevent danger) that danger may arise unless — (a) it is unreasonable in all the
                circumstances for it to be dead; and (b) it is reasonable in all the circumstances
                for him to be at work on or near it while it is live; and (c) suitable precautions
                (including where necessary the provision of suitable protective equipment) are
                taken to prevent injury.&quot;
              </>
            }
            meaning={
              <>
                The three conditions are conjunctive — every one of (a), (b) and (c) has to be
                met. In practice (a) — &apos;unreasonable for it to be dead&apos; — is what
                fails most live-work justifications: in installation work it is almost always
                reasonably practicable to isolate. The standard mechanism for proving compliance
                with Reg 14 is a permit-to-work. As an apprentice you would not be the issuer or
                holder of a Reg 14 permit; you would be working under one issued to a competent
                senior. Unauthorised live work — even a single screw on a live terminal — is a
                criminal offence under Reg 14, prosecutable against the firm AND the individual.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14 — verbatim from legislation.gov.uk."
          />

          <ConceptBlock
            title="EAWR Reg 16 — competence (or appropriate supervision)"
            plainEnglish="Reg 16 says no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger, unless they possess such knowledge or experience or are under appropriate supervision having regard to the nature of the work."
            onSite="Reg 16 is the legal architecture of the apprenticeship model. An apprentice doesn't yet have full competence — they're acquiring it — so the law requires either (i) competence in the operative or (ii) appropriate supervision by someone competent. The supervisor is taking legal responsibility for the work being safe. Letting an apprentice loose on work the apprentice isn't ready for, without appropriate supervision, is a Reg 16 breach by the supervisor and by the firm."
          >
            <p>
              What &apos;appropriate supervision&apos; means in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The supervisor is competent in the work being supervised.
              </li>
              <li>
                The level of supervision is matched to the task and the apprentice&apos;s stage —
                year-one apprentice on first-fix containment work needs much more direct
                oversight than a year-three apprentice on a familiar task.
              </li>
              <li>
                The supervisor is close enough (physically and in attention) to intervene before
                an error becomes an incident — not three rooms away or two floors down.
              </li>
              <li>
                The supervisor checks the work before it&apos;s energised, and signs off
                certificates as the qualified person.
              </li>
              <li>
                If supervision can&apos;t be provided, the work has to wait — &quot;crack on
                without me&quot; on a task you haven&apos;t mastered is a Reg 16 set-up for an
                accident.
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

          <SectionRule />

          <ContentEyebrow>Penalties — what's actually at stake</ContentEyebrow>

          <ConceptBlock
            title="Magistrates' Court vs Crown Court — the two prosecution routes"
            plainEnglish="HASAWA and EAWR offences are 'either-way' offences — they can be tried in the Magistrates' Court (lower penalties, faster) or sent up to the Crown Court (higher penalties, jury trial). The HSE chooses the route based on the seriousness of the case."
            onSite="The Magistrates' Court can impose up to £20,000 (or unlimited for offences committed after 12 March 2015 in some circumstances) and / or 6 months' imprisonment per offence for an individual. The Crown Court can impose unlimited fines and / or up to 2 years' imprisonment per offence. For companies, the fine scales with turnover — large companies have been fined into seven and eight figures."
          >
            <p>
              The Sentencing Council Definitive Guideline for Health and Safety Offences (in
              force since 2016, periodically updated) is the document the courts use. It
              works in five steps:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Categorise the culpability</strong> — Very High, High, Medium, Low.
                Deliberate breaches, repeat offences, ignored warnings = High / Very High.
              </li>
              <li>
                <strong>Categorise the harm</strong> — Level A (death or serious injury), Level
                B (lesser injury or significant risk), Level C (minor injury or low risk), Level
                D (negligible).
              </li>
              <li>
                <strong>Read off the starting-point fine / sentence</strong> from the matrix
                using culpability + harm.
              </li>
              <li>
                <strong>Adjust for size of organisation</strong> (turnover bands for companies),
                aggravating factors (cost-cutting motive, repeat offending) and mitigating
                factors (early co-operation, remediation).
              </li>
              <li>
                <strong>Apply credit for guilty plea</strong> (typically up to 1/3 reduction for
                early plea).
              </li>
            </ol>
            <p>
              Realistic outcomes from recent electrical-trade prosecutions have included
              six-figure fines for medium-sized contractors after near-miss flashovers,
              suspended prison sentences for individual operatives after fatal contact
              incidents, and director disqualifications under the Company Directors
              Disqualification Act 1986 alongside the criminal sentence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — s.33 (offences and penalties, in summary)"
            clause={
              <>
                Per Section 33, breach of HASAWA s.7 is an either-way offence. Summary
                conviction (Magistrates&apos; Court) — fine of up to the statutory maximum (now
                generally unlimited for offences committed after 12 March 2015 under s.85 LASPO
                2012) and / or imprisonment up to 6 months. Conviction on indictment (Crown
                Court) — unlimited fine and / or imprisonment up to 2 years. (Paraphrased
                summary — for the precise current text and applicable maxima see legislation.gov.uk
                s.33 as amended.)
              </>
            }
            meaning={
              <>
                The penalty range for personal HASAWA offences (s.7, s.8 in particular) is
                serious — unlimited fines and prison are both available. For corporate offences
                (s.2, s.3, EAWR Reg 4) fines scale with turnover and have run into seven and
                eight figures in serious cases. The Sentencing Council Definitive Guideline 2016
                made the matrix predictable; the predictability has, on average, pushed sentence
                levels UP not down. As an individual, conviction also typically results in a
                criminal record on the DBS, which can end a career in regulated trades.
              </>
            }
            cite="Source: paraphrased summary of HASAWA 1974 s.33 (as amended by LASPO 2012 s.85). For the current verbatim text consult legislation.gov.uk."
          />

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
            title="Thinking 'the firm gets prosecuted, not me'"
            whatHappens={
              <>
                Apprentice is asked to do a task they haven&apos;t been trained for —
                terminating a 3-phase distribution board live because the supervisor &quot;needs
                to keep the customer&apos;s server running&quot;. Apprentice agrees, reasoning
                that &quot;the firm carries the H&amp;S liability, not me&quot;. The work goes
                wrong, a flashover injures a colleague, and the HSE investigation finds the
                apprentice was outside their competence (EAWR Reg 16 personal breach), carrying
                out unauthorised live work (EAWR Reg 14 personal breach), and acting outside
                reasonable care (HASAWA s.7 personal breach). Charges are laid against the firm,
                the supervisor, the director (under HASAWA s.37), AND the apprentice. The
                apprentice receives a personal fine and a criminal record — career-ending in a
                regulated trade.
              </>
            }
            doInstead={
              <>
                Refuse the instruction. Cite the Reg — &quot;EAWR Reg 14 needs all three
                conditions met before live work is lawful, and Reg 16 means I&apos;d need to be
                competent or supervised, and I&apos;m neither for this task.&quot; Put the
                refusal in writing immediately (text, email, app note) — this becomes your
                evidence later. Escalate to the supervisor&apos;s manager / H&amp;S contact /
                apprenticeship provider as needed. The HASAWA s.7 personal duty is on you;
                discharging it by refusing is what protects you in court.
              </>
            }
          />

          <CommonMistake
            title="Defeating a control because it's slowing the job"
            whatHappens={
              <>
                Apprentice on a CU change finds the customer&apos;s lock-off pad won&apos;t fit
                the breaker because the breaker is an unusual brand. Instead of pausing,
                photographing the issue and asking for a different lock-off, they put a label on
                the breaker saying &quot;DO NOT SWITCH&quot; and crack on. A passing trade
                ignores the label, switches the breaker, and the apprentice receives an electric
                shock from the now-live conductors they&apos;re working on. HSE investigation
                finds defeated isolation under EAWR Reg 13 / 14 and a HASAWA s.8 issue (failure
                to use the safety system as intended). Personal exposure for the apprentice as
                well as the firm.
              </>
            }
            doInstead={
              <>
                Stop work. Get the right lock-off — every electrician&apos;s tool kit should
                include a multi-brand lock-off set. If you genuinely can&apos;t lock off (rare),
                escalate to the supervisor and use the next-best control under the safe-
                isolation hierarchy: pull a cartridge fuse and pocket it; remove a circuit
                breaker entirely if removable; isolate at a higher level (sub-main, distribution
                board, main switch) where you CAN lock off. The label-only approach is not safe
                isolation under any HSE guidance and is a textbook EAWR / HASAWA personal
                breach.
              </>
            }
          />

          <Scenario
            title="Supervisor tells apprentice to test live without a permit"
            situation={
              <>
                You&apos;re on a commercial fit-out, second day in. The supervisor has you
                fault-finding on a single-phase circuit that keeps tripping. The supervisor
                says: &quot;Just leave it energised and meter across the terminals — we
                haven&apos;t got time to take the whole board down.&quot; There&apos;s no
                permit-to-work, no risk assessment for live work, no PPE for live working
                provided, and you haven&apos;t been trained in live testing.
            </>
            }
            whatToDo={
              <>
                Refuse the instruction politely. Say something like: &quot;I&apos;m not
                authorised to do live work on my own under EAWR Reg 14 and Reg 16, and there&apos;s
                no permit-to-work for this. The right move is either (a) you do the live test
                yourself with the right PPE and a documented Reg 14 justification, or (b) we
                isolate the board and I do it dead. I&apos;ll go and prep for whichever you
                decide.&quot; Then text or email yourself a one-line note with the date, time,
                location and what you were asked to do — that&apos;s your contemporaneous
                evidence. If the supervisor escalates the pressure, refuse again and contact
                your firm&apos;s H&amp;S manager or your apprenticeship provider directly.
                HASAWA s.7 puts the personal duty on you; ERA 1996 s.44 protects you from
                detriment for the refusal. The supervisor and the firm carry the real
                prosecution exposure for asking — the apprentice should be the one walking out
                of any later HSE investigation with a clean record.
              </>
            }
            whyItMatters={
              <>
                Live work without a Reg 14 justification is one of the most-prosecuted EAWR
                breaches. Asking an apprentice to do it without a permit, training, supervision
                or PPE is a layered breach (Reg 14, Reg 16, MHSWR Reg 3, HASAWA s.2). The
                apprentice&apos;s correct response — refuse, document, escalate — is also the
                response that the HSE will look for in the investigation. Apprentices who
                comply with this kind of instruction get caught in the prosecution net
                alongside the supervisor and the firm. Apprentices who refuse and document have
                a clean evidential record showing they discharged their personal duty.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "HASAWA s.7 puts a personal criminal duty on every employee, including the apprentice — take reasonable care, AND co-operate with the employer's safety arrangements. 'I was just following orders' is not a defence.",
              "HASAWA s.8 prohibits intentionally or recklessly interfering with or misusing anything provided in the interests of H&S — defeating guards, interlocks, lock-offs, RCDs, signs.",
              "HASAWA s.37 makes directors personally liable when company offences are committed with their consent, connivance or neglect. Your personal exposure scales with your role as your career progresses.",
              "EAWR Reg 3 places a personal duty on every employee engaged in electrical work to comply with the Regulations — alongside the duty on the employer, not instead of it.",
              "EAWR Reg 14 prohibits live work unless three conditions are ALL met — unreasonable to make dead, reasonable to do live, suitable precautions in place. Customer impatience is not a Reg 14 condition.",
              "EAWR Reg 16 requires either competence or appropriate supervision. The apprenticeship model relies on the second branch — work outside your trained competence without supervision is a Reg 16 breach by you AND the firm.",
              "Penalty range is serious — unlimited fines and up to 2 years' prison in the Crown Court for individuals; turnover-scaled fines in the seven and eight figures for companies. The Sentencing Council Definitive Guideline 2016 sets the tariff.",
              "Right to refuse unsafe work is statutory. HASAWA s.7 puts the duty on you; Employment Rights Act 1996 s.44 / s.100 protect you from detriment or unfair dismissal for raising H&S concerns. Document the refusal in writing at the time.",
            ]}
          />

          <Quiz title="HASAWA & EAWR personal duties — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Statutory legislation and guidance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 HSE vs Local Authority enforcement
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
