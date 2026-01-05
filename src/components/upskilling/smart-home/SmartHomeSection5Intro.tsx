import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeSection5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart home systems can be installed in two main contexts: <strong className="text-foreground">retrofit</strong> (upgrading an existing property) and <strong className="text-foreground">new build</strong> (integrating smart technology during construction). Each approach has unique challenges, costs, and opportunities.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Retrofit Installations</h4>
            <p className="text-blue-100 text-sm">Adding smart technology to existing homes with minimal disruption using wireless solutions and smart devices.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">New Build Installations</h4>
            <p className="text-green-100 text-sm">Integrating smart systems during construction with structured cabling and centralised control systems.</p>
          </div>
        </div>

        <p>
          Installers, designers, and clients need to weigh these approaches carefully to ensure the chosen system is both practical and future-proof for the specific property and user requirements.
        </p>
      </CardContent>
    </Card>
  );
};