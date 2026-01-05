import { useState } from 'react';
import { Book, Ruler, BarChart3, Target, Lightbulb, Calculator, Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection3_3 = () => {
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
          <Book className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        
        {/* Section 1: Mounting Heights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            1. Mounting Heights
          </h3>
          
          <div className="space-y-4">
            <p>Mounting height directly impacts how light is distributed across the escape route or open area.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
                <h4 className="text-purple-300 font-semibold mb-2">Ceiling Height Effects</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Higher ceilings spread light over wider areas but reduce intensity at floor level</li>
                  <li>• Standard mounting: 2.5m to 4m for most applications</li>
                  <li>• Industrial: Up to 10m+ with high-output fittings</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-indigo-600/20 to-indigo-800/10 border border-indigo-500/40 rounded-lg">
                <h4 className="text-indigo-300 font-semibold mb-2">Low Ceiling Considerations</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Increase intensity but may cause glare</li>
                  <li>• Risk of uneven distribution</li>
                  <li>• Use low-glare fittings where possible</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-2">Best Practice</h4>
              <p className="text-foreground text-sm">Always follow manufacturer's recommended mounting heights for each luminaire type. Each fitting is designed for a specific height range.</p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(0)}
              >
                ✅ Quick Check: What is one risk of installing emergency luminaires too high?
              </Button>
              {openChecks.includes(0) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Light intensity at floor level may be insufficient to meet the required lux levels, leaving dark patches along escape routes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Photometric Data */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            2. Photometric Data
          </h3>
          
          <div className="space-y-4">
            <p>Manufacturers provide photometric data showing how light is distributed from a luminaire. Key information includes:</p>
            
            <div className="grid gap-4">
              <div className="p-4 bg-gradient-to-br from-teal-600/20 to-teal-800/10 border border-teal-500/40 rounded-lg">
                <h4 className="text-teal-300 font-semibold mb-2">Polar Curve Diagrams</h4>
                <p className="text-foreground text-sm mb-2">Show beam spread and intensity distribution in all directions around the luminaire.</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Vertical angles (0° = straight down, 90° = horizontal)</li>
                  <li>• Candela values at each angle</li>
                  <li>• Symmetrical or asymmetrical patterns</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 border border-cyan-500/40 rounded-lg">
                <h4 className="text-cyan-300 font-semibold mb-2">Spacing Tables</h4>
                <p className="text-foreground text-sm mb-2">Indicate maximum spacing between luminaires to achieve required lux levels.</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Based on mounting height</li>
                  <li>• Different values for different lux requirements</li>
                  <li>• Account for room reflectances</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">Utilisation Factors</h4>
                <p className="text-foreground text-sm mb-2">Help estimate how much light reaches the working plane.</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Account for room dimensions</li>
                  <li>• Surface reflectances (walls, ceiling, floor)</li>
                  <li>• Luminaire efficiency</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(1)}
              >
                ✅ Quick Check: What does a polar curve diagram illustrate?
              </Button>
              {openChecks.includes(1) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> A polar curve diagram shows the beam spread and light intensity distribution in all directions around a luminaire, helping designers understand how light will be distributed at different angles.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Light Distribution Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            3. Light Distribution Considerations
          </h3>
          
          <div className="space-y-4">
            <p>When selecting and placing luminaires, electricians must consider several key factors:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-2">Uniformity Requirements</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Avoid bright/dark patches along escape routes</li>
                  <li>• Maximum to minimum ratio should not exceed 40:1</li>
                  <li>• Consider transition zones between areas</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-lime-600/20 to-lime-800/10 border border-lime-500/40 rounded-lg">
                <h4 className="text-lime-300 font-semibold mb-2">Beam Angle Selection</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Narrow beams (15-30°): Good for corridors</li>
                  <li>• Medium beams (30-60°): General purpose</li>
                  <li>• Wide beams (60-120°): Suit open areas</li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-emerald-600/20 to-emerald-800/10 border border-emerald-500/40 rounded-lg">
                <h4 className="text-emerald-300 font-semibold mb-2">Obstruction Analysis</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Racks, partitions, or signage can block light paths</li>
                  <li>• Consider shadows cast by structural elements</li>
                  <li>• Account for future layout changes</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-teal-600/20 to-teal-800/10 border border-teal-500/40 rounded-lg">
                <h4 className="text-teal-300 font-semibold mb-2">Surface Reflectance Impact</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Light-coloured surfaces reflect more light</li>
                  <li>• Dark finishes absorb more, reducing performance</li>
                  <li>• Typical values: White 70%, Cream 50%, Dark 10%</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(2)}
              >
                ✅ Quick Check: Why is luminaire spacing different in a wide open area compared to a corridor?
              </Button>
              {openChecks.includes(2) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Open areas require wider beam angles and different spacing to provide uniform coverage across the larger space, while corridors benefit from narrower beams that efficiently light the linear path without waste.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Practical Application */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            4. Practical Application
          </h3>
          
          <div className="space-y-4">
            <p>Correct use of photometric data ensures systems are compliant without overspending on unnecessary fittings.</p>
            
            <div className="grid gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-600/20 to-orange-800/10 border border-orange-500/40 rounded-lg">
                <h4 className="text-orange-300 font-semibold mb-2">Design Guidelines</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Always design using spacing tables, not guesswork</li>
                  <li>• Cross-reference multiple manufacturer data sources</li>
                  <li>• Include safety margins for real-world conditions</li>
                  <li>• Consider maintenance factor degradation</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/40 rounded-lg">
                <h4 className="text-red-300 font-semibold mb-2">Special Applications</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Tall industrial units: High-output fittings for 6m+ heights</li>
                  <li>• Low-ceiling offices: Low-glare fittings to avoid discomfort</li>
                  <li>• Outdoor areas: Weather-resistant with appropriate IP ratings</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-pink-600/20 to-pink-800/10 border border-pink-500/40 rounded-lg">
                <h4 className="text-pink-300 font-semibold mb-2">Documentation Requirements</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Document spacing and mounting heights on drawings</li>
                  <li>• Include photometric calculations for verification</li>
                  <li>• Specify luminaire types and beam patterns</li>
                  <li>• Note any special installation requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(3)}
              >
                ✅ Quick Check: Why is it important to document luminaire mounting heights on design drawings?
              </Button>
              {openChecks.includes(3) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Documentation ensures installers mount fittings at the correct heights for optimal performance, enables inspectors to verify compliance, and provides a reference for future maintenance and modifications.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Advanced Photometric Analysis */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Settings className="h-5 w-5" />
            5. Advanced Photometric Analysis
          </h3>
          
          <div className="space-y-4">
            <p>Modern emergency lighting design requires understanding of advanced photometric concepts for complex installations.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-violet-600/20 to-violet-800/10 border border-violet-500/40 rounded-lg">
                <h4 className="text-violet-300 font-semibold mb-2">Coefficient of Utilisation (CU)</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Ratio of useful light to total light output</li>
                  <li>• Depends on room dimensions and reflectances</li>
                  <li>• Critical for accurate lux calculations</li>
                  <li>• Varies with mounting height and distribution</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
                <h4 className="text-purple-300 font-semibold mb-2">Maintenance Factor Considerations</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• LED degradation over time (typically 0.8-0.9)</li>
                  <li>• Dust accumulation on luminaires</li>
                  <li>• Room surface deterioration</li>
                  <li>• Battery capacity degradation</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(4)}
              >
                ✅ Quick Check: What factors affect the maintenance factor in emergency lighting calculations?
              </Button>
              {openChecks.includes(4) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> LED light output degradation over time, dust accumulation on luminaire surfaces, deterioration of room surface reflectances, and battery capacity degradation all affect the maintenance factor.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 6: Installation Height Optimisation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            6. Installation Height Optimisation
          </h3>
          
          <div className="space-y-4">
            <p>Optimising installation height balances coverage, intensity, and practical installation considerations.</p>
            
            <div className="grid gap-4">
              <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-2">Height Selection Factors</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Ceiling construction and accessibility</li>
                  <li>• Required lux level at floor</li>
                  <li>• Beam angle and distribution pattern</li>
                  <li>• Obstruction avoidance</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">Common Installation Errors</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Installing at convenient heights rather than optimal heights</li>
                  <li>• Ignoring manufacturer spacing recommendations</li>
                  <li>• Failing to account for ceiling irregularities</li>
                  <li>• Poor coordination with other services</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-300 font-semibold mb-2">Critical Safety Point</h4>
                  <p className="text-foreground text-sm">Never compromise on mounting height to save installation time. Incorrect heights can create dangerous dark spots during emergencies.</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(5)}
              >
                ✅ Quick Check: What should be the primary consideration when determining luminaire mounting height?
              </Button>
              {openChecks.includes(5) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> The primary consideration should be achieving the required illumination levels at floor level according to manufacturer's photometric data, not installation convenience or cost-saving.
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