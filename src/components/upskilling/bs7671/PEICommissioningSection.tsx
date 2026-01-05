import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck } from 'lucide-react';

export const PEICommissioningSection = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-900/20 to-elec-gray border-indigo-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Testing & Commissioning Procedures for PEI Systems
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-indigo-600 text-foreground">Commissioning</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Pre-Commissioning Safety Checks:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-red-400 font-medium mb-2">Electrical Safety Verification:</h6>
              <ul className="text-sm space-y-1">
                <li>• Visual inspection of all connections and terminations</li>
                <li>• Verification of protective conductor continuity</li>
                <li>• Insulation resistance testing (&gt;1MΩ at 500V DC)</li>
                <li>• Earth fault loop impedance measurement</li>
                <li>• RCD operation testing (≤300ms at 1×IΔn)</li>
                <li>• Polarity verification for all circuits</li>
              </ul>
            </div>
            <div>
              <h6 className="text-orange-400 font-medium mb-2">Mechanical & Environmental:</h6>
              <ul className="text-sm space-y-1">
                <li>• Cable installation and support verification</li>
                <li>• Equipment mounting and vibration assessment</li>
                <li>• Ventilation and thermal management check</li>
                <li>• Weather protection and ingress rating verification</li>
                <li>• Fire barrier integrity assessment</li>
                <li>• Emergency access and egress routes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Generation System Testing:</h5>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-blue-400 font-medium mb-2">Solar PV Testing:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Open circuit voltage (Voc) measurement per string</li>
                  <li>• Short circuit current (Isc) testing</li>
                  <li>• Maximum power point (MPP) verification</li>
                  <li>• Insulation resistance: live to earth &gt;1MΩ</li>
                  <li>• String current balance ±5% deviation</li>
                  <li>• Inverter MPPT tracking efficiency &gt;99%</li>
                </ul>
              </div>
              <div>
                <h6 className="text-green-400 font-medium mb-2">Wind Generation Testing:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Cut-in wind speed verification (typically 3-4 m/s)</li>
                  <li>• Power curve validation against manufacturer data</li>
                  <li>• Vibration analysis during operation</li>
                  <li>• Brake system functionality testing</li>
                  <li>• Grid synchronisation sequence verification</li>
                  <li>• Noise emission compliance testing</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-cyan-400 font-medium mb-2">Inverter Performance Testing:</h6>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Efficiency Testing</p>
                  <p className="text-sm">&gt;96% at rated power</p>
                  <p className="text-xs">CEC weighted efficiency</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">THD Measurement</p>
                  <p className="text-sm">&lt;5% at full load</p>
                  <p className="text-xs">Current harmonics to IEEE 519</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Power Factor</p>
                  <p className="text-sm">0.95 lagging to 0.95 leading</p>
                  <p className="text-xs">Adjustable reactive power</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Energy Storage System (ESS) Testing:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-purple-400 font-medium mb-2">Battery Performance Tests:</h6>
              <ul className="text-sm space-y-1">
                <li>• Capacity verification test (C/3 discharge rate)</li>
                <li>• Round-trip efficiency measurement (&gt;90%)</li>
                <li>• Charge/discharge rate capability testing</li>
                <li>• Cell voltage balance verification (±50mV)</li>
                <li>• Temperature rise testing under load</li>
                <li>• Standby current measurement (&lt;1% SoC/month)</li>
              </ul>
            </div>
            <div>
              <h6 className="text-pink-400 font-medium mb-2">Battery Management System (BMS):</h6>
              <ul className="text-sm space-y-1">
                <li>• Over/under voltage protection testing</li>
                <li>• Over-current protection verification</li>
                <li>• Temperature monitoring and alarm testing</li>
                <li>• State of Charge (SoC) calibration</li>
                <li>• Emergency shutdown sequence testing</li>
                <li>• Communication protocol verification</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Protection System Testing:</h5>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-rose-400 font-medium mb-2">Anti-Islanding Testing:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Voltage vector shift test (2.5° threshold)</li>
                  <li>• Rate of change of frequency (ROCOF) 1Hz/s</li>
                  <li>• Under/over voltage trip testing</li>
                  <li>• Under/over frequency trip testing</li>
                  <li>• Loss of mains detection verification</li>
                  <li>• Reconnection delay timing (20s minimum)</li>
                </ul>
              </div>
              <div>
                <h6 className="text-amber-400 font-medium mb-2">Grid Protection Coordination:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Overcurrent protection discrimination</li>
                  <li>• Earth fault protection coordination</li>
                  <li>• Arc fault detection sensitivity testing</li>
                  <li>• Surge protection device verification</li>
                  <li>• Isolation switch operation testing</li>
                  <li>• Emergency stop system functionality</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">Protection Testing Schedule:</h6>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-1 text-yellow-400">Protection Function</th>
                      <th className="text-left py-1 text-yellow-400">Test Method</th>
                      <th className="text-left py-1 text-yellow-400">Acceptance Criteria</th>
                      <th className="text-left py-1 text-yellow-400">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-1">Overvoltage</td>
                      <td className="py-1">Secondary injection</td>
                      <td className="py-1">Trip at 1.1 × Vn ± 1%</td>
                      <td className="py-1">Annual</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-1">Undervoltage</td>
                      <td className="py-1">Secondary injection</td>
                      <td className="py-1">Trip at 0.88 × Vn ± 1%</td>
                      <td className="py-1">Annual</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-1">Overfrequency</td>
                      <td className="py-1">Frequency injection</td>
                      <td className="py-1">Trip at 50.5Hz ± 0.05Hz</td>
                      <td className="py-1">Annual</td>
                    </tr>
                    <tr>
                      <td className="py-1">Underfrequency</td>
                      <td className="py-1">Frequency injection</td>
                      <td className="py-1">Trip at 47.5Hz ± 0.05Hz</td>
                      <td className="py-1">Annual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Energy Management System (EMS) Commissioning:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-teal-400 font-medium mb-2">Control System Testing:</h6>
              <ul className="text-sm space-y-1">
                <li>• Load prioritisation logic verification</li>
                <li>• Demand response signal testing</li>
                <li>• Energy forecasting algorithm validation</li>
                <li>• Optimisation routine performance testing</li>
                <li>• User interface functionality testing</li>
                <li>• Remote monitoring system verification</li>
              </ul>
            </div>
            <div>
              <h6 className="text-emerald-400 font-medium mb-2">Communication Testing:</h6>
              <ul className="text-sm space-y-1">
                <li>• Modbus communication protocol testing</li>
                <li>• Internet connectivity and security testing</li>
                <li>• Data logging and historical trending</li>
                <li>• Alarm notification system testing</li>
                <li>• Firmware update procedures</li>
                <li>• Cybersecurity penetration testing</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Performance Verification & Acceptance Testing:</h5>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-lime-400 font-medium mb-2">System Performance Metrics:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Overall system efficiency verification (&gt;85%)</li>
                  <li>• Self-consumption ratio measurement (&gt;70%)</li>
                  <li>• Export capacity utilisation (&gt;90%)</li>
                  <li>• Demand charge reduction verification</li>
                  <li>• Carbon footprint reduction calculation</li>
                  <li>• Economic performance against projections</li>
                </ul>
              </div>
              <div>
                <h6 className="text-sky-400 font-medium mb-2">Acceptance Criteria:</h6>
                <ul className="text-sm space-y-1">
                  <li>• All safety systems operational and tested</li>
                  <li>• Performance within ±5% of design specifications</li>
                  <li>• All monitoring and control systems functional</li>
                  <li>• Documentation complete and handed over</li>
                  <li>• Training provided to operational staff</li>
                  <li>• Warranty and maintenance agreements in place</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">Commissioning Documentation Requirements:</h6>
              <div className="grid md:grid-cols-2 gap-3">
                <ul className="text-sm space-y-1">
                  <li>• As-built electrical drawings and schematics</li>
                  <li>• Test certificates and measurement records</li>
                  <li>• Equipment data sheets and warranties</li>
                  <li>• Operating and maintenance manuals</li>
                </ul>
                <ul className="text-sm space-y-1">
                  <li>• Performance guarantee certificates</li>
                  <li>• Grid connection approval documentation</li>
                  <li>• Insurance and liability certificates</li>
                  <li>• Training records and competency certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Handover & Ongoing Monitoring:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-violet-400 font-medium mb-2">Handover Process:</h6>
              <ul className="text-sm space-y-1">
                <li>• System demonstration and training session</li>
                <li>• Operating procedures and emergency protocols</li>
                <li>• Performance monitoring dashboard setup</li>
                <li>• Maintenance schedule and requirements</li>
                <li>• Contact information for technical support</li>
                <li>• Warranty claim procedures and timelines</li>
              </ul>
            </div>
            <div>
              <h6 className="text-fuchsia-400 font-medium mb-2">Ongoing Performance Monitoring:</h6>
              <ul className="text-sm space-y-1">
                <li>• Monthly performance reports and analysis</li>
                <li>• Annual system health checks and testing</li>
                <li>• Predictive maintenance scheduling</li>
                <li>• Performance degradation trending</li>
                <li>• Optimisation opportunities identification</li>
                <li>• Technology upgrade pathway planning</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};