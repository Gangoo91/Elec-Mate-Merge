import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Motor Construction and Operation - MOET Module 3 Section 2.1";
const DESCRIPTION = "Comprehensive guide to three-phase induction motor construction and operation for electrical maintenance technicians: stator and rotor design, bearings, cooling methods, terminal connections, nameplate data interpretation, motor mounting and shaft alignment under ST1426.";

const quickCheckQuestions = [
  {
    id: "sync-speed",
    question: "What is the synchronous speed of a 4-pole motor on a 50 Hz supply?",
    options: [
      "750 RPM",
      "1000 RPM",
      "1500 RPM",
      "3000 RPM"
    ],
    correctIndex: 2,
    explanation: "Synchronous Speed = (120 x Frequency) / Number of Poles = (120 x 50) / 4 = 1500 RPM. The actual rotor speed will be slightly less due to slip, typically around 1450 RPM at full load. This formula is fundamental for understanding motor speed selection."
  },
  {
    id: "tefc-meaning",
    question: "What does TEFC stand for in motor cooling terminology?",
    options: [
      "Thermally Enhanced Full Capacity",
      "Totally Enclosed Fan Cooled",
      "Temperature Efficient Fan Controlled",
      "Thermally Enclosed Forced Cooled"
    ],
    correctIndex: 1,
    explanation: "TEFC stands for Totally Enclosed Fan Cooled, designated IC411 under IEC 60034-6. It is the most common motor enclosure type, with a sealed motor body and an external shaft-mounted fan that draws air over the ribbed frame for cooling. The motor internals are protected from the external environment."
  },
  {
    id: "star-voltage",
    question: "In star connection on a 400 V supply, what voltage appears across each motor winding?",
    options: [
      "400 V",
      "230 V",
      "110 V",
      "690 V"
    ],
    correctIndex: 1,
    explanation: "In star connection, the voltage across each winding is the line voltage divided by the square root of 3. For a 400 V supply: 400 / 1.732 = approximately 230 V per winding. This is why a motor rated 400/690 V is connected in star for 690 V (giving 400 V per winding) and delta for 400 V (giving 400 V per winding)."
  },
  {
    id: "bearing-failure",
    question: "What is the single largest cause of premature bearing failure in electric motors?",
    options: [
      "Overvoltage",
      "Overloading",
      "Shaft misalignment",
      "Poor insulation"
    ],
    correctIndex: 2,
    explanation: "Misalignment between the motor shaft and the driven equipment is the single largest cause of premature bearing failure. It causes excessive radial and axial vibration, uneven loading on the bearings, and accelerated wear. Laser alignment tools should be used to achieve tolerances within 0.05 mm."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the synchronous speed of a 2-pole motor on a 50 Hz supply?",
    options: ["750 RPM", "1000 RPM", "1500 RPM", "3000 RPM"],
    correctAnswer: 3,
    explanation: "Synchronous Speed = (120 x 50) / 2 = 3000 RPM. With slip, the actual full-load speed would be approximately 2900 RPM."
  },
  {
    id: 2,
    question: "What type of rotor does a squirrel-cage induction motor have?",
    options: [
      "Wound rotor with slip rings",
      "Aluminium or copper bars short-circuited by end rings",
      "Permanent magnets",
      "Commutator and brushes"
    ],
    correctAnswer: 1,
    explanation: "The squirrel-cage rotor has aluminium or copper bars embedded in slots around the rotor core, short-circuited at each end by end rings to form a cage structure. It has no electrical connections, slip rings or brushes."
  },
  {
    id: 3,
    question: "What percentage slip is typical for an induction motor at full load?",
    options: ["0.1 to 0.5%", "2 to 5%", "10 to 15%", "20 to 30%"],
    correctAnswer: 1,
    explanation: "Typical full-load slip is 2-5%. A 4-pole motor with 1500 RPM synchronous speed might have a full-load speed of 1450 RPM (3.3% slip). Slip is essential for torque production."
  },
  {
    id: 4,
    question: "What does TEFC stand for?",
    options: [
      "Thermally Enclosed Fan Controlled",
      "Totally Enclosed Fan Cooled",
      "Temperature Efficient Full Capacity",
      "Totally Enclosed Forced Cooled"
    ],
    correctAnswer: 1,
    explanation: "TEFC = Totally Enclosed Fan Cooled (IEC IC411). The motor is sealed and cooled by an external shaft-mounted fan drawing air over the ribbed motor frame."
  },
  {
    id: 5,
    question: "Which bearing type is most common in motors up to 200 kW?",
    options: ["Sleeve bearings", "Ball bearings", "Magnetic bearings", "Roller bearings"],
    correctAnswer: 1,
    explanation: "Ball bearings (rolling element bearings) are most common in small to medium motors up to approximately 200 kW. They are grease-lubricated and available in sealed or re-greaseable types."
  },
  {
    id: 6,
    question: "What motor terminal configuration gives 400 V across each winding on a 400 V supply?",
    options: ["Star", "Delta", "Series", "Parallel"],
    correctAnswer: 1,
    explanation: "In delta connection, the full line voltage (400 V) appears directly across each winding. In star connection, the winding voltage would be 400/1.732 = 230 V."
  },
  {
    id: 7,
    question: "What is the minimum efficiency class for new motors in the EU?",
    options: ["IE1", "IE2", "IE3", "IE4"],
    correctAnswer: 2,
    explanation: "IE3 (Premium Efficiency) is the minimum requirement for most new motors from 0.75 kW to 375 kW. Higher classes (IE4, IE5) are available for further energy savings. The classification is defined in IEC 60034-30."
  },
  {
    id: 8,
    question: "What is the most common motor duty cycle designation for continuous operation?",
    options: ["S2", "S1", "S3", "S6"],
    correctAnswer: 1,
    explanation: "S1 is the continuous duty rating -- the motor can run continuously at rated load indefinitely. S2 is short-time duty, and S3-S8 are various intermittent duty cycles."
  },
  {
    id: 9,
    question: "What is the single largest cause of premature bearing failure?",
    options: ["Overvoltage", "Overloading", "Misalignment", "Undervoltage"],
    correctAnswer: 2,
    explanation: "Shaft misalignment is the single largest cause of premature bearing failure, causing excessive vibration and uneven bearing loads."
  },
  {
    id: 10,
    question: "Which mounting configuration is described as 'foot mounted with horizontal shaft'?",
    options: ["B5", "B14", "B3", "V1"],
    correctAnswer: 2,
    explanation: "B3 is the standard foot-mounted configuration with a horizontal shaft. It is the most common motor mounting type, bolted to a baseplate or plinth."
  },
  {
    id: 11,
    question: "What alignment method provides accuracy to 0.01 mm with graphical display?",
    options: ["Straightedge and feeler gauges", "Dial indicators", "Laser alignment", "Visual inspection"],
    correctAnswer: 2,
    explanation: "Laser alignment tools provide accuracy to within 0.01 mm and display a clear graphical representation of the correction needed in real time. They are the preferred modern method."
  },
  {
    id: 12,
    question: "What insulation class has a maximum temperature of 155 degrees C?",
    options: ["Class A", "Class B", "Class F", "Class H"],
    correctAnswer: 2,
    explanation: "Class F insulation has a maximum operating temperature of 155 degrees C. Class B is 130 degrees C and Class H is 180 degrees C."
  }
];

