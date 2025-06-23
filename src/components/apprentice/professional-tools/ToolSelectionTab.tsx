
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Star, AlertTriangle, TrendingUp, Info } from "lucide-react";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";

const ToolSelectionTab = () => {
  const selectionCriteria = [
    {
      category: "Quality Standards",
      icon: <Star className="h-5 w-5" />,
      items: [
        "Look for tools with CE marking and relevant British Standards",
        "Check warranty periods - quality tools typically offer 2-5 years",
        "Read professional reviews and recommendations",
        "Consider tools used by established electricians"
      ]
    },
    {
      category: "Budget Planning",
      icon: <TrendingUp className="h-5 w-5" />,
      items: [
        "Prioritise safety-critical items (test equipment, PPE)",
        "Buy quality hand tools first - they last decades",
        "Consider second-hand power tools from reputable brands",
        "Plan purchases over 12-18 months to spread costs"
      ]
    },
    {
      category: "Common Mistakes",
      icon: <AlertTriangle className="h-5 w-5" />,
      items: [
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
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Smart tool selection saves money and ensures you have reliable equipment for your electrical career.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {selectionCriteria.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                {section.icon}
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Smart Buying Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyingTips.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-green-500/20 rounded-lg">
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

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Remember:</strong> Quality tools are a long-term investment. A well-chosen toolkit will serve you throughout your entire electrical career.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ToolSelectionTab;
