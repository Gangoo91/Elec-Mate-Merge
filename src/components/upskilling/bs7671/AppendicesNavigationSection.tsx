import { Calculator, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AppendicesNavigationSection = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-elec-gray border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Mastering Appendices Navigation
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-blue-600 text-foreground">Essential Skills</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Appendix Structure and Organisation:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Current-Carrying Capacity Data:</h6>
              <ul className="text-sm space-y-1">
                <li>• Appendix 4: Tables 4A1 to 4E4A</li>
                <li>• Installation method references (A1, A2, B1, B2, etc.)</li>
                <li>• Cable types and construction variations</li>
                <li>• Temperature ratings and derating factors</li>
                <li>• Grouping factors for multiple circuits</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Protection and Safety Data:</h6>
              <ul className="text-sm space-y-1">
                <li>• Appendix 14: Maximum Zs values</li>
                <li>• Time/current characteristics</li>
                <li>• RCD operation parameters</li>
                <li>• Arc fault protection requirements</li>
                <li>• Surge protection device coordination</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Cross-Referencing Techniques:</h5>
          <div className="grid gap-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Step 1: Identify Installation Method</h6>
              <p className="text-sm">Reference Table 4A2 to determine the correct installation method code (A1, B1, C, etc.) based on cable route and support systems.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-2">Step 2: Select Appropriate Table</h6>
              <p className="text-sm">Choose the correct current-carrying capacity table based on cable type, number of cores, and installation method.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-2">Step 3: Apply Correction Factors</h6>
              <p className="text-sm">Use Tables 4B1-4B4 for ambient temperature, 4C1-4C6 for grouping, and 4D1A-4D5 for thermal insulation effects.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-2">Step 4: Verify Protection Coordination</h6>
              <p className="text-sm">Check Appendix 14 for maximum Zs values and confirm protective device characteristics match circuit requirements.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Quick Reference Guide:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <Calculator className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Design Calculations</h6>
              <ul className="text-xs space-y-1">
                <li>• Load calculations</li>
                <li>• Diversity factors</li>
                <li>• Future expansion</li>
                <li>• Harmonic considerations</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <FileText className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Verification Data</h6>
              <ul className="text-xs space-y-1">
                <li>• Test procedures</li>
                <li>• Acceptable limits</li>
                <li>• Measurement techniques</li>
                <li>• Documentation requirements</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <BookOpen className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Standards References</h6>
              <ul className="text-xs space-y-1">
                <li>• IEC 60364 series</li>
                <li>• British Standards</li>
                <li>• Amendment updates</li>
                <li>• International harmonisation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppendicesNavigationSection;