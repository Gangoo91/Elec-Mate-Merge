import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, PoundSterling, TrendingUp } from "lucide-react";

interface InteractiveInputsProps {
  startupInputs: any;
  monthlyInputs: any;
  businessType: string;
  onStartupChange: (field: string, value: number) => void;
  onMonthlyChange: (field: string, value: number) => void;
}

const InteractiveInputs: React.FC<InteractiveInputsProps> = ({
  startupInputs,
  monthlyInputs,
  businessType,
  onStartupChange,
  onMonthlyChange,
}) => {
  const getFieldHint = (field: string, type: 'startup' | 'monthly') => {
    const hints = {
      startup: {
        tools: {
          "sole-trader": "Basic hand tools and power tools (£3k-8k)",
          "partnership": "Shared professional tool set (£5k-12k)",
          "limited-company": "Commercial grade equipment (£8k-15k)",
          "franchise": "Franchise-specified tool requirements (£10k-20k)"
        },
        testEquipment: {
          "sole-trader": "Essential multifunction tester (£800-2k)",
          "partnership": "Multiple testers for efficiency (£1.5k-4k)",
          "limited-company": "Professional calibrated equipment (£3k-6k)",
          "franchise": "Franchise-approved test equipment (£4k-8k)"
        },
        vehicle: {
          "sole-trader": "Used van with basic fit-out (£8k-15k)",
          "partnership": "Quality van or multiple vehicles (£15k-25k)",
          "limited-company": "Professional fleet vehicles (£20k-40k)",
          "franchise": "Franchise-branded commercial vehicles (£25k-50k)"
        }
      },
      monthly: {
        insurance: {
          "sole-trader": "Basic liability and professional cover (£150-300)",
          "partnership": "Multi-person coverage (£250-500)",
          "limited-company": "Comprehensive corporate insurance (£400-800)",
          "franchise": "Franchise-required insurance levels (£300-600)"
        },
        marketing: {
          "sole-trader": "Local advertising and online presence (£100-300)",
          "partnership": "Shared marketing costs (£200-500)",
          "limited-company": "Professional marketing strategy (£500-1200)",
          "franchise": "Franchise marketing fee included (£200-400)"
        }
      }
    };
    
    return hints[type]?.[field]?.[businessType] || "";
  };

  const getSliderConfig = (field: string, type: 'startup' | 'monthly') => {
    const configs = {
      startup: {
        tools: { min: 0, max: 25000, step: 500 },
        testEquipment: { min: 0, max: 10000, step: 250 },
        vehicle: { min: 0, max: 60000, step: 1000 },
        insurance: { min: 0, max: 5000, step: 100 },
        qualifications: { min: 0, max: 8000, step: 200 },
        marketing: { min: 0, max: 10000, step: 250 },
        workingCapital: { min: 0, max: 50000, step: 1000 }
      },
      monthly: {
        insurance: { min: 0, max: 1000, step: 25 },
        fuel: { min: 0, max: 800, step: 25 },
        toolMaintenance: { min: 0, max: 300, step: 10 },
        marketing: { min: 0, max: 1500, step: 50 },
        phoneInternet: { min: 0, max: 200, step: 10 },
        accountancy: { min: 0, max: 500, step: 25 },
        rent: { min: 0, max: 2000, step: 50 },
        utilities: { min: 0, max: 400, step: 25 }
      }
    };
    
    return configs[type][field] || { min: 0, max: 10000, step: 100 };
  };

  const SliderInput = ({ 
    label, 
    field, 
    value, 
    onChange, 
    type, 
    icon 
  }: {
    label: string;
    field: string;
    value: number;
    onChange: (field: string, value: number) => void;
    type: 'startup' | 'monthly';
    icon: React.ReactNode;
  }) => {
    const config = getSliderConfig(field, type);
    const hint = getFieldHint(field, type);
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-elec-yellow">{icon}</div>
            <label className="text-sm font-medium">{label}</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{hint}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
            £{value.toLocaleString()}
          </Badge>
        </div>
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(field, values[0])}
          min={config.min}
          max={config.max}
          step={config.step}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>£{config.min.toLocaleString()}</span>
          <span>£{config.max.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Startup Costs */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Initial Investment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SliderInput
            label="Professional Tools"
            field="tools"
            value={startupInputs.tools || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Test Equipment"
            field="testEquipment"
            value={startupInputs.testEquipment || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Vehicle & Setup"
            field="vehicle"
            value={startupInputs.vehicle || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Initial Insurance"
            field="insurance"
            value={startupInputs.insurance || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Qualifications"
            field="qualifications"
            value={startupInputs.qualifications || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Marketing Setup"
            field="marketing"
            value={startupInputs.marketing || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Working Capital"
            field="workingCapital"
            value={startupInputs.workingCapital || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
        </CardContent>
      </Card>

      {/* Monthly Costs */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Monthly Operating Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SliderInput
            label="Insurance"
            field="insurance"
            value={monthlyInputs.insurance || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Fuel & Travel"
            field="fuel"
            value={monthlyInputs.fuel || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Tool Maintenance"
            field="toolMaintenance"
            value={monthlyInputs.toolMaintenance || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Marketing"
            field="marketing"
            value={monthlyInputs.marketing || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Phone & Internet"
            field="phoneInternet"
            value={monthlyInputs.phoneInternet || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Professional Services"
            field="accountancy"
            value={monthlyInputs.accountancy || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Premises Rent"
            field="rent"
            value={monthlyInputs.rent || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <SliderInput
            label="Utilities"
            field="utilities"
            value={monthlyInputs.utilities || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveInputs;