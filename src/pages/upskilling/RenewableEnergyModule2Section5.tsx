import { ArrowLeft, Zap, Shield, FileText, Cable, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section5Questions } from '@/data/upskilling/renewableEnergyModule2QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule2Section5 = () => {
  const quizQuestions = section5Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              PV System Layouts: DC Side, AC Side, and Isolation
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding DC and AC system layouts with isolation requirements for safe operation
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                System Layouts
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
                  Differentiate between DC and AC system layouts and components
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand isolation requirements and safety procedures
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Plan for safe maintenance access and system operation
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
                Layout planning is about safety and performance. This section breaks down how energy moves through your system — and how to isolate it safely. A clear, well-labelled system is easier to operate, maintain, and inspect — and legally compliant.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                DC Side Layout and Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">DC Wiring Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>String cables:</strong> DC cables connecting panels in series</li>
                    <li>• <strong>Combiner boxes:</strong> Combine multiple string outputs</li>
                    <li>• <strong>DC isolators:</strong> Safety isolation devices</li>
                    <li>• <strong>Surge protection:</strong> DC SPDs protect against overvoltage</li>
                    <li>• <strong>Monitoring:</strong> Current and voltage measurement devices</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">DC System Layout:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Panel strings:</strong> Series-connected panels</li>
                    <li>• <strong>String routing:</strong> Cables from array to combiner/inverter</li>
                    <li>• <strong>Positive/negative:</strong> Separate DC+ and DC- conductors</li>
                    <li>• <strong>Grounding:</strong> Equipment grounding conductor</li>
                    <li>• <strong>Labelling:</strong> Clear identification of DC circuits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-6 w-6 text-green-400" />
                AC Side Layout and Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">AC Output Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Inverters:</strong> DC to AC conversion equipment</li>
                    <li>• <strong>AC isolators:</strong> Load-break switches for AC side</li>
                    <li>• <strong>Generation meters:</strong> Measure PV system output</li>
                    <li>• <strong>Distribution boards:</strong> AC circuit protection and distribution</li>
                    <li>• <strong>Grid connection:</strong> Export meter and main supply</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">AC System Flow:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Inverter output:</strong> Single or three-phase AC</li>
                    <li>• <strong>AC isolation:</strong> Switching and protection</li>
                    <li>• <strong>Metering:</strong> Generation and consumption measurement</li>
                    <li>• <strong>Distribution:</strong> Building loads and grid export</li>
                    <li>• <strong>Protection:</strong> RCD and overcurrent devices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced System Architectures */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-6 w-6 text-purple-400" />
                Advanced System Architectures and Topologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern PV systems employ various architectural approaches to optimise performance and reliability.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Centralised Architecture:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Configuration:</strong> Multiple strings to single inverter</li>
                    <li>• <strong>Advantages:</strong> Lower cost, fewer components</li>
                    <li>• <strong>Disadvantages:</strong> Single point of failure</li>
                    <li>• <strong>Applications:</strong> Utility-scale installations</li>
                    <li>• <strong>Monitoring:</strong> String-level visibility</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Distributed Architecture:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Configuration:</strong> Multiple string inverters</li>
                    <li>• <strong>Advantages:</strong> Redundancy, flexible design</li>
                    <li>• <strong>Disadvantages:</strong> Higher initial cost</li>
                    <li>• <strong>Applications:</strong> Commercial installations</li>
                    <li>• <strong>Monitoring:</strong> Inverter-level granularity</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Module-Level Architecture:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Configuration:</strong> Microinverters or optimizers</li>
                    <li>• <strong>Advantages:</strong> Panel-level MPPT and monitoring</li>
                    <li>• <strong>Disadvantages:</strong> Highest cost, complexity</li>
                    <li>• <strong>Applications:</strong> Residential, complex shading</li>
                    <li>• <strong>Monitoring:</strong> Individual panel performance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-2">Hybrid System Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>AC coupling:</strong> Battery storage connected to AC side</li>
                  <li>• <strong>DC coupling:</strong> Direct DC connection for higher efficiency</li>
                  <li>• <strong>Critical loads:</strong> Backup power circuit design</li>
                  <li>• <strong>Grid services:</strong> Frequency response and voltage support capabilities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Smart Grid Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-400" />
                Smart Grid Integration and Vehicle-to-Grid (V2G)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Next-generation PV systems integrate with smart grid technologies and electric vehicle charging infrastructure.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Smart Grid Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dynamic pricing:</strong> Real-time tariff response</li>
                    <li>• <strong>Load forecasting:</strong> AI-driven demand prediction</li>
                    <li>• <strong>Grid support services:</strong> Frequency and voltage regulation</li>
                    <li>• <strong>Peer-to-peer trading:</strong> Local energy markets</li>
                    <li>• <strong>Demand response:</strong> Automated load management</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">V2G Integration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Bidirectional charging:</strong> EV battery as grid resource</li>
                    <li>• <strong>Solar + EV synergy:</strong> Daytime charging optimisation</li>
                    <li>• <strong>Grid stabilisation:</strong> Mobile energy storage</li>
                    <li>• <strong>Emergency backup:</strong> Vehicle-to-home capability</li>
                    <li>• <strong>Revenue streams:</strong> Grid services compensation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Communication Protocols:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Modbus RTU/TCP:</strong> Industrial standard for system integration</p>
                  <p><strong>SunSpec Alliance:</strong> Standardised monitoring and control interfaces</p>
                  <p><strong>IEEE 2030.5:</strong> Smart grid interoperability standard</p>
                  <p><strong>OpenADR:</strong> Automated demand response protocols</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Systems Deep Dive */}
          <Card className="bg-red-900/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">Advanced Safety Systems and Arc Fault Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Modern PV systems incorporate sophisticated safety mechanisms to protect against electrical hazards and fire risks.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-red-400 font-semibold mb-3">Arc Fault Detection and Mitigation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Detection Methods:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• High-frequency signature analysis</li>
                      <li>• Current waveform distortion monitoring</li>
                      <li>• Temperature gradient sensing</li>
                      <li>• Visual spectrum detection (UV cameras)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Response Actions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Immediate string isolation</li>
                      <li>• Alarm notification systems</li>
                      <li>• Location identification</li>
                      <li>• Maintenance scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2">Rapid Shutdown Systems (RSS):</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Module-level shutdown:</strong> Voltage reduction to &lt;80V within 10 seconds</li>
                  <li>• <strong>Controlled conductor area:</strong> 1m boundary around array perimeter</li>
                  <li>• <strong>Emergency activation:</strong> Fire service accessible controls</li>
                  <li>• <strong>Automatic triggers:</strong> Grid loss, system fault, or manual activation</li>
                  <li>• <strong>Compliance:</strong> Required for many jurisdictions and insurance</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                Isolation Requirements and Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="text-red-400 font-semibold mb-3">Essential Isolation Points:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>DC isolators:</strong> Near PV array, accessible and visible</li>
                  <li>• <strong>AC isolators:</strong> Before connection to distribution board</li>
                  <li>• <strong>Emergency isolation:</strong> Rapid shutdown capability</li>
                  <li>• <strong>Maintenance isolation:</strong> Safe working procedures</li>
                  <li>• <strong>Grid isolation:</strong> DNO-controlled main switch</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-2">IEC 60364 Compliance Requirements:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Isolation devices must be lockable in the open position</li>
                  <li>• Clear labelling indicating purpose and operating instructions</li>
                  <li>• Accessible location for maintenance personnel</li>
                  <li>• Suitable for the installed environment and current ratings</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-400" />
                Labelling, Signage, and Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Required Labels and Signs:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>PV installation present:</strong> Main DB warning label</li>
                    <li>• <strong>Dual supply warning:</strong> Grid and PV supply notification</li>
                    <li>• <strong>DC isolation:</strong> Clear identification of DC isolators</li>
                    <li>• <strong>Emergency procedures:</strong> Shutdown instructions</li>
                    <li>• <strong>System data:</strong> Installation details and ratings</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Cable Identification:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>DC cables:</strong> Red (positive) and black (negative)</li>
                    <li>• <strong>AC cables:</strong> Standard AC colour coding</li>
                    <li>• <strong>Earth cables:</strong> Green/yellow identification</li>
                    <li>• <strong>Cable markers:</strong> Circuit identification every 3m</li>
                    <li>• <strong>Conduit labels:</strong> Contents identification</li>
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
                A clear, well-labelled system is easier to operate, maintain, and inspect — and legally compliant. Proper separation of DC and AC sides, appropriate isolation devices, and comprehensive labelling ensure safe operation and maintenance throughout the system lifecycle.
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
                title="PV System Layouts Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section5;