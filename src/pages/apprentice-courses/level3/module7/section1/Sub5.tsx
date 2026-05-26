/**
 * Module 7 · Section 1 · Subsection 5 — Trade union landscape
 * Maps to C&G 2365-03 / Unit 308 / LO1 — supplementary depth
 *   Extends LO1 with apprentice-relevant career pathway material on the
 *   trade union landscape across the UK electrical industry.
 *
 * Unite the Union, GMB, the JIB pay framework, what trade unions do for an
 * electrician, the right to join (Trade Union and Labour Relations
 * (Consolidation) Act 1992), the limits of union representation, and how
 * union density varies across the UK electrical industry.
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

const TITLE = 'Trade union landscape | Level 3 Module 7.1.5 | Elec-Mate';
const DESCRIPTION =
  'Unite the Union, GMB, the JIB pay framework, what trade unions do for electricians, the legal right to join, and how union density varies across the UK electrical industry.';

const checks = [
  {
    id: 'mod7-s1-sub5-unite',
    question:
      "What's Unite the Union's role in the electrical industry?",
    options: [
      "The single-line diagram (SLD) — it fixes the topology, the protective device layout and the fault paths. Every other document (schedules, layouts, calc sheets) hangs off the SLD topology. Drafting cables first means re-drafting them when the SLD topology shifts.",
      "England has its set; Wales has its own equivalent set (similar but not identical); Scotland has Building Standards Technical Handbooks (different framework); Northern Ireland has its own. Direction of travel is broadly aligned but specifics differ. Check the relevant jurisdiction.",
      "Location of the new CU and main isolator; how the RCDs work and the monthly test-button routine; what each circuit is labelled as; any new features (SPDs, AFDDs, smart switches) plus their manuals; the recommended next inspection date; the contact route for any post-handover issues.",
      "Unite is the main trade union for electrical contracting in England, Wales and NI. It represents workers in the JIB collective bargaining process (negotiating annual JIB pay rates with ECA), supports individual members in workplace disputes, runs union-sponsored training, lobbies on industry policy, and is the worker-side voice on the JIB Apprentice Code of Practice.",
    ],
    correctIndex: 3,
    explanation:
      "Unite is the largest UK trade union and historically dominant in electrical contracting (it descends from the Electrical Trades Union). On JIB-graded sites Unite is the worker-side body in the collective bargaining that sets JIB pay rates each year. Individual members get representation in workplace disputes, legal advice, training discounts and discounted member services. Membership is voluntary and the right to join is protected by the Trade Union and Labour Relations (Consolidation) Act 1992.",
  },
  {
    id: 'mod7-s1-sub5-right',
    question:
      "Can your employer prevent you from joining a trade union?",
    options: [
      "No. The right to join (or not join) a trade union is protected by the Trade Union and Labour Relations (Consolidation) Act 1992. Employers cannot dismiss, demote, refuse to hire, or treat less favourably any worker because they're a trade union member or because they take part in lawful trade union activities. Anti-union discrimination is unlawful.",
      "Establishes personal liability for company directors, managers, secretaries and similar officers where a corporate offence is committed with their consent, connivance or attributable to their neglect. Allows the HSE to prosecute the individual as well as (or instead of) the company.",
      "Category II — intermediate risk, covers most cut/abrasion-resistant work gloves used for cable pulling, cable cutting, masonry handling. The key is matching the cut resistance level (EN 388 marking — A to F for cut, plus puncture, abrasion and tear ratings) to the actual task. A glove rated for general handling is not the right glove for cutting steel cable tray, and a heavily armoured glove makes fine termination work impossible.",
      "No. PAT (Portable Appliance Testing) is one layer of inspection — typically annual for offices, every 3 months for harsh construction-site use. PUWER Reg 5 ALSO requires user pre-use visual checks every shift AND periodic competent-person in-service inspections between PATs. A tool can pass PAT in January and develop a damaged cable in February — the user check is what catches it.",
    ],
    correctIndex: 0,
    explanation:
      "TULRCA 1992 is the foundational UK statute on trade union rights. Section 137 (refusal of employment), s.146 (detriment), s.152 (unfair dismissal) all protect trade union membership and activities. Apprentices and junior electricians sometimes hear 'we don't allow union membership here' — that's unlawful. Whether you join is your choice; whether you tell the employer is also your choice. ACAS provides a confidential helpline if you face anti-union pressure.",
  },
  {
    id: 'mod7-s1-sub5-density',
    question:
      "Are most UK electricians union members?",
    options: [
      "Consistently demonstrating: (1) framing work as a learning problem (\\\\\\\"what can we learn from this?\\\\\\\"), (2) acknowledging your own fallibility (\\\\\\\"I may have missed something — what do you see?\\\\\\\"), (3) modelling curiosity by asking genuine questions, (4) responding to mistakes with inquiry rather than blame, (5) following through on commitments made when people do speak up, and (6) explicitly thanking people for raising concerns even when the news is unwelcome",
      "Part 2 — definitions. Every key term in BS 7671 has a verbatim definition in Part 2, and that definition is the legal vocabulary the inspector and the courts use. 'Extraneous-conductive-part' = 'a conductive part liable to introduce a potential, generally Earth potential, and not forming part of the electrical installation' — that exact wording is what decides whether the metal pipework needs main bonding.",
      "No. UK trade union density across the workforce is around 22% (ONS). In the electrical contracting trade union density is higher than the national average on traditional JIB-graded contractors, particularly large M&E firms working on infrastructure and big commercial. It's lower on smaller domestic-focused firms and on self-employed electricians. Union membership is a personal choice — many electricians never join, others see it as essential.",
      "Most HASAWA offences are triable either way — the prosecution chooses Magistrates' (summary) or Crown (indictment). Magistrates' Court can impose unlimited fines on H&S offences (since 2015) and up to 6 months imprisonment. Crown Court can impose unlimited fines and up to 2 years imprisonment for individuals (longer for some related offences like Corporate Manslaughter — life). The Sentencing Council Definitive Guideline applies in both courts.",
    ],
    correctIndex: 2,
    explanation:
      "Union density varies hugely by firm and by sector. Big M&E sub-contractors on JIB-graded contracts often have high union membership; small domestic firms and self-employed electricians often have very low membership. Whether to join is a personal cost-benefit judgement: weekly subscription (typically £15-20/month) versus the value you place on representation, training discounts, legal cover and the collective bargaining outcomes. There's no right answer.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does GMB do in the electrical industry?",
    options: [
      "Yes — apprentices have the same legal right to join (or not join) a union as any other worker. Unions typically offer reduced 'apprentice rate' subscriptions. Apprentice membership is a personal choice; on JIB-graded sites the union shop steward is typically available to support apprentices through workplace issues even if they're not yet members.",
      "GMB is a UK general trade union representing workers across construction, building services and many other industries. In the electrical sector GMB has historic presence particularly in maintenance, facilities-management and public-sector electrical work. GMB is a JIB signatory union alongside Unite for collective bargaining purposes — though Unite is the larger electrical-trade union.",
      "Fire / explosion, asphyxiation (oxygen deficiency or harmful atmosphere), drowning (free-flowing solid / liquid), hyperthermia (high temperature). Plus serious injury from entrapment. The Regs apply when the space is substantially enclosed AND any specified risk is foreseeable.",
      "Every employee must (a) take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work, and (b) co-operate with the employer or any other person in the discharge of any duty placed on the employer or that other person under the relevant statutory provisions. 'Following orders' is not a defence — the personal duty stays with the employee regardless of what they were told to do.",
    ],
    correctAnswer: 1,
    explanation:
      "GMB is the second-largest UK general union and has electrical-trade members particularly in facilities management, public-sector electrical and infrastructure maintenance. Unite is dominant in private-sector contracting; GMB has stronger presence in some public-sector and FM roles. Both are JIB signatories.",
  },
  {
    id: 2,
    question: "What's a 'shop steward' on a JIB-graded site?",
    options: [
      "Management of Health and Safety at Work Regulations 1999, Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of the risks to the health and safety of employees and of anyone else affected by their undertaking. Where there are five or more employees the significant findings must be recorded.",
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) is the recognised training standard for assembling, dismantling and using mobile tower scaffolds. It's not a statutory licence in the way IPAF is for MEWPs, but PUWER 1998 Reg 9 requires anyone using or assembling work equipment to be adequately trained, and on construction sites the principal contractor's site rules typically require PASMA card-holders for tower assembly.",
      "An elected workplace union representative — elected by union members at the firm or site to represent their interests in dealing with the employer. The shop steward is the first port of call for individual workplace issues (pay disputes, disciplinary, health and safety concerns). On larger sites there may be multiple stewards covering different trades or shifts.",
      "A trained operative who attaches loads to a crane (slinging) and signals the crane operator (signalling) during a lift. Both functions require formal CPCS or equivalent training. Lift operations are governed by LOLER 1998 (Lifting Operations and Lifting Equipment Regulations) which requires lifts to be planned by a competent person and supervised throughout.",
    ],
    correctAnswer: 2,
    explanation:
      "Shop steward is a long-standing term for the elected workplace union rep. They have statutory protections to carry out reasonable union duties (TULRCA 1992 s.168-170 — paid time off for trade union duties). For an apprentice the shop steward is typically the first practical point of contact if you face a workplace issue — they know the JIB rules and the local employer and can often resolve issues informally before they escalate.",
  },
  {
    id: 3,
    question: "What's collective bargaining and how does it set JIB pay?",
    options: [
      "When you see signs of abuse, neglect, undue pressure, vulnerability or risk that go beyond the scope of an electrical job. Report internally to your firm\\\\\\\\'s safeguarding lead (where one exists) or contracts manager; signpost to local authority adult/children\\\\\\\\'s social care if appropriate. Care Act 2014 (England) places statutory duties on local authorities; you don\\\\\\\\'t make the assessment but you can raise the concern.",
      "EN ISO 20345 (safety footwear) for general work; specific S-grade ratings (S1, S1P, S3 etc) indicate features (toe protection, midsole protection, antistatic, water resistance). For electrical work the mark to look for is the EH (Electrical Hazard) rating or class S2/S3 with insulating sole.",
      "BPEC (British Plumbing Employers Council, now expanded to other trades) runs an MCS-recognised Solar PV installer course typically delivered as a 4-5 day classroom + practical course covering PV system design, installation, MCS standards and commissioning. AM2S is the JIB practical assessment route — assumes prior PV training and tests practical competence. Both routes earn the ECS PV endorsement; BPEC is more course-based, AM2S is more assessment-based.",
      "Collective bargaining is the process where worker representatives (Unite + GMB) and employer representatives (ECA) sit down each year to negotiate the JIB Working Rule Agreement — pay rates, hours, holidays, sick pay, pension, overtime, allowances. The agreed rates apply across all JIB-graded contracts. The mechanism is voluntary (no statute compels it) but the outcomes set the industry-standard floor.",
    ],
    correctAnswer: 3,
    explanation:
      "Collective bargaining is the heart of the JIB system. Annual negotiation between worker-side (Unite, GMB) and employer-side (ECA) sets the new rates each year. The negotiation can be tough — disputes occasionally lead to industrial action — but the routine outcome is an annual rate uplift agreed by both sides. As an apprentice on a JIB-graded contract you benefit from collective bargaining whether you're a union member or not.",
  },
  {
    id: 4,
    question: "Do you have to be a union member to get JIB pay rates?",
    options: [
      "No. JIB pay rates apply to all employees on JIB-graded contracts regardless of union membership. The collectively-bargained rates are incorporated into the employment contract by reference to the JIB Working Rule Agreement. Union members and non-union members on the same JIB-graded contract are paid the same JIB rate.",
      "Cross — the connection is not electrically and mechanically sound (Reg 542.4.2). Comment: corrosion at MET connection. Action: clean, retighten with anti-corrosion compound, retest continuity, recommend regular re-inspection.",
      "Management of Health and Safety at Work Regulations 1999 Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of risks to health and safety. Reg 3(6) requires firms with five or more employees to record the significant findings.",
      "The combination of thorough preparation, successful mock assessments, gateway sign-off from your employer and training provider, completed qualifications, and a well-organised portfolio — these are evidence of your competence, not just feelings of readiness",
    ],
    correctAnswer: 0,
    explanation:
      "This is the 'free rider' aspect of collective bargaining — non-members benefit from the bargained rates without paying union subscriptions. Some unions encourage membership specifically because of this dynamic. Whatever you decide on union membership, the JIB rates apply to your contract regardless.",
  },
  {
    id: 5,
    question: "What's typical Unite membership cost for an electrician?",
    options: [
      "Where an IMD is provided, it shall be selected in accordance with BS EN 61557-8. Compliance is evidenced by documentation, marking or a declaration of conformity to the standard. Where no such evidence exists, the installation does not meet the requirement and must be treated as non-compliant until evidence is produced.",
      "Roughly £15-20/month for full Unite membership for a working electrician, with reduced rates for apprentices, students and the unemployed. Cost is tax-deductible against income tax for trade union subscriptions. In return members get representation in disputes, legal advice, training discounts, member-only insurance products and the Unite member benefits programme.",
      "Per BS EN 62305 and BS 7671 Reg 411.3.1.2, the LPS earth electrode network is typically bonded to the building\\\\\\\\'s MET — either directly or via a spark gap (isolating SPD) depending on the LPS class and system designer\\\\\\\\'s arrangement. This prevents large potential differences between the LPS earth and the electrical earth during a strike.",
      "The firm probably won't recover the cost of the additional work in dispute. Verbal variations are binding in principle but hard to prove in practice. Courts and ombudsmen weight written contractual evidence above verbal recollection. The labour, materials and time spent on the undocumented variation sit on the firm's profit margin. Multiplied across many small variations on many jobs it's a material drag on profitability and a leading cause of bad debt.",
    ],
    correctAnswer: 1,
    explanation:
      "Apprentice and student rates are typically £5-8/month, working-electrician rates £15-20/month. Union subscriptions are tax-deductible (HMRC list of approved professional bodies). The cost-benefit judgement is personal — some members never use the representation, others find it pays for itself many times over in a single dispute or training discount.",
  },
  {
    id: 6,
    question: "What's a 'collective grievance' versus an 'individual grievance'?",
    options: [
      "A genuine shift to: \\\\\\\"This is the most challenging situation I have faced, but I now have a clear action plan to address the specific issues. I have identified three process improvements that will prevent recurrence. I feel motivated to apply these lessons, and this experience will make me a significantly more capable project manager\\\\\\\" — with the motivation to act matching the new belief",
      "UK-SPEC (UK Standard for Professional Engineering Competence) is the published competence standard against which Engineering Council professional registrations (EngTech, IEng, CEng) are assessed. It defines five competence areas (knowledge and understanding, design, leadership and management, communication, professional commitment) and the level of evidence required at each tier. Available free at engc.org.uk.",
      "Individual grievance = one worker raises a workplace issue with the employer (typically follows the ACAS Code of Practice). Collective grievance = a group of workers (often via the union shop steward) raises an issue affecting multiple workers — pay rates, working conditions, restructuring proposals, health and safety concerns. Different procedures and different ACAS guidance apply to each.",
      "(1) Two-pole voltage tester with proving unit (Martindale VI-13800 + GVD2). (2) Clamp meter (Fluke 376FC, Megger DCM330). (3) MFT in continuity range (Megger MFT1741+, Fluke 1664FC). (4) Socket tester (Kewtech KT1717) — first pass only, NOT for sign-off. Four different tasks, four different instruments — each engineered for its specific job.",
    ],
    correctAnswer: 2,
    explanation:
      "Individual vs collective grievance procedures are both covered by ACAS guidance. Individual grievances follow the ACAS Code of Practice on Disciplinary and Grievance Procedures (your right under Employment Rights Act 1996). Collective grievances often involve the union shop steward as worker-side spokesperson and can be a route to escalating widespread workplace issues without resorting to industrial action.",
  },
  {
    id: 7,
    question: "Can apprentices join a union?",
    options: [
      "No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of H&S. Examples — removing a machine guard, defeating an interlock, taking down a barrier, reaching round a lock-off, stuffing the door of an interlocked enclosure, switching off a smoke detector you find inconvenient. s.8 is a personal criminal offence and applies to everyone on site, employee or not.",
      "Bond each extraneous service (gas, water) separately back to the MET per Reg 544.1.2 (within 600 mm of intake). Bond the structural steel frame at multiple accessible points back to the MET. Bond the LPS earth network to the MET via direct bond or spark gap per BS EN 62305. Each system has its own dedicated bonding cable to the MET — no daisy-chaining. The MET is the single common reference for the entire integrated earth and bonding network.",
      "A massive increase in renewable generation, heat pumps, EV charging and battery storage — all requiring installation, maintenance and integration by electrical technicians, making emerging technology skills essential for the ST1426 maintenance technician",
      "Yes — apprentices have the same legal right to join (or not join) a union as any other worker. Unions typically offer reduced 'apprentice rate' subscriptions. Apprentice membership is a personal choice; on JIB-graded sites the union shop steward is typically available to support apprentices through workplace issues even if they're not yet members.",
    ],
    correctAnswer: 3,
    explanation:
      "Apprentices have full TULRCA 1992 rights including the right to join and the right not to be discriminated against for membership. Apprentice subscriptions are typically £5-8/month, often discounted further for the first year. Unite specifically promotes apprentice membership through dedicated young-worker programmes.",
  },
  {
    id: 8,
    question: "What's the Trade Union and Labour Relations (Consolidation) Act 1992?",
    options: [
      "TULRCA 1992 is the consolidating UK statute on trade union law and collective labour relations. It covers the right to join (and not join) a union, protection from anti-union discrimination, recognition for collective bargaining, industrial action ballot requirements, picketing rules, and union internal governance. It's the foundational statute that protects union members.",
      "Visual inspection items at the installation level — connection of conductors, identification of conductors, presence of required diagrams and labels, presence of barriers / enclosures / SPDs / RCDs, suitability of equipment for the location, etc. A tick-list grouped by category.",
      "Independent verification. The dead-test calculation depends on Ze (one measurement) plus R1+R2 (one or many readings, depending on circuit). The live Zs measurement is one direct reading. Comparing the two catches errors in either method, gives confidence in the result, and provides a single value to compare against Table 41.3 with the 0.8 multiplier applied.",
      "To co-operate with the client, principal designer, principal contractor, contractor and any other person performing a duty under CDM, AND to report to the principal contractor (or contractor where there is no principal contractor) anything that they consider is likely to endanger their own or another person's health or safety, AND to comply with the requirements of CDM.",
    ],
    correctAnswer: 0,
    explanation:
      "TULRCA 1992 (as amended by subsequent Acts) is the headline UK trade union law. It guarantees the right to associate, protects against employer victimisation, sets the rules for lawful industrial action, and structures union governance. Knowing it exists protects you — if your employer pressures you about union membership you can point to TULRCA as the statute that bans the pressure.",
  },
];

const faqs = [
  {
    question: "If I join a union, do I have to tell my employer?",
    answer:
      "No. Membership is private. You only need to declare it if you want to take on a formal union role (shop steward) or invoke union-related rights (e.g. paid time off for union duties under TULRCA s.168). Many union members keep membership private for years; others are open from day one. It's your choice.",
  },
  {
    question: "Can a union force me to go on strike?",
    answer:
      "No. Industrial action requires a lawful strike ballot under TULRCA. Even when a ballot supports action, individual workers can choose whether to take part — though strike pay (if offered by the union) typically only goes to members who do take part. The right not to take part in industrial action is also protected.",
  },
  {
    question: "What's the difference between a union and a professional body like the IET?",
    answer:
      "Different functions. Trade union = represents workers in pay and conditions disputes with employers (Unite, GMB). Professional body = membership organisation that recognises and develops technical/engineering competence (IET). Many electrical engineers belong to both — IET for professional registration (EngTech, IEng), Unite for workplace representation. They don't compete with each other.",
  },
  {
    question: "If my firm is non-JIB and pays below JIB rates, can the union force the employer to pay JIB?",
    answer:
      "Not directly. The JIB Working Rule Agreement applies to JIB-graded contracts only. Non-JIB employers are bound only to NMW/NLW, not to JIB rates. The union can support workers in collectively pressing for better pay (potentially via collective grievance or, ultimately, industrial action) but cannot legally compel a non-JIB employer to adopt JIB rates. Many non-JIB firms pay close to JIB anyway because that's the market reference.",
  },
  {
    question: "Is union membership worth it as an apprentice?",
    answer:
      "Personal call. Pros: low apprentice subscription rate, support if you face workplace issues, training discounts, member benefits, sense of solidarity with the trade. Cons: monthly cost, you may never need the representation. On a JIB-graded firm with active union presence the case for membership is stronger because the shop steward is a real local resource. On a small non-JIB firm with no union presence the case is weaker. Talk to colleagues; ask around.",
  },
  {
    question: "What if I face anti-union discrimination?",
    answer:
      "TULRCA 1992 prohibits dismissal, detriment or refusal of employment because of trade union membership or activities. If you face it: document the incident in writing, raise it through the firm's grievance procedure, contact ACAS (0300 123 1100, free) for confidential advice, contact your union (if a member) for representation. Anti-union discrimination claims go to Employment Tribunal; ACAS conciliation is the typical first step. Don't bottle it — silence makes it worse.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 5"
            title="Trade union landscape"
            description="Unite the Union, GMB, the JIB pay framework, what trade unions do for an electrician, the right to join, and how union density varies across the UK electrical industry."
            tone="emerald"
          />

          <TLDR
            points={[
              "Unite the Union is the main trade union for UK electrical contracting (descended from the Electrical Trades Union). GMB also has electrical-trade members particularly in facilities management and public sector.",
              "The right to join (or not join) a union is protected by the Trade Union and Labour Relations (Consolidation) Act 1992. Anti-union discrimination is unlawful.",
              "Unite is the worker-side voice in JIB collective bargaining alongside ECA (employer side). The annual JIB rate negotiation sets the industry pay floor.",
              "Apprentice union subscriptions typically £5-8/month, full electrician rate £15-20/month. Tax-deductible. Whether to join is a personal cost-benefit judgement — there's no single right answer.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 with apprentice-relevant career pathway material on union representation and collective bargaining.",
              "Identify Unite the Union and GMB as the main trade unions in the UK electrical contracting industry.",
              "State the right to join (or not join) a trade union under TULRCA 1992 and the protection from anti-union discrimination.",
              "Explain collective bargaining and how it sets JIB pay rates each year through Unite-ECA negotiation.",
              "Identify the role of a shop steward as the elected workplace union representative.",
              "State the typical cost of union membership and the practical pros and cons of joining as an apprentice.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The unions — Unite and GMB</ContentEyebrow>

          <ConceptBlock
            title="Unite the Union — the main electrical-trade union"
            plainEnglish="Unite is the largest UK trade union and the dominant worker-side body in the electrical contracting industry. It descends from the Electrical Trades Union (ETU), which merged through several stages into Unite in 2007. Unite represents electrical workers in JIB collective bargaining, supports individual members in workplace disputes, runs union-sponsored training, and lobbies on industry policy."
            onSite="On most JIB-graded electrical contracting sites Unite is the visible worker-side presence — shop stewards on site, branch meetings off-site, the Unite logo on safety briefings. Apprentices and improvers on JIB-graded firms will typically see the Unite shop steward as the practical workplace contact for any union-related question, even if they're not members yet."
          >
            <p>
              What Unite delivers for electrical-trade members:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Worker-side voice in JIB / SJIB collective bargaining.</li>
              <li>Representation in individual workplace disputes (pay, disciplinary, dismissal).</li>
              <li>Free legal advice on employment matters (often the headline benefit).</li>
              <li>Union-sponsored training programmes and CPD.</li>
              <li>Health and safety representation under the Safety Reps and Safety Committees Regulations 1977.</li>
              <li>Member-only insurance products at preferential rates.</li>
              <li>Industry political voice and lobbying.</li>
              <li>Union learning fund (subsidised training for members).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="GMB and the wider union landscape"
            plainEnglish="GMB is the second-largest UK general union and has historic electrical-trade presence particularly in facilities management, public-sector electrical work and infrastructure maintenance. GMB is a JIB signatory union alongside Unite. Other unions (UCATT, now part of Unite; Prospect, primarily for engineering professionals) have smaller electrical-trade memberships."
            onSite="Most apprentices on JIB-graded sites will encounter Unite as the visible union; GMB tends to be more visible on facilities-management contracts, public-sector estates and some infrastructure maintenance. For most electrical apprentices the practical choice (if joining) is Unite. Workers in design and engineering roles may also consider Prospect or the IET (which is a professional body, not a union)."
          >
            <p>
              The UK union landscape touching electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unite the Union</strong> &mdash; dominant in private-sector electrical
                contracting; descended from the ETU.
              </li>
              <li>
                <strong>GMB</strong> &mdash; presence in facilities management, public-sector
                electrical, infrastructure maintenance.
              </li>
              <li>
                <strong>Prospect</strong> &mdash; engineering professionals and managers
                (smaller electrical presence).
              </li>
              <li>
                <strong>UNISON</strong> &mdash; public-sector workers including some local
                authority electricians.
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

          <ContentEyebrow>The right to join (and not to join)</ContentEyebrow>

          <ConceptBlock
            title="TULRCA 1992 — the foundational protection"
            plainEnglish="The Trade Union and Labour Relations (Consolidation) Act 1992 is the headline UK statute on trade union rights. It protects the right to join (or not join) a trade union, the right to take part in lawful trade union activities, and the right not to be discriminated against because of union membership or activities. Employers cannot dismiss, demote, refuse to hire, or treat less favourably any worker because of union membership."
            onSite="If you face anti-union pressure (e.g. 'we don't allow union members here', 'don't tell management you've joined', 'union members don't get promoted') that's unlawful under TULRCA. Document the incident in writing, raise through the grievance procedure, and contact ACAS (free, confidential) on 0300 123 1100 for advice. The right to join is fundamental and well-protected."
          >
            <p>
              Headline TULRCA 1992 protections:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.137</strong> &mdash; refusal of employment on grounds related to
                union membership is unlawful.
              </li>
              <li>
                <strong>s.146</strong> &mdash; detriment short of dismissal because of union
                membership or activities is unlawful.
              </li>
              <li>
                <strong>s.152</strong> &mdash; dismissal because of union membership or
                activities is automatically unfair.
              </li>
              <li>
                <strong>s.168-170</strong> &mdash; right to paid time off for union officials
                to carry out reasonable union duties.
              </li>
              <li>
                <strong>s.226</strong> onward &mdash; lawful industrial action requires a
                ballot meeting statutory turnout and majority thresholds.
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

          <ContentEyebrow>Collective bargaining and the JIB</ContentEyebrow>

          <ConceptBlock
            title="Collective bargaining — how Unite and ECA set the JIB rates"
            plainEnglish="Collective bargaining is the process where worker representatives (Unite + GMB on the worker side) and employer representatives (ECA) sit down each year to negotiate the JIB Working Rule Agreement. The agreed pay rates, hours, holidays, sick pay, pension and allowances apply across all JIB-graded contracts. The mechanism is voluntary (no statute compels it) but the outcomes set the industry-standard floor."
            onSite="As an apprentice on a JIB-graded contract you benefit from the bargained rates whether you're a union member or not — the rates apply to all employees on JIB-graded contracts. This is the 'free rider' aspect of collective bargaining that some unions cite as a reason to join: the bargained outcomes benefit everyone, but only members fund and participate in the bargaining. Whether that argument moves you is personal."
          >
            <p>
              The annual JIB rate negotiation typically covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hourly rate uplift for each JIB grade.</li>
              <li>Apprentice Stage rate progression.</li>
              <li>London weighting adjustment.</li>
              <li>Holiday entitlement (above statutory minimum).</li>
              <li>Industry Sick Pay scheme contribution rates.</li>
              <li>JIB pension contribution rates.</li>
              <li>Travel and lodging allowance rates.</li>
              <li>Overtime and weekend premium structures.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Shop stewards — your local union rep on site"
            plainEnglish="A shop steward is an elected workplace union representative — chosen by union members at the firm or site to represent their interests in dealings with the employer. The shop steward is the first port of call for individual workplace issues (pay disputes, disciplinary, health and safety concerns) for union members. They have statutory protections under TULRCA s.168-170 to take paid time off for reasonable union duties."
            onSite="On larger JIB-graded sites the shop steward is a known figure — typically an experienced electrician with strong knowledge of the JIB Working Rule Agreement and the local employer. For an apprentice the shop steward is often the practical first point of contact for any workplace question (even if you're not a member yet) — they're usually willing to help informally and can flag whether an issue needs formal escalation."
          >
            <p>
              When to talk to the shop steward (member or not):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Pay seems wrong (Stage rate not applied, overtime not paid, JIB rate not
                tracked).
              </li>
              <li>
                Health and safety concern not being addressed by line management.
              </li>
              <li>
                Workplace dispute (bullying, harassment, unfair treatment).
              </li>
              <li>
                Disciplinary or dismissal procedure being initiated against you.
              </li>
              <li>
                Apprenticeship-related issue (mentor not signing portfolio, off-the-job
                training time not being given, Stage progression blocked).
              </li>
              <li>
                Anti-union discrimination (member or potential member).
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
            source="Trade Union and Labour Relations (Consolidation) Act 1992 — s.146 (detriment)"
            clause={
              <>
                &quot;A worker has the right not to be subjected to any detriment as an
                individual by any act, or any deliberate failure to act, by his employer if
                the act or failure takes place for the sole or main purpose of &mdash; (a)
                preventing or deterring him from being or seeking to become a member of an
                independent trade union, or penalising him for doing so, [or] (b) preventing
                or deterring him from taking part in the activities of an independent trade
                union ...&quot;
              </>
            }
            meaning={
              <>
                If your employer treats you less favourably (denies promotion, allocates the
                worst jobs, applies more scrutiny) because you joined or supported a union,
                that&apos;s detriment under s.146. The remedy is an Employment Tribunal claim
                (with ACAS conciliation as the typical first step). Detriment claims have
                generous time limits relative to other employment claims because the
                pattern often takes time to recognise.
              </>
            }
            cite="Source: Trade Union and Labour Relations (Consolidation) Act 1992 (c.52), s.146 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Trade Union and Labour Relations (Consolidation) Act 1992 — s.168 (paid time off for union duties)"
            clause={
              <>
                &quot;An employer shall permit an employee of his who is an official of an
                independent trade union recognised by the employer to take time off during
                his working hours for the purpose of carrying out any duties of his, as such
                an official, concerned with negotiations with the employer related to or
                connected with [collective bargaining matters]; [or] the performance on
                behalf of employees of the employer of functions related to or connected
                with [collective bargaining matters].&quot;
              </>
            }
            meaning={
              <>
                Shop stewards and other union officials have a statutory right to paid time
                off to carry out reasonable union duties relating to collective bargaining.
                This is the legal basis that keeps shop stewards available on site as a
                practical workplace resource. As an apprentice you may benefit from the shop
                steward&apos;s availability even if you&apos;re not a member yet.
              </>
            }
            cite="Source: Trade Union and Labour Relations (Consolidation) Act 1992 (c.52), s.168 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="ACAS Code of Practice on Disciplinary and Grievance Procedures (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The ACAS Code of Practice on Disciplinary and Grievance Procedures sets the
                  expected standard for how UK employers handle workplace issues. Headline
                  expectations include:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Establish facts before taking action (investigation).
                  </li>
                  <li>
                    Give the employee written details of the concerns and a reasonable
                    opportunity to respond.
                  </li>
                  <li>
                    Allow the employee to be accompanied at formal disciplinary or grievance
                    meetings by a colleague or trade union representative.
                  </li>
                  <li>
                    Provide a written outcome and a right of appeal.
                  </li>
                  <li>
                    Follow procedures consistently and fairly.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The right to be accompanied at disciplinary or grievance meetings by a
                trade union representative is statutory under the Employment Relations Act
                1999 s.10. You don&apos;t have to be a union member to bring a colleague,
                but only union officials can act in the formal &quot;representative&quot;
                capacity (questioning witnesses, presenting your case). For serious
                disciplinary or grievance hearings union representation is the standard
                workplace protection &mdash; another reason members value membership.
              </>
            }
            cite="Source: ACAS Code of Practice on Disciplinary and Grievance Procedures (current edition); Employment Relations Act 1999 s.10 — paraphrased from acas.org.uk and legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Hiding union membership from the firm — and panicking when it comes up"
            whatHappens={
              <>
                Apprentice joins Unite quietly, doesn&apos;t mention it. Six months later a
                line manager makes a casual comment (&quot;you&apos;re not in the union are
                you?&quot;) and the apprentice freezes &mdash; lies, says no. The lie eats at
                them; they worry about being found out. Eventually the truth surfaces (Unite
                rep mentions them in a meeting). Apprentice now has to explain the
                inconsistency to a line manager who feels misled.
              </>
            }
            doInstead={
              <>
                Membership is your private business and you don&apos;t have to disclose it
                &mdash; but if asked directly, don&apos;t lie. A simple &quot;that&apos;s a
                personal matter, not really one I want to discuss at work&quot; is a fine
                answer that protects your privacy without dishonesty. If your employer
                pressures you on the question itself, that&apos;s evidence of anti-union
                attitudes and worth flagging to ACAS or the Unite rep.
              </>
            }
          />

          <Scenario
            title="Your firm cuts overtime rates below JIB without consultation — what's the union route?"
            situation={
              <>
                You work for a JIB-graded contractor. Last month the firm announced
                unilaterally that it was cutting weekend overtime rates from time-and-a-half
                to time-and-a-quarter, citing &quot;commercial pressures&quot;. Several
                colleagues including you are unhappy &mdash; the JIB Working Rule Agreement
                specifies time-and-a-half. The firm is claiming the JIB WRA doesn&apos;t apply
                to overtime premiums. The Unite shop steward is preparing a response.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; check the JIB Working Rule Agreement</strong>. The
                shop steward will pull the current WRA and identify the specific clause on
                overtime premiums. If the WRA specifies time-and-a-half for weekend overtime,
                the firm is in breach of the JIB-graded contract.
                <br /><br />
                <strong>Step 2 &mdash; collective grievance</strong>. The shop steward
                organises a collective grievance under the firm&apos;s grievance procedure.
                Multiple workers signing the grievance carries more weight than individual
                grievances. The grievance cites the WRA breach and asks for restoration of
                the time-and-a-half rate.
                <br /><br />
                <strong>Step 3 &mdash; escalate to JIB if needed</strong>. JIB-graded
                employers are bound to follow the WRA. If the firm refuses the grievance, the
                shop steward can escalate to the JIB national office for adjudication. JIB
                has dispute-resolution processes for WRA breaches; firms found in breach can
                lose JIB-graded status.
                <br /><br />
                <strong>Step 4 &mdash; ACAS conciliation if it gets to legal</strong>. If
                the grievance is rejected and the firm holds firm, the union can support
                affected members in unlawful deduction from wages claims at Employment
                Tribunal. ACAS conciliation is the typical first step.
                <br /><br />
                <strong>Step 5 &mdash; document everything</strong>. Throughout the process
                everything goes in writing. Email notifying you of the rate change; copies
                of payslips before and after; the JIB WRA clause cited; the grievance and
                response. The paper trail is what wins (or loses) the dispute.
              </>
            }
            whyItMatters={
              <>
                Unilateral changes to JIB-graded contract terms are exactly what collective
                bargaining and union representation are designed to push back on. Without a
                shop steward and a union channel, individual workers facing a unilateral pay
                cut would have to challenge it alone &mdash; risky and rare. Collective action
                via the union turns it into a procedural dispute that the firm has to take
                seriously. This is the practical case for union membership in one example.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>How collective bargaining actually shapes your pay</ContentEyebrow>

          <ConceptBlock
            title="The annual JIB pay round — how the rate on your payslip gets set"
            plainEnglish="JIB pay rates aren't set by government — they're negotiated each year between Unite (worker side) and ECA (employer side) under the JIB framework. Negotiations typically open in autumn for a January implementation. Both sides table claims (Unite typically argues for inflation-plus, ECA for inflation-or-below depending on industry conditions), there's structured negotiation across multiple meetings, and a final settlement is published as the new JIB national rate card. Disputes (rare) escalate to formal JIB conciliation. The settlement applies automatically to all JIB-graded contracts."
            onSite="As a JIB-graded apprentice or electrician, your January pay rise is what came out of those autumn negotiations. The settlement is announced industry-wide — check jib.org.uk in December for the next year's rates. If your firm doesn't apply the new rate, that's a contractual dispute (raise with your shop steward or HR). The collective bargaining mechanism is invisible most of the time but it's why your pay tracks industry conditions rather than depending on individual negotiation each year."
          >
            <p>
              The annual JIB pay-round timeline:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Autumn</strong> &mdash; Unite and ECA table opening positions.
              </li>
              <li>
                <strong>Negotiation rounds</strong> &mdash; multiple meetings, sometimes facilitated by JIB.
              </li>
              <li>
                <strong>December</strong> &mdash; settlement announced and published on jib.org.uk.
              </li>
              <li>
                <strong>January</strong> &mdash; new rates take effect on JIB-graded contracts.
              </li>
              <li>
                <strong>Backdating</strong> &mdash; settlement may include a backdated element if late.
              </li>
              <li>
                <strong>Disputes</strong> &mdash; rare; would trigger formal JIB conciliation procedure.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Shop stewards — the elected workplace voice and how to become one"
            plainEnglish="A shop steward is an elected workplace representative for the union — the day-to-day point of contact for members on workplace issues, and the mechanism for collective response to unilateral employer changes. TULRCA s.168 gives stewards a statutory right to paid time off for reasonable union duties (training, member representation, negotiations). Shop stewards are often the first to spot issues (unpaid travel, late grade upgrades, disciplinary process problems) because they hear from multiple members."
            onSite="Apprentices rarely become shop stewards (you need to be a settled member of the workforce) but knowing who your steward is matters. Most JIB-graded sub-contractors of any size have at least one elected steward. Ask at induction — 'who's the Unite shop steward here?' — and introduce yourself. They're the person who'll quietly steer you on issues your line manager isn't the right channel for. Becoming a steward later in your career is one of the routes into industry voice and full-time union work."
          >
            <p>
              Shop steward role and rights (Unite typical model):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Election</strong> &mdash; by union members at the workplace, typically annual.
              </li>
              <li>
                <strong>Statutory right to paid time off</strong> &mdash; TULRCA s.168 for reasonable union duties.
              </li>
              <li>
                <strong>Representation</strong> &mdash; accompany members at disciplinary, grievance, JIB hearings.
              </li>
              <li>
                <strong>Negotiation</strong> &mdash; site-level pay, conditions, programme issues.
              </li>
              <li>
                <strong>Training</strong> &mdash; Unite-funded shop steward training (typically 5 days/yr).
              </li>
              <li>
                <strong>Protection</strong> &mdash; TULRCA protects against detriment for steward duties.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Union benefits beyond pay — what £15-20/month actually buys"
            plainEnglish="Union subscription buys more than just collective bargaining. Standard Unite membership benefits include: free legal advice on workplace issues, accident-at-work legal cover (representation in personal-injury claims), employment-law representation at tribunal, JIB grading dispute support, education and training programmes, mental health and welfare support signposting, member discounts on insurance and services, and access to the wider trade union movement (TUC). For a £15-20/month tax-deductible spend, the legal cover alone often justifies the cost over a career."
            onSite="Most apprentices never use their union beyond knowing it's there — and that's fine. The point is it's there if a serious workplace issue arises (injury, dismissal, harassment, unpaid wages, contractual dispute). Pay-as-you-go legal advice on those issues runs £200+/hr; union membership is essentially insurance against that day. Apprentice subs are typically discounted (£5-8/month) precisely to build the habit early. The downside of cancelling and re-joining only when needed is that pre-existing disputes may not be covered — like any insurance, continuity matters."
          >
            <p>
              Typical Unite member benefit stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Free workplace legal advice</strong> &mdash; via the union's legal department.
              </li>
              <li>
                <strong>Accident-at-work cover</strong> &mdash; legal representation in PI claims.
              </li>
              <li>
                <strong>Employment tribunal representation</strong> &mdash; at no extra cost for members.
              </li>
              <li>
                <strong>JIB grading and disputes</strong> &mdash; member-level support through JIB processes.
              </li>
              <li>
                <strong>Education and training</strong> &mdash; TUC-aligned programmes plus union-funded short courses.
              </li>
              <li>
                <strong>Welfare signposting</strong> &mdash; links to Lighthouse Club, EIC, Mates in Mind.
              </li>
              <li>
                <strong>Discounted services</strong> &mdash; member rates on insurance, mortgages, holidays.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Unite the Union is the main UK trade union for electrical contracting (descended from the ETU); GMB has secondary presence particularly in FM and public sector.",
              "TULRCA 1992 protects the right to join (or not join) a union and prohibits anti-union discrimination, dismissal or detriment.",
              "Collective bargaining between Unite/GMB (worker side) and ECA (employer side) sets the annual JIB Working Rule Agreement — pay rates, hours, holidays, sick pay, pension.",
              "Apprentice union subscription typically £5-8/month; full electrician rate £15-20/month; tax-deductible against income tax.",
              "Shop stewards are elected workplace union reps with statutory right to paid time off for reasonable union duties (TULRCA s.168). First port of call for member workplace issues.",
              "Union membership benefits everyone on JIB-graded contracts (free-rider effect) — bargained rates apply regardless of membership; only members pay subs.",
              "Right to be accompanied at formal disciplinary or grievance meetings by a union representative (Employment Relations Act 1999 s.10).",
              "Whether to join is a personal cost-benefit judgement; Anti-union discrimination is unlawful — ACAS (0300 123 1100) provides confidential advice.",
            ]}
          />

          <Quiz title="Trade union landscape — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 Scheme membership economics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Career pathways
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
