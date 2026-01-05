import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection6_3 = () => {
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean>>({});

  const handleCheckAnswer = (id: string) => {
    setCheckAnswers(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow drop-shadow-md" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow">
            1. The Role of the Fire Risk Assessment
          </h3>
          
          <p className="leading-relaxed">
            The risk assessment determines the extent and performance of emergency lighting systems.
            It must consider:
          </p>

          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-elec-yellow">Occupant type</span> – Are users 
                familiar with the layout (staff) or unfamiliar (public)?
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-elec-yellow">Occupant vulnerability</span> – Are 
                there elderly, disabled, or visually impaired individuals?
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-elec-yellow">Building use</span> – Offices, schools, 
                warehouses, hospitals, entertainment venues, etc.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-elec-yellow">Layout complexity</span> – Long corridors, 
                stairwells, multiple exits, or mezzanines.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-elec-yellow">Environmental conditions</span> – Smoke 
                risk, temperature, or outdoor lighting dependency.
              </div>
            </li>
          </ul>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-300 mb-2">✅ Quick Check:</p>
                <p className="text-blue-200 mb-3">
                  Why is the fire risk assessment the starting point for emergency lighting design?
                </p>
                {!checkAnswers['check1'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check1')}
                    className="bg-blue-600 hover:bg-blue-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-green-200">
                      <span className="font-semibold">Answer:</span> The fire risk assessment identifies 
                      the specific hazards, occupant characteristics, and building layout that determine 
                      where lighting is needed, how long it must operate, and what illuminance levels are 
                      required. It's the legal and technical foundation for all design decisions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4 pt-6 border-t border-gray-600">
          <h3 className="text-xl font-semibold text-elec-yellow">
            2. How BS 5266-1 Links to the Risk Assessment
          </h3>
          
          <p className="leading-relaxed">
            BS 5266-1 translates fire risk findings into specific design requirements, including:
          </p>

          <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Minimum Illuminance:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Escape routes – <span className="font-semibold text-foreground">1 lux</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Open areas – <span className="font-semibold text-foreground">0.5 lux</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>High-risk task areas – <span className="font-semibold text-foreground">15 lux</span></span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Duration:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><span className="font-semibold text-foreground">1 hour</span> for low-risk buildings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><span className="font-semibold text-foreground">3 hours</span> for public or complex premises</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Circuit Design:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Separate emergency circuits for high-risk areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Enhanced fire-resistant cabling where evacuation may be delayed</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Maintenance Requirements:</h4>
              <p className="ml-4">Based on occupancy levels and environmental exposure.</p>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-300 mb-2">✅ Quick Check:</p>
                <p className="text-blue-200 mb-3">
                  According to BS 5266-1, what determines whether a 1-hour or 3-hour duration is required?
                </p>
                {!checkAnswers['check2'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check2')}
                    className="bg-blue-600 hover:bg-blue-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-green-200">
                      <span className="font-semibold">Answer:</span> The building's risk category and 
                      occupancy type. Low-risk buildings with simple layouts and familiar occupants may use 
                      1-hour duration. Public buildings, complex premises, or those with vulnerable occupants 
                      require 3-hour duration.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4 pt-6 border-t border-gray-600">
          <h3 className="text-xl font-semibold text-elec-yellow">
            3. Risk Categories and Lighting Implications
          </h3>
          
          <p className="leading-relaxed">
            The risk assessment typically defines three risk categories:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-800/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-elec-yellow/20 border-b border-elec-yellow/30">
                  <th className="p-3 text-left text-elec-yellow font-semibold">Risk Level</th>
                  <th className="p-3 text-left text-elec-yellow font-semibold">Building Example</th>
                  <th className="p-3 text-left text-elec-yellow font-semibold">Design Implication</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Low Risk</td>
                  <td className="p-3">Small offices, shops</td>
                  <td className="p-3">1-hour duration; basic escape route lighting</td>
                </tr>
                <tr className="border-b border-gray-600/50">
                  <td className="p-3 font-semibold text-yellow-400">Medium Risk</td>
                  <td className="p-3">Schools, factories</td>
                  <td className="p-3">3-hour duration; anti-panic lighting in open areas</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-red-400">High Risk</td>
                  <td className="p-3">Hospitals, care homes, theatres</td>
                  <td className="p-3">3-hour duration minimum; high-risk task area lighting; redundancy or central battery systems</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-300 mb-2">✅ Quick Check:</p>
                <p className="text-blue-200 mb-3">
                  Give one example of a high-risk building and explain what additional lighting provisions are required.
                </p>
                {!checkAnswers['check3'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check3')}
                    className="bg-blue-600 hover:bg-blue-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-green-200">
                      <span className="font-semibold">Answer:</span> Example: A hospital requires 3-hour 
                      minimum duration, high-risk task area lighting (15 lux) in treatment rooms and 
                      operating theatres, redundancy systems (backup batteries or generators), and enhanced 
                      fire-resistant cabling to ensure evacuation can proceed safely even if some occupants 
                      cannot move quickly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-4 pt-6 border-t border-gray-600">
          <h3 className="text-xl font-semibold text-elec-yellow">
            4. Updating and Reviewing the Risk Assessment
          </h3>
          
          <p className="leading-relaxed">
            A fire risk assessment — and therefore the lighting design — must be reviewed regularly:
          </p>

          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <span>
                At least <span className="font-semibold text-elec-yellow">annually</span>, or when building 
                use or layout changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <span>
                After significant modifications (extensions, re-partitioning, or equipment changes).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <span>
                After incidents such as power failures or evacuations to verify performance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <span>
                After relevant regulation or standard updates (e.g. amendments to BS 5266).
              </span>
            </li>
          </ul>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-300 mb-2">✅ Quick Check:</p>
                <p className="text-blue-200 mb-3">
                  When must emergency lighting risk assessments be reviewed or updated?
                </p>
                {!checkAnswers['check4'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check4')}
                    className="bg-blue-600 hover:bg-blue-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-green-200">
                      <span className="font-semibold">Answer:</span> At least annually, after building 
                      alterations or use changes, after evacuation incidents, or when regulations are updated.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};