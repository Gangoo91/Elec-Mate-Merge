import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const SmartHomeSection5Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-lg font-medium text-foreground">
          Understanding retrofit versus new build smart home installations is crucial for making informed recommendations to clients.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Key Takeaways</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                Retrofit suits budget-conscious and temporary installations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                New build offers superior integration and scalability
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                Hybrid approaches combine benefits of both methods
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                Client assessment is crucial for proper recommendations
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Next: Protocols and Standards</h4>
            <p className="text-sm text-gray-300">
              The next section will explore communication protocols and standards that enable smart home devices to work together effectively, building on the installation approaches covered here.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};