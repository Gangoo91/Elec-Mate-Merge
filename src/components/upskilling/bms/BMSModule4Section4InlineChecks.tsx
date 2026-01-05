import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const ShadingInlineCheck1 = () => (
  <Card className="bg-orange-900/20 border-orange-600/40">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-orange-300 mb-2">Inline Check:</h4>
          <p className="text-foreground">
            When external solar irradiance exceeds 300W/m², automated shading systems reduce cooling loads by blocking heat gain. 
            Calculate the potential energy savings if a 500m² office façade prevents 70% solar heat gain during a 6-hour peak period. 
            Consider: What additional BMS coordination would maximise these savings?
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ShadingInlineCheck2 = () => (
  <Card className="bg-blue-900/20 border-blue-600/40">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-300 mb-2">Inline Check:</h4>
          <p className="text-foreground">
            A motorised blind system allows manual override but automatically resets to BMS control after 2 hours. 
            Explain why this hybrid approach balances occupant comfort with energy efficiency strategies. 
            What problems could arise if manual overrides were permanent, and how does automatic reset prevent them?
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ShadingInlineCheck3 = () => (
  <Card className="bg-purple-900/20 border-purple-600/40">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-purple-300 mb-2">Inline Check:</h4>
          <p className="text-foreground">
            Fire safety regulations require external blinds to retract to a safe position during alarm activation. 
            Design a control strategy that ensures: immediate blind retraction on fire alarm, manual firefighter override capability, and automatic system reset after alarm clearance. 
            What backup power considerations are essential for this safety-critical function?
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);