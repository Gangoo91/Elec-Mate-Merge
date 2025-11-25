import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Car, FileText, Trash2, Clock } from "lucide-react";

interface JobOverheadsBreakdownProps {
  jobOverheads: {
    estimatedDuration: string;
    overheadAllocation: number;
    travelCosts: number;
    permitsCosts: number;
    wasteCosts: number;
    total: number;
  };
  directCosts: {
    materials: number;
    labour: number;
    total: number;
  };
}

const JobOverheadsBreakdown = ({ jobOverheads, directCosts }: JobOverheadsBreakdownProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const overheadItems = [
    {
      icon: Building2,
      label: "Business Overheads",
      amount: jobOverheads.overheadAllocation,
      description: `Allocated for ${jobOverheads.estimatedDuration}`,
      color: "text-blue-400"
    },
    {
      icon: Car,
      label: "Travel Costs",
      amount: jobOverheads.travelCosts,
      description: "Fuel, vehicle wear & tear",
      color: "text-orange-400"
    },
    {
      icon: FileText,
      label: "Permits & Parking",
      amount: jobOverheads.permitsCosts,
      description: "Site access and compliance",
      color: "text-purple-400"
    },
    {
      icon: Trash2,
      label: "Waste Disposal",
      amount: jobOverheads.wasteCosts,
      description: "Materials disposal & recycling",
      color: "text-red-400"
    }
  ].filter(item => item.amount > 0); // Only show items with costs

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Job Overheads Breakdown
        </CardTitle>
        <CardDescription>
          Hidden costs allocated to this {jobOverheads.estimatedDuration} job
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Direct Costs Summary */}
        <div className="p-4 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 space-y-2">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
            Direct Costs
          </h4>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">Materials</span>
            <span className="font-semibold text-foreground">{formatCurrency(directCosts.materials)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">Labour</span>
            <span className="font-semibold text-foreground">{formatCurrency(directCosts.labour)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-elec-yellow/10">
            <span className="font-medium text-foreground">Direct Costs Total</span>
            <span className="font-bold text-foreground">{formatCurrency(directCosts.total)}</span>
          </div>
        </div>

        {/* Overhead Items */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
            Job Overheads
          </h4>
          {overheadItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-elec-dark/60 flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-white">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(item.amount)}</p>
                </div>
              </div>
            );
          })}

          {/* Total Overheads */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 mt-3">
            <span className="font-semibold text-foreground">Total Job Overheads</span>
            <span className="font-bold text-lg text-orange-400">{formatCurrency(jobOverheads.total)}</span>
          </div>
        </div>

        {/* Combined Total */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-elec-yellow/10 to-transparent border-2 border-elec-yellow/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white mb-1">Total Cost (Direct + Overheads)</p>
              <p className="text-xs text-white">Before profit margin</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(directCosts.total + jobOverheads.total)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobOverheadsBreakdown;
