/**
 * Module 1 · Section 2 · Subsection 6 — Asbestos awareness + escalation /
 * stop-work authority
 *
 * City &amp; Guilds 2365-02 → Unit 201
 *   • LO2 → AC 2.3 — state the actions to be taken in situations which exceed
 *     their level of responsibility for Health and Safety in the workplace
 *   • LO4 → AC 4.7 — explain situations where asbestos may be encountered
 *   • LO4 → AC 4.8 — specify the procedures for dealing with the suspected
 *     presence of asbestos in the workplace
 *
 * Frame: a single Sub bridging (a) when to STOP and ESCALATE on site for any
 * H&S concern beyond your competence — including suspected asbestos — and (b)
 * the specific case study of asbestos: where it's likely (pre-2000 buildings,
 * AIB ceiling tiles, lagging, soffits, textured coatings, gaskets, electrical
 * insulation), what it looks like, what to do (stop, isolate area, notify
 * supervisor, do NOT disturb, refer to dutyholder for asbestos register).
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
  'Asbestos awareness and stop-work authority (2.3, 4.7, 4.8) | Level 2 Module 1.2.6 | Elec-Mate';
const DESCRIPTION =
  "When to stop and escalate any H&S concern beyond your competence — and the specific case study of suspected asbestos: where it lurks in pre-2000 buildings, what it looks like, and the exact procedure when you find it.";

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod1-s2-sub6-stop-work',
    question:
      "You're an apprentice. Your supervisor isn't on site. The customer wants you to lift a 1980s ceiling tile to run a new fire-alarm cable. You don't know if the tile is asbestos. What's the right call right now?",
    options: [
      "Lift the tile carefully — if you're gentle it's fine.",
      "Stop, don't disturb the tile, ring the supervisor, ask the dutyholder for the asbestos register before any work happens above the ceiling.",
      "Take a photo, send it to the supervisor, then crack on.",
      "Cut a small piece off so the supervisor can see what type it is.",
    ],
    correctIndex: 1,
    explanation:
      "Stop, isolate the area, escalate. CAR 2012 Reg 5 says you don't disturb a material that may contain asbestos until an assessment has been done. The dutyholder for any non-domestic building is legally required to hold an asbestos register and produce it on request — that's where you find out whether the tile is AIB. 'Lifting carefully' is still 'disturbing' in the eyes of the regulator.",
  },
  {
    id: 'mod1-s2-sub6-escalation-route',
    question:
      "You spot an obvious safety breach by your supervisor — they've removed your lock-off because the customer's complaining. You raise it; they tell you to drop it. Under HASAWA s.7 and MHSWR Reg 14, what do you do next?",
    options: [
      'Drop it — they outrank you, that\'s the end of it.',
      "Escalate above the supervisor — your own employer's safety contact, the principal contractor on site, your scheme provider's helpline. Note the conversation (time, name, what was said). Your s.7 personal duty isn't discharged just because someone above you said 'drop it'.",
      "Walk off site without telling anyone.",
      "Ring the HSE directly straight away.",
    ],
    correctIndex: 1,
    explanation:
      "Section 7 of HASAWA puts a personal duty on YOU to take reasonable care AND to co-operate with the employer's safety arrangements. If your immediate supervisor has overridden a control, the escalation chain is: supervisor → your own employer / line manager → principal contractor on site → scheme provider helpline → HSE as last resort. Walking off without notifying anyone leaves the hazard live for the next person. The HSE is a real route, but you give the firm a chance to fix it first.",
  },
  {
    id: 'mod1-s2-sub6-acm-locations',
    question:
      "Which of these is NOT a typical place to find asbestos-containing materials in a UK pre-2000 building?",
    options: [
      "Suspended ceiling tiles (AIB).",
      "Lagging on old central-heating pipework.",
      "Vinyl floor tiles and the bitumen adhesive under them.",
      "PVC twin-and-earth cable installed in 2018.",
    ],
    correctIndex: 3,
    explanation:
      "Asbestos was banned in the UK in 1999. Anything manufactured after that date — including modern PVC T&E — is not an ACM. The other three are textbook ACM locations in pre-2000 buildings: AIB tiles, pipe lagging (often chrysotile or amosite), and floor tiles plus their black bitumen backing/adhesive.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "When was the import, supply and use of all forms of asbestos finally banned in the UK?",
    options: [
      "1985",
      "1999",
      "2006",
      "2012",
    ],
    correctAnswer: 1,
    explanation:
      "Crocidolite (blue) and amosite (brown) were banned in 1985. Chrysotile (white) wasn't fully banned until 1999. The practical takeaway: any building constructed or refurbished BEFORE 2000 may contain asbestos. Anything built after 2000 is presumed not to — but that presumption is only as good as the building's history.",
  },
  {
    id: 2,
    question:
      "Under the Control of Asbestos Regulations 2012, who holds the legal duty to manage asbestos in a non-domestic building?",
    options: [
      "The electrical contractor doing the work.",
      "The dutyholder — usually the building owner or whoever has responsibility for maintenance and repair (often via the lease).",
      "The HSE.",
      "Whoever last touched the building.",
    ],
    correctAnswer: 1,
    explanation:
      "CAR 2012 Reg 4 places the duty to manage asbestos squarely on the dutyholder — the person or organisation with responsibility for the maintenance and repair of the non-domestic premises. They have to keep an asbestos register, share it with anyone who might disturb the fabric (you), and have a written management plan. As an apprentice you ASK FOR the register; you're not expected to produce one.",
  },
  {
    id: 3,
    question:
      "You arrive on site and the dutyholder can't produce an asbestos register for the area you're about to drill into. Right call?",
    options: [
      "Crack on — no register means no asbestos.",
      "Stop. Don't disturb the fabric. Treat the material as 'presumed asbestos' until a sample has been analysed by an accredited lab, or until the dutyholder produces the register and confirms it's clean.",
      "Drill a small test hole to see what comes out.",
      "Call the HSE before doing anything.",
    ],
    correctAnswer: 1,
    explanation:
      "No register doesn't mean no asbestos — it means no information. HSE guidance (HSG264 and the Asbestos Essentials a0 sheet) is clear: in pre-2000 buildings without a clean survey, the material is treated as presumed ACM until proven otherwise. The dutyholder has to commission the survey and the analysis; you don't sample yourself. Calling HSE is rarely the first step — usually you escalate internally first.",
  },
  {
    id: 4,
    question:
      "Which of these asbestos types was the most heavily used in the UK and is the one most commonly encountered in pre-2000 building fabric?",
    options: [
      "Crocidolite (blue).",
      "Amosite (brown).",
      "Chrysotile (white).",
      "Tremolite (clear).",
    ],
    correctAnswer: 2,
    explanation:
      "Chrysotile (white) was the workhorse — cement sheets, textured coatings (like Artex), gaskets, brake linings, vinyl floor tiles, electrical insulation backing boards. Amosite (brown) is most commonly found in AIB ceiling tiles and pipe insulation. Crocidolite (blue) is the most dangerous fibre but was banned earliest (1985). VISUAL identification is unreliable — only lab analysis gives you the type.",
  },
  {
    id: 5,
    question:
      "What does the HSE Asbestos Essentials task sheet 'a0' cover?",
    options: [
      "The list of licensed asbestos removal contractors in the UK.",
      "Work with asbestos that does NOT need a licence — the basic precautions and which task sheets (a1–a40) cover specific jobs.",
      "Penalty fines for breaching CAR 2012.",
      "How to obtain an asbestos sample legally.",
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos Essentials a0 is HSE's introductory sheet for non-licensed asbestos work — what an electrician or other tradesperson might lawfully do (with training and the right kit) on lower-risk ACMs like cement sheets or floor tiles. The a1–a40 sheets then describe the specific tasks. ANY work on AIB, sprayed coatings or pipe lagging is licensed work and must be done by a licensed contractor — never by you.",
  },
  {
    id: 6,
    question:
      "You suspect a ceiling tile in a 1970s school is AIB. The supervisor says 'just lift one corner so I can see the back, then we'll decide.' Right call?",
    options: [
      "Lift it carefully so the supervisor can have a quick look.",
      "Stop. Lifting the tile is disturbance — even a corner. Don't touch it. Refer to the dutyholder's asbestos register; if there isn't one, demand a survey is commissioned before any work above the ceiling continues.",
      "Suggest cutting a small sample to send to a lab.",
      "Lift it but wear nitrile gloves to be safe.",
    ],
    correctAnswer: 1,
    explanation:
      "'Just lifting a corner' to inspect AIB is the textbook way junior tradespeople expose themselves and everyone else in the room to airborne fibres. Disturbance is disturbance. CAR 2012 Reg 5 requires an assessment BEFORE any work that could disturb ACMs. The supervisor asking you to do it doesn't transfer the liability — HASAWA s.7 is still on you personally. Escalate.",
  },
  {
    id: 7,
    question:
      "Under MHSWR 1999 Regulation 14, what is your duty as an employee when you spot a serious and imminent danger or a shortcoming in the employer's safety arrangements?",
    options: [
      "Nothing — that's the supervisor's job.",
      "Inform your employer (or someone with responsibility for H&S) of the danger or shortcoming AND co-operate to enable the employer to comply with their statutory duties.",
      "Call HSE first.",
      "Walk off site immediately.",
    ],
    correctAnswer: 1,
    explanation:
      "MHSWR Reg 14(2) puts the legal duty on every employee to inform the employer (or another employee with H&S responsibility) of any work situation representing a serious and immediate danger AND any shortcoming in the employer's protection arrangements. That's the legal hook for raising it up the chain — and protects you from being treated as the cause of a problem you flagged.",
  },
  {
    id: 8,
    question:
      "After raising a concern with your supervisor and being told to 'drop it', what's the most defensible thing to do BESIDES re-raising it?",
    options: [
      "Forget about it — you've done your bit.",
      "Make a written, dated note (your phone is fine) of who you spoke to, what you said, and what they said. Then escalate to the next level above (your own employer, the principal contractor, your scheme provider).",
      "Tell the customer about it.",
      "Leave site without telling anyone.",
    ],
    correctAnswer: 1,
    explanation:
      "Documenting the conversation (time, name, what was said) is what turns a verbal escalation into something you can later prove you did. It discharges your s.7 / Reg 14 duty even if the supervisor later denies the conversation happened. Then you escalate up — silence is what makes the prosecution stick to you as well.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question:
      "What does 'exceeds my level of responsibility' actually mean in practice?",
    answer:
      "Anything you haven't been trained or signed off to do. Working on live LV equipment, working at height beyond a low step, anything involving suspected asbestos, anything you're not competent at, anything where the RAMS doesn't cover what's actually in front of you. The rule is simple: if it's outside your competence, you stop, you don't guess, and you escalate to someone who IS competent.",
  },
  {
    question:
      "If I keep escalating, won't I get a reputation as the apprentice who's always 'difficult'?",
    answer:
      "No — the opposite. Supervisors and contracts managers want apprentices who flag issues early, because the alternative is finding out about them after an incident. The apprentice who quietly gets on with it and then has the accident is the expensive one. Escalating is what 'professional' looks like at apprentice level. Phrase it well and you build credit, not friction.",
  },
  {
    question: "How do I tell asbestos by sight?",
    answer:
      "You can't, reliably. There are visual clues — AIB ceiling tiles often have a fibrous, slightly chalky face; pipe lagging in pre-1990 boiler rooms is a classic; textured Artex coatings on pre-2000 ceilings often contain chrysotile. But the only definitive test is a lab analysis of a properly taken sample. The right behaviour is to TREAT the material as suspect if the building is pre-2000 and you don't have a clean survey, then escalate.",
  },
  {
    question:
      "If I disturb something tiny that turns out to be asbestos, am I in trouble?",
    answer:
      "Trouble depends on what you did before disturbing it. If you checked the asbestos register, found it clean, and disturbed something the survey missed — that's the dutyholder's failure, not yours. If you didn't check, didn't ask, just cracked on — then you (and your employer) are in the frame for a CAR 2012 / HASAWA breach. Always ASK first, document the answer, and act on it. That paperwork is your defence.",
  },
  {
    question:
      "What about domestic jobs — does CAR 2012 still apply?",
    answer:
      "Reg 4 (the duty to manage and the asbestos register) only applies to non-domestic premises and the common parts of domestic premises (stairwells, lift shafts in flats). In a private house there's no legal register. BUT — the rest of CAR 2012 still applies to anyone doing work that could disturb asbestos. So in a 1960s house where you suspect AIB or pipe lagging, the procedure is the same: stop, don't disturb, talk to the homeowner, recommend a survey before the work proceeds. Your s.7 / Reg 14 duties don't change with the building type.",
  },
  {
    question:
      "Where does asbestos turn up in things an electrician actually touches?",
    answer:
      "More places than people realise. Electrical insulation backing boards behind old fuseboards. Asbestos-cement flue pipes from old boilers running through ceiling voids. Gaskets in older switchgear. Textured coatings on the ceiling you're drilling through. Vinyl floor tiles (and the black bitumen adhesive under them) in commercial corridors. The sprayed coating on the underside of a pre-1985 metal-deck ceiling. Soffit boards on pre-2000 houses. The list is long — which is why 'pre-2000 building = check the register first' is the rule, not the exception.",
  },
];

export default function Sub6() {
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
            eyebrow="Module 1 · Section 2 · Subsection 6"
            title="Asbestos awareness and stop-work authority"
            description="Two related ideas in one Sub. WHEN you stop and escalate any H&S concern that's outside your competence — and the specific case study of suspected asbestos: where it lurks in pre-2000 UK buildings, what an electrician actually touches, and the exact procedure on the day."
            tone="emerald"
          />

          <TLDR
            points={[
              "Stop-work authority is a personal duty, not a favour. HASAWA s.7 and MHSWR Reg 14 require you to refuse work beyond your competence and to inform someone in authority when you spot a hazard or a shortcoming.",
              "Asbestos was banned in the UK in 1999. Any building built or refurbished BEFORE 2000 may contain asbestos-containing materials (ACMs) — and an electrician touches those buildings every week.",
              "On suspicion: STOP, don't disturb, isolate the area, notify your supervisor, ask the dutyholder for the asbestos register. CAR 2012 Reg 4 makes that register a legal entitlement on non-domestic premises.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the actions to be taken in situations which exceed their level of responsibility for Health and Safety in the workplace (Unit 201, AC 2.3).",
              "Explain situations where asbestos may be encountered (Unit 201, AC 4.7).",
              "Specify the procedures for dealing with the suspected presence of asbestos in the workplace (Unit 201, AC 4.8).",
              "Identify the legal hooks behind stop-work authority — HASAWA s.7, MHSWR Reg 14, CAR 2012 Regs 4, 5 and 11 — and what each one obliges you personally to do.",
              "Recognise the typical pre-2000 locations where asbestos-containing materials (ACMs) appear in UK building fabric.",
              "Distinguish licensed from non-licensed asbestos work and know which work an electrician may NEVER do.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why these three ACs sit together</ContentEyebrow>

          <ConceptBlock
            title="Stop-work authority and suspected asbestos are the same procedure"
            plainEnglish="The reason AC 2.3, 4.7 and 4.8 all share a Sub is that the response to a suspected ACM is exactly the same shape as the response to any other H&S issue beyond your competence: STOP, ISOLATE the area, NOTIFY someone in authority, DON'T MAKE IT WORSE while you wait."
            onSite="On site this is one habit. The moment something doesn't match the RAMS — strange material, undisclosed PV, a meter cupboard you weren't told about, a ceiling tile that looks AIB — your hands come off the kit, the door comes shut, the supervisor gets a phone call. Same drill, different trigger."
          >
            <p>
              The City &amp; Guilds 2365-02 syllabus puts asbestos in LO4 alongside the other
              hazards because it's the most common hazard you'll meet that's genuinely beyond
              your competence as an apprentice. You can't sample it, you can't survey it, and
              you almost certainly can't lawfully work on it. Everything you do with it is
              done in the language of escalation.
            </p>
            <p>
              AC 2.3 sits in LO2 because it's the broader principle. Asbestos is one trigger;
              live LV outside your competence is another; an unsafe access platform is
              another; a roofer above you with no edge protection is another. The action you
              take is the same shape every time.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stop-work authority — the legal hooks</ContentEyebrow>

          <ConceptBlock
            title="Three regulations that all point at the same duty on YOU"
            plainEnglish="HASAWA s.7 says take reasonable care and co-operate with the employer's safety arrangements. MHSWR Reg 14 spells that out — you must inform the employer of any serious and immediate danger AND any shortcoming in the safety arrangements. CAR 2012 Reg 5 specifically requires an assessment before any work that may disturb asbestos."
            onSite="In practice this is one phone call. 'I've stopped work because [reason]. I'm not in a position to deal with it. What do you want me to do?' The act of making the call is what discharges your duty under all three regulations at once."
          >
            <p>
              The chain of authority isn't optional. It's how the law expects safety to flow
              up an organisation. Sit on a hazard hoping it goes away and the law treats your
              silence as part of the breach. Pick up the phone and the law treats you as
              having done what was required.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.7"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work — (a) to take
                reasonable care for the health and safety of himself and of other persons who
                may be affected by his acts or omissions at work; and (b) as regards any
                duty or requirement imposed on his employer or any other person by or under
                any of the relevant statutory provisions, to co-operate with him so far as
                is necessary to enable that duty or requirement to be performed or complied
                with.&quot;
              </>
            }
            meaning={
              <>
                Two limbs that bite together for stop-work. Limb (a) — your acts AND
                omissions count, so saying nothing while a hazard sits in front of you is
                itself a breach. Limb (b) — co-operate with the employer's safety
                arrangements, including the reporting routes they've put in place. Refusing
                to escalate up is a refusal to co-operate.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Regulation 14"
            clause={
              <>
                &quot;Every employee shall use any machinery, equipment, dangerous substance,
                transport equipment, means of production or safety device provided to him by
                his employer in accordance both with any training in the use of the
                equipment concerned which has been received by him and the instructions
                respecting that use which have been provided to him by the said employer in
                compliance with the requirements and prohibitions imposed upon that employer
                by or under the relevant statutory provisions. (2) Every employee shall
                inform his employer or any other employee of that employer with specific
                responsibility for the health and safety of his fellow employees — (a) of
                any work situation which a person with the first-mentioned employee's
                training and instruction would reasonably consider represented a serious and
                immediate danger to health and safety; and (b) of any matter which a person
                with the first-mentioned employee's training and instruction would
                reasonably consider represented a shortcoming in the employer's protection
                arrangements for health and safety.&quot;
              </>
            }
            meaning={
              <>
                Reg 14(1) — only use the kit you've been trained on. Reg 14(2) — inform the
                employer of any serious and immediate danger AND any shortcoming in the
                safety arrangements. The legal threshold is what a reasonable person with
                YOUR training would judge to be dangerous. As an apprentice that bar is
                sensibly low — if you're unsure, you escalate. The Reg explicitly protects
                that judgement.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 14 — verbatim from legislation.gov.uk."
          />

          <ConceptBlock
            title="The escalation chain — five steps in order"
            onSite="Memorise the order. Skip to the wrong step and you either look reckless (going straight to HSE without telling your firm) or look complicit (drop the issue when the supervisor pushes back). Both end badly."
          >
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop work and isolate the area.</strong> Hands off the kit. Door
                shut. People out of the immediate area if there's any release risk. If
                you've got the lock-off kit on you, lock the source out so nobody else can
                walk in and re-energise.
              </li>
              <li>
                <strong>Notify your supervisor.</strong> Phone call beats a text — gets a
                two-way conversation, gets a decision, and gives you the chance to record
                it. Be factual: what you've found, why you've stopped, what you need from
                them.
              </li>
              <li>
                <strong>If the supervisor can't or won't act — escalate above them.</strong>{' '}
                Your own employer's office contact / contracts manager, the principal
                contractor's site manager, the firm's safety advisor. Document the
                conversation as you go (date, name, what was said).
              </li>
              <li>
                <strong>If the firm still won't act — go external.</strong> Your scheme
                provider's helpline (NICEIC, NAPIT etc.) is usually first. Your union if
                you're in one. The HSE has an online concerns reporting form for genuine
                breaches that the employer won't fix.
              </li>
              <li>
                <strong>In every case — record what you did.</strong> A note in your phone
                with date, time, names and what was said is enough. That note is what proves
                later that YOU discharged your s.7 / Reg 14 duty even if everyone above you
                was negligent.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Asbestos — the short history every electrician needs</ContentEyebrow>

          <ConceptBlock
            title="Three fibres, three banning dates, one underlying problem"
            plainEnglish="Asbestos is a naturally-occurring silicate fibre that was used in UK building products for most of the 20th century because it's cheap, fire-resistant, durable and a good electrical insulator. Inhaled, the fibres lodge in the lung lining and cause incurable disease decades later — mesothelioma, asbestosis, lung cancer."
            onSite="The reason it's still your problem in 2026 is that the buildings are still standing. Every pre-2000 commercial unit, every 1970s school, every 1960s office block, every old council estate — all of them potentially contain asbestos in their fabric. The kill rate now (around 5,000 UK deaths per year, mostly tradespeople) is from exposure 30+ years ago. What you do today decides the kill rate in 2055."
          >
            <p>The three asbestos types you might encounter:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Crocidolite (blue)</strong> — the most dangerous fibre, banned in
                1985. Sometimes found in sprayed coatings and pipe lagging in industrial
                buildings from the 1950s–70s. Visual cue: blue-grey fibrous appearance,
                often degraded.
              </li>
              <li>
                <strong>Amosite (brown)</strong> — banned in 1985 alongside crocidolite. The
                workhorse for AIB (Asbestos Insulating Board) ceiling tiles, partition
                boards and pipe insulation. Classic location: 1960s–80s commercial suspended
                ceilings.
              </li>
              <li>
                <strong>Chrysotile (white)</strong> — by far the most heavily used in the
                UK. Banned in 1999 (the final one). Found in cement sheets, textured
                coatings (Artex), gaskets, vinyl floor tiles, brake linings, and some
                electrical insulation.
              </li>
            </ul>
            <p>
              Visual identification is unreliable — fibres can look identical to the eye and
              they're usually bound into a matrix (cement, board, coating) that disguises
              them further. The only reliable identification is laboratory analysis. As an
              apprentice you don't sample; you escalate.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where asbestos lives in a building an electrician walks into"
            plainEnglish="If the building was up before 2000, assume ACMs are present somewhere until the asbestos register tells you otherwise."
            onSite="The places that catch electricians out are the places we go that nobody else goes — ceiling voids, behind old consumer units, under floor boards, in plant rooms, behind soffits, in the bottom of switchgear cubicles. The dust that's been undisturbed for forty years is the dust your drill kicks into the air."
          >
            <p>The classic pre-2000 ACM locations an electrician actually touches:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AIB ceiling tiles and partition boards</strong> — suspended ceilings
                in 1960s–80s offices, schools, hospitals, council buildings. You drill
                through these to fix luminaires, fire-alarm sounders, smoke detectors,
                emergency lighting. Working on AIB is LICENSED work.
              </li>
              <li>
                <strong>Pipe lagging</strong> — wrapped or moulded insulation on old
                central-heating and steam pipework. Common in plant rooms, boiler houses,
                under stairwells, in service ducts. Disturbing lagging is LICENSED work.
              </li>
              <li>
                <strong>Sprayed coatings</strong> — &quot;limpet&quot; sprayed asbestos on
                the underside of metal-deck ceilings, structural steelwork, the underside of
                stairs. Most dangerous form to disturb. LICENSED work.
              </li>
              <li>
                <strong>Textured coatings</strong> — Artex and similar decorative ceilings
                in pre-2000 housing. Usually chrysotile. Drilling, sanding or cutting
                releases fibres.
              </li>
              <li>
                <strong>Asbestos cement</strong> — flue pipes from old boilers, soffit
                boards on pre-2000 houses, garage roofs, water tanks in lofts. Lower fibre
                release than friable forms but still controlled work.
              </li>
              <li>
                <strong>Vinyl and thermoplastic floor tiles</strong> — the tile itself often
                contains chrysotile, the black bitumen adhesive under it almost always does.
                Common in commercial corridors.
              </li>
              <li>
                <strong>Gaskets and seals</strong> — in older switchgear, motor flanges and
                pump glands. Usually chrysotile woven or compressed.
              </li>
              <li>
                <strong>Electrical insulation backing boards</strong> — behind some old
                fuseboards and switch panels, especially in industrial and commercial pre-1990
                installations. The board you've spent twenty minutes trying to unscrew may
                be the ACM.
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

          <SectionRule />

          <ContentEyebrow>The duty to manage — CAR 2012 Reg 4</ContentEyebrow>

          <ConceptBlock
            title="Every non-domestic building has a dutyholder. They have to produce the register on request."
            plainEnglish="The Control of Asbestos Regulations 2012 puts a duty to manage asbestos on whoever is responsible for the maintenance and repair of any non-domestic premises. They have to find out (or assume) where ACMs are, record them in a register, assess their condition, and share that information with anyone whose work could disturb them — including you."
            onSite="At day-one site induction on any commercial / industrial / public-sector job, ASK to see the asbestos register. If there isn't one, that's a CAR 2012 Reg 4 breach by the dutyholder — and your cue to stop and escalate before any drilling, lifting or chasing happens."
          >
            <p>
              The register tells you three things: WHERE ACMs are presumed or confirmed to
              be, WHAT condition they're in, and WHAT controls are in place. Most modern
              registers come with a marked-up plan showing the exact locations colour-coded
              by ACM type. If you're working in an area marked &quot;AIB above ceiling — do
              not disturb without licensed contractor present&quot;, your job has just
              changed shape.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Regulation 4 (Duty to manage asbestos in non-domestic premises)"
            clause={
              <>
                &quot;(1) This regulation applies to non-domestic premises. (2) The dutyholder
                shall — (a) take such steps as are reasonable in the circumstances to
                determine whether asbestos is or is liable to be present in the premises;
                (b) take account of building plans or other relevant information and the age
                of the premises; (c) inspect those parts of the premises which are reasonably
                accessible. (3) Where, after such inspection, a dutyholder suspects that
                asbestos is or may be present in any part of the premises, the dutyholder
                shall presume that the asbestos is present until there is evidence to the
                contrary. (4) The dutyholder shall ensure that — (a) a determination of the
                risk from that asbestos is made; (b) a written plan identifying those parts
                of the premises concerned is prepared; and (c) the measures which are to be
                taken for managing the risk are specified in the written plan.&quot;
              </>
            }
            meaning={
              <>
                The dutyholder has to ASSUME asbestos is present until they prove it isn't.
                They have to write down where it is and how they're managing it. And they
                have to make that information available to anyone whose work could disturb
                it. As the electrician walking onto site, that information is your legal
                entitlement — not a favour.
              </>
            }
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Regulation 5 (Identification of the presence of asbestos)"
            clause={
              <>
                &quot;An employer must not undertake work in demolition, maintenance, or any
                other work which exposes or is liable to expose employees of that employer
                to asbestos in respect of any premises unless either — (a) the employer
                has carried out a suitable and sufficient assessment as to whether asbestos,
                what type of asbestos, contained in what material and in what condition is
                present or is liable to be present in those premises; or (b) if there is
                doubt as to whether asbestos is present in those premises the employer —
                (i) assumes that asbestos is present, and that it is not chrysotile alone,
                and (ii) observes the applicable provisions of these Regulations.&quot;
              </>
            }
            meaning={
              <>
                Reg 5 turns the dutyholder's register into your work-planning document. No
                assessment, no work — full stop. If there's any doubt, the regulation
                requires you to ASSUME the worst (asbestos present, not just chrysotile)
                and apply the full CAR 2012 controls. That's the legal basis for the
                &quot;treat as suspect until proven otherwise&quot; rule on every pre-2000
                building.
              </>
            }
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 5 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Regulation 11 (Prevention or reduction of exposure to asbestos)"
            clause={
              <>
                &quot;(1) Every employer must — (a) prevent the exposure to asbestos of
                any employee employed by that employer so far as is reasonably practicable;
                (b) where it is not reasonably practicable to prevent such exposure — (i)
                take the measures necessary to reduce the exposure of any employee employed
                by that employer to asbestos to as low a level as is reasonably practicable
                without resorting to the use of respiratory protective equipment, and (ii)
                ensure that the number of employees who are exposed to asbestos at any one
                time is as low as is reasonably practicable.&quot;
              </>
            }
            meaning={
              <>
                The hierarchy is the same one you met for risk control in §3 — eliminate
                first (do the work somewhere else, leave the ACM in place), then engineer
                (enclose, isolate the area, use wet stripping, controlled removal), then
                administer (limit who's in the area), then RPE as the last layer. RPE is
                the LAST control, not the first. The RAMS for any work near suspected ACMs
                has to follow this hierarchy explicitly.
              </>
            }
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 11 — paraphrased where indicated and verbatim where quoted, from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>What you ACTUALLY do on suspicion</ContentEyebrow>

          <ConceptBlock
            title="The procedure on the day — six steps"
            plainEnglish="Memorise these. They're the same six steps whether the ACM is a ceiling tile, pipe lagging, a textured coating or a gasket."
            onSite="The wrong move is almost always 'just have a quick look first'. Inspection IS disturbance. The right move is 'hands off, area sealed, supervisor on the phone, register requested'."
          >
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>STOP work immediately.</strong> Drill out, screwdriver down, hands
                off the material. If you were drilling and you've already cut into
                something suspect, don't pull the bit out — leave it where it is for now to
                avoid kicking the dust loose.
              </li>
              <li>
                <strong>ISOLATE the area.</strong> Get yourself and anyone else out of the
                immediate space. Close the door. If there's no door, tape off the area or
                put up warning signs. Open windows AWAY from people if you can do so without
                disturbing the material — fibres are most dangerous in still air where they
                stay airborne.
              </li>
              <li>
                <strong>DO NOT TOUCH, MOVE OR CLEAN.</strong> Don't sweep up the dust
                (sweeping releases fibres). Don't hoover (a domestic vacuum disperses them).
                Don't bag the offcut. Don't take a sample. Leave everything exactly where it
                is until a competent person decides what to do.
              </li>
              <li>
                <strong>NOTIFY your supervisor.</strong> Phone, not text. State what you
                found, where you found it, what you've already done (stopped, isolated,
                sealed). Ask for instructions and confirm them in writing afterwards.
              </li>
              <li>
                <strong>REQUEST the asbestos register from the dutyholder.</strong> On
                non-domestic sites this is a legal entitlement under CAR 2012 Reg 4. The
                register will tell you whether the material is known ACM, presumed ACM, or
                surveyed clean. If there's no register, the dutyholder has a CAR Reg 4 / 5
                breach and the work cannot continue until the survey is done.
              </li>
              <li>
                <strong>RECORD what you did.</strong> Note in your phone (date, time, what
                you found, who you called, what they said). That note discharges your s.7 /
                Reg 14 duty even if the dutyholder or your supervisor later try to play the
                incident down.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="HSE Asbestos Essentials — what an electrician can and cannot do"
            plainEnglish="HSE publishes a series of free task sheets called 'Asbestos Essentials'. Sheet a0 is the introduction — it explains which work needs an asbestos licence (most of it) and which work a properly trained tradesperson can do non-licensed. Sheets a1 through a40 cover specific tasks in detail."
            onSite="The simple rule: if you ever find yourself reading an Asbestos Essentials sheet and thinking 'I could do that', stop. The sheets exist for trained, equipped operatives at companies that are set up to do non-licensed asbestos work. As an apprentice you are NEVER the right person — your job is to recognise, stop and escalate."
          >
            <p>
              The split between licensed and non-licensed work matters because it tells you
              what's even available to your firm. Licensed work — work on AIB, sprayed
              coatings, pipe lagging — must be done by an HSE-licensed asbestos contractor,
              full stop. No general electrical contractor can lawfully do it, regardless of
              training.
            </p>
            <p>
              Non-licensed work covers lower-risk ACMs (asbestos cement, certain floor
              tiles, gaskets) and only when the firm has trained operatives, the right RPE,
              the right method statement and the right disposal route. Notifiable
              non-licensed work (NNLW) sits in between — non-licensed but high enough risk
              that it must be notified to HSE and recorded in a separate register. None of
              this is apprentice work.
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="'I'll just have a quick look first'"
            whatHappens={
              <>
                Apprentice spots a suspect ceiling tile while running a new fire-alarm
                sounder cable. Lifts the corner of one tile to &quot;check the back to see
                if it's AIB&quot;. The tile crumbles slightly at the edge, releases a small
                puff of dust, drops back into place. Apprentice carries on. Three days
                later, the dutyholder produces the register — that section IS marked AIB.
                A licensed contractor has to come in, the room has to be cleared, the
                ceiling void has to be air-tested, and the apprentice has to be put on the
                medical surveillance register. All from one &quot;quick look&quot;.
              </>
            }
            doInstead={
              <>
                Inspection IS disturbance. The whole point of the asbestos register is that
                the inspection (by a competent surveyor with proper kit) has already
                happened. If there's no register or it doesn't cover the area, the answer
                isn't to do an informal one yourself — the answer is to STOP and escalate.
                CAR 2012 Reg 5 is explicit on this and it doesn't have a &quot;but only a
                little bit&quot; exemption.
              </>
            }
          />

          <CommonMistake
            title="Thinking only ceiling tiles are asbestos"
            whatHappens={
              <>
                Apprentice has been told about AIB ceiling tiles in their CSCS test prep, so
                they assume that's the only place to worry about. They go into a 1960s
                school plant room, see the lagged pipework, and crack on running a new
                supply alongside it — drilling brackets into the wall right next to the
                lagging, knocking off small pieces of insulation as they work. The pipe
                lagging turns out to be amosite. Same disturbance, same exposure, much
                higher fibre release than from the AIB tiles they were trained to spot.
              </>
            }
            doInstead={
              <>
                Read the full list of typical ACM locations and treat the whole pre-2000
                building as a potential ACM source. Pipe lagging, sprayed coatings,
                textured ceilings, vinyl floor tiles, asbestos cement flues, gaskets,
                electrical insulation backing boards — any of them. The rule isn't &quot;is
                it a ceiling tile?&quot;, it's &quot;do I have a clean asbestos register
                for this area?&quot;. If no, stop.
              </>
            }
          />

          <Scenario
            title="Drilling for a new fire-alarm sounder in a 1980s school"
            situation={
              <>
                You&apos;re second-year, on a refurb at a 1980s comprehensive over half-term.
                The job is straightforward — install eight new addressable fire-alarm
                sounders in classroom corridors, replace existing devices that don&apos;t
                meet the new standard. The supervisor has gone to the wholesaler. You set up
                under the first ceiling tile, drill point marked, hammer drill on. As you
                start the hole, the tile crumbles slightly under the pressure and you see a
                fibrous edge inside the hole. The tile looks like AIB.
              </>
            }
            whatToDo={
              <>
                Stop the drill. Pull it back gently, but don&apos;t pull the bit out
                immediately if dust is still moving — let it settle for a few seconds. Step
                away from the area, get out of the corridor, close the door behind you. Ring
                the supervisor: &quot;I&apos;ve stopped at the first sounder location — the
                ceiling tile looks AIB and there&apos;s some fibre release. I need the
                asbestos register before going any further.&quot; Find the dutyholder
                on-site contact (school caretaker, site manager, business manager). Ask for
                the register. If the area is marked AIB, the work cannot continue without a
                licensed contractor either removing the tiles or working under controlled
                conditions. If the register is missing or out of date, the work stops until
                it&apos;s sorted. Note the timeline in your phone.
              </>
            }
            whyItMatters={
              <>
                Schools built between the 1950s and the early 1980s are one of the highest
                AIB-prevalence building types in the UK. The school&apos;s dutyholder is
                legally required to have a current asbestos register and a management plan
                that anticipates exactly this kind of refurb work. By stopping early you
                turn a potential CAR 2012 incident into a planning exercise — and you
                protect every kid who walks back into that corridor on Monday morning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Stop-work authority is a legal duty on YOU under HASAWA s.7 and MHSWR Reg 14 — not a favour to your employer. Silence in the face of a hazard is itself a breach.",
              "The escalation chain is: stop and isolate → notify supervisor → escalate above them if needed → external (scheme, union, HSE) as last resort → record everything in writing.",
              "Asbestos was banned in the UK in 1999. Any building constructed or refurbished BEFORE 2000 may contain ACMs — and an electrician walks into pre-2000 buildings every week.",
              "ACMs in pre-2000 buildings include AIB ceiling tiles, pipe lagging, sprayed coatings, textured coatings (Artex), asbestos cement, vinyl floor tiles, gaskets and electrical insulation backing boards. Visual identification is unreliable — only lab analysis is definitive.",
              "Non-domestic premises must have an asbestos register under CAR 2012 Reg 4. As the contractor you have a legal entitlement to see it BEFORE work starts. No register means no work until the survey is done.",
              "On suspicion: STOP, ISOLATE, do NOT touch / move / clean / sample, NOTIFY supervisor, REQUEST the register from the dutyholder, RECORD what you did. Inspection IS disturbance.",
              "Work on AIB, sprayed coatings and pipe lagging is LICENSED work — it can ONLY be done by an HSE-licensed asbestos contractor. As an apprentice you are NEVER the right person to do asbestos work of any kind.",
              "Domestic jobs aren't covered by CAR Reg 4 (no statutory register requirement) but the rest of CAR 2012 still applies and your s.7 / Reg 14 duties don't change with the building type. Same procedure: stop, don't disturb, escalate, recommend a survey.",
            ]}
          />

          <Quiz title="Asbestos awareness and stop-work authority — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Slips, trips and manual handling
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Risk assessment and method statements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
