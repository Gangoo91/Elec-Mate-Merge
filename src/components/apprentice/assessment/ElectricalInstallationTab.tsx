
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, CheckSquare, AlertCircle, FileText, Shield, Eye, CheckCircle,
  Wrench, Cable, CircuitBoard, TestTube, BookOpen, AlertTriangle
} from "lucide-react";
import { useState } from "react";

const ElectricalInstallationTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [findings, setFindings] = useState("");

  const electricalChecklist = [
    {
      category: "Consumer Unit & Distribution",
      icon: CircuitBoard,
      color: "yellow",
      items: [
        "Consumer unit condition and accessibility",
        "Adequate space for additional circuits if required",
        "Main switch operation and labelling",
        "RCD protection appropriate and functioning",
        "Circuit breaker ratings and condition",
        "Busbar connections tight and secure",
        "IP rating appropriate for location",
        "Isolation and switching arrangements adequate"
      ]
    },
    {
      category: "Existing Wiring",
      icon: Cable,
      color: "blue",
      items: [
        "Cable types and conditions throughout installation",
        "Cable supports and fixing methods adequate",
        "No signs of overheating or damage",
        "Appropriate cable sizes for circuit loading",
        "Junction boxes and connections accessible",
        "Cable identification and labelling present",
        "Segregation of different voltage systems",
        "Cable entry methods and sealing adequate"
      ]
    },
    {
      category: "Earthing & Bonding",
      icon: Shield,
      color: "green",
      items: [
        "Main earthing terminal condition and connection",
        "Earthing conductor size and condition",
        "Equipotential bonding to services complete",
        "Supplementary bonding where required",
        "Earth electrode system (if applicable)",
        "Continuity of protective conductors",
        "Bonding conductor sizes comply with BS 7671",
        "Earth fault loop impedance within limits"
      ]
    },
    {
      category: "Safety Systems",
      icon: AlertTriangle,
      color: "red",
      items: [
        "RCD testing and operation within limits",
        "Emergency lighting systems functional",
        "Fire alarm systems unaffected by work",
        "Security systems consideration",
        "Smoke detection systems operational",
        "Emergency stop systems accessible",
        "Intruder alarm system compatibility",
        "Communication systems operational"
      ]
    },
    {
      category: "Testing & Documentation",
      icon: FileText,
      color: "purple",
      items: [
        "Previous test certificates available",
        "Installation complies with current edition of BS 7671",
        "Test results within acceptable limits",
        "Periodic inspection due dates noted",
        "Any departures from BS 7671 recorded",
        "Installation changes properly documented",
        "As-built drawings available and accurate",
        "Operation and maintenance manuals present"
      ]
    }
  ];

  const complianceRequirements = [
    {
      standard: "BS 7671:2018+A3:2024",
      description: "Requirements for Electrical Installations (IET Wiring Regulations)",
      keyPoints: ["Chapter 61: Initial verification", "Chapter 62: Periodic inspection", "Appendix 6: Model forms"]
    },
    {
      standard: "Part P Building Regulations",
      description: "Electrical safety in dwellings",
      keyPoints: ["Notification requirements", "Self-certification schemes", "Competent person schemes"]
    },
    {
      standard: "Electricity at Work Regulations 1989",
      description: "Legal requirements for electrical work",
      keyPoints: ["Regulation 4: Systems and equipment", "Regulation 13: Working dead", "Regulation 16: Persons"]
    }
  ];

  const testingPriorities = [
    { test: "Continuity", priority: "High", reason: "Ensures protective conductor integrity", icon: Cable },
    { test: "Insulation Resistance", priority: "High", reason: "Prevents dangerous leakage currents", icon: Shield },
    { test: "Polarity", priority: "Medium", reason: "Ensures correct connection of conductors", icon: Zap },
    { test: "Earth Fault Loop Impedance", priority: "High", reason: "Ensures protective device operation", icon: CircuitBoard },
    { test: "RCD Operation", priority: "High", reason: "Ensures personal protection from electric shock", icon: AlertTriangle }
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      red: { bg: 'bg-red-500/10', text: 'text-red-400', iconBg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', iconBg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30' }
    };
    return configs[color] || configs.yellow;
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "High": return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      case "Medium": return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case "Low": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      default: return { bg: 'bg-white/5', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const totalItems = electricalChecklist.reduce((total, cat) => total + cat.items.length, 0);
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
                <Zap className="h-7 w-7 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                  Electrical Installation <span className="text-elec-yellow">Assessment</span>
                </CardTitle>
                <p className="text-sm text-white/60 mt-1">
                  BS 7671 Compliance & Safety Evaluation
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
          <p className="text-white/70 mb-4">
            Evaluate existing electrical installations to ensure compatibility and safety before commencing new work.
            This assessment ensures compliance with current regulations and identifies any remedial work required.
          </p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/60">
              <span>Progress</span>
              <span>{checkedItems.length} of {totalItems} items checked</span>
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
      {electricalChecklist.map((category, index) => {
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

      {/* Key Standards & Regulations */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            Key Standards & Regulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceRequirements.map((req, index) => (
              <div key={index} className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <h4 className="font-semibold text-white mb-1">{req.standard}</h4>
                <p className="text-sm text-blue-300 mb-3">{req.description}</p>
                <ul className="space-y-1.5">
                  {req.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testing Priorities */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <TestTube className="h-5 w-5 text-green-400" />
            </div>
            Testing Priorities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testingPriorities.map((test, index) => {
              const priorityConfig = getPriorityConfig(test.priority);
              const TestIcon = test.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorConfig('green').iconBg} flex-shrink-0`}>
                      <TestIcon className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{test.test}</h4>
                      <p className="text-sm text-white/60">{test.reason}</p>
                    </div>
                  </div>
                  <Badge className={`${priorityConfig.bg} ${priorityConfig.text} border ${priorityConfig.border}`}>
                    {test.priority}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Findings Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Eye className="h-5 w-5 text-purple-400" />
            </div>
            Installation Findings & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileInput
            label="Findings Notes"
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            placeholder="Record any defects found, upgrade requirements, compliance issues, or recommendations for the existing installation..."
            multiline
            rows={4}
            className="mb-4"
          />
          <Button className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-all">
            <CheckSquare className="mr-2 h-5 w-5" />
            Complete Electrical Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Important Reminder Banner */}
      <Card className="bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/30">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">Important Reminder</h3>
              <p className="text-sm text-white/70">
                If any defects or safety concerns are identified during this assessment,
                they must be reported immediately and rectified before proceeding with new installation work.
                All work must comply with the current edition of <span className="font-medium text-orange-300">BS 7671</span> and relevant building regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationTab;
