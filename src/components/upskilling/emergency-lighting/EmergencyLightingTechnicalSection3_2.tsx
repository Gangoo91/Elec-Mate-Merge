import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Route, Users, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection3_2 = () => {
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
        
        {/* Coverage Principles */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Route className="h-5 w-5" />
            1. Coverage Principles
          </h3>
          
          <div className="space-y-3">
            <p>
              Escape routes must always be visible and clear, with illumination along the entire path to a place of safety.
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Minimum 1 lux along the centre line of the route</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Luminaires must cover all changes of direction, stairs, doors, and junctions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Fire-fighting equipment and manual call points must be specifically illuminated</span>
              </li>
            </ul>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(0)}
              >
                ✅ Quick Check: What is the minimum lux requirement for escape routes?
              </Button>
              {openChecks.includes(0) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> 1 lux along the centre line of the escape route. This ensures adequate visibility for safe navigation during evacuation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Placement Rules */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            2. Placement Rules
          </h3>
          
          <div className="space-y-3">
            <p>
              BS 5266 specifies exact points where emergency lighting must be installed along escape routes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Mandatory Locations:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Exits</strong> – above all exit doors</li>
                  <li>• <strong>Stairways</strong> – at each flight and landing</li>
                  <li>• <strong>Changes of direction</strong> – at every turn or junction</li>
                  <li>• <strong>Fire points</strong> – to highlight extinguishers, alarms, and call points</li>
                  <li>• <strong>Final exits</strong> – to light the immediate outside area for safe dispersal</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(1)}
              >
                ✅ Quick Check: Why must luminaires be installed at every change of direction on an escape route?
              </Button>
              {openChecks.includes(1) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> To ensure occupants can clearly see where the route turns and avoid becoming disoriented during evacuation. Without lighting at direction changes, people may miss the correct path in an emergency.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Escape Route Widths */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            3. Escape Route Widths
          </h3>
          
          <div className="space-y-3">
            <p>
              The required coverage also depends on the width of the route:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Routes up to 2m wide:</h4>
                <p className="text-sm">Lighting coverage across the whole width is required.</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">Routes wider than 2m:</h4>
                <p className="text-sm">These may be considered "open areas" and require anti-panic lighting in addition to escape route lighting.</p>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
              <p className="text-red-300 font-medium">
                ⚠️ Wide escape routes without proper coverage are a common design failure.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(2)}
              >
                ✅ Quick Check: When does an escape route also need to be treated as an open area?
              </Button>
              {openChecks.includes(2) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> When the escape route is wider than 2 metres. This requires both escape route lighting for guidance and anti-panic lighting to prevent confusion in the wider space.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Integration with Exit Signage */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            4. Integration with Exit Signage
          </h3>
          
          <div className="space-y-3">
            <p>
              Lighting and signage must work together for effective evacuation.
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Exit signs must be illuminated at all times (internally or externally lit)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Directional signs must match the actual escape route layout — incorrect arrows are a frequent inspection fault</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Luminaires should be positioned so that signs are visible even in smoke or power failure</span>
              </li>
            </ul>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(3)}
              >
                ✅ Quick Check: What is a common installation error with exit signage and lighting?
              </Button>
              {openChecks.includes(3) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Directional arrows that don't match the actual escape route layout. Signs must accurately direct people along the illuminated path to the nearest exit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Uniformity Ratios and Coverage Quality */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            5. Uniformity Ratios and Coverage Quality
          </h3>
          
          <div className="space-y-3">
            <p>
              BS 5266 requires not just minimum lux levels, but also uniform distribution to prevent dark spots that could disorient occupants.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Uniformity Requirements:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Maximum/minimum ratio: 40:1</li>
                  <li>• No point below 0.5 lux on escape routes</li>
                  <li>• Gradual transitions between lit areas</li>
                  <li>• Avoid sharp shadows and bright spots</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Common Uniformity Issues:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Luminaires spaced too far apart</li>
                  <li>• Different lamp outputs in same area</li>
                  <li>• Obstructions creating shadows</li>
                  <li>• Mixed luminaire types and heights</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(4)}
              >
                ✅ Quick Check: What is the maximum uniformity ratio allowed on escape routes?
              </Button>
              {openChecks.includes(4) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> 40:1 maximum to minimum ratio. This ensures there are no extremely dark spots that could cause disorientation during evacuation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multi-Storey and Complex Building Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            6. Multi-Storey and Complex Building Considerations
          </h3>
          
          <div className="space-y-3">
            <p>
              Complex buildings require additional planning to ensure escape routes remain clear and well-lit across multiple levels and interconnected areas.
            </p>
            
            <div className="space-y-4">
              <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-3">Stairwell Requirements:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Each flight must have dedicated lighting</li>
                  <li>• Landings require illumination at both ends</li>
                  <li>• Handrails and step edges should be clearly visible</li>
                  <li>• Emergency lighting must operate on all floors simultaneously</li>
                  <li>• Consider photoluminescent strips for additional guidance</li>
                </ul>
              </div>

              <div className="bg-indigo-900/20 border border-indigo-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-300 mb-3">Corridor Junctions and Intersections:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• T-junctions need lighting in all directions</li>
                  <li>• Cross-corridors require central illumination</li>
                  <li>• Multiple exit routes must be clearly distinguished</li>
                  <li>• Dead-end corridors need warning signage and lighting</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(5)}
              >
                ✅ Quick Check: Why do stairwell landings need illumination at both ends?
              </Button>
              {openChecks.includes(5) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> To ensure people can safely navigate from either direction and clearly see the next flight of stairs or exit route, preventing accidents and confusion.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spacing Calculations and Practical Installation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Route className="h-5 w-5" />
            7. Spacing Calculations and Practical Installation
          </h3>
          
          <div className="space-y-3">
            <p>
              Proper luminaire spacing ensures continuous coverage while optimising installation costs and maintenance requirements.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-3">Standard Spacing Guidelines:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>2m wide corridors:</strong> 8-12m spacing typical</li>
                  <li>• <strong>Ceiling height 2.5-3m:</strong> Use standard spacing</li>
                  <li>• <strong>Higher ceilings:</strong> Reduce spacing by 20-30%</li>
                  <li>• <strong>Low ceilings (under 2.5m):</strong> May increase spacing</li>
                </ul>
              </div>
              
              <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-3">Installation Factors:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Structural constraints (beams, ducts)</li>
                  <li>• Cable routing and accessibility</li>
                  <li>• Maintenance access requirements</li>
                  <li>• Integration with existing lighting</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-300 text-sm mb-2">
                <strong>Calculation Example:</strong> 40m corridor, 2m wide, 3m ceiling height
              </p>
              <div className="font-mono text-xs bg-slate-800 p-3 rounded">
                Standard spacing: 10m intervals<br/>
                Luminaire positions: 0m, 10m, 20m, 30m, 40m<br/>
                Total luminaires required: 5 units<br/>
                <span className="text-elec-yellow">Note: End positions (0m, 40m) are exit doors</span>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(6)}
              >
                ✅ Quick Check: How does ceiling height affect luminaire spacing?
              </Button>
              {openChecks.includes(6) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Higher ceilings require closer spacing (reduced by 20-30%) because light spreads more before reaching floor level, potentially creating gaps in coverage.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Maintenance Access and Future Modifications */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            8. Maintenance Access and Future Modifications
          </h3>
          
          <div className="space-y-3">
            <p>
              Escape route lighting systems must be designed for long-term reliability and easy maintenance to ensure continuous compliance.
            </p>
            
            <div className="space-y-4">
              <div className="bg-cyan-900/20 border border-cyan-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-300 mb-3">Maintenance Considerations:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Luminaires positioned for safe access</li>
                  <li>• Test switches accessible but secure</li>
                  <li>• Battery replacement procedures documented</li>
                  <li>• Spare parts availability considered</li>
                  <li>• Clear labelling of all emergency circuits</li>
                </ul>
              </div>

              <div className="bg-teal-900/20 border border-teal-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-300 mb-3">Future-Proofing Design:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Allow for building layout changes</li>
                  <li>• Use flexible cable routing systems</li>
                  <li>• Consider smart monitoring capabilities</li>
                  <li>• Plan for LED upgrade paths</li>
                  <li>• Document system for future contractors</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <p className="text-elec-yellow font-medium">
                <strong>Professional Insight:</strong> Buildings change over time. Designing flexible systems that can adapt to future modifications saves significant costs and ensures continued compliance.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(7)}
              >
                ✅ Quick Check: Why is documentation important for escape route lighting systems?
              </Button>
              {openChecks.includes(7) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Proper documentation ensures future contractors can maintain and modify the system correctly, preventing compliance issues when building layouts change.
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