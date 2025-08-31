
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, MapPin, Calendar, PoundSterling, Users, Clock, ExternalLink, Bookmark, RefreshCw, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ProjectSubmissionDialog } from "./ProjectSubmissionDialog";
import { supabase } from "@/integrations/supabase/client";

interface MajorProject {
  id: string;
  project_name: string;
  description: string;
  client: string;
  location?: string;
  contract_value?: string;
  duration?: string;
  start_date?: string;
  status: string;
  category?: string;
  contractors?: string;
  awarded?: boolean;
  details_link?: string;
  project_link?: string;
  view_count?: number;
  average_rating?: number;
  created_at?: string;
  updated_at?: string;
}

const MajorProjectsCard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);

  // Enhanced static fallback projects with real URLs
  const staticProjects: MajorProject[] = [
    {
      id: "static-1",
      project_name: "London Underground Station Modernisation Programme",
      description: "Complete electrical system upgrade for 15 underground stations including LED lighting, power distribution, and emergency systems.",
      client: "Transport for London",
      location: "London, UK",
      contract_value: "£45M",
      duration: "18 months",
      start_date: "2024-09-01",
      status: "active",
      category: "Transport",
      contractors: "Balfour Beatty, Siemens, VolkerRail",
      awarded: true,
      project_link: "https://tfl.gov.uk/corporate/procurement-and-commercial/procurement-opportunities",
      details_link: "https://tfl.gov.uk/corporate/procurement-and-commercial/procurement-opportunities"
    },
    {
      id: "static-2", 
      project_name: "NHS Hospital Electrical Infrastructure Expansion",
      description: "New electrical installation for major hospital expansion including critical care units, operating theatres, and backup power systems.",
      client: "NHS Foundation Trust",
      location: "Manchester, UK",
      contract_value: "£32M",
      duration: "24 months",
      start_date: "2024-08-15",
      status: "active",
      category: "Healthcare",
      contractors: "Kier Construction, Schneider Electric",
      awarded: true,
      project_link: "https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=nhs+electrical",
      details_link: "https://www.contractsfinder.service.gov.uk"
    },
    {
      id: "static-3",
      project_name: "Offshore Wind Farm Grid Connection Project",
      description: "High voltage transmission infrastructure to connect 800MW offshore wind farm to the national grid.",
      client: "SSE Renewables",
      location: "East Anglia, UK", 
      contract_value: "£180M",
      duration: "36 months",
      start_date: "2024-10-01",
      status: "awarded",
      category: "Energy",
      contractors: "National Grid, Ørsted, Prysmian Group, ABB, GE Grid Solutions",
      awarded: true,
      project_link: "https://www.sse.com/about-us/investor-centre/debt-investors/procurement/",
      details_link: "https://www.sse.com"
    }
  ];

  // Validate project data quality
  const isValidProject = (project: any): boolean => {
    if (!project.project_name || !project.description || !project.client) return false;
    
    // Filter out test data and meaningless entries
    const title = project.project_name.toLowerCase();
    const description = project.description.toLowerCase();
    const client = project.client.toLowerCase();
    
    // Check for minimum content quality
    if (project.project_name.length < 5 || project.description.length < 10) return false;
    
    // Filter out obvious test data patterns
    const testPatterns = /^[a-z]{1,5}$|^test|^example|^sample/i;
    if (testPatterns.test(project.project_name) || testPatterns.test(project.client)) return false;
    
    // Check for meaningful content
    const hasValidWords = title.includes('electrical') || title.includes('infrastructure') || 
                         title.includes('project') || title.includes('contract') ||
                         description.includes('electrical') || description.includes('infrastructure');
    
    return hasValidWords;
  };

  const fetchMajorProjects = async (): Promise<MajorProject[]> => {
    console.log('🔧 Fetching live UK Contracts Finder data via Supabase Edge Function...');
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-projects');
      
      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data || !data.projects) {
        console.warn('No projects data received from edge function');
        throw new Error('No projects data received');
      }

      const projects = data.projects as any[];
      console.log(`✅ Received ${projects.length} projects from edge function`);

      // Transform to match our interface
      const transformedProjects: MajorProject[] = projects.map((project: any, index: number) => ({
        id: `api-${Date.now()}-${index}`,
        project_name: project.project_name || "",
        description: project.description || "",
        client: project.client || "",
        location: project.location || "",
        contract_value: project.contract_value || "",
        duration: project.duration || "",
        start_date: project.start_date || "",
        status: project.status || "awarded",
        category: project.category || determineSectorFromContent(project.description || ""),
        contractors: project.contractors || "",
        awarded: project.awarded || false,
        details_link: project.details_link || "",
        project_link: project.project_link || ""
      }));

      // Filter valid projects
      const validProjects = transformedProjects.filter(isValidProject);

      if (validProjects.length > 0) {
        toast({
          title: "Projects Updated",
          description: `Loaded ${validProjects.length} live electrical infrastructure projects`,
          duration: 3000,
        });
        return validProjects;
      } else {
        console.log('📊 No valid electrical projects found, using static fallback');
        toast({
          title: "Using Example Data",
          description: "No live electrical projects found - showing example projects",
          duration: 3000,
        });
        return staticProjects;
      }

    } catch (error) {
      console.error('API fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch live data, showing example projects",
        variant: "destructive",
        duration: 3000,
      });
      return staticProjects;
    }
  };

  // Use React Query for caching
  const { data: projects = [], isLoading, refetch } = useQuery({
    queryKey: ['major-projects'],
    queryFn: fetchMajorProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime)
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['major-projects'] });
    refetch();
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

  const formatDuration = (duration: string): string => {
    if (!duration) return '18 months';
    
    // Handle date range format like "2024-01-01 to 2024-12-31"
    if (duration.includes(' to ')) {
      const [startStr, endStr] = duration.split(' to ');
      try {
        const start = new Date(startStr);
        const end = new Date(endStr);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        return `${diffMonths} months`;
      } catch {
        return duration;
      }
    }
    
    // If already in user-friendly format, return as is
    if (duration.includes('month') || duration.includes('year')) {
      return duration;
    }
    
    // Return as is for other formats
    return duration;
  };

  const formatCurrency = (value: string): string => {
    if (!value || value === 'TBC') return 'TBC';
    
    // Extract numbers from the string
    const numberMatch = value.match(/[\d,]+\.?\d*/);
    if (!numberMatch) return value;
    
    const number = parseFloat(numberMatch[0].replace(/,/g, ''));
    if (isNaN(number)) return value;
    
    // Format large numbers
    if (number >= 1000000) {
      const millions = number / 1000000;
      return `£${millions}M`;
    } else if (number >= 1000) {
      const thousands = number / 1000;
      return `£${thousands}K`;
    } else {
      return `£${number.toLocaleString()}`;
    }
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
    // Priority 1: Direct project URL
    if (project.project_link) {
      return project.project_link;
    }
    
    // Priority 2: Details URL
    if (project.details_link) {
      return project.details_link;
    }
    
    // Fallback: Generate search URL
    return generateSearchUrl(project);
  };

  const generateSearchUrl = (project: MajorProject): string => {
    const searchTerm = encodeURIComponent(`${project.project_name} ${project.client}`);
    return `https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=${searchTerm}`;
  };

  const trackProjectView = async (projectId: string) => {
    // Track project views (could implement analytics here if needed)
    console.log(`Project viewed: ${projectId}`);
  };

  const ProjectDetailModal = ({ project }: { project: MajorProject }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white">{project.project_name}</DialogTitle>
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
          <p className="text-gray-300">{project.description}</p>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="text-white font-medium">{project.client}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Contract Value</p>
            <p className="text-white font-medium">{project.contract_value ? formatCurrency(project.contract_value) : 'TBC'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-white font-medium">{project.location || 'UK'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-white font-medium">
              {(() => {
                if (project.duration && project.duration.includes('T') && project.duration.includes('to')) {
                  // Parse timestamp range like "2025-07-21T00:00:00+01:00 to 2026-07-20T23:59:59+01:00"
                  const [startStr, endStr] = project.duration.split(' to ');
                  const startDate = new Date(startStr);
                  const endDate = new Date(endStr);
                  
                  if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                    const diffMonths = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
                    if (diffMonths >= 12) {
                      const years = Math.round(diffMonths / 12 * 10) / 10;
                      return `${years} ${years === 1 ? 'year' : 'years'}`;
                    } else {
                      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
                    }
                  }
                }
                
                // Fallback for missing or invalid duration
                const startDate = project.start_date ? new Date(project.start_date) : new Date();
                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 18);
                return `Expected completion: ${endDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
              })()}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="text-white font-medium">
              {project.start_date 
                ? new Date(project.start_date).toLocaleDateString('en-GB')
                : 'TBC'
              }
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Contractors</p>
            <p className="text-white font-medium">{project.contractors || 'TBC'}</p>
          </div>
        </div>

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            
          </div>
          <div className="flex gap-2 sm:flex-shrink-0 ml-auto">
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              className={`border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                isLoading ? 'animate-spin' : ''
              }`} />
              {isLoading ? 'Fetching...' : 'Refresh'}
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

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border border-elec-yellow/10 bg-elec-card hover:border-elec-yellow/20 w-full min-w-0">
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
              </div>
              
              {/* Project Title - Bold and centered */}
              <CardTitle className="text-xl font-bold text-center text-white mb-3 line-clamp-2">
                {project.project_name}
              </CardTitle>
              
              {/* Short Description */}
              <p className="text-gray-300 text-sm text-center mb-3 line-clamp-3">
                {project.description}
              </p>
              
              {/* Client */}
              <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Client: <span className="text-elec-yellow hover:text-elec-yellow/80 transition-colors cursor-pointer">{project.client}</span>
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
                  <div className="text-white font-medium text-sm">{formatCurrency(project.contract_value)}</div>
                  <div className="text-xs text-muted-foreground">Contract Value</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Clock className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">
                    {project.duration ? formatDuration(project.duration) : '18 months'}
                  </div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <MapPin className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">
                    {(project.location || 'UK').split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}
                  </div>
                  <div className="text-xs text-muted-foreground">Location</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Users className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-white font-medium text-sm">
                    {project.contractors ? 
                      `${project.contractors.split(", ").length} contractor${project.contractors.split(", ").length !== 1 ? 's' : ''}` 
                      : 'TBC'}
                  </div>
                  <div className="text-xs text-muted-foreground">Contractors</div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                {/* Start Date - Bottom left with calendar icon */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.start_date 
                      ? new Date(project.start_date).toLocaleDateString('en-GB')
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
              <div className="flex flex-col gap-2 mt-4 w-full min-w-0">
                {getStatusText(project.status) === "Open for Tender" && (
                  <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium w-full sm:w-auto text-xs sm:text-sm">
                    <span className="hidden sm:inline">View Tender Details</span>
                    <span className="sm:hidden">Tender</span>
                  </Button>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 font-medium w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <Eye className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">Details</span>
                    </Button>
                  </DialogTrigger>
                  <ProjectDetailModal project={project} />
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-elec-dark bg-elec-dark text-white hover:bg-elec-dark/80 font-medium w-full sm:w-auto text-xs sm:text-sm"
                  onClick={() => handleViewProject(project)}
                >
                  <ExternalLink className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">View Project</span>
                  <span className="sm:hidden">Project</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
          onClick={() => navigate('/electrician/safety-shares/projects')}
        >
          View All Projects ({projects.length})
        </Button>
      </div>

      {/* API Key dialog removed - now handled automatically */}
      
      <ProjectSubmissionDialog
        open={isSubmissionDialogOpen}
        onOpenChange={setIsSubmissionDialogOpen}
        onProjectSubmitted={handleRefresh}
      />
    </div>
  );
};

export default MajorProjectsCard;
