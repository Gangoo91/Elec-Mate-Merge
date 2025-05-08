
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectMaterial, ProjectTimeEntry } from "@/types/project";
import { useProjects } from "@/hooks/useProjects";
import { format } from "date-fns";
import { ArrowLeft, CalendarCheck, Clock, Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ProjectDialog } from "./ProjectDialog";
import { v4 as uuidv4 } from "uuid";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject } = useProjects();
  const [project, setProject] = useState<Project | undefined>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  // Materials form state
  const [newMaterial, setNewMaterial] = useState<Omit<ProjectMaterial, 'id' | 'total'>>({
    name: '',
    quantity: 1,
    unitCost: 0
  });
  
  // Time entry form state
  const [newTimeEntry, setNewTimeEntry] = useState<Omit<ProjectTimeEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    hours: 1,
    description: ''
  });

  useEffect(() => {
    if (projectId) {
      const currentProject = getProject(projectId);
      if (currentProject) {
        setProject(currentProject);
      } else {
        navigate("/electrician-tools/project-management");
        toast({
          title: "Project Not Found",
          description: "The project you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    }
  }, [projectId, getProject, navigate]);

  if (!project) {
    return <div>Loading project...</div>;
  }

  const handleProjectUpdate = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (project) {
      updateProject(project.id, data);
      setProject({
        ...project,
        ...data,
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleDeleteProject = () => {
    if (project) {
      deleteProject(project.id);
      navigate("/electrician-tools/project-management");
      toast({
        title: "Project Deleted",
        description: `${project.name} has been deleted.`,
      });
    }
  };

  // Materials handlers
  const handleAddMaterial = () => {
    if (!newMaterial.name) {
      toast({
        title: "Material Name Required",
        description: "Please provide a name for the material.",
        variant: "destructive",
      });
      return;
    }

    const material: ProjectMaterial = {
      id: uuidv4(),
      name: newMaterial.name,
      quantity: newMaterial.quantity,
      unitCost: newMaterial.unitCost,
      total: newMaterial.quantity * newMaterial.unitCost
    };

    const updatedMaterials = [...project.materials, material];
    updateProject(project.id, { materials: updatedMaterials });
    setProject({
      ...project,
      materials: updatedMaterials,
      updatedAt: new Date().toISOString()
    });

    // Reset form
    setNewMaterial({
      name: '',
      quantity: 1,
      unitCost: 0
    });

    toast({
      title: "Material Added",
      description: `${material.name} has been added to the project.`,
    });
  };

  const handleDeleteMaterial = (id: string) => {
    const updatedMaterials = project.materials.filter(material => material.id !== id);
    updateProject(project.id, { materials: updatedMaterials });
    setProject({
      ...project,
      materials: updatedMaterials,
      updatedAt: new Date().toISOString()
    });

    toast({
      title: "Material Removed",
      description: "The material has been removed from the project.",
    });
  };

  // Time entry handlers
  const handleAddTimeEntry = () => {
    if (!newTimeEntry.description) {
      toast({
        title: "Description Required",
        description: "Please provide a description for the time entry.",
        variant: "destructive",
      });
      return;
    }

    const timeEntry: ProjectTimeEntry = {
      id: uuidv4(),
      date: newTimeEntry.date,
      hours: newTimeEntry.hours,
      description: newTimeEntry.description
    };

    const updatedTimeEntries = [...project.timeEntries, timeEntry];
    updateProject(project.id, { timeEntries: updatedTimeEntries });
    setProject({
      ...project,
      timeEntries: updatedTimeEntries,
      updatedAt: new Date().toISOString()
    });

    // Reset form
    setNewTimeEntry({
      date: new Date().toISOString().split('T')[0],
      hours: 1,
      description: ''
    });

    toast({
      title: "Time Entry Added",
      description: "Your time entry has been added to the project.",
    });
  };

  const handleDeleteTimeEntry = (id: string) => {
    const updatedTimeEntries = project.timeEntries.filter(entry => entry.id !== id);
    updateProject(project.id, { timeEntries: updatedTimeEntries });
    setProject({
      ...project,
      timeEntries: updatedTimeEntries,
      updatedAt: new Date().toISOString()
    });

    toast({
      title: "Time Entry Removed",
      description: "The time entry has been removed from the project.",
    });
  };

  // Calculate totals
  const totalMaterialsCost = project.materials.reduce((sum, item) => sum + item.total, 0);
  const totalHours = project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  // Get status badge color
  const getStatusColor = (status: Project["status"]) => {
    switch(status) {
      case "planning": return "bg-blue-500 hover:bg-blue-600";
      case "in-progress": return "bg-amber-500 hover:bg-amber-600";
      case "completed": return "bg-green-500 hover:bg-green-600";
      case "on-hold": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={() => navigate("/electrician-tools/project-management")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4" /> Edit Project
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this project? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProject}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {/* Project Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace("-", " ")}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <p className="text-muted-foreground">Client: {project.clientName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-xl font-bold">£{project.budget.toFixed(2)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-muted-foreground">Start Date:</span>
              </div>
              <p>{project.startDate ? format(new Date(project.startDate), "dd MMMM yyyy") : "Not set"}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-muted-foreground">Due Date:</span>
              </div>
              <p>{project.dueDate ? format(new Date(project.dueDate), "dd MMMM yyyy") : "Not set"}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-muted-foreground">Last Updated:</span>
              </div>
              <p>{format(new Date(project.updatedAt), "dd MMM yyyy HH:mm")}</p>
            </div>
          </div>
          
          {project.description && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          )}
          
          {project.notes && (
            <div>
              <h3 className="text-sm font-medium mb-1">Notes</h3>
              <p className="text-muted-foreground">{project.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Project Details Tabs */}
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="materials">
            Materials (£{totalMaterialsCost.toFixed(2)})
          </TabsTrigger>
          <TabsTrigger value="time">
            Time Tracking ({totalHours.toFixed(1)} hrs)
          </TabsTrigger>
        </TabsList>
        
        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Add Material</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="materialName">Material Name</Label>
                  <Input 
                    id="materialName" 
                    value={newMaterial.name} 
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })} 
                    placeholder="2.5mm T&E Cable"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    value={newMaterial.quantity} 
                    onChange={(e) => setNewMaterial({ ...newMaterial, quantity: parseFloat(e.target.value) || 0 })} 
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitCost">Unit Cost (£)</Label>
                  <Input 
                    id="unitCost" 
                    type="number" 
                    value={newMaterial.unitCost} 
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitCost: parseFloat(e.target.value) || 0 })} 
                    className="w-full"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleAddMaterial} 
                    className="w-full flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {project.materials.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No materials added yet.</p>
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-elec-yellow/20">
                      <tr>
                        <th className="text-left pb-2">Material</th>
                        <th className="text-right pb-2">Quantity</th>
                        <th className="text-right pb-2">Unit Cost</th>
                        <th className="text-right pb-2">Total</th>
                        <th className="text-right pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.materials.map((material) => (
                        <tr key={material.id} className="border-b border-elec-yellow/10">
                          <td className="py-3">{material.name}</td>
                          <td className="py-3 text-right">{material.quantity}</td>
                          <td className="py-3 text-right">£{material.unitCost.toFixed(2)}</td>
                          <td className="py-3 text-right">£{material.total.toFixed(2)}</td>
                          <td className="py-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteMaterial(material.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-elec-yellow/20">
                        <td colSpan={3} className="py-3 text-right font-medium">Total:</td>
                        <td className="py-3 text-right font-bold">£{totalMaterialsCost.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Time Tracking Tab */}
        <TabsContent value="time" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Add Time Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryDate">Date</Label>
                  <Input 
                    id="entryDate" 
                    type="date" 
                    value={newTimeEntry.date} 
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, date: e.target.value })} 
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours</Label>
                  <Input 
                    id="hours" 
                    type="number" 
                    min="0.5"
                    step="0.5"
                    value={newTimeEntry.hours} 
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, hours: parseFloat(e.target.value) || 0 })} 
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="description" 
                      value={newTimeEntry.description} 
                      onChange={(e) => setNewTimeEntry({ ...newTimeEntry, description: e.target.value })} 
                      placeholder="What work did you do?"
                      className="flex-grow"
                    />
                    <Button 
                      onClick={handleAddTimeEntry} 
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {project.timeEntries.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No time entries added yet.</p>
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-elec-yellow/20">
                      <tr>
                        <th className="text-left pb-2">Date</th>
                        <th className="text-left pb-2">Description</th>
                        <th className="text-right pb-2">Hours</th>
                        <th className="text-right pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.timeEntries
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((entry) => (
                          <tr key={entry.id} className="border-b border-elec-yellow/10">
                            <td className="py-3">{format(new Date(entry.date), "dd MMM yyyy")}</td>
                            <td className="py-3">{entry.description}</td>
                            <td className="py-3 text-right">{entry.hours.toFixed(1)}</td>
                            <td className="py-3 text-right">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteTimeEntry(entry.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-elec-yellow/20">
                        <td colSpan={2} className="py-3 text-right font-medium">Total Hours:</td>
                        <td className="py-3 text-right font-bold">{totalHours.toFixed(1)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Edit project dialog */}
      <ProjectDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        project={project}
        onSubmit={handleProjectUpdate}
      />
    </div>
  );
};
