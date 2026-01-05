import { Monitor, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BMSDashboardsContent = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Monitor className="h-5 w-5 text-elec-yellow" />
            Introduction to BMS Dashboards
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            BMS dashboards are the primary interface between building operators and the complex systems they manage. 
            Effective dashboard design transforms raw data into actionable insights, enabling quick decision-making 
            and efficient building operations.
          </p>
          <p>
            Modern dashboards integrate real-time data visualisation, alarm management, and control capabilities 
            in intuitive interfaces that support both routine monitoring and emergency response scenarios.
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
                <li>• Design effective dashboard layouts for different user roles</li>
                <li>• Implement real-time data visualisation techniques</li>
                <li>• Configure alarm and notification systems</li>
                <li>• Integrate multiple building systems into unified interfaces</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Practical Applications</h4>
              <ul className="space-y-1 text-sm">
                <li>• Evaluate dashboard usability and effectiveness</li>
                <li>• Customise interfaces for specific operational requirements</li>
                <li>• Troubleshoot visualisation platform issues</li>
                <li>• Train users on dashboard navigation and interpretation</li>
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
              <BarChart3 className="h-5 w-5 text-blue-400" />
              Dashboard Design Principles
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Visual Hierarchy</h5>
                <ul className="text-sm space-y-1">
                  <li>• Most critical information prominently displayed</li>
                  <li>• Logical grouping of related systems</li>
                  <li>• Consistent colour coding and symbols</li>
                  <li>• Clear navigation pathways</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">User Experience</h5>
                <ul className="text-sm space-y-1">
                  <li>• Intuitive interface design</li>
                  <li>• Minimal clicks to access information</li>
                  <li>• Responsive design for multiple devices</li>
                  <li>• Accessibility compliance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Data Visualisation Techniques
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Real-time Graphics</h5>
                <p className="text-sm">Dynamic floor plans, system schematics, and live equipment status displays</p>
              </div>
              <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Trending Charts</h5>
                <p className="text-sm">Historical data analysis, performance comparisons, and pattern identification</p>
              </div>
              <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Alarm Management</h5>
                <p className="text-sm">Priority-based notifications, alarm acknowledgment, and escalation procedures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/20 to-elec-gray border-purple-600/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Multi-User Interface Design
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="space-y-4">
              <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
                <h5 className="text-elec-yellow font-semibold mb-2">Role-Based Access</h5>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <strong>Operators:</strong> Real-time monitoring, basic controls, alarm response
                  </div>
                  <div>
                    <strong>Supervisors:</strong> System configuration, performance analysis, reporting
                  </div>
                  <div>
                    <strong>Managers:</strong> High-level dashboards, energy reports, strategic planning
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Implementation */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Technical Implementation Considerations</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Platform Selection</h5>
              <ul className="text-sm space-y-1">
                <li>• Web-based vs. native applications</li>
                <li>• Scalability and performance requirements</li>
                <li>• Integration capabilities with existing systems</li>
                <li>• Mobile device compatibility</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h5 className="text-elec-yellow font-semibold mb-2">Data Management</h5>
              <ul className="text-sm space-y-1">
                <li>• Real-time data refresh rates</li>
                <li>• Historical data storage and retrieval</li>
                <li>• Data validation and quality assurance</li>
                <li>• Backup and disaster recovery</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BMSDashboardsContent;