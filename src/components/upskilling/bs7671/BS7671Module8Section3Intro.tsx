import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BS7671Module8Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-elec-yellow" />
          Introduction to Amendment 3
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Amendment 3 to BS 7671:2018 represents the most significant update since the 18th Edition's publication, 
          introducing enhanced safety requirements and reflecting the rapid evolution of electrical technology and installation practices.
        </p>
        <p>
          This amendment addresses critical areas including cybersecurity for smart installations, enhanced fire safety measures, 
          updated prosumer installation requirements, and revised protection standards that align with contemporary electrical demands.
        </p>
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600 mt-4">
          <h5 className="text-elec-yellow font-semibold mb-2">Key Amendment 3 Focus Areas:</h5>
          <ul className="text-sm space-y-1">
            <li>• Enhanced cybersecurity requirements for smart systems</li>
            <li>• Expanded AFDD applications and updated requirements</li>
            <li>• Advanced fire safety measures and cable standards</li>
            <li>• Updated prosumer installation guidance (Part 8 enhancements)</li>
            <li>• Revised protection coordination and smart grid integration</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section3Intro;