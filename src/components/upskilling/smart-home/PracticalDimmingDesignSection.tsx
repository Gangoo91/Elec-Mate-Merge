import { Settings, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const PracticalDimmingDesignSection = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-50/10 to-indigo-50/10 border-purple-200/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-purple-300">
          <Settings className="h-6 w-6" />
          Practical Dimming Design Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Room Assessment</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-900/20 rounded-lg">
                <Badge variant="outline" className="border-purple-600/30 text-purple-300 mb-2">
                  Living Spaces
                </Badge>
                <p className="text-sm text-gray-300">
                  Multiple dimming zones, warm white for evenings, bright for cleaning
                </p>
              </div>
              <div className="p-3 bg-purple-900/20 rounded-lg">
                <Badge variant="outline" className="border-purple-600/30 text-purple-300 mb-2">
                  Work Areas
                </Badge>
                <p className="text-sm text-gray-300">
                  Task lighting with cool white, adjustable for concentration levels
                </p>
              </div>
              <div className="p-3 bg-purple-900/20 rounded-lg">
                <Badge variant="outline" className="border-purple-600/30 text-purple-300 mb-2">
                  Bedrooms
                </Badge>
                <p className="text-sm text-gray-300">
                  Warm dimming for relaxation, circadian rhythm support
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Installation Checklist</h4>
            </div>
            <div className="space-y-2">
              {[
                "Verify dimmer compatibility with LED specifications",
                "Check minimum load requirements",
                "Test for flicker at all dimming levels",
                "Configure colour temperature ranges",
                "Set up default brightness levels",
                "Program circadian rhythm schedules",
                "Create user-friendly scene names",
                "Document system configuration for client"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-600/30">
          <h5 className="font-semibold text-purple-300 mb-2">Pro Tip</h5>
          <p className="text-gray-300 text-sm">
            Always demonstrate the full dimming range to clients and explain how different 
            brightness levels affect energy consumption and bulb lifespan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};