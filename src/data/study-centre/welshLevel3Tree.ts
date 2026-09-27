/**
 * Welsh Level 3 — Building Services Engineering: Electrotechnical Installation.
 *
 * The course tree. Parsed from the awarding body's qualification handbook
 * (23 September 2026) and cross-checked against its RPL mapping document:
 * 16 units, 916 taught GLH, 202 assessment criteria. Adding the 131 assessment
 * hours gives the published 1,047 GLH for the qualification.
 *
 * ⚠️ Navigation follows OUR course conventions, not the qualification's shape.
 * The qualification has 16 units of wildly uneven size — one learning outcome
 * carries twelve criteria, fourteen carry one, and one carries none at all.
 * Mirroring that literally produced a course that browsed badly. So the 202
 * criteria are grouped into modules and sections the way the English Level 2
 * and Level 3 courses are, in even runs of four to seven lessons:
 *
 *   module  = a theme            /study-centre/apprentice/welsh-level3/module3
 *   section = a teaching block     …/module3/section2
 *   lesson  = one criterion        …/module3/section2/307e-3-1
 *
 * The qualification reference is never lost: every lesson carries the unit
 * code and the criterion number the handbook gives it, both in its URL slug
 * and on the page itself, so a learner can always tie what they are reading
 * back to what they are assessed on.
 *
 * Performance outcomes are deliberately NOT pages. They are signed off at work
 * through the employer-set practical project; reproducing the assessment is
 * not what a study centre is for.
 *
 * 🔴 This is an EAL qualification and we hold no EAL mapping, endorsement or
 * approval. Describe what the content covers, never whose badge is on it.
 */

/** One assessment criterion, taught as a single page. */
export interface WelshLesson {
  /** URL segment — unit code and criterion, e.g. "307e-3-1". */
  slug: string;
  /** The qualification unit this criterion belongs to, e.g. "307E". */
  unit: string;
  /** Criterion number as the handbook writes it, e.g. "3.1". */
  criterion: string;
  title: string;
  /**
   * One line for the lesson card, taken from the page's own opening summary.
   * Generated, not hand-written — so a card can never promise something the
   * lesson does not go on to say.
   */
  summary?: string;
}

/** A teaching block of four to seven lessons. */
export interface WelshSection {
  slug: string;
  number: number;
  title: string;
  lessons: WelshLesson[];
}

/** A theme, holding four to six sections. */
export interface WelshModule {
  slug: string;
  number: number;
  title: string;
  sections: WelshSection[];
}

export const WELSH_L3_BASE = '/study-centre/apprentice/welsh-level3';

/** Assessment hours, on top of the taught hours. */
export const WELSH_L3_ASSESSMENT_GLH = 131;
export const WELSH_L3_TAUGHT_GLH = 916;

/** Qualification unit titles, for the reference line on a lesson page. */
export const WELSH_L3_UNIT_TITLES: Record<string, string> = {
  "301": "Understanding Building Services Engineering Practice in Wales",
  "302": "Working in The Building Services Engineering Sector in Wales",
  "304": "Planning and Evaluating Work in the Building Services Engineering Sector in Wales",
  "303": "Understand Health and Safety and Environmental Legislation in The Building Services Engineering Sector",
  "304E": "Understand How to Install Enclosures for Electrical Cables, Conductors and Wiring Systems",
  "305E": "Understand How to Install and Connect Electrical Cables, Conductors, Wiring Systems and Equipment",
  "306E": "Understand How to Inspect and Test De-Energised Electrical Circuits",
  "307E": "Understand Intermediate Electrical Science and Principles",
  "312": "Apply Health and Safety and Environmental Legislation in the Building Services Engineering Sector",
  "313": "Establish and Maintain Relationships in the Building Services Engineering Sector",
  "314": "Coordinate a Work Site in the Building Services Engineering Sector",
  "315E": "Installation of Wiring Systems",
  "316E": "Install and Connect Electrical Cables, Conductors, Wiring Systems and Equipment",
  "317E": "Inspect, Test and Commission Electrical Systems and Equipment",
  "318E": "Identify and Rectify Faults in Electrical Systems and Equipment",
  "319E": "Understand Advanced Electrical Science and Principles",
};

