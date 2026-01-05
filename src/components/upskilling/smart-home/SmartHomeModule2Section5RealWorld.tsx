import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const SmartHomeModule2Section5RealWorld = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const causes = [
    { id: 'wifi-overload', text: 'Too many Wi-Fi devices causing network congestion', correct: true },
    { id: 'router-limits', text: 'Router struggling with concurrent device connections', correct: true },
    { id: 'channel-interference', text: 'Wi-Fi channel contention and interference', correct: true },
    { id: 'cloud-dependency', text: 'Reliance on cloud services for device coordination', correct: true },
    { id: 'gigabit-internet', text: 'Needs faster gigabit internet connection', correct: false },
    { id: 'battery-issues', text: 'Low device battery levels causing dropouts', correct: false }
  ];

  const solutions = [
    { id: 'zigbee-hub', text: 'Add Zigbee hub to offload devices from Wi-Fi', correct: true },
    { id: 'migrate-devices', text: 'Migrate lights and sensors to Zigbee protocol', correct: true },
    { id: 'separate-network', text: 'Create separate IoT network/VLAN', correct: true },
    { id: 'local-automation', text: 'Implement local automation rules via hub', correct: true },
    { id: 'remove-devices', text: 'Remove half the smart devices to reduce load', correct: false },
    { id: 'expensive-router', text: 'Buy the most expensive router available', correct: false }
  ];

  const handleCauseToggle = (causeId: string) => {
    setSelectedCauses(prev => 
      prev.includes(causeId) 
        ? prev.filter(id => id !== causeId)
        : [...prev, causeId]
    );
  };

  const handleSolutionToggle = (solutionId: string) => {
    setSelectedSolutions(prev => 
      prev.includes(solutionId) 
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  const calculateScore = () => {
    const correctCauses = causes.filter(c => c.correct).length;
    const correctSolutions = solutions.filter(s => s.correct).length;
    
    const causesScore = selectedCauses.filter(id => causes.find(c => c.id === id)?.correct).length;
    const solutionsScore = selectedSolutions.filter(id => solutions.find(s => s.id === id)?.correct).length;
    
    const totalCorrect = causesScore + solutionsScore;
    const totalPossible = correctCauses + correctSolutions;
    
    return Math.round((totalCorrect / totalPossible) * 100);
  };

  const resetScenario = () => {
    setCurrentStep(1);
    setSelectedCauses([]);
    setSelectedSolutions([]);
    setShowAnalysis(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: The Tale of Two Approaches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-4">Scenario Overview</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-elec-dark border border-blue-600/20 rounded">
                  <h5 className="font-medium text-blue-200 mb-2">Client A: Small Apartment</h5>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• 5 Wi-Fi smart bulbs</li>
                    <li>• 1 smart plug</li>
                    <li>• Works perfectly fine</li>
                    <li>• No performance issues</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-elec-dark border border-red-600/20 rounded">
                  <h5 className="font-medium text-red-200 mb-2">Client B: Large House</h5>
                  <ul className="text-red-100 text-sm space-y-1">
                    <li>• 60 Wi-Fi smart devices</li>
                    <li>• Constant dropouts and lag</li>
                    <li>• Commands take 5-10 seconds</li>
                    <li>• Devices frequently go offline</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-900/10 border border-green-600/20 rounded">
                <h5 className="font-medium text-green-200 mb-2">The Solution</h5>
                <p className="text-green-100 text-sm">
                  Client B later added a Zigbee hub and migrated most devices. Performance stabilised immediately 
                  with instant response times and no more dropouts.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setCurrentStep(2)}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              Analyse the Problem →
            </Button>
          </div>
        )}

        {currentStep === 2 && !showAnalysis && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Step 1: Identify the Root Causes</h4>
            <p className="text-gray-300 text-sm">
              Why did Client B experience problems while Client A didn't? Select all that apply:
            </p>
            
            <div className="space-y-2">
              {causes.map((cause) => (
                <Button
                  key={cause.id}
                  variant="outline"
                  onClick={() => handleCauseToggle(cause.id)}
                  className={`w-full justify-start text-left p-4 h-auto border-gray-600 hover:bg-gray-700 ${
                    selectedCauses.includes(cause.id) 
                      ? 'bg-blue-900/20 border-blue-600 text-blue-100' 
                      : 'text-gray-300'
                  }`}
                >
                  <span className="mr-3">
                    {selectedCauses.includes(cause.id) ? '☑' : '☐'}
                  </span>
                  {cause.text}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={() => setCurrentStep(3)}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              disabled={selectedCauses.length === 0}
            >
              Next: Design Solutions →
            </Button>
          </div>
        )}

        {currentStep === 3 && !showAnalysis && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Step 2: Design the Solution</h4>
            <p className="text-gray-300 text-sm">
              How would you solve Client B's problems? Select all effective solutions:
            </p>
            
            <div className="space-y-2">
              {solutions.map((solution) => (
                <Button
                  key={solution.id}
                  variant="outline"
                  onClick={() => handleSolutionToggle(solution.id)}
                  className={`w-full justify-start text-left p-4 h-auto border-gray-600 hover:bg-gray-700 ${
                    selectedSolutions.includes(solution.id) 
                      ? 'bg-green-900/20 border-green-600 text-green-100' 
                      : 'text-gray-300'
                  }`}
                >
                  <span className="mr-3">
                    {selectedSolutions.includes(solution.id) ? '☑' : '☐'}
                  </span>
                  {solution.text}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={() => setShowAnalysis(true)}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              disabled={selectedSolutions.length === 0}
            >
              Show Analysis & Score
            </Button>
          </div>
        )}

        {showAnalysis && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Analysis & Score: {calculateScore()}%</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-purple-200 mb-2">Causes Analysis</h5>
                  {causes.map((cause) => (
                    <div key={cause.id} className="flex items-center gap-2 text-sm mb-1">
                      {selectedCauses.includes(cause.id) ? (
                        cause.correct ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )
                      ) : cause.correct ? (
                        <span className="h-4 w-4 text-yellow-400">⚠</span>
                      ) : (
                        <span className="h-4 w-4"></span>
                      )}
                      <span className={
                        selectedCauses.includes(cause.id) && cause.correct ? 'text-green-100' :
                        selectedCauses.includes(cause.id) && !cause.correct ? 'text-red-100' :
                        !selectedCauses.includes(cause.id) && cause.correct ? 'text-yellow-100' :
                        'text-gray-400'
                      }>
                        {cause.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-200 mb-2">Solutions Analysis</h5>
                  {solutions.map((solution) => (
                    <div key={solution.id} className="flex items-center gap-2 text-sm mb-1">
                      {selectedSolutions.includes(solution.id) ? (
                        solution.correct ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )
                      ) : solution.correct ? (
                        <span className="h-4 w-4 text-yellow-400">⚠</span>
                      ) : (
                        <span className="h-4 w-4"></span>
                      )}
                      <span className={
                        selectedSolutions.includes(solution.id) && solution.correct ? 'text-green-100' :
                        selectedSolutions.includes(solution.id) && !solution.correct ? 'text-red-100' :
                        !selectedSolutions.includes(solution.id) && solution.correct ? 'text-yellow-100' :
                        'text-gray-400'
                      }>
                        {solution.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-3 bg-elec-dark border border-gray-600 rounded">
                <h5 className="font-medium text-elec-yellow mb-2">Expert Analysis:</h5>
                <p className="text-gray-300 text-sm">
                  The hub made such a difference because it moved devices off the overloaded Wi-Fi network onto 
                  a dedicated Zigbee mesh. This eliminated network congestion, reduced cloud dependency for local 
                  automation, and provided more reliable device-to-device communication. The small apartment worked 
                  fine because 6 devices don't saturate a Wi-Fi network, but 60 devices definitely do.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={resetScenario}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};