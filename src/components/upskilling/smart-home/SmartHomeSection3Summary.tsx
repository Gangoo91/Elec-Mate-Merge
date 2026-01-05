import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const SmartHomeSection3Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          In this section, we explored the three fundamental components that make smart homes work:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Sensors</h4>
            <p className="text-sm">Input devices that detect environmental changes and send signals to controllers</p>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Actuators</h4>
            <p className="text-sm">Output devices that carry out physical actions when instructed by controllers</p>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Controllers</h4>
            <p className="text-sm">Decision-makers that process sensor data and coordinate actuator responses</p>
          </div>
        </div>
        
        <p>
          Understanding these components and their interactions is essential for designing, installing, and maintaining effective smart home systems. We also examined integration challenges and future trends that will shape the evolution of smart home technology.
        </p>
      </CardContent>
    </Card>
  );
};