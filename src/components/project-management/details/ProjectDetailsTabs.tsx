
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project, ProjectMaterial, ProjectTimeEntry } from "@/types/project";
import { MaterialsForm } from "./materials/MaterialsForm";
import { MaterialsTable } from "./materials/MaterialsTable";
import { TimeEntryForm } from "./time/TimeEntryForm";
import { TimeEntriesTable } from "./time/TimeEntriesTable";

type ProjectDetailsTabsProps = {
  project: Project;
  onAddMaterial: (material: ProjectMaterial) => void;
  onDeleteMaterial: (id: string) => void;
  onAddTimeEntry: (entry: ProjectTimeEntry) => void;
  onDeleteTimeEntry: (id: string) => void;
};

export const ProjectDetailsTabs = ({ 
  project,
  onAddMaterial,
  onDeleteMaterial,
  onAddTimeEntry,
  onDeleteTimeEntry
}: ProjectDetailsTabsProps) => {
  const totalMaterialsCost = project.materials.reduce((sum, item) => sum + item.total, 0);
  const totalHours = project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
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
        <MaterialsForm onAddMaterial={onAddMaterial} />
        <MaterialsTable 
          materials={project.materials} 
          onDeleteMaterial={onDeleteMaterial} 
        />
      </TabsContent>
      
      {/* Time Tracking Tab */}
      <TabsContent value="time" className="space-y-4">
        <TimeEntryForm onAddTimeEntry={onAddTimeEntry} />
        <TimeEntriesTable 
          timeEntries={project.timeEntries} 
          onDeleteTimeEntry={onDeleteTimeEntry} 
        />
      </TabsContent>
    </Tabs>
  );
};
