import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule4Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Traditional heating controls relied on fixed timers — the heating switched on and off at the same times every day. Smart systems offer two main approaches: schedules (user-programmed routines) and AI learning control (systems that adapt automatically to user behaviour, occupancy, and external factors).
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Scheduled Control</h4>
            <p className="text-blue-100 text-sm">User-programmed heating times with predictable operation and full manual control over system behaviour.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">AI Learning Control</h4>
            <p className="text-green-100 text-sm">Adaptive systems that learn user behaviour and adjust automatically for optimal comfort and efficiency.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Hybrid Approach</h4>
            <p className="text-purple-100 text-sm">Combines scheduled reliability with AI optimisation for maximum flexibility and energy savings.</p>
          </div>
        </div>

        <p>
          Installers and users must understand both approaches, as each has advantages and limitations depending on the context. While scheduled control offers predictability and user control, AI learning systems provide flexibility and energy optimisation through adaptive behaviour.
        </p>
        <p>
          This section explores both control methods, their energy efficiency implications, and how to recommend the right approach for different property types and user needs.
        </p>
      </CardContent>
    </Card>
  );
};