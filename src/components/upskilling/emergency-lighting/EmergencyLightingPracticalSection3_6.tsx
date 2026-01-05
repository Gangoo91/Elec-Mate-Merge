import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

export const EmergencyLightingPracticalSection3_6 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance: From Theory to Real Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Scenario 1 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-elec-yellow">
          <h3 className="text-elec-yellow font-bold text-lg mb-3">Scenario 1: First-Time DIALux User</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Situation:</p>
              <p className="text-gray-300 text-sm">You've been asked to design emergency lighting for a small office (12m × 8m, 2.7m ceiling). You've never used DIALux before.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Step-by-Step Approach:</p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">1.</span>
                  <p className="text-gray-300 text-sm flex-1">Download DIALux evo (free) from dial.de. Install and open the software.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">2.</span>
                  <p className="text-gray-300 text-sm flex-1">Create new project → Select "Emergency Lighting" mode → Name it "Office_Emergency_Project"</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">3.</span>
                  <p className="text-gray-300 text-sm flex-1">Draw room: Click "Room" tool → Enter dimensions: Length 12m, Width 8m, Height 2.7m</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">4.</span>
                  <p className="text-gray-300 text-sm flex-1">Set surfaces: Ceiling 70%, Walls 50%, Floor 20% (standard office values)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">5.</span>
                  <p className="text-gray-300 text-sm flex-1">Add luminaires: Search manufacturer database for "LED emergency bulkhead 200 lumen" → Drag 6 fittings onto ceiling in 2×3 grid pattern (approximately 4m spacing)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">6.</span>
                  <p className="text-gray-300 text-sm flex-1">Calculate: Set working plane to 0.0m (floor level) → Maintenance factor 0.8 → Click "Calculate"</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">7.</span>
                  <p className="text-gray-300 text-sm flex-1">Review results: Check lux plot shows all areas ≥1.0 lux (green zones). If red zones appear, add more fittings and recalculate.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-500/30 rounded p-3 mt-3">
              <p className="text-green-300 text-sm"><strong>Expected Result:</strong> 6 fittings should achieve 1.4-1.8 lux average with full compliance. Total time: 15-25 minutes for first attempt.</p>
            </div>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-blue-400">
          <h3 className="text-blue-400 font-bold text-lg mb-3">Scenario 2: Complex Industrial Space with Obstructions</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Challenge:</p>
              <p className="text-gray-300 text-sm">A 30m × 20m warehouse with 5m ceiling height, containing 3.5m-high racking down the centre, dark painted walls, and dusty conditions.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Critical Considerations:</p>
              <div className="space-y-3 ml-4">
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Height Factor:</p>
                  <p className="text-gray-300 text-sm">Standard 200-lumen bulkheads won't work at 5m height. Use 400-600 lumen high-output fittings or high-bay emergency lights.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Obstructions:</p>
                  <p className="text-gray-300 text-sm">Model the racking in 3D within DIALux. Don't assume light will penetrate - it creates shadow zones requiring additional fittings.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Surface Conditions:</p>
                  <p className="text-gray-300 text-sm">Reduce ceiling reflectance to 40% (dusty), walls to 30% (dark paint), floor to 15% (industrial concrete). This accounts for real conditions.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Safety Margin:</p>
                  <p className="text-gray-300 text-sm">Aim for 30% above minimum (1.3 lux on escape routes) to account for future changes and maintenance degradation.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">Spacing Adjustment:</p>
                  <p className="text-gray-300 text-sm">At 5m mounting, maximum spacing reduces from 7m to approximately 5-5.5m. Plan for more fittings than standard calculation.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/30 border border-orange-500/30 rounded p-3 mt-3">
              <p className="text-orange-300 text-sm"><strong>Common Mistake:</strong> Using manufacturer spacing tables without adjusting for mounting height and obstructions. This leads to 40-50% underprovision in industrial settings.</p>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 rounded p-3 mt-2">
              <p className="text-blue-300 text-sm"><strong>Professional Approach:</strong> Model worst-case scenario, then remove a fitting and recalculate. If still compliant with 20% margin, you've optimised the design.</p>
            </div>
          </div>
        </div>

        {/* Scenario 3 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-purple-400">
          <h3 className="text-purple-400 font-bold text-lg mb-3">Scenario 3: Getting Photometric Data from Manufacturers</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Problem:</p>
              <p className="text-gray-300 text-sm">You want to use a specific manufacturer's LED emergency bulkhead, but can't find it in DIALux's database.</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Solution Process:</p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Visit manufacturer's website → Navigate to product page → Look for "Downloads" or "Technical Data"</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Download IES (.ies) or LDT (.ldt) file - these contain photometric test data</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">In DIALux: File → Import → Select Luminaire → Browse to downloaded file</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Luminaire now appears in "User Catalogue" ready to use in your project</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-foreground font-semibold mb-2 mt-4">If IES/LDT Files Aren't Available:</p>
              <div className="space-y-2 ml-4">
                <p className="text-gray-300 text-sm">1. Contact manufacturer technical support directly - they should provide files</p>
                <p className="text-gray-300 text-sm">2. Check if manufacturer has DIALux/Relux plugin available for bulk import</p>
                <p className="text-gray-300 text-sm">3. As last resort, use comparable product from another manufacturer with similar lumen output and beam angle</p>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded p-3 mt-3">
              <p className="text-red-300 text-sm"><strong>Never:</strong> Use "generic LED bulkhead" entries in software. These use standardised curves that don't match real products, leading to significant calculation errors.</p>
            </div>
          </div>
        </div>

        {/* Scenario 4 */}
        <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-green-400">
          <h3 className="text-green-400 font-bold text-lg mb-3">Scenario 4: Post-Installation Testing Reveals Problems</h3>
          <div className="space-y-3">
            <div>
              <p className="text-foreground font-semibold mb-1">The Discovery:</p>
              <p className="text-gray-300 text-sm">Software predicted 1.4 lux average. Your calibrated lux meter shows 0.9 lux in some areas. Why?</p>
            </div>
            
            <div>
              <p className="text-foreground font-semibold mb-2">Troubleshooting Steps:</p>
              <div className="space-y-3 ml-4">
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">1. Check Mounting Heights</p>
                  <p className="text-gray-300 text-sm">Measure actual ceiling height vs. software model. Even 30cm difference significantly affects lux levels. If contractor mounted higher than specified, lux drops by inverse square law.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">2. Verify Luminaire Output</p>
                  <p className="text-gray-300 text-sm">Are the installed fittings actually the specified model? Check product labels match IES file used in calculations. Wrong product = wrong photometry.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">3. Look for Obstructions</p>
                  <p className="text-gray-300 text-sm">Services installed after design (cable trays, ductwork, pipework) casting shadows? These weren't modelled but significantly impact real performance.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">4. Re-examine Surface Conditions</p>
                  <p className="text-gray-300 text-sm">Did you assume clean white walls but actual space has dark tiles or painted brick? Reflectance error of 30-40% is common.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">5. Luminaire Commissioning</p>
                  <p className="text-gray-300 text-sm">Some LED emergency drivers have adjustable output. Check if fittings were commissioned at full output or incorrectly set to reduced mode.</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-3 mt-3">
              <p className="text-foreground text-sm"><strong>Resolution:</strong> Add 2-3 additional fittings in low-lux zones, retest, and document actual vs predicted results in logbook. Update software model for future reference.</p>
            </div>
          </div>
        </div>

        {/* Best Practices Summary */}
        <div className="bg-gradient-to-r from-elec-gray to-gray-800 border border-elec-yellow/30 rounded-lg p-5">
          <h3 className="text-elec-yellow font-bold text-lg mb-4">Universal Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Always save multiple project versions before major changes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Update software quarterly - new versions include latest standards</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Export calculation reports as PDF immediately after completion</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Create project templates for common room types to save time</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Compare results with manufacturer spacing tables as sanity check</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Document all assumptions (reflectances, maintenance factors) in notes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Budget 20-30% safety margin above minimum lux requirements</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-foreground text-sm">Use 3D visualisation to communicate design to non-technical clients</p>
            </div>
          </div>
        </div>

        {/* Critical Warning */}
        <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-5">
          <h4 className="text-red-300 font-bold text-lg mb-3 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Critical Reminder
          </h4>
          <p className="text-foreground leading-relaxed">
            Software is a design tool, not a compliance certificate. <strong>BS 5266-1 requires physical lux testing after installation.</strong> Software results must be verified on-site using calibrated equipment. No amount of software sophistication replaces actual measurement and professional judgement.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};