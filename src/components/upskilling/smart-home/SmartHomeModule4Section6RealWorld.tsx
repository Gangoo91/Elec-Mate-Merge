import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, TrendingDown, Lightbulb } from 'lucide-react';

export const SmartHomeModule4Section6RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">University BMS Integration Project</h3>
          <p className="mb-4">
            A university installs a comprehensive BMS that links lighting and HVAC systems across 
            multiple buildings. The system uses occupancy sensors to automatically switch lights 
            off and reduce ventilation in unused lecture halls and study areas.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-400" />
                Results Achieved
              </h4>
              <ul className="text-sm space-y-1">
                <li>• 25% reduction in utility costs over one year</li>
                <li>• Improved air quality in occupied spaces</li>
                <li>• Reduced maintenance costs through optimised operation</li>
                <li>• Enhanced student and staff comfort</li>
              </ul>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Key Features Implemented</h4>
              <ul className="text-sm space-y-1">
                <li>• DALI lighting control with daylight harvesting</li>
                <li>• CO₂-based ventilation control</li>
                <li>• Coordinated heating and cooling schedules</li>
                <li>• Central monitoring dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-green-500/10 border border-green-5=/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">Hospital BMS Upgrade Case Study</h3>
          <p className="mb-4">
            A 300-bed regional hospital implemented a comprehensive BMS upgrade integrating HVAC, 
            lighting, and medical gas monitoring across 15 buildings. The project addressed aging 
            infrastructure and regulatory compliance requirements.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Challenge & Solution</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Challenge:</strong> 24/7 operations, critical systems</li>
                <li>• <strong>Solution:</strong> Phased installation during scheduled maintenance</li>
                <li>• <strong>Integration:</strong> BACnet backbone with DALI lighting zones</li>
                <li>• <strong>Features:</strong> Predictive maintenance and energy analytics</li>
              </ul>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Measurable Outcomes</h4>
              <ul className="text-sm space-y-1">
                <li>• 35% reduction in energy consumption</li>
                <li>• £180,000 annual utility savings</li>
                <li>• 40% reduction in maintenance calls</li>
                <li>• Improved patient and staff comfort ratings</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">Manufacturing Facility Integration</h3>
          <p className="mb-4">
            A 50,000m² automotive parts manufacturer integrated their production environment controls 
            with office areas, creating a unified BMS managing both industrial processes and 
            commercial building systems.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Unique Requirements</h4>
              <ul className="text-sm space-y-1">
                <li>• Production area climate control</li>
                <li>• Compressed air system monitoring</li>
                <li>• Energy-intensive equipment coordination</li>
                <li>• Safety system integration</li>
              </ul>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Results Achieved</h4>
              <ul className="text-sm space-y-1">
                <li>• 28% reduction in peak demand charges</li>
                <li>• Improved production environment stability</li>
                <li>• Enhanced safety through integrated alarms</li>
                <li>• 3.2-year ROI on £850,000 investment</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-orange-400" />
            Advanced Integration Opportunities
          </h4>
          <p className="text-sm font-medium mb-2">
            Consider these additional integrations that could further enhance building performance:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Energy Systems:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                <li>Solar panel and battery storage coordination</li>
                <li>Electric vehicle charging management</li>
                <li>Grid demand response participation</li>
                <li>Combined heat and power integration</li>
              </ul>
            </div>
            <div>
              <p><strong>Smart Building Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                <li>Weather-responsive building envelope</li>
                <li>Predictive maintenance algorithms</li>
                <li>Occupant behaviour analytics</li>
                <li>Space utilisation optimisation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};