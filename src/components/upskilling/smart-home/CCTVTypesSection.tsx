import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, Eye, RotateCcw, Wifi, DoorOpen } from 'lucide-react';

export const CCTVTypesSection = () => {
  const cameraTypes = [
    {
      name: "Dome Cameras",
      icon: Eye,
      description: "Discreet, indoor use, wide angle coverage",
      features: ["Low profile design", "360° coverage potential", "Vandal resistant"]
    },
    {
      name: "Bullet Cameras",
      icon: Video,
      description: "Long range, outdoor use, visible deterrent",
      features: ["Weather resistant", "Long-range focus", "Clear deterrent effect"]
    },
    {
      name: "PTZ Cameras",
      icon: RotateCcw,
      description: "Pan-Tilt-Zoom - remotely controlled, wide coverage",
      features: ["Remote control", "Zoom capabilities", "Track movement"]
    },
    {
      name: "Turret Cameras",
      icon: Eye,
      description: "Hybrid of dome/bullet, flexible mounting options",
      features: ["Versatile mounting", "Good image quality", "No IR reflection"]
    },
    {
      name: "Wireless Cameras",
      icon: Wifi,
      description: "Connect via Wi-Fi, easy retrofit installation",
      features: ["Easy installation", "Flexible placement", "Remote access"]
    },
    {
      name: "Doorbell Cameras",
      icon: DoorOpen,
      description: "Front-door monitoring, often with two-way audio",
      features: ["Two-way audio", "Motion alerts", "Package detection"]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Video className="h-6 w-6 text-elec-yellow" />
          Types of CCTV Cameras
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameraTypes.map((camera, index) => (
            <div key={index} className="bg-elec-gray rounded-lg p-4 border border-gray-600">
              <div className="flex items-start gap-3 mb-3">
                <camera.icon className="h-5 w-5 text-elec-yellow mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold">{camera.name}</h4>
                  <p className="text-gray-400 text-sm">{camera.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {camera.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};