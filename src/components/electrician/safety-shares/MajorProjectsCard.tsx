
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, MapPin, Calendar, PoundSterling, Users, Clock, ExternalLink, Bookmark, RefreshCw, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProjectSubmissionDialog } from "./ProjectSubmissionDialog";

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
  category?: string;
  contractorCount?: number;
  deadline?: string;
  view_count?: number;
  average_rating?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  source_url?: string;
  external_project_url?: string;
  tender_deadline?: string;
}

const MajorProjectsCard = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<MajorProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);

  // Enhanced static fallback projects with real URLs
  const staticProjects: MajorProject[] = [
    {
      id: "static-1",
      title: "London Underground Station Modernisation Programme",
      summary: "Complete electrical system upgrade for 15 underground stations including LED lighting, power distribution, and emergency systems.",
      awarded_to: "Transport for London",
      location: "London, UK",
      project_value: "£45M",
      duration: "18 months",
      date_awarded: "2024-09-01",
      status: "active",
      category: "Transport",
      contractorCount: 12,
      tender_deadline: "2025-02-15",
      external_project_url: "https://tfl.gov.uk/corporate/procurement-and-commercial/procurement-opportunities",
      source_url: "https://tfl.gov.uk/corporate/procurement-and-commercial/procurement-opportunities"
    },
    {
      id: "static-2", 
      title: "NHS Hospital Electrical Infrastructure Expansion",
      summary: "New electrical installation for major hospital expansion including critical care units, operating theatres, and backup power systems.",
      awarded_to: "NHS Foundation Trust",
      location: "Manchester, UK",
      project_value: "£32M",
      duration: "24 months",
      date_awarded: "2024-08-15",
      status: "active",
      category: "Healthcare",
      contractorCount: 8,
      tender_deadline: "2025-01-30",
      external_project_url: "https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=nhs+electrical",
      source_url: "https://www.contractsfinder.service.gov.uk"
    },
    {
      id: "static-3",
      title: "Offshore Wind Farm Grid Connection Project",
      summary: "High voltage transmission infrastructure to connect 800MW offshore wind farm to the national grid.",
      awarded_to: "SSE Renewables",
      location: "East Anglia, UK", 
      project_value: "£180M",
      duration: "36 months",
      date_awarded: "2024-10-01",
      status: "awarded",
      category: "Energy",
      contractorCount: 25,
      external_project_url: "https://www.sse.com/about-us/investor-centre/debt-investors/procurement/",
      source_url: "https://www.sse.com"
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
        .select(`
          id, title, summary, content, awarded_to, location, project_value, 
          date_awarded, status, category, view_count, average_rating, 
          is_active, created_at, updated_at, tender_deadline, 
          source_url, external_project_url
        `)
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
        category: project.category || determineSectorFromContent(project.content || project.summary),
        view_count: project.view_count,
        average_rating: project.average_rating,
        contractorCount: estimateContractorCount(project.project_value),
        duration: estimateDuration(project.content || project.summary),
        tender_deadline: project.tender_deadline,
        external_project_url: project.external_project_url,
        source_url: project.source_url
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

  const handleViewProject = (project: MajorProject) => {
    const projectUrl = getProjectUrl(project);
    
    // Track view if analytics is available
    if (project.id && !project.id.startsWith('static-')) {
      trackProjectView(project.id);
    }
    
    window.open(projectUrl, '_blank', 'noopener,noreferrer');
  };

  const getProjectUrl = (project: MajorProject): string => {
    // Priority 1: Direct external project URL
    if (project.external_project_url) {
      return project.external_project_url;
    }
    
    // Priority 2: Source URL
    if (project.source_url) {
      return project.source_url;
    }
    
    // Priority 3: Static project specific URLs
    if (project.id.startsWith('static-')) {
      return project.source_url || generateSearchUrl(project);
    }
    
    // Fallback: Generate search URL
    return generateSearchUrl(project);
  };

  const generateSearchUrl = (project: MajorProject): string => {
    const searchTerm = encodeURIComponent(`${project.title} ${project.awarded_to}`);
    return `https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=${searchTerm}`;
  };

  const trackProjectView = async (projectId: string) => {
    try {
      await supabase
        .from('safety_content_views')
        .insert({
          content_type: 'major_projects',
          content_id: projectId,
          user_id: null // Anonymous tracking
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const ProjectDetailModal = ({ project }: { project: MajorProject }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white">{project.title}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Status and Category Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
          {project.category && (
            <Badge className={getSectorColor(project.category)}>
              {project.category}
            </Badge>
          )}
        </div>

        {/* Project Summary */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Project Overview</h3>
          <p className="text-gray-300">{project.summary}</p>
          {project.content && project.content !== project.summary && (
            <div className="mt-3">
              <p className="text-gray-300">{project.content}</p>
            </div>
          )}
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="text-white font-medium">{project.awarded_to}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Contract Value</p>
            <p className="text-white font-medium">{project.project_value || 'TBC'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-white font-medium">{project.location || 'UK'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-white font-medium">{project.duration || '18 months'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="text-white font-medium">
              {project.date_awarded 
                ? new Date(project.date_awarded).toLocaleDateString('en-GB')
                : 'TBC'
              }
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Estimated Contractors</p>
            <p className="text-white font-medium">{project.contractorCount || 5}</p>
          </div>
        </div>

        {/* Deadline Info */}
        {project.tender_deadline && getStatusText(project.status) === "Open for Tender" && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-red-400 font-medium">Tender Deadline</p>
                <p className="text-white">{new Date(project.tender_deadline).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-elec-yellow/20">
          <Button 
            onClick={() => handleViewProject(project)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Project
          </Button>
          
          {getStatusText(project.status) === "Open for Tender" && (
            <Button variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Download Tender Documents
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('tender') || statusLower === 'active') return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (statusLower.includes('award') || statusLower === 'awarded') return "bg-green-500/20 text-green-400 border-green-500/30";
    if (statusLower.includes('progress')) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (statusLower.includes('complet')) return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  };

  const getSectorColor = (category: string) => {
    if (!category) return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    switch (category.toLowerCase()) {
      case "transport": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "healthcare": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "energy": 
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
            <Button 
              onClick={() => setIsSubmissionDialogOpen(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
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
                {project.category && (
                  <Badge className={getSectorColor(project.category)}>
                    {project.category}
                  </Badge>
                )}
                {project.tender_deadline && getStatusText(project.status) === "Open for Tender" && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Deadline: {new Date(project.tender_deadline).toLocaleDateString('en-GB')}
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
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 font-medium"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <ProjectDetailModal project={project} />
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-elec-dark bg-elec-dark text-white hover:bg-elec-dark/80 font-medium"
                  onClick={() => handleViewProject(project)}
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
      
      <ProjectSubmissionDialog
        open={isSubmissionDialogOpen}
        onOpenChange={setIsSubmissionDialogOpen}
        onProjectSubmitted={fetchMajorProjects}
      />
    </div>
  );
};

export default MajorProjectsCard;
