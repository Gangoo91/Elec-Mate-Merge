/**
 * Module 4 · Section 5 · Subsection 3 — Restoring building fabric and finishes
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.3 (partial)
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.5 — methods for restoring the
 * condition of building fabric.
 *
 * Frame: when the rectification has involved disturbance to plaster, brick,
 * tile, joist, ceiling, flooring — what's the L3 apprentice's responsibility
 * for restoration vs the customer's, and what techniques apply.
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
  'Restoring building fabric (5.3) | Level 3 Module 4.5.3 | Elec-Mate';
const DESCRIPTION =
  'When fault rectification has disturbed plaster / brick / tile / joist / ceiling / flooring — the L3 apprentice responsibility, the techniques, the customer brief and the trade boundaries with plasterer / decorator / tiler.';

const checks = [
  {
    id: 'mod4-s5-sub3-scope',
    question:
      "What's the typical electrician's scope for building-fabric restoration after fault rectification?",
    options: [
      "Full restoration of every surface disturbed — re-plaster, re-tile, re-paint and re-floor as standard. The electrician is responsible for returning the property to exactly the decorative state it was in before the work, so a fault repair always includes the finishing trades within the original quote.",
      "Make-good (always), basic patching of small areas (often), and full restoration as a separate specialist trade.",
      "No restoration at all — the electrician's scope ends when the circuit is safe. Holes, exposed cable and removed accessories are the customer's problem to sort out with other trades, so you leave the work area as it is once the electrical job is finished.",
      "Only re-painting the affected area. Make-good means matching the paint so the wall looks untouched; filling chases, refitting accessories and fire-stopping are the builder's job, not the electrician's, so you simply paint over whatever was disturbed.",
    ],
    correctIndex: 1,
    explanation:
      "Three categories: make-good (close holes from chasing / drilling, refit accessories, no exposed cable or live parts — always the electrician's scope); basic patch (bond and skim small areas, 1–2 m² internal, patch small cable-entry holes — within apprentice scope under supervision, sometimes in the standard quote); and full restoration (re-plaster larger areas, re-tile, re-paint, re-floor — a separate trade). Customers often expect make-good as standard, basic patching as quoted, full restoration as separate, so the quote should be explicit about which is included.",
  },
  {
    id: 'mod4-s5-sub3-fire',
    question:
      "What's the special restoration requirement when a cable passes through a fire-rated wall or floor?",
    options: [
      "Fill the hole with ordinary bonding plaster to match the wall surface. Standard plaster restores the look of the wall and the cable is protected, so no special material is needed; the fire rating is the builder's concern, not the electrician's.",
      "Use expanding polyurethane foam around the cable. The foam fills the gap completely and sets hard, which seals the penetration neatly; it is the quickest way to make good a cable hole in any wall, fire-rated or not.",
      "Sleeve the cable in plastic conduit through the wall. The conduit protects the cable mechanically and the smooth bore looks tidy, so conduit through the penetration is the correct restoration; nothing further is required at a fire-rated wall.",
      "Fire-stop the penetration with intumescent material that maintains the wall's or floor's fire rating.",
    ],
    correctIndex: 3,
    explanation:
      "BS 7671 527.2 plus Building Regs Approved Document B require fire-stopping at a fire-rated penetration. The hole around the cable is sealed with intumescent material that maintains the element's fire rating (typically 60 minutes for compartment walls, 30 minutes for protected escape routes) using products such as Promat PROMASEAL, Hilti CP series or FireFly collars. The electrician fits it; the responsible person under RR(FS)O 2005 needs to know it's done. Skipping it creates a fire-spread path that defeats compartmentation and is a Code 1 finding on EICR. Document on the job sheet.",
  },
  {
    id: 'mod4-s5-sub3-handback',
    question:
      "How should you brief the customer on the restoration scope at the start of the work?",
    options: [
      "Say nothing about restoration until the work is finished. Raising it at the start only worries the customer, so you do the electrical work, make good as best you can, and explain any unfinished surfaces afterwards if they ask.",
      "Promise the customer the property will look exactly as it did before. Reassure them that whatever is disturbed will be fully restored as part of the job, so they have nothing to arrange; managing expectations downward only loses the work.",
      "Cover what's included, what's not, and who to use for the work outside the electrician's scope.",
      "Tell the customer it is entirely their responsibility to repair any damage. Make clear at the outset that the electrician fills nothing and refits nothing, so they should have a builder on standby; the electrical scope stops at the live conductors.",
    ],
    correctIndex: 2,
    explanation:
      "Brief three points upfront: what's included (make-good — no holes, no exposed cable, accessories refitted — plus basic patching if your firm includes it); what's not included (be explicit about what needs a separate trade); and who to use (recommend a plasterer / decorator / tiler — referrals are good business). Most 'unfinished work' disputes come from unclear scope at the start, so the brief at quote stage plus visual confirmation at the end manages expectations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's a 'make-good' standard for an electrician after rectifying a fault that involved chasing a wall?",
    options: [
      "Make-good means returning the wall to a fully painted, decorated finish indistinguishable from before. The electrician re-plasters the chase, sands it smooth, primes and paints to match the existing colour, so the customer sees no sign the wall was ever opened.",
      "No holes (filled flush), no exposed cable, and no exposed live parts — finished to fill stage, not decorated.",
      "Make-good means leaving the chase open so the next trade can see exactly where the cable runs. The electrician clips the cable into the open chase and leaves it visible; filling it would hide the route, so the chase is left exposed for the plasterer to fill.",
      "Make-good means taping over the chase with insulating tape. Covering the cable and the open chase with tape protects it temporarily and signals the customer to arrange finishing; filling with plaster is the customer's responsibility, not the electrician's.",
    ],
    correctAnswer: 1,
    explanation:
      "Three deliverables: no holes (chases and drilled holes filled flush with bonding compound — Knauf Bonding, Thistle Bonding); no exposed cable (clipped, secured, sleeved where appropriate); and no exposed live parts (accessory plates fitted, blanking plates on unused boxes, fire-stops on penetrations). Make-good is the electrician's; full re-skim and re-paint are the plasterer's / decorator's. The boundary is 'safe and finished to fill stage' — beyond that needs other trades. Leaving exposed cable or unfilled chases isn't make-good, it's incomplete work.",
  },
  {
    id: 2,
    question: "When chasing has been required to access a fault, what's the trade convention for cable depth and protection?",
    options: [
      "There is no rule on depth or zones for buried cable. As long as the chase is filled and the wall looks tidy, the cable can run anywhere by the most direct route; safe zones and mechanical protection apply only to surface-mounted cable, not to cable in a chase.",
      "Cables in chases must always be run horizontally across the wall at mid-height, never vertically. The horizontal route keeps them clear of where people drill, so a diagonal or vertical run from a socket is non-compliant; depth and protection do not matter once the cable is horizontal.",
      "Cables within 50 mm of the surface must be in a safe zone or mechanically protected; capping or conduit over chased cable.",
      "All buried cables must be run in steel conduit regardless of depth or position. Steel conduit is the only acceptable protection for a chased cable, so every chase, however shallow or deep, requires a full conduit run before plastering; capping and safe zones are not permitted.",
    ],
    correctAnswer: 2,
    explanation:
      "BS 7671 522.6 plus Approved Document B / Part P require: cables within 50 mm of the surface in a safe zone (above socket level, vertical from socket / switch, within 150 mm of a ceiling / wall edge) OR mechanically protected (steel conduit, capping / channel, RCD-protected supply); cables below 50 mm depth have no zone restriction; and cables in plastered chases need capping (PVC channel) over them before plastering or steel conduit. Depth and protection are inspected at EICR, with non-compliance typically a Code 2. The customer doesn't need the detail but should be reassured 'all cables are protected to current standards'.",
  },
  {
    id: 3,
    question: "What's the L3 apprentice's role when a fault rectification damages a customer's tiles?",
    options: [
      "Re-tile the area yourself before leaving. The electrician is responsible for returning the wall to its finished state, so you cut and fit replacement tiles, mix adhesive and grout, and leave the wall looking untouched; calling in a tiler would be passing off your own responsibility.",
      "Ignore the damaged tiles entirely. Tiles are the customer's decorative finish and nothing to do with the electrical work, so you carry on, take payment and leave; the customer can decide what to do about the tiles in their own time.",
      "Glue the broken tiles back with silicone sealant. A bead of sealant holds the cracked pieces in place and hides the break, which restores the look of the wall quickly; proper re-tiling is unnecessary once the pieces are stuck back.",
      "Minimise the damage, make the area safe, and brief the customer with a tiler recommendation.",
    ],
    correctAnswer: 3,
    explanation:
      "Three steps: minimise the damage (score around the tile carefully, remove only the affected tile(s), save intact ones for re-fit); make the area safe (no exposed substrate, no sharp edges, no water-ingress path); and brief the customer (explain which tiles were affected, recommend a tiler for re-fit, document on the job sheet). The electrician doesn't normally re-tile (a specialist trade with cutting tools, adhesives, grout) but is responsible for minimising damage and informing the customer. Photograph pre-existing tile damage at the start to prevent disputes.",
  },
  {
    id: 4,
    question: "When you've cut into plasterboard to access a junction box, what's the right way to make-good?",
    options: [
      "Scale the repair to the hole — a maintenance-free access box for small holes, a patched and skimmed plasterboard repair for larger ones.",
      "Fill the hole with expanding foam regardless of size. The foam fills any cavity in seconds and sets rigid, so it is the universal make-good for plasterboard; cutting patches and skimming is slow and unnecessary when foam does the job.",
      "Leave the hole open and fit a blanking grille over it. An open hole with a vented cover lets the junction box breathe and stays accessible, so this is the correct make-good for any size of hole; sealing it would trap heat at the connection.",
      "Tape a sheet of cardboard over the hole. The cardboard keeps dust out and gives the customer's decorator a surface to plaster onto later, so it is sufficient make-good; the electrician does not fill plasterboard holes at all.",
    ],
    correctAnswer: 0,
    explanation:
      "Scale to the hole: small (≤50 mm) — fit a junction box with a screw-on lid that becomes the access point, so make-good is the box itself (future access without re-cutting); medium (50–200 mm) — patch with a plasterboard offcut on a backing batten, scrim tape, bond and skim flush, customer's painter finishes; large (>200 mm) — full plasterboard repair, scrim, bond, skim, customer's decorator finishes. Always leave the area swept and the dust contained (sheet over furniture, vacuum on completion). The apprentice does the basic patching; the painter / decorator finishes.",
  },
  {
    id: 5,
    question: "What's the trade boundary between an electrician and a builder / plasterer / tiler?",
    options: [
      "There is no boundary — a competent electrician is expected to plaster, tile, paint and carry out structural building work to a professional finish. The electrician simply does all the restoration trades themselves, so referring to a plasterer or tiler is never necessary.",
      "Electrician does electrical work plus make-good; plasterer, tiler, decorator and builder each handle their own finishing or structural scope.",
      "The boundary is purely about who is on site that day. Whoever is present does whatever needs doing, so if the electrician is the only trade on site they take on the plastering and tiling; the split between trades is a matter of availability, not competence or insurance.",
      "The electrician does everything except painting. Filling, plastering, tiling and even minor structural work all fall to the electrician as part of make-good; only the final coat of paint is left to a decorator, because paint colour is a customer choice.",
    ],
    correctAnswer: 1,
    explanation:
      "Five trades, five scopes: electrician (electrical work plus make-good — filling, sealing, fire-stopping); plasterer (prep, scrim, bond, skim of larger areas, finishing surface); tiler (cutting, adhesive, fitting, grouting); painter / decorator (prep, primer, top-coat, decorative finishes); builder (structural / load-bearing, brick / block / concrete repair). The boundaries exist for competence (each trade has its own training and tools) and professional indemnity (each carries cover for its own work). The apprentice does electrical plus minimal building-fabric restoration and refers specialist trades for finishing.",
  },
  {
    id: 6,
    question: "What additional materials should an L3 apprentice carry for routine make-good work?",
    options: [
      "None — the electrician should never carry filling materials. Make-good is always a separate trade's job, so the van should hold only electrical parts; bringing plaster or filler blurs the trade boundary and is not the electrician's role.",
      "Only a tub of multi-purpose decorator's caulk. Caulk fills every gap, chase and hole and paints over neatly, so a single tube covers all make-good needs; carrying plaster, scrim and fire-stop is overkill for an electrician.",
      "Bonding plaster, filler, plasterboard offcuts, scrim tape, fire-stop sealant and touch-up paint.",
      "Just a roll of insulating tape and some expanding foam. Tape covers exposed cable and foam fills any hole, so those two items handle all make-good; bonding plaster, scrim and fire-stop are specialist materials the electrician does not need.",
    ],
    correctAnswer: 2,
    explanation:
      "Six standard items: bonding plaster (Knauf or Thistle Bonding, 5 kg, for small chases); filler (Polycell, Tetrion, for very small and screw holes); plasterboard offcuts (for patching holes); scrim tape (for plasterboard joins); fire-stop sealant (FireFly, Hilti CP series, for fire-rated penetrations); and touch-up paint (small tin of white emulsion, or customer-supplied, for minor finishing). The kit costs £40–60 and lasts months. Carrying it means completing the make-good on-site rather than leaving the customer with unfilled holes.",
  },
  {
    id: 7,
    question: "What's the right way to document building-fabric damage / restoration on the job sheet?",
    options: [
      "Don't document fabric damage at all — only electrical readings belong on the job sheet. Plaster, tiles and surfaces are nothing to do with the electrical work, so recording them clutters the record; if a dispute arises it is the customer's word against yours either way.",
      "Just write 'made good' on the job sheet. A single note that the work area was made good covers everything, so there is no need for photographs or a breakdown of what was disturbed; the customer can see the result for themselves.",
      "Only photograph the finished result. A photo of the completed make-good proves the work was done well, which is all that matters; pre-existing damage does not need recording because the after photo shows the area is tidy.",
      "Photograph pre-existing damage, record the fabric disturbed, and record the restoration done and what's outstanding.",
    ],
    correctAnswer: 3,
    explanation:
      "Three sections: pre-work (photograph any pre-existing damage to walls / floors / tiles / surfaces near the work area — protects against 'you damaged that' claims); work scope (what fabric was disturbed — chasing, drilling, plasterboard cutting, tile removal); and restoration (what make-good was done, what's outstanding for other trades, the customer's acknowledgment). A five-second arrival photo attached to the job sheet settles 90% of damage disputes, and the restoration record closes the loop with the customer.",
  },
  {
    id: 8,
    question: "When should you use intumescent / fire-resistant materials in restoration?",
    options: [
      "Whenever a cable, conduit or fitting penetrates a fire-rated wall or floor, sealing to match the element's rating.",
      "On every hole you fill, fire-rated or not. Intumescent sealant is the best general-purpose filler because it expands and bonds well, so using it everywhere guarantees a neat make-good and saves carrying ordinary plaster.",
      "Only on outdoor cable penetrations. Intumescent products are weatherproof, so they are used where a cable passes through an external wall to keep water out; internal fire-rated walls are sealed with ordinary plaster.",
      "Never — intumescent materials are specialist products only a fire-stopping contractor may fit. The electrician fills the cable hole with normal plaster and leaves any fire-rating concerns to a separate fire-stopping firm; using intumescent sealant yourself is outside the electrical trade.",
    ],
    correctAnswer: 0,
    explanation:
      "Use them wherever a cable, conduit or fitting penetrates a fire-rated wall or floor — party walls between dwellings, compartment walls in HMOs / commercial buildings, floors between flats, ducts and risers, protected escape stairwells. Products: intumescent sealant (Hilti CP 606, Promat PROMASEAL), fire-rated batts (Rockwool Firepro), fire collars on conduit / pipe. The seal must match or exceed the element rating (typically 30 / 60 / 90 / 120 minutes). BS 7671 527.2 plus Approved Document B plus RR(FS)O 2005 make this non-negotiable; intumescent products expand under heat to seal the penetration. Document on the job sheet and the building's fire-safety log.",
  },
];

const faqs = [
  {
    question: "Does my firm's quote include make-good or do I need to bill separately?",
    answer:
      "Depends on the firm's standard practice and the size of the make-good. Most firms include basic make-good (filling small holes, refitting accessories, fire-stopping) in the labour price. Larger restoration (full plasterboard patching, multi-tile re-fit, re-painting) is usually a separate line item or a separate trade's work. The L3 apprentice's quote should be explicit about scope; ambiguity leads to dispute.",
  },
  {
    question: "What's the customer's right to expect a 'finished' job?",
    answer:
      "The customer is entitled to a SAFE and FUNCTIONAL job. They are entitled to make-good (no holes, no exposed cable, accessories refitted, fire-stopping). They are NOT entitled to full decorative finish (re-plastering, re-painting, re-tiling) unless that was explicitly quoted. The Consumer Rights Act 2015 governs — services must be 'performed with reasonable care and skill'. Make-good is part of reasonable workmanship; decorative finish is not, unless agreed.",
  },
  {
    question: "What about cable runs in chased walls — what depth do I need to chase?",
    answer:
      "BS 7671 522.6.202 + Approved Document A: cable in chase must be deep enough that the chase doesn't compromise the wall's structural integrity. Standard practice: chase no deeper than 1/3 of wall thickness on internal walls; no deeper than 1/6 on load-bearing external walls. Horizontal chases limited in length (usually no more than 1/4 of the wall length). For modern installations, chases are usually 25–35 mm deep on a 100 mm internal wall — well within the limit. Capping / channel over the cable before plastering is the standard protection.",
  },
  {
    question: "What if the customer wants me to do the full restoration to save them calling a plasterer?",
    answer:
      "Consider whether you have the competence and time. If you've done basic plastering training and the area is small (1–2 m²), it can be a value-add to the customer. Charge appropriately for the additional work. If the area is larger or the finish needs to match an existing decorative scheme, refer to a plasterer / decorator — better to do less work to a high standard than more work badly. Document the scope agreement clearly.",
  },
  {
    question: "How do I handle damage to expensive finishes (marble worktops, hardwood floors, parquet)?",
    answer:
      "Avoid creating the damage where possible — protect the surfaces with dust sheets, hardboard, or floor protection film before starting work. If damage occurs despite precautions, document immediately (photo, job sheet entry), brief the customer, and discuss restoration options. The firm's professional indemnity insurance typically covers accidental damage to customer property; check the policy's excess and notification requirements. For very expensive finishes, the right approach is to sub-contract the floor / surface protection to a specialist (e.g. floor sanders for hardwood floor patches).",
  },
  {
    question: "What's 'fire-stopping' specifically and how do I do it?",
    answer:
      "Fire-stopping = sealing penetrations through fire-rated walls / floors with intumescent materials that maintain the fire rating. For a single cable through a plasterboard wall: clean the hole; apply intumescent sealant (Hilti CP 606, Promat PROMASEAL) around the cable, filling the gap; allow to cure. For a cable bundle or larger penetration: use a fire-rated batt (Rockwool Firepro) cut to fit, with intumescent sealant around the edges. For conduit penetrations: fire-rated collars (Promat). The sealant / collar maintains the wall's fire rating (typically 60 minutes for compartment walls). Document on job sheet AND fire-safety log if applicable.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 3"
            title="Restoring building fabric"
            description="When fault rectification has disturbed plaster / brick / tile / joist / ceiling / flooring — the L3 apprentice scope, the techniques, the customer brief on scope boundaries, and the trade coordination with plasterer / decorator / tiler / builder."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three categories: make-good (always electrician), basic patch (often electrician), full restoration (separate trade). Scope clarity in the quote prevents disputes.",
              "Fire-stopping at compartment-wall penetrations is non-negotiable. BS 7671 527.2 + Building Regs Approved Document B + RR(FS)O 2005 require intumescent sealing.",
              "Photograph pre-existing damage at start of work. Five-second mobile photo prevents 90% of 'you damaged that' disputes.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish make-good (electrician scope) from full restoration (specialist trade) and brief the customer accordingly.",
              "Apply BS 7671 522.6 cable depth and safe-zone requirements for cables in chased walls.",
              "Apply fire-stopping at cable penetrations through fire-rated walls / floors using intumescent materials (Hilti CP 606, Promat PROMASEAL).",
              "Carry the standard make-good kit — bonding, filler, plasterboard offcuts, scrim tape, fire-stop sealant, touch-up paint.",
              "Document pre-existing damage and restoration work on the job sheet to manage customer expectations and disputes.",
              "Recognise trade boundaries between electrician, plasterer, tiler, decorator, and builder; refer specialist trades when needed.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Make-good vs full restoration</ContentEyebrow>

          <ConceptBlock
            title="Three scope categories — clarify which apply"
            plainEnglish="The customer expects the work to be 'finished'. The trade's definition of finished varies. Make-good (no holes, no exposed cable, fire-stopping) is always the electrician's responsibility. Full restoration (re-plaster, re-paint, re-tile) is a separate trade. Quote upfront which applies."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MAKE-GOOD</strong> — close holes left by chasing / drilling, refit accessories, ensure no exposed cable / live parts, fire-stop penetrations. Always electrician's scope.</li>
              <li><strong>BASIC PATCH</strong> — bond and skim small areas (1–2 m² internal), patch small plasterboard holes. Within scope at apprentice level under supervision; some firms include in standard quote.</li>
              <li><strong>FULL RESTORATION</strong> — re-plaster larger areas, re-tile, re-paint, re-floor. Separate trade (plasterer, decorator, tiler).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 527.2 (Sealing of penetrations)"
            clause={<>"Where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire resistance prescribed for the respective element of building construction (if any)."</>}
            meaning={<>Reg 527.2 requires fire-stopping at any penetration of a fire-rated element. For domestic work — compartment walls (party walls between dwellings), floors between flats, fire-rated ceilings. For commercial — much broader. The intumescent sealing is the responsibility of the operative who created the penetration; the L3 apprentice fits it as part of make-good.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 527.2."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Cable burial and safe zones</ContentEyebrow>

          <ConceptBlock
            title="BS 7671 522.6 + Approved Document B"
            onSite="Cables in chased walls within 50 mm of the surface must be in a \'safe zone' OR mechanically protected. The L3 apprentice ensures cables run in safe zones (above socket level, vertical from sockets / switches, near edges) with capping / channel protection over the cable before plastering."
          >
            <p>Safe zones (cables &lt; 50 mm depth):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vertical zones from sockets / switches.</li>
              <li>Horizontal zones above accessory level.</li>
              <li>Zones within 150 mm of ceiling / wall edge.</li>
            </ul>
            <p>Outside safe zones (≤ 50 mm depth) requires mechanical protection: steel conduit, capping / channel before plastering, OR RCD protection (30 mA on the supply).</p>
            <p>Cables &gt; 50 mm depth — no zone restriction (already protected by depth).</p>
            <p>Chase depth: no more than 1/3 of wall thickness on internal walls; no more than 1/6 on load-bearing external walls. Horizontal chases limited to about 1/4 of wall length.</p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire-stopping at penetrations</ContentEyebrow>

          <ConceptBlock
            title="Intumescent materials at compartment penetrations"
            plainEnglish="Fire-stopping seals cable / conduit / fitting penetrations through fire-rated walls and floors with intumescent materials. The sealant maintains the fire rating of the element — fire / smoke can't spread through the cable hole. Without it, the building\'s compartmentation strategy is defeated."
          >
            <p>Standard fire-stopping products:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hilti CP 606 / CP 611A</strong> — intumescent sealant cartridge for cable penetrations through plasterboard / brick / block.</li>
              <li><strong>Promat PROMASEAL</strong> — intumescent sealant range for various penetration sizes.</li>
              <li><strong>Rockwool Firepro</strong> — fire-rated batts for larger penetrations and risers.</li>
              <li><strong>Promat fire collars</strong> — for conduit / PVC pipe penetrations.</li>
              <li><strong>FireFly intumescent</strong> — UK trade standard for general-purpose fire-stopping.</li>
            </ul>
            <p>
              Standard locations requiring fire-stopping: party walls between dwellings; compartment walls in HMOs / commercial; floors between flats; ducts and risers; protected escape stairwells. The fire rating of the seal must match the element rating (typically 60 minutes for compartment walls).
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Customer brief on restoration scope</ContentEyebrow>

          <ConceptBlock
            title="Three-point upfront brief prevents post-work dispute"
            onSite="Most disputes about \'unfinished work' come from unclear scope at the start. The clear brief at quote stage + the visual confirmation at the end manages expectations."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WHAT\'S INCLUDED</strong> — make-good (no holes, no exposed cable, accessories refitted, fire-stopping). Basic patching of small areas if your firm includes this.</li>
              <li><strong>WHAT\'S NOT INCLUDED</strong> — full restoration (re-plaster / re-paint / re-tile / re-floor). The customer needs a separate trade.</li>
              <li><strong>WHO TO USE</strong> — recommend a plasterer / decorator / tiler if the customer needs one. Referrals are good business; the customer appreciates the help; the recommended trade may return the favour.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Hidden cable identification for the next sparks</ContentEyebrow>

          <ConceptBlock
            title="Mark the route, document the depth, save the next visit"
            plainEnglish="Cables you bury today are someone else's investigation tomorrow. The L3 expectation is to leave enough breadcrumbs that a future fault-finder can trace the route without opening a wall."
            onSite="Photograph the cable run before plastering or boarding back up. Mark depth and route on a simple sketch on the job sheet, with reference points (joist counts from a fixed corner, distances from a window head). Where the cable doesn&apos;t sit in a prescribed zone, document the alternative compliance route (RCD plus zone, earthed metallic covering, conduit) so the next sparks can verify it instead of reopening the wall."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Photo before close-up</strong> &mdash; phone camera, route visible, reference object in frame for scale.</li>
              <li><strong>Sketch on job sheet</strong> &mdash; rough plan, distances, depth, prescribed zone or 522.6.204 alternative used.</li>
              <li><strong>Schedule of circuits update</strong> &mdash; if the repair changed circuit layout, update the CU schedule before you leave.</li>
              <li><strong>Customer copy</strong> &mdash; give the customer the photo and sketch alongside the certificate. They keep them with the property file.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 522.6.202"
            clause={
              <>
                "A cable installed in a wall or partition shall comply with the requirements set out in Table 52.1: (a) be installed in a prescribed zone; and (b) be provided with additional protection by means of an RCD having the characteristics specified in Regulation 415.1.1; or (c) comply with Regulation 522.6.204."
              </>
            }
            meaning={
              <>
                When you re-route a cable during fault correction, it has to land in a prescribed zone OR be RCD-protected to 415.1.1 OR carry a 522.6.204-compliant covering. There is no &ldquo;buried straight across the middle of the wall and hoped for the best&rdquo; option in BS 7671.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 522.6.202 / Table 52.1, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 514.1.2"
            clause={
              <>
                "So far as is reasonably practicable, wiring shall be so arranged or marked that it can be identified for inspection, testing, repair or alteration of the installation."
              </>
            }
            meaning={
              <>
                The duty to leave wiring identifiable applies on every repair, not just first install. Updating the CU schedule, leaving a sketch, photographing the route &mdash; that&apos;s how you discharge 514.1.2 on a fault-correction visit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 514.1.2, verbatim."
          />

          <ConceptBlock
            title="Make-good kit on the van — what to carry as standard"
            plainEnglish="A repair that ends with a tidy patched wall feels like a finished job; one that ends with a hole feels half-done. The standard make-good kit on a typical UK van is small, cheap and saves the return visit. Filler, scrim tape, plasterboard offcuts, fire-stop sealant, touch-up paint and a small trowel handle the vast majority of domestic patches in 20-30 minutes."
            onSite="Build the kit once, replenish weekly. Bonding plaster (Thistle Bonding) for deeper patches, finishing plaster (Multi-Finish) for the skim coat, easy-fill (Polyfilla) for small holes, intumescent sealant (Hilti CP 606 or similar) for cable penetrations through compartment walls, scrim tape for joints, plasterboard offcuts in 12.5 mm and 15 mm. A small artist's brush plus a tin of trade emulsion in white covers most touch-ups. The kit fits in a single tote tray on the van."
          >
            <p>
              Standard van make-good kit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Filler</strong> — bonding plaster bag, multi-finish bag,
                ready-mix small tub, easy-fill tube.
              </li>
              <li>
                <strong>Plasterboard offcuts</strong> — 12.5 mm and 15 mm in
                manageable sizes; useful for cutting custom patches over old
                back boxes.
              </li>
              <li>
                <strong>Fire-stop sealant</strong> — Hilti CP 606 or
                equivalent intumescent acrylic; cartridge gun.
              </li>
              <li>
                <strong>Scrim tape and joint compound</strong> — for
                taping plasterboard joints flush.
              </li>
              <li>
                <strong>Touch-up paint</strong> — small tin of trade white
                emulsion plus a fine brush; covers patch repair after the
                filler has dried and been sanded.
              </li>
              <li>
                <strong>Tools</strong> — small trowel, sanding block, dust
                sheet, masking tape, measuring stick.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Photographing pre-existing damage — the dispute prevention habit"
            plainEnglish="Customers occasionally claim that damage to a wall, ceiling or finish was caused by the rectification work when in fact it was already there. The single most effective defence against this is a 30-second mobile photo at the start of the visit. Wide shot of the work area, close shots of any pre-existing scuff, crack or stain, time-stamped on the camera roll. Five seconds per photo, lives in the job record alongside the certificate."
            onSite="Make the photos a habit, not an afterthought. Walk the work area when the customer first lets you in — phone out, half a dozen photos, reference shots of the consumer unit, the room you'll be working in, the floor or carpet, any visible existing damage. The customer sees you doing it and notes the professionalism. If a dispute arises later, the photo is conclusive. Most disputes never reach that point because the photos exist and the customer knows."
          >
            <p>
              Standard pre-work photo set:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wide of the work area</strong> — orientation shot.
              </li>
              <li>
                <strong>Wide of the consumer unit</strong> — board face plus
                surrounding wall.
              </li>
              <li>
                <strong>Close of any pre-existing damage</strong> — scuff,
                crack, stain, hole, paint mismatch.
              </li>
              <li>
                <strong>Floor / carpet condition</strong> — particularly if work
                involves drilling overhead or pulling cable through ceiling
                voids.
              </li>
              <li>
                <strong>Customer's adjacent items</strong> — anything
                breakable, valuable or specifically positioned by the customer.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When to refer to a specialist trade — and how to do it well"
            plainEnglish="The electrician's make-good covers basic patching. Restoration of a tiled wall, an ornate plaster cornice, a polished hardwood floor, a wallpapered feature wall — those need the relevant specialist trade. The L3 apprentice's job is to recognise the boundary, brief the customer at the start of the visit, and where possible recommend a trusted local trade. Done well, the multi-trade handover feels coordinated; done badly, it leaves the customer feeling abandoned with an unfinished room."
            onSite="At the upfront brief, name the boundary explicitly. 'I'll do the electrical work and the basic patching of the wall. The wallpaper match needs a decorator — I can recommend a local one if you don't have one.' Most customers understand and appreciate the honesty. Keep a short list of trusted local trades for the office to share — tilers, decorators, joiners, plasterers, carpet fitters. The L3 apprentice does not personally arrange the third-party visit but does provide the contact and the context."
          >
            <p>
              Common specialist-trade handover patterns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tiler</strong> — for tile removal, cutting, re-fit,
                grout match.
              </li>
              <li>
                <strong>Decorator</strong> — for wallpaper match, paint
                large-area finish, high-end finish work.
              </li>
              <li>
                <strong>Plasterer</strong> — for ornate cornice, ceiling rose,
                large-area skim coat, lime plaster on heritage properties.
              </li>
              <li>
                <strong>Carpet fitter</strong> — for carpet pulled back to
                access floorboards.
              </li>
              <li>
                <strong>Joiner</strong> — for skirting, architrave, door frame
                damage.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping fire-stopping because 'it\'s only domestic\'"
            whatHappens={<>Apprentice runs a new cable through a party wall between two terraced houses. Doesn\'t fit fire-stop because \'it\'s only domestic\'. Eight months later there\'s a fire in next door\'s lounge; smoke and flames travel through the unsealed cable hole into the customer\'s loft, igniting stored materials. Fire damage to the customer\'s property; insurance investigation finds the unsealed penetration; the firm is liable for failing to fit fire-stop required by BS 7671 527.2 + Approved Document B.</>}
            doInstead={<>Always fire-stop penetrations through compartment walls / floors. The Hilti CP 606 cartridge is £15 and takes 2 minutes to apply. Cheap insurance against a fire-spread incident. Document the fire-stopping on the job sheet AND on the building\'s fire-safety log if applicable.</>}
          />

          <CommonMistake
            title="Leaving make-good \'for the customer to sort out\'"
            whatHappens={<>Apprentice completes electrical rectification work, leaves a 200 mm hole in the kitchen wall where they accessed a junction box. Customer is shocked — they thought the work would include making the wall good. Customer complaint to the firm; firm has to send the apprentice back to patch the hole; customer charged again or work done at firm\'s cost. Either way, customer is unhappy; firm\'s reputation suffers. The 30-minute patch at the end of the original visit would have prevented the comeback.</>}
            doInstead={<>Make-good is the electrician\'s responsibility. Carry the kit; do the make-good before leaving. The 30-minute investment at the end of the job is part of the work, not optional polish.</>}
          />

          <Scenario
            title="Fault rectification requires chasing through a tiled bathroom wall"
            situation={<>Investigation reveals an HRJ in the bathroom lighting circuit at a hidden junction box behind the tiled wall. To access, you need to remove 2–3 tiles, chase the cable, fit the junction box, and restore.</>}
            whatToDo={<>(1) Brief the customer BEFORE work — explain the access requirement, the tile removal, the restoration scope: \'I\'ll need to remove 2–3 tiles to access the junction box. I\'ll do the electrical work and the make-good (chase, cable, junction box, fire-stop, basic plaster fill). The tiles need to be re-fit by a specialist tiler — I can recommend one if you don\'t have one. The tiler may need 1–2 days lead time to source matching tiles if yours aren\'t in stock\'. (2) Get customer agreement to the scope and timing. (3) Photograph the area before work (insurance / dispute protection). (4) Score around the affected tiles carefully (Bahco BK60 tile cutter or similar); remove tiles intact where possible; save them for re-fit. (5) Chase the wall to access the junction box; fit / replace the junction box; restore cable; fire-stop the chase; bond and skim flush. (6) Hand back to customer with: tiles set aside; surface ready for tiler; junction box accessible; certificate documenting the work. (7) Recommend tiler contact details; customer arranges tile re-fit.</>}
            whyItMatters={<>The structured approach manages the multi-trade nature of the work. Customer knows what to expect; the electrician\'s scope is clear; the tiler\'s role is identified; the documentation supports both trades. Without the upfront brief, the customer would be shocked at \'unfinished' work; with it, they\'re a partner in the multi-trade coordination.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three categories: make-good (electrician scope), basic patch (often electrician), full restoration (specialist trade). Quote upfront which applies.",
              "Make-good standard: no holes, no exposed cable, accessories refitted, fire-stops fitted, surface filled flush.",
              "Fire-stopping at compartment-wall penetrations is non-negotiable. BS 7671 527.2 + Approved Document B + RR(FS)O 2005.",
              "Cable burial: BS 7671 522.6 safe zones (above accessory level, vertical from sockets, near edges) for cables &lt; 50 mm depth, OR mechanical protection.",
              "Standard make-good kit: bonding plaster, filler, plasterboard offcuts, scrim tape, fire-stop sealant, touch-up paint. £40–60 cost, lasts months.",
              "Document pre-existing damage at start of work — 5-second mobile photo prevents 90% of damage disputes.",
              "Trade boundaries: electrician = electrical + make-good; plasterer / tiler / decorator = finishing trades. Refer for specialist work.",
              "Customer brief on scope (what's included / not included / who to use) at the start of work prevents post-work disputes.",
            ]}
          />

          <Quiz title="Restoring building fabric — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.2 Verification + retesting</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.4 Safe disposal + leave area safe</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
