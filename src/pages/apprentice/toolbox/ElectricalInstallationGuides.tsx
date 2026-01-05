
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, Building, Factory, MapPin, ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ElectricalInstallationGuides = () => {
  const installationTypes = [
    {
      title: "Domestic Installations",
      icon: Home,
      description: "Residential electrical work including lighting, sockets, and consumer units",
      features: ["Socket circuits", "Lighting circuits", "Cooker circuits", "Shower circuits"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/domestic"
    },
    {
      title: "Commercial Installations",
      icon: Building,
      description: "Office buildings, shops, and small commercial premises",
      features: ["Distribution boards", "Emergency lighting", "Fire alarm systems", "Data cabling"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/commercial"
    },
    {
      title: "Industrial Installations",
      icon: Factory,
      description: "Manufacturing facilities and heavy industrial environments",
      features: ["Motor control", "High voltage systems", "Control panels", "Industrial lighting"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/industrial"
    },
    {
      title: "Outdoor Installations",
      icon: MapPin,
      description: "External electrical work and street lighting",
      features: ["Street lighting", "Car park lighting", "External sockets", "Underground cables"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/outdoor"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrical Installation Guides</h1>
          <p className="text-neutral-300">Step-by-step guides for different types of electrical installations</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to On-Job Tools
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {installationTypes.map((type, index) => (
          <Link key={index} to={type.path} className="group">
            <Card className="h-full bg-elec-gray/90 backdrop-blur-sm border border-elec-yellow/20 hover:border-elec-yellow/40 shadow-md hover:shadow-lg hover:shadow-elec-yellow/10 transition-all duration-300 overflow-hidden relative">
              {/* Gradient shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Prominent icon background */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 group-hover:border-elec-yellow/50 group-hover:from-elec-yellow/30 group-hover:to-elec-yellow/10 transition-all duration-300 shadow-lg shadow-elec-yellow/5">
                      <type.icon className="h-7 w-7 text-elec-yellow group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-elec-yellow transition-colors duration-300">{type.title}</CardTitle>
                  </div>
                  {/* Arrow visible on hover */}
                  <ChevronRight className="h-5 w-5 text-elec-yellow/40 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative pt-2">
                <p className="text-elec-light/70 group-hover:text-elec-light/90 transition-colors duration-300">{type.description}</p>

                <div className="bg-elec-dark/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-elec-yellow/80">Key Areas</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full group-hover:shadow-sm group-hover:shadow-elec-yellow/50"></span>
                        <span className="text-sm text-elec-light/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-elec-yellow/60 group-hover:text-elec-yellow transition-colors duration-300">View Guide</span>
                  <div className="flex items-center gap-1 text-elec-yellow/60 group-hover:text-elec-yellow transition-colors duration-300">
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-medium">Learn More</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Getting Started Card */}
      <Card className="bg-gradient-to-r from-elec-gray/95 via-elec-gray/90 to-elec-dark/95 backdrop-blur-sm border border-elec-yellow/30 shadow-lg shadow-elec-yellow/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <CardContent className="relative py-8 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/25 to-elec-yellow/10 border border-elec-yellow/40 shadow-xl shadow-elec-yellow/10">
                <Zap className="h-10 w-10 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Getting Started</h3>
                <p className="text-elec-light/70 max-w-md">
                  New to electrical installations? Start with our beginner-friendly domestic guides and work your way up to more complex systems.
                </p>
              </div>
            </div>
            <Link to="/apprentice/on-job-tools/electrical-installation-guides/domestic">
              <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold px-6 py-2 shadow-lg shadow-elec-yellow/20 hover:shadow-elec-yellow/30 transition-all duration-300">
                Start Learning
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationGuides;
