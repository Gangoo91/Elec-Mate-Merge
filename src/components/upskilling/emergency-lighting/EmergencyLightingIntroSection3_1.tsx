import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';

export const EmergencyLightingIntroSection3_1 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Introduction to Minimum Illumination Levels and Durations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-lg leading-relaxed">
              When designing an emergency lighting system, one of the first considerations is ensuring that the correct 
              light levels and operating durations are achieved. Too little light, or light that fails before evacuation 
              is complete, can turn an emergency into a life-threatening situation.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
          <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Standards and Requirements
          </h3>
          <p className="text-foreground">
            Standards such as <strong>BS 5266-1</strong> set out the lux levels and operating times required for different 
            types of emergency lighting. Electricians must understand and apply these requirements during both design and 
            installation, ensuring that systems provide adequate visibility for safe evacuation and safe shutdown of processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Design Phase</h4>
            <p className="text-sm text-foreground">
              Calculate correct lux levels and battery durations based on building type and usage patterns.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Installation Phase</h4>
            <p className="text-sm text-foreground">
              Position luminaires to achieve uniform lighting distribution and specified performance.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Testing Phase</h4>
            <p className="text-sm text-foreground">
              Verify actual lux levels and duration performance meet design specifications.
            </p>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Critical Safety Impact</h4>
              <p className="text-foreground">
                Inadequate illumination levels or insufficient operating duration can prevent safe evacuation, 
                increase panic, and contribute to injuries or fatalities during emergencies. Professional 
                responsibility requires thorough understanding and correct application of all requirements.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};