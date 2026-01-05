import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckSquare, FileText, TrendingUp, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const MaintenanceSchedulesPractical = () => {
  const [systemAge, setSystemAge] = useState('');
  const [environment, setEnvironment] = useState('standard');
  const [lastCleaning, setLastCleaning] = useState('');
  const [performance, setPerformance] = useState('');

  const generateMaintenanceSchedule = () => {
    const age = parseFloat(systemAge) || 0;
    const env = environment;
    
    if (age <= 1) return "Monthly monitoring, Quarterly visual checks, Annual electrical testing";
    if (age <= 5) return "Bi-monthly monitoring, Quarterly inspections, Bi-annual electrical testing";
    if (age <= 10) return "Monthly monitoring, Bi-monthly inspections, Quarterly electrical testing";
    return "Continuous monitoring, Monthly inspections, Quarterly comprehensive testing";
  };

  const getCleaningRecommendation = () => {
    const days = parseInt(lastCleaning) || 0;
    const env = environment;
    
    if (env === 'coastal' && days > 30) return { status: 'urgent', text: 'Clean immediately' };
    if (env === 'dusty' && days > 60) return { status: 'urgent', text: 'Clean soon' };
    if (env === 'standard' && days > 90) return { status: 'recommended', text: 'Consider cleaning' };
    return { status: 'good', text: 'No cleaning required' };
  };

  const getPerformanceStatus = () => {
    const pr = parseFloat(performance) || 0;
    if (pr >= 85) return { status: 'excellent', text: 'Excellent performance' };
    if (pr >= 80) return { status: 'good', text: 'Good performance' };
    if (pr >= 75) return { status: 'fair', text: 'Fair - investigate' };
    return { status: 'poor', text: 'Poor - urgent action' };
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-elec-yellow" />
          Maintenance Planning Tools & Schedules
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Maintenance Calendar Generator */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Personalised Maintenance Schedule Generator
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">System Age (years)</label>
                <input
                  type="number"
                  value={systemAge}
                  onChange={(e) => setSystemAge(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 3"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Environment Type</label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                >
                  <option value="standard">Standard urban/suburban</option>
                  <option value="coastal">Coastal (salt spray)</option>
                  <option value="dusty">Dusty/agricultural</option>
                  <option value="industrial">Industrial area</option>
                  <option value="rural">Clean rural</option>
                </select>
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Days since last cleaning</label>
                <input
                  type="number"
                  value={lastCleaning}
                  onChange={(e) => setLastCleaning(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 45"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Recommended Schedule:</p>
                <p className="text-elec-yellow text-sm">{generateMaintenanceSchedule()}</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Cleaning Status:</p>
                <Badge 
                  variant={getCleaningRecommendation().status === 'urgent' ? "destructive" : 
                          getCleaningRecommendation().status === 'recommended' ? "secondary" : "default"}
                  className="text-sm"
                >
                  {getCleaningRecommendation().text}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Inspection Checklist */}
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Monthly Visual Inspection Checklist
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="text-foreground font-medium">Array and Mounting:</h5>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Panels clean and free from debris
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  No cracks or damage to glass surfaces
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Mounting hardware secure and rust-free
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  No new shading from vegetation growth
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Drainage paths clear and functioning
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-foreground font-medium">Electrical Components:</h5>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Inverter displaying normal operation
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  DC cables properly supported and undamaged
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  MC4 connectors tight and corrosion-free
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Isolators operate smoothly
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Monitoring system communicating normally
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tracking Tool */}
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
          <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Analysis Tool
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Current Performance Ratio (%)</label>
                <input
                  type="number"
                  value={performance}
                  onChange={(e) => setPerformance(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 82"
                />
                <p className="text-gray-400 text-xs mt-1">PR = (Actual Energy / Theoretical Energy) × 100</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-foreground font-medium mb-2">Performance Benchmarks:</h5>
                <ul className="text-gray-300 text-xs space-y-1">
                  <li>• Excellent: {"≥"} 85% (well-maintained, optimal conditions)</li>
                  <li>• Good: 80-84% (normal operation, minor soiling)</li>
                  <li>• Fair: 75-79% (requires attention, cleaning needed)</li>
                  <li>• Poor: {"<"} 75% (fault investigation required)</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Performance Status:</p>
                <Badge 
                  variant={getPerformanceStatus().status === 'excellent' ? "default" : 
                          getPerformanceStatus().status === 'good' ? "secondary" : 
                          getPerformanceStatus().status === 'fair' ? "outline" : "destructive"}
                  className="text-sm"
                >
                  {getPerformanceStatus().text}
                </Badge>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-foreground font-medium mb-2">Improvement Actions:</h5>
                <ul className="text-gray-300 text-xs space-y-1">
                  <li>• Clean panels if soiling visible</li>
                  <li>• Check for new shading issues</li>
                  <li>• Verify inverter operation</li>
                  <li>• Test string current balance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Annual Electrical Testing Schedule */}
        <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
          <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Annual Electrical Testing Requirements
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-orange-400 font-medium mb-2">Essential Tests:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Insulation resistance (≥1MΩ)</li>
                <li>• Earth continuity verification</li>
                <li>• String Voc and Isc measurements</li>
                <li>• Inverter efficiency check</li>
                <li>• Protection device testing</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-blue-400 font-medium mb-2">Performance Analysis:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Annual energy yield comparison</li>
                <li>• Degradation rate calculation</li>
                <li>• String current balancing</li>
                <li>• Power quality measurements</li>
                <li>• Thermal imaging (if available)</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-green-400 font-medium mb-2">Documentation:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Updated test certificates</li>
                <li>• Performance trend analysis</li>
                <li>• Maintenance log updates</li>
                <li>• Warranty compliance records</li>
                <li>• Next scheduled maintenance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Maintenance Record Template */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Digital Maintenance Record Template
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-foreground font-medium mb-2">Required Information:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Date and time of inspection</li>
                <li>• Weather conditions during visit</li>
                <li>• Technician name and certification</li>
                <li>• Test equipment used (with calibration dates)</li>
                <li>• System performance data</li>
                <li>• Any issues identified</li>
                <li>• Corrective actions taken</li>
                <li>• Next scheduled maintenance date</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-foreground font-medium mb-2">Digital Tools:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Photo documentation with GPS coordinates</li>
                <li>• Thermal imaging (where applicable)</li>
                <li>• Test result spreadsheets</li>
                <li>• Cloud-based storage and backup</li>
                <li>• Automated reminder systems</li>
                <li>• Customer portal access</li>
                <li>• Warranty claim integration</li>
                <li>• Compliance reporting tools</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Environmental Maintenance Adjustments */}
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
          <h4 className="text-red-400 font-semibold mb-3">Environmental Maintenance Adjustments</h4>
          <div className="space-y-2 text-sm">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-red-400 font-medium">Coastal Environments:</h5>
              <p className="text-gray-300">Increase inspection frequency to monthly. Clean panels monthly to remove salt deposits. Check for accelerated corrosion of mounting hardware.</p>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-orange-400 font-medium">Dusty/Agricultural Areas:</h5>
              <p className="text-gray-300">Monitor soiling levels weekly during harvest seasons. Clean more frequently during dry periods. Check for pest damage to cables.</p>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-yellow-400 font-medium">High Wind Areas:</h5>
              <p className="text-gray-300">Inspect mounting hardware quarterly. Check for wind-induced vibration damage. Verify cable support adequacy after storms.</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedulesPractical;