import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle, Clock, Lightbulb } from 'lucide-react';

export const EmergencyLightingSummary3_1 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Section Summary: Minimum Illumination Levels and Durations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg text-foreground leading-relaxed">
          This section has covered the fundamental requirements for emergency lighting performance, 
          focusing on the critical safety parameters that ensure effective evacuation and emergency response.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Key Lux Requirements
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>Escape Routes:</strong> 1 lux minimum (centre line)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>Open Areas:</strong> 0.5 lux minimum (anti-panic)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>High-Risk Tasks:</strong> 15 lux or 10% normal lighting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>Uniformity:</strong> Maximum 40:1 ratio typically</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration Requirements
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>General Buildings:</strong> 1 hour minimum</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>Public/Workplace:</strong> 3 hours minimum</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>Battery Types:</strong> NiCd, NiMH, Li-ion considerations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span><strong>Ageing Factor:</strong> Design for end-of-life performance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-3">Critical Design Factors</h4>
              <ul className="space-y-2 text-sm">
                <li>• Use manufacturer photometric data for accurate calculations</li>
                <li>• Consider worst-case evacuation scenarios and building complexity</li>
                <li>• Plan luminaire positioning to avoid shadows and dark patches</li>
                <li>• Document all calculations and assumptions for compliance proof</li>
                <li>• Allow safety margins for battery degradation over time</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3">Testing & Maintenance</h4>
              <ul className="space-y-2 text-sm">
                <li>• Measure lux at floor level with calibrated instruments</li>
                <li>• Test both initial and aged battery performance</li>
                <li>• Regular cleaning maintains effective light output</li>
                <li>• Annual duration testing and periodic lux verification</li>
                <li>• Replace batteries before performance drops below compliance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Professional Responsibility</h4>
              <p className="text-foreground text-sm">
                Emergency lighting failures can contribute to injuries and fatalities during building evacuation. 
                The Birmingham college case study demonstrates the importance of considering real evacuation scenarios, 
                not just minimum compliance. Always err on the side of caution when specifying performance levels, 
                and maintain detailed documentation to prove compliance with BS 5266-1 requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark/60 p-4 rounded-lg border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-3">Next Steps</h4>
          <p className="text-foreground text-sm">
            With a solid understanding of minimum illumination levels and durations, you're ready to progress to 
            more advanced topics in emergency lighting design. The next section will build on these fundamentals 
            to explore system types, installation methods, and advanced compliance considerations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};