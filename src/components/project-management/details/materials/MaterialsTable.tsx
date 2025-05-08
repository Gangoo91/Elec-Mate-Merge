
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProjectMaterial } from "@/types/project";

type MaterialsTableProps = {
  materials: ProjectMaterial[];
  onDeleteMaterial: (id: string) => void;
};

export const MaterialsTable = ({ materials, onDeleteMaterial }: MaterialsTableProps) => {
  const totalMaterialsCost = materials.reduce((sum, item) => sum + item.total, 0);

  if (materials.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No materials added yet.</p>
      </div>
    );
  }

  return (
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
              {materials.map((material) => (
                <tr key={material.id} className="border-b border-elec-yellow/10">
                  <td className="py-3">{material.name}</td>
                  <td className="py-3 text-right">{material.quantity}</td>
                  <td className="py-3 text-right">£{material.unitCost.toFixed(2)}</td>
                  <td className="py-3 text-right">£{material.total.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDeleteMaterial(material.id)}
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
  );
};
