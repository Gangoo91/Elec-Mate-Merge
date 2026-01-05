import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const BS7671Module5Section6Intro = () => {
  const learningOutcomes = [
    "Apply BS7671 Chapter 51 requirements for environmental conditions",
    "Select appropriate IP ratings for different installation environments", 
    "Understand environmental condition codes (AD, AE, AF, AG, AH, AK, AL, AM, AN, AP)",
    "Determine fire resistance requirements according to BS7671 Chapter 52",
    "Select cables and wiring systems for harsh environmental conditions",
    "Apply corrosion protection measures in accordance with BS7671",
    "Understand installation methods for extreme temperature environments",
    "Assess environmental risks and implement appropriate protection measures"
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Introduction</CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4">
          <p>
            BS7671 Chapter 51 sets out comprehensive requirements for protecting electrical installations 
            from environmental influences. This section covers the critical aspects of environmental 
            protection that every electrician must understand to ensure safe, compliant installations.
          </p>
          <p>
            Environmental protection encompasses IP ratings, fire resistance, temperature considerations, 
            chemical exposure, mechanical stress, and moisture protection. Understanding these requirements 
            is essential for proper cable selection, installation methods, and long-term system reliability.
          </p>
          <div className="bg-blue-950/20 p-4 rounded-lg border border-blue-800/30">
            <h4 className="font-semibold text-blue-400 mb-2">BS7671 Reference</h4>
            <p className="text-gray-300 text-sm">
              This content aligns with BS7671:2018+A2:2022 Chapter 51 (Selection and erection of equipment - Common rules) 
              and Chapter 52 (Selection and erection of wiring systems).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground">
          <p className="mb-4">By the end of this section, you should be able to:</p>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671Module5Section6Intro;