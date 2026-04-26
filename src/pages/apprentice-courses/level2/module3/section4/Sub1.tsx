/**
 * Module 3 · Section 4 · Sub 1 — Earthing systems
 * Maps to City & Guilds 2365-02 / Unit 203 / LO4 / AC 4.1
 *   AC 4.1 — "Identify different types of earthing systems"
 *
 * Frame: Five earthing arrangements you’ll meet on UK installations.
 * The DNO chose for you — your job is to recognise which one and respect it.
 * Covers TN-S, TN-C-S (PME), TN-C-S (PNB — A4:2026 update), TT and IT.
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
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earthing systems | Level 2 Module 3.4.1 | Elec-Mate';
const DESCRIPTION =
  'TN-S, TN-C-S (PME), TN-C-S (PNB), TT and IT — the five earthing arrangements you’ll meet at UK cut-outs and how to identify each one before you touch anything.';

const checks = [
  {
    id: 'm3-s4-sub1-identify-pme',
    question:
      'You lift the cover on a domestic cut-out. There’s a single combined earth/neutral arriving from the DNO, and the earth strap to the MET clamps onto the neutral block. Which earthing system is this?',
    options: ['TN-S', 'TN-C-S (PME)', 'TT', 'IT'],
    correctIndex: 1,
    explanation:
      'PEN (combined Protective Earth + Neutral) arriving from the DNO and split into N + PE at the consumer’s service position is the signature of TN-C-S, specifically the PME variant. It’s the most common arrangement on new UK domestic supplies.',
  },
  {
    id: 'm3-s4-sub1-tt-rcd',
    question:
      'A rural property has its own earth electrode driven into the ground next to the meter box. The DNO supply provides line and neutral only — no earth. Which protection is non-negotiable at the origin?',
    options: [
      'A 100 mA time-delayed RCD (or 30 mA) at origin — TT systems require RCD protection because Ze is too high to clear faults via overcurrent devices alone.',
      'Just an MCB main switch is fine.',
      'A surge protection device only.',
      'No special protection — TT is just like TN-C-S.',
    ],
    correctIndex: 0,
    explanation:
      'TT relies on a local earth electrode whose resistance is typically in the tens or even hundreds of ohms — far too high for an MCB to ever see fault current high enough to trip in 0.4 s. RCD protection at origin (often 100 mA S-type upstream of 30 mA RCDs/RCBOs on final circuits) is what makes a TT installation safe and compliant.',
  },
  {
    id: 'm3-s4-sub1-pnb-vs-pme',
    question:
      'The new BS 7671 A4:2026 introduces a PNB layout under TN-C-S. What is the headline difference between PNB and the more familiar PME?',
    options: [
      'PNB is the same as PME, just a new name.',
      'In PNB the PEN conductor is earthed at a single point close to the consumer’s installation (between transformer and supply terminals), not at multiple points along the network as in PME.',
      'PNB has no earth at all.',
      'PNB only applies to three-phase supplies.',
    ],
    correctIndex: 1,
    explanation:
      'Protective Neutral Bonding (PNB) earths the PEN at a single point close to the consumer (the neutral-earth link), typically between the transformer and the supply terminals. PME relies on multiple earth electrodes along the network. Both are TN-C-S variants — A4:2026 added the PNB figure and requirements to Reg 312.2.1.1.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which letters in "TN-C-S" tell you what about the system?',
    options: [
      'T = isolated, N = no earth, C = combined, S = single phase',
      'T = source directly earthed, N = installation exposed parts connected to that source earth via PE, C = combined N+PE in part of the system, S = separated N and PE in another part',
      'T = transformer, N = neutral only, C = circuit, S = supplied',
      'They’re just brand letters used by DNOs',
    ],
    correctAnswer: 1,
    explanation:
      'First letter = source earthing (T = directly earthed). Second letter = how exposed-conductive-parts of the installation get to earth (N = via the source earth through a PE conductor). Third + fourth = the arrangement of N and PE in the supply (C = combined as PEN, S = separated). TN-C-S = combined in the supply, separated at the service position. The same naming applies to TN-S, TT and IT.',
  },
  {
    id: 2,
    question:
      'You arrive at a Victorian terrace. The supply head is the old lead-sheathed cable, and a green/yellow strap clamps the lead sheath itself to the MET. Which earthing system is this?',
    options: ['TN-C-S (PME)', 'TN-S', 'TT', 'IT'],
    correctAnswer: 1,
    explanation:
      'Lead sheath of the supply cable used as the protective conductor with separate neutral all the way back to the source = classic TN-S. Increasingly rare on new supplies (DNOs convert to TN-C-S when they upgrade), but you’ll still meet plenty in older urban housing.',
  },
  {
    id: 3,
    question:
      'A TT installation has an earth electrode resistance of 80 Ω. A 30 mA RCD protects the final circuits. Roughly what is the prospective touch voltage in a fault, and is the RCD compliance rule (Ra × IΔn ≤ 50 V) satisfied?',
    options: [
      'Touch voltage = 80 × 0.030 = 2.4 V — well within the 50 V limit, so compliant.',
      'Touch voltage = 80 × 30 = 2400 V — fails badly.',
      'Touch voltage ≈ 50 V — exactly on the limit, so marginal.',
      'Touch voltage = 230 V — always at full supply voltage in TT.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 411.5.3 requires Ra × IΔn ≤ 50 V. With Ra = 80 Ω and IΔn = 0.030 A, that’s 2.4 V — comfortably inside 50 V. The Table 41.5 maximum Zs for a 30 mA RCD is 1667 Ω, so an 80 Ω electrode is more than fine. The RCD does the work; the electrode just gives the fault current somewhere to flow.',
  },
  {
    id: 4,
    question:
      'An IT system is most likely to be found in which of these locations?',
    options: [
      'A typical UK semi-detached house.',
      'A small office above a shop.',
      'A hospital operating theatre or a process plant where supply continuity matters more than instant disconnection.',
      'A standard caravan park pitch.',
    ],
    correctAnswer: 2,
    explanation:
      'IT (source not directly earthed, or earthed via high impedance) is industrial/medical only. The point is that a first earth fault doesn’t immediately disconnect the supply — alarmed but kept running — because in a theatre or chemical process the loss of supply is the bigger danger than the fault itself.',
  },
  {
    id: 5,
    question:
      'Why is a Type AC RCD increasingly considered obsolete on modern domestic installations regardless of earthing system?',
    options: [
      'It only works on TT systems.',
      'It only detects sinusoidal AC fault currents — modern electronic loads (LED drivers, EV chargers, inverters) can produce DC components that magnetically saturate the RCD’s core, blinding it to a real fault.',
      'It’s too sensitive.',
      'It’s only rated for 110 V.',
    ],
    correctAnswer: 1,
    explanation:
      'Type AC sees pure AC only. A Type A is now the domestic minimum (AC + pulsating DC). Type B is needed where smooth DC fault current is possible — most EV chargers and many three-phase VSDs. Wrong RCD type on a modern install is a Code 2 / Code 3 on an EICR.',
  },
  {
    id: 6,
    question:
      'On a TN-C-S (PME) supply, why does BS 7671 set tighter conditions on bonding conductor sizes (often 10 mm² minimum) than on a TN-S supply with the same load?',
    options: [
      'Because PME is a newer system.',
      'Because the PEN conductor carries normal neutral current — in an open-circuit fault on the PEN, the consumer’s earthing terminal can rise toward line voltage, and oversized bonding conductors limit the resulting current and voltage on extraneous parts.',
      'Because PME uses aluminium cable.',
      'Bonding conductors are always the same size regardless of system.',
    ],
    correctAnswer: 1,
    explanation:
      'A broken PEN (a PME open-circuit fault) is the headline risk: the customer’s "earth" lifts toward line voltage and dumps neutral return current through their bonding conductors and water/gas pipes. 10 mm² minimum main bonding (and thicker if Table 54.8 demands it for cables > 35 mm²) keeps the resulting touch voltages survivable.',
  },
  {
    id: 7,
    question:
      'You inherit a job where a previous electrician fitted a fuel-pump installation on a TT-derived supply but used the same 16 mm² earthing conductor specification as the adjacent TN-C-S domestic supply. Why is that wrong?',
    options: [
      'It’s not — earthing conductor sizing is identical between systems.',
      'The earthing conductor in TT runs to a buried earth electrode and must comply with Table 54.1 minimum sizes for buried conductors (e.g. 25 mm² Cu unprotected, 16 mm² Cu protected against corrosion only). 16 mm² unprotected Cu in soil corrodes and undersizes the run.',
      'TT systems don’t need an earthing conductor.',
      'TN-C-S earthing conductors must be larger than TT.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.1 sets minimum sizes for an earthing conductor buried in the ground, with separate columns for "protected against corrosion" and "not protected against corrosion". A 16 mm² unprotected Cu run buried in soil corrodes over years and the earth path silently degrades. Spec to the table, and use a corrosion-protected sheath where appropriate.',
  },
  {
    id: 8,
    question:
      'A forecourt’s petrol filling-station installation is fed from the same DNO as the adjoining shop, which is on TN-C-S (PME). Why is the forecourt typically converted to TT for the dispensers themselves?',
    options: [
      'PME conditions don’t apply on petrol forecourts because of the explosive-atmosphere risk — a PEN fault could cause sparks at the metalwork. Industry practice (and the energy networks’ guidance) is to derive a TT zone for the hazardous-area equipment.',
      'TT is cheaper to install.',
      'TN-C-S is illegal at any commercial site.',
      'There’s no real reason; it’s personal preference.',
    ],
    correctAnswer: 0,
    explanation:
      'PME-prohibited locations include petrol filling stations, marinas and caravan parks because a broken-PEN fault can cause sparking at exposed metalwork — fatal in an ATEX zone. The standard fix is to derive a TT installation for the dispensers (own electrode, 30 mA RCD), keeping them outside the PME earthing system.',
  },
];

const faqs = [
  {
    question: 'Why do I have to know the earthing system before I do anything else?',
    answer:
      'Because every other safety calc on the install — Zs, bonding conductor sizing, RCD requirements, CPC sizing — depends on it. A 32 A circuit on TN-C-S has a max Zs of about 1.37 Ω (Type B MCB). The same circuit on TT relies entirely on a 30 mA RCD because Ze is hundreds of ohms. Fit the same protection across both and you’ve either over-engineered or, worse, left a fatal gap.',
  },
  {
    question: 'How do I tell PME from PNB at the cut-out — they’re both TN-C-S?',
    answer:
      'You usually can’t tell visually at a single house. PME means the DNO has earthed the PEN at multiple points along their network (substation + various joints + sometimes consumer end). PNB means the PEN is earthed at one point only, very close to the consumer’s supply terminals. The distinction matters more for the DNO than the electrician, but A4:2026 has formalised PNB so you’ll see it called out on private networks and some new-build sub-mains.',
  },
  {
    question: 'What does "TN-S is becoming rare" actually mean for me?',
    answer:
      'When DNOs replace old lead-sheathed mains, they almost always upgrade to TN-C-S. So you’ll meet TN-S mostly in older terraces, period properties and unrefurbished commercial blocks. Treat it as a maintenance thing — never assume a new supply head is TN-S without checking. If you find one being upgraded, the customer’s earthing arrangement at the MET will likely change with it.',
  },
  {
    question: 'Can I just bond every metal thing in sight to be safe?',
    answer:
      'No. Over-bonding can be as dangerous as under-bonding — you can drag fault current onto pipework that wasn’t previously extraneous, raise touch voltages on assumed-safe metalwork, and create circulating currents on PME. The rule is in 411.3.1.2: bond extraneous-conductive-parts that are liable to introduce a dangerous potential. Sub 4.4 covers the 1667 Ω test that decides which is which.',
  },
  {
    question: 'What if the DNO label on the cut-out disagrees with what I see inside?',
    answer:
      'Trust what you can see at the cut-out, then ring the DNO. Mis-labelled supplies do exist — usually after an upgrade where the paperwork didn’t catch up. Never just take the sticker’s word for it on a new EICR or a cert; always verify by inspection (single PEN vs separate N+PE in the meter tails, sheath used as PE, presence of a local rod, etc.).',
  },
  {
    question: 'I’ve heard "anything plastic at the meter is TT" — is that right?',
    answer:
      'No. Plastic meter tails or a plastic service head don’t define the earthing arrangement. What defines it is what conductor the consumer’s MET is connected to. If there’s a green/yellow strap from the MET going back to a clamp on the supplier’s neutral block: TN-C-S. If it goes to a separate earth terminal coming off the cable sheath: TN-S. If it goes only to a local rod outside the property: TT. Always trace the earth back, don’t guess from the cable jacket.',
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 1"
            title="Earthing systems"
            description="Five earthing arrangements you’ll meet on UK installations — TN-S, TN-C-S (PME), TN-C-S (PNB), TT and IT. The DNO chose for you. Your job is to recognise which one and respect it."
            tone="emerald"
          />

          <TLDR
            points={[
              'Five UK arrangements: TN-S (separate N+PE all the way), TN-C-S as PME (combined PEN at supply, split at MET — most common new-build domestic), TN-C-S as PNB (single neutral-earth link near the consumer — A4:2026 update), TT (no DNO earth, own electrode, RCD essential) and IT (no source earth — industrial/medical).',
              'You can’t pick the system — the DNO chose. Your job is to identify which one is at the cut-out, then design the install to suit.',
              'Get the system wrong and every downstream calc — Zs, bonding sizes, RCD type/rating, CPC requirements — is wrong with it.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify all five earthing arrangements used in UK installations: TN-S, TN-C-S (PME), TN-C-S (PNB), TT and IT.',
              'Recognise each system at the cut-out from physical inspection (PEN vs separate conductors, sheath earthing, local electrode).',
              'State the broad protection requirements that follow from each system (RCD necessity in TT, PME-prohibited locations, IT first-fault tolerance).',
              'Distinguish PME from PNB within the TN-C-S family per BS 7671 A4:2026 Reg 312.2.1.1.',
              'Explain why TT relies on RCD protection and verify the Ra × IΔn ≤ 50 V condition (Reg 411.5.3).',
              'Flag mixed or non-compliant arrangements (e.g. PME inside a petrol forecourt) and know who to escalate to.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="The earthing system is the foundation — every other safety decision sits on top"
            plainEnglish="Identify the system first. Then size the bonding, pick the protective device, and set the disconnection time. Skip the first step and the rest is guessing."
            onSite="Walk into a job, lift the cover, identify the system before you touch anything else. It takes ten seconds and it changes everything you do downstream."
          >
            <p>
              The DNO decides what arrives at your cut-out. You don’t get a vote. What you do get is
              the responsibility to <em>recognise</em> what they’ve installed and design your
              installation to match. A 30 mA RCBO on a TN-C-S domestic ring is bread-and-butter; the
              same RCBO with no upstream protection on a TT supply is a fail.
            </p>
            <p>
              The naming system is consistent and worth memorising. <strong>First letter</strong>{' '}
              = how the source is earthed (T = directly earthed at the source, I = isolated or
              high-impedance from earth). <strong>Second letter</strong> = how the installation’s
              exposed-conductive-parts get to earth (N = via the source earth through a protective
              conductor, T = via a local earth electrode independent of the source).{' '}
              <strong>Third and fourth letters (TN systems only)</strong> = the arrangement of
              neutral and protective conductors (S = separated, C = combined as PEN). TN-C-S means
              combined in part of the system (the supply), separated in the rest (the installation).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 312.2.1 (TN systems)"
            clause="TN systems have one point directly earthed at the source, the exposed-conductive-parts of the installation(s) being connected to that point by protective conductors. Two types of TN system are considered according to the arrangement of neutral and protective conductors."
            meaning={
              <>
                Two TN variants matter to you on UK installs: TN-S (separate N and PE all the way)
                and TN-C-S (combined as PEN in the supply, separated at the service position into N
                and PE). A4:2026 has expanded TN-C-S to include both PME and the new PNB layout —
                see Sub-clause 312.2.1.1 for the figures and requirements.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Regulation 312.2.1."
          />

          <SectionRule />

          <ContentEyebrow>TN-S — separate N and PE all the way</ContentEyebrow>

          <ConceptBlock
            title="TN-S — the traditional UK supply, increasingly rare on new mains"
            plainEnglish="The protective earth is provided by the metallic sheath of the supply cable, separate from the neutral, all the way back to the source."
            onSite="If you see a green/yellow strap clamped onto the lead or armoured sheath of the incoming cable (not onto the neutral block), that’s TN-S. Nine times out of ten in older terraces and unrefurbished urban housing."
          >
            <p>
              In a TN-S system the neutral conductor and the protective conductor are physically
              separate from the transformer star point right through to your MET. The PE is usually
              the metallic sheath of the supply cable (lead in older properties, steel-wire armour
              in some). The DNO maintains the integrity of the sheath as a continuous earth path.
            </p>
            <p>
              Identify it: at the cut-out you’ll see line, neutral and a separate earth conductor or
              a sheath-bonding clamp going to the MET. Critically, the earth strap does <em>not</em>{' '}
              connect to the neutral block. Ze on a healthy TN-S supply is typically around{' '}
              <strong>0.8 Ω</strong> — fault current rises high enough that overcurrent devices clear
              earth faults reliably without needing RCD assistance, though additional protection
              (30 mA RCD) is still required by BS 7671 for socket outlets, mobile equipment, and
              luminaires in dwellings.
            </p>
            <div className="flex justify-center pt-2">
              <EarthingSystemDiagram system="TN-S" />
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>TN-C-S — the common one</ContentEyebrow>

          <ConceptBlock
            title="TN-C-S (PME) — combined PEN in the supply, separated at the MET"
            plainEnglish="One conductor brings both neutral and earth from the DNO. At your cut-out, that PEN is split into a separate N and a separate PE; the PE goes to your MET."
            onSite="Standard for new domestic supplies and most rewires of older urban properties since the 1970s. Lift the meter cover: a single combined conductor arriving from the DNO, plus a strap from the DNO neutral block to the consumer’s MET — that’s PME."
          >
            <p>
              In TN-C-S, the supply network uses a combined Protective Earth + Neutral conductor —
              the PEN — between the source and the consumer. At the consumer’s service position the
              PEN is split: one terminal becomes the installation neutral, another (linked) becomes
              the installation PE. From that point inwards the installation is wired with separate N
              and PE conductors. The "C" refers to the combined supply portion, the "S" to the
              separated installation portion.
            </p>
            <p>
              The PME variant — the most common UK form — earths the PEN at multiple points along
              the DNO’s network (Protective Multiple Earthing). Ze is typically around{' '}
              <strong>0.35 Ω</strong> on a healthy PME supply. That low impedance is why MCB-only
              earth fault protection works so reliably on TN-C-S — fault currents are huge, MCBs
              trip in milliseconds.
            </p>
            <div className="flex justify-center pt-2">
              <EarthingSystemDiagram system="TN-C-S" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="TN-C-S (PNB) — A4:2026 brings the single-point variant into the regs"
            plainEnglish="Same TN-C-S idea, but the neutral-earth link sits at one point near the consumer rather than at multiple points along the DNO network."
            onSite="You’ll meet PNB on private distribution networks (housing developments with their own substation, large industrial sites with on-site transformers) and increasingly on some sub-mains in larger commercial buildings. A4:2026 added the figure and requirements to Reg 312.2.1.1."
          >
            <p>
              Protective Neutral Bonding (PNB) is the second TN-C-S variant. The PEN conductor is
              earthed at <em>one</em> point only — the neutral-earth link — and that point is
              positioned as close as practicable to the consumer’s supply terminals, between the
              transformer and the supply origin. Because there’s only one earth electrode on the PEN
              (rather than the multiple ones in PME), PNB avoids some of the broken-PEN-rise risks
              that come with PME on long networks.
            </p>
            <p>
              When PNB is installed within the consumer’s installation (not a DNO arrangement),
              PME conditions don’t apply — which has knock-on effects on bonding sizes and on which
              circuits can be supplied. A4:2026 also added new schedule columns to the EIC/MWC to
              capture PNB explicitly, so you’ll need to tick the right box on the certificate when
              you meet one.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 312.2.1.1 (PNB figure and requirements, A4:2026 update) (paraphrased)"
            clause="Regulation 312.2.1.1 now includes a Protective Neutral Bonding (PNB) figure and requirements (Figure 3.9B). PNB can apply to single-phase and three-phase supplies. The PEN conductor is connected to an earth electrode at a point remote from the transformer, between the transformer and the supply terminals of the consumer. This connection should be made as close as practicable to the consumer’s supply terminals, in order to minimise the risk of voltage rise in the event of an open-circuit fault in the PEN conductor."
            meaning={
              <>
                PNB is the new explicit TN-C-S variant in the regs. Where the source earth and the
                neutral-earth link sit within the consumer’s installation (typical on private
                networks), PME conditions do not apply — which changes the bonding-conductor sizing
                rules and removes the PME-prohibited-location restrictions. Identify whether you’re
                on PME or PNB before you spec the bonding.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Regulation 312.2.1.1 and Figure 3.9B for the full text."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>TT — your own electrode, RCD does the work</ContentEyebrow>

          <ConceptBlock
            title="TT — no DNO earth, you provide your own"
            plainEnglish="The DNO supplies line and neutral only. The installation’s earth is a local rod (or rods) driven into the ground. Earth fault current returns through the rod, through the soil, back to the substation electrode."
            onSite="Common on rural and overhead supplies where the DNO can’t guarantee an earth. Look for a green/yellow conductor from the MET disappearing into the ground or a wall, ending at an earth-electrode pit nearby."
          >
            <p>
              In TT, the source is earthed (T) and the installation’s exposed-conductive-parts are
              earthed via a local electrode (T) — independent of the source earth. The fault loop
              goes line → fault → CPC → MET → earthing conductor → local rod → soil → substation
              electrode → source neutral. That soil-and-electrode return path is high impedance: Ze
              is typically <strong>20–200 Ω</strong>, sometimes much more on sandy or rocky ground.
            </p>
            <p>
              At those Ze values, fault current is too low for an MCB to trip in 0.4 s. So TT
              installations rely on <strong>RCDs</strong> for fault protection — Reg 411.5.3
              requires that Ra × IΔn ≤ 50 V and Reg 411.3.2.4 allows up to 1 s disconnection on
              distribution circuits. The standard arrangement on a domestic TT is a 100 mA
              time-delayed S-type RCD at origin (for selectivity) with 30 mA RCD/RCBOs on final
              circuits.
            </p>
            <div className="flex justify-center pt-2">
              <EarthingSystemDiagram system="TT" />
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3 (RCDs in TT systems)"
            clause="Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V, where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms) and IΔn is the rated residual operating current of the RCD. Table 41.5 gives the maximum earth fault loop impedance Zs for non-delayed and time-delayed S Type RCDs at U₀ = 230 V — for example 1667 Ω for 30 mA, 500 Ω for 100 mA, 167 Ω for 300 mA, and 100 Ω for 500 mA."
            meaning={
              <>
                On a 30 mA RCD, the maximum allowable Zs from Table 41.5 is{' '}
                <strong>1667 Ω</strong>. So even a 200 Ω electrode is comfortably inside the limit.
                The headline test on a TT install isn’t whether the MCBs trip — it’s whether Ra × IΔn
                stays under 50 V and whether the RCD operates within the disconnection time. Without
                an RCD, a TT installation can’t comply.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.5.3 and Table 41.5."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>IT — first fault tolerated, supply continuity wins</ContentEyebrow>

          <ConceptBlock
            title="IT — source isolated from earth, kept running on a first fault"
            plainEnglish="The source isn’t directly earthed. A first earth fault doesn’t cause large fault current, so the supply isn’t automatically disconnected — it’s alarmed. A second simultaneous fault on a different conductor is the one that has to be cleared."
            onSite="You won’t meet IT in domestic. It’s industrial process plants where shutting down the supply is more dangerous than the fault, and medical Group 2 locations (operating theatres, ICU) where an interrupted supply could kill the patient on the table."
          >
            <p>
              In IT systems the source is either not earthed at all, or earthed through a high
              impedance (often a deliberately specified resistor). Exposed-conductive-parts of the
              installation are still earthed, individually or collectively (Reg 411.6.2). The
              characteristic feature: a first earth fault generates only a small current — limited
              by the source impedance — and is not required to cause automatic disconnection.
              Instead an insulation monitoring device (IMD) raises an alarm so the fault can be
              found and cleared at a planned time.
            </p>
            <p>
              On a second fault occurring on a different conductor, full short-circuit current
              flows and the protective device must operate. That’s why IT is a specialist
              arrangement — the protective scheme has to handle two distinct fault scenarios, the
              IMD has to be maintained, and isolation procedures matter as much as the wiring.
              Apprentices won’t install or sign off IT systems at Level 2; you need to recognise one
              and know to escalate.
            </p>
            <div className="flex justify-center pt-2">
              <EarthingSystemDiagram system="IT" />
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Identifying which system you’re on</ContentEyebrow>

          <ConceptBlock
            title="The cut-out tells you — if you know what to look for"
            onSite="Don’t take the DNO sticker’s word for it. Lift the cover, trace the earth strap, and confirm visually before you spec anything."
          >
            <p>
              A 30-second visual at any cut-out should tell you which system you’re on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> separate earth conductor or sheath-bonding clamp to the MET,
                independent of the neutral block. Often older lead-sheathed cable.
              </li>
              <li>
                <strong>TN-C-S (PME):</strong> single combined PEN arriving from DNO; earth strap to
                the MET clamps onto the neutral terminal block. Typically labelled by the DNO. Look
                for the multiple earthing notice.
              </li>
              <li>
                <strong>TN-C-S (PNB):</strong> harder to spot at a single property. Usually called
                out on private distribution networks or new sub-mains where there’s a single
                neutral-earth link near the consumer.
              </li>
              <li>
                <strong>TT:</strong> only line and neutral arriving from DNO; a separate green/
                yellow earthing conductor leaves the MET and runs to a local earth electrode (rod or
                buried plate). Often signposted by an earth-electrode test pit.
              </li>
              <li>
                <strong>IT:</strong> industrial/medical only. Identifiable by an insulation
                monitoring device on the supply and the absence of a direct source earth.
              </li>
            </ul>
            <p>
              Check this before you do anything else on a job. The system determines your bonding
              sizes, your RCD requirements, your CPC sizing and your maximum Zs values — the four
              numbers you’ll spend the rest of this section calculating.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating a PME supply as if it’s ordinary at a petrol forecourt or marina"
            whatHappens={
              <>
                You wire a new dispenser controller on a forecourt and bond its metal enclosure to
                the customer’s PME earth like you would in a domestic. A broken-PEN fault then drags
                the whole forecourt’s exposed-conductive-parts toward line voltage; the resulting
                spark in an ATEX zone ignites vapour at the dispenser. People die. The investigation
                finds you ignored the PME-prohibited locations.
              </>
            }
            doInstead={
              <>
                BS 7671 lists PME-prohibited locations: petrol filling stations, marinas, caravan
                parks (and boats moored at marinas). On these you derive a TT installation for the
                hazardous-area equipment with its own earth electrode and dedicated 30 mA RCD
                protection — completely separate from the building’s PME earthing. Reference
                BS 7671 Part 7 for the exact location-specific requirements before designing.
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

          <Scenario
            title="Two flats above a shop — different earthing systems on the same building"
            situation={
              <>
                You’re first-fix on two new flats built above an existing parade. The shop on the
                ground floor has been on TN-S (lead-sheathed mains) for fifty years. The DNO has
                installed a new TN-C-S (PME) supply for the upstairs flats with its own meter
                position. The shop owner asks if you can "just connect the new flats to my existing
                board to save on meter charges".
              </>
            }
            whatToDo={
              <>
                Refuse — and explain why. You can’t bridge a PME supply across into a TN-S
                installation without creating a parallel earth path between two unrelated DNO
                earthing systems. Apart from the metering issue (which is a regulatory offence in
                its own right), you’d be relying on the lead sheath of an old TN-S cable to carry
                fault currents from a PME-class installation upstairs. Each supply stays on its own
                earthing arrangement, with its own MET, its own bonding, and its own DNO meter.
              </>
            }
            whyItMatters={
              <>
                Mixing earthing systems within a single building is one of the higher-risk faults
                you’ll encounter on EICRs. It usually happens during piecemeal extensions where a
                new supply is added but the wiring quietly bridges back to the old supply’s earth.
                Spot it, code it (typically C2), and recommend separation before any further work
                proceeds.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Five UK earthing arrangements: TN-S, TN-C-S (PME), TN-C-S (PNB — new in A4:2026), TT, and IT.',
              'TN-S = separate N and PE all the way back to source. Becoming rare on new supplies.',
              'TN-C-S = combined PEN in the supply, split at the MET. PME (multiple network electrodes) is the common UK domestic form; PNB (single neutral-earth link near consumer) is the A4:2026 addition.',
              'TT = no DNO earth, you provide your own electrode. Mandatory RCD protection because Ze is too high for MCBs alone (typically 20–200 Ω). Reg 411.5.3: Ra × IΔn ≤ 50 V.',
              'IT = source not directly earthed (or via high impedance). First fault alarmed not disconnected. Industrial process plants and medical Group 2 only — escalate at Level 2.',
              'Identify the system at the cut-out before you spec anything else. Bonding sizes, RCD requirements, CPC sizing and max Zs all depend on it.',
            ]}
          />

          <Quiz title="Earthing systems — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Designing a small installation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Component parts of ADS
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
