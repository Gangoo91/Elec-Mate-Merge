import { Scale, BookOpen, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntro = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Scale className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Why Emergency Lighting is Legally Required
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Emergency lighting is a critical life safety system required by law to ensure safe evacuation during power failures or emergencies. The legal framework in the UK establishes clear duties for building owners and operators.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg shadow-md">
            <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-400" />
              Primary Purpose
            </h4>
            <p className="text-gray-300 text-sm">
              To enable safe evacuation of buildings when normal lighting fails, protecting lives and preventing panic.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-amber-600/20 to-orange-800/10 border border-amber-500/40 rounded-lg shadow-md">
            <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Legal Consequence
            </h4>
            <p className="text-gray-300 text-sm">
              Non-compliance can result in prosecution, unlimited fines, and criminal liability for responsible persons.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};