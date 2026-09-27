/**
 * Unit 305E · Learning outcome 1 · Criterion 1.1 — The applications, advantages
 * and limitations of electrical cables
 *
 * Welsh Level 3 (Building Services Engineering — Electrotechnical Installation),
 * unit 305E Understand How to Install Wiring Systems. Learning outcome 1:
 * understand the applications, advantages and limitations of types of electrical
 * cables, conductors, wiring systems and associated equipment.
 *
 * Approach: the criterion asks for judgement, not a catalogue. The page teaches
 * the cable families as a set of trade-offs — what each one buys you, what it
 * costs you, and which of the four selection factors (environment, mechanical
 * risk, fire classification, sheath toxicity) decides between them. Regulation
 * numbers, standards and cable designations are all carried across from the
 * published Level 2 wiring-system lessons.
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
import { CableCrossSection } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'In BS 7671, a “wiring system” means:',
    options: [
      'The cable plus its method of support, enclosure or containment, considered together',
      'The cross-sectional area of the conductor on its own',
      'The protective device and its disconnection time for the circuit',
      'The sequence in which circuits are energised at commissioning',
    ],
    correctAnswer: 0,
    explanation:
      'A wiring system is the cable plus the way it is installed — clipped, in conduit, on tray, in trunking, in ducting. Section 521 covers the cable AND the install method as a single decision, which is why you can never select a conductor in isolation from its route.',
  },
  {
    id: 2,
    question: 'A non-sheathed single-core cable used for fixed wiring must be:',
    options: [
      'Enclosed in conduit, ducting or trunking per Reg 521.10.1',
      'Clipped direct to the wall in the same way as sheathed twin and earth',
      'Run loose in a cable basket above a suspended ceiling',
      'Buried direct in plaster within a prescribed zone',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 521.10.1 — non-sheathed cables for fixed wiring shall be enclosed in conduit, ducting or trunking. Trunking is only acceptable where it provides at least IPXXD or IP4X and the cover can only be removed by a tool or a deliberate action. Singles such as 6491X have one layer of insulation and nothing else.',
  },
  {
    id: 3,
    question: 'Mineral-insulated copper cable (MICC, “Pyro”) is constructed from:',
    options: [
      'A solid copper sheath enclosing copper conductors separated by compressed magnesium oxide powder',
      'Galvanised steel wire armour over PVC-insulated cores with a PVC oversheath',
      'PVC-insulated cores with a bare copper CPC under a single PVC outer sheath',
      'Silicone-rubber insulated cores under a stainless-steel screen with an LSZH oversheath',
    ],
    correctAnswer: 0,
    explanation:
      'MICC has a copper outer sheath and copper conductors separated by tightly compressed magnesium oxide. There is no organic insulation to burn, which is why it is rated to BS 6387 CWZ and can operate at around 1000 °C for short periods.',
  },
  {
    id: 4,
    question:
      'Twin and earth is buried in a non-metallic wall less than 50 mm from the surface and is not in a prescribed zone. Reg 522.6.202 requires:',
    options: [
      'Additional protection by 30 mA RCD per 415.1.1, or compliance with Reg 522.6.204 mechanical protection',
      'Nothing further, provided the cable is clipped at 300 mm intervals inside the chase',
      'The cable to be re-routed so it sits at least 100 mm below the finished surface',
      'The cable sheath to be sleeved in green-and-yellow PVC for identification',
    ],
    correctAnswer: 0,
    explanation:
      'Table 52.1 sets the conditions by depth and wall construction. Shallower than 50 mm in a wall with no metallic parts, outside a prescribed zone, you need either 30 mA RCD additional protection under 415.1.1 or mechanical protection satisfying 522.6.204. Both answer the same hazard — the nail or screw driven in years later.',
  },
  {
    id: 5,
    question: 'A steel-wire-armoured sub-main is glanded into a metal enclosure. The armour:',
    options: [
      'Acts as the CPC under Reg 543.2 when correctly glanded and proved by an end-to-end continuity test',
      'Must be left unconnected so that no parallel earth path is created',
      'Carries the neutral current back to the origin of the installation',
      'Provides the third line conductor on a three-phase sub-main',
    ],
    correctAnswer: 0,
    explanation:
      'Properly glanded with a CW or BW gland and bonded at both ends, the armour is an acceptable CPC under 543.2, with the resistance limit for the CSA taken from Table 54.7. It is only a CPC once you have measured R2 — a poorly made gland is a high-impedance earth path.',
  },
  {
    id: 6,
    question: 'FP200 and FP400 fire-resistant cables are classified as:',
    options: [
      'PH30, PH60, PH90 or PH120 to BS EN 50200, according to the circuit-integrity duration required',
      'Class A or Class B, according to the thickness of the steel armour layer',
      'Category 1 to 5, according to the number of cores in the cable',
      'IP4X or IPXXD, according to the enclosure the cable is drawn into',
    ],
    correctAnswer: 0,
    explanation:
      'The FP family uses a stainless-steel screen over silicone-rubber or insulating-tape insulated conductors. The insulation chars but keeps the conductors separated for the classified time — PH30 is 30 minutes, PH120 is 120 minutes. The building’s fire strategy sets which class you specify.',
  },
  {
    id: 7,
    question: 'LSZH cable is specified in a school because:',
    options: [
      'In a fire it produces far less smoke and no halogen acid gases, which matters where evacuation smoke is the major risk',
      'It carries more current than standard PVC cable of the same cross-sectional area',
      'It resists impact damage better than standard PVC cable',
      'It is cheaper than PVC and reduces the material cost on large projects',
    ],
    correctAnswer: 0,
    explanation:
      'Standard PVC releases dense black smoke and hydrogen chloride when it burns. LSZH releases minimal smoke and no acid gases. It typically costs 30 to 50 per cent more than the PVC equivalent, so the decision comes from the building’s fire risk and standards such as BS 9999, BS 5266 and BS 5839 — never from cost.',
  },
  {
    id: 8,
    question:
      'Cat 6a data cable has to share trunking with 230 V mains. The compliant arrangement is:',
    options: [
      'Separation by an earthed metallic screen, multi-compartment trunking, or wholly separate trunking',
      'Cable-tie the data cable to the outside of the mains trunking',
      'Twist the data and mains cables together to balance the induced noise',
      'Run the data cable at least 25 mm away inside the same undivided compartment',
    ],
    correctAnswer: 0,
    explanation:
      'Section 528 of BS 7671 gives three compliant routes — every cable insulated for the highest voltage present, an earthed metallic screen between the bands, or a separate compartment for each band. BS EN 50174-2 then gives the practical separation distances for the data installation.',
  },
];

export default function Lesson305e_1_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A wiring system is the cable plus its support, enclosure and containment, decided together. Section 521 of BS 7671 governs the choice and Section 522 brings in the external influences.',
          'Five families cover almost all UK work — PVC twin and earth, non-sheathed singles in containment, steel-wire armoured, mineral-insulated copper, and the modern fire-resistant FP range, each available with an LSZH sheath.',
          'Every family is a trade-off. Twin and earth is the cheapest and the least protected; SWA buys mechanical protection and a CPC; MICC and FP buy circuit integrity in fire; LSZH buys survivable smoke conditions.',
          'Four factors decide between them: the environment, the mechanical protection needed, the fire-safety classification required, and the smoke toxicity the building can tolerate.',
          'Cable selection is not only BS 7671. On schools, hospitals and public buildings the specification is usually tighter than the regulations, and the specification is what you contracted to deliver.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what BS 7671 means by a wiring system, and why the cable and its method of installation are selected as one decision under Section 521.',
          'State the applications, advantages and limitations of PVC twin and earth, non-sheathed singles in containment, steel-wire-armoured cable, MICC, the FP fire-resistant family and LSZH variants.',
          'Justify a cable choice against the four factors that drive it — environment, mechanical risk, fire-safety classification and sheath toxicity.',
          'Identify where BS 7671 turns a limitation into a requirement, including Reg 521.10.1 for non-sheathed cable and Reg 522.6.202 for cable concealed in walls.',
          'Explain how Band I data cabling is segregated from Band II mains, and which standard supplies the practical separation distances.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Section 521 &mdash; cable and method together</ContentEyebrow>

      <ConceptBlock
        title="A wiring system is the cable and the method, not the conductor"
        plainEnglish="BS 7671 does not let you choose a cable on its own. The cable, the way it is supported, the enclosure it sits in and the environment it passes through are one decision."
        onSite="It is why a spec reads “6491X singles in 25 mm galvanised steel conduit, surface-clipped”. That whole phrase is the wiring system. Change any part of it and the current-carrying capacity, the mechanical protection and the compliance argument all move."
      >
        <p>Four parts of BS 7671 have to be satisfied before a wiring system is settled.</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Section 521.</strong> Which types of wiring system are permitted for the
            conditions you have.
          </li>
          <li>
            <strong>Section 522.</strong> External influences — mechanical, water, chemical, fire,
            vibration and electromagnetic.
          </li>
          <li>
            <strong>Section 523 and Appendix 4.</strong> Current-carrying capacity in the install
            method chosen, which is a different number for every method.
          </li>
          <li>
            <strong>Section 528.</strong> Segregation where circuits of different voltage bands
            share an enclosure.
          </li>
        </ul>
        <p>
          Section 521 asks the designer to have regard to the supply, the load, the conductor and
          its insulation, the wiring system in use, the conditions of installation and any external
          influences. That is a list of judgements, not a lookup — and at Level 3 the criterion is
          whether you can say why one cable was chosen over another and what was given up for it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Twin and earth, and singles in containment</ContentEyebrow>

      <ConceptBlock
        title="PVC twin and earth — cheapest, fastest, least protected"
        plainEnglish="Two or three insulated copper cores plus a bare CPC, all under one PVC sheath. It is inside the walls of nearly every UK home because nothing else installs as quickly for the money."
        onSite="6242Y is the two-core, 6243Y the three-core for two-way and intermediate switching. Both run from 1.0 mm² up to 16 mm². Concealed in chases, through joists, clipped along loft trusses — that is where it belongs, and nowhere else."
      >
        <p>
          The advantages are real: cheapest of the families, fastest to terminate, and at home in a
          concealed route under floors, through joists and in chases, where the building fabric
          supplies the protection the cable itself does not have.
        </p>
        <p>The limitations are what push you into another family, and they are just as specific.</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>No mechanical protection.</strong> A nail goes straight through. Capping in
            masonry chases, conduit if the run is exposed.
          </li>
          <li>
            <strong>Fire performance.</strong> The PVC sheath fails within around ten minutes in a
            fire, so it is not a cable for emergency lighting or fire-alarm circuits — and it
            releases dense black smoke and hydrogen chloride, which rules it out of densely occupied
            public buildings.
          </li>
          <li>
            <strong>Ultraviolet and temperature.</strong> UV degrades PVC over years, and standard
            PVC is a 70 °C cable — not for exposed outdoor runs or hot environments.
          </li>
        </ul>
      </ConceptBlock>

      <CableCrossSection type="twin-and-earth" />

      <InlineCheck
        id="305e-1-1-check-1"
        question="A designer has specified PVC twin and earth for the emergency lighting on a commercial escape route. What is wrong with that selection?"
        options={[
          'Twin and earth cannot be used on any circuit longer than 20 metres',
          'Twin and earth is only permitted on lighting circuits, never on socket-outlet circuits',
          'The PVC sheath fails within around ten minutes in a fire, so the circuit cannot maintain integrity during evacuation',
          'Twin and earth must always be drawn into conduit and is never permitted clipped direct',
        ]}
        correctIndex={2}
        explanation="The failure is fire performance. Standard PVC twin and earth is not classified as fire-resistant, so it cannot maintain the emergency-lighting supply while the building burns. Reg 422.3 requires fire-resistant cable on escape-route safety circuits — FP200, FP400 or MICC — with non-combustible supports."
      />

      <SectionRule />

      <ConceptBlock
        title="Non-sheathed singles — modifiable, protected, and never loose"
        plainEnglish="Single-core insulated cables such as 6491X have one layer of insulation and no sheath. The containment is the protection, so the containment is not optional."
        onSite="Plant rooms, school corridors, factories, commercial fit-outs. Steel conduit with brass bushes and lock-rings, or galvanised trunking. Singles are drawn in — they are never run loose, and a cable basket is not containment for them."
      >
        <p>
          Three things make singles in containment the commercial surface default. The install is
          modifiable — pull one circuit out and draw another in while the containment stays put. The
          containment gives real mechanical protection. And spare capacity in the conduit lets the
          next team add circuits without touching the building fabric.
        </p>
        <p>
          The limitation is the one BS 7671 makes explicit: a single layer of insulation is basic
          protection and nothing more, so Reg 521.10.1 sets both the enclosure requirement and the
          IPXXD or IP4X threshold for trunking with removable covers.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.10.1"
        clause="Non-sheathed cables for fixed wiring shall be enclosed in conduit, ducting or trunking. This requirement does not apply to a protective conductor complying with Section 543. Non-sheathed cables are permitted if the cable trunking system provides at least the degree of protection IPXXD or IP4X, and if the cover can only be removed by means of a tool or a deliberate action."
        meaning="This is the limitation of non-sheathed singles written as a rule. One layer of insulation is basic protection only, so the enclosure has to keep it effective against accidental contact — including when the trunking lid is off. The IPXXD / IP4X threshold means the standard test finger cannot reach the conductor. It is also why a protective conductor complying with Section 543 is carved out: a CPC is not a live conductor and the same hazard does not apply."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 521.10.1."
      />

      <SectionRule />

      <ContentEyebrow>Armoured cable for hostile routes</ContentEyebrow>

      <ConceptBlock
        title="Steel-wire armoured — the workhorse for everything twin and earth cannot do"
        plainEnglish="Insulated cores, an inner bedding sheath, a layer of galvanised steel wire armour, then an outer sheath in PVC or LSZH. The armour is both the mechanical protection and, when properly glanded, the CPC."
        onSite="Sub-mains, garden buildings, EV charger feeds, agricultural buildings, direct-buried distribution, cable tray in plant rooms. Common cores are 2, 3, 4 and 5; CSAs run from 1.5 mm² to 400 mm²."
      >
        <p>What you are buying, and what you have to do to earn it:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Glanding, and proof rather than assumption.</strong> CW with a sealing washer
            for an IP-rated entry, or BW for a basic entry; the gland cone clamps the combed-out
            armour wires against the enclosure, and that connection is what makes the armour a CPC.
            Reg 543.2 accepts it with the resistance for the CSA taken from Table 54.7, so measure
            R2 end to end before commissioning — a correctly made termination reads under about 0.05
            Ω.
          </li>
          <li>
            <strong>Burial.</strong> Sand bed 50 mm under, sand cover 50 mm above, then a cable
            tile, then warning tape around 150 mm above it, at a depth of at least 600 mm in soft
            ground and deeper under vehicular crossings. Bend radius is eight times the overall
            diameter.
          </li>
          <li>
            <strong>Insulation choice.</strong> PVC cores for 70 °C operation, XLPE for 90 °C — the
            thermosetting option gives a higher current rating for the same CSA and is standard on
            commercial and industrial sub-mains.
          </li>
        </ul>
        <p>
          The limitations are practical rather than regulatory: heavier, slower to terminate,
          stiffer to route, and XLPE cores are harder to flex into a gland than PVC. For final
          circuits inside a dwelling it is usually the wrong tool.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.8.3"
        clause="522.8.3 The radius of every bend in a wiring system shall be such that conductors or cables do not suffer damage and terminations are not stressed."
        meaning="The regulation sets no single figure &mdash; it sets an outcome, and the figure comes from the cable you are actually holding. A bend tight enough to crack XLPE insulation, flatten a core or pull the armour back off a gland fails this whether or not anything shows on the outside. On a stiff armoured cable that means planning the sweep into the trench or onto the tray before you pull, not persuading the last metre round a corner at the gland."
        cite="BS 7671 Part 5, Chapter 52, Section 522 — Regulation 522.8.3"
      />

      <CableCrossSection type="SWA" />

      <InlineCheck
        id="305e-1-1-check-2"
        question="A three-phase sub-main runs 35 m underground from a meter cabinet to an outbuilding, direct buried. Which selection and installation is correct?"
        options={[
          'SWA, direct buried on a sand bed with a cable tile and warning tape above, to BS 7671 522.8 / 522.6 and IET guidance',
          'PVC twin and earth laid directly in the trench, because it is cheaper over 35 m',
          'FP200 fire-resistant cable, because buried cable has to resist heat from the ground',
          'PVC singles drawn through buried PVC conduit with no further mechanical protection',
        ]}
        correctIndex={0}
        explanation="SWA is the correct selection because the steel armour protects against spades, diggers, ground movement and rodents. The bedding and tile sequence, and a depth of at least 600 mm, are the installation half of that answer. Twin and earth direct buried has no mechanical protection at all and its sheath is not rated for the ground."
      />

      <SectionRule />

      <ContentEyebrow>Fire performance and smoke</ContentEyebrow>

      <ConceptBlock
        title="Fire-resistant cable — MICC and the FP family"
        plainEnglish="Two ways to keep a circuit alive while the building burns. MICC does it with copper and mineral powder; the FP range does it with silicone rubber that chars into a non-conductive ash under a stainless-steel screen."
        onSite="These are the cables for circuits that must not fail during a fire — emergency lighting on escape routes, fire detection and alarm, fire pumps, smoke ventilation, voice alarm in transport hubs."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>MICC (Pyro), and its catch.</strong> Copper sheath, copper conductors,
            compressed magnesium oxide insulation, rated to BS 6387 CWZ — 950 °C plus water plus
            impact — and able to operate at around 1000 °C for short periods with no polymer to
            burn. But magnesium oxide is hygroscopic, so every end needs a compression pot, seal and
            gland or the insulation resistance collapses, and cable cost is roughly five to eight
            times the modern equivalents before you count the termination time.
          </li>
          <li>
            <strong>FP200 and FP400.</strong> Stainless-steel screen over silicone-rubber or
            insulating-tape insulated conductors, classified PH30, PH60, PH90 or PH120 to BS EN
            50200. Standard CSAs of 1.0, 1.5, 2.5, 4 and 6 mm² for fire alarm and emergency
            lighting, with larger sizes for fire-resistant sub-mains.
          </li>
          <li>
            <strong>Which one, and when.</strong> FP terminates like ordinary cable with appropriate
            ferruling, costs far less to install, and FP200 Gold carries an LSZH sheath as standard
            — which is why it has taken over new work. MICC still wins on heritage extensions, the
            very highest fire-performance applications, and where its naturally waterproof
            construction is an advantage.
          </li>
        </ul>
        <p>
          Reg 422.3, introduced and strengthened in A4:2026, makes this a selection rule rather than
          a preference: escape-route emergency lighting and safety services need fire-resistant
          cable and non-combustible supports for the duration the fire strategy requires — commonly
          30, 60, 90 or 120 minutes.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="LSZH — same cable, different sheath, different fire"
        plainEnglish="Low smoke zero halogen cables have the same conductors and insulation as their PVC equivalents. What changes is the sheath compound, and what that sheath does to the air people are trying to escape through."
        onSite="Schools, hospitals and care homes, transport hubs, libraries and theatres, large multi-tenanted offices, basements with limited ventilation, and HMOs alongside fire-resistant cable on the safety circuits."
      >
        <p>Three things standard PVC does when it burns, and all three decide the specification:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Acid gas.</strong> Hydrogen chloride — corrosive, blinding when it meets eye
            moisture, and lethal in a confined space.
          </li>
          <li>
            <strong>Smoke.</strong> Dense and black, dropping visibility to nothing in seconds, so
            people cannot find the exits they walked past every day.
          </li>
          <li>
            <strong>Afterwards.</strong> The hydrogen chloride keeps attacking structural steel,
            electronics and concrete reinforcement long after the fire is out.
          </li>
        </ul>
        <p>
          LSZH variants exist across almost every family — twin and earth, LSZH-sheathed XLPE/SWA
          for service risers, FP200 Gold — at a premium of typically 30 to 50 per cent. That premium
          is justified by the evacuation-safety case for the building type, answered against BS
          9999, BS 5266 and BS 5839 rather than against cost.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Data segregation and the selection matrix</ContentEyebrow>

      <ConceptBlock
        title="Band I alongside Band II — data, comms and segregation"
        plainEnglish="Structured cabling is extra-low voltage and noise-sensitive. Mains is not. BS 7671 will not let the two share an enclosure unless they are properly separated."
        onSite="Cat 5e, 6 and 6a in its own basket or its own compartment, crossing mains at right angles where a crossing is unavoidable, terminated at patch panels and RJ45 outlets."
      >
        <p>Two constraints govern a data run sharing a route with mains.</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>BS 7671 Section 528.</strong> Circuits of different voltage bands shall not
            share the same wiring system unless every cable is insulated for the highest voltage
            present, or the bands are separated by an earthed metallic screen, or each band is in
            its own compartment.
          </li>
          <li>
            <strong>BS EN 50174-2.</strong> The data-cabling installation standard, which gives the
            practical separation distances — typically 50 to 200 mm for unscreened parallel runs,
            and 0 mm where the cables cross at right angles.
          </li>
        </ul>
        <p>
          The compliant answer for a shared route is multi-compartment trunking with the metal
          divider earthed at intervals, or wholly separate trunking. Separate clips on the same
          basket is not separation, and it will not pass the data contractor&rsquo;s testing either.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="305e-1-1-check-3"
        question="Which of these correctly pairs a cable family with the limitation that most often rules it out?"
        options={[
          'SWA — cannot be used in domestic installations under any circumstances',
          'FP200 — cannot be terminated without a compression pot and seal at every end',
          'Non-sheathed singles — the sheath degrades in sunlight within months',
          'MICC — the magnesium oxide insulation is hygroscopic, so every termination must be pot-and-seal sealed against moisture',
        ]}
        correctIndex={3}
        explanation="MICC’s limitation is moisture. The mineral insulation absorbs water, so the insulation resistance falls away unless every end is properly terminated with a compression pot and seal — and that termination time is most of why FP200 replaced it on new work. SWA is common in domestic sub-mains, FP200 terminates like ordinary cable, and non-sheathed singles live inside containment where sunlight never reaches them."
      />

      <SectionRule />

      <ConceptBlock
        title="The four-factor selection matrix"
        plainEnglish="Walk four questions in order and the cable usually selects itself. Getting the order right is what stops you specifying a fire-rated cable for a mechanical problem, or armour for a smoke problem."
        onSite="This is the reasoning a supervisor expects to hear when you are asked why you ordered what you ordered. “Because that is what we always use” is not an answer at Level 3."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Factor 1 — environment.</strong> Concealed indoor, dry and cool takes twin and
            earth or singles. Outdoor with UV and weather takes SWA. Buried takes SWA. A hot plant
            room or boiler house takes XLPE-insulated cable with its 90 °C rating.
          </li>
          <li>
            <strong>Factor 2 — mechanical protection.</strong> Inside a wall, joist void, conduit or
            trunking needs nothing extra. An exposed surface run needs conduit or armour. Direct
            buried needs armour. A workshop, agricultural building or plant room needs SWA or steel
            conduit.
          </li>
          <li>
            <strong>Factor 3 — fire-safety classification.</strong> A general final circuit takes
            standard cable. A domestic smoke-alarm chain can take standard PVC where the supports
            are non-combustible throughout, per Reg 521.10.202 and the BS 5839-6 grade. Escape-route
            emergency lighting takes fire-resistant cable under Reg 422.3, and a commercial fire
            alarm under BS 5839-1.
          </li>
          <li>
            <strong>Factor 4 — sheath toxicity.</strong> Domestic and small commercial can take a
            PVC sheath. Schools, hospitals, transport, public buildings and large commercial take
            LSZH.
          </li>
        </ul>
        <p>
          Two habits turn the matrix into reliable work. Read the cable schedule properly — a
          fire-rated row names both the type and the classification, and both have to match. And
          where the schedule is silent or the wholesaler offers a substitute, raise it with the
          designer rather than deciding alone.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Accepting a wholesaler substitution on a fire-resistant circuit"
        whatHappens={
          <>
            The cable schedule says FP200 Gold 1.5 mm&sup2; for the emergency lighting on a
            commercial fit-out. The wholesaler is out of stock and offers standard PVC twin and
            earth as a like-for-like, because both are 1.5 mm&sup2; two-core. You take it to keep
            the site moving. The construction and the fire performance are nothing alike: the PVC
            burns through within about ten minutes, the luminaires lose their constant-charge
            supply, and the escape route goes dark part-way through the evacuation.
          </>
        }
        doInstead={
          <>
            Never substitute standard PVC for fire-resistant cable, whatever the wholesaler calls
            it. If the specification names FP200, FP400 or MICC, wait for the right cable or buy it
            elsewhere — half a day of lost site time is trivial against a fire-safety failure. Where
            a substitution genuinely has to happen it needs the designer&rsquo;s written approval,
            and it goes on the test certificate and the as-built drawings.
          </>
        }
      />

      <CommonMistake
        title="Assuming the armour is the CPC because the gland looks right"
        whatHappens={
          <>
            The SWA is in, both ends are glanded, the cones are tight and the job looks finished. Nobody
            measures anything, because the armour is the CPC and the gland is what makes it one. But the
            thing that makes the armour a CPC is the connection between the combed-out armour wires, the
            gland cone and the enclosure — and that is exactly what you cannot see once the gland is made
            off. A few strands folded back instead of combed out, a cone that bit on the bedding rather
            than the wires, paint or a plastic washer left under the gland plate: any of those give you a
            tidy termination with a protective conductor that is not doing its job. The circuit energises
            and works perfectly, because the CPC carries nothing until the day there is a fault.
          </>
        }
        doInstead={
          <>
            Treat the gland as a claim and the measurement as the proof. Measure R2 end to end before
            commissioning and compare what you get against the resistance for that CSA in Table 54.7, and
            do it on every armoured run rather than on the one you happened to be unsure about. Where the
            reading looks wrong, resist the urge to accept it because the cable is long or the meter is
            cheap — go back to the gland, because that is nearly always where it is. And where the armour
            is the only CPC, say so on the certificate and in the record, so the next person knows the
            protective conductor for that circuit is a termination somebody made, not a core they can see.
          </>
        }
      />

      <Scenario
        title="Aberystwyth primary school refurbishment — the delivery is the wrong cable"
        situation={
          <>
            You are second-fixing classrooms on a primary school refurbishment in Aberystwyth. The
            specification called for LSZH singles throughout in galvanised trunking. The delivery
            has arrived as standard 6491X PVC singles. The clerk of works has not inspected this
            block yet, and your supervisor says to crack on because nobody will know.
          </>
        }
        whatToDo={
          <>
            Stop and get it changed. Two separate problems sit behind that delivery. The
            specification is part of the contract, so installing PVC where LSZH was priced is a
            defect that will cost the firm a full re-pull when it is found. And the reason the
            school was specified LSZH in the first place is that a corridor full of primary-age
            children evacuating through hydrogen chloride and dense black smoke is the scenario the
            sheath choice exists to prevent. Log the discrepancy with the supplier, get the LSZH
            delivered, and record the delay. A day lost is cheaper than a re-pull and far cheaper
            than the breach.
          </>
        }
        whyItMatters={
          <>
            Cable selection is not only a BS 7671 question. On schools, hospitals and public
            buildings the specification is routinely tighter than the regulations, and &ldquo;it
            meets the regs&rdquo; is not the same statement as &ldquo;it is what the client paid
            for&rdquo;. At Level 3 you are expected to say so before the cable goes in.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'If twin and earth is cheap, quick and compliant indoors, why not use it everywhere?',
            answer:
              'Because three of its properties stop being acceptable the moment the environment changes. It has no mechanical protection, so anything exposed or buried wants armour. Its PVC sheath fails within around ten minutes in a fire, so no escape-route safety circuit can use it. And it produces dense black smoke and hydrogen chloride when it burns, so densely occupied buildings specify LSZH instead. Outdoors, in a plant room, or on a fire-rated route it is simply the wrong cable.',
          },
          {
            question: 'What is the difference between LSF and LSZH?',
            answer:
              'Low smoke and fume is a loose term covering PVC compounds modified to reduce smoke. Low smoke zero halogen is the proper specification — no halogen content at all, so no hydrogen chloride or hydrogen bromide in a fire. On escape routes, hospitals, schools and underground installations the specification usually demands true LSZH rather than LSF, so read the specification rather than the jacket print.',
          },
          {
            question: 'When is MICC still worth the cost and the termination time over FP200?',
            answer:
              'Three situations. Heritage installations where an existing MICC system is being extended and the specification requires matching. Applications needing the very highest fire performance, where the BS 6387 CWZ rating and the roughly 1000 °C short-period capability matter. And environments where the naturally waterproof construction is an advantage. For new commercial fire-alarm and emergency-lighting work, FP200 and FP400 have largely replaced it because the install cost is far lower.',
          },
          {
            question: 'Can the SWA armour be the only CPC, or should I run a separate earth core?',
            answer:
              'The armour is an acceptable CPC under Reg 543.2 provided it is correctly glanded with a CW or BW gland that maintains continuity, bonded at both ends, meets the resistance for its CSA in Table 54.7, and has been proved by an end-to-end R2 measurement. On larger sub-mains it is still common to specify a separate earth core inside the cable as well — partly for redundancy and partly to make the adiabatic check straightforward.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'A wiring system is the cable plus its support, enclosure and containment — Section 521 of BS 7671 governs the selection and Section 522 adds the external influences.',
          'PVC twin and earth is the concealed domestic default: cheapest and fastest, with no mechanical protection, a sheath that fails in around ten minutes of fire, and smoke that rules it out of public buildings.',
          'Non-sheathed singles must be enclosed in conduit, ducting or trunking under Reg 521.10.1, with trunking at IPXXD or IP4X and a tool-removable cover.',
          'SWA buys mechanical protection plus a CPC under Reg 543.2, but only once the gland is correctly made and R2 has been measured end to end.',
          'MICC gives the highest fire performance to BS 6387 CWZ and is beaten on cost and termination time by FP200 and FP400, classified PH30 to PH120 to BS EN 50200.',
          'Reg 422.3 (A4:2026) requires fire-resistant cable and non-combustible supports on escape-route safety circuits for the duration the fire strategy demands.',
          'LSZH costs 30 to 50 per cent more than the PVC equivalent and is specified where evacuation smoke is the governing risk — schools, hospitals, transport, public buildings.',
          'Band I data and Band II mains need an earthed metallic screen, separate compartments, or separate enclosures under Section 528, with BS EN 50174-2 giving the separation distances.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz
        questions={quizQuestions}
        title="Applications, advantages and limitations of electrical cables"
      />
    </div>
  );
}
