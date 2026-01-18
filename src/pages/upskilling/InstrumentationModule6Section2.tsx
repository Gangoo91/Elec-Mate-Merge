import { ArrowLeft, Wrench, CheckCircle, HelpCircle, Gauge, Thermometer, Zap, Layers, Activity, FileText, AlertTriangle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule6Section2 = () => {
  useSEO({
    title: "Calibration Equipment and Reference Standards | Instrumentation Module 6",
    description: "Learn about essential calibration equipment, reference standards, measurement traceability, and environmental factors affecting calibration accuracy.",
    keywords: ["calibration equipment", "reference standards", "UKAS", "NPL", "measurement traceability", "environmental calibration factors"]
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Module 6</span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/20 mb-4">
            <Wrench className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Calibration Equipment and Reference Standards
          </h1>
          <p className="text-white">
            Module 6 · Section 2 · 18 min read
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            What You Will Learn
          </h2>
          <ul className="space-y-1 text-white">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Essential calibration equipment for pressure, temperature, and electrical measurements
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Reference standards and the concept of measurement traceability
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              The hierarchy from national standards to working standards
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Environmental factors that affect calibration accuracy
            </li>
          </ul>
        </div>

        {/* Section 01 - Essential Calibration Equipment */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Essential Calibration Equipment</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Accurate calibration depends entirely on the quality and traceability of the equipment used. Each measurement type requires specialised equipment designed to generate or measure precise reference values.
            </p>

            {/* Pressure Calibration */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-blue-400" />
                Pressure Calibration Equipment
              </h3>
              <div className="space-y-3 text-white">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-blue-400">Deadweight Testers:</span>
                      <span className="ml-1">Primary pressure standards using known masses on a piston to generate precise pressure. Considered the gold standard for pressure calibration.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-blue-400">Digital Pressure Calibrators:</span>
                      <span className="ml-1">Portable electronic standards with built-in pressure generation. Ideal for field calibration work.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-blue-400">Pressure Comparators:</span>
                      <span className="ml-1">Pneumatic and hydraulic reference instruments for comparing gauge readings against known standards.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-blue-400">Hand Pumps and Vacuum Pumps:</span>
                      <span className="ml-1">Manual pressure generation for positive and negative pressure calibration in the field.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature Calibration */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-400" />
                Temperature Calibration Equipment
              </h3>
              <div className="space-y-3 text-white">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-red-400">Dry Block Calibrators:</span>
                      <span className="ml-1">Portable temperature sources with metal blocks that heat or cool to precise temperatures. Fast stabilisation, minimal maintenance.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-red-400">Fluid Baths:</span>
                      <span className="ml-1">Liquid temperature references using oil or water. Better uniformity than dry blocks but require more maintenance.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-red-400">RTD/Thermocouple Simulators:</span>
                      <span className="ml-1">Generate electrical signals that simulate temperature sensor outputs. Essential for testing control systems without actual temperature changes.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-red-400">Ice Point References:</span>
                      <span className="ml-1">Precisely maintained 0°C reference using ice and water mixture. Simple but highly accurate reference point.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Electrical Calibration */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Electrical Calibration Equipment
              </h3>
              <div className="space-y-3 text-white">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-elec-yellow">Precision Multimeters:</span>
                      <span className="ml-1">High-accuracy electrical measurement instruments with 6.5 to 8.5 digit resolution for laboratory-grade measurements.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-elec-yellow">Multifunction Calibrators:</span>
                      <span className="ml-1">Versatile instruments capable of generating and measuring multiple signal types (voltage, current, resistance, frequency).</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-elec-yellow">Current/Voltage Sources:</span>
                      <span className="ml-1">Precision signal generators for calibrating 4-20mA loops and voltage-based instruments.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0"></div>
                    <div>
                      <span className="font-medium text-elec-yellow">Resistance Standards:</span>
                      <span className="ml-1">Fixed or adjustable resistors with precisely known values for calibrating ohmmeters and bridges.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Which pressure calibration equipment is considered the primary standard using known masses?"
          answer="Deadweight tester - it uses precisely known masses on a calibrated piston to generate exact pressure values, making it the gold standard for pressure calibration."
        />

        {/* Section 02 - Reference Standards and Traceability */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Reference Standards and Traceability</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Traceability is the unbroken chain of calibrations linking a measurement to a stated reference, typically national or international standards. Each link in the chain has documented measurement uncertainty, ensuring measurements made anywhere in the world can be compared and trusted.
            </p>

            {/* UKAS and NPL */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-400" />
                  UKAS
                </h3>
                <p className="text-sm text-white mb-2 font-medium">United Kingdom Accreditation Service</p>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    UK's national accreditation body for calibration laboratories
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Ensures compliance with ISO/IEC 17025 standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Provides internationally recognised certificates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Mutual recognition agreements with international bodies
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-green-400" />
                  NPL
                </h3>
                <p className="text-sm text-white mb-2 font-medium">National Physical Laboratory</p>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    UK's national measurement institute
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Maintains UK's primary measurement standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Direct link to SI (International System of Units)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Research and development of new standards
                  </li>
                </ul>
              </div>
            </div>

            {/* Why Traceability Matters */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Why Traceability Matters</h3>
              <p className="text-white text-sm leading-relaxed">
                Without traceability, there is no guarantee that a measurement made in one location is equivalent to a measurement made elsewhere. Traceability provides confidence that a temperature reading of 100°C in London means the same as 100°C in Tokyo, enabling international trade, regulatory compliance, and scientific collaboration.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is UKAS and why is it important for calibration?"
          answer="UKAS (United Kingdom Accreditation Service) is the UK's national accreditation body. It accredits calibration laboratories to ISO/IEC 17025 standards, ensuring their calibration certificates are internationally recognised and legally defensible."
        />

        {/* Section 03 - Hierarchy of Measurement Standards */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Hierarchy of Measurement Standards</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Measurement standards are organised in a hierarchy, with each level calibrated against the level above. This creates the traceability chain from your working instrument all the way to the SI units maintained by national laboratories.
            </p>

            {/* Standards Pyramid */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">The Standards Hierarchy</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-elec-yellow/20 border border-elec-yellow/40 rounded-lg p-3">
                  <h4 className="font-semibold text-elec-yellow text-sm">Level 1: Primary Standards</h4>
                  <p className="text-white text-sm mt-1">
                    Highest accuracy standards maintained by national measurement institutes (NPL). Direct realisation of SI units with the lowest possible uncertainty. Used to calibrate secondary standards.
                  </p>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-3 ml-4">
                  <h4 className="font-semibold text-purple-400 text-sm">Level 2: Secondary Standards</h4>
                  <p className="text-white text-sm mt-1">
                    Calibrated against primary standards. Used by commercial calibration laboratories. UKAS-accredited laboratories maintain secondary standards with documented uncertainty.
                  </p>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 ml-8">
                  <h4 className="font-semibold text-blue-400 text-sm">Level 3: Working Standards</h4>
                  <p className="text-white text-sm mt-1">
                    Used for day-to-day calibration work in industry. Calibrated against secondary standards. Typically portable and ruggedised for field use. Also called transfer standards.
                  </p>
                </div>

                <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 ml-12">
                  <h4 className="font-semibold text-green-400 text-sm">Level 4: Process Instruments</h4>
                  <p className="text-white text-sm mt-1">
                    The instruments actually used for process control and measurement. Calibrated against working standards. Require regular calibration to maintain accuracy throughout their service life.
                  </p>
                </div>
              </div>
            </div>

            {/* Uncertainty Growth */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Understanding Uncertainty Growth
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Each calibration step adds uncertainty. A primary standard might have ±0.001°C uncertainty. By the time you reach a working standard, uncertainty might be ±0.05°C, and the process instrument ±0.2°C. The calibration equipment must always have significantly lower uncertainty than the instrument being calibrated (typically 4:1 ratio or better).
              </p>
            </div>
          </div>
        </section>

        {/* Section 04 - Environmental Factors */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Environmental Factors Affecting Calibration</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Environmental conditions significantly affect calibration accuracy. Professional calibration laboratories maintain strict environmental controls. Even field calibrations require awareness of these factors and appropriate corrections.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-400" />
                  Temperature Effects
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Standard reference temperature: 20°C ±2°C
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Thermal expansion affects mechanical measurements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Electronic drift in sensitive instruments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Allow thermal equilibrium before calibration
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Humidity Control
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Optimal range: 45-65% relative humidity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Prevents corrosion of sensitive components
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Reduces static electricity build-up
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Prevents condensation on cold surfaces
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Vibration and Shock
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Vibration-isolated calibration benches
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Critical for mechanical balances
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Building and traffic vibration effects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Careful transport and handling procedures
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Electromagnetic Interference
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Faraday cages for sensitive measurements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Proper earthing and grounding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Separate power and signal cables
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Clean, stable power supply required
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is the standard reference temperature for calibration and why is it important?"
          answer="The standard reference temperature is 20°C ±2°C. This is important because materials expand and contract with temperature, and electronic components have temperature coefficients. By standardising on 20°C, calibration results can be compared worldwide."
        />

        {/* Section 05 - Calibration Certificate Requirements */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Calibration Certificate Requirements</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              A calibration certificate is the official record of calibration. It must contain specific information to be valid and traceable. Understanding what should appear on a certificate helps identify fraudulent or incomplete documentation.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Administrative Details
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Unique certificate number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Calibration date and validity period
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Customer and laboratory details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Instrument identification (serial number)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Calibration standard used (with traceability)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Environmental conditions during calibration
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  Technical Information
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Measurement results at each test point
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Measurement uncertainties
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Calibration procedure reference
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Traceability statement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Adjustments made during calibration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Pass/fail conformity assessment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4 mb-10">
          <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Real World Scenario: Food Processing Plant Audit
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A food processing plant undergoes a regulatory audit. The inspector checks temperature monitoring systems critical for food safety. The technician produces UKAS-certified calibration certificates for all temperature sensors, demonstrating:
          </p>
          <ul className="text-white text-sm space-y-1 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Traceability to national temperature standards via NPL
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Calibration within the last 12 months
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Measurement uncertainty appropriate for food safety requirements (±0.5°C)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Compliance with HACCP (Hazard Analysis Critical Control Points)
            </li>
          </ul>
          <p className="text-green-400 text-sm italic">
            The plant passes the audit successfully, maintaining their food safety certification and avoiding potential production shutdowns.
          </p>
        </div>

        {/* FAQs Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What is the 4:1 accuracy ratio rule?</h3>
              <p className="text-white text-sm">
                The calibration standard should be at least 4 times more accurate than the instrument being calibrated. This ensures the uncertainty of the reference does not significantly affect the calibration result. For example, calibrating an instrument with ±1% accuracy requires a standard with at least ±0.25% accuracy.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Can I use non-UKAS calibrated equipment?</h3>
              <p className="text-white text-sm">
                Yes, but only where regulations do not require accredited calibration. Non-UKAS calibration may be acceptable for non-critical measurements or internal quality checks. However, regulated industries (food, pharmaceutical, aerospace) typically require UKAS-traceable calibration for legal compliance.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">How often should calibration equipment be recalibrated?</h3>
              <p className="text-white text-sm">
                Working standards typically require annual recalibration, though this depends on usage frequency, stability, and regulatory requirements. Equipment showing drift, damage, or out-of-tolerance readings should be recalibrated immediately regardless of schedule.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What is the difference between calibration and adjustment?</h3>
              <p className="text-white text-sm">
                Calibration is the process of comparing an instrument to a standard and recording the differences. Adjustment is the physical act of correcting the instrument to read correctly. Calibration certificates should record as-found readings before any adjustment, then as-left readings after adjustment if performed.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question="What is the primary purpose of measurement traceability in calibration?"
            options={[
              "To reduce the cost of calibration services",
              "To create an unbroken chain linking measurements to national/international standards",
              "To simplify calibration documentation requirements",
              "To eliminate the need for regular recalibration"
            ]}
            correctAnswer={1}
            explanation="Traceability creates an unbroken chain of calibrations linking a measurement to national or international standards (such as those maintained by NPL). Each step has documented uncertainty, ensuring measurements made anywhere can be compared with confidence and are legally defensible."
          />
        </section>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <Link to="/upskilling/instrumentation-module-6-section-1" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-11 touch-manipulation border-border hover:bg-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-6-section-3" className="w-full sm:w-auto">
            <Button className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section2;
