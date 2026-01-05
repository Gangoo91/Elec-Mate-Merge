import { Zap, Clock, Bell, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EventTriggersContent = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Introduction to Event Triggers and Auto-Reporting
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            Event triggers and automated reporting systems form the intelligence layer of modern BMS installations. 
            These systems monitor building conditions continuously, responding automatically to predefined scenarios 
            and generating comprehensive reports without manual intervention.
          </p>
          <p>
            Intelligent event handling reduces operator workload, ensures consistent responses to building conditions, 
            and provides comprehensive documentation for compliance, energy management, and operational optimization.
          </p>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Learning Outcomes</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Technical Skills</h4>
              <ul className="space-y-1 text-sm">
                <li>• Configure complex event trigger logic and conditions</li>
                <li>• Design automated response sequences for building events</li>
                <li>• Implement sophisticated reporting and notification systems</li>
                <li>• Integrate time-based scheduling with event-driven automation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Practical Applications</h4>
              <ul className="space-y-1 text-sm">
                <li>• Develop energy optimization through automated responses</li>
                <li>• Create comprehensive audit trails for compliance reporting</li>
                <li>• Troubleshoot and optimize automated system behaviours</li>
                <li>• Balance automation with operational flexibility requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Content */}
      <div className="grid gap-6">
        <Card className="bg-gradient-to-r from-blue-900/20 to-elec-gray border-blue-600/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Event Trigger Fundamentals
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Trigger Types</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Time-based:</strong> Scheduled events, astronomical time</li>
                  <li>• <strong>Condition-based:</strong> Temperature, occupancy, equipment status</li>
                  <li>• <strong>Logic-based:</strong> Multiple conditions, complex algorithms</li>
                  <li>• <strong>Manual:</strong> Operator overrides, emergency commands</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Response Actions</h5>
                <ul className="text-sm space-y-1">
                  <li>• Equipment control commands</li>
                  <li>• Setpoint adjustments</li>
                  <li>• Alarm generation and notification</li>
                  <li>• Report generation and distribution</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-400" />
              Intelligent Notification Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="space-y-4">
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Notification Channels</h5>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <strong>Email Systems:</strong> Formatted reports, alarm notifications, scheduled summaries
                  </div>
                  <div>
                    <strong>SMS/Text:</strong> Critical alarms, emergency notifications, status updates
                  </div>
                  <div>
                    <strong>Mobile Apps:</strong> Push notifications, dashboard alerts, interactive responses
                  </div>
                </div>
              </div>
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Intelligent Escalation</h5>
                <ul className="text-sm space-y-1">
                  <li>• Priority-based notification routing</li>
                  <li>• Time-delayed escalation procedures</li>
                  <li>• Acknowledgment tracking and follow-up</li>
                  <li>• On-call rotation and backup contacts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/20 to-elec-gray border-purple-600/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-400" />
              Automated Reporting Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Report Categories</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Operational:</strong> Daily summaries, equipment runtime</li>
                  <li>• <strong>Energy:</strong> Consumption analysis, cost reporting</li>
                  <li>• <strong>Maintenance:</strong> Service schedules, fault history</li>
                  <li>• <strong>Compliance:</strong> Environmental logs, safety records</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Report Features</h5>
                <ul className="text-sm space-y-1">
                  <li>• Automated data collection and analysis</li>
                  <li>• Customizable templates and formats</li>
                  <li>• Scheduled generation and distribution</li>
                  <li>• Exception reporting and trend analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Implementation */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Advanced Event Logic Implementation</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Complex Logic Patterns</h5>
              <ul className="text-sm space-y-1">
                <li>• IF-THEN-ELSE conditional structures</li>
                <li>• Multiple condition evaluation (AND/OR logic)</li>
                <li>• Time delays and hysteresis prevention</li>
                <li>• Priority override and conflict resolution</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Integration Considerations</h5>
              <ul className="text-sm space-y-1">
                <li>• Cross-system event coordination</li>
                <li>• External database connectivity</li>
                <li>• Third-party system integration</li>
                <li>• Cloud platform communication</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Optimization */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">System Performance and Reliability</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Performance Optimization</h5>
              <p className="text-sm mb-2">
                Efficient event processing requires careful consideration of trigger frequency, 
                processing load, and system response times.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Minimize unnecessary trigger evaluations</li>
                <li>• Batch multiple actions where possible</li>
                <li>• Implement appropriate time delays</li>
                <li>• Monitor system resource utilization</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Reliability Measures</h5>
              <ul className="text-sm space-y-1">
                <li>• Redundant processing paths for critical events</li>
                <li>• Backup notification methods</li>
                <li>• Event logging and audit trails</li>
                <li>• Regular testing of automated responses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventTriggersContent;