import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const getDropdownOptions = (field: string, type: 'startup' | 'monthly') => {
    const configs = {
      startup: {
        tools: [0, 2000, 5000, 8000, 12000, 15000, 20000, 25000],
        testEquipment: [0, 500, 1000, 2000, 3000, 5000, 8000, 10000],
        vehicle: [0, 5000, 10000, 15000, 25000, 35000, 50000, 60000],
        insurance: [0, 500, 1000, 2000, 3000, 4000, 5000],
        qualifications: [0, 1000, 2000, 3000, 5000, 6000, 8000],
        marketing: [0, 500, 1000, 2500, 5000, 7500, 10000],
        workingCapital: [0, 5000, 10000, 20000, 30000, 40000, 50000]
      },
      monthly: {
        insurance: [0, 100, 200, 300, 500, 700, 1000],
        fuel: [0, 100, 200, 300, 400, 600, 800],
        toolMaintenance: [0, 50, 100, 150, 200, 250, 300],
        marketing: [0, 200, 400, 600, 900, 1200, 1500],
        phoneInternet: [0, 30, 60, 100, 150, 200],
        accountancy: [0, 100, 200, 300, 400, 500],
        rent: [0, 300, 600, 1000, 1500, 2000],
        utilities: [0, 50, 100, 200, 300, 400]
      }
    };
    
    return configs[type][field] || [0, 1000, 2000, 5000, 10000];
  };

  const DropdownInput = ({ 
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
    const options = getDropdownOptions(field, type);
    const hint = getFieldHint(field, type);
    
    return (
      <div className="space-y-3">
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
        <Select value={value.toString()} onValueChange={(val) => onChange(field, parseInt(val))}>
          <SelectTrigger className="w-full border border-muted/40 bg-card">
            <SelectValue placeholder="Select amount">
              £{value.toLocaleString()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-card border border-muted/40 z-50">
            {options.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                £{option.toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Startup Costs */}
      <Card className="border border-muted/40 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Initial Investment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <DropdownInput
            label="Professional Tools"
            field="tools"
            value={startupInputs.tools || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Test Equipment"
            field="testEquipment"
            value={startupInputs.testEquipment || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Vehicle & Setup"
            field="vehicle"
            value={startupInputs.vehicle || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Initial Insurance"
            field="insurance"
            value={startupInputs.insurance || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Qualifications"
            field="qualifications"
            value={startupInputs.qualifications || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Marketing Setup"
            field="marketing"
            value={startupInputs.marketing || 0}
            onChange={onStartupChange}
            type="startup"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
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
      <Card className="border border-muted/40 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Monthly Operating Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <DropdownInput
            label="Insurance"
            field="insurance"
            value={monthlyInputs.insurance || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Fuel & Travel"
            field="fuel"
            value={monthlyInputs.fuel || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Tool Maintenance"
            field="toolMaintenance"
            value={monthlyInputs.toolMaintenance || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Marketing"
            field="marketing"
            value={monthlyInputs.marketing || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Phone & Internet"
            field="phoneInternet"
            value={monthlyInputs.phoneInternet || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Professional Services"
            field="accountancy"
            value={monthlyInputs.accountancy || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
            label="Premises Rent"
            field="rent"
            value={monthlyInputs.rent || 0}
            onChange={onMonthlyChange}
            type="monthly"
            icon={<PoundSterling className="h-4 w-4" />}
          />
          <DropdownInput
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