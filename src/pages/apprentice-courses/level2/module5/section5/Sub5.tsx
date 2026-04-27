/**
 * Module 5 · Section 5 · Subsection 5 — Mental health and neurodiversity in the trade
 *
 * Supplementary content — extends LO3 of Unit 210 with industry-relevant
 * well-being and neurodiversity awareness. Mental health is treated here as
 * a peer-support and signposting topic, not clinical diagnosis. The Sub is
 * factual, empathetic and signposts UK charity helplines and reasonable
 * adjustments. It does not provide clinical advice and it does not diagnose.
 *
 * The intent is that the apprentice finishes the Sub equipped to:
 *   (a) help a peer who is struggling, and
 *   (b) seek help themselves if they are struggling.
 *
 * Key UK charities referenced:
 *   - Mates in Mind (matesinmind.org) — construction-focused mental health
 *   - Lighthouse Construction Industry Charity (lighthouseclub.org) —
 *     24/7 helpline 0345 605 1956 + financial assistance for trade workers
 *   - Electrical Industries Charity (electricalcharity.org) — financial and
 *     welfare support specifically for the electrical industry
 *   - Samaritans (samaritans.org) — 116 123, 24/7
 *   - Mind (mind.org.uk) — 0300 123 3393
 *
 * UK statistics referenced:
 *   - ONS data on construction-sector suicide rates (around 3x national male average)
 *   - Higher prevalence of dyslexia, ADHD and autism in trade roles
 *
 * Tone: respectful, factual, signpost don't diagnose, no clinical advice,
 *       no drug or dose details, talking saves lives.
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
  'Mental health and neurodiversity in the trade | Level 2 Module 5.5.5 | Elec-Mate';
const DESCRIPTION =
  'Construction has the highest suicide rate of any UK sector (ONS data). Mates in Mind, Lighthouse Club and Electrical Industries Charity provide support. Neurodiversity is common in the trade. Peer support and signposting — not clinical advice.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s5-sub5-peer',
    question:
      "A fellow apprentice tells you he's not been sleeping, missed two weeks of college, can't concentrate at work, and feels like he's letting everyone down. He doesn't want a fuss made. What's your response?",
    options: [
      "Tell him to 'man up' and stop being soft.",
      "Listen properly. Don't interrupt, don't try to fix it, don't minimise ('it'll pass'). Acknowledge what he's said and that it sounds hard. Don't diagnose or guess what's going on. Suggest some routes for support — Mates in Mind (free training and resources via matesinmind.org), the Lighthouse Construction Industry Charity 24/7 helpline (0345 605 1956), the Electrical Industries Charity (electricalcharity.org), Samaritans (116 123, 24/7), or his GP. Ask whether he'd like you to mention to your training-provider mentor, but don't break his confidence without asking. Follow up with him in a few days. Keep listening over time.",
      "Tell every other apprentice in the cohort.",
      "Avoid him because mental health stuff makes you uncomfortable.",
    ],
    correctIndex: 1,
    explanation:
      "Peer support in the trade is about listening, signposting and following up — not diagnosing or fixing. The Mates in Mind 'Start the Conversation' framework, the Lighthouse Club's training and the NHS 'every mind matters' guidance all share the same core: listen properly, don't minimise, signpost to professional support, follow up. The construction industry has the highest suicide rate of any UK sector (ONS data — male construction workers around 3x the national male average); telling someone to 'man up' is the cultural pattern that perpetuates that statistic. Talking — properly, without judgment, with signposting — is what saves lives.",
  },
  {
    id: 'mod5-s5-sub5-self',
    question:
      "You're four months into your apprenticeship. Money's tight on apprentice wages, you're working 40 hours plus college release plus assignments, you're not sleeping properly, and you've been waking up dreading the day. You don't think you're 'depressed' — you just feel flat. What should you do?",
    options: [
      "Carry on — it'll pass on its own.",
      "Talk to someone. Your GP is the right starting point for any persistent change in mood, sleep or concentration — a 10-15 minute appointment is all it takes to start the conversation. The Lighthouse Construction Industry Charity 24/7 helpline (0345 605 1956) is free, confidential, available to apprentices, and does NOT require you to be in crisis to call. The Electrical Industries Charity (electricalcharity.org) has both emotional and financial support pathways — if money pressure is part of what's grinding you down, they have grants and benefits advice. Mates in Mind has resources specifically for the trade. Talking to your training-provider tutor or a trusted mentor is also a legitimate route. The earlier you talk, the easier it is to address.",
      "Self-medicate with alcohol.",
      "Quit the apprenticeship.",
    ],
    correctIndex: 1,
    explanation:
      "The trade-specific risk profile for apprentices is well documented — extra pressure (training + work + assessments + low pay), often working away from family and support networks, in a culture that historically discouraged talking about feeling low. The right answer is to talk early, before things get worse. The GP is the starting point for clinical assessment and possible referral to NHS talking therapies (IAPT / NHS Talking Therapies). The construction-sector charities (Lighthouse Club, Mates in Mind, Electrical Industries Charity) are designed for the trade and don't require you to be in crisis to call. None of this means you're 'weak' — it means you're using the support that exists. The Sub doesn't diagnose what you're experiencing; it points to the people who can help.",
  },
  {
    id: 'mod5-s5-sub5-neurodiversity',
    question:
      "Your apprentice colleague has just told you she's been diagnosed with ADHD. She's worried about how to mention it at work and what 'reasonable adjustments' to ask for. What do you tell her?",
    options: [
      "Tell her to keep it secret — admitting ADHD will damage her career.",
      "She has the choice about whether and when to disclose, but Equality Act 2010 s.20 reasonable-adjustments duty applies once she has disclosed (the duty is reactive in employment — the employer needs to know). Common adjustments for ADHD in the trade include short structured briefings, written summaries of verbal instructions, advance notice of changes, structured task lists with clear priorities, and quiet space for focused work where needed. Access to Work (DWP scheme) can fund equipment and support that exceeds 'reasonable' for the employer. The British Dyslexia Association, ADHD UK and the National Autistic Society all have workplace guides that are useful starting points. Talking to her training-provider tutor is a good first step — the apprenticeship route has experience supporting neurodivergent apprentices.",
      "Refuse to work with her.",
      "Tell every other colleague in the firm.",
    ],
    correctIndex: 1,
    explanation:
      "Neurodiversity is materially more common in trade roles than the general population (research suggests dyslexia at 4-10x baseline rates in some trade studies, with ADHD and autism also more frequent). The Equality Act 2010 covers ADHD as a disability where it has a substantial and long-term effect on day-to-day activities. The s.20 reasonable-adjustments duty applies once the apprentice has disclosed. Common adjustments are low-cost, well-evidenced and often help non-neurodivergent colleagues too. Disclosure is a personal choice — disclosure brings the legal protections, but some apprentices choose not to disclose. Either way, signposting to the right charity guides and to the training-provider tutor is the helpful response. Confidentiality is hers to control.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does ONS data show about suicide rates among male construction workers in the UK?",
    options: [
      "Construction workers have the lowest suicide rate of any UK sector.",
      "Male construction workers have a suicide rate around 3x the national male average — the highest of any UK sector. The factors most consistently identified as drivers include long hours, transient work patterns, financial pressure (particularly for self-employed workers), a 'tough it out' culture that historically discouraged talking about feeling low, substance use as a coping mechanism, and isolation from family and support networks. Mates in Mind, the Lighthouse Construction Industry Charity and the Samaritans all work specifically on this issue.",
      "There's no published data.",
      "Suicide rates are the same as the general population.",
    ],
    correctAnswer: 1,
    explanation:
      "The Office for National Statistics publishes occupational suicide data periodically. The construction sector consistently shows the highest male suicide rate of any UK occupation group — around three times the national male average in the most-cited datasets. The reasons are multi-factorial and not within the scope of this Sub to diagnose, but the existence of the statistic is the reason the trade-specific charities (Mates in Mind, Lighthouse Club, Electrical Industries Charity) exist. The Sub treats this as fact and signposts to the support — it doesn't claim to explain the cause.",
  },
  {
    id: 2,
    question:
      "What is the Lighthouse Construction Industry Charity?",
    options: [
      "A trade body that lobbies for construction firms.",
      "A UK charity providing emotional, physical and financial wellbeing support specifically to the construction community and their families. Headline services include a 24/7 confidential helpline (0345 605 1956), a Helpline app, financial assistance grants for trade workers in difficulty, mental health and wellbeing training (Mental Health First Aid, Wellbeing Training), and signposting to appropriate professional services. The helpline is staffed by trained advisers and is free. Anyone in the construction industry — apprentices, qualified tradespeople, family members — can call.",
      "A regulator.",
      "A training provider.",
    ],
    correctAnswer: 1,
    explanation:
      "The Lighthouse Construction Industry Charity (lighthouseclub.org) is the UK's leading wellbeing charity for the construction community. The 24/7 helpline (0345 605 1956) is the headline service — free, confidential, and available to anyone in the construction industry without referral or qualifying period. The charity also provides financial grants for trade workers facing hardship and mental-health-first-aid training that's well respected across the industry. Apprentices are eligible for all services.",
  },
  {
    id: 3,
    question:
      "What is Mates in Mind?",
    options: [
      "A social media platform for construction workers.",
      "A UK charity focused on improving mental health and wellbeing in the construction industry. Mates in Mind partners with construction firms to deliver mental health awareness training, supports the development of mental health strategies, and provides freely-accessible resources (toolbox-talk templates, signposting cards, manager guidance). Mates in Mind works closely with Mind, the Samaritans and the Health in Construction Leadership Group. The charity does not provide a helpline directly — it signposts to existing helplines including Samaritans (116 123) and the Lighthouse Club (0345 605 1956).",
      "A union.",
      "A recruitment agency.",
    ],
    correctAnswer: 1,
    explanation:
      "Mates in Mind (matesinmind.org) is the UK construction-industry mental health charity, founded by Mind, the Samaritans and others to address the sector's high suicide rate. The charity's role is preventative — training, awareness, culture change, toolbox talks — rather than direct crisis support. For crisis support the charity signposts to the Samaritans (116 123, 24/7) and the Lighthouse Club helpline (0345 605 1956, 24/7). Mates in Mind's freely-accessible resources are excellent for individuals who want to start a conversation with a colleague or run a toolbox talk on mental health.",
  },
  {
    id: 4,
    question:
      "What is the Electrical Industries Charity?",
    options: [
      "A regulator of electrical contractors.",
      "A UK charity providing financial, emotional and practical support specifically to people working in the electrical industry and their families. The charity provides financial assistance grants (cost-of-living support, bereavement, illness, redundancy), emotional support and counselling, debt advice, apprentice support, and a careers service. The charity is funded by donations from across the electrical industry. Apprentices and qualified electricians, employees and self-employed workers, are all eligible for support.",
      "A trade-only social club.",
      "A manufacturer of electrical equipment.",
    ],
    correctAnswer: 1,
    explanation:
      "The Electrical Industries Charity (EIC, electricalcharity.org) is the welfare charity for the UK electrical sector. The financial assistance grants are particularly valuable for apprentices and early-career electricians who hit a difficult patch — bereavement, illness in the family, unexpected costs. The emotional support pathway includes counselling and signposting. The careers service supports retraining and career change for tradespeople who need to leave the trade for health or other reasons. Apprentices are eligible without qualifying period.",
  },
  {
    id: 5,
    question:
      "Approximately how prevalent is dyslexia, ADHD and autism in the trade compared to the general UK population?",
    options: [
      "All three are less common in the trade than in the general population.",
      "Research suggests neurodivergence — dyslexia, ADHD, and autism — may be more common in trade roles than the general population. Some studies suggest dyslexia at materially higher rates in trade and creative industries (the visual-spatial reasoning associated with dyslexia is often a strength in hands-on work). ADHD and autism prevalence in the trade is also frequently reported as elevated. The Equality Act 2010 reasonable-adjustments duty (s.20) applies where the condition has a substantial and long-term effect, and Sub 5.2 covers the practical adjustments in detail.",
      "There's no difference.",
      "Only dyslexia is more common in the trade.",
    ],
    correctAnswer: 1,
    explanation:
      "Several studies and trade-body surveys have reported higher prevalence of dyslexia, ADHD and autism in trade roles than in the general population. The exact figures vary by methodology but the direction is consistent — neurodivergence is over-represented in the trade. Some of this likely reflects self-selection (the trade rewards visual-spatial reasoning, hands-on work, and problem-solving — strengths often associated with neurodivergence). The implication for an apprentice cohort is that a meaningful proportion of colleagues are likely to be neurodivergent, often without formal diagnosis. The standard reasonable adjustments under Equality Act 2010 s.20 apply once disclosed.",
  },
  {
    id: 6,
    question:
      "What's the right approach when a peer tells you they're struggling but doesn't want to seek professional help?",
    options: [
      "Force them to see a GP.",
      "You can't make someone seek help, but you can keep listening, keep checking in, and keep signposting gently. Suggest the Lighthouse Club 24/7 helpline (0345 605 1956) — confidential, no referral needed, no qualifying period. Mention Samaritans (116 123). Mention Mates in Mind resources. Don't break their confidence without asking, but if you genuinely believe they're at imminent risk of harm to themselves, the right thing is to call 999 or take them to A&E — that's a safeguarding step, not a betrayal. Look after yourself too — supporting a peer can be heavy. The same charities are available to you.",
      "Stop talking to them and let them deal with it themselves.",
      "Tell every other colleague.",
    ],
    correctAnswer: 1,
    explanation:
      "Peer support has clear limits. You aren't a clinician and you're not responsible for fixing what's going on for someone else. Your role is to listen, signpost and follow up. Where the person isn't ready to seek professional help, the most you can do is keep the door open — keep checking in, gently mention the helplines, don't push. The exception is imminent risk of self-harm or suicide — at that point 999 or A&E is the right step and confidentiality takes second place to safety. Look after yourself in the process; supporting a peer through a difficult time is heavy work and you can use the same support resources too.",
  },
  {
    id: 7,
    question:
      "What workplace adjustments are commonly helpful for an apprentice with autism?",
    options: [
      "There are no useful adjustments.",
      "Common adjustments include written schedules for the day and week, advance notice of any changes, clear and unambiguous instructions ('start at the kitchen, do the back-boxes first, the cable will be in the loft' — not 'sort the kitchen out'), avoidance of 'common sense' assumptions, predictable routine where the role allows, designated quiet space for breaks where sensory overload is a factor, and one-to-one briefings rather than large group sessions where the apprentice prefers. Adjustments are agreed with the individual — autism is a spectrum and people vary enormously.",
      "Only providing them with separate workshops.",
      "Avoiding all communication with them.",
    ],
    correctAnswer: 1,
    explanation:
      "The Equality Act 2010 s.20 reasonable-adjustments duty covers autism where it has a substantial and long-term effect. The common adjustments are practical, low-cost and often help non-autistic colleagues too. The starting point is asking the individual what helps — autism is a spectrum and people vary widely. The National Autistic Society (autism.org.uk) provides workplace guides for both employers and employees. Sub 5.2 covers neurodiversity adjustments in more detail.",
  },
  {
    id: 8,
    question:
      "If you're worried that an apprentice colleague might be at imminent risk of self-harm, what should you do?",
    options: [
      "Don't say anything — it's not your place.",
      "Stay with them if you can do so safely. Encourage them to call 999 or go to A&E. If they won't, and you genuinely believe they're at imminent risk, call 999 yourself or take them to A&E. The Samaritans (116 123) is available 24/7 if it helps to talk while you decide what to do. Mind's helpline is available too (0300 123 3393). Don't promise confidentiality you can't keep — be honest that you may need to escalate if you're worried about their safety. After the immediate crisis is managed, look after yourself too — supporting someone through a mental health crisis is heavy and the same charities are available to you.",
      "Drive them home and leave them alone.",
      "Post about it on social media to alert their family.",
    ],
    correctAnswer: 1,
    explanation:
      "Imminent risk of self-harm is the situation where confidentiality takes second place to safety. The right responses are to stay with the person if you can, encourage them to call 999 or go to A&E, and be honest that you may need to escalate. Calling 999 yourself or taking them to A&E is appropriate where the risk is imminent and they won't seek help themselves — that's a safeguarding step, not a betrayal. Samaritans (116 123) and Mind (0300 123 3393) can support both you and them through the conversation. Look after yourself afterwards — supporting someone through a crisis is heavy and you can access the same support.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Why is mental health more of an issue in construction than other sectors?",
    answer:
      "There isn't a single cause but the most consistently cited factors are: long hours and transient work patterns; financial pressure (particularly for self-employed workers, who carry the cost of any time off); a historically 'tough it out' culture that discouraged talking about feeling low; isolation from family and support networks (particularly for workers travelling for work); high rates of substance use as a coping mechanism; and a workforce that's predominantly male, in a society where men are statistically less likely to seek help for mental health issues. The construction-sector charities (Mates in Mind, Lighthouse Club) work specifically on these factors. None of this is within the scope of this Sub to diagnose or solve — the Sub signposts to the support that exists.",
  },
  {
    question: "If I'm struggling with money on apprentice wages, where can I get help?",
    answer:
      "The Electrical Industries Charity (electricalcharity.org) provides financial assistance grants specifically for people working in the electrical industry and their families — apprentices included. The Lighthouse Construction Industry Charity (lighthouseclub.org, helpline 0345 605 1956) has a financial assistance fund for trade workers in hardship. Citizens Advice (citizensadvice.org.uk) provides free benefits advice and can help you check what you're entitled to (Universal Credit can be claimed alongside apprentice wages where you qualify). StepChange (stepchange.org) provides free debt advice. Talking to your training-provider tutor is also a legitimate step — they may be able to help you access support funds or signpost to the trade-specific charities. Money pressure on top of training, work and assessments is a known apprentice risk factor and there's no shame in asking for help.",
  },
  {
    question: "I think I might be neurodivergent (dyslexic / ADHD / autistic) but I haven't been formally diagnosed. What should I do?",
    answer:
      "Talk to your training-provider tutor first — they have processes for screening and referral. Many training providers fund formal assessments for apprentices who screen positive. The British Dyslexia Association (bdadyslexia.org.uk), ADHD UK (adhduk.co.uk) and the National Autistic Society (autism.org.uk) all have screening tools and guidance on getting a formal assessment. A formal assessment isn't required for reasonable adjustments under Equality Act 2010 — the legal test is the substantial and long-term effect on day-to-day activities, not a clinical diagnosis — but a clinician's report is helpful evidence and informs the right adjustments. Many people find that a formal diagnosis reframes how they understand their own life and helps them access the right support. The decision to seek diagnosis is personal — there's no obligation either way.",
  },
  {
    question: "How do I bring up mental health with someone on site without making it weird?",
    answer:
      "Keep it natural and low-key. Mates in Mind teaches a simple framework — 'ask twice'. The first 'how are you?' is reflexive and most people answer 'fine' regardless. The second 'no really, how are you?' (or 'you don't seem yourself, anything I can do?') is the one that opens the conversation. Then listen. Don't try to fix, don't minimise, don't compare to your own experience. Acknowledge what they say. Mention the helplines if it feels right ('the Lighthouse helpline is free and confidential, 0345 605 1956 — no need to be in crisis to call'). Follow up in a few days. Most peer support isn't dramatic — it's a series of small, ordinary conversations over time that show the person they're not alone.",
  },
  {
    question: "Is mental health covered by the Equality Act 2010?",
    answer:
      "Yes, where it meets the substantial and long-term thresholds. Equality Act 2010 s.6 defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities. 'Long-term' means it has lasted, or is likely to last, 12 months or more. This explicitly includes mental health conditions — depression, anxiety disorders, PTSD, bipolar disorder and others — where they meet the thresholds. Where covered, the s.20 reasonable-adjustments duty applies in the same way as for physical disability. Common adjustments include flexible hours during recovery, time off for therapy appointments, a phased return after a mental-health-related absence, and adjustments to high-pressure deadlines. Disclosure is the apprentice's choice — but the legal protection is real once disclosed.",
  },
  {
    question: "What if I'm supporting a peer and it's affecting my own mental health?",
    answer:
      "Look after yourself too. Supporting a peer through a difficult time is heavy work and you can access the same resources — the Lighthouse Club 24/7 helpline (0345 605 1956), the Electrical Industries Charity, Samaritans (116 123, 24/7), Mind (0300 123 3393), Mates in Mind resources, and your GP. Talking to your training-provider tutor or a trusted colleague can help you process what you're carrying. Don't promise confidentiality you can't keep if you're genuinely worried about the peer's safety — that's not a betrayal, that's responsible. And remember the limits of peer support — your role is to listen, signpost and follow up. Fixing what's going on for someone else isn't your responsibility, and it isn't possible. The professional support routes exist for that.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 5"
            title="Mental health and neurodiversity in the trade"
            description="Construction has the highest suicide rate of any UK sector (ONS data). Mates in Mind, Lighthouse Club and the Electrical Industries Charity exist for a reason. Neurodiversity is common in the trade. This Sub equips you to help a peer and to seek help yourself — it does not diagnose."
            tone="emerald"
          />

          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] p-5 mb-2">
            <p className="text-amber-200/95 text-[13px] sm:text-[14px] font-semibold mb-2">
              Supplementary content — peer support and signposting only
            </p>
            <p className="text-white/85 text-[13px] sm:text-[14px] leading-relaxed">
              This Sub extends LO3 of Unit 210 with industry-relevant well-being and
              neurodiversity awareness. Mental health is treated here as a peer-support
              and signposting topic, not a clinical one. The Sub does not provide
              medical advice and it does not diagnose. UK charity helplines and NHS
              routes are signposted throughout. If you are struggling, the Lighthouse
              Construction Industry Charity helpline is{' '}
              <span className="font-semibold text-white">0345 605 1956 (24/7, free, confidential)</span>{' '}
              and Samaritans is{' '}
              <span className="font-semibold text-white">116 123 (24/7, free, confidential)</span>.
            </p>
          </div>

          <TLDR
            points={[
              "Construction has the highest suicide rate of any UK sector (ONS data — male construction workers around 3x the national male average). The trade-specific charities exist because the statistic exists.",
              "Mates in Mind, the Lighthouse Construction Industry Charity (24/7 helpline 0345 605 1956), the Electrical Industries Charity, Samaritans (116 123) and Mind (0300 123 3393) are the headline UK support routes. All are free, all are confidential, none require crisis to call.",
              "Neurodiversity (dyslexia, ADHD, autism) is materially more common in trade roles than the general population. Equality Act 2010 s.20 reasonable adjustments apply once disclosed.",
              "Peer support means listen, signpost, follow up — not diagnose, not fix. Look after yourself too. Talking saves lives.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Recognise that the UK construction sector has the highest occupational suicide rate (ONS data) and identify the cultural and structural factors most commonly cited.",
              "Identify the UK charity helplines for trade-specific mental health support — Mates in Mind, Lighthouse Construction Industry Charity, Electrical Industries Charity, Samaritans, Mind.",
              "Apply a peer-support framework — listen, acknowledge, signpost, follow up — without diagnosing or attempting to provide clinical advice.",
              "Identify neurodiversity (dyslexia, ADHD, autism) as common in trade roles and recognise the reasonable-adjustments duty under Equality Act 2010 s.20.",
              "Recognise the apprentice-specific risk profile (long hours, low pay, training pressure, isolation) and the support routes available.",
              "Apply self-care basics and identify when to seek professional support for one's own mental health.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub exists</ContentEyebrow>

          <ConceptBlock
            title="The trade has lost too many people to a problem we now know how to talk about"
            plainEnglish="The construction sector in the UK has the highest male suicide rate of any occupation group — ONS data has shown male construction workers at around three times the national male average across multiple datasets. The reasons are multi-factorial and not within this Sub's scope to diagnose, but the statistic is the reason the trade-specific charities exist and the reason this Sub is part of the curriculum."
            onSite="Twenty years ago, a Sub like this wouldn't have been in a Level 2 apprenticeship curriculum. Mental health on site was something you didn't talk about. The cultural shift since then — driven by the construction-industry charities, by trade unions, by manufacturers, by HSE guidance — has been real. Talking about mental health on site is now standard, supported by employers, and built into apprenticeship training. None of it is about being 'soft'; all of it is about not losing colleagues to a problem we now know how to talk about."
          >
            <p>
              The factors most consistently identified by ONS, HSE and the construction
              charities as drivers of the sector&apos;s mental health profile:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Long hours and transient work patterns</strong> — early starts,
                long days, working away from home, weekend work for tight programmes.
              </li>
              <li>
                <strong>Financial pressure</strong> — particularly for self-employed
                workers, who carry the cost of any time off, and apprentices, who are
                on low wages while juggling work and college.
              </li>
              <li>
                <strong>Historically &apos;tough it out&apos; culture</strong> —
                discouraged talking about feeling low and treated mental health as
                weakness. The cultural shift is real but the history is long.
              </li>
              <li>
                <strong>Isolation</strong> — particularly for workers travelling for
                work, away from family and support networks.
              </li>
              <li>
                <strong>Substance use as coping</strong> — alcohol and other substances
                are frequently used to manage stress in the sector, often masking the
                underlying issue.
              </li>
              <li>
                <strong>Predominantly male workforce</strong> — and in UK society
                generally, men are statistically less likely to seek help for mental
                health issues.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>UK support — the charities and helplines</ContentEyebrow>

          <ConceptBlock
            title="Lighthouse Construction Industry Charity — 24/7 helpline 0345 605 1956"
            plainEnglish="The Lighthouse Construction Industry Charity (lighthouseclub.org) is the UK's leading wellbeing charity for the construction community. The 24/7 confidential helpline is the headline service — free to call, no referral needed, no qualifying period of service. Anyone in the construction industry, including apprentices and family members, can call."
            onSite="The helpline is staffed by trained advisers who can offer immediate emotional support, signpost to professional services, and where appropriate connect callers to the charity's financial assistance fund (grants for trade workers in hardship). The charity also delivers Mental Health First Aid training across the industry."
          >
            <p>
              Lighthouse Club services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>24/7 helpline 0345 605 1956</strong> — free, confidential,
                anonymous if you want it.
              </li>
              <li>
                <strong>Helpline app</strong> — text-based access for those who prefer
                not to call.
              </li>
              <li>
                <strong>Financial assistance fund</strong> — grants for trade workers
                facing hardship (illness, bereavement, redundancy, cost of living).
              </li>
              <li>
                <strong>Mental Health First Aid training</strong> — well-respected
                across the industry, often funded by employers.
              </li>
              <li>
                <strong>Critical incident response</strong> — support for sites and
                firms after serious incidents.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mates in Mind — culture change and toolbox talks"
            plainEnglish="Mates in Mind (matesinmind.org) is a UK charity focused on improving mental health and wellbeing in the construction industry. Mates in Mind partners with construction firms to deliver mental health awareness training, supports the development of mental health strategies, and provides freely-accessible resources including toolbox-talk templates, signposting cards and manager guidance. Mates in Mind is preventative and educational — for crisis support it signposts to existing helplines."
            onSite="Mates in Mind's freely-accessible resources are excellent for individuals who want to start a conversation with a colleague or run a toolbox talk on mental health. The charity works closely with Mind, the Samaritans, and the Health in Construction Leadership Group. Many large construction firms have signed up to Mates in Mind's standards and deliver mental health awareness as part of induction."
          >
            <p>
              Mates in Mind services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Free resources</strong> — toolbox-talk templates, signposting
                cards, posters and guidance, available to download.
              </li>
              <li>
                <strong>Training programmes</strong> — mental health awareness, manager
                training, peer-support training.
              </li>
              <li>
                <strong>Strategy support for firms</strong> — helping construction
                businesses build mental health into their existing safety management
                systems.
              </li>
              <li>
                <strong>Signposting</strong> — to Samaritans (116 123), Lighthouse
                helpline (0345 605 1956) and other support routes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Electrical Industries Charity — financial and welfare support for the electrical sector"
            plainEnglish="The Electrical Industries Charity (electricalcharity.org) is the welfare charity specifically for the UK electrical sector. The charity provides financial assistance grants, emotional support and counselling, debt advice, apprentice support and a careers service. Apprentices and qualified electricians, employees and self-employed workers, are all eligible."
            onSite="EIC is particularly relevant for apprentices and early-career electricians who hit a difficult patch — bereavement in the family, illness, unexpected costs, redundancy from a placement firm. The financial-assistance pathway is straightforward and the charity is funded by donations from across the electrical industry. Asking for help is what the charity is set up for."
          >
            <p>
              Electrical Industries Charity services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Financial assistance grants</strong> — cost-of-living support,
                bereavement, illness, redundancy, family emergencies.
              </li>
              <li>
                <strong>Emotional support and counselling</strong> — confidential
                counselling pathway for industry workers and family members.
              </li>
              <li>
                <strong>Debt advice</strong> — connecting with regulated debt advice
                services where money pressure is a factor.
              </li>
              <li>
                <strong>Apprentice support</strong> — specifically aimed at apprentices
                in the electrical sector facing difficulty.
              </li>
              <li>
                <strong>Careers service</strong> — supporting retraining and career
                change for tradespeople who need to leave the trade for health or
                other reasons.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Samaritans, Mind and the NHS — universal mental health support"
            plainEnglish="The trade-specific charities are excellent but the universal UK mental health support routes are also available to everyone in the trade. Samaritans (116 123) is the 24/7 emotional support helpline — free from any phone, no qualifying period, no referral. Mind (0300 123 3393) provides information and support on a wide range of mental health issues. The NHS is the front door for clinical assessment and treatment."
            onSite="None of these helplines require you to be in crisis to call. They're available for the moment when you don't feel right and you don't know what to do next. The GP is the right starting point for any persistent change in mood, sleep or concentration — a 10-15 minute appointment is all it takes to start the conversation, and the GP can refer to NHS Talking Therapies (formerly IAPT) for free CBT and other therapy without a long wait in most areas."
          >
            <p>
              Universal UK mental health support:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Samaritans</strong> — 116 123, 24/7, free from any phone.
                samaritans.org. Email: jo@samaritans.org. The headline crisis support
                line in the UK.
              </li>
              <li>
                <strong>Mind</strong> — 0300 123 3393. mind.org.uk. Information line
                for mental health support, advice and signposting.
              </li>
              <li>
                <strong>NHS 111</strong> — for urgent (but not life-threatening) mental
                health support out of hours.
              </li>
              <li>
                <strong>NHS Talking Therapies</strong> — free CBT and other therapy
                via your GP referral or self-referral in many areas.
              </li>
              <li>
                <strong>999 or A&amp;E</strong> — for life-threatening mental health
                crises.
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

          <ContentEyebrow>Peer support — listen, signpost, follow up</ContentEyebrow>

          <ConceptBlock
            title="What peer support actually is — and what it isn't"
            plainEnglish="Peer support means being there for a colleague who's struggling. It does NOT mean diagnosing what's wrong, providing therapy, or fixing the underlying issues. The most common mistake on site is assuming that peer support has to look heroic — a long, intense conversation that solves everything. Real peer support is usually low-key — a series of small, ordinary conversations over time that show the person they're not alone."
            onSite="Mates in Mind teaches a simple framework — 'ask twice'. The first 'how are you?' is reflexive and most people answer 'fine' regardless. The second 'no really, how are you?' (or 'you don't seem yourself, anything I can do?') is the one that opens the conversation. Then listen. Don't try to fix. Don't minimise ('it'll pass'). Don't compare to your own experience ('I went through worse'). Acknowledge what they say. Mention the helplines if it feels right. Follow up in a few days."
          >
            <p>
              The peer-support framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ask twice</strong> — the first answer is usually reflexive.
                The second ask is the one that opens the conversation.
              </li>
              <li>
                <strong>Listen properly</strong> — don&apos;t interrupt, don&apos;t
                problem-solve, don&apos;t minimise. Acknowledge what they say.
              </li>
              <li>
                <strong>Don&apos;t diagnose</strong> — you&apos;re not a clinician.
                Naming what they have isn&apos;t your job.
              </li>
              <li>
                <strong>Signpost gently</strong> — the helplines and the GP exist for
                this. Mention them as options, not orders.
              </li>
              <li>
                <strong>Don&apos;t break confidence without asking</strong> — but be
                honest if you genuinely think they&apos;re at risk that you may need
                to escalate.
              </li>
              <li>
                <strong>Follow up</strong> — a check-in a few days later shows it
                wasn&apos;t a one-off conversation. This is what most peer support
                actually looks like.
              </li>
              <li>
                <strong>Look after yourself too</strong> — supporting a peer is heavy.
                The same charities are available to you.
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

          <ContentEyebrow>Neurodiversity in the trade</ContentEyebrow>

          <ConceptBlock
            title="Dyslexia, ADHD and autism are common in the trade — often a strength"
            plainEnglish="Neurodiversity (dyslexia, ADHD, autism) is materially more common in trade roles than in the general UK population. Some research has reported dyslexia at 4-10x baseline rates in some trade studies; ADHD and autism are also frequently reported as elevated. Some of this likely reflects self-selection — the trade rewards visual-spatial reasoning, hands-on work, and problem-solving, which are strengths often associated with neurodivergence."
            onSite="The implication for an apprentice cohort is that a meaningful proportion of colleagues will be neurodivergent, often without formal diagnosis. The standard reasonable adjustments under Equality Act 2010 s.20 — covered in Sub 5.2 — apply once the apprentice has disclosed. Many people find a formal diagnosis reframes how they understand their own life and helps them access the right support; for others, the lived strengths and adjustments matter more than the label."
          >
            <p>
              Common neurodivergent strengths in the trade:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual-spatial reasoning</strong> — often associated with
                dyslexia. Reading a layout drawing, picturing a cable route through a
                building, visualising a circuit diagram.
              </li>
              <li>
                <strong>Pattern recognition and problem-solving</strong> — often
                associated with autism and ADHD. Diagnosing a fault, finding the
                anomaly in a test result.
              </li>
              <li>
                <strong>Hyperfocus on interesting work</strong> — often associated
                with ADHD. Sustained attention on a complex install or fault-finding.
              </li>
              <li>
                <strong>Attention to detail in areas of interest</strong> — often
                associated with autism. Particularly suited to inspection, testing,
                and certification work.
              </li>
              <li>
                <strong>Practical hands-on aptitude</strong> — often a strength across
                neurodivergent profiles in the trade.
              </li>
            </ul>
            <p className="pt-2">
              Common challenges and the standard adjustments under Equality Act 2010 s.20
              (covered in Sub 5.2):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dyslexia</strong> — extra time on written assessments,
                alternative assessment formats, audio versions of training material,
                plain English at B1/B2 reading level, voice-to-text software.
              </li>
              <li>
                <strong>ADHD</strong> — short structured briefings, written summaries
                of verbal instructions, advance notice of changes, structured task
                lists, quiet space for focused work.
              </li>
              <li>
                <strong>Autism</strong> — written schedules, advance notice of changes,
                clear and unambiguous instructions, predictable routine, designated
                quiet space for breaks where sensory overload is a factor.
              </li>
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
            source="HSE Stress Management Standards (paraphrased)"
            clause={
              <>
                The HSE Management Standards approach identifies six key areas of work
                design that, if not properly managed, are associated with poor health,
                lower productivity and increased accident and sickness absence rates:
                Demands, Control, Support, Relationships, Role, and Change. The Standards
                are not a regulatory requirement but reflect the duty under MHSWR 1999
                Reg 3 to assess risks to the health of employees — including
                psycho-social risks.
              </>
            }
            meaning={
              <>
                The HSE Stress Management Standards (hse.gov.uk/stress) are the practical
                guidance for employers on managing work-related stress. The framework
                makes psycho-social risk a legitimate part of workplace risk assessment.
                The Standards aren&apos;t themselves a legal requirement, but they
                discharge the MHSWR Reg 3 duty to assess risks to the health of
                employees — and a tribunal would treat conformity with the Standards
                as evidence of a reasonable approach. For apprentices, the Standards
                are useful as a way of naming what&apos;s wrong when work feels
                overwhelming — high demands, low control, poor support, difficult
                relationships, role ambiguity, frequent change. The signposting routes
                to the construction-industry charities are the practical response.
              </>
            }
            cite="Source: HSE Stress Management Standards — paraphrased from hse.gov.uk/stress."
          />

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 3 (paraphrased on psycho-social risk)"
            clause={
              <>
                Reg 3(1) requires every employer to make a suitable and sufficient
                assessment of the risks to the health and safety of employees and
                others affected by the work. HSE guidance on the regulation makes clear
                that &quot;health&quot; includes mental as well as physical health, and
                that psycho-social risks (work-related stress, bullying, excessive
                workload) fall within the assessment duty.
              </>
            }
            meaning={
              <>
                Reg 3 is normally cited for physical risk assessment but the duty
                extends to mental health where work-related factors create risk. HSE
                Stress Management Standards are the practical framework. For an
                apprentice, this matters because excessive workload, role ambiguity
                and lack of support are not &quot;just part of the job&quot; — they
                are workplace risks the employer is required to assess and manage. The
                training-provider tutor and the construction charities are appropriate
                escalation routes if the assessment isn&apos;t happening.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3 — paraphrased from legislation.gov.uk and HSE guidance."
          />

          <RegsCallout
            source="Equality Act 2010 — s.6 (paraphrased on mental health)"
            clause={
              <>
                A person (P) has a disability if (a) P has a physical or mental
                impairment, and (b) the impairment has a substantial and long-term
                adverse effect on P&apos;s ability to carry out normal day-to-day
                activities. (Section 6(1).) &quot;Long-term&quot; means it has lasted,
                or is likely to last, 12 months or more, or is likely to last for the
                rest of the affected person&apos;s life. (Schedule 1.)
              </>
            }
            meaning={
              <>
                Equality Act 2010 s.6 covers mental impairment as well as physical.
                Where a mental health condition (depression, anxiety disorders, PTSD,
                bipolar disorder and others) has a substantial and long-term effect on
                day-to-day activities, it&apos;s a disability under the Act. Once
                disclosed to the employer, the s.20 reasonable-adjustments duty
                applies. Common adjustments include flexible hours during recovery,
                time off for therapy appointments, a phased return after a
                mental-health-related absence, and adjustments to high-pressure
                deadlines. Disclosure is the apprentice&apos;s choice — but the legal
                protection is real once disclosed.
              </>
            }
            cite="Source: Equality Act 2010 (2010 c.15), s.6 and Schedule 1 — paraphrased from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="'Man up' — the cultural pattern that perpetuates the suicide rate"
            whatHappens={
              <>
                Apprentice tells a more experienced colleague he&apos;s not been
                sleeping, missed two weeks of college, feels like he&apos;s
                letting everyone down. Colleague replies &quot;you need to man up,
                we all feel like that, just get on with it&quot;. Apprentice
                doesn&apos;t mention it again. Withdraws from the team over the
                following weeks. Stops asking for help with work he&apos;s
                struggling with. Eventually leaves the apprenticeship, and the
                trade. The colleague&apos;s response was meant to be tough love
                — but it shut the conversation down at exactly the moment when
                opening it would have helped. Multiplied across the sector, this
                is the cultural pattern that ONS data has been measuring for
                decades.
              </>
            }
            doInstead={
              <>
                Listen. Acknowledge what the apprentice said (&quot;that sounds
                hard&quot;). Don&apos;t minimise (&quot;we all feel like that&quot;
                often translates to &quot;your feelings don&apos;t matter&quot;).
                Don&apos;t diagnose (&quot;sounds like depression&quot; — leave
                that to clinicians). Mention the support routes — Lighthouse Club
                helpline 0345 605 1956 (24/7, free, confidential), Samaritans 116
                123, GP, training-provider tutor. Follow up in a few days. The
                conversation doesn&apos;t need to fix anything; it needs to keep
                the door open. Talking saves lives.
              </>
            }
          />

          <CommonMistake
            title="Self-medicating with alcohol or other substances"
            whatHappens={
              <>
                Apprentice is overwhelmed — money pressure, training pressure,
                relationship issues at home. Starts drinking more in the evenings
                to switch off. The drinking initially helps with sleep but makes
                concentration worse the next day. Performance at work and college
                slips. Apprentice drinks more to manage the stress of the slipping
                performance. Cycle accelerates. The substance use masks the
                underlying issue and adds a new one on top. The HSE has identified
                substance use as a significant factor in construction-sector mental
                health and accident statistics.
              </>
            }
            doInstead={
              <>
                Notice the pattern early — if you&apos;re reaching for alcohol (or
                anything else) to manage how you feel, the substance is masking the
                issue, not solving it. Talk to your GP — they will not judge and
                they will signpost to the right support. Talk to the Lighthouse
                Club helpline (0345 605 1956). The Electrical Industries Charity has
                support pathways including counselling. Drinkline (0300 123 1110,
                weekdays 9-8, weekends 11-4) is a free national alcohol helpline.
                Frank (0300 123 6600, 24/7) covers other substances. Asking for
                help is hard but it&apos;s much easier than addressing the issue
                later. The trade has lost too many people to this pattern.
              </>
            }
          />

          <Scenario
            title="Apprentice peer tells you he's not coping"
            situation={
              <>
                You&apos;re halfway through your second year. A fellow apprentice in
                your cohort tells you, on the way back from college, that he hasn&apos;t
                been sleeping, missed two weeks of college, can&apos;t concentrate at
                work, and feels like he&apos;s letting everyone down. He says he&apos;s
                been thinking about quitting the apprenticeship. He hasn&apos;t spoken
                to anyone else about it. He asks you not to make a fuss. You&apos;re
                worried about him but you don&apos;t know what to say.
            </>
            }
            whatToDo={
              <>
                Stop and listen properly. Don&apos;t try to fix it on the bus.
                Acknowledge what he&apos;s said — &quot;that sounds really hard&quot;.
                Don&apos;t minimise (&quot;everyone feels like that&quot;). Don&apos;t
                guess what&apos;s going on (&quot;sounds like depression&quot;). Don&apos;t
                rush to advice. Once he&apos;s finished, gently mention the support
                routes — &quot;there&apos;s a 24/7 helpline for the construction
                industry, 0345 605 1956, Lighthouse Club, free and confidential —
                you don&apos;t have to be in crisis to call. The GP is also a good
                first step. There&apos;s also Mates in Mind for resources, and the
                Electrical Industries Charity if money is part of what&apos;s
                grinding you down.&quot; Ask whether he&apos;d like you to mention
                to your training-provider tutor — but don&apos;t break his confidence
                without asking. Be honest that if you ever genuinely worry about his
                safety you&apos;d need to escalate — that&apos;s not a betrayal,
                that&apos;s looking after him. Follow up in a few days — &quot;just
                checking in, how&apos;s your week been&quot;. Keep listening over
                time. Look after yourself too — supporting a peer through something
                heavy is heavy work, and the same support resources are available to
                you.
              </>
            }
            whyItMatters={
              <>
                The trade has lost too many people to a problem we now know how to
                talk about. ONS data shows male construction workers at around three
                times the national male suicide rate — the highest of any UK
                occupation group. The cultural pattern of &quot;man up, we all feel
                like that, just get on with it&quot; is what perpetuates the
                statistic. The cultural shift over the last decade — driven by the
                construction-industry charities, by trade unions, by manufacturers,
                by HSE guidance — has been real, and it works because of small
                ordinary conversations like this one. You&apos;re not expected to
                fix what&apos;s going on for him. You&apos;re expected to listen,
                acknowledge, signpost, and follow up. That&apos;s what peer support
                in the trade looks like in practice. Most of the time the apprentice
                doesn&apos;t need rescue — he needs a colleague who took him
                seriously and pointed him at the support that exists. Talking saves
                lives. Doing nothing is not a neutral choice.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Looking after yourself as an apprentice</ContentEyebrow>

          <ConceptBlock
            title="Apprentice basics — sleep, food, exercise, talk"
            plainEnglish="Apprentices are a higher-risk group for mental health pressure than the general workforce. Long hours, college release on top of work, low pay, exam and assessment pressure, often working away from home or family. The basics that protect mental health aren't complicated — sleep, food, exercise, talk — but the apprentice's lifestyle puts pressure on each of them."
            onSite="None of this is clinical advice. None of it diagnoses anything. The basics are universally helpful and the helplines and GP are the routes to professional support if and when basic self-care isn't enough. The biggest single thing you can do is talk — to a peer, to a tutor, to a helpline, to a GP. Talking is what's been missing in the trade for too long; talking is what saves lives."
          >
            <p>
              The apprentice basics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sleep</strong> — protect 7-9 hours wherever possible. Sleep
                debt accumulates, affects concentration, mood and immune function.
                Persistent sleep problems are worth a GP conversation.
              </li>
              <li>
                <strong>Food</strong> — three meals where possible, water through the
                day, low caffeine after lunch. Skipping meals across a long site day
                is a known cause of low mood and poor concentration.
              </li>
              <li>
                <strong>Exercise</strong> — most trade work has a meaningful physical
                component, which helps. Active rest (walking, swimming, cycling)
                outside work hours is associated with lower stress.
              </li>
              <li>
                <strong>Talk</strong> — to a peer, to a mentor, to a tutor, to a
                family member, to a helpline. The single biggest protective factor
                in the trade context. Don&apos;t wait until things are bad.
              </li>
              <li>
                <strong>Boundaries on substances</strong> — alcohol and other
                substances mask issues rather than solve them. If you&apos;re using
                them to manage how you feel, that&apos;s the signal to talk to
                someone (GP, Drinkline 0300 123 1110, Frank 0300 123 6600).
              </li>
              <li>
                <strong>Use the support that exists</strong> — Lighthouse Club 0345
                605 1956 (24/7), Electrical Industries Charity (financial and
                emotional support), Samaritans 116 123 (24/7), Mind 0300 123 3393, GP.
                None require you to be in crisis to call.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Construction has the highest suicide rate of any UK sector (ONS data — male construction workers around 3x the national male average). The trade-specific charities exist because the statistic exists.",
              "Lighthouse Construction Industry Charity 24/7 helpline 0345 605 1956 — free, confidential, no qualifying period, no need to be in crisis to call.",
              "Mates in Mind — culture change, training, free toolbox-talk resources. Signposts to existing helplines for crisis support.",
              "Electrical Industries Charity — financial and emotional support specifically for the electrical sector. Apprentices eligible.",
              "Samaritans 116 123 (24/7), Mind 0300 123 3393, NHS GP and NHS Talking Therapies are the universal routes. None require crisis to call.",
              "Peer support means listen, acknowledge, signpost, follow up. NOT diagnose, NOT fix. The 'ask twice' framework opens conversations that the first 'fine' shuts down.",
              "Neurodiversity (dyslexia, ADHD, autism) is materially more common in the trade than the general population, often a strength. Equality Act 2010 s.20 reasonable adjustments apply once disclosed.",
              "If you're struggling — talk early. GP is the right starting point for any persistent change in mood, sleep or concentration. Talking saves lives. Doing nothing is not a neutral choice.",
            ]}
          />

          <Quiz title="Mental health and neurodiversity in the trade — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 Effects of poor communication
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section landing <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Subsections list
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
