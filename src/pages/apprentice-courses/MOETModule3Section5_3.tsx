import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Generators - MOET Module 3.5.3";
const DESCRIPTION = "Comprehensive guide to emergency generators for maintenance technicians: diesel and gas generators, components, automatic start sequences, load testing, maintenance procedures, fuel storage and environmental considerations under ST1426.";

const quickCheckQuestions = [
  {
    id: "gen-components",
    question: "What are the four main components of a standby diesel generator set?",
    options: [
      "Battery, inverter, controller, switch",
      "Diesel engine, alternator, control panel, fuel system",
      "Motor, transformer, switchgear, cabling",
      "Compressor, condenser, evaporator, fan"
    ],
    correctIndex: 1,
    explanation: "A standby diesel generator set comprises four main components: the diesel engine (prime mover), the alternator (converts mechanical energy to electrical energy), the control panel (monitors parameters, manages start/stop sequences, provides alarms), and the fuel system (tank, filters, supply and return lines, day tank for larger sets)."
  },
  {
    id: "avr-function",
    question: "What is the function of the AVR (Automatic Voltage Regulator) on a generator?",
    options: [
      "To regulate the engine speed",
      "To maintain a constant output voltage by controlling the excitation current to the alternator field windings",
      "To automatically start the generator on mains failure",
      "To regulate the fuel supply"
    ],
    correctIndex: 1,
    explanation: "The AVR (Automatic Voltage Regulator) maintains a constant output voltage from the alternator by automatically adjusting the excitation current to the field (rotor) windings. As the load changes, the AVR increases or decreases the field current to maintain the set-point voltage. Without an AVR, the output voltage would fluctuate with every load change."
  },
  {
    id: "load-bank",
    question: "What is the purpose of load bank testing a generator?",
    options: [
      "To test the fuel consumption",
      "To apply a controlled electrical load to verify the generator can deliver its rated output and to exercise the engine under load",
      "To test the automatic transfer switch",
      "To charge the generator batteries"
    ],
    correctIndex: 1,
    explanation: "Load bank testing applies a controlled, adjustable electrical load to the generator to verify it can deliver its rated kW output, maintain voltage and frequency stability under load, and operate at full rated temperature. It also exercises the engine under load conditions that may not occur during normal standby operation — preventing 'wet stacking' caused by prolonged light-load or no-load running."
  },
  {
    id: "wet-stacking",
    question: "What is 'wet stacking' in a diesel generator?",
    options: [
      "Water ingress into the alternator windings",
      "Accumulation of unburned fuel and carbon deposits in the exhaust system due to prolonged light-load operation",
      "Coolant leaking from the radiator",
      "Oil contamination of the fuel system"
    ],
    correctIndex: 1,
    explanation: "Wet stacking occurs when a diesel engine runs at light load (below approximately 30% of rated output) for extended periods. The engine does not reach its optimal operating temperature, resulting in incomplete combustion. Unburned fuel, soot and carbon deposits accumulate in the exhaust system, turbocharger and cylinder liners. This reduces performance, increases emissions and can cause engine damage. Regular load bank testing prevents wet stacking."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The engine governor on a generator controls:",
    options: [
      "The output voltage",
      "The engine speed (and therefore the output frequency)",
      "The fuel tank level",
      "The coolant temperature"
    ],
    correctAnswer: 1,
    explanation: "The governor controls the engine speed, which directly determines the output frequency of the alternator (50 Hz in the UK). At 50 Hz, a 4-pole alternator runs at 1,500 rpm. The governor adjusts fuel delivery to maintain constant speed as the electrical load changes. Electronic governors provide tighter speed regulation than mechanical governors."
  },
  {
    id: 2,
    question: "A typical automatic start sequence for a standby generator involves:",
    options: [
      "Immediate start as soon as mains voltage drops below nominal",
      "Mains failure detection, time delay (to avoid nuisance starts), engine crank, warm-up, load transfer",
      "Manual key-start by the building manager",
      "Starting only during scheduled test periods"
    ],
    correctAnswer: 1,
    explanation: "The automatic start sequence typically involves: (1) mains failure detection by the ATS controller; (2) a time delay (typically 5-10 seconds) to avoid starting on brief transients; (3) engine cranking (typically 3 attempts of 10-15 seconds each); (4) engine warm-up period (30-60 seconds at no load); (5) load transfer via the ATS. The total time from mains failure to load on generator is typically 10-30 seconds."
  },
  {
    id: 3,
    question: "Diesel generator engine oil should typically be changed at intervals of:",
    options: [
      "Every 50 hours or annually, whichever comes first",
      "Every 250-500 hours or annually, whichever comes first",
      "Every 5,000 hours",
      "Only when the oil turns black"
    ],
    correctAnswer: 1,
    explanation: "Diesel generator engine oil should typically be changed every 250-500 hours of run time or annually, whichever comes first — even if the generator has run for very few hours. Standby generators often accumulate very few running hours but oil degrades over time due to moisture absorption, acid formation and additive depletion. Always follow the engine manufacturer's specific recommendations."
  },
  {
    id: 4,
    question: "The coolant in a diesel generator serves which functions?",
    options: [
      "Only to cool the engine",
      "To cool the engine, provide freeze protection, prevent corrosion and lubricate the water pump seal",
      "Only to prevent freezing",
      "To clean the engine internals"
    ],
    correctAnswer: 1,
    explanation: "Engine coolant (a mixture of water and antifreeze/inhibitor) serves multiple functions: removing heat from the engine and transferring it to the radiator; providing freeze protection in cold conditions; inhibiting internal corrosion of the engine block, cylinder liners and radiator; and lubricating the water pump seal. Coolant should be tested annually for concentration and inhibitor levels."
  },
  {
    id: 5,
    question: "The generator starting batteries must be maintained because:",
    options: [
      "They power the alternator",
      "A flat or degraded battery will prevent the engine from cranking and starting during an emergency",
      "They provide power to the building during start-up",
      "They regulate the output voltage"
    ],
    correctAnswer: 1,
    explanation: "The starting batteries power the starter motor, engine control system and fuel solenoid. If the batteries are flat, degraded or disconnected, the generator cannot start when called upon. This is one of the most common and easily preventable causes of generator start failure. Batteries should be float-charged continuously and tested regularly — typically monthly visual check and annually impedance/load test."
  },
  {
    id: 6,
    question: "Run hours monitoring on a generator is important because:",
    options: [
      "It measures the fuel consumption",
      "It determines when maintenance tasks (oil changes, filter replacements, overhauls) are due",
      "It calculates the electricity generated",
      "It monitors the output voltage"
    ],
    correctAnswer: 1,
    explanation: "Run hours monitoring is the primary method for scheduling maintenance. Oil changes, filter replacements, coolant changes, belt replacements and major overhauls are all scheduled based on accumulated run hours. The run hours meter should be checked at every inspection and recorded in the maintenance log. Some maintenance tasks are also time-based (e.g., annual oil change even if run hours are low)."
  },
  {
    id: 7,
    question: "Fuel stored in standby generator day tanks and bulk tanks can degrade over time due to:",
    options: [
      "The colour changing",
      "Microbial growth (diesel bug), water contamination, oxidation and sedimentation",
      "Evaporation only",
      "Exposure to light"
    ],
    correctAnswer: 1,
    explanation: "Diesel fuel degrades over time through several mechanisms: microbial growth ('diesel bug' — bacteria and fungi that thrive at the fuel/water interface); water contamination from condensation; oxidation causing gum and varnish formation; and sedimentation of particulates. Degraded fuel can block filters, damage injectors and prevent the generator from running. Fuel should be tested and polished (filtered) annually."
  },
  {
    id: 8,
    question: "The exhaust system of a diesel generator must be inspected for:",
    options: [
      "Paint condition only",
      "Leaks, corrosion, backpressure and lagging condition",
      "Colour of the exhaust gas only",
      "Noise level only"
    ],
    correctAnswer: 1,
    explanation: "The exhaust system must be inspected for: leaks at joints and flexible sections (exhaust gas contains carbon monoxide); corrosion of the exhaust pipework; excessive backpressure (which reduces engine performance); condition of the lagging/insulation (fire risk if missing near combustible materials); operation of the rain cap; and the condition of any silencer/attenuator. Exhaust system failures are a fire and carbon monoxide poisoning risk."
  },
  {
    id: 9,
    question: "How often should a standby generator be exercised (test run) under load?",
    options: [
      "Only when the mains fails",
      "Monthly for at least 30 minutes at a minimum of 50% rated load",
      "Annually",
      "Weekly for 5 minutes at no load"
    ],
    correctAnswer: 1,
    explanation: "Industry best practice (based on NFPA 110 and NHS HTM guidelines) recommends monthly exercising for at least 30 minutes at a minimum of 50% (preferably 75%) of rated load. This ensures the engine reaches operating temperature, prevents wet stacking, verifies all systems function correctly, and identifies any developing faults. No-load running should be avoided as it causes wet stacking."
  },
  {
    id: 10,
    question: "Environmental considerations for diesel generators include:",
    options: [
      "Noise level only",
      "Noise, exhaust emissions, fuel storage bunding, oil containment and planning permission",
      "Cost of fuel only",
      "The colour of the generator enclosure"
    ],
    correctAnswer: 1,
    explanation: "Environmental considerations include: noise (attenuation, acoustic enclosures, planning conditions); exhaust emissions (NOx, particulates, CO — subject to Environmental Permit for larger sets); fuel storage bunding (secondary containment to 110% of tank volume); oil containment (drip trays, bunds); planning permission (may be required for permanent installations); and the F-gas regulations if the generator has air conditioning cooling."
  },
  {
    id: 11,
    question: "A turbocharger on a diesel generator engine:",
    options: [
      "Generates electricity",
      "Uses exhaust gas energy to compress intake air, increasing engine power output and efficiency",
      "Controls the engine speed",
      "Cools the engine"
    ],
    correctAnswer: 1,
    explanation: "A turbocharger uses the energy in the exhaust gas stream to spin a turbine, which drives a compressor that forces more air into the engine cylinders. This allows more fuel to be burned per stroke, increasing power output and efficiency without increasing engine size. Turbocharger maintenance includes checking for oil leaks, bearing wear (indicated by shaft play or unusual noise), and exhaust gas restriction."
  },
  {
    id: 12,
    question: "Which maintenance record should be kept for a standby generator?",
    options: [
      "No records are required",
      "A comprehensive log including run hours, fuel levels, test results, maintenance carried out, faults and remedial actions",
      "Only the date of installation",
      "Only the fuel delivery receipts"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive maintenance log should include: run hours at each inspection; fuel level and consumption; oil level and condition; coolant level and condition; battery voltage and condition; test run results (voltage, frequency, load); all maintenance carried out (oil changes, filter replacements, etc.); any faults found and remedial actions; and service reports from specialist contractors. This log is essential for demonstrating compliance and tracking asset condition."
  }
];

const faqs = [
  {
    question: "How often should a standby generator be serviced?",
    answer: "A standby generator should receive a routine inspection monthly (visual check, check oil/coolant/fuel levels, check battery, test run under load). A minor service (oil and filter change) should be carried out every 250-500 run hours or annually. A major service (including injector testing, valve clearances, turbocharger inspection) should be carried out every 1,000-2,000 run hours or as recommended by the manufacturer. Critical installations may require more frequent servicing."
  },
  {
    question: "What is the difference between a prime-rated and standby-rated generator?",
    answer: "A standby-rated generator is designed to provide backup power during mains failures — it runs for limited hours per year (typically less than 200-500 hours) and should not be used as a continuous power source. A prime-rated generator is designed for continuous or extended operation (unlimited hours) at up to 100% of its prime rating. The standby rating is typically 10-15% higher than the prime rating for the same engine/alternator combination. Using a standby-rated generator continuously will void the warranty and shorten engine life."
  },
  {
    question: "What causes a generator to fail to start?",
    answer: "The most common causes of generator start failure are: flat or degraded starting batteries; fuel problems (empty tank, contaminated fuel, blocked filters, air locks); coolant problems (low level, heater failure in cold weather); control system faults (faulty sensors, control board errors, emergency stop left engaged); and mechanical faults (seized starter motor, alternator diode failure). Regular monthly test runs and preventive maintenance will detect most of these issues before a real emergency occurs."
  },
  {
    question: "What is an acoustic enclosure?",
    answer: "An acoustic enclosure is a sound-insulated housing that surrounds the generator set to reduce noise emissions to acceptable levels. Enclosures are rated in dB(A) at a specified distance (e.g., 75 dB(A) at 1 metre). They incorporate ventilation for combustion and cooling air, exhaust attenuation, vibration isolation, and access doors for maintenance. Acoustic enclosures are essential for generators installed near residential areas or in noise-sensitive locations."
  },
  {
    question: "What is bunding and why is it required for fuel storage?",
    answer: "Bunding is secondary containment around a fuel storage tank designed to contain fuel in the event of a tank leak or spillage. Under the Control of Pollution (Oil Storage) (England) Regulations 2001 (and equivalent regulations in Wales, Scotland and Northern Ireland), bunds must have a capacity of at least 110% of the largest tank volume (or 25% of the total aggregate volume, whichever is greater). Bunds must be impermeable and structurally sound. Bund alarms and regular inspections are required."
  }
];

const MOETModule3Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Generators
          </h1>
          <p className="text-white/80">
            Diesel generators, components, start sequences, load testing and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Components:</strong> Engine, alternator, control panel, fuel system</li>
              <li className="pl-1"><strong>Start time:</strong> 10-30 seconds from mains failure to load transfer</li>
              <li className="pl-1"><strong>Testing:</strong> Monthly run under load, annual load bank test</li>
              <li className="pl-1"><strong>Maintenance:</strong> Oil, coolant, fuel, batteries, exhaust — all critical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:</strong> Generator installation requirements (Section 551)</li>
              <li className="pl-1"><strong>BS 7698:</strong> Reciprocating engine driven generating sets</li>
              <li className="pl-1"><strong>Environmental Permit:</strong> Emissions limits for larger generators</li>
              <li className="pl-1"><strong>ST1426:</strong> Maintain auxiliary power systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the main components of a diesel generator set and explain their functions",
              "Describe the automatic start sequence from mains failure to load transfer",
              "Explain load bank testing and the prevention of wet stacking",
              "Outline a preventive maintenance programme for standby generators",
              "Describe fuel storage requirements including bunding and fuel polishing",
              "Identify environmental considerations including noise and emissions"
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

        {/* Section 01: Generator Components and Operation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Generator Components and Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standby generators provide backup electrical power when the mains supply fails. In critical
              facilities — hospitals, data centres, water treatment works and high-rise buildings — the
              generator is a life safety system that must start reliably and transfer load within seconds.
              Diesel generators are the most common type for standby power due to their reliability, fast
              start capability and fuel availability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Diesel engine:</strong> The prime mover. Converts chemical energy in diesel fuel to rotational mechanical energy. Available from 10 kW to 3,000+ kW. Includes cooling system, lubrication system, fuel injection system and exhaust</li>
                <li className="pl-1"><strong>Alternator:</strong> Converts mechanical rotation to AC electrical energy via electromagnetic induction. Typically brushless, self-excited, 4-pole (1,500 rpm for 50 Hz). Rated in kVA (apparent power)</li>
                <li className="pl-1"><strong>AVR (Automatic Voltage Regulator):</strong> Controls the alternator excitation to maintain constant output voltage regardless of load changes</li>
                <li className="pl-1"><strong>Governor:</strong> Controls engine speed to maintain constant frequency (50 Hz). Electronic governors provide ±0.5% speed regulation under varying loads</li>
                <li className="pl-1"><strong>Control panel:</strong> Monitors engine and alternator parameters, manages automatic start/stop sequences, provides alarms and remote monitoring interfaces</li>
                <li className="pl-1"><strong>Starting system:</strong> Electric starter motor powered by 12 V or 24 V batteries. Includes battery charger, cranking control and start-fail protection</li>
                <li className="pl-1"><strong>Fuel system:</strong> Base tank, day tank (larger sets), fuel transfer pump, primary and secondary fuel filters, water separator, return line</li>
                <li className="pl-1"><strong>Cooling system:</strong> Radiator, thermostat, water pump, coolant hoses, fan. Some larger sets use remote radiators or cooling towers</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic Start Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> ATS detects mains failure (voltage below threshold for a defined time delay)</li>
                <li className="pl-1"><strong>Step 2:</strong> Start signal sent to generator control panel after time delay (5-10 seconds typical)</li>
                <li className="pl-1"><strong>Step 3:</strong> Engine pre-lubrication (if fitted) and glow plug warm-up (cold engines)</li>
                <li className="pl-1"><strong>Step 4:</strong> Engine cranks — typically 3 attempts of 10-15 seconds each with rest periods</li>
                <li className="pl-1"><strong>Step 5:</strong> Engine starts — warm-up period at no load (30-60 seconds)</li>
                <li className="pl-1"><strong>Step 6:</strong> Generator ready signal — voltage and frequency within tolerance</li>
                <li className="pl-1"><strong>Step 7:</strong> ATS transfers load from mains to generator</li>
                <li className="pl-1"><strong>Step 8:</strong> On mains return — retransfer delay, load back to mains, cool-down period, engine stop</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The total time from mains failure to load on generator is typically
              10-30 seconds. For critical loads that cannot tolerate this interruption (IT equipment, medical
              devices), a UPS is required to bridge the gap between mains failure and generator taking load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Load Testing and Wet Stacking Prevention */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load Testing and Wet Stacking Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular load testing is essential to verify that the generator can deliver its rated output
              and to prevent the damaging effects of prolonged light-load operation. A generator that has
              never been tested under load may fail when called upon during a real emergency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Bank Testing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purpose:</strong> Apply a controlled, adjustable electrical load to verify full-rated output capability</li>
                <li className="pl-1"><strong>Load bank types:</strong> Resistive (kW only), reactive (kVAr), combined (kW + kVAr)</li>
                <li className="pl-1"><strong>Procedure:</strong> Start at 25% load, step up to 50%, 75% and 100% in stages, recording voltage, current, frequency, oil pressure, coolant temperature and exhaust temperature at each step</li>
                <li className="pl-1"><strong>Duration:</strong> Minimum 30 minutes at each load step, or as specified by the maintenance standard</li>
                <li className="pl-1"><strong>Frequency:</strong> Annual load bank test recommended; monthly test runs at minimum 50% load</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Wet Stacking</p>
              <p className="text-sm text-white">
                Wet stacking is a serious condition caused by prolonged light-load or no-load running. The engine
                does not reach optimal combustion temperature, causing unburned fuel, soot and carbon to accumulate
                in the exhaust manifold, turbocharger, cylinder liners and valve guides. Symptoms include black oily
                residue from the exhaust, white or blue exhaust smoke, carbon deposits on spark arrestors, and reduced
                power output. Severe wet stacking requires engine decarburisation — an expensive and time-consuming
                repair. Prevention is through regular running at minimum 50-75% rated load.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> If a generator has been running at light load for extended
              periods (e.g., the building has few occupants), schedule a load bank test to clean out the
              exhaust system and verify the generator can still deliver rated output.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Preventive Maintenance Programme */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Preventive Maintenance Programme
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A comprehensive preventive maintenance programme is essential for generator reliability.
              The programme must cover the engine, alternator, control system, fuel system, cooling
              system, starting batteries and exhaust system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Schedule</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Weekly</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection, check oil/coolant/fuel levels, check battery voltage, check for leaks, record run hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Test run under load (min 30 mins at 50%+ load), check all alarms, inspect belts and hoses, check battery electrolyte</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">6-monthly</td>
                      <td className="border border-white/10 px-3 py-2">Oil and filter change (or at 250-500 hrs), fuel filter change, air filter inspection, coolant test, battery load test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Full load bank test, coolant change, fuel polishing, exhaust system inspection, alternator insulation test, control system calibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">3-5 yearly</td>
                      <td className="border border-white/10 px-3 py-2">Major service — injector overhaul, valve clearance check, turbocharger inspection, starting battery replacement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fuel Management</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fuel testing:</strong> Annual laboratory analysis for microbial contamination, water content, oxidation stability and particulate level</li>
                <li className="pl-1"><strong>Fuel polishing:</strong> Periodic filtration of stored fuel to remove water, particulates and microbial growth products</li>
                <li className="pl-1"><strong>Water drainage:</strong> Drain water from the bottom of fuel tanks regularly — water is the primary cause of microbial growth</li>
                <li className="pl-1"><strong>Biocide treatment:</strong> Add approved biocide to fuel if microbial contamination is detected</li>
                <li className="pl-1"><strong>Fuel rotation:</strong> For infrequently used generators, ensure fuel is consumed and replenished within 12-18 months</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in
              maintaining standby generators, including routine inspections, testing and recording. You
              must understand the start sequence and be able to identify common faults.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Environmental and Safety Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Environmental and Safety Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diesel generators have significant environmental impacts that must be managed through proper
              design, installation and maintenance. Regulatory requirements cover noise, emissions, fuel
              storage and waste management.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Noise:</strong> Acoustic enclosures, attenuators, planning conditions. BS 4142 assessment for noise impact on neighbours</li>
                <li className="pl-1"><strong>Emissions:</strong> Medium Combustion Plant Directive (MCPD) for generators 1-50 MWth. Environmental Permit may be required for regular testing</li>
                <li className="pl-1"><strong>Fuel storage:</strong> Bunding to 110% of tank capacity. Compliance with Oil Storage Regulations. Spill kits, drip trays, overfill prevention</li>
                <li className="pl-1"><strong>Oil and coolant disposal:</strong> Waste oil and coolant are controlled waste — disposed of through an approved waste carrier with waste transfer notes</li>
                <li className="pl-1"><strong>Exhaust:</strong> Exhaust must discharge to atmosphere in a safe location — away from air intakes, openable windows and occupied areas</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Hazards</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Carbon monoxide:</strong> Exhaust gases contain CO — fatal in enclosed spaces. Never run a generator indoors without proper exhaust extraction</li>
                <li className="pl-1"><strong>Rotating parts:</strong> Belt drives, fans, flywheels — all guards must be in place before starting</li>
                <li className="pl-1"><strong>Hot surfaces:</strong> Engine, exhaust manifold, turbocharger — severe burn risk. Allow cool-down before maintenance</li>
                <li className="pl-1"><strong>Electrical:</strong> Generator output is live when running — safe isolation procedures must be followed. Back-feed risk if connected without an ATS</li>
                <li className="pl-1"><strong>Fuel:</strong> Diesel is combustible — no smoking or naked flames near fuel storage or during refuelling</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A generator connected to a building without a properly interlocked
              ATS can back-feed into the mains supply, energising supposedly dead cables and presenting a
              fatal electrocution risk to electricity network engineers. This is illegal and extremely dangerous.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Alternator Maintenance and Electrical Connections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Alternator Maintenance and Electrical Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The alternator converts the engine's mechanical energy into AC electrical energy. It is
              typically a brushless, self-excited, four-pole synchronous machine running at 1,500 rpm to
              produce 50 Hz output. While alternators are generally reliable, they require periodic
              maintenance to ensure continued safe and efficient operation. Neglecting alternator
              maintenance can result in insulation failure, voltage instability or complete generation
              failure during an emergency.
            </p>
            <p>
              The AVR (Automatic Voltage Regulator) is integral to the alternator's performance. It
              continuously adjusts the excitation current to the rotor field windings to maintain constant
              output voltage as load changes. AVR faults are a common cause of voltage instability and can
              damage connected equipment. Understanding AVR function and testing is an important
              maintenance skill.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Alternator Maintenance Tasks</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation resistance:</strong> Annual megger test of stator and rotor windings — minimum 2 megohms for LV alternators; trend declining values</li>
                <li className="pl-1"><strong>Winding resistance:</strong> Measure phase-to-phase resistance to detect turn-to-turn faults or connection problems</li>
                <li className="pl-1"><strong>AVR adjustment:</strong> Verify output voltage at no-load and full-load; adjust set-point if drifting from 400 V (three-phase)</li>
                <li className="pl-1"><strong>Diode pack:</strong> Brushless alternators use rotating diodes — check for open or short-circuit failures during annual service</li>
                <li className="pl-1"><strong>Bearing condition:</strong> Listen for bearing noise during test runs; vibration analysis for larger units</li>
                <li className="pl-1"><strong>Ventilation:</strong> Clean air inlet filters and ducts; blocked ventilation causes winding overheating</li>
                <li className="pl-1"><strong>Connections:</strong> Retorque all power output connections; thermographic survey under load</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Electrical Connection Considerations</h3>
              <p className="text-sm text-white mb-3">
                The generator's electrical connection to the building's distribution system must comply
                with BS 7671 Section 551 and the DNO's connection requirements. Key considerations include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earthing arrangement:</strong> The generator may require its own earth electrode; the earthing system must be coordinated with the ATS switching arrangement</li>
                <li className="pl-1"><strong>Protection coordination:</strong> Fault levels on the generator supply differ from the mains supply — protection settings must be verified for both conditions</li>
                <li className="pl-1"><strong>Neutral switching:</strong> Four-pole ATS required in TN-S systems to prevent neutral current circulation</li>
                <li className="pl-1"><strong>Cable sizing:</strong> Generator supply cables must be rated for the generator's full output current, not just the expected load</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate competence in
              maintaining standby generators, including the alternator, control system and electrical
              connections. Practical observation of generator maintenance is part of the EPA assessment.
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
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
                <p className="font-medium text-white mb-1">Generator Components</p>
                <ul className="space-y-0.5">
                  <li>Diesel engine -- prime mover</li>
                  <li>Alternator -- mechanical to AC</li>
                  <li>AVR -- constant output voltage</li>
                  <li>Governor -- constant frequency (50 Hz)</li>
                  <li>Control panel -- monitoring and sequencing</li>
                  <li>Starting batteries -- 12 V or 24 V</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Intervals</p>
                <ul className="space-y-0.5">
                  <li>Weekly -- visual, levels, battery voltage</li>
                  <li>Monthly -- test run 30 min at 50%+ load</li>
                  <li>6-monthly -- oil/filter change, coolant test</li>
                  <li>Annual -- load bank test, fuel polishing</li>
                  <li>3-5 yearly -- injectors, valves, turbo</li>
                  <li>Bunding -- 110% of tank volume</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Battery Technologies
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-4">
              Next: Transfer Switches
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section5_3;
