import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle, Users, Clock, MapPin, Building, Heart, Factory } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection3_4 = () => {
  const [openChecks, setOpenChecks] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setOpenChecks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Why Risk Matters */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            1. Why Risk Matters
          </h3>
          
          <div className="space-y-3">
            <p>
              Every building presents unique challenges that generic rules may not address.
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Occupancy type:</strong> Are occupants familiar with the building (staff) or unfamiliar (public)?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Occupant profile:</strong> Are there vulnerable groups (children, elderly, disabled, patients)?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Building function:</strong> Are dangerous tasks being carried out (workshops, labs, kitchens)?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Layout complexity:</strong> Long corridors, multiple staircases, or split-level floors increase risk.</span>
              </li>
            </ul>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(0)}
              >
                ✅ Quick Check: Name two factors that make risk-based adjustments necessary in emergency lighting design.
              </Button>
              {openChecks.includes(0) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Occupant profile (vulnerable groups needing additional assistance) and building function (hazardous activities requiring enhanced safety measures). Layout complexity and occupancy familiarity are also key factors.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Adjustments to Lux Levels */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            2. Adjustments to Lux Levels
          </h3>
          
          <div className="space-y-3">
            <p>
              Minimum lux values may not be enough in high-risk or complex environments.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Healthcare Facilities:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Care homes/hospitals: Higher lux for patients with reduced vision</li>
                  <li>• Recommended 3-5 lux in corridors (vs 1 lux minimum)</li>
                  <li>• Operating theatres may need 10+ lux</li>
                </ul>
              </div>
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Industrial Plants:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• High-risk task areas may demand 15+ lux</li>
                  <li>• Chemical plants need enhanced safety equipment visibility</li>
                  <li>• Manufacturing areas with moving machinery</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-2">Entertainment Venues:</h4>
              <p className="text-sm">Theatres/cinemas may need wayfinding lighting maintained at low background levels to aid orientation without compromising dark adaptation.</p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(1)}
              >
                ✅ Quick Check: Why might a hospital corridor need brighter emergency lighting than the minimum standard?
              </Button>
              {openChecks.includes(1) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Patients often have reduced vision, mobility issues, or medical conditions affecting navigation. Higher lux levels (3-5 lux vs 1 lux minimum) ensure they can safely navigate during evacuation, particularly if staff assistance is limited.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Adjustments to Duration */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Clock className="h-5 w-5" />
            3. Adjustments to Duration
          </h3>
          
          <div className="space-y-3">
            <p>
              The evacuation time of a building depends on its size, use, and occupants.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">1-Hour Duration:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Small offices (under 100 occupants)</li>
                  <li>• Single-storey retail units</li>
                  <li>• Simple layouts with direct exits</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">3-Hour Duration:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Large public venues and shopping centres</li>
                  <li>• High-rise buildings (extended evacuation times)</li>
                  <li>• Healthcare facilities with patient evacuation</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
              <p className="text-red-300 font-medium">
                ⚠️ Re-entry requirements: If staff must return after evacuation (e.g. to shut down equipment), longer durations may be needed.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(2)}
              >
                ✅ Quick Check: Why do high-rise buildings generally require 3-hour emergency lighting?
              </Button>
              {openChecks.includes(2) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> High-rise evacuations take significantly longer due to stairwell capacity limits, phased evacuation procedures, and the time needed to evacuate all floors safely. Three hours provides adequate time for complete evacuation and emergency service operations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Placement and Coverage Adjustments */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            4. Placement and Coverage Adjustments
          </h3>
          
          <div className="space-y-3">
            <p>
              Risk assessments may identify areas needing additional luminaires beyond standard rules:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Hazardous machinery:</strong> Extra coverage at machine controls</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Disabled access routes:</strong> Enhanced lighting for ramps and refuge points</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Security-sensitive areas:</strong> Lighting to guide staff safely without exposing risks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>External escape routes:</strong> Additional fittings to cover uneven ground or long outdoor paths</span>
              </li>
            </ul>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(3)}
              >
                ✅ Quick Check: Give one example of where extra coverage may be required due to building-specific risks.
              </Button>
              {openChecks.includes(3) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> At hazardous machinery controls where operators need clear visibility to safely shut down equipment, or at refuge points where disabled occupants may need to wait for assistance during evacuation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Building Type Specific Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Building className="h-5 w-5" />
            5. Building Type Specific Requirements
          </h3>
          
          <div className="space-y-3">
            <p>
              Different building types have unique characteristics that influence emergency lighting design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Healthcare Buildings:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Patient mobility limitations</li>
                  <li>• Bed evacuation procedures</li>
                  <li>• Medical equipment dependencies</li>
                  <li>• Staff-assisted evacuation needs</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Educational Buildings:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Large numbers of children</li>
                  <li>• Supervision requirements</li>
                  <li>• Assembly hall considerations</li>
                  <li>• Multiple exit strategies</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(4)}
              >
                ✅ Quick Check: What special considerations apply to educational buildings?
              </Button>
              {openChecks.includes(4) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Large numbers of children require additional supervision during evacuation, extended lighting durations for orderly evacuation procedures, and enhanced coverage in assembly areas where students gather before exiting.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documentation and Compliance */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Heart className="h-5 w-5" />
            6. Documentation and Compliance
          </h3>
          
          <div className="space-y-3">
            <p>
              Risk-based adjustments must be properly documented to demonstrate compliance and justify design decisions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Required Documentation:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Fire risk assessment findings</li>
                  <li>• Design justification statements</li>
                  <li>• Calculation worksheets</li>
                  <li>• Installation drawings</li>
                </ul>
              </div>
              <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">Best Practice Approach:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Review fire risk assessment first</li>
                  <li>• Liaise with building managers</li>
                  <li>• Add safety margins where justified</li>
                  <li>• Document all adjustments made</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
              <p className="text-red-300 font-medium">
                ⚠️ Remember: The safest design is one tailored to the building, not just the standard.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(5)}
              >
                ✅ Quick Check: Why is "designing to the bare minimum" a poor practice in emergency lighting design?
              </Button>
              {openChecks.includes(5) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Minimum standards are baseline requirements, not optimal solutions. Buildings with unique risks, vulnerable occupants, or complex layouts need enhanced lighting to ensure safe evacuation. Safety margins protect against unforeseen circumstances and provide better protection for occupants.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};