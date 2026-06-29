/**
 * Module 3 · Section 6 · Subsection 2 — Solar PV deep dive
 * Maps to City & Guilds 2365-02 / Unit 203 / LO6 / AC 6.1, 6.2
 *   AC 6.1 — "Describe types of micro-renewable energies"
 *   AC 6.2 — "Identify requirements for installation of micro-renewable energies"
 *
 * The dedicated PV deep dive — silicon physics, panel construction, string
 * design, inverter topology, BS 7671 Section 712 reg-by-reg, MCS scheme,
 * G98 / G99 paperwork, and the failure modes you actually see on UK roofs.
 * Sits between Sub 6.1 (overview) and Sub 6.4 (general install requirements).
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
  'Solar PV deep dive (6.1, 6.2) | Level 2 Module 3.6.2 | Elec-Mate';
const DESCRIPTION =
  'Solar PV in detail — silicon p-n junctions, panel construction, string design, MPPT, inverter topology, BS 7671 Section 712 reg by reg (DC always live, IMD, Type B RCD, isolation), MCS scheme, G98 / G99 paperwork and the real failure modes on UK roofs.';

const checks = [
  {
    id: 'pv-dc-still-live',
    question:
      'A PV inverter has been switched off and the AC isolator at the consumer unit is open. The customer wants you to swap a faulty MC4 connector on a string cable on the roof. What is the situation on that DC string in daylight?',
    options: [
      'It is dead — opening the AC isolator disconnects the inverter, which clamps the DC side to zero and makes the string safe.',
      'It is still energised — in daylight the string sits at its open-circuit voltage, so isolate at DC and prove dead first.',
      'It is at a safe extra-low voltage — a single string only ever reaches about 50 V DC, so the MC4 can be swapped live.',
      'It is dead on a cloudy day — diffuse light gives no usable output, so the string only needs isolating in direct sunshine.',
    ],
    correctIndex: 1,
    explanation:
      'Photons hit the cells and electrons flow — the panel is a current source the moment it sees daylight. The inverter being off and the AC being isolated has no effect on the DC side at all. Reg 712.410.101 spells this out: "Electrical equipment on the DC side shall be considered to be energized, even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side." Always isolate at DC, prove dead with a DC voltmeter, and where possible cover the panels.',
  },
  {
    id: 'pv-rcd-type',
    question:
      'You are wiring the AC supply circuit from a new domestic PV inverter into the consumer unit. The inverter manufacturer says nothing about RCD type in its installation manual. What does Reg 712.531.3.5.1 say you must fit?',
    options: [
      'A Type AC RCD, because the AC supply circuit only ever carries sinusoidal current and the DC side is separate from it.',
      'No RCD at all — Section 712 prohibits RCDs on the AC side of a PV inverter, as tripping would stop the array exporting.',
      'A Type B RCD by default, unless the inverter provides separation or the manufacturer states a Type B is not required.',
      'A Type A RCD in every case, since Type A covers AC plus pulsating DC — the worst a transformerless inverter can leak.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 712.531.3.5.1 sets the default at Type B because a transformerless PV inverter can leak DC fault current onto the AC side, and DC saturates the toroidal core of a Type AC or Type A device — blinding it to genuine AC faults. The three exceptions are listed verbatim in the reg: simple separation inside the inverter, transformer windings between inverter and RCD, or an explicit manufacturer statement. With nothing in the manual, you fit Type B.',
  },
  {
    id: 'pv-g98-vs-g99',
    question:
      'A customer wants a 5.5 kW single-phase PV install on her roof. Roughly 24 A per phase at 230 V at full output. Which DNO process applies?',
    options: [
      'G99 — full pre-application to the DNO before install, because the per-phase output exceeds 16 A.',
      'G98 — informal notification within 28 days of commissioning, because all single-phase domestic PV stays inside G98.',
      'No DNO process — single-phase installs below 10 kW are exempt from any notification to the network operator.',
      'Part P notification only — the building control submission covers the grid connection, so no separate DNO process is needed.',
    ],
    correctIndex: 0,
    explanation:
      'ENA G98 covers small generating units up to 16 A per phase at 230 V (3.68 kW single-phase, 11.04 kW three-phase) and uses an informal notification process — the installer connects, then notifies the DNO. Above that threshold, G99 applies — a full application has to be made to the DNO before installation, with type-test certificates for the inverter, single-line diagram and protection settings. 5.5 kW at 24 A per phase is firmly G99 territory. This is also why the standard "stock" UK domestic install is sized at 3.68 kW — it sits exactly at 16 A per phase and stays inside G98.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A PV cell is essentially a silicon p-n junction. What physically happens when a photon of sunlight strikes the cell?',
    options: [
      'The photon heats the silicon, and the temperature rise drives a thermoelectric current the way a thermocouple does.',
      'The photon lifts an electron across the band gap; the junction field separates it, giving about 0.5–0.6 V per cell.',
      'The photon ionises the air gap between the glass and the cell, and the resulting plasma carries the current out.',
      'The photon is absorbed by a thin copper coil on the cell, inducing an AC the inverter then rectifies to DC.',
    ],
    correctAnswer: 1,
    explanation:
      'Photovoltaic action is quantum, not thermal. A photon with energy above the silicon band gap (around 1.1 eV) frees an electron from a covalent bond, leaving a positive "hole". The built-in electric field at the p-n junction separates them — electron one way, hole the other — and that charge separation appears as a small DC voltage at the cell terminals. Wire 60–72 cells in series and you get a panel at roughly 30–50 V open circuit.',
  },
  {
    id: 2,
    question:
      'A typical UK domestic PV install uses a string of ten 400 W panels in series. Each panel has Voc around 45 V and Isc around 11 A. What rough string voltage and string current go into the inverter at standard test conditions?',
    options: [
      'Around 45 V open-circuit and 110 A short-circuit — wiring the panels in series adds the currents together while the voltage stays the same as a single panel.',
      'Around 450 V open-circuit and 110 A short-circuit — series wiring adds both the voltages and the currents of the ten panels.',
      'Around 450 V open-circuit and 11 A short-circuit — series adds voltage, parallel adds current. One string of ten panels means voltages add but the current stays the same as a single panel.',
      'Around 45 V open-circuit and 11 A short-circuit — putting panels in series makes no difference to either figure, so the string reads the same as one panel.',
    ],
    correctAnswer: 2,
    explanation:
      'Series wiring (which is what "string" means) adds voltages but the current through every panel in the string is identical — same as series resistors in Module 2. Ten panels at 45 V each gives roughly 450 V open-circuit, with the string current capped at about 11 A — the Isc of any single panel. The inverter\'s MPPT then operates the string at its peak power point (usually 35–40 V per panel under load), pulling close to the rated 400 W from each.',
  },
  {
    id: 3,
    question:
      'What is the role of an MPPT (Maximum Power Point Tracker) inside a string inverter?',
    options: [
      'It steps the 350 V DC string up to a higher voltage before the inverter, acting as a DC-to-DC transformer stage.',
      'It limits the string current to protect the panels, cutting the array off as short-circuit current is approached.',
      'It synchronises the inverter output to the grid frequency, locking the 50 Hz waveform so the array can export safely.',
      'It continuously adjusts the string operating voltage to hold peak power as light, temperature and shade change.',
    ],
    correctAnswer: 3,
    explanation:
      'A panel\'s I-V curve is non-linear. There is one operating point where voltage times current is maximum — the MPP. The MPPT algorithm (perturb-and-observe, incremental conductance) nudges the operating voltage up and down a few times a second, watches whether output power rises or falls, and homes in on the peak. As clouds, temperature and shading change the curve, the MPPT keeps tracking.',
  },
  {
    id: 4,
    question:
      'When does a Type B RCD become mandatory on the AC supply circuit of a PV inverter under BS 7671:2018+A4:2026?',
    options: [
      'Type B is the default, unless the inverter provides separation or the manufacturer states Type B is not required.',
      'Type B is only ever mandatory on three-phase PV installs; single-phase domestic inverters may always use a Type A.',
      'Type B is required only where the array exceeds 16 A per phase, mirroring G98/G99; below that a Type AC is acceptable.',
      'Type B is never required on a PV install, because the inverter’s internal protection replaces the need for any RCD.',
    ],
    correctAnswer: 0,
    explanation:
      'A transformerless PV inverter can leak smooth DC fault current onto the AC side. Smooth DC saturates the toroidal core of a Type AC or Type A RCD and blinds it to AC faults at the same time. Reg 712.531.3.5.1 sets Type B as the default, with the three exceptions listed verbatim: simple separation in the inverter, transformer separation in the install, or a manufacturer statement. If the manual is silent, you fit Type B.',
  },
  {
    id: 5,
    question:
      'An IMD (Insulation Monitoring Device) is required by Reg 712.421.101.1 on the DC side of most PV installs. What does it actually do?',
    options: [
      'It measures the irradiance on the array and adjusts the export limit, throttling the system on bright days.',
      'It continuously monitors insulation resistance between the DC conductors and earth, alarming if it drops.',
      'It monitors grid voltage and frequency and disconnects the inverter within 200 ms of a loss of mains.',
      'It tracks the maximum power point of the string, nudging the voltage to keep the panels at peak output.',
    ],
    correctAnswer: 1,
    explanation:
      'PV strings sit at hundreds of volts DC for 25 years on a roof. A degraded MC4 connector or a chafed cable can drop insulation resistance from megohms to kilohms before any visible sign. An IMD (BS EN 61557-8) measures that resistance continuously and raises a fault when it drops below a threshold — well before insulation breaks down enough to sustain a DC arc. Most modern inverters integrate the IMD function (per the Reg 712.421.101.1 / 712.538.101 note), so it is not always a separate box.',
  },
  {
    id: 6,
    question:
      'Anti-islanding is a key safety requirement on every grid-tied PV inverter. What is it?',
    options: [
      'It is the inverter’s ability to keep the house powered during a grid outage by forming its own island of supply.',
      'It is the physical separation of the DC array from the AC side by an isolating transformer inside the inverter.',
      'The inverter must detect loss of mains and disconnect within roughly 200 ms, so it never back-feeds a dead network.',
      'It is the earthing arrangement that keeps the metal array frame at the same potential as the building structure.',
    ],
    correctAnswer: 2,
    explanation:
      'If the grid drops out and a PV inverter keeps energising the local conductors, you have created an unintended "island" of live network. The DNO\'s linesman, expecting dead cables, can be killed. Inverters meeting BS EN 50549-1 (the standard called up by ENA G98 for ≤ 16 A per phase generators and by Reg 551.7.4) detect the loss of mains by frequency, voltage and impedance shifts and disconnect within roughly 200 ms. This is the most safety-critical software in the inverter.',
  },
  {
    id: 7,
    question:
      'A customer wants a PV install but does not want to pay for an MCS-certified installer. They have asked you (a non-MCS electrician) to fit it. What are the two practical consequences?',
    options: [
      'The install becomes illegal and cannot be grid-connected, and the customer’s home insurance is automatically void.',
      'The DNO will refuse the G98 notification outright, and no Part P notification can be made for building control.',
      'There are no consequences — MCS only affects whether the installer can advertise as accredited to customers.',
      'The customer loses Smart Export Guarantee (SEG) eligibility, but G98/G99 and Part P notification duties still apply.',
    ],
    correctAnswer: 3,
    explanation:
      'MCS (Microgeneration Certification Scheme) is the consumer-protection scheme that gates access to SEG export payments. No MCS = no SEG, regardless of how compliant the install is. The DNO notification (G98 informal or G99 formal) and Part P notification are separate legal duties that apply to anyone fitting the system. Most professional PV installers carry MCS purely so their customers can claim SEG.',
  },
  {
    id: 8,
    question:
      'You are doing an EICR on a 1990s house that had PV added in 2014. You spot that the DC isolator on the side of the inverter is a standard AC rotary switch, not a PV-rated DC isolator. Why is this a Code C2?',
    options: [
      'An AC rotary switch has no DC breaking capacity — opening it on load draws a DC arc that can sustain and start a fire.',
      'An AC rotary switch is rated for only 230 V whereas the DC string runs at 400 V, so it is the voltage rating that fails.',
      'An AC switch has no neutral pole, so it cannot break both DC conductors at once, leaving one leg live after operation.',
      'An AC switch lacks an integral fuse, so it gives no overcurrent protection for the string, which is what fails the install.',
    ],
    correctAnswer: 0,
    explanation:
      'AC arc current passes through zero 100 times a second, which is when a normal switch quenches. DC has no zero crossing — the arc has to be physically stretched and cooled by the switch design itself. AC-only switches lack the arc chutes and contact gap geometry to do that, and the arc can sustain inside the switch and ignite the enclosure. PV DC isolators are purpose-built to BS EN 60947-3 with proper DC ratings. A non-DC isolator on a PV string is a real fire risk — the kind of thing an EICR is meant to catch.',
  },
];

const faqs = [
  {
    question: 'Why are most UK domestic installs deliberately sized at 3.68 kW?',
    answer:
      '3.68 kW is exactly 16 A at 230 V — the upper boundary for ENA G98, the informal post-installation DNO notification process. Stay at or below 16 A per phase and you can install first and notify within 28 days. Go a single watt above and you have to apply to the DNO under G99 before you start, wait for their decision, and supply type-test certificates and protection settings. The 3.68 kW figure has shaped the entire UK domestic PV market for over a decade.',
  },
  {
    question: 'String inverter, microinverter, hybrid inverter — when does each suit?',
    answer:
      'A string inverter is one box at the bottom of the run that takes a whole string at 300–500 V DC and inverts it to 230 V AC. Cheapest and most common, but a single shaded panel drags down the whole string. Microinverters sit under each panel, each one inverting that one panel\'s DC to AC — much better for partially shaded roofs and for installs where panels face different directions, but more expensive. Hybrid inverters are string inverters with a built-in battery port and battery management, used when PV and storage are installed together (or storage is being added later). Most modern UK installs are hybrid by default — it future-proofs the system for batteries.',
  },
  {
    question: 'How long do PV panels actually last?',
    answer:
      'Most tier-one mono-crystalline panels carry a 25-year linear performance warranty — typically guaranteeing at least 80 % of nameplate output at year 25. In reality, panels degrade roughly 0.5 % per year, and well-installed panels are still producing useful power at 30 years. The weak link is usually the inverter (10–15 year typical service life) and the connectors (UV-degraded MC4s on bargain installs), not the panels themselves.',
  },
  {
    question:
      'A customer asks why their PV system produces so little in winter. What is the honest answer?',
    answer:
      'In the UK a typical 4 kW PV system produces around 3,500–4,000 kWh per year, but only roughly 10 % of that arrives in November–January combined. Sun angle is low, days are short, and cloud cover is heavy — even south-facing panels deliver under 100 W on a wet December afternoon. PV is a strong summer asset and a weak winter one. Set the customer\'s expectation at the quote stage so they are not disappointed in February.',
  },
  {
    question: 'What is the realistic payback on a UK domestic PV install today?',
    answer:
      'For a £5,000–£7,000 install on a 4 kW system, with current SEG rates around 5–15 p/kWh and electricity costs around 25–30 p/kWh, payback typically lands at 9–12 years. It is faster if the household uses most of its generation directly (running washing/EV charging during the day) and slower if most generation is exported. Adding a battery shortens the payback only when daytime self-consumption is genuinely low — otherwise it lengthens it.',
  },
  {
    question: 'Why does PV pose a fire risk and what are the main failure modes to look for?',
    answer:
      'The DC side runs at hundreds of volts, often for 25 years, in roof conditions that include UV, thermal cycling, water ingress and rodents. The big failure modes are: (a) loose or corroded MC4 connectors arcing under load — the leading cause of PV fires; (b) DC isolators that have been fitted to AC rotary switches not rated for DC; (c) inverter failure (capacitor end-of-life, fan failure leading to overheat); and (d) backsheet delamination on cheap panels, allowing water onto the cells. An IMD plus a periodic visual inspection of the DC isolator and connectors catches most of it.',
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 2"
            title="Solar PV deep dive"
            description="Solar PV is the dominant micro-generation install in the UK. Most other micro-renewable kit is rare — PV is what an electrician will likely see weekly. This Sub goes deep on the silicon, the strings, the inverters, BS 7671 Section 712 reg by reg, and the failure modes you actually meet on UK roofs."
            tone="emerald"
          />

          <TLDR
            points={[
              'A PV cell is a silicon p-n junction — photons knock electrons across the band gap, the junction field separates them, and you get roughly 0.5 V DC per cell. 60–72 cells in series make a panel; 8–12 panels in series make a string at 300–500 V DC.',
              'BS 7671 Section 712 is the home regulation. The four most-cited regs: 712.410.101 (DC always live), 712.421.101.1 (IMD required), 712.531.3.5.1 (Type B RCD by default on the AC side), 712.537 (DC isolation kit must be DC-rated, padlock open carriers).',
              'MCS is the gateway to SEG export payments. ENA G98 covers up to 16 A per phase (3.68 kW single-phase) on informal post-install notification; G99 covers everything bigger and is a full pre-install application.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain how a silicon PV cell converts a photon into a small DC voltage and how cells combine into panels and strings.',
              'Describe the maximum power point and the role of an MPPT inside a string inverter, and contrast string, microinverter and hybrid topologies.',
              'Cite the four critical Section 712 regulations (712.410.101, 712.421.101.1, 712.531.3.5.1, 712.537) and explain what each one is protecting against.',
              'Distinguish ENA G98 from G99 by the 16 A per phase threshold and explain why the UK standard install sits at 3.68 kW.',
              'Describe anti-islanding (loss-of-mains protection) and the roughly 200 ms disconnection requirement under BS EN 50549-1.',
              'Identify the common PV-specific failure modes — DC connector arcing, AC-only DC isolators, inverter end-of-life and backsheet delamination — and what an EICR should pick up.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Where this Sub fits"
            plainEnglish="Sub 6.1 introduced the six families of micro-generation. This Sub takes one of them — solar PV — and unpacks it from the silicon up."
            onSite="PV is the install you will actually see week-in, week-out. Wind, micro-hydro and CHP are rare in domestic work. Heat pumps and batteries are growing fast (Sub 6.3 covers batteries). Get PV solid first — most of the regulation framework for grid-tied generation generalises from it."
          >
            <p>
              Sub 6.1 walked through six categories of micro-generation with a paragraph on each. PV got
              the headline because it is genuinely the dominant install — tens of thousands of UK roofs
              go up every year, against a few hundred small wind turbines and a handful of micro-hydro
              schemes. This Sub stays on PV from physics to paperwork.
            </p>
            <p>
              Sub 6.3 does the same for battery storage — the next-fastest-growing micro-gen. Sub 6.4
              covers the general install requirements that apply across all micro-generation. The
              Section 712 regulations covered here also reappear in Sub 6.3 because batteries inherit
              the same DC-side rules as PV.
            </p>
          </ConceptBlock>

          <ContentEyebrow>How a PV cell works</ContentEyebrow>

          <ConceptBlock
            title="Silicon, photons, and the p-n junction"
            plainEnglish="A photon of sunlight hits a silicon cell, gives an electron enough energy to break free from its atom, and the built-in junction field sweeps it through the external circuit. Net result: a small DC voltage."
            onSite="You do not need to remember the quantum mechanics on site. You do need to remember that the cell is a current source, in daylight, the moment it sees light. There is no off switch."
          >
            <p>
              A PV cell is a thin wafer of silicon (typically about 180 microns thick) doped on one
              face to be n-type (extra free electrons) and on the other face to be p-type (extra
              holes — missing electrons). At the boundary between them sits a p-n junction with a
              built-in electric field across it.
            </p>
            <p>
              When a photon of sunlight strikes the silicon and carries enough energy to bridge the
              roughly 1.1 eV band gap, it knocks an electron out of a covalent bond, leaving behind
              a positively charged hole. The junction field sweeps the electron one way and the
              hole the other. Wire the front and back of the cell to a circuit and the freed
              electrons flow round the external loop — a small DC current at roughly 0.5–0.6 V per
              cell.
            </p>
            <p>
              Two takeaways. First, the cell is a current source — its short-circuit current scales
              with how much light is falling on it, while its open-circuit voltage stays roughly
              constant across a wide range of irradiance. Second, the cell never switches off. As
              long as photons land on it, electrons flow. Cover the panels, shade them with a
              tarpaulin, work at night — those are your only real ways of de-energising a string.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="From cell to panel — mono vs poly, 60 vs 72 cells"
            onSite="Modern UK domestic installs are almost all mono-crystalline panels at 60 or 72 cells, 380–450 W each. Poly is older, slightly cheaper, slightly less efficient — you will see it on retrofits from the 2010s but rarely on new jobs."
          >
            <p>
              A single cell at 0.5 V is not much use. Wire 60 or 72 cells in series and you get a
              panel at roughly 30–45 V open-circuit and 8–11 A short-circuit, sealed under
              tempered glass with an EVA encapsulant and a polymer backsheet. Two cell technologies
              dominate:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mono-crystalline</strong> — each cell cut from a single silicon crystal
                ingot. Higher efficiency (typically 20–22 % at the panel level), uniform black
                appearance, slightly more expensive. The default on new UK installs.
              </li>
              <li>
                <strong>Poly-crystalline</strong> — cells cast from multiple silicon crystals,
                visible blue grain pattern. Slightly cheaper, slightly lower efficiency
                (16–18 %). Mostly seen on installs from the 2010s.
              </li>
            </ul>
            <p>
              A typical residential panel today is 60-cell or 72-cell, rated at 380–450 W under
              Standard Test Conditions (1000 W/m², 25 °C cell temperature, AM1.5 spectrum). The
              actual operating point on the roof is below STC most of the time — colder weather
              raises the voltage, hotter weather drops it, partial shade collapses the output of
              any cell in the string that gets shaded.
            </p>
          </ConceptBlock>

          <ContentEyebrow>Strings, MPPT and the inverter</ContentEyebrow>

          <ConceptBlock
            title="String wiring — series adds voltage, parallel adds current"
            plainEnglish="One panel is too low a voltage to invert efficiently. So you wire 8–12 panels in series — voltages add — to get a string at 300–500 V DC. That is what feeds the inverter."
            onSite="Same physics from Module 2 Section 4. Series resistors add. Series PV panels add voltage but the current through every panel in the string is the same — limited by the lowest-output panel. That is why partial shade on one panel dropkicks the whole string output."
          >
            <p>
              A string is the series chain of panels feeding one MPPT input on an inverter. Wire
              ten 400 W panels in series and you get a string of roughly 450 V open-circuit and
              11 A short-circuit. The inverter operates the string somewhere below open-circuit
              voltage (typically 350–400 V under load) at close to short-circuit current — the
              voltage and current at the maximum power point.
            </p>
            <p>
              Multiple strings can be wired in parallel into one inverter (parallel adds current,
              voltage stays the same), giving more power without raising string voltage above the
              inverter’s DC input rating. Reg 712.431.101 sets out the protection rules for
              parallel strings — for two strings or fewer, no string fuse is required; above that,
              each string needs an overcurrent protective device sized to handle reverse current
              from the other strings under fault.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="MPPT — finding the sweet spot on the I-V curve"
            plainEnglish="A panel’s output is a curve, not a single point. The peak of voltage times current sits in one specific spot, which moves with light, temperature and shade. The MPPT chases that peak in real time."
          >
            <p>
              The I-V curve of a PV string is non-linear — at open circuit the current is zero, at
              short circuit the voltage is zero, and somewhere in between sits the maximum power
              point where V × I is highest. The MPPT (Maximum Power Point Tracker) inside the
              inverter is the algorithm that finds that point and stays on it.
            </p>
            <p>
              The standard algorithm is "perturb and observe": nudge the operating voltage up a
              fraction of a volt, watch whether output power rises or falls, then nudge again in
              the direction that improved things. Repeat hundreds of times a second. As clouds
              roll across, as panel temperature changes through the day, as a chimney throws
              shade across one panel, the MPPT keeps the string at peak power.
            </p>
            <p>
              Modern inverters carry two or three independent MPPTs. That lets you put strings on
              different roof faces (east-facing on one MPPT, south-facing on another) without one
              dragging down the other. Each MPPT optimises its own strings independently.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inverter topologies — string, micro, hybrid"
            onSite="Most new UK domestic installs are hybrid — the inverter handles PV today and battery tomorrow. String is cheaper but locks the customer in. Micro is best for tricky roofs with shade or multiple aspects."
          >
            <p>
              Three families of inverter dominate the UK market:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>String inverter</strong> — one box at the bottom of the run, taking one
                or two strings of 8–12 panels each. Cheapest, most common, but the whole string is
                limited by the worst-performing panel. Best for simple roofs with no shade.
              </li>
              <li>
                <strong>Microinverter</strong> — a small inverter under each individual panel,
                converting that one panel’s DC to grid AC at the panel itself. Each panel
                operates at its own MPP, so shade on one does not affect the others. Higher cost
                per kW, more failure points, but ideal for partially shaded or multi-aspect
                roofs.
              </li>
              <li>
                <strong>Hybrid inverter</strong> — a string inverter with built-in battery
                management and a DC battery port. Lets the same box handle PV input, battery
                charge and discharge, and grid export. The default choice on new installs because
                it future-proofs for storage even if the customer adds the battery years later.
              </li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="What an inverter is and how it works · Unit 203 AC 6.2"
            caption="The Engineering Mindset opens an inverter up — IGBTs, PWM and the DC-to-AC switching that turns a 350 V DC string into 230 V 50 Hz at the consumer unit. The single most safety-critical component in any PV install."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 712 — the four critical regs</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.1 (Scope of Section 712)"
            clause="This section applies to the electrical installation of PV generators intended to supply all or part of an installation and to feed electricity into the public grid or local distribution. The electrical installation of a PV generator starts from a PV module or a set of PV modules connected in series with their cables, provided by the PV module manufacturer, up to the user's installation or the utility supply point."
            meaning={
              <>
                Section 712 is the home regulation for every UK PV install. It covers the wiring
                from the panel itself, through the DC string cables, the DC isolator, the
                inverter, the AC isolator and into the consumer unit. Every other reg in this Sub
                sits inside Section 712. Lock the section number in: PV = 712.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.410.101 (DC side energised even when AC is disconnected)"
            clause="Electrical equipment on the DC side shall be considered to be energized, even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side."
            meaning={
              <>
                The single most safety-critical reg in Section 712. Pulling the AC isolator at the
                consumer unit does not kill the panels. As long as daylight hits a string, the DC
                side sits at open-circuit voltage — typically 300–500 V DC. Any work on the DC
                side (string cables, DC isolator, combiner box, inverter DC terminals) requires the
                DC isolator open AND the line proven dead with a DC-rated voltmeter. AC isolation
                is irrelevant on the DC side.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.410.101."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.421.101.1 (Insulation Monitoring Device)"
            clause="An insulation monitoring device (IMD) shall be installed except where Regulation 712.421.101.2 applies, to verify the insulation status on the DC side throughout the life cycle of the PV array. NOTE: Insulation monitoring devices (IMDs) complying with BS EN 61557-8 provide this function. The monitoring function may be provided by an inverter with integrated insulation monitoring also capable of detecting insulation faults."
            meaning={
              <>
                The fire-prevention reg. PV strings sit on a roof at high DC voltage for 25 years,
                exposed to UV, thermal cycling, water ingress and rodents. An IMD measures the
                insulation resistance of the DC conductors to earth continuously and flags a drop
                long before the insulation breaks down enough to sustain a DC arc. Most modern
                inverters integrate the IMD function (Reg 712.538.101) so it is rarely a separate
                box — but the requirement for the function itself is unconditional.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.421.101.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.531.3.5.1 (Type B RCD on AC side of PV inverter)"
            clause="Where an RCD is used for protection of the PV AC supply circuit, the RCD shall be of Type B according to BS EN 62423 or BS EN 60947-2, unless: (a) the inverter provides at least simple separation between the AC side and the DC side; or (b) the installation provides at least simple separation between the inverter and the RCD by means of separate windings of a transformer; or (c) the inverter does not require a Type B RCD as stated by the manufacturer of the inverter."
            meaning={
              <>
                Default Type B. A transformerless PV inverter can leak smooth DC fault current
                onto the AC side, and smooth DC magnetically saturates the toroidal core of a
                Type AC or Type A RCD — blinding it to genuine AC faults at the same time. The
                three exceptions are specific: simple separation in the inverter, transformer
                separation in the install, or an explicit manufacturer statement that Type B is
                not required. Anything else, the reg defaults to Type B.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.531.3.5.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.537.2.2.104 (DC isolation — preventing on-load DC interruption)"
            clause="In order to prevent arcing, every device without breaking capacity that could be used to open a DC circuit shall be secured against inadvertent or unauthorized operation. This may be achieved by locating the device in a lockable space or enclosure or by padlocking. NOTE: Examples of devices to which this requirement applies are SPD carriages and fuse carriers."
            meaning={
              <>
                DC has no zero crossing — an AC arc self-extinguishes 100 times a second when the
                current passes through zero, but a DC arc does not. Anything that could open a DC
                circuit but is not actually rated for DC breaking (a fuse carrier, an SPD plug-in
                module) has to be physically locked closed. Combine this with the wider Section 712
                isolation rules: the main DC isolator on a PV install must be a purpose-built PV DC
                isolator (BS EN 60947-3) with proper DC breaking capacity and rated for the string
                Voc max. Fitting an AC-only rotary switch is a real fire risk.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.537.2.2.104."
          />

          <SectionRule />

          <ContentEyebrow>Anti-islanding and grid connection</ContentEyebrow>

          <ConceptBlock
            title="Anti-islanding — disconnecting within roughly 200 ms when the grid drops"
            plainEnglish="If the grid goes off, the inverter has to spot it within a couple of hundred milliseconds and disconnect itself. Otherwise the inverter keeps energising local cables that the DNO has switched off — and the linesman fixing the fault gets electrocuted."
            onSite="Every grid-tied inverter sold for the UK market has anti-islanding built in. You do not configure it on site. You do confirm at commissioning that the inverter is the right standard (BS EN 50549-1) and that the test results in the commissioning report show loss-of-mains disconnection."
          >
            <p>
              When a section of the LV network is switched off — whether deliberately for
              maintenance or by a fault tripping a substation breaker — every load in that section
              should fall dead. If a PV inverter on the same network keeps generating, it can hold
              up the local voltage and frequency, creating an unintended "island" of live network.
              The linesman approaches expecting dead conductors and finds them live.
            </p>
            <p>
              Anti-islanding is the inverter’s answer. Inverters meeting BS EN 50549-1 (the
              standard called up by ENA G98 for ≤ 16 A per phase generators and required by
              Reg 551.7.4 for any generator running in parallel with the public supply) detect the
              loss of mains by watching for shifts in voltage, frequency and grid impedance, and
              disconnect within roughly 200 ms. The full settings live in BS EN 50549-1; on a
              UK install you do not adjust them.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 551.7.4 (Automatic disconnection on loss of grid)"
            clause="Means of automatic switching shall be provided to disconnect the generating set from the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from declared values. For a generating set with an output exceeding 16 A, the type of protection and the sensitivity and operating times depend upon the protection of the system for distribution of electricity to the public and the number of generating sets connected and shall be agreed by the distributor. For a generating set with an output not exceeding 16 A, the settings shall comply with BS EN 50549-1."
            meaning={
              <>
                The 16 A per phase threshold in this reg is the same number that splits ENA G98
                from G99. Below 16 A per phase, settings are fixed by BS EN 50549-1 and the
                inverter does it all in software. Above 16 A per phase, the protection has to be
                agreed with the DNO as part of the G99 application — the DNO sets voltage and
                frequency limits and disconnection times to suit its network and the other
                generators on it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 55, Regulation 551.7.4."
          />

          <ConceptBlock
            title="MCS, G98 and G99 — the install paperwork chain"
            onSite="A typical UK domestic 3.68 kW PV install needs MCS certification (for SEG payments), G98 informal notification to the DNO (within 28 days of commissioning), Building Control Part P notification, and an Electrical Installation Certificate covering the AC side. None of those is optional if the customer expects the system to be insurable, claim export payments, or sell with the house."
          >
            <p>
              <strong>MCS (Microgeneration Certification Scheme)</strong> is a consumer-protection
              certification. Only an MCS-certified installer can issue an MCS certificate. Without
              one, the customer cannot register for the Smart Export Guarantee (SEG) — meaning no
              payment from the energy supplier for any electricity exported to the grid. MCS also
              gates several lender mortgage products and most home insurance providers.
            </p>
            <p>
              <strong>G98</strong> (ENA Engineering Recommendation G98) covers fully type-tested
              microgenerators up to and including 16 A per phase at 230 V (3.68 kW single-phase,
              11.04 kW three-phase). It is an informal post-installation notification — the
              installer fits the system and notifies the DNO within 28 days, supplying a standard
              completion form.
            </p>
            <p>
              <strong>G99</strong> covers everything above the G98 threshold — bigger PV arrays,
              ground-mount systems, three-phase commercial installs. It is a full pre-installation
              application. The installer submits a G99 form with single-line diagram, type-test
              certificates, protection settings and earthing arrangement. The DNO assesses
              whether the local network can take the export, sets the protection settings, and
              issues a connection agreement before the installer commissions.
            </p>
            <p>
              The 3.68 kW size that dominates UK domestic PV is no accident. It sits exactly at
              16 A at 230 V, the upper boundary of G98. Sizing 5 kW or 6 kW means tripping into
              G99 and a much heavier paperwork chain — which most installers and customers want
              to avoid.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Failure modes and EICR findings</ContentEyebrow>

          <ConceptBlock
            title="Where PV installs actually go wrong"
            plainEnglish="Panels rarely fail. Connectors, isolators and inverters do."
            onSite="If you are doing an EICR on a property with PV, the routine is: open the consumer unit and check the inverter circuit (Type B RCD? labelling?), trace to the AC isolator, then to the DC isolator at the inverter, then up to the roof if practical. Most C2 codes on PV come from one of three places."
          >
            <p>
              The big PV failure modes you will meet on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC connector arcing.</strong> MC4 connectors are the standardised quick-fit
                plugs on PV string cables. A loose or corroded MC4, baked by years of UV and
                thermal cycling, can develop high contact resistance and start arcing under load.
                DC arcs do not self-extinguish — they sustain and ignite the surrounding plastic.
                Leading cause of PV-related house fires.
              </li>
              <li>
                <strong>Wrong DC isolator.</strong> A startling number of older installs used
                AC-only rotary switches as the DC isolator beside the inverter. They look almost
                identical externally but have no DC breaking capacity. Open one under load on a
                400 V DC string and the arc can sustain inside the switch. Always check the rating
                plate is BS EN 60947-3 with a DC voltage rating at or above the string Voc max.
              </li>
              <li>
                <strong>Inverter end-of-life.</strong> Inverters typically last 10–15 years before
                the electrolytic capacitors dry out, the cooling fan fails or the firmware loses
                manufacturer support. The customer notices their generation has dropped or the
                display has died. Replacement is usually a like-for-like swap, but the new
                inverter may need a fresh G98 notification if it changed model.
              </li>
              <li>
                <strong>Backsheet delamination.</strong> Cheap panels from the early 2010s have a
                history of polymer backsheet delamination — the rear plastic layer peels and
                lets water onto the cells. Voltage drops, hotspots form, and insulation
                resistance falls. The IMD should catch it; an inspection picks up the visible
                cracking.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the DC side as safe because the AC isolator is open"
            whatHappens={
              <>
                You are called to swap a faulty MC4 connector on the roof of a house with a
                12-year-old PV system. You switch the inverter off, open the AC isolator at the
                consumer unit, and head up the ladder. It is a sunny afternoon. The string is
                still sitting at roughly 450 V DC. You disconnect the live MC4 under load, draw a
                sustained DC arc, and the cable insulation ignites.
              </>
            }
            doInstead={
              <>
                Reg 712.410.101 makes the rule explicit: DC equipment is energised whenever
                light is on the panels, regardless of what is happening on the AC side. Open the
                purpose-built DC isolator beside the inverter, use a DC-rated voltmeter to prove
                dead at the connector you are about to disconnect, and where possible cover the
                relevant section of the array with an opaque sheet to drop the string voltage to
                near zero. Treat every PV string as a live battery in daylight.
              </>
            }
          />

          <Scenario
            title="EICR on a 2014 PV install — what should you actually look for?"
            situation={
              <>
                You are doing a periodic inspection on a four-bed semi. The customer mentions the
                4 kW PV system was fitted in 2014 and "nobody has touched it since". The MCS
                certificate is in a folder. The system is still generating — display shows roughly
                3.2 kW at midday in June.
              </>
            }
            whatToDo={
              <>
                Walk the install in order. At the consumer unit, check the inverter circuit RCD
                type (a 2014 install almost certainly used Type AC — Reg 712.531.3.5.1 in its
                current form would now require Type B unless the inverter has internal separation,
                which most early ones do not). Check the AC isolator labelling and operation.
                Trace to the DC isolator at the inverter — verify it is BS EN 60947-3 rated for
                DC at or above the string Voc max, not an AC-only rotary repurposed at install.
                If safe access is available, check MC4 connectors at the inverter end for
                discoloration, melted plastic or signs of arcing. Check the labels required by
                Reg 712.514 are still in place at the origin, the meter position and the consumer
                unit. Anything that fails on RCD type or DC isolator rating is at minimum a C3
                (improvement recommended); active overheating or arcing is a C2 (potentially
                dangerous). Document everything in the EICR comments.
              </>
            }
            whyItMatters={
              <>
                PV installs from 2010–2015 often pre-date some of the current Section 712 rules.
                The current standard is what an EICR codes against. A 12-year-old install with a
                Type AC RCD on a transformerless inverter is a real risk that needs flagging,
                even if it has been running fine.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A PV cell is a silicon p-n junction. Photons free electrons across the band gap, the junction field separates them, and the cell delivers roughly 0.5 V DC. Series cells make a panel; series panels make a string at 300–500 V DC.',
              'BS 7671 Section 712 is the home regulation for UK PV installs. Lock in 712.1 (scope), 712.410.101 (DC always live), 712.421.101.1 (IMD required), 712.531.3.5.1 (default Type B RCD on AC side) and 712.537 (DC isolation kit must be DC-rated).',
              'Anti-islanding (loss-of-mains protection) disconnects the inverter within roughly 200 ms of grid failure under BS EN 50549-1, called up by Reg 551.7.4. Stops the inverter back-feeding a network the DNO has switched off.',
              'ENA G98 covers ≤ 16 A per phase (3.68 kW single-phase) on informal notification. G99 covers everything bigger and is a full pre-application. The 3.68 kW UK standard install is sized to stay inside G98.',
              'MCS certification is the gateway to Smart Export Guarantee payments. Without MCS, the customer gets no payment from the supplier for export, even if the install is fully compliant.',
              'PV failure modes you actually see on EICRs: arcing MC4 connectors, AC-only switches fitted as DC isolators, inverter end-of-life and backsheet delamination on cheap older panels.',
            ]}
          />

          <Quiz title="Solar PV deep dive — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 Types of micro-renewables
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Battery storage deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
