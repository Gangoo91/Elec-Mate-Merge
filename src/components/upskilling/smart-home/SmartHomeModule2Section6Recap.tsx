import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GitBranch, CheckCircle, Map, TrendingUp } from 'lucide-react';

export const SmartHomeModule2Section6Recap = () => {
  const keyPoints = [
    {
      title: "Compatibility Definition",
      icon: CheckCircle,
      description: "Ability of devices to work together within an ecosystem, controlled by protocols and platforms"
    },
    {
      title: "Compatibility Mapping",
      icon: Map,
      description: "Pre-installation research to ensure device integration, checking protocols, certifications, and ecosystem support"
    },
    {
      title: "Bridge Functionality",
      icon: GitBranch,
      description: "Hardware/software translators enabling communication between different protocols and ecosystems"
    },
    {
      title: "Implementation Challenges",
      icon: TrendingUp,
      description: "Added complexity, latency, single points of failure, and technical knowledge requirements"
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Recap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground text-sm leading-relaxed">
          This section covered the critical challenges of device compatibility in smart homes and the solutions that bridges provide. 
          Understanding these concepts is essential for successful smart home installations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyPoints.map((point, index) => (
            <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <point.icon className="h-5 w-5 text-elec-yellow" />
                <h4 className="text-foreground font-semibold text-sm">{point.title}</h4>
              </div>
              <p className="text-foreground text-xs leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-3">Key Takeaways</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-blue-100">Always research compatibility before purchasing devices</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-blue-100">Bridges enable integration but add complexity and potential failure points</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-blue-100">Matter protocol promises to reduce bridge dependency in the future</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-blue-100">Practical implementation requires careful planning and troubleshooting skills</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-900/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-200 font-semibold mb-2">Next Steps</h4>
          <p className="text-purple-100 text-sm">
            With this understanding of compatibility and bridges, you're ready to move on to more advanced smart home concepts 
            in Module 3, where we'll explore automation strategies and advanced system integration techniques.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};