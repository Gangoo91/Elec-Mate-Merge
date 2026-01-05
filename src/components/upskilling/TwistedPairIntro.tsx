import { Cable } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TwistedPairIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Cable className="h-5 w-5 text-elec-yellow" />
          Introduction to Twisted Pair Cables
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Twisted pair cables form the backbone of modern data communications infrastructure. 
          These cables consist of pairs of copper wires that are twisted together to reduce 
          electromagnetic interference and crosstalk between adjacent pairs.
        </p>
        <p>
          Understanding twisted pair cable construction, categories, and performance characteristics 
          is fundamental to designing reliable structured cabling systems that meet current needs 
          whilst providing future-proof solutions.
        </p>
        <p>
          This section covers the essential knowledge required for selecting, installing, and 
          testing twisted pair cables in commercial and industrial environments.
        </p>
      </CardContent>
    </Card>
  );
};