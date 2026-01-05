import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export const ModbusInlineCheck1 = () => {
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    setShowSolution(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-foreground font-medium mb-3">Inline Check</h4>
            <p className="text-foreground mb-4">
              Why is Modbus often described as simple compared to BACnet?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-simple" 
                  value="faster"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It runs faster than BACnet
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-simple" 
                  value="basic-data"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It uses basic data registers and simple addressing
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-simple" 
                  value="newer"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It's newer technology than BACnet
              </label>
            </div>

            <Button 
              onClick={handleSubmit}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 mb-4"
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>

            {showSolution && (
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === 'basic-data' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'basic-data' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'basic-data' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Modbus is considered simple because it uses basic data registers and simple addressing schemes, 
                      without the complex object-oriented data structures found in BACnet.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ModbusInlineCheck2 = () => {
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    setShowSolution(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-foreground font-medium mb-3">Inline Check</h4>
            <p className="text-foreground mb-4">
              How many devices can typically be supported on a single Modbus RTU segment?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-devices" 
                  value="16"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                16 devices
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-devices" 
                  value="32"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                32 devices
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-devices" 
                  value="127"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                127 devices
              </label>
            </div>

            <Button 
              onClick={handleSubmit}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 mb-4"
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>

            {showSolution && (
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === '32' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === '32' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === '32' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      A single Modbus RTU segment typically supports up to 32 devices (including the master). 
                      This can be extended with repeaters, but 32 is the standard practical limit.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ModbusInlineCheck3 = () => {
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    setShowSolution(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-foreground font-medium mb-3">Inline Check</h4>
            <p className="text-foreground mb-4">
              What is one advantage of Modbus TCP/IP over RTU?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-tcp-advantage" 
                  value="cheaper"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It's cheaper to install
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-tcp-advantage" 
                  value="faster-scalable"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Much faster communication and more scalable
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-tcp-advantage" 
                  value="simpler"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It's simpler to configure
              </label>
            </div>

            <Button 
              onClick={handleSubmit}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 mb-4"
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>

            {showSolution && (
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === 'faster-scalable' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'faster-scalable' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'faster-scalable' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Modbus TCP/IP is much faster (100 Mbps vs 115 kbps) and more scalable than RTU, 
                      supporting many more devices and simultaneous connections.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ModbusInlineCheck4 = () => {
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    setShowSolution(true);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-foreground font-medium mb-3">Inline Check</h4>
            <p className="text-foreground mb-4">
              Give one type of building equipment that commonly uses Modbus.
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-equipment" 
                  value="lighting"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                LED lighting controllers
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-equipment" 
                  value="meters"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Energy meters
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="modbus-equipment" 
                  value="fire"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Fire alarm panels
              </label>
            </div>

            <Button 
              onClick={handleSubmit}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 mb-4"
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>

            {showSolution && (
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === 'meters' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'meters' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'meters' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Energy meters are one of the most common applications for Modbus in buildings. 
                      Other common examples include boilers, chillers, and Variable Speed Drives (VSDs).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};