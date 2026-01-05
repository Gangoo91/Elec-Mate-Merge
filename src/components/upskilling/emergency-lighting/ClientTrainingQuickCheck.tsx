import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const ClientTrainingQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: What is one key responsibility of the client after handover?
            </p>
            <div className="text-foreground text-sm sm:text-base">
              <p className="mb-2"><strong>Primary responsibility:</strong> Ensure all emergency lighting tests are carried out according to BS 5266-1 schedule:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Monthly functional tests (simulated failure)</li>
                <li>Annual 3-hour duration tests</li>
                <li>Record all test results in the logbook</li>
                <li>Rectify any faults or failures promptly</li>
                <li>Replace batteries and components as required</li>
              </ul>
              <p className="mt-3 text-gray-300">Under the Regulatory Reform (Fire Safety) Order 2005, the Responsible Person can face prosecution for failing to maintain emergency lighting.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
