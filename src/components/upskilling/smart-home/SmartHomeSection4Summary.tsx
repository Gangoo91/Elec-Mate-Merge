import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Check } from 'lucide-react';

export const SmartHomeSection4Summary = () => {
  const keyPoints = [
    "Local architectures process everything within the home for maximum speed, privacy, and offline operation",
    "Cloud architectures offer easy setup and advanced features but depend entirely on internet connectivity", 
    "Hybrid architectures combine local reliability with cloud convenience, ideal for complex installations",
    "Architecture choice depends on priorities: speed vs convenience, privacy vs features, control vs simplicity",
    "Future developments like edge computing and Matter protocol will blur architectural boundaries",
    "Migration between architectures is possible but requires planning and compatible devices"
  ];

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          Smart home architectures represent fundamental design decisions that affect every aspect of system performance, 
          from response times and reliability to privacy and ease of use. Understanding these trade-offs enables informed 
          choices that match specific needs and priorities.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Key Takeaways:</h4>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
          <p className="text-gray-300 text-sm">
            <strong className="text-foreground">Next:</strong> In Section 5, we'll explore smart home protocols and communication 
            standards that enable device interoperability across these different architectural approaches.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};