import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const SmartHomeModule7Section6Summary = () => {
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
          This section demonstrated that documentation, warranty management, and aftercare are essential components of professional smart home installations that protect both installers and clients.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Documentation Standards</h4>
            <ul className="text-sm space-y-1">
              <li>• Comprehensive records provide compliance evidence and liability protection</li>
              <li>• BS 7671 documentation requirements must be met for all electrical work</li>
              <li>• Digital packages improve accessibility and professional presentation</li>
            </ul>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Warranty and Aftercare</h4>
            <ul className="text-sm space-y-1">
              <li>• Clear warranty explanations prevent disputes and build trust</li>
              <li>• Structured aftercare creates ongoing professional relationships</li>
              <li>• Professional standards demonstrate competence and reduce liability</li>
            </ul>
          </div>
        </div>
        
        <p>
          The real-world example highlighted how proper documentation protected the installer from liability, 
          enabled successful warranty claims, and ultimately strengthened client relationships.
        </p>

        <p>
          Professional electricians understand that the installation job is not complete until comprehensive 
          documentation is provided and aftercare arrangements are established. This final step protects 
          everyone involved and creates opportunities for ongoing professional success.
        </p>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section6Summary;