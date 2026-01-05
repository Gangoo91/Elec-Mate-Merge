import { useState } from 'react';
import { CheckCircle, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const BandwidthQuickCheck = () => {
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const devices = [
    { name: 'Door sensors', correct: 'low', category: 'Low' },
    { name: 'Security cameras', correct: 'high', category: 'High' },
    { name: 'Smart switches', correct: 'low', category: 'Low' },
    { name: 'Video doorbells', correct: 'high', category: 'High' },
    { name: 'Temperature sensors', correct: 'low', category: 'Low' },
    { name: 'Smart speakers', correct: 'high', category: 'High' }
  ];

  const handleDrop = (device: string, category: string) => {
    setAnswers(prev => ({ ...prev, [device]: category }));
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowFeedback(false);
  };

  const getScore = () => {
    const correct = devices.filter(device => answers[device.name] === device.correct).length;
    return `${correct}/${devices.length}`;
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check: Bandwidth Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-foreground">
        <p className="text-foreground font-medium">Drag each device to its correct bandwidth category:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-blue-400 font-medium">Available Devices</h4>
            <div className="space-y-2">
              {devices.map((device) => (
                <div
                  key={device.name}
                  className={`p-2 rounded border border-gray-600 bg-elec-dark text-foreground cursor-move text-sm ${
                    answers[device.name] ? 'opacity-50' : ''
                  }`}
                  draggable={!showFeedback && !answers[device.name]}
                  onDragStart={(e) => e.dataTransfer.setData('device', device.name)}
                >
                  {device.name}
                  {showFeedback && (
                    <span className="ml-2">
                      {answers[device.name] === device.correct ? 
                        <Check className="inline h-3 w-3 text-green-400" /> : 
                        <X className="inline h-3 w-3 text-red-400" />
                      }
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div
              className="bg-green-600/10 border border-green-600/20 rounded-lg p-3 min-h-[120px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const device = e.dataTransfer.getData('device');
                handleDrop(device, 'low');
              }}
            >
              <h4 className="text-green-400 font-medium mb-2">Low Bandwidth</h4>
              <div className="space-y-1">
                {Object.entries(answers)
                  .filter(([_, category]) => category === 'low')
                  .map(([device]) => (
                    <div key={device} className="text-sm text-foreground bg-elec-dark p-1 rounded">
                      {device}
                    </div>
                  ))}
              </div>
            </div>

            <div
              className="bg-red-600/10 border border-red-600/20 rounded-lg p-3 min-h-[120px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const device = e.dataTransfer.getData('device');
                handleDrop(device, 'high');
              }}
            >
              <h4 className="text-red-400 font-medium mb-2">High Bandwidth</h4>
              <div className="space-y-1">
                {Object.entries(answers)
                  .filter(([_, category]) => category === 'high')
                  .map(([device]) => (
                    <div key={device} className="text-sm text-foreground bg-elec-dark p-1 rounded">
                      {device}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {!showFeedback && Object.keys(answers).length === devices.length && (
          <Button 
            onClick={handleSubmit}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Check Answers
          </Button>
        )}

        {showFeedback && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-blue-600/20 bg-blue-600/10">
              <p className="text-blue-400 font-medium">Score: {getScore()}</p>
              <p className="text-sm text-foreground mt-1">
                Low bandwidth: Sensors and switches send small data packets infrequently. 
                High bandwidth: Cameras and speakers stream continuous audio/video data.
              </p>
            </div>
            <Button 
              onClick={handleReset}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-[#323232]"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};