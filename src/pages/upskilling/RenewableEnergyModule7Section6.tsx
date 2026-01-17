import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section6Questions } from '@/data/upskilling/renewableEnergyModule7QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import SafetyIsolationPractical from '@/components/upskilling/renewable-energy/SafetyIsolationPractical';
import SafetyIsolationFAQ from '@/components/upskilling/renewable-energy/SafetyIsolationFAQ';

const RenewableEnergyModule7Section6 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/renewable-energy-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Safety, Isolation, and Working
                </h1>
                <p className="text-xl text-gray-400">
                  Essential procedures for working safely on renewable energy systems
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 7
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 6
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Working safely on live or recently active systems is non-negotiable. Proper isolation and safety 
                procedures protect both personnel and equipment from serious harm.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Apply correct isolation procedures</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Work safely around stored energy</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Follow lockout/tagout practices</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Safe Shutdown and Isolation Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Systematic isolation procedures prevent accidents and ensure safe working conditions:</p>
              
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <h4 className="text-red-400 font-semibold mb-3">Critical Five-Step Isolation Sequence:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li><strong>Isolate AC supply:</strong> Main switch, then inverter AC isolator</li>
                  <li><strong>Isolate DC sources:</strong> PV array disconnect, then string fuses/breakers</li>
                  <li><strong>Discharge stored energy:</strong> Wait minimum 5 minutes for capacitors</li>
                  <li><strong>Test for dead condition:</strong> Use approved proving unit on all circuits</li>
                  <li><strong>Secure isolation:</strong> Lock out isolators and apply warning tags</li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">PV System Isolation Protocol:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">AC Side Isolation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Turn off main AC isolator at distribution board</li>
                        <li>• Switch inverter AC isolator to OFF position</li>
                        <li>• Verify grid supply is isolated using voltage tester</li>
                        <li>• Lock isolators in OFF position</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">DC Side Isolation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Open DC isolator at inverter</li>
                        <li>• Open string fuses or DC breakers at combiner</li>
                        <li>• Cover panels with opaque material if accessible</li>
                        <li>• Test each string for zero voltage</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Battery Storage Safety:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">BMS Shutdown:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Access BMS interface (touchscreen or app)</li>
                        <li>• Initiate controlled shutdown sequence</li>
                        <li>• Wait for confirmation of shutdown complete</li>
                        <li>• Verify contactors have opened</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Physical Disconnection:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Remove negative terminal first (standard practice)</li>
                        <li>• Use insulated tools rated for system voltage</li>
                        <li>• Store terminals safely to prevent reconnection</li>
                        <li>• Test for zero voltage across battery terminals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">LOTO (Lockout/Tagout) Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">LOTO Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><strong>Prepare:</strong> Identify all energy sources and isolation points</li>
                  <li><strong>Notify:</strong> Inform all affected personnel of the shutdown</li>
                  <li><strong>Shutdown:</strong> Follow proper sequence to de-energise equipment</li>
                  <li><strong>Isolate:</strong> Physically disconnect or block energy sources</li>
                  <li><strong>Lock:</strong> Apply locks to prevent re-energisation</li>
                  <li><strong>Tag:</strong> Attach warning tags with contact information</li>
                  <li><strong>Verify:</strong> Test equipment to confirm zero energy state</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">PPE Requirements and Hazard Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Arc Flash Protection:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Arc-rated clothing and gloves</li>
                    <li>Face shields with appropriate arc rating</li>
                    <li>Leather over-protectors for gloves</li>
                    <li>Non-melting undergarments</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Battery Hazards:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Eye protection from acid splash</li>
                    <li>Chemical-resistant gloves</li>
                    <li>Non-conductive footwear</li>
                    <li>Emergency eyewash and shower access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Risk Assessment and Toolbox Talks</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="font-semibold text-white">Pre-Work Safety Checklist:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Weather conditions assessment</li>
                  <li>Equipment condition verification</li>
                  <li>Personnel competency check</li>
                  <li>Emergency procedure review</li>
                </ul>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Communication plan establishment</li>
                  <li>Isolation point identification</li>
                  <li>PPE requirements confirmation</li>
                  <li>First aid arrangements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">DC vs AC Safety Considerations</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Why DC is More Dangerous:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>No natural current zero-crossing point</li>
                  <li>Arc persistence and difficulty in extinguishing</li>
                  <li>Continuous energy release during faults</li>
                  <li>Higher voltage stress on insulation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> Installer received flash burns after isolating AC but not DC—missed 
                  voltage on DC string. Always follow complete isolation procedures and verify zero energy state 
                  before beginning work.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Your last line of defence is proper procedure and situational awareness. Never compromise on safety 
                procedures—the consequences can be life-changing.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={section6Questions}
                title="Safety and Isolation Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/renewable-energy-module-7-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/renewable-energy-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Complete Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section6;