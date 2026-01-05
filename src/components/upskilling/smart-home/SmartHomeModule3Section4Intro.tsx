import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule3Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="leading-relaxed">
          Not all lighting loads are the same, and not all control methods work with every type of load. 
          Understanding load types (incandescent, LED, fluorescent, inductive, capacitive) and how they 
          interact with smart dimmers, switches, and controllers is essential to ensure reliable performance 
          and avoid flicker, overheating, or premature failure.
        </p>
        <p className="leading-relaxed">
          This section provides practical guidance on matching controls to loads for safe, efficient 
          smart lighting installations.
        </p>
      </CardContent>
    </Card>
  );
};