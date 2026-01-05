import { ArrowLeft, ArrowRight, TrendingUp, Target, CheckCircle, Info, Shield, Wrench, BookOpen, AlertCircle, Lightbulb, Database, Activity, Clock, Save, Settings, AlertTriangle, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule6Section2Quiz } from '@/data/upskilling/bmsModule6Section2Quiz';

const BMSModule6Section2 = () => {
  const [inlineCheck1, setInlineCheck1] = useState(false);
  const [inlineCheck2, setInlineCheck2] = useState(false);
  const [inlineCheck3, setInlineCheck3] = useState(false);
  const [inlineCheck4, setInlineCheck4] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bms-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Trend Logging and Historical Data Collection
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-4xl leading-relaxed">
            Data logging and historical analysis for Building Management Systems
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
              Module 6.2
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
              35 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                A Building Management System (BMS) is not only about controlling equipment in real time — it also acts as a <strong className="text-yellow-400">data historian</strong>. Through trend logging and historical data collection, the BMS records key variables (temperature, energy use, pressure, humidity, CO₂, status events) over time.
              </p>
              <p>This enables operators to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Diagnose faults by analysing what happened before and after problems</li>
                <li>Optimise energy usage by identifying wasteful patterns</li>
                <li>Provide compliance evidence for regulatory requirements</li>
                <li>Benchmark performance over time for continuous improvement</li>
              </ul>
              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="p-3 sm:p-4 bg-card border border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-orange-200 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Critical Point
                  </h4>
                  <p className="text-white text-sm">For electricians: ensuring correct sensors are installed, wired, and calibrated is essential. If source signals are wrong, stored history becomes useless.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Explain the purpose of trend logging in a BMS</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Describe how historical data supports energy management and compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Identify the electrician's role in ensuring accurate logged data</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Apply best practices for sensor installation and data reliability</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 1: What is Trend Logging */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-yellow-400" />
                What is Trend Logging?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Trend logging is the <strong className="text-yellow-400">process of recording values at set intervals</strong> to create a historical record. Think of it as creating a diary for your building systems - every temperature reading, pressure measurement, and equipment status is recorded with a timestamp.
              </p>
              
              <p>
                <strong className="text-yellow-400">Continuous data logging</strong> captures measurements at regular intervals - every 5 minutes, every hour, or whatever frequency makes sense for the application. Temperature, humidity, CO₂ levels, and energy consumption are typically logged continuously to track trends and patterns over time.
              </p>

              <p>
                <strong className="text-orange-400">Event-based data logging</strong> only records when something changes or when specific events occur. A pump switching on/off, an alarm triggering, or a valve opening would be event-based data. This approach saves storage space while capturing important system behaviour.
              </p>

              <p>
                <strong className="text-green-400">Data storage</strong> can be local (in individual controllers), central (on BMS servers), or cloud-based. Modern systems often use a combination - local storage for immediate access and central/cloud storage for long-term analysis and backup.
              </p>

              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-2">Practical Example</h4>
                <p className="text-blue-100 text-sm">A chiller's flow temperature is logged every 10 minutes. When it trips on a fault, engineers can review the historical graph to see if low flow or high return temperature caused the problem - essential for root cause analysis.</p>
              </div>

              {/* Inline Check 1 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why is event-based data logging useful in fault diagnosis?</p>
                <Button
                  onClick={() => setInlineCheck1(!inlineCheck1)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck1 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck1 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Event-based logging captures the exact timing of system changes (pump starts, valve opens, alarms trigger) which helps engineers understand the sequence of events leading to a fault. This timeline is crucial for identifying root causes and preventing future failures.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Why Collect Historical Data */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Why Collect Historical Data?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Historical data transforms your BMS from a simple control system into a powerful analytical tool. It's like having a witness that never sleeps, recording everything that happens in your building.
              </p>
              
              <p>
                <strong className="text-red-400">Fault diagnosis</strong> becomes much more effective with historical data. Instead of guessing what caused a failure, you can trace back through the logs to see exactly what conditions led to the problem. Was it gradual deterioration or a sudden failure? Did other systems contribute to the issue?
              </p>

              <p>
                <strong className="text-green-400">Energy optimisation</strong> relies heavily on trend data to identify wasteful patterns. You might discover equipment running during unoccupied hours, systems fighting each other (heating and cooling simultaneously), or inefficient operating schedules that cost thousands annually.
              </p>

              <p>
                <strong className="text-yellow-400">Compliance requirements</strong> increasingly demand logged evidence of proper operation. Legionella prevention, energy reporting, safety system testing - all require documented proof that systems operated as required. Historical data provides this evidence automatically.
              </p>

              <p>
                <strong className="text-purple-400">Performance benchmarking</strong> allows you to track how systems perform over seasons and years. Is efficiency declining? Are maintenance intervals appropriate? Are recent modifications working as expected? Historical data answers these questions.
              </p>

              <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-2">Real Success Story</h4>
                <p className="text-green-100 text-sm">A school discovered through trend analysis that their boilers were running overnight due to incorrect scheduling. One simple correction saved £3,000 annually - the trend logs paid for themselves many times over.</p>
              </div>

              {/* Inline Check 2 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 How can trend logs help reduce energy waste?</p>
                <Button
                  onClick={() => setInlineCheck2(!inlineCheck2)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck2 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck2 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Trend logs reveal patterns of energy waste such as equipment running during unoccupied hours, systems operating at inefficient settings, or simultaneous heating and cooling. By identifying these patterns, operators can adjust schedules, setpoints, and control strategies to eliminate waste and reduce energy costs.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Electrician's Role */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Electrician's Role in Data Reliability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                As an electrician, you're the foundation of reliable data logging. Every sensor you install, every wire you connect, and every calibration you perform directly impacts the quality of historical data that engineers rely on for critical decisions.
              </p>
              
              <p>
                <strong className="text-yellow-400">Correct sensor wiring</strong> is absolutely critical. Temperature sensors must go to temperature inputs, pressure sensors to pressure inputs, and digital status signals to digital inputs. A sensor wired to the wrong input type will give meaningless data that corrupts the entire historical record.
              </p>

              <p>
                <strong className="text-orange-400">Sensor calibration</strong> ensures the logged values represent reality. A temperature sensor reading 2°C high will create months or years of misleading data. Calibrate sensors before connecting them, and verify calibration during commissioning - don't trust manufacturer specifications alone.
              </p>

              <p>
                <strong className="text-green-400">Shielded cabling</strong> is essential for analog signals (0-10V, 4-20mA). Electrical interference from motors, lighting, or other equipment can introduce noise that corrupts logged data. Use shielded twisted pair cable and connect shields properly at one end only.
              </p>

              <p>
                <strong className="text-purple-400">Clear labelling</strong> ensures logs correspond to the correct equipment. Label every wire, every terminal, and every input clearly. During commissioning or troubleshooting, unclear labels waste time and can lead to incorrect connections that compromise data integrity.
              </p>

              <p>
                <strong className="text-yellow-400">Commissioning verification</strong> means testing the entire signal path from sensor to logged data. Don't just check continuity - physically change conditions (heat a temperature sensor, apply pressure, simulate faults) and verify the BMS logs the correct values with proper timestamps.
              </p>

              {/* Inline Check 3 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why is sensor calibration critical for reliable historical data?</p>
                <Button
                  onClick={() => setInlineCheck3(!inlineCheck3)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck3 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck3 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Inaccurate sensor calibration creates systematic errors in logged data, making historical analysis unreliable. A miscalibrated sensor might show normal readings when conditions are actually problematic, or trigger false alarms based on incorrect values. This compromises fault diagnosis, energy analysis, and compliance reporting.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Best Practices and Implementation */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Best Practices for Reliable Trend Logging
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Successful trend logging requires attention to detail during installation, commissioning, and ongoing maintenance. These practices ensure your logged data remains accurate and useful for years.
              </p>
              
              <p>
                <strong className="text-yellow-400">Sensor location is crucial</strong>. Temperature sensors must be away from direct sunlight, heat sources, and air currents. Pressure sensors need straight pipe runs without turbulence. Flow sensors require proper straight lengths upstream and downstream. Poor sensor location creates poor data regardless of wiring quality.
              </p>

              <p>
                <strong className="text-orange-400">Match sensor ranges to application requirements</strong>. Don't use a 0-50°C sensor on a boiler that operates at 80°C - you'll lose resolution and accuracy. Conversely, don't use a 0-150°C sensor for room temperature monitoring - you'll have poor resolution at the operating range.
              </p>

              <p>
                <strong className="text-green-400">Logging frequency must be appropriate</strong>. Too frequent logging creates data overload and storage issues. Too slow logging misses important events or trends. Room temperature might need 15-minute intervals, while critical equipment might need 1-minute logging. Balance storage capacity with data needs.
              </p>

              <p>
                <strong className="text-purple-400">Backup storage prevents data loss</strong>. Controllers should have sufficient local memory for several days of data. Central servers need automated backup. Cloud storage provides additional redundancy. Plan for power outages, network failures, and equipment replacement.
              </p>

              <p>
                <strong className="text-red-400">Testing during commissioning is non-negotiable</strong>. Change setpoints, trip equipment, disconnect sensors, and verify that logged data responds correctly. Test alarm conditions, manual overrides, and system interactions. Don't assume everything works - prove it with actual testing.
              </p>

              <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                <h4 className="font-semibold text-red-200 mb-2">Case Study: The Phantom CO₂ Problem</h4>
                <p className="text-red-100 text-sm mb-2">
                  <strong>Problem:</strong> An office building logged CO₂ levels as constant 400 ppm for weeks, despite air quality complaints.
                </p>
                <p className="text-red-100 text-sm mb-2">
                  <strong>Investigation:</strong> The CO₂ sensor was wired but never powered - the BMS logged default values.
                </p>
                <p className="text-red-100 text-sm">
                  <strong>Result:</strong> Once powered and calibrated, logs showed peaks above 1500 ppm, triggering necessary ventilation improvements.
                </p>
              </div>

              {/* Inline Check 4 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why should logging frequencies be chosen carefully?</p>
                <Button
                  onClick={() => setInlineCheck4(!inlineCheck4)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck4 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck4 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Logging frequency must balance data quality with storage requirements. Too frequent logging creates excessive data storage and processing overhead, while too slow logging might miss important events, rapid changes, or short-term problems that could indicate equipment issues or inefficiencies.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Learning: Data Analysis and Troubleshooting */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Common Data Quality Issues and Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Understanding common data quality problems helps electricians prevent issues during installation and identify problems during troubleshooting.
              </p>
              
              <p>
                <strong className="text-red-400">Flat line data</strong> often indicates sensor power issues, wiring problems, or sensor failures. If a temperature reading shows constant values despite changing conditions, check power supply, wiring integrity, and sensor operation.
              </p>

              <p>
                <strong className="text-orange-400">Noisy or erratic data</strong> usually points to interference, poor connections, or improper grounding. Analog signals are particularly susceptible to electrical noise from nearby motors, VFDs, or switching equipment.
              </p>

              <p>
                <strong className="text-yellow-400">Out-of-range readings</strong> suggest calibration problems, incorrect sensor selection, or input configuration errors. A temperature sensor showing -40°C in a heated building clearly has calibration or wiring issues.
              </p>

              <p>
                <strong className="text-green-400">Intermittent data</strong> points to loose connections, failing sensors, or communication problems. These intermittent issues are often the most difficult to diagnose but create unreliable historical records.
              </p>

              <div className="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                <h4 className="font-semibold text-yellow-200 mb-2">Troubleshooting Tip</h4>
                <p className="text-yellow-100 text-sm">Always verify data quality during commissioning by comparing logged values with independent measurements. Use a separate thermometer, pressure gauge, or multimeter to confirm sensor readings match reality.</p>
              </div>
            </CardContent>
          </Card>

          {/* Compliance and Standards */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Compliance and BS 7671 Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Trend logging systems must comply with electrical installation standards, particularly BS 7671, while meeting specific data logging requirements.
              </p>
              
              <p>
                <strong className="text-yellow-400">Circuit protection</strong> for sensor circuits must follow BS 7671 requirements. Use appropriate protective devices for the installation environment and ensure proper earth fault protection for all sensor circuits.
              </p>

              <p>
                <strong className="text-green-400">Cable selection and installation</strong> must meet fire performance requirements, particularly in escape routes. Low smoke, halogen-free cables may be required in certain installations, and cable segregation rules apply to control and power circuits.
              </p>

              <p>
                <strong className="text-purple-400">Documentation requirements</strong> include accurate as-built drawings, test certificates, and commissioning records. These documents are essential for future maintenance and troubleshooting of logging systems.
              </p>

              <p>
                <strong className="text-orange-400">Data retention requirements</strong> vary by application but may extend to several years for compliance purposes. Plan electrical systems with sufficient reliability and backup power to maintain data integrity over required retention periods.
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    How long should trend data be retained?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Typically 1-2 years for operational data, longer for compliance records. Consider data storage capacity and regulatory requirements. Some critical safety data may need retention for 5+ years.
                  </p>
                </details>
                
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    What happens if a sensor fails during logging?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    The BMS should flag sensor faults and log error states rather than false readings. This prevents misleading historical data and alerts operators to sensor problems requiring maintenance.
                  </p>
                </details>
                
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    Can trend data be exported for analysis?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Most BMS systems allow data export to CSV or Excel formats for detailed analysis, compliance reporting, or integration with energy management software.
                  </p>
                </details>
                
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    How do you prevent data loss during power outages?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Use UPS systems for controllers, ensure adequate local storage capacity, implement automatic data backup to central servers, and consider cloud-based backup systems.
                  </p>
                </details>

                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    What logging frequency should be used for different parameters?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Room temperature: 15-30 minutes. Critical equipment: 1-5 minutes. Energy meters: hourly. Status changes: immediate (event-based). Balance data quality with storage requirements.
                  </p>
                </details>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-medium text-yellow-400 mb-4">Key Takeaways</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Trend logging records system data (continuous or event-based) for historical analysis and decision-making</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Historical data supports fault diagnosis, energy optimisation, compliance requirements, and performance benchmarking</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Electricians ensure reliable data through correct wiring, proper calibration, appropriate shielding, and clear labelling</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Poor sensor installation, incorrect wiring, or miscalibration makes historical logs unreliable and potentially useless</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Best practices include proper sensor placement, appropriate logging frequencies, backup storage, and thorough commissioning testing</span>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg mt-6">
                <h4 className="font-semibold text-yellow-400 mb-2">Remember</h4>
                <p className="text-white text-sm">
                  As an electrician, your work is the foundation of reliable BMS data logging. Every connection you make and every sensor you install directly impacts the quality of data that building operators rely on for critical decisions about safety, efficiency, and compliance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Check Quiz */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule6Section2Quiz}
                title="Trend Logging and Historical Data Collection"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <Link to="../bms-module-6-section-1" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Previous: Alarm Priorities</span>
                <span className="sm:hidden">Previous: Alarms</span>
              </Button>
            </Link>
            
            <Link to="../bms-module-6-section-3" className="w-full sm:w-auto">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Next: Section 3</span>
                <span className="sm:hidden">Next: Section 3</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule6Section2;