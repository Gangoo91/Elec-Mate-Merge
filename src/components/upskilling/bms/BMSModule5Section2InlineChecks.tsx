import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export const BACnetInlineCheck1 = () => {
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
              What type of BACnet device links two different network types together?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-device-link" 
                  value="controller"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Controller
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-device-link" 
                  value="router"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Router or Gateway
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-device-link" 
                  value="sensor"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Sensor
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
                selectedAnswer === 'router' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'router' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'router' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Routers and gateways link different BACnet networks together or connect BACnet to other 
                      protocols, enabling system integration across different network types.
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

export const BACnetInlineCheck2 = () => {
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
              Why does BACnet/IP require coordination with IT departments?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-ip-coordination" 
                  value="speed"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It runs faster than other protocols
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-ip-coordination" 
                  value="network-planning"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It uses IP networks requiring addressing and VLAN planning
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-ip-coordination" 
                  value="expensive"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                It is more expensive than other options
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
                selectedAnswer === 'network-planning' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'network-planning' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'network-planning' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      BACnet/IP uses standard Ethernet infrastructure and requires IP addressing, VLAN setup, 
                      and network segregation planning to avoid conflicts with corporate IT systems.
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

export const BACnetInlineCheck3 = () => {
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
              Which BACnet network type is best for connecting hundreds of devices across multiple buildings?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-multiple-buildings" 
                  value="mstp"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                BACnet MSTP (RS-485)
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-multiple-buildings" 
                  value="ip"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                BACnet/IP
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="bacnet-multiple-buildings" 
                  value="both"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Both work equally well
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
                selectedAnswer === 'ip' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'ip' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'ip' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      BACnet/IP is ideal for large-scale installations across multiple buildings because it's 
                      scalable, high-speed, and can leverage existing Ethernet infrastructure for long-distance communication.
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

export const BACnetInlineCheck4 = () => {
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
              Why should RS-485 networks be wired as daisy chains rather than stars?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="rs485-topology" 
                  value="cheaper"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Star wiring is more expensive
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="rs485-topology" 
                  value="reflections"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Star wiring causes signal reflections and communication errors
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="rs485-topology" 
                  value="faster"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Daisy chains work faster
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
                selectedAnswer === 'reflections' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'reflections' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'reflections' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Star wiring creates multiple unterminated branches which cause signal reflections, leading to 
                      communication errors and network instability. Daisy-chain topology maintains proper impedance matching.
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