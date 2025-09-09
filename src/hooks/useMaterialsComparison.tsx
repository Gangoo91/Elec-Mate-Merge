import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MaterialItem } from "@/data/electrician/productData";

export const useMaterialsComparison = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<(string | number)[]>([]);
  const [selectedMaterialData, setSelectedMaterialData] = useState<MaterialItem[]>([]);
  const { toast } = useToast();

  const addToComparison = (materialId: string | number, materialData?: MaterialItem) => {
    if (selectedMaterials.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 materials at a time.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedMaterials.includes(materialId)) {
      setSelectedMaterials(prev => [...prev, materialId]);
      if (materialData) {
        setSelectedMaterialData(prev => [...prev, materialData]);
      }
      toast({
        title: "Material added to comparison",
        description: `Material has been added to your comparison.`,
        variant: "default"
      });
    }
  };

  const removeFromComparison = (materialId: string | number) => {
    setSelectedMaterials(prev => prev.filter(id => id !== materialId));
    setSelectedMaterialData(prev => prev.filter(material => material.id !== materialId));
  };

  const clearComparison = () => {
    setSelectedMaterials([]);
    setSelectedMaterialData([]);
  };

  const isInComparison = (materialId: string | number) => selectedMaterials.includes(materialId);

  return { 
    addToComparison, 
    removeFromComparison, 
    clearComparison,
    isInComparison, 
    selectedCount: selectedMaterials.length,
    selectedMaterials,
    selectedMaterialData
  };
};