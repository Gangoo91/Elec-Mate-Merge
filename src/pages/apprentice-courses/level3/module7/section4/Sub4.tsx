/**
 * Module 7 · Section 4 · Subsection 4 — Beyond the toolbox: industry charities + welfare
 * Maps to C&G 2365-03 / Unit 308 / LO2 — supplementary depth
 *   Extends LO2 with apprentice-relevant career pathway material on
 *   industry welfare, mental health and crisis support.
 *
 * The UK construction and electrical-industry charities — Electrical
 * Industries Charity (EIC), Lighthouse Construction Industry Charity, Mates
 * in Mind, Mind, Samaritans. What each does, how to access support, the
 * mental health context for the trade, and the practical steps to look
 * after yourself and your colleagues.
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

const TITLE = 'Beyond the toolbox — industry charities | Level 3 Module 7.4.4 | Elec-Mate';
const DESCRIPTION =
  'Electrical Industries Charity, Lighthouse Construction Industry Charity, Mates in Mind, Mind, Samaritans — UK industry welfare and mental health charities, what they offer and how to access support.';

const checks = [
  {
    id: 'mod7-s4-sub4-eic',
    question: "What is the Electrical Industries Charity (EIC)?",
    options: [
      "A trade body that lobbies government on behalf of electrical contractors and negotiates industry pay rates. Its main role is representing the commercial interests of firms, similar to the ECA, rather than providing welfare support to individuals.",
      "The awarding body that issues the C&G electrical qualifications and accredits training centres. Its purpose is setting and marking exams for apprentices, not supporting workers in hardship.",
      "An insurance scheme that electrical firms pay into to cover public liability and tool theft. It pays out on claims for damage and loss rather than offering personal welfare or mental health support.",
      "The UK welfare charity for people in the electrical and energy industries (and their families), giving financial, welfare and mental health support.",
    ],
    correctIndex: 3,
    explanation:
      "EIC is the dedicated welfare charity for the UK electrical industry. Services include financial grants in hardship, mental health support, bereavement support and family services, via a confidential helpline (0800 652 1618; electricalcharity.org) funded by industry donations. Anyone working in the sector and their families can access support — apprentices, electricians, designers, contracting staff. Knowing the EIC exists is itself important; using it when you need it is what it's there for.",
  },
  {
    id: 'mod7-s4-sub4-lighthouse',
    question:
      "What's the Lighthouse Construction Industry Charity helpline number?",
    options: [
      "0345 605 1956 — the free 24/7 Construction Industry Helpline run by the Lighthouse Charity (lighthouseclub.org).",
      "111 — you call NHS 111 and ask for the construction line, since Lighthouse operates as a branch of the NHS non-emergency service.",
      "999 — there is no separate Lighthouse number; the charity directs all callers to emergency services, treating construction mental health as an emergency.",
      "0800 652 1618 — the same number as the Electrical Industries Charity, because Lighthouse and the EIC share one combined helpline.",
    ],
    correctIndex: 0,
    explanation:
      "Lighthouse Construction Industry Helpline 0345 605 1956 is the headline number for any construction worker (including electrical) needing crisis support — 24/7, free and confidential. Lighthouse provides financial, physical and mental health support for workers and families: crisis grants, mental health support, bereavement counselling, addiction support and debt advice, plus a free wellbeing app. Memorise the number or save it in your phone — moments of crisis are not the time to be searching for helpline contacts. Lighthouse exists specifically because the construction sector has higher-than-average rates of mental health crisis.",
  },
  {
    id: 'mod7-s4-sub4-context',
    question:
      "Why is mental health a particular priority in UK construction (including electrical)?",
    options: [
      "Because electric shock is the single biggest cause of mental ill-health in the trade — near-miss trauma builds up over a career and drives the elevated rates.",
      "Because the regulations require every construction worker to undergo an annual mental health assessment, and the volume of assessments made it a priority.",
      "Because conditions in construction are almost entirely caused by exposure to solvents and dusts, making it a COSHH occupational-health issue not a welfare one.",
      "Because the sector has higher-than-average crisis and suicide rates than the general working-age population, driven by real structural factors of the work.",
    ],
    correctIndex: 3,
    explanation:
      "ONS data consistently shows higher mental health crisis and suicide rates in construction (including electrical) than in the wider working-age population. The contributing factors are real and structural — physical demands, irregular hours, frequent travel away from home, financial pressure of self-employment, a traditional culture of not talking about feelings, transient project-based working, and the cumulative impact of decades of physical work — not personal failings. Recognition of the issue has driven the charity infrastructure (Lighthouse, EIC, Mates in Mind), the Mental Health First Aider movement, and the cultural shift toward open conversation. Being aware of the context is part of being a competent professional in the sector.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's Mates in Mind?",
    options: [
      "A peer-support buddy scheme pairing every apprentice with an experienced electrician through training, focused on practical skills rather than mental health.",
      "A construction-industry charity raising mental health awareness — training, toolkits, campaigns and signposting, rather than direct counselling (matesinmind.org).",
      "A 24/7 telephone counselling service providing one-to-one therapy to construction workers in crisis, staffed by clinical psychologists rather than running training.",
      "A government hardship fund issuing emergency cash grants to construction workers who have lost income through illness or injury, run via the CITB levy.",
    ],
    correctAnswer: 1,
    explanation:
      "Mates in Mind is the construction industry's mental-health-awareness organisation. It provides training programmes (especially Mental Health First Aid), workplace toolkits, awareness campaigns and signposting to support services, focusing on creating mental-health-aware workplaces rather than providing counselling directly. Its training has been adopted by many UK construction firms. Different from Lighthouse and EIC, which provide direct support — Mates in Mind focuses on prevention and culture change. All three (plus Mind, Samaritans) form a complementary support ecosystem.",
  },
  {
    id: 2,
    question: "What's a Mental Health First Aider?",
    options: [
      "A clinical psychologist embedded on larger sites to deliver ongoing therapy and prescribe medication to workers, equivalent to an on-site doctor.",
      "A worker who has done standard physical first aid training and is therefore also authorised to handle any mental health emergency on one combined certificate.",
      "Someone trained to spot early signs of mental health difficulty, listen non-judgementally, give initial support and signpost to professional help.",
      "A statutory role every employer with five or more staff must appoint by law, with powers to refer staff for mandatory assessment under the Equality Act.",
    ],
    correctAnswer: 2,
    explanation:
      "Mental Health First Aider training is the construction industry's emerging standard for workplace mental health support — the parallel to physical First Aid training. The standard 2-day course (delivered by Mates in Mind, MHFA England and others) costs around £150-300, and many UK firms now have one or more MHFAs on staff alongside physical First Aiders. The MHFA isn't a counsellor; they're trained to spot signs, offer initial support and signpost to professional help. Many JIB-graded firms now train at least one per crew or office. Worth considering if your firm doesn't yet have one.",
  },
  {
    id: 3,
    question: "What's Mind and how does it relate to construction-specific charities?",
    options: [
      "A construction-only charity competing with Lighthouse, offering the same crisis helpline and hardship grants to different member firms and duplicating its services.",
      "The mental health arm of the NHS, providing the clinical talking-therapy services (IAPT) that GPs refer patients to — a government body, not a charity.",
      "A workplace training provider delivering the Mental Health First Aid course to construction firms in competition with Mates in Mind, with no public helpline.",
      "The UK's largest general mental health charity (not construction-specific) — information, advice, a helpline (0300 123 3393), support groups and signposting for any adult.",
    ],
    correctAnswer: 3,
    explanation:
      "Mind is the foundational UK general mental health charity, not construction-specific. It provides information, advice, a helpline (0300 123 3393), support groups and signposting for any UK adult experiencing difficulty — the Mind website (mind.org.uk) has detailed information on every common condition and where to get help. Construction-specific charities (Lighthouse, EIC, Mates in Mind) complement Mind by providing sector-specific context and infrastructure. Both are valuable; many people use Mind for general resources and a sector-specific charity for direct support.",
  },
  {
    id: 4,
    question: "What's the Samaritans helpline?",
    options: [
      "116 123 — Samaritans' free, confidential 24/7 helpline for anyone in emotional distress, not just crisis.",
      "0800 1111 — Samaritans' free helpline, sharing a switchboard with Childline and routing adult callers to Samaritans volunteers.",
      "101 — the Samaritans non-emergency line, run jointly with the police to connect callers in distress to a welfare officer.",
      "0300 123 3393 — Samaritans' daytime advice line, open weekdays only, providing information and signposting rather than 24-hour support.",
    ],
    correctAnswer: 0,
    explanation:
      "Samaritans 116 123 is the most widely known UK emotional support helpline — free, 24/7, confidential and non-judgemental, for anyone in emotional difficulty (it doesn't have to be crisis level). Samaritans also offer email (jo@samaritans.org), text ('SHOUT' to 85258) and face-to-face appointments at branches, and are universally accessible regardless of sector. They listen; they don't give advice or push solutions. Memorise the number and pass it on to colleagues if needed.",
  },
  {
    id: 5,
    question: "Can EIC give financial grants to apprentices?",
    options: [
      "No — EIC grants are reserved for fully-qualified and retired workers; apprentices aren't yet contributors and must use their college's hardship fund.",
      "Yes — EIC gives hardship grants to anyone in the UK electrical/energy industry, including apprentices, applying via electricalcharity.org.",
      "No — EIC only offers loans, not grants, so an apprentice would need a guarantor and a repayment plan before any money was released.",
      "Only if the apprentice's employer is a paying member — support is means-tested against the firm's donation, so apprentices at non-donating firms are ineligible.",
    ],
    correctAnswer: 1,
    explanation:
      "EIC grants are accessible to anyone in the sector regardless of grade, including apprentices facing financial hardship through illness, family crisis, redundancy or other shock. Grants typically cover a specific need (rent arrears, urgent medical equipment, transport during illness, childcare during a family crisis), varying by need in roughly the £200-2,500 range, and are confidential. Grants are modest but timely; £500 at the right moment can prevent a crisis cascading. Application is straightforward; treat it as the practical resource it is, not a last-resort embarrassment.",
  },
  {
    id: 6,
    question: "What's the Lighthouse wellbeing app?",
    options: [
      "A paid subscription app tracking physical fitness, step count and sleep, marketed to construction workers to stay healthy on site, with no mental health content.",
      "A site-management app logging toolbox talks and induction records, branded by Lighthouse, used by supervisors to evidence welfare briefings for CDM.",
      "A free Lighthouse smartphone app with wellbeing resources, helpline access, self-help content and signposting, on App Store and Google Play.",
      "A booking app for Lighthouse's paid counselling sessions, where workers pay per session and schedule appointments with private therapists through the charity.",
    ],
    correctAnswer: 2,
    explanation:
      "The Lighthouse app is a free resource from the Construction Industry Charity, providing wellbeing resources, helpline access, financial planning tools, mental health self-help content and signposting, designed for quick access to the crisis helpline if needed. It installs in 30 seconds. Recommend installing as a precaution even if you don't think you need it; in a moment of crisis, quick access to the right helpline matters. Pass the recommendation to colleagues — small action, potentially big impact.",
  },
  {
    id: 7,
    question: "Are these helplines really confidential?",
    options: [
      "No — calls are routinely shared with your employer's HR so they can offer workplace support, which is why many workers are reluctant to use them.",
      "Only if you pay for a private call — the free lines log and share caller details, while the charities fund themselves partly by selling anonymised call data.",
      "No — helpline staff must report every caller to their GP, so anything you say ends up on your medical record and could affect future employment.",
      "Yes, properly so — Lighthouse, Samaritans, EIC and Mind all operate strict confidentiality, with the only exception being immediate risk to life.",
    ],
    correctAnswer: 3,
    explanation:
      "Confidentiality is fundamental to the helplines' purpose — without it people wouldn't call. Calls are not recorded for sharing; staff are bound by confidentiality agreements; details are not shared with employers or any third party, the only exception being immediate risk to life under safeguarding rules (where emergency services may be contacted, and even then most callers cooperate). You can call anonymously if you prefer. Operations are bound by data protection law (GDPR), professional codes and the charities' own policies. The fear of being identified keeps people from calling — but the confidentiality is real. Trust it; pick up the phone.",
  },
  {
    id: 8,
    question: "If you notice a colleague struggling, what should you do?",
    options: [
      "Have a quiet, private check-in — listen without trying to fix, mention what you've noticed, and signpost the helplines without making it a big thing.",
      "Report your concern straight to the site manager so it goes on the worker's record and the firm decides whether they are fit to keep working.",
      "Say nothing and give them space — raising it risks embarrassing them, and someone struggling will ask for help themselves when they are ready.",
      "Get them on their own and tell them firmly to sort themselves out and stop letting it affect their work, because a direct push is what most people need.",
    ],
    correctAnswer: 0,
    explanation:
      "A quiet, specific, non-judgemental check-in is the right starting move: pick a private moment ('cup of tea after this job?'), listen without trying to fix, mention specific things you've noticed ('you've seemed a bit quieter this week'), don't push, signpost the helplines (Lighthouse 0345 605 1956, Samaritans 116 123) lightly, and check in again next week. Most people in difficulty don't ask for help directly — they hint, withdraw or change patterns. Noticing the change and offering a moment of conversation can be the difference. Mental Health First Aider training gives you structured tools for these conversations. Don't try to be a counsellor; be a colleague who notices and cares, and let them choose.",
  },
];

const faqs = [
  {
    question: "Do I have to be in crisis to use these services?",
    answer:
      "No. The helplines (Lighthouse 0345 605 1956, Samaritans 116 123, Mind 0300 123 3393) are for anyone experiencing emotional difficulty — doesn't have to be crisis level. EIC grants are for anyone in financial hardship, not just at the bottom of the cliff. Reaching out early is normal and useful; you don't have to wait for things to be 'bad enough'. Better to call when difficulty is manageable than to wait for crisis.",
  },
  {
    question: "Can my employer find out if I call a helpline?",
    answer:
      "No — helpline confidentiality is fundamental. Lighthouse, Samaritans, EIC, Mind all bind staff to strict confidentiality. Records are not shared with employers, insurance, or any third party (except in safeguarding circumstances of immediate risk to life). You can call anonymously if you prefer. Many UK construction workers worry about this; the confidentiality is real and protected by law.",
  },
  {
    question: "What about face-to-face support?",
    answer:
      "Several routes. Samaritans branches in many UK towns offer face-to-face appointments. NHS GP referral to local mental health services (often a wait, but valid route). Private counselling (BACP-accredited counsellors at counselling-directory.org.uk; cost typically £40-80/session). Some employer EAP (Employee Assistance Programmes) include free counselling. EIC and Lighthouse can help signpost to local services.",
  },
  {
    question: "Is it expensive to get help?",
    answer:
      "The helplines (Lighthouse, Samaritans, Mind) are all free. EIC grants are gifts, not loans. NHS mental health services are free at point of use (NHS in England, Wales, Scotland, NI). Private counselling typically £40-80/session if you go that route. Money should not be the reason you don't get help; the free routes are real and substantive.",
  },
  {
    question: "Do these charities only help with mental health?",
    answer:
      "No. EIC and Lighthouse provide broader welfare support — financial grants, debt advice, addiction support, bereavement support, family support, transport assistance during illness, childcare in crisis, retraining grants. Mental health is part of their work but not the only part. If you're facing any kind of significant difficulty in your life or family, they may be able to help.",
  },
  {
    question: "How can I support charity work in the trade?",
    answer:
      "Volunteer (Lighthouse, EIC and Mates in Mind all welcome volunteers). Donate (one-off or regular). Pay-roll giving via your employer. Take MHFA training and become a Mental Health First Aider for your firm or site. Talk about mental health openly with colleagues — that's free and changes culture. Many electricians give back through running charity events (golf days, marathons, sponsored activities).",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 4"
            title="Beyond the toolbox — industry charities + welfare"
            description="EIC, Lighthouse, Mates in Mind, Mind, Samaritans — UK industry welfare and mental health charities. What they offer, how to access support, looking after yourself and colleagues."
            tone="emerald"
          />

          <TLDR
            points={[
              "Lighthouse Construction Industry Charity — 24/7 helpline 0345 605 1956. Financial, physical and mental health support for construction workers and families.",
              "Electrical Industries Charity (EIC) — sector-specific welfare charity. 0800 652 1618. Hardship grants, mental health support, family services. electricalcharity.org.",
              "Mates in Mind — construction mental health awareness. Mental Health First Aider training, workplace toolkits, signposting.",
              "Mind 0300 123 3393 — UK general mental health charity. Information, advice, support groups.",
              "Samaritans 116 123 — 24/7 emotional support helpline. Confidential, non-judgemental. Anyone, any time.",
              "Construction (including electrical) has higher-than-average mental health crisis and suicide rates than wider UK working-age population — the charities exist precisely because the sector recognises the issue.",
              "Confidentiality of helplines is real and protected. You don't have to be in crisis to use them — early reach-out is healthier than waiting.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 with apprentice-relevant career pathway material on industry welfare, mental health and crisis support.",
              "Identify the main UK construction and electrical-industry charities (EIC, Lighthouse, Mates in Mind, Mind, Samaritans).",
              "State the headline helpline numbers and what each charity offers.",
              "Identify the structural mental health context for the construction sector (higher-than-average crisis rates).",
              "State the role of Mental Health First Aider training in modern construction workplaces.",
              "Identify how to support a colleague who's struggling — quiet check-in, listen, signpost to helplines.",
              "Identify the confidentiality protections that apply to helplines and support services.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The industry welfare charities</ContentEyebrow>

          <ConceptBlock
            title="Lighthouse, EIC, Mates in Mind — sector-specific support"
            plainEnglish="Three UK charities are most directly relevant to construction and electrical workers. Lighthouse Construction Industry Charity provides 24/7 crisis support and financial grants. Electrical Industries Charity (EIC) provides similar support specifically for the electrical sector. Mates in Mind focuses on workplace mental health awareness and Mental Health First Aider training. Together they form a complementary support ecosystem alongside general charities (Mind, Samaritans)."
            onSite="Knowing these charities exist is itself important. Reaching out is a sign of strength, not weakness. The Lighthouse 24/7 helpline (0345 605 1956) and Samaritans (116 123) are the two numbers worth memorising. Save them in your phone. Pass them on to colleagues who might need them. Many lives have been preserved because someone made a call at the right moment."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Lighthouse Construction Industry Charity
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  24/7 helpline 0345 605 1956. Financial grants, mental health support,
                  bereavement counselling, addiction support, debt advice. Free smartphone
                  app. lighthouseclub.org.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Electrical Industries Charity (EIC)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Sector-specific welfare. 0800 652 1618. Hardship grants, mental health
                  support, family services, bereavement support. Funded by industry
                  donations. electricalcharity.org.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Mates in Mind
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Construction mental health awareness. Mental Health First Aider training,
                  workplace toolkits, awareness campaigns, signposting.
                  matesinmind.org.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Mind + Samaritans (general)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Mind 0300 123 3393 &mdash; general mental health charity, information and
                  signposting. Samaritans 116 123 &mdash; 24/7 emotional support helpline,
                  confidential, anonymous.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The mental health context</ContentEyebrow>

          <ConceptBlock
            title="Why mental health is a sector priority"
            plainEnglish="UK construction (including electrical) has consistently higher-than-average rates of mental health crisis and suicide compared to the wider working-age population. ONS data shows the sector at significantly elevated risk. Contributing factors are real and structural — physical demands, irregular hours, frequent travel away from home, financial pressure of self-employment, traditional culture of not talking about feelings, transient project-based working patterns, cumulative impact of decades of physical work. The sector has recognised the issue and the charities exist precisely to address it."
            onSite="Awareness of the context is part of being a competent professional in the sector. The pattern isn't personal failing — it's structural. Talking about it openly is healthier than treating it as taboo. The cultural shift across UK construction in the last decade (driven by Mates in Mind, Lighthouse, EIC and the wider MHFA movement) is real and continuing. You're part of that shift just by knowing the issue exists."
          >
            <p>
              Why structural factors matter for construction mental health:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Physical demands &mdash; cumulative wear-and-tear; chronic pain.</li>
              <li>Irregular hours &mdash; early starts, weekend work, project deadlines.</li>
              <li>Travel away from home &mdash; rotational, distant projects, lodging.</li>
              <li>Financial pressure &mdash; self-employment income volatility; late payment.</li>
              <li>Project-based work &mdash; ending one project, finding the next.</li>
              <li>Traditional culture &mdash; not talking about feelings; pressure to be tough.</li>
              <li>Substance use &mdash; alcohol common in industry social culture.</li>
              <li>Loneliness &mdash; particularly for sole traders working alone day-to-day.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mental Health First Aider — the workplace response"
            plainEnglish="Mental Health First Aider (MHFA) training is the construction industry's emerging standard for workplace mental health support — the parallel to physical First Aid training. MHFAs are trained to recognise the early signs of mental health difficulty in colleagues, listen non-judgementally, provide initial support and signpost to professional help. Standard 2-day training course (delivered by Mates in Mind, MHFA England and others) costs around £150-300."
            onSite="Many UK construction firms now have one or more Mental Health First Aiders on staff. JIB-graded firms increasingly include MHFA in their welfare provision. As an apprentice or improver, knowing whether your firm has an MHFA matters — it's a confidential first port of call if you're struggling. As a senior electrician, considering MHFA training yourself is one of the most useful things you can do for your colleagues."
          >
            <p>
              MHFA training and role:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2-day course; £150-300 typical cost; delivered by accredited providers.</li>
              <li>Trained to recognise early signs of mental health difficulty.</li>
              <li>Listen non-judgementally; offer initial support.</li>
              <li>Signpost to professional help (GP, helpline, EAP, charity).</li>
              <li>Not a counsellor &mdash; first responder role, not therapy.</li>
              <li>Refresher recommended every 3 years to maintain currency.</li>
              <li>Many firms now include MHFA alongside physical First Aider provision.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="Equality Act 2010 — disability and mental health (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Equality Act 2010 protects against discrimination on the basis of
                  protected characteristics including disability. Mental health conditions
                  can be a disability under the Act if they have a substantial and long-term
                  adverse effect on the person&apos;s ability to carry out normal day-to-day
                  activities. Headline implications:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Reasonable adjustments duty &mdash; employer must make reasonable
                    adjustments for disabled employees including those with mental health
                    conditions.
                  </li>
                  <li>
                    Direct discrimination prohibited &mdash; treating someone less favourably
                    because of mental health-related disability.
                  </li>
                  <li>
                    Indirect discrimination prohibited &mdash; applying a provision that
                    puts disabled persons at a particular disadvantage without justification.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                Mental health conditions causing substantial long-term effects are protected
                under the Equality Act. As an employee or apprentice you have legal
                protection from discrimination and a right to reasonable adjustments. As an
                employer you have corresponding obligations. Open conversations about mental
                health are easier when both sides understand the legal context isn&apos;t
                hostile.
              </>
            }
            cite="Source: Equality Act 2010 (c.15) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="HASAWA s.2 (general duties of employers) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  HASAWA s.2 places duties on employers to ensure, so far as is reasonably
                  practicable, the health, safety and welfare of all employees. The duty
                  extends to mental health as well as physical health. Practical
                  implications:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Risk assessment to consider mental health hazards (workload, stress, isolation).</li>
                  <li>Provision of welfare facilities and support.</li>
                  <li>Information, instruction and training including on mental health awareness.</li>
                  <li>Safe systems of work that take cumulative impacts into account.</li>
                </ul>
              </>
            }
            meaning={
              <>
                HASAWA covers mental health as well as physical health. HSE expects
                employers to take mental health into account in risk assessments and
                workplace welfare. The MHFA movement and welfare charities are part of how
                the sector discharges this duty. As an employee or apprentice you have a
                right to a workplace that takes mental health seriously.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Working Time Regulations 1998 (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Working Time Regulations 1998 set limits on working hours and rest:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Maximum 48-hour average working week (with opt-out option).</li>
                  <li>Minimum 11 hours&apos; rest in any 24-hour period.</li>
                  <li>Minimum 24 hours&apos; rest in any 7-day period.</li>
                  <li>20-minute rest break for shifts over 6 hours.</li>
                  <li>Statutory paid annual leave (currently 5.6 weeks/year for full-time).</li>
                </ul>
              </>
            }
            meaning={
              <>
                Working Time Regulations exist partly because excessive hours damage mental
                and physical health. JIB-graded contracts typically improve on the statutory
                minimum. Self-employed practitioners are not covered by WTR but the
                principles still apply &mdash; chronic overwork is a major mental health
                risk factor. Manage your own hours sustainably.
              </>
            }
            cite="Source: Working Time Regulations 1998 (SI 1998/1833) — paraphrased from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Waiting until crisis to reach out"
            whatHappens={
              <>
                Apprentice or improver experiences gradual decline &mdash; sleep getting
                worse, mood low, withdrawing from social activities, drinking more.
                Doesn&apos;t recognise the pattern as mental health difficulty; treats it as
                personal weakness or just a bad period. Months pass. Eventually a crisis
                point hits &mdash; relationship breakdown, job loss, suicidal thoughts.
                Reaches out at this point but the crisis is harder to resolve than the
                early-warning signs would have been.
              </>
            }
            doInstead={
              <>
                Reach out early. The helplines and charities are there for any difficulty,
                not just crisis. A 30-minute call to Samaritans (116 123) when you&apos;re
                struggling but functioning is healthier than a 30-second call when
                you&apos;re in crisis. Talk to your GP early about persistent low mood,
                sleep problems or anxiety &mdash; many UK GPs are now well-equipped to
                signpost or prescribe early intervention. Notice your patterns; act on
                them.
              </>
            }
          />

          <Scenario
            title="Colleague Phil is struggling — what's the right approach?"
            situation={
              <>
                You&apos;ve worked alongside Phil for two years on a JIB-graded contractor
                site. Last few weeks Phil has seemed quieter than usual, taking more sick
                days, snapping at small things, not joining in lunch conversations. Last
                Friday he made a passing comment about &quot;sometimes wondering if it&apos;s
                worth it&quot;. You&apos;re not sure if he meant work or something more.
                What do you do?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; pick a moment</strong>. Wait for a quiet moment
                (Friday end-of-day works for many people; a Monday-morning canteen sit-down
                also works). Don&apos;t make it a big formal sit-down &mdash; that can feel
                threatening. &quot;Cup of tea after this job?&quot; or similar.
                <br /><br />
                <strong>Step 2 &mdash; mention what you&apos;ve noticed</strong>. Be
                specific and non-judgemental. &quot;I&apos;ve noticed you&apos;ve seemed a bit
                quieter the last few weeks. How are things really?&quot; Don&apos;t try to
                diagnose; just open the door.
                <br /><br />
                <strong>Step 3 &mdash; listen</strong>. If Phil opens up, listen without
                trying to fix. Don&apos;t interrupt. Don&apos;t offer advice unless asked.
                Just hear what he&apos;s actually saying. The simple act of being heard is
                often more valuable than any advice you could offer.
                <br /><br />
                <strong>Step 4 &mdash; signpost</strong>. Mention the helplines casually:
                &quot;Lighthouse have a 24/7 helpline if you ever want to talk to someone
                outside work &mdash; 0345 605 1956. Samaritans 116 123 too.&quot; Don&apos;t
                push him to call; just make sure he knows the numbers exist.
                <br /><br />
                <strong>Step 5 &mdash; check back next week</strong>. The most important
                thing is consistency. Check in casually next week (&quot;how was your
                weekend?&quot;); the week after; the week after. Persistent care over time
                is what makes the difference.
                <br /><br />
                <strong>Step 6 &mdash; if you genuinely worry about immediate
                safety</strong>. If Phil mentions suicidal thoughts directly, take it
                seriously. Encourage him to call Samaritans (116 123) right then. If you
                have genuine concern about immediate risk, calling 999 or the GP for an
                urgent appointment is appropriate. Better to over-respond than
                under-respond when life is potentially at risk.
              </>
            }
            whyItMatters={
              <>
                The construction industry has lost too many colleagues to mental health
                crisis. The cultural shift toward open conversation, MHFA training, and
                visible signposting to helplines has saved lives. Being the colleague who
                notices and quietly checks in &mdash; without making a fuss &mdash; is one
                of the most valuable things you can do. You don&apos;t have to be a
                counsellor; you just have to care enough to ask. Pass the helpline numbers
                to anyone who might need them.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Welfare infrastructure — the practical access points</ContentEyebrow>

          <ConceptBlock
            title="Lighthouse Construction Industry Charity — the 24/7 helpline you should memorise"
            plainEnglish="The Lighthouse Construction Industry Charity runs the free Construction Industry Helpline (0345 605 1956) — open 24/7, completely confidential, staffed by trained advisers. They support construction workers (including electricians) and their families with mental health crisis intervention, financial hardship grants, debt advice, bereavement support, and signposting to specialist services. Funded by industry donations, no charge to caller, no reporting back to employer. Lighthouse also runs the Helpline App — same access, in-app text chat option for those who prefer not to phone."
            onSite="Memorise the number — 0345 605 1956. Save it in your phone now. Pass it to colleagues if they're going through a tough time. The helpline handles ~3,000+ calls/month from construction workers — the demand is real, and the service is genuinely confidential. Lighthouse also runs Lighthouse Beacon (community awareness events), Lighthouse Tax Helpline (specific tax/financial advice), and emergency financial hardship grants for workers in genuine crisis (typically £250-1,500 quick-turn grants for emergencies like delayed wages, family bereavement, sudden illness). The charity exists because construction workers historically didn't access mainstream mental health services."
          >
            <p>
              Lighthouse services and access:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Construction Industry Helpline</strong> &mdash; 0345 605 1956, 24/7, free, confidential.
              </li>
              <li>
                <strong>Helpline App</strong> &mdash; iOS/Android, text chat option.
              </li>
              <li>
                <strong>Hardship grants</strong> &mdash; emergency financial support, typically &pound;250&ndash;1,500.
              </li>
              <li>
                <strong>Mental health crisis support</strong> &mdash; immediate access to trained advisers.
              </li>
              <li>
                <strong>Bereavement support</strong> &mdash; family support after loss of a worker.
              </li>
              <li>
                <strong>Lighthouse Beacon</strong> &mdash; community awareness, on-site mental health events.
              </li>
              <li>
                <strong>Funded by industry donations</strong> &mdash; not Government, free at point of use.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Electrical Industries Charity (EIC) — the electrical-sector specific support"
            plainEnglish="The Electrical Industries Charity (electricalcharity.org) is the welfare charity specifically for the UK electrical industry — workers, retired workers, and their families. Founded 1905, EIC provides hardship grants (similar to Lighthouse but electrical-sector specific), mental health support, family support services, bereavement counselling, and an apprentice support programme. EIC is funded by industry-level corporate donations from major electrical contractors and manufacturers. Apprentices and families of working electricians are eligible for support without industry contribution requirement."
            onSite="EIC complements Lighthouse — both are charities, both serve the construction/electrical workforce, both offer hardship grants and welfare support. EIC is specifically electrical-sector focused, with longer-running case management for sustained support (e.g. ongoing hardship for a long-term illness). Lighthouse is broader construction-sector. For an electrical worker in difficulty, contact either or both — they actively coordinate where casework overlaps. EIC's apprentice-specific programmes include hardship support for apprentices facing financial difficulty during training."
          >
            <p>
              EIC services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hardship grants</strong> &mdash; emergency and ongoing financial support.
              </li>
              <li>
                <strong>Mental health support</strong> &mdash; counselling and wellbeing services.
              </li>
              <li>
                <strong>Family support</strong> &mdash; for partners and children of electrical workers.
              </li>
              <li>
                <strong>Bereavement support</strong> &mdash; counselling and practical assistance.
              </li>
              <li>
                <strong>Apprentice support</strong> &mdash; specific programmes for apprentices in difficulty.
              </li>
              <li>
                <strong>Retired worker support</strong> &mdash; for former electrical industry workers.
              </li>
              <li>
                <strong>Contact</strong> &mdash; electricalcharity.org, helpline access.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mates in Mind — the awareness and prevention charity"
            plainEnglish="Mates in Mind (matesinmind.org) is the construction industry mental health awareness charity, founded 2017. Unlike Lighthouse (crisis support) and EIC (welfare grants), Mates in Mind focuses on awareness, prevention and culture change — running training programmes, workplace toolkits, manager-level awareness courses, and the 'Start the Conversation' campaign that gives front-line workers practical language and confidence to approach a colleague who may be struggling. Many employers now require Mates in Mind awareness training for site supervisors and Mental Health First Aiders."
            onSite="Mates in Mind training is available at multiple levels — short awareness sessions (1-2 hours, suitable for all site workers), supervisor-level training (half-day, focused on noticing and supporting), and full Mental Health First Aid (MHFA) certification (2-day course, ~£300, equivalent to physical first aid). Many CDM-regulated sites now have visible MHFA-certified colleagues identifiable by green hard hat stickers. Becoming a MHFA is one of the most useful things a senior electrician or supervisor can do — practical training that makes you genuinely useful in early-stage colleague support, far before a Lighthouse/Samaritans intervention is needed."
          >
            <p>
              Mates in Mind training stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Start the Conversation</strong> &mdash; 1&ndash;2 hour awareness session.
              </li>
              <li>
                <strong>Supervisor toolkit</strong> &mdash; half-day, manager-focused.
              </li>
              <li>
                <strong>MHFA (Mental Health First Aid)</strong> &mdash; 2-day full certification, ~&pound;300.
              </li>
              <li>
                <strong>Workplace toolkits</strong> &mdash; downloadable resources for employers.
              </li>
              <li>
                <strong>Awareness campaigns</strong> &mdash; visible signposting (green hat sticker, posters, screensavers).
              </li>
              <li>
                <strong>Industry partnerships</strong> &mdash; integrated with main contractor inductions.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mind, Samaritans and the wider mental health infrastructure"
            plainEnglish="Beyond construction-specific charities, the wider UK mental health infrastructure remains essential. Mind (0300 123 3393, weekdays 9-6) provides advice, information and signposting for mental health issues across all sectors. Samaritans (116 123, 24/7, free, confidential) provides emotional support for anyone in distress, suicidal feelings or grief. NHS 111 routes to mental health crisis teams in your area. Local IAPT (Improving Access to Psychological Therapies) services provide free counselling and CBT through GP referral. All free at the point of use; all completely confidential."
            onSite="Different services suit different moments. Lighthouse is excellent for construction-context support (the adviser will understand site work, JIB issues, contractor stress). Mind offers structured information and signposting for ongoing issues. Samaritans is the immediate crisis-line for anyone in acute distress — you don't have to be 'suicidal' to call, just in distress. NHS routes (GP, 111, local crisis team) are for ongoing clinical care. Save all numbers in your phone. Pass them to colleagues. The cumulative network is comprehensive — nobody in the UK should be unable to access mental health support, but they often need someone to point them at the right door."
          >
            <p>
              UK mental health support contacts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighthouse Helpline</strong> &mdash; 0345 605 1956, 24/7, construction-focused.
              </li>
              <li>
                <strong>Samaritans</strong> &mdash; 116 123, 24/7, free, anyone in distress.
              </li>
              <li>
                <strong>Mind</strong> &mdash; 0300 123 3393, weekdays 9&ndash;6, advice and information.
              </li>
              <li>
                <strong>NHS 111</strong> &mdash; mental health crisis routing.
              </li>
              <li>
                <strong>NHS 999</strong> &mdash; immediate emergency, life at risk.
              </li>
              <li>
                <strong>SHOUT text</strong> &mdash; 85258, text-based crisis support.
              </li>
              <li>
                <strong>CALM (Campaign Against Living Miserably)</strong> &mdash; 0800 58 58 58, men's mental health, 5pm&ndash;midnight.
              </li>
              <li>
                <strong>EIC</strong> &mdash; electricalcharity.org, electrical-sector welfare.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The supervisor's role — noticing without overstepping"
            plainEnglish="Senior electricians, foremen and supervisors are often the first to notice when a colleague is struggling — the apprentice who's gone quiet, the experienced electrician who's snappy and turning up late, the workmate whose work quality has dipped. The right response isn't amateur counselling — it's a low-key check-in ('You alright? You don't seem yourself this week.'), genuine listening without immediate fix-it advice, and practical signposting to professional support (Lighthouse, Mind, Samaritans, GP). MHFA training (£300, 2 days) gives you the framework to do this well without feeling out of your depth."
            onSite="The cultural shift in UK construction over the last decade has been substantial — mental health is now an open conversation on most sites, not a hidden problem. As a senior electrician you have a quiet responsibility to check in on colleagues — particularly apprentices (often facing financial pressure, course pressure, isolation from family). Most check-ins go nowhere — and that's fine. Some uncover real distress, and the practical signposting you provide can be life-saving. Don't try to be a counsellor; do be the colleague who notices and asks. Save the helpline numbers. Pass them on quietly when relevant."
          >
            <p>
              The supervisor's mental health checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notice</strong> &mdash; behaviour changes, isolation, work quality dip, absence patterns.
              </li>
              <li>
                <strong>Approach</strong> &mdash; low-key, private, genuine ('You alright?').
              </li>
              <li>
                <strong>Listen</strong> &mdash; no immediate fix-it advice; let them talk.
              </li>
              <li>
                <strong>Signpost</strong> &mdash; Lighthouse 0345 605 1956, Samaritans 116 123, GP, MHFA.
              </li>
              <li>
                <strong>Follow up</strong> &mdash; check back a few days later, quietly.
              </li>
              <li>
                <strong>Don't be the counsellor</strong> &mdash; refer on; you're not trained.
              </li>
              <li>
                <strong>MHFA training</strong> &mdash; 2 days, ~&pound;300, gives you the framework.
              </li>
              <li>
                <strong>Confidentiality</strong> &mdash; respect it absolutely; it's the trust that makes the conversation possible.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Lighthouse Construction Industry Charity — 24/7 helpline 0345 605 1956. Financial, physical, mental health support. Free smartphone app.",
              "Electrical Industries Charity (EIC) — sector-specific. 0800 652 1618. Hardship grants, mental health, family services. electricalcharity.org.",
              "Mates in Mind — construction mental health awareness; Mental Health First Aider (MHFA) training; workplace toolkits.",
              "Samaritans 116 123 — 24/7 confidential emotional support helpline. Memorise the number.",
              "Mind 0300 123 3393 — UK general mental health charity. Information, advice, support groups.",
              "Construction (including electrical) has higher-than-average mental health crisis and suicide rates than wider UK working-age population — structural factors, not personal failing.",
              "Helpline confidentiality is real and protected — don't let fear of being identified prevent reaching out.",
              "Mental Health First Aider training (£150-300, 2-day course) — increasingly standard in UK construction; consider for yourself or your firm.",
              "Equality Act 2010, HASAWA s.2 and Working Time Regulations all underpin mental health protections at work.",
              "Reaching out early is healthier than waiting for crisis. Helplines and charities are there for any difficulty, not just rock bottom.",
            ]}
          />

          <Quiz title="Industry charities and welfare — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.3 Online learning + scheme CPD
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Beyond electrical
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
