import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export const ProtocolInlineCheck1 = () => {
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
              Why are communication protocols compared to languages?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="protocol-language" 
                  value="speed"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                They both work very quickly
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="protocol-language" 
                  value="communication"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                They enable different devices to understand and communicate with each other
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="protocol-language" 
                  value="complex"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                They are both very complex to learn
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
                selectedAnswer === 'communication' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'communication' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'communication' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Communication protocols are compared to languages because they provide a structured way 
                      for different devices to understand and exchange information with each other, just like 
                      languages allow people to communicate.
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

export const ProtocolInlineCheck2 = () => {
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
              What is one disadvantage of proprietary communication protocols?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="proprietary-disadvantage" 
                  value="faster"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                They work faster than open protocols
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="proprietary-disadvantage" 
                  value="vendor-lock"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                They can lock clients into using a single vendor
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="proprietary-disadvantage" 
                  value="easier"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                They are easier to configure than open protocols
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
                selectedAnswer === 'vendor-lock' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'vendor-lock' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'vendor-lock' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Proprietary protocols can lock clients into using a single vendor, making it difficult 
                      and expensive to integrate equipment from other manufacturers or upgrade systems.
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

export const ProtocolInlineCheck3 = () => {
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
              Which protocol is commonly used for integrating meters and chillers?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="protocol-meters" 
                  value="bacnet"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                BACnet
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="protocol-meters" 
                  value="modbus"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Modbus
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="protocol-meters" 
                  value="knx"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                KNX
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
                selectedAnswer === 'modbus' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === 'modbus' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {selectedAnswer === 'modbus' ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-foreground text-sm">
                      Modbus is commonly used for integrating energy meters, boilers, and chillers because 
                      it's simple, robust, and widely supported by industrial equipment manufacturers.
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

export const ProtocolInlineCheck4 = () => {
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
              What happens if RS-485 bus cables are not terminated correctly?
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="rs485-termination" 
                  value="faster"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                The network runs faster
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="rs485-termination" 
                  value="reflections"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Signal reflections cause communication errors
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input 
                  type="radio" 
                  name="rs485-termination" 
                  value="nothing"
                  className="text-elec-yellow focus:ring-elec-yellow"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                Nothing happens, termination is optional
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
                      Without proper termination resistors at both ends, signal reflections occur which 
                      cause communication errors, data corruption, and network instability.
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