
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvidenceForm from "./evidence/EvidenceForm";
import EvidenceEmptyState from "./evidence/EvidenceEmptyState";
import EvidenceList from "./evidence/EvidenceList";
import { useTrainingEvidence } from "@/hooks/time-tracking/useTrainingEvidence";
import { TrainingEvidenceItem } from "@/types/time-tracking";

const TrainingEvidence = () => {
  const { evidenceItems, addEvidence, deleteEvidence, isUploading, setIsUploading } = useTrainingEvidence();
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvidence = activeTab === "all" 
    ? evidenceItems 
    : evidenceItems.filter(item => item.type.toLowerCase() === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Training Evidence</h3>
          <p className="text-sm text-muted-foreground">
            Upload and manage evidence of your off-the-job training activities
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Add New Evidence
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Training Evidence</DialogTitle>
            </DialogHeader>
            <EvidenceForm 
              onAddEvidence={addEvidence} 
              isUploading={isUploading} 
              setIsUploading={setIsUploading} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-elec-dark mb-4">
          <TabsTrigger value="all">All Evidence</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="site visit">Site Visits</TabsTrigger>
          <TabsTrigger value="college session">College</TabsTrigger>
          <TabsTrigger value="online course">Online</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
        </TabsContent>
        <TabsContent value="workshop">
          <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
        </TabsContent>
        <TabsContent value="site visit">
          <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
        </TabsContent>
        <TabsContent value="college session">
          <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
        </TabsContent>
        <TabsContent value="online course">
          <EvidenceList items={filteredEvidence} onDelete={deleteEvidence} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingEvidence;
