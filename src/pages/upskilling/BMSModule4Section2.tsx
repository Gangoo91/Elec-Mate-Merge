import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sun, Target, CheckCircle, BookOpen, Wrench, AlertTriangle, Eye, Info, Users, Brain, Lightbulb, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule4Section2QuizData } from '@/data/upskilling/bmsModule4Section2QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule4Section2 = () => {
  const [checkAnswers, setCheckAnswers] = useState<{[key: string]: boolean}>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "BMS Module 4 Section 2: Daylight Harvesting and PIR Logic | Electrical Training";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master daylight harvesting and PIR occupancy sensing in BMS applications. Learn sensor placement, commissioning techniques, and energy-saving strategies for intelligent lighting control.');
    }
  }, []);

  const handleCheckAnswer = (checkId: string, isCorrect: boolean) => {
    setCheckAnswers(prev => ({
      ...prev,
      [checkId]: isCorrect
    }));
  };

  const renderInlineCheck = (checkId: string, question: string, correctAnswer: string, explanation: string) => (
    <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-yellow-400/30 mt-6">
      <CardContent className="pt-6">
        <div className="flex-1">
          <p className="text-white font-medium mb-3">{question}</p>
          <details className="group">
            <summary className="cursor-pointer text-blue-300 hover:text-blue-200 transition-colors list-none flex items-center gap-2">
              <span>Click to reveal answer</span>
              <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-200 font-medium mb-2">Answer: {correctAnswer}</p>
              <p className="text-green-100 text-sm">{explanation}</p>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../bms-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Sun className="h-8 w-8 text-yellow-400" />
              <Badge 
                variant="secondary" 
                className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
              >
                Module 4 - Section 2
              </Badge>
            </div>
            <Badge 
              variant="outline" 
              className="border-gray-600 text-gray-300 text-xs px-2 py-1 w-fit"
            >
              28 min read
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Daylight Harvesting and PIR Logic
          </h1>
          <p className="text-base text-white mt-2">
            Optimise building energy performance through intelligent daylight harvesting and occupancy-based lighting control systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              <p className="text-lg">
                Lighting represents one of the most significant energy costs in modern commercial buildings, typically accounting 
                for 25-40% of total electrical consumption. Building Management Systems can dramatically reduce this through 
                sophisticated control strategies: <strong>daylight harvesting</strong> (automatically adjusting artificial lighting 
                based on available natural light) and <strong>PIR logic</strong> (using occupancy sensors for intelligent on/off control).
              </p>
              
              <p>
                When properly integrated, these complementary technologies can achieve energy reductions of 40-60% whilst maintaining 
                or improving occupant comfort and productivity. The key lies not just in the technology selection, but in the precision 
                of installation, configuration, and commissioning procedures.
              </p>

              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-200 mb-2">Installation Critical Success Factors</h4>
                    <p className="text-amber-100 text-sm">
                      Success depends entirely on correct sensor placement, precise wiring techniques, and systematic commissioning. 
                      Poorly positioned sensors can cause flickering, inappropriate dimming, or complete system failure, leading to 
                      occupant complaints and negating all potential energy benefits.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                This section provides comprehensive guidance on implementing both technologies effectively, ensuring reliable operation 
                and maximum energy savings whilst maintaining the lighting quality essential for productive work environments.
              </p>
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
              <p className="mb-6 text-lg">By the end of this section, learners will be able to:</p>
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {[
                  "Explain the operational principles and energy benefits of daylight harvesting systems",
                  "Describe PIR occupancy sensing technology and its application in lighting control",
                  "Recognise the strategic advantages of combining both daylight and occupancy control",
                  "Apply industry best-practice methods for sensor installation and positioning",
                  "Implement proper wiring techniques for both analog and digital sensor systems",
                  "Execute systematic commissioning procedures to ensure optimal system performance",
                  "Troubleshoot common sensor and control integration issues effectively",
                  "Design integrated control strategies that maximise energy savings and user comfort"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Daylight Harvesting Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-400" />
                Daylight Harvesting Systems and Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Automatic Daylight Response Technology</h3>
                <p>
                  Daylight harvesting systems utilise sophisticated light sensors (photocells/lux sensors) to continuously monitor 
                  natural illumination levels and automatically adjust artificial lighting to maintain consistent target illumination. 
                  This creates optimal visual conditions whilst minimising energy consumption throughout varying daylight conditions.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">System Component</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Function</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Typical Specifications</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Energy Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Lux Sensors</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Measure ambient light levels</td>
                        <td className="border border-gray-600 px-4 py-2">0-2000 lux range, ±5% accuracy</td>
                        <td className="border border-gray-600 px-4 py-2">Foundation of all savings</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Control Algorithms</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Calculate dimming levels</td>
                        <td className="border border-gray-600 px-4 py-2">Proportional + time delays</td>
                        <td className="border border-gray-600 px-4 py-2">Smooth transitions prevent annoyance</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Dimming Interface</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Adjust luminaire output</td>
                        <td className="border border-gray-600 px-4 py-2">DALI, 1-10V, or wireless</td>
                        <td className="border border-gray-600 px-4 py-2">20-40% typical energy reduction</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Zone Configuration</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Group perimeter/interior</td>
                        <td className="border border-gray-600 px-4 py-2">3-6m depth from windows</td>
                        <td className="border border-gray-600 px-4 py-2">Maximises perimeter savings</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-200 mb-2">Daylight Harvesting Benefits</h4>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• <strong>Energy Efficiency:</strong> Reduces lighting energy consumption by 20-40% in perimeter zones</li>
                    <li>• <strong>Consistent Illumination:</strong> Maintains target lux levels regardless of external conditions</li>
                    <li>• <strong>Reduced Glare:</strong> Balances natural and artificial light to minimise visual discomfort</li>
                    <li>• <strong>Extended Lamp Life:</strong> Dimmed operation significantly increases LED driver lifespan</li>
                    <li>• <strong>Carbon Reduction:</strong> Direct reduction in building operational carbon footprint</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-white">Sensor Types and Selection Criteria</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-green-200 mb-2">Ceiling-Mounted Sensors</h5>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• Measure horizontal illumination</li>
                      <li>• Ideal for general office applications</li>
                      <li>• Easy installation in standard ceiling tiles</li>
                      <li>• Typically 6-10m coverage radius</li>
                      <li>• Cost-effective for most applications</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-200 mb-2">Wall-Mounted Sensors</h5>
                    <ul className="text-purple-100 text-sm space-y-1">
                      <li>• Measure vertical illumination</li>
                      <li>• Better for task-specific lighting</li>
                      <li>• More representative of occupant experience</li>
                      <li>• Requires careful positioning away from windows</li>
                      <li>• Higher accuracy but increased cost</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-200 mb-2">Critical Installation Parameters:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Target Illumination:</strong> Office 300-500 lux, Retail 500-1000 lux</li>
                    <li>• <strong>Sensor Placement:</strong> Representative location, away from direct sunlight</li>
                    <li>• <strong>Response Speed:</strong> Gradual dimming (2-5 minutes) to avoid distraction</li>
                    <li>• <strong>Override Capability:</strong> Manual override for special requirements</li>
                  </ul>
                </div>
              </div>

              {renderInlineCheck(
                "daylight-check",
                "Why does daylight harvesting often dim only some lights instead of all lights in a space?",
                "Natural light distribution varies across the space",
                "Natural light penetration decreases with distance from windows. Areas near windows receive abundant daylight and can have artificial lighting dimmed significantly, whilst interior areas still require full artificial illumination to maintain consistent lighting levels throughout the space."
              )}
            </CardContent>
          </Card>

          {/* Section 2: PIR Logic Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                PIR Logic and Occupancy Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Passive Infrared Occupancy Detection</h3>
                <p>
                  PIR (Passive Infrared) sensors detect thermal radiation changes caused by human movement and body heat, 
                  enabling automatic lighting control based on actual space occupancy. This technology eliminates energy waste 
                  in unoccupied areas whilst providing immediate illumination when people enter spaces.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">PIR Technology Type</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Detection Method</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Coverage Area</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Best Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Standard PIR</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Heat + movement detection</td>
                        <td className="border border-gray-600 px-4 py-2">5-15m diameter</td>
                        <td className="border border-gray-600 px-4 py-2">Corridors, toilets, simple offices</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Ultrasonic</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Motion via sound reflection</td>
                        <td className="border border-gray-600 px-4 py-2">360° coverage</td>
                        <td className="border border-gray-600 px-4 py-2">Complex layouts, partition areas</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Dual Technology</strong></td>
                        <td className="border border-gray-600 px-4 py-2">PIR + Ultrasonic combined</td>
                        <td className="border border-gray-600 px-4 py-2">Large zones 15-30m</td>
                        <td className="border border-gray-600 px-4 py-2">High reliability applications</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Microwave</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Radio frequency detection</td>
                        <td className="border border-gray-600 px-4 py-2">Through walls/partitions</td>
                        <td className="border border-gray-600 px-4 py-2">Challenging environments</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-200 mb-2">PIR System Configuration Parameters</h4>
                  <ul className="text-amber-100 text-sm space-y-1">
                    <li>• <strong>Time Delay Settings:</strong> 5-10 minutes typical (prevents nuisance switching)</li>
                    <li>• <strong>Sensitivity Adjustment:</strong> Calibrated to detect occupant movement without false triggers</li>
                    <li>• <strong>Detection Patterns:</strong> Configured for specific room layouts and furniture arrangements</li>
                    <li>• <strong>Override Functions:</strong> Manual on/off capability for maintenance and special events</li>
                    <li>• <strong>Daylight Integration:</strong> Coordination with daylight harvesting systems</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-white">Energy Savings by Application Type</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-green-200 mb-2">Private Offices</h5>
                    <p className="text-green-100 text-sm mb-2">30-50% energy reduction</p>
                    <ul className="text-green-100 text-xs space-y-1">
                      <li>• Intermittent occupancy patterns</li>
                      <li>• Clear entry/exit points</li>
                      <li>• Predictable movement patterns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-200 mb-2">Meeting Rooms</h5>
                    <p className="text-blue-100 text-sm mb-2">40-70% energy reduction</p>
                    <ul className="text-blue-100 text-xs space-y-1">
                      <li>• High vacancy periods</li>
                      <li>• Scheduled usage patterns</li>
                      <li>• Immediate availability required</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-200 mb-2">Circulation Areas</h5>
                    <p className="text-purple-100 text-sm mb-2">50-80% energy reduction</p>
                    <ul className="text-purple-100 text-xs space-y-1">
                      <li>• Transient occupancy only</li>
                      <li>• Safety lighting requirements</li>
                      <li>• High energy waste potential</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Common PIR Installation Issues
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-red-200 mb-2">False Triggering Sources:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• HVAC air movement (papers, blinds)</li>
                        <li>• Direct sunlight on sensor lens</li>
                        <li>• Heat sources (radiators, equipment)</li>
                        <li>• Vibration from machinery</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-200 mb-2">Poor Detection Issues:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Obstructed sensor field of view</li>
                        <li>• Incorrect mounting height/angle</li>
                        <li>• Insufficient sensitivity settings</li>
                        <li>• Wrong sensor type for application</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {renderInlineCheck(
                "pir-check",
                "Why do PIR-controlled lights have a delay before switching off?",
                "To prevent nuisance switching when occupants are still but not moving",
                "PIR sensors detect movement and heat changes. When people are stationary (reading, typing, thinking), they may not trigger the sensor. A time delay prevents lights from switching off during these still periods, avoiding disruption and annoyance to occupants."
              )}
            </CardContent>
          </Card>

          {/* Section 3: Combined Strategy Integration */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Combined Strategy Integration and Control Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Intelligent Multi-Modal Control Systems</h3>
                <p>
                  The most effective lighting control systems integrate both daylight harvesting and PIR occupancy sensing to create 
                  comprehensive energy management. This combination addresses both temporal (when lights are needed) and spatial 
                  (how much light is needed) efficiency, maximising energy savings whilst maintaining optimal user comfort.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">Control Scenario</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Occupancy State</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Daylight Level</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Lighting Response</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Energy Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Occupied + Bright Day</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Detected</td>
                        <td className="border border-gray-600 px-4 py-2">High (&gt;800 lux)</td>
                        <td className="border border-gray-600 px-4 py-2">Dimmed to 20-30%</td>
                        <td className="border border-gray-600 px-4 py-2">Maximum savings</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Occupied + Overcast</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Detected</td>
                        <td className="border border-gray-600 px-4 py-2">Medium (300-500 lux)</td>
                        <td className="border border-gray-600 px-4 py-2">Dimmed to 60-80%</td>
                        <td className="border border-gray-600 px-4 py-2">Moderate savings</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Occupied + Dark</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Detected</td>
                        <td className="border border-gray-600 px-4 py-2">Low (&lt;100 lux)</td>
                        <td className="border border-gray-600 px-4 py-2">Full brightness 100%</td>
                        <td className="border border-gray-600 px-4 py-2">Comfort maintained</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Vacant + Any Light</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Not detected</td>
                        <td className="border border-gray-600 px-4 py-2">Irrelevant</td>
                        <td className="border border-gray-600 px-4 py-2">Switched OFF</td>
                        <td className="border border-gray-600 px-4 py-2">Complete savings</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-200 mb-2">Combined System Advantages</h4>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• <strong>Comprehensive Coverage:</strong> Addresses both temporal and luminous efficiency</li>
                    <li>• <strong>Maximum Savings:</strong> Typical 40-60% reduction in lighting energy consumption</li>
                    <li>• <strong>Enhanced Comfort:</strong> Maintains optimal lighting conditions under all circumstances</li>
                    <li>• <strong>Reduced Maintenance:</strong> Lower operating hours extend equipment lifespan</li>
                    <li>• <strong>Future Flexibility:</strong> System can adapt to changing usage patterns</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-white">Control Logic Integration Strategies</h4>
                
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-green-200 mb-2">Hierarchical Control Priority</h5>
                    <p className="text-green-100 text-sm mb-2">
                      Establish clear control hierarchy where occupancy detection takes precedence over daylight harvesting:
                    </p>
                    <ol className="text-green-100 text-sm space-y-1 ml-4">
                      <li>1. <strong>Safety Override:</strong> Emergency systems always override automatic control</li>
                      <li>2. <strong>Occupancy Primary:</strong> PIR detection enables/disables lighting zones</li>
                      <li>3. <strong>Daylight Secondary:</strong> Light sensors adjust levels only when space is occupied</li>
                      <li>4. <strong>Manual Override:</strong> User controls can temporarily override automatic operation</li>
                    </ol>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-200 mb-2">Zone Coordination Methods</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h6 className="font-semibold text-purple-200 text-sm mb-1">Perimeter Zones:</h6>
                        <ul className="text-purple-100 text-xs space-y-1">
                          <li>• PIR + Daylight both active</li>
                          <li>• 3-6m depth from windows</li>
                          <li>• Maximum energy saving potential</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-purple-200 text-sm mb-1">Interior Zones:</h6>
                        <ul className="text-purple-100 text-xs space-y-1">
                          <li>• PIR control primary function</li>
                          <li>• Consistent artificial lighting</li>
                          <li>• Focus on occupancy-based switching</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-200 mb-2">Critical Integration Considerations:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Response Timing:</strong> Coordinate sensor response delays to prevent conflicts</li>
                    <li>• <strong>Override Logic:</strong> Prevent PIR from overriding daylight dimming inappropriately</li>
                    <li>• <strong>Fade Rates:</strong> Ensure smooth transitions between different control modes</li>
                    <li>• <strong>Status Reporting:</strong> Provide clear system status feedback to BMS</li>
                  </ul>
                </div>
              </div>

              {renderInlineCheck(
                "combined-check",
                "What is one advantage of combining daylight harvesting with PIR logic?",
                "Maximum energy savings without sacrificing user comfort",
                "Combined systems address both when lights are needed (occupancy) and how much light is needed (daylight response). This comprehensive approach can achieve 40-60% energy savings whilst maintaining optimal lighting conditions for all occupancy and daylight scenarios."
              )}
            </CardContent>
          </Card>

          {/* Practical Guidance Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Practical Implementation Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Professional Installation and Commissioning Procedures</h3>
                <p>
                  Successful daylight harvesting and PIR control implementation requires systematic approach to site survey, 
                  installation, and commissioning. Following these established procedures ensures reliable system operation 
                  and maximum energy savings from day one of operation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Daylight Harvesting Best Practices
                    </h4>
                    <ul className="text-blue-100 text-sm space-y-2">
                      <li>• <strong>Site Survey:</strong> Map daylight gradients using lux meter across different times</li>
                      <li>• <strong>Sensor Placement:</strong> Position away from direct sunlight and reflective surfaces</li>
                      <li>• <strong>Zone Planning:</strong> Define perimeter zones 3-6m from windows for maximum effect</li>
                      <li>• <strong>Calibration:</strong> Set target lux levels per room function (300-500 office, 500-1000 retail)</li>
                      <li>• <strong>Seasonal Testing:</strong> Verify performance across summer/winter sun angles</li>
                      <li>• <strong>Response Tuning:</strong> Configure gradual dimming (2-5 minutes) to avoid distraction</li>
                    </ul>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      PIR System Implementation
                    </h4>
                    <ul className="text-green-100 text-sm space-y-2">
                      <li>• <strong>Coverage Analysis:</strong> Use manufacturer detection patterns for mounting height/angle</li>
                      <li>• <strong>Sensor Selection:</strong> Choose PIR/ultrasonic/dual-tech based on space complexity</li>
                      <li>• <strong>Mounting Location:</strong> Avoid HVAC vents, windows, heat sources</li>
                      <li>• <strong>Time Delay Setting:</strong> Configure 5-10 minutes based on occupancy patterns</li>
                      <li>• <strong>Sensitivity Adjustment:</strong> Calibrate to detect normal movement without false triggers</li>
                      <li>• <strong>Walk Testing:</strong> Commission by walking through detection zones with client</li>
                    </ul>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Combined System Integration
                    </h4>
                    <ul className="text-purple-100 text-sm space-y-2">
                      <li>• <strong>Control Logic:</strong> Program occupancy override before daylight dimming</li>
                      <li>• <strong>Zone Coordination:</strong> Align PIR and daylight zones for logical operation</li>
                      <li>• <strong>Override Capability:</strong> Provide manual controls for special requirements</li>
                      <li>• <strong>BMS Integration:</strong> Configure status reporting and alarm functions</li>
                      <li>• <strong>Scenario Testing:</strong> Test all combinations of occupancy/daylight conditions</li>
                      <li>• <strong>User Training:</strong> Educate facilities staff on system operation and override</li>
                    </ul>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Wiring and Connection Standards
                    </h4>
                    <ul className="text-amber-100 text-sm space-y-2">
                      <li>• <strong>Sensor Wiring:</strong> Use manufacturer-specified cable types and lengths</li>
                      <li>• <strong>Power Supply:</strong> Ensure adequate capacity for all sensors and interfaces</li>
                      <li>• <strong>Control Networks:</strong> Maintain separation between power and control circuits</li>
                      <li>• <strong>Earthing:</strong> Proper earth bonding for all metal components</li>
                      <li>• <strong>Cable Protection:</strong> Use appropriate conduit and segregation methods</li>
                      <li>• <strong>Testing:</strong> Verify continuity and insulation resistance before energising</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Installation Pitfalls to Avoid
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-red-200 mb-2">Sensor Placement Errors:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Daylight sensors facing windows directly</li>
                        <li>• PIR sensors obstructed by partitions or furniture</li>
                        <li>• Sensors positioned near heat sources or airflow</li>
                        <li>• Inadequate coverage causing dead zones</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-200 mb-2">Configuration Mistakes:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Time delays too short causing nuisance switching</li>
                        <li>• Conflicting control zones (PIR vs daylight)</li>
                        <li>• Sensitivity settings causing false triggers</li>
                        <li>• Missing manual override capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-200 mb-3">Commissioning Verification Checklist:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-gray-300 mb-2">Functional Testing:</h5>
                      <ul className="text-white space-y-1">
                        <li>All sensors respond correctly to presence/absence</li>
                        <li>Daylight sensors adjust lighting smoothly across lux range</li>
                        <li>Time delays function as programmed</li>
                        <li>Manual overrides operate correctly</li>
                        <li>BMS integration points report accurate status</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-300 mb-2">Performance Verification:</h5>
                      <ul className="text-white space-y-1">
                        <li>Target illumination levels achieved under all conditions</li>
                        <li>Energy consumption measured and compared to baseline</li>
                        <li>User feedback collected and addressed</li>
                        <li>System documentation completed and handed over</li>
                        <li>Maintenance procedures established and documented</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Real World Case Study: Secondary School Lighting Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <div className="bg-green-900/30 border border-green-500/40 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-3">Project Overview: Comprehensive Lighting Control Implementation</h4>
                <p className="text-green-100 mb-4">
                  A large secondary school with 40 classrooms required lighting control to reduce energy costs whilst maintaining 
                  educational lighting standards. The electrical contractor implemented combined daylight harvesting and PIR control 
                  across all teaching spaces, corridors, and common areas.
                </p>

                <div className="space-y-3">
                  <div className="bg-gray-800/50 p-3 rounded">
                    <h5 className="font-semibold text-blue-200">Initial Installation Challenges</h5>
                    <p className="text-blue-100 text-sm">
                      Several daylight sensors were initially mounted too close to windows, causing excessive dimming that made 
                      the back of classrooms too dark for effective learning. Teachers complained about inadequate lighting levels 
                      during afternoon lessons.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded">
                    <h5 className="font-semibold text-purple-200">Problem Resolution Process</h5>
                    <p className="text-purple-100 text-sm">
                      Lux measurements revealed illumination levels dropping below 300 lux at the back of classrooms during 
                      bright conditions. Sensors were repositioned to measure average classroom illumination rather than 
                      window-adjacent levels, achieving balanced lighting throughout each space.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded">
                    <h5 className="font-semibold text-amber-200">PIR System Optimisation</h5>
                    <p className="text-amber-100 text-sm">
                      PIR sensors in classrooms were configured with 15-minute delays to accommodate quiet examination periods. 
                      Corridor sensors used 5-minute delays for rapid response whilst avoiding nuisance switching between classes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/30 border border-yellow-400/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-3">Technical Solution Implementation</h4>
                <div className="space-y-2">
                  <p className="text-blue-100 text-sm">
                    <strong>Daylight Sensors:</strong> Repositioned to 2m from windows measuring representative classroom illumination.
                  </p>
                  <p className="text-blue-100 text-sm">
                    <strong>PIR Configuration:</strong> Dual-technology sensors for reliable detection during static learning activities.
                  </p>
                  <p className="text-blue-100 text-sm">
                    <strong>Zone Integration:</strong> Combined control ensuring lights switch off completely when rooms vacant, 
                    regardless of daylight conditions, whilst maintaining appropriate dimming when occupied.
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/30 border border-amber-500/40 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Achieved Results</h4>
                <ul className="text-amber-100 text-sm space-y-1">
                  <li>• <strong>35% annual energy reduction</strong> in lighting electricity consumption</li>
                  <li>• <strong>Consistent illumination</strong> maintaining 400-500 lux throughout all classrooms</li>
                  <li>• <strong>Automatic operation</strong> eliminating need for manual light switching by staff</li>
                  <li>• <strong>Reduced maintenance</strong> due to extended LED lifespan from dimming operation</li>
                  <li>• <strong>Improved learning environment</strong> with consistent, glare-free lighting conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p className="text-sm sm:text-base">
                Daylight harvesting and PIR occupancy control represent two of the most effective strategies for reducing building 
                lighting energy consumption whilst maintaining optimal user comfort. Daylight harvesting systems automatically adjust 
                artificial lighting levels based on available natural light, whilst PIR logic ensures lights operate only when spaces 
                are actually occupied.
              </p>
              <p className="text-sm sm:text-base">
                When properly integrated, these technologies can achieve 40-60% reduction in lighting energy consumption. However, 
                success depends entirely on correct sensor selection, precise installation techniques, and systematic commissioning 
                procedures. Poor sensor placement or incorrect configuration can negate all potential benefits and create user dissatisfaction.
              </p>
              <p className="text-sm sm:text-base">
                The secondary school case study demonstrates both the challenges and rewards of proper implementation. Initial sensor 
                positioning errors were systematically identified and corrected, ultimately delivering substantial energy savings whilst 
                improving the learning environment. This reinforces the importance of thorough commissioning and performance verification.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule4Section2QuizData}
                title="BMS Module 4 Section 2: Daylight Harvesting and PIR Logic Assessment"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <Link to="../bms-module-4-section-1" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Lighting Integration
              </Button>
            </Link>
            
            <Link to="../bms-module-4-section-3" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section: Advanced Control Strategies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BMSModule4Section2;