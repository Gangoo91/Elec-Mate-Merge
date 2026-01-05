import { Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PolarityPurposeIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          Before any electrical installation can be energised, polarity testing must confirm that all 
          line conductors are correctly connected. This fundamental safety check ensures switches and 
          protective devices operate on the correct conductor.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">Why Polarity Testing Matters</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Confirms line and neutral conductors are correctly identified</li>
            <li>• Ensures switches and protective devices break the line conductor</li>
            <li>• Verifies correct terminal connections at all accessories</li>
            <li>• Prevents dangerous situations where circuits remain live when switched off</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Safety Critical</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Incorrect polarity can result in shock hazards even when switches are in the 'off' position. 
                This test is mandatory before energising any new installation or circuit.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};