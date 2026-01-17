import { ArrowLeft, ArrowRight, Settings, Book, CheckCircle2, Calculator, AlertTriangle, TrendingUp, Lightbulb, Target, Wrench, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule6Section6 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Advanced Calibration Topics and Best Practices
                </h1>
                <p className="text-xl text-gray-400">
                  Module 6, Section 6
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Master advanced calibration techniques, uncertainty calculations, and optimization strategies 
                for complex measurement systems. This section explores sophisticated calibration challenges 
                and provides practical solutions for professional calibration management.
              </p>
              <p>
                Learn how to handle difficult calibration scenarios, implement measurement uncertainty 
                budgets, troubleshoot calibration problems, and stay ahead of emerging calibration 
                technologies and industry trends.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply advanced calibration techniques and uncertainty calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Troubleshoot complex calibration problems and implement solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Optimise calibration processes and implement best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand emerging calibration technologies and future trends</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Measurement Uncertainty */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-yellow-400" />
                Measurement Uncertainty and Budget Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding Measurement Uncertainty</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Type A Uncertainty</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Statistical Analysis:</strong> Based on repeated measurements</li>
                    <li>• <strong>Standard Deviation:</strong> Calculated from data series</li>
                    <li>• <strong>Random Effects:</strong> Environmental variations, noise</li>
                    <li>• <strong>Evaluation Method:</strong> Mathematical analysis of observations</li>
                    <li>• <strong>Example:</strong> Multiple readings of the same value</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Type B Uncertainty</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Other Means:</strong> Manufacturer specifications, certificates</li>
                    <li>• <strong>Systematic Effects:</strong> Known biases and limitations</li>
                    <li>• <strong>Prior Knowledge:</strong> Previous calibrations, experience</li>
                    <li>• <strong>Evaluation Method:</strong> Scientific judgement</li>
                    <li>• <strong>Example:</strong> Instrument accuracy specifications</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Uncertainty Budget Components</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Reference Standard:</strong> Calibration certificate uncertainty</li>
                    <li>• <strong>Environmental:</strong> Temperature, humidity effects</li>
                    <li>• <strong>Repeatability:</strong> Short-term precision</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Reproducibility:</strong> Long-term stability</li>
                    <li>• <strong>Resolution:</strong> Display or measurement resolution</li>
                    <li>• <strong>Drift:</strong> Time-related changes</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Hysteresis:</strong> Direction-dependent errors</li>
                    <li>• <strong>Loading Effects:</strong> Measurement influence</li>
                    <li>• <strong>Interpolation:</strong> Between calibration points</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Advanced Calibration Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Specialised Calibration Methods</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Multi-Point Calibration</h5>
                  <p className="mb-2">
                    Comprehensive calibration across full measurement range with multiple reference points.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Linear Interpolation:</strong> Between calibrated points</li>
                    <li>• <strong>Curve Fitting:</strong> Mathematical models for complex responses</li>
                    <li>• <strong>Range Coverage:</strong> 10-90% of full scale minimum</li>
                    <li>• <strong>Error Mapping:</strong> Detailed accuracy profile</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">In-Situ Calibration</h5>
                  <p className="mb-2">
                    Calibration performed with instrument installed in its operating location.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Process Integration:</strong> No removal from service</li>
                    <li>• <strong>Real Conditions:</strong> Actual operating environment</li>
                    <li>• <strong>Portable Standards:</strong> Field-suitable reference equipment</li>
                    <li>• <strong>Installation Effects:</strong> Mounting, wiring, interference</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Cross-Calibration</h5>
                  <p className="mb-2">
                    Using multiple instruments to verify consistency and identify problems.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Redundancy Check:</strong> Multiple measurement paths</li>
                    <li>• <strong>Consistency Verification:</strong> Agreement between instruments</li>
                    <li>• <strong>Fault Detection:</strong> Identify drifting or failed units</li>
                    <li>• <strong>Cost Optimisation:</strong> Reduced standard requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Troubleshooting Calibration Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Common Calibration Issues and Solutions</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-1">Repeatability Problems</h5>
                    <p className="text-xs text-gray-400 mb-1">Inconsistent readings during calibration</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Causes:</strong> Mechanical wear, electrical noise, temperature drift</li>
                      <li>• <strong>Solutions:</strong> Stabilisation time, shielding, controlled environment</li>
                      <li>• <strong>Prevention:</strong> Regular maintenance, environmental monitoring</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-1">Hysteresis Effects</h5>
                    <p className="text-xs text-gray-400 mb-1">Different readings on ascending vs descending scale</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Causes:</strong> Mechanical backlash, magnetic materials, friction</li>
                      <li>• <strong>Solutions:</strong> Approach from same direction, pre-loading</li>
                      <li>• <strong>Prevention:</strong> Quality components, proper design</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-1">Linearity Errors</h5>
                    <p className="text-xs text-gray-400 mb-1">Non-proportional response across range</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Causes:</strong> Component aging, design limitations, saturation</li>
                      <li>• <strong>Solutions:</strong> Multi-point calibration, curve correction</li>
                      <li>• <strong>Prevention:</strong> Proper component selection, regular calibration</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-1">Environmental Sensitivity</h5>
                    <p className="text-xs text-gray-400 mb-1">Readings affected by ambient conditions</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Causes:</strong> Temperature coefficients, humidity effects, vibration</li>
                      <li>• <strong>Solutions:</strong> Compensation algorithms, controlled environment</li>
                      <li>• <strong>Prevention:</strong> Environmental specifications, proper installation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-1">Zero Drift</h5>
                    <p className="text-xs text-gray-400 mb-1">Baseline measurement changes over time</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Causes:</strong> Electronic component aging, contamination</li>
                      <li>• <strong>Solutions:</strong> Auto-zero function, baseline correction</li>
                      <li>• <strong>Prevention:</strong> Regular zero checks, clean installation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-1">Loading Effects</h5>
                    <p className="text-xs text-gray-400 mb-1">Calibration equipment affects measurement</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Causes:</strong> Low impedance, capacitive loading, current draw</li>
                      <li>• <strong>Solutions:</strong> High impedance instruments, buffering</li>
                      <li>• <strong>Prevention:</strong> Proper impedance matching, isolation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Calibration Best Practices and Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Professional Best Practices</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Pre-Calibration Preparation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Stabilisation:</strong> Allow thermal equilibration time</li>
                      <li>• <strong>Environment:</strong> Control temperature and humidity</li>
                      <li>• <strong>Documentation:</strong> Review previous calibration history</li>
                      <li>• <strong>Standards:</strong> Verify reference equipment validity</li>
                      <li>• <strong>Cleanliness:</strong> Clean contacts and connections</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">During Calibration</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Systematic Approach:</strong> Follow documented procedures</li>
                      <li>• <strong>Multiple Readings:</strong> Take several measurements per point</li>
                      <li>• <strong>Direction Consistency:</strong> Approach from same direction</li>
                      <li>• <strong>Range Coverage:</strong> Test across full operating range</li>
                      <li>• <strong>Real-Time Monitoring:</strong> Watch for unusual behaviour</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Post-Calibration</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Data Analysis:</strong> Review results for consistency</li>
                      <li>• <strong>Trend Monitoring:</strong> Compare with historical data</li>
                      <li>• <strong>Documentation:</strong> Complete calibration records</li>
                      <li>• <strong>Labelling:</strong> Update calibration stickers</li>
                      <li>• <strong>Return to Service:</strong> Verify proper installation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Process Optimisation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Batch Processing:</strong> Group similar instruments</li>
                      <li>• <strong>Automated Systems:</strong> Reduce manual intervention</li>
                      <li>• <strong>Risk-Based Scheduling:</strong> Optimise calibration intervals</li>
                      <li>• <strong>Performance Monitoring:</strong> Track calibration effectiveness</li>
                      <li>• <strong>Cost Analysis:</strong> Balance accuracy needs with costs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Quality Assurance</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Competency Verification:</strong> Qualified technicians only</li>
                      <li>• <strong>Procedure Validation:</strong> Verify methods effectiveness</li>
                      <li>• <strong>Cross-Checks:</strong> Independent verification</li>
                      <li>• <strong>Audit Trails:</strong> Maintain complete records</li>
                      <li>• <strong>Continuous Improvement:</strong> Regular process review</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Technology Integration</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Software Systems:</strong> Calibration management software</li>
                      <li>• <strong>Data Logging:</strong> Automated data capture</li>
                      <li>• <strong>Mobile Technology:</strong> Field calibration apps</li>
                      <li>• <strong>Cloud Storage:</strong> Centralised record keeping</li>
                      <li>• <strong>Integration:</strong> Link with maintenance systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Trends */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Future Trends in Calibration Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Emerging Technologies and Trends</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Digital Transformation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Digital Certificates:</strong> Blockchain-secured calibration records</li>
                      <li>• <strong>IoT Integration:</strong> Connected calibration equipment</li>
                      <li>• <strong>Cloud Computing:</strong> Scalable calibration management</li>
                      <li>• <strong>Mobile Solutions:</strong> Field calibration applications</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Artificial Intelligence</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Predictive Calibration:</strong> AI-driven interval optimization</li>
                      <li>• <strong>Anomaly Detection:</strong> Automated fault identification</li>
                      <li>• <strong>Pattern Recognition:</strong> Drift prediction algorithms</li>
                      <li>• <strong>Decision Support:</strong> AI-assisted calibration planning</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Automation Advances</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Robotic Systems:</strong> Automated calibration cells</li>
                      <li>• <strong>Self-Calibrating Instruments:</strong> Built-in reference standards</li>
                      <li>• <strong>Remote Calibration:</strong> Network-based calibration</li>
                      <li>• <strong>Continuous Monitoring:</strong> Real-time accuracy verification</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Regulatory Evolution</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Digital Standards:</strong> Electronic calibration procedures</li>
                      <li>• <strong>Global Harmonisation:</strong> Unified international standards</li>
                      <li>• <strong>Sustainability Focus:</strong> Environmental impact considerations</li>
                      <li>• <strong>Risk-Based Approaches:</strong> Performance-based regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Pharmaceutical Company Implements Advanced Calibration Program
              </p>
              <p>
                A pharmaceutical manufacturing facility needs to comply with FDA validation requirements 
                whilst optimising calibration costs and minimising production disruptions. They have over 
                500 critical measurement instruments across multiple production lines.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Challenges Faced:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Complex uncertainty budget calculations for validation</li>
                  <li>• High-cost production downtime for calibration</li>
                  <li>• Regulatory audit requirements for calibration data</li>
                  <li>• Inconsistent calibration intervals across similar equipment</li>
                  <li>• Manual documentation creating compliance risks</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Advanced Solutions Implemented:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Automated uncertainty budget software with Monte Carlo analysis</li>
                  <li>• Risk-based calibration intervals using historical performance data</li>
                  <li>• In-situ calibration for critical process instruments</li>
                  <li>• Digital calibration certificates with blockchain verification</li>
                  <li>• AI-powered predictive calibration scheduling</li>
                  <li>• Mobile calibration teams with real-time data upload</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: 40% reduction in calibration costs, 95% reduction in production downtime, 
                and 100% audit compliance with automated regulatory reporting.
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Advanced calibration techniques combine sophisticated measurement science with practical 
                implementation strategies. Mastering uncertainty calculations, troubleshooting methods, 
                and emerging technologies ensures optimal calibration performance and regulatory compliance 
                whilst minimising costs and maximising reliability.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What is the difference between Type A and Type B uncertainty?",
                options: [
                  "Type A is more important than Type B",
                  "Type A is evaluated by statistical analysis of repeated measurements; Type B is evaluated by other means such as specifications or prior knowledge",
                  "They are the same thing",
                  "Type B is only used for electrical measurements"
                ],
                correctAnswer: 1,
                explanation: "Type A uncertainty is statistically evaluated from repeated measurements, while Type B is evaluated from other sources like manufacturer specifications, certificates, or scientific judgement."
              },
              {
                id: 2,
                question: "What are the benefits of in-situ calibration?",
                options: [
                  "It's always cheaper",
                  "No removal from service, calibration under actual operating conditions, includes installation effects, and reduced downtime costs",
                  "It's faster than laboratory calibration",
                  "It doesn't require calibration standards"
                ],
                correctAnswer: 1,
                explanation: "In-situ calibration eliminates removal from service, accounts for actual operating conditions and installation effects, and significantly reduces production downtime costs."
              },
              {
                id: 3,
                question: "How do you troubleshoot repeatability problems in calibration?",
                options: [
                  "Replace the instrument immediately",
                  "Allow proper stabilisation time, control environmental conditions, check for mechanical wear or electrical noise, and implement shielding if necessary",
                  "Ignore the problem",
                  "Use a different calibration standard"
                ],
                correctAnswer: 1,
                explanation: "Repeatability problems require systematic troubleshooting including adequate stabilisation time, environmental control, checking for wear/noise sources, and implementing appropriate shielding or isolation."
              },
              {
                id: 4,
                question: "What emerging technologies are affecting modern calibration practices?",
                options: [
                  "Only traditional methods work",
                  "AI for predictive calibration, IoT connectivity, blockchain certificates, automated calibration systems, and cloud-based management platforms",
                  "Technology doesn't affect calibration",
                  "Only mechanical improvements matter"
                ],
                correctAnswer: 1,
                explanation: "Modern calibration is being transformed by AI-driven predictive maintenance, IoT connectivity, blockchain-secured certificates, automation, and cloud-based management systems."
              },
              {
                id: 5,
                question: "What are key calibration best practices for professional implementation?",
                options: [
                  "Speed is the only consideration",
                  "Proper preparation and stabilisation, systematic approach following procedures, comprehensive documentation, trend monitoring, and continuous process improvement",
                  "Minimal documentation is sufficient",
                  "Only calibrate when equipment fails"
                ],
                correctAnswer: 1,
                explanation: "Professional calibration requires thorough preparation, systematic procedures, comprehensive documentation, historical trend monitoring, and continuous improvement of processes and methods."
            }
            ]}
            title="Section 6 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-6-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section6;