import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Shield } from 'lucide-react';

const BS7671Module5Section6Summary = () => {
  const keyPoints = [
    "Environmental protection is mandatory under BS7671 Chapter 51",
    "Use BS7671 environmental codes (AD, AE, AF, AG, AH, etc.) to classify conditions",
    "IP ratings must match the environmental risks present",
    "Temperature affects cable ratings - apply derating factors from Appendix 4",
    "Fire resistance requirements are specified in Chapter 52",
    "Corrosive environments require special cable selection and protection",
    "Document all environmental assessments and protection measures",
    "Regular inspection and maintenance preserves environmental protection"
  ];

  const regulations = [
    { ref: "512.2", desc: "Equipment selection for environmental conditions" },
    { ref: "522.3", desc: "Protection against mechanical damage" },
    { ref: "522.4", desc: "Protection against impact" },
    { ref: "522.5", desc: "Protection against vibration" },
    { ref: "522.8", desc: "Protection against corrosion" },
    { ref: "526", desc: "Electrical connections in adverse conditions" },
    { ref: "527", desc: "Selection and erection to minimise fire spread" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Points Summary */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Section Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4">
          <p>
            Environmental protection is a fundamental requirement of BS7671, ensuring electrical installations 
            remain safe and functional throughout their operational life. Key takeaways from this section:
          </p>
          
          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="bg-green-950/20 p-4 rounded-lg border border-green-800/30 mt-6">
            <h4 className="font-semibold text-green-400 mb-2">Remember</h4>
            <p className="text-gray-300 text-sm">
              Environmental protection is not optional - it's a legal requirement under BS7671. 
              Proper assessment and implementation protects both the installation and its users.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key BS7671 Regulations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Key BS7671 Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4">
          <p>
            These BS7671 regulations are particularly relevant to environmental protection requirements:
          </p>
          
          <div className="grid gap-3">
            {regulations.map((reg, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-elec-dark rounded-lg border border-gray-600">
                <div className="bg-elec-yellow text-elec-dark px-2 py-1 rounded text-sm font-bold">
                  {reg.ref}
                </div>
                <span>{reg.desc}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-950/20 p-4 rounded-lg border border-blue-800/30 mt-6">
            <h4 className="font-semibold text-blue-400 mb-2">Professional Development</h4>
            <p className="text-gray-300 text-sm">
              Regular review of BS7671 amendments and IET Guidance Notes ensures you stay current 
              with evolving environmental protection requirements and best practices.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671Module5Section6Summary;