const faqs = [
  {
    question: "Why does the rotor turn slower than the magnetic field?",
    answer: "The difference in speed (called slip) is necessary for the motor to work. If the rotor turned at synchronous speed, there would be no relative motion between the rotor conductors and the rotating magnetic field, so no current would be induced in the rotor bars and no torque would be produced. Slip is typically 2-5% at full load and increases with load."
  },
  {
    question: "What does 400/690 V on a motor nameplate mean?",
    answer: "It means the motor can operate at either voltage: connected in delta for a 400 V supply (full line voltage across each winding) or in star for a 690 V supply (400 V across each winding after the star point voltage division). Both configurations deliver the same voltage to each winding and give identical motor performance."
  },
  {
    question: "What is the minimum efficiency class for new motors in the EU?",
    answer: "IE3 (Premium Efficiency) is the minimum requirement for most new motors from 0.75 kW to 375 kW under the EU Ecodesign Regulation 2019/1781. Higher efficiency classes (IE4 Super Premium and IE5 Ultra Premium) are available and increasingly specified for energy-critical applications. The classification is defined in IEC 60034-30."
  },
  {
    question: "How often should motor alignment be checked?",
    answer: "Alignment should be checked at installation, after any maintenance involving motor repositioning, and typically annually as part of the PPM programme. Critical motors or those with high vibration readings may be checked more frequently. Vibration monitoring can indicate developing misalignment between scheduled checks."
  },
  {
    question: "What is the difference between IP55 and IP66 motor enclosures?",
    answer: "IP55 provides dust protection (limited ingress, not harmful) and protection against water jets from any direction. IP66 provides complete dust-tight protection and protection against powerful water jets. IP55 is the standard for general industrial use, whilst IP66 is specified for washdown areas, food processing and outdoor exposed locations."
  }
];

