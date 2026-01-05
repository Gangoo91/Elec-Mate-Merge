import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const SmartHomeModule7Section4Summary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          This section emphasised that electrical safety is fundamental in smart home work and cannot be compromised regardless of how "simple" a device installation may appear.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Safety Fundamentals</h4>
            <ul className="text-sm space-y-1">
              <li>• Always isolate circuits at the consumer unit using lock-off and proving units</li>
              <li>• BS 7671 requires RCD protection, proper containment, and separation of circuits</li>
              <li>• Never rely on switches or software controls for isolation</li>
            </ul>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Risk Management</h4>
            <ul className="text-sm space-y-1">
              <li>• Risks include live parts, poor earthing, and incorrect circuit segregation</li>
              <li>• Mixed voltage installations require special attention to prevent cross-contamination</li>
              <li>• Testing and documentation are essential for compliance and safety assurance</li>
            </ul>
          </div>
        </div>
        
        <p>
          Following BS 7671 requirements protects installers, clients, and maintains industry reputation. The real-world example demonstrated how shortcuts create dangerous situations that proper procedures prevent.
        </p>

        <p>
          Professional electricians understand that safety compliance is not optional — it's the foundation upon which all successful smart home installations are built.
        </p>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section4Summary;