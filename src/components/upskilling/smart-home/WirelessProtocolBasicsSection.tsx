import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, ChevronDown, ChevronUp, Settings, Network, Zap } from 'lucide-react';

export const WirelessProtocolBasicsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const protocolCharacteristics = [
    {
      aspect: "Rules and Standards",
      icon: Settings,
      description: "Define how devices format and exchange data",
      examples: "Message structure, addressing, error handling"
    },
    {
      aspect: "Interoperability",
      icon: Network,
      description: "Ensure compatibility between different manufacturers",
      examples: "Philips Hue bulbs working with Samsung SmartThings"
    },
    {
      aspect: "Performance Parameters",
      icon: Zap,
      description: "Determine system capabilities and limitations",
      examples: "Range, bandwidth, latency, power consumption"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Radio className="h-5 w-5 text-elec-yellow" />
            1. What is a Wireless Protocol?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            A wireless protocol is a set of rules and standards that define how smart devices communicate with each other wirelessly.
          </p>
          
          {/* Key Functions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Key Functions of Wireless Protocols</h4>
            <div className="grid grid-cols-1 gap-4">
              {protocolCharacteristics.map((characteristic, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex items-start gap-3">
                    <characteristic.icon className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground mb-2">{characteristic.aspect}</h5>
                      <p className="text-gray-300 text-sm mb-2">{characteristic.description}</p>
                      <div className="text-xs text-gray-400">
                        <span className="font-medium">Examples: </span>
                        {characteristic.examples}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Aspects */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">What Protocols Determine</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-indigo-200 mb-3">Communication Aspects</h5>
                <ul className="space-y-1 text-indigo-100">
                  <li>• Message formatting and structure</li>
                  <li>• Device addressing and identification</li>
                  <li>• Error detection and correction</li>
                  <li>• Security and encryption methods</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-200 mb-3">Performance Factors</h5>
                <ul className="space-y-1 text-purple-100">
                  <li>• Operating frequency and range</li>
                  <li>• Data transmission speed</li>
                  <li>• Power consumption requirements</li>
                  <li>• Network topology and routing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Real-World Analogy */}
          <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Real-World Analogy</h4>
            <p className="text-gray-300 text-sm">
              Think of wireless protocols like languages. Just as people need to speak the same language to communicate effectively, 
              smart devices need to use the same protocol to exchange information. Some "languages" (protocols) are better for 
              certain situations - just like you might use text messages for quick updates but video calls for detailed conversations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Radio className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Protocol Basics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What does a wireless protocol do in smart homes?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: Why is interoperability important in smart home systems?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: Name three performance factors that protocols determine.</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-gray-600">
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A1:</p>
                <p className="text-gray-300">Wireless protocols define the rules and standards for how smart devices communicate, ensuring they can exchange data reliably and work together effectively.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Interoperability allows devices from different manufacturers to work together, giving users more choice and preventing vendor lock-in.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Range, bandwidth, latency, power consumption, security level, and network topology are all determined by the protocol choice.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};