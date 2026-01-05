import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, CheckCircle } from 'lucide-react';

const SmartHomeModule7Section1Summary = () => {
  const summaryPoints = [
    {
      title: "Device Voltage Requirements",
      description: "Smart home devices may require low-voltage DC or mains AC wiring - always verify specifications"
    },
    {
      title: "Power Supply Selection",
      description: "Correct power supply selection prevents overload and device failure - consider standby consumption"
    },
    {
      title: "Cable Containment",
      description: "Containment protects cables, ensures safety, and maintains a professional finish"
    },
    {
      title: "BS 7671 Compliance",
      description: "Compliance with UK wiring regulations is essential for safety and legal standards"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileCheck className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 mb-6">
          This section covered the essential aspects of device wiring, power supplies, and containment 
          for smart home installations. Here are the key takeaways:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaryPoints.map((point, index) => (
            <div key={index} className="bg-elec-dark/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{point.title}</h4>
                  <p className="text-gray-300 text-sm">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-elec-yellow mb-3">Key Takeaway</h4>
          <p className="text-gray-300 text-sm">
            Professional smart home installation requires thorough understanding of device requirements, 
            proper power supply selection, effective cable management, and strict adherence to BS 7671. 
            Taking shortcuts leads to system failures, safety risks, and costly callbacks. Always prioritise 
            safety, compliance, and professional workmanship.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section1Summary;