export const WELSH_L3_MODULES: WelshModule[] = [
  {
    slug: "module1",
    number: 1,
    title: "Working practice and the industry",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Trade bodies, card schemes and professional registration",
        lessons: [
          { slug: "301-1-1", unit: "301", criterion: "1.1", title: "The trade bodies and organisations relevant to the trade" , summary: "Your trade is one part of building services engineering, which is a sub-set of construction — so many of the bodies around you cover far more than…" },
          { slug: "301-1-2", unit: "301", criterion: "1.2", title: "The role of the relevant trade bodies and organisations" , summary: "These bodies do seven things: represent the trade, negotiate terms, police entry standards, publish guidance, run card and grading schemes…" },
          { slug: "301-1-3", unit: "301", criterion: "1.3", title: "The competence card schemes within the building services engineering sector and the types of cards available" , summary: "A competence card is a portable claim about you that an independent scheme has already checked, so a site can verify you quickly instead of…" },
          { slug: "301-1-4", unit: "301", criterion: "1.4", title: "Professional registration as an Engineering Technician" , summary: "Professional registration is an individual being recognised at a defined level of professional competence by a professional engineering institution." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Construction eras and the Welsh building stock",
        lessons: [
          { slug: "302-1-1", unit: "302", criterion: "1.1", title: "Building stock in Wales" , summary: "Survey the fabric before you price the job." },
          { slug: "302-1-2", unit: "302", criterion: "1.2", title: "Factors influencing change in the built environment in Wales" , summary: "Change reaches you as three things: more load, more complexity, more information the client needs." },
          { slug: "301-3-1", unit: "301", criterion: "3.1", title: "The factors influencing pre-1919 construction" , summary: "Older buildings were built from what was to hand, with solid walls, soft mortars and structural timber, and with no thought given to services…" },
          { slug: "301-3-2", unit: "301", criterion: "3.2", title: "The factors influencing post 1919 to modern construction" , summary: "The defining change is that buildings began to anticipate their services instead of having them bolted on afterwards." },
          { slug: "301-3-3", unit: "301", criterion: "3.3", title: "The factors influencing 21st century construction" , summary: "Modern buildings are measured rather than assumed, so the gap between the drawing and the finished job is visible and somebody has to answer for it." },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Working on older, modern and emerging building services",
        lessons: [
          { slug: "301-4-1", unit: "301", criterion: "4.1", title: "The considerations required when performing building services engineering work on pre1919 buildings and structures" , summary: "Survey before you price: the roof space, the cellar, the wall construction and the existing services all change the job." },
          { slug: "301-4-2", unit: "301", criterion: "4.2", title: "Post-1919 and modern construction techniques and building services" , summary: "Later construction is predictable, so the difficulty moves from not knowing the fabric to not being able to change anything after it closes up." },
          { slug: "301-4-3", unit: "301", criterion: "4.3", title: "The new and emerging technologies in the building services engineering trade and the impact they are having/may have on existing practice" , summary: "Heat and transport are moving onto the electrical installation, which turns load assessment and supply capacity into the first question on many…" },
          { slug: "302-1-3", unit: "302", criterion: "1.3", title: "Safety of the built environment" , summary: "Your cables, penetrations and boards are part of the building&rsquo;s safety." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Working with other trades, clients and customers",
        lessons: [
          { slug: "301-2-1", unit: "301", criterion: "2.1", title: "Interdependencies between trades" , summary: "Your work is a link in a chain. Somebody has to finish before you start, and somebody cannot start until you finish." },
          { slug: "302-2-1", unit: "302", criterion: "2.1", title: "How to develop and maintain productive working relationships" , summary: "A productive relationship on site is transactional in the best sense — built on being reliable about dates, access and mess, not on being liked." },
          { slug: "302-2-2", unit: "302", criterion: "2.2", title: "How to communicate effectively with clients, employers, colleagues and with other stakeholders throughout built environment projects" , summary: "Who you are talking to decides the words, not what you are talking about." },
          { slug: "313-3-1", unit: "313", criterion: "3.1", title: "The methods and organisational procedures for establishing positive relations with clients and customers" , summary: "A client cannot judge your terminations. They judge whether you turned up when you said, whether they were warned before the power went off, and…" },
          { slug: "313-3-2", unit: "313", criterion: "3.2", title: "The working requirements and practices of the clients and customers in the working environment where the installation and/or maintenance activity is taking place" , summary: "The building already has a job. Lessons, residents, customers, milking." },
        ],
      },
      {
        slug: "section5",
        number: 5,
        title: "Sourcing and interpreting technical information",
        lessons: [
          { slug: "313-1-1", unit: "313", criterion: "1.1", title: "The sources of technical and functional information" , summary: "Technical information says how it is built." },
          { slug: "313-1-2", unit: "313", criterion: "1.2", title: "Interpret technical and functional information and data" , summary: "First question of any document: what was it produced to answer?" },
          { slug: "313-2-1", unit: "313", criterion: "2.1", title: "The stakeholders that require technical and functional information" , summary: "One recipient is fixed in law: certification goes to the person ordering the work." },
          { slug: "313-2-2", unit: "313", criterion: "2.2", title: "The limits of responsibility of own job role with respect to supplying technical and functional information" , summary: "Two separate limits: what you know, and what you are authorised to say." },
          { slug: "313-2-3", unit: "313", criterion: "2.3", title: "The methods of providing technical and functional information" , summary: "Information lives in one of three places: on the installation, with a person, or only in a conversation." },
        ],
      },
      {
        slug: "section6",
        number: 6,
        title: "Delivering information to clients and customers",
        lessons: [
          { slug: "313-2-4", unit: "313", criterion: "2.4", title: "The importance of ensuring that: information provided is accurate and complete, information is provided clearly, courteously, and professionally, copies of information provided are retained and the installation, on completion, functions in accordance with…" , summary: "A gap gets questioned. A wrong statement gets acted on." },
          { slug: "313-2-5", unit: "313", criterion: "2.5", title: "The methods for checking that relevant persons have an adequate understanding of the technical and non-technical information provided" , summary: "Handing information over is not the job. Confirming it arrived is the job." },
          { slug: "313-3-3", unit: "313", criterion: "3.3", title: "The opportunities and regulations that affect the way that technical and functional information is delivered to clients and customers" , summary: "Handover is the best opportunity you get to be understood." },
          { slug: "313-3-4", unit: "313", criterion: "3.4", title: "The clients' and customers' rights including any contractual agreements" , summary: "Most disputes are not about bad work. They are about the gap between what was agreed and what the client expected." },
        ],
      },
    ],
  },
  {
    slug: "module2",
    number: 2,
    title: "Health, safety and environment",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Legislation, enforcement and sources of guidance",
        lessons: [
          { slug: "303-1-1", unit: "303", criterion: "1.1", title: "Sources of information" , summary: "BS 7671 is the regulation — the legal-strength standard." },
          { slug: "303-1-2", unit: "303", criterion: "1.2", title: "Health and safety/environmental legislation" , summary: "Remember from L2 — s.2 is duty to employees, s.3 to non-employees, s.7 personal duty." },
          { slug: "303-2-1", unit: "303", criterion: "2.1", title: "Members of the construction team" , summary: "s (Project Manager → Site Manager → Foreman) and the electrical contractor" },
          { slug: "303-2-2", unit: "303", criterion: "2.2", title: "Enforcing authorities" , summary: "Supplementary content — it builds the enforcement layer on top of this outcome rather than answering a criterion of its own." },
          { slug: "303-2-3", unit: "303", criterion: "2.3", title: "Control measures of inspectors" , summary: "An inspector arriving on site carries statutory powers, not requests." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Site hazards, electrical dangers and accident prevention",
        lessons: [
          { slug: "303-3-1", unit: "303", criterion: "3.1", title: "Working practices" , summary: "Pre-use checks BEFORE every use — PUWER 1998 Reg 6." },
          { slug: "303-8-1", unit: "303", criterion: "8.1", title: "Site hazards" , summary: "Static RAMS is the baseline plan written in advance." },
          { slug: "303-8-2", unit: "303", criterion: "8.2", title: "Common electrical dangers encountered" , summary: "Five primary electrical hazards: shock, burn, arc-flash, fire, secondary injury." },
          { slug: "303-8-3", unit: "303", criterion: "8.3", title: "General hazards" , summary: "Hazard = something with potential to cause harm." },
          { slug: "303-5-1", unit: "303", criterion: "5.1", title: "The strategies used to prevent accidents during work activities" , summary: "Hierarchy: Eliminate → Substitute → Engineer → Administer → PPE." },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Asbestos and hazardous substances",
        lessons: [
          { slug: "303-4-1", unit: "303", criterion: "4.1", title: "Common building materials and services components that may contain asbestos" , summary: "CAR 2012 is THE UK asbestos regulation. Reg 4 duty to manage; Reg 8 licensed work; Reg 10 training." },
          { slug: "303-4-2", unit: "303", criterion: "4.2", title: "The types of asbestos" , summary: "Three main types: chrysotile (white), amosite (brown) and crocidolite (blue)." },
          { slug: "303-6-1", unit: "303", criterion: "6.1", title: "The procedures that must be used to safely work with asbestos cement-based materials" , summary: "Three categories: Licensed (HSE-licensed contractor only - high-risk), NNLW (Notifiable Non-Licensed Work - trained + written plan + 14-day…" },
          { slug: "303-4-3", unit: "303", criterion: "4.3", title: "Commonly encountered substances" , summary: "which one is this?" },
          { slug: "303-9-1", unit: "303", criterion: "9.1", title: "Commonly encountered substances" , summary: "COSHH 2002 is the framework for hazardous substances at work — chemicals, fumes, dusts, mists, vapours, gases and biological agents." },
          { slug: "303-11-1", unit: "303", criterion: "11.1", title: "How the hazards of some substances and mixtures can be identified from the labels on packaging" , summary: "Nine GB CLP pictograms — explosive, flammable, oxidising, gas under pressure, corrosive, acute toxicity (skull), health hazard (chronic), harmful…" },
          { slug: "303-12-1", unit: "303", criterion: "12.1", title: "How to deal with commonly encountered substances" , summary: "EPA 1990 s.34 is the waste duty of care — strict liability." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Access equipment, PPE and reporting procedures",
        lessons: [
          { slug: "303-10-1", unit: "303", criterion: "10.1", title: "Access equipment to permit work at heights" , summary: "WAHR 2005 Reg 6 sets a three-tier hierarchy — avoid working at height where reasonably practicable, then PREVENT a fall (fully guarded platform)…" },
          { slug: "303-10-2", unit: "303", criterion: "10.2", title: "Personal protective equipment (PPE)" , summary: "Insulated gloves = IEC 60903 / BS EN 60903." },
          { slug: "303-10-3", unit: "303", criterion: "10.3", title: "Excavations and confined spaces" , summary: "Confined space = substantially enclosed AND foreseeable specified risk (fire/asphyxiation/drowning/hyperthermia/entrapment)." },
          { slug: "303-13-1", unit: "303", criterion: "13.1", title: "The procedures for reporting issues relating to: health and safety, harmful substances and material, emergencies on-site" , summary: "Multiple reporting routes exist in parallel — internal (firm), RIDDOR (HSE), environmental (EA/SEPA/NRW), safeguarding (local authority), scheme…" },
        ],
      },
      {
        slug: "section5",
        number: 5,
        title: "Sustainability, ecology and waste disposal",
        lessons: [
          { slug: "301-5-1", unit: "301", criterion: "5.1", title: "Industry regulation and sustainability and the natural environment" , summary: "You work inside rules written by other people." },
          { slug: "301-5-2", unit: "301", criterion: "5.2", title: "Ecological considerations and principles" , summary: "The most common encounter in this trade is a bat roost or a bird nest in a roof space, a loft, an eaves gap or an old building." },
          { slug: "301-5-3", unit: "301", criterion: "5.3", title: "Sustainable approaches" , summary: "The most sustainable material on any job is the one you did not over-order, which makes the take-off the most important thing on this page." },
          { slug: "301-5-4", unit: "301", criterion: "5.4", title: "Waste disposal in building services" , summary: "Everything in the skip was bought, carried and paid for once, and is now being paid for a second time to leave." },
        ],
      },
    ],
  },
  {
    slug: "module3",
    number: 3,
    title: "Electrical science and principles",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Mathematics, units and measurement",
        lessons: [
          { slug: "307e-1-1", unit: "307E", criterion: "1.1", title: "The appropriate mathematical principles which are relevant to electrical work tasks" , summary: "Five moves cover most electrician maths: fractions/decimals/percentages, ratios, transposition, indices, and scientific notation." },
          { slug: "307e-2-1", unit: "307E", criterion: "2.1", title: "The internationally recognised base and derived (SI) units of measurement for general quantities" , summary: "Seven SI base units underpin everything: metre, kilogram, second, ampere, kelvin, mole, candela." },
          { slug: "307e-2-2", unit: "307E", criterion: "2.2", title: "The values of base and derived SI units which apply specifically to electrical quantities" , summary: "Voltage (V) is the push between two points." },
          { slug: "307e-2-3", unit: "307E", criterion: "2.3", title: "The appropriate electrical instruments for the measurement of different electrical quantities" , summary: "Five core instruments: voltage indicator (prove dead), multimeter (V/A/Ω basic checks), clamp meter (live current without breaking the circuit)…" },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Mechanical principles, energy and efficiency",
        lessons: [
          { slug: "307e-3-1", unit: "307E", criterion: "3.1", title: "What is meant by mass and weight" , summary: "Mass = how much stuff is in an object. Measured in kilograms (kg)." },
          { slug: "307e-3-2", unit: "307E", criterion: "3.2", title: "The principles of basic mechanics as they apply to levers, gears, and pulleys" , summary: "Simple machines change the size or direction of a force." },
          { slug: "307e-3-3", unit: "307E", criterion: "3.3", title: "The main principles of mechanical principles and their inter-relationships" , summary: "Force = a push or a pull. Unit: newton (N)." },
          { slug: "307e-3-4", unit: "307E", criterion: "3.4", title: "Calculation of mechanical energy, power, and efficiency" , summary: "Work = Force × distance (in the direction of the force)." },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Electron theory, conductors and resistance",
        lessons: [
          { slug: "307e-4-1", unit: "307E", criterion: "4.1", title: "The basic principles of electron theory" , summary: "Atoms have a positive nucleus (protons + neutrons) and negative electrons buzzing around it." },
          { slug: "307e-4-2", unit: "307E", criterion: "4.2", title: "Materials which are good conductors and insulators" , summary: "ll meet on site — copper for nearly everything domestic, aluminium for big feeders.\"," },
          { slug: "307e-4-3", unit: "307E", criterion: "4.3", title: "What is meant by resistance and resistivity in relation to electrical circuits" , summary: "R = ρL/A. Resistivity (material) times length, divided by cross-sectional area." },
          { slug: "307e-4-8", unit: "307E", criterion: "4.8", title: "The chemical and thermal effects of electric currents" , summary: "Every conductor dissipates heat = I²R. Double the current, quadruple the heat." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Series and parallel d.c. circuits",
        lessons: [
          { slug: "307e-4-4", unit: "307E", criterion: "4.4", title: "The relationship between current, voltage and resistance in parallel and series D.C circuits" , summary: "Series = single path. The same current flows through every component, no exceptions." },
          { slug: "307e-4-5", unit: "307E", criterion: "4.5", title: "The values of current, voltage and resistance in parallel and series D.C circuits" , summary: "Series resistances add: Rt = R₁ + R₂ + R₃ + … Parallel resistances combine: 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …" },
          { slug: "307e-4-6", unit: "307E", criterion: "4.6", title: "The values of power in parallel and series D.C circuits" , summary: "Three power formulas — P = V × I, P = I² × R, P = V² ÷ R." },
          { slug: "307e-4-7", unit: "307E", criterion: "4.7", title: "What is meant by the term voltage drop in relation to electrical circuits" , summary: "Vd = I × R. Cable resistance × current = volts you lose along the way." },
        ],
      },
      {
        slug: "section5",
        number: 5,
        title: "Magnetism, a.c. generation and distribution",
        lessons: [
          { slug: "307e-5-1", unit: "307E", criterion: "5.1", title: "The effects of magnetism in terms of attraction and repulsion" , summary: "Every magnet has two poles — north and south." },
          { slug: "307e-5-2", unit: "307E", criterion: "5.2", title: "The difference between magnetic flux and flux density" , summary: "Magnetic flux Φ is the total amount of magnetism through a surface, measured in webers (Wb)." },
          { slug: "307e-5-3", unit: "307E", criterion: "5.3", title: "The magnetic effects of electrical currents in terms of: production of a magnetic field, force on a current carrying conductor in a magnetic field, electromagnetism and electromotive force" , summary: "Every electric current creates a magnetic field around it." },
          { slug: "307e-5-4", unit: "307E", criterion: "5.4", title: "The basic principles of A.C generation in terms of: a single-loop generator, sinewave, frequency, EMF, magnetic flux, three-phase systems" , summary: "Spin a coil between two magnetic poles at a steady speed and the EMF that comes out is a sine wave." },
          { slug: "307e-5-5", unit: "307E", criterion: "5.5", title: "The characteristics of sinewaves" , summary: "UK mains is a sine wave at 50 Hz, 230 V RMS, 325 V peak, 20 ms per cycle." },
          { slug: "307e-5-6", unit: "307E", criterion: "5.6", title: "The features and characteristics of a generation, transmission, and distribution system" , summary: "GB transmits at 400 kV (super-grid), 275 kV (grid), and 132 kV (transmission in Scotland / sub-transmission in England and Wales)." },
        ],
      },
    ],
  },
  {
    slug: "module4",
    number: 4,
    title: "Advanced electrical science",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Mathematics and a.c. circuit quantities",
        lessons: [
          { slug: "319e-2-1", unit: "319E", criterion: "2.1", title: "The appropriate mathematical principles which are relevant to electrical work tasks" , summary: "Indices add when you multiply same-base powers (10³ × 10⁴ = 10⁷) and subtract when you divide." },
          { slug: "319e-2-2", unit: "319E", criterion: "2.2", title: "Quantities relevant to electrical work" , summary: "Seven SI base units underpin everything: metre, kilogram, second, ampere, kelvin, mole, candela." },
          { slug: "319e-2-3", unit: "319E", criterion: "2.3", title: "The relationship between resistance, inductance, capacitance, and impedance" , summary: "Inductors store energy in a magnetic field; capacitors in an electric field." },
          { slug: "319e-2-4", unit: "319E", criterion: "2.4", title: "Calculation of electrical quantities in alternating current circuits" , summary: "V_RMS = V_peak / √2; V_peak = V_RMS × √2." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Transformers, power factor and three-phase systems",
        lessons: [
          { slug: "319e-2-6", unit: "319E", criterion: "2.6", title: "Types of transformers" , summary: "Transformers tie together every voltage level in the UK grid: alternator → 400 kV → 132 → 33 → 11 → 400/230 V." },
          { slug: "319e-2-7", unit: "319E", criterion: "2.7", title: "The operating principles, applications and limitations of transformers" , summary: "Transformer = two coils on a shared magnetic core." },
          { slug: "319e-2-8", unit: "319E", criterion: "2.8", title: "The relationship between kW, kVAr, kVA and power factor" , summary: "Real power P (W, kW) = energy actually consumed." },
          { slug: "319e-2-9", unit: "319E", criterion: "2.9", title: "Power factor improvement" , summary: "PFC adds capacitive kVAr to cancel inductive kVAr → smaller S, smaller line current, smaller losses." },
          { slug: "319e-2-10", unit: "319E", criterion: "2.10", title: "Voltage and current in star and delta connected systems" , summary: "Star: V_line = √3 × V_phase; I_line = I_phase." },
          { slug: "319e-2-11", unit: "319E", criterion: "2.11", title: "Advantages of balanced star connected systems" , summary: "Balanced means three loads of equal magnitude on three voltages that are equal in magnitude and 120 degrees apart." },
          { slug: "319e-2-12", unit: "319E", criterion: "2.12", title: "The neutral current in a three-phase star connected system" , summary: "Balanced 3-phase loads (equal magnitude, 120° apart) → vector sum = zero → no neutral current." },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Electrical machines, motors and motor control",
        lessons: [
          { slug: "319e-2-5", unit: "319E", criterion: "2.5", title: "Operating principles of electro-mechanical components" , summary: "Contactor = electromagnetic switch for power circuits." },
          { slug: "319e-3-1", unit: "319E", criterion: "3.1", title: "The basic types, applications and describe the operating principles of D.C machines" , summary: "DC motor: armature in a magnetic field, current creates force, commutator switches direction every half rev to keep torque unidirectional." },
          { slug: "319e-3-2", unit: "319E", criterion: "3.2", title: "The operating principles of A.C motors" , summary: "Single-phase AC has no natural rotating field — needs a phase-shift trick to start." },
          { slug: "319e-3-3", unit: "319E", criterion: "3.3", title: "State the basic types, applications, and limitations of A.C motors" , summary: "Single-phase alternating current produces a pulsating field, not a rotating one, so every single-phase family uses a trick to start — a capacitor…" },
          { slug: "319e-3-4", unit: "319E", criterion: "3.4", title: "The basic operating principles, limitations, and applications of motor control" , summary: "Synchronous motor: rotor locked to N_s, no slip." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Lighting, heating and electronic devices",
        lessons: [
          { slug: "319e-4-1", unit: "319E", criterion: "4.1", title: "The basic principles and applications of illumination" , summary: "Luminous intensity (cd) — light per solid angle from the source." },
          { slug: "319e-4-2", unit: "319E", criterion: "4.2", title: "The operating principles, types, limitations, and applications of luminaires" , summary: "A modern luminaire makes light at a semiconductor junction — forward bias an LED past its forward voltage and the junction emits." },
          { slug: "319e-5-1", unit: "319E", criterion: "5.1", title: "The basic principles of electrical space heating and electrical water heating" , summary: "Resistive heating: I²R losses are ALL the output — effectively 100% efficient." },
          { slug: "319e-5-2", unit: "319E", criterion: "5.2", title: "The operating principles, types, limitations and applications of electrical space and water heating appliances and components" , summary: "Resistive heating is I²R — every watt of electrical input becomes a watt of heat, so a resistance element is effectively 100% efficient." },
          { slug: "319e-6-1", unit: "319E", criterion: "6.1", title: "The basic operating principles of electronic components and devices" , summary: "Diode: one-way valve. V_F ≈ 0.7 V Si, 0.3 V Schottky." },
          { slug: "319e-6-2", unit: "319E", criterion: "6.2", title: "The function and application of electronic components that are used in electrical systems" , summary: "A relay is a small coil-operated switch (PCB or DIN-rail)." },
        ],
      },
      {
        slug: "section5",
        number: 5,
        title: "Renewable generation, CHP and smart metering",
        lessons: [
          { slug: "319e-1-1", unit: "319E", criterion: "1.1", title: "The basic operating principles of renewable sources of electricity" , summary: "PV chain — sunlight → DC string → inverter → AC isolator → meter → consumer unit." },
          { slug: "319e-1-2", unit: "319E", criterion: "1.2", title: "The basic operating principles of combined heat and power (CHP) including micro-CHP" , summary: "Capacity factor is the honest comparator — PV 10-12 percent UK, suburban wind 5-15 percent, rural exposed wind 20-30 percent, micro-hydro 50-80…" },
          { slug: "319e-1-3", unit: "319E", criterion: "1.3", title: "The basic operating principles of other sources of electricity" , summary: "Six methods feed the GB grid: gas (CCGT), nuclear, wind, solar PV, hydro, and combined heat and power." },
          { slug: "319e-1-4", unit: "319E", criterion: "1.4", title: "Smart metering" , summary: "Three owners in one cabinet: DNO owns service cable + cut-out + supplier earth terminal." },
        ],
      },
    ],
  },
  {
    slug: "module5",
    number: 5,
    title: "Planning, coordination and evaluation",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Planning work, resources and success criteria",
        lessons: [
          { slug: "304-1-1", unit: "304", criterion: "1.1", title: "Organise the resources required" , summary: "Resources are not just materials. People, time, plant and access, information and welfare all have to be arranged before anyone starts." },
          { slug: "304-1-2", unit: "304", criterion: "1.2", title: "Set success criteria for the task(s)" , summary: "A success criterion is a test with a yes or a no in it." },
          { slug: "304-1-3", unit: "304", criterion: "1.3", title: "Carry out effective planning" , summary: "Scope, sequence, resource, check. In that order — you cannot sequence work you have not scoped." },
          { slug: "304-1-4", unit: "304", criterion: "1.4", title: "Rationalise why the proposed approach is the most appropriate" , summary: "A rationale names the alternatives and says why this one won." },
          { slug: "304-1-5", unit: "304", criterion: "1.5", title: "Recognise cost and waste implications of the work" , summary: "Four costs: labour, materials, plant, and the overheads of running the site." },
          { slug: "304-1-6", unit: "304", criterion: "1.6", title: "Manage risks associated with completing the task and recognise the steps to be taken to stop risks becoming problems" , summary: "A risk has not happened yet. A problem has." },
          { slug: "304-1-7", unit: "304", criterion: "1.7", title: "Identify the handover requirements of work" , summary: "Handover is in the planning outcome because it takes time and information you have to arrange in advance." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Coordinating operatives and other trades on site",
        lessons: [
          { slug: "314-1-1", unit: "314", criterion: "1.1", title: "How to plan and implement: the monitoring and implementation of health and safety on the work site, the work to be undertaken, the allocation of roles and responsibilities, and the resources required" , summary: "Unit 304 planned your own work. This unit plans work other people carry out — everything changes." },
          { slug: "314-1-2", unit: "314", criterion: "1.2", title: "The procedures for re-scheduling work to coordinate with changing conditions in the workplace and to coincide with other trades" , summary: "Your programme is a slot inside everyone else’s." },
          { slug: "314-1-3", unit: "314", criterion: "1.3", title: "How to coordinate operatives you are responsible for in relation to: supervision and motivation, identification of competence and planning work allocations, duties, and responsibilities" , summary: "Competence is task-specific — someone can be fully competent and have never done this." },
          { slug: "314-1-4", unit: "314", criterion: "1.4", title: "How to communicate effectively with relevant people" , summary: "Purpose sets the channel. Instruct, inform, request a decision, warn, record — each wants something different." },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Site documentation, materials and storage",
        lessons: [
          { slug: "314-1-5", unit: "314", criterion: "1.5", title: "The current versions of appropriate industry standards and regulations relevant to the identified building services engineering system" , summary: "An existing installation not fully complying with the current edition is not automatically unsafe — judge on actual safety and risk." },
          { slug: "314-1-6", unit: "314", criterion: "1.6", title: "The organisational procedures for: completing the necessary documentation, agreeing a programme of work with relevant people and confirming that the installation and/or maintenance work is completed" , summary: "Three procedures, one idea: each is where something stops being understood and becomes official." },
          { slug: "314-2-1", unit: "314", criterion: "2.1", title: "The methods that will verify that the equipment, accessories, and components are: compatible to the working environment, in accordance with the specification, of the required and correct type, delivered on time and undamaged and suitable and safely stored" , summary: "Four tests: does it suit the environment, does it match the specification, is it the right type, did it arrive undamaged." },
          { slug: "314-2-2", unit: "314", criterion: "2.2", title: "How to manage the available storage facility at the work site" , summary: "\"Available\" is the operative word — you manage the corner you are given, not an ideal store." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Evaluating the finished work and own performance",
        lessons: [
          { slug: "304-2-1", unit: "304", criterion: "2.1", title: "Review the appropriateness of success criteria set" , summary: "This reviews your judgement, not your work." },
          { slug: "304-2-2", unit: "304", criterion: "2.2", title: "Evaluate the resource selection and usage" , summary: "Two questions, not one: did you pick the right resources, and did you use them well?" },
          { slug: "304-2-3", unit: "304", criterion: "2.3", title: "Evaluate the finished output" , summary: "Three layers: compliant, complete, and the qualities nobody tests but everybody notices." },
          { slug: "304-2-4", unit: "304", criterion: "2.4", title: "Evaluate own performance" , summary: "Judge yourself against a fixed reference — skills, knowledge, training, experience — not against mood." },
          { slug: "304-2-5", unit: "304", criterion: "2.5", title: "Review the achievement of timescales" , summary: "Hitting the date is not the finding. What it cost to hit it usually is." },
          { slug: "304-2-6", unit: "304", criterion: "2.6", title: "Evaluate the handover" , summary: "A handover is judged by the fortnight after it, not by the meeting itself." },
        ],
      },
    ],
  },
  {
    slug: "module6",
    number: 6,
    title: "Installation and wiring systems",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Supply systems, earthing arrangements and circuits",
        lessons: [
          { slug: "315e-1-1", unit: "315E", criterion: "1.1", title: "Types of earthing systems" , summary: "Five UK arrangements: TN-S (separate N+PE all the way), TN-C-S as PME (combined PEN at supply, split at MET — most common new-build domestic)…" },
          { slug: "315e-1-2", unit: "315E", criterion: "1.2", title: "Types of supply systems" , summary: "3-phase = three sinusoidal voltages, equal magnitude, 120° apart, all at 50 Hz." },
          { slug: "315e-1-3", unit: "315E", criterion: "1.3", title: "Electrical circuits" , summary: "A distribution circuit feeds a board. A final circuit feeds loads and ends at the accessory or appliance — nothing else downstream." },
          { slug: "304e-1-1", unit: "304E", criterion: "1.1", title: "The types and requirements of typical circuits" , summary: "Six families: radial, ring, lighting loop-in, cooker, shower, FCU spurs and special-purpose dedicated radials (boilers, EV, PV)." },
          { slug: "304e-1-2", unit: "304E", criterion: "1.2", title: "Earthing systems and earthing and protective conductors" , summary: "Five arrangements: TN-S, TN-C-S as PME, TN-C-S as PNB, TT and IT." },
          { slug: "315e-1-10", unit: "315E", criterion: "1.10", title: "The requirements and applications of functional earthing" , summary: "Functional earthing is for the equipment to work." },
          { slug: "315e-1-11", unit: "315E", criterion: "1.11", title: "How to select suitably sized protective conductors in accordance with BS 7671" , summary: "The line-conductor CCC calc protects the cable against steady-state heating at Ib." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Protection against shock, overcurrent and overvoltage",
        lessons: [
          { slug: "304e-1-3", unit: "304E", criterion: "1.3", title: "Devices used for safety and protection in electrical systems" , summary: "Six device families: BS 88 fuses, MCBs (BS EN 60898), RCBOs (BS EN 61009), RCDs (BS EN 61008), AFDDs (BS EN 62606), SPDs (BS EN 61643)." },
          { slug: "315e-1-9", unit: "315E", criterion: "1.9", title: "The requirements for protection against electric shock" , summary: "Protection against electric shock is layered — basic protection, fault protection and additional protection." },
          { slug: "315e-1-4", unit: "315E", criterion: "1.4", title: "The arrangements for electrical installations and systems with regards to provision for: isolation and switching, overcurrent protection, earth fault protection" , summary: "EAWR Reg 13 is the legal hook for safe isolation." },
          { slug: "315e-1-6", unit: "315E", criterion: "1.6", title: "The maximum disconnection times for circuits" , summary: "ADS = Automatic Disconnection of Supply. The BS 7671 strategy for protecting against electric shock by clearing a line-to-earth fault fast enough…" },
          { slug: "315e-1-5", unit: "315E", criterion: "1.5", title: "The devices for protection against the risk of fire: AFDDs, RCDs" , summary: "AFDDs detect series and parallel arc faults — fault energies that ignite cable insulation but typically sit below the OPD overload threshold and…" },
          { slug: "315e-1-7", unit: "315E", criterion: "1.7", title: "Requirements for the protection against overvoltage and the types and applications of SPDs" , summary: "Section 443 of BS 7671 A4:2026 uses a consequence-based decision procedure." },
          { slug: "315e-1-8", unit: "315E", criterion: "1.8", title: "Requirements for the protection against undervoltage" , summary: "Undervoltage is not only a blackout. It is the sag when a big motor starts, the brownout on a long rural feed, the dip during a fault on the…" },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Standards, risk assessment and preparing for work",
        lessons: [
          { slug: "304e-2-1", unit: "304E", criterion: "2.1", title: "Industry standards and regulations" , summary: "Four statutory instruments bind UK electrical work: HASAWA 1974 (parent Act), EAWR 1989 (the trade-specific one), ESQCR 2002 (supply-side rules)…" },
          { slug: "315e-2-1", unit: "315E", criterion: "2.1", title: "Industry standards and regulations" , summary: "Four statutory instruments govern UK electrical installation work: the Health and Safety at Work etc Act 1974, the Electricity at Work Regulations…" },
          { slug: "315e-4-1", unit: "315E", criterion: "4.1", title: "Industry standards and regulations" , summary: "The rules that govern finishing a job are not the same as the rules that governed doing it." },
          { slug: "304e-2-2", unit: "304E", criterion: "2.2", title: "How to produce a risk assessment and method statement for the work to be carried out" , summary: "A method statement turns the risk-assessment controls into a sequence of work — who does what, in what order, with what kit." },
          { slug: "304e-2-3", unit: "304E", criterion: "2.3", title: "How to verify that job information and documentation is current and relevant and that the plant, instruments, access equipment and tools are fit for purpose" , summary: "Synthesis means reading the whole pack as one conversation — front sheet sets context, layouts show position, schedules detail the parts…" },
          { slug: "304e-2-4", unit: "304E", criterion: "2.4", title: "The applications, advantages, and limitations of types of personal protective equipment" , summary: "Match PPE to hazard via EN standards: footwear EN ISO 20345, hat EN 397, electrical gloves EN 60903, RPE EN 149 (FFP3), eye EN 166, harness EN…" },
          { slug: "315e-4-2", unit: "315E", criterion: "4.2", title: "The organisational procedures for confirming with the relevant people the appropriate actions to be taken to ensure that any variations to the planned programme of work will not introduce a hazard and have minimum negative impact on the installation work…" , summary: "s decision and any drawing revisions — the audit trail of why the build is what it is.\"," },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Selecting and installing enclosures",
        lessons: [
          { slug: "304e-3-1", unit: "304E", criterion: "3.1", title: "The applications, advantages, and limitations of types of enclosures" , summary: "Cable supports per OSG Table 4.5 — typical ~250 mm horizontal / ~400 mm vertical for small T&E." },
          { slug: "304e-3-2", unit: "304E", criterion: "3.2", title: "The industry recognised methods for determining the type and size of enclosures" , summary: "OSG Appendix H — sum cable factors, compare against trunking / conduit factor." },
          { slug: "315e-3-2", unit: "315E", criterion: "3.2", title: "The application of the Degrees of Protection Provided by Enclosures (IP Code)" , summary: "IP stands for ingress protection. The first digit describes protection against solid objects and runs from 0 to 6." },
          { slug: "304e-3-3", unit: "304E", criterion: "3.3", title: "How to interpret diagrams and drawings to locate site services and identify the planned location of the enclosures and equipment" , summary: "Six drawing types to recognise: block, schematic, wiring, circuit, layout/floor plan, as-built." },
          { slug: "304e-3-4", unit: "304E", criterion: "3.4", title: "The methods and techniques for fitting, fixing, and connecting the selected enclosures and their components and accessories in accordance with: the electrical system's design and manufacturers' instructions" , summary: "Rod-and-draw, fish tape, cable rollers, hydraulic crimps, conduit benders, lubrication, trunking jigs — the kit that makes commercial install…" },
        ],
      },
      {
        slug: "section5",
        number: 5,
        title: "Cables, wiring systems and terminations",
        lessons: [
          { slug: "315e-3-1", unit: "315E", criterion: "3.1", title: "The selection of wiring systems and equipment appropriate to the situation and use utilising BS 7671" , summary: "Cable selection is a four-factor decision — environment (indoor / outdoor / buried / hot), mechanical protection needed, fire-safety…" },
          { slug: "305e-1-1", unit: "305E", criterion: "1.1", title: "The applications, advantages, and limitations of electrical cables" , summary: "A wiring system is the cable plus its support, enclosure and containment, decided together." },
          { slug: "305e-1-2", unit: "305E", criterion: "1.2", title: "The requirements of industrial plugs, sockets, and couplers" , summary: "An industrial connector is built for wet, dirty, mechanically abused work and for being plugged and unplugged over and over, often outdoors and…" },
          { slug: "305e-2-1", unit: "305E", criterion: "2.1", title: "How to determine the size and rating of electrical cables (basic single-phase circuits to non-reactive loads)" , summary: "Reg 433.1.1 is the whole exercise in one line: Ib ≤ In ≤ Iz." },
          { slug: "305e-3-1", unit: "305E", criterion: "3.1", title: "The methods and techniques for installing and fixing electrical cables, conductors, wiring systems, associated equipment, accessories and components in accordance with: the electrical system's design and manufacturers' instructions" , summary: "Installation has a fixed order: containment and boxes first, cable last." },
          { slug: "305e-3-2", unit: "305E", criterion: "3.2", title: "The different types and methods of terminating and connecting electrical cables and conductors" , summary: "Three regulations frame the criterion: 526.1 says what a connection must achieve, 526.5 says where it may be made, and 526.9 says how many…" },
        ],
      },
      {
        slug: "section6",
        number: 6,
        title: "Connected loads, energy efficiency and circuit design",
        lessons: [
          { slug: "315e-5-1", unit: "315E", criterion: "5.1", title: "The interpretation of manufacturer\\u2019s data for the selection and application of connected loads and equipment" , summary: "s specific torque, ferrule and termination instructions.\", \"Reg 510.3 explicitly ties equipment selection and erection to manufacturer" },
          { slug: "315e-5-2", unit: "315E", criterion: "5.2", title: "The selection of current using equipment considering energy efficiency" , summary: "BS 7671 sits below statutory law. Part P (Building Regulations, England) governs notifiable electrical work in dwellings — new circuits, CU…" },
          { slug: "315e-5-3", unit: "315E", criterion: "5.3", title: "The application of smart technology when used for convenience, comfort, safety, and security" , summary: "Smart technology is a control layer sitting on an ordinary electrical installation — the installation underneath still has to be right on its own." },
          { slug: "315e-5-4", unit: "315E", criterion: "5.4", title: "The cable selection (circuit design) procedure: establishing the maximum demand of an installation after the application of" , summary: "Connected load is the sum of nameplate ratings; maximum demand is the realistic peak after applying diversity." },
        ],
      },
    ],
  },
  {
    slug: "module7",
    number: 7,
    title: "Inspection, testing and commissioning",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Safe isolation and the legal framework for inspection",
        lessons: [
          { slug: "317e-1-1", unit: "317E", criterion: "1.1", title: "The requirements of the Electricity at Work Regulations for the safe inspection of electrical systems and equipment" , summary: "The Electricity at Work Regulations 1989 are statutory law." },
          { slug: "317e-1-2", unit: "317E", criterion: "1.2", title: "The health and safety requirements which apply when inspecting, testing and commissioning electrical installations and circuits" , summary: "The JIB single-circuit safe isolation sequence extends to three-phase, multi-source installations (PV / generators / UPS), and the wider…" },
          { slug: "317e-1-3", unit: "317E", criterion: "1.3", title: "The safe isolation procedure" , summary: "Seven steps: identify → switch off → secure (lock off + tag) → prove the indicator on a known source → test for dead at the point of work →…" },
          { slug: "306e-3-1", unit: "306E", criterion: "3.1", title: "The safe isolation procedure" , summary: "Isolation is a secured state, not a switch position." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Purpose, information and documents for initial verification",
        lessons: [
          { slug: "317e-1-4", unit: "317E", criterion: "1.4", title: "The industry practices and organisational procedures to ensure the coordination of site services and the activities of others who may be affected by the inspection and testing" , summary: "Isolation has five stakeholders to think about — self, other personnel, customer, public and building systems." },
          { slug: "317e-1-5", unit: "317E", criterion: "1.5", title: "The purpose and requirements of the initial verification of electrical installations" , summary: "BS 7671 Part 6 Chapter 64 is built on four regulations: Reg 641 (general — verify before service), Reg 642 (visual inspection list), Reg 643…" },
          { slug: "317e-1-6", unit: "317E", criterion: "1.6", title: "The relevant documents associated with the inspection, testing and commissioning of an electrical installation" , summary: "GN3 is non-statutory IET guidance that provides practical detail on HOW to comply with BS 7671 Part 6." },
          { slug: "317e-1-7", unit: "317E", criterion: "1.7", title: "The information that is required by the inspector to conduct the initial verification of an electrical installation" , summary: "Initial verification has three converging purposes: technical (BS 7671 compliance), legal (EAWR Reg 4(1) discharge), and documentary (evidence for…" },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "Carrying out the inspection",
        lessons: [
          { slug: "317e-2-1", unit: "317E", criterion: "2.1", title: "The appropriate items to be checked during the inspection process" , summary: "Visual inspection (Reg 642) is the first stage of initial verification — before any testing — because most defects are visible to a structured eye." },
          { slug: "317e-2-2", unit: "317E", criterion: "2.2", title: "The application of the human senses for initial verification" , summary: "Inspection comes first and it is done with your eyes, ears, nose and hands." },
          { slug: "306e-2-1", unit: "306E", criterion: "2.1", title: "How to confirm the installed electrical equipment is located and secured correctly and electrically and mechanically sound" , summary: "The criterion contains four separate questions." },
          { slug: "306e-2-2", unit: "306E", criterion: "2.2", title: "How to carry out a visual inspection of the main/key aspects of standard single-phase circuits" , summary: "Inspection precedes testing and is normally done with that part of the installation disconnected." },
          { slug: "317e-2-3", unit: "317E", criterion: "2.3", title: "The requirements for the inspection of electrical installations" , summary: "Inspection comes first. Reg 642 sits ahead of Reg 643 in the Part 6 sequence, so the installation is inspected before it is tested and before it…" },
          { slug: "317e-2-4", unit: "317E", criterion: "2.4", title: "The requirements for the inspection to include: special installations and locations as identified in Part 7 of BS 7671, IP Classification of equipment" , summary: "Each Part 7 location has its own visual inspection items added to the general schedule — zones, IP ratings, bonding, isolation, equipment selection." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Test instruments, calibration and safe use",
        lessons: [
          { slug: "306e-1-1", unit: "306E", criterion: "1.1", title: "The test instruments required for de-energised tests on standard single-phase circuits" , summary: "The de-energised set on a standard single-phase circuit is continuity, insulation resistance, polarity, and earth electrode resistance where the…" },
          { slug: "306e-1-2", unit: "306E", criterion: "1.2", title: "How to confirm that the test instruments are fit for purpose and have a current calibration certificate" , summary: "Fit for purpose is three questions, not one." },
          { slug: "317e-3-2", unit: "317E", criterion: "3.2", title: "The appropriate instrument for each test to be carried out in terms of the instrument is fit for purpose and identifying the correct scale or setting" , summary: "BS 7671 Reg 643.3 mandates IR testing of every circuit." },
          { slug: "317e-3-3", unit: "317E", criterion: "3.3", title: "The requirements for the safe use of instruments to be used for testing and commissioning" , summary: "GS38 (4th ed) sets four headline rules: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead." },
        ],
      },
      {
        slug: "section5",
        number: 5,
        title: "The sequence of tests and interpreting results",
        lessons: [
          { slug: "317e-3-1", unit: "317E", criterion: "3.1", title: "The tests to be carried out on an electrical installation in accordance with the BS 7671 and IET Guidance Note 3" , summary: "Reg 643.1 mandates the order. The tests of Reg 643.2 to 643.6 are carried out in that order before the installation is energised, and the tests…" },
          { slug: "317e-3-5", unit: "317E", criterion: "3.5", title: "The reason why testing is carried out in the sequence specified in BS 7671 and IET Guidance Note 3" , summary: "Reg 643.1 — dead tests first, in the order continuity → IR → polarity → electrode resistance, then live tests." },
          { slug: "317e-3-6", unit: "317E", criterion: "3.6", title: "The requirements for testing before circuits are energised" , summary: "Regulation 643.1 requires the tests of Regulations 643.2 to 643.6, where relevant, to be carried out in that order before the installation is…" },
          { slug: "306e-4-1", unit: "306E", criterion: "4.1", title: "How to carry out de-energised tests on standard single-phase circuits" , summary: "Regulation 643.1 fixes the order: continuity of protective conductors, ring final continuity, insulation resistance, polarity, then earth…" },
          { slug: "317e-3-7", unit: "317E", criterion: "3.7", title: "The requirements for testing energised installations" , summary: "t interrupt the supply.\"," },
          { slug: "317e-3-4", unit: "317E", criterion: "3.4", title: "The necessity for test results to comply with standard values and the actions to be taken in the event of unsatisfactory results being obtained" , summary: "PASS = meets BS 7671 minimum. HEALTHY = significantly better than minimum, matches expected for a properly-installed system." },
        ],
      },
      {
        slug: "section6",
        number: 6,
        title: "Recording results, commissioning and handover",
        lessons: [
          { slug: "306e-5-1", unit: "306E", criterion: "5.1", title: "How to record outcomes from basic inspections and dead tests clearly and accurately" , summary: "Regulation 644.3 requires the results of every test to be recorded and retained as part of the certification." },
          { slug: "317e-4-1", unit: "317E", criterion: "4.1", title: "The procedures for: completion of the relevant documentation, recording of relevant data and information, and identification and consideration of the customer's need for electrical systems and equipment configuration" , summary: "BS 7671 Section 644 prescribes three model forms — EIC (new work + major alterations), MEIWC (minor work without a new circuit), EICR (periodic…" },
          { slug: "317e-4-2", unit: "317E", criterion: "4.2", title: "How to ensure that the electrical system and equipment is ready for hand over to the customer/client" , summary: "The handover pack is more than the EIC. Standard contents: EIC + Schedule of Inspections + Schedule of Test Results + Building Control Compliance…" },
          { slug: "317e-4-3", unit: "317E", criterion: "4.3", title: "The organisational procedures for: completing the necessary documentation, agreeing a programme of work with relevant people and confirming that the installation and/or maintenance work is completed" , summary: "The criterion names three procedures, not one." },
        ],
      },
    ],
  },
  {
    slug: "module8",
    number: 8,
    title: "Fault diagnosis and rectification",
    sections: [
      {
        slug: "section1",
        number: 1,
        title: "Dangers and safe working during fault diagnosis",
        lessons: [
          { slug: "318e-1-1", unit: "318E", criterion: "1.1", title: "The dangers of electricity in relation to fault diagnosis work" , summary: "re investigating may have created the hazard — borrowed neutrals, induced voltage, compromised CPCs, lost neutral.\", \"EAWR 1989 Reg 13 says dead…" },
          { slug: "318e-1-2", unit: "318E", criterion: "1.2", title: "The health and safety requirements relevant to diagnosing and correcting electrical faults in electrical systems and equipment" , summary: "t satisfy MHSWR Reg 3" },
          { slug: "318e-1-3", unit: "318E", criterion: "1.3", title: "The safe working procedures that should be adopted for completion of fault diagnosis and correction work" , summary: "Safe working procedures = barriers + signage + work-area control + appropriate witnessing + verified instruments + the pre-work checklist." },
          { slug: "318e-4-1", unit: "318E", criterion: "4.1", title: "The precautions that must be taken when carrying out fault diagnosis regarding particular locations, equipment and circumstances" , summary: "Fibre-optic carries invisible IR laser light — never look down a fibre or connector." },
        ],
      },
      {
        slug: "section2",
        number: 2,
        title: "Fault information, causes and common locations",
        lessons: [
          { slug: "318e-2-1", unit: "318E", criterion: "2.1", title: "How to obtain clear and detailed information about the reported fault(s) and any components which need to be replaced from: relevant sources of information and relevant documentation" , summary: "Drawings are a starting hypothesis, not truth — verify the as-built revision against the actual installation before relying on it." },
          { slug: "318e-2-2", unit: "318E", criterion: "2.2", title: "The organisational procedures and industry practices when carrying out the processes for the identification and rectification of faults for: advising the relevant people about the potential disruption and consequences, confirming a programme of work with…" , summary: "Certificate-type selection is part of competence — Minor Works Certificate for like-for-like replacement, EIC for new circuits, EICR for periodic…" },
          { slug: "318e-3-1", unit: "318E", criterion: "3.1", title: "The different types and causes and consequences of electrical faults" , summary: "Seven canonical fault types: open circuit, short circuit, earth fault, HRJ, insulation failure, transient voltage, excess current." },
          { slug: "318e-3-2", unit: "318E", criterion: "3.2", title: "Typical types of faults and their likely locations in wiring systems and equipment" , summary: "Most faults are at terminations — busbar, socket back-terminal, junction box." },
        ],
      },
      {
        slug: "section3",
        number: 3,
        title: "A logical approach to fault finding",
        lessons: [
          { slug: "318e-4-2", unit: "318E", criterion: "4.2", title: "The logical stages of fault diagnosis" , summary: "Seven stages: collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix." },
          { slug: "318e-4-3", unit: "318E", criterion: "4.3", title: "How to select the instruments to be used and confirming that the instruments are fit for purpose and have a current calibration certificate" , summary: "Three levels of confidence: calibration (formal lab measurement against UKAS-traceable reference), verification (field agreement between…" },
          { slug: "318e-4-4", unit: "318E", criterion: "4.4", title: "The techniques to identify, locate, diagnose and rectify faults" , summary: "Supply identification is the first technical step." },
          { slug: "318e-5-1", unit: "318E", criterion: "5.1", title: "Typical factors which can affect repair or replacement of equipment" , summary: "Six factors: cost, parts availability, reliability, compliance, schedule, warranty / insurance." },
        ],
      },
      {
        slug: "section4",
        number: 4,
        title: "Repair, replacement, retesting and handover",
        lessons: [
          { slug: "318e-5-2", unit: "318E", criterion: "5.2", title: "How to repair, remove and replace in accordance with industry practices: electrical cables, conductors and/or the wiring system, equipment, accessories, and components" , summary: "Three-phase imbalance (phase voltages diverging beyond a few volts) is normally a DNO-side issue — recognise, document, escalate." },
          { slug: "318e-5-3", unit: "318E", criterion: "5.3", title: "The methods and processes to inspect and test, as appropriate and in accordance with industry practices, repaired and/or replaced: electrical cables, conductors and/or the wiring system and equipment, accessories, and components" , summary: "Post-rectification retest is non-negotiable." },
          { slug: "318e-5-4", unit: "318E", criterion: "5.4", title: "How to ensure, if the fault(s) cannot be corrected immediately, the safety of the relevant: electrical cables, conductors and/or the wiring system and equipment, accessories, and components" , summary: "A fault you cannot correct today does not stop being your responsibility." },
          { slug: "318e-5-5", unit: "318E", criterion: "5.5", title: "The methods to ensure the safe disposal of any waste and that the work area is left in a safe and clean condition" , summary: "WEEE Regulations 2013 cover failed devices and scorched electrical accessories — route via the wholesaler Distributor Take-Back Scheme (CEF…" },
          { slug: "318e-5-6", unit: "318E", criterion: "5.6", title: "How to provide clear and accurate information to relevant people about the electrical system and equipment in terms of: hand over to the customer/client, any variations to the original system and/or its equipment, customer/client acceptance of the…" , summary: "The criterion names three things — the handover, any variations, and the customer acceptance — and each of them is a separate piece of information…" },
        ],
      },
    ],
  },
];

export const WELSH_L3_PAGE_COUNT = WELSH_L3_MODULES.reduce(
  (n, m) => n + m.sections.reduce((k, s) => k + s.lessons.length, 0),
  0
);

export const WELSH_L3_SECTION_COUNT = WELSH_L3_MODULES.reduce(
  (n, m) => n + m.sections.length,
  0
);

/** The qualification units a module draws on, in the order they first appear. */
export function unitsInModule(module: WelshModule | undefined): string[] {
  if (!module) return [];
  const seen: string[] = [];
  for (const s of module.sections) {
    for (const l of s.lessons) if (!seen.includes(l.unit)) seen.push(l.unit);
  }
  return seen;
}

export function findModule(slug: string | undefined): WelshModule | undefined {
  return WELSH_L3_MODULES.find((m) => m.slug === slug);
}

export function findSection(
  module: WelshModule | undefined,
  slug: string | undefined
): WelshSection | undefined {
  return module?.sections.find((s) => s.slug === slug);
}

export function findLesson(
  section: WelshSection | undefined,
  slug: string | undefined
): WelshLesson | undefined {
  return section?.lessons.find((l) => l.slug === slug);
}

/** The page before and after this one, for the prev/next footer. */
export function neighbours(moduleSlug: string, sectionSlug: string, lessonSlug: string) {
  const flat: { module: WelshModule; section: WelshSection; lesson: WelshLesson }[] = [];
  for (const module of WELSH_L3_MODULES) {
    for (const section of module.sections) {
      for (const lesson of section.lessons) flat.push({ module, section, lesson });
    }
  }
  const i = flat.findIndex(
    (f) =>
      f.module.slug === moduleSlug &&
      f.section.slug === sectionSlug &&
      f.lesson.slug === lessonSlug
  );
  if (i === -1) return { prev: undefined, next: undefined };
  const href = (f: (typeof flat)[number]) =>
    `${WELSH_L3_BASE}/${f.module.slug}/${f.section.slug}/${f.lesson.slug}`;
  return {
    prev: i > 0 ? { href: href(flat[i - 1]), title: flat[i - 1].lesson.title } : undefined,
    next:
      i < flat.length - 1
        ? { href: href(flat[i + 1]), title: flat[i + 1].lesson.title }
        : undefined,
  };
}
