import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Clock, Gauge, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingTechnicalSection3_1 = () => {
  const [activeCheck, setActiveCheck] = useState<number | null>(null);

  const quickChecks = [
    {
      id: 1,
      question: "What is the minimum lux requirement for open area (anti-panic) lighting?",
      answer: "0.5 lux across the floor area"
    },
    {
      id: 2,
      question: "Why is uniformity just as important as meeting the minimum lux requirement?",
      answer: "To avoid shadows or dark patches that could cause panic or disorientation. Uneven lighting can create confusion during evacuation."
    },
    {
      id: 3,
      question: "How long must emergency lighting operate in public assembly buildings?",
      answer: "Minimum 3 hours duration for public spaces, workplaces, or premises where re-entry is required."
    },
    {
      id: 4,
      question: "Why must designers allow for battery ageing when specifying emergency lighting systems?",
      answer: "Systems must still achieve required lux levels at the end of battery life, not just when new. Battery capacity degrades over time."
    },
    {
      id: 5,
      question: "What factors can affect emergency lighting performance during testing?",
      answer: "Temperature, humidity, dust accumulation, vibration, and ambient light can all affect performance. Testing should account for these environmental factors and be conducted under realistic operating conditions."
    },
    {
      id: 6,
      question: "Why do high-risk premises require higher lux levels and longer durations?",
      answer: "High-risk premises often house vulnerable occupants who may need assistance evacuating, have complex layouts, or contain hazardous processes requiring safe shutdown. Higher illumination and longer duration ensure adequate time and visibility for these critical activities."
    },
    {
      id: 7,
      question: "Why is maintenance factor critical in emergency lighting calculations?",
      answer: "Maintenance factor accounts for the inevitable degradation of system performance over time due to lamp ageing, dirt accumulation, and component wear. Without proper maintenance factors, the system may fall below compliance levels before its intended service life."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Minimum Lux Levels */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            1. Minimum Lux Levels
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            Different applications demand different lux levels to ensure safety:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">Escape Routes</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">1 lux</div>
                <p className="text-sm text-foreground mt-2">
                  Minimum along the centre line of the escape path
                </p>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3">Open Areas (Anti-Panic)</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">0.5 lux</div>
                <p className="text-sm text-foreground mt-2">
                  Across the floor area
                </p>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-3">High-Risk Task Areas</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">15 lux</div>
                <p className="text-sm text-foreground mt-2">
                  Or 10% of normal lighting (whichever is greater)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
            <p className="text-foreground">
              <strong>Important:</strong> These values are measured at floor level and must be achieved consistently across the designated space.
            </p>
          </div>

          {/* Quick Check 1 */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 1 ? null : 1)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[0].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 1 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[0].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uniformity of Lighting */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Gauge className="h-6 w-6 text-elec-yellow" />
            2. Uniformity of Lighting
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            It is not enough to meet the minimum lux in one spot; lighting must be evenly distributed.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-elec-yellow font-semibold mb-3">Uniformity Requirements</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ratios of maximum to minimum illuminance should not exceed recommended limits (often 40:1 for escape routes)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avoid shadows or "dark patches" that could cause panic or disorientation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use manufacturer photometric data to plan luminaire placement</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
              <h5 className="text-red-400 font-semibold mb-2">Common Problems</h5>
              <ul className="text-sm space-y-2">
                <li>• Luminaires too far apart creating dark zones</li>
                <li>• Obstacles casting large shadows</li>
                <li>• Poor beam distribution patterns</li>
                <li>• Inadequate overlap between light sources</li>
              </ul>
            </div>
          </div>

          {/* Quick Check 2 */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 2 ? null : 2)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[1].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 2 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[1].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Operating Durations */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            3. Operating Durations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            Emergency lighting must last long enough to ensure safe evacuation:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">General Buildings</h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">1 hour</div>
                <p className="text-sm text-foreground mt-2">Minimum duration</p>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3">Public Spaces & Workplaces</h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">3 hours</div>
                <p className="text-sm text-foreground mt-2">Where re-entry may be required</p>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Battery Technology Considerations</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="text-cyan-400 font-medium mb-2">NiCd Batteries</h5>
                <p className="text-xs">Reliable but require longer recharge times (12-24 hours)</p>
              </div>
              <div>
                <h5 className="text-lime-400 font-medium mb-2">NiMH Batteries</h5>
                <p className="text-xs">Higher capacity, faster recharge (8-12 hours)</p>
              </div>
              <div>
                <h5 className="text-pink-400 font-medium mb-2">Li-ion Batteries</h5>
                <p className="text-xs">Longest life, fastest recharge (4-8 hours)</p>
              </div>
            </div>
          </div>

          {/* Quick Check 3 */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 3 ? null : 3)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[2].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 3 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[2].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Practical Design Application */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-elec-yellow" />
            4. Practical Design Application
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            When applying lux and duration requirements:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-1">Consider Evacuation Time</h4>
                <p className="text-sm">Large, multi-storey premises often require 3 hours based on building type and usage patterns.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-1">Maintain Output Throughout Period</h4>
                <p className="text-sm">Ensure luminaires are designed to maintain output throughout the rated period.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="text-orange-400 font-semibold mb-1">Allow for Battery Ageing</h4>
                <p className="text-sm">Systems must still achieve required lux levels at the end of battery life, not just when new.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-1">Document Design Calculations</h4>
                <p className="text-sm">Maintain detailed records to prove compliance with all requirements.</p>
              </div>
            </div>
          </div>

          {/* Quick Check 4 */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 4 ? null : 4)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[3].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 4 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[3].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Measurement Techniques and Testing */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Gauge className="h-6 w-6 text-elec-yellow" />
            5. Measurement Techniques and Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            Accurate measurement and verification are essential for compliance and safety assurance:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-3">Lux Meter Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Calibrated to traceable standards (annually)</li>
                  <li>• Cosine-corrected photodiode detector</li>
                  <li>• Spectral response matching CIE photopic curve</li>
                  <li>• Temperature compensation for accurate readings</li>
                  <li>• Range suitable for low-light measurements (0.1-2000 lux)</li>
                </ul>
              </div>

              <div className="bg-lime-500/10 border border-lime-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-lime-400 mb-3">Measurement Grid Pattern</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Centre line of escape routes (every 2m maximum)</li>
                  <li>• Open areas: minimum 2m x 2m grid pattern</li>
                  <li>• Task areas: 0.5m x 0.5m grid for critical zones</li>
                  <li>• Additional points at obstacles and corners</li>
                  <li>• Minimum 50 measurement points per area</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-pink-400 mb-3">Environmental Factors</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Temperature effects on LED output (-20% at 60°C)</li>
                  <li>• Humidity impact on electrical components</li>
                  <li>• Dust accumulation reducing light output</li>
                  <li>• Vibration affecting luminaire positioning</li>
                  <li>• Ambient light interference during testing</li>
                </ul>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-400 mb-3">Testing Intervals</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Initial commissioning: Full lux survey</li>
                  <li>• Annual testing: Duration and basic function</li>
                  <li>• 3-year intervals: Comprehensive lux re-testing</li>
                  <li>• After modifications: Complete re-verification</li>
                  <li>• Post-maintenance: Spot checks of affected areas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 5 ? null : 5)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[4].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 5 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[4].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Building Type Considerations */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            6. Building Type and Occupancy Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            Different building types require specific approaches to illumination and duration planning:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-3">High-Risk Premises</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Examples</h5>
                  <p className="text-xs">Hospitals, care homes, schools, theatres, nightclubs</p>
                </div>
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Requirements</h5>
                  <p className="text-xs">3-hour duration mandatory, higher lux levels (2-5 lux on escape routes), additional signage</p>
                </div>
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Special Considerations</h5>
                  <p className="text-xs">Assisted evacuation, multiple exit routes, refuge areas</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">Industrial Premises</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Examples</h5>
                  <p className="text-xs">Factories, warehouses, chemical plants, manufacturing</p>
                </div>
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Requirements</h5>
                  <p className="text-xs">Task area lighting up to 50 lux, 3-hour duration, hazardous area ratings</p>
                </div>
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Special Considerations</h5>
                  <p className="text-xs">Safe shutdown procedures, ATEX compliance, robust fittings</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3">Residential/Office</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Examples</h5>
                  <p className="text-xs">Offices, residential blocks, retail premises</p>
                </div>
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Requirements</h5>
                  <p className="text-xs">Standard 1 lux escape routes, 1-3 hour options available</p>
                </div>
                <div>
                  <h5 className="text-foreground font-medium text-sm mb-1">Special Considerations</h5>
                  <p className="text-xs">Sleeping accommodation, accessible routes, cost optimization</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Occupancy Density Impact</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-cyan-400 font-medium mb-2">High Density (&gt;1 person/m²)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Increased evacuation time requirements</li>
                  <li>• Higher lux levels to prevent panic</li>
                  <li>• More frequent testing and maintenance</li>
                  <li>• Redundant systems in critical areas</li>
                </ul>
              </div>
              <div>
                <h5 className="text-lime-400 font-medium mb-2">Low Density (&lt;0.1 person/m²)</h5>
                <ul className="text-sm space-y-1">
                  <li>• May permit 1-hour systems in some cases</li>
                  <li>• Focus on guidance rather than anti-panic</li>
                  <li>• Consider lone worker scenarios</li>
                  <li>• Remote monitoring beneficial</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 6 ? null : 6)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[5].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 6 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[5].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Calculation Methods */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            7. Advanced Calculation and Design Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg leading-relaxed">
            Professional emergency lighting design requires sophisticated calculation methods and tools:
          </p>

          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3">Photometric Design Software</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Popular Software Tools</h5>
                  <ul className="text-sm space-y-1">
                    <li>• DIALux (free, comprehensive lighting design)</li>
                    <li>• Relux (Swiss-made, precise calculations)</li>
                    <li>• LITESTAR 4D (advanced professional features)</li>
                    <li>• Manufacturer-specific tools (Philips, Osram, etc.)</li>
                    <li>• AutoCAD lighting plugins</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Key Features Required</h5>
                  <ul className="text-sm space-y-1">
                    <li>• IES/LDT photometric file import</li>
                    <li>• 3D building model capability</li>
                    <li>• Uniformity ratio calculations</li>
                    <li>• Battery degradation modelling</li>
                    <li>• Compliance reporting (BS 5266-1)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-3">Manual Calculation Methods</h4>
              <div className="space-y-4">
                <div className="bg-elec-dark/40 p-3 rounded border border-gray-600">
                  <h5 className="text-cyan-400 font-medium mb-2">Point-by-Point Method</h5>
                  <p className="text-sm mb-2">For precise calculations at specific locations:</p>
                  <div className="bg-gray-800 p-3 rounded text-xs font-mono">
                    <p>E = (I × cos³θ) / d²</p>
                    <p className="mt-1 text-gray-400">Where: E = illuminance (lux), I = luminous intensity (cd), θ = angle from vertical, d = distance (m)</p>
                  </div>
                </div>

                <div className="bg-elec-dark/40 p-3 rounded border border-gray-600">
                  <h5 className="text-lime-400 font-medium mb-2">Spacing-to-Height Ratio</h5>
                  <p className="text-sm mb-2">For uniform distribution planning:</p>
                  <div className="bg-gray-800 p-3 rounded text-xs font-mono">
                    <p>SHR = S / Hm</p>
                    <p className="mt-1 text-gray-400">Where: S = spacing between luminaires, Hm = mounting height above working plane</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-teal-400 mb-3">Maintenance Factor Calculations</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Component Factors</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>LLMF:</strong> Lamp Lumen Maintenance Factor (0.7-0.9)</li>
                    <li>• <strong>LSF:</strong> Lamp Survival Factor (0.8-1.0)</li>
                    <li>• <strong>LMF:</strong> Luminaire Maintenance Factor (0.8-0.95)</li>
                    <li>• <strong>RMF:</strong> Room Maintenance Factor (0.85-0.95)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Overall Calculation</h5>
                  <div className="bg-gray-800 p-3 rounded text-xs font-mono">
                    <p>MF = LLMF × LSF × LMF × RMF</p>
                  </div>
                  <p className="text-sm mt-2">Typical overall maintenance factors:</p>
                  <ul className="text-sm space-y-1 mt-1">
                    <li>• LED systems: 0.8-0.9</li>
                    <li>• Fluorescent: 0.7-0.8</li>
                    <li>• Incandescent: 0.6-0.7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setActiveCheck(activeCheck === 7 ? null : 7)}
            >
              <h4 className="font-semibold text-yellow-400">✅ Quick Check: {quickChecks[6].question}</h4>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </div>
            {activeCheck === 7 && (
              <div className="mt-3 p-3 bg-elec-dark/40 rounded border border-gray-600">
                <p className="text-foreground text-sm">{quickChecks[6].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};