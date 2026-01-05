import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface StructuredDesignViewProps {
  design: {
    cable?: string;
    mcb?: string;
    voltageDrop?: string;
    earthFault?: string;
  };
}

export const StructuredDesignView = ({ design }: StructuredDesignViewProps) => {
  const getPassFailIcon = (value: string) => {
    if (value.includes('✓') || value.toLowerCase().includes('pass') || value.toLowerCase().includes('compliant')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (value.includes('✗') || value.toLowerCase().includes('fail')) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-elec-yellow">Design Specification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {design.cable && (
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-gray-400 mb-1">Cable</div>
              <div className="text-lg font-semibold text-foreground">{design.cable}</div>
            </div>
          )}
          {design.mcb && (
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-gray-400 mb-1">MCB Rating</div>
              <div className="text-lg font-semibold text-foreground">{design.mcb}</div>
            </div>
          )}
          {design.voltageDrop && (
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-gray-400 mb-1">Voltage Drop</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">{design.voltageDrop}</span>
                {getPassFailIcon(design.voltageDrop)}
              </div>
            </div>
          )}
          {design.earthFault && (
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-gray-400 mb-1">Earth Fault Loop (Zs)</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">{design.earthFault}</span>
                {getPassFailIcon(design.earthFault)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
