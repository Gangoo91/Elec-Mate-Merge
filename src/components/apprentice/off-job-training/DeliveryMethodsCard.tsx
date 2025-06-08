
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Monitor, BookOpen, MapPin, Smartphone } from "lucide-react";

const DeliveryMethodsCard = () => {
  const deliveryMethods = [
    {
      method: "Face-to-Face Learning",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      description: "Traditional classroom or workshop-based learning",
      examples: ["College attendance", "Training centre workshops", "Skills demonstrations"],
      pros: ["Direct interaction with tutors", "Hands-on practice", "Peer learning"],
      timeAllocation: "60-80% typical"
    },
    {
      method: "Online Learning",
      icon: <Monitor className="h-5 w-5 text-green-400" />,
      description: "Digital platforms and e-learning modules",
      examples: ["LMS courses", "Virtual classrooms", "Interactive simulations"],
      pros: ["Flexible scheduling", "Self-paced learning", "Accessible anywhere"],
      timeAllocation: "20-40% typical"
    },
    {
      method: "Blended Learning",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
      description: "Combination of face-to-face and online methods",
      examples: ["Flipped classroom", "Pre-session online prep", "Post-session follow-up"],
      pros: ["Best of both worlds", "Reinforced learning", "Flexible delivery"],
      timeAllocation: "Most common approach"
    },
    {
      method: "Mobile Learning",
      icon: <Smartphone className="h-5 w-5 text-orange-400" />,
      description: "Learning through mobile devices and apps",
      examples: ["Training apps", "Mobile quizzes", "Video tutorials"],
      pros: ["Learn on-the-go", "Bite-sized content", "Always available"],
      timeAllocation: "Supplementary"
    },
    {
      method: "Field Visits",
      icon: <MapPin className="h-5 w-5 text-red-400" />,
      description: "Educational visits to industry sites",
      examples: ["Factory tours", "Site visits", "Trade exhibitions"],
      pros: ["Real-world context", "Industry exposure", "Networking opportunities"],
      timeAllocation: "5-10% typical"
    },
    {
      method: "Project-Based Learning",
      icon: <Clock className="h-5 w-5 text-cyan-400" />,
      description: "Learning through practical projects and assignments",
      examples: ["Design projects", "Case studies", "Research assignments"],
      pros: ["Applied learning", "Problem-solving skills", "Portfolio building"],
      timeAllocation: "20-30% typical"
    }
  ];

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
      <CardHeader>
        <CardTitle className="text-blue-400">Training Delivery Methods</CardTitle>
        <p className="text-sm text-muted-foreground">
          Understanding different ways off-the-job training can be delivered
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveryMethods.map((method, index) => (
            <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3 mb-3">
                {method.icon}
                <h4 className="font-medium text-white">{method.method}</h4>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                  {method.timeAllocation}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-medium text-blue-400">Examples:</span>
                  <ul className="text-xs text-muted-foreground mt-1">
                    {method.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-blue-400">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-green-400">Benefits:</span>
                  <ul className="text-xs text-muted-foreground mt-1">
                    {method.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-green-400">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryMethodsCard;
