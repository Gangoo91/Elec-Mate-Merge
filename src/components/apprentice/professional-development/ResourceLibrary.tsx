
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, ExternalLink, Download, Clock, Star } from "lucide-react";

const ResourceLibrary = () => {
  const resources = [
    {
      title: "IET Wiring Regulations (BS 7671:2018+A2:2022)",
      type: "Regulation",
      format: "PDF",
      description: "Complete electrical installation regulations for the UK",
      provider: "IET",
      rating: 5,
      downloads: "2.5k",
      icon: FileText,
      category: "Essential"
    },
    {
      title: "Electrical Safety First Guidelines",
      type: "Safety Guide",
      format: "PDF",
      description: "Comprehensive safety guidelines for electrical work",
      provider: "Electrical Safety First",
      rating: 5,
      downloads: "1.8k",
      icon: FileText,
      category: "Safety"
    },
    {
      title: "JIB Grading Scheme Handbook",
      type: "Career Guide",
      format: "PDF",
      description: "Understanding electrical industry grading and progression",
      provider: "JIB",
      rating: 4,
      downloads: "980",
      icon: BookOpen,
      category: "Career"
    },
    {
      title: "Solar PV Installation Best Practices",
      type: "Technical Guide",
      format: "Video Series",
      description: "Complete guide to photovoltaic system installation",
      provider: "NICEIC",
      rating: 5,
      downloads: "1.2k",
      icon: Video,
      category: "Renewable"
    },
    {
      title: "EV Charging Infrastructure Guide",
      type: "Technical Guide",
      format: "PDF + Video",
      description: "Electric vehicle charging point installation guidance",
      provider: "BEAMA",
      rating: 4,
      downloads: "756",
      icon: FileText,
      category: "EV Technology"
    },
    {
      title: "Smart Home Electrical Systems",
      type: "Technical Guide",
      format: "Interactive",
      description: "IoT and smart building electrical installations",
      provider: "KNX UK",
      rating: 4,
      downloads: "543",
      icon: BookOpen,
      category: "Smart Tech"
    }
  ];

  const categories = [
    { name: "All", count: 24, active: true },
    { name: "Essential", count: 8, active: false },
    { name: "Safety", count: 6, active: false },
    { name: "Career", count: 4, active: false },
    { name: "Renewable", count: 3, active: false },
    { name: "Smart Tech", count: 3, active: false }
  ];

  const webinars = [
    {
      title: "Future of Electrical Work",
      date: "15 March 2024",
      time: "14:00 GMT",
      speaker: "Dr. Sarah Wilson, IET",
      registrations: 245
    },
    {
      title: "18th Edition Amendment Updates",
      date: "22 March 2024",
      time: "10:00 GMT", 
      speaker: "Mark Thompson, City & Guilds",
      registrations: 189
    },
    {
      title: "Career Progression in Renewables",
      date: "5 April 2024",
      time: "15:30 GMT",
      speaker: "Emma Davies, Solar Power Portal",
      registrations: 167
    }
  ];

  const getFormatIcon = (format: string) => {
    if (format.includes('Video')) return Video;
    if (format.includes('PDF')) return FileText;
    return BookOpen;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Essential: 'bg-red-500/20 text-red-400',
      Safety: 'bg-orange-500/20 text-orange-400',
      Career: 'bg-blue-500/20 text-blue-400',
      Renewable: 'bg-green-500/20 text-green-400',
      'EV Technology': 'bg-purple-500/20 text-purple-400',
      'Smart Tech': 'bg-cyan-500/20 text-cyan-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Resource Categories */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Resource Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category.active ? "default" : "outline"}
                size="sm"
                className={category.active ? "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30" : "border-elec-yellow/30"}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Library */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Professional Development Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {resources.map((resource, index) => {
              const FormatIcon = getFormatIcon(resource.format);
              return (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FormatIcon className="h-4 w-4 text-elec-yellow" />
                        <Badge className={getCategoryColor(resource.category)} variant="outline">
                          {resource.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < resource.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{resource.provider}</p>
                    <p className="text-sm text-elec-light/80 mb-3">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{resource.format}</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-elec-yellow/30">
                        <Download className="mr-1 h-3 w-3" />
                        Access
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Webinars */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-elec-yellow" />
            Upcoming Professional Development Webinars
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {webinars.map((webinar, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-elec-dark/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">{webinar.title}</h3>
                  <p className="text-sm text-muted-foreground">{webinar.speaker}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {webinar.date} at {webinar.time}
                    </span>
                    <span>{webinar.registrations} registered</span>
                  </div>
                </div>
                <Button size="sm" className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
                  Register
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-elec-yellow" />
            External Professional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start border-elec-yellow/30 h-auto p-4">
              <div className="text-left">
                <div className="font-medium">IET Standards</div>
                <div className="text-xs text-muted-foreground">Technical standards and guidance</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start border-elec-yellow/30 h-auto p-4">
              <div className="text-left">
                <div className="font-medium">HSE Guidance</div>
                <div className="text-xs text-muted-foreground">Health and safety regulations</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start border-elec-yellow/30 h-auto p-4">
              <div className="text-left">
                <div className="font-medium">BEIS Updates</div>
                <div className="text-xs text-muted-foreground">Government policy changes</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLibrary;
