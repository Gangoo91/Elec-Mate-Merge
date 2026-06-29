/**
 * Module 3 · Section 6 · Sub 1 — Types of micro-renewable energies
 * Maps to City & Guilds 2365-02 / Unit 203 / LO6 / AC 6.1
 *   AC 6.1 — “Describe types of micro-renewable energies”
 *
 * Source notes: NEW content. Six micro-gen technologies a UK electrician might wire,
 * each tied to its BS 7671 Part 7 section and its typical UK install context.
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
  'Types of micro-renewable energies (6.1) | Level 2 Module 3.6.1 | Elec-Mate';
const DESCRIPTION =
  'Solar PV, micro-wind, micro-hydro, micro-CHP, heat pumps and battery storage — the six families of micro-renewable kit a UK electrician fits, with the BS 7671 section that governs each one.';

const checks = [
  {
    id: 'mr-pv-vs-thermal',
    question:
      'A customer says she’s “going solar” — what is the first question you should ask before quoting electrical work?',
    options: [
      'Which direction the roof faces and what the pitch angle is, so you can estimate the annual yield before pricing the panels and inverter.',
      'Whether she has off-street parking, because the solar inverter has to sit within a metre of the customer’s car for the export metering to work.',
      'What size battery she wants, since every solar installation has to include lithium storage to be connected to the grid under current rules.',
      'Whether the panels are solar PV (electrical, generates power) or solar thermal (plumbing, heats water) — the two get the same name on the high street but only PV is in your scope.',
    ],
    correctIndex: 3,
    explanation:
      'Solar PV uses photovoltaic cells to make DC electricity, which an inverter turns into 230 V AC for the house. Solar thermal uses a fluid loop on the roof to heat hot water and is plumbed into the cylinder — there’s an electrical pump and a controller, but it’s not generation. PV falls under BS 7671 Section 712. Solar thermal does not.',
  },
  {
    id: 'mr-pv-section',
    question:
      'Which BS 7671 Part 7 section governs the electrical installation of a solar PV system in a UK home?',
    options: [
      'Section 701 (Locations containing a bath or shower).',
      'Section 712 (Solar photovoltaic (PV) power supply systems).',
      'Section 722 (Electric vehicle charging installations).',
      'Section 704 (Construction and demolition site installations).',
    ],
    correctIndex: 1,
    explanation:
      'Section 712 is the dedicated PV section. Reg 712.1 sets the scope: “This section applies to the electrical installation of PV generators intended to supply all or part of an installation and to feed electricity into the public grid or local distribution.” If you’re installing PV in the UK, 712 is your home regulation.',
  },
  {
    id: 'mr-heat-pump',
    question:
      'A heat pump (air-source or ground-source) is a “micro-renewable” — but in what sense? It uses electricity, doesn’t it?',
    options: [
      'It uses electricity, but a small input drives a much larger heat output by moving heat from outside air or the ground into the house — typically 3 kW of heat for every 1 kW of electricity (a Coefficient of Performance around 3).',
      'It burns a renewable fuel such as wood pellets or biogas, so the electricity it draws is only for the controls and the circulating pump rather than for making heat.',
      'It generates its own electricity from the temperature difference between the outside air and the house, exporting the surplus back to the grid like a small solar panel.',
      'It is renewable only because it runs on a time-of-use tariff and charges overnight, shifting its electricity use to when the grid is greenest rather than producing any heat itself.',
    ],
    correctIndex: 0,
    explanation:
      'A heat pump doesn’t generate electricity — it consumes it. But it’s classed as renewable because the bulk of the heat it delivers comes from a renewable source (the air or ground), not from the electricity itself. A typical CoP of 3 means 1 kW of electrical input gives roughly 3 kW of heat output. That heat-amplification ratio is what puts it in the renewable bracket.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A typical UK domestic solar PV install on a 3–4 bedroom house is roughly what peak power?',
    options: [
      '400 W',
      '4 kW',
      '40 kW',
      '400 kW',
    ],
    correctAnswer: 1,
    explanation:
      '4 kW (sometimes 3.68 kW to keep it under the G98 ≤ 16 A per phase notification threshold) is the standard UK domestic install — typically 10–12 panels at 400 W each. A 40 kW install is a small commercial array; 400 W is one panel. Knowing the typical scale stops you guessing wildly when a customer asks about cost.',
  },
  {
    id: 2,
    question:
      'A customer wants an air-source heat pump. From the electrician’s point of view, what new electrical work is normally involved?',
    options: [
      'A spur off the nearest 32 A ring final, fused down to 13 A at a switched FCU, because a heat pump draws no more than a domestic appliance.',
      'A 16 A lighting-circuit extension in 1.5 mm² T&E, since the heat pump’s controls run at the same load as a few downlights.',
      'A dedicated 32 A radial circuit (often 6 mm² T&E, sometimes 4 mm² depending on the heat pump rating) from the consumer unit, with its own MCB/RCBO and a local rotary isolator beside the outdoor unit.',
      'A three-phase 415 V supply, because every domestic air-source heat pump requires a three-phase upgrade before it can be connected.',
    ],
    correctAnswer: 2,
    explanation:
      'A typical 5–8 kW domestic ASHP draws 8–15 A continuous when the compressor is running, with brief inrush above that. A dedicated 32 A radial in 6 mm² T&E with its own MCB/RCBO and a weatherproof rotary isolator at the outdoor unit is the standard install. A supply upgrade is sometimes needed — but only if the existing main fuse and consumer unit can’t take the additional load on top of the showers, ovens and (eventually) the EV charger.',
  },
  {
    id: 3,
    question:
      'Solar PV and solar thermal both sit on the roof and both run on sunlight. What’s the practical difference for an apprentice electrician?',
    options: [
      'Solar PV and solar thermal are the same product sold under two names; the only difference is the warranty length, so the install work is identical for the electrician.',
      'Solar thermal generates the electricity and solar PV heats the water — the names are simply swapped round from what most customers expect.',
      'Both are purely plumbing jobs; the electrician is never involved in either because all the wiring is pre-terminated at the factory.',
      'Solar PV generates DC electricity (your job) and feeds an inverter; solar thermal heats a glycol fluid loop that pre-heats the hot water cylinder (a plumber’s job, with only minor electrical work for the pump and controller).',
    ],
    correctAnswer: 3,
    explanation:
      'They look similar from the road but the trades are completely different. PV panels are sealed laminates of silicon cells generating DC volts. Thermal panels are flat plates or evacuated tubes carrying a heat-transfer fluid. PV is electrical and falls under BS 7671 Section 712. Thermal is plumbing — the electrician only gets involved with the small pump circuit and the cylinder thermostat.',
  },
  {
    id: 4,
    question:
      'A “domestic” wind turbine — say, on a farmhouse with a tall mast — is typically what power range, and what BS 7671 territory governs the connection?',
    options: [
      'Up to 50 kW; the connection is governed by the same generation rules as PV — BS 7671 Section 551 (low voltage generating sets) and the ENA G98/G99 framework.',
      'Up to 50 kW; the connection has its own dedicated BS 7671 Part 7 section, Section 710 (wind installations), separate from the PV rules.',
      'Up to 500 kW; domestic wind is always three-phase HV work governed by the Distribution Code rather than BS 7671 at all.',
      'Up to 5 kW; the connection is treated as a portable generator under Section 551.4.3 (standby supplies) and never runs in parallel with the grid.',
    ],
    correctAnswer: 0,
    explanation:
      'Small wind sits in roughly the 1–50 kW domestic/agricultural bracket. BS 7671 doesn’t have a dedicated wind section the way it has Section 712 for PV — wind connections go under Section 551 (low voltage generating sets) and the parallel-operation rules in 551.7, plus the ENA G98 (≤ 16 A per phase) or G99 (> 16 A per phase) framework that’s common to all parallel-connected generation.',
  },
  {
    id: 5,
    question:
      'Battery storage (lithium-ion) tied into a domestic PV system — what additional regulation territory does it bring with it?',
    options: [
      'None at all — once a battery is downstream of the PV inverter it is treated as ordinary load and inherits no extra rules beyond the standard ring-final requirements.',
      'It brings DC isolation requirements, additional DC overcurrent protection, fire-segregation considerations and (for grid-tied operation) the same G98/G99 anti-islanding requirements that apply to the PV inverter — typically all wrapped up by a hybrid inverter that handles PV plus battery.',
      'Only a bonding requirement — the battery enclosure has to be supplementary-bonded to the PV array frame and nothing else changes electrically.',
      'Only a labelling requirement — a single warning notice at the consumer unit covers everything, with no impact on isolation, overcurrent or fire protection.',
    ],
    correctAnswer: 1,
    explanation:
      'A battery is another DC source, so it inherits the DC isolation and overcurrent rules from Section 712 (and the broader Chapter 53). For grid-connected operation it has to play by the same G98/G99 anti-islanding rules as the PV inverter — disconnect within 200 ms of losing the grid, do not back-feed during an outage. Most domestic installs use a hybrid inverter that handles PV and battery in one box.',
  },
  {
    id: 6,
    question:
      'Micro-CHP (Combined Heat and Power) at domestic scale — what’s the principle?',
    options: [
      'A bank of PV panels combined with a battery, generating electricity by day and storing it for the evening — the heat is a by-product of the inverter.',
      'A heat pump that runs in reverse during summer, dumping waste heat to the outside air while generating electricity from the temperature difference.',
      'A small generator (often a Stirling engine or fuel cell) burns gas to make heat AND electricity at the same time, with the heat captured for hot water and the electricity used in the house or exported.',
      'A standby diesel generator that only runs in a power cut, providing both heat and electricity to the property during the outage.',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-CHP burns gas (natural gas or LPG) in a Stirling engine or, increasingly, a fuel cell, capturing both the heat (for the central heating and DHW) and the small amount of electricity generated (typically 1–3 kW). Total fuel-to-useful-energy efficiency lands around 90% versus 35–40% for a power station. Common in care homes, hospitals and some larger domestic installs.',
  },
  {
    id: 7,
    question:
      'A small stream runs through a customer’s land. They ask about micro-hydro. What’s the realistic scale for a private install?',
    options: [
      '5–50 MW — micro-hydro at private scale is really a small commercial power station and always needs a transmission-level connection agreement.',
      'Under 1 kW in every case — a domestic stream can only ever run a trickle-charger for a battery, never a grid-tied system.',
      'Fixed at exactly 3.68 kW regardless of the site, because all micro-generation is capped at the single-phase G98 threshold.',
      '1–100 kW depending on the head (vertical drop) and the flow rate — at the small end, the same kind of single-phase grid-connected system as a PV install; at the larger end, three-phase and a full G99 application.',
    ],
    correctAnswer: 3,
    explanation:
      'Micro-hydro at private/farm scale typically sits in the 1–100 kW range. Below ~3.68 kW (16 A per phase) it goes through G98; above that it’s a G99 application to the DNO. It’s niche — most UK sites don’t have the head and flow to make it economic — but it does exist, and where it does it generates 24/7 (unlike PV).',
  },
  {
    id: 8,
    question:
      'Why do we lump heat pumps in with “micro-renewables” when they consume electricity rather than producing it?',
    options: [
      'Because they extract a much larger quantity of heat from a renewable source (the outside air or ground) than the electricity input would deliver if used for direct resistive heating — typically 3:1, so they massively reduce the carbon footprint of heating.',
      'Because the electricity they consume is always supplied from a renewable tariff, so the carbon credit comes from the energy supplier rather than the appliance itself.',
      'Because the refrigerant they use is a renewable gas that is regenerated each cycle, which is what classes them as a renewable technology.',
      'Because they generate more electricity than they consume through a small turbine in the outdoor fan, exporting the surplus back to the grid.',
    ],
    correctAnswer: 0,
    explanation:
      'A 1 kW direct electric heater gives you 1 kW of heat. A heat pump given that same 1 kW of electricity gives you 3+ kW of heat by pumping additional thermal energy from outside. The “renewable” part is the heat scavenged from the air or ground, not the electricity. That’s why they appear in the LO6 list of micro-renewable kit even though they’re technically loads.',
  },
];

const faqs = [
  {
    question: 'Why does PV get its own BS 7671 section but wind doesn’t?',
    answer:
      'Volume. PV is on tens of thousands of UK roofs; small wind is on a few hundred farmhouses and remote sites. The IET Wiring Regulations follow the work — PV got Section 712 because it earned a dedicated section. Wind, micro-hydro and micro-CHP are covered by the more general parallel-generation rules in Section 551 plus the relevant ENA G98/G99 documents.',
  },
  {
    question: 'Are heat pumps actually any good in a UK winter?',
    answer:
      'Air-source heat pumps lose efficiency as outside air drops, but modern units still deliver useful heat down to about −5 °C and below, just with a lower CoP (closer to 2 than 3). Ground-source heat pumps are more stable because the ground stays around 8–10 °C year-round. Either way, the house has to be insulated to a sensible standard or the heat pump struggles — undersized radiators and old single-glazing kill heat pump performance fast.',
  },
  {
    question: 'What’s the typical UK domestic solar PV install size?',
    answer:
      '3.68 kW or 4 kW is the standard. The 3.68 kW figure is deliberate — it sits exactly at 16 A per phase at 230 V, which keeps the install under the G98 notification threshold (informal, post-installation notification to the DNO) rather than triggering the much heavier G99 application process. 10–12 panels at 380–450 W each on a south or south-west facing roof.',
  },
  {
    question: 'Is solar thermal still installed, or has PV killed it off?',
    answer:
      'PV has largely won the domestic argument because it’s more flexible — electricity from PV can heat water (via a diverter), charge a battery, run the lights or be exported, whereas thermal can only heat water. Thermal is still installed where there’s heavy hot water demand (large families, B&Bs) and where the customer specifically wants the longer collector lifespan. Most of the trade now defaults to PV plus a hot-water diverter.',
  },
  {
    question: 'A customer wants a battery without solar panels. Is that a thing?',
    answer:
      'Yes — “time-of-use” battery storage. The battery charges from the grid during cheap-rate periods (often overnight on a tariff like Octopus Go or Cosy) and discharges during peak hours. No PV involved. Same DC-isolation, anti-islanding and grid-connection rules apply as for a PV battery — Section 712 still applies to the parts that overlap, plus G98/G99 for the inverter.',
  },
  {
    question: 'Does battery fire risk genuinely worry the trade, or is it overblown?',
    answer:
      'Lithium-ion fires are rare but real, and when they happen they’re hard to put out (the cells re-ignite). The British Standard fix is fire-segregation (typically a non-combustible enclosure or location, away from sleeping areas, with detection), proper DC overcurrent protection and an MCS-listed installer following the manufacturer’s instructions. The trade takes it seriously — especially after the rise of cheaper imported units.',
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 1"
            title="Types of micro-renewable energies"
            description="Six micro-generation technologies a UK electrician might wire — solar PV, wind, micro-hydro, micro-CHP, heat pumps and battery storage. Each one has a typical scale, a typical UK install context, and a BS 7671 (or ENA) document that governs how it gets connected."
            tone="emerald"
          />

          <TLDR
            points={[
              'PV is the headline act — typical UK domestic install is 3.68 kW or 4 kW, governed by BS 7671 Section 712. Everything else is rarer but you should know it exists.',
              'Wind, micro-hydro and micro-CHP all connect under the general parallel-generation rules (Section 551) plus the ENA G98/G99 framework — same connection paperwork as PV, different prime mover.',
              'Heat pumps don’t generate electricity — they amplify it. 1 kW of electrical input typically becomes 3 kW of heat. They’re renewable because the extra heat comes from the outside air or the ground.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Name the six micro-renewable categories that LO6 covers and what each one does at a high level.',
              'Distinguish solar PV (electrical, your scope) from solar thermal (plumbing, mostly not your scope).',
              'State the typical UK domestic install size for solar PV, an air-source heat pump and a battery storage system.',
              'Identify BS 7671 Section 712 as the dedicated PV section, and Section 551 as the broader parallel-generation section that catches wind, hydro and CHP.',
              'Explain why heat pumps are classed as renewable despite consuming electricity (Coefficient of Performance, heat sourced from air or ground).',
              'Recognise battery storage as a separate DC source that brings its own DC-isolation and overcurrent rules from Section 712.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Where this Sub fits in the qualification</ContentEyebrow>

          <ConceptBlock
            title="Section 5 ended at the meter — Section 6 starts the moment you push power back into the grid"
            plainEnglish="Section 5 walked the supply network from substation to your cut-out. Section 6 turns that round — what happens when the customer’s installation feeds energy back into that same network."
            onSite="Every micro-generation install you ever wire is hanging off the same UK distribution network you studied in §5. Knowing which way the energy is flowing on any given Tuesday afternoon is half the job."
          >
            <p>
              In Section 5 you traced electricity from the power station down to the cut-out — generation,
              transmission, distribution, the meter. In Section 6 you stay at the cut-out and look the other
              way. When a customer fits PV, a battery, a heat pump or any other micro-generator, your
              installation stops being a one-way load. It becomes a small generator in its own right,
              exporting power back up the same cables that fed it.
            </p>
            <p>
              That’s why the rules tighten. The DNO doesn’t want surprises on its network, the customer
              doesn’t want to electrocute the linesman trying to fix a fault on the street, and BS 7671
              doesn’t want you fitting kit that can’t be safely isolated. Sub 6.1 introduces the kit. Sub 6.2
              covers the connection paperwork. Sub 6.3 weighs up the trade-offs.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>1 of 6 — Solar photovoltaic (PV)</ContentEyebrow>

          <ConceptBlock
            title="Solar PV — silicon cells, DC out, an inverter to make AC, fed back through the meter"
            plainEnglish="Sunlight knocks electrons loose in a silicon panel. That gives DC volts. An inverter chops the DC into 230 V 50 Hz AC and pushes it onto the consumer unit’s busbar."
            onSite="The headline install. UK domestic is 3.68 kW or 4 kW (10–12 panels at ~400 W each). Typical kit list: panels, DC string cabling on the roof, a DC isolator, a hybrid or string inverter in the loft or garage, an AC isolator, an export meter or CT clamp, and the consumer unit."
          >
            <p>
              A photovoltaic cell is a thin slice of doped silicon. When daylight hits it, electrons are
              knocked loose and a small DC voltage appears across the cell — typically about 0.5 V. Wire
              60–72 cells in series and you get a panel at roughly 30–50 V open-circuit. Wire 8–12 panels in
              series and you get a “string” at 300–500 V DC, which is then fed into an inverter that
              converts it to grid-synchronous 230 V 50 Hz AC.
            </p>
            <p>Typical UK domestic install:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Power:</strong> 3.68 kW or 4 kW (deliberately just under the 16 A per phase G98
                threshold).
              </li>
              <li>
                <strong>Panels:</strong> 10–12 modules at 380–450 W each, on a south or south-west facing
                pitched roof.
              </li>
              <li>
                <strong>DC voltage:</strong> One or two strings at 300–500 V DC running into the inverter.
              </li>
              <li>
                <strong>Inverter:</strong> Single-phase grid-tied, mounted in the loft or garage.
              </li>
              <li>
                <strong>Connection:</strong> Dedicated MCB/RCBO in the consumer unit, fed with 6 mm² T&amp;E
                or similar.
              </li>
            </ul>
            <p>
              That covers the “ordinary” job. Bigger installs (commercial roofs, ground-mount farms) are
              three-phase and run into G99 territory rather than G98 — covered in Sub 6.2.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.1 (Scope of Section 712)"
            clause="This section applies to the electrical installation of PV generators intended to supply all or part of an installation and to feed electricity into the public grid or local distribution. The electrical installation of a PV generator starts from a PV module or a set of PV modules connected in series with their cables, provided by the PV module manufacturer, up to the user’s installation or the utility supply point."
            meaning={
              <>
                Section 712 is the home regulation for every UK domestic and small-commercial PV install.
                From the panel itself, through the DC string cables, the DC isolator, the inverter, the AC
                isolator and into the consumer unit — all of it falls inside Section 712. Sub 6.2 unpacks the
                specific installation rules. For now, just lock the section number in: PV = 712.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.1."
          />

          <SectionRule />

          <ContentEyebrow>2 of 6 — Small wind</ContentEyebrow>

          <ConceptBlock
            title="Wind turbines — the same principle as a power station, scaled to a farmhouse"
            plainEnglish="Wind spins a rotor, the rotor spins a generator, the generator makes AC. An inverter or rectifier-inverter combination cleans up the output and synchronises it with the grid."
            onSite="Rare on UK domestic installs (most houses don’t have the wind resource or the planning luck), more common on farms and remote estates. Typical small-wind sits at 1–50 kW. Anything ≤ 16 A per phase goes G98; bigger goes G99."
          >
            <p>
              A small wind turbine is mechanically the same beast as the multi-megawatt machines on offshore
              farms — a rotor coupled to a generator on top of a mast — just shrunk to domestic or
              agricultural scale. The output is variable AC (frequency rises and falls with wind speed),
              which is why most modern small-wind systems rectify to DC and then re-invert to grid-synchronous
              230 V 50 Hz, the same way a hybrid PV inverter does.
            </p>
            <p>Typical UK install scenarios:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1–6 kW:</strong> A pole-mounted turbine on an exposed rural property — single-phase,
                G98 territory if ≤ 16 A per phase.
              </li>
              <li>
                <strong>6–50 kW:</strong> Farm-scale on a tall mast — three-phase, G99 application required.
              </li>
              <li>
                <strong>Over 50 kW:</strong> Approaching commercial scale — different planning regime, more
                involved DNO process.
              </li>
            </ul>
            <p>
              Wind doesn’t have a dedicated BS 7671 Part 7 section the way PV does. The connection rules come
              from Section 551 (low voltage generating sets), specifically 551.7 (parallel operation), plus
              the ENA G98 or G99 documents covered in Sub 6.2.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>3 of 6 — Micro-hydro</ContentEyebrow>

          <ConceptBlock
            title="Micro-hydro — falling water, a turbine, a generator. Niche, but it exists."
            onSite="If a customer’s land includes a stream with a useful drop, micro-hydro can produce power 24/7 — unlike PV. Most UK sites lack the head (vertical drop) or the consented water-extraction rights to make it work, but you’ll see it occasionally on rural/upland properties and former mill sites."
          >
            <p>
              A micro-hydro system uses falling water — a stream with a head of a few metres or more — to
              spin a turbine, which spins a generator. Output is then conditioned (rectifier + inverter, just
              like wind) and synchronised to the grid. Realistic domestic/private scale is 1–100 kW depending
              on the available head and flow.
            </p>
            <p>
              Practical reality: micro-hydro is rare in the UK. You need a stream with reliable year-round
              flow, a useful drop, a Water Resources Act abstraction licence (issued by the Environment
              Agency or its devolved equivalents), planning permission, and either a willing landowner or the
              rights to do work on someone else’s. Where all those line up, the kit looks similar to wind from
              the electrician’s point of view: an inverter, a DC isolator, a grid-tie connection, and the same
              G98/G99 paperwork depending on output.
            </p>
            <p>
              Apprentice expectation: know it exists, know the rough scale, know it falls under Section 551
              and ENA G98/G99 like wind does. You won’t commission one in your first five years on site,
              but you should be able to recognise the kit if you ever see it.
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

          <ContentEyebrow>4 of 6 — Micro-CHP (Combined Heat and Power)</ContentEyebrow>

          <ConceptBlock
            title="Micro-CHP — a tiny power station bolted onto your central heating"
            plainEnglish="Burn gas to run a small engine or fuel cell. The engine drives a generator (your electricity). The waste heat from the combustion goes into the central heating and hot water (your heat). Two outputs, one fuel."
            onSite="Common on care homes, hospitals, some commercial premises and a slow-but-growing number of large domestic installs. Power output typically 1–3 kW electrical alongside 5–25 kW thermal."
          >
            <p>
              “Combined Heat and Power” means producing electricity and useful heat from the same fuel. At
              power-station scale that’s gas-turbine CHP. At domestic scale it’s a small Stirling engine or a
              fuel cell sitting where your boiler used to be. You burn natural gas (or LPG, or hydrogen in
              future), capture the heat for the central heating and DHW, and capture the small electrical
              output to run the house or export.
            </p>
            <p>Typical units:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stirling-engine micro-CHP:</strong> ~1 kWe electrical + ~5–12 kWth thermal. Domestic
                scale.
              </li>
              <li>
                <strong>Fuel-cell micro-CHP:</strong> ~0.7–1.5 kWe + ~1–2 kWth. More electrically-biased.
              </li>
              <li>
                <strong>Larger commercial/care-home CHP:</strong> 5–50 kWe + matched thermal. Three-phase,
                G99.
              </li>
            </ul>
            <p>
              From the electrician’s side, the install is similar to PV at the connection point — an inverter, a
              dedicated MCB/RCBO, anti-islanding protection, the same G98 or G99 paperwork. The difference is
              everything upstream of the inverter is a gas appliance, which means a Gas Safe engineer is
              involved as well. CHP is a multi-trade install.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>5 of 6 — Heat pumps (ASHP and GSHP)</ContentEyebrow>

          <ConceptBlock
            title="Heat pumps — they don’t make electricity, they amplify it"
            plainEnglish="A heat pump is a fridge running backwards. A compressor uses electricity to move heat from outside to inside. 1 kW of electricity in, 3+ kW of heat out — the extra comes from the outside air or the ground."
            onSite="The fastest-growing category by install volume. Air-source heat pumps (ASHP) sit outside on a slab; ground-source heat pumps (GSHP) have a ground loop dug in or boreholes drilled. Typical domestic ASHP is 5–12 kW thermal output, drawing 8–15 A continuous when the compressor runs."
          >
            <p>
              The trick is the refrigerant cycle. A compressor drives a refrigerant around a closed loop:
              the refrigerant evaporates outside (absorbing heat from the air or ground), compresses,
              condenses inside (releasing heat to the central heating water), and expands back outside. The
              electricity drives the compressor; the heat itself is moved, not created.
            </p>
            <p>
              The performance metric is the <strong>Coefficient of Performance (CoP)</strong> — heat output ÷
              electrical input. A modern ASHP averages a CoP around 3 across a UK heating season. A GSHP runs
              closer to 4 because the ground stays warmer than winter air. Either way, the renewable bit is
              the heat scavenged from the environment — typically two-thirds to three-quarters of the heat
              delivered.
            </p>
            <p>From the electrician’s point of view:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dedicated circuit:</strong> 32 A radial in 6 mm² T&amp;E (sometimes 4 mm² depending
                on the unit’s rated current and install method) from the consumer unit.
              </li>
              <li>
                <strong>Local isolator:</strong> Weatherproof rotary isolator beside the outdoor unit
                (BS 7671 isolation requirements).
              </li>
              <li>
                <strong>RCD:</strong> Type A typically; check the manufacturer’s instructions because some
                inverters require Type B.
              </li>
              <li>
                <strong>Supply check:</strong> Always do a maximum-demand calc. ASHP plus shower plus oven
                plus EV charger will exceed an 80 A or even 100 A main fuse on some installs.
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

          <ContentEyebrow>6 of 6 — Battery storage</ContentEyebrow>

          <ConceptBlock
            title="Battery storage — the third pillar alongside PV and grid"
            plainEnglish="A big rechargeable battery (almost always lithium-ion these days) sits next to the consumer unit. It charges from PV when the sun’s out or from the grid on a cheap-rate tariff, and discharges when the customer needs power."
            onSite="The bit of the trade that’s changing fastest. Typical domestic install is 5–15 kWh of usable capacity — enough to run a house overnight after a sunny day. Tesla Powerwall, GivEnergy, Pylontech, BYD, Sungrow are all common UK names."
          >
            <p>
              A modern domestic battery is a wall-hung or floor-standing lithium-ion pack rated in kWh
              (energy capacity) and kW (peak power output). It pairs with either:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A hybrid inverter</strong> handling PV plus battery in one box (the most common
                install today), or
              </li>
              <li>
                <strong>An AC-coupled battery system</strong> with its own inverter, sitting alongside an
                existing PV string inverter.
              </li>
            </ul>
            <p>
              The chemistry matters. Lead-acid batteries (open or VRLA) still appear on off-grid systems and
              older installs, but their cycle life is short and their depth-of-discharge is poor.
              Lithium-ion (specifically LiFePO₄ — lithium iron phosphate) has taken over the domestic market
              because it’s safer, lasts longer (5,000–10,000 cycles), and gives near-100% useful depth of
              discharge.
            </p>
            <p>From a regulations point of view, a battery is another DC source. That means:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DC isolation requirements (Section 712.537 territory — same family of rules as PV).</li>
              <li>DC overcurrent protection on the battery cabling.</li>
              <li>Anti-islanding on the inverter (G98/G99 — same as PV).</li>
              <li>
                Fire-segregation considerations — non-combustible enclosure, location away from sleeping
                accommodation, often with a smoke/heat detector nearby.
              </li>
              <li>
                An MCS-listed installer for any install that wants to claim Smart Export Guarantee (SEG)
                payments.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.410.101 (DC side energised even when AC is disconnected)"
            clause="Electrical equipment on the DC side shall be considered to be energized, even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side."
            meaning={
              <>
                The single most important thing to internalise about DC-coupled generation. Pulling the AC
                isolator at the consumer unit doesn’t kill the panels. As long as daylight hits a PV string
                or a battery has charge, the DC side is live. Any work on the DC side — combiner box, string
                cables, isolator, inverter terminals — needs the DC isolator open and proven dead with a
                proper DC voltmeter, not just the AC side off.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.410.101."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Solar thermal — the one that isn’t yours</ContentEyebrow>

          <ConceptBlock
            title="Solar thermal vs solar PV — same shop, different trade"
            onSite="The customer says “solar”. Find out which kind in the first thirty seconds. Thermal panels heat a glycol-water loop that pre-heats the hot water cylinder. PV panels generate electricity. They cost similar, sit on similar bits of roof, and are often confused by customers."
          >
            <p>
              Solar thermal isn’t in your scope as an electrical apprentice — it’s a plumbing job — but it’s
              worth knowing what it is so you can tell a customer apart from a PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar PV:</strong> Sealed silicon panels, electrical output, fed via an inverter into
                the consumer unit. BS 7671 Section 712. Your job.
              </li>
              <li>
                <strong>Solar thermal:</strong> Glazed flat plates or evacuated tubes carrying a glycol fluid
                loop, plumbed to a coil in the hot water cylinder. Plumbing job. The only electrical
                involvement is a small pump (often a 230 V circulating pump or a low-voltage DC pump on a
                PV-powered control board) and a controller.
              </li>
            </ul>
            <p>
              If the customer’s after solar thermal, the right move is to refer them to a heating engineer or
              MCS-registered plumber who installs that kit. You might still wire up the small
              pump-and-controller circuit, but the design and the bulk of the install is plumbing.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Quoting “solar” without checking which kind the customer means"
            whatHappens={
              <>
                A customer rings up: “Can you install solar?” You quote for a 4 kW PV system on the
                assumption. You turn up to survey, and the customer means solar thermal — they want their hot
                water heated, not their lights powered. You’ve wasted half a day, and they’re now confused
                because your quote and their expectation don’t line up.
              </>
            }
            doInstead={
              <>
                On the first phone call, ask: “Are you after solar PV — that’s panels that generate
                electricity — or solar thermal, which heats your hot water?” Most customers haven’t thought
                about the distinction. A 30-second clarifying question saves a half-day site visit and keeps
                you out of a job that isn’t in your scope.
              </>
            }
          />

          <Scenario
            title="A 1990s farmhouse with a stream and an oil boiler — the customer wants “to go renewable”"
            situation={
              <>
                You’re shadowing on a survey at a rural farmhouse. The owner wants to “go renewable” and has
                a vague idea about solar panels. The site has: a south-facing slate roof, a small fast-flowing
                stream with about 8 m of head running through the property, an oil-fired central heating
                system, and an 80 A single-phase supply. He’s asking what the electrician recommends.
              </>
            }
            whatToDo={
              <>
                Walk through the realistic options. PV on the south roof is the obvious headline — a 4 kW
                system would slot under G98. An ASHP could replace the oil boiler — but it’s a big call
                because the radiators and insulation may need upgrading, and the maximum demand check on
                the 80 A supply needs doing carefully (existing loads + ASHP could exceed it). Micro-hydro
                on the stream is technically possible but requires an Environment Agency abstraction licence
                and specialist installers — flag it as “interesting but expensive to investigate, get a
                hydro specialist in”. A battery makes sense alongside the PV. Don’t commit to anything
                without proper design — set the customer’s expectations, get the right specialists involved.
              </>
            }
            whyItMatters={
              <>
                Renewable surveys are where the apprentice-electrician conversation has to be honest. Customers
                hear “renewable” and assume it’s all the same job. Knowing which technology fits which site —
                and which ones aren’t worth pursuing — is what marks out a competent first-year electrician
                from someone repeating sales-brochure copy.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Six categories: solar PV, small wind, micro-hydro, micro-CHP, heat pumps, battery storage. Plus solar thermal as the “not yours” outlier.',
              'PV is the only one with a dedicated BS 7671 Part 7 section (Section 712). Wind, hydro and CHP fall under the broader generation rules in Section 551.',
              'Typical UK domestic PV is 3.68 kW or 4 kW — sized to keep under the G98 ≤ 16 A per phase notification threshold (covered in Sub 6.2).',
              'Heat pumps consume electricity but are renewable because the bulk of their heat output comes from the outside air or ground — typical CoP around 3.',
              'Battery storage is another DC source. It inherits Section 712-style DC isolation rules, plus G98/G99 anti-islanding requirements through its inverter.',
              'Reg 712.410.101: the DC side stays live even when the AC is disconnected. Always isolate AND prove dead at DC before working on PV or battery DC kit.',
            ]}
          />

          <Quiz title="Types of micro-renewables — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section5/5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 UK distribution network components
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Installation requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
