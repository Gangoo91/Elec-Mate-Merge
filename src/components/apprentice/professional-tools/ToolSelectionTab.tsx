
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, AlertTriangle, TrendingUp } from "lucide-react";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";

const ToolSelectionTab = () => {
  const selectionCriteria = [
    {
      title: "Quality Standards",
      icon: Star,
      criteria: [
        "Look for tools with CE marking and relevant British Standards",
        "Check warranty periods - quality tools typically offer 2-5 years",
        "Read professional reviews and recommendations",
        "Consider tools used by established electricians"
      ]
    },
    {
      title: "Budget Planning",
      icon: TrendingUp,
      criteria: [
        "Prioritise safety-critical items (test equipment, PPE)",
        "Buy quality hand tools first - they last decades",
        "Consider second-hand power tools from reputable brands",
        "Plan purchases over 12-18 months to spread costs"
      ]
    },
    {
      title: "Common Mistakes",
      icon: AlertTriangle,
      criteria: [
        "Don't buy cheap test equipment - it's a safety risk",
        "Avoid complete tool sets - you'll rarely use everything",
        "Don't prioritise appearance over functionality",
        "Never compromise on PPE quality to save money"
      ]
    }
  ];

  const buyingTips = [
    { tip: "Start with apprentice tool lists from training providers", priority: "High" },
    { tip: "Join electrician forums for real-world recommendations", priority: "Medium" },
    { tip: "Visit trade shows for hands-on experience", priority: "Medium" },
    { tip: "Consider tool financing options for expensive items", priority: "Low" },
    { tip: "Build relationships with local tool suppliers", priority: "High" },
    { tip: "Keep receipts and warranty information organised", priority: "High" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Tool Selection Criteria</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectionCriteria.map((section, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <section.icon className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-white">{section.title}</h4>
                </div>
                <ul className="space-y-2">
                  {section.criteria.map((criterion, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Smart Buying Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyingTips.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-blue-500/20 rounded-lg">
                <span className="text-sm text-muted-foreground">{item.tip}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    item.priority === 'High' ? 'border-green-500/40 text-green-400' :
                    item.priority === 'Medium' ? 'border-yellow-500/40 text-yellow-400' :
                    'border-gray-500/40 text-gray-400'
                  }`}
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RecommendedBrands />
    </div>
  );
};

export default ToolSelectionTab;
