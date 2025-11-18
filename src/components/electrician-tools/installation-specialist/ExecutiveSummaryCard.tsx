import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Cable, TrendingUp, Shield, CheckCircle2, AlertCircle } from "lucide-react";

interface ExecutiveSummaryData {
  cableType?: string;
  cableSize?: string;
  runLength?: string;
  installationMethod?: string;
  supplyType?: string;
  protectiveDevice?: string;
  voltageDrop?: string;
  zsRequirement?: string;
  purpose?: string;
}

interface ExecutiveSummaryCardProps {
  executiveSummary: ExecutiveSummaryData;
}

export const ExecutiveSummaryCard = ({ executiveSummary }: ExecutiveSummaryCardProps) => {
  if (!executiveSummary || Object.keys(executiveSummary).length === 0) {
    return null;
  }

  const {
    cableType,
    cableSize,
    runLength,
    installationMethod,
    supplyType,
    protectiveDevice,
    voltageDrop,
    zsRequirement,
    purpose
  } = executiveSummary;

  // Determine voltage drop status
  const getVoltageDropStatus = (vdString?: string) => {
    if (!vdString) return null;
    const lowerVd = vdString.toLowerCase();
    if (lowerVd.includes('pass') || lowerVd.includes('compliant') || lowerVd.includes('acceptable')) {
      return 'pass';
    }
    if (lowerVd.includes('fail') || lowerVd.includes('exceeds') || lowerVd.includes('high')) {
      return 'fail';
    }
    return null;
  };

  const vdStatus = getVoltageDropStatus(voltageDrop);

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-primary/5 to-background shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-fade-in">
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-lg">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-xl text-foreground">Executive Summary</h3>
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400 text-xs">
                AI Generated
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Installation at-a-glance with key specifications and compliance
            </p>
          </div>
        </div>

        {/* Purpose Statement */}
        {purpose && (
          <div className="mb-5 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {purpose}
            </p>
          </div>
        )}

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {/* Cable Specifications */}
          {(cableType || cableSize || runLength) && (
            <div className="p-4 rounded-xl bg-card border border-border/50 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Cable className="h-4 w-4 text-blue-400" />
                <h4 className="font-semibold text-sm text-foreground">Cable Specifications</h4>
              </div>
              <div className="space-y-2">
                {cableType && (
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium text-foreground">{cableType}</p>
                  </div>
                )}
                {cableSize && (
                  <div>
                    <p className="text-xs text-muted-foreground">Size</p>
                    <p className="text-sm font-medium text-foreground">{cableSize}</p>
                  </div>
                )}
                {runLength && (
                  <div>
                    <p className="text-xs text-muted-foreground">Run Length</p>
                    <p className="text-sm font-medium text-foreground">{runLength}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Installation Method */}
          {installationMethod && (
            <div className="p-4 rounded-xl bg-card border border-border/50 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-blue-400" />
                <h4 className="font-semibold text-sm text-foreground">Installation Method</h4>
              </div>
              <p className="text-sm font-medium text-foreground">{installationMethod}</p>
            </div>
          )}

          {/* Supply & Protection */}
          {(supplyType || protectiveDevice) && (
            <div className="p-4 rounded-xl bg-card border border-border/50 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-blue-400" />
                <h4 className="font-semibold text-sm text-foreground">Supply & Protection</h4>
              </div>
              <div className="space-y-2">
                {supplyType && (
                  <div>
                    <p className="text-xs text-muted-foreground">Supply</p>
                    <p className="text-sm font-medium text-foreground">{supplyType}</p>
                  </div>
                )}
                {protectiveDevice && (
                  <div>
                    <p className="text-xs text-muted-foreground">Protective Device</p>
                    <p className="text-sm font-medium text-foreground">{protectiveDevice}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Compliance Calculations */}
        {(voltageDrop || zsRequirement) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Voltage Drop */}
            {voltageDrop && (
              <div className={`p-4 rounded-xl border ${
                vdStatus === 'pass' 
                  ? 'bg-success/5 border-success/30' 
                  : vdStatus === 'fail' 
                  ? 'bg-destructive/5 border-destructive/30' 
                  : 'bg-card border-border/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`h-4 w-4 ${
                    vdStatus === 'pass' ? 'text-success' : vdStatus === 'fail' ? 'text-destructive' : 'text-blue-400'
                  }`} />
                  <h4 className="font-semibold text-sm text-foreground">Voltage Drop</h4>
                  {vdStatus === 'pass' && (
                    <CheckCircle2 className="h-4 w-4 text-success ml-auto" />
                  )}
                  {vdStatus === 'fail' && (
                    <AlertCircle className="h-4 w-4 text-destructive ml-auto" />
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">{voltageDrop}</p>
              </div>
            )}

            {/* Zs Requirement */}
            {zsRequirement && (
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <h4 className="font-semibold text-sm text-foreground">Zs Requirement</h4>
                </div>
                <p className="text-sm font-medium text-foreground">{zsRequirement}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
