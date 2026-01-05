import { TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const NetworkSpeedIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Introduction to Network Speed & Future Proofing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-300">
        <p className="leading-relaxed">
          Network speed, bandwidth, and future proofing are critical considerations in modern network design. 
          As organisations increasingly rely on digital communications, cloud services, and data-intensive 
          applications, understanding performance requirements becomes essential for long-term success.
        </p>
        
        <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Planning for Tomorrow, Today</h4>
              <p className="text-purple-100 text-sm leading-relaxed">
                Future proofing involves designing networks that can accommodate growing bandwidth demands, 
                emerging technologies, and changing business requirements without requiring complete infrastructure 
                overhauls. This approach maximises return on investment and ensures network longevity.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};