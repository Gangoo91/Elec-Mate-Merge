
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuccessCaseStudies = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Success Case Studies</CardTitle>
        <CardDescription>How UK electrical contractors turned customer acquisition strategies into business growth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-elec-yellow">London Electrical Solutions</h4>
          <p className="text-sm">From a sole trader to a team of five electricians in two years by specialising in smart home installations and security systems. Created video content demonstrating system capabilities which generated consistent enquiries.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-elec-yellow">Northern Emergency Electricians</h4>
          <p className="text-sm">Built a 24/7 emergency service business by developing partnerships with property management companies and insurance providers. Implemented an online booking system with real-time availability that converted at 32% versus 18% for phone enquiries.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-elec-yellow">Midlands Commercial Electrical</h4>
          <p className="text-sm">Grew commercial client base by 40% in 12 months through a targeted LinkedIn campaign focusing on facilities managers. Offered free electrical safety seminars to potential clients which established them as industry authorities.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCaseStudies;
