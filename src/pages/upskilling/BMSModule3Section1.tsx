import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Wind, CheckCircle, AlertTriangle, Target, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule3Section1QuizData } from '@/data/upskilling/bmsModule3Section1QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule3Section1 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null,
  });

  useEffect(() => {
    document.title = 'HVAC Systems in BMS | BMS Module 3 Section 1';
    const desc = 'Learn how AHU, FCU, chillers, and boilers integrate with Building Management Systems for efficient HVAC control and energy optimisation.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const handleInlineCheck = (checkId: string, selectedAnswer: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: selectedAnswer }));
  };

  const InlineCheckComponent = ({ 
    checkId, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    checkId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }) => {
    const selectedAnswer = inlineChecks[checkId];
    const isAnswered = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineCheck(checkId, index)}
                disabled={isAnswered}
                className="w-full text-left p-3 rounded-lg border border-gray-600 bg-gray-800 text-white hover:border-gray-500"
              >
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>
          {isAnswered && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Wind className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  HVAC Systems in BMS
                </h1>
                <p className="text-base text-white mt-2">
                  AHU, FCU, Chillers, and Boilers Integration
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                18 min read
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
                HVAC systems form the backbone of most Building Management Systems (BMS). They consume the most energy in a building, so controlling them efficiently is key to cutting costs and maintaining comfort. Without integration, HVAC runs on fixed schedules or manual adjustments, often wasting energy.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                By linking Air Handling Units (AHUs), Fan Coil Units (FCUs), chillers, and boilers into the BMS, buildings gain smarter control: heating or cooling only when needed, air quality maintained automatically, and systems monitored in real time.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                For electricians, HVAC integration means more than just pulling cables. It requires understanding how these systems operate, what signals they use, and how to wire/control them so the BMS can make intelligent decisions.
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
                  "Describe the role of AHUs, FCUs, chillers, and boilers in building environments",
                  "Explain how BMS optimises HVAC operation for efficiency and comfort",
                  "Understand the electrician's responsibilities during HVAC integration",
                  "Apply best practice installation and testing methods"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Air Handling Units (AHUs) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                1. Air Handling Units (AHUs)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                An Air Handling Unit is a large mechanical system designed to condition and circulate air through ducts. It may heat, cool, filter, and dehumidify air before supplying it to occupied spaces.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Components:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Filters</h5>
                    <p className="text-sm text-white">Remove particles and contaminants, monitored by differential pressure sensors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Heating/Cooling Coils</h5>
                    <p className="text-sm text-white">Condition air temperature using hot/chilled water or refrigerant</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Supply/Return Fans</h5>
                    <p className="text-sm text-white">Move air through ductwork, controlled by VFDs</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Dampers</h5>
                    <p className="text-sm text-white">Control fresh air intake, return air, and relief air mixing</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">BMS Integration</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Fan Control</h5>
                    <p>Controls fans via digital or analog outputs (on/off or variable speed)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Damper Control</h5>
                    <p>Adjusts dampers using actuators to bring in fresh or recirculated air</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Filter Monitoring</h5>
                    <p>Monitors filters and alarms when replacement is needed</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Temperature Sequencing</h5>
                    <p>Sequences heating/cooling based on supply air temperature setpoints</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Electrical Connections</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Temperature Sensors</h5>
                    <p>Supply, return, mixed air sensors wired to analog inputs</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Status Monitoring</h5>
                    <p>Fan status monitoring via auxiliary contacts on motor starters</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Speed Control</h5>
                    <p>VFD speed control using 0-10V or 4-20mA analog outputs</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Real-World Example</h4>
                <p className="text-green-100 text-sm">In a theatre, an AHU linked to CO₂ sensors increases ventilation automatically when occupancy levels rise. This improves comfort while saving energy compared to running fans at full speed constantly.</p>
              </div>

              <InlineCheckComponent
                checkId="check1"
                question="Why would a BMS increase AHU airflow when CO₂ levels rise?"
                options={[
                  "To reduce energy consumption",
                  "To indicate higher occupancy requiring more fresh air",
                  "To test the ventilation system",
                  "To cool down the space"
                ]}
                correctAnswer={1}
                explanation="Higher CO₂ levels indicate more people in the space, requiring increased fresh air ventilation to maintain air quality and comfort for occupants."
              />
            </CardContent>
          </Card>

          {/* Section 2: Fan Coil Units (FCUs) */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">2. Fan Coil Units (FCUs)</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p>
                Fan Coil Units are smaller, decentralised HVAC devices often located in individual rooms or zones. They contain a coil that passes hot or chilled water and a fan that blows conditioned air into the space.
              </p>
              
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Installation Types:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Ceiling-Mounted:</strong> Hidden above false ceiling, ducted to room via grilles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Wall-Mounted:</strong> Visible units on walls, direct air discharge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Floor-Standing:</strong> Cabinet units, often in plant rooms or cupboards</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Control Components:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>2-Port Control Valve:</strong> Modulates hot/chilled water flow through coil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Room Thermostat:</strong> Senses temperature and provides setpoint control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Fan Speed Control:</strong> 3-speed or variable speed via triac/VFD</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">BMS Integration:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Room thermostats or occupancy sensors feed data to the BMS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>The BMS adjusts fan speed and water flow to match demand.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Units can be scheduled to switch off automatically in unoccupied rooms.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Wiring Considerations:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Separate mains supply for fan motor and low voltage for controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Valve actuator wiring: typically 24V AC or 230V depending on type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>BMS communication cables for remote monitoring and control</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                <p className="text-blue-200">
                  <strong>Example in practice:</strong> In a hotel, FCUs are controlled by occupancy sensors — when a guest leaves, the unit turns off, preventing wasted heating or cooling.
                </p>
              </div>

              <InlineCheckComponent
                checkId="check2"
                question="Why do FCUs often suit hotels and offices more than AHUs?"
                options={[
                  "FCUs are cheaper to install",
                  "FCUs provide individual room/zone control",
                  "FCUs use less electricity",
                  "FCUs don't require maintenance"
                ]}
                correctAnswer={1}
                explanation="FCUs provide individual room or zone control, making them ideal for hotels and offices where different spaces may have different occupancy patterns and comfort requirements."
              />
            </CardContent>
          </Card>

          {/* Section 3: Chillers */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">3. Chillers</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p>
                A chiller is a centralised unit that removes heat from water to supply chilled water for cooling systems. It typically serves large buildings with significant cooling demand.
              </p>
              
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Compressor Types:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Reciprocating:</strong> Smaller capacity, good for part-load efficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Screw:</strong> Medium to large capacity, robust and reliable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Centrifugal:</strong> Large capacity, high efficiency at full load</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Condenser Systems:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Air-Cooled:</strong> Outdoor condenser fans reject heat to atmosphere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Water-Cooled:</strong> Uses cooling tower to reject heat, more efficient</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Evaporative:</strong> Combines air and water cooling methods</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Control Loops:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Chilled Water Temperature:</strong> Primary control loop maintains leaving water temperature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Capacity Control:</strong> Unloading/loading compressor stages based on load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Anti-Surge:</strong> Prevents compressor damage during low load conditions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">BMS Integration:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Controls compressor staging to match cooling demand.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Adjusts chilled water setpoints based on outdoor conditions (e.g., warmer water in mild weather = less energy wasted).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Optimises pump operation for efficiency.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Safety Interlocks:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Low evaporator water temperature protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>High/low refrigerant pressure cutouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Minimum water flow switches on evaporator and condenser</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                <p className="text-blue-200">
                  <strong>Example in practice:</strong> In an office block, chillers are sequenced so only one runs at low demand, but two or three start automatically in peak summer. This avoids unnecessary energy use while maintaining comfort.
                </p>
              </div>

              <InlineCheckComponent
                checkId="check3"
                question="What is the benefit of sequencing multiple chillers rather than running all of them constantly?"
                options={[
                  "It reduces installation costs",
                  "It matches cooling output to demand, avoiding waste",
                  "It makes maintenance easier",
                  "It reduces noise levels"
                ]}
                correctAnswer={1}
                explanation="Sequencing chillers matches cooling output to actual demand, running only what's needed. Multiple chillers at part-load are less efficient than fewer chillers at optimal load."
              />
            </CardContent>
          </Card>

          {/* Section 4: Boilers */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">4. Boilers</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p>
                Boilers provide hot water or steam for space heating and hot water distribution.
              </p>
              
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Burner Controls:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Single Stage:</strong> Simple on/off operation for small boilers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Two Stage:</strong> Low/high fire for better load matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Modulating:</strong> Continuous adjustment of gas/oil flow rate</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Safety Systems:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Flame Detection:</strong> UV or ionisation probes ensure safe ignition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>High Limit Controls:</strong> Prevent overheating and pressure buildup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Low Water Cutoff:</strong> Shuts down if water level drops too low</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Combustion Air Proving:</strong> Ensures adequate air supply before ignition</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">BMS Integration:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Monitors return water temperature and fires boilers only when required.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Controls pumps, valves, and burner stages to match demand.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Provides safety interlocks (e.g., shut-down if overheating occurs).</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Pump Sequencing:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Lead/Lag Operation:</strong> Alternates primary pump to equalise wear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Variable Speed:</strong> Adjusts pump speed to maintain pressure differential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Standby Protection:</strong> Exercises standby pumps to prevent seizure</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Maintenance Requirements:</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Annual gas safety inspections and flue gas analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Regular water treatment and boiler water testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Cleaning of heat exchangers and combustion chambers</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                <p className="text-blue-200">
                  <strong>Example in practice:</strong> In a school, boilers are scheduled via the BMS to pre-heat classrooms 1 hour before lessons, then reduce output during empty periods. This cuts fuel bills significantly compared to running boilers all day.
                </p>
              </div>

              <InlineCheckComponent
                checkId="check4"
                question="How does scheduling boilers through BMS reduce wasted fuel?"
                options={[
                  "By running boilers at maximum output all day",
                  "By heating spaces only when occupied or just before occupancy",
                  "By using electric heating instead",
                  "By reducing the number of boilers installed"
                ]}
                correctAnswer={1}
                explanation="BMS scheduling allows boilers to heat spaces only when needed or just before occupancy, rather than maintaining temperature continuously during unoccupied periods, significantly reducing fuel consumption."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Practical Guidance</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p className="font-semibold">For electricians, HVAC integration involves:</p>
              
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Wiring sensors such as temperature, pressure, and flow sensors into BMS input terminals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Connecting actuators on valves and dampers so the BMS can open/close them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Ensuring correct segregation between mains wiring (pumps, fans) and low-voltage control signals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Testing circuits so commissioning engineers can program sequences with confidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Labelling all control points — poor documentation causes delays and troubleshooting headaches later.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Real World Example</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p>
                At a shopping centre in Leeds, HVAC consumed over half of total energy use. By integrating AHUs, FCUs, chillers, and boilers into the BMS, operators introduced smarter sequencing:
              </p>
              
              <ul className="space-y-2 ml-4 my-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>AHUs reduced speed when CO₂ was low.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Boilers fired only when heating demand exceeded set thresholds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Chillers were staged based on load demand.</span>
                </li>
              </ul>
              
              <div className="bg-card border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200">
                  <strong>Result:</strong> The result was a 25% reduction in HVAC energy costs in the first year. The key success factor was accurate wiring and sensor placement carried out by the electrical team — without it, the BMS would have been blind.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>HVAC systems are the largest energy load in most buildings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>AHUs condition and circulate air for large spaces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>FCUs provide localised comfort control in zones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Chillers supply chilled water for cooling, often staged for efficiency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Boilers provide hot water or steam for heating and domestic use.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>A BMS integrates these systems to reduce energy use, improve comfort, and automate operation.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your understanding of HVAC systems integration with BMS. This quiz covers AHUs, FCUs, chillers, boilers, and practical applications.
              </p>
              <SingleQuestionQuiz 
                questions={bmsModule3Section1QuizData} 
                title="HVAC Systems in BMS Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between'} pt-8`}>
            <Link to="../bms-module-3" className={isMobile ? 'w-full' : ''}>
              <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full py-3' : ''}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 3
              </Button>
            </Link>
            <Link to="../bms-module-3-section-2" className={isMobile ? 'w-full' : ''}>
              <Button className={`bg-yellow-400 text-black hover:bg-yellow-600 ${isMobile ? 'w-full py-3' : ''}`}>
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

export default BMSModule3Section1;