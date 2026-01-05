import { Book, Scale, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection4 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Book className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Overview of BS 5266 and Related Standards
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          BS 5266 is the primary British Standard governing emergency lighting installations. Understanding this standard alongside related regulations ensures compliant, effective, and legally sound emergency lighting systems.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg shadow-md">
            <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
              <Scale className="h-4 w-4 text-blue-400" />
              Regulatory Framework
            </h4>
            <p className="text-gray-300 text-sm">
              BS 5266 works alongside Building Regulations, Fire Safety Order, and European standards to create comprehensive requirements.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-teal-600/20 to-teal-800/10 border border-teal-500/40 rounded-lg shadow-md">
            <h4 className="text-teal-300 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-400" />
              Compliance Requirements
            </h4>
            <p className="text-gray-300 text-sm">
              Standards cover design, installation, commissioning, testing, and maintenance procedures for all system types.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};