import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, AlertCircle } from "lucide-react";

const ElectricalSafetyTab = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-2xl text-elec-yellow">Electrical Safety Fundamentals</CardTitle>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            Understanding electrical safety is fundamental for all electrical work. The Electricity at Work Regulations 1989 place legal responsibilities on both employers and individuals to ensure competence for electrical work.
          </p>
        </CardHeader>
      </Card>

      {/* Key Dangers */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">Understanding Electrical Dangers</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Electric Shock</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Effects range from tingling to death - 50mA can be potentially fatal</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Current flows through body when contact is made with live conductors</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Severity depends on current magnitude, duration, and path through body</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Electrical Fires</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Can result from overheating, arcing, or ignition of combustible materials</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Poor connections and overloaded circuits are common causes</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Arc Flash</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Explosive release of energy from electrical fault</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span className="text-foreground/90">Can cause severe burns, blast injuries, and hearing damage</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Safe Isolation */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">Safe Isolation Procedure</CardTitle>
          </div>
          <p className="text-foreground/70 text-sm">
            Must be followed without exception before working on electrical equipment
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: "1", title: "Identify", detail: "Identify the circuit or equipment to be isolated" },
              { step: "2", title: "Isolate", detail: "Disconnect from all sources of electrical supply" },
              { step: "3", title: "Prove the Tester", detail: "Test voltage indicator on known live source" },
              { step: "4", title: "Test Dead", detail: "Verify circuit is dead using proven voltage indicator" },
              { step: "5", title: "Reprove the Tester", detail: "Test voltage indicator again on known live source" },
              { step: "6", title: "Lock Off and Tag", detail: "Secure isolation point with padlock and warning tags" },
              { step: "7", title: "Issue Permit", detail: "Issue permit to work where required" }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-base font-bold text-elec-yellow flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">{item.title}</h5>
                  <p className="text-foreground/70 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PPE Requirements */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-xl">Personal Protective Equipment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Insulating Gloves", detail: "Must be appropriate for voltage level being worked on" },
              { title: "Face Shields", detail: "Protection against arc flash hazards" },
              { title: "Insulated Tools", detail: "Must be rated for voltages they will be used with" },
              { title: "Safety Boots", detail: "Electrical hazard rated footwear" },
              { title: "Arc Flash Clothing", detail: "Flame-resistant protective garments" },
              { title: "Hard Hat", detail: "Head protection with electrical insulation rating" }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                <h5 className="font-semibold text-foreground mb-2">{item.title}</h5>
                <p className="text-foreground/70 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regulations */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-xl">Key Regulations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
            <h5 className="font-semibold text-elec-yellow mb-2">Electricity at Work Regulations 1989</h5>
            <p className="text-foreground/90 text-sm leading-relaxed">
              Places legal duty on employers and employees to ensure all electrical work is carried out by competent persons and that all electrical systems are maintained to prevent danger.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
            <h5 className="font-semibold text-elec-yellow mb-2">BS 7671 (18th Edition)</h5>
            <p className="text-foreground/90 text-sm leading-relaxed">
              The IET Wiring Regulations - the national standard for electrical installation work in the UK. Compliance is essential for safety and legal compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalSafetyTab;
