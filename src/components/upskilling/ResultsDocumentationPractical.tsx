import { Wrench, CheckCircle, AlertTriangle, Calculator, FileCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResultsDocumentationPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Documentation Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        {/* Exercise 1: Certificate Completion */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Exercise 1: Certificate Completion</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <div className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div className="space-y-3">
                <h4 className="text-foreground font-medium text-sm sm:text-base">Scenario: Recording Test Results</h4>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                  You've tested a 32A Type B MCB circuit and obtained the following readings:
                </p>
                
                <div className="bg-elec-dark p-3 sm:p-4 rounded-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <h5 className="text-elec-yellow font-medium text-sm">Test Results:</h5>
                      <ul className="text-foreground text-xs sm:text-sm space-y-1">
                        <li>• Ze: 0.35Ω</li>
                        <li>• R1: 0.18Ω</li>
                        <li>• R2: 0.18Ω</li>
                        <li>• Zs: 0.71Ω</li>
                        <li>• PFC: 325A</li>
                        <li>• IR: &gt;999MΩ</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-elec-yellow font-medium text-sm">Circuit Details:</h5>
                      <ul className="text-foreground text-xs sm:text-sm space-y-1">
                        <li>• Circuit: Ring final</li>
                        <li>• Cable: 2.5mm² T&E</li>
                        <li>• MCB: 32A Type B</li>
                        <li>• Max Zs: 1.44Ω</li>
                        <li>• Breaking: 6kA</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-green-200 font-medium mb-2 text-sm">Assessment</h5>
                        <ul className="text-foreground text-xs sm:text-sm space-y-1">
                          <li>• Zs (0.71Ω) is well below limit (1.44Ω) ✓</li>
                          <li>• PFC (325A) is below MCB rating (6kA) ✓</li>
                          <li>• Insulation resistance is excellent ✓</li>
                          <li>• All results are acceptable for certification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 2: Failure Investigation */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Exercise 2: Investigating Failed Results</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-3">
                <h4 className="text-foreground font-medium text-sm sm:text-base">Scenario: High Loop Impedance</h4>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                  A 16A Type B MCB circuit shows Zs = 3.2Ω (limit is 2.87Ω). What actions are required?
                </p>
                
                <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                  <h5 className="text-red-200 font-medium mb-2 text-sm">Investigation Steps:</h5>
                  <ol className="space-y-2 text-foreground text-xs sm:text-sm">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      Verify measurement accuracy - retest with calibrated equipment
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      Check earth connections at distribution board and outlet
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      Measure Ze separately to identify contribution
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                      Record actual readings and do not certify until resolved
                    </li>
                  </ol>
                </div>
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                  <h5 className="text-yellow-200 font-medium mb-2 text-sm">Possible Solutions:</h5>
                  <ul className="text-foreground text-xs sm:text-sm space-y-1">
                    <li>• Improve earth bonding connections</li>
                    <li>• Install supplementary bonding if required</li>
                    <li>• Add RCD protection (reduces disconnection time requirement)</li>
                    <li>• Replace with lower-rated MCB if load permits</li>
                    <li>• Upgrade circuit cable size if necessary</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 3: Digital Documentation */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Exercise 3: Digital vs Manual Recording</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Calculator className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div className="space-y-3">
                <h4 className="text-foreground font-medium text-sm sm:text-base">Modern Documentation Methods</h4>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                  Compare traditional manual recording with modern digital systems:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                    <h5 className="text-blue-200 font-medium mb-2 text-sm">Manual Recording</h5>
                    <div className="space-y-2">
                      <p className="text-foreground text-xs mb-1">Advantages:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        <li>• No battery dependence</li>
                        <li>• Always available</li>
                        <li>• Familiar to all users</li>
                      </ul>
                      <p className="text-foreground text-xs mb-1 mt-2">Disadvantages:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        <li>• Transcription errors</li>
                        <li>• Time-consuming</li>
                        <li>• No automatic calculations</li>
                        <li>• Handwriting legibility</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <h5 className="text-green-200 font-medium mb-2 text-sm">Digital Systems</h5>
                    <div className="space-y-2">
                      <p className="text-foreground text-xs mb-1">Advantages:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        <li>• Automatic data transfer</li>
                        <li>• Instant calculations</li>
                        <li>• Timestamped results</li>
                        <li>• Easy backup/sharing</li>
                      </ul>
                      <p className="text-foreground text-xs mb-1 mt-2">Disadvantages:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        <li>• Battery dependence</li>
                        <li>• Learning curve</li>
                        <li>• Equipment cost</li>
                        <li>• Technology failures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 4: Time Management */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Exercise 4: Efficient Documentation Workflow</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div className="space-y-3">
                <h4 className="text-foreground font-medium text-sm sm:text-base">Streamlined Recording Process</h4>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                  Develop an efficient workflow to minimise documentation time while maintaining accuracy:
                </p>
                
                <div className="bg-elec-dark p-3 sm:p-4 rounded-md">
                  <h5 className="text-elec-yellow font-medium mb-3 text-sm">Recommended Workflow:</h5>
                  <ol className="space-y-2 text-foreground text-xs sm:text-sm">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      Pre-populate certificate details before testing
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      Use systematic circuit numbering and labelling
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      Record results immediately after each test
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                      Check calculations and limits before moving on
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                      Complete certificate review before leaving site
                    </li>
                  </ol>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                  <p className="text-foreground text-xs sm:text-sm">
                    <strong>Time-saving tip:</strong> Use standard templates and checklists to ensure nothing is missed 
                    and reduce the mental load of remembering all requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};