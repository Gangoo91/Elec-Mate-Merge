
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar, PoundSterling, Users, Clock, ExternalLink, Bookmark, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FirecrawlService } from '@/utils/FirecrawlService';

interface MajorProject {
  id: string;
  title: string;
  description: string;
  client: string;
  location?: string;
  value?: string;
  duration?: string;
  startDate?: string;
  status: "tendering" | "awarded" | "in-progress" | "completed";
  sector: string;
  contractorCount?: number;
  deadline?: string;
  publishedDate?: string;
  source?: string;
  isLive?: boolean;
  scrapedAt?: string;
}

const MajorProjectsCard = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<MajorProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Static fallback projects
  const staticProjects: MajorProject[] = [
    {
      id: "static-1",
      title: "London Underground Station Modernisation",
      description: "Complete electrical system upgrade for 15 underground stations including LED lighting, power distribution, and emergency systems.",
      client: "Transport for London",
      location: "London, UK",
      value: "£45M",
      duration: "18 months",
      startDate: "2024-09-01",
      status: "tendering",
      sector: "Transport",
      contractorCount: 12,
      deadline: "2024-07-15"
    },
    {
      id: "static-2",
      title: "NHS Hospital Electrical Infrastructure",
      description: "New electrical installation for major hospital expansion including critical care units, operating theatres, and backup power systems.",
      client: "NHS Foundation Trust",
      location: "Manchester, UK",
      value: "£32M",
      duration: "24 months",
      startDate: "2024-08-15",
      status: "tendering",
      sector: "Healthcare",
      contractorCount: 8,
      deadline: "2024-06-30"
    },
    {
      id: "static-3",
      title: "Offshore Wind Farm Grid Connection",
      description: "High voltage transmission infrastructure to connect 800MW offshore wind farm to the national grid.",
      client: "SSE Renewables",
      location: "East Anglia, UK",
      value: "£180M",
      duration: "36 months",
      startDate: "2024-10-01",
      status: "awarded",
      sector: "Renewable Energy",
      contractorCount: 25
    }
  ];

  useEffect(() => {
    fetchMajorProjects();
  }, []);

  const fetchMajorProjects = async () => {
    setIsLoading(true);
    try {
      const result = await FirecrawlService.fetchMajorProjects();
      
      if (result.success && result.data) {
        const liveProjects = result.data.map((project: any) => ({
          id: project.id || `live-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: project.title || 'Untitled Project',
          description: project.description || 'No description available',
          client: project.client || 'Not specified',
          location: project.location,
          value: project.value,
          duration: project.duration,
          startDate: project.startDate,
          status: project.status || 'tendering',
          sector: project.sector || 'General',
          deadline: project.deadline,
          publishedDate: project.publishedDate,
          source: project.source,
          isLive: true,
          scrapedAt: project.scrapedAt
        }));
        
        // Combine live projects with static ones
        setProjects([...liveProjects, ...staticProjects]);
        setLastUpdated(new Date().toLocaleTimeString());
        
        toast({
          title: "Projects Updated",
          description: `Fetched ${liveProjects.length} live projects`,
          duration: 3000,
        });
      } else {
        setProjects(staticProjects);
        toast({
          title: "Using Cached Data",
          description: result.error || "Unable to fetch live data",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      setProjects(staticProjects);
      toast({
        title: "Error",
        description: "Failed to fetch live project data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove unused handlers

  const getStatusColor = (status: string) => {
    switch (status) {
      case "tendering": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "awarded": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector.toLowerCase()) {
      case "transport": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "healthcare": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "renewable energy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "smart infrastructure": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "technology": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "tendering": return "Open for Tender";
      case "awarded": return "Contract Awarded";
      case "in-progress": return "In Progress";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Major Projects</h2>
            <p className="text-muted-foreground">
              Latest electrical infrastructure projects and contract opportunities
              {lastUpdated && (
                <span className="text-xs ml-2">• Updated {lastUpdated}</span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchMajorProjects}
              disabled={isLoading}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Building2 className="h-4 w-4 mr-2" />
              Submit Project
            </Button>
          </div>
        </div>

        {/* Live data notification removed - now automatic */}

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                    <Badge className={getSectorColor(project.sector)}>
                      {project.sector}
                    </Badge>
                    {project.isLive && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Live
                      </Badge>
                    )}
                    {project.deadline && project.status === "tendering" && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Client:</span> {project.client}
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="ml-4">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                {project.value && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PoundSterling className="h-4 w-4 text-elec-yellow" />
                    <div>
                      <div className="text-white font-medium">{project.value}</div>
                      <div>Contract Value</div>
                    </div>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-elec-yellow" />
                    <div>
                      <div className="text-white font-medium">{project.duration}</div>
                      <div>Duration</div>
                    </div>
                  </div>
                )}
                {project.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                    <div>
                      <div className="text-white font-medium">{project.location}</div>
                      <div>Location</div>
                    </div>
                  </div>
                )}
                {project.contractorCount && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4 text-elec-yellow" />
                    <div>
                      <div className="text-white font-medium">{project.contractorCount}</div>
                      <div>Contractors</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.startDate 
                      ? `Start Date: ${new Date(project.startDate).toLocaleDateString()}`
                      : project.publishedDate 
                        ? `Published: ${new Date(project.publishedDate).toLocaleDateString()}`
                        : 'Date not specified'
                    }
                  </span>
                </div>
                <div className="flex gap-2">
                  {project.status === "tendering" && (
                    <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      View Tender Details
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
                    onClick={() => project.source && window.open(project.source, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          View All Projects ({projects.length})
        </Button>
      </div>

      {/* API Key dialog removed - now handled automatically */}
    </div>
  );
};

export default MajorProjectsCard;
