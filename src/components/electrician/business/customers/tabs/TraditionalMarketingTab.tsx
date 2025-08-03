import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Megaphone, Car, Users, Handshake, MapPin } from "lucide-react";

const TraditionalMarketingTab = () => {
  const isMobile = useIsMobile();

  const traditionalMetrics = [
    {
      metric: "Vehicle Advertising ROI",
      data: "1000+ daily impressions per vehicle",
      icon: <Car className="h-5 w-5 text-orange-400" />,
      detail: "Mobile advertising with professional livery"
    },
    {
      metric: "Referral Conversion Rate",
      data: "65-85% close rate from referrals",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Word-of-mouth remains highest converting channel"
    },
    {
      metric: "Local Networking Value",
      data: "£500-2000 per business connection",
      icon: <Handshake className="h-5 w-5 text-blue-400" />,
      detail: "Trade partnerships and local business relationships"
    },
    {
      metric: "Community Presence Impact",
      data: "25-40% brand recognition increase",
      icon: <MapPin className="h-5 w-5 text-purple-400" />,
      detail: "Local sponsorship and community involvement"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-orange-400/50 bg-orange-400/10">
        <Megaphone className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-400">
          Traditional marketing methods remain highly effective for local electrical contractors.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {traditionalMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="vehicle">
          <MobileAccordionTrigger icon={<Car className="h-5 w-5 text-orange-400" />}>
            Vehicle Branding & Mobile Advertising
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Your vehicles serve as mobile billboards, providing continuous exposure to potential customers.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Professional Vehicle Livery</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Company name and logo prominently displayed</li>
                    <li>• Contact phone number in large, readable font</li>
                    <li>• Website URL and email address</li>
                    <li>• Service area coverage information</li>
                    <li>• Professional certifications displayed</li>
                    <li>• Emergency service availability</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Brand Consistency</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Consistent colour scheme across fleet</li>
                    <li>• Professional design quality</li>
                    <li>• Weather-resistant materials</li>
                    <li>• Regular maintenance and cleaning</li>
                    <li>• Reflective elements for safety</li>
                    <li>• QR codes for digital integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default TraditionalMarketingTab;