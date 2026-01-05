import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Tag, FileText } from 'lucide-react';

export const BMSModule7Section3Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-foreground">Best Practices for Addressing</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <span>Assign addresses systematically (e.g., Modbus meters numbered sequentially across boards)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <span>Label each device with its address (permanent sticker or engraved tag)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <span>Keep an addressing register in the O&M manuals</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <span>For IP devices, request static IPs from IT to avoid conflicts</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-semibold text-foreground">Best Practices for Device Mapping</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <span>Follow the IO list strictly when mapping points</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <span>Use clear naming conventions ("Room 201 Temp Sensor," not "AI-2")</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <span>Test each point during commissioning — don't assume wiring matches documentation</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <span>Confirm alarm and trend configurations match the mapped points</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};