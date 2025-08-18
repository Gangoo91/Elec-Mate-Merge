
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar, PoundSterling, Users, Clock, ExternalLink, Bookmark, RefreshCw, AlertCircle } from "lucide-react";
import { FirecrawlService } from "@/utils/FirecrawlService";
import { useToast } from "@/components/ui/use-toast";

interface MajorProject {
  id: string;
  title: string;
  description: string;
  client: string;
  location: string;
  value: string;
  duration: string;
  startDate: string;
  status: "tendering" | "awarded" | "in-progress" | "completed";
  sector: string;
  contractorCount: number;
  deadline?: string;
  source?: string;
}

const MajorProjectsCard = () => {
  const [projects, setProjects] = useState<MajorProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Default projects as fallback
  const defaultProjects: MajorProject[] = [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
    },
    {
      id: "4",
      title: "Smart City Infrastructure Project",
      description: "Installation of smart lighting, EV charging points, and IoT infrastructure across the city centre.",
      client: "Birmingham City Council",
      location: "Birmingham, UK",
      value: "£28M",
      duration: "15 months",
      startDate: "2024-07-01",
      status: "in-progress",
      sector: "Smart Infrastructure",
      contractorCount: 15
    },
    {
      id: "5",
      title: "Data Centre Electrical Installation",
      description: "Complete electrical infrastructure for new hyperscale data centre including UPS systems, backup generators, and cooling.",
      client: "Amazon Web Services",
      location: "Dublin, Ireland",
      value: "£95M",
      duration: "20 months",
      startDate: "2024-06-01",
      status: "in-progress",
      sector: "Technology",
      contractorCount: 18
    }
  ];

  useEffect(() => {
    // Load default projects initially
    setProjects(defaultProjects);
    
    // Check if there's cached data
    const cached = localStorage.getItem('majorProjects');
    const cacheTimestamp = localStorage.getItem('majorProjectsTimestamp');
    
    if (cached && cacheTimestamp) {
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      if (cacheAge < 30 * 60 * 1000) { // 30 minutes
        const cachedProjects = JSON.parse(cached);
        if (cachedProjects.length > 0) {
          setProjects(cachedProjects);
          setLastUpdated(new Date(parseInt(cacheTimestamp)).toLocaleTimeString());
        }
      }
    }
  }, []);

  const fetchLatestProjects = async () => {
    const apiKey = FirecrawlService.getApiKey();
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Firecrawl API key first to fetch live data.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching latest major projects...');
      const result = await FirecrawlService.scrapeMajorProjects();
      
      if (result.success && result.data?.projects?.length > 0) {
        const scrapedProjects = result.data.projects;
        const combinedProjects = [...scrapedProjects, ...defaultProjects].slice(0, 8);
        
        setProjects(combinedProjects);
        setLastUpdated(new Date().toLocaleTimeString());
        
        // Cache the results
        localStorage.setItem('majorProjects', JSON.stringify(combinedProjects));
        localStorage.setItem('majorProjectsTimestamp', Date.now().toString());
        
        toast({
          title: "Projects Updated",
          description: `Found ${scrapedProjects.length} new projects from live sources.`,
        });
      } else {
        throw new Error(result.error || 'No projects found');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch projects');
      
      toast({
        title: "Update Failed",
        description: "Could not fetch latest projects. Showing cached data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">Latest electrical infrastructure projects and contract opportunities</p>
            {lastUpdated && (
              <span className="text-xs text-elec-yellow">Last updated: {lastUpdated}</span>
            )}
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-1">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={fetchLatestProjects}
            disabled={loading}
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Refresh Projects'}
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Building2 className="h-4 w-4 mr-2" />
            Submit Project
          </Button>
        </div>
      </div>

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
                <div className="flex items-center gap-2 text-muted-foreground">
                  <PoundSterling className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <div className="text-white font-medium">{project.value}</div>
                    <div>Contract Value</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <div className="text-white font-medium">{project.duration}</div>
                    <div>Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <div className="text-white font-medium">{project.location}</div>
                    <div>Location</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <div className="text-white font-medium">{project.contractorCount}</div>
                    <div>Contractors</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Start Date: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  {project.status === "tendering" && (
                    <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      View Tender Details
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
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
          View All Projects
        </Button>
      </div>
    </div>
  );
};

export default MajorProjectsCard;
