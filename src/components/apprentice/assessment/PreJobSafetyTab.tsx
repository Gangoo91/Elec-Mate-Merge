
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare, Shield, AlertTriangle, Download, Clock, FileText,
  CheckCircle, Zap, HardHat, Eye, Wrench, Phone, Flame
} from "lucide-react";
import { useState } from "react";

const PreJobSafetyTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const safetyChecklist = [
    {
      category: "Personal Protective Equipment",
      icon: HardHat,
      color: "green",
      items: [
        "Hard hat - BS EN 397 compliant with electrical protection",
        "Safety glasses - BS EN 166 impact resistant",
        "Insulated gloves - voltage rated for the task",
        "Safety boots - BS EN ISO 20345 with electrical protection",
        "High-visibility clothing - appropriate to site requirements",
        "Hearing protection if required for noisy environments",
        "Respiratory protection for dusty conditions"
      ]
    },
    {
      category: "Electrical Safety Equipment",
      icon: Zap,
      color: "yellow",
      items: [
        "Voltage indicator/tester calibrated and functioning",
        "Lock-off devices available and in good condition",
        "Prove dead device tested before and after use",
        "GS38 compliant test leads and probes",
        "Insulated tools rated for working voltage",
        "Emergency contact numbers readily available",
        "First aid kit with electrical injury procedures"
      ]
    },
    {
      category: "Work Environment Assessment",
      icon: Eye,
      color: "blue",
      items: [
        "Adequate lighting for the work area",
        "Weather conditions suitable for electrical work",
        "Work area clear of water and moisture",
        "Access routes safe and unobstructed",
        "Emergency evacuation route identified",
        "Fire extinguisher location noted",
        "Ventilation adequate for the work being undertaken"
      ]
    },
    {
      category: "Documentation & Communication",
      icon: FileText,
      color: "purple",
      items: [
        "Method statement reviewed and understood",
        "Risk assessment completed and communicated",
        "Permit to work obtained if required",
        "All team members briefed on safety procedures",
        "Supervisor contact details confirmed",
        "Site induction completed",
        "Insurance and certification documents available"
      ]
    },
    {
      category: "Tool and Equipment Check",
      icon: Wrench,
      color: "orange",
      items: [
        "All tools PAT tested and in date",
        "Extension leads and portable equipment checked",
        "Ladder inspection completed if required",
        "Scaffolding certification checked",
        "Vehicle safety check completed",
        "Material handling equipment inspected",
        "Communication devices tested and charged"
      ]
    }
  ];

  const safetyTips = [
    {
      title: "Safe Isolation Procedure",
      content: "Always follow the 7-step safe isolation procedure: 1) Identify 2) Isolate 3) Secure 4) Test dead 5) Re-test tester 6) Issue permit 7) Begin work",
      icon: Zap,
      color: "yellow"
    },
    {
      title: "Emergency Procedures",
      content: "Know the emergency contact numbers, location of first aid equipment, and evacuation procedures. Report any incidents immediately.",
      icon: Phone,
      color: "red"
    },
    {
      title: "Weather Considerations",
      content: "Do not work on outdoor electrical installations during wet weather, high winds, or electrical storms. Monitor weather conditions throughout the day.",
      icon: AlertTriangle,
      color: "blue"
    }
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', iconBg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30' },
      red: { bg: 'bg-red-500/10', text: 'text-red-400', iconBg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30' }
    };
    return configs[color] || configs.yellow;
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const totalItems = safetyChecklist.reduce((total, cat) => total + cat.items.length, 0);
  const completionRate = (checkedItems.length / totalItems) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Shield className="h-7 w-7 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                  Pre-Job <span className="text-elec-yellow">Safety Assessment</span>
                </CardTitle>
                <p className="text-sm text-white/60 mt-1">
                  Electricity at Work Regulations 1989 & CDM 2015
                </p>
              </div>
            </div>
            <Badge className={`
              ${completionRate === 100 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30'}
              text-sm px-3 py-1
            `}>
              {Math.round(completionRate)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70 mb-6">
            Complete this comprehensive safety checklist before starting any electrical work.
            Each item must be verified to ensure a safe working environment.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-elec-yellow mb-1">
                {checkedItems.length}
              </div>
              <div className="text-xs text-white/60">Checked</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
                {totalItems}
              </div>
              <div className="text-xs text-white/60">Total Items</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-xs text-white/60 mt-1">15-20 mins</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-white/60">
              <span>Progress</span>
              <span>{checkedItems.length} of {totalItems}</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completionRate === 100
                    ? 'bg-gradient-to-r from-green-500 to-green-400'
                    : 'bg-gradient-to-r from-elec-yellow to-elec-yellow/70'
                }`}
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Categories */}
      {safetyChecklist.map((category, index) => {
        const colorConfig = getColorConfig(category.color);
        const CategoryIcon = category.icon;
        const categoryChecked = category.items.filter(item => checkedItems.includes(item)).length;

        return (
          <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-white/20 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border}`}>
                    <CategoryIcon className={`h-5 w-5 ${colorConfig.text}`} />
                  </div>
                  <span className="text-base sm:text-lg">{category.category}</span>
                </CardTitle>
                <Badge className={`${colorConfig.bg} ${colorConfig.text} ${colorConfig.border}`}>
                  {categoryChecked}/{category.items.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => {
                  const isChecked = checkedItems.includes(item);
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => toggleItem(item)}
                      className={`
                        w-full flex items-start gap-3 p-3 sm:p-4 rounded-xl
                        border transition-all duration-200
                        touch-manipulation active:scale-[0.99]
                        ${isChecked
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-white/10 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className={`
                        flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all
                        ${isChecked
                          ? 'bg-green-500 border-green-500'
                          : 'border-2 border-white/30 hover:border-elec-yellow'
                        }
                      `}>
                        {isChecked && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <span className={`text-sm text-left ${isChecked ? 'text-green-400' : 'text-white/70'}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Safety Tips */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            Essential Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safetyTips.map((tip, index) => {
              const tipConfig = getColorConfig(tip.color);
              const TipIcon = tip.icon;
              return (
                <div key={index} className={`p-4 rounded-xl ${tipConfig.bg} border ${tipConfig.border}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${tipConfig.iconBg} flex-shrink-0`}>
                      <TipIcon className={`h-4 w-4 ${tipConfig.text}`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${tipConfig.text} mb-1`}>{tip.title}</h4>
                      <p className="text-sm text-white/70">{tip.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <FileText className="h-5 w-5 text-purple-400" />
            </div>
            Additional Notes & Observations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileInput
            label="Safety Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record any specific site conditions, hazards identified, or additional safety measures required..."
            multiline
            rows={4}
            className="mb-4"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-all">
              <Download className="mr-2 h-5 w-5" />
              Export Assessment
            </Button>
            <Button variant="outline" className="flex-1 h-12 border-white/20 hover:bg-white/5 hover:border-elec-yellow/50 font-semibold touch-manipulation active:scale-95 transition-all">
              Save Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Warning Banner */}
      {completionRate < 100 && (
        <Card className="bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent border-red-500/30">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-red-300 mb-1">Assessment Incomplete</h3>
                <p className="text-sm text-white/80">
                  You must complete all safety checks before proceeding with electrical work.{" "}
                  <span className="font-medium text-red-300">{totalItems - checkedItems.length} items remaining.</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Banner */}
      {completionRate === 100 && (
        <Card className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent border-green-500/30">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-300 mb-1">Assessment Complete</h3>
                <p className="text-sm text-white/80">
                  All safety checks have been verified. You may proceed with work while maintaining{" "}
                  <span className="font-medium text-green-300">continuous vigilance</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreJobSafetyTab;
