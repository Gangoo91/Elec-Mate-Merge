/**
 * Module 4 · Section 1 · Subsection 2 — Power tools for different tasks
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.2
 *   AC 1.2 — "Identify power tools for different tasks"
 *
 * Frame: the power tools an electrician actually plugs in or charges. Drilling
 * (combi, SDS, hammer drill), cutting (recip, jigsaw, multi-tool, angle
 * grinder), grinding, heat (heat gun, gas torch), specialist (impact wrench).
 * The 110 V vs 240 V vs cordless story on construction sites and the
 * PUWER 1998 hooks for selection, maintenance and training.
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
  'Power tools for different tasks (1.2) | Level 2 Module 4.1.2 | Elec-Mate';
const DESCRIPTION =
  'Drilling (combi, SDS, hammer drill), cutting (recip, jigsaw, multi-tool, angle grinder), heat (heat gun, gas torch) and specialist power tools an electrician uses. The 110 V site supply story, cordless battery platforms and the PUWER 1998 framework that makes "right tool, fit for purpose, with training" a legal duty.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod4-s1-sub2-sds-vs-combi',
    question:
      "You're on a domestic kitchen install. You need to drill a 25 mm hole through a softwood joist for a length of T+E. The senior electrician asks which drill you'll use. SDS or combi?",
    options: [
      'SDS — bigger is always better.',
      "Combi drill with a 25 mm flat bit (or auger) — the joist is timber, not masonry. The combi spins fast and cuts cleanly through wood. SDS is rotary-hammer action designed for masonry; using it on timber wastes the tool's capability and the chuck doesn't take standard wood bits anyway. Right tool for the substrate.",
      "An angle grinder — quicker.",
      "Whatever's nearest in the van.",
    ],
    correctIndex: 1,
    explanation:
      "Substrate decides the tool. Timber and most plasterboard work = combi or cordless drill/driver. Brick, block, concrete or stone = SDS or dedicated hammer drill. Putting an SDS on a wood joist is overkill and the chuck (SDS-Plus shank) won't take an auger or flat bit anyway. A cordless combi with a 25 mm spade bit goes through a softwood joist in 3–4 seconds.",
  },
  {
    id: 'mod4-s1-sub2-110v-site',
    question:
      "You arrive on a commercial fit-out site and plug your 230 V SDS into a wall socket. The site agent tells you to 'sort that out' before he sees you again. Why?",
    options: [
      'Because he doesn\'t like you.',
      "Construction site practice (HSE INDG291 and CDM-driven site rules) requires reduced low-voltage 110 V CTE (centre-tapped earthed) supplies for portable tools — fed by a site transformer. The voltage to earth is 55 V on each leg, which dramatically reduces shock energy if a tool fault develops. 230 V tools are not banned by statute but are considered the wrong tool for the construction environment under PUWER Reg 4 — and most principal contractors enforce 110 V as a site rule.",
      "Because 230 V is illegal everywhere.",
      "Because cordless is mandatory.",
    ],
    correctIndex: 1,
    explanation:
      "110 V CTE is the construction-industry standard for portable power tools because it limits the shock current available if a fault develops. The HSE recommends it strongly in INDG291 and most principal contractors make it a site rule under their CDM duties. Cordless (typically 18 V or 36 V battery) is increasingly the alternative — no transformer, no trailing leads, but you need the chargers and spare batteries on hand. 230 V on site is the awkward third option that gets you sent home.",
  },
  {
    id: 'mod4-s1-sub2-grinder-swa',
    question:
      "You're glanding a 16 mm² SWA into the bottom of an industrial DB. The armour needs to be cropped square so it lands cleanly in the gland. What power tool best does that?",
    options: [
      'A jigsaw.',
      "A 115 mm angle grinder with a thin metal-cutting disc (or SWA shears for a hand-tool option). The grinder gives a fast square cut through the armour without crushing it; SWA shears (Knipex 95 31 250 or similar) are the hand-tool alternative for smaller cables. Reciprocating saws can also work for larger SWA where the disc won't fit cleanly. Wear eye protection AND a face shield — armour spits hot fragments.",
      'A combi drill.',
      'A hammer.',
    ],
    correctIndex: 1,
    explanation:
      "Angle grinders are the standard power-tool answer for cutting steel-wire armour and any other metalwork on site (tray, basket, conduit). Always with a fresh thin-cut metal disc, always with a guard fitted, always with eye AND face protection (safety specs aren't enough for grinder sparks). For SWA up to about 16 mm² you can use SWA shears as a quieter hand-tool option; above that the grinder wins.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "PUWER 1998 has three regulations that bear directly on power-tool use — Reg 4 (suitability), Reg 5 (maintenance) and Reg 9 (training). Which of these requires that every operative is given adequate information and training BEFORE they use a piece of work equipment?",
    options: [
      "Reg 4.",
      "Reg 9 — 'every employer shall ensure that all persons who use work equipment have received adequate training for purposes of health and safety, including training in the methods which may be adopted when using the work equipment, any risks which such use may entail and precautions to be taken'. The supervisor handing you an SDS without an induction is a Reg 9 breach by the firm.",
      "Reg 5.",
      "Reg 11.",
    ],
    correctAnswer: 1,
    explanation:
      "PUWER Reg 9 is the training duty. It's why a tidy site won't let you near an SDS, an angle grinder or a recip saw on day one until someone has walked you through the tool, the risk and the technique. The duty sits on the employer (firm and supervisor) but the apprentice has a corresponding duty under HASAWA s.7 to ASK for the training rather than just pick the tool up.",
  },
  {
    id: 2,
    question:
      "On a construction site you're issued with a 110 V SDS hammer drill and a yellow plug. What's the technical reason 110 V is preferred to 230 V for site portable tools?",
    options: [
      "Because 110 V drills are smaller.",
      "The 110 V supply on site is centre-tapped earthed (CTE), so the voltage between either leg and earth is only 55 V. A faulty tool that ends up with the case live to one leg only puts 55 V between the casing and the operative, not 230 V. Combined with a 30 mA RCD at the transformer this dramatically reduces shock energy and survivability if something goes wrong.",
      "Because 110 V is faster.",
      "Because 110 V tools are cheaper.",
    ],
    correctAnswer: 1,
    explanation:
      "CTE wiring puts the centre of the secondary winding at earth potential, so each leg sits at +55 V and -55 V. A single fault to earth gives you 55 V across the body, not 230 V. The construction industry standardised on this in the 1970s after a run of fatalities from 230 V tools in damp site conditions. The yellow plug (BS EN 60309-2 16 A 4h) is the visual signal of a 110 V CTE supply.",
  },
  {
    id: 3,
    question:
      "You're given the choice between corded and cordless for a long second-fix shift on a domestic refurb. What does the realistic decision come down to?",
    options: [
      "Cordless is always better.",
      "Three things — battery life vs run time (a hard day on an SDS will drain a 5 Ah pack faster than you can charge spares), tool weight (cordless SDS with a 9 Ah pack on the back is noticeably heavier than a corded equivalent), and what supply is actually on site (no 110 V on site = corded 230 V is awkward, cordless wins). Most apprentices end up with a mixed loadout — cordless drill/driver + cordless impact for general work, corded SDS / grinder / recip on site supply for the heavy-duty jobs.",
      "Corded is always better.",
      "Doesn't matter.",
    ],
    correctAnswer: 1,
    explanation:
      "Modern cordless platforms (Makita 18 V LXT, DeWalt 18 V XR, Milwaukee M18 FUEL, Bosch 18 V Professional) have closed most of the gap with corded for drilling, driving and impact work. For sustained heavy-load work (SDS chiselling, angle grinding a long run of tray, full-day recip cutting) corded still has the edge on run time and pack weight. The pragmatic answer is a mixed loadout — and most apprentices inherit whatever battery platform their firm has standardised on.",
  },
  {
    id: 4,
    question:
      "Which power tool is the standard answer for cutting through plasterboard between a small access hole to fit a recessed downlight?",
    options: [
      "An angle grinder.",
      "A hole saw of the correct diameter on a cordless combi drill — cuts a clean circular hole sized exactly to the downlight aperture (typically 65 mm or 75 mm). For the rough access cut where you need a square hole or are running cable through, a multi-tool (oscillating multi-cutter, Bosch GOP / Fein MultiMaster) gives a controlled plunge cut without dust kicking up half the room.",
      "A jigsaw.",
      "A hammer drill.",
    ],
    correctAnswer: 1,
    explanation:
      "Hole saws sized to the downlight diameter are the cleanest answer for the actual fitting hole. Multi-tools (oscillating cutters) are the answer for irregular access cuts, plunge cuts into existing plasterboard, and any cut where dust and noise need to be kept down. Jigsaws work for plasterboard but throw dust everywhere; angle grinders are massive overkill on plasterboard.",
  },
  {
    id: 5,
    question:
      "You need to cut a 100 mm diameter hole through an external cavity wall (brick + 100 mm cavity + block) for a soil-pipe vent that will share its route with an outgoing data cable. What power tool combination is realistic?",
    options: [
      "Combi drill only.",
      "An SDS-Max or larger SDS with a 100 mm core bit (sometimes called a diamond core drill) for the through-wall hole. Smaller SDS-Plus tools struggle with cores above 50 mm; SDS-Max is the bigger chuck system designed for it. Wet-coring (water flood) is preferred for diamond cores because it controls dust and stops the bit overheating, but dry-coring with intermittent withdrawal is acceptable for short single holes.",
      "A jigsaw.",
      "A claw hammer.",
    ],
    correctAnswer: 1,
    explanation:
      "Through-wall coring is one of the few jobs that genuinely needs the bigger SDS platform. SDS-Plus (the smaller chuck) handles drill bits up to about 32 mm comfortably and core bits up to about 50 mm; above that you need SDS-Max with a longer, thicker shank that can handle the torque of a 100 mm+ core. Hire centres rent SDS-Max kits by the day for this kind of one-off; most apprentice-grade kit is SDS-Plus.",
  },
  {
    id: 6,
    question:
      "PUWER Reg 5 requires work equipment to be 'maintained in an efficient state, in efficient working order and in good repair'. For a power tool on site what does that practically mean?",
    options: [
      "Keep it shiny.",
      "Three layers — pre-use visual inspection by the operative every shift (cable, plug, casing, guard, switch, brushes for corded tools); periodic in-service inspection (formal visual check by a competent person); and PAT (Portable Appliance Testing) on the documented site interval. Sub 1.3 covers this in detail. The point: PUWER Reg 5 isn't 'PAT once a year'. It's an ongoing duty with multiple layers.",
      "Just PAT it.",
      "Buy a new one when it breaks.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 5 is layered. Pre-use visual is the apprentice's daily duty. In-service inspection is a competent-person job at a documented interval. PAT is the formal electrical test on the inspection cycle (3-monthly typical for 110 V site tools, 6 or 12-monthly for less harsh environments). All three layers together discharge Reg 5; missing any one weakens the defence at any incident investigation.",
  },
  {
    id: 7,
    question:
      "When using an angle grinder to cut SWA armour, which combination of PPE and tool setup is correct?",
    options: [
      "Just the grinder.",
      "Eye protection (safety specs to BS EN 166) AND a face shield, hearing protection (the disc is well above 85 dB), gloves, the grinder's guard properly fitted and oriented to deflect sparks AWAY from the operative and any combustibles, the correct disc type (thin metal-cutting, not stone or wood), the disc rated for at least the grinder's free speed, and a clear cutting area with a fire watch if the sparks could reach combustibles.",
      "Just safety specs.",
      "No PPE — grinders are simple.",
    ],
    correctAnswer: 1,
    explanation:
      "Angle grinders cause more lost-time injuries than any other power tool an electrician uses. The disc spins at 11,000–13,000 rpm and shatters easily if mis-applied. Full PPE (eye AND face AND ears AND gloves), correct disc, properly fitted guard, and a fire-watch awareness for the sparks are all non-negotiable. Most firms require formal grinder training (PUWER Reg 9) before letting an apprentice near one.",
  },
  {
    id: 8,
    question:
      "You're 18 months into your apprenticeship and the firm has standardised on Milwaukee M18 cordless. The senior electrician hands you a Makita 18 V drill instead. What's the practical issue?",
    options: [
      "Nothing.",
      "Battery platforms are not interchangeable — Milwaukee M18 batteries don't fit Makita LXT tools and vice versa. If the firm runs Milwaukee, that's the platform whose chargers and spare packs are on every van and in every site box. A loose Makita drill is an outlier — one tool with no spare batteries when you need them, and no compatible charger nearby. Either ask for the matching Milwaukee tool, or accept you're working with one battery on the clock.",
      "Makita is illegal on site.",
      "All cordless drills are the same.",
    ],
    correctAnswer: 1,
    explanation:
      "Cordless platforms are commercial ecosystems — you buy into one (Makita LXT, DeWalt XR, Milwaukee M18, Bosch Professional, Hilti) and the tools, chargers and batteries all match. Mixing platforms means doubling up on chargers and managing two sets of batteries. Most firms standardise to control cost. Apprentices typically inherit the firm's chosen platform and build their personal kit around it.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "What's the actual difference between an SDS, a hammer drill and a combi drill?",
    answer:
      "Three separate tools with overlapping use. A combi drill (combination drill) does drill + screwdrive + light hammer — the chuck is keyless and takes any standard bit. A hammer drill is a heavier-duty corded or cordless tool with a more aggressive percussion action — the chuck is still standard. An SDS (Slotted Drive System) drill uses a special shank (SDS-Plus or SDS-Max) and a true rotary-hammer mechanism that delivers far more impact energy per blow than a hammer drill. For wood and small fixings — combi. For brick / block / concrete — SDS every time.",
  },
  {
    question: "Why is 110 V site supply yellow and 230 V site supply blue?",
    answer:
      "BS EN 60309-2 colour-codes the industrial plug-and-socket system by voltage. Yellow = 110 V, Blue = 230 V (single phase), Red = 400 V (three phase), Green = 500 V or higher. The colours are visual safety — you can spot a 110 V transformer feed and a 230 V feed across a building site at a glance. The 'CEE form' or 'CEEform' plug everyone uses on site is the BS EN 60309 standard.",
  },
  {
    question: "Do I have to do PAT testing or is that the senior electrician's job?",
    answer:
      "PAT (Portable Appliance Testing) itself is done by a competent person — typically the firm's appointed PAT tester or a separate PAT-testing contractor. As an apprentice you almost certainly won't do the formal test until later in your training. BUT — the pre-use visual inspection of every tool you pick up is YOUR duty, every shift, every time. Cable, plug, casing, guard, switch, anti-restart. Sub 1.3 covers the full inspection routine.",
  },
  {
    question: "Can I use my own personal cordless drill on a job?",
    answer:
      "Most firms say no, for two reasons. First — under PUWER, the firm has to be able to demonstrate maintenance and inspection of work equipment. Personal tools fall outside that documentation. Second — insurance. If your personal tool causes an injury or damage, the firm's PL cover may decline because the equipment wasn't on the firm's inventory. Use the firm's tools on the firm's jobs; keep personal kit for your own DIY.",
  },
  {
    question: "Which battery platform should I buy for my own cordless kit?",
    answer:
      "Match the firm. If the firm runs Makita, buy Makita. If they run Milwaukee, buy Milwaukee. Common-platform kit means batteries are interchangeable between the firm's tools and yours, chargers are everywhere, and you're not the apprentice trying to charge their odd Bosch on a Makita charger. The four big platforms in UK electrical contracting are Makita LXT (18 V), DeWalt XR (18 V), Milwaukee M18 (18 V) and Bosch Professional (18 V). All four are good kit; the right one is the one your firm runs.",
  },
  {
    question: "What's a multi-tool actually for? It looks like an expensive vibrating thing.",
    answer:
      "Oscillating multi-tools (Fein MultiMaster, Bosch GOP, Makita TM3010) are dust- and noise-controlled cutting tools for confined or finished spaces. The blade vibrates back and forth a few degrees rather than spinning — so it cuts wood, plasterboard, plastic and even thin metal without throwing dust everywhere. Standard for cutting back-box apertures into existing finished plasterboard, plunge-cutting cable routes through skirting boards, and scraping out old caulk. Once you've used one for a confined cut you won't reach for a jigsaw in the same situation again.",
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 2"
            title="Power tools for different tasks"
            description="The power tools an electrician plugs in or charges — drilling, cutting, grinding, heat and specialist. The 110 V vs 230 V vs cordless story on a UK construction site, the battery-platform reality, and the PUWER 1998 framework that makes 'right tool, fit for purpose, with training' a legal duty."
            tone="emerald"
          />

          <TLDR
            points={[
              "Power tools split into five working families — drilling, cutting, grinding, heat and specialist. Pick by substrate (timber, masonry, metal) not by what's nearest in the van.",
              "Construction sites run on 110 V CTE supply via a yellow plug — voltage to earth is 55 V, dramatically reducing shock energy. 230 V tools belong in finished buildings; cordless is the third option.",
              "PUWER 1998 binds the firm three ways — Reg 4 (suitable equipment), Reg 5 (maintained), Reg 9 (operatives trained). The supervisor handing you an angle grinder without training is a Reg 9 breach; you taking it without asking is a HASAWA s.7 breach.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the five working families of power tool used on electrical installation work — drilling, cutting, grinding, heat and specialist.",
              "Match each power tool (combi drill, SDS, hammer drill, recip saw, jigsaw, multi-tool, angle grinder, heat gun, impact wrench) to the substrate and task it is designed for.",
              "Explain why 110 V CTE site supply is preferred over 230 V on construction sites and identify the BS EN 60309-2 yellow plug as the visual signal.",
              "Compare the realistic trade-offs between corded 230 V, corded 110 V and cordless tools for a typical apprentice's day on site.",
              "Apply PUWER 1998 Regs 4, 5 and 9 to power-tool selection, maintenance and training decisions on real jobs.",
              "Recognise the additional PPE and setup requirements for an angle grinder over and above a drill or saw.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Five families — pick by substrate, not by habit"
            plainEnglish="Power tools fall into five working families. Drilling for making holes. Cutting for cropping or shaping material. Grinding for shaping or finishing metal. Heat for shrink-wrap and joints. Specialist for the awkward jobs that don't fit elsewhere. Within each family the right tool is decided by the substrate (what you're drilling INTO or cutting THROUGH), not by which tool is nearest in the van."
            onSite="The biggest mistake an apprentice makes in their first month with power tools is reaching for whatever is closest. SDS on a timber joist, combi on a brick wall, jigsaw on plasterboard — the tool will sort of do the job, but slowly, badly, and with a wrist injury after a couple of hours. Walk to the van and get the right tool out — that's two minutes lost vs an afternoon of misery."
          >
            <p>
              The five families and what sits in each:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drilling</strong> — combi drill (timber, plasterboard, light fixings), hammer drill (occasional masonry), SDS-Plus (regular masonry, brick, block), SDS-Max (heavy concrete, coring above 50 mm).
              </li>
              <li>
                <strong>Cutting</strong> — reciprocating saw (rough cuts in awkward places), jigsaw (curved or controlled cuts in timber and thin metal), oscillating multi-tool (confined or finished space cuts), angle grinder (metal cutting — SWA armour, tray, conduit).
              </li>
              <li>
                <strong>Grinding</strong> — angle grinder again (the one tool that does both — different disc), bench grinder (workshop only — sharpening hand tools).
              </li>
              <li>
                <strong>Heat</strong> — heat gun (for shrink-wrap on splices, glue-lined heat-shrink, removing old paint), gas torch (for soldered joints — niche electrical use, mostly for plumbing trades on bonding tails).
              </li>
              <li>
                <strong>Specialist</strong> — cordless impact wrench (tray supports, gland nuts), nail gun (occasional joist clipping), pull-press tools for compression lugs (Klauke / Cembre), rotary cable strippers for SWA armour (Jokari / Knipex).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The 110 V site supply story</ContentEyebrow>

          <ConceptBlock
            title="Why every UK construction site uses 110 V CTE for portable tools"
            plainEnglish="110 V CTE (centre-tapped earthed) is the construction-industry standard for portable power tools. The 110 V supply comes from a site transformer with the centre of the secondary winding earthed, so the voltage between either leg and earth is only 55 V. A faulty tool with the case live to one leg puts 55 V across your body, not 230 V."
            onSite="Every site you walk onto in the UK should have a 110 V transformer somewhere — usually a yellow box near the welfare unit or distribution point, with yellow CEEform sockets dotted around for tool feeds. Your tools either need to be 110 V (yellow plug) or cordless. A 230 V drill on a site supply gets you sent home for the day."
          >
            <p>
              The technical setup is straightforward:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Site transformer steps 230 V single phase down to 110 V single phase. Centre tap of the secondary winding is earthed.
              </li>
              <li>
                Each &apos;leg&apos; of the 110 V supply sits at &plusmn;55 V to earth. Phase to neutral is 110 V; phase to earth is 55 V.
              </li>
              <li>
                Output sockets are BS EN 60309-2 yellow CEEform plugs and sockets &mdash; 16 A 4h or 32 A 4h depending on the tool current.
              </li>
              <li>
                30 mA RCD protection is fitted at the transformer output. So even if a fault develops, the RCD trips inside 40 ms at 5&times; tripping current.
              </li>
            </ul>
            <p>
              The result &mdash; a tool fault that would deliver a fatal shock at 230 V delivers a survivable shock at 55 V to earth, AND the RCD trips inside the typical fibrillation threshold time. Two layers of protection for the price of a transformer and a couple of yellow leads.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE — Electrical safety on construction sites (HSG141) and INDG291"
            clause={
              <>
                &quot;Reduced low voltage systems (110 V centre-tapped to earth) are recommended for
                portable hand tools and lighting on construction sites because, in the event of a
                fault, the voltage to earth does not exceed 55 V, which significantly reduces the
                risk of fatal shock.&quot;
              </>
            }
            meaning={
              <>
                HSE guidance is not statute &mdash; it&apos;s a recommendation. But under PUWER
                Reg 4, &apos;suitable equipment&apos; for a construction-site environment is read
                in light of HSE guidance. Using 230 V portable tools on site without a documented
                risk-assessed reason is treated as a Reg 4 breach in any post-incident
                investigation. Most principal contractors enforce 110 V as a contractual site rule
                under their CDM duties as a result.
              </>
            }
            cite="Source: HSE HSG141 'Electrical safety on construction sites' (paraphrased) and INDG291 'Electrical safety and you' — both available on hse.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Drilling family</ContentEyebrow>

          <ConceptBlock
            title="Combi, hammer drill, SDS-Plus, SDS-Max — substrate-driven choice"
            onSite="The biggest decision is masonry vs not-masonry. Timber, plasterboard, light steel = combi drill (any 18 V cordless will do it). Brick, block, concrete = SDS. Putting a combi on brick will burn the bit, the chuck and your wrist; putting an SDS on timber will splinter the joist and chew the chuck. The right tool exists for each substrate."
          >
            <p>
              Walk through the four:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combi drill</strong> (Makita DHP484, DeWalt DCD796, Milwaukee M18 FUEL) &mdash; cordless 18 V, three modes (drill / driver / light hammer). Standard chuck takes any twist bit, flat bit, hole saw, screwdriver bit. The everyday tool. Apprentices spend 80% of their drilling time on this one.
              </li>
              <li>
                <strong>Dedicated hammer drill</strong> &mdash; 230 V or 110 V corded. Heavier percussion than the combi&apos;s hammer mode but still uses a standard chuck. Increasingly replaced by cordless SDS-Plus tools.
              </li>
              <li>
                <strong>SDS-Plus rotary hammer</strong> (Makita HR2811, DeWalt D25134K, Bosch GBH 2-28) &mdash; the masonry workhorse. SDS-Plus shank holds a rotary-hammer bit that delivers ~3 J impact energy per blow. Drills 6&ndash;30 mm holes in brick, block, concrete. Most also have a rotation-only mode for screwdriving and a hammer-only mode for light chiselling. Cordless versions (Makita DHR242, DeWalt DCH273) are now the apprentice-friendly default.
              </li>
              <li>
                <strong>SDS-Max</strong> (Hilti TE 70, Makita HR4013C) &mdash; bigger shank, bigger impact (~10&ndash;20 J), for through-wall coring above 50 mm and serious concrete demolition. Hire-only for most apprentices &mdash; not in the standard van loadout.
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

          <ContentEyebrow>Cutting family</ContentEyebrow>

          <ConceptBlock
            title="Recip, jigsaw, multi-tool, angle grinder — pick the right blade for the substrate"
            plainEnglish="Cutting power tools are blade-led — the tool is just the holder. Pick the right blade for the substrate (wood, metal, plasterboard) and the right tool body for the cut geometry (straight rough, curved controlled, confined precise, metal). Use the wrong blade and you'll either burn the blade out or chew the workpiece."
          >
            <p>
              The four cutting tools and what each is for:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reciprocating saw / sabre saw</strong> (Milwaukee Super Sawzall, Makita JR3070CT) &mdash; powerful straight-line cuts in awkward access. Great for cropping joists, cutting through old conduit, demolition cuts. Wood blades, metal blades, demolition (bi-metal) blades. Aggressive and not precise &mdash; not for finishing cuts.
              </li>
              <li>
                <strong>Jigsaw</strong> (Bosch GST 90 BE, Makita 4329K) &mdash; controlled curved or straight cuts in timber and thin metal. Variable speed, orbital cut adjustment. Apprentice-friendly &mdash; the first power saw most people learn. Standard for cutting back-box apertures in MDF kitchen carcasses, shaping panel cutouts.
              </li>
              <li>
                <strong>Oscillating multi-tool</strong> (Fein MultiMaster, Bosch GOP 30-28) &mdash; the precision tool for confined cuts. Plunge cuts into existing plasterboard, scrapes out old caulk, cuts back-box apertures into already-finished walls. Low dust, low noise. Increasingly the default for second-fix retrofit work.
              </li>
              <li>
                <strong>Angle grinder</strong> (Makita DGA452 cordless, DeWalt DWE4217 corded 115 mm) &mdash; metal cutting and grinding. SWA armour, steel conduit, threaded rod, tray and basket. The most dangerous tool an electrician uses regularly &mdash; full PPE every time, formal training before first use under PUWER Reg 9.
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

          <ContentEyebrow>Heat tools</ContentEyebrow>

          <ConceptBlock
            title="Heat guns and gas torches — small but specific"
            onSite="The heat gun lives in the second-fix toolbox for shrink-wrap and glue-lined heat-shrink terminations. The gas torch is rare in modern electrical work — soldered joints have largely given way to crimped or screw connections — but you'll still meet one on bonding clamps to old gas / water pipework where the plumber needs heat to wipe a joint."
          >
            <p>
              Two tools, narrow use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat gun</strong> (Makita HG6531CK, DeWalt D26414) &mdash; corded or cordless. Variable temperature 50&ndash;650&deg;C. Standard use is shrinking heat-shrink tubing over splices and joints, and glue-lined heat-shrink over outdoor or marine cable connections. Also useful for softening old PVC tape adhesive when removing.
              </li>
              <li>
                <strong>Gas torch</strong> (MAPP gas or propane, Sievert / Rothenberger pencil torch) &mdash; rarely used in pure electrical work. Mostly a plumber&apos;s tool that an electrician borrows occasionally for bonding-clamp work where a soldered seal is required to old pipework. Hot-work permit required on most commercial sites.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Specialist tools</ContentEyebrow>

          <ConceptBlock
            title="The tools that don't fit anywhere else"
            plainEnglish="The specialist family is everything that doesn't drill, cut, grind or heat — but earns its place in the van for specific jobs. Cordless impact wrenches for tray and basket installation. Compression-lug pull-press tools for medium-voltage terminations. Rotary cable strippers for SWA armour. None of these are everyday tools, but each is the right tool for one specific job."
          >
            <p>
              The headline specialist tools an apprentice will meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cordless impact wrench</strong> (Makita DTW1002, Milwaukee M18 FUEL High Torque) &mdash; high-torque short-burst tool for steelwork. Tray and basket assembly, gland nut tightening, threaded-rod fixings, panel chassis bolts.
              </li>
              <li>
                <strong>Hydraulic / battery-electric crimpers</strong> (Klauke EK 50, Cembre B1300) &mdash; for compression lugs above 50 mm&sup2; where a hand crimper can&apos;t deliver enough force. Hire-only or shared kit on most jobs.
              </li>
              <li>
                <strong>Rotary cable strippers</strong> (Jokari Quadro, Knipex 16 95 02 SBE) &mdash; cylindrical strippers for SWA armour and round multicore cables. Saves the angle-grinder route for many smaller SWA jobs. Covered in detail in Sub 1.4.
              </li>
              <li>
                <strong>Cordless nail gun</strong> &mdash; less common in pure electrical work; used for clipping cable to joists at speed on big jobs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The PUWER framework</ContentEyebrow>

          <ConceptBlock
            title="Three regs that bind every power-tool decision"
            onSite="PUWER is the regulatory umbrella for every plug-in or charge-up tool you use. Three regulations matter most — Reg 4 (the right tool for the job), Reg 5 (kept in good working order — Sub 1.3 covers this), and Reg 9 (operatives trained before use). The HSE works through this trio at every tool-related incident investigation."
          >
            <p>
              The three pillars:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 &mdash; suitability</strong>. The tool must be designed for the job, in suitable condition, and used in the manner intended. Same Reg 4 as Sub 1.1 covered for hand tools.
              </li>
              <li>
                <strong>Reg 5 &mdash; maintenance</strong>. The tool must be kept in efficient working order. Pre-use visual checks, in-service inspection, PAT cycle. The full inspection routine sits in Sub 1.3.
              </li>
              <li>
                <strong>Reg 9 &mdash; training</strong>. Every operative must have received adequate training before using a piece of work equipment, including the risks involved and the precautions. The supervisor handing you an SDS, an angle grinder or a recip saw without an induction breaches Reg 9 &mdash; and you have a HASAWA s.7 duty to ASK for the training rather than just pick it up.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Provision and Use of Work Equipment Regulations 1998 — Reg 9"
            clause={
              <>
                &quot;Every employer shall ensure that all persons who use work equipment have
                received adequate training for purposes of health and safety, including training
                in the methods which may be adopted when using the work equipment, any risks which
                such use may entail and precautions to be taken.&quot;
              </>
            }
            meaning={
              <>
                Reg 9 is the training duty. It binds the employer absolutely &mdash; no
                &quot;reasonably practicable&quot; qualifier. The supervisor must give an
                operative training before handing them a piece of equipment, and must ensure that
                training covers (a) how to use it, (b) what could go wrong, and (c) what to do
                about it. For apprentices this means: don&apos;t pick up an angle grinder, recip
                saw, SDS or impact wrench until someone has walked you through it. If they
                haven&apos;t, ask &mdash; that&apos;s your s.7 duty discharged.
              </>
            }
            cite="Source: Provision and Use of Work Equipment Regulations 1998 (S.I. 1998/2306), Reg 9 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Battery platforms — the cordless ecosystems</ContentEyebrow>

          <ConceptBlock
            title="Why every firm picks a platform and sticks to it"
            plainEnglish="Cordless tools come in commercial ecosystems — Makita LXT, DeWalt XR, Milwaukee M18, Bosch Professional, Hilti. Within each ecosystem the batteries, chargers and tool bodies all match. Across ecosystems, nothing is interchangeable. Most firms standardise on one platform to control cost; apprentices typically inherit whatever the firm runs and build their personal kit around the same platform."
            onSite="The first question on day one of an apprenticeship is normally 'what battery platform does the firm run?'. The answer dictates which charger lives in the van, which spare batteries are on the shelf, and which platform you buy your own kit on once you start earning enough for tools. Buying off-platform means doubled chargers, mismatched batteries, and the awkward conversation about why your DeWalt drill won't run on the firm's Makita pack."
          >
            <p>
              The four UK-dominant 18 V cordless platforms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Makita LXT (18 V)</strong> &mdash; the most-installed platform in UK domestic and small commercial contracting. Wide tool range, reliable batteries (BL1850B 5.0 Ah, BL1860B 6.0 Ah). Fits most apprentice budgets.
              </li>
              <li>
                <strong>DeWalt XR (18 V / 20 V Max)</strong> &mdash; equally widespread. The XR brushless line is the higher-end option (DCD796 combi, DCH273 SDS). Good battery longevity.
              </li>
              <li>
                <strong>Milwaukee M18 (18 V)</strong> &mdash; the Fuel sub-line is the most powerful 18 V tool family on the market for many categories (M18 FUEL Super Sawzall, M18 FUEL High Torque impact wrench). Premium price; popular with industrial and HVAC contractors.
              </li>
              <li>
                <strong>Bosch Professional (18 V)</strong> &mdash; the European workhorse. Strong on hammer drills (GBH 18V-21) and inspection cameras. Less common in UK domestic; standard on large continental contractors.
              </li>
            </ul>
            <p>
              Higher voltage platforms (Makita XGT 40 V, DeWalt FlexVolt 54 V, Milwaukee MX FUEL) are beginning to appear for the heaviest-duty work (SDS-Max replacements, breakers, large grinders). Not standard for an apprentice but worth knowing the names.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reaching for the SDS to drill a softwood joist"
            whatHappens={
              <>
                Apprentice is standing under a kitchen ceiling with an SDS-Plus loaded with the 25
                mm masonry bit they used on the brick wall outside. Joist needs a 25 mm hole for
                the T+E run. They put the SDS on rotary mode, lean in, and the bit (designed for
                pulverising masonry, not slicing wood) tears a ragged hole, splinters the joist
                edge, and binds inside the joist. Wrist takes the kickback. The joist is now
                weaker than it was. The supervisor adds a sister joist and the apprentice gets a
                lecture.
              </>
            }
            doInstead={
              <>
                Walk to the van and pick up the cordless combi with a 25 mm spade bit (or, better,
                a 25 mm Forstner bit if you want a clean hole). Combi runs at 1500&ndash;2000 rpm
                with no hammer action &mdash; cuts through the joist in three seconds with a clean
                round hole. SDS is for masonry. Combi is for timber and plasterboard. Match the
                tool to the substrate every time.
              </>
            }
          />

          <CommonMistake
            title="Plugging a 230 V tool into a site socket"
            whatHappens={
              <>
                Apprentice arrives on a commercial fit-out with their own personal 230 V combi
                drill and plugs it into a 230 V site socket they&apos;ve found. Site agent walks
                past, spots the blue plug on a tool that should be yellow, and pulls the apprentice
                off the job for the day. Firm has to pay them out for the lost shift, the
                apprentice has to explain to their tutor, and the firm&apos;s relationship with
                the principal contractor takes a hit.
              </>
            }
            doInstead={
              <>
                Site = 110 V (yellow CEEform) or cordless. 230 V (blue plug) belongs in finished
                buildings and the workshop. If the firm&apos;s van loadout is wrong for the site
                you&apos;re going to, raise it with the supervisor BEFORE you arrive &mdash;
                that&apos;s a HASAWA s.7 co-operation duty as well as a practical
                don&apos;t-look-stupid move. Most firms keep a 110 V site box for any site work
                and a 230 V box for finished-property second-fix.
              </>
            }
          />

          <Scenario
            title="First-fix in a house extension &mdash; SDS or combi for the joist holes?"
            situation={
              <>
                You&apos;re second-month into your apprenticeship on a house extension. The
                supervisor needs to run 2.5 mm&sup2; T+E from the kitchen consumer unit out
                through three softwood joists in the new extension to a series of socket positions
                on the far wall. Each joist needs a 25 mm hole for the cable to pass through. You
                have a Makita SDS-Plus loaded with a 25 mm masonry bit (just used on the chimney
                breast outside) and a Makita 18 V combi drill with a 25 mm spade bit and a 25 mm
                Forstner bit on the bench. Which do you reach for, and why does it matter?
              </>
            }
            whatToDo={
              <>
                Combi drill, every time. Joists are softwood; SDS is for masonry. The 25 mm
                Forstner bit gives the cleanest hole (centre point, flat-bottomed cut) which is
                ideal for cable that may sit in the hole long-term. The 25 mm spade bit is faster
                but rougher. SDS on timber tears the joist, weakens the structural member, and
                kicks back into your wrist. Five seconds of forethought saves the joist, your
                wrist, and the supervisor having to explain to the customer why a sister joist is
                now needed.
              </>
            }
            whyItMatters={
              <>
                Substrate-led tool selection is the single biggest correction supervisors make to
                first-month apprentices. Power tools are designed around specific materials &mdash;
                use them the wrong way and you damage the tool, the workpiece or yourself. PUWER
                Reg 4 makes &quot;right tool for the substrate&quot; a legal duty, and the fastest
                way to demonstrate competence on a job is to walk to the van for the right tool
                rather than make the wrong one work.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Power tools split into five families — drilling, cutting, grinding, heat, specialist. Pick the tool by what you're working ON (substrate), not by what's nearest.",
              "Drilling — combi for timber and light fixings, SDS-Plus for regular masonry, SDS-Max for coring and heavy concrete. Putting the wrong tool on the wrong substrate damages the tool and the workpiece.",
              "Cutting — recip for rough access, jigsaw for controlled curves, multi-tool for confined precise cuts, angle grinder for metal. Each is blade-led; pick the blade first.",
              "Construction sites use 110 V CTE supply (centre-tapped earthed) — voltage to earth is 55 V, dramatically reducing shock risk. Yellow BS EN 60309-2 plug is the visual signal. 230 V tools belong in finished buildings; cordless is the third option.",
              "Cordless platforms are commercial ecosystems — Makita LXT, DeWalt XR, Milwaukee M18, Bosch Professional. Match the firm's platform; cross-platform mixing means doubling chargers and managing two sets of batteries.",
              "PUWER 1998 binds power-tool use through three regs — Reg 4 (right tool for the job), Reg 5 (maintained — Sub 1.3), Reg 9 (operatives trained before use).",
              "Angle grinder = highest-risk power tool an electrician uses. Full PPE (eye + face + ears + gloves), correct disc, fitted guard, formal training before first use under Reg 9.",
              "Heat guns for shrink-wrap; gas torches rare in pure electrical work. Specialist tools (impact wrench, hydraulic crimper, rotary stripper) earn their place for one specific job each.",
            ]}
          />

          <Quiz title="Power tools knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Hand tools
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Tool safety checks
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
