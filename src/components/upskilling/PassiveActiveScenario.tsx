import { Building2, Settings, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PassiveActiveScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: Manufacturing Facility Network Design
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-300">
        <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">The Challenge</h4>
              <p className="text-orange-100 text-sm leading-relaxed">
                IndustrialTech Ltd needs to network their new manufacturing facility with harsh environmental 
                conditions, 24/7 operations, and a mix of office areas, production floors, and control rooms. 
                The facility requires both high reliability and intelligent network management.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">The Hybrid Solution</h4>
              <div className="space-y-3 text-blue-100 text-sm">
                <div>
                  <strong>Passive Infrastructure Foundation:</strong>
                  <p>Cat 6A cabling throughout with fibre backbone for maximum reliability and future capacity. 
                  All cables run through sealed conduits to protect from environmental hazards.</p>
                </div>
                <div>
                  <strong>Strategic Active Components:</strong>
                  <p>Industrial-grade managed switches in climate-controlled rooms for network intelligence, 
                  with passive infrastructure extending to endpoints in harsh environments.</p>
                </div>
                <div>
                  <strong>Zoned Approach:</strong>
                  <p>Office areas use standard active equipment, whilst production floors rely primarily 
                  on passive connections to ruggedised terminal equipment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Results Achieved</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• 99.98% uptime achieved in harsh manufacturing environment</li>
                <li>• 60% reduction in network maintenance compared to all-active design</li>
                <li>• Intelligent traffic management for production control systems</li>
                <li>• Easy expansion capability for future production lines</li>
                <li>• Lower total cost of ownership over 15-year lifecycle</li>
                <li>• Compliance with industrial EMC and safety standards</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};