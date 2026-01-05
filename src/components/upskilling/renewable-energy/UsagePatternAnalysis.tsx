import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UsagePatternAnalysis = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Usage Patterns and System Optimisation</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-purple-400 mb-4">Demand Profile Analysis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                <h5 className="text-foreground font-medium mb-3">Domestic Usage Patterns:</h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <h6 className="text-green-400 font-medium mb-2">Typical Daily Profile:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Morning peak:</strong> 7-9am (showers, breakfast, leaving house)</li>
                      <li>• <strong>Daytime minimum:</strong> 9am-5pm (house mostly empty)</li>
                      <li>• <strong>Evening peak:</strong> 5-8pm (cooking, heating, appliances)</li>
                      <li>• <strong>Night baseline:</strong> 10pm-6am (fridges, standby power)</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-blue-400 font-medium mb-2">Solar Generation Mismatch:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Peak generation: 11am-3pm</li>
                      <li>• Low demand during peak generation</li>
                      <li>• High demand when generation is low</li>
                      <li>• Self-consumption typically 40-70%</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-900/20 p-4 rounded border border-cyan-500/30">
                <h5 className="text-foreground font-medium mb-3">Commercial Usage Patterns:</h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <h6 className="text-yellow-400 font-medium mb-2">Business Hours Profile:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Start-up surge:</strong> 7-9am (equipment, lighting, heating)</li>
                      <li>• <strong>Operating plateau:</strong> 9am-5pm (consistent high demand)</li>
                      <li>• <strong>Wind-down:</strong> 5-7pm (reduced but still significant)</li>
                      <li>• <strong>Night minimum:</strong> 7pm-7am (security, refrigeration)</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-orange-400 font-medium mb-2">Solar Generation Alignment:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Excellent overlap with business hours</li>
                      <li>• High demand during peak generation</li>
                      <li>• Self-consumption typically 70-95%</li>
                      <li>• Better capacity factor utilisation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-400 mb-4">Sector-Specific Optimisation Strategies:</h4>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h6 className="text-blue-400 font-medium mb-3">Manufacturing & Industrial:</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• High daytime baseload demand</li>
                    <li>• Process heating integration opportunities</li>
                    <li>• Demand charge reduction benefits</li>
                    <li>• Power factor improvement</li>
                    <li>• Grid services revenue potential</li>
                    <li>• Load shifting for optimal self-consumption</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-green-400 font-medium mb-3">Retail & Office:</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• HVAC systems main daytime load</li>
                    <li>• Lighting energy reduction</li>
                    <li>• Excellent generation-demand match</li>
                    <li>• Customer engagement opportunities</li>
                    <li>• Corporate sustainability targets</li>
                    <li>• Brand value and marketing benefits</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-purple-400 font-medium mb-3">Agriculture & Rural:</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Irrigation pump timing optimisation</li>
                    <li>• Feed processing energy requirements</li>
                    <li>• Cold storage and refrigeration</li>
                    <li>• Grain drying seasonal demand</li>
                    <li>• Diversification income streams</li>
                    <li>• Rural grid support services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsagePatternAnalysis;