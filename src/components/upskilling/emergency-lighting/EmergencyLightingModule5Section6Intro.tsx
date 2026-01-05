import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, AlertTriangle } from 'lucide-react';

export const EmergencyLightingModule5Section6Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-sm sm:text-base lg:text-lg">
          Once an emergency lighting system has been designed, installed, inspected, tested, and certified, 
          it must be formally handed over to the client. The handover process ensures the building's 
          Responsible Person understands the system, its maintenance schedule, and their legal duties under 
          the Regulatory Reform (Fire Safety) Order 2005. A proper handover marks the point where the 
          installer's responsibility ends and the client's responsibility for testing and upkeep begins.
        </p>
        
        <p className="text-sm sm:text-base lg:text-lg">
          A well-structured handover not only demonstrates professionalism but also protects electricians 
          and contractors from future liability claims.
        </p>
        
        <div className="border-l-4 border-red-500 bg-red-500/10 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-foreground font-semibold mb-2 text-sm sm:text-base">Professional Protection Requirement</h4>
              <p className="text-sm sm:text-base text-foreground">
                A signed handover is as important as the installation itself. Without documented handover, 
                contractors remain liable for maintenance failures and can face expensive re-visits and legal disputes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
