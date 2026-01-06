
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HardHat, CheckCircle, MapPin, Thermometer, Wind, Sun, Droplets,
  Eye, Building, CloudRain, AlertTriangle, CheckSquare
} from "lucide-react";
import { useState } from "react";

const SiteConditionTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [environmentalNotes, setEnvironmentalNotes] = useState("");

  const conditionChecklist = [
    {
      category: "Access & Working Space",
      icon: MapPin,
      color: "blue",
      items: [
        "Adequate working space around electrical equipment (minimum 600mm)",
        "Clear access routes to and from work area",
        "Stable working platform or surface",
        "No obstructions in emergency escape routes",
        "Vehicle access available if required",
        "Suitable parking arrangements for work vehicles",
        "Pedestrian walkways clearly marked and safe"
      ]
    },
    {
      category: "Environmental Conditions",
      icon: Thermometer,
      color: "orange",
      items: [
        "Dry conditions - no risk of water ingress",
        "Adequate ventilation in enclosed spaces",
        "Temperature suitable for equipment and materials",
        "Wind conditions safe for overhead work",
        "No flammable vapours or gases present",
        "Humidity levels within acceptable ranges",
        "Air quality suitable for respiratory health"
      ]
    },
    {
      category: "Lighting & Visibility",
      icon: Sun,
      color: "yellow",
      items: [
        "Adequate natural or artificial lighting",
        "Emergency lighting available if required",
        "All warning signs and labels clearly visible",
        "Colour identification possible in lighting conditions",
        "Additional portable lighting available if needed",
        "No glare or shadow issues affecting work",
        "Backup lighting arrangements in place"
      ]
    },
    {
      category: "Structural Considerations",
      icon: Building,
      color: "purple",
      items: [
        "Building structure suitable for proposed work",
        "No signs of structural damage or instability",
        "Cable routes and fixing points accessible",
        "Load-bearing capacity adequate for equipment",
        "Fire stopping and compartmentation maintained",
        "Building materials compatible with electrical work",
        "Structural modifications approved if required"
      ]
    },
    {
      category: "Weather & Seasonal Factors",
      icon: Wind,
      color: "green",
      items: [
        "Current weather conditions suitable for work",
        "Weather forecast checked for duration of work",
        "Seasonal considerations (frost, ice, heat)",
        "Protection from rain and moisture available",
        "Wind speed within safe working limits",
        "Temperature effects on materials considered",
        "Contingency plans for weather changes"
      ]
    }
  ];

  const environmentalFactors = [
    {
      factor: "Temperature",
      icon: Thermometer,
      color: "orange",
      considerations: ["Cable installation temperature ratings", "Thermal expansion effects", "Worker comfort and safety"],
      optimalRange: "5°C to 30°C for most electrical work"
    },
    {
      factor: "Humidity",
      icon: Droplets,
      color: "blue",
      considerations: ["Condensation risk", "Insulation resistance", "Equipment protection"],
      optimalRange: "30% to 70% relative humidity"
    },
    {
      factor: "Air Quality",
      icon: Wind,
      color: "green",
      considerations: ["Dust levels", "Chemical vapours", "Respiratory protection needs"],
      optimalRange: "Clean, well-ventilated air"
    }
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', iconBg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30' }
    };
    return configs[color] || configs.blue;
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const totalItems = conditionChecklist.reduce((total, cat) => total + cat.items.length, 0);
  const completionRate = (checkedItems.length / totalItems) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                <HardHat className="h-7 w-7 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                  Site Condition <span className="text-blue-400">Evaluation</span>
                </CardTitle>
                <p className="text-sm text-white/60 mt-1">
                  Environmental & Working Conditions Assessment
                </p>
              </div>
            </div>
            <Badge className={`
              ${completionRate === 100 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}
              text-sm px-3 py-1
            `}>
              {Math.round(completionRate)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70 mb-4">
            Assess environmental and working conditions to ensure safe and effective electrical installation work.
            This evaluation helps identify potential hazards and ensures optimal working conditions.
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
                    : 'bg-gradient-to-r from-blue-500 to-blue-400'
                }`}
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Categories */}
      {conditionChecklist.map((category, index) => {
        const colorConfig = getColorConfig(category.color);
        const CategoryIcon = category.icon;
        const categoryChecked = category.items.filter(item => checkedItems.includes(item)).length;

        return (
          <Card key={index} className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-white/20 transition-colors">
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
                          : 'border-2 border-white/30 hover:border-blue-400'
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

      {/* Environmental Factors Guide */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Thermometer className="h-5 w-5 text-blue-400" />
            </div>
            Environmental Factors Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {environmentalFactors.map((factor, index) => {
              const factorConfig = getColorConfig(factor.color);
              const FactorIcon = factor.icon;
              return (
                <div key={index} className={`p-4 rounded-xl ${factorConfig.bg} border ${factorConfig.border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${factorConfig.iconBg}`}>
                      <FactorIcon className={`h-4 w-4 ${factorConfig.text}`} />
                    </div>
                    <h4 className={`font-semibold ${factorConfig.text}`}>{factor.factor}</h4>
                  </div>
                  <p className="text-xs text-white/60 mb-3">
                    <span className="font-medium text-white/80">Optimal: </span>
                    {factor.optimalRange}
                  </p>
                  <ul className="space-y-1.5">
                    {factor.considerations.map((consideration, idx) => (
                      <li key={idx} className="text-xs text-white/70 flex items-start gap-2">
                        <span className={`w-1 h-1 ${factorConfig.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Eye className="h-5 w-5 text-purple-400" />
            </div>
            Environmental Assessment Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileInput
            label="Environmental Notes"
            value={environmentalNotes}
            onChange={(e) => setEnvironmentalNotes(e.target.value)}
            placeholder="Record specific environmental conditions, weather factors, seasonal considerations, or site-specific environmental challenges..."
            multiline
            rows={4}
            className="mb-4"
          />
          <Button className="w-full h-12 bg-blue-500 hover:bg-blue-500/90 text-white font-semibold touch-manipulation active:scale-95 transition-all">
            <CheckSquare className="mr-2 h-5 w-5" />
            Complete Site Condition Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Weather Warning Banner */}
      <Card className="bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/30">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 flex-shrink-0">
              <CloudRain className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">Weather Considerations</h3>
              <p className="text-sm text-white/70 mb-3">
                Always check weather conditions before starting outdoor electrical work:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                  Do not work in wet conditions or during electrical storms
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                  Wind speeds above 15 mph may affect ladder work
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                  Temperature below 0°C may affect cable flexibility
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                  High humidity can affect insulation resistance readings
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteConditionTab;
