import { BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummary = () => {
  return (
    <Card className="bg-blue-600/10 border-blue-600/30 border">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <BookmarkCheck className="h-5 w-5" />
          Key Takeaways: Legal Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-200 space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-foreground font-semibold mb-2">Legal Requirements</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>RRO places duties on responsible persons</li>
              <li>Building Regulations apply to new/altered buildings</li>
              <li>BS 5266-1 provides technical guidance</li>
              <li>Non-compliance carries serious penalties</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-2">Practical Application</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Emergency lighting required in most commercial buildings</li>
              <li>Design must meet photometric standards</li>
              <li>Regular testing and maintenance mandatory</li>
              <li>Documentation and record-keeping essential</li>
            </ul>
          </div>
        </div>
        
        <div className="p-3 bg-elec-gray rounded-md">
          <p className="text-elec-yellow font-medium text-sm">
            Remember: Emergency lighting is not optional – it's a legal requirement that protects lives and creates liability for those responsible for buildings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};