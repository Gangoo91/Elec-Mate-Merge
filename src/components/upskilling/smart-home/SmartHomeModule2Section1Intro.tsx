import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule2Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart devices don't work in isolation — they need a way to communicate. <strong className="text-foreground">Wireless protocols</strong> define how devices talk to each other: the language, range, speed, and energy use. Choosing the right protocol impacts reliability, compatibility, and the overall user experience.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Communication Standards</h4>
            <p className="text-blue-100 text-sm">Protocols ensure devices can exchange data reliably using defined rules and formats.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">System Compatibility</h4>
            <p className="text-green-100 text-sm">Understanding protocols helps ensure all devices work together seamlessly in your smart home.</p>
          </div>
        </div>

        <p>
          This section introduces learners to the key wireless communication methods used in smart homes, from traditional Wi-Fi to emerging standards like Matter.
        </p>
      </CardContent>
    </Card>
  );
};