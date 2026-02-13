import { FlashcardData } from './types';

export const electricalMachines: FlashcardData[] = [
  // ── Transformers ────────────────────────────────────────────────────────
  {
    id: 'em1',
    question: 'What is the principle of operation of a transformer?',
    answer:
      'A transformer operates on the principle of mutual induction. An alternating current in the primary winding creates a changing magnetic flux in the core, which induces an EMF in the secondary winding. Both windings are magnetically coupled but electrically isolated.',
    category: 'Transformers',
    difficulty: 'easy',
  },
  {
    id: 'em2',
    question: 'State the transformer turns ratio formula and explain its significance.',
    answer:
      'The turns ratio formula is Np/Ns = Vp/Vs, where Np and Ns are the number of turns on the primary and secondary windings, and Vp and Vs are the corresponding voltages. This ratio determines whether the transformer steps voltage up or down, and is fundamental to transformer design and selection.',
    category: 'Transformers',
    difficulty: 'easy',
  },
  {
    id: 'em3',
    question:
      'A transformer has 1000 primary turns and 250 secondary turns. If the primary voltage is 230V, what is the secondary voltage?',
    answer:
      'Using Np/Ns = Vp/Vs: 1000/250 = 230/Vs, so Vs = 230 × 250/1000 = 57.5V. This is a step-down transformer with a 4:1 turns ratio, reducing the voltage to one quarter of the primary value.',
    category: 'Transformers',
    difficulty: 'medium',
  },
  {
    id: 'em4',
    question: 'What is the difference between a step-up and a step-down transformer?',
    answer:
      'A step-up transformer has more turns on the secondary than the primary, producing a higher secondary voltage. A step-down transformer has fewer secondary turns than primary turns, producing a lower secondary voltage. In both cases, power in equals power out (minus losses), so stepping up voltage reduces current and vice versa.',
    category: 'Transformers',
    difficulty: 'easy',
  },
  {
    id: 'em5',
    question: 'What is an auto-transformer, and what is its main advantage and disadvantage?',
    answer:
      'An auto-transformer has a single winding with a tapping point, rather than separate primary and secondary windings. Its main advantage is that it is smaller, lighter, and cheaper than a double-wound transformer of the same rating. Its main disadvantage is that there is no electrical isolation between primary and secondary, so it cannot be used where isolation is required for safety.',
    category: 'Transformers',
    difficulty: 'medium',
  },
  {
    id: 'em6',
    question: 'What is the purpose of an isolation transformer?',
    answer:
      'An isolation transformer provides electrical separation (galvanic isolation) between the primary and secondary circuits. It is used to protect personnel and equipment from electric shock, particularly in bathrooms (shaver sockets) and for supplying portable tools on construction sites. The turns ratio is typically 1:1, so the voltage remains the same.',
    category: 'Transformers',
    difficulty: 'easy',
  },
  {
    id: 'em7',
    question: 'What is a current transformer (CT) and how is it used?',
    answer:
      'A current transformer is an instrument transformer used to measure large currents safely. The primary is the conductor carrying the load current (often a single pass through the core), and the secondary produces a proportionally reduced current, typically 5A or 1A. The secondary must never be left open-circuit, as this would produce dangerously high voltages.',
    category: 'Transformers',
    difficulty: 'medium',
  },
  {
    id: 'em8',
    question: 'Name the two types of transformer losses and explain how each is reduced.',
    answer:
      'Copper losses (I squared R losses) occur due to the resistance of the windings and are reduced by using thicker conductors. Iron losses consist of hysteresis losses (energy lost reversing the magnetic domains) and eddy current losses (circulating currents in the core). Eddy current losses are reduced by laminating the core with thin insulated steel sheets, and hysteresis losses are reduced by using silicon steel or grain-oriented steel.',
    category: 'Transformers',
    difficulty: 'hard',
  },
  {
    id: 'em9',
    question: 'Why are transformer cores laminated, and what are the two common core types?',
    answer:
      'Transformer cores are laminated (built from thin insulated steel sheets) to reduce eddy current losses. The insulation between laminations increases the resistance to circulating currents, limiting energy wasted as heat. The two common core types are E-I core (shell type, using E-shaped and I-shaped stampings) and toroidal core (doughnut-shaped), with toroidal cores offering lower losses and reduced electromagnetic interference.',
    category: 'Transformers',
    difficulty: 'hard',
  },

  // ── DC Machines ─────────────────────────────────────────────────────────
  {
    id: 'em10',
    question: 'Name the four main types of DC motor and briefly describe each.',
    answer:
      'The four main types are: shunt wound (field winding in parallel with armature, giving good speed regulation), series wound (field winding in series with armature, giving high starting torque), compound wound (combination of series and shunt fields, offering a compromise of both characteristics), and permanent magnet (uses permanent magnets instead of field windings, common in small motors and automotive applications).',
    category: 'DC Machines',
    difficulty: 'medium',
  },
  {
    id: 'em11',
    question: 'What is back-EMF in a DC motor, and why is it important?',
    answer:
      'Back-EMF (back electromotive force) is the voltage generated in the armature of a DC motor as it rotates through the magnetic field. It opposes the supply voltage and limits the armature current. When the motor first starts, back-EMF is zero and the starting current is very high, which is why starters or current-limiting devices are often required for larger DC motors.',
    category: 'DC Machines',
    difficulty: 'hard',
  },
  {
    id: 'em12',
    question: 'Describe the speed-torque characteristic of a DC series motor.',
    answer:
      'A DC series motor has high torque at low speed and low torque at high speed. At light loads the speed can increase dangerously (runaway condition), so series motors should never be run unloaded or connected to loads via a belt that could slip off. This characteristic makes them ideal for applications requiring high starting torque such as electric traction, cranes, and lifts.',
    category: 'DC Machines',
    difficulty: 'hard',
  },
  {
    id: 'em13',
    question:
      'What is the difference between a self-excited and a separately excited DC generator?',
    answer:
      'A self-excited DC generator uses the current from its own output to energise the field windings, relying on residual magnetism in the poles to begin generating. A separately excited generator has its field winding supplied from an independent external DC source. Separately excited generators provide better voltage regulation and more precise control, but require an additional power supply.',
    category: 'DC Machines',
    difficulty: 'medium',
  },

  // ── AC Machines ─────────────────────────────────────────────────────────
  {
    id: 'em14',
    question:
      'State the formula for synchronous speed of a three-phase alternator and define each term.',
    answer:
      'The formula is Ns = 120f / p, where Ns is the synchronous speed in revolutions per minute (RPM), f is the supply frequency in hertz, and p is the number of poles. For example, a 4-pole alternator on a 50Hz supply has a synchronous speed of 120 × 50 / 4 = 1500 RPM.',
    category: 'AC Machines',
    difficulty: 'medium',
  },
  {
    id: 'em15',
    question: 'Explain how a rotating magnetic field is produced in a three-phase induction motor.',
    answer:
      'When three-phase supply is connected to three equally spaced stator windings, each phase produces a pulsating magnetic field that peaks 120 electrical degrees apart. The combination of these three fields produces a resultant magnetic field that rotates at synchronous speed around the stator. This rotating field induces currents in the rotor conductors, producing torque that drives the rotor in the same direction as the field.',
    category: 'AC Machines',
    difficulty: 'medium',
  },
  {
    id: 'em16',
    question:
      'What is slip in an induction motor, and why can the rotor never reach synchronous speed?',
    answer:
      'Slip is the difference between the synchronous speed of the rotating magnetic field and the actual rotor speed, usually expressed as a percentage: slip = ((Ns - Nr) / Ns) × 100%. The rotor can never reach synchronous speed because if it did, there would be no relative motion between the rotor conductors and the rotating field, no induced EMF, no rotor current, and therefore no torque. Typical full-load slip is 3-5%.',
    category: 'AC Machines',
    difficulty: 'hard',
  },
  {
    id: 'em17',
    question: 'Name three types of single-phase motor and give a typical application for each.',
    answer:
      'Universal motor: operates on AC or DC, used in portable power tools and vacuum cleaners due to its high speed and compact size. Shaded pole motor: simple and inexpensive, used in small fans and extractor fans where low starting torque is acceptable. Capacitor motor (split-phase): uses a capacitor to create a phase shift for starting, used in compressors, washing machines, and larger fans.',
    category: 'AC Machines',
    difficulty: 'medium',
  },
  {
    id: 'em18',
    question:
      'A 6-pole three-phase induction motor runs at 960 RPM on a 50Hz supply. Calculate the percentage slip.',
    answer:
      'Synchronous speed Ns = 120f / p = 120 × 50 / 6 = 1000 RPM. Slip = ((Ns - Nr) / Ns) × 100% = ((1000 - 960) / 1000) × 100% = 4%. This is a typical full-load slip value, indicating the motor is operating under normal loaded conditions.',
    category: 'AC Machines',
    difficulty: 'hard',
  },

  // ── Efficiency ──────────────────────────────────────────────────────────
  {
    id: 'em19',
    question: 'How is the efficiency of an electrical machine calculated?',
    answer:
      'Efficiency (η) = (output power / input power) × 100%, or equivalently η = (input power - losses) / input power × 100%. Losses include copper losses (I squared R in windings), iron losses (hysteresis and eddy currents in the core), mechanical losses (friction and windage), and stray losses. Modern high-efficiency motors can achieve efficiencies of 90-97%.',
    category: 'Efficiency',
    difficulty: 'easy',
  },
  {
    id: 'em20',
    question:
      'A motor draws 5kW from the supply and delivers 4.2kW of mechanical output. What is its efficiency?',
    answer:
      'Efficiency = (output / input) × 100% = (4.2 / 5.0) × 100% = 84%. The remaining 0.8kW (16%) is dissipated as heat due to copper losses, iron losses, friction, and windage. This is a typical efficiency for a smaller industrial motor.',
    category: 'Efficiency',
    difficulty: 'easy',
  },
  {
    id: 'em21',
    question:
      'What are the insulation classes for motor windings, and what temperature does each class allow?',
    answer:
      'The main insulation classes and their maximum operating temperatures are: Class A (105°C), Class B (130°C), Class F (155°C), and Class H (180°C). These ratings define the maximum temperature the winding insulation can withstand continuously without degradation. Class F is the most common in modern industrial motors, with Class H used in high-temperature applications.',
    category: 'Efficiency',
    difficulty: 'medium',
  },
  {
    id: 'em22',
    question:
      'What is the typical starting current of an induction motor compared to its full-load current?',
    answer:
      'The starting current (also called locked rotor current or inrush current) of an induction motor is typically 6 to 8 times the full-load current. This high current is due to the low impedance of the rotor at standstill when slip is 100%. Star-delta starters, soft starters, or variable frequency drives are used to reduce starting current and protect the supply and motor.',
    category: 'Efficiency',
    difficulty: 'hard',
  },

  // ── Applications ────────────────────────────────────────────────────────
  {
    id: 'em23',
    question: 'What do IP ratings mean for electric motors, and what are the common ratings?',
    answer:
      'IP (Ingress Protection) ratings indicate the degree of protection against solid objects and water. The first digit (0-6) rates solid protection and the second digit (0-9) rates water protection. IP55 is the most common rating for industrial motors, providing protection against dust ingress and water jets from any direction. IP23 is used for indoor motors where ventilation is needed, offering protection against dripping water at up to 15 degrees from vertical.',
    category: 'Applications',
    difficulty: 'easy',
  },
  {
    id: 'em24',
    question: 'What are the IEC duty ratings S1, S2, and S3 for electric motors?',
    answer:
      'S1 (continuous duty) means the motor can run at its rated load indefinitely until it reaches thermal equilibrium. S2 (short-time duty) means the motor runs at constant load for a specified period then rests until it cools to ambient temperature, for example S2 30 min. S3 (intermittent periodic duty) means the motor operates in a repeating cycle of load and rest periods, expressed as a duty cycle percentage, for example S3 25%.',
    category: 'Applications',
    difficulty: 'medium',
  },
  {
    id: 'em25',
    question: 'Why is a series DC motor particularly suited to crane and lift applications?',
    answer:
      'A series DC motor produces very high starting torque at low speed, which is essential for lifting heavy loads from rest. As the load increases, the motor slows down and produces more torque, providing a natural self-regulating characteristic ideal for hoisting. The speed also drops under heavy loads, giving the operator better control during lifting and lowering operations.',
    category: 'Applications',
    difficulty: 'medium',
  },
  {
    id: 'em26',
    question:
      'What type of motor is most commonly used for driving pumps and fans in commercial buildings, and why?',
    answer:
      'Three-phase squirrel cage induction motors are most commonly used for pumps and fans. They are robust, reliable, relatively inexpensive, and require minimal maintenance as they have no brushes or commutator. Their speed-torque characteristic suits the load profile of centrifugal pumps and fans, where torque demand increases with speed. Variable frequency drives are increasingly used with these motors for energy-efficient speed control.',
    category: 'Applications',
    difficulty: 'easy',
  },
  {
    id: 'em27',
    question:
      'A transformer has a primary voltage of 11kV and a secondary voltage of 400V. If the secondary current is 500A, calculate the primary current (assuming 100% efficiency).',
    answer:
      'Assuming 100% efficiency, input power equals output power: Vp × Ip = Vs × Is. Therefore Ip = (Vs × Is) / Vp = (400 × 500) / 11000 = 18.18A. In practice the primary current would be slightly higher due to transformer losses (typically 1-3% for distribution transformers of this size).',
    category: 'Transformers',
    difficulty: 'hard',
  },
  {
    id: 'em28',
    question:
      'What are the advantages of using a variable frequency drive (VFD) to control an induction motor in a conveyor application?',
    answer:
      'A VFD allows precise speed control by varying the frequency and voltage supplied to the motor, enabling smooth acceleration and deceleration of the conveyor. Benefits include reduced starting current (eliminating mechanical stress), energy savings of 20-50% on variable-torque loads, soft starting and stopping to prevent product damage, and the ability to reverse direction electronically. VFDs also provide built-in motor protection features such as overload, overcurrent, and earth fault detection.',
    category: 'Applications',
    difficulty: 'hard',
  },
];
