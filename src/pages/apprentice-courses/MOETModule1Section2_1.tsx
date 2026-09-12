/**
 * MOET · Module 1 · Section 1.2 · Subsection 1 — Dangers of Electricity
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Safe systems of work."
 *              · "Electrical. Electrical isolation and deisolation
 *                 requirements: lockout tagout and testing for dead."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Dangers of Electricity - MOET Module 1.2.1';
const DESCRIPTION =
  'Comprehensive guide to the dangers of electricity for maintenance technicians: electric shock mechanisms, current pathways, arc flash hazards, electrical burns, fire risks, voltage bands and UK accident statistics under BS 7671:2018+A4:2026 and EAWR 1989.';

const quickCheckQuestions = [
  {
    id: 'shock-mechanism',
    question:
      'What is the primary factor that determines the severity of an electric shock injury?',
    options: [
      'The voltage of the supply alone, regardless of any other factor',
      'The magnitude of current flowing through the body and its duration',
      'The colour of the insulation on the conductor touched',
      'The make and model of the equipment being worked on',
    ],
    correctIndex: 1,
    explanation:
      'While voltage drives current, it is the magnitude of current flowing through the body and the duration of exposure that determine the severity of injury. As little as 30 mA AC for a few seconds can cause ventricular fibrillation. Voltage, frequency and pathway all influence the current, but current and time are the critical factors.',
  },
  {
    id: 'let-go-threshold',
    question:
      'At approximately what AC current level does a person lose the ability to release a conductor (the let-go threshold)?',
    options: ['50 mA', '10 mA', '1 mA', '5 mA'],
    correctIndex: 1,
    explanation:
      'The let-go threshold for AC current is approximately 10 mA for most adults. Above this level, involuntary muscle contraction prevents the person from releasing the conductor, greatly increasing the duration of exposure and the risk of fatal injury. For women and children, the threshold may be lower — around 6-8 mA.',
  },
  {
    id: 'arc-flash-temp',
    question: 'What temperature can an arc flash reach at its core?',
    options: ['Up to 1,000 °C', 'Up to 20,000 °C', 'Up to 5,000 °C', 'Up to 100,000 °C'],
    correctIndex: 1,
    explanation:
      'An arc flash can reach temperatures of up to 20,000 °C at its core — approximately four times the surface temperature of the sun. At these temperatures, copper conductors vaporise instantly, creating a superheated plasma and a pressure wave that can cause devastating blast injuries in addition to severe burns.',
  },
  {
    id: 'voltage-bands',
    question:
      'Under BS 7671:2018+A4:2026, what is the upper limit of Band I (extra-low voltage) for AC?',
    options: ['50 V', '12 V', '120 V', '25 V'],
    correctIndex: 0,
    explanation:
      'Band I (extra-low voltage) for AC is defined as not exceeding 50 V AC (or 120 V ripple-free DC) under BS 7671. Above 50 V AC, the voltage is considered sufficient to drive a dangerous current through the human body under normal conditions, which is why 50 V AC is the recognised threshold for danger.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following best describes the mechanism of electric shock?',
    options: [
      'Static charge building up on the surface of the skin over time',
      'Current flows through the body between two points at different potential, disrupting normal biological function',
      'Radiant heat from a conductor warming the body without contact',
      'Magnetic fields from cables inducing a voltage in the bloodstream',
    ],
    correctAnswer: 1,
    explanation:
      "Electric shock occurs when current flows through the body between two points at different electrical potential. The current disrupts the normal electrical signals in the body — particularly the heart's rhythm and the nervous system — and can cause involuntary muscle contraction, respiratory arrest and ventricular fibrillation.",
  },
  {
    id: 2,
    question:
      'A current of 30 mA AC flowing through the chest for more than a few seconds is most likely to cause:',
    options: [
      'Localised skin burns only',
      'A mild tingling sensation',
      'Ventricular fibrillation (cardiac arrest)',
      'Muscular pain but no lasting injury',
    ],
    correctAnswer: 2,
    explanation:
      '30 mA AC (50 Hz) flowing through the chest for more than approximately 40 milliseconds can cause ventricular fibrillation — a chaotic, uncoordinated contraction of the heart muscle that is fatal without immediate defibrillation. This is the basis for the 30 mA RCD sensitivity required by BS 7671 for additional protection.',
  },
  {
    id: 3,
    question: "The 'hand-to-hand' current pathway is particularly dangerous because:",
    options: [
      'Both hands will be burned',
      'The hands have low skin resistance',
      'It causes the strongest muscle contraction',
      'The current path crosses the heart',
    ],
    correctAnswer: 3,
    explanation:
      'The hand-to-hand pathway is extremely dangerous because the current flows directly across the chest, passing through the heart. This gives the highest probability of causing ventricular fibrillation. The hand-to-foot pathway also crosses the heart but typically with a slightly lower percentage of current through the cardiac region.',
  },
  {
    id: 4,
    question: 'Which of the following is NOT a recognised type of electrical burn?',
    options: [
      'Induction burn from proximity to high-frequency conductors',
      'Arc burn from radiant heat of an electrical arc',
      'Flash burn from the ultraviolet radiation of an arc',
      'Contact burn from touching a live conductor',
    ],
    correctAnswer: 0,
    explanation:
      "The three recognised types of electrical burn are contact burns (current flowing through tissue at the point of contact), arc burns (from the intense radiant heat of an electrical arc), and flash burns (from the ultraviolet and infrared radiation produced by an arc). 'Induction burn' is not a recognised classification of electrical burn injury.",
  },
  {
    id: 5,
    question:
      'According to UK statistics, approximately how many people are killed by electricity at work each year?',
    options: ['1-2', '5-10', 'Over 100', '50-60'],
    correctAnswer: 1,
    explanation:
      'HSE statistics show that approximately 5-10 people are killed by electricity at work in the UK each year, with around 1,000 reportable electrical injuries. While the numbers are relatively low compared to other causes, electrical incidents have a very high fatality-to-injury ratio, meaning that when something goes wrong, the consequences are often fatal.',
  },
  {
    id: 6,
    question: 'An arc flash blast pressure wave can reach forces of:',
    options: [
      'Up to 100 Pa (similar to a strong breeze)',
      'Up to 1,000 Pa (similar to a gust of wind)',
      'Up to 70,000 Pa with forces exceeding 200 kg/m²',
      'Up to 100 kPa (similar to being hit by a car)',
    ],
    correctAnswer: 2,
    explanation:
      'Arc flash blast waves can generate pressures exceeding 70,000 Pa (approximately 10 psi) with forces that can throw a person across a room, rupture eardrums, and cause serious blunt-force trauma. The rapid expansion of vaporised copper can increase pressure by a factor of 67,000 within milliseconds. This is why arc flash is often more dangerous than the electrical shock itself.',
  },
  {
    id: 7,
    question: 'Under BS 7671:2018+A4:2026, Band II (low voltage) for AC ranges from:',
    options: ['0 V to 50 V', '50 V to 600 V', '600 V to 1000 V', '50 V to 1000 V'],
    correctAnswer: 3,
    explanation:
      'Band II (low voltage) for AC is defined as exceeding 50 V but not exceeding 1000 V AC (or exceeding 120 V but not exceeding 1500 V ripple-free DC). This covers the standard 230 V single-phase and 400 V three-phase supplies found in most domestic, commercial and industrial installations in the UK.',
  },
  {
    id: 8,
    question: 'Electrical fires account for approximately what percentage of all fires in the UK?',
    options: ['Approximately 14-20%', 'Approximately 50%', 'Less than 5%', 'Over 70%'],
    correctAnswer: 0,
    explanation:
      'Electrical faults are responsible for approximately 14-20% of all fires in the UK, making electricity one of the most significant causes of fire. Common electrical causes include overloaded circuits, deteriorated insulation, loose connections causing arcing, and faulty appliances. Proper installation, maintenance and periodic inspection are critical fire prevention measures.',
  },
  {
    id: 9,
    question: 'Which secondary injury is MOST commonly associated with electric shock at height?',
    options: [
      'Hearing loss from the noise of the supply being interrupted',
      'Falls caused by involuntary muscle contraction or startle response',
      'Long-term respiratory illness from inhaling ozone',
      'Repetitive strain injury from gripping the conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Falls are the most common secondary injury from electric shock. Even a minor shock that causes a startle response or involuntary muscle contraction can cause a person to fall from a ladder, scaffold or roof. Secondary injuries from falls often cause more serious harm than the electrical contact itself, which is why working at height near electrical equipment requires careful risk assessment.',
  },
  {
    id: 10,
    question: 'At 50 Hz AC, the body is particularly vulnerable because:',
    options: [
      'At 50 Hz the skin offers almost no electrical resistance at all',
      '50 Hz produces far more heat in the body than any other frequency',
      '50 Hz is close to the frequency range that most effectively causes ventricular fibrillation',
      '50 Hz current cannot be detected by any residual current device',
    ],
    correctAnswer: 2,
    explanation:
      'The human heart is most vulnerable to frequencies in the range of 15-100 Hz, and 50 Hz falls squarely within this danger zone. At this frequency, the risk of ventricular fibrillation is at its maximum for a given current level. Higher frequencies (above 1 kHz) tend to cause more surface heating but less cardiac disruption, while DC requires roughly 3-4 times the current to cause the same fibrillation risk.',
  },
  {
    id: 11,
    question: 'The Electricity at Work Regulations 1989 place duties on:',
    options: [
      'Only the manufacturer of the electrical equipment',
      'Only the Distribution Network Operator supplying the premises',
      'Only employers, with no duties placed on individual workers',
      'Employers, self-employed persons and employees — all who may be affected',
    ],
    correctAnswer: 3,
    explanation:
      'The EAWR 1989 place duties on employers, self-employed persons and employees. Regulation 3 makes it clear that duties extend to all persons at work, including employees who must cooperate with their employer and not place themselves or others at risk. This means that as a maintenance technician, you have personal legal duties under the EAWR.',
  },
  {
    id: 12,
    question:
      'Which of the following scenarios presents the HIGHEST immediate risk of fatal electrocution?',
    options: [
      'Touching a 230 V live conductor with wet hands while standing on a damp concrete floor',
      'Using a double-insulated power tool on a 230 V supply',
      'Touching a 230 V live conductor with dry hands while wearing insulated boots on a dry wooden floor',
      'Working near a 12 V battery in a dry environment',
    ],
    correctAnswer: 0,
    explanation:
      'Wet hands and damp concrete drastically reduce body resistance (from around 100 kΩ dry skin to as low as 1 kΩ wet), while the concrete floor provides a good earth return path. Under these conditions, 230 V could drive a current of 230 mA through the body — far exceeding the 30 mA ventricular fibrillation threshold. This scenario represents a very high risk of fatal electrocution.',
  },
];

const faqs = [
  {
    question: 'Can 230 V domestic voltage really kill?',
    answer:
      "Yes. 230 V is more than sufficient to drive a lethal current through the human body, particularly under adverse conditions such as wet skin, damp environments or when the current path crosses the heart. The majority of fatal electrical accidents in the UK involve 230 V supplies. Never underestimate the danger of 'ordinary' mains voltage.",
  },
  {
    question: 'What is the difference between electrocution and electric shock?',
    answer:
      'Electric shock is the physiological effect of current flowing through the body — it covers the full range from a mild tingle to fatal injury. Electrocution specifically means death caused by electric shock. The terms are often used interchangeably in casual speech, but technically electrocution always implies a fatal outcome.',
  },
  {
    question: 'Why does a 30 mA RCD not guarantee safety from electric shock?',
    answer:
      'A 30 mA RCD will disconnect the supply within 40 ms at 150 mA and within 300 ms at 30 mA. However, ventricular fibrillation can be initiated by 30 mA in as little as 40 ms if the current coincides with the vulnerable period of the cardiac cycle (the T-wave). An RCD significantly reduces the risk but cannot eliminate it entirely — which is why safe isolation and dead working remain the primary controls.',
  },
  {
    question: 'Is DC more or less dangerous than AC at the same voltage?',
    answer:
      'At typical power frequencies (50 Hz), AC is generally more dangerous for causing ventricular fibrillation because the alternating current repeatedly stimulates the heart. DC requires approximately 3-4 times the current to cause fibrillation. However, DC causes more severe electrolytic damage to tissue, makes it harder to release a conductor at the point of contact (due to sustained muscle contraction), and DC arcs are harder to extinguish. Neither should be considered safe.',
  },
  {
    question: 'What should I do if a colleague receives an electric shock?',
    answer:
      'Do NOT touch the casualty if they are still in contact with the source. Isolate the supply if possible — switch off, remove the plug, or use a non-conducting object to separate the casualty from the source. Call 999 immediately. If the casualty is not breathing or has no pulse, begin CPR and use an AED (automated external defibrillator) if available. Time is critical — brain damage begins within 3-4 minutes of cardiac arrest.',
  },
];

const MOETModule1Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.2 · Subsection 1"
        title="Dangers of Electricity"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding the mechanisms, effects and consequences of electrical hazards.
          </p>

          <TLDR
            points={[
              'Shock: Current through body — as little as 30 mA can kill',
              'Arc flash: Up to 20,000 °C plasma, blast pressure, molten metal',
              'Burns: Contact, arc and flash burns — often deep tissue',
              'Fire: 14-20% of UK fires are electrical in origin',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the mechanism of electric shock and current pathways through the body',
              'State the let-go threshold and ventricular fibrillation threshold for AC current',
              'Describe arc flash hazards including temperatures, blast pressure and PPE categories',
              'Identify the three types of electrical burn and their characteristics',
              'Explain how electrical faults cause fires and cite UK statistics',
              'Define voltage bands (ELV, LV, HV) under BS 7671:2018+A4:2026',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Regulatory context</ContentEyebrow>

          <ConceptBlock title="The four documents behind everything on this page">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EAWR 1989:</strong> Absolute duty to prevent danger from electricity
              </li>
              <li>
                <strong>BS 7671:2018+A4:2026:</strong> Voltage bands, protection measures
              </li>
              <li>
                <strong>HASAWA 1974:</strong> General duty of care to employees and others
              </li>
              <li>
                <strong>ST1426:</strong> Hazard awareness and risk control KSBs
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Electric shock</ContentEyebrow>

          <ConceptBlock title="Electric Shock — Mechanism and Effects">
            <p>
              Electric shock occurs when current flows through the human body between two points at
              different electrical potential. The body acts as a conductor, and the resulting
              current disrupts the normal electrical signals that control the heart, respiratory
              system and nervous system. The severity of injury depends on four critical factors:
              the magnitude of current, the duration of exposure, the pathway through the body, and
              the frequency of the supply.
            </p>
            <p>
              It is a common misconception that voltage alone determines danger. While voltage is
              the driving force that pushes current through the body&apos;s resistance, it is the
              current that causes physiological damage. Ohm&apos;s Law applies: I = V / R. A higher
              voltage will drive more current through the same body resistance, but environmental
              conditions (wet skin, damp floors, conductive footwear) can dramatically reduce body
              resistance and allow dangerous currents to flow even at relatively low voltages.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Body Resistance Values">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dry skin:</strong> 100,000 Ω (100 kΩ) — this is the primary protective
                barrier
              </li>
              <li>
                <strong>Wet or broken skin:</strong> 1,000 Ω (1 kΩ) — a 100-fold reduction in
                resistance
              </li>
              <li>
                <strong>Internal body (hand to foot):</strong> 300-500 Ω — once skin is breached,
                the body is highly conductive
              </li>
              <li>
                <strong>At 230 V with wet skin:</strong> I = 230 / 1000 = 230 mA — far above the
                lethal threshold
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Effects of AC Current on the Human Body (50 Hz)"
            headers={['Current (mA)', 'Effect', 'Duration Dependency']}
            rows={[
              ['0.5-2', 'Threshold of perception — tingling sensation', 'Immediate'],
              ['2-10', 'Painful sensation, involuntary muscle contraction begins', 'Immediate'],
              ['10-15', 'Let-go threshold — cannot voluntarily release the conductor', 'Immediate'],
              [
                '15-30',
                'Muscular contraction, breathing difficulty, possible respiratory arrest',
                'Minutes',
              ],
              ['30-50', 'Ventricular fibrillation likely — potentially fatal', 'Seconds'],
              [
                '50-100',
                'Ventricular fibrillation certain, respiratory arrest',
                'Fraction of a second',
              ],
              ['>100', 'Cardiac arrest, severe burns, tissue destruction', 'Instantaneous'],
            ]}
          />

          <ConceptBlock title="Current Pathways Through the Body">
            <p>
              The path that current takes through the body determines which organs are affected. The
              most dangerous pathways are those that cross the heart. IEC 60479-1 provides data on
              the percentage of total current that passes through the heart for different pathways.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Left hand to both feet:</strong> Heart current factor 1.0 (reference) — the
                benchmark pathway
              </li>
              <li>
                <strong>Left hand to right hand:</strong> Heart current factor 0.4 — 40% of current
                through the heart
              </li>
              <li>
                <strong>Right hand to both feet:</strong> Heart current factor 0.8 — still very
                dangerous
              </li>
              <li>
                <strong>Left foot to right foot:</strong> Heart current factor 0.04 — lower risk but
                still hazardous
              </li>
              <li>
                <strong>Both hands to both feet:</strong> Heart current factor 0.7 — common
                industrial scenario
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="AC vs DC — Key Differences">
            <p>
              The frequency of the supply significantly affects the danger level. At 50 Hz AC (UK
              mains frequency), the risk of ventricular fibrillation is at its maximum for a given
              current level.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>50 Hz AC:</strong> Most dangerous for cardiac fibrillation — the heart is
                maximally susceptible in the 15-100 Hz range
              </li>
              <li>
                <strong>DC:</strong> Requires 3-4 times more current for fibrillation, but causes
                sustained muscle lock-on and severe electrolytic tissue damage
              </li>
              <li>
                <strong>High frequency (&gt;1 kHz):</strong> Less cardiac risk but increased surface
                heating (diathermy effect)
              </li>
              <li>
                <strong>DC arcs:</strong> More sustained and harder to extinguish than AC arcs —
                significant in battery and photovoltaic installations
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> The 30 mA trip threshold of RCDs used for additional
              protection under BS 7671 is based directly on the ventricular fibrillation threshold.
              However, an RCD does not guarantee survival — it significantly reduces risk by
              limiting exposure time.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Arc flash</ContentEyebrow>

          <ConceptBlock title="Arc Flash Hazards">
            <p>
              An arc flash is an explosive release of energy caused by an electrical arc between
              conductors or between a conductor and earth. Arc flash events produce extreme
              temperatures, intense light, a pressure wave, molten metal droplets and toxic gases.
              In many industrial electrical incidents, the arc flash causes more severe injuries
              than the electric shock itself.
            </p>
            <p>
              Arc flash occurs when the air gap between conductors or between a conductor and earth
              breaks down, allowing current to flow through the ionised air (plasma). This can be
              triggered by equipment failure, insulation breakdown, contamination (dust, moisture,
              vermin), dropped tools, or accidental contact during maintenance. The severity depends
              on the available fault current, the voltage, the arc gap distance, and the clearing
              time of protective devices.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Arc Flash Characteristics">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature:</strong> Up to 20,000 °C at the arc core — four times the
                surface temperature of the sun
              </li>
              <li>
                <strong>Blast pressure:</strong> Exceeding 70 kPa (10 psi) — can throw a person
                across a room
              </li>
              <li>
                <strong>Sound:</strong> Up to 160 dB — can rupture eardrums and cause permanent
                hearing loss
              </li>
              <li>
                <strong>Light:</strong> Intense ultraviolet and infrared radiation — can cause arc
                eye (photokeratitis) and retinal damage
              </li>
              <li>
                <strong>Shrapnel:</strong> Molten copper and aluminium droplets, fragmented
                equipment and debris
              </li>
              <li>
                <strong>Toxic gases:</strong> Vaporised copper, ozone and other toxic by-products
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Arc Flash PPE Categories (IEEE 1584 / NFPA 70E)"
            headers={['Category', 'Incident Energy (cal/cm²)', 'Required PPE']}
            rows={[
              ['CAT 1', '4', 'Arc-rated shirt and trousers, safety glasses, hearing protection'],
              [
                'CAT 2',
                '8',
                'Arc-rated shirt/trousers, face shield, arc-rated balaclava, leather gloves',
              ],
              ['CAT 3', '25', 'Arc flash suit with hood, arc-rated gloves, leather boots'],
              [
                'CAT 4',
                '40',
                'Multi-layer arc flash suit, arc-rated hood with face shield, heavy-duty leather gloves and boots',
              ],
            ]}
          />

          <ConceptBlock title="ATPV and EBT Ratings">
            <p>
              Arc-rated PPE is tested and rated using two measures:{' '}
              <strong>ATPV (Arc Thermal Performance Value)</strong> — the incident energy level at
              which there is a 50% probability of the onset of a second-degree burn through the
              fabric; and <strong>EBT (Energy Breakopen Threshold)</strong> — the incident energy
              level at which there is a 50% probability the fabric will break open, exposing skin
              directly to the arc. The lower of the two values determines the arc rating of the
              garment. Always select PPE with an arc rating that exceeds the calculated incident
              energy for the task.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Factors Affecting Arc Flash Severity">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Available fault current:</strong> Higher fault levels produce more severe
                arcs
              </li>
              <li>
                <strong>Clearing time:</strong> Slower protective devices allow more energy to be
                released
              </li>
              <li>
                <strong>Working distance:</strong> Energy decreases with the square of the distance
              </li>
              <li>
                <strong>Arc gap:</strong> The distance between conductors affects the arc
                characteristics
              </li>
              <li>
                <strong>Enclosure:</strong> Enclosed equipment can focus the blast energy towards
                the worker
              </li>
              <li>
                <strong>Voltage:</strong> Higher voltages sustain arcs across larger gaps
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> Arc flash risk assessment should be carried out for all
              switchgear where live working or work near live conductors is anticipated. The
              incident energy calculation determines the arc flash boundary (the distance at which
              incident energy drops to 1.2 cal/cm²) and the required PPE category.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Burns, fire and secondary injuries</ContentEyebrow>

          <ConceptBlock title="Electrical Burns, Fire and Secondary Injuries">
            <p>
              Electrical injuries extend far beyond electric shock. Burns are one of the most common
              and devastating consequences of electrical contact, and electrical faults are a
              leading cause of fire in UK buildings. Understanding the mechanisms of these injuries
              is essential for maintenance technicians who work on energised or recently
              de-energised systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three Types of Electrical Burn">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contact burns:</strong> Caused by current flowing through the tissue at the
                point of contact with a live conductor. These burns are often deep, affecting
                muscle, nerve and bone tissue below the skin surface. The entry and exit wounds may
                appear small but mask extensive internal damage — the &apos;iceberg effect&apos;
              </li>
              <li>
                <strong>Arc burns:</strong> Caused by the intense radiant heat from an electrical
                arc. The temperatures involved (up to 20,000 °C) can cause severe burns at distances
                of several metres. Arc burns are often full-thickness (third-degree) and may require
                extensive skin grafting
              </li>
              <li>
                <strong>Flash burns:</strong> Caused by the ultraviolet and infrared radiation
                emitted by an arc. Similar to severe sunburn, flash burns typically affect exposed
                skin and eyes. &apos;Arc eye&apos; (photokeratitis) is a painful condition caused by
                UV exposure to the cornea and can result from even brief exposure to an electrical
                arc
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical Fires — Causes and Statistics">
            <p>
              Electrical faults are responsible for approximately 14-20% of all fires in UK
              buildings — making electricity one of the most significant causes of fire. Common
              electrical causes include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overloaded circuits:</strong> Excessive current causes conductor and
                connection heating beyond safe limits
              </li>
              <li>
                <strong>Loose connections:</strong> High-resistance joints cause localised heating
                and arcing — a progressive fault that worsens over time
              </li>
              <li>
                <strong>Deteriorated insulation:</strong> Age, heat, UV exposure and mechanical
                damage degrade insulation, leading to tracking and eventually flashover
              </li>
              <li>
                <strong>Arcing faults:</strong> Intermittent arcing at damaged conductors can
                generate temperatures sufficient to ignite surrounding materials without tripping
                overcurrent protection
              </li>
              <li>
                <strong>Faulty appliances:</strong> Damaged flex, internal faults and inadequate
                protection cause fires in portable equipment
              </li>
              <li>
                <strong>Incorrect fuse or MCB rating:</strong> Oversized protection allows
                conductors to overheat without tripping
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Secondary Injuries"
            whatHappens={
              <>
                <p>
                  Electric shock and arc flash frequently cause secondary injuries that can be more
                  severe than the primary electrical injury.
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                  <li>
                    <strong>Falls from height:</strong> Involuntary muscle contraction or startle
                    response causes falls from ladders, scaffolds and platforms — the most common
                    secondary injury
                  </li>
                  <li>
                    <strong>Impact injuries:</strong> Being thrown by an arc flash blast wave, or
                    falling against equipment
                  </li>
                  <li>
                    <strong>Hearing damage:</strong> Arc flash generates noise levels up to 160 dB —
                    well above the threshold for permanent hearing damage
                  </li>
                  <li>
                    <strong>Eye injuries:</strong> Arc flash UV radiation causes photokeratitis;
                    debris and molten metal can cause direct eye injury
                  </li>
                  <li>
                    <strong>Psychological trauma:</strong> Witnessing or experiencing an electrical
                    incident can cause post-traumatic stress disorder (PTSD)
                  </li>
                  <li>
                    <strong>Crush injuries:</strong> Contact with moving machinery activated by an
                    electrical fault or short circuit
                  </li>
                </ul>
              </>
            }
            doInstead={
              <>
                Maintenance technicians must consider secondary injury risks in their work planning
                and risk assessments.
              </>
            }
          />

          <ConceptBlock title="UK Electrical Accident Statistics">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fatalities:</strong> Approximately 5-10 deaths from electricity at work per
                year (HSE RIDDOR data)
              </li>
              <li>
                <strong>Reportable injuries:</strong> Approximately 1,000 electrical injuries
                reported to the HSE annually
              </li>
              <li>
                <strong>Fatality ratio:</strong> Electrical incidents have one of the highest
                fatality-to-injury ratios of any workplace hazard
              </li>
              <li>
                <strong>Common scenarios:</strong> Contact with overhead power lines, work on
                &apos;supposedly dead&apos; circuits, and use of unsuitable equipment are the most
                frequent causes of fatal incidents
              </li>
              <li>
                <strong>Domestic:</strong> Approximately 30-50 deaths from electricity in the home
                each year, with around 350,000 injuries
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to
              identify hazards, assess risks and implement appropriate controls. Understanding the
              full range of electrical dangers — not just electric shock — is fundamental to this
              competence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Voltage bands and maintenance scenarios</ContentEyebrow>

          <ConceptBlock title="Voltage Bands and Electrical Maintenance Scenarios">
            <p>
              BS 7671:2018+A4:2026 defines voltage bands that categorise electrical installations
              according to the level of danger they present. Understanding these bands is essential
              for selecting appropriate protection measures, PPE and working procedures. The
              Electricity at Work Regulations 1989 apply to all voltages, but the level of
              precaution required increases with voltage.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="BS 7671 Voltage Bands"
            headers={['Band', 'AC Voltage', 'DC Voltage', 'Common Examples']}
            rows={[
              [
                'Band I (ELV)',
                'Not exceeding 50 V',
                'Not exceeding 120 V',
                'SELV/PELV circuits, telecom, data, fire alarm, LED drivers, control circuits',
              ],
              [
                'Band II (LV)',
                'Exceeding 50 V up to 1000 V',
                'Exceeding 120 V up to 1500 V',
                '230 V single-phase, 400 V three-phase, motor drives, UPS systems',
              ],
              [
                'HV',
                'Exceeding 1000 V',
                'Exceeding 1500 V',
                '11 kV distribution, 33 kV ring main, 132 kV transmission, 400 kV grid',
              ],
            ]}
          />

          <ConceptBlock title="SELV, PELV and FELV">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SELV (Separated Extra-Low Voltage):</strong> Extra-low voltage supply from a
                safety source (e.g., safety isolating transformer) with no earth connection.
                Provides protection against electric shock without additional measures
              </li>
              <li>
                <strong>PELV (Protected Extra-Low Voltage):</strong> Similar to SELV but with an
                earth connection. Used where earthing is required for functional reasons (e.g.,
                telecommunications)
              </li>
              <li>
                <strong>FELV (Functional Extra-Low Voltage):</strong> Extra-low voltage that does
                NOT meet SELV or PELV requirements (e.g., derived from a non-safety source such as
                an autotransformer). Requires the same protection measures as the primary circuit
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Maintenance Scenarios — LV">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Working in consumer units and distribution boards</li>
              <li>Motor control centre (MCC) maintenance</li>
              <li>Socket outlet and lighting circuit work</li>
              <li>Variable speed drive (VSD) inspection</li>
              <li>UPS and battery system maintenance</li>
              <li>Cable termination and jointing</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Maintenance Scenarios — HV">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>11 kV switchgear maintenance and testing</li>
              <li>Transformer oil sampling and testing</li>
              <li>HV cable termination and jointing</li>
              <li>Protection relay calibration and testing</li>
              <li>Ring main unit (RMU) switching operations</li>
              <li>CT and VT inspection and replacement</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Stored Energy Hazards"
            whatHappens={
              <>
                Even after isolation, significant electrical energy can be stored in capacitors,
                long cable runs, transformers and inductors. Capacitors in variable speed drives can
                retain a lethal charge for several minutes after disconnection.
              </>
            }
            doInstead={
              <>
                Always follow manufacturer&apos;s guidance on discharge times and verify with a
                suitable voltage indicator before touching any internal components. UPS batteries
                present a continuous DC hazard that cannot be simply &apos;switched off&apos; — the
                battery must be physically disconnected.
              </>
            }
          />

          <ConceptBlock title="Legal Framework — EAWR 1989 Key Regulations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 3:</strong> Duty on employers and employees — absolute duty to prevent
                danger
              </li>
              <li>
                <strong>Reg 4:</strong> Systems, work activities and protective equipment must be
                constructed and maintained to prevent danger
              </li>
              <li>
                <strong>Reg 12:</strong> Equipment must be made dead before work begins (where
                reasonably practicable)
              </li>
              <li>
                <strong>Reg 13:</strong> Adequate precautions to prevent re-energisation during work
              </li>
              <li>
                <strong>Reg 14:</strong> Live working only when unreasonable to work dead,
                reasonable to work live, and suitable precautions taken
              </li>
              <li>
                <strong>Reg 16:</strong> Persons working on electrical systems must be competent or
                supervised
              </li>
              <li>
                <strong>Reg 29:</strong> Defence of &apos;due diligence&apos; — took all reasonable
                precautions and exercised all due diligence
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> The EAWR 1989 duties under Regulations 4-16 are absolute —
              there is no &apos;so far as is reasonably practicable&apos; qualifier. If danger
              arises from a failure to comply, it is a criminal offence regardless of cost or
              convenience. Only Regulation 29 provides a defence of due diligence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=NeUOIFegm9c"

            title="DC Arc Flash on PV array"

            channel="SparkyNinja"

            duration="0:35"

            topic="What an arc flash actually looks like"

            caption="Thirty-five seconds of real footage. Nothing written on this page conveys the energy involved like this does."
          />

          <SectionRule />

          <KeyTakeaways
            title="Quick reference"
            points={[
              'Key thresholds (50 Hz AC): 0.5 mA — perception threshold; 10 mA — let-go threshold; 30 mA — ventricular fibrillation risk (RCD threshold); 50 V AC — Band I/II boundary (danger threshold); 1000 V AC — LV/HV boundary.',
              'Key references: EAWR 1989 — Electricity at Work Regulations; BS 7671:2018+A4:2026 — IET Wiring Regulations; IEC 60479-1 — Effects of current on human body; IEEE 1584 — Arc flash hazard calculations; ST1426 — Maintenance technician standard.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Dangers of electricity knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 1.1.5
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Safe Use of Tools
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section2_1;
