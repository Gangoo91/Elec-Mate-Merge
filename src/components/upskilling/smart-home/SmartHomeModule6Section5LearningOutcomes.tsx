import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SmartHomeModule6Section5LearningOutcomes = () => {
  const outcomes = [
    "Identify common causes of ecosystem conflicts in smart homes",
    "Explain how device compatibility, network stability, and hub choice affect performance", 
    "Apply a structured approach to diagnosing and fixing conflicts",
    "Advise clients on best practices to avoid future issues"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Learning Outcomes</h2>
        <p className="text-foreground mb-4">By the end of this section, you should be able to:</p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-elec-yellow text-elec-dark font-bold min-w-[24px] h-6 flex items-center justify-center text-sm">
                {index + 1}
              </Badge>
              <p className="text-foreground flex-1 leading-relaxed">{outcome}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section5LearningOutcomes;