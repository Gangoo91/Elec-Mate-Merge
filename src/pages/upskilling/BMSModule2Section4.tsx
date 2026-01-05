import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Target, CheckCircle, AlertTriangle, Thermometer, Eye, Wind, Crosshair, Ruler, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule2Section4QuizData } from '@/data/upskilling/bmsModule2Section4QuizData';

const BMSModule2Section4 = () => {
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  // SEO
  useEffect(() => {
    const title = 'Sensor Placement and Accuracy | BMS Module 2 Section 4';
    document.title = title;
    const desc = 'Learn sensor placement best practices for BMS installations. Understand positioning requirements for temperature, humidity, CO₂, and occupancy sensors for optimal accuracy.';
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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              <MapPin className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Sensor Placement and Accuracy Considerations
                </h1>
                <p className="text-base text-white mt-2">
                  Installation best practices for optimal sensor performance
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 4
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
                Even the best sensors will give poor results if they are installed in the wrong place. Sensor placement 
                directly affects accuracy, reliability, and ultimately the performance of the entire Building Management System (BMS).
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Electricians are often responsible for installing these devices, so understanding best practices is essential 
                for avoiding false readings, wasted energy, client complaints, and system performance issues that can persist 
                for years if not identified and corrected.
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
                  "Explain why correct sensor placement is critical for BMS installation success",
                  "Identify best practices for positioning temperature, humidity, CO₂, and occupancy sensors", 
                  "Understand common causes of inaccurate sensor readings and how to avoid them",
                  "Apply systematic installation checks to improve sensor accuracy and long-term reliability"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Why Placement Matters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Crosshair className="h-6 w-6 text-yellow-400" />
                1. Why Placement Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Sensors must represent true environmental conditions to provide reliable data for BMS control decisions. 
                Poor placement creates a cascade of problems throughout the entire building automation system.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">The Impact Chain:</h4>
                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Incorrect Placement</h5>
                      <p className="text-sm text-white">Sensor installed in non-representative location</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">False Readings</h5>
                      <p className="text-sm text-white">Sensor provides data that doesn't reflect actual conditions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Poor System Control</h5>
                      <p className="text-sm text-white">BMS makes inappropriate control decisions based on bad data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">System Performance Issues</h5>
                      <p className="text-sm text-white">Energy waste, occupant discomfort, equipment stress, and system faults</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Common Consequences of Poor Placement</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Energy Waste</h5>
                    <p className="mb-2">Overcooling/overheating based on false readings</p>
                    <p>Unnecessary ventilation or inadequate air changes</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Occupant Discomfort</h5>
                    <p className="mb-2">Temperature swings and poor air quality</p>
                    <p>Inconsistent environmental conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Equipment Stress</h5>
                    <p className="mb-2">Hunting and cycling of HVAC equipment</p>
                    <p>Premature wear and increased maintenance</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">System Faults</h5>
                    <p className="mb-2">False alarms and unnecessary service calls</p>
                    <p>Difficulty in commissioning and troubleshooting</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Representative vs Non-Representative Locations</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Representative Locations</h5>
                    <p>Locations that accurately reflect the conditions experienced by occupants or the system being controlled</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Non-Representative Locations</h5>
                    <p>Locations influenced by localised conditions (heat sources, draughts, sunlight) that don't reflect general space conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Assessment Criteria</h5>
                    <p>Consider air mixing, heat sources, occupancy patterns, and the specific control function the sensor serves</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Example: Temperature Sensor Near Heater</h4>
                <div className="space-y-2 text-amber-100 text-sm">
                  <p><strong>Problem:</strong> Temperature sensor placed near a radiator or heating vent</p>
                  <p><strong>False Reading:</strong> Sensor reads higher temperature than actual room average</p>
                  <p><strong>System Response:</strong> BMS reduces heating or increases cooling unnecessarily</p>
                  <p><strong>Result:</strong> Rest of room becomes too cold while area near heater remains warm</p>
                  <p><strong>Solution:</strong> Relocate sensor to representative location away from heat sources</p>
                </div>
              </div>

              <InlineCheck
                id="check1"
                question="Why does poor sensor placement lead to poor system performance?"
                options={[
                  "Sensors become more expensive to maintain",
                  "False readings cause inappropriate BMS control decisions",
                  "Poor placement makes sensors harder to access",
                  "Sensors placed incorrectly consume more power"
                ]}
                correctAnswer={1}
                explanation="Poor sensor placement leads to false readings, which cause the BMS to make inappropriate control decisions. This creates a cascade of problems including energy waste, occupant discomfort, and equipment stress."
              />
            </CardContent>
          </Card>

          {/* Section 2: Temperature & Humidity Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-yellow-400" />
                2. Temperature & Humidity Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Temperature and humidity sensors require careful positioning to avoid external influences that can 
                compromise accuracy and lead to poor HVAC control performance.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Optimal Placement Guidelines:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Mounting Height</h5>
                    <p className="text-sm text-white">1.2–1.5m above floor level for room sensors - represents average occupant breathing zone</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Distance from Heat Sources</h5>
                    <p className="text-sm text-white">Minimum 1.5m from radiators, heaters, direct sunlight, or equipment generating heat</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Air Movement Considerations</h5>
                    <p className="text-sm text-white">Avoid direct airflow from vents, draughts from doors/windows, or areas with poor air mixing</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Structural Placement</h5>
                    <p className="text-sm text-white">Mount on internal walls where possible - external walls subject to thermal bridging effects</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Room Sensor Installation Details</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Wall Selection</h5>
                    <p>Internal walls preferred - avoid external walls with thermal bridging. Consider wall construction and insulation quality</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Clearance Requirements</h5>
                    <p>Minimum 150mm from corners, 500mm from doors, 1000mm from windows. Allow air circulation around sensor housing</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Occupancy Zone Considerations</h5>
                    <p>Place in areas representative of occupant experience - avoid dead air zones or areas with unusual conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Multiple Zone Applications</h5>
                    <p>For large spaces, consider multiple sensors with averaging or zone-specific control strategies</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Duct Sensor Installation</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Airflow Sampling Location</h5>
                    <p>Install in straight duct sections with minimum 5 duct diameters upstream and 3 downstream of bends, dampers, or coils</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Insertion Depth</h5>
                    <p>Penetrate to centre third of duct for accurate reading. Use averaging sensors for large ducts or non-uniform airflow</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Sealing and Insulation</h5>
                    <p>Proper duct penetration sealing to prevent air leakage. Insulate sensor housing to prevent condensation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Velocity Considerations</h5>
                    <p>Minimum 2.5 m/s air velocity required for accurate readings. Higher velocities improve response time and accuracy</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Environmental Factors and Mitigation</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">Solar Gain Effects</h5>
                    <p>Direct sunlight can cause temperature readings 5-10°C higher than actual. Use sun shields or relocate sensors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Thermal Mass Influences</h5>
                    <p>Heavy masonry walls or large thermal masses can delay sensor response. Consider wall material when positioning</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Humidity Stratification</h5>
                    <p>Humidity can vary significantly with height. Position sensors at representative levels for space conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Microclimatic Effects</h5>
                    <p>Local conditions like air circulation patterns, thermal plumes, or equipment heat can create microclimates to avoid</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Installation Quality Checks</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Pre-Installation Survey</h5>
                    <p>Map heat sources, air movement patterns, typical occupancy areas, and potential interference sources</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Temporary Monitoring</h5>
                    <p>Use portable instruments to verify conditions at proposed locations before permanent installation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Comparative Testing</h5>
                    <p>Compare new sensor readings with calibrated reference instruments and existing sensors in similar conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Seasonal Verification</h5>
                    <p>Check sensor performance under different seasonal conditions to identify placement issues not apparent initially</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="Why should wall-mounted temperature sensors not be installed near windows or radiators?"
                options={[
                  "Windows and radiators are difficult to access for maintenance",
                  "Solar gain and heat from radiators cause false temperature readings",
                  "Windows and radiators may interfere with wireless signals",
                  "Building regulations prohibit sensors near these locations"
                ]}
                correctAnswer={1}
                explanation="Solar gain from windows and heat from radiators cause false temperature readings that don't represent actual room conditions, leading to poor temperature control and occupant discomfort."
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
                CO₂ sensors must be positioned to accurately measure the air quality in breathing zones while avoiding 
                areas where fresh air dilution or poor air mixing could provide non-representative readings.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Breathing Zone Placement:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Height Requirements</h5>
                    <p className="text-sm text-white">1–2m above floor level in occupied spaces - within the breathing zone where CO₂ impacts occupants</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Zone Representation</h5>
                    <p className="text-sm text-white">Position to represent average occupancy conditions, not peak or minimum occupancy areas</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Air Mixing Considerations</h5>
                    <p className="text-sm text-white">Ensure adequate air mixing - avoid dead air zones or areas with poor circulation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Multiple Occupancy Zones</h5>
                    <p className="text-sm text-white">Large spaces may require multiple sensors to represent different occupancy patterns</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Locations to Avoid</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Fresh Air Intakes and Grilles</h5>
                    <p>Direct exposure to fresh air causes false low readings, leading to under-ventilation when sensors read low CO₂</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Windows and Doors</h5>
                    <p>Openable windows and frequently used doors create variable fresh air infiltration affecting sensor accuracy</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Dead Air Zones</h5>
                    <p>Corners, behind large furniture, or areas with poor air circulation don't represent general space conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">High Air Movement Areas</h5>
                    <p>Direct airflow from HVAC outlets can dilute CO₂ readings and provide non-representative measurements</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Return Air Duct Installation</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Well-Mixed Airflow</h5>
                    <p>Install where return air is well-mixed, representing average space CO₂ levels rather than local variations</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Distance from Air Inlets</h5>
                    <p>Sufficient distance downstream from any fresh air injection points to ensure representative mixed air sampling</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Duct Sizing Considerations</h5>
                    <p>Large ducts may require averaging sensors or multiple measurement points for accurate CO₂ determination</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Access for Calibration</h5>
                    <p>Ensure adequate access for periodic calibration with certified CO₂ test gases during maintenance</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Calibration and Commissioning</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Baseline Calibration</h5>
                    <p>Calibrate to fresh air baseline (typically 400-450 ppm) using certified reference gas or fresh air measurement</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Span Calibration</h5>
                    <p>Verify accuracy at elevated CO₂ levels using certified test gases (typically 1000 ppm and 2000 ppm)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Automatic Baseline Correction</h5>
                    <p>Many sensors feature ABC (Automatic Baseline Correction) assuming lowest weekly reading represents fresh air</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Environmental Compensation</h5>
                    <p>Verify temperature and pressure compensation settings match local conditions for accurate CO₂ measurement</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Space-Specific Considerations</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Classrooms</h5>
                    <p>High occupancy density requires responsive sensors. Avoid locations near doors where students congregate</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Offices</h5>
                    <p>Variable occupancy patterns - position to represent typical occupancy, not meeting rooms or break areas</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Auditoriums</h5>
                    <p>Large spaces may need multiple sensors due to occupancy variations and air mixing challenges</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Laboratories</h5>
                    <p>Consider fume hood effects and specialized ventilation requirements that affect CO₂ distribution</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="Why should CO₂ sensors not be installed next to ventilation grilles?"
                options={[
                  "Ventilation grilles are too noisy for proper sensor operation",
                  "Fresh air from grilles causes false low CO₂ readings",
                  "Grilles may physically damage the sensitive sensor elements",
                  "Vibration from grilles affects sensor calibration"
                ]}
                correctAnswer={1}
                explanation="Fresh air from ventilation grilles causes false low CO₂ readings because the sensor detects the low CO₂ content of the incoming fresh air rather than the representative CO₂ levels in the occupied space."
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
                Occupancy sensors require strategic placement to ensure reliable detection while minimising false triggers 
                from environmental factors or equipment operation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Detection Coverage Requirements:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Clear Line of Sight</h5>
                    <p className="text-sm text-white">Unobstructed view of all areas requiring occupancy detection - no furniture, partitions, or equipment blocking</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Coverage Pattern Analysis</h5>
                    <p className="text-sm text-white">Map sensor detection patterns against actual room layout and typical occupancy areas</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Overlap Considerations</h5>
                    <p className="text-sm text-white">Multiple sensors may be needed for large spaces - ensure appropriate overlap without interference</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Height Optimisation</h5>
                    <p className="text-sm text-white">Balance between coverage area and sensitivity - higher mounting increases coverage but reduces sensitivity</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">PIR Sensor Installation Guidelines</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Mounting Height</h5>
                    <p>2.4-3.0m optimal for most applications. Higher mounting reduces sensitivity but increases coverage area</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Heat Source Avoidance</h5>
                    <p>Minimum 3m from radiators, heaters, or hot water pipes. Direct sunlight can cause false triggers</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Air Movement Effects</h5>
                    <p>Avoid locations with strong air currents that may move heat sources (plants, curtains) causing false detection</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Detection Zones</h5>
                    <p>Consider minor motion vs major motion detection areas. Adjust sensitivity based on application requirements</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Ultrasonic Sensor Considerations</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Airflow Sensitivity</h5>
                    <p>More sensitive to small movements but affected by air currents from HVAC systems causing false triggers</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Sound Reflection</h5>
                    <p>Consider room acoustics and sound-absorbing materials that may affect detection performance</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Interference Sources</h5>
                    <p>Avoid locations near other ultrasonic devices, compressed air equipment, or high-frequency noise sources</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Coverage Patterns</h5>
                    <p>360° spherical detection pattern requires careful positioning to avoid detecting movement in adjacent spaces</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Dual-Technology Sensor Benefits</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">False Trigger Reduction</h5>
                    <p>Requires both PIR and ultrasonic detection for activation, significantly reducing false triggers</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Enhanced Sensitivity</h5>
                    <p>Either technology can maintain occupancy, providing better detection of small movements or stationary occupancy</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Environmental Compensation</h5>
                    <p>Less affected by individual environmental factors that may impact single-technology sensors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Application Flexibility</h5>
                    <p>Suitable for challenging environments with mixed occupancy patterns or environmental conditions</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Installation Testing and Commissioning</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Walk Testing</h5>
                    <p>Systematic testing throughout detection area to verify coverage and identify dead zones or overly sensitive areas</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Time Delay Adjustment</h5>
                    <p>On-delay (0-30 seconds) and off-delay (5-30 minutes) settings based on application and space usage patterns</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Sensitivity Calibration</h5>
                    <p>Adjust detection sensitivity to eliminate false triggers while maintaining reliable occupancy detection</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Integration Testing</h5>
                    <p>Verify proper integration with lighting, HVAC, and security systems including manual override functions</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Common Installation Problems</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Dead Zones</h5>
                    <p>Areas behind furniture, in corners, or below sensor mounting height where occupancy isn't detected</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">False Triggers</h5>
                    <p>Heat sources, air movement, vibration, or small animals causing unwanted activation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Interference</h5>
                    <p>Multiple sensors detecting same movement, wireless interference, or electrical noise affecting operation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Environmental Changes</h5>
                    <p>Furniture rearrangement, seasonal sunlight changes, or HVAC modifications affecting sensor performance</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check4"
                question="What can cause a PIR occupancy sensor to give false triggers?"
                options={[
                  "High humidity levels in the environment",
                  "Direct sunlight or heat sources affecting the sensor",
                  "Low ambient temperature in the room",
                  "Background electrical noise from equipment"
                ]}
                correctAnswer={1}
                explanation="PIR sensors detect changes in infrared radiation, so direct sunlight or heat sources such as radiators can cause false triggers by creating thermal changes that the sensor interprets as occupancy movement."
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
                  <li>• <strong>Manufacturer datasheet review:</strong> Always check manufacturer specifications for recommended mounting positions, environmental limits, and installation clearances</li>
                  <li>• <strong>Pre-installation site survey:</strong> Walk the space before installation to understand usage patterns, identify heat sources, draughts, and potential interference</li>
                  <li>• <strong>Documentation standards:</strong> Label and document sensor locations with types, settings, and any special considerations for maintenance reference</li>
                  <li>• <strong>Commissioning coordination:</strong> Work closely with commissioning engineers to test sensor placement and adjust positions if performance issues are identified</li>
                  <li>• <strong>Seasonal considerations:</strong> Consider how seasonal changes (sun angles, occupancy patterns, HVAC operation) may affect sensor performance</li>
                  <li>• <strong>Future flexibility:</strong> Position sensors to accommodate potential space changes, furniture rearrangement, or system modifications</li>
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
                <h4 className="font-semibold text-red-200 mb-3">Office Building CO₂ Sensor Placement Error</h4>
                <div className="space-y-3 text-red-100">
                  <div>
                    <h5 className="font-medium text-red-300">The Installation</h5>
                    <p className="text-sm">
                      In a modern office building, CO₂ sensors were installed near openable windows to monitor air quality 
                      in naturally ventilated offices. The installation team positioned them conveniently on window walls 
                      for easy access and wiring.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">The Problem</h5>
                    <p className="text-sm">
                      When windows were opened for natural ventilation, the CO₂ sensors detected the low CO₂ content of 
                      the incoming fresh air (around 400 ppm) rather than the actual office air quality. The BMS 
                      interpreted these readings as excellent air quality.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">The Consequence</h5>
                    <p className="text-sm">
                      The system reduced mechanical ventilation unnecessarily, assuming natural ventilation was adequate. 
                      When windows were later closed, CO₂ levels rose rapidly to over 1200 ppm, causing poor air quality, 
                      occupant complaints, and reduced cognitive performance.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">The Solution</h5>
                    <p className="text-sm">
                      Sensors were relocated to internal walls away from windows, positioned to measure the mixed air 
                      in the breathing zone. The BMS was reconfigured to account for natural ventilation through window 
                      position sensors rather than relying solely on CO₂ readings.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">The Result</h5>
                    <p className="text-sm">
                      The system now provides accurate readings representing actual occupant air quality conditions, 
                      maintains healthy CO₂ levels below 1000 ppm, and properly coordinates mechanical and natural 
                      ventilation strategies.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Lessons Learned</h5>
                    <p className="text-sm">
                      Sensor placement must consider all operational scenarios, not just convenient installation locations. 
                      Representative sampling is more important than installation convenience or aesthetic considerations.
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
                    <h5 className="font-medium text-blue-300 mb-2">Placement Importance</h5>
                    <p className="text-sm text-blue-100">Sensor placement is crucial for reliable BMS performance. Poor positioning leads to false readings, energy waste, and occupant discomfort.</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-green-300 mb-2">Temperature/Humidity</h5>
                    <p className="text-sm text-green-100">Position away from sunlight, heaters, and draughts. Mount at 1.2-1.5m height representing occupant conditions.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-purple-300 mb-2">CO₂ Sensors</h5>
                    <p className="text-sm text-purple-100">Install in breathing zones away from vents and windows to ensure representative air quality measurements.</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-amber-300 mb-2">Occupancy Sensors</h5>
                    <p className="text-sm text-amber-100">Require clear line of sight with no obstructions. Avoid heat sources and strong air currents for reliable detection.</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mt-4">
                <h5 className="font-medium text-red-300 mb-2">Critical Success Factors</h5>
                <p className="text-sm text-red-100">
                  <strong>Proper planning using manufacturer datasheets, thorough site surveys, and comprehensive commissioning checks are essential</strong> 
                  for achieving accurate sensor performance and optimal BMS operation throughout the building's lifecycle.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Ruler className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule2Section4QuizData}
                title="Sensor Placement and Accuracy Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-2-section-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-2-section-5">
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

export default BMSModule2Section4;