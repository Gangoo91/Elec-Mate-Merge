import { Key, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const NetworkSpeedTakeaways = () => {
  const takeaways = [
    {
      title: "Plan for 10x Growth Every 5 Years",
      description: "Network bandwidth requirements historically double every 2-3 years. Planning for 10x growth over 5 years provides adequate headroom for most scenarios."
    },
    {
      title: "Infrastructure Lasts Longer Than Equipment",
      description: "Passive cabling infrastructure typically lasts 15-25 years, whilst active equipment needs replacement every 3-7 years. Invest in higher-grade cabling."
    },
    {
      title: "Applications Drive Requirements",
      description: "Understanding your organisation&apos;s application mix and growth plans is essential for accurate bandwidth planning and future-proofing decisions."
    },
    {
      title: "Peak Usage Planning is Critical",
      description: "Networks must handle peak concurrent usage, not average usage. Plan for worst-case scenarios to ensure acceptable performance."
    },
    {
      title: "Future-Proofing Reduces Total Cost",
      description: "Investing in higher-capacity infrastructure initially costs more but avoids multiple disruptive upgrades and reduces long-term expenses."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Key className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {takeaways.map((takeaway, index) => (
          <div key={index} className="bg-slate-800/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">{takeaway.title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{takeaway.description}</p>
          </div>
        ))}
        
        <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Remember</h4>
              <p className="text-yellow-100 text-sm leading-relaxed">
                Network speed is not just about the numbers on paper. Real-world performance depends on 
                many factors including application behaviour, network design, equipment quality, and usage 
                patterns. The goal is to design networks that deliver consistent, reliable performance 
                for current needs whilst being ready for future demands.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};