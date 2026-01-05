import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RealWorldScenario = () => {
  return (
    <Card className="border border-red-600/30 bg-red-600/10">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Real World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-3">
        <p className="font-semibold text-elec-yellow">
          UV Degradation Safety Risk
        </p>
        <p>
          A shed housing livestock had plastic conduit that degraded from UV exposure. 
          Exposed cables created a major safety risk for both animals and workers, 
          requiring emergency replacement with UV-stable materials.
        </p>
      </CardContent>
    </Card>
  );
};

export default RealWorldScenario;