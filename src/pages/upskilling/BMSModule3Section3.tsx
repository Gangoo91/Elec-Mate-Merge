import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, AlertTriangle, Target, Settings, Activity, Users, Calendar, TrendingUp, Zap, Wind, BarChart3, Timer, Eye, Thermometer, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule3Section3QuizData } from '@/data/upskilling/bmsModule3Section3QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule3Section3 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null,
    check5: null,
    check6: null,
    check7: null,
    check8: null,
    check9: null,
    check10: null,
  });

  useEffect(() => {
    document.title = 'Time Scheduling & Occupancy Programming | BMS Module 3 Section 3';
    const desc = 'Master time-based scheduling and occupancy detection programming in Building Management Systems. Learn scheduling strategies, sensor technologies, and energy optimization techniques with practical examples and real-world case studies.';
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
    <div className="min-h-screen bg-background text-foreground">
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
              <Clock className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Time Scheduling and Occupancy Programming
                </h1>
                <p className="text-base text-white mt-2">
                  Automated Scheduling and Occupancy Control
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                32 min read
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
                Time scheduling and occupancy programming form the intelligence of modern Building Management Systems. Rather than running equipment continuously, BMS systems use sophisticated scheduling algorithms and occupancy detection to operate building services only when needed. This approach can reduce energy consumption by 20-40% whilst maintaining optimal comfort levels.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                For electricians, understanding these programming concepts is crucial for proper sensor installation, system commissioning, and troubleshooting. The accuracy of scheduling and occupancy detection depends heavily on correct electrical installation and calibration procedures.
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
                  "Configure time-based scheduling including weekly, monthly, and holiday patterns",
                  "Understand astronomical clock features and daylight saving time programming",
                  "Compare different occupancy detection technologies and their optimal applications",
                  "Install and calibrate PIR, ultrasonic, and CO2 sensors according to BS 7671",
                  "Program demand-controlled ventilation systems for energy efficiency",
                  "Implement optimal start/stop algorithms and load shedding strategies",
                  "Troubleshoot scheduling conflicts and sensor commissioning issues",
                  "Calculate energy savings potential from advanced scheduling strategies",
                  "Apply seasonal adjustments and utility time-of-use rate programming"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Time-Based Scheduling */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-yellow-400" />
                Time-Based Scheduling Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base sm:text-lg leading-relaxed">
                Time-based scheduling is the foundation of automated building control, allowing systems to operate according to predetermined patterns that match building occupancy and operational requirements. Modern BMS controllers can handle complex scheduling scenarios including multiple time zones, daylight saving adjustments, and exception handling.
              </p>

              <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic Scheduling Components
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-blue-100">Weekly Schedules</h5>
                      <p className="text-sm text-blue-200">7-day patterns with individual day programming</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-100">Exception Schedules</h5>
                      <p className="text-sm text-blue-200">Holiday and special event overrides</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-blue-100">Astronomical Clock</h5>
                      <p className="text-sm text-blue-200">Sunrise/sunset based scheduling</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-100">Time Zones</h5>
                      <p className="text-sm text-blue-200">Multiple location support with DST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Programming Time Schedules</h4>
                <p className="text-base leading-relaxed">
                  When programming time schedules, electricians must understand the hierarchy of schedule types. Weekly schedules form the base pattern, exception schedules override weekly patterns for specific dates, and manual overrides provide temporary control. The BMS evaluates these in order of priority:
                </p>
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-400 mb-2">Schedule Priority Order (Highest to Lowest):</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Manual Override (Temporary control)</li>
                    <li>Exception Schedule (Holiday/special events)</li>
                    <li>Weekly Schedule (Standard pattern)</li>
                    <li>Default Schedule (Fallback pattern)</li>
                  </ol>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check1"
                question="Which schedule type has the highest priority in a BMS system?"
                options={[
                  "Weekly schedule",
                  "Exception schedule", 
                  "Manual override",
                  "Default schedule"
                ]}
                correctAnswer={2}
                explanation="Manual override has the highest priority, allowing operators to temporarily control equipment regardless of programmed schedules. This is essential for maintenance and emergency situations."
              />

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Astronomical Clock Features</h4>
                <p className="text-base leading-relaxed">
                  Astronomical clocks calculate sunrise and sunset times based on geographical location and date. This enables automatic adjustment of lighting and blind control systems throughout the year without manual intervention.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-600 rounded-lg">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Parameter</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Range</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Accuracy</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-600 p-3">Latitude</td>
                        <td className="border border-gray-600 p-3">±90°</td>
                        <td className="border border-gray-600 p-3">±0.1°</td>
                        <td className="border border-gray-600 p-3">Sunrise/sunset calculation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">Longitude</td>
                        <td className="border border-gray-600 p-3">±180°</td>
                        <td className="border border-gray-600 p-3">±0.1°</td>
                        <td className="border border-gray-600 p-3">Time zone calculation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">Offset</td>
                        <td className="border border-gray-600 p-3">±120 min</td>
                        <td className="border border-gray-600 p-3">±1 min</td>
                        <td className="border border-gray-600 p-3">Fine-tuning for local conditions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Occupancy Detection Technologies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                Occupancy Detection Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base sm:text-lg leading-relaxed">
                Occupancy detection systems provide real-time information about space utilisation, enabling automatic control of lighting, HVAC, and other building services. The choice of detection technology depends on the application, space characteristics, and required sensitivity levels.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-200 mb-2 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    PIR Sensors
                  </h4>
                  <ul className="text-sm text-green-200 space-y-1">
                    <li>• Heat-based motion detection</li>
                    <li>• 6-12m coverage radius</li>
                    <li>• Low power consumption</li>
                    <li>• Cost-effective solution</li>
                  </ul>
                </div>

                <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-200 mb-2 flex items-center gap-2">
                    <Wind className="h-5 w-5" />
                    Ultrasonic Sensors
                  </h4>
                  <ul className="text-sm text-blue-200 space-y-1">
                    <li>• High-frequency sound waves</li>
                    <li>• Detects micro-movements</li>
                    <li>• 360° coverage pattern</li>
                    <li>• Sensitive to air movement</li>
                  </ul>
                </div>

                <div className="bg-card border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    CO2 Sensors
                  </h4>
                  <ul className="text-sm text-purple-200 space-y-1">
                    <li>• Breathing pattern detection</li>
                    <li>• Accurate occupancy counting</li>
                    <li>• Slow response time</li>
                    <li>• Ventilation control integration</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Sensor Installation Requirements</h4>
                <p className="text-base leading-relaxed">
                  Correct sensor placement is critical for reliable occupancy detection. All sensors must be installed according to BS 7671 requirements for low-voltage installations, with particular attention to cable segregation and earthing arrangements.
                </p>

                <div className="bg-card border border-amber-500/30 rounded-lg p-4">
                  <h5 className="font-medium text-amber-200 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Installation Points
                  </h5>
                  <ul className="text-sm text-amber-200 space-y-1">
                    <li>• Mount PIR sensors 2.4-3.0m above floor level</li>
                    <li>• Avoid direct sunlight and heat sources</li>
                    <li>• Ensure clear line of sight to detection area</li>
                    <li>• Use screened cable for ultrasonic sensors</li>
                    <li>• CO2 sensors require 1.2-1.5m mounting height</li>
                    <li>• Allow 20-minute warm-up period for calibration</li>
                  </ul>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check2"
                question="What is the recommended mounting height for PIR occupancy sensors?"
                options={[
                  "1.5-2.0m above floor level",
                  "2.4-3.0m above floor level",
                  "3.5-4.0m above floor level",
                  "4.5-5.0m above floor level"
                ]}
                correctAnswer={1}
                explanation="PIR sensors should be mounted 2.4-3.0m above floor level to achieve optimal coverage patterns and avoid false triggering from small animals or air movement near floor level."
              />

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Dual-Technology Sensors</h4>
                <p className="text-base leading-relaxed">
                  Dual-technology sensors combine PIR and ultrasonic detection methods to reduce false triggering whilst maintaining high sensitivity. Both technologies must detect occupancy for the sensor to activate, significantly improving reliability in challenging environments.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-600 rounded-lg">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Technology</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Detection Method</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Coverage</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Response Time</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Best Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-600 p-3">PIR Only</td>
                        <td className="border border-gray-600 p-3">Infrared heat change</td>
                        <td className="border border-gray-600 p-3">6-12m radius</td>
                        <td className="border border-gray-600 p-3">&lt;0.5 seconds</td>
                        <td className="border border-gray-600 p-3">General offices</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">Ultrasonic Only</td>
                        <td className="border border-gray-600 p-3">Sound wave reflection</td>
                        <td className="border border-gray-600 p-3">8-15m radius</td>
                        <td className="border border-gray-600 p-3">&lt;1.0 seconds</td>
                        <td className="border border-gray-600 p-3">Restrooms, corridors</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">Dual-Technology</td>
                        <td className="border border-gray-600 p-3">Both PIR and ultrasonic</td>
                        <td className="border border-gray-600 p-3">Combined pattern</td>
                        <td className="border border-gray-600 p-3">&lt;1.0 seconds</td>
                        <td className="border border-gray-600 p-3">High-reliability areas</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">CO2 Detection</td>
                        <td className="border border-gray-600 p-3">CO2 concentration</td>
                        <td className="border border-gray-600 p-3">Room-wide</td>
                        <td className="border border-gray-600 p-3">2-5 minutes</td>
                        <td className="border border-gray-600 p-3">Conference rooms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Demand-Controlled Ventilation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Wind className="h-6 w-6 text-yellow-400" />
                Demand-Controlled Ventilation (DCV)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base sm:text-lg leading-relaxed">
                Demand-controlled ventilation adjusts airflow based on actual occupancy levels rather than design occupancy, providing significant energy savings whilst maintaining indoor air quality. CO2 sensors provide the most reliable indication of occupancy for DCV applications.
              </p>

              <div className="bg-card border border-green-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-200 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  CO2-Based Ventilation Control
                </h4>
                <p className="text-sm text-green-200 mb-3">
                  CO2 levels correlate directly with occupancy, as each person produces approximately 0.3-0.5 litres per hour of CO2. By monitoring CO2 concentration, the BMS can adjust ventilation rates to maintain optimal air quality whilst minimising energy consumption.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="font-medium text-yellow-400 mb-2">Typical CO2 Setpoints:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Outside air:</strong> 350-400 ppm</li>
                    <li>• <strong>Good air quality:</strong> &lt;600 ppm</li>
                    <li>• <strong>Acceptable:</strong> 600-1000 ppm</li>
                    <li>• <strong>Poor air quality:</strong> &gt;1000 ppm</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Energy Savings Calculations</h4>
                <p className="text-base leading-relaxed">
                  The energy savings from DCV depend on the difference between design occupancy and actual occupancy patterns. For typical office buildings, DCV can reduce ventilation energy consumption by 30-50%.
                </p>

                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-400 mb-3">DCV Energy Savings Formula:</h5>
                  <div className="font-mono text-sm bg-gray-900 p-3 rounded border">
                    <div>Energy Savings (%) = (Design Airflow - Actual Airflow) / Design Airflow × 100</div>
                    <div className="mt-2 text-gray-400">Where airflow varies with occupancy detected by CO2 sensors</div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p><strong>Example:</strong> 100-person conference room with 20% average occupancy:</p>
                    <p>Energy Savings = (100 - 20) / 100 × 100 = 80% reduction in ventilation energy</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check3"
                question="What CO2 concentration indicates poor indoor air quality requiring increased ventilation?"
                options={[
                  "Less than 600 ppm",
                  "600-800 ppm",
                  "800-1000 ppm", 
                  "Greater than 1000 ppm"
                ]}
                correctAnswer={3}
                explanation="CO2 concentrations greater than 1000 ppm indicate poor indoor air quality. At this level, occupants may experience drowsiness and reduced concentration, requiring increased ventilation rates."
              />
            </CardContent>
          </Card>

          {/* Section 4: Advanced Scheduling Strategies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Timer className="h-6 w-6 text-yellow-400" />
                Advanced Scheduling Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base sm:text-lg leading-relaxed">
                Advanced scheduling strategies optimise energy consumption by predicting building thermal behaviour and adjusting equipment start times accordingly. These algorithms can reduce energy consumption by 15-25% compared to fixed scheduling approaches.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Optimal Start Algorithm
                  </h4>
                  <p className="text-sm text-blue-200 mb-3">
                    Calculates the latest possible start time to achieve comfort conditions by occupancy time, considering outside temperature, building thermal mass, and system capacity.
                  </p>
                  <div className="bg-gray-800 rounded p-2 text-xs">
                    <div>Start Time = Occupancy Time - Calculated Warm-up Period</div>
                    <div className="text-gray-400 mt-1">Based on thermal modeling and weather data</div>
                  </div>
                </div>

                <div className="bg-card border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-purple-200 mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Load Shedding
                  </h4>
                  <p className="text-sm text-purple-200 mb-3">
                    Automatically reduces non-critical loads during peak demand periods to minimise utility charges and prevent demand spikes.
                  </p>
                  <div className="bg-gray-800 rounded p-2 text-xs">
                    <div>Priority 1: Critical systems (safety, security)</div>
                    <div>Priority 2: Comfort systems (HVAC)</div>
                    <div>Priority 3: Non-essential (decorative lighting)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Utility Time-of-Use Programming</h4>
                <p className="text-base leading-relaxed">
                  Many utilities offer time-of-use tariffs with different rates for peak, off-peak, and shoulder periods. BMS systems can be programmed to shift non-critical loads to low-cost periods, providing additional energy cost savings.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-600 rounded-lg">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Time Period</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Typical Hours</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">Rate Multiplier</th>
                        <th className="border border-gray-600 p-3 text-left text-yellow-400">BMS Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-600 p-3">Peak</td>
                        <td className="border border-gray-600 p-3">16:00-20:00 weekdays</td>
                        <td className="border border-gray-600 p-3">3.0x base rate</td>
                        <td className="border border-gray-600 p-3">Shed non-critical loads</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">Shoulder</td>
                        <td className="border border-gray-600 p-3">07:00-16:00, 20:00-22:00</td>
                        <td className="border border-gray-600 p-3">1.5x base rate</td>
                        <td className="border border-gray-600 p-3">Normal operation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-3">Off-Peak</td>
                        <td className="border border-gray-600 p-3">22:00-07:00, weekends</td>
                        <td className="border border-gray-600 p-3">1.0x base rate</td>
                        <td className="border border-gray-600 p-3">Pre-heat/cool, charge systems</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check4"
                question="During peak electricity rate periods, what is the most appropriate BMS action?"
                options={[
                  "Increase HVAC setpoints to maximum comfort",
                  "Shed non-critical loads to reduce demand",
                  "Pre-charge thermal storage systems",
                  "Run all equipment at maximum efficiency"
                ]}
                correctAnswer={1}
                explanation="During peak rate periods, the BMS should shed non-critical loads to reduce electricity demand and costs. Critical systems maintain operation whilst non-essential loads are temporarily reduced."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Practical Guidance for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card border border-amber-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-amber-200 mb-3">Commissioning Procedures</h4>
                <div className="space-y-3 text-sm text-amber-200">
                  <div>
                    <h5 className="font-medium">1. Time Clock Setup</h5>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Verify correct time zone and DST settings</li>
                      <li>Test weekly schedule patterns with manual override</li>
                      <li>Configure exception schedules for holidays</li>
                      <li>Document all schedule priorities and interactions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">2. Occupancy Sensor Calibration</h5>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Allow 20-minute warm-up period before calibration</li>
                      <li>Test detection patterns with walk tests</li>
                      <li>Adjust sensitivity for minimal false triggering</li>
                      <li>Verify timeout periods match space usage patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">3. Integration Testing</h5>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Test schedule-occupancy interactions</li>
                      <li>Verify manual override functionality</li>
                      <li>Check alarm and fault reporting</li>
                      <li>Document system response times</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Common Troubleshooting Issues</h4>
                <div className="grid gap-4">
                  <div className="border border-red-500/30 bg-card rounded-lg p-4">
                    <h5 className="font-medium text-red-200 mb-2">Schedule Conflicts</h5>
                    <p className="text-sm text-red-200 mb-2">Multiple schedules active simultaneously causing erratic operation</p>
                    <p className="text-xs text-red-300"><strong>Solution:</strong> Check schedule hierarchy and disable conflicting patterns</p>
                  </div>
                  <div className="border border-red-500/30 bg-card rounded-lg p-4">
                    <h5 className="font-medium text-red-200 mb-2">Sensor False Triggering</h5>
                    <p className="text-sm text-red-200 mb-2">PIR sensors triggering from heat sources or air movement</p>
                    <p className="text-xs text-red-300"><strong>Solution:</strong> Adjust sensitivity, relocate sensor, or add detection delays</p>
                  </div>
                  <div className="border border-red-500/30 bg-card rounded-lg p-4">
                    <h5 className="font-medium text-red-200 mb-2">CO2 Sensor Drift</h5>
                    <p className="text-sm text-red-200 mb-2">Gradual change in baseline CO2 readings affecting DCV operation</p>
                    <p className="text-xs text-red-300"><strong>Solution:</strong> Perform auto-calibration cycle or manual baseline adjustment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-yellow-400" />
                Case Study: Office Building Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card border border-green-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-200 mb-3">Project Overview</h4>
                <p className="text-sm text-green-200 mb-3">
                  A 5,000m² office building implemented comprehensive time scheduling and occupancy programming across lighting, HVAC, and ventilation systems. The installation included 45 dual-technology occupancy sensors, CO2-based DCV in conference rooms, and optimal start algorithms for HVAC equipment.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Implementation Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Occupancy sensors installed:</span>
                      <span className="text-yellow-400">45 dual-technology</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO2 sensors (conference rooms):</span>
                      <span className="text-yellow-400">12 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scheduling zones:</span>
                      <span className="text-yellow-400">8 zones</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Installation time:</span>
                      <span className="text-yellow-400">3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commissioning period:</span>
                      <span className="text-yellow-400">2 weeks</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Energy Savings Results</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Lighting energy reduction:</span>
                      <span className="text-green-400">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HVAC energy reduction:</span>
                      <span className="text-green-400">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ventilation energy reduction:</span>
                      <span className="text-green-400">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overall energy savings:</span>
                      <span className="text-green-400">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual cost savings:</span>
                      <span className="text-green-400">£18,500</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-yellow-400/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-3">Key Success Factors</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Careful sensor placement avoiding false trigger sources</li>
                  <li>• Comprehensive commissioning with 2-week fine-tuning period</li>
                  <li>• Integration of time scheduling with occupancy detection</li>
                  <li>• Regular maintenance and calibration schedule established</li>
                  <li>• Staff training on manual override procedures</li>
                  <li>• Monitoring and adjustment of timeout periods based on usage patterns</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Section Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Time scheduling and occupancy programming are fundamental to efficient BMS operation, providing automated control that matches building usage patterns whilst minimising energy consumption.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Key Technical Points:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Schedule hierarchy: Manual → Exception → Weekly → Default</li>
                    <li>• PIR sensors: 2.4-3.0m mounting height optimal</li>
                    <li>• CO2 &gt; 1000 ppm indicates poor air quality</li>
                    <li>• Dual-technology sensors reduce false triggering</li>
                    <li>• Optimal start algorithms save 15-25% energy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Installation Requirements:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• BS 7671 compliance for all sensor circuits</li>
                    <li>• Screened cable for ultrasonic sensors</li>
                    <li>• 20-minute sensor warm-up before calibration</li>
                    <li>• Comprehensive commissioning and testing</li>
                    <li>• Regular maintenance and calibration schedule</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Knowledge Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule3Section3QuizData}
                title="Time Scheduling & Occupancy Programming Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to="../bms-module-3-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Control Strategies
              </Button>
            </Link>
            <Link to="../bms-module-3-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                Next: System Integration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMSModule3Section3;