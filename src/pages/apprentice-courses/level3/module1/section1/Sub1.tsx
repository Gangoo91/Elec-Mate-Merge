/**
 * Module 1 · Section 1 · Subsection 1 — HASAWA dutyholder responsibilities at L3
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.1 — own roles and responsibilities and those
 *     of others with regard to current relevant legislation
 *
 * L3 frames HASAWA as a duty system you sit inside, not a list of clauses.
 * You remember s.2, s.3 and s.7 from L2 — this Sub adds dutyholder, director
 * liability and the Sentencing Council Definitive Guideline.
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
  'HASAWA dutyholder responsibilities (1.1) | Level 3 Module 1.1.1 | Elec-Mate';
const DESCRIPTION =
  'L3 refresher on the Health and Safety at Work etc Act 1974 — dutyholder roles, director liability under s.37, Sentencing Council Definitive Guideline and the cascade from one breach to a corporate prosecution.';

const checks = [
  {
    id: 'l3-m1-s1-sub1-dutyholder',
    question:
      "You're an L3 apprentice running a small commercial fit-out alongside two L2 mates while the supervisor is on another site. A scaffolder asks you 'is it OK to drop a hammer down to the floor below?' Who carries the HASAWA duty if the hammer hits someone?",
    options: [
      "Your employment contract and the JIB Working Rules. The JIB Handbook sets the industry-standard overtime, travel-time, lodging and grading rules for electricians in England and Wales. Your contract should reference it (most reputable firms apply the JIB rates as a baseline). The HR docs — contract, JIB rules, holiday and grievance procedures — are how you get paid correctly and how you keep your rights if a dispute arises.",
      "Full incident details — date, time, location, casualty(ies) details, what happened, what they were doing, what equipment/substance involved, the kind of accident, the injury, who else was involved, any witness information, action taken since. Full and accurate completion is the responsible person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s job; gathering the facts is often the L3 operative\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s job.",
      "Any deliberate deviation from a BS 7671 requirement that the designer judges acceptable for the specific installation, with justification. E.g. omitting an RCD on a non-dwelling socket-outlet under the Reg 411.3.3 risk-assessment exception. Each departure must be documented with reasoning.",
      "Multiple parties simultaneously. The scaffolder owes a personal s.7 duty. Their employer owes s.2 (employees) and s.3 (non-employees affected). The principal contractor owes a CDM coordination duty that cascades into s.3. And you, if you tacitly approve the unsafe act, owe s.7(b) — failing to co-operate and potentially actively encouraging a breach. HASAWA stacks duties; it doesn't pick one person.",
    ],
    correctIndex: 3,
    explanation:
      "HASAWA is a layered duty regime. Remember from L2 — s.2 is the employer's duty to employees, s.3 is the employer's duty to non-employees, s.7 is the personal duty on every employee. At L3 the question shifts from 'what's MY duty?' to 'who else is on the duty list with me, and what happens if I sign off the unsafe act?'. Saying 'yeah crack on' to a dangerous practice puts you inside the duty chain. The HSE has prosecuted operatives (not just employers) under s.7 where they actively enabled the breach.",
  },
  {
    id: 'l3-m1-s1-sub1-director',
    question:
      "Your boss tells you to use an unsafe ladder because the firm hasn't replaced the stage 1 fail one yet. You refuse. Two days later another apprentice uses it and falls. The firm is prosecuted under HASAWA s.2. Can the director be prosecuted personally?",
    options: [
      "Site rules, welfare arrangements, fire muster point, first-aid arrangements, accident and near-miss reporting routes, the Construction Phase Plan headlines, the specific hazards on this site, the PPE policy, the no-go areas, your duties as a worker under Reg 15, and any project-specific risks (asbestos survey results, live services, traffic management). The induction is the formal mechanism for transferring CDM information from the Principal Contractor to operatives joining the site.",
      "Yes — HASAWA s.37 makes a director, manager, secretary or similar officer personally liable where a corporate offence is committed with their consent, connivance or attributable to their neglect. Knowing the ladder failed inspection and authorising its continued use is textbook s.37 territory. The Sentencing Council Definitive Guideline for Health and Safety Offences (2016) sets the personal sentence range; for high-culpability cases it includes custody.",
      "Several major changes: broader recommendation for Arc Fault Detection Devices (AFDDs) under Reg 421.1.7 (recommending wording, not mandating — HRRBs are made mandatory via the Building Safety Act 2022), updated TN-C-S (PNB) handling guidance, revised schedule columns on certificates (forms updated), updated requirements for renewables and energy storage, revised special-locations content. A4 represents the most significant single amendment to BS 7671 in recent memory.",
      "The UK grid has decarbonised rapidly: from ~500 gCO₂/kWh in 2012 to under 200 gCO₂/kWh in recent years (varies by year and operating conditions). As the grid gets cleaner, electrified heat (heat pumps) and electrified transport (EVs) get cleaner too — even if the kit itself doesn't change. That's why government policy pushes electrification: every year of grid progress automatically improves the carbon footprint of every heat pump and EV already installed.",
    ],
    correctIndex: 1,
    explanation:
      "HASAWA s.37 is the personal director-liability route. The Sentencing Council Definitive Guideline categorises offences by culpability (very high → low) and harm (level A → C). A director who knowingly authorises an unsafe practice sits in the 'high culpability' band and the starting points for individuals include custodial sentences. This is one of the biggest L2→L3 shifts — at L3 you may be talking to directors, supervisors and clients about why a job stops, and knowing the personal liability hook gives the conversation weight.",
  },
  {
    id: 'l3-m1-s1-sub1-sfairp',
    question:
      "The phrase 'so far as is reasonably practicable' (SFAIRP) appears throughout HASAWA. What does it actually mean in court?",
    options: [
      "It means 'do whatever is convenient'.",
      "Edwards v National Coal Board [1949] established the test — the duty is discharged when the cost (in money, time and trouble) of further measures becomes 'grossly disproportionate' to the risk. The dutyholder bears the burden of proving they did everything SFAIRP — not the prosecution proving otherwise. So 'we couldn't afford it' is rarely a defence; 'the residual risk was so small that the next control would have cost ten times its safety benefit' is.",
      "It means 'whatever the trade union accepts'.",
      "It means 'whatever Building Regulations require'.",
    ],
    correctIndex: 1,
    explanation:
      "Edwards v NCB is the cornerstone HASAWA case. The reverse burden of proof is the bit that surprises new supervisors — once the prosecution proves a risk existed, you have to prove you did everything reasonably practicable. That's why the paper trail (risk assessments, toolbox talks, training records, near-miss logs) matters so much at L3 — it's your evidence base in a defence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does HASAWA s.2 require of the employer?",
    options: [
      "Conduct a gap analysis against AM2 criteria, create a 6-month preparation plan with milestones, arrange practice assessments, and discuss potentially deferring if progress is insufficient",
      "To ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees — including safe systems of work, safe plant, training, supervision and a written safety policy where five or more employees are employed.",
      "Compile a proportionate file including the asbestos management survey/R&D survey data, as-built structural drawings showing concealed steelwork, details of the unusual pipework and heating system, and a register of residual risks",
      "On the metal consumer-side pipe, within 600 mm of the meter outlet union per Reg 544.1.2. The plastic supply pipe is not an extraneous-conductive-part (it can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t introduce a potential) so doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need bonding — but the metal consumer pipework downstream of the meter does.",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.2 is the umbrella employer duty. The 'five or more employees' threshold for a written safety policy is the same threshold MHSWR Reg 3(6) uses for recording risk assessments — almost every electrical contracting firm crosses it.",
  },
  {
    id: 2,
    question: "What's the difference between s.2 and s.3?",
    options: [
      "At least 3 months before the planned EPA date — allowing time to complete any outstanding requirements, gather evidence for portfolio gaps, obtain certificates, and conduct a thorough readiness review",
      "Non-conformance issued, given a deadline to evidence calibration, re-assessed. Persistent failure or refusal to remediate triggers escalation: warning, suspension, removal from scheme. Scheme rules are contractual — you signed up to them in writing on enrolment.",
      "s.2 is the duty to employees; s.3 is the duty to non-employees affected by the work — customers, the public, other trades, visitors. On a domestic install it's s.3 that catches the customer's family. On a commercial fit-out it's s.3 that catches the trades next to you.",
      "(1) Verify CPP exists and reflects the work. (2) Verify client awareness conversation. (3) Brief operatives on the CPP. (4) Identify hazards via dynamic risk assessment. (5) Manage and monitor work in practice. (6) Document the day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safety actions. (7) Escalate issues. (8) Close out at end of project — lessons, records, cleanup.",
    ],
    correctAnswer: 2,
    explanation:
      "This is the L2 baseline — at L3 the layering matters because both duties run simultaneously. A single incident frequently breaches both — an apprentice injured (s.2) by a fall that also frightens the customer's child (s.3) is one event, two charges.",
  },
  {
    id: 3,
    question: "What does HASAWA s.7 place on the individual employee?",
    options: [
      "Generate both electricity and useful heat simultaneously from biomass fuel (wood chip, pellets, agricultural waste), achieving overall efficiencies of 70-85% by utilising the waste heat from electricity generation",
      "Comparing maintenance KPIs (PM compliance, planned ratio, MTBF, MTTR, maintenance cost as % of RAV, availability) against industry standards, similar organisations, and the organisation's own historical trends to identify improvement opportunities",
      "Describe your specific role and contributions within the team, the communication and coordination involved, and how the team activity demonstrates professional behaviours such as teamwork, communication and responsibility",
      "(a) To take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work; and (b) to co-operate with the employer or any other person to enable that person to comply with their statutory duty.",
    ],
    correctAnswer: 3,
    explanation:
      "Remember from L2 — s.7 is the personal duty. At L3 the s.7(b) co-operation limb gets sharper: 'cooperating' includes refusing the unsafe instruction and raising it. 'Following orders' is no defence. ERA 1996 s.44 protects you from detriment for raising the concern.",
  },
  {
    id: 4,
    question: "What does HASAWA s.37 do?",
    options: [
      "Establishes personal liability for company directors, managers, secretaries and similar officers where a corporate offence is committed with their consent, connivance or attributable to their neglect. Allows the HSE to prosecute the individual as well as (or instead of) the company.",
      "Make safe before leaving — typically isolate the circuit, lock off, label, and brief the duty holder verbally and in writing. The continuing duty under EAWR Reg 4 attaches to you as the person who identified the danger; leaving a known C1 unmitigated is potentially a criminal breach.",
      "Explain the BS 7671 special-location zones (Section 701) for rooms containing a bath or shower — socket outlets are prohibited within zones, with very limited exceptions (BS EN 61558-2-5 shaver sockets) — and offer the compliant alternatives. Customer education is part of the job.",
      "Output current at least 200 mA at a no-load voltage between 4 V and 24 V — sufficient to detect intermittent contacts and burn through light surface contamination at terminations, but low enough to avoid energising potential faults.",
    ],
    correctAnswer: 0,
    explanation:
      "s.37 is the personal-liability route the HSE uses against directors. The Sentencing Council Definitive Guideline (2016) gives the courts a structured matrix of culpability × harm × turnover that determines the corporate fine, with a separate matrix for individuals that includes custody at the top end.",
  },
  {
    id: 5,
    question:
      "Under the Sentencing Council's Definitive Guideline for Health and Safety Offences (2016), what factors set the corporate fine band?",
    options: [
      "Don't move tools, equipment, locks, voltage indicators or anything else. Don't restore power. Don't continue work. Photograph the scene from multiple angles. Identify witnesses and ask them to record their observations. Notify the firm's responsible person. The scene as it was is the evidence.",
      "Culpability (very high / high / medium / low) × harm category (level A — life-threatening / fatal, level B — serious, level C — minor) — then mapped against the company's turnover band (large / medium / small / micro). The starting point and range are then adjusted for aggravating and mitigating factors.",
      "Table 41.3 max Zs values in A4:2026 are now published with the Cmin factor (0.95) already applied — you don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t multiply by 0.95 yourself. Use the table value directly, then apply the 0.8 measured-vs-calculated correction (e.g. B32 max Zs = 1.37 Ω → 1.10 Ω corrected).",
      "The grievance and disciplinary policies, normally aligned to the ACAS Code of Practice on Discipline and Grievance. Grievance covers complaints raised BY the employee against the firm or another employee. Disciplinary covers action taken BY the firm against the employee for misconduct, capability or other concerns.",
    ],
    correctAnswer: 1,
    explanation:
      "The matrix approach is why fines are now in the millions for large companies. The biggest fines (Whirlpool £15m, Foodles Production £1.6m for Star Wars set injury) sit in the 'high culpability × Cat 1 harm × very large turnover' cell. Knowing the matrix exists is the L3 step from 'fines could be a lot' to 'I can roughly predict the band'.",
  },
  {
    id: 6,
    question: "What does 'so far as is reasonably practicable' (SFAIRP) actually require, post-Edwards v NCB [1949]?",
    options: [
      "When divergences from the original RAMS are significant — different conditions, different hazards, different occupancy, different scope. Tweaking is for minor divergences; fresh RAMS for significant ones.",
      "On the Schedule of Test Results that accompanies the EIC (Electrical Installation Certificate) — typically there is a row for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Continuity of protective conductors\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" with a column for the measured value at each protective conductor of the installation, including each main bonding conductor.",
      "The dutyholder must implement controls until the cost in money, time and trouble of further measures becomes grossly disproportionate to the residual risk. The burden of proof shifts onto the dutyholder to demonstrate they did everything SFAIRP — not the prosecution to prove they didn't.",
      "Written confirmation from both employer and training provider, a record of the gateway readiness review, evidence that all pre-requisites are met (qualifications, portfolio, off-the-job training hours), and formal agreement to proceed",
    ],
    correctAnswer: 2,
    explanation:
      "The reverse burden of proof is what keeps SFAIRP cases prosecution-friendly. Once the prosecution proves a risk existed, the dutyholder has to prove the controls were proportionate. The defence rests on contemporaneous documentation — risk assessments, training records, toolbox talks, near-miss logs.",
  },
  {
    id: 7,
    question:
      "Your supervisor instructs you to do something unsafe. What does HASAWA s.7 (and the broader law) require of you?",
    options: [
      "Circuit reference, conductor sizes (line, neutral, CPC), protective device type and rating, RCD operating current and operating time (where applicable), R1+R2 or R2 (depending on test method), insulation resistance values (line-line, line-earth, neutral-earth), polarity confirmation, Zs value, RCD operating time, and any test instrument identification needed for traceability.",
      "Plan to have all workers safely descended and equipment secured well before the storm arrives; cease work at height immediately if the 30/30 rule triggers; do not resume until 30 minutes after the last thunder or lightning",
      "The earthing conductor in TT runs to a buried earth electrode and must comply with Table 54.1 minimum sizes for buried conductors (e.g. 25 mm² Cu unprotected, 16 mm² Cu protected against corrosion only). 16 mm² unprotected Cu in soil corrodes and undersizes the run.",
      "Refuse the unsafe act and escalate. s.7 is a personal duty; 'I was told to' is not a defence to a s.7 prosecution. ERA 1996 s.44 separately protects you from detriment (sacking, demotion, disciplinary action) for raising the safety concern. Document the refusal in writing — text, email, job-pack note — at the time.",
    ],
    correctAnswer: 3,
    explanation:
      "L2 said 'refuse the unsafe instruction'. L3 adds the protection mechanism — Employment Rights Act 1996 s.44 specifically protects workers from being subjected to a detriment for refusing dangerous work or raising concerns. Whistleblowing under PIDA 1998 protects qualifying disclosures more broadly. Knowing the protection exists is what makes the refusal sustainable in practice.",
  },
  {
    id: 8,
    question:
      "In the duty cascade, what's the distinguishing feature of a 'dutyholder' under HASAWA compared with someone who simply has a contractual obligation?",
    options: [
      "A dutyholder is a person on whom statute imposes a duty regardless of contract. Employer, self-employed person, employee, occupier, manufacturer, designer, importer — each has statute-imposed duties under HASAWA or its associated regulations. Contractual reallocation of the risk doesn't transfer the statutory duty. You can't 'contract out' of HASAWA.",
      "The Local Authority — specifically the Environmental Health team of the local council. The Health and Safety (Enforcing Authority) Regulations 1998 allocate retail, office, leisure, residential care, places of worship and similar lower-risk premises to local-authority enforcement. EHOs have the same HASAWA powers as HSE inspectors — entry, inspection, notices, prosecution.",
      "Electricity at Work Regulations 1989 (EAWR), Statutory Instrument 1989/635. EAWR applies to ALL work activities involving electricity, in nearly all workplaces. It covers design, construction, operation and maintenance of electrical systems, and the competence of those carrying out the work. Reg 14 (live working) and Reg 16 (competence) are the two an apprentice meets first.",
      "Recruitment (engage interest), reduction in degrees of freedom (break into steps), direction maintenance (keep on track), marking critical features (highlight safety-critical points), frustration control (manage difficulty), demonstration (show correct technique)",
    ],
    correctAnswer: 0,
    explanation:
      "This is a key L3 insight — clients and main contractors regularly try to push HASAWA risk down the chain in the contract. The contract may shift commercial liability between the parties, but the statutory duty stays where Parliament put it. The HSE will prosecute on the statutory hook, not on whatever the contract says.",
  },
];

const faqs = [
  {
    question: "I'm an L3 apprentice — am I really a 'dutyholder' under HASAWA?",
    answer:
      "Yes — every employee is a dutyholder under s.7. The L2 framing was 'reasonable care for yourself and others'. The L3 framing adds the s.7(b) co-operation limb and recognises that as you take on more responsibility (signing off junior work, leading toolbox talks, supervising L2 apprentices), the scope of what 'reasonable' means for you expands. You're not 'just' a worker any more.",
  },
  {
    question: "If the company is prosecuted, am I personally on the line?",
    answer:
      "Generally the company is prosecuted under s.2 / s.3, not the individual employee. But there are three personal-liability routes: HASAWA s.7 for the operative whose acts caused the breach, HASAWA s.36 for someone whose act or default caused another person's offence, and HASAWA s.37 for directors and senior managers. The HSE is increasingly willing to use s.7 and s.37 alongside the corporate charge — particularly post-2016 when the Sentencing Council guideline made individual sentences much harder.",
  },
  {
    question: "What's the practical difference between SFAIRP and 'absolute' duties?",
    answer:
      "SFAIRP duties are conditional on cost vs benefit — they let you stop short of grossly disproportionate measures. Absolute duties have no SFAIRP qualifier — you either comply or you don't. EAWR 1989 contains both: Reg 4(1) on system construction is SFAIRP; Reg 14 on live working is closer to absolute, with very narrow defences. BS 7671 itself contains a mix. Knowing which clauses are absolute vs SFAIRP is part of the L3 step.",
  },
  {
    question: "Does HASAWA apply on a fully domestic job, or just commercial?",
    answer:
      "Both. HASAWA applies to all work activity. The customer's house is your workplace for the day, and s.2 (your apprentice working with you) and s.3 (the customer and family) both run. CDM 2015 has a domestic-client carve-out where the duty cascades up to the principal contractor by default, but HASAWA itself doesn't have that carve-out. A fatal customer incident on a domestic install can lead to a HASAWA prosecution exactly the same as a commercial one.",
  },
  {
    question: "What's the HSE's enforcement preference — prosecute, or notice?",
    answer:
      "Notice first, prosecute when notice is ignored or the harm is severe. Improvement notices give a deadline to fix something; prohibition notices stop the activity immediately. Prosecution follows when the inspector judges that notice alone won't deliver compliance, or where harm has already occurred and the breach is severe. The 'Enforcement Management Model' is the HSE's internal decision tool — it's published and worth reading at L3.",
  },
  {
    question: "How do I evidence that I personally complied with HASAWA s.7?",
    answer:
      "Contemporaneous notes, signed risk assessments, training records, toolbox talk attendance and near-miss logs. The single best evidence is a notebook entry written at the time — date, address, what you found, what you did about it. After an incident the inspector will ask you 'what did you do to discharge your duty?' and a reconstructed account three weeks later is much weaker than a notebook entry from the day.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 1"
            title="HASAWA dutyholder responsibilities at L3"
            description="You met s.2, s.3 and s.7 at L2. At L3 the act becomes a duty system you sit inside — director liability, the Sentencing Council guideline, and the cascade from one supervisor's call to a corporate prosecution."
            tone="emerald"
          />

          <TLDR
            points={[
              'Remember from L2 — s.2 is duty to employees, s.3 to non-employees, s.7 personal duty. At L3 these stack: a single incident usually triggers two or three of them at once.',
              "HASAWA s.37 makes directors and senior managers personally liable for corporate offences committed with their consent, connivance or neglect. The Sentencing Council Definitive Guideline (2016) made the personal sentences significantly heavier — including custody.",
              "'So far as is reasonably practicable' (Edwards v NCB) puts the burden of proof on the dutyholder. You have to prove you did everything SFAIRP — paperwork is the defence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify roles and responsibilities under HASAWA 1974 — employer (s.2, s.3), self-employed (s.3), employee (s.7), director and senior manager (s.37).",
              "Distinguish SFAIRP duties from absolute duties and apply the Edwards v NCB test of 'gross disproportion'.",
              "Recognise the Sentencing Council Definitive Guideline (2016) framework — culpability × harm × turnover — and where personal sentences sit within it.",
              "Apply the duty cascade to a real worksite — multiple parties, multiple statutes, simultaneous duties.",
              "State the L3-specific shift from 'reasonable care for myself' (L2 s.7) to 'reasonable care for the people I'm now starting to oversee' (L3 s.7 + s.7(b)).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why HASAWA looks different at L3</ContentEyebrow>

          <ConceptBlock
            title="From 'I follow the rules' to 'I sit inside the duty system'"
            plainEnglish="At L2 you learned HASAWA as a list of duties — s.2 is for the boss, s.3 catches the customer, s.7 is mine. At L3 the act becomes a system you're inside. The duties stack: a single incident routinely engages s.2, s.3 and s.7 at once. And as you start carrying more responsibility — signing off junior work, leading toolbox talks, briefing customers — your s.7 footprint grows."
            onSite="The practical L3 shift: when something feels off on site, the question isn't 'am I doing my bit safely?' but 'who else is on the duty list with me, and what happens if the cascade fails?'. That's the dutyholder mindset."
          >
            <p>The duties you remember from L2 — re-stated in L3 terms:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.2 (employer to employees)</strong> — safe systems of work, safe plant,
                training, supervision, a written safety policy where there are 5+ employees. At L3
                you are the employee, but you are also the operative the firm is supervising — so
                your conduct contributes directly to the firm's s.2 record.
              </li>
              <li>
                <strong>s.3 (employer to non-employees)</strong> — the customer, their family,
                visitors, other trades. The s.3 duty is what makes \'I can\'t isolate this circuit
                because the customer\'s elderly relative is on a stair lift' a real conversation,
                not just an inconvenience.
              </li>
              <li>
                <strong>s.7 (employee personal duty)</strong> — reasonable care for self and
                others, plus s.7(b) co-operation. At L3 the s.7(b) limb is where the L2→L3 step
                shows up. Co-operating includes refusing the unsafe instruction, escalating
                concerns and accepting that 'I was told to' is no defence.
              </li>
              <li>
                <strong>s.37 (director and senior manager personal liability)</strong> — a route
                you didn't see at L2 because L2 didn\'t deal with director-level conduct. At L3
                you may speak to directors about why a job stops; knowing s.37 exists changes the
                conversation.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The duty cascade in practice</ContentEyebrow>

          <ConceptBlock
            title="One incident — multiple simultaneous duties"
            plainEnglish="The prosecution doesn\'t pick one duty. A real incident usually breaches two or three at once. The dutyholders are layered (firm → director → supervisor → operative) and the duties stack across them."
            onSite="Knowing this matters because it changes who you escalate to. If the issue is genuinely a s.2 (system) problem, raising it to your immediate supervisor may not be enough — the duty sits at director level. Documenting the raise in writing means the cascade is on record."
          >
            <p>Worked example — apprentice falls from a step-up that failed inspection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.2 breach</strong> — firm failed to maintain plant in safe condition, no
                inspection regime in place, or inspection was done but the failed unit was not
                taken out of service.
              </li>
              <li>
                <strong>s.3 breach</strong> — if the fall happens in a customer\'s home and the
                customer (or their child) witnesses it or is at risk from the falling apprentice
                or tools, the s.3 duty to non-employees is also engaged.
              </li>
              <li>
                <strong>s.7 breach (potentially)</strong> — the operative who used a piece of kit
                they knew or should have known was unsafe carries some s.7 responsibility,
                particularly if there\'s a culture of \'just crack on'.
              </li>
              <li>
                <strong>s.37 breach (potentially)</strong> — if the director knew the inspection
                regime was broken or that the kit had failed and chose not to act, s.37 liability
                attaches personally.
              </li>
              <li>
                <strong>WAHR 2005 Reg 4</strong> — separate but parallel — the Work at Height
                Regulations 2005 require that work at height is properly planned, supervised and
                carried out by competent persons. A fall almost always engages WAHR alongside
                HASAWA.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(1)"
            clause={
              <>
                &quot;It shall be the duty of every employer to ensure, so far as is reasonably
                practicable, the health, safety and welfare at work of all his employees.&quot;
              </>
            }
            meaning={
              <>
                The umbrella employer duty. The qualifier &quot;so far as is reasonably
                practicable&quot; (SFAIRP) is the bit Edwards v NCB [1949] gives meaning to —
                cost, time and trouble must not be grossly disproportionate to the residual risk.
                Sub-clauses (2)(a)–(e) drill down: safe plant and systems, safe handling and
                storage, information and instruction, safe place of work and safe working
                environment.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.37(1)"
            clause={
              <>
                &quot;Where an offence under any of the relevant statutory provisions committed by
                a body corporate is proved to have been committed with the consent or connivance
                of, or to have been attributable to any neglect on the part of, any director,
                manager, secretary or other similar officer of the body corporate or a person who
                was purporting to act in any such capacity, he as well as the body corporate shall
                be guilty of that offence and shall be liable to be proceeded against and punished
                accordingly.&quot;
              </>
            }
            meaning={
              <>
                The director-liability route. &quot;Consent, connivance or neglect&quot; is the
                three-prong test. The Sentencing Council Definitive Guideline for Health and
                Safety Offences (2016) sets the personal sentence range — for high-culpability,
                serious-harm cases this includes immediate custody. This is the L3 step beyond L2:
                directors aren&apos;t shielded by the corporate veil from HSE prosecution.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.37."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>SFAIRP and Edwards v NCB</ContentEyebrow>

          <ConceptBlock
            title="The reverse burden of proof"
            plainEnglish="'So far as is reasonably practicable' isn't 'whatever you fancy\'. Edwards v NCB [1949] set the test — implement controls until the cost (money, time, trouble) becomes grossly disproportionate to the residual risk. Once the prosecution proves a risk existed, the burden shifts to the dutyholder to prove they did everything SFAIRP."
            onSite="That reverse burden is the reason your firm\'s RAMS, training records, toolbox talks and near-miss logs matter. They are the defence evidence. No paperwork = no defence. Inspectors call it 'documenting your way out of court\'."
          >
            <p>Practical SFAIRP factors a court weighs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Probability of harm</strong> — how likely was the incident?
              </li>
              <li>
                <strong>Severity of harm</strong> — what\'s the worst credible outcome?
              </li>
              <li>
                <strong>Cost of further controls</strong> — money, time, disruption.
              </li>
              <li>
                <strong>Industry good practice</strong> — what would a competent firm in the same
                trade do? HSE-published guidance (HSG) is treated as benchmark.
              </li>
              <li>
                <strong>State of knowledge at the time</strong> — what was reasonably known? You
                aren\'t held to a 2030 standard for a 2026 incident.
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

          <ContentEyebrow>The Sentencing Council Definitive Guideline (2016)</ContentEyebrow>

          <ConceptBlock
            title="Why fines went up — and personal sentences with them"
            plainEnglish="In 2016 the Sentencing Council published the Definitive Guideline for Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences. It gave courts a structured matrix — culpability × harm category × company turnover — that produces a starting fine and range. Fines went up dramatically for large companies. Individuals also got a structured matrix that includes custody at the top end."
            onSite="At L3 you don\'t need to memorise the bands, but you should know the framework exists and that \'we got off with a fine' isn't a given any more. A serious incident at a £50m turnover firm with high culpability now starts at £2.4m — and that\'s before aggravating factors."
          >
            <p>The matrix in outline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Culpability</strong> — Very high (deliberate breach), High (systemic
                failure to address known risks), Medium (failures fell short of appropriate
                standards), Low (failure was minor).
              </li>
              <li>
                <strong>Harm category</strong> — Level 1 (death, life-threatening, permanent),
                Level 2 (physical or psychological harm not life-threatening), Level 3 (harm
                short of category 2). Adjusted up for risk of multiple persons or risk of higher
                harm even where it didn\'t materialise.
              </li>
              <li>
                <strong>Turnover band</strong> — Large (£50m+), Medium (£10m–£50m), Small
                (£2m–£10m), Micro (under £2m).
              </li>
              <li>
                <strong>Individual sentences</strong> — separate matrix; for high culpability ×
                Level 1 harm the starting point is custody, not a fine.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Assuming HASAWA only applies on commercial sites"
            whatHappens={
              <>
                Apprentice on a domestic kitchen install assumes &quot;there&apos;s no
                construction site, no principal contractor, no CDM, so HASAWA isn&apos;t
                really in play&quot;. They cut corners on isolation because the customer is
                watching telly in the next room. The customer&apos;s elderly relative wanders
                in, brushes against an exposed live conductor, and is shocked. The HSE
                prosecutes the firm under s.3 (duty to non-employees) and the operative under
                s.7 — and the apprentice discovers HASAWA applies just as forcefully in a
                customer&apos;s kitchen as on a Tier 1 fit-out.
              </>
            }
            doInstead={
              <>
                Treat every workplace as a HASAWA workplace. Isolation, barriers, customer
                briefing, dynamic risk assessment — all apply on the smallest call-out as
                much as on the biggest site. The duty doesn&apos;t scale with the contract
                value.
              </>
            }
          />

          <CommonMistake
            title="Thinking \'I was told to do it' is a defence to s.7"
            whatHappens={
              <>
                Apprentice is instructed by a supervisor to bypass an MCB to keep a circuit
                running for the customer. They do it. The customer&apos;s appliance fault
                later causes a fire. The HSE prosecution names the apprentice under s.7 as
                well as the firm under s.2. The apprentice&apos;s defence — &quot;my
                supervisor told me to&quot; — is rejected. s.7 is a personal duty.
              </>
            }
            doInstead={
              <>
                Refuse the unsafe instruction. Document the refusal in writing — text, email,
                job-pack note — at the time. Escalate to a director if your immediate
                supervisor won&apos;t accept the refusal. ERA 1996 s.44 protects you from
                detriment for raising the concern. PIDA 1998 (whistleblowing) extends that
                protection for qualifying disclosures.
              </>
            }
          />

          <Scenario
            title="Director\'s instruction vs your s.7 duty"
            situation={
              <>
                You&apos;re an L3 apprentice on the second week of a new contract for a
                manufacturing client. Your firm&apos;s director has personally promised the
                client &quot;next-day completion&quot; on a 32A three-phase tail relocation
                in a live switchroom. The director arrives on site, sees you setting up
                isolation kit and lock-off padlocks, and tells you bluntly: &quot;we
                haven&apos;t got time for that — work it live, the panel&apos;s only 32A
                and you&apos;ve got rubber gloves, you&apos;ll be fine&quot;. Your
                immediate supervisor is on another job and your phone signal is patchy.
              </>
            }
            whatToDo={
              <>
                Stop. Live-working on three-phase distribution without the EAWR Reg 14
                three-test (no reasonable to dead-work, properly-judged risk, suitable
                precautions) is one of the most prosecuted breaches in the trade. Your s.7
                duty isn&apos;t reduced because the instruction came from a director — if
                anything, the director just walked themselves into a s.37 frame. Politely
                refuse: &quot;I&apos;m not able to do this live — EAWR Reg 14 doesn&apos;t
                allow it on this kit&quot;. Send a text to your supervisor and a follow-up
                email to the director summarising what was asked, what you said and why,
                with timestamps. If the director persists, escalate to whoever is named on
                the firm&apos;s safety policy as the responsible person. Stay calm; the
                paper trail is your defence.
              </>
            }
            whyItMatters={
              <>
                This isn&apos;t a hypothetical — the HSE has prosecuted exactly this fact
                pattern multiple times. The director&apos;s &quot;next-day completion&quot;
                promise to the client is a commercial pressure point, not a legal defence.
                Your written refusal is what protects you under s.7 and ERA 1996 s.44 if the
                director tries to discipline you. The cascade is brutal: if you do the live
                work and someone is hurt, the firm gets prosecuted under s.2/s.3, the
                director under s.37, and you under s.7. Three convictions from one
                instruction.
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

          <ContentEyebrow>HASAWA s.3 — the duty to non-employees</ContentEyebrow>

          <ConceptBlock
            title="Why s.3 lands harder than apprentices expect"
            plainEnglish="s.3 is the duty to people who AREN&apos;T your employees but who may be affected by what you&apos;re doing. The customer, their family, the cleaner, the public passing the work area, other trades on site. At L2 this was a sentence in the textbook. At L3 it&apos;s the duty that catches you on every domestic job — because every domestic job has a non-employee in the next room."
            onSite="Practical impact on a typical day: barriers, signage, customer briefing, controlling who walks into the work area, pausing isolation if a vulnerable household member is at risk. The s.3 duty is what makes &quot;just keep the kids out the kitchen for ten minutes&quot; a regulatory conversation, not a polite request."
          >
            <p>How s.3 plays out across job types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic call-out</strong> — customer, family members, pets, deliveries
                arriving mid-job. Brief the customer, agree zones, use barriers if needed.
              </li>
              <li>
                <strong>Commercial fit-out</strong> — other trades, client&apos;s staff still in
                the building, members of the public passing entrances. Site induction and
                signage discharge a chunk of s.3.
              </li>
              <li>
                <strong>Retail / hospitality</strong> — public access. Cordon, signage and
                supervision are non-negotiable. The s.3 duty doesn&apos;t pause when the customer
                is busy.
              </li>
              <li>
                <strong>Healthcare / care home</strong> — vulnerable residents who can&apos;t
                follow standard barrier instructions. The s.3 bar is higher; PEEP-style
                arrangements are normal.
              </li>
              <li>
                <strong>Schools</strong> — children. Always work out of hours where possible;
                where not, the s.3 controls escalate sharply.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.3(1)"
            clause={
              <>
                &quot;It shall be the duty of every employer to conduct his undertaking in such a
                way as to ensure, so far as is reasonably practicable, that persons not in his
                employment who may be affected thereby are not thereby exposed to risks to their
                health or safety.&quot;
              </>
            }
            meaning={
              <>
                The non-employee duty. Same SFAIRP qualifier as s.2. Sub-sections (2) and (3)
                extend the duty to the self-employed. After the &quot;HSE v R&quot; line of cases
                (notably R v Associated Octel Co Ltd [1996]) the courts read s.3 widely — the
                employer&apos;s duty extends to the conduct of contractors and subcontractors
                within their undertaking. For an electrical firm that means the L3
                apprentice&apos;s acts can put the firm in s.3 frame even when the casualty is
                someone else&apos;s customer.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.3."
          />

          <SectionRule />

          <ContentEyebrow>HASAWA s.7(b) — the co-operation limb</ContentEyebrow>

          <ConceptBlock
            title="Co-operation isn&apos;t just &apos;turn up to the toolbox talk&apos;"
            plainEnglish="s.7 has two limbs. (a) is &apos;take reasonable care of yourself and others&apos;. (b) — the co-operation limb — is &apos;co-operate with the employer or any other person to enable that person to comply with their statutory duty&apos;. At L2 (b) was usually framed as &apos;follow the rules&apos;. At L3 it&apos;s sharper: co-operation includes refusing the unsafe instruction and actively raising the concern."
            onSite="The L3 reading: &apos;follow orders&apos; is exactly what (b) doesn&apos;t mean. If the firm needs to comply with EAWR Reg 14 and you do the live work anyway, you&apos;ve breached (b) by frustrating the firm&apos;s compliance — the same act that breaches (a) by exposing yourself to harm."
          >
            <p>Practical examples of s.7(b) in operation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Reporting a near-miss to the firm&apos;s safety system — co-operating with the
                Reg 5 (MHSWR) review duty.
              </li>
              <li>
                Refusing to skip safe-isolation prove-test-prove — co-operating with the firm&apos;s
                EAWR Reg 13 obligation.
              </li>
              <li>
                Wearing the issued PPE correctly — co-operating with the firm&apos;s Reg 4(4)
                EAWR / Reg 4 PUWER duty.
              </li>
              <li>
                Attending site induction and signing the RAMS — co-operating with the contractor&apos;s
                CDM Reg 8 duty.
              </li>
              <li>
                Telling the supervisor about a colleague&apos;s fitness-for-duty concern (alcohol,
                fatigue) — co-operating with the firm&apos;s s.2 duty.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>HASAWA s.36 — the &apos;other person&apos; route</ContentEyebrow>

          <ConceptBlock
            title="The personal liability route apprentices forget exists"
            plainEnglish="Most L3 apprentices know s.7 (personal duty) and s.37 (director liability). Far fewer know s.36 — the &apos;due to the act or default of some other person&apos; route. It allows the HSE to prosecute someone whose act or default caused another person to commit an offence. Useful where the immediate breach was the firm&apos;s but the cause was traceable to a particular individual&apos;s conduct."
            onSite="Where s.36 bites at L3 level: the apprentice who quietly disables a safety control on a tool, then a colleague uses the tool and is injured. The firm is prosecuted under PUWER for the unsafe equipment; the apprentice is prosecuted under s.36 for being the cause of the firm&apos;s offence. s.7 covers the personal duty; s.36 covers the wider &apos;your act caused someone else&apos;s offence&apos; territory."
          >
            <p>How s.36 sits alongside s.7 and s.37:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.7</strong> — your personal duty for your own acts and omissions.
              </li>
              <li>
                <strong>s.36</strong> — your act or default caused another person (your firm,
                your colleague) to commit a separate offence.
              </li>
              <li>
                <strong>s.37</strong> — director / senior manager personal liability for the
                corporate offence by consent, connivance or neglect.
              </li>
              <li>
                Each can run alone or stacked. The HSE picks the routes that best fit the facts.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.36(1)"
            clause={
              <>
                &quot;Where the commission by any person of an offence under any of the relevant
                statutory provisions is due to the act or default of some other person, that
                other person shall be guilty of the offence, and a person may be charged with and
                convicted of the offence by virtue of this subsection whether or not proceedings
                are taken against the first-mentioned person.&quot;
              </>
            }
            meaning={
              <>
                The &quot;other person&quot; route. Allows prosecution of the individual whose
                act caused the corporate (or other party&apos;s) offence, even if the firm
                itself is not prosecuted. Pairs neatly with s.7 — s.7 covers the personal duty,
                s.36 covers the wider causation. Most L3 apprentices have never heard of s.36;
                knowing it exists raises the bar on personal conduct.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.36."
          />

          <SectionRule />

          <ContentEyebrow>Corporate Manslaughter — the parallel offence</ContentEyebrow>

          <ConceptBlock
            title="When HASAWA isn&apos;t enough — the manslaughter route"
            plainEnglish="HASAWA prosecutions cover the breach. Where someone has died and the breach was a gross failure attributable to senior management organising or managing activities, the Corporate Manslaughter and Corporate Homicide Act 2007 sits alongside HASAWA. Triable on indictment only; unlimited fines; publicity orders; remedial orders. CMCHA fixed the historical &apos;identification doctrine&apos; problem that made it nearly impossible to prosecute large companies for manslaughter."
            onSite="Why this matters at L3: when you escalate a serious safety concern to a director and they brush it off, you&apos;re collecting evidence that may eventually feature in a CMCHA prosecution if a fatality follows. Email trails, contemporaneous notes and refused improvement requests are precisely the &apos;senior management failure&apos; evidence the prosecution looks for."
          >
            <p>The CMCHA test in plain language:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>An organisation&apos;s activities cause a person&apos;s death.</li>
              <li>Those activities amount to a gross breach of a relevant duty of care.</li>
              <li>The way in which those activities were managed or organised by senior management was a substantial element in the breach.</li>
              <li>Conviction = unlimited fine + publicity order requiring publication of the conviction + remedial order if appropriate.</li>
              <li>Sits alongside HASAWA charges — most fatal-incident prosecutions run both.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "HASAWA is a layered duty system. s.2 (employer→employee), s.3 (employer→non-employee), s.7 (employee personal), s.37 (director personal). They stack — one incident usually breaches two or three.",
              "Remember from L2 — s.2/s.3/s.7 are the trio you already met. The L3 add is s.37 (director liability) and the dutyholder mindset of asking 'who else is on the duty list with me?'.",
              "SFAIRP — Edwards v NCB [1949] — costs (money, time, trouble) must not be grossly disproportionate to the residual risk. The dutyholder bears the burden of proof.",
              "The Sentencing Council Definitive Guideline (2016) gives the courts a structured matrix — culpability × harm × turnover for companies, with a separate matrix for individuals that includes custody.",
              "'I was told to do it' is no defence to a s.7 prosecution. ERA 1996 s.44 protects you from detriment for raising a safety concern. Document the refusal in writing at the time.",
              "Personal liability under s.37 reaches directors, managers, secretaries and similar officers — not just the company. Knowing this changes how a senior conversation about a job stop goes.",
              "HASAWA applies to all work activity — domestic call-outs as much as commercial sites. The duty doesn't scale with contract value.",
              "Paperwork is the defence. Risk assessments, training records, toolbox talks, near-miss logs, contemporaneous notebook entries — these are the evidence the SFAIRP defence rests on.",
            ]}
          />

          <Quiz title="HASAWA dutyholder responsibilities — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 — Landing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 EAWR — competence and supervision
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
