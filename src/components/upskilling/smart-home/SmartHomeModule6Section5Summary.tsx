import { Card, CardContent } from '@/components/ui/card';

const SmartHomeModule6Section5Summary = () => {
  const summaryPoints = [
    {
      title: "Ecosystem conflicts are common in multi-brand systems",
      description: "Different protocols, proprietary ecosystems, and cloud dependencies create integration challenges"
    },
    {
      title: "Symptoms include device unresponsiveness and partial routine failures", 
      description: "Conflicts manifest as unreliable operation, duplicate app entries, and performance degradation"
    },
    {
      title: "Systematic troubleshooting resolves most conflicts",
      description: "Five-step approach: check compatibility, test connections, simplify, reset, and update"
    },
    {
      title: "Prevention through design is most effective",
      description: "Choose one primary ecosystem, use certified devices, minimise hubs, and document systems"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Summary</h2>
        </div>
        
        <div className="space-y-4">
          {summaryPoints.map((point, index) => (
            <div key={index} className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="bg-elec-yellow text-elec-dark font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{point.title}</h3>
                  <p className="text-foreground text-sm leading-relaxed">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Takeaway</h3>
          <p className="text-foreground text-sm leading-relaxed">
            Successful ecosystem conflict resolution requires understanding the root causes, applying systematic 
            troubleshooting methods, and designing systems for compatibility from the start. Electricians who 
            master these skills can deliver reliable smart home installations that maintain client confidence 
            and reduce long-term support requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section5Summary;