/**
 * Unit 315E · Criterion 1.9 — The requirements for protection against electric
 * shock.
 *
 * Approach: structured the way BS 7671 structures it — basic protection, fault
 * protection, additional protection — with the physiology first, because every
 * threshold and disconnection time in the regulations is derived from what
 * current does to a human body. Ends with how each layer is proved on site.
 *
 * Every technical fact, figure, regulation number and table reference on this
 * page comes from the existing published teaching in this course on electric
 * shock and burns and on the component parts of automatic disconnection of
 * supply (level2/module1/section2/Sub1.tsx and level2/module3/section4/Sub2.tsx).
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
} from '@/components/study-centre/learning';
import { EquipotentialBonding } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'What does the damage in an electric shock?',
    options: [
      'The current flowing through body tissue',
      'The voltage present at the point of contact',
      'The resistance of the skin where contact is made',
      'The static charge stored on the conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage is the pressure; current is what passes through you, measured in milliamps. A few tens of milliamps is enough to fibrillate the heart, which is why every protective device is rated in current.',
  },
  {
    id: 2,
    question: 'The let-go threshold for most people is around:',
    options: ['10–15 mA', '1–2 mA', '100 mA', '1 A'],
    correctAnswer: 0,
    explanation:
      'Below about 10 mA you can usually pull away. Above it the forearm muscles contract so hard you cannot release the conductor, and the longer you are held on the worse it gets.',
  },
  {
    id: 3,
    question: 'Which describes the difference between direct and indirect contact?',
    options: [
      'Direct is touching a live conductor; indirect is touching a metal part that has become live through a fault',
      'Direct is touching a metal part that has gone live; indirect is touching a live conductor',
      'Direct is a shock through one hand; indirect is a shock across both hands',
      'Direct is a shock at low voltage; indirect is a shock at high voltage',
    ],
    correctAnswer: 0,
    explanation:
      'Direct contact is touching something meant to be live. Indirect contact is touching something not meant to be live that has gone live through a fault. Basic protection deals with the first, fault protection with the second.',
  },
  {
    id: 4,
    question: 'Automatic disconnection of supply is made up of:',
    options: [
      'Basic protection by insulation, barriers or enclosures, plus fault protection by protective earthing, protective equipotential bonding and automatic disconnection',
      'A 30 mA RCD on every final circuit and nothing else',
      'Double insulation on every item of equipment connected to the installation',
      'Reducing the supply voltage below 50 V AC at every point of use',
    ],
    correctAnswer: 0,
    explanation:
      'The Part 2 definition names both halves. Basic protection under Section 416, and fault protection through earthing, bonding and automatic disconnection under Regulations 411.3 to 411.6.',
  },
  {
    id: 5,
    question:
      'Maximum disconnection time for a TN final circuit at 120 V < U₀ ≤ 230 V AC under Table 41.1:',
    options: ['0.4 s', '0.2 s', '1 s', '5 s'],
    correctAnswer: 0,
    explanation:
      'TN final circuits get 0.4 s, TT final circuits 0.2 s. Distribution circuits and circuits outside Regulation 411.3.2.2 get up to 5 s on TN and 1 s on TT.',
  },
  {
    id: 6,
    question: 'How does a 30 mA RCD protect against electric shock?',
    options: [
      'It detects current leaking to earth and disconnects within milliseconds',
      'It limits the voltage at the socket to a safe level',
      'It trips when the total circuit current exceeds 30 mA',
      'It raises the resistance of the earth path to block current',
    ],
    correctAnswer: 0,
    explanation:
      'It compares the current going out on the line with the current returning on the neutral. Any imbalance means current is leaking to earth — through a person, for example — and it disconnects, typically within 40 ms.',
  },
  {
    id: 7,
    question: 'Under Regulation 411.3.4, additional protection by 30 mA RCD is required for:',
    options: [
      'AC final circuits supplying luminaires within domestic premises',
      'Distribution circuits feeding sub-boards only',
      'Circuits supplying fixed equipment above 32 A only',
      'Three-phase circuits in commercial premises only',
    ],
    correctAnswer: 0,
    explanation:
      'Domestic lighting circuits now need 30 mA RCD protection, not just socket circuits. Most domestic shocks come from changing lamps and from faulty fittings.',
  },
  {
    id: 8,
    question: 'The BS 7671 voltage band for Low Voltage AC is:',
    options: [
      'Above 50 V AC up to 1000 V AC',
      'Up to 50 V AC',
      'Above 1000 V AC up to 10 kV AC',
      'Anything above 10 kV AC',
    ],
    correctAnswer: 0,
    explanation:
      'Extra-Low Voltage is up to 50 V AC. Low Voltage is 50 V to 1000 V AC, which includes 230 V single-phase and 400 V three-phase. Above 1000 V AC is High Voltage.',
  },
];

const faqs = [
  {
    question: 'How can a low voltage like 230 V actually kill someone?',
    answer:
      'Easily. 230 V across a hand-to-hand path with damp skin pushes well over 100 mA through the body — more than enough to fibrillate the heart in under a second. Most UK electrical fatalities at work happen at 230 V, not on high-voltage systems.',
  },
  {
    question: 'Why do we need additional protection if ADS already works?',
    answer:
      'Because ADS depends on every link in the chain being intact and on the fault being a low-impedance one. Additional protection at 30 mA is the backstop for when basic and fault protection both fail, or when someone does something neither of them can predict — driving a nail through a buried cable, for instance.',
  },
  {
    question: 'What is the difference between earthing and bonding in the protective scheme?',
    answer:
      'Earthing connects the MET back to the source so fault current can return and operate the protective device. Bonding connects extraneous-conductive-parts to the MET so they sit at the same potential as everything else during the fault. Disconnection alone still leaves a few hundred milliseconds of dangerous touch voltage on unbonded metalwork, so you need both.',
  },
  {
    question: 'How do I prove the protective measures actually work on an installation?',
    answer:
      'Three measurements cover most of it. Continuity of protective conductors — R1+R2 or an R2 test — proves the installation-side path is unbroken. Earth fault loop impedance at the furthest point of each circuit proves total loop impedance is low enough for the device to operate in time. A functional RCD test proves the device itself operates.',
  },
];

export default function Lesson315e_1_9() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Three layers, in order: keep people off live parts, disconnect fast when metalwork goes
        live, and put a 30 mA backstop behind both. Every figure in the regulations comes from what
        current does to a human body.
      </p>

      <TLDR
        points={[
          'Protection against electric shock is layered — basic protection, fault protection and additional protection. Each covers what the one before it cannot.',
          'Basic protection keeps you off live parts: insulation, barriers, enclosures, IP-rated casings.',
          'Fault protection is automatic disconnection of supply — protective earthing, protective equipotential bonding and a device that opens the line inside the Table 41.1 time.',
          'Additional protection is the 30 mA RCD, set deliberately below the fibrillation threshold and disconnecting typically within 40 ms.',
          'Class II equipment and SELV or PELV are alternative protective measures that remove the hazard rather than disconnecting it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the physiological current thresholds that the protective measures in BS 7671 are sized against.',
          'Distinguish direct contact from indirect contact and match each to the protective measure that addresses it.',
          'Describe what basic protection requires in practice on a real installation.',
          'Explain fault protection as a chain of earthing, bonding and disconnection, and state the Table 41.1 maximum disconnection times.',
          'State where additional protection by 30 mA RCD is required, and identify Class II and SELV or PELV as alternative protective measures.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What we are protecting against</ContentEyebrow>

      <ConceptBlock
        title="Current does the damage — and the thresholds set every number in the regulations"
        plainEnglish="Voltage is the pressure. Current is what actually flows through your tissue, scrambles the nerve signals to your muscles, heats what it passes through, and throws your heart out of rhythm."
        onSite="A 12 V battery is harmless to hold. A 230 V socket can kill you. Same body, same resistance — the difference is how much current the voltage can push through you."
      >
        <p>
          These figures come from decades of medical research and assume a path through the body
          lasting more than around 200 ms. They are round numbers, but they are the numbers every
          protective device in BS 7671 is sized against:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>1–2 mA.</strong> Perception threshold. You feel a tingle.
          </li>
          <li>
            <strong>5–10 mA.</strong> Painful, but you can usually still let go.
          </li>
          <li>
            <strong>10–15 mA.</strong> Let-go threshold. The forearm muscles contract and clamp onto
            the conductor and you cannot release.
          </li>
          <li>
            <strong>20–30 mA.</strong> Severe shock. Sustained muscle contraction, and respiratory
            paralysis if the path crosses the chest.
          </li>
          <li>
            <strong>50 mA and above.</strong> Ventricular fibrillation likely. The heart stops
            pumping and brain damage starts within 3–7 minutes.
          </li>
          <li>
            <strong>100 mA and above.</strong> Fibrillation almost certain at typical durations,
            plus deep tissue burns at the entry and exit points.
          </li>
        </ul>
        <p>
          <strong>Body impedance is not a constant.</strong> Skin impedance is high when dry and much
          lower when wet; internal impedance is fairly low throughout. Wet hands, sweat, a cut, or a
          conductor that punctures the skin all crash the resistance and let far more current
          through for the same voltage.
        </p>
        <p>
          <strong>Path matters as much as magnitude.</strong> Hand-to-hand current crosses the chest
          cavity directly and is the path most likely to cause fibrillation at low currents.
          Hand-to-foot is dangerous but generally lower risk. That is the whole argument for
          one-handed working near anything that might still be live.
        </p>
        <p>
          For scale: a 100 W lamp draws around 400 mA and a kettle draws around 13 A. The current
          that kills you is tiny by comparison, which is exactly why a 30 mA device is a meaningful
          safeguard.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Two contact scenarios, and one protective layer for each"
        plainEnglish="Direct contact is touching something that is meant to be live. Indirect contact is touching something that is not meant to be live but has gone live because something faulted inside it."
        onSite="The washing machine case that gives you a tingle, the dishwasher that buzzes when you brush past it — that is indirect contact. A fault has put line voltage on the case because the insulation or the earth has failed."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Direct contact.</strong> A bare conductor, an open terminal, a live busbar.
            Addressed by basic protection.
          </li>
          <li>
            <strong>Indirect contact.</strong> A metal enclosure, a luminaire body, an appliance
            casing that a fault has energised. Addressed by fault protection.
          </li>
          <li>
            <strong>Everything else.</strong> The nail through the buried cable, the damaged flex,
            the failure that neither of the first two layers anticipated. Addressed by additional
            protection.
          </li>
        </ul>
        <p>
          The HSE receives reports of around 1,000 electric shock and burn accidents at work each
          year, of which around 30 are fatal. Most of the fatalities arise from contact with
          overhead or underground power cables. Non-fatal does not mean minor — burns needing skin
          grafts, heart-rhythm problems that surface months later, and falls caused by the shock
          all sit in the non-fatal column.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-9-check-1"
        question="Which protective layer addresses indirect contact?"
        options={[
          'Basic protection — insulation, barriers and enclosures',
          'Additional protection alone, by 30 mA RCD',
          'Fault protection — protective earthing, bonding and automatic disconnection',
          'Voltage banding, by keeping the circuit within Low Voltage',
        ]}
        correctIndex={2}
        explanation="Indirect contact is touching metalwork that a fault has made live. Fault protection — earthing, bonding and automatic disconnection — is the measure that deals with it. Basic protection keeps you off parts that are live by design."
      />

      <SectionRule />

      <ContentEyebrow>Basic protection</ContentEyebrow>

      <ConceptBlock
        title="Keep people off the live parts in the first place"
        plainEnglish="Basic protection is everything that physically stands between a person and a conductor that is meant to be live. It is the layer you build into the installation and then never think about again — which is exactly why it gets degraded without anyone noticing."
        onSite="Every missing blank, every cracked accessory faceplate, every enclosure with the lid off and the supply on is a basic protection failure. They are the easiest defects to find and the easiest to put right."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Basic insulation of live parts.</strong> The insulation on a cable is not
            decoration — it is the primary protective measure on every metre of every circuit.
          </li>
          <li>
            <strong>Barriers and enclosures.</strong> Consumer unit covers, accessory faceplates,
            blanking plates, terminal shrouds and IP-rated casings.
          </li>
          <li>
            <strong>Plug shutters.</strong> A designed-in barrier at the one point in a domestic
            installation where children reliably interfere.
          </li>
        </ul>
        <p>
          <strong>Why it degrades quietly.</strong> Nothing about a missing blanking plate or a
          cracked faceplate stops the installation working, so nobody reports it. The circuit still
          functions, the tests still pass, and the defect sits there until someone puts a finger or
          a screwdriver where the barrier used to be. On a periodic inspection, basic protection
          defects are usually the largest single category of what you find, and almost all of them
          are a few pounds and a few minutes to correct.
        </p>
        <p>
          The BS 7671 definition of automatic disconnection of supply names Section 416 as the
          source of the basic protection requirement, which tells you something important: basic
          protection is not a separate scheme sitting alongside ADS, it is the first half of it. An
          installation with perfect earthing and a missing consumer unit cover is not protected.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Fault protection</ContentEyebrow>

      <ConceptBlock
        title="Automatic disconnection of supply — a chain, not a component"
        plainEnglish="A line conductor touches exposed metalwork. Without fault protection the metal sits at line voltage waiting for someone to touch it. With it, enough fault current flows that the protective device opens the circuit before touch voltage can persist long enough to harm anyone."
        onSite="Every installation you work on uses ADS as its primary protective measure. Understanding it as a chain is what lets you find the one broken link that has silently disabled the whole thing."
      >
        <p>
          The principle is to design the installation so that a low-impedance fault between line and
          an exposed-conductive-part causes enough fault current to flow that the protective device
          disconnects the line within a defined time. Two things work together:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Protective earthing.</strong> Every exposed-conductive-part connected back to
            the main earthing terminal by a circuit protective conductor, so fault current has a
            route home. Regulation 411.3.1.1 requires a CPC to be run to and terminated at each
            point in wiring and at each accessory, with one exception — a lampholder having no
            exposed-conductive-parts and suspended from such a point.
          </li>
          <li>
            <strong>Protective equipotential bonding.</strong> Extraneous-conductive-parts liable to
            introduce a dangerous potential connected to the main earthing terminal, so that during
            the fault everything a person can touch simultaneously sits at roughly the same
            potential. Regulation 411.3.1.2 is the requirement and Chapter 54 sizes the conductors.
          </li>
          <li>
            <strong>Automatic disconnection.</strong> The MCB, RCBO or RCD that actually opens the
            line once fault current flows.
          </li>
        </ul>
        <p>
          They are not interchangeable. Bonding without disconnection leaves the metalwork live.
          Disconnection without bonding still allows a dangerous touch voltage between adjacent
          earthed and unearthed parts during the few hundred milliseconds before the device opens.
        </p>
        <p>
          <strong>Every link counts.</strong> A perfect electrode plus a broken CPC means no fault
          current flows and the device never trips. A perfect MET plus an undersized earthing
          conductor means the conductor fails before the device clears the fault. It is a series
          chain and each link has to be intact and correctly sized.
        </p>
      </ConceptBlock>

      <EquipotentialBonding />

      <ConceptBlock
        title="The clock the chain is racing — Table 41.1"
        plainEnglish="A disconnection time is a limit on how long a person can be exposed to touch voltage. The protective device has to open the line inside that time given the fault current the loop impedance actually allows."
        onSite="Memorise the four headline figures: 0.4 s on TN final circuits, 0.2 s on TT final circuits, 5 s on TN distribution circuits and 1 s on TT distribution circuits, all at 230 V AC."
      >
        <p>
          Regulation 411.3.2.2 sets the maximum disconnection times for final circuits with a rated
          current not exceeding 63 A with one or more socket-outlets, and final circuits up to 32 A
          supplying only fixed-connected current-using equipment. Distribution circuits and circuits
          outside 411.3.2.2 get the longer times in 411.3.2.3 for TN and 411.3.2.4 for TT.
        </p>
        <p>
          <strong>Why the times differ by system.</strong> TT relies on RCDs, which trip in around
          25–40 ms regardless of fault current, so getting under 0.2 s is straightforward. On TN, an
          MCB trips on its magnetic instantaneous element if the fault current is high enough —
          around five times In for a Type B — which is also fast. With a healthy TN-C-S Zs of around
          1.0 Ω, fault current is 230 V ÷ 1.0 Ω = 230 A, comfortably above the magnetic threshold of
          any Type B device.
        </p>
        <p>
          <strong>Why distribution circuits get longer.</strong> Touch-voltage risk drives the
          figure. Final circuits feed accessories that ordinary people handle every day. Distribution
          circuits feed downstream boards in service positions where contact is rare and brief.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.2.2 and Table 41.1 (Maximum disconnection times)"
        clause="Maximum disconnection times stated in Table 41.1 shall be applied to final circuits with a rated current not exceeding: (a) 63 A with one or more socket-outlets; and (b) 32 A supplying only fixed connected current-using equipment. Table 41.1 — for 120 V < U₀ ≤ 230 V AC: TN system 0.4 s; TT system 0.2 s. Where in TT systems the disconnection is achieved by an overcurrent protective device and the protective equipotential bonding is connected with all extraneous-conductive-parts within the installation in accordance with Regulation 411.3.1.2, the maximum disconnection times applicable to TN systems may be used."
        meaning="On most domestic and commercial TN final circuits at 230 V the protective device must clear a line-to-earth fault in 0.4 s or less, and on TT it is 0.2 s for the same circuits. Distribution circuits and circuits outside 411.3.2.2 get up to 5 s on TN and 1 s on TT. Select a device whose tripping characteristic, together with the measured Zs, actually meets that time."
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.2.2 and Table 41.1."
      />

      <InlineCheck
        id="315e-1-9-check-2"
        question="A circuit protective conductor has been left disconnected inside a junction box halfway along a kitchen circuit. What does that do to fault protection?"
        options={[
          'A fault beyond the junction box has no return path, so fault current cannot flow and the protective device cannot operate',
          'Nothing serious — the gas and water main bonding gives the metalwork an alternative earth return',
          'It only affects the neutral return, so the circuit still disconnects normally on an earth fault',
          'It raises Zs slightly but the device will still clear the fault within the required time',
        ]}
        correctIndex={0}
        explanation="Bonding to extraneous parts does not replace a CPC. Without a continuous protective conductor there is no return path, no fault current, no trip, and the exposed metal sits at line voltage. Continuity of every CPC is tested at initial verification for exactly this reason."
      />

      <SectionRule />

      <ContentEyebrow>Additional protection</ContentEyebrow>

      <ConceptBlock
        title="The 30 mA RCD — the backstop when the first two layers fail"
        plainEnglish="An RCD compares the current going out on the line with the current coming back on the neutral. If they do not match, current is leaving the circuit somewhere it should not — through a person, for example — and the device disconnects."
        onSite="30 mA is chosen deliberately: it is below the threshold at which fibrillation becomes likely, and a modern device disconnects typically within 40 ms of detecting the imbalance."
      >
        <p>
          Additional protection does not replace basic or fault protection. It exists for the cases
          neither of them can cover — a failure of basic protection, a failure of fault protection,
          or plain carelessness by a user. Where it is required:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Socket-outlets.</strong> Almost every socket-outlet up to 32 A in a domestic
            installation.
          </li>
          <li>
            <strong>Luminaires in dwellings.</strong> Required by Regulation 411.3.4 for AC final
            circuits supplying luminaires within domestic premises.
          </li>
          <li>
            <strong>Mobile equipment used outdoors.</strong> Where the user, the flex and the
            conditions are all outside your control.
          </li>
          <li>
            <strong>Buried cables.</strong> Any cable buried less than 50 mm in a wall without
            earthed mechanical protection.
          </li>
        </ul>
        <p>
          Note where that leaves the device families. An MCB provides overcurrent protection only
          and relies on high fault current to trigger its magnetic trip, so it works on TN systems
          where Ze is low but will not clear a fault in time on TT. An RCBO combines overcurrent and
          residual protection in a single module and is the standard new-build domestic fit. An RCD
          detects line-to-neutral imbalance and is mandatory at the origin of a TT installation,
          typically a 100 mA S-type, as well as being required as additional protection on most
          final circuits regardless of system.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 415.1.1 (Additional protection)"
        clause="The use of RCDs with a rated residual operating current not exceeding 30 mA is recognized in AC systems as additional protection in the event of failure of the provision for basic protection and/or the provision for fault protection or carelessness by users."
        meaning="30 mA is set deliberately below the threshold at which ventricular fibrillation becomes likely, and modern devices disconnect typically within 40 ms of detecting the imbalance. That is the difference between a survivable jolt and a cardiac arrest. Note the wording — additional protection covers failure of either of the other two layers, and carelessness by users as well."
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 415.1.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.4"
        clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
        meaning="Lighting circuits in dwellings need 30 mA RCD protection, not just socket circuits. The change followed the recognition that a large share of domestic shocks come from changing lamps, from failing fittings and from children reaching lampholders. Installing or modifying domestic lighting means that device has to be there."
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.4."
      />

      <ConceptBlock
        title="Alternatives to disconnection — Class II, SELV and PELV"
        plainEnglish="ADS clears a fault after it happens. The alternative approach is to build equipment or a circuit where the dangerous condition cannot arise in the first place."
        onSite="You will see both on the same job. The drill on your belt is Class II. The shaver socket in the bathroom and the lighting in a bath zone are extra-low voltage."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Class II equipment.</strong> Double or reinforced insulation, with no exposed
            metal that can become live, so no earth connection is needed. Marked with the double
            square symbol.
          </li>
          <li>
            <strong>SELV and PELV.</strong> Reduce the voltage far enough that it cannot push a
            dangerous current through a person. SELV is the safest tier — isolated source, no earth
            connection, and below 50 V AC there is not enough pressure to drive a dangerous current
            through normal dry skin.
          </li>
          <li>
            <strong>Voltage bands.</strong> Extra-Low Voltage is up to 50 V AC, or 120 V ripple-free
            DC. Low Voltage is 50 V to 1000 V AC, which is where almost all of your work sits — 230 V
            single-phase and 400 V three-phase. High Voltage is above 1000 V AC and needs specific
            training and authorisation.
          </li>
          <li>
            <strong>Special locations.</strong> SELV is mandated in the riskiest spots, such as
            inside zone 0 of a bathroom, where the limit is lower again at 12 V AC maximum.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-9-check-3"
        question="A Class II power tool has no earth connection. Which protective measure is it relying on?"
        options={[
          'Automatic disconnection of supply through the flex protective conductor',
          'Double or reinforced insulation, so there is no exposed metal that can become live',
          'The 30 mA RCD protecting the socket it is plugged into',
          'Reduction of the supply voltage below 50 V AC',
        ]}
        correctIndex={1}
        explanation="Class II equipment removes the hazard rather than disconnecting it. Double or reinforced insulation means there is no exposed metal to become live, so there is nothing for a protective conductor to do. An RCD on the socket is welcome additional protection but it is not what makes the tool Class II."
      />

      <SectionRule />

      <ContentEyebrow>Proving it on site</ContentEyebrow>

      <ConceptBlock
        title="Three measurements prove the protective scheme"
        plainEnglish="Protection against shock is not a design claim, it is a measured result. Three tests between them confirm that each layer actually does what the design says it will."
        onSite="Do them in this order and each one gives the next one meaning. A Zs reading is worthless if you have not first proved the protective conductor it depends on."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity of protective conductors.</strong> An R1+R2 or R2 test proves the
            installation-side path is unbroken from every accessory back to the main earthing
            terminal. A break here is the single most common way fault protection is silently
            disabled.
          </li>
          <li>
            <strong>Earth fault loop impedance.</strong> Measured at the furthest point of each
            circuit, Zs confirms that total loop impedance is low enough for the protective device
            to operate inside the Table 41.1 time. Ze is set by the supply side, R1+R2 by the
            installation side, and Zs is the sum.
          </li>
          <li>
            <strong>Functional RCD test.</strong> Confirms the device itself operates. On a TT
            installation this is not a nicety — the RCD is the fault protection, and Regulation
            411.5.3 requires Ra × IΔn ≤ 50 V for it to be relied on.
          </li>
        </ul>
        <p>
          A passing continuity reading is not proof that a connection is mechanically sound. A
          conductor sitting loose in a stripped terminal under spring tension will pass a continuity
          test and will still lift clear under vibration, thermal cycling or the next person working
          in the enclosure. Look as well as measure.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Assuming an RCD makes an earth unnecessary"
        whatHappens={
          <>
            A metal-bodied fitting goes back up with its CPC cut short and never reconnected,
            because the board has 30 mA RCBOs throughout and the reasoning is that the RCD will
            catch anything. The RCD will indeed trip once current starts flowing through a person —
            which is to say, after someone has taken a shock. Until then the fitting can sit at line
            voltage with nothing indicating a fault at all.
          </>
        }
        doInstead={
          <>
            Additional protection is a backstop, not a replacement. Fault protection requires a
            continuous protective conductor to every accessory under Regulation 411.3.1.1, so that a
            line-to-earth fault produces enough current to operate the device before anybody touches
            anything. Reconnect the CPC, sleeve it, and test continuity.
          </>
        }
      />

      <CommonMistake
        title="Bonding everything metal in sight to be on the safe side"
        whatHappens={
          <>
            Over-bonding drags fault current onto pipework that was not previously extraneous, raises
            touch voltages on metalwork that everyone assumed was safe, and creates circulating
            currents on a PME supply. It looks conscientious on the certificate and makes the
            installation less safe.
          </>
        }
        doInstead={
          <>
            Apply Regulation 411.3.1.2 as written: bond extraneous-conductive-parts that are liable
            to introduce a dangerous potential. Establish whether a part is genuinely extraneous
            before you connect it, and size what you do bond by Chapter 54 rather than by whatever
            cable is on the van.
          </>
        }
      />

      <Scenario
        title="A shop-unit periodic inspection in Merthyr Tydfil"
        situation={
          <>
            You are carrying out a periodic inspection on a small retail unit. The board is a
            reasonably modern split-load with RCD protection across most circuits. At the main
            earthing terminal the earthing conductor is loose in its terminal — a previous installer
            over-tightened the screw, stripped the thread, and the strap now sits in place under
            spring tension only. Continuity and insulation resistance both pass, because there is
            physical contact, but you can lift the conductor out by hand.
          </>
        }
        whatToDo={
          <>
            Treat it as a serious defect, not a note. The earthing conductor is the link between the
            entire installation and the source earth, and without a secure mechanical connection
            vibration, thermal cycling or routine work on the board could lift it clear at any
            moment — breaking fault protection for every circuit downstream while the tests still
            read as passes. Make it safe immediately: fit a new earth bar terminal or replace the
            strap, then retest Ze and Zs. Record it, and explain to the customer that the RCDs do
            not compensate for it, because additional protection only acts once current is already
            flowing through someone.
          </>
        }
        whyItMatters={
          <>
            One loose terminal at the MET disables every protective device in the building for
            earth-fault purposes. It is also the clearest illustration of why protection against
            shock is a chain rather than a component, and why a passing test result is never on its
            own proof that a connection is sound.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Current does the damage, not voltage. Key thresholds: 1–2 mA perception, 10–15 mA let-go, 20–30 mA respiratory paralysis, 50 mA and above fibrillation likely.',
          'Direct contact is touching a live part; indirect contact is touching metalwork a fault has made live. Basic protection covers the first, fault protection the second.',
          'Basic protection is insulation of live parts, barriers, enclosures, IP-rated casings and plug shutters — the first half of automatic disconnection of supply, not a separate scheme.',
          'Fault protection is protective earthing plus protective equipotential bonding plus automatic disconnection. Regulation 411.3.1.1 requires a CPC at every point and accessory, with one Class II pendant exception.',
          'Table 41.1 maximum disconnection times at 230 V AC: TN 0.4 s and TT 0.2 s on final circuits under Regulation 411.3.2.2; TN 5 s and TT 1 s otherwise.',
          'Additional protection is the 30 mA RCD under Regulation 415.1.1 — set below the fibrillation threshold, disconnecting typically within 40 ms, and required for sockets, domestic luminaire circuits under 411.3.4, outdoor mobile equipment and cables buried under 50 mm without earthed mechanical protection.',
          'Class II equipment and SELV or PELV are alternative protective measures that remove the hazard instead of disconnecting it. ELV is up to 50 V AC, LV is 50–1000 V AC, HV is above 1000 V AC.',
          'Prove the scheme with three measurements: continuity of protective conductors, earth fault loop impedance at the furthest point, and a functional RCD test.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Protection against electric shock — knowledge check" />
    </div>
  );
}
