import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const SmartHomeModule7Section5Summary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          This section demonstrated that customer handover and app training are critical components of successful smart home installations, directly impacting client satisfaction and system adoption.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Handover Fundamentals</h4>
            <ul className="text-sm space-y-1">
              <li>• Proper handovers build client confidence and reduce call-backs</li>
              <li>• App walkthroughs must include login, device control, and basic automation</li>
              <li>• Focus on features clients will actually use in daily operation</li>
            </ul>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Professional Standards</h4>
            <ul className="text-sm space-y-1">
              <li>• Provide comprehensive documentation including limitations and contacts</li>
              <li>• Offer structured aftercare advice and support boundaries</li>
              <li>• Use simple language and hands-on demonstrations throughout</li>
            </ul>
          </div>
        </div>
        
        <p>
          The real-world example highlighted how poor handovers lead to system abandonment and client dissatisfaction, whilst proper training results in confident users and positive outcomes.
        </p>

        <p>
          Professional electricians understand that installation quality means nothing if clients cannot use their systems effectively. A structured handover approach protects reputation and builds long-term client relationships.
        </p>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section5Summary;