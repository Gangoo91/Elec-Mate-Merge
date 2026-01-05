import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export const BMSModule7Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Hospital AHU Fire Safety Logic Error</h4>
          
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-red-400 font-semibold mb-2">The Problem: Fan Running During Fire Alarm</h5>
                <div className="text-sm text-foreground space-y-3">
                  <p>
                    <strong>Location:</strong> Hospital air handling unit serving critical care areas
                  </p>
                  <p>
                    <strong>Issue:</strong> During fire alarm testing, the supply fan continued running when it should 
                    have stopped. This could have spread smoke throughout the hospital during a real fire emergency.
                  </p>
                  <p>
                    <strong>Discovery:</strong> The problem was identified during commissioning when the electrician 
                    activated the fire alarm test and noticed the fan didn't stop as expected.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
            <h5 className="text-yellow-400 font-semibold mb-2">Root Cause Analysis</h5>
            <div className="text-sm text-foreground space-y-2">
              <p><strong>Programming Error Found:</strong></p>
              <div className="bg-gray-700 rounded-lg p-3 mt-2">
                <p className="text-red-400 mb-2"><strong>Incorrect Logic (OR):</strong></p>
                <div className="font-mono text-xs bg-black rounded p-2 mb-3">
                  Fan Run = (Manual Start) OR (Auto Schedule) OR (Fire Alarm Safe)
                </div>
                <p className="text-foreground text-xs mb-2">
                  This meant the fan would run if ANY condition was true. When fire alarm activated (Fire Alarm Safe = FALSE), 
                  the fan still ran because Manual Start was TRUE.
                </p>
                
                <p className="text-green-400 mt-3 mb-2"><strong>Correct Logic (AND/NOT):</strong></p>
                <div className="font-mono text-xs bg-black rounded p-2">
                  Fan Run = ((Manual Start) OR (Auto Schedule)) AND (Fire Alarm Safe)
                </div>
                <p className="text-foreground text-xs mt-2">
                  This ensures the fan only runs when BOTH a start command exists AND fire alarm is safe.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-green-400 font-semibold mb-2">Solution and Testing</h5>
                <div className="text-sm text-foreground space-y-2">
                  <p><strong>Immediate Actions:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Programming corrected to use proper AND/NOT logic</li>
                    <li>• All similar AHUs checked for the same error</li>
                    <li>• Fire safety logic retested with fire services present</li>
                    <li>• Documentation updated with correct logic diagrams</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Verification Tests:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Fire alarm activation: Fan stops immediately ✓</li>
                    <li>• Manual start during normal operation: Fan runs ✓</li>
                    <li>• Manual start during fire alarm: Fan remains stopped ✓</li>
                    <li>• Fire alarm reset: Normal operation resumes ✓</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Additional Real-World Scenarios</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                PID Tuning Issues
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Problem:</strong> Office temperature hunting ±3°C</p>
                <p className="text-gray-300"><strong>Cause:</strong> PID integral gain set too high</p>
                <p className="text-green-400"><strong>Solution:</strong> Reduced Ki parameter by 50%</p>
                <p className="text-foreground"><strong>Lesson:</strong> Poor tuning wastes energy and causes complaints</p>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Timer Logic Error
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Problem:</strong> Boiler cycling every 30 seconds</p>
                <p className="text-gray-300"><strong>Cause:</strong> No anti-short-cycle timer programmed</p>
                <p className="text-green-400"><strong>Solution:</strong> Added 5-minute minimum run timer</p>
                <p className="text-foreground"><strong>Lesson:</strong> Equipment protection requires proper timing</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Electrician's Role in Prevention</h4>
          
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="text-green-400 font-semibold mb-2">How Electricians Catch Programming Errors</h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-foreground">During Installation:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Question logic that doesn't make sense</li>
                    <li>• Verify safety inputs are properly wired</li>
                    <li>• Check that critical interlocks are included</li>
                    <li>• Test override functions work as intended</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">During Commissioning:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Simulate failure conditions systematically</li>
                    <li>• Verify each input produces expected output</li>
                    <li>• Test worst-case scenarios</li>
                    <li>• Document actual vs. expected behaviour</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3 mt-3">
                <p className="text-foreground text-xs">
                  <strong>Key Point:</strong> In the hospital example, the electrician's systematic testing during 
                  commissioning caught a potentially dangerous programming error that could have compromised life safety. 
                  This demonstrates why electricians must understand and verify logic functions, not just physical connections.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Key Learning Points</h4>
              <div className="text-sm text-foreground space-y-2">
                <p className="mb-2">This real-world example demonstrates that:</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Logic errors can be life-threatening:</strong> Programming mistakes in safety systems have serious consequences</li>
                  <li>• <strong>Testing saves lives:</strong> Systematic commissioning testing catches dangerous errors</li>
                  <li>• <strong>Electricians are safety advocates:</strong> Understanding logic helps identify potential problems</li>
                  <li>• <strong>Boolean logic matters:</strong> The difference between OR and AND logic can be critical</li>
                  <li>• <strong>Documentation is essential:</strong> Clear logic diagrams prevent misunderstandings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};