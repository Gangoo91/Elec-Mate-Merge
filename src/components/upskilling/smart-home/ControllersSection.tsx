import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

export const ControllersSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            3. Controllers and Hubs (Decision-Makers)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="font-medium text-foreground">Process sensor data and decide what actuators should do.</p>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Local Controllers</h4>
                <p className="text-sm mb-2">Run automation on-site for faster response</p>
                <p className="text-xs text-gray-400">Examples: Raspberry Pi, SmartThings hub</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Cloud-based Controllers</h4>
                <p className="text-sm mb-2">Process data externally with advanced features</p>
                <p className="text-xs text-gray-400">Examples: Alexa, Google Home</p>
              </div>
            </div>
            
            <div className="p-4 bg-[#0f0f0f] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Key Functions:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <span>Scheduling automated routines</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <span>Rules processing ("if motion → turn on light")</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <span>Integration of different device brands</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <span>User interfaces: mobile apps, voice assistants, touchscreens</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-600/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-400" />
            Knowledge Check: Controllers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <p className="font-medium text-purple-100">Q1: What is the main role of a controller in a smart home?</p>
            </div>
            
            <div className="p-3 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <p className="font-medium text-purple-100">Q2: What's the difference between local and cloud-based controllers?</p>
            </div>
            
            <div className="p-3 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <p className="font-medium text-purple-100">Q3: Give an example of a rules-based automation.</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-purple-500 text-purple-300 hover:bg-purple-900/30 hover:text-purple-200"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-purple-600/50">
              <div className="p-3 bg-purple-800/30 border border-purple-500/30 rounded-lg">
                <p className="font-medium text-purple-400 mb-1">A1:</p>
                <p className="text-purple-100">To process sensor data and decide what actuators should do using rules and logic.</p>
              </div>
              
              <div className="p-3 bg-purple-800/30 border border-purple-500/30 rounded-lg">
                <p className="font-medium text-purple-400 mb-1">A2:</p>
                <p className="text-purple-100">Local controllers process data on-site for faster response, while cloud-based controllers offer more features but depend on internet connectivity.</p>
              </div>
              
              <div className="p-3 bg-purple-800/30 border border-purple-500/30 rounded-lg">
                <p className="font-medium text-purple-400 mb-1">A3:</p>
                <p className="text-purple-100">"If motion detected AND time after sunset → turn on porch lights"</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};