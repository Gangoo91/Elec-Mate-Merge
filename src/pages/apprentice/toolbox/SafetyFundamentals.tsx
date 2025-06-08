
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, HardHat, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyFundamentals = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Fundamentals</h1>
          <p className="text-muted-foreground">Core safety principles and practices for electrical work environments</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-500/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-red-400" />
              <CardTitle>Electrical Safety</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-elec-light/80">
              <li>• Always isolate before work</li>
              <li>• Test before touch</li>
              <li>• Use proper PPE</li>
              <li>• Follow lockout procedures</li>
              <li>• Never work live unless essential</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HardHat className="h-6 w-6 text-amber-400" />
              <CardTitle>Site Safety</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-elec-light/80">
              <li>• Wear appropriate PPE</li>
              <li>• Follow site rules</li>
              <li>• Report hazards immediately</li>
              <li>• Keep work areas tidy</li>
              <li>• Use tools correctly</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Emergency Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-red-400">Electrical Shock</h3>
              <ol className="text-sm space-y-1 text-elec-light/80">
                <li>1. Do not touch the victim</li>
                <li>2. Switch off power if safe</li>
                <li>3. Call emergency services</li>
                <li>4. Administer first aid if trained</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-red-400">Fire Emergency</h3>
              <ol className="text-sm space-y-1 text-elec-light/80">
                <li>1. Raise the alarm</li>
                <li>2. Evacuate the area</li>
                <li>3. Call fire brigade</li>
                <li>4. Use appropriate extinguisher if trained</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
