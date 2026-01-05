import { Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TerminationIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Quick Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Professional copper cable termination is the foundation of reliable network infrastructure. The quality of your terminations directly impacts network performance, signal integrity, and long-term reliability.
        </p>
        <p>
          This section covers the essential tools, techniques, and quality control measures that distinguish professional installations from amateur work—understanding these fundamentals is crucial for any data cabling technician.
        </p>
      </CardContent>
    </Card>
  );
};