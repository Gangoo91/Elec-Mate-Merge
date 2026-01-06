
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle, Clock, Users, FileText, AlertTriangle, Lightbulb, Shield
} from "lucide-react";

const AssessmentBestPractices = () => {
  const practices = [
    {
      title: "Before Starting Work",
      icon: CheckCircle,
      color: "green",
      items: [
        "Always complete pre-job assessment",
        "Verify all safety equipment is available",
        "Review method statements and risk assessments",
        "Ensure communication plan is in place",
        "Check weather conditions and forecasts"
      ]
    },
    {
      title: "During Assessment",
      icon: Clock,
      color: "blue",
      items: [
        "Document all findings clearly",
        "Take photographs where appropriate",
        "Involve experienced colleagues when uncertain",
        "Don't proceed if conditions are unsafe",
        "Regular reassessment as work progresses"
      ]
    },
    {
      title: "Team Communication",
      icon: Users,
      color: "yellow",
      items: [
        "Share assessment findings with all team members",
        "Ensure everyone understands the risks",
        "Establish clear communication protocols",
        "Regular safety briefings throughout the day",
        "Encourage team members to raise concerns"
      ]
    },
    {
      title: "Documentation",
      icon: FileText,
      color: "purple",
      items: [
        "Complete all required forms accurately",
        "Store digital copies securely",
        "Include relevant photos and measurements",
        "Note any unusual conditions or findings",
        "Ensure assessments are signed and dated"
      ]
    }
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' }
    };
    return configs[color] || configs.green;
  };

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
          </div>
          Assessment Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practices.map((practice, index) => {
            const colorConfig = getColorConfig(practice.color);
            const PracticeIcon = practice.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border}`}>
                    <PracticeIcon className={`h-5 w-5 ${colorConfig.text}`} />
                  </div>
                  <h3 className="font-semibold text-white">{practice.title}</h3>
                </div>
                <ul className="space-y-2">
                  {practice.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <span className={`w-1.5 h-1.5 ${colorConfig.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Warning Banner */}
        <Card className="bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/30">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20 flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-300 mb-2">When in Doubt, Stop and Ask</h3>
                <p className="text-sm text-white/70">
                  If you're unsure about any aspect of the site assessment, don't proceed.
                  Contact your supervisor, mentor, or a qualified electrician for guidance.
                  It's always better to ask questions than to compromise safety.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AssessmentBestPractices;
