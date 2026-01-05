import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Cable, CheckCircle, AlertTriangle, Search } from 'lucide-react';

export const BMSModule5Section3Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        {/* Installation Guidelines */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <Cable className="h-5 w-5 text-elec-yellow" />
              Installing Modbus RTU (RS-485)
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Use shielded twisted pair, 120Ω impedance cable</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Daisy-chain devices — never star-wire RS-485</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Fit termination resistors at both ends</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Assign unique device addresses (check for duplicates)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Don't exceed 1200m cable length per segment</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <Cable className="h-5 w-5 text-elec-yellow" />
              Installing Modbus TCP/IP
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Use Cat5e or higher Ethernet cable</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Work with IT teams to assign static IP addresses</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Keep BMS traffic separate from corporate networks</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Ensure adequate switch capacity</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Label network connections clearly as "BMS"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Common Installation Mistakes
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Star wiring instead of daisy-chain (RTU)</p>
              <p className="text-foreground">• Missing or incorrect termination resistors</p>
              <p className="text-foreground">• Duplicate device addresses</p>
              <p className="text-foreground">• Wrong cable type or impedance</p>
              <p className="text-foreground">• Exceeding segment length limits</p>
              <p className="text-foreground">• Poor shield grounding causing interference</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <Search className="h-5 w-5 text-elec-yellow" />
              Quick Troubleshooting Guide
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-foreground font-medium text-red-300">No devices respond:</p>
                <p className="text-foreground pl-2">Check polarity on RS-485 lines</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-red-300">Multiple device failures:</p>
                <p className="text-foreground pl-2">Look for duplicate addresses</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-red-300">Intermittent communication:</p>
                <p className="text-foreground pl-2">Check termination and grounding</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-red-300">TCP/IP issues:</p>
                <p className="text-foreground pl-2">Use ping tests to verify connectivity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation and Testing */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4 text-lg">Documentation Best Practices</h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Record device addresses and locations</p>
              <p className="text-foreground">• Document cable routes and connections</p>
              <p className="text-foreground">• Note baud rates and communication settings</p>
              <p className="text-foreground">• Provide network topology diagrams</p>
              <p className="text-foreground">• Label physical connections clearly</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4 text-lg">Testing & Commissioning</h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Test each device individually before connecting all</p>
              <p className="text-foreground">• Use Modbus master tools for initial testing</p>
              <p className="text-foreground">• Verify register maps match device documentation</p>
              <p className="text-foreground">• Check data scaling and units are correct</p>
              <p className="text-foreground">• Test communication under full system load</p>
              <p className="text-foreground">• Monitor error rates during commissioning period</p>
            </div>
          </div>
        </div>

        {/* Advanced Diagnostic Techniques */}
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-6">
          <h4 className="text-foreground font-semibold mb-6 text-lg">Advanced Diagnostic Techniques</h4>
          <div className="grid lg:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-medium mb-3 text-cyan-300">RTU Signal Analysis:</p>
                <div className="space-y-2 pl-4 border-l-2 border-cyan-500/30">
                  <p className="text-foreground">• Use oscilloscope to verify signal levels (±1.5V to ±6V)</p>
                  <p className="text-foreground">• Check for reflections at start/end of transmission</p>
                  <p className="text-foreground">• Measure bias voltages (A line: +1.5V, B line: -1.5V idle)</p>
                  <p className="text-foreground">• Verify proper rise/fall times for baud rate</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-medium mb-3 text-blue-300">TCP/IP Performance Analysis:</p>
                <div className="space-y-2 pl-4 border-l-2 border-blue-500/30">
                  <p className="text-foreground">• Use Wireshark to capture Modbus TCP frames</p>
                  <p className="text-foreground">• Monitor response times and timeout errors</p>
                  <p className="text-foreground">• Check for TCP retransmissions and packet loss</p>
                  <p className="text-foreground">• Analyse network utilisation during peak times</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};