/**
 * Module 2 · Section 3 · Subsection 6 — Chemical effects of current (AC 4.8 chemical)
 * City & Guilds 2365-02 → Unit 202 → LO4 part 1.
 * Written from scratch for the apprentice voice rewrite.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Chemical effects of current — cells, electrolysis and corrosion | Level 2 Module 2.3.6 (AC 4.8) | Elec-Mate';
const DESCRIPTION =
  'How current makes and breaks chemical bonds — primary and secondary cells, electrolysis, lead-acid batteries, and the galvanic corrosion you fight at every dissimilar-metal joint on site.';

const checks = [
  {
    id: 'primary-vs-secondary-check',
    question: 'What is the key difference between a primary cell and a secondary cell?',
    options: [
      'Primary cells are larger',
      'Secondary cells can be recharged; primary cells cannot',
      'Primary cells produce DC, secondary cells produce AC',
      'There is no difference',
    ],
    correctIndex: 1,
    explanation:
      "Primary cells (zinc-carbon, alkaline) are use-once — the chemistry is irreversible. Secondary cells (lead-acid, NiMH, lithium-ion) reverse the reaction when you push current back in, so they recharge.",
  },
  {
    id: 'electrolysis-direction-check',
    question: 'In electrolysis, positive ions in the electrolyte move towards the:',
    options: [
      'Anode (positive electrode)',
      'Cathode (negative electrode)',
      'Centre of the cell',
      'They don’t move',
    ],
    correctIndex: 1,
    explanation:
      "Opposites attract. Positive ions (cations) head for the negative electrode (cathode). Negative ions (anions) head for the positive electrode (anode). That's the basis of electroplating, refining, and how a lead-acid battery charges and discharges.",
  },
  {
    id: 'galvanic-corrosion-check',
    question:
      'Why does bolting a copper bonding conductor straight onto an aluminium pipe cause problems over time?',
    options: [
      'The colours clash',
      'Copper and aluminium form a galvanic cell in the presence of moisture, corroding the joint',
      'Aluminium has higher resistance',
      'Copper expands more than aluminium',
    ],
    correctIndex: 1,
    explanation:
      "Two dissimilar metals + an electrolyte (rain, condensation) = a small cell. Tiny current flows between them, eating the more reactive metal (aluminium in this case). Over time the joint corrodes, R rises, and the bond fails. Use bimetallic connectors.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A simple cell consists of:',
    options: [
      'Two electrodes of the same metal in pure water',
      'Two electrodes of different metals in an electrolyte',
      'A coil of wire in a magnetic field',
      'A capacitor and a resistor',
    ],
    correctAnswer: 1,
    explanation:
      "Two different metals (electrodes) in an ionic solution (electrolyte). The chemical reaction between them creates an EMF — that's the cell's voltage. Same setup as the corrosion problem in 4.8 chemical effects.",
  },
  {
    id: 2,
    question: "An everyday AA alkaline battery is an example of a:",
    options: [
      'Primary cell',
      'Secondary cell',
      'Fuel cell',
      'Photovoltaic cell',
    ],
    correctAnswer: 0,
    explanation:
      "Alkaline AAs are primary cells — chemistry is one-way, you bin them after use. NiMH and lithium-ion AAs exist (rechargeable) — those are secondary.",
  },
  {
    id: 3,
    question: 'The standard EMF of a single fully-charged lead-acid cell is approximately:',
    options: ['1.2 V', '2.0 V', '3.7 V', '6.0 V'],
    correctAnswer: 1,
    explanation:
      "About 2.0 V per cell. A 12 V car battery is 6 cells in series; a 24 V truck battery is 12. Lithium-ion is ~3.7 V/cell; NiMH is ~1.2 V/cell.",
  },
  {
    id: 4,
    question: 'Battery capacity is usually quoted in:',
    options: [
      'Volts (V)',
      'Watts (W)',
      'Ampere-hours (Ah)',
      'Coulombs (C)',
    ],
    correctAnswer: 2,
    explanation:
      "Ampere-hours = how much charge the battery can deliver. A 100 Ah battery can theoretically supply 100 A for 1 hour, or 10 A for 10 hours. Q = I × t — same coulomb maths from 3.1.",
  },
  {
    id: 5,
    question: 'Electrolysis is used industrially for:',
    options: [
      'Generating heat',
      'Generating magnetic fields',
      'Refining metals (e.g. copper) and electroplating',
      'Generating AC supply',
    ],
    correctAnswer: 2,
    explanation:
      "Push DC through an electrolyte and you can deposit metal from solution onto the cathode. Used to refine copper, electroplate steel with zinc/chrome/nickel, anodise aluminium, and produce hydrogen.",
  },
  {
    id: 6,
    question: 'Galvanic (bimetallic) corrosion needs three things:',
    options: [
      'Two dissimilar metals, an electrolyte, and an electrical contact between them',
      'Two metals of the same type, dry conditions, and air',
      'Heat, pressure, and a magnet',
      'Just one metal in pure water',
    ],
    correctAnswer: 0,
    explanation:
      "All three. Take any one away — same metal both sides, no moisture, or break the electrical path — and the corrosion mechanism stops. That's why bimetallic lugs and dielectric grease work.",
  },
  {
    id: 7,
    question:
      'A copper bonding conductor needs to be terminated to a galvanised steel pipe. Best practice is to:',
    options: [
      "Bolt them straight together — it's only earth",
      "Use a bimetallic clamp/lug rated for the dissimilar metals, with a corrosion-inhibiting compound",
      'Wrap the joint in PVC tape',
      'Solder the copper to the pipe',
    ],
    correctAnswer: 1,
    explanation:
      "Direct copper-on-steel will corrode given time and moisture, raising the bonding R and eventually breaking continuity. Bimetallic clamps (BS 951 etc.) plus jointing compound stop the cell forming.",
  },
  {
    id: 8,
    question: 'A lead-acid battery being charged gives off:',
    options: [
      'Hydrogen and oxygen gas — explosive',
      'Just steam',
      'Carbon dioxide',
      'Nothing',
    ],
    correctAnswer: 0,
    explanation:
      "Charging a lead-acid cell electrolyses some of the water in the electrolyte into H₂ and O₂. Build-up in an unventilated space is genuinely explosive — battery rooms need ventilation, no naked flames, no sparks near the terminals.",
  },
];

const faqs = [
  {
    question: "Why do I need to know about batteries — I'm doing fixed wiring, not BMS?",
    answer:
      "Three reasons. Emergency lighting and fire-alarm panels run off rechargeable batteries you'll need to test. Solar PV installs need battery storage on more and more jobs. And the corrosion physics is exactly the same as galvanic corrosion at terminations — understand the cell and you understand both.",
  },
  {
    question: "What's the difference between a 'cell' and a 'battery'?",
    answer:
      "A single cell is the basic unit (around 2 V for lead-acid, 1.5 V for alkaline, 3.7 V for lithium). A battery is two or more cells wired together — usually in series for higher voltage. A 12 V car battery is six 2 V lead-acid cells in series.",
  },
  {
    question: "Is galvanic corrosion really an issue on a normal install?",
    answer:
      "Yes — and most often at the bonding terminations on gas/water pipes, at the copper conductor / steel pipe interface in cold or damp locations, on outdoor SWA glands, and at outdoor earth electrodes. Periodic inspection should pick it up before continuity is lost.",
  },
  {
    question: "How does electroplating actually work?",
    answer:
      "Stick the part to be coated as the cathode in a solution of the coating metal's salt. Stick a sacrificial bar of the coating metal as the anode. Push DC through. Positive metal ions in solution drift to the cathode and deposit on it; the anode dissolves to replace them. Even coating, defined thickness, controlled by current and time.",
  },
  {
    question: "Why do batteries lose voltage over time even when not used?",
    answer:
      "Self-discharge. Even sat on a shelf, slow chemical side-reactions inside the cell consume the active materials. Lithium-ion holds charge well (a few % a month). Lead-acid is worse (a few % a week). NiMH is worst (can lose 30%+ a month). All are using the chemical-effects-of-current physics — just running it backwards.",
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
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 6"
            title="Chemical effects of current"
            description="The other side of current. Cells turn chemistry into electricity; electrolysis turns electricity into chemistry; corrosion does it without anyone asking. The physics behind every battery you'll touch and every dissimilar-metal joint you'll fight."
            tone="emerald"
          />

          <TLDR
            points={[
              "Two different metals in an electrolyte = a cell. Chemistry produces an EMF; current flows when you connect the load.",
              "Primary cells (alkaline) are one-shot. Secondary cells (lead-acid, lithium-ion, NiMH) reverse the reaction to recharge.",
              "The same physics that powers your battery causes galvanic corrosion at every dissimilar-metal joint. Bimetallic lugs and inhibitor paste stop it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the basic construction of a cell — two electrodes, an electrolyte, the chemical reaction that produces EMF.",
              "Distinguish primary (non-rechargeable) and secondary (rechargeable) cells with examples.",
              "Explain electrolysis and give examples of its industrial use (refining, plating, hydrogen).",
              "Describe how a lead-acid battery charges and discharges, and the safety hazards (acid, gas, current).",
              "Explain galvanic corrosion at terminations and how to prevent it (bimetallic connectors, inhibitor compound).",
              "Use Q = I × t to relate ampere-hours of capacity to charge.",
            ]}
            initialVisibleCount={3}
          />

          <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-emerald-400/40 pl-4 italic">
            <span className="not-italic font-semibold text-emerald-300 mr-1.5">Where this fits:</span>
            <strong>Sub3.1</strong> said electrons in motion is what current IS. This Sub shows
            what happens when those electrons start swapping ions in solutions, gases or solids —
            the chemistry of charge transfer. Same particles, different behaviour: Sub3.1 was the
            physics of free electrons drifting through a metal, Sub3.6 is the chemistry of
            electrons being handed off at an electrode. The two halves of one story.
          </p>

          <ContentEyebrow>The cell — chemistry into electricity</ContentEyebrow>

          <ConceptBlock
            title="Two metals, one electrolyte, an EMF appears"
            plainEnglish="Stick a copper rod and a zinc rod into a jar of dilute sulphuric acid and connect them with a wire. Current flows. The chemistry creates the push; the wire lets the electrons go somewhere. That's a cell."
            onSite="Same setup, smaller scale, in every battery you'll touch — torch cells, MCB-test instrument batteries, fire-alarm panel back-ups, electric-van traction packs."
          >
            <p>
              A cell is the basic chemical-to-electrical converter. Three ingredients:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two electrodes</strong> made of different metals (or a metal and a
                conductive non-metal like carbon). One ends up positive, the other negative.
              </li>
              <li>
                <strong>An electrolyte</strong> — a liquid or paste that conducts via ions, not
                electrons. Acid, alkali, salt solution, gel.
              </li>
              <li>
                <strong>A chemical reaction</strong> at each electrode that either gives up
                electrons (oxidation, at the negative electrode) or accepts them (reduction, at
                the positive). The voltage between the two electrodes is the cell's EMF.
              </li>
            </ul>
            <p>
              The voltage depends on which two metals you pick. Zinc + copper in acid gives about
              1.1 V. Lead + lead-dioxide in sulphuric acid gives about 2.0 V (the lead-acid car
              battery cell). Lithium + cobalt-oxide gives about 3.7 V. The chemistry sets the
              voltage, not the size — a tiny watch battery and a huge truck battery of the same
              chemistry are both 1.5 V or 2.0 V per cell.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Capacity — how long the chemistry lasts"
            plainEnglish="Voltage tells you how hard the cell pushes. Capacity tells you how long it can keep pushing before the chemistry runs out."
          >
            <p>
              Capacity is quoted in <strong>ampere-hours (Ah)</strong>. It's the maximum total
              charge the cell can deliver before being flat:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q = I × t</strong> — exactly the same coulomb relationship from 3.1, just
                with hours instead of seconds. 100 Ah = 100 A for 1 hour, 50 A for 2 hours, 1 A
                for 100 hours.
              </li>
              <li>
                The energy stored is voltage × capacity: a 12 V × 100 Ah lead-acid battery holds{' '}
                <strong>1200 Wh = 1.2 kWh</strong>. Less than running a kettle for an hour.
              </li>
              <li>
                Real batteries don't hold the rated capacity at high discharge rates. The faster
                you pull, the less you get out — that's why EV range drops in stop/start traffic.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 2 Definitions (Battery, Cell) (paraphrased)"
            clause="Battery: A combination of two or more cells permanently interconnected as a unit. Cell: A single unit consisting of two electrodes immersed in or contacted by an electrolyte capable of producing electrical energy by electrochemical action or of being charged by it."
            meaning={
              <>
                Cell vs battery — the formal version. One cell on its own is a cell; two or more
                joined up is a battery. A 12 V lead-acid 'battery' is six 2 V cells in series. A
                AA on its own is a cell, despite everyone calling it a 'battery'.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 2 for full definitions of Battery and Cell."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Primary vs secondary cells</ContentEyebrow>

          <ConceptBlock
            title="Primary cells — use them once, bin them"
            plainEnglish="The chemical reaction inside is one-way. Once the active materials are used up, that's it — recharging would just heat the cell and damage it."
          >
            <p>The common primary cells you'll meet:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zinc-carbon (1.5 V):</strong> the cheap supermarket battery. Zinc casing
                acts as the negative electrode and slowly corrodes during use. Leak prone. On its
                way out as a chemistry.
              </li>
              <li>
                <strong>Alkaline (1.5 V):</strong> zinc + manganese dioxide in alkaline (KOH)
                paste. Higher capacity than zinc-carbon, longer shelf life, less leaking. The
                dominant single-use cell.
              </li>
              <li>
                <strong>Lithium primary (3 V):</strong> lithium metal + various oxides. Long
                shelf life, wide temperature range, expensive. Used in smoke alarms, watches,
                medical implants.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Secondary cells — reverse the chemistry to recharge"
            onSite="Every electrician's drill, every multimeter, every clamp meter, every test instrument runs off secondary cells. Knowing why they degrade with charge cycles tells you when to replace them rather than waste a job day on a flat tester."
          >
            <p>
              Secondary cells use a chemistry that's reversible — push current back in and the
              reactions run backwards, restoring the active materials. Not infinitely; eventually
              side-reactions degrade them and capacity falls.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lead-acid (2.0 V/cell):</strong> the original rechargeable. Lead and
                lead-dioxide plates in sulphuric acid. Heavy, robust, cheap per Wh. Car batteries,
                UPS banks, leisure batteries. Charging gives off hydrogen — needs ventilation.
              </li>
              <li>
                <strong>NiMH (1.2 V/cell):</strong> nickel + metal hydride. Replaced NiCd because
                it's cadmium-free. Common in older cordless tools, hybrid vehicles, rechargeable
                AAs. Self-discharges noticeably.
              </li>
              <li>
                <strong>Lithium-ion (3.6-3.7 V/cell):</strong> lithium ions shuttle between two
                intercalation electrodes. High energy density, low self-discharge, no memory
                effect. Phones, laptops, modern cordless tools, EVs, solar storage. Needs careful
                charge control to avoid thermal runaway and fire.
              </li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.batteries.url}
            title={videos.batteries.title}
            channel={videos.batteries.channel}
            duration={videos.batteries.duration}
            topic="How batteries work — chemical effects of current · Unit 202 AC 4.8"
            caption="The animation of ion movement inside a charging and discharging cell makes the primary-vs-secondary distinction concrete."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Electrolysis — electricity into chemistry</ContentEyebrow>

          <ConceptBlock
            title="Push current through an electrolyte and you can break it apart"
            plainEnglish="Connect a DC supply across two electrodes in a salt solution and the salt dissociates — positive ions (the metal) plate out on the negative electrode; negative ions (the chloride, sulphate, etc.) gather at the positive."
          >
            <p>
              Electrolysis is the cell running in reverse — instead of chemistry pushing current
              out, you push current in to make chemistry happen. Industrial uses include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Refining copper</strong> — impure copper anode dissolves into solution;
                pure copper plates out on the cathode. The world's electrical-grade copper goes
                through this.
              </li>
              <li>
                <strong>Electroplating</strong> — depositing chrome on car trim, zinc on steel
                bolts (galvanising), nickel under chrome, gold on connectors. Uniform coatings,
                controlled thickness.
              </li>
              <li>
                <strong>Anodising aluminium</strong> — building up a thicker, harder oxide layer
                for corrosion resistance and dye-friendliness.
              </li>
              <li>
                <strong>Hydrogen production</strong> — electrolyse water to split it into H₂ and
                O₂. The current basis for "green hydrogen" if powered by renewables.
              </li>
            </ul>
            <p>
              Faraday's laws (1830s) are the underlying maths: the amount of substance deposited
              is proportional to the charge passed (Q = I × t — the same equation again). You
              don't need to solve them by hand for Level 2, but recognise that electroplating is
              just controlled chemistry driven by a controlled current.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where chemistry bites you on site — corrosion</ContentEyebrow>

          <ConceptBlock
            title="Galvanic corrosion — the unwanted cell"
            plainEnglish="Bolt copper to aluminium, get them slightly damp, and you've accidentally built a cell. The more reactive metal slowly dissolves. Joint corrodes; resistance creeps up; eventually fails."
            onSite="Most often seen on bonding conductors at gas/water pipes, on outdoor SWA gland plates, on earth electrodes, and on aluminium overhead lines spliced to copper droppers."
          >
            <p>
              Galvanic corrosion needs the same three ingredients as a battery — except you didn't
              ask for it:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two dissimilar metals</strong> in electrical contact (the joint).
              </li>
              <li>
                <strong>An electrolyte</strong> — rainwater, condensation, ground moisture, even
                sweat and salt residue.
              </li>
              <li>
                <strong>A current path</strong> between them — which the metal-to-metal contact
                already provides.
              </li>
            </ul>
            <p>
              The metal further down the galvanic series (the more reactive one) becomes the
              anode and corrodes preferentially. Common pairings and the loser:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper + aluminium</strong> → aluminium corrodes. Big problem on overhead
                aluminium-to-copper joints; managed with aluminium-to-aluminium connectors plus
                separate copper droppers.
              </li>
              <li>
                <strong>Copper + galvanised steel</strong> → zinc corrodes first (sacrificial),
                then the steel. Bonding to galvanised water pipes or gas pipes needs proper
                bimetallic clamps.
              </li>
              <li>
                <strong>Stainless steel + aluminium</strong> → aluminium corrodes. SS bolts on
                aluminium enclosures — use isolating washers and inhibitor paste.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.5.3"
            clause="Materials liable to cause mutual or individual deterioration or hazardous degradation shall not be placed in contact with each other."
            meaning={
              <>
                The reg behind every "use bimetallic lugs" decision. If the install puts two
                different metals together where moisture can get at them, you have to manage the
                galvanic-corrosion risk (different metals + electrolyte = a cell that eats the
                more reactive metal) — or accept that the joint will degrade and need
                replacement.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.5.3 (verbatim)."
          />

          <InlineCheck {...checks[2]} />

          <CommonMistake
            title="Bonding straight onto a galvanised pipe with a standard copper-jaw clamp"
            whatHappens={
              <>
                Apprentice fits a BS 951 clamp meant for copper-to-copper directly onto a
                galvanised water pipe. Looks fine on test day. Three winters of condensation
                later, the zinc has eaten through under the jaw, the contact has corroded to a
                green crust, and the bonding R has crept from 0.05 Ω to 5 Ω. Periodic test catches
                it — but only because they tested it.
              </>
            }
            doInstead={
              <>
                Use a clamp rated for the pipe material (bimetallic for copper-to-galvanised), or
                clean the pipe back to bare metal, apply a corrosion-inhibiting compound, then
                fit the clamp and shroud the joint. Document it in the install certificate so the
                next periodic spark knows what's there.
              </>
            }
          />

          <Scenario
            title="Lead-acid battery bank in a small UPS room"
            situation={
              <>
                You're sent to look at a building with a 48 V UPS battery bank — 24 lead-acid
                cells in a small unventilated cupboard. The customer says the door has been kept
                shut for years. There's a faint sulphury smell when you open up.
              </>
            }
            whatToDo={
              <>
                Don't strike a match, don't use a non-sparking switch, don't smoke. Open the door,
                let it air for several minutes before going in. Charging lead-acid evolves
                hydrogen — explosive in air at concentrations above 4%. The room needs permanent
                ventilation per the manufacturer's data sheet. Recommend the install gets a
                proper review against the battery manufacturer's spec, BS EN IEC 62485-2 (battery
                room ventilation), and the installation certificate's stated assumptions.
              </>
            }
            whyItMatters={
              <>
                Battery rooms have killed people — hydrogen explosion, sulphuric acid burns,
                arc-flash from a dropped tool across the terminals. Treat them with the same
                respect as a switchroom. The chemical effects of current are exactly that —
                physical, real, and capable of doing damage long after the chemistry stops being
                interesting.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "A cell = two dissimilar electrodes + an electrolyte. Chemistry produces EMF; the cell pushes current when you close the circuit.",
              "Primary cells (alkaline, zinc-carbon) are one-shot. Secondary cells (lead-acid, NiMH, lithium-ion) reverse the chemistry to recharge.",
              "Capacity is in Ah. Q = I × t — same coulomb maths as 3.1. Energy stored = V × Ah.",
              "Electrolysis runs the cell backwards: push DC into an electrolyte to refine metals, plate parts, anodise aluminium, produce hydrogen.",
              "Galvanic corrosion is an unwanted cell — dissimilar metals + moisture + electrical contact. Use bimetallic connectors and inhibitor paste at every dissimilar-metal joint.",
              "Lead-acid battery rooms need ventilation — charging gives off hydrogen, which is explosive above 4% in air. Treat with proper respect.",
            ]}
          />

          <Quiz title="Chemical effects of current knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.5 Thermal effects of current
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — DC circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
