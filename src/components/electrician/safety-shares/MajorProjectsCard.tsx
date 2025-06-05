
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, DollarSign, Calendar, Eye, RefreshCw, Bot, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MajorProject {
  id: string;
  title: string;
  summary: string;
  content: string;
  awarded_to: string;
  project_value: string;
  location: string;
  status: string;
  date_awarded: string;
  view_count: number;
  average_rating: number;
}

interface ScrapingLog {
  id: string;
  status: string;
  projects_found: number;
  projects_added: number;
  created_at: string;
  source_name: string;
}

const MajorProjectsCard = () => {
  const [projects, setProjects] = useState<MajorProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<MajorProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [lastScrapeLog, setLastScrapeLog] = useState<ScrapingLog | null>(null);
  const [showScrapingInfo, setShowScrapingInfo] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchLastScrapeLog();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('major_projects')
        .select('*')
        .eq('is_active', true)
        .order('date_awarded', { ascending: false })
        .limit(20);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching major projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLastScrapeLog = async () => {
    try {
      const { data, error } = await supabase
        .from('scraping_logs')
        .select(`
          *,
          scraping_sources!inner(name)
        `)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching scrape log:', error);
        return;
      }

      if (data) {
        setLastScrapeLog({
          ...data,
          source_name: data.scraping_sources?.name || 'Unknown'
        });
      }
    } catch (error) {
      console.error('Error fetching last scrape log:', error);
    }
  };

  const triggerScraping = async () => {
    setScraping(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-major-projects');
      
      if (error) {
        console.error('Error triggering scraping:', error);
        return;
      }

      console.log('Scraping result:', data);
      
      // Refresh projects and scrape log after scraping
      await fetchProjects();
      await fetchLastScrapeLog();
      
    } catch (error) {
      console.error('Error during scraping:', error);
    } finally {
      setScraping(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'awarded': return 'bg-green-500 text-white';
      case 'in_progress': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      case 'open_tender': return 'bg-orange-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-elec-yellow/10 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedProject) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-elec-yellow" />
              <Badge className={`${getStatusColor(selectedProject.status)} font-medium`}>
                {formatStatus(selectedProject.status)}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProject(null)}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <X className="h-4 w-4 mr-2" />
              Back to List
            </Button>
          </div>
          <CardTitle className="text-xl text-white">{selectedProject.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(selectedProject.date_awarded)}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {selectedProject.location}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {selectedProject.view_count} views
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark/50 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-2">Awarded To</h4>
              <p className="text-gray-300">{selectedProject.awarded_to}</p>
            </div>
            <div className="bg-elec-dark/50 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Project Value
              </h4>
              <p className="text-gray-300">{selectedProject.project_value}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h4 className="font-medium text-elec-yellow mb-3">Project Details</h4>
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {selectedProject.content}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Major Projects</CardTitle>
              <p className="text-gray-300 text-sm">
                Latest electrical infrastructure projects and tenders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lastScrapeLog && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowScrapingInfo(!showScrapingInfo)}
                className="text-gray-400 hover:text-elec-yellow"
              >
                <Bot className="h-4 w-4 mr-1" />
                Auto-updated
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={triggerScraping}
              disabled={scraping}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${scraping ? 'animate-spin' : ''}`} />
              {scraping ? 'Updating...' : 'Update Now'}
            </Button>
          </div>
        </div>

        {showScrapingInfo && lastScrapeLog && (
          <div className="mt-4 p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
            <div className="text-sm text-gray-300">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-elec-yellow font-medium">Last Update:</span>
                <span>{formatDate(lastScrapeLog.created_at)}</span>
                <Badge 
                  className={`${lastScrapeLog.status === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}
                >
                  {lastScrapeLog.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <span>Projects Found: {lastScrapeLog.projects_found}</span>
                <span>Projects Added: {lastScrapeLog.projects_added}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Data automatically scraped from government tender sites
              </p>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No major projects available at the moment.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={triggerScraping}
              disabled={scraping}
              className="mt-4 border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              {scraping ? 'Loading...' : 'Load Projects'}
            </Button>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-dark/50 hover:bg-elec-dark/70 cursor-pointer transition-all"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(project.status)} text-xs font-medium`}>
                    {formatStatus(project.status)}
                  </Badge>
                  <span className="text-xs text-gray-400">{project.project_value}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Eye className="h-3 w-3" />
                  {project.view_count}
                </div>
              </div>
              
              <h3 className="font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {project.awarded_to}
                  </div>
                </div>
                <span>{formatDate(project.date_awarded)}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default MajorProjectsCard;
