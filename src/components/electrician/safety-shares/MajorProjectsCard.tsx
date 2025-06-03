
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

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
  const [selectedProject, setSelectedProject] = useState<MajorProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'awarded': return 'bg-green-500';
      case 'in progress': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'tendering': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-400" />
            Major Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-green-400" />
          Major Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{project.title}</h3>
                <Badge className={`${getStatusColor(project.status)} text-white capitalize`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 mb-3">{project.summary}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {project.project_value}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {project.awarded_to}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.date_awarded).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getStatusColor(selectedProject.status)} text-white capitalize`}>
                    {selectedProject.status}
                  </Badge>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-sm">
                    {selectedProject.project_value}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Building className="h-4 w-4 text-elec-yellow" />
                    <span className="font-medium">Awarded to:</span>
                    <span>{selectedProject.awarded_to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                    <span className="font-medium">Location:</span>
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4 text-elec-yellow" />
                    <span className="font-medium">Awarded:</span>
                    <span>{new Date(selectedProject.date_awarded).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedProject.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MajorProjectsCard;
