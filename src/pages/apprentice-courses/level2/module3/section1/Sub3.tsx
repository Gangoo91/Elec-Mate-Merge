/**
 * Module 3 · Section 1 · Subsection 3 — HASAWA 1974 deep dive
 * Maps to City & Guilds 2365-02 / Unit 203 / LO1 / AC 1.1, 1.3
 *   AC 1.1 — "Identify statutory regulations"
 *   AC 1.3 — "State implications of statutory regulations"
 *
 * Frame: the parent Act every UK trade works under. Goes deeper than Sub1's
 * overview — opens the actual sections (s.2, s.3, s.6, s.7, s.37) and walks
 * through enforcement (HSE inspectors, improvement / prohibition notices,
 * prosecution venues) and Sentencing Council Definitive Guideline (2016).
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
  'HASAWA 1974 deep dive — sections 2, 3, 6, 7, 37 (1.1, 1.3) | Level 2 Module 3.1.3 | Elec-Mate';
const DESCRIPTION =
  'A focused walk through the Health and Safety at Work etc Act 1974 — what sections 2, 3, 6, 7 and 37 actually require of the employer, the designer/supplier, the individual and the company director, plus enforcement reality and the Sentencing Council Definitive Guideline (2016).';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod3-s1-sub3-s7-personal',
    question:
      "You're an apprentice on a fit-out. Your supervisor tells you to remove an MCB lock-off because the customer needs the circuit re-energised for a demonstration, even though the temporary lighting is still on a tail dropping into a wet floor area. You do as you're told and someone gets a shock. Under HASAWA, where does YOUR personal liability sit?",
    options: [
      "Nowhere — you acted on a direct instruction from your supervisor, so the legal duty for the unsafe re-energisation transfers entirely to them under HASAWA s.2, and an apprentice carries no personal liability for following orders.",
      "HASAWA s.7 — every employee has a personal duty to take reasonable care and co-operate with safety arrangements, and following an unsafe instruction does not discharge it.",
      "Only under HASAWA s.3 — because the person who got the shock was a member of the public rather than a colleague, your liability is limited to the duty owed to non-employees, not a personal employee duty.",
      "Nowhere under HASAWA — the breach is purely an EAWR Reg 14 matter for the firm, so as an apprentice you have no separate personal duty under the parent Act for this incident.",
    ],
    correctIndex: 1,
    explanation:
      "HASAWA s.7 binds you personally regardless of whether you were told to do something. The defence 'I was just following orders' has been roundly rejected since the post-war prosecutions and is no defence in a UK criminal court today. You can be charged under s.7 and your supervisor can be charged under s.2 — the same incident, two separate prosecutions, both can stick.",
  },
  {
    id: 'mod3-s1-sub3-s3-public',
    question:
      "You're working on a domestic CU change. The customer's neighbour pops round to borrow a screwdriver and walks past the open consumer unit while you're at the van. Which HASAWA section gives them legal protection from your work, even though they're nothing to do with your firm?",
    options: [
      "HASAWA s.3 — the duty of every employer and self-employed person towards persons NOT in their employment who may be affected by the work. Visitors, neighbours and the public are all caught.",
      "HASAWA s.2 — the employer's general duty to ensure the health, safety and welfare of employees, which is taken to extend to anyone present on the work site including visitors.",
      "HASAWA s.7 — the personal duty on every individual at work, which the neighbour relies on because the electrician must take reasonable care for anyone who enters the property.",
      "HASAWA s.6 — the duty on suppliers of articles for use at work, which protects the neighbour because the open consumer unit counts as an article supplied for use in the dwelling.",
    ],
    correctIndex: 0,
    explanation:
      "s.3 is the everyday-domestic duty for an electrician. Customers, family members, neighbours, the postman walking past your scaffold — anyone affected by your undertaking is owed a s.3 duty. In practice that means a barrier across the open CU, warning notice, removing keys from the lock-off when you walk away. The HSE prosecutes s.3 breaches a lot more often than apprentices realise.",
  },
  {
    id: 'mod3-s1-sub3-improvement',
    question:
      "An HSE inspector visits a fit-out where you're working. He decides the temporary distribution board has insufficient RCD protection. He doesn't think the risk is imminent but it needs fixing. Which formal notice is he most likely to issue?",
    options: [
      "An improvement notice under s.21 — requiring the breach to be remedied within a stated period, with work allowed to continue in the meantime.",
      "A prohibition notice under s.22 — stopping the activity immediately because the insufficient RCD protection creates a risk of serious personal injury.",
      "An enforcement notice — issued under s.33 of HASAWA, formally charging the firm with the breach and requiring it to appear before the magistrates' court to answer the offence.",
      "A remedial notice — issued under s.20 of HASAWA, giving the inspector power to dismantle the distribution board on the spot and bill the firm for the corrective work.",
    ],
    correctIndex: 0,
    explanation:
      "Improvement notices (s.21) are used when there's a breach but no immediate danger. Prohibition notices (s.22) stop work immediately and are used when there IS immediate danger. Both can be appealed to an Employment Tribunal within 21 days, but failure to comply by the deadline is itself a criminal offence prosecuted in the magistrates' court (or Crown Court on indictment).",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "HASAWA s.2(2)(a) requires the employer to provide and maintain 'plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health'. For an electrical contractor, what does 'systems of work' practically include?",
    options: [
      "Only the physical tools and equipment the firm provides — the hand tools, the test instruments, the vans and the access kit — since 'systems of work' refers to the plant itself rather than any paperwork around it.",
      "The whole organisational system that produces safe outcomes — RAMS, the safe-isolation procedure, toolbox talks, supervisor sign-off and instrument calibration — not just the kit itself.",
      "The wiring system itself — the cables, containment and protective devices — because BS 7671 defines an electrical 'system' and that is what s.2(2)(a) is referring to when it says systems of work.",
      "The contractual chain of who instructs whom on site — the order in which the client, principal contractor and sub-contractors issue work — since 'systems of work' describes the management structure rather than the safety procedures.",
    ],
    correctAnswer: 1,
    explanation:
      "'Systems of work' is one of the most heavily litigated phrases in HASAWA. It means the organisational arrangements that surround the actual physical work — RAMS, training records, supervision, isolation procedures, test schedules. An employer who hands an apprentice an MFT and says 'crack on' without those systems in place breaches s.2(2)(a) regardless of whether the apprentice happens to do the job correctly.",
  },
  {
    id: 2,
    question:
      "HASAWA s.6 places duties on designers, manufacturers, importers and suppliers of articles for use at work. When does an electrician trigger s.6?",
    options: [
      "Whenever they install standard accessories bought from a wholesaler — fitting a socket-outlet or a light switch supplied by a manufacturer makes the electrician a supplier of that article under s.6 for the rest of its life in the installation.",
      "Whenever they carry out an EICR on an existing installation — by inspecting and reporting on the equipment the electrician adopts the s.6 designer duty for everything they have assessed and signed off.",
      "Whenever they design, supply or commission an article for use at work — such as a one-off control panel or bespoke board — they must ensure it is safe and supply adequate information about safe use.",
      "Whenever they work on a domestic dwelling — because a home becomes a workplace while the electrician is in it, s.6 is triggered for every domestic job regardless of what is being installed.",
    ],
    correctAnswer: 2,
    explanation:
      "s.6 catches anyone who 'designs, manufactures, imports or supplies any article for use at work'. A contractor who designs and builds a custom control panel is acting as a designer AND supplier under s.6 and owes the duty to ensure the panel is safe in use AND to supply the install/maintenance information needed for it to stay safe. This is why a proper handover pack matters — it's part of s.6 compliance.",
  },
  {
    id: 3,
    question:
      "HASAWA s.37 — 'where an offence under any of the relevant statutory provisions committed by a body corporate is proved to have been committed with the consent or connivance of, or to have been attributable to any neglect on the part of, any director, manager, secretary or other similar officer of the body corporate' — what does this make legally possible?",
    options: [
      "Automatic dissolution of the company — once a director is shown to have consented to or neglected a breach, the company is struck off the register and barred from trading, transferring all its liabilities to the individual.",
      "A defence for the company — if the breach can be pinned on a named director's personal neglect, the body corporate itself escapes prosecution because liability has been attributed to the individual instead.",
      "A civil claim against the director — s.37 allows the injured party to sue the director personally for damages in the county court, separately from any action against the company.",
      "Personal prosecution of the named director or officer alongside the company — same conviction and fines, with up to two years' custody on indictment. It pierces the corporate veil.",
    ],
    correctAnswer: 3,
    explanation:
      "s.37 puts personal criminal liability on directors and senior managers when a company breach was committed with their consent, connivance OR neglect. 'Neglect' is the wide door — failure to put proper systems in place is enough. Directors of small electrical contracting firms have been personally fined six-figure sums and given suspended custodial sentences after fatalities on their sites.",
  },
  {
    id: 4,
    question:
      "Which phrase qualifies most HASAWA duties and what does it mean in practice?",
    options: [
      "'So far as is reasonably practicable' (SFAIRP) — the duty-holder weighs the risk against the cost, time and effort of further precautions, judged by what a competent person would have done.",
      "'So far as is technically possible' — the duty-holder must apply every control that current technology allows, regardless of cost, so a precaution can never be ruled out on the grounds that it is expensive or disproportionate.",
      "'So far as is commercially reasonable' — the duty-holder balances the cost of a precaution against the profit margin on the job, so a control that would make the work unprofitable need not be applied.",
      "'Absolute duty' — the duty-holder must guarantee that no harm occurs whatever the circumstances, with no balancing test, so any injury is automatically a breach regardless of the precautions taken.",
    ],
    correctAnswer: 0,
    explanation:
      "SFAIRP is the test the HSE and the courts apply. After an incident the inspector starts by asking 'what could you reasonably have done that you didn't?'. Cost is in the equation but is rarely a winning defence — a 30 mA RCD is cheap; not fitting one because the customer didn't ask for it has never won an SFAIRP argument in court.",
  },
  {
    id: 5,
    question:
      "Following the Health and Safety (Offences) Act 2008 and subsequent updates, what is the maximum sentence for an individual convicted on indictment of a serious HASAWA breach (e.g. s.7 or s.37)?",
    options: [
      "A fixed fine of £20,000 with no power of imprisonment, since individual H&S offences are treated as regulatory penalties rather than offences that can attract a custodial sentence.",
      "Unlimited fine and/or up to 2 years' imprisonment, with the sentencing bands set by the Sentencing Council Definitive Guideline (2016). Custodial sentences for individuals are real.",
      "Up to 6 months' imprisonment and a £5,000 fine — the magistrates' court limits apply even on indictment, because serious H&S breaches cannot be sent to the Crown Court.",
      "An unlimited fine only, with imprisonment reserved exclusively for corporate manslaughter, so an individual convicted of a HASAWA breach can never receive a custodial sentence.",
    ],
    correctAnswer: 1,
    explanation:
      "The 2008 Offences Act lifted the magistrates' court ceiling and made imprisonment available for many H&S offences. The 2016 Sentencing Council Definitive Guideline then formalised how the courts pitch the sentence — culpability (low / medium / high / very high) and harm (Category 1 to 4) plug into a starting-point matrix. Headline-grabbing fines into seven figures for companies and 18-month custodial sentences for directors are now the norm after a fatality.",
  },
  {
    id: 6,
    question:
      "An HSE inspector arrives unannounced on your site. What powers does HASAWA give them under sections 20 and 21?",
    options: [
      "Limited powers only — the inspector must give 24 hours' written notice before entering, can look but not photograph, and may only request documents through a formal court order rather than on the spot.",
      "Power to enter and observe but nothing more — an inspector may walk the site and note concerns, but has no authority to take samples, interview workers or stop work without first obtaining a magistrate's warrant.",
      "Wide statutory powers under s.20 — enter without notice, photograph, sample, question anyone, demand documents and seize articles — plus s.21/s.22 notices on the spot. Obstruction is a s.33 offence.",
      "Power to arrest and detain — an HSE inspector has the same powers as a police constable, including the power to caution and arrest any worker found in breach and hold them pending charge.",
    ],
    correctAnswer: 2,
    explanation:
      "s.20 inspectors are some of the most heavily-empowered enforcement officials in UK law. They can enter without notice, photograph, sample, interview under caution, demand documents, and dismantle plant. s.33 makes obstructing them a separate criminal offence. The practical implication: if the inspector knocks, you co-operate, you don't volunteer admissions, and you call your scheme provider's helpline for advice.",
  },
  {
    id: 7,
    question:
      "BS 7671 is referenced in HSR25 (the HSE's Memorandum of Guidance on EAWR) as a means of demonstrating compliance with EAWR Reg 4. Through that chain, what does following BS 7671 also help demonstrate under HASAWA?",
    options: [
      "Compliance with HASAWA s.6 — the duty on suppliers of articles, because following BS 7671 proves that every accessory installed was supplied safe and fit for use.",
      "Compliance with HASAWA s.37 — director liability, because a firm that works to BS 7671 shows its directors have not consented to or neglected any breach.",
      "Compliance with HASAWA s.7 only — the personal duty on the individual operative, because BS 7671 is followed by the person doing the work rather than the employer.",
      "Compliance with HASAWA s.2(2)(a) — 'safe systems of work'. Because EAWR is made under HASAWA, BS 7671 compliance also helps discharge the underlying s.2 / s.3 duties for the electrical work.",
    ],
    correctAnswer: 3,
    explanation:
      "The chain runs HASAWA → EAWR → BS 7671. EAWR is a statutory instrument made under HASAWA's enabling powers (s.15). HSR25 lists BS 7671 as a deemed-to-comply route for EAWR. So evidence that the install was done to BS 7671 is evidence the EAWR duty was met, which is in turn evidence the underlying HASAWA s.2(2)(a) safe-system duty was met. One technical document, three layers of statutory cover.",
  },
  {
    id: 8,
    question:
      "Under the Sentencing Council Definitive Guideline (2016), what are the four 'culpability' categories the court uses for an organisation convicted of a HASAWA / EAWR breach?",
    options: [
      "Very high, high, medium, low — with starting-point fines that scale with the culpability finding, the harm category (1–4) and the organisation's annual turnover band.",
      "Deliberate, reckless, negligent, accidental — the four states of mind borrowed from general criminal law, with accidental breaches attracting no fine because there was no intent to cause harm.",
      "Minor, serious, major, fatal — categories based purely on the actual injury that occurred, so a breach that happened to cause no injury falls outside the guideline altogether.",
      "Category 1 to Category 4 only — the guideline uses a single harm scale with no separate culpability assessment, so the fine is set entirely by how serious the harm risked was.",
    ],
    correctAnswer: 0,
    explanation:
      "The Definitive Guideline matrix is the standard playbook for any H&S sentencing now. Knowing the four culpability bands and the four harm categories is enough — the actual numbers move every few years but the framework is stable. The takeaway for an apprentice: 'culpability' goes up the more obvious and avoidable the breach was, and the firm's turnover scales the fine, so the same fact-pattern produces wildly different fines depending on whose turnover is in the dock.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "If HASAWA is from 1974, isn't it out of date?",
    answer:
      "No — it's the parent Act that everything else is made under. The body of HASAWA hasn't been substantially repealed. The way it's enforced has changed (penalties have been raised by later Acts, the Sentencing Council guideline arrived in 2016, and dozens of regulations including EAWR have been made under it), but the original sections 2, 3, 6, 7 and 37 still read the same and are still the legal hook for almost every electrical-installer prosecution in the UK.",
  },
  {
    question: "Who can prosecute under HASAWA — only the HSE?",
    answer:
      "No. The HSE prosecutes higher-risk workplaces (factories, construction, utilities). Local Authority Environmental Health teams prosecute lower-risk premises (offices, shops, leisure). The Office of Rail and Road handles railway-related work. The Crown Office and Procurator Fiscal Service prosecutes in Scotland. All of them rely on the same statutory provisions — the prosecuting body changes, the law doesn't.",
  },
  {
    question: "Can my employer make me sign something that waives HASAWA?",
    answer:
      "No. HASAWA duties cannot be contracted out of — s.2(7) makes that explicit. Any employment contract clause purporting to remove or limit the employer's s.2 duty (or your s.7 duty) is void. You can't waive criminal protection by signing a piece of paper, even if you wanted to.",
  },
  {
    question: "What's the difference between an improvement notice and a prohibition notice?",
    answer:
      "An improvement notice (s.21) gives a deadline (minimum 21 days) to remedy a breach where there's no immediate danger. Work can continue. A prohibition notice (s.22) stops the activity immediately because there IS immediate danger of serious personal injury. Both can be appealed to the Employment Tribunal within 21 days. Failure to comply with either is a separate criminal offence.",
  },
  {
    question: "If the company gets prosecuted, am I safe as an employee?",
    answer:
      "Not automatically. HASAWA s.7 puts a personal duty on every employee. Your employer can be prosecuted under s.2 / s.3, AND you can be prosecuted under s.7 for the same incident, in your own name, in your own court appearance. Same evidence, two separate prosecutions, two separate convictions. They run in parallel, not in place of each other.",
  },
  {
    question: "If I'm self-employed, who do I owe duties to?",
    answer:
      "Almost everyone. As a self-employed person you owe duties under s.3 to anyone affected by your undertaking (customers, public, other trades on site), under s.7 to yourself and others, and under EAWR to anyone working on or near your installation. The 2015 amendment narrowed the s.3(2) self-employed-only duty so it doesn't apply to low-risk solo work, but for an electrician that doesn't help — electrical work is explicitly listed as 'prescribed' so the full s.3 self-employed duty applies.",
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 3"
            title="HASAWA 1974 deep dive"
            description="The parent Act every UK trade works under. Sections 2, 3, 6, 7 and 37 unpacked — what each one obliges, who they bind, how the HSE and Local Authority enforce them, and what sentencing on indictment actually looks like for electrical-installer breaches."
            tone="emerald"
          />

          <TLDR
            points={[
              "HASAWA 1974 is the parent Act. Five sections matter most for an electrician — s.2 (employer to employee), s.3 (employer/self-employed to non-employees), s.6 (designer/supplier), s.7 (every individual) and s.37 (director liability).",
              "Almost every duty is qualified by 'so far as is reasonably practicable' (SFAIRP) — the cost-vs-risk test from Edwards v National Coal Board (1949). Cost is in the equation; it rarely wins.",
              "Maximum sentence on indictment: unlimited fine and/or 2 years' imprisonment for individuals; unlimited fine for organisations. The Sentencing Council Definitive Guideline (2016) sets the sentencing matrix.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify HASAWA 1974 as the parent statutory Act under which EAWR and most other safety regulations are made.",
              "State the practical implications of HASAWA sections 2, 3, 6 and 7 for electrical contracting work.",
              "Explain how 'so far as is reasonably practicable' (SFAIRP) operates as the qualifying test for HASAWA duties.",
              "Identify HSE inspectors' enforcement powers under s.20 and the difference between an improvement notice (s.21) and a prohibition notice (s.22).",
              "State the personal-liability hooks under s.7 (employees / self-employed) and s.37 (directors / managers / officers).",
              "Outline the Sentencing Council Definitive Guideline (2016) framework — culpability bands, harm categories and turnover scaling — and the maximum penalties on indictment.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters at deep-dive level</ContentEyebrow>

          <ConceptBlock
            title="HASAWA is the umbrella — open it before you pick up the spanner"
            plainEnglish="Sub 1 named the four statutory instruments. This Sub opens HASAWA itself and reads the actual sections, because every other statutory reg you'll meet (EAWR, CDM, COSHH, PUWER, the Work at Height Regs) was made under HASAWA's enabling powers. If you understand HASAWA's structure, the rest fall into a tidy hierarchy."
            onSite="The actual sections are short. s.2 is a single page. s.7 is one paragraph. The reason apprentices think the Act is intimidating is that the textbook usually describes it instead of quoting it. Read the sections themselves — they read like a clear set of duties, not legalese."
          >
            <p>
              HASAWA splits into four parts. Part I (sections 1 to 54) is the bit that does the
              real work — the general duties, the powers of inspectors, the offences, the
              enforcement notices. Parts II to IV deal with the Employment Medical Advisory
              Service, amendments to other Acts, and supplementary provisions. For an electrician
              you only need Part I.
            </p>
            <p>
              The five sections in Part I that an electrician genuinely needs to know:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.2</strong> — the employer's general duty to employees.
              </li>
              <li>
                <strong>s.3</strong> — the employer's (and self-employed person's) duty to
                non-employees affected by the work.
              </li>
              <li>
                <strong>s.6</strong> — duties on designers, manufacturers, importers and
                suppliers of articles for use at work. Catches you when you design or supply a
                bespoke assembly.
              </li>
              <li>
                <strong>s.7</strong> — the personal duty on every individual at work.
              </li>
              <li>
                <strong>s.37</strong> — director / officer personal liability when the company
                offence is attributable to their consent, connivance or neglect.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 2 — employer's general duty</ContentEyebrow>

          <ConceptBlock
            title="The duty that drives the whole H&S management system"
            plainEnglish="s.2 is the section that requires the employer to keep employees safe at work. It's broken into a general duty (s.2(1)) and a list of specific obligations (s.2(2)) — plant and systems of work, use and handling of articles and substances, information / instruction / training / supervision, the workplace itself, and arrangements for welfare."
          >
            <p>
              s.2 reads like this:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(1) and s.2(2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>s.2(1)</strong> — &quot;It shall be the duty of every employer to ensure,
                  so far as is reasonably practicable, the health, safety and welfare at work of all
                  his employees.&quot;
                </p>
                <p>
                  <strong>s.2(2)</strong> — &quot;Without prejudice to the generality of an
                  employer&apos;s duty under the preceding subsection, the matters to which that duty
                  extends include in particular — (a) the provision and maintenance of plant and
                  systems of work that are, so far as is reasonably practicable, safe and without
                  risks to health; (b) arrangements for ensuring, so far as is reasonably
                  practicable, safety and absence of risks to health in connection with the use,
                  handling, storage and transport of articles and substances; (c) the provision of
                  such information, instruction, training and supervision as is necessary to ensure,
                  so far as is reasonably practicable, the health and safety at work of his
                  employees; (d) so far as is reasonably practicable as regards any place of work
                  under the employer&apos;s control, the maintenance of it in a condition that is
                  safe and without such risks, and the provision and maintenance of means of access
                  to and egress from it that are safe and without such risks; (e) the provision and
                  maintenance of a working environment for his employees that is, so far as is
                  reasonably practicable, safe, without risks to health, and adequate as regards
                  facilities and arrangements for their welfare at work.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Five subheadings under s.2(2). For an electrical contractor: (a) tools, MFTs,
                vans, RAMS, isolation procedures; (b) handling cable drums, ladders, batteries,
                COSHH-controlled materials; (c) the apprenticeship itself, toolbox talks, scheme
                CPD, supervisor sign-off; (d) site access, scaffolds, working platforms, the
                workshop; (e) welfare facilities on site (toilets, mess, drying area). Every line
                of s.2(2) maps onto something the firm has to put in place AND maintain.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — verbatim from legislation.gov.uk."
          />

          <ConceptBlock
            title="'Plant and systems of work' — the most-litigated phrase in s.2"
            onSite="When the HSE turns up after an incident the question they ask first is: 'what was your safe system of work for this activity?'. If the answer is a written method statement / risk assessment / isolation procedure / sign-off process, the firm is partway to a defence. If the answer is 'we just sent the apprentice in', that's how prosecutions are won."
          >
            <p>
              The phrase 'systems of work' has been picked over by the courts since the 1970s. It
              means more than the kit. It means the organisational arrangements that produce safe
              outcomes — the documented procedures, the supervisor regime, the training records,
              the calibration schedule for test instruments, the written safe-isolation procedure
              that everyone has to follow. The kit is plant; the procedures are the system.
            </p>
            <p>
              For an electrical contractor, the &quot;system of work&quot; for a typical job
              looks like: a job-specific risk assessment, a method statement covering isolation
              and access, a competence record proving the operative is suitable for the work, a
              calibrated MFT, a written safe-isolation procedure that every operative follows, a
              supervisor sign-off on the test results, an EIC issued at the end. Take any one of
              those out and the s.2(2)(a) defence weakens.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 3 — duty to non-employees</ContentEyebrow>

          <ConceptBlock
            title="The section that catches the customer, the public and the other trades"
            plainEnglish="s.3 extends the employer's duty outwards to anyone affected by the work — not just employees. Customers, members of the public, other contractors on site, the postman walking past your scaffold, the neighbour who wanders in. s.3 also binds the self-employed person directly."
            onSite="s.3 is where most domestic-electrician prosecutions land. You're never employing the householder, but the householder is squarely affected by your undertaking. Open consumer unit + curious child = textbook s.3 issue. Safe-isolation procedure that protects you but leaves the customer's circuit live to a known fault = textbook s.3 issue."
          >
            <p>
              The wording of s.3:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.3(1) and s.3(2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>s.3(1)</strong> — &quot;It shall be the duty of every employer to conduct
                  his undertaking in such a way as to ensure, so far as is reasonably practicable,
                  that persons not in his employment who may be affected thereby are not thereby
                  exposed to risks to their health or safety.&quot;
                </p>
                <p>
                  <strong>s.3(2)</strong> — &quot;It shall be the duty of every self-employed
                  person to conduct his undertaking in such a way as to ensure, so far as is
                  reasonably practicable, that he and other persons (not being his employees) who
                  may be affected thereby are not thereby exposed to risks to their health or
                  safety.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Two duties in two sentences. s.3(1) catches the firm in its dealings with anyone
                outside the workforce — customers, public, other contractors. s.3(2) catches the
                self-employed person in the same terms (with a 2015 amendment narrowing it for
                low-risk solo work — but the Health and Safety at Work etc. Act 1974 (General
                Duties of Self-Employed Persons) (Prescribed Undertakings) Regulations 2015
                explicitly keep electrical work as a prescribed undertaking, so a self-employed
                electrician owes the full s.3(2) duty without exception).
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.3 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 6 — designers, suppliers, manufacturers</ContentEyebrow>

          <ConceptBlock
            title="Why s.6 catches the design-and-build contractor"
            plainEnglish="s.6 puts duties on anyone who designs, manufactures, imports or supplies an article for use at work. Most apprentices think this is a manufacturer-only section — it isn't. The moment your firm designs and builds a one-off control panel, a bespoke distribution board, or a prefabricated assembly for a customer, you're acting as a designer and supplier under s.6."
            onSite="The deliverable that flows from s.6 is documentation. The handover pack — single-line diagram, schedule of test results, manufacturer literature for components, recommended maintenance regime, declared safe-use limits — is what s.6 requires you to provide. Hand the customer a panel and walk away with no documentation and you've breached s.6 even if the panel itself is faultless."
          >
            <p>
              s.6 in summary requires the designer / manufacturer / importer / supplier to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Ensure, so far as is reasonably practicable, that the article is so designed and
                constructed as to be safe and without risks to health when properly used.
              </li>
              <li>
                Carry out (or arrange) such testing and examination as is necessary to demonstrate
                that.
              </li>
              <li>
                Provide adequate information about the use for which the article was designed,
                the conditions necessary to ensure safe use, and any risks attendant on its use.
              </li>
              <li>
                Take steps to ensure that those supplied are kept informed of any subsequently
                discovered serious risks.
              </li>
            </ul>
            <p>
              For an electrical contractor designing a one-off, that translates into: design to
              BS 7671 + relevant product standards (BS EN 61439 for assemblies), test the panel
              before despatch, provide a handover pack with single-line, schedule of components,
              test sheet, declared rating, recommended maintenance interval, and notify the
              customer of any subsequent product recalls or safety advisories you become aware of.
              Skip any of those steps and the s.6 duty is in play.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 7 — every individual at work</ContentEyebrow>

          <ConceptBlock
            title="The personal-duty section every apprentice should know cold"
            plainEnglish="s.7 is the only HASAWA section that puts a duty directly on the individual employee. It's short and it's personal — you owe a duty to yourself and to anyone affected by your acts or omissions, AND you owe a duty to co-operate with the employer's safety arrangements."
            onSite="If your supervisor sets up a lock-off and you remove it because the customer asked you to, that's a s.7 breach by you regardless of who else is in the chain. 'I was just following orders' is not a defence to s.7. Your card, your competence, your liability."
          >
            <p>
              The exact wording:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.7"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work — (a) to take reasonable
                care for the health and safety of himself and of other persons who may be affected
                by his acts or omissions at work; and (b) as regards any duty or requirement
                imposed on his employer or any other person by or under any of the relevant
                statutory provisions, to co-operate with him so far as is necessary to enable that
                duty or requirement to be performed or complied with.&quot;
              </>
            }
            meaning={
              <>
                Two limbs. Limb (a) is the personal-care duty — be careful for yourself and
                anyone affected by what you do or fail to do. Limb (b) is the co-operation duty —
                follow your employer&apos;s safety arrangements and don&apos;t undermine them.
                Lifting a colleague&apos;s lock-off, ignoring a posted method statement, refusing
                to wear PPE, all bite under limb (b) as well as (a).
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 37 — director and officer liability</ContentEyebrow>

          <ConceptBlock
            title="Where the corporate veil gets pierced"
            plainEnglish="s.37 lets the prosecutor charge a director, manager, secretary or 'similar officer' personally, alongside the company, when the company offence was committed with the individual's consent, connivance OR neglect. 'Neglect' is the wide door — failing to put proper systems in place is enough."
            onSite="For an apprentice this isn't immediately your problem, but it tells you why the firm cares so much about paperwork. The director who doesn't insist on RAMS being completed before each job isn't just running a sloppy business — they're personally exposed under s.37 if anything goes wrong. Their custodial-sentence risk is what funds the systems you fill in."
          >
            <p>
              The wording (paraphrased): where an offence committed by a body corporate is proved
              to have been committed with the consent or connivance of, or to be attributable to
              any neglect on the part of, any director, manager, secretary or other similar
              officer, that individual as well as the body corporate is guilty of the offence and
              is liable to be proceeded against and punished accordingly.
            </p>
            <p>
              Three triggers — consent, connivance or neglect. The first two are deliberate; the
              third is omission. The Sentencing Council Definitive Guideline (2016) treats
              individual sentences for s.37 cases on the same matrix as organisational
              sentences, with custodial sentences available on indictment up to two years.
              Suspended custodial sentences for sole directors of small electrical contracting
              firms are a real and growing pattern after fatalities.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>'So far as is reasonably practicable' (SFAIRP)</ContentEyebrow>

          <ConceptBlock
            title="The phrase that decides every HASAWA case"
            plainEnglish="Almost every HASAWA duty is qualified by 'so far as is reasonably practicable'. It's a balancing test laid down in Edwards v National Coal Board (1949) — the cost (in time, money, effort) of the precaution must be weighed against the risk being prevented. Trivial cost against serious risk = required. Disproportionate cost against trivial residual risk = not required."
          >
            <p>
              Three things to remember about SFAIRP:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The cost is judged at the time of the decision, not after the incident. But
                hindsight bias is real — what looked optional before the fire looks negligent
                after.
              </li>
              <li>
                The bar is set by what a competent person in the trade would have done, not by
                what the duty-holder happened to think was reasonable.
              </li>
              <li>
                The burden of proving SFAIRP is on the defendant (s.40 HASAWA). The prosecution
                doesn&apos;t have to prove it WASN&apos;T reasonably practicable — you have to
                prove it WAS. That&apos;s a quietly massive shift from normal criminal procedure.
              </li>
            </ul>
            <p>
              In practice this means: a 30 mA RCD on every domestic socket circuit is reasonably
              practicable (cheap, well-known, prevents shock). Skipping it because the customer
              didn&apos;t ask is not a defence. Designing-out an RCD on a server room because
              nuisance tripping would crash a hospital&apos;s patient records, with documented
              alternative protection, might be reasonably practicable. The reasoning has to be in
              writing before the incident — not invented afterwards.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Enforcement — inspectors, notices, prosecution</ContentEyebrow>

          <ConceptBlock
            title="HSE inspectors' powers under s.20"
            plainEnglish="HSE inspectors have some of the widest statutory powers in UK law. Under s.20 they can enter premises at any reasonable time without notice, take photographs and measurements, take samples, require any person to answer questions, require production of documents, and take possession of articles."
            onSite="If an inspector knocks on your job: be polite, co-operate, give your name and explain what you're doing. Don't volunteer admissions. Call your scheme provider's helpline before answering anything that could be admissions of breach. Refusing or obstructing the inspector is itself a criminal offence under s.33."
          >
            <p>
              The two formal notices the inspector can issue:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Improvement notice (s.21)</strong> — there is a breach but no immediate
                danger. The notice gives a deadline (minimum 21 days from issue) by which the
                breach must be remedied. Work can continue in the meantime.
              </li>
              <li>
                <strong>Prohibition notice (s.22)</strong> — there is a risk of serious personal
                injury. The activity must stop immediately and cannot resume until the conditions
                in the notice are met. Can be issued with immediate effect or deferred.
              </li>
            </ul>
            <p>
              Both notices can be appealed to the Employment Tribunal within 21 days. Appealing
              an improvement notice suspends its effect; appealing a prohibition notice does NOT
              automatically suspend it (you have to apply separately for that). Failure to comply
              with either notice is itself a criminal offence — and is prosecuted as a stand-alone
              charge on top of the original breach.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where the prosecution actually happens — magistrates' or Crown Court"
            onSite="Most HASAWA prosecutions for an electrical contractor start in the magistrates' court. Serious cases (fatalities, repeat offenders, very high culpability) get sent up to the Crown Court for sentencing or trial on indictment. The maximum sentences differ — and the sentencing matrix the court uses changes too."
          >
            <p>
              Two prosecution venues, two sentence ceilings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Magistrates&apos; court (summary)</strong> — most HASAWA / EAWR offences
                now carry an unlimited fine and/or up to 6 months&apos; imprisonment for
                individuals (raised by the Health and Safety (Offences) Act 2008 and subsequent
                amendments). Magistrates handle smaller cases without a jury.
              </li>
              <li>
                <strong>Crown Court (on indictment)</strong> — unlimited fine and/or up to 2
                years&apos; imprisonment for individuals; unlimited fine for organisations. Trial
                by jury for contested cases. The Sentencing Council Definitive Guideline (2016)
                applies. This is the venue for any case involving a fatality.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Sentencing Council — Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences Definitive Guideline (effective 1 February 2016)"
            clause={
              <>
                &quot;The court should determine the offence category, using the table below, by
                reference first to the offender&apos;s culpability and then to the seriousness of
                harm risked&hellip; The court should then identify the relevant starting point and
                category range&hellip; Having determined the offence category at step one, and
                taking into account turnover or equivalent, the court should refer to the table
                below to identify the starting point and category range&hellip;&quot;
              </>
            }
            meaning={
              <>
                The Definitive Guideline introduced a structured matrix the court must follow.
                Step 1 — culpability (very high / high / medium / low). Step 2 — harm category
                (1 to 4) based on the seriousness of harm risked AND the likelihood of that harm
                arising. Step 3 — for organisations, the turnover band (large / medium / small /
                micro). Combine those three and the matrix produces a starting-point fine and a
                category range. The result is that the same fact-pattern produces a six-figure
                fine for a small contractor and a seven-figure fine for a large one — turnover
                scales the penalty even though the breach is identical.
              </>
            }
            cite="Source: Sentencing Council Definitive Guideline, Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences (in force 1 February 2016) — paraphrased from sentencingcouncil.org.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The bridge to BS 7671</ContentEyebrow>

          <ConceptBlock
            title="Why following BS 7671 helps you discharge HASAWA"
            plainEnglish="EAWR is a regulation made under HASAWA's enabling powers (s.15). HSR25, the HSE's guidance on EAWR, lists BS 7671 as a means of demonstrating compliance with EAWR. So evidence that the install was done to BS 7671 is evidence that the EAWR duty was met, which is in turn evidence that the underlying HASAWA s.2(2)(a) safe-system duty for the electrical part of the work was met. Three layers of statutory cover from one technical document."
          >
            <p>
              That cascade matters because HASAWA s.2(2)(a) requires the employer to provide
              &apos;safe systems of work&apos;, but HASAWA itself doesn&apos;t tell you HOW to
              make an electrical installation safe. The way you prove you did is by showing your
              work followed BS 7671. So the chain runs HASAWA &rarr; EAWR &rarr; HSR25 &rarr;
              BS 7671. Get that chain straight and you understand why the technical standard
              everyone reaches for is non-statutory but legally critical.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating HASAWA as the employer's problem and not yours"
            whatHappens={
              <>
                Apprentice spots a clear isolation-procedure breach by the senior electrician
                running the job — lock-off removed, no voltage proof, board re-energised before
                everyone&apos;s clear. Apprentice keeps quiet because &apos;it&apos;s not my call,
                he&apos;s the supervisor&apos;. Someone gets a shock half an hour later. Both the
                supervisor (s.2 / EAWR Reg 4) AND the apprentice (s.7 — failure to take
                reasonable care AND failure to co-operate with the employer&apos;s safety
                arrangements) are in scope for prosecution.
              </>
            }
            doInstead={
              <>
                Speak up at the time — that&apos;s exactly what s.7 limb (b) requires. If
                you&apos;re uncomfortable challenging the supervisor directly, raise it with a
                more senior person or use the firm&apos;s incident-reporting channel. The act of
                raising it discharges your s.7 duty even if the supervisor overrides you. Silence
                does not.
              </>
            }
          />

          <CommonMistake
            title="Assuming the company will absorb the personal liability under s.7 or s.37"
            whatHappens={
              <>
                Director takes a shortcut on supervision because the firm is busy and the
                apprentices are competent enough. Incident happens. Company pleads guilty under
                EAWR Reg 4 / HASAWA s.2 and pays the fine. Director assumes that&apos;s the end
                of it. Six months later the director is summonsed personally under s.37 —
                &apos;neglect&apos; — facing a separate fine and a suspended custodial sentence on
                their own record. The company plea didn&apos;t cover them. The corporate veil
                doesn&apos;t reach into criminal H&amp;S liability where s.37 applies.
              </>
            }
            doInstead={
              <>
                Treat HASAWA s.7 and s.37 as personal — they are. The company&apos;s plea covers
                the company. Individuals get charged separately. For the apprentice the takeaway
                is small but real: nobody&apos;s indemnifying you out of your s.7 obligations,
                and the firm&apos;s insurance won&apos;t pay your personal fine.
              </>
            }
          />

          <Scenario
            title="Improvement notice on a fit-out — temporary supplies aren't RCD-protected"
            situation={
              <>
                You&apos;re second-year on a commercial fit-out. HSE inspector visits as part of a
                routine sweep across the site. They notice that two of the three temporary
                distribution boards feeding the building site don&apos;t have 30 mA RCD protection
                on the socket outlets being used by other trades. The hire-supplied DBs are
                technically compliant for general construction but not for the way they&apos;re
                being used (handheld tools, outdoor extension leads, damp conditions). The
                inspector serves an improvement notice on the principal contractor with a 21-day
                deadline.
              </>
            }
            whatToDo={
              <>
                The principal contractor (and your firm if you&apos;re the electrical trade
                responsible for the temporary supplies) has 21 days to remedy. Realistic options:
                swap the DBs for ones with 30 mA RCD on the socket circuits, fit RCD-protected
                outlet adaptors, or restrict use to plug-in tools that have their own integral
                protection. Document the remedy. Notify the inspector by the deadline. Keep the
                evidence on the job file. The improvement notice itself doesn&apos;t produce a
                fine if you comply &mdash; but failing to comply by the deadline is a separate
                criminal offence, and the original breach can still be prosecuted if the inspector
                decides to escalate.
              </>
            }
            whyItMatters={
              <>
                Improvement notices are often treated by junior operatives as bureaucracy. They
                aren&apos;t. They&apos;re a formal step that puts the duty-holder on notice the
                statutory duty is in breach &mdash; missing the deadline turns an administrative
                problem into a stand-alone prosecution for the firm and (under s.37) potentially
                for the named director. The whole site H&amp;S regime is built around not letting
                this happen.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "HASAWA 1974 is the parent Act under which EAWR and most other safety regulations are made. Five sections matter most for an electrician — s.2, s.3, s.6, s.7, s.37.",
              "s.2 binds the employer to employees — including 'plant and systems of work', training, supervision and the workplace itself. 'Systems of work' includes RAMS, isolation procedures and supervisor sign-off.",
              "s.3 binds the employer (and self-employed person) to non-employees affected by the undertaking — customers, public, other trades. Electrical work remains a 'prescribed undertaking' so self-employed electricians owe the full s.3(2) duty without exception.",
              "s.6 puts duties on designers, manufacturers, importers and suppliers — caught when you design or supply a one-off control panel, distribution board or assembly. The handover pack is the s.6 deliverable.",
              "s.7 is the personal duty on every employee. Two limbs — take reasonable care for yourself and others, and co-operate with the employer's safety arrangements. 'I was just following orders' is no defence.",
              "s.37 lets the prosecutor pierce the corporate veil where a company offence was committed with a director's consent, connivance or neglect. Custodial sentences on indictment are real for s.37 cases after fatalities.",
              "SFAIRP qualifies almost every HASAWA duty. Burden of proof under s.40 sits on the defendant — you have to prove the precaution wasn't reasonably practicable, not the prosecution.",
              "Maximum sentence on indictment: unlimited fine and/or 2 years' imprisonment for individuals; unlimited fine for organisations. Sentencing follows the Sentencing Council Definitive Guideline (2016) — culpability + harm + turnover combine to set the starting point.",
            ]}
          />

          <Quiz title="HASAWA 1974 deep dive — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 Non-statutory regulations and guidance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 EAWR 1989 deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
