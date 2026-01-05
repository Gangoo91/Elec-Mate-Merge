import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Users, AlertTriangle } from 'lucide-react';

const SmartHomeModule7Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-base leading-relaxed">
          Even the best-installed smart home system will fail if the homeowner doesn't know how to use it. A professional handover ensures the client understands their system, feels confident using the app, and knows where to find help if needed.
        </p>
        
        <p className="text-foreground text-base leading-relaxed">
          Poor handovers are a leading cause of unnecessary call-backs and client dissatisfaction. This section covers the process of delivering a clear, structured handover that builds client confidence and reduces support issues.
        </p>
        
        <div className="bg-amber-600/10 border border-amber-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-200 mb-2">Industry Impact</h4>
              <p className="text-amber-100 text-sm">
                Studies show that 60% of smart home user complaints stem from poor initial training rather than technical failures. 
                A proper handover is as important as the installation itself.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-foreground">Client Confidence</span>
            </div>
            <p className="text-gray-300 text-sm">Proper training builds user confidence and system satisfaction</p>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="font-medium text-foreground">Reduced Call-backs</span>
            </div>
            <p className="text-gray-300 text-sm">Effective training prevents unnecessary support visits and complaints</p>
          </div>

          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-foreground">Professional Reputation</span>
            </div>
            <p className="text-gray-300 text-sm">Quality handovers enhance installer reputation and referrals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section5Intro;