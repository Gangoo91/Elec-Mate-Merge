import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const BS7671Module7Section4FAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="space-y-4">
          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: When is a medical IT system required in healthcare facilities?</h5>
            <p className="text-sm">
              <strong>A:</strong> Medical IT systems are mandatory for Group 2 medical locations where applied parts may come into direct contact with the patient's heart or where intracardiac procedures are performed. This includes operating theatres, intensive care units, cardiac catheterisation labs, and angiography suites. The IT system ensures that a first earth fault will not cause dangerous currents to flow through the patient.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: What's the difference between orange and blue medical socket outlets?</h5>
            <p className="text-sm">
              <strong>A:</strong> Orange socket outlets are supplied from the medical IT system and are used in Group 2 locations for life-critical equipment. Blue socket outlets are supplied from the general TN earthing system and are used for non-life-critical equipment in all medical groups. Green outlets indicate emergency supply. Each type has different earth arrangements and protection systems to match their risk level.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: How do you achieve selective coordination in industrial installations?</h5>
            <p className="text-sm">
              <strong>A:</strong> Selective coordination requires time-graded protection where upstream devices have longer time delays than downstream devices. Typically: final circuits operate instantaneously (0.01-0.1s), distribution level has short delays (0.1-0.4s), and incoming protection has long delays (0.4-1.2s). Electronic trip units and zone-selective interlocking help achieve better coordination.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: What emergency power requirements apply to medical facilities?</h5>
            <p className="text-sm">
              <strong>A:</strong> Medical facilities require UPS systems providing minimum 10 minutes backup for life-critical equipment, with automatic changeover within 0.5 seconds. Standby generators must start within 10 seconds for extended outages. Emergency lighting requires 3-hour minimum battery backup. All emergency systems need regular testing and maintenance documentation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};