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
      "Full re-decoration.",
      "Three categories. (1) MAKE GOOD — close holes left by chasing / drilling, refit removed accessories, ensure no exposed cable / live parts. Always within the electrician's scope. (2) BASIC PATCH — bond and skim small areas of plaster (1–2 m² on internal walls), patch small cable entry holes. Within scope at apprentice level under supervision; some firms include in standard quote. (3) FULL RESTORATION — re-plaster larger areas, re-tile, re-paint, re-floor. Outside the electrician's scope; coordinated with plasterer / decorator / tiler. The customer often expects make-good as standard; basic patching as quoted; full restoration as separate.",
      "All restoration.",
      "None.",
    ],
    correctIndex: 1,
    explanation:
      "Scope clarity prevents disputes. The electrician's responsibility is normally make-good (functional / safety) plus basic patch (small areas). Full restoration is a separate trade. The customer's quote should be explicit about which is included.",
  },
  {
    id: 'mod4-s5-sub3-fire',
    question:
      "What's the special restoration requirement when a cable passes through a fire-rated wall or floor?",
    options: [
      "Just patch.",
      "BS 7671 527.2 + Building Regs Approved Document B require fire-stopping at the cable penetration. The hole around the cable must be sealed with intumescent material that maintains the fire rating of the wall / floor (typically 60 minutes for compartment walls, 30 minutes for protected escape routes). Standard products: Promat PROMASEAL, Hilti CP series, FireFly fire collars. The electrician fits the fire-stop; the customer's responsible person under RR(FS)O 2005 needs to know it's been done. Skipping fire-stopping creates a fire-spread path that defeats the building's compartmentation strategy. Code 1 (Danger Present) finding on EICR if not done.",
      "Just plaster.",
      "Nothing special.",
    ],
    correctIndex: 1,
    explanation:
      "Fire-stopping is a regulated requirement at compartment-wall penetrations. BS 7671 527.2 + Approved Document B + RR(FS)O 2005 all combine to make this non-negotiable. The L3 apprentice should know to fit fire-stop and document on the job sheet.",
  },
  {
    id: 'mod4-s5-sub3-handback',
    question:
      "How should you brief the customer on the restoration scope at the start of the work?",
    options: [
      "Don't brief.",
      "Three points. (1) WHAT'S INCLUDED — make-good (no holes, no exposed cable, accessories refitted) is part of the work. Basic patching of small areas (if your firm includes this) is part of the quote. Full restoration (re-plaster / re-tile / re-paint) is separate. (2) WHAT'S NOT INCLUDED — be explicit about what the customer will need a separate trade for. (3) WHO TO USE — recommend a plasterer / decorator / tiler if the customer needs one (referrals are good business). The brief upfront prevents the post-work dispute about 'why isn't the wall finished?'.",
      "Just leave.",
      "Just bill.",
    ],
    correctIndex: 1,
    explanation:
      "Customer briefing on restoration scope is part of the upfront work. Most disputes about 'unfinished work' come from unclear scope at the start. The clear brief at quote stage + the visual confirmation at the end manages expectations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's a 'make-good' standard for an electrician after rectifying a fault that involved chasing a wall?",
    options: [
      "Leave as is.",
      "Three deliverables. (1) NO HOLES — any chase or drilled hole is filled with bonding compound (Knauf bonding plaster, Thistle Bonding) to flush with the surrounding wall. (2) NO EXPOSED CABLE — any cable that was exposed during the work is properly clipped, secured, sleeved if appropriate. (3) NO LIVE PARTS exposed — accessory plates fitted, blanking plates on unused boxes, fire-stops on penetrations. Make-good is the electrician's responsibility; full re-skim and re-paint are the plasterer / decorator's. The boundary is 'safe and finished to fill stage' — beyond that needs other trades.",
      "Just neat.",
      "Just safe.",
    ],
    correctAnswer: 1,
    explanation:
      "Make-good is the electrician's professional standard. The work is done when the wall / ceiling / floor is safe AND filled to a state where the next trade (plasterer, decorator) can finish. Leaving exposed cable or unfilled chases isn't make-good; it's incomplete work.",
  },
  {
    id: 2,
    question: "When chasing has been required to access a fault, what's the trade convention for cable depth and protection?",
    options: [
      "Doesn't matter.",
      "BS 7671 522.6 + Approved Document B / Part P require: (1) Cables in walls within 50 mm of the surface must be in a 'safe zone' (above socket level, vertical from socket / switch position, within 150 mm of ceiling / wall edge) OR mechanically protected (steel conduit, capping / channel, RCD-protected supply). (2) Cables BELOW 50 mm depth — no zone restriction. (3) Cables in plastered chases — capping (PVC channel) over the cable before plastering OR steel conduit. The chase depth and the cable protection are inspected during EICR; non-compliance is Code 2 (Potentially Dangerous) typically.",
      "Just bury.",
      "Just clip.",
    ],
    correctAnswer: 1,
    explanation:
      "Cable burial requirements are detailed in BS 7671 522.6 and Approved Document B. The L3 apprentice ensures cables run in safe zones with appropriate protection; the customer doesn't need the technical detail but should be reassured 'all cables are protected per current standards'.",
  },
  {
    id: 3,
    question: "What's the L3 apprentice's role when a fault rectification damages a customer's tiles?",
    options: [
      "Replace them.",
      "Three steps. (1) MINIMISE the damage during the work — score around the tile carefully; remove only the affected tile(s); save them for re-fit if intact. (2) MAKE SAFE the tile area — no exposed substrate, no sharp edges, no water-ingress path. (3) BRIEF THE CUSTOMER — explain what tiles were affected; recommend a tiler for re-fit (referrals are good business); document the damage on the job sheet. The electrician doesn't normally re-tile (specialist trade with tile-cutting tools, adhesives, grout) but is responsible for minimising damage AND informing the customer.",
      "Walk away.",
      "Just patch.",
    ],
    correctAnswer: 1,
    explanation:
      "Tile damage during fault work is a real customer concern. Minimising damage + informing customer + recommending specialist trade is the L3 expectation. Pre-existing tile damage should be photographed and documented at the start of the work to prevent disputes.",
  },
  {
    id: 4,
    question: "When you've cut into plasterboard to access a junction box, what's the right way to make-good?",
    options: [
      "Just push back.",
      "Three options depending on hole size. (1) SMALL HOLE (≤50 mm) — fit a junction box with a screw-on lid that becomes the access point; 'make-good' is the box itself. Future access without re-cutting. (2) MEDIUM HOLE (50–200 mm) — patch with plasterboard offcut, screwed to a backing batten, scrim tape, bond and skim flush. Customer's painter finishes. (3) LARGE HOLE (&gt;200 mm) — full plasterboard repair, scrim, bond, skim, customer's painter / decorator. Always leave the area swept clean and the dust contained where possible (sheet over furniture, vacuum on completion).",
      "Plaster.",
      "Just paint.",
    ],
    correctAnswer: 1,
    explanation:
      "Plasterboard repair scales with hole size. The smallest holes can be turned into permanent access points (good practice for junction boxes that may need future inspection). Medium holes need patching; large holes need full repair. The L3 apprentice does the basic patching; the painter / decorator finishes.",
  },
  {
    id: 5,
    question: "What's the trade boundary between an electrician and a builder / plasterer / tiler?",
    options: [
      "All same.",
      "Five trades, five scopes. ELECTRICIAN — electrical work + make-good (filling, sealing, fire-stopping). PLASTERER — preparation, scrim, bond, skim of larger areas; finishing plaster surface. TILER — cutting, adhesive, fitting, grouting tiles; specialist tools. PAINTER / DECORATOR — preparation, primer, top-coat, decorative finishes. BUILDER — structural / load-bearing work; brick / block / concrete repair. Each trade has its competence boundary; the electrician's work is electrical + minimal building-fabric restoration. Specialist trades for finishing.",
      "All builder.",
      "All plasterer.",
    ],
    correctAnswer: 1,
    explanation:
      "Trade boundaries exist for competence reasons (each trade has specific training and tools) and for professional indemnity (each trade carries cover for their own work). The L3 apprentice's role is to do the electrical work + make-good, and recommend / refer specialist trades for finishing.",
  },
  {
    id: 6,
    question: "What additional materials should an L3 apprentice carry for routine make-good work?",
    options: [
      "None.",
      "Six standard items. (1) Bonding plaster (Knauf bonding or Thistle Bonding, 5 kg bag) — for filling small chases. (2) Filler (Polycell, Tetrion) — for very small holes and screw holes. (3) Plasterboard offcuts — for patching plasterboard holes. (4) Scrim tape — for plasterboard joins. (5) Fire-stop sealant (FireFly, Hilti CP series) — for cable penetrations through fire-rated walls. (6) Touch-up paint (white emulsion small tin, customer-supplied paint where possible) — for minor wall finishing where the customer is unlikely to repaint. Cost £40–60 for the kit; lasts months.",
      "Just bonding.",
      "None needed.",
    ],
    correctAnswer: 1,
    explanation:
      "The make-good kit is part of the L3 apprentice's van. Carrying the basics means you can complete the make-good on-site rather than leaving the customer with unfilled holes. Most experienced electricians carry this without thinking.",
  },
  {
    id: 7,
    question: "What's the right way to document building-fabric damage / restoration on the job sheet?",
    options: [
      "Don't.",
      "Three sections. (1) PRE-WORK — photographs of any pre-existing damage to walls / floors / tiles / surfaces near the work area. Protects against 'you damaged that' disputes. (2) WORK SCOPE — what fabric was disturbed during the work (chasing, drilling, plasterboard cutting, tile removal). (3) RESTORATION — what make-good was done, what's outstanding for other trades, customer's acknowledgment. The photographs + scope + restoration record protects the firm from misunderstandings about what was done vs what was pre-existing.",
      "Just verbal.",
      "Just bill.",
    ],
    correctAnswer: 1,
    explanation:
      "Documentation of pre-existing damage is the firm's defence. Five-second mobile photo of the work area at arrival, attached to the job sheet, settles 90% of damage disputes. The restoration record (what was done vs what's outstanding) closes the loop with the customer.",
  },
  {
    id: 8,
    question: "When should you use intumescent / fire-resistant materials in restoration?",
    options: [
      "Never.",
      "Whenever a cable / conduit / fitting penetrates a fire-rated wall or floor. Standard locations: party walls between dwellings; compartment walls in HMOs / commercial buildings; floors between flats; ducts and risers; protected escape stairwells. Fire-stopping products: intumescent sealant (Hilti CP 606, Promat PROMASEAL), fire-rated batts (Rockwool Firepro), fire collars on conduit / pipe penetrations. The fire rating of the seal must match or exceed the wall / floor rating (typically 30 / 60 / 90 / 120 minutes). Documented on the job sheet; updated on building's fire-safety log.",
      "Only outdoor.",
      "Random.",
    ],
    correctAnswer: 1,
    explanation:
      "Fire-stopping is a regulated requirement at compartment penetrations. BS 7671 527.2 + Approved Document B + RR(FS)O 2005 all combine to make this non-negotiable. Intumescent products expand under heat to seal the penetration; without them, fire / smoke spreads through the cable hole.",
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
