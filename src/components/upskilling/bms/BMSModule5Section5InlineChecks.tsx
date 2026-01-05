import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export const GatewayInlineCheck1 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Why are gateways often compared to translators?";
  const options = [
    { id: 'a', text: "Because they both work with different languages", correct: true },
    { id: 'b', text: "Because they both need electricity to function", correct: false },
    { id: 'c', text: "Because they both are expensive devices", correct: false },
    { id: 'd', text: "Because they both require special training", correct: false }
  ];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-blue-900/20 border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5" />
          Interactive Check: Gateway Function
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option.correct
                    ? 'bg-green-900/50 border-green-600 text-green-100'
                    : selectedAnswer === option.id
                    ? 'bg-red-900/50 border-red-600 text-red-100'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300'
                  : 'bg-blue-900/30 border-blue-600/50 text-foreground hover:bg-blue-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.id.toUpperCase()}. {option.text}</span>
                {showResult && (
                  option.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : selectedAnswer === option.id ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${selectedAnswer === 'a' ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'}`}>
              <p className="text-foreground font-medium">
                {selectedAnswer === 'a' ? '✅ Correct!' : '❌ Not quite right.'}
              </p>
              <p className="text-foreground text-sm mt-2">
                Gateways are compared to translators because they convert data between different communication protocols - 
                just like translators convert between different human languages. Both enable communication between parties 
                that would otherwise not understand each other.
              </p>
            </div>
            <Button 
              onClick={resetQuestion}
              variant="outline"
              size="sm"
              className="bg-blue-900/20 border-blue-600 text-blue-300 hover:bg-blue-800/30"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const GatewayInlineCheck2 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Give one example of when a Modbus-to-BACnet gateway would be used.";
  const options = [
    { id: 'a', text: "When connecting Wi-Fi devices to Ethernet networks", correct: false },
    { id: 'b', text: "When connecting energy meters (Modbus) to a BMS (BACnet)", correct: true },
    { id: 'c', text: "When connecting lighting switches to power supplies", correct: false },
    { id: 'd', text: "When connecting fire alarms to security systems", correct: false }
  ];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-blue-900/20 border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5" />
          Interactive Check: Gateway Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option.correct
                    ? 'bg-green-900/50 border-green-600 text-green-100'
                    : selectedAnswer === option.id
                    ? 'bg-red-900/50 border-red-600 text-red-100'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300'
                  : 'bg-blue-900/30 border-blue-600/50 text-foreground hover:bg-blue-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.id.toUpperCase()}. {option.text}</span>
                {showResult && (
                  option.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : selectedAnswer === option.id ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${selectedAnswer === 'b' ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'}`}>
              <p className="text-foreground font-medium">
                {selectedAnswer === 'b' ? '✅ Correct!' : '❌ Not quite right.'}
              </p>
              <p className="text-foreground text-sm mt-2">
                Energy meters typically communicate via Modbus protocol, while Building Management Systems often use BACnet. 
                A Modbus-to-BACnet gateway allows the BMS to read energy consumption data from Modbus meters, 
                enabling centralized monitoring and energy management.
              </p>
            </div>
            <Button 
              onClick={resetQuestion}
              variant="outline"
              size="sm"
              className="bg-blue-900/20 border-blue-600 text-blue-300 hover:bg-blue-800/30"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const GatewayInlineCheck3 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Why do gateways make buildings more future-proof?";
  const options = [
    { id: 'a', text: "They eliminate the need for maintenance", correct: false },
    { id: 'b', text: "They allow mixing different vendors and protocols", correct: true },
    { id: 'c', text: "They reduce electricity consumption", correct: false },
    { id: 'd', text: "They automatically update firmware", correct: false }
  ];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-blue-900/20 border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5" />
          Interactive Check: Future-Proofing Benefits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option.correct
                    ? 'bg-green-900/50 border-green-600 text-green-100'
                    : selectedAnswer === option.id
                    ? 'bg-red-900/50 border-red-600 text-red-100'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300'
                  : 'bg-blue-900/30 border-blue-600/50 text-foreground hover:bg-blue-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.id.toUpperCase()}. {option.text}</span>
                {showResult && (
                  option.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : selectedAnswer === option.id ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${selectedAnswer === 'b' ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'}`}>
              <p className="text-foreground font-medium">
                {selectedAnswer === 'b' ? '✅ Correct!' : '❌ Not quite right.'}
              </p>
              <p className="text-foreground text-sm mt-2">
                Gateways enable future-proofing by allowing buildings to integrate new devices and systems from different vendors 
                without replacing existing infrastructure. This flexibility means you can upgrade parts of the system gradually 
                and choose the best products for each application, regardless of their communication protocol.
              </p>
            </div>
            <Button 
              onClick={resetQuestion}
              variant="outline"
              size="sm"
              className="bg-blue-900/20 border-blue-600 text-blue-300 hover:bg-blue-800/30"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};