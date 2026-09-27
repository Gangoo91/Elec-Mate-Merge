/**
 * Unit 319E · Criterion 2.11 — Advantages of balanced star connected systems
 *
 * Written to the criterion rather than ported: the lesson defines what balance
 * actually means, shows what the neutral carries in each case, sets out the
 * advantages in the distribution network and inside the installation, and ends
 * on the practical job of spreading single-phase loads across the three lines.
 *
 * Technical facts taken from the existing English teaching in
 *   level3/module3/section3/Sub1.tsx (three voltages 120 degrees apart, the
 *     instantaneous zero sum, star and delta relationships, why distribution
 *     networks use a star secondary, UK 400/230 V, conductor colours)
 *   level3/module3/section3/Sub5.tsx (neutral current as the vector sum, the
 *     imbalance formula and worked examples, triplen harmonics, BS 7671 523.6.3,
 *     the load-schedule method, lost neutral)
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'For a balanced star-connected load, the neutral current is:',
    options: [
      'Zero — three equal currents 120 degrees apart sum to zero.',
      'Equal to one line current, because the neutral carries the return for each phase in turn.',
      'Three times the line current, because all three returns share one conductor.',
      'Equal to the square root of three times the line current.',
    ],
    correctAnswer: 0,
    explanation:
      'Three currents of equal magnitude spaced 120 degrees apart cancel as vectors at every instant. That is why a balanced three-phase load can be run on a three-wire delta connection or on a four-wire star supply with the neutral carrying nothing.',
  },
  {
    id: 2,
    question: 'In a 400 V star-connected system, the phase voltage between a line and neutral is:',
    options: ['230 V', '400 V', '693 V', '240 V'],
    correctAnswer: 0,
    explanation:
      'V phase equals V line divided by the square root of three: 400 divided by 1.732 is 230.9 V, which rounds to 230 V. That is why every UK three-phase installation gives 230 V single-phase between any line and the neutral, and 400 V between any two lines, from the same supply.',
  },
  {
    id: 3,
    question: 'A single-phase load of 30 A sits on L1 with nothing on L2 or L3. Neutral current is:',
    options: [
      '30 A — with only one line loaded, all the return current flows in the neutral.',
      '0 A, because the neutral only carries current when all three phases are loaded.',
      '10 A, one third of the line current.',
      '52 A, the square root of three times the line current.',
    ],
    correctAnswer: 0,
    explanation:
      'Maximum imbalance is one phase fully loaded and the other two empty. There is no other phase current to cancel against, so the neutral carries the whole of the loaded line current. That is the condition the neutral conductor has to be sized for.',
  },
  {
    id: 4,
    question: 'Why do distribution networks use a star secondary with the neutral brought out?',
    options: [
      'It gives an earthable neutral at the source that defines the fault loop, and it gives customers 230 V single-phase from any line-to-neutral pair alongside 400 V three-phase.',
      'It allows the line voltage to be raised above 400 V without changing the cable.',
      'It removes the need for any protective conductor in the customer installation.',
      'It eliminates harmonic currents from the network entirely.',
    ],
    correctAnswer: 0,
    explanation:
      'A star point can be earthed, which is what defines the earth-fault loop and lets automatic disconnection work. Star also means imbalance currents return through the neutral rather than the earth path, and the winding insulation is only stressed to the phase voltage rather than the line voltage.',
  },
  {
    id: 5,
    question: 'Why is balancing the single-phase loads across the three lines worth the effort?',
    options: [
      'It reduces neutral current, minimises losses, and lets the supply transformer be loaded evenly across all three phases.',
      'It removes the need for a neutral conductor entirely.',
      'It eliminates all harmonic content from the supply.',
      'It allows a smaller protective device to be used on every final circuit.',
    ],
    correctAnswer: 0,
    explanation:
      'Three things follow from balance: less wasted current in the neutral and therefore less loss and heating, even loading of the supply transformer so each phase can be used to capacity rather than one saturating, and reduced voltage imbalance, which three-phase motors do not tolerate well.',
  },
  {
    id: 6,
    question: 'Line currents are 50 A, 30 A and 50 A on a three-phase and neutral supply. I_N is:',
    options: ['20 A', '0 A', '10 A', '130 A'],
    correctAnswer: 0,
    explanation:
      'Using the vector imbalance formula: the square root of 2500 plus 900 plus 2500, less 1500, less 1500, less 2500, equals the square root of 400, which is 20 A. The neutral carries the vector difference, not the arithmetic difference.',
  },
  {
    id: 7,
    question: 'A three-phase load is balanced at the fundamental but every circuit is a non-linear single-phase load. What happens in the neutral?',
    options: [
      'Triplen harmonics — the 3rd, 9th and 15th — are in phase across all three lines and add in the neutral, so the neutral carries current despite the balance.',
      'Nothing — balance at the fundamental guarantees zero neutral current under all conditions.',
      'The harmonics remain 120 degrees apart and cancel in the same way the fundamental does.',
      'The harmonics appear only in the line conductors and never reach the neutral.',
    ],
    correctAnswer: 0,
    explanation:
      'A third harmonic shifted by three times 120 degrees comes back to 360 degrees, which is the same as zero — so all three third harmonics are in phase with one another and add directly. The 5th, 7th, 11th and 13th remain displaced and cancel. That is why a balanced LED-heavy or IT-heavy installation can still have a hot neutral.',
  },
  {
    id: 8,
    question: 'What does BS 7671 require where third harmonic content is high?',
    options: [
      'Above 15 per cent the neutral shall not be smaller than the line conductors, and above 33 per cent the neutral is treated as carrying the same current as the lines and may need to be larger.',
      'The neutral may be reduced in size to save copper, because the fundamental cancels.',
      'The neutral may be omitted entirely on a balanced load.',
      'The line conductors must be doubled but the neutral left unchanged.',
    ],
    correctAnswer: 0,
    explanation:
      'The harmonic treatment in Section 523 is what turns the triplen problem into a cable-sizing rule. Between 15 and 33 per cent the neutral is sized for the equivalent line current; above 33 per cent the neutral can become the limiting conductor for the whole cable. The tabulated capacities are based on the fundamental only and take no account of harmonics.',
  },
];

const faqs = [
  {
    question: 'Why does the square root of three keep appearing?',
    answer:
      'It comes from the geometry of three vectors spaced 120 degrees apart. The line-to-line voltage is the vector sum of two phase voltages 120 degrees apart, which works out at the phase value multiplied by the square root of three — about 1.732. The same factor appears in the line current relationship for a delta connection and in the three-phase power formula.',
  },
  {
    question: 'Can I run single-phase loads off a three-phase supply?',
    answer:
      'Yes. Between any line and the neutral you have 230 V single-phase, which is the whole point of bringing the neutral out. The discipline is to spread those loads evenly across L1, L2 and L3 so the neutral does not end up carrying a large imbalance. Treating a three-phase board as three independent single-phase installations is how a neutral ends up undersized.',
  },
  {
    question: 'Why does delta have no neutral?',
    answer:
      'Because the three windings form a closed loop with no common point, so there is nowhere for a neutral to connect. Delta is used for motor windings, transformer primaries and balanced three-phase loads that do not need a neutral. Some delta systems have a corner-earthed connection, but that is an earth reference rather than a neutral.',
  },
  {
    question: 'How do I actually balance an installation in practice?',
    answer:
      'At design stage, list every single-phase final circuit with its expected current and allocate it to a phase on a one-page load schedule, tallying the totals per phase and aiming for under 10 per cent imbalance before any cable is pulled. On an existing installation, clamp each line at the board during typical operating hours, identify the heaviest circuits on the most-loaded phase, move them at the next planned downtime, and clamp again.',
  },
];

export default function Lesson319e_2_11() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Balanced means three loads of equal magnitude on three voltages that are equal in magnitude and 120 degrees apart. At every instant the three sum to zero.',
          'In a balanced star system the neutral carries nothing. The neutral only ever carries the imbalance, and at maximum imbalance — one phase loaded, two empty — it carries the whole of that line current.',
          'In distribution, the star point can be earthed, which defines the earth-fault loop; imbalance returns through the neutral rather than the earth path; and the winding insulation is stressed only to 230 V rather than 400 V.',
          'In the installation, balance means the supply transformer is loaded evenly, losses and heating in the neutral are minimised, and voltage imbalance stays low — which matters because three-phase motors do not tolerate it.',
          'The practical job is spreading single-phase final circuits evenly across L1, L2 and L3 — and remembering that balance at the fundamental does not stop triplen harmonics adding in the neutral.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Define a balanced three-phase load and explain why three equal currents 120 degrees apart sum to zero at every instant.',
          'State what the neutral conductor carries in a balanced star system and what it carries under maximum imbalance.',
          'Calculate the neutral current for a set of unbalanced single-phase loads using the vector imbalance relationship.',
          'Explain the advantages of a balanced star connected system in the distribution network and inside the installation.',
          'Allocate single-phase final circuits across the three lines to achieve balance, and recognise where triplen harmonics defeat it.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What balanced actually means</ContentEyebrow>

      <ConceptBlock
        title="Equal loads on three equal voltages"
        plainEnglish="A three-phase supply is three sinusoidal voltages of equal magnitude, each spaced 120 degrees from the next, all at 50 Hz. A balanced load draws equal current from each of the three, with the same power factor on each. Balance is a property of the load, not of the supply."
        onSite="Walk into any commercial board and you will find L1 brown, L2 black, L3 grey, N blue and the protective conductor green and yellow. Five conductors carrying a 400 V three-phase supply that can equally be tapped as three separate 230 V single-phase supplies. Whether that board is balanced depends entirely on how the single-phase circuits were shared out."
      >
        <p>
          A three-phase motor is inherently balanced — one machine, three identical windings, equal
          current in each. An installation full of single-phase final circuits is not balanced by
          nature; it is balanced because somebody deliberately distributed the circuits. That is
          the whole practical content of this topic.
        </p>
        <p>
          In a star connection each winding runs from a line conductor to a common star point,
          which is the neutral. The line voltage is the square root of three times the phase
          voltage, which in the UK gives 400 V line and 230 V phase, and the line current equals
          the phase current. In a delta connection each winding sits between two lines, so the
          phase voltage equals the line voltage, the line current is the square root of three
          times the phase current, and there is no neutral because there is no common point for
          one to connect to.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.whyThreePhase} />

      <ConceptBlock
        title="Why the three sum to zero"
        plainEnglish="Take any instant in the cycle and add the three voltages together. They cancel. That is not an approximation or an average over the cycle — it holds at every single instant, and it is the reason balanced three-phase behaves the way it does."
        onSite="It is worth doing the arithmetic once so that the result stops being a claim and becomes something you have checked. Take the instant at which L1 sits at its positive peak of 325 V on a 230 V system."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>L1.</strong> Plus 325 V — the peak.
          </li>
          <li>
            <strong>L2.</strong> 325 multiplied by the cosine of 120 degrees, which is minus
            162.5 V.
          </li>
          <li>
            <strong>L3.</strong> 325 multiplied by the cosine of 240 degrees, which is also minus
            162.5 V.
          </li>
          <li>
            <strong>Sum.</strong> Plus 325, minus 162.5, minus 162.5, which is zero.
          </li>
        </ul>
        <p>
          Pick a different instant and the three numbers change but the sum does not. Apply the
          same reasoning to three equal currents rather than three voltages and you have the
          result the rest of this lesson rests on: three balanced phase currents cancel, so there
          is nothing left over to flow anywhere.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-2-11-check-1"
        question="Three balanced single-phase loads, each drawing 30 A at unity power factor, sit on a three-phase and neutral supply. What does the neutral carry?"
        options={[
          'Nothing. Three equal currents 120 degrees apart cancel as vectors, so the neutral current is zero.',
          '30 A, because each load needs a return path through the neutral.',
          '90 A, because the three return currents add in the shared conductor.',
          '52 A, the square root of three times the line current.',
        ]}
        correctIndex={0}
        explanation="The neutral in a four-wire star supply carries the imbalance and nothing else. With three equal currents displaced by 120 degrees the vector sum is exactly zero, so a perfectly balanced load leaves the neutral carrying no current at all. Real installations are never perfectly balanced, which is why the conductor is there — but the better the balance, the less it carries."
      />

      <SectionRule />

      <ContentEyebrow>The neutral, balanced and unbalanced</ContentEyebrow>

      <ConceptBlock
        title="The neutral carries the imbalance — nothing more, nothing less"
        plainEnglish="In a four-wire star supply the neutral conductor carries the vector sum of the three line currents. Balanced load, zero sum, no neutral current. Unbalanced load, non-zero sum, and the neutral carries the difference."
        onSite="Clamp the neutral at a distribution board and you are reading the imbalance directly. If the three lines clamp at roughly the same value and the neutral reads close to zero, the board is balanced. If one line reads 60 A and the others read 20 A, the neutral is doing work it should not have to and the installation needs circuits moving."
      >
        <p>
          For unity power factor single-phase loads with magnitudes I1, I2 and I3 spaced 120
          degrees apart, the neutral current is the square root of the following: I1 squared plus
          I2 squared plus I3 squared, minus I1 times I2, minus I2 times I3, minus I3 times I1.
        </p>
        <p>Worked through on a real office board with mixed single-phase loads:</p>
        <ul className="space-y-2 text-white">
          <li>L1 is 40 A, L2 is 25 A, L3 is 35 A.</li>
          <li>
            I_N is the square root of 1600 plus 625 plus 1225, less 1000, less 875, less 1400.
          </li>
          <li>That is the square root of 3450 less 3275, which is the square root of 175.</li>
          <li>I_N is 13.2 A.</li>
        </ul>
        <p>
          Put three equal numbers into the same expression and it collapses to zero, which is the
          balanced case falling out of the general one. Put 50, 30 and 50 in and it gives 20 A. A
          clamp on the neutral of a healthy installation should read close to the calculated
          figure; a reading well above it means either harmonic content or power factors that are
          not all unity.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What maximum imbalance looks like"
        plainEnglish="The worst case is one phase fully loaded and the other two carrying nothing. There is no other current to cancel against, so the neutral carries the whole of the loaded line current."
        onSite="That is the case the neutral conductor has to be sized for, which is why the neutral in a three-phase and neutral installation is normally the same cross-sectional area as the lines rather than something smaller. A neutral sized on the assumption that the load will always be balanced is a neutral sized for a condition nobody can guarantee."
      >
        <p>
          The other failure worth knowing about is the lost neutral. If the neutral breaks on a
          three-phase and neutral installation carrying single-phase loads, those loads end up in
          series across the lines instead of each sitting between a line and the neutral. The
          voltage across the more lightly loaded phases rises from 230 V towards 400 V and
          equipment is destroyed.
        </p>
        <p>
          The symptoms are distinctive: several lights failing at once, some outlets dead and
          others delivering odd voltages, power supplies failing across the building. Measure line
          to neutral on each phase, and if any reads well above normal or the three are wildly
          unequal, switch off at the main switch immediately — every minute of running costs more
          equipment — and trace the neutral back to the origin before anything is restored.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-2-11-check-2"
        question="An installer sizes the neutral of a three-phase and neutral submain at half the line cross-sectional area, reasoning that the design load is balanced so the neutral will never carry much. What is wrong with that?"
        options={[
          'Nothing, provided the design is genuinely balanced and the calculation is documented.',
          'Only that it breaches the conductor colour requirements, which is a labelling issue rather than a safety one.',
          'The neutral has to be sized for the worst imbalance, which is one phase fully loaded and the other two empty — in that condition the neutral carries the full line current.',
          'The neutral should be larger than the lines in every installation regardless of the load type.',
        ]}
        correctIndex={2}
        explanation="Balance is a property of how the load happens to be running, not a guarantee. Circuits get switched off, tenants change, and one phase ends up carrying everything. The sizing case is maximum imbalance, where the neutral carries the whole of the loaded line current — which is why the neutral is normally at least the same size as the lines, and larger again where harmonic content is significant."
      />

      <SectionRule />

      <ContentEyebrow>The advantage in the distribution network</ContentEyebrow>

      <ConceptBlock
        title="Why the network is star with the neutral brought out"
        plainEnglish="The distribution transformer feeding a street or a site is almost always delta on the high-voltage side and star with the neutral brought out on the 400 V side. The star point is what makes the low-voltage network work the way it does."
        onSite="If you ever meet a supply with no neutral — rare in the UK but found on some industrial sites running a corner-earthed delta — a line-to-earth fault cannot drive current back through a transformer star point, because there is not one. Automatic disconnection does not behave the same way and the protection has to be designed around residual earth-fault detection instead."
      >
        <p>Four advantages follow from a star secondary with an earthed neutral:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>An earthable neutral at the source.</strong> That is what defines the
            earth-fault loop, and the loop is what lets a protective device operate within the
            required disconnection time.
          </li>
          <li>
            <strong>Two voltages from one supply.</strong> Every customer gets 230 V single-phase
            between any line and the neutral, and 400 V three-phase between any two lines.
          </li>
          <li>
            <strong>Imbalance returns through the neutral.</strong> The unbalanced current comes
            back on a conductor provided for the purpose rather than finding its way through the
            earth path.
          </li>
          <li>
            <strong>Lower insulation stress.</strong> Each winding is stressed only to the phase
            voltage of 230 V rather than the line voltage of 400 V.
          </li>
        </ul>
        <p>
          The balance point matters to the network as much as to the installation. A transformer
          feeding three phases delivers its rating only if all three are being used. Load one
          phase hard and leave the others light and the transformer saturates on one winding long
          before the site has taken the power it is paying to have available.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.5.1 (Ferromagnetic enclosures: electromagnetic effects)"
        clause="The conductors of an AC circuit installed in a ferromagnetic enclosure shall be arranged so that all line conductors and the neutral conductor, if any, and the appropriate protective conductor are contained within the same enclosure."
        meaning="This is three-phase symmetry written as an installation rule. Carry one phase alone through a steel gland and the induced eddy currents heat the gland. Bring all three lines plus the neutral and the protective conductor through together and the flux from the balanced set cancels, because the 120 degree displacement that makes the currents sum to zero makes their fields cancel too. The advantage of balance is not only about the neutral conductor; it shows up in the containment as well."
        cite="Source: BS 7671:2018+A4:2026, Regulation 521.5.1."
      />

      <SectionRule />

      <ContentEyebrow>The advantage inside the installation</ContentEyebrow>

      <ConceptBlock
        title="Three reasons balance pays inside the building"
        plainEnglish="Balance is not tidiness for its own sake. It buys usable transformer capacity, it cuts losses, and it keeps the voltages the equipment sees close to equal."
        onSite="Clamp each line at a small commercial board. If one reads 60 A and the others read 20 A, that installation has an available capacity problem, a heating problem and a voltage problem at the same time, and all three are fixed by moving circuits between phases at the next planned downtime."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Even use of the supply.</strong> Each phase delivers its share, so each can be
            loaded to capacity instead of one saturating while two sit idle.
          </li>
          <li>
            <strong>Minimum neutral current.</strong> Less current in the neutral means less loss
            and less heating in that conductor, and less heating in the cable as a whole.
          </li>
          <li>
            <strong>Reduced voltage imbalance.</strong> Unequal loading pulls the phase voltages
            apart, and three-phase motors run badly on an unbalanced supply.
          </li>
        </ul>
        <p>
          There is a design consequence too. A balanced three-phase load can be calculated
          straightforwardly: for a balanced star load the line current is the power divided by the
          square root of three times the line voltage. An 18 kW balanced heating load on a 400 V
          supply draws 18000 divided by 1.732 times 400, which is 26 A per line. That single chain
          — power, to line current through the square root of three, to cable size, to earth-fault
          loop impedance check — is the same for every balanced three-phase load, and it only
          works cleanly because the load is balanced.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-2-11-check-3"
        question="A site reports that a three-phase motor is running hot and noisily, and the distribution board feeding the building is heavily unbalanced by single-phase loads. What is the likely connection?"
        options={[
          'There is no connection — a motor is a balanced load, so single-phase loading elsewhere cannot affect it.',
          'Unequal loading of the three phases pulls the phase voltages apart, and a three-phase motor runs badly on an unbalanced supply.',
          'The motor is drawing current through the neutral, which is why the neutral is hot as well.',
          'The imbalance raises the supply frequency on the lightly loaded phases, which overspeeds the motor.',
        ]}
        correctIndex={1}
        explanation="Reducing voltage imbalance is one of the three standing reasons for balancing an installation, and three-phase motors are the loads that suffer first. Heavy single-phase loading on one line drags that phase voltage down relative to the others, and the motor sees an unbalanced supply it was never designed for. Fixing the distribution of the single-phase circuits fixes the motor complaint."
      />

      <SectionRule />

      <ContentEyebrow>Doing the job — spreading the load</ContentEyebrow>

      <ConceptBlock
        title="The load schedule — balance is designed, not discovered"
        plainEnglish="On any new three-phase and neutral installation, draw up a one-page schedule listing every single-phase final circuit, its expected steady current, and the phase it has been allocated to. Tally the totals per phase and adjust the allocation before any cable is pulled."
        onSite="The target is under 10 per cent imbalance between L1, L2 and L3. On a refurbishment where the balance is already poor, clamp each line at the board during typical operating hours — mid-morning, lunchtime, end of day — find the heaviest single-phase circuits on the most-loaded phase, move them to the lightest phase at the next planned downtime, and clamp again."
      >
        <p>Worked through on a thirty-six circuit board:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Lighting.</strong> 12 circuits at around 3 A each, 36 A in total. Four per
            phase gives 12 A on each.
          </li>
          <li>
            <strong>Socket outlets.</strong> 18 circuits at around 10 A typical, 180 A in total.
            Six per phase gives 60 A on each.
          </li>
          <li>
            <strong>Heating.</strong> 6 dedicated circuits at 13 A, 78 A in total. Two per phase
            gives 26 A on each.
          </li>
          <li>
            <strong>Per-phase total.</strong> 98 A on each line, with imbalance under 5 per cent —
            a balanced design.
          </li>
        </ul>
        <p>
          The thing that makes this work is doing it as a set rather than as three separate
          single-phase installations. Fill L1 with circuits, then move to L2, then L3, and you
          will get a board that is balanced only when everything happens to be switched on at
          once. Interleave the circuits by type and by expected diversity and the board stays
          reasonably balanced across the day.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The caveat — balanced at the fundamental is not always balanced"
        plainEnglish="Triplen harmonics are the third, ninth and fifteenth. Shift a third harmonic by three times 120 degrees and you have moved it 360 degrees, which is back where it started — so all three third harmonics are in phase with one another and add in the neutral instead of cancelling."
        onSite="In an office full of LED panels, each drawing significant third harmonic, the fundamentals can be perfectly balanced and the neutral will still run hot. Three lines at 20 A each with 30 per cent third harmonic content puts three times 6 A, or 18 A, of triplen current into the neutral on top of any imbalance."
      >
        <p>Which harmonics add and which cancel:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>3rd.</strong> Three times 120 degrees is 360, which is zero — in phase, so it
            adds.
          </li>
          <li>
            <strong>5th.</strong> Five times 120 is 600, which reduces to 240 — still displaced,
            so it cancels.
          </li>
          <li>
            <strong>7th.</strong> Seven times 120 is 840, which reduces to 120 — still displaced,
            so it cancels.
          </li>
          <li>
            <strong>9th.</strong> Nine times 120 is 1080, which is zero — in phase, so it adds.
          </li>
          <li>
            <strong>11th and 13th cancel; the 15th adds.</strong> The pattern repeats on every
            odd multiple of three.
          </li>
        </ul>
        <p>
          On heavily non-linear loads the neutral can end up carrying more current than any one
          line. That is why data centres and similar installations routinely specify an oversized
          neutral busbar and cabling, and why the sizing rules in BS 7671 treat harmonic content
          as a cable-sizing input rather than a curiosity.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 523.6.3 (Neutral conductors)"
        clause="Where the third harmonic content of the line currents is greater than 15 per cent, the neutral conductor shall not be smaller than the line conductors. Where it is between 15 per cent and 33 per cent, the neutral conductor must be sized for the equivalent line current. Above 33 per cent, the neutral conductor shall be considered to carry the same current as the line conductors and may need to be larger than the lines."
        meaning="This is the point at which the triplen problem becomes a cable-sizing decision. At 15 per cent the derating starts; at 33 per cent the neutral effectively becomes the limiting conductor and the cable is sometimes sized up a step from what the line current alone would call for. Modern installations full of LED panels, computer equipment and charging equipment land in that territory routinely."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 523.6.3 and Appendix 4."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 523.6.201 (Tabulated current-carrying capacity and harmonics)"
        clause="The tabulated current-carrying capacities in Appendix 4 are based on the fundamental frequency only and do not take account of the effect of harmonics."
        meaning="Reading a current-carrying capacity out of the table and comparing it with the design current assumes a clean sinusoidal load. Where the load is made up of single-phase non-linear equipment, the triplen content has to be accounted for before that comparison means anything — which is exactly the situation a balanced-looking LED or IT installation creates."
        cite="Source: BS 7671:2018+A4:2026, Regulation 523.6.201; Appendix 4."
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating a three-phase and neutral board as three single-phase installations"
        whatHappens={
          <>
            A small three-phase board is wired by filling L1 with one group of single-phase
            circuits, then L2, then L3, and the neutral is sized for the current of one
            single-phase circuit because nobody thought of it as a shared conductor. The customer
            switches on a heavy load on L1, the board is nowhere near balanced, and the neutral
            overheats carrying the imbalance it was never sized for.
          </>
        }
        doInstead={
          <>
            Design the board as one three-phase set. Spread the single-phase circuits evenly across
            L1, L2 and L3 using a load schedule, and size the neutral for the worst imbalance —
            which is one phase fully loaded with the others empty. Where the load is heavily
            non-linear, the neutral may need to be larger than the lines rather than merely equal
            to them.
          </>
        }
      />

      <CommonMistake
        title="Assuming balance means the neutral is doing nothing"
        whatHappens={
          <>
            An office lighting retrofit replaces the old fittings with a large number of LED
            panels, and the three lines clamp at 22 A each — textbook balance. On that basis the
            existing four-core submain is left alone. Each driver draws significant third
            harmonic, so the neutral is carrying roughly three times 22 times 0.3, around 20 A of
            triplen current, on top of any imbalance. Six months later there is a smell of hot
            insulation in the riser.
          </>
        }
        doInstead={
          <>
            Treat a balanced reading on the lines as the start of the question, not the end of it.
            Clamp the neutral as well, and if it is carrying significant current on a balanced
            board, the cause is harmonic. Apply the harmonic treatment in Section 523 — neutral
            not smaller than the lines above 15 per cent third harmonic, and the neutral treated as
            a fully loaded conductor above 33 per cent — and size accordingly before the cable
            goes in rather than after.
          </>
        }
      />

      <Scenario
        title="Balancing a new three-phase board in a Llandudno hotel refurbishment"
        situation={
          <>
            You are installing a new three-phase and neutral distribution board serving a
            refurbished floor of a hotel in Llandudno. The load is entirely single-phase: corridor
            and room lighting on LED panels, socket circuits in the bedrooms, and a handful of
            dedicated circuits for water heating. There is no three-phase load on the board at
            all. The contracts manager asks why the board is not simply filled up circuit by
            circuit from L1 across.
          </>
        }
        whatToDo={
          <>
            Build the load schedule before pulling a single cable. List each final circuit with its
            expected steady current, allocate it to a phase, and tally the totals so that the three
            come out within about 10 per cent of one another — and interleave the circuit types so
            the board stays balanced when only the lighting is on as well as when everything is.
            Size the neutral for the worst imbalance rather than for the balanced design figure.
            Then deal with the harmonics: the lighting is entirely LED, so the third harmonic
            content is the thing that decides the neutral size, not the balance. Check the content
            against the Section 523 thresholds — above 15 per cent the neutral is not smaller than
            the lines, above 33 per cent it is treated as carrying the same current as the lines
            and may need to be larger — and remember the tabulated capacities assume the
            fundamental only. At commissioning, clamp all three lines and the neutral at the board
            during a normal occupied evening and record the readings on the test documentation.
          </>
        }
        whyItMatters={
          <>
            Every one of the advantages of a balanced star system only materialises if somebody
            makes the balance happen. Filling the board phase by phase gives you a supply
            transformer loaded unevenly, a neutral carrying a large imbalance, losses and heating
            that nobody designed for, and voltage imbalance across the floor. And on an all-LED
            installation the balanced case is not the worst case, because the triplen content adds
            in the neutral regardless of how evenly the fundamentals are shared. Getting both right
            at design stage costs an hour; retrofitting a larger neutral into a finished riser
            costs a great deal more.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Balanced means equal-magnitude loads drawing equal current from three voltages that are equal and 120 degrees apart. The three sum to zero at every instant, not just on average.',
          'In a balanced star system the neutral carries nothing. In an unbalanced one it carries the vector sum of the three line currents.',
          'The vector imbalance for unity power factor loads is the square root of I1 squared plus I2 squared plus I3 squared, less I1 times I2, less I2 times I3, less I3 times I1 — which collapses to zero when the three are equal.',
          'Maximum imbalance is one phase loaded and two empty, and in that condition the neutral carries the whole of that line current. That is the sizing case.',
          'A star secondary with an earthed neutral gives the network an earthable star point that defines the fault loop, two usable voltages from one supply, an imbalance return path that is not the earth path, and insulation stressed only to phase voltage.',
          'Inside the installation, balance gives even use of the supply transformer, minimum neutral current and therefore minimum loss and heating, and low voltage imbalance — which three-phase motors need.',
          'The practical job is a load schedule at design stage aiming for under 10 per cent imbalance, then clamping each line at commissioning and moving circuits where the readings say so.',
          'Balance at the fundamental does not stop triplen harmonics adding in the neutral, and Section 523 turns that into a cable-sizing rule at 15 per cent and again at 33 per cent third harmonic content.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Balanced star connected systems — knowledge check"
      />
    </div>
  );
}
