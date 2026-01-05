import { ArrowLeft, Wifi, Radio, Bluetooth, Network, CircleDot, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Wireless Protocol Overview",
      icon: Radio,
      description: "Understanding different wireless communication protocols",
      link: "../smart-home-module-2-section-1"
    },
    {
      id: 2,
      title: "Zigbee vs Z-Wave: Range, Mesh, Power Use", 
      icon: Network,
      description: "Comparing the two major mesh protocols",
      link: "../smart-home-module-2-section-2"
    },
    {
      id: 3,
      title: "Wi-Fi, Bluetooth, Thread, and Matter",
      icon: Wifi,
      description: "Modern protocols including the new Matter standard",
      link: "../smart-home-module-2-section-3"
    },
    {
      id: 4,
      title: "Interference, Channels, and Bandwidth",
      icon: Bluetooth,
      description: "Managing signal interference and channel allocation",
      link: "../smart-home-module-2-section-4"
    },
    {
      id: 5,
      title: "Hub vs Hubless Ecosystems",
      icon: CircleDot,
      description: "Understanding centralised vs distributed architectures",
      link: "../smart-home-module-2-section-5"
    },
    {
      id: 6,
      title: "Compatibility Mapping and Bridge Use",
      icon: GitBranch,
      description: "Connecting different protocols and legacy systems",
      link: "../smart-home-module-2-section-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Smart Home Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 2: Smart Protocols – Zigbee, Z-Wave, Wi-Fi, and More
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding communication protocols and system compatibility
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                6 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                60 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link key={section.id} to={section.link || '#'}>
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                  <div className="flex justify-center">
                    <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                  </div>
                  
                  <div className="flex justify-center">
                    <Badge 
                      variant="secondary" 
                      className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                    >
                      Section {section.id}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule2;