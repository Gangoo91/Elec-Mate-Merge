/**
 * Module 3 · Section 5 · Subsection 5 — From generation to your CU
 * Maps to City & Guilds 2365-02 / Unit 203 / LO5 (whole) — synthesises every AC in the LO
 *   AC 5.1 — "Identify methods of generating electricity for distribution"
 *   AC 5.2 — "Identify transmission voltages"
 *   AC 5.3 — "Identify distribution voltages"
 *   AC 5.4 — "State the component parts of the electrical distribution network"
 *
 * Synthesis Sub. Traces one electron from a wind turbine all the way to a
 * customer's kettle. Pulls Subs 5.1, 5.2, 5.3 and 5.4 into a single
 * end-to-end story, with voltage steps, ownership boundaries, frequency
 * stability and a concrete numerical walkthrough at every stage.
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
  'From generation to your CU — full network walkthrough (5.1-5.4) | Level 2 Module 3.5.5 | Elec-Mate';
const DESCRIPTION =
  'LO5 synthesis. Trace one electron from a wind turbine through the National Grid, primary and secondary substations, the DNO service cable, the cut-out and meter, all the way to the customer kettle. Voltage steps, ownership handovers and 50 Hz frequency stability across the chain.';

const checks = [
  {
    id: 'm3s5s5-stepup-purpose',
    question:
      'A 690 V three-phase wind turbine sits next to a transformer that steps the voltage UP to 33 kV before sending it anywhere. Why bother stepping up at the turbine itself?',
    options: [
      'Because turbines cannot generate above 690 V safely.',
      'Because cable losses are I-squared-R — at higher voltage the same power is carried at lower current, so I-squared-R losses on the cable run from the turbine to the substation are far smaller.',
      'Because the National Grid will only accept 33 kV.',
      'Because 690 V is a DC voltage and has to be converted.',
    ],
    correctIndex: 1,
    explanation:
      'Same physics that justifies the 400 kV super-grid (covered in Sub 5.2). Move the same power at higher voltage, the current drops, and line loss falls with the square of the current. A wind farm with cables running kilometres back to the on-shore grid connection has to step up early, otherwise the cable would have to be enormous and the losses crippling.',
  },
  {
    id: 'm3s5s5-ownership-boundary',
    question:
      'On a typical UK domestic supply, who owns the service cable that runs from the secondary substation to the cut-out inside the meter cabinet?',
    options: [
      'The customer owns it because it is on their land.',
      'The energy supplier (e.g. Octopus, British Gas) owns it because they bill for the energy.',
      'The Distribution Network Operator (DNO) owns it — service cable, cut-out and supplier earth terminal are all DNO assets.',
      'The Meter Operator (MOP) owns it as part of the meter installation.',
    ],
    correctIndex: 2,
    explanation:
      'The DNO owns everything from the secondary substation up to and including the cut-out. The MOP owns the meter and the meter-side tails. The customer owns everything from the load-side meter tails onwards. Three-party boundary — covered in detail in Sub 5.6.',
  },
  {
    id: 'm3s5s5-frequency-50hz',
    question:
      'Why does every UK installation have to operate at 50 Hz exactly?',
    options: [
      'Because BS 7671 says so.',
      'Because every generator on the GB grid is synchronously locked together — they all turn in step and produce 50 Hz simultaneously. Drift away from 50 Hz means the generator is no longer in sync and is automatically tripped off.',
      'Because transformers only work at 50 Hz.',
      'Because UK plugs are designed for 50 Hz.',
    ],
    correctIndex: 1,
    explanation:
      '50 Hz is the heartbeat of the entire GB grid. Every synchronous generator from Hinkley Point to a hydro scheme in Snowdonia is mechanically locked to it. If frequency dips (more demand than generation) the National Energy System Operator calls in reserve. If it rises (more generation than demand) generators back off. The acceptable envelope is 49.5 Hz to 50.5 Hz with rare excursions to 49.2 Hz / 50.5 Hz before automatic load shedding kicks in.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In order from generator to customer kettle, what is the typical voltage progression on a UK supply?',
    options: [
      '230 V → 400 V → 11 kV → 33 kV → 132 kV → 400 kV',
      '690 V (or 11-25 kV) → 400 kV (transmission) → 132 kV / 33 kV (sub-transmission) → 11 kV (distribution) → 400/230 V (LV)',
      '400 V → 33 kV → 11 kV → 400 V → 230 V',
      'Voltage stays constant from generator to customer at 230 V.',
    ],
    correctAnswer: 1,
    explanation:
      'Generation terminal voltage (turbine 690 V or larger thermal alternator 11-25 kV) is stepped UP at the station to 400 kV (or 275 kV) for transmission. Stepped DOWN at the GSP to 132 kV / 66 kV / 33 kV. Stepped DOWN again at the primary substation to 11 kV. Stepped DOWN again at the secondary substation to 400 V three-phase / 230 V single-phase. Five transformers in a row, every one stepping the voltage in the right direction for that leg.',
  },
  {
    id: 2,
    question:
      'A customer kettle pulls 13 A at 230 V. Roughly how much current does that same power draw represent on the 11 kV feeder upstream of the secondary substation (ignoring transformer losses)?',
    options: [
      'About 13 A — current does not change through a transformer.',
      'About 0.27 A — power is conserved (P = V x I), so stepping voltage up by ~48x cuts the current by the same factor.',
      'About 600 A — current is multiplied by the voltage ratio.',
      'It cannot be calculated without knowing the cable size.',
    ],
    correctAnswer: 1,
    explanation:
      'P = V x I. Kettle power = 230 V x 13 A = 2990 W (call it 3 kW). On the 11 kV side, ignoring losses: 3000 W / 11000 V = 0.27 A. That is exactly why high voltages are used upstream — the same kilowatt only takes a fraction of an amp at 11 kV, and the I-squared-R loss in the conductor is tiny.',
  },
  {
    id: 3,
    question:
      'Which organisation owns the 400 kV transmission lines (the super-grid pylons) in England and Wales?',
    options: [
      'The local DNO (e.g. UK Power Networks, National Grid Electricity Distribution).',
      'The Meter Operator.',
      'National Grid Electricity Transmission (NGET) — the transmission owner. The independent operator is now the National Energy System Operator (NESO).',
      'The customer\'s energy supplier.',
    ],
    correctAnswer: 2,
    explanation:
      'In England and Wales, NGET owns the 400 kV / 275 kV pylons and substations. In southern Scotland it is SP Transmission (SPT), and in northern Scotland it is Scottish Hydro Electric Transmission (SHET). The system is OPERATED by the independent National Energy System Operator (NESO), which took over from National Grid ESO in 2024.',
  },
  {
    id: 4,
    question:
      'What is the role of the DNO cut-out in the supply chain?',
    options: [
      'It generates electricity.',
      'It is the last DNO-owned device — a sealed BS 1361 / BS 88-3 fuse plus the supplier earth terminal — and the protective device that limits the prospective fault current entering the customer installation.',
      'It is the customer-side main switch.',
      'It steps the voltage down from 11 kV to 230 V.',
    ],
    correctAnswer: 1,
    explanation:
      'The cut-out is the hand-off point. It contains a sealed fuse (typically 60, 80 or 100 A in domestic), provides the supplier earth terminal for TN-C-S or TN-S supplies, and is the last DNO asset before the meter. Cross-ref Sub 5.4 (component parts) and Sub 5.6 (the boundary itself).',
  },
  {
    id: 5,
    question:
      'A wind farm produces almost no power on a still summer afternoon. What happens to the grid?',
    options: [
      'Nothing — the grid stores power in batteries indefinitely.',
      'Frequency starts to dip slightly. NESO automatically calls on reserve generation (gas peakers, pumped storage, interconnector imports) to balance demand. If unbalanced for too long, frequency excursions trigger automatic load shedding.',
      'The grid voltage drops everywhere by 50%.',
      'All wind turbines must be replaced.',
    ],
    correctAnswer: 1,
    explanation:
      'The grid is balanced second-by-second. When wind drops, demand has not changed, so the generators still on-line slow very slightly, frequency dips, and NESO\'s automatic frequency response calls in spinning reserve (Dinorwig pumped storage can be at full output in ~16 seconds). If reserve cannot cover the gap, automatic Low Frequency Demand Disconnection (LFDD) sheds blocks of load to keep the grid stable.',
  },
  {
    id: 6,
    question:
      'On a TN-C-S (PME) supply, where does the customer\'s main earthing terminal (MET) ultimately get its earth reference from?',
    options: [
      'A buried earth electrode at the property.',
      'The supplier earth terminal on the cut-out, which is connected to the combined PEN conductor in the DNO service cable, ultimately referenced back to the multiple earths along the LV distributor and the secondary substation.',
      'The neutral conductor in the meter tails only.',
      'It does not need an earth reference.',
    ],
    correctAnswer: 1,
    explanation:
      'TN-C-S = combined PEN in the supply, separated into N and PE at the customer cut-out / MET. The supplier earth terminal is provided by the DNO and is referenced through the PEN conductor and the multiple earths along the LV network. The classification of the supply (TN-C-S, TN-S, TT) is determined entirely by the supply side — see BS 7671 Reg 312.2.1.',
  },
  {
    id: 7,
    question:
      'What does the National Energy System Operator (NESO) do that NGET does NOT?',
    options: [
      'Owns the 400 kV pylons.',
      'Operates the second-by-second balancing of the GB power system — calling generators on and off, dispatching reserve, managing frequency and constraint payments. NGET is the asset OWNER; NESO is the system OPERATOR.',
      'Owns the local distribution network.',
      'Bills customers for electricity.',
    ],
    correctAnswer: 1,
    explanation:
      'In Great Britain the asset owner and the system operator are separate bodies. NGET / SPT / SHET own the transmission infrastructure. NESO (an independent public body since 2024) operates the system — they are the ones who watch the frequency dial 24/7 and decide which generator turns up next.',
  },
  {
    id: 8,
    question:
      'You start a project on a property fed by an old TN-S supply. You decide to add a sub-main and a 7 kW EV charger. Before designing the new circuits, what does BS 7671 require you to confirm about the existing installation and the supply?',
    options: [
      'Nothing — you only need to design the new circuits.',
      'You must confirm that the rating and condition of the existing equipment, including that of the distributor (cut-out fuse, service cable capacity, declared earth fault loop impedance, declared maximum demand), is adequate for the altered circumstances. Only then do you design the addition.',
      'You must replace the entire installation regardless.',
      'You must remove the old supply and apply for a brand-new connection.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 132.16 (Additions and alterations) — no addition or alteration shall be made to an existing installation unless it has been ascertained that the rating and condition of any existing equipment, including that of the distributor, will be adequate. That is why every project that touches an existing installation starts with a check of the cut-out fuse rating, declared maximum demand and earthing arrangement before any new design work is done.',
  },
];

const faqs = [
  {
    question:
      'Why does the UK keep 50 Hz when other countries (USA, Canada) run at 60 Hz?',
    answer:
      'Pure historical accident. Early 20th-century equipment standardised on 50 Hz in Europe (driven by AEG in Germany) and 60 Hz in North America (driven by Westinghouse). Once national grids were built around those frequencies the cost of changing was astronomical, so each region stuck with what it had. Fifty cycles per second is what every UK transformer, motor and clock-driven device is designed for. Drift from that for more than a few seconds and equipment misbehaves.',
  },
  {
    question:
      'If the National Grid is one connected system, why do we still have power cuts?',
    answer:
      'Because most outages are local — a fallen tree on an 11 kV feeder, a JCB through a service cable, a transformer failure at a secondary substation. The transmission grid almost never fails. The DNO\'s lower-voltage distribution network is where 99% of customer outages occur. Phone 105 — that is the universal UK number that routes you to your local DNO emergency line.',
  },
  {
    question:
      'Who owns "the grid" — is it one company?',
    answer:
      'No. Transmission (400 kV / 275 kV) is owned by NGET (England and Wales), SPT and SHET (Scotland). Distribution (132 kV down to LV) is owned by six DNO groups covering 14 licence areas — UK Power Networks, Northern Powergrid, SP Energy Networks, SSEN, ENWL, NGED. Meters are owned by Meter Operators (MOPs) contracted by your energy supplier. Energy is sold by suppliers (Octopus, British Gas, EDF, etc.). Operation of the system is by NESO since 2024. Five distinct industry layers — easy to muddle up if you have not seen the structure laid out.',
  },
  {
    question:
      'What is the carbon intensity of a kilowatt-hour at any moment?',
    answer:
      'It changes minute-by-minute. NESO publishes a live carbon-intensity figure (in gCO2/kWh) that depends on the current generation mix. On a windy night with low demand it can drop below 50 gCO2/kWh (mostly wind + nuclear). On a still cold winter evening with gas peakers running flat-out it can climb past 350 gCO2/kWh. The "carbonintensity.org.uk" API publishes it free — useful for time-of-use tariff thinking.',
  },
  {
    question:
      'Why does the cut-out fuse limit the customer\'s prospective fault current?',
    answer:
      'Because the cut-out fuse is a high-rupturing-capacity (HRC) device — typically rated to break a fault current of at least 16.5 kA in the case of a BS 1361 100 A fuse. The fault current at the customer cut-out is the cumulative impedance of every step upstream — transformer impedance, LV cable impedance, service cable impedance — and the cut-out fuse is the last protective device sized to break it safely. That is why the prospective fault current (Ipf) reading at the supply origin is one of the values you record on the EIC / EICR.',
  },
  {
    question:
      'When the supplier says "we are upgrading your meter to a smart meter" — what changes about the supply chain?',
    answer:
      'Nothing physical upstream of the meter. The cut-out, supplier earth terminal, service cable, secondary substation — all unchanged. The smart meter itself replaces the analogue meter, communicates over a cellular WAN to the Data Communications Company (DCC) and on to the supplier, and supports time-of-use tariffs and remote disconnection. From the customer\'s installation point of view the meter tails still leave from the same terminals into the same consumer unit.',
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 5"
            title="From generation to your CU — full network walkthrough"
            description="Trace one electron from a wind turbine to the customer's kettle. The complete UK supply network in one Sub. Every voltage step, every owner, every protective device — Subs 5.1, 5.2, 5.3 and 5.4 stitched into one continuous walk."
            tone="emerald"
          />

          <TLDR
            points={[
              'The chain: generation (690 V or 11-25 kV) → step-up transformer → transmission (400 kV / 275 kV / 132 kV) → primary substation (33 kV) → secondary substation (400 / 230 V) → service cable → cut-out → meter → customer MET. Five transformers in a row, every one for a reason.',
              'Three industry layers: NESO operates the system, NGET / SPT / SHET own transmission, six DNO groups own distribution, MOPs own the meters, suppliers sell the energy. Easy to muddle, important to keep straight.',
              'Frequency 50 Hz is the heartbeat — every synchronous generator on the GB grid is mechanically locked to it. The supply form (TN-C-S, TN-S or TT) is determined entirely by the supply side per Reg 312.2.1.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify methods of generating electricity for distribution (AC 5.1) — recap of thermal, nuclear, wind, solar and hydro at the start of the chain.',
              'Identify transmission voltages (AC 5.2) — 400 kV / 275 kV / 132 kV and why high voltage means low loss.',
              'Identify distribution voltages (AC 5.3) — 33 kV / 11 kV / 400 V three-phase / 230 V single-phase and the transformer steps between them.',
              'State the component parts of the electrical distribution network (AC 5.4) — every named component from generator to MET, in order.',
              'Explain frequency stability across the GB grid and how NESO balances demand against generation second by second.',
              'Trace 1 kW of customer load back through every voltage step and explain how prospective fault current at the customer origin is shaped by every impedance upstream.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The chain in one sentence</ContentEyebrow>

          <ConceptBlock
            title="The whole network in one breath"
            plainEnglish="A turbine spins. A generator turns. A transformer steps the voltage up. A pylon carries it across the country. Another transformer steps it down. Another. Another. A cable goes under the street. Through a fuse. Through a meter. Into your customer's kettle."
          >
            <p>
              Every electrician at a customer cut-out is staring at the end of a chain that
              began hundreds of miles away with a fuel source and a spinning shaft. The chain
              has between four and six clearly defined stages, depending on how you count, and
              every one of them is owned by a different commercial entity. By the end of this
              Sub you should be able to draw the chain on the back of a napkin from memory and
              name every component along it.
            </p>
            <p>
              This Sub is the synthesis of Subs 5.1 (generation), 5.2 (transmission), 5.3
              (distribution voltages) and 5.4 (named components). Nothing new is being
              introduced — it is the full picture, end to end, as one continuous story.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 1 — Generation</ContentEyebrow>

          <ConceptBlock
            title="Stage 1: where the electron starts"
            onSite="Most apprentices never see the generator end of the chain. Big mistake to ignore it — the kind of generation in the mix at any moment dictates the carbon intensity of the kilowatt your customer is paying for."
          >
            <p>
              Recall from Sub 5.1: GB electricity comes from six main sources — combined-cycle
              gas turbines (CCGT, the largest dispatchable source), nuclear (baseload), wind
              (onshore and offshore), solar PV, hydro (including pumped storage), and biomass
              / CHP. At the generation site the alternator produces three-phase AC at one of
              two scales:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wind turbines</strong> — typically 690 V three-phase at the generator
                terminals. Modern offshore turbines may run higher, but 690 V is the most
                common.
              </li>
              <li>
                <strong>Large thermal alternators</strong> (CCGT, nuclear, hydro) — typically
                11 kV up to about 25 kV at the alternator terminals. Limited by the
                insulation of the rotor windings and the physics of the slip rings.
              </li>
            </ul>
            <p>
              Whatever the source, the electricity leaves the generator as three-phase 50 Hz
              AC at a relatively modest voltage. It cannot stay that voltage for the journey.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 2 — Step up at the source</ContentEyebrow>

          <ConceptBlock
            title="Stage 2: the first transformer steps the voltage UP"
            plainEnglish="A turbine produces 690 V. The cable run back to shore is 50 km. Sending 1 MW at 690 V means 1450 A in the cable. Sending the same 1 MW at 33 kV means 30 A. Easy choice."
            onSite="On a wind farm the on-turbine transformer lives inside the nacelle (or at the base of the tower) and feeds 33 kV cables along the seabed back to an offshore substation. Same physics that justifies the National Grid voltages — applied right at the source."
          >
            <p>
              Immediately after the alternator, a step-up transformer raises the voltage
              dramatically. For a wind farm the typical jump is 690 V → 33 kV at the turbine,
              then 33 kV → 132 kV at an offshore or onshore substation before injection into
              the transmission grid. For a CCGT plant the jump is 11 kV (or 25 kV) → 400 kV
              direct to transmission.
            </p>
            <p>
              The reason is purely economic and is the foundation of every grid in the world
              (and was hammered home in Sub 5.2): conductor loss is I-squared-R. To carry the
              same kilowatt at half the current quarters the heating loss in the cable. Move
              the same megawatt at thirty times the voltage and the loss collapses by a
              factor of about nine hundred.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 3 — Transmission</ContentEyebrow>

          <ConceptBlock
            title="Stage 3: the National Grid transmission tier"
            onSite="The pylons you see crossing fields are the 400 kV super-grid. The smaller wood-pole or steel-tower lines crossing your customer's village are 11 kV (or sometimes 33 kV) distribution, not transmission. Different owner, different voltage class — common confusion."
          >
            <p>
              The transmission tier (covered in detail in Sub 5.2) carries power across the
              country at three principal voltages:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>400 kV — the super-grid.</strong> The biggest interconnection, used to
                shift gigawatts from generation centres (e.g. North Sea wind, nuclear in the
                south-west) to the demand centres (London, the Midlands).
              </li>
              <li>
                <strong>275 kV — the grid.</strong> Older voltage class, much of it being
                upgraded to 400 kV over time.
              </li>
              <li>
                <strong>132 kV — sub-transmission.</strong> Owned by the transmission
                operators in Scotland and (historically) by DNOs in England and Wales.
              </li>
            </ul>
            <p>
              Three-phase, 50 Hz, no neutral. Distances of 100 miles or more between points
              of consumption are routine. Owned by NGET in England and Wales, SPT in southern
              Scotland, SHET in northern Scotland. Operated as one synchronous interconnected
              system by NESO since 2024.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ESQCR 2002, Reg. 27 (paraphrased — declared frequency)"
            clause="A distributor shall ensure that, at the supply terminals of any consumer's installation, the frequency of the AC supply is maintained at a declared nominal value of 50 Hz and that the variations from the declared value do not exceed plus or minus 1 per cent (with provision for greater excursions in exceptional circumstances)."
            meaning={
              <>
                Every UK supply is contractually 50 Hz, plus or minus 1%. That is what every
                synchronous generator on the GB grid is locked to. Frequency drift is the
                first sign that demand and generation are out of balance — NESO watches it
                second-by-second and dispatches reserve to keep it inside the envelope.
                Equipment design across the entire industry assumes 50 Hz; that is why the
                synchronous-clock motor in your customer's old central heating timer keeps
                accurate time over the long run.
              </>
            }
            cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 27 — full text on legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Stage 4 — Grid Supply Point</ContentEyebrow>

          <ConceptBlock
            title="Stage 4: GSP — the handover from transmission to distribution"
            plainEnglish="The pylons stop at a fenced compound full of huge transformers. Power goes in at 400 kV (or 275 kV) and comes out at 132 kV or 33 kV. That compound is the Grid Supply Point — and the moment the power passes through it, ownership changes from NGET to the local DNO."
          >
            <p>
              A Grid Supply Point (GSP) is a major transmission-to-distribution substation —
              about 300 of them across GB. The transformers are typically rated in the
              hundreds of MVA, oil-filled, with on-load tap changers to maintain output
              voltage as load varies through the day.
            </p>
            <p>
              At the GSP, ownership of the asset and operational responsibility for the
              power it carries transfers from NGET (the transmission owner) to the local DNO
              (the distribution owner). The same kilowatt-hour now sits inside the
              distribution network and will work its way down through the rest of the chain
              under DNO ownership.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 5 — Distribution</ContentEyebrow>

          <ConceptBlock
            title="Stage 5: 33 kV → 11 kV at the primary substation"
            onSite="Primary substations look like a fenced compound about the size of a tennis court — two transformers, switchgear cabinet, oil bund. You drive past them on most A-roads without noticing. The 33 kV feeders come in on overhead lines or underground cables; the 11 kV feeders go out radially to a town or district."
          >
            <p>
              The primary substation steps the voltage down again — typically 33 kV in,
              11 kV out — and feeds a network of 11 kV ring-main or radial feeders that
              cover a town, a city quarter or a rural distribution area. Each primary
              substation feeds a few thousand customers depending on density. Recall Sub 5.3
              for the full distribution voltage hierarchy.
            </p>
            <p>
              The 11 kV network is the workhorse of the distribution system. Most of the
              underground cables you might dig up on a domestic job site at 0.5 m depth, if
              they are not service cables, are 11 kV mains. Sectionalising switchgear at
              strategic points means a fault on one section can be isolated without losing
              the whole feeder.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 6 — Last transformer</ContentEyebrow>

          <ConceptBlock
            title="Stage 6: 11 kV → 400 V three-phase at the secondary substation"
            plainEnglish="The transformer outside your customer's road. The one in a green metal box on the corner of an estate, or up a pole on a rural lane, or inside a brick kiosk on an industrial estate. 11 kV in, 400 V three-phase out. That single transformer feeds maybe 50 to 200 properties."
          >
            <p>
              This is the last transformer in the chain. Eleven thousand volts in on the HV
              side, 400 V three-phase out on the LV side. The secondary winding is connected
              in star (Y), giving you 400 V line-to-line and 400 / sqrt(3) = 230 V
              line-to-neutral — the maths covered in Sub 5.3.
            </p>
            <p>
              Three forms of secondary substation are common in the UK:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ground-mounted (kiosk).</strong> Brick or GRP enclosure on a small
                concrete plinth on a public verge or housing estate. Most common in modern
                suburbs.
              </li>
              <li>
                <strong>Pole-mounted (PMT).</strong> Transformer hung off a wood pole. Common
                in rural areas. Usually feeds a handful of houses on TT supply.
              </li>
              <li>
                <strong>Indoor.</strong> Inside a brick building (often the corner of an
                older industrial estate or block of flats). Higher capacity, dedicated
                customer or shared.
              </li>
            </ul>
            <p>
              Capacity is typically 200, 315, 500 or 800 kVA for ground-mounted units, less
              for pole-mounted. The kVA rating is the limit on how much load all the
              connected customers can pull at once.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 7 — Service cable</ContentEyebrow>

          <ConceptBlock
            title="Stage 7: the service cable from substation to building"
            onSite="The service cable terminates at the cut-out — that is the device labelled with the DNO's name on the front. If the cable is concentric (one big copper centre, neutral / earth woven around it as a screen) it is modern ALPVC. If it is a chunky three-core lead-sheathed thing it is older PILC and probably 30+ years old."
          >
            <p>
              The DNO service cable is what physically delivers the supply from the LV
              distributor (the cable running under the street) into the building. It is a
              DNO asset — the customer does not own it and must not modify it. Two main
              types in the UK:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Concentric ALPVC</strong> — modern. Single-phase typically 25 mm² or
                35 mm² aluminium centre conductor, with the neutral / PEN as a concentric
                wire screen. PVC outer.
              </li>
              <li>
                <strong>Older PILC</strong> — Paper-Insulated Lead-Covered. Three-core
                lead-sheathed cable from the pre-1970s era, still in service in older areas.
                The lead sheath acts as the supplier earth on TN-S supplies.
              </li>
            </ul>
            <p>
              The service cable terminates inside the meter cabinet at the cut-out. The
              cable, the cut-out and the supplier earth terminal are all DNO property. The
              electrician's hands stop here.
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

          <ContentEyebrow>Stage 8 — Cut-out, meter, MET</ContentEyebrow>

          <ConceptBlock
            title="Stage 8: cut-out, meter, MET — the boundary kit"
            plainEnglish="Three pieces of kit live in the meter cabinet. The cut-out (DNO). The meter (MOP). The customer's main earthing terminal (customer-side). Three different owners in 30 cm of cable."
          >
            <p>
              In every UK property the same three components sit at the supply origin, in
              the same order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cut-out</strong> — sealed BS 1361 or BS 88-3 fuse, typically 60 / 80
                / 100 A in domestic. Last DNO asset. Provides the supplier earth terminal
                (TN-C-S or TN-S supplies).
              </li>
              <li>
                <strong>Meter</strong> — owned by the Meter Operator (MOP). Modern smart
                meters (SMETS2) communicate to the supplier via the Data Communications
                Company (DCC) WAN.
              </li>
              <li>
                <strong>MET</strong> — Main Earthing Terminal. The customer-side hub for the
                earthing conductor, the protective conductor of every circuit, and the main
                protective bonding conductors. Required by BS 7671 to exist, be accessible
                and be reliable.
              </li>
            </ul>
            <p>
              These three components are covered in detail in Sub 4.1 (TN / TT systems and
              earthing arrangements), Sub 4.2 (the MET itself) and the next Sub 5.6 (the
              boundary in operational detail). The full handover from DNO to MOP to customer
              all happens in this one cabinet.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 312.2.1 (TN systems — paraphrased extract)"
            clause="TN systems have one point directly earthed at the source, the exposed-conductive-parts of the installation(s) being connected to that point by protective conductors. The arrangements of neutral and protective conductors recognised in A4:2026 are: TN-S (separate neutral and protective conductors throughout); TN-C-S where the combined PEN is separated at or near the consumer's installation — also known as protective multiple earthing (PME); and the TN-C-S sub-arrangement known as protective neutral bonding (PNB), where the PEN is separated at the supply transformer itself and only a separate neutral and protective conductor are run to the installation (typically a single dedicated supply, e.g. an industrial customer or a private network)."
            meaning={
              <>
                The classification of the supply (TN-S, TN-C-S or TT) is decided entirely by
                what the supply side does — the DNO declares it on the connection
                certificate. The electrician designs the installation to suit. You cannot
                turn a TT installation into a TN-C-S one by your own efforts; the supplier
                earth terminal either exists or it does not. See Module 3 Section 4 for the
                full earthing-systems treatment.
              </>
            }
            cite="Verbatim source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 312.2.1 — figures 3.8 (TN-S), 3.9A (TN-C-S / PME) and 3.9B (TN-C-S / PNB) reproduced in the standard."
          />

          <SectionRule />

          <ContentEyebrow>Stage 9 — Customer installation</ContentEyebrow>

          <ConceptBlock
            title="Stage 9: customer-side — meter tails, main switch, CU, final circuits"
            onSite="From the load-side meter terminals onwards, every conductor, terminal, switch and accessory is the electrician's responsibility. That is your scope, your liability and the bit you sign off on the EIC."
          >
            <p>
              Out of the load-side terminals of the meter, the customer installation begins.
              In a typical domestic install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Meter tails</strong> — typically 25 mm² single-core 6181Y, the
                customer-side conductors from the meter to the main isolator or consumer
                unit. Length kept as short as practicable.
              </li>
              <li>
                <strong>Main switch / isolator</strong> — required for safe isolation of the
                whole installation.
              </li>
              <li>
                <strong>Consumer unit</strong> — RCBOs / SPDs / AFDDs as specified by the
                designer, distributing to final circuits (covered in Module 2 Section 6.6 and
                later modules of this course).
              </li>
              <li>
                <strong>Final circuits</strong> — the wiring to socket outlets, lighting,
                showers, ovens, EV chargers and any other fixed load.
              </li>
            </ul>
            <p>
              Every component from the load-side meter terminals onwards is the electrician's
              to design, install, test and certify. The chain has now arrived at its
              destination.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances."
            meaning={
              <>
                Every job that touches an existing installation starts with a check upstream.
                Cut-out fuse rating adequate for the new total demand? Service cable
                adequate? Declared earth fault loop impedance still valid? Earthing
                arrangement (TN-S / TN-C-S / TT) still as recorded? If the answer to any of
                those is "no", the design changes — or you escalate to the DNO. This
                regulation is why the first ten minutes of any addition or alteration are
                spent in the meter cabinet, not at the customer's new circuit.
              </>
            }
            cite="Verbatim source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.16."
          />

          <SectionRule />

          <ContentEyebrow>Frequency and balance</ContentEyebrow>

          <ConceptBlock
            title="Why the whole chain runs at 50 Hz exactly"
            plainEnglish="Imagine ten thousand turbines, all spinning, all locked together by the very physics of the grid they are connected to. If one slows down, the others pull it back up to speed. If demand spikes, every generator on the grid feels it as a tiny braking force, and frequency dips a hair until reserve generation kicks in."
          >
            <p>
              Synchronous generators are mechanically locked to grid frequency. The rotor
              speed is determined by the grid frequency, not the other way around. When
              demand suddenly exceeds generation (someone switched on a kettle, a million
              someones), every generator on the grid simultaneously feels the extra load and
              slows microscopically, dragging the frequency down. NESO sees the dip and
              dispatches reserve — synchronous generators ramp up, pumped storage starts
              generating, interconnectors import.
            </p>
            <p>
              The acceptable envelope is 50 Hz +/- 1% (so 49.5 to 50.5 Hz), per ESQCR Reg 27.
              Outside that envelope, automatic frequency response acts within seconds. At
              48.8 Hz, automatic Low Frequency Demand Disconnection (LFDD) sheds blocks of
              load. The August 2019 power cut (Hornsea-1 wind farm tripped, frequency fell
              to 48.8 Hz, ~1 million customers lost supply) is the textbook example of the
              system doing its job.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ESQCR 2002, Reg. 24 (paraphrased — earthing of supply systems)"
            clause="A distributor shall ensure that there is provided either a connection with earth at or near the source of voltage which is suitable for use as the means of earthing of consumers' installations connected to the distributor's network, or another suitable means of earthing where this is not practicable."
            meaning={
              <>
                The DNO has a statutory duty to provide an earth where it is practicable,
                which is why most modern UK supplies are TN-C-S (PME). It is only TT (no DNO
                earth, customer-installed earth electrode required) where TN-C-S or TN-S
                cannot be safely supplied — typically the end of long overhead rural
                feeders. The form of supply is declared by the DNO; the electrician designs
                to suit. Ties straight back to BS 7671 Reg 312.2.1 on how the chosen system
                is identified and arranged.
              </>
            }
            cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 24 — full text on legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The numerical walkthrough</ContentEyebrow>

          <ConceptBlock
            title="One kilowatt — traced backwards through the whole chain"
            onSite="This is the calculation that makes the chain real. Pick any final circuit in any property, then walk the current back through every transformer to the source. The ratings shrink at every step UP in voltage."
          >
            <p>
              A customer kettle pulls roughly 3 kW (13 A at 230 V). Trace that back through
              every step of the chain — using P = V x I and assuming an idealised lossless
              transformer at each stage:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>At the kettle:</strong> 230 V x 13 A = 3000 W. Cable from CU to
                kettle is 2.5 mm² copper twin-and-earth, no problem.
              </li>
              <li>
                <strong>On the meter tails (still 230 V):</strong> 13 A. Same current. Same
                voltage. 25 mm² 6181Y handles it with margin.
              </li>
              <li>
                <strong>On the LV street distributor (400 V three-phase):</strong> Spread
                over three phases the contribution from this one kettle is roughly 4.3 A on
                its phase conductor. The whole street's 50+ kettles add up to maybe 200 A
                during the morning rush.
              </li>
              <li>
                <strong>On the 11 kV side of the secondary transformer:</strong> 3000 W /
                11000 V = 0.27 A for this one kettle. The whole street worth of load is
                only ~20 A on the 11 kV feeder. That is why a single 11 kV cable can serve a
                whole housing estate.
              </li>
              <li>
                <strong>On the 33 kV side of the primary transformer:</strong> 3000 / 33000
                = 0.09 A. A whole town is only a few hundred amps.
              </li>
              <li>
                <strong>On the 400 kV transmission line:</strong> 3000 / 400000 = 0.0075 A.
                A national level of demand is only a few thousand amps on a single 400 kV
                line. That is why one set of pylons can carry the load of a city.
              </li>
            </ul>
            <p>
              Same kilowatt all the way through. The current is what changes — and that is
              the entire economic and engineering reason the chain exists in the form it
              does.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Common mistake</ContentEyebrow>

          <CommonMistake
            title="Thinking 'the grid' is one supply company"
            whatHappens={
              <>
                A customer asks why their bill is high. You say "phone the grid". They phone
                Octopus, who tell them to phone UK Power Networks, who tell them the meter
                question is for the MOP, who tell them the export rate is set by the
                supplier. Three transferred calls and a frustrated customer because you
                muddled five separate industry roles into one.
              </>
            }
            doInstead={
              <>
                Hold the five layers separately in your head. <strong>NESO</strong> operates
                the system. <strong>NGET / SPT / SHET</strong> own the transmission pylons.
                The <strong>DNO</strong> (one of six groups) owns the distribution network up
                to and including the cut-out. The <strong>MOP</strong> owns the meter. The
                <strong> supplier</strong> sells the energy and bills the customer. Different
                question = different phone call. Knowing which layer is responsible saves the
                customer an hour and saves you looking like you do not know your industry.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Scenario</ContentEyebrow>

          <Scenario
            title="Local DNO outage at 18:00 — what happens to the wider grid?"
            situation={
              <>
                It is 18:00 on a cold January evening. A 33 kV overhead line in your area is
                taken out by a fallen tree. The local primary substation drops the affected
                feeder. About 4,000 properties lose power. Your customer phones, panicked —
                their UPS is keeping the home server alive, the gas combi boiler has lost
                power and stopped, and the customer wants to know whether it is the wider
                grid or just them.
              </>
            }
            whatToDo={
              <>
                Reassure them this is a local distribution fault, not a national grid event.
                Tell them to phone <strong>105</strong> — the universal UK number that
                routes to their DNO emergency line — and check the DNO's online outage map
                for an estimated restoration time. The wider 400 kV grid is not affected;
                NESO will see a tiny drop in demand (4,000 properties is a fraction of a
                percent) and the frequency will not move. The UPS is doing its job because
                supply has gone, full stop. The gas combi boiler will not restart because
                it needs the 230 V mains for its electronic ignition and pump — the gas is
                still flowing but useless without the controls.
              </>
            }
            whyItMatters={
              <>
                Customers usually do not understand that "no power" is a local distribution
                event, not a Met Office headline. Knowing the chain — and being able to
                explain it calmly — is part of being competent.
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The full chain in order: generation (690 V or 11-25 kV) → step-up transformer → transmission (400 / 275 / 132 kV) → GSP → primary substation (33 kV) → secondary substation (11 kV / 400 V) → service cable → cut-out → meter → customer MET.',
              'Five industry layers — NESO operates, NGET / SPT / SHET own transmission, DNOs own distribution, MOPs own meters, suppliers sell energy. Different question = different phone call.',
              'Frequency 50 Hz is the heartbeat (ESQCR Reg 27, +/- 1%). Every synchronous generator on the GB grid is locked to it; reserve and LFDD keep it inside the envelope.',
              'The supply form (TN-S, TN-C-S, TT) is decided by the supply side per BS 7671 Reg 312.2.1 — the electrician designs the installation to suit, not the other way round.',
              'BS 7671 Reg 132.16 forces every addition / alteration to start with a check of the existing installation AND the distributor — cut-out fuse rating, declared maximum demand, earthing arrangement.',
              'The same kilowatt of customer load corresponds to ~13 A at the kettle, ~0.27 A on the 11 kV feeder, and ~0.0075 A on the 400 kV transmission line — same power, lower current at higher voltage. That is the entire reason the chain exists in the form it does.',
            ]}
          />

          <Quiz title="Generation to your CU — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section5/5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 UK distribution network components
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section5/5-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 DNO boundary and customer interface
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
