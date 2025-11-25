import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Trash2, Calendar, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProjectPlanCloud } from "@/hooks/useProjectPlanCloud";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const MyProjects = () => {
  const navigate = useNavigate();
  const { savedPlans, isLoading, deletePlan, isDeleting } = useProjectPlanCloud();

  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
    active: { label: 'Active', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    completed: { label: 'Completed', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    archived: { label: 'Archived', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-elec-dark">
        <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-6 max-w-6xl">
          <div className="space-y-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-6 max-w-6xl">
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Link to="/electrician/project-manager">
                <Button variant="outline" size="sm" className="gap-2 mb-3">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">My Projects</h1>
              <p className="text-sm text-muted-foreground">View and manage your saved project plans</p>
            </div>
          </div>

          {/* Projects List */}
          {!savedPlans || savedPlans.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No saved projects yet</p>
                <Link to="/electrician/project-manager">
                  <Button className="mt-4" variant="outline">
                    Create Your First Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedPlans.map((project) => (
                <Card key={project.id} className="hover:border-elec-yellow/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-lg">{project.projectName}</CardTitle>
                          <Badge className={`text-xs px-2 py-0.5 ${statusConfig[project.status].color}`}>
                            {statusConfig[project.status].label}
                          </Badge>
                        </div>
                        {project.clientName && (
                          <CardDescription className="flex items-center gap-2">
                            Client: {project.clientName}
                          </CardDescription>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          {project.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </span>
                          )}
                          {project.startDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(project.startDate).toLocaleDateString('en-GB')}
                            </span>
                          )}
                        </div>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{project.projectName}"? This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePlan(project.id)} className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/electrician/project-manager?loadId=${project.id}`)}>
                        Open & Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
