
import React from 'react';
import { BookOpen, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ContinuityRegulationRequirementsCard = () => (
  <Card className="bg-gradient-to-br from-card to-background border-border">
    <CardHeader className="p-4 sm:p-5 md:p-6">
      <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg md:text-xl">
        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
        BS 7671 Regulation Requirements
      </CardTitle>
      <CardDescription className="text-gray-300 text-sm sm:text-base">
        Detailed regulatory requirements for continuity of protective conductors testing
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4 sm:p-5 md:p-6">
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <h4 className="font-medium text-blue-400 text-sm sm:text-base">Regulation 612.2 - Continuity of Protective Conductors</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">612.2.1 - Test Requirements:</p>
                <div className="space-y-1 text-xs">
                  <p>• Continuity of every protective conductor must be verified</p>
                  <p>• Test current shall not be less than 200mA</p>
                  <p>• Test shall be made using a low resistance ohmmeter</p>
                  <p>• The resistance of test leads shall be measured and recorded</p>
                  <p>• Test results shall be corrected for test lead resistance</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">612.2.2 - Test Methods:</p>
                <div className="space-y-1 text-xs">
                  <p>• Method 1: Test between phase and protective conductor (R1+R2)</p>
                  <p>• Method 2: Test protective conductor only (R2)</p>
                  <p>• Temporary link method acceptable for Method 2</p>
                  <p>• All parallel paths must be disconnected during testing</p>
                  <p>• Results must be recorded on appropriate test certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
            <h4 className="font-medium text-green-400 text-sm sm:text-base">Regulation 543.1 - Protective Conductor Cross-sectional Areas</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">543.1.3 - Minimum Cross-sectional Areas:</p>
                <div className="space-y-1 text-xs">
                  <p>• Where phase conductor ≤ 16mm²: CPC = phase conductor size</p>
                  <p>• Where phase conductor {'>'}16mm² but ≤ 35mm²: CPC = 16mm²</p>
                  <p>• Where phase conductor {'>'} 35mm²: CPC = phase conductor size ÷ 2</p>
                  <p>• Minimum CPC size: 2.5mm² for mechanical protection</p>
                  <p>• Alternative calculation method using adiabatic equation</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">543.1.4 - Ring Final Circuits:</p>
                <div className="space-y-1 text-xs">
                  <p>• Total resistance R1+R2 shall not exceed 1.67Ω</p>
                  <p>• This ensures adequate fault current for protective device operation</p>
                  <p>• Value based on 32A protective device with 0.4s disconnection</p>
                  <p>• Applies to both socket outlet and fixed equipment circuits</p>
                  <p>• Regular verification required during periodic inspection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
            <h4 className="font-medium text-orange-400 text-sm sm:text-base">Regulation 411.3.2 - Automatic Disconnection Requirements</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">411.3.2.2 - Maximum Disconnection Times:</p>
                <div className="space-y-1 text-xs">
                  <p>• Final circuits not exceeding 32A: 0.4 seconds</p>
                  <p>• Distribution circuits and final circuits exceeding 32A: 5 seconds</p>
                  <p>• Special locations may have reduced disconnection times</p>
                  <p>• Times apply to TN systems (TT systems have different requirements)</p>
                  <p>• Protective conductor continuity essential for compliance</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">411.3.2.3 - Maximum Zs Values:</p>
                <div className="space-y-1 text-xs">
                  <p>• Earth fault loop impedance must not exceed tabulated values</p>
                  <p>• Values ensure adequate fault current for protective device operation</p>
                  <p>• R1+R2 component critical for overall Zs calculation</p>
                  <p>• Temperature correction factors must be applied</p>
                  <p>• Regular testing ensures continued compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
            <h4 className="font-medium text-red-400 text-sm sm:text-base">Critical Compliance Points</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">Testing Requirements:</p>
                <div className="space-y-1 text-xs">
                  <p>• Every protective conductor must be tested</p>
                  <p>• Minimum 200mA test current required</p>
                  <p>• Test lead resistance must be accounted for</p>
                  <p>• Results must be recorded and retained</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Design Compliance:</p>
                <div className="space-y-1 text-xs">
                  <p>• Protective conductor sizing per Regulation 543</p>
                  <p>• Maximum R1+R2 values for automatic disconnection</p>
                  <p>• Ring circuit specific limitations</p>
                  <p>• Bonding conductor requirements</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Documentation:</p>
                <div className="space-y-1 text-xs">
                  <p>• Electrical Installation Certificate required</p>
                  <p>• Schedule of Test Results must be completed</p>
                  <p>• Periodic inspection reports for existing installations</p>
                  <p>• Competent person certification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ContinuityRegulationRequirementsCard;
