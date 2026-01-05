import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BMSDashboardsPractical = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Implementation Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          {/* Dashboard Design Process */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Step-by-Step Dashboard Design Process</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <strong>Requirements Analysis:</strong> Interview users, identify key performance indicators, define operational workflows
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <strong>Information Architecture:</strong> Group related functions, establish navigation hierarchy, plan screen layouts
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <strong>Prototype Development:</strong> Create wireframes, test with users, iterate based on feedback
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <strong>Implementation:</strong> Configure graphics, establish data connections, test functionality
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <strong>Training & Deployment:</strong> User training sessions, phased rollout, ongoing support
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-green-600/30">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Best Practice Example
              </h5>
              <p className="text-sm mb-2"><strong>Energy Dashboard for Office Building:</strong></p>
              <ul className="text-sm space-y-1">
                <li>• Real-time consumption displayed with traffic light colours</li>
                <li>• Comparison with previous day/week/month</li>
                <li>• Equipment status overview with fault indicators</li>
                <li>• Weather compensation data integration</li>
                <li>• Cost implications clearly displayed</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-md border border-red-600/30">
              <h5 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Mistake to Avoid
              </h5>
              <p className="text-sm mb-2"><strong>Information Overload Dashboard:</strong></p>
              <ul className="text-sm space-y-1">
                <li>• Too many data points on single screen</li>
                <li>• Inconsistent colour coding across systems</li>
                <li>• No clear priority hierarchy for alarms</li>
                <li>• Complex navigation requiring training</li>
                <li>• Static displays with no interaction capability</li>
              </ul>
            </div>
          </div>

          {/* Configuration Guidelines */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Dashboard Configuration Guidelines</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-foreground font-semibold mb-2">Visual Elements</h5>
                <ul className="text-sm space-y-1">
                  <li>• Use consistent symbols across all systems</li>
                  <li>• Implement standard colour codes (red=alarm, amber=warning, green=normal)</li>
                  <li>• Ensure text readability with appropriate font sizes</li>
                  <li>• Maintain adequate spacing between elements</li>
                </ul>
              </div>
              <div>
                <h5 className="text-foreground font-semibold mb-2">Data Presentation</h5>
                <ul className="text-sm space-y-1">
                  <li>• Update critical parameters every 5-10 seconds</li>
                  <li>• Display units clearly with all numeric values</li>
                  <li>• Provide historical context for current readings</li>
                  <li>• Enable drill-down capability for detailed analysis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testing Procedures */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Dashboard Testing & Validation</h4>
            <div className="space-y-3">
              <div>
                <strong>Functional Testing:</strong> Verify all data points update correctly, test alarm acknowledgment, check navigation links
              </div>
              <div>
                <strong>Usability Testing:</strong> Time common tasks, assess user satisfaction, identify training needs
              </div>
              <div>
                <strong>Performance Testing:</strong> Monitor response times, test with maximum concurrent users, verify mobile performance
              </div>
              <div>
                <strong>Integration Testing:</strong> Confirm data accuracy across systems, test during system startups/shutdowns
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default BMSDashboardsPractical;