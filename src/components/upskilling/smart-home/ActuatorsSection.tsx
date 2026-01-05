import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Settings, ChevronDown, ChevronUp } from 'lucide-react';

export const ActuatorsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            2. Actuators (Output Devices)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="font-medium text-foreground">Carry out physical actions when instructed.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Switches & Relays</h4>
                <p className="text-sm">Control lighting, sockets, and electrical appliances</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Motors</h4>
                <p className="text-sm">Adjust blinds, garage doors, and HVAC dampers</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Valves</h4>
                <p className="text-sm">Regulate water and gas flow in heating systems</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Smart Locks</h4>
                <p className="text-sm">Electronic locking and unlocking mechanisms</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Dimmers</h4>
                <p className="text-sm">Adjust light intensity for comfort and energy savings</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow">⚠️ Reliability is critical — actuators must work instantly for safety</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-600/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            Knowledge Check: Actuators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <p className="font-medium text-blue-100">Q1: What is an actuator's purpose in a smart home?</p>
            </div>
            
            <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <p className="font-medium text-blue-100">Q2: Name two examples of actuators used in smart homes.</p>
            </div>
            
            <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <p className="font-medium text-blue-100">Q3: Why is actuator reliability critical in security applications?</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-blue-500 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-blue-600/50">
              <div className="p-3 bg-blue-800/30 border border-blue-500/30 rounded-lg">
                <p className="font-medium text-blue-400 mb-1">A1:</p>
                <p className="text-blue-100">To carry out physical actions when instructed by the controller.</p>
              </div>
              
              <div className="p-3 bg-blue-800/30 border border-blue-500/30 rounded-lg">
                <p className="font-medium text-blue-400 mb-1">A2:</p>
                <p className="text-blue-100">Smart switches/relays and smart locks (or motors, valves, dimmers).</p>
              </div>
              
              <div className="p-3 bg-blue-800/30 border border-blue-500/30 rounded-lg">
                <p className="font-medium text-blue-400 mb-1">A3:</p>
                <p className="text-blue-100">Security systems require instant, reliable response for safety and protection.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};