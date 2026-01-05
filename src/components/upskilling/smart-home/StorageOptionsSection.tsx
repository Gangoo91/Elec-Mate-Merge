import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardDrive, Network, Cloud, CreditCard, Server, Layers } from 'lucide-react';

export const StorageOptionsSection = () => {
  const storageOptions = [
    {
      name: "Local DVR",
      icon: HardDrive,
      description: "Digital Video Recorder for analogue cameras, older systems",
      pros: ["No internet required", "One-time cost"],
      cons: ["Vulnerable to theft", "Limited remote access"]
    },
    {
      name: "NVR",
      icon: Network,
      description: "Network Video Recorder for IP cameras, connected via Ethernet/PoE",
      pros: ["Better image quality", "Remote access", "Scalable"],
      cons: ["More complex setup", "Network dependent"]
    },
    {
      name: "SD Cards",
      icon: CreditCard,
      description: "Built into some cameras, limited capacity",
      pros: ["Simple setup", "Camera-level storage"],
      cons: ["Limited capacity", "Vulnerable to theft"]
    },
    {
      name: "NAS",
      icon: Server,
      description: "Network Attached Storage - central storage, expandable",
      pros: ["Expandable capacity", "Network accessible", "Redundancy options"],
      cons: ["Higher cost", "Technical setup required"]
    },
    {
      name: "Cloud Storage",
      icon: Cloud,
      description: "Accessible anywhere, subscription-based",
      pros: ["Remote access", "Secure offsite storage", "No hardware maintenance"],
      cons: ["Ongoing costs", "Internet dependent", "Upload limitations"]
    },
    {
      name: "Hybrid Setup",
      icon: Layers,
      description: "Combination of local + cloud for resilience",
      pros: ["Best of both worlds", "Redundancy", "Flexible access"],
      cons: ["Higher complexity", "Combined costs"]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HardDrive className="h-6 w-6 text-elec-yellow" />
          Storage Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {storageOptions.map((option, index) => (
            <div key={index} className="bg-elec-gray rounded-lg p-4 border border-gray-600">
              <div className="flex items-start gap-3 mb-3">
                <option.icon className="h-5 w-5 text-elec-yellow mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold">{option.name}</h4>
                  <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-green-400 mb-1">Advantages:</p>
                  <div className="flex flex-wrap gap-1">
                    {option.pros.map((pro, idx) => (
                      <Badge key={idx} variant="outline" className="border-green-500/30 text-green-400 text-xs">
                        {pro}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-red-400 mb-1">Disadvantages:</p>
                  <div className="flex flex-wrap gap-1">
                    {option.cons.map((con, idx) => (
                      <Badge key={idx} variant="outline" className="border-red-500/30 text-red-400 text-xs">
                        {con}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};