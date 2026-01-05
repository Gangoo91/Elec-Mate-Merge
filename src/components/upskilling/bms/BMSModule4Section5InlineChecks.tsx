import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle, Calculator, Lightbulb, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export const EnergyInlineCheck1 = () => {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const correctAnswer = 42; // Example: 42% energy savings

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Calculator className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-2">Interactive Check: Energy Savings Calculation</h4>
            <p className="text-foreground mb-3">
              A 2,000m² office space has 400W/m² of lighting load and operates 10 hours daily. The HVAC system requires 150W/m² for cooling during occupied periods. Independent control leaves lights on for 2 additional hours daily when spaces are unoccupied.
            </p>
            <div className="bg-gray-800/60 rounded-lg p-3 mb-3">
              <p className="text-foreground text-sm mb-3">
                <strong>Calculate:</strong> Annual energy savings from coordinated occupancy control that switches off both lighting and HVAC simultaneously when spaces are unoccupied. Include the compound effect where reduced lighting heat gains further decrease HVAC cooling requirements by 20%.
              </p>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Enter percentage"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-32 bg-gray-700 border-gray-600 text-foreground"
                />
                <span className="text-foreground">%</span>
                <Button 
                  onClick={handleSubmit}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  Check Answer
                </Button>
              </div>
            </div>
            {showResult && (
              <div className="bg-gray-800/60 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground text-sm">
                    <strong>Solution:</strong> The coordinated system saves approximately 42% of total building energy through direct savings (lighting + HVAC) plus the compound effect of reduced cooling loads.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const EnergyInlineCheck2 = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [showResult, setShowResult] = useState(false);

  const strategies = [
    'Single central sensor',
    'Multiple zone sensors with time delays',
    'East/west orientation sensors with thermal lag compensation',
    'Occupancy-based override system'
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-2">Interactive Check: Daylight Integration Strategy</h4>
            <p className="text-foreground mb-3">
              You're installing a daylight harvesting system in an open-plan office with east and west-facing windows. The lighting system can dim to 20% minimum level, and the HVAC system can reduce cooling capacity when lighting loads decrease.
            </p>
            <div className="bg-gray-800/60 rounded-lg p-3 mb-3">
              <p className="text-foreground text-sm mb-3">
                <strong>Design Challenge:</strong> Select the best sensor placement strategy for coordinating lighting dimming with HVAC cooling load calculations throughout the day:
              </p>
              <div className="space-y-2">
                {strategies.map((strategy, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="strategy"
                      value={strategy}
                      checked={selectedStrategy === strategy}
                      onChange={(e) => setSelectedStrategy(e.target.value)}
                      className="text-elec-yellow focus:ring-elec-yellow"
                    />
                    <span className="text-foreground text-sm">{strategy}</span>
                  </label>
                ))}
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={!selectedStrategy}
                className="mt-3 bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
              >
                Submit Answer
              </Button>
            </div>
            {showResult && (
              <div className="bg-gray-800/60 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground text-sm">
                    <strong>Best Practice:</strong> East/west orientation sensors with thermal lag compensation provide optimal coordination. This accounts for morning east-side daylight, afternoon west-side heat gain, and building thermal response delays.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const EnergyInlineCheck3 = () => {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const issues = [
    'Inadequate ventilation control during lighting dim periods',
    'Power supply voltage fluctuations affecting LED drivers',
    'Conflicting sensor signals between lighting and HVAC systems',
    'Missing manual override for presentation mode',
    'Improper circuit labelling causing troubleshooting delays'
  ];

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-2">Interactive Check: System Integration Troubleshooting</h4>
            <p className="text-foreground mb-3">
              After commissioning an integrated lighting and HVAC system, occupants complain that meeting rooms become stuffy when lights dim during presentations, and the lights occasionally flicker during HVAC startup.
            </p>
            <div className="bg-gray-800/60 rounded-lg p-3 mb-3">
              <p className="text-foreground text-sm mb-3">
                <strong>Troubleshooting Scenario:</strong> Select all likely causes of these integration problems:
              </p>
              <div className="space-y-2">
                {issues.map((issue, index) => (
                  <label key={index} className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIssues.includes(issue)}
                      onChange={() => handleIssueToggle(issue)}
                      className="mt-0.5 text-elec-yellow focus:ring-elec-yellow"
                    />
                    <span className="text-foreground text-sm">{issue}</span>
                  </label>
                ))}
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={selectedIssues.length === 0}
                className="mt-3 bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
              >
                Check Solutions
              </Button>
            </div>
            {showResult && (
              <div className="bg-gray-800/60 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground text-sm">
                    <strong>Solutions:</strong> All issues are contributing factors. Key fixes include: separate ventilation controls for presentation mode, dedicated power supplies for LED drivers, coordinated sensor logic with priority settings, manual override switches, and comprehensive circuit documentation for faster diagnosis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};