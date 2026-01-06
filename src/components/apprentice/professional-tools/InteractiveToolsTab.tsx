
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, CheckSquare, FileText, Wrench, Info } from "lucide-react";
import ToolBudgetCalculator from "./ToolBudgetCalculator";
import ToolChecklistGenerator from "./ToolChecklistGenerator";

const InteractiveToolsTab = () => {
  const toolSummary = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Budget Calculator",
      description: "Plan your tool investments",
      color: "elec-yellow"
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      title: "Checklist Generator",
      description: "Create custom tool lists",
      color: "blue-500"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation",
      description: "Track purchases & warranties",
      color: "green-500"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Wrench className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-purple-400 mb-1">Interactive Tools</p>
            <p className="text-sm text-white/70">
              Use these tools to plan your toolkit investment and create project-specific equipment lists.
            </p>
          </div>
        </div>
      </div>

      {/* Tool Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {toolSummary.map((tool, index) => {
          const colorClasses = {
            'elec-yellow': {
              border: 'border-elec-yellow/20 hover:border-elec-yellow/40',
              bg: 'from-elec-gray to-elec-card',
              icon: 'from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30',
              iconColor: 'text-elec-yellow'
            },
            'blue-500': {
              border: 'border-blue-500/20 hover:border-blue-500/40',
              bg: 'from-elec-gray to-elec-card',
              icon: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
              iconColor: 'text-blue-400'
            },
            'green-500': {
              border: 'border-green-500/20 hover:border-green-500/40',
              bg: 'from-elec-gray to-elec-card',
              icon: 'from-green-500/20 to-green-500/5 border-green-500/30',
              iconColor: 'text-green-400'
            }
          };
          const classes = colorClasses[tool.color as keyof typeof colorClasses];

          return (
            <Card key={index} className={`bg-gradient-to-br ${classes.bg} ${classes.border} transition-all overflow-hidden relative group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${tool.color}/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardContent className="p-5 relative">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${classes.icon} border mb-3`}>
                    <div className={classes.iconColor}>{tool.icon}</div>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                  <p className="text-sm text-white/60">{tool.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Budget Calculator */}
      <ToolBudgetCalculator />

      {/* Checklist Generator */}
      <ToolChecklistGenerator />

      {/* Additional Info */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-blue-400 mb-1">Pro Tip</p>
            <p className="text-sm text-white/70">
              Download your checklists before heading to site to ensure you have all necessary tools. Update your budget calculator as your toolkit grows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveToolsTab;
