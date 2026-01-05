import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Thermometer, Target, CheckCircle, AlertTriangle, Zap, Settings, Activity, Eye, Droplets, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule2Section2QuizData } from '@/data/upskilling/bmsModule2Section2QuizData';

const BMSModule2Section2 = () => {
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  // SEO
  useEffect(() => {
    const title = 'Types of Sensors | BMS Module 2 Section 2';
    document.title = title;
    const desc = 'Learn about temperature, humidity, CO₂, and occupancy sensors in Building Management Systems. Understand sensor types, applications, wiring, and installation requirements.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const handleInlineAnswer = (checkId: string, answerIndex: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: answerIndex }));
  };

  const InlineCheck = ({ 
    id, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    id: string; 
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    explanation: string; 
  }) => {
    const selectedAnswer = inlineChecks[id];
    const showFeedback = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineAnswer(id, index)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  showFeedback
                    ? index === correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/20 text-white'
                      : 'border-gray-600 bg-gray-800 text-white'
                    : selectedAnswer === index
                    ? 'border-yellow-400 bg-yellow-600/20 text-white'
                    : 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    showFeedback
                      ? index === correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-gray-500'
                  }`}>
                    {showFeedback && index === correctAnswer && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== correctAnswer && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {!showFeedback && selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Thermometer className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Types of Sensors
                </h1>
                <p className="text-base text-white mt-2">
                  Temperature, Humidity, CO₂, and Occupancy Sensors
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 min read
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Sensors are the <strong>"eyes and ears"</strong> of a Building Management System (BMS). They provide 
                real-time data on environmental conditions so the BMS can make automatic adjustments to maintain 
                comfort, energy efficiency, and safety.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                The most common sensors electricians encounter are for <strong>temperature</strong>, <strong>humidity</strong>, 
                <strong>CO₂</strong>, and <strong>occupancy</strong>. Understanding how they work, where they are used, 
                and how they are wired is essential for correct installation and reliable building performance.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4 text-base sm:text-lg">By the end of this section, you should be able to:</p>
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Identify the four main sensor types used in BMS applications",
                  "Explain the purpose and operation of temperature, humidity, CO₂, and occupancy sensors", 
                  "Understand the signal types and wiring requirements for each sensor",
                  "Recognise common applications and installation requirements for each sensor type"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Temperature Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-yellow-400" />
                1. Temperature Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Temperature sensors measure air or water temperature and provide critical input to BMS for HVAC control, 
                energy optimisation, and comfort management.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Types of Temperature Sensors:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Thermistors (NTC/PTC)</h5>
                    <p className="text-sm text-white">Resistance changes with temperature. NTC decreases resistance as temperature rises, PTC increases resistance.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">RTDs (Pt100/Pt1000)</h5>
                    <p className="text-sm text-white">Highly accurate platinum resistance sensors. Pt100 = 100Ω at 0°C, Pt1000 = 1000Ω at 0°C.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Thermocouples</h5>
                    <p className="text-sm text-white">Used for high-temperature industrial applications and harsh environments up to 1000°C+.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Technical Specifications and Wiring</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Thermistors</h5>
                    <p className="mb-2">Common values: 10kΩ, 20kΩ at 25°C</p>
                    <p className="mb-2">Accuracy: ±0.1°C to ±0.5°C</p>
                    <p>Output: Variable resistance (requires excitation)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">RTD Sensors</h5>
                    <p className="mb-2">Temperature coefficient: 0.385Ω/°C</p>
                    <p className="mb-2">Accuracy: ±0.1°C (Class A), ±0.3°C (Class B)</p>
                    <p>Wiring: 2-wire, 3-wire, or 4-wire configurations</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Applications and Installation</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">HVAC Control</h5>
                    <p>Room temperature control, mixed air temperature, return air monitoring for comfort and energy efficiency</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Water Systems</h5>
                    <p>Chilled water temperature, heating water temperature, domestic hot water monitoring with immersion or strap-on sensors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Outside Air Compensation</h5>
                    <p>External temperature measurement for heating curve adjustment and free cooling control strategies</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Wiring and Connection Details</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Cable Requirements</h5>
                    <p>Use twisted pair screened cable, minimum 0.5mm² for power, 0.2mm² acceptable for signal. Keep separate from mains cables</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">RTD Wiring Methods</h5>
                    <p>2-wire: Simple but less accurate. 3-wire: Compensates for lead resistance. 4-wire: Most accurate, eliminates lead resistance errors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Calibration</h5>
                    <p>Use ice bath (0°C) and boiling water (100°C) for field calibration, or certified reference thermometer for accuracy verification</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check1"
                question="Give one example of where a temperature sensor is used in a BMS."
                options={[
                  "Detecting occupancy in meeting rooms",
                  "Measuring CO₂ levels in classrooms",
                  "Controlling chilled water temperature in HVAC systems", 
                  "Monitoring door security contacts"
                ]}
                correctAnswer={2}
                explanation="Temperature sensors are commonly used to monitor and control chilled water temperature in HVAC systems, ensuring optimal cooling performance and energy efficiency."
              />
            </CardContent>
          </Card>

          {/* Section 2: Humidity Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Droplets className="h-6 w-6 text-yellow-400" />
                2. Humidity Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Humidity sensors measure relative humidity (RH) in air, providing essential data for comfort control, 
                condensation prevention, and maintaining optimal indoor air quality.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Characteristics:</h4>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Measure relative humidity</strong> (0-100% RH)</li>
                  <li>• <strong>Often combined with temperature sensors</strong> in single units</li>
                  <li>• <strong>Analog outputs</strong> typically 0–10V or 4–20mA</li>
                  <li>• <strong>Digital communication</strong> via Modbus or BACnet in advanced sensors</li>
                  <li>• <strong>Transmitter versions</strong> include signal conditioning and linearisation</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Sensor Technologies and Performance</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Capacitive Sensors</h5>
                    <p className="mb-2">Most common type for HVAC applications</p>
                    <p className="mb-2">Accuracy: ±2-3% RH typical</p>
                    <p>Good long-term stability and temperature compensation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Resistive Sensors</h5>
                    <p className="mb-2">Lower cost but less stable over time</p>
                    <p className="mb-2">Accuracy: ±3-5% RH typical</p>
                    <p>More sensitive to contamination and temperature changes</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Applications and Control Strategies</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Condensation Prevention</h5>
                    <p>Monitor humidity levels to prevent condensation on windows, walls, and equipment. Typically maintain below 60% RH in occupied spaces</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Dehumidification Control</h5>
                    <p>Control mechanical dehumidifiers or chilled water coils to maintain comfort levels between 40-60% RH</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Humidification Control</h5>
                    <p>Prevent over-dry conditions in winter by controlling steam or evaporative humidifiers, especially important for health and static control</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Energy Optimisation</h5>
                    <p>Coordinate with temperature control to maintain comfort while minimising cooling and dehumidification energy use</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Installation and Environmental Considerations</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">Placement Guidelines</h5>
                    <p>Install away from direct air streams, heat sources, and moisture sources. Representative of space conditions, typically 1.5m above floor level</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Environmental Protection</h5>
                    <p>Protect from condensation, dust, and chemical contamination. Use appropriate IP ratings for wet or dusty environments</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Calibration Requirements</h5>
                    <p>Use certified salt solutions (75.3% sodium chloride = 75% RH) or traceable humidity calibrators for verification</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Maintenance Needs</h5>
                    <p>Regular cleaning of sensor elements, replacement of filter elements where fitted, annual calibration checks recommended</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Signal Processing and Troubleshooting</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Signal Conditioning</h5>
                    <p>Temperature compensation, linearisation, and filtering typically built into transmitter versions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Common Problems</h5>
                    <p>Drift due to contamination, condensation damage, temperature effects on uncalibrated sensors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Testing Methods</h5>
                    <p>Use portable hygrometers for comparison, check against weather station data for external sensors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Fault Diagnosis</h5>
                    <p>Check power supply, signal continuity, sensor element condition, and environmental factors affecting reading</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="What type of output signal do most humidity sensors provide?"
                options={[
                  "Digital on/off switching only",
                  "Analog signals (0-10V or 4-20mA)",
                  "High-frequency pulse trains",
                  "230V relay contact switching"
                ]}
                correctAnswer={1}
                explanation="Most humidity sensors provide analog output signals (0-10V or 4-20mA) that correspond to the relative humidity percentage, allowing precise monitoring and control by the BMS."
              />
            </CardContent>
          </Card>

          {/* Section 3: CO₂ Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Wind className="h-6 w-6 text-yellow-400" />
                3. CO₂ Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                CO₂ sensors measure carbon dioxide levels in parts per million (ppm) and provide essential input for 
                demand-controlled ventilation systems, ensuring good air quality and energy efficiency.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">CO₂ Level Guidelines:</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-2">Typical Levels</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Outside air:</strong> 400-450 ppm</li>
                      <li>• <strong>Good indoor air:</strong> 400-700 ppm</li>
                      <li>• <strong>Acceptable:</strong> 700-1000 ppm</li>
                      <li>• <strong>Stuffy/drowsy:</strong> 1000-2000 ppm</li>
                      <li>• <strong>Poor air quality:</strong> &gt;2000 ppm</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Control Setpoints</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Ventilation increase:</strong> 1000 ppm</li>
                      <li>• <strong>Maximum ventilation:</strong> 1500 ppm</li>
                      <li>• <strong>Alarm level:</strong> 2000 ppm</li>
                      <li>• <strong>Immediate action:</strong> 5000 ppm</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Sensor Technology and Operation</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">NDIR (Non-Dispersive Infrared)</h5>
                    <p>Most common technology. Uses infrared light absorption at 4.26μm wavelength specific to CO₂. Highly accurate and stable over time</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Dual Beam Technology</h5>
                    <p>Reference beam compensates for lamp aging and drift, providing long-term stability and reducing maintenance requirements</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Auto-Calibration</h5>
                    <p>Automatic baseline correction (ABC) assumes lowest reading over 7 days represents outside air (~400ppm) for self-calibration</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Temperature/Pressure Compensation</h5>
                    <p>Built-in compensation for temperature and barometric pressure changes that affect gas density and reading accuracy</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Demand-Controlled Ventilation Applications</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Occupancy-Based Control</h5>
                    <p>CO₂ levels indicate actual occupancy and metabolic activity, allowing ventilation to match real demand rather than designed maximum occupancy</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Energy Savings</h5>
                    <p>Reduce fan energy and heating/cooling loads by providing only the ventilation needed to maintain air quality standards</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Multi-Zone Control</h5>
                    <p>Different zones can have different ventilation rates based on their specific CO₂ levels and occupancy patterns</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Integration with HVAC</h5>
                    <p>Coordinate with temperature control to maintain comfort while optimising fresh air quantities and energy consumption</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Installation and Commissioning</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">Strategic Placement</h5>
                    <p>Install in return air paths or representative locations within occupied zones. Avoid direct ventilation air streams and outdoor air intakes</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Calibration Procedures</h5>
                    <p>Use certified CO₂ calibration gas (typically 1000ppm and 2000ppm) during commissioning. Fresh air calibration at 400ppm baseline</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Warm-up Period</h5>
                    <p>Allow 30-60 minutes warm-up time after power-on for stable readings. NDIR sensors need thermal stabilisation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Maintenance Schedule</h5>
                    <p>Clean optical windows annually, check calibration every 2-3 years, replace sensors every 10-15 years depending on environment</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Standards and Compliance</h4>
                <div className="space-y-2 text-amber-100 text-sm">
                  <p><strong>Building Regulations Part F:</strong> Adequate ventilation requirements for health and comfort</p>
                  <p><strong>CIBSE Guide B:</strong> Recommended CO₂ levels and ventilation rates for different building types</p>
                  <p><strong>EN 13779:</strong> European standard for ventilation and air conditioning systems</p>
                  <p><strong>ASHRAE 62.1:</strong> Minimum ventilation rates for acceptable indoor air quality</p>
                  <p><strong>BS EN 16798-3:</strong> Energy performance assessment using demand-controlled ventilation</p>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="Why does a BMS increase ventilation when CO₂ levels rise?"
                options={[
                  "To reduce energy consumption in the building",
                  "To ensure good air quality and prevent drowsiness",
                  "To lower the room temperature automatically",
                  "To activate fire safety systems"
                ]}
                correctAnswer={1}
                explanation="When CO₂ levels rise, it indicates poor air quality and insufficient fresh air. The BMS increases ventilation to bring in fresh air, maintaining good indoor air quality and preventing occupant drowsiness and discomfort."
              />
            </CardContent>
          </Card>

          {/* Section 4: Occupancy Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                4. Occupancy Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Occupancy sensors detect whether spaces are occupied and provide digital input signals to control 
                lighting, HVAC, and security systems, helping reduce energy waste and improve building efficiency.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Sensor Technologies:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">PIR (Passive Infrared)</h5>
                    <p className="text-sm text-white">Detects body heat movement, most common type, good for general occupancy detection</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Ultrasonic</h5>
                    <p className="text-sm text-white">Detects motion using sound waves, sensitive to small movements, good for fine motor activity</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Dual-Technology</h5>
                    <p className="text-sm text-white">Combines PIR and ultrasonic for enhanced accuracy and reduced false triggering</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Microwave</h5>
                    <p className="text-sm text-white">High sensitivity, can detect through thin barriers, used in specialised applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Technical Specifications and Performance</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">PIR Sensors</h5>
                    <p className="mb-2">Detection range: 5-20m typical</p>
                    <p className="mb-2">Coverage angle: 90° to 360°</p>
                    <p className="mb-2">Sensitivity: Adjustable detection threshold</p>
                    <p>Response time: 1-5 seconds typical</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Ultrasonic Sensors</h5>
                    <p className="mb-2">Frequency: 25-40 kHz typical</p>
                    <p className="mb-2">Detection: Doppler shift measurement</p>
                    <p className="mb-2">Sensitivity: Detects small movements</p>
                    <p>Coverage: 360° spherical pattern</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Applications and Control Integration</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Lighting Control</h5>
                    <p>Automatic switching of lights in offices, meeting rooms, corridors. Dimming integration for energy savings and daylight harvesting</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">HVAC Control</h5>
                    <p>Setback temperatures in unoccupied spaces, ventilation reduction, equipment scheduling based on actual occupancy patterns</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Security Integration</h5>
                    <p>After-hours occupancy detection, intrusion monitoring, integration with access control and CCTV systems</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Energy Management</h5>
                    <p>Equipment shutdown in unoccupied areas, load shedding strategies, occupancy-based energy reporting and analysis</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Installation Guidelines and Coverage</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">Mounting Height</h5>
                    <p>PIR: 2.4-3.0m optimal height. Ultrasonic: 2.4-4.0m ceiling mount preferred. Consider furniture and partition heights</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Coverage Patterns</h5>
                    <p>Account for dead zones behind furniture, ensure adequate overlap in large spaces, consider traffic patterns and work areas</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Environmental Considerations</h5>
                    <p>Avoid heat sources for PIR, consider air movement for ultrasonic. Protect from direct sunlight and vibration sources</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Zone Planning</h5>
                    <p>Match sensor zones to lighting circuits and HVAC zones. Consider privacy requirements and open office layouts</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Commissioning and Fine-tuning</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Sensitivity Adjustment</h5>
                    <p>Test detection patterns with actual occupant movements, adjust sensitivity to eliminate false triggers from HVAC air movement</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Time Delay Settings</h5>
                    <p>On-delay: 0-30 seconds typical. Off-delay: 5-30 minutes based on application. Longer delays for HVAC, shorter for lighting</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Walk Testing</h5>
                    <p>Systematic testing of coverage areas, verify no dead zones in critical work areas, document detection patterns</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Integration Testing</h5>
                    <p>Verify correct BMS integration, test manual overrides, check status indication and alarm functions</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Troubleshooting Common Issues</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">False Triggers</h5>
                    <p>Check for air movement, temperature changes, small animals, or vibration sources affecting sensor operation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">Missed Detection</h5>
                    <p>Verify mounting height, check for obstructions, test sensitivity settings, ensure adequate coverage overlap</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">Inconsistent Operation</h5>
                    <p>Check power supply stability, verify wiring connections, test in different environmental conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">Maintenance Issues</h5>
                    <p>Clean sensor lenses regularly, check for LED failure indication, verify proper earth connections</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check4"
                question="What type of sensor is commonly used to detect movement in offices?"
                options={[
                  "Temperature sensor for heat detection",
                  "PIR (Passive Infrared) sensor",
                  "CO₂ sensor for breathing detection",
                  "Humidity sensor for air quality"
                ]}
                correctAnswer={1}
                explanation="PIR (Passive Infrared) sensors are commonly used to detect occupancy in offices. They detect movement by sensing changes in infrared radiation from warm bodies moving through their detection zone."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Practical Guidance for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-200 mb-3">Essential Installation Practices</h4>
                <ul className="space-y-2 text-yellow-100">
                  <li>• <strong>Signal verification:</strong> Always confirm whether a sensor uses analog (0–10V, 4–20mA) or digital (on/off) output before wiring</li>
                  <li>• <strong>Strategic positioning:</strong> Position sensors carefully — avoid direct sunlight for temperature, draughts for humidity, and obstructions for occupancy sensors</li>
                  <li>• <strong>Calibration requirements:</strong> Calibrate CO₂ sensors during commissioning to ensure accuracy using certified calibration gases</li>
                  <li>• <strong>Documentation:</strong> Label and record sensor locations, types, and settings for easier troubleshooting and maintenance</li>
                  <li>• <strong>Cable separation:</strong> Keep sensor signal cables separate from mains power cables to prevent interference</li>
                  <li>• <strong>Environmental protection:</strong> Use appropriate IP ratings and consider environmental factors affecting each sensor type</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-3">School Ventilation System Installation</h4>
                <div className="space-y-3 text-red-100">
                  <div>
                    <h5 className="font-medium text-red-300">The Problem</h5>
                    <p className="text-sm">
                      A school installed CO₂ sensors in classrooms to control ventilation for improved air quality. 
                      Initially, some sensors were placed too close to open windows, giving false low readings from 
                      the incoming fresh air.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">The Consequence</h5>
                    <p className="text-sm">
                      As a result, ventilation fans did not activate when needed, leading to poor air quality during 
                      occupied periods. Students and teachers experienced drowsiness and reduced concentration, 
                      particularly during afternoon classes.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">The Solution</h5>
                    <p className="text-sm">
                      After repositioning the sensors correctly away from windows and fresh air intakes, the system 
                      functioned as intended. CO₂ levels were accurately detected, triggering appropriate ventilation 
                      when occupancy and air quality demanded it.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Lessons Learned</h5>
                    <p className="text-sm">
                      Proper sensor placement is critical for system performance. Consider airflow patterns, external 
                      influences, and representative measurement locations during installation planning.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-blue-300 mb-2">Temperature Sensors</h5>
                    <p className="text-sm text-blue-100">Control HVAC and water systems using thermistors, RTDs, or thermocouples depending on accuracy and temperature range requirements.</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-green-300 mb-2">Humidity Sensors</h5>
                    <p className="text-sm text-green-100">Prevent condensation and maintain comfort by monitoring relative humidity levels and controlling dehumidification systems.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-purple-300 mb-2">CO₂ Sensors</h5>
                    <p className="text-sm text-purple-100">Ensure good air quality and trigger demand-controlled ventilation based on actual occupancy levels and metabolic activity.</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-amber-300 mb-2">Occupancy Sensors</h5>
                    <p className="text-sm text-amber-100">Reduce energy waste by detecting presence and automatically controlling lighting, HVAC, and security systems.</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mt-4">
                <h5 className="font-medium text-red-300 mb-2">Key Installation Principle</h5>
                <p className="text-sm text-red-100">
                  <strong>Correct installation and positioning are essential for accurate performance.</strong> Consider environmental factors, 
                  signal types, calibration requirements, and integration with building systems during planning and commissioning phases.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule2Section2QuizData}
                title="Types of Sensors Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
            <div className="flex justify-between pt-8">
            <Link to="../bms-module-2-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-2-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BMSModule2Section2;