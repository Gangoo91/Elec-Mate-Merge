
import React from "react";
import { AlertTriangle, CheckSquare, Shield, Clipboard } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RiskAssessment = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-elec-yellow">Risk Assessment for Electrical Work</h3>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-elec-yellow/10 rounded-full text-sm text-elec-yellow border border-elec-yellow/20">
          <Clipboard className="h-4 w-4" />
          <span>Required Documentation</span>
        </div>
      </div>
      
      <p className="text-base md:text-lg">
        Risk assessment is a vital process that identifies potential hazards, evaluates risks, and establishes
        control measures to prevent accidents during electrical installation and maintenance activities.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-elec-yellow/10 to-transparent p-4 border-b border-elec-yellow/20">
          <h4 className="font-semibold text-lg text-elec-yellow">Risk Assessment Process</h4>
          <p className="text-sm mt-1 text-gray-300">A systematic approach to identifying hazards and implementing controls</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-elec-gray border border-elec-yellow/10 rounded-lg overflow-hidden hover:border-elec-yellow/30 transition-colors duration-300">
              <div className="bg-elec-yellow/5 p-3 border-b border-elec-yellow/10 flex items-center gap-2">
                <div className="bg-elec-yellow/10 rounded-full h-7 w-7 flex items-center justify-center text-elec-yellow font-medium">1</div>
                <h5 className="font-medium text-elec-yellow">Identify Hazards</h5>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Electrical shock and burns risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Fire hazards from faulty equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Working at height concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Manual handling of heavy equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Environmental factors (wet conditions, etc.)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-elec-gray border border-elec-yellow/10 rounded-lg overflow-hidden hover:border-elec-yellow/30 transition-colors duration-300">
              <div className="bg-elec-yellow/5 p-3 border-b border-elec-yellow/10 flex items-center gap-2">
                <div className="bg-elec-yellow/10 rounded-full h-7 w-7 flex items-center justify-center text-elec-yellow font-medium">2</div>
                <h5 className="font-medium text-elec-yellow">Evaluate Risks</h5>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Determine likelihood of harm occurring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Assess potential severity of harm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Consider who might be affected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Evaluate existing control measures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Record findings systematically</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-elec-gray border border-elec-yellow/10 rounded-lg overflow-hidden hover:border-elec-yellow/30 transition-colors duration-300">
              <div className="bg-elec-yellow/5 p-3 border-b border-elec-yellow/10 flex items-center gap-2">
                <div className="bg-elec-yellow/10 rounded-full h-7 w-7 flex items-center justify-center text-elec-yellow font-medium">3</div>
                <h5 className="font-medium text-elec-yellow">Control Measures</h5>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Follow the hierarchy of controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Implement safe work procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Use appropriate PPE and tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Ensure proper isolation procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Implement permit-to-work systems</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="bg-elec-gray border border-elec-yellow/10 rounded-lg overflow-hidden hover:border-elec-yellow/30 transition-colors duration-300">
              <div className="bg-elec-yellow/5 p-3 border-b border-elec-yellow/10 flex items-center gap-2">
                <div className="bg-elec-yellow/10 rounded-full h-7 w-7 flex items-center justify-center text-elec-yellow font-medium">4</div>
                <h5 className="font-medium text-elec-yellow">Review & Update</h5>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Regularly review assessment effectiveness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Update after incidents or near misses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Revise when working methods change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Document all changes and improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Communicate updates to all workers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Improved Hierarchy of Controls Diagram */}
          <div className="mt-8">
            <Card className="bg-elec-gray border border-elec-yellow/20">
              <CardHeader className="pb-2 border-b border-elec-yellow/20">
                <h5 className="font-medium text-elec-yellow">Hierarchy of Controls</h5>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-green-900/30 border border-green-500/30 p-3 rounded-lg">
                    <div className="font-medium text-green-400 mb-1 flex items-center gap-2">
                      <span className="bg-green-800/50 h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span>
                      Elimination
                    </div>
                    <p className="text-sm text-gray-300">Remove the hazard completely (e.g., redesign the job)</p>
                  </div>
                  
                  <div className="bg-green-800/30 border border-green-500/30 p-3 rounded-lg">
                    <div className="font-medium text-green-400 mb-1 flex items-center gap-2">
                      <span className="bg-green-800/50 h-6 w-6 rounded-full flex items-center justify-center text-sm">2</span>
                      Substitution
                    </div>
                    <p className="text-sm text-gray-300">Replace the hazard with something less hazardous</p>
                  </div>
                  
                  <div className="bg-yellow-900/30 border border-yellow-500/30 p-3 rounded-lg">
                    <div className="font-medium text-yellow-400 mb-1 flex items-center gap-2">
                      <span className="bg-yellow-800/50 h-6 w-6 rounded-full flex items-center justify-center text-sm">3</span>
                      Engineering Controls
                    </div>
                    <p className="text-sm text-gray-300">Isolate people from the hazard (e.g., machine guards)</p>
                  </div>
                  
                  <div className="bg-yellow-800/30 border border-yellow-500/30 p-3 rounded-lg">
                    <div className="font-medium text-yellow-400 mb-1 flex items-center gap-2">
                      <span className="bg-yellow-800/50 h-6 w-6 rounded-full flex items-center justify-center text-sm">4</span>
                      Administrative Controls
                    </div>
                    <p className="text-sm text-gray-300">Change the way people work (e.g., procedures, training)</p>
                  </div>
                  
                  <div className="bg-red-900/30 border border-red-500/30 p-3 rounded-lg">
                    <div className="font-medium text-red-400 mb-1 flex items-center gap-2">
                      <span className="bg-red-800/50 h-6 w-6 rounded-full flex items-center justify-center text-sm">5</span>
                      Personal Protective Equipment
                    </div>
                    <p className="text-sm text-gray-300">Protect the worker with personal protective equipment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-elec-dark/70 border border-elec-yellow/20 rounded-lg">
            <p className="font-medium mb-1 text-elec-yellow">Legal Requirements:</p>
            <p className="text-sm">The Management of Health and Safety at Work Regulations 1999 require employers to conduct suitable and sufficient 
            risk assessments for activities that may pose risks to employees or others. For electrical work, specific risk 
            assessments must address the unique hazards associated with electricity, in compliance with the Electricity at Work 
            Regulations 1989. Risk assessments must be documented when an employer has five or more employees.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
