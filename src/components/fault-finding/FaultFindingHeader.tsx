
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const FaultFindingHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 bg-red-500/10 rounded-xl">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Advanced Fault Finding Guide</h1>
      </div>
      <p className="text-xl text-gray-300 max-w-4xl mx-auto">
        Comprehensive troubleshooting guide with interactive diagnostics and quick reference charts
      </p>
      <div className="flex justify-center gap-2 flex-wrap">
        <Badge className="bg-red-500 text-foreground font-bold">Emergency Reference</Badge>
        <Badge className="bg-blue-500 text-foreground font-bold">Interactive Tools</Badge>
        <Badge className="bg-green-500 text-foreground font-bold">BS 7671 Compliant</Badge>
      </div>
    </div>
  );
};

export default FaultFindingHeader;
