import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule3Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-lg leading-relaxed">
          Smart lighting represents the foundation of modern home automation, but choosing the wrong approach can cost thousands and create years of frustration. This section teaches you to evaluate four distinct lighting architectures through real-world scenarios and practical decision frameworks.
        </p>
        
        <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-elec-yellow">
          <h4 className="text-elec-yellow font-semibold mb-2">What You'll Master</h4>
          <ul className="space-y-2 text-sm">
            <li>• Technical comparison of wireless vs wired lighting systems</li>
            <li>• Cost analysis methodology for different property types</li>
            <li>• Installation complexity assessment and electrical requirements</li>
            <li>• Performance characteristics under real-world conditions</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="text-blue-200 font-medium mb-2">Learning Approach</h5>
            <p className="text-blue-100 text-sm">
              Each system is examined through practical scenarios, cost breakdowns, and installation challenges you'll encounter in real projects.
            </p>
          </div>
          <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="text-green-200 font-medium mb-2">Applied Knowledge</h5>
            <p className="text-green-100 text-sm">
              Interactive decision trees help you select optimal lighting solutions based on specific client requirements and constraints.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};