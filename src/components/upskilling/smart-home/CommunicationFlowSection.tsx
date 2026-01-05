import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, ChevronDown, ChevronUp, Zap, Cpu, Activity } from 'lucide-react';

export const CommunicationFlowSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const flowSteps = [
    {
      id: 1,
      title: "Sensor Detection",
      description: "Environmental change detected",
      details: "Motion sensors, temperature sensors, door sensors etc. continuously monitor the environment and detect changes",
      icon: Activity,
      example: "Motion sensor detects person entering room"
    },
    {
      id: 2,
      title: "Signal Transmission",
      description: "Data sent to controller",
      details: "Sensor data is transmitted via wireless protocols (Wi-Fi, Zigbee, Z-Wave) or wired connections to the central hub",
      icon: Zap,
      example: "Motion data sent via Zigbee to SmartThings hub"
    },
    {
      id: 3,
      title: "Processing & Logic",
      description: "Controller interprets signal",
      details: "The hub processes the sensor data using pre-programmed rules, AI algorithms, or user-defined automations",
      icon: Cpu,
      example: "IF motion detected AND time > 6PM THEN turn on lights"
    },
    {
      id: 4,
      title: "Command Execution",
      description: "Actuator performs action",
      details: "Based on the logic, commands are sent to appropriate actuators to perform physical actions",
      icon: Zap,
      example: "Smart switch receives command and turns on living room lights"
    },
    {
      id: 5,
      title: "Status Feedback",
      description: "Confirmation & updates",
      details: "System confirms action completion and sends status updates to user interfaces and logs events",
      icon: RefreshCw,
      example: "App notification: 'Living room lights turned on at 6:15 PM'"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-elec-yellow" />
            4. Communication Flow in Smart Home Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            Understanding how information flows through a smart home system from detection to action:
          </p>
          
          {/* Enhanced Flow Diagram */}
          <div className="space-y-6">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm mb-2">
                      {step.id}
                    </div>
                    <step.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-lg mb-1">{step.title}</h4>
                    <p className="text-gray-400 mb-2">{step.description}</p>
                    <p className="text-gray-300 text-sm mb-3">{step.details}</p>
                    <div className="bg-[#0f0f0f] border border-gray-600 rounded p-2">
                      <p className="text-xs text-gray-400 mb-1">Example:</p>
                      <p className="text-sm text-elec-yellow font-mono">{step.example}</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connecting to next step */}
                {index < flowSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="h-5 w-5 text-gray-500 transform rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Communication Protocols Box */}
          <div className="mt-8 p-4 bg-[#0f0f0f] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Common Communication Protocols:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-elec-yellow">Wi-Fi</div>
                <div className="text-gray-400">High bandwidth</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-elec-yellow">Zigbee</div>
                <div className="text-gray-400">Low power mesh</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-elec-yellow">Z-Wave</div>
                <div className="text-gray-400">Reliable mesh</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-elec-yellow">Bluetooth</div>
                <div className="text-gray-400">Short range</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-600/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-orange-400" />
            Knowledge Check: Communication Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
              <p className="font-medium text-orange-100">Q1: List the 5 main stages of smart home communication flow in order.</p>
            </div>
            
            <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
              <p className="font-medium text-orange-100">Q2: What happens during the "Processing & Logic" stage?</p>
            </div>
            
            <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
              <p className="font-medium text-orange-100">Q3: Name two wireless protocols commonly used for sensor communication.</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-orange-500 text-orange-300 hover:bg-orange-900/30 hover:text-orange-200"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-orange-600/50">
              <div className="p-3 bg-orange-800/30 border border-orange-500/30 rounded-lg">
                <p className="font-medium text-orange-400 mb-1">A1:</p>
                <p className="text-orange-100">1. Sensor Detection → 2. Signal Transmission → 3. Processing & Logic → 4. Command Execution → 5. Status Feedback</p>
              </div>
              
              <div className="p-3 bg-orange-800/30 border border-orange-500/30 rounded-lg">
                <p className="font-medium text-orange-400 mb-1">A2:</p>
                <p className="text-orange-100">The controller processes sensor data using pre-programmed rules, AI algorithms, or user-defined automations to determine what action should be taken.</p>
              </div>
              
              <div className="p-3 bg-orange-800/30 border border-orange-500/30 rounded-lg">
                <p className="font-medium text-orange-400 mb-1">A3:</p>
                <p className="text-orange-100">Wi-Fi, Zigbee, Z-Wave, and Bluetooth are common wireless protocols used for smart home device communication.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};