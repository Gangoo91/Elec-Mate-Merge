import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Thermometer, ChevronDown, ChevronUp, Activity } from 'lucide-react';

export const SensorsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            1. Sensors (Input Devices)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="font-medium text-foreground">Detect changes in the environment and send signals.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Motion Sensors</h4>
                <p className="text-sm">Detect movement for security or lighting automation</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Temperature & Humidity Sensors</h4>
                <p className="text-sm">Monitor conditions for HVAC and comfort control</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Light Sensors</h4>
                <p className="text-sm">Enable daylight-linked lighting systems</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Contact Sensors</h4>
                <p className="text-sm">Monitor doors, windows, and cupboards</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Environmental Sensors</h4>
                <p className="text-sm">Smoke, CO₂, and flood detection for safety</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow">💡 Smart homes often combine multiple sensors for better accuracy</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-600/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            Knowledge Check: Sensors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-emerald-900/20 border border-emerald-600/30 rounded-lg">
              <p className="font-medium text-emerald-100">Q1: Which device detects changes — sensors or actuators?</p>
            </div>
            
            <div className="p-3 bg-emerald-900/20 border border-emerald-600/30 rounded-lg">
              <p className="font-medium text-emerald-100">Q2: Name three types of environmental sensors mentioned.</p>
            </div>
            
            <div className="p-3 bg-emerald-900/20 border border-emerald-600/30 rounded-lg">
              <p className="font-medium text-emerald-100">Q3: Why might smart homes use multiple sensors together?</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-emerald-500 text-emerald-300 hover:bg-emerald-900/30 hover:text-emerald-200"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-emerald-600/50">
              <div className="p-3 bg-emerald-800/30 border border-emerald-500/30 rounded-lg">
                <p className="font-medium text-emerald-400 mb-1">A1:</p>
                <p className="text-emerald-100">Sensors detect changes in the environment.</p>
              </div>
              
              <div className="p-3 bg-emerald-800/30 border border-emerald-500/30 rounded-lg">
                <p className="font-medium text-emerald-400 mb-1">A2:</p>
                <p className="text-emerald-100">Smoke sensors, CO₂ sensors, and flood detection sensors.</p>
              </div>
              
              <div className="p-3 bg-emerald-800/30 border border-emerald-500/30 rounded-lg">
                <p className="font-medium text-emerald-400 mb-1">A3:</p>
                <p className="text-emerald-100">Multiple sensors provide better accuracy and reduce false alarms through data correlation.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};