/**
 * Module 3 · Section 5 · Sub 1 — Methods of generating electricity for distribution
 * Maps to City & Guilds 2365-02 / Unit 203 / LO5 / AC 5.1
 *   AC 5.1 — “Identify methods of generating electricity for distribution”
 *
 * Apprentice-quality content. Six grid-scale generation methods used in
 * Great Britain, framed by primary energy source, conversion path, and the
 * practical knock-on effects an electrician needs to know about (peak vs off-peak,
 * DC injection from PV, intermittency, baseload).
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
  'Methods of generating electricity for distribution (5.1) | Level 2 Module 3.5.1 | Elec-Mate';
const DESCRIPTION =
  'Six ways the UK makes the electricity that ends up at your CU — gas, nuclear, wind, solar, hydro and CHP. Why the mix matters for when the electrician works and what protective devices have to handle.';

const checks = [
  {
    id: 'm3s5s1-baseload-vs-peaker',
    question:
      'A power source that runs flat-out 24/7 to supply the constant minimum demand on the grid is called:',
    options: [
      'An intermittent source',
      'A pumped storage plant',
      'A baseload plant',
      'A peaker plant',
    ],
    correctIndex: 2,
    explanation:
      'Baseload = the always-on chunk of generation that meets the minimum demand the grid never drops below. Nuclear is the classic UK baseload source — built to run flat-out for months between refuels. Peakers (open-cycle gas turbines) fire up only at the morning kettle peak.',
  },
  {
    id: 'm3s5s1-pv-output-type',
    question:
      'A 4 kW domestic solar PV array generates electricity at the panel as:',
    options: [
      'To verify operation of emergency lighting for a short period',
      'Task requirements, duration, weather conditions, and user competence',
      'Monitors the scan cycle duration and triggers a fault if it exceeds a configured limit',
      'Low-voltage DC, which an inverter then converts to 230 V AC at 50 Hz',
    ],
    correctIndex: 3,
    explanation:
      'PV cells produce DC at panel voltage (typically a few hundred volts string voltage). The inverter does the heavy lifting — chopping that DC into a 50 Hz 230 V sine wave that synchronises with the grid. That inverter is also why PV installs need RCDs that can handle DC fault currents (Type B or Type F, not plain Type AC).',
  },
  {
    id: 'm3s5s1-pumped-storage',
    question:
      'Dinorwig in Snowdonia is a pumped-storage hydro plant. At 3am, when grid demand is low, it:',
    options: [
      'Pre-calculated transfer functions for heat flow through construction',
      'The delay between sending a message and receiving a response',
      'Improvement Notices, Prohibition Notices, and fines or prosecution',
      'Uses cheap off-peak electricity to pump water UP to its top reservoir',
    ],
    correctIndex: 3,
    explanation:
      'Pumped storage is the grid’s biggest battery. Off-peak (cheap, low demand) it runs the turbines backwards as pumps, lifting water up to the top reservoir. At peak demand (kettle-on after EastEnders) it lets the water back down through the turbines and generates within ~16 seconds of the call. Round-trip efficiency ~75%.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is currently the SINGLE largest source of electricity generation in Great Britain by annual share?',
    options: [
      'Coal',
      'Gas (CCGT)',
      'Nuclear',
      'Onshore wind',
    ],
    correctAnswer: 1,
    explanation:
      'Combined-cycle gas turbine (CCGT) plants still produce roughly a third to 40% of GB electricity in a typical year. Wind is now in second place at around 30%, nuclear sits in the mid-teens, coal is effectively zero (the last coal station, Ratcliffe-on-Soar, closed in 2024). Figures shift year to year but gas is still the swing supplier.',
  },
  {
    id: 2,
    question:
      'Why does a solar PV system on a domestic roof need a Type B (or Type F) RCD on its dedicated supply, not a plain Type AC?',
    options: [
      'It is required by insurance providers to validate claims for stolen or damaged tools',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
      'Because the inverter can produce smooth DC fault current that a Type AC RCD would be blind to',
      'Completion of all inspection and testing, satisfactory results recorded',
    ],
    correctAnswer: 2,
    explanation:
      'A PV inverter can leak smooth (non-pulsating) DC residual current into the AC side under fault. A Type AC RCD only sees pure sinusoidal AC residual current — DC saturates its core and blinds it. BS 7671 Section 712 (PV systems) requires a Type B RCD where DC fault current with a smooth component is possible, or Type F where pulsating DC is.',
  },
  {
    id: 3,
    question:
      'A 1 GW nuclear station like Hinkley Point B (now closed) was operated as baseload. What does that mean in practice?',
    options: [
      'A contactor is generally larger and rated for higher current loads, often with auxiliary contacts',
      'Only as long as there is a legitimate business reason, such as warranty obligations, legal requirements, or ongoing service agreements',
      'A digital meter that records energy use and communicates with the supplier remotely',
      'It ran flat-out at full output continuously, regardless of demand, until it was shut down for refuelling',
    ],
    correctAnswer: 3,
    explanation:
      'Baseload plants run at maximum continuous output for as long as fuel/maintenance allows. Nuclear is the classic baseload — high capital cost, low fuel cost, and physically difficult to ramp up and down. Peakers (gas, hydro, pumped storage) absorb the demand swing instead.',
  },
  {
    id: 4,
    question:
      'Combined Heat and Power (CHP) units on hospitals and factories are different from normal gas turbines because:',
    options: [
      'They capture the waste heat from generation and use it for hot water and heating, raising overall efficiency to ~80%',
      'Set out the H&S arrangements for the project, including site rules, RAMS for high-risk work and emergency procedures',
      'Only as long as there is a legitimate business reason, such as warranty obligations, legal requirements, or ongoing service agreements',
      'It’s the IEC 61010 measurement category — CAT III 600 V or higher for LV distribution work',
    ],
    correctAnswer: 0,
    explanation:
      'A standalone CCGT plant throws roughly half its fuel energy away as heat up the cooling tower. CHP captures that heat for the building’s hot-water and space-heating loop — pushing total useful energy out of the fuel from ~50% to ~80%. Common on hospitals, leisure centres, food factories — anywhere with a constant heat demand.',
  },
  {
    id: 5,
    question:
      'An electrician is asked why the UK grid still keeps several large gas turbines on standby even on a day with strong wind. Best answer?',
    options: [
      'Individual sprinkler heads activate when heated to their threshold, releasing water directly over the fire',
      'Wind is intermittent — output varies with the weather, so dispatchable gas plants must be available to fill any gap and keep frequency at 50 Hz',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
      'Motor to run in REVERSE direction — potentially destructive on pumps, fans, compressors, lifts; trips on overload often follow',
    ],
    correctAnswer: 1,
    explanation:
      'Wind is non-dispatchable — you can’t order more wind. If output drops, the National Energy System Operator (NESO) has to call on dispatchable plant in seconds to keep generation = demand. CCGT, hydro and pumped storage are the usual workhorses for this balancing role.',
  },
  {
    id: 6,
    question:
      'Roughly what share of GB annual electricity now comes from wind (onshore + offshore combined)?',
    options: [
      'About 5%',
      'About 15%',
      'About 30%',
      'About 60%',
    ],
    correctAnswer: 2,
    explanation:
      'Wind crossed 30% of annual generation in the early 2020s and has held there with year-to-year wobble. Offshore alone (Dogger Bank, Hornsea, etc.) is now bigger than onshore. The UK has the largest offshore wind capacity in Europe.',
  },
  {
    id: 7,
    question:
      'Which of the following is NOT a method of large-scale electricity generation currently used on the GB grid?',
    options: [
      'Requirements for test probes and leads',
      'Mechanical fixings with gaskets',
      '1 metre above highest point within 10m',
      'Tidal lagoon at gigawatt scale',
    ],
    correctAnswer: 3,
    explanation:
      'Tidal stream and small wave devices exist (MeyGen in Pentland Firth, EMEC in Orkney) but no gigawatt-scale tidal lagoon has been built — Swansea Bay was rejected in 2018. Tidal is a credible future source but not yet a meaningful share. The other three are all in daily use.',
  },
  {
    id: 8,
    question:
      'Why does the electrician need to care about the generation MIX — not just the wires after the cut-out?',
    options: [
      'Because the mix changes what protective devices have to handle (DC from PV inverters, harmonics from large inverters, voltage stability when wind drops)',
      'Equipment producing smooth DC residual current (e.g. EV chargers without separation, three-phase VSDs/inverters) per Reg 531.3.3 / 722.531.3.101',
      'The locations of points of demand, the loads expected on circuits, daily and yearly variation of demand, special conditions (such as harmonics), and special control or signalling requirements.',
      'Proper preparation and stabilisation, systematic approach following procedures, comprehensive documentation, trend monitoring, and continuous process improvement',
    ],
    correctAnswer: 0,
    explanation:
      'Once you understand WHAT is being injected into the network you understand the kit. PV inverters mean Type B RCDs. Big VFDs and inverters mean harmonics on the supply. Lots of behind-the-meter renewables mean voltage rise on long radial feeders. The mix is a real-world driver of design choices in BS 7671.',
  },
];

const faqs = [
  {
    question: 'Is coal really completely gone from the UK grid?',
    answer:
      'Yes. The last operational coal-fired power station, Ratcliffe-on-Soar in Nottinghamshire, closed at the end of September 2024 — ending 142 years of coal-fired electricity in the UK. Older course material and textbooks still mention coal as a major source, but on the wires today it is zero. Gas (CCGT) is now doing the job coal used to do.',
  },
  {
    question:
      'What is the difference between transmission-connected and distribution-connected generation?',
    answer:
      'Big generators (a 1.6 GW nuclear unit, a 600 MW CCGT, a large offshore wind farm) connect directly to the National Grid transmission network at 275 kV or 400 kV. Smaller generators — onshore wind farms, solar farms, CHP units, micro-renewables on roofs — connect to the distribution network at 33 kV, 11 kV or 400 V. The dividing line is roughly 100 MW. Once distributed generation makes up a big chunk of supply (as it does now in places like East Anglia) the DNO has to actively manage two-way power flow, which is a relatively recent engineering problem.',
  },
  {
    question: 'Why does the UK still bother with nuclear if it is so expensive to build?',
    answer:
      'Three reasons. First, it is genuine zero-carbon baseload — runs through still days and dark nights when wind and PV don’t. Second, the carbon math: a nuclear station built today displaces gas burning for sixty years. Third, energy security — uranium can be stockpiled in a way that gas (delivered live by pipeline or LNG ship) cannot. Hinkley Point C (3.2 GW) is under construction and Sizewell C (3.2 GW) was approved in 2024. Small modular reactors (SMRs) are being proposed by Rolls-Royce and others as a follow-on technology.',
  },
  {
    question: 'How does wind output get measured against demand in real time?',
    answer:
      'NESO (the National Energy System Operator) takes live measurements from every transmission-connected wind farm and forecasts distribution-connected output from weather data. They post a 14-day rolling forecast and a live “fuel mix” dashboard at carbonintensity.org.uk and on the National Grid ESO data portal. On a windy night with low demand, wind can be over 60% of total generation and CCGT plants get curtailed (paid to switch off) or even told to disconnect.',
  },
  {
    question: 'What is the single biggest renewable source that ISN’T wind or solar?',
    answer:
      'Biomass — chiefly Drax in North Yorkshire, which converted four of its six coal units to burn wood pellets. Drax produces around 6% of GB electricity. It’s controversial (the wood pellets are shipped from North America) but counts as renewable under current government accounting because the trees regrow. Hydro is small in GB (~1.5%) because we don’t have the topography of Norway or Switzerland — most usable hydro sites were built in the 1950s and 60s in Scotland and Wales.',
  },
  {
    question: 'Do micro-renewables on domestic roofs count as “generation”?',
    answer:
      'For the electrician on site, yes — they are generation, just very small and embedded in the consumer’s installation rather than on the DNO network. A 4 kW domestic PV array is the same physics as a 50 MW solar farm: PV cell, DC, inverter, AC. We cover micro-renewables in detail in Section 6 (next section). The reason it’s split off from this LO5 is scope: LO5 is about identifying methods at grid scale, LO6 (Section 6) is about installing micro-renewables on a single property.',
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 1"
            title="Methods of generating electricity for distribution"
            description="Six ways the UK makes the electricity that ends up at your CU. The mix matters because it changes when the electrician works (peak vs off-peak), what protection devices have to handle (DC injection from PV inverters), and how the wider network behaves on a still, dark winter evening."
            tone="emerald"
          />

          <TLDR
            points={[
              'Six methods feed the GB grid: gas (CCGT), nuclear, wind, solar PV, hydro, and combined heat and power. Coal closed for good in September 2024.',
              'Nuclear is the always-on baseload. Gas (CCGT and OCGT) is the dispatchable swing supplier. Wind and PV are non-dispatchable — output depends on the weather.',
              'The mix matters to the electrician on site: PV means Type B RCDs, big inverters mean harmonics, lots of behind-the-meter generation means two-way power flow on local feeders.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the six principal grid-scale generation methods used in Great Britain.',
              'Distinguish thermal, nuclear and renewable methods by primary energy source and conversion path.',
              'Explain the difference between baseload, dispatchable and non-dispatchable (intermittent) generation.',
              'State the rough share of GB annual electricity supplied by gas, wind, nuclear and solar.',
              'Describe why solar PV produces DC at the panel and needs an inverter to feed the AC grid.',
              'Recognise why the generation mix is relevant to an electrician’s choice of protective devices on installs.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The big picture before we start</ContentEyebrow>

          <ConceptBlock
            title="The grid runs on a moving mix — not one fuel, six"
            plainEnglish="There is no single way the UK makes electricity. At any moment six methods are running side by side, and the mix between them shifts every minute as demand changes and the wind picks up or drops. The question is never ‘what powers the country?’ — it is ‘what is on the bars right now?’"
            onSite="Open the Carbon Intensity dashboard on your phone (carbonintensity.org.uk or the National Grid ESO app) and watch the live fuel mix change while you have a brew. On a windy March night you’ll see wind over 60% and gas under 10%. On a still January evening it flips to gas over 50% and wind near zero. The mix tells you what kind of grid you’re plugging your install into."
          >
            <p>
              Every electrical generation method on the planet does the same trick at the
              business end: it spins a generator (the AC alternator from Module 2 Sub 5.5) and
              produces three-phase AC. The differences are upstream — what energy is used to
              spin the shaft. That’s what splits the methods into thermal, nuclear, renewable
              and hybrid categories.
            </p>
            <p>
              Solar PV is the one exception. It produces DC directly from sunlight and uses an
              inverter to convert to AC. We’ll cover that separately because the inverter is
              the bit that affects what protective devices the electrician fits.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.acGenerator.url}
            title={videos.acGenerator.title}
            channel={videos.acGenerator.channel}
            duration={videos.acGenerator.duration}
            topic="AC generator basics · Unit 203 AC 5.1"
            caption="The Engineering Mindset shows the rotating-coil-in-a-magnetic-field principle that sits at the business end of every gas, nuclear, wind and hydro plant. Same alternator from Module 2 Sub 5.5, just at GW-scale."
          />

          <SectionRule />

          <ContentEyebrow>Method 1 — thermal (gas)</ContentEyebrow>

          <ConceptBlock
            title="CCGT — the workhorse that replaced coal"
            plainEnglish="Burn natural gas in a turbine. Use the hot exhaust to boil water and run a second steam turbine off the steam. Two turbines from one fuel batch — hence ‘combined cycle’. Roughly 60% efficient, double the old coal stations."
            onSite="CCGT plants are the swing suppliers — operators ramp them up and down minute by minute to balance demand against the wind output. Locations: Pembroke (~2 GW), West Burton, Staythorpe, Connah’s Quay. They run 24/7/365 in winter and get curtailed (paid to back off) on windy summer nights."
          >
            <p>
              <strong>Combined-cycle gas turbines (CCGT)</strong> are the modern thermal plant.
              Natural gas (mostly methane) burns in an aircraft-derivative turbine that drives
              one generator. The exhaust gases — still around 600 °C — pass through a heat
              recovery boiler to raise steam, which drives a second turbine and a second
              generator. Two electrical outputs from one fuel input.
            </p>
            <p>
              Round figures: a typical UK CCGT unit is 400–800 MW, runs at 55–60% thermal
              efficiency, and can ramp from cold to full output in under an hour. CCGTs
              currently supply roughly a third to 40% of GB annual electricity — the biggest
              single share since coal closed in 2024.
            </p>
            <p>
              <strong>Open-cycle gas turbines (OCGT)</strong> are the same idea without the
              steam recovery side — simpler, cheaper, dirtier, and faster to start. They sit on
              standby as peakers, fire up for the morning teatime kettle peak, and shut down
              again. Less common than CCGT but they exist (e.g. Indian Queens in Cornwall).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Method 2 — nuclear</ContentEyebrow>

          <ConceptBlock
            title="Nuclear — the always-on baseload"
            plainEnglish="Split uranium atoms in a controlled chain reaction. The heat boils water, the steam spins a turbine, the turbine spins a generator. Same end as a coal plant — the only difference is what makes the heat. No combustion, no carbon dioxide, just very hot fuel rods in a pressure vessel."
            onSite="Operating UK fleet: Heysham 1 + 2, Hartlepool, Sizewell B, Torness — total ~5 GW. Most are AGRs (advanced gas-cooled reactors) heading for retirement by 2030. The replacements: Hinkley Point C (~3.2 GW, due 2027), Sizewell C (~3.2 GW, approved 2024), and a fleet of small modular reactors (SMRs) being designed by Rolls-Royce. Nuclear share is around 13–15% of annual generation today."
          >
            <p>
              Nuclear plants run as <strong>baseload</strong> — they sit at maximum continuous
              output for as long as the fuel cycle and maintenance schedule allow (often
              eighteen months between refuels). They’re mechanically and economically built to
              run flat-out. Cycling them up and down is technically possible but rarely done in
              the UK; gas does the swing job.
            </p>
            <p>
              The economics are upside-down compared with gas: very high capital cost (Hinkley
              Point C is a £35bn build), very low fuel cost per kWh, very long operating life
              (60+ years). That’s why governments rather than private investors tend to
              underwrite new nuclear — the payback runs to decades.
            </p>
            <p>
              The output at the alternator terminals is identical to a CCGT — 26 kV three-phase
              50 Hz, stepped up to 400 kV by an on-site transformer. Once it’s on the grid the
              electrons don’t carry a label saying which fuel made them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Method 3 — wind</ContentEyebrow>

          <ConceptBlock
            title="Wind — now ~30% of GB annual generation"
            plainEnglish="A propeller. Big one. The wind turns it, a gearbox steps the speed up, a generator at the top of the tower converts the rotation to AC. The output cable comes down the inside of the tower to a transformer at the base, which feeds a substation, which feeds the grid."
            onSite="Onshore: 14+ GW installed capacity, mostly Scotland and Wales. Offshore: 15+ GW and rising fast — Hornsea 2 (1.3 GW), Dogger Bank (3.6 GW under construction, will be the world’s biggest). Wind crossed 30% of annual generation in the early 2020s and has held there. On windy nights it’s often the single biggest source on the bars."
          >
            <p>
              A modern utility wind turbine is huge — Dogger Bank machines have 220 m blades
              and stand higher than the Shard. Each one is rated 13–15 MW. The generator inside
              the nacelle is usually a permanent-magnet synchronous machine, with power
              electronics (a back-to-back converter) on the output to decouple the rotor speed
              from the grid frequency.
            </p>
            <p>
              Wind is <strong>non-dispatchable</strong> — operators can’t order more wind when
              demand spikes. If the wind drops, gas and pumped-storage hydro have to fill the
              gap within seconds to keep frequency at 50 Hz. The grid operator (NESO) does this
              balancing minute by minute through the Balancing Mechanism — paying dispatchable
              plant to ramp up or down on short notice.
            </p>
            <p>
              Offshore export is at high voltage AC for shorter routes (33–220 kV through
              subsea cable to a coastal substation) and HVDC for the longest routes — Dogger
              Bank uses HVDC because the cable run is over 130 km, where AC would lose too much
              to capacitive charging.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Method 4 — solar PV</ContentEyebrow>

          <ConceptBlock
            title="Solar PV — DC at source, inverter to AC"
            plainEnglish="A photovoltaic cell turns sunlight directly into DC electricity (no spinning bits, no heat engine, no combustion). String the cells into panels, the panels into arrays, the arrays into a DC bus. An inverter chops the DC into 50 Hz AC and synchronises it to the grid."
            onSite="UK installed PV capacity is around 17 GW — split roughly half utility-scale solar farms (Cleve Hill in Kent, Owl’s Hatch, etc.) and half rooftop. Annual share is around 5–6% but it peaks much higher on a sunny midday in June (over 25% of demand for a few hours). Critical for the electrician: the inverter is what makes PV behave the way it does electrically."
          >
            <p>
              <strong>Why the electrician needs to care about the inverter:</strong> a PV inverter
              can leak smooth (non-pulsating) DC residual current onto the AC side under
              certain fault conditions. A standard Type AC RCD is blind to that — DC saturates
              the toroid core and freezes the trip. BS 7671 Section 712 (PV systems) requires
              a <strong>Type B RCD</strong> where smooth DC is possible, or Type F where only
              pulsating DC (from a half-bridge inverter) is. This is one of the few places in
              an install where the choice of generation method directly drives the protective
              device specification.
            </p>
            <p>
              Utility solar farms can be 50–350 MW. Cleve Hill in Kent (373 MW) is the largest.
              They use central inverters in containerised cabins rather than the microinverters
              or string inverters you see on roofs. Output is typically combined at 33 kV and
              fed straight into the distribution network at a primary substation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Method 5 — hydro and pumped storage</ContentEyebrow>

          <ConceptBlock
            title="Hydro — small in GB but mighty as the grid’s biggest battery"
            plainEnglish="Run-of-river hydro: water falls through a turbine, the turbine spins a generator. Pumped storage: same machine, but the turbine doubles as a pump that lifts water back up to a top reservoir during cheap off-peak hours, ready to release at the next peak."
            onSite="UK hydro capacity is small — ~1.5% of annual generation, almost all in Scotland and Wales (Loch Sloy, Cruachan, Glendoe, Ffestiniog). The big trick is pumped storage: Dinorwig in Snowdonia (1.7 GW, the famous one) and Cruachan in Argyll (440 MW) act as the grid’s shock absorbers. They can go from standby to full output in under 16 seconds — there is nothing else on the grid that quick."
          >
            <p>
              <strong>Conventional hydro</strong> diverts water from a river or impoundment
              reservoir through a turbine and back to the watercourse. Capacity factor is set
              by rainfall — high in winter, low in summer.
            </p>
            <p>
              <strong>Pumped storage</strong> is the more interesting trick. Two reservoirs at
              different heights. At off-peak (3am, low demand, cheap power) the turbines run
              backwards as pumps, lifting water from the bottom reservoir to the top. At peak
              demand (kettle-on after the news) gravity does its bit: water falls back through
              the same turbines, now generating, into the bottom reservoir. Round-trip
              efficiency is around 75% — you get back roughly three quarters of the electricity
              you put in. Pumped storage exists to time-shift cheap baseload into expensive
              peak supply, and to provide the fastest response on the network when wind output
              drops or a CCGT trips.
            </p>
            <p>
              Dinorwig is hidden inside a Welsh mountain (Elidir Fawr). Six 300 MW Francis-type
              pump-turbines in a cavern the size of a cathedral. Built in the late 1970s when
              the grid needed somewhere to dump cheap nuclear at night and recover it at peak.
              Forty years on, it’s still doing the same job — just soaking up wind output
              instead of nuclear.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ESQCR 2002, Reg. 27 (paraphrased — declared frequency)"
            clause="The frequency of the supply at the supply terminals shall not vary from the declared frequency by more than ±1 per cent unless agreed otherwise."
            meaning={
              <>
                That ±1% on a declared 50 Hz nominal gives an operating window of{' '}
                <strong>49.5 Hz to 50.5 Hz</strong>. NESO actually holds the grid much tighter
                than that — within ±0.2 Hz under normal conditions. When wind drops or a
                generator trips, pumped-storage hydro and gas plants ramp within seconds to
                keep generation matched to demand and frequency inside the legal window. The
                generation mix isn’t just an environmental story — it’s a statutory
                frequency-control requirement.
              </>
            }
            cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 27 — full text on legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Method 6 — combined heat and power (CHP)</ContentEyebrow>

          <ConceptBlock
            title="CHP — squeeze the heat out of the gas as well"
            plainEnglish="A normal gas turbine throws roughly half its fuel energy away as waste heat up the cooling tower. CHP captures that waste heat and uses it for hot water, space heating, or industrial process steam. You get electricity AND heat from the same gas — total efficiency rises from ~50% to ~80%."
            onSite="Common on hospitals (a CHP unit + standby genset is the typical big-building install), data centres, food and chemical factories, large leisure centres, district-heating schemes (Aberdeen, Sheffield, Pimlico). A typical building CHP unit is 100 kWe to 5 MWe — small enough to bolt to an existing boiler house, big enough to cover the building’s base electrical load."
          >
            <p>
              CHP makes economic sense only where there is a constant, year-round demand for
              the heat. A hospital is the classic example — hot water, sterilisation steam and
              space heating run 24/7/365. A factory boiler house with continuous process demand
              is the same idea at industrial scale.
            </p>
            <p>
              Electrically, a CHP unit is just a gas turbine + alternator (or a reciprocating
              gas engine + alternator on smaller units). The thermal kit on the back end —
              heat exchangers, hot-water flow and return loop, sometimes an absorption chiller
              for cooling — is what makes it CHP rather than plain power generation.
            </p>
            <p>
              Most CHP units run grid-connected and export any surplus electricity, but they
              can also run in island mode if the grid drops — useful for hospitals and data
              centres where the heating system needs to keep running through a power cut.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The mix today and the mix coming</ContentEyebrow>

          <ConceptBlock
            title="Where the generation mix is heading — and what it means for the tools"
            plainEnglish="Coal closed in October 2024 — the first time since the Industrial Revolution the UK ran with zero coal generation. Gas is the swing supplier (around a third). Wind is the biggest renewable (around 30%). Nuclear is steady at ~13–15% with a fleet refresh on the way. Solar is growing. The mix is shifting toward inverter-based generation, which is changing how the grid behaves and what protective devices the electrician fits."
          >
            <p>Round-figure GB annual generation share (typical recent year):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gas (CCGT):</strong> ~32–40%
              </li>
              <li>
                <strong>Wind (onshore + offshore):</strong> ~28–32%
              </li>
              <li>
                <strong>Nuclear:</strong> ~13–15%
              </li>
              <li>
                <strong>Imports (interconnectors to France, Norway, Belgium, Netherlands,
                Denmark):</strong> ~10–12%
              </li>
              <li>
                <strong>Biomass (Drax + smaller):</strong> ~5–7%
              </li>
              <li>
                <strong>Solar PV:</strong> ~5–6%
              </li>
              <li>
                <strong>Hydro (run-of-river + pumped storage net):</strong> ~1.5–2%
              </li>
              <li>
                <strong>Coal:</strong> 0% from October 2024 onwards
              </li>
            </ul>
            <p>
              Two trends matter for the tools. First, more <strong>inverter-based generation
              </strong> (PV, battery storage, HVDC links, modern wind) means more harmonics,
              more DC residual current potential, and less rotational inertia in the grid —
              which makes frequency stability harder to maintain. Second, more
              <strong> behind-the-meter generation</strong> (rooftop PV, home batteries) means
              local distribution feeders see two-way power flow for the first time in their
              lives, which changes how voltage drop and protective device coordination have to
              be designed.
            </p>
            <p>
              For the next decade you can expect: more offshore wind, the first new nuclear in
              a generation (Hinkley C, Sizewell C, possibly SMRs), big growth in grid-scale
              battery storage, continued retirement of older CCGTs, and effectively zero return
              of coal.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 — Solar Photovoltaic (PV) Power Supply Systems (paraphrased)"
            clause="Where the PV inverter is not capable of producing smooth DC residual current, a Type A RCD may be sufficient. Where smooth DC residual current is possible (e.g. transformerless inverters), a Type B RCD shall be installed unless the inverter manufacturer’s instructions confirm internal DC fault current detection equivalent to Type B."
            meaning={
              <>
                This is the classic example of generation method driving protective device
                choice. A grid-tied PV array is the only common domestic install where you have
                to think about <strong>DC fault current on an AC circuit</strong>. Get the RCD
                wrong (fitting Type AC where the inverter can produce smooth DC) and the RCD
                will fail to trip on a fault, leaving the touch voltage live. Always check the
                inverter datasheet — most modern transformerless inverters explicitly state
                ‘Type B RCD required’ or ‘internal Type B equivalent fitted’.
              </>
            }
            cite="Paraphrased; see BS 7671:2018+A4:2026, Section 712. Always check the current published wording before specifying."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <CommonMistake
            title="Treating ‘the grid’ as if it were one fuel"
            whatHappens={
              <>
                Apprentice answers an exam question about generation by saying ‘the grid
                produces electricity’ as if the grid were a fuel source. The grid is the wires
                — it doesn’t produce anything. Electricity is produced by the six methods
                covered in this Sub, then injected into the grid. Mixing up the generator (fuel
                + alternator) with the network (transmission + distribution wires) loses easy
                marks and shows up on site when you can’t tell a customer which actual
                plants are running on a given evening. Real example: an electrician quotes a
                customer ‘the grid is mostly gas these days’ during a Heat Pump survey — but
                it’s a windy Sunday and wind is supplying 50% of the mix at that moment. The
                customer has the National Grid Carbon Intensity dashboard open on their
                phone, sees the figures don’t match what you said, and now distrusts every
                other number you quote on the job.
              </>
            }
            doInstead={
              <>
                Use the right vocabulary. ‘Generated by [method] at [location]. Transmitted at
                [voltage] through National Grid wires. Distributed at [voltage] through [DNO]
                network. Delivered at the cut-out at 230 V single-phase.’ Each stage owned by
                a different organisation, governed by different regulations. Section 5 covers
                all four stages — keep them separate in your head. And if you’re going to
                quote live mix figures to a customer, check the Carbon Intensity API or the
                NESO live dashboard first — both are free and update every half hour.
              </>
            }
          />

          <Scenario
            title="Customer asks why their solar export drops to zero on a hot summer afternoon"
            situation={
              <>
                You’re commissioning a 4 kW domestic PV install. The customer mentions that
                their neighbour’s identical system regularly drops to zero export at lunchtime
                on the sunniest days of the year, even though the panels are obviously
                generating. They ask if you’ll have the same problem and what causes it.
              </>
            }
            whatToDo={
              <>
                It’s the inverter doing exactly what BS 7671 and ENA G98/G99 told it to do.
                When local distribution voltage rises above the upper statutory limit (~253 V
                at the supply terminals), the inverter’s anti-islanding and overvoltage
                protection trips it offline to stop pushing the voltage even higher and
                damaging neighbours’ kit. On a sunny midday, with all the rooftop PV in the
                street exporting at once and demand low, the local 400 V feeder voltage rises
                — at some point the first inverter on the feeder hits its trip limit and shuts
                down. Standard behaviour, not a fault. Mitigations are limited to: clipping
                the export limit, installing a battery to soak up the midday generation
                locally, or asking the DNO to look at the feeder voltage profile (rare —
                they’ll just say it’s within the legal window).
              </>
            }
            whyItMatters={
              <>
                This is what ‘non-dispatchable, inverter-based, behind-the-meter generation’
                means in practice. The customer thought they’d bought a fixed asset — 4 kW of
                generation. What they’ve actually bought is up to 4 kW of generation, subject
                to the local feeder voltage and the inverter’s protective settings. The mix
                and topology of generation in their street determines what they actually get.
                That’s why the electrician needs to understand the grid context, not just wire the
                panels up and walk away.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Six generation methods feed the GB grid: gas (CCGT/OCGT), nuclear, wind, solar PV, hydro/pumped storage, and CHP. Coal closed in September 2024.',
              'Gas is the swing supplier (~33–40%). Wind is the biggest renewable (~30%). Nuclear sits steady at ~13–15% as baseload. Solar is ~5–6% annual but spikes much higher midday in summer.',
              'Baseload = always-on (nuclear). Dispatchable = can be ramped up or down on demand (gas, hydro). Non-dispatchable = depends on weather (wind, solar).',
              'Solar PV produces DC at the panel. The inverter converts to 50 Hz AC — and is also why PV installs need Type B (or Type F) RCDs, not plain Type AC.',
              'Pumped storage (Dinorwig, Cruachan) is the grid’s biggest battery: pumps water uphill at off-peak, runs it downhill at peak, ~75% round-trip efficient, full output in under 16 seconds.',
              'The mix matters to the electrician: it changes what’s on the bars when you switch on, what protective devices are needed (Type B RCDs for PV), and how local distribution behaves under high embedded generation.',
            ]}
          />

          <Quiz
            title="Generation methods — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module3/section4/4-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.5 Earth fault loop impedance
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module3/section5/5-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Transmission voltages
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
