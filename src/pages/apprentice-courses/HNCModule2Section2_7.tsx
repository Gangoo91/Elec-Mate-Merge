/**
 * Module 2 · Section 2 · Subsection 7 — Applications in Water Distribution and Duct Systems
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   The capstone of Section 2: continuity, Bernoulli, head/pressure conversion, laminar
 *   vs turbulent flow, index circuits, system curves, pump and fan selection, the affinity
 *   laws and proportional balancing — applied to real water and air distribution rigs.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  SectionRule,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Applications in water distribution and duct systems | HNC Module 2.2.7 | Elec-Mate';
const DESCRIPTION =
  'Practical applications of fluid mechanics in building services — pump curves and system curves, duct sizing, water distribution losses and pressure budgets.';

const quickCheckQuestions = [
  {
    id: 'continuity-velocity',
    question:
      'A pipe with an internal cross-sectional area of 9.62 × 10⁻⁴ m² carries 1.5 litres per second. What is the mean water velocity?',
    options: [
      '0.64 m/s',
      '1.56 m/s',
      '2.44 m/s',
      '15.6 m/s',
    ],
    correctIndex: 1,
    explanation:
      'Continuity: v = Q / A. Convert the flow first — 1.5 l/s = 0.0015 m³/s. v = 0.0015 / 9.62 × 10⁻⁴ = 1.56 m/s. The commonest error here is leaving the flow in litres per second, which inflates the answer by a factor of 1000.',
  },
  {
    id: 'total-pressure-split',
    question:
      'At a point in a duct the static pressure is 180 Pa and the velocity pressure is 25 Pa. What is the total pressure at that point?',
    options: [
      '155 Pa',
      '180 Pa',
      '205 Pa',
      '4500 Pa',
    ],
    correctIndex: 2,
    explanation:
      'Total pressure = static pressure + velocity pressure = 180 + 25 = 205 Pa. Static pressure is what pushes outwards on the duct wall; velocity pressure is the kinetic energy of the moving air. A Pitot-static traverse measures total and static, and the difference gives velocity pressure, from which velocity is derived.',
  },
  {
    id: 'affinity-cube',
    question:
      'A variable-speed pump is slowed to half its original speed. Ignoring efficiency changes, what happens to its absorbed power?',
    options: [
      'It halves',
      'It falls to one quarter',
      'It falls to one eighth',
      'It is unchanged',
    ],
    correctIndex: 2,
    explanation:
      'The affinity laws give P ∝ N³. At half speed, P₂/P₁ = 0.5³ = 0.125 — one eighth of the original power. Flow halves (Q ∝ N) and developed head falls to a quarter (H ∝ N²). This cube-law relationship is the whole energy argument for variable-speed pumping and fans.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A rectangular duct measuring 400 mm × 300 mm carries 0.6 m³/s of air. What is the mean velocity in the duct?',
    options: [
      '2.5 m/s',
      '5 m/s',
      '0.6 m/s',
      '50 m/s',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity: A = 0.4 × 0.3 = 0.12 m². v = Q / A = 0.6 / 0.12 = 5 m/s. Continuity is the first calculation on every duct or pipe sizing sheet — flow and area fix the velocity, and velocity then drives both noise and friction loss.',
  },
  {
    id: 2,
    question:
      'Air of density 1.2 kg/m³ flows at 8 m/s. What is the velocity pressure?',
    options: [
      '4.8 Pa',
      '9.6 Pa',
      '38.4 Pa',
      '76.8 Pa',
    ],
    correctAnswer: 2,
    explanation:
      'Velocity pressure p_v = ½ρv² = 0.5 × 1.2 × 8² = 0.5 × 1.2 × 64 = 38.4 Pa. Note that it depends on the square of velocity — at 4 m/s the same duct would show only 9.6 Pa.',
  },
  {
    id: 3,
    question:
      'A water circuit needs 6 metres of head. Expressed as a pressure, that is approximately:',
    options: [
      '6 kPa',
      '58.9 kPa',
      '600 kPa',
      '0.61 kPa',
    ],
    correctAnswer: 1,
    explanation:
      'p = ρgh = 1000 × 9.81 × 6 = 58,860 Pa = 58.9 kPa. One metre of water head is about 9.81 kPa, so multiply metres by roughly 9.81 to get kilopascals. Pump manufacturers quote head in metres; terminal units and heat exchangers are usually quoted in kPa, so you convert constantly.',
  },
  {
    id: 4,
    question:
      'Flow through a turbulent pipe circuit is doubled. Approximately what happens to the friction pressure loss?',
    options: [
      'It doubles',
      'It quadruples',
      'It is unchanged',
      'It halves',
    ],
    correctAnswer: 1,
    explanation:
      'In fully turbulent flow the friction loss grows roughly with the square of velocity, and velocity is proportional to flow in a fixed bore. Doubling flow therefore multiplies the loss by about 2² = 4. This square-law behaviour is exactly what makes the system resistance curve a parabola.',
  },
  {
    id: 5,
    question:
      'A pump absorbs 4 kW at full speed. Using the affinity laws, what does it absorb at 70% speed?',
    options: [
      '2.8 kW',
      '1.96 kW',
      '1.37 kW',
      '0.7 kW',
    ],
    correctAnswer: 2,
    explanation:
      'P ∝ N³, so P₂ = 4 × 0.7³ = 4 × 0.343 = 1.372 kW ≈ 1.37 kW. A 30% speed reduction cuts absorbed power by nearly two thirds — provided the system curve genuinely lets the pump slow down (little static head, two-port valves at terminals).',
  },
  {
    id: 6,
    question: 'What is the index circuit in a water distribution system?',
    options: [
      'The circuit with the highest flow rate',
      'The circuit with the greatest total pressure loss from plant to terminal and back',
      'The circuit nearest the plant room',
      'The circuit that carries the largest heat load',
    ],
    correctAnswer: 1,
    explanation:
      'The index circuit (or index run) is the path with the greatest total resistance — usually, but not always, the longest run. It sets the pump duty: if the index terminal gets its design flow at the design pressure, every shorter branch can be regulated back to its own design flow. It is not necessarily the highest-load circuit.',
  },
  {
    id: 7,
    question:
      'An oversized constant-speed pump is throttled back to design flow using a regulating valve. What is the main consequence?',
    options: [
      'The pump delivers more flow than before',
      'The energy the pump adds is dissipated across the valve, so input power stays high',
      'The system curve becomes flatter',
      'Friction losses in the pipework increase to compensate',
    ],
    correctAnswer: 1,
    explanation:
      'Throttling steepens the system curve and drives the operating point up the pump curve. Flow falls, but the pump develops more head and the surplus energy is dissipated as pressure drop (and noise) across the valve. Input power falls only slightly. Slowing the pump instead moves it down an affinity-law path, where power falls with the cube of speed.',
  },
  {
    id: 8,
    question:
      'A pipe flow has a Reynolds number of 20,000. What flow regime is this?',
    options: [
      'Laminar — smooth, layered flow',
      'Transitional',
      'Turbulent — mixing, eddying flow',
      'Static — no flow',
    ],
    correctAnswer: 2,
    explanation:
      'Reynolds number compares inertial to viscous forces. Below roughly 2000 pipe flow is laminar; above roughly 4000 it is turbulent, with the band between the two being transitional. At Re = 20,000 the flow is firmly turbulent — which is normal for building services water distribution, and the reason friction loss follows a near square law.',
  },
  {
    id: 9,
    question:
      'During proportional balancing, why does a short branch near the plant usually need its regulating valve well closed?',
    options: [
      'To reduce the water temperature reaching that branch',
      'Because short branches always carry less heat load',
      'To absorb the surplus pressure it sees compared with the index branch',
      'To increase the static pressure at the pump suction',
    ],
    correctAnswer: 2,
    explanation:
      'The pump has to develop enough pressure for the index circuit. A branch close to the plant sees almost that whole pressure across a much shorter, lower-resistance path, so it would run massively over-flow. Its regulating valve absorbs the surplus so that every branch ends up at the same proportion of design flow.',
  },
  {
    id: 10,
    question:
      'A fan moves 1.5 m³/s against a total pressure of 400 Pa. If the combined fan and motor efficiency is 55%, what is the approximate electrical input power?',
    options: [
      '600 W',
      '330 W',
      '1.09 kW',
      '2.7 kW',
    ],
    correctAnswer: 2,
    explanation:
      'Air power = Q × Δp_total = 1.5 × 400 = 600 W. Input power = 600 / 0.55 = 1090.9 W ≈ 1.09 kW. Note the shape of the sum: every extra pascal of avoidable system resistance you design in has to be paid for through the efficiency, every hour the fan runs.',
  },
];

const faqs = [
  {
    question: 'Why not just run everything at high velocity and use smaller pipes and ducts?',
    answer:
      'Because velocity is charged for twice. Friction loss in turbulent flow grows roughly with the square of velocity, so the pump or fan energy rises steeply for the life of the building; and regenerated noise rises with velocity too, which is unacceptable in ducts and pipework serving occupied rooms. High water velocities also risk erosion-corrosion in copper. Small bore saves capital cost and builder’s work; large bore saves running cost and complaints. Sizing is a deliberate balance between the two, tightened where the run is near occupied space.',
  },
  {
    question: 'How do I know which branch is the index circuit?',
    answer:
      'Calculate the total pressure loss along each candidate path — plant to terminal and back — including pipe friction, fittings, the terminal unit and its control valve. The largest total is the index. Length is a good first guess but not proof: a short branch feeding a high-resistance plate heat exchanger, or a run stacked with elbows and a strainer, can easily beat a longer plain run. On a large system it is normal to work out the two or three most likely candidates in full.',
  },
  {
    question: 'What does Bernoulli actually tell me on site?',
    answer:
      'That along a streamline the total energy — pressure, velocity and elevation terms — is conserved unless it is lost to friction or added by a pump or fan. Practically it means a rise in velocity must be paid for by a fall in static pressure, and vice versa. That is why static pressure recovers slightly where a duct expands and air slows, why a Pitot tube can measure velocity from the difference between total and static pressure, and why the static pressure downstream of a partly closed valve is always lower than upstream.',
  },
  {
    question: 'Does the 1 metre ≈ 9.81 kPa rule apply to air as well?',
    answer:
      'No — not usefully. It comes from p = ρgh with a density of about 1000 kg/m³ for water. Air is roughly 1.2 kg/m³, so a metre of air column is worth about 0.012 kPa, which is negligible. That is why air systems are worked in pascals of total pressure and elevation is ignored, while water systems are worked in metres head and elevation matters a great deal, especially in tall buildings.',
  },
  {
    question: 'If the affinity laws are so favourable, why does a real variable-speed pump never quite hit the cube law?',
    answer:
      'Three reasons. First, the affinity laws assume the operating point moves along a curve through the origin — any genuine static head in the system means head does not fall as fast as N². Second, pump and motor efficiency both drop away from the best efficiency point, and the drive itself has losses. Third, control strategy matters: holding a fixed differential-pressure setpoint keeps a pressure floor in the system, so power follows something closer to a square law at low flow. The savings are still large, but you should model them rather than quote 0.5³ from memory.',
  },
  {
    question: 'What is the point of pressure testing before insulation and ceilings go in?',
    answer:
      'Access. A joint that weeps at test pressure is a ten-minute fix on open pipework and a major disruption once it is lagged, boxed in and above a plastered ceiling with the floor finish laid. The test also proves the system as installed before it is charged, dosed and commissioned, so the commissioning engineer starts from a known-tight system. The same logic applies to duct leakage testing on higher-pressure ductwork — leakage found late is very expensive to chase.',
  },
];

const HNCModule2Section2_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 7"
            title="Applications in water distribution and duct systems"
            description="Where fluid mechanics meets the building services rig — pumps, ducts, pressure budgets and the practical maths an HNC engineer applies on a real project."
            tone="purple"
          />

          <TLDR
            points={[
              'You apply continuity (Q = vA) as the first line of every pipe and duct sizing calculation, and you keep the units straight — litres per second is not cubic metres per second.',
              'You separate static, velocity and total pressure, and you convert confidently between metres head and kilopascals for water (1 m ≈ 9.81 kPa).',
              'You identify the index circuit, build a pressure budget along it, and use that budget to select a pump or fan against the system resistance curve.',
              'You apply the affinity laws — flow ∝ speed, pressure ∝ speed², power ∝ speed³ — and can defend variable-speed operation on energy grounds with real arithmetic.',
              'You read site symptoms as fluid mechanics: a starved index terminal, a throttled oversized pump and a noisy duct each have a diagnosis you can calculate.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guides — the profession's sizing references"
            clause="Building services pipework and ductwork in the UK are sized against the CIBSE Guides, which set out friction-loss data, fitting loss factors, fluid property data and recommended design approaches for water and air distribution. Whatever design software you use sits on top of that body of reference data."
            meaning={
              <>
                This page teaches the physics underneath those references — continuity,
                Bernoulli, head and pressure, flow regime, system curves and the affinity
                laws. Once you understand what the charts are doing, you can sanity-check any
                sizing output rather than trusting it. On a live project, always size against
                the current published reference data and the manufacturer&rsquo;s own
                performance curves for the specific equipment selected.
              </>
            }
            cite="Applied physics: continuity, Bernoulli's principle and the affinity laws. Verify all design data against current CIBSE guidance and manufacturers' published curves."
          />

          <LearningOutcomes
            outcomes={[
              'Apply continuity (Q = vA) to size water pipework and ductwork',
              'Distinguish static, velocity and total pressure and convert head to pressure',
              'Explain laminar and turbulent flow using Reynolds number, and the square-law growth of friction loss',
              'Identify the index circuit and build a pressure budget along it',
              'Select a pump or fan against a system resistance curve',
              'Apply the affinity laws to variable-speed pumping and quantify the energy saving',
              'Interpret site symptoms — starved terminals, throttled pumps, noisy ducts — in fluid mechanics terms',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="From theory to the rig: what actually gets calculated"
            plainEnglish="Everything in Section 2 collapses into one workflow — pick a flow, choose a size that gives a sensible velocity, add up the losses along the worst path, and select a machine that can beat that total."
          >
            <p>
              Sections 2.1 to 2.6 gave you the physics one piece at a time. On a real project
              those pieces run in a fixed order, and each one hands its answer to the next:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flow rate first.</strong> The load fixes the flow. On a water circuit
                that comes from the heat duty and the design temperature difference; on an air
                circuit, from the ventilation rate or the cooling duty and the supply
                temperature difference.
              </li>
              <li>
                <strong>Then size, via continuity.</strong> Q = vA. You are really choosing a
                velocity — the bore or duct dimension follows from it.
              </li>
              <li>
                <strong>Then losses along the worst path.</strong> Straight-run friction plus
                fittings plus plant plus the terminal and its control valve. That path is the
                index circuit and the total is the pressure budget.
              </li>
              <li>
                <strong>Then select the machine.</strong> Plot the system resistance curve and
                find where the candidate pump or fan curve crosses it. That crossing point,
                not the catalogue headline, is what you will actually get.
              </li>
              <li>
                <strong>Then prove it.</strong> Pressure test, flush, charge, commission and
                balance — and record what was measured, not what was designed.
              </li>
            </ul>
            <p>
              Get the order wrong and the errors compound. A velocity chosen carelessly at step
              two lands as a pump two frame sizes too big at step four, and as a noise complaint
              at step five.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Continuity and the sizing trade-off"
            plainEnglish="Flow divided by area gives velocity. Pick a small pipe and velocity climbs — so does noise, erosion and the pump energy you pay for every hour of the building's life."
          >
            <p>
              <strong>Continuity:</strong> for an incompressible fluid in a full pipe or duct,
              Q = vA, where Q is volume flow (m³/s), v is mean velocity (m/s) and A is the
              internal cross-sectional area (m²). Rearranged, v = Q / A and A = Q / v.
            </p>
            <p>
              For a circular pipe, A = πd²/4 with d in metres. For a rectangular duct,
              A = width × height. Two consequences follow immediately:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Area scales with the square of diameter.</strong> Going one size up on
                bore is a bigger change than it looks — the velocity falls by the square of the
                diameter ratio.
              </li>
              <li>
                <strong>Flow splits, so velocity must be recalculated at every branch.</strong>{' '}
                A duct that keeps the same cross-section after giving up half its air has
                halved its velocity, and the velocity pressure has fallen to a quarter.
              </li>
            </ul>
            <p>
              <strong>The sizing trade-off.</strong> Choosing a velocity is choosing a position
              between two costs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Too fast:</strong> friction loss rises with roughly the square of
                velocity, so the pump or fan gets bigger and runs harder forever. Regenerated
                noise rises sharply — the reason designers keep velocities low in ducts and
                pipework serving or passing through occupied spaces. In copper pipework,
                sustained high velocity risks erosion-corrosion, particularly at bends and
                where the water is aggressive.
              </li>
              <li>
                <strong>Too slow:</strong> materials, insulation, hangers, builder&rsquo;s work
                and riser space all cost more, and very low velocities can fail to carry
                entrained air out of a water system towards the air separator.
              </li>
            </ul>
            <p>
              There is no single correct velocity. It is a judgement, tightened near occupied
              rooms and relaxed in plant rooms and risers, and the published sizing references
              exist to help you make it consistently.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Static, velocity and total pressure"
            plainEnglish="Static pressure pushes outwards on the wall. Velocity pressure is the kinetic energy of the moving fluid. Add them and you get total pressure — the quantity a fan or pump actually has to supply."
          >
            <p>
              Bernoulli&rsquo;s principle says that along a streamline, in the absence of
              friction and without a machine adding energy, the total energy of the fluid is
              constant. Written as pressures for a horizontal duct:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Static pressure (p_s):</strong> the pressure the fluid exerts on the
                duct or pipe wall, independent of motion
              </li>
              <li>
                <strong>Velocity pressure (p_v = ½ρv²):</strong> the pressure equivalent of the
                fluid&rsquo;s kinetic energy
              </li>
              <li>
                <strong>Total pressure (p_t = p_s + p_v):</strong> the sum, and the quantity
                that falls steadily along a real system as friction takes its cut
              </li>
            </ul>
            <p>
              <strong>Why it matters practically.</strong> Because the total is conserved,
              static and velocity pressure trade against each other. Where a duct narrows, air
              speeds up, velocity pressure rises and static pressure falls. Where a duct
              expands, air slows, velocity pressure falls and part of it reappears as static
              pressure — static regain. Real transitions never recover it all; an abrupt
              expansion recovers very little because the flow separates and the energy is lost
              to turbulence.
            </p>
            <p>
              <strong>Measurement.</strong> A Pitot-static tube faces into the flow and reads
              total pressure at its nose and static pressure at side tappings. The difference
              is velocity pressure, and v = √(2p_v / ρ). This is the basis of a duct traverse:
              read velocity pressure at a grid of points across the duct, convert each to a
              velocity, average them and multiply by area to get the flow.
            </p>
            <p>
              <strong>Air density.</strong> Standard air is taken as about 1.2 kg/m³. Because
              p_v depends directly on density, hot extract air or a high-altitude site shifts
              the numbers, and instruments that assume standard density need correcting.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Head and pressure: two languages for the same thing"
            plainEnglish="Pumps are sold in metres, terminal units are quoted in kilopascals. For water, one metre of head is about 9.81 kPa — multiply or divide, and never mix the two in one column of a spreadsheet."
          >
            <p>
              Head is the height of a column of the fluid that would produce a given pressure:
              p = ρgh. For water at around 1000 kg/m³ and g = 9.81 m/s²:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 m head = 1000 × 9.81 × 1 = 9810 Pa = 9.81 kPa</strong>
              </li>
              <li>
                <strong>10 m head ≈ 98.1 kPa ≈ 0.98 bar</strong> — near enough 1 bar for a
                rough check, but not for a calculation you will sign
              </li>
              <li>
                <strong>To convert kPa to metres of water:</strong> divide by 9.81
              </li>
            </ul>
            <p>
              <strong>Why two languages exist.</strong> A centrifugal pump develops a head that
              is very nearly independent of the density of the liquid it is moving — the same
              impeller at the same speed lifts water and a glycol mixture to a similar height.
              Quoting the machine in metres therefore makes its performance portable. Component
              manufacturers, by contrast, quote a measured pressure drop in kPa, because that
              is what their test rig recorded.
            </p>
            <p>
              <strong>Two traps.</strong> First, mixing the units within one pressure budget —
              add all your kPa figures, then convert the total once. Second, forgetting that a
              closed circuit has no net static lift: the water that goes up also comes back
              down, so the pump only has to overcome friction. It is the open systems — booster
              sets, cooling tower circuits, anything discharging to atmosphere at a higher
              level — where the static lift is a genuine, flow-independent term in the budget.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Flow regime: laminar, turbulent and why losses follow a square law"
            plainEnglish="Slow, syrupy flow slides in layers. Real building services flow tumbles and mixes. That mixing is what makes friction loss grow with the square of velocity rather than in proportion to it."
          >
            <p>
              Reynolds number is the dimensionless ratio of inertial to viscous forces:
              Re = vd/ν, where v is velocity (m/s), d is the internal diameter (m) and ν is the
              kinematic viscosity (m²/s). It has no units — every term cancels.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Below about 2000 — laminar.</strong> Fluid moves in smooth layers.
                Friction loss is proportional to velocity, and the pipe&rsquo;s internal
                roughness barely matters because a viscous sublayer covers it.
              </li>
              <li>
                <strong>About 2000 to 4000 — transitional.</strong> Unstable and unpredictable;
                a region to design out of rather than into.
              </li>
              <li>
                <strong>Above about 4000 — turbulent.</strong> Eddies and cross-mixing. Friction
                loss grows roughly with the square of velocity, and surface roughness now
                matters a great deal.
              </li>
            </ul>
            <p>
              <strong>Almost all building services distribution is turbulent</strong> at design
              flow, in both water and air. That single fact underwrites much of this section:
              it is why the system resistance curve is a parabola, why doubling flow roughly
              quadruples the loss, and why a rough or scaled pipe costs more energy than a clean
              one at the same duty.
            </p>
            <p>
              <strong>The part-load corner case.</strong> A variable-flow system at deep turndown
              can drop a lightly loaded branch into the transitional or even laminar region.
              Heat transfer at the terminal falls away, and the branch can behave far worse than
              the design sheet suggests — one of the reasons minimum flows and control valve
              turndown limits are specified.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="The index circuit and the system resistance curve"
            plainEnglish="Find the hardest path through the system, add up everything that resists flow along it, and you have both the pump duty and the shape of the system curve."
          >
            <p>
              <strong>The index circuit</strong> is the path from the plant, out to a terminal
              and back, that has the greatest total pressure loss at design flow. Size the pump
              to satisfy the index circuit and every other branch has surplus pressure available
              — which is exactly what the regulating valves are there to absorb.
            </p>
            <p>
              <strong>What goes into the budget along the index path:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Straight-run pipe friction</strong> — loss per metre × total length of
                flow and return
              </li>
              <li>
                <strong>Fittings</strong> — bends, tees, reducers, strainers and valves, handled
                either as an equivalent length of straight pipe or as loss factors applied to
                velocity pressure
              </li>
              <li>
                <strong>Plant items</strong> — boiler or chiller, heat exchangers, filters
              </li>
              <li>
                <strong>The terminal unit</strong> — the coil or emitter itself
              </li>
              <li>
                <strong>The control valve</strong> — deliberately given a meaningful share of
                the branch pressure drop so it retains authority over the flow it is supposed
                to control
              </li>
              <li>
                <strong>A margin</strong> — for fouling, ageing and the fact that no calculation
                is perfect. A margin is not an excuse to guess; it is a stated allowance on a
                calculated figure.
              </li>
            </ul>
            <p>
              <strong>The system curve.</strong> Because turbulent friction loss goes with the
              square of flow, the total resistance at any other flow follows
              H = H_static + kQ². In a closed circuit H_static is essentially zero and the curve
              rises from the origin as a pure parabola. Every change you make to the system —
              closing a valve, fouling a strainer, adding a branch — changes k and therefore
              swings the whole curve.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked example 1 — sizing by continuity, and what one size up buys you"
            plainEnglish="Same flow, two bores. The bigger bore cuts velocity by a third and friction loss by well over half."
          >
            <p>
              A branch carries <strong>1.5 l/s</strong> of LTHW. Compare a pipe of 28 mm
              internal diameter with one of 35 mm internal diameter.
            </p>
            <p>
              <strong>Step 1 — convert the flow.</strong> 1.5 l/s = 1.5 / 1000 ={' '}
              <strong>0.0015 m³/s</strong>.
            </p>
            <p>
              <strong>Step 2 — areas.</strong> A = πd²/4.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                28 mm: A = π × 0.028² / 4 = π × 0.000784 / 4 = π × 0.000196 ={' '}
                <strong>6.16 × 10⁻⁴ m²</strong>
              </li>
              <li>
                35 mm: A = π × 0.035² / 4 = π × 0.001225 / 4 = π × 0.00030625 ={' '}
                <strong>9.62 × 10⁻⁴ m²</strong>
              </li>
            </ul>
            <p>
              <strong>Step 3 — velocities.</strong> v = Q / A.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                28 mm: v = 0.0015 / 6.16 × 10⁻⁴ = <strong>2.44 m/s</strong>
              </li>
              <li>
                35 mm: v = 0.0015 / 9.62 × 10⁻⁴ = <strong>1.56 m/s</strong>
              </li>
            </ul>
            <p>
              <strong>Step 4 — check with the diameter ratio.</strong> Velocity should fall by
              (28/35)² = 0.8² = 0.64. And 2.44 × 0.64 = 1.56 m/s — the two routes agree, which
              is the check worth doing every time.
            </p>
            <p>
              <strong>Step 5 — what it does to friction.</strong> In turbulent flow the loss per
              metre grows roughly with v², so the velocity change alone scales the loss by
              (1.56 / 2.44)² = 0.41 — a reduction of about 59%. The larger bore reduces it
              further still, because loss per metre also falls as diameter rises. Against that,
              the 35 mm pipe costs more in material, insulation and space.
            </p>
            <p>
              <strong>Engineering judgement.</strong> Nearly 2.5 m/s on a small-bore branch is
              fast — acceptable in a plant room, questionable in a pipe crossing a ceiling void
              above a meeting room. This is precisely the noise-versus-cost call that sizing
              guidance exists to make consistent.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked example 2 — a pressure budget and pump duty for an LTHW circuit"
            plainEnglish="Add every resistance along the index run, add a margin, convert to metres, and you have the duty point to take to a pump curve."
          >
            <p>
              A closed LTHW circuit serves a <strong>90 kW</strong> load with a design
              temperature difference of <strong>20 K</strong>. The index run has 120 m of
              pipework (flow and return combined) at an estimated{' '}
              <strong>200 Pa/m</strong>.
            </p>
            <p>
              <strong>Step 1 — design flow rate.</strong> Mass flow ṁ = Q / (c × ΔT), with the
              specific heat capacity of water taken as 4.18 kJ/kg·K:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>c × ΔT = 4.18 × 20 = 83.6 kJ/kg</li>
              <li>ṁ = 90 / 83.6 = <strong>1.077 kg/s</strong></li>
              <li>
                At about 1000 kg/m³ that is 0.001077 m³/s ={' '}
                <strong>1.08 l/s</strong>
              </li>
            </ul>
            <p>
              <strong>Step 2 — build the pressure budget along the index run.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Straight pipe: 120 m × 200 Pa/m = 24,000 Pa = <strong>24.0 kPa</strong>
              </li>
              <li>
                Fittings, taken as an equivalent length of 30% of the straight run:
                0.30 × 24.0 = <strong>7.2 kPa</strong>
              </li>
              <li>
                Boiler and heat exchanger: <strong>15.0 kPa</strong> (manufacturer&rsquo;s
                figure at design flow)
              </li>
              <li>
                Index terminal coil: <strong>12.0 kPa</strong>
              </li>
              <li>
                Two-port control valve at the index terminal: <strong>10.0 kPa</strong>
              </li>
              <li>
                <strong>Subtotal: 24.0 + 7.2 + 15.0 + 12.0 + 10.0 = 68.2 kPa</strong>
              </li>
            </ul>
            <p>
              <strong>Step 3 — add a margin.</strong> A 10% allowance for fouling and
              calculation tolerance: 68.2 × 1.10 = <strong>75.0 kPa</strong>.
            </p>
            <p>
              <strong>Step 4 — convert to head.</strong> h = p / (ρg) = 75,020 / (1000 × 9.81) ={' '}
              <strong>7.65 m</strong>. Sanity check the other way: 9.81 × 7.65 = 75.0 kPa. ✓
            </p>
            <p>
              <strong>Step 5 — the duty point.</strong>{' '}
              <strong>1.08 l/s at approximately 7.65 m head.</strong> That is the single point
              you take to the manufacturer&rsquo;s pump curves; you then select the machine
              whose curve passes near it with the duty sitting close to its best efficiency
              point.
            </p>
            <p>
              <strong>Step 6 — power, as a reality check.</strong> Hydraulic power
              = Δp × Q = 75,020 × 0.001077 = <strong>80.8 W</strong>. At a combined pump and
              motor efficiency of 45%, the electrical input is 80.8 / 0.45 ={' '}
              <strong>180 W</strong>. If a selection comes back at ten times that, something in
              the budget or the selection is wrong — go and find it before ordering.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked example 3 — the system curve at part load"
            plainEnglish="Take the design point, use the square law to find the resistance at other flows, and you have the curve the pump has to live on."
          >
            <p>
              Continuing the circuit above: closed loop, so H_static ≈ 0 and the system curve is
              H = kQ². At the design point 7.65 m at 1.08 l/s.
            </p>
            <p>
              <strong>Step 1 — find k.</strong> k = H / Q² = 7.65 / 1.08² = 7.65 / 1.1664 ={' '}
              <strong>6.56 m per (l/s)²</strong>.
            </p>
            <p>
              <strong>Step 2 — resistance at other flows.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                At 0.54 l/s (50% flow): H = 6.56 × 0.54² = 6.56 × 0.2916 ={' '}
                <strong>1.91 m</strong> — a quarter of the design head, exactly as the square
                law predicts
              </li>
              <li>
                At 0.81 l/s (75% flow): H = 6.56 × 0.6561 = <strong>4.30 m</strong>
              </li>
              <li>
                At 1.30 l/s (120% flow): H = 6.56 × 1.69 = <strong>11.09 m</strong>
              </li>
            </ul>
            <p>
              <strong>Read what that says.</strong> Halving the flow drops the required head to
              a quarter; asking for about 20% more flow than design demands roughly 45% more
              head. It is
              the second half of that sentence that catches people out — a system asked to
              deliver more than it was designed for gets expensive very quickly, and a pump
              running out to the right of its curve can overload its motor.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Worked example 4 — affinity laws and the cube-law energy argument"
            plainEnglish="Slow a pump to 80% and you get 80% of the flow for 51% of the power. That gap is the entire business case for variable-speed pumping."
          >
            <p>
              <strong>The affinity laws</strong> relate a centrifugal machine&rsquo;s
              performance at one speed to another, for a fixed impeller:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flow ∝ speed:</strong> Q₂/Q₁ = N₂/N₁
              </li>
              <li>
                <strong>Pressure or head ∝ speed²:</strong> H₂/H₁ = (N₂/N₁)²
              </li>
              <li>
                <strong>Power ∝ speed³:</strong> P₂/P₁ = (N₂/N₁)³
              </li>
            </ul>
            <p>
              A pump has a design duty of <strong>12 l/s at 8 m head, absorbing 1.5 kW</strong>{' '}
              at full speed.
            </p>
            <p>
              <strong>At 80% speed (N₂/N₁ = 0.8):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q₂ = 12 × 0.8 = <strong>9.6 l/s</strong></li>
              <li>H₂ = 8 × 0.8² = 8 × 0.64 = <strong>5.12 m</strong></li>
              <li>
                P₂ = 1.5 × 0.8³ = 1.5 × 0.512 = <strong>0.768 kW</strong> — a saving of 0.732 kW,
                or <strong>48.8%</strong>
              </li>
            </ul>
            <p>
              <strong>At 60% speed (N₂/N₁ = 0.6):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q₂ = 12 × 0.6 = <strong>7.2 l/s</strong></li>
              <li>H₂ = 8 × 0.36 = <strong>2.88 m</strong></li>
              <li>
                P₂ = 1.5 × 0.216 = <strong>0.324 kW</strong> — a saving of{' '}
                <strong>78.4%</strong>
              </li>
            </ul>
            <p>
              <strong>Annual energy.</strong> Suppose the pump runs 6000 hours a year and, under
              variable-speed control, spends half that time at 80% speed and half at 60%:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3000 h × 0.768 kW = 2304 kWh</li>
              <li>3000 h × 0.324 kW = 972 kWh</li>
              <li>
                Variable-speed total = <strong>3276 kWh</strong>
              </li>
              <li>
                Constant speed for comparison = 6000 × 1.5 = <strong>9000 kWh</strong>
              </li>
              <li>
                Saving = 9000 − 3276 = <strong>5724 kWh, about 64%</strong>
              </li>
            </ul>
            <p>
              <strong>The honest caveat.</strong> Those figures assume the operating point
              follows a curve through the origin. Any real static head, any fixed
              differential-pressure setpoint held in the system, and the falling efficiency of
              pump, motor and drive away from the design point all erode the saving. It stays
              large — but present it as a modelled figure, not as 0.5³ recited from memory.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="The air side: ducts, fittings and fan curves"
            plainEnglish="Same physics, different fluid. Air is about 800 times less dense than water, so everything is worked in pascals — and fitting losses dominate in a way they rarely do on the water side."
          >
            <p>
              The air side runs on identical principles with a change of units and emphasis:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity still rules:</strong> v = Q / A, with A in m² and Q in m³/s
              </li>
              <li>
                <strong>Losses are worked in pascals</strong> of total pressure, not metres of
                head — a metre of air column is worth about 0.012 kPa, so elevation is ignored
              </li>
              <li>
                <strong>Fitting losses use velocity pressure:</strong> Δp = ζ × ½ρv², where ζ is
                the loss factor for that bend, tee, damper or transition
              </li>
              <li>
                <strong>Fans are selected on total pressure</strong> at the design volume flow,
                against a system curve built the same parabolic way
              </li>
            </ul>
            <p>
              <strong>Why fittings dominate.</strong> Duct runs are usually shorter than pipe
              runs but far busier — mitred bends, branch tees, dampers, fire dampers, filters,
              coils and grilles. On a typical system the sum of fitting losses can rival or
              exceed the straight-run friction, so a layout that avoids a tight bend directly
              off the fan discharge can be worth more than a duct size increase.
            </p>
            <p>
              <strong>Fan discharge conditions.</strong> A fan tested on a straight duct will not
              deliver its catalogue performance if the first thing it sees is an elbow. Poor
              inlet and outlet conditions produce a real, measurable shortfall against the
              published curve — an effect worth designing out rather than arguing about on site.
            </p>
            <p>
              <strong>Three classic duct sizing approaches</strong>, all of which are just
              different ways of choosing velocities along the system:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equal friction:</strong> hold the loss per metre roughly constant along
                the system and let velocity fall naturally as flow reduces towards the branches.
                Quick, predictable, the common default.
              </li>
              <li>
                <strong>Velocity reduction:</strong> choose descending velocities from main to
                branch to terminal, keeping the lowest velocities nearest occupied space where
                noise matters most.
              </li>
              <li>
                <strong>Static regain:</strong> size each section so the static pressure
                recovered as the air slows down offsets the friction loss of the next section,
                aiming to arrive at every branch at a similar static pressure. More calculation,
                but it can reduce the balancing effort.
              </li>
            </ul>
            <p>
              <strong>Fan power.</strong> Air power = Q × Δp_total, and electrical input power is
              that divided by the combined fan, drive and motor efficiency. Dividing the input
              power by the volume flow gives the specific fan power — a single number that makes
              two designs directly comparable, and one the energy assessment will ask for.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked example 5 — duct velocities, fitting loss and fan power"
            plainEnglish="A branch takes air away, velocity drops, velocity pressure drops by the square, and some of it comes back as static. Then price the whole fan duty."
          >
            <p>
              A supply duct measuring <strong>600 mm × 400 mm</strong> carries{' '}
              <strong>1.2 m³/s</strong>. Take air density as 1.2 kg/m³.
            </p>
            <p>
              <strong>Step 1 — velocity in the main.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>A = 0.6 × 0.4 = <strong>0.24 m²</strong></li>
              <li>v = 1.2 / 0.24 = <strong>5 m/s</strong></li>
              <li>
                p_v = ½ρv² = 0.5 × 1.2 × 5² = 0.5 × 1.2 × 25 = <strong>15 Pa</strong>
              </li>
            </ul>
            <p>
              <strong>Step 2 — a branch takes 0.4 m³/s.</strong> The remaining 0.8 m³/s continues
              in a duct reduced to 600 mm × 300 mm.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>A = 0.6 × 0.3 = <strong>0.18 m²</strong></li>
              <li>v = 0.8 / 0.18 = <strong>4.44 m/s</strong></li>
              <li>
                p_v = 0.5 × 1.2 × 4.44² = 0.6 × 19.71 = <strong>11.83 Pa</strong>
              </li>
            </ul>
            <p>
              <strong>Step 3 — static regain across the transition.</strong> Velocity pressure
              has fallen by 15 − 11.83 = 3.17 Pa. A well-formed gradual transition might recover
              about three quarters of that as static pressure: 0.75 × 3.17 ={' '}
              <strong>2.38 Pa</strong> of regain. An abrupt step recovers almost none of it —
              the flow separates and the energy is lost to turbulence.
            </p>
            <p>
              <strong>Step 4 — a bend in the main.</strong> A bend with a loss factor ζ = 0.30,
              placed where the velocity is 5 m/s:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Δp = ζ × p_v = 0.30 × 15 = <strong>4.5 Pa</strong></li>
              <li>
                The same fitting at 8 m/s: p_v = 0.5 × 1.2 × 64 = 38.4 Pa, so Δp = 0.30 × 38.4 ={' '}
                <strong>11.52 Pa</strong> — two and a half times the loss for the same component,
                purely because of the velocity chosen upstream
              </li>
            </ul>
            <p>
              <strong>Step 5 — fan duty and power.</strong> Suppose the index route from fan to
              the most remote terminal totals <strong>350 Pa</strong> of total pressure loss,
              at 1.2 m³/s:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Air power = Q × Δp = 1.2 × 350 = <strong>420 W</strong>
              </li>
              <li>
                At a combined fan and motor efficiency of 60%: 420 / 0.6 ={' '}
                <strong>700 W input</strong>
              </li>
              <li>
                Specific fan power = 700 W / 1.2 m³/s = 583 W per m³/s ={' '}
                <strong>0.58 W per l/s</strong>
              </li>
            </ul>
            <p>
              <strong>What step 4 is really telling you.</strong> Every unnecessary fitting, and
              every metre of duct run at a needlessly high velocity, is added to the 350 Pa and
              then divided by 0.6 — for every hour the fan runs, for the life of the building.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked example 6 — flow regime check on the branch"
            plainEnglish="One quick Reynolds number tells you whether you are in the square-law world your sizing charts assume."
          >
            <p>
              Take the 35 mm branch from worked example 1, carrying water at 60 °C with a
              kinematic viscosity of about <strong>0.478 × 10⁻⁶ m²/s</strong>, at the calculated
              velocity of 1.56 m/s.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Re = vd / ν = (1.56 × 0.035) / (0.478 × 10⁻⁶)</li>
              <li>1.56 × 0.035 = 0.0546</li>
              <li>
                Re = 0.0546 / 0.000000478 ≈ <strong>114,000</strong>
              </li>
            </ul>
            <p>
              Far above 4000, so the flow is firmly turbulent and the square-law friction
              assumption behind the sizing charts holds.
            </p>
            <p>
              <strong>Now the part-load case.</strong> The same branch throttled to 0.05 m/s:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0.05 × 0.035 = 0.00175</li>
              <li>
                Re = 0.00175 / 0.000000478 ≈ <strong>3660</strong> — transitional
              </li>
            </ul>
            <p>
              At that turndown the branch is no longer behaving the way the design assumed. Heat
              transfer at the terminal falls off, control becomes unstable and the measured
              performance drifts away from the calculation. This is the physics behind minimum
              flow requirements and control valve turndown limits.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Pressure testing, flushing and proportional balancing"
            plainEnglish="A system is not finished when it holds water. It is finished when every terminal has been measured at its design flow and the readings are on paper."
          >
            <p>
              <strong>Pressure testing</strong> happens before insulation, boxing-in and ceilings
              — while joints are still reachable. The system is filled, vented and held at test
              pressure for a defined period, and the gauge is watched for decay. Test pressure
              is set above the maximum working pressure the section will see in service, which
              on a tall building means allowing for the static head at low level as well as the
              pump head.
            </p>
            <p>
              <strong>Flushing and cleaning</strong> follow. Installation debris, flux, swarf and
              jointing compound will otherwise end up in strainers, control valve seats and
              terminal coils, quietly rewriting your pressure budget. A blocked strainer is a
              step change in system resistance, and it presents on site as a starved terminal
              rather than as a dirty strainer.
            </p>
            <p>
              <strong>Proportional balancing</strong> is where the index circuit concept earns
              its keep. The principle:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The pump develops the pressure needed by the index circuit — the hardest path in
                the system.
              </li>
              <li>
                Every shorter, lower-resistance branch therefore sees more pressure than it
                needs, and would run well over its design flow if left alone.
              </li>
              <li>
                Each branch has a regulating valve. Working outwards from the index, the
                commissioning engineer sets each valve so that all branches carry the{' '}
                <strong>same proportion</strong> of their design flow.
              </li>
              <li>
                When every branch is at the same proportion, a single adjustment at the pump or
                the main regulating valve brings the whole system to 100% together.
              </li>
              <li>
                Flows are measured, not assumed — commonly by reading the pressure drop across a
                fixed orifice or a valve of known characteristic, and converting it to flow.
              </li>
            </ul>
            <p>
              <strong>The recorded result matters as much as the act.</strong> Commissioning
              records — measured flows, valve positions, pump settings, test pressures — are what
              the next engineer will work from when the building is altered. Undocumented
              balancing is balancing that will be undone by the first person who changes a valve.
            </p>
            <p>
              The air side has its direct equivalent: duct leakage testing on higher-pressure
              systems, then a traverse-and-damper exercise to set branch and terminal flows,
              recorded the same way.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Litres and cubic metres in the same sum</strong> — a factor of 1000
                  through a continuity calculation, and a velocity that should have looked
                  absurd
                </li>
                <li>
                  <strong>Metres head and kPa mixed in one budget</strong> — add in one unit,
                  convert once at the end
                </li>
                <li>
                  <strong>Assuming the longest run is the index run</strong> — a short branch
                  with a high-resistance terminal or a strainer can beat it
                </li>
                <li>
                  <strong>Adding a margin on top of a margin</strong> — a 10% allowance on top
                  of components already selected conservatively, plus a rounded-up pump, is how
                  systems end up permanently throttled
                </li>
                <li>
                  <strong>Quoting cube-law savings as if they were guaranteed</strong> — static
                  head, pressure setpoints and drive losses all erode them
                </li>
                <li>
                  <strong>Forgetting velocity pressure exists on the air side</strong> — fitting
                  losses are proportional to it, so an upstream velocity choice is priced into
                  every fitting downstream
                </li>
              </ul>
            }
            doInstead="Work in SI units throughout and convert once. Calculate the two or three candidate index runs in full rather than guessing. State margins explicitly and apply them once, at the end. Present variable-speed savings as modelled figures with their assumptions written down. And on the air side, always calculate velocity pressure before applying a fitting loss factor."
          />

          <SectionRule />

          <Scenario
            title="The starved index terminal"
            situation={
              <>
                A new LTHW installation is handed over. Every room reaches temperature except
                the AHU coil at the far end of the top floor, which never gets warm. The pump
                is running, the plant is satisfied and there are no alarms.
              </>
            }
            whatToDo={
              <>
                Recognise the symptom: the index circuit is not receiving its design flow, and
                the index circuit is where any shortfall shows first because it has the least
                surplus pressure. Measure, do not guess. Take the differential pressure across
                the index branch regulating valve and convert it to flow — if the flow is short,
                establish whether the pump is developing its design head. If the pump is on
                duty, the extra resistance is in the system: a blocked strainer, a partly shut
                isolating valve, a control valve not driving fully open, or air trapped at a
                high point. If the pump is not developing its head, revisit the pressure budget
                and the selection — the calculated 7.65 m may have been optimistic, or a branch
                was added after the pump was ordered. Only once the index terminal makes its
                design flow does it make sense to rebalance the branches proportionally.
              </>
            }
            whyItMatters={
              <>
                The instinctive response — open the index branch valve wide — often makes it
                worse, because it lets the nearer branches keep their over-flow while the index
                still starves. The index circuit is the diagnostic reference point for the whole
                system, and treating it as such turns a vague complaint into a measurable fault.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="The oversized pump throttled by a valve"
            situation={
              <>
                An energy survey finds a constant-speed pump whose discharge regulating valve is
                nearly shut. Flow measures close to design, but the differential pressure across
                that valve is enormous and the plant room is noisy. The client wants to know why
                the pump energy figure looks so poor.
              </>
            }
            whatToDo={
              <>
                Explain it as two curves. Closing the valve steepened the system curve, so the
                operating point moved up and to the left along the pump curve: less flow, but
                more developed head. The pump is still doing nearly as much work as before, and
                the surplus energy is being destroyed across the valve as pressure drop, heat
                and noise. Quantify it — measure the pressure drop across the valve and multiply
                by the flow to get the power being thrown away. Then present the options:
                trimming or replacing the impeller to bring the pump curve down permanently, or
                fitting a variable-speed drive so the pump follows an affinity-law path where
                power falls with the cube of speed. Model the saving against the real duty
                profile, not a headline percentage.
              </>
            }
            whyItMatters={
              <>
                Throttling is the visible fingerprint of an oversized selection, and it is
                common — margins layered on margins at design stage produce a pump that can only
                be made to fit by strangling it. The fix is cheap compared with the energy it
                recovers, and the diagnosis is entirely within Section 2&rsquo;s physics.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="The noisy duct above the boardroom"
            situation={
              <>
                A completed office fit-out generates persistent complaints of a rushing noise
                from the ceiling of one meeting room. The system is at design flow and the
                terminal has been balanced correctly.
              </>
            }
            whatToDo={
              <>
                Treat it as a velocity problem, because regenerated noise rises steeply with
                velocity. Traverse the branch to establish the actual velocity, and inspect for
                anything that locally accelerates or disturbs the air: a partly closed balancing
                damper doing the work a duct size should have done, a tight mitred bend without
                turning vanes just upstream of the terminal, a crushed flexible connection, or a
                transition that is too abrupt. Note that halving the velocity in that section
                cuts velocity pressure to a quarter, and the fitting losses with it. Remedies in
                order of preference: increase the duct size in the offending section so the
                damper can open up; improve the fitting geometry; and only then consider
                attenuation, which treats the symptom and adds resistance the fan must pay for.
              </>
            }
            whyItMatters={
              <>
                Duct noise is one of the commonest post-handover complaints, and it is almost
                always traceable to a velocity decision or a fitting that was fine on the
                drawing. Acoustic comfort is precisely why low velocities are held in ducts
                serving occupied spaces — the sizing judgement made at design stage is heard by
                the occupant.
              </>
            }
          />

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The formulas worth having by heart, and the habits that keep the numbers honest."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q = vA</strong> — continuity; A = πd²/4 for a circular section
              </li>
              <li>
                <strong>p = ρgh</strong> — head to pressure; for water, 1 m ≈ 9.81 kPa
              </li>
              <li>
                <strong>p_v = ½ρv²</strong> — velocity pressure; air ≈ 1.2 kg/m³
              </li>
              <li>
                <strong>p_t = p_s + p_v</strong> — total pressure
              </li>
              <li>
                <strong>Δp = ζ × ½ρv²</strong> — fitting loss from a loss factor
              </li>
              <li>
                <strong>Re = vd/ν</strong> — flow regime; turbulent above roughly 4000
              </li>
              <li>
                <strong>H = H_static + kQ²</strong> — system resistance curve
              </li>
              <li>
                <strong>Q ∝ N, H ∝ N², P ∝ N³</strong> — affinity laws
              </li>
              <li>
                <strong>Power = Q × Δp ÷ efficiency</strong> — pump or fan input power
              </li>
            </ul>
            <p>
              <strong>Habits that prevent errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Convert everything to SI at the top of the sheet — m³/s, m, Pa, kg/m³ — and
                convert back only for presentation
              </li>
              <li>
                Check every result a second way: the diameter-ratio check on a velocity, the
                reverse conversion on a head
              </li>
              <li>
                Ask whether the answer is plausible before you write it down — a 180 W pump on a
                90 kW circuit is believable; 1.8 kW is not
              </li>
              <li>
                State the source of every input — manufacturer&rsquo;s curve, reference data,
                site measurement — and the date it was taken
              </li>
              <li>
                Record what was measured at commissioning, not what was designed
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Continuity Q = vA is the first calculation on any pipe or duct — and choosing a size is really choosing a velocity.',
              'Velocity is charged for twice: friction loss rises roughly with v² in turbulent flow, and regenerated noise rises with it too.',
              'Total pressure = static + velocity pressure; velocity pressure p_v = ½ρv², with air taken as about 1.2 kg/m³.',
              'For water, 1 m of head ≈ 9.81 kPa. Add a pressure budget in one unit and convert once at the end.',
              'Almost all building services distribution is turbulent at design flow, which is why the system curve is a parabola H = H_static + kQ².',
              'The index circuit is the path of greatest total resistance — it sets the pump duty and is the reference point for proportional balancing.',
              'Affinity laws: Q ∝ N, H ∝ N², P ∝ N³ — the cube law is the entire energy case for variable-speed pumping, but real static head and pressure setpoints erode it.',
              'Throttling an oversized pump destroys the surplus energy across a valve; slowing the pump moves it down an affinity-law path instead.',
              'Fan and pump input power = Q × Δp ÷ efficiency — every avoidable pascal is paid for every hour the machine runs.',
              'A system is complete when measured flows are recorded, not when it holds pressure.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav — 2.7 is the final subsection, so "next"
              returns the learner to the Section 2 overview ─────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                System curves and operating points
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fluid mechanics and hydraulics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_7;
