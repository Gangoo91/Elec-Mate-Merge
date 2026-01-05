import { Wrench, CheckCircle, AlertTriangle, Calendar, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDMaintenancePractical = () => {
  const monthlyChecks = [
    "Test button operation - RCD should trip and require manual reset",
    "Check for any visible damage to RCD housing or connections",
    "Verify RCD labelling and identification remains clear",
    "Ensure test button is accessible and not obstructed",
    "Record test date and any observations in logbook",
    "Report any issues immediately to qualified personnel"
  ];

  const annualInspection = [
    {
      category: "Visual Inspection",
      tasks: [
        "Check for signs of overheating, discoloration, or burning",
        "Inspect terminals for tightness and corrosion",
        "Verify correct labelling and circuit identification",
        "Check mounting security and panel integrity"
      ],
      priority: "high"
    },
    {
      category: "Electrical Testing",
      tasks: [
        "Full RCD test sequence (½×, 1×, 5×IΔn)",
        "Insulation resistance testing",
        "Earth fault loop impedance verification",
        "Load current measurement and balance check"
      ],
      priority: "critical"
    },
    {
      category: "Performance Assessment",
      tasks: [
        "Compare results with previous tests",
        "Check for deterioration trends",
        "Assess discrimination with other devices",
        "Evaluate environmental conditions"
      ],
      priority: "medium"
    }
  ];

  const replacementCriteria = [
    { condition: "Complete failure to trip", action: "Immediate replacement", risk: "Critical" },
    { condition: "Trip times consistently exceeding limits", action: "Replace within 30 days", risk: "High" },
    { condition: "Nuisance tripping at ½×IΔn", action: "Replace during next maintenance", risk: "Medium" },
    { condition: "Physical damage or deterioration", action: "Assess and replace if necessary", risk: "Variable" },
    { condition: "Age exceeding 15 years", action: "Consider replacement", risk: "Low" }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Monthly User Testing */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Monthly User Testing Protocol</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {monthlyChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-600/10 border border-gray-600/20 rounded">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground text-sm sm:text-base">{check}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-sm sm:text-base">
                <strong>Important:</strong> Users should be trained on proper test button operation and what to do if the RCD fails to trip or reset.
              </p>
            </div>
          </div>
        </div>

        {/* Annual Professional Inspection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Annual Professional Inspection</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            {annualInspection.map((section, index) => (
              <div key={index} className={`bg-${section.priority === 'critical' ? 'red' : section.priority === 'high' ? 'orange' : 'blue'}-600/10 border border-${section.priority === 'critical' ? 'red' : section.priority === 'high' ? 'orange' : 'blue'}-600/20 rounded p-4`}>
                <h4 className={`text-${section.priority === 'critical' ? 'red' : section.priority === 'high' ? 'orange' : 'blue'}-200 font-medium mb-3 flex items-center gap-2`}>
                  <span className={`w-6 h-6 bg-${section.priority === 'critical' ? 'red' : section.priority === 'high' ? 'orange' : 'blue'}-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold`}>
                    {index + 1}
                  </span>
                  {section.category}
                </h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1 ml-6">
                  {section.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>• {task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Documentation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Maintenance Documentation Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Essential Records</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• RCD test logbooks and schedules</li>
                  <li>• Annual inspection certificates</li>
                  <li>• Maintenance work orders and reports</li>
                  <li>• Replacement and upgrade records</li>
                  <li>• Incident and fault reports</li>
                  <li>• Training records for responsible persons</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Record Retention</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Test records: Minimum 3 years</li>
                  <li>• Installation certificates: Life of installation</li>
                  <li>• Maintenance logs: 10 years recommended</li>
                  <li>• Incident reports: As per company policy</li>
                  <li>• Training records: Duration of employment + 3 years</li>
                  <li>• Warranty documentation: Full warranty period</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Replacement Decision Matrix */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">RCD Replacement Decision Matrix</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {replacementCriteria.map((item, index) => (
                <div key={index} className="bg-gray-600/10 border border-gray-600/20 rounded p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-1">{item.condition}</h4>
                      <p className="text-foreground text-sm sm:text-base">{item.action}</p>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs font-medium ${
                      item.risk === 'Critical' ? 'bg-red-600/20 text-red-300' :
                      item.risk === 'High' ? 'bg-orange-600/20 text-orange-300' :
                      item.risk === 'Medium' ? 'bg-yellow-600/20 text-yellow-300' :
                      'bg-green-600/20 text-green-300'
                    }`}>
                      {item.risk} Risk
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Environmental Monitoring</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-600/10 border border-orange-600/20 rounded p-3">
                <h4 className="text-orange-200 font-medium mb-2">Temperature Effects</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Monitor ambient temperature</li>
                  <li>• Check for heat sources nearby</li>
                  <li>• Assess ventilation adequacy</li>
                  <li>• Record temperature readings</li>
                </ul>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                <h4 className="text-blue-200 font-medium mb-2">Humidity Control</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Monitor humidity levels</li>
                  <li>• Check for condensation</li>
                  <li>• Inspect sealing integrity</li>
                  <li>• Assess drainage requirements</li>
                </ul>
              </div>
              <div className="bg-purple-600/10 border border-purple-600/20 rounded p-3">
                <h4 className="text-purple-200 font-medium mb-2">Contamination Prevention</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Regular cleaning schedules</li>
                  <li>• Dust ingress monitoring</li>
                  <li>• Chemical exposure assessment</li>
                  <li>• Protective measures review</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Procedures */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Emergency Response Procedures</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <h4 className="text-red-200 font-medium mb-2">RCD Failure Response</h4>
              <ol className="text-foreground text-sm sm:text-base space-y-1 list-decimal list-inside">
                <li>Immediately isolate affected circuits</li>
                <li>Post warning notices and barriers</li>
                <li>Contact qualified electrician urgently</li>
                <li>Document incident and circumstances</li>
                <li>Arrange temporary protection if safe to do so</li>
                <li>Do not attempt reset or repair</li>
              </ol>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">Nuisance Tripping Response</h4>
              <ol className="text-foreground text-sm sm:text-base space-y-1 list-decimal list-inside">
                <li>Record time, conditions, and affected circuits</li>
                <li>Check for obvious causes (weather, equipment)</li>
                <li>Reset RCD and monitor for recurrence</li>
                <li>If frequent, arrange professional investigation</li>
                <li>Consider load redistribution temporarily</li>
                <li>Maintain detailed incident log</li>
              </ol>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default RCDMaintenancePractical;