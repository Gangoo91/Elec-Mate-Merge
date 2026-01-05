
import { Cable, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Cable className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          Insulation resistance testing helps identify whether live conductors are safely isolated 
          from each other and from earth. It's one of the most critical safety tests in the inspection process.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">Critical Safety Function</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Prevents leakage currents that could cause shock or fire</li>
            <li>• Confirms safe isolation between conductors</li>
            <li>• Detects insulation breakdown before it becomes dangerous</li>
            <li>• Essential for protecting people and equipment</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Remember</h3>
              <p className="text-foreground text-sm leading-relaxed">
                This test must be completed before any circuit is energised. Poor insulation 
                is a leading cause of electrical fires and fatal accidents in the workplace.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
