import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, TrendingUp } from 'lucide-react';

export const ResolutionStandardsSection = () => {
  const resolutions = [
    {
      name: "Standard Definition (SD)",
      pixels: "720 × 480",
      status: "Outdated",
      description: "Low clarity, not recommended for modern installs",
      statusColor: "bg-red-500/20 text-red-400 border-red-500/30"
    },
    {
      name: "HD (720p)",
      pixels: "1280 × 720",
      status: "Entry-level",
      description: "Basic domestic installs, budget-friendly option",
      statusColor: "bg-orange-500/20 text-orange-400 border-orange-500/30"
    },
    {
      name: "Full HD (1080p)",
      pixels: "1920 × 1080",
      status: "Standard",
      description: "Widely used, clear detail for most applications",
      statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    },
    {
      name: "2K / 4MP",
      pixels: "2560 × 1440",
      status: "Popular",
      description: "Better detail, popular in mid-range systems",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30"
    },
    {
      name: "4K (8MP)",
      pixels: "3840 × 2160",
      status: "High-end",
      description: "Premium installs, wide coverage with digital zoom",
      statusColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Monitor className="h-6 w-6 text-elec-yellow" />
          Resolution Standards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-elec-gray rounded-lg p-4 border border-gray-600">
          <p className="text-gray-300 mb-2">
            <strong>Resolution is measured in pixels (width × height)</strong>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <TrendingUp className="h-4 w-4" />
            Higher resolution = more detail but larger storage needs
          </div>
        </div>

        <div className="space-y-3">
          {resolutions.map((resolution, index) => (
            <div key={index} className="bg-elec-gray rounded-lg p-4 border border-gray-600">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-foreground font-semibold">{resolution.name}</h4>
                  <p className="text-gray-400 text-sm font-mono">{resolution.pixels}</p>
                </div>
                <Badge variant="outline" className={resolution.statusColor}>
                  {resolution.status}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm">{resolution.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};