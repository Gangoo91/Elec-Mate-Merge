import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, CheckCircle2, Monitor, Database, BarChart3, AlertTriangle } from 'lucide-react';

export const EmergencyLightingTechnicalSection3_6 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1 - Role of Software */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">1</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Why Emergency Lighting Software Matters</h3>
          </div>
          
          <div className="ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Imagine you're designing emergency lighting for a 200m² warehouse with racking systems, a 4.5m ceiling height, and strict BS 5266-1 compliance requirements. How many luminaires do you need? Where should they be positioned? Will they provide the required 1.0 lux at floor level along escape routes?
            </p>
            <p className="text-foreground leading-relaxed">
              Attempting this by hand would require complex photometric calculations, accounting for light distribution patterns, mounting heights, surface reflectances, and obstruction effects. This is where lighting design software becomes essential.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 space-y-3">
              <h4 className="text-elec-yellow font-semibold text-lg">What Software Actually Does:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Photometric Modelling</p>
                    <p className="text-gray-300 text-sm">Uses IES or LDT files from manufacturers to simulate exact light distribution patterns from each luminaire, accounting for beam angles, intensity curves, and light decay over distance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">3D Space Calculation</p>
                    <p className="text-gray-300 text-sm">Creates a virtual 3D model of your space, including walls, ceilings, obstructions, and surface reflectances. Calculates how light bounces and interacts with every surface.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Lux Level Mapping</p>
                    <p className="text-gray-300 text-sm">Generates colour-coded floor plans showing predicted lux levels at every point, identifying areas of compliance and failure before installation begins.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Compliance Documentation</p>
                    <p className="text-gray-300 text-sm">Produces professional reports with luminaire schedules, lux plots, polar diagrams, and calculation details that satisfy Building Control and client requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <p className="text-elec-yellow font-medium mb-2">Real Example:</p>
              <p className="text-foreground text-sm leading-relaxed">
                A 15m × 12m office (180m²) with 2.8m ceilings requires 1.0 lux on escape routes. Using 200-lumen LED bulkheads with 5m spacing at standard mounting height, software calculates you need <strong>12 fittings</strong> in a 4×3 grid to achieve 1.2 lux average (20% safety margin). Manual calculation would take hours and be less accurate.
              </p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">What data does software use to accurately model luminaire performance?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> IES or LDT photometric data files from manufacturers, which contain precise light distribution curves, intensity values, and beam characteristics.</p>
            </div>
          </div>
        </div>

        {/* Section 2 - Industry Software */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">2</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Professional Software Tools</h3>
          </div>
          
          <div className="ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              The UK emergency lighting industry relies on several established software platforms. Understanding their strengths helps you choose the right tool for your projects.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-elec-yellow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-elec-yellow font-semibold text-lg">DIALux</h4>
                  <Badge className="bg-green-600">Free</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">The industry standard for both general and emergency lighting design. Developed by DIAL GmbH in Germany.</p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Strengths:</strong> Free, massive luminaire database, excellent manufacturer support, widely accepted by Building Control</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Learning Curve:</strong> Moderate - comprehensive tutorials available online</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Best For:</strong> All project sizes, professional documentation, client presentations</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">File Formats:</strong> IES, LDT, ULD - imports directly from manufacturer websites</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-blue-400">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-blue-400 font-semibold text-lg">Relux</h4>
                  <Badge className="bg-green-600">Free</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">Swiss-developed professional lighting design software with strong European presence.</p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Strengths:</strong> Intuitive interface, fast rendering, excellent for complex geometries</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Learning Curve:</strong> Lower than DIALux - good for beginners</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Best For:</strong> Quick calculations, architects, industrial settings</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">File Formats:</strong> IES, LDT - extensive cloud luminaire library</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-purple-400">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-purple-400 font-semibold text-lg">AGi32</h4>
                  <Badge className="bg-orange-600">Paid</Badge>
                </div>
                <p className="text-foreground text-sm mb-3">Advanced commercial software for detailed photometric analysis and large-scale projects.</p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Strengths:</strong> Extremely precise, advanced features, popular in North America</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Learning Curve:</strong> Steep - professional training recommended</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Best For:</strong> Large commercial projects, sports facilities, detailed compliance analysis</p>
                  <p className="text-gray-300 text-sm"><strong className="text-foreground">Cost:</strong> £1,000+ annual licence - consider ROI for small businesses</p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-300 font-medium mb-2">💡 Professional Tip:</p>
              <p className="text-foreground text-sm leading-relaxed">
                Start with DIALux or Relux - both are free and perfectly adequate for 95% of emergency lighting projects. Only consider paid software if you're handling complex multi-storey buildings or need specialist features like daylight integration analysis.
              </p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Why is DIALux so widely used in the UK emergency lighting industry?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> It's free, has extensive manufacturer luminaire databases, produces Building Control-compliant reports, and is widely accepted across the industry.</p>
            </div>
          </div>
        </div>

        {/* Section 3 - Software Workflow */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">3</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Step-by-Step Design Workflow</h3>
          </div>
          
          <div className="ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Here's how a professional emergency lighting design unfolds using software like DIALux:
            </p>
            
            <div className="space-y-3">
              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Import or Create Building Geometry</h4>
                    <p className="text-gray-300 text-sm">Import CAD floor plans (DWG, DXF) or manually draw room dimensions. Set ceiling heights, wall thicknesses, and identify escape routes.</p>
                    <p className="text-blue-200 text-xs mt-2 italic">Time: 5-15 minutes for typical office/retail space</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Define Surface Properties</h4>
                    <p className="text-gray-300 text-sm">Set reflectance values for ceilings (70%), walls (50%), floors (20%) based on actual finishes. Dark industrial spaces need lower values.</p>
                    <p className="text-blue-200 text-xs mt-2 italic">Critical: Incorrect reflectances can cause 20-30% calculation errors</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Select Luminaires from Database</h4>
                    <p className="text-gray-300 text-sm">Download manufacturer's IES/LDT files or access built-in databases. Choose specific product codes (e.g., "Ansell Iris 3W LED Emergency Bulkhead").</p>
                    <p className="text-blue-200 text-xs mt-2 italic">Pro tip: Always use manufacturer-specific data, not generic "LED bulkhead"</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Position Luminaires</h4>
                    <p className="text-gray-300 text-sm">Place fittings based on manufacturer spacing recommendations. Typical: 5-7m spacing for 200-400 lumen bulkheads at 2.5m mounting height.</p>
                    <p className="text-blue-200 text-xs mt-2 italic">Rule: Start with fewer fittings, add more if calculations show gaps</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Set Calculation Parameters</h4>
                    <p className="text-gray-300 text-sm">Working plane height: 0.0m (floor level). Maintenance factor: 0.8 (accounts for lamp degradation). Calculation grid: 0.5m × 0.5m for accuracy.</p>
                    <p className="text-blue-200 text-xs mt-2 italic">BS 5266-1 compliance requires floor-level measurements</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">6</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Run Calculation & Generate Lux Plots</h4>
                    <p className="text-gray-300 text-sm">Software calculates lux values at every grid point. Colour-coded plots show green (compliant) and red (non-compliant) areas.</p>
                    <p className="text-blue-200 text-xs mt-2 italic">Calculation time: 10 seconds to 2 minutes depending on complexity</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">7</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Refine Design</h4>
                    <p className="text-gray-300 text-sm">Add fittings where red zones appear. Adjust positions to eliminate shadowing. Re-calculate until all areas show ≥1.0 lux (escape routes) or ≥0.5 lux (open areas).</p>
                    <p className="text-blue-200 text-xs mt-2 italic">Aim for 20% safety margin above minimum requirements</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">8</div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Export Reports</h4>
                    <p className="text-gray-300 text-sm">Generate PDF reports including lux plots, luminaire schedules, polar diagrams, and calculation summaries. Include project details, designer name, and date.</p>
                    <p className="text-green-200 text-xs mt-2 italic">These reports satisfy Building Control and client documentation requirements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mt-4">
              <p className="text-orange-300 font-medium mb-2">⚠️ Common Mistake:</p>
              <p className="text-foreground text-sm leading-relaxed">
                Many electricians skip step 2 (surface properties) and use default values. This can result in 20-30% calculation errors. Always measure or estimate actual wall/ceiling colours and adjust reflectance accordingly.
              </p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">At what height should emergency lighting calculations be performed?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> 0.0m (floor level) for escape routes and open areas, as per BS 5266-1 requirements. This ensures people can navigate safely at ground level during emergencies.</p>
            </div>
          </div>
        </div>

        {/* Section 4 - Understanding Outputs */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">4</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Interpreting Software Outputs</h3>
          </div>
          
          <div className="ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Software generates several output types - each serves a specific purpose in design verification and compliance documentation:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg">
                <BarChart3 className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Lux Contour Maps (False Colour Plots)</h4>
                  <p className="text-gray-300 text-sm mb-2">Colour-coded floor plans where colours represent lux levels:</p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li>• <strong className="text-green-400">Green zones:</strong> ≥1.0 lux (compliant for escape routes)</li>
                    <li>• <strong className="text-yellow-400">Yellow zones:</strong> 0.5-1.0 lux (adequate for open areas &lt;60m²)</li>
                    <li>• <strong className="text-red-400">Red zones:</strong> &lt;0.5 lux (non-compliant, requires additional fittings)</li>
                  </ul>
                  <p className="text-blue-200 text-xs mt-2 italic">Use these to identify problem areas and position additional luminaires</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg">
                <Monitor className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Polar Diagrams (Light Distribution Curves)</h4>
                  <p className="text-gray-300 text-sm mb-2">Show how a luminaire distributes light in different directions:</p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li>• Circular shape = wide-angle diffuse light (good for open areas)</li>
                    <li>• Elongated shape = directional beam (good for corridors)</li>
                    <li>• Peak intensity values help compare luminaire effectiveness</li>
                  </ul>
                  <p className="text-blue-200 text-xs mt-2 italic">Useful for selecting appropriate fittings for different spaces</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg">
                <Database className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Luminaire Schedules</h4>
                  <p className="text-gray-300 text-sm mb-2">Detailed tables listing:</p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li>• Luminaire ID and manufacturer part number</li>
                    <li>• Position coordinates (X, Y, Z)</li>
                    <li>• Mounting height and orientation</li>
                    <li>• Lumen output and power consumption</li>
                    <li>• Quantity required per zone</li>
                  </ul>
                  <p className="text-blue-200 text-xs mt-2 italic">Essential for procurement and installation contractors</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Calculation Summary Reports</h4>
                  <p className="text-gray-300 text-sm mb-2">Professional documents including:</p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li>• Project details (client, address, designer)</li>
                    <li>• Compliance statement (BS 5266-1:2025)</li>
                    <li>• Minimum, maximum, and average lux values</li>
                    <li>• Uniformity ratios and calculation methods</li>
                    <li>• Software version and calculation date</li>
                  </ul>
                  <p className="text-blue-200 text-xs mt-2 italic">Required for Building Control approval and logbook documentation</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <p className="text-elec-yellow font-medium mb-2">Real-World Example:</p>
              <p className="text-foreground text-sm leading-relaxed mb-3">
                A 20m corridor (2m wide, 2.8m ceiling) with 6× 200-lumen bulkheads produces this output:
              </p>
              <ul className="text-foreground text-sm space-y-1 ml-4">
                <li>• <strong>Average lux:</strong> 1.8 lux ✓</li>
                <li>• <strong>Minimum lux:</strong> 1.1 lux ✓</li>
                <li>• <strong>Maximum lux:</strong> 2.6 lux</li>
                <li>• <strong>Uniformity:</strong> 1:2.4 (acceptable)</li>
                <li>• <strong>Compliance:</strong> PASS - all areas ≥1.0 lux</li>
              </ul>
              <p className="text-gray-300 text-xs mt-2">The software instantly confirms this design meets BS 5266-1 without manual calculations.</p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">What do red zones on a lux contour map indicate?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Areas where lux levels fall below the required minimum (typically &lt;0.5 lux), indicating non-compliance and the need for additional or repositioned luminaires.</p>
            </div>
          </div>
        </div>

        {/* Section 5 - Software Limitations */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">5</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Critical Limitations: Why Software Isn't Enough</h3>
          </div>
          
          <div className="ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Here's the harsh reality: software predictions are often wrong. Not because the software is faulty, but because real buildings don't behave like perfect computer models.
            </p>

            <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-5">
              <h4 className="text-red-300 font-bold text-lg mb-3 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                What Software Cannot Know:
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold">Future Obstructions</p>
                    <p className="text-gray-300 text-sm">You model an empty warehouse at 2.0 lux. Three months later, 4m-high racking is installed. Actual lux in aisles drops to 0.6 lux. Non-compliant.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold">Surface Degradation</p>
                    <p className="text-gray-300 text-sm">Software assumes clean white ceilings (70% reflectance). After 2 years in a dusty environment, reflectance drops to 40%. Lux levels fall by 20-25%.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold">Installation Errors</p>
                    <p className="text-gray-300 text-sm">You specify luminaire mounting at 2.5m. Contractor installs at 3.2m due to ductwork. Lux levels drop by 35-40% due to increased distance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold">Component Degradation</p>
                    <p className="text-gray-300 text-sm">LED output degrades 30% over 10 years. Software uses new luminaire data. What's compliant today may fail in 5 years without maintenance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <p className="text-elec-yellow font-medium mb-2">The Golden Rule:</p>
              <p className="text-foreground text-sm font-semibold leading-relaxed">
                Software designs the system. Physical lux testing after installation PROVES compliance. Both are mandatory.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-5">
              <h4 className="text-foreground font-semibold mb-3">Best Practice Approach:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Design with 20-30% safety margin above minimum requirements</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Model all known obstructions and equipment</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Use conservative surface reflectance values</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Apply maintenance factor of 0.8 or lower in harsh environments</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Always conduct post-installation lux testing with calibrated meter</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Document actual vs. predicted results in logbook</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Even if software shows full compliance, what MUST still be done after installation?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Physical lux testing using a calibrated light meter to verify actual performance matches predictions, as required by BS 5266-1. Software predictions must be validated on-site.</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};