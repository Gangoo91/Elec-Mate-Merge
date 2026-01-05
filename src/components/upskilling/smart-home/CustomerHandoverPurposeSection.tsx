import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const CustomerHandoverPurposeSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          1. Purpose of the Handover
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          A professional handover is the final critical step that determines whether a smart home installation succeeds or fails in the client's hands.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Confirms System Operation</h4>
            <p className="text-gray-300 text-sm">Verifies the system works as designed and meets client expectations</p>
          </div>
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Builds Client Confidence</h4>
            <p className="text-gray-300 text-sm">Shows clients how to control devices and understand system capabilities</p>
          </div>
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Reduces Call-backs</h4>
            <p className="text-gray-300 text-sm">Prevents future support calls caused by misuse or misunderstanding</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerHandoverPurposeSection;