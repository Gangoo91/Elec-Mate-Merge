import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BS7671Module8Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Introduction to Documentation and Quality Control
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Professional electrical installation documentation ensures regulatory compliance and quality standards. 
          BS 7671:2018+A3:2025 provides standardised forms, schedules, and reference charts for consistent 
          documentation across the UK electrical industry.
        </p>
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600 mt-4">
          <h5 className="text-elec-yellow font-semibold mb-2">Documentation Framework:</h5>
          <ul className="text-sm space-y-1">
            <li>• Model certificates: EIC, MEIWC, EICR standardisation</li>
            <li>• Schedule completion: Test results and circuit details</li>
            <li>• Reference charts: Design verification and quick calculations</li>
            <li>• Quality procedures: Systematic verification processes</li>
            <li>• Digital integration: Modern documentation technologies</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section2Intro;