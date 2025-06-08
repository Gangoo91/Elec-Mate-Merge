
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, Building, Factory, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ElectricalInstallationGuides = () => {
  const installationTypes = [
    {
      title: "Domestic Installations",
      icon: Home,
      description: "Residential electrical work including lighting, sockets, and consumer units",
      features: ["Socket circuits", "Lighting circuits", "Cooker circuits", "Shower circuits"],
      path: "/apprentice/toolbox/electrical-installation-guides/domestic"
    },
    {
      title: "Commercial Installations",
      icon: Building,
      description: "Office buildings, shops, and small commercial premises",
      features: ["Distribution boards", "Emergency lighting", "Fire alarm systems", "Data cabling"],
      path: "/apprentice/toolbox/electrical-installation-guides/commercial"
    },
    {
      title: "Industrial Installations",
      icon: Factory,
      description: "Manufacturing facilities and heavy industrial environments",
      features: ["Motor control", "High voltage systems", "Control panels", "Industrial lighting"],
      path: "/apprentice/toolbox/electrical-installation-guides/industrial"
    },
    {
      title: "Outdoor Installations",
      icon: MapPin,
      description: "External electrical work and street lighting",
      features: ["Street lighting", "Car park lighting", "External sockets", "Underground cables"],
      path: "/apprentice/toolbox/electrical-installation-guides/outdoor"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrical Installation Guides</h1>
          <p className="text-muted-foreground">Step-by-step guides for different types of electrical installations</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {installationTypes.map((type, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <type.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{type.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Key Areas:</h4>
                <ul className="space-y-1">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={type.path}>
                <Button className="w-full" size="sm">
                  View Installation Guide
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ElectricalInstallationGuides;
