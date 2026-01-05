import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, Clock, PoundSterling } from 'lucide-react';

export const BMSROISection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          BMS Return on Investment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Understanding the financial benefits of BMS integration helps justify investment decisions 
          and set realistic expectations for payback periods across different building types.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-green-400" />
              Cost Components
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Initial Investment</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Hardware: £50-200 per point</li>
                  <li>• Software: £10,000-100,000+</li>
                  <li>• Installation: 30-50% of hardware cost</li>
                  <li>• Commissioning: 10-20% of total project</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Ongoing Costs</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Annual maintenance: 5-15% of capital cost</li>
                  <li>• Software licences: £5-50 per point/year</li>
                  <li>• Training: £2,000-10,000 annually</li>
                  <li>• Upgrades: 10-year refresh cycle</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              Savings Potential
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Energy Savings</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• HVAC optimisation: 15-30% reduction</li>
                  <li>• Lighting control: 20-40% reduction</li>
                  <li>• Overall building: 20-35% typical</li>
                  <li>• Peak demand reduction: 10-25%</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Operational Benefits</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Reduced maintenance calls: 20-40%</li>
                  <li>• Extended equipment life: 10-20%</li>
                  <li>• Improved occupant productivity</li>
                  <li>• Compliance reporting automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <h5 className="font-semibold text-foreground text-sm">Office Buildings</h5>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Typical Size:</strong> 5,000-50,000m²</p>
              <p><strong>Investment:</strong> £100,000-1,000,000</p>
              <p><strong>Annual Savings:</strong> £20,000-200,000</p>
              <p><strong>Payback:</strong> 3-7 years</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-green-400" />
              <h5 className="font-semibold text-foreground text-sm">Educational</h5>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Typical Size:</strong> 10,000-100,000m²</p>
              <p><strong>Investment:</strong> £200,000-2,000,000</p>
              <p><strong>Annual Savings:</strong> £40,000-400,000</p>
              <p><strong>Payback:</strong> 4-8 years</p>
            </div>
          </div>
          
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-400" />
              <h5 className="font-semibold text-foreground text-sm">Healthcare</h5>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Typical Size:</strong> 20,000-200,000m²</p>
              <p><strong>Investment:</strong> £500,000-5,000,000</p>
              <p><strong>Annual Savings:</strong> £100,000-1,000,000</p>
              <p><strong>Payback:</strong> 2-6 years</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Key ROI Factors</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-1">Factors Improving ROI:</h5>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>High energy costs and long operating hours</li>
                <li>Older, inefficient existing systems</li>
                <li>Complex operational requirements</li>
                <li>Regulatory compliance needs</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">Factors Reducing ROI:</h5>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Recently upgraded efficient systems</li>
                <li>Limited operating hours</li>
                <li>Simple building operations</li>
                <li>Tight capital budgets</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};