
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Clock, Filter, Search, X, MapPin, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

const MajorProjectsCard = () => {
  const [projects, setProjects] = useState<MajorProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<MajorProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<MajorProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter, locationFilter]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('major_projects')
        .select('*')
        .eq('is_active', true)
        .order('date_awarded', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching major projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.awarded_to.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter(project => project.location === locationFilter);
    }

    setFilteredProjects(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'awarded': return 'bg-green-500 hover:bg-green-600';
      case 'in progress': return 'bg-blue-500 hover:bg-blue-600';
      case 'completed': return 'bg-purple-500 hover:bg-purple-600';
      case 'tender': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'awarded': return '🎯';
      case 'in progress': return '🚧';
      case 'completed': return '✅';
      case 'tender': return '📋';
      default: return '🏢';
    }
  };

  const getUniqueStatuses = () => {
    return [...new Set(projects.map(project => project.status))];
  };

  const getUniqueLocations = () => {
    return [...new Set(projects.map(project => project.location))];
  };

  const formatProjectValue = (value: string) => {
    // Ensure all values start with £ for UK currency
    if (value.includes('£')) return value;
    if (value.includes('million') || value.includes('billion')) return `£${value}`;
    return `£${value}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Filters Skeleton */}
        <div className="bg-elec-gray/50 rounded-lg p-4 space-y-4">
          <div className="h-4 bg-elec-gray-light/20 rounded animate-pulse w-24" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Projects Skeleton */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="h-6 bg-elec-gray-light/20 rounded animate-pulse w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-elec-gray-light/20 rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Filter Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray-light border-elec-yellow/30 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Statuses</SelectItem>
                {getUniqueStatuses().map(status => (
                  <SelectItem key={status} value={status} className="text-white hover:bg-elec-gray-light">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Locations</SelectItem>
                {getUniqueLocations().map(location => (
                  <SelectItem key={location} value={location} className="text-white hover:bg-elec-gray-light">
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || statusFilter !== "all" || locationFilter !== "all") && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Showing {filteredProjects.length} of {projects.length} projects</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setLocationFilter("all");
                }}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-400" />
            Major Projects
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              {filteredProjects.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-lg flex-shrink-0 mt-1">
                          {getStatusIcon(project.status)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-white group-hover:text-elec-yellow transition-colors line-clamp-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                            {project.summary}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{formatProjectValue(project.project_value)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          <span>{project.awarded_to}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`${getStatusColor(project.status)} text-white capitalize text-xs`}>
                          {project.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                          <Clock className="h-3 w-3" />
                          {new Date(project.date_awarded).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-elec-yellow/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">
                    {getStatusIcon(selectedProject.status)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={`${getStatusColor(selectedProject.status)} text-white capitalize`}>
                        {selectedProject.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {new Date(selectedProject.date_awarded).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <DollarSign className="h-4 w-4 text-green-400" />
                        <span>{formatProjectValue(selectedProject.project_value)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Building className="h-4 w-4 text-purple-400" />
                        <span>{selectedProject.awarded_to}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="flex-shrink-0 hover:bg-elec-gray-light"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedProject.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorProjectsCard;
