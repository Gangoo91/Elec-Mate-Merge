import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Voltage, Current, Resistance and Power - MOET Module 2 Section 1.1';
const DESCRIPTION =
  'The four fundamental electrical quantities for maintenance technicians: voltage, current, resistance and power — definitions, units, symbols, how they relate (V=IR, P=VI), how to measure each safely on site, and the typical readings an ST1426 apprentice will meet in practice.';

const quickCheckQuestions = [
  {
    id: 'unit-of-current',
    question: 'Which of the following correctly pairs the quantity, its symbol and its unit?',
    options: [
      'Current — symbol V — measured in watts',
      'Current — symbol I — measured in amperes',
      'Voltage — symbol R — measured in ohms',
      'Resistance — symbol P — measured in volts',
    ],
    correctIndex: 1,
    explanation:
      'Current has the symbol I (from the French "intensité") and is measured in amperes (A). Voltage has the symbol V and is measured in volts (V); resistance has the symbol R and is measured in ohms; power has the symbol P and is measured in watts (W). Learning these pairings until they are automatic is essential — every formula and every test instrument uses them.',
  },
  {
    id: 'current-from-power',
    question:
      'A 2.3 kW load is connected to a 230 V single-phase supply. What current does it draw?',
    options: [
      '100 A',
      '2.3 A',
      '10 A',
      '23 A',
    ],
    correctIndex: 2,
    explanation:
      'Rearranging P = V x I gives I = P / V = 2300 / 230 = 10 A. Converting the connected load in watts to current in amperes is one of the most common calculations in maintenance — it tells you whether the circuit and its protective device can handle the load.',
  },
  {
    id: 'i-squared-r',
    question:
      'A cable carries 10 A and has a total conductor resistance of 0.2 ohms. Using P = I squared x R, how much power is lost as heat in the cable?',
    options: [
      '2 W',
      '20 W',
      '200 W',
      '4 W',
    ],
    correctIndex: 1,
    explanation:
      'P = I squared x R = 10 squared x 0.2 = 100 x 0.2 = 20 W. This 20 W is dissipated as heat along the cable. Because the loss depends on the square of the current, doubling the current to 20 A would quadruple the loss to 80 W — which is why overloaded cables run hot.',
  },
  {
    id: 'kwh-energy',
    question: 'A 2 kW heater runs continuously for 3 hours. How much energy does it use?',
    options: [
      '2 kWh',
      '5 kWh',
      '6 kWh',
      '0.67 kWh',
    ],
    correctIndex: 2,
    explanation:
      'Energy = power x time = 2 kW x 3 h = 6 kWh. Power (kW) is the rate at which energy is used at any instant; energy (kWh) is the total amount used over time. Electricity meters record kWh — this is what the customer pays for.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the unit of electrical resistance?',
    options: [
      'The volt',
      'The ampere',
      'The watt',
      'The ohm',
    ],
    correctAnswer: 3,
    explanation:
      'Resistance is measured in ohms, named after Georg Simon Ohm. One ohm is the resistance that allows a current of one ampere to flow when one volt is applied across it. The quantity symbol is R and the unit symbol is the Greek letter omega.',
  },
  {
    id: 2,
    question:
      'A current of 5 A flows through a resistance of 9.2 ohms. What is the voltage across it?',
    options: [
      '46 V',
      '1.84 V',
      '0.54 V',
      '4.6 V',
    ],
    correctAnswer: 0,
    explanation:
      'Using V = I x R = 5 x 9.2 = 46 V. This is a direct application of Ohm’s Law — if you know the current through a component and its resistance, you can calculate the voltage dropped across it.',
  },
  {
    id: 3,
    question: 'What current flows when a 230 V supply is connected across a 115 ohm load?',
    options: [
      '0.5 A',
      '2 A',
      '26,450 A',
      '20 A',
    ],
    correctAnswer: 1,
    explanation:
      'Using I = V / R = 230 / 115 = 2 A. Rearranging Ohm’s Law to find current is the everyday form of the equation for a technician — you usually know the supply voltage and can measure or look up the resistance.',
  },
  {
    id: 4,
    question: 'A load draws 4 A from a 230 V supply. What power does it consume?',
    options: [
      '57.5 W',
      '234 W',
      '920 W',
      '9.2 kW',
    ],
    correctAnswer: 2,
    explanation:
      'Using P = V x I = 230 x 4 = 920 W. This is the fundamental power equation. A clamp meter reading of 4 A on a 230 V circuit tells you the load is drawing roughly 920 W (for a resistive load — for motors the power factor must also be considered).',
  },
  {
    id: 5,
    question:
      'A heating element has a resistance of 52.9 ohms. What power does it produce on a 230 V supply?',
    options: [
      '1000 W',
      '4.35 W',
      '12,167 W',
      '230 W',
    ],
    correctAnswer: 0,
    explanation:
      'Using P = V squared / R = 230 squared / 52.9 = 52,900 / 52.9 = 1000 W (1 kW). This form of the power equation is ideal when you know the supply voltage and have measured the element resistance with the circuit isolated.',
  },
  {
    id: 6,
    question: 'A 1.5 kW pump motor runs for 8 hours. How much energy does it consume?',
    options: [
      '9.5 kWh',
      '12 kWh',
      '1.5 kWh',
      '0.19 kWh',
    ],
    correctAnswer: 1,
    explanation:
      'Energy = power x time = 1.5 kW x 8 h = 12 kWh. Note the distinction: the motor’s power is 1.5 kW (a rate), while the energy used is 12 kWh (an amount). Energy in kWh is what appears on the electricity bill.',
  },
  {
    id: 7,
    question: 'How should a clamp meter be used to measure the current in a circuit?',
    options: [
      'Clamped around the complete cable containing line and neutral together',
      'Connected in parallel across the load terminals',
      'Clamped around a single conductor only',
      'Connected in series after cutting the conductor',
    ],
    correctAnswer: 2,
    explanation:
      'A clamp meter must be placed around a single conductor. If you clamp around a complete cable containing both line and neutral, the magnetic fields of the outgoing and returning currents cancel and the meter reads (close to) zero. The great advantage of the clamp meter is that it measures current without breaking into the circuit.',
  },
  {
    id: 8,
    question: 'How is a voltmeter connected to measure the voltage across a component?',
    options: [
      'In series with the component, so the circuit current flows through the meter',
      'In parallel, across the two terminals of the component',
      'Between the line conductor and the meter’s internal battery',
      'Clamped around the conductor feeding the component',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage is a difference in potential between two points, so a voltmeter is always connected in parallel — across the two points being compared. The voltmeter has a very high internal resistance so it draws negligible current and does not disturb the circuit. An ammeter, by contrast, is connected in series and has a very low resistance.',
  },
  {
    id: 9,
    question:
      'At the distribution board a circuit measures 230 V, but at the far end of a long cable run the equipment terminals measure only 218 V under load. What is the most likely explanation?',
    options: [
      'The supply transformer is faulty and must be replaced',
      'Voltage drop along the cable due to its resistance and the load current',
      'The voltmeter is reading incorrectly at the far end only',
      'The equipment is generating its own opposing voltage',
    ],
    correctAnswer: 1,
    explanation:
      'The 12 V difference (about 5.2% of 230 V) is voltage drop: the load current flowing through the resistance of the cable conductors drops voltage along the run (V = I x R). Long runs, undersized conductors and heavy loads all make it worse. BS 7671 limits voltage drop in an installation — Appendix 4 gives the maximum values for lighting and other circuits (Regulation 525.202).',
  },
  {
    id: 10,
    question:
      'On a UK three-phase supply the line-to-line voltage is 400 V. What is the nominal line-to-neutral voltage?',
    options: [
      '400 V',
      '230 V',
      '200 V',
      '110 V',
    ],
    correctAnswer: 1,
    explanation:
      'The line-to-neutral voltage equals the line-to-line voltage divided by the square root of 3: 400 / 1.732 = approximately 231 V, which corresponds to the nominal 230 V single-phase value. This is why the UK nominal voltages are quoted together as 230/400 V — they are two measurements of the same three-phase system.',
  },
  {
    id: 11,
    question: 'What is the difference between a kilowatt (kW) and a kilowatt-hour (kWh)?',
    options: [
      'They are two names for the same quantity',
      'kW measures energy; kWh measures power',
      'kW measures power (the rate of using energy); kWh measures energy (the amount used)',
      'kW is used for DC circuits and kWh for AC circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Power (kW) is the rate at which energy is converted at an instant — like the speed of a car. Energy (kWh) is the total amount converted over time — like the distance travelled. A 3 kW load running for 2 hours uses 6 kWh. Meters bill in kWh; nameplates and circuit calculations use kW.',
  },
  {
    id: 12,
    question:
      'Two 10 ohm resistors are connected first in series, then in parallel. What are the two total resistances?',
    options: [
      'Series 20 ohms; parallel 5 ohms',
      'Series 5 ohms; parallel 20 ohms',
      'Series 10 ohms; parallel 10 ohms',
      'Series 100 ohms; parallel 1 ohm',
    ],
    correctAnswer: 0,
    explanation:
      'In series, resistances add: 10 + 10 = 20 ohms. In parallel, two equal resistors give half the value of one: 10 / 2 = 5 ohms. Series connections increase total resistance; parallel connections reduce it. Section 2.1.2 develops this fully with Ohm’s Law applied to complete circuits.',
  },
];

const faqs = [
  {
    question: 'Why is the UK supply called 230 V when I often measure something different?',
    answer:
      'The 230 V figure is the nominal voltage — the declared design value of the supply, with 400 V as the nominal three-phase line-to-line value. The actual voltage at any moment is allowed to vary within tolerances defined by the harmonised voltage standard (BS EN 60038), and it also changes with network loading and your distance from the transformer. Measuring 235 V or 242 V at a socket is entirely normal. What matters in maintenance is whether the voltage at the equipment stays within the range the equipment is designed for — and whether excessive voltage drop within the installation is pulling it below that range under load.',
  },
  {
    question: 'What is the difference between conventional current and electron flow?',
    answer:
      'Conventional current is defined as flowing from positive to negative — a convention fixed before the electron was discovered. In a metal conductor the charge carriers are actually electrons, which drift from negative to positive. All circuit diagrams, formulae and instrument markings use conventional current, so that is what you work with in practice. The physics underneath does not change any calculation.',
  },
  {
    question: 'Why do multimeters have separate settings and leads for current measurement?',
    answer:
      'To measure current, an ammeter must be placed in series so the circuit current flows through it, and its internal resistance must be very low so it does not affect the circuit. That low resistance is exactly why connecting a meter set to amps across a supply (in parallel, like a voltmeter) creates a near short circuit — a common and dangerous mistake that blows the meter fuse at best. In power circuit maintenance you rarely break into a circuit to measure current; a clamp meter around a single conductor does the job without disconnection.',
  },
  {
    question: 'What does GS38 have to do with my test leads?',
    answer:
      'GS38 is the HSE guidance note covering test equipment used on low voltage electrical systems. In practical terms it means your voltage indicator and leads should have finger barriers, minimal exposed probe tips, fused or current-limited leads, and adequate insulation ratings. Before and after proving dead you also verify the voltage indicator itself against a known source (a proving unit). Your training centre and employer will drill the full safe isolation procedure — the key point for this section is that voltage measurement on live equipment is only done with suitable equipment and only when it cannot be avoided.',
  },
  {
    question: 'Why does resistance matter so much if loads are specified in watts?',
    answer:
      'Because resistance is what you can measure with the circuit safely isolated. A 2 kW element should have a resistance of roughly V squared / P = 230 squared / 2000 = 26.5 ohms when measured cold. If your meter reads open circuit, the element has failed; if it reads a few ohms, there may be a partial short. Comparing a measured resistance against the value calculated from the nameplate power rating is one of the fastest dead-testing diagnostics a maintenance technician has.',
  },
];

const MOETModule2Section1_1 = () => {
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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
            <span>Module 2.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Voltage, Current, Resistance and Power
          </h1>
          <p className="text-white">
            The four quantities every electrical measurement, calculation and fault diagnosis is
            built on
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
                <strong>Voltage (V, volts):</strong> the electrical pressure that drives current
              </li>
              <li className="pl-1">
                <strong>Current (I, amperes):</strong> the rate of flow of electric charge
              </li>
              <li className="pl-1">
                <strong>Resistance (R, ohms):</strong> opposition to current flow
              </li>
              <li className="pl-1">
                <strong>Power (P, watts):</strong> the rate of converting electrical energy — P = V
                x I
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>UK nominal supply:</strong> 230 V single-phase, 400 V three-phase
              </li>
              <li className="pl-1">
                <strong>Multimeter:</strong> voltage in parallel; resistance on dead circuits only
              </li>
              <li className="pl-1">
                <strong>Clamp meter:</strong> current around a single conductor, no disconnection
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> foundation knowledge for all electrical maintenance KSBs
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define voltage, current, resistance and power with their symbols and units',
              'State the UK nominal supply voltages and where each is used',
              'Relate the four quantities using V = IR, P = VI, P = I squared R and P = V squared / R',
              'Select and connect the right instrument to measure each quantity safely',
              'Recognise the typical voltages and currents met in maintenance work',
              'Distinguish power (kW) from energy (kWh) and calculate running costs',
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

        {/* Section 01: Voltage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage — Electrical Pressure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage is the difference in electrical potential between two points — the
              'pressure' that pushes current around a circuit. The quantity symbol is V (you will
              also see U in some European documentation) and the unit is the volt (V), named after
              Alessandro Volta. A useful mental model is water in a pipe system: voltage is the
              pressure difference between two points, current is the flow of water, and resistance
              is the narrowness of the pipe.
            </p>
            <p>
              Strictly, a source such as a battery or generator produces an electromotive force
              (EMF), while the voltage measured across any component in a circuit is a potential
              difference (p.d.). In everyday maintenance work both are simply called 'voltage' and
              both are measured in volts, but the distinction matters when you study sources and
              internal resistance later in this module.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                UK Nominal Supply Voltages
              </p>
              <p className="text-sm text-white mb-3">
                The nominal voltage of the UK public low voltage supply is 230 V AC single-phase
                and 400 V AC three-phase (line-to-line). These two figures describe the same
                three-phase system: 400 V divided by the square root of 3 gives approximately 230
                V, the line-to-neutral value. The actual supply voltage is permitted to vary within
                tolerances defined by BS EN 60038, so a socket reading of 235 V or 240 V is normal.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>230 V single-phase:</strong> lighting, socket outlets, small machines,
                  most domestic and light commercial loads
                </li>
                <li className="pl-1">
                  <strong>400 V three-phase:</strong> motors, larger heating loads, distribution
                  within industrial and commercial premises
                </li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Voltages a Maintenance Technician Meets
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Where You See It</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">400 V AC</td>
                      <td className="border border-white/10 px-3 py-2">
                        Three-phase motors, distribution boards, busbar systems
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Line-to-line value of the three-phase supply
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">230 V AC</td>
                      <td className="border border-white/10 px-3 py-2">
                        Single-phase circuits, control panels, socket outlets
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Line-to-neutral value; also common for contactor coils
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">110 V AC</td>
                      <td className="border border-white/10 px-3 py-2">
                        Site tools and temporary supplies via centre-tapped transformers
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Centre tap earthed so only 55 V exists to earth — reduced shock risk
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">24 V AC/DC</td>
                      <td className="border border-white/10 px-3 py-2">
                        Control circuits, PLC inputs/outputs, sensors, solenoid valves
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        The most common industrial control voltage
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">12 V AC/DC</td>
                      <td className="border border-white/10 px-3 py-2">
                        Extra-low voltage lighting, battery systems, vehicle circuits
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Extra-low voltage — but still capable of high fault currents
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measuring Voltage</p>
              <p className="text-sm text-white mb-3">
                Voltage is measured with a voltmeter (usually the voltage range of a multimeter or
                a two-pole voltage tester) connected <strong>in parallel</strong> — across the two
                points whose potential difference you want to know. The instrument has a very high
                internal resistance, so it draws almost no current and does not disturb the
                circuit.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Select the correct range and AC/DC setting before connecting the leads
                </li>
                <li className="pl-1">
                  Use GS38-compliant leads and probes for any measurement on low voltage systems
                </li>
                <li className="pl-1">
                  Live measurement is a last resort — isolate and prove dead wherever the task
                  allows, and follow your employer's safe isolation procedure
                </li>
                <li className="pl-1">
                  Measure across the component: across a lamp, across a contactor coil, across a
                  motor terminal pair — never 'at' a single point
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                Site Scenario — The Volt Drop Symptom
              </p>
              <p className="text-sm text-white">
                A packaging machine at the far end of a warehouse keeps stalling under full load.
                At the distribution board the circuit measures 230 V, but at the machine terminals
                the reading falls to 216 V when the machine runs — a drop of 14 V, around 6% of
                nominal. The cause is voltage drop: load current flowing through the resistance of
                a long cable run drops voltage along the way (V = I x R). BS 7671 limits the
                voltage drop within an installation — Regulation 525.202 points to Appendix 4 for
                the maximum values for lighting and other circuits — and a run this far outside
                normal readings needs investigating: undersized cable, an added load, or a
                deteriorating joint adding resistance.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> voltage is always a measurement <em>between two points</em>.
              When a drawing says a terminal is 'at 230 V', it means 230 V measured with respect to
              neutral or earth. Keeping this in mind will save you from countless confusing meter
              readings during fault-finding.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Current */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Current — The Flow of Charge
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current is the rate of flow of electric charge through a conductor. The quantity
              symbol is I (from the French <em>intensité de courant</em>) and the unit is the
              ampere (A), commonly shortened to 'amp'. One ampere is a flow of one coulomb of
              charge per second. Smaller currents are expressed in milliamperes (mA, thousandths of
              an ampere) — a unit you will meet constantly in control and instrumentation work.
            </p>
            <p>
              By convention, current is drawn flowing from the positive terminal of a source,
              through the circuit, and back to the negative terminal. In a metal conductor the
              moving charges are actually electrons travelling the other way, but every diagram,
              formula and instrument uses conventional current, so that is the direction you work
              with.
            </p>
            <p>
              Current only flows in a <strong>complete circuit</strong>. Break the circuit anywhere
              — an open switch, a blown fuse, a snapped conductor — and the current everywhere in
              that loop stops. This single fact underpins a huge amount of fault-finding: 'no
              current' means 'the loop is broken somewhere', and your job becomes finding where.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Currents a Maintenance Technician Meets
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Where You See It</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">4–20 mA</td>
                      <td className="border border-white/10 px-3 py-2">
                        Instrumentation signal loops (pressure, temperature, level transmitters)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        4 mA = minimum of range; 0 mA indicates a broken loop
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Tens to hundreds of mA
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Relay and contactor coils, indicator lamps, PLC outputs
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        A 24 V coil of 240 ohms draws I = 24 / 240 = 0.1 A (100 mA)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Up to 13 A</td>
                      <td className="border border-white/10 px-3 py-2">
                        Plug-connected equipment on 230 V socket circuits
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        A full 3 kW load draws I = 3000 / 230 = approximately 13 A
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Single amps to tens of amps
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Three-phase motor full-load currents
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        A 4 kW, 400 V motor at 0.8 power factor draws about 7.2 A per line
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        6–8 x full-load current
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Motor starting (inrush) current, for a few seconds
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Why motor circuits need protective devices that ride through starting
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measuring Current</p>
              <p className="text-sm text-white mb-3">
                There are two ways to measure current, and choosing the right one matters:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Clamp meter (the maintenance workhorse):</strong> the jaws clamp around a{' '}
                  <strong>single conductor</strong> and measure the magnetic field produced by the
                  current — no disconnection, no breaking into the circuit. Clamping around a whole
                  cable (line and neutral together) reads near zero because the two fields cancel
                </li>
                <li className="pl-1">
                  <strong>Multimeter on a current range:</strong> connected <strong>in series</strong>{' '}
                  so the circuit current flows through the meter. Practical for small control and
                  signal currents (mA), but it requires breaking the circuit and the meter's fused
                  range must exceed the expected current
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                Never connect a meter set to a current range <em>across</em> a supply. Its very low
                internal resistance makes it a near short circuit — this blows the meter fuse at
                best and causes a dangerous arc flash at worst.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example — Reading a Clamp Meter
              </p>
              <p className="text-sm text-white mb-2">
                You clamp one line conductor of a 4 kW, 400 V three-phase motor with a power factor
                of 0.8. What line current should you expect if the motor is fully loaded?
              </p>
              <div className="text-sm text-white space-y-1 ml-4">
                <p>I = P / (square root of 3 x V x power factor)</p>
                <p>I = 4000 / (1.732 x 400 x 0.8)</p>
                <p>I = 4000 / 554.2</p>
                <p>
                  I = <strong>approximately 7.2 A</strong>
                </p>
                <p className="mt-2 text-white">
                  If the clamp reads close to 7.2 A, the motor is working at around full load. A
                  much lower reading suggests the machine is lightly loaded; a higher reading
                  suggests mechanical overload, a failing bearing, or a supply problem. Comparing
                  measured current against the calculated or nameplate value is one of the fastest
                  health checks in maintenance.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> current is what does the work — and what generates the
              heat. Protective devices (fuses, circuit breakers) are rated in amperes because it is
              current, not voltage, that they monitor and interrupt.
            </p>
          </div>
        </section>

        {/* Section 03: Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Resistance — Opposition to Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistance is the opposition a material presents to the flow of current. The quantity
              symbol is R and the unit is the ohm, written with the Greek letter omega. One ohm
              allows one ampere to flow when one volt is applied. Every conductor, joint, winding
              and element in an installation has resistance — sometimes deliberately (a heating
              element), sometimes as an unavoidable property to be minimised (a cable run, a
              busbar joint).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                What Determines a Conductor's Resistance
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Material:</strong> copper and aluminium conduct well (low resistivity);
                  nichrome resists deliberately (heating elements); rubber and PVC barely conduct
                  at all (insulators)
                </li>
                <li className="pl-1">
                  <strong>Length:</strong> resistance is proportional to length — double the cable
                  run, double the resistance. This is why long runs suffer more voltage drop
                </li>
                <li className="pl-1">
                  <strong>Cross-sectional area:</strong> resistance is inversely proportional to
                  csa — a 4 mm squared conductor has half the resistance of a 2 mm squared one over
                  the same length. This is why bigger loads need bigger cables
                </li>
                <li className="pl-1">
                  <strong>Temperature:</strong> for metals, resistance rises as temperature rises.
                  A heating element or a motor winding reads a lower resistance cold than it
                  presents when hot and running
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Measuring Resistance — Dead Circuits Only
              </p>
              <p className="text-sm text-white mb-3">
                An ohmmeter works by passing a small test current from its own battery through the
                component and measuring the result. Two rules follow directly:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>The circuit must be isolated and proved dead first.</strong> Any external
                  voltage will damage the meter and give a meaningless reading — and measuring
                  resistance on a live circuit is dangerous
                </li>
                <li className="pl-1">
                  <strong>The component should be disconnected from parallel paths.</strong> If you
                  measure a component still wired into a circuit, other components in parallel
                  provide alternative paths for the test current and the reading will be lower than
                  the component's true resistance
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                Typical readings: a healthy heating element reads its design resistance (tens of
                ohms); a healthy motor winding reads low single-digit ohms to tens of ohms
                depending on size; a closed contact or a length of cable reads a fraction of an
                ohm; an open circuit reads 'OL' (over limit). Learning what 'normal' looks like for
                the plant you maintain is what turns a resistance reading into a diagnosis.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example — Checking an Element Dead
              </p>
              <p className="text-sm text-white mb-2">
                A 2 kW, 230 V washer heating element is suspected of failure. With the machine
                isolated and proved dead, what resistance should the element read?
              </p>
              <div className="text-sm text-white space-y-1 ml-4">
                <p>From P = V squared / R, rearranged: R = V squared / P</p>
                <p>R = 230 squared / 2000 = 52,900 / 2000</p>
                <p>
                  R = <strong>approximately 26.5 ohms</strong>
                </p>
                <p className="mt-2 text-white">
                  A reading near 26.5 ohms means the element is electrically sound — look elsewhere
                  (thermostat, contactor, supply). A reading of 'OL' means the element has gone
                  open circuit and needs replacing. A very low reading suggests a shorted element.
                  One dead test, three possible diagnoses.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Unwanted Resistance Is the Silent Fault
              </p>
              <p className="text-sm text-white">
                Loose terminals, corroded joints and damaged conductor strands all add resistance
                exactly where there should be almost none. That added resistance drops voltage (V =
                I x R) and generates heat (P = I squared x R) right at the fault. This is why
                thermal imaging of panels finds hot terminals, why connections are torqued to
                specification, and why a small resistance in the wrong place can start a fire while
                the circuit otherwise appears to work.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> conductors should have as little resistance as possible;
              insulation should have as much as possible; loads sit in between with their designed
              value. Almost every electrical fault is one of these three quantities ending up in
              the wrong place.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: How the Quantities Relate */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            How the Four Quantities Relate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage, current and resistance are locked together by Ohm's Law, and power is
              derived from them. Fix any two and the others follow. These four equations are the
              complete toolkit for this section — Section 2.1.2 applies them to full series and
              parallel circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5 text-center">
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-mono text-elec-yellow">V = I x R</p>
                  <p className="text-sm text-white">
                    Voltage (volts) = Current (amperes) x Resistance (ohms)
                  </p>
                </div>
                <div>
                  <p className="text-lg font-mono text-elec-yellow">P = V x I</p>
                  <p className="text-sm text-white">
                    Power (watts) = Voltage (volts) x Current (amperes)
                  </p>
                </div>
                <div>
                  <p className="text-lg font-mono text-elec-yellow">P = I² x R &nbsp;|&nbsp; P = V² / R</p>
                  <p className="text-sm text-white">
                    Derived forms — substitute Ohm's Law into P = V x I
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example — One Circuit, All Four Quantities
              </p>
              <p className="text-sm text-white mb-2">
                A 230 V single-phase circuit supplies a resistive load of 46 ohms. Find the
                current and the power.
              </p>
              <div className="text-sm text-white space-y-1 ml-4">
                <p>
                  <strong>Current:</strong> I = V / R = 230 / 46 = <strong>5 A</strong>
                </p>
                <p>
                  <strong>Power:</strong> P = V x I = 230 x 5 = <strong>1150 W</strong>
                </p>
                <p className="mt-2 text-white">
                  Cross-check with the derived forms: P = I squared x R = 25 x 46 = 1150 W, and P =
                  V squared / R = 52,900 / 46 = 1150 W. All three power equations agree — they are
                  the same relationship written three ways.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example — From Nameplate to Expected Reading
              </p>
              <p className="text-sm text-white mb-2">
                A kettle is rated 3 kW at 230 V. What current should a clamp meter read on its
                supply lead, and roughly what current would a plug-in appliance draw at the 13 A
                limit of a standard plug?
              </p>
              <div className="text-sm text-white space-y-1 ml-4">
                <p>I = P / V = 3000 / 230 = <strong>approximately 13 A</strong></p>
                <p className="mt-2 text-white">
                  A 3 kW appliance sits right at the 13 A plug limit (13 x 230 = 2990 W). This is
                  why 3 kW is the practical ceiling for plug-connected equipment on a 230 V supply
                  — anything larger must be permanently connected on its own circuit.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                Site Scenario — The Overloaded Circuit
              </p>
              <p className="text-sm text-white">
                A 20 A radial circuit keeps tripping in a workshop kitchen. A clamp meter on the
                circuit at the board reads 24 A with the kettle, microwave and heater all running.
                Add up the loads: 3000 W + 900 W + 1600 W = 5500 W, so I = P / V = 5500 / 230 =
                approximately 24 A — the arithmetic matches the reading, and both exceed the 20 A
                device rating. Nothing is 'faulty': the circuit is overloaded, and the protective
                device is doing exactly its job. The fix is load management or a new circuit, not a
                bigger breaker.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> the skill being built here is <em>predicting the reading
              before you take it</em>. If you can calculate what the meter should say, every
              measurement becomes a pass/fail test — and a disagreement between calculation and
              meter is where every diagnosis starts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Power and Energy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Power and Energy — kW versus kWh
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power is the rate at which electrical energy is converted into another form — heat,
              light, motion. The quantity symbol is P and the unit is the watt (W); 1000 W is a
              kilowatt (kW). Energy is the total amount converted over time, and for electrical
              work it is billed and recorded in kilowatt-hours (kWh): one kilowatt-hour is one
              kilowatt flowing for one hour.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5 text-center">
              <div className="space-y-3">
                <div>
                  <p className="text-lg font-mono text-elec-yellow">Energy (kWh) = Power (kW) x Time (hours)</p>
                  <p className="text-sm text-white">
                    Power is a rate (like speed); energy is an amount (like distance)
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Tells You</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Where You See It</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Power</td>
                      <td className="border border-white/10 px-3 py-2">W, kW</td>
                      <td className="border border-white/10 px-3 py-2">
                        Rate of energy use at this instant — sizes cables and protective devices
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Nameplates, motor ratings, heater ratings
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Energy</td>
                      <td className="border border-white/10 px-3 py-2">kWh</td>
                      <td className="border border-white/10 px-3 py-2">
                        Total energy used over a period — what the customer pays for
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Electricity meters, bills, energy surveys
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example — Running Cost
              </p>
              <p className="text-sm text-white mb-2">
                A 3 kW heater is left running for a 4-hour shift. At a unit price of 30p per kWh,
                what does it cost?
              </p>
              <div className="text-sm text-white space-y-1 ml-4">
                <p>Energy = 3 kW x 4 h = <strong>12 kWh</strong></p>
                <p>Cost = 12 kWh x £0.30 = <strong>£3.60</strong></p>
                <p className="mt-2 text-white">
                  Maintenance technicians are increasingly asked to support energy-reduction work.
                  Being able to convert a nameplate rating and running hours into kWh and cost is
                  the first step in every energy survey.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                A Note on Three-Phase Power and Power Factor
              </p>
              <p className="text-sm text-white">
                For a three-phase load, total power is P = square root of 3 x V(line) x I(line) x
                power factor. The power factor accounts for the fact that motors and other
                inductive loads draw some current that does no useful work. For now, remember two
                things: three-phase calculations include the square root of 3 (approximately
                1.732), and a motor's real power in watts is less than the simple V x I product.
                AC theory and power factor are covered fully later in this module.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> when someone says a machine 'uses 5 kW', that is power —
              a rate. Only after you multiply by running time do you get energy in kWh. Confusing
              the two is one of the most common errors in reports and energy calculations, and
              assessors look for it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 06: Putting It Together on Site */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Putting It Together on Site
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The four quantities are not four separate topics — every measurement you take on
              site reads one of them, and every diagnosis compares that reading with the value the
              other three predict. Here is the measurement toolkit in one view:
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit State</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Voltage</td>
                      <td className="border border-white/10 px-3 py-2">
                        Multimeter / two-pole tester (GS38-compliant leads)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        In parallel, across two points
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Live (only when unavoidable, with precautions)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Current</td>
                      <td className="border border-white/10 px-3 py-2">Clamp meter</td>
                      <td className="border border-white/10 px-3 py-2">
                        Around a single conductor
                      </td>
                      <td className="border border-white/10 px-3 py-2">Live, under load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Current (small)
                      </td>
                      <td className="border border-white/10 px-3 py-2">Multimeter (mA range)</td>
                      <td className="border border-white/10 px-3 py-2">
                        In series with the circuit
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Live control/signal circuits
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Resistance</td>
                      <td className="border border-white/10 px-3 py-2">Multimeter (ohms range)</td>
                      <td className="border border-white/10 px-3 py-2">
                        Across the component, ideally disconnected
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Isolated and proved dead — always
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Power</td>
                      <td className="border border-white/10 px-3 py-2">
                        Calculated from V and I (or power/energy meter)
                      </td>
                      <td className="border border-white/10 px-3 py-2">P = V x I</td>
                      <td className="border border-white/10 px-3 py-2">Live, under load</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                A Preview of Series and Parallel
              </p>
              <p className="text-sm text-white mb-3">
                Real circuits combine components, and the way they combine decides how voltage and
                current distribute. The full treatment comes in Section 2.1.2, but the intuition is
                worth planting now:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>In series</strong> (one path): the same current flows through everything,
                  and the supply voltage divides across the components. Two 10 ohm resistors in
                  series make 20 ohms
                </li>
                <li className="pl-1">
                  <strong>In parallel</strong> (multiple paths): every branch sees the full supply
                  voltage, and the currents add. Two 10 ohm resistors in parallel make 5 ohms —
                  more paths means less overall opposition
                </li>
                <li className="pl-1">
                  <strong>On site:</strong> distribution circuits are parallel (every load gets full
                  voltage); safety interlock chains are series (any open device stops the machine);
                  and cable resistance acts as an unwanted series element in every circuit
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">
                Case Study — Predict, Measure, Compare
              </p>
              <p className="text-sm text-white mb-2">
                A 230 V process heater rated 2.3 kW is reported as 'slow to heat'. Walk the
                diagnostic:
              </p>
              <div className="text-sm text-white space-y-1 ml-4">
                <p>
                  <strong>Predict:</strong> expected current I = P / V = 2300 / 230 = 10 A
                </p>
                <p>
                  <strong>Measure:</strong> clamp meter reads 5 A with the heater calling for heat
                </p>
                <p>
                  <strong>Compare:</strong> half the expected current at full voltage means roughly
                  double the expected resistance (R = V / I = 230 / 5 = 46 ohms against an expected
                  230 / 10 = 23 ohms)
                </p>
                <p>
                  <strong>Diagnose:</strong> this heater has two elements in parallel — one has
                  failed open circuit, leaving one healthy element carrying on alone at half power
                </p>
                <p>
                  <strong>Confirm:</strong> isolate, prove dead, and measure each element's
                  resistance individually — one reads its design value, the other reads 'OL'
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> the maintenance and operations engineering technician
              standard expects you to apply electrical principles to safe, systematic maintenance
              and fault diagnosis. Predict-measure-compare, built on these four quantities, is that
              expectation in its simplest form — and it is the pattern every later section of this
              module builds on.
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
                <p className="font-medium text-white mb-1">Quantities, Symbols, Units</p>
                <ul className="space-y-0.5">
                  <li>Voltage — V — volt (V)</li>
                  <li>Current — I — ampere (A)</li>
                  <li>Resistance — R — ohm</li>
                  <li>Power — P — watt (W)</li>
                </ul>
                <p className="font-medium text-white mb-1 mt-2">Core Equations</p>
                <ul className="space-y-0.5">
                  <li>V = IR | I = V/R | R = V/I</li>
                  <li>P = VI | P = I²R | P = V²/R</li>
                  <li>Energy (kWh) = kW x hours</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Nominal Voltages</p>
                <ul className="space-y-0.5">
                  <li>230 V AC single-phase (line to neutral)</li>
                  <li>400 V AC three-phase (line to line)</li>
                  <li>400 / square root of 3 = approximately 230 V</li>
                </ul>
                <p className="font-medium text-white mb-1 mt-2">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671:2018+A4:2026 — voltage drop: Reg 525.202 and Appendix 4</li>
                  <li>HSE GS38 — test equipment on LV systems</li>
                  <li>ST1426 — electrical fundamentals KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.1 Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1-2">
              Next: Ohm's Law and Watt's Law
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule2Section1_1;
