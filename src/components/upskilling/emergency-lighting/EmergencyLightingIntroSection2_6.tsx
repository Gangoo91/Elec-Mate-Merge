import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export const EmergencyLightingIntroSection2_6 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Emergency lighting is only effective if it is regularly tested, maintained, and correctly 
          documented. Even a perfectly designed system becomes a liability if it fails during an 
          emergency because batteries weren't checked, or faults weren't logged.
        </p>
        
        <p>
          Testing and record keeping are not optional — they are a legal requirement under BS 5266-1 
          and form a core part of any compliance inspection. For electricians, understanding the 
          testing schedule and the correct use of logbooks is just as important as installing the 
          system itself.
        </p>
      </CardContent>
    </Card>
  );
};