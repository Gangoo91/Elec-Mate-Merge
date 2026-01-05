import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export const PEIProtectionSection = () => {
  return (
    <Card className="bg-gradient-to-r from-red-900/20 to-elec-gray border-red-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Protection & Disconnection Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-red-600 text-foreground">Critical Safety</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Anti-Islanding Protection (G98/G99 Compliance):</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Primary Detection Methods:</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>Voltage vector shift:</strong> 2.5° threshold detection</li>
                <li>• <strong>Rate of change of frequency (ROCOF):</strong> 1Hz/s limit</li>
                <li>• <strong>Under/over voltage:</strong> 207V-253V (1φ), 358V-437V (3φ)</li>
                <li>• <strong>Under/over frequency:</strong> 47.5Hz - 51.5Hz operational range</li>
                <li>• <strong>Loss of mains (LOM):</strong> Impedance measurement techniques</li>
                <li>• <strong>Voltage unbalance:</strong> Maximum 3% deviation allowed</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Response & Recovery Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>Disconnection time:</strong> Maximum 0.5 seconds</li>
                <li>• <strong>Reconnection delay:</strong> 20 seconds minimum post-restoration</li>
                <li>• <strong>Automatic reconnection:</strong> After stable grid conditions</li>
                <li>• <strong>Manual reset:</strong> Required for certain fault conditions</li>
                <li>• <strong>Event logging:</strong> Fault recording and timestamping</li>
                <li>• <strong>Remote monitoring:</strong> Real-time status communication</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Bi-directional Protection Systems:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-red-400 font-medium mb-2">Generation Protection:</h6>
              <ul className="text-sm space-y-1">
                <li>• DC overcurrent protection for solar arrays</li>
                <li>• AC overcurrent protection at inverter output</li>
                <li>• Earth fault detection on DC and AC sides</li>
                <li>• Arc fault circuit interrupters (AFCI) where required</li>
                <li>• Surge protection devices (SPD) Type 1 &amp; 2</li>
                <li>• Isolation switches for maintenance safety</li>
              </ul>
            </div>
            <div>
              <h6 className="text-orange-400 font-medium mb-2">Storage System Protection:</h6>
              <ul className="text-sm space-y-1">
                <li>• Battery management system (BMS) monitoring</li>
                <li>• Thermal runaway detection and mitigation</li>
                <li>• Overcurrent protection for charging/discharging</li>
                <li>• DC contactor isolation capabilities</li>
                <li>• Fire suppression system integration</li>
                <li>• Emergency shutdown procedures</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Grid Protection & Power Quality:</h5>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-blue-400 font-medium mb-2">Voltage Regulation:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Automatic voltage regulation (AVR) capability</li>
                  <li>• Reactive power control: ±0.95 power factor</li>
                  <li>• Volt-VAR optimization for network support</li>
                  <li>• Voltage ride-through capabilities</li>
                  <li>• Flicker emission compliance: IEC 61000-3-3</li>
                </ul>
              </div>
              <div>
                <h6 className="text-green-400 font-medium mb-2">Frequency Support:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Frequency response services participation</li>
                  <li>• Enhanced Frequency Response (EFR) capability</li>
                  <li>• Frequency ride-through: 47.5Hz - 51.5Hz</li>
                  <li>• Rate of change limitation for grid stability</li>
                  <li>• Synthetic inertia provision where applicable</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border border-gray-600">
              <h6 className="text-cyan-400 font-medium mb-2">Power Quality Standards:</h6>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Harmonic Distortion</p>
                  <p className="text-sm">THD &lt; 5% at rated output</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">DC Injection</p>
                  <p className="text-sm">&lt; 0.5% of rated AC current</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Voltage Unbalance</p>
                  <p className="text-sm">&lt; 3% maximum deviation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Cybersecurity & Data Protection:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-purple-400 font-medium mb-2">Communication Security:</h6>
              <ul className="text-sm space-y-1">
                <li>• End-to-end encryption for all data transmission</li>
                <li>• Secure authentication protocols (OAuth 2.0)</li>
                <li>• Regular security updates and patch management</li>
                <li>• Network segmentation and firewall protection</li>
                <li>• Intrusion detection and monitoring systems</li>
                <li>• Backup and recovery procedures</li>
              </ul>
            </div>
            <div>
              <h6 className="text-pink-400 font-medium mb-2">Data Privacy Compliance:</h6>
              <ul className="text-sm space-y-1">
                <li>• GDPR compliance for personal energy data</li>
                <li>• Data minimisation and purpose limitation</li>
                <li>• Consent management for data sharing</li>
                <li>• Right to erasure and data portability</li>
                <li>• Regular privacy impact assessments</li>
                <li>• Transparent data usage policies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Emergency Procedures & Safety Protocols:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-red-400 font-medium mb-2">Emergency Shutdown Sequence:</h6>
              <ol className="text-sm space-y-1">
                <li>1. <strong>Immediate isolation:</strong> DC and AC disconnectors operated</li>
                <li>2. <strong>Battery isolation:</strong> BMS emergency shutdown activated</li>
                <li>3. <strong>Grid disconnection:</strong> Generation meter isolation</li>
                <li>4. <strong>Load shedding:</strong> Non-critical loads automatically disconnected</li>
                <li>5. <strong>System safe state:</strong> All energy sources isolated and secured</li>
                <li>6. <strong>Emergency services:</strong> Notification protocols activated</li>
              </ol>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">Maintenance Safety Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Lock-out/tag-out procedures for all energy sources</li>
                <li>• Permit to work system for high-voltage equipment</li>
                <li>• Personal protective equipment (PPE) requirements</li>
                <li>• Competency requirements for maintenance personnel</li>
                <li>• Regular safety training and assessment programmes</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};