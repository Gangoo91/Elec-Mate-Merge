import { RotateCcw, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section5Recap = () => {
  const keyPoints = [
    {
      topic: "Hub Definition",
      summary: "Central device that coordinates communication, bridges protocols, and runs local automation",
      importance: "Foundation of reliable smart home architecture"
    },
    {
      topic: "Hub Advantages",
      summary: "Local control, better scalability, mesh networking, protocol interoperability",
      importance: "Critical for medium-large installations (10+ devices)"
    },
    {
      topic: "Hubless Benefits",
      summary: "Simple setup, lower initial cost, no additional hardware required",
      importance: "Perfect for small-scale implementations (1-10 devices)"
    },
    {
      topic: "Scalability Limits",
      summary: "Wi-Fi congestion becomes problematic beyond 15-20 smart devices",
      importance: "Key decision factor for system architecture choice"
    },
    {
      topic: "Hybrid Approaches",
      summary: "Combining hub reliability with cloud convenience and voice integration",
      importance: "Best of both worlds for comprehensive systems"
    },
    {
      topic: "Future Evolution",
      summary: "Matter standard reducing hub dependency while edge computing enhances local processing",
      importance: "Informs long-term planning and investment decisions"
    }
  ];

  const decisionMatrix = [
    {
      factor: "Installation Size",
      small: "Hubless suitable",
      medium: "Hub recommended", 
      large: "Hub essential"
    },
    {
      factor: "Technical Expertise",
      small: "Basic setup skills",
      medium: "Moderate networking knowledge",
      large: "Professional installation"
    },
    {
      factor: "Budget Priority",
      small: "Low initial cost",
      medium: "Balanced investment",
      large: "Long-term value"
    },
    {
      factor: "Reliability Needs",
      small: "Cloud dependency OK",
      medium: "Local backup preferred",
      large: "Local control essential"
    }
  ];

  const learningCheckpoints = [
    "Can explain the role of a hub in smart home ecosystems",
    "Understand the trade-offs between hub-based and hubless systems",
    "Can recommend appropriate architecture based on project requirements",
    "Recognize the limitations of Wi-Fi-only implementations at scale",
    "Appreciate the benefits of hybrid approaches",
    "Aware of future trends affecting hub necessity"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-elec-yellow" />
          Section Recap: Hub vs Hubless Decision Making
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          This section covered the fundamental architectural choice between hub-based and hubless smart home systems. 
          Understanding this decision is crucial for designing appropriate solutions for different client needs.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {keyPoints.map((point, index) => (
            <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">{point.topic}</h4>
              <p className="text-sm text-foreground mb-2">{point.summary}</p>
              <p className="text-xs text-blue-300 italic">Why it matters: {point.importance}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3">Decision Matrix Summary</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-foreground">Factor</th>
                  <th className="text-left p-2 text-foreground">Small Scale</th>
                  <th className="text-left p-2 text-foreground">Medium Scale</th>
                  <th className="text-left p-2 text-foreground">Large Scale</th>
                </tr>
              </thead>
              <tbody>
                {decisionMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2 font-medium text-foreground">{row.factor}</td>
                    <td className="p-2 text-green-300">{row.small}</td>
                    <td className="p-2 text-yellow-300">{row.medium}</td>
                    <td className="p-2 text-blue-300">{row.large}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Checkpoint Assessment
          </h4>
          <p className="text-sm text-foreground mb-3">
            Verify your understanding by confirming you can accomplish each of these objectives:
          </p>
          <ul className="space-y-2">
            {learningCheckpoints.map((checkpoint, index) => (
              <li key={index} className="text-sm text-foreground flex items-start gap-3">
                <input type="checkbox" className="rounded border-gray-600 bg-transparent mt-0.5" />
                <span>{checkpoint}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-3">Key Installer Takeaways</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">For Small Projects (1-10 devices)</h5>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Hubless is often sufficient and cost-effective</li>
                <li>• Focus on strong Wi-Fi coverage</li>
                <li>• Consider future expansion plans</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">For Large Projects (10+ devices)</h5>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Hub-based architecture is essential</li>
                <li>• Plan for mesh networking and redundancy</li>
                <li>• Implement proper network segmentation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Next Steps:</h4>
          <p className="text-sm text-foreground">
            Now that you understand hub vs hubless architectures, the next section will cover compatibility mapping 
            and how to bridge different protocols and legacy systems in mixed environments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};