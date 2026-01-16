import { ArrowLeft, FileText, Zap, Monitor, Route, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section6Questions } from '@/data/upskilling/renewableEnergyModule2QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule2Section6 = () => {
  const quizQuestions = section6Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Typical Single-Line Diagrams and Component Flow
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Creating and interpreting solar PV system diagrams for clear technical communication
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                System Diagrams
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Read and produce standard single-line diagrams (SLDs)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Trace component-level energy flows through PV systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Communicate effectively with installation teams using technical diagrams
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Schematics are a PV designer&apos;s blueprint. This section teaches how to read and create essential system diagrams. SLDs make your design buildable and inspectable — they are your project&apos;s technical language.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                PV System Symbols and Conventions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Standard PV Symbols:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solar panel:</strong> Rectangle with diagonal lines</li>
                    <li>• <strong>Inverter:</strong> Rectangle with AC/DC notation</li>
                    <li>• <strong>DC isolator:</strong> Switch symbol with DC marking</li>
                    <li>• <strong>AC isolator:</strong> Switch symbol with AC marking</li>
                    <li>• <strong>Meter:</strong> Circle with M or kWh marking</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Drawing Conventions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Power flow:</strong> Left to right, top to bottom</li>
                    <li>• <strong>Line types:</strong> Thick for power, thin for control</li>
                    <li>• <strong>Labels:</strong> Component ratings and identifications</li>
                    <li>• <strong>References:</strong> Grid references for complex drawings</li>
                    <li>• <strong>Standards:</strong> IEC 60617 electrical symbols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Route className="h-6 w-6 text-green-400" />
                Component Placement and Energy Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-3">Typical Energy Flow Sequence:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>1. PV Array:</strong> Solar panels generate DC electricity</p>
                  <p><strong>2. DC Isolator:</strong> Safety isolation near array</p>
                  <p><strong>3. Inverter:</strong> DC to AC conversion</p>
                  <p><strong>4. AC Isolator:</strong> AC side safety isolation</p>
                  <p><strong>5. Generation Meter:</strong> Measures PV output</p>
                  <p><strong>6. Distribution Board:</strong> Circuit protection and distribution</p>
                  <p><strong>7. Loads/Export:</strong> Building consumption or grid export</p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Key Placement Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Inverter location:</strong> Accessible, ventilated, protected from weather</li>
                  <li>• <strong>Meter placement:</strong> DNO accessible location</li>
                  <li>• <strong>Isolator positioning:</strong> Visible and accessible for emergency use</li>
                  <li>• <strong>Cable routes:</strong> Shortest practical paths with protection</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real World Case Study */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Commercial Rooftop Installation SLD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A 100kW commercial installation on a factory roof requires detailed SLD documentation for DNO approval and MCS certification. The system comprises 250 × 400W panels, 4 × 25kW string inverters, and complex AC distribution.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">SLD Must Show:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">DC Side Details:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 62 strings of 4 panels each (248 panels total)</li>
                      <li>• String voltage: 148V VMP, 180V VOC</li>
                      <li>• 4 × combiner boxes with DC isolation</li>
                      <li>• Surge protection devices at each inverter</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">AC Side Details:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 4 × 25kW three-phase inverters</li>
                      <li>• Individual AC isolators per inverter</li>
                      <li>• Generation meter and export limitation</li>
                      <li>• Integration with existing switchgear</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced SLD Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Route className="h-6 w-6 text-cyan-400" />
                Advanced SLD Considerations and Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Complex System Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Battery storage integration:</strong> DC and AC coupled options</li>
                    <li>• <strong>Multiple inverter types:</strong> String, power optimizers, microinverters</li>
                    <li>• <strong>Monitoring systems:</strong> Communication pathways and data flow</li>
                    <li>• <strong>Load management:</strong> Smart switching and demand response</li>
                    <li>• <strong>Grid services:</strong> Frequency response and voltage support</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Protection and Safety Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Arc fault protection:</strong> DC arc fault circuit interrupters</li>
                    <li>• <strong>Rapid shutdown:</strong> Module-level or string-level systems</li>
                    <li>• <strong>Ground fault protection:</strong> GFDI devices and monitoring</li>
                    <li>• <strong>Islanding protection:</strong> Anti-islanding functions in inverters</li>
                    <li>• <strong>Fire safety systems:</strong> Emergency isolation and access</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-2">Documentation Standards and Compliance:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>IEC 61730:</strong> Photovoltaic module safety qualification requirements</li>
                  <li>• <strong>IEC 62446:</strong> Grid connected PV systems documentation requirements</li>
                  <li>• <strong>BS 7909:</strong> Code of practice for temporary electrical systems</li>
                  <li>• <strong>MCS standards:</strong> Microgeneration certification scheme requirements</li>
                  <li>• <strong>DNO requirements:</strong> Distribution network operator specifications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Practical Drawing Tips */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-green-400" />
                Practical SLD Drawing Tips and Common Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Drawing Best Practices:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Clear labeling:</strong> Every component clearly identified</li>
                    <li>• <strong>Consistent scaling:</strong> Proportional representation where possible</li>
                    <li>• <strong>Logical flow:</strong> Power flow from left to right, top to bottom</li>
                    <li>• <strong>Legend inclusion:</strong> Symbol definitions and abbreviations</li>
                    <li>• <strong>Rating information:</strong> Voltage, current, and power ratings shown</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Common Drawing Mistakes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Missing isolators:</strong> Forgetting mandatory isolation points</li>
                    <li>• <strong>Incorrect symbols:</strong> Using wrong symbols for components</li>
                    <li>• <strong>Incomplete labeling:</strong> Missing component ratings or designations</li>
                    <li>• <strong>Scale inconsistency:</strong> Mixing different drawing scales</li>
                    <li>• <strong>Unclear connections:</strong> Ambiguous wiring representations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Professional Presentation Standards:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Title blocks:</strong> Project information, drawing number, revision control</li>
                  <li>• <strong>Drawing standards:</strong> Consistent line weights, text sizes, spacing</li>
                  <li>• <strong>Cross-references:</strong> Links to other drawings and specifications</li>
                  <li>• <strong>Approval signatures:</strong> Design engineer and checker signatures</li>
                  <li>• <strong>Digital formats:</strong> CAD file management and PDF generation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Future Trends */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-6 w-6 text-yellow-400" />
                Future Trends in PV System Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The evolution of PV technology and digitalization is transforming how we document and manage solar installations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Digital Twin Technology:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Real-time system modeling</li>
                    <li>• Predictive maintenance algorithms</li>
                    <li>• Performance optimization</li>
                    <li>• Virtual commissioning</li>
                    <li>• Lifecycle management</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Augmented Reality (AR):</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• On-site diagram overlay</li>
                    <li>• Interactive troubleshooting</li>
                    <li>• Training simulations</li>
                    <li>• Maintenance guidance</li>
                    <li>• Installation verification</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">AI-Assisted Design:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Automated SLD generation</li>
                    <li>• Code compliance checking</li>
                    <li>• Optimization suggestions</li>
                    <li>• Error detection algorithms</li>
                    <li>• Standards updates integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-6 w-6 text-purple-400" />
                Export Meters and Monitoring Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Metering Configuration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Generation meter:</strong> Measures total PV output</li>
                    <li>• <strong>Export meter:</strong> Records electricity sent to grid</li>
                    <li>• <strong>Import meter:</strong> Standard consumption meter</li>
                    <li>• <strong>Net metering:</strong> Bidirectional meters in some areas</li>
                    <li>• <strong>Smart meters:</strong> Remote reading and time-of-use data</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Monitoring Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Inverter monitoring:</strong> Built-in data logging</li>
                    <li>• <strong>String monitoring:</strong> Individual string performance</li>
                    <li>• <strong>Panel-level monitoring:</strong> Optimizer-based systems</li>
                    <li>• <strong>Weather monitoring:</strong> Irradiance and temperature</li>
                    <li>• <strong>Remote access:</strong> Internet-based monitoring platforms</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-400" />
                Design Software and Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Professional Software:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>AutoCAD Electrical:</strong> Professional schematic design</li>
                    <li>• <strong>EPLAN:</strong> Electrical engineering platform</li>
                    <li>• <strong>PVsyst:</strong> Integrated system design</li>
                    <li>• <strong>Aurora Solar:</strong> Complete design platform</li>
                    <li>• <strong>SolarEdge Designer:</strong> System-specific tools</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Documentation Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Single-line diagrams:</strong> Overall system layout</li>
                    <li>• <strong>Wiring diagrams:</strong> Detailed connections</li>
                    <li>• <strong>Layout drawings:</strong> Physical component placement</li>
                    <li>• <strong>Equipment schedules:</strong> Component specifications</li>
                    <li>• <strong>Cable schedules:</strong> Cable types and routes</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Quality Assurance:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Design reviews:</strong> Multi-discipline checking</li>
                    <li>• <strong>Standards compliance:</strong> Code and regulation adherence</li>
                    <li>• <strong>Version control:</strong> Drawing revision management</li>
                    <li>• <strong>As-built drawings:</strong> Final installation records</li>
                    <li>• <strong>Client communication:</strong> Clear, understandable drawings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                SLDs make your design buildable and inspectable. They are your project&apos;s technical language. Clear, accurate diagrams ensure proper installation, facilitate maintenance, and demonstrate compliance with electrical standards. Professional documentation is essential for project success.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Single-Line Diagrams Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section6;