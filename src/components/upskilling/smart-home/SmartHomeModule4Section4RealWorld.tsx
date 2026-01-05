import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="leading-relaxed">
          Household A uses fixed schedules: heating runs every morning and evening, even if the family is away. 
          Household B uses Nest's AI control: the system turns off when nobody is home and preheats before arrival.
        </p>

        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-gray-600 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-950/40 border border-red-500 rounded-lg p-4">
              <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                🏠 Household A: Fixed Schedules
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>Setup:</strong> Traditional scheduled heating</p>
                <p><strong>Operation:</strong> Heating runs every morning (7-9am) and evening (6-10pm)</p>
                <p><strong>Issue:</strong> System operates even when family is away on holiday or working late</p>
                <p className="text-red-200"><strong>Result:</strong> Energy waste during absences</p>
              </div>
            </div>

            <div className="bg-green-950/40 border border-green-500 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
                🏠 Household B: AI Learning Control
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>Setup:</strong> Google Nest Learning Thermostat</p>
                <p><strong>Operation:</strong> System learns patterns and detects occupancy</p>
                <p><strong>Smart Features:</strong> Turns off when nobody is home, preheats before arrival</p>
                <p className="text-green-200"><strong>Result:</strong> Optimised energy use and comfort</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-950/30 border border-yellow-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="h-5 w-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-200">Analysis & Trade-offs</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-yellow-100 mb-2"><strong>Energy Savings:</strong></p>
                <p className="text-yellow-200">Household B saves approximately 25% more energy due to adaptive operation and occupancy detection.</p>
              </div>
              <div>
                <p className="text-yellow-100 mb-2"><strong>Trade-off:</strong></p>
                <p className="text-yellow-200">Household A has predictable operation but wastes energy. Household B requires learning period and internet connectivity.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-950/30 border border-purple-500 rounded-lg p-4">
          <p className="font-semibold text-purple-200 mb-2">👩‍🏫 Learner Question:</p>
          <p className="text-purple-100 italic">
            "Which household saves more energy, and what trade-off exists between predictability and efficiency?"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};