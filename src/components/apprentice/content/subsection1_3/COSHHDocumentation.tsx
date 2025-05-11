
import React from 'react';
import { FileText } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const COSHHDocumentation = () => {
  return (
    <Card className="border-elec-yellow/30 bg-elec-dark/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-elec-yellow flex items-center">
          <FileText className="mr-3 h-6 w-6" />
          COSHH Documentation and Record Keeping
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Proper documentation and record keeping are essential aspects of COSHH compliance. These records 
          serve as evidence of compliance and provide valuable information for ongoing safety management.
        </p>
        
        <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Required COSHH Documentation:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold">COSHH assessments</span> - Written assessments for all hazardous substances</li>
            <li><span className="font-semibold">Safety data sheets (SDS)</span> - Must be obtained from suppliers for all chemicals</li>
            <li><span className="font-semibold">Exposure monitoring records</span> - Results of any workplace exposure measurements</li>
            <li><span className="font-semibold">Health surveillance records</span> - Medical checks required for certain substances</li>
            <li><span className="font-semibold">Maintenance logs</span> - Records of testing and maintenance of control measures</li>
            <li><span className="font-semibold">Training records</span> - Evidence of employee COSHH training</li>
            <li><span className="font-semibold">Emergency procedures</span> - Plans for dealing with accidents involving hazardous substances</li>
          </ul>
        </div>

        <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Best Practices for COSHH Management:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Maintain an inventory of all hazardous substances used</li>
            <li>Regularly review and update COSHH assessments (at least annually)</li>
            <li>Store hazardous substances securely and according to compatibility requirements</li>
            <li>Implement a system for checking and maintaining control measures</li>
            <li>Provide clear information to workers about risks and control measures</li>
            <li>Ensure adequate supervision of workers using hazardous substances</li>
            <li>Have emergency procedures in place for spills, fires, and first aid</li>
            <li>Conduct regular workplace inspections to check compliance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default COSHHDocumentation;
