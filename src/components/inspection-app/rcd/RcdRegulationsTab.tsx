
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const RcdRegulationsTab = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          BS7671 Regulation Details
        </CardTitle>
        <CardDescription>
          Detailed regulation references and requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Section 411.3.3</CardTitle>
              <CardDescription>Additional Protection by RCD</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Key Requirements:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Socket outlets ≤20A shall be protected by 30mA RCD</li>
                  <li>• Mobile equipment used outdoors ≤20A</li>
                  <li>• Cables concealed in walls at depth ≤50mm</li>
                  <li>• Circuits in special locations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Section 531.3</CardTitle>
              <CardDescription>RCD Selection and Application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Selection Criteria:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Type of RCD suitable for the circuit</li>
                  <li>• Rated residual operating current</li>
                  <li>• Time delay characteristics</li>
                  <li>• Discrimination requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Part 7 Special Locations</CardTitle>
              <CardDescription>Enhanced RCD Requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Special Requirements:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Bathrooms: 30mA RCD for all circuits</li>
                  <li>• Swimming pools: 30mA RCD protection</li>
                  <li>• Agricultural premises: Enhanced protection</li>
                  <li>• Construction sites: Specific RCD requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Regulation 314.1</CardTitle>
              <CardDescription>Fault Protection Principles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Protection Methods:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Automatic disconnection of supply</li>
                  <li>• Double or reinforced insulation</li>
                  <li>• Electrical separation</li>
                  <li>• Extra-low voltage (SELV/PELV)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RcdRegulationsTab;