const MOETModule3Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title Block */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-elec-yellow" />
            <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded-full text-sm font-semibold">
              Module 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            3.2.1 Motor Construction and Operation
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Stator, rotor, bearings, cooling, terminal connections, nameplate data, mounting and shaft alignment
          </p>
        </div>

        {/* 2-Column Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 text-sm uppercase tracking-wide">In 30 Seconds</h3>
            <ul className="text-left text-white text-sm space-y-1.5">
              <li>- <strong>Stator:</strong> Laminated core with 3-phase copper windings</li>
              <li>- <strong>Rotor:</strong> Squirrel-cage bars, no brushes or slip rings</li>
              <li>- <strong>Slip:</strong> 2-5% at full load, essential for torque</li>
              <li>- <strong>Nameplate:</strong> Every field matters for replacement and sizing</li>
            </ul>
          </div>
          <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 text-sm uppercase tracking-wide">Electrical Maintenance Context</h3>
            <ul className="text-left text-white text-sm space-y-1.5">
              <li>- Motors consume 70% of industrial electricity</li>
              <li>- Construction knowledge enables fault diagnosis</li>
              <li>- Nameplate data critical for correct replacement</li>
              <li>- Alignment prevents premature bearing failure</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-elec-yellow/30 rounded-lg p-5 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Learning Outcomes
          </h2>
          <ol className="space-y-2 text-white list-decimal list-inside">
            <li>Describe the construction and function of the stator and rotor in an induction motor</li>
            <li>Identify different bearing types and explain their maintenance requirements</li>
            <li>Explain motor cooling methods and their importance for motor life</li>
            <li>Interpret all data fields on a motor nameplate including efficiency class</li>
            <li>Describe motor mounting configurations and their applications</li>
            <li>Explain the importance of shaft alignment and describe alignment methods</li>
          </ol>
        </div>

        <hr className="border-white/10 my-8" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Three-Phase Induction Motor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The three-phase squirrel-cage induction motor is the most common type of electric motor in commercial and industrial installations. It accounts for approximately 70% of all electrical energy consumed in industry. Its popularity is due to its robust construction, high reliability, low maintenance requirements and relatively low cost compared to other motor types.
            </p>
            <p>
              The induction motor works on the principle of electromagnetic induction. A rotating magnetic field is produced in the stator windings when a three-phase AC supply is connected. This rotating field induces a current in the rotor conductors by transformer action. The induced current creates its own magnetic field, which interacts with the stator field to produce torque and rotation.
            </p>
            <p>
              The rotor always turns slightly slower than the rotating magnetic field -- this difference is called "slip" and is essential for the motor to produce torque. If the rotor turned at the same speed as the field (synchronous speed), there would be no relative motion, no induced current, and therefore no torque.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">1.1 Stator Construction</h3>
            <p>
              The stator is the stationary outer part of the motor. It consists of a laminated steel core (laminations reduce eddy current losses) with slots machined into the inner bore. Insulated copper windings are placed in these slots to form the three-phase winding. The windings are connected in either star (Y) or delta (triangle) configuration, depending on the motor voltage and starting method.
            </p>
            <p>
              The number of magnetic poles in the stator winding determines the synchronous speed of the rotating magnetic field. For a 50 Hz supply: 2 poles = 3000 RPM synchronous speed; 4 poles = 1500 RPM; 6 poles = 1000 RPM; 8 poles = 750 RPM. The formula is:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5 text-center">
              <p className="text-elec-yellow font-mono text-lg">Synchronous Speed (RPM) = (120 x Frequency) / Number of Poles</p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">1.2 Rotor Construction</h3>
            <p>
              The squirrel-cage rotor consists of a laminated steel core with aluminium or copper bars embedded in slots around the periphery. The bars are short-circuited at each end by aluminium or copper end rings, forming a cage-like structure (hence "squirrel cage"). The rotor has no electrical connections, slip rings or brushes, which is why it is so reliable and low-maintenance.
            </p>
            <p>
              The actual rotor speed is always slightly less than synchronous speed due to slip. A typical 4-pole motor at 50 Hz has a synchronous speed of 1500 RPM but an actual full-load speed of approximately 1450 RPM. The slip percentage is typically 2-5% at full load and can be calculated as:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5 text-center">
              <p className="text-elec-yellow font-mono">Slip (%) = ((Synchronous Speed - Actual Speed) / Synchronous Speed) x 100</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bearings and Cooling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <h3 className="text-lg font-semibold text-white mb-3">2.1 Bearing Types</h3>
            <p>
              The rotor is supported by bearings at each end: the drive end (DE) and the non-drive end (NDE). Bearings are the most common failure point in electric motors, accounting for approximately 50% of all motor failures. Understanding bearing types and their maintenance is essential for every maintenance technician.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Ball Bearings (Rolling Element):</strong> Most common in small to medium motors (up to approximately 200 kW). They use steel balls running in precision-machined races. Ball bearings are grease-lubricated, available as sealed (greased for life) or re-greaseable types. They have a finite life determined by speed, load and lubrication conditions -- typically 20,000 to 40,000 operating hours under normal conditions.</li>
                <li><strong className="text-elec-yellow">Sleeve Bearings (Plain Bearings):</strong> Used in larger motors (above approximately 200 kW). The shaft rotates in an oil-lubricated bearing shell, typically babbitt-lined. Sleeve bearings require an oil supply system (ring-oiled, pressure-fed or oil mist). They have a longer life than ball bearings when properly maintained and can accommodate higher speeds and loads.</li>
                <li><strong className="text-elec-yellow">Roller Bearings:</strong> Used where high radial loads are present, such as belt-driven applications. Cylindrical or spherical roller bearings provide greater load capacity than ball bearings but are more expensive and require more precise alignment.</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.2 Motor Cooling Methods</h3>
            <p>
              Motor cooling is classified by the IEC 60034-6 designation system. The cooling method determines the motor's enclosure type, its suitability for different environments, and the maintenance required to keep the cooling system effective.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">IC411 (TEFC):</strong> Totally Enclosed Fan Cooled. The most common type in industrial use. An external fan mounted on the non-drive end shaft draws air over the motor frame fins. The motor internals are sealed from the external environment, protecting against dust and moisture.</li>
                <li><strong className="text-elec-yellow">IC01 (ODP):</strong> Open Drip Proof. Air is drawn directly through the motor for cooling. Only suitable for clean, dry environments such as plant rooms and switchrooms.</li>
                <li><strong className="text-elec-yellow">IC71 (TENV):</strong> Totally Enclosed Non-Ventilated. Relies on natural convection and radiation for heat dissipation. Used for very small motors or where an external fan cannot be fitted.</li>
                <li><strong className="text-elec-yellow">IC81W:</strong> Water-cooled. A water jacket surrounds the stator for heat removal. Used for large motors in confined spaces or high ambient temperature environments where air cooling is insufficient.</li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> For TEFC motors, the cooling fan and fan cowl are critical components. A blocked or damaged fan cowl, a broken fan blade, or debris on the frame fins will cause the motor to overheat. During every maintenance visit, check that the fan is intact, the cowl is secure and the air path is clear of debris.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Terminal Box and Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The terminal box (also called the connection box) is located on top of or on the side of the motor. It provides the connection point for the supply cables and allows the motor windings to be configured for the appropriate voltage and starting method.
            </p>
            <p>
              A standard three-phase motor has six terminals labelled U1, V1, W1 (winding starts) and U2, V2, W2 (winding ends). These six terminals allow the motor to be connected in either star or delta configuration:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Star Connection:</strong> U2, V2, W2 are linked together (star point). Supply is connected to U1, V1, W1. The voltage across each winding is the supply line voltage divided by the square root of 3 (e.g., 400 V supply gives 230 V per winding). Used for higher supply voltages or for star-delta starting.</li>
                <li><strong className="text-elec-yellow">Delta Connection:</strong> U1-W2, V1-U2, W1-V2 are linked. Supply is connected at the junction points. The full line voltage appears across each winding (e.g., 400 V supply gives 400 V per winding). Standard running configuration for most 400 V motors.</li>
              </ul>
            </div>
            <p>
              A motor rated 400/690 V can be connected in delta for a 400 V supply or in star for a 690 V supply. In both cases, each winding receives 400 V and the motor operates identically.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> The terminal box should always be checked during maintenance for signs of overheating (discoloured connections), moisture ingress (condensation or corrosion), loose connections (tighten to the manufacturer's torque specification) and damaged cable glands. The gland plate must maintain the motor's IP rating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Nameplate Data Interpretation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The motor nameplate is a critical source of information for maintenance, replacement and troubleshooting. It is permanently fixed to the motor frame and contains all essential technical data. Every maintenance technician must be able to read and interpret every field on a motor nameplate.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Key Nameplate Data Fields</p>
              <ul className="text-white space-y-3 text-left text-sm">
                <li><strong className="text-elec-yellow">Rated Power (kW):</strong> The mechanical output power at the shaft. A 7.5 kW motor delivers 7.5 kW of mechanical power. The electrical input power is higher due to losses (copper, iron, friction, windage).</li>
                <li><strong className="text-elec-yellow">Rated Speed (RPM):</strong> The shaft speed at full load. Always less than synchronous speed due to slip (e.g., 1450 RPM for a 4-pole motor at 50 Hz).</li>
                <li><strong className="text-elec-yellow">Rated Voltage:</strong> The supply voltage for which the motor is designed. Often shown as 400/690 V (400 V delta, 690 V star) or 230/400 V (230 V delta, 400 V star).</li>
                <li><strong className="text-elec-yellow">Rated Current (A):</strong> The full-load current at rated voltage and power. Used for sizing cables, protective devices and starters. This is the value the overload relay should be set to.</li>
                <li><strong className="text-elec-yellow">Efficiency (eta):</strong> The ratio of mechanical output to electrical input, expressed as a percentage. Modern motors are classified IE1 to IE5 under IEC 60034-30, with IE3 being the minimum for new installations in the EU.</li>
                <li><strong className="text-elec-yellow">Power Factor (cos phi):</strong> Typically 0.80 to 0.90 at full load. Significantly lower at light load, which affects the installation's overall power factor and may incur reactive power charges.</li>
                <li><strong className="text-elec-yellow">IP Rating:</strong> The degree of protection against dust and water ingress. IP55 is standard for general industrial use; IP66 for washdown areas.</li>
                <li><strong className="text-elec-yellow">Insulation Class:</strong> The maximum temperature the winding insulation can withstand. Class B (130 degrees C), Class F (155 degrees C) and Class H (180 degrees C) are common. Most modern motors use Class F insulation.</li>
                <li><strong className="text-elec-yellow">Duty Cycle:</strong> S1 (continuous), S2 (short-time), S3-S8 (various intermittent duties). S1 is the most common designation.</li>
                <li><strong className="text-elec-yellow">Frame Size:</strong> The physical dimensions of the motor, standardised to IEC 60072. Determines mounting dimensions, shaft height and shaft diameter. Essential for replacement compatibility.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Motor Mounting and Shaft Alignment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <h3 className="text-lg font-semibold text-white mb-3">5.1 Mounting Configurations</h3>
            <p>
              Motor mounting types are standardised by IEC 60034-7 and identified by a letter-number code. The mounting type determines how the motor is physically attached to the driven equipment or its support structure.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-2 text-left">
                <li><strong className="text-elec-yellow">B3 (Foot Mounted):</strong> The most common configuration. Motor sits on feet bolted to a baseplate or plinth. Horizontal shaft. Used for most general industrial applications.</li>
                <li><strong className="text-elec-yellow">B5 (Flange Mounted):</strong> Motor mounted via a large flange on the drive end. Common for pump and gearbox connections where precise concentricity is needed.</li>
                <li><strong className="text-elec-yellow">B14 (Face Mounted):</strong> Similar to B5 but with a smaller flange. Used for smaller motors on machinery.</li>
                <li><strong className="text-elec-yellow">B35 (Foot and Flange):</strong> Combination of foot and flange mounting for maximum flexibility and support.</li>
                <li><strong className="text-elec-yellow">V1 (Vertical, shaft down):</strong> Motor mounted vertically with shaft pointing downward. Common for submersible pumps and vertical fans.</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">5.2 Shaft Alignment</h3>
            <p>
              Correct shaft alignment between the motor and the driven equipment is critical for motor reliability. Misalignment is the single largest cause of premature bearing failure and excessive vibration. There are two types of misalignment that must be corrected:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Angular Misalignment:</strong> The shaft centrelines meet at an angle. This causes axial vibration and thrust bearing wear. Detected by unequal gaps around the coupling periphery.</li>
                <li><strong className="text-elec-yellow">Parallel (Offset) Misalignment:</strong> The shaft centrelines are parallel but offset vertically or horizontally. This causes radial vibration and bearing wear. Detected by a step between the coupling halves.</li>
              </ul>
            </div>
            <p>
              Alignment is checked using dial indicators, laser alignment tools, or straightedge and feeler gauges (for non-critical applications). Laser alignment is the preferred modern method, providing accuracy to within 0.01 mm and a clear graphical display of the correction needed.
            </p>
            <p>
              Alignment should be checked during installation, after any maintenance that involves disconnecting or repositioning the motor, and as part of the PPM programme (typically annually). The motor should be aligned with the driven equipment at operating temperature wherever possible, as thermal expansion can change alignment significantly.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Soft foot (uneven motor feet) must be corrected before alignment. If the motor rocks on its feet, it will distort when bolted down, misaligning the shaft. Check for soft foot by loosening each foot bolt in turn and measuring any gap with a feeler gauge. Correct with stainless steel shims.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* FAQs */}
        <div className="mt-10 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-10 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Synchronous Speeds (50 Hz)</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>2 poles = 3000 RPM</li>
                <li>4 poles = 1500 RPM</li>
                <li>6 poles = 1000 RPM</li>
                <li>8 poles = 750 RPM</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Insulation Classes</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Class A = 105 degrees C</li>
                <li>Class B = 130 degrees C</li>
                <li>Class F = 155 degrees C</li>
                <li>Class H = 180 degrees C</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Efficiency Classes</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>IE1 = Standard Efficiency</li>
                <li>IE2 = High Efficiency</li>
                <li>IE3 = Premium (minimum EU)</li>
                <li>IE4 = Super Premium</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Common Mounting Types</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>B3 = Foot mounted (horizontal)</li>
                <li>B5 = Large flange mounted</li>
                <li>B14 = Small flange mounted</li>
                <li>B35 = Foot and flange</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="border-t border-white/10 pt-8">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Section 3.2 Hub
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-2">
              Next: DOL Starters
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MOETModule3Section2_1;
