
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar, PoundSterling, Users, Clock, ExternalLink, Bookmark, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MajorProject {
  id: string;
  title: string;
  summary: string;
  content?: string;
  awarded_to: string;
  location?: string;
  project_value?: string;
  duration?: string;
  date_awarded?: string;
  status: string;
  sector?: string;
  contractorCount?: number;
  deadline?: string;
  view_count?: number;
  average_rating?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
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
      summary: "Complete electrical system upgrade for 15 underground stations including LED lighting, power distribution, and emergency systems.",
      awarded_to: "Transport for London",
      location: "London, UK",
      project_value: "£45M",
      duration: "18 months",
      date_awarded: "2024-09-01",
      status: "active",
      sector: "Transport",
      contractorCount: 12,
      deadline: "2024-07-15"
    },
    {
      id: "static-2",
      title: "NHS Hospital Electrical Infrastructure",
      summary: "New electrical installation for major hospital expansion including critical care units, operating theatres, and backup power systems.",
      awarded_to: "NHS Foundation Trust",
      location: "Manchester, UK",
      project_value: "£32M",
      duration: "24 months",
      date_awarded: "2024-08-15",
      status: "active",
      sector: "Healthcare",
      contractorCount: 8,
      deadline: "2024-06-30"
    },
    {
      id: "static-3",
      title: "Offshore Wind Farm Grid Connection",
      summary: "High voltage transmission infrastructure to connect 800MW offshore wind farm to the national grid.",
      awarded_to: "SSE Renewables",
      location: "East Anglia, UK",
      project_value: "£180M",
      duration: "36 months",
      date_awarded: "2024-10-01",
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
      // First fetch existing database projects
      const { data: dbProjects, error: dbError } = await supabase
        .from('major_projects')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (dbError) {
        console.error('Database error:', dbError);
      }

      // Then trigger Firecrawl scraping for new data
      const { data: scrapeResult, error: scrapeError } = await supabase.functions.invoke('fetch-projects');
      
      if (scrapeError) {
        console.error('Scraping error:', scrapeError);
      }

      // Map database projects to component format
      const mappedProjects: MajorProject[] = (dbProjects || []).map(project => ({
        id: project.id,
        title: project.title,
        summary: project.summary,
        content: project.content,
        awarded_to: project.awarded_to,
        location: project.location,
        project_value: project.project_value,
        date_awarded: project.date_awarded,
        status: project.status,
        sector: determineSectorFromContent(project.content || project.summary),
        view_count: project.view_count,
        average_rating: project.average_rating,
        contractorCount: estimateContractorCount(project.project_value),
        duration: estimateDuration(project.content || project.summary),
        deadline: estimateDeadline(project.status)
      }));

      setProjects(mappedProjects);
      setLastUpdated(new Date().toLocaleTimeString());
      
      const newProjectsCount = scrapeResult?.scrapedProjects || 0;
      
      toast({
        title: "Projects Updated",
        description: `Showing ${mappedProjects.length} projects${newProjectsCount > 0 ? ` (${newProjectsCount} newly scraped)` : ''}`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Fetch error:', error);
      setProjects(staticProjects);
      toast({
        title: "Error",
        description: "Failed to fetch project data, showing fallback data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions to enrich data
  const determineSectorFromContent = (content: string): string => {
    if (!content) return 'Infrastructure';
    const contentLower = content.toLowerCase();
    if (contentLower.includes('hospital') || contentLower.includes('health')) return 'Healthcare';
    if (contentLower.includes('transport') || contentLower.includes('railway') || contentLower.includes('underground')) return 'Transport';
    if (contentLower.includes('school') || contentLower.includes('university')) return 'Education';
    if (contentLower.includes('wind') || contentLower.includes('renewable') || contentLower.includes('solar')) return 'Renewable Energy';
    if (contentLower.includes('data') || contentLower.includes('digital')) return 'Technology';
    return 'Infrastructure';
  };

  const estimateContractorCount = (value: string | undefined): number => {
    if (!value) return 5;
    const numValue = parseFloat(value.replace(/[£,]/g, ''));
    if (value.includes('billion') || numValue > 1000) return 25;
    if (value.includes('million') || numValue > 100) return 15;
    if (numValue > 50) return 10;
    return 5;
  };

  const estimateDuration = (content: string): string => {
    if (!content) return '12 months';
    const contentLower = content.toLowerCase();
    if (contentLower.includes('year')) return '24 months';
    if (contentLower.includes('month')) {
      const monthMatch = contentLower.match(/(\d+)\s*month/);
      if (monthMatch) return `${monthMatch[1]} months`;
    }
    return '18 months';
  };

  const estimateDeadline = (status: string): string | undefined => {
    if (status === 'active' || status.includes('tender')) {
      return new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString();
    }
    return undefined;
  };

  // Remove unused handlers

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('tender') || statusLower === 'active') return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (statusLower.includes('award') || statusLower === 'awarded') return "bg-green-500/20 text-green-400 border-green-500/30";
    if (statusLower.includes('progress')) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (statusLower.includes('complet')) return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  };

  const getSectorColor = (sector: string) => {
    if (!sector) return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    switch (sector.toLowerCase()) {
      case "transport": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "healthcare": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "renewable energy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "infrastructure": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "technology": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "education": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('tender') || statusLower === 'active') return "Open for Tender";
    if (statusLower.includes('award') || statusLower === 'awarded') return "Contract Awarded";
    if (statusLower.includes('progress')) return "In Progress";
    if (statusLower.includes('complet')) return "Completed";
    return "Active";
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border border-elec-yellow/10 bg-elec-card hover:border-elec-yellow/20">
            <CardHeader className="pb-4">
              {/* Tags at the top */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={getStatusColor(project.status)}>
                  {getStatusText(project.status)}
                </Badge>
                {project.sector && (
                  <Badge className={getSectorColor(project.sector)}>
                    {project.sector}
                  </Badge>
                )}
                {project.deadline && getStatusText(project.status) === "Open for Tender" && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Deadline: {new Date(project.deadline).toLocaleDateString('en-GB')}
                  </Badge>
                )}
              </div>
              
              {/* Project Title - Bold and centered */}
              <CardTitle className="text-xl font-bold text-center text-white mb-3 line-clamp-2">
                {project.title}
              </CardTitle>
              
              {/* Short Description */}
              <p className="text-gray-300 text-sm text-center mb-3 line-clamp-3">
                {project.summary}
              </p>
              
              {/* Client */}
              <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Client: <span className="text-elec-yellow hover:text-elec-yellow/80 transition-colors cursor-pointer">{project.awarded_to}</span>
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Key Info Row - 4 icons with labels */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">{project.project_value || 'TBC'}</div>
                  <div className="text-xs text-muted-foreground">Contract Value</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Clock className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">{project.duration || '18 months'}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <MapPin className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">{project.location || 'UK'}</div>
                  <div className="text-xs text-muted-foreground">Location</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Users className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">{project.contractorCount || 5}</div>
                  <div className="text-xs text-muted-foreground">Contractors</div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                {/* Start Date - Bottom left with calendar icon */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.date_awarded 
                      ? new Date(project.date_awarded).toLocaleDateString('en-GB')
                      : 'TBC'
                    }
                  </span>
                </div>
                
                {/* Bookmark button - Top right */}
                <Button size="sm" variant="ghost" className="hover:bg-elec-yellow/10">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Action Buttons - Bottom right */}
              <div className="flex gap-2 mt-4 justify-end">
                {getStatusText(project.status) === "Open for Tender" && (
                  <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium">
                    View Tender Details
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-elec-dark bg-elec-dark text-white hover:bg-elec-dark/80 font-medium"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project
                </Button>
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
