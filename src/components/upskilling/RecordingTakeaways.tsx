
import { Lightbulb, FileText, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RecordingTakeaways = () => {
  const takeaways = [
    {
      icon: FileText,
      title: "Documentation Equals Legal Protection",
      description: "Recording visual inspection results is as important as doing the inspection itself",
      details: "Your documentation serves as legal evidence of your professional competence and due diligence. Poor records can invalidate insurance claims and create liability."
    },
    {
      icon: Shield,
      title: "Professional Language Matters",
      description: "Always use formal language and reference codes where applicable",
      details: "Vague descriptions like 'looks dodgy' have no professional or legal value. Use specific regulation references and clear technical language."
    },
    {
      icon: AlertTriangle,
      title: "Transparency Protects Everyone",
      description: "Document limitations and uncertainties—transparency protects you",
      details: "When you can't access areas or verify compliance, record this clearly. Honesty about limitations is better than assumptions about compliance."
    },
    {
      icon: CheckCircle,
      title: "Legal Record Standard",
      description: "The certificate or report may become a legal record. Treat it accordingly",
      details: "Write every entry as if it will be scrutinised in court. Use factual, objective language and ensure all observations are complete and accurate."
    }
  ];

  const documentationRules = [
    "Never assume compliance - only record what you can personally verify",
    "Use specific regulation references (e.g., BS 7671 Regulation 411.3.3)",
    "Apply observation codes consistently (C1, C2, C3, FI)",
    "Record all limitations and explain their impact on the inspection",
    "Write in clear, unambiguous technical language",
    "Complete all documentation before leaving site"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {takeaways.map((takeaway, index) => {
            const IconComponent = takeaway.icon;
            return (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <div className="flex items-start gap-3 mb-3">
                  <IconComponent className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">{takeaway.title}</h3>
                    <p className="text-elec-yellow text-sm font-medium">{takeaway.description}</p>
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{takeaway.details}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
          <h3 className="text-blue-200 font-semibold text-lg mb-4">Documentation Golden Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentationRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-foreground text-sm leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h3 className="text-red-200 font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Critical Warning
          </h3>
          <p className="text-foreground text-sm leading-relaxed">
            <strong>Incomplete or inaccurate documentation can result in:</strong> Professional liability claims, 
            insurance policy voidance, regulatory sanctions, criminal charges, and serious reputational damage. 
            Never compromise on documentation quality - your career depends on it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
