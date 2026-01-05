import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, AlertTriangle } from 'lucide-react';

export const EmergencyLightingModule5Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm sm:text-base lg:text-lg">
          After installation, inspection, and testing are complete, the emergency lighting system must be formally 
          certified before it is handed over to the client. Certification provides written proof that the system 
          meets all design and performance requirements under BS 5266-1, BS 7671, and BS EN 50172. It also establishes 
          accountability — confirming who designed, installed, inspected, and verified the system.
        </p>

        <p className="text-foreground text-sm sm:text-base lg:text-lg">
          Commissioning checklists are used to verify that each element has been tested, labelled, and documented 
          correctly. For electricians, mastering the certification process is key to professional credibility, 
          legal compliance, and client confidence.
        </p>

        <div className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-400 mb-2">⚠️ Legal Compliance Requirement</h4>
              <p className="text-foreground text-sm">
                Under BS 5266 and fire safety legislation, certification is essential to demonstrate compliance. 
                A system without certification is considered non-verified, even if physically operational.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
