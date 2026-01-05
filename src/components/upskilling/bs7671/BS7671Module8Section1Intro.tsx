import { Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BS7671Module8Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Book className="h-5 w-5 text-elec-yellow" />
          Introduction to Appendices Navigation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          The BS 7671:2018+A3:2025 appendices form the backbone of electrical design calculations and verification procedures. 
          These reference materials are essential tools that every electrical professional must master for safe, compliant installations.
        </p>
        <p>
          This comprehensive section provides detailed guidance on navigating the most critical appendices, including Zs tables for 
          protective device selection, conductor sizing methodologies, and voltage drop calculations that ensure optimal system performance.
        </p>
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600 mt-4">
          <h5 className="text-elec-yellow font-semibold mb-2">Key Appendices Covered:</h5>
          <ul className="text-sm space-y-1">
            <li>• Appendix 4: Current-carrying capacities and correction factors</li>
            <li>• Appendix 12: Voltage drop calculations and compliance limits</li>
            <li>• Appendix 14: Earth fault loop impedance values</li>
            <li>• Appendix 15: Ring final circuit calculations</li>
            <li>• Reference charts and derating tables</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section1Intro;