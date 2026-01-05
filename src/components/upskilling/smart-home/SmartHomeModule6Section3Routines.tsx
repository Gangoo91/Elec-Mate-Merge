import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Coffee } from 'lucide-react';
import RoutinesQuickCheck from '@/components/upskilling/smart-home/RoutinesQuickCheck';

const SmartHomeModule6Section3Routines = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">1. What is a Routine?</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
              <p className="text-foreground">A routine is a <strong>pre-set sequence of actions</strong> triggered by a command, schedule, or event.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Coffee className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <p className="text-foreground mb-2"><strong>Example:</strong> Saying "Good morning" could:</p>
                <ul className="text-foreground space-y-1 ml-4">
                  <li>• Turn on lights</li>
                  <li>• Start the kettle</li>
                  <li>• Adjust heating</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
              <p className="text-foreground">Routines save time, improve efficiency, and enhance convenience.</p>
            </div>
          </div>

          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="text-lg font-semibold text-elec-yellow mb-2">Key Benefits</h4>
            <div className="grid md:grid-cols-3 gap-3 text-sm text-foreground">
              <div>• <strong>Time Saving:</strong> Multiple actions with one command</div>
              <div>• <strong>Convenience:</strong> Automated daily routines</div>
              <div>• <strong>Energy Efficiency:</strong> Coordinated device control</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <RoutinesQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section3Routines;