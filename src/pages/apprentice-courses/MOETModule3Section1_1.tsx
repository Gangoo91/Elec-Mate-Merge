import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Low Voltage Switchgear (MCBs, MCCBs) - MOET Module 3 Section 1.1';
const DESCRIPTION =
  'Comprehensive guide to low voltage switchgear for electrical maintenance technicians: MCB construction and operation, B/C/D trip curves, MCCBs and adjustable settings, breaking capacity, selectivity, thermographic surveys, torque checks and ST1426 compliance.';

const quickCheckQuestions = [
  {
    id: 'mcb-dual-mechanism',
    question:
      'Which element inside an MCB provides protection against a sustained overload rather than a short circuit?',
    options: [
      'The bimetallic strip (thermal element)',
      'The solenoid coil (magnetic element)',
      'The arc chute stack',
      'The toggle latch mechanism',
    ],
    correctIndex: 0,
    explanation:
      'The bimetallic strip is the thermal element. Sustained current above the rating heats the strip, which bends and eventually releases the trip latch. It is deliberately slow so that harmless short-duration currents, such as motor starting, do not cause nuisance tripping. The solenoid handles short circuits, where near-instantaneous disconnection is required.',
  },
  {
    id: 'trip-curve-selection',
    question:
      'A 3-phase motor keeps tripping its Type B MCB on start-up, although the running current is well within the device rating. What is the appropriate remedy?',
    options: [
      'Increase the MCB rating until the starting surge is accommodated',
      'Change to a Type C or Type D device of the same rating',
      'Fit a smaller cable to increase circuit impedance',
      'Bypass the MCB with a fuse-switch of the same rating',
    ],
    correctIndex: 1,
    explanation:
      'The problem is inrush current, not overload, so the magnetic trip threshold needs to be higher while the thermal characteristic and rated current stay matched to the cable. Type C (5-10 times rated current) or Type D (10-20 times) tolerates the surge. Increasing the rating would leave the cable unprotected against overload, because the rated current must not exceed the lowest current-carrying capacity of the circuit conductors (Regulation 433.1.1(b)).',
  },
  {
    id: 'breaking-capacity',
    question:
      'Why does breaking capacity matter more at the origin of an installation than at the end of a long final circuit?',
    options: [
      'Cable temperature is highest at the origin',
      'Prospective fault current is highest at the origin, closest to the supply',
      'Only devices at the origin are required to be certificated',
      'Touch voltage rises towards the origin of the installation',
    ],
    correctIndex: 1,
    explanation:
      'Prospective fault current is governed by the impedance between the fault and the source. At the origin, that impedance is at its lowest, so the available fault current is at its highest. Regulation 434.5.1 requires a device to be capable of breaking (and for a circuit-breaker, making) any overcurrent up to the maximum prospective fault current at the point where it is installed. Further out, cable impedance reduces the available fault current.',
  },
  {
    id: 'thermographic-hot-joint',
    question:
      'A thermographic survey shows one outgoing MCCB terminal running significantly hotter than the identical terminals either side of it, on a balanced load. What is the most likely cause?',
    options: [
      'The load on that circuit has doubled since commissioning',
      'A loose or high-resistance termination on that pole',
      'The MCCB thermal setting has drifted upwards',
      'Ambient temperature inside the panel is too high',
    ],
    correctIndex: 1,
    explanation:
      'A single hot pole on an otherwise balanced load points to a localised resistance, almost always a loose or degraded termination. Heat is generated in proportion to current squared times resistance, so a poor joint runs hot long before it fails. A genuine overload or high ambient would raise all three poles together. Regulation 526.1 requires connections to be correctly located, tight and secure.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which two protective mechanisms are combined inside a standard MCB?',
    options: [
      'Thermal (bimetallic) and magnetic (solenoid)',
      'Residual current and earth leakage',
      'Electronic and pneumatic',
      'Fusible link and thermal',
    ],
    correctAnswer: 0,
    explanation:
      'An MCB combines a bimetallic thermal element for sustained overloads with a magnetic solenoid for short circuits. The two act on the same trip latch, so either condition opens the contacts.',
  },
  {
    id: 2,
    question: 'What is the magnetic trip range of a Type B circuit-breaker?',
    options: [
      '10-20 times rated current',
      '2-3 times rated current',
      '3-5 times rated current',
      '5-10 times rated current',
    ],
    correctAnswer: 2,
    explanation:
      'A Type B device trips magnetically between 3 and 5 times its rated current. It is the most sensitive of the common characteristics and is the usual choice for resistive and lighting loads with little or no inrush.',
  },
  {
    id: 3,
    question: 'Which trip characteristic is normally selected for a circuit with high inrush, such as a transformer or a bank of switch-start luminaires?',
    options: [
      'Type B',
      'Type C',
      'A fuse of the same rating',
      'Any type, as inrush does not affect magnetic tripping',
    ],
    correctAnswer: 1,
    explanation:
      'Type C trips magnetically between 5 and 10 times rated current, which rides through typical inductive inrush while still giving fast short-circuit clearance. Type D (10-20 times) is reserved for very high inrush such as welding sets and large transformers.',
  },
  {
    id: 4,
    question: 'Which British Standard covers miniature circuit-breakers for household and similar installations?',
    options: [
      'BS EN 60947-2',
      'BS EN 61008',
      'BS EN 60898',
      'BS 88',
    ],
    correctAnswer: 2,
    explanation:
      'MCBs are manufactured to BS EN 60898. Moulded case circuit-breakers and other industrial switchgear are covered by BS EN 60947-2. BS 7671 Appendix 3 publishes time/current characteristics for Type B, C and D devices to BS EN 60898.',
  },
  {
    id: 5,
    question: 'What does the breaking capacity of a protective device represent?',
    options: [
      'The maximum fault current the device can safely interrupt',
      'The maximum continuous load current the device can carry',
      'The current at which the thermal element begins to operate',
      'The mechanical life of the device in operations',
    ],
    correctAnswer: 0,
    explanation:
      'Breaking capacity is the highest fault current the device can interrupt without failing. Regulation 434.5.1 requires it to equal or exceed the maximum prospective fault current at the point where the device is installed.',
  },
  {
    id: 6,
    question: 'Under BS 7671, how must prospective fault current be established at a relevant point of an installation?',
    options: [
      'By assuming the DNO declared figure applies everywhere',
      'By calculation, measurement or enquiry',
      'By reading the rating plate of the largest connected load',
      'By doubling the design current of the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 434.1 requires prospective fault current to be determined at every relevant point by calculation, measurement or enquiry. That value then drives the breaking capacity required of the device selected at that point.',
  },
  {
    id: 7,
    question: 'What is the principal advantage of an MCCB over an MCB in a distribution board serving heavy plant?',
    options: [
      'It cannot be operated manually, improving safety',
      'It requires no periodic maintenance of any kind',
      'It is always cheaper for the same rated current',
      'It offers higher current ratings, higher breaking capacity and adjustable settings',
    ],
    correctAnswer: 3,
    explanation:
      'MCCBs are built for higher currents and higher fault levels, and their thermal and magnetic settings are typically adjustable. That adjustability is what allows a designer to grade an MCCB against devices upstream and downstream of it.',
  },
  {
    id: 8,
    question: 'In an electronic trip unit, what do the letters L, S and I refer to?',
    options: [
      'Long-time, short-time and instantaneous protection',
      'Line, supply and isolation terminals',
      'Load, service and inspection modes',
      'Leakage, surge and interlock functions',
    ],
    correctAnswer: 0,
    explanation:
      'L is the long-time (overload) element, S the short-time delayed element used for grading against downstream devices, and I the instantaneous element for high-level short circuits. Some units add G for earth fault, giving LSIG.',
  },
  {
    id: 9,
    question: 'What is meant by selectivity (discrimination) between protective devices?',
    options: [
      'Only the device nearest the fault operates, leaving the rest of the installation supplied',
      'All devices in the chain operate together for maximum safety',
      'The upstream device always operates before the downstream device',
      'Devices are selected from a single manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'Selectivity means the device immediately upstream of the fault clears it while devices further upstream stay closed, so disconnection is restricted to the smallest possible part of the installation. Regulation 536.4.202 requires coordination to take account of this.',
  },
  {
    id: 10,
    question: 'Under BS 7671, how may a designer verify that a required selectivity arrangement actually works?',
    options: [
      'By assuming selectivity because the ratings differ',
      'By one of the permitted methods, such as a manufacturer’s declaration',
      'By measuring the load current at each board',
      'By fitting devices of the same trip characteristic throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 536.4.1.2.1 lists permitted verification methods, including a manufacturer’s declaration covering the specific devices and configuration. Selectivity must not simply be assumed from a difference in rated current.',
  },
  {
    id: 11,
    question: 'During a planned shutdown you find heavy discolouration and pitting on the fixed contacts of a withdrawn MCCB. What is the correct response?',
    options: [
      'Reinstate the device; discolouration is cosmetic only',
      'File the contacts smooth and return the device to service',
      'Record the defect, quarantine the device and refer it for replacement or manufacturer overhaul',
      'Increase the thermal setting to compensate for the added resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Pitting and discolouration indicate arc erosion and a rising contact resistance. Filing contacts destroys the plating and makes matters worse. The device should be recorded as defective and replaced or overhauled by the manufacturer.',
  },
  {
    id: 12,
    question: 'You have opened and locked off an MCB before working on a final circuit. What must you do next?',
    options: [
      'Begin work; a locked-off breaker is proof of isolation',
      'Prove the circuit dead with an approved voltage indicator, having proved the indicator on a known source before and after',
      'Test with a multimeter set to continuity',
      'Ask a colleague to confirm the breaker is off',
    ],
    correctAnswer: 1,
    explanation:
      'Locking off secures the isolation, but it does not prove the conductors are dead. Prove dead at the point of work with an approved voltage indicator, and prove the indicator itself against a known source both before and after the test.',
  },
];

const faqs = [
  {
    question: 'Can I simply fit a larger MCB if a circuit keeps tripping?',
    answer:
      'No. The rated current of the protective device must not exceed the lowest current-carrying capacity of any conductor in the circuit (Regulation 433.1.1(b)). Increasing the device rating removes the cable’s overload protection and leaves it able to run continuously above its safe temperature. Repeated tripping is a symptom: investigate whether it is a genuine overload, an inrush problem best solved by changing the trip characteristic, or a developing fault.',
  },
  {
    question: 'What is the difference between rated current and breaking capacity?',
    answer:
      'Rated current is the current the device will carry continuously without tripping, and it is matched to the cable. Breaking capacity is the fault current the device can interrupt safely without being destroyed, and it is matched to the prospective fault current at that point in the installation. A 32 A device and a 6 A device on the same board may share a breaking capacity because they face the same fault level.',
  },
  {
    question: 'Do MCBs need to be operated periodically as part of a maintenance regime?',
    answer:
      'Many asset owners include exercising devices in their planned maintenance, on the basis that a mechanism left closed for years can stiffen and become slow to operate. It is not a BS 7671 requirement but a reliability-driven practice, and it must always follow the manufacturer’s instructions, which BS 7671 requires to be taken into account under Regulation 510.3. Exercising takes place under a planned shutdown, never on live critical load without authorisation.',
  },
  {
    question: 'Why is a thermographic survey carried out with the board energised and loaded?',
    answer:
      'A hot joint only reveals itself when current is flowing, because the heating is proportional to current squared times resistance. Surveying a dead board tells you nothing. The survey is a non-intrusive inspection carried out through purpose-made infrared windows or by a competent thermographer working to a documented risk assessment, and it identifies deteriorating terminations long before they fail.',
  },
  {
    question: 'How do MCCB adjustable settings affect grading with devices downstream?',
    answer:
      'The adjustable thermal (long-time) and magnetic (instantaneous or short-time) settings determine where the MCCB’s time/current curve sits. Raising the short-time delay allows a downstream device to clear a fault first, so only the affected circuit is lost. Settings are part of the design and are recorded: they must never be altered on site to stop nuisance tripping, because that can destroy a grading arrangement the designer verified.',
  },
];

const MOETModule3Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Low Voltage Switchgear (MCBs, MCCBs)
          </h1>
          <p className="text-white">
            Switchgear function, MCB construction and operation, B/C/D trip curves, MCCBs, breaking
            capacity and the maintenance regime
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>MCB:</strong> Thermal strip for overload, solenoid for short circuit
              </li>
              <li className="pl-1">
                <strong>Curves:</strong> B 3-5x, C 5-10x, D 10-20x rated current
              </li>
              <li className="pl-1">
                <strong>MCCB:</strong> Higher ratings, higher fault levels, adjustable settings
              </li>
              <li className="pl-1">
                <strong>Breaking capacity:</strong> Must match the prospective fault current present
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Electrical Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Condition:</strong> Thermographic surveys find hot joints before failure
              </li>
              <li className="pl-1">
                <strong>Mechanical:</strong> Exercise devices and check torque under shutdown
              </li>
              <li className="pl-1">
                <strong>Distress:</strong> Discolouration, pitting, odour and burn marks
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Maps to fault diagnosis and planned maintenance KSBs
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the scope and function of low voltage switchgear in a distribution system',
              'Explain the internal construction and dual operating mechanism of an MCB',
              'Select an appropriate B, C or D trip characteristic for a given load',
              'Describe MCCB construction and the purpose of adjustable trip settings',
              'Explain breaking capacity and why it is critical at the origin of an installation',
              'Outline selectivity between protective devices at an awareness level',
              'Carry out and interpret routine switchgear maintenance checks',
              'Apply safe isolation principles when working on or near LV switchgear',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: What LV Switchgear Covers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Low Voltage Switchgear Covers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Low voltage switchgear is the collective term for the devices that carry, switch and
              interrupt current in an installation operating up to 1000 V AC. As a maintenance
              technician you will spend more time in front of LV switchgear than any other class of
              equipment: it is where circuits begin, where faults are cleared, and where you go
              first when a machine stops.
            </p>
            <p>
              Switchgear performs four distinct jobs, and it is worth separating them in your mind
              because the same physical device often performs several at once. It provides
              protection against overcurrent, so that neither the cable nor the connected equipment
              is damaged by excessive current. It provides isolation, so that a circuit can be made
              safe to work on. It provides functional switching, so that equipment can be turned on
              and off in normal service. And in many cases it provides indication and control, so
              that the state of the system can be seen and managed.
            </p>
            <p>
              Overcurrent divides into two very different conditions, and understanding the
              difference is the key to everything that follows. An <strong>overload</strong> is a
              current above the rating of the circuit flowing in an otherwise healthy circuit
              &mdash; too many machines on one supply, a motor running against a jammed load, a
              heater bank switched on beyond the design intent. Overload currents are typically only
              a modest multiple of the rated current, and the damage they cause is thermal and
              cumulative. A <strong>short circuit</strong> is a fault between live conductors or
              between a live conductor and earth, where the only thing limiting the current is the
              impedance of the supply and the cable. Fault currents can reach thousands or tens of
              thousands of amperes, and the damage is instantaneous.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Common LV Switchgear on Site
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Typical Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB</td>
                      <td className="border border-white/10 px-3 py-2">
                        Overload and short-circuit protection of final circuits
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Distribution boards, consumer units
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB</td>
                      <td className="border border-white/10 px-3 py-2">
                        Protection of sub-mains and large loads; adjustable settings
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Main and sub-main switchboards, motor supplies
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCBO</td>
                      <td className="border border-white/10 px-3 py-2">
                        Overcurrent plus residual current protection in one pole width
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Final circuits requiring additional protection
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuse-switch / switch-fuse</td>
                      <td className="border border-white/10 px-3 py-2">
                        Fault protection with a switching function
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Sub-main distribution, older switchboards
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolator / switch-disconnector</td>
                      <td className="border border-white/10 px-3 py-2">
                        Isolation and switching; no overcurrent protection
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Local to plant, adjacent to machinery
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contactor</td>
                      <td className="border border-white/10 px-3 py-2">
                        Remote functional switching of load; not an isolator
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Motor control centres, control panels
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Notice the last two rows carefully. A contactor switches load but is not a means of
              isolation &mdash; it can close under fault of its control circuit, and its contacts do
              not provide the assured separation an isolator does. A switch-disconnector isolates
              but provides no overcurrent protection. Confusing these roles is a recurring cause of
              incidents, and it is a distinction the ST1426 standard expects you to make without
              hesitation.
            </p>
            <p>
              BS 7671 sets the framework within which all of these devices are selected. The
              protective device must be coordinated with the conductors it protects: its rated
              current must not be less than the design current of the circuit, must not exceed the
              lowest current-carrying capacity of any conductor in that circuit, and the current
              causing effective operation must not exceed 1.45 times that capacity (Regulation
              433.1.1). Those three conditions are the reason you cannot uprate a device in
              isolation from the cable feeding the load.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Protection, isolation and switching are three separate
              functions. Before you rely on any device, establish which of the three it is actually
              designed to provide.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: MCB Anatomy and Operation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            MCB Anatomy and Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The miniature circuit-breaker is manufactured to BS EN 60898 and is by far the most
              common protective device you will encounter. Its elegance lies in combining two
              completely different tripping mechanisms inside one moulded case, each tuned to a
              different kind of overcurrent, both acting on a single common trip latch.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Thermal Element &mdash; Overload Protection
              </h3>
              <p className="text-sm text-white mb-3">
                Current entering the breaker passes through a bimetallic strip: two metals with
                different coefficients of thermal expansion bonded together. As current flows, the
                strip heats. Because one metal expands faster than the other, the strip bends. Under
                normal load the deflection is small and stable. Under a sustained overload the strip
                bends far enough to release the trip latch and open the contacts.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Deliberately slow &mdash; heat takes time to build, so brief harmless surges are
                  ignored
                </li>
                <li className="pl-1">
                  Inverse characteristic &mdash; the greater the overload, the faster it operates
                </li>
                <li className="pl-1">
                  Temperature sensitive &mdash; a hot switchroom biases the strip and can bring
                  tripping forward
                </li>
                <li className="pl-1">
                  Self-resetting &mdash; the strip cools and straightens once the breaker has
                  tripped
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Magnetic Element &mdash; Short-Circuit Protection
              </h3>
              <p className="text-sm text-white mb-3">
                The same current also passes through a solenoid coil wound around a moveable plunger
                or armature. Under normal load and modest overload the magnetic field is far too
                weak to move it. Under short-circuit conditions the field becomes intense, the
                plunger is thrown against the trip latch, and the contacts are driven open in a
                fraction of a cycle.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Effectively instantaneous &mdash; operation is measured in milliseconds
                </li>
                <li className="pl-1">
                  Threshold is fixed by the trip characteristic &mdash; this is what B, C and D
                  define
                </li>
                <li className="pl-1">
                  Limits let-through energy, protecting cable insulation from thermal damage
                </li>
                <li className="pl-1">
                  Independent of ambient temperature, unlike the thermal element
                </li>
              </ul>
            </div>

            <p>
              When either mechanism releases the latch, a spring-loaded toggle drives the moving
              contact away from the fixed contact. Separating contacts under fault current draws an
              arc, and the arc must be extinguished quickly or it will weld the contacts and
              continue to conduct. The MCB handles this with an <strong>arc chute</strong>: a stack
              of steel splitter plates above the contacts. Arc runners guide the arc up into the
              stack, where it is split into many short series arcs, cooled, lengthened and rapidly
              driven above the voltage the supply can sustain. The arc extinguishes at the next
              current zero.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Inside an MCB &mdash; Component Functions
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bimetallic strip</td>
                      <td className="border border-white/10 px-3 py-2">
                        Detects sustained overload by thermal deflection
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solenoid and plunger</td>
                      <td className="border border-white/10 px-3 py-2">
                        Detects short circuit by magnetic force
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trip latch mechanism</td>
                      <td className="border border-white/10 px-3 py-2">
                        Common release point for both elements; gives trip-free operation
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fixed and moving contacts</td>
                      <td className="border border-white/10 px-3 py-2">
                        Carry load current; separate to interrupt the circuit
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc runners and arc chute</td>
                      <td className="border border-white/10 px-3 py-2">
                        Draw, split, cool and extinguish the arc on interruption
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Toggle and operating spring</td>
                      <td className="border border-white/10 px-3 py-2">
                        Manual open/close; stores energy for rapid contact separation
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Terminals</td>
                      <td className="border border-white/10 px-3 py-2">
                        Connection to busbar and outgoing conductor; torque critical
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Trip-Free Operation</p>
              <p className="text-sm text-white">
                An MCB is designed to be trip-free: if a fault is present, the device will trip even
                if the operator is holding the toggle in the closed position. You cannot force a
                breaker to hold in against a fault. If you find a device that appears to be held in
                by tape, a cable tie or any other means, treat it as a serious defect, report it,
                and do not simply remove the obstruction and walk away &mdash; something made
                somebody think that was necessary.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A tripped device is information. Before resetting anything,
              establish whether it tripped on overload or on short circuit, because those two point
              to completely different faults.
            </p>
          </div>
        </section>

        {/* Section 03: Trip Curves */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Trip Curves and Application Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The thermal characteristic of an MCB is broadly the same across the range. What
              distinguishes a Type B from a Type C or D is the threshold at which the magnetic
              element operates, expressed as a multiple of the device rated current. BS 7671
              Appendix 3 publishes the time/current characteristics for Type B, C and D
              circuit-breakers to BS EN 60898, together with the overcurrent characteristics of
              RCBOs to BS EN 61009-1, and the published values are based on the slowest operating
              times.
            </p>
            <p>
              The curve is plotted with current on the horizontal axis and operating time on the
              vertical, both logarithmic. It has two distinct regions. The upper-left sloping region
              is the thermal element: as current rises, operating time falls steeply. The
              lower-right vertical region is the magnetic element: once the threshold is crossed,
              operating time collapses to milliseconds and no longer depends much on how far the
              current exceeds the threshold. The point where the curve turns vertical is what
              changes between B, C and D.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Magnetic Trip Characteristics
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Magnetic Trip Range
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Typical Application
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Loop Impedance Effect
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type B</td>
                      <td className="border border-white/10 px-3 py-2">3-5 times rated current</td>
                      <td className="border border-white/10 px-3 py-2">
                        Resistive loads, lighting, socket-outlets, domestic and light commercial
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Most permissive &mdash; highest maximum Zs for a given rating
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type C</td>
                      <td className="border border-white/10 px-3 py-2">5-10 times rated current</td>
                      <td className="border border-white/10 px-3 py-2">
                        Small motors, transformers, fluorescent banks, moderate inrush
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Requires roughly half the Zs of a Type B of the same rating
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type D</td>
                      <td className="border border-white/10 px-3 py-2">10-20 times rated current</td>
                      <td className="border border-white/10 px-3 py-2">
                        Welding sets, X-ray plant, large transformers, very high inrush
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Most demanding &mdash; lowest permitted Zs, often needs larger CPC
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              The right-hand column is the part apprentices most often miss, and it matters greatly
              in maintenance work. Automatic disconnection depends on enough fault current flowing
              to operate the device within the required time. A Type D device needs far more current
              to trip magnetically than a Type B of the same rating, so the earth fault loop
              impedance must be correspondingly lower for the same disconnection time. BS 7671
              tabulates maximum Zs values for the common characteristics, and permits calculation of
              Zs in accordance with Regulation 411.4.4 as an alternative to using the tabulated
              value.
            </p>
            <p>
              That relationship has a practical consequence. If someone changes a Type B device for
              a Type C to stop nuisance tripping without checking the loop impedance, the circuit
              may no longer disconnect in time under earth fault conditions. The nuisance trip goes
              away and a latent safety defect takes its place. Any change of trip characteristic is
              a design decision and must be followed by verification of Zs at the furthest point of
              the circuit.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Choosing a Characteristic in Practice
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Start with the load:</strong> does it draw a large transient current at
                  switch-on, and for how long?
                </li>
                <li className="pl-1">
                  <strong>Use the lowest characteristic that holds:</strong> Type B gives the
                  fastest fault clearance and the easiest Zs compliance
                </li>
                <li className="pl-1">
                  <strong>Step up only when justified:</strong> move to Type C for inductive inrush,
                  and to Type D only for genuinely severe inrush
                </li>
                <li className="pl-1">
                  <strong>Verify the loop impedance:</strong> the higher the characteristic, the
                  lower the permitted Zs
                </li>
                <li className="pl-1">
                  <strong>Record the change:</strong> a like-for-like replacement is maintenance; a
                  change of type is an alteration
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Changing the trip characteristic changes the fault current
              needed to trip the device. It is never a free fix for nuisance tripping.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: MCCBs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Moulded Case Circuit-Breakers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The moulded case circuit-breaker, manufactured to BS EN 60947-2, takes over where the
              MCB runs out of capability. MCCBs cover higher rated currents, withstand and interrupt
              far higher fault currents, and &mdash; the characteristic that defines them for a
              maintenance technician &mdash; carry adjustable trip settings. Where an MCB is a
              fixed, sealed, replace-on-failure item, an MCCB is a configurable asset with a
              documented set of settings.
            </p>
            <p>
              Construction follows the same principles as an MCB but on a larger scale, housed in a
              rigid moulded insulating case. Contacts are heavier and often silver-alloy faced; arc
              chutes are substantially larger; and larger frames are typically three- or four-pole
              with a common trip bar so that a fault on any pole opens all poles together. Larger
              MCCBs may be withdrawable on a cassette, allowing the breaker to be racked out for
              inspection while the busbars remain in place &mdash; a significant maintenance
              advantage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Thermal-Magnetic Trip Units
              </h3>
              <p className="text-sm text-white mb-3">
                The traditional MCCB uses the same bimetallic and solenoid arrangement as an MCB,
                but with adjustment dials brought out to the front face:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Thermal (Ir) adjustment:</strong> sets the overload pick-up as a fraction
                  of the frame rating, commonly across a range such as 0.7 to 1.0
                </li>
                <li className="pl-1">
                  <strong>Magnetic (Im) adjustment:</strong> sets the instantaneous short-circuit
                  threshold, typically as a multiple of the set thermal current
                </li>
                <li className="pl-1">
                  <strong>Frame size:</strong> the physical body rating, which fixes the maximum
                  current and the breaking capacity available
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Electronic Trip Units &mdash; LSI at Awareness Level
              </h3>
              <p className="text-sm text-white mb-3">
                Larger and more modern MCCBs use an electronic trip unit fed by current transformers
                inside the breaker. These offer finer, more repeatable adjustment and a set of
                distinct protection functions usually labelled L, S and I:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>L &mdash; Long-time:</strong> the overload function, with an adjustable
                  pick-up current and an adjustable time delay
                </li>
                <li className="pl-1">
                  <strong>S &mdash; Short-time:</strong> a deliberately delayed response to
                  moderate fault currents, so that a downstream device is given time to clear the
                  fault first
                </li>
                <li className="pl-1">
                  <strong>I &mdash; Instantaneous:</strong> immediate tripping above a set threshold
                  for severe faults, where no delay can be tolerated
                </li>
                <li className="pl-1">
                  <strong>G &mdash; Ground fault (where fitted):</strong> a separate earth fault
                  element, giving the LSIG designation
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                You are expected to recognise these functions and understand what they do. Altering
                them is a design activity: the S element in particular exists to make selectivity
                work, and changing it on site can collapse a grading scheme the designer verified.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB and MCCB Compared</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MCB</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MCCB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Product standard</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 60898</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 60947-2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trip settings</td>
                      <td className="border border-white/10 px-3 py-2">Fixed at manufacture</td>
                      <td className="border border-white/10 px-3 py-2">
                        Adjustable thermal and magnetic, or electronic LSI
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical application</td>
                      <td className="border border-white/10 px-3 py-2">Final circuits</td>
                      <td className="border border-white/10 px-3 py-2">
                        Sub-mains, distribution boards, large plant
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mounting</td>
                      <td className="border border-white/10 px-3 py-2">DIN rail, plug-on busbar</td>
                      <td className="border border-white/10 px-3 py-2">
                        Fixed, plug-in or withdrawable cassette
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintainability</td>
                      <td className="border border-white/10 px-3 py-2">Replace on failure</td>
                      <td className="border border-white/10 px-3 py-2">
                        Inspectable; larger frames may be overhauled by the manufacturer
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Role in selectivity</td>
                      <td className="border border-white/10 px-3 py-2">
                        Downstream device in most arrangements
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Upstream device; settings used to achieve grading
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> MCCB settings are part of the electrical design. Record the
              as-found settings before any work, and never change them to cure nuisance tripping
              without a design decision behind it.
            </p>
          </div>
        </section>

        {/* Section 05: Breaking Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Breaking Capacity and Prospective Fault Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rated current tells you what a device will carry. Breaking capacity tells you what it
              can safely interrupt. They are entirely separate properties, and confusing them is
              dangerous, because a device asked to break more than it can handle does not simply
              fail to trip &mdash; it can rupture, sustain an arc and cause exactly the fire or
              explosion the protection was installed to prevent.
            </p>
            <p>
              BS 7671 requires prospective fault current to be determined at every relevant point of
              an installation by calculation, measurement or enquiry (Regulation 434.1). Regulation
              434.5.1 then requires that a device providing protection against both overload and
              fault current shall be capable of breaking &mdash; and, for a circuit-breaker, making
              &mdash; any overcurrent up to and including the maximum prospective fault current at
              the point where the device is installed. Regulation 432.3 places the equivalent
              requirement on a device providing fault current protection only, except as permitted
              by 434.5.1.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Why the Origin Is the Worst Case
              </p>
              <p className="text-sm text-white">
                Fault current is limited by the impedance of the path between the fault and the
                source of supply. At the origin of the installation, that path is short &mdash;
                essentially the supply transformer and the service cable &mdash; so the impedance is
                low and the available fault current is at its maximum. Every metre of cable
                downstream adds impedance and reduces the current available at the next point. This
                is why a main switchboard device may need a breaking capacity of many tens of
                kiloamperes, while a device at the end of a long sub-circuit faces far less. The
                figure at the origin is the one that dictates the specification of the main
                protective device.
              </p>
            </div>

            <p>
              Selection is also governed by the general equipment selection requirements: equipment
              must be chosen so that its rated short-time withstand current, breaking capacity and
              operating characteristics suit the prospective short-circuit currents and fault
              conditions of the installation (Regulation 536.4.1.3). Where a device standard
              specifies both a rated service short-circuit breaking capacity and a rated ultimate
              short-circuit breaking capacity, BS 7671 permits selection on the basis of the
              ultimate breaking capacity for maximum fault current conditions. In practice, the
              distinction between the two is worth understanding: after breaking at its ultimate
              capacity, a device may not be fit to return to service, whereas at its service
              capacity it is expected to remain serviceable.
            </p>
            <p>
              Where the breaking capacity of a device is lower than the maximum prospective fault
              current at its point of installation, BS 7671 does not simply prohibit the
              arrangement; it directs the designer to the requirements of the last paragraph of
              Regulation 536.1 and Regulation 536.5. This is the basis of what is often called
              back-up protection or cascading, where an upstream device with adequate capacity
              limits the energy reaching the downstream device. Cascading only works with
              combinations the manufacturer has tested and declared &mdash; it is never something to
              assume on site.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                What Happens When Breaking Capacity Is Exceeded
              </p>
              <p className="text-sm text-white">
                If a device is asked to interrupt more than it is rated to break, the arc drawn
                across the opening contacts may not be extinguished. The contacts can weld closed,
                the case can rupture, and the arc can propagate to adjacent phases and to the
                enclosure. The resulting arc flash releases enormous energy as heat, light and
                pressure. This is not a theoretical risk: it is the reason breaking capacity is
                specified against the fault level of the actual site rather than the size of the
                load. If a board has been extended or the supply has been upgraded, the fault level
                may have risen since the original devices were selected.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance relevance:</strong> If you are told a transformer has been
              uprated, an extra supply has been connected, or generation has been added, flag it. A
              change on the supply side can invalidate the breaking capacity of devices that were
              perfectly adequate the day they were installed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Selectivity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Selectivity and Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selectivity &mdash; still widely called discrimination on site &mdash; is the
              coordination of protective devices so that a fault is cleared by the device
              immediately upstream of it, while devices further upstream remain closed. Under BS
              7671, coordination is required to take account of the sequence of operation and the
              discrimination between upstream and downstream overload protective devices, so that
              disconnection is restricted to the smallest possible part of the installation
              (Regulation 536.4.202).
            </p>
            <p>
              The maintenance consequence is immediate and practical. In a well-graded installation,
              a faulty machine takes out its own final circuit breaker and nothing else: you arrive,
              the board tells you which circuit failed, and the rest of the site keeps running. In a
              poorly graded installation, the same fault takes out the incoming device, the whole
              building goes dark, and you have a production stoppage plus a diagnostic exercise with
              no useful indication of where the fault actually is.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                How Selectivity Is Achieved
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Current grading:</strong> the upstream device has a substantially higher
                  rating, so a downstream fault is within the downstream device&rsquo;s range but
                  below the upstream device&rsquo;s pick-up
                </li>
                <li className="pl-1">
                  <strong>Time grading:</strong> the upstream device is given an intentional short
                  delay (the S element on an electronic trip unit), letting the downstream device
                  clear first
                </li>
                <li className="pl-1">
                  <strong>Energy grading:</strong> a current-limiting downstream device clears the
                  fault so fast that the energy passed is below the upstream device&rsquo;s
                  operating threshold
                </li>
                <li className="pl-1">
                  <strong>Zone interlocking:</strong> on larger installations, devices communicate
                  so that the device nearest the fault trips without waiting out a time delay
                </li>
              </ul>
            </div>

            <p>
              Selectivity must not be assumed simply because ratings differ. BS 7671 requires that
              where selectivity is required, the design is verified by one of the permitted methods
              listed in Regulation 536.4.1.2.1. One of those methods is a manufacturer&rsquo;s
              declaration, provided it specifically addresses the devices and configuration in
              question. Where software tools are used for verification, the manufacturer must
              provide information for that specific use &mdash; generic software modelling without
              manufacturer data is not a permitted route. BS 7671 also includes Figure 536.1
              illustrating selectivity between overcurrent protective devices.
            </p>
            <p>
              Note the important limitation for short-circuit conditions. Two circuit-breakers in
              series both facing a high fault current may both see enough current to trip
              magnetically at essentially the same instant, so simple current grading breaks down at
              high fault levels. This is precisely why upstream MCCBs offer a short-time delayed
              element. It is also why selectivity tables from the manufacturer are stated with an
              upper fault current limit &mdash; beyond that limit, the pair is no longer selective.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Awareness Level: What You Are Expected to Do
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Recognise when a fault has caused an upstream device to trip in place of, or as
                  well as, the downstream device
                </li>
                <li className="pl-1">
                  Report loss of selectivity as a defect &mdash; it is a design issue, not something
                  to fix by adjusting settings
                </li>
                <li className="pl-1">
                  Record MCCB settings as found before any work, and restore them exactly
                </li>
                <li className="pl-1">
                  Understand that a like-for-like replacement preserves grading, whereas a different
                  make or model may not
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If a downstream fault trips an upstream device, do not
              treat it as a curiosity. It tells you the grading is not working, and the next fault
              will cost the site the same outage again.
            </p>
          </div>
        </section>

        {/* Section 07: Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Switchgear Maintenance in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Switchgear spends almost all its life doing nothing, then is asked to perform
              flawlessly in the few milliseconds that matter. That is exactly why it is maintained.
              A breaker that has sat closed for fifteen years in a warm, dusty switchroom may have a
              stiffened mechanism, oxidised contacts and terminations that have relaxed through
              thermal cycling. None of that is visible while the board is closed and running.
            </p>
            <p>
              BS 7671 requires that manufacturers&rsquo; instructions are taken into account in
              selection and erection (Regulation 510.3), and those instructions &mdash; covering
              mounting, ventilation, torque settings and environmental limits &mdash; are the
              starting point for any maintenance regime. Retain them with the site records.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Visual Inspection (Live, Non-Intrusive)
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Enclosure integrity: doors secure, blanks fitted, no missing gland plates or
                  unfilled knockouts
                </li>
                <li className="pl-1">
                  Circuit identification: charts present, legible and matching the installed devices
                </li>
                <li className="pl-1">
                  Signs of overheating visible through ventilation: discoloured plastic, blistering,
                  scorch marks
                </li>
                <li className="pl-1">
                  Odour: a sharp, hot-plastic or fishy smell is a strong indicator of an overheating
                  termination
                </li>
                <li className="pl-1">
                  Sound: buzzing or crackling from a board is never normal
                </li>
                <li className="pl-1">
                  Environment: water ingress, dust build-up, rodent evidence, items stored against
                  the board
                </li>
                <li className="pl-1">
                  Devices held in, tied, taped or with settings clearly disturbed
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Thermographic Surveys</h3>
              <p className="text-sm text-white mb-3">
                Infrared thermography is the single most valuable predictive technique for LV
                switchgear. Because heating at a joint rises with the square of the current and in
                proportion to the joint resistance, a deteriorating termination becomes visibly
                hotter long before it fails. Surveys are carried out with the board energised and
                under representative load, since an unloaded board reveals nothing.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Compare like with like: the same terminal on adjacent poles or identical adjacent
                  circuits
                </li>
                <li className="pl-1">
                  A single hot pole on a balanced load points to a joint, not to a load problem
                </li>
                <li className="pl-1">
                  All three poles hot together suggests genuine loading, harmonics or high ambient
                </li>
                <li className="pl-1">
                  Record the load at the time of survey &mdash; a temperature rise means nothing
                  without it
                </li>
                <li className="pl-1">
                  Use fitted infrared windows where available; opening a live panel requires
                  justification, competence and a documented risk assessment
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Exercise, Torque and Intrusive Checks (Dead, Under Shutdown)
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Exercise the mechanism:</strong> operate the device open and closed
                  several times to free a stiffened mechanism and wipe the contacts
                </li>
                <li className="pl-1">
                  <strong>Trip test where provided:</strong> use the manufacturer&rsquo;s test
                  facility rather than improvising
                </li>
                <li className="pl-1">
                  <strong>Torque check terminations:</strong> to the manufacturer&rsquo;s stated
                  values with a calibrated torque screwdriver. Regulation 526.1 requires all
                  conductor connections, including connections to busbars, to be correctly located,
                  tight and secure
                </li>
                <li className="pl-1">
                  <strong>Inspect contacts where accessible:</strong> on withdrawable MCCBs, examine
                  the fixed and moving contacts for erosion
                </li>
                <li className="pl-1">
                  <strong>Clean:</strong> remove dust and debris by approved methods; keep
                  contaminants away from arc chutes and insulation
                </li>
                <li className="pl-1">
                  <strong>Verify settings:</strong> confirm MCCB dials or trip unit parameters match
                  the recorded design values
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Signs of Distress</p>
              <p className="text-sm text-white">
                Learn to read the physical evidence. <strong>Discolouration</strong> of a terminal,
                a conductor or the surrounding moulding indicates sustained heating. Blackening or a
                bronze bloom on copper is oxidation from repeated hot running.{' '}
                <strong>Pitting</strong> or cratering on contact faces is arc erosion, which raises
                contact resistance and accelerates the next failure. <strong>Melted or brittle
                insulation</strong> near a termination shows the joint has been running far above
                its design temperature. <strong>Carbon tracking</strong> &mdash; fine dark lines
                across an insulating surface &mdash; is a developing flashover path.{' '}
                <strong>Corrosion or green deposits</strong> indicate moisture ingress. None of these
                are cosmetic: each is an active fault process, and each should be recorded and acted
                on rather than wiped away.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never file, sand or dress a pitted contact face. The
              plating is what gives the contact its low resistance, and removing it guarantees the
              joint will run hotter than before.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 08: Safe Isolation and Site Scenarios */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Safe Isolation and Site Scenarios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Everything in this section is worked on dead unless there is a specific, justified and
              documented reason otherwise. Under the Electricity at Work Regulations 1989, live
              working is only permissible where it is unreasonable in all the circumstances to work
              dead, where it is reasonable to be at work on or near the conductor, and where
              suitable precautions are taken. For routine switchgear maintenance, none of those
              tests is normally satisfied.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Safe Isolation Applied to LV Switchgear
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Identify:</strong> confirm the correct circuit and the correct device
                  &mdash; charts can be wrong, so verify by proving the load is lost
                </li>
                <li className="pl-1">
                  <strong>Isolate:</strong> open the correct isolating device. A device for
                  switching off for mechanical maintenance must require manual operation, and its
                  open position must be visible or clearly and reliably indicated
                </li>
                <li className="pl-1">
                  <strong>Secure:</strong> lock off with a unique key or a personal lock and retain
                  the key; apply caution notices
                </li>
                <li className="pl-1">
                  <strong>Prove dead:</strong> use an approved voltage indicator to GS38, testing
                  all combinations of conductors at the point of work
                </li>
                <li className="pl-1">
                  <strong>Prove the tester:</strong> on a known live source or proving unit,
                  immediately before and immediately after the dead test
                </li>
                <li className="pl-1">
                  <strong>Consider other sources:</strong> UPS supplies, standby generation, PV
                  inverters, capacitor banks and control supplies fed from another board
                </li>
              </ul>
            </div>

            <p>
              That last point deserves emphasis in a maintenance context. A single distribution board
              is often not fed from a single source. Control circuits within a panel are frequently
              supplied from elsewhere, so opening the main incomer leaves control terminals live.
              Standby generation and inverters can back-feed. Always establish the full set of
              supplies before you decide the board is dead.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Scenario 1: The Repeat Tripper
              </h3>
              <p className="text-sm text-white">
                A 32 A Type B MCB serving a workshop socket circuit trips two or three times a week,
                always in the afternoon, and always resets first time. There is no bang and no smell.
                The pattern &mdash; resettable, time-of-day dependent, no evidence of a fault &mdash;
                points to thermal operation from genuine overloading rather than a short circuit.
                The correct response is to measure the load over a working day with a clamp meter or
                logger and establish what is actually being connected. The wrong response is to fit a
                40 A device, because the cable&rsquo;s current-carrying capacity has not changed and
                Regulation 433.1.1(b) does not permit the device rating to exceed it.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Scenario 2: The Bang and the Blackout
              </h3>
              <p className="text-sm text-white">
                A conveyor motor fails with a loud report, and both the local MCCB and the incoming
                device to the whole board have operated. Two separate issues are present. The first
                is the motor fault itself, which needs insulation resistance testing on the motor and
                its supply cable before anything is re-energised. The second is that the fault should
                have been contained by the local device: the incomer operating as well tells you the
                grading has failed. Report both. Resetting the incomer and returning the site to
                service without recording the selectivity failure leaves the same outage waiting to
                happen again.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Scenario 3: The Warm Panel
              </h3>
              <p className="text-sm text-white">
                An operator reports that a panel door feels warm and there is a faint hot smell. Do
                not open the door and start probing. Arrange a thermographic survey through the
                fitted infrared window under normal load, or if no window exists, plan a shutdown.
                The survey shows one outgoing MCCB terminal 30 degrees above its neighbours on a
                balanced three-phase load: a classic loose or degraded termination. The remedy is a
                planned shutdown, inspection of the terminal and the conductor, replacement of any
                damaged conductor, and re-termination to the manufacturer&rsquo;s torque value.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Scenario 4: The Non-Standard Replacement
              </h3>
              <p className="text-sm text-white">
                You arrive to find a failed MCB has been replaced with a device of a different make
                that physically fits the DIN rail but is not the manufacturer&rsquo;s listed
                component for that board. Two problems follow. The assembly may no longer comply with
                the type-tested arrangement the board was certified to, and any selectivity or
                cascading declaration for that board no longer applies, because those declarations
                are specific to the device combinations tested. Record it as a defect and arrange a
                correct replacement.
              </p>
            </div>

            <p className="text-sm text-white italic">
              <strong>Note:</strong> Under the Electricity at Work Regulations 1989, no person shall
              be engaged in work activity on or near a live conductor unless it is unreasonable to
              work dead, it is reasonable for them to be at work on or near it, and suitable
              precautions are taken to prevent injury. For LV switchgear maintenance, the default is
              always to work dead under a proved and secured isolation.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Trip Characteristics</p>
                <ul className="space-y-0.5">
                  <li>Type B — 3-5x In — resistive, lighting, sockets</li>
                  <li>Type C — 5-10x In — motors, transformers, inrush</li>
                  <li>Type D — 10-20x In — welding, X-ray, high inrush</li>
                  <li>Higher type = lower permitted Zs</li>
                  <li>Thermal = overload; magnetic = short circuit</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671:2018+A4:2026 — 433.1.1 device/conductor coordination</li>
                  <li>434.1 — determine prospective fault current</li>
                  <li>434.5.1 — breaking capacity at point of installation</li>
                  <li>536.4.1.2.1 / 536.4.202 — selectivity and coordination</li>
                  <li>526.1 — connections tight and secure</li>
                  <li>BS EN 60898 (MCB) / BS EN 60947-2 (MCCB)</li>
                  <li>EAWR 1989 — safe isolation; ST1426 KSBs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-2">
              Next: HV/LV Switchgear Types
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section1_1;
