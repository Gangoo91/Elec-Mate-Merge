/**
 * Module 5 · Section 2 · Subsection 4 — Equality Act 2010: fair treatment on site
 * Supplementary content — Level 2 awareness of the Equality Act 2010 in
 * a trade context. Detailed legal interpretation is Level 3+.
 *
 * Frame: the legal floor for how people on site treat each other. Nine
 * protected characteristics. The duty to make reasonable adjustments for
 * disabled workers. Harassment, direct and indirect discrimination,
 * victimisation. The 'banter' trap and what the law actually says about it.
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
  'Equality Act 2010 — fair treatment on site (2.4) | Level 2 Module 5.2.4 | Elec-Mate';
const DESCRIPTION =
  'Level 2 awareness of the Equality Act 2010 in a trade context — nine protected characteristics, reasonable adjustments for disabled workers, harassment and the banter trap.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s2-sub4-protected-characteristics',
    question:
      "How many 'protected characteristics' does the Equality Act 2010 define, and roughly what are they?",
    options: [
      "Five — race, sex, age, disability and religion. These are the five categories the Act protects; everything else, including sexual orientation, pregnancy and gender reassignment, is left to separate older legislation that the Equality Act deliberately did not consolidate, so they sit outside its protection.",
      "Nine — age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation. The Act treats these nine characteristics as the legally protected categories. Discrimination, harassment or victimisation BECAUSE OF a protected characteristic is unlawful — at recruitment, in work, on training, in pay, in dismissal.",
      "Twelve — the nine commonly listed ones plus trade-union membership, criminal record and social class, which the 2010 Act added to bring it into line with European law. The extra three are what distinguish the 2010 Act from the older Race and Sex Discrimination Acts it replaced.",
      "There is no fixed number — the Act protects any characteristic a Tribunal decides is worth protecting on the facts of the case. The list is open-ended, so being treated badly for any personal trait at all, such as accent, weight or hairstyle, gives rise to a discrimination claim under the Act.",
    ],
    correctIndex: 1,
    explanation:
      "The Equality Act 2010 (s.4) lists nine protected characteristics. The list is closed — being treated badly for any other reason (e.g. being a Liverpool fan, having a tattoo, smoking) isn't covered by the Act. But the nine protected characteristics are deliberately broad. Disability and pregnancy in particular have specific additional protections. As an apprentice you don't need to memorise the full Act — you do need to know that asking about, joking about, or making decisions based on these nine characteristics is illegal at work.",
  },
  {
    id: 'mod5-s2-sub4-reasonable-adjustment',
    question:
      "An apprentice with dyslexia struggles to read the dense, small-print Risk Assessment Method Statement (RAMS) document on the morning brief. The supervisor is pushing them to 'just sign it and get on with it'. What's the reasonable-adjustment route under the Equality Act?",
    options: [
      "Equality Act 2010 s.20 places a duty on the employer to make 'reasonable adjustments' for disabled workers. Dyslexia is a recognised disability under s.6 / Schedule 1. Reasonable adjustments here could include: large-print or reformatted RAMS, screen-reader access, an audio briefing of the key points, more time to read, or a one-to-one walk-through. The apprentice asks (in writing if possible) for a specific adjustment; the employer is obliged to consider it and provide it unless it would be unreasonable. 'Sign and crack on' is not the lawful response.",
      "There is no route — dyslexia is a learning difficulty, not a disability under the Equality Act, so the reasonable-adjustments duty does not apply. The apprentice's only option is to improve their reading in their own time; the employer has no legal obligation to change how the RAMS is presented, and signing it as instructed is the correct course.",
      "The apprentice should sign the RAMS but add a written note that they could not read it. Once the disclaimer is recorded, responsibility for any misunderstanding passes to the employer, the duty under the Act is satisfied, and the apprentice can begin work knowing they are legally protected by the note they have added.",
      "The reasonable-adjustments duty falls on the apprentice, not the employer — under s.20 it is the disabled worker who must arrange and pay for any aid they need, such as buying their own screen-reader software. The employer's only role is to permit the aid to be used; it has no duty to provide or fund it.",
    ],
    correctIndex: 0,
    explanation:
      "Reasonable adjustments under s.20 are one of the most practical parts of the Equality Act for an apprentice. Dyslexia, dyspraxia, ADHD, ASD, hearing impairment, mobility impairment — all are recognised disabilities under s.6 / Schedule 1 if the impairment has a substantial and long-term adverse effect on day-to-day activities. The duty is on the employer to provide reasonable adjustments — not on the apprentice to 'tough it out'. The first step is a written request specifying the adjustment needed; if the employer refuses without a defensible reason, the apprentice has potential claims for failure to make reasonable adjustments and (depending on the facts) disability discrimination.",
  },
  {
    id: 'mod5-s2-sub4-banter-trap',
    question:
      "On a fit-out, a colleague repeatedly makes 'jokes' about another worker's accent and visible religious dress. The other worker says nothing but visibly tenses up. The colleague says 'it's just banter, they don't mind'. What does the law actually say?",
    options: [
      "Equality Act s.26 defines harassment as unwanted conduct related to a relevant protected characteristic that has the purpose OR EFFECT of violating the recipient's dignity, or creating an intimidating, hostile, degrading, humiliating or offensive environment for them. The test is largely about the impact on the recipient, not the intention of the speaker. 'It's just banter' and 'they didn't complain' are not defences. The colleague is committing harassment under the Act, the employer is potentially liable for failing to prevent it, and both could face Employment Tribunal claims.",
      "It is only harassment if the recipient formally objects at the time. Because the worker said nothing and did not complain, the conduct is lawful — the Act requires the victim to make their objection clear before any comment can count as harassment, so silence is treated as consent and the colleague has committed no offence.",
      "It depends entirely on the colleague's intention. Since the colleague meant it as a joke and not as an insult, there is no harassment — the Act tests what was in the speaker's mind, so good-natured intent is a complete defence regardless of how the comments landed with the person on the receiving end.",
      "It is a matter for the two workers to sort out between themselves, not a legal issue. Banter on site falls outside the Equality Act because it happens between colleagues of equal rank rather than being directed downwards by a manager, so neither the colleague nor the employer can face any Tribunal claim over it.",
    ],
    correctIndex: 0,
    explanation:
      "The s.26 harassment test is deliberately broad — it covers the EFFECT on the recipient, not just the intent of the speaker. So 'I didn't mean it that way' isn't a defence if the conduct had a degrading or offensive effect. The recipient's silence isn't consent — many people don't complain because they fear consequences. Sites with a 'banter culture' that touches on protected characteristics are sites that are accumulating Tribunal exposure. The employer's defence (under s.109) requires showing they 'took all reasonable steps' to prevent the conduct — which means policy + training + active enforcement, not 'we hung up a poster'.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the Equality Act 2010 and what's its purpose?",
    options: [
      "A piece of health and safety law made under HASAWA that requires employers to assess the risk of stress, fatigue and discrimination on site and to record the findings in the same way as any other workplace risk assessment. It is enforced by the HSE through Improvement and Prohibition Notices, not through the Employment Tribunals.",
      "A consolidated Act of Parliament that brings together earlier UK anti-discrimination legislation (Race Relations Act, Sex Discrimination Act, Disability Discrimination Act and others) into a single framework. It defines nine protected characteristics, prohibits direct and indirect discrimination, harassment and victimisation, and places a duty on employers (and others) to make reasonable adjustments for disabled people. Enforced through Employment Tribunals (workplace) and County Courts (services).",
      "A voluntary code of practice published by ACAS that encourages employers to treat staff fairly. It carries no legal force of its own — a breach cannot be taken to a Tribunal — but firms that adopt it can display an 'equal opportunities' badge, which improves their standing on public-sector tender questionnaires.",
      "An EU Directive that ceased to apply in the UK after Brexit. Since the UK left the European Union the Act no longer has effect, and workplace fairness is now governed solely by individual employment contracts and the firm's own internal policies rather than by any single overarching statute.",
    ],
    correctAnswer: 1,
    explanation:
      "The Equality Act 2010 is a consolidating Act — it brought together decades of separate anti-discrimination laws into one framework. It applies to employment, education, the provision of goods and services, public functions and the disposal of premises. For an apprentice the most relevant parts are Part 5 (work) — covering recruitment, terms, training, dismissal — and Part 2 (key concepts: the nine protected characteristics, the four main types of unlawful conduct).",
  },
  {
    id: 2,
    question:
      "What's the difference between 'direct discrimination' and 'indirect discrimination' under the Equality Act?",
    options: [
      "Direct discrimination is when the discrimination is done deliberately, while indirect discrimination is when it happens by accident. The two are sorted by the discriminator's intent — a deliberate insult is direct, an unintended one is indirect — and only direct discrimination, being intentional, can actually be taken to a Tribunal.",
      "Direct discrimination is committed by an employer, while indirect discrimination is committed by a colleague. The labels divide wrongdoers by their position — anything done by management is direct, anything done by a co-worker is indirect — so the same act is classed differently depending on who carried it out.",
      "Direct discrimination (s.13) is treating someone less favourably BECAUSE OF a protected characteristic — e.g. refusing to hire someone because they're female. Indirect discrimination (s.19) is applying a 'provision, criterion or practice' that looks neutral but puts people sharing a protected characteristic at a particular disadvantage and can't be objectively justified — e.g. requiring all apprentices to be over 6ft tall would indirectly discriminate against women on average. Both are unlawful.",
      "Direct discrimination relates to pay and conditions, while indirect discrimination relates to recruitment and promotion. The distinction is about which stage of employment the unfair treatment occurs at, so a pay decision is always direct and a hiring decision is always indirect, regardless of the reason behind it.",
    ],
    correctAnswer: 2,
    explanation:
      "The two work together. Direct discrimination targets the individual because of their characteristic. Indirect discrimination is more subtle — a seemingly neutral rule that disproportionately disadvantages people of a particular characteristic. The defence to indirect (but not direct) discrimination is 'objective justification' — the employer can show the rule is a proportionate means of achieving a legitimate aim. Most workplace discrimination claims fall into the indirect category because direct discrimination is increasingly recognised as obviously unlawful and people don't do it openly.",
  },
  {
    id: 3,
    question:
      "What's 'victimisation' under the Equality Act 2010 s.27?",
    options: [
      "Treating someone badly specifically because of their race or religion, as opposed to the other protected characteristics. Victimisation is the Act's name for discrimination on grounds of race and faith, which Parliament singled out for a separate section because those were the grounds covered by the earliest anti-discrimination laws.",
      "Bullying or intimidating a junior worker to make them quit. Victimisation under s.27 is the legal term for workplace bullying generally, whether or not a protected characteristic is involved, and it covers any sustained campaign that makes a worker's position untenable.",
      "Singling out one person for unfavourable treatment when a whole group shares the same characteristic. Victimisation occurs where an employer applies a rule to one individual but not to others in the same protected group, so the wrong is the inconsistency of treatment rather than the treatment itself.",
      "Treating someone less favourably because they have done a 'protected act' — typically making a discrimination complaint, supporting someone else's complaint, or giving evidence in a discrimination case. Victimisation is unlawful even if the original complaint was unsuccessful, provided it was made in good faith. The protection extends to apprentices, ex-employees and anyone else covered by the Act.",
    ],
    correctAnswer: 3,
    explanation:
      "Victimisation under s.27 protects the right to raise a discrimination complaint without retaliation. Without this protection, the entire Act's enforcement mechanism would collapse — people wouldn't complain because the consequences of complaining would be worse than the original discrimination. So the law explicitly catches the punishment-for-complaining behaviour and treats it as a separate unlawful act in itself. An apprentice who raises a discrimination concern and is then disciplined, demoted or sacked has a victimisation claim independent of the underlying discrimination claim.",
  },
  {
    id: 4,
    question:
      "Which protected characteristic gets specific additional protections during pregnancy and maternity leave under the Equality Act?",
    options: [
      "Pregnancy and maternity (s.18). The Act prohibits unfavourable treatment of women because of pregnancy or maternity leave during the 'protected period' (broadly, from the start of pregnancy to the end of maternity leave). This is a separate category to sex discrimination — pregnancy / maternity claims don't need a male comparator. It's one of the most enforced parts of the Act and a leading source of Employment Tribunal awards.",
      "Sex (s.11). The Act gives women extra protection during pregnancy by treating it as a sub-category of sex discrimination, so a pregnant worker must show that a man in the same situation would have been treated more favourably before she can bring a claim about her maternity leave.",
      "Disability (s.6). Pregnancy is classed as a temporary disability for the duration of the protected period, which is why the additional protections apply, and the employer's duty during maternity leave is the same reasonable-adjustments duty owed to any other disabled worker.",
      "Marriage and civil partnership (s.8). Because maternity rights historically attached to married women, the Act protects pregnancy through the marriage characteristic, and the additional protections apply only where the pregnant worker is married or in a civil partnership.",
    ],
    correctAnswer: 0,
    explanation:
      "Pregnancy and maternity is the eighth protected characteristic and gets its own dedicated section because it sits awkwardly with the standard 'comparator' approach used elsewhere in the Act. You don't need to compare a pregnant woman to a non-pregnant man — the question is just whether she was treated unfavourably because of pregnancy or maternity. Claims are common around demotion, exclusion from training, pay reduction, dismissal during or just after maternity leave. For a small electrical contractor it's an area where ignorance frequently turns into a costly Tribunal award.",
  },
  {
    id: 5,
    question:
      "Under Equality Act s.20, what does the 'duty to make reasonable adjustments' actually require an employer to do?",
    options: [
      "The employer must offer the same adjustments to every worker, disabled or not, so that no one is treated differently. The duty is about equal treatment — giving everyone identical equipment, hours and documents — and an employer who singled a disabled worker out for special arrangements would itself be discriminating against the rest of the workforce.",
      "Where a 'provision, criterion or practice', a physical feature, or a lack of an auxiliary aid puts a disabled person at a substantial disadvantage compared with others, the employer must take such steps as it is reasonable to take to avoid the disadvantage. Three sub-duties — adjust the practice, adjust the physical feature, provide the auxiliary aid. The duty is anticipatory in some contexts (services) and reactive in employment (kicks in when the employer knows or ought reasonably to know).",
      "The employer must pay the disabled worker a higher rate to compensate for any disadvantage caused by their condition. The duty is purely financial — a top-up on wages rather than any change to the work itself — and once the additional payment is made the employer has discharged its obligation under s.20 in full.",
      "The employer must reassign the disabled worker to lighter, less skilled duties regardless of their qualifications. The duty under s.20 is to move the worker away from any task that could be affected by their condition, even where adjusting the existing role would have been possible, so demotion is the standard reasonable adjustment.",
    ],
    correctAnswer: 1,
    explanation:
      "The reasonable-adjustments duty is what makes the Equality Act practically powerful for disabled workers. 'Reasonable' is judged by factors including the cost of the adjustment, the resources of the employer, the disruption involved, and the size of the disadvantage being addressed. For an electrical contractor the typical adjustments are large-print or audio versions of safety documents, modified PPE for size or hand grip differences, adjusted hours for fatigue-related conditions, or a quieter work environment for sensory-processing differences. The cost is usually modest; the legal exposure for refusing without reason is significant.",
  },
  {
    id: 6,
    question:
      "What's the standard remedy in an Employment Tribunal for a successful discrimination, harassment or victimisation claim under the Equality Act?",
    options: [
      "A criminal fine paid to the court, capped at £20,000, plus a formal caution placed on the employer's record. Equality Act breaches are prosecuted like health and safety offences, so the money goes to the state rather than to the claimant, who receives only an apology ordered by the Tribunal.",
      "Reinstatement to the job is the only remedy available — the Tribunal can order the employer to take the worker back on their original terms, but it has no power to award any money, so a claimant who has already found other work gains nothing from a successful claim.",
      "The Tribunal can order: (a) compensation (uncapped — covers financial loss AND injury to feelings, with the Vento bands setting brackets for the injury-to-feelings element), (b) a declaration of the rights of the parties, and (c) recommendations for the employer to take steps to obviate or reduce the adverse effect on the claimant. Aggravated and exemplary damages are also available in particularly serious cases. The compensation is paid by the employer (often vicariously liable for individual perpetrators) but individual perpetrators can also be named and held liable.",
      "Compensation strictly capped at one year's salary, the same ceiling that applies to ordinary unfair-dismissal awards. The cap covers everything — lost wages and any upset combined — so however serious the discrimination, the claimant can never recover more than twelve months' pay from the employer.",
    ],
    correctAnswer: 2,
    explanation:
      "Equality Act remedies are uncapped, unlike many unfair-dismissal awards. The Vento bands (most recently updated April 2025) set the injury-to-feelings brackets — Lower band ~£1,200 to ~£12,100, Middle band ~£12,100 to ~£36,400, Upper band ~£36,400 to ~£60,700, with exceptional cases above. On top of that, financial loss (lost wages, pension, future earning capacity) is uncapped. Vicarious liability under s.109 makes the employer liable for the acts of its employees done in the course of employment — unless the employer can show they took all reasonable steps to prevent the conduct.",
  },
  {
    id: 7,
    question:
      "Who is responsible if a colleague harasses another worker on site under Equality Act s.26?",
    options: [
      "Only the individual harasser. The Act holds people personally responsible for their own conduct, so the worker who made the comments is liable but the employer is not — a firm cannot be blamed for something one of its staff chose to do, and the claimant can only bring a claim against the individual.",
      "Only the employer. Because the firm is responsible for everything that happens on its site, the employer alone is liable for harassment, and the individual harasser faces no personal claim — the worst that can happen to them is internal disciplinary action by the firm itself.",
      "Neither, provided the firm has an equality policy in place. Once an employer has written and issued a policy, it has a complete defence, and the individual is protected too because they can point to the policy as evidence the firm — not they — was responsible for setting the standard of conduct.",
      "Both can be held liable. The individual harasser is personally liable under s.110 (helping a discriminatory act). The employer is vicariously liable under s.109 for acts done by the employee 'in the course of employment'. The employer's defence is to show they took 'all reasonable steps' to prevent the conduct — i.e. proper policies, training, monitoring and enforcement. A claimant can name both the individual and the employer in the same claim.",
    ],
    correctAnswer: 3,
    explanation:
      "The dual liability is what gives the Act its teeth. Without vicarious liability, employers would be incentivised to ignore harassment by employees. Without personal liability, perpetrators would face no consequences. The 'all reasonable steps' defence is real but demanding — courts are sceptical of policies that exist on paper but aren't enforced. Training that's never refreshed, complaints that aren't investigated, repeat offenders left in place — all undermine the defence. For a small electrical contractor this means having an active equality policy, refresher training and a clear complaints route, not just a one-off induction handout.",
  },
  {
    id: 8,
    question:
      "Where does the apprentice's responsibility under the Equality Act actually sit?",
    options: [
      "Personally bound under s.110 (helping someone else commit an unlawful act, e.g. participating in harassment) and as a witness who is duty-bound to co-operate with internal investigations. The apprentice's reputational and legal exposure grows if they participate in or condone discriminatory or harassing behaviour. The apprentice also has a route to RAISE concerns — internal complaints procedure, ACAS conciliation, Employment Tribunal claim — and is protected against victimisation under s.27 for raising them in good faith.",
      "Nowhere — the Act only binds employers and managers, so an apprentice has no responsibilities under it at all. As a junior worker the apprentice cannot commit discrimination or harassment in law, and joining in with discriminatory jokes carries no legal consequence for them however offensive the conduct.",
      "Only as a potential victim, never as a perpetrator. The apprentice is protected by the Act but cannot breach it, because the law assumes a trainee acts under instruction; any harassment the apprentice takes part in is attributed entirely to whoever was supervising them at the time.",
      "Solely in reporting other people's misconduct to management. The apprentice's only duty under the Act is to act as a witness and inform on colleagues who discriminate; their own conduct is outside the Act's scope, so they cannot themselves be named in a claim regardless of how they behave.",
    ],
    correctAnswer: 0,
    explanation:
      "Apprentices are workers under the Act and have both protections and responsibilities. Protections — they cannot be discriminated against, harassed or victimised because of a protected characteristic. Responsibilities — they cannot themselves be perpetrators or knowing participants in unlawful conduct, and they have a duty to engage honestly with internal investigations. The 'banter trap' catches apprentices who join in with discriminatory jokes thinking it's harmless — it isn't, in law or in their firm's disciplinary policy.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Why do I need to know about the Equality Act as an electrical apprentice?",
    answer:
      "Because it sets the legal floor for how people at work — including on site — treat each other. As an apprentice you're protected by the Act (you can't be discriminated against on the basis of a protected characteristic) and you're also bound by it (you can be personally liable for harassment or for helping someone else discriminate). On a typical electrical job you'll work alongside people of different ages, races, religions, sexual orientations, and with a range of disabilities and family situations — knowing the basic rules is essential to working professionally and to staying out of trouble. The Equality Act 2010 is a Level 2 awareness topic; detailed legal interpretation comes at Level 3 and beyond.",
  },
  {
    question: "What if I genuinely didn't mean anything by a comment that someone took the wrong way?",
    answer:
      "The law focuses largely on the EFFECT on the recipient, not just your intention. Under s.26 of the Act, harassment is unwanted conduct related to a protected characteristic that has the purpose OR EFFECT of violating someone's dignity or creating an intimidating / hostile / degrading / humiliating / offensive environment. So 'I didn't mean it that way' is not on its own a defence. The way to handle it: when told a comment caused offence, apologise, understand why it landed badly, don't repeat it. Repeated patterns of unintended-but-offensive comments still amount to harassment under the Act. The 'banter trap' is the assumption that intent is what matters — it isn't.",
  },
  {
    question: "Can my employer ask about my health, disability or pregnancy at interview?",
    answer:
      "Generally no. Equality Act s.60 places strict limits on pre-employment health enquiries — questions about health and disability before a job offer is made are unlawful in most circumstances. There are narrow exceptions (e.g. checking whether reasonable adjustments are needed for an interview, ensuring the candidate can carry out a function intrinsic to the role, monitoring for diversity purposes with consent). After a conditional offer, more questions are permitted as long as they're job-related. Pregnancy questions at interview are particularly sensitive and a frequent source of Tribunal claims. As an apprentice you're protected just like any other worker.",
  },
  {
    question: "What should I do if I see a colleague being treated badly because of a protected characteristic?",
    answer:
      "Several practical options. (1) Privately check whether the colleague wants to handle it themselves or wants help. Their consent matters — well-meaning escalation without consent can make things worse. (2) Raise it with the supervisor or H&S contact internally, in writing if possible. (3) For more serious or persistent issues, the firm's grievance procedure or HR contact is the formal route. (4) ACAS provides free conciliation. (5) An Employment Tribunal claim is the formal end of the road. Witness evidence — what you saw, when, who said what — is often what makes or breaks a Tribunal claim, so contemporaneous notes are valuable. Doing nothing is also an option but it's the option that lets the problem persist.",
  },
  {
    question: "What's a 'reasonable adjustment' in plain language and what kind of things count?",
    answer:
      "An adjustment to a working practice, a physical feature of the workplace, or the provision of an auxiliary aid that helps a disabled worker do their job on equal terms. For an electrical apprentice typical examples are: enlarged-print or audio versions of safety documents (for dyslexia or visual impairment), modified PPE (for size, hand grip or sensory differences), adjusted shift patterns (for fatigue-related conditions or medication needs), one-to-one rather than group briefings (for sensory-processing or anxiety conditions), written instructions backed up verbally (for hearing impairment), regular breaks (for chronic-pain or fatigue conditions). The test is whether it's REASONABLE for this employer in this context — small adjustments are almost always reasonable; very expensive or disruptive ones may not be.",
  },
  {
    question: "Where does scheme code-of-conduct sit alongside the Equality Act?",
    answer:
      "Scheme membership (NICEIC, NAPIT, Stroma, ELECSA and similar) typically requires members to comply with all relevant legislation, including the Equality Act. Most schemes also have their own code of professional conduct that covers customer treatment, dignity at work and behaviour on site. So a discriminatory or harassing incident can result in: the underlying Tribunal claim under the Equality Act, internal disciplinary action by the firm, AND possible scheme disciplinary action against the firm or individual. The three layers are independent — winning at Tribunal doesn't necessarily protect against scheme action, and avoiding a Tribunal doesn't mean the scheme has no view.",
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
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 4"
            title="Equality Act 2010 — fair treatment on site"
            description="Level 2 awareness — nine protected characteristics, reasonable adjustments for disabled workers, harassment, the banter trap, and the apprentice's own legal exposure."
            tone="emerald"
          />

          <TLDR
            points={[
              "Supplementary content — Level 2 awareness of the Equality Act 2010 in a trade context. Detailed legal interpretation is Level 3+.",
              "Nine protected characteristics — age, disability, gender reassignment, marriage / civil partnership, pregnancy / maternity, race, religion or belief, sex, sexual orientation. Discrimination, harassment or victimisation BECAUSE OF any of them is unlawful at work.",
              "Reasonable adjustments duty (s.20) — employer must adapt practices, physical features and provide auxiliary aids where a disabled worker would otherwise be at a substantial disadvantage. Practical at trade level — large-print RAMS, modified PPE, adjusted hours.",
              "The banter trap — s.26 harassment is judged largely by the EFFECT on the recipient, not the intent of the speaker. 'It's just banter' isn't a defence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the nine protected characteristics under Equality Act 2010 s.4 — age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.",
              "Distinguish between direct discrimination (s.13), indirect discrimination (s.19), harassment (s.26) and victimisation (s.27) — the four main types of unlawful conduct.",
              "Explain the reasonable-adjustments duty under Equality Act s.20 and give practical examples in an electrical-trade context (large-print RAMS, modified PPE, adjusted hours, written-plus-verbal instructions).",
              "Describe the 'banter trap' — why s.26 harassment is judged largely by the effect on the recipient rather than the intent of the speaker, and why 'they didn't complain' is not a defence.",
              "State the dual liability under s.109 (employer vicariously liable) and s.110 (individual personally liable) for discrimination and harassment, and the 'all reasonable steps' employer defence.",
              "Recognise the apprentice's own protections (against discrimination, harassment and victimisation) and responsibilities (against being a perpetrator or knowing participant), and the route to raise concerns through internal procedures, ACAS and Employment Tribunal.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters on site</ContentEyebrow>

          <ConceptBlock
            title="The Equality Act sets the legal floor for how everyone on site treats each other"
            plainEnglish="The Equality Act 2010 is the consolidated UK anti-discrimination law. It brought together earlier separate Acts (Race Relations, Sex Discrimination, Disability Discrimination, etc.) into one framework. It defines nine protected characteristics, prohibits four main types of unlawful conduct, and places duties on employers (and on individuals) to act fairly."
            onSite="The trade is changing. Sites are more diverse than they were a generation ago, and the legal expectations on conduct are higher. As an apprentice you'll work alongside people of different ages, races, religions, sexual orientations, and with a range of disabilities and family situations. Knowing the Equality Act basics is part of being professional, part of staying out of disciplinary trouble with the firm, and part of staying out of legal trouble with an Employment Tribunal."
          >
            <p>
              The four main types of unlawful conduct under the Act:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct discrimination (s.13)</strong> — treating someone less favourably
                BECAUSE OF a protected characteristic. Example: refusing to hire an apprentice
                because they&apos;re female.
              </li>
              <li>
                <strong>Indirect discrimination (s.19)</strong> — applying a &apos;provision,
                criterion or practice&apos; (PCP) that looks neutral but puts people sharing a
                protected characteristic at a particular disadvantage and isn&apos;t objectively
                justified. Example: requiring all apprentices to be over 6ft tall.
              </li>
              <li>
                <strong>Harassment (s.26)</strong> — unwanted conduct related to a protected
                characteristic with the purpose OR EFFECT of violating dignity or creating an
                intimidating / hostile / degrading / humiliating / offensive environment.
              </li>
              <li>
                <strong>Victimisation (s.27)</strong> — treating someone less favourably because
                they have done a &apos;protected act&apos; (typically raising a complaint or
                supporting another&apos;s complaint).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — s.4 (protected characteristics, paraphrased summary)"
            clause={
              <>
                Section 4 of the Equality Act 2010 lists the &apos;protected
                characteristics&apos; recognised by the Act as — (paraphrased)
                <em> age; disability; gender reassignment; marriage and civil partnership;
                pregnancy and maternity; race; religion or belief; sex; sexual orientation</em>.
                Subsequent sections (s.5 to s.12) define each characteristic in more detail.
                Discrimination, harassment or victimisation BECAUSE OF a protected
                characteristic is prohibited in employment, education, the provision of
                services, public functions and the disposal of premises.
              </>
            }
            meaning={
              <>
                The nine protected characteristics are the closed list of categories that the
                Act protects. Any unlawful conduct under the Act has to be linked back to one of
                these nine. For an apprentice, the practical takeaway is that decisions about
                you (recruitment, training, allocation, pay, dismissal) cannot lawfully be made
                because of any of these nine characteristics, AND comments / jokes / treatment
                directed at you OR at colleagues based on these characteristics is unlawful.
                Sex, race and disability are the most-litigated, but pregnancy / maternity and
                age claims are also common.
              </>
            }
            cite="Source: paraphrased summary of Equality Act 2010 (2010 c.15) s.4 to s.12. For the verbatim current text consult legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>The reasonable-adjustments duty — s.20</ContentEyebrow>

          <ConceptBlock
            title="Reasonable adjustments are practical, often inexpensive and legally required"
            plainEnglish="Equality Act s.20 places a duty on employers to make 'reasonable adjustments' to practices, physical features and the provision of auxiliary aids where a disabled worker would otherwise be at a substantial disadvantage compared with non-disabled workers. The duty is positive — the employer has to act, not just refrain from discriminating. It kicks in when the employer knows or ought reasonably to know about the disability."
            onSite="In trade context, most reasonable adjustments are practical and inexpensive. Large-print or audio versions of safety documents for dyslexia or visual impairment. Modified PPE for size, hand grip or sensory differences. Adjusted shift patterns for fatigue-related conditions or medication needs. Written instructions backed up verbally for hearing impairment. Regular breaks for chronic-pain or fatigue conditions. The cost is typically modest; the legal exposure for refusing without reason is significant."
          >
            <p>
              The three sub-duties under s.20:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Adjust the practice</strong> — change a &apos;provision, criterion or
                practice&apos; that puts the disabled person at a substantial disadvantage.
                Example: standard 8am team brief replaced (or supplemented) by a written version
                emailed the day before, for an apprentice with autism who needs prep time.
              </li>
              <li>
                <strong>Adjust the physical feature</strong> — alter or remove a physical feature
                that puts the disabled person at a substantial disadvantage. Example: providing
                a step or ramp for access to a site cabin, or an adapted workbench for a worker
                with a wheelchair or crutches.
              </li>
              <li>
                <strong>Provide an auxiliary aid</strong> — provide an aid or service that helps
                the disabled person. Example: screen-reader software, a sign-language
                interpreter for an induction, captioned videos for safety briefings.
              </li>
            </ul>
            <p>
              &apos;Reasonable&apos; is judged on factors including the cost, the resources of
              the employer, the disruption to the work, and the size of the disadvantage being
              addressed. A FTSE 100 client and a four-person electrical contractor will have
              different ranges of &apos;reasonable&apos; — but the duty applies to both,
              proportionately.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What 'disability' actually means under the Equality Act"
            plainEnglish="A person has a disability under Equality Act s.6 if they have a physical or mental impairment AND the impairment has a substantial AND long-term adverse effect on their ability to carry out normal day-to-day activities. 'Substantial' means more than minor or trivial. 'Long-term' generally means lasting or expected to last 12 months or more."
            onSite="The legal definition is broader than most people assume. It includes obvious cases (mobility impairment, sensory impairment) AND less-obvious ones (dyslexia, dyspraxia, ADHD, autism, depression, anxiety, diabetes, epilepsy, chronic pain, cancer in remission, HIV, MS, certain disfigurements). It does NOT generally include short-term injuries or transient conditions. Whether a particular impairment qualifies is a fact-specific question, and Tribunals routinely accept conditions employers had assumed were 'not really a disability'."
          >
            <p>
              Common impairments that meet the s.6 test in many cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensory</strong> — sight or hearing impairment that has substantial,
                long-term effect.
              </li>
              <li>
                <strong>Mobility</strong> — wheelchair use, crutches, chronic pain conditions
                affecting movement.
              </li>
              <li>
                <strong>Cognitive / neurodevelopmental</strong> — dyslexia, dyspraxia, ADHD,
                autism spectrum, where the effect on day-to-day activity is substantial.
              </li>
              <li>
                <strong>Mental health</strong> — depression, anxiety, PTSD, where the effect on
                day-to-day activity is substantial and long-term.
              </li>
              <li>
                <strong>Long-term medical</strong> — diabetes, epilepsy, MS, cancer (deemed
                disability from diagnosis), HIV (deemed disability from diagnosis), and others.
              </li>
            </ul>
            <p>
              The deemed-disability provisions (Schedule 1 Part 1, paragraph 6) automatically
              treat cancer, HIV and MS as disabilities from diagnosis, regardless of effect.
              Other progressive conditions can qualify as disabilities even before they have
              a substantial effect, where the effect is likely to develop.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — s.20 (duty to make adjustments, paraphrased summary)"
            clause={
              <>
                Section 20 of the Equality Act 2010 places a three-part duty on employers (and
                others to whom the duty applies) to make reasonable adjustments where a
                &apos;provision, criterion or practice&apos;, a physical feature, or the absence
                of an auxiliary aid puts a disabled person at a substantial disadvantage in
                comparison with persons who are not disabled. The first requirement is to take
                such steps as it is reasonable to take to avoid the disadvantage; the second is
                to take such steps to alter or remove the physical feature; the third is to
                provide the auxiliary aid. The duty is anticipatory in some contexts (provision
                of services) and reactive in employment (kicks in once the employer knows or
                ought reasonably to know).
              </>
            }
            meaning={
              <>
                The reasonable-adjustments duty is the most practically powerful part of the
                Equality Act for many disabled workers. It&apos;s a positive duty — the employer
                has to do something, not just refrain from discriminating. The kick-in test
                (knowledge or constructive knowledge of the disability) means that an apprentice
                who needs adjustments should make the request in writing, with specifics. From
                the moment the employer is on notice, the duty applies. Failure to make
                reasonable adjustments is itself a separate unlawful act under s.21 — claimable
                in the Employment Tribunal alongside any disability-discrimination claim.
              </>
            }
            cite="Source: paraphrased summary of Equality Act 2010 (2010 c.15) s.20 and s.21. For the verbatim current text consult legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Harassment and the banter trap — s.26</ContentEyebrow>

          <ConceptBlock
            title="The s.26 test focuses on the EFFECT on the recipient, not the intent of the speaker"
            plainEnglish="Section 26 defines harassment as unwanted conduct related to a relevant protected characteristic that has the PURPOSE OR EFFECT of violating someone's dignity or creating an intimidating / hostile / degrading / humiliating / offensive environment. The 'or effect' is what makes the test broad — even unintentional conduct can be harassment if the impact crosses the line."
            onSite="The 'banter trap' on site is the assumption that what feels like harmless joking to one person is harmless joking to everyone. It isn't. Comments about accent, religious dress, sexuality, age, gender — even when delivered as 'banter' — can amount to harassment under s.26 if they affect the dignity of the recipient. The recipient's silence isn't consent: many people don't object because they fear being labelled humourless, or worse, retaliated against."
          >
            <p>
              The s.26 test broken down:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unwanted conduct</strong> — anything from a spoken comment to a physical
                act, an email, a WhatsApp message, a meme, a poster.
              </li>
              <li>
                <strong>Related to a relevant protected characteristic</strong> — the conduct has
                to be linked to one of the nine. Random unkindness isn&apos;t s.26 harassment
                (though it may breach a different policy). A comment specifically about race,
                gender, sexuality, religion etc. is.
              </li>
              <li>
                <strong>Purpose OR effect</strong> — the &apos;or&apos; is critical. If the
                speaker intended to harass, that&apos;s s.26. If the speaker didn&apos;t intend
                to but the effect on the recipient was to violate dignity or create an
                offensive environment, that&apos;s ALSO s.26.
              </li>
              <li>
                <strong>The court considers</strong> — the perception of the recipient, the
                other circumstances of the case, AND whether it is reasonable for the conduct to
                have that effect. So a hyper-sensitive complaint over a trivial remark might
                fail the &apos;reasonable&apos; test, but most genuine harassment claims pass it
                comfortably.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Vicarious liability — the firm pays for the individual's conduct"
            plainEnglish="Equality Act s.109 makes the employer vicariously liable for acts done by an employee in the course of employment. So when one electrician harasses another on site, the employer is on the hook for compensation, not just (or instead of) the individual. The employer's defence is to show under s.109(4) that they took 'all reasonable steps' to prevent the conduct."
            onSite="The 'all reasonable steps' defence is real but demanding. Courts are sceptical of policies that exist on paper but aren't enforced. Training that's never refreshed, complaints that aren't investigated, repeat offenders left in place — all undermine the defence. For a small electrical contractor this means having an active equality policy, refresher training, a clear complaints route AND visible enforcement. Apprentices benefit from this because they know the route to raise concerns; the firm benefits because the defence is genuinely available."
          >
            <p>
              Two parallel routes to legal liability for harassment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The individual perpetrator</strong> can be sued personally under s.110
                (helping someone else commit an unlawful act) and named in the Tribunal claim.
                Personal liability includes financial liability for compensation if the employer
                is unable to pay.
              </li>
              <li>
                <strong>The employer</strong> is vicariously liable under s.109 unless they can
                prove the &apos;all reasonable steps&apos; defence. A successful defence
                requires more than just a written policy — it needs evidence of training,
                monitoring and enforcement.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — s.26 (harassment, paraphrased summary)"
            clause={
              <>
                Section 26 of the Equality Act 2010 defines harassment as: A person (A)
                harasses another (B) if (paraphrased) A engages in unwanted conduct related to
                a relevant protected characteristic, AND the conduct has the purpose OR EFFECT
                of violating B&apos;s dignity, OR creating an intimidating, hostile, degrading,
                humiliating or offensive environment for B. In deciding whether the conduct has
                that effect, the court takes into account the perception of B, the other
                circumstances of the case, AND whether it is reasonable for the conduct to have
                that effect. Separate provisions cover sexual harassment and harassment for
                rejecting or submitting to conduct.
              </>
            }
            meaning={
              <>
                The s.26 test is deliberately broad. The &apos;or effect&apos; element is what
                catches the &apos;banter&apos; defence — speaker intent isn&apos;t the only
                factor; the effect on the recipient and what is reasonable for the conduct to
                produce that effect are also weighed. The recipient&apos;s perception is a
                starting point, not the only test — the court still asks whether it&apos;s
                &apos;reasonable&apos; for the conduct to have that effect, which filters out
                hypersensitive claims while still catching most genuine harassment. For an
                apprentice the practical lesson is: if a comment relates to one of the nine
                protected characteristics and could reasonably affect dignity, don&apos;t make
                it. Don&apos;t laugh at it either — joining in puts you on the s.110 hook
                personally.
              </>
            }
            cite="Source: paraphrased summary of Equality Act 2010 (2010 c.15) s.26 and s.109/s.110. For the verbatim current text consult legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="ACAS guidance — the practical reference for everyone on site"
            plainEnglish="ACAS (the Advisory, Conciliation and Arbitration Service) publishes free, practical guidance on workplace conduct including the well-known guide 'Bullying and harassment at work'. ACAS guidance isn't legally binding in itself, but it's the standard reference for what reasonable workplace conduct and reasonable employer responses look like. Employment Tribunals routinely cite ACAS guidance when deciding whether an employer's response was reasonable."
            onSite="The ACAS bullying-and-harassment guidance is a useful Level 2 read because it translates the Equality Act into plain-English workplace examples. It also covers behaviour that isn't strictly Equality-Act unlawful (general bullying without a protected-characteristic link) but that breaches employer duty of care and most internal disciplinary policies. For an apprentice the takeaway is that the standard for professional site behaviour is set higher than the legal floor — the legal floor is the Equality Act; the practical floor is ACAS-style civility."
          >
            <p>
              What ACAS guidance typically covers (paraphrased — current text on acas.org.uk):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Definitions</strong> — what counts as bullying, what counts as
                harassment, the overlap with Equality Act unlawful conduct.
              </li>
              <li>
                <strong>Examples by setting</strong> — workplace, on-site, online, in formal
                meetings, in informal conversation.
              </li>
              <li>
                <strong>Practical responses</strong> — how to raise a concern, how a manager
                should respond, how to investigate, what records to keep.
              </li>
              <li>
                <strong>Mediation and conciliation</strong> — the ACAS Early Conciliation
                process is now a mandatory step before most Employment Tribunal claims.
              </li>
              <li>
                <strong>Policy templates</strong> — model policies that small firms can adopt
                or adapt.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The apprentice's own position</ContentEyebrow>

          <ConceptBlock
            title="Protections AND responsibilities — both apply to you"
            plainEnglish="The Equality Act treats the apprentice as a worker with both legal protections (against being on the receiving end of discrimination, harassment or victimisation) and legal responsibilities (against being a perpetrator or knowing participant). Both apply from day one, regardless of grade or training stage."
            onSite="The protection side: you cannot be discriminated against, harassed or victimised for any of the nine protected characteristics. You have a route to complain (internal grievance, ACAS, Employment Tribunal) and you cannot lawfully be punished for raising a complaint in good faith. The responsibility side: don't make discriminatory comments, don't join in with harassment, don't help the firm act unlawfully. The 'I was just one of many laughing along' defence puts you on the s.110 hook."
          >
            <p>
              Practical guidance for an apprentice navigating the Act on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Don&apos;t make jokes about protected characteristics</strong> — even
                ones that &quot;everyone laughs at&quot;. The legal test isn&apos;t whether
                everyone laughs; it&apos;s whether the conduct could reasonably affect the
                dignity of the recipient.
              </li>
              <li>
                <strong>Don&apos;t join in</strong> when others do. Laughing along, repeating
                the joke, posting the meme — all potentially s.110 conduct. Walk away or
                redirect the conversation.
              </li>
              <li>
                <strong>Speak up</strong> when something obviously unlawful is happening. If
                you&apos;re not comfortable speaking up to the perpetrator directly, raise it
                with the supervisor or H&amp;S contact in writing. Witnesses make or break
                Tribunal claims.
              </li>
              <li>
                <strong>If you need a reasonable adjustment</strong>, request it in writing with
                specifics. The employer&apos;s s.20 duty kicks in from the point they know or
                ought reasonably to know. A specific written request is the cleanest way to put
                them on notice.
              </li>
              <li>
                <strong>If you&apos;re on the receiving end</strong> of discriminatory or
                harassing conduct, log what happened (date, time, what was said, who was
                present). Use the firm&apos;s grievance procedure first if you can. ACAS
                conciliation is free. Tribunal is the formal route — strict time limits apply
                (typically 3 months less one day from the act complained of).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The complaints route — internal first, ACAS next, Tribunal last"
            plainEnglish="If something goes wrong, the law expects (and most firms expect) issues to be raised internally first. That gives the firm a chance to fix it without legal escalation. ACAS Early Conciliation is the next step — a mandatory free conciliation service before most Employment Tribunal claims. The Tribunal is the formal end of the road, with strict time limits."
            onSite="An apprentice who knows the route is far better placed than one who doesn't. Most Equality Act issues resolve at the internal-grievance stage when raised properly. ACAS conciliation resolves most of the rest. Only a small fraction reach Tribunal — but the time limits to preserve the option are short, so timely action matters."
          >
            <p>
              The four-stage escalation route in detail:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Informal raise</strong> — raise the concern with the supervisor or
                directly with the colleague involved, where safe to do so. Document the
                conversation in writing afterwards (email summary is fine).
              </li>
              <li>
                <strong>Formal grievance</strong> — invoke the firm&apos;s written grievance
                procedure. ACAS publishes a Code of Practice on Disciplinary and Grievance
                Procedures that every employer is expected to follow.
              </li>
              <li>
                <strong>ACAS Early Conciliation</strong> — mandatory step before most Tribunal
                claims. Free, confidential, time-limited (typically 6 weeks). Many cases settle
                here.
              </li>
              <li>
                <strong>Employment Tribunal claim</strong> — formal claim filed within the
                statutory time limit (typically 3 months less one day from the act complained
                of, sometimes extended by ACAS conciliation). Hearings, evidence,
                cross-examination, judgment, remedy.
              </li>
            </ol>
            <p>
              The apprenticeship provider, the union (if you&apos;re a member) and Citizens
              Advice are useful sources of free advice at any stage. Specialist employment
              solicitors offer initial consultations and may take cases on no-win-no-fee terms
              for stronger claims.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming 'it was just a joke' is a defence"
            whatHappens={
              <>
                A senior on a fit-out repeatedly makes &apos;jokes&apos; about a younger
                colleague&apos;s religion — taking the mick about prayer times, dietary
                restrictions, religious dress. The colleague says nothing in the moment but
                eventually raises a grievance. The senior&apos;s defence in the internal
                investigation is &quot;it was just banter, no-one ever complained&quot;. The
                investigation finds the conduct amounts to s.26 harassment regardless of
                intent, the colleague brings a Tribunal claim, the firm settles for a five-
                figure sum, and the senior is dismissed for gross misconduct. The
                apprentices and other colleagues who laughed along during the comments are
                also exposed to s.110 personal-liability arguments and disciplinary action.
              </>
            }
            doInstead={
              <>
                Treat the s.26 test seriously. If a comment relates to a protected
                characteristic AND could reasonably affect someone&apos;s dignity, don&apos;t
                make it — and don&apos;t laugh at it when others do. &apos;Banter&apos; that
                touches on the nine protected characteristics is a Tribunal claim waiting to
                happen. The professional move is to redirect the conversation, walk away, or
                (if you&apos;re confident) call it out at the time — &quot;mate, that&apos;s
                not on, leave it&quot;. Apprentices who laugh along get caught in the same net
                as the perpetrator; apprentices who don&apos;t are professionally clean.
              </>
            }
          />

          <CommonMistake
            title="Treating reasonable adjustments as 'special treatment'"
            whatHappens={
              <>
                A new apprentice with dyslexia asks for written instructions to be supplemented
                with a verbal walk-through and asks for a few extra minutes to read RAMS
                documents. The supervisor responds &quot;we don&apos;t do special treatment here,
                you need to keep up like everyone else&quot;. The apprentice struggles, makes
                errors that look like incompetence, gets disciplined, eventually raises a
                grievance about the failure to make reasonable adjustments. The Tribunal claim
                under s.21 (failure to make reasonable adjustments) succeeds because the
                supervisor&apos;s &apos;keep up&apos; response was on record and the firm had
                no documented consideration of the request. The compensation award includes
                injury to feelings (Vento middle band), lost earnings, and a recommendation
                that the firm overhauls its disability policies.
              </>
            }
            doInstead={
              <>
                Treat reasonable-adjustment requests seriously and document the response. If the
                request is reasonable, provide the adjustment — most adjustments cost very
                little and many improve safety and performance for everyone (e.g. clearer
                briefings benefit the whole crew). If the request isn&apos;t reasonable for
                some specific reason, document why, consider alternatives, and explain the
                decision in writing. The legal framing (s.20 duty kicks in once the employer
                knows or ought reasonably to know) means refusing without consideration is the
                worst possible answer. Reasonable adjustments aren&apos;t &apos;special
                treatment&apos; — they&apos;re the legal floor for fair treatment of disabled
                workers, and they&apos;re cheap insurance against expensive Tribunal claims.
              </>
            }
          />

          <Scenario
            title="Apprentice with dyslexia struggling with dense RAMS"
            situation={
              <>
                You&apos;re a new apprentice with dyslexia. The morning toolbox brief includes a
                12-page RAMS document with dense small-print text and lots of acronyms. The
                supervisor reads through it at speed and asks everyone to sign. You&apos;re
                struggling to keep up but you don&apos;t want to be the one slowing the brief.
                The supervisor says &quot;just sign it, you can read it later&quot;.
              </>
            }
            whatToDo={
              <>
                The reasonable-adjustment route is yours by right under Equality Act s.20.
                Practical steps: (1) Tell the supervisor in writing (text or email is fine)
                that you have dyslexia and need an adjustment. Be specific — &quot;please can
                I have RAMS documents in large-print or as an audio file the day before, OR
                a one-to-one walk-through before signing&quot;. (2) Don&apos;t sign anything
                you haven&apos;t been able to properly read — signing is taken as confirmation
                you&apos;ve understood the controls, and that&apos;s a HASAWA s.7 co-operate
                point too. (3) The employer&apos;s duty kicks in from the moment they know or
                ought reasonably to know; your written request puts them on notice. (4) If the
                supervisor refuses without a defensible reason, escalate to the firm&apos;s
                H&amp;S contact or HR equivalent. (5) If the firm fails to engage, the formal
                routes are internal grievance → ACAS conciliation → Employment Tribunal claim
                under s.21 (failure to make reasonable adjustments). Most adjustments cost
                very little and most disputes resolve internally — but the legal framework
                gives you real leverage.
              </>
            }
            whyItMatters={
              <>
                This scenario is one of the most common practical Equality Act issues for
                apprentices. Dyslexia, dyspraxia, ADHD, ASD, hearing impairment, mobility
                impairment — all are recognised disabilities under s.6 / Schedule 1 if the
                impairment has a substantial and long-term adverse effect on day-to-day
                activities. The reasonable-adjustments duty is the law&apos;s recognition that
                fair treatment doesn&apos;t mean identical treatment — it means equal access to
                opportunities and information. Apprentices who don&apos;t know to ask end up
                struggling, getting disciplined for &apos;poor performance&apos; that&apos;s
                actually unmet adjustment needs, and (often) leaving the trade. Apprentices who
                do know to ask get the adjustments and progress normally. The firm benefits
                too — the alternative is a Tribunal claim that costs more than a year of
                adjustments would have done.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Equality Act 2010 is the consolidated UK anti-discrimination law. Nine protected characteristics — age, disability, gender reassignment, marriage / civil partnership, pregnancy / maternity, race, religion or belief, sex, sexual orientation.",
              "Four main types of unlawful conduct — direct discrimination (s.13), indirect discrimination (s.19), harassment (s.26), victimisation (s.27). All four are claimable in the Employment Tribunal.",
              "Reasonable-adjustments duty (s.20) — employer must adapt practices, physical features and provide auxiliary aids where a disabled worker would otherwise be at substantial disadvantage. Practical at trade level — large-print RAMS, modified PPE, adjusted hours, written-plus-verbal instructions.",
              "Harassment test (s.26) is judged largely by the EFFECT on the recipient, not the intent of the speaker. 'It's just banter' and 'they didn't complain' are not defences. The test catches conduct that affects dignity even when unintended.",
              "Dual liability — employer vicariously liable under s.109; individual personally liable under s.110. The 'all reasonable steps' employer defence requires policy + training + active enforcement, not paper-only compliance.",
              "Tribunal remedies are uncapped — financial loss is unlimited, injury to feelings sits in the Vento bands (Lower / Middle / Upper / Exceptional), and aggravated damages are available in serious cases.",
              "Apprentice protections — cannot be discriminated against, harassed or victimised for any protected characteristic. Protected from victimisation under s.27 for raising complaints in good faith.",
              "Apprentice responsibilities — don't make discriminatory comments, don't join in with harassment, don't help the firm act unlawfully. Joining in with banter that crosses the s.26 line puts you on the s.110 hook personally.",
            ]}
          />

          <Quiz title="Equality Act 2010 — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 HSE vs Local Authority enforcement
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Communication methods
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
