
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface QuickReferencePanelProps {
  quickRefValues: Array<{ label: string; value: string; regulation: string }>;
  onClose: () => void;
}

const QuickReferencePanel = ({ quickRefValues, onClose }: QuickReferencePanelProps) => {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border p-6 overflow-y-auto z-50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Quick Reference
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-white/70 hover:text-foreground"
          >
            ✕
          </Button>
        </div>

        {/* Key Values */}
        <Card className="bg-muted border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-base">Key Test Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickRefValues.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-white/80">{item.label}</span>
                <div className="text-right">
                  <div className="font-bold text-foreground">{item.value}</div>
                  <div className="text-xs text-white/70">{item.regulation}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Test Type Legend */}
        <Card className="bg-muted border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-base">Test Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">ISOLATION</Badge>
              <span className="text-sm text-white/80">Supply isolated</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">DEAD</Badge>
              <span className="text-sm text-white/80">No voltage present</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">LIVE</Badge>
              <span className="text-sm text-white/80">Supply energised</span>
            </div>
          </CardContent>
        </Card>

        {/* Priority Legend */}
        <Card className="bg-muted border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-base">Priority Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 text-foreground">CRITICAL</Badge>
              <span className="text-sm text-white/80">Must complete first</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-foreground">HIGH</Badge>
              <span className="text-sm text-white/80">Essential tests</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500 text-black">MEDIUM</Badge>
              <span className="text-sm text-white/80">Standard tests</span>
            </div>
          </CardContent>
        </Card>

        {/* Important Reminders */}
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400 text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80">Complete safe isolation FIRST</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80">Test EARTH TO LINE first for Zs</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80">Isolate RCDs during loop impedance testing</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80">Follow test sequence order strictly</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickReferencePanel;
