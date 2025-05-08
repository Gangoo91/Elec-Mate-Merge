
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ProjectMaterial } from "@/types/project";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

type MaterialsFormProps = {
  onAddMaterial: (material: ProjectMaterial) => void;
};

export const MaterialsForm = ({ onAddMaterial }: MaterialsFormProps) => {
  const [newMaterial, setNewMaterial] = useState<Omit<ProjectMaterial, 'id' | 'total'>>({
    name: '',
    quantity: 1,
    unitCost: 0
  });

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

    onAddMaterial(material);

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

  return (
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
  );
};
