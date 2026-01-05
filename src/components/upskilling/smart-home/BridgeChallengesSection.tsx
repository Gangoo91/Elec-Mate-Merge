import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, Zap, Settings, Wifi } from 'lucide-react';

export const BridgeChallengesSection = () => {
  const challenges = [
    {
      title: 'Added Complexity',
      icon: Settings,
      description: 'Extra device in the network requiring configuration and maintenance',
      impact: 'More potential failure points and troubleshooting complexity',
      color: 'red'
    },
    {
      title: 'Communication Latency',
      icon: Clock,
      description: 'Additional step in communication path increases response time',
      impact: 'Delayed device responses, especially for time-sensitive automation',
      color: 'amber'
    },
    {
      title: 'Single Point of Failure',
      icon: Zap,
      description: 'If bridge fails, connected devices become unresponsive',
      impact: 'Complete system outage for bridged devices until repair/replacement',
      color: 'orange'
    },
    {
      title: 'Technical Knowledge Required',
      icon: Settings,
      description: 'Setup often requires advanced networking and protocol understanding',
      impact: 'Higher skill requirements for installers and end users',
      color: 'blue'
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Challenges with Bridges
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <div key={index} className={`bg-${challenge.color}-900/10 border border-${challenge.color}-600/20 rounded-lg p-4`}>
              <div className="flex items-start gap-3">
                <challenge.icon className={`h-5 w-5 text-${challenge.color}-400 mt-0.5 flex-shrink-0`} />
                <div className="flex-1">
                  <h4 className={`text-${challenge.color}-200 font-semibold mb-2`}>{challenge.title}</h4>
                  <p className={`text-${challenge.color}-100 text-sm mb-2`}>{challenge.description}</p>
                  <div className={`text-xs text-${challenge.color}-200 bg-${challenge.color}-900/20 rounded p-2`}>
                    <strong>Impact:</strong> {challenge.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            Latency Example
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-green-900/20 rounded">
              <span className="text-green-200">Direct Wi-Fi Device</span>
              <span className="text-green-400">~100ms response</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-amber-900/20 rounded">
              <span className="text-amber-200">Bridged Zigbee Device</span>
              <span className="text-amber-400">~300ms response</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Additional protocol translation and network hops increase response time
          </p>
        </div>

        <div className="bg-red-900/10 border border-red-600/20 rounded-lg p-4">
          <h4 className="text-red-200 font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Failure Scenario
          </h4>
          <div className="text-red-100 text-sm space-y-2">
            <p><strong>Scenario:</strong> Philips Hue Bridge loses power or network connection</p>
            <p><strong>Result:</strong> All Zigbee bulbs become uncontrollable via app or voice commands</p>
            <p><strong>Workaround:</strong> Physical switches still work, but automation stops</p>
          </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-3">Mitigation Strategies</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Redundant network paths</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Regular firmware updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">UPS backup power</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Local fallback controls</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};