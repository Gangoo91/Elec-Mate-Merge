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
  'The role of regulatory bodies (HSE, NICEIC, NAPIT, JIB, IET, ECA, BSI) | Level 2 Module 1.1.4 | Elec-Mate';
const DESCRIPTION =
  "An apprentice’s guide to the alphabet soup. Who enforces the law, who signs off your work, who pays your wages, who gets you on site — and which one’s just a trade body.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'hse-role-check',
    question: "What’s the HSE’s actual job?",
    options: [
      'Certifies electricians as competent',
      'Sells PPE to contractors',
      'Enforces UK workplace safety law and publishes guidance',
      'Sets pay rates for sparks',
    ],
    correctIndex: 2,
    explanation:
      "The HSE is the regulator. They enforce HASAWA and the regs under it — improvement notices, prohibition notices, prosecution. They don’t certify electricians and they don’t set pay. Different bodies do that.",
  },
  {
    id: 'cps-vs-trade-check',
    question: "What’s the difference between NICEIC and the ECA?",
    options: [
      "They’re the same thing under different names",
      'NICEIC is a competent person scheme (sign off your own Part P work). ECA is a trade body (membership, insurance, voice in the industry)',
      'NICEIC is for England, ECA is for Scotland',
      'NICEIC tests apprentices, ECA tests qualified sparks',
    ],
    correctIndex: 1,
    explanation:
      "Easy mix-up. NICEIC and NAPIT are competent person schemes — assessed annually, lets the firm self-certify domestic work. ECA is a trade association — membership perks, lobbying, contracts. You can be in one, the other, both, or neither.",
  },
  {
    id: 'jib-ecs-check',
    question: 'You need a card to get on a commercial site. Who issues it?',
    options: [
      'NICEIC issues the ECS card',
      'The JIB administers ECS — the Electrotechnical Certification Scheme',
      'The HSE issues all UK site cards',
      'The IET issues ECS for engineers',
    ],
    correctIndex: 1,
    explanation:
      "ECS = Electrotechnical Certification Scheme, run by the JIB. To get one you sit a health and safety assessment (the ESC test) and prove your qualifications. Most main contractors won’t let you through the gate without it.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: "What is the HSE’s main role?",
    options: [
      'Training apprentices',
      'Enforcing workplace health and safety law and publishing guidance',
      'Selling testing equipment',
      'Setting electricity tariffs',
    ],
    correctAnswer: 1,
    explanation:
      "The HSE is the UK regulator for workplace health and safety. They enforce HASAWA, issue notices, prosecute, and publish free guidance at hse.gov.uk. They don’t certify electricians.",
  },
  {
    id: 2,
    question: 'A spark gets a serious shock in a high-street shop. Who would investigate?',
    options: [
      'The HSE',
      'The local authority (Environmental Health)',
      'NICEIC',
      'The IET',
    ],
    correctAnswer: 1,
    explanation:
      "Generally HSE covers construction, factories, agriculture. Local Authorities cover retail, offices, hotels, leisure. Same powers, same RIDDOR rules — just split by sector.",
  },
  {
    id: 3,
    question: "What’s the point of a Competent Person Scheme like NICEIC or NAPIT?",
    options: [
      'They prove an individual electrician is qualified',
      'They let registered firms self-certify their own domestic work for Building Regs Part P, instead of going through Building Control',
      'They replace the need for BS 7671',
      'They issue site cards',
    ],
    correctAnswer: 1,
    explanation:
      "Competent Person Schemes are government-approved. The firm gets assessed once a year, and in return can sign off its own notifiable domestic electrical work without notifying the council. NICEIC and NAPIT are the two big ones.",
  },
  {
    id: 4,
    question: "Under Part P (England), which is notifiable work in a dwelling?",
    options: [
      'Changing a light bulb',
      'Replacing a damaged socket faceplate like-for-like',
      'Replacing a consumer unit, or any new circuit, or work in a bathroom',
      'All electrical work in a house',
    ],
    correctAnswer: 2,
    explanation:
      "Notifiable work includes consumer unit replacement, any new circuit, and any work in a 'special location' like a bathroom. Either a Competent Person Scheme firm signs it off, or you notify Building Control before starting.",
  },
  {
    id: 5,
    question: 'What does the JIB do?',
    options: [
      'Writes BS 7671',
      'Sets pay rates, holiday pay, working conditions and the grading card for the electrical contracting industry',
      'Enforces health and safety on building sites',
      'Sells professional indemnity insurance',
    ],
    correctAnswer: 1,
    explanation:
      "Joint Industry Board. Sets the national pay rates (apprentice and qualified), holiday entitlements, travel allowances, and grading. It also runs ECS — the card scheme. SJIB does the same job in Scotland.",
  },
  {
    id: 6,
    question: 'What do you need before most main contractors let you on a commercial site?',
    options: [
      'NICEIC certificate',
      'IET membership',
      'A valid ECS card with health and safety assessment',
      'BSI accreditation',
    ],
    correctAnswer: 2,
    explanation:
      "ECS card — proof of your trade qualifications plus a current H&S assessment (the ESC test). No card, no gate. Apprentices get a Trainee/Apprentice ECS card.",
  },
  {
    id: 7,
    question: "What’s the difference between the IET and the ECA?",
    options: [
      "They’re the same body",
      'IET is the professional body for engineers (publishes BS 7671 with BSI). ECA is a trade association for electrical contracting firms.',
      'IET is for England, ECA is for Wales',
      'IET enforces the law, ECA writes it',
    ],
    correctAnswer: 1,
    explanation:
      "IET = Institution of Engineering and Technology — professional body, publishes BS 7671 jointly with BSI, runs Eng Tech / IEng / CEng routes. ECA = Electrical Contractors' Association — a trade body for contracting firms (membership, insurance, lobbying).",
  },
  {
    id: 8,
    question: 'Who actually publishes BS 7671 (the Wiring Regs)?',
    options: [
      'The HSE',
      'The IET and BSI jointly',
      'NICEIC',
      'The government',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 is a British Standard, published by BSI (British Standards Institution) jointly with the IET. It’s not law — but every regulator and court treats it as the benchmark for safe electrical work.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'Honest question — does an apprentice need to know all of these?',
    answer:
      "Not all the detail, no. But you do need to know which body does what, because they each have a moment in your career when they matter. HSE = enforcement. NICEIC/NAPIT = signing off your firm’s domestic work. JIB = your pay packet. ECS = your site card. IET = your professional membership. BSI/IET = where BS 7671 comes from. ECA = a trade body your gaffer might be in.",
  },
  {
    question: 'Is NICEIC the only competent person scheme?',
    answer:
      "No. NICEIC and NAPIT are the two biggest in domestic. Others include ELECSA, STROMA, and a few smaller ones. They all do the same job — government-approved, annual assessment, self-cert for Part P. Your firm picks one. You don’t need to be in all of them.",
  },
  {
    question: "Does NICEIC certify me personally?",
    answer:
      "No — and this catches a lot of people out. NICEIC certifies the FIRM (the contractor), not the individual electrician. They assess one of your firm’s senior sparks (the 'qualified supervisor') once a year. You’re covered by the firm’s registration, you don’t carry a personal NICEIC certificate.",
  },
  {
    question: "What’s the JIB grading card and do I need one?",
    answer:
      "It’s the JIB’s grading system for electricians — Apprentice, Trainee, Electrician, Approved Electrician, Technician. Tied to your qualifications and on-site experience. The grade affects your pay rate (set nationally by the JIB). Your card is also your ECS card, so yes — you’ll need one to get on most commercial sites.",
  },
  {
    question: 'My boss says I have to do a job in a bathroom but the firm isn\'t Part P registered. What happens?',
    answer:
      "The firm has two legal options: notify Building Control before starting (with a fee, and they’ll inspect at the end), or get a registered third-party certifier in. Skipping it isn’t an option — work in a 'special location' like a bathroom is notifiable. Doing notifiable work without notification is an offence under Building Regs.",
  },
  {
    question: "Should I join the IET as an apprentice?",
    answer:
      "Worth a look. The IET does Student membership cheap (sometimes free through your college). You get access to BS 7671 online, Wiring Matters magazine, technical helpline, CPD events. Down the line, IET membership is the route to Eng Tech / IEng / CEng if you want letters after your name. Doesn’t replace your ECS card — different thing.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1.1 · Subsection 4"
            title="The role of regulatory bodies"
            description="HSE, NICEIC, NAPIT, JIB, IET, ECA, BSI. If alphabet soup is the vibe so far, you’re not wrong. Just need the basics — what each does, who to call when. Ten minutes here saves a lot of confusion later."
            tone="emerald"
          />

          <TLDR
            points={[
              "Government can’t supervise every workplace — so the job’s split. HSE enforces. CPS schemes (NICEIC, NAPIT) sign off domestic work. JIB sets pay. IET + BSI write BS 7671. ECA is a trade body.",
              "NICEIC certifies the FIRM, not you. The qualified supervisor is the one assessed each year. You’re covered under the firm’s registration.",
              "ECS is your site card — administered by the JIB. No card, no site (most of them). Apprentices get a Trainee/Apprentice ECS card.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Name the main UK regulatory and trade bodies and explain what each one actually does.",
              "Tell the difference between an enforcer (HSE), a competent person scheme (NICEIC/NAPIT), a trade body (ECA) and a professional body (IET).",
              "Explain how Part P works for domestic electrical work and what 'notifiable' means.",
              "Know where your pay rate, holiday pay and grade come from (JIB) and what an ECS card is for.",
              "Know who actually publishes BS 7671 — and why a 'British Standard' isn’t quite the same as a law.",
              "Know who to call when something goes wrong on site (RIDDOR-reportable injury, dispute over Part P sign-off, pay query).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this is a list of bodies, not just one</ContentEyebrow>

          <ConceptBlock title="The state can’t supervise every workplace — so the job’s split">
            <p>
              The UK has roughly 5.5 million businesses. The Health and Safety Executive has a few
              thousand inspectors. They obviously can’t check everyone. So instead of one giant
              regulator doing the lot, the work’s been split between a stack of bodies — each one
              with a specific job.
            </p>
            <p>
              <strong>Enforcement</strong> sits with the HSE (and your local authority).{' '}
              <strong>Competent person schemes</strong> (NICEIC, NAPIT, ELECSA) handle Part P
              sign-off in domestic. <strong>Employment standards</strong> — pay, holidays, grading
              — sit with the JIB. <strong>Professional standards</strong> for engineers sit with
              the IET. <strong>Trade representation</strong> sits with the ECA.{' '}
              <strong>Standards documents</strong> like BS 7671 come from the BSI and IET jointly.
            </p>
            <p>
              Knowing which is which means you know who to call, who to register with, and whose
              advice to actually listen to. The rest of this subsection is just that, body by body.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The regulator</ContentEyebrow>

          <ConceptBlock
            title="HSE — Health and Safety Executive"
            plainEnglish="The regulator. They write the guidance, they send the inspectors, and they’re the ones who can stop your job dead or take your firm to court."
            onSite="Every safety poster, every COSHH datasheet, every method statement template you’ve ever seen — most of that traces back to free guidance HSE has put out. hse.gov.uk is genuinely useful. Bookmark it."
          >
            <p>
              The HSE is the UK’s national regulator for workplace health and safety. They enforce
              HASAWA 1974 and all the regs made under it (EAWR, MHSWR, COSHH, PUWER, CDM and the
              rest). HSE inspectors have proper legal powers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Enter premises unannounced</strong> at any reasonable time.
              </li>
              <li>
                <strong>Issue an Improvement Notice</strong> — fix this within X weeks, or else.
              </li>
              <li>
                <strong>Issue a Prohibition Notice</strong> — stop this work right now until it’s
                made safe. Goes up immediately, no appeal needed first.
              </li>
              <li>
                <strong>Prosecute</strong> in the magistrates' or Crown Court. Unlimited fines for
                companies. Up to 2 years in prison for individuals (s.7 / s.37 of HASAWA).
              </li>
              <li>
                <strong>Charge fees for intervention</strong> — if they find a serious breach,
                you pay for the time their inspector spent on you.
              </li>
            </ul>
            <p>
              One thing the HSE <em>doesn’t</em> do: certify electricians. They don’t issue you a
              ticket that says you’re competent. That’s not their job. Their job is enforcement and
              guidance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE — guidance on enforcement powers"
            clause="The Health and Safety Executive (HSE) has the power to stop organisations carrying out practices that it considers too risky, and this is done by issuing a Prohibition Notice. The HSE can also require organisations to improve health and safety practices by issuing an Improvement Notice, which gives an organisation a period of time to make improvements in the relevant areas."
            meaning={
              <>
                Two notices to know by name. <strong>Prohibition</strong> = stop now.{' '}
                <strong>Improvement</strong> = fix it within a deadline. Both are legal documents,
                both ignore-at-your-peril. If an HSE inspector turns up on your site, the gaffer
                deals with them — but you cooperate, you tell the truth, and you don’t move
                anything they’ve asked you to leave.
              </>
            }
          />

          <ConceptBlock
            title="Local Authorities — same powers, different sectors"
            plainEnglish="The HSE doesn’t cover every workplace. Local councils do the rest. Same enforcement powers, just split by sector."
          >
            <p>
              Workplace H&S enforcement is split between the HSE and local authorities (LAs).
              Generally:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HSE covers:</strong> construction sites, factories, agriculture,
                engineering, mines and quarries, nuclear, offshore, hospitals, schools (in some
                cases).
              </li>
              <li>
                <strong>LA covers:</strong> shops, offices, hotels, restaurants, pubs, leisure,
                care homes, residential.
              </li>
            </ul>
            <p>
              In practice it’s the council’s <strong>Environmental Health Officers</strong> (EHOs)
              who turn up. Same powers as HSE inspectors — improvement and prohibition notices,
              prosecution, the lot. Just badged differently.
            </p>
            <p>
              The split also matters for <strong>RIDDOR</strong> (the injury reporting reg). A
              serious shock in a factory? HSE. Same shock in a Tesco? Local Authority. Same form,
              different inbox.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Signing off domestic work</ContentEyebrow>

          <ConceptBlock
            title="Competent Person Schemes — NICEIC, NAPIT, ELECSA, STROMA"
            plainEnglish="Government-approved schemes that let your firm self-certify its own domestic electrical work for Building Regs Part P, without paying the council to come and inspect every job."
            onSite="When the gaffer says 'we’re NICEIC registered' — what they mean is the firm pays an annual fee, gets assessed once a year by an NICEIC engineer, and in return can stick its own sticker on a consumer unit job and notify Building Control electronically. Cheaper and faster than going through the council."
          >
            <p>
              These are <strong>Competent Person Schemes</strong> (CPS). They were set up after
              Part P came into force in 2005 to give electricians a route to self-certify their own
              notifiable domestic work — without that, every consumer unit swap or bathroom job
              would need a separate Building Control notification.
            </p>
            <p>The big four for electrical work in England:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NICEIC</strong> — the biggest. Owned by Certsure. Their "Approved
                Contractor" and "Domestic Installer" schemes are the ones you’ll see most often.
              </li>
              <li>
                <strong>NAPIT</strong> — the other big one. Same job, slightly different
                paperwork, often a bit cheaper.
              </li>
              <li>
                <strong>ELECSA</strong> — also Certsure. Domestic-focused.
              </li>
              <li>
                <strong>STROMA</strong> — a smaller player but operates the same way.
              </li>
            </ul>
            <p>
              All four are government-approved. All four require an annual assessment (an
              assessor visits, picks a recent job, audits your paperwork and tests). All four
              come with insurance-backed warranties for the customer (typically 6 years).
            </p>
            <p>
              <strong>Important:</strong> the scheme registers the FIRM, not you personally. The
              assessor checks one named "qualified supervisor" at your firm. You work under that
              registration when you’re employed there. Move firms and you’re working under the new
              firm’s registration (or not).
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Thinking NICEIC certifies you personally"
            whatHappens={
              <>
                You finish your apprenticeship and tell people you’re "NICEIC qualified" or
                "NICEIC certified". Customer rings round for a quote, asks for proof of your
                personal NICEIC card. You haven’t got one — because that’s not how it works.
                Awkward.
              </>
            }
            doInstead={
              <>
                NICEIC (and NAPIT, ELECSA, STROMA) certify <em>firms</em>, not individuals. Your
                qualifications are your{' '}
                <strong>NVQ Level 3 + AM2 + 18th Edition</strong>. The firm’s CPS registration is
                what lets the firm self-cert Part P work. If you go self-employed and want to do
                domestic, <em>you</em> apply to a scheme as a sole trader.
              </>
            }
          />

          <ConceptBlock
            title="Building Regs Part P — the law that makes CPS schemes useful"
            plainEnglish="In England, electrical work in dwellings has to comply with Approved Document P. 'Notifiable' work (consumer unit, new circuits, special locations) has to be signed off — either by a CPS firm or by Building Control."
          >
            <p>
              Part P of the Building Regulations applies to fixed electrical installations in
              dwellings (houses, flats, gardens, outbuildings) in England. Part P covers
              <em> dwellings only</em> — not commercial.
            </p>
            <p>
              Part P splits work into two buckets:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Non-notifiable</strong> — minor work like adding a socket to an existing
                circuit, replacing a like-for-like accessory. Still has to comply with BS 7671 and
                you still need a Minor Works Certificate, but you don’t have to tell anyone.
              </li>
              <li>
                <strong>Notifiable</strong> — installing a new circuit, replacing a consumer unit,
                or doing any work in a "special location" (bathrooms, swimming pools, saunas).
                Must be either signed off by a CPS-registered firm OR notified to Building
                Control before starting.
              </li>
            </ul>
            <p>
              Scotland uses Building Standards (Section 4); Wales has its own Approved Document P
              (similar to England’s); Northern Ireland uses Building Regs Part F (Technical
              Booklet). Same idea, slightly different paperwork.
            </p>
            <p>
              Doing notifiable work without notification — and then trying to sell the house — is
              where this catches people. The buyer’s solicitor asks for the cert, there isn’t
              one, the seller has to pay for a retrospective Building Control inspection (or hire
              a third-party certifier). Don’t be the spark who put them in that mess.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document P — Section P1"
            clause="Reasonable provision shall be made in the design, installation, inspection and testing of electrical installations in order to protect persons from fire and injury. It is not necessary to notify building control bodies when the electrical installation work is to be undertaken by a 'Competent Person' and is self-certificated. Nor does it when electrical installation work is 'Minor Work' and is not contained within the kitchen or special location."
            meaning={
              <>
                Two ways to legally do notifiable work in a dwelling: be (or work for) a registered
                Competent Person, OR notify Building Control before you start. Anything else and
                you’re outside the rules. <strong>"Special location"</strong> = bathrooms, pools,
                saunas — anywhere with extra shock risk under BS 7671 Part 7.
              </>
            }
            cite="Reference: Approved Document P — Electrical Safety (England)"
          />

          <Scenario
            title="The gaffer wants you to do a bathroom shaver socket — but the firm isn’t NICEIC"
            situation={
              <>
                You’re handed a job sheet: install a shaver socket in a domestic bathroom.
                Customer’s nice, job’s a couple of hours. Then you remember the firm dropped its
                NICEIC registration last year to save money. There’s no Building Control notice
                logged either.
              </>
            }
            whatToDo={
              <>
                Pause and ask. The firm has two legal options: notify Building Control before you
                start (council does the inspection at the end), or bring in a third-party
                certifier (an organisation like Stroma’s "third-party certifier" route). Skipping
                both is the firm committing an offence under Building Regs — and you’re the one
                holding the screwdriver.
              </>
            }
            whyItMatters={
              <>
                Bathrooms are a "special location" under Approved Document P, so this is
                notifiable. If something goes wrong years later — fire, shock, sale falls
                through because there’s no cert — the trail comes back to who did the work.
                "Boss told me to" doesn’t help under HASAWA s.7 either.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Pay, conditions and your site card</ContentEyebrow>

          <ConceptBlock
            title="JIB — Joint Industry Board"
            plainEnglish="The JIB sets pay rates, holiday entitlements, travel money and the grading system for the electrical contracting industry. It’s a joint thing between the employer body (ECA) and the union (Unite). They negotiate, you get paid."
            onSite="Apprentice pay percentages, the bank holidays on your contract, your travel allowance — all national, all set by the JIB. If your firm signs up to JIB rates, those are the floor. If it doesn’t, you negotiate direct."
          >
            <p>
              The Joint Industry Board for the Electrical Contracting Industry (the JIB) is a
              joint body run by the ECA (employers' side) and Unite (union side). Covers England,
              Wales and Northern Ireland. Scotland has its own equivalent — the SJIB.
            </p>
            <p>What the JIB actually does:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sets national pay rates</strong> by grade — apprentice (year 1, 2, 3, 4 as
                a % of qualified rate), Electrician, Approved Electrician, Technician.
              </li>
              <li>
                <strong>Sets holiday and pension entitlements</strong> — including the JIB’s own
                stakeholder pension and combined holiday/pension scheme.
              </li>
              <li>
                <strong>Issues the grading card</strong> — your JIB grade is tied to your
                qualifications and on-site experience, and it determines your pay.
              </li>
              <li>
                <strong>Administers ECS</strong> (see next block).
              </li>
              <li>
                <strong>Runs apprenticeships</strong> — the JIB is one of the main bodies that
                registers and standardises electrical apprenticeships in the UK.
              </li>
            </ul>
            <p>
              Not every firm follows JIB rates — small firms often set their own. But the JIB
              rate is the industry benchmark, and if you ever end up on a unionised site or a
              big-contractor framework, JIB rates are usually the floor.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ECS — the Electrotechnical Certification Scheme"
            plainEnglish="Your site card. Issued by the JIB. Combines proof of qualification with a current health & safety assessment. Most main contractors won’t let you on site without one."
          >
            <p>
              ECS is the UK’s national skills card for the electrical industry. To get one you
              need:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Proof of your qualifications</strong> — apprenticeship, NVQ, AM2.
              </li>
              <li>
                <strong>A current ECS Health, Safety and Environmental Assessment</strong> — a
                40-question test, valid for 3 years. Sometimes called the "ESC test".
              </li>
            </ul>
            <p>
              Card grades line up with JIB grades — Apprentice, Trainee, Labourer, Electrician,
              Approved Electrician, Technician etc. As an apprentice you’ll start with an
              <strong> Apprentice ECS card</strong>, which gets upgraded as you progress.
            </p>
            <p>
              ECS is part of the <strong>CSCS</strong> family of construction site cards (the
              umbrella scheme for all trades). Most main contractors won’t let any trade on site
              without a valid card, full stop.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Professional bodies and standards</ContentEyebrow>

          <ConceptBlock
            title="IET — Institution of Engineering and Technology"
            plainEnglish="The professional body for engineers. Not a regulator. Not a competent person scheme. Membership for engineers and engineering apprentices — and the body that publishes BS 7671 (with BSI)."
          >
            <p>
              The IET is one of the world’s biggest engineering institutions, with around 168,000
              members worldwide. For electricians it matters because:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>It publishes BS 7671</strong> jointly with BSI — the actual book on the
                shelf is an IET publication. Same with the IET Guidance Notes (GN1–GN8), the
                On-Site Guide, and the IET Wiring Matters magazine.
              </li>
              <li>
                <strong>It runs the professional registration routes</strong> — Eng Tech
                (Engineering Technician), IEng (Incorporated Engineer), CEng (Chartered
                Engineer). These are letters after your name, recognised internationally.
              </li>
              <li>
                <strong>Apprentice and Student membership is cheap</strong> (sometimes free
                through your college) — gets you online access to BS 7671, the technical
                helpline, CPD events.
              </li>
            </ul>
            <p>
              The IET is a <em>professional body</em>. Joining doesn’t qualify you to do
              anything. It’s about professional development, networking, and the recognition that
              comes with letters after your name later in your career.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ECA — Electrical Contractors' Association"
            plainEnglish="A trade association for electrical contracting firms. Different from a competent person scheme — ECA membership is about commercial benefits, lobbying, and insurance, not about signing off your work."
          >
            <p>
              The ECA represents around 2,500 electrical contracting firms in the UK. It’s the
              employers' side of the JIB. What ECA membership actually buys a firm:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Trade body recognition</strong> — the ECA logo carries weight with
                clients, and ECA-vetted firms appear on procurement lists.
              </li>
              <li>
                <strong>Insurance-backed guarantees</strong> for customers (similar in concept to
                CPS warranties, but offered as a trade-body benefit).
              </li>
              <li>
                <strong>Technical, legal and HR helplines</strong> for member firms.
              </li>
              <li>
                <strong>A voice in industry policy</strong> — the ECA lobbies government on
                things like skills shortages, Part P, and the next BS 7671 amendment.
              </li>
            </ul>
            <p>
              ECA membership is NOT a substitute for NICEIC/NAPIT registration — different
              things. A firm can be in the ECA and not in any CPS, or vice versa, or both, or
              neither. They solve different problems.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BSI — British Standards Institution"
            plainEnglish="The UK’s national standards body. Publishes British Standards (BS …) including BS 7671. Standards aren’t law in themselves — but they’re how the law gets followed in practice."
          >
            <p>
              BSI publishes British Standards on everything from biscuits to electrical
              installations. For electricians the big one is{' '}
              <strong>BS 7671 — Requirements for Electrical Installations</strong> — published
              jointly by BSI and the IET.
            </p>
            <p>
              A British Standard isn’t automatically law. But:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Many regs (like EAWR) reference standards as the way to comply.
              </li>
              <li>
                Courts treat following the relevant British Standard as strong evidence you’ve
                done what’s reasonably practicable.
              </li>
              <li>
                Insurance and certification schemes assume you’re working to the standard.
              </li>
            </ul>
            <p>
              Other BSIs you’ll meet on the tools: BS 5839 (fire alarm systems), BS 5266
              (emergency lighting), BS EN 60898 (MCBs), BS EN 61008/61009 (RCDs/RCBOs). All
              published by BSI.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Quick reference — which body for what?</ContentEyebrow>

          <ConceptBlock title="The 'who do I call?' matrix">
            <p>
              Boil it down to the moment you actually need each one:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-emerald-400/70">
              <li>
                <strong>Got electrocuted on a construction site</strong> → HSE (RIDDOR-reportable
                under HASAWA).
              </li>
              <li>
                <strong>Got electrocuted in a Tesco</strong> → Local Authority Environmental
                Health (still RIDDOR, different inbox).
              </li>
              <li>
                <strong>Want to sign off your own consumer unit swap in a house</strong> →
                NICEIC, NAPIT, ELECSA or STROMA (CPS).
              </li>
              <li>
                <strong>Doing notifiable work but firm isn’t in a CPS</strong> → Building Control
                at the local council, before you start.
              </li>
              <li>
                <strong>Want to know your apprentice pay rate / holiday allowance / grade</strong>{' '}
                → JIB (or SJIB in Scotland).
              </li>
              <li>
                <strong>Need a card to walk through the gate on a commercial site</strong> →
                ECS (issued by JIB), with the H&S assessment up to date.
              </li>
              <li>
                <strong>Want to be a member of a professional body / get letters after your name</strong>{' '}
                → IET (Eng Tech, IEng, CEng routes).
              </li>
              <li>
                <strong>Firm wants commercial trade body membership / insurance benefits</strong> →
                ECA.
              </li>
              <li>
                <strong>Need to look up a British Standard</strong> → BSI publishes them; IET
                members get BS 7671 included online.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 16 (HSE HSR25 guidance)"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                This is the legal hook for the whole "competent person" idea. It doesn’t tell you
                WHICH body certifies competence — that’s why CPS schemes (NICEIC, NAPIT) and JIB
                grading exist. Each one is the industry’s answer to this reg, for a different
                slice of the work.
              </>
            }
            cite="Source: BS 7671 references EAWR Reg 16; HSE HSR25 'Memorandum of guidance on the EAWR'"
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "HSE = the regulator. Improvement notices, prohibition notices, prosecution. Doesn’t certify electricians.",
              "Local authorities split workplace H&S enforcement with HSE — same powers, different sectors.",
              "NICEIC, NAPIT, ELECSA, STROMA are Competent Person Schemes for Part P (England). They certify the FIRM, not you.",
              "JIB sets your pay, holiday, grade — and administers ECS (your site card). SJIB does the same in Scotland.",
              "IET is a professional body; it publishes BS 7671 with BSI and runs the Eng Tech / IEng / CEng routes.",
              "ECA is a trade body for contractor firms — different job from a CPS. BSI publishes British Standards (BS 7671 et al).",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Regulatory bodies knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building Regulations Part P
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — PPE and safe working
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
