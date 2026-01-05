import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from 'lucide-react';

export const BS7671Module7Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Book className="h-5 w-5 text-elec-yellow" />
          Introduction to Prosumer Electrical Installations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Part 8 of BS 7671:2018+A2:2022 introduces revolutionary standards for installations that both 
          consume and generate energy – known as "Prosumer Electrical Installations" (PEIs). This groundbreaking 
          section addresses the growing complexity of modern energy systems that integrate renewable generation, 
          energy storage, and intelligent load management.
        </p>
        <p>
          These installations represent the future of electrical infrastructure, supporting the UK's transition 
          to net-zero carbon emissions whilst maintaining the highest safety standards. From domestic solar-plus-battery 
          systems to commercial microgrids, PEIs are transforming how we generate, store, and consume electrical energy.
        </p>
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-2">Key Learning Areas:</h4>
          <ul className="text-sm space-y-2">
            <li>• Understanding prosumer installation definitions and scope</li>
            <li>• Energy management systems and intelligent control</li>
            <li>• Protection requirements for bi-directional energy flow</li>
            <li>• Battery storage safety and management systems</li>
            <li>• Grid integration and compliance with G98/G99</li>
            <li>• Commissioning and performance verification procedures</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};