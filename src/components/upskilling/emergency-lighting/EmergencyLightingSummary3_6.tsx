import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, BookOpen, Wrench, AlertTriangle } from 'lucide-react';

export const EmergencyLightingSummary3_6 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary: What You've Learned
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Core Concepts */}
        <div className="bg-gradient-to-r from-elec-dark to-gray-800 rounded-lg p-5 border border-elec-yellow/30">
          <h3 className="text-elec-yellow font-bold text-lg mb-4">Core Concepts Mastered</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Why Software is Essential
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed ml-7">
                Manual emergency lighting calculations are impractical for modern projects with complex layouts, varying ceiling heights, and strict BS 5266-1 requirements. Software simulates photometric behaviour, models 3D spaces with obstructions, generates compliance documentation, and dramatically reduces design time whilst improving accuracy.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Industry-Standard Tools
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed ml-7">
                DIALux and Relux dominate the UK market - both are free, professionally capable, and widely accepted by Building Control. DIALux offers the largest manufacturer database and strongest industry support. Relux provides a more intuitive interface for beginners. Paid software like AGi32 is only necessary for complex multi-storey or specialist projects.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Professional Workflow
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed ml-7">
                Successful design follows a structured process: import/create building geometry → set accurate surface reflectances → select manufacturer-specific luminaires using IES/LDT files → position fittings based on spacing guidance → set calculation parameters (0.0m working plane, 0.8 maintenance factor) → generate lux plots → refine design until all areas achieve required illuminance → export professional reports for documentation.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Understanding Outputs
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed ml-7">
                Lux contour maps reveal compliance through colour coding (green = pass, red = fail). Polar diagrams show luminaire light distribution characteristics. Luminaire schedules provide procurement and installation data. Calculation reports document compliance for Building Control. All outputs work together to prove design validity and support project handover.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Critical Limitations
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed ml-7">
                Software assumes ideal conditions that rarely exist on real sites. It cannot predict future obstructions, surface degradation, installation errors, or component aging. Models use clean surfaces and precise mounting - reality introduces dust, incorrect heights, and substituted products. <strong>This is why BS 5266-1 mandates physical lux testing after installation.</strong> Software designs the system; testing proves compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Application */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
          <h3 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Practical Application Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">First-Time Users</p>
              <p className="text-gray-300 text-xs">Download DIALux evo, create simple room geometry, add luminaires from manufacturer databases, calculate lux levels, interpret colour-coded results</p>
            </div>
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Industrial Spaces</p>
              <p className="text-gray-300 text-xs">Account for high ceilings, model obstructions in 3D, use conservative reflectance values, specify high-output fittings, apply 30% safety margins</p>
            </div>
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Data Management</p>
              <p className="text-gray-300 text-xs">Source IES/LDT files from manufacturers, import custom luminaires, maintain organised project libraries, export PDF reports immediately</p>
            </div>
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Troubleshooting</p>
              <p className="text-gray-300 text-xs">Diagnose prediction vs reality discrepancies, check mounting heights, verify reflectances, identify unmodelled obstructions, resolve commissioning issues</p>
            </div>
          </div>
        </div>

        {/* Key Numbers to Remember */}
        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-600">
          <h3 className="text-foreground font-bold text-lg mb-4">Key Values to Remember</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">1.0</p>
              <p className="text-gray-300 text-xs mt-1">Lux minimum<br/>Escape routes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">0.5</p>
              <p className="text-gray-300 text-xs mt-1">Lux minimum<br/>Open areas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">0.8</p>
              <p className="text-gray-300 text-xs mt-1">Maintenance<br/>factor</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">20%</p>
              <p className="text-gray-300 text-xs mt-1">Safety margin<br/>above minimum</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">70%</p>
              <p className="text-gray-300 text-xs mt-1">Ceiling<br/>reflectance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">50%</p>
              <p className="text-gray-300 text-xs mt-1">Wall<br/>reflectance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">20%</p>
              <p className="text-gray-300 text-xs mt-1">Floor<br/>reflectance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">0.0m</p>
              <p className="text-gray-300 text-xs mt-1">Working plane<br/>height (floor)</p>
            </div>
          </div>
        </div>

        {/* Final Takeaway */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-orange-500/10 border-2 border-elec-yellow/30 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-elec-yellow font-bold text-xl mb-3">The Fundamental Truth</h3>
              <p className="text-foreground leading-relaxed mb-3">
                Emergency lighting software is transforming how electricians design and specify systems - it's faster, more accurate, and produces professional documentation that satisfies Building Control requirements. But software is a tool, not a replacement for knowledge or verification.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                <strong className="text-elec-yellow">Design with software. Verify with testing. Document with both.</strong> This is professional emergency lighting practice in 2025.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3">Ready to Apply This Knowledge?</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <p className="text-foreground text-sm">Download DIALux evo and practise with a simple room layout</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <p className="text-foreground text-sm">Test the Emergency Lighting Calculator below to understand spacing calculations</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <p className="text-foreground text-sm">Complete the quiz to verify your understanding before moving to Module 4</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};