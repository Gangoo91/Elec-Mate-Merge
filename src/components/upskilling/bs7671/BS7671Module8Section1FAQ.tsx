import { HelpCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section1FAQ = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-900/20 to-elec-gray border-indigo-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-indigo-600 text-foreground">Common Queries</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="space-y-4">
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: When do I need to apply multiple correction factors simultaneously?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> You must apply all relevant correction factors that affect the cable's current-carrying capacity. For example, 
              a cable installed in trunking (Method B1) in a 40°C ambient temperature, grouped with 5 other circuits, and passing through 
              200mm of thermal insulation would require Ca (0.87) × Cg (0.60) × Ci (0.78) = 0.41 combined factor. Always identify all 
              conditions that affect heat dissipation.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I handle ring final circuits for voltage drop calculations?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> For ring final circuits, use the total cable length divided by 4 as the effective length in voltage drop 
              calculations. This accounts for the parallel path effect. For example, a 60m ring circuit would use 15m (60÷4) in the 
              voltage drop formula. However, ensure both legs of the ring are reasonably balanced in length and loading for this method to be accurate.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What's the difference between measured and design Zs values?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Design Zs is calculated using Ze + (R1+R2) at operating temperature (typically 70°C for PVC), while 
              measured Zs is taken at ambient temperature during testing. The 0.8 factor can be applied to measured values to account 
              for temperature rise, or alternatively, multiply calculated values by 1.2. Always compare the appropriate values against 
              tabulated limits in Appendix 14.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I determine the correct installation method reference?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Use Table 4A2 to identify the installation method. Consider the cable construction (single-core, 
              multi-core, flat, circular), the installation environment (enclosed, clipped direct, buried), and support systems. 
              For example, twin and earth cable clipped directly to a wooden joist would be Method C, while the same cable in plastic 
              conduit would be Method B1. This significantly affects current-carrying capacity.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: Why are my voltage drop calculations higher than expected?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Common causes include: using incorrect mV/A/m values from the tables (ensure you're using the right 
              cable type and installation method), not accounting for actual circuit length (measure the entire cable run, not just 
              the straight-line distance), or overlooking reactive loads that require impedance-based calculations rather than the 
              simplified mV/A/m method. Also check if you're using three-phase correctly (multiply by √3 for balanced loads).
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do Amendment 3 changes affect appendix calculations?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Amendment 3 introduces enhanced safety margins and updated correction factors reflecting modern 
              installation practices. Key changes include revised grouping factors for LED circuits, updated thermal insulation 
              effects for improved building insulation standards, and enhanced Zs requirements for prosumer installations with 
              bidirectional power flow. Always use the latest appendix tables for accurate calculations.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What should I do when calculated values are borderline compliant?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> When calculations result in values very close to limits, consider: using the next larger cable size 
              for safety margin, installing sub-distribution to reduce circuit lengths, improving installation methods to reduce 
              grouping effects, or implementing enhanced protection (RCD) where appropriate. Remember that real-world conditions 
              may be worse than design assumptions, so conservative approaches are recommended.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I verify my calculations are correct?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Use multiple verification methods: cross-check calculations using different appendix references, 
              use manufacturer design software as a secondary check, perform actual measurements during testing and compare with 
              predictions, and have complex calculations peer-reviewed. Keep detailed records of all assumptions and correction 
              factors used. Testing should confirm that design calculations meet real-world performance requirements.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Quick Reference Checklist:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Before Starting Calculations:</h6>
              <ul className="text-sm space-y-1">
                <li>☐ Survey installation route and conditions</li>
                <li>☐ Identify all applicable correction factors</li>
                <li>☐ Confirm cable type and construction</li>
                <li>☐ Determine correct installation method</li>
                <li>☐ Measure or estimate Ze value</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">After Completing Calculations:</h6>
              <ul className="text-sm space-y-1">
                <li>☐ Verify using alternative methods</li>
                <li>☐ Check all values against regulation limits</li>
                <li>☐ Document assumptions and references</li>
                <li>☐ Consider safety margins for real-world conditions</li>
                <li>☐ Plan verification testing procedures</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section1FAQ;