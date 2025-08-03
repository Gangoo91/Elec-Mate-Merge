import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Monitor, Globe, Search, Facebook, Instagram, Smartphone, TrendingUp, Users } from "lucide-react";

const DigitalMarketingTab = () => {
  const isMobile = useIsMobile();

  const digitalMetrics = [
    {
      metric: "Local SEO Ranking",
      data: "Top 3 Google results achievable",
      icon: <Search className="h-5 w-5 text-purple-400" />,
      detail: "With proper optimisation and local content strategy"
    },
    {
      metric: "Social Media ROI",
      data: "250-400% return on ad spend",
      icon: <Facebook className="h-5 w-5 text-blue-400" />,
      detail: "Targeted local Facebook and Instagram campaigns"
    },
    {
      metric: "Website Conversion Rate",
      data: "3-7% visitor to enquiry rate",
      icon: <Monitor className="h-5 w-5 text-green-400" />,
      detail: "Well-optimised electrical contractor websites"
    },
    {
      metric: "Digital Lead Quality",
      data: "60-80% higher than traditional",
      icon: <TrendingUp className="h-5 w-5 text-orange-400" />,
      detail: "Digital leads typically better qualified"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-purple-400/50 bg-purple-400/10">
        <Monitor className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-400">
          Digital marketing can reduce customer acquisition costs by 50-70% compared to traditional advertising methods.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {digitalMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="website">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-purple-400" />}>
            Professional Website Development
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                A professional website serves as your digital business card and primary lead generation tool.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Essential Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Mobile-responsive design</li>
                    <li>• Clear service descriptions</li>
                    <li>• Contact forms and phone numbers</li>
                    <li>• Customer testimonials</li>
                    <li>• Professional photography</li>
                    <li>• Certificate displays</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Conversion Optimisation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Prominent call-to-action buttons</li>
                    <li>• Emergency contact information</li>
                    <li>• Service area maps</li>
                    <li>• Online booking systems</li>
                    <li>• Live chat functionality</li>
                    <li>• Trust signals</li>
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

export default DigitalMarketingTab;